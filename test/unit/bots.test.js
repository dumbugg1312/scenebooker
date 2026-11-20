'use strict';
// bots.test — the bots and their runner (06-harness section 4), independent of how much of the engine exists:
//   * every bot loads and has the interface { name, setup, planWeek, onStop, onNight, onClose };
//   * the runner plays every bot for a few weeks against the stub engine without the harness itself throwing;
//   * the same seed and bot give the same rows twice (the bots are deterministic);
//   * runGame reports a failure as data, never as a throw; a bot that breaks a rule is caught (BotError);
//   * the bot library's table of allowed functions is a subset of the manifest, and names no function that 02-engine marks internal.
const H = require('../helpers.js');

module.exports = function (t) {
  const run = require('../bots/run.js');
  const L = require('../bots/lib.js');
  run.BOT_NAMES.forEach(n => {
    const b = run.getBot(n);
    t.eq(typeof b.name, 'string', n + ' has a name');
    ['setup', 'planWeek', 'onStop', 'onNight', 'onClose'].forEach(f => t.eq(typeof b[f], 'function', n + '.' + f + ' is a function'));
  });
  t.eq(run.BOT_NAMES.sort(), ['checklist', 'gambler', 'late', 'learner', 'learner-allround', 'learner-specialist', 'random'], 'the five bots and the two Learner variants');

  const SB = H.fresh({ packs: [] });
  Object.keys(L.ALLOWED).forEach(m => L.ALLOWED[m].forEach(f => t.ok(SB.API.engine[m] && SB.API.engine[m].indexOf(f) >= 0, 'allowed ' + m + '.' + f + ' is in the manifest')));
  // the functions 02-engine marks internal must not be callable by a bot
  const INTERNAL = { Game: ['adjustName', 'adjustFollowers'], Week: ['log', 'raise'], Shows: ['setDeal', 'addBand', 'lock', 'onConfirmed'], Jobs: ['ensure', 'refreshAll', 'resolve'],
                     Mail: ['post', 'flush', 'deliver'], Money: ['spend', 'earn', 'weekly'], Stress: ['add', 'slip', 'weekly'], Model: ['resolve', 'night', 'demand', 'reach'],
                     Forecast: ['lens', 'usual', 'ablate', 'jobLoss'], Night: ['finish', 'resolveOther'], Feedback: ['build', 'causes', 'debrief'],
                     Notebook: ['init', 'est', 'narrow', 'reopen', 'learnFromShow', 'scout', 'mark', 'addNote', 'seeTerm', 'weekly'], WorldGen: ['build', 'band', 'person', 'room', 'touringBand'],
                     Bands: ['tier', 'publicDraw', 'fresh', 'isFree', 'answerAsk', 'addTrust', 'removeMember', 'afterShow', 'weekly'], Rooms: ['confirm', 'answerAsk', 'adjustRel', 'afterShow', 'daily', 'weekly'],
                     Requests: ['vet', 'answerAsk', 'pass', 'accept', 'daily', 'weekly'], Harm: ['answerAsk', 'onBooked', 'weekly'], Legacy: ['stage', 'mark', 'afterShow', 'yearly', 'weekly'],
                     Effects: ['test', 'why', 'apply'], Director: ['opening', 'planWeek', 'due', 'resolve', 'nightStops'], People: ['adjust', 'favor', 'meet', 'answerAsk', 'perform', 'afterShow', 'weekly'] };
  Object.keys(INTERNAL).forEach(m => INTERNAL[m].forEach(f => t.ok(!L.ALLOWED[m] || L.ALLOWED[m].indexOf(f) < 0, m + '.' + f + ' is internal and is not allowed to a bot')));

  // against the stubs: every bot, a few weeks, no harness throw, deterministic
  run.BOT_NAMES.forEach(n => {
    const a = run.runGame({ seed: 'bots-' + n, bot: n, weeks: 6, stubsOnly: true, guard: true });
    t.ok(a.ok, n + ' plays six weeks against the stub engine' + (a.error ? ': ' + a.error.message : ''));
    const b = run.runGame({ seed: 'bots-' + n, bot: n, weeks: 6, stubsOnly: true });
    t.eq(JSON.stringify(a.rows), JSON.stringify(b.rows), n + ' gives the same rows twice');
    t.eq(a.rows.length, 6, n + ' reports one row a week');
  });

  // a failure is data
  const bad = run.runGame({ seed: 'bad', bot: { name: 'broken', setup: () => ({}), planWeek: () => { throw new Error('boom'); }, onStop: () => null, onNight: () => null, onClose: () => ({}) }, weeks: 3, stubsOnly: true });
  t.eq(bad.ok, false, 'a bot that throws makes the run fail');
  t.eq(bad.error.message, 'boom', 'the error is reported with its message');
  t.eq(bad.error.week, 0, 'and its week');
  t.ok(Array.isArray(bad.error.log), 'and the last log entries');
  const rule = run.runGame({ seed: 'rule', bot: { name: 'peeker', setup: () => ({}), planWeek: (s) => { return s.truth; }, onStop: () => null, onNight: () => null, onClose: () => ({}) }, weeks: 2, stubsOnly: true, guard: true });
  t.ok(!rule.ok && rule.error.bot, 'a bot that reads state.truth is caught by the guard (BotError)');
  const rule2 = run.runGame({ seed: 'rule2', bot: { name: 'cheat', setup: () => ({}), planWeek: (s, sb) => { sb.Bands.weekly(s); }, onStop: () => null, onNight: () => null, onClose: () => ({}) }, weeks: 2, stubsOnly: true, guard: true });
  t.ok(!rule2.ok && rule2.error.bot, 'a bot that calls an internal function is caught (BotError)');
  const ok2 = run.runGame({ seed: 'rule3', bot: { name: 'fine', setup: () => ({}), planWeek: (s, sb) => { sb.Week.suggest(s); sb.Week.view(s); }, onStop: () => null, onNight: () => null, onClose: () => ({}) }, weeks: 2, stubsOnly: true, guard: true });
  t.ok(ok2.ok, 'a bot that calls only views and actions passes');
};
