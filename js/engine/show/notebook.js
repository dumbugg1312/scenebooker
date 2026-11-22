/* Scene Booker — engine/show/notebook.js (role E2). SB.Notebook: what the player knows (02-engine 3.5, 7.10).
 *
 * Every hidden number has an estimate band lo..hi inside its prior p0..p1. The band always holds the truth, narrows by
 * the clarity rule after a show, and widens only by staleness, by `reopen`, and when the truth itself has moved past an
 * edge (the weekly pass and `narrow` stretch the band just far enough to hold it again).
 *
 * Extras exported beside the manifest (none of them a view): key (the key builders), truth(state, key),
 * pub(state, key) (what anyone would assume), inPlay(state, show, demand) (7.10 "in play"), recordCall(state, rec).
 * Streams: 'learn:' + showId for learning from a show, FEEDBACK for narrowing asked for by other modules.
 */
SB.module('Notebook', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, GENRES = E.GENRES, GI = E.GENRE_INDEX, EMPTY = [];
  var BAND_FAMS = { draw: 1, cross: 1, live: 1, rel: 1, promo: 1, honest: 1 };
  var CAUSE_PAGE = { GENRE_MIX: 'CROWDS', GEN_MIX: 'BANDS', LOCAL_DRAW: 'BANDS', DRAW_AWAY: 'BANDS', OVERUSE: 'BANDS', ORDER: 'BANDS',
                     ROOM_FIT: 'ROOMS', SOUND: 'ROOMS', VENUE_REP: 'ROOMS', SAFETY: 'ROOMS', AGE_GATE: 'ROOMS', RUNTIME: 'ROOMS',
                     NIGHT: 'NIGHTS', COMPETITION: 'NIGHTS', TOWN_EVENT: 'NIGHTS', REPEAT: 'NIGHTS',
                     PROMO_ANNOUNCE: 'HEAR', PROMO_FLYER: 'HEAR', PROMO_POSTERS: 'HEAR', PROMO_SHARES: 'HEAR', PROMO_DMS: 'HEAR',
                     PROMO_PUSH: 'HEAR', PROMO_EXIT: 'HEAR', DOOR_PRICE: 'DOOR', DOOR_COUNT: 'DOOR', PAY: 'DOOR', TREND: 'MOVING',
                     REGULARS: 'PEOPLE', HOSPITALITY: 'PEOPLE', ADVANCE: 'PEOPLE' };

  var key = {
    aff: function (f, b) { return 'aff:' + f + ':' + b; },
    draw: function (b, z) { return 'draw:' + b + ':' + z; },
    cross: function (b) { return 'cross:' + b; },
    live: function (b) { return 'live:' + b; },
    rel: function (b) { return 'rel:' + b; },
    promo: function (b) { return 'promo:' + b; },
    honest: function (b) { return 'honest:' + b; },
    night: function (g, d) { return 'night:' + g + ':' + d; },
    roomgen: function (r, g) { return 'roomgen:' + r + ':' + g; },
    roomcap: function (r) { return 'roomcap:' + r; },
    roomfit: function (r) { return 'roomfit:' + r; },
    chan: function (c, g) { return 'chan:' + c + ':' + g; },
    price: function (g) { return 'price:' + g; },
    zone: function (z) { return 'zone:' + z; },
    heat: function (g) { return 'heat:' + g; },
    person: function (p) { return 'person:' + p; }
  };

  function num(v, d) { return (typeof v === 'number' && v === v && v !== Infinity && v !== -Infinity) ? v : d; }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function down4(x) { return Math.floor(x * 10000 + 1e-7) / 10000; }
  function up4(x) { return Math.ceil(x * 10000 - 1e-7) / 10000; }
  function nb(state) {
    if (!state || !state.notebook) SB.fail('Notebook', 'the state has no notebook');
    var n = state.notebook;
    if (!n.est) n.est = {};
    if (!n.causes) n.causes = {};
    if (!n.notes) n.notes = [];
    if (!n.terms) n.terms = {};
    if (!n.calls) n.calls = [];
    if (!n.tells) n.tells = {};
    if (!n.irl) n.irl = {};                                // 13-real-booking: how often each IN REAL LIFE lesson has been shown
    return n;
  }
  function week(state) { return (state.clock && typeof state.clock.week === 'number') ? state.clock.week : 0; }
  function pack(state) { return SB.Cities.pack(state); }
  function zoneSize(state, z) {
    var zn = state.zones && state.zones[z], t = 0, g, s;
    if (!zn || !zn.pop) return 0;
    for (g = 0; g < 3; g++) for (s = 0; s < 12; s++) t += zn.pop[g][s];
    return t;
  }

  /* ---------------- truth and the public figure ---------------- */

  function parse(k) {
    var p = String(k).split(':'), fam = p[0];
    if (!E.HID[fam]) return null;
    if (fam === 'chan') return { fam: fam, a: p.slice(1, p.length - 1).join(':'), b: Number(p[p.length - 1]) };
    return { fam: fam, a: p[1], b: p[2] };
  }

  function pubAff(state, fan, band) {
    var fi = GI[fan], bi = GI[band], t = pack(state).tilt || EMPTY, v, i;
    if (fi === undefined || bi === undefined) return null;
    if (fi === bi) return 1;
    v = C.AFFINITY[fi][bi];
    for (i = 0; i < t.length; i++) if (typeof t[i].gen !== 'number' && t[i].fan === fan && t[i].band === band) v += t[i].d;
    return clamp(v, 0, 1.2);
  }

  function quirkOn(state, fan, band) {
    var q = (state.truth && state.truth.quirks) || EMPTY, w = week(state), i, d = 0, hit = null;
    for (i = 0; i < q.length; i++) {
      if (typeof q[i].ends === 'number' && q[i].ends <= w) continue;
      if ((q[i].fan === fan && q[i].band === band) || (q[i].both && q[i].fan === band && q[i].band === fan)) { d += num(q[i].d, 0); hit = q[i]; }
    }
    return hit ? { d: d, quirk: hit } : null;
  }

  /** What anyone would assume: the centre of the prior, and the PAR lens's value (02-engine 7.8). null for an unknown key. */
  function pub(state, k) {
    var p = parse(k), band, room, g, pk;
    if (!p) return null;
    switch (p.fam) {
      case 'aff': return pubAff(state, p.a, p.b);
      case 'draw':
        band = state.bands && state.bands[p.a]; if (!band) return null;
        if (SB.Bands && typeof SB.Bands.publicDraw === 'function') return Math.max(0, num(SB.Bands.publicDraw(state, band, p.b), 0));
        return Math.max(0, num(band.followers, 0) * C.FOLLOW_RATE);
      case 'cross': return state.bands && state.bands[p.a] ? 0.3 : null;
      case 'live': return state.bands && state.bands[p.a] ? 60 : null;
      case 'promo': return state.bands && state.bands[p.a] ? C.PAR.promotes : null;
      case 'rel': return state.bands && state.bands[p.a] ? (C.PRIOR.rel[0] + C.PRIOR.rel[1]) / 2 : null;
      case 'honest': return state.bands && state.bands[p.a] ? (C.PRIOR.honest[0] + C.PRIOR.honest[1]) / 2 : null;
      case 'night': pk = pack(state).night; g = Number(p.a); return pk[g] && typeof pk[g][Number(p.b)] === 'number' ? pk[g][Number(p.b)] : null;
      case 'roomgen': return state.rooms && state.rooms[p.a] ? 0 : null;
      case 'roomcap': room = state.rooms && state.rooms[p.a]; return room ? num(room.cap, 1) : null;
      case 'roomfit': return state.rooms && state.rooms[p.a] ? 0 : null;
      case 'chan': return 1;
      case 'price': return num(pack(state).money.comfort[Number(p.a)], null);
      case 'zone': return state.zones && state.zones[p.a] ? 1 : null;
      case 'heat': return GI[p.a] === undefined ? null : 0;
      case 'person': return state.people && state.people[p.a] ? (C.PRIOR.person[0] + C.PRIOR.person[1]) / 2 : null;
    }
    return null;
  }

  /** The true value of a hidden number. Engine only: never returned by a view. null when the entity is gone. */
  function truth(state, k) {
    var p = parse(k), T = state.truth || {}, band, room, per, v, q, i, g, d, nq, h;
    if (!p) return null;
    switch (p.fam) {
      case 'aff':
        v = pubAff(state, p.a, p.b); if (v === null) return null;
        q = quirkOn(state, p.a, p.b);
        return q ? clamp(v + q.d, 0, 1.2) : v;
      case 'draw':
        band = state.bands && state.bands[p.a]; if (!band || !band.hid) return null;
        h = band.hid.draw || {};
        if (typeof h[p.b] === 'number') return Math.max(0, h[p.b]);
        return Math.max(0, num(h.city, 0) * (zoneSize(state, p.b) / Math.max(1, zoneSize(state, 'city'))) * (band.local ? 0.5 : 1));
      case 'cross': case 'live': case 'rel': case 'promo': case 'honest':
        band = state.bands && state.bands[p.a];
        return band && band.hid && typeof band.hid[p.fam] === 'number' ? band.hid[p.fam] : null;
      case 'night':
        v = pub(state, k); if (v === null) return null;
        g = Number(p.a); d = Number(p.b); nq = T.nightQuirks || EMPTY;
        for (i = 0; i < nq.length; i++) if (nq[i].gen === g && nq[i].dow === d) v += num(nq[i].d, 0);
        return clamp(v, 0, 1.15);
      case 'roomgen': room = state.rooms && state.rooms[p.a]; return room && room.hid && room.hid.genFit ? num(room.hid.genFit[Number(p.b)], 0) : (room ? 0 : null);
      case 'roomcap': room = state.rooms && state.rooms[p.a]; return room ? num(room.hid && room.hid.capReal, num(room.cap, 1)) : null;
      case 'roomfit': room = state.rooms && state.rooms[p.a]; return room ? num(room.hid && room.hid.fit, 0) : null;
      case 'chan': return T.chan && T.chan[p.a] ? num(T.chan[p.a][p.b], 1) : 1;
      case 'price': return T.comfort ? num(T.comfort[Number(p.a)], pub(state, k)) : pub(state, k);
      case 'zone': return state.zones && state.zones[p.a] ? num(T.zoneMul && T.zoneMul[p.a], 1) : null;
      case 'heat': return GI[p.a] === undefined ? null : clamp(num(T.heat && T.heat[p.a], 0), -1, 1);
      case 'person': per = state.people && state.people[p.a]; return per && per.hid && typeof per.hid.reliability === 'number' ? per.hid.reliability : null;
    }
    return null;
  }

  function priorOf(state, k) {
    var p = parse(k), c = pub(state, k), P = C.PRIOR, lo, hi;
    if (!p || c === null) return null;
    switch (p.fam) {
      case 'aff': lo = clamp(c - P.aff, 0, 1.2); hi = clamp(c + P.aff, 0, 1.2); break;
      case 'draw': lo = c * P.draw[0]; hi = c * P.draw[1]; break;
      case 'night': lo = clamp(c - P.night, 0, 1.15); hi = clamp(c + P.night, 0, 1.15); break;
      case 'roomgen': lo = -P.roomgen; hi = P.roomgen; break;
      case 'roomcap': lo = c * P.roomcap[0]; hi = c * P.roomcap[1]; break;
      case 'roomfit': lo = -P.roomfit; hi = P.roomfit; break;
      case 'chan': lo = 1 - P.chan; hi = 1 + P.chan; break;
      case 'price': lo = Math.max(0.5, c - P.price); hi = c + P.price; break;
      case 'zone': lo = 1 - P.zone; hi = 1 + P.zone; break;
      default: lo = P[p.fam][0]; hi = P[p.fam][1];
    }
    return [lo, hi];
  }

  /* A truth outside its prior stretches the prior, with a tenth of the width to spare; the band follows. */
  function hold(e, t) {
    var w;
    if (t === null || t === undefined) return;
    if (t < e.p0) { w = e.p1 - t; e.p0 = down4(t - w / 10); }
    if (t > e.p1) { w = t - e.p0; e.p1 = up4(t + w / 10); }
    w = (e.p1 - e.p0) * 0.02;
    if (t < e.lo) e.lo = Math.max(e.p0, down4(t - w));
    if (t > e.hi) e.hi = Math.min(e.p1, up4(t + w));
    if (e.lo < e.p0) e.lo = e.p0;
    if (e.hi > e.p1) e.hi = e.p1;
  }

  function make(state, n, k) {
    if (n.est[k]) return;
    var pr = priorOf(state, k), e;
    if (!pr) return;
    e = { lo: down4(pr[0]), hi: up4(pr[1]), p0: down4(pr[0]), p1: up4(pr[1]), seen: null, n: 0, src: 'PRIOR' };
    hold(e, truth(state, k));
    e.lo = e.p0; e.hi = e.p1;
    n.est[k] = e;
  }

  function init(state) {
    var n = nb(state), P = pack(state), i, j, g, d, ids, b, r, z, per, roles;
    for (i = 0; i < 12; i++) for (j = 0; j < 12; j++) if (i !== j) make(state, n, key.aff(GENRES[i], GENRES[j]));
    ids = Object.keys(state.bands || {});
    for (i = 0; i < ids.length; i++) {
      b = state.bands[ids[i]];
      if (!b || !b.hid || (b.endedWeek !== null && b.endedWeek !== undefined)) continue;
      make(state, n, key.draw(b.id, 'city'));
      if (b.local && b.zoneId && b.zoneId !== 'city') make(state, n, key.draw(b.id, b.zoneId));
      make(state, n, key.cross(b.id)); make(state, n, key.live(b.id)); make(state, n, key.rel(b.id));
      make(state, n, key.promo(b.id)); make(state, n, key.honest(b.id));
    }
    for (g = 0; g < 3; g++) {
      for (d = 0; d < 7; d++) make(state, n, key.night(g, d));
      make(state, n, key.price(g));
      ['ANNOUNCE', 'LISTINGS', 'WOM', 'SHARE', 'ROOM'].forEach(function (ch) { make(state, n, key.chan(ch, g)); });
      for (i = 0; i < P.routes.length; i++) make(state, n, key.chan('RUN:' + P.routes[i].id, g));
    }
    ids = Object.keys(state.rooms || {});
    for (i = 0; i < ids.length; i++) {
      r = state.rooms[ids[i]]; if (!r) continue;
      for (g = 0; g < 3; g++) make(state, n, key.roomgen(r.id, g));
      make(state, n, key.roomcap(r.id)); make(state, n, key.roomfit(r.id));
    }
    ids = Object.keys(state.zones || {});
    for (i = 0; i < ids.length; i++) { z = state.zones[ids[i]]; if (z && z.kind !== 'CITY') make(state, n, key.zone(ids[i])); }
    for (i = 0; i < 12; i++) make(state, n, key.heat(GENRES[i]));
    ids = Object.keys(state.people || {});
    for (i = 0; i < ids.length; i++) {
      per = state.people[ids[i]]; roles = (per && per.roles) || EMPTY;
      if (!per || !per.hid || typeof per.hid.reliability !== 'number') continue;
      if (roles.indexOf('SOUND') >= 0 || roles.indexOf('SECURITY') >= 0 || roles.indexOf('FLOOR') >= 0 || roles.indexOf('RUNNER') >= 0 ||
          roles.indexOf('ARTIST') >= 0 || roles.indexOf('LODGING') >= 0 || roles.indexOf('OWNER') >= 0) make(state, n, key.person(per.id));
    }
  }

  /* ---------------- reading ---------------- */

  function confOf(e) {
    var w = e.p1 - e.p0, r;
    if (!(w > 1e-9)) return E.CONF.KNOWN;                // 7.0 rule 4
    if (!e.n) return E.CONF.NONE;
    r = (e.hi - e.lo) / w;
    return r > C.CONF_CUTS[0] ? E.CONF.RUMOR : (r > C.CONF_CUTS[1] ? E.CONF.HEARD : (r > C.CONF_CUTS[2] ? E.CONF.SEEN : E.CONF.KNOWN));
  }

  function est(state, k) {
    var e = nb(state).est[k];
    if (!e) return null;
    return { lo: e.lo, hi: e.hi, mid: (e.lo + e.hi) / 2, p0: e.p0, p1: e.p1, conf: confOf(e), seen: e.seen === undefined ? null : e.seen, src: e.src || 'PRIOR' };
  }

  function fmt(fam, lo, hi) {
    var a, b;
    if (fam === 'draw' || fam === 'roomcap' || fam === 'live') { a = Math.floor(lo); b = Math.ceil(hi); return a === b ? String(a) : a + '–' + b; }
    if (fam === 'price') { a = Math.floor(lo); b = Math.ceil(hi); return a === b ? SB.text.money(a) : SB.text.money(a) + '–' + SB.text.money(b); }
    a = (Math.floor(lo * 100) / 100).toFixed(2); b = (Math.ceil(hi * 100) / 100).toFixed(2);
    return a === b ? a : a + '–' + b;
  }

  function range(state, k) {
    var e = est(state, k), p = parse(k), w, whole, lo, hi;
    if (!e || !p) return null;
    whole = p.fam === 'draw' || p.fam === 'roomcap' || p.fam === 'live';
    lo = whole ? Math.floor(e.lo) : Math.floor(e.lo * 100) / 100; hi = whole ? Math.ceil(e.hi) : Math.ceil(e.hi * 100) / 100;
    w = hi - lo;
    return { lo90: lo, lo50: whole ? Math.round(lo + w / 4) : Math.round((lo + w / 4) * 100) / 100,
             hi50: whole ? Math.round(hi - w / 4) : Math.round((hi - w / 4) * 100) / 100, hi90: hi,
             conf: e.conf, src: e.src, seen: e.seen, text: fmt(p.fam, e.lo, e.hi), known: e.conf === E.CONF.KNOWN };
  }

  function wordOf(v) {
    var c = C.FIVE_WORD_CUTS;
    return v >= c[0] ? 'SAME_CROWD' : (v >= c[1] ? 'GOOD_CROSSOVER' : (v >= c[2] ? 'SOME' : (v >= c[3] ? 'THIN' : 'DONT_MIX')));
  }

  function dirOf(state, k, e) {
    var p = parse(k), c, w;
    if (!e || !p || e.conf === E.CONF.NONE) return 'NEUTRAL';
    if (p.fam === 'aff') return e.lo >= 0.4 ? 'WORKS' : (e.hi <= 0.3 ? 'DOESNT' : 'DEPENDS');
    c = pub(state, k); if (c === null) c = (e.p0 + e.p1) / 2;
    w = (e.p1 - e.p0) * 0.03;
    if (e.lo > c + w) return 'WORKS';
    if (e.hi < c - w) return 'DOESNT';
    return e.conf >= E.CONF.SEEN ? 'DEPENDS' : 'NEUTRAL';
  }

  function genreName(g) { var S = SB.Content.strings; return (S && S.genre && S.genre[g] && (S.genre[g].plain || S.genre[g].name)) || g; }
  function genName(g) { var S = SB.Content.strings, kk = E.GEN_KEY[g]; return (S && S.gen && S.gen[kk] && S.gen[kk].name) || String(kk).toLowerCase(); }

  function slotsFor(state, k, e) {
    var p = parse(k), s = {}, band, room, per, z;
    if (!p) return s;
    if (e) { s.lo = Math.floor(e.lo); s.hi = Math.ceil(e.hi); }
    switch (p.fam) {
      case 'aff': s.a = genreName(p.a); s.b = genreName(p.b); if (e) s.word = SB.text.label('five.' + wordOf(e.mid)); break;
      case 'draw': case 'cross': case 'live': case 'rel': case 'promo': case 'honest':
        band = state.bands && state.bands[p.a]; s.band = band ? band.name : ''; if (band) s.a = genreName(band.genre);
        if (p.fam === 'draw' && p.b && p.b !== 'city' && state.zones && state.zones[p.b]) s.town = state.zones[p.b].name;
        break;
      case 'night': s.gen = genName(Number(p.a)); s.dow = SB.time.DAYS[Number(p.b)] || ''; break;
      case 'roomgen': room = state.rooms && state.rooms[p.a]; s.room = room ? room.name : ''; s.gen = genName(Number(p.b)); break;
      case 'roomcap': case 'roomfit': room = state.rooms && state.rooms[p.a]; s.room = room ? room.name : ''; break;
      case 'chan': s.gen = genName(p.b); s.channel = SB.text.off ? '' : SB.text.label('channel.' + String(p.a).split(':')[0]); break;
      case 'price': s.gen = genName(Number(p.a)); break;
      case 'zone': z = state.zones && state.zones[p.a]; s.town = z ? z.name : ''; break;
      case 'heat': s.a = genreName(p.a); break;
      case 'person': per = state.people && state.people[p.a]; s.name = per ? (per.nick || per.first || '') : ''; break;
    }
    return s;
  }

  function labelOf(state, k, e) { var p = parse(k); return p ? SB.text.line('notebook.family.' + p.fam + '.title', slotsFor(state, k, e)) : ''; }
  function findingOf(state, k, e, dir) { var p = parse(k); return p ? SB.text.line('notebook.family.' + p.fam + '.' + (dir || dirOf(state, k, e)), slotsFor(state, k, e)) : ''; }

  /* ---------------- narrowing ---------------- */

  function narrowCore(state, k, factor, src, rng, because) {
    var n = nb(state), e = n.est[k], t, w, w2, a, b, before, floorW, p = parse(k), v, after;
    if (!e) { make(state, n, k); e = n.est[k]; }
    if (!e || !p) return null;
    t = truth(state, k); if (t === null) return null;
    hold(e, t);
    w = e.hi - e.lo; before = confOf(e);
    w2 = w * clamp(num(factor, 1), 0, 1);
    if (state.settings && state.settings.fog === 'HARD' && BAND_FAMS[p.fam]) {
      floorW = C.FOG.HARD.bandFloor * (e.p1 - e.p0);
      if (w2 < floorW) w2 = floorW;
    }
    if (!(w2 < w - 1e-9)) return null;                    // never wider
    a = Math.max(e.lo, t - w2); b = Math.min(t, e.hi - w2);
    v = a + (b > a ? rng.next() * (b - a) : 0);
    e.lo = Math.max(e.p0, down4(v)); e.hi = Math.min(e.p1, up4(v + w2));
    if (e.lo > t) e.lo = down4(t);
    if (e.hi < t) e.hi = up4(t);
    e.n = (e.n || 0) + 1; e.seen = week(state); e.src = src || 'SHOW';
    after = est(state, k);
    return { key: k, label: labelOf(state, k, after), from: before, to: after.conf, text: findingOf(state, k, after), because: because || '' };
  }

  function narrow(state, k, factor, src) {
    if (typeof k !== 'string') SB.fail('Notebook.narrow', 'a key is needed');
    return narrowCore(state, k, factor, src || 'TOLD', SB.rng.stream(state, E.STREAM.FEEDBACK), '');
  }

  function matches(k, prefix) {
    if (k === prefix) return true;
    if (k.indexOf(prefix) !== 0) return false;
    return prefix.charAt(prefix.length - 1) === ':' || k.charAt(prefix.length) === ':';
  }

  function reopen(state, prefix, toShare) {
    var n = nb(state), ks = Object.keys(n.est), i, e, t, w, target, addw, lo, hi;
    if (typeof prefix !== 'string' || !prefix) SB.fail('Notebook.reopen', 'a key prefix is needed');
    for (i = 0; i < ks.length; i++) {
      if (!matches(ks[i], prefix)) continue;
      e = n.est[ks[i]]; t = truth(state, ks[i]);
      if (t === null) continue;
      hold(e, t);
      w = e.hi - e.lo; target = clamp(num(toShare, 1), 0, 1) * (e.p1 - e.p0);
      if (target <= w) continue;
      addw = (target - w) / 2; lo = e.lo - addw; hi = e.hi + addw;
      if (lo < e.p0) { hi += e.p0 - lo; lo = e.p0; }
      if (hi > e.p1) { lo -= hi - e.p1; hi = e.p1; }
      e.lo = Math.max(e.p0, down4(lo)); e.hi = Math.min(e.p1, up4(hi));
    }
  }

  /* ---------------- 7.10 what is in play for a show ---------------- */

  function inPlay(state, show, dem) {
    var out = [], seen = {}, slots = (show.bill && show.bill.slots) || EMPTY, room = state.rooms && state.rooms[show.roomId], genres = [], i, j, g, b, p, ks, z, dow, zs, tot;
    function add(k) { if (!seen[k]) { seen[k] = true; out.push(k); } }
    for (i = 0; i < slots.length; i++) {
      b = state.bands && state.bands[slots[i].bandId]; if (!b) continue;
      add(key.draw(b.id, 'city'));
      if (b.zoneId && b.zoneId !== 'city' && state.zones[b.zoneId] && state.zones[b.zoneId].kind === 'FEEDER') add(key.draw(b.id, b.zoneId));
      add(key.cross(b.id)); add(key.live(b.id)); add(key.promo(b.id));
      if (genres.indexOf(b.genre) < 0) genres.push(b.genre);
      if (b.genre2 && genres.indexOf(b.genre2) < 0) genres.push(b.genre2);
    }
    for (i = 0; i < genres.length; i++) {
      add(key.heat(genres[i]));
      for (j = 0; j < genres.length; j++) if (i !== j) add(key.aff(genres[i], genres[j]));
    }
    dow = SB.time.dow(show.day);
    for (g = 0; g < 3; g++) {
      add(key.night(g, dow));
      if (room) add(key.roomgen(room.id, g));
      if (!(show.door && show.door.donation)) add(key.price(g));
    }
    if (room) { add(key.roomcap(room.id)); add(key.roomfit(room.id)); }
    p = show.promo || {};
    for (g = 0; g < 3; g++) {
      if (typeof p.announce === 'number') { add(key.chan('ANNOUNCE', g)); add(key.chan('WOM', g)); }
      if (typeof p.listings === 'number' || p.ad) add(key.chan('LISTINGS', g));
      if (p.shares && Object.keys(p.shares).length) add(key.chan('SHARE', g));
      if (p.roomPosted) add(key.chan('ROOM', g));
      ks = Object.keys(p.runs || {});
      for (i = 0; i < ks.length; i++) add(key.chan('RUN:' + ks[i], g));
    }
    if (dem && dem.byZone) {
      zs = Object.keys(dem.byZone); tot = Math.max(1e-9, num(dem.heads, 0));
      for (i = 0; i < zs.length; i++) {
        z = state.zones[zs[i]];
        if (z && z.kind !== 'CITY' && zs[i] !== show.zoneId && dem.byZone[zs[i]] > 0.02 * tot) add(key.zone(zs[i]));
      }
    }
    return out;
  }

  /* ---------------- learning from a night (the clarity rule) ---------------- */

  function clarityLearn(state, show, keys, mods, rate, src, rng, because, obs) {
    var n = nb(state), lens = SB.Forecast.lens(state, 'TRUTH', { luck: false }), infl = [], total = 0, out = [], i, e, r0, r1, c, f, L, fog;
    function res() { var r = SB.Model.resolve(state, show, lens, mods).night; return num(r.exact, r.heads) + 0.5 * r.q; }
    if (typeof lens.set !== 'function') return out;
    lens.lite = true; lens.luck = false;
    for (i = 0; i < keys.length; i++) {
      e = n.est[keys[i]]; infl.push(0);
      if (!e || !(e.p1 - e.p0 > 1e-9) || truth(state, keys[i]) === null) continue;
      lens.set(keys[i], e.p0); r0 = res();
      lens.set(keys[i], e.p1); r1 = res();
      lens.unset(keys[i]);
      infl[i] = Math.abs(r0 - r1); total += infl[i];
    }
    if (!(total > 1e-9)) return out;                      // 7.0 rule 4: nothing to learn from
    fog = C.FOG[(state.settings && state.settings.fog) || 'NORMAL'] || C.FOG.NORMAL;
    for (i = 0; i < keys.length; i++) {
      c = infl[i] / total;
      if (!(c >= C.CLARITY_MIN)) continue;
      f = 1 - Math.min(0.9, rate * num(fog.learn, 1) * (obs && obs[keys[i]] ? C.OBSERVATION_BONUS : 1) * Math.sqrt(c));
      L = narrowCore(state, keys[i], f, src, rng, because);
      if (L) { L.clarity = Math.round(c * 1000) / 1000; out.push(L); }
    }
    out.sort(function (a, b) { return b.clarity - a.clarity; });
    return out;
  }

  function becauseLine(state, show) {
    var room = state.rooms && state.rooms[show.roomId];
    return SB.text.line('notebook.because', { when: SB.time.fmt(show.day, 'short'), room: room ? room.name : '' });
  }

  function learnFromShow(state, showId) {
    var show = state.shows && state.shows[showId], dem, mods, obs = {}, list, i;
    if (!show) SB.fail('Notebook.learnFromShow', 'unknown show "' + showId + '"');
    if (!show.roomId || !state.rooms[show.roomId]) return [];
    dem = (show.night && show.night.demand) || (show.result && show.result.demand) || null;
    mods = (show.night && show.night.finalMods) || (show.night && show.night.mods) || show.mods || {};
    list = (show.night && show.night.obsKeys) || EMPTY;
    for (i = 0; i < list.length; i++) obs[list[i]] = true;
    return clarityLearn(state, show, inPlay(state, show, dem), mods, C.LEARN, 'SHOW', SB.rng.stream(state, 'learn:' + showId), becauseLine(state, show), obs);
  }

  function scout(state, otherShowId) {
    var list = state.otherShows || EMPTY, os = null, i, j, show, out = [], rng, keys = [], seen = {}, genres = [], b, g, L, because;
    for (i = 0; i < list.length; i++) if (list[i].id === otherShowId) os = list[i];
    if (!os) SB.fail('Notebook.scout', 'unknown show "' + otherShowId + '"');
    rng = SB.rng.stream(state, 'learn:' + otherShowId);
    show = SB.Night && typeof SB.Night.asShow === 'function' ? SB.Night.asShow(state, os) : null;
    function add(k) { if (!seen[k]) { seen[k] = true; keys.push(k); } }
    if (show && show.roomId && state.rooms[show.roomId]) {
      because = becauseLine(state, show);
      for (i = 0; i < show.bill.slots.length; i++) {
        b = state.bands[show.bill.slots[i].bandId]; if (!b) continue;
        add(key.draw(b.id, 'city'));
        if (genres.indexOf(b.genre) < 0) genres.push(b.genre);
      }
      for (i = 0; i < genres.length; i++) for (j = 0; j < genres.length; j++) if (i !== j) add(key.aff(genres[i], genres[j]));
      for (g = 0; g < 3; g++) { add(key.night(g, SB.time.dow(show.day))); add(key.roomgen(show.roomId, g)); }
      add(key.roomcap(show.roomId)); add(key.roomfit(show.roomId));
      out = clarityLearn(state, show, keys, {}, C.LEARN * C.SCOUT_RATE, 'SCOUT', rng, because, null);
    }
    for (i = 0; i < (os.bands || EMPTY).length; i++) {
      if (!state.bands || !state.bands[os.bands[i]]) continue;
      L = narrowCore(state, key.live(os.bands[i]), C.SCOUT_LIVE, 'SCOUT', rng, because || '');
      if (L) out.push(L);
    }
    return out;
  }

  /* ---------------- causes: knowledge for feedback ---------------- */

  function levelOf(n) { return n >= C.KNOW_AT[1] ? 2 : (n >= C.KNOW_AT[0] ? 1 : 0); }
  var KNOWS = ['NEW', 'LEARNING', 'KNOWS'];

  function knowledge(state, cause, ctx) {
    var c = nb(state).causes[cause + '|' + (ctx === undefined || ctx === null ? '' : ctx)], l = levelOf(c ? num(c.n, 0) : 0);
    if (state.settings && state.settings.fog === 'OPEN') l = Math.min(2, l + 1);
    return KNOWS[l];
  }

  function mark(state, cause, ctx, ev) {
    if (!E.CAUSE[cause]) SB.fail('Notebook.mark', 'unknown cause "' + cause + '"');
    var n = nb(state), k = cause + '|' + (ctx === undefined || ctx === null ? '' : ctx), c = n.causes[k], before, after, dir, show, room;
    ev = ev || {};
    if (!c) c = n.causes[k] = { n: 0, dir: null, ev: [], contested: false };
    before = levelOf(c.n);
    dir = typeof ev.dir === 'string' ? ev.dir : (ev.dir > 0 ? 'WORKS' : (ev.dir < 0 ? 'DOESNT' : null));
    if (dir && c.dir && c.dir !== dir && c.dir !== 'DEPENDS') { c.contested = true; c.dir = 'DEPENDS'; }
    else if (dir && !c.dir) c.dir = dir;
    c.n += 1;
    c.ev.push({ showId: ev.showId || null, week: week(state), voice: ev.voice || null, by: ev.by || null });
    if (c.ev.length > 8) c.ev.shift();
    after = levelOf(c.n);
    if (after === before) return null;
    show = ev.showId && state.shows ? state.shows[ev.showId] : null; room = show && state.rooms ? state.rooms[show.roomId] : null;
    return { key: k, label: SB.text.line('notebook.cause.' + cause + '.title', {}), from: before, to: after,
             text: SB.text.line('notebook.cause.' + cause + '.' + (c.dir === 'DOESNT' ? 'DOWN' : 'UP'), causeSlots(state, show)),
             because: show ? SB.text.line('notebook.because', { when: SB.time.fmt(show.day, 'short'), room: room ? room.name : '' }) : '' };
  }

  function causeSlots(state, show) {
    var room = show && state.rooms ? state.rooms[show.roomId] : null, s = {};
    if (show) { s.dow = SB.time.fmt(show.day, 'dow'); s.room = room ? room.name : ''; s.price = show.door ? show.door.price : ''; }
    s.you = state.player ? state.player.bookingName : '';
    return s;
  }

  /* ---------------- notes and terms ---------------- */

  function addNote(state, note) {
    if (!note || typeof note !== 'object') SB.fail('Notebook.addNote', 'a note is needed');
    var n = nb(state), id = SB.util.newId(state, 'n');
    n.notes.push({ id: id, page: E.NOTE_PAGE[note.page] ? note.page : 'HOW', title: String(note.title || ''), body: String(note.body || ''),
                   conf: typeof note.conf === 'number' ? note.conf : E.CONF.RUMOR, from: note.from || null,
                   week: typeof note.week === 'number' ? note.week : week(state), pinned: !!note.pinned });
    return id;
  }

  function seeTerm(state, term) {
    var n = nb(state);
    if (typeof term !== 'string' || !term) SB.fail('Notebook.seeTerm', 'a term is needed');
    if (n.terms[term] !== undefined) return false;
    n.terms[term] = week(state);
    return true;
  }

  /* ---------------- pages ---------------- */

  function row(state, k, always) {
    var e = est(state, k), d;
    if (!e || (!always && e.conf === E.CONF.NONE)) return null;
    d = dirOf(state, k, e);
    return { key: k, label: labelOf(state, k, e), range: range(state, k), conf: e.conf, dir: d, text: findingOf(state, k, e, d), seen: e.seen };
  }

  function cell(state, k) {
    var e = est(state, k), p = parse(k);
    if (!e) return { key: k, conf: E.CONF.NONE, dir: 'NEUTRAL', word: null, smear: null };
    if (p.fam !== 'aff') return { key: k, conf: e.conf, dir: dirOf(state, k, e), word: null, smear: null };
    return { key: k, conf: e.conf, dir: dirOf(state, k, e), word: wordOf(e.mid), smear: wordOf(e.lo) === wordOf(e.hi) ? null : [wordOf(e.lo), wordOf(e.hi)] };
  }

  function causeRows(state, page) {
    var n = nb(state), ks = Object.keys(n.causes), out = [], i, c, cause, lvl;
    for (i = 0; i < ks.length; i++) {
      cause = ks[i].split('|')[0]; c = n.causes[ks[i]];
      if (CAUSE_PAGE[cause] !== page || !c || !c.n) continue;
      lvl = levelOf(c.n);
      out.push({ key: ks[i], label: SB.text.line('notebook.cause.' + cause + '.title', {}), range: null,
                 conf: c.contested ? E.CONF.RUMOR : (lvl >= 2 ? E.CONF.SEEN : E.CONF.HEARD), dir: c.dir || 'NEUTRAL',
                 text: lvl >= 1 ? SB.text.line('notebook.cause.' + cause + '.' + (c.dir === 'DOESNT' ? 'DOWN' : 'UP'), causeSlots(state, null)) : '',
                 seen: c.ev.length ? c.ev[c.ev.length - 1].week : null });
    }
    return out;
  }

  function noteRows(state, page) {
    return nb(state).notes.filter(function (x) { return x.page === page; }).map(function (x) {
      return { key: x.id, label: x.title, range: null, conf: x.conf, dir: 'NEUTRAL', text: x.body, seen: x.week };
    });
  }

  function pages(state, page) {
    if (!E.NOTE_PAGE[page]) SB.fail('Notebook.pages', 'unknown page "' + page + '"');
    var rows = [], grid = null, P = pack(state), ids, i, j, g, d, b, r, z, cells, chans, n = nb(state), S = SB.Content.strings || {}, t;
    function push(x) { if (x) rows.push(x); }
    switch (page) {
      case 'CROWDS':
        cells = [];
        for (i = 0; i < 12; i++) {
          cells.push([]);
          for (j = 0; j < 12; j++) cells[i].push(i === j ? { key: null, conf: E.CONF.KNOWN, dir: 'WORKS', word: 'SAME_CROWD', smear: null } : cell(state, key.aff(GENRES[i], GENRES[j])));
        }
        grid = { rowsLabels: GENRES.map(genreName), colLabels: GENRES.map(genreName), cells: cells };
        for (i = 0; i < 12; i++) for (j = 0; j < 12; j++) if (i !== j) push(row(state, key.aff(GENRES[i], GENRES[j]), false));
        break;
      case 'BANDS':
        ids = Object.keys(state.bands || {});
        for (i = 0; i < ids.length; i++) {
          b = state.bands[ids[i]];
          if (!b || (b.endedWeek !== null && b.endedWeek !== undefined)) continue;
          if (!b.local && !(b.shows && b.shows.length) && !(n.est[key.draw(b.id, 'city')] && n.est[key.draw(b.id, 'city')].n)) continue;
          push(row(state, key.draw(b.id, 'city'), true));
          ['live', 'cross', 'rel', 'promo', 'honest'].forEach(function (f) { push(row(state, f + ':' + b.id, false)); });
        }
        break;
      case 'ROOMS':
        ids = Object.keys(state.rooms || {});
        for (i = 0; i < ids.length; i++) {
          r = state.rooms[ids[i]]; if (!r || r.open === false) continue;
          push(row(state, key.roomcap(r.id), true)); push(row(state, key.roomfit(r.id), false));
          for (g = 0; g < 3; g++) push(row(state, key.roomgen(r.id, g), false));
        }
        break;
      case 'NIGHTS':
        cells = [];
        for (g = 0; g < 3; g++) { cells.push([]); for (d = 0; d < 7; d++) { cells[g].push(cell(state, key.night(g, d))); push(row(state, key.night(g, d), false)); } }
        grid = { rowsLabels: [0, 1, 2].map(genName), colLabels: SB.time.DAYS.slice(), cells: cells };
        break;
      case 'HEAR':
        chans = ['ANNOUNCE', 'WOM', 'LISTINGS', 'SHARE', 'ROOM'].concat(P.routes.map(function (x) { return 'RUN:' + x.id; }));
        cells = chans.map(function (ch) { return [0, 1, 2].map(function (gg) { return cell(state, key.chan(ch, gg)); }); });
        grid = { rowsLabels: chans.map(function (ch) {
                   var rt = ch.indexOf('RUN:') === 0 ? P.derived.routeById[ch.slice(4)] : null;
                   return rt ? rt.name : ((S.channel && S.channel[ch]) || ch);
                 }), colLabels: [0, 1, 2].map(genName), cells: cells };
        chans.forEach(function (ch) { for (g = 0; g < 3; g++) push(row(state, key.chan(ch, g), false)); });
        break;
      case 'DOOR': for (g = 0; g < 3; g++) push(row(state, key.price(g), true)); break;
      case 'TOWNS':
        ids = Object.keys(state.zones || {});
        for (i = 0; i < ids.length; i++) { z = state.zones[ids[i]]; if (z && z.kind !== 'CITY') push(row(state, key.zone(ids[i]), true)); }
        break;
      case 'MOVING': for (i = 0; i < 12; i++) push(row(state, key.heat(GENRES[i]), false)); break;
      case 'PEOPLE':
        ids = Object.keys(state.people || {});
        for (i = 0; i < ids.length; i++) push(row(state, key.person(ids[i]), false));
        break;
      case 'HOW':
        ids = Object.keys(n.terms);
        for (i = 0; i < ids.length; i++) {
          t = S.glossary && S.glossary[ids[i]];
          rows.push({ key: 'term:' + ids[i], label: t ? t.term : ids[i], range: null, conf: E.CONF.KNOWN, dir: 'NEUTRAL',
                      text: t ? (t.short + (t.long ? ' ' + t.long : '')) : '', seen: n.terms[ids[i]] });
        }
        break;
      case 'LIST': break;
    }
    rows = rows.concat(causeRows(state, page), noteRows(state, page));
    return { page: page, rows: rows, grid: grid };
  }

  function entry(state, noteKey) {
    var n = nb(state), c, cause, e, p, d, q, title, finding, related = [], evidence = [], ks, i, note, t;
    if (typeof noteKey !== 'string') SB.fail('Notebook.entry', 'a key is needed');
    if (noteKey.indexOf('|') >= 0) {
      cause = noteKey.split('|')[0]; c = n.causes[noteKey];
      if (!E.CAUSE[cause]) SB.fail('Notebook.entry', 'unknown cause in "' + noteKey + '"');
      ks = Object.keys(n.causes);
      for (i = 0; i < ks.length; i++) if (ks[i] !== noteKey && ks[i].split('|')[0] === cause) related.push(ks[i]);
      if (c) c.ev.forEach(function (x) { evidence.push({ week: x.week, showId: x.showId, text: x.voice || '' }); });
      return { title: SB.text.line('notebook.cause.' + cause + '.title', {}),
               finding: c && c.n ? SB.text.line('notebook.cause.' + cause + '.' + (c.dir === 'DOESNT' ? 'DOWN' : 'UP'), causeSlots(state, null)) : '',
               conf: !c || !c.n ? E.CONF.NONE : (c.contested ? E.CONF.RUMOR : (levelOf(c.n) >= 2 ? E.CONF.SEEN : E.CONF.HEARD)),
               dir: (c && c.dir) || 'NEUTRAL', contested: !!(c && c.contested), evidence: evidence, related: related, range: null };
    }
    note = n.notes.filter(function (x) { return x.id === noteKey; })[0];
    if (note) return { title: note.title, finding: note.body, conf: note.conf, dir: 'NEUTRAL', contested: false, evidence: [], related: [], range: null };
    e = est(state, noteKey); p = parse(noteKey);
    if (!e || !p) SB.fail('Notebook.entry', 'nothing is kept under "' + noteKey + '"');
    d = dirOf(state, noteKey, e); title = labelOf(state, noteKey, e); finding = findingOf(state, noteKey, e, d);
    if (p.fam === 'aff') {
      if (e.conf >= E.CONF.HEARD && SB.text.has('notebook.reason.' + p.a + ':' + p.b)) finding += ' ' + SB.text.line('notebook.reason.' + p.a + ':' + p.b, {});
      q = quirkOn(state, p.a, p.b);
      if (q && e.conf >= E.CONF.SEEN && q.quirk.cause) {
        t = 'notebook.quirk.' + q.quirk.cause + '.' + (q.d > 0 ? 'up' : 'down');
        if (SB.text.has(t)) finding += ' ' + SB.text.line(t, { street: (pack(state).words.street || EMPTY)[0] || '' });
      }
      if (n.est[key.aff(p.b, p.a)]) related.push(key.aff(p.b, p.a));
    } else if (BAND_FAMS[p.fam]) {
      Object.keys(BAND_FAMS).forEach(function (f) { var k2 = f === 'draw' ? key.draw(p.a, 'city') : f + ':' + p.a; if (k2 !== noteKey && n.est[k2]) related.push(k2); });
    } else if (p.fam === 'roomgen' || p.fam === 'roomcap' || p.fam === 'roomfit') {
      [key.roomcap(p.a), key.roomfit(p.a), key.roomgen(p.a, 0), key.roomgen(p.a, 1), key.roomgen(p.a, 2)].forEach(function (k2) { if (k2 !== noteKey && n.est[k2]) related.push(k2); });
    }
    if (n.est[noteKey].n) evidence.push({ week: e.seen, showId: null, text: String(e.src).split(':')[0] });
    return { title: title, finding: finding, conf: e.conf, dir: d, contested: false, evidence: evidence, related: related, range: range(state, noteKey) };
  }

  /* ---------------- the Call record ---------------- */

  function recordCall(state, rec) {
    var n = nb(state);
    n.calls.push({ showId: rec.showId, lo: rec.lo, hi: rec.hi, heads: rec.heads, inside: !!rec.inside, week: typeof rec.week === 'number' ? rec.week : week(state) });
  }

  function tally(state, year) {
    var calls = nb(state).calls, y = typeof year === 'number' ? year : Math.floor(week(state) / 52) + 1, shows = 0, inside = 0, wn = 0, wt = 0, nt = 0, i, c, cy, w;
    for (i = 0; i < calls.length; i++) {
      c = calls[i]; cy = Math.floor(num(c.week, 0) / 52) + 1;
      w = (c.hi - c.lo) / Math.max(1, (c.hi + c.lo) / 2);
      if (cy === y) { shows++; if (c.inside) inside++; wn += w; }
      else if (cy === y - 1) { nt++; wt += w; }
    }
    return { shows: shows, inside: inside, widthNow: shows ? Math.round(wn / shows * 100) / 100 : 0, widthThen: nt ? Math.round(wt / nt * 100) / 100 : 0 };
  }

  /* ---------------- the weekly pass: the world moves under the notebook ---------------- */

  function weekly(state) {
    var n = nb(state), ks = Object.keys(n.est), w = week(state), quarter = (w + 1) % 13 === 0, i, e, p, t, share, addw, lo, hi;
    for (i = 0; i < ks.length; i++) {
      e = n.est[ks[i]]; p = parse(ks[i]);
      if (!p) continue;
      t = truth(state, ks[i]);
      if (t === null) continue;
      hold(e, t);                                        // a truth that drifted past an edge
      if (!quarter || !e.n || e.seen === w) continue;
      share = p.fam === 'draw' ? C.STALE.draws : ((p.fam === 'heat' || p.fam === 'roomgen' || (p.fam === 'aff' && quirkOn(state, p.a, p.b))) ? C.STALE.perQuarter : 0);
      if (!share) continue;
      addw = share * (e.p1 - e.p0) / 2; lo = e.lo - addw; hi = e.hi + addw;
      e.lo = Math.max(e.p0, down4(lo)); e.hi = Math.min(e.p1, up4(hi));
    }
  }

  return { init: init, est: est, range: range, narrow: narrow, reopen: reopen, learnFromShow: learnFromShow, scout: scout,
           knowledge: knowledge, mark: mark, addNote: addNote, seeTerm: seeTerm, pages: pages, entry: entry, tally: tally, weekly: weekly,
           key: key, truth: truth, pub: pub, inPlay: inPlay, recordCall: recordCall };
});
