/* Scene Booker — ui/screens/start.js (UI-A2)
 * The way in, drawn as the same photocopied paste-up as the desk (design/spec/07-desk.md 2 and 2b):
 *   start  a black wall getting flyered (real flyers from SB.Flyer.sample, slapped up one after another), the title
 *          sheet over them, one sheet that says your show goes here, saved games as a short stack of tapes, import.
 *   city   a photocopied road map (every researched town a dot, Pensacola marked), a rack of typed index cards you
 *          type to filter, and the town's postcard, which lands when a town is circled three times in marker.
 *   tune   "your town": typed questions with drawn boxes.
 *          The postcard also asks the one question before the game: first time booking, or booked before (draft.exp).
 *   then   the going-away show (js/ui/story.js openingAsk): the booking name is asked in the scene, and for somebody
 *          who has booked before the setup too; the replies make the game (SB.Game.newGame, SB.UI.start). A first-timer
 *          is asked the setup after the first show (spec 14). The booking name is typed (nameWidget) while a real flyer reading
 *          "<name> presents" is drawn beside it, re-rolling its art every few letters; the marks are rubber stamps.
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
    noName: 'No name yet',
    tapeWeek: 'WK {n}',
    agoNow: 'saved just now',
    agoMin1: 'saved 1 minute ago', agoMin: 'saved {n} minutes ago',
    agoHour1: 'saved 1 hour ago', agoHour: 'saved {n} hours ago',
    agoDay1: 'saved yesterday', agoDay: 'saved {n} days ago',
    newScene: 'New scene',
    newLabel: 'Your show goes here: start a new game',
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
    thin: 'Researched lightly. The map is right; the scene is a guess.', thinTag: 'rough',
    hard: 'What is hard here',
    rooms: 'Rooms',
    feeders: 'Towns nearby',
    whereGo: 'Where people drive for the big shows',
    inks: 'Inks',
    pick: 'Book here',
    expK: 'Have you done this before?',
    expFirst: 'First time booking a show',
    expBooked: 'I\'ve booked shows before',
    expFirstNote: 'A friend texts you through your first show, one step at a time.',
    expBookedNote: 'No walkthrough. You\'ll be asked how you want to play before you start.',
    loading: 'Opening the town. Its rooms, bands and streets are loading, and the first time it can take a few seconds.',
    checking: 'Looking for this town\'s pages…',
    unwritten: 'This town couldn\'t be opened. Pick another for now.',
    unwrittenStamp: 'can\'t open',
    back: 'Back',
    none: 'No town by that name.',
    count: '{n} towns',
    stateCount: '{n} towns',
    stateCountOne: '1 town',
    allTowns: 'All towns',
    size: { SMALL: 'small', MID: 'mid-sized', LARGE: 'big', HUGE: 'huge' },
    map: 'Map of the researched towns',
    mapTitle: 'OFFICIAL ROAD MAP',
    mapSub: 'click a state to see its towns · not to scale'
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
    marks: 'Your lettering',
    markHelp: 'How your name is written on every flyer you make. It stays the same on all of them, so people learn to spot it.',
    lpDrawn: 'Drawn by hand', lpFonts: 'Fonts',
    markBlank: 'Your Name',
    done: 'That\'s the name',
    empty: 'Give it a name first.',
    needName: 'Type a name to go on.',
    blocked: 'That name is somebody else\'s. Pick another.',
    preview: 'Your first flyer'
  };
  SB.Content.ui.band = {
    nameField: 'Band name',
    genre: 'What does it sound like?',
    help: 'It goes on the bill as a free local act. It plays for nothing and brings some friends.',
    done: 'That\'s my band',
    none: 'I don\'t have one',
    needName: 'Type your band\'s name to go on.',
    blocked: 'That name is somebody else\'s. Pick another.'
  };
  SB.Content.ui.setup = {
    back: 'Back to the map',
    bad: 'The game could not start.'
  };

  /* the first time through: a note on each screen of the way in says what it is for, what each thing on it means and
   * what to press, and the tutorial's tape (SB.UI.story.point) points at that thing. Shown until a career has begun. */
  SB.Content.ui.guide = {
    k: 'How to start',
    step: 'Step {n} of {of}',
    label: 'How to start, step {n} of {of}',
    start: ['New here? Press YOUR SHOW GOES HERE to start.',
            'You will pick a town. Then you are at the last show of the person handing you the scene, and what you answer them sets up your game: your booking name, and how hard you want it.'],
    startTapes: 'The cassette tapes are saved games. Press one to pick up where you left off.',
    city: ['Pick the town you will book shows in.',
           'Click a dot on the map or a card in the list. The postcard tells you about that town: how big it is, what is hard about booking there, and what kinds of rooms it has.',
           'First time? Pensacola, marked START HERE, is the best place to learn. When you have picked, press BOOK HERE.'],
    tune: ['Tell the game about this town, if you know it.',
           'The map is real but the scene is a guess. If you know the town, tick what is true and press USE THESE. If you do not, press SKIP THIS. Anything left blank keeps the game\'s own guess.']
  };

  var draft = { slug: null, tune: null, bookingName: '', mark: null, markSeeds: null, flyerBase: null, exp: 'FIRST' };   // exp: 'FIRST' (the walkthrough) or 'BOOKED' (spec 14)
  var TONER = '#141413', PAPER = '#f4f2ea', BONE = '#e7ddc4';

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  /* sizes are stage units: one --p is one px of the old 1280 x 800 layout. A drawing made w by h of them is shown that
   * size on the stage whatever the window; canvases are rastered as finely as the screen shows them. */
  function pu(n) { return 'calc(var(--p) * ' + (Math.round(n * 10) / 10) + ')'; }
  function pxPerP() { return (SB.UI.unit ? SB.UI.unit() : 0.8) * 1.25; }
  function dpr() { return Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1); }
  /* a drawn piece shown w units wide, keeping its proportions */
  function fit(el, w) { if (el && el.style) { el.style.width = pu(w); el.style.height = 'auto'; } return el; }
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
    var list = ['city'].concat(hasTune(slug) ? ['tune'] : []).concat(['show']), n = list.indexOf(route) + 1;   // the last step is the going-away show
    return { n: n, of: list.length };
  }
  /* the note: typed on a strip of bone paper, the same as the walkthrough's texts on the desk */
  function guide(route, slug, extra) {
    var G = SB.Content.ui.guide, lines = (G[route] || []).slice(), st = route === 'start' ? null : stepOf(route, slug);
    if (!guideOn() || !lines.length) return null;
    if (extra) lines.push(extra);
    return h('aside', { class: 'st-guide pz-paper', role: 'note', aria: { label: st ? SB.text.render(G.label, st, null) : G.k } }, [
      h('p', { class: 'st-guide-k' }, [
        h('span', { class: 'st-guide-tag', text: G.k.toUpperCase() }),
        st ? h('span', { class: 'st-guide-n', text: SB.text.render(G.step, st, null).toUpperCase() }) : null
      ]),
      lines.map(function (t, i) { return h('p', { class: 'st-guide-t' + (i === 0 ? ' is-lead' : ''), text: t }); })
    ]);
  }
  function reduced() { try { return SB.UI.prefs.reduced(); } catch (e) { return true; } }
  function drawn() { return !!(SB.DeskKit && SB.UI.cuDraw); }
  function svgOf(inner, w, ht, vb) {   // attribute sizes only: the box that holds it sets the shown size (width 100% in css)
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
  /* play one of the shared moves (js/ui/finish.js: 'slap', 'stamp') on an element; they switch themselves off under reduced motion */
  function hit(el, name, o) {
    if (!el || !el.classList) return;
    if (SB.Finish && SB.Finish.move) SB.Finish.move(el, name, o);
  }
  /* the pieces of a screen slap down one after another when it opens (the first at stagger place `from`) */
  function slapIn(list, from) {
    var F = SB.Finish, els = (list || []).filter(Boolean);
    if (!F) return;
    F.stagger(els, from || 0);
    els.forEach(function (el) { el.classList.add('mv-slap'); });
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
    if (!drawn()) return h('button', { type: 'button', class: 'st-plain pz-hl', data: { fk: fk }, disabled: !!o.disabled, on: { click: onClick }, text: text });
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
  function openState(st, slot, fail, savedAt) {
    try {
      SB.Cities.load(st.citySlug, function (err) {
        if (err) { fail(L('start', 'packBad')); return; }
        try { SB.UI.start(st, slot || null); } catch (e) { fail(L('start', 'loadBad')); return; }
        /* Continue: say where the game stands (night, days to each show, steps done, the next one, when it was saved) (fix-list 4.4) */
        try { if (savedAt !== undefined && SB.UI.story && SB.UI.story.welcomeBack) SB.UI.story.welcomeBack(st, savedAt); } catch (e2) { SB.log('warn', 'SB.UI.start', 'welcome back: ' + (e2 && e2.message)); }
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
      try { cv = SB.Flyer.thumb(s.recipe, s.spec, Math.round(w * pxPerP())); } catch (e) { cv = null; }
      if (!cv) return;
      cv.style.width = '100%'; cv.style.height = '100%';
      el = h('div', { class: 'st-fly' + (still ? '' : ' mv-slap'), style: {
        left: slot ? slot.x + '%' : f(r.range(-4, 90)) + '%', top: slot ? slot.y + '%' : f(r.range(58, 82)) + '%', width: pu(w), height: pu(ht),
        '--rot': slot ? slot.rot + 'deg' : f(r.range(-9, 9)) + 'deg' } }, [cv]);
      if (drawn()) { fx = h('span', { class: 'st-fly-fx', html: fastener(r, w, ht), style: { width: pu(w + 40) } }); el.appendChild(fx); }
      if (burst && !still) el.style.setProperty('--mv-d', (700 + (n - 1) * 90) + 'ms');
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
    return { svg: out, svg2: two, w: W, h: H };
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
  /* "saved 2 minutes ago" from a slot's savedAt (slot metadata only; '' when the save has none) */
  function agoText(ms) {
    var m, h2, d;
    if (typeof ms !== 'number' || !isFinite(ms)) return '';
    m = Math.floor((Date.now() - ms) / 60000);
    if (m < 1) return L('start', 'agoNow');
    if (m < 60) return L('start', m === 1 ? 'agoMin1' : 'agoMin', { n: m });
    h2 = Math.floor(m / 60);
    if (h2 < 24) return L('start', h2 === 1 ? 'agoHour1' : 'agoHour', { n: h2 });
    d = Math.floor(h2 / 24);
    return L('start', d === 1 ? 'agoDay1' : 'agoDay', { n: d });
  }
  /* "Wed night, show in 9 days": what a save is sitting at, so it is not known by a code (fix-list 3.8) */
  function sitsAt(x) {
    var d = x && x.dow ? x.dow + ' night' : '', n = x && typeof x.showIn === 'number' ? x.showIn : null;
    if (!d && n === null) return '';
    return d + (d ? ', ' : '') + (n === null ? 'no show booked' : n === 0 ? 'show tonight' : n === 1 ? 'show tomorrow' : 'show in ' + n + ' days');
  }
  function tapeArt(s, i) {
    var k = K(), W = 300, H = 178, out = '', name = String(s.bookingName || L('start', 'noName')).toUpperCase(), town = String(s.cityName || s.city || '').toUpperCase(),
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
      openState(r.state, s.slot, fail, s.savedAt);
    }
    function tape(s, i, wide) {
      var a = drawn() ? tapeArt(s, i) : null, label = L('start', 'cont') + ': ' + (s.bookingName || L('start', 'noName')) + ', ' + (s.cityName || s.city || '') + ', ' + L('start', 'contWeek', { n: (s.week || 0) + 1 }) + (sitsAt(s) ? ', ' + sitsAt(s) : '') + (agoText(s.savedAt) ? ', ' + agoText(s.savedAt) : '');
      return h('li', { class: 'st-tape', style: { '--rot': f(SB.rng.make('tr:' + s.slot).range(-5, 5)) + 'deg' } }, [
        h('button', { type: 'button', class: 'cb-thing st-tape-btn', aria: { label: label }, data: { fk: 'tape-' + s.slot }, on: { click: function () { cont(s); } } },
          a ? fit(art(a.svg, a.w, a.h), wide ? 150 : 200) : h('span', { text: label })),
        agoText(s.savedAt) ? h('span', { class: 'st-tape-ago', text: agoText(s.savedAt), aria: { hidden: 'true' } }) : null]);
    }
    function tapes() {
      var few = list.slice(0, 3), rest = list.slice(3);
      SB.UI.clear(tapesBox);
      if (!list.length) { tapesBox.appendChild(Kt().card({ paper: 'kraft', torn: true, tape: ['tl'], rot: -1, cls: 'st-nonecard' }, [h('p', { class: 'kt-type st-none', text: L('start', 'noSaves') })])); return; }
      tapesBox.appendChild(h('ul', { class: 'st-tapes', aria: { label: L('start', 'tapes') } }, few.map(tape)));
      if (rest.length) {
        keepFocus(function () {
          tapesBox.appendChild(slipBtn(showAll ? L('start', 'fewTapes') : L('start', 'allTapes', { n: list.length }), 'tapes-all', function () { showAll = !showAll; keepFocus(tapes); }));
          if (showAll) {
            var all = h('ul', { class: 'st-tapes st-tapes--all', aria: { label: L('start', 'tapes') } }, rest.map(function (s, i) { return tape(s, i + 3, true); }));
            tapesBox.appendChild(all);
            if (SB.Finish && SB.Finish.scrollbar) SB.Finish.scrollbar(all);
          }
        });
      }
    }
    function imp() {
      SB.UI.clear(importBox);
      importBox.appendChild(slipBtn(L('start', 'importStrip'), 'import', function () { showImport = !showImport; keepFocus(imp); if (showImport && ta) try { ta.focus(); } catch (e) { /* fine */ } }));
      if (!showImport) return;
      ta = ta || h('textarea', { class: 'st-import-ta pz-hl', rows: '4', aria: { label: L('start', 'importK') } });
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
    var t = drawn() ? titleArt() : null, w = drawn() ? wayArt() : null, F = SB.Finish, el, way, titleEl, subEl, guideEl, smallEl, wallEl;
    tapesBox = h('div', { class: 'st-tapebox' });
    importBox = h('div', { class: 'st-importbox' });
    wallEl = wall(tm);
    titleEl = h('h1', { class: 'st-title', aria: { label: L('start', 'title') } }, t ? [fit(art(t.svg, t.w, t.h, 'st-title-art st-title-a'), 640), fit(art(t.svg2, t.w, t.h, 'st-title-art st-title-b'), 640)] : L('start', 'title'));
    subEl = h('p', { class: 'st-sub' }, h('span', { class: 'pz-paper', text: L('start', 'sub') }));
    guideEl = guide('start', null, list.length ? SB.Content.ui.guide.startTapes : null);
    smallEl = h('div', { class: 'st-small' }, [importBox, slipBtn(L('start', 'settings'), 'settings', function () { SB.UI.go('settings'); })]);
    /* the one loud thing: your show goes here, big and crooked, stamped on after the title lands */
    way = h('button', { type: 'button', class: 'cb-thing st-way pz-hl', aria: { label: L('start', 'newLabel') }, data: { fk: 'new' }, on: { click: function () { SB.UI.go('city'); } } }, [
      w ? fit(art(w.svg, w.w, w.h), 400) : h('span', { text: L('start', 'newScene') })
    ]);
    el = h('div', { class: 'sb-stage st st-start' }, [
      wallEl,
      h('div', { class: 'st-front' }, [
        h('div', { class: 'st-left' }, [titleEl, subEl, guideEl, tapesBox, smallEl, msg
          /* what is playing is on the pocket player (js/ui/musicbar.js), on every screen */
        ]),
        h('div', { class: 'st-right' }, [way])
      ])
    ]);
    root.appendChild(el);
    tapes(); imp();
    if (F) {
      slapIn([titleEl, subEl, guideEl, tapesBox, smallEl], 0);
      F.move(way, 'stamp', { delay: 520, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: way } });
    }
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
    inner += '<clipPath id="st-us-clip"><path d="' + edge + '"/></clipPath><path d="' + SB.stateLinesD(MAP.x, MAP.y) + '" clip-path="url(#st-us-clip)" fill="none" stroke="' + TONER + '" stroke-opacity=".8" stroke-width="2.4" stroke-linejoin="round" stroke-dasharray="12 4 2.5 4"/>';
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
  /* State shapes on the road map. The game has no state outlines, only the dashed lines it draws, so the shapes are
   * the closed areas those lines and the coast cut the land into (SB.lineFaces), each named for the state with the
   * most towns inside it. Clicks and outlines use the same shapes, so what lights up is what was clicked.
   * Alaska and Hawaii are their inset boxes. */
  var STATE_GEO = null;
  function inside(poly, x, y) {
    var on = false, i, j;
    for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      if ((poly[i][1] > y) !== (poly[j][1] > y) && x < (poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) on = !on;
    }
    return on;
  }
  function stateGeo(pts) {
    if (STATE_GEO) return STATE_GEO;
    var pr = function (c) { var q = SB.geo.project(c[0], c[1]); return [q.x + MAP.x, q.y + MAP.y]; };
    var land = US48.map(pr), shapes = {}, owned = {}, faces = [], low48, loose = [];
    /* borders the map does not draw: through Lake Superior and down Lake Michigan (so the Upper Peninsula stays
       Michigan), and up New York harbor (so the city is New York, not New Jersey) */
    var water = [[[46.7, -92.1], [47.3, -90.6], [48.3, -89.6]], [[45.1, -87.6], [44.6, -87.05], [42.5, -87.05], [41.76, -87.25]],
                 [[41, -73.9], [40.75, -74.05], [40.55, -74.05]]].map(function (run) { return run.map(pr); });
    try { faces = SB.lineFaces ? SB.lineFaces(SB.stateLinesPts(MAP.x, MAP.y).concat(water, [land]), 20) : []; } catch (e) { faces = []; }
    low48 = pts.filter(function (q) { return q.e.slug !== 'anchorage-ak' && !/HI$/.test(q.e.state); });
    function add(code, poly) { (shapes[code] = shapes[code] || []).push(poly); owned[code] = true; }
    faces.forEach(function (poly) {
      var n = {}, best = null;
      if (Math.abs(poly.reduce(function (s, a, i) { var b = poly[(i + 1) % poly.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) < 40) return;   /* slivers */
      low48.forEach(function (q) { if (inside(poly, q.x, q.y)) n[q.e.state] = (n[q.e.state] || 0) + 1; });
      Object.keys(n).forEach(function (c) { if (!best || n[c] > n[best]) best = c; });
      if (best) add(best, poly); else loose.push(poly);
    });
    /* a shape with no town inside (North Dakota, Maine: their dots sit on the line or past the rough coast) goes to the
       nearest town whose state has no shape yet, or else to the nearest town */
    loose.forEach(function (poly) {
      var cx = 0, cy = 0, pick = function (list) { var b = null, bd = Infinity; list.forEach(function (q) { var d = Math.hypot(q.x - cx, q.y - cy); if (d < bd) { bd = d; b = q; } }); return b; }, q;
      poly.forEach(function (p) { cx += p[0] / poly.length; cy += p[1] / poly.length; });
      q = pick(low48.filter(function (t) { return !owned[t.e.state]; })) || pick(low48);
      if (q) add(q.e.state, poly);
    });
    pts.forEach(function (p) {
      if (p.e.slug !== 'anchorage-ak' && !/HI$/.test(p.e.state)) return;
      add(p.e.state, [[p.x - 34, p.y - 30], [p.x + 34, p.y - 30], [p.x + 34, p.y + 22], [p.x - 34, p.y + 22]]);
    });
    STATE_GEO = { land: land, shapes: shapes, d: {} };
    return STATE_GEO;
  }
  function stateAt(pts, x, y) {
    var g = stateGeo(pts), code, i, near = null, nd = Infinity;
    for (code in g.shapes) for (i = 0; i < g.shapes[code].length; i++) if (inside(g.shapes[code][i], x, y)) return code;
    if (!inside(g.land, x, y)) return null;
    /* a sliver no shape covers: the nearest town's state */
    pts.forEach(function (q) { var d = Math.hypot(q.x - x, q.y - y); if (d < nd) { nd = d; near = q; } });
    return near ? near.e.state : null;
  }
  /** SVG path data for a state's outline. */
  function stateD(pts, code) {
    var g = stateGeo(pts);
    if (!g.shapes[code]) return '';
    if (!g.d[code]) g.d[code] = g.shapes[code].map(function (poly) { return K().polyD(poly); }).join('');
    return g.d[code];
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
    var sel = draft.slug || 'pensacola', stage, mapWrap, mapHead, rackCol, q = '', status = null, guideBox = h('div', { class: 'st-guidebox' }), mapBox, over, rackBox, rackBar, cardBox, search, alive = true, pts = [], shown = false,
        stF = null, countBox = h('div', { class: 'st-countrow' });   /* stF: the state clicked on the map; the list shows only its towns */
    function probed(slug) { if (!alive) return; if (slug === sel) drawCard(false); drawRack(); }
    function drawOver() {
      if (!over) return;
      var p = pts.filter(function (x) { return x.e.slug === sel; })[0], out = '', d;
      /* the clicked state: highlighter over it, gone round in red marker */
      if (stF && (d = stateD(pts, stF))) out += '<path class="st-state-on" d="' + d + '" fill="' + K().ink('fluorYellow') + '" fill-opacity=".38" stroke="' + K().ink('fireRed') + '" stroke-width="4.2" stroke-linejoin="round"/>';
      if (p) out += circled(p.x, p.y, townInk(p.e));
      over.innerHTML = out + '<g class="st-hover"></g>';
    }
    function drawGuide() { if (!guideBox) return; SB.UI.clear(guideBox); var g = guide('city', sel); if (g) guideBox.appendChild(g); }
    function drawCard(land) {
      drawGuide();
      SB.UI.clear(cardBox);
      var c = card();
      cardBox.appendChild(c);
      /* the postcard is the hero: stamped on when a town is picked, and when the screen opens */
      if (land) { hit(c, 'stamp', shown ? { cue: 'stamp', cueAt: 83, cueOpts: { gain: -7, el: c } } : { delay: 260, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: c } }); shown = true; }
    }
    function drawRack() { if (!rackBox) return; keepFocus(function () { SB.UI.clear(rackBox); rackBox.appendChild(rack()); if (rackBar) rackBar.place(); }); }
    function choose(slug) {
      if (slug === sel) return;
      sel = slug; status = null; probe(slug, probed);
      drawOver(); drawCard(true); drawRack();
    }
    function mapAt(ev) {
      var r = over.getBoundingClientRect();
      if (!r || !r.width) return null;
      return { x: (ev.clientX - r.left) / r.width * MAP.w, y: (ev.clientY - r.top) / r.height * MAP.h };
    }
    function nearest(ev) {
      var at = mapAt(ev), best = null, bd = 22;
      if (!at) return null;
      pts.forEach(function (p) { var d = Math.hypot(p.x - at.x, p.y - at.y); if (d < bd) { bd = d; best = p; } });
      return best;
    }
    function stateUnder(ev) { var at = mapAt(ev); return at ? stateAt(pts, at.x, at.y) : null; }
    /* the line over the list: how many towns, and with a state picked, its name and a way back to all of them */
    function drawCount() {
      var n;
      SB.UI.clear(countBox);
      if (!stF) { countBox.appendChild(Kt().label(L('city', 'count', { n: (SB.CityIndex || []).length }), null, { cls: 'st-count' })); return; }
      n = cities().filter(function (e) { return e.state === stF; }).length;
      countBox.appendChild(Kt().label(SB.Cities.stateName(stF) || stF, n === 1 ? L('city', 'stateCountOne') : L('city', 'stateCount', { n: n }), { cls: 'st-count' }));
      countBox.appendChild(Kt().button({ label: L('city', 'allTowns'), fk: 'city-all', cls: 'st-alltowns', on: function () { setState(null); try { search.focus(); } catch (e) { /* fine */ } } }));
    }
    function setState(code) {
      if (code === stF) return;
      stF = code;
      drawCount(); drawOver();
      if (rackBox) { drawRack(); rackBox.scrollTop = 0; }
    }
    function rack() {
      /* `aka` in the index holds the other names people type for a town (NYC, San Francisco, St. Paul) */
      var fold = function (s) { return String(s || '').toLowerCase().replace(/[.,']/g, '').replace(/\s+/g, ' ').trim(); };
      var n = fold(q), items = cities().filter(function (e) {
        if (stF && e.state !== stF) return false;
        return !n || fold(e.name + ' ' + e.state + ' ' + SB.Cities.stateName(e.state) + ' ' + (e.aka || '')).indexOf(n) >= 0;
      });
      if (!items.length) return h('p', { class: 'st-typed st-none', text: L('city', 'none') });
      return roving(h('ul', { class: 'st-rack', role: 'listbox', aria: { label: L('city', 'title') } }, items.map(function (e, i) {
        var on = e.slug === sel, ps = packState(e.slug);
        return h('li', { role: 'presentation' }, Kt().slip({ role: 'option', on: on, label: e.name + ', ' + e.state, fk: 'city-' + e.slug, seed: 'city-' + e.slug,
          cls: 'st-rackcard' + (ps === 'no' ? ' is-no' : ''), struck: ps === 'no', paper: i % 2 ? 'white' : 'bone',
          tag: e.slug === 'pensacola' ? L('city', 'first') : (e.featured ? L('city', 'featured') : null), note: e.thin ? L('city', 'thinTag') : null,
          click: function () { choose(e.slug); }, keydown: rackKey }));
      })));
    }
    /* one tab stop for the whole list (the picked town); arrows move inside it, so BOOK HERE is a short Tab away (fix list 0.9) */
    function roving(ul) {
      var cards = Array.prototype.slice.call(ul.querySelectorAll('.st-rackcard')), at = null;
      cards.forEach(function (c) { if (!at && c.classList.contains('is-on')) at = c; });
      at = at || cards[0];
      cards.forEach(function (c) { c.setAttribute('tabindex', c === at ? '0' : '-1'); });
      ul.addEventListener('focusin', function (ev) {
        var t = ev.target;
        if (!t || !t.classList || !t.classList.contains('st-rackcard')) return;
        cards.forEach(function (c) { c.setAttribute('tabindex', c === t ? '0' : '-1'); });
      });
      return ul;
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
    /* the postcard's tags, each with a plain gloss on hover or tap (fix list 3.9) */
    var TRAIT_GLOSS = {
      COLLEGE: 'A university in town, so lots of 18 to 22 year olds, and a lot of them leave in the summer.',
      MILITARY: 'A military base nearby, so people move in and out and young adults with a paycheck are around.',
      TOURIST: 'Busy with visitors in season and quiet the rest of the year; rooms book up with tourists.',
      CAPITAL: 'The state capital, so offices, a university and more going on than a town this size usually has.',
      PORT: 'A shipping port, with working-class neighborhoods and late-shift crowds.',
      COASTAL: 'On the coast, which means beaches in summer and storms now and then.',
      HURRICANE: 'Hurricanes can hit in late summer and fall. A show can get cancelled, and so can the week after it.',
      SNOW: 'Real winters: snow and ice can keep people home or keep bands off the road.',
      CHURCHED: 'Lots of churchgoing, so Sunday plans matter and some places are touchy about all-ages shows.',
      BORDER: 'Right at the border, so there are bands and crowds from both sides.',
      MILL: 'An old mill town, with factory-shift crowds and not much money to spare.',
      TRANSIT: 'The buses run late or stop early, so people without cars have trouble getting to shows.',
      REMOTE: 'A long drive from anywhere, so touring bands have to want to come.',
      DESERT: 'Desert: hot days, far between towns, and shows that start late.',
      MOUNTAIN: 'In the mountains, so roads can close and the drive is part of the night.',
      RIVER: 'A river town, with the old downtown near the water.'
    }, SIZE_GLOSS = { SMALL: 'A small town: few rooms, few bands, and everybody knows each other.', MID: 'A mid-sized town: a handful of rooms and a few dozen bands.', LARGE: 'A big town: many rooms and bands, and more competition for the same crowd.', HUGE: 'A huge city: dozens of rooms and a big scene, with a lot going on the same night.' };
    function tag(text, gloss) { return h('span', { class: 'st-tag', tabindex: '-1', data: { tip: gloss || '' }, text: text }); }   /* not a Tab stop: a postcard has ~8 of them and they stood between the list and BOOK HERE (fix list 0.9) */
    function tagLine(e) {
      var out = [], bits = [tag(L('city', 'size.' + e.size), SIZE_GLOSS[e.size])];
      (e.traits || []).forEach(function (t) { bits.push(tag(word('trait.' + t, t.toLowerCase()), TRAIT_GLOSS[t])); });
      bits.forEach(function (b, i) { if (i) out.push(' · '); out.push(b); });
      return out;
    }
    function roomsLine(kinds) {
      return Object.keys(kinds).map(function (k) {
        var nm = word('room.' + k + '.name', k.toLowerCase()).replace(/^an? /, ''), n = kinds[k];
        nm = k === 'OUTDOOR' ? 'outdoors' : (n === 1 ? nm : nm + 's');
        return n + ' ' + nm;
      }).join(', ');
    }
    function packBits(slug) {
      var p = null, kinds = {}, out = [];
      if (!SB.Cities.isLoaded(slug)) return null;
      try { p = SB.Cities.get(slug); } catch (e) { return null; }
      (p.rooms || []).forEach(function (r) { kinds[r.kind] = (kinds[r.kind] || 0) + 1; });
      if ((p.zones || []).length > 1) out.push(h('p', { class: 'st-typed' }, [h('b', { text: L('city', 'feeders') + ': ' }),
        p.zones.slice(1).map(function (z) { return z.name; }).filter(Boolean).join(', ')]));
      if (Object.keys(kinds).length) out.push(h('p', { class: 'st-typed st-small-t' }, [h('b', { text: L('city', 'rooms') + ': ' }),
        roomsLine(kinds)]));
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
      return h('article', { class: 'st-post pz-paper', aria: { label: e.name + ', ' + e.state } }, [
        Kt().photo({ id: 'crowd-02', w: 330, h: 112, paper: POST_PAPER[e.paper] || 'canary', tape: [{ at: 'top', w: 70 }], rot: 1, seed: 'city-post', cls: 'st-postphoto' }),
        h('div', { class: 'st-post-head' }, [
          drawn() ? head(e.name, 54, 280) : h('b', { text: e.name }),
          h('span', { class: 'st-typed st-post-st', text: e.state })
        ]),
        h('h2', { class: 'cb-sr', text: e.name + ', ' + e.state }),
        h('div', { class: 'st-post-body' }, [   /* scrolls on its own so BOOK HERE and Back never fall off the bottom */
        h('p', { class: 'st-typed st-small-t' }, tagLine(e)),
        drawn() ? swatch(e) : null,
        e.blurb ? h('p', { class: 'st-typed st-small-t', text: e.blurb }) : null,
        e.hard ? h('p', { class: 'st-typed st-hard' }, [h('b', { text: L('city', 'hard') + ': ' }), e.hard]) : null,
        e.thin ? h('p', { class: 'st-typed st-quiet', text: L('city', 'thin') }) : null,
        packBits(sel),
        ps === 'no' ? h('div', { class: 'st-unwritten', role: 'status' }, [drawn() ? art(D().stamp(L('city', 'unwrittenStamp'), 6, 8, 20, { rot: -4, ink: K().ink('fireRed') }), D().stampW(L('city', 'unwrittenStamp'), 20) + 20, 56) : null,
          h('p', { class: 'st-typed', text: L('city', 'unwritten') })]) :
          (ps === 'checking' ? h('p', { class: 'st-typed st-quiet', role: 'status', text: L('city', 'checking') }) : null),
        status && ps !== 'no' ? (status === 'loading' ? h('p', { class: 'st-typed st-quiet', text: L('city', 'loading') }) : errLine(status)) : null
        ]),
        expChoice(),
        h('div', { class: 'st-acts' }, [
          Kt().button({ label: L('city', 'pick'), say: L('city', 'pick') + ': ' + e.name, kind: 'primary', big: 24, fk: 'city-pick', disabled: !ready, on: pick }),
          Kt().button({ label: L('city', 'back'), fk: 'city-back', on: function () { SB.UI.go('start'); } })
        ])
      ]);
    }
    /* the one question before the game (spec 14): have you booked a show before? First-timers get the walkthrough and
       are asked how to play after their first show; the others skip it and are asked in the opening. Kept in the draft. */
    function expChoice() {
      var box = h('div', { class: 'st-exp', role: 'radiogroup', aria: { label: L('city', 'expK') } }), note = h('p', { class: 'st-typed st-small-t st-exp-note', aria: { live: 'polite' } });
      function draw() {
        var booked = draft.exp === 'BOOKED';
        SB.UI.clear(box);
        [['FIRST', 'expFirst'], ['BOOKED', 'expBooked']].forEach(function (o) {
          var on = (o[0] === 'BOOKED') === booked;
          box.appendChild(h('button', { type: 'button', role: 'radio', class: 'st-exp-opt pz-hl' + (on ? ' is-on' : ''), aria: { checked: on ? 'true' : 'false' }, data: { fk: 'exp-' + o[0].toLowerCase() },
                                        on: { click: function () { if (draft.exp === o[0]) return; draft.exp = o[0]; draw(); var b = box.querySelector('.is-on'); if (b) try { b.focus(); } catch (e) { /* fine */ } } } },
                            [h('span', { class: 'st-exp-tick', aria: { hidden: 'true' }, text: on ? 'X' : '' }), h('span', { text: L('city', o[1]) })]));
        });
        note.textContent = L('city', booked ? 'expBookedNote' : 'expFirstNote');
      }
      draw();
      return h('div', { class: 'st-expbox' }, [box, note]);
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
          if (qs.length) SB.UI.go('tune', { slug: slug }); else goShow(function (t) { status = t; drawCard(false); });
        });
      } catch (e) { status = L('start', 'packBad'); drawCard(false); }
    }
    var findField = Kt().input({ label: L('city', 'search'), type: 'search', placeholder: L('city', 'search') + '…', fk: 'city-find', cls: 'st-findfield',
                                 onInput: function (v) { q = v; if (stF && v) { stF = null; drawCount(); } SB.UI.clear(rackBox); rackBox.appendChild(rack()); rackBox.scrollTop = 0; if (rackBar) rackBar.place(); },
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
      mapBox.appendChild(fit(art(m.svg, m.w, m.h, 'st-map-art'), 540));
      if (mapBox.insertAdjacentHTML) mapBox.insertAdjacentHTML('beforeend', '<svg class="st-map-over" viewBox="0 0 ' + MAP.w + ' ' + MAP.h + '" aria-hidden="true" focusable="false">' + K().defs() + '</svg>');
      over = mapBox.querySelector ? mapBox.querySelector('.st-map-over') : null;
      if (over && over.addEventListener) {
        /* a click anywhere in a state shows only that state's towns; a click on a dot also picks the town */
        over.addEventListener('click', function (ev) {
          var p = nearest(ev), s = p ? p.e.state : stateUnder(ev);
          if (s) setState(s);
          if (p) choose(p.e.slug);
        });
        over.addEventListener('mousemove', function (ev) {
          var p = nearest(ev), g = over.querySelector('.st-hover'), s, at, t, w, line = '';
          if (!g) return;
          s = p ? p.e.state : stateUnder(ev);
          if (p) { t = p.e.name.toUpperCase(); at = { x: p.x, y: p.y }; }
          else if (s) { t = (SB.Cities.stateName(s) || s).toUpperCase(); at = mapAt(ev); }
          over.style.cursor = t ? 'pointer' : '';
          if (!t) { g.innerHTML = ''; return; }
          /* the state under the pointer, traced in toner (the clicked one already has its red line) */
          if (s && s !== stF) line = '<path class="st-state-hover" d="' + stateD(pts, s) + '" fill="' + TONER + '" fill-opacity=".07" stroke="' + TONER + '" stroke-width="3.4" stroke-linejoin="round"/>';
          w = K().typeWidth(t, 14) + 16;
          g.innerHTML = line + '<path d="M' + f(at.x + 12) + ' ' + f(at.y - 30) + 'h' + f(w) + 'v24h' + f(-w) + 'Z" fill="' + TONER + '"/>' +
            K().type(t, at.x + 20, at.y - 13, 14, { fill: PAPER, bold: true });
        });
        over.addEventListener('mouseleave', function () { var g = over.querySelector('.st-hover'); if (g) g.innerHTML = ''; });
      }
    }
    rackBox = h('div', { class: 'st-rackbox' });
    cardBox = h('div', { class: 'st-cardbox' });
    mapWrap = h('div', { class: 'st-mapwrap' }, [mapBox]);
    mapHead = h('h1', { class: 'st-head', aria: { label: L('city', 'title') } }, drawn() ? D().word(L('city', 'title'), 40, { halo: PAPER }) : L('city', 'title'));
    rackCol = h('div', { class: 'st-rackcol' }, [
      Kt().card({ paper: 'white', seed: 'st-find', rot: 0.8, tape: [{ at: 'tl', w: 64 }], cls: 'st-findcard' }, [findField]),
      countBox,
      rackBox
    ]);
    stage = h('div', { class: 'sb-stage st st-city' }, [
      h('div', { class: 'st-citygrid' }, [
        h('div', { class: 'st-mapcol' }, [mapHead, guideBox, mapWrap]),
        rackCol,
        h('div', { class: 'st-cardcol' }, [cardBox])
      ])
    ]);
    root.appendChild(stage);
    rackBar = SB.Finish && SB.Finish.scrollbar ? SB.Finish.scrollbar(rackBox) : null;
    slapIn([mapHead, guideBox, mapWrap, rackCol], 0);
    probe(sel, probed);
    drawOver(); drawCard(true); drawCount(); rackBox.appendChild(rack());
    try { search.focus(); } catch (e) { /* fine */ }
    point(function () { return byFk(root, 'city-pick'); });
    return { unmount: function () { alive = false; point(null); } };
  }

  /* ---------------------------------------------------------------- */
  /* tune                                                             */
  /* ---------------------------------------------------------------- */

  function tickBox(o) {
    if (!drawn()) return h('button', { type: 'button', class: 'st-plain pz-hl', aria: { pressed: String(!!o.on) }, data: { fk: o.fk }, on: { click: o.onClick }, text: (o.on ? '[x] ' : '[ ] ') + o.text });
    return D().tickThing(o);
  }

  function mountTune(root, params) {
    var slug = (params && params.slug) || draft.slug, qs = [], ans = {}, form, body, stage, e = entry(slug);
    try { qs = SB.Cities.questions(slug); } catch (err) { qs = []; }
    if (draft.tune && draft.slug === slug) ans = SB.util.copy(draft.tune);
    function fail(t) { if (body) body.appendChild(errLine(t)); }
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
    body = h('div', { class: 'st-scrollbody' }, [
      guide('tune', slug),
      word('tune.intro', '') && !guideOn() ? h('p', { class: 'kt-pencil st-help', text: word('tune.intro', '') }) : null,
      form
    ]);
    stage = h('div', { class: 'sb-stage st st-tune' }, [
      h('div', { class: 'st-namegrid' }, [
        Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.6, cls: 'st-form st-tunesheet' }, [
          Kt().headline(L('tune', 'title') + (e ? ': ' + e.name : ''), { size: 34, max: 560, tag: 'h1', cls: 'st-head' }),
          body,
          h('div', { class: 'st-acts' }, [
            Kt().button({ label: SB.text.label('ui.tune.use') + ' →', kind: 'primary', big: 24, fk: 'tune-use', on: function () {
              var t = {}, k;
              for (k in ans) if (ans[k] !== undefined && !(Array.isArray(ans[k]) && !ans[k].length)) t[k] = ans[k];
              draft.tune = Object.keys(t).length ? t : null; draft.slug = slug;
              goShow(fail);
            } }),
            Kt().button({ label: word('tune.skip', 'Skip'), fk: 'tune-skip', on: function () { draft.tune = null; draft.slug = slug; goShow(fail); } }),
            Kt().button({ label: L('tune', 'back'), fk: 'tune-back', on: function () { SB.UI.go('city'); } })
          ])
        ]),
        h('div', { class: 'st-tunepic' }, [
          Kt().photo({ ids: ['crowd-02'], w: 330, h: 430, paper: 'canary', tape: ['tl'], rot: 1.8, seed: 'tune-pic' })
        ])
      ])
    ]);
    root.appendChild(stage);
    if (SB.Finish && SB.Finish.scrollbar) SB.Finish.scrollbar(body);
    slapIn([stage.querySelector('.st-tunesheet'), stage.querySelector('.st-tunepic')], 0);
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

  /* d: the draft being named (the start screen's own, or the one the flyer desk hands the name sheet). d.spec, when
     the flyer desk gives one, is the real show's flyer: the preview is that flyer with the name on it. */
  function myFlyer(name, width, d) {
    var s, spec, rec, k, i, cv, e;
    d = d || draft; e = d.spec ? null : entry(d.slug);
    if (!d.flyerBase) d.flyerBase = Date.now().toString(36);
    if (!SB.Flyer || typeof document === 'undefined') return null;
    try {
      if (d.spec) spec = JSON.parse(JSON.stringify(d.spec));
      else { s = SB.Flyer.sample('mine:' + d.flyerBase); spec = s.spec; }
      spec.presenter = name;
      spec.mark = Object.assign({}, spec.mark || {}, d.mark || {});
      if (e) spec.style = { inks: e.inks || [], papers: e.paper ? [e.paper] : [], cityInks: e.inks || [], cityPaper: e.paper || null };
      rec = SB.Flyer.recipe(spec);
      k = Math.floor(String(name).replace(/\s+/g, '').length / 3);
      for (i = 0; i < k; i++) rec = SB.Flyer.roll(rec, spec, ['layout', 'type', 'ink', 'paper', 'picture']);
      cv = document.createElement('canvas');
      SB.Flyer.render(cv, rec, spec, { width: Math.round(width * pxPerP()), dpr: dpr() });
      cv.style.width = pu(width); cv.style.height = 'auto';
      cv.setAttribute('role', 'img');
      cv.setAttribute('aria-label', SB.Flyer.text(spec));
      return { canvas: cv, k: k };
    } catch (err) { return null; }
  }

  /* ---------------------------------------------------------------- */
  /* name                                                             */
  /* ---------------------------------------------------------------- */

  /* the hands a booking name can be lettered in: the flyer's own hand-drawn letters (SB.Skeleton), and the typewriter */
  var LETTERINGS = ['marker', 'block', 'stencil', 'bubble', 'drip', 'typewriter'];
  /** The name drawn in one lettering, as a canvas sized to its box (the picker on the name sheet). */
  function letteringArt(text, t) {
    var cv, ctx, size = 30, pad = 10, w, hgt = 56, d = dpr(), sc = pxPerP() * d, tw;
    text = String(text || '').toUpperCase();
    if (typeof document === 'undefined') return h('span', { text: text });
    cv = document.createElement('canvas');
    try {
      if (t === 'typewriter') {
        ctx = cv.getContext('2d');
        ctx.font = '400 ' + (size * 1.15) + 'px ' + (getComputedStyle(document.documentElement).getPropertyValue('--f-type') || 'monospace');
        tw = ctx.measureText(text).width;
      } else tw = SB.Skeleton.measure(text, size, t, {});
      w = Math.min(330, Math.ceil(tw + pad * 2));
      cv.width = Math.round(w * sc); cv.height = Math.round(hgt * sc);
      ctx = cv.getContext('2d'); ctx.scale(sc, sc);
      if (t === 'typewriter') {
        ctx.font = '400 ' + (size * 1.15) + 'px ' + (getComputedStyle(document.documentElement).getPropertyValue('--f-type') || 'monospace');
        ctx.fillStyle = TONER;
        if (tw > w - pad * 2) { ctx.save(); ctx.translate(pad, 0); ctx.scale((w - pad * 2) / tw, 1); ctx.fillText(text, 0, hgt / 2 + size * 0.4); ctx.restore(); }
        else ctx.fillText(text, pad, hgt / 2 + size * 0.4);
      } else {
        SB.Skeleton.draw(ctx, text, pad, hgt / 2 + size / 2, size, t, { rng: SB.rng.make('lettering:' + t), ink: TONER, paper: PAPER, maxWidth: w - pad * 2 });
      }
    } catch (e) { return h('span', { class: 'st-typed', text: text }); }
    cv.style.width = pu(w); cv.style.height = pu(hgt);
    cv.setAttribute('aria-hidden', 'true');
    return cv;
  }
  function rollMarks() {
    var r = SB.rng.make('marks:' + Date.now().toString(36) + ':' + Math.floor(Math.random() * 1e6)), out = [], i;
    for (i = 0; i < 4; i++) out.push('mk' + r.int(0, 1e9).toString(36));
    return out;
  }
  function ideas() {
    var B = (SB.Content.names && SB.Content.names.booking) || {}, whole = (B.whole || []).slice(), r = SB.rng.make('ideas:' + today() + ':' + Math.random());
    return r.shuffle ? r.shuffle(whole).slice(0, 3) : whole.slice(0, 3);
  }

  /* The name sheet: the booking name typed onto a strip of tape, with the ideas, the lettering dropdown and a flyer
   * reading "<name> presents" beside it, re-rolling its art every few letters. It is asked in two places (spec 14):
   * the first time a first-timer opens the flyer desk (js/art/flyerdesk.js, through SB.UI.setupWidgets.name), and in the
   * opening of somebody who has booked before (GOING_AWAY_name; js/ui/cutscene.js, opts.widgets.name).
   * ctx: { answer(name, mark), draft, doneLabel }. ctx.draft is the caller's own { bookingName, mark, markSeeds,
   * flyerBase, slug, spec } (the start screen's draft when left out); ctx.answer is called with the name and the mark
   * (its treatment is the lettering picked). */
  function nameWidget(box, ctx) {
    var input, msg, marksBox, flyBox, sugg = ideas(), lastK = -1, redraw = null, thumped = null, FW = 250, d = (ctx && ctx.draft) || draft;
    if (!d.markSeeds) d.markSeeds = rollMarks();
    if (!d.mark) d.mark = { v: 1, seed: d.markSeeds[0] };
    if (!d.mark.treatment) d.mark = Object.assign({}, d.mark, { treatment: LETTERINGS[0] });
    function shown() { var n = String((input && input.value) || '').trim(); return n || L('name', 'markBlank'); }
    function flyer() {
      var r = myFlyer(shown(), FW, d), el;
      SB.UI.clear(flyBox);
      if (!r) return;
      el = h('div', { class: 'st-myfly cs-namefly' }, [r.canvas]);
      flyBox.appendChild(el);
      if (lastK === -1) hit(el, 'stamp', { delay: 260 });
      else if (r.k !== lastK) hit(el, 'slap');
      lastK = r.k;
    }
    /* your lettering (user 2026-11-24, in place of the stamps nobody saw again; "there should be a dropdown with alotta
       fonts"): a dropdown of every hand (SB.Lettering), each showing your name. It is kept as the mark's treatment and
       letters the "<name> presents" line on every flyer you make (SB.Flyer). */
    var lpOpen = false, lpOff = null;
    function lpList() {
      return (SB.Lettering && SB.Lettering.list) || LETTERINGS.map(function (id) { return { id: id, name: id, kind: id === 'typewriter' ? 'type' : 'drawn' }; });
    }
    function lpGet(id) { var all = lpList(), i; for (i = 0; i < all.length; i++) if (all[i].id === id) return all[i]; return all[0]; }
    function lpPreview(l) {
      if (l.kind === 'font') return h('span', { class: 'st-lp-font', aria: { hidden: 'true' }, style: { fontFamily: SB.Lettering.family(l.id), fontWeight: String(l.weight) }, text: shown() });
      return letteringArt(shown(), l.id);
    }
    function lpPick(id) {
      d.mark = Object.assign({}, d.mark, { treatment: id });
      lpClose(true);
      if (SB.Lettering) SB.Lettering.ensure(id, function () { flyer(); });
      flyer();
    }
    function lpClose(refocus) {
      lpOpen = false;
      if (lpOff) { document.removeEventListener('mousedown', lpOff, true); lpOff = null; }
      marks();
      if (refocus) { var t = marksBox.querySelector('.st-letterpick'); if (t) try { t.focus(); } catch (e) { /* fine */ } }
    }
    function lpShow() {
      lpOpen = true;
      lpList().forEach(function (l) { if (l.kind === 'font' && SB.Lettering) SB.Lettering.ensure(l.id); });
      marks();
      lpOff = function (e) { if (!marksBox.contains(e.target)) lpClose(false); };
      document.addEventListener('mousedown', lpOff, true);
      var on = marksBox.querySelector('.st-lp-opt.is-on') || marksBox.querySelector('.st-lp-opt');
      if (on) { try { on.focus(); } catch (e) { /* fine */ } if (on.scrollIntoView) on.scrollIntoView({ block: 'nearest' }); }
    }
    function lpKey(e) {
      var all = Array.prototype.slice.call(marksBox.querySelectorAll('.st-lp-opt')), i = all.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); lpClose(true); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); e.stopPropagation();
        i = Math.max(0, Math.min(all.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)));
        if (all[i]) all[i].focus();
      }
      if (e.key === 'Home' && all[0]) { e.preventDefault(); all[0].focus(); }
      if (e.key === 'End' && all.length) { e.preventDefault(); all[all.length - 1].focus(); }
    }
    function marks() {
      var cur = lpGet(d.mark && d.mark.treatment), opts = [], lastKind = null;
      SB.UI.clear(marksBox);
      marksBox.appendChild(h('button', { type: 'button', class: 'st-letterpick pz-hl' + (lpOpen ? ' is-open' : ''), data: { fk: 'lettering' },
                                         aria: { haspopup: 'listbox', expanded: lpOpen ? 'true' : 'false', label: L('name', 'marks') + ': ' + cur.name },
                                         on: { click: function () { if (lpOpen) lpClose(true); else lpShow(); },
                                               keydown: function (e) { if (!lpOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) { e.preventDefault(); lpShow(); } } } },
        [h('span', { class: 'st-lp-prev' }, [lpPreview(cur)]), h('span', { class: 'st-lp-name', text: cur.name }), h('span', { class: 'st-lp-caret', aria: { hidden: 'true' }, text: lpOpen ? '\u25B4' : '\u25BE' })]));
      if (!lpOpen) return;
      lpList().forEach(function (l) {
        var kind = l.kind === 'font' ? 'font' : 'drawn';
        if (kind !== lastKind) { opts.push(h('li', { role: 'presentation', class: 'st-lp-group', text: L('name', kind === 'font' ? 'lpFonts' : 'lpDrawn') })); lastKind = kind; }
        var on = l.id === cur.id;
        opts.push(h('li', { role: 'presentation' }, [h('button', { type: 'button', role: 'option', class: 'st-lp-opt pz-hl' + (on ? ' is-on' : ''), aria: { selected: on ? 'true' : 'false', label: l.name },
                                                                   data: { fk: 'lettering-' + l.id }, on: { click: function () { lpPick(l.id); }, keydown: lpKey } },
          [h('span', { class: 'st-lp-prev' }, [lpPreview(l)]), h('span', { class: 'st-lp-name', text: l.name })])]));
      });
      marksBox.appendChild(h('ul', { class: 'st-letterlist', role: 'listbox', aria: { label: L('name', 'marks') } }, opts));
    }
    function soon() {
      if (redraw) clearTimeout(redraw);
      redraw = setTimeout(function () { redraw = null; d.bookingName = input.value; marks(); flyer(); }, 160);
    }
    function done() {
      var n = String(input.value || '').trim();
      SB.UI.clear(msg);
      if (!n) { msg.appendChild(errLine(L('name', 'empty'))); try { input.focus(); } catch (e) { /* fine */ } return; }
      if (SB.text.blocked(n)) { msg.appendChild(errLine(L('name', 'blocked'))); return; }
      if (redraw) { clearTimeout(redraw); redraw = null; }
      d.bookingName = n;
      if (lpOpen) lpClose(false);
      ctx.answer(n, d.mark);
    }
    var doneBtn, needMsg;
    function sync() {
      var has = !!String((input && input.value) || '').trim();
      if (doneBtn) { doneBtn.disabled = !has; if (has) doneBtn.removeAttribute('title'); else doneBtn.title = L('name', 'needName'); }
      if (needMsg) needMsg.hidden = has;
    }
    var field = Kt().input({ label: L('name', 'field'), big: true, value: d.bookingName || '', max: 48, fk: 'name-in', cls: 'st-namefield',
                             placeholder: L('name', 'markBlank').toUpperCase(),
                             onKey: function (e) { if (e.key === 'Enter') { e.preventDefault(); done(); } },
                             onInput: function () { sync(); soon(); },
                             on: function () { d.bookingName = input.value; } });
    input = field.field;
    msg = h('div', { aria: { live: 'polite' } });
    marksBox = h('div', { class: 'st-markbox' });
    flyBox = h('div', { class: 'st-flybox cs-nameflybox', aria: { label: L('name', 'preview') }, role: 'group' });
    box.appendChild(h('div', { class: 'cs-namecard' }, [
      h('div', { class: 'cs-namecol' }, [
        field,
        h('p', { class: 'kt-pencil st-help', text: L('name', 'help') }),
        h('div', { class: 'st-ideas', role: 'group', aria: { label: L('name', 'ideas') } }, [
          h('p', { class: 'kt-small st-k', text: L('name', 'ideas') }),
          h('div', { class: 'st-ideas-row' }, sugg.map(function (s, i) {
            return Kt().button({ label: s, fk: 'idea-' + i, paper: 'white', cls: 'st-idea', on: function () { input.value = s; d.bookingName = s; sync(); marks(); flyer(); } });
          }))
        ]),
        h('p', { class: 'kt-small st-k', text: L('name', 'marks') }),
        h('p', { class: 'kt-pencil st-help', text: L('name', 'markHelp') }),
        marksBox,
        h('div', { class: 'st-acts' }, [
          Kt().button({ label: (ctx && ctx.doneLabel) || L('name', 'done'), kind: 'primary', big: 22, fk: 'name-done', on: done }),
          h('p', { class: 'cs-name-help', role: 'status', text: L('name', 'needName') })
        ]),
        msg
      ]),
      flyBox
    ]));
    doneBtn = box.querySelector('[data-fk="name-done"]'); needMsg = box.querySelector('.cs-name-help');
    marks(); flyer(); sync();
    setTimeout(function () { try { input.focus(); } catch (e) { /* fine */ } }, 400);
  }

  /* Your own band, asked in the going-away show after the booking name (fix list 4.9). Optional: "I don't have one" turns
   * the scene on with no band. ctx.answer({ name, genre }) or ctx.answer(null). */
  function bandWidget(box, ctx) {
    var input, genre = '', gbox, msg, go, GE = (SB.Enums && SB.Enums.GENRES) || [];
    function ready() { return !!String((input && input.value) || '').trim(); }
    /* the button always answers a press (user 2026-11-24: a switched-off button that looks on did nothing): with no name
       it says so and puts the cursor in the field */
    function sync() { if (go && ready()) SB.UI.clear(msg); }
    function genres() {
      SB.UI.clear(gbox);
      gbox.appendChild(h('div', { class: 'st-ideas-row', role: 'radiogroup', aria: { label: L('band', 'genre') } }, GE.map(function (g, i) {
        var on = genre === g, nm = SB.text.label('genre.' + g + '.name');
        return h('button', { type: 'button', role: 'radio', class: 'cb-thing st-stamp pz-hl' + (on ? ' is-on' : ''), aria: { checked: on ? 'true' : 'false' }, data: { fk: 'bgenre-' + i },
                             text: nm, on: { click: function () { genre = on ? '' : g; genres(); } } });
      })));
    }
    function finish() {
      var n = String(input.value || '').trim();
      SB.UI.clear(msg);
      if (!n) { msg.appendChild(errLine(L('band', 'needName'))); try { input.focus(); } catch (e) { /* fine */ } return; }
      if (SB.text.blocked(n)) { msg.appendChild(errLine(L('band', 'blocked'))); return; }
      ctx.answer({ name: n, genre: genre || null });
    }
    var field = Kt().input({ label: L('band', 'nameField'), big: true, value: '', max: 48, fk: 'band-in', cls: 'st-namefield',
                             onKey: function (e) { if (e.key === 'Enter') { e.preventDefault(); finish(); } },
                             onInput: function () { sync(); } });
    input = field.field;
    gbox = h('div', { class: 'st-markbox' }); msg = h('div', { aria: { live: 'polite' } });
    box.appendChild(h('div', { class: 'cs-namecard cs-bandcard' }, [h('div', { class: 'cs-namecol' }, [
      field,
      h('p', { class: 'kt-pencil st-help', text: L('band', 'help') }),
      h('p', { class: 'kt-small st-k', text: L('band', 'genre') }),
      gbox,
      h('div', { class: 'st-acts' }, [
        Kt().button({ label: L('band', 'done'), kind: 'primary', big: 22, fk: 'band-done', on: finish }),
        Kt().button({ label: L('band', 'none'), fk: 'band-none', on: function () { ctx.answer(null); } })
      ]),
      msg
    ])]));
    go = box.querySelector('[data-fk="band-done"]');
    genres(); sync();
  }

  /* ---------------------------------------------------------------- */
  /* the way in: the going-away show                                  */
  /* ---------------------------------------------------------------- */

  /* After the map (and the town's questions) the going-away show plays on a first draft of the game (js/ui/story.js
   * openingAsk). What it asks depends on the map's one question (draft.exp, spec 14):
   *   FIRST   nothing. The game is made with no booking name, the walkthrough on, the day job on and the REALISTIC
   *           settings. The name is asked at the first flyer (the name sheet on the flyer desk); how to play, the day
   *           job and your band are asked at the desk after the first show (GOING_AWAY_setup, js/ui/story.js), which
   *           is why the game is made with setupLater.
   *   BOOKED  the name (nameWidget), then the setup's questions, and the game is made from the replies with no walkthrough.
   * The real game is made with the same seed, so the scene's town, room and bands are the game's. fail(text) puts a
   * line on the screen underneath. */
  var showing = false;
  /* the one difficulty question (EASY / REALISTIC / DIFFICULT) and its day-job tick box -> the game's settings */
  var HOW = { EASY: { fog: 'OPEN', windows: 'FORGIVING' }, REALISTIC: { fog: 'NORMAL', windows: 'NORMAL' }, DIFFICULT: { fog: 'HARD', windows: 'NORMAL' } };   // js/ui/story.js reads this one through SB.UI.setupHow
  function howSettings(a) {
    var h = HOW[a.how] || HOW.REALISTIC;
    return { bills: a.bills !== false, fog: a.fog || h.fog, windows: a.windows || h.windows };
  }
  function blankDraft() { return { slug: null, tune: null, bookingName: '', mark: null, markSeeds: null, flyerBase: null, exp: 'FIRST' }; }
  function goShow(fail) {
    var seed, first;
    if (showing) return;
    if (!draft.slug || !SB.Cities.isLoaded(draft.slug)) { SB.UI.go('city'); return; }
    seed = draft.slug + '-' + Date.now().toString(36);
    if (!draft.markSeeds) draft.markSeeds = rollMarks();
    if (!draft.mark) draft.mark = { v: 1, seed: draft.markSeeds[0] };
    try {
      if (!SB.UI.story || !SB.UI.story.openingAsk) throw new Error('no opening');
      first = SB.Game.newGame({ seed: seed, citySlug: draft.slug, bookingName: '', mark: draft.mark,
                                settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tune: draft.tune || null, tutorial: true });
    } catch (e) { SB.log('error', 'SB.UI.start', String(e && e.message)); if (fail) fail(L('setup', 'bad')); return; }
    showing = true;
    point(null);
    var booked = draft.exp === 'BOOKED';
    SB.UI.story.openingAsk(first, { widgets: { name: nameWidget, band: bandWidget }, setup: booked, back: { label: L('setup', 'back'), on: function () { showing = false; } } },
      function (a, bill) {
        /* a first-timer has no name yet: it is asked at the first flyer (the flyer desk's name sheet, spec 14) */
        var name = String(a.name || '').trim();
        if (booked && !name) return null;
        /* a first-timer plays the first show the realistic way with the day job on, whatever else is in the replies */
        var made = SB.Game.newGame({ seed: seed, citySlug: draft.slug, bookingName: name, mark: draft.mark,
                                     settings: booked ? howSettings(a) : howSettings({}),
                                     tune: draft.tune || null, tutorial: !booked, setupLater: !booked, goingAway: bill });
        /* your own band, if you play in one (fix list 4.9): state.player.band and a playerBand record on the bill list */
        if (made && a.band && a.band.name) { try { SB.Bands.addPlayerBand(made, a.band); } catch (e) { SB.log('warn', 'SB.UI.start', 'player band: ' + (e && e.message)); } }
        return made;
      },
      function (st) {
        showing = false;
        if (!st) { if (fail) fail(L('setup', 'bad')); return; }
        draft = blankDraft();
        try { SB.UI.prefs.set('setupDone', true); } catch (e) { /* the guide shows again next time */ }
        SB.UI.start(st);
      });
  }

  /* the setup's own widgets, for the setup scene when it plays at the desk after the first show (js/ui/story.js) */
  SB.UI.extend({ setupWidgets: { name: nameWidget, band: bandWidget }, setupHow: HOW });

  SB.UI.screen('start', { rail: null, title: 'ui.start.title', full: true, mount: mountStart });
  SB.UI.screen('city', { rail: null, title: 'ui.city.title', full: true, mount: mountCity });
  SB.UI.screen('tune', { rail: null, title: 'ui.tune.title', full: true, mount: mountTune });
})(SB);
