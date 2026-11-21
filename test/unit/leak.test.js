'use strict';
// leak.test — 06-harness section 3, `leak.test`: nothing hidden reaches the interface.
//   * no view function returns an object containing a key `hid`, or any number equal to a hidden number of the fixture
//     (a deep scan of every `view` in SB.API over the golden state, whose hidden numbers are made distinctive here);
//   * every bot runs under the guard proxy (06-harness 4): a read of `hid`, `state.truth`, `state.rng` or `state.director`, a write
//     to state, or a call to an internal function throws; none of the bots does any of that.
// The bots part runs even against stubs, so the guard and the bots are exercised from the first day.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  const run = require('../bots/run.js');
  const L = require('../bots/lib.js');

  /* ---- the bots under the guard ---- */
  H.section(t, 'bots under the guard', () => {
    run.BOT_NAMES.forEach(name => {
      const r = run.runGame({ seed: 'leak-' + name, bot: name, weeks: 10, city: 'pensacola', guard: true, strict: true });
      if (!r.ok && /is still a stub/.test(r.error.message) && !r.error.bot) { t.note('leak: ' + name + ' got as far as its first show night, which cannot be played while night.js is a stub (week ' + r.error.week + '); no rule was broken up to there'); return; }
      t.ok(r.ok, name + ' plays ten weeks under the guard' + (r.error ? ': ' + r.error.message : ''));
      if (!r.ok && r.error.bot) t.fail(name + ' broke a rule of the interface: ' + r.error.message);
    });
  });
  H.section(t, 'the guard itself', () => {
    const SB = H.fresh({ packs: ['pensacola'] });
    const state = H.newGame(SB, { seed: 'guard' });
    const g = L.guardState(state);
    t.throws(() => g.proxy.truth, 'state.truth', 'reading state.truth throws');
    t.throws(() => g.proxy.rng, 'state.rng', 'reading state.rng throws');
    t.throws(() => g.proxy.director, 'state.director', 'reading state.director throws');
    t.throws(() => { g.proxy.player.name = 3; }, 'wrote', 'writing to state throws');
    const bandId = Object.keys(state.bands || {})[0];
    if (bandId) t.throws(() => g.proxy.bands[bandId].hid, 'hid', 'reading hid on a band throws');
    t.ok(typeof g.proxy.player === 'object' && g.proxy.settings !== undefined, 'public fields are readable');
    const ctx = { state: state, proxy: g.proxy, cache: g.cache, strict: true, counts: { decisions: 0, calls: {} } };
    const bsb = L.wrapSB(SB, ctx);
    t.throws(() => bsb.Bands.weekly(g.proxy), 'internal', 'an internal function is refused to a bot');
    t.throws(() => bsb.Model.resolve, 'internal', 'Model is wholly internal');
    t.ok(typeof bsb.Week.step === 'function', 'a view or action is callable');
    t.ok(typeof bsb.rng.stream === 'undefined', 'a bot has no access to the engine\'s streams');
  });

  /* ---- views over the golden state ---- */
  const VIEW_MODULES = ['Game', 'Week', 'Shows', 'Jobs', 'Mail', 'Money', 'Stress', 'Forecast', 'Notebook', 'Bands', 'Rooms', 'Requests', 'Trends', 'Crowd', 'Territory', 'People', 'Harm', 'Legacy', 'Director'];
  if (!H.needs(t, VIEW_MODULES.concat(['Model']), 'the views')) return;
  const SB = H.fresh({ packs: ['pensacola'] });

  H.section(t, 'views over the golden state', () => {
    const f = golden.build(SB, { notebook: true });
    const st = f.state;
    // make the hidden numbers distinctive so an equal number cannot be a coincidence
    const secret = [];
    function mark(v) { secret.push(v); return v; }
    Object.keys(st.bands).forEach((id, i) => {
      const h = st.bands[id].hid;
      h.draw.city = mark(37.123 + i * .0173); h.drawPeak = h.draw.city; h.live = mark(71.456 + i * .0211); h.cross = mark(.31337 + i * .00171);
      h.promo = mark(.71717 + i * .00123); h.honest = mark(.88421 + i * .00131); h.rel = mark(.77123 + i * .00117); h.cohesion = mark(.66713 + i * .0011);
    });
    st.rooms.r21.hid.capReal = mark(163.77); st.rooms.r21.hid.fit = mark(.0731); st.rooms.r21.hid.pressure = mark(41.3719);
    st.truth.comfort = [mark(7.123), mark(10.456), mark(12.789)];
    Object.keys(st.truth.chan).forEach((k, i) => { st.truth.chan[k] = st.truth.chan[k].map((x, j) => mark(1.0731 + i * .0017 + j * .00031)); });
    Object.keys(st.people).forEach((id, i) => { st.people[id].hid.reliability = mark(.91234 + i * .00071); });
    SB.Notebook.init(st);
    const hasSecret = (n) => typeof n === 'number' && secret.some(s => Math.abs(s - n) < 1e-9);
    const calls = [
      ['Game.strip', s => [s]], ['Week.view', s => [s]], ['Week.suggest', s => [s]], ['Week.check', s => [s]], ['Week.tonight', s => [s]], ['Week.crunch', s => [s]],
      ['Shows.get', s => [s, 's1']], ['Shows.list', s => [s, {}]], ['Shows.view', s => [s, 's1']],
      ['Jobs.catalog', s => ['MAKE_FLYER']], ['Jobs.tray', s => [s]], ['Jobs.freeJobs', s => [s]], ['Jobs.flyerSpec', s => [s, 's1']],
      ['Mail.inbox', s => [s, 'ALL']], ['Mail.waiting', s => [s]], ['Mail.needsYou', s => [s]], ['Mail.outbox', s => [s]],
      ['Money.exposure', s => [s, 's1']], ['Money.owedAhead', s => [s]], ['Money.showAccounts', s => [s, 's1']], ['Money.ledger', s => [s, {}]], ['Money.billsView', s => [s]],
      ['Stress.zone', s => [s]], ['Stress.view', s => [s]],
      ['Forecast.par', s => [s, 's1']], ['Forecast.call', s => [s, 's1']], ['Forecast.card', s => [s, 's1']], ['Forecast.reachStrip', s => [s, 's1']],
      ['Forecast.what', s => [s, 's1', { price: 8 }]],
      ['Notebook.range', s => [s, 'draw:b13:city']], ['Notebook.pages', s => [s, 'BANDS']], ['Notebook.pages', s => [s, 'CROWDS']], ['Notebook.pages', s => [s, 'ROOMS']],
      ['Notebook.pages', s => [s, 'NIGHTS']], ['Notebook.pages', s => [s, 'DOOR']], ['Notebook.entry', s => [s, 'draw:b13:city']], ['Notebook.tally', s => [s, 2028]],
      ['Bands.get', s => [s, 'b13']], ['Bands.list', s => [s, {}]], ['Bands.card', s => [s, 'b11']], ['Bands.card', s => [s, 'b12']], ['Bands.card', s => [s, 'b13']],
      ['Bands.fee', s => [s, 'b13', 's1']], ['Bands.replyWindow', s => [s, 'b13']], ['Bands.trust', s => [s, 'b13']],
      ['Rooms.get', s => [s, 'r21']], ['Rooms.list', s => [s, {}]], ['Rooms.card', s => [s, 'r21']], ['Rooms.calendar', s => [s, 'r21', f.day - 3, 10]], ['Rooms.terms', s => [s, 'r21', 's1']],
      ['Rooms.rel', s => [s, 'r21']], ['Rooms.otherShows', s => [s, f.day - 10, f.day + 10]], ['Rooms.bookers', s => [s]],
      ['Trends.signs', s => [s]], ['Trends.arrow', s => [s, 'hardcore']], ['Crowd.regulars', s => [s]], ['Crowd.focus', s => [s]],
      ['Territory.word', s => [s]], ['Territory.contacts', s => [s]], ['Territory.tourCandidates', s => [s]],
      ['People.get', s => [s, 'p41']], ['People.card', s => [s, 'p41']], ['People.rel', s => [s, 'p41']], ['People.crew', s => [s, 'sound', 's1']], ['People.circle', s => [s]],
      ['Harm.current', s => [s]], ['Harm.list', s => [s]], ['Harm.flags', s => [s, 'b13']],
      ['Legacy.wall', s => [s]], ['Legacy.binder', s => [s, {}]], ['Legacy.townLine', s => [s]], ['Legacy.firsts', s => [s]], ['Legacy.offers', s => [s]],
      ['Director.risks', s => [s]], ['Requests.list', s => [s, {}]]
    ];
    const leaks = [], throwers = [];
    calls.forEach(c => {
      const parts = c[0].split('.'); let out;
      try { out = SB[parts[0]][parts[1]].apply(SB[parts[0]], c[1](st)); } catch (e) { throwers.push(c[0] + ': ' + e.message); return; }
      (function scan(v, p, depth) {
        if (depth > 40 || v === null || v === undefined) return;
        if (typeof v === 'number') { if (hasSecret(v)) leaks.push(c[0] + ' ' + p + ' = ' + v); return; }
        if (typeof v !== 'object') return;
        if (Array.isArray(v)) { v.forEach((x, i) => scan(x, p + '[' + i + ']', depth + 1)); return; }
        Object.keys(v).forEach(k => { if (k === 'hid') leaks.push(c[0] + ' ' + p + '.hid is present'); else scan(v[k], p + '.' + k, depth + 1); });
      })(out, '', 0);
    });
    // Bands.get, Shows.get, Rooms.get, People.get return the stored object and say the interface must not read hid: they are exempt from the key test only
    const exempt = ['Bands.get', 'Rooms.get', 'People.get', 'Shows.get', 'Requests.get'];
    const real = leaks.filter(x => !(exempt.some(e => x.indexOf(e + ' ') === 0) && /\.hid is present$/.test(x)));
    t.eq(real.slice(0, 8), [], 'no view returns a hid key or a hidden number of the fixture (' + calls.length + ' views scanned, ' + real.length + ' leaks)');
    t.eq(throwers.slice(0, 5), [], 'every view can be called over the golden state without throwing');
    // The stored-object views must carry no hidden number except under their own hid key
    ['Bands.get', 'Rooms.get', 'People.get'].forEach(k => {
      const parts = k.split('.'); const arg = { 'Bands.get': 'b13', 'Rooms.get': 'r21', 'People.get': 'p41' }[k];
      const v = SB[parts[0]][parts[1]](st, arg); const copy = JSON.parse(JSON.stringify(v)); delete copy.hid;
      const found = []; (function scan(x, p) { if (typeof x === 'number') { if (hasSecret(x)) found.push(p); } else if (x && typeof x === 'object') Object.keys(x).forEach(q => scan(x[q], p + '.' + q)); })(copy, '');
      t.eq(found, [], k + ' holds no hidden number outside its hid key');
    });
  });
};
