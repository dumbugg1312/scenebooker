/* Scene Booker — engine/week/jobs.js   (E1b)
 * SB.Jobs: job instances, windows, promises, resolution, the flyer spec.
 * Spec: design/spec/02-engine.md 2.4, 5.2, 7.5, 7.12; 01-state 2.7; 05-interface 6.1.
 * Streams: JOBS (draws), TEXT (only as the rng of SB.text.line).
 *
 * Besides the manifest this module exports three internals a neighbour needs and the manifest has no name for:
 *   add(state, type, args) -> Result & { jobId }   creates a job that is not on a show's checklist (Week.addJob,
 *                                                  Territory.startTour) or a second run of a route
 *   drop(state, jobId) -> Result                   undoes add (Week.removeJob): the job becomes MOOT
 *   modeOf(state, job) -> JOB_MODE                 HOUSE_RULES is HOURS the first time ever, a PROMISE after
 */
SB.module('Jobs', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  var LIVE = { TODO: true, PLANNED: true, PROMISED: true, WAITING: true };
  var ORDER = Object.keys(E.JOB);
  var SHOW_LIVE = { DRAFT: true, CONFIRMED: true };
  var FREE_TYPES = { GO_TO_SHOW: true, VISIT: true, EXTRA_SHIFT: true, HARM_ASK: true, HARM_WORD: true,
                     TOUR_ROUTE: true, TOUR_ADVANCE: true };
  var VET_ACTION = { VET_LISTEN: 'LISTEN', VET_CLIP: 'CLIP', VET_HISTORY: 'HISTORY', VET_ASK_AROUND: 'ASK_AROUND',
                     VET_ASK_BOOKER: 'ASK_BOOKER' };
  /* MESSAGE jobs and the ask kinds that move them (02-engine 5.2, last paragraph). */
  var ASK_FOR = { HOLD_ROOM: ['ROOM_HOLD', 'HOLDER_RELEASE'], AGREE_TERMS: ['TERMS'], ASK_LOCALS: ['BAND_PLAY'],
                  CONFIRM_ROOM: ['ROOM_CONFIRM'], LINE_UP_CREW: ['CREW'], LODGING: ['LODGING'], VET_ASK_BOOKER: ['CONTACT_VET'] };

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function cfg(type) {
    var c = C.JOBS[type];
    if (!c) SB.fail('Jobs', 'unknown job type "' + type + '"');
    return c;
  }
  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function jobsOf(state) { if (!state.jobs) state.jobs = {}; return state.jobs; }
  function getJob(state, jobId, where) {
    var j = state.jobs && state.jobs[jobId];
    if (!j) SB.fail(where || 'Jobs', 'unknown job "' + jobId + '"');
    return j;
  }
  function getShow(state, showId, where) {
    var s = state.shows && state.shows[showId];
    if (!s) SB.fail(where || 'Jobs', 'unknown show "' + showId + '"');
    return s;
  }
  function showOf(state, job) { return job.showId && state.shows ? state.shows[job.showId] || null : null; }
  function roomOf(state, show) { return show && show.roomId && state.rooms ? state.rooms[show.roomId] || null : null; }
  function bandOf(state, id) { return state.bands ? state.bands[id] || null : null; }
  function personOf(state, id) { return state.people ? state.people[id] || null : null; }
  function personName(state, id) {
    var p = personOf(state, id);
    if (!p) return null;
    return p.nick || ((p.first || '') + (p.last ? ' ' + p.last : '')).trim() || null;
  }
  function pack(state) {
    if (!state.citySlug || !SB.Cities || !SB.Cities.isLoaded || !SB.Cities.isLoaded(state.citySlug)) return null;
    return SB.Cities.pack(state);
  }
  function priceIndex(state) {
    var p = pack(state);
    return p && p.money && typeof p.money.priceIndex === 'number' ? p.money.priceIndex : 1;
  }
  function dollars(state, n) { return Math.round(n * priceIndex(state)); }
  function has(path) { return SB.text.has(path); }
  function line(state, path, slots) {
    if (!has(path)) return '';
    return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
  }
  function label(path, slots, fallback) {
    if (!has(path)) return fallback;
    return SB.text.render(firstText(path), slots || {}, null);
  }
  function firstText(path) {
    var parts = path.split('.'), v = SB.Content, i;
    for (i = 0; i < parts.length && v; i++) v = v[parts[i]];
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) { for (i = 0; i < v.length; i++) { if (typeof v[i] === 'string') return v[i]; if (v[i] && v[i].t) return v[i].t; } }
    if (v && typeof v.t === 'string') return v.t;
    return '';
  }
  function rec(t, day, half, showId, text, payload) {
    var r = { t: t, day: day, half: half || null, showId: showId || null, text: text || '' }, k;
    if (SB.text.off) r.text = '';
    for (k in payload) r[k] = payload[k];
    return r;
  }
  function stage(state) { return state.player && state.player.stage ? state.player.stage : 1; }
  function bandTrust(state, bandId) {
    if (!SB.Bands || !SB.Bands.trust) return 0;
    var t = SB.Bands.trust(state, bandId);
    return t && typeof t.value === 'number' ? t.value : 0;
  }
  function confirmedSlots(show) {
    return (show.bill && show.bill.slots ? show.bill.slots : []).filter(function (s) { return s.confirmed; });
  }
  function familiarRoom(state, show) {
    var r = roomOf(state, show);
    return !!(r && (r.playerShows || 0) >= C.FAMILIAR.roomShows);
  }
  function asksFor(state, showId, kinds) {
    var out = [], a, k;
    if (!state.asks) return out;
    for (k in state.asks) {
      a = state.asks[k];
      if (a.showId === showId && kinds.indexOf(a.kind) >= 0) out.push(a);
    }
    return out;
  }
  function plannedItem(state, jobId) {
    var plan = state.week && state.week.plan, i;
    if (!plan) return null;
    for (i = 0; i < plan.length; i++) if (plan[i].jobId === jobId) return plan[i];
    return null;
  }

  /* ---- routes ---- */
  function routes(state) {
    var p = pack(state);
    if (p && p.routes && p.routes.length) return p.routes;
    return C.CHANNELS.RUN_DEFAULT.map(function (r) { return { id: r.id, name: r.id, zone: 'city', ceil: r.ceil, hours: 2, spots: [] }; });
  }
  function routeById(state, id) {
    var list = routes(state), i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function cityZoneId(state) {
    var z, k;
    if (state.zones) for (k in state.zones) { z = state.zones[k]; if (z && z.kind === 'CITY') return z.id || k; }
    return 'city';
  }
  /* The routes a print run covers: city routes first, then the show's own town route, then the other towns. */
  function coveredRoutes(state, show) {
    var print = (show.promo && show.promo.printed != null && show.promo.print) ? show.promo.print : C.USUAL.print;
    var n = (C.FLYER.PRINT[print] || C.FLYER.PRINT.USUAL).routes, city = [], own = [], towns = [];
    var cz = cityZoneId(state);
    routes(state).forEach(function (r) {
      var zone = r.zone || 'city';
      if (zone === cz || zone === 'city') city.push(r.id);
      else if (show.zoneId && zone === show.zoneId) own.push(r.id);
      else towns.push(r.id);
    });
    return city.concat(own, towns).slice(0, n);
  }
  function routeKey(key) { var k = String(key || ''); var i = k.indexOf('#'); return i >= 0 ? k.slice(0, i) : k; }
  function isAgain(key) { return String(key || '').indexOf('#') >= 0; }

  /* ---- mode, carrier ---- */
  /* a job the friend who handed over the scene is doing for a new booker (SB.Rungs) */
  function coveredJob(state, job) { return !!(SB.Rungs && LIVE[job.status] && SB.Rungs.covers(state, job.type)); }
  function modeOf(state, job) {
    if (coveredJob(state, job)) return 'AUTO';
    if (job.type === 'HOUSE_RULES' && state.player && state.player.houseRules && job.by == null &&
        job.status !== 'DONE' && !plannedItem(state, job.id)) return 'PROMISE';
    return cfg(job.type).mode;
  }
  function ridesOn(state, job) {
    var c = cfg(job.type);
    if (c.mode === 'PROMISE') return c.rides;
    if (job.type === 'HOUSE_RULES' && modeOf(state, job) === 'PROMISE') return c.thenPromise.rides;
    return null;
  }
  function find(state, show, type, key) {
    var ids = show.jobs || [], i, j;
    for (i = 0; i < ids.length; i++) {
      j = state.jobs[ids[i]];
      if (j && j.type === type && (key === undefined || j.key === key)) return j;
    }
    return null;
  }
  function allOf(state, show, type) {
    var ids = show.jobs || [], out = [], i, j;
    for (i = 0; i < ids.length; i++) { j = state.jobs[ids[i]]; if (j && j.type === type) out.push(j); }
    return out;
  }
  function carrierOf(state, job) {
    var show = showOf(state, job), rides = ridesOn(state, job);
    return show && rides ? find(state, show, rides) : null;
  }
  function ridersOf(state, carrier) {
    var show = showOf(state, carrier);
    if (!show) return [];
    return (show.jobs || []).map(function (id) { return state.jobs[id]; }).filter(function (j) {
      return j && j.id !== carrier.id && ridesOn(state, j) === carrier.type && j.status !== 'MOOT';
    });
  }

  /* ---- hours ---- */
  function hoursOf(state, job) {
    var c = cfg(job.type), show = showOf(state, job), h = c.hours, fam = show && familiarRoom(state, show), r;
    if (job.type === 'MAKE_FLYER') h = C.FLYER.HOURS[job.effort || C.USUAL.effort] || c.hours;
    else if (job.type === 'FLYER_RUN') { r = routeById(state, routeKey(job.key)); h = r && r.hours ? r.hours : c.hours; }
    else if (job.type === 'SORT_GEAR') h = fam ? 0 : c.hours;
    else if (job.type === 'HOUSE_RULES' && modeOf(state, job) === 'PROMISE') h = c.thenPromise.hours;
    else if (job.type === 'ADVANCE' && fam) h = c.hours / 2;          // a room you know: half the calls (half hours are legal)
    if (job.type === 'ADVANCE' || job.type === 'RUN_SHOW') {
      ridersOf(state, job).forEach(function (rj) { if (rj.status === 'PROMISED') h += hoursOf(state, rj); });
    }
    return h;
  }

  /* ------------------------------------------------------------------ */
  /* Creating jobs                                                       */
  /* ------------------------------------------------------------------ */

  function make(state, type, show, key, status) {
    cfg(type);
    var id = U.newId(state, 'j');
    var job = { id: id, type: type, showId: show ? show.id : null, key: key === undefined ? null : key,
                status: status || 'TODO', doneDay: null, by: null, timing: null, effort: null, opt: null,
                waived: null, outcome: null, slip: null, text: null };
    jobsOf(state)[id] = job;
    if (show) { if (!show.jobs) show.jobs = []; show.jobs.push(id); }
    return job;
  }

  function moot(job, why) {
    if (!LIVE[job.status]) return;
    job.status = 'MOOT';
    job.mootWhy = why || 'NA';
  }

  function finishDone(state, job, day, timing, by) {
    job.status = 'DONE';
    job.doneDay = day;
    job.timing = timing;
    if (by !== undefined) job.by = by;
  }

  /* want: the job should exist (cond) or no longer applies. status: what a new instance starts as. */
  function want(state, show, type, key, cond, status) {
    var j = find(state, show, type, key);
    if (cond) {
      if (!j) j = make(state, type, show, key, status);
      else if (j.status === 'MOOT' && j.mootWhy === 'NA' && j.doneDay == null) { j.status = status || 'TODO'; j.mootWhy = null; }
      return j;
    }
    if (j) moot(j, 'NA');
    return null;
  }

  function waive(state, job, kind, show) {
    var room = roomOf(state, show), slots;
    if (!job || job.status === 'DONE' || job.status === 'SKIPPED') return;
    finishDone(state, job, today(state), 'ON_TIME', null);
    job.waived = kind;
    slots = { host: room ? personName(state, room.ownerId) : null, room: room ? room.name : null,
              band: topBandName(state, show) };
    job.text = line(state, 'jobs.waived.' + kind, slots);
  }

  /* ------------------------------------------------------------------ */
  /* Windows (02-engine 7.12)                                            */
  /* ------------------------------------------------------------------ */

  function overrides(state, job) {
    var c = cfg(job.type), show = showOf(state, job), room = roomOf(state, show), o = c.opens, i = c.ideal, m = c.missed, b;
    if (room && c.by && c.by[room.kind]) {
      b = c.by[room.kind];
      if (b.opens !== undefined) o = b.opens;
      if (b.ideal !== undefined) i = b.ideal;
      if (b.missed !== undefined) m = b.missed;
    } else if (!room && c.by && i != null) {
      /* SPEC?: 7.12 gives no rule for a show with no room yet. Until the room is known its jobs are judged by the most
       * forgiving room kind (the latest ideal day), so a draft is never called late for a room it may not use */
      Object.keys(c.by).forEach(function (kind) { if (c.by[kind].ideal !== undefined && c.by[kind].ideal < i) i = c.by[kind].ideal; });
    }
    return { o: o === undefined ? null : o, i: i === undefined ? null : i, m: m === undefined ? null : m };
  }

  /* the first show the walkthrough guides makes its flyer while the bands answer (bands go on it as TBA) */
  function guidedShow(state, show) {
    var t = state.story && state.story.tutorial;
    return !!(t && t.on && !((state.player && state.player.showsPlayed) || 0) && (!t.showId || t.showId === show.id));
  }

  /* -> { met, day, missing: [type] }. A need on a repeated job is met when every instance is DONE or MOOT. */
  function needsOf(state, job) {
    var c = cfg(job.type), show = showOf(state, job), out = { met: true, day: null, missing: [], list: [] };
    if (!show) return out;
    (c.needs || []).forEach(function (type) {
      var inst = allOf(state, show, type), done = true;
      inst.forEach(function (j) {
        if (j.status === 'DONE') { if (j.doneDay != null && (out.day === null || j.doneDay > out.day)) out.day = j.doneDay; }
        else if (j.status !== 'MOOT') done = false;
      });
      out.list.push({ type: type, done: done });
      if (!done) { out.met = false; out.missing.push(type); }
    });
    if (job.type === 'LOCK_BILL' && confirmedSlots(show).length < 2) { out.met = false; out.missing.push('BANDS'); }
    /* the flyer is for a bill with a yes on it (spec 11) */
    if ((job.type === 'MAKE_FLYER' || job.type === 'ANNOUNCE' || job.type === 'LISTINGS' || job.type === 'LOCAL_AD') && !confirmedSlots(show).length && !(show.bill && show.bill.locked) && !guidedShow(state, show)) { out.met = false; out.missing.push('BANDS'); }
    return out;
  }

  function dayLabel(day, onDay) {
    return Math.abs(day - onDay) <= 6 ? SB.time.fmt(day, 'dow3') : SB.time.fmt(day, 'md');
  }

  function view(st, opens, idealUntil, missedAt, onDay) {
    var lab = '';
    if (st === 'EARLY' && opens != null && opens > onDay) lab = SB.text.label('window.EARLY', { day: dayLabel(opens, onDay) });
    else if (st === 'EARLY' && opens != null) lab = SB.text.label('window.OPEN', {});    // its day has come; it waits on another job
    else if (st === 'CLOSING' && idealUntil != null) lab = SB.text.label('window.CLOSING', { day: dayLabel(idealUntil, onDay) });
    else lab = SB.text.label('window.' + st, {});
    return { state: st, opens: opens, idealUntil: idealUntil, lateFrom: idealUntil == null ? null : idealUntil + 1,
             missedAt: missedAt, label: lab, loss: null };
  }

  var JOB_GRACE = 2;
  function computeWindow(state, job, onDay) {
    var c = cfg(job.type), show = showOf(state, job), mode = modeOf(state, job), carrier, w, req, nd, ov, T,
        opensDay, idealUntil, missedAt, st, fp, len, k, exp, graced = false, stg;
    if (job.status === 'MOOT') return view('NONE', null, null, null, onDay);
    if (mode === 'PROMISE') {
      carrier = carrierOf(state, job);
      w = carrier ? computeWindow(state, carrier, onDay) : view('NONE', null, null, null, onDay);
      if (job.status === 'DONE') w = view('DONE', w.opens, w.idealUntil, w.missedAt, onDay);
      if (job.status === 'TODO' && has('jobs.' + job.type + '.unticked')) w.label = label('jobs.' + job.type + '.unticked', {}, w.label);
      w.loss = null;
      return w;
    }
    if (job.status === 'DONE') {
      w = c.clock === 'SHOW' && show ? computeWindow(state, { id: job.id, type: job.type, showId: job.showId, key: job.key, status: 'TODO' }, onDay) : null;
      return view('DONE', w ? w.opens : null, w ? w.idealUntil : null, w ? w.missedAt : null, onDay);
    }
    nd = needsOf(state, job);
    switch (c.clock) {
      case 'SHOW':
        if (!show) return view('NONE', null, null, null, onDay);
        ov = overrides(state, job);
        T = show.day - onDay;
        idealUntil = ov.i == null ? null : show.day - ov.i;
        missedAt = ov.m == null ? null : show.day - ov.m;
        opensDay = ov.o == null ? nd.day : (nd.day == null ? show.day - ov.o : Math.max(show.day - ov.o, nd.day));
        /* a job is never late before it could be done: a show booked short gets JOB_GRACE days from the day the job
         * became possible (its needs met, else the confirm), never past the night before the show */
        /* not confirmed yet: nothing is late, the grace runs from tonight (user 2026-11-22: "it says 2 is late even
           though i just started the game"). A show without a room is a rumor; its clock starts at the confirm. */
        exp = nd.day != null ? nd.day : (show.confirmedDay != null ? show.confirmedDay : onDay);
        graced = idealUntil != null && exp != null && idealUntil < exp + JOB_GRACE;
        if (graced) idealUntil = Math.max(idealUntil, Math.min(exp + JOB_GRACE, show.day - 1));
        /* 1.11 (D4): a show booked inside the job's ideal gets the staggered plan across its days left, so nothing is
         * called late (or due tomorrow) for days it never had. Fixed from the booking day, so the label moves once. */
        stg = SB.Config.JOB_STAGGER && SB.Config.JOB_STAGGER[job.type];
        if (stg && idealUntil != null && show.confirmedDay != null) {
          if (stg.by != null) k = Math.min(show.confirmedDay + stg.by, show.day - 1);
          else k = show.day - 1;
          if (k > idealUntil && idealUntil < show.confirmedDay + (stg.by != null ? stg.by : 3)) { idealUntil = k; graced = true; }
        }
        if (ov.m != null && T <= ov.m) st = 'MISSED';
        else if (!nd.met || (ov.o != null && T > ov.o)) st = 'EARLY';
        else if (idealUntil == null || onDay <= idealUntil) {
          fp = opensDay != null ? opensDay : (idealUntil != null ? idealUntil - 6 : onDay);
          len = idealUntil != null ? idealUntil - fp + 1 : 0;
          k = Math.max(1, Math.ceil(len / 3));
          st = (idealUntil != null && onDay > idealUntil - k) ? 'CLOSING' : 'OPEN';
        } else st = 'LATE';
        if (c.optional && st === 'LATE') st = 'OPEN';
        if (job.status === 'SKIPPED') st = 'MISSED';
        w = view(st, opensDay, idealUntil, missedAt, onDay);
        if (graced) w.graced = true;   // booked short: the on-time day is the grace, not the show's real schedule (Week.crunch)
        if (st === 'LATE' && c.group === 'TELLING' && SB.Forecast && SB.Forecast.jobLoss) w.loss = SB.Forecast.jobLoss(state, job.id, onDay);
        if (st === 'LATE' && !c.optional) w.lateCost = SB.text.label(c.group === 'TELLING' ? 'window.lateCostTell' : 'window.lateCost');   // 1.11: LATE always says what it costs
        return w;
      case 'REQUEST':
        req = state.requests ? state.requests[job.type === 'ANSWER_REQUEST' ? job.key : (show && show.requestId)] : null;
        if (!req || req.replyBy == null) return view('NONE', null, null, null, onDay);
        if (job.status === 'SKIPPED' || onDay > req.replyBy) st = 'MISSED';
        else st = onDay >= req.replyBy - 1 ? 'CLOSING' : 'OPEN';
        return view(st, req.day == null ? null : req.day, req.replyBy, req.replyBy + 1, onDay);
      case 'HOLD':
        if (!nd.met) return view('EARLY', null, null, null, onDay);
        if (!show || !show.hold) return view('NONE', null, null, null, onDay);
        if (show.hold.expires == null) return view('OPEN', null, null, null, onDay);
        exp = show.hold.expires;
        st = onDay > exp ? 'MISSED' : (onDay >= exp - 2 ? 'CLOSING' : 'OPEN');
        return view(st, null, exp, exp + 1, onDay);
      case 'CONFIRM':
        if (show && onDay >= show.day) return view('MISSED', null, null, show.day, onDay);
        if (job.status === 'SKIPPED') return view('MISSED', null, null, show ? show.day : null, onDay);
        if (!nd.met) return view('EARLY', null, null, show ? show.day : null, onDay);
        if (show && (show.status === 'CONFIRMED' || show.status === 'PLAYED')) return view('LATE', null, show.confirmedDay, show.day, onDay);
        return view('OPEN', null, null, show ? show.day : null, onDay);
      default:
        return view(job.status === 'SKIPPED' ? 'MISSED' : 'NONE', null, null, null, onDay);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Keeping a show's jobs in step (ensure)                              */
  /* ------------------------------------------------------------------ */

  function syncMessageJobs(state, show) {
    var day = today(state);
    (show.jobs || []).forEach(function (id) {
      var job = state.jobs[id], kinds, asks, settled = false, out = false, w;
      if (!job || cfg(job.type).mode !== 'MESSAGE') return;
      if (job.status === 'DONE' || job.status === 'MOOT') return;
      kinds = ASK_FOR[job.type];
      asks = kinds ? asksFor(state, show.id, kinds) : [];
      if (job.type === 'ASK_LOCALS') asks = asks.filter(function (a) { return job.key == null || a.toId === job.key; });
      if (job.type === 'VET_ASK_BOOKER') asks = (state.asks ? Object.keys(state.asks).map(function (k) { return state.asks[k]; }) : [])
        .filter(function (a) { return a.kind === 'CONTACT_VET' && a.payload && a.payload.requestId === job.key; });
      asks.forEach(function (a) { if (a.status === 'QUEUED' || a.status === 'SENT') out = true; });
      switch (job.type) {
        case 'HOLD_ROOM': settled = !!(show.roomId && (show.hold || show.status === 'CONFIRMED' || show.status === 'PLAYED')); break;
        case 'AGREE_TERMS': settled = !!(show.deal && show.deal.agreedDay != null); break;
        case 'ASK_LOCALS':
          if (job.key == null) { if (asks.length) { moot(job, 'NA'); return; } }
          else settled = asks.some(function (a) { return a.status === 'YES' || a.status === 'NO' || a.status === 'COUNTER' || a.status === 'WITHDRAWN'; });
          break;
        case 'CONFIRM_ROOM': settled = show.status === 'CONFIRMED' || show.status === 'PLAYED'; break;
        case 'LINE_UP_CREW':   /* sound, and security where the room needs it; the player works the door */
          settled = !!(show.crew && show.crew.sound && (show.crew.security || !(SB.Rooms.securityRequired && SB.Rooms.securityRequired(roomOf(state, show))))) || day >= show.day;
          break;
        case 'LODGING': settled = !!(show.crew && show.crew.lodging); break;
        case 'VET_ASK_BOOKER': settled = asks.some(function (a) { return a.answer != null; }); break;
        case 'ANSWER_REQUEST': settled = answered(state, job.key); out = out || replyQueued(state, job.key); break;
      }
      /* Config.JOBS gives AGREE_TERMS and CONFIRM_ROOM a need (HOLD_ROOM), while 7.15 lets a band say yes to terms
       * before any room is held. A message job whose own answer is in but whose needs are not yet DONE is not DONE:
       * it waits (WAITING) and settles on the ensure that finds its needs met. No job is ever DONE before its needs. */
      if (settled && !needsOf(state, job).met) { job.status = 'WAITING'; return; }
      if (settled) {
        /* L.5: the player's part of an ask is sending it, so it is on time or late by the day it went out, not by the
         * day the band wrote back (answers take 2 to 7 days and were reading as late jobs the player did on time) */
        var sentOn = day;
        asks.forEach(function (a) { if (a.sentDay != null && a.sentDay < sentOn && (a.status === 'YES' || a.status === 'NO' || a.status === 'COUNTER' || a.status === 'WITHDRAWN')) sentOn = a.sentDay; });
        w = computeWindow(state, job, job.type === 'ASK_LOCALS' ? sentOn : day);
        /* a replacement ask goes out because another band said no: it is on time when it goes out within the grace of
         * that no, whatever the show's calendar says */
        var repl = false;
        if (job.type === 'ASK_LOCALS' && (w.state === 'LATE' || w.state === 'MISSED')) {
          asksFor(state, show.id, ['BAND_PLAY']).forEach(function (a) {
            if (a.toId !== job.key && (a.status === 'NO' || a.status === 'WITHDRAWN') && a.hid && a.hid.answerDay != null && a.hid.answerDay <= sentOn && sentOn - a.hid.answerDay <= JOB_GRACE) repl = true;
          });
        }
        finishDone(state, job, day, !repl && (w.state === 'LATE' || w.state === 'MISSED') ? 'LATE' : 'ON_TIME', 'player');
        if (job.status === 'DONE' && job.type !== 'ANSWER_REQUEST') job.text = line(state, 'jobs.' + job.type + '.' + job.timing, textSlots(state, show, job, {}));
      } else if (job.status !== 'SKIPPED') job.status = out ? 'WAITING' : 'TODO';
    });
  }

  function answered(state, requestId) {
    var r = state.requests && state.requests[requestId];
    if (state.mail && state.mail.replied && state.mail.replied[requestId] != null) return true;
    return !!(r && r.status && r.status !== 'NEW' && r.status !== 'LAPSED' && r.status !== 'IGNORED');
  }
  function replyQueued(state, requestId) {
    var out = state.mail && state.mail.out ? state.mail.out : [];
    return out.some(function (o) { return o.requestId === requestId; });
  }

  function syncPlanned(state, show) {
    (show.jobs || []).forEach(function (id) {
      var job = state.jobs[id];
      if (!job) return;
      if (job.status === 'TODO' && plannedItem(state, id)) job.status = 'PLANNED';
      else if (job.status === 'PLANNED' && !plannedItem(state, id)) job.status = 'TODO';
    });
  }

  function ensure(state, showId) {
    var show = getShow(state, showId, 'Jobs.ensure'), room, fam, deal, bandAsks, asked = {}, covered, req, j, trusted, loose;
    jobsOf(state);
    if (!show.jobs) show.jobs = [];
    if (show.status === 'CANCELLED') { (show.jobs || []).forEach(function (id) { if (state.jobs[id]) moot(state.jobs[id], 'NA'); }); return; }
    room = roomOf(state, show);
    fam = familiarRoom(state, show);
    deal = show.deal || {};

    /* getting the show */
    if (show.requestId) {
      loose = looseFor(state, show.requestId);
      j = find(state, show, 'ANSWER_REQUEST', show.requestId);
      if (!j) {
        j = loose.ANSWER_REQUEST || null;
        if (j) { j.showId = show.id; show.jobs.push(j.id); }
        else make(state, 'ANSWER_REQUEST', show, show.requestId, answered(state, show.requestId) ? 'DONE' : 'TODO');
      }
      req = state.requests ? state.requests[show.requestId] : null;
      ['VET_LISTEN', 'VET_CLIP', 'VET_HISTORY', 'VET_ASK_AROUND', 'VET_ASK_BOOKER'].forEach(function (t) {
        var lj = loose[t] || null;
        if (lj && lj.showId == null) { lj.showId = show.id; show.jobs.push(lj.id); }
      });
    }
    want(state, show, 'HOLD_ROOM', null, true);
    want(state, show, 'AGREE_TERMS', null, !!show.requestId);
    bandAsks = asksFor(state, show.id, ['BAND_PLAY']);
    bandAsks.forEach(function (a) { asked[a.toId] = true; });
    Object.keys(asked).forEach(function (b) { want(state, show, 'ASK_LOCALS', b, true); });
    want(state, show, 'ASK_LOCALS', null, bandAsks.length === 0);   // SPEC?: a placeholder so "ask the locals" has a window before the first ask
    j = want(state, show, 'LOCK_BILL', null, true);
    if (j && LIVE[j.status] && show.bill && show.bill.locked) finishDone(state, j, show.bill.lockedDay != null ? show.bill.lockedDay : today(state), 'ON_TIME', null);   // locked by someone else (an event)
    want(state, show, 'CONFIRM_ROOM', null, true);

    /* telling people */
    want(state, show, 'MAKE_FLYER', null, true);
    want(state, show, 'ANNOUNCE', null, true);
    want(state, show, 'BANDS_SHARE', null, true);
    want(state, show, 'PRINT', null, true);
    covered = coveredRoutes(state, show);
    routes(state).forEach(function (r) { want(state, show, 'FLYER_RUN', r.id, covered.indexOf(r.id) >= 0); });
    allOf(state, show, 'FLYER_RUN').forEach(function (fj) {
      if (isAgain(fj.key) && covered.indexOf(routeKey(fj.key)) < 0) moot(fj, 'NA');
    });
    want(state, show, 'LISTINGS', null, true);
    want(state, show, 'LOCAL_AD', null, true);
    want(state, show, 'MAILING_LIST', null, true);
    want(state, show, 'HAND_OUT', null, true);
    want(state, show, 'INVITES', 1, true);
    want(state, show, 'INVITES', 2, true);
    want(state, show, 'WEEK_PUSH', null, true);
    want(state, show, 'DAY_OF_POST', null, true, 'PROMISED');

    /* making it run */
    want(state, show, 'LINE_UP_CREW', null, true);
    want(state, show, 'SORT_GEAR', null, true, 'PROMISED');
    j = want(state, show, 'HOUSE_RULES', null, true, state.player && state.player.houseRules ? 'PROMISED' : 'TODO');
    if (j && j.status === 'TODO' && state.player && state.player.houseRules && !plannedItem(state, j.id)) j.status = 'PROMISED';
    if (fam) waive(state, j, 'ROOM', show);
    j = want(state, show, 'NEIGHBORS', null, !!(room && C.JOBS.NEIGHBORS.kinds.indexOf(room.kind) >= 0));
    if (j && fam) waive(state, j, 'ROOM', show);
    want(state, show, 'ADVANCE', null, true);
    want(state, show, 'LODGING', null, !!deal.lodging);
    j = want(state, show, 'DAY_BEFORE', null, true, 'PROMISED');
    trusted = confirmedSlots(show);
    if (j && trusted.length && trusted.every(function (s) { return bandTrust(state, s.bandId) >= C.FAMILIAR.bandTrust; })) waive(state, j, 'BAND', show);
    want(state, show, 'FOOD', null, !!deal.meal, 'PROMISED');

    /* the night and after */
    want(state, show, 'RUN_SHOW', null, true);
    want(state, show, 'THANKS', null, true);
    want(state, show, 'DEBRIEF', null, true);

    syncMessageJobs(state, show);
    syncPlanned(state, show);
    scheduleShares(state, show, today(state));
  }

  /* findLoose for the request's own job types at once: one pass over the jobs, the first match of each type (the same
   * job findLoose would return for it) */
  var LOOSE_TYPES = { ANSWER_REQUEST: 1, VET_LISTEN: 1, VET_CLIP: 1, VET_HISTORY: 1, VET_ASK_AROUND: 1, VET_ASK_BOOKER: 1 };
  function looseFor(state, key) {
    var out = {}, k, j;
    for (k in state.jobs) { j = state.jobs[k]; if (j.key === key && LOOSE_TYPES[j.type] === 1 && j.status !== 'MOOT' && !out[j.type]) out[j.type] = j; }
    return out;
  }

  function findLoose(state, type, key) {
    var k, j;
    for (k in state.jobs) { j = state.jobs[k]; if (j.type === type && j.key === key && j.status !== 'MOOT') return j; }
    return null;
  }

  /* ---- bands sharing the flyer (7.5): scheduled once both the flyer and the announcement exist ---- */
  function scheduleShares(state, show, day) {
    var job = find(state, show, 'BANDS_SHARE'), promo = show.promo || {}, base;
    if (!job || job.status === 'MOOT' || !promo.flyer || promo.announce == null) return;
    if (!job.due) job.due = {};
    base = Math.max(promo.announce, promo.flyer.day || 0, day);
    confirmedSlots(show).forEach(function (s) {
      var b = bandOf(state, s.bandId), p, d;
      if (Object.prototype.hasOwnProperty.call(job.due, s.bandId)) return;
      if (promo.shares && promo.shares[s.bandId] != null) { job.due[s.bandId] = promo.shares[s.bandId]; return; }
      p = b && b.hid && typeof b.hid.promo === 'number' ? b.hid.promo : 0.5;
      if (b && b.local && bandTrust(state, s.bandId) >= C.FAMILIAR.bandTrust) d = base + 1;
      else if (p < 0.2) d = null;
      else d = base + Math.round(2 + 10 * (1 - p));
      job.due[s.bandId] = d;
    });
  }

  function advanceShares(state, show, day) {
    var job = find(state, show, 'BANDS_SHARE'), all = true, any = false;
    if (!job || !LIVE[job.status] || !job.due) return;
    if (!show.promo) return;
    if (!show.promo.shares) show.promo.shares = {};
    confirmedSlots(show).forEach(function (s) {
      var d = job.due[s.bandId];
      if (d === undefined) { all = false; return; }
      if (d !== null && d <= day && show.promo.shares[s.bandId] == null && d <= show.day) { show.promo.shares[s.bandId] = d; any = true; }
      if (d !== null && show.promo.shares[s.bandId] == null) all = false;
    });
    if (any && !job.waived) {
      if (confirmedSlots(show).some(function (s) { var b = bandOf(state, s.bandId); return b && b.local && job.due[s.bandId] === Math.max(show.promo.announce, show.promo.flyer ? show.promo.flyer.day : 0) + 1 && bandTrust(state, s.bandId) >= C.FAMILIAR.bandTrust; })) job.waived = 'BAND';
    }
    if (all && confirmedSlots(show).length) {
      finishDone(state, job, day, 'ON_TIME', null);
      job.text = line(state, 'jobs.BANDS_SHARE.ON_TIME', textSlots(state, show, job, {}));
    }
  }

  /* ------------------------------------------------------------------ */
  /* refreshAll                                                          */
  /* ------------------------------------------------------------------ */

  function refreshAll(state) {
    var day = today(state), k, show, job, req, w, ids;
    jobsOf(state);
    /* a request waiting for an answer has its job, with or without a show */
    if (state.requests) for (k in state.requests) {
      req = state.requests[k];
      if (req.status === 'NEW' && !findLoose(state, 'ANSWER_REQUEST', req.id)) make(state, 'ANSWER_REQUEST', null, req.id, 'TODO');
    }
    if (state.shows) for (k in state.shows) {
      show = state.shows[k];
      if (SHOW_LIVE[show.status] || (show.status === 'PLAYED' && show.day >= day - 14) ||
          (show.status === 'CANCELLED' && (show.jobs || []).some(function (id) { return state.jobs[id] && LIVE[state.jobs[id].status]; }))) {
        ensure(state, show.id);
        if (show.status !== 'CANCELLED') advanceShares(state, show, day);
      }
    }
    ids = Object.keys(state.jobs);
    ids.forEach(function (id) {
      job = state.jobs[id];
      if (!LIVE[job.status]) return;
      var c = cfg(job.type);
      show = showOf(state, job);
      /* jobs with no show: requests that went away, other shows already played */
      if (!show) {
        if (job.type === 'ANSWER_REQUEST' || VET_ACTION[job.type]) {
          req = state.requests ? state.requests[job.key] : null;
          if (job.type === 'ANSWER_REQUEST' && req && answered(state, req.id)) { finishDone(state, job, day, 'ON_TIME', 'player'); return; }
          if (!req || req.status === 'PASSED' || req.status === 'WITHDRAWN' || req.status === 'IGNORED' || req.status === 'LAPSED') {
            if (job.type === 'ANSWER_REQUEST' && req && (req.status === 'LAPSED' || req.status === 'IGNORED')) skip(state, job, day);
            else moot(job, 'NA');
            return;
          }
        }
        if (job.type === 'ANSWER_REQUEST') {
          w = computeWindow(state, job, day);
          if (w.state === 'MISSED') skip(state, job, day);
        }
        if (job.type === 'GO_TO_SHOW' && job.key) {
          var os = otherShow(state, job.key);
          if (!os || os.day < day) moot(job, 'MISSED');
        }
        return;
      }
      if (show.status === 'CANCELLED') { moot(job, 'NA'); return; }
      if (ridesOn(state, job)) return;                                        // a promise follows its carrier
      if (c.mode === 'MESSAGE' && c.clock !== 'SHOW' && job.type !== 'ANSWER_REQUEST') return;   // follows the asks
      if (c.mode === 'AUTO' && job.type === 'RUN_SHOW') return;               // Week.step resolves it on the night
      w = computeWindow(state, job, day);
      if (w.state !== 'MISSED') return;
      if (c.optional) { moot(job, 'MISSED'); return; }
      skip(state, job, day);
    });
  }

  function skip(state, job, day) {
    var show = showOf(state, job);
    if (!LIVE[job.status]) return;
    job.status = 'SKIPPED';
    job.timing = 'SKIPPED';
    job.text = line(state, 'jobs.' + job.type + '.SKIPPED', show ? textSlots(state, show, job, {}) : looseSlots(state, job));
    if (job.type === 'ADVANCE' || job.type === 'RUN_SHOW') ridersOf(state, job).forEach(function (r) { skip(state, r, day); });
  }

  /* ------------------------------------------------------------------ */
  /* Text slots for job lines (03-content 6)                             */
  /* ------------------------------------------------------------------ */

  function billingOf(state, show) {
    var b = show.bill && show.bill.billing && show.bill.billing.length ? show.bill.billing.slice() : null, slots;
    slots = show.bill && show.bill.slots ? show.bill.slots : [];
    if (b) return b.filter(function (id) { return slots.some(function (s) { return s.bandId === id; }); });
    /* no billing order written: the flyer lists the set order from the top, the headliner (the last slot) first and biggest,
     * the way the mentor and the night run it (fix-list 3.8: the flyer must not name the opener first) */
    return slots.slice().reverse().map(function (s) { return s.bandId; });
  }
  function topBandName(state, show) {
    var b = billingOf(state, show)[0], band = b ? bandOf(state, b) : null;
    return band ? band.name : null;
  }
  function priceLine(show) {
    var d = show.door || {};
    if (d.donation) return 'donation' + (d.suggested ? ' (' + SB.text.money(d.suggested) + ')' : '');
    return d.price ? SB.text.money(d.price) : 'free';
  }
  var DAY_WORDS = ['no days', 'a day', 'two days', 'three days', 'four days', 'five days', 'six days', 'seven days', 'eight days', 'nine days', 'ten days', 'eleven days', 'twelve days', 'thirteen days'];
  /* "weeks to go" only when there are weeks; else the days */
  function leadPhrase(n) { return n >= 14 ? 'weeks to go' : (n <= 0 ? 'no days to go' : DAY_WORDS[n] + ' to go'); }

  var NUM_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  function billLine(n) { return n <= 0 ? 'bands TBA' : n === 1 ? 'one band' : (NUM_WORDS[n] || String(n)) + ' bands'; }
  function allBands(n) { return n <= 1 ? (n === 1 ? 'The band' : 'The bands') : n === 2 ? 'Both bands' : 'All ' + (NUM_WORDS[n] || n) + ' bands'; }

  /* the slots a loose job (a look-up, an answer) can fill with no show behind it: the band it is about */
  function looseSlots(state, job) {
    var rq = job && LOOSE_TYPES[job.type] === 1 && state.requests ? state.requests[job.key] : null, b = rq ? bandOf(state, rq.bandId) : null;
    return b ? { band: b.name } : {};
  }
  function textSlots(state, show, job, extra) {
    var room = roomOf(state, show), t = SB.time.date(show.day), r, slots, k, slotsList = show.bill && show.bill.slots ? show.bill.slots : [];
    var closer = slotsList.length ? bandOf(state, slotsList[slotsList.length - 1].bandId) : null;
    r = job && job.type === 'FLYER_RUN' ? routeById(state, routeKey(job.key)) : null;
    slots = {
      bookingName: state.player ? state.player.bookingName : null,
      band: topBandName(state, show), bands: slotsList.length,
      room: room ? room.name : null, dow: SB.time.fmt(show.day, 'dow'), date: t.d,
      dateLong: SB.time.fmt(show.day, 'dow') + ' the ' + SB.text.ordinal(t.d),
      daysOut: show.day - today(state), hours: job ? hoursOf(state, job) : null,
      priceLine: priceLine(show), agesLine: show.door && show.door.ages ? SB.text.label('ages.' + show.door.ages) : null,
      route: r ? (r.name || r.id) : null, spots: r && r.spots ? r.spots.map(function (s) { return s.label; }).join(', ') : null,
      host: room ? personName(state, room.ownerId) : null,
      sound: show.crew && show.crew.sound ? personName(state, show.crew.sound) : null,
      security: show.crew && show.crew.security ? personName(state, show.crew.security) : null,
      closer: closer ? closer.name : null,
      times: show.bill && show.bill.times && show.bill.times.length ? show.bill.times.map(SB.time.clock).join(', ') : null,
      curfew: room && room.curfew ? SB.time.clock(room.curfew) : null,
      house: !!(room && room.kind === 'HOUSE'), bar: !!(room && room.kind === 'BAR'), hall: !!(room && room.kind === 'HALL'),
      touring: slotsList.some(function (s) { return s.role === 'TOURING'; }),
      askAPunk: !!(show.door && show.door.address === 'ASK'), addressOut: !!(show.door && show.door.address === 'FULL'),
      firstTime: false, homeCost: dollars(state, (C.FOOD || { HOME: { cost: 15 } }).HOME.cost), outCost: dollars(state, (C.FOOD || { OUT: { cost: 40 } }).OUT.cost), home: !!(job && job.type === 'FOOD' && job.opt !== 'OUT'), out: !!(job && job.type === 'FOOD' && job.opt === 'OUT'),
      /* 3.1: the calendar words follow the real days left, so a ten-day show never says weeks */
      weeksOut: show.day - today(state) >= 14, lead: leadPhrase(show.day - today(state)),
      /* 3.2: never "no bands" or "one bands" */
      billLine: billLine(slotsList.length), tbaNote: slotsList.length ? '' : ' The bands get written in when they say yes.',
      allBands: allBands(slotsList.length), bandCount: slotsList.length ? billLine(slotsList.length) : 'no bands yet'
    };
    /* read only by the lines that say "the first time"; the scan of every job is paid when one of them asks */
    Object.defineProperty(slots, 'firstTime', { enumerable: true, configurable: true, get: function () {
      var id, o;
      if (!job) return false;
      for (id in state.jobs) { o = state.jobs[id]; if (o.id !== job.id && o.type === job.type && o.status === 'DONE' && !o.waived) return false; }
      return true;
    } });
    /* the band a looking-up job is about is the requester, not whoever tops the bill (and may be all there is) */
    var lb = looseSlots(state, job);
    if (lb.band) slots.band = lb.band;
    var sq = show.requestId && state.requests ? state.requests[show.requestId] : null;
    if (sq) {
      if (!slots.band && bandOf(state, sq.bandId)) slots.band = bandOf(state, sq.bandId).name;
      if (sq.ask && sq.ask.members) slots.n = sq.ask.members;
    }
    if (slots.n == null) slots.n = show.deal && show.deal.members ? show.deal.members : 4;
    /* the print lines name how many copies and what they cost: from the size the job used (the usual when none was picked) */
    if (job && job.type === 'PRINT') {
      var pr = C.FLYER.PRINT[job.opt] || C.FLYER.PRINT[C.USUAL.print] || C.FLYER.PRINT.USUAL;
      slots.copies = pr.copies; slots.cost = pr.cost;
    }
    for (k in extra) slots[k] = extra[k];
    return slots;
  }

  /* ------------------------------------------------------------------ */
  /* Views                                                              */
  /* ------------------------------------------------------------------ */

  function catalog(type) {
    var c = cfg(type);
    return { type: type, mode: c.mode, group: c.group, hours: c.hours, half: c.half, helper: c.helper || null,
             label: label('jobs.' + type + '.label', {}, type), why: label('jobs.' + type + '.why', {}, '') };
  }

  function optMenu(state, job, show) {
    var c = cfg(job.type), kind = c.opt, keys, chosen, plan = plannedItem(state, job.id), T = show ? show.day - today(state) : null;
    if (!kind) return null;
    keys = kind === 'PRINT_RUN' ? Object.keys(E.PRINT_RUN) : (kind === 'PUSH' ? Object.keys(E.PUSH) : Object.keys(E.AD));
    chosen = (plan && plan.opt) || job.opt || (kind === 'PRINT_RUN' ? C.USUAL.print : null);
    return { kind: kind, chosen: chosen, choices: keys.map(function (k) {
      var cost = optCost(state, job.type, k), ok = SB.Money && SB.Money.canCover ? SB.Money.canCover(state, cost) : true, why = null, base, lab;
      if (!ok) why = SB.text.label('refuse.NO_MONEY');
      if (kind === 'AD' && T !== null && T < C.CHANNELS.LOCAL_AD[k].deadline) { ok = false; why = SB.text.label('refuse.WINDOW'); }
      base = 'jobs.' + (job.type === 'WEEK_PUSH' ? 'ANNOUNCE' : job.type) + '.opts.' + k + '.label';
      lab = label(base, { cost: cost, deadline: kind === 'AD' ? C.CHANNELS.LOCAL_AD[k].deadline : null },
                  label((kind === 'PRINT_RUN' ? 'printRun.' : kind === 'PUSH' ? 'push.' : 'ad.') + k, {}, k));
      return { key: k, label: lab, cost: cost, chips: cost ? [{ k: 'MONEY', v: -cost, who: null }] : [], enabled: ok, why: why };
    }) };
  }

  function optCost(state, type, key) {
    if (!key) return 0;
    if (type === 'PRINT' && C.FLYER.PRINT[key]) return dollars(state, C.FLYER.PRINT[key].cost);
    if ((type === 'ANNOUNCE' || type === 'WEEK_PUSH') && C.CHANNELS.PAID_PUSH[key]) return dollars(state, C.CHANNELS.PAID_PUSH[key].cost);
    if (type === 'LOCAL_AD' && C.CHANNELS.LOCAL_AD[key]) return dollars(state, C.CHANNELS.LOCAL_AD[key].cost);
    return 0;
  }

  /* 1.12: the jobs kept behind "more ways to get the word out" until the show-one extras come in (D1: promoOptional) */
  var MORE_TYPES = { LISTINGS: 1, LOCAL_AD: 1, MAILING_LIST: 1, HAND_OUT: 1 };
  function isMore(state, job) {
    var show, runs, first;
    if (!job.showId || (SB.Rungs && SB.Rungs.shows(state, 'promoOptional'))) return false;
    if (MORE_TYPES[job.type]) return true;
    if (job.type === 'INVITES') return String(job.key) === '2';
    if (job.type === 'FLYER_RUN') {
      show = state.shows && state.shows[job.showId];
      if (!show) return false;
      runs = (show.jobs || []).map(function (id) { return state.jobs[id]; }).filter(function (j) { return j && j.type === 'FLYER_RUN' && j.status !== 'MOOT' && !isAgain(j.key); });
      first = runs.length ? runs.sort(function (a, b) { return a.id < b.id ? -1 : 1; })[0] : null;
      return !!first && first.id !== job.id;
    }
    return false;
  }
  /* 1.12 step 4: "needs 2 hrs, you have 1" before the press, for a job that is the player's own and will not fit tonight */
  function fitNote(state, job, status, onDay) {
    var r, h;
    if (status !== 'TODO' || modeOf(state, job) !== 'HOURS' || (onDay != null && onDay !== today(state)) || !state.week || !SB.Week || !SB.Week.fits) return null;
    try {
      h = hoursOf(state, job);
      if (!(h > 0)) return null;
      r = SB.Week.fits(state, h);
    } catch (e) { return null; }
    if (!r || r.ok !== false || r.code !== 'NO_TIME') return null;
    return label('jobs.notice.noFit', { need: hrs(h), left: hrs(typeof r.left === 'number' ? r.left : 0) }, '');
  }
  function hrs(n) { return n === 0.5 ? 'half an hour' : (n === 1 ? '1 hr' : n + ' hrs'); }
  /* 1.12 step 2: what a greyed job waits on, by name */
  function blockerLine(nd) {
    var m = nd.missing && nd.missing[0];
    return m ? label('jobs.blocker.' + m, {}, label('jobs.' + m + '.label', {}, '')) : '';
  }

  function jobView(state, job, onDay) {
    var c = cfg(job.type), show = showOf(state, job), mode = modeOf(state, job), plan = plannedItem(state, job.id),
        status = job.status, nd = needsOf(state, job), riders = [], helperOk, slots, cov = coveredJob(state, job),
        coverBy = cov ? SB.Rungs.mentor(state) : null, win = computeWindow(state, job, onDay == null ? today(state) : onDay);
    if (status === 'TODO' && plan) status = 'PLANNED';
    if (job.type === 'ADVANCE' || job.type === 'RUN_SHOW') riders = ridersOf(state, job).map(function (r) { return jobView(state, r, onDay); });
    helperOk = !!c.helper && stage(state) >= (c.helperStage || C.STAGE_HELPERS);
    slots = show ? textSlots(state, show, job, {}) : looseSlots(state, job);
    return {
      id: job.id, type: job.type, group: c.group, mode: mode, showId: job.showId, key: job.key,
      /* the same route twice (the early run gets covered) reads as the second run, not a copy of the first */
      label: label('jobs.' + job.type + ((job.type === 'FLYER_RUN' && /#2$/.test(job.key || '')) || (job.type === 'INVITES' && String(job.key) === '2') ? '.labelAgain' : '.label'), slots, job.type), why: label('jobs.' + job.type + '.why', slots, ''),
      hours: hoursOf(state, job), half: c.half, status: status, timing: job.timing, by: job.by || (plan ? plan.by : null),
      byName: (job.by || (plan && plan.by)) && (job.by || plan.by) !== 'player' ? personName(state, job.by || plan.by) : null,
      planned: plan ? { dayIdx: plan.dayIdx, half: plan.half, by: plan.by } : null,
      rides: ridesOn(state, job), riders: riders, optional: !!c.optional, waived: job.waived || null,
      opt: job.type === 'FOOD' ? foodMenu(state, job) : optMenu(state, job, show),
      window: win, due: win.idealUntil == null ? null : win.idealUntil,   // due: the last on-time day, as a day number (spec 10)
      needs: nd.list, helper: c.helper || null, helperOk: helperOk,
      cost: c.cost ? { lo: dollars(state, c.cost[0]), hi: dollars(state, c.cost[1]) } : null,
      text: job.text, covered: cov, coveredBy: coverBy, coveredName: coverBy ? personName(state, coverBy) : null,
      hidden: !!(SB.Rungs && SB.Rungs.hides(state, job.type)),
      more: isMore(state, job),
      blocker: nd.met ? '' : blockerLine(nd),
      reach: label('jobs.reach.' + job.type, {}, ''),
      noFit: fitNote(state, job, status, onDay)
    };
  }

  function get(state, jobId) { return jobView(state, getJob(state, jobId, 'Jobs.get')); }

  function forShow(state, showId) {
    var show = getShow(state, showId, 'Jobs.forShow');
    return (show.jobs || []).map(function (id) { return state.jobs[id]; }).filter(Boolean)
      .sort(function (a, b) { return ORDER.indexOf(a.type) - ORDER.indexOf(b.type) || (a.id < b.id ? -1 : 1); })
      .map(function (j) { return jobView(state, j); });
  }

  function tray(state) {
    var day = today(state), weekEnd = (state.clock && typeof state.clock.week === 'number' ? state.clock.week * 7 : day) + 6,
        out = { late: [], thisWeek: [], soon: [], later: [] };
    Object.keys(jobsOf(state)).forEach(function (id) {
      var job = state.jobs[id], mode = modeOf(state, job), v, w;
      if (!LIVE[job.status] || job.status === 'WAITING') return;
      if (mode === 'PROMISE' || mode === 'AUTO') return;
      if (SB.Rungs && SB.Rungs.hides(state, job.type)) return;
      if (mode === 'MESSAGE' && job.status !== 'TODO') return;
      v = jobView(state, job, day); w = v.window;
      if (w.state === 'LATE' && !v.optional) out.late.push(v);
      else if (w.state === 'EARLY') { if (w.opens != null && w.opens <= day + 14) out.soon.push(v); else out.later.push(v); }
      else if (w.state === 'MISSED') return;
      else if (w.idealUntil == null || w.idealUntil <= weekEnd) out.thisWeek.push(v);
      else out.later.push(v);
    });
    ['late', 'thisWeek', 'soon', 'later'].forEach(function (k) {
      out[k].sort(function (a, b) {
        var da = a.window.idealUntil == null ? 1e9 : a.window.idealUntil, db = b.window.idealUntil == null ? 1e9 : b.window.idealUntil;
        return da - db || (a.id < b.id ? -1 : 1);
      });
    });
    return out;
  }

  function otherShow(state, id) {
    var list = state.otherShows || [], i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function freeJobs(state) {
    var day = today(state), out = [], k, req, show, seen = {};
    function entry(type, args, key) {
      var c = cfg(type);
      return { type: type, args: args, label: label('jobs.' + type + '.label', {}, type), hours: c.hours, half: c.half, key: key };
    }
    Object.keys(jobsOf(state)).forEach(function (id) {
      var j = state.jobs[id]; if (j.status !== 'MOOT') seen[j.type + '|' + j.key] = true;
    });
    /* shows to go to */
    (SB.Rooms && SB.Rooms.otherShows ? SB.Rooms.otherShows(state, day, day + 13) : []).forEach(function (o) {
      if (!seen['GO_TO_SHOW|' + o.id]) out.push(entry('GO_TO_SHOW', { otherShowId: o.id }, o.id));
    });
    /* people to visit: owners of rooms the player is waiting on, and owners who do not know the player yet */
    if (state.asks) for (k in state.asks) {
      var a = state.asks[k], room;
      if ((a.kind === 'ROOM_HOLD' || a.kind === 'ROOM_CONFIRM') && (a.status === 'QUEUED' || a.status === 'SENT')) {
        room = state.rooms ? state.rooms[a.toId] : null;
        if (room && room.ownerId && !seen['VISIT|' + room.ownerId]) { out.push(entry('VISIT', { personId: room.ownerId, askId: a.id }, room.ownerId)); seen['VISIT|' + room.ownerId] = true; }
      }
    }
    if (state.rooms) for (k in state.rooms) {
      var r = state.rooms[k];
      if (r.open !== false && r.ownerId && (r.ownerRel || 0) < C.OWNER.stranger && !seen['VISIT|' + r.ownerId]) {
        out.push(entry('VISIT', { personId: r.ownerId, askId: null }, r.ownerId)); seen['VISIT|' + r.ownerId] = true;
      }
    }
    /* vetting open on requests */
    if (state.requests) for (k in state.requests) {
      req = state.requests[k];
      if (req.status !== 'NEW' && req.status !== 'REPLIED' && req.status !== 'NEGOTIATING') continue;
      ['VET_LISTEN', 'VET_CLIP', 'VET_HISTORY', 'VET_ASK_AROUND'].forEach(function (t) {
        if (req.vetted && req.vetted[VET_ACTION[t]] != null) return;
        if (seen[t + '|' + req.id]) return;
        out.push(entry(t, { requestId: req.id }, req.id));
      });
    }
    /* a second run of a route that has gone stale */
    if (state.shows) for (k in state.shows) {
      show = state.shows[k];
      if (!SHOW_LIVE[show.status] || !show.promo || !show.promo.runs) continue;
      Object.keys(show.promo.runs).forEach(function (route) {
        var run = show.promo.runs[route];
        if (run.again != null || seen['FLYER_RUN|' + route + '#2']) return;
        if (day - run.day < C.CHANNELS.FLYER_STALE.after || day >= show.day) return;
        out.push(entry('FLYER_RUN', { showId: show.id, route: route }, route + '#2'));
      });
    }
    return out.map(function (e) { var r = { type: e.type, args: e.args, label: e.label, hours: e.hours, half: e.half }; return r; });
  }

  function windowView(state, jobId, onDay) {
    return computeWindow(state, getJob(state, jobId, 'Jobs.window'), onDay == null ? today(state) : onDay);
  }

  function canDo(state, jobId, day, half) {
    var job = getJob(state, jobId, 'Jobs.canDo'), c = cfg(job.type), w, nd, show = showOf(state, job), missing;
    if (modeOf(state, job) !== 'HOURS') return U.no('INVALID', SB.text.label('refuse.INVALID'));
    if (!LIVE[job.status]) return U.no('ALREADY', SB.text.label('refuse.ALREADY'));
    if (state.player && state.player.burnoutUntil != null && state.player.burnoutUntil > day) return U.no('BURNT_OUT', SB.text.label('refuse.BURNT_OUT'));
    /* a job's half no longer restricts the player: the day is one pool of hours (spec 10) */
    nd = needsOf(state, job);
    if (!nd.met) {
      /* names the missing job: `missing` is its type ('BANDS' when LOCK_BILL lacks two confirmed bands), `missingLabel` its name */
      missing = nd.missing[0];
      var no = U.no('NEEDS', missing === 'BANDS' && job.type !== 'LOCK_BILL' ? label('jobs.notice.needBands', {}, SB.text.label('refuse.NEEDS')) : (blockerLine(nd) || SB.text.label('refuse.NEEDS')));
      no.missing = missing;
      no.missingLabel = missing === 'BANDS' ? null : label('jobs.' + missing + '.label', {}, missing);
      return no;
    }
    w = computeWindow(state, job, day);
    if (w.state === 'EARLY' || w.state === 'MISSED') return U.no('WINDOW', SB.text.label('refuse.WINDOW'));
    if (job.type === 'HAND_OUT' && !handoutShow(state, show, day)) return U.no('WINDOW', SB.text.label('refuse.WINDOW'));
    if (job.type === 'GO_TO_SHOW') { var os = otherShow(state, job.key); if (!os || os.day !== day) return U.no('WINDOW', SB.text.label('refuse.WINDOW')); }
    return U.yes();
  }

  /* The other show the player hands flyers out at: the best fit that night. SPEC?: HAND_OUT has no argument naming the
   * other show, so it is chosen when the job runs, from the shows of that night the player can see. */
  function handoutShow(state, show, day) {
    var list = SB.Rooms && SB.Rooms.otherShows ? SB.Rooms.otherShows(state, day, day) : [], best = null, bestA = -1, top, lens;
    if (!list.length || !show) return null;
    top = billingOf(state, show)[0];
    top = top && bandOf(state, top) ? bandOf(state, top).genre : null;
    list.forEach(function (o) {
      var a = 0;
      if (top && o.genres && o.genres.length && SB.Model && SB.Model.affinity) {
        lens = lens || SB.Forecast.lens(state, 'CALL', {});
        a = SB.Model.affinity(state, o.genres[0], top, 1, lens);
      }
      if (a > bestA) { bestA = a; best = o; }
    });
    return best ? { show: best, aff: bestA < 0 ? 0 : bestA } : null;
  }

  function promise(state, jobId, on, opt) {
    var job = getJob(state, jobId, 'Jobs.promise'), carrier;
    if (modeOf(state, job) !== 'PROMISE') return U.no('INVALID', SB.text.label('refuse.INVALID'));
    if (job.waived) return U.no('ALREADY', SB.text.label('refuse.ALREADY'));
    carrier = carrierOf(state, job);
    if (carrier && !LIVE[carrier.status]) return U.no('LOCKED', SB.text.label('refuse.LOCKED'));
    if (!LIVE[job.status]) return U.no('ALREADY', SB.text.label('refuse.ALREADY'));
    /* a rider with hours on tonight's own show takes tonight's clock */
    if (on && job.status !== 'PROMISED' && carrier && SB.Week && SB.Week.eveningOpen && state.shows && state.shows[job.showId] &&
        state.shows[job.showId].day === today(state) && SB.Week.eveningOpen(state)) {
      var h = hoursOf(state, job), fit;
      if (h > 0 && SB.Week.fits) { fit = SB.Week.fits(state, h); if (!fit.ok) return U.no('NO_TIME', fit.text || SB.text.label('refuse.NO_TIME')); }
    }
    if (job.type === 'FOOD' && on) {
      if (opt && C.FOOD && C.FOOD[opt]) job.opt = opt;
      else if (!job.opt || !(C.FOOD && C.FOOD[job.opt])) job.opt = 'HOME';
    }
    job.status = on ? 'PROMISED' : 'TODO';
    return U.yes({ status: job.status });
  }

  /* ------------------------------------------------------------------ */
  /* add / drop: jobs that are not on a show's checklist                 */
  /* ------------------------------------------------------------------ */

  function add(state, type, args) {
    var c = cfg(type), show = null, key = null, job, req, run, count;
    args = args || {};
    jobsOf(state);
    switch (type) {
      case 'GO_TO_SHOW':
        if (!otherShow(state, args.otherShowId)) SB.fail('Jobs.add', 'unknown other show "' + args.otherShowId + '"');
        key = args.otherShowId; break;
      case 'VISIT':
        if (!personOf(state, args.personId) && SB.People && !SB.People.get(state, args.personId)) SB.fail('Jobs.add', 'unknown person "' + args.personId + '"');
        key = args.personId; break;
      case 'VET_LISTEN': case 'VET_CLIP': case 'VET_HISTORY': case 'VET_ASK_AROUND':
        req = state.requests ? state.requests[args.requestId] : null;
        if (!req) SB.fail('Jobs.add', 'unknown request "' + args.requestId + '"');
        if (req.vetted && req.vetted[VET_ACTION[type]] != null) return U.no('ALREADY', SB.text.label('refuse.ALREADY'));
        key = args.requestId;
        show = showForRequest(state, args.requestId);
        break;
      case 'VET_ASK_BOOKER':
        key = args.requestId; show = showForRequest(state, args.requestId); break;
      case 'EXTRA_SHIFT': key = null; break;
      case 'HARM_ASK':
        count = Object.keys(state.jobs).filter(function (id) { return state.jobs[id].type === 'HARM_ASK' && state.jobs[id].status !== 'MOOT'; }).length;
        key = count + 1; break;
      case 'HARM_WORD': key = args.bandId || null; break;
      case 'TOUR_ROUTE': case 'TOUR_ADVANCE': key = args.tourId; break;
      case 'FLYER_RUN':
        show = getShow(state, args.showId, 'Jobs.add');
        run = show.promo && show.promo.runs ? show.promo.runs[args.route] : null;
        if (!run) return U.no('NEEDS', SB.text.label('refuse.NEEDS'));
        if (run.again != null || find(state, show, 'FLYER_RUN', args.route + '#2') && find(state, show, 'FLYER_RUN', args.route + '#2').status !== 'MOOT')
          return U.no('TOO_MANY', SB.text.label('refuse.TOO_MANY'));
        if ((C.JOBS.FLYER_RUN.again || 0) < 1) return U.no('TOO_MANY', SB.text.label('refuse.TOO_MANY'));
        key = args.route + '#2'; break;
      default:
        return U.no('INVALID', SB.text.label('refuse.INVALID'));
    }
    if (type !== 'HARM_ASK' && type !== 'EXTRA_SHIFT') {
      var dup = findLoose(state, type, key);
      if (dup && LIVE[dup.status]) return U.no('ALREADY', SB.text.label('refuse.ALREADY'));
    }
    job = make(state, type, show, key, c.mode === 'MESSAGE' ? 'WAITING' : 'TODO');
    job.added = true;
    job.args = U.copy(args);
    return U.yes({ jobId: job.id });
  }

  function showForRequest(state, requestId) {
    var k, s;
    if (!state.shows) return null;
    for (k in state.shows) { s = state.shows[k]; if (s.requestId === requestId && s.status !== 'CANCELLED') return s; }
    return null;
  }

  function drop(state, jobId) {
    var job = getJob(state, jobId, 'Jobs.drop');
    if (!job.added) return U.no('INVALID', SB.text.label('refuse.INVALID'));
    if (!LIVE[job.status]) return U.no('ALREADY', SB.text.label('refuse.ALREADY'));
    moot(job, 'NA');
    return U.yes();
  }

  /* ------------------------------------------------------------------ */
  /* resolve (02-engine 5.2)                                             */
  /* ------------------------------------------------------------------ */

  function blocked(state, job, ctx, code) {
    return [rec('JOB_BLOCKED', ctx.day, ctx.half, job.showId, '', { jobId: job.id, type: job.type, code: code })];
  }

  function zoneFried(state) {
    var z = SB.Stress && SB.Stress.zone ? SB.Stress.zone(state) : 'STEADY';
    return z === 'FRIED' || z === 'BURNING_OUT' || z === 'BURNT_OUT';
  }

  function skillOf(state, personId, role) {
    var p = personOf(state, personId) || (SB.People ? SB.People.get(state, personId) : null);
    var s = p && p.hid && p.hid.skill ? p.hid.skill[role] : null;
    return typeof s === 'number' ? s : 0.5;
  }

  function effortOf(state, job, ctx) {
    var plan = plannedItem(state, job.id), h = ctx.hours || (plan && plan.hours), k;
    if (ctx.effort && C.FLYER.QUALITY[ctx.effort]) return ctx.effort;
    if (plan && plan.effort && C.FLYER.QUALITY[plan.effort]) return plan.effort;
    if (h) for (k in C.FLYER.HOURS) if (C.FLYER.HOURS[k] === h) return k;
    return job.effort || C.USUAL.effort;
  }

  function resolve(state, jobId, ctx) {
    var job = getJob(state, jobId, 'Jobs.resolve'), c = cfg(job.type), show = showOf(state, job), records = [],
        day, half, by, mode, w, timing, opt, cost = 0, payCost = 0, perf = null, effect = 1, slip = null, nd, plan, r, slots;
    ctx = ctx || {};
    day = typeof ctx.day === 'number' ? ctx.day : today(state);
    half = ctx.half || 'DAY';
    plan = plannedItem(state, job.id);
    by = ctx.by || (plan && plan.by) || 'player';
    ctx = { day: day, half: half, by: by, pay: ctx.pay || (plan && plan.pay) || null, opt: ctx.opt || (plan && plan.opt) || null,
            effort: ctx.effort || null, hours: ctx.hours || null, covered: !!ctx.covered };
    if (!LIVE[job.status]) return [];
    mode = modeOf(state, job);
    if (mode === 'MESSAGE') return blocked(state, job, ctx, 'INVALID');
    if (mode === 'PROMISE') return resolveRider(state, job, ctx, 'ON_TIME');

    /* the window on that day */
    if (job.type !== 'RUN_SHOW') {
      nd = needsOf(state, job);
      if (!nd.met && mode === 'HOURS') return blocked(state, job, ctx, 'NEEDS');
      w = computeWindow(state, job, day);
      if (w.state === 'EARLY' || w.state === 'MISSED') return blocked(state, job, ctx, 'WINDOW');
      timing = w.state === 'LATE' ? 'LATE' : 'ON_TIME';
    } else timing = 'ON_TIME';
    if (job.type === 'HAND_OUT' && !handoutShow(state, show, day)) return blocked(state, job, ctx, 'WINDOW');
    if (job.type === 'GO_TO_SHOW' && !otherShow(state, job.key)) return blocked(state, job, ctx, 'WINDOW');

    /* the priced choice and the helper's pay */
    opt = ctx.opt || job.opt || null;
    if (job.type === 'PRINT' && !opt) opt = C.USUAL.print;
    if (job.type === 'LOCAL_AD' && !opt) opt = 'PAPER';
    if (job.type === 'DEBRIEF' && !E.DEBRIEF[opt]) opt = 'ROOM';
    if (c.opt && job.type !== 'DEBRIEF') cost = optCost(state, job.type, opt);
    if (by !== 'player' && ctx.pay && ctx.pay.kind === 'CASH') payCost = Math.max(0, Math.round(ctx.pay.amount || 0));
    if (cost + payCost > 0 && SB.Money && SB.Money.canCover && !SB.Money.canCover(state, cost + payCost)) return blocked(state, job, ctx, 'NO_MONEY');

    /* a helper does it, or the player might slip */
    if (by !== 'player' && !ctx.covered && SB.People && SB.People.perform) {
      perf = SB.People.perform(state, job.id, by);
      job.outcome = perf.outcome;
      if (perf.outcome === 'NOT_DONE_TOLD' || perf.outcome === 'NOT_DONE_SILENT') {
        records.push(rec('HELPER_REPORT', day, half, job.showId, perf.text || '', { jobId: job.id, type: job.type, personId: by,
          name: personName(state, by), outcome: perf.outcome }));
        return records;
      }
      effect = typeof perf.effect === 'number' ? perf.effect : 1;
    } else if (mode === 'HOURS' && !job.slip && SB.Stress && SB.Stress.slip) {
      slip = SB.Stress.slip(state, job);
      if (slip && E.SLIP[slip]) {
        job.slip = slip;
        slots = show ? textSlots(state, show, job, { wrongDow: SB.time.fmt(show.day + 1, 'dow') }) : {};
        r = rec('SLIP', day, half, job.showId, line(state, 'jobs.slips.' + slip, slots), { jobId: job.id, slip: slip });
        if (slip === 'WRONG_DATE' && job.type === 'MAKE_FLYER') r.hours = 1;   // SPEC?: the extra hour is Week's to add to week.used; carried on the record
        records.push(r);
        if (slip === 'SHOP_SHUT' || slip === 'DOUBLE_BOOKED' || (slip !== 'WRONG_DATE' && slip !== 'WRONG_LOADIN')) return records;   // not done; hours spent
        if (slip === 'WRONG_LOADIN' && show) { if (!show.mods) show.mods = {}; show.mods.lateMin = (show.mods.lateMin || 0) + 15; }
      } else slip = null;
    }

    /* money */
    if (cost > 0) {
      r = SB.Money.spend(state, cost, moneyCat(job.type), memo(state, job, opt), { showId: job.showId, jobId: job.id });
      if (r && r.ok === false) return records.concat(blocked(state, job, ctx, 'NO_MONEY'));
    }
    if (payCost > 0) SB.Money.spend(state, payCost, 'HELPER', memo(state, job, null), { showId: job.showId, jobId: job.id, personId: by });
    if (by !== 'player' && ctx.pay && ctx.pay.kind === 'LIST' && show) { if (!show.door) show.door = {}; show.door.comps = (show.door.comps || 0) + C.PAY.LIST_COSTS_HEADS; }
    if (by !== 'player' && ctx.pay && ctx.pay.kind === 'FAVOR' && SB.People && SB.People.favor) SB.People.favor(state, by, -1);

    /* the job's own writes */
    job.opt = opt || job.opt;
    var extra = apply(state, job, show, ctx, timing, effect, opt) || [];
    finishDone(state, job, day, timing, by);
    slots = show ? textSlots(state, show, job, { helper: by !== 'player' ? personName(state, by) : null, different: job.outcome === 'DIFFERENT',
                                                 paid: payCost > 0, amount: cost + payCost, cost: cost }) : Object.assign({ helper: null }, looseSlots(state, job));
    job.text = (by !== 'player' && has('jobs.' + job.type + '.helper')) ? line(state, 'jobs.' + job.type + '.helper', slots)
                                                                       : line(state, 'jobs.' + job.type + '.' + timing, slots);
    var chips = [];
    if (mode === 'HOURS' && by === 'player') chips.push({ k: 'HOURS', v: -hoursOf(state, job), who: null });
    if (cost + payCost > 0) chips.push({ k: 'MONEY', v: -(cost + payCost), who: null });
    if (by !== 'player') records.push(rec('HELPER_REPORT', day, half, job.showId, (perf && perf.text) || job.text, { jobId: job.id, type: job.type,
      personId: by, name: personName(state, by), outcome: job.outcome || 'DONE' }));
    else records.push(rec('JOB_DONE', day, half, job.showId, job.text, { jobId: job.id, type: job.type, key: job.key, by: by, timing: timing,
      chips: chips, thumb: thumbOf(job) }));
    records = records.concat(extra);

    /* the promises riding on it */
    if (job.type === 'ADVANCE' || job.type === 'RUN_SHOW') {
      ridersOf(state, job).forEach(function (rj) {
        if (rj.status === 'PROMISED') records = records.concat(resolveRider(state, rj, ctx, timing));
        else if (LIVE[rj.status]) skip(state, rj, day);
      });
    }
    if (show && SHOW_LIVE[show.status] && (job.type === 'PRINT')) ensure(state, show.id);
    return records;
  }

  /* 1.22: the touring band's food is one of two buttons, each with its price (home pot, or a meal out) */
  function foodCost(state, job) {
    var f = C.FOOD || {}, o = f[job.opt] || f.HOME || { cost: C.JOBS.FOOD.cost[0] };
    return dollars(state, o.cost);
  }
  function foodMenu(state, job) {
    var f = C.FOOD || {}, chosen = job.opt || null;
    return { kind: 'FOOD', chosen: job.status === 'PROMISED' ? chosen : null, choices: Object.keys(f).map(function (k) {
      var cost = dollars(state, f[k].cost), ok = SB.Money && SB.Money.canCover ? SB.Money.canCover(state, cost) : true;
      return { key: k, label: label('jobs.FOOD.opts.' + k + '.label', { cost: cost }, k), cost: cost, chips: [{ k: 'MONEY', v: -cost, who: null }], enabled: ok,
               why: ok ? null : SB.text.label('refuse.NO_MONEY') };
    }) };
  }

  function resolveRider(state, job, ctx, timing) {
    var show = showOf(state, job), records = [], cost = 0, extra, r;
    if (!LIVE[job.status]) return records;
    /* A promise whose needs are not DONE cannot be kept (DAY_OF_POST on a show never announced): no job is DONE
     * before its needs, so it is skipped. SPEC?: 5.2 is silent; JOB_BLOCKED with NEEDS as for a job that cannot run. */
    if (!needsOf(state, job).met) { skip(state, job, ctx.day); return blocked(state, job, ctx, 'NEEDS'); }
    if (job.type === 'FOOD') {
      cost = foodCost(state, job);   // 1.22: the one the player chose, priced on its button (home pot or a meal out)
      if (SB.Money && SB.Money.canCover && !SB.Money.canCover(state, cost)) { skip(state, job, ctx.day); return blocked(state, job, ctx, 'NO_MONEY'); }
      r = SB.Money.spend(state, cost, 'FOOD', memo(state, job, null), { showId: job.showId, jobId: job.id });
      if (r && r.ok === false) { skip(state, job, ctx.day); return blocked(state, job, ctx, 'NO_MONEY'); }
    }
    extra = apply(state, job, show, ctx, timing, 1, null) || [];
    finishDone(state, job, ctx.day, timing, 'player');
    job.text = line(state, 'jobs.' + job.type + '.' + timing, show ? textSlots(state, show, job, { amount: cost }) : looseSlots(state, job));
    records.push(rec('JOB_DONE', ctx.day, ctx.half, job.showId, job.text, { jobId: job.id, type: job.type, key: job.key, by: 'player',
      timing: timing, chips: cost ? [{ k: 'MONEY', v: -cost, who: null }] : [], thumb: null }));
    return records.concat(extra);
  }

  function moneyCat(type) {
    if (type === 'PRINT') return 'PRINT';
    if (type === 'FOOD') return 'FOOD';
    return 'PROMO';
  }
  function memo(state, job, opt) {
    var show = showOf(state, job);
    return label('jobs.' + job.type + '.label', {}, job.type) + (opt ? ' (' + opt + ')' : '') + (show ? ', ' + SB.time.fmt(show.day, 'md') : '');
  }
  function thumbOf(job) {
    if (job.type === 'MAKE_FLYER' || job.type === 'PRINT') return { k: 'FLYER', id: job.showId };
    if (job.type === 'ASK_LOCALS' && job.key) return { k: 'BAND', id: job.key };
    if (job.type === 'VISIT' && job.key) return { k: 'PERSON', id: job.key };
    return null;
  }

  function ensurePromo(show) {
    if (!show.promo) show.promo = {};
    var p = show.promo;
    if (!p.runs) p.runs = {};
    if (!p.shares) p.shares = {};
    if (!p.handouts) p.handouts = [];
    if (!p.invites) p.invites = [];
    if (!show.prep) show.prep = {};
    return p;
  }

  function noteRecords(learned, day, half, showId) {
    return (learned || []).map(function (l) { return rec('NOTE', day, half, showId, l && l.text ? l.text : '', { learned: l }); });
  }

  /* The writes of 02-engine 5.2, per job type. Returns extra records. */
  function apply(state, job, show, ctx, timing, effect, opt) {
    var day = ctx.day, half = ctx.half, out = [], promo, room, q, eff, os, ho, res, req, list, act, ask;
    if (show) promo = ensurePromo(show);
    switch (job.type) {
      case 'VET_LISTEN': case 'VET_CLIP': case 'VET_HISTORY': case 'VET_ASK_AROUND':
        /* SPEC?: 5.2 lists request.vetted under Jobs, but a Request belongs to E3b; Requests.vet writes it */
        return SB.Requests.vet(state, job.key, VET_ACTION[job.type], null) || [];
      case 'LOCK_BILL':
        SB.Shows.lock(state, show.id, day); return out;
      case 'MAKE_FLYER':
        job.effort = ctx.by === 'player' ? effortOf(state, job, ctx) : job.effort;
        q = ctx.by === 'player' ? C.FLYER.QUALITY[job.effort] : C.FLYER.HELPER.base + C.FLYER.HELPER.perSkill * skillOf(state, ctx.by, 'ARTIST');
        q *= effect;
        if (zoneFried(state)) q += C.FLYER.FRIED;
        if (!(show.bill && show.bill.locked)) q *= C.FLYER.TBA;
        q = U.clamp(q, C.FLYER.MIN, C.FLYER.MAX);
        promo.flyer = { day: day, quality: U.round(q, 3), by: ctx.by, tba: !(show.bill && show.bill.locked) };
        show.flyer = { recipe: show.flyer && show.flyer.recipe ? show.flyer.recipe : null, spec: null };
        show.flyer.spec = flyerSpec(state, show.id);
        scheduleShares(state, show, day);
        return out;
      case 'ANNOUNCE':
        promo.announce = day;
        promo.announceHadFlyer = !!promo.flyer;
        if (opt && E.PUSH[opt]) promo.paid = { level: opt, day: day };
        if (show.door && show.door.address == null) {
          room = roomOf(state, show);
          if (room && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0) show.door.address = C.USUAL.address;
        }
        scheduleShares(state, show, day);
        return out;
      case 'PRINT':
        promo.printed = day;
        promo.print = opt || C.USUAL.print;
        return out;
      case 'FLYER_RUN':
        eff = effect;
        var printJob = find(state, show, 'PRINT');
        if (printJob && printJob.slip === 'WRONG_DATE') eff *= 0.85;
        if (isAgain(job.key)) { if (promo.runs[routeKey(job.key)]) promo.runs[routeKey(job.key)].again = day; }
        else promo.runs[job.key] = { day: day, again: null, by: ctx.by, effect: U.round(eff, 3) };
        return out;
      case 'LISTINGS': promo.listings = day; return out;
      case 'LOCAL_AD': promo.ad = { kind: opt || 'PAPER', day: day }; return out;
      case 'MAILING_LIST': promo.mail = day; return out;
      case 'HAND_OUT':
        ho = handoutShow(state, show, day);
        os = ho.show;
        job.key = os.id;
        if (os.heads == null && SB.Night && SB.Night.resolveOther) { res = SB.Night.resolveOther(state, os); }
        promo.handouts.push({ day: day, otherShowId: os.id, heads: os.heads != null ? os.heads : (res ? res.heads : 0), aff: U.round(ho.aff, 3) });
        out = out.concat(noteRecords(SB.Notebook.scout(state, os.id), day, half, show.id));
        out = out.concat(meetAt(state, os, day, half));
        return out;
      case 'INVITES': promo.invites.push(day); return out;
      case 'WEEK_PUSH':
        promo.push = day;
        if (opt && E.PUSH[opt]) promo.paid = { level: opt, day: day };
        return out;
      case 'NEIGHBORS': show.prep.neighbors = day; return out;
      case 'HOUSE_RULES':
        show.prep.rules = day;
        if (state.player) state.player.houseRules = true;
        return out;
      case 'ADVANCE':
        show.prep.advance = day;
        room = roomOf(state, show);
        if (room && room.following > 0 && timing === 'ON_TIME') promo.roomPosted = true;
        if (timing === 'ON_TIME') (show.bill && show.bill.slots ? show.bill.slots : []).forEach(function (s) {
          if (s.confirmed) out.push(SB.Bands.addTrust(state, s.bandId, 'DETAILS', { showId: show.id, scale: 1 }));
        });
        return out.filter(Boolean);
      case 'SORT_GEAR': show.prep.gear = day; return out;
      case 'DAY_BEFORE': show.prep.dayBefore = show.day - 1; return out;
      case 'RUN_SHOW': return out;
      case 'DAY_OF_POST': promo.dayOf = true; return out;
      case 'FOOD': show.prep.food = day; return out;
      case 'THANKS':
        if (show.result) show.result.thanked = day;
        (show.bill && show.bill.slots ? show.bill.slots : []).forEach(function (s) {
          out.push(SB.Bands.addTrust(state, s.bandId, 'THANKED', { showId: show.id, scale: timing === 'LATE' ? 0.5 : 1 }));
        });
        /* SPEC?: 5.2 writes Game.adjustFollowers({ mul: THANKS.posts }), which multiplies the player's whole following
         * by 1.15 at every show (a hundredfold in thirty shows). Mechanics 4 says what the constant is: "Posts +15%".
         * The thanks adds that share of the show's posts, and the followers those posts bring (POST.followersPerPost);
         * half of it when late. */
        if (show.result && show.result.posts && typeof show.result.posts.count === 'number') {
          var morePosts = Math.round(show.result.posts.count * (C.THANKS.posts - 1) * (timing === 'LATE' ? 0.5 : 1));
          show.result.posts.count += morePosts;
          if (SB.Game && SB.Game.adjustFollowers) SB.Game.adjustFollowers(state, Math.round(morePosts * C.POST.followersPerPost), 'THANKS');
        }
        if (timing === 'ON_TIME') out = out.concat(thanksContact(state, show));
        return out.filter(Boolean);
      case 'DEBRIEF':
        list = SB.Feedback.debrief(state, show.id, opt) || [];
        if (show.result) { if (!show.result.comments) show.result.comments = []; show.result.comments = show.result.comments.concat(list); }
        return list.map(function (cm) { return rec('COMMENT', day, half, show.id, cm && cm.text ? cm.text : '', { comment: cm }); });
      case 'GO_TO_SHOW':
        os = otherShow(state, job.key);
        if (os.heads == null && SB.Night && SB.Night.resolveOther) SB.Night.resolveOther(state, os);
        out = out.concat(noteRecords(SB.Notebook.scout(state, os.id), day, half, null));
        out = out.concat(meetAt(state, os, day, half));
        if (SB.Stress && SB.Stress.add) SB.Stress.add(state, C.STRESS.DOWN.WENT_OUT, 'WENT_OUT');
        return out;
      case 'VISIT':
        act = job.args || {};
        ask = act.askId && state.asks ? state.asks[act.askId] : null;
        if (ask && (ask.status === 'QUEUED' || ask.status === 'SENT') && SB.Mail.answerInPerson) out = out.concat(SB.Mail.answerInPerson(state, ask.id, day, half));
        room = visitRoom(state, job.key, ask);
        if (room && SB.Rooms && SB.Rooms.adjustRel) out.push(SB.Rooms.adjustRel(state, room.id, C.VISIT.ownerRel, 'VISIT'));
        if (personOf(state, job.key) && personOf(state, job.key).rel == null && SB.People && SB.People.meet) out.push(SB.People.meet(state, job.key, 'VISIT'));
        return out.filter(Boolean);
      case 'EXTRA_SHIFT':
        var p = pack(state), pay = p && p.money ? p.money.shiftPay : 0;
        if (pay && SB.Money && SB.Money.earn) SB.Money.earn(state, Math.round(pay), 'WAGES', label('jobs.EXTRA_SHIFT.label', {}, 'EXTRA_SHIFT'), { jobId: job.id },
          state.settings && state.settings.bills === false ? 'FUND' : 'BANK');
        if (pay) out.push(rec('MONEY', day, half, null, '', { amount: Math.round(pay), cat: 'WAGES', pot: state.settings && state.settings.bills === false ? 'FUND' : 'BANK' }));
        return out;
      case 'HARM_ASK': case 'HARM_WORD':
        /* SPEC?: 5.2 says these call Harm.act; the act that the job carries out is passed with fromJob */
        res = SB.Harm.act(state, job.type === 'HARM_ASK' ? 'ASK_AROUND' : 'QUIET_WORD', { jobId: job.id, bandId: job.key, fromJob: true });
        return res && res.records ? res.records : [];
      case 'TOUR_ROUTE':
        /* SPEC?: tour status and stop.askId belong to Territory; this job only queues the date asks */
        var tour = state.tours ? state.tours[job.key] : null;
        if (tour) (tour.stops || []).forEach(function (s) {
          SB.Mail.ask(state, 'TOUR_DATE', s.contactId || null, { tourId: tour.id, stop: s.n, noClock: true });   // the job's own hours cover the writing
        });
        return out;
      case 'TOUR_ADVANCE':
        tour = state.tours ? state.tours[job.key] : null;
        if (tour && tour.bandId) out.push(SB.Bands.addTrust(state, tour.bandId, 'TOUR_BOOKED', { scale: 1 }));
        return out.filter(Boolean);
      default:
        return out;
    }
  }

  function visitRoom(state, personId, ask) {
    var k;
    if (ask && state.rooms && state.rooms[ask.toId]) return state.rooms[ask.toId];
    if (state.rooms) for (k in state.rooms) if (state.rooms[k].ownerId === personId) return state.rooms[k];
    return null;
  }

  function meetAt(state, os, day, half) {
    var p = os && os.bookerId ? personOf(state, os.bookerId) : null;
    if (p && p.rel == null && SB.People && SB.People.meet) return [SB.People.meet(state, os.bookerId, 'SHOW')].filter(Boolean);
    return [];
  }

  /* On time, a touring band that was hosted well may open a contact in its home town (7.12, THANKS). */
  function thanksContact(state, show) {
    var out = [], scores = show.result && show.result.hostScores ? show.result.hostScores : {};
    (show.bill && show.bill.slots ? show.bill.slots : []).forEach(function (s) {
      var b = bandOf(state, s.bandId), k, ct;
      if (s.role !== 'TOURING' || !b || !b.place || !(scores[s.bandId] > C.HOST_SCORE.wellAbove)) return;
      if (!state.contacts || !SB.Territory || !SB.Territory.adjustContact) return;
      for (k in state.contacts) {
        ct = state.contacts[k];
        if (ct.place && b.place && ((ct.place.slug && ct.place.slug === b.place.slug) || ct.place.name === b.place.name)) {
          out.push(SB.Territory.adjustContact(state, ct.id || k, C.CONTACT.bandBehaved, 'THANKS'));
          break;
        }
      }
    });
    return out.filter(Boolean);
  }

  /* ------------------------------------------------------------------ */
  /* The flyer spec (05-interface 6.1) and the stored recipe             */
  /* ------------------------------------------------------------------ */

  function flyerSpec(state, showId) {
    var show = getShow(state, showId, 'Jobs.flyerSpec'), room = roomOf(state, show), p = pack(state), t = SB.time.date(show.day),
        order = billingOf(state, show), slots = show.bill && show.bill.slots ? show.bill.slots : [], fam = {}, mj, maker, req, addr = null, hood;
    var billing = order.map(function (id, i) {
      var b = bandOf(state, id) || { name: '', genre: 'hardcore', local: true }, s = slots.filter(function (x) { return x.bandId === id; })[0] || {};
      var home = b.local ? zoneName(state, b.zoneId) : (b.place ? b.place.name + (b.place.state ? ', ' + b.place.state : '') : '');
      var n = b.members ? b.members.length : 0, f = E.GENRE_FAMILY[b.genre] || 'FAST';
      fam[f] = (fam[f] || 0) + (i === 0 ? 0.5 : 0.5 / Math.max(1, order.length - 1));
      return { bandId: id, name: b.name, home: home, touring: s.role === 'TOURING' || b.local === false, genre: b.genre, family: f,
               unconfirmed: !s.confirmed,
               oneLiner: has('strings.flyer.oneLiner') ? SB.text.line('strings.flyer.oneLiner', { n: n, home: home,
                 plain: has('strings.genre.' + b.genre + '.plain') ? SB.text.label('genre.' + b.genre + '.plain') : b.genre }, null) : '' };
    });
    if (order.length === 1) { fam = {}; fam[billing[0].family] = 1; }
    if (room && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0) {
      var a = show.door && show.door.address ? show.door.address : C.USUAL.address;
      if (a === 'ASK') addr = has('strings.flyer.askAPunk') ? SB.text.line('strings.flyer.askAPunk', {}, null) : '';
      else {
        hood = p && p.derived && p.derived.hoodById ? p.derived.hoodById[room.hood] : null;
        addr = room.name + (hood && hood.name ? ', ' + hood.name : '');
      }
    }
    mj = find(state, show, 'MAKE_FLYER');
    maker = { id: 'player', name: null, taste: null };
    var makerId = (show.promo && show.promo.flyer && show.promo.flyer.by) || (mj && plannedItem(state, mj.id) && plannedItem(state, mj.id).by) || 'player';
    if (makerId !== 'player') {
      var mp = personOf(state, makerId);
      maker = { id: makerId, name: personName(state, makerId), taste: mp && mp.flyerTaste ? U.copy(mp.flyerTaste) : null };
    }
    req = show.requestId && state.requests ? state.requests[show.requestId] : null;
    var locked = !!(show.bill && show.bill.locked), d = show.door || {};
    return {
      showId: show.id,
      seed: state.seed + ':' + show.id,
      presenter: state.player ? state.player.bookingName : '',
      mark: state.player && state.player.mark ? U.copy(state.player.mark) : null,
      billing: billing,
      tba: !locked,
      date: { day: show.day, dow: SB.time.fmt(show.day, 'dow3').toUpperCase(), dowLong: SB.time.fmt(show.day, 'dow'),
              mon: SB.time.MONTHS[t.m - 1].slice(0, 3).toUpperCase(), monthLong: SB.time.MONTHS[t.m - 1], d: t.d, y: t.y },
      doors: show.bill && show.bill.doors != null ? SB.time.clock(show.bill.doors) : null,
      times: locked && show.bill.times && show.bill.times.length ? show.bill.times.map(SB.time.clock) : null,
      done: locked && show.bill.ends != null ? SB.time.clock(show.bill.ends) : null,
      room: room ? { name: room.name, kind: room.kind, address: addr } : null,
      price: { text: priceLine(show), donation: !!d.donation, noOneTurned: !!d.donation },
      ages: d.ages || 'ALL', agesText: SB.text.label('ages.' + (d.ages || 'ALL')),
      label: show.label || 'NORMAL', tags: (show.tags || []).slice(),
      rules: state.player && state.player.houseRules && has('strings.flyer.rules') ? SB.text.line('strings.flyer.rules', {}, null) : null,
      route: req && req.route && req.route.stops && req.route.stops.length && slots.some(function (s) { return s.role === 'TOURING'; }) ?
        req.route.stops.map(function (s) {
          var dd = SB.time.date(s.day);
          return { text: SB.time.MONTHS[dd.m - 1].slice(0, 3).toUpperCase() + ' ' + dd.d + ' ' + String(s.name || '').toUpperCase() + (s.state ? ' ' + s.state : ''),
                   here: !!s.here || s.day === show.day };
        }) : null,
      families: fam,
      month: t.m,
      style: p && p.style ? U.copy(p.style) : {},
      houseStyle: state.player && state.player.houseStyle ? U.copy(state.player.houseStyle) : {},
      maker: maker,
      finish: (mj && mj.effort) || C.USUAL.effort,
      plain: false
    };
  }

  function zoneName(state, zoneId) {
    var z = zoneId && state.zones ? state.zones[zoneId] : null;
    return z && z.name ? z.name : '';
  }

  function setFlyer(state, showId, recipe, houseStyle) {
    var show = getShow(state, showId, 'Jobs.setFlyer'), pj = find(state, show, 'PRINT');
    if ((pj && pj.status === 'DONE') || (show.promo && show.promo.printed != null)) return U.no('LOCKED', SB.text.label('refuse.LOCKED'));
    if (show.status === 'CANCELLED' || show.status === 'PLAYED') return U.no('LOCKED', SB.text.label('refuse.LOCKED'));
    if (!show.flyer) show.flyer = { recipe: null, spec: null };
    show.flyer.recipe = recipe == null ? null : U.copy(recipe);
    if (houseStyle && state.player) state.player.houseStyle = U.copy(houseStyle);
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'FLYER', { showId: show.id });
    return U.yes();
  }

  /* 3.2 step 2: a printed flyer made again and reprinted in one press. The new recipe goes in, the print job opens again and is
   * done now (its money and hours as for any print); if it cannot be done tonight nothing is changed. */
  function reprint(state, showId, recipe, houseStyle) {
    var show = getShow(state, showId, 'Jobs.reprint'), pj = find(state, show, 'PRINT'), size, cost, fit, snap, r, was;
    if (show.status !== 'CONFIRMED') return U.no('LOCKED', SB.text.label('refuse.LOCKED'));
    if (!pj || pj.status !== 'DONE') return U.no('INVALID', SB.text.label('refuse.INVALID'));
    size = (show.promo && show.promo.print) || C.USUAL.print;
    cost = optCost(state, 'PRINT', size);
    if (cost > 0 && SB.Money && SB.Money.canCover && !SB.Money.canCover(state, cost)) return U.no('NO_MONEY', SB.text.label('refuse.NO_MONEY'));
    if (SB.Week && SB.Week.fits && state.week) { fit = SB.Week.fits(state, hoursOf(state, pj)); if (fit && fit.ok === false) return fit; }
    snap = { pj: U.copy(pj), printed: show.promo.printed, recipe: show.flyer && show.flyer.recipe ? U.copy(show.flyer.recipe) : null, style: state.player ? U.copy(state.player.houseStyle || null) : null };
    if (!show.flyer) show.flyer = { recipe: null, spec: null };
    show.flyer.recipe = recipe == null ? null : U.copy(recipe);
    if (houseStyle && state.player) state.player.houseStyle = U.copy(houseStyle);
    pj.status = 'TODO'; pj.doneDay = null; pj.timing = null; pj.by = null; pj.slip = null; pj.text = null;
    show.promo.printed = null;
    r = SB.Week.doNow(state, pj.id, { opt: size });
    if (!r || r.ok === false) {
      Object.keys(pj).forEach(function (k) { delete pj[k]; });
      Object.keys(snap.pj).forEach(function (k) { pj[k] = snap.pj[k]; });
      show.promo.printed = snap.printed;
      show.flyer.recipe = snap.recipe;
      if (state.player) state.player.houseStyle = snap.style;
      return r || U.no('INVALID', SB.text.label('refuse.INVALID'));
    }
    return r;
  }

  return {
    reprint: reprint, catalog: catalog, ensure: ensure, refreshAll: refreshAll, get: get, forShow: forShow, tray: tray, freeJobs: freeJobs,
    window: windowView, canDo: canDo, promise: promise, resolve: resolve, flyerSpec: flyerSpec, setFlyer: setFlyer,
    /* internals outside the manifest (see the header) */
    skip: function (state, jobId, day) { var j = state.jobs && state.jobs[jobId]; if (j && LIVE[j.status]) skip(state, j, day); return j ? j.text || '' : ''; },
    add: add, drop: drop, modeOf: function (state, job) { return modeOf(state, typeof job === 'string' ? getJob(state, job) : job); }
  };
});
