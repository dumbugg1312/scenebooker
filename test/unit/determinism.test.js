'use strict';
// determinism.test — 06-harness section 3, `determinism.test`, from 01-state section 4 and 00-overview 6.3.
//   * the same seed and the same bot give a byte-identical SB.Save.exportText after 52 weeks;
//   * exporting at week 20, importing and continuing gives the same week-52 state;
//   * changing the door price of show A does not change the luck drawn for show B, nor the world-generation streams (stream isolation).
// The first two need the whole engine (they play a year). The third uses the golden fixture and needs the night.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  const run = require('../bots/run.js');
  const FULL = ['Game', 'Week', 'Shows', 'Jobs', 'Mail', 'Money', 'Stress', 'Save', 'WorldGen', 'Director', 'Requests', 'Rooms', 'Bands', 'People', 'Notebook', 'Night', 'Model', 'Forecast', 'Feedback', 'Crowd', 'Trends', 'Territory', 'Harm', 'Legacy', 'Effects'];

  if (H.needs(t, FULL, 'two runs of a year')) {
    H.section(t, 'same seed, same text', () => {
      const a = run.runGame({ seed: 'det-1', bot: 'checklist', weeks: 52, city: 'pensacola' });
      const b = run.runGame({ seed: 'det-1', bot: 'checklist', weeks: 52, city: 'pensacola' });
      if (!a.ok || !b.ok) { t.fail('a run threw: ' + ((a.error || b.error).message)); return; }
      const SB = globalThis.SB;
      const ta = SB.Save.exportText(a.state), tb = SB.Save.exportText(b.state);
      t.ok(ta.length > 1000, 'the export has content (' + ta.length + ' characters)');
      t.ok(ta === tb, 'the same seed and the same bot give a byte-identical export after 52 weeks');
      const c = run.runGame({ seed: 'det-2', bot: 'checklist', weeks: 52, city: 'pensacola' });
      t.ok(c.ok && SB.Save.exportText(c.state) !== ta, 'a different seed gives a different year');
    });

    H.section(t, 'export, import, continue', () => {
      const full = run.runGame({ seed: 'det-3', bot: 'checklist', weeks: 52, city: 'pensacola' });
      if (!full.ok) { t.fail('the straight run threw: ' + full.error.message); return; }
      const SB = globalThis.SB;
      const straight = SB.Save.exportText(full.state);
      const first = run.runGame({ seed: 'det-3', bot: 'checklist', weeks: 20, city: 'pensacola' });
      if (!first.ok) { t.fail('the first leg threw: ' + first.error.message); return; }
      const text = SB.Save.exportText(first.state);
      const imp = SB.Save.importText(text);
      t.ok(imp && imp.ok !== false && imp.state, 'the export imports');
      t.ok(SB.Save.exportText(imp.state) === text, 'an imported state exports to the same text');
      const second = run.runGame({ seed: 'det-3', bot: 'checklist', weeks: 52, city: 'pensacola', resume: { state: imp.state, startWeek: 20 } });
      if (!second.ok) { t.fail('the resumed run threw: ' + second.error.message); return; }
      t.ok(SB.Save.exportText(second.state) === straight, 'exporting at week 20, importing and continuing gives the same week-52 state');
    });
  }

  /* ---- stream isolation ---- */
  if (H.needs(t, ['Night', 'Model', 'Forecast', 'Notebook', 'Director', 'Feedback', 'Bands', 'Crowd', 'Rooms', 'People', 'Territory', 'Harm', 'Legacy'], 'stream isolation')) {
    H.section(t, 'stream isolation', () => {
      const SB = H.fresh({ packs: ['pensacola'] });
      function base() {
        const f = golden.build(SB, { notebook: true });
        const s2 = JSON.parse(JSON.stringify(f.state.shows.s1));
        s2.id = 's2'; s2.day = f.day + 7; s2.status = 'CONFIRMED'; s2.night = null;
        f.state.shows.s2 = s2; f.state.week.shows = [];
        return f;
      }
      function luckOfB(f) {
        const st = SB.Night.begin(f.state, 's2');
        const lk = f.state.shows.s2.night ? f.state.shows.s2.night.luck : null;
        return JSON.stringify(lk);
      }
      const A = base(), B = base();
      B.state.shows.s1.door.price = 5;                                // change show A's door price
      SB.Night.auto(A.state, 's1', { settle: 'FAIR' }); SB.Night.auto(B.state, 's1', { settle: 'FAIR' });
      t.eq(JSON.stringify(A.state.rng.streams.worldgen || null), JSON.stringify(B.state.rng.streams.worldgen || null), 'the world-generation stream is not moved by a door price');
      t.eq(JSON.stringify(A.state.rng.streams.names || null), JSON.stringify(B.state.rng.streams.names || null), 'the names stream is not moved either');
      t.eq(luckOfB(A), luckOfB(B), 'the luck drawn for show B does not depend on show A\'s door price');
      t.eq(JSON.stringify(A.state.rng.streams['show:s2'] || null) === JSON.stringify(B.state.rng.streams['show:s2'] || null), true, 'show B\'s stream is in the same position');
    });
  }
};
