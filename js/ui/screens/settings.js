/* Scene Booker — ui/screens/settings.js (the manila folder close-up, 07-desk.md sections 2 and 2b)
 * Picked up, the folder lies open on the desk: typewriter-label tabs along its top (the game, how it looks, saves).
 * Inside the front cover, things paper-clipped and taped in (a photo through the copier, a masking-tape label in
 * sharpie). On the right a typed form: each setting a typed line, its choices drawn boxes you tick in pen or a
 * hand-drawn scale you circle a mark on. The saves are photocopied flyer stubs standing in the folder's pocket, each
 * with a cut-out photo through the copier on its own copy paper, the name in sharpie.
 * Game settings go through Game.setSetting (SB.UI.act); display preferences are SB.UI.prefs; saves are SB.Save.
 * Works with no game in play (from the start screen): then only how it looks and the saves on this machine are shown.
 * One sign per kind of action (2b): a typed tab chooses, a drawn box ticks, a label strip does it, a tear-off tab tears.
 * Pictures: SB.Scenes.loadCuts / paste / copier (js/art/scenes.js); nothing draws a person.
 * Built from the shared collage kit (SB.UI.Kit, css/kit.css); the layout is css/cu-folder.css (prefix sf-).
 */
(function (SB) {
  'use strict';

  SB.Content.ui.settings = {
    title: 'Settings',
    tabs: { game: 'the game', look: 'how it looks', saves: 'saves', credits: 'credits' },
    credits: 'Credits',
    creditsNote: 'The music you hear through the wall is cut from these recordings, shared by the people who made them. Each loop keeps the licence of the recording it was cut from.',
    creditsSfx: 'Sound effects: Kenney (kenney.nl), public domain (CC0).',
    creditsPaper: 'Cut-outs: found printed matter, put through the copier.',
    creditsSource: 'source',
    creditsNone: 'no music loaded.',
    creditsList: 'the music, by sound',
    creditsTape: 'The mixtape in your pocket is whole songs, played as the people who made them shared them.',
    creditsTitle: 'also on the mixtape',
    creditsMix: 'the mixtape',
    game: 'The game',
    fog: 'how much you can see',
    windows: 'deadlines',
    pause: 'stop the week when an answer needs you',
    bills: 'personal bills',
    billsLocked: 'set when the career began.',
    display: 'Display',
    theme: 'theme',
    themes: { auto: 'follow the computer', light: 'light', dark: 'dark' },
    textSize: 'text size',
    sizes: { s100: '100%', s125: '125%', s150: '150%' },
    density: 'density',
    densities: { normal: 'normal', dense: 'dense' },
    motion: 'motion',
    motions: { auto: 'follow the computer', reduce: 'reduced', full: 'full' },
    sound: 'sound',
    sounds: { full: 'on', low: 'quiet', off: 'off' },
    music: 'music',
    musics: { on: 'on', off: 'off' },
    speed: 'speed of the week',
    speeds: { normal: 'normal', fast: 'fast' },
    plain: 'plain flyers',
    gray: 'grayscale check',
    save: 'Saves',
    thisOne: 'this career',
    saveNow: 'save now',
    saved: 'Saved.',
    slot: 'slot name',
    export: 'export this save',
    exportHelp: 'copy this text somewhere safe.',
    download: 'download it',
    import: 'import a save',
    importHelp: 'paste a save here',
    importGo: 'open it',
    importBad: 'That save could not be opened. It may be from a newer version of the game.',
    packBad: 'That city could not be opened.',
    list: 'saves on this machine',
    none: 'no saves on this machine.',
    weekN: 'wk {n}',
    del: 'tear it up',
    delSay: 'Tear up the save {name}, {city}, week {n}',
    delSure: 'Delete "{name}" ({city}, week {n})? It is gone for good.',
    delYes: 'tear it up',
    keep: 'keep it',
    end: 'end the career',
    endSure: 'End this career? The town will remember what you did.',
    endYes: 'end it',
    back: 'back',
    /* the folder's own scrawl (pictures only, read by nobody's screen reader) */
    cover: 'settings + saves',
    owner: 'property of',
    nobody: 'whoever finds this',
    coverNote: 'make copies. lose nothing.',
    form: 'form {n}',
    fill: 'tick one in pen'
  };

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function Kt() { return SB.UI.Kit; }
  function L(key, ctx) { return SB.text.label('ui.settings.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return has(key) ? SB.text.label(key) : (fb === undefined ? '' : fb); }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'settings', String(e && e.message)); return fb; } }
  function P() { return SB.UI.prefs; }

  var TAB = null;   // which tab the folder was left open on (display memory)
  /* the photo taped inside the cover, per tab, and the stub stocks and photos for the saves (cut-outs, never drawn people) */
  var COVER = { game: { id: 'crowd-01', paper: 'canary', w: 250, h: 150 }, look: { id: 'drums-01', paper: 'blue', w: 190, h: 200 },
                saves: { id: 'crowd-03', paper: 'pink', w: 210, h: 170 }, credits: { id: 'guitar-04', paper: 'green', w: 200, h: 190 } };
  var STUB_PAPER = ['canary', 'pink', 'blue', 'green', 'salmon', 'goldenrod'];
  var STUB_PHOTO = ['singer-02', 'guitar-04', 'bass-01', 'drums-02', 'singer-09', 'guitar-07'];

  function confirmCard(text, yes, no, onYes) {
    var close = SB.UI.card(Kt().card({ paper: 'white', cls: 'sf-confirm', rot: -0.6, tape: ['top'] }, [
      h('p', { class: 'kt-type', text: text }),
      h('div', { class: 'sf-acts' }, [
        Kt().button({ label: yes, kind: 'primary', fk: 'yes', on: function () { close(); onYes(); } }),
        Kt().button({ label: no, fk: 'no', on: function () { close(); } })
      ])
    ]), { label: text });
  }
  function dateOf(ms) {
    var d = new Date(ms);
    if (!num(ms) || isNaN(d.getTime())) return '';
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + String(d.getFullYear()).slice(2);
  }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function hashOf(t) { var x = 0, i; t = String(t); for (i = 0; i < t.length; i++) x = (x * 31 + t.charCodeAt(i)) >>> 0; return x; }

  function mount(root) {
    var exportText = null, msg = '', slotName = null;

    function render() {
      var s = SB.UI.game(), tabs = s ? ['game', 'look', 'saves', 'credits'] : ['look', 'saves', 'credits'], a = (typeof document !== 'undefined') ? document.activeElement : null,
          fk = a && a.getAttribute ? a.getAttribute('data-fk') : null, body;
      if (!TAB || tabs.indexOf(TAB) < 0) TAB = tabs[0];
      SB.UI.clear(root);
      body = TAB === 'game' ? gameSec(s) : (TAB === 'look' ? displaySec() : (TAB === 'credits' ? creditsSec() : saveSec(s)));
      root.appendChild(h('div', { class: 'sf' + (s ? '' : ' is-loose') }, [
        h('h1', { class: 'kt-sr', text: L('title') }),
        Kt().tabs({ list: tabs.map(function (t) { return { id: t, label: L('tabs.' + t) }; }), value: TAB, label: L('title'), idPrefix: 'sf-tab-', panel: 'sf-panel', cls: 'sf-tabs',
                    on: function (t) { TAB = t; render(); } }),
        h('div', { class: 'sf-page sf-page--' + TAB, id: 'sf-panel', role: 'tabpanel', aria: { labelledby: 'sf-tab-' + TAB } }, [
          !s ? h('div', { class: 'sf-back' }, Kt().button({ label: L('back'), fk: 'back', on: function () { SB.UI.go('start'); } })) : null,
          h('div', { class: 'sf-spread' }, [cover(s), h('div', { class: 'sf-main' }, body)]),
          msg ? h('p', { class: 'kt-strip sf-msg', role: 'status', style: { '--kt-rot': '-.8deg' }, text: msg }) : null
        ])
      ]));
      if (fk) focusFk(fk);
    }
    function focusFk(k) { var el = safe(function () { return root.querySelector('[data-fk="' + k + '"]'); }, null); if (el && el.focus) safe(function () { el.focus(); }); }

    /* inside the front cover: the folder's tape label, a photo through the copier, whose folder it is */
    function cover(s) {
      var ph = COVER[TAB] || COVER.game, who = s && s.player && s.player.bookingName ? s.player.bookingName : L('nobody');
      return h('div', { class: 'sf-cover' }, [
        Kt().tapeLabel(L('cover'), { size: 24, max: 220, rot: -1.2, cls: 'sf-coverlabel' }),
        Kt().photo({ id: ph.id, w: ph.w, h: ph.h, paper: ph.paper, tape: [{ at: 'top', w: 70 }], rot: 1.3, seed: 'sf-' + TAB, cls: 'sf-photo' }),
        Kt().card({ paper: 'bone', rot: -0.9, cls: 'sf-index', seed: 'sf-index' }, [
          h('p', { class: 'kt-small', text: L('owner') }),
          Kt().headline(who, { size: 20, max: 200, tag: 'p', cls: 'sf-owner' }),
          h('p', { class: 'kt-pencil', text: L('coverNote') })
        ]),
        TAB === 'game' || (!TAB && s) ? Kt().photo({ id: 'singer-04', cut: true, w: 170, h: 226, rot: 1.4, seed: 'sf-cut', cls: 'sf-cut' }) : null
      ]);
    }
    function formHead(n, title, noFill, size) {
      return [h('p', { class: 'kt-small sf-formno', text: L('form', { n: n }) + (noFill ? '' : ' · ' + L('fill')) }), Kt().headline(title, { size: size || 34, cls: 'sf-head' })];
    }
    function choices(key, label, value, values, onPick) {
      return Kt().pick({ label: label, name: 'sf-' + key, value: value, fk: key, options: values, box: true, line: true, pen: true, cls: 'sf-line', on: onPick });
    }
    function tickBox(key, label, on, onChange, o) {
      o = o || {};
      return Kt().check({ label: label, checked: on, fk: key, pen: true, disabled: !!o.disabled, hint: o.hint || null, cls: 'sf-tick', on: onChange });
    }

    function gameSec(s) {
      var S = s.settings || {}, billsOpen = s.clock.week === 0 && s.clock.phase === 'PLAN';
      function set(k, v) { SB.UI.act(function (x) { return SB.Game.setSetting(x, k, v); }); render(); }
      return [Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.4, seed: 'sf-game', cls: 'sf-form' }, formHead(1, L('game')).concat([
        choices('fog', L('fog'), S.fog, Object.keys(SB.Enums.FOG).map(function (k) { return [k, word('fog.' + k, k.toLowerCase())]; }), function (v) { set('fog', v); }),
        choices('windows', L('windows'), S.windows, Object.keys(SB.Enums.WINDOWS).map(function (k) { return [k, word('windows.' + k, k.toLowerCase())]; }), function (v) { set('windows', v); }),
        tickBox('pause', L('pause'), S.pauseOnReplies !== false, function (v) { set('pauseOnReplies', v); }),
        tickBox('bills', L('bills'), !!S.bills, function (v) { set('bills', v); }, { disabled: !billsOpen, hint: billsOpen ? null : L('billsLocked') })
      ])),
      Kt().photo({ id: 'guitar-04', cut: true, w: 200, h: 250, rot: -1.6, seed: 'sf-cut2', cls: 'sf-cut2' })];
    }

    /* the credits: every loop's recording, its maker, its licence and where it came from (attribution the licences ask
     * for; real names live only here, read from SB.Content.loops at run time, never in the game's own content) */
    function creditsSec() {
      var LP = (SB.Content && SB.Content.loops) || {}, styles = LP.styles || {}, keys = Object.keys(styles).sort(), groups = [],
          MX = (SB.Content && SB.Content.mixtape) || {}, songs = [];
      function link(text, href) { return href ? h('a', { href: href, target: '_blank', rel: 'noopener noreferrer', class: 'sf-credlink', text: text }) : h('span', { text: text }); }
      function line(x) {
        return h('li', { class: 'sf-cred' }, [
          h('span', { class: 'sf-credwork', text: '"' + String(x.title || '?').replace(/\.(mp3|ogg|wav|flac)$/i, '') + '" ' }),
          h('span', { class: 'sf-credby', text: x.artist || '' }), ' · ',
          link(x.license || '', x.licenseUrl), x.url ? ' · ' : '', x.url ? link(L('creditsSource'), x.url) : null
        ]);
      }
      function group(name, items) { return h('section', { class: 'sf-credgroup' }, [h('h3', { class: 'kt-small sf-credstyle', text: name }), h('ul', { class: 'sf-credlist' }, items)]); }
      /* the whole songs first (SB.Content.mixtape): the title song, then the rest of the tape */
      if (MX.title && MX.title.file) groups.push(group(L('creditsTitle'), [line(MX.title)]));
      songs = (Array.isArray(MX.tracks) ? MX.tracks : []).filter(Boolean).map(line);
      if (songs.length) groups.push(group(L('creditsMix'), songs));
      keys.forEach(function (k) {
        var seen = {}, items = [];
        (styles[k] || []).forEach(function (x) {
          var id = (x.artist || '') + '|' + (x.title || '');
          if (!x || seen[id]) return; seen[id] = true;
          items.push(line(x));
        });
        if (items.length) groups.push(group(k.replace(/[-_]/g, ' '), items));
      });
      return [Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.3, seed: 'sf-credits', cls: 'sf-form sf-credits' }, formHead(4, L('credits'), true).concat([
        h('p', { class: 'kt-type sf-crednote', text: L('creditsNote') }),
        MX.title || songs.length ? h('p', { class: 'kt-type sf-crednote', text: L('creditsTape') }) : null,
        h('p', { class: 'kt-pencil', text: L('creditsSfx') }),
        h('p', { class: 'kt-pencil', text: L('creditsPaper') }),
        h('h2', { class: 'kt-small sf-listhead', text: L('creditsList') }),
        groups.length ? h('div', { class: 'sf-credscroll', tabindex: '0', role: 'region', aria: { label: L('creditsList') } }, groups) : h('p', { class: 'kt-pencil', text: L('creditsNone') })
      ]))];
    }

    function displaySec() {
      var p = P();
      function set(k, v) { p.set(k, v); render(); }
      return Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: 0.4, seed: 'sf-look', cls: 'sf-form' }, formHead(2, L('display')).concat([
        choices('theme', L('theme'), p.get('theme'), [['auto', L('themes.auto')], ['light', L('themes.light')], ['dark', L('themes.dark')]], function (v) { set('theme', v); }),
        choices('textScale', L('textSize'), p.get('textScale'), [[1, L('sizes.s100')], [1.25, L('sizes.s125')], [1.5, L('sizes.s150')]], function (v) { set('textScale', Number(v)); }),
        choices('density', L('density'), p.get('density'), [['normal', L('densities.normal')], ['dense', L('densities.dense')]], function (v) { set('density', v); }),
        choices('motion', L('motion'), p.get('motion'), [['auto', L('motions.auto')], ['reduce', L('motions.reduce')], ['full', L('motions.full')]], function (v) { set('motion', v); }),
        choices('sound', L('sound'), p.get('sound') || 'full', [['full', L('sounds.full')], ['low', L('sounds.low')], ['off', L('sounds.off')]], function (v) { set('sound', v); }),
        choices('music', L('music'), p.get('music') === 'off' ? 'off' : 'on', [['on', L('musics.on')], ['off', L('musics.off')]], function (v) { set('music', v); }),
        choices('speed', L('speed'), p.get('speed'), [['normal', L('speeds.normal')], ['fast', L('speeds.fast')]], function (v) { set('speed', v); }),
        h('div', { class: 'sf-ticks' }, [
          tickBox('plainFlyers', L('plain'), !!p.get('plainFlyers'), function (v) { set('plainFlyers', v); }),
          tickBox('gray', L('gray'), !!p.get('gray'), function (v) { set('gray', v); })
        ])
      ]));
    }

    function openState(st) {
      try {
        SB.Cities.load(st.citySlug, function (err) {
          if (err) { msg = L('packBad'); render(); return; }
          SB.UI.start(st);
        });
      } catch (e) { msg = L('packBad'); render(); }
    }

    /* the saves: flyer stubs on coloured copy paper standing in the folder's pocket */
    function stub(x, i, s) {
      var name = x.bookingName || x.slot, city = x.cityName || x.city || '', wk = (x.week || 0) + 1, mine = s && x.slot === slotName, k = hashOf(x.slot);
      return h('li', { class: 'sf-save' }, Kt().card({ paper: STUB_PAPER[k % STUB_PAPER.length], torn: true, seed: 'stub' + x.slot, cls: 'sf-stub' + (mine ? ' is-mine' : '') }, [
        Kt().photo({ id: STUB_PHOTO[k % STUB_PHOTO.length], w: 64, h: 78, paper: 'white', seed: 'stub', rot: -1, cls: 'sf-stubphoto' }),
        h('div', { class: 'sf-stubtext' }, [
          h('p', { class: 'kt-small', text: dateOf(x.savedAt) }),
          Kt().headline(name, { size: 20, max: 170, tag: 'h3', cls: 'sf-stubname' }),
          h('p', { class: 'kt-type sf-stubcity', text: [city, L('weekN', { n: wk })].filter(Boolean).join(' · ') }),
          mine ? h('p', { class: 'kt-pencil', text: L('thisOne') }) : null,
          Kt().button({ label: L('del'), say: L('delSay', { name: name, city: city, n: wk }), fk: 'del-' + x.slot, paper: 'white', cls: 'sf-del', on: function () {
            confirmCard(L('delSure', { name: name, city: city, n: wk }), L('delYes'), L('keep'), function () {
              safe(function () { return SB.Save.remove(x.slot); }, null); render();
            });
          } })
        ])
      ]));
    }

    function saveSec(s) {
      var list = safe(function () { return SB.Save.list(); }, []), ta, kids = [];
      if (!Array.isArray(list)) list = [];
      if (slotName === null) slotName = s ? ('g-' + String(s.seed || 'game').replace(/[^A-Za-z0-9_-]/g, '')).slice(0, 40) : '';
      if (s) {
        kids.push(Kt().card({ tag: 'section', paper: 'white', tape: ['tl', 'tr'], rot: -0.4, seed: 'sf-this', cls: 'sf-form' }, formHead(3, L('thisOne'), true, 26).concat([
          Kt().input({ label: L('slot'), value: slotName, fk: 'slot', max: 40, cls: 'sf-slot',
                       on: function (v) { slotName = String(v || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40); } }),
          h('div', { class: 'sf-acts' }, [
            Kt().button({ label: L('saveNow'), kind: 'primary', fk: 'save', on: function () {
              var r = safe(function () { return SB.Save.save(s, slotName || 'game', Date.now()); }, null);
              msg = r && r.ok !== false ? L('saved') : ((r && r.why) || ''); render();
            } }),
            Kt().button({ label: L('export'), fk: 'export', on: function () { exportText = safe(function () { return SB.Save.exportText(s); }, ''); render(); } })
          ]),
          exportText !== null ? h('div', { class: 'sf-export' }, [
            Kt().input({ label: L('export'), hint: L('exportHelp'), value: exportText, area: true, readonly: true, rows: 4, fk: 'exported' }),
            Kt().button({ label: L('download'), fk: 'download', paper: 'white', on: function () { download(exportText, (slotName || 'scene-booker') + '.json'); } })
          ]) : null
        ])));
      }
      kids.push(h('h2', { class: 'sf-listhead' }, Kt().label(L('list'), list.length ? String(list.length) : null, { tag: 'span' })));
      if (!list.length) kids.push(h('p', { class: 'kt-strip', text: L('none') }));
      else kids.push(h('ul', { class: 'sf-saves' }, list.map(function (x, i) { return stub(x, i, s); })));
      ta = Kt().input({ label: L('importHelp'), area: true, rows: 2, fk: 'importText' });
      kids.push(Kt().card({ tag: 'section', paper: 'blue', tape: ['tr'], rot: 0.6, seed: 'sf-import', cls: 'sf-form sf-import' }, [
        Kt().headline(L('import'), { size: 24, cls: 'sf-head' }),
        ta,
        h('div', { class: 'sf-acts' }, Kt().button({ label: L('importGo'), fk: 'import', on: function () {
          var r = safe(function () { return SB.Save.importText(ta.field.value || ''); }, null);
          if (!r || !r.ok || !r.state) { msg = (r && r.why) || L('importBad'); render(); return; }
          openState(r.state);
        } }))
      ]));
      if (s && s.clock.phase !== 'OVER') kids.push(h('div', { class: 'sf-end' }, Kt().button({ label: L('end'), fk: 'end', on: function () {
        confirmCard(L('endSure'), L('endYes'), L('keep'), function () { SB.UI.go('legacy', { tab: 'end' }); });
      } })));
      return h('div', { class: 'sf-savesec' }, kids);
    }

    function download(text, name) {
      var a, url;
      try {
        url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
        a = h('a', { href: url, download: name, class: 'sb-vh' });
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      } catch (e) { /* the text box is still there to copy */ }
    }

    render();
    return { update: render };
  }

  SB.UI.screen('settings', { rail: 'settings', title: 'ui.settings.title', full: false, mount: mount });
})(SB);
