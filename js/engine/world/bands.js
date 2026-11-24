/* Scene Booker — js/engine/world/bands.js
 * SB.Bands: local and touring bands, their draw, wear, asks, answers, trust and lives. Stream BANDS.
 * Owner: E3a. Spec: design/spec/02-engine.md 4.2, 7.3, 7.13; 01-state.md 2.1; mechanics.md 5.
 */
SB.module('Bands', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var GENRES = E.GENRES, GEN_KEY = E.GEN_KEY;
  var SLOT_RANK = { OPEN: 0, MIDDLE: 1, CLOSE: 2 };

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */

  function rb(state) { return SB.rng.stream(state, E.STREAM.BANDS); }
  function today(state) { return state.clock ? state.clock.day : 0; }
  function week(state) { return state.clock ? state.clock.week : 0; }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function r2(x) { return Math.round(x * 100) / 100; }
  function packOf(state) { return SB.Cities.pack(state); }

  function rec(state, t, extra, showId) {
    var r = { t: t, day: today(state), half: half(state), showId: showId || null, text: '' }, k;
    for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) r[k] = extra[k];
    return r;
  }

  function say(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
  }

  function getBand(state, bandId, where) {
    var b = state.bands && state.bands[bandId];
    if (!b) SB.fail(where || 'Bands.get', 'unknown band ' + bandId);
    return b;
  }

  function personName(state, pid) {
    var p = state.people && state.people[pid];
    if (!p) return '';
    return p.nick ? p.nick : (p.first + (typeof p.last === 'string' ? ' ' + p.last : ''));
  }

  function nkey(fam, a, b) {
    var K = SB.Notebook && SB.Notebook.key;
    if (K && typeof K[fam] === 'function') return b === undefined ? K[fam](a) : K[fam](a, b);
    return fam + ':' + a + (b === undefined ? '' : ':' + b);
  }

  function emptyRange() { return { lo90: 0, lo50: 0, hi50: 0, hi90: 0, conf: 0, src: 'PRIOR', seen: null, text: '—', known: false }; }
  function rangeView(state, key) {
    var v = SB.Notebook && SB.Notebook.range ? SB.Notebook.range(state, key) : null;
    return v || emptyRange();
  }

  function stageOf(value) {
    var cuts = C.TRUST_STAGES;
    return value < cuts[0] ? 'SOUR' : (value < cuts[1] ? 'STRANGER' : (value < cuts[2] ? 'WORKING' : (value < cuts[3] ? 'TRUSTED' : 'ALLY')));
  }

  function zoneSize(state, zoneId) {
    var z = state.zones && state.zones[zoneId], t = 0;
    if (!z) return 0;
    z.pop.forEach(function (row) { row.forEach(function (x) { t += x; }); });
    return t;
  }

  function seasonOf(day) {
    var m = SB.time.month(day), w = m === 12 || m <= 2 ? 'winter' : (m <= 5 ? 'spring' : (m <= 8 ? 'summer' : 'fall'));
    return w + ' ' + SB.time.year(day);
  }

  function ended(b) { return b.stage === 'ENDED'; }
  function active(b) { return b.stage !== 'ENDED' && b.stage !== 'ON_ICE'; }

  /** Public affinity: base table plus the city's tilt (no save quirks). Used where a band judges a bill. */
  function affinity(state, s, t, g) {
    if (s === t) return 1;
    var a = C.AFFINITY[GENRES.indexOf(s)][GENRES.indexOf(t)], P = packOf(state);
    (P.tilt || []).forEach(function (x) {
      if (x.fan === s && x.band === t && (x.gen === undefined || x.gen === null || x.gen === g)) a += x.d;
    });
    return U.clamp(a, 0, 1.2);
  }

  function memberAges(state, b) {
    var y = SB.time.year(today(state));
    return b.members.map(function (m) { var p = state.people[m.personId]; return p ? y - p.born : 28; });
  }

  function median(list) {
    if (!list.length) return 28;
    var a = list.slice().sort(function (x, y) { return x - y; }), m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
  }

  /** The age profile of 7.2 without crossover. */
  function profile(state, b) {
    var med = median(memberAges(state, b));
    return med < C.KIDS_BAND_AGE ? C.GEN_PROFILE.KIDS : (med >= C.OLD_BAND_AGE ? C.GEN_PROFILE.OLD : C.GEN_PROFILE.MIDDLE);
  }
  function isOldHead(state, b) { return median(memberAges(state, b)) >= C.OLD_BAND_AGE; }

  /** G_b with the true crossover (7.2). */
  function genTruth(state, b) {
    var p = profile(state, b), x = b.hid.cross || 0, years = SB.time.year(today(state)) - b.formedYear;
    var G = [0, 1, 2].map(function (g) { return (1 - x) * p[g] + x * C.GEN_PROFILE.EVERYONE[g]; });
    G[2] = Math.min(1, G[2] + C.OLD_BONUS_PER_4_YEARS * Math.floor(Math.max(0, years) / 4));
    return G;
  }

  function lastPlayDay(b) {
    var d = b.hid.lastPlay === undefined ? null : b.hid.lastPlay;
    (b.plays || []).forEach(function (p) { if (d === null || p > d) d = p; });
    return d;
  }

  /* ------------------------------------------------------------------ */
  /* views                                                               */
  /* ------------------------------------------------------------------ */

  function get(state, bandId) { return getBand(state, bandId, 'Bands.get'); }

  /* Your band stack (user 2026-11-24): a new game starts with the bands the outgoing booker hands over (handover) and
   * every other local band joins only when the player adds it, from its message. state.player.stack maps bandId -> the
   * week it was added; a game without one (an old save) has every band in it. Touring bands are not kept here. */
  function inStack(state, bandId) {
    var b = state.bands && state.bands[bandId], st = state.player && state.player.stack;
    if (!b) return false;
    if (!b.local || !st || typeof st !== 'object') return true;
    return Object.prototype.hasOwnProperty.call(st, bandId) || !!b.playerBand;
  }
  function addToStack(state, bandId) {
    getBand(state, bandId, 'Bands.addToStack');
    if (inStack(state, bandId)) return { ok: true, already: true };
    state.player.stack[bandId] = week(state);
    return { ok: true };
  }
  /** handover(state, n): the stack a new game starts with: the n biggest draws in town the walkthrough does not send you
   *  a message from (those two write in the first week, and you add them yourself). */
  function handover(state, n) {
    var cast = SB.Tutorial && SB.Tutorial.cast ? (function () { try { return SB.Tutorial.cast(state); } catch (e) { return {}; } })() : {}, out = {};
    Object.keys(state.bands || {}).filter(function (id) {
      var b = state.bands[id];
      return b.local && !b.playerBand && b.stage !== 'ENDED' && b.zoneId === 'city' && id !== cast.closer && id !== cast.kids;
    }).map(function (id) { return { id: id, t: tier(state, state.bands[id], 'city') }; })
      .sort(function (a, b) { return b.t - a.t || (a.id < b.id ? -1 : 1); })
      .slice(0, n || 4).forEach(function (x) { out[x.id] = 0; });
    state.player.stack = out;
    return out;
  }

  function list(state, filter) {
    filter = filter || {};
    return Object.keys(state.bands || {}).filter(function (id) {
      var b = state.bands[id];
      if (filter.stack && !inStack(state, id)) return false;
      if (filter.local !== undefined && filter.local !== null && !!b.local !== !!filter.local) return false;
      if (filter.active === true && !active(b)) return false;
      if (filter.active === false && active(b)) return false;
      if (filter.genre && b.genre !== filter.genre && b.genre2 !== filter.genre) return false;
      if (filter.zoneId && b.zoneId !== filter.zoneId) return false;
      if (typeof filter.freeOn === 'number' && !isFree(state, id, filter.freeOn)) return false;
      return true;
    });
  }

  function trust(state, bandId) {
    var b = getBand(state, bandId, 'Bands.trust'), wk = week(state), sum = 0, evs = [];
    (b.trust.events || []).forEach(function (e) {
      var ago = wk - e.week, d;
      if (!e.fade) d = e.size;
      else d = e.keep + (e.size - e.keep) * Math.max(0, 1 - ago / e.fade);
      sum += d;
      evs.push({ k: e.k, d: Math.round(d * 10) / 10, week: e.week,
                 label: SB.text.has('strings.trust.' + e.k) ? SB.text.label('trust.' + e.k) : e.k.toLowerCase().replace(/_/g, ' '),
                 fading: !!e.fade && ago < e.fade && e.size !== e.keep });
    });
    var value = Math.round(U.clamp(b.trust.base + sum, 0, 100));
    return { value: value, stage: stageOf(value), events: evs };
  }

  function tier(state, band, zoneId) {
    if (typeof band === 'string') band = getBand(state, band, 'Bands.tier');
    zoneId = zoneId || 'city';
    var size = zoneSize(state, zoneId) || C.POOL.perSceneRef, scale = size / C.POOL.perSceneRef, d = drawIn(state, band, zoneId), n = 0;
    C.TIERS.forEach(function (th) { if (d >= th * scale) n++; });
    return n;
  }

  /** The true draw in a zone (7.3): stored for the city and the home zone, scaled for any other zone. */
  function drawIn(state, b, zoneId) {
    var h = b.hid.draw || {};
    if (typeof h[zoneId] === 'number') return h[zoneId];
    var dc = h.city || 0, nc = Math.max(1, zoneSize(state, 'city'));
    return dc * (zoneSize(state, zoneId) / nc) * (b.local ? 0.5 : 1);
  }

  function publicDraw(state, band, zoneId) {
    if (typeof band === 'string') band = getBand(state, band, 'Bands.publicDraw');
    zoneId = zoneId || 'city';
    var P = packOf(state), d;
    if (band.local) {
      d = band.followers * C.FOLLOW_RATE;
      if (zoneId === 'city' || zoneId === band.zoneId) return d;
      return d * (zoneSize(state, zoneId) / Math.max(1, zoneSize(state, 'city'))) * 0.5;
    }
    var word = (state.town && state.town.word) || 0, here = P.derived && P.derived.index;
    d = band.followers * C.AWAY_RATE * Math.pow(P.scene.size / C.AWAY.sceneRef, C.AWAY.sceneExp) *
        (C.AWAY.wordBase + C.AWAY.wordSpan * word / 100);
    if (here && band.place && typeof band.place.lat === 'number' && SB.geo.drive(band.place, here) <= C.AWAY.nearHours * 60) d *= C.AWAY.near;
    var good = (band.visits || []).filter(function (v) { return v.q >= C.RETURN_Q; }).length;
    if ((band.visits || []).length) d *= (band.visits.length === 1 && good ? C.RETURN_BONUS[0] : C.RETURN_BONUS[1]);
    if (zoneId !== 'city') d *= (zoneSize(state, zoneId) / Math.max(1, zoneSize(state, 'city')));
    return d;
  }

  function fresh(state, band, day) {
    if (typeof band === 'string') band = getBand(state, band, 'Bands.fresh');
    if (typeof day !== 'number') day = today(state);
    var w = isOldHead(state, band) ? C.WEAR.oldHead : ((band.stage === 'NEW' || band.stage === 'FORMING') ? C.WEAR.brandNew : C.WEAR.base);
    var f = 1;
    (band.plays || []).forEach(function (p) {
      var wks = (day - p) / 7;
      if (wks < 0 || wks > C.WEAR.window) return;
      f *= 1 - w * Math.exp(-wks / C.WEAR.weeks);
    });
    /* 7.3: a band whose lineup gap or played-out tag is in force plays at fresh x (1 - PLAYED_OUT.penalty). */
    if ((band.outUntil !== null && band.outUntil > day) || (band.playedOutUntil !== null && band.playedOutUntil >= SB.time.week(day))) {
      f *= 1 - C.PLAYED_OUT.penalty;
    }
    return f;
  }

  function busyOn(state, band, day, exceptShowId) {
    var gap = C.BAND_GAP_DAYS, busy = false;
    (band.plays || []).forEach(function (p) { if (Math.abs(p - day) < gap) busy = true; });
    if (busy) return true;
    Object.keys(state.shows || {}).forEach(function (sid) {
      var s = state.shows[sid];
      if (busy || sid === exceptShowId || s.status === 'CANCELLED' || !s.bill || !s.bill.slots) return;
      if (Math.abs(s.day - day) >= gap) return;
      s.bill.slots.forEach(function (sl) { if (sl.bandId === band.id) busy = true; });
    });
    if (busy) return true;
    (state.otherShows || []).forEach(function (o) {
      if (busy || !o.bands || o.status === 'CANCELLED') return;
      if (Math.abs(o.day - day) < gap && o.bands.indexOf(band.id) >= 0) busy = true;
    });
    return busy;
  }

  function freeDraw(bandId, day) {
    return (SB.rng.hash(bandId + ':' + day, 7) % 1000003) / 1000003;
  }

  function isFreeExcept(state, band, day, exceptShowId) {
    if (!active(band)) return false;
    if (band.outUntil !== null && band.outUntil > day) return false;
    if (busyOn(state, band, day, exceptShowId)) return false;
    return freeDraw(band.id, day) < (band.hid.freeRate === undefined ? 0.8 : band.hid.freeRate);
  }

  function isFree(state, bandId, day) {
    return isFreeExcept(state, getBand(state, bandId, 'Bands.isFree'), day, null);
  }

  function heatOf(state, genre) { return (state.truth && state.truth.heat && state.truth.heat[genre]) || 0; }

  function feeOf(state, b, zoneId, roomId) {
    if (b.isPlayer) return { pay: 'FREE', amount: 0 };   // your own band plays for nothing
    var rm = roomId && state.rooms ? state.rooms[roomId] : null;
    var P = packOf(state), t = tier(state, b, zoneId || b.zoneId || 'city'), tv = trust(state, b.id).value;
    var lohi = C.BAND_ASK[Math.max(0, Math.min(4, t))];
    var at = b.hid.feeAt === undefined ? 0.5 : b.hid.feeAt;
    var amount = (lohi[0] + at * (lohi[1] - lohi[0])) * ((P.money && P.money.priceIndex) || 1) *
                 (C.MOTIVE_ASK[b.motive] || 1) * (1 - tv / C.TRUST_ASK) *
                 (1 + C.HOT_ASK_PER_HALF_POINT * 2 * Math.max(0, heatOf(state, b.genre)));
    if (tv >= C.TRUST_AT.close) amount *= 1 - C.TRUST_AT.closeDiscount;
    /* L.6: a local band at a house, a shop or a yard (or asked before any room is held) asks for gas money, not a club's fee (a $435 local at a 45-person house); a bar, club or hall keeps the full ask */
    if (roomId !== undefined && (!rm || C.SMALL_ROOM_FEE.kinds.indexOf(rm.kind) >= 0)) amount = Math.min(C.SMALL_ROOM_FEE.max, amount * C.SMALL_ROOM_FEE.mul);
    amount = Math.max(0, Math.round(amount / 5) * 5);
    var pay = amount <= 0 ? 'FREE' : (amount <= 30 ? 'GAS' : ((b.ask && b.ask.pay === 'SHARE') ? 'SHARE' : 'FLAT'));
    return { pay: pay, amount: amount };
  }

  function fee(state, bandId, showId) {
    var b = getBand(state, bandId, 'Bands.fee'), s = showId && state.shows ? state.shows[showId] : null;
    /* the guided first show: the big local draw plays for a cut of the door (SB.Tutorial.ask) */
    var first = s && SB.Tutorial && SB.Tutorial.ask ? SB.Tutorial.ask(state, bandId, showId) : null;
    if (first) return first;
    return feeOf(state, b, s ? s.zoneId : null, s ? (s.roomId || null) : undefined);
  }

  function waitDays(tv) {
    var W = C.WAIT.LOCAL_BAND;
    return Math.max(W.min, W.base - W.perTrust * tv / 100);
  }

  function replyWindow(state, bandId) {
    var b = getBand(state, bandId, 'Bands.replyWindow');
    if (!b.local) return { lo: C.WAIT.TOURING.days[0], hi: C.WAIT.TOURING.days[1] };
    var w = waitDays(trust(state, bandId).value), known = (b.shows || []).length > 0;
    var lo = Math.max(1, Math.round(w * 0.6)), hi = Math.max(lo + 1, Math.round(w * (known ? 1.4 : 1.8)));
    return { lo: lo, hi: hi };
  }

  /* How a yes looks, in a word for the ask row (fix list 2.19): LIKELY, GOOD, EVEN or LONG; BOOKED when they are out
   * that night; OWN for the player's own band. No numbers leave here. */
  function yesWords(state, bandId, showId, slot) {
    var b = getBand(state, bandId, 'Bands.yesWords'), show = showId && state.shows ? state.shows[showId] : null, f, j, tv, k;
    if (b.isPlayer) return { k: 'OWN', yes: 1 };
    if (!show) return null;
    if (!isFreeExcept(state, b, show.day, show.id)) return { k: 'BOOKED', yes: 0 };
    /* the guided first show: a band the texts name will say yes (SB.Tutorial.rig), so the row does not call it a long shot */
    if (SB.Tutorial && SB.Tutorial.rig && SB.Tutorial.rig(state, { kind: 'BAND_PLAY', toId: bandId, showId: showId })) return { k: 'LIKELY', yes: 1 };
    f = fee(state, bandId, showId);
    j = judge(state, b, { payload: { showId: showId, wantSlot: slot || wantedSlot(state, b), fee: f ? f.amount : 0 } });
    tv = j.trust;
    if (j.room < 0) return { k: 'LONG', yes: 0.05 };
    k = j.yes >= 0.7 ? 'LIKELY' : (j.yes >= 0.5 ? 'GOOD' : (j.yes >= 0.3 ? 'EVEN' : 'LONG'));
    if (tv < C.TRUST_AT.noAnswer && k !== 'LONG') k = 'EVEN';
    return { k: k, yes: Math.round(j.yes * 100) / 100 };
  }

  /* The text a local band gets when you asked several of them for one slot and somebody else said yes first. */
  function filledLine(state, bandId, showId, winnerId) {
    var b = getBand(state, bandId, 'Bands.filledLine'), show = state.shows && state.shows[showId], w = winnerId && state.bands[winnerId],
        g = contactGen(state, b), slots = bandSlots(state, b, show, { other: w ? w.name : 'the other band' });
    return say(state, 'requests.filled.' + g, slots);
  }

  /* What a band says when the player tells them the show is off. */
  function cancelLine(state, bandId, showId) {
    var b = getBand(state, bandId, 'Bands.cancelLine'), show = state.shows && state.shows[showId];
    return say(state, 'requests.cancelReply.' + contactGen(state, b), bandSlots(state, b, show));
  }

  /* The player's own band (fix list 4.9). state.player.band = { name, genre } is written by the setup question; the
   * record here is a free local act with a few friends who come, which grows with the shows it plays (afterShow), and which
   * never breaks up on its own. Safe to call any time: nothing happens without a name, and it makes the record once. */
  function ensurePlayerBand(state) {
    var pb = state.player && state.player.band, genre, id, b;
    if (!pb || typeof pb.name !== 'string' || !pb.name.trim()) return null;
    if (pb.id && state.bands && state.bands[pb.id]) return pb.id;
    if (!SB.WorldGen || !SB.WorldGen.band) return null;
    genre = typeof pb.genre === 'string' ? (E.GENRE[pb.genre] ? pb.genre : (E.GENRE[pb.genre.toUpperCase()] ? pb.genre.toUpperCase() : null)) : null;
    id = SB.WorldGen.band(state, { genre: genre || undefined, zoneId: 'city', tier: 0, stage: 'NEW', draw: 7, gen: 1 });
    b = state.bands[id];
    b.name = pb.name.trim();
    b.isPlayer = true; b.playerBand = true; b.motive = 'FUN'; b.stage = 'NEW';
    b.hid.freeRate = 1; b.hid.feeAt = 0; b.hid.needs = []; b.hid.cohesion = 1; b.hid.live = Math.max(b.hid.live || 0, 55);
    b.followers = Math.max(b.followers || 0, 20);
    pb.id = id;
    return id;
  }

  function card(state, bandId) {
    var b = getBand(state, bandId, 'Bands.card'), tr = trust(state, bandId), wk = week(state), day = today(state);
    var P = packOf(state), home;
    if (b.local) home = (state.zones[b.zoneId] && state.zones[b.zoneId].name) || P.zones[0].name;
    else home = b.place ? (b.place.name + (b.place.state ? ', ' + b.place.state : '')) : '';
    var listed = 0;
    var members = b.members.map(function (m) {
      var p = state.people[m.personId], l = !!(p && p.listed);
      if (l) listed++;
      return { personId: m.personId, name: personName(state, m.personId), instrument: m.instrument, since: m.since,
               founder: !!m.founder, listed: l };
    });
    var past = (b.past || []).map(function (m) {
      var p = state.people[m.personId], now = null;
      if (p) {
        var cur = (p.bands || []).filter(function (x) { return state.bands[x] && !ended(state.bands[x]); });
        if (cur.length) now = state.bands[cur[0]].name;
        else if (p.state === 'LEFT_TOWN') now = 'left town';
      }
      return { personId: m.personId, name: personName(state, m.personId), now: now };
    });
    var heard = (b.shows || []).length > 0 || (b.plays || []).length > 0;
    var buzzWord = !heard ? null : (b.hid.buzz > 0.25 ? 'rising' : (b.hid.buzz < -0.25 ? 'fading' : 'steady'));
    var shows = (b.shows || []).map(function (sid) {
      var s = state.shows && state.shows[sid], rec0 = state.legacy && state.legacy.records && state.legacy.records[sid];
      var room = s && state.rooms[s.roomId];
      return { showId: sid, day: s ? s.day : (rec0 ? rec0.day : null), roomName: room ? room.name : (rec0 ? rec0.roomName : ''),
               verdict: s && s.result ? s.result.verdict : (rec0 ? rec0.verdict : null),
               vsPar: s && s.result ? s.result.vsPar : (rec0 ? rec0.vsPar : null) };
    });
    return {
      id: b.id, name: b.name, local: b.local, own: !!b.isPlayer, home: home, genre: b.genre, genre2: b.genre2, style: b.style || b.genre,
      years: Math.max(0, SB.time.year(day) - b.formedYear), stage: b.stage, followers: b.followers, tierPublic: b.tierPublic,
      members: members, past: past,
      trust: { value: tr.value, stage: tr.stage }, ask: b.ask ? U.copy(b.ask) : null,
      motive: b.knows && b.knows.motive ? b.motive : null, needs: (b.knows && b.knows.needs ? b.knows.needs.slice() : []),
      draw: rangeView(state, nkey('draw', b.id, b.local ? 'city' : 'city')),
      live: rangeView(state, nkey('live', b.id)), cross: rangeView(state, nkey('cross', b.id)),
      rel: rangeView(state, nkey('rel', b.id)), promo: rangeView(state, nkey('promo', b.id)),
      gens: profile(state, b).slice(),
      buzzWord: buzzWord,
      trend: SB.Trends && SB.Trends.arrow ? SB.Trends.arrow(state, b.genre) : null,
      playedOut: b.playedOutUntil !== null && b.playedOutUntil >= wk,
      out: b.outUntil !== null && b.outUntil > day,
      listedMembers: listed,
      shows: shows,
      history: (b.history || []).map(function (h) { return { week: h.week, text: h.text }; })
    };
  }

  /* ------------------------------------------------------------------ */
  /* trust                                                               */
  /* ------------------------------------------------------------------ */

  function addTrust(state, bandId, k, ctx) {
    var b = getBand(state, bandId, 'Bands.addTrust'), T = C.TRUST_EVENTS[k];
    if (!T) SB.fail('Bands.addTrust', 'unknown trust event ' + k);
    ctx = ctx || {};
    var before = trust(state, bandId);
    var scale = typeof ctx.scale === 'number' ? U.clamp(ctx.scale, 0, 1) : 0.5;
    var size = Array.isArray(T.size) ? T.size[0] + (T.size[1] - T.size[0]) * scale : T.size;
    size = Math.round(size * 10) / 10;
    b.trust.events.push({ k: k, size: size, week: week(state), fade: T.fade, keep: T.keep, showId: ctx.showId || null });
    b.hid.lastContact = week(state);
    var after = trust(state, bandId);
    return rec(state, 'TRUST', { id: bandId, name: b.name, d: after.value - before.value, k: k, value: after.value,
                                 stage: after.stage, stageChanged: after.stage !== before.stage,
                                 text: say(state, 'people.trust.' + k, { band: b.name }) }, ctx.showId || null);
  }

  /* ------------------------------------------------------------------ */
  /* asks (BAND_PLAY)                                                    */
  /* ------------------------------------------------------------------ */

  function wantedSlot(state, b) {
    var t = tier(state, b, 'city');
    return t >= 2 ? 'CLOSE' : (t === 1 ? 'MIDDLE' : 'OPEN');
  }

  function topOther(state, show, bandId) {
    if (!show || !show.bill || !show.bill.slots) return null;
    var best = null;
    show.bill.slots.forEach(function (sl) {
      var o = state.bands[sl.bandId];
      if (!o || o.id === bandId) return;
      if (sl.role === 'TOURING') { if (!best || best.role !== 'TOURING') best = { band: o, role: 'TOURING' }; return; }
      if (!best || (best.role !== 'TOURING' && o.tierPublic > best.band.tierPublic)) best = { band: o, role: sl.role };
    });
    return best ? best.band : null;
  }

  function playedRoomWell(state, b, roomId) {
    return (b.shows || []).some(function (sid) {
      var s = state.shows && state.shows[sid];
      return s && s.roomId === roomId && s.result && s.result.q >= 60;
    });
  }

  function refusesRoom(state, b, show) {
    return (b.hid.needs || []).indexOf('ALL_AGES') >= 0 && show && show.door && show.door.ages === 'A21';
  }

  function judge(state, b, ask) {
    var pl = ask.payload || {}, show = state.shows && state.shows[pl.showId], day = today(state);
    var tv = trust(state, b.id).value, myTier = tier(state, b, 'city');
    var top = topOther(state, show, b.id), billS = 0, slotS = 0, moneyS, roomS = 0, worn = false;
    if (top) {
      billS = U.clamp(2 * affinity(state, b.genre, top.genre, 1) - 1 + 0.25 * (tier(state, top, 'city') - myTier), -1, 1);
    }
    var want = wantedSlot(state, b), asked = pl.wantSlot || 'MIDDLE';
    if (asked === want) slotS = 1;
    else if (myTier >= 2 && SLOT_RANK[asked] < SLOT_RANK[want]) slotS = -1;
    var f = feeOf(state, b, show ? show.zoneId : null, show ? (show.roomId || null) : undefined);
    moneyS = U.clamp(((pl.fee || 0) - f.amount) / Math.max(f.amount, C.YES.moneyFloor), -1, 1);
    if (show && playedRoomWell(state, b, show.roomId)) roomS = 1;
    if (refusesRoom(state, b, show)) roomS = -1;
    (b.plays || []).forEach(function (p) { if (p <= day && day - p <= C.YES.wornDays) worn = true; });
    var yes = C.YES.base + C.YES.perTrust * (tv - 30) + C.YES.bill * billS + C.YES.slot * slotS + C.YES.money * moneyS +
              C.YES.room * roomS + (worn ? C.YES.worn : 0) + (pl.inPerson ? C.WAIT.LOCAL_BAND.inPersonYes : 0);
    return { yes: U.clamp(yes, C.YES.min, C.YES.max), trust: tv, bill: billS, money: moneyS, room: roomS, worn: worn, fee: f,
             show: show, daysOut: show ? show.day - day : 99 };
  }

  /** Why a band said no, as the content key of people.band. */
  function noKey(state, b, j, free) {
    if (!free) return 'ASK_NO_BUSY';
    if (j.room < 0) return 'ASK_NO_ROOM';
    if (j.worn) return 'ASK_NO_PLAYED_OUT';
    if (j.bill < 0) return 'ASK_NO_BILL';
    return 'ASK_NO_BUSY';
  }

  function bandSlots(state, b, show, extra) {
    var room = show && state.rooms[show.roomId], top = topOther(state, show, b.id);
    var s = { band: b.name, room: room ? room.name : '', touring: top ? top.name : '',
              date: show ? SB.time.date(show.day).d : '', dow: show ? SB.time.fmt(show.day, 'dow') : '' };
    if (extra) Object.keys(extra).forEach(function (k) { s[k] = extra[k]; });
    return s;
  }

  function contactGen(state, b) {
    var p = state.people[b.contactId];
    return GEN_KEY[p ? p.gen : 1];
  }

  function lineFor(state, b, key, slots) {
    var g = contactGen(state, b), path = 'people.band.' + key;
    if (SB.text.has(path + '.' + g)) return say(state, path + '.' + g, slots);
    return say(state, path, slots);
  }

  function answerAsk(state, ask, phase) {
    if (!ask || !ask.toId) SB.fail('Bands.answerAsk', 'no ask');
    var b = getBand(state, ask.toId, 'Bands.answerAsk'), r = rb(state), pl = ask.payload || {};
    var show = state.shows && state.shows[pl.showId];
    if (phase === 'SEND') {
      var j = judge(state, b, ask), tv = j.trust, W = C.WAIT.LOCAL_BAND;
      var days = waitDays(tv) * r.range(0.7, 1.3), will, counter = null;
      var free = show ? isFreeExcept(state, b, show.day, show.id) : active(b);
      b.hid.lastContact = week(state);
      if (!free || j.room < 0) will = 'NO';
      else if (tv < C.TRUST_AT.noAnswer) will = 'SILENT';
      else if ((j.daysOut < C.YES.lastDays && tv < C.TRUST_AT.solid) || (j.daysOut < C.YES.shortDays && tv < C.TRUST_AT.shortNotice)) {
        will = r.chance(0.5) ? 'NO' : 'SILENT';
      } else if (r.chance(W.silent * Math.pow(1 - tv / 100, W.silentExp))) will = 'SILENT';
      else if (r.chance(j.yes)) will = 'YES';
      else if (j.money < -0.3 && b.motive !== 'FUN' && r.chance(0.5)) {
        will = 'COUNTER';
        counter = U.copy(pl); counter.fee = j.fee.amount; counter.pay = j.fee.pay;
      } else will = 'NO';
      if (pl.inPerson) days = 0;
      return { days: Math.round(days * 10) / 10, will: will, counter: counter };
    }
    if (phase === 'DELIVER') {
      var will0 = (ask.hid && ask.hid.will) || 'NO', status = will0, text, counter0 = null, j2 = judge(state, b, ask);
      var free0 = show ? isFreeExcept(state, b, show.day, show.id) : active(b);
      if ((status === 'YES' || status === 'COUNTER') && (!free0 || ended(b))) status = 'NO';
      if (status === 'YES') text = lineFor(state, b, 'ASK_YES', bandSlots(state, b, show, { fee: pl.fee }));
      else if (status === 'COUNTER') {
        counter0 = (ask.hid && ask.hid.counter) ? U.copy(ask.hid.counter) : U.copy(pl);
        counter0.fee = j2.fee.amount; counter0.pay = j2.fee.pay;
        text = lineFor(state, b, 'WANTS_MONEY', bandSlots(state, b, show, { fee: j2.fee.amount }));
      } else if (status === 'NO') text = lineFor(state, b, noKey(state, b, j2, free0), bandSlots(state, b, show));
      else text = '';
      return { status: status, text: text, counter: counter0, records: [] };
    }
    return SB.fail('Bands.answerAsk', 'unknown phase ' + phase);
  }

  /* ------------------------------------------------------------------ */
  /* lineups and endings                                                 */
  /* ------------------------------------------------------------------ */

  function news(state, k, refs, path, slots) {
    return rec(state, 'NEWS', { k: k, refs: refs, text: say(state, path, slots) });
  }

  function history(state, b, k, path, slots, showId) {
    b.history.push({ week: week(state), k: k, showId: showId || null, text: say(state, path, slots) });
  }

  /* SPEC?: person.bands and pastBands belong to E4 People, but no People function records a lineup change;
   * Bands, which owns the lineup, keeps the person's side in step. */
  function leavePerson(state, pid, bandId) {
    var p = state.people[pid];
    if (!p) return;
    var i = p.bands.indexOf(bandId);
    if (i >= 0) p.bands.splice(i, 1);
    if (p.pastBands.indexOf(bandId) < 0) p.pastBands.push(bandId);
  }

  function endBand(state, b, why) {
    var wk = week(state), out = [];
    if (ended(b)) return out;
    b.members.forEach(function (m) {
      b.past.push({ personId: m.personId, instrument: m.instrument, from: m.since, to: wk, why: 'LIFE' });
      leavePerson(state, m.personId, b.id);
    });
    b.members = [];
    b.stage = 'ENDED';
    b.endedWeek = wk;
    history(state, b, 'ENDED', 'legacy.bandHistory.ENDED', { band: b.name, season: seasonOf(today(state)) });
    out.push(news(state, 'BAND_ENDED', { bandId: b.id }, 'people.news.BAND_ENDED', { band: b.name }));
    return out;
  }

  function reopen(state, b) {
    if (!SB.Notebook || !SB.Notebook.reopen) return;
    /* SPEC?: reopen takes a prefix. 'draw:<id>:' is exact; for the single-key families the key itself is passed,
     * which as a prefix would also catch a band whose id extends this one (b1 and b12). */
    SB.Notebook.reopen(state, 'draw:' + b.id + ':', C.MEMBER.reopen);
    ['live', 'cross', 'rel', 'promo'].forEach(function (f) { SB.Notebook.reopen(state, nkey(f, b.id), C.MEMBER.reopen); });
  }

  function replacement(state, b, instrument, gen) {
    var r = rb(state), zone = b.zoneId || null, pool = [];
    if (zone) {
      Object.keys(state.people).forEach(function (id) {
        var p = state.people[id];
        if (p.state === 'ACTIVE' && p.zoneId === zone && p.roles.indexOf('MUSICIAN') >= 0 && !p.listed &&
            p.bands.length === 0 && Math.abs(p.gen - gen) <= 1 && b.past.every(function (x) { return x.personId !== id; })) pool.push(id);
      });
    }
    if (pool.length && r.chance(0.8)) return r.pick(pool);
    return SB.WorldGen.person(state, zone ? { roles: ['MUSICIAN'], gen: gen, zoneId: zone, instrument: instrument }
                                          : { roles: ['MUSICIAN'], gen: gen, place: b.place, instrument: instrument });
  }

  function removeMember(state, bandId, personId, why) {
    var b = getBand(state, bandId, 'Bands.removeMember'), r = rb(state), wk = week(state), out = [];
    var idx = -1;
    b.members.forEach(function (m, i) { if (m.personId === personId) idx = i; });
    if (idx < 0) SB.fail('Bands.removeMember', personId + ' is not in ' + bandId);
    if (!E.LEFT_WHY[why]) why = 'LIFE';
    var m = b.members.splice(idx, 1)[0];
    b.past.push({ personId: personId, instrument: m.instrument, from: m.since, to: wk, why: why });
    leavePerson(state, personId, bandId);
    var name = personName(state, personId);
    out.push(news(state, 'MEMBER_LEFT', { bandId: bandId, personId: personId }, 'people.news.MEMBER_LEFT',
                  { band: b.name, member: name, why: why }));
    reopen(state, b);
    if (b.contactId === personId) b.contactId = b.members.length ? b.members[0].personId : null;
    var core = ['DRUMS', 'BASS', 'VOX', 'GUITAR'];
    var stillCovered = b.members.some(function (x) { return x.instrument === m.instrument; });
    if (b.members.length >= 3 && (stillCovered || core.indexOf(m.instrument) < 0)) {
      history(state, b, 'LINEUP', 'legacy.bandHistory.LINEUP', { band: b.name, left: name, joined: '' });
      return out;
    }
    var outWeeks = r.int(C.MEMBER.outWeeks[0], C.MEMBER.outWeeks[1]);
    if (b.members.length >= 2 && r.chance(C.MEMBER.replaced)) {
      var gen = state.people[personId] ? state.people[personId].gen : 1;
      var pid = replacement(state, b, m.instrument, gen);
      b.members.push({ personId: pid, instrument: m.instrument, since: wk + outWeeks, founder: false });
      var p = state.people[pid];
      if (p.bands.indexOf(b.id) < 0) p.bands.push(b.id);
      if (!p.instrument) p.instrument = m.instrument;
      b.outUntil = today(state) + outWeeks * 7;
      b.hid.live = Math.round(U.clamp(b.hid.live + r.range(-C.MEMBER.liveShift, C.MEMBER.liveShift), 20, 95));
      b.hid.cross = r2(U.clamp(0.7 * b.hid.cross + 0.3 * r.range(0, 0.7), 0, 1));
      history(state, b, 'LINEUP', 'legacy.bandHistory.LINEUP', { band: b.name, left: name, joined: personName(state, pid) });
      out.push(news(state, 'MEMBER_JOINED', { bandId: bandId, personId: pid }, 'people.news.MEMBER_JOINED',
                    { band: b.name, member: personName(state, pid), newMember: personName(state, pid) }));
      return out;
    }
    return out.concat(endBand(state, b, 'MEMBER_LEFT'));
  }

  /* ------------------------------------------------------------------ */
  /* after a show                                                        */
  /* ------------------------------------------------------------------ */

  function demandOf(show, outcome) {
    return (outcome && outcome.demand) || (show.night && show.night.demand) || (show.result && show.result.demand) || null;
  }

  /** Mean of A_b(s, g) x G_b[g] over the people in the room, from the Demand cells (zone-major, 3 x 12 per zone). */
  function fitMean(state, b, demand) {
    var G = genTruth(state, b), zones = Object.keys(state.zones), cells = demand && demand.cells, tot = 0, acc = 0, zi, g, s, h, a;
    if (!cells || !cells.length) return 0.5;
    for (zi = 0; zi < zones.length; zi++) {
      for (g = 0; g < 3; g++) {
        for (s = 0; s < 12; s++) {
          h = cells[zi * 36 + g * 12 + s] || 0;
          if (h <= 0) continue;
          a = affinity(state, GENRES[s], b.genre, g);
          if (b.genre2) a = (1 - C.SECOND_GENRE) * a + C.SECOND_GENRE * affinity(state, GENRES[s], b.genre2, g);
          acc += h * a * G[g]; tot += h;
        }
      }
    }
    return tot > 0 ? acc / tot : 0.5;
  }

  function soundOf(state, show) {
    var room = state.rooms[show.roomId], pa = room && room.pa !== null ? room.pa : 0, sp = show.crew && show.crew.sound;
    var p = sp && state.people[sp], skill = p && p.hid && p.hid.skill ? (p.hid.skill.SOUND || 0.6) : 0.6;
    var s = C.SOUND.pa * pa + (p ? C.SOUND.person * skill : C.SOUND.noPerson * pa);
    return s + ((show.mods && show.mods.soundAdd) || 0);
  }

  function paidRecord(state, show, sl) {
    var acc = (show.result && show.result.accounts) || (show.night && show.night.accounts) || null, agreed, paid = null;
    if (sl.role === 'TOURING') {
      agreed = (show.deal && show.deal.guarantee) || 0;
      if (acc) paid = (acc.guarantee || 0) + (acc.touringShare || 0);
    } else {
      agreed = sl.fee || 0;
      if (acc && acc.locals) acc.locals.forEach(function (x) { if (x.bandId === sl.bandId) paid = (paid || 0) + (x.amount || 0); });
    }
    if (agreed <= 0 && sl.role !== 'TOURING') return null;
    if (paid === null) return { k: 'PAID_AGREED', scale: 0.5 };
    if (paid + 0.5 < agreed) return { k: 'PAID_SHORT', scale: U.clamp(1 - paid / Math.max(1, agreed), 0, 1) };
    if (paid > agreed * 1.1 + 5) return { k: 'PAID_MORE', scale: 0.5 };
    return { k: 'PAID_AGREED', scale: 0.5 };
  }

  function slotName(i, n) { return i === 0 && n > 1 ? 'OPEN' : (i === n - 1 ? 'CLOSE' : 'MIDDLE'); }

  function afterShow(state, show, outcome, hostScores) {
    if (!show || !show.bill) SB.fail('Bands.afterShow', 'no show');
    outcome = outcome || {};
    var out = [], wk = week(state), demand = demandOf(show, outcome), slots = show.bill.slots || [];
    var heads = outcome.heads || 0, dHeads = demand && demand.heads ? demand.heads : heads, scaleH = dHeads > 0 ? Math.min(1, heads / dHeads) : 1;
    var byBand = (demand && demand.byReason && demand.byReason.BAND) || {};
    var sets = outcome.sets || [], peakIdx = -1, touring = null, reach = 1, sound = soundOf(state, show), q = outcome.q || 0;
    sets.forEach(function (st, i) { if (st.peak) peakIdx = i; });
    slots.forEach(function (sl) { if (sl.role === 'TOURING' && state.bands[sl.bandId]) touring = state.bands[sl.bandId]; });
    if (demand && demand.reach) reach = U.mean(demand.reach);
    var zoneKind = state.zones[show.zoneId] ? state.zones[show.zoneId].kind : 'CITY';

    slots.forEach(function (sl, i) {
      var b = state.bands[sl.bandId];
      if (!b) return;
      var set = null;
      sets.forEach(function (st) { if (st.bandId === b.id) set = st; });
      var present = set ? set.present : heads, energy = set ? set.energy : 0.6, fill = set ? set.fill : 0.5;
      var cameFor = (byBand[b.id] || 0) * scaleH, newEars = Math.max(0, present - cameFor);
      var pos = slots.length > 1 && i === 0 ? 'opening' : (i === peakIdx || (sets[i] && sets[i].peak) ? 'peak' :
                (peakIdx >= 0 && i > peakIdx ? 'closingAfterPeak' : 'middle'));
      var dD = newEars * C.EAR_CONV * Math.pow((b.hid.live || 60) / C.EAR.liveRef, C.EAR.liveExp) * fitMean(state, b, demand) * C.EAR.slot[pos];
      var z = show.zoneId || 'city';
      b.hid.draw[z] = r2((b.hid.draw[z] || drawIn(state, b, z)) + dD);
      b.hid.drawPeak = Math.max(b.hid.drawPeak || 0, b.hid.draw[b.local ? (b.zoneId || 'city') : 'city'] || 0);
      b.hid.buzz = r2(U.clamp(b.hid.buzz + 0.1 * (outcome.posts || 0) / 20 + 0.2 * (energy - 0.6), -1, 1));
      if (b.local) b.followers = Math.max(0, Math.round(b.followers + dD / C.FOLLOW_RATE * 0.3));
      var firstShowEver = b.stage === 'FORMING' || (b.hid.firstWeek === null && !(b.plays || []).length);
      var priorShow = null;
      (b.shows || []).forEach(function (sid) {
        var s0 = state.shows && state.shows[sid];
        if (s0 && sid !== show.id && s0.day < show.day && (!priorShow || s0.day > priorShow.day)) priorShow = s0;
      });
      if ((b.plays || []).indexOf(show.day) < 0) b.plays.push(show.day);
      b.hid.lastPlay = Math.max(b.hid.lastPlay === null || b.hid.lastPlay === undefined ? show.day : b.hid.lastPlay, show.day);
      if (b.hid.firstWeek === null || b.hid.firstWeek === undefined) b.hid.firstWeek = wk;
      if (b.stage === 'FORMING') b.stage = 'NEW';
      var firstForYou = (b.shows || []).indexOf(show.id) < 0 && !(b.shows || []).length;
      if ((b.shows || []).indexOf(show.id) < 0) b.shows.push(show.id);
      if (!b.local) {
        b.visits.push({ day: show.day, showId: show.id, host: hostScores && typeof hostScores[b.id] === 'number' ? hostScores[b.id] : 0, q: q });
      }
      out.push(rec(state, 'DRAW', { bandId: b.id, name: b.name, newEars: Math.round(newEars) }, show.id));

      /* trust events (7.13) */
      var ctx = { showId: show.id };
      var pr = paidRecord(state, show, sl);
      if (pr) out.push(addTrust(state, b.id, pr.k, { showId: show.id, scale: pr.scale }));
      if (b.local && slotName(i, slots.length) === wantedSlot(state, b)) out.push(addTrust(state, b.id, 'GOOD_SLOT', ctx));
      if (q >= 60) out.push(addTrust(state, b.id, 'GOOD_NIGHT', { showId: show.id, scale: U.clamp((q - 60) / 30, 0, 1) }));
      if (fill < 0.2 && reach < 0.8) out.push(addTrust(state, b.id, 'EMPTY_ROOM', ctx));
      if (sound < 0.45) out.push(addTrust(state, b.id, 'BAD_SOUND', ctx));
      if (b.local && firstShowEver) out.push(addTrust(state, b.id, 'FIRST_SHOW', ctx));
      if (b.local && touring && touring.id !== b.id && affinity(state, b.genre, touring.genre, 1) >= 0.6 &&
          (touring.tierPublic || 0) > tier(state, b, 'city')) out.push(addTrust(state, b.id, 'WITH_HERO', ctx));
      if (priorShow && show.day - priorShow.day <= 26 * 7) out.push(addTrust(state, b.id, 'REBOOKED', ctx));
      if (heatOf(state, b.genre) < C.TREND.coldAt) out.push(addTrust(state, b.id, 'COLD_BOOKED', ctx));
      if (b.local && zoneKind === 'FEEDER' && b.zoneId === show.zoneId) out.push(addTrust(state, b.id, 'CAME_OUT', ctx));

      if (firstForYou) {
        var room = state.rooms[show.roomId];
        history(state, b, 'FIRST_SHOW_FOR_YOU', 'legacy.bandHistory.FIRST_SHOW_FOR_YOU',
                { band: b.name, slot: slotName(i, slots.length).toLowerCase(), dow: SB.time.fmt(show.day, 'dow'),
                  room: room ? room.name : '', month: SB.time.fmt(show.day, 'month'), count: Math.round(cameFor) }, show.id);
      }
    });
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* the weekly tick                                                     */
  /* ------------------------------------------------------------------ */

  function stageFor(state, b) {
    var wk = week(state);
    if (b.hid.firstWeek === null || b.hid.firstWeek === undefined) return 'FORMING';
    if (wk - b.hid.firstWeek < 52) return 'NEW';
    var t = tier(state, b, 'city');
    if (b.hid.fallWeeks >= 52 && t < 4) return 'FADING';
    return t >= 4 ? 'BROKE_OUT' : (t === 3 ? 'DRAW' : (t === 2 ? 'ESTABLISHED' : 'COMING_UP'));
  }

  function leaveWhy(state, r, p) {
    var traits = (packOf(state).derived && packOf(state).derived.traits) || [];
    var keys = ['MOVED', 'LIFE', 'KICKED', 'SCHOOL', 'ORDERS'];
    var w = [0.35, 0.3, 0.1, p && p.gen === 0 ? 0.25 : 0.04, traits.indexOf('MILITARY') >= 0 ? 0.15 : 0];
    return r.weighted(keys, w) || 'LIFE';
  }

  function recentShows(state, weeks) {
    var from = today(state) - weeks * 7;
    return Object.keys(state.shows || {}).filter(function (sid) {
      var s = state.shows[sid];
      return s.status === 'PLAYED' && s.day >= from;
    });
  }

  function exMembers(state) {
    return Object.keys(state.people || {}).filter(function (id) {
      var p = state.people[id];
      if (p.state !== 'ACTIVE' || p.zoneId !== 'city' || p.roles.indexOf('MUSICIAN') < 0 || p.listed) return false;
      if (p.bands.length || !p.pastBands.length) return false;
      /* not someone whose last leaving was a move away */
      var last = null;
      p.pastBands.forEach(function (bid) {
        var b = state.bands[bid];
        (b ? b.past : []).forEach(function (x) { if (x.personId === id && (!last || x.to > last.to)) last = x; });
      });
      return !(last && (last.why === 'MOVED' || last.why === 'ORDERS'));
    });
  }

  function formBand(state, r) {
    var out = [], source = r.weighted(['exMembers', 'fromShows', 'newToTown'],
      [C.POOL.sources.exMembers, C.POOL.sources.fromShows, C.POOL.sources.newToTown]);
    var memberIds = [], fromShowId = null, origin = null, draw = 0, ex, shows;
    if (source === 'exMembers') {
      ex = exMembers(state);
      if (!ex.length) source = 'newToTown';
      else {
        ex = r.shuffle(ex).slice(0, r.int(1, Math.min(3, ex.length)));
        ex.forEach(function (pid) {
          var p = state.people[pid], best = 0;
          p.pastBands.forEach(function (bid) {
            var ob = state.bands[bid];
            if (!ob) return;
            var n = Math.max(1, (ob.members.length || 0) + ob.past.filter(function (x) { return x.to === ob.endedWeek; }).length);
            best = Math.max(best, (ob.hid.drawPeak || 0) / Math.max(3, n));
          });
          draw += best;
        });
        memberIds = ex;
      }
    }
    if (source === 'fromShows') {
      shows = recentShows(state, 8);
      if (!shows.length) source = 'newToTown';
      else {
        fromShowId = r.pick(shows);
        origin = SB.WorldGen.person(state, { roles: ['MUSICIAN', 'REGULAR'], gen: r.chance(0.6) ? 0 : 1, zoneId: 'city', originShowId: fromShowId });
        memberIds = [origin];
      }
    }
    draw = Math.max(1, C.POOL.newBandDraw * draw);
    var how = '';
    if (source === 'exMembers' && memberIds.length) {
      var pb = state.people[memberIds[0]].pastBands, ob = pb.length ? state.bands[pb[pb.length - 1]] : null;
      how = ob ? ob.name : '';
    }
    var bid = SB.WorldGen.band(state, { zoneId: 'city', memberIds: memberIds, stage: 'FORMING', tier: 0, fromShowId: fromShowId,
                                        draw: draw, how: how });
    var b = state.bands[bid];
    var names = b.members.map(function (m) { return personName(state, m.personId); });
    var story = null;
    if (fromShowId && state.legacy && state.legacy.records && state.legacy.records[fromShowId] && state.legacy.records[fromShowId].story) {
      story = state.legacy.records[fromShowId].story.name;
    }
    out.push(news(state, 'BAND_FORMED', { bandId: bid, personId: origin || (memberIds[0] || null), showId: fromShowId },
                  'people.news.BAND_FORMED', { band: b.name, members: names.join(', '), member: origin ? personName(state, origin) : names[0],
                                               fromShow: !!fromShowId, storyName: story || 'one of your shows', genre: b.genre }));
    if (fromShowId && SB.Legacy && SB.Legacy.mark) {
      var m = SB.Legacy.mark(state, 'BAND_FROM_SHOW', { bandId: bid, showId: fromShowId, personId: origin });
      if (m) out.push(m);
    }
    return out;
  }

  function addPlayerBand(state, spec) {
    var name = String((spec && spec.name) || '').replace(/\s+/g, ' ').trim().slice(0, 48), genre = spec && spec.genre, id, b, k;
    if (!state || !name) return null;
    for (k in state.bands) if (state.bands[k].playerBand || state.bands[k].isPlayer) return state.bands[k];
    if (!E.GENRE || !E.GENRE[genre]) genre = null;
    id = SB.WorldGen.band(state, { zoneId: 'city', tier: 0, genre: genre || undefined, draw: 10, stage: 'NEW', how: 'your friends' });
    b = state.bands[id];
    /* both flags: isPlayer is what the bill, the ask and the weekly wear read (ensurePlayerBand), playerBand the setup's */
    b.name = name; b.playerBand = true; b.isPlayer = true; b.genre2 = null; b.motive = 'FUN';
    b.hid.freeRate = 1; b.hid.feeAt = 0; b.hid.needs = []; b.hid.cohesion = 1;
    b.ask = { pay: 'FREE', amount: 0 };
    b.hid.honest = 1; b.hid.rel = 1;
    state.player.band = { name: name, genre: b.genre, id: id };
    return b;
  }

  function weekly(state) {
    var out = [], r = rb(state), wk = week(state), day = today(state), P = packOf(state);
    ensurePlayerBand(state);
    var churn = (P.scene && P.scene.memberChurn) || 0;

    /* other bookers' played shows wear the bands too (Bands is the one writer of band.plays) */
    (state.otherShows || []).forEach(function (o) {
      if (o.status !== 'PLAYED' || !o.bands) return;
      o.bands.forEach(function (bid) {
        var b = state.bands[bid];
        if (!b || b.plays.indexOf(o.day) >= 0 || day - o.day > C.WEAR.window * 7) return;
        b.plays.push(o.day);
        if (b.hid.lastPlay === null || b.hid.lastPlay === undefined || o.day > b.hid.lastPlay) b.hid.lastPlay = o.day;
        if (b.hid.firstWeek === null || b.hid.firstWeek === undefined) b.hid.firstWeek = SB.time.week(o.day);
      });
    });

    Object.keys(state.bands).forEach(function (id) {
      var b = state.bands[id];
      if (ended(b)) return;
      b.plays = b.plays.filter(function (p) { return day - p <= C.WEAR.window * 7; });
      b.hid.buzz = r2(b.hid.buzz * (1 - C.BUZZ_FADE));
      if (!b.local) return;

      var home = b.zoneId || 'city';
      Object.keys(b.hid.draw).forEach(function (z) { b.hid.draw[z] = r2(b.hid.draw[z] * (1 + C.BUZZ_DRAW * b.hid.buzz)); });
      var lp = lastPlayDay(b);
      if (lp !== null && (day - lp) / 7 > C.NEGLECT.afterWeeks) {
        Object.keys(b.hid.draw).forEach(function (z) {
          var floor = C.NEGLECT.floor * (z === home ? (b.hid.drawPeak || 0) : b.hid.draw[z]);
          b.hid.draw[z] = r2(Math.max(floor, b.hid.draw[z] * (1 - C.NEGLECT.perWeek)));
        });
      }
      var dh = b.hid.draw[home] || 0;
      b.hid.drawPeak = Math.max(b.hid.drawPeak || 0, dh);
      if (dh < (b.hid.lastDraw || 0) - 0.001) b.hid.fallWeeks = (b.hid.fallWeeks || 0) + 1;
      else if (dh > (b.hid.lastDraw || 0) + 0.001) b.hid.fallWeeks = 0;
      b.hid.lastDraw = dh;
      b.followers = Math.max(0, Math.round(b.followers + C.FOLLOWER_LAG * (dh / C.FOLLOW_RATE - b.followers)));
      b.tierPublic = tier(state, { hid: { draw: { city: b.followers * C.FOLLOW_RATE } }, local: true }, 'city');

      /* trust drifts toward TRUST_DRIFT.toward in months without contact */
      if (b.hid.lastContact === null || b.hid.lastContact === undefined || wk - b.hid.lastContact >= 4) {
        var step = C.TRUST_DRIFT.perMonth * 12 / 52 * (b.trust.base > C.TRUST_DRIFT.slowAbove ? 0.5 : 1);
        if (b.trust.base > C.TRUST_DRIFT.toward) b.trust.base = r2(Math.max(C.TRUST_DRIFT.toward, b.trust.base - step));
        else if (b.trust.base < C.TRUST_DRIFT.toward) b.trust.base = r2(Math.min(C.TRUST_DRIFT.toward, b.trust.base + step));
      }

      /* played out */
      b.hid.freshLine = (b.hid.freshLine || []).concat([r2(fresh(state, b, day + 7))]).slice(-C.PLAYED_OUT.weeks);
      if (b.hid.freshLine.length >= C.PLAYED_OUT.weeks && U.mean(b.hid.freshLine) < C.PLAYED_OUT.fresh &&
          (b.playedOutUntil === null || b.playedOutUntil < wk)) {
        b.playedOutUntil = wk + C.PLAYED_OUT.tagWeeks;
      }

      /* the player's own band keeps going: it does not break up or change lineup on its own */
      if (b.isPlayer) return;
      /* life stages */
      if (b.stage === 'ON_ICE') {
        if (r.chance(C.BAND_END.ON_ICE)) { out = out.concat(endBand(state, b, 'ICE')); return; }
        if (!r.chance(C.BAND_END.iceReturn)) return;
        b.stage = stageFor(state, b);
        history(state, b, 'BACK', 'legacy.bandHistory.BACK', { band: b.name, season: seasonOf(day) });
        out.push(news(state, 'BAND_STAGE', { bandId: b.id }, 'people.news.BAND_STAGE.' + b.stage, { band: b.name }));
        return;
      }
      var st = stageFor(state, b);
      if (st !== b.stage) {
        var prev = b.stage;
        b.stage = st;
        if (!(prev === 'FORMING' && st === 'NEW')) {
          history(state, b, 'STAGE', 'legacy.bandHistory.STAGE.' + st, { band: b.name, season: seasonOf(day) });
          out.push(news(state, 'BAND_STAGE', { bandId: b.id }, 'people.news.BAND_STAGE.' + st, { band: b.name }));
        }
      }
      var pEnd = C.BAND_END[b.stage] || 0;
      if ((b.hid.cohesion || 1) < C.BAND_END.lowCohesionAt) pEnd *= C.BAND_END.lowCohesion;
      if (heatOf(state, b.genre) < C.BAND_END.coldAt) pEnd *= C.BAND_END.coldMul;
      if (b.stage === 'BROKE_OUT') pEnd += C.BAND_END.relocatePerMonth * 12 / 52;
      if (r.chance(pEnd)) {
        if (['ESTABLISHED', 'DRAW', 'BROKE_OUT', 'FADING'].indexOf(b.stage) >= 0 && r.chance(0.3)) {
          b.stage = 'ON_ICE';
          history(state, b, 'STAGE', 'legacy.bandHistory.STAGE.ON_ICE', { band: b.name, season: seasonOf(day) });
          out.push(news(state, 'BAND_STAGE', { bandId: b.id }, 'people.news.BAND_STAGE.ON_ICE', { band: b.name }));
        } else out = out.concat(endBand(state, b, 'LIFE'));
        return;
      }
      /* members leaving */
      b.members.slice().forEach(function (m) {
        if (ended(b)) return;
        if (r.chance(C.MEMBER_LEAVE + churn)) out = out.concat(removeMember(state, b.id, m.personId, leaveWhy(state, r, state.people[m.personId])));
      });
    });

    /* new bands in the city */
    var scene = zoneSize(state, 'city') || P.scene.size;
    var rate = C.POOL.formPerYear * scene / C.POOL.perSceneRef / 52;
    while (rate > 0) {
      if (r.chance(Math.min(1, rate))) out = out.concat(formBand(state, r));
      rate -= 1;
    }
    /* SPEC?: mechanics 5.7's one-show reunion of an ended old-head band (BAND_END.reunion) is left out: no content or
     * show path exists for a one-night return. */
    return out;
  }

  /* ---------------- trimming (called by SB.Save.trim) ---------------- */

  var BAND_FAMS = { draw: 1, cross: 1, live: 1, rel: 1, promo: 1, honest: 1 };
  var REQ_OPEN = { NEW: 1, REPLIED: 1, NEGOTIATING: 1 };
  var TOURING_KEEP_DAYS = 26 * 7;

  /* Architect's ruling on the lifetimes 01-state 3 left out: a touring band with no open request, no show on the books,
   * no played show in this town (the player's or another booker's) and no contact tie is dropped 26 weeks after its last
   * request closed (a band that never sent one: 26 weeks after it was first found so, `idleDay`), with its closed
   * requests, its notebook estimates, its id in other bands' circles, and its members who appear nowhere else. */
  /* Which of the band ids in `cand` the state names outside the band's own record, its own (closed) requests, other
   * bands' circles, the people's lists of their bands, and the notebook's estimates. */
  var NAME_SKIP = { bands: 1, people: 1, requests: 1, notebook: 1, rng: 1, ids: 1 };
  function namedElsewhere(state, cand) {
    var found = {}, stack = [], k, id, o, i, v, keys, j, b, q;
    for (k in state) if (!NAME_SKIP[k] && state[k] && typeof state[k] === 'object') stack.push(state[k]);
    for (id in (state.bands || {})) {
      b = state.bands[id];
      if (!b || cand[id] === true) continue;
      for (k in b) if (k !== 'circle' && b[k] && typeof b[k] === 'object') stack.push(b[k]); else if (typeof b[k] === 'string' && cand[b[k]] === true) found[b[k]] = true;
    }
    for (id in (state.requests || {})) { q = state.requests[id]; if (q && cand[q.bandId] !== true) stack.push(q); }
    while (stack.length) {
      o = stack.pop();
      if (Array.isArray(o)) {
        for (i = 0; i < o.length; i++) { v = o[i]; if (typeof v === 'string') { if (cand[v] === true) found[v] = true; } else if (v && typeof v === 'object') stack.push(v); }
        continue;
      }
      keys = Object.keys(o);
      for (j = 0; j < keys.length; j++) {
        if (cand[keys[j]] === true) found[keys[j]] = true;
        v = o[keys[j]];
        if (typeof v === 'string') { if (cand[v] === true) found[v] = true; } else if (v && typeof v === 'object') stack.push(v);
      }
    }
    return found;
  }

  function trim(state) {
    var bands = state.bands, t = today(state), info = {}, tie = {}, id, b, q, s, i, j, x, drop = [], cand = {}, anyCand = false, found, gone, est;
    if (!bands || week(state) % 4 !== 0) return 0;              // every fourth week: the lifetime is in weeks
    function inf(bid) { return info[bid] || (info[bid] = { open: false, last: null }); }
    for (id in (state.requests || {})) {
      q = state.requests[id];
      if (!q || !q.bandId || !bands[q.bandId] || bands[q.bandId].local) continue;
      x = inf(q.bandId);
      if (REQ_OPEN[q.status] || (q.showId && state.shows && state.shows[q.showId])) x.open = true;
      else { j = SB.Requests && SB.Requests.closedOn ? SB.Requests.closedOn(q) : (q.closedDay || q.day || 0); if (x.last === null || j > x.last) x.last = j; }
    }
    for (id in (state.shows || {})) {
      s = state.shows[id];
      for (i = 0; s && s.bill && s.bill.slots && i < s.bill.slots.length; i++) tie[s.bill.slots[i].bandId] = true;
    }
    for (i = 0; i < (state.otherShows || []).length; i++) (state.otherShows[i].bands || []).forEach(function (bid) { tie[bid] = true; });
    for (id in (state.contacts || {})) {
      x = state.contacts[id];
      tie['p:' + id] = true;
      (x.owes || []).concat(x.youOwe || []).forEach(function (o) { if (o && o.bandId) tie[o.bandId] = true; });
    }
    for (id in (state.tours || {})) if (state.tours[id] && state.tours[id].bandId) tie[state.tours[id].bandId] = true;
    for (id in bands) {
      b = bands[id];
      if (!b || b.local) continue;
      x = info[id];
      if (tie[id] || (x && x.open) || (b.visits && b.visits.length) || (b.shows && b.shows.length) || (b.plays && b.plays.length) ||
          (b.contactId && tie['p:' + b.contactId]) || (b.members || []).some(function (m) { return tie['p:' + m.personId]; })) {
        if (b.idleDay !== undefined) delete b.idleDay;
        continue;
      }
      if (x && x.last !== null) j = x.last;
      else { if (typeof b.idleDay !== 'number') b.idleDay = t; j = b.idleDay; }
      if (t - j >= TOURING_KEEP_DAYS) drop.push(id);
    }
    if (!drop.length) return 0;
    /* anything else that still names the band (a message, the harm matter, a memory, a tour) is a tie as well */
    gone = {};
    for (i = 0; i < drop.length; i++) gone[drop[i]] = true;
    found = namedElsewhere(state, gone);
    drop = drop.filter(function (bid) { return !found[bid]; });
    if (!drop.length) return 0;
    gone = {};
    for (i = 0; i < drop.length; i++) gone[drop[i]] = true;
    est = state.notebook && state.notebook.est;
    for (i = 0; i < drop.length; i++) {
      b = bands[drop[i]];
      (b.members || []).forEach(function (m) { cand[m.personId] = true; anyCand = true; });
      (b.past || []).forEach(function (m) { cand[m.personId] = true; anyCand = true; });
      if (b.contactId) { cand[b.contactId] = true; anyCand = true; }
      delete bands[drop[i]];
    }
    /* their requests (all closed, none with a show), estimates, and places in other bands' circles */
    for (id in (state.requests || {})) { q = state.requests[id]; if (q && gone[q.bandId]) delete state.requests[id]; }
    if (est) for (id in est) { j = id.split(':'); if (BAND_FAMS[j[0]] && gone[j[1]]) delete est[id]; }
    for (id in bands) {
      b = bands[id];
      if (b && b.circle && b.circle.length && b.circle.some(function (c) { return gone[c]; })) b.circle = b.circle.filter(function (c) { return !gone[c]; });
    }
    /* their members, when they appear nowhere else */
    if (anyCand && state.people) {
      for (id in cand) {
        x = state.people[id];
        if (!x) { delete cand[id]; continue; }
        if (x.bands) x.bands = x.bands.filter(function (bid) { return !gone[bid]; });
        if (x.pastBands) x.pastBands = x.pastBands.filter(function (bid) { return !gone[bid]; });
      }
      found = SB.People && SB.People.refsTo ? SB.People.refsTo(state, cand) : cand;
      var dead = [];
      for (id in cand) if (!found[id]) dead.push(id);
      if (SB.People && SB.People.drop) SB.People.drop(state, dead);
    }
    return drop.length;
  }

  return {
    get: get, list: list, card: card, tier: tier, publicDraw: publicDraw, fresh: fresh, isFree: isFree, fee: fee,
    replyWindow: replyWindow, yesWords: yesWords, filledLine: filledLine, cancelLine: cancelLine, ensurePlayerBand: ensurePlayerBand, answerAsk: answerAsk, addTrust: addTrust, trust: trust, removeMember: removeMember,
    afterShow: afterShow, weekly: weekly,
    trim: trim,
    /* the player's own band (fix list 4.9): a free local act with a small crowd of friends, flagged playerBand, made once
       at setup. It plays by the same rules as the other locals (trust, wear, growth); only its ask is nothing. */
    addPlayerBand: addPlayerBand,
    /* the band stack: inStack / addToStack, and handover for a new game */
    inStack: inStack, addToStack: addToStack, handover: handover,
    /* extras (not in the manifest) */
    draw: function (state, bandId, zoneId) { return drawIn(state, getBand(state, bandId, 'Bands.draw'), zoneId || 'city'); },
    gen: function (state, bandId) { return genTruth(state, getBand(state, bandId, 'Bands.gen')); }
  };
});
