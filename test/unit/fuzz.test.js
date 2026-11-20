'use strict';
// fuzz.test — 06-harness section 3, `fuzz.test`: the Random bot, 50 seeds, 3 years (200 seeds, 6 years under `balance`).
// It also moves shows to earlier dates after promoting them, books bands with no followers, prices doors at $0 and books rooms in
// tiny zones (the edge rules of 02-engine 7.0). Asserts: no throw; no week with zero legal actions (a dead end); and after every
// week the state is JSON-safe (no NaN, Infinity or undefined), money is integer, every 0-to-100 number is in range (Name included),
// populations and heads by cell are not negative, every hold on a calendar belongs to a live show or booker, every ask is pending
// or answered, no job is DONE before its needs.
// With engine files still stubbed the seed count and length shrink so the harness itself is exercised in a second or two.
const H = require('../helpers.js');

function invariants(state, SB, where) {
  const bad = [], E = SB.Enums, C = SB.Config;
  const push = m => { if (bad.length < 6) bad.push(where + ' ' + m); };
  H.jsonIssues(state, 4).forEach(i => push('JSON: ' + i));
  const money = state.money || {};
  if (money.fund !== undefined && !Number.isInteger(money.fund)) push('fund is not an integer: ' + money.fund);
  if (money.bank !== null && money.bank !== undefined && !Number.isInteger(money.bank)) push('bank is not an integer: ' + money.bank);
  (money.ledger || []).slice(-30).forEach(l => { if (!Number.isInteger(l.amount)) push('ledger amount is not an integer: ' + l.amount); });
  const p = state.player || {};
  [['name', p.name], ['stress', p.stress], ['town.word', state.town && state.town.word], ['town.wordBase', state.town && state.town.wordBase]].forEach(x => {
    if (x[1] !== undefined && x[1] !== null && (typeof x[1] !== 'number' || x[1] < 0 || x[1] > 100)) push(x[0] + ' is out of 0..100: ' + x[1]);
  });
  if (typeof p.name === 'number' && p.name < C.NAME_FLOOR.abs - 1e-9) push('Name is under its floor: ' + p.name);
  if (typeof p.followers === 'number' && (p.followers < 0 || p.followers !== Math.round(p.followers))) push('followers is not a whole non-negative number: ' + p.followers);
  Object.keys(state.rooms || {}).forEach(id => {
    const r = state.rooms[id];
    ['sketch', 'ownerRel'].forEach(k => { if (typeof r[k] === 'number' && (r[k] < 0 || r[k] > 100)) push('room ' + id + '.' + k + ' out of range: ' + r[k]); });
    (r.standing || []).forEach(v => { if (v < 0 || v > 100) push('room ' + id + ' standing out of range: ' + v); });
    Object.keys(r.calendar || {}).forEach(day => {
      ((r.calendar[day] || {}).holds || []).forEach(h => {
        if (h.by === 'player') { const sh = h.showId && state.shows[h.showId]; if (!sh || (sh.status !== 'DRAFT' && sh.status !== 'CONFIRMED' && sh.status !== 'PLAYED')) push('room ' + id + ' day ' + day + ': a player hold with no live show (' + h.showId + ')'); }
        else if (!state.bookers[h.by]) push('room ' + id + ' day ' + day + ': a hold by an unknown booker ' + h.by);
      });
    });
  });
  Object.keys(state.people || {}).forEach(id => { const r = state.people[id].rel; if (r !== null && r !== undefined && (r < 0 || r > 100)) push('person ' + id + ' rel out of range: ' + r); });
  Object.keys(state.bands || {}).forEach(id => {
    const b = state.bands[id];
    if (b.trust && (b.trust.base < 0 || b.trust.base > 100)) push('band ' + id + ' trust base out of range');
    if (typeof b.followers === 'number' && b.followers < 0) push('band ' + id + ' has negative followers');
  });
  Object.keys(state.zones || {}).forEach(z => (state.zones[z].pop || []).forEach((row, g) => row.forEach((v, s) => { if (!(v >= 0)) push('zone ' + z + ' pop[' + g + '][' + s + '] = ' + v); })));
  if (state.regulars) Object.keys(state.regulars.by || {}).forEach(z => state.regulars.by[z].forEach((row, g) => row.forEach((v, s) => { if (!(v >= 0)) push('regulars ' + z + '[' + g + '][' + s + '] = ' + v); })));
  Object.keys(state.shows || {}).forEach(id => {
    const r = state.shows[id].result; if (!r) return;
    if (!(r.heads >= 0) || !(r.q >= 0 && r.q <= 100)) push('show ' + id + ' result: heads ' + r.heads + ' q ' + r.q);
    (r.byGen || []).forEach(v => { if (!(v >= 0)) push('show ' + id + ' byGen has ' + v); });
    if (r.demand && r.demand.cells) r.demand.cells.forEach(v => { if (!(v >= 0)) push('show ' + id + ' has a negative cell'); });
  });
  Object.keys(state.asks || {}).forEach(id => { if (!E.ASK_STATUS[state.asks[id].status]) push('ask ' + id + ' has status ' + state.asks[id].status); });
  // no job DONE before its needs
  const byShow = {};
  Object.keys(state.jobs || {}).forEach(id => { const j = state.jobs[id]; if (j.showId) (byShow[j.showId] = byShow[j.showId] || []).push(j); });
  Object.keys(byShow).forEach(sid => {
    byShow[sid].forEach(j => {
      if (j.status !== 'DONE' || j.waived) return;
      const needs = (C.JOBS[j.type] || {}).needs || [];
      needs.forEach(n => { const inst = byShow[sid].filter(x => x.type === n); if (inst.length && !inst.every(x => x.status === 'DONE' || x.status === 'MOOT')) push('job ' + j.id + ' (' + j.type + ') is DONE before ' + n); });
    });
  });
  return bad;
}

module.exports = function (t) {
  const run = require('../bots/run.js');
  if (!H.needs(t, ['Night'], 'a Random game cannot get past its first show night without it')) return;
  const FULL = H.allEngineReal();
  const SEEDS = FULL ? 50 : 4, WEEKS = FULL ? 156 : 12;
  if (!FULL) t.note('fuzz: engine files are still stubs; running ' + SEEDS + ' seeds of ' + WEEKS + ' weeks to exercise the harness (the full run is 50 seeds of 156 weeks)');
  let throws = 0, deadEnds = 0, weeks = 0, shows = 0;
  const problems = [];
  for (let i = 0; i < SEEDS; i++) {
    const SBref = { v: null };
    const r = run.runGame({
      seed: 'fuzz-' + i, bot: 'random', weeks: WEEKS, city: 'pensacola', bills: i % 5 !== 4, guard: i % 10 === 0,
      hooks: { afterWeek: (state, SB, row) => { SBref.v = SB; if (problems.length < 8) invariants(state, SB, 'seed ' + i + ' week ' + row.week + ':').forEach(m => problems.push(m)); } }
    });
    weeks += r.weeks; shows += r.shows.length; deadEnds += r.deadEnds;
    if (!r.ok) { throws++; problems.push('seed ' + i + ' threw in week ' + r.error.week + ': ' + r.error.message + ' | ' + (r.error.stack || [])[1]); }
  }
  t.eq(throws, 0, 'the Random bot never throws (' + SEEDS + ' seeds, ' + weeks + ' weeks, ' + shows + ' shows)');
  t.eq(deadEnds, 0, 'no week with zero legal actions (no dead ends)');
  t.eq(problems.slice(0, 8), [], 'the state is sound after every week');
};
module.exports.invariants = invariants;
