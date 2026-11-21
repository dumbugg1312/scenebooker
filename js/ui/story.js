/* Scene Booker — ui/story.js (WIRING, 09-tutorial-story-patches 1, 3, 4)
 * Act I on the desk. Holds no game rule: it plays what the engine queued and shows what the engine says.
 *   pump()            called by js/ui/app.js after every act() and every mount(): plays the next queued cutscene
 *                     (SB.Chapters.nextCutscene -> SB.Cutscene.play -> markSeen, save), one at a time and never on the
 *                     night screen; then lands the next earned patch's card on the desk; then redraws the guidance.
 *   opening(st, cb)   the start screen: GOING_AWAY_open plays over the start screen, before the desk appears.
 *   phone(state)      the outgoing booker's texts for the inbox's list (the walkthrough's current step).
 *   chapters(state)   the box, as a notebook page: every opened chapter; a seen cutscene can be watched again.
 *   rewatch(key)      play one again (nothing is marked).
 * The guidance: the step's text is a text on the phone, and a small strip on the desk while the phone is down; one
 * strip of masking tape with a sharpie arrow points at the thing to press next, wherever the player is: on the desk
 * the object SB.Tutorial.current(state).target names (the night screen is reached through the tape deck, a show's
 * set list through its clip); inside a close-up the row, button, sticker, slot, job or tab the step's stage needs
 * (spot()), or "put it down" when the close-up is the wrong one. The tape is one element on <body>, kept inside the
 * window, moved after every act, click, scroll and redraw; the element it points at carries data-taped.
 * Also registers the 'jacket' route: the jacket laid flat, every patch of SB.Patches.all.
 * UI memory only (never saved): which strip was put away, which step has been nudged.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.story = {
    texts: 'Texts from {outgoing}',
    stripOpen: 'Text from {outgoing}: {text} Open the phone.',
    stripSay: 'Text from {outgoing}: {text}',
    downFirst: 'First put this down (top right).',
    leaveFirst: 'First go back to the desk.',
    dismiss: 'Put this away',
    tape: 'next',
    jacketTitle: 'Your jacket',
    jacketLabel: 'The back of your jean jacket: {n} of {of} patches and buttons on it',
    jacketNone: 'Nothing on it yet. They get sewn on when you earn them.',
    blank: 'a blank square of denim',
    notYet: '{name}, not on it yet. {hint}',
    earned: '{name}. {card}',
    cardLabel: 'New for the jacket: {name}',
    sew: 'sew it on',
    pin: 'pin it',
    chaptersNone: 'nothing in the box yet.',
    chapterN: '{n}. {title}',
    watchOpen: 'how it started',
    watchClose: 'how it ended',
    kept: 'kept in the box',
    week: 'week {n}'
  };

  var NUDGE_MS = 75000;
  var busy = false, pumping = false;
  var mem = { step: null, key: null, dismissed: null, nudged: null, timer: null, onPhone: null };
  var stripEl = null, cardEl = null, cardId = null;

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(key, ctx) { return SB.text.label('ui.story.' + key, ctx); }
  function K() { return SB.DeskKit; }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'SB.UI.story', String(e && e.message)); return fb; } }
  function story() { return SB.Content.story || {}; }
  function doc() { return typeof document !== 'undefined' ? document : null; }
  function route() { return SB.UI.route ? SB.UI.route() : null; }
  function seen(s, key) { return !!(s && s.story && s.story.seen && s.story.seen.indexOf(key) >= 0); }
  function say(path, ctx) { return safe(function () { return !SB.text.off && SB.text.has(path) ? SB.text.line(path, ctx, null) : ''; }, ''); }
  function playingCut() { return !!(SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()); }

  /* ---------------------------------------------------------------- */
  /* cutscenes                                                        */
  /* ---------------------------------------------------------------- */

  function cutscene(key) {
    var c = story().cutscenes && story().cutscenes[key], out, k;
    if (!c || !c.frames || !c.frames.length || !SB.Cutscene) return null;
    out = {}; for (k in c) out[k] = c[k];
    out.key = key;
    return out;
  }

  /* play one over whatever is on screen (the player loads the first picture's cut-outs before it shows, the rest behind it) */
  function run(s, key, done) {
    var cs = cutscene(key), slots;
    if (!cs) { done({ key: key, skipped: true }); return false; }
    slots = safe(function () { return SB.Chapters.slots(s, key); }, {}) || {};
    try { SB.Cutscene.play(cs, slots, done); }
    catch (e) { SB.log('warn', 'SB.UI.story', 'cutscene ' + key + ': ' + (e && e.message)); done({ key: key, skipped: true }); return false; }
    return true;
  }

  function afterSeen(s, key) {
    SB.Chapters.markSeen(s, key);
    SB.Chapters.check(s);          // one chapter's cutscene being seen can close it and open the next
    SB.Patches.check(s);
    return { ok: true };
  }

  /* -> true when a cutscene is now on screen */
  function playNext(s) {
    var n, guard = 0;
    while (guard++ < 40) {
      n = SB.Chapters.nextCutscene(s);
      if (!n) return false;
      if (cutscene(n.key)) break;
      SB.Chapters.markSeen(s, n.key);                      // no words for it: off the queue, nothing to show
    }
    if (!n || guard >= 40) return false;
    busy = true;
    if (SB.UI.playing && SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause' });
    hideStrip();
    run(s, n.key, function () {
      busy = false;
      if (SB.UI.game() === s) SB.UI.act(function (st) { return afterSeen(st, n.key); });
      else afterSeen(s, n.key);
    });
    return true;
  }

  /** opening(st, cb): a new career. GOING_AWAY_open plays before the desk appears; cb() sits the player down. */
  function opening(st, cb) {
    var n = safe(function () { return SB.Chapters.nextCutscene(st); }, null);
    if (!n || n.key !== 'GOING_AWAY_open' || !cutscene(n.key) || busy) { cb(); return; }
    busy = true;
    run(st, n.key, function () {
      busy = false;
      safe(function () { return afterSeen(st, n.key); });
      cb();
    });
  }

  function rewatch(key) {
    var s = SB.UI.game();
    if (!s || busy || playingCut()) return;
    busy = true;
    run(s, key, function () { busy = false; });
  }

  /* ---------------------------------------------------------------- */
  /* the walkthrough: what the outgoing booker is saying now           */
  /* ---------------------------------------------------------------- */

  /* -> { key, from, list: [{ text, kind }], once: seen-key or null } or null */
  function messages(s) {
    var t = s && s.story && s.story.tutorial, cur, sl, base, list = [], steps, i, prev, tx;
    if (!t) return null;
    cur = safe(function () { return SB.Tutorial.current(s); }, null);
    sl = safe(function () { return SB.Chapters.slots(s, 'tutorial'); }, {}) || {};
    if (cur) {
      steps = SB.Tutorial.STEPS; i = steps.indexOf(cur.step); prev = i > 0 ? steps[i - 1] : null;
      base = 'story.tutorial.steps.';
      if (i === 0) { tx = say('story.tutorial.intro', sl); if (tx) list.push({ text: tx, kind: 'intro' }); }
      if (prev && t.wrong && t.wrong[prev]) { tx = say(base + prev + '.wrong', sl); if (tx) list.push({ text: tx, kind: 'wrong' }); }
      tx = cur.text || say(base + cur.step + '.text', sl);
      if (tx) list.push({ text: tx, kind: 'text' });
      if (cur.more) list.push({ text: cur.more, kind: 'how' });
      if (cur.wrong) { tx = say(base + cur.step + '.wrong', sl) || cur.wrong; if (tx) list.push({ text: tx, kind: 'wrong' }); }
      if (cur.nudge || mem.nudged === cur.step) { tx = say(base + cur.step + '.nudge', sl) || cur.nudge; if (tx) list.push({ text: tx, kind: 'nudge' }); }
      return list.length ? { key: cur.step + (cur.stage ? ':' + cur.stage : ''), step: cur.step, cur: cur, from: sl.outgoing || '', list: list, once: null } : null;
    }
    if (t.skipped && !seen(s, 'TUTORIAL_SKIP')) { tx = say('story.tutorial.skip.line', sl); return tx ? { key: 'SKIP', from: sl.outgoing || '', list: [{ text: tx, kind: 'text' }], once: 'TUTORIAL_SKIP' } : null; }
    if (t.done !== null && t.done !== undefined && !t.skipped && !seen(s, 'TUTORIAL_DONE')) { tx = say('story.tutorial.done', sl); return tx ? { key: 'DONE', from: sl.outgoing || '', list: [{ text: tx, kind: 'text' }], once: 'TUTORIAL_DONE' } : null; }
    return null;
  }

  /** phone(state): the texts, for the top of the inbox's list; null when there is nothing to say. */
  function phone(s) {
    var m = messages(s);
    if (!m) return null;
    if (m.once) mem.onPhone = m.once;
    return h('div', { class: 'sy-dana', role: 'log', aria: { label: L('texts', { outgoing: m.from }) } }, [
      h('p', { class: 'sy-dana-from' }, h('span', { class: 'ph-strip', text: String(m.from || '').toUpperCase() })),
      m.list.map(function (x) { return h('div', { class: 'ph-bub ph-bub--them pz-paper sy-bub sy-bub--' + x.kind }, h('p', { text: x.text })); })
    ]);
  }

  /* which desk object carries the tape for this step */
  function targetOf(cur) {
    var objs = safe(function () { return SB.Desk.objects(); }, []) || [], ids = {}, t = cur.target, i;
    objs.forEach(function (o) { ids[o.id] = o; });
    if (t === 'night') return ids.lamp ? 'lamp' : null;
    if (t === 'clip') {
      for (i = 0; i < objs.length; i++) if (/^clip\d/.test(objs[i].id) && objs[i].params && objs[i].params.showId === cur.showId) return objs[i].id;
      return ids.clips ? 'clips' : (ids.clip0 ? 'clip0' : (ids.calendar ? 'calendar' : null));
    }
    return ids[t] ? t : null;
  }

  function tapeSvg(seed) {
    var k = K(), r = k && k.rng ? k.rng('sy-tape' + seed) : null, out = '', i, x;
    if (!k) return '';
    out += k.tape(88, 36, 156, 46, { seed: 'sy-tp' + seed, torn: true, op: 0.97 });
    /* the tape's own texture: creases across it and the paper's tooth */
    for (i = 0; i < 9; i++) {
      x = 18 + i * 17 + (r ? r.range(-5, 5) : 0);
      out += '<path d="M' + Math.round(x) + ' 15L' + Math.round(x + (r ? r.range(-3, 3) : 1)) + ' 57" stroke="#000" stroke-opacity="' + (i % 3 ? '.07' : '.13') + '" stroke-width="' + (i % 2 ? 1 : 2) + '"/>';
    }
    out += '<path d="M12 22H164M12 50H164" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>';
    out += k.arrow(34, 40, 142, 33, { seed: 'sy-ar' + seed, stroke: '#141413', sw: 7, head: 20, wob: 5 });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 72" aria-hidden="true" focusable="false">' + out + '</svg>';
  }

  /* ---- where the tape goes ---- */

  function first(root, sels) {
    var i, e;
    if (!root || !root.querySelector) return null;
    for (i = 0; i < sels.length; i++) {
      if (!sels[i]) continue;
      e = safe(function () { return root.querySelector(sels[i]); }, null);
      if (e && !e.disabled) return { el: e, key: sels[i] };
    }
    return null;
  }
  function fk(v) { return '[data-fk="' + v + '"]'; }

  /* spot(cur, route): the element to point at now -> { el, key } or null */
  function spot(cur, r) {
    var d = doc(), desk = d && d.getElementById ? d.getElementById('desk') : null, main = d && d.getElementById ? d.getElementById('main') : null,
        t = cur.target, st = cur.stage, id, list = [], down = '.cu-down', wait = t === 'lamp';
    if (!d) return null;
    if (r === 'desk') { id = targetOf(cur); return id ? first(desk, ['.dk-hit[data-obj="' + id + '"]']) : null; }
    switch (r) {
      case 'inbox':
        /* the request's HOLD and OFFER tabs open the show's card at the right row */
        if (cur.step === 'ANSWER') list.push(fk('tab-INTERESTED'));
        else if (cur.step === 'HOLD' && st === 'ASK') list.push(fk('tab-HOLD'));
        else if (cur.step === 'BILL' && st === 'OFFER') list.push(fk('tab-OFFER'));
        if (t === 'phone') list.push('.ph-row' + fk('c-q:' + cur.requestId), fk('back'));
        break;
      case 'shows': if (t === 'clip') list.push(fk('clip-' + cur.showId)); break;
      case 'show': case 'bill':
        /* the card: the thing to press in the picker when the right row is open, else the row */
        if (t !== 'clip') break;
        if (cur.step === 'HOLD') list.push(fk(st === 'CONFIRM' ? 'confirm' : 'hold'), fk('row-room'));
        else if (cur.step === 'BILL' && st === 'OFFER') list.push(fk('send-offer'), fk('row-offer'));
        else if (cur.step === 'BILL' && st === 'ORDER') list.push('[data-tut="bill-move"]:not([disabled])', '[data-tut="card-row"][data-tut-ref="band"]');
        else if (cur.step === 'BILL') list.push('.cb-card[data-sel="slot-' + cur.slot + '"] ' + fk('cand-' + cur.bandId), '.cb-card[data-sel="slot-' + cur.slot + '"] ' + fk('free'), fk('row-slot-' + cur.slot));
        else if (cur.step === 'SOUND') list.push(fk('cr-sound' + cur.personId), fk('row-sound'));
        else if (cur.step === 'FLYER') list.push(fk('flyer'), fk('row-flyer'));
        else if (cur.step === 'PROMO' && st === 'PLAN') list.push('[data-tut="promo-slot"][data-tut-ref="' + cur.jobId + '"]', '.cb-card:not([data-sel="promo"]) ' + fk('row-promo'));
        break;
      case 'flyerdesk': if (cur.step === 'FLYER') list.push('[data-tut="flyer-make"]'); break;
      case 'week':
        if (cur.step === 'PROMO' && st === 'PLAN') {
          if (main && main.querySelector('.cc-half.is-cursor')) list.push('.cc-half.is-cursor');
          list.push('.cc-note[data-job="' + cur.jobId + '"]', '.cc-pile-top[data-fk="pile-thisWeek"][aria-expanded="false"]', '.cc-pile-top[data-fk="pile-later"][aria-expanded="false"]',
                    '.cc-pile-top[data-fk="pile-soon"][aria-expanded="false"]', '.cc-pile-top[aria-expanded="false"]');
        } else if (wait) list.push(fk('closeweek'));
        break;
      case 'close': if (wait) list.push('.cc-tab--big.is-hot', '.cc-tab--big'); break;
      case 'night':
        if (cur.step === 'CLOSEOUT') list.push(fk('leave'));
        else list.push(fk('open'), '.nt-envelope .nt-tab:not([disabled])', '.nt-tab' + fk('opt-0'), fk('skip'), fk('leave'));
        down = null;
        break;
    }
    if (down) list.push(down);
    return first(main, list);
  }

  var tapeEl = null, tapeFor = null, tapedEl = null, queued = false;
  var TW = 134, TH = 55;                    // the tape, in phone units (css/story.css .sy-tape; x SB.UI.unit() * 1.25 for px)

  function untape() {
    if (tapedEl && tapedEl.removeAttribute) tapedEl.removeAttribute('data-taped');
    tapedEl = null;
  }
  function dropTape() {
    untape();
    if (tapeEl && tapeEl.parentNode) tapeEl.parentNode.removeChild(tapeEl);
    tapeEl = null; tapeFor = null;
  }
  function scroller(el) {
    var n = el && el.parentNode, cs;
    while (n && n.nodeType === 1 && n !== doc().body) {
      cs = safe(function () { return getComputedStyle(n); }, null);
      if (cs && /(auto|scroll)/.test(String(cs.overflowY || '')) && n.scrollHeight > n.clientHeight + 4) return n;
      n = n.parentNode;
    }
    return null;
  }
  /* put the tape by the element: over its top right corner, the arrow pointing down into it; on the other corner
   * when that would leave the window; flat against the edge of a scrolling page when the element is off it */
  function position(el, fresh) {
    /* the tape is 134 x 55 phone units (css/story.css .sy-tape): every distance here is in those units, times k px */
    var k = SB.UI.unit ? SB.UI.unit() * 1.25 : 1, tw = TW * k, th = TH * k,
        W = (typeof window !== 'undefined' && window.innerWidth) || 1280, H = (typeof window !== 'undefined' && window.innerHeight) || 800,
        r = safe(function () { return el.getBoundingClientRect(); }, null), sc, c, x, y, rot, top = 0, bot = H, pad = 6 * k, hw = tw / 2 + 4 * k, hh = tw / 2 * 0.5 + th / 2;
    if (!r || !tapeEl) return;
    sc = scroller(el);
    c = sc ? safe(function () { return sc.getBoundingClientRect(); }, null) : null;
    if (c) { top = Math.max(0, c.top); bot = Math.min(H, c.bottom); }
    /* newly pointed at and off the page: bring it up, once */
    if (fresh && sc && (r.bottom < top + 10 * k || r.top > bot - 10 * k) && el.scrollIntoView) {
      safe(function () { el.scrollIntoView({ block: 'center', inline: 'nearest' }); }, null);
      r = safe(function () { return el.getBoundingClientRect(); }, r) || r;
    }
    x = r.left + r.width / 2;
    if (r.bottom < top + 10 * k) { y = top + 36 * k; rot = -90; hw = th / 2 + 4 * k; hh = tw / 2; }
    else if (r.top > bot - 10 * k) { y = bot - 40 * k; rot = 90; hw = th / 2 + 4 * k; hh = tw / 2; }
    else {
      x = r.right + 30 * k; y = r.top - 16 * k; rot = 150;
      if (r.width > 260 * k) x = r.right - 40 * k;                  // a wide thing: sit on it, not past it
      if (x + hw > W - pad) { x = (r.width > 260 * k ? r.left + 40 * k : r.left - 30 * k); rot = 30; }
      if (y - hh < pad) { y = r.bottom + 16 * k; rot = rot === 150 ? 210 : -30; }
    }
    x = Math.max(pad + hw, Math.min(W - pad - hw, x));
    y = Math.max(pad + hh, Math.min(H - pad - hh, y));
    tapeEl.style.left = Math.round(x - tw / 2) + 'px';
    tapeEl.style.top = Math.round(y - th / 2) + 'px';
    if (tapeEl.style.setProperty) tapeEl.style.setProperty('--tr', rot + 'deg');
  }

  /* a card's dim that is peeling off (SB.Finish, .is-leaving) is already gone as far as the tape is concerned */
  function clear_() { var d = doc(); return !busy && !playingCut() && !(d && d.querySelector && d.querySelector('.sb-scrim:not(.is-leaving)')); }

  /* point the tape at what spot() finds (or take it away) */
  function placeTape(cur, r) {
    stick(cur && clear_() ? spot(cur, r) : null, cur ? cur.step : '', r);
  }
  function stick(at, step, r) {
    var d = doc(), key, fresh;
    if (!at || !d || !d.body) { dropTape(); return; }
    key = step + '|' + r + '|' + at.key;
    if (!tapeEl || tapeFor !== key || !tapeEl.parentNode) {
      dropTape();
      tapeEl = h('span', { class: 'sy-tape', aria: { hidden: 'true' }, data: { 'for': r === 'desk' ? String(at.el.getAttribute('data-obj') || '') : at.key, step: step, route: r || '' }, html: tapeSvg(at.key) });
      d.body.appendChild(tapeEl);
      tapeFor = key;
    }
    fresh = tapedEl !== at.el;
    if (fresh) { untape(); tapedEl = at.el; at.el.setAttribute('data-taped', step); }
    position(at.el, fresh);
  }

  /* the way in (js/ui/screens/start.js): no career yet, so no texts; a setup screen hands over a function that says
   * which of its own things to press next, and the same tape points at it. point(null) when the screen goes. */
  var preAt = null;
  function preSpot() {
    var el = preAt && clear_() ? safe(preAt, null) : null;
    return el && el.isConnected !== false && !el.disabled ? { el: el, key: 'setup:' + String((el.getAttribute && el.getAttribute('data-fk')) || el.className || '') } : null;
  }
  function point(fn) {
    preAt = typeof fn === 'function' ? fn : null;
    if (!preAt) dropTape(); else soon();
  }

  /* the screen under the tape changed without an act (a view inside a close-up, a scroll): look again */
  function retape() {
    var s = SB.UI.game ? SB.UI.game() : null, cur;
    queued = false;
    if (preAt) { stick(preSpot(), 'SETUP', route()); return; }
    if (!s) { dropTape(); return; }
    /* the view changed without an act (a message opened on the phone, the tape onto a put-down tag): the tape and the
     * strip's words both follow it */
    if (busy || pumping) { cur = safe(function () { return SB.Tutorial.current(s); }, null); placeTape(cur, route()); return; }
    guide(s);
  }
  function soon() {
    if (queued) return;
    queued = true;
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(retape); else retape();
  }
  function listen() {
    var d = doc(), mo;
    if (!d || !d.addEventListener) return;
    ['click', 'keyup', 'change', 'input'].forEach(function (ev) { d.addEventListener(ev, function () { queued = false; retape(); soon(); }); });
    d.addEventListener('scroll', function () { if (tapeEl && tapedEl) position(tapedEl); }, true);
    /* a thing that slaps or slides into place moves out from under the tape: put it back once it lands */
    ['animationend', 'transitionend'].forEach(function (ev) { d.addEventListener(ev, function () { if (tapeEl && tapedEl) position(tapedEl); }, true); });
    if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', soon);
    if (typeof MutationObserver === 'function') {
      mo = new MutationObserver(function () { if (!tapedEl || !tapedEl.isConnected || !tapeEl) soon(); });
      ['main', 'desk'].forEach(function (id) { var e = d.getElementById && d.getElementById(id); if (e) safe(function () { mo.observe(e, { childList: true, subtree: true }); }, null); });
    }
  }

  function hideStrip() { if (stripEl && stripEl.parentNode) stripEl.parentNode.removeChild(stripEl); stripEl = null; band(false); }

  function putAway(s, m) {
    mem.dismissed = m.key + '|' + m.list.length;
    hideStrip();
    if (m.once && SB.UI.game() === s) SB.UI.act(function (st) { SB.Chapters.markSeen(st, m.once); return { ok: true }; });
  }

  /* what the strip says: the stage's line (what to press), after the step's own line when that is short enough to
   * read in passing (the why); with "put this down first" in front when the tape is on a close-up's put-down tag */
  function stripWords(m) {
    var last = m.list[m.list.length - 1], t = last.text, i, main = null;
    if (last.kind === 'how') for (i = m.list.length - 2; i >= 0; i--) if (m.list[i].kind === 'text') { main = m.list[i].text; break; }
    if (main && main.length <= 100) t = main + ' ' + t;
    if (tapedEl && tapedEl.classList && tapedEl.classList.contains('cu-down')) t = L('downFirst') + ' ' + t;
    else if (tapedEl && tapedEl.getAttribute && tapedEl.getAttribute('data-fk') === 'leave' && route() === 'night') t = L('leaveFirst') + ' ' + t;
    return { text: t, kind: last.kind };
  }
  /* the strip gets its own band at the bottom: close-ups, the night and toasts make room for it (css/story.css) */
  function band(on) {
    var d = doc(), b = d && d.body, hgt;
    if (!b) return;
    /* its height plus its gap from the bottom (layout sizes: the slide-in animation does not count) */
    hgt = on && stripEl ? Math.round((stripEl.offsetHeight || 60) + (parseFloat(safe(function () { return getComputedStyle(stripEl).bottom; }, '14')) || 14) + 12) : 0;
    if (b.classList.contains('sy-guiding') === !!on && b.getAttribute('data-sy-band') === String(hgt)) return;
    b.classList.toggle('sy-guiding', !!on);
    b.setAttribute('data-sy-band', String(hgt));
    if (b.style && b.style.setProperty) b.style.setProperty('--sy-band', 'calc(var(--u) * ' + (hgt / ((SB.UI.unit && SB.UI.unit()) || 1)).toFixed(1) + ')');
    if (typeof window !== 'undefined' && window.dispatchEvent) safe(function () { window.dispatchEvent(new Event('resize')); }, null);
  }
  function showStrip(s, m, onDesk) {
    var d = doc(), w = stripWords(m), sig = m.key + '|' + m.list.length + '|' + w.text + '|' + (onDesk ? 1 : 0), open, x, kids;
    if (!d || !d.body) return;
    if (stripEl && stripEl.getAttribute('data-sig') === sig && stripEl.parentNode) { band(true); return; }
    hideStrip();
    kids = [h('span', { class: 'sy-strip-from', text: String(m.from || '').toUpperCase() }), h('span', { class: 'sy-strip-text', text: w.text })];
    /* on the desk it is a button that picks up the phone; anywhere else it is only read */
    open = onDesk ? h('button', { type: 'button', class: 'sy-strip-open pz-hl', aria: { label: L('stripOpen', { outgoing: m.from, text: w.text }) },
                                  on: { click: function () { SB.UI.go('inbox'); } } }, kids)
                  : h('p', { class: 'sy-strip-open sy-strip-say', aria: { label: L('stripSay', { outgoing: m.from, text: w.text }) } }, kids);
    x = h('button', { type: 'button', class: 'sy-strip-x pz-hl', aria: { label: L('dismiss') }, text: '×', on: { click: function () { putAway(s, m); } } });
    stripEl = h('div', { class: 'sy-strip pz-paper sy-strip--' + w.kind + (onDesk ? ' sy-strip--desk' : ''), role: 'status', data: { sig: sig } }, [open, x]);
    d.body.appendChild(stripEl);
    band(true);
  }

  function armNudge(step) {
    if (mem.timer) { clearTimeout(mem.timer); mem.timer = null; }
    if (!step || typeof setTimeout !== 'function') return;
    mem.timer = setTimeout(function () {
      var s = SB.UI.game();
      mem.timer = null;
      if (!s || mem.step !== step || mem.nudged === step) return;
      mem.nudged = step; mem.dismissed = null;
      guide(s);
    }, NUDGE_MS);
  }

  /* the texts' strip on the desk and the tape on the thing to pick up next */
  function guide(s) {
    var m = messages(s), r = route(), cur = m && m.cur, d = doc(),
        /* the phone's list already shows the texts in full; inside a message it does not */
        dana = r === 'inbox' && d && d.querySelector ? d.querySelector('.sy-dana') : null,
        onPhone = !!(dana && safe(function () { var b = dana.getBoundingClientRect(); return b.height > 0 && b.bottom > 0 && b.top < ((typeof window !== 'undefined' && window.innerHeight) || 800); }, false));
    if (!m) { dropTape(); hideStrip(); mem.step = null; mem.key = null; armNudge(null); return; }
    if (mem.key !== m.key) { mem.key = m.key; mem.dismissed = null; }
    if (mem.step !== (m.step || m.key)) { mem.step = m.step || m.key; if (mem.nudged !== mem.step) mem.nudged = null; armNudge(cur ? mem.step : null); }
    /* the engine's own "you there?" (days left idle): show it once, and tell the engine it was shown */
    if (cur && cur.nudge && mem.nudged !== cur.step) {
      mem.nudged = cur.step; mem.dismissed = null;
      SB.UI.act(function (st) { SB.Tutorial.notify(st, 'NUDGED', null); return { ok: true }; });
    }
    placeTape(cur || null, r);
    /* a one-off line (the skip, the end) read on the phone is done once the phone goes down */
    if (m.once && mem.onPhone === m.once && r !== 'inbox') { mem.onPhone = null; putAway(s, m); return; }
    if (!SB.UI.game() || onPhone || busy || playingCut() || mem.dismissed === m.key + '|' + m.list.length) hideStrip();
    else { mem.m = m; showStrip(s, m, r === 'desk'); }
  }

  /* ---------------------------------------------------------------- */
  /* patches: the card that lands on the desk, and the jacket          */
  /* ---------------------------------------------------------------- */

  function patchWords(id) {
    var p = (story().patches && story().patches[id]) || {};
    return { name: p.name || String(id).replace(/_/g, ' '), card: p.card || '', hint: p.hint || '' };
  }
  function patchInfo(s, id) {
    var all = safe(function () { return SB.Patches.all(s); }, []) || [], i;
    for (i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return { id: id, kind: 'patch', hidden: false, earned: true };
  }
  /* the patch is drawn twice as large as its box: re-rastered finer on a big screen, always shown size --p wide */
  function sharp(cv, size) {
    if (cv && cv.style) { cv.style.width = 'calc(var(--p) * ' + size + ')'; cv.style.height = 'calc(var(--p) * ' + size + ')'; }
    return cv;
  }
  function patchRes() { var F = SB.Finish; return Math.max(1, F && F.res ? F.res() / 2 : 1); }
  function patchCanvas(p, w, size, flat) {
    return safe(function () { return SB.Scenes.patch(p.id, { name: w.name, kind: p.kind, earned: p.earned, hidden: p.hidden, size: Math.round(size * patchRes()), denim: flat ? false : undefined }); }, null);
  }

  function hideCard(peel) {
    var gone = cardEl, F = SB.Finish;
    cardEl = null; cardId = null;
    if (!gone || !gone.parentNode) return;
    if (peel && F && F.move && !(F.reduced && F.reduced())) { gone.inert = true; gone.classList.remove('sy-card'); gone.classList.add('sy-card-leaving', 'is-leaving'); F.move(gone, 'peel', { cue: 'tear', cueOpts: { gain: -12 }, done: function () { if (gone.parentNode) gone.parentNode.removeChild(gone); } }); }
    else gone.parentNode.removeChild(gone);
  }

  /* -> true when a card is on the desk */
  function showCard(s) {
    var d = doc(), id = safe(function () { return SB.Patches.nextToast(s); }, null), p, w, cv, btn, r;
    if (!id) { hideCard(); return false; }
    if (cardEl && cardId === id && cardEl.parentNode) return true;
    hideCard();
    if (!d || !d.body) return false;
    p = patchInfo(s, id); w = patchWords(id);
    p = { id: id, kind: p.kind, hidden: false, earned: true };
    cv = patchCanvas(p, w, 150); sharp(cv, 150);
    r = SB.rng && SB.rng.make ? SB.rng.make('sy-card:' + id) : null;
    btn = h('button', { type: 'button', class: 'sy-card-go pz-paper pz-hl', text: L(p.kind === 'button' ? 'pin' : 'sew'), on: { click: function () {
      hideCard(true);
      if (SB.UI.game() === s) SB.UI.act(function (st) { return SB.Patches.toastShown(st, id); });
    } } });
    cardEl = h('div', { class: 'sy-card pz-paper', role: 'dialog', aria: { label: L('cardLabel', { name: w.name }) }, data: { patch: id } }, [
      h('span', { class: 'sy-card-pic' }, cv),
      h('div', { class: 'sy-card-words' }, [
        h('p', { class: 'sy-card-name', text: w.name }),
        w.card ? h('p', { class: 'sy-card-line', text: w.card }) : null,
        btn
      ])
    ]);
    if (cardEl.style && cardEl.style.setProperty) {
      cardEl.style.setProperty('--tilt', (r ? r.range(-5, 5) : -3).toFixed(1) + 'deg');
      /* lands down by the jacket (where it gets sewn), clear of the phone, the shows and the money */
      cardEl.style.setProperty('--dx', 'calc(var(--u) * -416)'); cardEl.style.setProperty('--dy', 'calc(var(--u) * 220)');
    }
    cardId = id;
    d.body.appendChild(cardEl);
    if (SB.Finish && SB.Finish.move) {
      SB.Finish.move(cardEl, 'slap', { cue: 'scrap', cueOpts: { gain: -6 } });
      SB.Finish.move(cardEl.querySelector('.sy-card-pic'), 'stamp', { delay: 260, cue: 'stamp', cueAt: 83, cueOpts: { gain: -6 } });
    }
    return true;
  }

  function mountJacket(root) {
    var s = SB.UI.game(), all = safe(function () { return SB.Patches.all(s); }, []) || [], n = all.filter(function (p) { return p.earned; }).length, Kc = SB.UI.calKit,
        title = L('jacketTitle'), newest = null, sec, F = SB.Finish;
    all.forEach(function (p) { if (p.earned && (!newest || (p.week || 0) >= (newest.week || 0))) newest = p; });   // the patch sewn on last
    root.appendChild(sec = h('section', { class: 'sy-jacket', aria: { label: L('jacketLabel', { n: n, of: all.length }) } }, [
      h('div', { class: 'sy-back' }, [
        h('h2', { class: 'sy-jacket-title', aria: { label: title } }, Kc && Kc.mk ? safe(function () { return Kc.mk(title.toUpperCase(), 30, { max: 420, say: false }); }, title) : title),
        n ? null : h('p', { class: 'sy-jacket-none', text: L('jacketNone') }),
        h('ul', { class: 'sy-patches' }, all.map(function (p) {
          var w = patchWords(p.id), hero = !!newest && p.id === newest.id, cls = 'sy-patch sy-patch--' + p.kind + (p.earned ? ' is-earned' : (p.hidden ? ' is-blank' : ' is-faint')) + (hero ? ' is-newest' : ''),
              /* a patch not yet earned is a blank square of unfaded denim; its hint rides on a slip under it */
              cv = sharp(patchCanvas({ id: p.id, kind: p.kind, earned: p.earned, hidden: p.earned ? p.hidden : true }, w, hero ? 300 : 128, true), hero ? 300 : 128),
              label = p.earned ? L('earned', { name: w.name, card: w.card }) : (p.hidden ? L('blank') : L('notYet', { name: w.name, hint: w.hint }));
          if (cv && cv.setAttribute) cv.setAttribute('aria-hidden', 'true');
          return h('li', { class: cls, aria: { label: label }, data: { patch: p.id } }, [
            h('span', { class: 'sy-patch-pic' }, cv),
            p.earned ? h('span', { class: 'sy-patch-name', text: w.name }) : null,
            p.earned && w.card ? h('span', { class: 'sy-patch-card', text: w.card }) : null,
            !p.earned && !p.hidden && w.hint ? h('span', { class: 'sy-patch-hint', text: w.hint }) : null
          ]);
        }))
      ])
    ]));
    if (F && F.scrollbar) safe(function () { F.scrollbar(sec); }, null);
    if (F && F.move && newest) {
      var hp = sec.querySelector('.sy-patch.is-newest .sy-patch-pic');
      if (hp) F.move(hp, 'stamp', { delay: 300, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5 } });
      F.stagger([].slice.call(sec.querySelectorAll('.sy-patch:not(.is-newest)')), 2).forEach(function (li) { li.classList.add('mv-slap'); });
    }
    return { update: function () {}, unmount: function () {} };
  }

  /* ---------------------------------------------------------------- */
  /* the box: chapters                                                 */
  /* ---------------------------------------------------------------- */

  function watchBtn(key, label) {
    var Kc = SB.UI.calKit;
    return h('button', { type: 'button', class: 'nb-open fx sy-watch', aria: { label: label }, data: { cutscene: key }, on: { click: function () { rewatch(key); } } },
             Kc && Kc.strip ? Kc.strip(label) : label);
  }

  /** chapters(state): the list for the notebook's CHAPTERS page. */
  function chapters(s) {
    var list = safe(function () { return SB.Chapters.list(s); }, []) || [], drops = safe(function () { return SB.Chapters.drops(s); }, []) || [], kids = [];
    drops = drops.filter(function (d) { return d.seen && cutscene(d.key); });
    if (!list.length && !drops.length) return h('p', { class: 'nb-pencil nb-empty', text: L('chaptersNone') });
    kids.push(h('ol', { class: 'sy-chapters' }, list.map(function (c) {
      var btns = c.cutscenes.filter(function (x) { return x.seen && cutscene(x.key); }).map(function (x) {
        return watchBtn(x.key, L(/_close$/.test(x.key) ? 'watchClose' : 'watchOpen'));
      });
      return h('li', { class: 'sy-chapter' + (c.closed !== null ? ' is-closed' : ''), data: { chapter: c.id } }, [
        h('h3', { class: 'sy-chapter-title', text: L('chapterN', { n: c.n, title: c.title || c.id.replace(/_/g, ' ').toLowerCase() }) }),
        c.line ? h('p', { class: 'sy-chapter-line', text: c.line }) : null,
        h('p', { class: 'sy-chapter-when nb-pencil', text: L('week', { n: (c.opened || 0) + 1 }) }),
        btns.length ? h('div', { class: 'sy-chapter-watch' }, btns) : null
      ]);
    })));
    if (drops.length) {
      kids.push(h('h3', { class: 'sy-chapter-title sy-kept', text: L('kept') }));
      kids.push(h('div', { class: 'sy-chapter-watch' }, drops.map(function (d) {
        var c = cutscene(d.key), sl = safe(function () { return SB.Chapters.slots(s, d.key); }, {});
        return watchBtn(d.key, safe(function () { return SB.text.render(String(c.title || d.key), sl, null); }, d.key));
      })));
    }
    return h('div', { class: 'sy-box' }, kids);
  }

  /* ---------------------------------------------------------------- */
  /* pump                                                              */
  /* ---------------------------------------------------------------- */

  function clearAll() { dropTape(); hideStrip(); hideCard(); armNudge(null); mem.step = null; mem.key = null; }

  function pump() {
    var s = SB.UI.game(), r = route(), d = doc(), blocked;
    if (preAt) { hideStrip(); hideCard(); armNudge(null); soon(); return; }   // a setup screen is up: its own tape, nothing from a career
    if (!s) { clearAll(); return; }
    if (pumping) return;
    pumping = true;
    try {
      /* never two at once, never in the middle of the night screen, never under an open card */
      blocked = busy || playingCut() || r === 'night' || !!(d && d.querySelector && d.querySelector('.sb-scrim'));
      if (!blocked && playNext(s)) return;
      if (r === 'night' || busy || playingCut()) hideCard(); else showCard(s);
      guide(s);
    } finally { pumping = false; }
  }

  listen();

  SB.UI.screen('jacket', { rail: null, title: 'ui.story.jacketTitle', mount: mountJacket });

  SB.UI.extend({ story: { pump: pump, opening: opening, phone: phone, chapters: chapters, rewatch: rewatch, messages: messages, point: point,
                          busy: function () { return busy || playingCut(); } } });
})(SB);
