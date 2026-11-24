/* Scene Booker — engine/show/forecast.js (role E2). SB.Forecast: lenses, the usual, Par, the Call, reference runs,
 * the forecast card and the reach strip (02-engine 3.2, 7.8, 7.9, 7.10).
 *
 * A Lens is a snapshot of one way of looking at the hidden numbers. It remembers what it has read, so make a new one
 * after the state changes. lens.set(key, value) / lens.unset(key) pin one hidden number for a run (the Call and the
 * clarity rule use them). `over` may carry, besides the keys the model honors (js/engine/show/model.js):
 *   luck: false     a TRUTH lens without luck          promoAs: 'ACTUAL' | 'USUAL'     which promotion the run reads
 * Nothing here stores anything: every function is a view or an internal that returns fresh objects.
 */
SB.module('Forecast', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, CH = C.CHANNELS, GENRES = E.GENRES, EMPTY = [];
  var ASSUME_ORDER = ['MAKE_FLYER', 'ANNOUNCE', 'PRINT', 'FLYER_RUN', 'LISTINGS', 'LOCAL_AD', 'MAILING_LIST', 'INVITES', 'WEEK_PUSH', 'DAY_OF_POST', 'ADVANCE'];
  var OPEN_STATUS = { TODO: 1, PLANNED: 1, PROMISED: 1, WAITING: 1 };

  function num(v, d) { return (typeof v === 'number' && v === v && v !== Infinity && v !== -Infinity) ? v : d; }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function r2(x) { return Math.round(x * 100) / 100; }
  function copy(x) { return SB.util.copy(x); }
  function showOf(state, showId, where) {
    var s = state && state.shows && state.shows[showId];
    if (!s) SB.fail(where, 'unknown show "' + showId + '"');
    return s;
  }
  function roomOf(state, show) { return show.roomId && state.rooms ? state.rooms[show.roomId] : null; }
  /* A show can be forecast once it has a room. A bill with nobody on it is a legal, empty night (regulars still come). */
  function ready(state, show) { return !!(roomOf(state, show) && show.bill && show.bill.slots); }

  /* SPEC?: a draft made from a request has nobody on its bill until terms are agreed, so its forecast would be an empty
   * room. Until then the forecast counts the band that asked: that band is the reason the show exists (7.15). */
  function assumeBill(state, show) {
    var req, band, slots, s, k, at;
    /* a room's yes books the night before the offer goes out, so the band asked about is assumed on any show still ahead */
    if (!show || show.status === 'PLAYED' || show.status === 'CANCELLED' || !show.requestId || !state.requests) return show;
    req = state.requests[show.requestId]; band = req && state.bands ? state.bands[req.bandId] : null;
    slots = (show.bill && show.bill.slots) || EMPTY;
    if (!band || slots.some(function (x) { return x.bandId === band.id; })) return show;
    if (show.status !== 'DRAFT' && req.status !== 'NEW' && req.status !== 'REPLIED' && req.status !== 'NEGOTIATING') return show;   // a band that said no or walked is not assumed
    s = {};
    for (k in show) if (Object.prototype.hasOwnProperty.call(show, k)) s[k] = show[k];
    s.bill = {};
    for (k in (show.bill || {})) if (Object.prototype.hasOwnProperty.call(show.bill, k)) s.bill[k] = show.bill[k];
    s.bill.slots = slots.slice(); at = slots.length ? slots.length - 1 : 0;
    s.bill.slots.splice(at, 0, { bandId: band.id, role: band.local ? 'LOCAL' : 'TOURING', minutes: C.SET.def, pay: band.local ? 'FREE' : null, fee: 0, askId: null, confirmed: false });
    s.bill.times = null; s.bill.ends = null;
    return s;
  }

  /* ---------------- lenses ---------------- */

  function lens(state, mode, over) {
    if (!E.LENS[mode]) SB.fail('Forecast.lens', 'unknown lens "' + mode + '"');
    if (!state || !state.zones) SB.fail('Forecast.lens', 'a game state is needed');
    over = over || {};
    var N = SB.Notebook, memo = {}, pin = {}, pins = 0, est = (state.notebook && state.notebook.est) || {}, known = (state.truth && state.truth.parKnows) || {};
    if (!N || typeof N.truth !== 'function' || typeof N.pub !== 'function') SB.fail('Forecast.lens', 'SB.Notebook.truth and pub are needed');
    function base(k) {
      var v, e;
      if (mode === 'TRUTH') v = N.truth(state, k);
      else if (mode === 'PAR') v = (k.charCodeAt(0) === 104 && k.indexOf('heat:') === 0) ? (known[k.slice(5)] ? N.truth(state, k) : 0) : N.pub(state, k);
      else { e = est[k]; v = e ? (e.lo + e.hi) / 2 : N.pub(state, k); }
      return v === null ? undefined : v;
    }
    var L = {
      mode: mode,
      get: function (k) {
        var v;
        if (pins) { v = pin[k]; if (v !== undefined) return v; }
        v = memo[k];
        if (v === undefined) { v = base(k); memo[k] = v === undefined ? NaN : v; }
        return v;
      },
      set: function (k, v) { if (pin[k] === undefined) pins++; pin[k] = v; },
      unset: function (k) { if (pin[k] !== undefined) { delete pin[k]; pins--; } },
      pinCount: function () { return pins; },
      luck: mode === 'TRUTH' && over.luck !== false,
      quirks: mode === 'TRUTH',
      publicDraw: mode === 'PAR',
      promo: over.promoAs === 'ACTUAL' || over.promoAs === 'USUAL' ? over.promoAs : (mode === 'PAR' ? 'USUAL' : 'ACTUAL'),
      trendKnown: mode === 'PAR',
      prepDone: mode === 'PAR',
      lite: false,
      over: over
    };
    return L;
  }

  /* ---------------- the usual (7.8) ---------------- */

  function jobDays(type, kind, field) {
    var j = C.JOBS[type];
    return j.by && j.by[kind] && typeof j.by[kind][field] === 'number' ? j.by[kind][field] : j[field];
  }

  /* The day the usual does a job: its ideal day, or `lag` days after a request that arrived later than that; null when
   * that is too late for the job to count (short notice has its own Par). */
  function usualDay(show, type, kind) {
    var d = show.day - jobDays(type, kind, 'ideal');
    if (typeof show.origin === 'number' && show.origin > d) {
      d = show.origin + C.USUAL.lag;
      if (d >= show.day - jobDays(type, kind, 'missed')) return null;
    }
    return d;
  }

  function usual(state, show) {
    if (!show || typeof show.day !== 'number') SB.fail('Forecast.usual', 'a show with a day is needed');
    var room = roomOf(state, show), kind = room ? room.kind : 'HALL', P = SB.Cities.pack(state), U = C.USUAL, slots = (show.bill && show.bill.slots) || EMPTY;
    var fd = usualDay(show, 'MAKE_FLYER', kind), ad = usualDay(show, 'ANNOUNCE', kind), pd = usualDay(show, 'PRINT', kind), rd = usualDay(show, 'FLYER_RUN', kind);
    var ld = usualDay(show, 'LISTINGS', kind), md = usualDay(show, 'MAILING_LIST', kind), iv = usualDay(show, 'INVITES', kind), wd = usualDay(show, 'WEEK_PUSH', kind);
    var zone = show.zoneId || (room && room.zoneId) || 'city', routes, runs = {}, shares = {}, invites = [], i, sd;
    if (ad !== null && fd !== null && ad < fd) ad = fd;
    if (fd !== null && pd !== null) {
      if (pd < fd) pd = fd;
      if (rd !== null && rd < pd) rd = pd;
      routes = (P.derived.cityRoutes || EMPTY).slice(0, C.FLYER.PRINT[U.print].routes);
      if (zone !== 'city' && P.derived.routeById['town:' + zone]) routes.push('town:' + zone);
      if (rd !== null) for (i = 0; i < routes.length; i++) runs[routes[i]] = { day: rd, again: null, by: 'player', effect: 1 };
    }
    if (fd !== null && ad !== null) {
      sd = show.day - C.PAR.shareDay;
      if (sd < Math.max(fd, ad)) sd = Math.max(fd, ad) + 2;
      for (i = 0; i < slots.length; i++) shares[slots[i].bandId] = sd;
    }
    if (iv !== null && ad !== null) for (i = 0; i < U.invites; i++) invites.push(Math.max(iv, ad));
    return {
      announce: ad, announceHadFlyer: fd !== null && ad !== null,
      flyer: fd === null ? null : { day: fd, quality: C.FLYER.QUALITY[U.effort], by: 'player', tba: false },
      printed: fd === null ? null : pd, print: U.print, runs: runs,
      listings: U.listings && ad !== null ? ld : null,
      mail: U.mail && ad !== null && num(state.player && state.player.mailingList, 0) > 0 ? (md === null ? null : Math.max(md, ad)) : null,
      push: U.push && ad !== null && wd !== null ? Math.max(wd, ad) : null, dayOf: !!U.dayOf, paid: null, ad: null,
      shares: shares, handouts: [], invites: invites,
      roomPosted: !!(room && room.following > 0)
    };
  }

  /* ---------------- Par (7.8) ---------------- */

  /* How many the door lets in (7.7: through = min(demand, OVERSELL * cap), cap = roomcap * mods.capMul; no limit when
   * mods.uncapped). What the town expects, and the top of the Call, can never be more than this. */
  function doorLimit(state, show, L, mods, capKey) {
    var room = roomOf(state, show), cap;
    mods = mods || {};
    if (!room || mods.uncapped) return Infinity;
    cap = typeof capKey === 'number' ? capKey : num(L.get('roomcap:' + room.id), num(room.cap, 1));
    return C.OVERSELL * Math.max(1, cap * Math.max(0, num(mods.capMul, 1)));
  }

  function limitPar(p, limit) {
    var heads = Math.max(1, num(p.heads, 1)), byGen = (p.byGen || [0, 0, 0]).slice(), lim = Math.max(1, Math.round(limit)), k, g;
    if (!(heads > lim)) return { heads: heads, q: num(p.q, 0), byGen: byGen };
    k = lim / heads;
    for (g = 0; g < byGen.length; g++) byGen[g] = Math.round(num(byGen[g], 0) * k);
    return { heads: lim, q: num(p.q, 0), byGen: byGen };
  }

  function parOf(state, show) {
    if (!ready(state, show)) return { heads: 1, q: 0, byGen: [0, 0, 0] };
    var L = lens(state, 'PAR', null), r = SB.Model.resolve(state, show, L, {}), k = num((C.LABELS[show.label] || C.LABELS.NORMAL).par, 1), n = r.night;
    /* SPEC?: "par.q likewise" is read as "from the same run": the label's factor scales the heads the town expects, not the night score. */
    return limitPar({ heads: Math.max(1, Math.round(n.heads * k)), q: n.q, byGen: [Math.round(n.byGen[0] * k), Math.round(n.byGen[1] * k), Math.round(n.byGen[2] * k)] },
                    doorLimit(state, show, L, show.mods || {}));
  }

  /* Par is fixed when the night begins (before luck and night decisions). Once the night has been played, the room's
   * real limit that night (its true capacity, times any capMul a night decision set) bounds it as well: the town cannot
   * expect more people than the room let in. */
  function par(state, showId) {
    var show = showOf(state, showId, 'Forecast.par'), p, n = show.night;
    if (show.result && show.result.par) p = show.result.par;
    else if (n && n.par) {
      p = n.par;
      if (n.ended) return limitPar(p, doorLimit(state, show, lens(state, 'TRUTH', { luck: false }), n.finalMods || n.mods || show.mods || {}));
    }
    if (p) return { heads: Math.max(1, num(p.heads, 1)), q: num(p.q, 0), byGen: (p.byGen || [0, 0, 0]).slice() };
    return parOf(state, assumeBill(state, show));
  }

  /* ---------------- the promotion the Call assumes (7.10) ---------------- */

  function applyJob(state, show, p, type, key, day, opt) {
    var room = roomOf(state, show), route;
    switch (type) {
      case 'MAKE_FLYER': p.flyer = { day: day, quality: C.FLYER.QUALITY.STANDARD * (show.bill && show.bill.locked ? 1 : C.FLYER.TBA), by: 'player', tba: !(show.bill && show.bill.locked) }; break;
      case 'ANNOUNCE': p.announce = day; p.announceHadFlyer = !!(p.flyer && p.flyer.day <= day); if (opt && CH.PAID_PUSH[opt]) p.paid = { level: opt, day: day }; break;
      case 'PRINT': p.printed = day; p.print = opt || p.print || C.USUAL.print; break;
      case 'FLYER_RUN':
        route = String(key || '').split('#')[0]; if (!route) break;
        p.runs = p.runs || {};
        if (String(key).indexOf('#') >= 0 && p.runs[route]) p.runs[route].again = day;
        else if (!p.runs[route]) p.runs[route] = { day: day, again: null, by: 'player', effect: 1 };
        break;
      case 'LISTINGS': p.listings = day; break;
      case 'LOCAL_AD': if (opt && CH.LOCAL_AD[opt]) p.ad = { kind: opt, day: day }; break;
      case 'MAILING_LIST': if (num(state.player && state.player.mailingList, 0) > 0) p.mail = day; break;
      case 'INVITES': p.invites = p.invites || []; p.invites.push(day); break;
      case 'WEEK_PUSH': p.push = day; if (opt && CH.PAID_PUSH[opt]) p.paid = { level: opt, day: day }; break;
      case 'DAY_OF_POST': p.dayOf = true; break;
      case 'ADVANCE': if (room && room.following > 0) p.roomPosted = true; break;
    }
  }

  function shareGuess(state, show, p) {
    var slots = (show.bill && show.bill.slots) || EMPTY, est = (state.notebook && state.notebook.est) || {}, i, b, e, pm, base, d, tr;
    if (!p.flyer || typeof p.announce !== 'number') return;
    p.shares = p.shares || {};
    base = Math.max(p.flyer.day, p.announce);
    for (i = 0; i < slots.length; i++) {
      b = state.bands && state.bands[slots[i].bandId];
      if (!b || typeof p.shares[b.id] === 'number') continue;
      e = est['promo:' + b.id]; pm = e ? (e.lo + e.hi) / 2 : C.PAR.promotes;
      tr = b.local && SB.Bands && typeof SB.Bands.trust === 'function' ? num((SB.Bands.trust(state, b.id) || {}).value, 0) : 0;
      if (tr >= C.FAMILIAR.bandTrust) d = base + 1;
      else if (pm < 0.2) continue;
      else d = base + Math.round(2 + 10 * (1 - pm));
      if (d < show.day) p.shares[b.id] = d;
    }
  }

  /* mode 'PLAN': each undone job on its planned day, else its ideal day if still open, else skipped (the Call).
   * mode 'BEST': each undone job on its ideal day, or today when that has passed and the job still counts (reachable).
   * force: { jobId, day } puts one job on a given day whatever its plan. */
  function assumed(state, show, mode, force) {
    var p = copy(show.promo || {}), ids = show.jobs || EMPTY, today = num(state.clock && state.clock.day, 0), room = roomOf(state, show), kind = room ? room.kind : 'HALL';
    var plan = (state.week && state.week.plan) || EMPTY, planned = {}, opts = {}, wk = num(state.clock && state.clock.week, 0), i, t, j, day, ideal, shareJob = false;
    if (!ids.length || !state.jobs) return p;
    for (i = 0; i < plan.length; i++) { planned[plan[i].jobId] = wk * 7 + plan[i].dayIdx; opts[plan[i].jobId] = plan[i].opt || null; }
    for (t = 0; t < ASSUME_ORDER.length; t++) for (i = 0; i < ids.length; i++) {
      j = state.jobs[ids[i]];
      if (!j || j.type !== ASSUME_ORDER[t]) continue;
      if (force && force.jobId === j.id) { applyJob(state, show, p, j.type, j.key, force.day, opts[j.id] || j.opt); continue; }
      if (!OPEN_STATUS[j.status]) continue;
      if (j.type === 'DAY_OF_POST') { if (j.status === 'PROMISED') p.dayOf = true; continue; }
      if (C.JOBS[j.type].optional && planned[j.id] === undefined) continue;
      ideal = show.day - jobDays(j.type, kind, 'ideal');
      if (mode === 'PLAN') day = planned[j.id] !== undefined ? planned[j.id] : (today <= ideal ? ideal : null);
      else day = today <= ideal ? ideal : (today < show.day - jobDays(j.type, kind, 'missed') ? today : null);
      if (day === null || day > show.day) continue;
      applyJob(state, show, p, j.type, j.key, day, opts[j.id] || j.opt);
    }
    for (i = 0; i < ids.length; i++) { j = state.jobs[ids[i]]; if (j && j.type === 'BANDS_SHARE' && j.status !== 'SKIPPED' && j.status !== 'MOOT') shareJob = true; }
    if (shareJob) shareGuess(state, show, p);
    return p;
  }

  function withPromo(show, p) {
    var s = {}, k;
    for (k in show) if (Object.prototype.hasOwnProperty.call(show, k)) s[k] = show[k];
    s.promo = p; s.night = null; s.result = null;
    return s;
  }

  /* ---------------- the Call (7.10) ---------------- */

  function exactGens(r) {
    var k = r.demand.heads > 0 ? num(r.night.exact, r.night.heads) / r.demand.heads : 0;
    return [r.demand.byGen[0] * k, r.demand.byGen[1] * k, r.demand.byGen[2] * k];
  }

  function callOf(state, show) {
    if (!ready(state, show)) return { lo: 0, hi: 0, mid: 0, byGen: [{ lo: 0, hi: 0 }, { lo: 0, hi: 0 }, { lo: 0, hi: 0 }], unknowns: [] };
    var s2 = withPromo(show, assumed(state, show, 'PLAN', null)), L = lens(state, 'CALL', null), est = (state.notebook && state.notebook.est) || {};
    var centre, c, cg, keys, i, e, k, fam, rh, rl, d, gh, gl, sum = 0, sg = [0, 0, 0], list = [], S, w, lo, hi, g, byGen = [], unknowns = [];
    L.lite = true;
    centre = SB.Model.resolve(state, s2, L, s2.mods || {});
    c = num(centre.night.exact, centre.night.heads); cg = exactGens(centre);
    keys = SB.Notebook.inPlay(state, s2, centre.demand);
    for (i = 0; i < keys.length; i++) {
      k = keys[i]; e = est[k]; fam = k.slice(0, k.indexOf(':'));
      if (!e || !(e.hi - e.lo > 1e-9) || fam === 'live' || fam === 'roomfit') continue;
      L.set(k, e.hi); rh = SB.Model.resolve(state, s2, L, s2.mods || {});
      L.set(k, e.lo); rl = SB.Model.resolve(state, s2, L, s2.mods || {});
      L.unset(k);
      d = (num(rh.night.exact, rh.night.heads) - num(rl.night.exact, rl.night.heads)) / 2;
      gh = exactGens(rh); gl = exactGens(rl);
      for (g = 0; g < 3; g++) sg[g] += Math.pow((gh[g] - gl[g]) / 2, 2);
      sum += d * d;
      if (Math.abs(d) > 0.05) list.push({ key: k, d: d });
    }
    S = Math.sqrt(sum); w = 2 * C.CALL_K * S;
    /* whole numbers, so that the range always holds its centre and its width never grows when a band narrows */
    lo = Math.floor(c - w / 2); hi = Math.max(lo + Math.ceil(w), Math.ceil(c)); if (lo < 0) lo = 0;
    /* the top of the Call is never more than the room lets in at the largest capacity the player thinks it may have */
    e = est['roomcap:' + show.roomId];
    gh = Math.ceil(doorLimit(state, show, L, s2.mods || {}, e ? e.hi : undefined));
    if (hi > gh) hi = Math.max(gh, Math.ceil(c));
    if (lo > hi) lo = hi;
    for (g = 0; g < 3; g++) {
      d = C.CALL_K * Math.sqrt(sg[g]);
      byGen.push({ lo: Math.max(0, Math.floor(cg[g] - d)), hi: Math.max(Math.ceil(cg[g] + d), Math.ceil(cg[g])) });
    }
    list.sort(function (a, b) { return Math.abs(b.d) - Math.abs(a.d); });
    for (i = 0; i < list.length && i < 3; i++) {
      unknowns.push({ key: list[i].key, label: SB.text.off ? '' : SB.Notebook.entry(state, list[i].key).title, d: Math.round(Math.abs(list[i].d) * 10) / 10 });
    }
    return { lo: lo, hi: hi, mid: r2(c), byGen: byGen, unknowns: unknowns };
  }

  function call(state, showId) {
    var show = showOf(state, showId, 'Forecast.call'), c;
    c = (show.result && show.result.call) || (show.night && show.night.call);
    if (c) return { lo: c.lo, hi: c.hi, mid: c.mid, byGen: copy(c.byGen || []), unknowns: copy(c.unknowns || []) };
    return callOf(state, assumeBill(state, show));
  }

  /* ---------------- reference runs (7.9) ---------------- */

  function nightMods(show) { return (show.night && (show.night.finalMods || show.night.mods)) || show.mods || {}; }

  function bestDow(state, g) {
    var d, best = 0, bv = -1, v;
    for (d = 0; d < 7; d++) { v = num(SB.Notebook.truth(state, 'night:' + g + ':' + d), 0); if (v > bv) { bv = v; best = d; } }
    return best;
  }

  /* The change one controlled cause's reference makes: { show, over }, or null when the cause has no run of its own. */
  function reference(state, show, cause, actual) {
    var over = { luck: false }, s = show, p = copy(show.promo || {}), room = roomOf(state, show), U, slots, locals, touring, i, g, bg, W, worth, comfort, prices, price, b;
    function promo() { over.promo = p; }
    function U_() { if (!U) U = usual(state, show); return U; }
    switch (cause) {
      case 'PROMO_ANNOUNCE':
        U_();
        if (U.announce !== null) {
          p.announce = U.announce; p.announceHadFlyer = true;
          if (!p.flyer) p.flyer = U.flyer; else if (p.flyer.day > U.announce) p.flyer.day = U.announce;
        }
        if (U.push !== null) p.push = U.push;
        p.paid = null; promo(); break;
      case 'PROMO_FLYER': U_(); if (U.flyer) { p.flyer = copy(U.flyer); promo(); } else return null; break;
      case 'PROMO_POSTERS': U_(); p.runs = U.runs; p.printed = U.printed; p.print = U.print; p.listings = U.listings; p.ad = null; over.address = C.USUAL.address; promo(); break;
      case 'PROMO_SHARES': U_(); p.shares = U.shares; over.sharesUsual = true; promo(); break;
      case 'PROMO_DMS': p.invites = []; promo(); break;
      case 'PROMO_EXIT': p.handouts = []; promo(); break;
      case 'PROMO_PUSH': U_(); if (typeof p.push !== 'number') p.push = U.push !== null ? U.push : show.day - 2; p.dayOf = true; promo(); break;
      case 'ADVANCE': p.roomPosted = !!(room && room.following > 0); over.noLate = true; promo(); break;
      case 'DOOR_PRICE':
        if (!show.door || show.door.donation) return null;
        W = C.PRICE.WORTH; worth = clamp(W.base + W.perBand * show.bill.slots.length + W.perTier * num(actual && actual.demand.topTier, 0), W.min, W.max);
        comfort = Math.max(0.5, num(SB.Notebook.truth(state, 'price:1'), 10)); prices = C.DOOR.prices; price = prices[0];
        for (i = 0; i < prices.length; i++) if (prices[i] / (comfort * worth) <= C.PRICE.FLAT_TO && prices[i] > price) price = prices[i];
        s = withPromo(show, show.promo); s.night = show.night; s.result = show.result; s.door = copy(show.door); s.door.price = price;
        break;
      case 'ORDER':
        slots = show.bill.slots; locals = []; touring = [];
        for (i = 0; i < slots.length; i++) (slots[i].role === 'TOURING' ? touring : locals).push(slots[i]);
        if (slots.length < 2) return null;
        locals.sort(function (x, y) { return num(SB.Notebook.truth(state, 'draw:' + x.bandId + ':city'), 0) - num(SB.Notebook.truth(state, 'draw:' + y.bandId + ':city'), 0); });
        b = locals.length ? locals.slice(0, locals.length - 1).concat(touring, [locals[locals.length - 1]]) : touring;
        s = withPromo(show, show.promo); s.night = show.night; s.result = show.result; s.bill = copy(show.bill); s.bill.slots = copy(b);
        break;
      case 'RUNTIME': over.run1 = true; over.noClock = true; over.noLate = true; break;
      case 'ROOM_FIT': over.peakFill = 0.85; break;
      case 'AGE_GATE': over.agesAll = true; break;
      case 'NIGHT':
        bg = 0;
        for (g = 1; g < 3; g++) if (actual && actual.night.byGen[g] > actual.night.byGen[bg]) bg = g;
        over.dow = bestDow(state, bg); break;
      case 'SOUND': over.soundSkill = 0.7; over.gear = true; break;
      case 'COMPETITION': over.noSteal = true; over.noAhead = true; break;
      case 'TOWN_EVENT': over.noCalendar = true; break;
      case 'OVERUSE': over.fresh1 = true; break;
      case 'REPEAT': over.noOwnLoad = true; break;
      case 'REGULARS': over.noRegulars = true; break;
      case 'VENUE_REP': over.roomRep1 = true; break;
      case 'SAFETY': over.noIncidents = true; over.rules = true; over.address = 'ASK'; over.noGuard = true; break;
      case 'GENRE_MIX': over.sameGenre = true; break;
      case 'GEN_MIX': over.sameProfile = true; break;
      case 'TREND': over.trend1 = true; break;
      default: return null;
    }
    return { show: s, over: over };
  }

  function ablate(state, showId, factor) {
    var show = showOf(state, showId, 'Forecast.ablate'), mods = nightMods(show), ref, L, actual;
    if (!roomOf(state, show) || !show.bill || !show.bill.slots) SB.fail('Forecast.ablate', 'show "' + showId + '" has no room or no bill');
    if (factor === 'PROMO') return SB.Model.resolve(state, show, lens(state, 'PAR', { promoAs: 'ACTUAL' }), {});
    if (factor === 'HIDDEN') return SB.Model.resolve(state, show, lens(state, 'TRUTH', { luck: false }), show.mods || {});
    if (factor === 'LUCK') {
      L = lens(state, 'TRUTH', null);
      if (!(show.night && show.night.luck) && !(show.result && show.result.demand && show.result.demand.luck)) L.luck = false;
      return SB.Model.resolve(state, show, L, show.mods || {});
    }
    if (!E.CAUSE[factor]) SB.fail('Forecast.ablate', 'unknown factor "' + factor + '"');
    actual = SB.Model.resolve(state, show, lens(state, 'TRUTH', { luck: false }), mods);
    ref = reference(state, show, factor, actual);
    if (!ref) return actual;
    return SB.Model.resolve(state, ref.show, lens(state, 'TRUTH', ref.over), mods);
  }

  /* ---------------- the reach strip and what a late job costs ---------------- */

  function reachRange(state, show, p) {
    var s2 = withPromo(show, p), L = lens(state, 'CALL', null), est = (state.notebook && state.notebook.est) || {}, keys = SB.Notebook.inPlay(state, s2, null);
    var mid = SB.Model.reach(state, s2, L, undefined).reach, i, e, lo, hi, chan = [];
    for (i = 0; i < keys.length; i++) if (keys[i].indexOf('chan:') === 0 && est[keys[i]]) chan.push(keys[i]);
    for (i = 0; i < chan.length; i++) L.set(chan[i], est[chan[i]].lo);
    lo = SB.Model.reach(state, s2, L, undefined).reach;
    for (i = 0; i < chan.length; i++) L.set(chan[i], est[chan[i]].hi);
    hi = SB.Model.reach(state, s2, L, undefined).reach;
    return { lo: lo, mid: mid, hi: hi };
  }

  function reachStrip(state, showId) {
    var show = assumeBill(state, showOf(state, showId, 'Forecast.reachStrip')), gens = [], g, heard, able, us, onTime;
    if (!ready(state, show)) {
      for (g = 0; g < 3; g++) gens.push({ heard: { lo: 0, hi: 0 }, reachable: { lo: 0, hi: 0 }, usual: 0, missed: 0 });
      return { gens: gens };
    }
    heard = reachRange(state, show, show.promo || {});
    able = reachRange(state, show, assumed(state, show, 'BEST', null));
    us = SB.Model.reach(state, show, lens(state, 'PAR', null), undefined).reach;
    onTime = SB.Model.reach(state, withPromo(show, usual(state, show)), lens(state, 'CALL', null), undefined).reach;
    for (g = 0; g < 3; g++) {
      gens.push({ heard: { lo: r2(Math.min(heard.lo[g], heard.hi[g])), hi: r2(Math.max(heard.lo[g], heard.hi[g])) },
                  reachable: { lo: r2(Math.min(able.lo[g], able.hi[g])), hi: r2(Math.max(able.lo[g], able.hi[g])) },
                  usual: r2(us[g]), missed: r2(Math.max(0, onTime[g] - able.mid[g])) });
    }
    return { gens: gens };
  }

  function jobLoss(state, jobId, day) {
    var job = state.jobs && state.jobs[jobId], show, room, kind, ideal, a, b, L, g, out = [];
    if (!job) SB.fail('Forecast.jobLoss', 'unknown job "' + jobId + '"');
    if (ASSUME_ORDER.indexOf(job.type) < 0 || job.type === 'MAILING_LIST' || job.type === 'INVITES' || job.type === 'ADVANCE' || !job.showId) return null;
    show = state.shows && state.shows[job.showId];
    if (!show || !ready(state, show) || show.status === 'PLAYED' || show.status === 'CANCELLED') return null;
    room = roomOf(state, show); kind = room.kind; ideal = show.day - jobDays(job.type, kind, 'ideal');
    if (typeof day !== 'number') day = num(state.clock && state.clock.day, 0);
    L = lens(state, 'CALL', null);
    a = SB.Model.reach(state, withPromo(show, assumed(state, show, 'PLAN', { jobId: jobId, day: Math.min(day, show.day) })), L, undefined).reach;
    b = SB.Model.reach(state, withPromo(show, assumed(state, show, 'PLAN', { jobId: jobId, day: ideal })), L, undefined).reach;
    for (g = 0; g < 3; g++) out.push(r2(a[g] - b[g]));
    return out;
  }

  /* ---------------- what each piece of promotion is worth (fix list 2.7) ---------------- */

  var EFFECT_FIELDS = { FLYER: ['flyer'], ANNOUNCE: ['announce'], POSTERS: ['printed', 'runs'], LISTINGS: ['listings'], AD: ['ad'], MAIL: ['mail'], INVITES: ['invites'],
                        PUSH: ['push', 'paid'], DAYOF: ['dayOf'], ROOM: ['roomPosted'], SHARES: ['shares'], HANDOUTS: ['handouts'] };
  var EFFECT_ORDER = ['FLYER', 'ANNOUNCE', 'POSTERS', 'LISTINGS', 'AD', 'MAIL', 'INVITES', 'PUSH', 'DAYOF', 'ROOM', 'SHARES', 'HANDOUTS'];

  function nightOf(state, show, p, L) {
    var s2 = withPromo(show, p), r = SB.Model.resolve(state, s2, L, s2.mods || {});
    return { heads: num(r.night.exact, r.night.heads), gens: exactGens(r) };
  }

  function clearField(p, key) {
    var v = p[key];
    if (Array.isArray(v)) p[key] = [];
    else if (typeof v === 'boolean') p[key] = false;
    else if (v && typeof v === 'object') p[key] = (key === 'runs' || key === 'shares') ? {} : null;
    else p[key] = null;
  }

  /* promoEffects(state, showId) -> [{ kind, heads, gen, done }]: for each piece of promotion in the plan (done or planned), how many more
   * people the guess has because of it, and which crowd it mostly reaches (0 kids, 1 the middle, 2 old heads, null when mixed).
   * Read from the same Call the card shows, so the line and the range move together. */
  function promoEffects(state, showId) {
    var show = assumeBill(state, showOf(state, showId, 'Forecast.promoEffects')), out = [], p, L, base, i, k, f, q, r, g, d, top, tot, was, field, has, v0;
    if (!ready(state, show) || show.status === 'PLAYED' || show.status === 'CANCELLED') return out;
    p = assumed(state, show, 'PLAN', null); L = lens(state, 'CALL', null); L.lite = true;
    base = nightOf(state, show, p, L);
    for (i = 0; i < EFFECT_ORDER.length; i++) {
      k = EFFECT_ORDER[i]; field = EFFECT_FIELDS[k]; q = copy(p); has = false;
      for (f = 0; f < field.length; f++) {
        v0 = p[field[f]];
        if (v0 !== null && v0 !== undefined && v0 !== false && !(Array.isArray(v0) && !v0.length) && !(typeof v0 === 'object' && !Array.isArray(v0) && !Object.keys(v0).length)) has = true;
        clearField(q, field[f]);
      }
      if (!has) continue;
      if (k === 'FLYER') q.announceHadFlyer = false;
      r = nightOf(state, show, q, L);
      d = base.heads - r.heads;
      if (!(d >= 0.5)) continue;
      tot = 0; top = 0;
      for (g = 0; g < 3; g++) { tot += base.gens[g] - r.gens[g]; if (base.gens[g] - r.gens[g] > base.gens[top] - r.gens[top]) top = g; }
      was = show.promo || {};
      var v1 = was[field[0]], done = !(v1 === null || v1 === undefined || v1 === false || (Array.isArray(v1) && !v1.length) || (typeof v1 === 'object' && !Array.isArray(v1) && !Object.keys(v1).length));
      out.push({ kind: k, heads: Math.round(d), gen: tot > 0 && (base.gens[top] - r.gens[top]) >= 0.5 * tot ? top : null, done: done });
    }
    return out;
  }

  /* flyerEfforts(state, showId) -> { ROUGH, STANDARD, SHARP }: how many people more (or fewer) than a standard flyer each way of making it brings */
  function flyerEfforts(state, showId) {
    var show = assumeBill(state, showOf(state, showId, 'Forecast.flyerEfforts')), out = {}, p, L, kind, day, k, q, base;
    if (!ready(state, show) || show.status === 'PLAYED' || show.status === 'CANCELLED') return null;
    kind = roomOf(state, show).kind;
    p = assumed(state, show, 'PLAN', null); L = lens(state, 'CALL', null); L.lite = true;
    day = p.flyer && typeof p.flyer.day === 'number' ? p.flyer.day : show.day - jobDays('MAKE_FLYER', kind, 'ideal');
    function at(quality) {
      q = copy(p); q.flyer = { day: day, quality: quality * (show.bill && show.bill.locked ? 1 : C.FLYER.TBA), by: 'player', tba: !(show.bill && show.bill.locked) };
      if (typeof q.announce === 'number') q.announceHadFlyer = day <= q.announce;
      return nightOf(state, show, q, L).heads;
    }
    base = at(C.FLYER.QUALITY.STANDARD);
    for (k in C.FLYER.QUALITY) if (Object.prototype.hasOwnProperty.call(C.FLYER.QUALITY, k)) out[k] = Math.round(at(C.FLYER.QUALITY[k]) - base);
    return out;
  }

  /* nobodyCall(state, showId) -> { lo, hi, mid }: the guess for the night if nothing more is done to tell people (only what is done already) */
  function nobodyCall(state, showId) {
    var show = assumeBill(state, showOf(state, showId, 'Forecast.nobodyCall')), s = {}, k;
    for (k in show) if (Object.prototype.hasOwnProperty.call(show, k)) s[k] = show[k];
    s.jobs = [];
    return callOf(state, s);
  }

  /* ---------------- the card, and "what if" ---------------- */

  function unknownPairs(state, show) {
    var slots = show.bill.slots, genres = [], out = [], i, j, b, e1, e2, cf = SB.Notebook.est;
    for (i = 0; i < slots.length; i++) { b = state.bands && state.bands[slots[i].bandId]; if (b && genres.indexOf(b.genre) < 0) genres.push(b.genre); }
    genres.sort();
    for (i = 0; i < genres.length; i++) for (j = i + 1; j < genres.length; j++) {
      e1 = cf(state, 'aff:' + genres[i] + ':' + genres[j]); e2 = cf(state, 'aff:' + genres[j] + ':' + genres[i]);
      if ((!e1 || e1.conf <= E.CONF.RUMOR) || (!e2 || e2.conf <= E.CONF.RUMOR)) out.push({ a: genres[i], b: genres[j] });
    }
    return out;
  }

  function flowOf(state, show) {
    var s2 = withPromo(show, assumed(state, show, 'PLAN', null)), L = lens(state, 'CALL', null), sets, out = [], g, i, mx, mi, arrive, leave;
    L.lite = true;
    sets = SB.Model.resolve(state, s2, L, s2.mods || {}).night.sets;
    if (!sets.length) return null;
    for (g = 0; g < 3; g++) {
      mx = 0; mi = 0;
      for (i = 0; i < sets.length; i++) if (sets[i].byGen[g] > mx) { mx = sets[i].byGen[g]; mi = i; }
      arrive = sets[0].start; leave = null;
      for (i = 0; i < sets.length; i++) if (sets[i].byGen[g] >= 0.6 * mx) { arrive = sets[i].start; break; }
      for (i = mi + 1; i < sets.length; i++) if (sets[i].byGen[g] < 0.85 * mx) { leave = sets[i].start; break; }
      out.push({ gen: g, arrive: arrive, leave: leave });
    }
    return out;
  }

  function safeNobody(state, showId) {
    try { var n = nobodyCall(state, showId); return { lo: n.lo, hi: n.hi, mid: n.mid }; } catch (e) { return null; }
  }

  function card(state, showId) {
    var show = assumeBill(state, showOf(state, showId, 'Forecast.card')), room = roomOf(state, show), p = par(state, showId), c = call(state, showId), ex = null, door = show.door || {};
    var price, comps, total, pace = 'OK', loDoor, midDoor, ok = ready(state, show), played = show.status === 'PLAYED' || show.status === 'CANCELLED';
    if (SB.Money && typeof SB.Money.exposure === 'function') ex = SB.Money.exposure(state, showId);
    total = ex ? num(ex.total, 0) : 0;
    if (show.deal && num(show.deal.guarantee, 0) > 0 && total > 0) {
      price = door.donation ? num(door.suggested, 0) * C.PRICE.HAT_RATE : num(door.price, 0); comps = num(door.comps, 0);
      loDoor = Math.max(0, c.lo - comps) * price; midDoor = Math.max(0, c.mid - comps) * price;
      pace = loDoor >= total ? 'OK' : (midDoor >= total ? 'TIGHT' : 'SHORT');
    }
    return { par: p, call: c, nobody: ok && !played ? safeNobody(state, showId) : null, cap: room ? num(room.cap, 0) : 0, exposure: total, breakEven: ex && typeof ex.breakEven === 'number' ? ex.breakEven : null,
             guaranteePace: pace, reach: played ? { gens: [0, 1, 2].map(function () { return { heard: { lo: 0, hi: 0 }, reachable: { lo: 0, hi: 0 }, usual: 0, missed: 0 }; }) } : reachStrip(state, showId),
             unknownPairs: ok ? unknownPairs(state, show) : [], flow: ok && !played ? flowOf(state, show) : null };
  }

  function what(state, showId, change) {
    var show = showOf(state, showId, 'Forecast.what'), s = copy(show), room, slots, i, b, at, order, next;
    change = change || {};
    s.night = null; s.result = null;
    if (typeof change.price === 'number') { s.door = s.door || {}; s.door.price = change.price; s.door.donation = false; }
    if (change.label && C.LABELS[change.label]) s.label = change.label;
    if (typeof change.day === 'number') s.day = change.day;
    if (change.roomId) {
      room = state.rooms && state.rooms[change.roomId];
      if (!room) SB.fail('Forecast.what', 'unknown room "' + change.roomId + '"');
      s.roomId = room.id; s.zoneId = room.zoneId; s.door = s.door || {};
      if (room.ages && room.ages.indexOf(s.door.ages) < 0) s.door.ages = room.ages[0];
      if (CH.ADDRESS.kinds.indexOf(room.kind) < 0) s.door.address = null;
    }
    if (change.ages && E.AGES[change.ages]) { s.door = s.door || {}; s.door.ages = change.ages; }
    s.bill = s.bill || { slots: [] }; slots = s.bill.slots = s.bill.slots || [];
    if (change.dropBandId) {
      s.bill.slots = slots = slots.filter(function (x) { return x.bandId !== change.dropBandId; });
      if (s.bill.billing) s.bill.billing = s.bill.billing.filter(function (x) { return x !== change.dropBandId; });
      s.bill.times = null; s.bill.ends = null;
    }
    if (change.addBandId) {
      b = state.bands && state.bands[change.addBandId];
      if (!b) SB.fail('Forecast.what', 'unknown band "' + change.addBandId + '"');
      if (!slots.some(function (x) { return x.bandId === b.id; })) {
        at = slots.length ? slots.length - 1 : 0;
        slots.splice(at, 0, { bandId: b.id, role: b.local ? 'LOCAL' : 'TOURING', minutes: C.SET.def, pay: b.local ? 'FREE' : null, fee: 0, askId: null, confirmed: false });
        s.bill.times = null; s.bill.ends = null;
      }
    }
    if (change.order && change.order.length) {
      order = change.order; next = [];
      for (i = 0; i < order.length; i++) slots.forEach(function (x) { if (x.bandId === order[i] && next.indexOf(x) < 0) next.push(x); });
      slots.forEach(function (x) { if (next.indexOf(x) < 0) next.push(x); });
      s.bill.slots = next;
    }
    s = assumeBill(state, s);
    /* The Call is some forty runs of the model and Par is one; a caller weighing many candidates (rooms, nights, bands)
     * often reads only Par. The Call is therefore made when it is first read, from the state as it is then, and kept.
     * Read it before changing the state, as with any view. */
    var out = { par: parOf(state, s) }, made = null;
    Object.defineProperty(out, 'call', { enumerable: true, configurable: true,
      get: function () { if (made === null) made = callOf(state, s); return made; },
      set: function (v) { made = v; } });
    return out;
  }

  /* ---------------- the break-even line (13-real-booking, part 3) ---------------- */

  /* what a show will still cost that the settle cannot see yet (fix list 1.5): sound nobody is hired for (the usual person's
   * rate), event insurance not bought yet, printing and pushes on the plan, and a meal promised to the touring band.
   * Once any of it is paid it is in the ledger and the settle counts it, so nothing here is counted twice.
   * -> { sound: the rate guessed (0 when sound is settled), extra: dollars outside the box, list: [{ k, amount, guess }] } */
  function priceIndexOf(state) {
    var p = null;
    try { p = SB.Cities.pack(state); } catch (e) { p = null; }
    return p && p.money && typeof p.money.priceIndex === 'number' ? p.money.priceIndex : 1;
  }

  function usualSound(state) {
    var ids = Object.keys(state.people || {}), i, p, best = null;
    for (i = 0; i < ids.length; i++) {
      p = state.people[ids[i]];
      if (!p || (p.state && p.state !== 'ACTIVE') || (p.roles || EMPTY).indexOf('SOUND') < 0 || p.met === null || p.met === undefined || typeof p.rate !== 'number') continue;
      if (!best || (p.rel || 0) > (best.rel || 0)) best = p;
    }
    return best ? best.rate : Math.round(C.PAY.SOUND[0] * priceIndexOf(state));
  }

  function plannedCosts(state, show, over) {
    var room = roomOf(state, show), crew = show.crew || {}, out = { sound: 0, extra: 0, list: [] }, pi = priceIndexOf(state), plan = (state.week && state.week.plan) || EMPTY;
    var led = (state.money && state.money.ledger) || EMPTY, terms = null, R = null, planned = {}, ids = show.jobs || EMPTY, i, j, job, c, meal, spent = false;
    function add(k, amount, guess) {
      amount = Math.round(amount || 0);
      if (!(amount > 0)) return;
      out.list.push(guess ? { k: k, amount: amount, guess: true } : { k: k, amount: amount });
      if (k === 'SOUND') out.sound = amount; else out.extra += amount;
    }
    function optCost(type, opt) {
      var jd = C.JOBS[type], v = 0;
      if (!jd || !jd.opt || !opt) return 0;
      if (jd.opt === 'PRINT_RUN' && C.FLYER.PRINT[opt]) v = C.FLYER.PRINT[opt].cost;
      else if (jd.opt === 'PUSH' && CH.PAID_PUSH[opt]) v = CH.PAID_PUSH[opt].cost;
      else if (jd.opt === 'AD' && CH.LOCAL_AD[opt]) v = CH.LOCAL_AD[opt].cost;
      return Math.round(v * pi);
    }
    if (!room) return out;
    if (!crew.sound) {
      try { terms = SB.Rooms.terms(state, room.id, show.id); } catch (e) { terms = null; }
      if (!(terms && num(terms.soundFee, 0) > 0)) add('SOUND', usualSound(state), true);
    }
    try { R = SB.Rooms.crewRules(state, room.id, show.id).insurance; } catch (e) { R = null; }
    if (R && (show.insure || R.required) && !(R.bought > 0)) add('INSURANCE', R.cost);
    for (i = 0; i < plan.length; i++) {
      job = state.jobs && state.jobs[plan[i].jobId];
      if (!job || job.showId !== show.id || job.status === 'DONE') continue;
      planned[job.id] = true;
      if (plan[i].opt) add(C.JOBS[job.type] && C.JOBS[job.type].opt === 'PRINT_RUN' ? 'PRINT' : 'PROMO', optCost(job.type, plan[i].opt));
      if (plan[i].pay && plan[i].pay.kind === 'CASH') add('HELPER', plan[i].pay.amount || 0);
    }
    /* a print run still to do and not on the plan yet: the usual run */
    for (i = 0; i < ids.length; i++) {
      j = state.jobs && state.jobs[ids[i]];
      if (j && j.type === 'PRINT' && OPEN_STATUS[j.status] && !planned[j.id] && !(C.JOBS.PRINT && C.JOBS.PRINT.optional)) add('PRINT', C.FLYER.PRINT[C.USUAL.print].cost * pi);
    }
    meal = over && typeof over.meal === 'boolean' ? over.meal : !!(show.deal && show.deal.meal);
    for (i = 0; i < led.length; i++) if (led[i].showId === show.id && led[i].cat === 'FOOD' && led[i].amount < 0) spent = true;
    if (meal && !spent && C.JOBS.FOOD) add('FOOD', (C.JOBS.FOOD.cost[0] + C.JOBS.FOOD.cost[1]) / 2 * pi);
    return out;
  }

  /* breakEven(state, showId, over) -> { even, price, owed, lo, hi, shape, hat, split, guess, nobody, extras }. Reads only; stores nothing.
   * `over` previews choices not saved yet: { price, guarantee, shape, share } (share is the band's part of the door, 0 to 1,
   * or 0 to 100). The money is Night's own settle (Night.figureAt), so there is one copy of the rules.
   *   even   the fewest paying people at which everyone promised is paid and the player's own costs are back
   *          (owed / price, rounded up, when nothing owed moves with the door); null at a price of 0, for a hat, or if no door gets there
   *   owed   the guarantee, everything off the top, the locals' agreed money and the player's own costs so far, at that door
   *   lo, hi the Call's range for the night as it would be with these choices
   *   hat    true when the door is a hat passed round: nobody is promised a number
   *   split  on a door deal, at the middle of the guess: { at, offTop, band, you } (at = paying people), else null */
  function breakEven(state, showId, over) {
    var show = assumeBill(state, showOf(state, showId, 'Forecast.breakEven')), s = {}, k, door, deal, c, hat, price, shape, f, lo, hi, mid, even = null, owed = 0, split = null, at, changed = false, X, stX, gs = null, none = null;
    over = over || {};
    for (k in show) if (Object.prototype.hasOwnProperty.call(show, k)) s[k] = show[k];
    door = s.door = copy(show.door || {}); deal = s.deal = copy(show.deal || {});
    if (typeof over.price === 'number' && over.price >= 0) {
      if (door.donation) { if (num(door.suggested, 0) !== over.price) changed = true; door.suggested = over.price; }
      else { if (num(door.price, 0) !== over.price) changed = true; door.price = over.price; }
    }
    if (over.shape && E.DEAL[over.shape]) deal.shape = over.shape;
    if (over.donation === true && !door.donation) { door.donation = true; door.suggested = num(door.suggested, 0) || num(door.price, 0); }
    if (typeof over.guarantee === 'number') deal.guarantee = Math.max(0, Math.round(over.guarantee));
    if (typeof over.share === 'number') deal.pct = clamp(over.share > 1 ? over.share / 100 : over.share, 0, 1);
    shape = deal.shape || 'DOOR';
    hat = !!door.donation || shape === 'HAT';
    price = door.donation ? num(door.suggested, 0) : num(door.price, 0);
    /* the guess moves with the price, so a previewed price is forecast afresh; anything else reads the show's Call */
    c = changed && show.status !== 'PLAYED' && show.status !== 'CANCELLED' ? callOf(state, s) : call(state, showId);
    if (!ready(state, s) || !SB.Night || typeof SB.Night.figureAt !== 'function') {
      return { even: null, price: price, owed: 0, lo: c.lo, hi: c.hi, shape: shape, hat: hat, split: null, guess: null, nobody: null, extras: [] };
    }
    /* what is still to come that the settle cannot see yet (planned costs, usual sound): counted here so the line holds to the real receipt.
     * With nobody on sound, the usual person is put on the night in a view of the state that has them; nothing real is changed. */
    X = plannedCosts(state, s, over);
    stX = state;
    if (X.sound > 0) {
      try {
        stX = Object.create(state); stX.people = Object.assign({}, state.people || {});
        stX.people.__usualSound = { id: '__usualSound', first: '', rate: X.sound, state: 'ACTIVE', roles: ['SOUND'] };
        s.crew = copy(s.crew || {}); s.crew.sound = '__usualSound';
        if (!SB.Night.figureAt(stX, s, 0)) throw new Error('no figure');
      } catch (e) { stX = state; s.crew = copy(show.crew || {}); X.extra += X.sound; X.sound = 0; }
    }
    function fig(n) { return SB.Night.figureAt(stX, s, n); }
    function ok(n) { var x = fig(n); return x.gap === 0 && x.net - X.extra >= 0; }
    if (price > 0 && !hat) {
      /* more people at the door never leaves the player worse off, so the first door that covers it is found by halving */
      hi = 1;
      while (hi < 65536 && !ok(hi)) hi *= 2;
      if (ok(0)) even = 0;
      else if (ok(hi)) {
        lo = hi === 1 ? 0 : hi / 2;
        while (hi - lo > 1) { mid = Math.floor((lo + hi) / 2); if (ok(mid)) hi = mid; else lo = mid; }
        even = hi;
      }
    }
    at = Math.max(0, Math.round((c.lo + c.hi) / 2) - Math.max(0, Math.round(num(door.comps, 0))));
    f = fig(even === null ? at : even);
    /* on a door deal the band's part is a share of whatever comes in, not a promise: it is not in what is owed */
    owed = f.offTop + f.locals + f.costs + X.extra + (shape === 'DOOR' || shape === 'HAT' ? 0 : f.touring);
    f = fig(at);
    gs = { at: at, offTop: f.offTop, touring: f.touring, locals: f.locals, band: f.touring, keep: f.keep, you: f.net - X.extra, door: f.door };
    if (shape === 'DOOR' && !hat) split = { at: at, offTop: f.offTop, band: f.touring + f.locals, you: f.net - X.extra };
    none = fig(0);
    return { even: even, price: price, owed: owed, lo: c.lo, hi: c.hi, shape: shape, hat: hat, split: split, guess: gs, nobody: -(none.offTop + none.touring + none.locals + none.costs + X.extra), extras: X.list };
  }

  /* dealOptions(state, showId, ask, over) -> [{ shape, guarantee, pct, band, you, nobody, even, asked }]: the deals worth putting to the touring band.
   * The band is never asked to take less than they asked: a deal is listed only when it pays them at least what their own ask pays at the middle of
   * the guess (fix list 1.4, design call D2). The first is always the ask itself. `ask` is { shape, guarantee, pct }; `over` as breakEven's (price, meal). */
  function dealOptions(state, showId, ask, over) {
    var out = [], base, floor, shape, pct, tries, g, b, i, pool, need, hatPool, hb;
    over = over || {};
    ask = ask || {};
    function one(shp, guarantee, share, asked, donation) {
      var o = {}, k, r;
      for (k in over) if (Object.prototype.hasOwnProperty.call(over, k)) o[k] = over[k];
      o.shape = shp; o.guarantee = guarantee; o.share = share;
      if (donation) o.donation = true;
      r = breakEven(state, showId, o);
      if (!r || !r.guess) return null;
      return { shape: shp, guarantee: guarantee, pct: share, band: r.guess.band, you: r.guess.you, nobody: r.nobody, even: r.even, at: r.guess.at, asked: !!asked, hat: r.hat,
               lo: r.lo, hi: r.hi, door: r.guess.door, offTop: r.guess.offTop };
    }
    function ceil5(x) { return Math.max(5, Math.ceil(x / 5) * 5); }
    /* the smallest share, in fives of a percent, that pays `floor` out of `pool`; over 100 percent means it cannot */
    function pctFor(pool) { return pool > 0 ? Math.ceil(floor / pool * 20 - 1e-9) / 20 : 2; }
    shape = ask.shape || 'DOOR'; pct = typeof ask.pct === 'number' ? ask.pct : 1;
    base = one(shape, Math.round(num(ask.guarantee, 0)), pct, true);
    if (!base) return out;
    out.push(base);
    floor = base.band;
    pool = Math.max(0, base.door - base.offTop);
    need = pctFor(pool);
    if (shape !== 'DOOR' && need <= 1 && floor > 0) { b = one('DOOR', 0, Math.max(0.05, need), false); if (b && b.band >= floor) out.push(b); }
    if (shape !== 'GUARANTEE' && floor > 0) out.push(one('GUARANTEE', ceil5(floor), 0, false));
    if (shape !== 'GUARANTEE_PLUS' && floor > 0) {
      /* the smallest guarantee, in fives, whose plus-share still pays them what they asked */
      for (g = ceil5(floor), i = 0; g >= 5 && i < 12; g -= 5, i++) { b = one('GUARANTEE_PLUS', g, 0); if (!b || b.band < floor) break; tries = g; }
      if (tries) out.push(one('GUARANTEE_PLUS', tries, 0, false));
    }
    if (shape !== 'VERSUS' && floor > 0 && need <= 1) { b = one('VERSUS', ceil5(floor * 0.8), Math.max(0.05, need), false); if (b && b.band >= floor) out.push(b); }
    if (shape !== 'HAT' && floor > 0) {
      /* asking at the door for a few extra: only when what people give at the door would still pay them what they asked */
      hb = one('HAT', 0, 1, false, true);
      if (hb) {
        hatPool = Math.max(0, hb.door - hb.offTop);
        if (pctFor(hatPool) <= 1) { b = one('HAT', 0, Math.max(0.05, pctFor(hatPool)), false, true); if (b && b.band >= floor) out.push(b); }
      }
    }
    return out.filter(Boolean);
  }

  /* the floor a guarantee can be lowered to without paying the band less than their ask at the guess, in dollars (fives) */
  function guaranteeFloor(state, showId, ask, shape, over) {
    var opts = dealOptions(state, showId, ask, over), i;
    for (i = 0; i < opts.length; i++) if (opts[i].shape === shape) return opts[i].guarantee;
    return null;
  }

  return { lens: lens, usual: usual, par: par, call: call, ablate: ablate, card: card, what: what, reachStrip: reachStrip, jobLoss: jobLoss,
           reference: reference, parOf: parOf, callOf: callOf, breakEven: breakEven, dealOptions: dealOptions, guaranteeFloor: guaranteeFloor, plannedCosts: plannedCosts,
           promoEffects: promoEffects, flyerEfforts: flyerEfforts, nobodyCall: nobodyCall };
});
