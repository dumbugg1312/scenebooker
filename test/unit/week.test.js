'use strict';
// week.test — 06-harness section 3, `week.test`: the week, its jobs and its mail, through the public functions only (02-engine 2, 5.1).
//   * a job cannot be planned before its needs, in the wrong half, or past its missed day; only HOURS jobs can be planned;
//   * overtime over OVERTIME_MAX is refused;
//   * a queued ask goes out the evening of the day it was written, free; the sixth and later item costs a Night hour; a phone-off day
//     sends and delivers nothing;
//   * a promise unticked is SKIPPED when its carrier resolves; an optional job is never reported late;
//   * step never advances past a pending decision, and is re-entrant: DAY_START once a day, each plan item once;
//   * a decision handed to Week.raise during nextWeek is the first stop on Monday;
//   * after a show played through Night.begin, next and settle (not auto), state.week.log holds NIGHT_START, SET_START and SET_END, SETTLE_LINE,
//     SHOW_RESULT, LEARNED and TRUST records exactly once each, and Week.close reports `learned` and `people` from them;
//   * the scripted opening: the swap's first date is day 31, every job of that show can be on time for a player who acts in week 0,
//     and the Checklist bot reaches a PLAYED show by week 4 with a verdict against Par of ABOUT or better in 80 percent of seeds.
// It needs the whole week machinery, so it runs when every module it names is a real file.
const H = require('../helpers.js');

module.exports = function (t) {
  const NEED = ['Game', 'Week', 'Shows', 'Jobs', 'Mail', 'Money', 'Stress', 'WorldGen', 'Director', 'Requests', 'Rooms', 'Bands', 'People', 'Notebook'];
  if (!H.needs(t, NEED, 'the week')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const E = SB.Enums, C = SB.Config;
  const ok = r => r && r.ok !== false;
  function fresh(seed) { return H.newGame(SB, { seed: seed || 'week-1' }); }
  function openingRequest(state) {
    /* the first show's request: the band that writes on day one (js/content/legacy.js opening.script, `first`);
       an older opening started with a swap */
    const ids = SB.Requests.list(state, { status: 'NEW' }), first = state.director && state.director.firstRequestId;
    const qs = ids.map(id => SB.Requests.get(state, id));
    return qs.filter(q => q.id === first)[0] || qs.filter(q => q.kind === 'SWAP')[0] || null;
  }
  function draftShow(state) {
    const q = openingRequest(state); if (!q) return null;
    const r = SB.Shows.create(state, { requestId: q.id });
    return ok(r) ? { showId: r.showId, request: q } : null;
  }

  /* ---- the scripted opening ---- */
  H.section(t, 'opening', () => {
    const state = fresh();
    const q = openingRequest(state);
    t.ok(!!q, 'week 0 has the first show\'s request');
    if (!q) return;
    t.eq(q.dates[0], 31, 'the swap\'s first date is day 31');
    t.eq(SB.time.fmt(31, 'long'), 'Thursday, February 18', 'day 31 is Thursday, February 18');
    const d = draftShow(state);
    t.ok(!!d, 'a show can be drafted from the swap');
    if (!d) return;
    const jobs = SB.Jobs.forShow(state, d.showId);
    t.ok(jobs.length >= 10, 'the show has its jobs (' + jobs.length + ')');
    const bad = jobs.filter(j => { const w = SB.Jobs.window(state, j.id, 0); return w.state === 'LATE' || w.state === 'MISSED'; }).map(j => j.type + ':' + SB.Jobs.window(state, j.id, 0).state);
    t.eq(bad, [], 'on day 0 no job of the swap show is late or missed: every job can be on time for a player who acts in week 0');
    const sixth = jobs.filter(j => { const w = SB.Jobs.window(state, j.id, 6); return w.state === 'MISSED'; }).map(j => j.type);
    t.eq(sixth, [], 'by the end of week 0 no job of the swap show is missed');
  });

  /* ---- planning refusals ---- */
  H.section(t, 'plan refusals', () => {
    const state = fresh('week-plan');
    const d = draftShow(state); if (!d) { t.fail('no draft show'); return; }
    const jobs = SB.Jobs.forShow(state, d.showId);
    const flyer = jobs.filter(j => j.type === 'MAKE_FLYER')[0];
    if (flyer) {
      const r = SB.Week.plan(state, flyer.id, 0, 'DAY', {});
      t.ok(r.ok === false && r.code === 'NEEDS', 'MAKE_FLYER cannot be planned before the room is confirmed (got ' + (r.ok === false ? r.code : 'ok') + ')');
    } else t.fail('the show has no MAKE_FLYER job');
    const hold = jobs.filter(j => j.type === 'HOLD_ROOM')[0];
    if (hold) { const r = SB.Week.plan(state, hold.id, 0, 'DAY', {}); t.ok(r.ok === false && r.code === 'INVALID', 'a MESSAGE job cannot be planned (INVALID)'); }
    const promise = jobs.filter(j => C.JOBS[j.type].mode === 'PROMISE')[0];
    if (promise) { const r = SB.Week.plan(state, promise.id, 0, 'DAY', {}); t.ok(r.ok === false, 'a PROMISE job cannot be planned'); }
    const lock = jobs.filter(j => j.type === 'LOCK_BILL')[0];
    if (lock) { const r = SB.Week.plan(state, lock.id, 0, 'DAY', {}); t.ok(r.ok === false && (r.code === 'NEEDS' || r.code === 'WINDOW'), 'LOCK_BILL needs ASK_LOCALS first'); }
    // an unknown id is a broken contract (6.4): SB.fail, not a refusal
    t.throws(() => SB.Week.plan(state, 'j999999', 0, 'DAY', {}), 'unknown', 'an unknown job id is a contract break');
  });

  H.section(t, 'plan: wrong half and window', () => {
    const state = fresh('week-half');
    const r = SB.Week.addJob(state, 'EXTRA_SHIFT', {}); t.ok(ok(r), 'EXTRA_SHIFT can be added');
    if (ok(r)) {
      const w = SB.Week.plan(state, r.jobId, 5, 'NIGHT', {});
      t.ok(w.ok === false && w.code === 'WRONG_HALF', 'a DAY-only job is refused at night (got ' + (w.ok === false ? w.code : 'ok') + ')');
    }
  });

  H.section(t, 'overtime', () => {
    // overtime is hours used over the day's capacity, summed per day (01-state: week.cap and week.used); OVERTIME_MAX is per day
    const state = fresh('week-ot');
    const day = SB.Week.view(state).days[0];
    const capDay = day.cap.DAY + day.cap.NIGHT;
    const a = SB.Week.addJob(state, 'EXTRA_SHIFT', {});
    if (!ok(a)) { t.fail('no EXTRA_SHIFT'); return; }
    const six = C.JOBS.EXTRA_SHIFT.hours;
    const first = SB.Week.plan(state, a.jobId, 0, 'DAY', {});
    const over1 = Math.max(0, six - capDay);
    if (over1 <= C.OVERTIME_MAX) t.ok(ok(first) && first.overtime === over1, 'a ' + six + '-hour job on a ' + capDay + '-hour day is ' + over1 + ' over, within OVERTIME_MAX (overtime ' + first.overtime + ')');
    else t.ok(first.ok === false && first.code === 'NO_HOURS', 'a job more than OVERTIME_MAX over the day is refused with NO_HOURS');
    const b = SB.Week.addJob(state, 'EXTRA_SHIFT', {});
    if (ok(b)) { const again = SB.Week.plan(state, b.jobId, 0, 'DAY', {}); t.ok(again.ok === false && again.code === 'NO_HOURS', 'a second one the same day goes over OVERTIME_MAX and is refused (got ' + (again.ok === false ? again.code : 'ok') + ')'); }
    t.ok(SB.Week.view(state).days[0].over <= C.OVERTIME_MAX, 'the day view never shows more than OVERTIME_MAX of overtime');
    const sat = SB.Week.view(state).days[5];
    const c = SB.Week.addJob(state, 'EXTRA_SHIFT', {});
    if (ok(c)) { const r = SB.Week.plan(state, c.jobId, 5, 'DAY', {}); t.ok(ok(r), 'a day off takes a six-hour job without trouble (overtime ' + (r && r.overtime) + ' of a ' + (sat.cap.DAY + sat.cap.NIGHT) + '-hour day)'); }
    const burn = SB.Week.unplan; t.ok(typeof burn === 'function', 'a planned job can be unplanned');
  });

  /* ---- mail: free evening send, the sixth costs an hour, phone off ---- */
  H.section(t, 'mail', () => {
    const state = fresh('week-mail');
    const bands = SB.Bands.list(state, { local: true, active: true });
    t.ok(bands.length >= 8, 'the town has local bands to ask (' + bands.length + ')');
    const d = draftShow(state); if (!d) { t.fail('no draft'); return; }
    const asked = [];
    bands.slice(0, 7).forEach(b => { const r = SB.Mail.ask(state, 'BAND_PLAY', b, { showId: d.showId, pay: 'FREE', fee: 0, wantSlot: 'OPEN', inPerson: false }); if (ok(r)) asked.push(r.askId); });
    t.ok(asked.length >= 6, 'six or more asks queued (' + asked.length + ')');
    const view = SB.Week.view(state);
    t.eq(view.days[0].queued, asked.length, 'the day header says how many go out tonight');
    t.ok(!SB.Week.check(state).ok, 'a sixth message in one evening shows up in the check as costing a Night hour');
    SB.Week.startPlay(state);
    const used0 = state.week.used[0].NIGHT;
    let guard = 0;
    while (guard++ < 60 && state.clock.cursor.dayIdx === 0) { const r = SB.Week.step(state); if (r.stop && r.stop.kind !== 'DECISION' && r.stop.kind !== 'REPLY' && r.stop.kind !== 'NEED_BY') break; if (r.stop && r.stop.kind === 'DECISION') SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options[0].id); }
    const sent = asked.filter(id => state.asks[id] && state.asks[id].status !== 'QUEUED');
    t.eq(sent.length, asked.length, 'every queued ask went out on Monday evening (' + sent.length + ' of ' + asked.length + ')');
    t.ok(state.week.used[0].NIGHT >= used0 + 1, 'the sixth and later items cost a Night hour');
    asked.forEach(id => t.eq(state.asks[id].sentDay, 0, 'ask ' + id + ' was sent on day 0'));
  });

  H.section(t, 'phone off', () => {
    const state = fresh('week-phone');
    const b = SB.Bands.list(state, { local: true, active: true })[0];
    const d = draftShow(state); if (!d || !b) { t.fail('no draft or band'); return; }
    const r = SB.Mail.ask(state, 'BAND_PLAY', b, { showId: d.showId, pay: 'FREE', fee: 0, wantSlot: 'OPEN', inPerson: false });
    t.ok(ok(r), 'an ask queues');
    t.ok(ok(SB.Week.phoneOff(state, 0, true)), 'Monday can be a phone-off day');
    SB.Week.startPlay(state);
    let guard = 0;
    while (guard++ < 40 && state.clock.cursor.dayIdx === 0) { const s = SB.Week.step(state); if (s.stop && s.stop.kind === 'DECISION') SB.Week.decide(state, s.stop.decision.id, s.stop.decision.options[0].id); }
    t.eq(state.asks[r.askId].status, 'QUEUED', 'nothing goes out on a phone-off day');
    const over = [0, 1, 2].filter(i => i > 0).map(i => SB.Week.phoneOff(state, i, true));
    t.ok(over.some(x => x.ok === false), 'at most MAIL.phoneOffPerWeek phone-off days a week (' + C.MAIL.phoneOffPerWeek + ')');
  });

  /* ---- promises and optional jobs ---- */
  H.section(t, 'promises and optional', () => {
    const state = fresh('week-promise');
    const d = draftShow(state); if (!d) { t.fail('no draft'); return; }
    const jobs = SB.Jobs.forShow(state, d.showId);
    const promises = jobs.filter(j => C.JOBS[j.type].mode === 'PROMISE');
    t.ok(promises.length >= 3, 'the show has promises (' + promises.map(p => p.type).join(', ') + ')');
    promises.forEach(p => t.ok(p.status === 'PROMISED' || p.status === 'TODO', p.type + ' starts ticked or ticking'));
    const gear = promises.filter(p => p.type === 'SORT_GEAR')[0];
    if (gear) {
      t.ok(ok(SB.Jobs.promise(state, gear.id, false)), 'a promise can be unticked');
      t.ok(SB.Jobs.get(state, gear.id).status === 'TODO', 'an unticked promise reads TODO');
      t.ok(ok(SB.Jobs.promise(state, gear.id, true)), 'and ticked again');
    }
    // an optional job is never late in the tray, the check or the badge
    const optional = jobs.filter(j => C.JOBS[j.type].optional);
    optional.forEach(j => { const w = SB.Jobs.window(state, j.id, 0); t.ok(w.state !== 'LATE' && w.state !== 'MISSED', 'optional ' + j.type + ' is not LATE or MISSED while it could still be done (' + w.state + ')'); });
    const tray = SB.Jobs.tray(state);
    t.eq(tray.late.filter(j => j.optional).map(j => j.type), [], 'the tray\'s late list holds no optional job');
    t.eq(SB.Week.check(state).issues.filter(i => i.jobId && SB.Jobs.get(state, i.jobId).optional).length, 0, 'the check never names an optional job as late');
  });

  /* ---- step ---- */
  H.section(t, 'step', () => {
    const state = fresh('week-step');
    SB.Week.startPlay(state);
    let r, guard = 0, dayStarts = 0, stoppedAt = null;
    for (; guard < 400; guard++) {
      r = SB.Week.step(state);
      if (r && r.ok === false) { stoppedAt = r; break; }
      if (r.stop && r.stop.kind === 'DECISION') {
        const again = SB.Week.step(state);
        t.ok(again.ok === false && again.code === 'STOP_PENDING', 'step never advances past a pending decision (STOP_PENDING)');
        const cur = JSON.stringify(state.clock.cursor);
        SB.Week.step(state); t.eq(JSON.stringify(state.clock.cursor), cur, 'the cursor stays put while a decision is pending');
        SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options.filter(o => o.enabled !== false)[0].id);
      } else if (r.stop && r.stop.kind === 'SHOW_NIGHT') SB.Night.auto(state, r.stop.showId, { settle: 'FAIR' });
      else if (r.stop && r.stop.kind === 'END_OF_WEEK') break;
    }
    t.ok(guard < 400, 'step reaches the end of the week');
    const recs = state.week.log.filter(x => x.t === 'DAY_START');
    t.eq(recs.length, 7, 'DAY_START is emitted once a day, seven in the week');
    t.eq(new Set(recs.map(x => x.day)).size, 7, 'on seven different days');
    const done = state.week.log.filter(x => x.t === 'JOB_DONE').map(x => x.jobId);
    t.eq(done.length, new Set(done).size, 'each plan item resolves once');
    t.ok(state.week.log.every(x => typeof x.n === 'number'), 'every logged record is stamped');
    t.eq(state.week.log.map(x => x.n), state.week.log.map((x, i) => i), 'the stamps run 0, 1, 2 ... in order');
  });

  /* ---- raise ---- */
  H.section(t, 'raise', () => {
    const state = fresh('week-raise');
    const dec = { id: 'dtest', kind: 'HARM', eventId: null, showId: null, day: 7, half: 'DAY', at: null, tier: null, title: 'test', body: 'test',
                  options: [{ id: 'LEAVE', label: 'leave it', likely: '', costs: [], enabled: true, why: null }] };
    SB.Week.startPlay(state);
    let g = 0; while (g++ < 400) { const r = SB.Week.step(state); if (r.stop && r.stop.kind === 'END_OF_WEEK') break; if (r.stop && r.stop.kind === 'DECISION') SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options.filter(o => o.enabled !== false)[0].id); if (r.stop && r.stop.kind === 'SHOW_NIGHT') SB.Night.auto(state, r.stop.showId, { settle: 'FAIR' }); }
    SB.Week.close(state);
    SB.Week.raise(state, dec);
    t.eq(state.clock.pending.length >= 1, true, 'Week.raise puts the decision on clock.pending');
    const b = SB.Week.nextWeek(state);
    if (b && b.ok === false && b.code === 'BILLS_FIRST') { const bv = SB.Money.billsView(state); SB.Week.payBills(state, { pay: bv ? bv.lines.map(l => l.k) : [], late: [], ladder: [] }); SB.Week.nextWeek(state); }
    SB.Week.startPlay(state);
    const first = SB.Week.step(state);
    t.ok(first.stop && first.stop.kind === 'DECISION' && first.stop.decision.id === 'dtest', 'a decision handed to Week.raise is the first stop on Monday (got ' + JSON.stringify(first.stop && first.stop.kind) + ')');
  });

  const NIGHT = ['Night', 'Forecast', 'Feedback', 'Legacy'];
  /* ---- a night played by hand: the log ---- */
  if (H.needs(t, NIGHT, 'a night played by hand')) H.section(t, 'night log', () => {
    const lib = require('../bots/lib.js');
    const checklist = require('../bots/checklist.js');
    const logs = {};
    const bot = checklist.make({
      name: 'checklist-by-hand',
      onNight: function (state, sb, showId) {
        lib.playNight(state, sb, showId, 'FAIR');
        logs[showId] = { log: JSON.parse(JSON.stringify(state.week.log)) };
      }
    });
    let found = null;
    for (let seed = 1; seed <= 6 && !found; seed++) {
      const run = require('../bots/run.js').runGame({
        sb: H.fresh({ packs: ['pensacola'] }), seed: 'night-log-' + seed, bot: bot, weeks: 8, city: 'pensacola',
        hooks: { afterClose: (state, S, report) => { const ids = Object.keys(logs); if (!found && ids.length) found = { showId: ids[0], report: report, log: state.week.log.slice(), logs: logs[ids[0]].log }; } }
      });
      if (!run.ok) { t.fail('a game by hand threw: ' + run.error.message); return; }
    }
    if (!found) { t.fail('no show was played in 8 weeks by six seeds of the Checklist bot'); return; }
    const count = type => found.log.filter(x => x.t === type && (x.showId === found.showId || x.showId === null || x.showId === undefined)).length;
    ['NIGHT_START', 'SHOW_RESULT'].forEach(k => t.eq(found.log.filter(x => x.t === k && x.showId === found.showId).length, 1, k + ' is in the week log exactly once'));
    t.eq(found.log.filter(x => x.t === 'SET_START').length, found.log.filter(x => x.t === 'SET_END').length, 'every SET_START has its SET_END');
    t.ok(found.log.some(x => x.t === 'SET_START'), 'the sets are in the log');
    t.ok(found.log.some(x => x.t === 'SETTLE_LINE'), 'the settle lines are in the log');
    t.eq(found.log.filter(x => x.t === 'SETTLE_DONE').length, 1, 'SETTLE_DONE once');
    t.ok(found.log.some(x => x.t === 'LEARNED') || found.report.learned.length === 0, 'LEARNED records are logged');
    const keyOf = r => JSON.stringify([r.t, r.n]);
    t.eq(found.log.length, new Set(found.log.map(keyOf)).size, 'no record is logged twice');
    t.eq(found.report.learned.length, found.log.filter(x => x.t === 'LEARNED' || x.t === 'NOTE').length, 'Week.close reports `learned` from the week\'s LEARNED and NOTE records');
    t.eq(found.report.people.length, found.log.filter(x => x.t === 'TRUST').length, 'Week.close reports `people` from the week\'s TRUST records');
  });

  /* ---- the first show ---- */
  if (H.needs(t, NIGHT, 'the first show')) H.section(t, 'checklist reaches a played show by week 4', () => {
    const run = require('../bots/run.js');
    let played = 0, about = 0, n = 20;
    for (let i = 0; i < n; i++) {
      const r = run.runGame({ sb: H.fresh({ packs: ['pensacola'] }), seed: 'first-show-' + i, bot: 'checklist', weeks: 5, city: 'pensacola' });
      if (!r.ok) { t.fail('seed ' + i + ' threw in the first five weeks: ' + r.error.message); continue; }
      const first = r.shows.filter(s => s.week <= 4)[0];
      if (first) { played++; if (['ABOUT', 'OVER', 'WAY_OVER'].indexOf(first.vsPar) >= 0) about++; }
    }
    t.ok(played / n >= .8, 'the Checklist bot has a PLAYED show by week 4 in at least 80 percent of seeds (' + played + ' of ' + n + ')');
    t.ok(about / n >= .8, 'and its verdict against Par is ABOUT or better in at least 80 percent of seeds (' + about + ' of ' + n + ')');
  });
};
