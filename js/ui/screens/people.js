/* Scene Booker — ui/screens/people.js (the matchbook close-up, 07-desk.md sections 2 and 2b)
 * Picked up, the matchbook spills the people who help onto the black table: each is a matchbook, a torn corner or a scrap
 * with their name and number scribbled on it, their stamp (SB.Identity.personStamp), what they do, how they have done
 * as tally marks (a stroke when it got done, a short slash when it got done some other way, a pencil stroke when they
 * told you they could not, a cross when they went quiet), a sharpie heart filled as far as you trust each other, and what
 * you owe each other as IOU slips. Asking someone to work a show is handing them a note: a tear-off tab per show that
 * still needs them. The regulars are the sign-up sheet by the door, each name in its own hand, and a count of heads.
 * Other bookers and the people out of town are scraps of their own.
 * One sign per kind of action (2b): tear-off tabs choose (the four piles, the notes you hand over). Reading matter
 * carries none. Reads People.circle / crew / card, Crowd.regulars, Rooms.bookers, Territory.contacts, Shows.list;
 * acts through SB.UI.act with Mail.ask (CREW) and Shows.setCrew, the same asks the show's clipboard makes.
 * Nothing here is a staff screen: no wages table, no roster, no scores.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.people = {
    title: 'People',
    tabHelp: 'who helps',
    tabRegulars: 'regulars',
    tabBookers: 'other bookers',
    tabOut: 'out of town',
    helpEmpty: 'nobody yet. people offer once they\'ve seen a few of your shows.',
    helpTaste: 'likes',
    helpWont: 'won\'t touch',
    helpLast: 'the last few times',
    helpTrust: 'between you: {stage}',
    helpReport: 'last report',
    helpWhere: 'from {where}',
    helpMet: 'a face from {origin}',
    iou: 'IOU',
    note: 'hand them a note',
    noteAsk: '{role} {day}',
    noteAskSay: 'Ask {name} to do {role} on {day}, {pay}',
    notePut: 'put them on {day}',
    notePutSay: '{name} said yes: put them on {role} for {day}',
    noteAsked: 'asked {day}',
    noteBusy: 'busy {day}',
    roles: { sound: 'sound', security: 'security' },
    regIntro: 'the sign-up sheet by the door.',
    regHead: 'SIGN UP',
    regNone: 'nobody has signed it yet. regulars come from shows that went well.',
    regTotal: 'about {n} come back for you',
    regDrifting: 'about {n} are drifting off',
    regGen: 'who they are',
    regGenre: 'what they come for',
    regZone: 'where they live',
    regFloor: 'on a bad night, expect',
    regMailing: 'on the mailing list',
    regLapsed: 'hasn\'t been around',
    regMore: 'and a few more you know by sight',
    regUnit: '1 = {n}',
    bookersEmpty: 'you have not met any other bookers yet.',
    outEmpty: 'you do not know anyone out of town yet. contacts come from shows with bands from other towns.',
    books: 'books',
    rooms: 'rooms',
    owesYou: 'owes you',
    youOwe: 'you owe',
    pile: '{n}. {what}',
    unknown: '?'
  };

  function L(key, ctx) { return SB.text.label('ui.people.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function Kc() { return SB.UI.calKit; }
  function K() { return SB.DeskKit; }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function game() { return SB.UI.game(); }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function has(path) { return SB.text.has('strings.' + path); }
  function lbl(path, fb) { return has(path) ? SB.text.label(path) : (fb || ''); }
  function money(n) { return SB.text.money ? SB.text.money(n || 0) : '$' + Math.round(n || 0); }
  function f(n) { return Math.round(n * 10) / 10; }

  var TONER = '#141413', PAPER = '#f4f2ea', PENCIL = '#6d6a62';
  var HANDS = [TONER, '#2F4FB5', '#3a3a37', TONER, '#6d6a62'];
  var STOCKS = ['white', 'bone', 'goldenrod', 'white', 'pink', 'bone', 'blue'];

  /* a phone number's shape, scribbled: the made-up exchange every film uses, and four seeded digits */
  function numberScribble(id) {
    var r = SB.rng.make('num:' + id), d = '', i;
    for (i = 0; i < 4; i++) d += String(Math.floor(r.next() * 10));
    return '555-' + d;
  }

  function displayNames(s, n) {
    var rng = SB.rng.make('regulars:' + (s.citySlug || '') + ':' + (s.clock ? Math.floor(s.clock.week / 13) : 0)), pools = (SB.Content.names && SB.Content.names.first) || {},
        out = [], gens = ['KIDS', 'MIDDLE', 'OLD'], used = {}, i, pool, fn, l;
    for (i = 0; i < n * 2 && out.length < n; i++) {
      pool = pools[gens[Math.floor(rng.next() * 3)]] || [];
      if (!pool.length) break;
      fn = pool[Math.floor(rng.next() * pool.length)];
      l = String.fromCharCode(65 + Math.floor(rng.next() * 26));
      if (used[fn + l]) continue;
      used[fn + l] = 1;
      out.push(fn + ' ' + l + '.');
    }
    return out;
  }

  /* ---------------- portraits: cut-out photos only, picked from the person's id ---------------- */
  var FACES = ['singer-01', 'singer-02', 'singer-03', 'singer-04', 'singer-05', 'singer-06', 'singer-07', 'singer-08', 'singer-09', 'singer-10',
               'guitar-01', 'guitar-02', 'guitar-03', 'guitar-04', 'guitar-05', 'guitar-06', 'bass-01', 'bass-02', 'bass-03', 'bass-04', 'bass-05',
               'stand-01', 'stand-02', 'stand-03', 'back-01', 'back-02', 'back-03', 'back-04'];
  var PAPERS = ['canary', 'pink', 'blue', 'green', 'salmon', 'lilac', 'goldenrod'];
  function hash(str) { var n = 7, i; str = String(str); for (i = 0; i < str.length; i++) n = (n * 31 + str.charCodeAt(i)) % 1000003; return n; }
  function portrait(id, i, w, hh) {
    var n = hash(id), ids = [FACES[n % FACES.length]];
    if (!SB.UI.Kit || !SB.UI.Kit.photo) return null;
    return SB.UI.Kit.photo({ ids: ids, w: w || 300, h: hh || 200, paper: PAPERS[(n >> 3) % PAPERS.length], tape: ['top'], rot: ((n % 5) - 2) * 0.6, seed: 'pp' + id, cls: 'pp-portrait', flip: n % 2 === 1 });
  }

  /* ---------------- drawn bits ---------------- */

  /** how they have done, as tally marks: a stroke (done), a short slash (done another way), a pencil stroke (told you
   *  they could not), a cross (went quiet) */
  function tallyArt(last) {
    var out = '', x = 6, k = K();
    last.forEach(function (o, i) {
      var sd = 'tl' + i + o;
      if (o === 'DONE') out += k.line(x, 4, x + 2, 28, { seed: sd, sw: 3, over: 1 });
      else if (o === 'DIFFERENT') out += k.line(x - 2, 20, x + 5, 8, { seed: sd, sw: 3, over: 1 });
      else if (o === 'NOT_DONE_TOLD') out += k.line(x, 4, x + 2, 28, { seed: sd, sw: 1.6, stroke: PENCIL, over: 1, dash: '3 3' });
      else out += k.xout(x - 4, 8, 12, 16, { seed: sd, sw: 2.6 });
      x += i % 5 === 4 ? 18 : 11;
    });
    return { svg: out, w: Math.max(30, x + 6) };
  }
  /** an IOU slip: a cut strip with IOU in marker and the engine's sentence typed under it */
  function iouSlip(text, seed, theyOwe) {
    return h('div', { class: 'pp-iou' + (theyOwe ? ' is-theirs' : ''), role: 'note', style: { '--r': (theyOwe ? -3 : 2.5) + 'deg' } }, [
      D().art(D().marker(L('iou'), 4, 26, 22, { seed: 'iou' + seed }), 64, 32),
      h('span', { class: 'pp-typed', text: text })
    ]);
  }
  function stampArt(id, name, s) {
    var m = safe(function () { return SB.Identity.personStamp({ id: id, first: String(name || '').split(' ')[0], last: String(name || '').split(' ').slice(1).join(' ') }, s); }, '');
    return m ? D().art('<g style="color:' + TONER + '">' + D().place(m, 2, 2) + '</g>', s + 4, s + 4, 'pp-stamp') : null;
  }
  /** a figure lettered in marker as its own little picture */
  function fig(t, s) { return D().art(D().marker(String(t), 4, s + 2, s, { seed: 'fg' + t }), D().mw(String(t), s) + 12, s + 10, 'pp-fig'); }

  SB.UI.screen('people', {
    rail: 'people', title: 'ui.people.title', full: false,
    mount: function (root, params) {
      var tab = params && params.tab ? params.tab : 'help', wrap = h('section', { class: 'pp' }), tabsEl = h('div', { class: 'pp-tabs' }), body = h('div', { class: 'pp-body' });
      root.appendChild(wrap);
      wrap.appendChild(h('h1', { class: 'cb-sr', text: L('title') }));
      wrap.appendChild(tabsEl); wrap.appendChild(body);

      function act(fn) { var r = SB.UI.act(fn); render(); return r; }

      function helpers(s) {
        var ids = [], out = [], circle = null;
        safe(function () { ['SOUND', 'SECURITY'].forEach(function (role) { SB.People.crew(s, role).forEach(function (c) { if (ids.indexOf(c.personId) < 0) ids.push(c.personId); }); }); });
        circle = safe(function () { return SB.People.circle(s); }, null);
        if (circle) circle.people.forEach(function (c) { if (ids.indexOf(c.id) < 0) ids.push(c.id); });
        ids.forEach(function (id) { var c = safe(function () { return SB.People.card(s, id); }, null); if (c) out.push(c); });
        return out;
      }

      /* the notes you could hand someone who does sound or security: one per show still without them (security only where
       * the room needs it or the show page recommends it; you work the door yourself) */
      function notes(s, c) {
        var roles = (c.roles || []).map(function (r) { return String(r).toLowerCase(); }).filter(function (r) { return r === 'sound' || r === 'security'; }), items = [],
            shows = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'] }); }, []) || [];
        roles.forEach(function (role) {
          shows.forEach(function (sh) {
            var crew = sh.crew || {}, day = SB.time.fmt(sh.day, 'short'), mine = null, k, a, busy, roleW = L('roles.' + role);
            if (crew[role] || items.length >= 4) return;
            if (role === 'security' && !safe(function () { var R = SB.Rooms.crewRules(s, sh.roomId, sh.id).security; return R.required || R.recommended; }, false)) return;
            for (k in (s.asks || {})) { a = s.asks[k]; if (a.kind === 'CREW' && a.toId === c.id && a.showId === sh.id && (a.payload ? a.payload.role : role) === role) mine = a; }
            busy = safe(function () { return SB.People.crew(s, role.toUpperCase(), sh.id).filter(function (p) { return p.personId === c.id; })[0]; }, null);
            if (mine && mine.status === 'YES') items.push({ label: L('notePut', { day: day }), say: L('notePutSay', { name: c.name, role: roleW, day: day }), hot: true,
              on: function () { act(function (x) { return SB.Shows.setCrew(x, sh.id, role, c.id); }); } });
            else if (mine && (mine.status === 'QUEUED' || mine.status === 'SENT')) items.push({ label: L('noteAsked', { day: day }), disabled: true, why: roleW, on: function () {} });
            else if (!mine || mine.status !== 'NO') items.push({ label: L('noteAsk', { role: roleW, day: day }), cost: money(c.rate || 0), disabled: !!(busy && busy.busy), why: busy && busy.busy ? L('noteBusy', { day: day }) : null,
              say: L('noteAskSay', { name: c.name, role: roleW, day: day, pay: money(c.rate || 0) }),
              on: function () { act(function (x) { return SB.Mail.ask(x, 'CREW', c.id, { showId: sh.id, role: role, pay: { kind: 'CASH', amount: c.rate || 0 } }); }); } });
          });
        });
        if (!items.length) return null;
        return h('div', { class: 'pp-notes', role: 'group', aria: { label: L('note') } }, [h('p', { class: 'pp-pencil', text: L('note') }), Kc().tabsRow(items.map(function (it) { it.n = false; return it; }))]);
      }

      function helperPiece(s, c, i) {
        var kind = ['match', 'scrap', 'corner'][i % 3], taste = c.taste || {}, loves = (taste.loves || []).map(function (g) { return SB.text.label('genre.' + g + '.name'); }),
            wont = taste.wont ? SB.text.label('genre.' + taste.wont + '.name') : null, last = (c.last || []).slice(-10), t = last.length ? tallyArt(last) : null,
            roles = (c.roles || []).map(function (r) { return lbl('role.' + r, String(r).toLowerCase()); }).join(' / ');
        return h('li', { class: 'pp-piece pp-' + kind + ' pp-stock-' + STOCKS[i % STOCKS.length], style: { '--r': (((i * 7) % 5) - 2) * 0.7 + 'deg' }, aria: { label: c.name }, data: (c.roles || []).some(function (r) { return String(r).toLowerCase() === 'sound'; }) ? { tut: 'people-sound' } : null }, [
          kind === 'match' ? h('div', { class: 'pp-cover', aria: { hidden: 'true' } }, [h('span', { class: 'pp-striker' }), D().art(K().marker(String(roles || '').toUpperCase().slice(0, 18), 6, 24, 16, { fill: PAPER, seed: 'mc' + c.id, maxWidth: 220 }), 240, 32)]) : null,
          portrait(c.id, i),
          h('div', { class: 'pp-who' }, [
            stampArt(c.id, c.name, 48),
            h('div', { class: 'pp-namebox' }, [
              h('p', { class: 'pp-name', aria: { label: c.name + (c.nick ? ' (' + c.nick + ')' : '') } }, Kc().hand(c.name, 30, { max: 250, say: false })),
              h('p', { class: 'pp-number', aria: { hidden: 'true' } }, Kc().hand(numberScribble(c.id), 20, { stroke: '#2F4FB5', say: false })),
              c.nick ? h('p', { class: 'pp-pencil', text: '"' + c.nick + '"' }) : null
            ])
          ]),
          h('p', { class: 'pp-typed pp-caps', text: roles + (c.where ? ' / ' + L('helpWhere', { where: c.where }) : '') }),
          loves.length ? h('p', { class: 'pp-typed' }, [h('b', { text: L('helpTaste') + ': ' }), loves.join(', ')]) : null,
          wont ? h('p', { class: 'pp-typed' }, [h('b', { text: L('helpWont') + ': ' }), h('s', { class: 'pp-struck', text: wont })]) : null,
          h('div', { class: 'pp-marks' }, [
            t ? h('span', { class: 'pp-tally', role: 'img', aria: { label: L('helpLast') + ': ' + last.map(function (o) { return lbl('helpOutcome.' + o, o); }).join(', ') } }, D().art(t.svg, t.w, 32)) : null,
            c.rel && num(c.rel.value) ? h('span', { role: 'img', aria: { label: L('helpTrust', { stage: lbl('stage.' + c.rel.stage, '') }) } }, D().art(D().heartMeter(c.rel.value, 20, 20, 30, 'pp' + c.id), 42, 40)) : null,
            c.rel && c.rel.stage ? h('span', { class: 'pp-pencil', text: lbl('stage.' + c.rel.stage, '') }) : null
          ]),
          c.owed && c.owed.text ? iouSlip(c.owed.text, c.id, c.owed.favors > 0) : null,
          c.lastReport ? h('p', { class: 'pp-pencil', text: L('helpReport') + ': ' + (typeof c.lastReport === 'string' ? c.lastReport : (c.lastReport.text || '')) }) : null,
          c.origin ? h('p', { class: 'pp-pencil', text: L('helpMet', { origin: c.origin }) }) : null,
          notes(s, c)
        ]);
      }

      function helpView(s) {
        var list = helpers(s);
        if (!list.length) return emptySlip(L('helpEmpty'));
        return h('ul', { class: 'pp-pile' }, list.map(function (c, i) { return helperPiece(s, c, i); }));
      }

      function emptySlip(text) { return h('p', { class: 'pp-empty pp-typed', text: text }); }

      function regularsView(s) {
        var r = safe(function () { return SB.Crowd.regulars(s); }, null), faces = [], extra, sheet = [], heads = '', unit, n, i, gens = ['KIDS', 'MIDDLE', 'OLD'], stats = [];
        if (!r || !(r.total > 0)) return h('div', { class: 'pp-reg' }, [h('div', { class: 'pp-sheet' }, [h('p', { class: 'pp-sheethead', aria: { label: L('regHead') } }, Kc().mk(L('regHead'), 30, { say: false })), h('p', { class: 'pp-pencil', text: L('regNone') })])]);
        faces = (r.faces || []).map(function (id) { return s.people && s.people[id] ? s.people[id] : null; }).filter(Boolean);
        faces.forEach(function (p, j) {
          var lapsed = p.state && p.state !== 'ACTIVE', name = [p.first, p.last ? p.last.charAt(0) + '.' : ''].filter(Boolean).join(' ');
          sheet.push(h('li', { class: 'pp-sign' + (lapsed ? ' is-lapsed' : ''), style: { '--r': (((j * 5) % 7) - 3) * 0.9 + 'deg', '--x': ((j * 13) % 4) * 6 + 'px' } }, [
            h('span', { class: 'pp-signname', aria: { label: name + (lapsed ? ', ' + L('regLapsed') : '') } }, Kc().hand(name, 15 + (j * 3) % 7, { stroke: HANDS[j % HANDS.length], max: 200, say: false })),
            p.regularType ? h('span', { class: 'pp-pencil', text: lbl('regularType.' + p.regularType, '') }) : null]));
        });
        extra = displayNames(s, Math.max(0, Math.min(24, Math.round(r.total / 4)) - faces.length));
        extra.forEach(function (nm, j) {
          var k = j + faces.length;
          sheet.push(h('li', { class: 'pp-sign is-drawn', style: { '--r': (((k * 5) % 7) - 3) * 0.9 + 'deg', '--x': ((k * 13) % 4) * 6 + 'px' } },
            h('span', { class: 'pp-signname', aria: { label: nm } }, Kc().hand(nm, 14 + (k * 3) % 8, { stroke: HANDS[k % HANDS.length], max: 200, say: false }))));
        });
        /* the count of heads */
        n = Math.min(40, r.total); unit = Math.max(1, Math.ceil(r.total / 40)); n = Math.round(r.total / unit);
        for (i = 0; i < n; i++) heads += D().head(10 + (i % 20) * 15, 26 + Math.floor(i / 20) * 26, 20, i >= n - Math.round((r.drifting || 0) / unit) ? { mode: 'open', dash: true } : { mode: 'solid' });
        stats.push(h('div', { class: 'pp-count', role: 'img', aria: { label: L('regTotal', { n: r.total }) + (r.drifting > 0 ? ', ' + L('regDrifting', { n: r.drifting }) : '') } }, [
          D().art(heads, 316, 30 + Math.ceil(n / 20) * 26), h('div', { class: 'pp-countfig' }, [fig('~' + r.total, 30), h('span', { class: 'pp-typed', text: L('regTotal', { n: r.total }) }),
            unit > 1 ? h('span', { class: 'pp-pencil', text: L('regUnit', { n: unit }) }) : null,
            r.drifting > 0 ? h('span', { class: 'pp-pencil', text: L('regDrifting', { n: r.drifting }) }) : null])]));
        stats.push(h('p', { class: 'pp-sub', text: L('regGen') }));
        stats.push(h('ul', { class: 'pp-gens' }, (r.byGen || []).map(function (cnt, g) {
          return h('li', null, [C().GenGlyph({ gen: g, size: 18 }), h('span', { class: 'pp-typed', text: lbl('gen.' + gens[g] + '.name', '') }), fig(cnt, 18)]);
        })));
        if (r.byGenre && r.byGenre.length) {
          stats.push(h('p', { class: 'pp-sub', text: L('regGenre') }));
          stats.push(h('ul', { class: 'pp-tallies' }, r.byGenre.slice(0, 6).map(function (g) { return h('li', null, [h('span', { class: 'pp-typed', text: SB.text.label('genre.' + g.genre + '.name') }), fig(g.n, 16)]); })));
        }
        if (r.byZone && r.byZone.length) {
          stats.push(h('p', { class: 'pp-sub', text: L('regZone') }));
          stats.push(h('ul', { class: 'pp-tallies' }, r.byZone.map(function (z) { return h('li', null, [h('span', { class: 'pp-typed', text: z.name }), fig(z.n, 16)]); })));
        }
        if (r.floor) stats.push(h('p', { class: 'pp-floor' }, [h('span', { class: 'pp-typed', text: L('regFloor') }), fig(r.floor.lo + '-' + r.floor.hi, 20)]));
        if (num(r.mailingList) && r.mailingList > 0) {
          var env = '';
          for (i = 0; i < Math.min(6, Math.ceil(r.mailingList / 10)); i++) env += K().paper(4 + i * 5, 4 + i * 3, 46, 28, { seed: 'env' + i, stock: 'white', sx: 2, sy: 2, burn: 0.3, inner: '<path d="M' + (4 + i * 5) + ' ' + (4 + i * 3) + 'l23 15 23-15" fill="none" stroke="' + TONER + '" stroke-width="1.4"/>' });
          stats.push(h('p', { class: 'pp-floor', role: 'img', aria: { label: L('regMailing') + ': ' + r.mailingList } }, [D().art(env, 90, 56), h('span', { class: 'pp-typed', text: L('regMailing') }), fig(r.mailingList, 20)]));
        }
        return h('div', { class: 'pp-reg' }, [
          h('div', { class: 'pp-sheet' }, [h('p', { class: 'pp-sheethead', aria: { label: L('regHead') } }, Kc().mk(L('regHead'), 30, { say: false })), h('p', { class: 'pp-pencil', text: L('regIntro') }),
            h('ol', { class: 'pp-signs' }, sheet), extra.length ? h('p', { class: 'pp-pencil', text: L('regMore') }) : null]),
          h('div', { class: 'pp-stats pp-piece pp-stock-white' }, [SB.UI.Kit && SB.UI.Kit.photo ? SB.UI.Kit.photo({ id: 'crowd-0' + (1 + hash(s.citySlug || 'x') % 4), w: 420, h: 220, paper: 'canary', tape: ['top'], rot: -0.8, seed: 'ppcrowd', cls: 'pp-portrait' }) : null].concat(stats))
        ]);
      }

      function bookersView(s) {
        var list = safe(function () { return SB.Rooms.bookers(s).filter(function (b) { return b.active; }); }, []);
        if (!list.length) return emptySlip(L('bookersEmpty'));
        return h('ul', { class: 'pp-pile' }, list.map(function (b, i) {
          return h('li', { class: 'pp-piece pp-scrap pp-stock-' + STOCKS[(i + 1) % STOCKS.length], style: { '--r': (((i * 7) % 5) - 2) * 0.8 + 'deg' }, aria: { label: b.name } }, [
            portrait(b.id, i),
            h('div', { class: 'pp-who' }, [h('p', { class: 'pp-name', aria: { label: b.name } }, Kc().mk(String(b.name || '').toUpperCase(), 26, { max: 280, say: false }))]),
            h('p', { class: 'pp-typed pp-caps', text: lbl('booker.' + b.kind, '') }),
            (b.genres || []).length ? h('p', { class: 'pp-typed' }, [h('b', { text: L('books') + ': ' }), (b.genres || []).map(function (g) { return SB.text.label('genre.' + g + '.name'); }).join(', ')]) : null,
            (b.homeRooms || []).length ? h('p', { class: 'pp-typed' }, [h('b', { text: L('rooms') + ': ' }), b.homeRooms.join(', ')]) : null,
            b.rel ? h('p', { class: 'pp-marks' }, [num(b.rel.value) ? D().art(D().heartMeter(b.rel.value, 20, 20, 30, 'bk' + b.id), 42, 40) : null, h('span', { class: 'pp-pencil', text: lbl('stage.' + b.rel.stage, '') })]) : null
          ]);
        }));
      }

      function outView(s) {
        var list = safe(function () { return SB.Territory.contacts(s); }, []);
        if (!list.length) return emptySlip(L('outEmpty'));
        return h('ul', { class: 'pp-pile' }, list.map(function (c, i) {
          var place = c.place ? c.place.name + (c.place.state ? ', ' + c.place.state : '') : '';
          return h('li', { class: 'pp-piece pp-card pp-stock-' + ['blue', 'mint', 'bone', 'goldenrod'][i % 4], style: { '--r': (((i * 7) % 5) - 2) * 0.8 + 'deg' }, aria: { label: c.name + (place ? ', ' + place : '') } }, [
            portrait(c.id || c.name, i),
            place ? h('p', { class: 'pp-place', aria: { hidden: 'true' } }, Kc().mk(String(place).toUpperCase(), 24, { max: 290, say: false })) : null,
            h('p', { class: 'pp-name', aria: { hidden: 'true' } }, Kc().hand(c.name, 28, { max: 270, say: false })),
            h('p', { class: 'pp-marks' }, [D().art(D().heartMeter(c.strength, 20, 20, 30, 'ct' + c.id), 42, 40), h('span', { class: 'pp-pencil', text: lbl('stage.' + c.stage, '') })]),
            (c.owes && c.owes.length) ? iouSlip(L('owesYou') + ' ' + c.owes.length, 'o' + c.id, true) : null,
            (c.youOwe && c.youOwe.length) ? iouSlip(L('youOwe') + ' ' + c.youOwe.length, 'y' + c.id, false) : null
          ]);
        }));
      }

      function render() {
        var s = game(), list = [['help', 'tabHelp'], ['regulars', 'tabRegulars'], ['bookers', 'tabBookers'], ['out', 'tabOut']];
        SB.UI.clear(tabsEl); SB.UI.clear(body);
        tabsEl.appendChild(Kc().tabsRow(list.map(function (t) {
          return { label: L(t[1]), on2: tab === t[0], role: 'radio', n: false, fk: 'pp-' + t[0], on: function () { tab = t[0]; render(); safe(function () { tabsEl.querySelector('[data-fk="pp-' + t[0] + '"]').focus(); }); } };
        })));
        safe(function () { tabsEl.firstChild.setAttribute('role', 'radiogroup'); tabsEl.firstChild.setAttribute('aria-label', L('title')); });
        if (!s) { body.appendChild(emptySlip(L('helpEmpty'))); return; }
        body.appendChild(tab === 'regulars' ? regularsView(s) : (tab === 'bookers' ? bookersView(s) : (tab === 'out' ? outView(s) : helpView(s))));
      }

      render();
      return { update: render, unmount: function () {} };
    }
  });
})(SB);
