/* Scene Booker — ui/screens/inbox.js (the phone close-up, 07-desk.md sections 2 and 2b)
 * The booker's phone, picked up: a xeroxed cut-out phone on the black table, its screen the one lit thing. On the
 * screen: the conversations (a mark, the name on a label strip, the last line, hot-ink "!!" when one needs you), a
 * fringe of tear-off tabs to filter them; a conversation as chat bubbles in the engine's own words with the replies as
 * a fringe of tear-off tabs under the thread; a touring band's request as their page (their mark, two crowds of heads,
 * a tear-off calendar of their dates, the run as a road through real towns, the ask as a note, the ways to find out
 * more as tear-off coupons with clock ticks for hours, what you learned as notes in the margin); an offer as a deal
 * slip with drawn tick boxes and a handwritten figure, stamped with what you owe if nobody comes.
 * One sign per kind of thing (2b): a tear-off tab is a choice or an action, a black label strip opens something, a
 * drawn box is ticked; reading matter carries none of them. The city's hot ink marks only what needs you now.
 * Every picture is drawn with SB.DeskKit and SB.Identity and put through the desk's copier (DeskKit.photocopy).
 * Reads Mail, Requests, Rooms, Money, Shows and public state; changes state only through SB.UI.act.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.inbox = {
    title: 'Messages',
    tabs: { ALL: 'all', NEEDS: 'answer', WAITING: 'waiting', TOURS: 'tours', SWAPS: 'swaps', LOCALS: 'locals', ROOMS: 'rooms', SCENE: 'scene' },
    tabsLong: { ALL: 'All messages', NEEDS: 'Needs an answer', WAITING: 'Waiting on them', TOURS: 'Tours', SWAPS: 'Swaps', LOCALS: 'Local bands', ROOMS: 'Rooms', SCENE: 'The scene' },
    filters: 'Show',
    empty: 'nothing new',
    needs: 'needs an answer',
    needN: '{n} need you',
    unread: 'new',
    lapsed: 'This one has gone by.',
    replyBy: 'answer by {day}',
    back: 'back to messages',
    backShort: 'back',
    chat: 'chat',
    page: 'their page',
    pageShort: 'page',
    dates: 'Dates they can do',
    clash: 'clash',
    route: 'The run',
    here: 'here',
    drive: '{h}h{m}',
    theAsk: 'what they ask',
    lodging: 'a floor to sleep on',
    meal: 'a meal',
    members: '{n} of them',
    from: 'from {home}',
    theySay: 'they say they draw',
    guess: 'your guess',
    noGuess: 'no idea yet',
    each: 'each head is {n}',
    findOut: 'Find out more',
    vet: { LISTEN: 'listen', CLIP: 'watch a clip', HISTORY: 'past shows', ASK_AROUND: 'ask around', ASK_BOOKER: 'ask a booker' },
    vetLong: { LISTEN: 'Listen to the record', CLIP: 'Watch a live clip', HISTORY: 'Look up their past shows', ASK_AROUND: 'Ask around', ASK_BOOKER: 'Ask a booker on their route' },
    vetDone: 'done',
    vetListed: 'on your list',
    vetPlan: 'do it from the calendar',
    calendar: 'calendar',
    aMessage: 'a message',
    hoursN: '{n} hours',
    hour1: '1 hour',
    hrs: '{n}H',
    msgCost: 'MSG',
    notes: 'What you found out',
    flags: 'Worth knowing',
    reply: 'Answer',
    book: 'book it',
    bookL: 'Book it: tell them you are in and start the show',
    toShowL: 'Open the show',
    pass: 'pass',
    takeIt: 'take it',
    counter: 'They came back with something else.',
    holdRoom: 'Which room',
    holdDay: 'Which night',
    holdGo: 'ask for the hold',
    noRooms: 'No room will take a hold from you yet.',
    needShow: 'Hold a room first: an offer needs a night.',
    deal: 'deal',
    slip: 'Deal slip',
    guarantee: 'guarantee',
    less: 'five less', more: 'five more',
    sendOffer: 'send the offer',
    ifNobody: 'if nobody comes',
    breakEven: 'break even',
    paidN: '{n} paid',
    tone: 'How',
    tones: { SHORT: 'short', REASON: 'with a reason', LEAD: 'with a lead' },
    sendPass: 'send the pass',
    offerWait: 'You answer this one when it comes up, in the morning.',
    toShow: 'open the show',
    show: 'show',
    queued: 'goes out tonight',
    sent: 'sent, waiting',
    you: 'you',
    toWho: 'to {name}:',
    signals: 'What you notice',
    phone: 'Phone',
    heroGo: 'answer them',
    heroAll: 'show all'
  };

  /* SPEC?: 05-interface 4.4 names the filters, Mail.inbox filters by MSG kind; the filter-to-kind mapping is ours. */
  var TABS = [['ALL', 'ALL'], ['NEEDS', 'NEEDS'], ['WAITING', 'WAITING'], ['TOURS', 'REQUEST'], ['SWAPS', 'CONTACT'], ['LOCALS', 'BAND'], ['ROOMS', 'ROOM'], ['SCENE', 'SCENE']];
  var OPEN = { NEW: 1, REPLIED: 1, NEGOTIATING: 1 };
  var VETS = ['LISTEN', 'CLIP', 'HISTORY', 'ASK_BOOKER', 'ASK_AROUND'];
  var T = '#141413', W = '#f4f2ea';
  /* the photos' copy stock: the flyers' papers (css/finish.css --pp-blue, --pp-green, --pp-salmon, --pp-buff) */
  var STOCK = ['#c2d0dc', '#cde3bd', '#e4b49b', '#eadbc7'];
  /* the glass inside the phone's cut-out body: css/cu-phone.css .ph-glass, in phone units */

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function K() { return SB.DeskKit; }
  function L(key, ctx) { return SB.text.label('ui.inbox.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb, ctx) { return has(key) ? SB.text.label(key, ctx) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'inbox', String(e && e.message)); return fb; } }
  function f1(n) { return Math.round(n * 10) / 10; }
  function money(n) { return safe(function () { return SB.text.money(n); }, '$' + n); }
  function ink(name) { return K().ink(name); }
  function up(s) { return String(s == null ? '' : s).toUpperCase(); }

  /* ------------------------------------------------------------------ */
  /* the copier: every picture on the phone goes through the desk's toner pass                                     */
  /* ------------------------------------------------------------------ */

  var COPIES = {}, PEND = {}, NCOPY = 0;

  function svgDoc(inner, w, ht) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + ht + '" viewBox="0 0 ' + w + ' ' + ht + '" focusable="false">' + K().defs() + inner + '</svg>';
  }
  /* the kit numbers its clip paths; the same drawing must find its copy again */
  function copyKey(mk) { return mk.replace(/\b(?:pc|ph|dk)\d+\b/g, '~'); }
  function put(el, url, w, ht) { el.innerHTML = '<img src="' + url + '" width="' + w + '" height="' + ht + '" alt="" draggable="false">'; }
  /* px in one phone unit (--p, 1.25 stage units), and how fine the copier has to raster to stay sharp at that size */
  function pxPerP() { return (SB.UI.unit ? SB.UI.unit() : 0.8) * 1.25; }
  function copyRes() { return Math.max(1, Math.min(4, Math.round(pxPerP() * ((typeof window !== 'undefined' && window.devicePixelRatio) || 1) * 4) / 4)); }
  /* an SVG drawn as an image cannot reach the page's fonts: the copier's copy carries the shipped faces itself */
  function withFonts(mk) { var st = SB.Finish && SB.Finish.fontStyle ? SB.Finish.fontStyle(mk) : '', i = mk.indexOf('>'); return st && i > 0 ? mk.slice(0, i + 1) + st + mk.slice(i + 1) : mk; }

  /** copyInto(el, markup, w, ht): show the SVG now, then the photocopied raster of it when the copier is done. */
  function copyInto(el, mk, w, ht) {
    var d = typeof document !== 'undefined' ? document : null, key, url, im, res;
    if (!d || typeof Image === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL || typeof window === 'undefined') return;
    res = copyRes();
    key = copyKey(mk) + '@' + res;
    if (COPIES[key]) { put(el, COPIES[key], w, ht); return; }
    if (PEND[key]) { PEND[key].push(el); return; }
    PEND[key] = [el];
    try { url = URL.createObjectURL(new Blob([withFonts(mk)], { type: 'image/svg+xml' })); } catch (e) { delete PEND[key]; return; }
    im = new Image();
    im.onload = function () {
      var waiting = PEND[key] || [], c = null, sc = res;
      delete PEND[key];
      try {
        c = K().copyCanvas(Math.max(1, Math.round(w * sc)), Math.max(1, Math.round(ht * sc)));
        c.ctx.drawImage(im, 0, 0, c.cv.width, c.cv.height);
      } catch (e) { c = null; }
      try { URL.revokeObjectURL(url); } catch (e) { /* fine */ }
      if (!c) return;
      K().photocopyAsync(c.ctx, c.cv.width, c.cv.height, 'ph' + w + 'x' + ht + ':' + key.length, { px: sc, streaks: w > 300 ? 2 : 0, amp: 0.13 }, function (ok) {
        if (!ok) return;
        K().copyUrl(c.cv, function (out) {
          if (!out) return;
          if (NCOPY > 500) { Object.keys(COPIES).forEach(function (k) { K().dropUrl(COPIES[k]); }); COPIES = {}; NCOPY = 0; }
          COPIES[key] = out; NCOPY += 1;
          waiting.forEach(function (x) { put(x, out, w, ht); });
        });
      });
    };
    im.onerror = function () { delete PEND[key]; try { URL.revokeObjectURL(url); } catch (e) { /* fine */ } };
    im.src = url;
  }

  /** pic(inner, w, ht, o): a drawing (SVG markup in a w by ht box) as a photocopied picture. o.cls, o.label (else hidden). */
  function pic(inner, w, ht, o) {
    o = o || {};
    w = Math.ceil(w); ht = Math.ceil(ht);
    /* drawn in phone units: shown at w by ht --p whatever the window, so it keeps its place on the stage */
    var mk = svgDoc(inner, w, ht),
        el = h('span', { class: 'ph-pic' + (o.cls ? ' ' + o.cls : ''), html: mk, role: o.label ? 'img' : null, aria: o.label ? { label: o.label } : { hidden: 'true' },
                         style: { width: 'calc(var(--p, 1px) * ' + w + ')', aspectRatio: w + ' / ' + ht } });
    copyInto(el, mk, w, ht);
    return el;
  }

  /* ------------------------------------------------------------------ */
  /* lettering and marks                                                  */
  /* ------------------------------------------------------------------ */

  /** marker capitals, jagged and filled, as their own picture */
  function mk(text, size, o) {
    o = o || {};
    var k = K(), t = String(text), w = k.markerWidth(t, size), max = o.max || 0, pad = Math.ceil(size * 0.3) + 4;
    if (max && w > max) w = max;
    return pic(k.marker(t, pad, size * 1.1 + 2, size, { fill: o.fill || T, maxWidth: max || undefined, seed: o.seed, halo: o.halo, haloW: 6 }), w + pad * 2, size * 1.45 + 4, { cls: 'ph-mk' + (o.cls ? ' ' + o.cls : '') });
  }
  /** cut-out ransom letters in black bars and paper chips */
  function rn(text, size, o) {
    o = o || {};
    var k = K(), w = k.ransomWidth(text, size);
    return pic(k.ransom(text, 6, size * 1.05 + 4, size, { seed: o.seed, stock: o.stock || 'goldenrod' }), w + 18, size * 1.5 + 8, { cls: 'ph-rn' });
  }

  /** the city's hot ink: only for what needs the player now (2b) */
  function hotInk() {
    var s = SB.UI.game ? SB.UI.game() : null, p = null;
    try { p = s ? SB.Cities.pack(s) : null; } catch (e) { p = null; }
    return K().ink(p && p.style && p.style.cityInks ? p.style.cityInks[0] : 'fireRed');
  }
  function lightInk(hex) { return hex === ink('fluorYellow') || hex === ink('mint') || hex === ink('lavender'); }
  /** "!!" and an arrow in hot marker, for a thing that needs you */
  function hotBang(seed) {
    var c = hotInk(), k = K();
    var bang = function (x, tilt) {
      return '<g transform="rotate(' + tilt + ' ' + x + ' 20)"><path d="M' + (x - 5) + ' 3L' + (x + 6) + ' 2L' + (x + 2) + ' 27L' + (x - 2) + ' 27Z" fill="' + c + '"' + (lightInk(c) ? ' stroke="' + T + '" stroke-width="1.6"' : '') + '/>' +
             '<path d="M' + (x - 3) + ' 31H' + (x + 3.5) + 'V37H' + (x - 3) + 'Z" fill="' + c + '"' + (lightInk(c) ? ' stroke="' + T + '" stroke-width="1.6"' : '') + '/></g>';
    };
    return pic(k.arrow(2, 32, 24, 18, { seed: 'ha' + seed, stroke: c, sw: 4, head: 9, wob: 2 }) + bang(36, -6) + bang(50, 4), 62, 42, { cls: 'ph-bang' });
  }
  /** an Identity SVG (a band mark or a person stamp) nested at x, y, scaled to size s from its own size n */
  function nest(svgStr, x, y, s, n) {
    var m = String(svgStr || '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/ role="img"/, '').replace(/ aria-label="[^"]*"/, '').replace('<svg', '<svg x="0" y="0"');
    return '<g transform="translate(' + f1(x) + ' ' + f1(y) + ') scale(' + f1(s / n * 100) / 100 + ')" style="color:' + T + '">' + m + '</g>';
  }
  /** a mark as a die-cut sticker: hard shadow, white scissor edge */
  function markPic(svgStr, n, size, seed) {
    var k = K();
    return pic(k.sticker({ rect: [5, 5, size, size] }, nest(svgStr, 5, 5, size, n), { seed: 'mk' + seed, edge: 3 }), size + 16, size + 18, { cls: 'ph-markpic' });
  }

  /* ------------------------------------------------------------------ */
  /* toner drawings                                                       */
  /* ------------------------------------------------------------------ */

  function P(cx, cy, sc) { return function (x, y) { return f1(cx + x * sc) + ' ' + f1(cy + y * sc); }; }

  /** head(cx, cy, sc, seed, faint): a xeroxed punk at a show: head and shoulders in toner, a haircut; faint ones are
   *  a halftone screen (the part of a range you are not sure of). No faces. */
  function head(cx, cy, sc, seed, faint, col) {
    var r = K().rng('hd' + seed), look = Math.floor(r.next() * 5), p = P(cx, cy, sc), fill = faint ? 'url(#dk-ht2)' : (col || T), out = '',
        edge = faint ? ' stroke="' + T + '" stroke-width="' + f1(0.7 * sc) + '" stroke-opacity=".7"' : '';
    out += '<path d="M' + p(-9, 16) + 'L' + p(-8.5, 8.5) + 'L' + p(-3, 5.5) + 'L' + p(3, 5.5) + 'L' + p(8.5, 8.5) + 'L' + p(9, 16) + 'Z" fill="' + fill + '"' + edge + '/>';
    out += '<path d="M' + p(-4.5, -5) + 'L' + p(-5.6, 0) + 'L' + p(-4, 4.6) + 'L' + p(0, 6) + 'L' + p(4, 4.6) + 'L' + p(5.6, 0) + 'L' + p(4.5, -5) + 'L' + p(0, -6.6) + 'Z" fill="' + fill + '"' + edge + '/>';
    if (look === 0) out += '<path d="M' + p(-2, -5.5) + 'L' + p(-1.2, -13) + 'L' + p(0, -7) + 'L' + p(1.2, -14) + 'L' + p(2.2, -5.5) + 'Z" fill="' + fill + '"/>';
    else if (look === 1) out += '<path d="M' + p(-5.8, -1.5) + 'L' + p(-5.2, -7.5) + 'L' + p(0, -9.5) + 'L' + p(5.2, -7.5) + 'L' + p(5.8, -1.5) + 'Z" fill="' + fill + '"/>';
    else if (look === 2) out += '<path d="M' + p(-5.4, -4) + 'L' + p(-7, 11) + 'L' + p(-3.6, 9) + 'L' + p(-3.8, 0) + 'Z M' + p(5.4, -4) + 'L' + p(7, 11) + 'L' + p(3.6, 9) + 'L' + p(3.8, 0) + 'Z" fill="' + fill + '"/>';
    else if (look === 3) out += '<path d="M' + p(-4.5, -4) + 'L' + p(-8, -10) + 'L' + p(-2, -6) + 'L' + p(0, -13) + 'L' + p(2, -6) + 'L' + p(8, -10) + 'L' + p(4.5, -4) + 'Z" fill="' + fill + '"/>';
    if (!faint && !col) out += '<path d="M' + p(-4, -3) + 'L' + p(-4.8, 1) + 'L' + p(-3, 3.6) + 'Z" fill="' + W + '"/><path d="M' + p(-7.6, 10) + 'L' + p(-6.8, 15.6) + 'L' + p(-5, 15.6) + 'Z" fill="' + W + '" fill-opacity=".8"/>';
    return out;
  }

  /** crowd(solid, faint, seed, cols): heads in staggered rows; the faint ones are halftone. Returns [inner, w, h]. */
  function crowd(solid, faint, seed, cols) {
    var total = Math.max(1, solid + faint), rows = Math.ceil(total / cols), w = cols * 16 + 18, ht = rows * 17 + 22, out = '', i, x, y;
    for (i = total - 1; i >= 0; i--) {
      if (i >= solid + faint) continue;
      x = 11 + (i % cols) * 16 + (Math.floor(i / cols) % 2 ? 7 : 0); y = 12 + Math.floor(i / cols) * 17;
      out += head(x, y, 0.85, seed + i, i >= solid);
    }
    return [out, w, ht];
  }

  /** clock(cx, cy, r, hours): a clock face with one fat toner tick per hour the thing takes */
  function clock(cx, cy, r, hours, seed) {
    var k = K(), out = k.circle(cx, cy, r, { seed: seed + 'f', fill: W, sw: Math.max(2, r / 4.5), wob: 0.6 }), i, a, a2;
    for (i = 0; i < Math.max(0, Math.min(12, hours)); i++) {
      a = (i * 30 - 96) * Math.PI / 180; a2 = (i * 30 - 84) * Math.PI / 180;
      out += '<path d="M' + f1(cx) + ' ' + f1(cy) + 'L' + f1(cx + Math.cos(a) * r * 0.9) + ' ' + f1(cy + Math.sin(a) * r * 0.9) + 'L' + f1(cx + Math.cos(a2) * r * 0.9) + ' ' + f1(cy + Math.sin(a2) * r * 0.9) + 'Z" fill="' + T + '"/>';
    }
    out += '<path d="M' + f1(cx) + ' ' + f1(cy) + 'L' + f1(cx) + ' ' + f1(cy - r * 0.6) + 'M' + f1(cx) + ' ' + f1(cy) + 'L' + f1(cx + r * 0.45) + ' ' + f1(cy + r * 0.12) +
           '" stroke="' + T + '" stroke-width="' + f1(Math.max(1.6, r / 6)) + '" stroke-linecap="square"/>';
    return out;
  }

  /** glyph(kind, s): a small toner drawing in an s by s box, as if photocopied from a snapshot and cut out */
  function glyph(kind, s, sd) {
    var k = K(), c = s / 2, q = function (v) { return f1(v * s); }, out = '', seed = 'g' + kind + (sd || '');
    switch (kind) {
      case 'LISTEN':
        out = '<circle cx="' + q(0.5) + '" cy="' + q(0.5) + '" r="' + q(0.46) + '" fill="' + T + '"/>' +
              '<circle cx="' + q(0.5) + '" cy="' + q(0.5) + '" r="' + q(0.37) + '" fill="none" stroke="' + W + '" stroke-width="' + f1(s / 60) + '" stroke-opacity=".7"/>' +
              '<circle cx="' + q(0.5) + '" cy="' + q(0.5) + '" r="' + q(0.29) + '" fill="none" stroke="' + W + '" stroke-width="' + f1(s / 70) + '" stroke-opacity=".6"/>' +
              k.dots('M' + q(0.2) + ' ' + q(0.16) + 'L' + q(0.42) + ' ' + q(0.07) + 'L' + q(0.5) + ' ' + q(0.5) + 'Z', 3, { white: true }) +
              '<circle cx="' + q(0.5) + '" cy="' + q(0.5) + '" r="' + q(0.15) + '" fill="' + W + '"/><circle cx="' + q(0.5) + '" cy="' + q(0.5) + '" r="' + q(0.03) + '" fill="' + T + '"/>' +
              k.scrawl(q(0.4), q(0.47), q(0.2), { seed: seed, sw: 1, amp: 1 });
        break;
      case 'CLIP':
        out = '<path d="M' + q(0.3) + ' ' + q(0.2) + 'L' + q(0.5) + ' ' + q(0.32) + 'L' + q(0.68) + ' ' + q(0.12) + '" stroke="' + T + '" stroke-width="' + f1(s / 26) + '" fill="none"/>' +
              k.rect(q(0.06), q(0.3), q(0.88), q(0.6), { seed: seed, fill: T, sw: 0, wob: 0.5 }) +
              '<path d="M' + q(0.13) + ' ' + q(0.37) + 'H' + q(0.7) + 'V' + q(0.83) + 'H' + q(0.13) + 'Z" fill="' + W + '"/>' + k.dotsRect(q(0.13), q(0.6), q(0.57), q(0.23), 2) +
              '<path d="M' + q(0.33) + ' ' + q(0.47) + 'L' + q(0.53) + ' ' + q(0.6) + 'L' + q(0.33) + ' ' + q(0.73) + 'Z" fill="' + T + '"/>' +
              '<circle cx="' + q(0.82) + '" cy="' + q(0.47) + '" r="' + q(0.05) + '" fill="' + W + '"/><circle cx="' + q(0.82) + '" cy="' + q(0.68) + '" r="' + q(0.05) + '" fill="' + W + '"/>';
        break;
      case 'HISTORY':
        out = k.rect(q(0.1), q(0.12), q(0.56), q(0.74), { seed: seed + 'a', fill: W, sw: 2, rot: -10, wob: 0.5 }) +
              k.rect(q(0.32), q(0.08), q(0.56), q(0.76), { seed: seed + 'b', fill: W, sw: 2.2, rot: 6, wob: 0.5 }) +
              '<g transform="rotate(6 ' + q(0.6) + ' ' + q(0.46) + ')"><path d="M' + q(0.38) + ' ' + q(0.16) + 'H' + q(0.82) + 'V' + q(0.34) + 'H' + q(0.38) + 'Z" fill="' + T + '"/>' +
              k.dotsRect(q(0.38), q(0.4), q(0.44), q(0.2), 3) + k.scrawl(q(0.4), q(0.68), q(0.38), { seed: seed + 's', sw: 1.4 }) + k.scrawl(q(0.4), q(0.76), q(0.3), { seed: seed + 't', sw: 1.4 }) + '</g>';
        break;
      case 'ASK_BOOKER':
        out = k.rect(q(0.06), q(0.22), q(0.88), q(0.58), { seed: seed, fill: W, sw: 2.4, wob: 0.5 }) +
              '<path d="M' + q(0.07) + ' ' + q(0.24) + 'L' + q(0.5) + ' ' + q(0.56) + 'L' + q(0.93) + ' ' + q(0.24) + '" stroke="' + T + '" stroke-width="' + f1(s / 24) + '" fill="none"/>' +
              '<path d="M' + q(0.7) + ' ' + q(0.28) + 'H' + q(0.88) + 'V' + q(0.46) + 'H' + q(0.7) + 'Z" fill="' + T + '"/>' + k.dotsRect(q(0.72), q(0.3), q(0.14), q(0.14), 2, { white: true });
        break;
      case 'ASK_AROUND':
        out = head(q(0.28), q(0.62), s / 44, seed + 'a') + head(q(0.66), q(0.66), s / 44, seed + 'b') +
              k.rect(q(0.42), q(0.04), q(0.52), q(0.26), { seed: seed + 'q', fill: W, sw: 2, wob: 0.5 }) +
              '<path d="M' + q(0.5) + ' ' + q(0.3) + 'L' + q(0.46) + ' ' + q(0.4) + 'L' + q(0.6) + ' ' + q(0.3) + 'Z" fill="' + T + '"/>' + k.scrawl(q(0.48), q(0.17), q(0.38), { seed: seed + 'w', sw: 1.3, amp: 1.4 });
        break;
      case 'MEAL':
        out = '<path d="M' + q(0.14) + ' ' + q(0.2) + 'L' + q(0.88) + ' ' + q(0.32) + 'L' + q(0.34) + ' ' + q(0.9) + 'Z" fill="' + T + '"/>' +
              '<path d="M' + q(0.14) + ' ' + q(0.2) + 'L' + q(0.88) + ' ' + q(0.32) + '" stroke="' + W + '" stroke-width="' + f1(s / 14) + '" stroke-dasharray="' + f1(s / 10) + ' ' + f1(s / 30) + '"/>' +
              '<circle cx="' + q(0.42) + '" cy="' + q(0.42) + '" r="' + q(0.06) + '" fill="' + W + '"/><circle cx="' + q(0.6) + '" cy="' + q(0.42) + '" r="' + q(0.05) + '" fill="' + W + '"/><circle cx="' + q(0.42) + '" cy="' + q(0.64) + '" r="' + q(0.05) + '" fill="' + W + '"/>';
        break;
      case 'FLOOR':
        out = k.rect(q(0.06), q(0.34), q(0.88), q(0.44), { seed: seed, fill: T, sw: 0, wob: 0.4 }) +
              k.hatch(q(0.32), q(0.36), q(0.6), q(0.4), { seed: seed + 'h', stroke: W, sw: 1.6, gap: s / 7 }) +
              k.rect(q(0.1), q(0.4), q(0.22), q(0.32), { seed: seed + 'p', fill: W, sw: 1.8, wob: 0.4 }) +
              k.marker('Z', q(0.62), q(0.26), s * 0.22, { seed: seed + 'z' }) + k.marker('Z', q(0.78), q(0.14), s * 0.16, { seed: seed + 'y' });
        break;
      case 'HEADS': out = head(q(0.22), q(0.5), s / 46, seed + 'a') + head(q(0.5), q(0.42), s / 44, seed + 'b') + head(q(0.78), q(0.52), s / 46, seed + 'c'); break;
      case 'VAN':
        out = '<path d="M' + q(0.04) + ' ' + q(0.72) + 'V' + q(0.3) + 'L' + q(0.1) + ' ' + q(0.22) + 'H' + q(0.7) + 'L' + q(0.86) + ' ' + q(0.42) + 'L' + q(0.96) + ' ' + q(0.48) + 'V' + q(0.72) + 'Z" fill="' + T + '"/>' +
              '<path d="M' + q(0.14) + ' ' + q(0.3) + 'H' + q(0.36) + 'V' + q(0.46) + 'H' + q(0.14) + 'Z M' + q(0.42) + ' ' + q(0.3) + 'H' + q(0.66) + 'V' + q(0.46) + 'H' + q(0.42) + 'Z M' + q(0.72) + ' ' + q(0.3) + 'L' + q(0.82) + ' ' + q(0.44) + 'H' + q(0.72) + 'Z" fill="' + W + '"/>' +
              '<circle cx="' + q(0.24) + '" cy="' + q(0.74) + '" r="' + q(0.1) + '" fill="' + T + '" stroke="' + W + '" stroke-width="' + f1(s / 26) + '"/><circle cx="' + q(0.76) + '" cy="' + q(0.74) + '" r="' + q(0.1) + '" fill="' + T + '" stroke="' + W + '" stroke-width="' + f1(s / 26) + '"/>';
        break;
      case 'KEY':
        out = '<circle cx="' + q(0.26) + '" cy="' + q(0.5) + '" r="' + q(0.2) + '" fill="' + T + '"/><circle cx="' + q(0.22) + '" cy="' + q(0.5) + '" r="' + q(0.07) + '" fill="' + W + '"/>' +
              '<path d="M' + q(0.4) + ' ' + q(0.44) + 'H' + q(0.94) + 'V' + q(0.56) + 'H' + q(0.88) + 'V' + q(0.68) + 'H' + q(0.8) + 'V' + q(0.56) + 'H' + q(0.74) + 'V' + q(0.64) + 'H' + q(0.66) + 'V' + q(0.56) + 'H' + q(0.4) + 'Z" fill="' + T + '"/>';
        break;
      case 'TICK': out = k.path([[q(0.14), q(0.5)], [q(0.4), q(0.8)], [q(0.9), q(0.12)]], { seed: seed, sw: s * 0.14, cap: 'square', wob: 0.6 }); break;
      case 'X': out = k.xout(q(0.18), q(0.18), q(0.64), q(0.64), { seed: seed, sw: s * 0.12 }); break;
      default: out = k.star(c, c, s * 0.8, { seed: seed });
    }
    return out;
  }
  function gpic(kind, s, sd, cls) { return pic(glyph(kind, s, sd), s, s, { cls: 'ph-glyph' + (cls ? ' ' + cls : '') }); }

  /** the phone itself: a xeroxed cut-out lying on the table, drawn at the size it is held */
  function shellSvg(w, ht) {
    var k = K(), e = 14, c = 30, pts = [[e + c, e], [w - e - c, e], [w - e, e + c], [w - e, ht - e - c], [w - e - c, ht - e], [e + c, ht - e], [e, ht - e - c], [e, e + c]], inner = '', out = '';
    out += '<path d="M' + (e - 6) + ' 150H' + (e + 4) + 'V202H' + (e - 6) + 'Z M' + (e - 6) + ' 222H' + (e + 4) + 'V252H' + (e - 6) + 'Z M' + (w - e - 4) + ' 180H' + (w - e + 6) + 'V250H' + (w - e - 4) + 'Z" fill="' + T + '" stroke="' + W + '" stroke-width="3"/>';
    inner += k.dots('M' + (e + c) + ' ' + e + 'L' + (e + c + 90) + ' ' + e + 'L' + e + ' ' + f1(ht * 0.42) + 'L' + e + ' ' + (e + c) + 'Z', 2, { white: true });
    inner += k.dots('M' + (w - e) + ' ' + f1(ht * 0.62) + 'L' + (w - e) + ' ' + f1(ht * 0.7) + 'L' + f1(w * 0.55) + ' ' + (ht - e) + 'L' + f1(w * 0.47) + ' ' + (ht - e) + 'Z', 1, { white: true });
    inner += k.dotsRect(w / 2 - 34, e + 20, 68, 7, 4, { white: true });
    inner += '<circle cx="' + f1(w / 2 + 52) + '" cy="' + (e + 24) + '" r="5" fill="none" stroke="' + W + '" stroke-width="1.6"/>';
    inner += '<path d="M' + f1(w / 2 - 40) + ' ' + (ht - e - 16) + 'H' + f1(w / 2 + 40) + '" stroke="' + W + '" stroke-width="4" stroke-opacity=".55"/>';
    return out + k.cutout(pts, inner, { seed: 'phshell', edge: 7 });
  }

  /** the crack across one corner of the glass: drawn over everything, taking no clicks */
  function crack() {
    var k = K(), out = '';
    out += k.path([[170, 0], [140, 22], [148, 40], [104, 66], [72, 70]], { seed: 'cr1', sw: 1.3, wob: 0.5 });
    out += k.path([[140, 22], [110, 16], [86, 28]], { seed: 'cr2', sw: 1, wob: 0.5 });
    out += k.path([[148, 40], [166, 64], [170, 96]], { seed: 'cr3', sw: 1, wob: 0.5 });
    return pic('<g opacity=".55">' + out + '</g>', 170, 100, { cls: 'ph-crack' });
  }

  /* ------------------------------------------------------------------ */
  /* the signs: one form per kind of thing (07-desk.md 2b)               */
  /* ------------------------------------------------------------------ */

  /** tab(key, label, onClick, o): a tear-off tab, the one sign for a choice or an action. o.icon (element), o.on,
   *  o.done (torn off), o.hot (needs you), o.big, o.n, o.sub, o.disabled, o.aria, o.pressed, o.role, o.checked, o.option. */
  function tab(key, label, onClick, o) {
    o = o || {};
    var hot = o.hot ? hotInk() : null;
    return h('button', { type: 'button', class: ['ph-tab', 'pz-hl', o.on ? 'is-on' : '', o.done ? 'is-done' : '', o.hot ? 'is-hot' : '', o.big ? 'is-big' : '', o.cls || ''],
                         data: { fk: 'tab-' + key, option: o.option, tut: o.tut, 'tut-ref': o.ref }, disabled: !!o.disabled, role: o.role || null,
                         aria: { pressed: o.role ? null : o.pressed, checked: o.checked, label: o.aria || label },
                         style: hot ? { '--hot': hot, '--hot-ink': lightInk(hot) ? T : W } : null, on: { click: onClick } }, [
      o.n ? h('span', { class: 'ph-tab-n', text: o.n }) : null,
      o.done ? gpic('TICK', 16, key, 'ph-tab-tick') : null,
      o.icon || null,
      h('span', { class: 'ph-tab-t', text: up(label) }),
      o.sub ? h('span', { class: 'ph-tab-sub', text: o.sub }) : null
    ]);
  }
  /** strip(key, text, onClick, aria): a label-maker strip, the one sign for "this opens something" */
  function strip(key, text, onClick, aria) {
    return h('button', { type: 'button', class: 'ph-strip ph-strip--btn pz-hl', data: { fk: key }, aria: { label: aria || text }, on: { click: onClick } }, up(text));
  }
  /** tickBox(key, label, on, glyphKind, onClick, radio): a drawn box to tick, with a typed label */
  function tickBox(key, label, on, dood, onClick, radio) {
    var k = K(), out = k.rect(4, 5, 22, 22, { seed: 'tb' + key, fill: W, sw: 2.6, wob: 0.7, over: 2.5 });
    if (on) out += k.path([[6, 15], [13, 25], [30, 2]], { seed: 'tk' + key, sw: 4.2, cap: 'square', wob: 0.8, stroke: ink('ballpointBlue') });
    return h('button', { type: 'button', class: 'ph-tick pz-hl' + (on ? ' is-on' : ''), data: { fk: 'tick-' + key }, role: radio ? 'radio' : 'checkbox', aria: { checked: on ? 'true' : 'false', label: label }, on: { click: onClick } }, [
      pic(out, 34, 32), dood ? gpic(dood, 30, key) : null, h('span', { class: 'ph-tick-t', text: label })
    ]);
  }
  function fringe(cls, label, kids, data) { return h('div', { class: 'ph-fringe' + (cls ? ' ' + cls : ''), role: 'group', aria: { label: label }, data: data || null }, kids); }
  function kicker(text) { return h('p', { class: 'ph-k', text: up(text) }); }

  /* ------------------------------------------------------------------ */
  /* the screen                                                          */
  /* ------------------------------------------------------------------ */

  function mount(root, params) {
    var tab0 = 'ALL', convKey = null, view = 'list', draft = {}, alive = true, lastView = null, scrollMem = {}, ro = null;

    function st() { return SB.UI.game(); }
    function act(fn) { return SB.UI.act(fn); }

    /* ---------------- conversations ---------------- */

    function keyOf(s, m) {
      var r = m.refs || {}, a = r.askId && s.asks ? s.asks[r.askId] : null;
      if (r.requestId) return 'q:' + r.requestId;
      if (a && a.requestId) return 'q:' + a.requestId;
      if (a && a.payload && a.payload.requestId) return 'q:' + a.payload.requestId;
      if (r.bandId) return 'b:' + r.bandId;
      return m.fromId != null ? 'p:' + m.fromId : 'n:' + (m.fromName || m.id);
    }
    function reqOfKey(s, key) { return key && key.indexOf('q:') === 0 && s.requests ? s.requests[key.slice(2)] || null : null; }
    function goneQ(q) { return !!q && !OPEN[q.status] && q.status !== 'ACCEPTED'; }

    function conversations(s, filter) {
      var all = safe(function () { return SB.Mail.inbox(s, 'ALL'); }, []), shown = filter === 'ALL' ? all : safe(function () { return SB.Mail.inbox(s, filter); }, []),
          by = {}, order = [], needIds = {}, needs = safe(function () { return SB.Mail.needsYou(s); }, []);
      needs.forEach(function (n) { if (n.k === 'REQUEST') needIds['q:' + n.id] = 1; });
      all.forEach(function (m) {
        var k = keyOf(s, m);
        if (!by[k]) by[k] = { key: k, msgs: [], unread: false, needs: false, req: reqOfKey(s, k) };
        by[k].msgs.push(m);
        if (!m.read) by[k].unread = true;
      });
      shown.forEach(function (m) { var k = keyOf(s, m); if (order.indexOf(k) < 0) order.push(k); });
      return order.map(function (k) {
        var c = by[k];
        c.last = c.msgs[0];
        c.msgs = c.msgs.slice().reverse();
        c.needs = c.req ? !!needIds[k] : c.msgs.some(function (m) { return m.needs; });
        c.gone = goneQ(c.req);
        return c;
      });
    }
    function convOf(s, key) { return conversations(s, 'ALL').filter(function (c) { return c.key === key; })[0] || null; }

    function bandFor(s, c) {
      var id = c.req ? c.req.bandId : null, i;
      if (!id) for (i = 0; i < c.msgs.length; i++) if (c.msgs[i].refs && c.msgs[i].refs.bandId) { id = c.msgs[i].refs.bandId; break; }
      return id && s.bands && s.bands[id] ? s.bands[id] : null;
    }
    /** the conversation's mark as a die-cut sticker: the band's mark for a band, the person's stamp for a person */
    function avatar(s, c, size) {
      var b = bandFor(s, c), m = c.last || c.msgs[c.msgs.length - 1] || {}, p = m.fromId != null && s.people ? s.people[m.fromId] : null;
      if (c.req && b) return markPic(SB.Identity.bandMark({ id: b.id, name: b.name, genre: b.genre }, 20), 20, size, b.id);
      if (p) return markPic(SB.Identity.personStamp({ id: p.id, first: p.first, last: p.last, instrument: p.instrument }, 40), 40, size, p.id);
      if (b) return markPic(SB.Identity.bandMark({ id: b.id, name: b.name, genre: b.genre }, 20), 20, size, b.id);
      return pic(K().sticker({ rect: [5, 5, size, size] }, K().cat(5 + size / 2, 7 + size / 2, size * 0.8, { seed: 'av' + c.key }), { seed: 'avs' + c.key, edge: 3 }), size + 16, size + 18, { cls: 'ph-markpic' });
    }
    function nameOf(s, c) {
      var m = c.last || {}, b = bandFor(s, c);
      return m.fromName || (b ? b.name : '');
    }

    function openConv(key, v) {
      var s = st(), c = convOf(s, key), unread;
      convKey = key; draft = {};
      view = v || (c && c.req && !c.gone ? 'page' : 'chat');
      unread = c ? c.msgs.filter(function (m) { return !m.read; }).map(function (m) { return m.id; }) : [];
      if (unread.length) act(function (x) { unread.forEach(function (id) { SB.Mail.markRead(x, id); }); return { ok: true }; });
      render();
    }
    function toList() { view = 'list'; convKey = null; draft = {}; render(); }

    /* ---------------- render ---------------- */

    /* the body is drawn in phone units (460 wide); only its height can differ, and the copier's grain follows the window */
    function drawShell(phone, shell) {
      var w = phone.offsetWidth || 460, ht = phone.offsetHeight || 752, hp = Math.round(ht / (w / 460)), key = hp + '@' + copyRes();
      if (shell.getAttribute('data-size') === key) return;
      shell.setAttribute('data-size', key);
      SB.UI.clear(shell);
      shell.appendChild(pic(shellSvg(460, hp), 460, hp));
    }

    /* the moves (js/ui/finish.js): the rows slap down one after another when the list is new or filtered, a new page in
       the phone tears across, and the count of who needs an answer is stamped on and counted up */
    var animKey = null, lastNeed = 0;
    function moves(phone, body, same, first) {
      var F = SB.Finish, hero, n, rows, key = view + ':' + tab0;
      if (!F) return;
      F.scrollbar(body);
      if (!same && !first) F.move(body, 'wipe');
      if (view === 'list' && key !== animKey) {
        rows = Array.prototype.slice.call(body.querySelectorAll('.ph-convs > li'));
        F.stagger(rows, first ? 3 : 0);
        rows.forEach(function (li) { li.classList.add('mv-slap'); });
      }
      animKey = key;
      hero = phone.querySelector('.ph-hero-need');
      if (hero) {
        n = parseInt(hero.getAttribute('data-n'), 10) || 0;
        if (n !== lastNeed) {
          F.move(hero, 'stamp', { delay: first ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
          F.countUp(hero.querySelector('.ph-hn-n'), n, { from: first ? 0 : lastNeed, delay: (first ? 220 : 0) + 83 });
        }
        lastNeed = n;
      } else lastNeed = 0;
    }

    function render() {
      var s = st(), a = (typeof document !== 'undefined') ? document.activeElement : null, fk = a && a.getAttribute ? a.getAttribute('data-fk') : null,
          old = root.querySelector ? root.querySelector('.ph-body') : null, c = null, body, el, phone, shell, same, glass;
      if (!alive) return;
      if (old && lastView) scrollMem[lastView + (convKey || '')] = old.scrollTop;
      if (ro) { try { ro.disconnect(); } catch (e) { /* fine */ } ro = null; }
      SB.UI.clear(root);
      if (!s) { root.appendChild(C().Empty({})); return; }
      if (view !== 'list') { c = convOf(s, convKey); if (!c) { view = 'list'; convKey = null; } }
      if (c && view === 'page' && !c.req) view = 'chat';
      same = lastView === view;
      shell = h('div', { class: 'ph-shell', aria: { hidden: 'true' } });
      glass = h('div', { class: 'ph-glass ph--' + view }, [
        statusBar(s),
        view === 'list' ? null : convHead(s, c),
        body = h('div', { class: 'ph-body', tabindex: '-1' }, view === 'list' ? listView(s) : (view === 'chat' ? chatView(s, c) : (view === 'page' ? pageView(s, c) :
          passView(s, c)))),
        view === 'list' ? null : dock(s, c),
        crack()
      ]);
      phone = h('div', { class: 'ph-phone', role: 'region', aria: { label: L('phone') } }, [shell, glass, view === 'list' ? heroNeed(s) : null]);
      root.appendChild(h('div', { class: 'ph' }, phone));
      drawShell(phone, shell);
      safe(function () { moves(phone, body, same, lastView === null); });
      if (typeof ResizeObserver === 'function') {
        ro = new ResizeObserver(function () { if (alive) drawShell(phone, shell); });
        try { ro.observe(phone); } catch (e) { /* fine */ }
      }
      if (same && scrollMem[view + (convKey || '')]) body.scrollTop = scrollMem[view + (convKey || '')];
      lastView = view;
      el = fk ? safe(function () { return root.querySelector('[data-fk="' + fk + '"]'); }, null) : null;
      if (!el && !same) el = root.querySelector('[data-fk="back"]') || root.querySelector('[data-fk="tab-f' + tab0 + '"]');
      if (el && el.focus && (fk || !same)) { try { el.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
    }

    function statusBar(s) {
      var k = K(), bars = '', i;
      for (i = 0; i < 4; i++) bars += '<path d="M' + (i * 6 + 2) + ' 14V' + (12 - i * 3) + 'H' + (i * 6 + 6) + 'V14Z" fill="' + T + '"/>';
      return h('div', { class: 'ph-status', aria: { hidden: 'true' } }, [
        h('span', { class: 'ph-status-day', text: num(s.clock && s.clock.day) ? up(SB.time.fmt(s.clock.day, 'short')) : '' }),
        pic(bars + k.rect(30, 3, 26, 11, { seed: 'bat', sw: 1.8, wob: 0.3, over: 1 }) + '<path d="M33 6H41V11H33Z" fill="' + T + '"/><path d="M57 6H60V11H57Z" fill="' + T + '"/>', 62, 16, { cls: 'ph-bat' })
      ]);
    }

    /* ---------------- the list ---------------- */

    function listView(s) {
      var filter = TABS.filter(function (t) { return t[0] === tab0; })[0][1], list = conversations(s, filter);
      return [
        /* no "messages" label on a phone's messages: the heading is for screen readers only */
        h('h2', { class: 'ph-title ph-sr', text: L('title') }),
        /* the walkthrough: the outgoing booker's texts, pinned above the mail (js/ui/story.js) */
        SB.UI.story && SB.UI.story.phone ? safe(function () { return SB.UI.story.phone(s); }, null) : null,
        fringe('ph-fringe--filters', L('filters'), TABS.map(function (t) {
          var on = t[0] === tab0;
          return tab('f' + t[0], L('tabs.' + t[0]), function () { tab0 = t[0]; render(); }, { on: on, pressed: on ? 'true' : 'false', aria: L('tabsLong.' + t[0]), tut: t[0] === 'NEEDS' ? 'inbox-answer-filter' : null });
        })),
        list.length ? h('ul', { class: 'ph-convs', aria: { label: L('title') } }, list.map(function (c, i) { return row(s, c, i); }))
          : h('div', { class: 'ph-empty' }, [pic(K().cat(50, 46, 70, { seed: 'zz', sleepy: true }), 100, 80), h('p', { text: up(L('empty')) })])
      ];
    }

    /* the one loud thing on the list: how many need an answer, on a torn scrap stamped across the phone. It is the
       "answer" filter too: pressing it shows just them, pressing it again shows everything. */
    function heroNeed(s) {
      var need = conversations(s, 'ALL').filter(function (c) { return c.needs; }).length, on = tab0 === 'NEEDS';
      if (!need) return null;
      return h('button', { type: 'button', class: 'ph-hero-need pz-paper pz-hl' + (on ? ' is-on' : ''), data: { fk: 'hero-need', n: String(need) },
                           aria: { label: L('needN', { n: need }) + '. ' + L(on ? 'heroAll' : 'heroGo'), pressed: on ? 'true' : 'false' },
                           on: { click: function () { tab0 = on ? 'ALL' : 'NEEDS'; render(); } } }, [
        h('span', { class: 'ph-hn-n', text: String(need) }),
        h('span', { class: 'ph-hn-t', text: L('needN', { n: '' }).replace(/^\s+|\s+$/g, '') }),
        h('span', { class: 'ph-hn-go', text: up(L(on ? 'heroAll' : 'heroGo')) })
      ]);
    }

    function row(s, c, i) {
      var m = c.last, name = nameOf(s, c), line = (m.subject && m.kind === 'REQUEST' ? m.subject : (m.body || m.subject || '')).replace(/\s+/g, ' ');
      return h('li', null, h('button', { type: 'button', class: ['ph-row', 'pz-paper', 'pz-hl', 'ph-cut' + (i % 3), c.unread ? 'is-unread' : '', c.gone ? 'is-gone' : '', c.needs ? 'is-needs' : ''], data: { fk: 'c-' + c.key, tut: c.req ? 'req-row' : null, 'tut-ref': c.req ? c.req.id : null },
        aria: { label: name + (c.needs ? ', ' + L('needs') : '') + (c.unread ? ', ' + L('unread') : '') }, on: { click: function () { openConv(c.key); } } }, [
        h('span', { class: 'ph-row-mark' }, avatar(s, c, 38)),
        h('span', { class: 'ph-row-mid' }, [
          h('span', { class: 'ph-strip', text: up(name) }),
          h('span', { class: 'ph-row-line', text: line })
        ]),
        h('span', { class: 'ph-row-end' }, [
          num(m.day) ? h('span', { class: 'ph-row-day', text: up(SB.time.fmt(m.day, 'md')) }) : null,
          c.needs ? hotBang(c.key) : (c.unread ? h('span', { class: 'ph-unread', aria: { hidden: 'true' } }) : null)
        ])
      ]));
    }

    /* ---------------- a conversation's head ---------------- */

    /* ---- the photo attached to a text: a band's players (kit cut-outs) or the room (a drawn scene through the copier) ---- */
    var PLAYERS = [['singer-01', 'guitar-05', 'drums-01'], ['singer-03', 'bass-03', 'guitar-02'], ['singer-08', 'guitar-06', 'bass-02'], ['singer-05', 'bass-05', 'guitar-01'],
                   ['singer-07', 'guitar-04', 'drums-03'], ['singer-02', 'guitar-08', 'bass-01'], ['singer-09', 'guitar-07', 'drums-02'], ['singer-06', 'bass-04', 'guitar-03']];
    var ROOM_ART2 = { HOUSE: 'CARPORT_EMPTY', OUTDOOR: 'CARPORT_NIGHT', DIY: 'EMPTY_ROOM', HALL: 'EMPTY_ROOM', BAR: 'BAR_DOOR', CLUB: 'BAR_DOOR', SHOP: 'STOREFRONT', BIG: 'BAR_DOOR' };
    function hashOf(t) { var n = 0, i; t = String(t); for (i = 0; i < t.length; i++) n = (n * 31 + t.charCodeAt(i)) >>> 0; return n; }
    function roomFor(s, c) {
      var i, m, r, id, k;
      for (i = 0; i < c.msgs.length; i++) {
        m = c.msgs[i];
        if (m.refs && m.refs.showId && s.shows && s.shows[m.refs.showId] && s.shows[m.refs.showId].roomId && s.rooms && s.rooms[s.shows[m.refs.showId].roomId]) return s.rooms[s.shows[m.refs.showId].roomId];
      }
      m = c.last || c.msgs[c.msgs.length - 1] || {};
      if (m.fromId != null && s.rooms) for (k in s.rooms) { r = s.rooms[k]; id = r.ownerId != null ? r.ownerId : r.owner; if (id != null && id === m.fromId) return r; }
      return null;
    }
    function attachment(s, c) {
      var b = bandFor(s, c), room = b ? null : roomFor(s, c), KT = SB.UI.Kit, fig, cv, key, S = SB.Scenes;
      if (b && KT && KT.photo) {
        return h('div', { class: 'ph-attach ph-attach--band' }, KT.photo({ ids: PLAYERS[hashOf(b.id) % PLAYERS.length], w: 300, h: 168, unit: 'var(--p)', res: copyRes(), paper: STOCK[hashOf(b.id + 'p') % STOCK.length],
          tape: ['tl', 'tr'], rot: -1, caption: up(b.name) + (b.home ? ' / ' + up(b.home) : ''), seed: 'att' + b.id, alt: b.name }));
      }
      if (room && S && S.draw && typeof document !== 'undefined') {
        key = ROOM_ART2[room.kind] || 'EMPTY_ROOM';
        cv = document.createElement('canvas'); cv.width = 600; cv.height = 336; cv.className = 'ph-attach__c'; cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', room.name);
        safe(function () { S.draw(cv, key, { seed: 'att' + room.id, paper: 'canary', room: room.name, empty: room.open === false }); });
        fig = h('figure', { class: 'ph-attach__f' }, [KT && KT.tape ? KT.tape({ at: 'tl' }) : null, KT && KT.tape ? KT.tape({ at: 'tr' }) : null, cv,
          h('figcaption', { class: 'ph-attach__cap', text: up(room.name) })]);
        return h('div', { class: 'ph-attach ph-attach--room' }, fig);
      }
      return null;
    }

    function convHead(s, c) {
      var name = nameOf(s, c), showId = null, i, sub = view === 'hold' || view === 'pass' || view === 'slip';
      for (i = 0; i < c.msgs.length; i++) if (c.msgs[i].refs && c.msgs[i].refs.showId && s.shows && s.shows[c.msgs[i].refs.showId]) showId = c.msgs[i].refs.showId;
      return h('div', { class: 'ph-head' }, [
        h('div', { class: 'ph-head-row' }, [
          strip('back', '« ' + (sub ? L(c.req ? 'pageShort' : 'chat') : L('backShort')), function () {
            if (sub) { view = c.req && !c.gone ? 'page' : 'chat'; draft.mode = null; render(); } else toList();
          }, sub ? L(c.req ? 'page' : 'chat') : L('back')),
          h('span', { class: 'ph-head-mark' }, avatar(s, c, 30)),
          h('h2', { class: 'ph-head-name', aria: { label: name } }, mk(up(name), 19, { max: 200, seed: 'hn' })),
          showId ? strip('show', L('show'), function () { SB.UI.go('show', { showId: showId }); }, L('toShow')) : null
        ]),
        c.req && !sub ? fringe('ph-fringe--views', L('page'), [segTab('page', 'pageShort', 'page'), segTab('chat', 'chat', 'chat')], { tut: 'req-tabs', 'tut-ref': c.req.id }) : null
      ]);
    }
    function segTab(v, key, longKey) {
      var on = view === v;
      return tab('seg-' + v, L(key), function () { view = v; render(); }, { on: on, pressed: on ? 'true' : 'false', aria: L(longKey) });
    }

    /* ---------------- the chat ---------------- */

    function chatView(s, c) {
      var q = c.req, rv = q ? safe(function () { return SB.Requests.view(s, q.id); }, null) : null, items = [], out = [], lastDay = null, d;
      c.msgs.forEach(function (m) { items.push({ who: 'them', day: num(m.day) ? m.day : 0, m: m }); });
      if (q) {
        if (s.mail && s.mail.extended && s.mail.extended[q.id]) {
          items.push({ who: 'me', day: s.mail.replied && num(s.mail.replied[q.id]) ? s.mail.replied[q.id] : (c.msgs[0] ? c.msgs[0].day : 0), text: safe(function () { return SB.text.line('requests.compose.INTERESTED', {}, null); }, ''), mark: 'sent' });
        }
        (q.offers || []).forEach(function (o) {
          if (o.by !== 'player') return;
          items.push({ who: 'me', day: o.day, text: (num(o.date) ? SB.time.fmt(o.date, 'short') + '. ' : '') + dealWords(o.deal || {}) + (o.deal && o.deal.lodging ? ', ' + L('lodging') : '') + (o.deal && o.deal.meal ? ', ' + L('meal') : '') + '.', mark: 'sent' });
        });
        safe(function () { return SB.Mail.waiting(s); }, []).forEach(function (a) {
          if (ofConv(s, c, a)) items.push({ who: 'me', day: num(a.sentDay) ? a.sentDay : s.clock.day, text: toWho(s, c, a) + (a.what || ''), mark: 'waiting' });
        });
      }
      items.sort(function (x, y) { return x.day - y.day || (x.who === 'them' ? -1 : 1); });
      items.forEach(function (it) {
        if (it.day !== lastDay) { out.push(h('p', { class: 'ph-daystamp' }, h('span', { text: up(SB.time.fmt(it.day, 'short')) }))); lastDay = it.day; }
        out.push(it.who === 'them' ? theirBubble(s, it.m, rv, c) : myBubble(it.text, it.mark));
      });
      queuedFor(s, c).forEach(function (o) { out.push(myBubble(toWho(s, c, o) + (o.what || ''), 'queued')); });
      if (rv && rv.shortNotice) out.push(h('p', { class: 'ph-sys', text: rv.shortNotice }));
      if (goneQ(q)) out.push(h('p', { class: 'ph-sys', text: L('lapsed') }));
      d = decisionFor(s, c);
      if (d) out.push(decisionCard(d)); else if (offerMsg(c)) out.push(h('p', { class: 'ph-sys', text: L('offerWait') }));
      return h('div', { class: 'ph-thread', role: 'log', aria: { label: nameOf(s, c) } }, [safe(function () { return attachment(s, c); }, null)].concat(out));
    }

    function theirBubble(s, m, rv, c) {
      var sig = rv && m.kind === 'REQUEST' && rv.signals ? rv.signals : [], hot = c && c.needs ? hotInk() : null;
      return h('div', { class: 'ph-bub ph-bub--them pz-paper' }, [
        m.subject && m.kind === 'REQUEST' ? h('p', { class: 'ph-bub-subj', text: m.subject }) : null,
        h('p', { class: 'ph-bub-text', text: m.body || m.text || m.subject || '' }),
        num(m.replyBy) ? h('p', { class: 'ph-replyby' + (hot ? ' is-hot' : ''), style: hot ? { '--hot': hot, '--hot-ink': lightInk(hot) ? T : W } : null, text: up(L('replyBy', { day: SB.time.fmt(m.replyBy, 'short') })) }) : null,
        sig.length ? h('ul', { class: 'ph-sigs', aria: { label: L('signals') } }, sig.map(function (g) {
          return h('li', { class: 'ph-sig' }, [h('b', { text: g.good === true ? '+' : (g.good === false ? '−' : '?') }), ' ', g.text || '']);
        })) : null
      ]);
    }
    function myBubble(text, mark) {
      return h('div', { class: 'ph-bub ph-bub--me' + (mark === 'queued' ? ' is-queued' : '') }, [
        h('p', { class: 'ph-bub-text', text: text }),
        mark ? h('p', { class: 'ph-bub-mark' + (mark === 'queued' ? ' ph-bub-mark--stamp' : '') },
                 mark === 'queued' ? up(word('jobs.send.tonight', L('queued'))) : (mark === 'waiting' ? up(L('sent')) : '✓')) : null
      ]);
    }
    /** Is this outgoing thing (an outbox item or an ask view) part of this conversation: its request, a show made from it, or an ask its messages answer. */
    function ofConv(s, c, o) {
      var q = c.req, ids = {}, sh = o.showId && s.shows ? s.shows[o.showId] : null, room = o.toId && s.rooms ? s.rooms[o.toId] : null;
      c.msgs.forEach(function (m) { if (m.refs && m.refs.askId) ids[m.refs.askId] = 1; });
      if (!q && room && room.ownerId != null && c.key === 'p:' + room.ownerId) return true;
      return !!((q && (o.requestId === q.id || (o.payload && o.payload.requestId === q.id) || (sh && sh.requestId === q.id))) || (o.id && ids[o.id]));
    }
    function queuedFor(s, c) { return safe(function () { return SB.Mail.outbox(s); }, []).filter(function (o) { return ofConv(s, c, o); }); }
    function toWho(s, c, o) {
      var name = nameOf(s, c);
      return o.toName && o.toName !== name ? L('toWho', { name: o.toName }) + ' ' : '';
    }
    function counterAsk(s, c) {
      var i, m, a;
      for (i = c.msgs.length - 1; i >= 0; i--) {
        m = c.msgs[i]; a = m.refs && m.refs.askId && s.asks ? s.asks[m.refs.askId] : null;
        if (a && a.status === 'COUNTER' && !(a.answer && a.answer.followed)) return a;
      }
      return null;
    }
    function offerMsg(c) { return c.msgs.some(function (m) { return m.refs && m.refs.offerId; }); }
    function decisionFor(s, c) {
      var stop = s.clock && s.clock.stop;
      return offerMsg(c) && stop && stop.kind === 'DECISION' && stop.decision && stop.decision.kind === 'OFFER' ? stop.decision : null;
    }
    function decisionCard(d) {
      var hot = hotInk();
      return h('div', { class: 'ph-bub ph-bub--them ph-bub--card pz-paper', role: 'note', style: { '--hot': hot, '--hot-ink': lightInk(hot) ? T : W } }, [
        d.title ? h('p', { class: 'ph-bub-subj ph-bub-subj--hot', text: d.title }) : null,
        d.body ? h('p', { class: 'ph-bub-text', text: d.body }) : null,
        h('ul', { class: 'ph-likely' }, (d.options || []).slice(0, 4).map(function (o, i) {
          return o.likely || (o.enabled === false && o.why) ? h('li', null, [h('b', { text: String(i + 1) + ' ' }), o.label + ': ' + (o.enabled === false ? o.why : o.likely)]) : null;
        }))
      ]);
    }

    /* ---------------- the band's page ---------------- */

    function pageView(s, c) {
      var q = c.req, rv = safe(function () { return SB.Requests.view(s, q.id); }, null), b = rv && rv.band, ask, dates;
      if (!rv) return h('p', { class: 'ph-sys', text: L('lapsed') });
      ask = rv.ask || {}; dates = rv.dates || [];
      if (draft.day == null && dates.length) draft.day = dates[0].day;
      return h('div', { class: 'ph-page' }, [
        hero(b, ask, q, rv),
        crowds(rv, q),
        dates.length ? h('section', { class: 'ph-sec', aria: { label: L('dates') }, data: { tut: 'req-dates', 'tut-ref': q.id } }, [kicker(L('dates')), tearOff(dates, function (d) { draft.day = d; render(); })]) : null,
        road(rv.route || {}),
        askNote(ask),
        vetting(s, q, rv),
        marginNotes(s, q, rv)
      ]);
    }

    /** their mark big on a black bar, where they come from, how many of them */
    function hero(b, ask, q, rv) {
      var k = K(), inner, W2 = 330, H2 = 104;
      if (!b) return null;
      inner = k.paper(4, 4, W2 - 12, H2 - 14, { seed: 'hero' + b.id, stock: T, sx: 4, sy: 6, burn: 0 }) +
              k.sticker({ rect: [64, 14, 196, 66] }, nest(SB.Identity.bandMark({ id: b.id, name: b.name, genre: b.genre }, 60), 72, 17, 180 * 1.0, 180), { seed: 'hm' + b.id, edge: 4 }) ;
      return h('section', { class: 'ph-hero', aria: { label: b.name } }, [
        pic(inner, W2, H2, { label: b.name, cls: 'ph-hero-art' }),
        h('div', { class: 'ph-hero-row' }, [
          SB.UI.Kit && SB.UI.Kit.photo ? SB.UI.Kit.photo({ ids: PLAYERS[hashOf(b.id) % PLAYERS.length], w: 150, h: 92, unit: 'var(--p)', res: copyRes(), paper: STOCK[0], tape: ['top'], rot: -2, seed: 'hero' + b.id, cls: 'ph-hero-photo', alt: b.name }) : null,
          h('p', { class: 'ph-hero-line' }, [
          b.home ? h('span', { class: 'ph-hero-from' }, [gpic('VAN', 26, 'hv'), up(L('from', { home: b.home }))]) : null,
          num(ask.members) ? h('span', { class: 'ph-hero-from' }, [gpic('HEADS', 26, 'hh'), up(L('members', { n: ask.members }))]) : null
        ])
        ]),
        goneQ(q) ? h('p', { class: 'ph-sys', text: L('lapsed') }) : null,
        rv.shortNotice ? hotNote(rv.shortNotice) : null
      ]);
    }

    function hotNote(text) {
      var hot = hotInk();
      return h('p', { class: 'ph-hotnote', role: 'note', style: { '--hot': hot, '--hot-ink': lightInk(hot) ? T : W } }, [h('b', { text: '!! ' }), text]);
    }

    /** what they say they draw beside your own guess, as two little crowds; a range is a faded crowd */
    function crowds(rv, q) {
      var here = rv.here, says = num(rv.says) ? rv.says : null, top = Math.max(says || 0, here && num(here.hi90) ? here.hi90 : 0),
          unit = Math.max(1, Math.ceil(top / 32)), lbl = here ? (here.text || (here.lo90 + '–' + here.hi90)) : '?', a, b2;
      function n(v) { return Math.round(v / unit); }
      a = says === null ? null : crowd(n(says), 0, 'say' + q.id, 7);
      b2 = here ? crowd(n(here.lo50), Math.max(0, n(here.hi90) - n(here.lo50)), 'gs' + q.id, 7) : null;
      return h('section', { class: 'ph-crowds pz-paper', role: 'group', aria: { label: L('theySay') + ' ' + (says === null ? '?' : says) + '. ' + L('guess') + ' ' + lbl } }, [
        h('div', { class: 'ph-crowd' }, [
          h('div', { class: 'ph-crowd-top' }, [kicker(L('theySay')), mk(says === null ? '?' : String(says), 30, { seed: 'cs' })]),
          a ? pic(a[0], a[1], a[2]) : null
        ]),
        h('div', { class: 'ph-crowd ph-crowd--mine', data: { tut: 'req-guess', 'tut-ref': q.id } }, [
          h('div', { class: 'ph-crowd-top' }, [kicker(L('guess')), mk(lbl, 30, { seed: 'cg', fill: ink('ballpointBlue') })]),
          b2 ? pic(b2[0], b2[1], b2[2]) : h('p', { class: 'ph-sys', text: L('noGuess') })
        ]),
        unit > 1 ? h('p', { class: 'ph-each' }, [pic(head(10, 10, 0.8, 'each'), 20, 26), up(L('each', { n: unit }))]) : null
      ]);
    }

    /** tearOff(dates, onPick): a small tear-off calendar: one page per date they can do; the picked one circled */
    function tearOff(dates, onPick) {
      return h('div', { class: 'ph-tear', role: 'group' }, dates.map(function (d) {
        var k = K(), t = SB.time.date(d.day), on = d.day === draft.day, busy = (d.rooms || []).filter(function (x) { return x.state && x.state !== 'OPEN'; }),
            clash = d.clash && d.clash.length, crowd = d.crowd && d.crowd.length ? d.crowd : null, out = '', w = 68, ht = 84, i;
        out += k.paper(3, 3, w - 10, ht - 10, { seed: 'tp' + d.day, stock: on ? 'white' : 'bone', sx: 3, sy: 4, burn: 0.35, cut: 1.4,
                                               inner: '<path d="M0 0H' + w + 'V20H0Z" fill="' + T + '"/>' + k.type(up(SB.time.fmt(d.day, 'dow3')), w / 2 - 2, 16, 11, { anchor: 'middle', fill: W, bold: true }) +
                                                      '<path d="M5 24H' + (w - 12) + '" stroke="' + T + '" stroke-width="1.4" stroke-dasharray="3 3"/>' });
        out += k.marker(String(t.d), w / 2 - 2, 58, 26, { anchor: 'middle', seed: 'dn' + d.day });
        out += k.type(up(SB.time.fmt(d.day, 'month').slice(0, 3)), w / 2 - 2, 72, 10, { anchor: 'middle', bold: true });
        if (on) out += k.circle3(w / 2 - 2, 50, 27, 22, { seed: 'cir' + d.day, stroke: ink('ballpointBlue'), sw: 2 });
        if (clash) out += k.xout(10, 28, w - 24, ht - 40, { seed: 'cx' + d.day, sw: 3.4 });
        if (crowd) out += '<g transform="translate(' + (w - 24) + ' 26)">' + glyph('HEADS', 14, 'cw' + d.day) + '</g>';
        for (i = 0; i < Math.min(3, busy.length); i++) out += '<g transform="translate(' + (6 + i * 14) + ' ' + (ht - 22) + ')">' + glyph('KEY', 14, 'bk' + i) + '</g>';
        return h('button', { type: 'button', class: 'ph-tear-pg pz-hl' + (on ? ' is-on' : ''), data: { fk: 'day-' + d.day }, aria: { pressed: on ? 'true' : 'false',
                 label: SB.time.fmt(d.day, 'long') + (clash ? ', ' + L('clash') + ': ' + d.clash.join(', ') : '') + (busy.length ? ', ' + busy.map(function (x) { return x.name + ' ' + String(x.state).toLowerCase(); }).join(', ') : '') + (crowd ? ', ' + crowd.join(' ') : '') },
                 title: [clash ? d.clash.join(', ') : (busy.length ? busy.map(function (x) { return x.name + ': ' + String(x.state).toLowerCase(); }).join(', ') : '')].concat(crowd || []).filter(Boolean).join('\n') || null,
                 on: { click: function () { onPick(d.day); } } }, pic(out, w, ht));
      }));
    }

    /** road(route): the run drawn as a road through the real towns, here starred, drive times taped on the legs */
    function road(r) {
      var nodes = [], k = K(), Wd = 380, H = 150, out = '', pts, i, n, x, y, lab = [];
      (r.stops || []).forEach(function (st0) {
        var last = nodes[nodes.length - 1];
        if (st0.here && last && last.here) { last.days.push(st0.day); return; }
        nodes.push({ name: st0.name || '', state: st0.state || '', here: !!st0.here, days: num(st0.day) ? [st0.day] : [] });
      });
      if (!nodes.length && ((r.prev && r.prev.name) || (r.next && r.next.name))) {
        if (r.prev && r.prev.name) nodes.push({ name: r.prev.name, state: r.prev.state, days: [] });
        nodes.push({ name: L('here'), here: true, days: [] });
        if (r.next && r.next.name) nodes.push({ name: r.next.name, state: r.next.state, days: [] });
      }
      if (nodes.length < 2) return null;
      n = nodes.length;
      pts = nodes.map(function (nd, j) { return [36 + j * (Wd - 72) / (n - 1), 72 + (j % 2 ? -18 : 18)]; });
      out += k.path(pts, { seed: 'rd', sw: 15, wob: 1, cap: 'square' });
      out += '<path d="' + k.smooth(pts, false) + '" fill="none" stroke="' + W + '" stroke-width="2" stroke-dasharray="7 6"/>';
      for (i = 0; i < n; i++) {
        x = pts[i][0]; y = pts[i][1];
        if (nodes[i].here) out += k.sticker({ circle: [x, y, 15] }, k.star(x, y, 26, { seed: 'hr' }), { seed: 'hst', edge: 3 });
        else out += '<path d="M' + (x - 6) + ' ' + (y - 6) + 'h12v12h-12Z" fill="' + W + '" stroke="' + T + '" stroke-width="2.4"/>';
      }
      for (i = 0; i < n; i++) {
        if (!nodes[i].here) continue;
        if (i > 0 && r.prev && r.prev.minutes) out += legTime(pts[i - 1], pts[i], r.prev.minutes, 'p');
        if (i < n - 1 && r.next && r.next.minutes) out += legTime(pts[i], pts[i + 1], r.next.minutes, 'n');
        break;
      }
      for (i = 0; i < n; i++) {
        x = pts[i][0]; y = i % 2 ? pts[i][1] - 24 : pts[i][1] + 34;
        out += k.type(up(nodes[i].here ? L('here') : nodes[i].name), x, y, 11, { anchor: 'middle', bold: true, maxWidth: (Wd - 20) / Math.max(2, n - 1) + 4 });
        if (nodes[i].days.length) out += k.type(up(nodes[i].days.map(function (d) { return SB.time.fmt(d, 'md'); }).join('/')), x, i % 2 ? y - 13 : y + 13, 9, { anchor: 'middle' });
        lab.push((nodes[i].here ? L('here') : nodes[i].name + (nodes[i].state ? ', ' + nodes[i].state : '')) + (nodes[i].days.length ? ' ' + nodes[i].days.map(function (d) { return SB.time.fmt(d, 'md'); }).join(', ') : ''));
      }
      return h('section', { class: 'ph-sec ph-road' }, [
        kicker(L('route')),
        pic(out, Wd, H, { cls: 'ph-road-art', label: L('route') + ': ' + lab.join(', ') +
                 (r.prev && r.prev.minutes ? '. ' + drive(r.prev.minutes) + ' from ' + r.prev.name : '') + (r.next && r.next.minutes ? '. ' + drive(r.next.minutes) + ' to ' + r.next.name : '') })
      ]);
    }
    function drive(min) { return L('drive', { h: Math.floor(min / 60), m: (min % 60 < 10 ? '0' : '') + (min % 60) }); }
    function legTime(a, b, min, sd) {
      var k = K(), x = (a[0] + b[0]) / 2, y = (a[1] + b[1]) / 2 - 22, t = drive(min), w = k.typeWidth(t, 12) + 18;
      return k.tape(x, y, w, 20, { seed: 'lg' + sd, rot: sd === 'p' ? -4 : 3, op: 0.95 }) + k.type(t, x, y + 4, 12, { anchor: 'middle', bold: true });
    }

    function askNote(ask) {
      return h('section', { class: 'ph-ask pz-paper', aria: { label: L('theAsk') } }, [
        pic(K().tape(40, 12, 76, 20, { seed: 'askt', rot: -4 }), 80, 24, { cls: 'ph-ask-tape' }),
        kicker(L('theAsk')),
        h('p', { class: 'ph-ask-deal', text: dealWords(ask) }),
        h('div', { class: 'ph-ask-things' }, [
          ask.meal ? h('span', { class: 'ph-thing' }, [gpic('MEAL', 30, 'am'), up(L('meal'))]) : null,
          ask.lodging ? h('span', { class: 'ph-thing' }, [gpic('FLOOR', 30, 'af'), up(L('lodging'))]) : null
        ])
      ]);
    }

    function listedJob(s, q, action) {
      var id, j;
      for (id in (s.jobs || {})) {
        j = s.jobs[id];
        if (j && j.type === 'VET_' + action && j.key === q.id && j.status !== 'DONE' && j.status !== 'SKIPPED' && j.status !== 'MOOT') return j;
      }
      return null;
    }

    /** the ways to find out more: tear-off coupons, each with its cost in hours as clock ticks */
    function vetting(s, q, rv) {
      var byAct = {};
      (rv.vet || []).forEach(function (v) { byAct[v.action] = v; });
      return h('section', { class: 'ph-sec', aria: { label: L('findOut') } }, [
        kicker(L('findOut')),
        h('div', { class: 'ph-coupons' }, VETS.concat(Object.keys(byAct).filter(function (k) { return VETS.indexOf(k) < 0; })).map(function (a) {
          var v = byAct[a], avail, done, listed, queued, state, why, cost, hrs;
          if (!v) return null;
          avail = v.available || {}; done = v.done !== null && v.done !== undefined;
          listed = !done && a !== 'ASK_BOOKER' ? listedJob(s, q, a) : null;
          queued = !done && a === 'ASK_BOOKER' && safe(function () { return SB.Mail.outbox(s).concat(SB.Mail.waiting(s)); }, []).some(function (o) { return o.kind === 'CONTACT_VET' && o.payload && o.payload.requestId === q.id; });
          state = done ? 'done' : (listed || queued ? 'listed' : (avail.ok ? 'open' : 'no'));
          why = state === 'no' ? (avail.why || '') : '';
          hrs = v.hours ? v.hours : mailHours();                     // a question to a booker is a message: it costs what a message costs
          cost = (SB.Clock && SB.Clock.cost ? SB.Clock.cost(hrs).toLowerCase() : '') || (v.hours ? (v.hours === 1 ? L('hour1') : L('hoursN', { n: v.hours })) : L('aMessage'));
          return h('button', { type: 'button', class: 'ph-tab ph-coupon is-' + state + (state === 'done' ? ' is-done' : ''), data: { fk: 'vet-' + a },
            'aria-disabled': state === 'open' || (state === 'listed' && listed) ? null : 'true',
            aria: { label: L('vetLong.' + a) + '. ' + cost + '. ' + (state === 'done' ? L('vetDone') : (state === 'listed' ? L('vetListed') + (listed ? ', ' + L('vetPlan') : '') : why)) },
            on: { click: function () {
              if (state === 'open') vet(s, q, v);
              else if (state === 'listed' && listed) SB.UI.go('week');
            } } }, [
            gpic(a, 40, 'v'),
            h('span', { class: 'ph-tab-t', title: cost, text: costTag(up(L('vet.' + a)), hrs) }),
            state === 'done' ? pic(stampMark(up(L('vetDone')), T, -12, 'vd' + a), 84, 40, { cls: 'ph-coupon-stamp' }) : null,
            state === 'listed' ? h('span', { class: 'ph-coupon-why' }, [up(L('vetListed'))]) : null,
            state === 'listed' && listed ? h('span', { class: 'ph-strip ph-strip--mini' }, up(L('calendar'))) : null,
            state === 'no' && why ? h('span', { class: 'ph-coupon-why', text: why }) : null
          ]);
        }))
      ]);
    }

    function vet(s, q, v) {
      if (v.action === 'ASK_BOOKER') {
        if (!v.available || !v.available.contactId) return;
        act(function (x) { return SB.Mail.ask(x, 'CONTACT_VET', v.available.contactId, { requestId: q.id }); });
        return;
      }
      act(function (x) { return SB.Week.addJob(x, 'VET_' + v.action, { requestId: q.id }); });
    }

    /** What you found out about this band, from the week's records, and anything worth knowing: notes in the margin. */
    function marginNotes(s, q, rv) {
      var bid = q.bandId, log = (s.week && s.week.log) || [], notes = [], seen = {};
      if (bid) log.forEach(function (r) {
        var key = r && r.learned && r.learned.key ? String(r.learned.key) : '';
        if (!r || r.t !== 'NOTE' || !r.text || seen[r.text]) return;
        if (key.indexOf(':' + bid + ':') < 0 && key.slice(-(bid.length + 1)) !== ':' + bid) return;
        seen[r.text] = 1; notes.push({ text: r.text, day: r.day });
      });
      if (!notes.length && !(rv.flags && rv.flags.length)) return null;
      return h('section', { class: 'ph-sec ph-margin', aria: { label: L('notes') } }, [
        kicker(L('notes')),
        notes.map(function (nt, i) {
          return h('p', { class: 'ph-note pz-paper ph-cut' + (i % 3) }, [num(nt.day) ? h('b', { text: up(SB.time.fmt(nt.day, 'md')) + '  ' }) : null, nt.text]);
        }),
        (rv.flags || []).map(function (fl) { return h('div', { aria: { label: L('flags') + ': ' + fl.text } }, hotNote(fl.text)); })
      ]);
    }

    function dealWords(ask) {
      var shape = ask.shape || 'DOOR';
      return word('deal.' + shape + '.words', word('deal.' + shape + '.name', shape.toLowerCase()), { amount: ask.guarantee || 0, pct: Math.round((ask.pct == null ? 1 : ask.pct) * 100) });
    }

    /* ---------------- the fringe of replies under the thread ---------------- */

    function dock(s, c) {
      var q = c.req, d = decisionFor(s, c), ask = counterAsk(s, c), queued, tabs = [];
      if (d) {
        tabs = (d.options || []).slice(0, 4).map(function (o, i) {
          return tab('dec' + i, o.label || '', function () { if (o.enabled !== false) act(function (x) { return SB.Week.decide(x, d.id, o.id); }); },
                     { n: String(i + 1), disabled: o.enabled === false, option: o.id, aria: o.label || '', hot: i === 0 });
        });
        return h('div', { class: 'ph-fringe ph-dock', role: 'group', aria: { label: d.title || L('reply') }, on: { keydown: function (e) {
          var n = parseInt(e.key, 10), o = (d.options || [])[n - 1];
          if (o && o.enabled !== false && n >= 1 && n <= 4) { e.preventDefault(); e.stopPropagation(); act(function (x) { return SB.Week.decide(x, d.id, o.id); }); }
        } } }, tabs);
      }
      if (ask) {
        tabs.push(tab('counter', L('takeIt'), function () {
          var p = Object.assign({}, ask.payload || {}, { acceptCounter: ask.id });
          delete p.inPerson;
          act(function (x) { return SB.Mail.ask(x, ask.kind, ask.toId, p); });
        }, { hot: true, aria: L('counter') + ' ' + L('takeIt') }));
      }
      if (q && !goneQ(q) && view !== 'hold' && view !== 'pass' && view !== 'slip') {
        queued = queuedFor(s, c).map(function (o) { return o.kind; });
        /* one yes: BOOK IT says you are interested (a message, if it has not gone yet), makes the show and opens its
         * card on the room. The hold and the offer are made there (js/ui/screens/shows.js). */
        tabs.push(bookTab(s, q, queued.indexOf('INTERESTED') >= 0 || !!(s.mail && s.mail.extended && s.mail.extended[q.id])));
        tabs.push(tab('PASS', L('pass'), function () { view = 'pass'; draft.mode = 'PASS'; render(); }, { done: queued.indexOf('PASS') >= 0, tut: 'req-pass', ref: q.id }));
      }
      return tabs.length ? h('div', { class: 'ph-fringe ph-dock', role: 'group', aria: { label: L('reply') } }, tabs) : null;
    }

    /* ---------------- hold a room ---------------- */

    function showFor(s, q) {
      var id, x;
      for (id in (s.shows || {})) { x = s.shows[id]; if (x.requestId === q.id && x.status !== 'CANCELLED') return x; }
      return null;
    }

    /* BOOK IT: the one way to say yes to a band's dates. The message costs what any message costs (SB.Config.MAIL.hours),
     * said on the tab; when tonight has no room for it the tab says why and does nothing. */
    function mailHours() { return SB.Config.MAIL && num(SB.Config.MAIL.hours) ? SB.Config.MAIL.hours : 0.5; }
    function costTag(label, hours) { return SB.Clock && SB.Clock.tag ? SB.Clock.tag(label, hours) : label; }
    function bookTab(s, q, sent) {
      var show = showFor(s, q), need = !sent && !show, hours = need ? mailHours() : 0,
          fit = need ? (safe(function () { return SB.Week.fits(s, hours); }, null) || { ok: true }) : { ok: true }, ok = fit.ok !== false,
          why = ok ? '' : ((SB.Clock && SB.Clock.why ? SB.Clock.why(fit) : fit.why) || '');
      return tab('BOOK', show ? L('toShow') : costTag(L('book'), hours), function () {
        var r;
        if (!ok) return;
        if (need) { r = act(function (x) { return SB.Mail.reply(x, q.id, 'INTERESTED'); }); if (!r || r.ok === false) return; }
        toCard(q, 'room');
      }, { hot: ok, disabled: !ok, sub: why || null, tut: 'req-book', ref: q.id,
           aria: (show ? L('toShowL') : L('bookL')) + (why ? '. ' + why : '') });
    }

    /* the show this request is for (made now if there is none yet), opened at a row of its card */
    function toCard(q, row) {
      var show = showFor(st(), q), sid = show ? show.id : null, r;
      if (!sid) { r = act(function (x) { return SB.Shows.create(x, { requestId: q.id }); }); if (!r || r.ok === false) return; sid = r.showId; }
      SB.UI.go('show', { showId: sid, row: row, day: num(draft.day) ? draft.day : null });
    }

    /* ---------------- pass ---------------- */

    function passView(s, c) {
      var q = c.req, text;
      if (!draft.tone) draft.tone = 'SHORT';
      text = safe(function () { return SB.text.has('requests.pass.' + draft.tone) ? SB.text.line('requests.pass.' + draft.tone, {}, null) : SB.text.line('requests.compose.PASS', {}, null); }, '');
      return h('div', { class: 'ph-sheet' }, [
        h('section', { class: 'ph-sec', aria: { label: L('tone') } }, [kicker(L('tone')),
          fringe('ph-fringe--tones', L('tone'), Object.keys(SB.Enums.PASS_TONE).map(function (k) {
            return tab('tone-' + k, L('tones.' + k), function () { draft.tone = k; render(); }, { on: draft.tone === k, pressed: draft.tone === k ? 'true' : 'false' });
          }))]),
        myBubble(text, null),
        tab('send-pass', L('sendPass'), function () {
          var r = act(function (x) { return SB.Mail.reply(x, q.id, 'PASS', { tone: draft.tone }); });
          if (r && r.ok !== false) { view = 'chat'; draft = {}; render(); }
        }, { big: true })
      ]);
    }

    /* ---------------- open where asked ---------------- */

    if (params && params.messageId) {
      safe(function () { var s = st(), m = SB.Mail.message(s, params.messageId); if (m) openConv(keyOf(s, m)); }, null);
    }
    if (view === 'list') render();
    return { update: render, unmount: function () { alive = false; if (ro) { try { ro.disconnect(); } catch (e) { /* fine */ } ro = null; } } };
  }

  /** a rubber stamp: a double box and stencil capitals, crooked, in one ink */
  function stampMark(text, color, rot, seed, top) {
    var k = K(), big = String(text), w = Math.max(80, k.markerWidth(big, 22, { vary: 0.08, tilt: 3 }) + 30, top ? k.typeWidth(top, 10) + 24 : 0), ht = top ? 62 : 38, out = '';
    out += k.rect(4, 4, w - 8, ht - 8, { seed: seed + 'o', sw: 3, stroke: color, wob: 1 }) + k.rect(9, 9, w - 18, ht - 18, { seed: seed + 'i', sw: 1.2, stroke: color, wob: 0.8 });
    if (top) out += k.type(top, w / 2, 24, 10, { anchor: 'middle', fill: color, bold: true });
    out += k.marker(big, w / 2, top ? 50 : 29, top ? 20 : 17, { anchor: 'middle', fill: color, seed: seed, vary: 0.08, tilt: 3, maxWidth: w - 20 });
    return '<g opacity=".9" transform="rotate(' + rot + ' ' + f1(w / 2) + ' ' + f1(ht / 2) + ') translate(0 ' + (top ? 6 : 0) + ')">' + out + '</g>';
  }
  function stampW(text, top) { var k = K(); return Math.max(80, k.markerWidth(String(text), 22, { vary: 0.08, tilt: 3 }) + 30, top ? k.typeWidth(top, 10) + 24 : 0); }

  /** stamps(exposure): what you owe if nobody comes and where you break even, rubber-stamped on the slip. */
  function stamps(x) {
    var lines = x && x.lines ? x.lines.map(function (l) { return (l.label || String(l.cat).toLowerCase()) + ' ' + money(l.amount || 0); }).join(' · ') : '',
        a = x && num(x.total) ? money(x.total) : '?', be = x && num(x.breakEven) ? L('paidN', { n: x.breakEven }) : null,
        ta = up(L('ifNobody')), tb = up(L('breakEven'));
    return h('div', { class: 'ph-stamps', role: 'img', title: lines || null,
                      aria: { label: L('ifNobody') + ' ' + a + (be ? '. ' + L('breakEven') + ' ' + be : '') + (lines ? '. ' + lines : '') } }, [
      pic(stampMark(a, ink('brick'), -4, 'sa', ta), stampW(a, ta), 80),
      be ? pic(stampMark(up(be), ink('ballpointBlue'), 3, 'sb', tb), stampW(up(be), tb), 80) : null
    ]);
  }

  SB.UI.screen('inbox', { rail: 'inbox', title: 'ui.inbox.title', full: false, mount: mount });
})(SB);
