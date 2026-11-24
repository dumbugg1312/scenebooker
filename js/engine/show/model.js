/* Scene Booker — engine/show/model.js (role E2). SB.Model: the formula of 02-engine 7.1 to 7.7.
 *
 * Who comes to a show, how full each set is and what the night scores. Pure: it reads the state and a Lens and writes
 * nothing, except that a run with lens.luck and no stored draws advances the show's own stream ('show:' + id).
 *
 * Every hidden number is read through lens.get(key) (keys: SB.Enums.HID). Besides the four override keys the contract
 * names (promo, followers, invites, stale), lens.over may carry these, which SB.Forecast.ablate sets for the reference
 * runs of 7.9 and SB.Night.resolveOther for other bookers' shows:
 *   address 'ASK'|'FULL'   noSteal   noCalendar   noOwnLoad   fresh1   trend1   noRegulars   roomRep1   run1   noClock
 *   noLate   noIncidents   rules   gear   agesAll   dow (0..6)   soundSkill (0..1)   peakFill (0..1)   sameGenre
 *   sameProfile   sharesUsual   compsDefault   noLeak   noGuard   luckDraws ([draw])
 * lens.prepDone (the PAR lens) treats every night-side preparation as done. lens.lite leaves `cells` out of the Demand.
 *
 * Extras exported beside the manifest: luck(state, show) draws a show's luck; times(show) gives the set times.
 */
SB.module('Model', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, CH = C.CHANNELS, GENRES = E.GENRES, GI = E.GENRE_INDEX;
  var NONE = {}, EMPTY = [], MAXB = 6, WEATHER_KIND = { RAIN: 1, HEAT: 1, COLD: 1 };
  var KEY_AFF = GENRES.map(function (a) { return GENRES.map(function (b) { return 'aff:' + a + ':' + b; }); });

  function num(v, d) { return (typeof v === 'number' && v === v && v !== Infinity && v !== -Infinity) ? v : d; }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function r2(x) { return Math.round(x * 100) / 100; }
  function r4(x) { return Math.round(x * 10000) / 10000; }
  /* 7.0 rule 1: a lead never sees negative days. */
  function lead(d, tau) { return (d > 0 && tau > 0) ? 1 - Math.exp(-Math.pow(d / tau, C.LEAD_EXP)) : 0; }
  function grow(a, n) { return a.length >= n ? a : new Float64Array(n); }
  function fill(a, n, v) { for (var i = 0; i < n; i++) a[i] = v; }

  /* ---------------- 7.1 affinity ---------------- */

  function genTilt(pack, fi, bi, g) {
    var t = pack.tilt, i, e, d = 0;
    if (!t || !t.length) return 0;
    for (i = 0; i < t.length; i++) {
      e = t[i];
      if (typeof e.gen === 'number' && e.gen === g && GI[e.fan] === fi && GI[e.band] === bi) d += e.d;
    }
    return d;
  }

  function affI(pack, fi, bi, g, lens) {
    if (fi === bi) return 1;
    return clamp(num(lens.get(KEY_AFF[fi][bi]), C.AFFINITY[fi][bi]) + genTilt(pack, fi, bi, g), 0, 1.2);
  }

  function affBand(pack, fi, gi, g2, g, lens) {
    var a = affI(pack, fi, gi, g, lens);
    if (g2 >= 0 && g2 !== gi) a = (1 - C.SECOND_GENRE) * a + C.SECOND_GENRE * affI(pack, fi, g2, g, lens);
    return a;
  }

  function affinity(state, fanGenre, bandGenre, gen, lens) {
    var fi = GI[fanGenre], bi = GI[bandGenre];
    if (fi === undefined || bi === undefined) SB.fail('Model.affinity', 'unknown genre "' + (fi === undefined ? fanGenre : bandGenre) + '"');
    if (!lens || typeof lens.get !== 'function') SB.fail('Model.affinity', 'a lens is needed');
    return affI(SB.Cities.pack(state), fi, bi, gen || 0, lens);
  }

  /* ---------------- 7.2 a band's generation profile ---------------- */

  function byNumber(a, b) { return a - b; }

  function ageProfile(state, band, day) {
    var m = band.members, ages = [], i, p, y = SB.time.year(day), med, k;
    if (m) for (i = 0; i < m.length; i++) {
      p = state.people && state.people[m[i].personId];
      if (p && typeof p.born === 'number') ages.push(y - p.born);
    }
    if (!ages.length) return C.GEN_PROFILE.MIDDLE;
    ages.sort(byNumber); k = ages.length;
    med = k % 2 ? ages[(k - 1) / 2] : (ages[k / 2 - 1] + ages[k / 2]) / 2;
    return med < C.KIDS_BAND_AGE ? C.GEN_PROFILE.KIDS : (med >= C.OLD_BAND_AGE ? C.GEN_PROFILE.OLD : C.GEN_PROFILE.MIDDLE);
  }

  function genInto(out, at, state, band, lens, day) {
    var prof = ageProfile(state, band, day), ev = C.GEN_PROFILE.EVERYONE, g;
    var x = clamp(num(lens.get('cross:' + band.id), 0.3), 0, 1);
    for (g = 0; g < 3; g++) out[at + g] = (1 - x) * prof[g] + x * ev[g];
    var years = Math.max(0, SB.time.year(day) - num(band.formedYear, SB.time.year(day)));
    out[at + 2] = Math.min(1, out[at + 2] + C.OLD_BONUS_PER_4_YEARS * Math.floor(years / 4));
  }

  function bandGen(state, band, lens) {
    if (!band || !band.id) SB.fail('Model.bandGen', 'a band is needed');
    var out = [0, 0, 0];
    genInto(out, 0, state, band, lens, (state.clock && state.clock.day) || 0);
    return out;
  }

  function tierOf(d, scale) {
    var n = 0, i;
    for (i = 0; i < C.TIERS.length; i++) if (d >= C.TIERS[i] * scale) n++;
    return n;
  }

  /* ---------------- a bill, prepared for the cell loops ---------------- */

  function Bill() {
    this.n = 0; this.band = []; this.local = []; this.gi = []; this.g2 = []; this.home = []; this.fresh = []; this.tier = []; this.pd = [];
    this.G = new Float64Array(MAXB * 3); this.AG = new Float64Array(MAXB * 36); this.pk = new Float64Array(0);
  }
  var B0 = new Bill(), B1 = new Bill();

  /* The one working context. Model functions do not re-enter each other. */
  var X = { state: null, show: null, lens: null, o: NONE, mods: NONE, pack: null, room: null, zids: EMPTY, nz: 0, showZ: 0, cityZ: 0,
            dow: 0, top: 0, topTier: 0, ztot: new Float64Array(0), promo: NONE, address: null, asOf: Infinity };

  function fillBill(B, state, pack, lens, day, zids, ztot, showZ, cityZ, o, top) {
    var n = B.n, nz = zids.length, i, g, s, z, band, gi, g2, f, heat, Dc, D, Zb, pop, row, a, t;
    B.pk = grow(B.pk, n * nz * 3);
    for (i = 0; i < n; i++) {
      band = B.band[i];
      if (band) {
        B.gi[i] = num(GI[band.genre], 0);
        B.g2[i] = band.genre2 && GI[band.genre2] !== undefined ? GI[band.genre2] : -1;
        genInto(B.G, i * 3, state, band, lens, day);
        B.home[i] = band.zoneId ? zids.indexOf(band.zoneId) : -1;
      } else {                               // a stand-in for a show known only by its genres
        B.g2[i] = -1; B.home[i] = -1;
        for (g = 0; g < 3; g++) B.G[i * 3 + g] = 0.7 * C.GEN_PROFILE.MIDDLE[g] + 0.3 * C.GEN_PROFILE.EVERYONE[g];
      }
    }
    if (n && top >= 0 && (o.sameGenre || o.sameProfile)) {
      for (i = 0; i < n; i++) {
        if (i === top || !B.local[i]) continue;
        if (o.sameGenre) { B.gi[i] = B.gi[top]; B.g2[i] = B.g2[top]; }
        if (o.sameProfile) for (g = 0; g < 3; g++) B.G[i * 3 + g] = B.G[top * 3 + g];
      }
    }
    for (i = 0; i < n; i++) {
      band = B.band[i]; gi = B.gi[i]; g2 = B.g2[i];
      for (g = 0; g < 3; g++) {
        a = B.G[i * 3 + g];
        for (s = 0; s < 12; s++) B.AG[i * 36 + g * 12 + s] = affBand(pack, s, gi, g2, g, lens) * a;
      }
      f = 1;
      if (band && !o.fresh1 && SB.Bands && typeof SB.Bands.fresh === 'function') f = clamp(num(SB.Bands.fresh(state, band, day), 1), 0, 1);
      B.fresh[i] = f;
      heat = o.trend1 ? 0 : clamp(num(lens.get('heat:' + GENRES[gi]), 0), -1, 1);
      Dc = band ? Math.max(0, num(lens.get('draw:' + band.id + ':city'), 0)) : B.pd[i];
      for (z = 0; z < nz; z++) {
        if (z === cityZ) D = Dc;
        else if (band && B.home[i] === z) D = Math.max(0, num(lens.get('draw:' + band.id + ':' + zids[z]), Dc * (ztot[z] / Math.max(1, ztot[cityZ]))));
        else D = Dc * (ztot[z] / Math.max(1, ztot[cityZ])) * (B.local[i] ? 0.5 : 1);
        if (z === showZ) B.tier[i] = tierOf(D, Math.max(1, ztot[z]) / C.POOL.perSceneRef);
        pop = state.zones[zids[z]].pop; Zb = 0;
        for (g = 0; g < 3; g++) { row = pop[g]; t = i * 36 + g * 12; for (s = 0; s < 12; s++) Zb += row[s] * B.AG[t + s]; }
        if (Zb < 1) Zb = 1;                  // 7.0 rule 2
        for (g = 0; g < 3; g++) B.pk[(i * nz + z) * 3 + g] = D * f * (1 + C.TREND_AMP * heat * C.TREND_SENS[g]) / Zb;
      }
    }
  }

  function topIndex(show, B) {
    var billing = show.bill.billing, slots = show.bill.slots, i, best = -1, bt = -1, t;
    if (billing && billing.length) for (i = 0; i < B.n; i++) if (slots[i].bandId === billing[0]) return i;
    for (i = 0; i < B.n; i++) if (!B.local[i]) return i;
    for (i = 0; i < B.n; i++) { t = num(B.band[i].tierPublic, 0); if (t > bt) { bt = t; best = i; } }
    return best;
  }

  function promoOf(state, show, lens) {
    var o = lens.over || NONE;
    if (o.promo && typeof o.promo === 'object') return o.promo;
    if (lens.promo === 'USUAL') {
      if (lens._usualFor !== show || lens._usualDay !== show.day) {
        lens._usual = SB.Forecast.usual(state, show) || NONE; lens._usualFor = show; lens._usualDay = show.day;
      }
      return lens._usual;
    }
    return show.promo || NONE;
  }

  function setup(state, show, lens, mods, where) {
    if (!show || !show.bill) SB.fail(where, 'a show with a bill is needed');
    if (!lens || typeof lens.get !== 'function') SB.fail(where, 'a lens is needed');
    var room = state.rooms && state.rooms[show.roomId];
    if (!room) SB.fail(where, 'show "' + show.id + '" has no room');
    var pack = SB.Cities.pack(state), zids = Object.keys(state.zones), nz = zids.length, o = lens.over || NONE;
    var slots = show.bill.slots || EMPTY, i, z, g, s, t, pop, band;
    if (!nz) SB.fail(where, 'the state has no zones');
    X.state = state; X.show = show; X.lens = lens; X.o = o; X.mods = mods || show.mods || NONE; X.pack = pack; X.room = room;
    X.zids = zids; X.nz = nz;
    X.cityZ = Math.max(0, zids.indexOf('city'));
    X.showZ = zids.indexOf(show.zoneId || room.zoneId); if (X.showZ < 0) X.showZ = X.cityZ;
    X.dow = typeof o.dow === 'number' ? o.dow : SB.time.dow(show.day);
    X.ztot = grow(X.ztot, nz);
    for (z = 0; z < nz; z++) {
      pop = state.zones[zids[z]].pop; t = 0;
      for (g = 0; g < 3; g++) for (s = 0; s < 12; s++) t += pop[g][s];
      X.ztot[z] = t;
    }
    B0.n = Math.min(slots.length, MAXB);
    for (i = 0; i < B0.n; i++) {
      band = state.bands && state.bands[slots[i].bandId];
      if (!band) SB.fail(where, 'unknown band "' + slots[i].bandId + '" on show "' + show.id + '"');
      B0.band[i] = band; B0.local[i] = slots[i].role ? slots[i].role !== 'TOURING' : !!band.local;
    }
    X.top = topIndex(show, B0);
    fillBill(B0, state, pack, lens, show.day, zids, X.ztot, X.showZ, X.cityZ, o, X.top);
    X.topTier = 0;
    for (i = 0; i < B0.n; i++) if (B0.tier[i] > X.topTier) X.topTier = B0.tier[i];
    X.promo = promoOf(state, show, lens);
    X.address = o.address || ((lens.promo === 'USUAL' || (o.promo && typeof o.promo === 'object' && lens.promo === 'USUAL'))
      ? C.USUAL.address : ((show.door && show.door.address) || C.USUAL.address));
    X.asOf = Infinity;
  }

  /* ---------------- 7.5 reach ---------------- */

  var rRaw = new Float64Array(3), rReach = new Float64Array(3), rBase = new Float64Array(3), rTau = new Float64Array(3),
      rClose = new Float64Array(MAXB * 3), rBand = new Float64Array(MAXB * 3), rBandRaw = new Float64Array(MAXB * 3),
      rZone = new Float64Array(0), rZraw = new Float64Array(0), rRoute = new Float64Array(0), rAddr = new Float64Array(3);

  function done(day) { return typeof day === 'number' && day <= X.asOf; }

  function term(g, ceil, ld, by, name) {
    var t = clamp(ceil * ld, 0, 0.98);
    rBase[g] *= 1 - t;
    if (by) { if (!by[name]) by[name] = [0, 0, 0]; by[name][g] = r4(1 - (1 - by[name][g]) * (1 - t)); }
  }

  function shareP(show, i, lens) {
    var slot = show.bill.slots[i], band = B0.band[i], o = X.o;
    var pay = B0.local[i] ? (slot.pay || 'FREE') : ((show.deal && show.deal.shape) || 'DOOR');
    var rate = CH.SHARE_DEAL[CH.SHARE_KEY[pay]];
    var p = o.sharesUsual ? C.PAR.promotes : clamp(num(lens.get('promo:' + band.id), C.PAR.promotes), 0, 1);
    return Math.min(1, p * num(rate, 1));
  }

  function computeReach(by) {
    var state = X.state, show = X.show, lens = X.lens, o = X.o, pack = X.pack, room = X.room, p = X.promo, nz = X.nz, zids = X.zids;
    var day = show.day, usual = lens.promo === 'USUAL', stale = o.stale !== false, g, i, z, k, r, t, rt, zi, ld, ceil, d, q;
    var followers = typeof o.followers === 'number' ? o.followers : num(state.player && state.player.followers, 0);
    var ask = CH.ADDRESS.kinds.indexOf(room.kind) >= 0 && X.address === 'ASK';
    var annOn = done(p.announce), flyerOn = !!(p.flyer && done(p.flyer.day)), quality = flyerOn ? num(p.flyer.quality, 1) : 0;
    var dAnn = annOn ? day - p.announce : 0, dFly = flyerOn && annOn ? day - Math.max(p.announce, p.flyer.day) : 0;
    var nameK = CH.NAME_REACH.base + CH.NAME_REACH.span * Math.min(1, Math.max(0, followers) / CH.NAME_REACH.followers);
    var focus = state.player && state.player.focus, topGenre = B0.n ? GENRES[B0.gi[X.top]] : null;
    var spec = focus && focus.kind === 'SPECIALIST' && topGenre && focus.genres && focus.genres.indexOf(topGenre) >= 0 ? CH.ANNOUNCE_SPECIALIST : 1;
    var hot = topGenre && !o.trend1 && num(lens.get('heat:' + topGenre), 0) > 0.4;
    var tags = show.tags || EMPTY, ex = CH.EXCITE;
    var excite = clamp(ex.base + ex.perTier * X.topTier + (hot ? ex.hot : 0) + (show.label === 'BIG' ? ex.big : 0) +
                       (tags.indexOf('BACK_FROM_TOUR') >= 0 ? ex.backFromTour : 0), ex.min, ex.max);
    var tauK = num(C.ROOM_TAU[room.kind], 1) * num(pack.scene.roomTau, 1) * (state.settings && state.settings.windows === 'FORGIVING' ? C.FORGIVING_TAU : 1);
    var runs = p.runs || NONE, routes = pack.derived.routeById, rk = Object.keys(runs), ad = p.ad, paid = p.paid, shares = p.shares || NONE;
    var listed = done(p.listings) && day - p.listings >= CH.LISTING_DEADLINE;
    var adOn = ad && CH.LOCAL_AD[ad.kind] && done(ad.day) && day - ad.day >= CH.LOCAL_AD[ad.kind].deadline;
    var paidOn = paid && CH.PAID_PUSH[paid.level] && done(paid.day);
    var week = SB.time.week(day), share = p.contactShare || NONE, zone, f, raw, closeLead;
    function m(ch, gg) { return usual ? 1 : Math.max(0, num(lens.get('chan:' + ch + ':' + gg), 1)); }

    rZone = grow(rZone, nz * 3); rZraw = grow(rZraw, nz * 3); rRoute = grow(rRoute, nz * 3); fill(rRoute, nz * 3, 1);
    for (g = 0; g < 3; g++) {
      rBase[g] = 1; rTau[g] = C.TAU[g] * tauK; rAddr[g] = ask ? CH.ADDRESS.askCeil[g] : 1;
      if (annOn) {
        ceil = CH.ANNOUNCE_CEIL[g] * nameK * spec;
        term(g, ceil * m('ANNOUNCE', g), Math.max(CH.ANNOUNCE_NO_FLYER * lead(dAnn, rTau[g]), lead(dFly, rTau[g])), by, 'ANNOUNCE');
        term(g, CH.WOM_MAX[g] * excite * m('WOM', g), 1 - Math.exp(-Math.max(0, dAnn) / CH.WOM_T), by, 'WOM');
      }
      if (paidOn) term(g, CH.ANNOUNCE_CEIL[g] * nameK * spec * m('ANNOUNCE', g) * CH.PAID_PUSH[paid.level].x * CH.PAID_PUSH.gen[g],
                       lead(day - paid.day, rTau[g] * CH.PAID_PUSH.tau), by, 'PAID');
      if (listed || adOn) term(g, ((listed ? CH.LISTING_CEIL[g] * rAddr[g] : 0) + (adOn ? CH.LOCAL_AD[ad.kind].ceil[g] : 0)) * m('LISTINGS', g), 1, by, 'LISTINGS');
      if (p.roomPosted) term(g, CH.ROOM_CEIL[g] * num(room.following, 0) * m('ROOM', g), 1, by, 'ROOM');
    }
    /* each band sharing the flyer, and what its close fans hear from it */
    for (i = 0; i < B0.n; i++) {
      d = shares[B0.band[i].id]; q = flyerOn && done(d) ? shareP(show, i, lens) : 0;
      closeLead = q > 0 ? lead(day - d, CH.SHARE_TAU) : 0;
      for (g = 0; g < 3; g++) {
        rClose[i * 3 + g] = CH.CLOSE * CH.CLOSE_K * q * closeLead;
        if (q > 0) term(g, CH.SHARE_CEIL[g] * q * (B0.local[i] ? 1 : 0.3) * m('SHARE', g), closeLead, by, 'SHARE:' + B0.band[i].id);
      }
    }
    /* flyer runs: each route counts in full for its own zone */
    for (k = 0; k < rk.length; k++) {
      r = runs[rk[k]]; rt = routes[rk[k]];
      if (!r || !rt || !flyerOn || !done(r.day)) continue;
      zi = zids.indexOf(rt.zone || 'city'); if (zi < 0) continue;
      d = day - (done(r.again) ? Math.max(r.again, r.day) : r.day);
      for (g = 0; g < 3; g++) {
        ld = lead(day - r.day, rTau[g] * CH.FLYER_TAU_FACTOR) *
             (stale ? Math.max(CH.FLYER_STALE.floor, 1 - CH.FLYER_STALE.perWeek * Math.max(0, d - CH.FLYER_STALE.after) / 7) : 1);
        t = clamp(rt.ceil[g] * quality * num(r.effect, 1) * rAddr[g] * m('RUN:' + rk[k], g) * ld, 0, 0.98);
        rRoute[zi * 3 + g] *= 1 - t;
        if (by && zi === X.showZ) by['RUN:' + rk[k]] = by['RUN:' + rk[k]] || [0, 0, 0];
        if (by && zi === X.showZ) by['RUN:' + rk[k]][g] = r4(t);
      }
    }
    f = (done(p.push) ? 1 : CH.NO_PUSH * (stale && annOn && dAnn > CH.ANNOUNCE_STALE ? CH.NO_PUSH : 1)) * (p.dayOf ? 1 : CH.NO_DAY_OF) *
        Math.max(0, num(X.mods.reachMul, 1));
    for (g = 0; g < 3; g++) {
      raw = clamp((1 - rBase[g] * rRoute[X.showZ * 3 + g]) * f, 0, 1);
      rRaw[g] = raw; rReach[g] = Math.min(CH.REACH_CAP, raw / CH.REACH_REF);
      for (i = 0; i < B0.n; i++) {
        rBandRaw[i * 3 + g] = raw + (1 - raw) * rClose[i * 3 + g];
        rBand[i * 3 + g] = Math.min(CH.REACH_CAP, rBandRaw[i * 3 + g] / CH.REACH_REF);
      }
      for (z = 0; z < nz; z++) {
        if (z === X.showZ) { rZraw[z * 3 + g] = raw; rZone[z * 3 + g] = rReach[g]; continue; }
        zone = state.zones[zids[z]];
        k = share[zids[z]] ? 1 : Math.min(1, CH.OUT_OF_TOWN_REACH * (typeof zone.tourBoostUntil === 'number' && zone.tourBoostUntil >= week ? CH.TOUR_REACH : 1));
        t = 1 - (1 - k * raw) * rRoute[z * 3 + g];
        rZraw[z * 3 + g] = t; rZone[z * 3 + g] = Math.min(CH.REACH_CAP, t / CH.REACH_REF);
      }
    }
  }

  function reach(state, show, lens, asOfDay) {
    setup(state, show, lens, null, 'Model.reach');
    if (typeof asOfDay === 'number') X.asOf = asOfDay;
    var by = {}, per = {}, i;
    computeReach(by);
    for (i = 0; i < B0.n; i++) per[B0.band[i].id] = [r4(rBand[i * 3]), r4(rBand[i * 3 + 1]), r4(rBand[i * 3 + 2])];
    return { raw: [r4(rRaw[0]), r4(rRaw[1]), r4(rRaw[2])], reach: [r4(rReach[0]), r4(rReach[1]), r4(rReach[2])], byChannel: by, perBand: per };
  }

  /* ---------------- 7.6 can ---------------- */

  var canG = new Float64Array(3), nightG = new Float64Array(3), roomG = new Float64Array(3), dist = new Float64Array(0),
      dEx = new Float64Array(0), bBoost = new Float64Array(0), lm = new Float64Array(0), zMin = new Float64Array(0);

  /* Drive minutes between two zones of the pack. SPEC?: the pack gives minutes from downtown only; between two towns the
   * model takes the straight line from their bearings (02-engine 7.6 says "minutes(z, show zone)" and no more). */
  function minutesBetween(state, pack, a, b) {
    if (a === b) return 0;
    var za = state.zones[a], zb = state.zones[b], ma = num(za && za.minutes, 0), mb = num(zb && zb.minutes, 0), pa, pb, d;
    if (!ma) return mb;
    if (!mb) return ma;
    pa = pack.derived.zoneById[a]; pb = pack.derived.zoneById[b];
    d = ((pa ? num(pa.bearing, 0) : 0) - (pb ? num(pb.bearing, 0) : 0)) * Math.PI / 180;
    return Math.sqrt(Math.max(0, ma * ma + mb * mb - 2 * ma * mb * Math.cos(d)));
  }

  function calendarFactor(g) {
    var pack = X.pack, room = X.room, cal = pack.calendar || EMPTY, dt = SB.time.date(X.show.day), wom = Math.floor((dt.d - 1) / 7) + 1, f = 1, i, e, on;
    if (X.o.noCalendar) return 1;
    for (i = 0; i < cal.length; i++) {
      e = cal[i];
      on = (e.month === dt.m || (e.months && e.months.indexOf(dt.m) >= 0)) &&
           (typeof e.week === 'number' ? e.week === wom : (e.weeks ? wom >= e.weeks[0] && wom <= e.weeks[1] : true)) &&
           (!e.dows || e.dows.indexOf(dt.dow) >= 0);
      if (!on) continue;
      if (e.hoods && e.hoods.length && e.hoods.indexOf(room.hood) < 0) f *= e.elsewhere ? num(e.elsewhere[g], 1) : 1;
      else f *= e.can ? num(e.can[g], 1) : 1;
    }
    if (dt.dow === 4 && dt.d <= 7) f *= C.PAYDAY.firstFriday;
    if (SB.time.date(X.show.day + 7).m !== dt.m) f *= C.PAYDAY.lastWeek;
    return f;
  }

  function priceFactor(g) {
    var door = X.show.door || NONE, P = C.PRICE, W = P.WORTH, x, worth, price = num(door.price, 0);
    if (door.donation || price <= 0) return 1;
    worth = clamp(W.base + W.perBand * B0.n + W.perTier * X.topTier, W.min, W.max);
    x = price / (Math.max(0.5, num(X.lens.get('price:' + g), X.pack.money.comfort[g])) * worth);
    if (x <= P.FLAT_TO) return 1;
    if (x <= P.STEEP_FROM) return 1 - P.SLOPE * (x - P.FLAT_TO);
    return Math.max(P.FLOOR, P.STEEP_AT - P.STEEP_SLOPE * (x - P.STEEP_FROM));
  }

  function computeCan() {
    var state = X.state, show = X.show, lens = X.lens, o = X.o, pack = X.pack, room = X.room, nz = X.nz, zids = X.zids, dow = X.dow;
    var kind = room.kind, ages = o.agesAll ? 'ALL' : ((show.door && show.door.ages) || (room.ages && room.ages[0]) || 'ALL');
    var table = C.ROOM_GEN[kind] || C.ROOM_GEN.HALL, row = table[ages] || (o.agesAll ? C.ROOM_GEN.HALL.ALL : table.ALL) || C.ROOM_GEN.HALL.ALL;
    var month = SB.time.month(show.day), standing = room.standing || EMPTY, g, z, i, v, rep, mins, ex, boost, zm, stops, wk, k, home, zname;
    var rulesOn = o.rules || lens.prepDone || (show.prep && show.prep.rules);
    for (g = 0; g < 3; g++) {
      v = Math.max(0, num(lens.get('night:' + g + ':' + dow), pack.night[g][dow]));
      if (g === 0 && dow <= 3 && C.SUMMER_KIDS.months.indexOf(month) >= 0) v = Math.max(v, Math.min(C.SUMMER_KIDS.cap, v * C.SUMMER_KIDS.weeknight));
      if (show.slot === 'MATINEE' && dow === 6 && C.MATINEE[g] !== null) v = C.MATINEE[g];
      nightG[g] = v;
      v = row[g];
      if (!table[ages] && !o.agesAll && g === 0) v *= ages === 'A21' ? 0 : (ages === 'A18' ? 0.45 : 1);
      roomG[g] = v > 0 ? Math.max(0, v + num(lens.get('roomgen:' + room.id + ':' + g), 0)) : 0;
      rep = 1;
      if (!o.roomRep1) {
        rep = C.ROOM_REP.base + C.ROOM_REP.span * clamp(num(standing[g], 60), 0, 100) / 100;
        if (g === 0 && num(standing[0], 60) < C.ROOM_REP.kidsParentsUnder) rep *= C.ROOM_REP.kidsParents;
      }
      canG[g] = nightG[g] * roomG[g] * priceFactor(g) * calendarFactor(g) * rep * (rulesOn ? C.HOUSE_RULES_TURNOUT : 1);
    }
    /* distance, and the boosts that belong to one reason for coming */
    dist = grow(dist, nz * 3); dEx = grow(dEx, nz * 3); bBoost = grow(bBoost, MAXB * nz * 3); zMin = grow(zMin, nz);
    fill(bBoost, MAXB * nz * 3, 1);
    boost = ((dow === 4 || dow === 5) ? C.DRIVE_BOOST.weekend : 1) * (X.topTier >= 3 ? C.DRIVE_BOOST.tier3 : 1);
    stops = null;
    if (show.requestId && state.requests && state.requests[show.requestId] && state.requests[show.requestId].route) stops = state.requests[show.requestId].route.stops;
    wk = SB.time.week(show.day);
    for (z = 0; z < nz; z++) {
      if (z === X.showZ) { for (g = 0; g < 3; g++) { dist[z * 3 + g] = 1; dEx[z * 3 + g] = 0; } zMin[z] = 0; continue; }
      mins = minutesBetween(state, pack, zids[z], zids[X.showZ]); zMin[z] = mins;
      zm = Math.max(0.05, num(lens.get('zone:' + zids[z]), 1));
      home = false; zname = state.zones[zids[z]].name;
      if (stops) for (k = 0; k < stops.length; k++) if (stops[k].name === zname && SB.time.week(stops[k].day) === wk && stops[k].day !== show.day) home = true;
      for (g = 0; g < 3; g++) {
        ex = mins / (C.DRIVE_TAU[g] * zm * boost);
        dEx[z * 3 + g] = ex; dist[z * 3 + g] = Math.exp(-ex);
        for (i = 0; i < B0.n; i++) {
          if (B0.home[i] === z) bBoost[(i * nz + z) * 3 + g] = Math.exp(ex * (1 - 1 / C.DRIVE_BOOST.hometownBand));
          else if (!B0.local[i] && home) bBoost[(i * nz + z) * 3 + g] = Math.exp(ex * (1 - 1 / C.DRIVE_BOOST.tourPlaysThem));
        }
      }
    }
  }

  /* ---------------- terms of Want for one cell ---------------- */

  var T = new Float64Array(MAXB + 1), lp = new Float64Array(MAXB), lt = new Float64Array(MAXB), li = new Int32Array(MAXB);
  var tSum = 0, tFit = 0;

  /* Fills T (one term per band, in bill order), tSum and tFit; returns the product of (1 - term) over the bands.
   * full: use the reach of the show being resolved; otherwise reach is 1 (a competing show, 7.6). */
  function cellTerms(B, z, g, gs, nz, stack, full, inZone) {
    var n = B.n, i, j, k, pull, a, t, prod = 1, nl = 0, w, x, y, q;
    tSum = 0; tFit = 0;
    for (i = 0; i < n; i++) {
      a = B.AG[i * 36 + gs]; if (a > tFit) tFit = a;
      pull = B.pk[(i * nz + z) * 3 + g] * a;
      pull = pull > C.PULL_CAP ? C.PULL_CAP : (pull > 0 ? pull : 0);
      if (!full) t = pull;
      else if (inZone || B.home[i] === z) t = pull * rBand[i * 3 + g];
      else t = pull * Math.min(CH.REACH_CAP, (rZraw[z * 3 + g] + (1 - rZraw[z * 3 + g]) * rClose[i * 3 + g]) / CH.REACH_REF);
      if (B.local[i]) { lp[nl] = pull; lt[nl] = t; li[nl] = i; nl++; }
      else { if (t > 0.98) t = 0.98; T[i] = t; prod *= 1 - t; tSum += t; }
    }
    for (j = 1; j < nl; j++) {               // locals by pull, largest first
      x = lp[j]; y = lt[j]; q = li[j]; k = j - 1;
      while (k >= 0 && lp[k] < x) { lp[k + 1] = lp[k]; lt[k + 1] = lt[k]; li[k + 1] = li[k]; k--; }
      lp[k + 1] = x; lt[k + 1] = y; li[k + 1] = q;
    }
    w = 1;
    for (j = 0; j < nl; j++) {
      t = w * lt[j]; if (t > 0.98) t = 0.98;
      T[li[j]] = t; prod *= 1 - t; tSum += t; w *= stack;
    }
    return prod;
  }

  /* ---------------- what the rest of the town is doing: competition, burnout ---------------- */

  function loadBill(B, state, o) {
    var ids = o.bands || EMPTY, genres = o.genres || EMPTY, i, band, n = 0;
    for (i = 0; i < ids.length && n < MAXB; i++) {
      band = state.bands && state.bands[ids[i]];
      if (band) { B.band[n] = band; B.local[n] = !!band.local; n++; }
    }
    if (!n) for (i = 0; i < genres.length && n < MAXB; i++) {
      if (GI[genres[i]] === undefined) continue;
      B.band[n] = null; B.local[n] = true; B.gi[n] = GI[genres[i]];
      B.pd[n] = (o.tier > 0 ? C.TIERS[Math.min(C.TIERS.length, o.tier) - 1] : 5) / Math.max(1, genres.length);
      n++;
    }
    B.n = n;
    return n;
  }

  function playerBill(show) {                // a player's show, in the shape loadBill reads
    var slots = (show.bill && show.bill.slots) || EMPTY, ids = [], i;
    for (i = 0; i < slots.length; i++) ids.push(slots[i].bandId);
    return { bands: ids, genres: EMPTY, tier: 0 };
  }

  /* SPEC?: SB.Crowd.load (02-engine 4.5) takes no lens, so it counts a show's fit from the true affinities (quirks included) and
   * the bands' true crossover. Par is made on public numbers and must not move with a quirk (7.8), and the player's own forecast
   * must not read one either, so under any lens but TRUTH the same sum (7.6: fit x (1 - days ago / BURN_WINDOW) x BURN_OWN for
   * the player's shows, bands only, the show's own zone, x FEEDER_SHOW.burnout in a feeder town) is made here from the lens. */
  function loadUnder(state, pack, lens, day, zids, nz, tier) {
    var out = new Float64Array(nz * 36), shows = state.shows || NONE, others = state.otherShows || EMPTY, sk = Object.keys(shows), i, s, aw;
    var D = C.AHEAD.days, ahead = typeof tier === 'number' && SB.Crowd && typeof SB.Crowd.bigger === 'function';
    /* the forward part (C.AHEAD), as SB.Crowd.load counts it: a public show 1 to AHEAD.days.length nights on, x how much bigger */
    function aheadW(s, own) {
      var a = s.day - day;
      if (!ahead || !(a >= 1 && a <= D.length)) return 0;
      if (own ? !(s.promo && s.promo.announce !== null && s.promo.announce !== undefined) : s.status === 'HELD') return 0;
      return D[a - 1] * SB.Crowd.bigger(SB.Crowd.showTier(state, s), tier) * C.AHEAD.w;
    }
    function add(d, ids, zoneId, own) {
      var ago = day - d, zi = zids.indexOf(zoneId), k, gs, fit, w, band;
      if (!((ago > 0 && ago <= C.BURN_WINDOW) || (aw > 0 && ago < 0)) || zi < 0 || !ids) return;
      B1.n = 0;
      for (k = 0; k < ids.length && B1.n < MAXB; k++) {
        band = state.bands && state.bands[ids[k]];
        if (band) { B1.band[B1.n] = band; B1.local[B1.n] = !!band.local; B1.n++; }
      }
      if (!B1.n) return;
      fillBill(B1, state, pack, lens, d, zids, X.ztot, X.cityZ, X.cityZ, NONE, -1);
      w = (ago > 0 ? (1 - ago / C.BURN_WINDOW) * (own ? C.BURN_OWN : 1) : aw) * (state.zones[zids[zi]].kind === 'FEEDER' ? C.FEEDER_SHOW.burnout : 1);
      for (gs = 0; gs < 36; gs++) {
        fit = 0;
        for (k = 0; k < B1.n; k++) if (B1.AG[k * 36 + gs] > fit) fit = B1.AG[k * 36 + gs];
        out[zi * 36 + gs] += fit * w;
      }
    }
    for (i = 0; i < sk.length; i++) {
      s = shows[sk[i]];
      if (!s || s.status === 'CANCELLED' || s.status === 'DRAFT' || !s.bill) continue;
      aw = aheadW(s, true);
      add(s.day, playerBill(s).bands, s.zoneId, true);
    }
    for (i = 0; i < others.length; i++) {
      s = others[i];
      if (!s || s.status === 'HELD' || s.status === 'CANCELLED') continue;
      aw = aheadW(s, false);
      add(s.day, s.bands, s.zoneId, false);
    }
    return out;
  }

  function getEnv() {
    var state = X.state, show = X.show, lens = X.lens, o = X.o, pack = X.pack, nz = X.nz, zids = X.zids, day = show.day;
    /* the public tier of this show, for the forward part of the load (C.AHEAD); none under noAhead (COMPETITION's reference) */
    var aheadTier = !o.noAhead && SB.Crowd && typeof SB.Crowd.showTier === 'function' ? SB.Crowd.showTier(state, show) : undefined;
    var key = show.id + '|' + day + '|' + X.showZ + '|' + nz + '|' + X.topTier + '|' + (o.noOwnLoad ? 1 : 0) + '|' + (o.noSteal ? 1 : 0) + '|' + aheadTier;
    var env = lens._env, others = state.otherShows || EMPTY, shows = state.shows || NONE, sk = Object.keys(shows), list = [], own = [];
    var i, j, z, g, s, c, gs, os, zj, w, prod, want, t, fit, stack = num(pack.scene.stack, 0.6), feeder, hasLoad, v, tier, ownLoad = null, pop, lensLoad = null;
    if (env && env.key === key && env.state === state) return env;
    /* inside SB.Model.batch: another lens of the same mode with nothing pinned has made this very environment already */
    var shareKey = shared && shared.state === state && typeof lens.pinCount === 'function' && lens.pinCount() === 0 ? lens.mode + '|' + key : null;
    if (shareKey !== null && shared.envs[shareKey]) { lens._env = shared.envs[shareKey]; return lens._env; }
    env = { key: key, state: state, steal: new Float64Array(nz * 36), burn: new Float64Array(nz * 36) };
    fill(env.burn, nz * 36, 1);
    for (i = 0; i < others.length; i++) {
      os = others[i];
      if (os.status === 'HELD') continue;
      if (os.day === day) list.push(os);
    }
    for (i = 0; i < sk.length; i++) {
      os = shows[sk[i]];
      if (os.id === show.id || os === show || !os.bill) continue;
      if (os.day === day && (os.status === 'CONFIRMED' || os.status === 'PLAYED')) list.push({ bands: playerBill(os).bands, zoneId: os.zoneId, own: true });
      else if (o.noOwnLoad && os.status === 'PLAYED' && os.day < day && os.day > day - C.BURN_WINDOW) own.push(os);
    }
    /* steal: each competing show's own Want for the cell, at reach 1 */
    if (!o.noSteal) for (j = 0; j < list.length; j++) {
      os = list[j];
      if (!loadBill(B1, state, os)) continue;
      zj = Math.max(0, zids.indexOf(os.zoneId || 'city'));
      fillBill(B1, state, pack, lens, day, zids, X.ztot, zj, X.cityZ, NONE, -1);
      for (z = 0; z < nz; z++) {
        t = z === zj ? 0 : minutesBetween(state, pack, zids[z], zids[zj]);
        for (g = 0; g < 3; g++) {
          w = z === zj ? 1 : Math.exp(-t / (C.DRIVE_TAU[g] * Math.max(0.05, num(lens.get('zone:' + zids[z]), 1))));
          for (s = 0; s < 12; s++) {
            gs = g * 12 + s;
            prod = cellTerms(B1, z, g, gs, nz, stack, false, false);
            want = 1 - prod * (1 - Math.min(0.98, C.SCENE_RATE * tFit));
            env.steal[z * 36 + gs] += clamp(want, 0, 1) * w;
          }
        }
      }
    }
    for (c = 0; c < nz * 36; c++) env.steal[c] = Math.min(C.STEAL_MAX, C.STEAL_K * env.steal[c]);
    /* burnout: the load is the crowd's to count (SB.Crowd.load); the player's own part is taken out for one reference run */
    hasLoad = SB.Crowd && typeof SB.Crowd.load === 'function';
    feeder = state.zones[zids[X.showZ]].kind === 'FEEDER' ? C.FEEDER_SHOW.burnout : 1;
    if (own.length) {
      ownLoad = new Float64Array(36);
      for (j = 0; j < own.length; j++) {
        if (!loadBill(B1, state, playerBill(own[j]))) continue;
        fillBill(B1, state, pack, lens, own[j].day, zids, X.ztot, X.cityZ, X.cityZ, NONE, -1);
        for (gs = 0; gs < 36; gs++) {
          fit = 0;
          for (i = 0; i < B1.n; i++) if (B1.AG[i * 36 + gs] > fit) fit = B1.AG[i * 36 + gs];
          ownLoad[gs] += fit * (1 - (day - own[j].day) / C.BURN_WINDOW) * C.BURN_OWN;
        }
      }
    }
    if (lens.mode !== 'TRUTH') lensLoad = loadUnder(state, pack, lens, day, zids, nz, aheadTier);
    /* Crowd.loads gives the whole table of one zone in one pass (the same sums as 36 calls to Crowd.load) */
    var hasLoads = !lensLoad && hasLoad && typeof SB.Crowd.loads === 'function', tab = null;
    if (hasLoad || lensLoad) for (z = 0; z < nz; z++) {
      pop = state.zones[zids[z]].pop; tab = null;
      for (g = 0; g < 3; g++) for (s = 0; s < 12; s++) {
        if (!(pop[g][s] > 0)) continue;
        gs = g * 12 + s;
        if (hasLoads && !tab) tab = SB.Crowd.loads(state, zids[z], day, aheadTier);
        v = lensLoad ? lensLoad[z * 36 + gs] : Math.max(0, num(hasLoads ? tab[g][s] : SB.Crowd.load(state, zids[z], g, GENRES[s], day, aheadTier), 0));
        if (ownLoad) v = Math.max(0, v - ownLoad[gs]);
        env.burn[z * 36 + gs] = 1 / (1 + C.BURN[g] * v * feeder);
      }
    }
    /* saving it for a bigger show a few nights on is the forward part of the load (C.AHEAD, SB.Crowd.load): one rule */
    lens._env = env;
    if (shareKey !== null) shared.envs[shareKey] = env;
    return env;
  }

  /* SB.Model.batch(state, fn): runs fn() with the environment of a show (competition and burnout, 7.6) shared among
   * every lens of one mode that has nothing pinned. The environment reads only the state and the lens's values, so it
   * is the same for all of them as long as fn changes nothing in the state; callers use it around a set of reference
   * runs of one show (Feedback.measure, Feedback.ledger). Nested batches share the outer one. */
  var shared = null;
  function batch(state, fn) {
    if (shared && shared.state === state) return fn();
    var prev = shared;
    shared = { state: state, envs: {} };
    try { return fn(); } finally { shared = prev; }
  }

  /* ---------------- 7.7a luck ---------------- */

  function weatherAt(state, day) { return (state.truth && state.truth.weather && state.truth.weather[day]) || 'CLEAR'; }

  /* Draws a show's luck from its own stream. Weather is not drawn here: it is read from truth.weather when the run is made. */
  function luck(state, show) {
    var r = SB.rng.stream(state, 'show:' + show.id), K = C.LUCK, out = [], pack = SB.Cities.pack(state), cps = pack.chokepoints || EMPTY;
    var u, g, sz, i, cuts, day = show.day, month = SB.time.month(day), w0 = weatherAt(state, day), w1 = weatherAt(state, day - 1), w2 = weatherAt(state, day - 2);
    var fair = !!(SB.Director && SB.Director.firstShow && SB.Director.firstShow(state, show));   // the opening's first show: no bad luck
    u = r.next(); g = r.int(0, 2); sz = r.range(K.SOMETHING_ELSE.size[0], K.SOMETHING_ELSE.size[1]);
    if (u < K.SOMETHING_ELSE.p && !fair) out.push({ k: 'SOMETHING_ELSE', mul: r4(1 + sz), gen: g, zones: null });
    u = r.next(); g = r.int(0, 1); sz = r.range(K.WORD_GOT_AROUND.size[0], K.WORD_GOT_AROUND.size[1]);
    if (u < K.WORD_GOT_AROUND.p) out.push({ k: 'WORD_GOT_AROUND', mul: r4(1 + sz), gen: g, zones: null });
    for (i = 0; i < cps.length; i++) {
      u = r.next(); cuts = pack.derived.cuts[cps[i].id] || EMPTY;
      if (u < num(cps[i].p, 0) && cuts.length && !fair) out.push({ k: 'ROAD', mul: r4(1 + K.ROAD.size), gen: null, zones: cuts.slice(), chokepoint: cps[i].id });
    }
    /* SPEC?: "the first clear day after a run of rain or heat" is read as a clear day after two days of rain or heat;
     * "the first cool day" as a clear day straight after a hot one. */
    if ((pack.weather.fineMonths.indexOf(month) >= 0 && w0 === 'CLEAR' && w1 !== 'CLEAR' && w1 !== 'COLD' && w2 !== 'CLEAR' && w2 !== 'COLD') ||
        (pack.weather.coolMonths.indexOf(month) >= 0 && w0 === 'CLEAR' && w1 === 'HEAT')) {
      out.push({ k: 'FINE_EVENING', mul: r4(1 + K.FINE_EVENING.size), gen: null, zones: null });
    }
    sz = r.range(-K.NOISE.size, K.NOISE.size);
    out.push({ k: 'NOISE', mul: r4(1 + (fair ? Math.abs(sz) : sz)), gen: null, zones: null });
    return out;
  }

  /* ---------------- 7.3, 7.4, 7.7 demand ---------------- */

  var cellBuf = new Float64Array(0), zg = new Float64Array(0), cameB = new Float64Array(MAXB * 36), cameS = new Float64Array(36),
      cameX = new Float64Array(3), byBand = new Float64Array(MAXB), regBoost = new Float64Array(3);

  function demandCore() {
    var state = X.state, show = X.show, lens = X.lens, o = X.o, pack = X.pack, room = X.room, nz = X.nz, zids = X.zids, p, n = B0.n;
    var env, z, g, s, c, gs, i, N, pop, row, R, Rg, prod, ts, want, can, h, hi, hs, hr, tot, lmul, rs, aw, canB, inZone, add, capI, raw, k, d, w;
    var stack = num(pack.scene.stack, 0.6), day = show.day, regs = state.regulars, focus = state.player && state.player.focus;
    var floorF = num(C.REG_FLOOR[(focus && focus.kind) || 'BETWEEN'], C.REG_FLOOR.BETWEEN), draws = EMPTY, luckOut = [], wk, wf, dr, zl;
    var scene = 0, regular = 0, invite = 0, handout = 0, heads = 0, sceneK, mailLead = [0, 0, 0], byGen = [0, 0, 0], byZone = {}, bands = {}, out;
    var feederOwn = state.zones[zids[X.showZ]].kind === 'FEEDER';

    computeReach(null); computeCan(); env = getEnv(); p = X.promo;
    cellBuf = grow(cellBuf, nz * 36); zg = grow(zg, nz * 3); lm = grow(lm, nz * 3);
    fill(cellBuf, nz * 36, 0); fill(zg, nz * 3, 0); fill(lm, nz * 3, 1); fill(cameB, MAXB * 36, 0); fill(cameS, 36, 0); fill(cameX, 3, 0); fill(byBand, MAXB, 0);

    /* luck: the stored draws of this show, else a fresh draw; weather from the truth */
    if (lens.luck) {
      if (o.luckDraws) draws = o.luckDraws;
      else if (show.night && show.night.luck) draws = show.night.luck;
      else if (show.result && show.result.demand && show.result.demand.luck) draws = show.result.demand.luck;
      else if (show.status !== 'PLAYED') draws = luck(state, show);
      wk = weatherAt(state, day);
      wf = wk === 'RAIN' ? (room.outdoor ? C.WEATHER.RAIN_OUT : C.WEATHER.RAIN_IN) : (wk === 'HEAT' && !room.ac ? C.WEATHER.HEAT_NO_AC : (wk === 'COLD' ? C.WEATHER.COLD : 1));
      if (wf < 1 && SB.Director && SB.Director.firstShow && SB.Director.firstShow(state, show)) wf = 1;   // the opening's first show: no bad weather
      if (wf !== 1) { fill(lm, nz * 3, wf); luckOut.push({ k: wk, mul: wf, gen: null, zones: null }); }
      for (i = 0; i < draws.length; i++) {
        dr = draws[i];
        if (!dr || WEATHER_KIND[dr.k] || typeof dr.mul !== 'number') continue;
        luckOut.push(dr);
        for (z = 0; z < nz; z++) {
          if (dr.zones && dr.zones.indexOf(zids[z]) < 0) continue;
          for (g = 0; g < 3; g++) if (dr.gen === null || dr.gen === undefined || dr.gen === g) lm[z * 3 + g] *= dr.mul;
        }
      }
    }
    if (done(p.mail)) for (g = 0; g < 3; g++) mailLead[g] = CH.MAIL_AWARE * lead(day - p.mail, CH.MAIL_LEAD * C.TAU[g]);

    for (z = 0; z < nz; z++) {
      pop = state.zones[zids[z]].pop; inZone = z === X.showZ; zl = 0;
      R = !o.noRegulars && regs && regs.by ? regs.by[zids[z]] : null;
      sceneK = C.SCENE_RATE * (feederOwn && inZone ? C.SCENE_RATE_FEEDER : 1);
      for (g = 0; g < 3; g++) {
        row = pop[g]; Rg = R ? R[g] : null; canB = canG[g] * dist[z * 3 + g]; lmul = lm[z * 3 + g]; rs = rZone[z * 3 + g];
        aw = Math.max(rs, mailLead[g]);
        regBoost[g] = inZone ? 1 : Math.exp(dEx[z * 3 + g] * (1 - 1 / C.DRIVE_BOOST.regulars));
        for (s = 0; s < 12; s++) {
          N = row[s]; hr = Rg ? Rg[s] : 0;
          if (!(N > 0) && !(hr > 0)) continue;
          gs = g * 12 + s; c = z * 36 + gs;
          prod = cellTerms(B0, z, g, gs, nz, stack, true, inZone);
          ts = sceneK * tFit * rs; if (ts > 0.98) ts = 0.98;
          want = 1 - prod * (1 - ts); want = want < 0 ? 0 : (want > 1 ? 1 : want);
          can = canB * env.burn[c] * (1 - env.steal[c]); if (can < 0) can = 0;
          if (N > 0 && want > 0 && can > 0) {
            h = N * want * can * lmul; if (h > N) h = N;
            tot = tSum + ts; add = 0;
            for (i = 0; i < n; i++) {
              hi = h * T[i] / tot;
              if (!inZone) hi *= bBoost[(i * nz + z) * 3 + g];
              cameB[i * 36 + gs] += hi; byBand[i] += hi; add += hi;
            }
            hs = h * ts / tot; cameS[gs] += hs; scene += hs; add += hs;
            if (add > N) add = N;
            cellBuf[c] = add; zg[z * 3 + g] += add;
          }
          if (hr > 0) {
            hr = hr * C.REG_RATE * Math.max(floorF, tFit) * can * regBoost[g] * aw * lmul;
            cameS[gs] += hr; regular += hr; zg[z * 3 + g] += hr;
          }
        }
        zl += zg[z * 3 + g];
      }
      if (zl > 0.005) byZone[zids[z]] = r2(zl);
    }
    /* people asked directly, and people handed a flyer (7.7) */
    z = X.showZ;
    if (o.invites !== false && p.invites && p.invites.length) {
      capI = (C.INVITE.capBase + C.INVITE.capPerRegular * num(regs && regs.total, 0)) *
             (CH.ADDRESS.kinds.indexOf(room.kind) >= 0 && X.address === 'ASK' ? CH.ADDRESS.askInviteCap : 1);
      raw = 0;
      for (k = 0; k < p.invites.length; k++) if (done(p.invites[k])) raw += C.INVITE.heads * (day - p.invites[k] > C.INVITE.earlyDays ? C.INVITE.early : 1);
      invite = Math.min(capI, raw);
    }
    raw = 0;
    if (p.handouts) for (k = 0; k < p.handouts.length; k++) {
      d = p.handouts[k];
      if (d && done(d.day)) raw += Math.max(0, num(d.heads, 0)) * C.HAND_RATE * clamp(num(d.aff, 0), 0, 1.2);
    }
    hi = 0; hs = 0;
    for (g = 0; g < 3; g++) {
      w = C.INVITE.split[g] * nightG[g] * roomG[g] * lm[z * 3 + g];
      cameX[g] = (invite + raw) * w; hi += invite * w; hs += raw * w; zg[z * 3 + g] += cameX[g];
    }
    invite = hi; handout = hs;
    if (invite + handout > 0) byZone[zids[z]] = r2(num(byZone[zids[z]], 0) + invite + handout);

    for (z = 0; z < nz; z++) for (g = 0; g < 3; g++) { byGen[g] += zg[z * 3 + g]; heads += zg[z * 3 + g]; }
    for (i = 0; i < n; i++) bands[B0.band[i].id] = r4(byBand[i]);
    out = {
      heads: r4(heads), byGen: [r4(byGen[0]), r4(byGen[1]), r4(byGen[2])], byZone: byZone,
      byReason: { BAND: bands, SCENE: r4(scene), REGULAR: r4(regular), INVITE: r4(invite), HANDOUT: r4(handout) },
      cells: null, reach: [r4(rReach[0]), r4(rReach[1]), r4(rReach[2])], can: [r4(canG[0]), r4(canG[1]), r4(canG[2])], luck: luckOut,
      came: { ids: [], b: [], s: [], x: [r4(cameX[0]), r4(cameX[1]), r4(cameX[2])] }, zg: {}, topTier: X.topTier
    };
    for (i = 0; i < n; i++) {
      out.came.ids.push(B0.band[i].id); row = [];
      for (gs = 0; gs < 36; gs++) row.push(r4(cameB[i * 36 + gs]));
      out.came.b.push(row);
    }
    for (gs = 0; gs < 36; gs++) out.came.s.push(r4(cameS[gs]));
    for (z = 0; z < nz; z++) if (byZone[zids[z]] !== undefined) out.zg[zids[z]] = [r4(zg[z * 3]), r4(zg[z * 3 + 1]), r4(zg[z * 3 + 2])];
    if (!lens.lite) {
      out.cells = [];
      for (c = 0; c < nz * 36; c++) out.cells.push(r4(cellBuf[c]));
    }
    return out;
  }

  function demand(state, show, lens, mods) {
    setup(state, show, lens, mods, 'Model.demand');
    return demandCore();
  }

  /* ---------------- 7.7 the room, set by set, and the night score ---------------- */

  function times(show) {
    var b = show.bill || NONE, slots = b.slots || EMPTY, out = [], t, i;
    if (b.times && b.times.length >= slots.length) return b.times;
    t = num(b.doors, 1140) + C.SET.doorsLead;
    for (i = 0; i < slots.length; i++) { out.push(t); t += num(slots[i].minutes, C.SET.def) + C.SET.changeover; }
    return out;
  }

  function personOf(state, id) { return id && state.people ? state.people[id] : null; }

  var pres = new Float64Array(MAXB * 3), cb = new Float64Array(MAXB * 3), sG = new Float64Array(3), scale = new Float64Array(3),
      stayF = new Float64Array(MAXB * MAXB * 3), startAt = new Float64Array(MAXB), likeOf = new Float64Array(MAXB), mapB = new Int32Array(MAXB);

  function nightCore(d) {
    var state = X.state, show = X.show, lens = X.lens, o = X.o, mods = X.mods, pack = X.pack, room = X.room, n = B0.n, slots = show.bill.slots || EMPTY;
    var came = d.came || null, ids = came ? came.ids : EMPTY, g, s, gs, i, j, k, t, f, v, tot, w, z, zk, total = 0, cap, through, turned, a;
    var dow = X.dow, school = dow === 6 || dow <= 3, tm = times(show), cm = pack.rules && pack.rules.curfewMinors, curfewAt = null;
    var late, gearOver, sound, skill, sp, roomGenre, live, feel, energy, sets = [], peak, capFill, likeNum, likeDen, x, e, best, rest, restN;
    var byGenX = [0, 0, 0], headsI, byGenI, lastEnd, planned, run, incidents = [], qInc = 0, q, weighted, comps, members, paid, price, door = show.door || NONE;
    var leak, gross, hat, posts, heat, cutSet = false, clk, luckList = d.luck || EMPTY, heatQ = 0, genMul = mods.genMul, zoneMul = mods.zoneMul;

    /* night modifiers on the stored demand */
    for (g = 0; g < 3; g++) {
      f = Math.max(0, num(mods.headsMul, 1)) * (genMul ? Math.max(0, num(genMul[g], 1)) : 1);
      if (zoneMul && d.zg) {
        zk = Object.keys(d.zg); tot = 0; w = 0;
        for (z = 0; z < zk.length; z++) { v = d.zg[zk[z]][g]; tot += v; w += v * Math.max(0, num(zoneMul[zk[z]], 1)); }
        if (tot > 0) f *= w / tot;
      }
      scale[g] = f; total += num(d.byGen && d.byGen[g], 0) * f;
    }
    cap = Math.max(1, num(lens.get('roomcap:' + room.id), num(room.cap, 1)) * Math.max(0, num(mods.capMul, 1)));
    through = mods.uncapped ? total : Math.min(total, C.OVERSELL * cap);
    turned = Math.max(0, total - through) * C.TURNED_SHARE;
    a = total > 0 ? through / total : 0;
    for (g = 0; g < 3; g++) { scale[g] *= a; byGenX[g] = num(d.byGen && d.byGen[g], 0) * scale[g]; }

    /* who came for what, by generation */
    fill(cb, MAXB * 3, 0);
    for (i = 0; i < n; i++) {
      mapB[i] = came ? ids.indexOf(slots[i].bandId) : -1;
      if (mapB[i] < 0) continue;
      for (g = 0; g < 3; g++) { t = 0; for (s = 0; s < 12; s++) t += came.b[mapB[i]][g * 12 + s]; cb[i * 3 + g] = t * scale[g]; }
    }
    for (g = 0; g < 3; g++) {
      if (!came) { sG[g] = byGenX[g]; continue; }
      t = came.x[g];
      for (s = 0; s < 12; s++) t += came.s[g * 12 + s];
      sG[g] = t * scale[g];
    }
    /* staying on after your band: STAY x how well the next band suits you */
    for (j = 0; j < n; j++) for (g = 0; g < 3; g++) {
      f = 1;
      for (k = j + 1; k < n; k++) {
        f *= C.STAY[g] * (C.STAY_FIT.base + C.STAY_FIT.span * Math.min(1, affBand(pack, B0.gi[j], B0.gi[k], B0.g2[k], g, lens)));
        stayF[(j * MAXB + k) * 3 + g] = f;
      }
    }
    late = o.noLate ? 0 : Math.max(0, num(mods.lateMin, 0)) + ((lens.prepDone || (show.bill && show.bill.locked)) ? 0 : C.UNLOCKED_BILL_LATE_MIN);
    gearOver = (o.noLate || o.gear || lens.prepDone || (show.prep && show.prep.gear !== null && show.prep.gear !== undefined)) ? 0 : C.NO_GEAR.changeover;
    if (cm && cm.inForce) curfewAt = (dow === 4 || dow === 5) ? cm.weekend : cm.weeknight;
    for (i = 0; i < n; i++) {
      startAt[i] = num(tm[i], 1200) + late + i * gearOver;
      if (slots[i].cut) cutSet = true;
      for (g = 0; g < 3; g++) {
        v = 0;
        for (j = 0; j < n; j++) {
          f = j > i ? Math.pow(C.EARLY[g], j - i) : (j === i ? 1 : stayF[(j * MAXB + i) * 3 + g]);
          v += cb[j * 3 + g] * f;
        }
        f = i === 0 ? (mods.set1Presence ? C.SCENE_PRESENT.set2[g] : C.SCENE_PRESENT.set1[g]) : (i === 1 ? C.SCENE_PRESENT.set2[g] : Math.pow(1 - C.SCENE_PRESENT.driftFromThird, i - 1));
        v += sG[g] * f;
        clk = 1;
        if (!o.noClock) {
          if (g === 0 && school && startAt[i] > C.CLOCK.kidsSchoolNight) clk *= C.CLOCK.kidsFactor;
          if (g === 0 && curfewAt !== null && typeof curfewAt === 'number' && startAt[i] > curfewAt) clk *= C.CLOCK.curfewFactor;
          if (g === 2 && startAt[i] > C.CLOCK.oldHeads) clk *= C.CLOCK.oldFactor;
          if (g === 1 && school && startAt[i] > C.CLOCK.middleWeeknight) clk *= C.CLOCK.middleFactor;
        }
        pres[i * 3 + g] = v * clk;
      }
      /* the share of the room that likes this band (people with a home genre only) */
      likeNum = 0; likeDen = 0;
      if (came) for (g = 0; g < 3; g++) for (s = 0; s < 12; s++) {
        gs = g * 12 + s; x = 0;
        for (j = 0; j < n; j++) {
          if (mapB[j] < 0) continue;
          f = j > i ? Math.pow(C.EARLY[g], j - i) : (j === i ? 1 : stayF[(j * MAXB + i) * 3 + g]);
          x += came.b[mapB[j]][gs] * f;
        }
        x += came.s[gs] * (i === 0 ? (mods.set1Presence ? C.SCENE_PRESENT.set2[g] : C.SCENE_PRESENT.set1[g]) : (i === 1 ? C.SCENE_PRESENT.set2[g] : Math.pow(1 - C.SCENE_PRESENT.driftFromThird, i - 1)));
        x *= scale[g];
        likeDen += x;
        if (B0.AG[i * 36 + gs] >= C.ENERGY.likeAt) likeNum += x;
      }
      likeOf[i] = likeDen > 0 ? likeNum / likeDen : 0;
    }
    peak = n - 1;
    for (i = 0; i < n; i++) if (!B0.local[i]) { peak = i; break; }
    capFill = cap;
    if (typeof o.peakFill === 'number' && o.peakFill > 0 && n) capFill = Math.max(1, (pres[peak * 3] + pres[peak * 3 + 1] + pres[peak * 3 + 2]) / o.peakFill);

    /* sound, the room and the music */
    sp = personOf(state, show.crew && show.crew.sound);
    if (typeof o.soundSkill === 'number') skill = o.soundSkill;
    else if (lens.prepDone) skill = 0.6;
    else if (!(show.crew && show.crew.sound)) skill = C.SOUND.noPerson;
    else if (!sp) skill = 0.5;
    else skill = lens.mode === 'TRUTH' ? num(sp.hid && sp.hid.skill && sp.hid.skill.SOUND, 0.6) : 0.6;
    sound = C.SOUND.pa * clamp(num(room.pa, 0), 0, 1) + C.SOUND.person * clamp(skill, 0, 1) + num(mods.soundAdd, 0);
    if (sound < 0) sound = 0;

    weighted = 0; best = -1; rest = 0; restN = 0;
    for (i = 0; i < n; i++) {
      t = pres[i * 3] + pres[i * 3 + 1] + pres[i * 3 + 2];
      feel = SB.util.curve(C.FEEL, t / capFill);
      roomGenre = (C.ROOM_GENRE.pit.indexOf(GENRES[B0.gi[i]]) >= 0 && room.seated ? C.ROOM_GENRE.pitInSeatedBar : 1) *
                  (C.ROOM_GENRE.quiet.indexOf(GENRES[B0.gi[i]]) >= 0 && room.kind === 'HOUSE' ? C.ROOM_GENRE.quietInLivingRoom : 1) +
                  num(lens.get('roomfit:' + room.id), 0);
      live = clamp(num(lens.get('live:' + B0.band[i].id), 60), 0, 100) / 100;
      energy = Math.pow(feel, C.ENERGY.feelExp) * (C.ENERGY.base + C.ENERGY.span * live * sound * Math.max(0, roomGenre)) *
               (C.ENERGY.likeBase + C.ENERGY.likeSpan * likeOf[i]);
      sets.push({ bandId: slots[i].bandId, start: Math.round(startAt[i]), end: Math.round(startAt[i] + num(slots[i].minutes, C.SET.def)),
                  present: Math.round(t), byGen: [Math.round(pres[i * 3]), Math.round(pres[i * 3 + 1]), Math.round(pres[i * 3 + 2])],
                  fill: r2(t / cap), energy: r4(energy), peak: i === peak });
    }
    if (n === 1) weighted = sets[0].energy;
    else if (n === 2) weighted = (C.Q_WEIGHTS[0] * sets[peak].energy + C.Q_WEIGHTS[1] * sets[1 - peak].energy) / (C.Q_WEIGHTS[0] + C.Q_WEIGHTS[1]);
    else if (n > 2) {
      for (i = 0; i < n; i++) if (i !== peak && (best < 0 || sets[i].energy > sets[best].energy)) best = i;
      for (i = 0; i < n; i++) if (i !== peak && i !== best) { rest += sets[i].energy; restN++; }
      weighted = C.Q_WEIGHTS[0] * sets[peak].energy + C.Q_WEIGHTS[1] * sets[best].energy + C.Q_WEIGHTS[2] * (restN ? rest / restN : 0);
    }
    for (i = 0; i < n; i++) sets[i].energy = r2(sets[i].energy);

    /* did it run on time */
    run = C.RUN.onTime;
    if (!o.run1) {
      lastEnd = n ? startAt[n - 1] + num(slots[n - 1].minutes, C.SET.def) : 0;
      planned = num(show.bill.ends, lastEnd - late - (n ? (n - 1) * gearOver : 0));
      if (n && lastEnd - planned > C.RUN.lateMinutes) run = C.RUN.over20;
      if (n && (cutSet || mods.endEarly || (typeof room.curfew === 'number' && lastEnd > room.curfew))) run = C.RUN.cut;
      run *= Math.max(0, num(mods.run, 1));
    }
    /* incidents: q is signed and added. One raised by an event is already in mods.qAdd (SB.Effects), so it is listed, not added twice. */
    if (!o.noIncidents && mods.incidents) for (i = 0; i < mods.incidents.length; i++) {
      e = mods.incidents[i]; if (!e) continue;
      incidents.push({ kind: e.kind, q: num(e.q, 0) });
      if (!e.fromEvent) qInc += num(e.q, 0);
    }
    for (i = 0; i < luckList.length; i++) if (luckList[i] && luckList[i].k === 'HEAT') heatQ = C.WEATHER.HEAT_Q;
    /* a guard at a house show or a DIY room: people do not like it (C.SECURITY.chillQ) */
    if (!o.noGuard && show.crew && show.crew.security && C.SECURITY.chill.indexOf(room.kind) >= 0) heatQ += C.SECURITY.chillQ;
    q = clamp(100 * weighted * run * Math.max(0, num(mods.qMul, 1)) + (o.noIncidents ? 0 : num(mods.qAdd, 0)) + qInc + heatQ, 0, 100);   // 7.0 rule 7
    q = Math.round(q * 10) / 10;

    /* whole people */
    headsI = Math.round(through); byGenI = [Math.floor(byGenX[0]), Math.floor(byGenX[1]), Math.floor(byGenX[2])];
    k = headsI - byGenI[0] - byGenI[1] - byGenI[2];
    while (k > 0) {
      j = -1; v = -1;
      for (g = 0; g < 3; g++) if (byGenX[g] > 0 && byGenX[g] - byGenI[g] > v) { v = byGenX[g] - byGenI[g]; j = g; }
      if (j < 0) break;
      byGenI[j]++; byGenX[j] = byGenI[j] - 1; k--;
    }
    /* the door */
    if (!o.compsDefault && typeof door.comps === 'number') comps = door.comps;
    else {
      members = 0;
      for (i = 0; i < n; i++) members += (B0.band[i].members && B0.band[i].members.length) || 4;
      comps = C.COMPS_PER_MEMBER * members;
    }
    comps = Math.max(0, Math.round(comps + (o.compsDefault ? 0 : num(mods.comps, 0))));
    if (comps > headsI) comps = headsI;
    paid = headsI - comps; price = Math.max(0, num(door.price, 0)); leak = 0; hat = Math.max(0, Math.round(num(mods.hatBonus, 0)));
    /* the player works the door: nobody is paid for it and nothing leaks but what a night's events let slip (mods.doorLeak) */
    if (door.donation) gross = Math.round(headsI * Math.max(0, num(door.suggested, 0)) * C.PRICE.HAT_RATE);
    else {
      if (!o.noLeak) leak = clamp(num(mods.doorLeak, 0), 0, 1);
      gross = Math.round(paid * price * (1 - leak));
    }
    heat = B0.n && !o.trend1 ? Math.max(0, num(lens.get('heat:' + GENRES[B0.gi[X.top]]), 0)) : 0;
    posts = 0;
    for (g = 0; g < 3; g++) posts += byGenI[g] * C.POST_RATE[g] * (C.POST.base + q / 100) * (1 + C.POST.hotPerPoint * heat);

    return { heads: headsI, byGen: byGenI, turnedAway: Math.round(turned), sets: sets, q: q, run: r2(run),
             lateMin: Math.round(late + (n ? (n - 1) * gearOver : 0)), incidents: incidents, paid: paid, comps: comps, gross: gross, hat: hat,
             leak: r4(leak), posts: Math.round(posts), barHeads: byGenI[1] + byGenI[2], exact: r4(through), sound: r2(sound), cap: Math.round(cap) };
  }

  function night(state, show, d, mods, lens) {
    if (!d || typeof d !== 'object') SB.fail('Model.night', 'a Demand is needed');
    setup(state, show, lens, mods, 'Model.night');
    return nightCore(d);
  }

  function resolve(state, show, lens, mods) {
    setup(state, show, lens, mods, 'Model.resolve');
    var d = demandCore();
    return { demand: d, night: nightCore(d) };
  }

  return { affinity: affinity, bandGen: bandGen, reach: reach, demand: demand, night: night, resolve: resolve,
           luck: luck, times: times, lead: lead, tierOf: tierOf, batch: batch };
});
