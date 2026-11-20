/* Scene Booker — ui/screens/week.js (the calendar close-up, 07-desk.md sections 2 and 2b)
 * Picked up, the calendar is this week's page, torn off the pad and lying on the black table, photocopied like the
 * flyers. Seven day columns under a black band, each with a day half and a night half; the hours you have are empty
 * pencil boxes that fill; the day job is a rubber-stamped WORK with a tear-off tab to drop the shift; weather is a toner
 * doodle; the phone is a drawn box you tick to turn it off. Beside the page, on the table, the jobs waiting are a pad of
 * sticky notes with a lifted corner: drag one onto a day half, or tap it and then the day (or Enter, arrows, Enter).
 * While a note is held its window is a strip of highlighter over the days, and a late half shows the heads that won't
 * hear in time, crossed out, before you let go. "The usual" is a rubber stamp. Under the page: the shows coming up,
 * the answers you are waiting on, what is on the phone.
 * One sign per kind of action (2b): a lifted corner drags, a tear-off tab chooses, a drawn box ticks, a label strip
 * opens. Reading matter carries none of them. The city's hot ink is only for what needs the player now.
 * Playing: the days are crossed off as they run and what happened is jotted into each day; a decision arrives as a note
 * slapped on top with its choices as tear-off tabs showing their costs. The tape deck on the desk starts the week; the
 * play loop below is unchanged and also runs while this screen is mounted hidden at the desk (js/desk/scene.js).
 * Reads views, calls actions through SB.UI.act, computes no rule.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.week = {
    title: 'The week',
    weekOf: 'week of {date}',
    weekN: 'week {n}',
    day: 'Day', night: 'Night',
    over: '{n}h over',
    shift: 'work',
    dropShift: 'Tear off the shift',
    dropShiftQ: 'Tear off {dow}\'s shift?',
    dropShiftCost: 'You lose that day\'s pay, {pay}, and get the hours back.',
    dropShiftCostNo: 'You lose that day\'s pay and get the hours back.',
    dropsLeft: '{n} left to drop this month',
    tearIt: 'tear it off', keepIt: 'keep it', tear: 'tear off',
    shiftDropped: 'shift dropped',
    phone: 'Phone off',
    phoneTurnOff: 'Turn the phone off on {dow}',
    phoneTurnOn: 'Turn the phone back on on {dow}',
    queued: '{n} go out tonight',
    queuedCost: 'more than a few: it takes time',
    tray: 'Jobs',
    todo: 'to do',
    late: 'late!!',
    thisWeek: 'this week',
    soon: 'soon',
    later: 'later',
    ifYouWant: 'if you want',
    free: 'people and shows',
    add: 'Add',
    firstWeek: 'drag a note onto a day, or tap a note then a day',
    emptyTray: 'nothing to plan',
    usual: 'the usual',
    usualSay: 'Press the usual: fill the week with the ordinary plan',
    usualLine: 'what the town expects of you. the rest is yours.',
    usualNone: 'Nothing more to add the usual way.',
    usualAsked: 'Asked {name} to do {role}. The ask goes out tonight.',
    picked: 'Holding',
    pickHelp: 'drop it on a day half. arrows + enter work too. esc puts it back.',
    cancel: 'put it back',
    unplan: 'peel it off',
    remove: 'crumple it',
    openShow: 'Open the show',
    showStrip: 'show',
    canHere: 'fits',
    runway: 'coming up',
    noRunway: 'no shows on the way yet',
    nextJob: 'next: {job}, late from {day}',
    waiting: 'waiting on',
    noWaiting: 'nobody owes you an answer',
    overdue: 'taking a while',
    chase: 'chase',
    chaseSay: 'Chase {who}',
    needBy: 'need it by sun',
    needBySay: 'Need it from {who} by Sunday',
    withdraw: 'drop it',
    withdrawSay: 'Withdraw the ask to {who}',
    outbox: 'goes out tonight',
    needsYou: 'on the phone',
    noNeeds: 'nothing needs you',
    phoneStrip: 'phone',
    open: 'Open',
    by: 'by {day}',
    risks: 'heads up',
    logStrip: 'log',
    dayLog: 'What happened on {day}',
    moreLines: '+{n} more',
    closeWeek: 'tear off the week',
    burnt: 'You\'re burnt out. The days are handed over.',
    running: 'the week is running. the tape deck pauses it.',
    replyTitle: 'An answer came back',
    answerNow: 'answer now',
    later2: 'later',
    needByTitle: 'Still waiting',
    keepWaiting: 'keep waiting',
    moveOn: 'move on',
    stageTitle: 'Something changed',
    close: 'got it',
    otherSay: '{n} other bookers have a show this night',
    weather: 'forecast: {w}',
    weatherWas: 'the day\'s weather: {w}',
    weatherCalled: 'the day\'s weather: {w} (the forecast said {f})',
    vetFor: 'check out {band}',
    vetHelp: 'before you answer their request',
    addOne: 'Add {job} for {who}',
    pile: '{n} more',
    owns: 'runs {room}',
    showOn: '{room}, {day}',
    lostHeads: 'late: these won\'t hear in time',
    who: 'who does it',
    me: 'me',
    noteSay: '{job}, {h} hours. {win}',
    halfSay: '{dow} {half}: {used} of {cap} hours',
    likely: 'likely:'
  };

  var STAGES_SHOWN = {};            // stage cards already shown (display memory)
  var LT = {};                      // lettering already drawn (display memory)
  var GRAIN = null;                 // the copier's grit for the page, drawn once
  var HALVES = ['DAY', 'NIGHT'];
  var TONER = '#141413', PENCIL = '#6d6a62';

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function L(key, ctx) { return SB.text.label('ui.week.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return has(key) ? SB.text.label(key) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'week', String(e && e.message)); return fb; } }
  function K() { return SB.DeskKit; }
  function r1(n) { return Math.round(n * 10) / 10; }
  function stock(name) { return K().stock(name); }

  /* ---------------- the paste-up kit, as small pictures in the page ---------------- */

  function svg(w, ht, inner, extra) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + r1(w) + '" height="' + r1(ht) + '" viewBox="0 0 ' + r1(w) + ' ' + r1(ht) +
           '" aria-hidden="true" focusable="false"' + (extra || '') + '>' + inner + '</svg>';
  }
  function pic(w, ht, inner, cls) { return h('span', { class: 'cc-pic' + (cls ? ' ' + cls : ''), aria: { hidden: 'true' }, html: svg(w, ht, inner) }); }
  /** Jagged marker capitals (the flyers' headline hand) as an inline picture. o: { fill, max, say, cls } */
  function mk(text, size, o) {
    o = o || {};
    var t = String(text == null ? '' : text), key = 'm|' + t + '|' + size + '|' + (o.fill || '') + '|' + (o.max || ''), d, k = K(), w, s = size;
    if (!t) return null;
    d = LT[key];
    if (!d) {
      w = k.markerWidth(t, s);
      if (o.max && w > o.max) { s = Math.max(8, s * o.max / w); w = k.markerWidth(t, s); }
      d = LT[key] = svg(w + 10, s * 1.32 + 6, k.marker(t, 5, s + 3, s, { fill: o.fill || TONER, seed: t }));
    }
    return h('span', { class: 'cc-lt' + (o.cls ? ' ' + o.cls : ''), role: o.say === false ? null : 'img', aria: o.say === false ? { hidden: 'true' } : { label: t }, html: d });
  }
  /** Sharpie handwriting (for what is written on notes). */
  function hand(text, size, o) {
    o = o || {};
    var t = String(text == null ? '' : text), key = 'h|' + t + '|' + size + '|' + (o.stroke || '') + '|' + (o.max || ''), d, k = K(), s = size, w;
    if (!t) return null;
    d = LT[key];
    if (!d) {
      w = k.letterWidth(t, s);
      if (o.max && w > o.max) { s = Math.max(7, s * o.max / w); w = k.letterWidth(t, s); }
      d = LT[key] = svg(w + 6, s * 1.45 + 4, k.letter(t, 3, s + 3, s, { stroke: o.stroke || TONER, weight: 1.5 }));
    }
    return h('span', { class: 'cc-lt' + (o.cls ? ' ' + o.cls : ''), role: o.say === false ? null : 'img', aria: o.say === false ? { hidden: 'true' } : { label: t }, html: d });
  }
  /** A scissor-cut outline as a CSS clip-path; torn: the top edge is ripped off the pad. */
  function cut(seed, torn) {
    var r = K().rng('cut' + seed), pts = [], i, n;
    function j(a) { return (r.next() * 2 - 1) * a; }
    if (torn) { n = 22; for (i = 0; i <= n; i++) pts.push(r1(i / n * 100) + '% ' + r1(1 + r.next() * 6) + 'px'); }
    else { pts.push(r1(r.next() * 2) + 'px ' + r1(r.next() * 2) + 'px'); pts.push('calc(55% + ' + r1(j(3)) + 'px) ' + r1(r.next() * 2.5) + 'px'); pts.push('calc(100% - ' + r1(r.next() * 2) + 'px) ' + r1(r.next() * 2) + 'px'); }
    pts.push('calc(100% - ' + r1(r.next() * 2.5) + 'px) 45%');
    pts.push('calc(100% - ' + r1(r.next() * 2) + 'px) calc(100% - ' + r1(r.next() * 2) + 'px)');
    pts.push('calc(40% + ' + r1(j(4)) + 'px) calc(100% - ' + r1(r.next() * 3) + 'px)');
    pts.push(r1(r.next() * 2) + 'px calc(100% - ' + r1(r.next() * 2) + 'px)');
    pts.push(r1(r.next() * 2.5) + 'px 55%');
    return 'polygon(' + pts.join(', ') + ')';
  }
  /** The same with the bottom-right corner folded up: the sign that a note can be picked up and moved. */
  function cutEar(seed, ear) {
    var r = K().rng('ear' + seed), e = ear || 15;
    function q(a) { return r1(r.next() * a); }
    return 'polygon(' + q(2) + 'px ' + q(2) + 'px, calc(60% + ' + q(3) + 'px) ' + q(2) + 'px, calc(100% - ' + q(2) + 'px) ' + q(2) + 'px, calc(100% - ' + q(2) + 'px) calc(100% - ' + e + 'px), ' +
           'calc(100% - ' + e + 'px) 100%, calc(35% + ' + q(4) + 'px) calc(100% - ' + q(2) + 'px), ' + q(2) + 'px calc(100% - ' + q(2) + 'px))';
  }
  /** A piece of copy paper behind a thing: the stock, cut; the parent carries the hard paste-up shadow. */
  function sheet(stk, seed, o) {
    o = o || {};
    return h('span', { class: 'cc-paper' + (o.cls ? ' ' + o.cls : ''), aria: { hidden: 'true' },
                       style: { background: o.bg || stock(stk), clipPath: o.ear ? cutEar(seed, o.ear) : cut(seed, o.torn) } });
  }
  /** The lifted corner: the back of the paper turned up. */
  function ear(stk, size) {
    var s = size || 15;
    return pic(s, s, '<path d="M0 0L' + s + ' 0L0 ' + s + 'Z" fill="' + (stk === 'white' ? '#d6d2c6' : '#f4f2ea') + '" stroke="' + TONER + '" stroke-width="1.2" stroke-opacity=".5"/>' +
                             '<path d="M0 0L' + s + ' 0L' + (s * 0.55) + ' ' + (s * 0.55) + 'Z" fill="#000" fill-opacity=".14"/>', 'cc-ear');
  }
  /** The open sign: a label-maker strip, white embossed capitals on black tape. */
  function strip(text, hot) { return h('span', { class: 'cc-strip' + (hot ? ' is-hot' : ''), aria: { hidden: 'true' }, text: String(text).toUpperCase() }); }
  /** The choose sign: a tear-off tab. o: { label, cost, likely, why, disabled, on, n, hot, fk, id, say } */
  function tab(o) {
    var say = (o.n ? o.n + '. ' : '') + (o.say || o.label) + (o.cost ? ', ' + o.cost : '') + (o.likely ? ', ' + L('likely') + ' ' + o.likely : '') + (o.disabled && o.why ? ', ' + o.why : '');
    return h('button', { type: 'button', class: 'cc-tab fx' + (o.hot ? ' is-hot' : '') + (o.on2 ? ' is-on' : '') + (o.cls ? ' ' + o.cls : ''), disabled: !!o.disabled,
                         role: o.role || null, data: { fk: o.fk || null, option: o.id || null, tut: o.tut || null }, title: o.disabled && o.why ? o.why : null,
                         aria: { label: say, checked: o.role === 'radio' ? (o.on2 ? 'true' : 'false') : null },
                         on: { click: function (e) { e.stopPropagation(); if (!o.disabled) o.on(e); } } }, [
      o.n ? h('span', { class: 'cc-tab-n', aria: { hidden: 'true' }, text: String(o.n) }) : null,
      o.lead || null,
      h('span', { class: 'cc-tab-l', text: o.label }),
      o.cost ? h('span', { class: 'cc-tab-cost', text: o.cost }) : null,
      o.likely ? h('span', { class: 'cc-tab-likely', text: L('likely') + ' ' + o.likely }) : null,
      o.disabled && o.why ? h('span', { class: 'cc-tab-why', text: o.why }) : null
    ]);
  }
  function tabsRow(list) { return h('div', { class: 'cc-tabs' }, list.map(function (t, i) { t.n = t.n === false ? null : i + 1; return tab(t); })); }
  /** The tick sign: a drawn box. */
  function boxArt(on, seed, hot) {
    var k = K();
    return k.rect(3, 3, 15, 15, { seed: 'bx' + seed, sw: 2.4, wob: 0.7, over: 1.5, fill: '#f4f2ea' }) +
           (on ? k.path([[5, 10], [10, 17], [22, 1]], { seed: 'bt' + seed, sw: 3.2, stroke: hot || TONER, wob: 0.6 }) : '');
  }
  /** Small black squares for hours on a note. */
  function ticks(n) {
    var out = '', i, c = Math.max(0, Math.round(n || 0));
    for (i = 0; i < c; i++) out += '<rect x="' + (1 + i * 9) + '" y="1" width="7" height="7" fill="' + TONER + '" transform="rotate(' + ((i % 3) - 1) * 4 + ' ' + (4 + i * 9) + ' 4)"/>';
    return c ? h('span', { class: 'cc-ticks', role: 'img', aria: { label: SB.text.label('ui.c.hours', { n: c }) } }, pic(c * 9 + 2, 10, out)) : null;
  }
  /** A head and shoulders, xeroxed: gen 0 solid toner, 1 halftone, 2 open; crossed out in hot ink. */
  function headArt(cx, by, s, gen, crossed, hot) {
    var fill = gen === 0 ? TONER : (gen === 1 ? 'url(#dk-ht3)' : '#f4f2ea'), out;
    out = '<path d="M' + r1(cx - s * 0.9) + ' ' + r1(by) + 'L' + r1(cx - s * 0.78) + ' ' + r1(by - s * 0.55) + 'L' + r1(cx - s * 0.3) + ' ' + r1(by - s * 0.78) + 'L' + r1(cx + s * 0.3) + ' ' + r1(by - s * 0.78) +
          'L' + r1(cx + s * 0.78) + ' ' + r1(by - s * 0.55) + 'L' + r1(cx + s * 0.9) + ' ' + r1(by) + 'Z" fill="' + fill + '" stroke="' + TONER + '" stroke-width="1.4"/>' +
          '<path d="M' + r1(cx - s * 0.36) + ' ' + r1(by - s * 1.0) + 'L' + r1(cx - s * 0.4) + ' ' + r1(by - s * 1.4) + 'L' + r1(cx - s * 0.18) + ' ' + r1(by - s * 1.68) + 'L' + r1(cx + s * 0.2) + ' ' + r1(by - s * 1.68) +
          'L' + r1(cx + s * 0.4) + ' ' + r1(by - s * 1.4) + 'L' + r1(cx + s * 0.34) + ' ' + r1(by - s * 1.0) + 'Z" fill="' + fill + '" stroke="' + TONER + '" stroke-width="1.4"/>';
    if (crossed) out += '<path d="M' + r1(cx - s) + ' ' + r1(by - s * 1.8) + 'L' + r1(cx + s) + ' ' + r1(by) + 'M' + r1(cx + s) + ' ' + r1(by - s * 1.8) + 'L' + r1(cx - s) + ' ' + r1(by) + '" stroke="' + hot + '" stroke-width="2.6"/>';
    return out;
  }
  function weatherArt(w) {
    var k = K(), out = '', i, a;
    switch (w) {
      case 'CLEAR':
        for (i = 0; i < 8; i++) { a = i / 8 * Math.PI * 2; out += k.line(14 + Math.cos(a) * 8, 13 + Math.sin(a) * 8, 14 + Math.cos(a) * 12, 13 + Math.sin(a) * 12, { seed: 'sr' + i, sw: 2, over: .5 }); }
        return out + '<circle cx="14" cy="13" r="5.5" fill="' + TONER + '"/>';
      case 'HEAT':
        out += '<circle cx="14" cy="10" r="6.5" fill="' + TONER + '"/>';
        for (i = 0; i < 2; i++) out += k.path([[4, 20 + i * 4], [9, 17 + i * 4], [14, 20 + i * 4], [19, 17 + i * 4], [24, 20 + i * 4]], { seed: 'hw' + i, sw: 1.8 });
        return out;
      case 'RAIN':
        for (i = 0; i < 4; i++) out += k.line(7 + i * 5, 17, 5 + i * 5, 24, { seed: 'rn' + i, sw: 2, over: .5 });
        return out + '<path d="M3 15L5 9L10 6L15 3L21 6L25 10L24 15Z" fill="url(#dk-ht4)" stroke="' + TONER + '" stroke-width="2"/>';
      case 'COLD':
        for (i = 0; i < 3; i++) { a = i / 3 * Math.PI; out += k.line(14 + Math.cos(a) * 10, 13 + Math.sin(a) * 10, 14 - Math.cos(a) * 10, 13 - Math.sin(a) * 10, { seed: 'sf' + i, sw: 2.2, over: .5 }); }
        return out;
      default:
        return '<path d="M3 18L5 11L10 8L15 5L21 8L25 13L24 18Z" fill="url(#dk-ht2)" stroke="' + TONER + '" stroke-width="2"/>';
    }
  }
  function phoneArt(off, hot) {
    var k = K();
    return boxArt(false, 'ph') + '<rect x="7" y="4" width="9" height="15" fill="' + TONER + '"/><rect x="9" y="6" width="5" height="8" fill="#f4f2ea"/>' +
           (off ? k.line(1, 21, 22, 1, { seed: 'phx', sw: 3, stroke: hot || TONER, over: 1 }) : '');
  }
  function stampArt(text, w, ht, seed, ink) {
    var k = K();
    return '<g opacity=".88">' + k.rect(3, 3, w - 6, ht - 6, { seed: 'st1' + seed, sw: 3.2, stroke: ink || TONER, wob: 1.2 }) +
           k.rect(8, 8, w - 16, ht - 16, { seed: 'st2' + seed, sw: 1.4, stroke: ink || TONER, wob: 1 }) +
           k.marker(text, w / 2, ht / 2 + ht * 0.2, ht * 0.42, { anchor: 'middle', fill: ink || TONER, maxWidth: w - 24, seed: seed }) + '</g>';
  }
  function cityInk(s, i) {
    var p = safe(function () { return SB.Cities.pack(s); }, null), inks = p && p.style && p.style.cityInks;
    return K().ink(inks && inks[i || 0] ? inks[i || 0] : (i ? 'fluorPink' : 'fireRed'));
  }
  function chipText(c) {
    var lab = (SB.Content.ui.c && SB.Content.ui.c.chip && SB.Content.ui.c.chip[c.k] !== undefined) ? SB.Content.ui.c.chip[c.k] : String(c.k || '').toLowerCase(),
        v = c.v, mid = Array.isArray(v) ? (Number(v[0]) + Number(v[1])) / 2 : Number(v), val;
    if (c.k === 'MONEY') val = Array.isArray(v) ? SB.text.money(Math.abs(v[0])) + '-' + SB.text.money(Math.abs(v[1])) : SB.text.money(Math.abs(mid || 0));
    else val = Array.isArray(v) ? v[0] + '-' + v[1] : (num(mid) ? String(Math.abs(Math.round(mid * 10) / 10)) : '?');
    return (mid > 0 ? '+' : (mid < 0 ? '-' : '')) + val + (lab ? ' ' + lab + (c.who ? ' ' + c.who : '') : '');
  }
  /** The copier's grit, laid over the page: the same toner pass the desk and the flyers get, on blank paper. */
  function grain() {
    var c, x, img, d, i, a;
    if (GRAIN !== null) return GRAIN;
    GRAIN = '';
    try {
      if (typeof document === 'undefined' || !document.createElement) return GRAIN;
      c = document.createElement('canvas');
      if (!c || !c.getContext) return GRAIN;
      c.width = 760; c.height = 620;
      x = c.getContext('2d');
      if (!x) return GRAIN;
      x.fillStyle = '#ffffff'; x.fillRect(0, 0, 760, 620);
      if (K().photocopy(x, 760, 620, 'calendar', { streaks: 6 })) {
        /* keep only what the copier added (toner specks, streaks, grit) as dark ink over clear: it lies over paper and table alike */
        img = x.getImageData(0, 0, 760, 620); d = img.data;
        for (i = 0; i < d.length; i += 4) { a = 255 - (d[i] + d[i + 1] + d[i + 2]) / 3; d[i] = 20; d[i + 1] = 20; d[i + 2] = 19; d[i + 3] = a < 4 ? 0 : Math.min(255, a * 1.4); }
        x.putImageData(img, 0, 0);
        GRAIN = c.toDataURL('image/png');
      }
    } catch (e) { GRAIN = ''; }
    return GRAIN;
  }
  /** The kit's shared patterns and filters, once per page (halftone fills and the marker's ragged edge use them). */
  function defsEl() { return h('span', { class: 'cc-defs', aria: { hidden: 'true' }, html: svg(1, 1, K().defs()) }); }
  function grainEl() { var g = grain(); return h('span', { class: 'cc-grain', aria: { hidden: 'true' }, style: g ? { backgroundImage: 'url(' + g + ')' } : null }); }

  function mount(root) {
    var picked = null,                // { jobId, opt, by } or { free: FreeJob } for a note not yet a job
        cur = { dayIdx: 0, half: 'DAY' },
        dropWhy = null,               // { dayIdx, half, text }
        running = false, timer = null, cardOpen = false, seenStop = null, offPlay, offKeys, offResize, alive = true,
        openFolds = {},               // which piles on the pad are fanned open
        drag = null,                  // { el, ghost, x0, y0, on, start() }
        justDragged = false, HOT = TONER;

    function st() { return SB.UI.game(); }
    function act(f) { return SB.UI.act(f); }
    function hidden() { return !!(root && root.closest && root.closest('.dk-loop')); }

    /* ---------------- render ---------------- */

    function render() {
      var s = st(), v, a, key = null, el, sc = null, top = 0;
      if (!alive) return;
      if (hidden()) { SB.UI.clear(root); return; }      // at the desk this screen only keeps the loop running
      if (!s) { SB.UI.clear(root); root.appendChild(C().Empty({})); return; }
      HOT = cityInk(s, 0);
      a = (typeof document !== 'undefined') ? document.activeElement : null;
      if (a && a.getAttribute) key = a.getAttribute('data-fk');
      if (picked && picked.jobId && !(s.jobs && s.jobs[picked.jobId])) picked = null;
      v = safe(function () { return SB.Week.view(s); }, null);
      sc = root.closest ? root.closest('.cu-in') : null;
      if (sc) top = sc.scrollTop;
      SB.UI.clear(root);
      if (!v) { root.appendChild(C().Empty({})); return; }
      root.appendChild(h('div', { class: 'cc-week is-' + String(v.phase).toLowerCase() + (picked ? ' is-picking' : '') + (running ? ' is-running' : ''), style: { '--hot': HOT } }, [
        defsEl(),
        h('div', { class: 'cc-table' }, [page(s, v), pad(s, v)]),
        bottom(s, v)
      ]));
      if (sc) sc.scrollTop = top;
      if (key) {
        el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null);
        if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
      }
    }

    function focusCell() {
      var el = safe(function () { return root.querySelector('[data-fk="cell-' + cur.dayIdx + '-' + cur.half + '"]'); }, null);
      if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
    }

    /* ---------------- the page: its head and the days ---------------- */

    function page(s, v) {
      return h('section', { class: 'cc-page', aria: { label: L('title') } }, [
        sheet('white', 'page' + s.clock.week, { torn: true }),
        grainEl(),
        head(s, v),
        grid(s, v)
      ]);
    }

    function head(s, v) {
      var stop = s.clock.stop, endOfWeek = stop && stop.kind === 'END_OF_WEEK', k = K(), planning = v.phase === 'PLAN' || v.phase === 'PLAY',
          from = s.clock.week * 7, to = from + 6, same = SB.time.month(from) === SB.time.month(to),
          range = SB.time.fmt(from, 'md') + '-' + (same ? SB.time.date(to).d : SB.time.fmt(to, 'md'));
      return h('header', { class: 'cc-head' }, [
        h('h1', { class: 'cc-title' }, [
          h('span', { class: 'cc-weekn', text: L('weekN', { n: s.clock.week + 1 }) }),
          mk(range.toUpperCase(), 40, { say: false }),
          h('span', { class: 'sb-vh', text: SB.time.fmt(from, 'week') })
        ]),
        v.risks && v.risks.length ? h('div', { class: 'cc-risks', role: 'note', aria: { label: L('risks') } }, [
          h('span', { class: 'cc-risks-k' }, [mk('!!', 20, { fill: HOT, say: false }), h('span', { text: L('risks') })]),
          h('ul', null, v.risks.slice(0, 3).map(function (r) { return r.text ? h('li', { text: r.text }) : null; }))
        ]) : null,
        running ? h('p', { class: 'cc-run', text: L('running') }) : null,
        planning && !endOfWeek && !running ? h('div', { class: 'cc-usual' }, [
          h('button', { type: 'button', class: 'cc-stamp fx', data: { fk: 'usual' }, aria: { label: L('usualSay') },
                        on: { click: function (e) { thunk(e.currentTarget); usual(); } } }, [
            pic(124, 104, usualArt(), 'cc-stamp-art')
          ]),
          h('span', { class: 'cc-usual-line', text: L('usualLine') })
        ]) : null,
        endOfWeek && v.phase === 'PLAY' ? tab({ label: L('closeWeek'), hot: true, fk: 'closeweek', tut: 'week-play', cls: 'cc-tab--big', on: closeWeek }) : null
      ]);
    }
    /** The rubber stamp, a xeroxed cut-out, over the impression it leaves. */
    function usualArt() {
      var k = K();
      return '<g transform="rotate(-6 62 70)">' + stampArt(L('usual').toUpperCase(), 116, 44, 'usual', TONER).replace('<g opacity=".88">', '<g opacity=".88" transform="translate(2 54)">') + '</g>' +
             k.cutout([[40, 4], [84, 4], [86, 26], [96, 30], [98, 50], [26, 50], [28, 30], [38, 26]],
                      k.dotsRect(44, 8, 14, 16, 2, { white: true }) + '<rect x="30" y="44" width="64" height="5" fill="#f4f2ea" fill-opacity=".5"/>', { seed: 'stampc', edge: 5 });
    }
    function thunk(el) {
      if (!el || !el.classList || (SB.UI.prefs && SB.UI.prefs.reduced && SB.UI.prefs.reduced())) return;
      el.classList.remove('is-thunk'); void el.offsetWidth; el.classList.add('is-thunk');
    }

    function burnt(s) { return safe(function () { return SB.Game.strip(s).stress.zone === 'BURNT_OUT'; }, false); }
    function cellPos(i, half) { return i * 2 + (half === 'NIGHT' ? 1 : 0); }
    function nowPos(s) { var c = s.clock.cursor || { dayIdx: 0, half: 'DAY' }; return cellPos(c.dayIdx, c.half); }
    function heldId() { return picked ? (picked.jobId || null) : null; }

    function grid(s, v) {
      var win = windowStrip(s);
      return h('div', { class: 'cc-days' + (burnt(s) ? ' is-burnt' : ''), role: 'grid', aria: { label: L('title') }, on: { keydown: gridKey } }, [
        v.days.map(function (d) { return dayBox(s, v, d, win[d.dayIdx]); }),
        burnt(s) ? h('p', { class: 'cc-burnt', text: L('burnt') }) : null
      ]);
    }

    /** The held job's window, day by day (Jobs.window on each day): 'open', 'late' or null. */
    function windowStrip(s) {
      var out = [], id = heldId(), i, w;
      for (i = 0; i < 7; i++) {
        if (!id) { out.push(null); continue; }
        w = safe(function () { return SB.Jobs.window(s, id, s.clock.week * 7 + i); }, null);
        out.push(!w ? null : (w.state === 'OPEN' || w.state === 'CLOSING' ? 'open' : (w.state === 'LATE' ? 'late' : null)));
      }
      if (picked && picked.free) for (i = 0; i < 7; i++) out[i] = 'open';
      return out;
    }

    function dayBox(s, v, d, win) {
      var i = d.dayIdx, play = v.phase === 'PLAY', np = play ? nowPos(s) : -1, gone = play && cellPos(i, 'NIGHT') < np,
          planPhase = (v.phase === 'PLAN' || v.phase === 'PLAY') && !running, real = actualWeather(s, d.day), w = real || d.forecast, k = K(), wt, dow = SB.time.fmt(d.day, 'dow');
      if (w) wt = !real ? L('weather', { w: wword(w) }) : (d.forecast && d.forecast !== real ? L('weatherCalled', { w: wword(real), f: wword(d.forecast) }) : L('weatherWas', { w: wword(real) }));
      return h('div', { class: 'cc-day' + (gone ? ' is-gone' : '') + (d.phoneOff ? ' is-phone-off' : '') + (win ? ' is-win-' + win : '') + (i >= 5 ? ' is-weekend' : ''), role: 'row',
                        aria: { label: dow } }, [
        win ? h('span', { class: 'cc-hl', aria: { hidden: 'true' } }) : null,
        h('div', { class: 'cc-dband', aria: { hidden: 'true' } }, mk(SB.time.fmt(d.day, 'dow3').toUpperCase(), 15, { fill: '#f4f2ea', say: false })),
        h('div', { class: 'cc-dhead' }, [
          mk(String(SB.time.date(d.day).d), 26, { cls: 'cc-date', say: false }),
          h('span', { class: 'sb-vh', text: SB.time.fmt(d.day, 'long') }),
          w ? h('span', { class: 'cc-weather' + (real ? ' is-actual' : ''), role: 'img', title: wt, aria: { label: wt } }, pic(28, 28, weatherArt(w))) : null,
          planPhase ? h('button', { type: 'button', role: 'checkbox', class: 'cc-phone fx' + (d.phoneOff ? ' is-off' : ''), title: L('phone'),
                                    aria: { checked: d.phoneOff ? 'true' : 'false', label: L(d.phoneOff ? 'phoneTurnOn' : 'phoneTurnOff', { dow: dow }) }, data: { fk: 'phone-' + i },
                                    on: { click: function () { act(function (x) { return SB.Week.phoneOff(x, i, !d.phoneOff); }); } } }, pic(24, 24, phoneArt(d.phoneOff)))
                    : (d.phoneOff ? h('span', { class: 'cc-phone is-off', role: 'img', aria: { label: L('phone') } }, pic(24, 24, phoneArt(true))) : null)
        ]),
        HALVES.map(function (half) { return halfBox(s, v, d, half); }),
        play ? jots(s, d) : null,
        gone ? h('span', { class: 'cc-pic cc-gone', aria: { hidden: 'true' }, html: svg(100, 100, k.xout(8, 6, 84, 88, { seed: 'gone' + i, sw: 5 }), ' preserveAspectRatio="none"') }) : null
      ]);
    }

    function actualWeather(s, day) {
      var log = (s.week && s.week.log) || [], i;
      for (i = log.length - 1; i >= 0; i--) if (log[i] && log[i].t === 'DAY_START' && log[i].day === day && log[i].weather) return log[i].weather;
      return null;
    }
    function wword(w) { return word('weather.' + w, String(w).toLowerCase()); }

    /** The pencil boxes: one per hour you have; toner as jobs take them; hatched for the note you hold; hot past the line. */
    function hourBoxes(cap, used, extra) {
      var n = Math.max(cap, used + extra), out = '', i, x, over, fill;
      for (i = 0; i < n; i++) {
        over = i >= cap; x = 2 + i * 17;
        fill = i < used ? (over ? HOT : TONER) : (i < used + extra ? 'url(#dk-hatch)' : '#f4f2ea');
        out += '<rect x="' + x + '" y="2" width="13" height="13" fill="' + fill + '" stroke="' + (over ? HOT : '#3d3b36') + '" stroke-width="' + (over ? 2.2 : 1.6) + '" transform="rotate(' + ((i * 7) % 5 - 2) + ' ' + (x + 6) + ' 8)"/>';
      }
      return pic(Math.max(1, n) * 17 + 4, 17, out, 'cc-hours');
    }

    function halfBox(s, v, d, half) {
      var i = d.dayIdx, items = d.items.filter(function (it) { return it.half === half; }), pos = cellPos(i, half),
          play = v.phase === 'PLAY', np = play ? nowPos(s) : -1, past = play && pos < np, now = play && pos === np,
          isCur = cur.dayIdx === i && cur.half === half, prev = null, why = dropWhy && dropWhy.dayIdx === i && dropWhy.half === half ? dropWhy.text : null,
          cap = d.cap[half], used = d.used[half], shiftOn = d.shift && !d.dropped, bills = !!(s.settings && s.settings.bills),
          planPhase = (v.phase === 'PLAN' || v.phase === 'PLAY') && !running, k = K(), label, extra = 0, held = null;
      if (picked) {
        prev = preview(s, d.day, half);
        held = heldView(s);
        if (isCur && prev && prev.ok && held && num(held.hours)) extra = held.hours;
      }
      label = L('halfSay', { dow: SB.time.fmt(d.day, 'dow'), half: L(half === 'DAY' ? 'day' : 'night').toLowerCase(), used: used, cap: cap }) +
              (shiftOn && half === 'DAY' ? ', ' + L('shift') : '') + (prev ? ', ' + prev.text : '');
      return h('div', { role: 'gridcell', tabindex: isCur ? '0' : '-1', data: { fk: 'cell-' + i + '-' + half, cell: i + '-' + half },
                        class: ['cc-half fx', 'cc-half--' + half.toLowerCase(), past ? 'is-past' : '', now ? 'is-now' : '',
                                isCur && picked ? 'is-cursor' : '', prev ? (prev.ok ? 'is-ok' : 'is-no') : ''],
                        aria: { label: label },
                        on: { click: function (e) { if (picked && !(e.target && e.target.closest && e.target.closest('.cc-tok, .cc-tab, .cc-flyer'))) { cur = { dayIdx: i, half: half }; drop(); } },
                              focus: function () { if (cur.dayIdx !== i || cur.half !== half) cur = { dayIdx: i, half: half }; } } }, [
        h('span', { class: 'cc-half-k', aria: { hidden: 'true' } }, [
          half === 'NIGHT' ? pic(12, 12, '<path d="M9 1L4 2L1 6L2 10L7 12L11 11L7 8L6 4Z" fill="' + TONER + '"/>') : null,
          hourBoxes(cap, used, extra)
        ]),
        shiftOn && half === 'DAY' ? h('div', { class: 'cc-work' }, [
          h('span', { class: 'cc-work-stamp', role: 'img', aria: { label: L('shift') } }, pic(86, 34, stampArt(L('shift').toUpperCase(), 86, 34, 'wk' + i, TONER))),
          bills && planPhase && !past && !now ? h('button', { type: 'button', class: 'cc-tab cc-tab--mini fx', data: { fk: 'tear-' + i },
                                                              aria: { label: L('dropShift') + ', ' + SB.time.fmt(d.day, 'dow') },
                                                              on: { click: function (e) { e.stopPropagation(); askDropShift(s, d); } } }, h('span', { class: 'cc-tab-l', text: L('tear') })) : null
        ]) : null,
        d.dropped && half === 'DAY' ? h('span', { class: 'cc-dropped', text: L('shiftDropped') }) : null,
        half === 'DAY' && (d.town || []).length ? h('div', { class: 'cc-town' }, d.town.map(function (t) { return h('span', { class: 'cc-town-tape', text: t.label }); })) : null,
        half === 'NIGHT' && d.queued > 0 ? h('span', { class: 'cc-queued', title: L('queued', { n: d.queued }) + (num(SB.Config.MAIL && SB.Config.MAIL.freePerDay) && d.queued > SB.Config.MAIL.freePerDay ? ' · ' + L('queuedCost') : ''),
                                   role: 'img', aria: { label: L('queued', { n: d.queued }) } }, [
          pic(24, 18, '<rect x="2" y="2" width="20" height="14" fill="#f4f2ea" stroke="' + TONER + '" stroke-width="2"/><path d="M2 2L12 10L22 2" fill="none" stroke="' + TONER + '" stroke-width="2"/>'),
          h('span', { text: 'x' + d.queued })
        ]) : null,
        half === 'NIGHT' && d.shows.length ? h('div', { class: 'cc-flyers' }, d.shows.map(function (id) { return flyerOn(s, id, 50); })) : null,
        half === 'NIGHT' && d.other && d.other.length ? h('span', { class: 'cc-other', role: 'img', title: L('otherSay', { n: d.other.length }), aria: { label: L('otherSay', { n: d.other.length }) } },
          d.other.slice(0, 3).map(function (o, j) {
            return pic(34, 24, '<rect x="2" y="2" width="30" height="20" fill="#f4f2ea" stroke="' + TONER + '" stroke-width="2"/>' + k.scribble(3, 4, 28, 16, { seed: 'ob' + i + j, sw: 2.6, n: 6 }));
          })) : null,
        h('div', { class: 'cc-toks' }, items.map(function (it) { return token(s, it); })),
        prev && isCur ? previewBubble(s, prev) : null,
        why ? h('p', { class: 'cc-why', text: why }) : null,
        now ? pic(44, 22, k.arrow(2, 11, 40, 11, { seed: 'now' + pos, sw: 3.6, stroke: HOT, head: 10 }), 'cc-now') : null,
        past && !(cellPos(i, 'NIGHT') < np) ? pic(100, 60, k.line(6, 54, 94, 6, { seed: 'p' + pos, sw: 4 }), 'cc-pastx') : null
      ]);
    }

    function flyerOn(s, id, width) {
      var sh = s.shows[id], thumb = null;
      if (!sh) return null;
      if (SB.UI.parts && SB.UI.parts.flyerThumb) thumb = safe(function () { return SB.UI.parts.flyerThumb({ recipe: (sh.flyer && sh.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, id) }, width); }, null);
      return h('button', { type: 'button', class: 'cc-flyer fx', data: { fk: 'show-' + id, tut: 'week-showday', 'tut-ref': id }, aria: { label: L('openShow') + ', ' + SB.time.fmt(sh.day, 'short') },
                           on: { click: function (e) { e.stopPropagation(); SB.UI.go('show', { showId: id }); } } }, [
        h('span', { class: 'cc-flyer-img' }, thumb || C().ShowBadge({ show: sh, size: 20 })),
        h('span', { class: 'cc-flyer-tape', aria: { hidden: 'true' } }),
        strip(L('showStrip'))
      ]);
    }

    function jots(s, d) {
      var recs = ((s.week && s.week.log) || []).filter(function (r) { return inLog(r) && r.day === d.day; }), show = recs.slice(-2), more = recs.length - show.length;
      if (!recs.length) return null;
      return h('div', { class: 'cc-jots' }, [
        show.map(function (r) { return h('p', { class: 'cc-jot', text: recText(r) }); }),
        h('button', { type: 'button', class: 'cc-jot-more fx', data: { fk: 'jot-' + d.dayIdx }, aria: { label: L('dayLog', { day: SB.time.fmt(d.day, 'dow') }) },
                      on: { click: function () { dayLogCard(s, d); } } }, strip(more > 0 ? L('moreLines', { n: more }) : L('logStrip')))
      ]);
    }
    function recText(r) { var t = r.text || ''; if (!t && SB.Content.ui.c && SB.Content.ui.c.rec && SB.Content.ui.c.rec[r.t] !== undefined) t = SB.Content.ui.c.rec[r.t]; return t; }
    function dayLogCard(s, d) {
      var recs = ((s.week && s.week.log) || []).filter(function (r) { return inLog(r) && r.day === d.day; }), close;
      close = SB.UI.card(h('div', { class: 'cc-slap cc-slap--lined', style: { '--hot': HOT } }, [
        mk(SB.time.fmt(d.day, 'dow').toUpperCase(), 26),
        h('ul', { class: 'cc-loglines' }, recs.map(function (r) { return h('li', { text: recText(r) }); })),
        tabsRow([{ label: L('close'), on: function () { close(); } }])
      ]), { label: L('dayLog', { day: SB.time.fmt(d.day, 'dow') }) });
    }

    /** A planned job on a day: a small sticky note with its corner lifted (it can be picked up again). */
    function token(s, it) {
      var jv = safe(function () { return SB.Jobs.get(s, it.jobId); }, null) || { id: it.jobId, label: it.label, window: it.window, riders: [] }, sub, stt, late, el, stk;
      sub = subjectOf(s, jv);
      stt = (it.window && it.window.state) || 'NONE'; late = stt === 'LATE' || stt === 'MISSED';
      stk = it.by && it.by !== 'player' ? 'mint' : 'goldenrod';
      el = h('button', { type: 'button', class: 'cc-tok cc-lift fx' + (heldId() === it.jobId ? ' is-held' : '') + (late ? ' is-late' : ''), data: { fk: 'tok-' + it.jobId, job: it.jobId },
                         aria: { label: L('noteSay', { job: (jv.label || '') + (sub ? ': ' + sub : ''), h: it.hours, win: (it.window && it.window.label) || '' }) },
                         on: { click: function (e) { e.stopPropagation(); if (justDragged || running) return; pick(it.jobId, it.dayIdx, it.half); } } }, [
        sheet(stk, 'tok' + it.jobId, { ear: 10 }), ear(stk, 10),
        hand(jv.label || '', 11, { max: 92, say: false }),
        sub ? h('span', { class: 'cc-tok-who', text: sub }) : null,
        h('span', { class: 'cc-tok-foot' }, [ticks(it.hours), it.by && it.by !== 'player' && it.byName ? h('span', { class: 'cc-tok-by', text: it.byName }) : null]),
        late ? h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: '!!' }) : null
      ]);
      draggable(el, function () { return { jobId: it.jobId }; });
      return el;
    }

    function heldView(s) {
      if (!picked) return null;
      if (picked.free) return { label: picked.free.label, hours: picked.free.hours };
      return safe(function () { return SB.Jobs.get(s, picked.jobId); }, null);
    }

    function preview(s, day, half) {
      var r, w;
      if (picked && picked.free) {
        if (picked.free.half && picked.free.half !== 'ANY' && picked.free.half !== half) return { ok: false, text: SB.text.label('refuse.WRONG_HALF') };
        return { ok: true, text: L('canHere') };
      }
      r = safe(function () { return SB.Jobs.canDo(s, picked.jobId, day, half); }, null);
      if (!r) return null;
      if (!r.ok) return { ok: false, text: (r.why || '') + (r.missingLabel ? ' (' + r.missingLabel + ')' : '') };
      w = safe(function () { return SB.Jobs.window(s, picked.jobId, day); }, null);
      return { ok: true, text: L('canHere') + (w && w.label ? ': ' + w.label : ''), late: !!(w && w.state === 'LATE'), loss: w && w.loss };
    }

    /** Under the cursor while a note is held: fits or not, and when late, the heads that won't hear in time, crossed out. */
    function previewBubble(s, prev) {
      var heads = '', x = 2, g, n, j, pct = [];
      if (prev.ok && Array.isArray(prev.loss)) {
        for (g = 0; g < 3; g++) {
          n = Math.abs(prev.loss[g] || 0) > 0.005 ? Math.min(5, Math.max(1, Math.round(Math.abs(prev.loss[g]) * 20))) : 0;
          for (j = 0; j < n; j++) { heads += headArt(x + 7, 24, 7, g, true, HOT); x += 14; }
          if (n) { x += 6; pct.push(word('gen.' + ['KIDS', 'MIDDLE', 'OLD'][g] + '.short', '') + ' -' + Math.round(Math.abs(prev.loss[g]) * 100) + '%'); }
        }
      }
      return h('div', { class: 'cc-prev' + (prev.ok ? ' is-ok' : ' is-no'), role: 'status' }, [
        h('span', { class: 'cc-prev-text', text: prev.text }),
        heads ? h('div', { class: 'cc-lost', role: 'img', aria: { label: L('lostHeads') + ': ' + pct.join(', ') } }, [
          h('span', { class: 'cc-lost-k', text: L('lostHeads') }), pic(x + 2, 26, heads), h('span', { class: 'cc-lost-n', text: pct.join(' · ') })
        ]) : null
      ]);
    }

    function gridKey(e) {
      var k = e.key, d = cur.dayIdx, half = cur.half;
      if (e.target && e.target.getAttribute && e.target.getAttribute('role') !== 'gridcell') return;
      if (k === 'ArrowRight') d = Math.min(6, d + 1);
      else if (k === 'ArrowLeft') d = Math.max(0, d - 1);
      else if (k === 'ArrowDown') half = 'NIGHT';
      else if (k === 'ArrowUp') half = 'DAY';
      else if ((k === 'Enter' || k === ' ') && picked) { e.preventDefault(); drop(); return; }
      else if (k === 'Escape' && picked) { e.preventDefault(); e.stopPropagation(); cancelPick(); return; }
      else return;
      e.preventDefault();
      cur = { dayIdx: d, half: half };
      render();
      focusCell();
    }

    /* ---------------- picking, dragging and dropping ---------------- */

    function bestCell(s, jobId, half) {
      var i, p, base = s.clock.week * 7;
      for (i = 0; i < 14; i++) {
        p = { dayIdx: Math.floor(i / 2), half: HALVES[i % 2] };
        if (s.clock.phase === 'PLAY' && cellPos(p.dayIdx, p.half) <= nowPos(s)) continue;
        if (jobId && safe(function () { return SB.Jobs.canDo(s, jobId, base + p.dayIdx, p.half).ok; }, false)) return p;
        if (!jobId && (!half || half === 'ANY' || half === p.half)) return p;
      }
      return { dayIdx: 0, half: half === 'NIGHT' ? 'NIGHT' : 'DAY' };
    }

    function pick(jobId, dayIdx, half, quiet) {
      var s = st(), jv = safe(function () { return SB.Jobs.get(s, jobId); }, null);
      if (!jv) return;
      if (picked && picked.jobId === jobId && !quiet && typeof dayIdx !== 'number') { cancelPick(); return; }
      picked = { jobId: jobId, opt: jv.opt ? jv.opt.chosen : undefined, by: (jv.planned && jv.planned.by) || 'player' };
      dropWhy = null;
      cur = typeof dayIdx === 'number' ? { dayIdx: dayIdx, half: half || 'DAY' } : bestCell(s, jobId, jv.half);
      render();
      if (!quiet) focusCell();
    }
    function pickFree(f, quiet) {
      if (picked && picked.free === f && !quiet) { cancelPick(); return; }
      picked = { free: f };
      dropWhy = null;
      cur = bestCell(st(), null, f.half);
      render();
      if (!quiet) focusCell();
    }
    function cancelPick() { var had = !!picked; picked = null; dropWhy = null; render(); if (had) focusCell(); }

    function drop() {
      var s = st(), p = picked, opts = {}, r, jv, id, at = { dayIdx: cur.dayIdx, half: cur.half };
      if (!p) return;
      if (p.free) {
        r = act(function (x) { return SB.Week.addJob(x, p.free.type, p.free.args); });
        if (!r || r.ok === false || !r.jobId) { dropWhy = { dayIdx: at.dayIdx, half: at.half, text: (r && r.why) || '' }; picked = null; render(); return; }
        id = r.jobId;
        p = picked = { jobId: id, by: 'player' };
        s = st();
      }
      jv = safe(function () { return SB.Jobs.get(s, p.jobId); }, null);
      if (jv && jv.opt && p.opt) opts.opt = p.opt;
      if (p.by && p.by !== 'player') opts.by = p.by;
      r = act(function (x) { return SB.Week.plan(x, p.jobId, at.dayIdx, at.half, opts); });
      if (!r) return;
      if (r.ok === false) { dropWhy = { dayIdx: at.dayIdx, half: at.half, text: r.why || '' }; cur = at; render(); focusCell(); return; }
      if (r.answer && r.answer.status === 'NO' && r.answer.text) SB.UI.toast(r.answer.text, 'no');
      picked = null; dropWhy = null; cur = at;
      render();
      focusCell();
    }

    /** Pointer dragging for a note: past a few pixels it becomes a drag; over a day half it previews; let go to drop. */
    function draggable(el, what) {
      el.addEventListener('pointerdown', function (e) {
        if (running || (e.button !== undefined && e.button !== 0) || st().clock.phase === 'CLOSE') return;
        drag = { el: el, x0: e.clientX, y0: e.clientY, on: false, what: what, ghost: null, cell: null };
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp);
        document.addEventListener('pointercancel', onCancel);
      });
    }
    function startDrag(e) {
      var w = drag.what(), r = drag.el.getBoundingClientRect(), g = drag.el.cloneNode(true);
      drag.on = true;
      g.className += ' cc-ghost';
      g.removeAttribute('data-fk');
      g.style.width = r.width + 'px'; g.style.height = r.height + 'px';
      g.style.setProperty('--hot', HOT);
      drag.dx = e.clientX - r.left; drag.dy = e.clientY - r.top;
      document.body.appendChild(g);
      drag.ghost = g;
      moveGhost(e);
      if (w.free) pickFree(w.free, true); else pick(w.jobId, undefined, undefined, true);
    }
    function moveGhost(e) { if (drag && drag.ghost) { drag.ghost.style.left = (e.clientX - drag.dx) + 'px'; drag.ghost.style.top = (e.clientY - drag.dy) + 'px'; } }
    function cellAt(e) {
      var t = null, c;
      if (drag && drag.ghost) drag.ghost.style.display = 'none';
      try { t = document.elementFromPoint(e.clientX, e.clientY); } catch (x) { t = null; }
      if (drag && drag.ghost) drag.ghost.style.display = '';
      c = t && t.closest ? t.closest('[data-cell]') : null;
      return c && root.contains(c) ? c.getAttribute('data-cell') : null;
    }
    function onMove(e) {
      var c, parts;
      if (!drag) return;
      if (!drag.on) { if (Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) < 7) return; startDrag(e); }
      moveGhost(e);
      c = cellAt(e);
      if (c && c !== drag.cell) { drag.cell = c; parts = c.split('-'); cur = { dayIdx: +parts[0], half: parts[1] }; dropWhy = null; render(); }
    }
    function endDrag() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onCancel);
      if (drag && drag.ghost && drag.ghost.parentNode) drag.ghost.parentNode.removeChild(drag.ghost);
    }
    function onUp(e) {
      var was = drag, c;
      endDrag(); drag = null;
      if (!was || !was.on) return;
      justDragged = true; setTimeout(function () { justDragged = false; }, 0);
      c = cellAt(e);
      if (c && picked) { cur = { dayIdx: +c.split('-')[0], half: c.split('-')[1] }; drop(); }
      else { picked = null; dropWhy = null; render(); }
    }
    function onCancel() { var was = drag; endDrag(); drag = null; if (was && was.on) { picked = null; render(); } }

    function promise(jobId, on) { act(function (x) { return SB.Jobs.promise(x, jobId, on); }); }

    function usual() {
      var s = st(), list = safe(function () { return SB.Week.suggest(s); }, []), asks = safe(function () { return SB.Week.suggestAsks ? SB.Week.suggestAsks(s) : []; }, []), n = 0;
      /* lining up sound (and security where the room wants it) is part of the usual: the asks go out with this evening's send */
      asks.forEach(function (a) {
        var r = act(function (x) { return SB.Mail.ask(x, a.kind, a.toId, a.payload); });
        if (r && r.ok !== false) { n++; SB.UI.toast(L('usualAsked', { name: a.name || '', role: a.role }), 'info'); }
      });
      if (!list.length) { if (!n) SB.UI.toast(L('usualNone'), 'info'); return; }
      list.forEach(function (e) {
        var opts = {}, r;
        if (e.opt) opts.opt = e.opt;
        if (e.by && e.by !== 'player') opts.by = e.by;
        r = act(function (x) { return SB.Week.plan(x, e.jobId, e.dayIdx, e.half, opts); });
        if (r && r.ok !== false) n++;
      });
      if (!n) SB.UI.toast(L('usualNone'), 'info');
    }

    /** Tearing off a shift: what it costs is said first, then the tabs. */
    function askDropShift(s, d) {
      var p = safe(function () { return SB.Cities.pack(s); }, null), pay = p && p.money && num(p.money.shiftPay) ? p.money.shiftPay : null,
          left = num(SB.Config.SHIFT_DROPS_PER_MONTH) && s.player ? SB.Config.SHIFT_DROPS_PER_MONTH - (s.player.shiftDrops || 0) : null, close;
      close = SB.UI.card(h('div', { class: 'cc-slap', style: { '--hot': HOT } }, [
        pic(96, 40, stampArt(L('shift').toUpperCase(), 96, 40, 'askwk', TONER), 'cc-slap-doodle'),
        h('h2', { class: 'cc-slap-title' }, mk(L('dropShiftQ', { dow: SB.time.fmt(d.day, 'dow') }).toUpperCase(), 22, { max: 300 })),
        h('p', { class: 'cc-slap-body', text: pay !== null ? L('dropShiftCost', { pay: SB.text.money(pay) }) : L('dropShiftCostNo') }),
        left !== null ? h('p', { class: 'cc-slap-body', text: L('dropsLeft', { n: Math.max(0, left) }) }) : null,
        tabsRow([
          { label: L('tearIt'), cost: pay !== null ? '-' + SB.text.money(pay) : null, on: function () { close(); act(function (x) { return SB.Week.dropShift(x, d.dayIdx); }); } },
          { label: L('keepIt'), on: function () { close(); } }
        ])
      ]), { label: L('dropShift') });
    }

    /* ---------------- the pad of notes, on the table beside the page ---------------- */

    function personLabel(s, pid) {
      var p = s.people && s.people[pid];
      if (!p) return null;
      return p.nick || ((p.first || '') + (p.last ? ' ' + p.last : '')).trim() || null;
    }
    function roomsOf(s, pid) {
      var out = [], k;
      for (k in (s.rooms || {})) if (s.rooms[k] && s.rooms[k].ownerId === pid && s.rooms[k].name) out.push(s.rooms[k].name);
      return out;
    }
    function subject(s, type, args, key) {
      var a = args || {}, id, q, b, o, r, sh, rooms, t, p;
      switch (type) {
        case 'VISIT':
          id = a.personId || key; t = personLabel(s, id);
          if (!t) return null;
          rooms = roomsOf(s, id); p = s.people[id];
          return { id: 'p:' + id, text: t, more: rooms.length ? L('owns', { room: rooms.join(', ') }) : '', prio: !!(a.askId || (p && p.met !== null && p.met !== undefined)) };
        case 'VET_LISTEN': case 'VET_CLIP': case 'VET_HISTORY': case 'VET_ASK_AROUND':
          id = a.requestId || key; q = s.requests && s.requests[id]; b = q && s.bands ? s.bands[q.bandId] : null;
          return b ? { id: 'r:' + id, text: b.name, prio: true, vet: true, band: b } : null;
        case 'HARM_WORD':
          b = s.bands && s.bands[a.bandId || key];
          return b ? { id: 'b:' + b.id, text: b.name, prio: true } : null;
        case 'TOUR_ROUTE': case 'TOUR_ADVANCE':
          o = s.tours && s.tours[a.tourId || key]; b = o && s.bands ? s.bands[o.bandId] : null;
          return o ? { id: 't:' + (a.tourId || key), text: (b && b.name) || o.bandName || '', prio: true } : null;
        case 'GO_TO_SHOW':
          id = a.otherShowId || key;
          (s.otherShows || []).forEach(function (x) { if (x.id === id) o = x; });
          if (!o) return null;
          r = s.rooms && s.rooms[o.roomId];
          return { id: 'o:' + id, text: L('showOn', { room: (r && r.name) || '', day: SB.time.fmt(o.day, 'short') }), prio: false };
        case 'FLYER_RUN':
          sh = s.shows && s.shows[a.showId];
          t = String(a.route || String(key || '').split('#')[0] || '');
          return { id: 'f:' + (a.showId || '') + ':' + t, text: t + (sh ? ', ' + SB.time.fmt(sh.day, 'md') : ''), prio: true };
        default: return null;
      }
    }
    /** Who or what a job is for, in a few words: the subject of a job made by Week.addJob, or its show's night. */
    function subjectOf(s, jv) {
      var job = s.jobs && s.jobs[jv.id], sub, sh;
      if (job && job.free) { sub = subject(s, job.type, job.args, job.key); return sub ? sub.text : null; }
      sh = jv.showId && s.shows ? s.shows[jv.showId] : null;
      if (jv.type === 'FLYER_RUN' && jv.key) { sub = subject(s, 'FLYER_RUN', { showId: jv.showId, route: String(jv.key).split('#')[0] }, jv.key); if (sub) return sub.text; }
      return sh ? SB.time.fmt(sh.day, 'short') : null;
    }

    function pad(s, v) {
      var t = safe(function () { return SB.Jobs.tray(s); }, { late: [], thisWeek: [], soon: [], later: [] }), opt = [], free, rows, now, rest,
          first = s.clock.week === 0 && s.clock.phase === 'PLAN' && !(s.week.plan || []).length, groups = [], any = false, frozen = running || v.phase === 'CLOSE' || v.phase === 'OVER';
      function main(list) { return list.filter(function (j) { if (j.optional) { opt.push(j); return false; } return j.mode === 'HOURS' || !!j.showId; }); }
      var late = main(t.late || []), week = main(t.thisWeek || []), soon = main(t.soon || []), later = main(t.later || []);
      if (late.length) groups.push(group('late', L('late'), late, 'goldenrod', 6, true));
      if (week.length) groups.push(group('thisWeek', L('thisWeek'), week, 'goldenrod', 5));
      if (soon.length) groups.push(group('soon', L('soon'), soon, 'bone', 1));
      if (later.length) groups.push(group('later', L('later'), later, 'white', 0));
      if (opt.length) groups.push(group('opt', L('ifYouWant'), opt, 'pink', 0));
      any = groups.length > 0;
      free = safe(function () { return SB.Jobs.freeJobs(s); }, []);
      rows = freeRows(s, free);
      now = rows.filter(function (r) { return r.prio; });
      rest = rows.filter(function (r) { return !r.prio; });
      return h('aside', { class: 'cc-pad' + (frozen ? ' is-frozen' : ''), aria: { label: L('tray') } }, [
        picked ? held(s) : null,
        first && !picked ? h('p', { class: 'cc-hint' }, [h('span', { class: 'cc-hint-arrow', aria: { hidden: 'true' } }, pic(40, 22, K().arrow(38, 14, 4, 8, { seed: 'hint', sw: 3, stroke: '#f4f2ea', head: 9 }))), L('firstWeek')]) : null,
        groups,
        !any && !rows.length ? h('p', { class: 'cc-empty', text: L('emptyTray') }) : null,
        rows.length ? h('section', { class: 'cc-group cc-group--free' }, [
          h('span', { class: 'cc-group-k', text: L('free') }),
          now.map(freeNote),
          rest.length ? pile('free', rest.length, rest.map(freeNote), 'mint', rest[0].sub && rest[0].sub.text) : null
        ]) : null
      ]);

      /* notes of one kind for one show sit as one note with the rest stacked under it */
      function group(key, title, list, stk, show, hot) {
        var clusters = [], byKey = {}, top, restL;
        list.forEach(function (j) {
          var ck = j.type + '|' + (j.showId || j.id), c = byKey[ck];
          if (!c) { c = byKey[ck] = []; clusters.push(c); }
          c.push(j);
        });
        function one(c) {
          if (c.length === 1) return padNote(s, c[0], stk, 0, hot);
          return h('div', { class: 'cc-cluster' }, [padNote(s, c[0], stk, c.length, hot),
            pile(key + ':' + c[0].type + ':' + (c[0].showId || ''), c.length - 1, c.slice(1).map(function (j) { return padNote(s, j, stk, 0, hot); }), stk, c[1].label)]);
        }
        top = clusters.slice(0, show); restL = clusters.slice(show);
        return h('section', { class: 'cc-group cc-group--' + key }, [
          h('span', { class: 'cc-group-k' + (hot ? ' is-hot' : ''), text: title }),
          top.map(one),
          restL.length ? pile(key, restL.reduce(function (n, c) { return n + c.length; }, 0), restL.map(one), stk, restL[0][0].label) : null
        ]);
      }
    }

    /** A pile of notes squared up: tap its label strip to fan them out (it stays as you left it). */
    function pile(key, n, notes, stk, title) {
      var open = !!openFolds[key];
      return h('div', { class: 'cc-pile' + (open ? ' is-open' : '') }, [
        h('button', { type: 'button', class: 'cc-pile-top fx', aria: { expanded: open ? 'true' : 'false', label: L('pile', { n: n }) }, data: { fk: 'pile-' + key },
                      on: { click: function () { openFolds[key] = !openFolds[key]; render(); } } }, [
          h('span', { class: 'cc-pile-stack', aria: { hidden: 'true' } }, [sheet(stk, 'pl3' + key), sheet(stk, 'pl2' + key), sheet(stk, 'pl1' + key),
            title ? h('span', { class: 'cc-pile-title', text: String(title) }) : null]),
          strip((open ? '- ' : '+ ') + L('pile', { n: n }))
        ]),
        open ? h('div', { class: 'cc-pile-fan' }, notes) : null
      ]);
    }

    function padNote(s, j, stk, stack, hot) {
      var sub = subjectOf(s, j), sh = j.showId && s.shows ? s.shows[j.showId] : null, isHeld = heldId() === j.id, el, stt = (j.window && j.window.state) || 'NONE',
          hours = num(j.hours) ? j.hours : 0, canPlan = j.mode === 'HOURS';
      (j.riders || []).forEach(function (r) { if ((r.status === 'PROMISED' || r.planned) && num(r.hours)) hours += r.hours; });
      el = h('button', { type: 'button', class: 'cc-note fx' + (canPlan ? ' cc-lift' : ' is-show-only') + (isHeld ? ' is-held' : '') + (j.planned ? ' is-planned' : '') + (stack > 1 ? ' is-stacked' : ''),
                         data: { fk: 'note-' + j.id, job: j.id },
                         aria: { label: L('noteSay', { job: (j.label || '') + (sub ? ': ' + sub : ''), h: hours, win: (j.window && j.window.label) || '' }), pressed: isHeld ? 'true' : 'false' },
                         on: { click: function () { if (justDragged) return; if (canPlan) pick(j.id); else if (j.showId) SB.UI.go('show', { showId: j.showId }); } } }, [
        stack > 1 ? h('span', { class: 'cc-under-note', aria: { hidden: 'true' } }, sheet(stk, 'stk' + j.id)) : null,
        sheet(stk, 'n' + j.id, canPlan ? { ear: 14 } : null), canPlan ? ear(stk, 14) : null,
        sh ? h('span', { class: 'cc-note-thumb' }, flyerThumbOnly(s, j.showId, 26)) : null,
        h('span', { class: 'cc-note-txt' }, [
          hand(j.label || '', 13, { max: 150, say: false }),
          sub ? h('span', { class: 'cc-note-who', text: sub }) : null
        ]),
        h('span', { class: 'cc-note-foot' }, [canPlan ? ticks(hours) : strip(L('showStrip')),
          stack > 1 ? h('span', { class: 'cc-note-x', text: 'x' + stack }) : null,
          j.planned ? h('span', { class: 'cc-note-on', text: '> ' + SB.time.fmt(s.clock.week * 7 + j.planned.dayIdx, 'dow3') }) : null,
          j.opt ? h('span', { class: 'cc-note-cash', text: '$' }) : null]),
        stt === 'LATE' || hot ? h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: '!!' }) : null
      ]);
      if (canPlan) draggable(el, function () { return { jobId: j.id }; });
      return el;
    }
    function flyerThumbOnly(s, id, width) {
      var sh = s.shows[id];
      if (!sh || !(SB.UI.parts && SB.UI.parts.flyerThumb)) return null;
      return safe(function () { return SB.UI.parts.flyerThumb({ recipe: (sh.flyer && sh.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, id) }, width); }, null);
    }

    /* Free jobs, one note per person, band, show or route: a band's four checks are small notes on one card. */
    function freeRows(s, free) {
      var rows = [], byId = {};
      free.forEach(function (f, i) {
        var sub = subject(s, f.type, f.args, null), id = sub ? sub.id : 'x:' + f.type + ':' + i, row = byId[id];
        if (!row) { row = byId[id] = { id: id, sub: sub, prio: sub ? !!sub.prio : true, jobs: [] }; rows.push(row); }
        row.jobs.push(f);
      });
      return rows;
    }
    function freeNote(row) {
      var sub = row.sub, who = sub && sub.text;
      if (sub && sub.vet) {
        return h('div', { class: 'cc-vet' }, [
          sheet('blue', 'v' + row.id),
          h('span', { class: 'cc-vet-head' }, [hand(L('vetFor', { band: who }), 13, { max: 210 }), h('span', { class: 'cc-note-who', text: L('vetHelp') })]),
          h('span', { class: 'cc-vet-tabs' }, row.jobs.map(function (f, i) {
            var isHeld = picked && picked.free === f, el = h('button', { type: 'button', class: 'cc-mini cc-lift fx' + (isHeld ? ' is-held' : ''), data: { fk: 'free-' + row.id + '-' + i },
                                    aria: { label: L('addOne', { job: f.label, who: who }) + ', ' + SB.text.label('ui.c.hours', { n: f.hours }), pressed: isHeld ? 'true' : 'false' },
                                    on: { click: function () { if (!justDragged) pickFree(f); } } }, [
              sheet('white', 'vt' + i + row.id, { ear: 9 }), ear('white', 9),
              h('span', { class: 'cc-mini-l', text: f.label }), ticks(f.hours)
            ]);
            draggable(el, function () { return { free: f }; });
            return el;
          }))
        ]);
      }
      return h('div', { class: 'cc-freewrap' }, row.jobs.map(function (f, i) {
        var isHeld = picked && picked.free === f, el = h('button', { type: 'button', class: 'cc-note cc-lift fx' + (isHeld ? ' is-held' : ''), data: { fk: 'free-' + row.id + '-' + i },
                         aria: { label: who ? L('addOne', { job: f.label, who: who }) + ', ' + SB.text.label('ui.c.hours', { n: f.hours }) : L('add') + ' ' + f.label, pressed: isHeld ? 'true' : 'false' },
                         on: { click: function () { if (!justDragged) pickFree(f); } } }, [
          sheet('mint', 'f' + row.id + i, { ear: 14 }), ear('mint', 14),
          h('span', { class: 'cc-note-txt' }, [
            hand(f.label, 12, { max: 150, say: false }),
            who ? h('span', { class: 'cc-note-who', text: who + (sub.more ? ' · ' + sub.more : '') }) : null
          ]),
          h('span', { class: 'cc-note-foot' }, [ticks(f.hours)])
        ]);
        draggable(el, function () { return { free: f }; });
        return el;
      }));
    }

    /** The held note, lifted off the pad: what it is, why, its price tags, who does it, its promises, and the tabs. */
    function held(s) {
      var jv, people, w, day = s.clock.week * 7 + cur.dayIdx, sub, job;
      if (picked.free) {
        return h('section', { class: 'cc-held', role: 'region', aria: { label: L('picked'), live: 'polite' } }, [
          sheet('mint', 'heldf'), h('span', { class: 'cc-held-tape', aria: { hidden: 'true' } }),
          hand(picked.free.label, 16, { max: 220 }),
          ticks(picked.free.hours),
          h('p', { class: 'cc-held-help', text: L('pickHelp') }),
          h('div', { class: 'cc-tabs cc-tabs--held' }, [tab({ label: L('cancel'), fk: 'ptab-put', on: cancelPick })])
        ]);
      }
      jv = safe(function () { return SB.Jobs.get(s, picked.jobId); }, null);
      if (!jv) return null;
      job = s.jobs[jv.id];
      sub = subjectOf(s, jv);
      people = safe(function () { return SB.People.circle(s).people || []; }, []);
      w = safe(function () { return SB.Jobs.window(s, jv.id, day); }, jv.window);
      return h('section', { class: 'cc-held', role: 'region', aria: { label: L('picked') + ': ' + (jv.label || ''), live: 'polite' } }, [
        sheet('goldenrod', 'held'), h('span', { class: 'cc-held-tape', aria: { hidden: 'true' } }),
        h('div', { class: 'cc-held-top' }, [
          jv.showId && s.shows[jv.showId] ? h('span', { class: 'cc-note-thumb' }, flyerThumbOnly(s, jv.showId, 36)) : null,
          h('span', null, [hand(jv.label || '', 17, { max: 200 }), sub ? h('span', { class: 'cc-note-who', text: sub }) : null])
        ]),
        h('div', { class: 'cc-held-row' }, [ticks(jv.hours), w && w.label ? h('span', { class: 'cc-held-win cc-held-win--' + String(w.state || '').toLowerCase(), text: w.label }) : null]),
        jv.why ? h('p', { class: 'cc-held-why', text: jv.why }) : null,
        jv.opt ? h('div', { class: 'cc-tabs cc-tabs--opts', role: 'radiogroup', aria: { label: SB.text.label('ui.c.priced') } }, jv.opt.choices.map(function (c) {
          var on = (picked.opt || jv.opt.chosen) === c.key;
          return tab({ role: 'radio', on2: on, label: c.label || c.key, cost: num(c.cost) && c.cost ? SB.text.money(c.cost) : null, disabled: c.enabled === false, why: c.why || null,
                       on: function () { picked.opt = c.key; render(); } });
        })) : null,
        jv.opt && jv.showId ? h('p', { class: 'cc-held-why' }, C().ExposureLine({ exposure: safe(function () { return SB.Money.exposure(s, jv.showId); }, null) })) : null,
        jv.helperOk ? h('div', { class: 'cc-who' }, [
          h('span', { class: 'cc-who-k', text: L('who') }),
          h('div', { class: 'cc-tabs cc-tabs--who', role: 'radiogroup', aria: { label: L('who') } }, [{ id: 'player', name: L('me') }].concat(people).map(function (x) {
            var on = (picked.by || 'player') === x.id, name = x.name || [x.first, x.last].filter(Boolean).join(' ');
            return tab({ role: 'radio', on2: on, label: name, lead: x.id === 'player' ? null : C().PersonStamp({ person: x, size: 24 }), on: function () { picked.by = x.id; render(); } });
          }))
        ]) : null,
        jv.riders && jv.riders.length ? h('ul', { class: 'cc-promises' }, jv.riders.map(function (r) {
          var on = r.status === 'PROMISED' || r.status === 'DONE' || !!r.planned;
          return h('li', null, [
            h('button', { type: 'button', role: 'checkbox', class: 'cc-tick fx' + (on ? ' is-on' : ''), disabled: r.status === 'DONE', aria: { checked: on ? 'true' : 'false', label: r.label || '' },
                          on: { click: function () { promise(r.id, !on); } } }, [
              pic(24, 22, boxArt(on, 'pb' + r.id)),
              h('span', { class: 'cc-tick-l', text: r.label || '' }),
              num(r.hours) && r.hours ? ticks(r.hours) : null,
              r.cost ? h('span', { class: 'cc-tick-cost', text: r.cost.lo === r.cost.hi ? SB.text.money(r.cost.lo) : SB.text.money(r.cost.lo) + '-' + SB.text.money(r.cost.hi) }) : null
            ]),
            !on && (r.text || r.why) ? h('p', { class: 'cc-tick-why', text: r.text || r.why }) : null
          ]);
        })) : null,
        h('p', { class: 'cc-held-help', text: L('pickHelp') }),
        h('div', { class: 'cc-tabs cc-tabs--held' }, [
          tab({ label: L('cancel'), fk: 'ptab-put', on: cancelPick }),
          jv.planned ? tab({ label: L('unplan'), fk: 'ptab-peel', on: function () {
            var id = picked.jobId, r = act(function (x) { return SB.Week.unplan(x, id); });
            if (r && r.ok !== false) { picked = null; render(); }
          } }) : null,
          job && job.free && jv.status !== 'DONE' ? tab({ label: L('remove'), fk: 'ptab-crumple', on: function () {
            var id = picked.jobId, r = act(function (x) { return SB.Week.removeJob(x, id); });
            if (r && r.ok !== false) { picked = null; render(); }
          } }) : null
        ])
      ]);
    }

    /* ---------------- under the page, on the table: coming up, waiting on, the phone ---------------- */

    function bottom(s, v) {
      return h('div', { class: 'cc-below' }, [runway(s, v), waiting(s), needs(s)]);
    }
    function scrap(cls, stk, seed, title, kids, hot) {
      return h('section', { class: 'cc-scrap ' + cls, aria: { label: title } }, [
        sheet(stk, seed), h('span', { class: 'cc-scrap-tape', aria: { hidden: 'true' } }),
        h('h2', { class: 'cc-scrap-k' + (hot ? ' is-hot' : '') }, (SB.UI.Kit && SB.UI.Kit.label) ? SB.UI.Kit.label(title.toUpperCase(), null, { tag: 'span' }) : mk(title.toUpperCase(), 18, { fill: TONER })), kids
      ]);
    }

    function runway(s, v) {
      var rows = v.runway || [];
      return scrap('cc-runway', 'white', 'runway', L('runway'), rows.length ? h('ul', { class: 'cc-runway-list' }, rows.map(function (r) {
        var gens = r.reach && r.reach.gens, heads = '', g, j, n, x = 2;
        if (gens) for (g = 0; g < 3; g++) {
          n = gens[g] && gens[g].heard ? Math.round(Math.min(1, gens[g].heard.hi || 0) * 4) : 0;
          for (j = 0; j < 4; j++) { heads += j < n ? headArt(x + 5, 18, 5, g, false) : headArt(x + 5, 18, 5, 2, false).replace(/stroke="#141413"/g, 'stroke="#b9b6ad"'); x += 11; }
          x += 6;
        }
        return h('li', { class: 'cc-runway-item' }, [
          flyerOn(s, r.showId, 56),
          h('span', { class: 'cc-runway-txt' }, [
            h('span', { class: 'cc-runway-day', text: r.label }),
            gens ? h('span', { class: 'cc-runway-heads', role: 'img', aria: { label: SB.text.label('ui.c.heard') } }, pic(x, 20, heads)) : null,
            r.next ? h('span', { class: 'cc-runway-next', text: L('nextJob', { job: r.next.text, day: SB.time.fmt(r.next.lateOn, 'short') }) }) : null
          ])
        ]);
      })) : h('p', { class: 'cc-none', text: L('noRunway') }));
    }

    function waiting(s) {
      var list = safe(function () { return SB.Mail.waiting(s); }, []), out = safe(function () { return SB.Mail.outbox(s); }, []), end = s.clock.week * 7 + 6;
      return scrap('cc-waiting', 'bone', 'waiting', L('waiting'), [
        list.length ? h('ul', { class: 'cc-slips' }, list.map(function (a) {
          var who = a.toName || '';
          return h('li', { class: 'cc-slip' + (a.overdue ? ' is-overdue' : '') }, [
            h('span', { class: 'cc-slip-who', text: who }),
            a.what ? h('span', { class: 'cc-slip-what', text: a.what }) : null,
            a.overdue ? h('span', { class: 'cc-slip-late', text: L('overdue') }) : null,
            h('div', { class: 'cc-tabs cc-tabs--slip' }, [
              !a.chased ? tab({ label: L('chase'), say: L('chaseSay', { who: who }), on: function () { act(function (x) { return SB.Mail.chase(x, a.id); }); } }) : null,
              a.needBy == null ? tab({ label: L('needBy'), say: L('needBySay', { who: who }), on: function () { act(function (x) { return SB.Mail.setNeedBy(x, a.id, end); }); } }) : null,
              tab({ label: L('withdraw'), say: L('withdrawSay', { who: who }), on: function () { act(function (x) { return SB.Mail.withdraw(x, a.id); }); } })
            ])
          ]);
        })) : h('p', { class: 'cc-none', text: L('noWaiting') }),
        out.length ? h('div', { class: 'cc-outbox' }, [
          pic(30, 22, '<rect x="2" y="4" width="24" height="16" fill="#f4f2ea" stroke="' + TONER + '" stroke-width="2"/><path d="M2 4L14 13L26 4" fill="none" stroke="' + TONER + '" stroke-width="2"/>'),
          h('span', { class: 'cc-outbox-k', text: L('outbox') }),
          h('ul', null, out.map(function (o) { return h('li', { text: (o.toName || '') + (o.what ? ': ' + o.what : '') }); }))
        ]) : null
      ]);
    }

    function messageFor(s, n) {
      var msgs = (s.mail && s.mail.messages) || [], i, m;
      if (n.k === 'REQUEST' && s.requests && s.requests[n.id]) return s.requests[n.id].messageId || null;
      for (i = msgs.length - 1; i >= 0; i--) {
        m = msgs[i];
        if (!m.refs) continue;
        if ((n.k === 'COUNTER' || n.k === 'NEED_BY') && m.refs.askId === n.id) return m.id;
        if (n.k === 'OFFER' && m.refs.offerId === n.id) return m.id;
      }
      return null;
    }

    function needs(s) {
      var list = safe(function () { return SB.Mail.needsYou(s); }, []);
      return scrap('cc-needs', 'white', 'needs', L('needsYou'), list.length ? h('ul', { class: 'cc-calls' }, list.map(function (n) {
        var mid = messageFor(s, n);
        return h('li', null, h('button', { type: 'button', class: 'cc-call fx', aria: { label: L('open') + ': ' + (n.text || '') + (num(n.by) ? ', ' + L('by', { day: SB.time.fmt(n.by, 'short') }) : '') },
                                           on: { click: function () { SB.UI.go('inbox', mid ? { messageId: mid } : {}); } } }, [
          h('span', { class: 'cc-call-t', text: n.text || L('open') }),
          num(n.by) ? h('span', { class: 'cc-call-by', text: L('by', { day: SB.time.fmt(n.by, 'short') }) }) : null,
          strip(L('phoneStrip'), true)
        ]));
      })) : h('p', { class: 'cc-none', text: L('noNeeds') }), list.length > 0);
    }

    /* ---------------- play: what goes into the day log ---------------- */

    function inLog(r) {
      var homes = (C().LogCard && C().LogCard.homes) || {};
      if (!r || !r.t) return false;
      if (r.t === 'STAGE') return true;
      if (r.t === 'NAME') return r.k === 'IDLE' || r.k === 'BURNOUT' || r.k === 'EVENT';
      if (r.t === 'WORD') return !!r.tierChanged;
      if (r.t === 'STRESS') return !!(r.zoneChanged || r.zoneFrom);
      return homes[r.t] === 'day log';
    }

    /* ---------------- the play loop ---------------- */

    function delay() { var sp = SB.UI.prefs ? SB.UI.prefs.get('speed') : 'normal'; return sp === 'fast' ? 300 : 900; }
    function schedule(ms) { if (timer) clearTimeout(timer); timer = setTimeout(tick, ms); }
    function resume() { if (!alive) return; running = true; picked = null; render(); schedule(0); }
    function pause(tell) { running = false; if (timer) { clearTimeout(timer); timer = null; } if (tell) SB.UI.fire('sb-play', { cmd: 'pause' }); if (alive) render(); }
    function tick() {
      var res;
      timer = null;
      if (!running || !alive) return;
      res = stepOnce();
      if (res === 'go' && running) schedule(delay());
      else if (res === 'stop' || res === 'end') pause(true);
    }
    function stopKey(stop) { return stop ? stop.kind + ':' + (stop.messageId || stop.askId || stop.showId || (stop.decision && stop.decision.id) || '') : null; }

    /** One step of the loop. Returns 'go' (keep going), 'wait' (a card or another screen has it), 'end' or 'stop'. */
    function stepOnce() {
      var s = st(), stop, r, was;
      if (!s || s.clock.phase !== 'PLAY') return 'stop';
      if (cardOpen) return 'wait';
      stop = s.clock.stop;
      if (stop) {
        if (stop.kind === 'END_OF_WEEK') return 'end';
        if (stop.kind === 'DECISION') { openDecision(stop.decision); return 'wait'; }
        if ((stop.kind === 'SHOW_NIGHT' || stop.kind === 'SETTLE') && !showDone(s, stop.showId)) { SB.UI.go('night', { showId: stop.showId }); return 'wait'; }
        if ((stop.kind === 'REPLY' || stop.kind === 'NEED_BY') && seenStop !== stopKey(stop)) { handleStop(stop); return 'wait'; }
      }
      was = guideKey(s);
      r = act(function (x) { return SB.Week.step(x); });
      if (!r || r.ok === false) return 'stop';
      stageCards(r.records || []);
      if (!alive) return 'wait';
      if (r.stop) return handleStop(r.stop);
      /* the guided first show: time stops when there is something new to do, so the next text is read (js/ui/story.js) */
      if (was !== guideKey(st())) return 'stop';
      return 'go';
    }

    /* where the walkthrough stands: its step and what to do inside it; '' when it is off */
    function guideKey(s) {
      var c = safe(function () { return s && s.story && s.story.tutorial && s.story.tutorial.on && SB.Tutorial ? SB.Tutorial.current(s) : null; }, null);
      return c ? c.step + ':' + (c.stage || '') : '';
    }

    function showDone(s, id) { var x = s.shows && s.shows[id]; return !x || x.status === 'PLAYED' || x.status === 'CANCELLED'; }

    function handleStop(stop) {
      var s = st();
      switch (stop.kind) {
        case 'DECISION': openDecision(stop.decision); return 'wait';
        case 'REPLY': seenStop = stopKey(stop); openReply(stop); return 'wait';
        case 'NEED_BY': seenStop = stopKey(stop); openNeedBy(stop); return 'wait';
        case 'SHOW_NIGHT': case 'SETTLE':
          if (!showDone(s, stop.showId)) { SB.UI.go('night', { showId: stop.showId }); return 'wait'; }
          return 'go';
        case 'END_OF_WEEK': return 'end';
        default: return 'go';
      }
    }

    function after() { cardOpen = false; if (!alive) return; render(); if (running) schedule(delay()); }

    /** A decision: a note slapped on top of the page, its choices tear-off tabs with their costs (keys 1 to 4 pick). */
    function openDecision(dec) {
      var close, opts, chosen = false, box;
      if (!dec || cardOpen) return;
      cardOpen = true;
      opts = (dec.options || []).slice(0, 4);
      function choose(o) {
        var r;
        if (chosen || !o || o.enabled === false) return;
        chosen = true;
        close();
        r = act(function (x) { return SB.Week.decide(x, dec.id, o.id); });
        cardOpen = false;
        if (r && r.ok !== false) stageCards(r.records || []);
        if (r && r.stop && r.stop.kind !== 'DECISION' && running) { if (handleStop(r.stop) === 'wait') return; }
        after();
      }
      box = h('div', { class: 'cc-slap cc-slap--decision sb-decision', role: 'group', tabindex: '-1', style: { '--hot': HOT }, aria: { live: 'assertive', label: dec.title || '' },
                       on: { keydown: function (e) { var n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length) { e.preventDefault(); choose(opts[n - 1]); } } } }, [
        h('span', { class: 'cc-hotmark cc-hotmark--big', aria: { hidden: 'true' }, text: '!!' }),
        dec.title ? h('h2', { class: 'cc-slap-title' }, mk(String(dec.title).toUpperCase(), 24, { max: 380 })) : null,
        dec.body ? h('p', { class: 'cc-slap-body', text: dec.body }) : null,
        tabsRow(opts.map(function (o) {
          return { id: o.id, label: o.label || '', cost: (o.costs || []).map(chipText).join(', '), likely: o.likely || null,
                   disabled: o.enabled === false, why: o.why || null, on: function () { choose(o); } };
        }))
      ]);
      close = SB.UI.card(box, { dismiss: false, label: dec.title || '' });
    }

    function openReply(stop) {
      var s = st(), m = safe(function () { return SB.Mail.message(s, stop.messageId); }, null), close;
      cardOpen = true;
      close = SB.UI.card(h('div', { class: 'cc-slap', style: { '--hot': HOT } }, [
        h('h2', { class: 'cc-slap-title' }, mk(L('replyTitle').toUpperCase(), 22)),
        m ? h('div', { class: 'cc-slap-msg' }, C().MessageBody({ message: m })) : null,
        tabsRow([
          { label: L('answerNow'), on: function () { close(); cardOpen = false; SB.UI.go('inbox', { messageId: stop.messageId }); } },
          { label: L('later2'), on: function () { close(); } }
        ])
      ]), { label: L('replyTitle'), onClose: function () { if (cardOpen) after(); } });
    }

    function openNeedBy(stop) {
      var s = st(), a = null, close;
      safe(function () { (SB.Mail.waiting(s) || []).forEach(function (x) { if (x.id === stop.askId) a = x; }); }, null);
      cardOpen = true;
      function done(f) { close(); if (f) act(f); }
      close = SB.UI.card(h('div', { class: 'cc-slap', style: { '--hot': HOT } }, [
        h('h2', { class: 'cc-slap-title' }, mk(L('needByTitle').toUpperCase(), 22)),
        a ? h('p', { class: 'cc-slap-body', text: (a.toName || '') + (a.what ? ': ' + a.what : '') }) : null,
        tabsRow([
          { label: L('keepWaiting'), on: function () { done(function (x) { return SB.Mail.setNeedBy(x, stop.askId, null); }); } },
          a && !a.chased ? { label: L('chase'), on: function () { done(function (x) { return SB.Mail.chase(x, stop.askId); }); } } : null,
          { label: L('moveOn'), on: function () { done(function (x) { return SB.Mail.withdraw(x, stop.askId); }); } }
        ].filter(Boolean))
      ]), { label: L('needByTitle'), onClose: function () { if (cardOpen) after(); } });
    }

    /** STAGE records get their note once (05-interface 3.1); the rest are jotted into the days. */
    function stageCards(recs) {
      recs.forEach(function (r) {
        var key, close;
        if (!r || r.t !== 'STAGE') return;
        key = (r.day || 0) + ':' + (r.stage || '') + ':' + (r.text || '');
        if (STAGES_SHOWN[key]) return;
        STAGES_SHOWN[key] = true;
        close = SB.UI.card(h('div', { class: 'cc-slap cc-slap--stage', style: { '--hot': HOT } }, [
          pic(40, 36, K().heart(20, 18, 30, { seed: 'stg' }), 'cc-slap-doodle'),
          h('h2', { class: 'cc-slap-title' }, mk(L('stageTitle').toUpperCase(), 22)),
          r.text ? h('p', { class: 'cc-slap-body', text: r.text }) : null,
          r.opens && r.opens.length ? h('ul', { class: 'cc-loglines' }, r.opens.map(function (t) { return h('li', { text: t }); })) : null,
          tabsRow([{ label: L('close'), on: function () { close(); } }])
        ]), { label: L('stageTitle') });
      });
    }

    function closeWeek() {
      var r = act(function (x) { return SB.Week.close(x); });
      if (r && r.ok !== false) { pause(true); SB.UI.go('close'); }
    }

    /* ---------------- wiring ---------------- */

    offPlay = SB.UI.on(document, 'sb-play', function (e) {
      var cmd = e && e.detail && e.detail.cmd;
      if (cmd === 'resume') { if (!running) resume(); }
      else if (cmd === 'pause') { if (running) pause(false); }
      else if (cmd === 'next') {
        if (running) pause(true);
        var res = stepOnce();
        if (res === 'end' || res === 'stop') SB.UI.fire('sb-play', { cmd: 'pause' });
        render();
      }
    });
    offKeys = SB.UI.keys({ Escape: function () { if (picked) cancelPick(); } });
    if (typeof window !== 'undefined' && window.addEventListener) {
      var rz = null, onRz = function () { if (rz) clearTimeout(rz); rz = setTimeout(function () { rz = null; if (alive && !hidden()) render(); }, 200); };
      window.addEventListener('resize', onRz);
      offResize = function () { window.removeEventListener('resize', onRz); };
    }

    render();
    (function onMount() {
      var s = st();
      if (!s || s.clock.phase !== 'PLAY') return;
      if (s.clock.stop && s.clock.stop.kind === 'DECISION') { openDecision(s.clock.stop.decision); return; }
      if (SB.UI.playing && SB.UI.playing()) resume();
    })();

    return {
      update: render,
      unmount: function () {
        alive = false; running = false;
        if (timer) { clearTimeout(timer); timer = null; }
        if (drag) { endDrag(); drag = null; }
        if (offPlay) offPlay();
        if (offKeys) offKeys();
        if (offResize) offResize();
      }
    };
  }

  /* the calendar's paste-up hand, shared with the torn-off page (js/ui/screens/close.js loads after this file) */
  SB.UI.calKit = { svg: svg, pic: pic, mk: mk, hand: hand, sheet: sheet, ear: ear, strip: strip, tab: tab, tabsRow: tabsRow, boxArt: boxArt,
                   headArt: headArt, stampArt: stampArt, cityInk: cityInk, chipText: chipText, defsEl: defsEl, grainEl: grainEl, TONER: TONER };

  SB.UI.screen('week', { rail: 'week', title: 'ui.week.title', full: false, mount: mount });
})(SB);
