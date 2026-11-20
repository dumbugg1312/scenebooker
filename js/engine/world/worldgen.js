/* Scene Booker — js/engine/world/worldgen.js
 * SB.WorldGen: everything generated per save, from the city pack and the WORLDGEN and NAMES streams.
 * Owner: E3a. Spec: design/spec/02-engine.md 4.1, 01-state.md 1 and 2, 04-cities.md 4, 03-content.md 4.
 *
 * build fills town, zones, truth, rooms, owners, the handoff cast, other bookers, contacts, musicians, the local
 * band pool and six regular faces. After build, each part has its own owner (01-state); WorldGen only adds new
 * entities later (band, person, touringBand, room). Every name it makes passes SB.text.nameOk with the pack's
 * local words and is unused in the save, or it is redrawn.
 */
SB.module('WorldGen', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var GENRES = E.GENRES, GEN_KEY = E.GEN_KEY;
  var START_YEAR = 2027;
  var INSTRUMENTS = ['DRUMS', 'GUITAR', 'BASS', 'VOX', 'GUITAR', 'KEYS'];
  var PLACE_SLOTS = { street: true, water: true, hood: true };
  var OWNER_BY_KIND = { HOUSE: 'HOST', BAR: 'BAR_OWNER', HALL: 'HALL_MANAGER', SHOP: 'SHOP_OWNER', DIY: 'LANDLORD',
                        OUTDOOR: 'LANDLORD', CLUB: 'TALENT_BUYER', BIG: 'TALENT_BUYER' };

  /* ------------------------------------------------------------------ */
  /* small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function wg(state) { return SB.rng.stream(state, E.STREAM.WORLDGEN); }
  function nm(state) { return SB.rng.stream(state, E.STREAM.NAMES); }
  function packOf(state) { return SB.Cities.pack(state); }
  function r2(x) { return Math.round(x * 100) / 100; }
  function r3(x) { return Math.round(x * 1000) / 1000; }
  function week(state) { return state.clock ? state.clock.week : 0; }
  function today(state) { return state.clock ? state.clock.day : 0; }
  function year(state) { return SB.time.year(today(state)); }
  function names() { return SB.Content.names || {}; }
  function localWords(P) { return (P && P.derived && P.derived.localWords) || []; }

  /** A value from a ROOM_DEFAULT field: a number as it stands, a [lo, hi] range drawn inside. */
  function drawIn(r, v, places) {
    if (Array.isArray(v)) {
      var x = r.range(v[0], v[1]);
      return places ? Math.round(x * Math.pow(10, places)) / Math.pow(10, places) : Math.round(x);
    }
    return v === undefined ? null : v;
  }

  function say(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
  }

  function ensureMaps(state) {
    ['bands', 'people', 'rooms', 'bookers', 'contacts'].forEach(function (k) { if (!state[k]) state[k] = {}; });
    if (!state.ids) state.ids = {};
  }

  /** Every band and room name already in the save, normalized. */
  function usedNames(state) {
    var used = {};
    Object.keys(state.bands || {}).forEach(function (id) { used[SB.text.normName(state.bands[id].name)] = true; });
    Object.keys(state.rooms || {}).forEach(function (id) { used[SB.text.normName(state.rooms[id].name)] = true; });
    return used;
  }

  /* ------------------------------------------------------------------ */
  /* names (03-content 4)                                                */
  /* ------------------------------------------------------------------ */

  function hoodNames(P) {
    var w = (P.words && P.words.hood) || [];
    if (w.length) return w;
    return (P.hoods || []).map(function (h) { return h.name; });
  }

  /** The bank a pattern slot names: the group's own, names.shared, then the pack's words. */
  function bankFor(base, groupBanks, P) {
    var N = names(), w = P.words || {}, out;
    if (groupBanks && groupBanks[base] && groupBanks[base].length) return groupBanks[base];
    if (N.shared && N.shared[base] && N.shared[base].length) return N.shared[base];
    if (base === 'hood') return hoodNames(P);
    if (base === 'first') {
      out = [];
      GEN_KEY.forEach(function (k) { out = out.concat((N.first && N.first[k]) || []); });
      return out;
    }
    if (base === 'last') return (w.surnames || []).concat(N.last || []);
    if (w[base] && Array.isArray(w[base]) && w[base].length) return w[base];
    return null;
  }

  /** Fill a pattern from banks. -> { name, place } or null when a bank is missing. */
  function fill(pattern, groupBanks, P, r, own) {
    var ctx = {}, place = false, re = /\{([A-Za-z_]+?)(\d*)(?=[:}|])/g, m, full, base, bank, word, tries, taken = {};
    while ((m = re.exec(pattern))) {
      full = m[1] + m[2]; base = m[1];
      if (ctx[full] !== undefined) continue;
      if (own && own[full] !== undefined) { ctx[full] = own[full]; continue; }
      bank = bankFor(base, groupBanks, P);
      if (!bank || !bank.length) return null;
      taken[base] = taken[base] || {};
      word = r.pick(bank);
      for (tries = 0; tries < 12 && taken[base][word]; tries++) word = r.pick(bank);
      if (taken[base][word]) return null;
      taken[base][word] = true;
      ctx[full] = word;
      if (PLACE_SLOTS[base]) place = true;
    }
    return { name: SB.text.render(pattern, ctx, r), place: place };
  }

  function countPlaceNames(state) {
    var n = 0, total = 0;
    Object.keys(state.bands || {}).forEach(function (id) {
      var b = state.bands[id];
      if (!b.local) return;
      total++;
      if (b.hid && b.hid.placeName) n++;
    });
    return { n: n, total: total };
  }

  /** A band name. -> { name, place } */
  /* A band's style: the genre itself, or about 30% of the time one of the genre's child styles when it has any. */
  function pickStyle(r, genre, want) {
    var kids = (E.GENRE_STYLES && E.GENRE_STYLES[genre]) || [];
    if (want && E.STYLE_GENRE && E.STYLE_GENRE[want] === genre) return want;
    if (!kids.length) return genre;
    return r.chance(0.3) ? r.pick(kids) : genre;
  }

  /* A band name from the whole-name pools (content/bandNames.js), by style. A local band draws from the city pack's
   * own list for its style (words.bands) half the time while that list lasts; old-generation bands may take the
   * pack's OLD list. A style whose pool is used up borrows its parent genre's, then any style's. -> name or null */
  function poolBandName(state, P, style, genre, gen, r, local) {
    var BN = SB.Content.bandNames, pools = (BN && BN.styles) || {}, lw = localWords(P), used = usedNames(state);
    var packBands = (local && P.words && P.words.bands) || {}, lists = [], i, j, list, k;
    function free(n) { return !!n && SB.text.nameOk(n, lw, 'band') && !used[SB.text.normName(n)]; }
    function frees(a) { return (a || []).filter(free); }
    if (gen === 2 && r.chance(0.35)) lists.push(frees(packBands.OLD));
    if (r.chance(0.5)) lists.push(frees(packBands[style] || (style === genre ? packBands[genre] : null)));
    lists.push(frees(pools[style]));
    if (style !== genre) lists.push(frees(pools[genre]));
    for (i = 0; i < lists.length; i++) if (lists[i].length) return r.pick(lists[i]);
    k = r.shuffle(Object.keys(pools));
    for (j = 0; j < k.length; j++) { list = frees(pools[k[j]]); if (list.length) return r.pick(list); }
    return null;
  }

  function bandName(state, P, genre, gen, r, style, local) {
    var pooled = SB.Content.bandNames ? poolBandName(state, P, style || genre, genre, gen, r, local !== false) : null;
    if (pooled) return { name: pooled, place: false };
    return patternBandName(state, P, genre, gen, r);
  }

  /* The older generator (names.js patterns and whole names, three-word rule): used when the pools are absent or dry. */
  function patternBandName(state, P, genre, gen, r) {
    var N = names(), B = N.band || {}, lw = localWords(P), used = usedNames(state), pc = countPlaceNames(state);
    var placeMax = Math.max(1, Math.floor((B.placeShare || 0.1) * (pc.total + 1)));
    var packBands = (P.words && P.words.bands) || {};
    var i, group, key, cand, place, whole, f, all;
    for (i = 0; i < 600; i++) {
      cand = null; place = false;
      if (i > 300) genre = r.pick(GENRES);                 // a genre whose banks are exhausted: borrow another
      key = r.chance(B.genShare || 0) ? GEN_KEY[gen] : genre;
      group = (key === genre ? (B.byGenre || {})[genre] : (B.byGen || {})[key]) || (B.byGenre || {})[genre];
      if (!group) continue;
      if (r.chance(B.wholeShare || 0)) {
        whole = (group.whole || []).concat(packBands[key] || []);
        if (whole.length) cand = r.pick(whole);
      }
      if (!cand && group.patterns && group.patterns.length) {
        f = fill(r.pick(group.patterns), group.banks, P, r, null);
        if (!f) continue;
        if (f.place && pc.n >= placeMax) continue;
        cand = f.name; place = f.place;
        if (group.lower && r.chance(group.lower)) cand = cand.toLowerCase();
        else if (group.the && r.chance(group.the) && !/^the /i.test(cand) && /s$/i.test(cand)) cand = 'The ' + cand;
      }
      if (!cand) continue;
      if (!SB.text.nameOk(cand, lw)) continue;
      if (used[SB.text.normName(cand)]) continue;
      return { name: cand, place: place };
    }
    /* Last resort: any whole name of any group that is still free. */
    all = [];
    Object.keys(B.byGenre || {}).forEach(function (k) { all = all.concat(B.byGenre[k].whole || []); });
    Object.keys(B.byGen || {}).forEach(function (k) { all = all.concat(B.byGen[k].whole || []); });
    Object.keys(packBands).forEach(function (k) { all = all.concat(packBands[k] || []); });
    all = r.shuffle(all);
    for (i = 0; i < all.length; i++) {
      if (SB.text.nameOk(all[i], lw) && !used[SB.text.normName(all[i])]) return { name: all[i], place: false };
    }
    return SB.fail('WorldGen.band', 'no band name passes the name rule; the name banks are exhausted');
  }

  /** A name from a names.js group with patterns (room kinds, label, zine, agency, booking). */
  function groupName(state, P, group, r, own, where) {
    var lw = localWords(P), used = usedNames(state), i, cand, f;
    if (!group) return SB.fail(where, 'no name group');
    for (i = 0; i < 400; i++) {
      cand = null;
      if (group.whole && group.whole.length && (!group.patterns || !group.patterns.length || r.chance(0.5))) cand = r.pick(group.whole);
      else if (group.patterns && group.patterns.length) {
        f = fill(r.pick(group.patterns), group.banks, P, r, own);
        if (f) cand = f.name;
      }
      if (!cand) continue;
      if (!SB.text.nameOk(cand, lw)) continue;
      if (used[SB.text.normName(cand)]) continue;
      return cand;
    }
    return SB.fail(where, 'no name passes the name rule');
  }

  function personName(state, P, gen, r) {
    var N = names(), firsts = (N.first && N.first[GEN_KEY[gen]]) || [], w = P.words || {};
    var taken = {}, i, first, last, full, nick = null, f;
    Object.keys(state.people || {}).forEach(function (id) {
      var p = state.people[id];
      taken[(p.first + ' ' + p.last).toLowerCase()] = true;
    });
    if (!firsts.length) SB.fail('WorldGen.person', 'names.first has no names for ' + GEN_KEY[gen]);
    for (i = 0; i < 300; i++) {
      first = r.pick(firsts);
      last = (w.surnames && w.surnames.length && r.chance(0.6)) ? r.pick(w.surnames) : r.pick(N.last || w.surnames || ['Smith']);
      full = first + ' ' + last;
      if (taken[full.toLowerCase()] || SB.text.blocked(full)) continue;
      break;
    }
    if (N.nick && N.nick.patterns && N.nick.patterns.length && r.chance(N.nick.p || 0)) {
      f = fill(r.pick(N.nick.patterns), N.nick.banks, P, r, { first: first, last: last });
      if (f && f.name && !SB.text.blocked(f.name)) nick = f.name;
    }
    return { first: first, last: last, nick: nick };
  }

  /* ------------------------------------------------------------------ */
  /* zones and truth                                                     */
  /* ------------------------------------------------------------------ */

  function normRow(row) {
    var t = U.sum(row), i, out = [];
    for (i = 0; i < row.length; i++) out.push(t > 0 ? row[i] / t : 1 / row.length);
    return out;
  }

  function buildZones(state, P, r) {
    var jit = [0, 1, 2].map(function () {
      return GENRES.map(function () { return 1 + r.range(-C.SHARES_JITTER, C.SHARES_JITTER); });
    });
    state.zones = {};
    P.zones.forEach(function (z) {
      var scene = z.kind === 'CITY' ? P.scene.size : (z.scene || 0);
      var gens = normRow(z.gens || P.scene.gens);
      var pop = [0, 1, 2].map(function (g) {
        var row = P.scene.genreShares[g].map(function (s, i) {
          var x = s * jit[g][i];
          if (z.lean && z.lean.indexOf(GENRES[i]) >= 0) x *= 1.5;
          return x;
        });
        row = normRow(row);
        return row.map(function (s) { return r2(scene * gens[g] * s); });
      });
      state.zones[z.id] = { id: z.id, kind: z.kind, name: z.name, minutes: z.minutes || 0, pop: pop, tourBoostUntil: null };
    });
  }

  function quirkCauses(sign) {
    var q = (SB.Content.notebook && SB.Content.notebook.quirk) || {}, out = [];
    Object.keys(q).forEach(function (k) { if (q[k] && (sign > 0 ? q[k].up : q[k].down)) out.push(k); });
    if (!out.length) out = Object.keys(q);
    return out.length ? out : [sign > 0 ? 'SHARE_HOUSE' : 'FALLING_OUT'];
  }

  /** A save quirk: a pair delta on the affinity table. Exported through the extra `quirk` for Crowd.weekly. */
  function makeQuirk(state, r, born, life) {
    var s = r.int(0, 11), t = r.int(0, 10), d, sign;
    if (t >= s) t++;
    sign = r.chance(0.5) ? 1 : -1;
    d = r2(sign * r.range(C.QUIRK_SIZE[0], C.QUIRK_SIZE[1]));
    return { id: U.newId(state, 'k'), fan: GENRES[s], band: GENRES[t], d: d, both: r.chance(C.QUIRK_BOTH_WAYS),
             cause: r.pick(quirkCauses(sign)), born: born, ends: born + Math.max(4, Math.round(life)) };
  }

  function buildTruth(state, P, r) {
    var T = {}, span = C.QUIRK_LIFE_WEEKS * C.QUIRK_COUNT, i, nq, used = {};
    T.quirks = [];
    for (i = 0; i < C.QUIRK_COUNT; i++) {
      /* staggered so one dissolves about every QUIRK_LIFE_WEEKS */
      var q = makeQuirk(state, r, 0, 0);
      q.ends = Math.round((i + r.range(0.3, 1)) * C.QUIRK_LIFE_WEEKS);
      T.quirks.push(q);
    }
    nq = Object.keys((SB.Content.notebook && SB.Content.notebook.nightQuirk) || {});
    if (!nq.length) nq = ['SERVICE_NIGHT', 'STANDING_EVENT'];
    T.nightQuirks = [];
    for (i = 0; i < C.NIGHT_QUIRKS; i++) {
      var g = r.int(0, 2), dow = r.int(0, 6);
      if (used[g + ':' + dow]) { i--; continue; }
      used[g + ':' + dow] = true;
      T.nightQuirks.push({ gen: g, dow: dow, d: r2((r.chance(0.5) ? 1 : -1) * C.NIGHT_QUIRK_SIZE * r.range(0.6, 1)),
                           cause: r.pick(nq) });
    }
    T.chan = {};
    var chans = ['ANNOUNCE', 'LISTINGS', 'WOM', 'SHARE', 'ROOM'];
    (P.routes || []).forEach(function (rt) { chans.push('RUN:' + rt.id); });
    chans.forEach(function (ch) {
      T.chan[ch] = [0, 1, 2].map(function () { return r2(1 + r.range(-C.CHANNEL_SHUFFLE, C.CHANNEL_SHUFFLE)); });
    });
    T.comfort = P.money.comfort.map(function (c) {
      return Math.round((c + r.range(-C.PRIOR.price * 0.75, C.PRIOR.price * 0.75)) * 10) / 10;
    });
    T.zoneMul = {};
    P.zones.forEach(function (z) {
      if (z.kind !== 'CITY') T.zoneMul[z.id] = r2(1 + r.range(-C.PRIOR.zone * 0.75, C.PRIOR.zone * 0.75));
    });
    T.waves = {}; T.heat = {}; T.heatLine = {}; T.parKnows = {};
    var lag = P.scene.trendLag || 0;
    GENRES.forEach(function (genre) {
      var cyc = [], k, w = 0;
      for (k = 0; k < C.TREND.cycles; k++) {
        cyc.push({ period: r.int(C.TREND.period[0], C.TREND.period[1]), phase: r3(r.range(0, 2 * Math.PI)),
                   amp: r3(C.TREND.amplitude * r.range(0.4, 0.8)) });
      }
      T.waves[genre] = cyc;
      cyc.forEach(function (c) { w += c.amp * Math.sin(2 * Math.PI * (0 - lag) / c.period + c.phase); });
      T.heat[genre] = r3(U.clamp(w, -1, 1));
      T.heatLine[genre] = [T.heat[genre]];
      T.parKnows[genre] = false;
    });
    T.pulses = [];
    T.weather = {};
    T.allAgesDays = [];                    // days of every all-ages show in town in the last 52 weeks (Crowd), for the yearly intake
    state.truth = T;
  }

  /** Weather for days [from, to), from the pack's monthly chances. Writes truth.weather and town.forecast.
   *  Shared with Crowd.weekly through the extra export `weather` (both are E3a; the CROWD stream is passed in). */
  function weather(state, P, from, to, r) {
    var W = P.weather || {}, d, m, x, rain, heat, cold, truth, fc;
    for (d = from; d < to; d++) {
      if (state.truth.weather[d] !== undefined) continue;
      m = SB.time.month(d) - 1;
      rain = (W.rain || [])[m] || 0; heat = (W.heat || [])[m] || 0; cold = (W.cold || [])[m] || 0;
      x = r.next();
      truth = x < rain ? 'RAIN' : (x < rain + heat ? 'HEAT' : (x < rain + heat + cold ? 'COLD' : 'CLEAR'));
      if (r.chance(C.WEATHER.FORECAST_RIGHT)) fc = truth;
      else fc = truth === 'CLEAR' ? (r.chance(1 / 3) ? 'RAIN' : 'CLEAR') : 'CLEAR';
      state.truth.weather[d] = truth;
      state.town.forecast[d] = fc;
    }
  }

  /* ------------------------------------------------------------------ */
  /* people                                                              */
  /* ------------------------------------------------------------------ */

  function ageFor(r, gen) { return gen === 0 ? r.int(15, 20) : (gen === 1 ? r.int(21, 35) : r.int(36, 56)); }

  function tasteFor(state, r, gen, zoneId) {
    var z = zoneId && state.zones && state.zones[zoneId], weights, a, b, wont, low;
    weights = z ? z.pop[gen].slice() : SB.Config.CITY.GENRE_SHARES[gen].slice();
    a = r.weighted(GENRES, weights) || r.pick(GENRES);
    weights[GENRES.indexOf(a)] = 0;
    b = r.weighted(GENRES, weights) || r.pick(GENRES);
    if (r.chance(0.3)) wont = null;
    else {
      low = GENRES.filter(function (g) { return g !== a && g !== b; }).sort(function (x, y) {
        return C.AFFINITY[GENRES.indexOf(a)][GENRES.indexOf(x)] - C.AFFINITY[GENRES.indexOf(a)][GENRES.indexOf(y)];
      });
      wont = r.pick(low.slice(0, 3));
    }
    return { loves: [a, b], wont: wont };
  }

  function rateFor(P, roles) {
    var pi = (P.money && P.money.priceIndex) || 1, cast = P.cast || {};
    if (roles.indexOf('SOUND') >= 0) return cast.soundRate || Math.round(C.PAY.SOUND[0] * pi);
    if (roles.indexOf('SECURITY') >= 0) return cast.securityRate || Math.round(C.PAY.SECURITY[0] * pi);
    if (roles.indexOf('RUNNER') >= 0) return Math.round(C.PAY.HELPER_RUN[0] * pi);
    if (roles.indexOf('ARTIST') >= 0) return Math.round(C.FLYER.PAID_ARTIST[1] * pi);
    return 0;
  }

  /** person(state, spec) -> personId. spec = { roles, gen, zoneId, place, instrument } and, optionally,
   *  { ownerOf, ownerKind, regularType, originShowId, rel, met, rate } (used by build and by Bands for new members). */
  function person(state, spec) {
    spec = spec || {};
    ensureMaps(state);
    var P = packOf(state), r = wg(state), rn = nm(state);
    var gen = (spec.gen === 0 || spec.gen === 1 || spec.gen === 2) ? spec.gen : r.weighted([0, 1, 2], P.scene.gens);
    var roles = (spec.roles || ['MUSICIAN']).slice();
    var zoneId = spec.place ? null : (spec.zoneId === undefined ? 'city' : spec.zoneId);
    var n = personName(state, P, gen, rn), id = U.newId(state, 'p'), skill = {};
    ['SOUND', 'SECURITY', 'RUNNER', 'ARTIST', 'FLOOR', 'LODGING'].forEach(function (k) {
      if (roles.indexOf(k) >= 0) skill[k] = r2(r.range(0.45, 0.95));
    });
    state.people[id] = {
      id: id, first: n.first, last: n.last, nick: n.nick,
      born: year(state) - ageFor(r, gen), gen: gen,
      zoneId: zoneId, place: spec.place ? U.copy(spec.place) : null,
      state: 'ACTIVE', roles: roles, bands: [], pastBands: [],
      instrument: spec.instrument || null,
      rel: spec.rel === undefined ? null : spec.rel, relLog: [],
      met: spec.met === undefined ? null : spec.met,
      taste: tasteFor(state, r, gen, zoneId),
      wants: r.weighted(['CASH', 'FAVOR', 'LIST', 'NOTHING'], [0.5, 0.2, 0.2, 0.1]),
      rate: spec.rate === undefined ? rateFor(P, roles) : spec.rate,
      /* SPEC?: 01-state 2.2 gives Person two keys named `last` (the surname and the last eight HELP_OUTCOMEs). A JS
       * object holds one; the surname is kept and the outcome list is left for E4 to place under another key. */
      favors: 0, jobs: 0, asked: 0,
      ownerOf: spec.ownerOf || null, ownerKind: spec.ownerKind || null,
      regularType: spec.regularType || null, originShowId: spec.originShowId || null,
      listed: null,
      hid: { reliability: r2(r.range(C.HELP.reliability[0], C.HELP.reliability[1])), skill: skill,
             harm: r.chance(C.HARM.RATE) }
    };
    return id;
  }

  /* ------------------------------------------------------------------ */
  /* rooms                                                               */
  /* ------------------------------------------------------------------ */

  function routeForHood(P, hood, zoneId) {
    var h = P.derived && P.derived.hoodById && P.derived.hoodById[hood];
    if (h && h.route) return h.route;
    if (zoneId && zoneId !== 'city') return 'town:' + zoneId;
    return (P.derived && P.derived.cityRoutes && P.derived.cityRoutes[0]) || null;
  }

  function ownerGen(r, kind) {
    if (kind === 'HOUSE' || kind === 'DIY' || kind === 'OUTDOOR') return r.chance(0.75) ? 1 : 0;
    if (kind === 'HALL') return 2;
    return r.chance(0.5) ? 1 : 2;
  }

  function withoutBasements(g) {
    var o = {}, k, keep = function (x) { return !/basement/i.test(x); };
    for (k in g) o[k] = g[k];
    if (g.patterns) o.patterns = g.patterns.filter(keep);
    if (g.whole) o.whole = g.whole.filter(keep);
    return o;
  }

  /** room(state, spec) -> roomId. spec: a pack room entry, or { kind, zoneId, hood } to generate one. */
  function room(state, spec, quiet) {
    spec = spec || {};
    ensureMaps(state);
    var P = packOf(state), r = wg(state), rn = nm(state);
    var isPack = typeof spec.id === 'string' && typeof spec.cap === 'number';
    var kind = spec.kind;
    if (!E.ROOM[kind]) SB.fail('WorldGen.room', 'unknown room kind ' + kind);
    var def = C.CITY.ROOM_DEFAULT[kind] || {};
    var zoneId = spec.zoneId || spec.zone || 'city';
    var hood = spec.hood || null;
    if (!hood) {
      var hoods = (P.hoods || []).filter(function (h) {
        var town = typeof h.route === 'string' && h.route.indexOf('town:') === 0;
        return zoneId === 'city' ? !town : h.route === 'town:' + zoneId;
      });
      hood = hoods.length ? r.pick(hoods).id : (zoneId === 'city' ? null : zoneId);
    }
    var id = U.newId(state, 'r');
    var ownerKind = spec.owner || OWNER_BY_KIND[kind];
    var name = spec.name;
    var roomGroup = (names().room || {})[kind];
    /* no "the Basement on ..." in a town where houses sit on slabs (SB.Cities hasBasements) */
    if (roomGroup && P && P.basements === false) roomGroup = withoutBasements(roomGroup);
    /* A written name that fails the rule, or is already taken in this save, is replaced by a generated one. */
    if (!name || !SB.text.nameOk(name, localWords(P)) || usedNames(state)[SB.text.normName(name)]) {
      name = groupName(state, P, roomGroup, rn, null, 'WorldGen.room');
    }
    var pick = function (k, places) { return spec[k] !== undefined && spec[k] !== null && isPack ? spec[k] : drawIn(r, def[k], places); };
    var cap = isPack ? spec.cap : drawIn(r, def.cap);
    var ownerId = person(state, { roles: ['OWNER'], gen: ownerGen(r, kind), zoneId: zoneId, ownerKind: ownerKind });
    state.people[ownerId].ownerOf = id;
    var pressure = spec.pressure !== undefined ? spec.pressure : ((kind === 'HOUSE' || kind === 'DIY') ? 50 : 40);
    var standing = spec.standing ? spec.standing.slice() : [60, 60, 60];
    var room = {
      id: id, packId: isPack ? spec.id : null, name: name, kind: kind,
      zoneId: zoneId, hood: hood, route: spec.route || routeForHood(P, hood, zoneId),
      cap: cap,
      rent: pick('rent') || 0, deposit: pick('deposit') || 0, soundFee: pick('soundFee') || 0,
      houseCosts: pick('houseCosts') || 0, split: spec.split !== undefined ? spec.split : (def.split || null),
      hostCut: spec.hostCut !== undefined ? spec.hostCut : (kind === 'HOUSE' ? C.PAY.HOST : 0),
      pa: spec.pa !== undefined ? spec.pa : drawIn(r, def.pa, 2),
      ages: spec.ages ? spec.ages.slice() : ((kind === 'BAR' || kind === 'CLUB') ? ['A21'] : ['ALL']),
      matinee: !!spec.matinee,
      curfew: spec.curfew !== undefined ? spec.curfew : (def.curfew || 1380),
      ac: spec.ac !== undefined ? !!spec.ac : (kind === 'HALL' || kind === 'CLUB' || kind === 'BIG' || kind === 'BAR' || kind === 'SHOP'),
      outdoor: spec.outdoor !== undefined ? !!spec.outdoor : (kind === 'OUTDOOR' || (kind === 'HOUSE' && (P.houseType === 'CARPORT' || P.houseType === 'GARAGE'))),
      lowLying: !!spec.lowLying, seated: !!spec.seated,
      following: spec.following !== undefined ? spec.following : (kind === 'CLUB' || kind === 'BIG' ? 0.5 : (kind === 'BAR' || kind === 'SHOP' ? 0.2 : 0)),
      sketch: spec.sketch !== undefined ? spec.sketch : drawIn(r, def.sketch),
      standing: standing,
      ownerId: ownerId,
      ownerRel: spec.start ? C.OWNER.vouched : C.OWNER.start,
      needs: spec.needs ? spec.needs.slice() : [],
      notice: spec.notice !== undefined ? spec.notice : (drawIn(r, def.notice) || 14),
      open: true, openedWeek: quiet ? null : week(state), closedWeek: null, closedWhy: null,
      incidents: [], cleanSince: 0, playerShows: 0, playerQ: [],
      calendar: {},
      hid: {
        capReal: Math.max(1, Math.round(cap * r.range(C.PRIOR.roomcap[0] + 0.1, C.PRIOR.roomcap[1]))),
        genFit: [0, 1, 2].map(function () { return r2(r.range(-C.PRIOR.roomgen, C.PRIOR.roomgen) * 0.7); }),
        fit: r2(r.range(-C.ROOM_FIT_QUIRK, C.ROOM_FIT_QUIRK)),
        pressure: pressure,
        leaseEnds: kind === 'HOUSE' ? week(state) + 52 * r.int(C.ROOM_PRESSURE.houseLeaseYears[0], C.ROOM_PRESSURE.houseLeaseYears[1]) + r.int(0, 51) : null,
        flaky: r2(r.range(0, 0.2))
      }
    };
    /* a pack's room may say it always (or never) needs security or event insurance (C.SECURITY, C.INSURANCE) */
    if (spec.security === true || spec.security === false) room.security = spec.security;
    if (spec.insurance === true || spec.insurance === false) room.insurance = spec.insurance;
    state.rooms[id] = room;
    if (!quiet && SB.Notebook && SB.Notebook.init) SB.Notebook.init(state);
    return id;
  }

  /* ------------------------------------------------------------------ */
  /* bands                                                               */
  /* ------------------------------------------------------------------ */

  function zoneScene(state, zoneId) {
    var z = state.zones && state.zones[zoneId], t = 0;
    if (!z) return C.POOL.perSceneRef;
    z.pop.forEach(function (row) { row.forEach(function (x) { t += x; }); });
    return t;
  }

  function tierOf(state, zoneId, draw) {
    var scale = zoneScene(state, zoneId) / C.POOL.perSceneRef, n = 0;
    C.TIERS.forEach(function (th) { if (draw >= th * scale) n++; });
    return n;
  }

  function drawForTier(r, tier, scale) {
    var T = C.TIERS.map(function (x) { return x * scale; });
    if (tier <= 0) return Math.max(1, r.range(Math.max(1, T[0] * 0.2), T[0] * 0.95));
    if (tier >= 4) return r.range(T[3], T[3] * 1.5);
    return r.range(T[tier - 1] * 1.03, T[tier] * 0.95);
  }

  function pickNeeds(r, gen, tier, local, motive) {
    var pool = local ? ['SLOT', 'CROWD', 'SOUND', 'PAID', 'WEEKEND', 'BILL', 'ON_TIME', 'NAME_RIGHT', 'ALL_AGES']
                     : ['PAID', 'FLOOR', 'MEAL', 'CROWD', 'SOUND', 'ON_TIME', 'WEEKEND', 'BILL', 'NAME_RIGHT', 'ALL_AGES'];
    var w = pool.map(function (k) {
      if (k === 'ALL_AGES') return gen === 0 ? 4 : 0.3;
      if (k === 'PAID') return motive === 'MONEY' ? 4 : (local ? 1 : 3);
      if (k === 'CROWD') return motive === 'GROW' ? 3 : 1.5;
      if (k === 'SLOT') return tier >= 2 ? 3 : 1;
      if (k === 'FLOOR' || k === 'MEAL') return 2;
      return 1;
    });
    var n = r.chance(0.5) ? 2 : 3, out = [], k, i;
    for (i = 0; i < n; i++) {
      k = r.weighted(pool, w);
      if (!k) break;
      out.push(k); w[pool.indexOf(k)] = 0;
    }
    return out;
  }

  function motiveFor(r, tier) {
    if (tier <= 0) return r.weighted(['FUN', 'GROW', 'MONEY'], [0.5, 0.4, 0.1]);
    if (tier <= 2) return r.weighted(['GROW', 'FUN', 'MONEY'], [0.5, 0.25, 0.25]);
    return r.weighted(['MONEY', 'GROW', 'FUN'], [0.45, 0.45, 0.1]);
  }

  function askFor(P, tier, motive, feeAt, r) {
    var lohi = C.BAND_ASK[Math.max(0, Math.min(4, tier))], pi = (P.money && P.money.priceIndex) || 1;
    var amount = (lohi[0] + feeAt * (lohi[1] - lohi[0])) * pi * C.MOTIVE_ASK[motive] * (1 - C.TRUST_START.base / C.TRUST_ASK);
    amount = Math.round(amount / 5) * 5;
    if (amount <= 0) return { pay: r.chance(0.5) ? 'FREE' : 'GAS', amount: 0 };
    if (amount <= 30) return { pay: 'GAS', amount: amount };
    if (tier >= 3 && motive === 'MONEY' && r.chance(0.4)) return { pay: 'SHARE', amount: amount };
    return { pay: 'FLAT', amount: amount };
  }

  function seasonWord(r) { return r.pick(['spring', 'summer', 'fall', 'winter']); }

  /** Free musicians in a zone of a generation (not in a band, active, living there). */
  function freeMusicians(state, zoneId, gen, allowBanded) {
    var out = [];
    Object.keys(state.people).forEach(function (id) {
      var p = state.people[id];
      if (p.state !== 'ACTIVE' || p.zoneId !== zoneId || p.roles.indexOf('MUSICIAN') < 0 || p.listed) return;
      if (gen !== null && Math.abs(p.gen - gen) > 0 && !(allowBanded === 'ADJ' && Math.abs(p.gen - gen) === 1)) return;
      if (p.bands.length >= 2) return;
      if (p.bands.length === 1 && !allowBanded) return;
      out.push(id);
    });
    return out;
  }

  /** One member for a band: an existing musician when one fits, otherwise a new person. */
  function takeMember(state, r, zoneId, gen, instrument, exclude) {
    var pool = freeMusicians(state, zoneId, gen, false).filter(function (id) { return exclude.indexOf(id) < 0; });
    if (!pool.length && r.chance(C.POOL.inTwoBands)) {
      pool = freeMusicians(state, zoneId, gen, true).filter(function (id) { return exclude.indexOf(id) < 0; });
    }
    if (pool.length && r.chance(0.85)) return r.pick(pool);
    return person(state, { roles: ['MUSICIAN'], gen: gen, zoneId: zoneId, instrument: instrument });
  }

  /** The local band pool and new bands. spec = { genre, zoneId, memberIds, stage, tier, fromShowId, gen, draw }. */
  function makeBand(state, spec, inBuild) {
    spec = spec || {};
    ensureMaps(state);
    var P = packOf(state), r = wg(state), rn = nm(state);
    var zoneId = spec.zoneId || 'city';
    var z = state.zones[zoneId];
    if (!z) SB.fail('WorldGen.band', 'unknown zone ' + zoneId);
    var memberIds = (spec.memberIds || []).slice();
    var gen = spec.gen;
    if (gen !== 0 && gen !== 1 && gen !== 2) {
      if (memberIds.length) {
        var ages = memberIds.map(function (pid) { return state.people[pid] ? state.people[pid].gen : 1; });
        gen = Math.round(U.mean(ages));
      } else gen = r.weighted([0, 1, 2], (spec.tier || 0) >= 3 ? [0.15, 0.55, 0.3] : [0.35, 0.45, 0.2]);
    }
    var genre = spec.genre;
    if (!genre || !E.GENRE[genre]) {
      var w = z.pop[gen].map(function (x, i) {
        var h = (state.truth && state.truth.heat && state.truth.heat[GENRES[i]]) || 0;
        return x * Math.exp(h * C.TREND.newBandExp);
      });
      genre = r.weighted(GENRES, w) || r.pick(GENRES);
    }
    var genre2 = null;
    if (r.chance(0.25)) {
      var aw = GENRES.map(function (g, i) { return g === genre ? 0 : C.AFFINITY[GENRES.indexOf(genre)][i]; });
      genre2 = r.weighted(GENRES, aw);
    }
    var tier = spec.tier === undefined ? 0 : spec.tier;
    var feeder = zoneId !== 'city';
    var scaleCity = zoneScene(state, 'city') / C.POOL.perSceneRef;
    var drawHome = spec.draw !== undefined ? spec.draw : drawForTier(r, tier, scaleCity);
    var stage = spec.stage;
    if (!stage) stage = tier >= 4 ? 'BROKE_OUT' : (tier === 3 ? 'DRAW' : (tier === 2 ? 'ESTABLISHED' : (tier === 1 ? 'COMING_UP' : (r.chance(0.3) ? 'FORMING' : 'NEW'))));
    var nowYear = year(state), wk = week(state);
    var formedYear = nowYear;
    if (inBuild) {
      formedYear = stage === 'FORMING' ? nowYear - r.int(0, 1) : (stage === 'NEW' ? nowYear - 1 :
                   (tier === 1 ? nowYear - r.int(1, 4) : (tier === 2 ? nowYear - r.int(2, 8) : nowYear - r.int(4, 15))));
    }
    var sinceWeek = inBuild ? Math.min(-1, -((nowYear - formedYear) * 52 + r.int(0, 40))) : wk;
    var id = U.newId(state, 'b');
    var style = pickStyle(SB.rng.make(state.seed + ':style:' + id), genre, spec.style);   // its own stream: styles never shift the world's dice
    var nameRes = bandName(state, P, genre, gen, rn, style, true);
    var motive = motiveFor(r, tier);
    var feeAt = r3(r.next());
    var size = r.int(C.MEMBER.size[0], C.MEMBER.size[1]);
    var members = [], i, pid, instr;
    for (i = 0; i < Math.max(size, memberIds.length); i++) {
      instr = INSTRUMENTS[i % INSTRUMENTS.length];
      if (i < memberIds.length) pid = memberIds[i];
      else {
        var mgen = r.chance(0.8) ? gen : U.clamp(gen + (r.chance(0.5) ? 1 : -1), 0, 2);
        pid = takeMember(state, r, zoneId, mgen, instr, memberIds.concat(members.map(function (m) { return m.personId; })));
      }
      if (!state.people[pid]) SB.fail('WorldGen.band', 'unknown member ' + pid);
      members.push({ personId: pid, instrument: instr, since: sinceWeek, founder: true });
      /* SPEC?: person.bands is E4's field, but no People function adds a membership; WorldGen and Bands write it. */
      if (state.people[pid].bands.indexOf(id) < 0) state.people[pid].bands.push(id);
      if (!state.people[pid].instrument) state.people[pid].instrument = instr;
      if (state.people[pid].roles.indexOf('MUSICIAN') < 0) state.people[pid].roles.push('MUSICIAN');
    }
    var draw = {};
    draw[zoneId] = r2(drawHome);
    if (feeder) draw.city = r2(drawHome * r.range(0.3, 0.6));
    var followers = Math.max(0, Math.round(drawHome / C.FOLLOW_RATE * r.range(0.75, 1.25)));
    var plays = [], lastPlay = null, firstWeek = null;
    if (stage !== 'FORMING') {
      if (inBuild) {
        lastPlay = -r.int(3, 45);
        if (lastPlay >= -C.WEAR.window * 7) plays.push(lastPlay);
        firstWeek = stage === 'NEW' ? -r.int(4, 40) : sinceWeek + r.int(4, 20);
      } else firstWeek = wk;
    }
    var hidLive = Math.round(U.clamp(r.normal(45 + 9 * tier, 10), 20, 95));
    var band = {
      id: id, name: nameRes.name, local: true, zoneId: zoneId, place: null,
      genre: genre, genre2: genre2, style: style,
      formedYear: formedYear, stage: stage, motive: motive,
      members: members, past: [],
      contactId: members.length ? members[members.length > 3 ? 3 : 0].personId : null,
      followers: followers,
      tierPublic: tierOf(state, 'city', followers * C.FOLLOW_RATE),      // what the town (the city) thinks
      ask: askFor(P, tier, motive, feeAt, r),
      trust: { base: C.TRUST_START.base, events: [] },
      knows: { motive: false, needs: [], promotes: null },
      plays: plays, shows: [], outUntil: null, playedOutUntil: null, endedWeek: null,
      history: [],
      circle: [], visits: [], spread: null,
      fromShowId: spec.fromShowId || null,
      hid: {
        draw: draw, drawPeak: r2(drawHome),
        buzz: r2(inBuild ? r.range(-0.15, 0.25) : r.range(0, 0.3)),
        cross: r2(r.range(0, gen === 2 ? 0.45 : 0.7)),
        live: hidLive,
        rel: r2(r.range(0.4, 1)), promo: r2(r.range(0.1, 1)), honest: r2(r.range(0.3, 1)),
        cohesion: r2(r.range(0.3, 1)),
        needs: pickNeeds(r, gen, tier, true, motive),
        freeRate: r2(r.range(C.BAND_FREE[0], C.BAND_FREE[1])),
        conversion: 1, oversell: 1, knownHere: 1, tells: [], floor: 0,
        feeAt: feeAt, placeName: nameRes.place,
        firstWeek: firstWeek, lastPlay: lastPlay, lastContact: null,
        fallWeeks: 0, lastDraw: r2(drawHome), freshLine: [], pulsed: false, gen: gen
      }
    };
    if (band.style === band.genre) delete band.style;   // stored only when it is not the genre (save size)
    band.history.push({ week: sinceWeek, k: 'FORMED', showId: null,
                        text: say(state, 'legacy.bandHistory.FORMED', { band: band.name, season: seasonWord(r) + ' ' + formedYear,
                                                                       how: spec.how || z.name, year: formedYear }) });
    state.bands[id] = band;
    if (!inBuild && SB.Notebook && SB.Notebook.init) SB.Notebook.init(state);
    return id;
  }

  function band(state, spec) { return makeBand(state, spec, false); }

  /* ------------------------------------------------------------------ */
  /* touring bands                                                       */
  /* ------------------------------------------------------------------ */

  function homeScene(home) {
    var e = home && home.slug && SB.Cities.entry ? SB.Cities.entry(home.slug) : null;
    var pop = (e && e.pop) || (home && home.pop) || 500000;
    return Math.max(300, C.CITY.SCENE_SIZE.k * Math.pow(pop, C.CITY.SCENE_SIZE.exp));
  }

  function awayDraw(state, P, b) {
    var word = (state.town && state.town.word) || 0, here, f = b.followers;
    var d = f * C.AWAY_RATE * Math.pow(P.scene.size / C.AWAY.sceneRef, C.AWAY.sceneExp) *
            (C.AWAY.wordBase + C.AWAY.wordSpan * word / 100);
    here = P.derived && P.derived.index;
    if (here && b.place && typeof b.place.lat === 'number' && SB.geo.drive(b.place, here) <= C.AWAY.nearHours * 60) d *= C.AWAY.near;
    return d * b.hid.conversion * b.hid.knownHere;
  }

  /** touringBand(state, spec) -> bandId. spec = { home: place, genre, tier, kind: REQ_TEMPLATE } */
  function touringBand(state, spec) {
    spec = spec || {};
    ensureMaps(state);
    var P = packOf(state), r = wg(state), rn = nm(state);
    var kind = spec.kind || 'CAREFUL';
    var home = spec.home ? U.copy(spec.home) : (P.whereGo && P.whereGo[0] ? U.copy(P.whereGo[0]) : { slug: null, name: 'out of town', state: '', lat: 0, lon: 0 });
    if (home.slug === undefined) home.slug = null;
    var tier = spec.tier === undefined ? (kind === 'TOO_BIG' ? 3 : 1) : spec.tier;
    var gen = kind === 'KIDS_TOUR' ? 0 : (kind === 'REUNION' ? 2 : r.weighted([0, 1, 2], [0.3, 0.55, 0.15]));
    var genre = spec.genre && E.GENRE[spec.genre] ? spec.genre : r.weighted(GENRES, C.CITY.GENRE_SHARES[gen]);
    var id = U.newId(state, 'b');
    var style = pickStyle(SB.rng.make(state.seed + ':style:' + id), genre, spec.style);   // its own stream: styles never shift the world's dice
    var nameRes = bandName(state, P, genre, gen, rn, style, false);
    var scale = homeScene(home) / C.POOL.perSceneRef;
    var drawHome = drawForTier(r, tier, scale);
    var motive = motiveFor(r, tier);
    var size = r.int(C.MEMBER.size[0], C.MEMBER.size[1]), members = [], i, pid, instr;
    for (i = 0; i < size; i++) {
      instr = INSTRUMENTS[i % INSTRUMENTS.length];
      pid = person(state, { roles: ['MUSICIAN'], gen: r.chance(0.8) ? gen : U.clamp(gen + 1, 0, 2), place: home, instrument: instr });
      state.people[pid].bands.push(id);
      members.push({ personId: pid, instrument: instr, since: week(state) - r.int(26, 300), founder: true });
    }
    var conv = r.chance(0.8) ? r.range(C.REQUESTS.CONVERSION.common[0], C.REQUESTS.CONVERSION.common[1])
                             : r.range(C.REQUESTS.CONVERSION.range[0], C.REQUESTS.CONVERSION.range[1]);
    var os = r.weighted(C.REQUESTS.OVERSELL, C.REQUESTS.OVERSELL.map(function (o) { return o.p; }));
    if (kind === 'OVERSELL') os = C.REQUESTS.OVERSELL[C.REQUESTS.OVERSELL.length - 1];
    if (kind === 'CAREFUL') os = C.REQUESTS.OVERSELL[0];
    var oversell = r2(r.range(os.x[0], os.x[1]));
    var honest = kind === 'CAREFUL' ? r.range(0.75, 1) : (kind === 'OVERSELL' ? r.range(0.2, 0.5) : r.range(0.3, 1));
    var rel = kind === 'CAREFUL' ? r.range(0.75, 1) : (kind === 'MASS' || kind === 'TERSE' ? r.range(0.35, 0.8) : r.range(0.4, 1));
    var promo = kind === 'MASS' ? r.range(0.1, 0.45) : r.range(0.2, 1);
    var b = {
      id: id, name: nameRes.name, local: false, zoneId: null, place: home,
      genre: genre, style: style, genre2: r.chance(0.2) ? r.pick(GENRES.filter(function (g) { return g !== genre; })) : null,
      formedYear: year(state) - (kind === 'REUNION' ? r.int(15, 25) : r.int(1, 2 + 2 * tier)),
      stage: tier >= 4 ? 'BROKE_OUT' : (tier === 3 ? 'DRAW' : (tier === 2 ? 'ESTABLISHED' : 'COMING_UP')),
      motive: motive, members: members, past: [],
      contactId: members[0].personId,
      followers: Math.round(drawHome / C.FOLLOW_RATE * r.range(0.8, 1.25)),
      tierPublic: tier,
      ask: null,
      trust: { base: kind === 'FRIEND' ? C.TRUST_START.introduced : C.TRUST_START.base, events: [] },
      knows: { motive: false, needs: [], promotes: null },
      plays: [], shows: [], outUntil: null, playedOutUntil: null, endedWeek: null,
      history: [], circle: [], visits: [], spread: null, fromShowId: null,
      hid: {
        draw: {}, drawPeak: 0, buzz: r2(r.range(-0.1, 0.3)),
        cross: r2(r.range(0, 0.6)), live: Math.round(U.clamp(r.normal(55 + 7 * tier, 10), 20, 95)),
        rel: r2(rel), promo: r2(promo), honest: r2(honest), cohesion: r2(r.range(0.35, 1)),
        needs: pickNeeds(r, gen, tier, false, motive),
        freeRate: r2(r.range(C.BAND_FREE[0], C.BAND_FREE[1])),
        conversion: r2(conv), oversell: oversell, knownHere: 1, tells: [], floor: 0,
        feeAt: r3(r.next()), placeName: false, homeDraw: r2(drawHome), tier: tier, kind: kind,
        firstWeek: null, lastPlay: null, lastContact: null, fallWeeks: 0, lastDraw: 0, freshLine: [], pulsed: false, gen: gen
      }
    };
    if (b.style === b.genre) delete b.style;   // stored only when it is not the genre (save size)
    var h = b.hid, tells = [];
    if (h.rel >= 0.8) tells.push('PRO');
    if (h.rel < 0.5) tells.push('SLOPPY');
    if (kind === 'MASS') tells.push('MASS');
    if (h.oversell >= 1.2) tells.push('OVERSELL');
    if (h.honest >= C.REQUESTS.GOOD_TELLS.honestAt) tells.push('HONEST');
    if (kind === 'RESCUE' || kind === 'BREAKDOWN') tells.push('DESPERATE');
    if (tier >= 3) tells.push('ESTABLISHED');
    if (h.rel < 0.45) tells.push('FLAKY');
    if (kind === 'FRIEND') tells.push('REFERRED');
    if (gen === 2) tells.push('OLDER');
    if (gen === 0) tells.push('YOUNGER');
    if (h.promo >= 0.7) tells.push('PROMOTES');
    if (kind !== 'TERSE' && r.chance(0.6)) tells.push('PLEASANT');
    h.tells = tells;
    h.draw.city = r2(awayDraw(state, P, b));
    h.drawPeak = h.draw.city; h.lastDraw = h.draw.city;
    /* The bands they talk to: touring bands already in the save that share a genre family. */
    var circleN = r.int(C.POOL.touringCircle[0], C.POOL.touringCircle[1]);
    b.circle = Object.keys(state.bands).filter(function (oid) {
      var o = state.bands[oid];
      return !o.local && E.GENRE_FAMILY[o.genre] === E.GENRE_FAMILY[genre];
    }).slice(-circleN);
    state.bands[id] = b;
    if (SB.Notebook && SB.Notebook.init) SB.Notebook.init(state);
    return id;
  }

  /* ------------------------------------------------------------------ */
  /* build                                                               */
  /* ------------------------------------------------------------------ */

  function samePlace(a, b) { return a && b && a.name === b.name && (a.state || '') === (b.state || ''); }

  function biggerThanHere(P, place) {
    var here = (P.derived && P.derived.index && P.derived.index.pop) || 0;
    var e = place.slug && SB.Cities.entry ? SB.Cities.entry(place.slug) : null;
    if (e && e.pop) return e.pop > here;
    return (P.whereGo || []).some(function (w) { return samePlace(w, place); });
  }

  function build(state, P) {
    if (!state || typeof state !== 'object') SB.fail('WorldGen.build', 'no state');
    if (!P || !P.scene || !P.zones) SB.fail('WorldGen.build', 'pack is not a normalized pack');
    if (!state.rng) state.rng = SB.rng.init();
    ensureMaps(state);
    var r = wg(state), wk = week(state);

    /* town */
    state.town = {
      word: P.scene.wordStart, wordBase: P.scene.wordStart, wordLine: [{ week: wk, word: P.scene.wordStart }],
      forecast: {}, allAges: {}, kidsLine: [], signs: []
    };
    state.town.allAges[year(state)] = 0;

    /* zones, truth, weather */
    buildZones(state, P, r);
    buildTruth(state, P, r);
    state.town.kidsLine.push({ year: year(state), kids: Math.round(U.sum(state.zones.city ? state.zones.city.pop[0] : [0])) });
    weather(state, P, today(state), today(state) + 7 + C.WEATHER.FORECAST_DAYS, r);

    /* regulars: none yet, one cell table per zone */
    var by = {};
    Object.keys(state.zones).forEach(function (zid) {
      by[zid] = [0, 1, 2].map(function () { return GENRES.map(function () { return 0; }); });
    });
    state.regulars = { by: by, total: 0, faces: [], lastBadWeek: null, priceyRun: 0, line: [{ week: wk, total: 0 }] };

    /* rooms and their owners */
    var rooms = (P.derived && P.derived.allRooms) || P.rooms || [];
    var byPack = {};
    rooms.forEach(function (pr) { byPack[pr.id] = room(state, pr, true); });

    /* the handoff cast: sound, and security for the nights that need it (the player works the door); the host is the
     * start room's owner */
    var cast = P.cast || {};
    person(state, { roles: ['SOUND'], gen: 1, zoneId: 'city', rate: cast.soundRate, rel: C.HELP.relStart, met: wk });
    person(state, { roles: ['SECURITY'], gen: 1, zoneId: 'city', rate: cast.securityRate, rel: C.HELP.relStart, met: wk });

    /* other bookers */
    (P.bookers || []).forEach(function (bk) {
      var g = bk.kind === 'KID' ? 0 : (bk.kind === 'OLD' ? 2 : 1);
      var pid = person(state, { roles: ['BOOKER'], gen: g, zoneId: 'city' });
      state.bookers[pid] = {
        id: pid, kind: bk.kind, genres: (bk.genres || []).slice(),
        homeRooms: (bk.homeRooms || []).map(function (h) { return byPack[h]; }).filter(Boolean),
        name: bk.name === undefined ? 30 : bk.name, showsPerMonth: bk.showsPerMonth === undefined ? 1 : bk.showsPerMonth,
        nights: (bk.nights || [4, 5]).slice(), style: U.copy(bk.style || { reliable: 0.8, pays: 0.8, promotes: 0.6 }),
        rel: C.BOOKERS.relStart, regulars: Math.round((bk.name || 30) * 1.3), chasing: null, active: true
      };
    });

    /* contacts, and the outgoing booker in whereGo[0] */
    var outPlace = P.whereGo && P.whereGo[0] ? P.whereGo[0] : null, outDone = false;
    var contacts = (P.contacts || []).slice();
    if (outPlace && !contacts.some(function (c) { return samePlace(c, outPlace); })) contacts.push(outPlace);
    contacts.forEach(function (c) {
      var place = { slug: c.slug || null, name: c.name, state: c.state, lat: c.lat, lon: c.lon };
      var isOut = !outDone && samePlace(place, outPlace);
      var pid = person(state, { roles: isOut ? ['OUTGOING', 'CONTACT', 'BOOKER'] : ['CONTACT', 'BOOKER'], gen: 1, place: place,
                                rel: isOut ? 60 : null, met: isOut ? wk : null });
      if (isOut) outDone = true;
      /* SPEC?: the spec gives no starting strength for a contact the player has not met; 15 to 30 is used. */
      state.contacts[pid] = { id: pid, place: place, strength: isOut ? C.CONTACT.outgoingStart : r.int(15, 30),
                              asked: 0, bigger: biggerThanHere(P, place), owes: [], youOwe: [] };
    });

    /* the local band pool: the city's tiers scaled by its scene, and each feeder town's own bands */
    var scale = P.scene.size / C.POOL.perSceneRef, t, k, n;
    for (t = 0; t < C.POOL.start.length; t++) {
      n = Math.max(t < 3 ? 1 : 0, Math.round(C.POOL.start[t] * scale));
      for (k = 0; k < n; k++) makeBand(state, { zoneId: 'city', tier: t }, true);
    }
    P.zones.forEach(function (z) {
      if (z.kind !== 'FEEDER') return;
      for (k = 0; k < (z.bands || 0); k++) makeBand(state, { zoneId: z.id, tier: r.chance(0.3) ? 1 : 0 }, true);
    });

    /* musicians not yet in a band: the pool new bands form from */
    var target = Math.round(C.POOL.musicians * scale), have = 0;
    Object.keys(state.people).forEach(function (id) { if (state.people[id].roles.indexOf('MUSICIAN') >= 0 && state.people[id].zoneId) have++; });
    while (have < target) {
      person(state, { roles: ['MUSICIAN'], gen: r.weighted([0, 1, 2], P.scene.gens), zoneId: 'city', instrument: r.pick(INSTRUMENTS) });
      have++;
    }

    /* six regular faces (not yet regulars) */
    var types = E.REGULAR_TYPE ? Object.keys(E.REGULAR_TYPE) : [];
    var traits = (P.derived && P.derived.traits) || [];
    if (traits.indexOf('MILITARY') < 0) types = types.filter(function (x) { return x !== 'SAILOR'; });
    types = r.shuffle(types).slice(0, C.REGULAR_FACES);
    var feeders = P.zones.filter(function (z) { return z.kind === 'FEEDER'; });
    types.forEach(function (ty) {
      var g = ty === 'KID_WITH_RIDE' ? 0 : (ty === 'OLD_HEAD' ? 2 : (ty === 'EVERYTHING' ? r.int(0, 2) : 1));
      var zid = ty === 'OUT_OF_TOWNER' && feeders.length ? r.pick(feeders).id : 'city';
      person(state, { roles: ['REGULAR'], gen: g, zoneId: zid, regularType: ty });
    });
  }

  /** Extra (not in the manifest): a name from a names.js group, for labels, zines, agencies and booking names. */
  function name(state, groupKey) {
    var P = packOf(state), g = names()[groupKey];
    return groupName(state, P, g, nm(state), null, 'WorldGen.name');
  }

  return {
    build: build,
    band: band,
    person: function (state, spec) { return person(state, spec); },
    touringBand: touringBand,
    room: function (state, spec) { return room(state, spec, false); },
    /* extras for E3a's own modules (Bands, Crowd) and for neighbors that need a checked name */
    name: name,
    weather: weather,
    quirk: makeQuirk,
    awayDraw: function (state, b) { return awayDraw(state, packOf(state), b); }
  };
});
