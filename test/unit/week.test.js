'use strict';
// week.test — 06-harness section 3, `week.test`: the week, its jobs and its mail, through the public functions only (02-engine 2, 5.1).
// The night clock itself (hours, doNow, messages, staying up, the crunch) is in nightclock.test.js.
//   * a phone-off day sends and delivers nothing;
//   * a promise unticked is SKIPPED when its carrier resolves; an optional job is never reported late;
//   * step raises EVENING once a day and waits for Week.endNight; it never advances past a pending decision; DAY_START once a day;
//   * a new week plays by itself (no PLAN stop), and a decision handed to Week.raise during nextWeek is the first stop on Monday;
//   * after a show played through Night.begin, next and settle (not auto), state.week.log holds NIGHT_START, SET_START and SET_END, SETTLE_LINE,
//     SHOW_RESULT, LEARNED and TRUST records exactly once each, and Week.close reports `learned` and `people` from them;
//   * the scripted opening: the guided first show's first date is day 11 (the walkthrough); skipped, it is day 18 and every job of that show can be on time for a player who acts in week 0,
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
    /* walked through (the default): Dana's first show is a week and a half out, and the band waits for an answer */
    const guided = fresh(), gq = openingRequest(guided);
    t.ok(!!gq, 'a guided week 0 has the first show\'s request');
    if (gq) {
      t.eq(gq.dates[0], 11, 'the guided first show\'s first date is day 11, a Friday');
      t.eq(SB.time.fmt(11, 'dow'), 'Friday', 'day 11 is a Friday');
      t.ok(gq.replyBy >= 10, 'the guided first show\'s band waits for an answer until the night before (reply by day ' + gq.replyBy + ')');
    }
    /* "I've done this before": the month-out first show, every job of it on time for a player who acts in week 0 */
    const state = H.newGame(SB, { seed: 'week-1', tutorial: false });
    const q = openingRequest(state);
    t.ok(!!q, 'week 0 has the first show\'s request');
    if (!q) return;
    t.eq(q.dates[0], 18, 'the swap\'s first date is day 18 (two and a half weeks out) when the walkthrough is skipped');
    t.eq(SB.time.fmt(18, 'long'), 'Friday, February 5', 'day 18 is Friday, February 5');
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

  H.section(t, 'phone off', () => {
    const state = fresh('week-phone');
    const b = localBands(state)[0];
    const d = draftShow(state); if (!d || !b) { t.fail('no draft or band'); return; }
    t.ok(ok(SB.Week.phoneOff(state, 0, true)), 'Monday can be a phone-off day');
    toEvening(state);
    const r = askBand(state, d.showId, b);
    t.ok(ok(r), 'an ask queues');
    SB.Week.endNight(state);
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
    let r, guard = 0, stoppedAt = null, evenings = [];
    for (; guard < 400; guard++) {
      r = SB.Week.step(state);
      if (r && r.ok === false) { stoppedAt = r; break; }
      if (r.stop && r.stop.kind === 'DECISION') {
        const again = SB.Week.step(state);
        t.ok(again.ok === false && again.code === 'STOP_PENDING', 'step never advances past a pending decision (STOP_PENDING)');
        const cur = JSON.stringify(state.clock.cursor);
        SB.Week.step(state); t.eq(JSON.stringify(state.clock.cursor), cur, 'the cursor stays put while a decision is pending');
        SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options.filter(o => o.enabled !== false)[0].id);
      } else if (r.stop && r.stop.kind === 'EVENING') {
        evenings.push(r.stop.day);
        t.eq([r.cursor.dayIdx, r.cursor.half], [r.stop.dayIdx, 'NIGHT'], 'the evening stops the day at its night');
        const again = SB.Week.step(state);
        t.ok(again.ok === false && again.code === 'STOP_PENDING' && state.clock.stop.kind === 'EVENING', 'the evening is the player\'s until the night is called');
        t.ok(tonight(state).open, 'tonight is open');
        t.ok(ok(SB.Week.endNight(state)), 'Week.endNight calls it');
        t.ok(SB.Week.endNight(state).ok === false, 'once');
      } else if (r.stop && r.stop.kind === 'SHOW_NIGHT') SB.Night.auto(state, r.stop.showId, { settle: 'FAIR' });
      else if (r.stop && r.stop.kind === 'END_OF_WEEK') break;
    }
    t.ok(guard < 400 && !stoppedAt, 'step reaches the end of the week');
    t.eq(evenings, [0, 1, 2, 3, 4, 5, 6], 'EVENING is raised once a day, seven in the week');
    const recs = state.week.log.filter(x => x.t === 'DAY_START');
    t.eq(recs.length, 7, 'DAY_START is emitted once a day, seven in the week');
    t.eq(new Set(recs.map(x => x.day)).size, 7, 'on seven different days');
    const done = state.week.log.filter(x => x.t === 'JOB_DONE').map(x => x.jobId);
    t.eq(done.length, new Set(done).size, 'each job resolves once');
    t.ok(state.week.log.every(x => typeof x.n === 'number'), 'every logged record is stamped');
    t.eq(state.week.log.map(x => x.n), state.week.log.map((x, i) => i), 'the stamps run 0, 1, 2 ... in order');
  });

  /* ---- raise, and the week after ---- */
  H.section(t, 'room notices', () => {
    const state = H.newGame(SB, { seed: 'week-1', tutorial: false }), d = draftShow(state);
    if (!d) { t.fail('no draft show'); return; }
    const show = SB.Shows.get(state, d.showId), jobs = SB.Jobs.forShow(state, d.showId);
    const ann = jobs.filter(j => j.type === 'ANNOUNCE')[0];
    if (ann) t.ok(SB.Jobs.canDo(state, ann.id, 0, 'AM').ok === false, 'ANNOUNCE waits until a band has said yes');
    const n0 = (state.mail.messages || []).length, to = SB.Shows.get(state, d.showId).day + 1;
    const mv = SB.Shows.move(state, d.showId, { roomId: show.roomId, day: to, hold: { rank: 1, expires: null } });
    if (ok(mv)) {
      const m = state.mail.messages.slice(n0).filter(x => x.refs && x.refs.showId === d.showId)[0];
      t.ok(!!m && /moved to/.test(m.body), 'a show moved to another night sends one phone message');
    }
    const n1 = state.mail.messages.length;
    if (ok(SB.Shows.cancel(state, d.showId, 'ROOM'))) {
      const m = state.mail.messages.slice(n1).filter(x => x.refs && x.refs.showId === d.showId)[0];
      t.ok(!!m && /closed/.test(m.body), 'a room that cancels the show sends one phone message');
    }
  });

  H.section(t, 'raise', () => {
    const state = fresh('week-raise');
    const dec = { id: 'dtest', kind: 'BURNOUT', eventId: null, showId: null, day: 7, half: 'DAY', at: null, tier: null, title: 'test', body: 'test',
                  options: [{ id: 'REST', label: 'rest', likely: '', costs: [], enabled: true, why: null }], shows: [] };
    let g = 0; while (g++ < 60) { const st = toEvening(state); if (!st || st.kind === 'END_OF_WEEK') break; SB.Week.endNight(state); }
    t.eq(state.clock.stop && state.clock.stop.kind, 'END_OF_WEEK', 'the week still ends at END_OF_WEEK');
    SB.Week.close(state);
    SB.Week.raise(state, dec);
    t.eq(state.clock.pending.length >= 1, true, 'Week.raise puts the decision on clock.pending');
    const b = SB.Week.nextWeek(state);
    if (b && b.ok === false && b.code === 'BILLS_FIRST') { const bv = SB.Money.billsView(state); SB.Week.payBills(state, { pay: bv ? bv.lines.map(l => l.k) : [], late: [], ladder: [] }); SB.Week.nextWeek(state); }
    t.eq([state.clock.phase, state.clock.week, state.clock.stop], ['PLAY', 1, null], 'the new week plays by itself: no PLAN stop');
    t.eq(tonight(state).day, 7, 'and its clock is Monday\'s');
    const first = SB.Week.step(state);
    t.ok(first.stop && first.stop.kind === 'DECISION' && first.stop.decision.id === 'dtest', 'a decision handed to Week.raise is the first stop on Monday (got ' + JSON.stringify(first.stop && first.stop.kind) + ')');
    SB.Week.decide(state, 'dtest', 'REST');
    const ev = toEvening(state);
    t.ok(ev && ev.kind === 'EVENING' && ev.day === 7, 'then Monday reaches its evening without anybody pressing play');
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
