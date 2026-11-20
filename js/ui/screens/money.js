/* Scene Booker — ui/screens/money.js (UI-A2, redrawn as the cash envelope: design/spec/07-desk.md 2, 2b, 3)
 * The cash envelope opened on the black table. Its contents laid out, each one piece with table around it:
 *   the show fund ........ a fan of bills and coins out of the envelope, the old figure crossed out, the new one in marker
 *   your account ......... a creased bank statement
 *   sliding money ........ bill cut-outs with a lifted corner: drag one onto the other pile, or tap it (Money.move)
 *   each show ............ door-count slips and receipts on a spike; tap one to run the adding-machine tape for it
 *   the ledger ........... the adding-machine tape, with tear-off tabs for what the money was for
 *   what is owed ......... bills with due dates stamped, the nearest on top (Money.owedAhead)
 *   being short .......... the ways out as notes with what each costs written on them (Money.billsView ladder)
 *   the day job .......... a time card with tear-off tabs for next month (Week.setDayJob)
 *   over time ............ a marker line on a scrap of graph paper
 * Reads Money views, Shows.list, the legacy records' head counts and public state; changes state only through SB.UI.act.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.money = {
    title: 'Money',
    pots: 'Where the money is',
    fundSay: 'The cash box: {amount}',
    bankSay: 'Your account: {amount}',
    was: 'was {amount}',
    statement: 'statement',
    empty: 'empty',
    move: 'Move money',
    slideBank: 'to the bank',
    slideFund: 'to the cash box',
    slideHelp: 'drag a bill onto the other pile, or tap it',
    slideSay: 'Slide {amount} from {from} to {to}',
    all: 'all',
    toBank: 'Cash box to account',
    toFund: 'Account to cash box',
    owed: 'Owed ahead',
    owedTotal: 'owed {amount}',
    owedNone: 'Nothing owed in the next eight weeks.',
    due: 'due {day}',
    ledger: 'The ledger',
    tape: 'the tape',
    cat: 'What for',
    anyCat: 'everything',
    show: 'Show',
    anyShow: 'every show',
    openShow: 'open the show',
    tapeFor: 'just {show}',
    noLines: 'No money has moved yet.',
    shows: 'Shows',
    spike: 'the spike',
    noShows: 'No shows to count yet.',
    more: '{n} more under these',
    fewer: 'just the last few',
    slipSay: '{show}. The door: {door}. You: {you}. Tap to run the tape for it.',
    door: 'door {amount}',
    heads: '{n} in',
    coming: 'coming',
    line: 'Over time',
    lineHelp: 'solid: what happened. dotted: what is owed.',
    short: 'short {amount}',
    shortHelp: 'You pick a way out when the bills are paid at the end of the month.',
    dayJob: 'Your day job',
    dayJobNow: 'Now: {now}',
    dayJobNext: 'From next month: {next}',
    wages: 'this month {amount}',
    change: 'Change from next month'
  };

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function K() { return SB.DeskKit; }
  /* a drawn piece, shown w by ht in --p (the stage's unit) and photocopied fine enough for the screen: the drawing is made
     k times larger and scaled back down, so the copier's raster has the pixels this window's --p needs */
  function artP(inner, w, ht, cls) {
    var res = SB.Finish && SB.Finish.res ? SB.Finish.res() : 1, dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1,
        k = Math.max(1, Math.min(3, Math.ceil(res / Math.max(1.5, Math.min(2, dpr))))), el;
    el = D().art(k > 1 ? '<g transform="scale(' + k + ')">' + inner + '</g>' : inner, w * k, ht * k, cls);
    el.style.width = 'calc(var(--p) * ' + w + ')'; el.style.height = 'auto'; el.style.aspectRatio = w + ' / ' + ht;
    return el;
  }
  function L(key, ctx) { return SB.text.label('ui.money.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return has(key) ? SB.text.label(key) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'money', String(e && e.message)); return fb; } }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, ' '); }
  function f(n) { return Math.round(n * 10) / 10; }
  function money(n, signed) { var t = SB.text.money(Math.round(n || 0)); return signed && n > 0 ? '+' + t : t; }
  /* marker capitals have a plain hyphen, not the typeset minus */
  function mm(n, signed) { return money(n, signed).replace(/−/g, '-'); }
  var TONER = '#141413', PAPER = '#f4f2ea', BONE = '#e7ddc4';   /* inside the drawings: the copier prints these, so they are toner and copy paper */

  /* ---------------- drawn pieces (markup; D().art photocopies them) ---------------- */

  /** a bill, xeroxed: a toner frame, a screened oval, the figure in each corner; x, y top-left, turned rot about its centre */
  function billArt(x, y, w, ht, denom, seed, rot, stock) {
    var k = K(), inner, t = String(denom);
    inner = '<path d="M' + f(x + 5) + ' ' + f(y + 5) + 'h' + f(w - 10) + 'v' + f(ht - 10) + 'h' + f(-(w - 10)) + 'Z" fill="none" stroke="' + TONER + '" stroke-width="2"/>' +
            '<path d="M' + f(x + 8) + ' ' + f(y + 8) + 'h' + f(w - 16) + 'v' + f(ht - 16) + 'h' + f(-(w - 16)) + 'Z" fill="none" stroke="' + TONER + '" stroke-width="1" stroke-dasharray="2 2"/>' +
            k.ellipse(x + w / 2, y + ht / 2, ht * 0.3, ht * 0.32, { seed: seed + 'o', sw: 1.6, fill: 'url(#dk-ht3)', wob: 0.6 }) +
            (t ? k.type(t, x + 11, y + 22, 13, { bold: true }) + k.type(t, x + w - 11, y + ht - 12, 13, { bold: true, anchor: 'end' }) : '');
    return k.paper(x, y, w, ht, { seed: seed, stock: stock || '#d7dccb', rot: rot, cut: 1.2, sx: 3, sy: 4, burn: 0.5, inner: inner });
  }
  function coinArt(cx, cy, r, seed) {
    var k = K();
    return '<circle cx="' + f(cx + 2) + '" cy="' + f(cy + 3) + '" r="' + f(r) + '" fill="#000" fill-opacity=".6"/>' +
           k.ellipse(cx, cy, r, r, { seed: seed, fill: '#b9bab4', sw: 2, wob: 0.4 }) + k.ellipse(cx, cy, r * 0.7, r * 0.7, { seed: seed + 'i', sw: 1.2, wob: 0.3 }) +
           k.dots('M' + f(cx - r * 0.6) + ' ' + f(cy - r * 0.2) + 'L' + f(cx) + ' ' + f(cy - r * 0.7) + 'L' + f(cx + r * 0.3) + ' ' + f(cy - r * 0.3) + 'Z', 3, { white: true });
  }
  /** the fund split into bills and coins, for the picture only (display arithmetic over the one figure) */
  function breakDown(amount) {
    var left = Math.max(0, Math.round(amount || 0)), out = [], d = [100, 50, 20, 10, 5], i, coins;
    for (i = 0; i < d.length && out.length < 16; i++) while (left >= d[i] && out.length < 16) { out.push(d[i]); left -= d[i]; }
    coins = Math.min(6, left);
    return { bills: out, coins: coins };
  }
  /** a tally: groups of five strokes for n, wrapped */
  function tally(x, y, n, maxW, seed) {
    var k = K(), out = '', i, g, gx = x, gy = y, groups = Math.floor(n / 5), rest = n % 5, gw = 21;
    function grp(cnt, close) {
      var s = '', j;
      if (gx + gw > x + maxW) { gx = x; gy += 17; }
      for (j = 0; j < cnt; j++) s += k.line(gx + j * 4, gy, gx + j * 4 + 1, gy + 13, { seed: seed + gx + gy + j, sw: 1.8, over: 1 });
      if (close) s += k.line(gx - 3, gy + 11, gx + 17, gy + 2, { seed: seed + 'c' + gx + gy, sw: 1.8, over: 1 });
      gx += gw;
      return s;
    }
    for (i = 0; i < groups && i < 40; i++) out += grp(4, true);
    if (rest) out += grp(rest, false);
    g = gy - y + 18;
    return { svg: out, h: g };
  }

  function mount(root) {
    var cat = '', showId = '', allSlips = false, lastOwed = null, animed = false, lastKey = '';

    function act(fn) { return SB.UI.act(fn); }
    function keepFocus(fn) {
      var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
      fn();
      if (key) {
        el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null);
        /* a bill that can no longer be slid: keep the keyboard on its pile */
        if (el && el.disabled && el.parentNode) el = safe(function () { return el.parentNode.querySelector('button:not(:disabled)'); }, null) || el;
        if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } }
      }
    }

    function render() {
      var s = SB.UI.game(), bills;
      SB.UI.clear(root);
      if (!s) { root.appendChild(C().Empty({})); return; }
      bills = s.money.bank !== null && s.money.bank !== undefined;
      var bv = bills ? safe(function () { return SB.Money.billsView(s); }, null) : null;
      root.appendChild(h('div', { class: 'p2 p2-money', style: { '--hot': D().cityInk()[0] } }, [
        h('h1', { class: 'cb-sr', text: L('title') }),
        h('div', { class: 'p2-cols p2-cols--money' }, [
          h('div', { class: 'p2-col' }, [envelope(s), bills ? slider(s) : null, bills ? statement(s) : null]),
          h('div', { class: 'p2-col' }, [spike(s), tape(s)]),
          h('div', { class: 'p2-col' }, [owed(s, bv), shortNotes(s, bv), bills ? dayJob(s, bv) : null, spark(s)])
        ]),
        SB.UI.calKit && SB.UI.calKit.grainEl ? SB.UI.calKit.grainEl() : null
      ]));
      safe(function () { dress(bills ? safe(function () { return SB.Money.owedAhead(s); }, null) : null); });
    }

    /* the moves (js/ui/finish.js): the pieces slap down one after another when the envelope first opens, a new filter on
       the ledger tears across the tape, the total owed is stamped on and counted up; every button gets the highlighter */
    function dress() {
      var F = SB.Finish, hero, n, pieces, tp, key = cat + '|' + showId, first = !animed;
      Array.prototype.forEach.call(root.querySelectorAll('button, a[href], [role="button"]'), function (b) { b.classList.add('pz-hl'); });
      if (!F) return;
      tp = root.querySelector('.p2-tape');
      if (tp) F.scrollbar(tp);
      if (first) {
        pieces = Array.prototype.slice.call(root.querySelectorAll('.p2-col > *'));
        F.stagger(pieces, 3);
        pieces.forEach(function (el) { el.classList.add('mv-slap'); });
      } else if (tp && key !== lastKey) F.move(tp, 'wipe');
      lastKey = key; animed = true;
      hero = root.querySelector('.p2m-hero');
      if (hero) {
        n = parseInt(hero.getAttribute('data-n'), 10) || 0;
        if (n !== lastOwed) {
          F.move(hero, 'stamp', { delay: first ? 300 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
          F.countUp(hero.querySelector('.p2m-hero-n'), n, { from: first ? 0 : (lastOwed || 0), delay: (first ? 300 : 0) + 83, fmt: function (v) { return mm(v); } });
        }
        lastOwed = n;
      } else lastOwed = null;
    }

    /* ---------------- the pieces: flat copy paper, typed in Courier, no texture under a figure ---------------- */
    function KT() { return SB.UI.Kit; }
    function card(paper, cls, kids, tape, seed) { return KT().card({ paper: paper, cls: 'p2m-card ' + (cls || ''), tape: tape || [], seed: seed || cls }, kids); }
    function tag(text, cls) { return KT().label(text, undefined, { cls: cls }); }
    function type(text, cls, tagName) { return h(tagName || 'p', { class: 'p2m-t ' + (cls || ''), text: text }); }
    function big(text, size, cls) { return KT().headline(text, { size: size, tag: 'p', cls: cls }); }

    /* ---------------- the show fund: the envelope and its bills ---------------- */
    function envelope(s) {
      var k = K(), fund = s.money.fund || 0, W = 400, H = 300, out = '', b = breakDown(fund), i, n, last = null, prev = null, lines, cx, ang;
      lines = safe(function () { return SB.Money.ledger(s, {}); }, []);
      for (i = lines.length - 1; i >= 0; i--) if (lines[i].pot === 'FUND') { last = lines[i]; break; }
      if (last && num(last.amount)) prev = fund - last.amount;
      out += k.paper(30, 120, 340, 170, { seed: 'env', stock: 'manila', burn: 0.4, cut: 2,
        inner: '<path d="M30 120L200 220L370 120" fill="none" stroke="' + TONER + '" stroke-opacity=".35" stroke-width="2"/>' });
      out += '<path d="M36 124L200 40L364 124Z" fill="#c9b175" stroke="#2c2b28" stroke-opacity=".4" stroke-width="2"/>';
      n = b.bills.length; cx = 200;
      for (i = 0; i < n; i++) {
        ang = n > 1 ? -26 + 52 * i / (n - 1) : 0;
        out += '<g transform="rotate(' + f(ang) + ' ' + cx + ' 250)">' + billArt(cx - 62, 72 - (i % 3) * 3, 124, 58, '', 'eb' + i, 0) + '</g>';
      }
      for (i = 0; i < b.coins; i++) out += coinArt(70 + i * 26, 274 - (i % 2) * 8, 11, 'ec' + i);
      return h('div', { class: 'p2-envelope p2m-env', data: { drop: 'FUND' }, role: 'img', aria: { label: L('fundSay', { amount: money(fund) }) + (prev !== null && prev !== fund ? ', ' + L('was', { amount: money(prev) }) : '') } }, [
        artP(out, W, H, 'p2m-envart'),
        tag(word('pot.FUND', 'cash box'), 'p2m-envtag'),
        h('div', { class: 'p2m-fig pz-paper' }, [
          prev !== null && prev !== fund ? h('span', { class: 'p2m-old', text: mm(prev) }) : null,
          h('span', { class: 'p2m-now', text: mm(fund) }),
          fund <= 0 ? h('span', { class: 'p2m-empty', text: L('empty') }) : null
        ])
      ]);
    }

    /* ---------------- your account: a statement on flat paper ---------------- */
    function statement(s) {
      var bank = s.money.bank || 0,
          lines = safe(function () { return SB.Money.ledger(s, {}); }, []).filter(function (l) { return l.pot === 'BANK'; }).slice(-4).reverse();
      return h('div', { class: 'p2-statement p2m-stmtwrap', data: { drop: 'BANK' }, role: 'img', aria: { label: L('bankSay', { amount: money(bank) }) } }, [
        card('white', 'p2m-stmt', [
          h('div', { class: 'p2m-stmthead' }, [type(L('statement').toUpperCase(), 'p2m-b'), type(String(s.player && s.player.bookingName || '').toUpperCase(), 'p2m-s')]),
          h('p', { class: 'p2m-stmtfig', text: mm(bank) }),
          h('ul', { class: 'p2m-rows' }, lines.map(function (l) {
            return h('li', { class: 'p2m-row' }, [
              h('span', { class: 'p2m-d', text: SB.time.fmt(l.day, 'md') }),
              h('span', { class: 'p2m-w', text: l.memo || word('money.' + l.cat, lower(l.cat)) }),
              h('span', { class: 'p2m-a', text: money(l.amount, true) })
            ]);
          }))
        ], ['tl'], 'stmt'),
        tag(word('pot.BANK', 'your account'), 'p2m-envtag')
      ]);
    }

    /* ---------------- sliding bills between the piles ---------------- */
    function slider(s) {
      var fund = s.money.fund || 0, bank = s.money.bank || 0;
      function row(from, have) {
        var to = from === 'FUND' ? 'BANK' : 'FUND', list = [10, 20, 50, 100].map(function (a) { return { a: a, t: '$' + a }; });
        list.push({ a: have, t: L('all'), all: true });
        return h('div', { class: 'p2-sliderow', role: 'group', aria: { label: from === 'FUND' ? L('toBank') : L('toFund') } }, [
          type((from === 'FUND' ? '→ ' + L('slideBank') : '← ' + L('slideFund')).toUpperCase(), 'p2m-k kt-small'),
          h('div', { class: 'p2-bills' }, list.map(function (it, i) {
            var amt = it.a, ok = amt > 0 && have >= amt,
                el = h('button', { type: 'button', class: 'p2m-bill pz-paper cc-lift' + (it.all ? ' is-all' : '') + (from === 'FUND' ? '' : ' is-bank'), disabled: !ok,
                                   style: { '--r': (i % 2 ? 1.4 : -1.4) + 'deg' }, data: { fk: 'sl-' + from + '-' + i },
                                   aria: { label: L('slideSay', { amount: money(amt), from: word('pot.' + from, from), to: word('pot.' + to, to) }) },
                                   on: { click: function () { slide(from, to, amt); } } }, h('span', { text: it.t }));
            if (ok) D().draggable(el, { from: from, amount: amt }, function (target, p) { if (target && target !== p.from) slide(p.from, target, p.amount); });
            return el;
          }))
        ]);
      }
      return h('div', { class: 'p2-slider' }, [row('FUND', fund), row('BANK', bank), type(L('slideHelp'), 'p2m-help kt-strip kt-pencil')]);
    }

    /* ---------------- each show: slips, one under the other ---------------- */
    function spike(s) {
      var list = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED', 'PLAYED'] }); }, []).slice().sort(function (a, b) { return b.day - a.day; }),
          recs = (s.legacy && s.legacy.records) || {}, cap = allSlips ? 60 : 4;
      if (!list.length) return h('section', { class: 'p2-spike' }, card('bone', 'p2m-note', [type(L('noShows'))], ['top'], 'noshows'));
      return h('section', { class: 'p2-spike', aria: { label: L('shows') } }, [
        tag(L('shows'), 'p2m-head'),
        h('ul', { class: 'p2m-slips' }, list.slice(0, cap).map(function (x, i) {
          var a = safe(function () { return SB.Money.showAccounts(s, x.id); }, null), rec = recs[x.id], room = x.roomId && s.rooms[x.roomId] ? s.rooms[x.roomId].name : '',
              played = x.status === 'PLAYED', heads = rec && num(rec.heads) ? rec.heads : (x.result && num(x.result.heads) ? x.result.heads : null),
              you = a && num(a.player) ? a.player : null, door = a && num(a.door) ? a.door : null, name = SB.time.fmt(x.day, 'short') + (room ? ', ' + room : '');
          return h('li', { class: 'p2m-slipli' }, h('button', { type: 'button', class: 'p2m-slip pz-paper' + (showId === x.id ? ' is-on' : '') + (i % 2 ? ' is-bone' : ''), style: { '--r': ((i * 37) % 7 - 3) * 0.5 + 'deg' },
              aria: { label: L('slipSay', { show: name, door: door === null ? '?' : money(door), you: you === null ? '?' : money(you, true) }), pressed: String(showId === x.id) },
              data: { fk: 'slip-' + x.id }, on: { click: function () { showId = showId === x.id ? '' : x.id; keepFocus(render); } } }, [
            h('span', { class: 'p2m-slipa' }, [h('b', { text: SB.time.fmt(x.day, 'md') }), h('span', { text: room.replace(/^the /i, '').toUpperCase() })]),
            h('span', { class: 'p2m-slipb' }, [
              h('span', { class: 'p2m-slipn', text: played && heads !== null ? L('heads', { n: heads }) : L('coming').toUpperCase() }),
              door !== null ? h('span', { class: 'p2m-slipn', text: L('door', { amount: money(door) }) }) : null
            ]),
            you !== null && played ? h('span', { class: 'p2m-slipyou' + (you < 0 ? ' is-neg' : ''), text: mm(you, true) }) : null
          ]));
        })),
        list.length > 4 ? KT().button({ label: allSlips ? L('fewer') : L('more', { n: list.length - 4 }), fk: 'slips-more', on: function () { allSlips = !allSlips; keepFocus(render); } }) : null
      ]);
    }

    /* ---------------- the ledger: an adding-machine tape ---------------- */
    function tape(s) {
      var all = safe(function () { return SB.Money.ledger(s, {}); }, []), cats = {}, filter = {}, rows, sh = showId && s.shows ? s.shows[showId] : null, ids;
      all.forEach(function (l) { cats[l.cat] = true; });
      if (cat) filter.cat = cat;
      if (showId) filter.showId = showId;
      rows = safe(function () { return SB.Money.ledger(s, filter); }, []).slice().reverse();
      ids = [{ id: '_all', label: L('anyCat') }].concat(Object.keys(cats).map(function (c) { return { id: c, label: word('money.' + c, lower(c)) }; }));
      return h('section', { class: 'p2-tapewrap', aria: { label: L('ledger') } }, [
        tag(L('ledger'), 'p2m-head'),
        KT().tabs({ list: ids, value: cat || '_all', label: L('cat'), idPrefix: 'p2c-', cls: 'p2m-cattabs', on: function (id) { cat = id === '_all' ? '' : id; keepFocus(render); } }),
        sh ? h('div', { class: 'p2m-tapefor' }, [
          type(L('tapeFor', { show: SB.time.fmt(sh.day, 'short') }).toUpperCase(), 'kt-small'),
          KT().button({ label: L('openShow'), fk: 'open-show', on: function () { SB.UI.go('show', { showId: showId }); } }),
          KT().button({ label: L('anyShow'), fk: 'all-shows', on: function () { showId = ''; keepFocus(render); } })
        ]) : null,
        h('div', { class: 'p2-tape p2m-tape', tabindex: '0', role: 'list', aria: { label: L('tape') } }, rows.length ? rows.slice(0, 200).map(function (l) {
          return h('p', { class: 'p2-tapeline p2m-tl' + (l.amount < 0 ? ' is-out' : ''), role: 'listitem' }, [
            h('span', { class: 'p2-tl-d', text: SB.time.fmt(l.day, 'md') }),
            h('span', { class: 'p2-tl-w', text: (l.memo || word('money.' + l.cat, lower(l.cat))) + (l.pot === 'BANK' ? ' · ' + word('pot.BANK', 'bank') : '') }),
            h('span', { class: 'p2-tl-a', text: money(l.amount, true) })
          ]);
        }) : [h('p', { class: 'p2-tapeline p2m-tl', text: L('noLines') })])
      ]);
    }

    /* ---------------- what is owed: bills, nearest on top ---------------- */
    /* the one loud thing: the total, big, askew, on a torn scrap (css .p2m-hero; dress() stamps it and counts it up) */
    function hero(total, short) {
      return h('div', { class: 'p2m-hero pz-paper' + (short ? ' is-short' : '') + (total ? '' : ' is-none'), role: 'img', data: { n: String(total) }, aria: { label: L('owed') + ': ' + money(total) } }, [
        h('span', { class: 'p2m-hero-k', text: L('owedTotal', { amount: '' }).replace(/\s+$/, '').toUpperCase() }),
        h('span', { class: 'p2m-hero-n', text: mm(total) })
      ]);
    }
    function owed(s, bv) {
      var o = safe(function () { return SB.Money.owedAhead(s); }, { total: null, lines: [] }), lines = (o.lines || []).slice().sort(function (a, b) { return a.day - b.day; }),
          short = bv && bv.after < 0;
      if (!lines.length) return h('section', { class: 'p2-owed' }, [hero(o.total || 0, false), card('bone', 'p2m-note', [type(L('owedNone'))], [], 'ow0')]);
      return h('section', { class: 'p2-owed', aria: { label: L('owed') } }, [
        hero(o.total || 0, !!short),
        h('ul', { class: 'p2m-bills' }, lines.slice(0, 5).map(function (l, i) {
          var due = L('due', { day: SB.time.fmt(l.day, 'md') }), days = l.day - s.clock.day, soon = i === 0 && days <= 7;
          return h('li', { class: 'p2m-billli', role: 'img', aria: { label: (l.label || '') + ', ' + money(l.amount) + ', ' + due } },
            card(i === 0 ? 'white' : (i % 2 ? 'bone' : 'canary'), 'p2m-bill-c' + (soon ? ' is-soon' : ''), [
              h('p', { class: 'p2m-bl', text: String(l.label || '').toUpperCase() }),
              h('div', { class: 'p2m-bb' }, [h('span', { class: 'p2m-due', text: String(due).toUpperCase() }), h('span', { class: 'p2m-amt', text: mm(l.amount) })])
            ], [], 'owb' + i + l.day));
        }))
      ]);
    }

    /* ---------------- being short: the ways out as notes ---------------- */
    function shortNotes(s, bv) {
      if (!bv || !(bv.after < 0) || !bv.ladder || !bv.ladder.length) return null;
      var stocks = ['goldenrod', 'pink', 'bone', 'green', 'white'];
      return h('section', { class: 'p2-short', aria: { label: L('short', { amount: money(-bv.after) }) } }, [
        h('div', { role: 'img', aria: { label: L('short', { amount: money(-bv.after) }) } }, card('canary', 'p2m-owedhead', [big(L('short', { amount: mm(-bv.after) }), 30)], ['tl'], 'shth')),
        h('ul', { class: 'p2m-ways' }, bv.ladder.map(function (r, i) {
          var name = r.label || word('ladder.' + r.k + '.name', lower(r.k)), says = r.available ? word('ladder.' + r.k + '.says', '') : (r.why || '');
          return h('li', { class: 'p2-waynote p2m-wayli' + (r.available ? '' : ' is-out'), role: 'img', aria: { label: name + '. ' + says } },
            card(stocks[i % stocks.length], 'p2m-way', [h('p', { class: 'p2m-wn', text: name }), says ? h('p', { class: 'p2m-ws', text: says }) : null], [i % 2 ? 'tr' : 'tl'], 'wn' + r.k));
        })),
        type(L('shortHelp'), 'p2m-help kt-strip kt-pencil')
      ]);
    }

    /* ---------------- the day job: a time card ---------------- */
    function dayJob(s, bv) {
      var P = s.player || {}, now = P.dayJob, next = P.dayJobNext || P.dayJob, hrs = now === 'FULL' ? 10 : (now === 'PART' ? 5 : 0), boxes = [], i;
      for (i = 0; i < 10; i++) boxes.push(h('i', { class: i < hrs ? 'is-on' : '' }));
      return h('section', { class: 'p2-dayjob', aria: { label: L('dayJob') } }, [
        h('div', { role: 'img', aria: { label: L('dayJobNow', { now: word('dayJob.' + now, lower(now)) }) + (P.dayJobNext ? '. ' + L('dayJobNext', { next: word('dayJob.' + P.dayJobNext, lower(P.dayJobNext)) }) : '') } },
          card('kraft', 'p2m-time', [
            type(L('dayJob').toUpperCase(), 'kt-small'),
            big(word('dayJob.' + now, lower(now)), 32),
            h('div', { class: 'p2m-boxes' }, boxes),
            bv && num(bv.wages) ? type(L('wages', { amount: money(bv.wages) })) : null
          ], ['tl'], 'tcard')),
        KT().tabs({ list: Object.keys(SB.Enums.DAY_JOB).map(function (key) { return { id: key, label: word('dayJob.' + key, lower(key)) }; }), value: next, label: L('change'), idPrefix: 'p2d-', cls: 'p2m-djtabs',
                    on: function (key) { if (next !== key) act(function (x) { return SB.Week.setDayJob(x, key); }); } })
      ]);
    }

    /* ---------------- over time: a marker line on a scrap of graph paper ---------------- */
    function spark(s) {
      var k = K(), lines = safe(function () { return SB.Money.ledger(s, {}); }, []), total = (s.money.fund || 0) + (s.money.bank || 0), pts = [], run, i, o, W = 280, Hh = 120,
          lo, hi, X, Y, solid = [], dot = [], grid = '', inner = '';
      run = total;
      for (i = lines.length - 1; i >= 0 && pts.length < 40; i--) { pts.unshift({ v: run, o: true }); run -= lines[i].amount || 0; }
      if (!pts.length) pts.push({ v: total, o: true });
      o = safe(function () { return SB.Money.owedAhead(s); }, { lines: [] });
      run = total;
      (o.lines || []).forEach(function (l) { run -= l.amount || 0; pts.push({ v: run, o: false }); });
      lo = Math.min(0, Math.min.apply(null, pts.map(function (p) { return p.v; })));
      hi = Math.max(1, Math.max.apply(null, pts.map(function (p) { return p.v; })));
      X = function (j) { return 14 + j * (W - 28) / Math.max(1, pts.length - 1); };
      Y = function (v) { return 12 + (hi - v) / (hi - lo) * (Hh - 24); };
      pts.forEach(function (p, j) { (p.o ? solid : dot).push([X(j), Y(p.v)]); });
      if (solid.length && dot.length) dot.unshift(solid[solid.length - 1]);
      for (i = 8; i < W; i += 14) grid += '<path d="M' + i + ' 2V' + (Hh - 2) + '" stroke="#5a7fa6" stroke-opacity=".3" stroke-width=".8"/>';
      for (i = 8; i < Hh; i += 14) grid += '<path d="M2 ' + i + 'H' + (W - 2) + '" stroke="#5a7fa6" stroke-opacity=".3" stroke-width=".8"/>';
      inner += grid;
      if (lo < 0) inner += '<path d="M8 ' + f(Y(0)) + 'H' + (W - 8) + '" stroke="' + TONER + '" stroke-width="1.4" stroke-dasharray="4 3"/>';
      if (solid.length > 1) inner += k.path(solid, { seed: 'sp1', sw: 3 });
      if (dot.length > 1) inner += k.path(dot, { seed: 'sp2', sw: 2.4, dash: '3 5' });
      return h('section', { class: 'p2-spark', role: 'img', aria: { label: L('line') + '. ' + L('lineHelp') } },
        card('white', 'p2m-graph', [artP(inner, W, Hh, 'p2m-graphart'), type(L('lineHelp'), 'kt-pencil p2m-gcap')], ['tr'], 'grph'));
    }

    render();
    return { update: function () { keepFocus(render); } };
  }

  SB.UI.screen('money', { rail: 'money', title: 'ui.money.title', full: false, mount: mount });
})(SB);
