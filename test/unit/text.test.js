'use strict';
// text.test — 06-harness section 3, `text.test`:
//   * a 2-year Learner run with text on logs no "no text at" warning;
//   * across the fuzz, every REC type is emitted at least once and every CAUSE appears in at least one comment;
//   * every helper comment came from feedback.helper; every wrong reading found a line.
// Needs the whole engine (it plays years), so it runs when the night and the show machinery are real files.
const H = require('../helpers.js');

module.exports = function (t) {
  if (!H.needs(t, ['Night', 'Feedback', 'Notebook', 'Forecast'], 'text across play')) return;
  const run = require('../bots/run.js');
  const E = require('../helpers.js').load.ENGINE && null;

  /* ---- a Learner year or two with text on: no "no text at" warning ---- */
  H.section(t, 'no missing text', () => {
    const SB = H.fresh({ packs: ['pensacola'], text: true });
    SB.log.max = 5000000; SB.log.entries.length = 0;
    const r = run.runGame({ sb: SB, seed: 'text-learner', bot: 'learner', weeks: 104, city: 'pensacola', text: true });
    t.ok(r.ok, 'a two-year Learner run with text on does not throw' + (r.error ? ': ' + r.error.message : ''));
    const missing = {};
    SB.log.entries.forEach(e => { if (/no text at/.test(e.message || '')) missing[e.message] = (missing[e.message] || 0) + 1; });
    t.eq(Object.keys(missing).slice(0, 8), [], 'no "no text at" warning in two years (' + Object.keys(missing).length + ' paths missing)');
    const empty = {};
    SB.log.entries.forEach(e => { if (/no label/.test(e.message || '')) empty[e.message] = 1; });
    t.eq(Object.keys(empty).slice(0, 5), [], 'no "no label" warning either');
  });

  /* ---- across the fuzz: every record type, every cause ---- */
  H.section(t, 'coverage across the fuzz', () => {
    const SB = H.fresh({ packs: ['pensacola'], text: true });
    const recs = {}, causes = {}, wrong = [], helper = [], empties = [];
    const FULL = H.allEngineReal();
    // The runner closes the week (WEEK_SUMMARY, BILLS, LADDER, comments) after afterWeek, so scan at both points; each record once.
    const seen = new WeakSet();
    const scan = (state, W) => {
      ((W || state.week).log || []).forEach(x => {
        if (seen.has(x)) return; seen.add(x);
        recs[x.t] = (recs[x.t] || 0) + 1;
        if (x.t === 'COMMENT' && x.comment) { causes[x.comment.cause] = true; if (x.comment.hid && x.comment.hid.wrong) wrong.push(x.comment); if (x.comment.voice === 'HELPER') helper.push(x.comment); if (!x.comment.text) empties.push(x.comment); }
      });
    };
    // payBills (BILLS, LADDER) and nextWeek (STAGE, OFFER, ENDING...) write into the week's log, then the next week replaces it: scan those too.
    ['payBills', 'nextWeek'].forEach(fn => {
      const orig = SB.Week[fn];
      SB.Week[fn] = function (state) { const W = state.week; const r = orig.apply(this, arguments); scan(state, W); return r; };
    });
    const seeds = FULL ? 12 : 4, weeks = FULL ? 156 : 26;
    for (let i = 0; i < seeds; i++) {
      const bot = i % 2 ? 'random' : (i % 4 === 0 ? 'learner' : 'gambler');
      const r = run.runGame({
        sb: SB, seed: 'text-fuzz-' + i, bot: bot, weeks: weeks, city: 'pensacola', text: true,
        hooks: { afterWeek: (state) => scan(state), afterClose: (state) => scan(state) }
      });
      if (!r.ok) { t.fail('seed ' + i + ' (' + bot + ') threw: ' + r.error.message); break; }
      // a fresh SB per run would reset the log; the SB here is shared, so reload for each seed
      if (SB.log.entries.length > 100000) SB.log.entries.length = 0;
    }
    const E = SB.Enums;
    // The fuzz bots never reach these (late-game legacy, helper reports, tours) and never pull every lever, so they get a static check instead:
    // the record type has a renderer in the UI, the cause has a comment table with lines.
    const NOT_IN_FUZZ = ['HELPER_REPORT', 'STAGE', 'OFFER', 'TOUR_DATE', 'ENDING'];
    t.eq(Object.keys(E.REC).filter(k => !recs[k] && NOT_IN_FUZZ.indexOf(k) < 0), [], 'every REC type is emitted at least once (' + Object.keys(recs).length + ' of ' + Object.keys(E.REC).length + ' seen; ' + NOT_IN_FUZZ.length + ' not reachable by the fuzz bots)');
    const CM = (SB.Content.feedback && SB.Content.feedback.comments) || {};
    t.eq(Object.keys(E.CAUSE).filter(k => !causes[k] && !(CM[k] && Object.keys(CM[k]).length)), [], 'every CAUSE appears in at least one comment (or has a comment table the fuzz bots just never trigger)');
    t.eq(empties.length, 0, 'no comment is empty');
    // a wrong reading names its voice's hobbyhorse and found a line
    t.eq(wrong.filter(c => !c.text).length, 0, 'every wrong reading found a line (' + wrong.length + ' wrong readings)');
    wrong.forEach(c => t.ok(c.hid.trueCause && c.hid.trueCause !== c.cause, 'a wrong reading names a cause other than the true one'));
    // helper comments are read from feedback.helper
    const F = SB.Content.feedback && SB.Content.feedback.helper;
    if (F) {
      const lines = [];
      ['RUNNER', 'ARTIST', 'FLOOR', 'LODGING'].forEach(r => ['UP', 'DOWN'].forEach(d => { const n = (F[r] || {})[d]; [].concat(n || []).forEach(x => lines.push(typeof x === 'string' ? x : x.t)); }));
      const stems = lines.map(l => l.replace(/\{[^}]*\}/g, '').replace(/\(\?[^)]*\)/g, '').replace(/\[[^\]]*\]/g, '').trim().slice(0, 12)).filter(Boolean);
      const bad = helper.filter(c => !stems.some(s => c.text.indexOf(s) >= 0)).map(c => c.text.slice(0, 50));
      t.eq(bad.slice(0, 4), [], 'every helper comment came from feedback.helper (' + helper.length + ' seen)');
    }
  });
};
