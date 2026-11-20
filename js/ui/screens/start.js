/* Scene Booker — ui/screens/start.js (UI-A2)
 * The way in, drawn as the same photocopied paste-up as the desk (design/spec/07-desk.md 2 and 2b):
 *   start  a black wall getting flyered (real flyers from SB.Flyer.sample, slapped up one after another), the title
 *          sheet over them, one sheet that says your show goes here, saved games as a short stack of tapes, import.
 *   city   a photocopied road map (every researched town a dot, Pensacola marked), a rack of typed index cards you
 *          type to filter, and the town's postcard, which lands when a town is circled three times in marker.
 *   tune   "your town": typed questions with drawn boxes.
 *   name   the booking name typed onto the page while a real flyer reading "<name> presents" is drawn beside it,
 *          re-rolling its art every few letters; the marks are rubber stamps.
 *   setup  three typed lines with drawn boxes, then the last hit: staple the first flyer up (SB.Game.newGame, SB.UI.start).
 * Holds no game rule. The new career being put together lives in `draft` (interface memory) until newGame.
 * Motion (slaps, stamps, the copier's light bar, the marker circle) is CSS on classes set here; every timer belongs to
 * the mounted screen and stops when it unmounts; under reduced motion the wall is put up at once and nothing moves.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.start = {
    title: 'Scene Booker',
    sub: 'real town. borrowed PA. somebody\'s living room. book the show.',
    cont: 'Continue',
    contWeek: 'week {n}',
    tapeWeek: 'WK {n}',
    newScene: 'New scene',
    newLabel: 'New scene: pick a town and book your first show',
    wayTop: 'your name presents',
    wayA: 'YOUR',
    wayB: 'SHOW',
    wayC: 'GOES HERE',
    wayFoot: 'BOOK A SHOW',
    wayInfo: 'ALL AGES · $5 · TBA',
    settings: 'Settings',
    noSaves: 'No saved scenes yet.',
    tapes: 'Saved scenes',
    allTapes: 'All tapes ({n})',
    fewTapes: 'Fewer tapes',
    importK: 'Bring in a saved scene',
    importStrip: 'Bring in a save',
    importHelp: 'Paste the text of an exported save.',
    importGo: 'Open it',
    importBad: 'That save could not be opened. It may be from a newer version of the game.',
    loadBad: 'That save could not be opened.',
    packBad: 'That city could not be opened.',
    wall: 'Flyers from other towns',
  };
  SB.Content.ui.city = {
    title: 'Pick a town',
    search: 'Find a town',
    featured: 'featured',
    first: 'start here',
    thin: 'Researched lightly. The map is right; the scene is a guess.',
    hard: 'What is hard here',
    rooms: 'Rooms',
    feeders: 'Towns nearby',
    whereGo: 'Where people drive for the big shows',
    inks: 'Inks',
    pick: 'Book here',
    loading: 'Opening the town…',
    checking: 'Looking for this town\'s pages…',
    unwritten: 'This town couldn\'t be opened. Pick another for now.',
    unwrittenStamp: 'can\'t open',
    back: 'Back',
    none: 'No town by that name.',
    count: '{n} towns',
    size: { SMALL: 'small', MID: 'mid-sized', BIG: 'big', HUGE: 'huge' },
    map: 'Map of the researched towns',
    mapTitle: 'OFFICIAL ROAD MAP',
    mapSub: 'researched towns · not to scale'
  };
  SB.Content.ui.tune = {
    title: 'Your town',
    use: 'Use these',
    any: 'Not sure',
    back: 'Back'
  };
  SB.Content.ui.name = {
    title: 'What do you call yourself?',
    field: 'Booking name',
    help: 'This goes on every flyer.',
    ideas: 'Or take one of these',
    marks: 'Your mark',
    markHelp: 'A little stamp printed on your flyers. It is only for looks, so pick any.',
    reroll: 'Roll new marks',
    markBlank: 'Your Name',
    next: 'Next',
    back: 'Back',
    empty: 'Give it a name first.',
    blocked: 'That name is somebody else\'s. Pick another.',
    preview: 'Your first flyer'
  };
  SB.Content.ui.setup = {
    title: 'Before you start',
    bills: 'Personal bills',
    billsOn: 'On: besides the show money in the cash box, you pay your own rent, work a day job and keep a bank account. Harder, more like life.',
    billsOff: 'Off: you only handle the show money in the cash box. No rent, no day job. Easier.',
    billsLater: 'You can still change this in Settings until your first week starts.',
    fog: 'How much you can see',
    fogWhat: 'The game guesses things like how many people will come to a show, and shows them as ranges (say, 20 to 40). This sets how fast those ranges get narrow.',
    fogHelp: { OPEN: 'Open book: you start out knowing more and learn twice as fast. Easiest.', NORMAL: 'Normal: ranges start wide and get narrow as you book shows here.',
               HARD: 'Hard: like normal, but a band\'s draw never gets better than a rough guess.' },
    windows: 'Deadlines',
    windowsWhat: 'Jobs like putting up flyers have a window of days when they do the most good. This sets how strict those windows are.',
    windowsHelp: { FORGIVING: 'Forgiving: jobs stay open a little longer. Easier while you learn.', NORMAL: 'Normal: jobs close when they would in real life.' },
    later: 'You can change these two any time in Settings.',
    picked: 'picked',
    stapleHelp: 'This starts the game.',
    start: 'Start booking',
    staple: 'Staple it up',
    stapleLabel: 'Staple the first flyer up and start booking',
    back: 'Back',
    bad: 'The game could not start.'
  };

  /* the first time through: a note on each screen of the way in says what it is for, what each thing on it means and
   * what to press, and the tutorial's tape (SB.UI.story.point) points at that thing. Shown until a career has begun. */
  SB.Content.ui.guide = {
    k: 'How to start',
    step: 'Step {n} of {of}',
    label: 'How to start, step {n} of {of}',
    start: ['New here? Press YOUR SHOW GOES HERE to start.',
            'You will pick a town, give yourself a booking name and check three settings. Then your first show walks you through everything, one step at a time.'],
    startTapes: 'The cassette tapes are saved games. Press one to pick up where you left off.',
    city: ['Pick the town you will book shows in.',
           'Click a dot on the map or a card in the list. The postcard tells you about that town: how big it is, what is hard about booking there, and what kinds of rooms it has.',
           'First time? Pensacola, marked START HERE, is the best place to learn. When you have picked, press BOOK HERE.'],
    tune: ['Tell the game about this town, if you know it.',
           'The map is real but the scene is a guess. If you know the town, tick what is true and press USE THESE. If you do not, press SKIP THIS. Anything left blank keeps the game\'s own guess.'],
    name: ['Give yourself a booking name.',
           'It is the name you book shows under, and it goes on top of every flyer you make: "your name presents". Type one in or tap one of the ideas. The flyer shows how it will look.',
           'Your mark is the little stamp on your flyers. It is only for looks. Then press NEXT.'],
    setup: ['Last step: how hard you want it.',
            'These three settings change how hard the game is. Each one is explained under it. Not sure? Leave them as they are.',
            'Then press STAPLE IT UP to start. Your first show is a walkthrough: the person handing you the scene texts you each step, and a strip of tape like this one points at what to press.',
            'Played before? I\'VE DONE THIS BEFORE starts the same game without the walkthrough.']
  };

  var draft = { slug: null, tune: null, bookingName: '', mark: null, markSeeds: null, flyerBase: null, settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' } };
  var TONER = '#141413', PAPER = '#f4f2ea', BONE = '#e7ddc4';

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function K() { return SB.DeskKit; }
  function D() { return SB.UI.cuDraw; }
  function Kt() { return SB.UI.Kit; }      // the shared collage parts (js/ui/kit.js, css/kit.css)
  function L(route, key, ctx) { return SB.text.label('ui.' + route + '.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return has(key) ? SB.text.label(key) : (fb === undefined ? '' : fb); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function entry(slug) { try { return SB.Cities.entry(slug); } catch (e) { return null; } }
  function errLine(text) { return h('p', { class: 'st-err', role: 'alert', text: text }); }
  function f(n) { return Math.round(n * 10) / 10; }
  function byFk(root, fk) { return root && root.querySelector ? root.querySelector('[data-fk="' + fk + '"]') : null; }

  /* ---- the first-time guide ---- */
  function guideOn() {
    var done = false, saves = [];
    try { done = !!SB.UI.prefs.get('setupDone'); } catch (e) { done = false; }
    try { saves = SB.Save.list() || []; } catch (e) { saves = []; }
    return !done || !saves.length;
  }
  /* point the tutorial's tape at what to press next on this screen; null takes it away */
  function point(fn) { try { if (SB.UI.story && SB.UI.story.point) SB.UI.story.point(guideOn() ? fn : null); } catch (e) { /* no tape */ } }
  function hasTune(slug) { try { return !!(slug && SB.Cities.isLoaded(slug) && SB.Cities.questions(slug).length); } catch (e) { return false; } }
  /* which step of the way in this screen is, and how many there are (the town questions only come for some towns) */
  function stepOf(route, slug) {
    var list = ['city'].concat(hasTune(slug) ? ['tune'] : []).concat(['name', 'setup']), n = list.indexOf(route) + 1;
    return { n: n, of: list.length };
  }
  /* the note: typed on a strip of bone paper, the same as the walkthrough's texts on the desk */
  function guide(route, slug, extra) {
    var G = SB.Content.ui.guide, lines = (G[route] || []).slice(), st = route === 'start' ? null : stepOf(route, slug);
    if (!guideOn() || !lines.length) return null;
    if (extra) lines.push(extra);
    return h('aside', { class: 'st-guide', role: 'note', aria: { label: st ? SB.text.render(G.label, st, null) : G.k } }, [
      h('p', { class: 'st-guide-k' }, [
        h('span', { class: 'st-guide-tag', text: G.k.toUpperCase() }),
        st ? h('span', { class: 'st-guide-n', text: SB.text.render(G.step, st, null).toUpperCase() }) : null
      ]),
      lines.map(function (t, i) { return h('p', { class: 'st-guide-t' + (i === 0 ? ' is-lead' : ''), text: t }); })
    ]);
  }
  function reduced() { try { return SB.UI.prefs.reduced(); } catch (e) { return true; } }
  function drawn() { return !!(SB.DeskKit && SB.UI.cuDraw); }
  function svgOf(inner, w, ht, vb) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + (vb || ('0 0 ' + f(w) + ' ' + f(ht))) + '" width="' + f(w) + '" height="' + f(ht) + '" aria-hidden="true" focusable="false">' + inner + '</svg>';
  }
  /* a drawn piece through the copier, or a plain span when the kit is missing */
  function art(inner, w, ht, cls) {
    if (!drawn()) return h('span', { class: 'cb-art ' + (cls || ''), aria: { hidden: 'true' } });
    return D().art(inner, w, ht, cls);
  }
  /* timers that belong to one mounted screen */
  function clock() {
    var ids = [];
    return {
      later: function (fn, ms) { var id = setTimeout(function () { var i = ids.indexOf(id); if (i >= 0) ids.splice(i, 1); fn(); }, ms); ids.push(id); return id; },
      stop: function () { ids.forEach(function (id) { clearTimeout(id); }); ids = []; }
    };
  }
  /* replay a CSS hit (slap, thump, land) on an element */
  function hit(el, cls) {
    if (!el || !el.classList || reduced()) return;
    el.classList.remove(cls);
    try { void el.offsetWidth; } catch (e) { /* fine */ }
    el.classList.add(cls);
  }
  /* run fn (which redraws inside box) and put the focus back on the control with the same data-fk */
  function keepFocus(fn) {
    var a = typeof document !== 'undefined' ? document.activeElement : null, fk = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
    fn();
    if (!fk || typeof document === 'undefined' || !document.querySelector) return;
    try { el = document.querySelector('[data-fk="' + fk + '"]'); if (el && el.focus) el.focus(); } catch (e) { /* fine */ }
  }
  function strip(text, label, fk, onClick, o) {
    o = o || {};
    if (!drawn()) return h('button', { type: 'button', class: 'st-plain', data: { fk: fk }, disabled: !!o.disabled, on: { click: onClick }, text: text });
    return D().act(text, label || text, fk, onClick, o);
  }

  /* a cream copy-paper slip button (kit) */
  function slipBtn(text, fk, onClick, o) {
    o = o || {};
    return Kt().button({ label: text, kind: o.kind || 'secondary', big: o.big, fk: fk, on: onClick });
  }

  /* a heading in marker capitals, squeezed to fit its piece (reading matter, not a control) */
  function head(text, size, maxW) {
    if (!drawn()) return h('span', { text: text });
    var t = String(text).toUpperCase(), w = Math.min(K().markerWidth(t, size) + 14, maxW);
    return art(K().marker(t, 5, size + 4, size, { seed: 'hd' + t, maxWidth: w - 14 }), w, size + 14, 'cb-word');
  }

  /** Open a loaded or imported state: load its pack, then start. */
  function openState(st, slot, fail) {
    try {
      SB.Cities.load(st.citySlug, function (err) {
        if (err) { fail(L('start', 'packBad')); return; }
        try { SB.UI.start(st, slot || null); } catch (e) { fail(L('start', 'loadBad')); }
      });
    } catch (e) { fail(L('start', 'packBad')); }
  }

  /* ---------------------------------------------------------------- */
  /* the wall: real flyers slapped up, crooked, one after another     */
  /* ---------------------------------------------------------------- */

  var WALL_CAP = 24;
  /* the first flyers go up along the bottom edge, full toner, so the frame fills */
  var BOTTOM = [{ x: 1.5, y: 74, w: 236, rot: -4 }, { x: 21, y: 76, w: 250, rot: 3 }, { x: 41, y: 66, w: 240, rot: -2.5 }, { x: 60, y: 70, w: 236, rot: 4 }, { x: 79, y: 63, w: 232, rot: -3 }];
  function wall(tm) {
    var pile = h('div', { class: 'st-pile', aria: { hidden: 'true' } }), day = today(), n = 0, still = reduced(), first = 15;
    function fastener(r, w, ht) {
      var out = '', k = r.next();
      if (k < 0.45) { out += K().tape(w * 0.5 + r.range(-20, 20), 4, r.int(54, 80), 20, { seed: 'wt' + n, rot: r.range(-12, 12) }); }
      else if (k < 0.75) { out += K().tape(10, 8, 56, 18, { seed: 'wa' + n, rot: -38 }) + K().tape(w - 10, ht - 6, 56, 18, { seed: 'wb' + n, rot: -38 }); }
      else { out += K().staple(18, 14, { rot: r.range(-20, 20) }) + K().staple(w - 18, 14, { rot: r.range(-20, 20) }); }
      return svgOf(out, w + 40, ht + 30, '-20 -15 ' + f(w + 40) + ' ' + f(ht + 30));
    }
    function one(burst) {
      var r, s, w, ht, el, cv, fx;
      n += 1;
      r = SB.rng.make('wall:' + day + ':' + n);
      try { s = SB.Flyer.sample(day + ':' + n); } catch (e) { return; }
      var slot = n <= BOTTOM.length ? BOTTOM[n - 1] : null;
      w = slot ? slot.w : r.int(190, 260); ht = Math.round(w * 1100 / 850);
      try { cv = SB.Flyer.thumb(s.recipe, s.spec, w); } catch (e) { cv = null; }
      if (!cv) return;
      el = h('div', { class: 'st-fly' + (still ? '' : ' is-slap'), style: {
        left: slot ? slot.x + '%' : f(r.range(-4, 90)) + '%', top: slot ? slot.y + '%' : f(r.range(58, 82)) + '%', width: w + 'px', height: ht + 'px',
        '--rot': slot ? slot.rot + 'deg' : f(r.range(-9, 9)) + 'deg', '--dim': '1' } }, [cv]);
      if (drawn()) { fx = h('span', { class: 'st-fly-fx', html: fastener(r, w, ht) }); el.appendChild(fx); }
      if (burst && !still) el.style.animationDelay = (700 + (n - 1) * 90) + 'ms';
      pile.appendChild(el);
      while (pile.childNodes.length > WALL_CAP) pile.removeChild(pile.childNodes[0]);
    }
    function loop() {
      if (typeof document !== 'undefined' && document.hidden) { tm.later(loop, 1500); return; }
      one(false);
      tm.later(loop, n < first ? 120 : 2600);
    }
    if (!SB.Flyer || typeof SB.Flyer.sample !== 'function') return pile;
    if (still) { for (var i = 0; i < 18; i++) one(true); }
    else { for (var j = 0; j < 5; j++) one(true); tm.later(loop, 1750); }
    return pile;
  }

  /* ---------------------------------------------------------------- */
  /* start                                                            */
  /* ---------------------------------------------------------------- */

  function titleArt() {
    var k = K(), W = 860, H = 352, out = '', two = '', bw;
    out += k.paper(14, 8, 610, 222, { seed: 'st-title', stock: 'white', rot: -2.4, burn: 0.8,
      inner: k.marker('SCENE', 48, 204, 150, { seed: 'st-scene', maxWidth: 530, weight: 1.15, vary: 0.1 }) + k.regmark(600, 36, 11) });
    bw = 600;
    two += k.paper(213, 183, bw + 14, 154, { seed: 'st-bar0', stock: 'bone', rot: 1.6, burn: 0.3, sop: 0.7, cut: 2 });
    two += k.paper(220, 190, bw, 140, { seed: 'st-bar', stock: TONER, rot: 1.6, burn: 0, shadow: false,
      inner: k.marker('BOOKER', 250, 302, 124, { seed: 'st-bkr3', fill: PAPER, maxWidth: bw - 64, weight: 1.15, vary: 0.1, tilt: 4 }) });
    out += k.tape(70, 26, 92, 26, { seed: 'st-t1', rot: -24 }) + k.tape(612, 40, 70, 22, { seed: 'st-t3', rot: 12 });
    two += k.tape(808, 206, 90, 26, { seed: 'st-t2', rot: 34 });
    /* the glass the copier's light bar is clipped to: the two sheets, their cut edges, no shadows */
    var glass = k.paper(14, 8, 610, 222, { seed: 'st-title', stock: '#fff', rot: -2.4, burn: 0, shadow: false }) +
                k.paper(213, 183, bw + 14, 154, { seed: 'st-bar0', stock: '#fff', rot: 1.6, burn: 0, shadow: false, cut: 2 });
    return { svg: out, svg2: two, w: W, h: H, glass: svgOf(glass, W, H) };
  }

  /* the copier's light bar, now and then, across the title only: clipped to the two sheets as if they lay on the glass */
  function glassBar(glass) {
    var url = 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(glass) + '")';
    return h('span', { class: 'st-sweep', aria: { hidden: 'true' }, style: { maskImage: url, webkitMaskImage: url } });
  }

  function wayArt() {
    var k = K(), d = D(), W = 300, H = 400, inner = '', out = '';
    inner += '<path d="M24 22H276V58H24Z" fill="' + TONER + '"/>' + k.type(L('start', 'wayTop').toUpperCase(), 150, 46, 15, { anchor: 'middle', fill: PAPER, bold: true });
    inner += d.swipe(26, 214, 248, 36);
    inner += k.marker(L('start', 'wayA'), 150, 122, 58, { seed: 'way1', anchor: 'middle', maxWidth: 240 });
    inner += k.marker(L('start', 'wayB'), 150, 188, 64, { seed: 'way2', anchor: 'middle', maxWidth: 250 });
    inner += k.marker(L('start', 'wayC'), 150, 232, 34, { seed: 'way3', anchor: 'middle', maxWidth: 240 });
    inner += k.rect(46, 250, 208, 74, { seed: 'waybox', sw: 3, wob: 1.2 }) + k.line(48, 252, 252, 322, { seed: 'wx1', sw: 2, over: 0 }) + k.line(252, 252, 48, 322, { seed: 'wx2', sw: 2, over: 0 });
    inner += k.type(L('start', 'wayInfo'), 150, 344, 13, { anchor: 'middle', bold: true });
    inner += '<path d="M24 356H276V384H24Z" fill="' + TONER + '"/>' + k.type(L('start', 'wayFoot') + ' →', 150, 376, 17, { anchor: 'middle', fill: PAPER, bold: true });
    out += k.paper(10, 10, W - 20, H - 20, { seed: 'st-way', stock: 'goldenrod', rot: 0, burn: 0.7, inner: inner });
    out += k.tape(W / 2, 14, 96, 26, { seed: 'st-wt', rot: -4 });
    return { svg: out, w: W, h: H };
  }

  var TAPE_STOCK = ['bone', 'blue', 'pink', 'mint', 'goldenrod', 'white'];
  function tapeArt(s, i) {
    var k = K(), W = 300, H = 178, out = '', name = String(s.bookingName || '').toUpperCase() || '?', town = String(s.cityName || s.city || '').toUpperCase(),
        stk = TAPE_STOCK[(SB.rng.make('tp:' + s.slot).int(0, TAPE_STOCK.length - 1) + i) % TAPE_STOCK.length], inner = '';
    out += k.cutout([[8, 8], [292, 8], [292, 170], [8, 170]], '', { seed: 'tp' + s.slot, edge: 5, fill: '#1d1d1b' });
    inner += k.type('A', 26, 46, 16, { bold: true }) + k.type('C-60', 252, 46, 12, { bold: true });
    inner += k.marker(name, 150, 72, 26, { seed: 'tpn' + s.slot, anchor: 'middle', maxWidth: 220 });
    inner += '<path d="M64 84H236V118H64Z" fill="' + TONER + '"/>';
    inner += '<circle cx="98" cy="101" r="13" fill="' + PAPER + '"/><circle cx="202" cy="101" r="13" fill="' + PAPER + '"/>' +
             '<circle cx="98" cy="101" r="6" fill="' + TONER + '"/><circle cx="202" cy="101" r="6" fill="' + TONER + '"/>';
    inner += k.type(town + ' · ' + L('start', 'tapeWeek', { n: (s.week || 0) + 1 }), 150, 138, 13, { anchor: 'middle', bold: true, maxWidth: 236 });
    out += k.paper(22, 20, 256, 130, { seed: 'tpl' + s.slot, stock: stk, cut: 1.5, shadow: false, burn: 0.4, inner: inner });
    out += '<path d="M90 160L102 150H198L210 160Z" fill="#3a3a37"/><circle cx="120" cy="162" r="3" fill="#000"/><circle cx="180" cy="162" r="3" fill="#000"/>';
    return { svg: out, w: W, h: H };
  }

  function mountStart(root) {
    var tm = clock(), msg = h('div', { class: 'st-msg', aria: { live: 'polite' } }), list = [], ta, tapesBox, importBox, showAll = false, showImport = false;
    try { list = SB.Save.list(); } catch (e) { list = []; }
    if (!Array.isArray(list)) list = [];
    list = list.slice().sort(function (a, b) { return (b.savedAt || 0) - (a.savedAt || 0); });
    function fail(t) { SB.UI.clear(msg); msg.appendChild(errLine(t)); }
    function cont(s) {
      var r;
      try { r = SB.Save.load(s.slot); } catch (e) { r = null; }
      if (!r || !r.ok || !r.state) { fail(L('start', 'loadBad')); return; }
      openState(r.state, s.slot, fail);
    }
    function tape(s, i) {
      var a = drawn() ? tapeArt(s, i) : null, label = L('start', 'cont') + ': ' + (s.bookingName || '') + ', ' + (s.cityName || s.city || '') + ', ' + L('start', 'contWeek', { n: (s.week || 0) + 1 });
      return h('li', { class: 'st-tape', style: { '--rot': f(SB.rng.make('tr:' + s.slot).range(-5, 5)) + 'deg' } },
        h('button', { type: 'button', class: 'cb-thing st-tape-btn', aria: { label: label }, data: { fk: 'tape-' + s.slot }, on: { click: function () { cont(s); } } },
          a ? art(a.svg, a.w, a.h) : h('span', { text: label })));
    }
    function tapes() {
      var few = list.slice(0, 3), rest = list.slice(3);
      SB.UI.clear(tapesBox);
      if (!list.length) { tapesBox.appendChild(Kt().card({ paper: 'kraft', torn: true, tape: ['tl'], rot: -1, cls: 'st-nonecard' }, [h('p', { class: 'kt-type st-none', text: L('start', 'noSaves') })])); return; }
      tapesBox.appendChild(h('ul', { class: 'st-tapes', aria: { label: L('start', 'tapes') } }, few.map(tape)));
      if (rest.length) {
        keepFocus(function () {
          tapesBox.appendChild(slipBtn(showAll ? L('start', 'fewTapes') : L('start', 'allTapes', { n: list.length }), 'tapes-all', function () { showAll = !showAll; keepFocus(tapes); }));
          if (showAll) tapesBox.appendChild(h('ul', { class: 'st-tapes st-tapes--all', aria: { label: L('start', 'tapes') } }, rest.map(function (s, i) { return tape(s, i + 3); })));
        });
      }
    }
    function imp() {
      SB.UI.clear(importBox);
      importBox.appendChild(slipBtn(L('start', 'importStrip'), 'import', function () { showImport = !showImport; keepFocus(imp); if (showImport && ta) try { ta.focus(); } catch (e) { /* fine */ } }));
      if (!showImport) return;
      ta = ta || h('textarea', { class: 'st-import-ta', rows: '4', aria: { label: L('start', 'importK') } });
      importBox.appendChild(h('div', { class: 'st-icard st-import' }, [
        h('p', { class: 'st-typed', text: L('start', 'importHelp') }), ta,
        slipBtn(L('start', 'importGo'), 'import-go', function () {
          var r;
          try { r = SB.Save.importText(ta.value || ''); } catch (e) { r = null; }
          if (!r || !r.ok || !r.state) { fail((r && r.why) || L('start', 'importBad')); return; }
          openState(r.state, null, fail);
        })
      ]));
    }
    var t = drawn() ? titleArt() : null, w = drawn() ? wayArt() : null;
    tapesBox = h('div', { class: 'st-tapebox' });
    importBox = h('div', { class: 'st-importbox' });
    root.appendChild(h('div', { class: 'st st-start' }, [
      wall(tm),
      h('div', { class: 'st-front' }, [
        h('div', { class: 'st-left' }, [
          h('h1', { class: 'st-title' + (reduced() ? '' : ' is-slap'), aria: { label: L('start', 'title') } }, t ? [art(t.svg, t.w, t.h, 'st-title-art st-title-a'), art(t.svg2, t.w, t.h, 'st-title-art st-title-b'), glassBar(t.glass)] : L('start', 'title')),
          h('p', { class: 'st-sub' }, h('span', { text: L('start', 'sub') })),
          guide('start', null, list.length ? SB.Content.ui.guide.startTapes : null),
          tapesBox,
          h('div', { class: 'st-small' }, [importBox, slipBtn(L('start', 'settings'), 'settings', function () { SB.UI.go('settings'); })]),
          msg
          /* what is playing is on the pocket player (js/ui/musicbar.js), on every screen */
        ]),
        h('div', { class: 'st-right' }, [
          h('button', { type: 'button', class: 'cb-thing has-strip st-way is-slap', aria: { label: L('start', 'newLabel') }, data: { fk: 'new' }, on: { click: function () { SB.UI.go('city'); } } }, [
            w ? art(w.svg, w.w, w.h) : h('span', { text: L('start', 'newScene') }),
            drawn() ? D().stripArt(L('start', 'newScene'), 15) : null
          ])
        ])
      ])
    ]));
    tapes(); imp();
    point(function () { return byFk(root, 'new'); });
    return { unmount: function () { tm.stop(); point(null); } };
  }

  /* ---------------------------------------------------------------- */
  /* city                                                             */
  /* ---------------------------------------------------------------- */

  function cities() {
    var idx = (SB.CityIndex || []).slice();
    idx.sort(function (a, b) {
      var fa = a.slug === 'pensacola' ? 0 : (a.featured ? 1 : 2), fb = b.slug === 'pensacola' ? 0 : (b.featured ? 1 : 2);
      return fa - fb || (a.name < b.name ? -1 : 1);
    });
    return idx;
  }

  /* Which towns have a pack file: slug -> 'yes' | 'no' | 'checking'. Found by trying to load the pack; the index lists
   * every researched town, but only some are written. A load that never answers counts as not written. */
  var PACKS = {};
  var PACK_WAIT = 8000;
  function packState(slug) {
    try { if (SB.Cities.isLoaded(slug)) return 'yes'; } catch (e) { /* fall through */ }
    return PACKS[slug] || null;
  }
  function probe(slug, then) {
    var settled = false, timer = null;
    function settle(v) {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      PACKS[slug] = v;
      if (typeof then === 'function') then(slug);
    }
    if (packState(slug)) return;
    PACKS[slug] = 'checking';
    timer = setTimeout(function () { settle('no'); }, PACK_WAIT);
    try { SB.Cities.load(slug, function (err) { settle(err ? 'no' : 'yes'); }); }
    catch (e) { settle('no'); }
  }

  /* the road map: one sheet, 1040 x 620; the country is drawn at (20, 44) in SB.geo's box */
  var MAP = { w: 1040, h: 620, x: 20, y: 44 };
  function mapPts() {
    return cities().map(function (e) { var p = SB.geo.project(e.lat, e.lon); return { e: e, x: p.x + MAP.x, y: p.y + MAP.y }; });
  }
  var MAP_ART = null;
  /* the lower 48, coarse, as lat/lon, clockwise from Cape Flattery: the outline a gas-station map would print */
  var US48 = [[48.4, -124.7], [49, -123], [49, -95.2], [48.3, -89.6], [46.9, -84.8], [45.8, -84.4], [43.5, -82.5], [42.3, -83.1], [41.7, -82.6],
    [42.6, -79.2], [43.3, -79], [43.6, -76.2], [45, -74.7], [45, -71.5], [47.4, -69.2], [47.1, -67.8], [44.8, -66.9], [43.7, -70.2], [42.6, -70.6],
    [41.7, -70], [41.3, -72], [40.6, -74], [39.4, -74.4], [38.9, -74.9], [38.4, -75], [37, -76], [35.2, -75.5], [34.6, -76.9], [33.8, -78],
    [32, -80.9], [30.4, -81.4], [28.5, -80.6], [26.7, -80], [25.2, -80.4], [25.1, -81.1], [26.6, -82.2], [27.9, -82.8], [29.1, -83], [30, -84.3],
    [29.7, -85.4], [30.4, -86.5], [30.3, -88], [30.4, -89.4], [29.2, -89.2], [29.5, -91.5], [29.7, -93.8], [29.3, -94.8], [28, -97], [26, -97.2],
    [26.4, -99], [27.5, -99.5], [29.4, -101], [29, -103], [29.8, -104.5], [31.8, -106.5], [31.8, -108.2], [31.3, -111], [32.5, -114.8], [32.5, -117.1],
    [34, -118.5], [34.4, -120.5], [36.6, -121.9], [37.8, -122.5], [40.4, -124.4], [42, -124.3], [46.2, -124], [48.4, -124.7]];
  function mapArt() {
    if (MAP_ART) return MAP_ART;
    var k = K(), pts = mapPts(), edge = '', land = '', dots = '', roads = '', seen = {}, inner = '', i, gx;
    pts.forEach(function (p) {
      var near = pts.filter(function (q) { return q !== p; }).map(function (q) { return { q: q, d: Math.hypot(q.x - p.x, q.y - p.y) }; })
                    .sort(function (a, b) { return a.d - b.d; }).slice(0, 2);
      near.forEach(function (n) {
        var key = [p.e.slug, n.q.e.slug].sort().join('|');
        if (seen[key] || n.d > 150) return;
        seen[key] = true;
        roads += 'M' + f(p.x) + ' ' + f(p.y) + 'L' + f(n.q.x) + ' ' + f(n.q.y);
      });
    });
    land = US48.map(function (c) { var q = SB.geo.project(c[0], c[1]); return [q.x + MAP.x, q.y + MAP.y]; });
    edge = k.polyD(land);
    inner += '<path d="' + edge + '" transform="translate(5 6)" fill="#000" fill-opacity=".18"/>';
    inner += k.poly(land, { seed: 'us48', fill: '#ddd2b6', sw: 3.2, wob: 1.6, over: 1.5 }) + '<path d="' + edge + '" fill="url(#dk-ht1)"/>';
    pts.forEach(function (p) {
      if (p.e.slug !== 'anchorage-ak' && !/HI$/.test(p.e.state)) return;
      inner += k.rect(p.x - 34, p.y - 30, 68, 52, { seed: 'inset' + p.e.slug, sw: 2, fill: '#ddd2b6' }) + k.type(p.e.state, p.x - 28, p.y + 16, 11, { bold: true });
    });
    inner += '<path d="' + roads + '" fill="none" stroke="' + TONER + '" stroke-opacity=".6" stroke-width="2.4" stroke-dasharray="9 4"/>';
    pts.forEach(function (p) {
      var pc = p.e.slug === 'pensacola';
      dots += '<circle cx="' + f(p.x) + '" cy="' + f(p.y) + '" r="' + (pc ? 9 : (p.e.featured ? 6 : 4.4)) + '" fill="' + TONER + '" stroke="' + PAPER + '" stroke-width="1.6"/>';
    });
    inner += dots;
    /* fold creases and the index grid, as on a gas-station map */
    inner += '<path d="M' + (MAP.w / 3) + ' 30V' + (MAP.h - 10) + 'M' + (MAP.w * 2 / 3) + ' 30V' + (MAP.h - 10) + 'M10 ' + (MAP.h / 2) + 'H' + (MAP.w - 10) + '" stroke="#000" stroke-opacity=".14" stroke-width="5"/>';
    for (i = 0; i < 8; i++) { gx = 40 + i * 125; inner += k.type('ABCDEFGH'.charAt(i), gx, MAP.h - 14, 12, { bold: true, fill: '#55534d' }); }
    inner += '<path d="M20 12H420V40H20Z" fill="' + TONER + '"/>' + k.type(L('city', 'mapTitle'), 32, 32, 17, { fill: PAPER, bold: true });
    inner += k.type(L('city', 'mapSub'), 436, 31, 12, { bold: true, fill: '#3a3935' });
    var pc = pts.filter(function (p) { return p.e.slug === 'pensacola'; })[0];
    if (pc) {
      inner += k.arrow(pc.x - 120, pc.y + 70, pc.x - 16, pc.y + 10, { seed: 'pc-arrow', sw: 4, head: 14 });
      inner += k.marker('PENSACOLA', pc.x - 210, pc.y + 100, 26, { seed: 'pc-name' });
    }
    MAP_ART = { svg: k.paper(4, 4, MAP.w - 8, MAP.h - 8, { seed: 'st-map', stock: 'bone', burn: 0.7, inner: inner }), w: MAP.w, h: MAP.h };
    return MAP_ART;
  }
  /* circled three times in marker, each pass drawn on */
  function circled(x, y, ink) {
    var k = K(), m = k.circle3(x, y, 26, 20, { seed: 'c3' + x + y, stroke: ink, sw: 4.4 }), n = 0;
    return m.replace(/<path /g, function () { n += 1; return '<path pathLength="1" class="st-draw" style="animation-delay:' + ((n - 1) * 0.16).toFixed(2) + 's" '; });
  }
  function townInk(e) {
    var a = e && e.inks ? e.inks.filter(function (x) { return x !== 'toner' && x !== 'copyGray'; })[0] : null;
    return K().ink(a || 'fireRed');
  }

  /* the postcard's photo is copied on the town's own paper */
  var POST_PAPER = { goldenrod: 'goldenrod', kraft: '#C8A77A', newsprint: '#E6E1D3' };

  function mountCity(root) {
    var sel = draft.slug || 'pensacola', q = '', status = null, guideBox = h('div', { class: 'st-guidebox' }), mapBox, over, rackBox, cardBox, search, alive = true, pts = [];
    function probed(slug) { if (!alive) return; if (slug === sel) drawCard(false); drawRack(); }
    function drawOver() {
      if (!over) return;
      var p = pts.filter(function (x) { return x.e.slug === sel; })[0], out = '';
      if (p) out += circled(p.x, p.y, townInk(p.e));
      over.innerHTML = out + '<g class="st-hover"></g>';
    }
    function drawGuide() { if (!guideBox) return; SB.UI.clear(guideBox); var g = guide('city', sel); if (g) guideBox.appendChild(g); }
    function drawCard(land) {
      drawGuide();
      SB.UI.clear(cardBox);
      var c = card();
      cardBox.appendChild(c);
      if (land) hit(c, 'is-land');
    }
    function drawRack() { if (!rackBox) return; keepFocus(function () { SB.UI.clear(rackBox); rackBox.appendChild(rack()); }); }
    function choose(slug) {
      if (slug === sel) return;
      sel = slug; status = null; probe(slug, probed);
      drawOver(); drawCard(true); drawRack();
    }
    function nearest(ev) {
      var r = over.getBoundingClientRect(), x, y, best = null, bd = 22;
      if (!r || !r.width) return null;
      x = (ev.clientX - r.left) / r.width * MAP.w; y = (ev.clientY - r.top) / r.height * MAP.h;
      pts.forEach(function (p) { var d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = p; } });
      return best;
    }
    function rack() {
      var n = String(q || '').toLowerCase(), items = cities().filter(function (e) {
        return !n || (e.name + ' ' + e.state).toLowerCase().indexOf(n) >= 0;
      });
      if (!items.length) return h('p', { class: 'st-typed st-none', text: L('city', 'none') });
      return h('ul', { class: 'st-rack', role: 'listbox', aria: { label: L('city', 'title') } }, items.map(function (e, i) {
        var on = e.slug === sel, ps = packState(e.slug);
        return h('li', { role: 'presentation' }, Kt().slip({ role: 'option', on: on, label: e.name + ', ' + e.state, fk: 'city-' + e.slug, seed: 'city-' + e.slug,
          cls: 'st-rackcard' + (ps === 'no' ? ' is-no' : ''), struck: ps === 'no', paper: i % 2 ? 'white' : 'bone',
          tag: e.slug === 'pensacola' ? L('city', 'first') : (e.featured ? L('city', 'featured') : null), note: e.thin ? '~' : null,
          click: function () { choose(e.slug); }, keydown: rackKey }));
      }));
    }
    function rackKey(ev) {
      var all, i;
      if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
      all = Array.prototype.slice.call(rackBox.querySelectorAll('.st-rackcard'));
      i = all.indexOf(ev.currentTarget);
      ev.preventDefault();
      if (ev.key === 'ArrowUp' && i <= 0) { try { search.focus(); } catch (e) { /* fine */ } return; }
      i = Math.max(0, Math.min(all.length - 1, i + (ev.key === 'ArrowDown' ? 1 : -1)));
      if (all[i]) all[i].focus();
    }
    function packBits(slug) {
      var p = null, kinds = {}, out = [];
      if (!SB.Cities.isLoaded(slug)) return null;
      try { p = SB.Cities.get(slug); } catch (e) { return null; }
      (p.rooms || []).forEach(function (r) { kinds[r.kind] = (kinds[r.kind] || 0) + 1; });
      if ((p.zones || []).length > 1) out.push(h('p', { class: 'st-typed' }, [h('b', { text: L('city', 'feeders') + ': ' }),
        p.zones.slice(1).map(function (z) { return z.name; }).filter(Boolean).join(', ')]));
      if (Object.keys(kinds).length) out.push(h('p', { class: 'st-typed st-small-t' }, [h('b', { text: L('city', 'rooms') + ': ' }),
        Object.keys(kinds).map(function (k) { return kinds[k] + ' × ' + word('room.' + k + '.name', k.toLowerCase()); }).join(', ')]));
      if (draft.tune && draft.slug === slug && has('tune.tuned')) out.push(h('p', { class: 'st-typed st-quiet', text: word('tune.tuned', '') }));
      return out;
    }
    function swatch(e) {
      var k = K(), inks = (e.inks || []).slice(0, 2), out = '', i;
      out += k.paper(2, 4, 40, 40, { seed: 'sw-p' + e.slug, stock: k.stock(e.paper === 'kraft' ? 'kraft' : (e.paper || 'white')), cut: 1, burn: 0.3, sx: 2, sy: 3 });
      for (i = 0; i < inks.length; i++) out += k.paper(50 + i * 46, 4, 40, 40, { seed: 'sw' + i + e.slug, stock: k.ink(inks[i]), cut: 1, burn: 0, sx: 2, sy: 3 });
      return h('div', { class: 'st-swatch' }, [art(out, 150, 52), h('span', { class: 'st-typed st-small-t', text: L('city', 'inks') + ': ' + inks.map(function (x) { return String(x).replace(/([A-Z])/g, ' $1').toLowerCase(); }).join(' + ') })]);
    }
    function card() {
      var e = entry(sel), ps = packState(sel), ready = ps === 'yes';
      if (!e) return h('div');
      return h('article', { class: 'st-post', aria: { label: e.name + ', ' + e.state } }, [
        Kt().photo({ id: 'crowd-02', w: 330, h: 112, paper: POST_PAPER[e.paper] || 'canary', tape: [{ at: 'top', w: 70 }], rot: 1, seed: 'city-post', cls: 'st-postphoto' }),
        h('div', { class: 'st-post-head' }, [
          drawn() ? head(e.name, 30, 290) : h('b', { text: e.name }),
          h('span', { class: 'st-typed st-post-st', text: e.state })
        ]),
        h('h2', { class: 'cb-sr', text: e.name + ', ' + e.state }),
        h('p', { class: 'st-typed st-small-t', text: [L('city', 'size.' + e.size), (e.traits || []).map(function (t) { return word('trait.' + t, t.toLowerCase()); }).join(' · ')].filter(Boolean).join(' · ') }),
        drawn() ? swatch(e) : null,
        e.blurb ? h('p', { class: 'st-typed st-small-t', text: e.blurb }) : null,
        e.hard ? h('p', { class: 'st-typed st-hard' }, [h('b', { text: L('city', 'hard') + ': ' }), e.hard]) : null,
        e.thin ? h('p', { class: 'st-typed st-quiet', text: L('city', 'thin') }) : null,
        packBits(sel),
        ps === 'no' ? h('div', { class: 'st-unwritten', role: 'status' }, [drawn() ? art(D().stamp(L('city', 'unwrittenStamp'), 6, 8, 20, { rot: -4, ink: K().ink('fireRed') }), D().stampW(L('city', 'unwrittenStamp'), 20) + 20, 56) : null,
          h('p', { class: 'st-typed', text: L('city', 'unwritten') })]) :
          (ps === 'checking' ? h('p', { class: 'st-typed st-quiet', role: 'status', text: L('city', 'checking') }) : null),
        status && ps !== 'no' ? (status === 'loading' ? h('p', { class: 'st-typed st-quiet', text: L('city', 'loading') }) : errLine(status)) : null,
        h('div', { class: 'st-acts' }, [
          Kt().button({ label: L('city', 'pick'), say: L('city', 'pick') + ': ' + e.name, kind: 'primary', big: 24, fk: 'city-pick', disabled: !ready, on: pick }),
          Kt().button({ label: L('city', 'back'), fk: 'city-back', on: function () { SB.UI.go('start'); } })
        ])
      ]);
    }
    function pick() {
      var slug = sel;
      if (packState(slug) !== 'yes') { probe(slug, probed); drawCard(false); return; }
      status = 'loading'; drawCard(false);
      try {
        SB.Cities.load(slug, function (err) {
          var qs = [];
          if (!alive) return;
          if (err) { PACKS[slug] = 'no'; status = SB.Cities.isLoaded(slug) ? L('start', 'packBad') : null; drawCard(false); return; }
          if (draft.slug !== slug) { draft.tune = null; }
          draft.slug = slug; status = null;
          try { qs = SB.Cities.questions(slug); } catch (e) { qs = []; }
          if (qs.length) SB.UI.go('tune', { slug: slug }); else SB.UI.go('name');
        });
      } catch (e) { status = L('start', 'packBad'); drawCard(false); }
    }
    var findField = Kt().input({ label: L('city', 'search'), type: 'search', placeholder: L('city', 'search') + '…', fk: 'city-find', cls: 'st-findfield',
                                 onInput: function (v) { q = v; SB.UI.clear(rackBox); rackBox.appendChild(rack()); },
                                 onKey: function (ev) {
                                   var first = rackBox.querySelector('.st-rackcard');
                                   if (ev.key === 'ArrowDown' && first) { ev.preventDefault(); first.focus(); }
                                   if (ev.key === 'Enter' && first) { ev.preventDefault(); first.click(); }
                                 } });
    search = findField.field;
    try { pts = mapPts(); } catch (e) { pts = []; }
    mapBox = h('div', { class: 'st-map', role: 'img', aria: { label: L('city', 'map') } });
    if (drawn()) {
      var m = mapArt();
      mapBox.appendChild(art(m.svg, m.w, m.h, 'st-map-art'));
      if (mapBox.insertAdjacentHTML) mapBox.insertAdjacentHTML('beforeend', '<svg class="st-map-over" viewBox="0 0 ' + MAP.w + ' ' + MAP.h + '" aria-hidden="true" focusable="false">' + K().defs() + '</svg>');
      over = mapBox.querySelector ? mapBox.querySelector('.st-map-over') : null;
      if (over && over.addEventListener) {
        over.addEventListener('click', function (ev) { var p = nearest(ev); if (p) choose(p.e.slug); });
        over.addEventListener('mousemove', function (ev) {
          var p = nearest(ev), g = over.querySelector('.st-hover');
          if (!g) return;
          over.style.cursor = p ? 'pointer' : 'default';
          g.innerHTML = p ? '<path d="M' + f(p.x + 12) + ' ' + f(p.y - 30) + 'h' + f(K().typeWidth(p.e.name.toUpperCase(), 14) + 16) + 'v24h' + f(-(K().typeWidth(p.e.name.toUpperCase(), 14) + 16)) + 'Z" fill="' + TONER + '"/>' +
            K().type(p.e.name.toUpperCase(), p.x + 20, p.y - 13, 14, { fill: PAPER, bold: true }) : '';
        });
        over.addEventListener('mouseleave', function () { var g = over.querySelector('.st-hover'); if (g) g.innerHTML = ''; });
      }
    }
    rackBox = h('div', { class: 'st-rackbox' });
    cardBox = h('div', { class: 'st-cardbox' });
    root.appendChild(h('div', { class: 'st st-city' }, [
      h('div', { class: 'st-grit', aria: { hidden: 'true' } }),
      h('div', { class: 'st-citygrid' }, [
        h('div', { class: 'st-mapcol' }, [
          h('h1', { class: 'st-head', aria: { label: L('city', 'title') } }, drawn() ? D().word(L('city', 'title'), 46, { halo: PAPER }) : L('city', 'title')),
          guideBox,
          h('div', { class: 'st-mapwrap' }, [mapBox]),
          h('div', { class: 'st-findrow' }, [
            Kt().card({ paper: 'white', seed: 'st-find', rot: 0.8, tape: [{ at: 'tl', w: 64 }], cls: 'st-findcard' }, [findField]),
            Kt().label(L('city', 'count', { n: (SB.CityIndex || []).length }), null, { cls: 'st-count' })
          ]),
          rackBox
        ]),
        h('div', { class: 'st-cardcol' }, [cardBox])
      ])
    ]));
    probe(sel, probed);
    drawOver(); drawCard(true); rackBox.appendChild(rack());
    try { search.focus(); } catch (e) { /* fine */ }
    point(function () { return byFk(root, 'city-pick'); });
    return { unmount: function () { alive = false; point(null); } };
  }

  /* ---------------------------------------------------------------- */
  /* tune                                                             */
  /* ---------------------------------------------------------------- */

  function tickBox(o) {
    if (!drawn()) return h('button', { type: 'button', class: 'st-plain', aria: { pressed: String(!!o.on) }, data: { fk: o.fk }, on: { click: o.onClick }, text: (o.on ? '[x] ' : '[ ] ') + o.text });
    return D().tickThing(o);
  }

  function mountTune(root, params) {
    var slug = (params && params.slug) || draft.slug, qs = [], ans = {}, form, e = entry(slug);
    try { qs = SB.Cities.questions(slug); } catch (err) { qs = []; }
    if (draft.tune && draft.slug === slug) ans = SB.util.copy(draft.tune);
    function optLabel(q, o) {
      if (q.kind === 'YES_NO') return word('tune.' + q.key + '.' + (o ? 'yes' : 'no'), o ? 'yes' : 'no');
      if (q.key === 'lean') return word('genre.' + o + '.name', o);
      if (q.key === 'mainRoom') return word('room.' + o + '.name', String(o).toLowerCase());
      return word('tune.' + q.key + '.' + o, String(o).toLowerCase());
    }
    function group(q) {
      var multi = q.kind === 'UP_TO_TWO', cur = ans[q.key], legend = word('tune.' + q.key + '.q', q.key);
      function toggle(o, on) {
        var list;
        if (!multi) ans[q.key] = on ? undefined : o;
        else {
          list = Array.isArray(ans[q.key]) ? ans[q.key].slice() : [];
          if (!on) { list.push(o); if (list.length > 2) list.shift(); } else list = list.filter(function (x) { return x !== o; });
          ans[q.key] = list;
        }
        keepFocus(rerender);
      }
      if (!multi) {
        /* one answer, tap again to clear: ticked boxes (a radio would not let it be cleared) */
        return h('div', { class: 'st-line', role: 'group', aria: { label: legend } }, [
          h('p', { class: 'kt-small st-line-q', text: legend }),
          h('div', { class: 'st-line-opts' }, q.options.map(function (o, i) {
            return Kt().check({ label: optLabel(q, o), checked: cur === o, pen: true, fk: 'tune-' + q.key + '-' + i, on: function () { toggle(o, cur === o); } });
          }))
        ]);
      }
      return h('div', { class: 'st-line', role: 'group', aria: { label: legend } }, [
        h('p', { class: 'kt-small st-line-q', text: legend }),
        h('div', { class: 'st-line-opts' }, q.options.map(function (o, i) {
          var on = Array.isArray(cur) && cur.indexOf(o) >= 0;
          return Kt().check({ label: optLabel(q, o), checked: on, pen: true, fk: 'tune-' + q.key + '-' + i, on: function () { toggle(o, on); } });
        }))
      ]);
    }
    function rerender() { SB.UI.clear(form); form.appendChild(h('div', null, qs.map(group))); }
    form = h('div', { class: 'st-tune-form' });
    root.appendChild(h('div', { class: 'st st-tune' }, [
      h('div', { class: 'st-grit', aria: { hidden: 'true' } }),
      h('div', { class: 'st-namegrid' }, [
        Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.6, cls: 'st-form st-tunesheet' }, [
          Kt().headline(L('tune', 'title') + (e ? ': ' + e.name : ''), { size: 34, max: 560, tag: 'h1', cls: 'st-head' }),
          guide('tune', slug),
          word('tune.intro', '') && !guideOn() ? h('p', { class: 'kt-pencil st-help', text: word('tune.intro', '') }) : null,
          form,
          h('div', { class: 'st-acts' }, [
            Kt().button({ label: SB.text.label('ui.tune.use') + ' →', kind: 'primary', big: 24, fk: 'tune-use', on: function () {
              var t = {}, k;
              for (k in ans) if (ans[k] !== undefined && !(Array.isArray(ans[k]) && !ans[k].length)) t[k] = ans[k];
              draft.tune = Object.keys(t).length ? t : null; draft.slug = slug;
              SB.UI.go('name');
            } }),
            Kt().button({ label: word('tune.skip', 'Skip'), fk: 'tune-skip', on: function () { draft.tune = null; SB.UI.go('name'); } }),
            Kt().button({ label: L('tune', 'back'), fk: 'tune-back', on: function () { SB.UI.go('city'); } })
          ])
        ]),
        h('div', { class: 'st-tunepic' }, [
          Kt().photo({ ids: ['crowd-02'], w: 430, h: 560, paper: 'canary', tape: ['tl', 'tr'], rot: 1.8, seed: 'tune-pic' })
        ])
      ])
    ]));
    rerender();
    /* answered something: use these; nothing ticked: skip */
    point(function () {
      var k, any = false;
      for (k in ans) if (ans[k] !== undefined && !(Array.isArray(ans[k]) && !ans[k].length)) any = true;
      return byFk(root, any ? 'tune-use' : 'tune-skip');
    });
    return { unmount: function () { point(null); } };
  }

  /* ---------------------------------------------------------------- */
  /* the player's first flyer: a real one, "<name> presents"          */
  /* ---------------------------------------------------------------- */

  var FLY_W = 400, FLY_H = Math.round(400 * 1100 / 850);
  function myFlyer(name, width) {
    var s, spec, rec, k, i, cv, e = entry(draft.slug);
    if (!draft.flyerBase) draft.flyerBase = Date.now().toString(36);
    if (!SB.Flyer || typeof document === 'undefined') return null;
    try {
      s = SB.Flyer.sample('mine:' + draft.flyerBase); spec = s.spec;
      spec.presenter = name;
      spec.mark = Object.assign({}, spec.mark || {}, draft.mark || {});
      if (e) spec.style = { inks: e.inks || [], papers: e.paper ? [e.paper] : [], cityInks: e.inks || [], cityPaper: e.paper || null };
      rec = SB.Flyer.recipe(spec);
      k = Math.floor(String(name).replace(/\s+/g, '').length / 3);
      for (i = 0; i < k; i++) rec = SB.Flyer.roll(rec, spec, ['layout', 'type', 'ink', 'paper', 'picture']);
      cv = document.createElement('canvas');
      SB.Flyer.render(cv, rec, spec, { width: width, dpr: Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1) });
      cv.setAttribute('role', 'img');
      cv.setAttribute('aria-label', SB.Flyer.text(spec));
      return { canvas: cv, k: k };
    } catch (err) { return null; }
  }
  /* the tape that holds the first flyer up. Every template already prints "<name> presents" itself (SB.Flyer
   * B.presenter), so nothing is pasted over the top: a pasted bar doubled it and could hide the headliner. */
  function flyerFx(name) {
    if (!drawn()) return null;
    var k = K(), out = '';
    out += k.tape(30, 14, 90, 26, { seed: 'mf1', rot: -30 }) + k.tape(FLY_W, 14, 90, 26, { seed: 'mf2', rot: 26 });
    return h('span', { class: 'st-fly-fx', html: svgOf(out, FLY_W + 30, FLY_H + 30) });
  }

  /* ---------------------------------------------------------------- */
  /* name                                                             */
  /* ---------------------------------------------------------------- */

  function rollMarks() {
    var r = SB.rng.make('marks:' + Date.now().toString(36) + ':' + Math.floor(Math.random() * 1e6)), out = [], i;
    for (i = 0; i < 4; i++) out.push('mk' + r.int(0, 1e9).toString(36));
    return out;
  }
  function ideas() {
    var B = (SB.Content.names && SB.Content.names.booking) || {}, whole = (B.whole || []).slice(), r = SB.rng.make('ideas:' + today() + ':' + Math.random());
    return r.shuffle ? r.shuffle(whole).slice(0, 3) : whole.slice(0, 3);
  }

  function mountName(root) {
    var tm = clock(), input, msg, marksBox, ideasBox, flyBox, sugg = ideas(), lastK = -1, redraw = null, thumped = null;
    if (!draft.markSeeds) draft.markSeeds = rollMarks();
    if (!draft.mark) draft.mark = { v: 1, seed: draft.markSeeds[0] };
    function shown() { var n = String((input && input.value) || '').trim(); return n || L('name', 'markBlank'); }
    function flyer() {
      var r = myFlyer(shown(), FLY_W), el;
      SB.UI.clear(flyBox);
      if (!r) return;
      el = h('div', { class: 'st-myfly' }, [r.canvas, flyerFx(shown())]);
      flyBox.appendChild(el);
      if (r.k !== lastK && lastK !== -1) hit(el, 'is-slap');
      lastK = r.k;
    }
    function marks() {
      keepFocus(function () {
        SB.UI.clear(marksBox);
        marksBox.appendChild(h('div', { class: 'st-stamps', role: 'radiogroup', aria: { label: L('name', 'marks') } }, draft.markSeeds.map(function (s, i) {
          var on = draft.mark && draft.mark.seed === s, b = h('button', { type: 'button', role: 'radio', class: 'cb-thing st-stamp' + (on ? ' is-on' : ''), aria: { checked: on ? 'true' : 'false' },
                               style: { '--rot': f(SB.rng.make('sr' + s).range(-6, 6)) + 'deg' },
                               data: { fk: 'mark-' + i }, on: { click: function () { draft.mark = { v: 1, seed: s }; thumped = s; marks(); flyer(); } } },
            C().BookerMark({ name: shown(), mark: { v: 1, seed: s }, size: 84 }));
          if (thumped === s) hit(b, 'is-thump');
          return b;
        })));
        thumped = null;
      });
    }
    function soon() {
      if (redraw) clearTimeout(redraw);
      redraw = tm.later(function () { redraw = null; draft.bookingName = input.value; marks(); flyer(); }, 140);
    }
    function next() {
      var n = String(input.value || '').trim();
      SB.UI.clear(msg);
      if (!n) { msg.appendChild(errLine(L('name', 'empty'))); try { input.focus(); } catch (e) { /* fine */ } return; }
      if (SB.text.blocked(n)) { msg.appendChild(errLine(L('name', 'blocked'))); return; }
      draft.bookingName = n;
      SB.UI.go('setup');
    }
    var nameField = Kt().input({ label: L('name', 'field'), big: true, value: draft.bookingName || '', max: 48, fk: 'name-in', cls: 'st-namefield',
                                 placeholder: L('name', 'markBlank').toUpperCase(),
                                 onKey: function (e) { if (e.key === 'Enter') { e.preventDefault(); next(); } },
                                 onInput: function () { soon(); },
                                 on: function () { draft.bookingName = input.value; } });
    input = nameField.field;
    msg = h('div', { aria: { live: 'polite' } });
    marksBox = h('div', { class: 'st-markbox' });
    flyBox = h('div', { class: 'st-flybox', aria: { label: L('name', 'preview') }, role: 'group' });
    ideasBox = h('div', { class: 'st-ideas', role: 'group', aria: { label: L('name', 'ideas') } }, [
      h('p', { class: 'kt-small st-k', text: L('name', 'ideas') }),
      h('div', { class: 'st-ideas-row' }, sugg.map(function (s, i) {
        return Kt().button({ label: s, fk: 'idea-' + i, paper: 'white', cls: 'st-idea', on: function () { input.value = s; draft.bookingName = s; marks(); flyer(); } });
      }))
    ]);
    root.appendChild(h('div', { class: 'st st-name' }, [
      h('div', { class: 'st-grit', aria: { hidden: 'true' } }),
      h('div', { class: 'st-namegrid' }, [
        Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.6, cls: 'st-form st-namesheet' }, [
          Kt().headline(L('name', 'title'), { size: 34, max: 560, tag: 'h1', cls: 'st-head' }),
          guide('name', draft.slug),
          nameField,
          h('p', { class: 'kt-pencil st-help', text: L('name', 'help') }),
          ideasBox,
          h('p', { class: 'kt-small st-k', text: L('name', 'marks') }),
          h('p', { class: 'kt-pencil st-help', text: L('name', 'markHelp') }), marksBox,
          Kt().button({ label: L('name', 'reroll'), fk: 'reroll', on: function () { draft.markSeeds = rollMarks(); draft.mark = { v: 1, seed: draft.markSeeds[0] }; thumped = draft.markSeeds[0]; marks(); flyer(); } }),
          msg,
          h('div', { class: 'st-acts' }, [
            Kt().button({ label: L('name', 'next'), kind: 'primary', big: 24, fk: 'name-next', on: next }),
            Kt().button({ label: L('name', 'back'), fk: 'name-back', on: function () { SB.UI.go('city'); } })
          ])
        ]),
        flyBox
      ])
    ]));
    marks(); flyer();
    try { input.focus(); } catch (e) { /* fine */ }
    /* no name yet: the box to type it in; a name: next */
    point(function () { return String(input.value || '').trim() ? byFk(root, 'name-next') : input; });
    return { unmount: function () { tm.stop(); point(null); } };
  }

  /* ---------------------------------------------------------------- */
  /* setup                                                            */
  /* ---------------------------------------------------------------- */

  /* the last hit: one black bar of marker capitals with a staple through it */
  function stapleArt() {
    var k = K(), t = L('setup', 'staple').toUpperCase();
    return k.paper(8, 10, 404, 80, { seed: 'st-stp0', stock: 'bone', rot: -1.5, cut: 2, burn: 0.3 }) +
      k.paper(14, 16, 392, 68, { seed: 'st-stp', stock: TONER, rot: -1.5, burn: 0, shadow: false,
        inner: k.marker(t, 34, 70, 42, { seed: 'st-stpm', fill: PAPER, maxWidth: 290 }) + k.arrow(334, 50, 388, 48, { seed: 'st-stpa', stroke: PAPER, sw: 5, head: 16 }) }) +
      k.staple(22, 20, { rot: -30 }) + D().swipe(30, 94, 240, 10);
  }

  function skipWords() {
    var t = SB.Content.story && SB.Content.story.tutorial && SB.Content.story.tutorial.skip;
    return t && t.label ? String(t.label) : '';
  }

  function mountSetup(root) {
    var tm = clock(), S = draft.settings, msg = h('div', { aria: { live: 'polite' } }), body = h('div', { class: 'st-setlines' }), flyBox, going = false, guided = true;
    function line(key, values, helpKey) {
      return h('div', { class: 'st-setline' }, [
        Kt().pick({ label: L('setup', key), name: 'st-set-' + key, value: S[key], fk: 'set-' + key,
                    options: values.map(function (v) { return [v, word(key + '.' + v, v.toLowerCase())]; }),
                    on: function (v) { S[key] = v; keepFocus(draw); } }),
        h('p', { class: 'kt-pencil st-help', text: L('setup', key + 'What') }),
        optHelp(values.map(function (v) { return [v, L('setup', helpKey + '.' + v)]; }), S[key])
      ]);
    }
    /* what every choice means, not only the one picked; the picked one is marked */
    function optHelp(rows, cur) {
      return h('ul', { class: 'st-opthelp' }, rows.map(function (r) {
        var on = r[0] === cur;
        return h('li', { class: on ? 'is-on' : null, aria: on ? { current: 'true' } : null }, [
          h('span', { text: r[1] }),
          on ? h('span', { class: 'st-opthelp-on', text: ' ← ' + L('setup', 'picked') }) : null
        ]);
      }));
    }
    function draw() {
      SB.UI.clear(body);
      body.appendChild(h('div', { class: 'st-setline' }, [
        Kt().check({ label: L('setup', 'bills'), checked: !!S.bills, fk: 'set-bills',
                     on: function (v) { S.bills = !!v; keepFocus(draw); } }),
        optHelp([[true, L('setup', 'billsOn')], [false, L('setup', 'billsOff')]], !!S.bills),
        h('p', { class: 'kt-pencil st-help', text: L('setup', 'billsLater') })
      ]));
      body.appendChild(line('fog', Object.keys(SB.Enums.FOG), 'fogHelp'));
      body.appendChild(line('windows', Object.keys(SB.Enums.WINDOWS), 'windowsHelp'));
      body.appendChild(h('p', { class: 'kt-pencil st-help', text: L('setup', 'later') }));
    }
    function begin() {
      var st, seed;
      SB.UI.clear(msg);
      if (!draft.slug || !SB.Cities.isLoaded(draft.slug)) { SB.UI.go('city'); return; }
      if (!draft.bookingName) { SB.UI.go('name'); return; }
      seed = draft.slug + '-' + Date.now().toString(36);
      try {
        st = SB.Game.newGame({ seed: seed, citySlug: draft.slug, bookingName: draft.bookingName, mark: draft.mark,
                               settings: { bills: !!S.bills, fog: S.fog, windows: S.windows }, tune: draft.tune || null,
                               tutorial: guided });        // the guided first show, unless "I've done this before"
      } catch (e) { SB.log('error', 'SB.UI.setup', String(e && e.message)); msg.appendChild(errLine(L('setup', 'bad'))); going = false; return; }
      draft = { slug: null, tune: null, bookingName: '', mark: null, markSeeds: null, flyerBase: null, settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' } };
      point(null);
      try { SB.UI.prefs.set('setupDone', true); } catch (e) { /* the guide shows again next time */ }
      /* the going-away show plays before the desk appears (js/ui/story.js); then sit down */
      if (SB.UI.story && SB.UI.story.opening) SB.UI.story.opening(st, function () { SB.UI.start(st); });
      else SB.UI.start(st);
    }
    /* the last hit: two staples go through the flyer, it slaps flat, then the desk */
    function staple() {
      var el = flyBox.querySelector ? flyBox.querySelector('.st-myfly') : null, k = K();
      if (going) return;
      going = true;
      if (reduced() || !el || !drawn()) { begin(); return; }
      el.appendChild(h('span', { class: 'st-staples', html: svgOf(k.staple(70, 26, { rot: -8 }) + k.staple(FLY_W - 70, 24, { rot: 6 }) + k.staple(70, FLY_H - 22, { rot: 4 }) + k.staple(FLY_W - 70, FLY_H - 20, { rot: -5 }), FLY_W, FLY_H) }));
      hit(el, 'is-staple');
      tm.later(begin, 520);
    }
    var r = myFlyer(draft.bookingName || L('name', 'markBlank'), FLY_W);
    flyBox = h('div', { class: 'st-flybox' }, r ? h('div', { class: 'st-myfly' }, [r.canvas, flyerFx(draft.bookingName || L('name', 'markBlank'))]) : null);
    root.appendChild(h('div', { class: 'st st-setup' }, [
      h('div', { class: 'st-grit', aria: { hidden: 'true' } }),
      h('div', { class: 'st-namegrid' }, [
        h('div', { class: 'st-setcol' }, [
        Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.6, cls: 'st-form st-setsheet' }, [
          Kt().headline(L('setup', 'title'), { size: 38, max: 560, tag: 'h1', cls: 'st-head' }),
          guide('setup', draft.slug),
          body, msg,
          h('div', { class: 'st-acts' }, [
            Kt().button({ label: L('setup', 'back'), fk: 'setup-back', on: function () { SB.UI.go('name'); } }),
            /* skip the walkthrough: the same start, with the first show left to you */
            skipWords() ? Kt().button({ label: skipWords(), fk: 'skip-tutorial', paper: 'white', on: function () { guided = false; staple(); } }) : null
          ])
        ]),
        Kt().photo({ ids: ['crowd-03'], w: 560, h: 170, paper: 'pink', tape: ['tl', 'tr'], rot: -1.2, seed: 'set-pic', cls: 'st-setpic' })
        ]),
        h('div', { class: 'st-hitcol' }, [
          flyBox,
          h('button', { type: 'button', class: 'cb-thing is-strip st-staple', aria: { label: L('setup', 'stapleLabel') }, data: { fk: 'staple' }, on: { click: staple } },
            drawn() ? art(stapleArt(), 430, 104) : h('span', { text: L('setup', 'start') })),
          h('p', { class: 'kt-pencil st-help st-staplehelp', text: L('setup', 'stapleHelp') })
        ])
      ])
    ]));
    draw();
    point(function () { return going ? null : byFk(root, 'staple'); });
    return { unmount: function () { tm.stop(); point(null); } };
  }

  SB.UI.screen('start', { rail: null, title: 'ui.start.title', full: true, mount: mountStart });
  SB.UI.screen('city', { rail: null, title: 'ui.city.title', full: true, mount: mountCity });
  SB.UI.screen('tune', { rail: null, title: 'ui.tune.title', full: true, mount: mountTune });
  SB.UI.screen('name', { rail: null, title: 'ui.name.title', full: true, mount: mountName });
  SB.UI.screen('setup', { rail: null, title: 'ui.setup.title', full: true, mount: mountSetup });
})(SB);
