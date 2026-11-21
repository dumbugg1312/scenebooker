'use strict';
// nightclock.test — the night clock (design/spec/10-night-clock.md), through the public functions only:
//   * a work day leaves 4 hours and a day off 10, as one pool; the costs are the ones the user set; a new game is in play from day 0;
//   * Week.doNow resolves a job on the spot and takes its hours off tonight; it is refused before its needs, past its window, once the
//     night is called, and when it does not fit tonight plus the stay-up hour (NO_TIME, with what it takes and what is left);
//   * a message takes half an hour of the evening it is written; taking it back the same evening gives the time back; the evening send
//     costs nothing more;
//   * staying up adds stress and makes tomorrow that much shorter, and a record says so;
//   * a job handed to a helper costs only the half hour of asking, and is done when the night is called;
//   * a burnt-out day has no evening;
//   * Week.crunch names a due day with more work than hours;
//   * the guided first show: PROMO:PLAN is doing the job tonight, and it turns to WAIT (call it a night) when tonight is used up.
const H = require('../helpers.js');

module.exports = function (t) {
  const NEED = ['Game', 'Week', 'Shows', 'Jobs', 'Mail', 'Money', 'Stress', 'WorldGen', 'Director', 'Requests', 'Rooms', 'Bands', 'People', 'Notebook', 'Tutorial', 'Night'];
  if (!H.needs(t, NEED, 'the night clock')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const C = SB.Config;
  const ok = r => r && r.ok !== false;
  function openingRequest(state) {
    const ids = SB.Requests.list(state, { status: 'NEW' }), first = state.director && state.director.firstRequestId;
    const qs = ids.map(id => SB.Requests.get(state, id));
    return qs.filter(q => q.id === first)[0] || qs.filter(q => q.kind === 'SWAP')[0] || null;
  }
  function draftShow(state) {
    const q = openingRequest(state); if (!q) return null;
    const r = SB.Shows.create(state, { requestId: q.id });
    return ok(r) ? { showId: r.showId, request: q } : null;
  }

  /* ---- the night clock (design/spec/10-night-clock.md) ---- */
  const tonight = state => SB.Week.tonight(state);
  // step until the day reaches its evening (or something else stops it); answers decisions on the way
  function toEvening(state) {
    for (let g = 0; g < 80; g++) {
      const st = state.clock.stop;
      if (st && st.kind === 'EVENING') return st;
      const r = SB.Week.step(state);
      if (r.stop && r.stop.kind === 'DECISION') SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options.filter(o => o.enabled !== false)[0].id);
      else if (r.stop && r.stop.kind === 'SHOW_NIGHT') SB.Night.auto(state, r.stop.showId, { settle: 'FAIR' });
      else if (r.stop && r.stop.kind === 'END_OF_WEEK') return r.stop;
    }
    return null;
  }
  // call the night and play on to the next evening
  function nextEvening(state) { SB.Week.endNight(state); return toEvening(state); }
  const localBands = state => SB.Bands.list(state, { local: true, active: true });
  const askBand = (state, showId, b) => SB.Mail.ask(state, 'BAND_PLAY', b, { showId: showId, pay: 'FREE', fee: 0, wantSlot: 'OPEN', inPerson: false });

  H.section(t, 'the clock: hours and costs', () => {
    t.eq(C.HOURS, { shift: { DAY: 0, NIGHT: 4 }, off: { DAY: 5, NIGHT: 5 } }, 'a work day leaves 4 hours, a day off has 10');
    t.eq(C.OVERTIME_MAX, 1, 'staying up is at most an hour');
    t.eq(C.MAIL.hours, 0.5, 'a message is half an hour'); t.eq(C.MAIL.freePerDay, 0, 'and none is free');
    t.eq(C.FLYER.HOURS, { ROUGH: 1, STANDARD: 2, SHARP: 4 }, 'a flyer is 1 / 2 / 4 hours');
    t.eq([C.JOBS.PRINT.hours, C.JOBS.FLYER_RUN.hours, C.JOBS.LISTINGS.hours, C.JOBS.ANNOUNCE.hours, C.JOBS.WEEK_PUSH.hours, C.JOBS.LOCAL_AD.hours, C.JOBS.ADVANCE.hours],
         [1, 2, 0.5, 1, 1, 1, 1], 'printing 1, a poster run 2, listings a half, a promo post 1, the advance 1');
    const state = H.newGame(SB, { seed: 'clock-1', tutorial: false });
    t.eq(state.clock.phase, 'PLAY', 'a new game is in play from day 0: nobody sits in PLAN');
    const n = tonight(state);
    t.eq([n.day, n.dayIdx, n.cap, n.used, n.left, n.off, n.show, n.tired], [0, 0, 4, 0, 4, false, false, 0], 'Monday night with a full-time job: 4 hours, none used');
    t.eq(n.stay, { max: 1, used: 0, left: 1 }, 'and an hour to stay up');
    const v = SB.Week.view(state);
    t.eq(v.days.map(d => d.cap.DAY + d.cap.NIGHT), [4, 4, 4, 4, 4, 10, 10], 'the week is five 4-hour nights and two 10-hour days off');
    t.ok(v.tonight && v.tonight.left === 4 && Array.isArray(v.crunch), 'Week.view carries tonight and the crunch');
    t.ok(SB.Game.strip(state).tonight.cap === 4, 'and so does the strip');
    t.eq(SB.Week.suggest(state), [], '"the usual" is retired: it suggests nothing');
  });

  /* ---- doing a job tonight ---- */
  H.section(t, 'doNow: refusals', () => {
    const state = H.newGame(SB, { seed: 'week-plan', tutorial: false });
    const d = draftShow(state); if (!d) { t.fail('no draft show'); return; }
    const jobs = SB.Jobs.forShow(state, d.showId);
    const flyer = jobs.filter(j => j.type === 'MAKE_FLYER')[0];
    if (flyer) {
      const r = SB.Week.doNow(state, flyer.id, {});
      t.ok(r.ok === false && r.code === 'NEEDS', 'MAKE_FLYER cannot be done before the room is confirmed (got ' + (r.ok === false ? r.code : 'ok') + ')');
      t.eq(SB.Week.canDoNow(state, flyer.id, {}).code, 'NEEDS', 'and canDoNow says the same without doing anything');
    } else t.fail('the show has no MAKE_FLYER job');
    const hold = jobs.filter(j => j.type === 'HOLD_ROOM')[0];
    if (hold) { const r = SB.Week.doNow(state, hold.id, {}); t.ok(r.ok === false && r.code === 'INVALID', 'a MESSAGE job is not done as hours (INVALID)'); }
    const promise = jobs.filter(j => C.JOBS[j.type].mode === 'PROMISE')[0];
    if (promise) { const r = SB.Week.doNow(state, promise.id, {}); t.ok(r.ok === false, 'a PROMISE job is not done as hours'); }
    const lock = jobs.filter(j => j.type === 'LOCK_BILL')[0];
    if (lock) { const r = SB.Week.doNow(state, lock.id, {}); t.ok(r.ok === false && (r.code === 'NEEDS' || r.code === 'WINDOW'), 'LOCK_BILL needs ASK_LOCALS first'); }
    t.eq(tonight(state).used, 0, 'a refused job spends nothing');
    // an unknown id is a broken contract (6.4): SB.fail, not a refusal
    t.throws(() => SB.Week.doNow(state, 'j999999', {}), 'unknown', 'an unknown job id is a contract break');
    jobs.forEach(j => t.ok(j.due === j.window.idealUntil || (j.due === null && j.window.idealUntil == null), j.type + ' carries its due day (' + j.due + ')'));
    t.ok(jobs.some(j => typeof j.due === 'number'), 'due days are day numbers');
  });

  H.section(t, 'doNow: resolves and charges', () => {
    const state = H.newGame(SB, { seed: 'week-now', tutorial: false });
    const d = draftShow(state); if (!d) { t.fail('no draft show'); return; }
    toEvening(state);
    const rules = SB.Jobs.forShow(state, d.showId).filter(j => j.type === 'HOUSE_RULES')[0];
    if (!rules) { t.fail('the show has no HOUSE_RULES job'); return; }
    const can = SB.Week.canDoNow(state, rules.id, {});
    t.ok(ok(can) && can.hours === 1 && can.overtime === 0, 'canDoNow: writing the house rules down is an hour, and it fits');
    const before = tonight(state).left;
    const r = SB.Week.doNow(state, rules.id, {});
    t.ok(ok(r) && r.done === true && r.hours === 1 && r.overtime === 0, 'doNow does the job on the spot (' + JSON.stringify({ ok: r.ok, code: r.code, done: r.done }) + ')');
    t.eq(SB.Jobs.get(state, rules.id).status, 'DONE', 'the job is DONE');
    t.eq(state.jobs[rules.id].doneDay, state.clock.day, 'today');
    t.eq(tonight(state).left, before - 1, 'and its hour came off tonight');
    t.eq(r.tonight.left, before - 1, 'the result carries the clock');
    t.eq(r.records.filter(x => x.t === 'JOB_DONE' && x.jobId === rules.id).length, 1, 'with its JOB_DONE record');
    t.eq(state.week.log.filter(x => x.t === 'JOB_DONE' && x.jobId === rules.id).length, 1, 'logged once');
    t.eq(SB.Week.view(state).days[0].used.DAY + SB.Week.view(state).days[0].used.NIGHT, 1, 'the day shows an hour used');
    const again = SB.Week.doNow(state, rules.id, {});
    t.ok(again.ok === false && again.code === 'ALREADY', 'a job done is not done twice');
    // a job's half no longer restricts the player: a DAY job is done at night
    const x = SB.Week.addJob(state, 'EXTRA_SHIFT', {});
    if (ok(x)) t.ok(SB.Jobs.canDo(state, x.jobId, state.clock.day, 'NIGHT').ok !== false, 'a DAY job is not refused at night any more (no WRONG_HALF)');
    // once the night is called, what is left waits for tomorrow
    SB.Week.endNight(state);
    if (ok(x)) { const late = SB.Week.doNow(state, x.jobId, {}); t.ok(late.ok === false, 'nothing is done tonight once the night is called (' + (late.code || 'ok') + ')'); }
  });

  H.section(t, 'doNow: no time past the stay-up hour', () => {
    const state = H.newGame(SB, { seed: 'week-ot', tutorial: false });
    toEvening(state);
    const a = SB.Week.addJob(state, 'EXTRA_SHIFT', {});
    if (!ok(a)) { t.fail('no EXTRA_SHIFT'); return; }
    const six = C.JOBS.EXTRA_SHIFT.hours;
    const r = SB.Week.doNow(state, a.jobId, {});
    t.ok(r.ok === false && r.code === 'NO_TIME', 'a ' + six + '-hour job does not fit a 4-hour night, even staying up (got ' + (r.ok === false ? r.code : 'ok') + ')');
    t.eq([r.need, r.left, r.stay], [six, 4, 1], 'the refusal says what it takes and what there is');
    t.ok(typeof r.why === 'string' && r.why.length > 0, 'in words: ' + r.why);
    t.eq(SB.Jobs.get(state, a.jobId).status, 'TODO', 'the job is still to do');
    t.eq(tonight(state).used, 0, 'and nothing was spent');
    t.eq(state.player.stress, C.STRESS.START, 'nor any stress');
    // Saturday is a day off: ten hours take it
    let g = 0; while (state.clock.cursor.dayIdx < 5 && g++ < 12) nextEvening(state);
    t.eq([tonight(state).dayIdx, tonight(state).off, tonight(state).cap], [5, true, 10], 'Saturday is a day off with 10 hours');
    const sat = SB.Week.doNow(state, a.jobId, {});
    t.ok(ok(sat) && sat.overtime === 0, 'a day off takes a six-hour job without trouble');
    t.eq(tonight(state).left, 10 - six, 'and four hours are left');
  });

  H.section(t, 'staying up', () => {
    const state = H.newGame(SB, { seed: 'week-late', tutorial: false });
    const d = draftShow(state); if (!d) { t.fail('no draft'); return; }
    toEvening(state);
    const bands = localBands(state);
    let i = 0;
    while (tonight(state).left > 0 && i < bands.length) askBand(state, d.showId, bands[i++]);
    t.eq([tonight(state).left, i], [0, 8], 'eight messages fill a 4-hour night');
    const stress0 = state.player.stress;
    const half = askBand(state, d.showId, bands[i++]);
    t.ok(ok(half), 'a ninth message is half an hour of staying up');
    t.near(state.player.stress - stress0, C.STRESS.UP.OVERTIME * 0.5, 1e-9, 'which costs half of STRESS.UP.OVERTIME');
    t.eq(state.player.tired, { day: 1, hours: 0.5 }, 'and comes off tomorrow');
    t.eq(tonight(state).stay, { max: 1, used: 0.5, left: 0.5 }, 'half of the stay-up hour is used');
    const rec = state.week.log.filter(x => x.t === 'OVERTIME');
    t.ok(rec.length === 1 && rec[0].hours === 0.5 && rec[0].tired === 0.5, 'a record says so');
    askBand(state, d.showId, bands[i++]);
    t.eq(tonight(state).stay.left, 0, 'the hour is gone after the tenth');
    const no = askBand(state, d.showId, bands[i++]);
    t.ok(no.ok === false && no.code === 'NO_TIME', 'the eleventh waits for tomorrow (got ' + (no.ok === false ? no.code : 'ok') + ')');
    t.near(state.player.stress - stress0, C.STRESS.UP.OVERTIME, 1e-9, 'a whole hour up is STRESS.UP.OVERTIME');
    t.eq(SB.Week.view(state).days[1].cap, { DAY: 0, NIGHT: 3 }, 'tomorrow\'s night is an hour shorter');
    // taking one back the same evening gives the time back, and what staying up cost
    const out = SB.Mail.outbox(state);
    t.ok(ok(SB.Mail.unqueue(state, out[out.length - 1].id)), 'the last one can be taken back');
    t.eq(state.player.tired, { day: 1, hours: 0.5 }, 'tomorrow gets its half hour back');
    t.near(state.player.stress - stress0, C.STRESS.UP.OVERTIME * 0.5, 1e-9, 'and the stress of it');
    askBand(state, d.showId, bands[i++]);
    nextEvening(state);
    const n = tonight(state);
    t.eq([n.dayIdx, n.cap, n.left, n.tired], [1, 3, 3, 1], 'Tuesday night: tired, 3 hours where there were 4');
  });

  /* ---- mail: half an hour a message, charged when it is written ---- */
  H.section(t, 'mail', () => {
    const state = H.newGame(SB, { seed: 'week-mail', tutorial: false });
    const bands = localBands(state);
    t.ok(bands.length >= 8, 'the town has local bands to ask (' + bands.length + ')');
    const d = draftShow(state); if (!d) { t.fail('no draft'); return; }
    toEvening(state);
    const first = askBand(state, d.showId, bands[0]);
    t.ok(ok(first), 'an ask queues');
    t.eq([tonight(state).used, tonight(state).left], [0.5, 3.5], 'and takes half an hour of tonight');
    t.eq(state.asks[first.askId].paid, { day: 0, hours: 0.5 }, 'the ask remembers what it cost');
    t.ok(ok(SB.Mail.withdraw(state, first.askId)), 'it can be taken back before it goes out');
    t.eq(tonight(state).left, 4, 'which gives the half hour back');
    const q2 = SB.Requests.list(state, { status: 'NEW' }).filter(id => id !== d.request.id)[0];
    if (q2) {
      t.ok(ok(SB.Mail.reply(state, q2, 'PASS', { tone: 'SHORT' })), 'a reply queues');
      t.eq(tonight(state).left, 3.5, 'a reply is half an hour too');
      const out = SB.Mail.outbox(state).filter(o => o.requestId === q2)[0];
      t.ok(out && ok(SB.Mail.unqueue(state, out.id)), 'and can be taken back');
      t.eq(tonight(state).left, 4, 'for its half hour');
    } else t.note('no second request to answer on this seed');
    const asked = [];
    bands.slice(0, 7).forEach(b => { const r = askBand(state, d.showId, b); if (ok(r)) asked.push(r.askId); });
    t.eq(asked.length, 7, 'seven asks queued');
    t.eq(tonight(state).left, 0.5, 'three and a half hours of writing');
    t.eq(SB.Week.view(state).days[0].queued, asked.length, 'the day header says how many go out tonight');
    const used0 = state.week.used[0].NIGHT;
    SB.Week.endNight(state);
    let guard = 0;
    while (guard++ < 60 && state.clock.cursor.dayIdx === 0) { const r = SB.Week.step(state); if (r.stop && r.stop.kind === 'DECISION') SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options[0].id); }
    const sent = asked.filter(id => state.asks[id] && state.asks[id].status !== 'QUEUED');
    t.eq(sent.length, asked.length, 'every queued ask went out on Monday evening (' + sent.length + ' of ' + asked.length + ')');
    t.eq(state.week.used[0].NIGHT, used0, 'the evening send itself costs nothing more');
    asked.forEach(id => t.eq(state.asks[id].sentDay, 0, 'ask ' + id + ' was sent on day 0'));
    // written on another evening: taking it back gives nothing
    toEvening(state);
    const left = tonight(state).left;
    const late = state.asks[asked[0]];
    if (late && late.status === 'SENT') { SB.Mail.withdraw(state, late.id); t.eq(tonight(state).left, left, 'an ask that went out yesterday gives no time back'); }
  });

  /* ---- what is due when ---- */
  H.section(t, 'crunch', () => {
    const state = H.newGame(SB, { seed: 'week-crunch', tutorial: false });
    t.eq(SB.Week.crunch(state), [], 'nothing is due yet: no crunch');
    // a show three days out: no room yet, nothing to tell anybody, so no crunch
    const own = SB.Shows.create(state, { own: true, day: 3 });
    if (!ok(own)) { t.fail('no own show: ' + own.code); return; }
    t.eq(SB.Week.crunch(state), [], 'a draft (no room yet) is not in the crunch');
    // the room says yes: nearly everything about it is late, and Monday to Wednesday is three four-hour nights
    state.shows[own.showId].status = 'CONFIRMED';
    const c = SB.Week.crunch(state);
    t.ok(c.length >= 1, 'a booked show three days out with everything still to do is a crunch');
    if (!c.length) return;
    t.ok(c[0].day >= 0 && c[0].day < 3, 'the short day comes before the show (day ' + c[0].day + ')');
    t.ok(c[0].need > c[0].have && c[0].short === c[0].need - c[0].have, 'it needs more than the free hours (' + c[0].need + ' against ' + c[0].have + ')');
    t.ok(c[0].have < 13, 'late work is due by the last day it still helps, not all tonight: the hours of up to three nights (' + c[0].have + ')');
    const due = SB.Jobs.forShow(state, own.showId).filter(j => c[0].jobs.indexOf(j.id) >= 0);
    t.eq(due.reduce((n, j) => n + j.hours, 0), c[0].need, 'need is the hours of the jobs it names');
    t.ok(due.every(j => j.mode === 'HOURS' && !j.optional), 'which are the player\'s own and not optional');
    t.ok(c.every((x, i) => i === 0 || x.day > c[i - 1].day), 'short days come soonest first');
    t.eq(SB.Week.view(state).crunch, c, 'Week.view carries the same list');
    // a booked show a week out: the work fits the week's nights and the weekend
    const roomy = H.newGame(SB, { seed: 'week-crunch-2', tutorial: false });
    const wk = SB.Shows.create(roomy, { own: true, day: 8 });
    t.ok(ok(wk), 'a show a week out can be drafted');
    roomy.shows[wk.showId].status = 'CONFIRMED';
    t.eq(SB.Week.crunch(roomy), [], 'a booked show a week out fits: no crunch');
    // a show far out never shows up
    const later = SB.Shows.create(state, { own: true, day: 40 });
    t.ok(ok(later), 'a show far out can be drafted');
    state.shows[later.showId].status = 'CONFIRMED';
    t.ok(SB.Week.crunch(state).every(x => x.jobs.every(id => state.jobs[id].showId === own.showId)), 'a show five weeks out is not in the crunch');
  });

  /* ---- the evening stop, and the week after ---- */
  H.section(t, 'evenings and the next week', () => {
    const state = H.newGame(SB, { seed: 'clock-week', tutorial: false });
    const evenings = [];
    let end = null;
    for (let g = 0; g < 20 && !end; g++) {
      const st = toEvening(state);
      if (!st) break;
      if (st.kind === 'END_OF_WEEK') { end = st; break; }
      evenings.push(st.day);
      const held = SB.Week.step(state);
      t.ok(held.ok === false && held.code === 'STOP_PENDING' && state.clock.cursor.half === 'NIGHT', 'day ' + st.day + ': nothing of the night runs until it is called');
      t.ok(ok(SB.Week.endNight(state)) && SB.Week.endNight(state).ok === false, 'day ' + st.day + ': the night is called once');
    }
    t.eq(evenings, [0, 1, 2, 3, 4, 5, 6], 'EVENING is raised once a day');
    t.ok(!!end, 'and the week still ends at END_OF_WEEK');
    t.ok(SB.Week.endNight(state).ok === false, 'there is no night to call at the end of the week');
    const report = SB.Week.close(state);
    t.ok(report && report.week === 0, 'the weekly close is still there');
    let b = SB.Week.nextWeek(state);
    if (b && b.ok === false && b.code === 'BILLS_FIRST') { const bv = SB.Money.billsView(state); SB.Week.payBills(state, { pay: bv ? bv.lines.map(l => l.k) : [], late: [], ladder: [] }); b = SB.Week.nextWeek(state); }
    t.ok(ok(b), 'the next week starts');
    t.eq([state.clock.phase, state.clock.week, state.clock.stop], ['PLAY', 1, null], 'already playing: there is no PLAN stop');
    t.ok(ok(SB.Week.startPlay(state)), 'the old "play the week" is a harmless yes');
    const ev = toEvening(state);
    t.ok(ev && ev.kind === 'EVENING' && ev.day === 7, 'and Monday reaches its evening by itself');
    t.eq(tonight(state).cap, 4, 'with Monday\'s four hours');
  });

  /* ---- a burnt-out day ---- */
  H.section(t, 'burnt out: no evening', () => {
    const state = H.newGame(SB, { seed: 'clock-burnt', tutorial: false });
    toEvening(state); SB.Week.endNight(state);
    state.player.burnoutUntil = 5;                        // Tuesday to Friday: two weeks off, cut short for the test
    SB.Week.recap(state);
    const ev = toEvening(state);
    t.ok(ev && ev.kind === 'EVENING' && ev.day === 5, 'the burnt-out days go by with no evening to spend: the next one is Saturday (' + JSON.stringify(ev) + ')');
    t.eq(SB.Week.view(state).days.slice(1, 5).map(d => d.cap.DAY + d.cap.NIGHT), [0, 0, 0, 0], 'they had no hours');
  });

  /* ---- the couch, fried ---- */
  H.section(t, 'couch and fried', () => {
    const state = H.newGame(SB, { seed: 'clock-couch', tutorial: false });
    const caps = () => SB.Week.view(state).days.map(d => d.cap.DAY + d.cap.NIGHT);
    t.eq(caps(), [4, 4, 4, 4, 4, 10, 10], 'a full-time week: 40 hours');
    state.player.couch = true; SB.Week.recap(state);
    t.eq(caps().reduce((a, b) => a + b, 0), 40 + C.MONEY.COUCH.hours, 'on a couch the week is COUCH.hours shorter');
    t.ok(caps()[5] < 10 && caps()[6] < 10, 'the days off pay first (' + caps().join(', ') + ')');
    state.player.couch = false; state.player.stress = C.STRESS_ZONES[1] + 2; SB.Week.recap(state);
    t.eq(caps(), [4, 4, 4, 4, 4, 10 + C.FRIED.hoursOffDay, 10 + C.FRIED.hoursOffDay], 'fried: a day off is FRIED.hoursOffDay shorter');
    t.eq(tonight(state).stay.max, 1, 'fried can still stay up');
    state.player.stress = C.STRESS_ZONES[2] + 2;
    t.eq(tonight(state).stay.max, 0, 'burning out cannot');
  });

  /* ---- the guided first show, and a job handed to somebody ---- */
  // what the texts say, as the card would do it; -> false when the stage is one to call the night on
  function walker(state) {
    return function act() {
      const c = SB.Tutorial.current(state), cast = SB.Tutorial.cast(state);
      if (!c) return false;
      switch (c.step + ':' + c.stage) {
        case 'ANSWER:REPLY': SB.Shows.create(state, { requestId: c.requestId }); SB.Tutorial.notify(state, 'STEP'); return true;
        case 'HOLD:ASK': return ok(SB.Mail.ask(state, 'ROOM_HOLD', cast.roomId, { showId: c.showId }));
        case 'HOLD:CONFIRM': return ok(SB.Mail.ask(state, 'ROOM_CONFIRM', cast.roomId, { showId: c.showId }));
        case 'BILL:OFFER': return ok(SB.Mail.reply(state, c.requestId, 'OFFER', { showId: c.showId }));
        case 'BILL:KIDS': case 'BILL:LOCAL': return ok(SB.Mail.ask(state, 'BAND_PLAY', c.bandId, { showId: c.showId, pay: 'FREE', fee: 0, wantSlot: c.slot }));
        case 'SOUND:ASK': return ok(SB.Mail.ask(state, 'CREW', c.personId, { showId: c.showId, role: 'sound', pay: { kind: 'CASH', amount: 0 } }));
        case 'FLYER:MAKE': return ok(SB.Jobs.setFlyer(state, c.showId, { template: 'x' }));
        default: return false;
      }
    };
  }

  H.section(t, 'the guided first show', () => {
    const state = H.newGame(SB, { seed: 'clock-guided' });
    const cur = () => SB.Tutorial.current(state);
    const at = () => { const c = cur(); return c ? c.step + ':' + c.stage : null; };
    const act = walker(state);
    let nights = 0, waited = [];
    for (; nights < 14 && at() !== 'PROMO:PLAN'; nights++) {
      if (!toEvening(state)) break;
      let n = 0; while (n++ < 12 && act()) { /* everything the texts ask for tonight */ }
      if (at() === 'PROMO:PLAN') break;
      if (cur()) { waited.push(at()); t.eq(cur().target, 'lamp', at() + ' sends the player to the tape deck: call it a night'); }
      SB.Week.endNight(state);
    }
    t.eq(at(), 'PROMO:PLAN', 'the walk reaches the promo step night by night (' + nights + ' nights; waited on ' + waited.join(', ') + ')');
    if (at() !== 'PROMO:PLAN') return;
    t.ok(waited.length > 0 && waited.every(k => /:WAIT$/.test(k)), 'between asks the stage is WAIT');
    const c = cur(), flyerJob = state.jobs[c.jobId];
    t.eq(flyerJob && flyerJob.type, 'MAKE_FLYER', 'PROMO:PLAN names the job to do tonight: the flyer first');
    t.eq(c.target, 'clip', 'on the show\'s card');
    t.ok(ok(SB.Week.canDoNow(state, c.jobId, {})), 'and it fits tonight');
    // hand the flyer to somebody: half an hour of asking, and it is done when the night is called
    const left = tonight(state).left, people = Object.keys(state.people);
    let handed = null, asked = 0;
    for (let i = 0; i < people.length && !handed && tonight(state).left >= 0.5; i++) {
      const r = SB.Week.doNow(state, c.jobId, { by: people[i] });
      t.ok(ok(r) && r.hours === 0.5, 'asking ' + people[i] + ' is half an hour');
      asked++;
      if (r.handed) handed = people[i];
    }
    t.eq(tonight(state).left, left - 0.5 * asked, 'each ask took its half hour, yes or no');
    if (handed) {
      const v = SB.Jobs.get(state, c.jobId);
      t.eq([v.status, v.by], ['PLANNED', handed], 'the job is theirs');
      t.ok(at() !== 'PROMO:PLAN' || cur().jobId !== c.jobId, 'and the walk moves on to the next job');
      // the next job, done by hand tonight
      const c2 = cur();
      if (c2 && c2.step === 'PROMO' && c2.stage === 'PLAN') {
        const before = tonight(state).left, r = SB.Week.doNow(state, c2.jobId, {});
        t.ok(ok(r) && r.done, 'the next promo job is done tonight (' + state.jobs[c2.jobId].type + ')');
        t.eq(tonight(state).left, before - r.hours, 'for its hours');
      }
      SB.Week.endNight(state);
      const r = SB.Week.step(state);
      t.ok(r.records.some(x => x.t === 'HELPER_REPORT' && x.jobId === c.jobId), 'the helper reports when the night is called');
      t.ok(['DONE', 'TODO'].indexOf(state.jobs[c.jobId].status) >= 0, 'done, or not done and back on the list (' + state.jobs[c.jobId].status + ')');
    } else t.note('nobody said yes to the flyer on this seed');
  });

  H.section(t, 'the guided first show: out of hours', () => {
    const state = H.newGame(SB, { seed: 'clock-guided' });
    const cur = () => SB.Tutorial.current(state);
    const act = walker(state);
    for (let nights = 0; nights < 14; nights++) {
      if (!toEvening(state)) break;
      let n = 0; while (n++ < 12 && act()) { /* tonight's asks */ }
      if (cur() && cur().step === 'PROMO' && cur().stage === 'PLAN') break;
      SB.Week.endNight(state);
    }
    const c = cur();
    if (!c || c.step !== 'PROMO' || c.stage !== 'PLAN') { t.fail('the walk did not reach PROMO:PLAN'); return; }
    // use tonight up on other mail: the flyer no longer fits, and the walk says to call it a night
    const bands = localBands(state).filter(b => !(state.shows[c.showId].bill.slots || []).some(x => x.bandId === b));
    let i = 0;
    while (SB.Week.canDoNow(state, c.jobId, {}).ok !== false && i < bands.length) askBand(state, c.showId, bands[i++]);
    const no = SB.Week.canDoNow(state, c.jobId, {});
    t.ok(no.ok === false && no.code === 'NO_TIME', 'the flyer no longer fits tonight (' + (no.code || 'ok') + ')');
    const w = cur();
    t.eq([w.step, w.stage, w.target, w.jobId], ['PROMO', 'WAIT', 'lamp', c.jobId], 'the walk turns to WAIT: call it a night, the flyer waits for tomorrow');
    nextEvening(state);
    const again = cur();
    t.eq([again.step, again.stage, again.jobId], ['PROMO', 'PLAN', c.jobId], 'and tomorrow night it is the job to do again');
  });

  /* ---- a show night ---- */
  H.section(t, 'show night', () => {
    const state = H.newGame(SB, { seed: 'clock-guided' });
    const act = walker(state);
    let n = null, last = null;
    for (let nights = 0; nights < 16; nights++) {
      const st = toEvening(state);
      if (st && st.kind === 'END_OF_WEEK') {                 // Sunday night: the close-out, and Monday plays by itself
        SB.Week.close(state);
        const b = SB.Week.nextWeek(state);
        if (b && b.ok === false && b.code === 'BILLS_FIRST') { const bv = SB.Money.billsView(state); SB.Week.payBills(state, { pay: bv ? bv.lines.map(l => l.k) : [], late: [], ladder: [] }); SB.Week.nextWeek(state); }
        continue;
      }
      if (!st || st.kind !== 'EVENING') break;
      let k = 0; while (k++ < 12 && act()) { /* the asks */ }
      const c = SB.Tutorial.current(state);
      if (c && c.step === 'PROMO' && c.stage === 'PLAN') SB.Week.doNow(state, c.jobId, {});
      n = tonight(state);
      if (n.show) break;
      last = n;
      SB.Week.endNight(state);
    }
    if (!n || !n.show) { t.fail('the guided first show never reached its night'); return; }
    t.eq([n.day, n.off, n.cap], [11, false, 4], 'the first show is on Friday the 11th, after work');
    t.eq([n.reserved, n.left, n.used], [4, 0, 4], 'running the show takes the evening: all four hours, and no more than the day has');
    t.eq(n.stay, { max: 1, used: 0, left: 1 }, 'which is not staying up by itself');
    t.ok(last && last.reserved === 0, 'the night before had nothing reserved');
    t.eq(state.player.stress <= C.STRESS.START + 1e-9, true, 'and costs no overtime stress');
    SB.Week.endNight(state);
    const r = SB.Week.step(state);
    t.ok(r.stop && r.stop.kind === 'SHOW_NIGHT' && r.stop.showId === n.showId, 'calling the night opens the doors (' + JSON.stringify(r.stop) + ')');
  });
};
