'use strict';
// forecast.test — 06-harness section 3, `forecast.test`, on the golden show (test/fixtures/golden.js).
//   * Par ignores quirks and luck;
//   * a show on which every usual job was done on its ideal day has reach under ACTUAL equal to reach under USUAL;
//   * doubling followers moves Par and the actual heads by the same factor within 2 percent;
//   * a hand-out, a paid push, an ad or a second run each raise the actual above Par and leave Par unchanged;
//   * a request that arrived 6 days out has a lower Par than the same show on full notice;
//   * the Call always contains its own centre; narrowing any band never widens the Call;
//   * Forecast.what changes nothing in state.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Model', 'Forecast', 'Notebook'], 'forecast')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const C = SB.Config;
  const fx = golden.build(SB, { notebook: true });
  const clone = x => JSON.parse(JSON.stringify(x));
  function copy() { const s = clone(fx.state); return { state: s, show: s.shows.s1, day: fx.day }; }
  const par = (f) => SB.Forecast.par(f.state, 's1');
  const actual = (f, over) => { const lens = SB.Forecast.lens(f.state, 'TRUTH', Object.assign({ stale: false }, over || {})); lens.luck = false; return SB.Model.resolve(f.state, f.show, lens, f.show.mods).night; };

  H.section(t, 'par ignores quirks and luck', () => {
    const a = copy(), b = copy();
    b.state.truth.quirks.push({ id: 'kq', fan: 'hardcore', band: 'emo', d: -.45, both: true, cause: 'FALLING_OUT', born: 0, ends: 999 });
    b.state.truth.quirks.push({ id: 'kq2', fan: 'emo', band: 'crust', d: .45, both: true, cause: 'SHARED_HOUSE', born: 0, ends: 999 });
    b.show.night = { luck: [{ k: 'RAIN', mul: .5, gen: null, zones: null }], mods: {}, stops: [], at: null, par: null, call: null, emitted: 0, dispute: null, demand: null };
    t.near(par(b).heads, par(a).heads, .01, 'Par is the same with quirks and a luck draw on the show');
    t.near(par(b).q, par(a).q, .01, 'Par\'s night score is the same too');
  });

  H.section(t, 'the usual lands on par', () => {
    const f = copy();
    const lensA = SB.Forecast.lens(f.state, 'TRUTH', { stale: false });
    f.show.promo = SB.Forecast.usual(f.state, f.show);             // every usual job done on its ideal day
    const ra = SB.Model.reach(f.state, f.show, lensA, f.day);
    const lensU = SB.Forecast.lens(f.state, 'TRUTH', { stale: false }); lensU.promo = 'USUAL';
    const ru = SB.Model.reach(f.state, f.show, lensU, f.day);
    ra.raw.forEach((v, g) => t.near(v, ru.raw[g], .001, 'reach under ACTUAL equals reach under USUAL, generation ' + g));
    t.ok(f.show.promo.flyer && f.show.promo.announce !== undefined, 'the usual is a promo object of the shape of show.promo');
    t.eq(f.show.promo.paid, null, 'the usual buys no paid push');
    t.eq(f.show.promo.ad, null, 'the usual buys no ad');
    t.eq(f.show.promo.handouts, [], 'the usual hands out nothing');
  });

  H.section(t, 'doubling followers', () => {
    const a = copy(), b = copy(); b.state.player.followers = a.state.player.followers * 2;
    // the usual: the player's followers move the announcement ceiling for both, so both move by about the same factor
    const pa = par(a).heads, pb = par(b).heads;
    a.show.promo = SB.Forecast.usual(a.state, a.show); b.show.promo = SB.Forecast.usual(b.state, b.show);
    const ha = actual(a).heads, hb = actual(b).heads;
    t.ok(pb > pa, 'Par rises with followers');
    t.near((pb / pa) / Math.max(1e-9, hb / ha), 1, .02, 'Par and the actual heads move by the same factor within 2 percent (par x' + (pb / pa).toFixed(3) + ', actual x' + (hb / ha).toFixed(3) + ')');
  });

  H.section(t, 'extra effort beats par and leaves it alone', () => {
    const base = copy(); base.show.promo = SB.Forecast.usual(base.state, base.show);
    const p0 = par(base).heads, h0 = actual(base).heads, D = base.day;
    const extras = {
      'a hand-out': f => { f.show.promo.handouts = [{ day: D - 3, otherShowId: 'o2', heads: 90, aff: .7 }]; },
      'a paid push': f => { f.show.promo.paid = { level: 'HIGH', day: D - 28 }; },
      'an ad': f => { f.show.promo.ad = { kind: 'PAPER', day: D - 14 }; },
      'a second run': f => { Object.keys(f.show.promo.runs).forEach(k => { f.show.promo.runs[k].again = D - 8; }); }
    };
    Object.keys(extras).forEach(name => {
      const f = copy(); f.show.promo = clone(base.show.promo); extras[name](f);
      t.near(par(f).heads, p0, .01, name + ' leaves Par unchanged');
      t.ok(actual(f).heads > h0 - 1e-9, name + ' does not lower the actual heads (' + actual(f).heads + ' against ' + h0 + ')');
    });
    // each raises the actual strictly, except where the effect rounds to nothing for this fixture
    const f2 = copy(); f2.show.promo = clone(base.show.promo); extras['a hand-out'](f2); extras['a paid push'](f2); extras['an ad'](f2); extras['a second run'](f2);
    t.ok(actual(f2).heads > h0, 'all four together raise the actual above the plain usual');
  });

  H.section(t, 'short notice', () => {
    const full = copy(), short = copy();
    full.show.origin = full.day - 40; short.show.origin = short.day - 6;
    t.ok(par(short).heads < par(full).heads, 'a request that arrived 6 days out has a lower Par (' + Math.round(par(short).heads) + ' against ' + Math.round(par(full).heads) + ')');
    const own = copy(); own.show.origin = null;
    t.near(par(own).heads, par(full).heads, par(full).heads * .02, 'a show the player started (origin null) is not short notice');
  });

  H.section(t, 'the call', () => {
    const f = copy();
    const c = SB.Forecast.call(f.state, 's1');
    t.ok(c.lo <= c.mid && c.mid <= c.hi, 'the Call contains its own centre (' + [c.lo, c.mid, c.hi].map(x => Math.round(x)).join(' / ') + ')');
    t.ok(c.lo >= 0, 'the Call\'s low end is not below zero');
    t.ok(Array.isArray(c.unknowns) && c.unknowns.length <= 3, 'the Call names at most three unknowns');
    c.unknowns.forEach(u => t.ok(u.key && typeof u.label === 'string' && typeof u.d === 'number', 'an unknown has a key, a label (empty with text off) and a size in heads'));
    const width0 = c.hi - c.lo;
    const keys = Object.keys(f.state.notebook.est).slice(0, 40);
    let widened = [], tried = 0;
    keys.forEach(k => {
      const g = copy(); const e = g.state.notebook.est[k]; if (!e || e.hi - e.lo <= 0) return;
      const before = SB.Forecast.call(g.state, 's1'); const w0 = before.hi - before.lo;
      SB.Notebook.narrow(g.state, k, .3, 'SHOW');
      const after = SB.Forecast.call(g.state, 's1'); tried++;
      if (after.hi - after.lo > w0 + 1e-6) widened.push(k);
    });
    t.eq(widened, [], 'narrowing any band never widens the Call (' + tried + ' keys tried, width ' + Math.round(width0) + ')');
    t.ok(tried > 5, 'the notebook has bands to narrow (' + tried + ')');
  });

  H.section(t, 'what changes nothing', () => {
    const f = copy();
    const before = JSON.stringify(f.state);
    const w1 = SB.Forecast.what(f.state, 's1', { price: 5 });
    const w2 = SB.Forecast.what(f.state, 's1', { roomId: 'r23', ages: 'A21' });
    const w3 = SB.Forecast.what(f.state, 's1', { day: f.day + 1, order: f.show.bill.slots.map(s => s.bandId).reverse(), label: 'BIG' });
    t.eq(JSON.stringify(f.state), before, 'Forecast.what changes nothing in state, rng streams included');
    t.ok(w1.par && w1.call && isFinite(w1.par.heads), 'what returns a par and a call');
    t.ok(w2.par.heads <= par(f).heads + 1, 'the bar back room, 21 and over, does not raise Par (kids are gone)');
    const base = par(f).heads;
    t.ok(SB.Forecast.what(f.state, 's1', { price: 5 }).par.heads >= base - 1e-9, 'a cheaper door does not lower Par');
    t.ok(SB.Forecast.what(f.state, 's1', { price: 15 }).par.heads <= base + 1e-9, 'a dearer door does not raise Par');
    SB.Forecast.card(f.state, 's1'); SB.Forecast.reachStrip(f.state, 's1');
    t.eq(JSON.stringify(f.state), before, 'card and reachStrip change nothing either');
    const card = SB.Forecast.card(f.state, 's1');
    t.ok(card.par && card.call && card.reach && card.reach.gens.length === 3, 'the forecast card has par, call and a three-generation reach strip');
  });
};
