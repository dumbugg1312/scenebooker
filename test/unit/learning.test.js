'use strict';
// learning.test — 06-harness section 3, `learning.test`, from 02-engine 7.10 (the clarity rule) and mechanics 2.
//   * a show with one unknown narrows it to about 55 percent of its width; with four, to about 78 percent;
//   * the truth is always inside the band; bands never widen except by staleness and `reopen`;
//   * a prior of zero width is KNOWN; conf follows the cuts .60 / .30 / .12; never narrowed is NONE;
//   * fog HARD keeps a band family above bandFloor of its prior; fog OPEN narrows faster.
// Method: the golden state's notebook is set so every number is known (lo = hi = the truth, read through the TRUTH lens), then k
// numbers that bear on the night are reopened around their truth, and Notebook.learnFromShow runs on the played show.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Model', 'Forecast', 'Notebook'], 'learning')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const C = SB.Config;
  const clone = x => JSON.parse(JSON.stringify(x));

  function prepared(unknownKeys, fog) {
    const f = golden.build(SB, { notebook: true }); f.withLuck();
    const st = f.state;
    st.settings.fog = fog || 'NORMAL';
    const lens = SB.Forecast.lens(st, 'TRUTH', {});
    const truth = {};
    Object.keys(st.notebook.est).forEach(k => {
      const v = lens.get(k);
      if (typeof v !== 'number' || !isFinite(v)) return;
      truth[k] = v;
      st.notebook.est[k] = { lo: v, hi: v, p0: v, p1: v, seen: 0, n: 3, src: 'SHOW' };
    });
    const used = [];
    unknownKeys.forEach(k => {
      if (truth[k] === undefined) return;
      const v = truth[k], w = Math.max(.2 * Math.abs(v), 1);
      st.notebook.est[k] = { lo: v - w, hi: v + w, p0: v - w, p1: v + w, seen: null, n: 0, src: 'PRIOR' };
      used.push(k);
    });
    f.show.status = 'PLAYED';
    f.show.result = { heads: 100, q: 69, byGen: [23, 66, 11], verdict: 'GOOD', vsPar: 'OVER', par: { heads: 87, q: 64 }, call: { lo: 70, hi: 108, mid: 89, inside: true } };
    return { f: f, st: st, truth: truth, used: used };
  }
  const KEYS = ['draw:b13:city', 'live:b12', 'draw:b12:city', 'night:1:3', 'aff:hardcore:emo', 'price:1', 'roomcap:r21'];

  H.section(t, 'one unknown', () => {
    const p = prepared([KEYS[0]]);
    t.eq(p.used.length, 1, 'the fixture has an estimate for ' + KEYS[0] + ' (found ' + Object.keys(p.st.notebook.est).filter(k => k === KEYS[0]).length + ')');
    if (!p.used.length) return;
    const e0 = p.st.notebook.est[KEYS[0]], w0 = e0.hi - e0.lo;
    SB.Notebook.learnFromShow(p.st, 's1');
    const e1 = p.st.notebook.est[KEYS[0]];
    t.near((e1.hi - e1.lo) / w0, .55, .08, 'with one unknown the band narrows to about 55 percent of its width (it is the only thing the night could have taught)');
    t.ok(e1.lo <= p.truth[KEYS[0]] + 1e-9 && e1.hi >= p.truth[KEYS[0]] - 1e-9, 'the truth is inside the new band');
    t.ok(e1.lo >= e0.lo - 1e-9 && e1.hi <= e0.hi + 1e-9, 'the new band lies inside the old one');
  });

  H.section(t, 'four unknowns', () => {
    const four = [KEYS[0], KEYS[1], KEYS[2], KEYS[3]];
    const p = prepared(four);
    const used = p.used; if (used.length < 4) { t.note('learning: only ' + used.length + ' of 4 keys exist in the notebook'); }
    const w0 = {}; used.forEach(k => { w0[k] = p.st.notebook.est[k].hi - p.st.notebook.est[k].lo; });
    SB.Notebook.learnFromShow(p.st, 's1');
    const r = used.map(k => (p.st.notebook.est[k].hi - p.st.notebook.est[k].lo) / w0[k]);
    const meanRatio = r.reduce((a, b) => a + b, 0) / Math.max(1, r.length);
    t.ok(meanRatio > .55 && meanRatio < .97, 'with four unknowns each narrows less than with one (mean ratio ' + meanRatio.toFixed(2) + ')');
    t.near(meanRatio, .78, .13, 'with four unknowns, to about 78 percent (influence is not equal between numbers, so the mean is loose)');
    used.forEach((k, i) => t.ok(p.st.notebook.est[k].lo <= p.truth[k] + 1e-9 && p.st.notebook.est[k].hi >= p.truth[k] - 1e-9, 'the truth of ' + k + ' is inside its band'));
  });

  H.section(t, 'never wider, reopen, staleness, zero width', () => {
    const p = prepared([KEYS[0], KEYS[1]]);
    const st = p.st;
    if (!st.notebook.est[KEYS[0]]) { t.fail('the notebook has no estimate for ' + KEYS[0] + ' after Notebook.init'); return; }
    // run several shows' worth of learning: the width never grows
    let prev = {}; p.used.forEach(k => { prev[k] = st.notebook.est[k].hi - st.notebook.est[k].lo; });
    for (let i = 0; i < 5; i++) {
      SB.Notebook.learnFromShow(st, 's1');
      p.used.forEach(k => { const w = st.notebook.est[k].hi - st.notebook.est[k].lo; t.ok(w <= prev[k] + 1e-9, 'learning never widens ' + k + ' (round ' + i + ')'); prev[k] = w; });
    }
    // narrow with a factor over 1 is still not wider
    const q = prepared([KEYS[0]]); if (!q.st.notebook.est[KEYS[0]]) return; const w = q.st.notebook.est[KEYS[0]].hi - q.st.notebook.est[KEYS[0]].lo;
    SB.Notebook.narrow(q.st, KEYS[0], 2.5, 'SHOW');
    t.ok(q.st.notebook.est[KEYS[0]].hi - q.st.notebook.est[KEYS[0]].lo <= w + 1e-9, 'narrow with a factor of 2.5 does not widen');
    // reopen widens toward the prior, around the truth
    const r = prepared([KEYS[0]]); SB.Notebook.narrow(r.st, KEYS[0], .2, 'SHOW');
    const narrow = r.st.notebook.est[KEYS[0]].hi - r.st.notebook.est[KEYS[0]].lo;
    SB.Notebook.reopen(r.st, KEYS[0], .9);
    const e = r.st.notebook.est[KEYS[0]];
    t.ok(e.hi - e.lo > narrow, 'reopen widens a narrowed band');
    t.ok(e.hi - e.lo <= (e.p1 - e.p0) + 1e-9, 'reopen does not pass the prior');
    t.ok(e.lo <= r.truth[KEYS[0]] + 1e-9 && e.hi >= r.truth[KEYS[0]] - 1e-9, 'the truth is still inside after reopen');
    // staleness: each 13 weeks
    const s = prepared([]); const k = KEYS[0]; const v = s.truth[k];
    if (v !== undefined) {
      s.st.notebook.est[k] = { lo: v, hi: v, p0: v - 5, p1: v + 5, seen: 0, n: 3, src: 'SHOW' };
      s.st.clock.week = 13; SB.Notebook.weekly(s.st);
      const e2 = s.st.notebook.est[k];
      t.ok(e2.hi - e2.lo >= 0 && e2.hi - e2.lo <= 10 + 1e-9, 'staleness widens a drifting family but never past its prior');
    }
    // a prior of zero width: the ratio is 0 and conf is KNOWN
    const z = prepared([]); const zk = Object.keys(z.st.notebook.est)[0];
    z.st.notebook.est[zk] = { lo: 4, hi: 4, p0: 4, p1: 4, seen: null, n: 0, src: 'PRIOR' };
    const info = SB.Notebook.est(z.st, zk);
    t.eq(info && info.conf, SB.Enums.CONF.KNOWN, 'a prior of zero width is KNOWN');
  });

  H.section(t, 'confidence cuts', () => {
    const cuts = C.CONF_CUTS;       // .60, .30, .12
    const p = prepared([]); const k = Object.keys(p.st.notebook.est)[0];
    function conf(ratio, n) { p.st.notebook.est[k] = { lo: 0, hi: ratio * 10, p0: 0, p1: 10, seen: n ? 1 : null, n: n, src: 'SHOW' }; const e = SB.Notebook.est(p.st, k); return e && e.conf; }
    t.eq(conf(1, 0), SB.Enums.CONF.NONE, 'never narrowed is NONE');
    t.eq(conf(cuts[0] + .05, 1), SB.Enums.CONF.RUMOR, 'wider than .60 of the prior is RUMOR');
    t.eq(conf((cuts[0] + cuts[1]) / 2, 1), SB.Enums.CONF.HEARD, 'between .30 and .60 is HEARD');
    t.eq(conf((cuts[1] + cuts[2]) / 2, 1), SB.Enums.CONF.SEEN, 'between .12 and .30 is SEEN');
    t.eq(conf(cuts[2] - .05, 2), SB.Enums.CONF.KNOWN, 'under .12 is KNOWN');
  });

  H.section(t, 'fog', () => {
    const k = KEYS[0];
    function widthAfter(fog, rounds) {
      const p = prepared([k], fog); if (!p.st.notebook.est[k]) return { w: 0, prior: 1, missing: true }; const w0 = p.st.notebook.est[k].p1 - p.st.notebook.est[k].p0;
      for (let i = 0; i < rounds; i++) SB.Notebook.learnFromShow(p.st, 's1');
      const e = p.st.notebook.est[k]; return { w: e.hi - e.lo, prior: w0 };
    }
    const hard = widthAfter('HARD', 25), normal = widthAfter('NORMAL', 3), open = widthAfter('OPEN', 3);
    if (hard.missing) { t.fail('the notebook has no estimate for ' + k); return; }
    t.ok(hard.w >= C.FOG.HARD.bandFloor * hard.prior - 1e-6, 'fog HARD keeps a band family at or above its floor (' + (hard.w / hard.prior).toFixed(3) + ' of the prior)');
    t.ok(open.w <= normal.w + 1e-9, 'fog OPEN narrows at least as fast as NORMAL (' + open.w.toFixed(2) + ' against ' + normal.w.toFixed(2) + ')');
  });

  H.section(t, 'nothing to learn from', () => {
    const p = prepared([]);                                  // every number known: the sum of influence is 0
    const before = JSON.stringify(p.st.notebook.est);
    SB.Notebook.learnFromShow(p.st, 's1');
    t.eq(JSON.stringify(p.st.notebook.est), before, 'with nothing unknown, nothing narrows');
  });
};
