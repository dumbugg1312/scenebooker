/* Scene Booker: art/flyerdesk.js (ART-A)
 * The flyer desk (route `flyerdesk { showId }`, 05-interface 4.14, art.md 4.9). It designs; it does not do the job.
 * Regions: the rolls stack (last six), the flyer large, the knobs with their locks, the check bar, and the two
 * actions. The only state change is SB.Jobs.setFlyer through SB.UI.act.
 *
 * The look: a paste-up table on the cutting mat (the close-up's own olive mat). The flyer (SB.Flyer.render, as it
 * is) lies taped in the middle; the knobs are things on the table: the paste-up sketch (layout), a rub-down letter
 * sheet (letters), two toner bottles (ink), a ream of coloured copy paper (paper), a pile of cut-out pictures from
 * the kits (picture, real photos from SB.Cutouts through SB.Scenes's copier), the copier's copy-count dial (copies),
 * an index card of tick boxes (extras). Scissors, a glue stick, an X-Acto, a steel rule and the paper trims lie
 * around. Every drawn thing is SB.DeskKit SVG or an SB.Scenes copier pass; no person is drawn, only pasted.
 * The board is a 1180 x 690 box in stage units (--p), held on the mat as it is: nothing is scaled.
 * Moves (js/ui/finish.js): the things on the table slap down staggered when the desk opens; the flyer is stamped on,
 * and stamped again when it is rolled or an old roll is taken back (not on every little edit).
 */
(function () {
  'use strict';

  SB.Content.ui.flyerdesk = {
    title: 'Flyer desk',
    closed: 'The desk opens once the room is confirmed.',
    printed: 'Printed. The bands get written in by hand as they say yes.',
    reprint: 'Make a new one and reprint ({cost}, {hrs})',
    reprintSay: 'Make a new one and reprint: {cost} and {hrs} for the copies',
    reprinted: 'Reprinted. The old copies are still on the walls.',
    lockTip: 'Lock the parts you like, then roll the rest.',
    lockFirst: 'Lock the parts you like, then roll the rest. Last rolls: press an old one to take it back.',
    plain: 'Plain flyers are on in settings, so every flyer is the rush job.',
    rough: 'One hour on it: roll and ink, that is all there is time for.',
    madeBy: '{name} made this one.',
    roll: 'Roll', rollPicture: 'New picture', rollType: 'New letters', rolls: 'Last rolls', knobs: 'Knobs', lock: 'lock',
    /* 2.7: what the knobs change, said plainly (they are the look; the effort and the timing are the turnout) */
    looksOnly: 'This changes how the flyer looks. How many people see it comes from the effort you put in and how early it goes up.',
    prev: 'Previous {what}', next: 'Next {what}', lockAria: 'Lock the {what}', copyN: 'Copy of a copy, {n} of 5', toggle: 'Show {what} on the flyer',
    layout: 'Layout', type: 'Letters', ink: 'Ink', paper: 'Paper', picture: 'Picture', copies: 'Copies', extras: 'Extras', tags: 'Tags',
    setTimes: 'set times', rules: 'house rules', doors: 'doors time',
    check: 'Check', presenter: 'presents', bands: 'bands ({n}, headliner biggest)', room: 'room', date: 'date', price: 'price', ages: 'ages',
    fix: 'fix it', fixL: 'Fix it: {what}',
    use: 'Use this flyer', useMake: 'and make it tonight, {hrs}', useSay: 'Use this flyer and make it tonight ({hrs})',
    letItBe: 'Leave it as it is', letItBeSay: 'Leave it as it is: save this flyer and make it later',
    saved: 'Flyer saved. It goes out when you make it.', made: 'Flyer\'s made.',
    effortTitle: 'How much work', effortRough: 'Rough, {hrs}: quick and plain, fewer people stop', effortStd: 'Standard, {hrs}: a flyer people read', effortSharp: 'Sharp, {hrs}: people stop and read it',
    effortWord: { ROUGH: 'Rough', STANDARD: 'Standard', SHARP: 'Sharp' },
    noTime: 'Saved. It does not fit tonight: {why}',
    blank: 'no flyer yet', asText: 'Read it as text', back: 'Back',
    shuffle: 'shuffle the pile', pileEmpty: 'old rolls land here', copyOf: 'copy of a copy', taped: 'taped',
    gen: ['1st', '2nd', '3rd', '4th', '5th'],
    tpl: { T1: 'cut and paste', T2: 'block stack', T3: 'marker sheet', T4: 'halftone hero', T5: 'zine page', T6: 'two-color print',
           T7: 'stencil wall', T8: 'grid', T9: 'rush job', T10: 'tour poster',
           T11: 'photo poster', T12: 'big figure', T13: 'paste-up', T14: 'black stock' },
    treat: { marker: 'marker', block: 'block', bubble: 'bubble', stencil: 'stencil', nib: 'pen nib', spike: 'spikes', drip: 'drips',
             tape: 'tape letters', ransom: 'ransom', stretchBlock: 'stretched', typewriter: 'typewriter', headline: 'headline strips' },
    inkName: { toner: 'toner', copyGray: 'copy gray', fireRed: 'fire red', ballpointBlue: 'ballpoint blue', bayouTeal: 'teal',
               oliveDrab: 'olive', fluorPink: 'hot pink', fluorOrange: 'hot orange', fluorYellow: 'highlighter', mint: 'mint',
               lavender: 'lavender', brick: 'brick' },
    paperName: { copyWhite: 'copy white', newsprint: 'newsprint', goldenrod: 'goldenrod', pastelPink: 'pink', pastelBlue: 'blue',
                 pastelGreen: 'green', kraft: 'kraft', cardboard: 'cardboard', blackStock: 'black stock' },
    /* the picture knob names what is in the picture, in a few words (never the code name) */
    pictureName: { crowd: 'A crowd: people packed in front of a stage', van: 'The van: a tour van with its doors open',
                   carport: 'The carport: a house show under a tin roof', palmSky: 'Palm trees against the sky',
                   bridgeSpan: 'A bridge: steel spans over the water', skateRamp: 'A skate ramp, black and white',
                   guitarist: 'A guitarist mid-swing', storm: 'A storm coming in over the coast', bayou: 'The bayou: trees and still water',
                   basement: 'A basement show: low ceiling, bare bulb', rowhouses: 'Row houses on a city block',
                   grainElevator: 'Grain elevator: a tall farm silo, black and white', mesa: 'A mesa out in the desert',
                   pines: 'Pines: a stand of tall trees' },
    variant: '{tpl} · {v}'
  };

  function L(k, ctx) { return SB.text.label('ui.flyerdesk.' + k, ctx); }
  function word(group, id) {
    var g = SB.Content.ui.flyerdesk[group];
    return g && g[id] ? g[id] : String(id);
  }

  /* ------------------------------------------------------------------ */
  /* the things on the table (drawing only; nothing here changes state)  */
  /* ------------------------------------------------------------------ */

  var FLY_W = 450, TONER = '#141312', CREAM = '#F4F1E8';
  function K() { return SB.DeskKit || null; }
  function NS() { return SB.NightScene || null; }
  function f(n) { return Math.round(n * 10) / 10; }
  /* a length in stage units: one --p is one px of the old 1280 x 800 layout */
  function pu(n) { return 'calc(var(--p) * ' + f(n) + ')'; }
  /* px on screen in one --p, and how finely a canvas must raster to stay sharp at that size */
  function pxPerP() { return (SB.UI.unit ? SB.UI.unit() : 0.8) * 1.25; }
  function res() { return SB.Finish && SB.Finish.res ? SB.Finish.res() : Math.max(1, Math.min(4, pxPerP() * ((typeof window !== 'undefined' && window.devicePixelRatio) || 1))); }
  /* the copy stocks (css/finish.css --pp-*), for the paper pictures drawn here */
  var PP = { white: '#fbfaf3', bond: '#f3f0e6', blue: '#c2d0dc', salmon: '#e4b49b', buff: '#eadbc7', kraft: '#ddba9b' };
  function hash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; }
  function rng(seed) { return SB.rng.make('fd:' + seed); }
  function safe(fn, dflt) { try { return fn(); } catch (e) { return dflt; } }

  /* an SVG drawing of w x h, held in a span; '' when the kit is not there (Node) */
  function svgArt(h, w, ht, body, cls, style) {
    var k = K(), mark = '';
    if (k && body) mark = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + ht + '" viewBox="0 0 ' + w + ' ' + ht + '" focusable="false">' + k.defs() + body + '</svg>';
    return h('span', { class: 'sb-fd-art ' + (cls || ''), aria: { hidden: 'true' }, html: mark, style: Object.assign({ width: pu(w) }, style || {}) });
  }
  function markerSvg(text, size, o) { var ns = NS(); return ns && ns.marker ? safe(function () { return ns.marker(text, size, o || {}); }, '') : ''; }

  /* the ream: the other stocks peek out under the one on top */
  function paperStack(list, cur, papers, seed) {
    var k = K(), r = rng('ream:' + seed), out = '', others = list.filter(function (p) { return p !== cur; }).slice(0, 5), i;
    if (!k) return '';
    out += k.paper(14, 66, 132, 46, { seed: 'ream-box', stock: 'kraft', burn: 0.5, sop: 0.55, cut: 1.5,
      inner: '' });
    for (i = others.length - 1; i >= 0; i--) {
      out += k.paper(18 + r.range(-4, 6), 14 + i * 7 + r.range(-2, 2), 122, 72, { seed: 'sh' + others[i], stock: papers[others[i]] || '#ddd', rot: r.range(-7, 7), burn: 0.25, sop: 0.35, sx: 2, sy: 3 });
    }
    out += k.paper(12, 6, 130, 80, { seed: 'top' + cur, stock: papers[cur] || '#eee', rot: -2.5, burn: 0.35, sop: 0.5,
      inner: k.dotsRect(12, 6, 130, 80, 1, { op: 0.25 }) + k.glue(80, 40, 50, 26, { seed: 'g' + cur, op: 0.12 }) });
    return out;
  }

  /* two toner bottles, each labelled in its ink */
  function bottles(inks, colors) {
    var k = K(), out = '';
    if (!k) return '';
    (inks || []).slice(0, 2).forEach(function (ink, n) {
      var x = 14 + n * 74, y = 6 + n * 12, hex = colors.inks[ink] || TONER, name = String(word('inkName', ink)).toUpperCase(),
          pts = [[x + 20, y], [x + 46, y], [x + 46, y + 20], [x + 52, y + 20], [x + 60, y + 32], [x + 62, y + 108], [x + 4, y + 108], [x + 6, y + 32], [x + 14, y + 20], [x + 20, y + 20]];
      var inner = '<path d="' + k.polyD([[x + 18, y - 1], [x + 48, y - 1], [x + 48, y + 21], [x + 18, y + 21]]) + '" fill="#232220"/>' +
        k.hatch(x + 20, y + 2, 26, 16, { gap: 4, sw: 1.2, stroke: '#55534d', seed: 'cap' + n }) +
        k.paper(x + 8, y + 48, 50, 40, { seed: 'lbl' + ink, stock: 'white', shadow: false, burn: 0.2, cut: 1 }) +
        k.dots(k.polyD([[x + 46, y + 34], [x + 58, y + 34], [x + 60, y + 106], [x + 48, y + 106]]), 3, { op: 0.6 }) +
        '<path d="' + k.polyD([[x + 10, y + 34], [x + 15, y + 34], [x + 15, y + 104], [x + 10, y + 104]]) + '" fill="#fff" fill-opacity=".35"/>';
      out += k.cutout(pts, inner, { seed: 'bt' + ink + n, fill: hex, edge: 5, rot: n ? 6 : -4, cx: x + 33, cy: y + 60 });
      out += k.glue(x - 4, y + 104, 70, 18, { seed: 'ring' + n, op: 0.18 });
    });
    return out;
  }

  /* the rub-down letter sheet: a few in the current letters, some rubbed off already */
  function lettersSheet(treat, seed) {
    var k = K(), out = '', r = rng('lt:' + treat + seed), big = 'ABC', row = 'DEFGHJK', i, x;
    if (!k) return '';
    function glyphs(text, x0, y0, size) {
      var sk = SB.Skeleton, p;
      if (treat === 'ransom' || treat === 'headline') return k.ransom(text, x0, y0, size * 0.9, { seed: seed + text });
      if (treat === 'typewriter') return k.type(text, x0, y0, size * 1.05, { bold: true, seed: text });
      if (treat === 'stretchBlock') return '<g transform="translate(' + x0 + ' ' + y0 + ') scale(.82 1.35) translate(' + (-x0) + ' ' + (-y0) + ')">' + k.marker(text, x0, y0, size, { seed: text }) + '</g>';
      if (sk && sk.path) {
        p = safe(function () { return sk.path(text, size, treat, { rng: SB.rng.make('fdl:' + treat + text) }); }, null);
        if (p && p.d) return '<path d="' + p.d + '" transform="translate(' + f(x0) + ' ' + f(y0 - size) + ')" fill="none" stroke="' + TONER + '" stroke-width="' + f(p.strokeWidth * 1.1) + '" stroke-linecap="round" stroke-linejoin="round"/>';
      }
      return k.marker(text, x0, y0, size, { seed: text });
    }
    var inner = '<path d="M8 22H152" stroke="#6d8fb5" stroke-width="1" stroke-dasharray="3 3"/>';
    inner += glyphs(big, 14, 68, 40);
    for (i = 0; i < row.length; i++) {
      x = 14 + i * 19;
      if (r.next() < 0.3) inner += '<rect x="' + (x - 1) + '" y="80" width="16" height="22" fill="none" stroke="#9a978c" stroke-width="1" stroke-dasharray="2 2"/>';
      else inner += glyphs(row.charAt(i), x, 100, 18);
    }
    out += k.paper(4, 4, 158, 112, { seed: 'ltr' + seed, stock: '#eef0ec', burn: 0.3, sop: 0.55, inner: inner, rot: 1.2 });
    return out;
  }

  /* the paste-up sketch: a dummy of the layout in blue pencil and marker on graph paper */
  function sketch(tpl, variant, seed) {
    var k = K(), r = rng('sk:' + tpl + variant + seed), x0 = 22, y0 = 14, w = 92, ht = 116, inner = '', i, j, BLUE = '#5a7fa6', flip = variant % 2 === 1;
    if (!k) return '';
    function X(x, ww) { return flip ? x0 + w - (x - x0) - (ww || 0) : x; }
    function box(x, y, bw, bh, o) { return k.rect(X(x, bw), y, bw, bh, Object.assign({ sw: 1.4, stroke: BLUE, wob: 0.8, seed: 'b' + x + y }, o || {})); }
    function bar(x, y, bw, bh) { return k.rect(X(x, bw), y, bw, bh, { sw: 2, stroke: TONER, fill: TONER, op: 0.85, wob: 1, seed: 'bar' + x + y }); }
    function lines(x, y, bw, n, gap) { var s = ''; for (var q = 0; q < n; q++) s += k.scrawl(X(x, bw), y + q * (gap || 7), bw * (0.6 + r.next() * 0.4), { seed: 'sc' + x + y + q, sw: 1.2 }); return s; }
    for (i = 0; i <= 8; i++) inner += '<path d="M' + (8 + i * 18) + ' 4V128" stroke="#8fb0d4" stroke-opacity=".45" stroke-width=".8"/>';
    for (j = 0; j <= 7; j++) inner += '<path d="M4 ' + (6 + j * 18) + 'H158" stroke="#8fb0d4" stroke-opacity=".45" stroke-width=".8"/>';
    inner += box(x0, y0, w, ht, { sw: 1.6 });
    switch (tpl) {
      case 'T1': for (i = 0; i < 4; i++) inner += k.rect(x0 + 6 + r.range(0, 40), y0 + 8 + i * 25, 42 + r.range(0, 10), 18, { sw: 1.6, stroke: TONER, rot: r.range(-12, 12), seed: 't1' + i }); break;
      case 'T2': for (i = 0; i < 4; i++) inner += bar(x0 + 6, y0 + 8 + i * 17, w - 12, 12); inner += lines(x0 + 8, y0 + 84, w - 16, 3); break;
      case 'T3': for (i = 0; i < 6; i++) inner += k.scrawl(X(x0 + 8, w - 16), y0 + 14 + i * 16, w - 16, { seed: 't3' + i, sw: 2.6, amp: 4, stroke: TONER }); break;
      case 'T4': inner += k.ellipse(x0 + w / 2, y0 + 36, 30, 28, { sw: 1.6, stroke: BLUE, fill: 'url(#dk-ht3)', seed: 't4' }); inner += bar(x0 + 8, y0 + 72, w - 16, 12) + lines(x0 + 8, y0 + 92, w - 24, 3); break;
      case 'T5': inner += bar(x0 + 6, y0 + 6, w - 12, 10) + lines(x0 + 6, y0 + 26, 36, 10) + lines(x0 + 48, y0 + 26, 36, 6) + box(x0 + 48, y0 + 72, 36, 30); break;
      case 'T6': inner += box(x0 + 6, y0 + 6, w - 12, 56) + k.dotsRect(X(x0 + 8, w - 16), y0 + 8, w - 16, 52, 2) + bar(x0 + 6, y0 + 70, w - 12, 14) + lines(x0 + 8, y0 + 92, w - 20, 2); break;
      case 'T7': inner += k.rect(X(x0 + 14, 60), y0 + 10, 60, 60, { sw: 3, stroke: TONER, rot: 45, seed: 't7' }) + bar(x0 + 6, y0 + 84, w - 12, 16); break;
      case 'T8': for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) inner += box(x0 + 6 + i * 27, y0 + 8 + j * 34, 24, 30); inner += bar(x0 + 6, y0 + 8, w - 12, 8); break;
      case 'T11': inner += k.rect(X(x0 + 6, w - 12), y0 + 6, w - 12, 56, { sw: 1.6, stroke: TONER, fill: 'url(#dk-ht3)', seed: 't11' }) + bar(x0 + 4, y0 + 56, w - 8, 18) + lines(x0 + 8, y0 + 84, w - 16, 3); break;
      case 'T12': inner += k.rect(X(x0 + 6, 40), y0 + 20, 40, 92, { sw: 1.6, stroke: TONER, fill: 'url(#dk-ht3)', seed: 't12' }) + lines(x0 + 52, y0 + 10, w - 60, 9, 10); break;
      case 'T13': for (i = 0; i < 3; i++) inner += k.rect(x0 + 8 + i * 22, y0 + 10 + (i % 2) * 30, 34, 44, { sw: 1.6, stroke: TONER, fill: 'url(#dk-ht3)', rot: r.range(-12, 12), seed: 't13' + i }); inner += bar(x0 + 6, y0 + 92, w - 12, 18); break;
      case 'T14': inner += k.rect(X(x0 + 2, w - 4), y0 + 2, w - 4, ht - 4, { sw: 1, stroke: TONER, fill: TONER, op: 0.9, seed: 't14' }) + k.ellipse(x0 + w / 2, y0 + 60, 22, 30, { sw: 1.6, stroke: '#FF48B0', fill: 'url(#dk-ht3)', seed: 't14e' }); break;
      case 'T10': inner += bar(x0 + 6, y0 + 6, w - 12, 20) + lines(x0 + 10, y0 + 36, w - 20, 9, 8); break;
      default: inner += bar(x0 + 6, y0 + 10, w - 12, 14) + lines(x0 + 8, y0 + 34, w - 16, 8, 9);
    }
    inner += k.type('abcd'.charAt(variant || 0), 136, 118, 15, { bold: true, anchor: 'middle' }) + k.ellipse(136, 113, 11, 11, { sw: 1.8, stroke: '#E03A2F', seed: 'vc' });
    return k.paper(4, 4, 156, 128, { seed: 'skp' + seed, stock: '#f6f5ef', burn: 0.25, sop: 0.55, rot: -1.5, inner: inner });
  }

  /* the copier's count dial: a panel with a dial, the needle on the generation */
  var DIAL = { cx: 82, cy: 108, r: 62, a: [-160, -125, -90, -55, -20] };
  function dial(g) {
    var k = K(), out = '', i, a, ang = DIAL.a[Math.max(0, Math.min(4, (g || 1) - 1))] * Math.PI / 180;
    if (!k) return '';
    out += k.cutout([[6, 46], [158, 40], [162, 150], [4, 154]], '', { seed: 'panel', fill: '#3b3a36', edge: 5 });
    out += k.dotsRect(6, 46, 156, 106, 1, { white: true, op: 0.35 });
    out += '<circle cx="' + DIAL.cx + '" cy="' + DIAL.cy + '" r="34" fill="#e9e6da" stroke="#141312" stroke-width="3"/>';
    for (i = 0; i < 5; i++) { a = DIAL.a[i] * Math.PI / 180; out += '<path d="M' + f(DIAL.cx + Math.cos(a) * 26) + ' ' + f(DIAL.cy + Math.sin(a) * 26) + 'L' + f(DIAL.cx + Math.cos(a) * 33) + ' ' + f(DIAL.cy + Math.sin(a) * 33) + '" stroke="#141312" stroke-width="3"/>'; }
    out += '<path d="M' + DIAL.cx + ' ' + DIAL.cy + 'L' + f(DIAL.cx + Math.cos(ang) * 28) + ' ' + f(DIAL.cy + Math.sin(ang) * 28) + '" stroke="#E03A2F" stroke-width="4" stroke-linecap="round"/>';
    out += '<circle cx="' + DIAL.cx + '" cy="' + DIAL.cy + '" r="7" fill="#141312"/>';
    out += k.dots('M' + (DIAL.cx - 30) + ' ' + DIAL.cy + 'a30 30 0 0 0 60 0Z', 2, { op: 0.5 });
    return out;
  }

  /* what is left on the mat: a few trims cut off the flyer, in its own paper, under everything. (The rule, the X-Acto,
     the scissors and the glue stick are gone: the flyer is the thing on this table.) */
  function tools(paperHex, seed) {
    var k = K(), r = rng('tools:' + seed), out = '', i;
    if (!k) return '';
    for (i = 0; i < 3; i++) {
      var tx = r.range(400, 640), ty = r.range(630, 672), tw = r.range(70, 140);
      out += k.paper(tx, ty, tw, r.range(8, 14), { seed: 'trim' + i, stock: paperHex, rot: r.range(-25, 25), burn: 0.15, sop: 0.45, sx: 2, sy: 3, cut: 1, shadow: false });
    }
    return out;
  }

  /* the pile of cut-out pictures: two kit photos under, the flyer's picture on top, all through the copier */
  var PEOPLE = { crowd: 'crowd', guitarist: 'guitar', carport: 'line', basement: 'amp', van: 'stand', skateRamp: 'standing' };
  function cutsOf(role) { return (SB.Cutouts || []).filter(function (c) { return c.role === role; }); }
  function pileIds(pic, seed) {
    var s = hash(pic + ':' + seed), a = cutsOf('singer'), b = cutsOf('guitar').concat(cutsOf('bass')), top = PEOPLE[pic] ? cutsOf(PEOPLE[pic]) : [], ids = [];
    if (a.length) ids.push(a[s % a.length].id);
    if (b.length) ids.push(b[(s >>> 4) % b.length].id);
    if (top.length) ids.push(top[(s >>> 8) % top.length].id);
    return ids;
  }
  function paintPile(cv, pic, inks, paperHex, seed) {
    var Sc = SB.Scenes, c = cv.getContext ? cv.getContext('2d') : null, ids = pileIds(pic, seed), s = cv.width / 165;
    if (!c || !Sc || !Sc.paste) return;
    function paint() {
      safe(function () {
        c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, cv.width, cv.height); c.scale(s, s);
        if (ids[0]) Sc.paste(c, ids[0], { x: 44, y: 138, h: 118, rot: -0.22, border: 4 });
        if (ids[1]) Sc.paste(c, ids[1], { x: 120, y: 136, h: 112, rot: 0.2, border: 4, flip: true });
        /* the flyer's own picture, on a print with a white border */
        c.save(); c.translate(82, 84); c.rotate(-0.05);
        c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(-49, -37, 104, 82);
        c.fillStyle = '#F7F6F1'; c.fillRect(-52, -41, 104, 82);
        if (PEOPLE[pic] && ids[2]) {
          c.fillStyle = '#9d9b94'; c.fillRect(-46, -35, 92, 70);
          c.beginPath(); c.rect(-46, -35, 92, 70); c.clip();
          Sc.paste(c, ids[2], { x: 0, y: 50, h: pic === 'crowd' ? 70 : 92, border: 0, contrast: 1.3 });
        } else if (SB.Draw && SB.Draw.picture) {
          SB.Draw.picture(c, pic, -46, -35, 92, 70, { rng: SB.rng.make('fdpic:' + pic), inks: ['#1A1A1A', null], paper: '#F7F6F1' });
        }
        c.restore();
        c.setTransform(1, 0, 0, 1, 0, 0);
        if (Sc.copier) Sc.copier(cv, { paper: '#F2F0E6', alpha: true, cell: 1.6 * s, contrast: 1.45, seed: 'pile' + pic });
      });
    }
    paint();
    if (Sc.loadCuts && ids.length) Sc.loadCuts(ids, paint);
  }

  /* where things sit on the board: [left, top, turn] */
  var AT = {
    head: [14, 6, -0.6], win: [690, 8, 1], rolls: [16, 46, 0], roll: [22, 246, -2.2], rollPic: [228, 246, 2], rollType: [230, 294, -1.5],
    layout: [14, 372, -1.2], type: [186, 376, 1.4], sheet: [378, 36, -3.2], note: [14, 548, -1], text: [250, 566, 1.2],
    paper: [852, 56, -1], ink: [1012, 62, 1.4], picture: [850, 270, 1.2], copies: [1008, 274, -1], extras: [852, 478, -0.8],
    check: [14, 604, -0.4], actions: [858, 576, 0]
  };
  function at(name, extra) {
    var p = AT[name] || [0, 0, 0], s = { left: pu(p[0]), top: pu(p[1]), '--rot': p[2] + 'deg' }, k;
    for (k in (extra || {})) s[k] = extra[k];
    return s;
  }

  function mount(root, params) {
    var showId = params && params.showId, rec = null, spec = null, rolls = [], offs = [], big = null, readOnly = false, closed = null, note = null, reprinting = false, printedOn = false, banner = null;
    var h = SB.UI.h, C = SB.UI.C || {}, stage = null, pending = { first: true, flyer: true }, lastRes = 0;

    function state() { return SB.UI.game(); }

    function load() {
      var s = state(), show = s && s.shows ? s.shows[showId] : null, jobs, pj;
      closed = null; readOnly = false; note = null;
      if (!show) { closed = L('closed'); return; }
      if (show.status !== 'CONFIRMED' && show.status !== 'PLAYED') { closed = L('closed'); return; }
      try { spec = SB.Jobs.flyerSpec(s, showId); } catch (e) { closed = L('closed'); return; }
      if (SB.UI.prefs && SB.UI.prefs.get && SB.UI.prefs.get('plainFlyers')) { spec.plain = true; note = L('plain'); }
      jobs = SB.Jobs.forShow(s, showId) || [];
      pj = jobs.filter(function (j) { return j.type === 'PRINT'; })[0];
      printedOn = (show.promo && show.promo.printed != null) || !!(pj && pj.status === 'DONE');
      readOnly = show.status === 'PLAYED' || show.status === 'CANCELLED' || (printedOn && !reprinting);
      if (show.status === 'PLAYED' || show.status === 'CANCELLED') { spec = show.flyer && show.flyer.spec ? show.flyer.spec : spec; }
      /* 3.2: a printed flyer shows as it is now, the bands who have said yes written in; it is not a dead sheet */
      else if (printedOn && !reprinting) note = L('printed');
      else if (spec.finish === 'ROUGH') note = L('rough');
      /* 3.7: the first visit says what Lock and Last rolls are for, in the note's own place on the board */
      if (!note && !(show.flyer && show.flyer.recipe) && !(show.promo && show.promo.flyer)) note = L('lockFirst');
      if (banner) note = banner;
      if (!rec) rec = show.flyer && show.flyer.recipe ? show.flyer.recipe : SB.Flyer.recipe(spec);
    }

    function makerJob() {
      var jobs = SB.Jobs.forShow(state(), showId) || [];
      return jobs.filter(function (j) { return j.type === 'MAKE_FLYER'; })[0] || null;
    }

    function push(r) {
      pending.flyer = true;
      rolls.unshift(rec);
      rolls = rolls.slice(0, 6);
      rec = r;
      draw();
    }

    function doRoll(aspects) {
      if (readOnly || closed) return;
      push(SB.Flyer.roll(rec, spec, aspects || null));
    }

    function edit(fn) {
      if (readOnly || closed) return;
      var r = JSON.parse(JSON.stringify(rec));
      r.over = r.over || {}; r.lock = r.lock || [];
      fn(r);
      rec = SB.Flyer.settle(r, spec);
      draw();
    }

    function toggleLock(a) {
      edit(function (r) { var i = r.lock.indexOf(a); if (i >= 0) r.lock.splice(i, 1); else r.lock.push(a); });
    }

    function save(thenBack) {
      var r = SB.UI.act(function (s) { return SB.Jobs.setFlyer(s, showId, rec, SB.Flyer.learn(s.player ? s.player.houseStyle : {}, rec)); });
      if (r && r.ok !== false) {
        if (SB.UI.toast) SB.UI.toast(L('saved'), 'info');
        if (thenBack && SB.UI.back) SB.UI.back();
        else if (!thenBack && SB.UI.go) SB.UI.go('show', { showId: showId, row: 'flyer' });      // back to the show's card, on its flyer row
      }
    }

    function pickable() { var s = state(); return !(SB.Rungs && SB.Rungs.shows && s) || SB.Rungs.shows(s, 'flyerPickers'); }
    function hrsText(n) { return n === 0.5 ? 'half an hour' : (n === 1 ? '1 hr' : n + ' hrs'); }
    function effortHours(k) { var H = (SB.Config.FLYER && SB.Config.FLYER.HOURS) || {}; return typeof H[k] === 'number' ? H[k] : 2; }
    function usualEffort() { return (SB.Config.USUAL && SB.Config.USUAL.effort) || 'STANDARD'; }

    /* 1.10: one press saves this flyer and makes it tonight (the job's hours are spent on the spot), then back to the card */
    function useNow(effort) {
      var r, mj, r2, can;
      if (closed || readOnly) return;
      r = SB.UI.act(function (s) { return SB.Jobs.setFlyer(s, showId, rec, SB.Flyer.learn(s.player ? s.player.houseStyle : {}, rec)); });
      if (!r || r.ok === false) return;
      mj = makerJob();
      if (!mj || (mj.status !== 'TODO' && mj.status !== 'PLANNED') || mj.covered || (mj.planned && mj.planned.by && mj.planned.by !== 'player')) {
        if (SB.UI.toast) SB.UI.toast(L('saved'), 'info');
        if (SB.UI.go) SB.UI.go('show', { showId: showId, row: 'flyer' });
        return;
      }
      r2 = SB.UI.act(function (s) { return SB.Week.doNow(s, mj.id, { effort: effort || usualEffort() }); });
      if (r2 && r2.ok !== false) {
        if (SB.UI.toast) SB.UI.toast(L('made'), 'info');
        if (SB.UI.go) SB.UI.go('show', { showId: showId, row: 'promo' });      // made: the card moves on to getting the word out
        return;
      }
      /* saved, but it does not fit tonight (or is refused): stay on the desk and say why on the note */
      banner = L('noTime', { why: (r2 && r2.why) || '' });
      load(); draw();
    }

    /* 3.2 step 2: a printed flyer can be made again and reprinted: the price and hours are on the button */
    function reprintInfo() {
      var s = state(), pjv = (SB.Jobs.forShow(s, showId) || []).filter(function (j) { return j.type === 'PRINT'; })[0], ch, cost = 0;
      if (pjv && pjv.opt && pjv.opt.choices) { ch = pjv.opt.choices.filter(function (c) { return c.key === (pjv.opt.chosen || 'USUAL'); })[0]; cost = ch ? ch.cost : 0; }
      return { cost: SB.text.money ? SB.text.money(cost) : '$' + cost, hrs: hrsText(pjv ? pjv.hours : 1) };
    }
    function reprintNow() {
      var r = SB.UI.act(function (s) { return SB.Jobs.reprint(s, showId, rec, SB.Flyer.learn(s.player ? s.player.houseStyle : {}, rec)); });
      if (!r || r.ok === false) return;
      reprinting = false;
      if (SB.UI.toast) SB.UI.toast(L('reprinted'), 'info');
      if (SB.UI.go) SB.UI.go('show', { showId: showId, row: 'flyer' });
    }

    /* one knob as a thing on the table: its typed label, the thing itself, the value on a strip of tape, the two
       arrows either side, and the lock as a tab of masking tape (taped down = it stays when you roll) */
    function knob(label, valueText, aspect, prev, next, extra, art, name) {
      var rough = spec && spec.finish === 'ROUGH' && aspect !== 'ink', off = readOnly || rough, locked = rec.lock && rec.lock.indexOf(aspect) >= 0;
      return h('div', { class: 'sb-fd-knob sb-fd-st sb-fd-st--' + name + (off ? ' is-off' : '') + (locked ? ' is-locked' : ''), style: at(name) }, [
        h('span', { class: 'sb-fd-knob-label', text: label, title: L('looksOnly') }),
        art || null,
        h('div', { class: 'sb-fd-st-row' }, [
          h('button', { type: 'button', class: 'sb-fd-step pz-hl', disabled: off || !prev, aria: { label: L('prev', { what: label.toLowerCase() }) }, on: { click: prev || function () {} } }, '◂'),
          h('span', { class: 'sb-fd-knob-value pz-paper' }, [extra || null, h('span', { text: valueText })]),
          h('button', { type: 'button', class: 'sb-fd-step pz-hl', disabled: off || !next, aria: { label: L('next', { what: label.toLowerCase() }) }, on: { click: next || function () {} } }, '▸')
        ]),
        aspect ? h('label', { class: 'sb-fd-lock', title: L('lockTip') }, [
          h('input', { type: 'checkbox', checked: locked, disabled: off, aria: { label: L('lockAria', { what: label.toLowerCase() }) }, on: { change: function () { toggleLock(aspect); } } }),
          h('span', { text: L('lock') }),
          h('b', { class: 'sb-fd-lock-on', aria: { hidden: 'true' }, text: L('taped') })
        ]) : null
      ]);
    }

    function stepper(list, cur, apply) {
      var i = Math.max(0, list.indexOf(cur));
      return [function () { apply(list[(i - 1 + list.length) % list.length]); }, function () { apply(list[(i + 1) % list.length]); }];
    }

    function knobs() {
      var o = SB.Flyer.options(rec, spec), colors = SB.Flyer.colors(), got = rec.got || {}, combos = [], cur, s, out = [], shw = (rec.over && rec.over.show) || {};
      var seed = (spec && spec.seed) || showId || 'fd';
      o.templates.forEach(function (t) { for (var v = 0; v < (o.variants[t] || 1); v++) combos.push(t + ':' + v); });
      cur = rec.template + ':' + (rec.variant || 0);
      s = stepper(combos, cur, function (c) { edit(function (r) { var p = c.split(':'); r.template = p[0]; r.variant = +p[1]; delete r.over.treatment; }); });
      out.push(knob(L('layout'), L('variant', { tpl: word('tpl', rec.template), v: 'abcd'.charAt(rec.variant || 0) }), 'layout', s[0], s[1], null,
        svgArt(h, 164, 136, safe(function () { return sketch(rec.template, rec.variant || 0, seed); }, ''), 'sb-fd-art--sketch'), 'layout'));
      s = stepper(o.treatments, got.treatment, function (t) { edit(function (r) { r.over.treatment = t; }); });
      out.push(knob(L('type'), word('treat', got.treatment), 'type', o.treatments.length > 1 ? s[0] : null, o.treatments.length > 1 ? s[1] : null, null,
        svgArt(h, 166, 122, safe(function () { return lettersSheet(got.treatment, seed); }, ''), 'sb-fd-art--letters'), 'type'));
      var pairs = o.inkPairs.map(function (p) { return p.join('+'); }), gi = (got.inks || []).join('+');
      if (pairs.indexOf(gi) < 0) pairs.unshift(gi);
      s = stepper(pairs, gi, function (p) { edit(function (r) { r.over.inkPair = p.split('+'); }); });
      out.push(knob(L('ink'), (got.inks || []).map(function (i) { return word('inkName', i); }).join(' + '), 'ink', s[0], s[1],
        h('span', { class: 'sb-fd-swatches', aria: { hidden: 'true' } }, (got.inks || []).map(function (i) { return h('span', { class: 'sb-fd-swatch', style: { background: colors.inks[i] } }); })),
        svgArt(h, 160, 136, safe(function () { return bottles(got.inks, colors); }, ''), 'sb-fd-art--ink'), 'ink'));
      s = stepper(o.papers, got.paper, function (p) { edit(function (r) { r.over.paper = p; }); });
      out.push(knob(L('paper'), word('paperName', got.paper), 'paper', s[0], s[1],
        h('span', { class: 'sb-fd-swatch', aria: { hidden: 'true' }, style: { background: colors.papers[got.paper] } }),
        svgArt(h, 160, 120, safe(function () { return paperStack(o.papers, got.paper, colors.papers, seed); }, ''), 'sb-fd-art--paper'), 'paper'));
      s = stepper(o.pictures, got.picture, function (p) { edit(function (r) { r.over.picture = p; }); });
      var pile = h('span', { class: 'sb-fd-art sb-fd-art--pile', aria: { hidden: 'true' } }), pcv = null;
      safe(function () {
        pcv = document.createElement('canvas'); pcv.width = Math.round(165 * res()); pcv.height = Math.round(145 * res());
        pile.appendChild(pcv);
        paintPile(pcv, got.picture, got.inks, colors.papers[got.paper], seed);
      });
      out.push(knob(L('picture'), word('pictureName', got.picture), 'picture', s[0], s[1], null, pile, 'picture'));
      var offG = readOnly || spec.finish === 'ROUGH';
      out.push(h('div', { class: 'sb-fd-knob sb-fd-st sb-fd-st--copies' + (offG ? ' is-off' : ''), style: at('copies') }, [
        h('span', { class: 'sb-fd-knob-label', text: L('copies') }),
        svgArt(h, 168, 160, safe(function () { return dial(got.grit); }, ''), 'sb-fd-art--dial'),
        h('span', { class: 'sb-fd-copies', role: 'group', aria: { label: L('copies') } }, [1, 2, 3, 4, 5].map(function (g) {
          var a = DIAL.a[g - 1] * Math.PI / 180;
          return h('button', { type: 'button', class: 'sb-fd-gen pz-hl' + (got.grit === g ? ' is-on' : ''), disabled: offG,
                               style: { left: pu(DIAL.cx + Math.cos(a) * DIAL.r - 19), top: pu(DIAL.cy + Math.sin(a) * DIAL.r - 12) },
                               title: L('copyN', { n: g }), aria: { pressed: got.grit === g ? 'true' : 'false', label: L('copyN', { n: g }) }, on: { click: function () { edit(function (r) { r.over.grit = g; }); } } },
                   String(g));
        }))
      ]));
      var ex = [];
      function tog(key, labelKey, on) {
        return h('label', { class: 'sb-fd-tog pz-hl' }, [
          h('input', { type: 'checkbox', checked: on, disabled: readOnly || spec.finish === 'ROUGH', aria: { label: L('toggle', { what: L(labelKey) }) },
                       on: { change: function (e) { var v = !!e.target.checked; edit(function (r) { r.over.show = r.over.show || {}; r.over.show[key] = v; }); } } }),
          h('span', { text: L(labelKey) })
        ]);
      }
      if (spec.times && spec.times.length) ex.push(tog('setTimes', 'setTimes', shw.setTimes == null ? /T3|T5|T8|T9/.test(rec.template) && rec.template !== 'T10' : !!shw.setTimes));
      if (spec.rules) ex.push(tog('rules', 'rules', shw.rules !== false));
      if (spec.doors) ex.push(tog('doors', 'doors', shw.doors !== false));
      var card = [];
      if (ex.length) card.push(h('div', { class: 'sb-fd-knob sb-fd-knob--wrap' }, [h('span', { class: 'sb-fd-knob-label', text: L('extras') }), h('span', { class: 'sb-fd-togs' }, ex)]));
      if (spec.tags && spec.tags.length) {
        card.push(h('div', { class: 'sb-fd-knob sb-fd-knob--wrap' }, [h('span', { class: 'sb-fd-knob-label', text: L('tags') }),
          h('span', { class: 'sb-fd-togs' }, [h('label', { class: 'sb-fd-tog' }, [
            h('input', { type: 'checkbox', checked: shw.tags !== false, disabled: readOnly, aria: { label: L('toggle', { what: L('tags').toLowerCase() }) },
                         on: { change: function (e) { var v = !!e.target.checked; edit(function (r) { r.over.show = r.over.show || {}; r.over.show.tags = v; }); } } }),
            h('span', { text: spec.tags.map(function (t) { return SB.text.label('flyer.tag.' + t); }).join(', ') })
          ])])]));
      }
      if (card.length) out.push(h('div', { class: 'sb-fd-card pz-paper', style: at('extras') }, card));
      return out;
    }

    function checkBar() {
      var c = SB.Flyer.check(rec, spec), bad = {}, n = (spec.billing || []).length;
      c.hard.forEach(function (x) { bad[x.split(':')[1]] = true; });
      var items = [['presenter', L('presenter')], ['band', L('bands', { n: n })], ['room', L('room')], ['date', spec.date ? spec.date.dow + ' ' + spec.date.mon + ' ' + spec.date.d : L('date')],
                   ['price', spec.price ? spec.price.text : L('price')], ['ages', spec.agesText || L('ages')]];
      return h('div', { class: 'sb-fd-check', role: 'status', aria: { live: 'polite' } }, [
        h('span', { class: 'sb-fd-check-title', text: L('check') }),
        h('ul', { class: 'sb-fd-check-list' }, items.map(function (it) {
          var ok = !bad[it[0]];
          return h('li', { class: ok ? 'is-ok' : 'is-bad' }, [h('span', { class: 'sb-fd-mark', aria: { hidden: 'true' }, text: ok ? '✓' : '✗' }), h('span', { text: it[1] })]);
        }).concat(c.soft.map(function (w) {
          return h('li', { class: 'is-warn' }, [h('span', { class: 'sb-fd-mark', aria: { hidden: 'true' }, text: '!' }), h('span', { text: w.text }),
            /* each FIX IT says what it fixes (3.7: no two controls with the same name) */
            w.fix && !readOnly ? h('button', { type: 'button', class: 'sb-fd-fix pz-hl', aria: { label: L('fixL', { what: w.text }) }, on: { click: function () { push(SB.Flyer.settle(w.fix, spec)); } } }, L('fix')) : null]);
        })))
      ]);
    }

    /* the way out: one press uses the flyer and makes it tonight; from show two, rough / standard / sharp say what each buys */
    function actions() {
      var s = state(), efforts, kids = [], info;
      if (closed) return null;
      if (reprinting) {
        info = reprintInfo();
        return h('div', { class: 'sb-fd-actions', style: at('actions') }, [
          h('button', { type: 'button', class: 'sb-fd-use pz-paper pz-hl', data: { tut: 'flyer-make', 'tut-ref': showId }, aria: { label: L('reprintSay', info) }, on: { click: reprintNow } }, [
            h('span', { class: 'sb-fd-mk', aria: { hidden: 'true' }, html: markerSvg(L('use'), 28, { seed: 'use', maxWidth: 206 }) }),
            h('span', { class: 'sb-fd-use-sub', text: L('reprint', info) })])
        ]);
      }
      if (readOnly) {
        if (!(s && s.shows && s.shows[showId] && s.shows[showId].status === 'CONFIRMED' && printedOn)) return null;
        info = reprintInfo();
        return h('div', { class: 'sb-fd-actions', style: at('actions') }, [
          h('button', { type: 'button', class: 'sb-fd-let sb-fd-reprint pz-paper pz-hl', aria: { label: L('reprintSay', info) }, on: { click: function () { reprinting = true; load(); draw(); } } }, L('reprint', info))
        ]);
      }
      efforts = pickable() ? ['ROUGH', 'STANDARD', 'SHARP'] : [usualEffort()];
      efforts.forEach(function (k) {
        var hrs = hrsText(effortHours(k)), say = L('useSay', { hrs: hrs }), main = efforts.length === 1 || k === usualEffort();
        if (efforts.length === 1) {
          kids.push(h('button', { type: 'button', class: 'sb-fd-use pz-paper pz-hl', data: { tut: 'flyer-make', 'tut-ref': showId }, aria: { label: say }, on: { click: function () { useNow(k); } } }, [
            h('span', { class: 'sb-fd-mk', aria: { hidden: 'true' }, html: markerSvg(L('use'), 28, { seed: 'use', maxWidth: 206 }) }),
            h('span', { class: 'sb-fd-use-sub', text: L('useMake', { hrs: hrs }) })]));
        } else {
          kids.push(h('button', { type: 'button', class: 'sb-fd-use sb-fd-use--pick pz-paper pz-hl' + (main ? ' is-main' : ''), data: main ? { tut: 'flyer-make', 'tut-ref': showId } : null,
                                  aria: { label: say + '. ' + L(k === 'ROUGH' ? 'effortRough' : k === 'SHARP' ? 'effortSharp' : 'effortStd', { hrs: hrs }) }, on: { click: function () { useNow(k); } } }, [
            h('span', { class: 'sb-fd-pick-name', text: word('effortWord', k) }),
            h('span', { class: 'sb-fd-pick-hrs', text: hrs }),
            h('span', { class: 'sb-fd-pick-says', text: (L(k === 'ROUGH' ? 'effortRough' : k === 'SHARP' ? 'effortSharp' : 'effortStd', { hrs: hrs }).split(': ')[1]) || '' })]));
        }
      });
      kids.push(h('button', { type: 'button', class: 'sb-fd-let pz-paper pz-hl', aria: { label: L('letItBeSay') }, on: { click: function () { save(true); } } }, L('letItBe')));
      return h('div', { class: 'sb-fd-actions' + (efforts.length > 1 ? ' sb-fd-actions--pick' : ''), style: at('actions') }, kids);
    }

    function draw() {
      var s = state(), mj, head, left, center, right, foot, sub, got, colors, paperHex;
      SB.UI.clear ? SB.UI.clear(root) : (root.innerHTML = '');
      root.className = 'sb-fd';
      stage = h('div', { class: 'sb-fd-stage' });
      root.appendChild(stage);
      if (closed) {
        stage.appendChild(h('div', { class: 'sb-fd-closed pz-paper' }, [h('h1', { text: L('title') }), h('p', { text: closed }),
          h('button', { type: 'button', class: 'sb-fd-back pz-hl', on: { click: function () { if (SB.UI.back) SB.UI.back(); } } }, L('back'))]));
          return;
      }
      got = rec.got || {}; colors = SB.Flyer.colors(); paperHex = colors.papers[got.paper] || '#F7F6F1';
      mj = makerJob();
      sub = [spec.billing && spec.billing[0] ? spec.billing[0].name : '', spec.date ? spec.date.dow + ' ' + spec.date.mon + ' ' + spec.date.d : '', spec.room ? spec.room.name : ''].filter(Boolean).join(' · ');
      head = h('header', { class: 'sb-fd-head', style: at('head') }, [
        h('h1', { class: 'sb-fd-title' }, [h('span', { class: 'sb-fd-sr', text: L('title') + ': ' }), h('span', { class: 'sb-fd-sub pz-paper', text: sub })]),
        mj && mj.window && C.WindowBar ? h('span', { class: 'sb-fd-win pz-paper', style: at('win') }, C.WindowBar({ window: mj.window, today: s && s.clock ? s.clock.day : null, planned: null, size: 16 })) : null
      ]);
      /* the old rolls, a loose pile of small flyers; the roll button is a big taped sheet */
      var R0 = rng('pile');
      left = h('section', { class: 'sb-fd-rolls', aria: { label: L('rolls') } }, [
        h('h2', { class: 'sb-fd-sr', text: L('rolls') }),
        h('div', { class: 'sb-fd-stack', style: at('rolls') }, rolls.length ? rolls.map(function (r, i) {
          var t = SB.Flyer.thumb(r, spec, Math.round(66 * pxPerP()));
          if (t && t.style) { t.style.width = pu(66); t.style.height = 'auto'; }
          return h('button', { type: 'button', class: 'sb-fd-roll pz-hl', disabled: readOnly, aria: { label: L('rolls') + ' ' + (i + 1) },
                               style: { left: pu(8 + (i % 3) * 98 + R0.range(-6, 6)), top: pu(30 + Math.floor(i / 3) * 70 + R0.range(-6, 6)), '--rot': R0.range(-9, 9).toFixed(1) + 'deg', 'z-index': String(10 - i) },
                               on: { click: function () { var keep = rec; rec = r; rolls.splice(i, 1); rolls.unshift(keep); pending.flyer = true; draw(); } } }, t);
        }) : [h('span', { class: 'sb-fd-empty', text: L('pileEmpty') })]),
        h('button', { type: 'button', class: 'sb-fd-rollbtn pz-paper pz-hl', disabled: readOnly, style: at('roll'), on: { click: function () { doRoll(null); } } }, [
          h('span', { class: 'sb-fd-mk', aria: { hidden: 'true' }, html: markerSvg('ROLL', 50, { seed: 'roll', maxWidth: 170 }) }),
          h('span', { class: 'sb-fd-sr', text: L('roll') }),
          h('span', { class: 'sb-fd-roll-sub', aria: { hidden: 'true' }, text: L('shuffle') }),
          h('kbd', { text: 'R' })]),
        h('button', { type: 'button', class: 'sb-fd-reroll pz-paper pz-hl', disabled: readOnly || spec.finish === 'ROUGH', style: at('rollPic'), on: { click: function () { doRoll(['picture']); } } }, [L('rollPicture'), h('kbd', { text: '⇧R' })]),
        h('button', { type: 'button', class: 'sb-fd-reroll pz-paper pz-hl', data: { for: 'type' }, disabled: readOnly || spec.finish === 'ROUGH', style: at('rollType'), on: { click: function () { doRoll(['type']); } } }, [L('rollType'), h('kbd', { text: 'T' })])
      ]);
      big = document.createElement('canvas');
      big.className = 'sb-fd-canvas';
      big.setAttribute('role', 'img');
      big.setAttribute('aria-label', SB.Flyer.text(spec));
      SB.Flyer.render(big, rec, spec, { width: Math.round(FLY_W * pxPerP()), dpr: Math.min(2, window.devicePixelRatio || 1) });
      big.style.width = pu(FLY_W); big.style.height = 'auto';
      center = h('section', { class: 'sb-fd-sheet' }, [
        svgArt(h, 1180, 690, safe(function () { return tools(paperHex, (spec && spec.seed) || showId); }, ''), 'sb-fd-art--tools'),
        h('div', { class: 'sb-fd-paper', style: at('sheet') }, [big,
          h('span', { class: 'sb-fd-tape sb-fd-tape--l', aria: { hidden: 'true' } }), h('span', { class: 'sb-fd-tape sb-fd-tape--r', aria: { hidden: 'true' } })]),
        spec.maker && spec.maker.id !== 'player' && spec.maker.name || note ? h('div', { class: 'sb-fd-notes pz-paper', style: at('note') }, [
          spec.maker && spec.maker.id !== 'player' && spec.maker.name ? h('p', { class: 'sb-fd-note', text: L('madeBy', { name: spec.maker.name }) }) : null,
          note ? h('p', { class: 'sb-fd-note', text: note }) : null]) : null,
        h('details', { class: 'sb-fd-text', style: at('text') }, [h('summary', { class: 'pz-paper pz-hl', text: L('asText') }), h('p', { text: SB.Flyer.text(spec) })])
      ]);
      right = h('section', { class: 'sb-fd-knobs', aria: { label: L('knobs') } }, [h('h2', { class: 'sb-fd-h sb-fd-sr', text: L('knobs') }), h('p', { class: 'sb-fd-sr', text: L('looksOnly') })].concat(knobs()));
      foot = h('footer', { class: 'sb-fd-foot' }, [
        h('div', { class: 'sb-fd-checkwrap pz-paper', style: at('check') }, checkBar())
      ]);
      stage.appendChild(head);
      /* the way out comes right after the header in the page order, so it is a few Tab presses away instead of the 31st
       * (fix list 0.9); it is placed absolutely on the stage, so where it sits on screen does not change */
      var acts = actions();
      if (acts) stage.appendChild(acts);
      stage.appendChild(h('div', { class: 'sb-fd-body' }, [left, center, right]));
      stage.appendChild(foot);
      lastRes = res();
      moves();
    }

    /* the table's things slap down one after another when the desk opens; the flyer stamps on whenever a new one is rolled */
    function moves() {
      var F = SB.Finish, things, paper = stage.querySelector('.sb-fd-paper');
      if (!F) { pending.first = false; pending.flyer = false; return; }
      if (pending.first) {
        things = Array.prototype.slice.call(stage.querySelectorAll('.sb-fd-rollbtn, .sb-fd-reroll, .sb-fd-stack, .sb-fd-st, .sb-fd-card, .sb-fd-notes, .sb-fd-checkwrap, .sb-fd-actions, .sb-fd-head'));
        F.stagger(things, 4);
        things.forEach(function (el) { el.classList.add('mv-slap'); });
      }
      if (pending.flyer && paper) F.move(paper, 'stamp', { delay: pending.first ? 120 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: paper } });
      pending.first = false; pending.flyer = false;
    }

    function redraw() { if (big && !closed) draw(); }

    load();
    draw();
    /* 0.10: the keyboard commits the flyer too, from anywhere that is not a control that wants the key itself */
    if (typeof document !== 'undefined' && document.addEventListener) {
      var onUse = function (e) {
        var t = e.target, tag = t && t.tagName;
        if (closed || readOnly || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
        if (tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || tag === 'SUMMARY' || tag === 'A') return;
        if (SB.UI.route && SB.UI.route() !== 'flyerdesk') return;
        if (document.querySelector('[role="dialog"]:not([hidden])')) return;
        if (e.key === 'Enter' || e.key === 'u' || e.key === 'U' || e.key === ' ') { e.preventDefault(); useNow(usualEffort()); }
      };
      document.addEventListener('keydown', onUse);
      offs.push(function () { document.removeEventListener('keydown', onUse); });
    }
    if (SB.UI.keys) {
      offs.push(SB.UI.keys({
        r: function () { doRoll(null); },
        R: function () { doRoll(['picture']); },
        t: function () { if (spec && spec.finish !== 'ROUGH') doRoll(['type']); }   // SPEC? art.md says Alt+R; the shell's key map skips Alt
      }));
    }
    if (typeof document !== 'undefined' && document.addEventListener) {
      document.addEventListener('themechange', redraw);
      offs.push(function () { document.removeEventListener('themechange', redraw); });
    }
    if (typeof window !== 'undefined' && window.addEventListener) {
      var onResize = function () { if (!closed && res() !== lastRes) draw(); };
      window.addEventListener('resize', onResize);
      offs.push(function () { window.removeEventListener('resize', onResize); });
      /* the board settles once the close-up has landed (its entry animation moves it): tell the tutorial's tape,
         which follows scrolls, to look again */
      var nudge = function () { try { root.dispatchEvent(new Event('scroll')); } catch (e) { /* no tape */ } };
      if (window.requestAnimationFrame) window.requestAnimationFrame(nudge);
      var held = root.closest ? root.closest('.cu-obj') : null, tmr = setTimeout(nudge, 320);
      if (held && held.addEventListener) { held.addEventListener('animationend', nudge); offs.push(function () { held.removeEventListener('animationend', nudge); }); }
      offs.push(function () { clearTimeout(tmr); });
    }
    return {
      update: function () { load(); draw(); },
      unmount: function () { offs.forEach(function (f) { try { f(); } catch (e) { /* already gone */ } }); offs = []; }
    };
  }

  SB.UI.screen('flyerdesk', { rail: 'shows', title: 'ui.flyerdesk.title', full: false, mount: mount });
})();
