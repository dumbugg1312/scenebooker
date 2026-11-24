/* Scene Booker — ui/app.js (UI-A1)
 * The shell: routing, the one way state changes (act), autosave, cards, popovers, toasts, screen key bindings,
 * glossary terms and boot. Spec: design/spec/05-interface.md sections 1.1 to 1.3, as changed by 07-desk.md: there is
 * no strip and no rail. A running game's home is the 'desk' route (js/desk/scene.js draws the desk into #desk on
 * every refresh); every other non-full route opens as a close-up over it (js/desk/closeup.js frames #main).
 * Adds to SB.UI: go, back, act, game, toast, start, card, popover, keys, lamp (and playing, see below). Loads last;
 * boots on DOMContentLoaded. Touches no DOM while loading except to listen for that event.
 *
 * The play loop belongs to the week screen (05-interface 4.2); the desk route keeps a hidden one mounted. The turn is
 * one evening (design/spec/10-night-clock.md): the pinned clock's CALL IT A NIGHT (js/ui/nightclock.js, the one place
 * a night is called) pulls the lamp (Week.endNight) and the loop plays the night out to the next stop; the tape deck
 * (the old lamp) pauses and plays that out and closes the week. They talk through one DOM event on document: 'sb-play' with detail
 * { cmd: 'pause' | 'resume' | 'next', by }: 'next' plays the night out in one go, by: 'player' is the player pausing.
 * The week screen fires 'resume' and 'pause' itself when the loop starts and stops on its own, so the deck follows.
 * SB.UI.playing() says whether the loop is running.
 */
(function (SB) {
  'use strict';

  /* Interface chrome for the shell (00-overview 6.6). Game words come from strings.js. */
  SB.Content.ui.shell = {
    rail: { week: 'Week', inbox: 'Inbox', shows: 'Shows', bands: 'Bands', rooms: 'Rooms', town: 'Town', notebook: 'Notes',
            people: 'People', money: 'Money', legacy: 'Legacy', settings: 'Settings' },
    phase: { PLAN: 'Planning', PLAY: 'Playing', CLOSE: 'Closing out', OVER: 'Over' },
    week: 'Week {n}',
    dates: '{from} – {to}',
    hours: '{used} of {cap} hours',
    hoursOver: '{n} over',
    stress: 'Stress',
    openAsk: 'Open this game instead? The game you are in is saved first.', openYes: 'Open it',
    leaveAsk: 'Your game is saved. Go back to the title?', leaveYes: 'Go to the title', leaveNo: 'Stay at the desk',
    callNight: 'Call it a night',
    pause: 'Pause',
    resume: 'Play on',
    next: 'Next',
    closeWeek: 'Close the week',
    startWeek: 'Start week {n}',
    theEnd: 'How it ended',
    stressTitle: 'How you are holding up',
    causes: 'What is wearing on you',
    easing: 'What helps',
    close: 'Close',
    back: 'Back',
    toWeek: 'To the week',
    toDesk: 'Back to the desk',
    toStart: 'To the start',
    placeholderTitle: 'Not on the desk yet',
    placeholderBody: 'This part of the game is still being built.',
    errorTitle: 'Something broke.',
    errorBody: 'The game hit a problem it could not handle. Export the save before you reload, to be safe.',
    exportSave: 'Export save',
    reload: 'Reload',
    exportHelp: 'Copy this text somewhere safe. You can import it from Settings.',
    missingTitle: 'Some of the game did not load',
    missingBody: 'These parts are missing:',
    missingDev: 'Add ?dev to the end of the address to open it anyway.',
    skip: 'Skip to the main desk'
  };

  /* The sections reachable by number keys and the address bar (the old rail; the desk's objects open them now). */
  var RAIL = ['week', 'inbox', 'shows', 'bands', 'rooms', 'town', 'notebook', 'people', 'money', 'legacy', 'settings'];

  var state = null;          // the game in play
  var slot = null;           // its save slot
  var current = null;        // { name, params, def, hooks, keys: [map] }
  var trail = [];            // history: [{ name, params }]
  var cards = [];            // open cards, top last
  var pop = null;            // the open popover: { el, close }
  var playing = false;       // the week screen's loop should run
  var saveAt = 0, saveTimer = null;
  var booted = false;

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function S(key, ctx) { return SB.text.label('ui.shell.' + key, ctx); }
  function el(id) { return (typeof document !== 'undefined' && document.getElementById) ? document.getElementById(id) : null; }
  function hasLabel(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return hasLabel(key) ? SB.text.label(key) : fb; }
  function now() { return Date.now(); }

  /* ---------------------------------------------------------------- */
  /* toasts, cards, popovers                                          */
  /* ---------------------------------------------------------------- */

  /** toast(text, kind): one line, bottom left, 4 seconds. kind: 'info' | 'learned' | 'no'. */
  function toast(text, kind) {
    var box = el('toasts'), t, F;
    if (!box || !text) return;
    t = h('div', { class: 'sb-toast pz-paper sb-toast--' + (kind || 'info'), role: 'status', text: String(text) });
    box.appendChild(t);
    while (box.children && box.children.length > 4) box.removeChild(box.firstChild);
    F = SB.Finish;
    if (F && F.move) F.move(t, 'slap', { cue: 'scrap', cueOpts: { gain: -7 } });
    setTimeout(function () {
      if (!t.parentNode) return;
      if (F && F.move) F.move(t, 'peel', { cue: 'tear', cueOpts: { gain: -12 }, done: function () { if (t.parentNode) t.parentNode.removeChild(t); } });
      else t.parentNode.removeChild(t);
    }, 4000);
  }

  var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /** card(element, opts) -> close(). A centered card over the scrim in #overlay; traps focus; returns focus on close.
   *  opts: { label, dismiss (default true: Esc and a click on the scrim close it), onClose, wide }. */
  function card(content, opts) {
    var o = opts || {}, overlay = el('overlay'), prev = (typeof document !== 'undefined') ? document.activeElement : null, box, frame, scrim, rec, hero, closed = false, F = SB.Finish;
    if (!overlay) return function () {};
    function close() {
      var i;
      if (closed) return;
      closed = true;
      if (F && F.move && scrim.parentNode && !(F.reduced && F.reduced())) {          // the card peels off; the dim lifts at once
        scrim.classList.add('is-leaving'); scrim.inert = true;
        F.move(frame, 'peel', { cue: 'tear', cueOpts: { gain: -10 }, done: function () { if (scrim.parentNode) scrim.parentNode.removeChild(scrim); } });
      } else if (scrim.parentNode) scrim.parentNode.removeChild(scrim);
      i = cards.indexOf(rec); if (i >= 0) cards.splice(i, 1);
      if (!cards.length) overlay.classList.remove('is-open');
      if (prev && typeof prev.focus === 'function' && prev.isConnected !== false) { try { prev.focus(); } catch (e) { /* gone */ } }
      if (!prev || prev.isConnected === false || document.activeElement !== prev) setTimeout(function () {          // what had the keyboard is gone (the screen was rebuilt): land on the first control, not the page (0.9)
        var a = document.activeElement, t;
        if (cards.length || (a && a !== document.body && a.isConnected !== false)) return;
        t = document.querySelector('.sy-strip-open, main .kt-btn, main button, main input, .dk-hits:not([inert]) .dk-hit');
        if (t) try { t.focus({ preventScroll: true }); } catch (e) { /* fine */ }
      }, 120);
      if (typeof o.onClose === 'function') o.onClose();
    }
    box = h('div', { class: 'sb-card' + (o.wide ? ' sb-card--wide' : ''), role: 'dialog', tabindex: '-1', 'aria-modal': 'true', aria: { label: o.label || null } }, content);
    frame = h('div', { class: 'sb-card-frame' + (o.wide ? ' sb-card-frame--wide' : '') }, box);
    scrim = h('div', { class: 'sb-scrim', on: {
      mousedown: function (e) { if (e.target === scrim && o.dismiss !== false) close(); },
      keydown: function (e) {
        var list, first, last;
        if (cards[cards.length - 1] !== rec) return;
        if (e.key === 'Escape' && o.dismiss !== false) { e.preventDefault(); e.stopPropagation(); close(); return; }
        if (e.key === 'Tab') {
          list = box.querySelectorAll(FOCUSABLE); if (!list.length) { e.preventDefault(); box.focus(); return; }
          first = list[0]; last = list[list.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      } } }, frame);
    rec = { el: scrim, close: close };
    cards.push(rec);
    overlay.appendChild(scrim);
    overlay.classList.add('is-open');
    if (F && F.move) {
      /* a content that slaps itself (class mv-slap) keeps its own entrance; the card's one number or answer stamps in */
      if (!(content && content.classList && content.classList.contains('mv-slap'))) F.move(frame, 'slap', { cue: 'scrap', cueOpts: { gain: -6 } });
      hero = box.querySelector('.sb-hero, .cu-mug-zone');
      if (hero) F.move(hero, 'stamp', { delay: 220, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
    }
    if (F && F.scrollbar) { try { F.scrollbar(box); } catch (e) { /* fine */ } }
    (function focusIn() {
      var f = box.querySelector('.sb-decision') || box.querySelector(FOCUSABLE) || box;
      try { f.focus(); } catch (e) { /* fine */ }
    })();
    return close;
  }

  /** popover(anchor, element) -> close(). Below the anchor; Esc or a click outside closes it. */
  function popover(anchor, content) {
    var overlay = el('overlay'), box, r, offDown, offKey, F = SB.Finish, u = (SB.UI.unit && SB.UI.unit()) || 1;
    if (pop) pop.close();
    if (!overlay) return function () {};
    box = h('div', { class: 'sb-popover pz-paper', role: 'dialog', tabindex: '-1' }, content);
    try {
      r = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : null;
      if (r) { box.style.top = 'calc(var(--u) * ' + ((r.bottom / u) + 6).toFixed(1) + ')'; box.style.left = 'calc(var(--u) * ' + (Math.max(8, r.left) / u).toFixed(1) + ')'; }
    } catch (e) { /* positioned by CSS */ }
    function close() {
      if (!pop || pop.el !== box) return;
      pop = null;
      offDown(); offKey();
      if (F && F.move && box.parentNode && !(F.reduced && F.reduced())) {
        box.inert = true;
        F.move(box, 'peel', { cue: 'tear', cueOpts: { gain: -12 }, done: function () { if (box.parentNode) box.parentNode.removeChild(box); } });
      } else if (box.parentNode) box.parentNode.removeChild(box);
      if (anchor && anchor.focus) { try { anchor.focus(); } catch (e) { /* gone */ } }
    }
    offDown = SB.UI.on(document, 'mousedown', function (e) { if (!box.contains(e.target) && e.target !== anchor) close(); });
    offKey = SB.UI.on(document, 'keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); close(); } });
    overlay.appendChild(box);
    pop = { el: box, close: close };
    if (F && F.move) F.move(box, 'slap', { cue: 'scrap', cueOpts: { gain: -9 } });
    try { box.focus(); } catch (e) { /* fine */ }
    return close;
  }

  /* ---------------------------------------------------------------- */
  /* errors                                                           */
  /* ---------------------------------------------------------------- */

  function exportBox() {
    var text = '', ta;
    try { text = state ? SB.Save.exportText(state) : ''; } catch (e) { text = ''; }
    ta = h('textarea', { class: 'sb-export', readonly: true, rows: '6', aria: { label: S('exportSave') } });
    ta.value = text;
    return ta;
  }
  function download(text, name) {
    var a, url;
    try {
      url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      a = h('a', { href: url, download: name, class: 'sb-vh' });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      return true;
    } catch (e) { return false; }
  }

  /** The error card: the message, "export save", "reload". */
  function showError(err) {
    var msg = (err && err.where ? err.where + ': ' : '') + (err && err.message ? err.message : String(err)), body, holder;
    SB.log('error', 'SB.UI', msg, { stack: err && err.stack });
    if (typeof document === 'undefined' || !el('overlay')) return;
    holder = h('div', { class: 'sb-error-export' });
    body = h('div', { class: 'sb-error' }, [
      h('h2', { text: S('errorTitle') }),
      h('p', { text: S('errorBody') }),
      h('pre', { class: 'sb-error-msg', text: msg }),
      holder,
      h('div', { class: 'sb-actions' }, [
        state ? C().Button({ label: S('exportSave'), onClick: function () {
          var text = '';
          try { text = SB.Save.exportText(state); } catch (e) { text = ''; }
          SB.UI.clear(holder);
          holder.appendChild(h('p', { text: S('exportHelp') }));
          holder.appendChild(exportBox());
          if (text) download(text, 'scene-booker-' + (slot || 'save') + '.json');
        } }) : null,
        C().Button({ kind: 'primary', label: S('reload'), onClick: function () { try { location.reload(); } catch (e) { /* no location */ } } }),
        C().Button({ kind: 'quiet', label: S('close'), onClick: function () { closeErr(); } })
      ])
    ]);
    var closeErr = card(body, { label: S('errorTitle') });
  }

  /* ---------------------------------------------------------------- */
  /* state changes                                                    */
  /* ---------------------------------------------------------------- */

  function slotFor(s) {
    var base = String((s && s.seed) || 'game').replace(/[^A-Za-z0-9_-]/g, '');
    return ('g-' + base).slice(0, 40);   // SPEC?: 05-interface names no slot rule; one slot per career, named by its seed
  }

  var saveWarned = false, startAsking = false;

  /* Two tabs on one slot would overwrite each other (0.2): each tab stamps the slot it plays in localStorage every save,
   * and a tab that finds another's fresh stamp warns and does not write. */
  var TAB = 't' + Math.random().toString(36).slice(2, 9), lockSlot = null, leaving = false;
  function lockKey(sl) { return 'sb.lock.' + sl; }
  function lockTaken(sl) {
    var v;
    try {
      v = JSON.parse(localStorage.getItem(lockKey(sl)) || 'null');
      return !!(v && v.tab !== TAB && Date.now() - v.at < 20000);
    } catch (e) { return false; }
  }
  function stampLock(sl) { try { localStorage.setItem(lockKey(sl), JSON.stringify({ tab: TAB, at: Date.now() })); lockSlot = sl; } catch (e) { /* no storage: no lock */ } }
  function releaseLock() {
    try {
      if (lockSlot && JSON.parse(localStorage.getItem(lockKey(lockSlot)) || 'null').tab === TAB) localStorage.removeItem(lockKey(lockSlot));
    } catch (e) { /* fine */ }
    lockSlot = null;
  }
  function saveFailed() {
    if (saveWarned) return;
    saveWarned = true;
    toast("Couldn't save. Export your game from Settings.", 'no');
  }

  /* "Not saved" stays on the desk until a save works (0.1): one toast and then nothing was easy to miss */
  function saveLine(on, msg) {
    var d = typeof document !== 'undefined' ? document : null, e;
    if (!d || !d.body || !SB.UI.h) return;
    e = d.getElementById ? d.getElementById('savewarn') : null;
    if (!on) { if (e && e.parentNode) e.parentNode.removeChild(e); return; }
    if (e) return;
    e = SB.UI.h('p', { id: 'savewarn', role: 'status', text: msg || 'Not saved. Your last moves are only in this tab. Export your game from Settings.',
                       style: { position: 'fixed', left: '8px', bottom: '8px', zIndex: '9999', margin: '0', padding: '6px 10px', background: '#111', color: '#ffd23f', font: '700 13px/1.3 sans-serif', maxWidth: '90vw' } });
    d.body.appendChild(e);
  }

  function doSave() {
    saveTimer = null;
    if (!state || !SB.Save) return;
    saveAt = now();
    if (lockTaken(slot || slotFor(state))) { saveLine(true, 'This game is open in another tab. This tab is not saving, so it will not overwrite the other one. Close one of the two.'); return; }
    try {
      if (!leaving) stampLock(slot || slotFor(state));
      var r = SB.Save.save(state, slot || slotFor(state), saveAt);
      if (r && r.ok === false) { SB.log('warn', 'SB.UI.autosave', r.why || 'not saved'); saveFailed(); saveLine(true); }
      else {
        saveWarned = false; saveLine(false);
        if (r && typeof r.bytes === 'number' && r.bytes > 2500000) SB.log('warn', 'SB.UI.autosave', 'the save is ' + Math.round(r.bytes / 1024) + ' KB');
      }
    } catch (e) { SB.log('warn', 'SB.UI.autosave', String(e && e.message)); saveFailed(); saveLine(true); }
  }
  /** flush(): write the save now, whatever the throttle says (leaving the page, a cutscene, a night called). */
  function flush() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    doSave();
  }
  /** At most once a second. */
  function autosave() {
    var t = now();
    if (!state) return;
    if (t - saveAt >= 1000) { doSave(); return; }
    if (!saveTimer) saveTimer = setTimeout(doSave, 1000 - (t - saveAt));
  }

  /** act(fn): the only way state changes. Runs fn(state). An SBError (or any throw) shows the error card; a Result with
   *  ok: false is toasted and returned; otherwise it autosaves, redraws the desk and calls the screen's update. */
  function act(f, opts) {
    var r, line;
    if (typeof f !== 'function') SB.fail('SB.UI.act', 'act needs a function');
    try { r = f(state); }
    catch (e) { showError(e); return null; }
    if (r && r.ok === false) {
      if (r.why) toast(r.why, 'no');
      return r;
    }
    /* every press says what it did (2.12): a result carrying `said`, or a caller passing { say: text | fn(result) }, toasts one sentence */
    try {
      line = opts && opts.say !== undefined ? (typeof opts.say === 'function' ? opts.say(r) : opts.say) : (r && typeof r.said === 'string' ? r.said : '');
      if (line) toast(String(line), 'info');
    } catch (e) { /* the press still counts */ }
    autosave();
    refresh();
    storyPump();
    return r;
  }

  /* Act I on the desk (js/ui/story.js): the cutscene queue, Dana's texts and the tape arrow, the patch card */
  function storyPump() {
    if (!SB.UI.story || typeof SB.UI.story.pump !== 'function') return;
    try { SB.UI.story.pump(); } catch (e) { SB.log('warn', 'SB.UI.story', String(e && e.message)); }
  }

  /** Redraw the desk and call the current screen's update. */
  function refresh() {
    /* keep the keyboard on the control it was on, or the one that replaced it, when a press rebuilds a list (0.9) */
    var d = typeof document !== 'undefined' ? document : null, a = d ? d.activeElement : null, fk = null, ref = null, i, list, back;
    try {
      if (a && a.getAttribute && a !== d.body && a.closest && a.closest('.sb-main')) { fk = a.getAttribute('data-fk'); ref = a.getAttribute('data-tut-ref'); }
    } catch (e) { fk = null; }
    renderShell();
    if (current && current.hooks && typeof current.hooks.update === 'function') {
      try { current.hooks.update(); } catch (e) { showError(e); }
    }
    if (fk && d && d.querySelector) {
      try {
        a = d.activeElement;
        if (!a || a === d.body || a.isConnected === false) {
          list = d.querySelectorAll('.sb-main [data-fk="' + String(fk).replace(/"/g, '') + '"]');
          back = null;
          for (i = 0; i < list.length; i++) if (!ref || list[i].getAttribute('data-tut-ref') === ref) { back = list[i]; break; }
          if (!back && list.length) back = list[0];
          if (back && back.focus) back.focus({ preventScroll: true });
        }
      } catch (e) { /* the keyboard stays where the browser put it */ }
    }
  }

  /* ---------------------------------------------------------------- */
  /* routing                                                          */
  /* ---------------------------------------------------------------- */

  function placeholder(name, params) {
    var p = params && Object.keys(params).length ? JSON.stringify(params) : '';
    return h('section', { class: 'sb-card sb-placeholder', data: { route: name } }, [
      h('h1', { class: 'sb-placeholder-route', text: name }),
      h('p', { text: S('placeholderTitle') + '. ' + S('placeholderBody') }),
      p ? h('p', { class: 'sb-placeholder-params', text: p }) : null,
      h('div', { class: 'sb-actions' }, [
        trail.length ? C().Button({ label: S('back'), onClick: back }) : null,
        state && name !== 'desk' ? C().Button({ label: S('toDesk'), onClick: function () { go('desk'); } }) : null,
        !state && name !== 'start' && SB.UI.screens.start ? C().Button({ label: S('toStart'), onClick: function () { go('start'); } }) : null
      ])
    ]);
  }

  function unmountCurrent() {
    if (!current) return;
    if (current.hooks && typeof current.hooks.unmount === 'function') {
      try { current.hooks.unmount(); } catch (e) { SB.log('warn', 'SB.UI.go', 'unmount ' + current.name + ': ' + (e && e.message)); }
    }
    current.keys = [];
    if (pop) pop.close();
  }

  /** True when a route is shown as a close-up over the desk (a game is running, the route is not full screen and
   *  is not the desk itself). */
  function isCloseup(name, def) {
    return !!(state && name !== 'desk' && !(def && def.full) && !(def && def.desk) && SB.DeskCloseup);
  }

  function mount(name, params) {
    var main = el('main'), def = SB.UI.screens[name], hooks = null, title, host, was = current ? current.name : null;
    unmountCurrent();
    /* the outgoing close-up leaves with its move over the next screen (js/ui/finish.js) */
    if (main && SB.Finish && SB.Finish.leave) { try { SB.Finish.leave(main, was, name); } catch (e) { SB.log('warn', 'SB.UI.mount', 'leave: ' + (e && e.message)); } }
    current = { name: name, params: params || {}, def: def || null, hooks: null, keys: [] };
    try { if (typeof location !== 'undefined' && location) location.hash = '#/' + name; } catch (e) { /* file:// without hash support */ }
    if (main) {
      SB.UI.clear(main);
      main.className = 'sb-main sb-screen-' + name + (isCloseup(name, def) ? ' is-closeup' : '');
      host = main;
      if (isCloseup(name, def)) {
        try { host = SB.DeskCloseup.frame(main, name) || main; } catch (e) { SB.log('warn', 'SB.UI.mount', 'close-up frame: ' + (e && e.message)); host = main; }
      }
      if (!def) host.appendChild(placeholder(name, params));
      else {
        try { hooks = def.mount(host, current.params) || {}; }
        catch (e) { showError(e); SB.UI.clear(host); host.appendChild(placeholder(name, params)); }
      }
    }
    current.hooks = hooks;
    title = def && def.title ? SB.text.label(def.title) : name;
    try { document.title = (title && title !== def.title ? title + ' · ' : '') + 'Scene Booker'; } catch (e) { /* no title */ }
    renderShell();
    if (main && typeof main.focus === 'function' && !cards.length) { try { main.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
    /* the desk's own page is empty, so main cannot hold the keyboard there: land on the thing just put down (back from the
       phone, the phone), or the first control on the desk, not on the page (keyboard play, 0.9) */
    if (name === 'desk' && !cards.length) setTimeout(function () {
      var a = document.activeElement, t = null, hits;
      if (current && current.name !== 'desk') return;
      if (a && a !== document.body && a !== main && a.isConnected !== false && a.tagName !== 'MAIN') return;
      hits = document.querySelectorAll('.dk-hits:not([inert]) .dk-hit');
      if (was && SB.Desk && SB.Desk.objects) {
        SB.Desk.objects().forEach(function (o) { if (!t && o.route === was) { var i; for (i = 0; i < hits.length; i++) if (hits[i].getAttribute('data-obj') === o.id) t = hits[i]; } });
      }
      t = t || document.querySelector('.sy-strip-open') || hits[0];
      if (t) try { t.focus({ preventScroll: true }); } catch (e) { /* fine */ }
    }, 60);
    storyPump();
  }

  /** go(name, params): unmount the current screen, mount the named one, push history. */
  function go(name, params) {
    if (typeof name !== 'string' || !name) SB.fail('SB.UI.go', 'a route name is needed');
    /* the show night and the close-out hand the screen back to the desk, not to the calendar */
    if (name === 'week' && state && current && (current.name === 'night' || current.name === 'close')) name = 'desk';
    if (current) { trail.push({ name: current.name, params: current.params }); if (trail.length > 50) trail.shift(); }
    mount(name, params || {});
  }

  /** back(): the previous screen. */
  function back() {
    var prev = trail.pop();
    /* never back out of a game in play onto the title or the town picker (0.2): the desk is the floor */
    while (prev && state && PREGAME.indexOf(prev.name) >= 0) prev = trail.pop();
    if (!prev) { mount(state ? 'desk' : 'start', {}); return; }
    mount(prev.name, prev.params);
  }
  var PREGAME = ['start', 'city', 'tune'];

  /** leave(): the one way out of a game in play. It saves, and asks once: "Your game is saved. Go back to the title?" */
  var leaving = null;
  function leave() {
    var box, close;
    if (!state) { quit(); return; }
    if (leaving) return;
    doSave();
    box = h('div', { class: 'sb-leave' }, [
      h('p', { class: 'sb-leave-t', text: S('leaveAsk') }),
      h('div', { class: 'sb-leave-b' }, [
        h('button', { type: 'button', class: 'pz-hl', data: { fk: 'leave-yes' }, text: S('leaveYes'), on: { click: function () { close(); quit(); } } }),
        h('button', { type: 'button', class: 'pz-hl', data: { fk: 'leave-no' }, text: S('leaveNo'), on: { click: function () { close(); } } })
      ])
    ]);
    close = card(box, { label: S('leaveAsk'), onClose: function () { leaving = null; } });
    leaving = close;
  }

  /** A route typed in the address bar, or reached with the browser's back and forward buttons. Only routes that need no
   *  params are followed: the rail's sections while a game is in play, and the start and city screens. */
  function hashRoute() {
    var m = null;
    try { m = /^#\/([A-Za-z][A-Za-z0-9_-]*)/.exec((typeof location !== 'undefined' && location && location.hash) || ''); } catch (e) { m = null; }
    return m ? m[1] : null;
  }
  function routeOk(name) {
    if (state && PREGAME.indexOf(name) >= 0) return false;             // a game in play is left only through leave() (0.2)
    if (name === 'start' || (!state && name === 'city')) return !!SB.UI.screens[name];
    return !!state && (name === 'desk' || RAIL.indexOf(name) >= 0);
  }
  function onHash() {
    var name = hashRoute();
    if (!name || (current && current.name === name)) return;
    if (!routeOk(name)) {
      /* put the address back to the screen that is showing, without a new history entry */
      try { if (current && history && history.replaceState) history.replaceState(null, '', '#/' + current.name); } catch (e) { /* fine */ }
      if (state && PREGAME.indexOf(name) >= 0) leave();               // the browser's Back from the desk asks, it never leaves
      return;
    }
    cards.slice().forEach(function (c) { c.close(); });
    if (pop) pop.close();
    go(name);
  }

  /** game(): the state in play, or null. */
  function game() { return state; }

  /** start(state, slot): begin playing a new or loaded state: sit down at the desk. */
  function start(s, slotName, opts) {
    if (!s || typeof s !== 'object' || !s.clock) SB.fail('SB.UI.start', 'not a game state');
    /* opening another game over one in play asks first (0.2); the one in play is written before it is put away */
    if (opts && opts.ask && state && state !== s && !startAsking) {
      var close;
      startAsking = true;
      doSave();
      close = card(h('div', { class: 'sb-leave' }, [
        h('p', { class: 'sb-leave-t', text: S('openAsk') }),
        h('div', { class: 'sb-leave-b' }, [
          h('button', { type: 'button', class: 'pz-hl', data: { fk: 'open-yes' }, text: S('openYes'), on: { click: function () { close(); startAsking = false; start(s, slotName); } } }),
          h('button', { type: 'button', class: 'pz-hl', data: { fk: 'open-no' }, text: S('leaveNo'), on: { click: function () { close(); } } })
        ])
      ]), { label: S('openAsk'), onClose: function () { startAsking = false; } });
      return;
    }
    releaseLock();
    state = s;
    SB.text.off = !!(s.settings && s.settings.noText);
    slot = slotName || slotFor(s);
    playing = false;
    trail = [];
    current = current ? (unmountCurrent(), null) : null;
    mount('desk', {});
    sendPlay('next');            // sit down at this evening: a new game, a new week or a save between stops plays on to it
    autosave();
  }

  /** quit(): save now and put the game away: back to the title (the quick menu's last line, js/ui/pause.js). */
  function quit() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    doSave();
    cards.slice().forEach(function (c) { c.close(); });
    releaseLock();
    state = null; slot = null; playing = false; trail = [];
    mount('start', {});
  }

  /** keys(map): screen-level key bindings { key: fn(event) }, removed when the screen unmounts. Returns a remover. */
  function keys(map) {
    var holder = current;
    if (!holder || !map) return function () {};
    holder.keys.push(map);
    return function () { var i = holder.keys.indexOf(map); if (i >= 0) holder.keys.splice(i, 1); };
  }

  /* ---------------------------------------------------------------- */
  /* the lamp: call it a night (pulled by the pinned clock, js/ui/nightclock.js), pause, close the week (the tape deck) */
  /* ---------------------------------------------------------------- */

  function setPlaying(v) { playing = !!v; renderShell(); }
  function sendPlay(cmd) { SB.UI.fire('sb-play', { cmd: cmd }); }

  /* Call it a night: the evening's hours are done with; the loop plays the night out to the next evening (or a
   * decision, a show night, the end of the week). */
  function tonightShow() {
    var k, x;
    if (!state || !state.shows || !state.clock) return false;
    for (k in state.shows) { x = state.shows[k]; if (x && x.status === 'CONFIRMED' && x.day === state.clock.day) return true; }
    return false;
  }
  function callNight() {
    flush();                                                    // the evening's work is written before the night plays (0.1)
    var showNight = tonightShow(), r = act(function (s) { return SB.Week.endNight(s); }), k, st, sid = null, x;
    /* a press never does nothing: a refusal with no reason of its own still says so (0.11) */
    if (!r) return;
    if (r.ok === false) { if (!r.why) toast('The night could not be called yet. Open the phone or the show to see what is waiting.', 'no'); return; }
    if (r.settled && r.settled.length) toast(r.settled[0] + (r.settled.length > 1 ? ' (and ' + (r.settled.length - 1) + ' more left undone.)' : ''), 'no');
    /* on a show's own night, play straight to the doors rather than trusting the loop of another screen to be listening */
    for (k = 0; k < 8 && showNight && state && state.clock && !state.clock.stop; k++) {
      x = act(function (s) { return SB.Week.step(s); });
      if (!x || x.ok === false) break;
    }
    st = state && state.clock ? state.clock.stop : null;
    if (st && st.kind === 'SHOW_NIGHT') sid = st.showId;
    if (sid && state.shows[sid] && state.shows[sid].status === 'CONFIRMED') { go('night', { showId: sid }); return; }
    if (!current || (current.name !== 'week' && current.name !== 'desk')) go('desk');
    sendPlay('resume');
  }
  function closeWeek() {
    var r = act(function (s) { return SB.Week.close(s); });
    if (r && r.ok !== false) { setPlaying(false); go('close'); }
  }
  function nextWeek() {
    var r = act(function (s) { return SB.Week.nextWeek(s); });
    if (r && r.ok !== false) { go('desk'); sendPlay('resume'); }      // the new week plays on to its first evening
  }

  /** What pulling the lamp chain does now: { key, text } or null with no game. */
  function lampLabel() {
    var ph, stop, n;
    if (!state || !state.clock) return null;
    ph = state.clock.phase; stop = state.clock.stop;
    switch (ph) {
      case 'PLAN': return { key: 'resume', text: S('resume') };          // an old save made while planning: it just plays on
      case 'PLAY':
        if (stop && stop.kind === 'END_OF_WEEK') return { key: 'close', text: S('closeWeek') };
        if (stop && stop.kind === 'EVENING') return { key: 'night', text: S('callNight') };
        return playing ? { key: 'pause', text: S('pause') } : { key: 'resume', text: S('resume') };
      case 'CLOSE':
        n = (typeof state.clock.week === 'number' ? state.clock.week : 0) + 2;   // weeks are shown counting from 1
        return { key: 'next', text: S('startWeek', { n: n }) };
      case 'OVER': return { key: 'end', text: S('theEnd') };
      default: return null;
    }
  }
  /** Pull the lamp chain (press the tape deck): call it a night, pause or play on, close the week, start the next one. */
  function lampPull() {
    var l = lampLabel();
    if (!l) return;
    switch (l.key) {
      case 'night': callNight(); break;
      case 'pause': SB.UI.fire('sb-play', { cmd: 'pause', by: 'player' }); break;
      case 'resume':
        if (!current || (current.name !== 'week' && current.name !== 'desk')) go('desk');
        sendPlay('resume'); break;
      case 'close': closeWeek(); break;
      case 'next': nextWeek(); break;
      case 'end': go('legacy', { tab: 'end' }); break;
    }
  }

  function renderShell() {
    var full = !!(current && current.def && current.def.full), closeup = !!(current && isCloseup(current.name, current.def));
    if (SB.Desk && typeof SB.Desk.render === 'function') {
      try { SB.Desk.render(state, { full: full, closeup: closeup }); } catch (e) { SB.log('warn', 'SB.UI.desk', String(e && e.message)); }
    }
    /* tonight's clock, pinned to the same corner of the desk and every close-up, with the one CALL IT A NIGHT */
    if (SB.NightClock) {
      try { SB.NightClock.render(state, { full: full }); } catch (e) { SB.log('warn', 'SB.UI.clock', String(e && e.message)); }
    }
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.toggle('is-full', full || !state);
      document.body.classList.toggle('no-game', !state);
      document.body.classList.toggle('at-desk', !!state && !full);
      document.body.classList.toggle('is-closeup', closeup);
    }
  }

  /* ---------------------------------------------------------------- */
  /* keys and glossary terms                                          */
  /* ---------------------------------------------------------------- */

  function typing(t) {
    var tag = t && t.tagName ? String(t.tagName).toLowerCase() : '';
    return tag === 'input' || tag === 'textarea' || tag === 'select' || !!(t && t.isContentEditable);
  }

  function onKey(e) {
    var i, m, k = e.key, idx;
    if (cards.length || pop) return;                   // a card or a popover has the keyboard
    if (SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()) return;   // so has a cutscene
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (typing(e.target) && k !== 'Escape') return;
    /* Escape puts a close-up down, unless the screen inside was in the middle of something it cancels first */
    if (k === 'Escape' && current && isCloseup(current.name, current.def)) {
      var mainEl = el('main'), busy = !!(mainEl && mainEl.querySelector && mainEl.querySelector('.is-picking'));
      if (busy) { for (i = current.keys.length - 1; i >= 0; i--) { m = current.keys[i]; if (m && typeof m.Escape === 'function') { e.preventDefault(); m.Escape(e); return; } } }
      e.preventDefault(); go('desk'); return;
    }
    /* on the desk, Escape is the quick menu: the week screen hidden under it to run the play loop binds Escape too,
       but only to drop a note you are dragging on the calendar, which never happens there */
    if (k === 'Escape' && SB.Pause && current && current.name === 'desk' && (!SB.Boot || SB.Boot.done())) { e.preventDefault(); SB.Pause.open(); return; }
    if (current && current.keys.length) {
      for (i = current.keys.length - 1; i >= 0; i--) {
        m = current.keys[i];
        if (m && typeof m[k] === 'function') { e.preventDefault(); m[k](e); return; }
      }
    }
    /* Escape anywhere else (the desk, the title, the night): the quick menu (js/ui/pause.js), not while loading */
    if (k === 'Escape' && SB.Pause && (!SB.Boot || SB.Boot.done())) { e.preventDefault(); SB.Pause.open(); return; }
    if (!state || (current && current.def && current.def.full)) return;
    /* P is the phone from anywhere, the desk and every close-up included (fix list 0.9) */
    if ((k === 'p' || k === 'P') && current && current.name !== 'inbox' && !document.body.classList.contains('nt-playing')) { e.preventDefault(); go('inbox'); return; }
    /* C puts the keyboard on the clock's main button (call it a night, go to the show, close the week): focus only, so a
     * stray key never ends a night by itself (fix list 0.9: it was 9 to 18 Tab stops from a show card) */
    if ((k === 'c' || k === 'C') && !document.body.classList.contains('nt-playing')) {
      var ck = document.querySelector('button.ck-call:not(.ck-stay):not(.ck-skip):not(.ck-act)');
      if (ck) { e.preventDefault(); ck.focus(); return; }
    }
    if (/^[0-9]$/.test(k)) {
      idx = k === '0' ? 9 : parseInt(k, 10) - 1;
      if (RAIL[idx]) { e.preventDefault(); go(RAIL[idx]); }
      return;
    }
    if (k === '?') { e.preventDefault(); go('notebook', { page: 'HOW' }); }
  }

  /* A press that rebuilds the control under the keyboard (the clock, a strip, a card) must not drop it on the page: when the
     focused control is removed and nothing took the focus, the same control (by label, key or class) gets it back (0.9). */
  var keptAt = 0;
  function keepKeyboard(e) {
    var t = e && e.target, lab, fk, ob, cls;
    if (!t || !t.getAttribute || e.relatedTarget || !state) return;
    lab = t.getAttribute('aria-label'); fk = t.getAttribute('data-fk'); ob = t.getAttribute('data-obj'); cls = String(t.className || '');
    setTimeout(function () {
      var a = document.activeElement, list, i, pick = null, ok;
      if (t.isConnected !== false || (a && a !== document.body) || cards.length || pop) return;
      if (SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()) return;
      if (Date.now() - keptAt < 40) return;
      list = document.querySelectorAll(FOCUSABLE);
      ok = function (n) { return !n.closest('[inert],[hidden],[aria-hidden="true"]') && n.getClientRects().length > 0; };
      for (i = 0; i < list.length && !pick; i++) if (lab && list[i].getAttribute('aria-label') === lab && ok(list[i])) pick = list[i];
      for (i = 0; i < list.length && !pick; i++) if (ob && list[i].getAttribute('data-obj') === ob && ok(list[i])) pick = list[i];
      for (i = 0; i < list.length && !pick; i++) if (fk && list[i].getAttribute('data-fk') === fk && ok(list[i])) pick = list[i];
      if (!pick && cls && /\bck-call\b/.test(cls)) for (i = 0; i < list.length && !pick; i++) if (/\bck-call\b/.test(list[i].className) && ok(list[i])) pick = list[i];
      if (!pick && current && current.name === 'night') {   // the night screen's own pieces come and go: land on the note, the skip button or the report
        pick = document.querySelector('.nt-note .nt-tab:not([disabled]), [data-fk="skip"], [data-fk="open"], .nt-tab:not([disabled])');
      }
      if (pick) { keptAt = Date.now(); try { pick.focus({ preventScroll: true }); } catch (x) { /* fine */ } }
    }, 60);
  }

  function onTerm(e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-term]') : null, term, tip;
    if (!t) return;
    term = t.getAttribute('data-term');
    if (!term) return;
    /* no title attribute: the browser's own box would turn up on top of the game's slip */
    if (!t.getAttribute('aria-description') && hasLabel('glossary.' + term + '.short')) {
      tip = SB.text.label('glossary.' + term + '.short');
      if (!t.getAttribute('aria-label') && !t.getAttribute('aria-describedby')) t.setAttribute('aria-description', tip);
    }
    if (state && state.notebook && state.notebook.terms && state.notebook.terms[term] === undefined && SB.Notebook && SB.Notebook.seeTerm) {
      /* no redraw: a rebuild under a focused word dropped the keyboard on the page (0.9) */
      try { SB.Notebook.seeTerm(state, term); autosave(); } catch (x) { SB.log('warn', 'SB.UI.term', String(x && x.message)); }
    }
  }

  /* ---------------------------------------------------------------- */
  /* boot                                                             */
  /* ---------------------------------------------------------------- */

  function missingPage(list) {
    var main = el('main');
    if (!main) return;
    SB.UI.clear(main);
    main.appendChild(h('section', { class: 'sb-card sb-missing' }, [
      h('h1', { text: S('missingTitle') }),
      h('p', { text: S('missingBody') }),
      h('ul', null, list.map(function (m) { return h('li', { class: 'sb-num', text: m }); })),
      h('p', { class: 'sb-quiet', text: S('missingDev') })
    ]));
  }

  function boot() {
    var dev = false, missing;
    if (booted) return;
    booted = true;
    try { dev = typeof location !== 'undefined' && /[?&]dev\b/.test(location.search || ''); } catch (e) { dev = false; }
    if (SB.UI.prefs) SB.UI.prefs.apply();
    missing = SB.verify(['engine', 'cities', 'art', 'ui']);
    if (missing.length) {
      SB.log('warn', 'SB.UI.boot', 'missing: ' + missing.join(', '));
      if (dev) { if (typeof console !== 'undefined') console.warn('Scene Booker: missing ' + missing.join(', ')); }
      else { missingPage(missing); return; }
    }
    SB.UI.on(document, 'keydown', onKey);
    SB.UI.on(document, 'focusout', keepKeyboard);
    SB.UI.on(document, 'mouseover', onTerm);
    SB.UI.on(document, 'focusin', onTerm);
    SB.UI.on(document, 'sb-play', function (e) {
      var cmd = e && e.detail && e.detail.cmd;
      if (cmd === 'pause') setPlaying(false);
      else if (cmd === 'resume') setPlaying(true);
    });
    SB.UI.on(document, 'themechange', function () { renderShell(); });
    /* the tab is closed or put away: write the game now, not up to a second from now (0.1) */
    SB.UI.on(document, 'visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    /* leaving the page: write the game, then give up the slot's lock for good, so a save that runs after (the
     * visibilitychange that follows a reload) cannot stamp it again and make the reloaded tab think another one has it */
    if (typeof window !== 'undefined') {
      SB.UI.on(window, 'pagehide', function () { flush(); releaseLock(); leaving = true; });
      SB.UI.on(window, 'pageshow', function () { leaving = false; });
      SB.UI.on(window, 'hashchange', onHash);
    }
    renderShell();
    mount('start', {});
  }

  SB.UI.extend({
    go: go, back: back, act: act, game: game, toast: toast, start: start, quit: quit, leave: leave, flush: flush, card: card, popover: popover, keys: keys,
    /** SPEC?: 07-desk section 3 (the lamp). label() -> { key, text } of what pulling the chain does; pull() does it. */
    lamp: { label: lampLabel, pull: lampPull },
    /** SPEC?: not in 05-interface 1.1; whether the week screen's play loop should be running (see the file head). */
    playing: function () { return playing; },
    /** the name of the route on screen, or null (js/ui/story.js: no cutscene in the middle of the night screen) */
    route: function () { return current ? current.name : null; }
  });

  if (typeof document !== 'undefined' && document && typeof document.addEventListener === 'function') {
    document.addEventListener('DOMContentLoaded', boot);
  }
})(SB);
