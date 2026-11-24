/* Scene Booker — ui/screens/week.js (the calendar close-up, 07-desk.md sections 2 and 2b; the night clock, 10-night-clock.md)
 * Picked up, the calendar is this week's page, torn off the pad and lying on the black table, photocopied like the
 * flyers. It is reference now, not a planner: seven day columns under a black band, each with the hours that day has
 * (work 4, off 10, a show night, tired from staying up) as empty pencil boxes that fill as they are spent (SB.Clock),
 * what is due that day, and what got done. The day job is a rubber-stamped WORK with a tear-off tab to drop a coming
 * shift; weather is a toner doodle; the phone is a drawn box you tick to turn it off. Beside the page, on the table, the
 * jobs waiting are a pad of notes, each with what it costs, when it is due (late in hot ink) and a DO IT TONIGHT tab:
 * it is done on the spot and its hours come off tonight's clock. Tap a note for its choices and who does it. Under the
 * page: the shows coming up, the answers you are waiting on, what is on the phone.
 * One sign per kind of action (2b): a tear-off tab chooses or acts, a drawn box ticks, a label strip opens. Reading
 * matter carries none of them. The city's hot ink is only for what needs the player now.
 * Time: the turn is one evening. The engine stops at each evening (E.STOP.EVENING); CALL IT A NIGHT (on the pinned
 * clock, js/ui/nightclock.js: the one place a night is called) is Week.endNight, and the play loop below then plays it out:
 * the show if there is one, the evening send, the next morning, up to the next evening, a decision, a show night or
 * the end of the week. A decision arrives as a note slapped on top with its choices as tear-off tabs showing their
 * costs. The loop also runs while this screen is mounted hidden at the desk (js/desk/scene.js).
 * Reads views, calls actions through SB.UI.act, computes no rule.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.week = {
    title: 'The week',
    weekOf: 'week of {date}',
    weekN: 'week {n}',
    shift: 'work',
    dropShift: 'Tear off the shift',
    dropShiftQ: 'Tear off {dow}\'s shift?',
    dropShiftCost: 'You lose that day\'s pay, {pay}, and get the day back: 10 hours instead of 4.',
    dropShiftCostNo: 'You lose that day\'s pay and get the day back: 10 hours instead of 4.',
    dropsLeft: '{n} left to drop this month',
    tearIt: 'tear it off', keepIt: 'keep it', tear: 'tear off',
    shiftDropped: 'shift dropped',
    phone: 'Phone off',
    phoneTurnOff: 'Turn the phone off on {dow}',
    phoneTurnOn: 'Turn the phone back on on {dow}',
    queued: '{n} go out tonight',
    tray: 'Jobs',
    late: 'late!!',
    thisWeek: 'this week',
    soon: 'soon',
    later: 'later',
    ifYouWant: 'if you want',
    tonightJobs: 'you can do these tonight',
    wholePlan: 'See the whole plan ({n})',
    tonightOnly: 'Just tonight\'s',
    legend: '"late!!" is past its best day. "this week" is best done before Sunday. "soon" can wait a few days. "due thu" is the last good night for it.',
    free: 'people and shows',
    add: 'Add',
    firstWeek: 'do a job tonight, then call it a night',
    emptyTray: 'nothing to do',
    doNow: 'do it tonight',
    doNowSay: 'Do {job} tonight',
    askThem: 'ask {name}',
    has: '{name} has it',
    remove: 'crumple it',
    putBack: 'put it down',
    openShow: 'Open the show',
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
    takeBack: 'take it back',
    takeBackSay: 'Take back the message to {who}',
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
    running: 'the night plays out. the tape deck pauses it.',
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
    addOne: 'Do {job} for {who} tonight',
    pile: '{n} more',
    owns: 'runs {room}',
    showOn: '{room}, {day}',
    who: 'who does it',
    whoHelp: 'asking somebody takes half an hour. they do it tonight.',
    me: 'me',
    effort: 'how sharp',
    effortWord: { ROUGH: 'rough', STANDARD: 'standard', SHARP: 'sharp' },
    stayUp: 'means staying up {n}',
    noteSay: '{job}. {cost}. {due}',
    work: 'work · {h}',
    off: 'off · {h}',
    showDay: 'show night',
    tired: 'tired',
    due: 'due',
    did: 'done',
    heroDays: 'days to go',
    heroDay: 'day to go',
    heroTonight: 'tonight',
    heroSay: '{what}: {room}, {day}'
  };

  var STAGES_SHOWN = {};            // stage cards already shown (display memory)
  var SEEN = { stop: null };        // the reply or need-by stop already shown, across the desk's loop and the calendar's
  var LT = {};                      // lettering already drawn (display memory)
  var GRAIN = null, GRAINRES = 0;   // the copier's grit for the page, drawn once per raster scale
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
  /* the pastel sticky-note names are the copy stock now (css/finish.css --pp-*) */
  var STOCK = { white: 'white', bone: 'buff', canary: 'buff', goldenrod: 'kraft', blue: 'blue', mint: 'green', pink: 'salmon', newsprint: 'news' };
  function stock(name) { return 'var(--pp-' + (STOCK[name] || 'white') + ')'; }

  /* ---------------- the paste-up kit, as small pictures in the page ---------------- */

  /* every picture is drawn in page units and shown in --p (one px of the old 1280 x 800 layout): it keeps its place on the stage */
  function svg(w, ht, inner, extra) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + r1(w) + ' ' + r1(ht) + '" style="' +
           (extra && extra.indexOf('none') >= 0 ? 'width:100%;height:100%' : 'width:calc(var(--p) * ' + r1(w) + ')') + '" aria-hidden="true" focusable="false"' + (extra || '') + '>' + inner + '</svg>';
  }
  function pic(w, ht, inner, cls) { return h('span', { class: 'cc-pic' + (cls ? ' ' + cls : ''), aria: { hidden: 'true' }, html: svg(w, ht, inner, cls === 'cc-pastx' ? ' preserveAspectRatio="none"' : '') }); }
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
  /** A scissor cut or a torn edge, from the shared set (css/finish.css --edge-*); torn: ripped off the pad. The seed picks the cut. */
  function cut(seed, torn) {
    var r = K().rng('cut' + seed);
    return torn ? 'var(--edge-torn-t)' : 'var(--edge-cut-' + (1 + Math.floor(r.next() * 3)) + ')';
  }
  /** The same with the bottom-right corner folded up: the sign that a note can be picked up and moved. */
  function cutEar(seed, ear) {
    var r = K().rng('ear' + seed), e = 'calc(var(--p) * ' + (ear || 15) + ')';
    function q(a) { return 'calc(var(--p) * ' + r1(r.next() * a) + ')'; }
    return 'polygon(' + q(2) + ' ' + q(2) + ', calc(60% + ' + q(3) + ') ' + q(2) + ', calc(100% - ' + q(2) + ') ' + q(2) + ', calc(100% - ' + q(2) + ') calc(100% - ' + e + '), ' +
           'calc(100% - ' + e + ') 100%, calc(35% + ' + q(4) + ') calc(100% - ' + q(2) + '), ' + q(2) + ' calc(100% - ' + q(2) + '))';
  }
  /** A piece of copy paper behind a thing: the stock, cut; the parent carries the hard paste-up shadow. */
  function sheet(stk, seed, o) {
    o = o || {};
    return h('span', { class: 'cc-paper' + (o.cls ? ' ' + o.cls : ''), aria: { hidden: 'true' },
                       style: { '--stk': stock(stk), '--edge': o.ear ? cutEar(seed, o.ear) : cut(seed, o.torn) } });
  }
  /** The lifted corner: the back of the paper turned up. */
  function ear(stk, size) {
    var s = size || 15;
    return pic(s, s, '<path d="M0 0L' + s + ' 0L0 ' + s + 'Z" fill="' + (stk === 'white' ? '#d6d2c6' : '#f4f2ea') + '" stroke="' + TONER + '" stroke-width="1.2" stroke-opacity=".5"/>' +
                             '<path d="M0 0L' + s + ' 0L' + (s * 0.55) + ' ' + (s * 0.55) + 'Z" fill="#000" fill-opacity=".14"/>', 'cc-ear');
  }
  /** The open sign: a label-maker strip, white embossed capitals on black tape. */
  function strip(text, hot) { return h('span', { class: 'cc-strip' + (hot ? ' is-hot' : ''), aria: { hidden: 'true' }, text: String(text).toUpperCase() }); }
  /** The choose sign: a tear-off tab. o: { label, cost, likely, why, note, disabled, on, n, hot, fk, id, say, tut, ref }
   *  cost is what it takes (money, or hours from SB.Clock.cost); why says why it is crossed out; note is a small line under it. */
  function tab(o) {
    var say = (o.n ? o.n + '. ' : '') + (o.say || o.label) + (o.cost ? ', ' + o.cost : '') + (o.likely ? ', ' + o.likely : '') + (o.note ? ', ' + o.note : '') + (o.disabled && o.why ? ', ' + o.why : '');
    return h('button', { type: 'button', class: 'cc-tab pz-hl' + (o.hot ? ' is-hot' : '') + (o.on2 ? ' is-on' : '') + (o.cls ? ' ' + o.cls : ''), disabled: !!o.disabled,
                         role: o.role || null, data: { fk: o.fk || null, option: o.id || null, tut: o.tut || null, 'tut-ref': o.ref || null }, title: o.disabled && o.why ? o.why : null,
                         aria: { label: say, checked: o.role === 'radio' ? (o.on2 ? 'true' : 'false') : null },
                         on: { click: function (e) { e.stopPropagation(); if (!o.disabled) o.on(e); } } }, [
      o.n ? h('span', { class: 'cc-tab-n', aria: { hidden: 'true' }, text: String(o.n) }) : null,
      o.lead || null,
      h('span', { class: 'cc-tab-l', text: o.label }),
      o.cost ? h('span', { class: 'cc-tab-cost', text: o.cost }) : null,
      o.likely ? h('span', { class: 'cc-tab-likely', text: o.likely }) : null,
      o.note ? h('span', { class: 'cc-tab-likely', text: o.note }) : null,
      o.disabled && o.why ? h('span', { class: 'cc-tab-why', text: o.why }) : null,
      h('span', { class: 'cc-tab-foot', aria: { hidden: 'true' } }),
      o.cls && o.cls.indexOf('cc-tab--sign') >= 0 ? h('span', { class: 'cc-tab-tape', aria: { hidden: 'true' } }) : null
    ]);
  }
  function tabsRow(list) { return h('div', { class: 'cc-tabs' }, list.map(function (t, i) { t.n = t.n === false ? null : i + 1; return tab(t); })); }
  /** The tick sign: a drawn box. */
  function boxArt(on, seed, hot) {
    var k = K();
    return k.rect(3, 3, 15, 15, { seed: 'bx' + seed, sw: 2.4, wob: 0.7, over: 1.5, fill: '#f4f2ea' }) +
           (on ? k.path([[5, 10], [10, 17], [22, 1]], { seed: 'bt' + seed, sw: 3.2, stroke: hot || TONER, wob: 0.6 }) : '');
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
    var c, x, img, d, i, a, GR = Math.min(2, SB.Finish && SB.Finish.res ? SB.Finish.res() : 1);
    if (GRAIN !== null && GRAINRES === GR) return GRAIN;
    GRAIN = ''; GRAINRES = GR;
    try {
      if (typeof document === 'undefined' || !document.createElement) return GRAIN;
      c = document.createElement('canvas');
      if (!c || !c.getContext) return GRAIN;
      c.width = Math.round(760 * GR); c.height = Math.round(620 * GR);
      x = c.getContext('2d');
      if (!x) return GRAIN;
      x.fillStyle = '#ffffff'; x.fillRect(0, 0, c.width, c.height);
      if (K().photocopy(x, c.width, c.height, 'calendar', { streaks: 6 })) {
        /* keep only what the copier added (toner specks, streaks, grit) as dark ink over clear: it lies over paper and table alike */
        img = x.getImageData(0, 0, c.width, c.height); d = img.data;
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
    var running = false, timer = null, kickT = null, cardOpen = false, offPlay, offResize, alive = true,
        syncing = false,              // the night is being played out in one go ('next'): nothing else starts the loop meanwhile
        userPaused = false,           // the player paused the play-out on the tape deck: it does not start again by itself
        openFolds = {},               // which piles on the pad are fanned open
        held = null,                  // the note picked up, open on a card: { jobId, box, close, opt, effort, by }
        HOT = TONER;

    function st() { return SB.UI.game(); }
    function act(f) { return SB.UI.act(f); }
    function hidden() { return !!(root && root.closest && root.closest('.dk-loop')); }

    /* ---------------- render ---------------- */

    function render() {
      var s = st(), v, a, key = null, el, sc = null, top = 0;
      if (!alive) return;
      kick();
      if (hidden()) { SB.UI.clear(root); return; }      // at the desk this screen only keeps the loop running
      if (!s) { SB.UI.clear(root); root.appendChild(C().Empty({})); return; }
      HOT = cityInk(s, 0);
      a = (typeof document !== 'undefined') ? document.activeElement : null;
      if (a && a.getAttribute) key = a.getAttribute('data-fk');
      v = safe(function () { return SB.Week.view(s); }, null);
      sc = root.closest ? root.closest('.cu-in') : null;
      if (sc) top = sc.scrollTop;
      SB.UI.clear(root);
      if (!v) { root.appendChild(C().Empty({})); return; }
      root.appendChild(h('div', { class: 'cc-week is-' + String(v.phase).toLowerCase() + (running ? ' is-running' : ''), style: { '--hot': HOT } }, [
        defsEl(),
        h('div', { class: 'cc-table' }, [page(s, v), pad(s, v)]),
        bottom(s, v)
      ]));
      if (sc) sc.scrollTop = top;
      safe(function () { moves(); }, null);
      if (held) safe(function () { fillNote(); }, null);
      if (key) {
        el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null);
        if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
      }
    }

    /* the moves (js/ui/finish.js): the notes and sheets slap down one after another when the pad is new or its list changes, the
       next-show card (or, with no show booked, the week's heading) is stamped on, and the days to go are counted up */
    var lastHero = null, lastDays = 0, padKey = null, titled = false, firstShow = true;
    function moves() {
      var F = SB.Finish, hr, n, sid, list, key, ti, delay0 = firstShow ? 220 : 0;
      if (!F || !root) return;
      hr = root.querySelector('.cc-hero');
      if (hr) {
        n = parseInt(hr.getAttribute('data-n'), 10) || 0; sid = hr.getAttribute('data-sid');
        if (sid !== lastHero) F.move(hr, 'stamp', { delay: delay0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hr } });
        if (sid !== lastHero || n !== lastDays) F.countUp(hr.querySelector('.cc-hero-n'), n, { from: sid === lastHero ? lastDays : 0, delay: delay0 + 83 });
        lastHero = sid; lastDays = n;
      } else lastHero = null;
      ti = root.querySelector('.cc-title.is-hero');
      if (ti && !titled) { F.move(ti, 'stamp', { delay: delay0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: ti } }); titled = true; }
      if (!ti) titled = false;
      list = Array.prototype.slice.call(root.querySelectorAll('.cc-pad .cc-note, .cc-pad .cc-vet, .cc-pad .cc-pile-top, .cc-below .cc-scrap'));
      key = list.map(function (el) { return el.getAttribute('data-fk') || el.className; }).join('|');
      if (key !== padKey) {
        F.stagger(list, firstShow ? 3 : 0);
        list.forEach(function (el) { el.classList.add('mv-slap'); });
        padKey = key;
      }
      firstShow = false;
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

    /** The head: the week, the next show, the heads-up; at the end of the week, the tab that tears the week off.
     *  Tonight's clock and CALL IT A NIGHT are the pinned clock's (js/ui/nightclock.js). */
    function head(s, v) {
      var stop = s.clock.stop, endOfWeek = stop && stop.kind === 'END_OF_WEEK',
          from = s.clock.week * 7, to = from + 6, same = SB.time.month(from) === SB.time.month(to),
          range = SB.time.fmt(from, 'md') + '-' + (same ? SB.time.date(to).d : SB.time.fmt(to, 'md'));
      var nx = nextShow(s);
      return h('header', { class: 'cc-head' }, [
        h('h1', { class: 'cc-title' + (nx ? '' : ' is-hero') }, [
          h('span', { class: 'cc-weekn', text: L('weekN', { n: s.clock.week + 1 }) }),
          mk(range.toUpperCase(), nx ? 34 : 92, { say: false }),
          h('span', { class: 'sb-vh', text: SB.time.fmt(from, 'week') })
        ]),
        nx ? hero(s, nx) : null,
        v.risks && v.risks.length ? h('div', { class: 'cc-risks', role: 'note', aria: { label: L('risks') } }, [
          h('span', { class: 'cc-risks-k' }, [mk('!!', 20, { fill: HOT, say: false }), h('span', { text: L('risks') })]),
          h('ul', null, v.risks.slice(0, 3).map(function (r) { return r.text ? h('li', { text: r.text }) : null; }))
        ]) : null,
        h('div', { class: 'cc-tonight' }, [
          running ? h('p', { class: 'cc-run', text: L('running') }) : null,
          endOfWeek && v.phase === 'PLAY' ? tab({ label: L('closeWeek'), hot: true, fk: 'closeweek', tut: 'week-play', cls: 'cc-tab--big', on: closeWeek }) : null
        ])
      ]);
    }
    /** The next show after today: { show, days } (days 0 is tonight), or null when none is booked. */
    function nextShow(s) {
      var today = s.clock.week * 7 + (s.clock.phase === 'PLAY' && s.clock.cursor ? s.clock.cursor.dayIdx || 0 : 0), best = null, id, sh;
      for (id in (s.shows || {})) {
        sh = s.shows[id];
        if (!sh || sh.cancelled || sh.status === 'PLAYED' || sh.status === 'CANCELLED' || !num(sh.day) || sh.day < today) continue;
        if (!best || sh.day < best.day) best = sh;
      }
      /* the count is SB.Week.daysTo, the one every screen uses (fix-list 2.11) */
      return best ? { show: best, days: (function () { try { return SB.Week.daysTo(s, best.day); } catch (e) { return best.day - today; } })() } : null;
    }
    /** The one loud thing: how many days to the next show, on a torn card stamped on the page. Pressing it opens the show. */
    function hero(s, nx) {
      var sh = nx.show, room = sh.roomId && s.rooms ? s.rooms[sh.roomId] : null, n = nx.days, day = SB.time.fmt(sh.day, 'short'),
          what = n === 0 ? L('heroTonight') : n + ' ' + L(n === 1 ? 'heroDay' : 'heroDays');
      return h('button', { type: 'button', class: 'cc-hero pz-paper pz-hl', data: { fk: 'hero-show', sid: String(sh.id), n: String(n) },
                           aria: { label: L('heroSay', { what: what, room: (room && room.name) || '', day: day }) + '. ' + L('openShow') },
                           on: { click: function () { SB.UI.go('show', { showId: sh.id }); } } }, [
        n === 0 ? null : h('span', { class: 'cc-hero-n', text: String(n) }),
        h('span', { class: 'cc-hero-t', text: n === 0 ? L('heroTonight') : L(n === 1 ? 'heroDay' : 'heroDays') }),
        h('span', { class: 'cc-hero-d', text: day }),
        room && room.name ? h('span', { class: 'cc-hero-r', text: room.name }) : null
      ]);
    }
    function thunk(el) {
      if (!el || !el.classList || !SB.Finish) return;
      SB.Finish.move(el, 'stamp', { cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: el } });
    }

    function burnt(s) { return safe(function () { return SB.Game.strip(s).stress.zone === 'BURNT_OUT'; }, false); }
    function todayOf(s, v) { return v && v.tonight ? v.tonight.day : s.clock.day; }

    function grid(s, v) {
      var dues = dueByDay(s, v), crunchDays = {};
      (v.crunch || []).forEach(function (c) { crunchDays[c.day] = true; });
      return h('div', { class: 'cc-days' + (burnt(s) ? ' is-burnt' : ''), role: 'list', aria: { label: L('title') } }, [
        v.days.map(function (d) { return dayBox(s, v, d, dues[d.day] || [], !!crunchDays[d.day]); }),
        burnt(s) ? h('p', { class: 'cc-burnt', text: L('burnt') }) : null
      ]);
    }

    /** What is due on each day of the page and what got done on it, from the job views of the shows coming up (and one
     *  just played): { day: [{ label, late, done }] }. A late job is written on today. */
    function dueByDay(s, v) {
      var out = {}, today = todayOf(s, v), from = s.clock.week * 7, to = from + 6, seen = {};
      function put(day, it) { if (day >= from && day <= to) (out[day] = out[day] || []).push(it); }
      (v.runway || []).forEach(function (r) {
        (r.jobs || []).forEach(function (j) {
          var job = s.jobs && s.jobs[j.id], w = j.window || {}, d;
          if (!j || seen[j.id] || j.mode !== 'HOURS' || j.optional || j.hidden) return;
          seen[j.id] = true;
          if (j.status === 'DONE') { if (job && num(job.doneDay)) put(job.doneDay, { label: j.label, done: true }); return; }
          if (j.status !== 'TODO') return;
          if (w.state === 'LATE') { put(today, { label: j.label, late: true }); return; }
          d = num(j.due) ? j.due : (num(w.idealUntil) ? w.idealUntil : null);
          if (d !== null) put(d, { label: j.label });
        });
      });
      return out;
    }

    /** A day's clock for the boxes: tonight's own view for today; another day read off the week view (its pool, what
     *  was spent or is taken, the hours stayed up). */
    function dayClock(s, v, d, isToday) {
      var cap, used, over, tired = 0;
      if (isToday && v.tonight) return v.tonight;
      cap = (d.cap.DAY || 0) + (d.cap.NIGHT || 0); used = Math.min(cap, (d.used.DAY || 0) + (d.used.NIGHT || 0)); over = d.over || 0;
      if (s.player && s.player.tired && s.player.tired.day === d.day) tired = s.player.tired.hours || 0;
      return { day: d.day, cap: cap, used: used, spent: used + over, left: Math.max(0, cap - used), reserved: 0, tired: tired,
               stay: { max: over, used: over, left: 0 }, show: d.shows.length > 0, off: !d.shift || d.dropped };
    }
    function dayWord(t) {
      var w = t.show ? L('showDay') : L(t.off ? 'off' : 'work', { h: SB.Clock ? SB.Clock.span(t) : t.cap });
      return w + (t.tired > 0 ? ' · ' + L('tired') : '');
    }

    function dayBox(s, v, d, dues, crunch) {
      var i = d.dayIdx, today = todayOf(s, v), isToday = d.day === today, gone = d.day < today, ahead = d.day > today,
          real = actualWeather(s, d.day), w = real || d.forecast, k = K(), wt, dow = SB.time.fmt(d.day, 'dow'),
          t = dayClock(s, v, d, isToday), shiftOn = d.shift && !d.dropped, bills = !!(s.settings && s.settings.bills), open = v.phase === 'PLAY' && !running;
      if (w) wt = !real ? L('weather', { w: wword(w) }) : (d.forecast && d.forecast !== real ? L('weatherCalled', { w: wword(real), f: wword(d.forecast) }) : L('weatherWas', { w: wword(real) }));
      return h('div', { class: 'cc-day' + (gone ? ' is-gone' : '') + (isToday ? ' is-today' : '') + (crunch ? ' is-crunch' : '') + (d.phoneOff ? ' is-phone-off' : '') + (i >= 5 ? ' is-weekend' : ''),
                        role: 'listitem', data: { fk: 'day-' + i }, aria: { label: dow + ': ' + dayWord(t) + (isToday && SB.Clock ? ', ' + SB.Clock.line(t).toLowerCase() : '') } }, [
        h('div', { class: 'cc-dband', aria: { hidden: 'true' } }, mk(SB.time.fmt(d.day, 'dow3').toUpperCase(), 15, { fill: '#f4f2ea', say: false })),
        h('div', { class: 'cc-dhead' }, [
          mk(String(SB.time.date(d.day).d), 26, { cls: 'cc-date', say: false }),
          h('span', { class: 'sb-vh', text: SB.time.fmt(d.day, 'long') }),
          w ? h('span', { class: 'cc-weather' + (real ? ' is-actual' : ''), role: 'img', title: wt, aria: { label: wt } }, pic(28, 28, weatherArt(w))) : null,
          open && !gone ? h('button', { type: 'button', role: 'checkbox', class: 'cc-phone pz-hl' + (d.phoneOff ? ' is-off' : ''), title: L('phone'),
                                        aria: { checked: d.phoneOff ? 'true' : 'false', label: L(d.phoneOff ? 'phoneTurnOn' : 'phoneTurnOff', { dow: dow }) }, data: { fk: 'phone-' + i },
                                        on: { click: function () { act(function (x) { return SB.Week.phoneOff(x, i, !d.phoneOff); }); } } }, pic(24, 24, phoneArt(d.phoneOff)))
                        : (d.phoneOff ? h('span', { class: 'cc-phone is-off', role: 'img', aria: { label: L('phone') } }, pic(24, 24, phoneArt(true))) : null)
        ]),
        h('div', { class: 'cc-dayhrs', aria: { hidden: 'true' } }, [
          h('span', { class: 'cc-dayword' + (t.show ? ' is-show' : ''), text: dayWord(t) }),
          SB.Clock ? SB.Clock.ruler(t, { hot: HOT, mini: true, say: false }) : null
        ]),
        h('div', { class: 'cc-dbody' }, [
          shiftOn ? h('div', { class: 'cc-work' }, [
            h('span', { class: 'cc-work-stamp', role: 'img', aria: { label: L('shift') } }, pic(86, 34, stampArt(L('shift').toUpperCase(), 86, 34, 'wk' + i, TONER))),
            bills && open && ahead ? h('button', { type: 'button', class: 'cc-tab cc-tab--mini pz-hl', data: { fk: 'tear-' + i },
                                                   aria: { label: L('dropShift') + ', ' + dow },
                                                   on: { click: function (e) { e.stopPropagation(); askDropShift(s, d); } } }, h('span', { class: 'cc-tab-l', text: L('tear') })) : null
          ]) : null,
          d.dropped ? h('span', { class: 'cc-dropped', text: L('shiftDropped') }) : null,
          (d.town || []).length ? h('div', { class: 'cc-town' }, d.town.map(function (x) { return h('span', { class: 'cc-town-tape', text: x.label }); })) : null,
          d.queued > 0 ? h('span', { class: 'cc-queued', role: 'img', title: L('queued', { n: d.queued }), aria: { label: L('queued', { n: d.queued }) } }, [
            pic(24, 18, '<rect x="2" y="2" width="20" height="14" fill="#f4f2ea" stroke="' + TONER + '" stroke-width="2"/><path d="M2 2L12 10L22 2" fill="none" stroke="' + TONER + '" stroke-width="2"/>'),
            h('span', { text: 'x' + d.queued })
          ]) : null,
          d.shows.length ? h('div', { class: 'cc-flyers' }, d.shows.map(function (id) { return flyerOn(s, id, 50); })) : null,
          d.other && d.other.length ? h('span', { class: 'cc-other', role: 'img', title: L('otherSay', { n: d.other.length }), aria: { label: L('otherSay', { n: d.other.length }) } },
            d.other.slice(0, 3).map(function (o, j) {
              return pic(34, 24, '<rect x="2" y="2" width="30" height="20" fill="#f4f2ea" stroke="' + TONER + '" stroke-width="2"/>' + k.scribble(3, 4, 28, 16, { seed: 'ob' + i + j, sw: 2.6, n: 6 }));
            })) : null,
          dues.length ? h('ul', { class: 'cc-dues', aria: { label: L('due') } }, dues.map(function (x) {
            return h('li', { class: 'cc-due' + (x.late ? ' is-late' : '') + (x.done ? ' is-done' : ''), text: x.label + (x.late ? ' !!' : '') });
          })) : null,
          (d.items || []).length ? h('div', { class: 'cc-toks' }, d.items.map(function (it) { return token(s, it); })) : null,
          jots(s, d)
        ]),
        isToday && v.phase === 'PLAY' ? pic(44, 22, k.arrow(2, 11, 40, 11, { seed: 'now' + i, sw: 3.6, stroke: HOT, head: 10 }), 'cc-now') : null,
        gone ? h('span', { class: 'cc-pic cc-gone', aria: { hidden: 'true' }, html: svg(100, 100, k.xout(8, 6, 84, 88, { seed: 'gone' + i, sw: 5 }), ' preserveAspectRatio="none"') }) : null
      ]);
    }

    function actualWeather(s, day) {
      var log = (s.week && s.week.log) || [], i;
      for (i = log.length - 1; i >= 0; i--) if (log[i] && log[i].t === 'DAY_START' && log[i].day === day && log[i].weather) return log[i].weather;
      return null;
    }
    function wword(w) { return word('weather.' + w, String(w).toLowerCase()); }

    function flyerOn(s, id, width) {
      var sh = s.shows[id], thumb = null;
      if (!sh) return null;
      if (SB.UI.parts && SB.UI.parts.flyerThumb) thumb = safe(function () { return SB.UI.parts.flyerThumb({ recipe: (sh.flyer && sh.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, id) }, width); }, null);
      return h('button', { type: 'button', class: 'cc-flyer pz-hl', data: { fk: 'show-' + id, tut: 'week-showday', 'tut-ref': id }, aria: { label: L('openShow') + ', ' + SB.time.fmt(sh.day, 'short') },
                           on: { click: function (e) { e.stopPropagation(); SB.UI.go('show', { showId: id }); } } }, [
        h('span', { class: 'cc-flyer-img' }, thumb || C().ShowBadge({ show: sh, size: 20 }))
      ]);
    }

    function jots(s, d) {
      var recs = ((s.week && s.week.log) || []).filter(function (r) { return inLog(r) && r.day === d.day; }), show = recs.slice(-2), more = recs.length - show.length;
      if (!recs.length) return null;
      return h('div', { class: 'cc-jots' }, [
        show.map(function (r) { return h('p', { class: 'cc-jot', text: recText(r) }); }),
        h('button', { type: 'button', class: 'cc-jot-more pz-hl', data: { fk: 'jot-' + d.dayIdx }, aria: { label: L('dayLog', { day: SB.time.fmt(d.day, 'dow') }) },
                      on: { click: function () { dayLogCard(s, d); } } }, strip(more > 0 ? L('moreLines', { n: more }) : L('logStrip')))
      ]);
    }
    function recText(r) { var t = r.text || ''; if (!t && SB.Content.ui.c && SB.Content.ui.c.rec && SB.Content.ui.c.rec[r.t] !== undefined) t = SB.Content.ui.c.rec[r.t]; return t; }
    function dayLogCard(s, d) {
      var recs = ((s.week && s.week.log) || []).filter(function (r) { return inLog(r) && r.day === d.day; }), close;
      close = SB.UI.card(h('div', { class: 'mv-slap cc-slap cc-slap--lined', style: { '--hot': HOT } }, [
        mk(SB.time.fmt(d.day, 'dow').toUpperCase(), 26),
        h('ul', { class: 'cc-loglines' }, recs.map(function (r) { return h('li', { text: recText(r) }); })),
        tabsRow([{ label: L('close'), on: function () { close(); } }])
      ]), { label: L('dayLog', { day: SB.time.fmt(d.day, 'dow') }) });
    }

    /** A job somebody has on a day (a friend you handed it to, or one pencilled in the old way): a small note, read only. */
    function token(s, it) {
      var jv = safe(function () { return SB.Jobs.get(s, it.jobId); }, null) || { id: it.jobId, label: it.label, window: it.window }, sub = subjectOf(s, jv),
          stt = (it.window && it.window.state) || 'NONE', late = stt === 'LATE' || stt === 'MISSED', stk = it.by && it.by !== 'player' ? 'mint' : 'goldenrod';
      return h('div', { class: 'cc-tok' + (late ? ' is-late' : ''), data: { job: it.jobId }, role: 'note' }, [
        sheet(stk, 'tok' + it.jobId),
        hand(jv.label || '', 11, { max: 92 }),
        sub ? h('span', { class: 'cc-tok-who', text: sub }) : null,
        h('span', { class: 'cc-tok-foot' }, [SB.Clock ? h('span', { class: 'cc-note-cost', text: SB.Clock.cost(it.hours) }) : null,
          it.by && it.by !== 'player' && it.byName ? h('span', { class: 'cc-tok-by', text: L('has', { name: it.byName }) }) : null]),
        late ? h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: '!!' }) : null
      ]);
    }

    function promise(jobId, on) { act(function (x) { return SB.Jobs.promise(x, jobId, on); }); }

    /** Tearing off a shift: what it costs is said first, then the tabs. */
    function askDropShift(s, d) {
      var p = safe(function () { return SB.Cities.pack(s); }, null), pay = p && p.money && num(p.money.shiftPay) ? p.money.shiftPay : null,
          left = num(SB.Config.SHIFT_DROPS_PER_MONTH) && s.player ? SB.Config.SHIFT_DROPS_PER_MONTH - (s.player.shiftDrops || 0) : null, close;
      close = SB.UI.card(h('div', { class: 'mv-slap cc-slap', style: { '--hot': HOT } }, [
        pic(96, 40, stampArt(L('shift').toUpperCase(), 96, 40, 'askwk', TONER), 'cc-slap-doodle'),
        h('h2', { class: 'mv-slap cc-slap-title' }, mk(L('dropShiftQ', { dow: SB.time.fmt(d.day, 'dow') }).toUpperCase(), 22, { max: 300 })),
        h('p', { class: 'mv-slap cc-slap-body', text: pay !== null ? L('dropShiftCost', { pay: SB.text.money(pay) }) : L('dropShiftCostNo') }),
        left !== null ? h('p', { class: 'mv-slap cc-slap-body', text: L('dropsLeft', { n: Math.max(0, left) }) }) : null,
        tabsRow([
          { label: L('tearIt'), cost: pay !== null ? '-' + SB.text.money(pay) : null, on: function () { close(); act(function (x) { return SB.Week.dropShift(x, d.dayIdx); }); } },
          { label: L('keepIt'), on: function () { close(); } }
        ])
      ]), { label: L('dropShift') });
    }

    /* ---------------- doing things tonight ---------------- */

    /** Do a job now (Week.doNow). Refusals are said by SB.UI.act; a friend's no and a late night are said here. */
    function doNow(id, o) {
      var r = act(function (x) { return SB.Week.doNow(x, id, o || {}); });
      if (!r || r.ok === false) return r;
      stageCards(r.records || []);
      if (r.answer && r.answer.text) SB.UI.toast(r.answer.text, r.answer.status === 'NO' ? 'no' : 'info');
      (r.records || []).forEach(function (x) { if (x && x.t === 'OVERTIME' && x.text) SB.UI.toast(x.text, 'info'); });
      return r;
    }
    function canNow(s, id, o) { return safe(function () { return SB.Week.canDoNow(s, id, o || {}); }, null) || { ok: false, why: '' }; }
    function fitsNow(s, hours) { return safe(function () { return SB.Week.fits(s, hours); }, null) || { ok: true }; }
    function msgHours() { return (SB.Config.MAIL && num(SB.Config.MAIL.hours)) ? SB.Config.MAIL.hours : 0.5; }
    function cost(n) { return SB.Clock ? SB.Clock.cost(n) : String(n); }

    /** A free job (a visit, a check on a band...): it becomes a job and is done on the spot; if it cannot be done tonight
     *  the job is taken off again. */
    function doFree(f) {
      var r = act(function (x) { return SB.Week.addJob(x, f.type, f.args); }), id, d;
      if (!r || r.ok === false || !r.jobId) return;
      id = r.jobId;
      d = doNow(id);
      if (!d || d.ok === false) act(function (x) { return SB.Week.removeJob(x, id); });
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
      var t = safe(function () { return SB.Jobs.tray(s); }, { late: [], thisWeek: [], soon: [], later: [] }), opt = [], free, rows, now, rest, tn = v.tonight,
          first = s.clock.week === 0 && tn && tn.open && !(tn.spent > 0), groups = [], any = false, frozen = running || v.phase === 'CLOSE' || v.phase === 'OVER';
      function main(list) { return list.filter(function (j) { if (j.optional) { opt.push(j); return false; } return j.mode === 'HOURS' || !!j.showId; }); }
      var late = main(t.late || []), week = main(t.thisWeek || []), soon = main(t.soon || []), later = main(t.later || []);
      /* the pad opens on tonight (fix-list 1.12 step 5): the 1 to 3 jobs that fit tonight, then "See the whole plan (n)" */
      var all = late.concat(week, soon, later), canNow = !frozen && tn && tn.open ? all.filter(function (j) {
            return j.mode === 'HOURS' && safe(function () { var c = SB.Week.canDoNow(s, j.id); return !!(c && c.ok !== false); }, false); }).slice(0, 3) : [],
          total = all.length + opt.length, brief = !openFolds.__whole && canNow.length > 0 && total > canNow.length;
      if (brief) {
        groups.push(group('tonight', L('tonightJobs'), canNow, 'goldenrod', 3));
        groups.push(h('button', { type: 'button', class: 'cc-whole pz-hl', data: { fk: 'whole-plan' }, aria: { expanded: 'false', label: L('wholePlan', { n: total }) },
                                  on: { click: function () { openFolds.__whole = true; render(); } } }, strip(L('wholePlan', { n: total }))));
      } else {
        if (late.length) groups.push(group('late', L('late'), late, 'goldenrod', 6, true));
        if (week.length) groups.push(group('thisWeek', L('thisWeek'), week, 'goldenrod', 5));
        if (soon.length) groups.push(group('soon', L('soon'), soon, 'bone', 1));
        if (later.length) groups.push(group('later', L('later'), later, 'white', 0));
        if (opt.length) groups.push(group('opt', L('ifYouWant'), opt, 'pink', 0));
        /* one line on the page for what the headings mean */
        if (all.length) groups.push(h('p', { class: 'cc-legend', text: L('legend') }));
        if (openFolds.__whole && canNow.length) groups.push(h('button', { type: 'button', class: 'cc-whole pz-hl', data: { fk: 'tonight-only' }, aria: { expanded: 'true', label: L('tonightOnly') },
                                  on: { click: function () { openFolds.__whole = false; render(); } } }, strip(L('tonightOnly'))));
      }
      any = groups.length > 0;
      var evOn = !!(tn && tn.open && SB.Evening && SB.UI.evening);
      free = safe(function () { return SB.Jobs.freeJobs(s); }, []);
      rows = freeRows(s, free);
      now = rows.filter(function (r) { return r.prio; });
      rest = rows.filter(function (r) { return !r.prio; });
      return h('aside', { class: 'cc-pad' + (frozen ? ' is-frozen' : ''), aria: { label: L('tray') } }, [
        first ? h('p', { class: 'cc-hint' }, [h('span', { class: 'cc-hint-arrow', aria: { hidden: 'true' } }, pic(40, 22, K().arrow(38, 14, 4, 8, { seed: 'hint', sw: 3, stroke: '#f4f2ea', head: 9 }))), L('firstWeek')]) : null,
        groups,
        !any && !rows.length && !evOn ? h('p', { class: 'cc-empty', text: L('emptyTray') }) : null,
        rows.length || evOn ? h('section', { class: 'cc-group cc-group--free' }, [
          h('span', { class: 'cc-group-k', text: L('free') }),
          evOn ? eveningNote(s, tn, frozen) : null,
          now.map(function (r) { return freeNote(s, r, frozen); }),
          rest.length ? pile('free', rest.length, rest.map(function (r) { return freeNote(s, r, frozen); }), 'mint', rest[0].sub && rest[0].sub.text) : null
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
          if (c.length === 1) return padNote(s, c[0], stk, 0, hot, frozen);
          return h('div', { class: 'cc-cluster' }, [padNote(s, c[0], stk, c.length, hot, frozen),
            pile(key + ':' + c[0].type + ':' + (c[0].showId || ''), c.length - 1, c.slice(1).map(function (j) { return padNote(s, j, stk, 0, hot, frozen); }), stk, c[1].label)]);
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
        h('button', { type: 'button', class: 'cc-pile-top pz-hl', aria: { expanded: open ? 'true' : 'false', label: L('pile', { n: n }) }, data: { fk: 'pile-' + key },
                      on: { click: function () { openFolds[key] = !openFolds[key]; render(); } } }, [
          h('span', { class: 'cc-pile-stack', aria: { hidden: 'true' } }, [sheet(stk, 'pl3' + key), sheet(stk, 'pl2' + key), sheet(stk, 'pl1' + key),
            title ? h('span', { class: 'cc-pile-title', text: String(title) }) : null]),
          strip((open ? '- ' : '+ ') + L('pile', { n: n }))
        ]),
        open ? h('div', { class: 'cc-pile-fan' }, notes) : null
      ]);
    }

    /** A job's note: what it is, who for, what it costs and when it is due (late in hot ink); under it the DO IT TONIGHT
     *  tab, or who has it. Tap the note for its choices (js: openNote). A job that is not done with hours opens its show. */
    function padNote(s, j, stk, stack, hot, frozen) {
      var sub = subjectOf(s, j), sh = j.showId && s.shows ? s.shows[j.showId] : null, el, stt = (j.window && j.window.state) || 'NONE',
          hours = num(j.hours) ? j.hours : 0, canDo = j.mode === 'HOURS', due = SB.Clock ? SB.Clock.due(j, { today: s.clock.day }) : null;
      (j.riders || []).forEach(function (r) { if ((r.status === 'PROMISED' || r.planned) && num(r.hours)) hours += r.hours; });
      el = h('button', { type: 'button', class: 'cc-note pz-hl' + (canDo ? '' : ' is-show-only') + (j.planned ? ' is-planned' : '') + (stack > 1 ? ' is-stacked' : ''),
                         data: { fk: 'note-' + j.id, job: j.id },
                         aria: { label: L('noteSay', { job: (j.label || '') + (sub ? ': ' + sub : ''), cost: canDo ? cost(hours) : '', due: due ? due.text.toLowerCase() : ((j.window && j.window.label) || '') }) },
                         on: { click: function () { if (canDo) openNote(j.id); else if (j.showId) SB.UI.go('show', { showId: j.showId }); } } }, [
        stack > 1 ? h('span', { class: 'cc-under-note', aria: { hidden: 'true' } }, sheet(stk, 'stk' + j.id)) : null,
        sheet(stk, 'n' + j.id),
        sh ? h('span', { class: 'cc-note-thumb' }, flyerThumbOnly(s, j.showId, 26)) : null,
        h('span', { class: 'cc-note-txt' }, [
          hand(j.label || '', 13, { max: 150, say: false }),
          sub ? h('span', { class: 'cc-note-who', text: sub }) : null
        ]),
        h('span', { class: 'cc-note-foot' }, [
          canDo && hours ? h('span', { class: 'cc-note-cost', text: cost(hours) }) : null,
          due ? h('span', { class: 'cc-note-due' + (due.late ? ' is-late' : ''), text: due.text }) : null,
          stack > 1 ? h('span', { class: 'cc-note-x', text: 'x' + stack }) : null,
          j.opt ? h('span', { class: 'cc-note-cash', text: '$' }) : null]),
        stt === 'LATE' || hot ? h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: '!!' }) : null
      ]);
      if (!canDo) return el;
      return h('div', { class: 'cc-notewrap' }, [el, nowRow(s, j, frozen)]);
    }
    /* the tab under a note: DO IT TONIGHT with its hours, or why it cannot be done tonight; or who has it */
    function nowRow(s, j, frozen) {
      var by = j.planned && j.planned.by && j.planned.by !== 'player' ? j.planned.by : null, r;
      if (by) return h('p', { class: 'cc-has', text: L('has', { name: (j.planned.byName || personLabel(s, by) || '') }) });
      if (j.status !== 'TODO') return null;
      r = canNow(s, j.id);
      return h('div', { class: 'cc-tabs' }, [tab({
        label: L('doNow'), say: L('doNowSay', { job: j.label || '' }), n: false, cost: cost(r.ok ? r.hours : j.hours), disabled: frozen || !r.ok,
        why: r.ok ? null : SB.Clock.why(r), note: r.ok && r.overtime > 0 ? L('stayUp', { n: cost(r.overtime) }) : null,
        fk: 'now-' + j.id, tut: 'do-tonight', ref: j.id, cls: 'cc-tab--mini cc-tab--now',
        on: function () { doNow(j.id); }
      })]);
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
    /* the rest of tonight (js/ui/evening.js): one note that opens the things to do, at home or out */
    function eveningNote(s, tn, frozen) {
      var ui = function (k, c) { return SB.text.label('ui.evening.' + k, c); };
      return h('div', { class: 'cc-notewrap' }, [
        h('div', { class: 'cc-note', role: 'note' }, [
          sheet('pink', 'eve' + tn.day),
          h('span', { class: 'cc-note-txt' }, [
            hand(ui('note'), 12, { max: 150 }),
            h('span', { class: 'cc-note-who', text: tn.left > 0 ? ui('left', { n: cost(tn.left) }) : ui('none') })
          ])
        ]),
        h('div', { class: 'cc-tabs' }, [tab({ label: ui('open'), say: ui('noteSay'), n: false, disabled: frozen, fk: 'free-evening', cls: 'cc-tab--mini cc-tab--now',
                                             on: function () { SB.UI.evening.open(); } })])
      ]);
    }

    /* a free job's note, or a band's checks as small notes on one card: tapping one does it tonight */
    function freeNote(s, row, frozen) {
      var sub = row.sub, who = sub && sub.text;
      function ok(f) { return fitsNow(s, f.hours); }
      if (sub && sub.vet) {
        return h('div', { class: 'cc-vet' }, [
          sheet('blue', 'v' + row.id),
          h('span', { class: 'cc-vet-head' }, [hand(L('vetFor', { band: who }), 13, { max: 210 }), h('span', { class: 'cc-note-who', text: L('vetHelp') })]),
          h('span', { class: 'cc-vet-tabs' }, row.jobs.map(function (f, i) {
            var r = ok(f);
            return h('button', { type: 'button', class: 'cc-mini pz-hl', disabled: frozen || r.ok === false, data: { fk: 'free-' + row.id + '-' + i },
                                 title: r.ok === false ? SB.Clock.why(r) : null,
                                 aria: { label: L('addOne', { job: f.label, who: who }) + ', ' + cost(f.hours) + (r.ok === false ? ', ' + SB.Clock.why(r) : '') },
                                 on: { click: function () { doFree(f); } } }, [
              sheet('white', 'vt' + i + row.id),
              h('span', { class: 'cc-mini-l', text: f.label }), h('span', { class: 'cc-note-cost', text: cost(f.hours) })
            ]);
          }))
        ]);
      }
      return h('div', { class: 'cc-freewrap' }, row.jobs.map(function (f, i) {
        var r = ok(f);
        return h('div', { class: 'cc-notewrap' }, [
          h('div', { class: 'cc-note', role: 'note' }, [
            sheet('mint', 'f' + row.id + i),
            h('span', { class: 'cc-note-txt' }, [
              hand(f.label, 12, { max: 150 }),
              who ? h('span', { class: 'cc-note-who', text: who + (sub.more ? ' · ' + sub.more : '') }) : null
            ]),
            h('span', { class: 'cc-note-foot' }, [h('span', { class: 'cc-note-cost', text: cost(f.hours) })])
          ]),
          h('div', { class: 'cc-tabs' }, [tab({ label: L('doNow'), say: who ? L('addOne', { job: f.label, who: who }) : L('doNowSay', { job: f.label }), n: false, cost: cost(f.hours),
                                               disabled: frozen || r.ok === false, why: r.ok === false ? SB.Clock.why(r) : null, fk: 'free-' + row.id + '-' + i, cls: 'cc-tab--mini cc-tab--now',
                                               on: function () { doFree(f); } })])
        ]);
      }));
    }

    /* ---------------- a note picked up: its choices, who does it, and DO IT TONIGHT ---------------- */

    function openNote(id) {
      var s = st(), jv = safe(function () { return SB.Jobs.get(s, id); }, null), box;
      if (!jv || running) return;
      if (held && held.close) held.close();
      held = { jobId: id, opt: jv.opt ? jv.opt.chosen : undefined, effort: jv.type === 'MAKE_FLYER' ? ((SB.Config.USUAL && SB.Config.USUAL.effort) || 'STANDARD') : null,
               by: (jv.planned && jv.planned.by) || 'player' };
      box = h('div', { class: 'mv-slap cc-slap cc-slap--note', style: { '--hot': HOT } });
      held.box = box;
      fillNote();
      held.close = SB.UI.card(box, { label: jv.label || L('tray'), onClose: function () { held = null; } });
    }
    function noteOpts() {
      var o = {};
      if (!held) return o;
      if (held.opt !== undefined && held.opt !== null) o.opt = held.opt;
      if (held.effort) o.effort = held.effort;
      if (held.by && held.by !== 'player') o.by = held.by;
      return o;
    }
    function shut() { var c = held && held.close; held = null; if (c) c(); }
    function fillNote() {
      var s = st(), jv, job, sub, people, o, r, by, byName, effs, box = held && held.box;
      if (!box || !s) return;
      jv = safe(function () { return SB.Jobs.get(s, held.jobId); }, null);
      if (!jv || jv.status !== 'TODO') { shut(); return; }
      job = s.jobs[jv.id]; sub = subjectOf(s, jv); o = noteOpts(); r = canNow(s, jv.id, o);
      people = safe(function () { return SB.People.circle(s).people || []; }, []);
      by = held.by && held.by !== 'player' ? held.by : null;
      byName = by ? (personLabel(s, by) || '') : '';
      effs = jv.type === 'MAKE_FLYER' && SB.Config.FLYER && SB.Config.FLYER.HOURS ? Object.keys(SB.Config.FLYER.HOURS) : null;
      SB.UI.clear(box);
      [
        h('div', { class: 'cc-held-top' }, [
          jv.showId && s.shows[jv.showId] ? h('span', { class: 'cc-note-thumb' }, flyerThumbOnly(s, jv.showId, 36)) : null,
          h('span', null, [hand(jv.label || '', 17, { max: 260 }), sub ? h('span', { class: 'cc-note-who', text: sub }) : null])
        ]),
        /* the note is held over everything (the pinned clock too): its own ruler shows what doing it tonight takes */
        (function () { var tn = SB.Clock ? safe(function () { return SB.Week.tonight(s); }, null) : null; return tn ? SB.Clock.ruler(tn, { hot: HOT, extra: r.ok ? r.hours : 0, cls: 'cc-held-ruler' }) : null; })(),
        h('div', { class: 'cc-held-row' }, [
          (function () { var d = SB.Clock ? SB.Clock.due(jv, { today: s.clock.day }) : null; return d ? h('span', { class: 'cc-note-due' + (d.late ? ' is-late' : ''), text: d.text }) : null; })(),
          jv.window && jv.window.label && jv.window.state !== 'LATE' ? h('span', { class: 'cc-held-win cc-held-win--' + String(jv.window.state || '').toLowerCase(), text: jv.window.label }) : null
        ]),
        jv.why ? h('p', { class: 'cc-held-why', text: jv.why }) : null,
        jv.opt ? h('div', { class: 'cc-tabs cc-tabs--opts', role: 'radiogroup', aria: { label: SB.text.label('ui.c.priced') } }, jv.opt.choices.map(function (c) {
          var on = (held.opt || jv.opt.chosen) === c.key;
          return tab({ role: 'radio', on2: on, n: false, label: c.label || c.key, cost: num(c.cost) && c.cost ? SB.text.money(c.cost) : null, disabled: c.enabled === false, why: c.why || null,
                       on: function () { held.opt = c.key; fillNote(); } });
        })) : null,
        jv.opt && jv.showId ? h('p', { class: 'cc-held-why' }, C().ExposureLine({ exposure: safe(function () { return SB.Money.exposure(s, jv.showId); }, null) })) : null,
        effs && !by ? h('div', { class: 'cc-who' }, [
          h('span', { class: 'cc-who-k', text: L('effort') }),
          h('div', { class: 'cc-tabs cc-tabs--opts', role: 'radiogroup', aria: { label: L('effort') } }, effs.map(function (k) {
            return tab({ role: 'radio', on2: held.effort === k, n: false, label: L('effortWord.' + k), cost: cost(SB.Config.FLYER.HOURS[k]),
                         on: function () { held.effort = k; fillNote(); } });
          }))
        ]) : null,
        jv.helperOk ? h('div', { class: 'cc-who' }, [
          h('span', { class: 'cc-who-k', text: L('who') }),
          h('div', { class: 'cc-tabs cc-tabs--who', role: 'radiogroup', aria: { label: L('who') } }, [{ id: 'player', name: L('me') }].concat(people).map(function (x) {
            var on = (held.by || 'player') === x.id, name = x.name || [x.first, x.last].filter(Boolean).join(' ');
            return tab({ role: 'radio', on2: on, n: false, label: name, lead: x.id === 'player' ? null : C().PersonStamp({ person: x, size: 24 }), on: function () { held.by = x.id; fillNote(); } });
          })),
          h('p', { class: 'cc-held-help', text: L('whoHelp') })
        ]) : null,
        jv.riders && jv.riders.length ? h('ul', { class: 'cc-promises' }, jv.riders.map(function (rd) {
          var on = rd.status === 'PROMISED' || rd.status === 'DONE' || !!rd.planned;
          return h('li', null, [
            h('button', { type: 'button', role: 'checkbox', class: 'cc-tick pz-hl' + (on ? ' is-on' : ''), disabled: rd.status === 'DONE', aria: { checked: on ? 'true' : 'false', label: rd.label || '' },
                          on: { click: function () { promise(rd.id, !on); } } }, [
              pic(24, 22, boxArt(on, 'pb' + rd.id)),
              h('span', { class: 'cc-tick-l', text: rd.label || '' }),
              num(rd.hours) && rd.hours ? h('span', { class: 'cc-note-cost', text: cost(rd.hours) }) : null,
              rd.cost ? h('span', { class: 'cc-tick-cost', text: rd.cost.lo === rd.cost.hi ? SB.text.money(rd.cost.lo) : SB.text.money(rd.cost.lo) + '-' + SB.text.money(rd.cost.hi) }) : null
            ]),
            !on && (rd.text || rd.why) ? h('p', { class: 'cc-tick-why', text: rd.text || rd.why }) : null
          ]);
        })) : null,
        h('div', { class: 'cc-tabs cc-tabs--held' }, [
          tab({ label: by ? L('askThem', { name: byName }) : L('doNow'), n: false, hot: r.ok, cost: cost(r.ok ? r.hours : (by ? msgHours() : jv.hours)), disabled: !r.ok || running,
                why: r.ok ? null : SB.Clock.why(r), fk: 'held-now', tut: 'do-tonight-card', ref: jv.id,
                on: function () { var id = jv.id, x = doNow(id, noteOpts()); if (x && x.ok !== false) shut(); } }),
          job && job.free ? tab({ label: L('remove'), n: false, fk: 'held-crumple', on: function () {
            var id = jv.id, x = act(function (y) { return SB.Week.removeJob(y, id); });
            if (x && x.ok !== false) shut();
          } }) : null,
          tab({ label: L('putBack'), n: false, fk: 'held-down', on: shut })
        ])
      ].forEach(function (el) { if (el) box.appendChild(el); });
    }

    /* ---------------- under the page, on the table: coming up, waiting on, the phone ---------------- */

    function bottom(s, v) {
      return h('div', { class: 'cc-below' }, [runway(s, v), waiting(s), needs(s)]);
    }
    function scrap(cls, stk, seed, title, kids, hot) {
      return h('section', { class: 'cc-scrap ' + cls, aria: { label: title } }, [
        sheet(stk, seed),
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

    /** The answers you are waiting on, and what goes out tonight. A chase is a message: it costs its half hour, and says
     *  so; a message written tonight can be taken back, and the half hour comes back with it. */
    function waiting(s) {
      var list = safe(function () { return SB.Mail.waiting(s); }, []), out = safe(function () { return SB.Mail.outbox(s); }, []), end = s.clock.week * 7 + 6,
          mh = msgHours(), fit = fitsNow(s, mh);
      return scrap('cc-waiting', 'bone', 'waiting', L('waiting'), [
        list.length ? h('ul', { class: 'cc-slips' }, list.map(function (a) {
          var who = a.toName || '';
          return h('li', { class: 'cc-slip' + (a.overdue ? ' is-overdue' : '') }, [
            h('span', { class: 'cc-slip-who', text: who }),
            a.what ? h('span', { class: 'cc-slip-what', text: a.what }) : null,
            a.overdue ? h('span', { class: 'cc-slip-late', text: L('overdue') }) : null,
            h('div', { class: 'cc-tabs cc-tabs--slip' }, [
              !a.chased ? tab({ label: L('chase'), say: L('chaseSay', { who: who }), cost: cost(mh), disabled: fit.ok === false, why: fit.ok === false ? SB.Clock.why(fit) : null,
                                on: function () { act(function (x) { return SB.Mail.chase(x, a.id); }); } }) : null,
              a.needBy == null ? tab({ label: L('needBy'), say: L('needBySay', { who: who }), on: function () { act(function (x) { return SB.Mail.setNeedBy(x, a.id, end); }); } }) : null,
              tab({ label: L('withdraw'), say: L('withdrawSay', { who: who }), on: function () { act(function (x) { return SB.Mail.withdraw(x, a.id); }); } })
            ])
          ]);
        })) : h('p', { class: 'cc-none', text: L('noWaiting') }),
        out.length ? h('div', { class: 'cc-outbox' }, [
          pic(30, 22, '<rect x="2" y="4" width="24" height="16" fill="#f4f2ea" stroke="' + TONER + '" stroke-width="2"/><path d="M2 4L14 13L26 4" fill="none" stroke="' + TONER + '" stroke-width="2"/>'),
          h('span', { class: 'cc-outbox-k', text: L('outbox') }),
          h('ul', null, out.map(function (o) {
            var who = o.toName || '';
            return h('li', null, [
              h('span', { text: who + (o.what ? ': ' + o.what : '') }),
              o.id && SB.Mail.unqueue ? tab({ label: L('takeBack'), say: L('takeBackSay', { who: who }), n: false, cls: 'cc-tab--mini',
                                              on: function () { act(function (x) { return SB.Mail.unqueue(x, o.id); }); } }) : null
            ]);
          }))
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
        return h('li', null, h('button', { type: 'button', class: 'cc-call pz-hl', aria: { label: L('open') + ': ' + (n.text || '') + (num(n.by) ? ', ' + L('by', { day: SB.time.fmt(n.by, 'short') }) : '') },
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

    /* ---------------- the play loop: the night played out ---------------- */

    function delay() { var sp = SB.UI.prefs ? SB.UI.prefs.get('speed') : 'normal'; return sp === 'fast' ? 220 : 620; }
    function schedule(ms) { if (timer) clearTimeout(timer); timer = setTimeout(tick, ms); }
    /* resume: play on to the next stop; the shell hears it (the lamp, the reels) */
    function resume() {
      if (!alive || running) return;
      running = true; userPaused = false;
      if (held) shut();
      SB.UI.fire('sb-play', { cmd: 'resume' });
      render(); schedule(0);
    }
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

    /* Between stops: the clock is in the middle of a night or a morning, with nothing waiting on the player. Time does
     * not sit there: the loop plays on by itself (kick). */
    function between(s) {
      var stop = s && s.clock.stop;
      if (s && s.clock.phase === 'PLAN') return true;                 // an old save made while planning: Week.step plays it
      if (!s || s.clock.phase !== 'PLAY') return false;
      if (!stop) return true;
      if (stop.kind === 'SHOW_NIGHT' || stop.kind === 'SETTLE') return showDone(s, stop.showId);
      if (stop.kind === 'REPLY' || stop.kind === 'NEED_BY') return SEEN.stop === stopKey(stop);
      return false;
    }
    function busyElsewhere() {
      var ov = typeof document !== 'undefined' && document.getElementById ? document.getElementById('overlay') : null;
      if (SB.Cutscene && SB.Cutscene.playing && safe(function () { return SB.Cutscene.playing(); }, false)) return true;
      return !!(ov && ov.classList && ov.classList.contains('is-open'));
    }
    /* checked a moment after a redraw, so a cutscene or a card that is about to open has opened */
    function kick() {
      if (running || syncing || userPaused || cardOpen || kickT) return;
      kickT = setTimeout(function () {
        kickT = null;
        if (!alive || running || syncing || userPaused || cardOpen || busyElsewhere()) return;
        if (between(st())) resume();
      }, 30);
    }

    /** One step of the loop. Returns 'go' (keep going), 'wait' (a card or another screen has it), 'end' or 'stop'. */
    function stepOnce() {
      var s = st(), stop, r;
      if (!s || (s.clock.phase !== 'PLAY' && s.clock.phase !== 'PLAN')) return 'stop';
      if (cardOpen) return 'wait';
      stop = s.clock.stop;
      if (stop) {
        if (stop.kind === 'EVENING') return 'stop';
        if (stop.kind === 'END_OF_WEEK') return 'end';
        if (stop.kind === 'DECISION') { openDecision(stop.decision); return 'wait'; }
        if ((stop.kind === 'SHOW_NIGHT' || stop.kind === 'SETTLE') && !showDone(s, stop.showId)) { SB.UI.go('night', { showId: stop.showId }); return 'wait'; }
        if ((stop.kind === 'REPLY' || stop.kind === 'NEED_BY') && SEEN.stop !== stopKey(stop)) { handleStop(stop); return 'wait'; }
      }
      r = act(function (x) { return SB.Week.step(x); });
      if (!r || r.ok === false) return 'stop';
      stageCards(r.records || []);
      if (!alive) return 'wait';
      if (r.stop) return handleStop(r.stop);
      return 'go';
    }

    /** The night played out in one go, up to the next stop (the 'next' command: the tests, and a new game sitting down). */
    function playOut() {
      var res = 'go', i;
      if (running) pause(true);
      syncing = true;
      try { for (i = 0; i < 400 && res === 'go' && alive; i++) res = stepOnce(); }
      finally { syncing = false; }
      if (res === 'end' || res === 'stop') SB.UI.fire('sb-play', { cmd: 'pause' });
      render();
      return res;
    }

    function showDone(s, id) { var x = s.shows && s.shows[id]; return !x || x.status === 'PLAYED' || x.status === 'CANCELLED'; }

    function handleStop(stop) {
      var s = st();
      switch (stop.kind) {
        case 'EVENING': return 'stop';
        case 'DECISION': openDecision(stop.decision); return 'wait';
        case 'REPLY': SEEN.stop = stopKey(stop); openReply(stop); return 'wait';
        case 'NEED_BY': SEEN.stop = stopKey(stop); openNeedBy(stop); return 'wait';
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
      box = h('div', { class: 'mv-slap cc-slap cc-slap--decision sb-decision', role: 'group', tabindex: '-1', style: { '--hot': HOT }, aria: { live: 'assertive', label: dec.title || '' },
                       on: { keydown: function (e) { var n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length) { e.preventDefault(); choose(opts[n - 1]); } } } }, [
        h('span', { class: 'cc-hotmark cc-hotmark--big', aria: { hidden: 'true' }, text: '!!' }),
        dec.title ? h('h2', { class: 'mv-slap cc-slap-title' }, mk(String(dec.title).toUpperCase(), 24, { max: 380 })) : null,
        dec.body ? h('p', { class: 'mv-slap cc-slap-body', text: dec.body }) : null,
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
      close = SB.UI.card(h('div', { class: 'mv-slap cc-slap', style: { '--hot': HOT } }, [
        h('h2', { class: 'mv-slap cc-slap-title' }, mk(L('replyTitle').toUpperCase(), 22)),
        m ? h('div', { class: 'mv-slap cc-slap-msg' }, C().MessageBody({ message: m })) : null,
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
      close = SB.UI.card(h('div', { class: 'mv-slap cc-slap', style: { '--hot': HOT } }, [
        h('h2', { class: 'mv-slap cc-slap-title' }, mk(L('needByTitle').toUpperCase(), 22)),
        a ? h('p', { class: 'mv-slap cc-slap-body', text: (a.toName || '') + (a.what ? ': ' + a.what : '') }) : null,
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
        close = SB.UI.card(h('div', { class: 'mv-slap cc-slap cc-slap--stage', style: { '--hot': HOT } }, [
          pic(40, 36, K().heart(20, 18, 30, { seed: 'stg' }), 'cc-slap-doodle'),
          h('h2', { class: 'mv-slap cc-slap-title' }, mk(L('stageTitle').toUpperCase(), 22)),
          r.text ? h('p', { class: 'mv-slap cc-slap-body', text: r.text }) : null,
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

    /* 'sb-play': resume and pause the play-out (the tape deck, js/ui/app.js); 'next' plays the night out in one go.
     * detail.by === 'player' is the player pausing it on the deck: then it waits for them. */
    offPlay = SB.UI.on(document, 'sb-play', function (e) {
      var cmd = e && e.detail && e.detail.cmd;
      if (cmd === 'resume') { if (!running) resume(); }
      else if (cmd === 'pause') { if (e.detail.by === 'player') userPaused = true; if (running) pause(false); }
      else if (cmd === 'next') { userPaused = false; playOut(); }
    });
    if (typeof window !== 'undefined' && window.addEventListener) {
      var rz = null, onRz = function () { if (rz) clearTimeout(rz); rz = setTimeout(function () { rz = null; if (alive && !hidden()) render(); }, 200); };
      window.addEventListener('resize', onRz);
      offResize = function () { window.removeEventListener('resize', onRz); };
    }

    render();
    (function onMount() {
      var s = st();
      if (!s || s.clock.phase !== 'PLAY') return;
      if (s.clock.stop && s.clock.stop.kind === 'DECISION') openDecision(s.clock.stop.decision);
    })();

    return {
      update: render,
      unmount: function () {
        alive = false; running = false;
        if (timer) { clearTimeout(timer); timer = null; }
        if (kickT) { clearTimeout(kickT); kickT = null; }
        if (held && held.close) { var c = held.close; held = null; c(); }
        if (offPlay) offPlay();
        if (offResize) offResize();
      }
    };
  }

  /* the calendar's paste-up hand, shared with the torn-off page (js/ui/screens/close.js loads after this file) */
  SB.UI.calKit = { svg: svg, pic: pic, mk: mk, hand: hand, sheet: sheet, ear: ear, strip: strip, tab: tab, tabsRow: tabsRow, boxArt: boxArt,
                   headArt: headArt, stampArt: stampArt, cityInk: cityInk, chipText: chipText, defsEl: defsEl, grainEl: grainEl, TONER: TONER };

  SB.UI.screen('week', { rail: 'week', title: 'ui.week.title', full: false, mount: mount });
})(SB);
