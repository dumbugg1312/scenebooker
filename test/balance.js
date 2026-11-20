'use strict';
// test/balance.js — the balance matrix of 06-harness section 5. Exports { main(argv) }; `node test/run.js balance`.
//
//   node test/run.js balance [--seeds 200] [--years 6] [--cities pensacola,philadelphia] [--bills on|off|both] [--bots a,b,..]
//                            [--jobs N] [--quick] [--strict] [--stubs] [--out test/report]
//
// The full matrix is five bots (and the two Learner variants) x 200 seeds x 6 years x two cities x bills on and off, text off: about
// 5,600 six-year games. Games run in worker processes (--jobs, default the number of cores less one). --quick is 6 seeds of 3 years
// in Pensacola, bills on, the five bots: enough to see whether the report has data at all.
// It writes test/report/balance.json (every measure, with the per-run values) and balance.md (median and 10th to 90th percentile
// against the target, a MISS for each target outside its range, and the Config constants that most plausibly move it).
// Exit code 1 when any game threw (a harness failure); a MISS is a finding, not a failure, unless --strict is given.
//
// Targets are those of 06-harness 5.2. Where a measure needs an experiment, not a bot run (the T-7 against T-28 hall show, the door
// price, the stacking of four crowds, a paid push, the address in print), it is run on the golden show (test/fixtures/golden.js).
// A target the harness cannot yet measure is listed as "not measured" with the reason: it is never reported as met.
const fs = require('fs'), path = require('path'), cp = require('child_process'), os = require('os');
const H = require('./helpers.js');

const REPORT_DIR = path.join(__dirname, 'report');
const ALL_BOTS = ['checklist', 'learner', 'late', 'gambler', 'random', 'learner-specialist', 'learner-allround'];

/* ---------------- a game, in a worker ---------------- */

const STRESS_CUTS = [40, 70, 90];
const REQ_KINDS = { COLD: 1, REFERRAL: 1, RETURNING: 1, SWAP: 1 };
const WEEKNIGHT = { 0: 1, 1: 1, 2: 1, 3: 1, 6: 1 };     // Monday to Thursday and Sunday

function playOne(job) {
  const run = require('./bots/run.js');
  const acc = { tokens: {}, choices: {}, nameBeat: 0, nameAll: 0, lateRent1: false, offerWeek: null, reqEarly: null, luck: [], bankMonthEnds: [], stageWeek: {}, reqByWeek: {}, harm: 0 };
  const withLuck = job.measureLuck;
  const r = run.runGame({
    seed: job.seed, bot: job.bot, weeks: job.weeks, city: job.city, bills: job.bills, text: !!job.text, stubsOnly: !!job.stubs,
    hooks: {
      afterWeek: (state, SB, row) => {
        // tokens placed for each show this week, and their hours
        (state.week.plan || []).forEach(it => {
          const j = state.jobs[it.jobId]; if (!j || !j.showId) return;
          const a = acc.tokens[j.showId] = acc.tokens[j.showId] || { n: 0, zero: 0, hours: 0 };
          a.n++; if (!it.hours) a.zero++; a.hours += it.hours || 0;
        });
        (state.week.log || []).forEach(rec => {
          if (rec.t === 'NAME') { const d = rec.to - rec.from; if (d > 0) { acc.nameAll += d; if (rec.k === 'BEAT') acc.nameBeat += d; } }
          else if (rec.t === 'LADDER' && rec.k === 'LATE_RENT' && row.week < 52) acc.lateRent1 = true;
          else if (rec.t === 'CHOICE' && rec.showId) { const c = acc.choices[rec.showId] = acc.choices[rec.showId] || { n: 0, doors: 0, count: 0 }; c.n++; if (rec.eventId === 'DOORS') c.doors++; if (rec.eventId === 'COUNT') c.count++; }
        });
        if (state.player && state.player.stage && !acc.stageWeek[state.player.stage]) acc.stageWeek[state.player.stage] = row.week;
        if (acc.offerWeek === null && state.legacy && state.legacy.offers && state.legacy.offers.length) acc.offerWeek = row.week;
        if (SB.time.billsDue(row.week) && state.money && typeof state.money.bank === 'number') acc.bankMonthEnds.push(state.money.bank);
        if (row.week === 20) {
          let n = 0; Object.keys(state.requests || {}).forEach(id => { const q = state.requests[id]; if (REQ_KINDS[q.kind] && q.day >= 28 && q.day <= 20 * 7) n++; });
          acc.reqEarly = n;
        }
        if (row.week % 13 === 12) { Object.keys(state.requests || {}).forEach(id => { const q = state.requests[id]; const w = Math.floor(q.day / 7); if (REQ_KINDS[q.kind] || q.kind === 'RESCUE') acc.reqByWeek[w] = (acc.reqByWeek[w] || 0) + 0; }); }
      },
      afterShow: withLuck ? (state, SB, showId, row) => {
        try {
          const o = SB.Forecast.ablate(state, showId, 'LUCK');
          const noLuck = o && o.night ? o.night.heads : (o && typeof o.heads === 'number' ? o.heads : null);
          if (noLuck !== null) acc.luck.push([row.heads, noLuck]);
        } catch (e) { /* the engine's problem, reported by the unit tests */ }
      } : null
    }
  });
  const st = r.state || {};
  if (st.requests) Object.keys(st.requests).forEach(id => { const q = st.requests[id]; if (REQ_KINDS[q.kind] || q.kind === 'RESCUE') { const w = Math.floor(q.day / 7); acc.reqByWeek[w] = (acc.reqByWeek[w] || 0) + 1; } });
  acc.harm = st.harm ? (st.harm.closed || []).length + (st.harm.open ? 1 : 0) : 0;
  const wall = st.legacy && st.legacy.wall ? st.legacy.wall.length : null;
  // local bands at tier 3 or more that the player booked (the "booked first" count is approximated by "has played for the player")
  let tier3 = null;
  try { if (st.bands && globalThis.SB && globalThis.SB.Bands) tier3 = Object.keys(st.bands).filter(id => { const b = st.bands[id]; return b.local && (b.shows || []).length && globalThis.SB.Bands.tier(st, b, 'city') >= 3; }).length; } catch (e) { tier3 = null; }
  r.shows.forEach(s => { const a = acc.tokens[s.id], c = acc.choices[s.id]; if (a) { s.tokens = a.n; s.zeroTokens = a.zero; s.hours = a.hours; } if (c) { s.choices = c.n; s.doorsStop = c.doors; s.countStop = c.count; } });
  let tierBands = null;
  try { tierBands = st.bands ? Object.keys(st.bands).filter(id => st.bands[id].local && (st.bands[id].shows || []).length).length : null; } catch (e) { tierBands = null; }
  return {
    bot: job.bot, seed: job.seed, city: job.city, bills: job.bills, ok: r.ok, error: r.error ? { message: r.error.message, week: r.error.week } : null, weeks: r.weeks, ms: r.ms,
    deadEnds: r.deadEnds, decisions: r.counts.decisions,
    rows: r.rows.map(x => ({ week: x.week, name: x.name, followers: x.followers, stage: x.stage, stress: x.stress, regulars: x.regulars, fund: x.fund, bank: x.bank, word: x.word, decisions: x.decisions, hoursUsed: x.hoursUsed, hoursCap: x.hoursCap, showsPlayed: x.showsPlayed })),
    shows: r.shows, extra: { nameBeat: acc.nameBeat, nameAll: acc.nameAll, lateRent1: acc.lateRent1, offerWeek: acc.offerWeek, reqEarly: acc.reqEarly, luck: acc.luck, bankMonthEnds: acc.bankMonthEnds,
                             stageWeek: acc.stageWeek, reqByWeek: acc.reqByWeek, harm: acc.harm, wall: wall, tier3: tier3, trustedBands: trustedBands(st) }
  };
}

function trustedBands(st) {
  if (!st.bands) return null;
  return Object.keys(st.bands).filter(id => { const b = st.bands[id]; return b.local && b.trust && b.trust.base >= 60; }).length;
}

/* ---------------- workers ---------------- */

function runAll(jobs, nJobs, inline) {
  if (inline || nJobs <= 1) return Promise.resolve(jobs.map(j => playOne(j)));
  return new Promise(resolve => {
    const results = new Array(jobs.length); let next = 0, done = 0;
    const workers = [];
    function feed(w) {
      if (next >= jobs.length) { w.send({ stop: true }); return; }
      const i = next++; w.send({ i: i, job: jobs[i] });
    }
    for (let k = 0; k < Math.min(nJobs, jobs.length); k++) {
      const w = cp.fork(__filename, ['--worker'], { stdio: ['ignore', 'inherit', 'inherit', 'ipc'] });
      workers.push(w);
      w.on('message', m => {
        results[m.i] = m.result; done++;
        if (done % 50 === 0 || done === jobs.length) process.stdout.write('\r  ' + done + ' of ' + jobs.length + ' games   ');
        if (done === jobs.length) { workers.forEach(x => { try { x.kill(); } catch (e) { /* gone */ } }); process.stdout.write('\n'); resolve(results); } else feed(w);
      });
      w.on('exit', () => { /* a worker that died leaves holes, caught below */ });
      feed(w);
    }
    if (!jobs.length) resolve([]);
  });
}

/* ---------------- the targets ---------------- */

const q = (xs, p) => H.pct(xs, p);
function stats(xs) { xs = xs.filter(x => typeof x === 'number' && isFinite(x)); return xs.length ? { n: xs.length, med: H.median(xs), p10: q(xs, .1), p90: q(xs, .9), mean: H.mean(xs) } : null; }
const within = (v, lo, hi) => v !== null && v !== undefined && v >= lo && v <= hi;

function makeCtx(results) {
  const ok = results.filter(r => r && r.ok);
  const by = (bot, filter) => ok.filter(r => r.bot === bot && (!filter || filter(r)));
  const rowAt = (r, w) => r.rows.filter(x => x.week === w)[0] || r.rows[Math.min(r.rows.length - 1, w)];
  const showsIn = (r, w0, w1) => r.shows.filter(s => s.week >= w0 && s.week < w1);
  const ratioOf = (shows) => { const x = shows.filter(s => s.par > 0 && typeof s.heads === 'number').map(s => s.heads / s.par); return x.length ? H.mean(x) : null; };
  return { ok: ok, by: by, rowAt: rowAt, showsIn: showsIn, ratioOf: ratioOf, all: results };
}

// Each target: { id, text, target (text), lo, hi (numbers) or test(v), measure(ctx) -> { value, per: [run values], note } | null, why: [Config names], skip: 'reason' }
function targets(experiments) {
  const T = [];
  function add(t) { T.push(t); }
  const perRun = (ctx, bot, f, filter) => ctx.by(bot, filter).map(f).filter(x => typeof x === 'number' && isFinite(x));
  const dist = (xs) => { const s = stats(xs); return s ? { value: s.med, per: xs, stats: s } : null; };

  add({ id: 'checklist-par', text: 'Checklist: average heads / Par', lo: .97, hi: 1.03, why: ['USUAL', 'PAR', 'BEAT', 'CHANNELS.REACH_REF', 'SCENE_RATE'],
        measure: c => dist(perRun(c, 'checklist', r => c.ratioOf(r.shows))) });
  add({ id: 'learner-par-y2', text: 'Learner: average heads / Par in year 2', lo: 1.12, hi: 1.22, why: ['LEARN', 'PRIOR', 'CALL_K', 'FOG', 'TRUTH vs public draw (FOLLOW_RATE, AWAY_RATE)'],
        measure: c => dist(perRun(c, 'learner', r => c.ratioOf(c.showsIn(r, 52, 104)))) });
  add({ id: 'late-par', text: 'Late: average heads / Par', lo: .40, hi: .50, why: ['TAU', 'LEAD_EXP', 'CHANNELS.LISTING_DEADLINE', 'JOBS.*.ideal'],
        measure: c => dist(perRun(c, 'late', r => c.ratioOf(r.shows))) });
  add({ id: 't7-vs-t28', text: 'A hall show announced at T-7 against T-28, all else equal', lo: .34, hi: .42, why: ['TAU', 'LEAD_EXP', 'ROOM_TAU', 'CHANNELS.LISTING_DEADLINE'],
        measure: () => experiments.t7t28 === undefined ? null : { value: experiments.t7t28, per: [], note: experiments.note } });
  add({ id: 'checklist-name-y1', text: 'Checklist: Name at the end of year 1 (clean nights alone)', lo: 13, hi: 18, why: ['NAME_CLEAN', 'NAME_K', 'NAME_START', 'NAME_IDLE'],
        measure: c => dist(perRun(c, 'checklist', r => (c.rowAt(r, 51) || {}).name)) });
  add({ id: 'checklist-beat-share', text: 'Checklist: share of Name gained from the Beat (percent)', lo: 0, hi: 15, why: ['BEAT', 'NAME_K', 'NAME_CLEAN', 'USUAL'],
        measure: c => dist(perRun(c, 'checklist', r => r.extra.nameAll > 0 ? 100 * r.extra.nameBeat / r.extra.nameAll : null)) });
  add({ id: 'learner-name-y2', text: 'Learner: Name at the end of year 2', lo: 45, hi: 100, why: ['NAME_K', 'BEAT', 'LEARN', 'NAME_CLEAN'],
        measure: c => dist(perRun(c, 'learner', r => (c.rowAt(r, 103) || {}).name)) });
  add({ id: 'learner-offer', text: 'Learner: runs with an offer by week 200 (percent)', lo: 60, hi: 80, why: ['OFFERS', 'STAGES.4', 'NAME_MAX'],
        measure: c => { const rs = c.by('learner', r => r.weeks >= 200); if (!rs.length) return null; return { value: 100 * rs.filter(r => r.extra.offerWeek !== null && r.extra.offerWeek <= 200).length / rs.length, per: [] }; } });
  add({ id: 'late-name-y1', text: 'Late: Name after a year', lo: 0, hi: 12, why: ['TAU', 'NAME_K', 'NAME_CLEAN'], measure: c => dist(perRun(c, 'late', r => (c.rowAt(r, 51) || {}).name)) });
  add({ id: 'late-regulars-y1', text: 'Late: regulars after a year', lo: 0, hi: 25, why: ['REG_RATE', 'REG_LOSS', 'TAU'], measure: c => dist(perRun(c, 'late', r => (c.rowAt(r, 51) || {}).regulars)) });
  add({ id: 'random-dead-ends', text: 'Random: runs reaching a state with no legal move', lo: 0, hi: 0, why: ['(a rule problem, not a constant)'],
        measure: c => { const rs = c.all.filter(r => r && r.bot === 'random'); return rs.length ? { value: rs.filter(r => r.deadEnds > 0).length, per: [] } : null; } });
  add({ id: 'random-throws', text: 'Random: runs that throw', lo: 0, hi: 0, why: ['(a bug, not a constant)'],
        measure: c => { const rs = c.all.filter(r => r && r.bot === 'random'); return rs.length ? { value: rs.filter(r => !r.ok).length, per: [] } : null; } });
  add({ id: 'gambler-late-rent', text: 'Gambler, bills on: runs reaching late rent in year 1 (percent)', lo: 40, hi: 60, why: ['MONEY.LADDER', 'OVERDRAFT', 'FLYER.PRINT', 'CHANNELS.PAID_PUSH', 'PAY', 'CANCEL'],
        measure: c => { const rs = c.by('gambler', r => r.bills); if (!rs.length) return null; return { value: 100 * rs.filter(r => r.extra.lateRent1).length / rs.length, per: [] }; } });
  add({ id: 'checklist-monthends', text: 'Checklist, full time: month-ends below -$300 (percent)', lo: 0, hi: 5, why: ['HOURS', 'SHIFT_PAY (pack money.shiftPay)', 'MONEY', 'PAY.SOUND', 'PAY.DOOR'],
        measure: c => { const xs = [].concat.apply([], c.by('checklist', r => r.bills).map(r => r.extra.bankMonthEnds)); return xs.length ? { value: 100 * xs.filter(b => b < -300).length / xs.length, per: [] } : null; } });
  add({ id: 'luck-variance', text: 'Share of the variance in heads explained by luck (percent)', lo: 0, hi: 15, why: ['LUCK', 'LUCK_SPREAD'],
        measure: c => { const pairs = [].concat.apply([], c.by('checklist').map(r => r.extra.luck)); if (pairs.length < 20) return null;
                        const h = pairs.map(p => p[0]), d = pairs.map(p => p[0] - p[1]); const mean = a => a.reduce((s, x) => s + x, 0) / a.length, vr = a => { const m = mean(a); return a.reduce((s, x) => s + (x - m) * (x - m), 0) / a.length; };
                        return { value: 100 * vr(d) / Math.max(1e-9, vr(h)), per: [], note: pairs.length + ' shows rerun with luck off' }; } });
  add({ id: 'learner-inside-call', text: 'Learner: outcomes inside the Call (percent)', lo: 75, hi: 85, why: ['CALL_K', 'LEARN', 'PRIOR'],
        measure: c => dist(perRun(c, 'learner', r => { const s = r.shows.filter(x => x.inside !== null && x.inside !== undefined); return s.length >= 5 ? 100 * s.filter(x => x.inside).length / s.length : null; })) });
  add({ id: 'learner-call-width', text: 'Learner: average Call half-width as a share of its centre, year 1 (percent; about 45)', lo: 35, hi: 55, why: ['PRIOR', 'CALL_K', 'LEARN'],
        measure: c => dist(perRun(c, 'learner', r => { const s = c.showsIn(r, 0, 52).filter(x => x.callMid > 0); return s.length >= 3 ? 100 * H.mean(s.map(x => (x.callHi - x.callLo) / 2 / x.callMid)) : null; })) });
  add({ id: 'learner-call-width-y3', text: 'Learner: average Call half-width as a share of its centre, year 3 (percent; about 15)', lo: 9, hi: 21, why: ['LEARN', 'CLARITY_MIN', 'STALE'],
        measure: c => dist(perRun(c, 'learner', r => { const s = c.showsIn(r, 104, 156).filter(x => x.callMid > 0); return s.length >= 3 ? 100 * H.mean(s.map(x => (x.callHi - x.callLo) / 2 / x.callMid)) : null; })) });
  const verdictRanges = { ROUGH: [3, 6], THIN: [12, 18], HELD: [30, 38], GOOD: [30, 38], TALKED: [8, 12], WALL: [1, 3] };
  Object.keys(verdictRanges).forEach(v => add({ id: 'checklist-verdict-' + v.toLowerCase(), text: 'Verdicts, Checklist: ' + v.toLowerCase() + ' (percent of shows)', lo: verdictRanges[v][0], hi: verdictRanges[v][1], why: ['VERDICT', 'Q_WEIGHTS', 'FEEL', 'ENERGY'],
    measure: c => { const s = [].concat.apply([], c.by('checklist').map(r => r.shows)); return s.length >= 20 ? { value: 100 * s.filter(x => x.verdict === v).length / s.length, per: [], note: s.length + ' shows' } : null; } }));
  add({ id: 'learner-wall', text: 'Verdicts, Learner: wall (percent of shows)', lo: 4, hi: 7, why: ['VERDICT.WALL', 'Q_WEIGHTS'],
        measure: c => { const s = [].concat.apply([], c.by('learner').map(r => r.shows)); return s.length >= 20 ? { value: 100 * s.filter(x => x.verdict === 'WALL').length / s.length, per: [] } : null; } });
  add({ id: 'four-vs-one', text: 'Four same-crowd bands against one: heads multiple', lo: 0, hi: 2.5, why: ['SCENE_RATE', 'PULL_CAP', 'pack.scene.stack'],
        measure: () => experiments.stack4 === undefined ? null : { value: experiments.stack4, per: [] } });
  add({ id: 'door-best', text: 'Door price that takes the most money for the golden show ($)', lo: 9, hi: 13, why: ['PRICE', 'DOOR.prices', 'pack.money.comfort'],
        measure: () => experiments.bestPrice === undefined ? null : { value: experiments.bestPrice, per: [] } });
  add({ id: 'door-15-vs-10', text: 'Golden show: heads lost at $15 against $10 (percent)', lo: 25, hi: 100, why: ['PRICE.SLOPE', 'PRICE.STEEP_SLOPE', 'PRICE.FLAT_TO'],
        measure: () => experiments.lost15 === undefined ? null : { value: experiments.lost15, per: [] } });
  add({ id: 'specialist-vs-allround', text: 'Specialist against all-round Learner: Name at year 3, difference (percent)', lo: 0, hi: 15, why: ['REG_FLOOR', 'CHANNELS.ANNOUNCE_SPECIALIST', 'NAME_K'],
        measure: c => { const a = perRun(c, 'learner-specialist', r => (c.rowAt(r, 155) || {}).name), b = perRun(c, 'learner-allround', r => (c.rowAt(r, 155) || {}).name); if (!a.length || !b.length) return null; const x = H.median(a), y = H.median(b); return { value: 100 * Math.abs(x - y) / Math.max(1e-9, Math.max(x, y)), per: [], note: x + ' against ' + y }; } });
  add({ id: 'checklist-stretched', text: 'Checklist: weeks stretched (percent)', lo: 25, hi: 45, why: ['STRESS.UP', 'STRESS.DOWN', 'STRESS_ZONES', 'HOURS'],
        measure: c => { const rows = [].concat.apply([], c.by('checklist', r => r.bills).map(r => r.rows)); return rows.length ? { value: 100 * rows.filter(r => r.stress >= STRESS_CUTS[0] && r.stress < STRESS_CUTS[1]).length / rows.length, per: [] } : null; } });
  add({ id: 'checklist-fried', text: 'Checklist: weeks fried (percent)', lo: 0, hi: 5, why: ['STRESS.UP', 'STRESS.DOWN', 'STRESS_ZONES'],
        measure: c => { const rows = [].concat.apply([], c.by('checklist', r => r.bills).map(r => r.rows)); return rows.length ? { value: 100 * rows.filter(r => r.stress >= STRESS_CUTS[1]).length / rows.length, per: [] } : null; } });
  add({ id: 'harm-matters', text: 'Matters under harm in six years (median per run)', lo: 3, hi: 6, why: ['HARM', 'DIRECTOR'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 300 ? r.extra.harm : null)) });
  add({ id: 'decisions-stage1', text: 'Player decisions per week, median at stage 1 (Learner)', lo: 6, hi: 12, why: ['JOBS', 'MAIL', 'USUAL'],
        measure: c => { const x = [].concat.apply([], c.by('learner').map(r => r.rows.filter(w => w.stage === 1).map(w => w.decisions))); return x.length ? { value: H.median(x), per: [] } : null; } });
  add({ id: 'decisions-stage3', text: 'Player decisions per week, median at stage 3 (Learner)', lo: 15, hi: 30, why: ['JOBS', 'MAIL', 'STAGE_HELPER_JOBS'],
        measure: c => { const x = [].concat.apply([], c.by('learner').map(r => r.rows.filter(w => w.stage === 3).map(w => w.decisions))); return x.length ? { value: H.median(x), per: [] } : null; } });
  add({ id: 'tokens-hall', text: 'Tokens placed for one hall show by the Checklist bot', lo: 14, hi: 17, why: ['JOBS (the set of HOURS jobs)', 'USUAL'],
        measure: c => { const x = [].concat.apply([], c.by('checklist').map(r => r.shows.filter(s => s.roomKind === 'HALL' && s.tokens).map(s => s.tokens))); return x.length ? { value: H.median(x), per: x } : null; } });
  add({ id: 'tokens-zero', text: 'Tokens of zero hours', lo: 0, hi: 0, why: ['JOBS.*.hours'],
        measure: c => { const x = [].concat.apply([], c.by('checklist').map(r => r.shows.map(s => s.zeroTokens || 0))); return x.length ? { value: x.reduce((s, y) => s + y, 0), per: [] } : null; } });
  add({ id: 'hours-hall-first', text: 'Player-hours for one hall show, the first in a room (planned hours plus the show night)', lo: 23, hi: 28, why: ['JOBS.*.hours', 'SHOW_NIGHT_HOURS', 'FAMILIAR'],
        measure: c => { const x = [].concat.apply([], c.by('checklist').map(r => r.shows.filter(s => s.roomKind === 'HALL' && s.hours !== undefined && s.roomShowsBefore === 0).map(s => s.hours + 5))); return x.length ? { value: H.median(x), per: x } : null; } });
  add({ id: 'night-decisions', text: 'Decisions on a show night, Checklist, mean', lo: 1.5, hi: 2.5, why: ['DIRECTOR.nightStops', 'INCIDENTS'],
        measure: c => { const x = [].concat.apply([], c.by('checklist').map(r => r.shows.map(s => s.choices || 0))); return x.length ? { value: H.mean(x), per: [] } : null; } });
  add({ id: 'night-doors', text: 'Nights where doors stops (percent)', lo: 25, hi: 45, why: ['DIRECTOR.nightStops.doorsUnder', 'CLOCK'],
        measure: c => { const x = [].concat.apply([], c.by('checklist').map(r => r.shows)); return x.length ? { value: 100 * x.filter(s => s.doorsStop).length / x.length, per: [] } : null; } });
  add({ id: 'night-count', text: 'Nights where the count stops, after the tenth show (percent)', lo: 0, hi: 30, why: ['DIRECTOR.nightStops', 'HANDSHAKE_DISPUTE'],
        measure: c => { const x = [].concat.apply([], c.by('checklist').map(r => r.shows.slice(10))); return x.length ? { value: 100 * x.filter(s => s.countStop).length / x.length, per: [] } : null; } });
  add({ id: 'paid-push', text: 'A HIGH paid push on a hall show of about 100 heads: more heads', lo: 6, hi: 12, why: ['CHANNELS.PAID_PUSH'], measure: () => experiments.push === undefined ? null : { value: experiments.push, per: [] } });
  add({ id: 'big-print', text: 'A BIG print run with a paid town runner for two feeder routes: more heads', lo: 3, hi: 8, why: ['FLYER.PRINT', 'CHANNELS.OUT_OF_TOWN_REACH', 'PAY.HELPER_RUN_TOWN'], measure: () => experiments.bigPrint === undefined ? null : { value: experiments.bigPrint, per: [] } });
  add({ id: 'address-heads', text: 'A house show with the address in print against "ask a punk": heads, percent more', lo: 8, hi: 15, why: ['CHANNELS.ADDRESS.askCeil', 'CHANNELS.ADDRESS.askInviteCap'], measure: () => experiments.address === undefined ? null : { value: experiments.address, per: [] } });
  add({ id: 'early-requests', text: 'Stage 1, weeks 4 to 20: runs with at least 3 touring requests received (percent, every bot)', lo: 90, hi: 100, why: ['REQUESTS.STAGE1', 'REQUESTS.SHARE_FLOOR', 'REQUESTS.STOP', 'pack.scene.traffic'],
        measure: c => { const rs = c.ok.filter(r => r.extra.reqEarly !== null && r.weeks >= 20); return rs.length ? { value: 100 * rs.filter(r => r.extra.reqEarly >= 3).length / rs.length, per: [] } : null; } });
  add({ id: 'weeknight-pensacola', text: 'Learner, year 1, Pensacola: share of shows on a weeknight (percent)', lo: 0, hi: 25, why: ['pack.night', 'NIGHT_DEFAULT', 'DIRECTOR'],
        measure: c => weeknightShare(c, 'pensacola') });
  add({ id: 'weeknight-large', text: 'Learner, year 1, large city: share of shows on a weeknight (percent)', lo: 45, hi: 100, why: ['pack.night', 'CITY.SCALED.weeknightLift'],
        measure: c => weeknightShare(c, 'philadelphia') });
  add({ id: 'avg-shows-y1', text: 'Average player (Learner), end of year 1: shows', lo: 13, hi: 16, why: ['REQUESTS', 'DIRECTOR', 'HOURS'], measure: c => dist(perRun(c, 'learner', r => r.shows.filter(s => s.week < 52).length)) });
  add({ id: 'avg-regulars-y1', text: 'Average player (Learner), end of year 1: regulars', lo: 40, hi: 70, why: ['REG_RATE', 'REG_LOSS', 'REG_CAP'], measure: c => dist(perRun(c, 'learner', r => (c.rowAt(r, 51) || {}).regulars)) });
  add({ id: 'avg-followers-y1', text: 'Average player (Learner), end of year 1: followers', lo: 350, hi: 500, why: ['POST.followersPerPost', 'THANKS.posts', 'FOLLOWERS_START'], measure: c => dist(perRun(c, 'learner', r => (c.rowAt(r, 51) || {}).followers)) });
  add({ id: 'avg-trusted-y1', text: 'Average player (Learner), end of year 1: bands at trust 60 or more', lo: 4, hi: 6, why: ['TRUST_EVENTS', 'TRUST_STAGES'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 52 ? r.extra.trustedBands : null)) });
  add({ id: 'y3-shows', text: 'End of year 3 (Learner): shows that year', lo: 40, hi: 55, why: ['REQUESTS', 'HOURS', 'DIRECTOR'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 156 ? r.shows.filter(s => s.week >= 104 && s.week < 156).length : null)) });
  add({ id: 'y3-name', text: 'End of year 3 (Learner): Name', lo: 52, hi: 62, why: ['NAME_K', 'BEAT', 'NAME_MAX'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 156 ? (c.rowAt(r, 155) || {}).name : null)) });
  add({ id: 'y3-word', text: 'End of year 3 (Learner): Word', lo: 46, hi: 55, why: ['TERRITORY', 'SPLIT.takeNothing', 'pack.scene.wordStart'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 156 ? (c.rowAt(r, 155) || {}).word : null)) });
  add({ id: 'y3-regulars', text: 'End of year 3 (Learner): regulars', lo: 190, hi: 260, why: ['REG_RATE', 'REG_CAP', 'REG_LOSS'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 156 ? (c.rowAt(r, 155) || {}).regulars : null)) });
  add({ id: 'y3-hours', text: 'Hours a week in year 3, Checklist, full time (of 27)', lo: 20, hi: 26, why: ['HOURS', 'SHOW_NIGHT_HOURS', 'JOBS.*.hours'],
        measure: c => { const x = [].concat.apply([], c.by('checklist', r => r.weeks >= 156).map(r => r.rows.filter(w => w.week >= 104 && w.week < 156 && w.hoursUsed !== null).map(w => w.hoursUsed))); return x.length ? { value: H.median(x), per: [] } : null; } });
  add({ id: 'y6-wall', text: 'By year 6 (Learner): shows on the wall', lo: 12, hi: 20, why: ['WALL_AT', 'MEMORY'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 312 ? r.extra.wall : null)) });
  add({ id: 'y6-tier3', text: 'By year 6 (Learner): local bands at tier 3 or more that played for the player (approximates "booked first")', lo: 2, hi: 4, why: ['TIERS', 'DRAW_GROWTH'], measure: c => dist(perRun(c, 'learner', r => r.weeks >= 312 ? r.extra.tier3 : null)) });
  add({ id: 'stage2-learner', text: 'Stage 2 reached, Learner, median week', lo: 20, hi: 30, why: ['STAGES.2'], measure: c => dist(perRun(c, 'learner', r => r.extra.stageWeek[2])) });
  add({ id: 'stage3-learner', text: 'Stage 3 reached, Learner, median week', lo: 80, hi: 110, why: ['STAGES.3'], measure: c => dist(perRun(c, 'learner', r => r.extra.stageWeek[3])) });
  add({ id: 'stage2-checklist', text: 'Stage 2 reached, Checklist, median week', lo: 38, hi: 52, why: ['STAGES.2', 'NAME_CLEAN'], measure: c => dist(perRun(c, 'checklist', r => r.extra.stageWeek[2])) });
  add({ id: 'week-ms', text: 'A week of real time: a Learner week with text on, milliseconds', lo: 0, hi: 150, why: ['(performance)'],
        measure: c => { const rs = c.by('learner', r => r.text); return rs.length ? { value: H.median(rs.map(r => r.ms / Math.max(1, r.weeks))), per: [] } : null; } });

  // targets this harness cannot measure yet, and why. They are listed, never reported as met.
  [['kids-vs-oldheads', 'Learner booking only kids\' bills against only old-head bills: Name at the end of year 2, within 20 percent', 'needs a Learner restricted to one generation of bands'],
   ['hot-genre', 'Hot-genre shows: heads / Par at heat +.2 to +.5 (1.10 or more); at the peak with a glut (.90 or less)', 'needs a per-show record of the genre\'s heat and glut, which no public view gives'],
   ['twenty-one', 'A town where over 70 percent of shows are 21 and over: kids after 4 years down 25 to 35 percent', 'needs a bot that books only 21-and-over rooms'],
   ['specialist-regulars', 'Specialist: regulars per show in genre 1.3 times; all-rounder: requests received 1.4 times the other\'s', 'needs regulars by genre and requests by sender genre per week'],
   ['flyer-run-stale', 'One flyer run on an old-head route at 35 days against 24 days (within 10 percent); an early run plus a second run against one run at 24 days (40 to 60 percent more)', 'Model.reach does not return reach by single route'],
   ['requests-at-name', 'Requests a week at Name 5 / 30 / 60 (Word 22 / 35 / 50)', 'needs requests counted per week against the Name of that week; the per-week counts are in balance.json (extra.reqByWeek)']
  ].forEach(x => add({ id: x[0], text: x[1], skip: x[2], why: [], measure: () => null }));
  return T;
}

function weeknightShare(c, city) {
  const rs = c.ok.filter(r => r.bot === 'learner' && r.city === city);
  const s = [].concat.apply([], rs.map(r => r.shows.filter(x => x.week < 52)));
  return s.length >= 10 ? { value: 100 * s.filter(x => WEEKNIGHT[x.dow]).length / s.length, per: [], note: s.length + ' shows' } : null;
}

/* ---------------- experiments on the golden show ---------------- */

function experiments() {
  const out = {};
  try {
    if (H.stubbed(['Model', 'Forecast']).length) { out.note = 'Model and Forecast are still stubs'; return out; }
    const golden = require('./fixtures/golden.js');
    const SB = H.fresh({ packs: ['pensacola'] });
    const f0 = golden.build(SB, { notebook: true });
    const headsOf = (f, over) => { const lens = SB.Forecast.lens(f.state, 'TRUTH', Object.assign({ stale: false }, over || {})); lens.luck = false; return SB.Model.resolve(f.state, f.show, lens, f.show.mods); };
    const retime = (f, d) => { const p = f.show.promo, D = f.day; p.flyer.day = D - d; p.announce = D - d; p.mail = d >= 6 ? D - d + 2 : null; p.printed = D - d + 3; Object.keys(p.runs).forEach(k => { p.runs[k].day = Math.min(D, D - d + 5); }); p.listings = d - 5 >= 12 ? D - d + 5 : null; p.push = Math.min(D, D - Math.min(d, 4)); Object.keys(p.shares).forEach(b => { p.shares[b] = Math.min(D, D - d + 2); }); p.handouts = []; p.invites = []; return f; };
    const a = headsOf(retime(golden.build(SB, { notebook: true }), 7)).night.heads, b = headsOf(retime(golden.build(SB, { notebook: true }), 28)).night.heads;
    out.t7t28 = a / Math.max(1e-9, b);
    // the door: money taken for each price in the bill builder
    let best = null; const heads = {};
    SB.Config.DOOR.prices.filter(p => p > 0).forEach(p => { const f = golden.build(SB, { notebook: true }); f.show.door.price = p; const n = headsOf(f).night; heads[p] = n.heads; if (!best || n.gross > best.gross) best = { p: p, gross: n.gross }; });
    out.bestPrice = best ? best.p : undefined;
    if (heads[15] !== undefined && heads[10] !== undefined) out.lost15 = 100 * (1 - heads[15] / Math.max(1e-9, heads[10]));
    // four crowds of one taste against one (same method as model.test)
    function bandHeads(k) {
      const f = golden.build(SB, { notebook: false }), st = f.state, s = f.show, ids = [];
      for (let i = 0; i < k; i++) { const id = 'bx' + i; st.bands[id] = JSON.parse(JSON.stringify(st.bands.b13)); st.bands[id].id = id; st.bands[id].hid.draw.city = 30; st.bands[id].hid.cross = 0; ids.push(id); }
      s.bill.slots = ids.map(id => ({ bandId: id, role: 'LOCAL', minutes: 25, pay: 'FREE', fee: 0, askId: null, confirmed: true }));
      s.bill.billing = ids.slice(); s.bill.times = ids.map((x, i) => 1285 + 35 * i); s.bill.ends = 1285 + 35 * k; s.promo.shares = {}; s.promo.handouts = []; s.promo.invites = []; s.promo.mail = null;
      const lens = SB.Forecast.lens(st, 'TRUTH', { stale: false, invites: false }); lens.luck = false;
      return SB.Model.resolve(st, s, lens, {}).night.heads;
    }
    out.stack4 = bandHeads(4) / Math.max(1e-9, bandHeads(1));
    // a HIGH paid push on the announcement of a hall show of about 100 heads
    const base = headsOf(golden.build(SB, { notebook: true })).night.heads;
    const fp = golden.build(SB, { notebook: true }); fp.show.promo.paid = { level: 'HIGH', day: fp.day - 30 };
    out.push = headsOf(fp).night.heads - base;
    // a BIG print run with a paid runner for two feeder-town routes
    const fb = golden.build(SB, { notebook: true }); fb.show.promo.print = 'BIG'; fb.show.promo.runs['town:milton'] = { day: fb.day - 22, again: null, by: 'p1', effect: 1 }; fb.show.promo.runs['town:gulf-breeze'] = { day: fb.day - 22, again: null, by: 'p1', effect: 1 };
    out.bigPrint = headsOf(fb).night.heads - base;
    // the address in print against "ask a punk" at a house
    function house(addr) { const f = golden.build(SB, { notebook: true }); f.state.rooms.r21.kind = 'HOUSE'; f.state.rooms.r21.cap = 60; f.state.rooms.r21.outdoor = false; f.show.door.address = addr; return headsOf(f).night.heads; }
    out.address = 100 * (house('FULL') / Math.max(1e-9, house('ASK')) - 1);
    out.note = 'on the golden show of mechanics 1.13 (luck off)';
  } catch (e) { out.error = e.message; }
  return out;
}

/* ---------------- the report ---------------- */

function fmt(x) { return x === null || x === undefined ? '-' : (typeof x === 'number' ? String(Math.round(x * 100) / 100) : String(x)); }

function report(results, opts, exp) {
  const ctx = makeCtx(results);
  const rows = targets(exp).map(t => {
    if (t.skip) return { id: t.id, text: t.text, target: 'see 06-harness 5.2', status: 'NOT MEASURED', reason: t.skip };
    let m = null, err = null;
    try { m = t.measure(ctx); } catch (e) { err = e.message; }
    const target = t.lo !== undefined ? fmt(t.lo) + ' to ' + fmt(t.hi) : '';
    if (!m) return { id: t.id, text: t.text, target: target, status: 'NO DATA', reason: err || 'the runs that would measure it are absent or empty (a stub engine plays no shows)' };
    const hit = within(m.value, t.lo, t.hi);
    return { id: t.id, text: t.text, target: target, value: m.value, p10: m.stats ? m.stats.p10 : null, p90: m.stats ? m.stats.p90 : null, n: m.stats ? m.stats.n : null, note: m.note || '',
             status: hit ? 'ok' : 'MISS', why: hit ? [] : t.why };
  });
  const failed = results.filter(r => !r || !r.ok);
  const json = { when: 'run at ' + opts.stamp, totalShows: results.reduce((n, r) => n + (r && r.shows ? r.shows.length : 0), 0), options: opts, games: results.length, failedGames: failed.map(r => r ? { bot: r.bot, seed: r.seed, city: r.city, bills: r.bills, week: r.error && r.error.week, message: r.error && r.error.message } : { lost: true }), experiments: exp, targets: rows };
  const md = [];
  md.push('# Balance report');
  md.push('');
  md.push('Games: ' + results.length + ' (' + (results.length - failed.length) + ' completed, ' + failed.length + ' threw). Bots: ' + opts.bots.join(', ') + '. Cities: ' + opts.cities.join(', ') + '. Bills: ' + opts.billsList.join(', ') + '. Seeds: ' + opts.seeds + ' x ' + opts.years + ' years. Text off' + (opts.stubs ? '; against the stub engine' : '') + '.');
  md.push('');
  const totalShows = results.reduce((n, r) => n + (r && r.shows ? r.shows.length : 0), 0);
  if (!totalShows) { md.push('> **No show was played in any game** (' + (opts.stubs ? 'the engine is the stub' : 'see the games that threw below') + '). Every figure that is not "NO DATA" describes a game in which nothing happened, and says nothing about balance.'); md.push(''); }
  const miss = rows.filter(r => r.status === 'MISS'), nodata = rows.filter(r => r.status === 'NO DATA'), nm = rows.filter(r => r.status === 'NOT MEASURED');
  md.push('**' + rows.filter(r => r.status === 'ok').length + ' met, ' + miss.length + ' missed, ' + nodata.length + ' without data, ' + nm.length + ' not measured by this harness.**');
  md.push('');
  if (exp && (exp.error || exp.note)) md.push('Experiments: ' + (exp.error ? 'failed: ' + exp.error : exp.note) + '\n');
  md.push('| Measure | Target | Median | 10th to 90th | Status | Constants that most plausibly move it |');
  md.push('|---|---|---|---|---|---|');
  rows.forEach(r => md.push('| ' + r.text + ' | ' + r.target + ' | ' + fmt(r.value) + (r.n ? ' (n ' + r.n + ')' : '') + ' | ' + (r.p10 !== null && r.p10 !== undefined ? fmt(r.p10) + ' to ' + fmt(r.p90) : '-') + ' | ' + r.status + (r.reason ? ' (' + r.reason + ')' : '') + ' | ' + (r.why && r.why.length ? r.why.join(', ') : '') + ' |'));
  if (failed.length) {
    md.push(''); md.push('## Games that threw'); md.push('');
    failed.slice(0, 40).forEach(r => md.push('- ' + (r ? r.bot + ' seed ' + r.seed + ' (' + r.city + ', bills ' + (r.bills ? 'on' : 'off') + ') week ' + (r.error && r.error.week) + ': ' + (r.error && r.error.message) : 'a game was lost with its worker')));
  }
  md.push('');
  md.push('A target that cannot be met by constants alone is a rule problem, to be reported with its smallest reproducing seed: `node test/run.js play --seed <seed> --bot <bot> --weeks <n> --dump`.');
  return { json: json, md: md.join('\n') + '\n', miss: miss.length, failed: failed.length, rows: rows };
}

/* ---------------- main ---------------- */

function parse(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (a.slice(0, 2) === '--') { const k = a.slice(2), nx = argv[i + 1]; if (nx === undefined || nx.slice(0, 2) === '--') o[k] = true; else { o[k] = nx; i++; } } }
  return o;
}

function main(argv) {
  const a = parse(argv || []);
  const quick = !!a.quick;
  const opts = {
    seeds: a.seeds ? Number(a.seeds) : (quick ? 6 : 200), years: a.years ? Number(a.years) : (quick ? 3 : 6),
    cities: a.cities ? String(a.cities).split(',') : (quick ? ['pensacola'] : ['pensacola', 'philadelphia']),
    billsList: a.bills === 'on' ? ['on'] : (a.bills === 'off' ? ['off'] : (quick ? ['on'] : ['on', 'off'])),
    bots: a.bots ? String(a.bots).split(',') : (quick ? ALL_BOTS.slice(0, 5) : ALL_BOTS), stubs: !!a.stubs, stamp: 'seeds ' + (a.seeds || '') + ' years ' + (a.years || '')
  };
  opts.stamp = 'the matrix of this run';
  const outDir = a.out ? path.resolve(String(a.out)) : REPORT_DIR;
  const jobs = [];
  opts.cities.forEach(city => opts.billsList.forEach(b => opts.bots.forEach(bot => {
    for (let i = 0; i < opts.seeds; i++) {
      jobs.push({ bot: bot, seed: city + '-' + bot + '-' + b + '-' + i, city: city, bills: b === 'on', weeks: Math.round(opts.years * 52), stubs: opts.stubs, text: false, measureLuck: bot === 'checklist' && i < Math.min(opts.seeds, 40) });
    }
  })));
  // one Learner run per city and bills setting with text on, for the "a week of real time" target (a few weeks are enough)
  opts.cities.forEach(city => jobs.push({ bot: 'learner', seed: city + '-timing', city: city, bills: true, weeks: Math.min(52, Math.round(opts.years * 52)), stubs: opts.stubs, text: true, measureLuck: false }));
  const nJobs = a.jobs ? Number(a.jobs) : Math.max(1, os.cpus().length - 1);
  console.log('balance: ' + jobs.length + ' games, ' + (nJobs > 1 ? nJobs + ' workers' : 'inline') + '.');
  const t0 = Date.now();
  return runAll(jobs, nJobs, nJobs <= 1).then(results => {
    results = results.map((r, i) => r || { bot: jobs[i].bot, seed: jobs[i].seed, city: jobs[i].city, bills: jobs[i].bills, ok: false, error: { message: 'the worker died', week: -1 }, rows: [], shows: [], extra: {}, deadEnds: 0, ms: 0, weeks: 0 });
    results.forEach((r, i) => { r.text = jobs[i].text; });
    const exp = experiments();
    const rep = report(results, opts, exp);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'balance.md'), rep.md);
    // balance.json keeps every measure and a trimmed copy of each game (weekly rows only), so a tuning pass can be diffed
    const slim = results.map(r => ({ bot: r.bot, seed: r.seed, city: r.city, bills: r.bills, ok: r.ok, weeks: r.weeks, ms: r.ms, deadEnds: r.deadEnds, shows: (r.shows || []).length, finalName: r.rows && r.rows.length ? r.rows[r.rows.length - 1].name : null, extra: r.extra && { stageWeek: r.extra.stageWeek, offerWeek: r.extra.offerWeek, reqEarly: r.extra.reqEarly, reqByWeek: r.extra.reqByWeek } }));
    fs.writeFileSync(path.join(outDir, 'balance.json'), JSON.stringify(Object.assign({}, rep.json, { games: slim }), null, 1));
    console.log(rep.md.split('\n').slice(0, 4).join('\n'));
    console.log('wrote ' + path.join(outDir, 'balance.md') + ' and balance.json in ' + Math.round((Date.now() - t0) / 1000) + ' s');
    if (rep.failed) { console.log(rep.failed + ' game(s) threw; see the report.'); return 1; }
    if (a.strict && rep.miss) { console.log(rep.miss + ' target(s) missed (--strict).'); return 1; }
    return 0;
  });
}

if (process.argv[2] === '--worker') {
  process.on('message', m => {
    if (m.stop) { process.exit(0); return; }
    let result;
    try { result = playOne(m.job); } catch (e) { result = { bot: m.job.bot, seed: m.job.seed, city: m.job.city, bills: m.job.bills, ok: false, error: { message: String(e && e.message || e), week: -1 }, rows: [], shows: [], extra: {}, deadEnds: 0, ms: 0, weeks: 0 }; }
    process.send({ i: m.i, result: result });
  });
}

module.exports = { main: main, playOne: playOne, targets: targets, report: report, experiments: experiments, ALL_BOTS: ALL_BOTS };
