/* Scene Booker — ui/screens/rooms.js (UI-B, redrawn for the desk)
 * The key hooks. `rooms`: a board of hooks by part of town: every room is a key on a tag with its glyph, its name and
 * what it is; a padlock when you cannot ask yet, a red tag when one of your shows is there, a rusty key when it closed.
 * `room`: the key picked up: the room as a small drawn card: how many it holds as heads, what it costs as bills, its
 * rules as stamps, how sketchy it is as scuffs and a flickering bulb, the owner, and its calendar as a tear-off month
 * where held nights carry tags with who holds them. Asking for a night is hanging your own tag on it.
 * Reads Rooms.list / card / calendar / rel / otherShows and Shows.list. Actions: Mail.ask('ROOM_HOLD' / 'HOLDER_RELEASE'),
 * Rooms.challenge, Rooms.release, Week.addJob('VISIT'). Whether a room can be held, and why not, is the engine's
 * sentence (card.canHold.why); nothing is decided here.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.rooms = {
    title: 'Rooms',
    roomTitle: 'Room',
    zoneL: 'Only the hooks for {zone}',
    allZones: 'Every part of town',
    kindL: 'Only {kind}',
    allKinds: 'Every kind',
    key: '{name}, {kind}, holds about {cap}, {ages}{owner}{book}{mine}. Pick up the key.',
    bookable: ', you can ask',
    locked: ', {why}',
    gone: 'GONE',
    goneL: ', closed{last}',
    mineL: ', one of your shows is here',
    none: 'No rooms here.',
    backToRooms: 'Hang the key back up',
    heldFor: 'Hold it for',
    heldForL: 'Hold nights for the show on {d}',
    noDrafts: 'Start a show first, then ask for a night here.',
    pickDay: 'Tap a night on the calendar.',
    needs: 'WHAT IT NEEDS',
    yours: 'YOUR SHOWS HERE',
    yoursNone: 'You have not played here yet.',
    yoursCount: '{n} of your shows here.',
    incidents: 'What people remember',
    noIncidents: 'Nothing worth keeping.',
    owner: 'OWNER',
    holdsAbout: 'HOLDS {n}',
    costs: 'Costs: {words}',
    free: 'FREE',
    rent: 'RENT',
    deposit: 'DEPOSIT',
    sound: 'SOUND',
    house: 'HOUSE',
    sketch: 'How sketchy: {n} of 100',
    curfew: 'DONE BY {t}',
    zoneOf: 'in {zone}',
    week: 'week {n}',
    visit: 'Plan a visit: dropping by with a coffee is how an owner gets to know you.',
    visitT: 'DROP BY',
    other: 'another booker\'s show',
    own: 'the room\'s own night',
    held: 'held',
    open: 'open',
    confirmed: 'confirmed',
    mine: 'your tag',
    nightL: '{d}: {state}{holds}',
    holdsBy: ', tags: {list}',
    someone: 'someone',
    hang: 'HANG MY TAG',
    hangL: 'Hang your tag on {d}: ask to hold it',
    bump: 'ASK TO GO FIRST',
    bumpL: 'Challenge the hold on {d}',
    takeDown: 'TAKE MY TAG DOWN',
    takeDownL: 'Let your hold on {d} go',
    askOff: 'ASK THEM TO LET GO',
    askOffL: 'Ask whoever holds {d} to let it go',
    rankOf: '#{n} {who} · {state}{exp}',
    expires: ', {n} days left',
    askNobody: 'You do not know who is holding it.',
    ownT: 'OWN',
    me: 'ME',
    unknown: '?',
    heroNext: 'NEXT SHOW',
    heroL: 'Your next show is at {name} on {d}. Pick up the key.'
  };

  function L(key, ctx) { return SB.text.label('ui.rooms.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function K() { return SB.DeskKit; }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function game() { return SB.UI.game(); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, '-'); }
  function money(n) { return SB.text.money ? SB.text.money(n || 0) : '$' + Math.round(n || 0); }
  function zoneName(s, id) { return s.zones && s.zones[id] ? s.zones[id].name : ''; }
  function kindName(k) { return SB.text.has('strings.room.' + k + '.name') ? SB.text.label('room.' + k + '.name') : lower(k); }
  function agesText(list) { return (list || []).map(function (a) { return SB.text.label('ages.' + a); }).join(', '); }
  function f(n) { return Math.round(n * 10) / 10; }
  function piece(cls, stock, kids, o) {
    o = o || {};
    return h(o.tag || 'section', { class: 'cb-piece cb-stock-' + (stock || 'white') + (cls ? ' ' + cls : ''), role: o.role || null, aria: o.label ? { label: o.label } : null }, kids);
  }
  /** words(label, items, cls): quiet typed filter words; the one you are on is a strip of black tape (css .rm-word) */
  function words(label, items, cls) {
    return h('div', { class: 'rm-words' + (cls ? ' ' + cls : ''), role: 'group', aria: { label: label } }, items.map(function (it) {
      return h('button', { type: 'button', class: 'rm-word pz-hl' + (it.on ? ' is-on' : ''), data: { fk: it.fk }, aria: { pressed: it.on ? 'true' : 'false', label: it.label || it.text },
                           on: { click: it.onClick } }, String(it.text).toUpperCase());
    }));
  }
  /** nameArt(dd, name, seed, maxW): the name in marker, as big as fits, broken over up to three lines at its words */
  function nameArt(dd, name, seed, maxW) {
    var t = String(name).toUpperCase().split(/\s+/), size, lines, cur, i, w, ok, lh, out = '', wide = 0, art;
    for (size = 64; size >= 26; size -= 4) {
      lines = []; cur = ''; ok = true;
      for (i = 0; i < t.length && ok; i++) {
        w = cur ? cur + ' ' + t[i] : t[i];
        if (dd.mw(w, size) <= maxW) cur = w;
        else if (!cur) ok = false;
        else { lines.push(cur); cur = t[i]; if (dd.mw(cur, size) > maxW) ok = false; }
      }
      if (ok) { lines.push(cur); if (lines.length <= 3) break; }
      lines = null;
    }
    if (!lines) { size = 26; lines = [t.join(' ')]; }
    lh = size * 1.22;
    lines.forEach(function (ln, k) { out += dd.marker(ln, 6, size * 1.1 + k * lh, size, { seed: seed + k, maxWidth: maxW }); wide = Math.max(wide, Math.min(maxW, dd.mw(ln, size))); });
    art = dd.art(out, Math.ceil(wide) + 16, Math.ceil(lh * lines.length) + 10);
    art.nh = Math.ceil(lh * lines.length) + 10;
    return art;
  }
  /* how finely a canvas is rastered: css/finish.css's stage unit at this screen (js/ui/finish.js) */
  function res() { return SB.Finish && SB.Finish.res ? SB.Finish.res() : Math.min(2, Math.max(1, (typeof window !== 'undefined' && window.devicePixelRatio) || 1)); }
  function pu(n) { return 'calc(var(--p) * ' + n + ')'; }
  /* the copy stock the pictures are run onto (css/finish.css --pp-*): canary becomes bond, the pastels the flyers' papers */
  var PAPER_OF = { HOUSE: '#eadbc7', OUTDOORS: '#cde3bd', DIY: '#e4b49b', HALL: '#c2d0dc', BAR: '#e4b49b', CLUB: '#d3d4da', SHOP: '#ddba9b', BIG: '#c2d0dc' };
  function keepFocus(root, fn) {
    var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
    fn();
    if (key) { el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null); if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } } }
  }

  function lastShowDay(s, roomId) {
    var best = null;
    Object.keys(s.shows || {}).forEach(function (id) {
      var x = s.shows[id];
      if (x.roomId === roomId && x.status === 'PLAYED' && (best === null || x.day > best)) best = x.day;
    });
    return best;
  }
  function hasMine(s, roomId) {
    return Object.keys(s.shows || {}).some(function (id) { var x = s.shows[id]; return x.roomId === roomId && (x.status === 'DRAFT' || x.status === 'CONFIRMED'); });
  }

  /* the picture of a room: a drawn scene for its kind, run through the photocopier onto coloured copy paper, taped down, with a
     typed strip for a caption. A room that closed is a grey copy with GONE on it. */
  var SCENE_OF = { HOUSE: 'CARPORT_EMPTY', OUTDOORS: 'BRIDGE', DIY: 'EMPTY_ROOM', HALL: 'EMPTY_ROOM', BAR: 'BAR_DOOR', CLUB: 'BAR_DOOR', SHOP: 'STOREFRONT', BIG: 'EMPTY_ROOM' };
  function roomPhoto(card, w, hh, sk, dd) {
    var r = res(), na, gone = card.open === false,
        cv = h('canvas', { class: 'rm-photo__c', width: String(Math.round(w * r)), height: String(Math.round(hh * r)), style: { width: pu(w), height: pu(hh) }, aria: { hidden: 'true' } }),
        kit = SB.UI.Kit, paper = gone ? '#d3d4da' : (PAPER_OF[card.kind] || '#eadbc7'), key = SCENE_OF[card.kind] || 'EMPTY_ROOM';
    safe(function () { SB.Scenes.draw(cv, key, { empty: true, seed: String(card.id), paper: paper, index: 0 }); return 1; }, 0);
    na = nameArt(dd, card.name, 'rn' + card.id, 310);
    return h('figure', { class: 'rm-photo pz-paper' + (gone ? ' is-gone' : ''), role: 'img', style: { '--nh': String(na.nh) },
      aria: { label: card.name + ', ' + kindName(card.kind) + (sk ? ', ' + L('sketch', { n: Math.round(sk) }) : '') } }, [
      kit ? kit.tape({ at: 'tl' }) : null, cv,
      /* the one loud thing: the name across the foot of the photo, big and at an angle, stamped on */
      h('h1', { class: 'rm-nameplate pz-paper', aria: { label: card.name } }, na),
      sk >= 40 ? h('figcaption', { class: 'rm-photo__cap', text: L('sketch', { n: Math.round(sk) }) }) : null,
      gone ? h('span', { class: 'rm-gone', text: L('gone') }) : null]);
  }

  /* a room on the pegboard: a manila card taped up, its name on black tape (wrapping, never cut), what it is and how big in
     typewriter type, and a small key tag (a flat drawing put through the photocopier onto bone paper, a padlock on it when
     you cannot ask yet). Rust-grey and GONE when it closed. */
  /* the key drawn on the card itself, in toner: at sc times its small size on the hero */
  function keyTagCanvas(r, locked, gone, sc) {
    var W = 84, H = 34, dpr = res() * (sc || 1), cv = h('canvas', { class: 'rm-keytag', width: String(Math.round(W * dpr)), height: String(Math.round(H * dpr)), style: { width: pu(W * (sc || 1)), height: pu(H * (sc || 1)) }, aria: { hidden: 'true' } }), c;
    try {
      c = cv.getContext('2d'); c.scale(dpr, dpr);
      c.strokeStyle = '#141413'; c.fillStyle = '#141413'; c.lineWidth = 5; c.lineCap = 'butt';
      c.beginPath(); c.arc(13, 17, 8.5, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.moveTo(22, 17); c.lineTo(56, 17); c.stroke();
      c.fillRect(44, 17, 5, 11); c.fillRect(53, 17, 5, 8);
      if (locked) {
        c.fillRect(63, 18, 18, 14); c.lineWidth = 3.5; c.beginPath(); c.arc(72, 18, 5.5, Math.PI, 0); c.stroke();
      }
    } catch (e) { /* the card still reads without the drawing */ }
    return cv;
  }
  function keyCard(r, lab, mine) {
    var gone = r.open === false, locked = !gone && !(r.canHold && r.canHold.ok),
        size = r.capRange && r.capRange.text ? r.capRange.text : String(r.cap || ''), rot = SB.rng.make('kt:' + r.id).range(-1.4, 1.4);
    return h('button', { type: 'button', class: 'cb-key rm-key pz-paper pz-hl' + (gone ? ' is-gone' : '') + (locked ? ' is-locked' : ''), aria: { label: lab }, data: { fk: 'room-' + r.id },
      style: { '--rm-rot': rot.toFixed(2) + 'deg' }, on: { click: function () { SB.UI.go('room', { roomId: r.id }); } } }, [
      keyTagCanvas(r, locked, gone, 1),
      h('span', { class: 'rm-key__name', aria: { hidden: 'true' }, text: String(r.name).toUpperCase() }),
      h('span', { class: 'rm-key__line', aria: { hidden: 'true' }, text: kindName(r.kind).toUpperCase() }),
      h('span', { class: 'rm-key__size', aria: { hidden: 'true' }, text: size }),
      mine ? h('span', { class: 'rm-key__me', aria: { hidden: 'true' }, text: L('me') }) : null,
      gone ? h('span', { class: 'rm-key__gone', aria: { hidden: 'true' }, text: L('gone') }) : null]);
  }

  /* ---------------------------------------------------------------- */
  /* rooms: the hooks                                                  */
  /* ---------------------------------------------------------------- */

  SB.UI.screen('rooms', {
    rail: 'rooms', title: 'ui.rooms.title', full: false,
    mount: function (root, params) {
      var zoneId = params && params.zoneId ? params.zoneId : '', kind = '', wrap = h('section', { class: 'cb-rooms' }), heroKey = null, listKey = null;

      root.appendChild(wrap);

      /* the room your next show is in: the earliest show you have booked that is yet to come */
      function nextShow(s) {
        var list = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'] }); }, []), day = s.clock && num(s.clock.day) ? s.clock.day : 0, best = null;
        list.forEach(function (x) { if (x.roomId && s.rooms && s.rooms[x.roomId] && x.day >= day && (!best || x.day < best.day)) best = x; });
        return best;
      }

      function render() {
        var s = game(), ids = [], cards, zones = {}, kinds = {}, order = [], dd = D(), nx, hero = null, heroZone = '', F = SB.Finish, key, first;
        SB.UI.clear(wrap);
        if (!s) { wrap.appendChild(C().Empty({})); return; }
        try { ids = SB.Rooms.list(s, {}); } catch (e) { ids = []; }
        cards = ids.map(function (id) { return SB.Rooms.card(s, id); });
        cards.forEach(function (c) { zones[c.zoneId] = zoneName(s, c.zoneId); kinds[c.kind] = kindName(c.kind); });
        Object.keys(zones).forEach(function (z) { if (order.indexOf(z) < 0) order.push(z); });
        nx = nextShow(s);
        if (nx) {
          /* the one loud thing: the key tag of the room your next show is in, big, on a tag, at an angle */
          var rc = SB.Rooms.card(s, nx.roomId), rname = s.rooms[nx.roomId].name, dtxt = SB.time.fmt(nx.day, 'short');
          hero = h('button', { type: 'button', class: 'rm-hero pz-paper pz-hl', data: { fk: 'hero-key' }, aria: { label: L('heroL', { name: rname, d: dtxt }) }, on: { click: function () { SB.UI.go('room', { roomId: nx.roomId }); } } }, [
            keyTagCanvas(rc, !(rc.canHold && rc.canHold.ok), rc.open === false, 3),
            h('span', { class: 'rm-hero-k', text: L('heroNext') }),
            h('span', { class: 'rm-hero-name', text: String(rname).toUpperCase() }),
            h('span', { class: 'rm-hero-d', text: dtxt.toUpperCase() })]);
        } else {
          /* else the town: its name as a big pasted headline */
          heroZone = zoneId && zones[zoneId] ? zoneId : order[0];
          if (heroZone) hero = h('h2', { class: 'rm-hero rm-hero--town pz-paper' }, String(zones[heroZone]).toUpperCase());
        }
        wrap.appendChild(h('h1', { class: 'cb-sr', text: L('title') }));
        wrap.appendChild(h('div', { class: 'cb-sheethead rm-top' }, [
          hero ? h('div', { class: 'rm-herobox' }, hero) : null,
          h('div', { class: 'rm-slip pz-paper' }, [
            words(L('allKinds'), Object.keys(kinds).map(function (k) {
              var on = kind === k;
              return { text: kinds[k], label: on ? L('allKinds') : L('kindL', { kind: kinds[k] }), on: on, fk: 'kind-' + k, onClick: function () { kind = on ? '' : k; render(); } };
            })),
            Object.keys(zones).length > 1 ? words(L('allZones'), Object.keys(zones).map(function (z) {
              var on = zoneId === z;
              return { text: zones[z], label: on ? L('allZones') : L('zoneL', { zone: zones[z] }), on: on, fk: 'zone-' + z, onClick: function () { zoneId = on ? '' : z; render(); } };
            }), 'rm-words--zones') : null
          ])
        ]));
        cards = cards.filter(function (c) { return (!zoneId || c.zoneId === zoneId) && (!kind || c.kind === kind); });
        if (!cards.length) { wrap.appendChild(piece('cb-hintslip', 'white', [h('p', { class: 'cb-typed', text: L('none') })])); }
        order.forEach(function (z) {
          var rows = cards.filter(function (c) { return c.zoneId === z; }).sort(function (a, b) { return (b.open !== false ? 1 : 0) - (a.open !== false ? 1 : 0); }), zn = String(zones[z] || '').toUpperCase();
          if (zoneId && zoneId !== z) return;
          if (!rows.length) return;
          wrap.appendChild(h('div', { class: 'cb-hookrow' }, [
            /* the town is the headline when there is no next show; every other part of town is a quiet typed line */
            nx || z !== heroZone ? h('h2', { class: 'rm-zone', text: zn }) : null,
            h('div', { class: 'cb-hooks' }, rows.map(function (r) {
              var mine = hasMine(s, r.id), d = r.open === false ? lastShowDay(s, r.id) : null;
              var lab = L('key', { name: r.name, kind: kindName(r.kind), cap: r.capRange && r.capRange.text ? r.capRange.text : r.cap, ages: agesText(r.ages),
                owner: r.ownerName ? ', ' + r.ownerName + ' (' + SB.text.label('stage.' + r.ownerStage) + ')' : '',
                book: r.open === false ? L('goneL', { last: d !== null ? ' · ' + SB.time.fmt(d, 'short') : '' }) : (r.canHold && r.canHold.ok ? L('bookable') : L('locked', { why: (r.canHold && r.canHold.why) || '' })),
                mine: mine ? L('mineL') : '' });
              return h('div', { class: 'cb-keyhang', data: { tut: 'room-row' } }, keyCard(r, lab, mine));
            }))
          ]));
        });
        /* the hero is stamped on when it first shows or changes; the keys slap down one after another when the list is new */
        key = (nx ? nx.roomId + ':' + nx.day : 'town:' + heroZone);
        if (F && hero && key !== heroKey) F.move(hero, 'stamp', { delay: heroKey === null ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
        heroKey = key;
        key = zoneId + '|' + kind;
        if (F && key !== listKey) {
          first = Array.prototype.slice.call(wrap.querySelectorAll('.rm-key')).slice(0, 8);
          F.stagger(first, 3);
          first.forEach(function (el) { el.classList.add('mv-slap'); });
        }
        listKey = key;
      }
      render();
      return { update: function () { keepFocus(root, render); }, unmount: function () {} };
    }
  });

  /* ---------------------------------------------------------------- */
  /* room: the key picked up                                           */
  /* ---------------------------------------------------------------- */

  SB.UI.screen('room', {
    rail: 'rooms', title: 'ui.rooms.roomTitle', full: false,
    mount: function (root, params) {
      var roomId = params && params.roomId, selected = params && num(params.day) ? params.day : null, forShow = '', wrap = h('section', { class: 'cb-room' }), shown = false;
      root.appendChild(wrap);

      function drafts(s) { return safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'] }); }, []); }
      function mine(cell) { return (cell && cell.holds || []).filter(function (x) { return x.mine; })[0] || null; }

      function doHold(day) {
        var sid = forShow;
        if (!sid) { SB.UI.toast(L('noDrafts'), 'no'); return; }
        SB.UI.act(function (s) { return SB.Mail.ask(s, 'ROOM_HOLD', roomId, { showId: sid, day: day, slot: 'EVENING' }); });
        render();
      }
      function doChallenge(day) { SB.UI.act(function (s) { return SB.Rooms.challenge(s, roomId, day); }); render(); }
      function doRelease(day, cell) {
        var m = mine(cell);
        if (!m || !m.showId) return;
        SB.UI.act(function (s) { return SB.Rooms.release(s, m.showId, { roomId: roomId, day: day }); });
        render();
      }
      function doAsk(day, cell) {
        var other = (cell && cell.holds || []).filter(function (x) { return !x.mine && x.by; })[0], m = mine(cell);
        if (!other) { SB.UI.toast(L('askNobody'), 'no'); return; }
        SB.UI.act(function (s) { return SB.Mail.ask(s, 'HOLDER_RELEASE', other.by, { roomId: roomId, day: day, showId: m && m.showId ? m.showId : undefined }); });
        render();
      }

      /* the card: the building, its name, heads for how many it holds, bills for what it costs, stamps for its rules,
         scuffs and a flickering bulb for how sketchy it is, the owner's stamped face */
      function cardSide(s, card, rel) {
        var dd = D(), drawing = '', cap = card.capRange && card.capRange.hi90 ? card.capRange : null, capN = card.cap || 0, kids = [], out, i, n, unit,
            t = card.terms || {}, bills = [], sk = Math.max(0, Math.min(100, card.sketch || 0)), inner = '';
        kids.push(roomPhoto(card, 360, 225, sk, dd));
        kids.push(h('p', { class: 'cb-typed', text: kindName(card.kind) + ' / ' + L('zoneOf', { zone: zoneName(s, card.zoneId) }) }));
        /* how many it holds */
        /* how many it holds, and what it costs: a typed spec sheet (real text, black tape labels) */
        if (t.rent > 0) bills.push([L('rent'), t.rent]);
        if (t.deposit > 0) bills.push([L('deposit'), t.deposit]);
        if (t.soundFee > 0) bills.push([L('sound'), t.soundFee]);
        if (t.houseCosts > 0) bills.push([L('house'), t.houseCosts]);
        kids.push(h('dl', { class: 'rm-specs' }, [
          h('div', { class: 'rm-spec' }, [h('dt', { text: L('holdsAbout', { n: '' }).trim() }), h('dd', { class: 'rm-big', text: String(cap && cap.text ? cap.text : capN) })]),
          h('div', { class: 'rm-spec rm-spec--cost', aria: { label: L('costs', { words: t.words || L('free').toLowerCase() }) } }, [h('dt', { text: 'COSTS' }),
            h('dd', { class: 'rm-bills' }, bills.length ? bills.map(function (b) { return h('span', { class: 'rm-bill' }, [h('b', { text: b[0] }), ' ' + money(b[1])]); }) : [h('span', { class: 'rm-bill rm-free', text: L('free') })])])
        ]));
        /* the rules, stamped */
        out = ''; var x = 4, sts = (card.ages || []).map(function (a) { return SB.text.label('ages.' + a); });
        if (num(card.curfew)) sts.push(L('curfew', { t: SB.time.clock(card.curfew) }));
        sts.forEach(function (w, wi) { out += dd.stamp(String(w).toUpperCase(), x, 6, 12, { rot: (wi % 2 ? 4 : -4) }); x += dd.stampW(String(w).toUpperCase(), 12) + 12; });
        kids.push(h('div', { role: 'img', aria: { label: sts.join(', ') } }, dd.art(out, Math.max(40, x), 40)));
        /* the owner */
        kids.push(h('div', { class: 'cb-owner', role: 'img', aria: { label: (card.ownerName || '') + (rel ? ', ' + SB.text.label('stage.' + rel.stage) : '') } }, [
          card.ownerId ? dd.art(dd.face(card.ownerId, 50), 52, 52) : null,
          dd.art(dd.type(L('owner'), 4, 14, 10, { bold: true }) + dd.marker(String(card.ownerName || '?').toUpperCase(), 4, 40, 18, { maxWidth: 170, seed: 'on' + card.id }) + (rel ? dd.heartMeter(rel.value, 206, 26, 34, 'own' + card.id) : ''), 230, 50)]));
        if (card.canHold && card.canHold.ok === false) kids.push(h('p', { class: 'cb-typed cb-why', text: card.canHold.why || '' }));
        if (card.canHold && card.canHold.ok === false && card.ownerId && card.open !== false) kids.push(dd.act(L('visitT'), L('visit'), 'visit', function () { SB.UI.act(function (st) { return SB.Week.addJob(st, 'VISIT', { personId: card.ownerId }); }); }));
        /* needs */
        if (card.needs && card.needs.length) kids.push(h('ul', { class: 'cb-needs', aria: { label: L('needs') } }, card.needs.map(function (nd) {
          return h('li', { class: nd.met ? 'is-met' : '' }, [dd.art(dd.mark(nd.met ? 'DONE' : 'TODO', 16), 18, 18), h('span', { class: 'cb-typed cb-small', text: nd.text })]);
        })));
        /* incidents */
        if (card.incidents && card.incidents.length) kids.push(h('ul', { class: 'cb-slips', aria: { label: L('incidents') } }, card.incidents.map(function (it) {
          return h('li', { class: 'cb-slip' + (it.fading ? ' is-fading' : '') }, [dd.art(K().skull(12, 12, 20, { seed: 'inc' + it.week }), 24, 24), h('span', { class: 'cb-typed cb-small', text: L('week', { n: it.week + 1 }) + ' / ' + it.text })]);
        })));
        kids.push(yours(s, card));
        return piece('cb-roomcard', 'bone', kids);
      }

      function yours(s, card) {
        var dd = D(), played = Object.keys(s.shows || {}).map(function (id) { return s.shows[id]; })
          .filter(function (x) { return x.roomId === roomId && (x.status === 'PLAYED' || x.status === 'CONFIRMED' || x.status === 'DRAFT'); })
          .sort(function (a, b) { return a.day - b.day; });
        if (!played.length) return h('p', { class: 'cb-typed cb-small', text: L('yoursNone') });
        return h('div', { class: 'cb-yours', aria: { label: L('yoursCount', { n: card.yours ? card.yours.shows : played.length }) } }, [dd.typed(L('yours'), 11, { bold: true }),
          h('div', { class: 'cb-flyrow' }, played.map(function (x, i) {
            var exp = null, d = SB.time.date(x.day);
            if (x.status !== 'PLAYED') exp = safe(function () { return SB.Money.exposure(s, x.id); }, null);
            return dd.thing({ cls: 'cb-tinyflyer', fk: 'ys-' + x.id, label: SB.time.fmt(x.day, 'short') + (x.result && x.result.verdictLine ? ', ' + x.result.verdictLine : '') + (exp && card.terms && card.terms.deposit > 0 && num(exp.total) ? ', ' + money(exp.total) : ''),
              svg: K().paper(2, 2, 46, 60, { seed: 'yf' + x.id, stock: x.status === 'PLAYED' ? 'white' : 'bone', rot: (i % 3 - 1) * 4, sx: 2, sy: 3, inner: dd.marker(d.m + '/' + d.d, 25, 38, 12, { anchor: 'middle', seed: 'yfd' + x.id }) }), w: 52, h: 66,
              strip: d.m + '/' + d.d, stripSize: 9, onClick: function () { SB.UI.go('show', { showId: x.id }); } });
          }))]);
      }

      /* the tear-off month */
      function calendarSide(s, card) {
        var dd = D(), from = s.clock.day, calDays = [], others = [], ds = drafts(s), start, i, byDay = {}, kids = [], selCell = null, pageArt, rowsN;
        calDays = safe(function () { return SB.Rooms.calendar(s, roomId, from, 56); }, []);
        others = safe(function () { return SB.Rooms.otherShows(s, from, from + 56).filter(function (o) { return o.roomId === roomId; }); }, []);
        calDays.forEach(function (c) { byDay[c.day] = c; });
        if (!forShow || !s.shows[forShow]) forShow = ds.length ? ds[0].id : '';
        if (card.open !== false) {
          kids.push(ds.length ? dd.tabs({ label: L('heldFor'), title: L('heldFor'), items: ds.slice(0, 6).map(function (x) {
            var d = SB.time.date(x.day);
            return { text: SB.time.fmt(x.day, 'dow3') + ' ' + d.m + '/' + d.d, label: L('heldForL', { d: SB.time.fmt(x.day, 'short') }), on: forShow === x.id, fk: 'for-' + x.id, onClick: function () { forShow = x.id; render(); } };
          }) }) : h('p', { class: 'cb-typed cb-small', text: L('noDrafts') }));
        }
        start = from - SB.time.dow(from);
        rowsN = 0; for (i = 0; i < 8 && start + i * 7 < from + 56; i++) rowsN++;
        kids.push(h('div', { class: 'cb-month' }, [h('div', { class: 'cb-monthpage rm-page pz-paper', aria: { hidden: 'true' } }, [
            h('div', { class: 'rm-page__head', text: SB.time.fmt(from, 'month').toUpperCase() + ' / ' + SB.time.fmt(from + 55, 'month').toUpperCase() }),
            h('div', { class: 'rm-page__dow' }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(function (c) { return h('span', { text: c }); }))]),
          h('div', { class: 'cb-monthgrid', role: 'grid', aria: { label: L('roomTitle') } }, (function () {
            var rowsEl = [], r, c, d, cell, row;
            for (r = 0; r < rowsN; r++) {
              row = [];
              for (c = 0; c < 7; c++) {
                d = start + r * 7 + c; cell = byDay[d];
                row.push(cell ? nightBtn(s, d, cell, others.some(function (o) { return o.day === d; })) : h('span', { class: 'cb-night is-past', role: 'gridcell', aria: { hidden: 'true' } }));
              }
              rowsEl.push(h('div', { class: 'cb-weekrow', role: 'row' }, row));
            }
            return rowsEl;
          })())]));
        if (selected !== null && byDay[selected]) selCell = byDay[selected];
        kids.push(selCell ? holdTags(s, card, selCell) : piece('cb-hintslip', 'white', [h('p', { class: 'cb-typed', text: L('pickDay') })]));
        return h('div', { class: 'cb-calside' }, kids);
      }

      function nightBtn(s, d, cell, other) {
        var dd = D(), out = '', t = SB.time.date(d), m = mine(cell), holds = cell.holds || [], st = cell.state, lab, on = selected === d, i;
                if (on) out += K().circle3(30, 29, 24, 22, { seed: 'sel' + d, stroke: '#141413', sw: 2.6 });
        if (st === 'OWN') out += dd.stamp(L('ownT'), 10, 30, 9, { rot: -8 });
        else if (st === 'CONFIRMED') out += K().xout(8, 20, 44, 32, { seed: 'cx' + d, sw: 3 });
        if (other) out += K().scribble(8, 24, 44, 26, { seed: 'ot' + d, sw: 2.2, n: 6 });
        for (i = 0; i < Math.min(3, holds.length); i++) {
          var hh = holds[i];
          out += '<g transform="rotate(' + (i * 12 - 8) + ' ' + (42 + i * 5) + ' 6)">' + K().line(42 + i * 5, 2, 40 + i * 5, 20, { seed: 'hs' + d + i, sw: 1.2, over: 0 }) +
            '<path d="M' + (32 + i * 5) + ' 20h18v26h-18z" fill="' + (hh.mine ? K().mat('pink') : K().mat('manila')) + '" stroke="#141413" stroke-width="1.5"/>' +
            dd.type(hh.mine ? L('me') : (hh.byName ? String(hh.byName).charAt(0) : '?'), 41 + i * 5, 38, 9, { anchor: 'middle', bold: true }) + '</g>';
        }
        lab = L('nightL', { d: SB.time.fmt(d, 'short'), state: st === 'OWN' ? L('own') : (st === 'CONFIRMED' ? L('confirmed') : (st === 'HELD' ? L('held') : L('open'))) + (other ? ', ' + L('other') : '') + (m ? ', ' + L('mine') : ''),
          holds: holds.length ? L('holdsBy', { list: holds.map(function (x) { return x.mine ? L('mine') : (x.byName || L('someone')); }).join(', ') }) : '' });
        return D().thing({ cls: 'cb-night' + (on ? ' is-on' : ''), label: lab, pressed: on, fk: 'night-' + d, svg: out, w: 60, h: 58, kids: [h('span', { class: 'rm-daynum', text: String(t.d), aria: { hidden: 'true' } })], on: {
          click: function () { selected = selected === d ? null : d; render(); },
          keydown: function (e) {
            var dlt = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key], el;
            if (!dlt) return;
            e.preventDefault();
            el = wrap.querySelector('[data-fk="night-' + (d + dlt) + '"]');
            if (el) el.focus();
          } } });
      }

      /* the night picked: the tags hanging on it, in line; your own tag to hang, or to take down */
      function holdTags(s, card, cell) {
        var dd = D(), holds = (cell.holds || []).slice().sort(function (a, b) { return (a.rank || 0) - (b.rank || 0); }), m = mine(cell), kids = [], d = cell.day, ds = SB.time.fmt(d, 'short'), canHold = card.open !== false, acts = [];
        kids.push(dd.art(dd.marker(ds.toUpperCase(), 4, 28, 24, { seed: 'hd' + d, maxWidth: 300 }) + (cell.label ? dd.type(String(cell.label).toUpperCase(), 6, 46, 10, { bold: true }) : ''), 320, 52));
        kids.push(h('ul', { class: 'cb-tags' }, holds.map(function (x, i) {
          var who = x.mine ? L('mine') : (x.byName || L('someone')), t = L('rankOf', { n: x.rank || i + 1, who: who, state: lower(x.state).replace(/-/g, ' '), exp: num(x.expiresIn) ? L('expires', { n: x.expiresIn }) : '' });
          return h('li', { class: 'cb-holdtag' + (x.mine ? ' is-mine' : '') }, [dd.art(K().tag(String(who).toUpperCase().slice(0, 14), 12, 0, { size: 11, string: 8, fill: x.mine ? K().mat('pink') : K().mat('manila'), rot: (i % 2 ? 4 : -4) }), 200, 44), h('span', { class: 'cb-typed cb-small', text: t })]);
        })));
        if (!m && canHold) acts.push(dd.act(L('hang'), L('hangL', { d: ds }), 'hang', function () { doHold(d); }, { size: 14 }));
        if (!m && holds.length) acts.push(dd.act(L('bump'), L('bumpL', { d: ds }), 'bump', function () { doChallenge(d); }));
        if (m) acts.push(dd.act(L('takeDown'), L('takeDownL', { d: ds }), 'takedown', function () { doRelease(d, cell); }));
        if (holds.some(function (x) { return !x.mine; })) acts.push(dd.act(L('askOff'), L('askOffL', { d: ds }), 'askoff', function () { doAsk(d, cell); }));
        kids.push(h('div', { class: 'cb-row', data: { tut: 'room-hold' } }, acts));
        return piece('cb-holdpanel', 'manila', kids, { label: ds });
      }

      function render() {
        var s = game(), card = null, rel = null, dd = D();
        SB.UI.clear(wrap);
        if (!s || !roomId) { wrap.appendChild(C().Empty({ text: L('none') })); return; }
        try { card = SB.Rooms.card(s, roomId); rel = SB.Rooms.rel(s, roomId); } catch (e) { card = null; }
        if (!card) { wrap.appendChild(C().Empty({ text: L('none') })); return; }
        wrap.appendChild(h('div', { class: 'cb-bandtop' }, [dd.act('<', L('backToRooms'), 'back', function () { SB.UI.go('rooms'); }, { size: 14 })]));
        wrap.appendChild(h('div', { class: 'cb-roomcols' }, [cardSide(s, card, rel), calendarSide(s, card)]));
        /* first time on the page: the name is stamped on, the card and the month slap down (js/ui/finish.js) */
        if (SB.Finish && !shown) {
          shown = true;
          SB.Finish.move(wrap.querySelector('.rm-nameplate'), 'stamp', { delay: 220, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: wrap.querySelector('.rm-nameplate') } });
          var pcs = Array.prototype.slice.call(wrap.querySelectorAll('.cb-roomcard, .cb-month, .cb-holdpanel, .cb-calside > .cb-piece'));
          SB.Finish.stagger(pcs, 3);
          pcs.forEach(function (el) { el.classList.add('mv-slap'); });
        }
      }

      render();
      return { update: function () { keepFocus(root, render); }, unmount: function () {} };
    }
  });
})(SB);
