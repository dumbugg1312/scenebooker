/* Scene Booker — ui/screens/close.js (the calendar close-up, closing the week: 07-desk.md sections 2 and 2b)
 * The week's page torn off and laid out on the black table, each thing apart. For each show: its flyer, a verdict
 * rubber stamp, the crowd that came against the crowd the town expected as two rows of heads by generation, the
 * ledger as three scraps (what you did, what you could not have known, luck), each comment as a quote bubble with the
 * person's stamp and one cause sticker. What you learned as notebook scraps; money, trust and stress as small drawn
 * things; month-end bills as bills with a stub to tick (pay, or leave it ticked off and put it off); then the tab that
 * starts the next week. Same four signs as the week page (week.js): tear-off tab chooses, drawn box ticks, label strip
 * opens; reading matter carries none. Hot ink only for what needs the player now (the bills, the next week).
 * Reads state.week.report (the CloseReport Week.close returned), Shows.get(id).result and Money.billsView; actions
 * Week.payBills and Week.nextWeek through SB.UI.act. Hosts the year page (SB.UI.parts.yearPage) in week 52, 104, ...
 * The look (css/cu-close.css): the torn-off week pinned to a cork board, a photo of each show played (SB.Scenes.draw, the
 * cutscenes' own copier and real cut-outs) taped up with its flyer, the shows coming as flyers, the money as an envelope,
 * a bank receipt and a cash pile, the stress as the desk's coffee cups, and the next week as a big taped-up sign.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.close = {
    title: 'The week, closed',
    weekN: 'week {n}',
    tornOff: 'torn off',
    idx: { shows: 'the shows', money: 'money', said: 'what people said', learned: 'what you learned', people: 'people', you: 'you', bills: 'bills', next: 'next week' },
    noShow: 'No show this week.',
    noShowNext: 'Next: {date} at {room}.', noShowNextNoRoom: 'Next: {date}.',
    came: 'came',
    expected: 'the town expected',
    perHead: 'one head = {n} people',
    guessed: 'you guessed {lo} to {hi}',
    yours: 'what you did',
    hidden: 'what you couldn\'t have known',
    luck: 'luck',
    noLuck: 'no luck either way',
    rest: '{label}: {d}',
    door: '{paid} paid at {price}: {gross}',
    yourCut: 'yours',
    moneyIn: 'in',
    moneyOut: 'out',
    net: 'this week',
    bankSay: 'You have {bank} in your account.',
    netSay: 'This week {in} came in and {out} went out, so the account {went} {net}.',
    netUp: 'went up', netDown: 'went down', netFlat: 'stayed the same',
    srcLine: '{what}: {amount}.',
    src: { WAGES: 'Day job pay', DOOR: 'Door money', HAT: 'Extra at the door for gas', DEPOSIT: 'A deposit back', LOCAL: 'From a local band', TOURING: 'From a touring band',
           LOAN: 'A loan', EVENT: 'Something that happened', MOVE: 'Money moved', OTHER: 'Other money', ROOM: 'Room', SOUND: 'Sound', SECURITY: 'Security',
           INSURANCE: 'Insurance', DAMAGES: 'Damages', HOST: 'The host', PRINT: 'Printing', PROMO: 'Getting the word out', FOOD: 'Food', HELPER: 'Helpers',
           FLYER: 'Flyers', MOTEL: 'A motel', THEFT: 'Theft', BILLS: 'Bills', FEE: 'Fees' },
    owed: 'promised costs, next eight weeks (rooms, sound, guarantees)',
    owedSay: 'In the next 8 weeks you have promised {n}: rooms, sound and guarantees.',
    owedNone: 'In the next 8 weeks you have not promised any money to anyone.',
    lateLine: '{n} late, past the day it was due: {what}.',
    lateOne: '{job} was not done by the day it was due',
    trustBecause: '{who} trusts you {more} because {why}.',
    trustMore: 'more', trustLess: 'less',
    why: { PAID_AGREED: 'you paid them what you said', PAID_MORE: 'you paid them more than you said', GAVE_ALL: 'you gave them everything you made',
           GOOD_SLOT: 'you gave them a good slot', GOOD_NIGHT: 'their night went well', FIRST_SHOW: 'you gave them their first show',
           WITH_HERO: 'you put them on with a band they love', DETAILS: 'you sent the details', FED: 'you fed them', THANKED: 'you thanked them',
           REBOOKED: 'you booked them again', TOUR_BOOKED: 'you booked their tour date', COLD_BOOKED: 'you booked them when they did not know you',
           CAME_OUT: 'you came out to see them', UNANSWERED: 'you left them without an answer', DROPPED_ASK: 'you dropped a show you had asked them to play',
           BUMPED: 'you bumped them off a bill', EMPTY_ROOM: 'the room was empty', BAD_SOUND: 'the sound was bad', NOT_ADVANCED: 'you did not confirm the details with them',
           PAID_SHORT: 'you paid them less than you said', TOOK_TOO_MUCH: 'you kept too much of the door', ASKED_TO_GIVE: 'you asked them to give something up',
           CANCELLED: 'you cancelled on them', BAD_BILL: 'the bill did not make sense for them' },
    cost: 'What this show cost you',
    costMoney: 'In money: the show paid you {net} after everything.',
    costLoss: 'In money: you lost {net} on this show.',
    costTrust: 'In trust: {names} {verb}.',
    costTrustNone: 'In trust: nobody changed how they feel about you.',
    costStand: 'In standing: {text}',
    standUp: 'the scene noticed a good night.', standDown: 'the scene noticed a rough one.', standFlat: 'it stayed about where it was.',
    nothingSaid: 'Nobody said much.',
    nothingLearned: 'Nothing new in the notebook.',
    learnedH: { bands: 'About the bands', crowd: 'About the crowd', rooms: 'About the rooms and the night' },
    noPeople: 'Nobody moved much.',
    regulars: 'regulars',
    stressWas: 'from {from}', stressLine: 'Your stress is {to} out of 100. Last week it was {from}.', trustUp: 'trusts you more', trustDown: 'trusts you less',
    causes: 'what wore on you',
    notebook: 'notebook',
    openNote: 'Open the notebook at {cause}',
    bills: 'This month\'s bills',
    billsNone: 'No bills this week.',
    due: 'amount due',
    pay: 'pay it',
    putOff: 'put off',
    paySay: 'Pay {bill}, {amount}',
    fee: 'late fee',
    total: 'total',
    bank: 'in your account',
    after: 'after',
    short: 'There isn\'t enough. Pick a way through:',
    payBills: 'pay the bills', payAll: 'pay all the bills',
    paid: 'paid',
    whatChanged: 'WHAT WOULD HAVE CHANGED IT',
    irl: 'in real life',
    next: '{open} jobs open, {replies} answers due.',
    start: 'start week {n}',
    notClosed: 'The week is not closed yet.',
    toWeek: 'back to the week',
    year: 'the year',
    aim: 'Next goal: {text}', coming: 'coming up', inDays: 'in {n} days',
    nothingComing: 'Nothing else on the calendar yet.',
    photo: 'A photo from the night: {band}',
    receipt: 'receipt',
    weekIn: 'week {n}'
  };

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function Kt() { return SB.UI.calKit; }
  function L(key, ctx) { return SB.text.label('ui.close.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return has(key) ? SB.text.label(key) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'close', String(e && e.message)); return fb; } }
  function money(a, signed) { return num(a) ? (signed && a > 0 ? '+' : (a < 0 ? '-' : '')) + SB.text.money(Math.abs(a)) : '?'; }
  function signed(d) { return num(d) ? (d > 0 ? '+' : (d < 0 ? '-' : '')) + Math.abs(Math.round(d)) : '?'; }
  var GENS = ['KIDS', 'MIDDLE', 'OLD'], TONER = '#141413';
  /* how fine the copier rasters have to be to stay sharp: px per --p times the device's (js/ui/finish.js), kept off the memory cliff */
  function res() { return Math.max(1, Math.min(3, SB.Finish && SB.Finish.res ? SB.Finish.res() : 1)); }

  /* ---------------- the paste-up: real cut-out photos and things run through the cutscenes' copier ---------------- */
  function cnv(w, ht, cls) { var c = document.createElement('canvas'); c.width = w; c.height = ht; if (cls) c.className = cls; c.setAttribute('aria-hidden', 'true'); return c; }
  function gv(v) { var n = Math.round(Math.max(0, Math.min(1, v)) * 255); return 'rgb(' + n + ',' + n + ',' + n + ')'; }
  function xerox(c, o) { try { if (SB.Scenes && SB.Scenes.copier) SB.Scenes.copier(c, o); } catch (e) { SB.log('warn', 'close', 'copier: ' + String(e && e.message)); } return c; }
  function paperOf(seed) { try { return SB.NightScene && SB.NightScene.paperFor ? SB.NightScene.paperFor(seed) : 'canary'; } catch (e) { return 'canary'; } }
  function bandNames(s, sh) {
    return ((sh && sh.bill && sh.bill.slots) || []).map(function (sl) { var b = sl && sl.bandId && s.bands ? s.bands[sl.bandId] : null; return b && b.name ? b.name : ''; }).filter(Boolean);
  }

  /** The cork board the week is pinned to: dark cork in toner, pin holes, corners of old flyers torn down under their staples. */
  var BOARD = null, BOARDRES = 0;
  function boardTex() {
    if (BOARD !== null && BOARDRES === Math.min(2, res())) return BOARD;
    BOARD = ''; BOARDRES = Math.min(2, res());
    try {
      var S = 600, f = Math.min(2, res()), c = cnv(Math.round(S * f), Math.round(S * f)), x = c.getContext('2d'), r = SB.rng.make('close:board'), i, k, px, py;
      x.scale(f, f);
      x.fillStyle = '#1e1b17'; x.fillRect(0, 0, S, S);
      for (i = 0; i < 11000; i++) { x.globalAlpha = r.range(0.2, 0.7); x.fillStyle = r.next() < 0.55 ? '#3a3229' : '#0b0a09'; k = r.range(0.6, 2.3); x.fillRect(r.range(0, S), r.range(0, S), k, k); }
      for (i = 0; i < 7; i++) {           /* a staple left behind, a crumb of the flyer still under it */
        px = r.range(0, S); py = r.range(0, S);
        x.save(); x.translate(px, py); x.rotate(r.range(-0.5, 0.5));
        x.globalAlpha = r.range(0.06, 0.11); x.fillStyle = r.next() < 0.6 ? '#ece6d6' : '#e3cf62';
        x.beginPath(); x.moveTo(-3, -4); x.lineTo(r.range(16, 26), r.range(-6, -2)); x.lineTo(r.range(12, 22), r.range(5, 10)); x.lineTo(r.range(-4, 2), r.range(6, 12)); x.closePath(); x.fill();
        x.globalAlpha = 0.7; x.strokeStyle = '#b3afa4'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(0, 1); x.lineTo(13, 1); x.stroke();
        x.restore();
      }
      x.fillStyle = '#040403'; x.globalAlpha = 0.9;
      for (i = 0; i < 46; i++) { x.beginPath(); x.arc(r.range(0, S), r.range(0, S), r.range(0.8, 1.8), 0, 6.3); x.fill(); }
      x.globalAlpha = 1;
      BOARD = c.toDataURL('image/png');
    } catch (e) { BOARD = ''; }
    return BOARD;
  }
  /** A push pin, from the side a little: its shadow on the cork, the needle, the head. */
  function pinArt(col) {
    return '<ellipse cx="15" cy="27" rx="10" ry="3.4" fill="#000" fill-opacity=".55"/><path d="M13 16L16 27" stroke="#d8d3c8" stroke-width="2.2"/>' +
           '<circle cx="12" cy="12" r="10" fill="' + (col || '#e7ddc4') + '" stroke="' + TONER + '" stroke-width="2.2"/><circle cx="12" cy="12" r="10" fill="url(#dk-ht1)"/>' +
           '<circle cx="8.5" cy="8.5" r="3" fill="#fff" fill-opacity=".8"/>';
  }
  /** A sharpie ring drawn twice around round, quick, not closing. */
  function ringArt(w, ht, seed) {
    var r = SB.rng.make('close:ring:' + seed), cx = w / 2, cy = ht / 2, d = '', i, a, rx, ry, n = 26;
    for (i = 0; i <= n * 1.15; i++) {
      a = -1.9 + i / n * 6.283; rx = (w / 2 - 4) * (1 + r.range(-0.04, 0.04)); ry = (ht / 2 - 4) * (1 + r.range(-0.05, 0.05));
      d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rx).toFixed(1) + ' ' + (cy + Math.sin(a) * ry).toFixed(1);
    }
    return '<path d="' + d + '" fill="none" stroke="' + TONER + '" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  /** The coffee, the way the desk draws it: a cup from above, and more cups and rings as the stress rises. */
  function cupArt(k, cx, cy, rad, full) {
    var pts = [], i, f = function (n) { return Math.round(n * 10) / 10; }, P = '#f4f2ea', inner;
    for (i = 0; i < 22; i++) pts.push([cx + Math.cos(i / 22 * Math.PI * 2) * rad, cy + Math.sin(i / 22 * Math.PI * 2) * rad]);
    inner = '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(rad - 2) + '" fill="' + P + '" stroke="' + TONER + '" stroke-width="4"/>' +
            '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(rad * 0.74) + '" fill="' + (full ? '#1a120c' : '#cfc6ae') + '" stroke="' + TONER + '" stroke-width="3"/>' +
            (full ? k.dots('M' + f(cx - rad * 0.5) + ' ' + f(cy - rad * 0.2) + 'Q' + f(cx - rad * 0.3) + ' ' + f(cy - rad * 0.6) + ' ' + f(cx + rad * 0.2) + ' ' + f(cy - rad * 0.6) + 'Q' + f(cx - rad * 0.2) + ' ' + f(cy - rad * 0.4) + ' ' + f(cx - rad * 0.5) + ' ' + f(cy - rad * 0.2) + 'Z', 3, { white: true })
                  : '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(rad * 0.55) + '" fill="none" stroke="#6b4a2a" stroke-width="3" stroke-opacity=".6"/>') +
            k.dotsRect(cx + rad * 0.25, cy - rad, rad * 0.75, rad * 2, 1);
    return k.cutouts([{ d: k.polyD(pts) }, { d: k.polyD([[cx + rad - 6, cy - 15], [cx + rad + 30, cy - 13], [cx + rad + 32, cy + 13], [cx + rad - 6, cy + 15]]) }],
                     { edge: 6, inner: '<path d="M' + f(cx + rad + 4) + ' ' + f(cy - 5) + 'H' + f(cx + rad + 24) + 'V' + f(cy + 5) + 'H' + f(cx + rad + 4) + '" fill="' + P + '"/>' }).replace(/fill="#141413"/g, 'fill="' + P + '"') + inner;
  }

  function mount(root) {
    var choice = { pay: null, late: [], ladder: [] }, HOT = TONER, photos = {}, art = {};

    function k() { return Kt(); }
    function sec(id, title, kids, hot) {
      return h('section', { class: 'cc-sec', id: 'sb-close-' + id, tabindex: '-1', aria: { label: title } }, [
        h('h2', { class: 'cc-sec-k' + (hot ? ' is-hot' : ''), text: title }), kids
      ]);
    }
    function thing(stk, seed, cls, kids, o) {
      o = o || {};
      return h(o.tag || 'div', { class: 'cc-thing' + (cls ? ' ' + cls : ''), role: o.role || null, aria: o.aria || null }, [k().sheet(stk, seed, { torn: !!o.torn }), kids]);
    }
    function none(text) { return h('p', { class: 'cc-none', text: text }); }
    /* "No show this week." says what is next when a show is coming (fix-list 3.8) */
    function noShowLine() {
      var s = SB.UI.game(), list = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'], fromDay: s.clock.day }); }, []) || [], sh = null, room = '';
      list.filter(function (x) { return !x.by || x.by === 'player'; }).forEach(function (x) { if (!sh || x.day < sh.day) sh = x; });
      if (!sh) return L('noShow');
      room = s.rooms && sh.roomId && s.rooms[sh.roomId] ? s.rooms[sh.roomId].name : '';
      return L('noShow') + ' ' + (room ? L('noShowNext', { date: SB.time.fmt(sh.day, 'short'), room: room }) : L('noShowNextNoRoom', { date: SB.time.fmt(sh.day, 'short') }));
    }

    function render() {
      var s = SB.UI.game(), rep, W, kt = k(), sc = root.closest ? root.closest('.cu-in') : null, top = sc ? sc.scrollTop : 0;
      SB.UI.clear(root);
      if (!s || !kt) { root.appendChild(C().Empty({})); return; }
      HOT = kt.cityInk(s, 0);
      W = s.week || {};
      rep = W.report;
      if (!rep || s.clock.phase !== 'CLOSE') {
        root.appendChild(h('div', { class: 'cc-close', style: { '--hot': HOT } }, [
          thing('white', 'notclosed', '', [h('p', { class: 'cc-verdict-line', text: L('notClosed') })]),
          h('div', { class: 'cc-tabs' }, [kt.tab({ label: L('toWeek'), on: function () { SB.UI.go('week'); } })])
        ]));
        return;
      }
      var tex = boardTex(), side;
      root.appendChild(h('div', { class: 'cc-close', style: { '--hot': HOT, '--board': tex ? 'url(' + tex + ')' : null } }, [
        kt.defsEl(),
        head(s, rep),
        topGo(s, rep),
        /* the week's show: its photo is the one loud thing, so it has the room and no label (the page already says it is the shows) */
        (rep.shows || []).length ? h('section', { class: 'cc-hero-row', id: 'sb-close-shows', tabindex: '-1', aria: { label: L('idx.shows') } }, [h('h2', { class: 'sb-vh', text: L('idx.shows') }), shows(s, rep)]) : null,
        h('div', { class: 'cc-board' }, [
          h('div', { class: 'cc-col cc-col--main' }, [
            /* month's end: the bills go up where they can't be missed, right under the week's show */
            rep.bills ? sec('bills', L('idx.bills'), bills(s, rep), !billRecords(s).length) : null,
            sec('coming', L('coming'), coming(s, rep)),
            (rep.learned || []).length ? sec('learned', L('idx.learned'), learned(s, rep)) : null,
            hasPeople(s, rep) ? sec('people', L('idx.people'), people(s, rep)) : null,
            rep.year && SB.UI.parts.yearPage ? sec('year', L('year'), thing('white', 'year', 'cc-year', safe(function () { return SB.UI.parts.yearPage(rep.year); }, null))) : null
          ]),
          side = h('div', { class: 'cc-col cc-col--side' }, [
            sec('money', L('idx.money'), moneyPart(s, rep)),
            sec('you', L('idx.you'), you(s, rep)),
            newsOf(rep).length ? sec('said', L('idx.said'), said(s, rep)) : null,
            sec('next', L('idx.next'), next(s, rep), !(rep.bills && !billRecords(s).length))
          ])
        ]),
        kt.grainEl()
      ]));
      if (sc) sc.scrollTop = top;
      safe(function () { moves(); }, null);
      /* the money, the cup and the next week stay in view while the shows scroll, when they fit */
      safe(function () { if (sc && side.offsetHeight && side.offsetHeight + 40 < sc.clientHeight) side.classList.add('is-pinned'); }, null);
    }

    /* the moves (js/ui/finish.js): the photo is stamped on, the piles slap down one after another, and money and heads count up
       (each number is lettering drawn by the kit, so each frame of the count swaps in the drawing of that number) */
    var counts = {}, firstShow = true, shown = null;
    function moves() {
      var F = SB.Finish, kt = k(), ph, list, key, d0 = firstShow ? 220 : 0;
      if (!F || !kt || !root) return;
      ph = root.querySelector('.cc-photo');
      key = ph ? ph.getAttribute('data-sid') : null;
      if (ph && key !== shown) F.move(ph, 'stamp', { delay: d0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: ph } });
      shown = key;
      list = Array.prototype.slice.call(root.querySelectorAll('.cc-close-head, .cc-sec, .cc-hero-row .cc-show-side > *, .cc-hero-row .cc-verdict-line, .cc-hero-row .cc-crowdcard, .cc-hero-row .cc-ledger > *'));
      if (firstShow) { F.stagger(list, 3); list.forEach(function (el) { el.classList.add('mv-slap'); }); }
      Array.prototype.forEach.call(root.querySelectorAll('[data-ct]'), function (el) {
        var id = el.getAttribute('data-ct'), to = parseFloat(el.getAttribute('data-to')), size = parseFloat(el.getAttribute('data-size')), fmt = el.getAttribute('data-fmt'),
            prev = counts[id], fake;
        if (!isFinite(to) || prev === to) return;
        counts[id] = to;
        fake = { set textContent(v) { v = parseFloat(v); var m = kt.mk(fmt === 'money' ? money(v) : (fmt === 'moneys' ? money(v, true) : String(v)), size, { say: false }); if (m) el.innerHTML = m.innerHTML; } };
        F.countUp(fake, to, { from: prev === undefined ? 0 : prev, delay: d0 + 83, cue: 'tick', cueOpts: { gain: -14 } });
      });
      firstShow = false;
    }
    /** A drawn number that counts up when it first shows or changes: kt.mk plus what moves() needs to redraw it. */
    function counted(id, v, size, fmt) {
      var m = k().mk(fmt === 'money' ? money(v) : (fmt === 'moneys' ? money(v, true) : String(v)), size, { say: false });
      if (m && num(v)) { m.setAttribute('data-ct', id); m.setAttribute('data-to', String(v)); m.setAttribute('data-size', String(size)); m.setAttribute('data-fmt', fmt); }
      return m;
    }

    /* the page itself, torn off: the week in marker capitals */
    function head(s, rep) {
      var kt = k(), from = rep.week * 7, to = from + 6, same = SB.time.month(from) === SB.time.month(to),
          range = SB.time.fmt(from, 'md') + '-' + (same ? SB.time.date(to).d : SB.time.fmt(to, 'md'));
      var played = {}, due = {}, d, days = [];
      (rep.shows || []).forEach(function (id) { var sh = safe(function () { return SB.Shows.get(s, id); }, null); if (sh) played[sh.day] = sh; });
      (((rep.money || {}).owedAhead || {}).lines || []).forEach(function (l) { if (l && l.day >= from && l.day <= to) due[l.day] = l; });
      for (d = from; d <= to; d++) days.push(dayCell(s, d, played[d], due[d]));
      return h('header', { class: 'cc-close-head' }, [
        kt.sheet('white', 'torn' + rep.week, { torn: true }),
        h('span', { class: 'cc-pin cc-pin--l', aria: { hidden: 'true' } }, kt.pic(30, 32, pinArt())),
        h('span', { class: 'cc-pin cc-pin--r', aria: { hidden: 'true' } }, kt.pic(30, 32, pinArt())),
        h('h1', { class: 'cc-torn', style: { margin: 0 } }, [
          kt.mk(range.toUpperCase(), 40, { say: false }),
          h('span', { class: 'cc-torn-sub', text: L('weekN', { n: rep.week + 1 }) + ' · ' + L('tornOff') }),
          h('span', { class: 'sb-vh', text: L('title') + ', ' + SB.time.fmt(from, 'week') })
        ]),
        h('ol', { class: 'cc-wk', aria: { hidden: 'true' } }, days),
        !(rep.shows || []).length ? thing('bone', 'noshow', 'cc-noshow', h('span', { text: noShowLine() }), { torn: true }) : null
      ]);
    }
    /** One day of the torn-off row: its number, a show circled with its flyer stuck in, bills scrawled. */
    function dayCell(s, d, sh, bill) {
      var kt = k(), thumb = null;
      if (sh && SB.UI.parts && SB.UI.parts.flyerThumb) thumb = safe(function () { return SB.UI.parts.flyerThumb({ recipe: (sh.flyer && sh.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, sh.id) }, 56); }, null);
      return h('li', { class: 'cc-wk-d' + (sh ? ' is-show' : '') }, [
        h('span', { class: 'cc-wk-dow', text: SB.time.fmt(d, 'dow3') }),
        h('span', { class: 'cc-wk-n' }, [String(SB.time.date(d).d), sh ? kt.pic(42, 32, ringArt(42, 32, 'd' + d), 'cc-wk-ring') : null]),
        sh ? h('span', { class: 'cc-wk-fly' }, thumb || C().ShowBadge({ show: sh, size: 26 })) : null,
        bill ? h('span', { class: 'cc-wk-bill' }, kt.mk((bill.label || L('idx.bills')).toUpperCase(), 15, { say: false })) : null
      ]);
    }

    /* ---------------- a show ---------------- */

    function shows(s, rep) {
      var ids = rep.shows || [];
      if (!ids.length) return none(noShowLine());
      return h('div', { class: 'cc-row' }, ids.map(function (id) { return showSheet(s, id); }));
    }

    function showSheet(s, id) {
      var kt = k(), sh = safe(function () { return SB.Shows.get(s, id); }, null), r, room, thumb = null, vword, stamps;
      if (!sh || !sh.result) return null;
      r = sh.result;
      room = sh.roomId && s.rooms ? s.rooms[sh.roomId] : null;
      if (SB.UI.parts && SB.UI.parts.flyerThumb) thumb = safe(function () { return SB.UI.parts.flyerThumb({ recipe: (sh.flyer && sh.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, id) }, 150); }, null);
      vword = r.verdict ? word('verdict.word.' + r.verdict, String(r.verdict).toLowerCase()) : (r.vsPar ? word('vsPar.' + r.vsPar, '') : '');
      stamps = (r.memory && r.memory.stamps) || [];
      return h('div', { class: 'cc-show' }, [
        h('figure', { class: 'cc-photo pz-paper', data: { sid: String(id) }, role: 'img', aria: { label: L('photo', { band: bandNames(s, sh).join(', ') }) }, style: { margin: 0 } }, [
          photo(s, sh, id),
          h('span', { class: 'cc-tape cc-tape--a', aria: { hidden: 'true' } }), h('span', { class: 'cc-tape cc-tape--b', aria: { hidden: 'true' } }),
          h('span', { class: 'cc-photo-lbl', aria: { hidden: 'true' }, text: (SB.time.fmt(sh.day, 'short') + (room ? ' · ' + room.name : '')).toUpperCase() })
        ]),
        h('div', { class: 'cc-show-side' }, [
          h('button', { type: 'button', class: 'cc-flyer pz-hl', aria: { label: SB.text.label('ui.week.openShow') + ', ' + SB.time.fmt(sh.day, 'short') },
                        on: { click: function () { SB.UI.go('show', { showId: id }); } } }, [
            h('span', { class: 'cc-flyer-img' }, thumb || C().ShowBadge({ show: sh, size: 32 }))
          ]),
          h('span', { class: 'cc-show-room', text: SB.time.fmt(sh.day, 'short') + (room ? ' · ' + room.name : '') }),
          vword ? h('span', { class: 'cc-verdict', role: 'img', aria: { label: vword } }, kt.pic(210, 78, kt.stampArt(vword.toUpperCase(), 210, 78, 'v' + id, TONER))) : null,
          stamps.map(function (x) { var t = word('stamp.' + x, String(x)); return h('span', { class: 'cc-verdict', role: 'img', aria: { label: t } }, kt.pic(120, 40, kt.stampArt(t, 120, 40, 'ms' + id + x, TONER))); })
        ]),
        h('div', { class: 'cc-show-main', data: { tut: 'closeout-read', 'tut-ref': id } }, [
          r.verdictLine ? h('p', { class: 'cc-verdict-line pz-paper', text: r.verdictLine }) : null,
          safe(function () { return costBlock(s, r); }, null),
          h('div', { class: 'cc-crowdcard' }, [kt.sheet('white', 'crowd' + id), crowd(r)]),
          ledger(r),
          safe(function () { return irlBlock(r); }, null),
          r.comments && r.comments.length ? h('div', { class: 'cc-quotes', role: 'group', aria: { label: L('idx.said') } }, r.comments.map(function (c) { return quote(s, c); })) : null,
          h('div', { class: 'cc-crowd-legend' }, [
            r.door && num(r.door.gross) ? h('span', { text: L('door', { paid: r.paid, price: SB.text.money(r.door.price || 0), gross: SB.text.money(r.door.gross) }) }) : null,
            h('span', null, [L('yourCut') + ' ', kt.mk(money(r.playerNet, true), 18, { say: true, fill: '#f4f2ea' })])
          ])
        ])
      ]);
    }

    /** "What this show cost you" (4.5): the money, the trust and the standing in sentences, beside the bank figure. */
    function costBlock(s, r) {
      var rep = (s.week && s.week.report) || {}, ppl = rep.people || [], net = num(r.playerNet) ? r.playerNet : null, lines = [], down = [], up = [], stand;
      if (net !== null) lines.push(net >= 0 ? L('costMoney', { net: money(net) }) : L('costLoss', { net: money(Math.abs(net)) }));
      ppl.forEach(function (p) { if (p && p.name) (p.d < 0 ? down : up).push(p.name); });
      if (down.length) lines.push(L('costTrust', { names: down.join(', '), verb: 'trust you less' }));
      if (up.length) lines.push(L('costTrust', { names: up.join(', '), verb: 'trust you more' }));
      if (!down.length && !up.length) lines.push(L('costTrustNone'));
      stand = r.vsPar === 'OVER' || r.vsPar === 'WAY_OVER' || r.verdict === 'GOOD' || r.verdict === 'TALKED' || r.verdict === 'WALL' ? L('standUp')
            : (r.vsPar === 'UNDER' || r.vsPar === 'WELL_UNDER' || r.verdict === 'ROUGH' || r.verdict === 'THIN' ? L('standDown') : L('standFlat'));
      lines.push(L('costStand', { text: stand }));
      return h('div', { class: 'cc-cost pz-paper' }, [h('h3', { class: 'cc-ledger-k', text: L('cost') }), lines.map(function (t) { return h('p', { style: { margin: 'calc(var(--p) * 3) 0 0' }, text: t }); })]);
    }

    /** Came against expected: two rows of heads, solid for kids, halftone for the middle, open for old heads. */
    function crowd(r) {
      var kt = k(), came = Array.isArray(r.byGen) ? r.byGen : null, par = r.par || {}, exp = Array.isArray(par.byGen) && par.byGen.length ? par.byGen : null,
          tot = Math.max(num(r.heads) ? r.heads : 0, num(par.heads) ? par.heads : 0, 1), unit = Math.max(1, Math.ceil(tot / 34));
      function row(label, gens, total, say) {
        var out = '', x = 2, g, n, i, list = gens || [total || 0, 0, 0];
        for (g = 0; g < 3; g++) {
          n = Math.round((num(list[g]) ? list[g] : 0) / unit);
          for (i = 0; i < n; i++) { out += kt.headArt(x + 7, 30, 7.5, gens ? g : 1, false); x += 13; }
          if (n) x += 6;
        }
        return h('div', { class: 'cc-crowd-row', role: 'img', aria: { label: say } }, [
          h('span', { class: 'cc-crowd-k', text: label }),
          h('span', { class: 'cc-crowd-heads' }, kt.pic(Math.max(10, x), 32, out)),
          h('span', { class: 'cc-crowd-n' }, num(total) ? counted('heads:' + label, Math.round(total), 26, 'n') : kt.mk('?', 26, { say: false }))
        ]);
      }
      function sayGens(gens, total) {
        return String(num(total) ? Math.round(total) : '?') + (gens ? ': ' + gens.map(function (v, i) { return word('gen.' + GENS[i] + '.short', '') + ' ' + Math.round(num(v) ? v : 0); }).join(', ') : '');
      }
      return h('div', { class: 'cc-crowd' }, [
        row(L('came'), came, r.heads, L('came') + ' ' + sayGens(came, r.heads)),
        row(L('expected'), exp, par.heads, L('expected') + ' ' + sayGens(exp, par.heads)),
        h('div', { class: 'cc-crowd-legend', aria: { hidden: 'true' } }, [
          GENS.map(function (g, i) { return h('span', null, [kt.pic(16, 18, kt.headArt(8, 17, 6.5, i, false)), word('gen.' + g + '.short', g.toLowerCase())]); }),
          unit > 1 ? h('span', { text: L('perHead', { n: unit }) }) : null,
          r.call && num(r.call.lo) ? h('span', { text: L('guessed', { lo: r.call.lo, hi: r.call.hi }) }) : null
        ])
      ]);
    }

    /** In real life: the show's lessons as scraps, what would have changed it, and what could not have been known. Older saves carry none. */
    function irlBlock(r) {
      var I = r && r.irl, T = SB.Content && SB.Content.irl, P = SB.UI.parts && SB.UI.parts.irl, kids = [], list = [], c, line;
      if (!I || !T || !P) return null;
      function scrap(txt, o) { var n = txt ? P(txt, o) : null; if (n) kids.push(n); }
      (I.lessons || []).forEach(function (key) {
        var p = String(key).split(':'), t0 = p[0], k0 = p[1];
        if (t0 === 'cause' && T.cause[k0]) scrap(T.cause[k0].line);
        else if (t0 === 'job' && SB.Content.jobs && SB.Content.jobs[k0]) scrap(SB.Content.jobs[k0].why);
        else if (t0 === 'settle' && T.settle && T.settle[k0]) scrap(T.settle[k0].line);
      });
      (I.whatIf || []).forEach(function (w) {
        c = T.cause[w.cause];
        line = c && c.whatIf ? SB.text.render(c.whatIf, { n: w.n, gen: w.gen || undefined, money: w.money === null ? undefined : w.money }) : '';
        if (line) list.push(h('li', { text: line }));
      });
      if (list.length) kids.push(h('div', { class: 'cc-irl-what' }, [h('p', { class: 'cc-irl-h', text: L('whatChanged') }), h('ul', null, list)]));
      if (I.unknown && T.cause[I.unknown.cause] && T.cause[I.unknown.cause].unknown) scrap(SB.text.render(T.cause[I.unknown.cause].unknown, { n: I.unknown.n }), { tone: 'hot' });
      return kids.length ? h('div', { class: 'cc-irl', role: 'group', aria: { label: L('irl') } }, kids) : null;
    }

    /** The ledger as three scraps: what you did, what you couldn't have known, luck. Par, the rest and the total ride along. */
    function ledger(r) {
      var kt = k(), rows = r.ledger || [], by = function (c) { return rows.filter(function (x) { return x.col === c; }); },
          yours = by('YOURS'), hid = by('HIDDEN'), luck = by('LUCK'), rest = by('REST'), lsum = 0;
      if (!rows.length) return null;
      luck.forEach(function (x) { if (num(x.d)) lsum += x.d; });
      function scrap(stk, seed, title, d, lines) {
        return thing(stk, seed, 'cc-ledger-s', [
          h('span', { class: 'cc-ledger-k', text: title }),
          kt.mk(signed(d), 30, { say: true }),
          lines && lines.length ? h('ul', { class: 'cc-ledger-sub' }, lines) : null
        ], { role: 'group', aria: { label: title + ' ' + signed(d) } });
      }
      return h('div', { class: 'cc-ledger' }, [
        scrap('bone', 'ly' + r.heads, L('yours'), yours.length ? yours[0].d : 0, null),
        scrap('blue', 'lh' + r.heads, L('hidden'), hid.length ? hid[0].d : 0,
              rest.filter(function (x) { return num(x.d) && Math.round(x.d) !== 0; }).map(function (x) { return h('li', { text: L('rest', { label: x.label || '', d: signed(x.d) }) }); })),
        scrap('pink', 'll' + r.heads, L('luck'), lsum, luck.length ? luck.map(function (x) { return h('li', { text: signed(x.d) + ' ' + (x.label || '') }); }) : [h('li', { text: L('noLuck') })])
      ]);
    }

    /** A comment: a quote bubble, the person's stamp under it and one cause sticker that opens the notebook there. */
    function quote(s, c) {
      var kt = k(), cause = c.cause ? word('notebook.cause.' + c.cause + '.title', String(c.cause).toLowerCase()) : null,
          p = c.byId && s.people ? s.people[c.byId] : null, b = !p && c.byId && s.bands ? s.bands[c.byId] : null;
      return h('figure', { class: 'cc-quote' + (c.dir < 0 ? ' is-down' : ''), style: { margin: 0 } }, [
        h('blockquote', { class: 'cc-quote-b' }, [
          kt.sheet(c.dir < 0 ? 'newsprint' : 'bone', 'q' + c.id + (c.byName || '')),
          kt.pic(22, 16, '<path d="M0 0L22 0L4 16Z" fill="' + (c.dir < 0 ? '#d9d5c7' : '#e7ddc4') + '"/>', 'cc-quote-tail'),
          c.starred ? kt.pic(28, 20, SB.DeskKit.arrow(2, 10, 24, 10, { seed: 'q' + c.id, sw: 3.4, head: 8, stroke: HOT }), 'cc-quote-star') : null,
          h('span', { text: c.text || '' })
        ]),
        h('figcaption', { class: 'cc-quote-by' }, [
          p ? C().PersonStamp({ person: p, size: 28 }) : (b ? C().BandMark({ band: b, size: 28 }) : null),
          h('span', { class: 'cc-quote-who', text: c.byName || '' }),
          cause ? (c.noteKey ? h('button', { type: 'button', class: 'cc-cause pz-hl', aria: { label: L('openNote', { cause: cause }) },
                                             on: { click: function () { SB.UI.go('notebook', { key: c.noteKey }); } } }, kt.strip(cause))
                             : h('span', { class: 'cc-cause' }, kt.strip(cause))) : null
        ])
      ]);
    }

    /** The photo of the night: the cutscenes' stage picture (real cut-outs, the band's name on the kick), on the paper
     *  the night was printed on. Painted once a show; the same canvas goes back up on every redraw. */
    function photo(s, sh, id) {
      var w = Math.min(2000, Math.round(720 * res())), key = id + '@' + w, c = photos[key], names, ctx;
      if (c) return c;
      c = photos[key] = cnv(w, Math.round(w * 0.625), 'cc-photo-cv');
      names = bandNames(s, sh);
      ctx = { seed: String(s.seed || '') + ':close:' + id, band: names[names.length - 1] || '', bands: names, paper: paperOf(sh.roomId || id) };
      function paint() { try { SB.Scenes.draw(c, 'STAGE_BAND', ctx); } catch (e) { SB.log('warn', 'close', 'photo: ' + String(e && e.message)); } }
      if (SB.Scenes && SB.Scenes.draw) { paint(); if (SB.Scenes.preload) safe(function () { SB.Scenes.preload(['STAGE_BAND'], paint, [ctx], 5000); }, null); }
      return c;
    }

    /** The shows still to come, as their flyers pinned up beside the week. */
    function coming(s, rep) {
      var kt = k(), to = rep.week * 7 + 6, list = Object.keys(s.shows || {}).map(function (i) { return s.shows[i]; }).filter(function (sh) {
        return sh && sh.day > to && sh.status !== 'PLAYED' && sh.status !== 'CANCELLED' && !sh.cancelled;
      }).sort(function (a, b) { return a.day - b.day; }).slice(0, 4);
      if (!list.length) return thing('white', 'nocoming', 'cc-nocoming', h('span', { text: L('nothingComing') }), { torn: true });
      return h('div', { class: 'cc-coming' }, list.map(function (sh, i) {
        var thumb = SB.UI.parts && SB.UI.parts.flyerThumb ? safe(function () { return SB.UI.parts.flyerThumb({ recipe: (sh.flyer && sh.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, sh.id) }, 112); }, null) : null;
        return h('button', { type: 'button', class: 'cc-flyer cc-coming-f pz-hl', aria: { label: SB.text.label('ui.week.openShow') + ', ' + SB.time.fmt(sh.day, 'short') },
                             on: { click: function () { SB.UI.go('show', { showId: sh.id }); } } }, [
          h('span', { class: 'cc-pin', aria: { hidden: 'true' } }, kt.pic(30, 32, pinArt(i % 2 ? '#ECD668' : '#e7ddc4'))),
          h('span', { class: 'cc-flyer-img' }, thumb || C().ShowBadge({ show: sh, size: 40 })),
          h('span', { class: 'cc-coming-d', text: SB.time.fmt(sh.day, 'short').toUpperCase() + ' · ' + L('inDays', { n: safe(function () { return SB.Week.daysTo(s, sh.day); }, sh.day - to) }) })
        ]);
      }));
    }

    /* ---------------- what was said, learned ---------------- */

    function newsOf(rep) { return (rep.news || []).filter(function (r) { return r && r.text; }); }
    function said(s, rep) {
      var news = newsOf(rep);
      if (!news.length) return none(L('nothingSaid'));
      return h('div', { class: 'cc-row cc-news' }, news.map(function (r, i) { return thing('newsprint', 'news' + i, '', h('span', { text: r.text || '' })); }));
    }

    function learned(s, rep) {
      var kt = k(), list = rep.learned || [];
      if (!list.length) return none(L('nothingLearned'));
      /* three headings, not a pile of links (fix-list 4.6): the bands, the crowd and the town, the rooms and the night */
      var GROUP = { draw: 'bands', cross: 'bands', live: 'bands', rel: 'bands', promo: 'bands', honest: 'bands',
                    aff: 'crowd', night: 'crowd', chan: 'crowd', heat: 'crowd', roomgen: 'rooms', roomcap: 'rooms', roomfit: 'rooms' },
          groups = { bands: [], crowd: [], rooms: [] }, kids = [];
      list.forEach(function (l, i) {
        var g = GROUP[String(l.key || '').split(':')[0]] || 'rooms';
        groups[g].push(thing('white', 'learn' + i, '', [
          h('p', { class: 'cc-learned-l', text: l.text || l.label || '' }),
          l.key ? h('button', { type: 'button', class: 'pz-hl', aria: { label: L('openNote', { cause: l.text || l.label || '' }) },
                                on: { click: function () { SB.UI.go('notebook', { key: l.key }); } } }, kt.strip(L('notebook'))) : null
        ], { torn: true }));
      });
      ['bands', 'crowd', 'rooms'].forEach(function (g) {
        if (!groups[g].length) return;
        kids.push(h('h4', { class: 'cc-learned-h', text: L('learnedH.' + g) }));
        kids.push(h('div', { class: 'cc-learned-g' }, groups[g]));
      });
      return h('div', { class: 'cc-learned' }, kids);
    }

    /* ---------------- money, people, you ---------------- */

    /** A stack of bills, taller the more there is; crossed through when the week lost money. */
    function cashArt(amount) {
      var n = Math.max(1, Math.min(10, Math.round(Math.abs(amount || 0) / 25))), out = '', i;
      for (i = 0; i < n; i++) out += '<g transform="rotate(' + ((i * 5) % 7 - 3) + ' 40 ' + (60 - i * 5) + ')"><rect x="6" y="' + (50 - i * 5) + '" width="68" height="22" fill="#e7ddc4" stroke="' + TONER + '" stroke-width="2"/>' +
                                  '<rect x="30" y="' + (54 - i * 5) + '" width="20" height="14" fill="url(#dk-ht2)" stroke="' + TONER + '" stroke-width="1.2"/></g>';
      if (amount < 0) out += '<path d="M2 ' + (40 - n * 5) + 'L78 78" stroke="' + TONER + '" stroke-width="5"/>';
      return out;
    }
    /** The cash box: a pay envelope on kraft, the bills sticking out of the top, through the copier. */
    function envelope() {
      var f = Math.max(1, res() * 0.85), key = 'env@' + f, c, x;
      if (art[key]) return art[key];
      c = cnv(Math.round(260 * f), Math.round(176 * f), 'cc-env-cv');
      try {
        x = c.getContext('2d');
        x.scale(f, f);
        x.save(); x.translate(130, 44); x.rotate(-0.07); x.fillStyle = gv(0.9); x.fillRect(-92, -34, 184, 66);
        x.strokeStyle = gv(0.35); x.lineWidth = 2; x.strokeRect(-85, -28, 170, 54); x.beginPath(); x.ellipse(0, -8, 15, 18, 0, 0, 6.3); x.fillStyle = gv(0.55); x.fill(); x.restore();
        x.fillStyle = gv(0.74); x.fillRect(8, 46, 244, 124);
        x.fillStyle = gv(0.64); x.beginPath(); x.moveTo(8, 170); x.lineTo(116, 100); x.lineTo(144, 100); x.lineTo(252, 170); x.closePath(); x.fill();
        x.strokeStyle = gv(0.18); x.lineWidth = 3; x.strokeRect(8, 46, 244, 124);
        x.lineWidth = 2; x.beginPath(); x.moveTo(8, 170); x.lineTo(116, 100); x.moveTo(252, 170); x.lineTo(144, 100); x.stroke();
      } catch (e) { /* a plain canvas is fine */ }
      art[key] = xerox(c, { paper: '#B8925C', cell: 3.2 * f, contrast: 1.3, alpha: true, seed: 'close-env' });
      return art[key];
    }
    function moneyPart(s, rep) {
      var kt = k(), m = rep.money || {}, owed = m.owedAhead || { total: null, lines: [] };
      function rline(a, b, cls) { return h('span', { class: 'cc-rc-l' + (cls ? ' ' + cls : '') }, [h('span', { text: a }), h('b', { text: b })]); }
      var showOwed = !SB.Rungs || SB.Rungs.shows(s, 'promisedCosts');
      /* every figure on this page has a sentence that says what it is and where it came from (1.16) */
      var says = h('div', { class: 'cc-says', style: { margin: '0 0 calc(var(--p) * 6)' } }, [
        num(m.bank) ? h('p', { class: 'cc-say', text: L('bankSay', { bank: money(m.bank) }) }) : null,
        num(m.net) ? h('p', { class: 'cc-say', text: L('netSay', { in: money(m.in), out: money(m.out), went: L(m.net > 0 ? 'netUp' : (m.net < 0 ? 'netDown' : 'netFlat')), net: money(Math.abs(m.net)) }) }) : null,
        (m.inLines || []).map(function (x) { return h('p', { class: 'cc-say cc-say--src', text: L('srcLine', { what: (SB.Content.ui.close.src || {})[x.cat] || String(x.cat).toLowerCase(), amount: money(x.amount) }) }); }),
        showOwed ? h('p', { class: 'cc-say', text: num(owed.total) && owed.total > 0 ? L('owedSay', { n: money(owed.total) }) : L('owedNone') }) : null
      ]);
      return h('div', { class: 'cc-money' }, [
        says,
        h('div', { class: 'cc-figure cc-env', role: 'img', aria: { label: word('pot.FUND', 'fund') + ' ' + money(m.fund) } }, [
          envelope(), h('span', { class: 'cc-env-amt' }, counted('fund', m.fund, 34, 'money')), h('span', { class: 'cc-env-k', text: word('pot.FUND', 'fund') })
        ]),
        m.bank === null || m.bank === undefined ? null : h('div', { class: 'cc-receipt', role: 'img', aria: { label: word('pot.BANK', 'bank') + ' ' + money(m.bank) } }, [
          h('span', { class: 'cc-rc-h', text: '* ' + L('receipt').toUpperCase() + ' *' }),
          h('span', { class: 'cc-rc-d', text: SB.time.fmt(rep.week * 7 + 6, 'short').toUpperCase() }),
          rline(L('moneyIn').toUpperCase(), money(m.in)), rline(L('moneyOut').toUpperCase(), money(m.out)),
          rline(word('pot.BANK', 'bank').toUpperCase(), money(m.bank), 'is-bal'),
          h('span', { class: 'cc-rc-bar' })
        ]),
        h('div', { class: 'cc-figure cc-net', role: 'img', aria: { label: L('net') + ' ' + money(m.net, true) + ', ' + L('moneyIn') + ' ' + money(m.in) + ', ' + L('moneyOut') + ' ' + money(m.out) } }, [
          num(m.net) && m.net > 0 && SB.NightScene && SB.NightScene.object ? safe(function () { return SB.NightScene.object('pile', { n: Math.max(1, Math.min(6, Math.round(m.net / 90))), bill: '20', seed: 'close', size: 0.85 }); }, null) : kt.pic(80, 84, cashArt(m.net)),
          h('span', { class: 'cc-net-tape' }, [counted('net', m.net, 30, 'moneys'), h('span', { text: L('net') })])
        ]),
        !showOwed ? null : thing('pink', 'owed', 'cc-owed', [
          h('span', { class: 'cc-ledger-k', text: L('owed') }),
          kt.mk(money(owed.total), 22),
          owed.lines && owed.lines.length ? h('ul', { class: 'cc-ious' }, owed.lines.map(function (l) {
            return h('li', null, [h('span', { text: SB.time.fmt(l.day, 'short') + ' ' + (l.label || '') }), h('b', { text: money(l.amount) })]);
          })) : null
        ], { torn: true })
      ]);
    }

    /* "Ash Rite trusts you more because you paid them what you said." (1.16): a reason on every trust line */
    function trustWhy(r, up) {
      var why = (SB.Content.ui.close.why || {})[r.k];
      return why ? L('trustBecause', { who: r.name || '', more: L(up ? 'trustMore' : 'trustLess'), why: why }) : (r.name || '') + ' ' + L(up ? 'trustUp' : 'trustDown') + '.';
    }

    function hasPeople(s, rep) { return (rep.people || []).length > 0 || ((s.week && s.week.log) || []).some(function (r) { return r.t === 'REGULARS'; }); }
    function people(s, rep) {
      var kt = k(), list = rep.people || [], regs = ((s.week && s.week.log) || []).filter(function (r) { return r.t === 'REGULARS'; });
      if (!list.length && !regs.length) return none(L('noPeople'));
      return h('div', { class: 'cc-people' }, [
        list.map(function (r, i) {
          var p = r.id && s.people ? s.people[r.id] : null, b = !p && r.id && s.bands ? s.bands[r.id] : null, up = r.d >= 0;
          return thing('white', 'tr' + i, 'cc-person', [
            p ? C().PersonStamp({ person: p, size: 30 }) : (b ? C().BandMark({ band: b, size: 30 }) : null),
            h('span', { class: 'cc-person-d', role: 'img', aria: { label: up ? SB.text.label('ui.c.more') : SB.text.label('ui.c.less') } },
              kt.pic(22, 22, SB.DeskKit.arrow(11, up ? 20 : 2, 11, up ? 2 : 20, { seed: 'ta' + i, sw: 3, head: 8 }))),
            h('span', { class: 'cc-person-why', text: trustWhy(r, up) }),
            r.stageChanged && r.stage ? h('span', { text: word('stage.' + r.stage, String(r.stage).toLowerCase()) }) : null
          ]);
        }),
        regs.length ? thing('bone', 'regs', '', [h('span', { class: 'cc-ledger-k', text: L('regulars') }), regs.map(function (r) { return h('p', { style: { margin: 'calc(var(--p) * 4) 0 0' }, text: r.text || '' }); })]) : null
      ]);
    }

    /** The mug seen from above: fuller and darker as the week wore on you. */
    function mugArt(v) {
      var f = Math.max(0, Math.min(1, (num(v) ? v : 0) / 100)), rr = 10 + f * 22;
      return SB.DeskKit.cutout([[40, 4], [62, 12], [74, 32], [72, 54], [58, 72], [36, 76], [16, 66], [6, 44], [10, 22], [22, 8]],
                               '<circle cx="40" cy="40" r="28" fill="#f4f2ea"/><circle cx="40" cy="40" r="' + rr.toFixed(1) + '" fill="#2a1f16"/>' +
                               '<circle cx="40" cy="40" r="' + rr.toFixed(1) + '" fill="url(#dk-htw1)"/>', { seed: 'mug', edge: 5 }) +
             '<path d="M74 34L90 30L92 50L72 52" fill="none" stroke="#f4f2ea" stroke-width="10"/><path d="M74 34L90 30L92 50L72 52" fill="none" stroke="' + TONER + '" stroke-width="5"/>';
    }
    function coffeeArt(v) {
      var k2 = SB.DeskKit, sv = num(v) ? v : 0, out = '', n = Math.min(4, Math.floor(sv / 22)), i;
      if (!k2 || !k2.cutouts) return mugArt(v);
      for (i = 0; i < n; i++) out += '<circle cx="' + (150 + i * 40) + '" cy="' + (50 + (i % 2) * 90) + '" r="40" fill="none" stroke="#7a6a52" stroke-opacity=".75" stroke-width="5" stroke-dasharray="' + (180 + i * 20) + ' 80"/>';
      if (sv >= 75) out += cupArt(k2, 238, 48, 36, false);
      if (sv >= 50) out += cupArt(k2, 238, 148, 36, false);
      return out + cupArt(k2, 96, 100, 80, true);
    }
    function you(s, rep) {
      var kt = k(), x = rep.stress || {}, zone = word('stress.' + x.zone, String(x.zone || '').toLowerCase());
      return h('div', { class: 'cc-you' }, [
        h('div', { class: 'cc-figure cc-mug', role: 'img', aria: { label: zone + ', ' + (num(x.from) ? x.from : '?') + ' > ' + (num(x.to) ? x.to : '?') } }, [
          kt.pic(290, 200, coffeeArt(x.to)),
          h('span', { class: 'cc-mug-tape' }, [kt.mk(zone.toUpperCase(), 26, { say: false }),
            !SB.Rungs || SB.Rungs.shows(s, 'stressLine') ? h('span', { text: L('stressLine', { to: num(x.to) ? x.to : '?', from: num(x.from) ? x.from : '?' }) }) : null])
        ]),
        x.causes && x.causes.length ? h('div', { class: 'cc-causes', role: 'group', aria: { label: L('causes') } }, x.causes.map(function (c, i) {
          return h('span', { class: 'cc-causechip' }, [kt.sheet(i % 2 ? 'bone' : 'white', 'cz' + i), h('span', { text: (c.label || '') + ' ' + kt.chipText({ k: 'STRESS', v: c.d }) })]);
        })) : null
      ]);
    }

    /* ---------------- the bills ---------------- */

    function billRecords(s) { return ((s.week && s.week.log) || []).filter(function (r) { return r.t === 'BILLS' || r.t === 'LADDER'; }); }

    function bills(s, rep) {
      var kt = k(), paid = billRecords(s), bv;
      if (!rep.bills) return none(L('billsNone'));
      if (paid.length) {
        return h('div', { class: 'cc-bills' }, [
          thing('white', 'paid', '', [h('span', { class: 'cc-verdict', role: 'img', aria: { label: L('paid') } }, kt.pic(120, 46, kt.stampArt(L('paid').toUpperCase(), 120, 46, 'paid', TONER))),
            paid.map(function (r) { return h('p', { style: { margin: 'calc(var(--p) * 4) 0 0' }, text: r.text || '' }); })])
        ]);
      }
      bv = safe(function () { return SB.Money.billsView(s); }, null) || rep.bills;
      if (choice.pay === null) choice.pay = (bv.lines || []).map(function (l) { return l.k; });
      return h('div', { class: 'cc-bills' }, [
        (bv.lines || []).map(function (l) {
          var on = choice.pay.indexOf(l.k) >= 0, name = l.label || word('bill.' + l.k, String(l.k).toLowerCase());
          return h('article', { class: 'cc-bill', aria: { label: name + ' ' + money(l.amount) } }, [
            kt.sheet('white', 'bill' + l.k),
            h('span', { class: 'cc-bill-top', text: name }),
            h('div', { class: 'cc-bill-body' }, [h('span', { class: 'cc-bill-due', text: L('due') }), kt.mk(money(l.amount), 30, { say: false })]),
            h('div', { class: 'cc-bill-stub' }, [
              h('button', { type: 'button', role: 'checkbox', class: 'cc-tick pz-hl', aria: { checked: on ? 'true' : 'false', label: L('paySay', { bill: name, amount: money(l.amount) }) },
                            on: { click: function () { choice.pay = choice.pay.filter(function (q) { return q !== l.k; }); if (!on) choice.pay.push(l.k); render(); } } }, [
                kt.pic(24, 22, kt.boxArt(on, 'bp' + l.k)), h('span', { text: L('pay') })
              ])
            ]),
            !on ? h('span', { class: 'cc-bill-stamp', aria: { hidden: 'true' } }, kt.pic(110, 40, kt.stampArt(L('putOff').toUpperCase(), 110, 40, 'po' + l.k, HOT))) : null
          ]);
        }),
        bv.lateFee ? h('article', { class: 'cc-bill', aria: { label: L('fee') + ' ' + money(bv.lateFee) } }, [
          kt.sheet('bone', 'billfee'), h('span', { class: 'cc-bill-top', text: L('fee') }),
          h('div', { class: 'cc-bill-body' }, [h('span', { class: 'cc-bill-due', text: L('due') }), kt.mk(money(bv.lateFee), 30, { say: false })])
        ]) : null,
        thing('blue', 'banksl', 'cc-bank', [
          h('span', { class: 'cc-ledger-k', text: word('pot.BANK', 'bank') }),
          h('dl', null, [
            h('dt', { text: L('total') }), h('dd', { text: money(bv.total) }),
            h('dt', { text: L('bank') }), h('dd', { text: money(bv.bank) }),
            h('dt', { text: L('after') }), h('dd', { text: money(bv.after, true) })
          ])
        ]),
        bv.ladder && bv.ladder.length ? h('div', { class: 'cc-ladder', role: 'group', aria: { label: L('short') } }, [
          h('p', { class: 'cc-ladder-k', text: L('short') }),
          bv.ladder.map(function (r) {
            var on = choice.ladder.indexOf(r.k) >= 0, name = r.label || word('ladder.' + r.k + '.name', r.k);
            return h('button', { type: 'button', role: 'checkbox', class: 'cc-tick pz-hl', disabled: !r.available, aria: { checked: on ? 'true' : 'false', label: name + (r.available ? '' : ', ' + (r.why || '')) },
                                 on: { click: function () { choice.ladder = choice.ladder.filter(function (q) { return q !== r.k; }); if (!on) choice.ladder.push(r.k); render(); } } }, [
              kt.pic(24, 22, kt.boxArt(on, 'ld' + r.k)), h('span', { text: name }),
              h('span', { class: 'cc-tick-says', text: r.available ? word('ladder.' + r.k + '.says', '') : (r.why || '') })
            ]);
          })
        ]) : null,
        h('div', { class: 'cc-go' }, [kt.tab({ label: L('payBills'), lead: kt.mk(L('payBills').toUpperCase(), 30, { say: false, cls: 'cc-go-mk' }), hot: true, cls: 'cc-tab--big cc-tab--sign', on: function () {
          var ch = { pay: choice.pay.slice(), late: [], ladder: choice.ladder.slice() };
          SB.UI.act(function (x) { return SB.Week.payBills(x, ch); });
        } })])
      ]);
    }

    /* The way on, in view without scrolling (0.7): at the top of the page, START WEEK n, or PAY ALL THE BILLS while the month's
     * bills are still due (they come first). The same presses as the ones lower down, which stay. */
    function payAll(s, rep) {
      var bv = safe(function () { return SB.Money.billsView(s); }, null) || rep.bills || {}, ch;
      if (choice.pay === null) choice.pay = (bv.lines || []).map(function (l) { return l.k; });
      ch = { pay: (bv.lines || []).map(function (l) { return l.k; }), late: [], ladder: choice.ladder.slice() };
      SB.UI.act(function (x) { return SB.Week.payBills(x, ch); });
    }
    function startNext() {
      var r = SB.UI.act(function (x) { return SB.Week.nextWeek(x); });
      if (r && r.ok !== false) SB.UI.go('week');
    }
    function topGo(s, rep) {
      var kt = k(), owing = rep.bills && !billRecords(s).length, label = owing ? L('payAll') : L('start', { n: rep.week + 2 });
      return h('div', { class: 'cc-go cc-go--top', style: { position: 'sticky', top: '0', zIndex: '5' } }, [
        kt.tab({ label: label, lead: kt.mk(label.toUpperCase(), 30, { say: false, cls: 'cc-go-mk' }), hot: true, cls: 'cc-tab--sign', tut: 'closeout-done',
                 on: owing ? function () { payAll(s, rep); } : startNext })
      ]);
    }

    /* " 1 late: Announce the show was not done by the day it was due." Names the job (1.16). */
    function lateText(s, n) {
      var names = (n.lateJobs || []).map(function (id) { var v = safe(function () { return SB.Jobs.get(s, id); }, null); return v && v.label ? v.label : ''; }).filter(Boolean);
      if (!(n.late > 0)) return '';
      return ' ' + L('lateLine', { n: n.late, what: names.length ? names.join(', ') : L('lateOne', { job: 'A job' }) });
    }

    /* the aim, in a sentence, on every week page after show one (4.1) */
    function aimLine(s) {
      var a = (s.player && s.player.showsPlayed > 0) ? safe(function () { return SB.Chapters.aim(s); }, null) : null;
      return a ? h('p', { class: 'cc-aim', style: { fontWeight: '700' }, text: L('aim', { text: a.text }) }) : null;
    }

    function next(s, rep) {
      var kt = k(), n = rep.next || {};
      return h('div', { class: 'cc-go' }, [
        kt.tab({ label: L('start', { n: rep.week + 2 }), lead: kt.mk(L('start', { n: rep.week + 2 }).toUpperCase(), 38, { say: false, cls: 'cc-go-mk' }),
                 hot: !(rep.bills && !billRecords(s).length), cls: 'cc-tab--big cc-tab--sign', on: startNext }),
        aimLine(s),
        h('p', { class: 'cc-go-line', text: L('next', { open: n.open || 0, replies: n.repliesDue || 0 }) + lateText(s, n) })
      ]);
    }

    render();
    return { update: render };
  }

  SB.UI.screen('close', { rail: 'week', title: 'ui.close.title', full: false, mount: mount });
})(SB);
