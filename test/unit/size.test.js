'use strict';
// size.test — 06-harness section 3, `size.test`: a 6-year Learner save is under 2,200,000 characters (01-state section 3; raised from 2,000,000 on 2026-11-20), and a
// 6-year run takes under 30 seconds with text off. Needs a full engine; with files still stubbed it skips with a note.
const H = require('../helpers.js');

module.exports = function (t) {
  if (!H.needs(t, ['Night', 'Save', 'Notebook', 'Forecast', 'Feedback', 'Legacy'], 'a six-year save')) return;
  const run = require('../bots/run.js');
  const r = run.runGame({ seed: 'size-1', bot: 'learner', weeks: 312, city: 'pensacola', text: false });
  t.ok(r.ok, 'a six-year Learner run completes' + (r.error ? ': ' + r.error.message : ''));
  if (!r.ok) return;
  t.ok(r.ms < 30000, 'the run takes under 30 seconds with text off (' + r.ms + ' ms)');
  const SB = globalThis.SB;
  const text = SB.Save.exportText(r.state);
  t.ok(text.length < 2200000, 'the save is under 2,200,000 characters (' + text.length + ')');
  // what is trimmed: the lifetimes of 01-state section 3 (the export is the save text, trimmed or not)
  const old = Object.keys(r.state.shows).filter(id => r.state.shows[id].status === 'PLAYED' && r.state.shows[id].day < (r.state.clock.week - 104) * 7);
  t.eq(old, [], 'no played show older than 104 weeks is kept in state.shows');
  t.ok(r.state.week.log.length < 3000, 'the week log holds the current week only (' + r.state.week.log.length + ' records)');
  t.ok(Object.keys(r.state.legacy.records).length >= r.state.player.showsPlayed * .9, 'the show records are kept forever (' + Object.keys(r.state.legacy.records).length + ' of ' + r.state.player.showsPlayed + ')');
  t.eq(H.jsonIssues(r.state, 3), [], 'the six-year state is JSON-safe');
};
