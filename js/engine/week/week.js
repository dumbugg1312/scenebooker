/* Scene Booker — engine/week/week.js
 * SB.Week: plan, play, close and the next week; the log; decisions raised outside content events.
 * Owner: E1a. Spec: design/spec/02-engine.md 2.2, 5.1, 5.3, 5.4; 01-state clock and week; 00-overview 6.5.
 */
SB.module('Week', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var HALVES = ['DAY', 'NIGHT'];
  var JOB_ORDER = Object.keys(E.JOB);

  /* Jobs Week.addJob may create (02-engine 2.2), with the args each needs. FLYER_RUN is the second run of a route. */
  var FREE = { GO_TO_SHOW: 'otherShowId', VISIT: 'personId', VET_LISTEN: 'requestId', VET_CLIP: 'requestId',
               VET_HISTORY: 'requestId', VET_ASK_AROUND: 'requestId', EXTRA_SHIFT: null, HARM_ASK: null,
               HARM_WORD: 'bandId', TOUR_ROUTE: 'tourId', TOUR_ADVANCE: 'tourId', FLYER_RUN: 'route' };

  /* "The usual" (Week.suggest): the HOURS jobs of a show that Par assumes done on time.
   * SPEC?: Config.USUAL names promotion only; Par also assumes "every night-side preparation done" (7.8), so the
   * lock, the house rules, the neighbors, the advance and the thanks are suggested too. Never an optional job. */
  var USUAL_JOBS = ['LOCK_BILL', 'MAKE_FLYER', 'ANNOUNCE', 'PRINT', 'FLYER_RUN', 'LISTINGS', 'MAILING_LIST', 'INVITES',
                    'WEEK_PUSH', 'HOUSE_RULES', 'NEIGHBORS', 'ADVANCE', 'THANKS'];

  /* ------------------------------------------------------------------ */
  /* small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function has(key) { return SB.text.has('strings.' + key); }
  function label(key, ctx) { return has(key) ? SB.text.label(key, ctx) : String(key).split('.').pop(); }
  function say(state, path, slots, fallback) {
    if (SB.text.off) return '';
    if (SB.text.has(path)) return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
    return fallback || '';
  }
  function no(code) { return U.no(code, label('refuse.' + code)); }
  function dayOf(state, idx) { return state.clock.week * 7 + idx; }
  function slotOf(idx, half) { return idx * 2 + (half === 'NIGHT' ? 1 : 0); }
  function isIdx(i) { return typeof i === 'number' && i >= 0 && i <= 6 && i === Math.floor(i); }
  function billsOn(state) { return !!(state.settings && state.settings.bills); }
  function pack(state) { try { return SB.Cities.pack(state); } catch (e) { return null; } }
  function burnt(state, day) { var b = state.player.burnoutUntil; return typeof b === 'number' && b > day; }

  function rec(state, t, extra, day, half, showId) {
    var r = { t: t, day: day === undefined ? state.clock.day : day, half: half || state.clock.cursor.half,
              showId: showId || null, text: '' }, k;
    for (k in (extra || {})) r[k] = extra[k];
    return r;
  }

  /* Refuse when the phase is not one of `phases`; OVER always refuses. */
  function phaseNo(state, phases) {
    if (state.clock.phase === E.PHASE.OVER) return no(E.REFUSE.OVER);
    if (phases.indexOf(state.clock.phase) < 0) return no(E.REFUSE.PHASE);
    return null;
  }

  function job(state, jobId, where) {
    var j = state.jobs && state.jobs[jobId];
    if (!j) SB.fail(where, 'unknown job ' + jobId);
    return j;
  }
  function jobView(state, jobId) { try { return SB.Jobs.get(state, jobId); } catch (e) { return null; } }

  /* ------------------------------------------------------------------ */
  /* the week object and its hours                                       */
  /* ------------------------------------------------------------------ */

  function shiftsFor(state) {
    var list = billsOn(state) ? (C.SHIFTS[state.player.dayJob] || []) : C.BILLS_OFF_BUSY, out = [], i;
    for (i = 0; i < 7; i++) out.push(list.indexOf(i) >= 0);
    return out;
  }

  /* cap from HOURS, less COUCH.hours spread over days off, less FRIED.hoursOffDay on days off when fried, zero
   * until burnoutUntil (5.4). */
  function capsFor(state, W, n) {
    var cap = [], i, off, left, fried, z, d;
    for (i = 0; i < 7; i++) {
      off = !W.shifts[i] || W.dropped.indexOf(i) >= 0;
      cap.push({ DAY: off ? C.HOURS.off.DAY : C.HOURS.shift.DAY, NIGHT: off ? C.HOURS.off.NIGHT : C.HOURS.shift.NIGHT });
    }
    if (state.player.couch) {
      left = -C.MONEY.COUCH.hours;
      for (d = 0; left > 0 && d < 14; d++) {
        i = d % 7;
        off = !W.shifts[i] || W.dropped.indexOf(i) >= 0;
        if (!off && d < 7) continue;
        if (cap[i].NIGHT > 0) { cap[i].NIGHT--; left--; } else if (cap[i].DAY > 0) { cap[i].DAY--; left--; }
      }
    }
    z = SB.Stress.zone(state);
    fried = z === E.STRESS_ZONE.FRIED || z === E.STRESS_ZONE.BURNING_OUT;
    for (i = 0; i < 7; i++) {
      off = !W.shifts[i] || W.dropped.indexOf(i) >= 0;
      if (fried && off) cap[i].DAY = Math.max(0, cap[i].DAY + C.FRIED.hoursOffDay);
      if (burnt(state, n * 7 + i)) cap[i] = { DAY: 0, NIGHT: 0 };
    }
    return cap;
  }

  function blankWeek(state, n) {
    var W = { n: n, shifts: shiftsFor(state), dropped: [], cap: null, used: [], plan: [], phoneOff: [], log: [], logN: 0,
              shows: [], report: null }, i;
    for (i = 0; i < 7; i++) W.used.push({ DAY: 0, NIGHT: 0 });
    W.cap = capsFor(state, W, n);
    return W;
  }

  /* A day is frozen once played: its `used` then holds what was spent, evening sends included. */
  function frozen(state, idx) {
    var ph = state.clock.phase;
    if (ph === E.PHASE.CLOSE || ph === E.PHASE.OVER) return true;
    if (ph !== E.PHASE.PLAY) return false;
    if (state.clock.stop && state.clock.stop.kind === E.STOP.END_OF_WEEK) return true;
    return idx < state.clock.cursor.dayIdx;
  }

  /* Can something still be placed in (idx, half)? PLAN: any. PLAY: strictly after the cursor. */
  function open(state, idx, half) {
    var ph = state.clock.phase, cur = state.clock.cursor;
    if (ph === E.PHASE.PLAN) return true;
    if (ph !== E.PHASE.PLAY || frozen(state, idx)) return false;
    return slotOf(idx, half) > slotOf(cur.dayIdx, cur.half);
  }

  function myShowsOn(state, day) {
    var out = [], id, s;
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (s && s.day === day) out.push(s);
    }
    return out;
  }

  function zoneMinutes(state, zoneId) {
    var z = zoneId && state.zones && state.zones[zoneId], p;
    if (z && typeof z.minutes === 'number') return z.kind === 'FEEDER' ? z.minutes : 0;
    p = pack(state);
    z = p && p.derived && p.derived.zoneById && p.derived.zoneById[zoneId];
    return (z && z.kind === 'FEEDER' && typeof z.minutes === 'number') ? z.minutes : 0;
  }

  /* What a confirmed show reserves on its day (5.1, last paragraph). */
  function reservation(state, idx) {
    var day = dayOf(state, idx), r = { DAY: 0, NIGHT: 0 }, shows = myShowsOn(state, day), i, s, id, j, cfg, h, mins;
    for (i = 0; i < shows.length; i++) {
      s = shows[i];
      if (s.status !== 'CONFIRMED') continue;
      r.DAY += C.SHOW_NIGHT_HOURS.DAY; r.NIGHT += C.SHOW_NIGHT_HOURS.NIGHT;
      for (id in (state.jobs || {})) {
        j = state.jobs[id];
        if (!j || j.showId !== s.id || j.status !== 'PROMISED') continue;
        cfg = C.JOBS[j.type];
        if (!cfg || cfg.rides !== 'RUN_SHOW' || !cfg.hours) continue;
        h = cfg.half === 'NIGHT' ? 'NIGHT' : 'DAY';
        r[h] += cfg.hours;
      }
      mins = zoneMinutes(state, s.zoneId);
      if (mins > 0) r.NIGHT += 2 * C.FEEDER_DRIVE_HOURS_PER_30MIN * Math.ceil(mins / 30);
    }
    return r;
  }

  function playerHours(item) { return item.by === 'player' ? (item.hours || 0) : 0; }

  /* Recompute `used` for every day not yet played: the show reservation plus the player's planned hours. */
  function refreshHours(state) {
    var W = state.week, i, k, r, it;
    if (!W) return;
    for (i = 0; i < 7; i++) {
      if (frozen(state, i)) continue;
      r = reservation(state, i);
      for (k = 0; k < W.plan.length; k++) {
        it = W.plan[k];
        if (it.dayIdx === i) r[it.half] += playerHours(it);
      }
      W.used[i] = r;
    }
  }

  /* The week's shape after a settings change at week 0. */
  function resetShape(state) {
    var W = state.week;
    W.shifts = shiftsFor(state); W.dropped = [];
    W.cap = capsFor(state, W, W.n);
    refreshHours(state);
  }

  function dayTotal(o) { return (o.DAY || 0) + (o.NIGHT || 0); }

  /* ------------------------------------------------------------------ */
  /* the log and raised decisions                                        */
  /* ------------------------------------------------------------------ */

  function log(state, records) {
    var W = state.week, list = Array.isArray(records) ? records : [records], i, r;
    if (!W) SB.fail('Week.log', 'state has no week');
    for (i = 0; i < list.length; i++) {
      r = list[i];
      if (!r || typeof r !== 'object') continue;
      if (typeof r.n === 'number') continue;          // already stamped: logged once
      r.n = W.logN++;
      W.log.push(r);
    }
  }

  function raise(state, decision) {
    if (!decision || typeof decision !== 'object' || !decision.id) SB.fail('Week.raise', 'a decision with an id is needed');
    state.clock.pending.push({ kind: E.STOP.DECISION, decision: decision });
  }

  /* ------------------------------------------------------------------ */
  /* planning                                                            */
  /* ------------------------------------------------------------------ */

  function planIndex(state, jobId) {
    var p = state.week.plan, i;
    for (i = 0; i < p.length; i++) if (p[i].jobId === jobId && !p[i].resolved) return i;
    return -1;
  }

  /* SPEC?: Jobs.canDo answers NEEDS until a need is DONE, which would keep MAKE_FLYER and ANNOUNCE (same ideal day)
   * out of one plan. Week accepts a NEEDS refusal when every need of the same show is DONE, MOOT or placed in the
   * plan at an earlier half-day (`extra`: further placements { jobId, slot } not yet in the plan), and at least
   * one of them is placed rather than done (so a NEEDS about something else, such as confirmed bands, stands). */
  function needsPlacedEarlier(state, j, slot, extra) {
    var needs = (C.JOBS[j.type] && C.JOBS[j.type].needs) || [], placedOne = false, n, id, o, found, k, s, it, x;
    var sh = j.showId && state.shows ? state.shows[j.showId] : null, ids = sh && sh.jobs ? sh.jobs : [];
    if (!needs.length) return false;
    for (n = 0; n < needs.length; n++) {
      found = false;
      for (x = 0; x < ids.length; x++) {                  // the show's own jobs (a need is always on the same show)
        id = ids[x];
        o = state.jobs[id];
        if (!o || o.showId !== j.showId || o.type !== needs[n]) continue;
        found = true;
        if (o.status === 'DONE' || o.status === 'MOOT') continue;
        s = null;
        for (k = 0; k < state.week.plan.length; k++) {
          it = state.week.plan[k];
          if (it.jobId === id && !it.resolved) s = slotOf(it.dayIdx, it.half);
        }
        for (k = 0; extra && k < extra.length; k++) if (extra[k].jobId === id) s = extra[k].slot;
        if (s === null || s >= slot) return false;
        placedOne = true;
      }
      if (!found) return false;
    }
    return placedOne;
  }

  function optCost(state, type, opt) {
    var j = C.JOBS[type], c = 0, p = pack(state), idx = (p && p.money && p.money.priceIndex) || 1;
    if (!j || !j.opt || !opt) return 0;
    if (j.opt === 'PRINT_RUN') { if (!C.FLYER.PRINT[opt]) return -1; c = C.FLYER.PRINT[opt].cost; }
    else if (j.opt === 'PUSH') { if (!C.CHANNELS.PAID_PUSH[opt]) return -1; c = C.CHANNELS.PAID_PUSH[opt].cost; }
    else if (j.opt === 'AD') { if (!C.CHANNELS.LOCAL_AD[opt]) return -1; c = C.CHANNELS.LOCAL_AD[opt].cost; }
    return Math.round(c * idx);
  }

  function defaultOpt(type) {
    var j = C.JOBS[type];
    if (!j || !j.opt) return null;
    if (j.opt === 'PRINT_RUN') return C.USUAL.print;
    if (j.opt === 'AD') return 'PAPER';
    return null;                                          // PUSH: no paid push unless chosen
  }

  function plan(state, jobId, dayIdx, half, opts) {
    var o = opts || {}, refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY]), j, cfg, jv, day, r, by, hours, used, capT,
        over, opt, cost, z, timing = null, w, ask, a1, a2, prev = -1, item, pay, records = [];
    if (refuse) return refuse;
    if (state.clock.stop && state.clock.stop.kind === E.STOP.END_OF_WEEK) return no(E.REFUSE.PHASE);
    j = job(state, jobId, 'Week.plan');
    if (!isIdx(dayIdx)) SB.fail('Week.plan', 'dayIdx must be 0..6');
    if (half !== 'DAY' && half !== 'NIGHT') SB.fail('Week.plan', 'half must be DAY or NIGHT');
    cfg = C.JOBS[j.type];
    if (!cfg || cfg.mode !== 'HOURS') return no(E.REFUSE.INVALID);
    if (j.status === 'DONE' || j.status === 'SKIPPED' || j.status === 'MOOT') return no(E.REFUSE.ALREADY);
    if (!open(state, dayIdx, half)) return no(E.REFUSE.PHASE);
    day = dayOf(state, dayIdx);
    if (burnt(state, day)) return no(E.REFUSE.BURNT_OUT);
    by = o.by || 'player';
    if (by !== 'player') {
      if (!state.people || !state.people[by]) SB.fail('Week.plan', 'unknown person ' + by);
      if (!cfg.helper) return no(E.REFUSE.INVALID);
      if ((cfg.helperStage || 1) > state.player.stage) return no(E.REFUSE.STAGE);
    }

    // a job already planned is moved: take it out first, put it back if the new place is refused
    prev = planIndex(state, jobId);
    if (prev >= 0) { item = state.week.plan.splice(prev, 1)[0]; refreshHours(state); }

    r = SB.Jobs.canDo(state, jobId, day, half);
    if (!r.ok && !(r.code === E.REFUSE.NEEDS && needsPlacedEarlier(state, j, slotOf(dayIdx, half), null))) {
      return restore(r);
    }

    jv = jobView(state, jobId);
    hours = typeof o.hours === 'number' ? o.hours :
            (j.type === 'MAKE_FLYER' ? C.FLYER.HOURS[o.effort || C.USUAL.effort] : (jv && typeof jv.hours === 'number' ? jv.hours : cfg.hours));
    if (j.type === 'MAKE_FLYER' && o.effort && !E.EFFORT[o.effort]) SB.fail('Week.plan', 'unknown effort ' + o.effort);

    if (by === 'player' && hours > 0) {
      used = dayTotal(state.week.used[dayIdx]) + hours;
      capT = dayTotal(state.week.cap[dayIdx]);
      over = Math.max(0, used - capT);
      z = SB.Stress.zone(state);
      if (over > C.OVERTIME_MAX) return restore(no(E.REFUSE.NO_HOURS));
      if (over > 0 && (z === E.STRESS_ZONE.BURNING_OUT || z === E.STRESS_ZONE.BURNT_OUT)) return restore(no(E.REFUSE.NO_HOURS));
    }

    opt = o.opt === undefined ? defaultOpt(j.type) : o.opt;
    if (opt !== null && opt !== undefined) {
      cost = optCost(state, j.type, opt);
      if (cost < 0) SB.fail('Week.plan', 'unknown choice ' + opt + ' for ' + j.type);
      if (cost > 0 && !SB.Money.canCover(state, cost)) return restore(no(E.REFUSE.NO_MONEY));
    } else opt = null;
    pay = o.pay || null;
    if (pay && pay.kind === 'CASH' && pay.amount > 0 && !SB.Money.canCover(state, pay.amount + Math.max(0, cost || 0))) {
      return restore(no(E.REFUSE.NO_MONEY));
    }

    // a helper is asked at once, in person
    if (by !== 'player') {
      ask = { id: null, kind: E.ASK.HELPER_JOB, toId: by, showId: j.showId || null, jobId: jobId, requestId: null,
              payload: { jobId: jobId, pay: pay, inPerson: true }, status: 'SENT', queuedDay: state.clock.day,
              sentDay: state.clock.day, needBy: null, window: { lo: 0, hi: 0 }, chased: 0, answer: null, hid: {} };
      // SPEC?: Week.plan asks through People.answerAsk directly, so the ask is a transient object, not in state.asks.
      a1 = SB.People.answerAsk(state, ask, 'SEND') || {};
      ask.hid = { answerDay: state.clock.day, will: a1.will || 'NO' };
      a2 = SB.People.answerAsk(state, ask, 'DELIVER') || {};
      if (a2.records && a2.records.length) { records = a2.records; log(state, records); }
      if (a2.status !== 'YES') {
        if (item) { state.week.plan.splice(prev, 0, item); refreshHours(state); }
        return U.yes({ overtime: 0, timing: null, answer: { status: 'NO', text: a2.text || '' }, planned: false });
      }
    }

    state.week.plan.push({ jobId: jobId, dayIdx: dayIdx, half: half, hours: hours, by: by, pay: pay, opt: opt,
                           effort: j.type === 'MAKE_FLYER' ? (o.effort || C.USUAL.effort) : null });
    refreshHours(state);
    over = Math.max(0, dayTotal(state.week.used[dayIdx]) - dayTotal(state.week.cap[dayIdx]));
    try { w = SB.Jobs.window(state, jobId, day); } catch (e) { w = null; }
    if (w && (w.state === 'OPEN' || w.state === 'CLOSING')) timing = E.TIMING.ON_TIME;
    else if (w && w.state === 'LATE') timing = E.TIMING.LATE;
    return U.yes({ overtime: over, timing: timing, answer: by !== 'player' ? { status: 'YES', text: (a2 && a2.text) || '' } : null });

    function restore(result) {
      if (item) { state.week.plan.splice(prev, 0, item); refreshHours(state); }
      return result;
    }
  }

  function unplan(state, jobId) {
    var refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY]), i, it;
    if (refuse) return refuse;
    job(state, jobId, 'Week.unplan');
    i = planIndex(state, jobId);
    if (i < 0) return no(E.REFUSE.INVALID);
    it = state.week.plan[i];
    if (!open(state, it.dayIdx, it.half)) return no(E.REFUSE.PHASE);
    state.week.plan.splice(i, 1);
    refreshHours(state);
    return U.yes();
  }

  function addJob(state, type, args) {
    var a = args || {}, refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY, E.PHASE.CLOSE]), key = null, showId = null,
        id, o, j, again, runs, show;
    if (refuse) return refuse;
    if (!Object.prototype.hasOwnProperty.call(FREE, type)) SB.fail('Week.addJob', type + ' cannot be added');
    switch (type) {
      case 'GO_TO_SHOW':
        if (!(state.otherShows || []).some(function (x) { return x.id === a.otherShowId; })) SB.fail('Week.addJob', 'unknown other show ' + a.otherShowId);
        key = a.otherShowId; break;
      case 'VISIT':
        if (!state.people || !state.people[a.personId]) SB.fail('Week.addJob', 'unknown person ' + a.personId);
        key = a.personId; break;
      case 'VET_LISTEN': case 'VET_CLIP': case 'VET_HISTORY': case 'VET_ASK_AROUND':
        if (!state.requests || !state.requests[a.requestId]) SB.fail('Week.addJob', 'unknown request ' + a.requestId);
        key = a.requestId; break;
      case 'HARM_WORD':
        if (!state.bands || !state.bands[a.bandId]) SB.fail('Week.addJob', 'unknown band ' + a.bandId);
        key = a.bandId; break;
      case 'TOUR_ROUTE': case 'TOUR_ADVANCE':
        if (!state.tours || !state.tours[a.tourId]) SB.fail('Week.addJob', 'unknown tour ' + a.tourId);
        key = a.tourId; break;
      case 'FLYER_RUN':
        show = state.shows && state.shows[a.showId];
        if (!show) SB.fail('Week.addJob', 'unknown show ' + a.showId);
        if (typeof a.route !== 'string') SB.fail('Week.addJob', 'a route is needed');
        runs = (show.promo && show.promo.runs) || {};
        if (!runs[a.route]) return no(E.REFUSE.NEEDS);
        again = C.JOBS.FLYER_RUN.again || 0;
        if (again < 1) return no(E.REFUSE.TOO_MANY);
        showId = a.showId; key = a.route + '#2'; break;
      case 'EXTRA_SHIFT':
        if (!billsOn(state) || state.player.dayJob === 'NONE') return no(E.REFUSE.INVALID);
        key = null; break;
      default: key = null;
    }
    // the same job, still open, is not added twice (HARM_ASK may be added JOBS.HARM_ASK.repeat times)
    var count = 0;
    for (id in state.jobs) {
      o = state.jobs[id];
      if (!o || o.type !== type || o.key !== key || o.showId !== showId) continue;
      if (type === 'FLYER_RUN') return no(E.REFUSE.TOO_MANY);
      if (o.status === 'DONE' || o.status === 'SKIPPED' || o.status === 'MOOT') continue;
      count++;
    }
    if (count >= (type === 'HARM_ASK' ? (C.JOBS.HARM_ASK.repeat || 1) : 1)) return no(E.REFUSE.ALREADY);
    j = { id: U.newId(state, 'j'), type: type, showId: showId, key: key, status: 'TODO', doneDay: null, by: null,
          timing: null, effort: null, opt: null, waived: null, outcome: null, slip: null, text: null,
          args: U.copy(a), free: true };
    // SPEC?: 01-state names E1b Jobs the owner of state.jobs, but no Jobs function creates a free job, and
    // 02-engine 2.2 gives Week.addJob that work. The job is written here in the 01-state 2.7 shape, plus `args`
    // (what it was made with) and `free` (made by addJob, so removeJob may delete it).
    state.jobs[j.id] = j;
    if (show && Array.isArray(show.jobs)) show.jobs.push(j.id);
    return U.yes({ jobId: j.id });
  }

  function removeJob(state, jobId) {
    var refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY]), j = job(state, jobId, 'Week.removeJob'), i, show;
    if (refuse) return refuse;
    if (!j.free) return no(E.REFUSE.INVALID);
    if (j.status === 'DONE') return no(E.REFUSE.ALREADY);
    i = planIndex(state, jobId);
    if (i >= 0) {
      if (!open(state, state.week.plan[i].dayIdx, state.week.plan[i].half)) return no(E.REFUSE.PHASE);
      state.week.plan.splice(i, 1);
    }
    show = j.showId && state.shows && state.shows[j.showId];
    if (show && Array.isArray(show.jobs)) show.jobs = show.jobs.filter(function (x) { return x !== jobId; });
    delete state.jobs[jobId];
    refreshHours(state);
    return U.yes();
  }

  /* ------------------------------------------------------------------ */
  /* the usual                                                           */
  /* ------------------------------------------------------------------ */

  /* Jobs the usual leaves out on purpose (Config.USUAL), so the check does not count them late either. */
  function usualSkips(state, j) {
    if (j.type === 'LISTINGS' && !C.USUAL.listings) return true;
    if (j.type === 'WEEK_PUSH' && !C.USUAL.push) return true;
    if (j.type === 'MAILING_LIST' && !(C.USUAL.mail && state.player.mailingList > 0)) return true;
    return false;
  }

  function suggest(state) {
    var out = [], W = state.week, load = [], cands = [], placed = [], wk0 = state.clock.week * 7, i, id, j, jv, w, h,
        type, k, s, ideal, d, slot, found, halves, it, r, lowest;
    if (state.clock.phase !== E.PHASE.PLAN && state.clock.phase !== E.PHASE.PLAY) return out;
    refreshHours(state);                                  // the hours a show confirmed since the last look reserves
    for (i = 0; i < 7; i++) load.push(dayTotal(W.used[i]));
    for (k = 0; k < W.plan.length; k++) {
      it = W.plan[k];
      if (!it.resolved) placed.push({ jobId: it.jobId, slot: slotOf(it.dayIdx, it.half) });
    }
    for (id in (state.jobs || {})) {
      j = state.jobs[id];
      if (!j || !j.showId || USUAL_JOBS.indexOf(j.type) < 0) continue;
      if (j.status !== 'TODO') continue;
      if (planIndex(state, id) >= 0) continue;
      if (C.JOBS[j.type].optional) continue;
      if (j.type === 'FLYER_RUN' && String(j.key || '').indexOf('#') >= 0) continue;
      if (usualSkips(state, j)) continue;
      s = state.shows && state.shows[j.showId];
      if (!s || (s.status !== 'DRAFT' && s.status !== 'CONFIRMED' && !(s.status === 'PLAYED' && j.type === 'THANKS'))) continue;
      jv = jobView(state, id);
      w = jv && jv.window;
      if (!w || w.state === 'DONE' || w.state === 'MISSED' || w.state === 'NONE' || typeof w.idealUntil !== 'number') continue;
      cands.push({ id: id, j: j, jv: jv, w: w });
    }
    cands.sort(function (a, b) {
      return (a.w.idealUntil - b.w.idealUntil) || (JOB_ORDER.indexOf(a.j.type) - JOB_ORDER.indexOf(b.j.type));
    });
    lowest = state.clock.phase === E.PHASE.PLAN ? 0 : slotOf(state.clock.cursor.dayIdx, state.clock.cursor.half) + 1;
    for (i = 0; i < cands.length; i++) {
      j = cands[i].j; w = cands[i].w; type = j.type;
      ideal = w.idealUntil - wk0;                         // the ideal day as a dayIdx of this week (may be outside)
      if (ideal > 6) continue;                            // its week has not come
      h = type === 'MAKE_FLYER' ? C.FLYER.HOURS[C.USUAL.effort] : (typeof cands[i].jv.hours === 'number' ? cands[i].jv.hours : C.JOBS[type].hours);
      halves = C.JOBS[type].half === 'DAY' ? ['DAY'] : (C.JOBS[type].half === 'NIGHT' ? ['NIGHT'] : ['NIGHT', 'DAY']);
      found = null;
      if (ideal >= 0) {                                   // on or before the ideal day, as late as fits
        for (d = Math.min(6, ideal); d >= 0 && !found; d--) found = tryDay(d);
      }
      if (!found) {                                       // already late, or nothing fit before: as soon as it fits
        for (d = Math.max(0, ideal + 1); d <= 6 && !found; d++) found = tryDay(d);
      }
      if (!found) continue;
      load[found.dayIdx] += h;
      placed.push({ jobId: cands[i].id, slot: slotOf(found.dayIdx, found.half) });
      out.push({ jobId: cands[i].id, type: type, args: null, dayIdx: found.dayIdx, half: found.half, hours: h, by: 'player',
                 opt: defaultOpt(type), why: (cands[i].jv && cands[i].jv.why) || '' });
    }
    return out;

    function tryDay(d) {
      var x, hf, sl, res, dy = wk0 + d;
      if (load[d] + h > dayTotal(W.cap[d])) return null;
      if (burnt(state, dy)) return null;
      if (typeof w.opens === 'number' && dy < w.opens) return null;
      if (typeof w.missedAt === 'number' && dy >= w.missedAt) return null;
      for (x = 0; x < halves.length; x++) {
        hf = halves[x]; sl = slotOf(d, hf);
        if (sl < lowest || !open(state, d, hf)) continue;
        res = SB.Jobs.canDo(state, cands[i].id, dy, hf);
        if (!res.ok && !(res.code === E.REFUSE.NEEDS && needsPlacedEarlier(state, j, sl, placed))) continue;
        return { dayIdx: d, half: hf };
      }
      return null;
    }
  }

  /* The asks that are part of the usual (02-engine 2.2, "the usual"): sound for every show whose room is confirmed, and
   * security as soon as a room that requires it is held. Each to the crew person the booker knows best who is free that
   * night and has not already said no to this show; nothing while an ask for the role is out or someone has it.
   * Returns [{ kind: 'CREW', toId, showId, role, name, payload }]: the interface sends each through Mail.ask. A view. */
  function suggestAsks(state) {
    var out = [], id, s, today = state.clock.day, needSec;
    if (state.clock.phase !== E.PHASE.PLAN && state.clock.phase !== E.PHASE.PLAY) return out;
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (!s || !s.roomId || s.day < today || (s.status !== 'DRAFT' && s.status !== 'CONFIRMED')) continue;
      needSec = !!(SB.Rooms.securityRequired && SB.Rooms.securityRequired(state.rooms && state.rooms[s.roomId]));
      if (s.status === 'CONFIRMED') crewFor(s, 'sound');
      if (needSec && (s.status === 'CONFIRMED' || s.hold)) crewFor(s, 'security');
    }
    return out;

    function crewFor(show, role) {
      var said = {}, k, a, list, best = null;
      if (show.crew && show.crew[role]) return;
      for (k in (state.asks || {})) {
        a = state.asks[k];
        if (!a || a.kind !== 'CREW' || a.showId !== show.id || !a.payload || a.payload.role !== role) continue;
        if (a.status === 'QUEUED' || a.status === 'SENT' || a.status === 'YES' || a.status === 'COUNTER') return;
        said[a.toId] = true;
      }
      try { list = SB.People.crew(state, role, show.id); } catch (e) { list = []; }
      list.forEach(function (c) {
        var r = c.rel && typeof c.rel.value === 'number' ? c.rel.value : 0;
        if (c.busy || said[c.personId]) return;
        if (!best || r > best.r) best = { c: c, r: r };
      });
      if (!best) return;
      out.push({ kind: 'CREW', toId: best.c.personId, showId: show.id, role: role, name: best.c.name,
                 payload: { showId: show.id, role: role, pay: { kind: 'CASH', amount: best.c.rate || 0 } } });
    }
  }

  /* ------------------------------------------------------------------ */
  /* the shape of the week                                               */
  /* ------------------------------------------------------------------ */

  function dropShift(state, dayIdx) {
    var refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY]), W = state.week;
    if (refuse) return refuse;
    if (!isIdx(dayIdx)) SB.fail('Week.dropShift', 'dayIdx must be 0..6');
    if (!billsOn(state)) return no(E.REFUSE.INVALID);
    if (!W.shifts[dayIdx]) return no(E.REFUSE.INVALID);
    if (W.dropped.indexOf(dayIdx) >= 0) return no(E.REFUSE.ALREADY);
    if (!open(state, dayIdx, 'DAY')) return no(E.REFUSE.PHASE);
    if (state.player.shiftDrops >= C.SHIFT_DROPS_PER_MONTH) return no(E.REFUSE.TOO_MANY);
    W.dropped.push(dayIdx);
    state.player.shiftDrops++;
    recap(state);
    return U.yes();
  }

  /* Caps of the days not yet played, after a shift is dropped. */
  function recap(state) {
    var W = state.week, caps = capsFor(state, W, W.n), i;
    for (i = 0; i < 7; i++) if (!frozen(state, i)) W.cap[i] = caps[i];
    refreshHours(state);
  }

  function setDayJob(state, kind) {
    var refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY, E.PHASE.CLOSE]);
    if (refuse) return refuse;
    if (!E.DAY_JOB[kind]) SB.fail('Week.setDayJob', 'unknown day job ' + kind);
    if (!billsOn(state)) return no(E.REFUSE.INVALID);
    state.player.dayJobNext = kind === state.player.dayJob ? null : kind;
    return U.yes({ from: SB.time.weekStart(nextMonthWeek(state)) });
  }

  /* The first week that starts a new month after this one (when a day-job change takes effect). */
  function nextMonthWeek(state) {
    var w = state.clock.week;
    while (!SB.time.billsDue(w) && w < state.clock.week + 6) w++;
    return w + 1;
  }

  function phoneOff(state, dayIdx, on) {
    var refuse = phaseNo(state, [E.PHASE.PLAN, E.PHASE.PLAY]), W = state.week, i;
    if (refuse) return refuse;
    if (!isIdx(dayIdx)) SB.fail('Week.phoneOff', 'dayIdx must be 0..6');
    if (state.clock.phase === E.PHASE.PLAY && (frozen(state, dayIdx) ||
        (dayIdx === state.clock.cursor.dayIdx && state.clock.opened >= dayOf(state, dayIdx)))) return no(E.REFUSE.WINDOW);
    i = W.phoneOff.indexOf(dayIdx);
    if (on) {
      if (i >= 0) return U.yes();
      if (W.phoneOff.length >= C.MAIL.phoneOffPerWeek) return no(E.REFUSE.TOO_MANY);
      W.phoneOff.push(dayIdx);
    } else if (i >= 0) W.phoneOff.splice(i, 1);
    return U.yes();
  }

  /* ------------------------------------------------------------------ */
  /* views                                                               */
  /* ------------------------------------------------------------------ */

  function calendarLabels(state, day) {
    var p = pack(state), cal = (p && p.calendar) || [], t = SB.time.date(day), out = [], i, ev;
    for (i = 0; i < cal.length; i++) {
      ev = cal[i];
      if (!ev || ev.month !== t.m) continue;
      if (typeof ev.week === 'number' && ev.week !== SB.time.weekOfMonth(day)) continue;
      if (Array.isArray(ev.dows) && ev.dows.indexOf(t.dow) < 0) continue;
      out.push({ id: ev.id, label: ev.label || ev.id });
    }
    return out;
  }

  function personName(state, id) {
    var p = id && state.people && state.people[id];
    if (id === 'player') return null;
    return p ? (p.nick || p.first || '') : null;
  }

  function view(state) {
    var W = state.week, days = [], i, d, k, it, jv, items, outbox = 0, other, hours = { used: 0, cap: 0, over: 0 }, runway = [],
        shows, id, s, jobs, next, risks = [], strip, room;
    try { outbox = SB.Mail.outbox(state).length; } catch (e) { outbox = 0; }
    refreshHours(state);
    for (i = 0; i < 7; i++) {
      d = dayOf(state, i);
      items = [];
      for (k = 0; k < W.plan.length; k++) {
        it = W.plan[k];
        if (it.dayIdx !== i) continue;
        jv = jobView(state, it.jobId);
        items.push({ jobId: it.jobId, type: jv ? jv.type : (state.jobs[it.jobId] || {}).type, showId: jv ? jv.showId : null,
                     key: jv ? jv.key : null, label: jv ? jv.label : '', half: it.half, hours: it.hours, by: it.by,
                     byName: personName(state, it.by), window: jv ? jv.window : null,
                     status: jv ? jv.status : (state.jobs[it.jobId] || {}).status || null });
      }
      try { other = SB.Rooms.otherShows(state, d, d).map(function (o) { return o.id; }); } catch (e) { other = []; }
      days.push({ dayIdx: i, day: d, shift: !!W.shifts[i], dropped: W.dropped.indexOf(i) >= 0, phoneOff: W.phoneOff.indexOf(i) >= 0,
                  queued: isToday(state, i) ? outbox : 0,
                  cap: { DAY: W.cap[i].DAY, NIGHT: W.cap[i].NIGHT }, used: { DAY: W.used[i].DAY, NIGHT: W.used[i].NIGHT },
                  over: Math.max(0, dayTotal(W.used[i]) - dayTotal(W.cap[i])),
                  items: items,
                  shows: myShowsOn(state, d).filter(function (x) { return x.status !== 'CANCELLED'; }).map(function (x) { return x.id; }),
                  other: other, town: calendarLabels(state, d),
                  forecast: (state.town && state.town.forecast && state.town.forecast[d]) || null });
      hours.used += dayTotal(W.used[i]); hours.cap += dayTotal(W.cap[i]); hours.over += days[i].over;
    }
    shows = [];
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (s && (s.status === 'DRAFT' || s.status === 'CONFIRMED') && s.day >= state.clock.day && s.day < state.clock.day + 70) shows.push(s);
    }
    shows.sort(function (a, b) { return a.day - b.day; });
    for (i = 0; i < shows.length; i++) {
      s = shows[i];
      try { jobs = SB.Jobs.forShow(state, s.id); } catch (e) { jobs = []; }
      next = null;
      for (k = 0; k < jobs.length; k++) {
        if (jobs[k].status !== 'TODO' || jobs[k].optional || !jobs[k].window || typeof jobs[k].window.lateFrom !== 'number') continue;
        if (!next || jobs[k].window.lateFrom < next.lateOn) next = { jobId: jobs[k].id, text: jobs[k].label, lateOn: jobs[k].window.lateFrom };
      }
      try { strip = SB.Forecast.reachStrip(state, s.id); } catch (e) { strip = null; }
      room = s.roomId && state.rooms && state.rooms[s.roomId];
      runway.push({ showId: s.id, label: SB.time.fmt(s.day, 'short') + (room && room.name ? ', ' + room.name : ''), day: s.day,
                    jobs: jobs, reach: strip, next: next });
    }
    try { risks = SB.Director.risks(state); } catch (e) { risks = []; }
    return { week: state.clock.week, phase: state.clock.phase, days: days, hours: hours, runway: runway, risks: risks };
  }

  function isToday(state, idx) {
    if (state.clock.phase === E.PHASE.PLAN) return idx === 0;
    return idx === state.clock.cursor.dayIdx;
  }

  function issue(state, code, jobId, key, slots, fix) {
    return { code: code, jobId: jobId || null, text: say(state, 'strings.check.' + key, slots, label('refuse.' + code)), fix: fix || null };
  }
  function hoursText(n) { return n === 1 ? 'an hour' : n + ' hours'; }
  function showLabel(state, s) {
    var room = s && s.roomId && state.rooms ? state.rooms[s.roomId] : null;
    return s ? SB.time.fmt(s.day, 'short') + (room && room.name ? ' at ' + room.name : '') : '';
  }

  /* the room has already been asked to confirm (the ask is out or going out tonight) */
  function confirmAsked(state, showId) {
    var k, a;
    for (k in (state.asks || {})) {
      a = state.asks[k];
      if (a && a.kind === 'ROOM_CONFIRM' && a.showId === showId && (a.status === 'QUEUED' || a.status === 'SENT')) return true;
    }
    return false;
  }

  function check(state) {
    var W = state.week, issues = [], i, tray, k, jv, n = 0, needs, id, s, req, dow, over, what;
    refreshHours(state);
    for (i = 0; i < 7; i++) {
      if (frozen(state, i)) continue;
      /* a show night on a work day runs past the day by itself (overtime the show costs, not a planning slip): only what was
       * planned on top of it is counted */
      over = dayTotal(W.used[i]) - Math.max(dayTotal(W.cap[i]), dayTotal(reservation(state, i)));
      if (over > 0) {
        what = W.plan.filter(function (it) { return it.dayIdx === i && it.by === 'player' && !it.resolved; })
                     .map(function (it) { var v = jobView(state, it.jobId); return v ? v.label : ''; }).filter(Boolean);
        issues.push(issue(state, E.REFUSE.NO_HOURS, null, 'over', { dayIdx: i, n: over, hours: hoursText(over),
                                                                   dow: SB.time.fmt(dayOf(state, i), 'dow'), what: what.length ? ' (' + what.join(', ') + ')' : '' }));
      }
    }
    try { tray = SB.Jobs.tray(state); } catch (e) { tray = { late: [] }; }
    for (k = 0; k < (tray.late || []).length; k++) {
      jv = tray.late[k];
      if (!jv || jv.optional || jv.mode !== 'HOURS' || planIndex(state, jv.id) >= 0) continue;
      if (state.jobs[jv.id] && usualSkips(state, state.jobs[jv.id])) continue;
      s = jv.showId && state.shows ? state.shows[jv.showId] : null;
      issues.push(issue(state, E.REFUSE.WINDOW, jv.id, 'late', { job: jv.label, show: showLabel(state, s) }, { type: 'PLAN', args: { jobId: jv.id } }));
    }
    try { n = SB.Mail.outbox(state).length; } catch (e) { n = 0; }
    if (n > C.MAIL.freePerDay) issues.push(issue(state, E.REFUSE.TOO_MANY, null, 'mail', { n: n, free: C.MAIL.freePerDay }));
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (s && s.status === 'DRAFT' && s.hold && typeof s.hold.expires === 'number' &&
          s.hold.expires >= state.clock.day && s.hold.expires - state.clock.day <= 3 && !confirmAsked(state, s.id)) {
        issues.push(issue(state, E.REFUSE.TAKEN, null, 'hold', { day: s.hold.expires, show: showLabel(state, s), by: SB.time.fmt(s.hold.expires, 'dow') }));
      }
    }
    try { needs = SB.Mail.needsYou(state); } catch (e) { needs = []; }
    for (k = 0; k < needs.length; k++) if (needs[k].k === 'CHALLENGE') issues.push(issue(state, E.REFUSE.TAKEN, null, 'challenge', {}));
    for (id in (state.requests || {})) {
      req = state.requests[id];
      if (!req || (req.status !== 'NEW' && req.status !== 'REPLIED' && req.status !== 'NEGOTIATING')) continue;
      if (typeof req.replyBy !== 'number') continue;
      dow = req.replyBy - state.clock.week * 7;
      if (dow >= 0 && dow <= 6 && W.phoneOff.indexOf(dow) >= 0) {
        issues.push(issue(state, E.REFUSE.WINDOW, null, 'replyBy', { day: req.replyBy, dow: SB.time.fmt(req.replyBy, 'dow'),
                                                                    band: state.bands && state.bands[req.bandId] ? state.bands[req.bandId].name : null }));
      }
    }
    return { ok: issues.length === 0, issues: issues };
  }

  /* ------------------------------------------------------------------ */
  /* play                                                                */
  /* ------------------------------------------------------------------ */

  function startPlay(state) {
    var refuse = phaseNo(state, [E.PHASE.PLAN]);
    if (refuse) return refuse;
    state.clock.phase = E.PHASE.PLAY;
    state.clock.cursor = { dayIdx: 0, half: E.HALF.DAY };
    state.clock.done = 0;
    state.clock.stop = null;
    refreshHours(state);
    return U.yes();
  }

  function stepResult(state, records) {
    log(state, records);
    /* the guided first show looks again: a hold granted, sound booked, a promo job done, the show day reached */
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'STEP', null);
    return { records: records, stop: state.clock.stop, cursor: { dayIdx: state.clock.cursor.dayIdx, half: state.clock.cursor.half } };
  }

  function refusedStep(state, code) {
    var r = no(code);
    r.records = []; r.stop = state.clock.stop; r.cursor = { dayIdx: state.clock.cursor.dayIdx, half: state.clock.cursor.half };
    return r;
  }

  function showDone(state, showId) {
    var s = state.shows && state.shows[showId];
    return !s || s.status === 'PLAYED' || s.status === 'CANCELLED';
  }

  /* Stops a resolved job raised: an in-person ask answered with a counter arrives as a MESSAGE that needs the player. */
  function stopsFrom(state, recs) {
    var out = [], i, counter = false;
    for (i = 0; i < recs.length; i++) if (recs[i] && recs[i].t === E.REC.ASK_ANSWERED && recs[i].status === 'COUNTER') counter = true;
    if (!counter || !state.settings.pauseOnReplies) return out;
    for (i = 0; i < recs.length; i++) if (recs[i] && recs[i].t === E.REC.MESSAGE && recs[i].needs) out.push({ kind: E.STOP.REPLY, messageId: recs[i].messageId });
    return out;
  }

  function overtimeOf(before, add, capT) { return Math.max(0, before + add - capT) - Math.max(0, before - capT); }

  function addAll(list, more) { var i; if (more) for (i = 0; i < more.length; i++) if (more[i]) list.push(more[i]); }

  function step(state) {
    var c = state.clock, W = state.week, records = [], idx, half, day, off, phoneDay, r, i, items, it, j, ctx, recs, stops,
        before, ot, shows, s, run, id, d, quiet, capT, base, k, dowT, weather, before2;
    if (c.phase === E.PHASE.OVER) return refusedStep(state, E.REFUSE.OVER);
    if (c.phase !== E.PHASE.PLAY) return refusedStep(state, E.REFUSE.PHASE);
    if (c.stop) {
      if (c.stop.kind === E.STOP.DECISION) return refusedStep(state, E.REFUSE.STOP_PENDING);
      if (c.stop.kind === E.STOP.SETTLE && !showDone(state, c.stop.showId)) return refusedStep(state, E.REFUSE.STOP_PENDING);
      if (c.stop.kind === E.STOP.SHOW_NIGHT && !showDone(state, c.stop.showId)) return refusedStep(state, E.REFUSE.STOP_PENDING);
      if (c.stop.kind === E.STOP.END_OF_WEEK) return stepResult(state, records);
      c.stop = null;                                      // REPLY, NEED_BY, a played SHOW_NIGHT: cleared by this step
    }
    idx = c.cursor.dayIdx; half = c.cursor.half; day = dayOf(state, idx);
    phoneDay = W.phoneOff.indexOf(idx) >= 0;
    off = phoneDay || burnt(state, day);

    // 1. Morning
    if (half === 'DAY' && c.opened < day) {
      refreshHours(state);                                // the last look at the day before it is played
      c.opened = day; c.day = day; c.done = 0;
      dowT = SB.time.dow(day);
      weather = (state.truth && state.truth.weather && state.truth.weather[day]) ||
                (state.town && state.town.forecast && state.town.forecast[day]) || E.WEATHER.CLEAR;
      r = rec(state, E.REC.DAY_START, { dow: dowT, weather: weather,
                                        town: calendarLabels(state, day).map(function (x) { return x.label; }) }, day, 'DAY');
      r.text = say(state, 'game.DAY_START', { dow: SB.time.fmt(day, 'dow'), date: SB.time.date(day).d });
      records.push(r);
      SB.Jobs.refreshAll(state);
      if (SB.Rungs) addAll(records, SB.Rungs.cover(state, day));   // the friend's chores for a new booker
      stops = [];
      if (!off) {
        r = SB.Mail.deliver(state, day) || {};
        addAll(records, r.records); addAll(stops, r.stops);
      }
      r = SB.Rooms.daily(state, day) || {};
      addAll(records, r.records); addAll(stops, r.stops);
      addAll(records, SB.Requests.daily(state, day));
      for (i = 0; i < stops.length; i++) {
        if (!stops[i]) continue;
        if (stops[i].kind === E.STOP.REPLY && !state.settings.pauseOnReplies) continue;
        c.pending.push(stops[i]);
      }
    }

    // 2. Pending stops, one per step
    if (c.pending.length) { c.stop = c.pending.shift(); return stepResult(state, records); }

    // 3. An interruption
    d = SB.Director.due(state, day, half);
    if (d) {
      records.push(rec(state, E.REC.EVENT, { decisionId: d.id, eventId: d.eventId || null, tier: d.tier || null }, day, half, d.showId));
      c.stop = { kind: E.STOP.DECISION, decision: d };
      return stepResult(state, records);
    }

    // 4. The plan items of this half-day, in plan order
    items = [];
    for (i = 0; i < W.plan.length; i++) if (W.plan[i].dayIdx === idx && W.plan[i].half === half) items.push(W.plan[i]);
    capT = dayTotal(W.cap[idx]);
    base = dayTotal(reservation(state, idx));
    if (half === 'NIGHT') for (i = 0; i < W.plan.length; i++) if (W.plan[i].dayIdx === idx && W.plan[i].half === 'DAY') base += playerHours(W.plan[i]);
    for (i = 0; i < c.done && i < items.length; i++) base += playerHours(items[i]);
    while (c.done < items.length) {
      it = items[c.done];
      c.done += 1;                                        // first, so a stop raised by this job never runs it twice
      j = state.jobs && state.jobs[it.jobId];
      if (!j || j.status === 'DONE' || j.status === 'SKIPPED' || j.status === 'MOOT') { it.resolved = true; continue; }
      if (burnt(state, day)) {
        records.push(rec(state, E.REC.JOB_BLOCKED, { jobId: j.id, type: j.type, code: E.REFUSE.BURNT_OUT }, day, half, j.showId));
        continue;
      }
      ctx = { day: day, half: half, by: it.by, pay: it.pay, opt: it.opt, effort: it.effort };
      recs = SB.Jobs.resolve(state, j.id, ctx) || [];
      addAll(records, recs);
      it.resolved = true;
      ot = overtimeOf(base, playerHours(it), capT);
      base += playerHours(it);
      if (ot > 0) {
        records.push(rec(state, E.REC.OVERTIME, { hours: ot }, day, half, null));
        SB.Stress.add(state, C.STRESS.UP.OVERTIME * ot, 'OVERTIME');
      }
      stops = stopsFrom(state, recs);
      if (stops.length) {
        for (k = 0; k < stops.length; k++) c.pending.push(stops[k]);
        c.stop = c.pending.shift();
        return stepResult(state, records);
      }
    }

    // 5. The show
    if (half === 'NIGHT') {
      shows = myShowsOn(state, day);
      for (i = 0; i < shows.length; i++) {
        s = shows[i];
        if (s.status === 'PLAYED' || s.status === 'CANCELLED') continue;
        if (s.status === 'DRAFT') {
          r = SB.Shows.cancel(state, s.id, E.CANCEL.PLAYER) || {};
          addAll(records, r.records);
          continue;
        }
        if (s.status !== 'CONFIRMED') continue;
        run = null;
        for (id in (state.jobs || {})) {
          if (state.jobs[id] && state.jobs[id].showId === s.id && state.jobs[id].type === 'RUN_SHOW') { run = state.jobs[id]; break; }
        }
        if (run && run.status !== 'DONE' && run.status !== 'SKIPPED' && run.status !== 'MOOT') {
          addAll(records, SB.Jobs.resolve(state, run.id, { day: day, half: half, by: 'player', pay: null, opt: null }));
        }
        if (burnt(state, day)) {
          // handed over during a burnout: someone else runs it (02-engine 7.21)
          r = SB.Night.auto(state, s.id, { untilSettle: false, settle: 'FAIR' }) || {};
          addAll(records, r.records);
          continue;
        }
        c.stop = { kind: E.STOP.SHOW_NIGHT, showId: s.id };
        return stepResult(state, records);
      }
    }

    // 6. Evening
    if (half === 'NIGHT' && c.sent < day) {
      c.sent = day;
      if (!off) {
        r = SB.Mail.flush(state, day) || {};
        addAll(records, r.records);
        if (r.hours > 0) {
          before2 = dayTotal(W.used[idx]);
          W.used[idx].NIGHT += r.hours;
          ot = overtimeOf(before2, r.hours, capT);
          if (ot > 0) {
            records.push(rec(state, E.REC.OVERTIME, { hours: ot }, day, half, null));
            SB.Stress.add(state, C.STRESS.UP.OVERTIME * ot, 'OVERTIME');
          }
        }
      }
      if (phoneDay) {
        before = state.player.stress;
        SB.Stress.add(state, C.STRESS.DOWN.PHONE_OFF, 'PHONE_OFF');
        records.push(SB.Stress.record(state, state.player.stress - before, 'PHONE_OFF'));
      }
      quiet = true;
      for (i = 0; i < W.log.length && quiet; i++) if (W.log[i].day === day && W.log[i].t !== E.REC.DAY_START) quiet = false;
      for (i = 0; i < records.length && quiet; i++) if (records[i].day === day && records[i].t !== E.REC.DAY_START) quiet = false;
      if (quiet) {
        r = rec(state, E.REC.QUIET_DAY, {}, day, 'NIGHT');
        r.text = say(state, 'game.QUIET_DAY', { dow: SB.time.fmt(day, 'dow') });
        records.push(r);
      }
    }

    // 7. Advance the cursor
    if (half === 'DAY') { c.cursor = { dayIdx: idx, half: E.HALF.NIGHT }; c.done = 0; }
    else if (idx < 6) { c.cursor = { dayIdx: idx + 1, half: E.HALF.DAY }; c.done = 0; }
    else c.stop = { kind: E.STOP.END_OF_WEEK };
    return stepResult(state, records);
  }

  function decide(state, decisionId, optionId, value) {
    var c = state.clock, dec, records = [], res, offerId, offers, i, sid;
    if (c.phase === E.PHASE.OVER) return refusedStep(state, E.REFUSE.OVER);
    if (!c.stop || c.stop.kind !== E.STOP.DECISION || !c.stop.decision || c.stop.decision.id !== decisionId) {
      return refusedStep(state, E.REFUSE.INVALID);
    }
    dec = c.stop.decision;
    if (!(dec.options || []).some(function (o) { return o.id === optionId; })) SB.fail('Week.decide', 'unknown option ' + optionId);
    if ((dec.options || []).some(function (o) { return o.id === optionId && o.enabled === false; })) return refusedStep(state, E.REFUSE.INVALID);
    switch (dec.kind) {
      case E.DECISION.INTERRUPT:
        addAll(records, SB.Director.resolve(state, dec, optionId));
        break;
      case E.DECISION.HARM:
        res = SB.Harm.act(state, optionId, value || {}) || {};
        if (res.ok === false) { res.records = []; res.stop = c.stop; res.cursor = { dayIdx: c.cursor.dayIdx, half: c.cursor.half }; return res; }
        addAll(records, res.records);
        break;
      case E.DECISION.OFFER:
        offerId = (value && value.offerId) || dec.offerId || null;
        if (!offerId) {
          offers = (state.legacy && state.legacy.offers) || [];
          for (i = offers.length - 1; i >= 0; i--) if (offers[i].status === 'OPEN') { offerId = offers[i].id; break; }
        }
        // SPEC?: the OFFER decision's option ids are Legacy's; ACCEPT and DECLINE answer it, anything else ("not yet") leaves it open.
        if (offerId && (optionId === 'ACCEPT' || optionId === 'DECLINE')) {
          res = SB.Legacy.answerOffer(state, offerId, optionId === 'ACCEPT') || {};
          if (res.ok === false) { res.records = []; res.stop = c.stop; res.cursor = { dayIdx: c.cursor.dayIdx, half: c.cursor.half }; return res; }
          addAll(records, res.records);
        }
        break;
      case E.DECISION.BURNOUT:
        // HAND_OVER: every show of those days is run by someone else through Night.auto when its night comes (step 5).
        if (optionId === 'CANCEL') {
          for (i = 0; i < (dec.shows || []).length; i++) {
            sid = dec.shows[i];
            if (showDone(state, sid)) continue;
            res = SB.Shows.cancel(state, sid, E.CANCEL.RESPECTED) || {};
            addAll(records, res.records);
          }
        }
        break;
      default:
        return refusedStep(state, E.REFUSE.INVALID);     // night decisions are answered through SB.Night.next
    }
    c.stop = null;
    if (state.clock.phase === E.PHASE.OVER) { log(state, records); return { records: records, stop: null, cursor: c.cursor }; }
    return stepResult(state, records);
  }

  /* ------------------------------------------------------------------ */
  /* close and the next week                                             */
  /* ------------------------------------------------------------------ */

  function weekRange(state) { return { from: state.clock.week * 7, to: state.clock.week * 7 + 6 }; }

  function playedThisWeek(state) {
    var out = (state.week.shows || []).slice(), rg = weekRange(state), id, s;
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (s && s.status === 'PLAYED' && s.day >= rg.from && s.day <= rg.to && out.indexOf(id) < 0) out.push(id);
    }
    return out;
  }

  function close(state) {
    var c = state.clock, W = state.week, refuse = phaseNo(state, [E.PHASE.PLAY]), usage, records = [], rg = weekRange(state),
        i, d, unspent = 0, daysOff = 0, inFlight = 0, wentOut = 0, id, s, j, inbox = 0, from = state.player.stress, mIn = 0, mOut = 0,
        l, owed, learned = [], people = [], news = [], bills = null, year = null, next = { open: 0, late: 0, repliesDue: 0 }, w, report,
        shows, sv, r, req, nextMon = rg.to + 1, allLog;
    if (refuse) return refuse;
    if (!c.stop || c.stop.kind !== E.STOP.END_OF_WEEK) return no(E.REFUSE.PHASE);
    shows = playedThisWeek(state);
    for (i = 0; i < 7; i++) {
      d = dayOf(state, i);
      unspent += Math.max(0, dayTotal(W.cap[i]) - dayTotal(W.used[i]));
      if ((!W.shifts[i] || W.dropped.indexOf(i) >= 0) && dayTotal(W.used[i]) === 0 &&
          !myShowsOn(state, d).some(function (x) { return x.status === 'PLAYED' || x.status === 'CONFIRMED'; })) daysOff++;
    }
    for (id in (state.shows || {})) { s = state.shows[id]; if (s && (s.status === 'DRAFT' || s.status === 'CONFIRMED')) inFlight++; }
    for (id in (state.jobs || {})) {
      j = state.jobs[id];
      if (j && j.type === 'GO_TO_SHOW' && j.status === 'DONE' && j.doneDay >= rg.from && j.doneDay <= rg.to) wentOut++;
    }
    try { inbox = SB.Mail.needsYou(state).length; } catch (e) { inbox = 0; }
    usage = { unspent: unspent, daysOff: daysOff, showsInFlight: inFlight, wentOut: wentOut, noShowWeek: shows.length === 0, inboxWaiting: inbox };

    c.day = rg.from;
    addAll(records, SB.Stress.weekly(state, usage));
    addAll(records, SB.Money.weekly(state));

    for (i = 0; i < state.money.ledger.length; i++) {
      l = state.money.ledger[i];
      if (l.day < rg.from || l.day > rg.to || l.cat === E.MONEY.MOVE) continue;
      if (l.amount > 0) mIn += l.amount; else mOut -= l.amount;
    }
    owed = SB.Money.owedAhead(state);
    allLog = W.log.concat(records);
    for (i = 0; i < allLog.length; i++) {
      r = allLog[i];
      if (r.t === E.REC.LEARNED || r.t === E.REC.NOTE) { if (r.learned) learned.push(r.learned); }
      else if (r.t === E.REC.TRUST) people.push(r);
      else if (r.t === E.REC.NEWS) news.push(r);
    }
    if (SB.time.billsDue(c.week) && state.settings.bills && !(SB.Money.billsSettled && SB.Money.billsSettled(state))) {
      bills = SB.Money.billsView(state);
    }
    if (c.week % 52 === 51) year = SB.Legacy.yearly(state);
    for (id in (state.jobs || {})) {
      j = state.jobs[id];
      if (!j || j.status === 'DONE' || j.status === 'SKIPPED' || j.status === 'MOOT' || (C.JOBS[j.type] && C.JOBS[j.type].optional)) continue;
      try { w = SB.Jobs.window(state, id, nextMon); } catch (e) { w = null; }
      if (!w) continue;
      if (w.state === 'OPEN' || w.state === 'CLOSING') next.open++;
      else if (w.state === 'LATE') next.late++;
    }
    for (id in (state.requests || {})) {
      req = state.requests[id];
      if (req && (req.status === 'NEW' || req.status === 'REPLIED' || req.status === 'NEGOTIATING') &&
          typeof req.replyBy === 'number' && req.replyBy >= nextMon && req.replyBy < nextMon + 7) next.repliesDue++;
    }
    sv = SB.Stress.view(state);
    report = {
      week: c.week, shows: shows,
      money: { in: mIn, out: mOut, net: mIn - mOut, fund: state.money.fund, bank: state.money.bank, owedAhead: owed },
      learned: learned, people: people,
      stress: { from: Math.round(from), to: Math.round(state.player.stress), zone: SB.Stress.zone(state), causes: sv.causes },
      news: news, bills: bills, year: year, next: next
    };
    W.report = report;
    c.phase = E.PHASE.CLOSE;
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'CLOSEOUT', null);     // the close-out is in front of the player
    r = rec(state, E.REC.WEEK_SUMMARY, { report: report }, rg.from, 'NIGHT');
    r.text = say(state, 'game.WEEK_SUMMARY', { week: c.week + 1 });
    records.push(r);
    log(state, records);
    return report;
  }

  function payBills(state, choices) {
    var refuse = phaseNo(state, [E.PHASE.CLOSE]);
    if (refuse) return refuse;
    return SB.Money.payBills(state, choices);
  }

  function nextWeek(state) {
    var c = state.clock, W = state.week, refuse = phaseNo(state, [E.PHASE.CLOSE]), records = [], P = state.player, idle, nr,
        order, i, monthTurn, n;
    if (refuse) return refuse;
    if (W.report && W.report.bills && !(SB.Money.billsSettled && SB.Money.billsSettled(state))) return no(E.REFUSE.BILLS_FIRST);
    order = [['Bands', 'weekly'], ['Rooms', 'weekly'], ['Trends', 'weekly'], ['Crowd', 'weekly'], ['Territory', 'weekly'],
             ['Requests', 'weekly'], ['People', 'weekly'], ['Harm', 'weekly'], ['Legacy', 'weekly'], ['Notebook', 'weekly']];
    for (i = 0; i < order.length; i++) addAll(records, SB.need(order[i][0])[order[i][1]](state));

    // Name: idle decay after NAME_IDLE.after weeks without a show; the week's value onto nameLine
    if (playedThisWeek(state).length) P.lastShowWeek = c.week;
    idle = P.lastShowWeek === null ? c.week + 1 : c.week - P.lastShowWeek;
    if (idle >= C.NAME_IDLE.after) {
      nr = SB.Game.adjustName(state, -C.NAME_IDLE.perWeek, 'IDLE');
      if (nr && nr.to !== nr.from) records.push(nr);
    }
    P.nameLine.push(P.name);
    if (P.nameLine.length > 52) P.nameLine = P.nameLine.slice(P.nameLine.length - 52);

    // a month change: the day job changes, shift drops reset
    monthTurn = SB.time.month(c.week * 7) !== SB.time.month((c.week + 1) * 7);
    if (SB.Rungs) addAll(records, SB.Rungs.weekly(state));   // the day job starts once the desk is ready for it
    if (monthTurn) {
      if (P.dayJobNext) P.dayJob = P.dayJobNext;
      P.dayJobNext = null;
      P.shiftDrops = 0;
    }

    n = c.week + 1;
    c.week = n; c.day = n * 7; c.phase = E.PHASE.PLAN;
    c.cursor = { dayIdx: 0, half: E.HALF.DAY }; c.done = 0; c.stop = null;
    if (typeof P.burnoutUntil === 'number' && P.burnoutUntil <= c.day) P.burnoutUntil = null;
    state.week = blankWeek(state, n);                     // clock.pending is kept: it opens Monday morning
    SB.Jobs.refreshAll(state);
    SB.Director.planWeek(state);
    refreshHours(state);
    /* the weekly tick of the story: the counters, then the chapters and the patches (09a-build-contract) */
    if (SB.Patches && SB.Patches.weekly) SB.Patches.weekly(state);
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'WEEK', null);
    if (SB.Chapters && SB.Chapters.check) SB.Chapters.check(state);
    if (SB.Patches && SB.Patches.check) SB.Patches.check(state);
    log(state, records);
    return U.yes({ records: records });
  }

  return {
    view: view, plan: plan, unplan: unplan, addJob: addJob, removeJob: removeJob, suggest: suggest, suggestAsks: suggestAsks, dropShift: dropShift,
    setDayJob: setDayJob, phoneOff: phoneOff, check: check, startPlay: startPlay, step: step, decide: decide, close: close,
    payBills: payBills, nextWeek: nextWeek, log: log, raise: raise,
    /* not in the manifest: E1a's own helpers, used by Game */
    blankWeek: blankWeek, refreshHours: refreshHours, resetShape: resetShape, recap: recap
  };
});
