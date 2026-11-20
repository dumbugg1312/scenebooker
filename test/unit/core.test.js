'use strict';
// core.test — the core file sb.js (06-harness section 3): rng, time, geo, text, the name rule, the UI registry.
// Loads the core only (stubs on, so SB.Config and SB.Enums exist; no engine is exercised).
const load = require('../load.js');

module.exports = function (t) {
  const SB = load({ stubs: true, packs: [] });

  /* ---------------- SB.rng ---------------- */
  (function () {
    const a = SB.rng.make('seed-one'), b = SB.rng.make('seed-one'), c = SB.rng.make('seed-two');
    const sa = [], sb = [], sc = [];
    for (let i = 0; i < 50; i++) { sa.push(a.next()); sb.push(b.next()); sc.push(c.next()); }
    t.eq(sa, sb, 'same seed, same sequence');
    t.ok(JSON.stringify(sa) !== JSON.stringify(sc), 'a different seed gives a different sequence');
    t.ok(sa.every(x => x >= 0 && x < 1), 'next() is in [0, 1)');

    const r = SB.rng.make('ranges');
    let okInt = true, okRange = true;
    for (let i = 0; i < 2000; i++) {
      const n = r.int(3, 7); if (n < 3 || n > 7 || n !== Math.floor(n)) okInt = false;
      const x = r.range(-2, 5); if (x < -2 || x >= 5) okRange = false;
    }
    t.ok(okInt, 'int(3, 7) stays in 3..7 and is whole');
    t.ok(okRange, 'range(-2, 5) stays in [-2, 5)');
    const seen = {}; for (let i = 0; i < 400; i++) seen[r.int(1, 3)] = true;
    t.eq(Object.keys(seen).sort(), ['1', '2', '3'], 'int(1, 3) reaches both ends');

    t.eq(SB.rng.make('e').pick([]), undefined, 'pick of an empty list is undefined');
    t.eq(SB.rng.make('e').weighted(['a', 'b'], [0, 0]), null, 'weighted with all zero weights is null');
    const w = SB.rng.make('weights'); let heavy = 0;
    for (let i = 0; i < 2000; i++) if (w.weighted(['x', 'y'], [9, 1]) === 'x') heavy++;
    t.near(heavy / 2000, 0.9, 0.04, 'weighted follows the weights');
    const list = [1, 2, 3, 4, 5, 6, 7, 8], sh = SB.rng.make('sh').shuffle(list);
    t.eq(sh.slice().sort((x, y) => x - y), list, 'shuffle keeps every element');
    t.eq(list, [1, 2, 3, 4, 5, 6, 7, 8], 'shuffle returns a copy');
    const nrm = SB.rng.make('normal'); let sum = 0, sq = 0; const N = 4000;
    for (let i = 0; i < N; i++) { const x = nrm.normal(10, 2); sum += x; sq += (x - 10) * (x - 10); }
    t.near(sum / N, 10, 0.2, 'normal mean');
    t.near(Math.sqrt(sq / N), 2, 0.2, 'normal sd');

    // A stream continues identically after a save is written and read back.
    const state = { seed: 'save-seed', rng: SB.rng.init() };
    const s1 = SB.rng.stream(state, 'bands');
    for (let i = 0; i < 7; i++) s1.next();
    const copy = JSON.parse(JSON.stringify(state));
    const x1 = [], x2 = [];
    for (let i = 0; i < 25; i++) { x1.push(SB.rng.stream(state, 'bands').next()); x2.push(SB.rng.stream(copy, 'bands').next()); }
    t.eq(x1, x2, 'a stream continues identically after JSON.parse(JSON.stringify(state))');
    // Streams are separate: drawing on one does not move another.
    const sA = { seed: 'iso', rng: SB.rng.init() }, sB = { seed: 'iso', rng: SB.rng.init() };
    SB.rng.stream(sA, 'rooms').next(); SB.rng.stream(sA, 'rooms').next();
    t.eq(SB.rng.stream(sA, 'bands').next(), SB.rng.stream(sB, 'bands').next(), 'drawing on one stream does not move another');
    t.throws(() => SB.rng.stream({}, 'x'), 'no rng', 'a state with no rng is a contract break');
    t.ok(SB.rng.hash('abc') === SB.rng.hash('abc') && SB.rng.hash('abc') !== SB.rng.hash('abd'), 'hash is stable and spreads');
  })();

  /* ---------------- SB.util ---------------- */
  (function () {
    t.eq(SB.util.clamp(5, 0, 3), 3, 'clamp high'); t.eq(SB.util.clamp(-1, 0, 3), 0, 'clamp low'); t.eq(SB.util.clamp(2, 0, 3), 2, 'clamp inside');
    t.eq(SB.util.curve([[0, 0], [10, 100]], 5), 50, 'curve interpolates');
    t.eq(SB.util.curve([[0, 0], [10, 100]], 99), 100, 'curve is flat beyond the end');
    t.eq(SB.util.curve([[0, 0], [10, 100]], -4), 0, 'curve is flat before the start');
    const st = {}; t.eq(SB.util.newId(st, 'b'), 'b1', 'first id'); t.eq(SB.util.newId(st, 'b'), 'b2', 'second id'); t.eq(SB.util.newId(st, 'p'), 'p1', 'ids count per prefix');
    t.eq(SB.util.no('PHASE', 'x'), { ok: false, code: 'PHASE', why: 'x' }, 'no()'); t.eq(SB.util.yes({ a: 1 }), { ok: true, a: 1 }, 'yes()');
    const deep = { a: [1, { b: 2 }] }, cp = SB.util.copy(deep); cp.a[1].b = 9;
    t.eq(deep.a[1].b, 2, 'copy is deep');
    t.throws(() => SB.fail('X.y', 'broken'), '[X.y] broken', 'SB.fail throws');
    let e = null; try { SB.fail('W', 'm'); } catch (x) { e = x; }
    t.ok(e instanceof SB.SBError && e instanceof Error && e.name === 'SBError', 'SB.fail throws an SBError');
    t.throws(() => SB.assert(false, 'W', 'nope'), 'nope', 'assert(false) throws');
    t.ok((SB.assert(true, 'W', 'x'), true), 'assert(true) does not throw');
  })();

  /* ---------------- SB.time ---------------- */
  (function () {
    const d = SB.time.date(31);
    t.eq([d.y, d.m, d.d, d.dow, d.doy], [2027, 2, 18, 3, 49], 'day 31 is Thursday 18 February 2027, doy 49');
    t.eq(SB.time.fmt(31, 'dow'), 'Thursday', 'fmt dow');
    t.eq(SB.time.fmt(31, 'long'), 'Thursday, February 18', 'fmt long');
    t.eq(SB.time.fmt(31, 'short'), 'Thu Feb 18', 'fmt short');
    t.eq(SB.time.fmt(31, 'the'), 'the 18th', 'fmt the');
    t.eq(SB.time.fmt(0, 'dow'), 'Monday', 'day 0 is a Monday');
    t.eq([SB.time.date(0).m, SB.time.date(0).d, SB.time.date(0).y], [1, 18, 2027], 'day 0 is 18 January 2027');
    t.eq(SB.time.date(-1).dow, 6, 'the day before day 0 is a Sunday');
    let ok = true;
    for (let day = -30; day < 900; day++) {
      const x = SB.time.date(day);
      if (SB.time.dayOf(x.y, x.m, x.d) !== day || x.week !== Math.floor(day / 7) || x.dow !== SB.time.dow(day)) { ok = false; t.fail('round trip failed at day ' + day); break; }
    }
    t.ok(ok, 'date and dayOf round trip over 900 days');
    t.eq(SB.time.dayOf(2027, 2, 18), 31, 'dayOf 18 February 2027');
    t.eq(SB.time.dayOf(2028, 3, 1) - SB.time.dayOf(2028, 2, 28), 2, '2028 is a leap year');
    t.eq(SB.time.week(13), 1, 'week of day 13'); t.eq(SB.time.weekStart(4), 28, 'weekStart');
    t.eq(SB.time.gameYear(0), 1, 'game year 1 starts at day 0'); t.eq(SB.time.gameYear(363), 1, 'game year 1 ends at day 363'); t.eq(SB.time.gameYear(364), 2, 'game year 2');
    t.eq(SB.time.clock(1200), '8', 'clock 8'); t.eq(SB.time.clock(1245), '8:45', 'clock 8:45'); t.eq(SB.time.clock(1410), '11:30', 'clock 11:30'); t.eq(SB.time.clock(60), '1', 'clock 1 a.m.'); t.eq(SB.time.clock(0), '12', 'clock midnight');
    // Bills fall due at the close-out of the last week of a month: the week after it ends in a new month.
    let due = 0; for (let w = 0; w < 52; w++) if (SB.time.billsDue(w)) due++;
    t.ok(due >= 11 && due <= 13, 'bills fall due about once a month (got ' + due + ' in 52 weeks)');
  })();

  /* ---------------- SB.geo ---------------- */
  (function () {
    const pensacola = { lat: 30.4213, lon: -87.2169 }, mobile = { lat: 30.6954, lon: -88.0399 };
    const min = SB.geo.drive(pensacola, mobile);
    t.ok(min >= 65 && min <= 75, 'Pensacola to Mobile is 65 to 75 minutes (got ' + min + ')');
    t.eq(SB.geo.drive(pensacola, pensacola), 0, 'zero drive to the same place');
    t.eq(SB.geo.drive(pensacola, mobile), SB.geo.drive(mobile, pensacola), 'drive is symmetric');
    const mi = SB.geo.miles(pensacola.lat, pensacola.lon, mobile.lat, mobile.lon);
    t.ok(mi > 50 && mi < 62, 'straight-line miles Pensacola to Mobile is in the 50s (got ' + mi.toFixed(1) + ')');
    const b = SB.geo.bearing(pensacola, mobile);
    t.ok(b > 270 && b < 300, 'Mobile is west of Pensacola (bearing ' + b.toFixed(0) + ')');
    const p = SB.geo.project(30.4, -87.2), a = SB.geo.project(61.2, -149.9), h = SB.geo.project(21.3, -157.9);
    t.ok(p.inset === false && p.x >= 0 && p.x <= SB.geo.BOX.w && p.y >= 0 && p.y <= SB.geo.BOX.h, 'project puts the lower 48 inside the box');
    t.ok(a.inset === true && h.inset === true, 'Alaska and Hawaii go to the inset');
    t.ok(a.x >= 0 && a.x <= SB.geo.BOX.w && a.y >= 0 && a.y <= SB.geo.BOX.h && h.x >= 0 && h.x <= SB.geo.BOX.w && h.y >= 0 && h.y <= SB.geo.BOX.h, 'the inset is inside the box');
  })();

  /* ---------------- SB.text ---------------- */
  (function () {
    const R = (tpl, ctx, rng) => SB.text.render(tpl, ctx, rng);
    t.eq(R('{a} and {b|none}', { a: 'x' }), 'x and none', 'slot and fallback');
    t.eq(R('{room.name} here', { room: { name: 'The Carport' } }), 'The Carport here', 'dotted slot');
    t.eq(R('Hi {x}.', {}), 'Hi.', 'an empty slot renders as nothing, and the gap before the full stop closes');
    t.eq(R('{n:money}', { n: 1240 }), '$1,240', 'money filter');
    t.eq(R('{n:money}', { n: -50 }), '−$50', 'money filter, negative');
    t.eq(R('{n:ord}', { n: 4 }), '4th', 'ord 4'); t.eq(R('{n:ord}', { n: 11 }), '11th', 'ord 11'); t.eq(R('{n:ord}', { n: 22 }), '22nd', 'ord 22'); t.eq(R('{n:ord}', { n: 103 }), '103rd', 'ord 103');
    t.eq(R('{n:ord}', { n: 'Thursday' }), 'Thursday', '{n:ord} with n = "Thursday" renders Thursday');
    t.eq(R('{n:money}', { n: 'ask' }), 'ask', 'money leaves a non-number as it was');
    t.eq(R('{n:num}', { n: 1240 }), '1,240', 'num filter');
    t.eq(R('{n:words}', { n: 12 }), 'twelve', 'words 12'); t.eq(R('{n:words:cap}', { n: 12 }), 'Twelve', 'words then cap'); t.eq(R('{n:words}', { n: 21 }), '21', 'words above twenty are digits'); t.eq(R('{n:words}', { n: 0 }), 'no', 'words 0');
    t.eq(R('{n:words|a few}', {}), 'a few', 'filter with a fallback');
    t.eq(R('{w:a}', { w: 'oyster' }), 'an oyster', 'a before a vowel'); t.eq(R('{w:a}', { w: 'band' }), 'a band', 'a before a consonant');
    t.eq(R('{w:poss}', { w: 'Wes' }), 'Wes\'s', 'poss'); t.eq(R('{w:upper} {w:lower} {w:cap}', { w: 'wes' }), 'WES wes Wes', 'upper, lower, cap');
    t.eq(R('{list}', { list: ['a', 'b'] }), 'a, b', 'an array slot joins');
    t.throws(() => R('{n:nosuchfilter}', { n: 1 }), 'unknown filter', 'an unknown filter is an error');
    t.throws(() => R('{unclosed', {}), 'unclosed', 'an unclosed brace is an error');

    // picks
    t.eq(R('[a | b | c]', {}), 'a', 'a pick with no rng takes the first option');
    const seen = {}, rng = SB.rng.make('picks');
    for (let i = 0; i < 300; i++) seen[R('[a | b | c]', {}, rng)] = true;
    t.eq(Object.keys(seen).sort(), ['a', 'b', 'c'], 'a pick with an rng reaches every option');
    const rngA = SB.rng.make('same'), rngB = SB.rng.make('same'); let same = true;
    for (let i = 0; i < 30; i++) if (R('[a | b | c | d]', {}, rngA) !== R('[a | b | c | d]', {}, rngB)) same = false;
    t.ok(same, 'a pick is deterministic under the same seed');
    let heavy = 0; const rw = SB.rng.make('weighted');
    for (let i = 0; i < 1000; i++) if (R('[a^9 | b]', {}, rw) === 'a') heavy++;
    t.near(heavy / 1000, 0.9, 0.05, 'a weighted pick follows ^');
    t.eq(R('[?MASS: Hello Promoter! | Hi {you|there},]', { MASS: true }), 'Hello Promoter!', 'guarded option passes');
    t.eq(R('[?MASS: Hello Promoter! | Hi {you|there},]', { MASS: false }), 'Hi there,', 'unguarded option is the fallback');
    t.eq(R('[?!MASS: quiet | loud]', { MASS: false }), 'quiet', 'negated guard');
    t.eq(R('[?A: one | ?B: two]', {}), '', 'a pick with nothing eligible renders nothing');
    t.eq(R('x [a [b | c] | d] y', {}), 'x a b y', 'picks nest');

    // optional blocks
    t.eq(R('Door\'s fine. (?lodging: A floor would help.)', { lodging: true }), 'Door\'s fine. A floor would help.', '(?flag: ...) shows when truthy');
    t.eq(R('Door\'s fine. (?lodging: A floor would help.)', {}), 'Door\'s fine.', '(?flag: ...) hides when not');
    t.eq(R('A(?!x: B)', {}), 'AB', '(?!flag: ...) shows when falsy');
    t.eq(R('A(?!x: B)', { x: 1 }), 'A', '(?!flag: ...) hides when truthy');
    t.eq(R('(?x: Jim (the drummer) came) end', { x: true }), 'Jim (the drummer) came end', 'paired plain parentheses inside an optional block are literal');
    t.eq(R('(?x: Jim (the drummer) came) end', {}), 'end', 'and the block is gone without its flag');
    t.eq(R('Plain (aside) text', {}), 'Plain (aside) text', 'plain parentheses are literal');
    t.eq(R('(%40: maybe)', {}), '', 'a chance block with no rng uses 0.5 as its cut (40 percent: off)');
    t.eq(R('(%60: maybe)', {}), 'maybe', 'a chance block with no rng (60 percent: on)');
    let hit = 0; const rc = SB.rng.make('chance');
    for (let i = 0; i < 3000; i++) if (R('(%40: x)', {}, rc)) hit++;
    t.near(hit / 3000, 0.4, 0.04, 'a chance block fires about 40 percent of the time');

    // escapes and tidying
    t.eq(R('\\[link\\] \\{x\\} \\(y\\) a\\|b \\\\', {}), '[link] {x} (y) a|b \\', 'escapes');
    t.eq(R('a  b ,c .', {}), 'a b,c.', 'doubled spaces and spaces before punctuation go');
    t.eq(R('a\n\n\n\nb', {}), 'a\n\nb', 'three or more line breaks become two');
    t.eq(R('line one\nline two', {}), 'line one\nline two', 'single line breaks are kept');

    // lint
    t.eq(SB.text.lint('{a} [b | c] (?x: d)'), null, 'lint of a fine template is null');
    t.ok(typeof SB.text.lint('{a') === 'string', 'lint of a broken template is its message');
    t.ok(typeof SB.text.lint('[a | b') === 'string', 'lint of an unclosed pick');

    // line, has, label — against fixture content (a private branch of SB.Content)
    SB.Content.zz = {
      plain: 'Hello {who|there}',
      list: ['one', { t: 'two' }],
      guardedOn: { t: 'shown', if: 'flag' },
      guardedNot: { t: 'hidden', not: 'flag' },
      inList: [{ t: 'a', if: 'flag' }, { t: 'b', not: 'flag' }],
      emptyList: [], emptyString: '', group: { sub: 'text' }, onlyEmptyT: { t: '' }, listWithEmpty: ['', { t: 'y' }]
    };
    SB.Content.ui.zzscreen = { play: 'Play the week' };
    SB.log.entries.length = 0;
    t.eq(SB.text.line('zz.plain', { who: 'Jo' }), 'Hello Jo', 'line renders the node at a path');
    t.eq(SB.text.line('zz.guardedOn', { flag: true }), 'shown', 'a single { t, if } node renders with its flag on');
    SB.log.entries.length = 0;
    t.eq(SB.text.line('zz.guardedOn', { flag: false }), '', 'a single { t, if } node renders nothing when its flag is off');
    t.ok(SB.log.entries.some(e => e.level === 'warn'), 'and a warning is logged');
    t.eq(SB.text.line('zz.guardedNot', { flag: true }), '', 'a single { t, not } node renders nothing when the flag is on');
    t.eq(SB.text.line('zz.inList', { flag: true }), 'a', 'in a list, if passes');
    t.eq(SB.text.line('zz.inList', {}), 'b', 'in a list, not passes');
    t.eq(SB.text.line('zz.nothing.here'), '', 'a missing path renders nothing');
    t.eq(SB.text.has('zz.plain'), true, 'has: a non-empty string');
    t.eq(SB.text.has('zz.list'), true, 'has: a list holding text');
    t.eq(SB.text.has('zz.guardedOn'), true, 'has: a { t } object');
    t.eq(SB.text.has('zz.listWithEmpty'), true, 'has: a list holding one usable node');
    t.eq(SB.text.has('zz.emptyList'), false, 'has is false for []');
    t.eq(SB.text.has('zz.emptyString'), false, "has is false for ''");
    t.eq(SB.text.has('zz.group'), false, 'has is false for a group object');
    t.eq(SB.text.has('zz.onlyEmptyT'), false, "has is false for { t: '' }");
    t.eq(SB.text.has('zz.nothing'), false, 'has is false for a missing path');
    t.eq(SB.text.label('ui.zzscreen.play'), 'Play the week', 'label reads SB.Content.ui.<screen>.<key>');
    t.eq(SB.text.label('no.such.label'), 'no.such.label', 'a missing label is its key');
    SB.text.off = true;
    t.eq(SB.text.line('zz.plain', { who: 'Jo' }), '', 'with text off, line returns nothing');
    SB.text.off = false;
  })();

  /* ---------------- the name rule ---------------- */
  (function () {
    // A private fixture: invented words only.
    const oldNames = SB.Content.names;
    SB.Content.names = { blocklist: ['half mast', 'hurricane party*', 'Cold Front'], rare: ['Kestrel', 'Mothwing'], cleared: ['Velcro Moat'] };
    t.eq(SB.text.blocked('Half Mast'), true, 'a plain term refuses exactly that name');
    t.eq(SB.text.blocked('The Half Mast'), true, 'a leading "the" does not matter');
    t.eq(SB.text.blocked('half-mast'), true, 'hyphens and case do not matter');
    t.eq(SB.text.blocked('Half Mast Till Sunday'), false, 'a plain term does not refuse a longer name');
    t.eq(SB.text.blocked('Hurricane Party'), true, 'a starred term refuses itself');
    t.eq(SB.text.blocked('Hurricane Party Favors'), true, 'a starred term refuses a longer name that contains it');
    t.eq(SB.text.blocked('Big Hurricane Party Night'), true, 'a starred term refuses it inside');
    t.eq(SB.text.blocked('Hurricane Parties'), false, 'a starred term matches whole words only');
    t.eq(SB.text.blocked(''), true, 'an empty name is blocked');
    SB.text.block(['Lantern Hall*']);
    t.eq(SB.text.blocked('Old Lantern Hall Sessions'), true, 'block() adds a starred term for the session');
    t.eq(SB.text.blocked('Lantern Halls'), false, 'block() terms match whole words only');

    t.eq(SB.text.nameOk('Mothwing'), false, 'a one-word name never passes, even a rare word');
    t.eq(SB.text.nameOk('The Brownsville'), false, 'a one-word name with "the" never passes');
    t.eq(SB.text.nameOk('Cold Front'), false, 'Cold Front is refused');
    t.eq(SB.text.nameOk('Low Water Mark'), true, 'Low Water Mark passes (three words)');
    t.eq(SB.text.nameOk('The Low Water Mark'), true, 'a leading "the" is not counted');
    t.eq(SB.text.nameOk('Wet Paint'), false, 'two common words are refused');
    t.eq(SB.text.nameOk('Brownsville Brats', ['Brownsville']), true, 'a two-word name with a local word passes');
    t.eq(SB.text.nameOk('Brownsville Brats'), false, 'and is refused without the local word');
    t.eq(SB.text.nameOk('Brownsville', ['Brownsville']), false, 'a name that is nothing but the local word is refused');
    t.eq(SB.text.nameOk('Kestrel Dust'), true, 'a two-word name with a rare word passes');
    t.eq(SB.text.nameOk('Velcro Moat'), true, 'a cleared two-word name passes as it stands');
    t.eq(SB.text.nameOk('Half Mast Till Sunday'), true, 'a three-word name that merely contains a plain blocked term passes');
    t.eq(SB.text.nameOk('Hurricane Party Favors Club'), false, 'a starred term still blocks a long name');
    SB.Content.names = oldNames;
    if (!oldNames) delete SB.Content.names;
  })();

  /* ---------------- SB.UI registry ---------------- */
  (function () {
    t.ok(SB.UI && typeof SB.UI.screen === 'function' && typeof SB.UI.part === 'function' && typeof SB.UI.extend === 'function', 'SB.UI exists with screen, part and extend');
    t.eq(typeof SB.UI.C, 'object', 'SB.UI.C exists');
    SB.UI.extend({ zzMember: 1 });
    t.eq(SB.UI.zzMember, 1, 'extend adds a member');
    t.throws(() => SB.UI.extend({ zzMember: 2 }), 'already defined', 'SB.UI.extend refuses a second definition');
    t.throws(() => SB.UI.extend({ screen: function () {} }), 'already defined', 'SB.UI.extend refuses to replace a built-in');
    SB.UI.screen('zzscreen', { mount: function () {} });
    t.throws(() => SB.UI.screen('zzscreen', { mount: function () {} }), 'twice', 'a screen registered twice throws');
    t.throws(() => SB.UI.screen('zzother', {}), 'no mount', 'a screen with no mount throws');
    SB.UI.part('zzpart', function () {});
    t.throws(() => SB.UI.part('zzpart', function () {}), 'twice', 'a part registered twice throws');
    t.throws(() => SB.UI.part('zzp2', 5), 'not a function', 'a part must be a function');
  })();

  /* ---------------- SB.module and SB.verify ---------------- */
  (function () {
    t.throws(() => SB.module('Game', function () { return {}; }), 'defined twice', 'a stubbed module cannot be defined twice');
    t.throws(() => SB.module('ZzNew', 5), 'not a function', 'a factory must be a function');
    t.throws(() => SB.module('ZzNew', function () { return null; }), 'returned nothing', 'a factory must return an object');
    SB.module('ZzNew', function () { return { f: function () {} }; });
    t.eq(typeof SB.ZzNew.f, 'function', 'SB.module assigns SB.<Name>');
    t.eq(SB.need('ZzNew'), SB.ZzNew, 'need returns the module');
    t.throws(() => SB.need('ZzMissing'), 'not loaded', 'need of a missing module throws');
    t.eq(SB.verify(['engine']), [], 'verify(engine) is empty with the stubs loaded');
    t.ok(SB.verify(['nonsense']).length === 1, 'verify names an unknown group');
    SB.API.zzgroup = { ZzNew: ['f', 'g'] };
    t.eq(SB.verify(['zzgroup']), ['ZzNew.g'], 'verify names a missing function');
    delete SB.API.zzgroup;
  })();
};
