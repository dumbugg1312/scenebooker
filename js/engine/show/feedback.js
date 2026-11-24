/* Scene Booker — engine/show/feedback.js (role E2). SB.Feedback: the ledger, the causes of a night and the comments
 * (02-engine 3.4, 7.9).
 *
 * One comment, one cause. A cause's size is measured against a reference run of the model (the player's own midpoints
 * for what was hidden, the ordinary way for what was chosen); the voice is the person who would have noticed; the
 * knowledge level is what the notebook held on that cause before tonight.
 * `build` runs inside Night.finish, while show.night still stands (it reads night.final and leaves night.obsKeys for
 * the notebook). The causes it measured are kept on the result (result.causes), so a debrief days later reads them
 * and never re-measures a night the town has moved on from.
 * Streams: FEEDBACK (voices, wrong readings), TEXT (lines).
 */
SB.module('Feedback', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, EMPTY = [];
  var FAM_CAUSE = { aff: 'GENRE_MIX', cross: 'GEN_MIX', honest: 'DRAW_AWAY', night: 'NIGHT', zone: 'NIGHT', roomgen: 'ROOM_FIT', roomcap: 'ROOM_FIT',
                    roomfit: 'ROOM_FIT', promo: 'PROMO_SHARES', price: 'DOOR_PRICE', heat: 'TREND', live: 'SOUND', rel: 'RUNTIME' };
  var CONTROLLED = ['PROMO_ANNOUNCE', 'PROMO_FLYER', 'PROMO_POSTERS', 'PROMO_SHARES', 'PROMO_DMS', 'PROMO_EXIT', 'PROMO_PUSH', 'DOOR_PRICE', 'ORDER',
                    'RUNTIME', 'ROOM_FIT', 'AGE_GATE', 'NIGHT', 'SOUND', 'COMPETITION', 'TOWN_EVENT', 'OVERUSE', 'REPEAT', 'REGULARS', 'VENUE_REP',
                    'SAFETY', 'ADVANCE', 'GENRE_MIX', 'GEN_MIX', 'TREND'];
  var HELPER_CAUSE = { RUNNER: 'PROMO_POSTERS', ARTIST: 'PROMO_FLYER', FLOOR: 'SAFETY', LODGING: 'HOSPITALITY' };
  var SUBJECT = { KIDS: { voice: 'KID', causes: ['AGE_GATE', 'DOOR_PRICE', 'NIGHT', 'PROMO_DMS', 'TREND', 'RUNTIME', 'VENUE_REP', 'GEN_MIX'] },
                  OLD_HEADS: { voice: 'OLD_HEAD', causes: ['PROMO_POSTERS', 'RUNTIME', 'VENUE_REP', 'GENRE_MIX', 'ROOM_FIT', 'SOUND', 'GEN_MIX', 'OVERUSE'] },
                  ROOM: { voice: 'OWNER', causes: ['ROOM_FIT', 'SOUND', 'SAFETY', 'VENUE_REP', 'AGE_GATE', 'RUNTIME', 'TOWN_EVENT', 'ADVANCE'] },
                  MONEY: { voice: 'DOOR', causes: ['DOOR_PRICE', 'DOOR_COUNT', 'PAY', 'REGULARS', 'LOCAL_DRAW', 'PROMO_SHARES'] },
                  TOURING: { voice: 'TOURING', causes: ['DRAW_AWAY', 'HOSPITALITY', 'PAY', 'ADVANCE', 'PROMO_ANNOUNCE', 'ORDER', 'SOUND', 'ROOM_FIT'] } };
  var GEN_WORD = ['kids', 'middle', 'old'];

  function num(v, d) { return (typeof v === 'number' && v === v && v !== Infinity && v !== -Infinity) ? v : d; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function showOf(state, showId, where) {
    var s = state && state.shows && state.shows[showId];
    if (!s) SB.fail(where, 'unknown show "' + showId + '"');
    return s;
  }
  function roomOf(state, show) { return show.roomId && state.rooms ? state.rooms[show.roomId] : null; }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function line(state, path, slots) { return SB.text.off ? '' : (SB.text.has(path) ? SB.text.line(path, slots, textRng(state)) : ''); }
  function val(r) { return num(r.night.exact, r.night.heads) + 0.5 * r.night.q; }
  function genreName(g) { var S = SB.Content.strings; return (S && S.genre && S.genre[g] && (S.genre[g].plain || S.genre[g].name)) || g; }
  function genName(g) { var S = SB.Content.strings, k = E.GEN_KEY[g]; return (S && S.gen && S.gen[k] && S.gen[k].name) || GEN_WORD[g]; }
  function nightMods(show) { return (show.night && (show.night.finalMods || show.night.mods)) || show.mods || {}; }
  function topBand(state, show) {
    var billing = show.bill.billing, slots = show.bill.slots, i;
    if (billing && billing.length && state.bands[billing[0]]) return state.bands[billing[0]];
    for (i = 0; i < slots.length; i++) if (slots[i].role === 'TOURING' && state.bands[slots[i].bandId]) return state.bands[slots[i].bandId];
    return slots.length ? state.bands[slots[0].bandId] : null;
  }

  function causeOfKey(state, k) {
    var p = k.split(':'), b;
    if (p[0] === 'draw') { b = state.bands && state.bands[p[1]]; return b && !b.local ? 'DRAW_AWAY' : 'LOCAL_DRAW'; }
    if (p[0] === 'chan') return p[1] === 'ANNOUNCE' || p[1] === 'WOM' ? 'PROMO_ANNOUNCE' : (p[1] === 'SHARE' ? 'PROMO_SHARES' : 'PROMO_POSTERS');
    return FAM_CAUSE[p[0]] || null;
  }

  function activeCalendar(state, show) {
    var cal = SB.Cities.pack(state).calendar || EMPTY, dt = SB.time.date(show.day), wom = Math.floor((dt.d - 1) / 7) + 1, i, e;
    for (i = 0; i < cal.length; i++) {
      e = cal[i];
      if ((e.month === dt.m || (e.months && e.months.indexOf(dt.m) >= 0)) && (typeof e.week === 'number' ? e.week === wom : (e.weeks ? wom >= e.weeks[0] && wom <= e.weeks[1] : true)) &&
          (!e.dows || e.dows.indexOf(dt.dow) >= 0)) return e;
    }
    return null;
  }

  /* The context a cause is filed under (7.9): `big` is the key of the largest surprise in its group, when it has one. */
  function ctxOf(state, show, cause, hidden, big, actual) {
    var room = roomOf(state, show), slots = show.bill.slots, dow3 = SB.time.fmt(show.day, 'dow3').toLowerCase(), g, bg = 0, sg, i, j, b, a, genres = [], lo = 9, pair = null, p, f, bf, id, e, ts;
    var byGen = actual.night.byGen, N = SB.Notebook;
    for (g = 1; g < 3; g++) if (byGen[g] > byGen[bg]) bg = g;
    sg = bg === 0 ? 1 : 0;
    for (g = 0; g < 3; g++) if (g !== bg && byGen[g] > byGen[sg]) sg = g;
    for (i = 0; i < slots.length; i++) { b = state.bands[slots[i].bandId]; if (b && genres.indexOf(b.genre) < 0) genres.push(b.genre); }
    p = big ? big.split(':') : null;
    switch (cause) {
      case 'GENRE_MIX':
        if (hidden && p) return [p[1], p[2]].sort().join('+');
        for (i = 0; i < genres.length; i++) for (j = 0; j < genres.length; j++) {
          if (i === j) continue;
          a = num(N.pub(state, 'aff:' + genres[i] + ':' + genres[j]), 1);
          if (a < lo) { lo = a; pair = [genres[i], genres[j]].sort().join('+'); }
        }
        return pair || (genres[0] || '');
      case 'GEN_MIX': return [GEN_WORD[Math.min(bg, sg)], GEN_WORD[Math.max(bg, sg)]].join('+');
      case 'DRAW_AWAY': ts = null; slots.forEach(function (s) { if (s.role === 'TOURING' && !ts) ts = state.bands[s.bandId]; }); return ts && ts.visits && ts.visits.length ? 'return' : 'first';
      case 'LOCAL_DRAW': if (p) return p[1]; for (i = 0; i < slots.length; i++) if (slots[i].role !== 'TOURING') return slots[i].bandId; return '';
      case 'NIGHT': return dow3 + ':' + E.GEN_KEY[hidden && p && p[0] === 'night' ? Number(p[1]) : bg];
      case 'ROOM_FIT': case 'SOUND': case 'VENUE_REP': case 'SAFETY': return room ? room.id : '';
      case 'PROMO_ANNOUNCE': case 'PROMO_FLYER': case 'PROMO_POSTERS': case 'PROMO_SHARES': case 'RUNTIME': return room ? room.kind : '';
      case 'DOOR_PRICE': return E.GEN_KEY[hidden && p ? Number(p[1]) : bg];
      case 'TREND': if (hidden && p) return p[1]; b = topBand(state, show); return b ? b.genre : '';
      case 'ORDER': return String(slots.length);
      case 'AGE_GATE': return (room ? room.kind : '') + ':' + ((show.door && show.door.ages) || 'ALL');
      case 'TOWN_EVENT': e = activeCalendar(state, show); return e ? e.id : '';
      case 'OVERUSE':
        bf = 2; id = '';
        for (i = 0; i < slots.length; i++) {
          b = state.bands[slots[i].bandId];
          f = b && SB.Bands && typeof SB.Bands.fresh === 'function' ? num(SB.Bands.fresh(state, b, show.day), 1) : 1;
          if (f < bf) { bf = f; id = slots[i].bandId; }
        }
        return id;
      default: return '';
    }
  }

  /* ---------------- 7.9 cause effects ---------------- */

  /* the reference runs of one show share its environment (SB.Model.batch): nothing in the state changes between them */
  function measure(state, show) {
    return SB.Model.batch ? SB.Model.batch(state, function () { return measureRuns(state, show); }) : measureRuns(state, show);
  }
  function measureRuns(state, show) {
    var mods = nightMods(show), N = SB.Notebook, F = SB.Forecast, L = F.lens(state, 'TRUTH', { luck: false }), actual, A, dem, keys, groups = {}, parts = {}, order = [];
    var i, k, c, e, t, w, r, ref, fin = show.night && show.night.final, detail, slots = show.bill.slots, deal = show.deal || {}, v, n, sum, out = [], price, ks, x, s2;
    L.lite = true;
    actual = SB.Model.resolve(state, show, L, mods); A = val(actual);
    dem = (show.night && show.night.demand) || (show.result && show.result.demand) || actual.demand;
    function part(cause) { if (!parts[cause]) { parts[cause] = { s: 0, c: 0, keys: [], big: null, gap: -1 }; order.push(cause); } return parts[cause]; }
    /* surprise: the families set back to the player's own midpoints */
    keys = N.inPlay(state, show, dem);
    for (i = 0; i < keys.length; i++) {
      c = causeOfKey(state, keys[i]); e = N.est(state, keys[i]); t = N.truth(state, keys[i]);
      if (!c || !e || t === null) continue;
      if (!groups[c]) groups[c] = [];
      groups[c].push(keys[i]);
      w = Math.abs(t - e.mid) / Math.max(1e-9, e.p1 - e.p0);
      if (w > part(c).gap) { parts[c].gap = w; parts[c].big = keys[i]; }
    }
    ks = Object.keys(groups);
    for (i = 0; i < ks.length; i++) {
      c = ks[i];
      for (k = 0; k < groups[c].length; k++) L.set(groups[c][k], N.est(state, groups[c][k]).mid);
      r = SB.Model.resolve(state, show, L, mods);
      for (k = 0; k < groups[c].length; k++) L.unset(groups[c][k]);
      parts[c].s = A - val(r); parts[c].keys = groups[c];
    }
    /* controlled: one thing changed back to the ordinary way */
    for (i = 0; i < CONTROLLED.length; i++) {
      ref = F.reference(state, show, CONTROLLED[i], actual);
      if (!ref) continue;
      x = F.lens(state, 'TRUTH', ref.over); x.lite = true;
      r = SB.Model.resolve(state, ref.show, x, mods);
      part(CONTROLLED[i]).c = A - val(r);
      /* COMPETITION's reference also drops the bigger shows ahead (C.AHEAD): measured alone, so a comment can say when
       * saving it for tomorrow was the larger part of the loss */
      if (CONTROLLED[i] === 'COMPETITION' && parts.COMPETITION.c < 0) {
        x = F.lens(state, 'TRUTH', { luck: false, noAhead: true }); x.lite = true;
        v = A - val(SB.Model.resolve(state, show, x, mods));
        parts.COMPETITION.after = v < 0 && -v > Math.abs(parts.COMPETITION.c - v);
      }
    }
    price = show.door && !show.door.donation ? num(show.door.price, 0) : 0;
    if (price > 0) {
      x = F.lens(state, 'TRUTH', { luck: false, compsDefault: true, noLeak: true }); x.lite = true;
      r = SB.Model.resolve(state, show, x, mods);
      part('DOOR_COUNT').c = (actual.night.gross - r.night.gross) / price;
    }
    /* how the bands were treated: from the host scores, not from a run */
    detail = (fin && fin.hostDetail) || {};
    sum = 0; n = 0;
    slots.forEach(function (s) {
      if (s.role !== 'TOURING' || !detail[s.bandId]) return;
      v = 0; s2 = 0;
      if (deal.lodging || detail[s.bandId].FLOOR !== undefined) { v += show.crew && show.crew.lodging ? 1 : -1; s2++; }
      if (deal.meal || detail[s.bandId].MEAL !== undefined) { v += show.prep && show.prep.food !== null && show.prep.food !== undefined ? 1 : -1; s2++; }
      if (s2) { sum += v / s2; n++; }
    });
    if (n) part('HOSPITALITY').c = 12 * sum / n;
    sum = 0; n = 0;
    slots.forEach(function (s) {
      var d = detail[s.bandId];
      if (!d || !(d.agreed > 0)) return;
      sum += d.paid + 0.5 >= d.agreed ? 1 : (d.paid >= d.agreed / 2 ? 0 : -1); n++;
    });
    if (n || (show.night && show.night.splitTrust)) part('PAY').c = 12 * (n ? sum / n : 0) + 1.5 * num(show.night && show.night.splitTrust, 0);

    for (i = 0; i < order.length; i++) {
      c = order[i]; e = parts[c];
      if (!E.CAUSE[c] || (Math.abs(e.s) < 1e-6 && Math.abs(e.c) < 1e-6)) continue;
      v = Math.abs(e.s) > Math.abs(e.c);
      out.push({ cause: c, d: r1(e.s + e.c), hidden: v, ctx: ctxOf(state, show, c, v, e.big, actual), keys: e.keys.slice() });
      if (e.after) out[out.length - 1].after = true;
    }
    out.sort(function (a, b) { return Math.abs(b.d) - Math.abs(a.d); });
    return out;
  }

  function causes(state, showId) {
    var show = showOf(state, showId, 'Feedback.causes'), list;
    list = (show.result && show.result.causes) || (show.night && show.night.causes);
    if (list) return SB.util.copy(list);
    if (!roomOf(state, show) || !show.bill || !show.bill.slots || !show.bill.slots.length) return [];
    return measure(state, show);
  }

  /* ---------------- who was there to say it ---------------- */

  function firstName(state, gen, rng) {
    var pool = SB.Content.names && SB.Content.names.first && SB.Content.names.first[E.GEN_KEY[gen]], nm = pool && pool.length ? rng.pick(pool) : '';
    var age = gen === 0 ? rng.int(15, 20) : (gen === 1 ? rng.int(22, 34) : rng.int(37, 56));
    return nm ? nm + ', ' + age : '';
  }

  function voicesThere(state, show, out, dem, rng) {
    var V = {}, crew = show.crew || {}, slots = show.bill.slots, room = roomOf(state, show), P = state.people || {}, i, b, p, faces, bk, ids, others, jobs = state.jobs || {}, helpers = [];
    function person(id) { p = P[id]; return p ? { byId: id, byName: p.nick || p.first || '' } : null; }
    V.DOOR = { byId: null, byName: '' };   // the player works the door: what the door saw is the player's own note
    if (crew.sound && P[crew.sound]) V.SOUND = person(crew.sound);
    for (i = 0; i < slots.length; i++) {
      b = state.bands[slots[i].bandId]; if (!b) continue;
      if (slots[i].role === 'TOURING' && !V.TOURING) V.TOURING = { byId: b.id, byName: b.name };
      if (slots[i].role !== 'TOURING' && !V.LOCAL_BAND) V.LOCAL_BAND = { byId: b.id, byName: b.name };
    }
    if (out.byGen[0] > 0) V.KID = { byId: null, byName: firstName(state, 0, rng) };
    if (out.byGen[2] > 0) V.OLD_HEAD = { byId: null, byName: firstName(state, 2, rng) };
    if (num(dem && dem.byReason && dem.byReason.REGULAR, 0) >= 1) {
      faces = (state.regulars && state.regulars.faces) || EMPTY;
      V.REGULAR = (faces.length && person(rng.pick(faces))) || { byId: null, byName: firstName(state, 1, rng) };
    }
    ids = Object.keys(state.bookers || {}); bk = null;
    others = (state.otherShows || EMPTY).filter(function (o) { return o.day === show.day && o.status !== 'HELD'; });
    for (i = 0; i < ids.length && !bk; i++) if (num(state.bookers[ids[i]].rel, 0) >= 40 && state.bookers[ids[i]].active !== false && P[ids[i]]) bk = ids[i];
    if (!bk && others.length && others[0].bookerId && P[others[0].bookerId]) bk = others[0].bookerId;
    if (bk) V.BOOKER = person(bk);
    if (room && room.ownerId && P[room.ownerId]) V.OWNER = person(room.ownerId); else V.OWNER = { byId: null, byName: '' };
    V.POSTS = { byId: null, byName: '' };
    (show.jobs || EMPTY).forEach(function (id) {
      var j = jobs[id];
      if (!j || j.status !== 'DONE' || !j.by || j.by === 'player' || !P[j.by]) return;
      if (j.type === 'FLYER_RUN') helpers.push({ role: 'RUNNER', id: j.by, up: j.outcome !== 'DIFFERENT' });
      if (j.type === 'MAKE_FLYER') helpers.push({ role: 'ARTIST', id: j.by, up: j.outcome !== 'DIFFERENT' });
    });
    if (crew.floor && crew.floor !== 'player' && P[crew.floor]) helpers.push({ role: 'FLOOR', id: crew.floor, up: !(out.incidents && out.incidents.length) });
    if (crew.lodging && crew.lodging !== 'player' && P[crew.lodging]) helpers.push({ role: 'LODGING', id: crew.lodging, up: true });
    if (helpers.length) V.HELPER = person(helpers[0].id);
    V._helpers = helpers;
    return V;
  }

  /* ---------------- slots for a comment (03-content 7) ---------------- */

  function slotsFor(state, show, c, fin, dem) {
    var out = fin.outcome, room = roomOf(state, show), slots = show.bill.slots, p = show.promo || {}, top = topBand(state, show), s = {}, i, b, ts = null, loc = null, other = null;
    var parts = String(c.ctx || '').split('+'), genres = [], g, bg = 0, sg, day = null, zs, z, best = 0, os, e, ks, tw, about = null, sets = out.sets;
    for (i = 0; i < slots.length; i++) {
      b = state.bands[slots[i].bandId]; if (!b) continue;
      if (slots[i].role === 'TOURING' && !ts) ts = b;
      if (slots[i].role !== 'TOURING' && !loc) loc = b;
      if (genres.indexOf(b.genre) < 0) genres.push(b.genre);
    }
    if ((c.cause === 'LOCAL_DRAW' || c.cause === 'OVERUSE') && state.bands[c.ctx]) about = state.bands[c.ctx];
    if (c.cause === 'DRAW_AWAY' || c.cause === 'HOSPITALITY' || c.cause === 'PAY') about = ts || about;
    about = about || top;
    for (i = 0; i < slots.length; i++) if (state.bands[slots[i].bandId] && state.bands[slots[i].bandId] !== about && !other) other = state.bands[slots[i].bandId];
    for (g = 1; g < 3; g++) if (out.byGen[g] > out.byGen[bg]) bg = g;
    sg = bg === 0 ? 1 : 0;
    for (g = 0; g < 3; g++) if (g !== bg && out.byGen[g] > out.byGen[sg]) sg = g;
    s.n = out.heads; s.par = fin.par.heads; s.room = room ? room.name : ''; s.roomShort = room ? String(room.name).replace(/^the /i, '') : '';
    s.dow = SB.time.fmt(show.day, 'dow'); s.dowLower = s.dow.toLowerCase(); s.price = show.door ? num(show.door.price, 0) : 0;
    s.band = about ? about.name : ''; s.touring = ts ? ts.name : ''; s.local = loc ? loc.name : ''; s.otherBand = other ? other.name : '';
    if (c.cause === 'GENRE_MIX' && parts.length === 2) { s.genreA = genreName(parts[0]); s.genreB = genreName(parts[1]); }
    else { s.genreA = genres[0] ? genreName(genres[0]) : ''; s.genreB = genres[1] ? genreName(genres[1]) : s.genreA; }
    if (c.cause === 'TREND' && E.GENRE[c.ctx]) s.genreA = genreName(c.ctx);
    s.genA = genName(bg); s.genB = genName(sg);
    s.kids = out.byGen[0]; s.middle = out.byGen[1]; s.old = out.byGen[2]; s.turned = out.turnedAway; s.list = out.comps; s.late = out.lateMin;
    s.lastStart = sets.length ? SB.time.clock(sets[sets.length - 1].start) : '';
    s.you = state.player ? state.player.bookingName : '';
    s.sound = show.crew && show.crew.sound && state.people[show.crew.sound] ? state.people[show.crew.sound].first : '';
    s.security = show.crew && show.crew.security && state.people[show.crew.security] ? state.people[show.crew.security].first : '';
    /* security on the night (guard), or none where the show page asked for it (noGuard) */
    if (c.cause === 'SAFETY' && SB.Rooms && SB.Rooms.crewRules && room) {
      e = SB.Rooms.crewRules(state, room.id, show.id).security;
      if (e.on && e.chill) s.guardAtHouse = true; else if (e.on) s.guard = true; else if (e.required || e.recommended) s.noGuard = true;
    }
    switch (c.cause) {
      case 'PROMO_ANNOUNCE': day = p.announce; break;
      case 'PROMO_FLYER': day = p.flyer ? p.flyer.day : null; break;
      case 'PROMO_POSTERS': ks = Object.keys(p.runs || {}); for (i = 0; i < ks.length; i++) if (day === null || p.runs[ks[i]].day < day) day = p.runs[ks[i]].day; break;
      case 'PROMO_SHARES': ks = Object.keys(p.shares || {}); for (i = 0; i < ks.length; i++) if (typeof p.shares[ks[i]] === 'number' && (day === null || p.shares[ks[i]] < day)) day = p.shares[ks[i]]; break;
      case 'PROMO_PUSH': day = p.push; break;
      case 'PROMO_DMS': day = p.invites && p.invites.length ? p.invites[0] : null; break;
      case 'PROMO_EXIT': day = p.handouts && p.handouts.length ? p.handouts[0].day : null; break;
    }
    s.daysOut = typeof day === 'number' ? Math.max(0, show.day - day) : '';
    zs = Object.keys((dem && dem.byZone) || {});
    for (i = 0; i < zs.length; i++) { z = state.zones[zs[i]]; if (z && z.kind === 'FEEDER' && dem.byZone[zs[i]] > best) { best = dem.byZone[zs[i]]; s.town = z.name; } }
    s.count = Math.round(num(dem && dem.byReason && dem.byReason.REGULAR, 0));
    s.fewSaw = Math.max(0, Math.round(out.heads * 0.08 * Object.keys(p.runs || {}).length));
    os = (state.otherShows || EMPTY).filter(function (o) { return o.day === show.day && o.status !== 'HELD' && state.rooms[o.roomId]; })[0];
    s.otherShow = os ? state.rooms[os.roomId].name : '';
    /* saving it for a bigger show a night or three on (C.AHEAD), when that was the larger part of COMPETITION's loss */
    if (c.cause === 'COMPETITION' && c.after) {
      s.savingIt = true;
      e = SB.Crowd && typeof SB.Crowd.near === 'function' ? SB.Crowd.near(state, show.zoneId || (room && room.zoneId) || 'city', slots.map(function (x) { return x.bandId; }), show.day).after[0] : null;
      s.aheadShow = e ? e.room : ''; s.aheadNight = e ? SB.time.fmt(e.day, 'dow') : '';
    }
    e = activeCalendar(state, show); s.event = e ? e.label : '';
    tw = SB.Content.names && SB.Content.names.trend && about ? SB.Content.names.trend[c.cause === 'TREND' && E.GENRE[c.ctx] ? c.ctx : about.genre] : null;
    s.trendWords = Array.isArray(tw) && tw.length ? tw[0] : (typeof tw === 'string' ? tw : '');
    if ((c.cause === 'PROMO_POSTERS' || c.cause === 'SAFETY') && room && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0) {
      if (show.door && show.door.address === 'FULL') s.addressOut = true; else s.askAPunk = true;
    }
    return s;
  }

  function commentText(state, cause, voice, d, level, slots) {
    var base = 'feedback.comments.' + cause + '.', tail = '.' + (d > 0 ? 'UP' : 'DOWN') + '.' + level;
    if (SB.text.off) return '';
    if (cause === 'PROMO_FLYER' && d < 0 && slots && slots.daysOut === '') return SB.text.label('noFlyerLine');   // 0.10: no flyer was ever made
    if (SB.text.has(base + voice + tail)) return SB.text.line(base + voice + tail, slots, textRng(state));
    return SB.text.has(base + 'ANY' + tail) ? SB.text.line(base + 'ANY' + tail, slots, textRng(state)) : '';
  }

  /* ---------------- the ledger (7.9) ---------------- */

  /* the settle's "How you told people" names the flyer and the jobs behind it (fix list 2.7): ' (the flyer, a flyer run)' or '' */
  function toldBy(state, show) {
    var names = [], seen = {}, ids = show.jobs || EMPTY, i, j, v;
    if (SB.text.off) return '';
    for (i = 0; i < ids.length; i++) {
      j = state.jobs && state.jobs[ids[i]];
      if (!j || j.status !== 'DONE' || !C.JOBS[j.type] || C.JOBS[j.type].group !== 'TELLING') continue;
      v = SB.text.has('jobs.' + j.type + '.verb') ? String(SB.text.label('jobs.' + j.type + '.verb', {})) : '';
      if (v && !seen[v]) { seen[v] = true; names.push(v.toLowerCase()); }
    }
    return names.length ? ' (' + names.slice(0, 5).join(', ') + (names.length > 5 ? ', and more' : '') + ')' : '';
  }

  function ledger(state, show, fin, luckOut) {
    return SB.Model.batch ? SB.Model.batch(state, function () { return ledgerRuns(state, show, fin, luckOut); }) : ledgerRuns(state, show, fin, luckOut);
  }
  function ledgerRuns(state, show, fin, luckOut) {
    var F = SB.Forecast, out = fin.outcome, heads = out.heads, rows = [], dem = show.night.demand, draws = [], weather = null, i, L, prev, r, d, sum, parRun, promo, hidden, yours, hid, k;
    function label(col) { return line(state, 'feedback.ledger.' + col, {}); }
    function exact(x) { return num(x.night.exact, x.night.heads); }
    parRun = exact(SB.Model.resolve(state, show, F.lens(state, 'PAR', null), {}));
    promo = exact(F.ablate(state, show.id, 'PROMO')); hidden = exact(F.ablate(state, show.id, 'HIDDEN'));
    yours = Math.round(promo - parRun); hid = Math.round(hidden - promo);
    rows.push({ col: 'PAR', label: label('PAR'), d: fin.par.heads, cause: null });
    rows.push({ col: 'YOURS', label: label('YOURS') + toldBy(state, show), d: yours, cause: null });
    rows.push({ col: 'HIDDEN', label: label('HIDDEN'), d: hid, cause: null });
    sum = fin.par.heads + yours + hid;
    (dem.luck || EMPTY).forEach(function (x) { if (x.k === 'RAIN' || x.k === 'HEAT' || x.k === 'COLD') weather = x; else draws.push(x); });
    prev = hidden;
    for (i = weather ? -1 : 0; i < draws.length; i++) {
      L = F.lens(state, 'TRUTH', { luckDraws: draws.slice(0, i + 1) }); L.lite = true;
      r = exact(SB.Model.resolve(state, show, L, show.mods || {}));
      d = Math.round(r - prev); prev = r; k = i < 0 ? weather.k : draws[i].k;
      luckOut.push({ k: k, text: line(state, 'feedback.luck.' + k, { lost: Math.abs(d), n: Math.abs(d) }), d: d });
      rows.push({ col: 'LUCK', label: luckOut[luckOut.length - 1].text, d: d, cause: null });
      sum += d;
    }
    rows.push({ col: 'REST', label: label('REST'), d: heads - sum, cause: null });
    rows.push({ col: 'TOTAL', label: label('TOTAL'), d: heads, cause: null });
    return rows;
  }

  /* ---------------- comments (7.9, steps 1 to 8) ---------------- */

  function pickCauses(list, verdict) {
    var c = list.filter(function (x) { return Math.abs(x.d) >= 1; }), chosen = [], i, sign, other, small;
    function take(test, n) { for (i = 0; i < c.length && n > 0; i++) if (chosen.indexOf(c[i]) < 0 && test(c[i])) { chosen.push(c[i]); n--; } }
    take(function (x) { return x.hidden; }, C.COMMENTS.surprises);
    take(function (x) { return !x.hidden; }, C.COMMENTS.controlled);
    take(function () { return true; }, C.COMMENTS.base - chosen.length);
    sign = E.VERDICTS.indexOf(verdict) >= E.VERDICTS.indexOf('GOOD') ? 1 : (E.VERDICTS.indexOf(verdict) <= E.VERDICTS.indexOf('THIN') ? -1 : 0);
    if (sign && chosen.length && chosen.every(function (x) { return x.d * sign > 0; })) {
      other = c.filter(function (x) { return chosen.indexOf(x) < 0 && x.d * sign < 0; })[0];
      if (other) {
        small = chosen[0];
        chosen.forEach(function (x) { if (Math.abs(x.d) < Math.abs(small.d)) small = x; });
        chosen[chosen.indexOf(small)] = other;
      }
    }
    chosen.sort(function (a, b) { return Math.abs(b.d) - Math.abs(a.d); });
    return chosen;
  }

  function levelBelow(level, cap) { var o = ['NEW', 'LEARNING', 'KNOWS']; return o[Math.min(o.indexOf(level), o.indexOf(cap))]; }

  function build(state, showId) {
    var show = showOf(state, showId, 'Feedback.build'), night = show.night, fin = night && night.final, rng = SB.rng.stream(state, E.STREAM.FEEDBACK), nbk = state.notebook || {};
    var list, chosen, V, used = {}, comments = [], luckOut = [], learned = [], obs = {}, rows, out, dem, i, c, v, vs, voice, kind, wrong, hobby, level, text, who, slots, cm, L, carry, top, k, free, vLine, tier, wpath, n = 0, reg, focus;
    if (!fin) SB.fail('Feedback.build', 'show "' + showId + '" has no finished night');
    out = fin.outcome; dem = night.demand;
    list = measure(state, show); night.causes = list;
    rows = ledger(state, show, fin, luckOut);
    V = voicesThere(state, show, out, dem, rng);
    chosen = pickCauses(list, fin.verdict);
    /* a true cause that found no voice last time leads tonight */
    carry = nbk.carry && nbk.carry.length ? nbk.carry.shift() : null;
    if (carry && E.CAUSE[carry.cause] && !chosen.some(function (x) { return x.cause === carry.cause; })) chosen.unshift({ cause: carry.cause, d: carry.d, hidden: false, ctx: carry.ctx, keys: [], carried: true });

    function say(cz, voiceKey, opts) {
      opts = opts || {};
      who = opts.who || V[voiceKey] || { byId: null, byName: '' };
      level = opts.level || SB.Notebook.knowledge(state, cz.cause, cz.ctx);
      slots = slotsFor(state, show, cz, fin, dem);
      text = opts.text !== undefined ? opts.text : commentText(state, cz.cause, voiceKey, cz.d, level, slots);
      n += 1;
      cm = { id: 'c' + n, voice: voiceKey, byId: who.byId, byName: who.byName, cause: cz.cause, ctx: cz.ctx, dir: cz.d > 0 ? 1 : -1, level: level,
             kind: opts.kind || 'READING', starred: false, text: text, noteKey: cz.cause + '|' + cz.ctx, hid: { wrong: !!opts.wrong, trueCause: opts.trueCause || null } };
      cm.d = cz.d;
      comments.push(cm);
      if (!opts.wrong) {
        L = SB.Notebook.mark(state, cz.cause, cz.ctx, { showId: showId, voice: voiceKey, by: who.byId, dir: cm.dir });
        if (L) learned.push(L);
        if (cm.kind === 'OBSERVATION') (cz.keys || EMPTY).forEach(function (kk) { obs[kk] = true; });
      } else cm.noteKey = null;
      return cm;
    }
    function freeVoice(cause) {
      vs = E.CAUSE_VOICES[cause] || EMPTY;
      for (k = 0; k < vs.length; k++) if (V[vs[k]] && !used[vs[k]] && vs[k] !== 'HELPER') return vs[k];
      return null;
    }

    for (i = 0; i < chosen.length; i++) {
      c = chosen[i]; voice = freeVoice(c.cause);
      if (!voice) continue;                                 // nobody there to say it
      used[voice] = true;
      kind = (E.CAUSE_VOICES[c.cause] || EMPTY)[0] === voice ? 'OBSERVATION' : 'READING';
      hobby = E.VOICE_HOBBY[voice];
      wrong = kind === 'READING' && hobby && hobby !== c.cause && !rng.chance(C.READING_TRUE);
      if (!wrong) { say(c, voice, { kind: kind }); continue; }
      /* wrong in character: the voice blames its hobbyhorse; the true cause goes to someone else, tonight or next time */
      wpath = 'feedback.wrong.' + voice + '.' + c.cause;
      level = levelBelow(SB.Notebook.knowledge(state, hobby, ''), 'LEARNING');
      slots = slotsFor(state, show, { cause: hobby, ctx: '', d: c.d }, fin, dem);
      text = SB.text.off ? '' : (SB.text.has(wpath) ? SB.text.line(wpath, slots, textRng(state)) : commentText(state, hobby, voice, c.d, level, slots));
      say({ cause: hobby, ctx: '', d: c.d, keys: [] }, voice, { kind: 'READING', wrong: true, trueCause: c.cause, level: level, text: text });
      free = freeVoice(c.cause);
      if (free) { used[free] = true; say(c, free, { kind: (E.CAUSE_VOICES[c.cause] || EMPTY)[0] === free ? 'OBSERVATION' : 'READING' }); }
      else { nbk.carry = nbk.carry || []; nbk.carry.push({ cause: c.cause, ctx: c.ctx, d: c.d }); if (nbk.carry.length > 3) nbk.carry.shift(); }
    }
    /* each helper who worked it, in their own words */
    V._helpers.forEach(function (h) {
      var p = state.people[h.id], cause = HELPER_CAUSE[h.role], cz = { cause: cause, ctx: ctxOf(state, show, cause, false, null, { night: out }), d: h.up ? 1 : -1, keys: [] };
      say(cz, 'HELPER', { kind: 'OBSERVATION', who: { byId: h.id, byName: p.nick || p.first || '' }, text: line(state, 'feedback.helper.' + h.role + '.' + (h.up ? 'UP' : 'DOWN'), slotsFor(state, show, cz, fin, dem)) });
    });
    /* a regular, when enough of them came or the booker is known for one thing */
    reg = num(dem && dem.byReason && dem.byReason.REGULAR, 0); focus = state.player && state.player.focus;
    if (V.REGULAR && !used.REGULAR && (reg >= C.COMMENTS.regularAt || (focus && focus.kind === 'SPECIALIST')) && !comments.some(function (x) { return x.cause === 'REGULARS'; })) {
      c = list.filter(function (x) { return x.cause === 'REGULARS'; })[0] || { cause: 'REGULARS', ctx: '', d: reg, hidden: false, keys: [] };
      used.REGULAR = true; say(c, 'REGULAR', { kind: 'READING' });
    }
    top = null;
    comments.forEach(function (x) { if (!x.hid.wrong && (!top || Math.abs(x.d) > Math.abs(top.d))) top = x; });
    if (top) top.starred = true;
    comments.forEach(function (x) { delete x.d; });
    night.obsKeys = Object.keys(obs);

    tier = fin.verdict === 'WALL' ? 'TALKED' : fin.verdict;
    slots = slotsFor(state, show, { cause: 'NIGHT', ctx: '', d: 0 }, fin, dem);
    /* a night that went over the room's size, or that nearly nobody came to, is told as that: never "a normal night" (playtest 2026-11-23) */
    var rm = roomOf(state, show), capN = rm ? num(rm.cap, 0) : 0, packed = fin.outcome.turnedAway > 0 && SB.text.has('strings.verdict.tier.PACKED'),
        empty = !packed && capN > 0 && fin.outcome.heads <= capN * 0.2 && SB.text.has('strings.verdict.tier.EMPTY');
    if (packed) { tier = 'PACKED'; slots.turned = Math.round(fin.outcome.turnedAway); }
    if (empty) tier = 'EMPTY';
    vLine = SB.text.off ? '' : ((packed && fin.vsPar === 'ABOUT' ? '' : line(state, 'strings.verdict.count.' + fin.vsPar, slots) + ' ') + line(state, 'strings.verdict.tier.' + tier, slots)).replace(/^\s+|\s+$/g, '');
    return { ledger: rows, comments: comments, luck: luckOut, verdictLine: vLine, learned: learned, causes: list };
  }

  /* ---------------- the debrief: two more comments on a subject ---------------- */

  function debrief(state, showId, subject) {
    var show = showOf(state, showId, 'Feedback.debrief'), res = show.result, S = SUBJECT[subject], rng = SB.rng.stream(state, E.STREAM.FEEDBACK), out = [], list, said = {}, fin, V, i, c, vs, voice, level, slots, n, k, who, cm, room;
    if (!S) SB.fail('Feedback.debrief', 'unknown subject "' + subject + '"');
    if (!res) SB.fail('Feedback.debrief', 'show "' + showId + '" has not been played');
    (res.comments || EMPTY).forEach(function (x) { said[x.hid && x.hid.wrong ? x.hid.trueCause : x.cause] = true; });
    list = (res.causes || EMPTY).filter(function (x) { return S.causes.indexOf(x.cause) >= 0 && !said[x.cause] && Math.abs(x.d) >= 0.5; });
    if (!list.length) list = (res.causes || EMPTY).filter(function (x) { return S.causes.indexOf(x.cause) >= 0 && Math.abs(x.d) >= 0.5; });
    fin = { outcome: { heads: res.heads, byGen: res.byGen, sets: res.sets || [], turnedAway: res.turnedAway, comps: res.comps, lateMin: 0, incidents: res.incidents || [] }, par: res.par, verdict: res.verdict, vsPar: res.vsPar };
    V = voicesThere(state, show, fin.outcome, res.demand || { byReason: res.byReason, byZone: res.byZone }, rng);
    n = (res.comments || EMPTY).length; room = roomOf(state, show);
    for (i = 0; i < list.length && out.length < C.COMMENTS.debrief; i++) {
      c = list[i]; vs = E.CAUSE_VOICES[c.cause] || EMPTY; voice = null;
      if (vs.indexOf(S.voice) >= 0 && V[S.voice]) voice = S.voice;
      for (k = 0; k < vs.length && !voice; k++) if (V[vs[k]] && vs[k] !== 'HELPER') voice = vs[k];
      if (!voice) continue;
      who = V[voice]; level = SB.Notebook.knowledge(state, c.cause, c.ctx);
      slots = slotsFor(state, show, c, fin, res.demand || { byReason: res.byReason, byZone: res.byZone });
      n += 1;
      cm = { id: 'c' + n, voice: voice, byId: who.byId, byName: who.byName, cause: c.cause, ctx: c.ctx, dir: c.d > 0 ? 1 : -1, level: level,
             kind: vs[0] === voice ? 'OBSERVATION' : 'READING', starred: false, text: commentText(state, c.cause, voice, c.d, level, slots),
             noteKey: c.cause + '|' + c.ctx, hid: { wrong: false, trueCause: null } };
      SB.Notebook.mark(state, c.cause, c.ctx, { showId: showId, voice: voice, by: who.byId, dir: cm.dir });
      out.push(cm);
    }
    return out;
  }

  return { causes: causes, build: build, debrief: debrief };
});
