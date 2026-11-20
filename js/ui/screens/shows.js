/* Scene Booker — ui/screens/shows.js (UI-A2, redrawn for the desk)
 * The clipboards. shows: the clipboards of the shows on the way, a blank one to start a show, a shoebox of past ones.
 * show: one clipboard: the bill as a set list, the room as its key and tag, the date page, the door price tag, the
 * ages stamp, the deal slip, the crowd as rows of heads, the jobs as a checklist of notes, the flyer clipped on top.
 * bill: the same set list with the sticker sheet of local bands at its side: peel a sticker and stick it in the
 * running order to ask that band (drag, or tap the sticker then the gap); what each band would add shows as heads.
 * Also defines SB.UI.cuDraw, the small drawing helpers the clipboard, sticker sheet and key hooks share.
 * Reads Shows, Jobs, Forecast, Bands, Harm, People, Money and Rooms views; changes state only through SB.UI.act.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.shows = {
    title: 'Shows',
    none: 'No shows on the way. Start one on the blank clipboard, or answer a request on the phone.',
    newOwn: 'Start a show of your own',
    blank: 'NEW SHOW',
    create: 'START IT',
    earlier: 'An earlier night',
    later: 'A later night',
    past: 'Past shows',
    pastBox: 'PLAYED',
    hidePast: 'Put the box away',
    noRoom: 'no room yet',
    asks: '{yes} yes, {wait} waiting, {no} no',
    reach: 'Who has heard',
    open: 'Pick up the clipboard for {d}',
    status: { DRAFT: 'DRAFT', CONFIRMED: 'CONFIRMED', PLAYED: 'PLAYED', CANCELLED: 'CALLED OFF' },
    pace: { OK: 'ON PACE', TIGHT: 'TIGHT', SHORT: 'SHORT' }
  };
  SB.Content.ui.show = {
    title: 'The show',
    back: 'All the clipboards',
    noRoom: 'NO KEY YET',
    room: 'The room',
    holdRoom: 'HANG MY TAG',
    holdRoomL: 'Ask {room} to hold {d}',
    holdOther: 'Hold another night',
    pickRoom: 'Pick the {room} key',
    confirm: 'ASK TO CONFIRM',
    confirmL: 'Ask the room to confirm',
    needs: 'Before the room confirms',
    release: 'TAKE MY TAG BACK',
    releaseL: 'Let the hold go',
    rank: '#{n} IN LINE',
    jobs: 'TO DO',
    advance: 'On the advance',
    night: 'On the night',
    ifYouWant: 'If you want',
    covered: '{name} has these',
    coveredL: '{name} is doing these for you this time: {list}.',
    planIn: 'Pencil it in: {d} {half}',
    waived: 'Not needed here.',
    bill: 'SET LIST',
    buildBill: 'PEEL STICKERS',
    buildBillL: 'Open the sticker sheet and build the bill',
    deal: 'The deal',
    written: 'written down',
    handshake: 'a handshake',
    exposure: 'What you owe if nobody comes',
    par: 'TOWN EXPECTS',
    call: 'YOUR CALL',
    withThem: 'WITH THEM',
    full: 'FULL',
    even: 'EVEN',
    each: 'EACH = {n}',
    unknownL: 'You do not know yet: {what}. Open the notebook.',
    price: 'Door price',
    priceL: 'Door price {p}. Tap to rewrite it.',
    cheaper: 'A dollar less',
    dearer: 'A dollar more',
    donation: 'DONATION',
    donationL: 'Donation at the door',
    ages: 'Ages: {a}',
    address: 'The address',
    label: 'How big: {l}',
    normal: 'REGULAR',
    flyerDesk: 'Open the flyer desk',
    flyerDeskT: 'FLYER DESK',
    crew: 'CREW',
    sound: 'SOUND',
    security: 'SECURITY',
    noSecurity: 'NONE',
    noSecurityL: 'Take security off this show',
    insurance: 'INSURANCE',
    insureL: 'Event insurance, {cost}. Tap to buy it or not.',
    floor: 'FLOOR',
    nobody: 'nobody yet',
    you: 'You',
    youWork: 'You work the floor',
    ask: 'Ask {name} ({rate} a night)',
    put: 'Put {name} on',
    on: '{name} is on it',
    busy: '{name} is busy',
    asked: 'Asked {name}. Waiting to hear back.',
    queued: 'Asking {name}: it goes out with tonight\'s send.',
    askedShort: 'asked, waiting',
    queuedShort: 'goes out tonight',
    saidNo: '{name} said no to this one. Ask again?',
    noSound: 'no sound yet',
    noSecurity2: 'no security yet',
    cancel: 'CALL IT OFF',
    cancelL: 'Call the show off',
    cancelSure: 'Call this show off? The bands and the room will remember.',
    cancelYes: 'Call it off',
    keep: 'Keep it',
    locked: 'The bill is locked. Changing it now costs trust with the bands.',
    result: 'How it went',
    unknown: '?'
  };
  SB.Content.ui.bill = {
    title: 'The bill',
    back: 'Back to the clipboard',
    cands: 'LOCAL BANDS',
    listen: 'listen',
    listenStop: 'stop',
    listenL: 'Hear what {name} sound like',
    hearBill: 'hear the bill',
    hearBillL: 'Hear the bill in order, one band after another',
    freeOnly: 'ONLY FREE THAT NIGHT',
    freeOnlyL: 'Only bands free that night',
    pileL: 'Only the {g} pile',
    allPiles: 'Every pile',
    noCands: 'No local band fits that.',
    pick: 'Peel {name}: {fee}, answers in {lo} to {hi} days{with}',
    withThem: ', with them {lo} to {hi} people',
    fit: { FIT: 'FITS THIS BILL', STRETCH: 'A STRETCH', WRONG: 'WRONG BILL' },
    fitL: { FIT: 'their sound fits this bill', STRETCH: 'their sound is a stretch for this bill', WRONG: 'wrong bill for their sound' },
    peeled: '{name}: {state}',
    picked: 'Now tap a gap in the set list to stick {name} there, or press Escape.',
    asked: 'asked',
    yes: 'said yes',
    no: 'said no',
    counter: 'came back with something',
    onBill: 'on the bill',
    listed: 'Someone in this band is on your list',
    gap: { OPEN: 'OPENER', MIDDLE: 'MIDDLE', CLOSE: 'HEADLINER' },
    gapL: 'Stick a band here to ask them to play as the {slot}',
    stickHere: 'STICK IT HERE',
    listedTitle: 'Before you ask',
    listedGo: 'Ask anyway',
    listedNo: 'Don\'t ask',
    setL: '{n}. {name}, {state}, on at {t}, {m} minutes. Arrow keys move it, Delete peels it off.',
    shorter: 'Five minutes shorter',
    longer: 'Five minutes longer',
    drop: 'Peel {name} off the bill',
    minutes: '{n} MIN',
    starts: 'ON AT {t}',
    stop: 'HARD STOP {t}',
    billing: 'ON THE FLYER',
    billUp: 'Move {name} up the flyer',
    billDown: 'Move {name} down the flyer',
    pace: 'GUARANTEE {w}',
    arrive: 'in by {t}',
    leave: 'gone by {t}',
    unknownPairs: 'You don\'t know yet how these sounds go together: {list}',
    lockedWarn: 'The bill is locked. This costs trust with the band. Go ahead?',
    yesGo: 'Go ahead',
    noGo: 'Leave it',
    noWord: 'NO'
  };

  /* ================================================================ */
  /* SB.UI.cuDraw: the paste-up pieces the clipboard, the sticker      */
  /* sheet and the key hooks share (design/spec/07-desk.md 2 and 2b)   */
  /* ================================================================ */
  /* One sign per kind of action, the same everywhere:
   *   a label-maker strip (black tape, white capitals) = open it or do it      -> strip(), thing({ strip })
   *   a tear-off tab along the foot of a slip          = pick one of these     -> tabs()
   *   a drawn box                                      = tick it               -> tickThing()
   *   a sticker or note with a lifted corner           = drag it (or tap it, then tap where it goes)
   * Reading matter (typed slips, heads, stamps already inked) carries none of them.
   * Every drawn piece goes through the copier: its SVG is rasterised, run through SB.DeskKit.photocopy (the desk's
   * and the flyers' toner pass) and swapped in as an image, cached by its markup, so the close-ups and the desk come
   * out of one machine. Without a canvas (Node) the SVG stays inline. */

  SB.UI.cuDraw = (function () {
    var TONER = '#141413', PAPER = '#f4f2ea', BONE = '#e7ddc4', GRAY = '#77756f';
    function K() { return SB.DeskKit; }
    function h(t, a, k) { return SB.UI.h(t, a, k); }
    function f(n) { return Math.round(n * 10) / 10; }
    function num(v) { return typeof v === 'number' && isFinite(v); }
    /* drawings are made in stage-scaled units (--p, one px of the old 1280 x 800 layout) and shown at w by h of them whatever the window;
       the copier rasters them as finely as the screen shows them */
    function pxPerP() { return (SB.UI.unit ? SB.UI.unit() : 0.8) * 1.25; }
    function res() { return SB.Finish && SB.Finish.res ? SB.Finish.res() : Math.max(1, Math.min(4, pxPerP() * ((typeof window !== 'undefined' && window.devicePixelRatio) || 1))); }
    function pu(n) { return 'calc(var(--p) * ' + f(n) + ')'; }
    function fonts(m) { return SB.Finish && SB.Finish.withFonts ? SB.Finish.withFonts(m) : m; }
    var DEFS = null;
    function defs() { if (DEFS === null) { try { DEFS = K().defs(); } catch (e) { DEFS = ''; } } return DEFS; }
    function svg(inner, w, ht) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + f(w) + ' ' + f(ht) + '" width="' + f(w) + '" height="' + f(ht) + '" aria-hidden="true" focusable="false">' + defs() + inner + '</svg>';
    }

    /* ---- the copier ---- */
    var cache = {}, cacheKeys = [], queue = [], waiting = {}, busy = false;
    function hash(s) { var a = 5381, b = 52711, i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); a = ((a << 5) + a + c) | 0; b = ((b << 5) + b ^ c) | 0; } return (a >>> 0).toString(36) + (b >>> 0).toString(36) + s.length; }
    function canCopy() {
      return typeof document !== 'undefined' && document.createElement && typeof Image !== 'undefined' && typeof Blob !== 'undefined' &&
             typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function' && !!(SB.DeskKit && SB.DeskKit.photocopy) && !!(document.body && document.body.getBoundingClientRect);
    }
    /* the kit numbers its clip paths from a running count, so the same drawing differs between renders; the cache key
       renumbers them so a redraw of the same piece finds its copy */
    function norm(m) { var map = {}, n = 0; return m.replace(/\b(pc|ph|dk)(\d+)\b/g, function (all) { if (!map[all]) { map[all] = 'z' + n; n += 1; } return map[all]; }); }
    function imgHtml(url, w, ht) { return '<img alt="" draggable="false" src="' + url + '" width="' + f(w) + '" height="' + f(ht) + '">'; }
    function remember(key, url) {
      cache[key] = url; cacheKeys.push(key);
      if (cacheKeys.length > 600) delete cache[cacheKeys.shift()];
    }
    function pump() {
      if (busy || !queue.length) return;
      var job = queue.shift(), url, im, scale = job.res;
      busy = true;
      function done(dataUrl) {
        var list = waiting[job.key] || [];
        delete waiting[job.key];
        if (dataUrl) remember(job.key, dataUrl);
        list.forEach(function (el) { if (dataUrl && el.getAttribute('data-copy') === job.key) { el.innerHTML = imgHtml(dataUrl, job.w, job.ht); el.classList.add('is-copied'); } });
        busy = false;
        setTimeout(pump, 0);
      }
      try { url = URL.createObjectURL(new Blob([fonts(job.markup)], { type: 'image/svg+xml' })); } catch (e) { done(null); return; }
      im = new Image();
      im.onload = function () {
        var cv, ctx, out = null, cw = Math.max(2, Math.round(job.w * scale)), ch = Math.max(2, Math.round(job.ht * scale));
        try {
          cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
          ctx = cv.getContext('2d');
          ctx.drawImage(im, 0, 0, cw, ch);
          K().photocopy(ctx, cw, ch, job.key, { px: scale, streaks: Math.max(1, Math.round(cw / 400)), amp: 0.14 });
          out = cv.toDataURL('image/png');
        } catch (e) { out = null; }
        URL.revokeObjectURL(url);
        done(out);
      };
      im.onerror = function () { URL.revokeObjectURL(url); done(null); };
      im.src = url;
    }
    /** art(inner, w, ht, cls): a drawn piece, w by ht px, as a span; it is photocopied when it can be. */
    function art(inner, w, ht, cls) {
      var markup = svg(inner, w, ht), key, r = res(), el = h('span', { class: 'cb-art' + (cls ? ' ' + cls : ''), aria: { hidden: 'true' }, style: { width: pu(w), height: pu(ht), aspectRatio: f(w) + ' / ' + f(ht) } });
      if (!canCopy()) { el.innerHTML = markup; return el; }
      key = hash(norm(markup)) + '@' + r;
      el.setAttribute('data-copy', key);
      if (cache[key]) { el.innerHTML = imgHtml(cache[key], w, ht); el.classList.add('is-copied'); return el; }
      el.innerHTML = markup;
      if (!waiting[key]) { waiting[key] = []; queue.push({ key: key, markup: markup, w: w, ht: ht, res: r }); }
      waiting[key].push(el);
      pump();
      return el;
    }
    /** thumb(flyer, wP, flat): the flyer thumbnail part, rastered as finely as the screen shows it and shown wP units wide (its tilt unless flat) */
    function thumb(flyer, wP, flat) {
      var el = SB.UI.parts.flyerThumb(flyer, Math.max(wP, Math.round(wP * res()))), bl;
      if (!el) return el;
      el.style.width = pu(wP);
      if (flat) el.style.transform = 'none';
      bl = el.querySelector ? el.querySelector('.sb-flyer-blank') : null;
      if (bl) bl.style.height = pu(wP * 1.3);
      return el;
    }
    function strip0(m) { return String(m || '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/ role="img"/, '').replace(/ aria-label="[^"]*"/, ''); }
    /** place(markup, x, y): put a whole <svg> string inside another at x, y. */
    function place(m, x, y) { return strip0(m).replace('<svg', '<svg x="' + f(x) + '" y="' + f(y) + '"'); }
    function cityInk() {
      var s = SB.UI.game ? SB.UI.game() : null, p = null;
      try { p = s ? SB.Cities.pack(s) : null; } catch (e) { p = null; }
      var inks = p && p.style && p.style.cityInks ? p.style.cityInks : ['fireRed', 'bayouTeal'];
      return [K().ink(inks[0]), K().ink(inks[1] || inks[0])];
    }
    /** hot(): what needs the player is marked in toner with a highlighter swipe behind it (swipe()), never a red */
    function hot() { return TONER; }
    /** swipe(x, y, w, s): one real highlighter swipe across something that needs the player, centred on y */
    function swipe(x, y, w, s) { s = s || 14; return '<path d="M' + f(x) + ' ' + f(y + 1) + 'L' + f(x + w) + ' ' + f(y - 1) + '" stroke="' + K().ink('fluorYellow') + '" stroke-opacity=".62" stroke-width="' + f(s) + '" stroke-linecap="butt"/>'; }
    function blue() { return K().ink('ballpointBlue'); }

    /* ---- lettering ---- */
    function marker(t, x, y, s, o) { return K().marker(String(t), x, y, s, o || {}); }
    function mw(t, s) { return K().markerWidth(String(t), s); }
    function type(t, x, y, s, o) { return K().type(String(t), x, y, s, o || {}); }
    function tw(t, s) { return K().typeWidth(String(t), s); }
    function letter(t, x, y, s, o) { return K().letter(String(t), x, y, s, o || {}); }
    function lw(t, s) { return K().letterWidth(String(t), s); }
    /** word(t, s, o): a heading in marker capitals, sized to its own piece (reading matter: it is not a control) */
    function word(t, s, o) {
      o = o || {};
      t = String(t).toUpperCase();
      var w = mw(t, s) + 12;
      return art(marker(t, 5, s + 4, s, { fill: o.ink || TONER, seed: 'w' + t, rot: o.rot || 0, halo: o.halo }), w, s + 12, 'cb-word' + (o.cls ? ' ' + o.cls : ''));
    }
    /** typed(t, s): a short typed line as a drawn piece */
    function typed(t, s, o) { o = o || {}; var w = tw(t, s) + 8; return art(type(t, 4, s + 2, s, { fill: o.ink, bold: o.bold }), w, s + 7, o.cls); }

    /* ---- the label-maker strip: black tape, white embossed capitals, a white edge: open it, or do it ---- */
    function stripW(t, s) { return tw(String(t).toUpperCase(), s) + s * 1.5 + 6; }
    function strip(t, x, y, s, o) {
      o = o || {};
      t = String(t).toUpperCase();
      var w = stripW(t, s), ht = s * 1.75 + 4, ground = o.ground || TONER, ink = o.ink || PAPER;
      return '<g transform="rotate(' + f(o.rot || 0) + ' ' + f(x + w / 2) + ' ' + f(y + ht / 2) + ')">' +
        '<path d="M' + f(x + 3) + ' ' + f(y + 4) + 'h' + f(w) + 'v' + f(ht) + 'h' + f(-w) + 'Z" fill="#000" fill-opacity=".6"/>' +
        '<path d="M' + f(x) + ' ' + f(y) + 'h' + f(w) + 'l-2 ' + f(ht / 2) + 'l2 ' + f(ht / 2) + 'h' + f(-w) + 'l2 ' + f(-ht / 2) + 'Z" fill="' + ground + '"/>' +
        '<path d="M' + f(x + 3) + ' ' + f(y + 2.5) + 'h' + f(w - 6) + 'M' + f(x + 3) + ' ' + f(y + ht - 2.5) + 'h' + f(w - 6) + '" stroke="' + ink + '" stroke-width="1.1" stroke-opacity=".75"/>' +
        type(t, x + s * 0.75 + 3, y + ht / 2 + s * 0.36, s, { fill: ink, bold: true }) + '</g>';
    }
    /** stripArt(t, s, o): a strip as its own piece (inverts on hover and focus, through CSS). */
    function stripArt(t, s, o) { s = s || 13; return art(strip(t, 2, 2, s, o), stripW(t, s) + 8, s * 1.75 + 12, 'cb-strip'); }

    /** thing(o): a drawn thing you tap. o = { cls, label, svg, w, h, kids, onClick, fk, pressed, disabled, drop, on, strip, stripSize }
     *  o.strip puts the label-maker strip on the thing's top-left corner (or makes the strip the whole thing when there is no svg). */
    function thing(o) {
      var kids = [];
      if (o.svg) kids.push(art(o.svg, o.w, o.h));
      if (o.strip) kids.push(stripArt(o.strip, o.stripSize || (o.svg ? 11 : 13), o.stripOpts));
      if (o.kids) kids = kids.concat(o.kids);
      return h('button', { type: 'button', class: 'cb-thing pz-hl' + (o.svg && o.strip ? ' has-strip' : '') + (!o.svg && o.strip ? ' is-strip' : '') + (o.cls ? ' ' + o.cls : ''), title: o.title || null,
        aria: { label: o.label, pressed: o.pressed === undefined ? null : String(!!o.pressed) },
        data: { fk: o.fk || null, drop: o.drop || null, tut: o.tut || null, 'tut-ref': o.tutRef || null }, disabled: !!o.disabled,
        on: o.on || (typeof o.onClick === 'function' ? { click: o.onClick } : null) }, kids);
    }
    /** listen(o): a small typed control that plays a loop (SB.Audio) and reads "stop" while it plays; null when there is
     *  nothing to hear. o = { band } for one band's loop, or { bill: [bands] } for the bill in order; o.text, o.stopText, o.label, o.fk */
    function listen(o) {
      var A = SB.Audio, band = o.band, bill = o.bill, box, off, any;
      if (!A) return null;
      any = band ? A.has(band) : (bill || []).some(function (b) { return A.has(b); });
      if (!any) return null;
      box = h('span', { class: 'cb-listen' });
      function draw() {
        var n = A.now(), on = band ? (n.kind === 'band' && n.bandId === band.id) : n.kind === 'bill', t = on ? (o.stopText || 'stop') : (o.text || 'listen'),
            icon = on ? '<path d="M2 3H12V13H2Z" fill="' + TONER + '"/>' : '<path d="M2 2L13 8L2 14Z" fill="' + TONER + '"/>',
            doc = typeof document !== 'undefined' ? document : null, had = !!(doc && doc.activeElement && box.contains && box.contains(doc.activeElement)), el;
        SB.UI.clear(box);
        el = thing({ cls: 'cb-listenbtn' + (on ? ' is-on' : ''), label: (o.label || t) + (on ? ' (' + (o.stopText || 'stop') + ')' : ''), pressed: on, fk: o.fk,
          svg: icon + type(t, 18, 13, 12, { bold: true }), w: tw(t, 12) + 24, h: 18,
          onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); if (band) A.playBand(band); else A.playBill(bill); } });
        box.appendChild(el);
        if (had && el.focus) try { el.focus(); } catch (e2) { /* fine */ }
      }
      draw();
      off = A.watch(function () { if (box.isConnected === false) { off(); return; } draw(); });
      return box;
    }
    /** act(text, label, fk, onClick, o): a strip that does something (the commonest control) */
    function act(text, label, fk, onClick, o) { o = o || {}; return thing({ cls: 'cb-act' + (o.cls ? ' ' + o.cls : ''), strip: text, stripSize: o.size || 14, stripOpts: o.hot ? { ground: hot() } : null, label: label, fk: fk, onClick: onClick, disabled: o.disabled, tut: o.tut, tutRef: o.tutRef }); }

    /** tabs(o): a slip of paper with tear-off tabs along its foot: pick one. o = { label, title, items: [{ text, on, label, fk, onClick, art, w, disabled }], stock, size }
     *  The picked tab is torn off: inked solid and hanging loose. */
    function tabs(o) {
      var s = o.size || 12, items = (o.items || []).map(function (it, i) {
        var t = String(it.text || '').toUpperCase(), aw = it.w || 0, w = Math.max(aw + 12, tw(t, s) + 16, 34), th = (it.ah || 0) + s * 2 + 8, out = '', r = K().rng('tab' + t + i);
        out += '<path d="' + K().polyD(K().cutPts(2, 2, w - 4, th - 4, { rng: r, cut: 1.1, torn: it.on ? 't' : '' })) + '" fill="' + (it.on ? TONER : PAPER) + '"/>';
        if (!it.on) out += '<path d="M3 2.5H' + f(w - 3) + '" stroke="' + TONER + '" stroke-width="1.6" stroke-dasharray="3 3"/>' + '<path d="M2 3V' + f(th - 2) + 'M' + f(w - 2) + ' 3V' + f(th - 2) + '" stroke="' + TONER + '" stroke-width="1.2" stroke-opacity=".5"/>';
        if (it.art) out += '<g transform="translate(' + f((w - aw) / 2) + ' 6)">' + it.art + '</g>';
        out += type(t, w / 2, th - s * 0.75 - 1, s, { anchor: 'middle', bold: true, fill: it.on ? PAPER : TONER, maxWidth: w - 8 });
        return thing({ cls: 'cb-tab' + (it.on ? ' is-on' : ''), label: it.label || t, pressed: !!it.on, fk: it.fk, disabled: it.disabled, tut: it.tut, tutRef: it.tutRef, svg: out, w: w, h: th, onClick: it.onClick });
      });
      return h('div', { class: 'cb-tabslip cb-stock-' + (o.stock || 'white') + (o.cls ? ' ' + o.cls : ''), role: 'group', aria: { label: o.label || o.title || '' } }, [
        o.title ? h('span', { class: 'cb-tabtitle', aria: { hidden: 'true' } }, typed(String(o.title).toUpperCase(), 11, { bold: true })) : null,
        h('div', { class: 'cb-tabrow' }, items)
      ]);
    }

    /* ---- marks ---- */
    /** tick(st, s): a drawn box: ticked (DONE, PROMISED, PLANNED), crossed (MISSED), struck (WAIVED), empty (TODO) */
    function tick(st, s) {
      var out = '<path d="M3 3H' + f(s - 3) + 'V' + f(s - 3) + 'H3Z" fill="' + PAPER + '"/>' + K().rect(3, 3, s - 6, s - 6, { seed: 'tk' + s, sw: Math.max(2, s / 9), wob: 0.5, over: 1.2 });
      if (st === 'DONE' || st === 'PROMISED' || st === 'PLANNED') out += K().path([[s * 0.2, s * 0.5], [s * 0.42, s * 0.78], [s * 0.92, s * 0.02]], { seed: 'tkk', sw: Math.max(2.6, s / 7), wob: 0.4, cap: 'square' });
      else if (st === 'MISSED') out += K().xout(s * 0.2, s * 0.2, s * 0.6, s * 0.6, { seed: 'tx', sw: Math.max(2.4, s / 8) });
      else if (st === 'WAIVED') out += K().line(s * 0.1, s * 0.5, s * 0.9, s * 0.5, { seed: 'tw', sw: 2.4 });
      return out;
    }
    /** tickThing(o): a box you tick with its typed words beside it. o = { on, text, label, fk, onClick, size, disabled } */
    function tickThing(o) {
      var s = o.size || 22, t = String(o.text || '');
      return thing({ cls: 'cb-tick' + (o.on ? ' is-on' : ''), label: o.label || t, pressed: !!o.on, fk: o.fk, disabled: o.disabled,
        svg: tick(o.on ? 'DONE' : 'TODO', s) + (t ? type(t, s + 6, s * 0.72, 12, { bold: true }) : ''), w: s + (t ? tw(t, 12) + 12 : 0), h: s, onClick: o.onClick });
    }
    /** mark(st, s): how a job stands, as a mark that is not a box (it is not a control): a check, a cross, a dash, an arrow */
    function mark(st, s) {
      if (st === 'DONE' || st === 'PROMISED' || st === 'PLANNED') return K().path([[s * 0.1, s * 0.5], [s * 0.38, s * 0.85], [s * 0.95, s * 0.05]], { seed: 'mk', sw: s / 6, cap: 'square' });
      if (st === 'MISSED') return K().xout(s * 0.15, s * 0.15, s * 0.7, s * 0.7, { seed: 'mx', sw: s / 7 });
      if (st === 'WAIVED') return K().line(s * 0.1, s * 0.5, s * 0.9, s * 0.5, { seed: 'mw', sw: s / 7 });
      return K().arrow(s * 0.05, s * 0.5, s * 0.9, s * 0.5, { seed: 'ma', sw: s / 8, head: s * 0.35, wob: 1 });
    }
    /** stamp(text, x, y, s, o): an inked rubber stamp: a box and marker capitals, a little rotated; o.on false: barely there */
    function stamp(t, x, y, s, o) {
      o = o || {};
      t = String(t).toUpperCase();
      var w = stampW(t, s), ht = s * 1.9, col = o.ink || TONER, op = o.on === false ? 0.22 : 0.95;
      return '<g opacity="' + op + '" transform="rotate(' + f(o.rot || 0) + ' ' + f(x + w / 2) + ' ' + f(y + ht / 2) + ')" filter="url(#dk-toner)">' +
        K().rect(x + 1, y + 1, w - 2, ht - 2, { seed: 'stp' + t, sw: Math.max(2, s / 5), stroke: col, wob: 0.8, over: 0.5 }) +
        marker(t, x + s * 0.55, y + ht / 2 + s / 2, s, { fill: col, seed: 'sp' + t, vary: 0.06, tilt: 2, rough: false }) + '</g>';
    }
    /** bang(x, y, s, ink): a marker "!!" (needs you now), baseline at y */
    function bang(x, y, s, ink) {
      var c = ink || hot(), out = swipe(x - s * 0.2, y - s * 0.45, s * 1.1, s * 0.9), i;
      for (i = 0; i < 2; i++) out += '<path d="M' + f(x + i * s * 0.42) + ' ' + f(y - s) + 'h' + f(s * 0.26) + 'l' + f(-s * 0.06) + ' ' + f(s * 0.68) + 'h' + f(-s * 0.14) + 'Z M' + f(x + i * s * 0.42 + s * 0.02) + ' ' + f(y - s * 0.18) + 'h' + f(s * 0.2) + 'v' + f(s * 0.18) + 'h' + f(-s * 0.2) + 'Z" fill="' + c + '"/>';
      return out;
    }
    function stampW(t, s) { return mw(String(t).toUpperCase(), s) + s * 1.1 + 4; }

    /* ---- heads: angular silhouettes cut from a copy ---- */
    function headPts(cx, by, s) {
      var hy = by - s * 0.66, r = s * 0.24;
      return {
        head: [[cx - r * 0.85, hy - r * 0.55], [cx - r * 0.35, hy - r], [cx + r * 0.45, hy - r * 0.95], [cx + r * 0.9, hy - r * 0.4], [cx + r * 0.8, hy + r * 0.55], [cx + r * 0.25, hy + r], [cx - r * 0.45, hy + r * 0.9], [cx - r * 0.95, hy + r * 0.3]],
        body: [[cx - s * 0.42, by], [cx - s * 0.36, by - s * 0.3], [cx - s * 0.12, by - s * 0.4], [cx + s * 0.12, by - s * 0.4], [cx + s * 0.36, by - s * 0.3], [cx + s * 0.42, by]]
      };
    }
    /** head(cx, by, s, o): o.mode 'solid' (toner), 'open' (white cut paper, toner edge), 'dots' (halftone), 'ink' (o.ink); o.op */
    function head(cx, by, s, o) {
      o = o || {};
      var p = headPts(cx, by, s), d = K().polyD(p.head) + K().polyD(p.body), mode = o.mode || 'solid', op = o.op === undefined ? 1 : o.op, out;
      if (mode === 'open') out = '<path d="' + d + '" fill="' + PAPER + '" stroke="' + (o.ink || TONER) + '" stroke-width="1.5" stroke-linejoin="miter"' + (o.dash ? ' stroke-dasharray="2 2"' : '') + '/>';
      else if (mode === 'dots') out = '<path d="' + d + '" fill="url(#dk-ht3)"/>';
      else out = '<path d="' + d + '" fill="' + (mode === 'ink' ? (o.ink || hot()) : TONER) + '"/>';
      return '<g opacity="' + f(op) + '">' + out + '</g>';
    }
    function niceUnit(max, per) {
      var raw = Math.max(1, max / per), steps = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100, 200, 250, 500, 1000], i;
      for (i = 0; i < steps.length; i++) if (steps[i] >= raw) return steps[i];
      return Math.ceil(raw);
    }
    /** crowd(o): rows of heads, the figure hand-lettered beside each row.
     *  o = { par, lo, hi, cap, even, add: { lo, hi }, w } -> element. Your call is a solid row fading into a range. */
    function crowd(o) {
      var L = function (k, c) { return SB.text.label('ui.show.' + k, c); }, per = o.per || 22, step = 17, x0 = 8, rows = [], out = '', y = 58,
          max = Math.max(1, o.par || 0, o.hi || 0, o.cap || 0, o.add ? o.add.hi || 0 : 0), unit = niceUnit(max, per), i, n, a, b, r, W = x0 + per * step + 96;
      per = Math.min(per, Math.max(8, Math.ceil(max / unit) + 1)); W = x0 + per * step + 96;   // no empty yards of paper to the right of a small crowd
      function xAt(v) { return x0 + Math.min(per + 0.5, v / unit) * step; }
      if (num(o.par)) rows.push({ k: 'par', label: L('par'), fig: String(Math.round(o.par)), draw: function (yy) {
        var s = ''; n = Math.max(1, Math.round(o.par / unit));
        for (i = 0; i < Math.min(per, n); i++) s += head(x0 + i * step + 5, yy, 24, { mode: 'open' });
        return s; } });
      if (num(o.lo) && num(o.hi) && o.hi > 0) rows.push({ k: 'call', label: L('call'), fig: Math.round(o.lo) + '-' + Math.round(o.hi), draw: function (yy) {
        var s = ''; a = Math.round(o.lo / unit); b = Math.max(a, Math.round(o.hi / unit));
        for (i = 0; i < Math.min(per, b); i++) s += head(x0 + i * step + 5, yy, 24, i < a ? { mode: 'solid' } : { mode: 'dots', op: Math.max(0.25, 1 - (i - a + 1) / (b - a + 2)) });
        return s; } });
      else rows.push({ k: 'call', label: L('call'), fig: '?', draw: function () { return ''; } });
      if (o.add && num(o.add.hi) && o.add.hi > 0) rows.push({ k: 'add', label: L('withThem'), fig: Math.round(o.add.lo) + '-' + Math.round(o.add.hi), draw: function (yy) {
        var s = ''; a = Math.round(o.add.lo / unit); b = Math.max(a, Math.round(o.add.hi / unit));
        for (i = 0; i < Math.min(per, b); i++) s += head(x0 + i * step + 5, yy, 24, i < a ? { mode: 'ink', ink: blue() } : { mode: 'open', ink: blue(), dash: true });
        return s; } });
      rows.forEach(function (row, k) {
        r = y + k * 56;
        out += type(row.label, 4, r - 30, 12, { bold: true, fill: row.k === 'add' ? blue() : TONER });
        out += row.draw(r);
        if (!(o.noCallFig && row.k === 'call' && row.fig !== '?')) out += marker(row.fig, x0 + per * step + 12, r, 22, { fill: row.k === 'add' ? blue() : TONER, seed: 'cf' + row.k + row.fig });
      });
      var bot = y + rows.length * 56 - 34;
      if (num(o.cap) && o.cap > 0) {
        out += K().line(xAt(o.cap), 22, xAt(o.cap), bot, { seed: 'cap', sw: 3, dash: '6 4', over: 0 });
        out += type(L('full') + ' ' + o.cap, xAt(o.cap) - 6, bot + 15, 12, { bold: true, anchor: 'end' });
      }
      if (num(o.even) && o.even > 0) {
        out += K().line(xAt(o.even), 22, xAt(o.even), bot, { seed: 'even', sw: 2, over: 0 });
        out += type('$ ' + L('even') + ' ' + o.even, xAt(o.even) + 4, 14, 12, { bold: true });
      }
      if (unit > 1) out += head(10, bot + 18, 16) + type('= ' + unit, 22, bot + 15, 12, { bold: true });
      rows.forEach(function (row) { W = Math.max(W, x0 + per * step + 30 + mw(row.fig, 22)); });   // the widest figure fits
      var lab = rows.map(function (row) { return row.label + ' ' + row.fig; }).join(', ') + (num(o.cap) ? ', ' + L('full') + ' ' + o.cap : '') + (num(o.even) ? ', ' + L('even') + ' ' + o.even : '');
      return h('div', { class: 'cb-crowd', role: 'img', aria: { label: lab } }, [art(out, W, bot + 22)]);
    }
    /** unknowns(list): question-mark scraps; each opens its notebook page (so it carries a strip) */
    function unknowns(list) {
      if (!list || !list.length) return null;
      return h('div', { class: 'cb-scraps' }, list.slice(0, 3).map(function (u, i) {
        var t = String(u.label || u.key || '?'), w = Math.min(230, Math.max(96, tw(t, 12) + 50)), out = '';
        out += K().paper(4, 6, w - 10, 50, { seed: 'uq' + i, stock: 'white', torn: 'tr', rot: i % 2 ? 2 : -2, sx: 3, sy: 4, burn: 0.4,
          inner: marker('?', 12, 46, 34, { seed: 'uqm' + i }) + type(t, 40, 34, 12, { bold: true, maxWidth: w - 54 }) });
        return thing({ cls: 'cb-scrap', label: SB.text.label('ui.show.unknownL', { what: t }), svg: out, w: w, h: 60, strip: '?', stripSize: 12,
          onClick: function () { SB.UI.go('notebook', { key: u.key }); } });
      }));
    }
    /** face(id, s, o): a stamped face, like a xeroxed photo-booth frame: a toner square, a head cut in its own ink. o.past fades it. */
    function face(id, s, o) {
      o = o || {};
      var r = K().rng('face:' + id), inkA = TONER, out = '', hair = Math.floor(r.next() * 4), p, k = s / 40;
      try { inkA = SB.Identity.inks(id).a; } catch (e) { inkA = GRAY; }
      out += '<path d="M2 2H' + f(s - 2) + 'V' + f(s - 2) + 'H2Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="2"/>';
      out += K().dotsRect(2, 2, s - 4, s - 4, 1);
      p = headPts(s / 2, s - 2, s * 1.15);
      out += '<path d="' + K().polyD(p.body) + '" fill="' + inkA + '"/>';
      out += '<path d="' + K().polyD(p.head) + '" fill="' + TONER + '"/>';
      if (hair === 0) out += '<path d="M' + f(s * 0.3) + ' ' + f(s * 0.3) + 'L' + f(s * 0.5) + ' ' + f(s * 0.08) + 'L' + f(s * 0.7) + ' ' + f(s * 0.3) + 'Z" fill="' + TONER + '"/>';
      else if (hair === 1) { var i; for (i = 0; i < 5; i++) out += '<path d="M' + f(s * (0.33 + i * 0.085)) + ' ' + f(s * 0.3) + 'L' + f(s * (0.3 + i * 0.1)) + ' ' + f(s * 0.06) + '" stroke="' + TONER + '" stroke-width="' + f(2.6 * k + 0.6) + '"/>'; }
      else if (hair === 2) out += '<path d="M' + f(s * 0.24) + ' ' + f(s * 0.78) + 'L' + f(s * 0.26) + ' ' + f(s * 0.28) + 'L' + f(s * 0.5) + ' ' + f(s * 0.16) + 'L' + f(s * 0.74) + ' ' + f(s * 0.28) + 'L' + f(s * 0.76) + ' ' + f(s * 0.78) + 'L' + f(s * 0.66) + ' ' + f(s * 0.5) + 'L' + f(s * 0.34) + ' ' + f(s * 0.5) + 'Z" fill="' + TONER + '"/>';
      out += K().dots(K().polyD(p.head.slice(0, 5)), 2, { white: true });
      out += '<path d="M' + f(s * 0.4) + ' ' + f(s * 0.44) + 'h' + f(s * 0.07) + 'M' + f(s * 0.54) + ' ' + f(s * 0.44) + 'h' + f(s * 0.07) + '" stroke="' + PAPER + '" stroke-width="' + f(1.6 * k + 0.6) + '"/>';
      return '<g' + (o.past ? ' opacity=".4"' : '') + '>' + out + '</g>';
    }
    /** heartMeter(v, cx, cy, s, id): a sharpie heart outline, hatched in as far as the value 0..100 goes */
    function heartMeter(v, cx, cy, s, id) {
      var top = cy - s / 2, fillH = s * Math.max(0, Math.min(100, v || 0)) / 100, cid = 'hm' + String(id).replace(/[^a-z0-9]/gi, '');
      return '<defs><clipPath id="' + cid + '"><rect x="' + f(cx - s) + '" y="' + f(top + s - fillH) + '" width="' + f(s * 2) + '" height="' + f(fillH + 2) + '"/></clipPath></defs>' +
        K().heart(cx, cy, s, { seed: cid + 'o', fill: PAPER }) + '<g clip-path="url(#' + cid + ')">' + K().heart(cx, cy, s, { seed: cid + 'o', fill: TONER }) + '</g>';
    }
    /** highlighter(window, today, planned, w): the job's window as highlighter streaks on a ruler of days */
    function highlighter(win, today, planned, w) {
      win = win || {};
      var pts = [win.opens, win.idealUntil, win.lateFrom, win.missedAt, today, planned].filter(num), a, b, span, out = '', ht = 18;
      if (!pts.length) return '';
      a = Math.min.apply(null, pts); b = Math.max.apply(null, pts) + 1; span = Math.max(1, b - a);
      function X(d) { return 4 + (d - a) / span * (w - 8); }
      function streak(from, to, col, op) { if (!num(from) || !num(to) || to < from) return ''; return '<path d="M' + f(X(from)) + ' 9H' + f(X(to + 1)) + '" stroke="' + col + '" stroke-opacity="' + (op || 0.75) + '" stroke-width="12" stroke-linecap="butt"/>'; }
      out += streak(num(win.opens) ? win.opens : a, num(win.idealUntil) ? win.idealUntil : (num(win.lateFrom) ? win.lateFrom - 1 : b - 1), K().ink('fluorYellow'));
      if (num(win.idealUntil) && num(win.lateFrom)) out += streak(win.idealUntil + 1, win.lateFrom - 1, K().ink('fluorYellow'), 0.35);
      if (num(win.lateFrom)) out += K().hatch(X(win.lateFrom), 4, Math.max(2, X(num(win.missedAt) ? win.missedAt : b) - X(win.lateFrom)), 10, { seed: 'hlt', gap: 4, sw: 1.4 });
      if (num(win.missedAt)) out += '<path d="M' + f(X(win.missedAt)) + ' 9H' + f(X(b)) + '" stroke="' + TONER + '" stroke-width="2" stroke-dasharray="3 3"/>';
      out += '<path d="M4 17H' + f(w - 4) + '" stroke="' + TONER + '" stroke-width="1.2"/>';
      if (num(today)) out += K().line(X(today + 0.5), 0, X(today + 0.5), ht, { seed: 'tdy', sw: 3, over: 0 });
      if (num(planned)) out += '<path d="M' + f(X(planned + 0.5)) + ' 2l5 7-5 7-5-7z" fill="' + TONER + '"/>';
      return out;
    }
    /* ---- the clipboard as a thing: masonite, sheets, a steel clip ---- */
    function rrD(x, y, w, ht, rad, r) {
      function jj(a) { return r ? (r.next() * 2 - 1) * a : 0; }
      var x2 = x + w, y2 = y + ht, k = rad;
      return 'M' + f(x + k) + ' ' + f(y + jj(0.6)) + 'L' + f(x2 - k) + ' ' + f(y + jj(0.6)) + 'Q' + f(x2) + ' ' + f(y) + ' ' + f(x2 + jj(0.6)) + ' ' + f(y + k) +
        'L' + f(x2 + jj(0.6)) + ' ' + f(y2 - k) + 'Q' + f(x2) + ' ' + f(y2) + ' ' + f(x2 - k) + ' ' + f(y2 + jj(0.6)) + 'L' + f(x + k) + ' ' + f(y2 + jj(0.6)) +
        'Q' + f(x) + ' ' + f(y2) + ' ' + f(x + jj(0.6)) + ' ' + f(y2 - k) + 'L' + f(x + jj(0.6)) + ' ' + f(y + k) + 'Q' + f(x) + ' ' + f(y) + ' ' + f(x + k) + ' ' + f(y) + 'Z';
    }
    /** masonite(x, y, w, h, seed, o): a hardboard clipboard's board: brown masonite with rounded corners, a dark pressed
     *  edge, a mottle and fibre flecks, pale worn scuffs at the corners, scratches. o.s scale (1 = a 230px clipboard). */
    function masonite(x, y, w, ht, seed, o) {
      o = o || {};
      var r = K().rng('mz' + seed), s = o.s || 1, rad = Math.max(3, 10 * s), d = rrD(x, y, w, ht, rad, r), out = '', inner = '', i, n, px, py, a, l,
          dark = '', light = '', scr = '', cid = K().id('pc');
      out += '<path d="' + d + '" transform="translate(' + f(2 + 4 * s) + ' ' + f(3 + 5 * s) + ')" fill="#000" fill-opacity=".64"/>';
      out += '<path d="' + d + '" fill="#7e5c38"/>';
      /* the mottle: big soft patches a shade darker and lighter */
      n = Math.max(4, Math.round(w * ht / 9000));
      for (i = 0; i < n; i++) {
        inner += '<ellipse cx="' + f(x + r.next() * w) + '" cy="' + f(y + r.next() * ht) + '" rx="' + f((18 + r.next() * 60) * Math.max(0.4, s)) + '" ry="' + f((10 + r.next() * 30) * Math.max(0.4, s)) +
          '" fill="' + (r.next() < 0.55 ? '#5c4127' : '#a07a4b') + '" fill-opacity="' + f(0.24 + r.next() * 0.26) + '" transform="rotate(' + f(r.range(-25, 25)) + ' ' + f(x + w / 2) + ' ' + f(y + ht / 2) + ')"/>';
      }
      /* fibre flecks, mostly lying one way */
      n = Math.min(2600, Math.round(w * ht / (o.detail === false ? 600 : 210)));
      for (i = 0; i < n; i++) {
        px = x + r.next() * w; py = y + r.next() * ht; l = (1.5 + r.next() * 5) * Math.max(0.5, s); a = r.range(-0.35, 0.35);
        if (r.next() < 0.7) dark += 'M' + f(px) + ' ' + f(py) + 'l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l);
        else light += 'M' + f(px) + ' ' + f(py) + 'l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l);
      }
      inner += '<path d="' + dark + '" stroke="#3e2a17" stroke-opacity=".55" stroke-width="' + f(Math.max(0.6, 0.9 * s)) + '" stroke-linecap="round"/>';
      inner += '<path d="' + light + '" stroke="#b8925f" stroke-opacity=".5" stroke-width="' + f(Math.max(0.5, 0.8 * s)) + '" stroke-linecap="round"/>';
      inner += K().dotsRect(x, y, w, ht, 1, { op: 0.22 });
      /* worn corners and edges: pale scuffs where hands and table wore the face off, a chipped corner */
      [[x, y, 1, 1], [x + w, y, -1, 1], [x + w, y + ht, -1, -1], [x, y + ht, 1, -1]].forEach(function (c) {
        var sz = (14 + r.next() * 22) * Math.max(0.45, s), pts = [], k, t, rr;
        for (k = 0; k <= 8; k++) { t = (k / 8) * Math.PI / 2; rr = sz * (0.55 + r.next() * 0.6); pts.push([c[0] + c[2] * Math.cos(t) * rr, c[1] + c[3] * Math.sin(t) * rr]); }
        pts.push([c[0], c[1]]);
        inner += '<path d="' + K().polyD(pts) + '" fill="#c7a476" fill-opacity="' + f(0.35 + r.next() * 0.3) + '"/>';
      });
      n = Math.round(8 + 10 * s);
      for (i = 0; i < n; i++) {
        var edge = r.int(0, 3), along = r.next();
        px = edge === 0 || edge === 2 ? x + along * w : (edge === 1 ? x + w - r.next() * 18 * s : x + r.next() * 18 * s);
        py = edge === 1 || edge === 3 ? y + along * ht : (edge === 2 ? y + ht - r.next() * 18 * s : y + r.next() * 18 * s);
        l = (5 + r.next() * 16) * Math.max(0.5, s); a = r.range(-0.6, 0.6) + (edge % 2 ? Math.PI / 2 : 0);
        scr += 'M' + f(px) + ' ' + f(py) + 'l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l);
      }
      inner += '<path d="' + scr + '" stroke="#ead8b5" stroke-opacity=".6" stroke-width="' + f(Math.max(0.6, 1 * s)) + '" stroke-linecap="round"/>';
      inner += '<path d="' + d + '" fill="none" stroke="#2c1d0f" stroke-opacity=".8" stroke-width="' + f(Math.max(2, 6 * s)) + '"/>';
      inner += '<path d="' + rrD(x + 3 * s + 1, y + 3 * s + 1, w - 6 * s - 2, ht - 6 * s - 2, Math.max(2, rad - 3 * s)) + '" fill="none" stroke="#b28c5c" stroke-opacity=".45" stroke-width="' + f(Math.max(0.6, 1.2 * s)) + '"/>';
      if (o.chip !== false) { px = x + w * (0.2 + r.next() * 0.6); inner += '<path d="M' + f(px) + ' ' + f(y + ht) + 'l' + f(4 * s) + ' ' + f(-5 * s) + 'l' + f(7 * s) + ' ' + f(1 * s) + 'l' + f(3 * s) + ' ' + f(4 * s) + 'Z" fill="#2c1d0f"/>'; }
      out += '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + cid + ')">' + inner + '</g>';
      return out;
    }
    /** typedLines(x, y, w, h, seed, s): rows of typing on a sheet, seen as toner bars (on a page you see only the edge of) */
    function typedLines(x, y, w, ht, seed, s) {
      var r = K().rng('tl' + seed), out = '', yy = y + 16 * s, step = 9 * s;
      for (; yy < y + ht - 10 * s; yy += step) { if (r.next() < 0.15) { yy += step; continue; } out += 'M' + f(x + 10 * s) + ' ' + f(yy) + 'h' + f((w - 20 * s) * (0.45 + r.next() * 0.55)); }
      return '<path d="' + out + '" stroke="#262624" stroke-width="' + f(Math.max(0.8, 2.2 * s)) + '" stroke-dasharray="' + f(5 * s) + ' ' + f(1.2 * s) + '"/>';
    }
    /** topSheet(x, y, w, h, seed, o): the top sheet of copy paper, its bottom right corner curled up; flat paper (words go
     *  on it). o.stock, o.back (the curl's underside), o.curl px, o.burn. */
    function topSheet(x, y, w, ht, seed, o) {
      o = o || {};
      var r = K().rng('ts' + seed), c = o.curl || 0, out = '', pts;
      function jj(a) { return (r.next() * 2 - 1) * a; }
      pts = [[x + jj(0.8), y + jj(0.8)], [x + w * 0.5 + jj(1), y + jj(1)], [x + w + jj(0.8), y + jj(0.8)], [x + w + jj(1), y + ht * 0.5]];
      if (c) pts.push([x + w + jj(0.5), y + ht - c], [x + w - c, y + ht + jj(0.5)]); else pts.push([x + w + jj(0.8), y + ht + jj(0.8)]);
      pts.push([x + w * 0.5 + jj(1), y + ht + jj(1)], [x + jj(0.8), y + ht + jj(0.8)], [x + jj(1), y + ht * 0.5]);
      out += K().paper(0, 0, 0, 0, { pts: pts, seed: seed, stock: o.stock || 'white', burn: o.burn === undefined ? 0.3 : o.burn, sx: o.sx || 3, sy: o.sy || 4, sop: 0.55, shadow: o.shadow });
      if (c) {
        var ax = x + w, ay = y + ht - c, bx = x + w - c, by = y + ht, fx = x + w - c * 0.95, fy = y + ht - c * 0.95,
            flap = 'M' + f(ax) + ' ' + f(ay) + 'Q' + f(fx + c * 0.42) + ' ' + f(fy + c * 0.12) + ' ' + f(fx) + ' ' + f(fy) + 'Q' + f(fx + c * 0.12) + ' ' + f(fy + c * 0.42) + ' ' + f(bx) + ' ' + f(by) + 'Z';
        out += '<path d="' + flap + '" transform="translate(' + f(c * 0.12 + 1) + ' ' + f(c * 0.16 + 1) + ')" fill="#000" fill-opacity=".38"/>';
        out += '<path d="' + flap + '" fill="' + (o.back || '#d6ceb6') + '" stroke="#141413" stroke-opacity=".55" stroke-width="1"/>';
        out += '<path d="M' + f(ax - c * 0.08) + ' ' + f(ay + c * 0.12) + 'L' + f(bx + c * 0.12) + ' ' + f(by - c * 0.08) + '" stroke="#fff" stroke-opacity=".55" stroke-width="' + f(Math.max(1, c * 0.08)) + '"/>';
      }
      return out;
    }
    /** steelClip(x, y, W, seed): a lever clip, xeroxed and cut out: the lever with its slot, the riveted plate, the jaw,
     *  a shine down it, dents and scratches. Drawn in grays so the copier gives it toner grit. W wide, W*0.34 tall. */
    function steelClip(x, y, W, seed) {
      var H = W * 0.34, r = K().rng('stc' + seed), e = Math.max(1.6, W * 0.022), out = '', sil, i, dx, dy;
      function P(pts) { return K().polyD(pts.map(function (p) { return [x + p[0] * W, y + p[1] * H]; })); }
      sil = P([[0.2, 0], [0.8, 0], [0.83, 0.33], [0.99, 0.35], [0.95, 1], [0.05, 1], [0.01, 0.35], [0.17, 0.33]]);
      out += '<defs><linearGradient id="cbsteelA" x1="0" y1="0" x2=".25" y2="1"><stop offset="0" stop-color="#ececE7"/><stop offset=".38" stop-color="#b4b6b1"/>' +
        '<stop offset=".74" stop-color="#6e706c"/><stop offset="1" stop-color="#363734"/></linearGradient>' +
        '<linearGradient id="cbsteelB" x1="0" y1="0" x2=".15" y2="1"><stop offset="0" stop-color="#9c9e99"/><stop offset=".22" stop-color="#dcded9"/><stop offset=".46" stop-color="#5b5d59"/>' +
        '<stop offset="1" stop-color="#2f302d"/></linearGradient></defs>';
      out += '<path d="' + sil + '" transform="translate(' + f(e + 2) + ' ' + f(e + 3) + ')" fill="#000" fill-opacity=".66" stroke="#000" stroke-opacity=".66" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
      out += '<path d="' + sil + '" fill="#f4f2ea" stroke="#f4f2ea" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
      /* the lever, its slot */
      function Q(pts) { return pts.map(function (p, i) { return (p.length > 2 ? 'Q' + f(x + p[2] * W) + ' ' + f(y + p[3] * H) + ' ' : (i ? 'L' : 'M')) + f(x + p[0] * W) + ' ' + f(y + p[1] * H); }).join('') + 'Z'; }
      out += '<path d="' + Q([[0.2, 0.42], [0.2, 0.2], [0.36, 0.02, 0.2, 0.02], [0.64, 0.02], [0.8, 0.2, 0.8, 0.02], [0.8, 0.42]]) + '" fill="url(#cbsteelB)" stroke="#141413" stroke-width="' + f(Math.max(1, W * 0.006)) + '"/>';
      out += '<path d="' + Q([[0.38, 0.27], [0.38, 0.2], [0.42, 0.11, 0.38, 0.11], [0.58, 0.11], [0.62, 0.2, 0.62, 0.11], [0.62, 0.27]]) + '" fill="#141413"/>';
      /* the plate, riveted to the board, and the rolled jaw over the paper */
      out += '<path d="' + P([[0.03, 0.37], [0.97, 0.37], [0.935, 0.8], [0.065, 0.8]]) + '" fill="url(#cbsteelA)" stroke="#141413" stroke-width="' + f(Math.max(1, W * 0.006)) + '"/>';
      out += '<path d="' + P([[0.065, 0.78], [0.935, 0.78], [0.915, 0.97], [0.085, 0.97]]) + '" fill="#4b4c49" stroke="#141413" stroke-width="' + f(Math.max(1, W * 0.005)) + '"/>';
      out += '<path d="M' + f(x + 0.08 * W) + ' ' + f(y + 0.83 * H) + 'H' + f(x + 0.92 * W) + '" stroke="#e8e8e3" stroke-opacity=".8" stroke-width="' + f(Math.max(0.8, H * 0.035)) + '"/>';
      /* a shine down it, a thinner one after */
      out += '<path d="' + P([[0.29, 0.39], [0.35, 0.39], [0.32, 0.78], [0.26, 0.78]]) + '" fill="#fff" fill-opacity=".66"/>';
      out += '<path d="' + P([[0.385, 0.39], [0.405, 0.39], [0.375, 0.78], [0.355, 0.78]]) + '" fill="#fff" fill-opacity=".45"/>';
      /* rivets */
      [0.075, 0.925].forEach(function (cx) {
        out += '<circle cx="' + f(x + cx * W) + '" cy="' + f(y + 0.6 * H) + '" r="' + f(W * 0.02) + '" fill="#6a6c68" stroke="#141413" stroke-width="' + f(Math.max(0.8, W * 0.005)) + '"/>' +
          '<circle cx="' + f(x + (cx - 0.005) * W) + '" cy="' + f(y + 0.57 * H) + '" r="' + f(W * 0.007) + '" fill="#fff" fill-opacity=".85"/>';
      });
      /* dents: a dull smudge pushed into the steel with a lit lip on one side, off centre; scratches */
      for (i = 0; i < 1; i++) {
        dx = x + (0.6 + r.next() * 0.2) * W; dy = y + 0.7 * H;
        out += '<ellipse cx="' + f(dx) + '" cy="' + f(dy) + '" rx="' + f(W * 0.04) + '" ry="' + f(H * 0.035) + '" transform="rotate(' + f(r.range(-30, 30)) + ' ' + f(dx) + ' ' + f(dy) + ')" fill="#2f302d" fill-opacity=".35"/>' +
          '<path d="M' + f(dx + W * 0.012) + ' ' + f(dy + H * 0.07) + 'l' + f(W * 0.022) + ' ' + f(-H * 0.09) + '" stroke="#fff" stroke-opacity=".75" stroke-width="' + f(Math.max(0.7, W * 0.006)) + '" stroke-linecap="round"/>';
      }
      for (i = 0; i < 6; i++) {
        dx = x + (0.08 + r.next() * 0.84) * W; dy = y + (0.4 + r.next() * 0.36) * H;
        out += '<path d="M' + f(dx) + ' ' + f(dy) + 'l' + f(r.range(4, 14) * W / 230) + ' ' + f(r.range(-2, 2) * W / 230) + '" stroke="' + (i % 2 ? '#fff' : '#2a2b29') + '" stroke-opacity=".6" stroke-width="' + f(Math.max(0.5, W * 0.003)) + '"/>';
      }
      return out;
    }
    /** clipboard(w, h, seed, o): a small clipboard: a masonite board, an older sheet or two under a typed top sheet with a
     *  curled corner, a xeroxed steel clip. The top sheet is the box (12, 24, w - 26, h - 40). o.paper top sheet stock, o.under. */
    function clipboard(w, ht, seed, o) {
      o = o || {};
      var s = w / 230, big = w >= 120, r = K().rng('cbu' + seed), sx = 12, sy = 24, sw = w - 26, sh = ht - 40, out = '';
      out += masonite(4, 10, w - 10, ht - 16, seed + 'b', { s: s, detail: big, chip: big });
      if (big) {
        out += K().paper(sx + 4 * s, sy + 4 * s, sw, sh, { seed: seed + 'u1', stock: o.under || ['goldenrod', 'pink', 'blue', 'mint'][r.int(0, 3)], rot: 1.3, sx: 2, sy: 3, sop: 0.5, burn: 0.5, cut: 1,
          inner: typedLines(sx + 4 * s, sy + 4 * s, sw, sh, seed + 'u1', s) });
      }
      out += topSheet(sx, sy, sw, sh, seed + 'p', { stock: o.paper || 'white', curl: big ? Math.round(16 * s) : 0, sx: 2, sy: 3, back: o.paper === 'bone' ? '#cbbf9f' : '#d6d1c1' });
      out += steelClip(w / 2 - w * 0.23, 1, w * 0.46, seed + 'c');
      return out;
    }
    /** peel(x, y, s): the lifted corner (you can drag this): the corner folded up, the backing showing under it */
    function peel(x, y, s) {
      return '<path d="M' + f(x) + ' ' + f(y - s) + 'L' + f(x) + ' ' + f(y) + 'L' + f(x - s) + ' ' + f(y) + 'Z" fill="' + TONER + '"/>' +
        '<path d="M' + f(x) + ' ' + f(y - s) + 'L' + f(x - s * 0.95) + ' ' + f(y - s * 1.05) + 'L' + f(x - s) + ' ' + f(y) + 'Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="1.6"/>' +
        '<path d="M' + f(x - s * 0.15) + ' ' + f(y - s * 0.95) + 'L' + f(x - s * 0.9) + ' ' + f(y - s * 0.2) + '" stroke="' + TONER + '" stroke-opacity=".35" stroke-width="1"/>';
    }
    /** draggable(el, payload, onDrop(target, payload)): pointer drag with a ghost; drop targets carry data-drop. */
    function draggable(el, payload, onDrop) {
      if (!el || typeof el.addEventListener !== 'function') return;
      var st = null, ghost = null, over = null, swallow = false;
      function finish() {
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        if (over) over.classList.remove('is-over');
        el.classList.remove('is-lifted');
        if (typeof document !== 'undefined' && document.body) document.body.classList.remove('cb-dragging');
        ghost = null; over = null;
      }
      function targetAt(x, y) {
        var t = typeof document !== 'undefined' && document.elementFromPoint ? document.elementFromPoint(x, y) : null;
        while (t && t.getAttribute && !t.getAttribute('data-drop')) t = t.parentNode;
        return t && t.getAttribute ? t : null;
      }
      el.addEventListener('pointerdown', function (e) { if (e.button !== undefined && e.button !== 0) return; st = { x: e.clientX, y: e.clientY, id: e.pointerId, on: false }; });
      el.addEventListener('pointermove', function (e) {
        if (!st || e.pointerId !== st.id) return;
        if (!st.on && Math.abs(e.clientX - st.x) + Math.abs(e.clientY - st.y) > 7) {
          st.on = true;
          try { el.setPointerCapture(e.pointerId); } catch (x) { /* fine */ }
          var r = el.getBoundingClientRect();
          ghost = el.cloneNode(true); ghost.className += ' cb-ghost'; ghost.removeAttribute('data-drop');
          ghost.style.width = pu(r.width / pxPerP()); ghost.style.height = pu(r.height / pxPerP());
          st.dx = st.x - r.left; st.dy = st.y - r.top;
          document.body.appendChild(ghost); document.body.classList.add('cb-dragging');
          el.classList.add('is-lifted');
        }
        if (st.on && ghost) {
          ghost.style.left = pu((e.clientX - st.dx) / pxPerP()); ghost.style.top = pu((e.clientY - st.dy) / pxPerP());
          var t = targetAt(e.clientX, e.clientY);
          if (t === el) t = null;
          if (t !== over) { if (over) over.classList.remove('is-over'); over = t; if (over) over.classList.add('is-over'); }
          e.preventDefault();
        }
      });
      el.addEventListener('pointerup', function (e) {
        if (!st) return;
        var was = st.on, t = was ? targetAt(e.clientX, e.clientY) : null;
        st = null;
        if (!was) return;
        swallow = true;
        finish();
        if (t && t !== el) onDrop(t.getAttribute('data-drop'), payload);
      });
      el.addEventListener('pointercancel', function () { st = null; finish(); });
      el.addEventListener('click', function (e) { if (swallow) { swallow = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    }
    /** bandSticker(card, w, o): a die-cut sticker made from the band's mark (markup, w by w*0.42); o.fill backing, o.peel lifts a corner */
    function bandSticker(c, w, o) {
      o = o || {};
      var ht = Math.round(w * 0.42), mark = '', out = '', mh = Math.floor(Math.min(ht - 18, (w - 24) / 3));
      try { mark = SB.Identity.bandMark({ id: c.id, name: c.name, genre: c.genre }, mh); } catch (e) { mark = ''; }
      out += K().sticker({ rect: [6, 6, w - 14, ht - 14] }, '', { seed: 'bs' + c.id, edge: 4, fill: o.fill || PAPER });
      if (mark) out += '<g style="color:' + TONER + '">' + place(mark, Math.max(9, (w - 4 - mh * 3) / 2), Math.max(8, (ht - 2 - mh) / 2)) + '</g>';
      else out += type(String(c.name || '').toUpperCase(), w / 2, ht / 2 + 4, 11, { anchor: 'middle', bold: true, maxWidth: w - 24 });
      if (o.peel) out += peel(w - 8, ht - 8, Math.min(20, ht * 0.4));
      return out;
    }

    return { svg: svg, art: art, strip: strip, stripW: stripW, stripArt: stripArt, place: place, thing: thing, act: act, tabs: tabs, tickThing: tickThing, mark: mark,
             marker: marker, mw: mw, type: type, tw: tw, letter: letter, lw: lw, word: word, typed: typed, head: head, crowd: crowd,
             unknowns: unknowns, face: face, stamp: stamp, bang: bang, swipe: swipe, stampW: stampW, heartMeter: heartMeter, tick: tick, highlighter: highlighter,
             clipboard: clipboard, masonite: masonite, topSheet: topSheet, steelClip: steelClip, typedLines: typedLines, peel: peel, draggable: draggable, listen: listen, bandSticker: bandSticker, cityInk: cityInk, hot: hot, blue: blue, f: f, pu: pu, pxPerP: pxPerP, res: res, thumb: thumb,
             TONER: TONER, PAPER: PAPER, BONE: BONE, GRAY: GRAY };
  })();

  var LIVE = { DRAFT: 1, CONFIRMED: 1 };
  var D = SB.UI.cuDraw;

  function K() { return SB.DeskKit; }
  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function T(route, key, ctx) { return SB.text.label('ui.' + route + '.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb, ctx) { return has(key) ? SB.text.label(key, ctx) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'shows', String(e && e.message)); return fb; } }
  function act(f) { return SB.UI.act(f); }
  function st() { return SB.UI.game(); }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, ' '); }
  function money(n) { return SB.text.money ? SB.text.money(n || 0) : '$' + Math.round(n || 0); }
  function md(day) { var d = SB.time.date(day); return d.m + '/' + d.d; }
  /** piece(cls, stock, kids, o): one self-contained piece of paper on the board (CSS cuts it and casts its paste-up shadow) */
  function piece(cls, stock, kids, o) {
    o = o || {};
    return h(o.tag || 'section', { class: 'cb-piece cb-stock-' + (stock || 'white') + (cls ? ' ' + cls : ''), role: o.role || null, aria: o.aria || (o.label ? { label: o.label } : null), data: o.data || null }, kids);
  }

  function keepFocus(root, fn) {
    var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
    fn();
    if (key) { el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null); if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } } }
  }

  /* the moves (js/ui/finish.js): a screen's papers slap down one after another when it first shows or its list really changes */
  function slap(root, sel, sig, from) {
    var F = SB.Finish, key, els;
    if (!F || !root || !root.querySelectorAll) return;
    key = root.getAttribute ? root.getAttribute('data-mv-sig') : null;
    if (key === sig) return;
    if (root.setAttribute) root.setAttribute('data-mv-sig', sig);
    els = Array.prototype.slice.call(root.querySelectorAll(sel));
    F.stagger(els, from || 3);
    els.forEach(function (el) { el.classList.add('mv-slap'); });
  }

  function confirmCard(text, yes, no, onYes) {
    var close = SB.UI.card(h('div', { class: 'sb-confirm cb-confirm' }, [
      h('p', { class: 'cb-typed', text: text }),
      h('div', { class: 'cb-row' }, [
        D.act(yes, yes, 'cf-yes', function () { close(); onYes(); }),
        D.act(no, no, 'cf-no', function () { close(); })
      ])
    ]), { label: text });
  }

  function asksFor(s, showId) {
    var out = [], k, a;
    for (k in (s.asks || {})) { a = s.asks[k]; if (a.showId === showId) out.push(a); }
    return out;
  }
  function bandAsks(s, showId) {
    var by = {};
    asksFor(s, showId).forEach(function (a) { if (a.kind === 'BAND_PLAY') by[a.toId] = a; });
    return by;
  }
  function roomName(s, id) { return id && s.rooms && s.rooms[id] ? s.rooms[id].name : ''; }

  /* a tear-off date page: the day in jagged marker, black band on top */
  function datePage(day, w) {
    var t = SB.time.date(day), ht = w * 1.1, out = '';
    out += K().paper(4, 4, w - 10, ht - 8, { seed: 'dp' + day, stock: 'white', torn: 't', sx: 3, sy: 4, burn: 0.5,
      inner: '<path d="M0 0H' + f(w) + 'V' + f(w * 0.3) + 'H0Z" fill="' + D.TONER + '"/>' +
        D.type(SB.time.fmt(day, 'dow3').toUpperCase(), w / 2 - 1, w * 0.23, w * 0.15, { anchor: 'middle', bold: true, fill: D.PAPER }) +
        D.marker(String(t.d), w / 2 - 1, w * 0.84, w * 0.42, { anchor: 'middle', seed: 'dpd' + day }) +
        D.type(SB.time.fmt(day, 'month').slice(0, 3).toUpperCase(), w / 2 - 1, ht - 14, w * 0.12, { anchor: 'middle', bold: true }) });
    return out;
  }
  function f(n) { return D.f(n); }
  /* a key on a manila tag: the key a xeroxed cut-out, the tag with the room's glyph and its name on a label strip */
  function keyTag(room, w, o) {
    o = o || {};
    var out = '', gl = '', id = room ? room.id : 'x', kx = w * 0.17;
    out += K().cutout([[kx - 11, 6], [kx + 11, 6], [kx + 13, 26], [kx + 4, 30], [kx + 4, 40], [kx + 11, 42], [kx + 11, 48], [kx + 4, 50], [kx + 4, 56], [kx + 9, 58], [kx + 4, 64], [kx - 4, 64], [kx - 4, 30], [kx - 13, 26]],
      '<rect x="' + f(kx - 4) + '" y="13" width="8" height="7" fill="' + D.PAPER + '"/>' + K().dotsRect(kx - 10, 8, 10, 22, 2, { white: true }), { seed: 'k' + id, edge: 3 });
    out += K().line(kx + 2, 14, w * 0.36, 34, { seed: 'kst' + id, sw: 1.4, stroke: D.PAPER, over: 0 });
    out += K().paper(w * 0.3, 8, w * 0.68, 56, { seed: 'kg' + id, stock: o.stock || 'manila', sx: 3, sy: 4, burn: 0.5,
      inner: '<circle cx="' + f(w * 0.36) + '" cy="34" r="3.5" fill="#141413"/>' });
    if (room) {
      try { gl = SB.Identity.roomGlyph(room.kind, 22); } catch (e) { gl = ''; }
      if (gl) out += '<g style="color:#141413">' + D.place(gl, w * 0.41, 12) + '</g>';
      out += D.type(word('room.' + room.kind + '.name', lower(room.kind)).toUpperCase(), w * 0.41 + 27, 28, 12, { bold: true, maxWidth: w * 0.5 });
      /* the name strip slides left over the tag when it is long, so it is never cut off at the picture's edge */
      var nm = String(room.name || '').toUpperCase().slice(0, 18);
      out += D.strip(nm, Math.max(w * 0.2, Math.min(w * 0.38, w - 4 - D.stripW(nm, 12))), 38, 12);
    } else out += D.marker('?', w * 0.62, 52, 28, { seed: 'kq' });
    return out;
  }

  /* ================================================================ */
  /* the clipboard in your hands (the close-up's frame, dressed)      */
  /* ================================================================ */
  /* The close-up (js/desk/closeup.js) holds shows, show and bill in its 'clipboard' frame; its flat board is hidden by
   * css/r-clip.css and the screens dress the frame here. One show: a masonite board with a band sticker or two, older
   * sheets under the top sheet, the top sheet itself (flat copy paper the screen is typed on, its corner curled) and a
   * xeroxed steel clip over it. The list: a patch of the black table the clipboards lie on.
   * SHEET must match the .cu-in insets for .cb-held--show in css/r-clip.css. */
  var SHEET = { t: 80, r: 60, b: 54, l: 48 }, TOPSTOCK = '#ECD668', TOPBACK = '#c4ae4a';
  function holder(root) {
    var el = root;
    while (el && el.classList) { if (el.classList.contains('cu-obj')) return el.classList.contains('cu--clipboard') ? el : null; el = el.parentNode; }
    return null;
  }
  function boardBands(s) {
    var ids = s && s.bands ? Object.keys(s.bands).sort() : [], r = K().rng('boardbands'), out = [], i, b;
    for (i = 0; i < 6 && out.length < 2 && ids.length; i++) {
      b = s.bands[ids.splice(r.int(0, ids.length - 1), 1)[0]];
      if (b && b.name) out.push({ id: b.id, name: b.name, genre: b.genre });
    }
    return out;
  }
  /* the board behind one show: masonite, stickers on its margin, the older sheets under the top sheet (photocopied) */
  function heldBoard(w, ht, bands) {
    var P = SHEET, X = P.l, Y = P.t, W = w - P.l - P.r, H = ht - P.t - P.b, out = '';
    out += D.masonite(6, 24, w - 14, ht - 30, 'held', { s: 1.6 });
    /* a band sticker or two stuck on the board's top margin, a torn one's leavings down the side */
    if (bands[0]) out += '<g transform="translate(26 18) rotate(-6 85 36)">' + D.bandSticker(bands[0], 172) + '</g>';
    if (bands[1] && w > 760) out += '<g transform="translate(' + f(w / 2 + 166) + ' 22) rotate(5 75 32)">' + D.bandSticker(bands[1], 150) + '</g>';
    out += K().paper(12, ht * 0.5, 18, 22, { seed: 'resid', stock: 'white', torn: 'rb', rot: -8, shadow: false, burn: 0.2 }) + K().paper(16, ht * 0.5 + 34, 13, 10, { seed: 'resid2', stock: 'white', torn: 'tr', shadow: false, burn: 0.2 });
    out += K().sticker({ circle: [30, ht - 34, 21] }, K().skull(30, ht - 35, 26, { seed: 'bst' }), { seed: 'bstk', edge: 3, fill: '#F0B2C0' });
    /* the older sheets: blue and pink peeking out at the sides and foot, typed to the edge; a white one right under */
    out += K().paper(X - 11, Y + 16, W, H - 6, { seed: 'u-blue', stock: '#B4CDE4', rot: -0.8, sx: 3, sy: 4, sop: 0.55, burn: 0.55, cut: 1.2, inner: typedLines(X - 11, Y + 16, W, H - 6, 'ub', 1.4) });
    out += K().paper(X + 13, Y + 8, W, H, { seed: 'u-pink', stock: '#F0B2C0', rot: 0.9, sx: 3, sy: 4, sop: 0.55, burn: 0.55, cut: 1.2, inner: typedLines(X + 13, Y + 8, W, H, 'up', 1.4) });
    out += K().paper(X + 5, Y + 4, W, H, { seed: 'u-white', stock: 'white', rot: 0.3, sx: 2, sy: 3, sop: 0.5, burn: 0.4, cut: 1, inner: typedLines(X + 5, Y + 4, W, H, 'uw', 1.4) });
    return out;
  }
  function typedLines(x, y, w, ht, seed, s) { return D.typedLines(x, y, w, ht, seed, s); }
  /* the list: a patch of the black table under the lamp, registration marks at its corners */
  function heldTable(w, ht) {
    var inner = K().regmark(26, 26, 9, { stroke: '#3a3a37' }) + K().regmark(w - 26, 26, 9, { stroke: '#3a3a37' }) + K().regmark(26, ht - 26, 9, { stroke: '#3a3a37' }) + K().regmark(w - 26, ht - 26, 9, { stroke: '#3a3a37' });
    return K().paper(4, 4, w - 8, ht - 8, { seed: 'cbtable', stock: '#101010', inner: inner, burn: 0, cut: 1.2, sop: 0.8 });
  }
  /** dress(root, mode, s): put the clipboard round the screen ('show') or lay the table under the list ('list').
   *  Returns the undress function (stops watching the size). */
  function dress(root, mode, s) {
    var obj = safe(function () { return holder(root); }, null), inner, layers = {}, last = '', ro = null, bands;
    if (!obj || typeof document === 'undefined' || !obj.querySelector) return function () {};
    inner = obj.querySelector('.cu-in');
    obj.classList.add('cb-held');
    obj.classList.add('cb-held--' + mode);
    bands = mode === 'show' ? boardBands(s) : [];
    ['board', 'sheet', 'clip'].forEach(function (k) {
      if (mode !== 'show' && k !== 'board') return;
      layers[k] = h('div', { class: 'cb-hold cb-hold--' + k, aria: { hidden: 'true' } });
      if (k === 'clip' || !inner) obj.appendChild(layers[k]); else obj.insertBefore(layers[k], inner);
    });
    function draw() {
      var k = D.pxPerP(), w = Math.round((obj.offsetWidth || 0) / k), ht = Math.round((obj.offsetHeight || 0) / k), cw;
      if (!w || !ht || last === w + 'x' + ht + '@' + D.res()) return;
      last = w + 'x' + ht + '@' + D.res();
      ['board', 'sheet'].forEach(function (n) { if (layers[n]) { layers[n].style.width = D.pu(w); layers[n].style.height = D.pu(ht); } });
      SB.UI.clear(layers.board);
      if (mode !== 'show') { layers.board.appendChild(D.art(heldTable(w, ht), w, ht)); return; }
      layers.board.appendChild(D.art(heldBoard(w, ht, bands), w, ht));
      layers.sheet.innerHTML = D.svg(topSheet(SHEET.l, SHEET.t, w - SHEET.l - SHEET.r, ht - SHEET.t - SHEET.b, 'held', { stock: TOPSTOCK, back: TOPBACK, curl: 30, burn: 0.35, sx: 4, sy: 6 }), w, ht);
      cw = Math.min(300, Math.max(200, w * 0.32));
      SB.UI.clear(layers.clip);
      layers.clip.style.left = D.pu(w / 2 - cw / 2 - 4);
      layers.clip.style.top = D.pu(SHEET.t + 12 - cw * 0.34);
      layers.clip.appendChild(D.art(D.steelClip(4, 2, cw, 'held'), cw + 14, cw * 0.34 + 14));
    }
    function topSheet(x, y, w, ht, seed, o) { return D.topSheet(x, y, w, ht, seed, o); }
    safe(draw);
    if (typeof ResizeObserver === 'function') { ro = new ResizeObserver(function () { safe(draw); }); safe(function () { ro.observe(obj); }); }
    return function () { if (ro) safe(function () { ro.disconnect(); }); };
  }

  /* ================================================================ */
  /* shows: the clipboards                                            */
  /* ================================================================ */

  function mountShows(root) {
    var showPast = false, ownDay = null, lastSig = null, firstDraw = true;
    if (root && root.removeAttribute) root.removeAttribute('data-mv-sig');
    function render() { draw(); settle(); }
    /* the clipboards slap down when the table is new or its list really changes; the next show's is stamped on, hardest */
    function settle() {
      var F = SB.Finish, s = st(), sig, hero = root.querySelector('.cb-clipwrap.is-next');
      if (!F || !s) return;
      sig = (s.shows ? Object.keys(s.shows).length : 0) + ':' + (hero ? hero.getAttribute('data-show') : '') + ':' + showPast;
      slap(root, '.cb-clips > .cb-clipwrap:not(.is-next), .cb-shelf .cb-clipwrap, .cb-pastrow > *', sig, 2);
      if (hero && sig !== lastSig) F.move(hero, 'stamp', { delay: firstDraw ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
      lastSig = sig; firstDraw = false;
    }
    function draw() {
      var s = st(), live, past, tomorrow, kids = [];
      SB.UI.clear(root);
      if (!s) { root.appendChild(C().Empty({})); return; }
      live = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'] }); }, []);
      past = safe(function () { return SB.Shows.list(s, { status: ['PLAYED', 'CANCELLED'] }); }, []).reverse();
      tomorrow = s.clock.day + 1;
      if (ownDay == null || ownDay < tomorrow) ownDay = s.clock.day + 21;
      live.forEach(function (x, i) { kids.push(clip(s, x, i)); });
      kids.push(blank(s, tomorrow));
      /* the clipboards fill the table: bigger when there are fewer of them; the shoebox and the last few played
         flyers lie along the foot (every played one with the box open) */
      root.appendChild(h('div', { class: 'cb-shows', style: { '--cb-zoom': kids.length <= 2 ? '1.15' : kids.length === 3 ? '1.05' : '.95', '--cb-zoom-next': kids.length <= 2 ? '1.9' : '1.6' } }, [
        h('h1', { class: 'cb-sr', text: T('shows', 'title') }),
        !live.length ? piece('cb-hintslip', 'white', [h('p', { class: 'cb-typed', text: T('shows', 'none') })]) : null,
        h('div', { class: 'cb-clips' }, kids),
        past.length ? h('div', { class: 'cb-shelf' + (showPast ? ' is-open' : '') }, [shoebox(s, past), h('div', { class: 'cb-pastrow' }, (showPast ? past : past.slice(0, 5)).map(function (x, i) {
          var out = K().paper(4, 4, 92, 74, { seed: 'pf' + x.id, stock: x.status === 'CANCELLED' ? 'newsprint' : 'white', rot: i % 2 ? 3 : -3, sx: 3, sy: 4,
            inner: D.marker(md(x.day), 50, 40, 20, { anchor: 'middle', seed: 'pfd' + x.id }) + (x.status === 'CANCELLED' ? K().xout(14, 14, 72, 56, { seed: 'pfx' + x.id, sw: 3 })
              : D.type((x.result && x.result.vsPar ? String(x.result.vsPar) : '').slice(0, 9).toUpperCase(), 50, 64, 11, { anchor: 'middle', bold: true, maxWidth: 84 })) });
          return D.thing({ cls: 'cb-pastflyer', label: SB.time.fmt(x.day, 'short') + ', ' + roomName(s, x.roomId) + ', ' + (x.result && x.result.verdictLine ? x.result.verdictLine : T('shows', 'status.' + x.status)),
            svg: out, w: 100, h: 84, onClick: function () { SB.UI.go('show', { showId: x.id }); } });
        }))]) : null
      ]));
    }
    function clip(s, x, i) {
      var a = asksFor(s, x.id).filter(function (q) { return q.kind === 'BAND_PLAY'; }), yes = 0, wait = 0, no = 0, counter = 0, out, thumb = null, nj, fc = null, rs, w = 230, ht = 300, k, late;
      a.forEach(function (q) { if (q.status === 'YES') yes++; else if (q.status === 'COUNTER') { counter++; wait++; } else if (q.status === 'QUEUED' || q.status === 'SENT') wait++; else if (q.status === 'NO' || q.status === 'SILENT') no++; });
      out = D.clipboard(w, ht, 'cl' + x.id);
      out += D.marker(SB.time.fmt(x.day, 'dow3').toUpperCase() + ' ' + md(x.day), 22, 66, 24, { seed: 'cld' + x.id, maxWidth: 120 });
      out += D.type(x.roomId ? roomName(s, x.roomId).toUpperCase() : T('shows', 'noRoom').toUpperCase(), 24, 88, 12, { bold: true, maxWidth: 124 });
      /* the asks: a yes stuck flat (solid), a wait taped with a ?, a no torn */
      for (k = 0; k < Math.min(6, yes); k++) out += '<path d="M' + (24 + k * 20) + ' 196h16v12h-16z" fill="#141413"/>';
      for (k = 0; k < Math.min(6, wait); k++) out += '<path d="M' + (24 + (yes + k) * 20) + ' 196h16v12h-16z" fill="#f4f2ea" stroke="#141413" stroke-width="1.6"/>' + D.type('?', 32 + (yes + k) * 20, 206, 10, { anchor: 'middle', bold: true }) + K().tape(32 + (yes + k) * 20, 195, 14, 5, { seed: 'wt' + k, rot: -20 });
      for (k = 0; k < Math.min(4, no); k++) out += '<path d="M' + (24 + (yes + wait + k) * 20) + ' 196h12l-4 6 6 6h-14z" fill="#9a9890"/>';
      out += D.stamp(T('shows', 'status.' + x.status), 26, 238, 13, { rot: -6, on: true });
      if (x.deal && x.deal.guarantee > 0) { fc = safe(function () { return SB.Forecast.card(s, x.id); }, null); if (fc && fc.guaranteePace) out += D.type(T('shows', 'pace.' + fc.guaranteePace), 26, 226, 11, { bold: true, fill: fc.guaranteePace === 'OK' ? '#141413' : D.hot() }); }
      rs = safe(function () { return SB.Forecast.reachStrip(s, x.id); }, null);
      if (rs && rs.gens) rs.gens.forEach(function (g, gi) {
        var hi = g && g.heard ? Math.max(0, Math.min(1, g.heard.hi || 0)) : 0, lo = g && g.heard ? Math.max(0, Math.min(1, g.heard.lo || 0)) : 0;
        out += '<path d="M24 ' + (110 + gi * 12) + 'h70v7h-70z" fill="none" stroke="#141413" stroke-width="1.2"/><path d="M24 ' + (110 + gi * 12) + 'h' + f(70 * hi) + 'v7h' + f(-70 * hi) + 'z" fill="url(#dk-ht2)"/><path d="M24 ' + (110 + gi * 12) + 'h' + f(70 * lo) + 'v7h' + f(-70 * lo) + 'z" fill="#141413"/>';
      });
      nj = nextJob(s, x);
      late = nj && nj.late;
      if (nj) {
        out += '<path d="M24 ' + 164 + 'H' + f(24 + 180 * nj.frac) + '" stroke="' + K().ink('fluorYellow') + '" stroke-width="13" stroke-opacity=".8"/>';
        out += D.type(String(nj.label).slice(0, 26), 26, 169, 12, { bold: true, maxWidth: 178 });
        if (late) out += D.bang(198, 178, 22);
      }
      if (counter) out += D.swipe(190, 202, 36, 16) + D.marker('$?', 196, 210, 18, { seed: 'ctr' + x.id });
      if (SB.UI.parts.flyerThumb) thumb = safe(function () { return D.thumb({ recipe: (x.flyer && x.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, x.id) }, 70); }, null);
      var label = T('shows', 'open', { d: SB.time.fmt(x.day, 'short') }) + ', ' + (x.roomId ? roomName(s, x.roomId) : T('shows', 'noRoom')) + ', ' + T('shows', 'status.' + x.status).toLowerCase() +
        (a.length ? ', ' + T('shows', 'asks', { yes: yes, wait: wait, no: no }) : '') + (nj ? ', ' + nj.label : '') + (fc && fc.guaranteePace ? ', ' + T('shows', 'pace.' + fc.guaranteePace).toLowerCase() : '');
      return h('div', { class: 'cb-clipwrap' + (i === 0 ? ' is-next' : ''), data: { show: x.id }, style: i === 0 ? null : { transform: 'rotate(' + ((i % 3) - 1) * 1.4 + 'deg)' } }, [
        D.thing({ cls: 'cb-clip', label: label, svg: out, w: w, h: ht, fk: 'clip-' + x.id,
          onClick: function () { SB.UI.go('show', { showId: x.id }); } }),
        thumb ? h('div', { class: 'cb-clip-flyer', aria: { hidden: 'true' } }, thumb) : null
      ]);
    }
    function blank(s, tomorrow) {
      var w = 230, ht = 300, out = D.clipboard(w, ht, 'blank', { paper: 'bone' });
      out += D.marker(T('shows', 'blank'), w / 2, 70, 22, { anchor: 'middle', seed: 'blank' });
      out += '<g transform="translate(68 88)">' + datePage(ownDay, 96) + '</g>';
      function move(d) { ownDay = Math.max(tomorrow, Math.min(tomorrow + 83, ownDay + d)); render(); }
      return h('div', { class: 'cb-clipwrap cb-blank' }, [
        D.art(out, w, ht),
        h('div', { class: 'cb-blank-ctl' }, [
          D.tabs({ label: SB.time.fmt(ownDay, 'short'), items: [
            { text: '<', label: T('shows', 'earlier'), fk: 'own-prev', onClick: function () { move(-1); } },
            { text: '>', label: T('shows', 'later'), fk: 'own-next', onClick: function () { move(1); } }] }),
          D.act(T('shows', 'create'), T('shows', 'newOwn') + ': ' + SB.time.fmt(ownDay, 'short'), 'own-go', function () {
            var day = ownDay, r = act(function (x) { return SB.Shows.create(x, { own: true, day: day, tags: [], benefitFor: null }); });
            if (r && r.ok !== false && r.showId) SB.UI.go('show', { showId: r.showId });
          }, { size: 14 })
        ])
      ]);
    }
    function shoebox(s, past) {
      var w = 230, ht = 180, out = '';
      /* a kraft shoebox, its lid lifted when it is open, a typed label taped on its end (words on plain paper) */
      out += K().cutout([[10, 60], [w - 10, 60], [w - 14, ht - 8], [14, ht - 8]], K().dotsRect(14, ht - 30, w - 28, 22, 2, { op: 0.5 }) +
        '<path d="M14 66H' + (w - 14) + '" stroke="#5c4127" stroke-width="3"/>', { seed: 'sbx', edge: 5, fill: '#a77d4b' });
      out += K().paper(4, showPast ? 30 : 44, w - 8, 30, { seed: 'sbl', stock: '#8d6a3e', rot: showPast ? -8 : 0, inner: K().dotsRect(0, 0, w, 80, 1, { op: 0.4 }) });
      out += K().paper(w / 2 - 72, 84, 144, 76, { seed: 'sblab', stock: 'white', rot: -2, sx: 3, sy: 4, burn: 0.4 });
      out += K().tape(w / 2 - 70, 88, 34, 12, { seed: 'sbt1', rot: -30 }) + K().tape(w / 2 + 70, 154, 34, 12, { seed: 'sbt2', rot: -30 });
      out += D.marker(T('shows', 'pastBox'), w / 2, 120, 26, { anchor: 'middle', seed: 'pb', maxWidth: 128 });
      out += D.marker(String(past.length), w / 2, 152, 22, { anchor: 'middle', seed: 'pbn' });
      return h('div', { class: 'cb-clipwrap cb-box' }, D.thing({ cls: 'cb-shoebox', label: showPast ? T('shows', 'hidePast') : T('shows', 'past') + ' (' + past.length + ')', pressed: showPast, fk: 'box', svg: out, w: w, h: ht,
        onClick: function () { showPast = !showPast; render(); } }));
    }
    var undress = dress(root, 'list', st());
    render();
    return { update: function () { keepFocus(root, render); }, unmount: function () { undress(); } };
  }

  function nextJob(s, x) {
    var jobs = safe(function () { return SB.Jobs.forShow(s, x.id); }, []), next = null, w, span;
    jobs.forEach(function (j) {
      if (j.status !== 'TODO' || j.optional || !j.window || !num(j.window.lateFrom)) return;
      if (!next || j.window.lateFrom < next.window.lateFrom) next = j;
    });
    if (!next) return null;
    w = next.window; span = Math.max(1, w.lateFrom - (num(w.opens) ? w.opens : s.clock.day));
    return { label: next.label, frac: Math.max(0.05, Math.min(1, 1 - (w.lateFrom - s.clock.day) / span)), late: s.clock.day >= w.lateFrom };
  }

  /* ================================================================ */
  /* the set list, shared by the clipboard and the bill               */
  /* ================================================================ */

  /* a snapshot of the band at the top of the bill, taped to the set list (cut-outs through the copier; decoration) */
  function bandPhoto(band) {
    var Kit = SB.UI.Kit, r, ids, paper;
    if (!band || !Kit || !Kit.photo || !SB.Cutouts || !SB.Cutouts.filter) return null;
    r = K().rng('bp' + band.id);
    function one(role) { var l = SB.Cutouts.filter(function (c) { return c.role === role && (c.frame === 'full' || c.frame === 'waist'); }); return l.length ? l[r.int(0, l.length - 1)].id : null; }
    ids = [one('guitar'), one('singer'), one('bass')].filter(Boolean);
    paper = ['canary', 'pink', 'blue', 'green', 'salmon'][r.int(0, 4)];
    return safe(function () { return Kit.photo({ ids: ids, w: 156, h: 104, paper: paper, tape: ['top'], rot: 2.5, seed: 'bp' + band.id, cls: 'cb-bandphoto', caption: String(band.name || '').toUpperCase() }); }, null);
  }

  function setList(s, v, ctx) {
    var show = v.show, showId = show.id, locked = !!show.bill.locked, room = v.room, asks = bandAsks(s, showId), onBill = {},
        order = show.bill.slots.map(function (x) { return x.bandId; }), pend = { OPEN: [], MIDDLE: [], CLOSE: [] }, noes = [], kids = [];
    show.bill.slots.forEach(function (x) { onBill[x.bandId] = true; });
    Object.keys(asks).forEach(function (id) {
      var a = asks[id], c;
      if (onBill[id]) return;
      c = safe(function () { return SB.Bands.card(s, id); }, null);
      if (!c) return;
      if (a.status === 'QUEUED' || a.status === 'SENT' || a.status === 'COUNTER') (pend[(a.payload && a.payload.wantSlot) || 'MIDDLE'] || pend.MIDDLE).push({ c: c, a: a });
      else if (a.status === 'NO' || a.status === 'SILENT') noes.push({ c: c, a: a });
    });
    function move(i, d) {
      if (i + d < 0 || i + d >= order.length) return;
      var o = order.slice(), t = o[i]; o[i] = o[i + d]; o[i + d] = t;
      guard(locked, function () { act(function (x) { return SB.Shows.setBill(x, showId, { order: o }); }); });
    }
    function moveTo(id, j) {
      var o = order.filter(function (x) { return x !== id; });
      o.splice(Math.max(0, Math.min(o.length, j)), 0, id);
      guard(locked, function () { act(function (x) { return SB.Shows.setBill(x, showId, { order: o }); }); });
    }
    function dropBand(b) { guard(locked && b.confirmed, function () { act(function (x) { return SB.Shows.dropBand(x, showId, b.band.id, 'PLAYER'); }); }); }
    function setMin(b, m) { var mm = {}; mm[b.band.id] = Math.max(15, Math.min(90, m)); act(function (x) { return SB.Shows.setBill(x, showId, { minutes: mm }); }); }
    function onDrop(target, p) {
      if (!target) return;
      if (/^pos:/.test(target) && p.slot) moveTo(p.slot, Number(target.slice(4)));
      else if (/^gap:/.test(target) && p.cand && ctx.ask) ctx.ask(p.cand, target.slice(4));
    }
    ctx.onDrop = onDrop;

    /* a gap in the running order: a dashed box drawn on the sheet; asks waiting for an answer sit in it, taped, with a ? */
    function gap(slot, list) {
      var picking = !!(ctx.picked && ctx.ask), w = 380, ht = list.length ? 30 + list.length * 66 : 46, out = '', gw = D.tw(T('bill', 'gap.' + slot), 11);
      out += '<path d="M6 6H' + (w - 6) + 'V' + (ht - 6) + 'H6Z" fill="' + (picking ? '#f4f2ea' : 'none') + '" stroke="#141413" stroke-width="' + (picking ? 3 : 1.6) + '" stroke-dasharray="' + (picking ? '10 5' : '5 5') + '"/>';
      out += D.type(T('bill', 'gap.' + slot), 16, 25, 11, { bold: true });
      if (picking) out += D.marker(T('bill', 'stickHere'), w - 14, 28, 15, { anchor: 'end', seed: 'sh' + slot }) + K().arrow(gw + 30, 20, w - D.mw(T('bill', 'stickHere'), 15) - 24, 20, { seed: 'sha' + slot, sw: 2.6, head: 10 });
      list.forEach(function (p, i) {
        var y = 34 + i * 66, sw = 150;
        out += '<g transform="translate(16 ' + y + ') rotate(' + (i % 2 ? 2 : -2) + ')">' + D.bandSticker(p.c, sw) + '</g>' + K().tape(30, y + 8, 40, 13, { seed: 'pt' + p.c.id, rot: -28 }) + K().tape(sw + 4, y + 52, 40, 13, { seed: 'pt2' + p.c.id, rot: -28 });
        out += (p.a.status === 'COUNTER' ? D.swipe(190, y + 36, 56, 22) : '') + D.marker(p.a.status === 'COUNTER' ? '$?' : '?', 196, y + 50, 40, { fill: p.a.status === 'COUNTER' ? D.hot() : '#141413', seed: 'q' + p.c.id });
        out += D.type(p.a.status === 'COUNTER' ? T('bill', 'counter').toUpperCase() : T('bill', 'asked').toUpperCase(), 250, y + 36, 12, { bold: true, maxWidth: 124 });
      });
      var lab = T('bill', 'gapL', { slot: T('bill', 'gap.' + slot).toLowerCase() }) + (list.length ? '. ' + list.map(function (p) { return p.c.name + ', ' + (p.a.status === 'COUNTER' ? T('bill', 'counter') : T('bill', 'asked')); }).join('; ') : '');
      if (!ctx.ask) return h('div', { class: 'cb-gap', role: list.length ? 'img' : null, aria: list.length ? { label: lab } : { hidden: 'true' } }, list.length ? D.art(out, w, ht) : null);
      return D.thing({ cls: 'cb-gap' + (picking ? ' is-ready' : ''), label: lab, drop: 'gap:' + slot, fk: 'gap-' + slot, svg: out, w: w, h: ht,
        onClick: function () { if (ctx.picked) ctx.ask(ctx.picked, slot); } });
    }

    /* a band on the bill: its number in marker, its sticker (flat when they said yes, taped when they have not), its set */
    function row(b, i) {
      var w = 244, ht = 76, out = '', st0 = b.confirmed ? T('bill', 'yes') : T('bill', 'asked'), el, mins;
      out += D.marker(String(i + 1), 4, 56, 34, { seed: 'n' + i });
      out += '<g transform="translate(36 6) rotate(' + (i % 2 ? 1 : -1.5) + ' 85 36)">' + D.bandSticker(b.band, 156, { peel: true }) + '</g>';
      if (!b.confirmed) out += K().tape(54, 12, 44, 14, { seed: 'st' + b.band.id, rot: -24 }) + D.marker('?', 202, 52, 32, { seed: 'sq' + b.band.id });
      if (b.listed) out += D.bang(210, 28, 20);
      el = D.thing({ cls: 'cb-setrow' + (b.confirmed ? '' : ' is-taped'), fk: 'set-' + b.band.id, drop: 'pos:' + i, svg: out, w: w, h: ht,
        label: T('bill', 'setL', { n: i + 1, name: b.band.name, state: st0, t: num(b.start) ? SB.time.clock(b.start) : '?', m: b.minutes || 0 }),
        on: { keydown: function (e) {
          if (e.key === 'ArrowUp') { e.preventDefault(); move(i, -1); }
          else if (e.key === 'ArrowDown') { e.preventDefault(); move(i, 1); }
          else if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); dropBand(b); }
        }, click: function () { SB.UI.go('band', { bandId: b.band.id }); } } });
      D.draggable(el, { slot: b.band.id }, onDrop);
      mins = h('div', { class: 'cb-setctl' }, [
        num(b.start) ? D.typed(T('bill', 'starts', { t: SB.time.clock(b.start) }), 12, { bold: true }) : null,
        D.tabs({ label: T('bill', 'minutes', { n: b.minutes || 0 }) + ', ' + b.band.name, title: T('bill', 'minutes', { n: b.minutes || 0 }), items: [
          { text: '-5', label: T('bill', 'shorter') + ': ' + b.band.name, fk: 'mn-' + b.band.id, onClick: function () { setMin(b, (b.minutes || 30) - 5); } },
          { text: '+5', label: T('bill', 'longer') + ': ' + b.band.name, fk: 'mx-' + b.band.id, onClick: function () { setMin(b, (b.minutes || 30) + 5); } },
          { text: 'X', label: T('bill', 'drop', { name: b.band.name }), fk: 'dr-' + b.band.id, onClick: function () { dropBand(b); } }] })
      ]);
      return h('li', { class: 'cb-setli' }, [el, mins]);
    }

    var snap = v.bands.length ? bandPhoto(v.bands[v.bands.length - 1].band) : null, hd = D.word(T('show', 'bill'), 30, { cls: 'cb-head' });
    kids.push(snap ? h('div', { class: 'cb-sethead' }, [hd, snap]) : hd);
    if (locked) kids.push(h('p', { class: 'cb-typed cb-locked' }, [D.art(lockSvg(), 26, 28), ' ', T('show', 'locked')]));
    var items = [];
    function showGap(k) { return !!ctx.ask || pend[k].length > 0; }
    function gapLi(k) { return h('li', { class: 'cb-gapli' }, gap(k, pend[k])); }
    if (showGap('OPEN')) items.push(gapLi('OPEN'));
    v.bands.forEach(function (b, i) {
      items.push(row(b, i));
      if (i === 0 && v.bands.length > 1 && showGap('MIDDLE')) items.push(gapLi('MIDDLE'));
    });
    if (v.bands.length <= 1 && showGap('MIDDLE')) items.push(gapLi('MIDDLE'));
    if (showGap('CLOSE')) items.push(gapLi('CLOSE'));
    kids.push(h('ol', { class: 'cb-setlist', data: { tut: 'bill-slots', 'tut-ref': showId } }, items));
    if (!v.bands.length && !ctx.ask && !pend.OPEN.length && !pend.MIDDLE.length && !pend.CLOSE.length) kids.push(D.art(K().scrawl(10, 14, 200, { seed: 'empty' }) + K().scrawl(10, 30, 140, { seed: 'empty2' }) + K().heart(230, 24, 18, { seed: 'eh', fill: 'none' }), 260, 40));
    if (room && num(room.curfew)) kids.push(h('div', { class: 'cb-curfew', role: 'img', aria: { label: T('bill', 'stop', { t: SB.time.clock(room.curfew) }) } },
      D.art(D.marker(T('bill', 'stop', { t: SB.time.clock(room.curfew) }), 6, 26, 18, { seed: 'cf' }) + K().under3(6, 32, D.mw(T('bill', 'stop', { t: SB.time.clock(room.curfew) }), 18), { seed: 'cfu', sw: 2.4, gap: 4 }), D.mw(T('bill', 'stop', { t: SB.time.clock(room.curfew) }), 18) + 20, 50)));
    if (noes.length) kids.push(h('div', { class: 'cb-noes' }, noes.map(function (p, i) {
      var cid = 'tn' + i + String(p.c.id).replace(/\W/g, '');
      var out = '<g transform="rotate(' + (i % 2 ? 8 : -6) + ' 60 28)"><clipPath id="' + cid + '"><path d="M0 0H74L62 14L78 30L60 62H0Z"/></clipPath><g clip-path="url(#' + cid + ')">' + D.bandSticker(p.c, 140) + '</g></g>';
      out += D.marker(T('bill', 'noWord'), 96, 44, 22, { seed: 'no' + i });
      return D.thing({ cls: 'cb-torn', label: p.c.name + ', ' + T('bill', 'no'), fk: 'no-' + p.c.id, svg: out, w: 140, h: 66, onClick: function () { SB.UI.go('band', { bandId: p.c.id }); } });
    })));
    return piece('cb-set', 'white', kids);
  }
  function lockSvg() { return K().rect(4, 12, 18, 14, { seed: 'lk', fill: '#141413', sw: 2.2 }) + K().path([[8, 12], [8, 6], [13, 2], [18, 6], [18, 12]], { seed: 'lks', sw: 2.4 }); }
  function guard(locked, fn) { if (locked) confirmCard(T('bill', 'lockedWarn'), T('bill', 'yesGo'), T('bill', 'noGo'), fn); else fn(); }

  /* the header of a clipboard: the date in jagged marker, the room typed under it, the status stamped */
  function showHead(s, show, room, backLabel, backFn, title, big) {
    var tt = (title || SB.time.fmt(show.day, 'long')).toUpperCase(), stt = T('shows', 'status.' + show.status), sx = Math.min(412, D.mw(tt, 34) + 26), w = Math.ceil(sx + D.stampW(stt, 16) + 20), out = '', sw = 0;
    out += D.marker(tt, 4, 40, 34, { maxWidth: 400, seed: 'hd' + show.id });
    if (room) out += D.type(String(room.name).toUpperCase(), 6, 65, 14, { bold: true, maxWidth: 400 });
    /* the one loud thing on a show: its status, stamped big across the date line, a long way off level */
    if (big) { w = Math.ceil(sx) + 10; sw = Math.ceil(D.stampW(stt, 32)) + 34; }
    else out += D.stamp(stt, sx, 10, 16, { rot: -7 });
    return h('header', { class: 'cb-showhead' + (big ? ' cb-showhead--big' : '') }, [
      D.act('<', backLabel, 'back', backFn, { size: 14 }),
      h('h1', { class: 'cb-showtitle', aria: { label: SB.time.fmt(show.day, 'long') + (room ? ', ' + room.name : '') + ', ' + T('shows', 'status.' + show.status).toLowerCase() } },
        [D.art(out, w, 76), big ? D.art(D.stamp(stt, 16, 18, 32, { rot: -8 }), sw, 96, 'cb-statstamp mv-stamp') : null])
    ]);
  }

  /* ================================================================ */
  /* show: one clipboard                                              */
  /* ================================================================ */

  function mountShow(root, params) {
    var showId = params && params.showId, ui = { roomId: null, day: null, editPrice: false }, lastStat = null, firstDraw = true;
    if (root && root.removeAttribute) root.removeAttribute('data-mv-sig');

    function render() { draw(); settle(); }
    /* the papers slap down when the page first shows; the status is stamped on whenever it changes (and sounds like it) */
    function settle() {
      var F = SB.Finish, el = root.querySelector('.cb-statstamp'), s = st(), sh = s && s.shows ? s.shows[showId] : null;
      slap(root, '.cb-show .cb-piece, .rc-sheet .rc-piece:not(.rc-polaroid):not(.rc-tape)', 'show:' + showId, 2);
      /* a played show: the night's photo is stamped on, and the ledger's figures count up */
      var ph = root.querySelector('.rc-polaroid');
      if (F && ph && firstDraw) {
        F.move(ph, 'stamp', { delay: 260, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: ph } });
        Array.prototype.forEach.call(root.querySelectorAll('.rc-lg-d'), function (d) {
          var t = d.textContent, m = /^([+\u2212-]?)(\d+)$/.exec(t), sg;
          if (!m) return;
          sg = m[1];
          F.countUp(d, parseInt(m[2], 10), { from: 0, delay: 420, fmt: function (n) { return sg + n; } });
        });
      }
      if (F && el && sh && lastStat !== sh.status) { F.move(el, 'stamp', { delay: firstDraw ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: el } }); }
      if (sh) lastStat = sh.status;
      firstDraw = false;
    }
    function draw() {
      var s = st(), v, show;
      SB.UI.clear(root);
      if (!s || !showId || !s.shows || !s.shows[showId]) { root.appendChild(C().Empty({})); return; }
      v = safe(function () { return SB.Shows.view(s, showId); }, null);
      if (!v) { root.appendChild(C().Empty({})); return; }
      show = v.show;
      if (!LIVE[show.status]) { root.appendChild(after(s, v)); return; }
      root.appendChild(h('div', { class: 'cb-show' }, [
        showHead(s, show, v.room, T('show', 'back'), function () { SB.UI.go('shows'); }, null, true),
        h('div', { class: 'cb-cols' }, [
          h('div', { class: 'cb-main' }, [
            setList(s, v, {}),
            h('div', { class: 'cb-under' }, [D.act(T('show', 'buildBill'), T('show', 'buildBillL'), 'tobill', function () { SB.UI.go('bill', { showId: showId }); }, { size: 15, tut: 'bill-add', tutRef: showId })]),
            crowdSection(s, v),
            jobsSection(s, v)
          ]),
          h('aside', { class: 'cb-side' }, [flyerSection(s, v), roomSection(s, v), doorSection(s, v), dealSection(s, v), crewSection(s, v),
            h('div', { class: 'cb-under' }, [D.act(T('show', 'cancel'), T('show', 'cancelL'), 'cancel', function () {
              confirmCard(T('show', 'cancelSure'), T('show', 'cancelYes'), T('show', 'keep'), function () { act(function (x) { return SB.Shows.cancel(x, showId, 'PLAYER'); }); });
            })])])
        ])
      ]));
    }

    function after(s, v) {
      var show = v.show, onNote = function (key) { SB.UI.go('notebook', { key: key }); };
      /* the night's record, pasted up (js/ui/screens/showrecord.js); the ruled ledger below if that file is missing */
      if (show.result && typeof SB.UI.showRecord === 'function') return h('div', { class: 'cb-show is-after' }, [
        showHead(s, show, v.room, T('show', 'back'), function () { SB.UI.go('shows'); }),
        SB.UI.showRecord(s, v, { onNote: onNote, jobs: v.jobs || [] })
      ]);
      return h('div', { class: 'cb-show is-after' }, [
        showHead(s, show, v.room, T('show', 'back'), function () { SB.UI.go('shows'); }),
        h('h2', { class: 'cb-sr', text: T('show', 'result') }),
        piece('cb-result', 'white', [show.result ? C().ShowResult({ show: show, onNote: function (key) { SB.UI.go('notebook', { key: key }); } }) : C().Empty({})]),
        h('ul', { class: 'cb-notes' }, (v.jobs || []).filter(function (j) { return j.status === 'DONE'; }).map(function (j, i) {
          return piece('cb-note', i % 2 ? 'bone' : 'white', [D.art(D.mark('DONE', 20), 22, 22), h('span', { class: 'cb-typed', text: j.label + (j.text ? ': ' + j.text : '') })], { tag: 'li' });
        }))
      ]);
    }

    /* the room: hang a tag on a night: pick a key, pick a day, hang it */
    function holdForm(s, v) {
      var rooms = safe(function () { return SB.Rooms.list(s, { bookable: true }); }, []), lo, hi;
      if (ui.roomId == null || rooms.indexOf(ui.roomId) < 0) ui.roomId = (v.show.roomId && rooms.indexOf(v.show.roomId) >= 0) ? v.show.roomId : (rooms[0] || null);
      if (ui.day == null) ui.day = v.show.day;
      lo = Math.max(s.clock.day + 1, v.show.day - 14); hi = lo + 28;
      if (!rooms.length) return null;
      function move(d) { ui.day = Math.max(lo, Math.min(hi, ui.day + d)); render(); }
      return h('div', { class: 'cb-holdform' }, [
        D.tabs({ label: T('show', 'room'), items: rooms.map(function (id) {
          var r = s.rooms[id], gl = safe(function () { return SB.Identity.roomGlyph(r.kind, 22); }, '');
          return { text: String(r.name).slice(0, 16), label: T('show', 'pickRoom', { room: String(r.name).replace(/^the\s+/i, '') }) + ', ' + word('room.' + r.kind + '.name', lower(r.kind)) + (num(r.cap) ? ', ' + r.cap : ''),
                   on: ui.roomId === id, fk: 'kp-' + id, art: gl ? '<g style="color:' + (ui.roomId === id ? D.PAPER : D.TONER) + '">' + D.place(gl, 0, 0) + '</g>' : '', w: 22, ah: 24, onClick: function () { ui.roomId = id; render(); } };
        }) }),
        h('div', { class: 'cb-dayctl' }, [
          D.tabs({ label: SB.time.fmt(ui.day, 'short'), items: [{ text: '<', label: T('shows', 'earlier'), fk: 'hd-prev', onClick: function () { move(-1); } }] }),
          D.art(datePage(ui.day, 70), 70, 80),
          D.tabs({ label: SB.time.fmt(ui.day, 'short'), items: [{ text: '>', label: T('shows', 'later'), fk: 'hd-next', onClick: function () { move(1); } }] }),
          D.act(T('show', 'holdRoom'), T('show', 'holdRoomL', { room: roomName(s, ui.roomId), d: SB.time.fmt(ui.day, 'short') }), 'hold', function () {
            var rid = ui.roomId, day = ui.day; act(function (x) { return SB.Mail.ask(x, 'ROOM_HOLD', rid, { showId: showId, day: day }); });
          })
        ])
      ]);
    }

    function roomSection(s, v) {
      var show = v.show, room = v.room, kids = [];
      if (!room) {
        kids.push(D.art(K().cutout([[14, 6], [26, 6], [26, 30], [36, 34], [36, 40], [14, 40]], '', { seed: 'hook', edge: 3 }) + D.marker(T('show', 'noRoom'), 48, 36, 20, { seed: 'nr' }), 260, 48));
        kids.push(holdForm(s, v));
      } else {
        kids.push(D.thing({ cls: 'cb-roomkey', label: room.name + ', ' + word('room.' + room.kind + '.name', lower(room.kind)) + (num(room.cap) ? ', ' + room.cap : '') + (show.hold && num(show.hold.rank) ? ', ' + T('show', 'rank', { n: show.hold.rank }).toLowerCase() : ''),
          fk: 'roomkey', svg: keyTag(room, 230), w: 230, h: 70, onClick: function () { SB.UI.go('room', { roomId: room.id }); } }));
        if (show.hold && num(show.hold.rank)) kids.push(D.art(D.marker(T('show', 'rank', { n: show.hold.rank }), 4, 24, 18, { seed: 'rk', fill: show.hold.rank > 1 ? D.hot() : D.TONER }), D.mw(T('show', 'rank', { n: show.hold.rank }), 18) + 12, 32));
        if (show.status === 'DRAFT') {
          if (v.needsToConfirm && v.needsToConfirm.length) kids.push(h('ul', { class: 'cb-needs', aria: { label: T('show', 'needs') } }, v.needsToConfirm.map(function (n) {
            return h('li', { class: n.met ? 'is-met' : '' }, [D.art(D.mark(n.met ? 'DONE' : 'TODO', 16), 18, 18), h('span', { class: 'cb-typed cb-small', text: n.text })]);
          })));
          kids.push(h('div', { class: 'cb-row' }, [
            D.act(T('show', 'confirm'), T('show', 'confirmL'), 'confirm', function () { act(function (x) { return SB.Mail.ask(x, 'ROOM_CONFIRM', show.roomId, { showId: showId }); }); }),
            D.act(T('show', 'release'), T('show', 'releaseL'), 'release', function () { act(function (x) { return SB.Rooms.release(x, showId); }); }, { size: 11 })
          ]));
        }
        kids.push(h('details', { class: 'cb-fold' }, [h('summary', { class: 'pz-hl' }, [D.stripArt(T('show', 'holdOther'), 11)]), holdForm(s, v)]));
      }
      return piece('cb-roompiece', 'bone', kids, { label: T('show', 'room') });
    }

    function doorSection(s, v) {
      var show = v.show, door = show.door, room = v.room, ages = room && room.ages && room.ages.length ? room.ages : Object.keys(SB.Enums.AGES), kids = [], price = door.price || 0, pt;
      function setPrice(p) { p = Math.max(0, Math.round(Number(p) || 0)); act(function (x) { return SB.Shows.setDoor(x, showId, { price: p }); }); }
      pt = '$' + price;
      var tagSvg = K().paper(0, 0, 0, 0, { pts: [[16, 30], [40, 6], [150, 8], [148, 74], [40, 76]], stock: 'manila', burn: 0.6, sx: 4, sy: 6,
          inner: '<circle cx="36" cy="40" r="5" fill="#141413"/>' + D.marker(pt, 98, 62, 40, { anchor: 'middle', seed: 'price' + price, maxWidth: 96 }) }) +
        K().path([[0, 4], [18, 26], [34, 40]], { seed: 'ps', sw: 1.6, stroke: '#141413' });
      kids.push(D.word(T('show', 'price'), 14));
      kids.push(h('div', { class: 'cb-pricerow' }, [
        ui.editPrice ? h('input', { type: 'number', class: 'cb-priceedit', min: '0', step: '1', value: String(price), aria: { label: T('show', 'price') }, data: { fk: 'price' },
          on: { change: function (e) { ui.editPrice = false; setPrice(e.target.value); }, blur: function () { if (ui.editPrice) { ui.editPrice = false; render(); } },
                keydown: function (e) { if (e.key === 'Escape') { ui.editPrice = false; render(); } } } })
          : D.thing({ cls: 'cb-pricetag', label: T('show', 'priceL', { p: money(price) }), fk: 'price', svg: tagSvg, w: 156, h: 84, strip: '$', stripSize: 11,
              onClick: function () { ui.editPrice = true; render(); var el = root.querySelector('.cb-priceedit'); if (el) { try { el.focus(); el.select(); } catch (e) { /* fine */ } } } }),
        D.tabs({ label: T('show', 'price'), items: [
          { text: '-$1', label: T('show', 'cheaper'), fk: 'p-', onClick: function () { setPrice(price - 1); } },
          { text: '+$1', label: T('show', 'dearer'), fk: 'p+', onClick: function () { setPrice(price + 1); } }] }),
        D.tickThing({ on: !!door.donation, text: T('show', 'donation'), label: T('show', 'donationL'), fk: 'don', onClick: function () { var on = !door.donation; act(function (x) { return SB.Shows.setDoor(x, showId, { donation: on }); }); } })
      ]));
      /* the ages as a stamp inked on the sheet; the choices torn off below it */
      kids.push(h('div', { class: 'cb-agesrow' }, [
        D.art(D.stamp(word('ages.' + door.ages, door.ages), 6, 6, 18, { rot: -6 }), D.stampW(word('ages.' + door.ages, door.ages), 18) + 20, 52),
        D.tabs({ label: T('show', 'ages', { a: word('ages.' + door.ages, door.ages) }), items: ages.map(function (k) {
          return { text: word('ages.' + k, k), label: word('ages.' + k, k), on: door.ages === k, fk: 'age-' + k, onClick: function () { act(function (y) { return SB.Shows.setDoor(y, showId, { ages: k }); }); } };
        }) })
      ]));
      kids.push(D.tabs({ label: T('show', 'label', { l: word('label.' + show.label, lower(show.label)) || T('show', 'normal') }), items: Object.keys(SB.Enums.LABEL).map(function (k) {
        var t = (word('label.' + k, lower(k)) || T('show', 'normal'));
        return { text: t, label: t.toLowerCase(), on: show.label === k, fk: 'lab-' + k, onClick: function () { act(function (y) { return SB.Shows.setLabel(y, showId, k, null); }); } };
      }) }));
      if (door.address != null) kids.push(D.tabs({ label: T('show', 'address'), title: T('show', 'address'), items: Object.keys(SB.Enums.ADDRESS).map(function (k) {
        return { text: word('address.' + k + '.name', lower(k)), label: word('address.' + k + '.name', lower(k)) + '. ' + word('address.' + k + '.says', ''), on: door.address === k, fk: 'addr-' + k,
                 onClick: function () { act(function (x) { return SB.Shows.setDoor(x, showId, { address: k }); }); } };
      }) }));
      return piece('cb-door', 'white', kids, { label: T('show', 'price') });
    }

    function dealSection(s, v) {
      var d = v.deal || {}, ex = safe(function () { return SB.Money.exposure(s, showId); }, null), t = word('deal.' + (d.shape || 'DOOR') + '.words', lower(d.shape), { amount: d.guarantee || 0, pct: Math.round((d.pct || 0) * 100) }),
          bills = ex && num(ex.total) ? Math.max(0, Math.min(8, Math.ceil(ex.total / 40))) : 0, out = '', i;
      for (i = 0; i < bills; i++) out += K().paper(6 + i * 8, 8 + (i % 2) * 3, 56, 28, { seed: 'eb' + i, stock: '#b9c4a6', rot: -6 + i * 2, sx: 2, sy: 3, burn: 0.3, inner: '<path d="M' + (20 + i * 8) + ' 22h28" stroke="#141413" stroke-opacity=".4" stroke-width="5"/>' });
      if (ex && num(ex.total)) out += D.marker(money(ex.total), 80 + bills * 8, 34, 22, { seed: 'ex' });
      return piece('cb-deal', 'manila', [
        h('div', { class: 'cb-dealslip' }, [
          D.art(d.written ? K().path([[4, 24], [26, 4], [32, 10], [10, 30]], { seed: 'pen', sw: 2.4 }) + K().scrawl(6, 32, 36, { seed: 'sig', sw: 1.6 }) : K().heart(20, 18, 22, { seed: 'hs', fill: 'none' }), 46, 38),
          h('p', { class: 'cb-typed', text: t + ', ' + (d.written ? T('show', 'written') : T('show', 'handshake')) })
        ]),
        ex ? h('div', { class: 'cb-iou', role: 'img', aria: { label: T('show', 'exposure') + ': ' + (num(ex.total) ? money(ex.total) : '?') } }, [D.art(out, 220, 48),
          h('p', { class: 'cb-typed cb-small', aria: { hidden: 'true' }, text: (ex.lines || []).map(function (l) { return (l.label || lower(l.cat)) + ' ' + money(l.amount || 0); }).join(' / ') })]) : null
      ], { label: T('show', 'deal') });
    }

    function crowdSection(s, v) {
      var f0 = v.forecast || {}, ex = safe(function () { return SB.Money.exposure(s, showId); }, null);
      return piece('cb-crowdsec', 'bone', [
        D.crowd({ par: f0.par && f0.par.heads, lo: f0.call && f0.call.lo, hi: f0.call && f0.call.hi, cap: f0.cap || null, even: ex && num(ex.breakEven) ? ex.breakEven : null, per: 16 }),
        D.unknowns(f0.call && f0.call.unknowns)
      ]);
    }

    function flyerSection(s, v) {
      var thumb = null;
      if (SB.UI.parts.flyerThumb) thumb = safe(function () { return D.thumb({ recipe: (v.show.flyer && v.show.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, showId) }, 140); }, null);
      return h('div', { class: 'cb-flyerclip' }, [
        h('button', { type: 'button', class: 'cb-thing pz-hl has-strip cb-flyerbtn', aria: { label: T('show', 'flyerDesk') }, data: { fk: 'flyer', tut: 'show-flyer', 'tut-ref': showId }, on: { click: function () { SB.UI.go('flyerdesk', { showId: showId }); } } },
          [D.stripArt(T('show', 'flyerDeskT') || 'FLYER', 11), D.art(K().cutout([[46, 2], [96, 2], [100, 18], [42, 18]], '', { seed: 'bc', edge: 3 }) + K().path([[52, 16], [71, 34], [90, 16]], { seed: 'bcw', sw: 2.4, stroke: '#f4f2ea' }), 140, 36, 'cb-binder'), thumb])
      ]);
    }

    function slotGrid(s, j) {
      var w = s.clock.week * 7, cells = [], i;
      for (i = 0; i < 7; i++) ['DAY', 'NIGHT'].forEach(function (half) {
        var on = j.planned && j.planned.dayIdx === i && j.planned.half === half, d = i, hf = half;
        cells.push(D.thing({ cls: 'cb-slot' + (half === 'NIGHT' ? ' is-night' : ''), pressed: on, fk: 'pl-' + j.id + '-' + i + half,
          label: T('show', 'planIn', { d: SB.time.fmt(w + i, 'dow'), half: word('half.' + half, lower(half)) }),
          svg: D.tick(on ? 'DONE' : 'TODO', 20) + (half === 'NIGHT' ? '<path d="M10 3H17V10Z" fill="#141413"/>' : ''), w: 20, h: 20,
          onClick: function () { act(function (x) { return SB.Week.plan(x, j.id, d, hf, {}); }); } }));
      });
      var heads = [];
      for (i = 0; i < 7; i++) heads.push(h('span', { class: 'cb-slothead', aria: { hidden: 'true' }, text: SB.time.fmt(w + i, 'dow3').charAt(0) }));
      return h('div', { class: 'cb-slotwrap' }, [h('div', { class: 'cb-slotheads' }, heads), h('div', { class: 'cb-slots', role: 'group', aria: { label: j.label } }, cells)]);
    }

    var firstLocals = null, PROMO_JOBS = { FLYER_RUN: 1, ANNOUNCE: 1, BANDS_SHARE: 1, PRINT: 1, LISTINGS: 1, LOCAL_AD: 1, MAILING_LIST: 1, HAND_OUT: 1, INVITES: 1, WEEK_PUSH: 1, DAY_OF_POST: 1 };
    function jobNote(s, j, i) {
      var planAble = j.mode === 'HOURS' && j.status === 'TODO' && (s.clock.phase === 'PLAN' || s.clock.phase === 'PLAY'), status = j.waived ? 'WAIVED' : j.status, kids,
          late = j.status === 'TODO' && j.window && num(j.window.lateFrom) && s.clock.day >= j.window.lateFrom;
      kids = [
        h('div', { class: 'cb-note-top' }, [D.art(D.mark(status, 18), 20, 20),
          h('span', { class: 'cb-typed cb-jobl', text: j.label }),
          late ? D.art(D.bang(4, 24, 22), 30, 26) : null,
          h('span', { class: 'cb-sr', text: ' ' + word('jobStatus.' + j.status, lower(j.status)) + (j.planned ? ', ' + SB.time.fmt(s.clock.week * 7 + j.planned.dayIdx, 'dow3') + ' ' + word('half.' + j.planned.half, '') : '') })]),
        j.waived ? h('p', { class: 'cb-typed cb-small', text: j.text || word('jobs.waived', T('show', 'waived')) })
          : h('div', { class: 'cb-hl', role: 'img', aria: { label: (j.window && j.window.label) || '' } }, [D.art(D.highlighter(j.window, s.clock.day, j.planned ? s.clock.week * 7 + j.planned.dayIdx : null, 200), 200, 18),
              j.window && j.window.label ? h('span', { class: 'cb-typed cb-small', aria: { hidden: 'true' }, text: j.window.label }) : null]),
        planAble ? slotGrid(s, j) : null,
        j.mode === 'MESSAGE' && /LOCALS/.test(j.type) && j.id === firstLocals ? D.act(T('show', 'buildBill'), T('show', 'buildBillL'), 'jb-' + j.id, function () { SB.UI.go('bill', { showId: showId }); }, { size: 10 }) : null
      ];
      return piece('cb-note is-' + String(status).toLowerCase(), status === 'DONE' || status === 'WAIVED' ? 'newsprint' : (i % 2 ? 'bone' : 'white'), kids, { tag: 'li', data: j.type === 'LOCK_BILL' ? { tut: 'bill-lock', 'tut-ref': showId } : (PROMO_JOBS[j.type] ? { tut: 'promo-job', 'tut-ref': showId } : null) });
    }

    function riders(list, labelKey, played) {
      if (!list || !list.length) return null;
      return piece('cb-riders', 'white', [D.word(T('show', labelKey), 13)].concat(list.map(function (r) {
        var on = r.status === 'PROMISED' || r.status === 'DONE' || !!r.planned;
        return D.tickThing({ on: on, disabled: r.status === 'DONE', fk: 'rd-' + r.id, text: r.label + (r.cost ? ' ' + money(r.cost.lo) : ''),
          label: r.label + (r.cost ? ' (' + money(r.cost.lo) + (r.cost.hi !== r.cost.lo ? '-' + money(r.cost.hi) : '') + ')' : '') + (r.text && played ? '. ' + r.text : ''),     // how it went is told after the night, not while the promise still stands
          onClick: function () { act(function (x) { return SB.Jobs.promise(x, r.id, !on); }); } });
      })), { role: 'group', label: T('show', labelKey) });
    }

    /* the friend's chores on a guided start (SB.Rungs): one note, ticked as they get done */
    function coveredNote(cov) {
      var name = cov[0].coveredName || '', seen = {}, labels = [];
      cov.forEach(function (j) { if (!seen[j.label]) { seen[j.label] = true; labels.push(j.label + (j.status === 'DONE' ? ' \u2713' : '')); } });
      return piece('cb-note cb-covered', 'newsprint', [
        h('div', { class: 'cb-note-top' }, [h('span', { class: 'cb-typed cb-jobl', text: T('show', 'covered', { name: name }) })]),
        h('p', { class: 'cb-typed cb-small', text: T('show', 'coveredL', { name: name, list: labels.join(', ') }) })
      ], { tag: 'div' });
    }

    function jobsSection(s, v) {
      var all = v.jobs || [], jobs = all.filter(function (j) { return !j.covered && !j.hidden; }),
          cov = all.filter(function (j) { return j.covered && j.status !== 'MOOT'; }),
          main = jobs.filter(function (j) { return !j.optional && j.mode !== 'PROMISE'; }),
          opt = jobs.filter(function (j) { return j.optional && j.mode !== 'PROMISE'; }),
          adv = jobs.filter(function (j) { return j.type === 'ADVANCE'; })[0], run = jobs.filter(function (j) { return j.type === 'RUN_SHOW'; })[0],
          loc = main.filter(function (j) { return j.mode === 'MESSAGE' && /LOCALS/.test(j.type); });
      firstLocals = loc.length ? loc[0].id : null;              // one way to the sticker sheet, however many bands were asked
      return h('section', { class: 'cb-jobs' }, [
        D.word(T('show', 'jobs'), 26, { cls: 'cb-head cb-onboard' }),
        h('ol', { class: 'cb-notes', data: { tut: 'promo-jobs', 'tut-ref': showId } }, main.map(function (j, i) { return jobNote(s, j, i); })),
        cov.length ? coveredNote(cov) : null,
        adv && adv.riders && adv.riders.length ? riders(adv.riders, 'advance', s.shows[showId] && s.shows[showId].status === 'PLAYED') : null,
        run && run.riders && run.riders.length ? riders(run.riders, 'night', s.shows[showId] && s.shows[showId].status === 'PLAYED') : null,
        opt.length ? h('details', { class: 'cb-fold' }, [h('summary', { class: 'pz-hl' }, [D.stripArt(T('show', 'ifYouWant'), 11)]), h('ul', { class: 'cb-notes is-optional' }, opt.map(function (j, i) { return jobNote(s, j, i); }))]) : null
      ]);
    }

    function crewRow(s, v, role, labelKey) {
      var list = safe(function () { return SB.People.crew(s, role, showId); }, []), cur = v.show.crew[role], yes = {}, out = {}, said = {}, curName, flag;
      asksFor(s, showId).forEach(function (a) {
        if (a.kind !== 'CREW' || (a.payload && a.payload.role && a.payload.role !== role)) return;
        if (a.status === 'YES') yes[a.toId] = true;
        else if (a.status === 'QUEUED' || a.status === 'SENT') out[a.toId] = a.status;
        else if (a.status === 'NO' || a.status === 'SILENT') said[a.toId] = true;
      });
      curName = cur ? (cur === 'player' ? T('show', 'you') : (s.people[cur] ? (s.people[cur].first || '') : '')) : T('show', 'nobody');
      /* nobody on sound yet: the highlighter and "!!" until somebody says yes (security only where the room requires it) */
      if (!cur && (role === 'sound' || (v.security && v.security.required))) {
        flag = T('show', role === 'sound' ? 'noSound' : 'noSecurity2').toUpperCase();
        flag = h('span', { class: 'cb-noflag', role: 'img', aria: { label: flag } }, D.art(D.swipe(0, 16, D.mw(flag, 15) + 34, 20) + D.marker(flag + ' !!', 4, 22, 15, { fill: D.hot() }), D.mw(flag + ' !!', 15) + 14, 32));
      }
      return h('div', { class: 'cb-crewrow', role: 'group', aria: { label: T('show', labelKey) + ': ' + curName }, data: role === 'sound' ? { tut: 'crew-sound', 'tut-ref': showId } : null }, [
        h('span', { class: 'cb-crewcur' }, [D.word(T('show', labelKey), 13), D.art(cur && cur !== 'player' ? D.face(cur, 40) : '<path d="M3 3h34v34h-34z" fill="none" stroke="#141413" stroke-width="1.6" stroke-dasharray="4 3"/>', 40, 40),
          h('span', { class: 'cb-typed cb-small', text: curName })]),
        flag || null,
        list.length ? D.tabs({ label: T('show', labelKey), items: list.map(function (p) {
          var isOn = cur === p.personId, canPut = !!yes[p.personId], waiting = out[p.personId], lab;
          lab = isOn ? T('show', 'on', { name: p.name }) : (canPut ? T('show', 'put', { name: p.name }) : (waiting ? T('show', waiting === 'SENT' ? 'asked' : 'queued', { name: p.name }) :
                (said[p.personId] ? T('show', 'saidNo', { name: p.name }) : (p.busy ? T('show', 'busy', { name: p.name }) : T('show', 'ask', { name: p.name, rate: money(p.rate || 0) })))));
          if (waiting) return { text: String(p.name || '').split(' ')[0] + ' · ' + T('show', waiting === 'SENT' ? 'askedShort' : 'queuedShort'), label: lab, on: false, disabled: true, fk: 'cr-' + role + p.personId,
                                art: D.face(p.personId, 30), w: 30, ah: 32, onClick: function () {} };
          return { text: (canPut && !isOn ? '+ ' : '') + String(p.name || '').split(' ')[0] + ' ' + money(p.rate || 0), label: lab, on: isOn, disabled: isOn || (!canPut && !!p.busy), fk: 'cr-' + role + p.personId,
                   art: D.face(p.personId, 30), w: 30, ah: 32,
                   onClick: function () {
                     if (canPut) act(function (x) { return SB.Shows.setCrew(x, showId, role, p.personId); });
                     else act(function (x) { return SB.Mail.ask(x, 'CREW', p.personId, { showId: showId, role: role, pay: { kind: 'CASH', amount: p.rate || 0 } }); });
                   } };
        }), size: 12 }) : null
      ]);
    }

    /* security: what the room says (required, recommended, or your call), what it is for, and the cost at a house */
    function securityNote(s, v) {
      var R = v.security, room = v.room ? v.room.name || '' : '', out = [];
      if (!R) return null;
      out.push(R.required ? word('security.required', '', { room: room }) : (R.recommended ? word('security.recommended', '', { why: R.why.map(function (k) { return word('security.why.' + k, lower(k)); }).join(', ') }) : word('security.optional', '')));
      out.push(word('security.what', ''));
      if (R.chill) out.push(word('security.chill', ''));
      if (!R.personId) out.push(word('security.none', ''));
      return h('div', { class: 'cb-crewrow' }, [
        h('p', { class: 'cb-typed cb-small', text: out.filter(Boolean).join(' ') }),
        v.show.crew.security ? D.tickThing({ on: false, text: T('show', 'noSecurity'), label: T('show', 'noSecurityL'), fk: 'sec-none', onClick: function () { act(function (x) { return SB.Shows.setCrew(x, showId, 'security', null); }); } }) : null
      ]);
    }
    /* event insurance: required or not, what it is for, what it costs; bought when the date confirms */
    function insuranceRow(s, v) {
      var I = v.insurance, room = v.room ? v.room.name || '' : '', lines;
      if (!I || !v.show.roomId) return null;
      lines = [I.required ? word('insurance.required', '', { room: room }) : word('insurance.optional', ''), word('insurance.what', ''),
               I.bought > 0 ? word('insurance.bought', '', { cost: I.bought }) : word('insurance.cost', '', { cost: I.cost })];
      return h('div', { class: 'cb-crewrow', role: 'group', aria: { label: T('show', 'insurance') } }, [D.word(T('show', 'insurance'), 13),
        D.tickThing({ on: !!I.on, text: money(I.bought || I.cost), label: T('show', 'insureL', { cost: money(I.cost) }), fk: 'insure',
                      onClick: function () { var on = !I.on; act(function (x) { return SB.Shows.setInsurance(x, showId, on); }); } }),
        h('p', { class: 'cb-typed cb-small', text: lines.filter(Boolean).join(' ') })]);
    }

    function crewSection(s, v) {
      var floor = v.show.crew.floor;
      return piece('cb-crew', 'white', [
        crewRow(s, v, 'sound', 'sound'),
        crewRow(s, v, 'security', 'security'),
        securityNote(s, v),
        insuranceRow(s, v),
        h('div', { class: 'cb-crewrow' }, [D.word(T('show', 'floor'), 13),
          D.tickThing({ on: floor === 'player', text: T('show', 'you'), label: T('show', 'youWork'), fk: 'floor', onClick: function () { var on = floor !== 'player'; act(function (x) { return SB.Shows.setCrew(x, showId, 'floor', on ? 'player' : null); }); } })])
      ], { label: T('show', 'crew') });
    }

    var undress = dress(root, 'show', st());
    render();
    return { update: function () { keepFocus(root, render); }, unmount: function () { undress(); } };
  }

  /* ================================================================ */
  /* bill: the set list and the sticker sheet                         */
  /* ================================================================ */

  function mountBill(root, params) {
    var showId = params && params.showId, fl = { freeOnly: true, genre: '' }, ctx = { picked: null, ask: null }, preview = null, lastV = null, whatCache = {}, keyHandler,
        lastCall = null, lastGenre = '', firstDraw = true, callFig = null;
    if (root && root.removeAttribute) root.removeAttribute('data-mv-sig');

    function render() { draw(); settle(); }
    /* the papers slap down when the bill first shows; the call is stamped on and counted up when it first shows or changes;
       a different pile tears across the sheet */
    function settle() {
      var F = SB.Finish, el = root.querySelector('.cb-callhero'), sheet = root.querySelector('.cb-sheet'), key, from, d = firstDraw ? 220 : 0;
      slap(root, '.cb-bill .cb-piece', 'bill:' + showId, 2);
      if (F && sheet) F.scrollbar(sheet);
      if (F && sheet && !firstDraw && lastGenre !== fl.genre) F.move(sheet, 'wipe');
      lastGenre = fl.genre;
      if (F && el && callFig) {
        key = callFig.lo + '-' + callFig.hi;
        if (key !== lastCall) {
          from = lastCall ? lastCallFig : { lo: 0, hi: 0 };
          F.move(el, 'stamp', { delay: d, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: el } });
          F.countUp(document.createElement('span'), 100, { from: 0, delay: d + 83, fmt: function (n) { drawCall(el, from.lo + (callFig.lo - from.lo) * n / 100, from.hi + (callFig.hi - from.hi) * n / 100); return ''; } });
          lastCall = key; lastCallFig = callFig;
        }
      }
      firstDraw = false;
    }
    var lastCallFig = null;
    /* the call, in marker, big and crooked, on a highlighter swipe: the one loud thing on the bill */
    function callArt(lo, hi, W) {
      var t = Math.round(lo) + '-' + Math.round(hi);
      return D.art(D.swipe(8, 50, W - 16, 32) + D.marker(t, 18, 66, 50, { seed: 'callhero' + showId }), W, 86);
    }
    function drawCall(el, lo, hi) { var a = el.firstChild; if (a) el.replaceChild(callArt(lo, hi, el.getAttribute('data-w') * 1), a); }
    function callHero(fc) {
      var c = fc && fc.call, W, el;
      if (!c || !num(c.lo) || !num(c.hi) || !(c.hi > 0)) { callFig = null; return null; }
      callFig = { lo: Math.round(c.lo), hi: Math.round(c.hi) };
      W = Math.ceil(D.mw(callFig.lo + '-' + callFig.hi, 50)) + 40;
      el = h('div', { class: 'cb-callhero', role: 'img', aria: { label: SB.text.label('ui.show.call') + ' ' + callFig.lo + '-' + callFig.hi }, data: { w: String(W) } }, callArt(callFig.lo, callFig.hi, W));
      return el;
    }

    function draw() {
      var s = st(), v, show;
      SB.UI.clear(root);
      whatCache = {};
      if (!s || !showId || !s.shows || !s.shows[showId]) { root.appendChild(C().Empty({})); return; }
      v = safe(function () { return SB.Shows.view(s, showId); }, null);
      if (!v) { root.appendChild(C().Empty({})); return; }
      lastV = v; show = v.show;
      ctx.ask = LIVE[show.status] ? function (bandId, slot) { ctx.picked = null; askBand(st(), bandId, slot, false); } : null;
      root.appendChild(h('div', { class: 'cb-bill' + (ctx.picked ? ' is-picking' : '') }, [
        showHead(s, show, v.room, T('bill', 'back'), function () { SB.UI.go('show', { showId: showId }); }, SB.time.fmt(show.day, 'short')),
        ctx.picked ? piece('cb-hintslip', 'white', [h('p', { class: 'cb-typed', role: 'status', text: T('bill', 'picked', { name: (s.bands[ctx.picked] || {}).name || '' }) })]) : null,
        h('div', { class: 'cb-billcols' }, [sheet(s, v), h('div', { class: 'cb-billnight' }, [projection(s, v), hearBill(s, show), setList(s, v, ctx), billing(s, v)])])
      ]));
    }

    /* the bill as it would sound, in running order: each band's loop twice, one after another */
    function hearBill(s, show) {
      var bands = show.bill.slots.map(function (x) { return s.bands[x.bandId]; }).filter(Boolean);
      return bands.length ? D.listen({ bill: bands, text: T('bill', 'hearBill'), stopText: T('bill', 'listenStop'), label: T('bill', 'hearBillL'), fk: 'hear-bill' }) : null;
    }

    function askBand(s, bandId, slot, confirmList) {
      var fee = safe(function () { return SB.Bands.fee(s, bandId, showId); }, { pay: 'FREE', amount: 0 }) || { pay: 'FREE', amount: 0 }, r;
      var payload = { showId: showId, pay: fee.pay || 'FREE', fee: fee.amount || 0, wantSlot: slot || 'MIDDLE' };
      if (confirmList) payload.confirmList = true;
      r = act(function (x) { return SB.Mail.ask(x, 'BAND_PLAY', bandId, payload); });
      if (r && r.ok === false && r.code === 'CONFIRM_LIST') {
        var flags = safe(function () { return SB.Harm.flags(s, bandId); }, null);
        var close = SB.UI.card(h('div', { class: 'sb-confirm cb-confirm' }, [
          h('h2', { text: T('bill', 'listedTitle') }),
          h('p', { class: 'cb-typed', text: (flags && flags.text) || r.why || '' }),
          h('div', { class: 'cb-row' }, [
            D.act(T('bill', 'listedNo'), T('bill', 'listedNo'), 'ls-no', function () { close(); }),
            D.act(T('bill', 'listedGo'), T('bill', 'listedGo'), 'ls-go', function () { close(); askBand(st(), bandId, slot, true); })
          ])
        ]), { label: T('bill', 'listedTitle') });
      } else if (!r || r.ok === false) render();
    }

    function what(s, id) {
      if (whatCache[id] === undefined) whatCache[id] = safe(function () { return SB.Forecast.what(s, showId, { addBandId: id }); }, null);
      return whatCache[id];
    }

    /* Does a band's sound fit this bill? From public genre affinity only (Config.AFFINITY and the pack's tilt): how much a
     * band of genre g goes for the touring band's sound. The same reading the band makes when asked (Bands judge, bill). */
    function billGenreOf(s, show) {
      var g = null, req;
      show.bill.slots.forEach(function (x) { if (x.role === 'TOURING' && s.bands[x.bandId] && !g) g = s.bands[x.bandId].genre; });
      req = !g && show.requestId && s.requests ? s.requests[show.requestId] : null;
      if (req && req.bandId && s.bands[req.bandId]) g = s.bands[req.bandId].genre;
      return g;
    }
    function fitOf(s, bandGenre, top) {
      var E = SB.Enums, a, p;
      if (!top || !bandGenre) return null;
      if (bandGenre === top) return 'FIT';
      a = SB.Config.AFFINITY[E.GENRE_INDEX[bandGenre]] ? SB.Config.AFFINITY[E.GENRE_INDEX[bandGenre]][E.GENRE_INDEX[top]] : null;
      if (!num(a)) return null;
      p = safe(function () { return SB.Cities.pack(s); }, null);
      ((p && p.tilt) || []).forEach(function (t) { if (t.fan === bandGenre && t.band === top && (t.gen === undefined || t.gen === null)) a += t.d; });
      return a >= 0.7 ? 'FIT' : (a >= 0.45 ? 'STRETCH' : 'WRONG');
    }
    /* a marker tick for fits, a question mark for a stretch, a cross-hatch for the wrong bill, with the word typed beside it */
    function fitArt(fit, x, y) {
      var k = K(), ink = D.blue(), out = '', i;
      if (fit === 'FIT') out += k.path([[x + 1, y + 9], [x + 6, y + 15], [x + 16, y + 1]], { seed: 'fit', sw: 3.2, stroke: ink, wob: 0.5, cap: 'square' });
      else if (fit === 'STRETCH') out += D.marker('?', x + 3, y + 15, 18, { fill: ink, seed: 'fitq' });
      else for (i = 0; i < 4; i++) out += k.line(x + i * 4, y + 16, x + i * 4 + 6, y, { seed: 'fh' + i, sw: 1.8, stroke: ink }) + (i < 2 ? k.line(x + i * 8, y, x + i * 8 + 8, y + 16, { seed: 'fv' + i, sw: 1.8, stroke: ink }) : '');
      return out + D.type(T('bill', 'fit.' + fit), x + 22, y + 13, 12, { bold: true, fill: ink });
    }

    var billTop = null;
    function sheet(s, v) {
      var show = v.show, onBill = {}, asks = bandAsks(s, showId), ids, piles = {}, cards, keys, out = [];
      billTop = billGenreOf(s, show);
      show.bill.slots.forEach(function (x) { onBill[x.bandId] = true; });
      ids = safe(function () { return SB.Bands.list(s, fl.freeOnly ? { local: true, active: true, freeOn: show.day } : { local: true, active: true }); }, []);
      cards = ids.map(function (id) { return safe(function () { return SB.Bands.card(s, id); }, null); }).filter(Boolean);
      cards.forEach(function (c) { (piles[c.genre] = piles[c.genre] || []).push(c); });
      keys = Object.keys(piles).sort();
      out.push(D.word(T('bill', 'cands'), 22, { cls: 'cb-head' }));
      out.push(D.tickThing({ on: fl.freeOnly, text: T('bill', 'freeOnly'), label: T('bill', 'freeOnlyL'), fk: 'free', onClick: function () { fl.freeOnly = !fl.freeOnly; render(); } }));
      if (keys.length > 1) out.push(D.tabs({ label: T('bill', 'allPiles'), items: keys.map(function (g) {
        var name = word('genre.' + g + '.name', g);
        return { text: name, label: fl.genre === g ? T('bill', 'allPiles') : T('bill', 'pileL', { g: name }), on: fl.genre === g, fk: 'pile-' + g, onClick: function () { fl.genre = fl.genre === g ? '' : g; render(); } };
      }), size: 12 }));
      if (!cards.length) out.push(h('p', { class: 'cb-typed cb-hint', text: T('bill', 'noCands') }));
      keys.forEach(function (g) {
        if (fl.genre && fl.genre !== g) return;
        out.push(D.typed(word('genre.' + g + '.name', g).toUpperCase(), 12, { bold: true, cls: 'cb-pilename' }));
        out.push(h('div', { class: 'cb-pile' }, piles[g].map(function (c, i) {
          var el = candidate(s, c, onBill[c.id], asks[c.id], i),
              ear = D.listen({ band: c, text: T('bill', 'listen'), stopText: T('bill', 'listenStop'), label: T('bill', 'listenL', { name: c.name }), fk: 'hear-' + c.id });
          return ear ? h('div', { class: 'cb-candbox' }, [el, ear]) : el;
        })));
      });
      return piece('cb-sheet', 'blue', out, { label: T('bill', 'cands') });
    }

    /* a band's sticker on the sheet: the lifted corner says peel me; under it, what they cost, how soon they answer, what they would add */
    function candidate(s, c, on, ask, i) {
      var rw = safe(function () { return SB.Bands.replyWindow(s, c.id); }, null), fee = safe(function () { return SB.Bands.fee(s, c.id, showId); }, null), w = 200, ht = 112, out = '', peeled = on || (ask && ask.status !== 'NO' && ask.status !== 'SILENT'),
          wv = peeled ? null : what(s, c.id), feeT = fee ? (fee.amount ? money(fee.amount) : word('localPay.' + fee.pay + '.name', lower(fee.pay))) : '?', stg = c.trust && c.trust.stage, el, lab, sh = Math.round(w * 0.42),
          fit = fitOf(s, c.genre, billTop), withOk = !!(wv && wv.call && num(wv.call.hi) && wv.call.hi > 0);
      var sty = c.style && c.style !== c.genre ? word('style.' + c.style + '.name', c.style) : '';
      if (fit) ht += 20;
      if (sty && !peeled) ht += 14;
      if (peeled) {
        /* a blank sticker space outlined in pencil, the unknown typed in pencil (not a web drop zone) */
        out += '<path d="M10 10L' + (w - 11) + ' 9L' + (w - 9) + ' ' + (sh - 8) + 'L9 ' + (sh - 9) + 'Z" fill="none" stroke="#6b6a64" stroke-opacity=".8" stroke-width="1.3" stroke-linejoin="round"/>';
        out += D.type(on ? T('bill', 'onBill').toUpperCase() : (ask.status === 'COUNTER' ? '$?' : T('show', 'nobody')), w / 2, sh / 2 + 5, on ? 12 : 14, { anchor: 'middle', bold: !!on || ask.status === 'COUNTER', rot: on ? 0 : -1, fill: on ? '#141413' : (ask && ask.status === 'COUNTER' ? D.hot() : '#5a5953') });
        lab = T('bill', 'peeled', { name: c.name, state: on ? T('bill', 'onBill') : (ask.status === 'COUNTER' ? T('bill', 'counter') : T('bill', 'asked')) });
      } else {
        out += '<g transform="rotate(' + ((i % 3) - 1) * 2 + ' 88 37)">' + D.bandSticker(c, w, { peel: true }) + '</g>';
        if (stg === 'TRUSTED' || stg === 'ALLY') out += K().heart(w - 30, 16, 16, { seed: 'th' + c.id, fill: '#141413' });
        if (stg === 'ALLY') out += '<g transform="translate(' + (w - 56) + ' 6)">' + D.mark('DONE', 16) + '</g>';
        else if (stg === 'SOUR') out += K().heart(w - 30, 16, 16, { seed: 'th' + c.id, fill: 'none' }) + K().line(w - 38, 8, w - 22, 24, { seed: 'thx', sw: 2 });
        if (c.listedMembers) out += D.bang(8, 26, 18);
        out += K().paper(4, sh + 4, 94, 26, { seed: 'fe' + c.id, stock: 'manila', sx: 2, sy: 3, burn: 0.3, rot: -3, inner: D.type(feeT.toUpperCase(), 51, sh + 22, 12, { anchor: 'middle', bold: true, maxWidth: 86 }) });
        if (rw) out += D.type(rw.lo + '-' + rw.hi + 'D', 106, sh + 22, 12, { bold: true });
        if (withOk) out += D.head(146, sh + 30, 18, { mode: 'ink', ink: D.blue() }) + D.marker(Math.round(wv.call.lo) + '-' + Math.round(wv.call.hi), 158, sh + 26, 13, { fill: D.blue(), seed: 'wv' + c.id, maxWidth: 40 });
        if (fit) out += fitArt(fit, 8, sh + 36);
        if (sty) out += D.type(sty.toUpperCase(), 8, ht - 5, 12, { bold: true, maxWidth: w - 16 });
        lab = (sty ? sty + '. ' : '') + T('bill', 'pick', { name: c.name, fee: feeT, lo: rw ? rw.lo : '?', hi: rw ? rw.hi : '?', with: withOk ? T('bill', 'withThem', { lo: Math.round(wv.call.lo), hi: Math.round(wv.call.hi) }) : '' }) +
          (fit ? '. ' + T('bill', 'fitL.' + fit) : '') + (c.listedMembers ? '. ' + T('bill', 'listed') : '') + (stg ? '. ' + word('stage.' + stg, lower(stg)) : '');
      }
      el = D.thing({ cls: 'cb-cand' + (peeled ? ' is-peeled' : '') + (ctx.picked === c.id ? ' is-picked' : ''), label: lab, pressed: peeled ? undefined : ctx.picked === c.id, tut: 'bill-cand', tutRef: showId, fk: 'cand-' + c.id, svg: out, w: w, h: peeled ? sh + 4 : ht,
        on: peeled ? { click: function () { SB.UI.go('band', { bandId: c.id }); } } : {
          click: function () { ctx.picked = ctx.picked === c.id ? null : c.id; preview = ctx.picked; render(); var g = root.querySelector('[data-fk="gap-MIDDLE"]') || root.querySelector('[data-fk="gap-OPEN"]'); if (ctx.picked && g) try { g.focus(); } catch (e) { /* fine */ } },
          mouseenter: function () { showPreview(c.id); }, focus: function () { showPreview(c.id); },
          mouseleave: function () { showPreview(ctx.picked); }, blur: function () { showPreview(ctx.picked); } } });
      if (!peeled && ctx.ask) D.draggable(el, { cand: c.id }, function (t, p) { if (ctx.onDrop) ctx.onDrop(t, p); });
      return el;
    }

    function crowdFor(s, v, add) {
      var fc = safe(function () { return SB.Forecast.card(s, showId); }, null) || {}, w = add ? what(s, add) : null;
      return D.crowd({ par: fc.par && fc.par.heads, lo: fc.call && fc.call.lo, hi: fc.call && fc.call.hi, cap: fc.cap || null, even: num(fc.breakEven) ? fc.breakEven : null,
                       add: w && w.call ? { lo: w.call.lo, hi: w.call.hi } : null, per: 11, noCallFig: !!(fc.call && num(fc.call.lo) && num(fc.call.hi) && fc.call.hi > 0) });
    }
    function showPreview(id) {
      var s = st(), box = root.querySelector('.cb-proj-crowd');
      if (!s || !box || !lastV || preview === id) return;
      preview = id;
      SB.UI.clear(box); box.appendChild(crowdFor(s, lastV, id));
    }

    function projection(s, v) {
      var fc = safe(function () { return SB.Forecast.card(s, showId); }, null) || {};
      return piece('cb-proj', 'bone', [
        callHero(fc),
        h('div', { class: 'cb-proj-crowd', aria: { live: 'polite' } }, crowdFor(s, v, preview && !(s.bands[preview] && v.show.bill.slots.some(function (x) { return x.bandId === preview; })) ? preview : null)),
        D.unknowns(fc.call && fc.call.unknowns),
        v.show.deal && v.show.deal.guarantee > 0 && fc.guaranteePace ? D.art(D.stamp(T('bill', 'pace', { w: T('shows', 'pace.' + fc.guaranteePace) }), 4, 4, 13, { rot: -3, ink: fc.guaranteePace === 'OK' ? '#141413' : D.hot() }), D.stampW(T('bill', 'pace', { w: T('shows', 'pace.' + fc.guaranteePace) }), 13) + 14, 36) : null,
        fc.flow && fc.flow.length ? h('ul', { class: 'cb-flow' }, fc.flow.map(function (x) {
          var gl = safe(function () { return SB.Identity.genGlyph(x.gen, 18); }, '');
          return h('li', null, [gl ? D.art('<g style="color:#141413">' + D.place(gl, 0, 0) + '</g>', 18, 18) : null, h('span', { class: 'cb-typed cb-small', text: word('gen.' + ['KIDS', 'MIDDLE', 'OLD'][x.gen] + '.name', '') + ': ' +
            (num(x.arrive) ? T('bill', 'arrive', { t: SB.time.clock(x.arrive) }) : '') + (num(x.leave) ? ', ' + T('bill', 'leave', { t: SB.time.clock(x.leave) }) : '') })]);
        })) : null,
        fc.unknownPairs && fc.unknownPairs.length ? h('p', { class: 'cb-typed cb-small cb-pairs', text: T('bill', 'unknownPairs', {
          list: fc.unknownPairs.map(function (p) { return word('genre.' + p.a + '.name', p.a) + ' + ' + word('genre.' + p.b + '.name', p.b); }).join('; ') }) }) : null
      ]);
    }

    /* the order on the flyer: a bone mock-up, biggest name first; tabs move a name up or down */
    function billing(s, v) {
      var order = (v.billing && v.billing.length ? v.billing : v.bands.map(function (b) { return b.band.id; })).slice(), w = 250, out = '';
      if (order.length && typeof order[0] === 'object') order = order.map(function (x) { return x.bandId || x.id; });
      function move(i, d) { var o = order.slice(), t = o[i]; o[i] = o[i + d]; o[i + d] = t; act(function (x) { return SB.Shows.setBilling(x, showId, o); }); }
      if (!order.length) return null;
      out += D.type(T('bill', 'billing'), w / 2, 18, 10, { anchor: 'middle', bold: true });
      order.forEach(function (id, i) { out += D.marker(String(s.bands[id] ? s.bands[id].name : id).toUpperCase(), w / 2, 50 + i * 34, Math.max(11, 22 - i * 4), { anchor: 'middle', maxWidth: w - 20, seed: 'bl' + i }); });
      return piece('cb-billing', 'bone', [D.art(out, w, 40 + order.length * 34),
        h('div', { class: 'cb-billctl' }, order.map(function (id, i) {
          var name = s.bands[id] ? s.bands[id].name : id;
          return D.tabs({ label: name, items: [
            { text: '^', label: T('bill', 'billUp', { name: name }), tut: 'bill-move', tutRef: showId, fk: 'bu-' + id, disabled: i === 0, onClick: function () { move(i, -1); } },
            { text: 'v', label: T('bill', 'billDown', { name: name }), tut: 'bill-move', tutRef: showId, fk: 'bd-' + id, disabled: i === order.length - 1, onClick: function () { move(i, 1); } }], size: 10 });
        }))], { label: T('bill', 'billing') });
    }

    keyHandler = function (e) { if (e.key === 'Escape' && ctx.picked) { ctx.picked = null; preview = null; e.stopPropagation(); e.preventDefault(); render(); } };
    if (root && typeof root.addEventListener === 'function') root.addEventListener('keydown', keyHandler);
    var undress = dress(root, 'show', st());
    render();
    return { update: function () { keepFocus(root, render); }, unmount: function () { undress(); if (SB.Audio) SB.Audio.stop(); if (root && root.removeEventListener) root.removeEventListener('keydown', keyHandler); } };
  }

  SB.UI.screen('shows', { rail: 'shows', title: 'ui.shows.title', full: false, mount: mountShows });
  SB.UI.screen('show', { rail: 'shows', title: 'ui.show.title', full: false, mount: mountShow });
  SB.UI.screen('bill', { rail: 'shows', title: 'ui.bill.title', full: false, mount: mountBill });
})(SB);
