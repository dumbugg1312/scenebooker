/* Scene Booker — js/engine/world/crowd.js
 * SB.Crowd: the population by (zone, generation, genre), regulars won and lost, burnout load, the specialist or
 * all-rounder measure, weather, save quirks and the yearly turnover of the generations. Stream CROWD.
 * Owner: E3a. Spec: design/spec/02-engine.md 4.5, 7.6 (burnout), 7.20; 01-state.md 1 (zones, regulars, town, truth);
 * mechanics.md 6.
 */
SB.module('Crowd', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var GENRES = E.GENRES;

  function rc(state) { return SB.rng.stream(state, E.STREAM.CROWD); }
  function week(state) { return state.clock ? state.clock.week : 0; }
  function today(state) { return state.clock ? state.clock.day : 0; }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function r2(x) { return Math.round(x * 100) / 100; }
  function r3(x) { return Math.round(x * 1000) / 1000; }
  function packOf(state) { return SB.Cities.pack(state); }
  function zeros() { return [0, 1, 2].map(function () { return GENRES.map(function () { return 0; }); }); }

  function rec(state, t, extra, showId) {
    var r = { t: t, day: today(state), half: half(state), showId: showId || null, text: '' }, k;
    for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) r[k] = extra[k];
    return r;
  }

  function say(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
  }

  function zoneOf(state, zoneId, where) {
    var z = state.zones && state.zones[zoneId];
    if (!z) SB.fail(where, 'unknown zone ' + zoneId);
    return z;
  }

  function regBy(state, zoneId) {
    var R = state.regulars;
    if (!R.by[zoneId]) R.by[zoneId] = zeros();
    return R.by[zoneId];
  }

  function recount(state) {
    var R = state.regulars, t = 0;
    Object.keys(R.by).forEach(function (z) { R.by[z].forEach(function (row) { row.forEach(function (x) { t += x; }); }); });
    R.total = r2(t);
    return R.total;
  }

  /* ------------------------------------------------------------------ */
  /* population                                                          */
  /* ------------------------------------------------------------------ */

  /** The live population of a zone: state.zones pop, with a seasonal town's summer crowd (pack zone `season`). */
  function cells(state, zoneId) {
    var z = zoneOf(state, zoneId, 'Crowd.cells'), mul = 1, P = packOf(state);
    var pz = P.derived && P.derived.zoneById ? P.derived.zoneById[zoneId] : null;
    if (pz && pz.season && pz.season.months && pz.season.months.indexOf(SB.time.month(today(state))) >= 0) mul = pz.season.mul || 1;
    return z.pop.map(function (row) { return row.map(function (x) { return x * mul; }); });
  }

  /* ------------------------------------------------------------------ */
  /* focus and regulars                                                  */
  /* ------------------------------------------------------------------ */

  function computeFocus(state) {
    var recent = (state.player && state.player.recentGenres) || [], n = 0, share = {}, v = 0;
    recent.slice(-C.FOCUS.shows).forEach(function (gs) { (gs || []).forEach(function (g) { share[g] = (share[g] || 0) + 1; n++; }); });
    var genres = [];
    Object.keys(share).forEach(function (g) {
      var s = share[g] / n;
      v += s * s;
      if (s >= 0.2) genres.push(g);
    });
    genres.sort(function (a, b) { return share[b] - share[a]; });
    if (!n) return { value: 0, kind: 'BETWEEN', genres: [] };
    return { value: r3(v), kind: v >= C.FOCUS.specialist ? 'SPECIALIST' : (v <= C.FOCUS.allrounder ? 'ALLROUNDER' : 'BETWEEN'),
             genres: genres };
  }

  function focus(state) {
    var f = state.player && state.player.focus;
    return f ? { value: f.value, kind: f.kind, genres: (f.genres || []).slice() } : computeFocus(state);
  }

  function lastShowDay(state) {
    var d = null;
    Object.keys(state.shows || {}).forEach(function (sid) {
      var s = state.shows[sid];
      if (s.status === 'PLAYED' && (d === null || s.day > d)) d = s.day;
    });
    return d;
  }

  function weeksIdle(state) {
    var lw = state.player && state.player.lastShowWeek, d;
    if (lw === null || lw === undefined) { d = lastShowDay(state); lw = d === null ? null : SB.time.week(d); }
    return lw === null ? null : week(state) - lw;
  }

  function regulars(state) {
    var R = state.regulars, byGen = [0, 0, 0], byGenre = {}, byZone = [], f = focus(state), total = R.total || 0;
    Object.keys(R.by).forEach(function (zid) {
      var n = 0;
      R.by[zid].forEach(function (row, g) {
        row.forEach(function (x, s) { byGen[g] += x; byGenre[GENRES[s]] = (byGenre[GENRES[s]] || 0) + x; n += x; });
      });
      if (n >= 0.5) byZone.push({ zoneId: zid, name: state.zones[zid] ? state.zones[zid].name : zid, n: Math.round(n) });
    });
    var genres = Object.keys(byGenre).filter(function (g) { return byGenre[g] >= 0.5; })
      .map(function (g) { return { genre: g, n: Math.round(byGenre[g]) }; })
      .sort(function (a, b) { return b.n - a.n; });
    var idle = weeksIdle(state);
    var drifting = idle !== null && idle > C.REG_LOSS.idleAfterWeeks ? Math.round(total * C.REG_LOSS.idlePerWeek) : 0;
    return {
      total: Math.round(total), byGen: byGen.map(Math.round), byGenre: genres, byZone: byZone,
      floor: { lo: Math.round(total * C.REG_RATE * C.REG_FLOOR[f.kind] * 0.6), hi: Math.round(total * C.REG_RATE * 0.9) },
      faces: (R.faces || []).slice(), drifting: drifting, kind: f.kind,
      mailingList: (state.player && state.player.mailingList) || 0
    };
  }

  /** byCell: { zoneId: [[12], [12], [12]] }, or one 3 x 12 table for the city. -> heads added */
  function addRegulars(state, byCell, why) {
    if (!byCell) return 0;
    var map = Array.isArray(byCell) ? { city: byCell } : byCell, added = 0;
    Object.keys(map).forEach(function (zid) {
      if (!state.zones[zid]) SB.fail('Crowd.addRegulars', 'unknown zone ' + zid);
      var t = regBy(state, zid);
      map[zid].forEach(function (row, g) {
        row.forEach(function (x, s) { if (x > 0 && isFinite(x)) { t[g][s] = r3(t[g][s] + x); added += x; } });
      });
    });
    recount(state);
    return r2(added);
  }

  function regularsCame(state, showId) {
    var s = state.shows && state.shows[showId];
    if (!s) return 0;
    var res = s.result || {}, d = res.demand || (s.night && s.night.demand) || null;
    var br = res.byReason || (d && d.byReason) || {};
    var n = typeof br.REGULAR === 'number' ? br.REGULAR : 0;
    if (d && d.heads && res.heads) n *= Math.min(1, res.heads / d.heads);
    return n;
  }

  /** share 0..1. filter: { came: showId } | { gens, genres } | null. -> heads lost */
  function loseRegulars(state, share, filter, why) {
    var R = state.regulars, lost = 0, total = R.total || 0, frac = U.clamp(share || 0, 0, 1);
    if (total <= 0 || frac <= 0) return 0;
    if (filter && filter.came) {
      var came = regularsCame(state, filter.came);
      frac = U.clamp(frac * came / total, 0, 1);
    }
    Object.keys(R.by).forEach(function (zid) {
      R.by[zid].forEach(function (row, g) {
        if (filter && filter.gens && filter.gens.indexOf(g) < 0) return;
        row.forEach(function (x, s) {
          if (filter && filter.genres && filter.genres.indexOf(GENRES[s]) < 0) return;
          var d = x * frac;
          row[s] = r3(x - d); lost += d;
        });
      });
    });
    recount(state);
    return r2(lost);
  }

  /* ------------------------------------------------------------------ */
  /* burnout load (7.6)                                                  */
  /* ------------------------------------------------------------------ */

  function aff(state, s, t, g) {
    if (s === t) return 1;
    var a = C.AFFINITY[E.GENRE_INDEX[s]][E.GENRE_INDEX[t]], P = packOf(state);
    (P.tilt || []).forEach(function (x) {
      if (x.fan === s && x.band === t && (x.gen === undefined || x.gen === null || x.gen === g)) a += x.d;
    });
    ((state.truth && state.truth.quirks) || []).forEach(function (q) {
      if ((q.fan === s && q.band === t) || (q.both && q.fan === t && q.band === s)) a += q.d;
    });
    return U.clamp(a, 0, 1.2);
  }

  function bandG(state, b) {
    if (SB.Bands && typeof SB.Bands.gen === 'function') return SB.Bands.gen(state, b.id);
    var y = SB.time.year(today(state)), ages = b.members.map(function (m) { var p = state.people[m.personId]; return p ? y - p.born : 28; });
    ages.sort(function (a, c) { return a - c; });
    var med = ages.length ? ages[Math.floor(ages.length / 2)] : 28;
    var p = med < C.KIDS_BAND_AGE ? C.GEN_PROFILE.KIDS : (med >= C.OLD_BAND_AGE ? C.GEN_PROFILE.OLD : C.GEN_PROFILE.MIDDLE);
    var x = (b.hid && b.hid.cross) || 0;
    return [0, 1, 2].map(function (g) { return (1 - x) * p[g] + x * C.GEN_PROFILE.EVERYONE[g]; });
  }

  function fitOf(state, bandIds, gen, genre) {
    var best = 0;
    bandIds.forEach(function (bid) {
      var b = state.bands[bid];
      if (!b) return;
      var a = aff(state, genre, b.genre, gen);
      if (b.genre2) a = (1 - C.SECOND_GENRE) * a + C.SECOND_GENRE * aff(state, genre, b.genre2, gen);
      best = Math.max(best, a * bandG(state, b)[gen]);
    });
    return best;
  }

  /* fitOf with the bands' profiles and the affinities remembered for one call (the same numbers, computed once) */
  function fitCached(state, bandIds, gen, genre, memo) {
    var best = 0, i, b, a, G, k;
    function affM(s, t) { k = s + '|' + t + '|' + gen; if (!(k in memo.A)) memo.A[k] = aff(state, s, t, gen); return memo.A[k]; }
    for (i = 0; i < bandIds.length; i++) {
      b = state.bands[bandIds[i]];
      if (!b) continue;
      a = affM(genre, b.genre);
      if (b.genre2) a = (1 - C.SECOND_GENRE) * a + C.SECOND_GENRE * affM(genre, b.genre2);
      G = memo.G[b.id] || (memo.G[b.id] = bandG(state, b));
      best = Math.max(best, a * G[gen]);
    }
    return best;
  }

  /* ---- looking ahead (C.AHEAD): a bigger similar show on one of the next few nights ---- */

  function announced(s) { return !!(s.promo && s.promo.announce !== null && s.promo.announce !== undefined); }

  /* a show's size as the public sees it: the draw of its public tier (another booker's `tier`, or the best tierPublic on
   * the player's bill) */
  function showTier(state, s) {
    var t = 0, slots, i, b;
    if (!s.bill) return typeof s.tier === 'number' && s.tier === s.tier ? s.tier : 0;
    slots = s.bill.slots || [];
    for (i = 0; i < slots.length; i++) {
      b = state.bands && state.bands[slots[i].bandId];
      if (b && typeof b.tierPublic === 'number' && b.tierPublic > t) t = b.tierPublic;
    }
    return t;
  }
  function tierSize(t) {
    t = typeof t === 'number' && t === t ? Math.floor(t) : 0;
    return t >= 1 ? C.TIERS[Math.min(t, C.TIERS.length) - 1] : C.AHEAD.tier0;
  }
  /* 0 when theirs is no bigger than mine, 1 from AHEAD.full times mine */
  function bigger(theirTier, myTier) {
    var mine = Math.max(1e-9, tierSize(myTier)), span = Math.max(1e-9, C.AHEAD.full - 1);
    return U.clamp((tierSize(theirTier) / mine - 1) / span, 0, 1);
  }

  /* The shows 1 to AHEAD.days.length nights after `day` in the zone that the public knows about (other bookers' shows not
   * merely held, the player's own once announced), each with its weight: by the night, x how much bigger than a show of
   * public tier `tier`. No tier, no forward part. */
  function aheadOf(state, zoneId, day, tier) {
    var out = [], D = C.AHEAD.days, shows = state.shows || {}, others = state.otherShows || [], sid, s, i, o, a, w;
    if (typeof tier !== 'number' || tier !== tier) return out;
    for (sid in shows) {
      s = shows[sid]; a = s.day - day;
      if (!(a >= 1 && a <= D.length) || s.status === 'CANCELLED' || s.status === 'DRAFT' || s.zoneId !== zoneId || !s.bill || !announced(s)) continue;
      w = D[a - 1] * bigger(showTier(state, s), tier) * C.AHEAD.w;
      if (w > 0) out.push({ bands: (s.bill.slots || []).map(function (sl) { return sl.bandId; }), w: w });
    }
    for (i = 0; i < others.length; i++) {
      o = others[i]; a = o.day - day;
      if (!(a >= 1 && a <= D.length) || o.zoneId !== zoneId || o.status === 'HELD' || o.status === 'CANCELLED') continue;
      w = D[a - 1] * bigger(showTier(state, o), tier) * C.AHEAD.w;
      if (w > 0) out.push({ bands: o.bands || [], w: w });
    }
    return out;
  }

  /* SPEC?: not in 02-engine. What the interface may warn of before a date is chosen, from public numbers only (the
   * genre affinity anyone would assume, public tiers, shows the public knows about): a similar show the night before, and
   * a bigger similar show on one of the AHEAD.days.length nights after.
   * -> { before: [{ day, roomId, room }], after: [{ day, roomId, room }] } */
  function near(state, zoneId, bandIds, day) {
    var mine = [], tier = 0, out = { before: [], after: [] }, shows = state.shows || {}, others = state.otherShows || [], sid, s, i, o, a, b;
    (bandIds || []).forEach(function (id) {
      var bd = state.bands && state.bands[id];
      if (!bd) return;
      if (mine.indexOf(bd.genre) < 0) mine.push(bd.genre);
      if (typeof bd.tierPublic === 'number' && bd.tierPublic > tier) tier = bd.tierPublic;
    });
    function pubAff(fan, band) {
      var v = SB.Notebook && typeof SB.Notebook.pub === 'function' ? SB.Notebook.pub(state, 'aff:' + fan + ':' + band) : null;
      if (typeof v !== 'number') v = fan === band ? 1 : C.AFFINITY[E.GENRE_INDEX[fan]][E.GENRE_INDEX[band]];
      return typeof v === 'number' ? v : 0;
    }
    function similar(genres) {
      var j, k;
      for (j = 0; j < mine.length; j++) for (k = 0; k < genres.length; k++) {
        if (E.GENRE_INDEX[genres[k]] !== undefined && pubAff(mine[j], genres[k]) >= C.AHEAD.similar) return true;
      }
      return false;
    }
    function put(list, d, roomId) {
      var r = roomId && state.rooms && state.rooms[roomId];
      list.push({ day: d, roomId: roomId || null, room: r ? r.name : '' });
    }
    function check(d, roomId, genres, t, isPublic) {
      a = d - day;
      if (a === -1 && similar(genres)) put(out.before, d, roomId);
      else if (a >= 1 && a <= C.AHEAD.days.length && isPublic && bigger(t, tier) > 0 && similar(genres)) put(out.after, d, roomId);
    }
    if (!mine.length) return out;
    for (sid in shows) {
      s = shows[sid];
      if (s.status === 'CANCELLED' || s.status === 'DRAFT' || s.zoneId !== zoneId || !s.bill) continue;
      check(s.day, s.roomId, (s.bill.slots || []).map(function (sl) { b = state.bands && state.bands[sl.bandId]; return b ? b.genre : null; }).filter(Boolean),
            showTier(state, s), announced(s));
    }
    for (i = 0; i < others.length; i++) {
      o = others[i];
      if (o.zoneId !== zoneId || o.status === 'HELD' || o.status === 'CANCELLED') continue;
      check(o.day, o.roomId, (o.genres && o.genres.length ? o.genres : (o.bands || []).map(function (id) { b = state.bands && state.bands[id]; return b ? b.genre : null; }).filter(Boolean)),
            showTier(state, o), true);
    }
    out.before.sort(function (x, y) { return x.day - y.day; });
    out.after.sort(function (x, y) { return x.day - y.day; });
    return out;
  }

  /* tier (optional): the public tier of the show the load is for; with it, the forward part (aheadOf) is added */
  function load(state, zoneId, gen, genre, day, tier) {
    var z = zoneOf(state, zoneId, 'Crowd.load'), L = 0, feeder = z.kind === 'FEEDER' ? C.FEEDER_SHOW.burnout : 1;
    /* Called for every generation and genre of every forecast, so it reads only the shows inside the burn window
     * (a cheap day test first) and builds nothing for the rest. Same sum, same order as before. */
    function inWindow(d) { var ago = day - d; return ago > 0 && ago <= C.BURN_WINDOW; }
    function add(d, bandIds, own) {
      var ago = day - d;
      L += fitOf(state, bandIds, gen, genre) * (1 - ago / C.BURN_WINDOW) * (own ? C.BURN_OWN : 1) * feeder;
    }
    var shows = state.shows || {}, sid, s, others = state.otherShows || [], i, o;
    for (sid in shows) {
      s = shows[sid];
      if (!inWindow(s.day) || s.status === 'CANCELLED' || s.status === 'DRAFT' || s.zoneId !== zoneId || !s.bill) continue;
      add(s.day, (s.bill.slots || []).map(function (sl) { return sl.bandId; }), true);
    }
    for (i = 0; i < others.length; i++) {
      o = others[i];
      if (!inWindow(o.day) || o.zoneId !== zoneId || o.status === 'HELD' || o.status === 'CANCELLED') continue;
      add(o.day, o.bands || [], false);
    }
    var A = aheadOf(state, zoneId, day, tier);
    for (i = 0; i < A.length; i++) L += fitOf(state, A[i].bands, gen, genre) * A[i].w * feeder;
    return r3(L);
  }

  /* SPEC?: not in 02-engine 4.5. `load` for every generation and genre of one zone in a single pass over the shows:
   * loads(state, zoneId, day)[g][s] === load(state, zoneId, g, GENRES[s], day), same sums in the same order. A caller
   * that needs the whole table (Model's burnout, which today calls `load` 36 times per zone per forecast) reads it
   * here once instead of scanning every show 36 times. */
  function loads(state, zoneId, day, tier) {
    var z = zoneOf(state, zoneId, 'Crowd.loads'), feeder = z.kind === 'FEEDER' ? C.FEEDER_SHOW.burnout : 1, hits = [], A = aheadOf(state, zoneId, day, tier),
        shows = state.shows || {}, sid, s, others = state.otherShows || [], i, o, ago, g, k, L, out = [], memo = { G: {}, A: {} };
    function inWindow(d) { ago = day - d; return ago > 0 && ago <= C.BURN_WINDOW; }
    for (sid in shows) {
      s = shows[sid];
      if (!inWindow(s.day) || s.status === 'CANCELLED' || s.status === 'DRAFT' || s.zoneId !== zoneId || !s.bill) continue;
      hits.push({ bands: (s.bill.slots || []).map(function (sl) { return sl.bandId; }), ago: ago, own: true });
    }
    for (i = 0; i < others.length; i++) {
      o = others[i];
      if (!inWindow(o.day) || o.zoneId !== zoneId || o.status === 'HELD' || o.status === 'CANCELLED') continue;
      hits.push({ bands: o.bands || [], ago: ago, own: false });
    }
    for (g = 0; g < 3; g++) {
      out.push([]);
      for (k = 0; k < GENRES.length; k++) {
        L = 0;
        for (i = 0; i < hits.length; i++) {
          L += fitCached(state, hits[i].bands, g, GENRES[k], memo) * (1 - hits[i].ago / C.BURN_WINDOW) * (hits[i].own ? C.BURN_OWN : 1) * feeder;
        }
        for (i = 0; i < A.length; i++) L += fitCached(state, A[i].bands, g, GENRES[k], memo) * A[i].w * feeder;
        out[g].push(r3(L));
      }
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* faces, all-ages count                                               */
  /* ------------------------------------------------------------------ */

  /* SPEC?: the spec says six regulars have faces but not when each appears. One face shows for every ten
   * regulars, up to REGULAR_FACES, in the order WorldGen made them. */
  function updateFaces(state) {
    var R = state.regulars, want = Math.min(C.REGULAR_FACES, Math.floor((R.total || 0) / 10));
    if (!R.faces) R.faces = [];
    if (R.faces.length >= want) return;
    Object.keys(state.people || {}).forEach(function (pid) {
      var p = state.people[pid];
      if (R.faces.length >= want || p.roles.indexOf('REGULAR') < 0 || !p.regularType || p.state !== 'ACTIVE') return;
      if (R.faces.indexOf(pid) < 0) R.faces.push(pid);
    });
  }

  function countAllAges(state, id, day) {
    var T = state.truth;
    if (!T.allAgesDays) T.allAgesDays = [];
    if (T.allAgesDays.some(function (x) { return x.id === id; })) return;
    T.allAgesDays.push({ id: id, day: day });
    var y = SB.time.year(day);
    state.town.allAges[y] = (state.town.allAges[y] || 0) + 1;
  }

  /* ------------------------------------------------------------------ */
  /* after a show (7.20)                                                 */
  /* ------------------------------------------------------------------ */

  function afterShow(state, show, outcome, verdict) {
    if (!show) SB.fail('Crowd.afterShow', 'no show');
    outcome = outcome || {};
    var r = rc(state), P = packOf(state), R = state.regulars, wk = week(state), out = [];
    var demand = outcome.demand || (show.night && show.night.demand) || (show.result && show.result.demand) || null;
    var heads = outcome.heads || 0, dh = demand && demand.heads ? demand.heads : heads, scale = dh > 0 ? Math.min(1, heads / dh) : 1;
    var regCame = demand && demand.byReason && typeof demand.byReason.REGULAR === 'number' ? demand.byReason.REGULAR * scale : 0;
    var v = verdict || (show.result && show.result.verdict) || 'HELD';
    var sheet = !!(show.door && show.door.sheet);   // the player works the door, so the sheet is there when it is asked for
    var won = 0, lost = 0;

    /* new regulars, spread over the cells of those who came */
    var rate = (C.REG_WIN[v] || 0) * (sheet ? C.REG_WIN.sheet : 1) *
               Math.max(0, 1 - (R.total || 0) / (C.REG_CAP * (P.scene.size || 2400)));
    var fresh = Math.max(0, heads - regCame) * rate;
    if (fresh > 0) {
      var zones = Object.keys(state.zones), byCell = {}, tot = 0, cellsArr = demand && demand.cells;
      if (cellsArr && cellsArr.length) {
        zones.forEach(function (zid, zi) {
          var t = zeros(), any = false;
          for (var g = 0; g < 3; g++) for (var s = 0; s < 12; s++) {
            var h = cellsArr[zi * 36 + g * 12 + s] || 0;
            if (h > 0) { t[g][s] = h; tot += h; any = true; }
          }
          if (any) byCell[zid] = t;
        });
      } else if (outcome.byGen) {
        var t0 = zeros(), z = show.zoneId || 'city', bandG0 = (show.bill && show.bill.slots || []).map(function (sl) { return state.bands[sl.bandId]; }).filter(Boolean);
        outcome.byGen.forEach(function (h, g) {
          bandG0.forEach(function (b) { t0[g][E.GENRE_INDEX[b.genre]] += h / bandG0.length; tot += h / bandG0.length; });
        });
        byCell[z] = t0;
      }
      if (tot > 0) {
        Object.keys(byCell).forEach(function (zid) {
          byCell[zid] = byCell[zid].map(function (row) { return row.map(function (h) { return fresh * h / tot; }); });
        });
        won = addRegulars(state, byCell, 'SHOW');
      }
    }
    if (sheet && won > 0 && state.player) state.player.mailingList = Math.round((state.player.mailingList || 0) + won);

    /* losses */
    var regFrac = (R.total || 0) > 0 ? U.clamp(regCame / R.total, 0, 1) : 0;
    if (v === 'THIN' || v === 'ROUGH') {
      var forgiven = R.lastBadWeek === null || R.lastBadWeek === undefined || wk - R.lastBadWeek > C.REG_LOSS.forgiveWeeks;
      if (!forgiven) lost += loseRegulars(state, C.REG_LOSS[v] * regFrac, null, 'BAD_NIGHT');
      R.lastBadWeek = wk;
    }
    if (outcome.incidents && outcome.incidents.length) {
      lost += loseRegulars(state, r.range(C.REG_LOSS.incident[0], C.REG_LOSS.incident[1]) * regFrac, null, 'INCIDENT');
    }
    var comfortMid = (P.money && P.money.comfort && P.money.comfort[1]) || 10;
    if (show.door && !show.door.donation && show.door.price > comfortMid * C.REG_LOSS.pricey.over) {
      R.priceyRun = (R.priceyRun || 0) + 1;
      if (R.priceyRun >= C.REG_LOSS.pricey.shows) lost += loseRegulars(state, C.REG_LOSS.pricey.loss, null, 'PRICEY');
    } else R.priceyRun = 0;

    /* the record of genres, focus, all-ages */
    var gs = [];
    ((show.bill && show.bill.slots) || []).forEach(function (sl) {
      var b = state.bands[sl.bandId];
      if (b) gs.push(b.genre);
    });
    if (state.player) {
      state.player.recentGenres = (state.player.recentGenres || []).concat([gs]).slice(-C.FOCUS.shows);
      state.player.focus = computeFocus(state);
    }
    if (show.door && show.door.ages === 'ALL' && (show.zoneId || 'city') === 'city') countAllAges(state, show.id, show.day);
    updateFaces(state);
    recount(state);
    out.push(rec(state, 'REGULARS', { won: Math.round(won), lost: Math.round(lost), total: Math.round(R.total) }, show.id));
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* the weekly tick                                                     */
  /* ------------------------------------------------------------------ */

  function moveShare(pop, rate, weights) {
    var sw = U.sum(weights);
    if (sw <= 0) return;
    [0, 1, 2].forEach(function (g) {
      var gRate = g === 0 ? rate.kids : rate.other, moved = 0;
      pop[g] = pop[g].map(function (x) { var d = x * gRate; moved += d; return x - d; });
      pop[g] = pop[g].map(function (x, s) { return r2(x + moved * weights[s] / sw); });
    });
  }

  function turnover(table, arrive, newKids, kidShares) {
    var TO = C.TURNOVER, s, k2m, m2o, ms, os, midTotal = U.sum(table[1]);
    var midShares = table[1].map(function (x) { return midTotal > 0 ? x / midTotal : 1 / 12; });
    for (s = 0; s < 12; s++) {
      k2m = table[0][s] * TO.kidsToMiddle;
      m2o = table[1][s] * TO.middleToOld;
      ms = table[1][s] * TO.middleStop;
      os = table[2][s] * TO.oldStop;
      table[0][s] -= k2m;
      table[1][s] += k2m - m2o - ms;
      table[2][s] += m2o - os;
    }
    for (s = 0; s < 12; s++) {
      if (arrive) table[1][s] += midTotal * TO.middleArrive * midShares[s];
      if (newKids) table[0][s] += newKids * kidShares[s];
      table[0][s] = r2(Math.max(0, table[0][s])); table[1][s] = r2(Math.max(0, table[1][s])); table[2][s] = r2(Math.max(0, table[2][s]));
    }
  }

  function yearly(state, r, P) {
    var T = state.truth, from = today(state) + 7 - 364;
    T.allAgesDays = (T.allAgesDays || []).filter(function (x) { return x.day >= from; });
    var allAges = T.allAgesDays.length;
    var intakeMul = U.clamp(allAges / C.ALLAGES_REF, C.KID_INTAKE_CLAMP[0], C.KID_INTAKE_CLAMP[1]);
    var citySize = Math.max(1, P.scene.size);
    var heatW = GENRES.map(function (g) { return Math.exp(((T.heat && T.heat[g]) || 0)); });
    var hs = U.sum(heatW);
    Object.keys(state.zones).forEach(function (zid) {
      var z = state.zones[zid], kids = U.sum(z.pop[0]), zsize = 0;
      z.pop.forEach(function (row) { zsize += U.sum(row); });
      var kidShares = z.pop[0].map(function (x, s) { return 0.5 * (kids > 0 ? x / kids : 1 / 12) + 0.5 * heatW[s] / hs; });
      var newKids = P.scene.kidIntake * intakeMul * (zid === 'city' ? 1 : zsize / citySize);
      turnover(z.pop, true, newKids, kidShares);
    });
    Object.keys(state.regulars.by).forEach(function (zid) { turnover(state.regulars.by[zid], false, 0, null); });
    recount(state);
    state.town.kidsLine.push({ year: SB.time.year(today(state) + 7), kids: Math.round(U.sum(state.zones.city ? state.zones.city.pop[0] : [0])) });
  }

  function weekly(state) {
    if (!state.truth || !state.regulars) SB.fail('Crowd.weekly', 'state has no truth or regulars (WorldGen.build first)');
    var out = [], r = rc(state), P = packOf(state), R = state.regulars, wk = week(state), next = wk + 1, lost = 0;

    /* idle loss of regulars */
    var idle = weeksIdle(state);
    if (idle !== null && idle > C.REG_LOSS.idleAfterWeeks && R.total > 0) lost += loseRegulars(state, C.REG_LOSS.idlePerWeek, null, 'IDLE');

    /* other bookers' all-ages shows in town count toward the kids coming up */
    (state.otherShows || []).forEach(function (o) {
      if (o.ages === 'ALL' && o.zoneId === 'city' && (o.status === 'PLAYED' || o.day < next * 7) && o.status !== 'HELD') countAllAges(state, o.id, o.day);
    });

    /* weather for the coming week and FORECAST_DAYS past it.
     * SPEC?: weather is drawn FORECAST_DAYS ahead but Crowd only ticks weekly, so the truth and the forecast are
     * written for the whole coming week plus FORECAST_DAYS; Week.view decides how far ahead to show it. */
    var from = next * 7;
    if (SB.WorldGen && SB.WorldGen.weather) SB.WorldGen.weather(state, P, from, from + 7 + C.WEATHER.FORECAST_DAYS, r);
    var keep = from - 14;
    Object.keys(state.truth.weather).forEach(function (d) { if (Number(d) < keep) delete state.truth.weather[d]; });
    Object.keys(state.town.forecast).forEach(function (d) { if (Number(d) < keep) delete state.town.forecast[d]; });

    /* save quirks dissolve and form */
    var Q = state.truth.quirks || [];
    for (var i = 0; i < Q.length; i++) {
      if (Q[i].ends <= next && SB.WorldGen && SB.WorldGen.quirk) {
        Q[i] = SB.WorldGen.quirk(state, r, next, C.QUIRK_LIFE_WEEKS * C.QUIRK_COUNT * r.range(0.75, 1.25));
      }
    }

    /* each quarter, the cells drift toward what is hot */
    if (next % 13 === 0) {
      var w = GENRES.map(function (g) { return Math.max(0, (state.truth.heat && state.truth.heat[g]) || 0); });
      Object.keys(state.zones).forEach(function (zid) {
        moveShare(state.zones[zid].pop, { kids: C.GENRE_DRIFT.kids, other: C.GENRE_DRIFT.perQuarter }, w);
      });
    }

    /* each year the generations turn over */
    if (next % 52 === 0) yearly(state, r, P);

    /* monthly line of regulars */
    if (SB.time.billsDue(wk)) R.line = (R.line || []).concat([{ week: next, total: Math.round(R.total || 0) }]);
    updateFaces(state);
    if (lost >= 0.5) {
      out.push(rec(state, 'REGULARS', { won: 0, lost: Math.round(lost), total: Math.round(R.total) }));
    }
    return out;
  }

  return {
    cells: cells, regulars: regulars, addRegulars: addRegulars, loseRegulars: loseRegulars, load: load, loads: loads,
    showTier: showTier, bigger: bigger, near: near,
    focus: focus, afterShow: afterShow, weekly: weekly
  };
});
