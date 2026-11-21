/* Scene Booker — js/desk/closeup.js
 * SB.DeskCloseup: picking a thing up off the desk. A route opened from the desk is shown as a close-up framed as
 * its object (a phone body, a calendar page, a notebook spread, a clipboard...) over the dimmed desk. Escape, a
 * click on the desk around it, or "put it down" goes back to the desk route. Until each close-up is redrawn, the
 * frame hosts the existing screen for that system (SB.UI.screens), so the game stays playable inside it.
 * js/ui/app.js calls frame(main, route) from mount() for every non-full route while a game is running.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.closeup = {
    putDown: 'back to the desk',
    stressTitle: 'What is weighing on you',
    causes: 'wearing on you',
    easing: 'what helps',
    names: { phone: 'Phone', calendar: 'Calendar', notebook: 'Notebook', clipboard: 'Clipboard', sheet: 'Sticker sheet', folder: 'Key hooks',
             tin: 'Cash envelope', book: 'Matchbook', window: 'Road map', drawer: 'Folder', mat: 'Cutting mat', wall: 'Flyer pile', paper: 'Paper',
             jacket: 'Jean jacket' }
  };

  SB.module('DeskCloseup', function () {
    /* which object each existing route is held in */
    var FRAME = { week: 'calendar', close: 'calendar', inbox: 'phone', shows: 'clipboard', show: 'clipboard', bill: 'clipboard',
                  bands: 'sheet', band: 'sheet', rooms: 'folder', room: 'folder', notebook: 'notebook', money: 'tin', people: 'book',
                  town: 'window', legacy: 'wall', settings: 'drawer', flyerdesk: 'mat', jacket: 'jacket' };
    var observer = null, lastKind = null;

    function K() { return SB.DeskKit; }
    function L(key, ctx) { return SB.text.label('ui.closeup.' + key, ctx); }
    function h(t, a, c) { return SB.UI.h(t, a, c); }
    function f(n) { return Math.round(n * 10) / 10; }
    function kindOf(route) { return FRAME[route] || 'paper'; }

    /* The object's body around an inner box of w by h (px), drawn with the kit. pad is the border the body takes. */
    var PAD = { phone: [0, 0, 0, 0], calendar: [14, 14, 14, 14], notebook: [18, 18, 18, 18], clipboard: [62, 26, 26, 26], sheet: [28, 28, 28, 28],
                folder: [28, 26, 26, 26], tin: [14, 14, 14, 14], book: [14, 14, 14, 14], window: [14, 14, 14, 14], drawer: [10, 26, 22, 26],
                mat: [30, 30, 30, 30], wall: [14, 14, 14, 14], paper: [24, 24, 24, 24], jacket: [14, 14, 14, 14] };

    /* The object's body around an inner box: a cut sheet of copy paper (or the phone's xeroxed cut-out) on the black
       table, a hard paste-up shadow, tape at the corners. pad is the border the body takes. */
    var STOCK = { phone: null, calendar: 'white', notebook: '#141413', clipboard: 'white', sheet: 'white', folder: 'manila', tin: 'bone',
                  book: 'goldenrod', window: 'white', drawer: 'manila', mat: 'olive', wall: 'newsprint', paper: 'white' };
    function body(kind, w, h, seed) {
      var k = K(), out = '', p = PAD[kind] || PAD.paper, iw = w - p[1] - p[3], ih = h - p[0] - p[2], ix = p[3], iy = p[0], inner = '', i, r = k.rng('cu' + seed);
      switch (kind) {
        case 'phone':
          /* the phone screen (js/ui/screens/inbox.js) draws its own xeroxed body at the size it is held, so it can put it through the copier */
          break;
        case 'jacket':
          /* the jacket is laid out flat on a patch of the black table; js/ui/story.js draws the denim and what is on it */
        case 'tin':
        case 'window':
        case 'wall':
          /* the cash envelope (money.js), the road map (town.js) and the flyer pile (legacy.js) are laid out on a patch of
             the black table like the calendar: the close-up draws only the patch, the screens paste their paper things on it */
        case 'calendar':
          /* the calendar's page, its pad of notes and its scraps lie on a patch of the black table under the lamp:
             the close-up draws only that patch (a cutting mat's edge and registration marks); week.js and close.js
             paste the paper things onto it themselves, each apart from the others */
          inner = k.regmark(26, 26, 9, { stroke: '#3a3a37' }) + k.regmark(w - 26, 26, 9, { stroke: '#3a3a37' }) +
                  k.regmark(26, h - 26, 9, { stroke: '#3a3a37' }) + k.regmark(w - 26, h - 26, 9, { stroke: '#3a3a37' });
          out += k.paper(4, 4, w - 8, h - 8, { seed: seed, stock: '#101010', inner: inner, burn: 0, cut: 1.2, sop: 0.8 });
          break;
        case 'notebook':
          /* the composition book opened flat: its black marbled cover, flecks of white, the cloth spine down the middle;
             js/ui/screens/notebook.js lays the ruled pages on it */
          for (i = 0; i < 70; i++) inner += '<path d="M' + f(r.range(0, w)) + ' ' + f(r.range(0, h)) + 'l' + f(r.range(3, 14)) + ' ' + f(r.range(-4, 4)) + 'l' + f(r.range(-3, 3)) + ' ' + f(r.range(2, 8)) + 'Z" fill="#f4f2ea" fill-opacity="' + f(r.range(0.4, 0.95)) + '"/>';
          inner += '<path d="M' + f(w / 2 - 9) + ' 0H' + f(w / 2 + 9) + 'V' + f(h) + 'H' + f(w / 2 - 9) + 'Z" fill="#0b0b0b"/>' + k.dotsRect(w / 2 - 9, 0, 18, h, 2, { white: true, op: 0.35 });
          out += k.paper(4, 4, w - 8, h - 8, { seed: seed, stock: '#161615', inner: inner, burn: 0, cut: 1.6 });
          break;
        case 'book':
          /* the matchbook and its scraps lie on a patch of the black table, like the calendar's: js/ui/screens/people.js
             pastes each person down as their own piece */
          inner = k.regmark(26, 26, 9, { stroke: '#3a3a37' }) + k.regmark(w - 26, h - 26, 9, { stroke: '#3a3a37' });
          out += k.paper(4, 4, w - 8, h - 8, { seed: seed, stock: '#101010', inner: inner, burn: 0, cut: 1.2, sop: 0.8 });
          break;
        case 'drawer':
          /* a manila folder lying open: its back cover, the crease, a typed sheet's edge peeking; the typed tabs along
             its top are js/ui/screens/settings.js's own (they choose) */
          inner = '<path d="M0 ' + f(h * 0.5) + 'H' + f(w) + '" stroke="#a88f55" stroke-width="2" stroke-dasharray="2 5"/>' + k.dotsRect(0, 0, w, h, 1, { op: 0.35 });
          out += k.paper(8, 46, w - 16, h - 54, { seed: seed, stock: 'manila', inner: inner, burn: 0.6, cut: 1.6 });
          break;
        case 'clipboard':
          /* a hardboard clipboard: kraft-brown board, toner grit, a steel clip xeroxed and cut out at the top */
          inner = k.dotsRect(0, 0, w, h, 1) + k.hatch(0, h - 70, w, 70, { seed: seed + 'hb', gap: 9, sw: 1, opacity: 0.18 });
          out += k.paper(6, 14, w - 12, h - 20, { seed: seed, stock: '#8a6a43', inner: inner, burn: 0.9, cut: 1.5 });
          out += k.cutout([[w / 2 - 120, 4], [w / 2 + 120, 4], [w / 2 + 132, 40], [w / 2 + 70, 52], [w / 2 - 70, 52], [w / 2 - 132, 40]],
                          '<path d="M' + f(w / 2 - 110) + ' 12H' + f(w / 2 + 110) + 'L' + f(w / 2 + 118) + ' 36H' + f(w / 2 - 118) + 'Z" fill="#6d6f6b"/>' +
                          k.dotsRect(w / 2 - 110, 12, 220, 24, 3, { white: true }) + '<rect x="' + f(w / 2 - 22) + '" y="18" width="44" height="12" fill="#141413"/>',
                          { seed: seed + 'clip', edge: 6 });
          break;
        case 'sheet':
          /* a sticker backing sheet on olive card: a printed cutting grid the stickers came off */
          for (i = 60; i < w; i += 60) inner += '<path d="M' + i + ' 0V' + f(h) + '" stroke="#e7ddc4" stroke-opacity=".14" stroke-width="1" stroke-dasharray="3 5"/>';
          for (i = 60; i < h; i += 60) inner += '<path d="M0 ' + i + 'H' + f(w) + '" stroke="#e7ddc4" stroke-opacity=".14" stroke-width="1" stroke-dasharray="3 5"/>';
          out += k.paper(8, 8, w - 16, h - 16, { seed: seed, stock: 'olive', inner: inner + k.dotsRect(0, 0, w, h, 1, { op: 0.4 }), cut: 2 });
          break;
        case 'folder':
          /* a black pegboard the keys hang on: holes in a grid, a little grain */
          for (i = 26; i < h - 16; i += 34) inner += '<path d="M26 ' + i + 'H' + f(w - 16) + '" stroke="#000" stroke-width="5" stroke-dasharray="5 29"/>';
          out += k.paper(8, 8, w - 16, h - 16, { seed: seed, stock: '#26241f', inner: inner + k.dotsRect(0, 0, w, h, 1, { white: true, op: 0.25 }), burn: 0.3, cut: 2 });
          break;
        case 'mat':
          for (i = 30; i < w; i += 30) inner += '<path d="M' + i + ' 0V' + f(h) + '" stroke="#9a9a5a" stroke-opacity=".4" stroke-width="1"/>';
          for (i = 30; i < h; i += 30) inner += '<path d="M0 ' + i + 'H' + f(w) + '" stroke="#9a9a5a" stroke-opacity=".4" stroke-width="1"/>';
          out += k.paper(6, 6, w - 12, h - 12, { seed: seed, stock: 'olive', inner: inner, burn: 0.4 });
          break;
        default:
          if (kind === 'window') inner = k.dotsRect(0, 0, w / 3, h, 1) + k.dotsRect(2 * w / 3, 0, w / 3, h, 1);
          if (kind === 'wall' || kind === 'tin') inner = k.dotsRect(0, 0, w, h, 1);
          out += k.paper(8, 8, w - 16, h - 16, { seed: seed, stock: STOCK[kind] || 'white', inner: inner, cut: 2 });
      }
      if (kind !== 'jacket' && kind !== 'phone' && kind !== 'clipboard' && kind !== 'folder' && kind !== 'calendar' && kind !== 'tin' && kind !== 'window' && kind !== 'wall' && kind !== 'notebook' && kind !== 'book' && kind !== 'drawer') out += k.tape(28, 18, 80, 24, { seed: seed + 't1', rot: -32 }) + k.tape(w - 30, h - 18, 80, 24, { seed: seed + 't2', rot: -28 });
      /* drawn in phone units (--p): shown at that many --p whatever the window, like everything on the stage */
      return '<svg xmlns="http://www.w3.org/2000/svg" style="width:calc(var(--p, 1px) * ' + f(w + 10) + ');height:calc(var(--p, 1px) * ' + f(h + 12) + ')" viewBox="0 0 ' + f(w + 10) + ' ' + f(h + 12) + '" aria-hidden="true" focusable="false">' + k.defs() + out + '</svg>';
    }

    function cityInk() {
      var s = SB.UI.game ? SB.UI.game() : null, p = null;
      try { p = s ? SB.Cities.pack(s) : null; } catch (e) { p = null; }
      return K().ink(p && p.style && p.style.cityInks ? p.style.cityInks[0] : 'fireRed');
    }

    /* the body is drawn at the object's layout size in phone units (offsetWidth ignores the moves and the zoom the
       walkthrough's strip asks for), so it lines up with the page inside at every window size */
    function draw(obj, artEl, kind) {
      var k = SB.UI.unit ? SB.UI.unit() * 1.25 : 1, w = Math.round((obj.offsetWidth || 600 * k) / k), ht = Math.round((obj.offsetHeight || 500 * k) / k);
      if (artEl.getAttribute('data-size') === w + 'x' + ht) return;
      artEl.setAttribute('data-size', w + 'x' + ht);
      artEl.innerHTML = body(kind, w, ht, kind);
    }

    function putDown() { SB.UI.go('desk'); }

    /* Held on the stage (polish brief job 3): every close-up is laid out on the same 16:10 stage as the desk, sized in
       stage units and letterboxed (css/desk-scene.css). The phone leaves the stage's left column free, so the
       walkthrough's strip goes there instead of along the bottom (css/finish.css). */
    var COLUMN = { phone: 1 };

    /** frame(main, route): build the close-up for a route inside main; returns the element the screen mounts into. */
    function frame(main, route) {
      var kind = kindOf(route), p = PAD[kind] || PAD.paper, artEl, obj, inner, down, back;
      if (observer) { try { observer.disconnect(); } catch (e) { /* fine */ } observer = null; }
      var stage = h('div', { class: 'cu-stage' });
      back = h('div', { class: 'cu-back cu-back--staged' + (COLUMN[kind] ? ' cu-back--column' : ''), on: { mousedown: function (e) { if (e.target === back || e.target === stage) putDown(); } } });
      artEl = h('div', { class: 'cu-art', aria: { hidden: 'true' } });
      var mountAt = h('div', { class: 'cu-host' });   // screens may set their root's class, so they get a plain child
      inner = h('div', { class: 'cu-in' }, mountAt);
      down = h('button', { type: 'button', class: 'cu-down', aria: { label: L('putDown') }, html: K().tagSvg(L('putDown'), { size: 15 }), on: { click: putDown } });
      var still = lastKind === kind && typeof document !== 'undefined' && document.body && document.body.classList.contains('is-closeup');
      lastKind = kind;
      obj = h('section', { class: 'cu-obj cu--' + kind + (still ? ' is-held' : ''), role: 'region', aria: { label: L('names.' + kind) },
                           style: { '--cu-pt': 'calc(var(--p) * ' + p[0] + ')', '--cu-pr': 'calc(var(--p) * ' + p[1] + ')', '--cu-pb': 'calc(var(--p) * ' + p[2] + ')', '--cu-pl': 'calc(var(--p) * ' + p[3] + ')' } }, [artEl, inner, down]);
      if (still) back.classList.add('is-held'); else obj.classList.add('mv-slap');
      stage.appendChild(obj);
      back.appendChild(stage);
      main.appendChild(back);
      draw(obj, artEl, kind);
      /* anything held that scrolls gets the drawn scrollbar, never the browser's (js/ui/finish.js) */
      if (SB.Finish && SB.Finish.scrollbar) { try { SB.Finish.scrollbar(inner); } catch (e) { /* fine */ } }
      if (typeof ResizeObserver === 'function') {
        observer = new ResizeObserver(function () { draw(obj, artEl, kind); });
        try { observer.observe(obj); } catch (e) { /* fine */ }
      }
      return mountAt;
    }

    /** stress(): the mug picked up: what is weighing on you (Stress.view) in a card shaped like a mug's note. */
    function stress() {
      var s = SB.UI.game(), v = null, C = SB.UI.C, close;
      try { v = SB.Stress.view(s); } catch (e) { v = null; }
      if (!v) return;
      function word(z) { try { return SB.text.label('ui.desk.zone.' + z); } catch (e) { return String(z).toLowerCase(); } }
      function item(c) { return h('li', null, [c.label, ' ', C && C.CostChip ? C.CostChip({ chip: { k: 'STRESS', v: c.d } }) : null]); }
      close = SB.UI.card(h('div', { class: 'cu-mug' }, [
        h('div', { class: 'cu-mug-art', aria: { hidden: 'true' }, html: '<svg viewBox="0 0 120 120" width="96" height="96"><circle cx="60" cy="60" r="50" fill="#f4f2ea" stroke="#141413" stroke-width="5"/><circle cx="60" cy="60" r="37" fill="#1a120c"/><path d="M40 52Q48 34 70 34Q50 42 40 52Z" fill="#f4f2ea" fill-opacity=".7"/></svg>' }),
        h('h2', { text: L('stressTitle') }),
        h('p', { class: 'cu-mug-zone', text: word(v.zone) + ' · ' + v.value }),
        v.effects ? h('p', { text: v.effects }) : null,
        v.causes && v.causes.length ? [h('h3', { text: L('causes') }), h('ul', null, v.causes.map(item))] : null,
        v.easing && v.easing.length ? [h('h3', { text: L('easing') }), h('ul', null, v.easing.map(item))] : null,
        h('button', { type: 'button', class: 'cu-down cu-down--inline', aria: { label: L('putDown') }, html: K().tagSvg(L('putDown'), { size: 15 }), on: { click: function () { close(); } } })
      ]), { label: L('stressTitle') });
    }

    return { frame: frame, stress: stress, kindOf: kindOf, putDown: putDown };
  });
})(SB);
