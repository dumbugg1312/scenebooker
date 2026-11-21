'use strict';
// cities.test — 06-harness section 3, `cities.test`.
//   * the index: 166 entries, unique slugs, every dossier file in design/cities has an entry, inks and paper are enum ids;
//   * every pack file present passes SB.Cities.validate AS WRITTEN (the raw pack, captured from the file) and normalizes;
//   * the Pensacola pack validates with its `town:` hood routes, has no rooms on a PEER zone, derived.cuts equal the zones' `beyond`;
//   * the smallest legal pack (04-cities 6.4) gets a calendar from the presets, starts a game and plays 20 weeks (engine files that
//     are still stubs make the last part a note); the same pack with every "your town" answer set normalizes; with none set it
//     equals the untuned pack; its questions are the seven of 04-cities 4.5;
//   * no content string and no pack string outside `banned` and `blocklist` holds a term of the merged banned list (section 5.3).
const fs = require('fs'), path = require('path');
const H = require('../helpers.js');

const MINIMAL = {
  v: 1, slug: 'fort-wayne-in',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  blurb: ['Indiana\'s second city: cheap rent, cars everywhere, and nowhere to go on a Tuesday.', 'Kids make their own rooms because nobody else will.'],
  hard: 'Off the touring line by an hour; winter kills turnout.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [{ name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 }, { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }],
  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Wayne' },
    { id: 'huntington', kind: 'FEEDER', name: 'Huntington', minutes: 30, bearing: 235, note: 'A college town and county seat with a few bands.', bands: 1 },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', minutes: 25, bearing: 5, note: 'Kids drive in.' },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 30, bearing: 155, note: 'Farm town.' },
    { id: 'columbia-city', kind: 'FEEDER', name: 'Columbia City', minutes: 25, bearing: 285, note: 'Rural; commuters.' },
    { id: 'warsaw', kind: 'FEEDER', name: 'Warsaw', minutes: 50, bearing: 290, note: 'Has small shows of its own.', bands: 1 },
    { id: 'angola', kind: 'FEEDER', name: 'Angola', minutes: 45, bearing: 10, note: 'Lake country; seasonal.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'van-wert', kind: 'FEEDER', name: 'Van Wert', state: 'OH', minutes: 45, bearing: 105, note: 'Kids drive west.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 80, bearing: 190, scene: 900, note: 'The DIY cousin.' },
    { id: 'south-bend', kind: 'PEER', name: 'South Bend', minutes: 90, bearing: 310, slug: 'south-bend-in', note: 'A bigger college and arts scene.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 105, bearing: 60, slug: 'toledo-oh', note: 'The road to Detroit.' }
  ],
  hoods: [
    { id: 'downtown', name: 'downtown', note: 'Bars and a revived riverfront; polished.', route: 'downtown' },
    { id: 'fairfield', name: 'the Fairfield corridor', note: 'Old houses with basements, record and thrift shops.', route: 'old-side' },
    { id: 'west-central', name: 'West Central', note: 'Big old houses cut into apartments.', route: 'old-side' },
    { id: 'near-south', name: 'the near south side', note: 'Cheap, industrial units, working families.', route: 'work-side' },
    { id: 'north-campus', name: 'the north side by campus', note: 'A commuter campus; apartments and students.', route: 'campus' }
  ],
  roads: ['I-69', 'I-469', 'US 30', 'US 24', 'US 27'],
  words: { street: ['Calhoun', 'Fairfield', 'Broadway', 'Rudisill', 'Coliseum Boulevard'], water: ['the St. Marys', 'the Maumee', 'the St. Joseph'],
           hood: ['West Central', 'Lakeside', 'Waynedale'], thing: ['coney', 'tenderloin', 'magnet wire', 'boiler'], weather: ['lake effect'] }
};
const TUNE_ALL = { nights: 'THURSDAY_TOO', lean: ['hardcore', 'metal'], allAges: true, barOnly: false, town: 'COLLEGE', mainRoom: 'HOUSE', football: true };

function clone(x) { return JSON.parse(JSON.stringify(x)); }

module.exports = function (t) {
  const SB = H.fresh({ packs: H.packSlugs() });
  const E = SB.Enums, C = SB.Config;
  if (!SB.Cities || typeof SB.Cities.validate !== 'function') { t.fail('SB.Cities is missing'); return; }
  const general = H.bannedGeneral();
  SB.Cities.generalBanned = general;

  /* ---- the index ---- */
  const idx = SB.CityIndex;
  t.eq(idx.length, 216, 'the index has 216 entries');
  const slugs = idx.map(e => e.slug);
  t.eq(slugs.length, new Set(slugs).size, 'slugs are unique');
  t.eq(slugs.filter(s => !/^[a-z0-9-]+$/.test(s)), [], 'slugs are lower case, digits and hyphens');
  const dossierDir = path.join(H.ROOT, 'design/cities');
  if (fs.existsSync(dossierDir)) {
    const dossiers = fs.readdirSync(dossierDir).filter(f => /\.md$/.test(f) && f[0] !== '_').map(f => f.replace(/\.md$/, ''));
    t.eq(dossiers.filter(d => slugs.indexOf(d) < 0), [], 'every dossier file has an index entry');
    t.eq(slugs.filter(s => dossiers.indexOf(s) < 0), [], 'every index entry has a dossier file');
  } else t.note('design/cities does not exist: dossier coverage not checked');
  t.eq(idx.filter(e => !E.INK[e.inks && e.inks[0]] || !E.INK[e.inks && e.inks[1]]).map(e => e.slug), [], 'every entry has two inks that are INK ids');
  t.eq(idx.filter(e => !E.PAPER[e.paper]).map(e => e.slug), [], 'every entry has a paper that is a PAPER id');
  t.eq(idx.filter(e => !E.SIZE[e.size]).map(e => e.slug), [], 'every entry has a SIZE');
  t.eq(idx.filter(e => (e.traits || []).some(x => !E.TRAIT[x])).map(e => e.slug), [], 'every trait is a TRAIT');
  t.eq(idx.filter(e => typeof e.lat !== 'number' || typeof e.lon !== 'number' || typeof e.pop !== 'number').map(e => e.slug), [], 'every entry has lat, lon and pop');
  t.eq(idx.filter(e => String(e.blurb || '').length > 140 || String(e.hard || '').length > 90).map(e => e.slug), [], 'blurb at most 140 characters and hard at most 90');
  t.eq(idx.filter(e => e.featured).map(e => e.slug), ['pensacola'], 'only Pensacola is featured');
  t.eq(['atlanta', 'austin', 'boston', 'chicago', 'denver', 'los-angeles', 'louisville', 'minneapolis', 'new-york', 'oakland', 'pensacola', 'philadelphia', 'pittsburgh', 'portland', 'richmond', 'washington-dc'].filter(s => slugs.indexOf(s) < 0), [], 'the sixteen cities of 04-cities 1 are in the index');

  /* ---- every pack file present, raw ---- */
  const present = H.packSlugs();
  t.ok(present.indexOf('pensacola') >= 0, 'the Pensacola pack exists');
  present.forEach(slug => {
    const rp = H.rawPack(slug);
    t.ok(!!rp && rp.slug === slug, slug + ': the file makes exactly one register call for its own slug');
    if (!rp) return;
    const probs = SB.Cities.validate(clone(rp.pack), general);
    const hard = probs.filter(p => p.indexOf('warning:') !== 0);
    t.eq(hard.slice(0, 6), [], slug + ': SB.Cities.validate on the raw pack finds nothing (' + probs.length + ' problems incl. warnings)');
    probs.filter(p => p.indexOf('warning:') === 0).slice(0, 3).forEach(w => t.note(slug + ' ' + w));
    t.ok(!!SB.Cities.entry(slug), slug + ' is in the index');
    let np = null;
    try { np = SB.Cities.get(slug); } catch (e) { t.fail(slug + ': get threw ' + e.message); }
    if (np) {
      t.ok(np.derived && np.derived.zoneById, slug + ': normalized pack has derived tables');
      t.eq(H.jsonIssues(np), [], slug + ': normalized pack is JSON-safe');
      ['scene', 'money', 'night', 'tilt', 'zones', 'hoods', 'routes', 'rooms', 'weather', 'calendar', 'rules', 'style', 'words'].forEach(k => t.ok(np[k] !== undefined, slug + ': normalized pack has ' + k));
      t.eq(np.scene.gens.reduce((a, b) => a + b, 0).toFixed(2), '1.00', slug + ': generation shares sum to 1');
      np.scene.genreShares.forEach((row, i) => t.near(row.reduce((a, b) => a + b, 0), 1, .02, slug + ': genre shares of generation ' + i + ' sum to 1'));
      np.night.forEach(row => t.ok(row.length === 7, slug + ': night rows have seven days'));
      t.eq(np.rooms.filter(r => r.start).length, 1, slug + ': exactly one start room');
    }
  });

  /* ---- Pensacola in particular ---- */
  (function () {
    const rp = H.rawPack('pensacola'); if (!rp) return;
    const p = rp.pack;
    t.eq(SB.Cities.validate(clone(p), general).filter(x => x.indexOf('warning:') !== 0), [], 'pensacola validates as written');
    const peers = (p.zones || []).filter(z => z.kind === 'PEER');
    t.ok(peers.length >= 1, 'pensacola has a peer zone');
    t.eq(peers.filter(z => z.rooms && z.rooms.length).map(z => z.id), [], 'no PEER zone carries rooms');
    const peerIds = peers.map(z => z.id);
    t.eq((p.rooms || []).filter(r => peerIds.indexOf(r.zone) >= 0).map(r => r.id), [], 'no room is on a PEER zone');
    t.eq((p.hoods || []).filter(h => peerIds.some(id => h.route === 'town:' + id)).map(h => h.id), [], 'no hood is on a PEER zone');
    const townHoods = (p.hoods || []).filter(h => /^town:/.test(h.route));
    t.ok(townHoods.length >= 1, 'pensacola has hoods that use town: routes');
    const np = SB.Cities.get('pensacola'), cuts = np.derived.cuts || {};
    const expect = {};
    (p.zones || []).forEach(z => { if (z.beyond) (expect[z.beyond] = expect[z.beyond] || []).push(z.id); });
    Object.keys(expect).forEach(k => t.eq((cuts[k] || []).slice().sort(), expect[k].slice().sort(), 'derived.cuts[' + k + '] equals the zones whose beyond names it'));
    t.eq(Object.keys(cuts).filter(k => !expect[k]), [], 'derived.cuts has no chokepoint nothing is beyond');
    (p.chokepoints || []).forEach(c => t.ok(c.cuts === undefined, 'chokepoint ' + c.id + ' carries no cuts list'));
    const pSum = (p.chokepoints || []).reduce((s, c) => s + c.p, 0);
    t.ok(pSum >= 0 && pSum <= .05, 'chokepoint chances sum to 0..0.05 (' + pSum + ')');
    t.ok(np.scene.size === 2400 && np.scene.stack === .6, 'pensacola scene is 2,400 with stack .60');
    t.eq(np.money.comfort, [7, 10, 12], 'pensacola comfort prices $7 / $10 / $12');
    t.eq((p.rooms || []).length, 11, 'pensacola lists its eleven rooms');
    // a lodge hall for the golden show
    const lodge = (p.rooms || []).filter(r => r.id === 'lodge')[0];
    t.ok(lodge && lodge.cap === 160 && lodge.rent === 225 && lodge.pa === .8, 'the lodge hall is cap 160, $225, PA .8 (mechanics 1.13)');
  })();

  /* ---- the smallest legal pack ---- */
  (function () {
    const S2 = H.fresh({ packs: [] });
    S2.Cities.generalBanned = general;
    const problems = S2.Cities.validate(clone(MINIMAL), general);
    t.eq(problems.filter(x => x.indexOf('warning:') !== 0), [], 'the minimal pack of 04-cities 6.4 validates as written');
    S2.Cities.register('fort-wayne-in', clone(MINIMAL));
    const np = S2.Cities.get('fort-wayne-in');
    t.eq(np.derived.calendarFrom, 'PRESET', 'a pack with no calendar gets one from the presets');
    t.ok(Array.isArray(np.calendar) && np.calendar.length >= 3, 'the preset calendar has entries (' + np.calendar.length + ')');
    t.ok(np.calendar.every(c => c.month >= 1 && c.month <= 12 && !('day' in c) && !('date' in c)), 'calendar entries are rules (month, week, weekdays), never dates');
    t.ok(np.calendar.some(c => /football|friday/i.test(c.label || c.id || '')) || np.calendar.some(c => c.tag === 'game'), 'the midwest preset has football Fridays');
    t.ok(np.rooms.length >= 5, 'rooms are generated for a pack that lists none (' + np.rooms.length + ')');
    t.ok(np.rooms.filter(r => r.kind === 'HOUSE').every(r => r.outdoor === false), 'basement houses are indoors');
    const q = S2.Cities.questions('fort-wayne-in');
    t.eq(q.map(x => x.key), ['nights', 'lean', 'allAges', 'barOnly', 'town', 'mainRoom', 'football'], 'a pack with UNVERIFIED scene offers the seven questions, in order');
    const entry = S2.Cities.entry('fort-wayne-in');
    const plain = S2.Cities.normalize(clone(MINIMAL), entry, null), none = S2.Cities.normalize(clone(MINIMAL), entry, {});
    t.eq(plain, none, 'with no answer set the pack equals the untuned pack');
    let tuned = null;
    try { tuned = S2.Cities.normalize(clone(MINIMAL), entry, clone(TUNE_ALL)); } catch (e) { t.fail('normalize with every answer threw: ' + e.message); }
    if (tuned) {
      t.eq(H.jsonIssues(tuned), [], 'the tuned pack is JSON-safe');
      t.eq(tuned.derived.tuned, true, 'derived.tuned is true when answers were applied');
      t.ok(JSON.stringify(tuned.night) !== JSON.stringify(plain.night), '"Thursdays too" changes the night table');
    }
    // the same questions on a verified pack: none
    if (present.indexOf('pensacola') >= 0) t.eq(SB.Cities.questions('pensacola'), [], 'a pack with a verified scene offers no questions');

    // start a game in it and play 20 weeks (the engine must be real for this to mean anything)
    if (H.needs(t, ['Game', 'Week', 'Shows', 'Jobs', 'Mail', 'WorldGen', 'Director'], 'a game in the minimal pack')) {
      const run = require('../bots/run.js').runGame({ sb: S2, seed: 'minimal-1', bot: 'checklist', weeks: 20, city: 'fort-wayne-in' });
      t.ok(run.ok, 'a game in the minimal pack plays 20 weeks' + (run.error ? ': ' + run.error.message : ''));
      const tuned2 = H.fresh({ packs: [] }); tuned2.Cities.register('fort-wayne-in', clone(MINIMAL));
      const run2 = require('../bots/run.js').runGame({ sb: tuned2, seed: 'minimal-2', bot: 'checklist', weeks: 20, city: 'fort-wayne-in', tune: clone(TUNE_ALL) });
      t.ok(run2.ok, 'the same pack with every answer set plays 20 weeks' + (run2.error ? ': ' + run2.error.message : ''));
    }
  })();

  /* ---- a large synthetic pack validates and normalizes ---- */
  (function () {
    const big = require('../fixtures/large-city.js');
    if (big.realPackExists()) return;
    const S3 = H.fresh({ packs: [] });
    t.eq(S3.Cities.validate(clone(big.pack), general).filter(x => x.indexOf('warning:') !== 0), [], 'the synthetic large-city pack validates');
    big.ensure(S3);
    const np = S3.Cities.get('philadelphia');
    t.eq([np.scene.size, np.scene.stack, np.scene.roomTau, np.scene.wordStart], [32000, .85, 1.3, 78], 'the synthetic pack carries the Philadelphia column of mechanics 12.6');
  })();

  /* ---- banned terms in packs and in content ---- */
  (function () {
    const all = [];
    present.forEach(s => { const rp = H.rawPack(s); if (rp) (rp.pack.banned || []).forEach(x => all.push(String(x).toLowerCase())); });
    const comp = H.compile(Array.from(new Set(general.concat(all))));
    const hits = [];
    present.forEach(s => {
      const rp = H.rawPack(s); if (!rp) return;
      const own = H.compile(Array.from(new Set(general.concat((rp.pack.banned || []).map(x => String(x).toLowerCase())))));
      H.eachString(rp.pack, (p, v) => {
        if (/^words\.(street|water|hood)/.test(p) || /^zones\[\d+\]\.name$/.test(p) || /^hoods\[\d+\]\.name$/.test(p)) return;     // place words are allowed
        const h = H.bannedHits(v, own);
        if (h.length) hits.push(s + ' ' + p + ' [' + h.join(',') + ']');
      }, (k) => k === 'banned' || k === 'blocklist');
    });
    t.eq(hits.slice(0, 8), [], 'no pack string outside banned and blocklist holds a banned term (' + hits.length + ' hits)');
    const chits = [];
    H.eachString(SB.Content, (p, v) => { const h = H.bannedHits(v, comp); if (h.length) chits.push(p + ' [' + h.join(',') + ']'); }, (k, p) => /names\.blocklist|bandNames\.blockFamous/.test(p));   // block lists hold the real names on purpose
    t.eq(chits.slice(0, 8), [], 'no content string holds a term of the merged banned list (' + chits.length + ' hits)');
  })();
};
