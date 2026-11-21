/* Scene Booker — ui/screens/bands.js (UI-B, redrawn for the desk)
 * The sticker stack. `bands`: the stack fanned out as a sticker sheet: every band a die-cut sticker made from its
 * mark (SB.Identity.bandMark), sized by how many they draw, in loose piles by sound. Worn and peeling when you have
 * worked with them a lot, a heart when they trust you, faded when played too often, face down when you will not
 * book them. `band`: the sticker flipped to its back: the members as stamped faces, what you know as scribbled notes
 * with question marks where you do not, trust as a heart, their history with you as a row of tiny flyers.
 * Reads Bands.list / card / trust, Harm.flags, Legacy.bandHistory / binder, Shows.list. Actions: going to the bill
 * to ask them (the clipboards), and the list dialog (Harm.add). Also registers the part `listDialog`, which the
 * notebook uses to add someone to the list.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.bands = {
    title: 'Bands',
    bandTitle: 'Band',
    tabLocal: 'LOCAL',
    tabLocalL: 'Local bands',
    tabTouring: 'OUT OF TOWN',
    tabTouringL: 'Touring bands you have met',
    search: 'Find a band',
    pileL: 'Only the {g} pile',
    allPiles: 'Every pile',
    stateActive: 'PLAYING',
    stateOut: 'OUT',
    stateEnded: 'ENDED',
    stateL: 'Only bands that are: {s}',
    none: 'No bands match.',
    noTouring: 'No touring band has written to you yet.',
    listen: 'listen',
    listenStop: 'stop',
    listenL: 'Hear what {name} sound like',
    sticker: '{name}, {genre}, {tier}{trust}{worn}{faded}{down}{ended}{out}. Last played for you: {last}. Turn it over.',
    trusts: ', trusts you',
    worn: ', you have worked with them a lot',
    faded: ', played out lately',
    down: ', face down: someone in it is on your list',
    endedL: ', broke up',
    outL: ', out for a lineup change',
    never: 'never',
    backToBands: 'Put it back on the sheet',
    home: 'from {home}',
    years: '{n} years',
    year: '1 year',
    members: 'WHO IS IN IT',
    past: 'WHO WAS',
    pastNow: 'now: {where}',
    pastNowhere: 'whereabouts unknown',
    since: 'since {y}',
    founder: 'founder',
    withYou: 'WITH YOU',
    withYouNone: 'They have not played for you.',
    know: 'WHAT YOU KNOW',
    drawL: 'DRAW',
    liveL: 'LIVE',
    crossL: 'CROSSOVER',
    relL: 'SHOWS UP',
    promoL: 'SHARES FLYER',
    knowL: '{what}: {text}',
    dunno: 'not known yet',
    buzz: 'What people say',
    needs: 'NEEDS',
    needsNone: 'You have not learned yet.',
    motive: 'Why they play',
    trustH: 'TRUST',
    trustNone: 'Nothing has moved it yet.',
    history: 'History',
    historyNone: 'Nothing on record yet.',
    askToPlay: 'ASK THEM',
    askFor: 'Ask {name} to play {d}{room}',
    notBooking: 'NOT BOOKING',
    notBookingL: 'Put someone in this band on your list',
    noShows: 'Start a show first.',
    ended: 'BROKE UP',
    out: 'OUT',
    outLine: 'out for a lineup change',
    playedOut: 'played out: they have played the town a lot lately',
    listedLine: 'Someone in this band is on your list.',
    week: 'week {n}',
    fading: 'fading',
    dlgTitle: 'Not booking',
    dlgWho: 'Who',
    dlgCondition: 'What would change it',
    dlgWhy: 'Why (only you see this)',
    dlgSave: 'Put them on the list',
    dlgCancel: 'Never mind',
    dlgNobody: 'There is nobody to choose from yet.',
    dlgDone: 'On the list.',
    unknown: '?'
  };

  function L(key, ctx) { return SB.text.label('ui.bands.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function K() { return SB.DeskKit; }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function game() { return SB.UI.game(); }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, ' '); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function tierWord(t) { return num(t) && SB.text.has('strings.bandTier') ? SB.text.label('bandTier.' + t) : ''; }
  function stageWord(k) { return SB.text.has('strings.bandStage.' + k) ? SB.text.label('bandStage.' + k) : String(k || '').toLowerCase(); }
  function styleName(c) { var st = c.style || c.genre; return SB.text.has('strings.style.' + st + '.name') ? SB.text.label('style.' + st + '.name') : genreName(st); }
  function genreName(g) { return SB.text.has('strings.genre.' + g + '.name') ? SB.text.label('genre.' + g + '.name') : String(g || ''); }
  function known(view) { return view && view.conf > 0 ? view : null; }
  function f(n) { return Math.round(n * 10) / 10; }
  function piece(cls, stock, kids, o) {
    o = o || {};
    return h(o.tag || 'section', { class: 'cb-piece cb-stock-' + (stock || 'white') + (cls ? ' ' + cls : ''), role: o.role || null, aria: o.label ? { label: o.label } : null }, kids);
  }
  function lastPlayed(card) {
    var d = null;
    (card.shows || []).forEach(function (x) { if (num(x.day) && (d === null || x.day > d)) d = x.day; });
    return d;
  }
  function keepFocus(root, fn) {
    var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
    fn();
    if (key) { el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null); if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } } }
  }

  /* ---------------------------------------------------------------- */
  /* the list dialog (a part): put someone on the list                  */
  /* ---------------------------------------------------------------- */

  SB.UI.part('listDialog', function (opts) {
    opts = opts || {};
    var s = game(), people = [], form, whyF, selWho, selCond, whyF = kit().input({ area: true, rows: 3, label: L('dlgWhy'), fk: 'dlg-why', cls: 'sb-listdlg-why' }), why = whyF.field,
        conds = ['BAND_PARTS', 'LOOK_AGAIN', 'TALK_FIRST', 'NO'], who = '', cond = 'NO';
    if (s) {
      try {
        (opts.bandId ? [opts.bandId] : SB.Bands.list(s, { local: true }).slice(0, 80)).forEach(function (bid) {
          var c = SB.Bands.card(s, bid);
          c.members.forEach(function (m) { if (!m.listed && !people.some(function (p) { return p.id === m.personId; })) people.push({ id: m.personId, name: m.name, band: c.name }); });
        });
      } catch (e) { people = []; }
    }
    if (!people.length) return h('div', { class: 'sb-listdlg' }, [h('h2', { text: L('dlgTitle') }), C().Empty({ text: L('dlgNobody') })]);
    who = people[0].id;
    selWho = C().Select({ label: L('dlgWho'), visibleLabel: true, value: who, onChange: function (v) { who = v; },
      options: people.map(function (p) { return { value: p.id, label: p.name + ' · ' + p.band }; }) });
    selCond = C().Select({ label: L('dlgCondition'), visibleLabel: true, value: cond, onChange: function (v) { cond = v; },
      options: conds.map(function (k) { return { value: k, label: SB.text.label('listCondition.' + k) }; }) });
    function save() {
      var r = SB.UI.act(function (st) { return SB.Harm.add(st, who, why.value || '', cond, {}); });
      if (r && r.ok !== false) { SB.UI.toast(L('dlgDone'), 'info'); if (typeof opts.onDone === 'function') opts.onDone(); }
    }
    function cancel() { if (typeof opts.onDone === 'function') opts.onDone(); }
    form = h('div', { class: 'sb-listdlg' }, [
      h('h2', { text: L('dlgTitle') }), selWho, selCond,
      whyF,
      h('div', { class: 'cb-row' }, [kit().button({ label: L('dlgSave'), kind: 'primary', fk: 'dlg-save', on: save }), kit().button({ label: L('dlgCancel'), fk: 'dlg-cancel', on: cancel })])
    ]);
    return form;
  });

  /* ---------------------------------------------------------------- */
  /* drawing a band's sticker                                          */
  /* ---------------------------------------------------------------- */

  function trendArrow(t, x, y) {
    if (t === 'UP') return K().arrow(x, y + 16, x + 10, y, { seed: 'tu', sw: 2.6, head: 7, stroke: '#e7ddc4' });
    if (t === 'DOWN') return K().arrow(x, y, x + 10, y + 16, { seed: 'td', sw: 2.6, head: 7, stroke: '#e7ddc4' });
    return '';
  }

  /** sticker(c, w): the band's sticker as it lies on the sheet: worn and peeling when you have worked with them a lot,
   *  a sharpie heart (and a star) when they trust you, faded when they are played out, face down when they are on your list. */
  function sticker(c, w) {
    var dd = D(), ht = Math.round(w * 0.42), out = '', down = c.listedMembers > 0, ended = c.stage === 'ENDED', worn = (c.shows || []).length >= 3,
        stg = c.trust && c.trust.stage, i, lines = '';
    if (down) {
      for (i = -ht; i < w; i += 16) lines += '<path d="M' + i + ' ' + (ht - 6) + 'L' + (i + ht) + ' 6" stroke="#141413" stroke-opacity=".18" stroke-width="5"/>';
      out += K().sticker({ rect: [6, 6, w - 14, ht - 14] }, lines + dd.type('BACKING PAPER  BACKING PAPER', w / 2, ht / 2 + 4, 8, { anchor: 'middle', fill: '#77756f', maxWidth: w - 30 }), { seed: 'bd' + c.id, edge: 4, fill: '#cfcabb' });
      out += K().xout(w * 0.3, ht * 0.22, w * 0.4, ht * 0.56, { seed: 'dx' + c.id, sw: 4 });
      return out;
    }
    out += '<g' + (c.playedOut ? ' opacity=".38"' : '') + '>' + dd.bandSticker(c, w) + '</g>';
    if (c.playedOut) out += K().dotsRect(6, 6, w - 14, ht - 14, 2, { white: true });
    if (worn) {
      out += dd.peel(w - 7, ht - 7, Math.min(26, ht * 0.5));
      out += K().dots(K().polyD([[10, 10], [w * 0.3, 8], [w * 0.22, ht * 0.35], [10, ht * 0.5]]), 3, { white: true });
    }
    if (stg === 'TRUSTED' || stg === 'ALLY') out += K().heart(w - 22, 16, 20, { seed: 'h' + c.id, fill: '#141413' });
    if (stg === 'ALLY') out += '<g transform="translate(' + (w - 52) + ' 6)">' + dd.mark('DONE', 18) + '</g>';
    if (ended) out += K().line(10, ht - 10, w - 10, 12, { seed: 'en' + c.id, sw: 5, twice: true }) + dd.stamp(L('ended'), w / 2 - dd.stampW(L('ended'), 10) / 2, ht / 2 - 10, 10, { rot: -10 });
    else if (c.out) out += K().tape(w / 2, ht / 2, w * 0.8, 22, { seed: 'ot' + c.id, rot: -8, color: '#8f918f', op: 0.95 }) + dd.type(L('out'), w / 2, ht / 2 + 4, 11, { anchor: 'middle', bold: true, fill: '#f4f2ea' });
    (c.gens || []).forEach(function (g, gi) {
      if (!num(g) || g < 0.25) return;
      var gl = safe(function () { return SB.Identity.genGlyph(gi, 11); }, '');
      if (gl) out += '<g style="color:#141413">' + dd.place(gl, 14 + gi * 13, ht - 1) + '</g>';
    });
    return out;
  }

  /* band photos: cut-out ids chosen from the band id and members' instruments, so a band always looks the same */
  var ROLE = { vox: 'singer', vocals: 'singer', singer: 'singer', guitar: 'guitar', bass: 'bass', drums: 'drums' };
  var POOL = { singer: ['singer-01', 'singer-02', 'singer-03', 'singer-04', 'singer-05', 'singer-06', 'singer-07', 'singer-08', 'singer-09'],
               guitar: ['guitar-01', 'guitar-02', 'guitar-04', 'guitar-05', 'guitar-06', 'guitar-07', 'guitar-08'],
               bass: ['bass-01', 'bass-02', 'bass-03', 'bass-04', 'bass-05', 'bass-06'], drums: ['drums-01', 'drums-02', 'drums-03'] };
  function hash(str) { var n = 7, i; str = String(str); for (i = 0; i < str.length; i++) n = (n * 31 + str.charCodeAt(i)) % 1000003; return n; }
  function bandPhotoIds(c, max) {
    var roles = [], out = [];
    (c.members || []).forEach(function (m) { var r = ROLE[lower(m.instrument)] || 'guitar'; if (roles.indexOf(r) < 0) roles.push(r); });
    if (!roles.length) roles = ['singer', 'guitar'];
    roles.sort(function (a, b) { return (a === 'singer' ? 0 : a === 'drums' ? 2 : 1) - (b === 'singer' ? 0 : b === 'drums' ? 2 : 1); });
    roles.slice(0, max).forEach(function (r) { var p = POOL[r]; out.push(p[hash(c.id + ':' + r) % p.length]); });
    return out;
  }
  function kit() { return SB.UI.Kit; }
  /* the photos' copy stock: the flyers' papers (css/finish.css --pp-blue, --pp-green, --pp-salmon, --pp-buff) */
  var STOCK = ['#c2d0dc', '#cde3bd', '#e4b49b', '#eadbc7'];
  function bandStock(c) { return STOCK[hash(c.id + ':paper') % STOCK.length]; }

  /** words(label, items, cls): quiet typed filter words; the one you are on is a strip of black tape (css .rb-word) */
  function words(label, items, cls) {
    return h('div', { class: 'rb-words' + (cls ? ' ' + cls : ''), role: 'group', aria: { label: label } }, items.map(function (it) {
      return h('button', { type: 'button', class: 'rb-word pz-hl' + (it.on ? ' is-on' : ''), data: { fk: it.fk }, aria: { pressed: it.on ? 'true' : 'false', label: it.label || it.text },
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

  function stickerLabel(c) {
    var d = lastPlayed(c), stg = c.trust && c.trust.stage;
    return L('sticker', { name: c.name, genre: styleName(c) + (c.genre2 ? ', ' + genreName(c.genre2) : ''), tier: tierWord(c.tierPublic),
      trust: stg === 'TRUSTED' || stg === 'ALLY' ? L('trusts') : '', worn: (c.shows || []).length >= 3 ? L('worn') : '', faded: c.playedOut ? L('faded') : '',
      down: c.listedMembers > 0 ? L('down') : '', ended: c.stage === 'ENDED' ? L('endedL') : '', out: c.out ? L('outL') : '',
      last: d === null ? L('never') : SB.time.fmt(d, 'short') });
  }

  /* ---------------------------------------------------------------- */
  /* bands: the sticker sheet                                          */
  /* ---------------------------------------------------------------- */

  SB.UI.screen('bands', {
    rail: 'bands', title: 'ui.bands.title', full: false,
    mount: function (root, params) {
      var tab = params && params.tab === 'touring' ? 'touring' : 'local', q = '', genre = '', st = '', wrap = h('section', { class: 'cb-bands' }), body = h('div', { class: 'cb-piles' }), cardsCache = [],
          pileTabs = h('div', { class: 'cb-piletabs rb-piletabs' }), heroBox = h('div', { class: 'rb-herobox' }), heroKey = null, heroN = 0;
      root.appendChild(wrap);

      function metTouring(s, id, c) {
        if ((c.shows || []).length) return true;
        return Object.keys(s.requests || {}).some(function (k) { return s.requests[k].bandId === id; });
      }

      function render() {
        var s = game(), ids = [], search;
        SB.UI.clear(wrap);
        if (!s) { wrap.appendChild(C().Empty({})); return; }
        try { ids = SB.Bands.list(s, { local: tab === 'local' }); } catch (e) { ids = []; }
        cardsCache = ids.map(function (id) { return SB.Bands.card(s, id); });
        if (tab === 'touring') cardsCache = cardsCache.filter(function (c) { return metTouring(s, c.id, c); });
        search = kit().input({ label: L('search'), value: q, type: 'search', placeholder: L('search'), fk: 'find', cls: 'rb-find', onInput: function (v) { q = v; piles(); } });
        wrap.appendChild(h('h1', { class: 'cb-sr', text: L('title') }));
        wrap.appendChild(h('div', { class: 'cb-sheethead rb-top' }, [
          heroBox,
          h('div', { class: 'rb-slip pz-paper' }, [
            h('div', { class: 'rb-row' }, [
              words(L('title'), ['local', 'touring'].map(function (k) {
                return { text: k === 'local' ? L('tabLocal') : L('tabTouring'), label: k === 'local' ? L('tabLocalL') : L('tabTouringL'), on: tab === k, fk: 'tab-' + k, onClick: function () { tab = k; genre = ''; render(); } };
              })),
              search,
              words(L('stateL', { s: '' }), [['active', 'stateActive'], ['out', 'stateOut'], ['ended', 'stateEnded']].map(function (x) {
                var t = L(x[1]);
                return { text: t, label: L('stateL', { s: t.toLowerCase() }), on: st === x[0], fk: 'st-' + x[0], onClick: function () { st = st === x[0] ? '' : x[0]; render(); } };
              }))
            ]),
            pileTabs
          ])
        ]));
        wrap.appendChild(body);
        piles();
      }

      /* the one loud thing: the filter you are on, as a big pasted headline with how many it shows; stamped on when the filter changes */
      function hero(scope, n, key) {
        var el = h('h2', { class: 'rb-hero pz-paper' }, [h('span', { class: 'rb-hero-w', text: String(scope).toUpperCase() }), h('span', { class: 'rb-hero-n', text: String(n) })]),
            F = SB.Finish, nEl = el.lastChild;
        SB.UI.clear(heroBox); heroBox.appendChild(el);
        if (F && key !== heroKey) {
          F.move(el, 'stamp', { delay: heroKey === null ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: el } });
          F.countUp(nEl, n, { from: heroKey === null ? 0 : heroN, delay: (heroKey === null ? 220 : 0) + 83 });
        }
        heroKey = key; heroN = n;
      }

      function bandCard(c) {
        var r = SB.rng.make('tilt:' + c.id).range(-1.2, 1.2), d = lastPlayed(c), down = c.listedMembers > 0, ended = c.stage === 'ENDED',
            tag = down ? 'ON YOUR LIST' : c.playedOut && !ended && !c.out ? 'PLAYED OUT' : '',
            meta = [c.home || '', tierWord(c.tierPublic)].filter(Boolean).join(' / ');
        return h('button', { type: 'button', class: 'rb-card pz-paper pz-hl' + (down ? ' is-down' : '') + (ended || c.playedOut ? ' is-dim' : ''), style: { '--kt-rot': r.toFixed(2) + 'deg' },
          data: { fk: 'band-' + c.id }, aria: { label: stickerLabel(c) }, on: { click: function () { SB.UI.go('band', { bandId: c.id }); } } }, [
          kit().photo({ ids: bandPhotoIds(c, 2), w: 224, h: 150, paper: down ? STOCK[3] : bandStock(c), seed: c.id }),
          down ? h('span', { class: 'rb-name', aria: { hidden: 'true' }, text: String(c.name).toUpperCase() }) : null,
          h('span', { class: 'rb-mark', aria: { hidden: 'true' } }, D().art(sticker(c, 210), 210, Math.round(210 * 0.42) + 8)),
          h('span', { class: 'rb-meta', aria: { hidden: 'true' }, text: meta }),
          h('span', { class: 'rb-last', aria: { hidden: 'true' }, text: d === null ? 'never played for you' : 'last: ' + SB.time.fmt(d, 'short') }),
          tag ? h('span', { class: 'rb-tag', aria: { hidden: 'true' }, text: tag }) : null
        ]);
      }

      function piles() {
        var needle = q.trim().toLowerCase(), groups = {}, keys, cards, shown = 0, scope, key, F = SB.Finish, first;
        SB.UI.clear(body); SB.UI.clear(pileTabs);
        cards = (cardsCache || []).filter(function (c) {
          if (needle && c.name.toLowerCase().indexOf(needle) < 0) return false;
          if (st === 'ended' && c.stage !== 'ENDED') return false;
          if (st === 'out' && !(c.out || c.playedOut)) return false;
          if (st === 'active' && (c.stage === 'ENDED' || c.out || c.playedOut)) return false;
          return true;
        });
        cards.forEach(function (c) { (groups[c.genre] = groups[c.genre] || []).push(c); });
        keys = Object.keys(groups).sort(function (a, b) { return groups[b].length - groups[a].length || (a < b ? -1 : 1); });
        if (genre && !groups[genre]) genre = '';
        shown = genre ? groups[genre].length : cards.length;
        scope = genre ? genreName(genre) : (tab === 'touring' ? L('tabTouring') : L('tabLocal'));
        key = tab + '|' + genre + '|' + st;
        hero(scope, shown, key);
        if (!cards.length) { body.appendChild(piece('cb-hintslip', 'white', [h('p', { class: 'cb-typed', text: tab === 'touring' && !(cardsCache || []).length ? L('noTouring') : L('none') })])); return; }
        if (keys.length > 1) pileTabs.appendChild(words(L('allPiles'), keys.map(function (g) {
          return { text: genreName(g), label: genre === g ? L('allPiles') : L('pileL', { g: genreName(g) }), on: genre === g, fk: 'pile-' + g,
                   onClick: function () { genre = genre === g ? '' : g; piles(); var el = pileTabs.querySelector('[data-fk="pile-' + g + '"]'); if (el) el.focus(); } };
        }), 'rb-words--piles'));
        keys.forEach(function (g) {
          var list = groups[g].sort(function (a, b) { return (lastPlayed(b) || -1) - (lastPlayed(a) || -1) || (a.name < b.name ? -1 : 1); }), trend = list[0] && list[0].trend;
          if (genre && genre !== g) return;
          body.appendChild(h('div', { class: 'cb-pilebox rb-pile' }, [
            genre ? null : h('div', { class: 'rb-pilehead' }, [h('h2', { class: 'rb-pilename' }, [genreName(g).toUpperCase() + ' ', h('span', { class: 'rb-pilen', text: String(list.length) })]),
              trend === 'UP' ? h('span', { class: 'rb-trend', text: '^ going up' }) : trend === 'DOWN' ? h('span', { class: 'rb-trend', text: 'v slipping' }) : null]),
            h('div', { class: 'rb-grid' }, list.map(function (c) { return bandCard(c); }))
          ]));
        });
        if (F && key !== body.getAttribute('data-key')) {
          first = Array.prototype.slice.call(body.querySelectorAll('.rb-card')).slice(0, 9);
          F.stagger(first, 3);
          first.forEach(function (el) { el.classList.add('mv-slap'); });
        }
        body.setAttribute('data-key', key);
      }

      render();
      return { update: function () { keepFocus(root, render); }, unmount: function () {} };
    }
  });

  /* ---------------------------------------------------------------- */
  /* band: the back of the sticker                                     */
  /* ---------------------------------------------------------------- */

  /* a scrap with what you know: heads for a count, a scribbled fill for a share, a big ? where you do not know */
  function knowNote(label, view, kind, i) {
    var dd = D(), w = 250, ht = 64, out = '', v = known(view), inner = '';
    inner += dd.type(label, 14, 22, 10, { bold: true });
    if (!v) {
      return h('li', { class: 'cb-know rb-blank', role: 'img', aria: { label: L('knowL', { what: label.toLowerCase(), text: L('dunno') }) } }, [
        h('span', { class: 'rb-unk', text: label.toUpperCase() }), h('span', { class: 'rb-pencil', text: 'not seen yet' })]);
    } else if (kind === 'heads') {
      var hi = Math.max(1, v.hi90 || 0), unit = Math.max(1, Math.ceil(hi / 14)), n = Math.min(14, Math.round(hi / unit)), lo = Math.round((v.lo50 || 0) / unit), k;
      for (k = 0; k < n; k++) inner += dd.head(18 + k * 11, 54, 15, k < lo ? { mode: 'solid' } : { mode: 'dots', op: Math.max(0.3, 1 - (k - lo + 1) / (n - lo + 2)) });
      inner += dd.marker(String(v.text || ''), w - 12, 54, 15, { anchor: 'end', seed: 'kt' + i, maxWidth: 70 });
    } else {
      var X = function (t) { return 14 + Math.max(0, Math.min(1, t)) * 140; };
      inner += '<path d="M14 34h140v14h-140z" fill="none" stroke="#141413" stroke-width="1.8"/>';
      inner += '<path d="M' + f(X(v.lo90)) + ' 35h' + f(Math.max(2, X(v.hi90) - X(v.lo90))) + 'v12h' + f(-Math.max(2, X(v.hi90) - X(v.lo90))) + 'z" fill="url(#dk-ht2)"/>';
      inner += '<path d="M' + f(X(v.lo50)) + ' 35h' + f(Math.max(2, X(v.hi50) - X(v.lo50))) + 'v12h' + f(-Math.max(2, X(v.hi50) - X(v.lo50))) + 'z" fill="#141413"/>';
      inner += dd.type(String(v.text || ''), w - 12, 46, 10, { anchor: 'end', bold: true, maxWidth: 84 });
    }
    out += K().paper(4, 4, w - 12, ht - 10, { seed: 'kn' + label, stock: i % 2 ? 'bone' : 'white', torn: i % 2 ? 'b' : 'r', rot: (i % 3 - 1) * 1.2, sx: 3, sy: 4, burn: 0.4, inner: inner });
    return h('li', { class: 'cb-know', role: 'img', aria: { label: L('knowL', { what: label.toLowerCase(), text: v ? (v.text || '') : L('dunno') }) } }, dd.art(out, w, ht));
  }

  SB.UI.screen('band', {
    rail: 'bands', title: 'ui.bands.bandTitle', full: false,
    mount: function (root, params) {
      var bandId = params && params.bandId, wrap = h('section', { class: 'cb-band' }), shown = false;
      root.appendChild(wrap);

      function asks(s, c) {
        var list = [], dd = D();
        try { list = SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'] }); } catch (e) { list = []; }
        if (!list.length) return piece('cb-askpiece', 'white', [dd.word(L('askToPlay'), 14), h('p', { class: 'cb-typed cb-small', text: L('noShows') })]);
        return piece('cb-askpiece', 'white', [dd.word(L('askToPlay'), 14), h('div', { class: 'cb-row cb-miniclips', role: 'group', aria: { label: L('askToPlay') } }, list.slice(0, 6).map(function (x) {
          var d = SB.time.date(x.day), rn = x.roomId && s.rooms[x.roomId] ? s.rooms[x.roomId].name : '';
          return dd.thing({ cls: 'cb-miniclip', label: L('askFor', { name: c.name, d: SB.time.fmt(x.day, 'short'), room: rn ? ', ' + rn : '' }), fk: 'ask-' + x.id,
            svg: dd.clipboard(64, 80, 'mc' + x.id) + dd.marker(d.m + '/' + d.d, 32, 56, 14, { anchor: 'middle', seed: 'mcd' + x.id }), w: 64, h: 80, strip: d.m + '/' + d.d, stripSize: 9,
            onClick: function () { SB.UI.go('show', { showId: x.id, row: 'bill' }); } });
        }))]);
      }

      function render() {
        var s = game(), c = null, tr = null, flags = null, hist = null, recs = [], dd = D(), left, right, ex, tv, ts, plate, na, F = SB.Finish, first;
        SB.UI.clear(wrap);
        if (!s || !bandId) { wrap.appendChild(C().Empty({ text: L('none') })); return; }
        try { c = SB.Bands.card(s, bandId); tr = SB.Bands.trust(s, bandId); } catch (e) { c = null; }
        if (!c) { wrap.appendChild(C().Empty({ text: L('none') })); return; }
        try { flags = SB.Harm.flags(s, bandId); } catch (e2) { flags = null; }
        try { hist = SB.Legacy.bandHistory(s, bandId); } catch (e3) { hist = null; }
        try { recs = SB.Legacy.binder(s, { bandId: bandId }); } catch (e4) { recs = []; }
        tv = tr ? tr.value : c.trust.value; ts = tr ? tr.stage : c.trust.stage;

        /* the front, peeking: its sticker, the name in marker, where from and how long */
        ex = [c.home ? L('home', { home: c.home }) : '', c.years === 1 ? L('year') : L('years', { n: c.years }), tierWord(c.tierPublic), stageWord(c.stage)].filter(Boolean).join(' / ');
        left = [
          piece('cb-frontpiece', 'white', [
            kit().tape({ at: 'tl' }),
            /* the one loud thing: the name across the foot of their photo, big and at an angle, stamped on */
            h('div', { class: 'rb-shot', style: { '--nh': String((na = nameArt(dd, c.name, 'bn' + c.id, 300)).nh) } }, [
              kit().photo({ ids: bandPhotoIds(c, 3), w: 330, h: 240, paper: bandStock(c), seed: c.id, alt: c.name + ', photo', rot: -0.6 }),
              plate = h('h1', { class: 'rb-nameplate pz-paper', aria: { label: c.name } }, na)
            ]),
            h('div', { class: 'rb-markrow' }, dd.art(sticker(c, 180), 180, Math.round(180 * 0.42) + 8)),
            h('p', { class: 'cb-typed', text: ex }),
            h('p', { class: 'cb-typed cb-small', text: [styleName(c), c.genre2 ? genreName(c.genre2) : ''].filter(Boolean).join(' + ').toUpperCase() + (c.trend === 'UP' ? '  ^' : c.trend === 'DOWN' ? '  v' : '') }),
            dd.listen ? dd.listen({ band: c, text: L('listen'), stopText: L('listenStop'), label: L('listenL', { name: c.name }), fk: 'hear-' + c.id }) : null,
            c.stage === 'ENDED' || c.out || c.playedOut ? h('div', { class: 'cb-row' }, [
              c.stage === 'ENDED' ? dd.art(dd.stamp(L('ended'), 4, 4, 14, { rot: -5 }), dd.stampW(L('ended'), 14) + 12, 38) : null,
              c.out ? h('p', { class: 'cb-typed cb-small', text: L('outLine') }) : null,
              c.playedOut ? h('p', { class: 'cb-typed cb-small', text: L('playedOut') }) : null]) : null
          ]),
          piece('cb-trustpiece', 'bone', [
            h('div', { class: 'cb-trust', role: 'img', aria: { label: L('trustH').toLowerCase() + ': ' + SB.text.label('stage.' + ts) + ' (' + tv + ')' } }, [
              dd.art(dd.heartMeter(tv, 36, 36, 60, 'b' + c.id) + dd.marker(SB.text.label('stage.' + ts).toUpperCase(), 80, 34, 22, { seed: 'ts' + ts, maxWidth: 190 }) + dd.type(String(tv) + ' / 100', 82, 56, 11, { bold: true }), 280, 74)]),
            tr && tr.events && tr.events.length ? h('ul', { class: 'cb-slips' }, tr.events.slice().reverse().slice(0, 8).map(function (e) {
              return h('li', { class: 'cb-slip' + (e.fading ? ' is-fading' : '') }, [
                dd.art(dd.marker((e.d > 0 ? '+' : '') + e.d, 2, 18, 15, { seed: 'te' + e.d }), 38, 24),
                h('span', { class: 'cb-typed cb-small', text: e.label + ' / ' + L('week', { n: e.week + 1 }) + (e.fading ? ' / ' + L('fading') : '') })]);
            })) : h('p', { class: 'cb-typed cb-small', text: L('trustNone') })
          ]),
          asks(s, c),
          h('div', { class: 'cb-under' }, [dd.act(L('notBooking'), L('notBookingL'), 'notbook', function () {
            var close = function () {}; close = SB.UI.card(SB.UI.parts.listDialog({ bandId: bandId, onDone: function () { close(); render(); } }), {});
          })])
        ];

        /* the back: the people, what you know, with you, history */
        right = [
          piece('cb-people', 'white', [
            dd.word(L('members'), 14),
            h('ul', { class: 'rb-crew' }, c.members.map(function (m) {
              return h('li', { class: 'rb-member' + (m.listed ? ' is-listed' : ''), aria: { label: m.name + ', ' + lower(m.instrument) + (num(m.since) && m.since >= 1900 ? ', ' + L('since', { y: m.since }) : '') + (m.founder ? ', ' + L('founder') : '') + (m.listed ? ', on your list' : '') } },
                [h('span', { class: 'rb-who' }, [h('span', { class: 'rb-wn', text: String(m.name).toUpperCase() }), h('span', { class: 'rb-wi', text: lower(m.instrument) })]), m.founder ? h('span', { class: 'rb-pencil', text: L('founder') }) : null]);
            })),
            flags && flags.listed && flags.listed.length ? h('p', { class: 'cb-typed cb-listed', text: flags.text || L('listedLine') }) : null,
            c.past && c.past.length ? h('div', { class: 'cb-pastppl' }, [h('p', { class: 'kt-small', text: L('past') }), h('ul', { class: 'rb-past' }, c.past.map(function (m) {
              return h('li', { class: 'kt-type', aria: { label: m.name + ', ' + (m.now ? L('pastNow', { where: m.now }) : L('pastNowhere')) }, text: m.name + ' > ' + (m.now || '?') });
            }))]) : null
          ], { label: L('members') }),
          h('div', { class: 'cb-knowwrap' }, [
            dd.word(L('know'), 16, { cls: 'cb-onboard', ink: '#eadbc7' }),
            h('ul', { class: 'cb-knows' }, [
              knowNote(L('drawL'), c.draw, 'heads', 0), knowNote(L('liveL'), c.live, 'heads', 1), knowNote(L('crossL'), c.cross, 'fill', 2),
              knowNote(L('relL'), c.rel, 'fill', 3), knowNote(L('promoL'), c.promo, 'fill', 4)]),
            piece('cb-scribbles', 'white', [
              c.buzzWord ? h('p', { class: 'cb-scribble' }, [h('span', { class: 'cb-sr', text: L('buzz') + ': ' }), '"' + SB.text.label('buzz.' + String(c.buzzWord).toUpperCase()) + '"']) : null,
              c.motive ? h('p', { class: 'cb-scribble' }, [h('span', { class: 'cb-sr', text: L('motive') + ': ' }), SB.text.label('motive.' + c.motive)]) : null,
              c.needs && c.needs.length ? h('div', { class: 'cb-scribble' }, [h('span', { class: 'kt-small', text: L('needs') }), h('ul', null, c.needs.map(function (n) { return h('li', null, ['- ', SB.text.label('need.' + n)]); }))])
                : h('p', { class: 'rb-pencilline', aria: { label: L('needsNone') } }, [h('span', { class: 'rb-pencil', text: '?' }), ' why they play, what they need, what people say: not learned yet'])
            ])
          ]),
          piece('cb-withyou', 'bone', [
            dd.word(L('withYou'), 14),
            c.shows.length ? h('div', { class: 'cb-flyrow' }, c.shows.map(function (x, i) {
              var rec = recs.filter(function (r) { return r.showId === x.showId; })[0], thumb = null, dt = num(x.day) ? SB.time.date(x.day).m + '/' + SB.time.date(x.day).d : '?';
              if (rec && rec.flyer && SB.UI.parts && SB.UI.parts.flyerThumb) { try { thumb = SB.UI.parts.flyerThumb(rec.flyer, 56); } catch (e5) { thumb = null; } }
              return h('button', { type: 'button', class: 'cb-thing has-strip cb-tinyflyer', style: { transform: 'rotate(' + ((i % 3) - 1) * 3 + 'deg)' }, data: { fk: 'fl-' + x.showId },
                aria: { label: (num(x.day) ? SB.time.fmt(x.day, 'short') : '') + ', ' + (x.roomName || '') + (x.vsPar ? ', ' + SB.text.label('vsPar.' + x.vsPar) : '') },
                on: { click: function () { SB.UI.go('show', { showId: x.showId }); } } },
                [dd.stripArt(dt, 9), thumb || dd.art(K().paper(2, 2, 54, 70, { seed: 'tf' + x.showId, stock: 'white', sx: 2, sy: 3, inner: dd.marker(dt, 29, 44, 14, { anchor: 'middle', seed: 'tfd' + x.showId }) }), 60, 76),
                 x.vsPar ? h('span', { class: 'cb-dot', aria: { hidden: 'true' }, text: SB.text.label('vsPar.' + x.vsPar) }) : null]);
            })) : h('p', { class: 'cb-typed cb-small', text: L('withYouNone') }),
            hist && (hist.lines.length || hist.yourPart) ? h('div', { class: 'cb-typedsheet', aria: { label: L('history') } }, [
              h('ul', null, hist.lines.map(function (x) { return h('li', { class: 'cb-typed cb-small' }, [h('b', { text: L('week', { n: x.week + 1 }) + ' ' }), x.text]); })),
              hist.yourPart ? h('p', { class: 'cb-typed cb-yourpart', text: hist.yourPart }) : null]) : h('p', { class: 'cb-typed cb-small', text: L('historyNone') })
          ])
        ];
        wrap.appendChild(h('div', { class: 'cb-bandtop' }, [dd.act('<', L('backToBands'), 'back', function () { SB.UI.go('bands', c.local ? {} : { tab: 'touring' }); }, { size: 14 })]));
        wrap.appendChild(h('div', { class: 'cb-bandcols' }, [h('div', { class: 'cb-bandfront' }, left), h('div', { class: 'cb-bandback' }, right)]));
        /* first time on the page: the name is stamped on, the papers slap down one after another (js/ui/finish.js) */
        if (F && !shown) {
          shown = true;
          F.move(plate, 'stamp', { delay: 220, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: plate } });
          first = Array.prototype.slice.call(wrap.querySelectorAll('.cb-bandfront > .cb-piece, .cb-bandback > .cb-piece, .cb-bandback > .cb-knowwrap'));
          F.stagger(first, 3);
          first.forEach(function (el) { el.classList.add('mv-slap'); });
        }
      }

      render();
      return { update: function () { keepFocus(root, render); }, unmount: function () { if (SB.Audio) SB.Audio.stop(); } };
    }
  });
})(SB);
