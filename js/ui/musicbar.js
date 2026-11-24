/* Scene Booker — js/ui/musicbar.js
 * The pocket player: the mixtape, kept on you like a player in your pocket, on every screen that plays it.
 * At rest it is one small thing in the corner: a cassette out of the scrap kit (SB.Cutouts 'mail-15') put through the
 * desk's copier (SB.DeskKit.photocopy), its printed labels covered with a bone slip lettered MIXTAPE in marker, cut out
 * with a white edge like the desk's stickers so it lifts off the black table, its hubs turning while a song plays. When a song starts, a label-maker strip
 * with its name slides out for a few seconds and tucks back. Point at the cassette (or tap it, or tab to it) and the
 * deck slides out: the song, the desk tape deck's own keys (REW, PLAY/PAUSE, FF) and a volume in tally marks.
 * It sits in whichever corner covers nothing you can press on that screen: bottom right first (see corner()).
 * It steps aside while something else has the room (a cutscene, the show night), since those have their own sound.
 * All the playing is SB.Music's (js/audio/music.js); this only shows it and presses its keys.
 * Safe without SB.Music or a document: it simply is not there.
 */
(function (SB) {
  'use strict';

  var W = typeof window !== 'undefined' ? window : null;
  var D = typeof document !== 'undefined' ? document : null;

  SB.Content.ui = SB.Content.ui || {};
  SB.Content.ui.musicbar = {
    label: 'Mixtape',
    open: 'Mixtape: show the controls',
    close: 'Mixtape: hide the controls',
    back: 'Back a song', play: 'Play', pause: 'Pause', next: 'Next song',
    rew: 'REW', playKey: 'PLAY', pauseKey: 'PAUSE', ff: 'FF',
    vol: 'VOL', volume: 'Music volume', volNow: '{n} of 5',
    menu: 'Pause and options', menuKey: 'MENU',
    idle: 'MIXTAPE', held: 'PAUSED',
    now: '{artist} – {title}'
  };
  function L(k, o) {
    var s = SB.Content.ui.musicbar[k] || k;
    return o ? s.replace(/\{(\w+)\}/g, function (m, n) { return o[n] != null ? String(o[n]) : ''; }) : s;
  }

  var root = null, deck = null, tape = null, song = null, songIn = null, kPlay = null, kPlayWord = null, vol = null, bars = [];
  var last = { key: '', file: null }, openT = null, peekT = null, pinned = false;
  var TAPE_ID = 'mail-15', VB = [100, 64.6];      // the kit photo, and its shape as a viewBox
  var HUBS = [[0.3, 0.555], [0.7, 0.555]];       // where its hubs sit on the photo

  function el(tag, cls, parent, text) {
    var e = D.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function reduced() {
    try { return SB.UI && SB.UI.prefs && SB.UI.prefs.reduced ? SB.UI.prefs.reduced() : false; } catch (e) { return false; }
  }

  /* ---------------------------------------------------------------- */
  /* the cassette                                                      */
  /* ---------------------------------------------------------------- */

  function cassette(into) {
    var cv = el('canvas', 'mb-photo', into), rec, im, s = Math.min(W.devicePixelRatio || 1, 2), w = 112, h = 72;
    cv.width = Math.round(w * s); cv.height = Math.round(h * s);
    cv.setAttribute('aria-hidden', 'true');
    rec = (SB.Cutouts || []).filter(function (q) { return q.id === TAPE_ID; })[0];
    if (!rec || typeof Image === 'undefined') { into.classList.add('is-drawn'); return; }
    im = new Image();
    im.onload = function () {
      var c = cv.getContext('2d');
      try {
        c.drawImage(im, 0, 0, cv.width, cv.height);
        if (SB.DeskKit && SB.DeskKit.photocopy) SB.DeskKit.photocopy(c, cv.width, cv.height, 'pocket-tape', { px: s * 0.5, streaks: 2 });
        into.classList.add('is-photo');
      } catch (e) { into.classList.add('is-drawn'); }       // a page opened from a file: the canvas cannot be read back
    };
    im.onerror = function () { into.classList.add('is-drawn'); };
    im.src = (SB.Cutouts.base || '') + rec.file;
  }
  /* over the photo: the bone slips over its printed labels (MIXTAPE in marker on top, a scrawled track list below),
   * and the hubs, which turn while a song plays */
  function overlay(into) {
    var NS = 'http://www.w3.org/2000/svg', svg = D.createElementNS(NS, 'svg'), vw = VB[0], vh = VB[1], P, d, g;
    function add(tag, attrs, parent) {
      var e = D.createElementNS(NS, tag), k;
      for (k in attrs) e.setAttribute(k, attrs[k]);
      (parent || svg).appendChild(e);
      return e;
    }
    svg.setAttribute('viewBox', '0 0 ' + vw + ' ' + vh); svg.setAttribute('class', 'mb-hubs'); svg.setAttribute('aria-hidden', 'true');
    /* the top slip, a little crooked, MIXTAPE across it */
    g = add('g', { transform: 'rotate(-2.5 50 23)' });
    add('path', { d: 'M14.5 15.2 L85.5 14.4 L85 31.2 L15.2 32 Z', 'class': 'mb-slip' }, g);
    P = SB.Skeleton && SB.Skeleton.path ? SB.Skeleton.path('MIXTAPE', 9, 'marker', { rng: SB.rng && SB.rng.make ? SB.rng.make('pocket-mix') : undefined, maxWidth: 56 }) : null;
    if (P && P.d) add('path', { d: P.d, transform: 'translate(' + (50 - P.width / 2).toFixed(2) + ' 18.6)', 'class': 'mb-mark', 'stroke-width': Math.max(1.1, P.strokeWidth).toFixed(2) }, g);
    else { d = add('text', { x: 50, y: 27.4, 'text-anchor': 'middle', 'class': 'mb-mark-text' }, g); d.textContent = 'MIXTAPE'; }
    /* the bottom slip: two lines of ballpoint where the track list goes */
    g = add('g', { transform: 'rotate(1.2 50 52)' });
    add('path', { d: 'M9 45.2 L91.5 45.8 L91 59.6 L9.6 59 Z', 'class': 'mb-slip' }, g);
    add('path', { d: 'M14 50.4 c4 -1.2 7 1.1 11 -.2 s7 -1 10 .4 s6 -.9 9 -.1 M14 55.6 c5 -.8 8 1 12 -.3 s8 -.6 11 .5', 'class': 'mb-pen' }, g);
    /* the hubs */
    HUBS.forEach(function (q) {
      var hub = add('g', { 'class': 'mb-hub' }), x = q[0] * vw, y = q[1] * vh;
      hub.style.transformOrigin = (q[0] * 100).toFixed(2) + '% ' + (q[1] * 100).toFixed(2) + '%';
      [0, 60, 120].forEach(function (a) { add('path', { d: 'M' + x + ' ' + (y - 4.6) + 'V' + (y + 4.6), transform: 'rotate(' + a + ' ' + x + ' ' + y + ')' }, hub); });
    });
    into.appendChild(svg);
  }

  /* ---------------------------------------------------------------- */
  /* open, peek, close                                                 */
  /* ---------------------------------------------------------------- */

  function setOpen(on) {
    if (!root) return;
    if (openT) { clearTimeout(openT); openT = null; }
    root.classList.toggle('is-open', on);
    if (on) root.classList.remove('is-peek');
    tape.setAttribute('aria-expanded', on ? 'true' : 'false');
    tape.setAttribute('aria-label', on ? L('close') : L('open'));
    deck.setAttribute('aria-hidden', on ? 'false' : 'true');
    [].forEach.call(deck.querySelectorAll('button, [role="slider"]'), function (b) { b.tabIndex = on ? 0 : -1; });
    if (!on) pinned = false;
  }
  /* fold away after a while; a keyboard user working the keys keeps it open, a mouse resting on it too */
  function closeSoon(ms) {
    if (openT) clearTimeout(openT);
    openT = setTimeout(function () {
      openT = null;
      var kb = false;
      try { kb = !!root.querySelector(':focus-visible') && D.activeElement !== tape; } catch (e) { kb = false; }
      if (kb || root.matches(':hover')) closeSoon(ms); else setOpen(false);
    }, ms);
  }
  /* a new song: its name slides out for a moment, unless the deck is open anyway */
  function peek() {
    if (!root || root.classList.contains('is-open') || root.hidden) return;
    root.classList.add('is-peek');
    if (peekT) clearTimeout(peekT);
    peekT = setTimeout(function () { peekT = null; root.classList.remove('is-peek'); }, 4200);
  }

  /* ---------------------------------------------------------------- */
  /* painting what is playing                                          */
  /* ---------------------------------------------------------------- */

  function away() {
    try {
      if (SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()) return true;
      if (SB.UI && SB.UI.route && SB.UI.route() === 'night') return true;
    } catch (e) { /* show it */ }
    return false;
  }

  function paint() {
    var M = SB.Music, n, t, show, txt, k, lit, i;
    if (!root) return;
    show = !!(M && M.has && M.has()) && !away();
    if (root.hidden === show) { root.hidden = !show; if (!show) setOpen(false); }
    if (!show) return;
    n = M.now(); t = n.track;
    txt = t ? L('now', { artist: t.artist || '?', title: t.title || '?' }) : L('idle');
    k = [n.playing ? 1 : 0, txt].join('|');
    if (k !== last.key) {
      last.key = k;
      root.classList.toggle('is-playing', !!n.playing);
      kPlay.setAttribute('aria-label', n.playing ? L('pause') : L('play'));
      kPlayWord.textContent = n.playing ? L('pauseKey') : L('playKey');
      kPlay.classList.toggle('is-down', !!n.playing);
      songIn.textContent = txt;
      song.title = txt;
    }
    if (t && n.playing && t.file !== last.file) { last.file = t.file; peek(); }
    lit = Math.round(n.volume * 5);
    if (vol.getAttribute('aria-valuenow') !== String(lit)) {
      vol.setAttribute('aria-valuenow', String(lit));
      vol.setAttribute('aria-valuetext', L('volNow', { n: lit }));
      for (i = 0; i < bars.length; i++) bars[i].classList.toggle('is-lit', i < lit);
    }
    place();
  }

  /* which corner: the first of bottom right, top right, bottom left, top left where it covers nothing you can press
   * (sampled as it is on screen, so a list scrolled out of sight does not count), else the one covering least.
   * Measured per screen (the desk, the menu and every close-up lay out differently at every size), and again once the
   * screen has settled. */
  var CORNERS = ['br', 'tr', 'bl', 'tl'], at = '', placedFor = '', placeT = null;
  function place(force) {
    var r = '', k;
    try { r = SB.UI.route() || ''; } catch (e) { r = ''; }
    k = r + '|' + W.innerWidth + 'x' + W.innerHeight + '|' + (D.body.className || '');
    if (!force && k === placedFor) return;
    placedFor = k;
    corner();
    if (placeT) clearTimeout(placeT);
    placeT = setTimeout(function () { placeT = null; corner(); }, 700);
  }
  /* how much it would hide there: for each thing you can press, the share of it covered (a small button half hidden
   * counts far more than the corner of a big thing on the desk) */
  function covers(x0, y0, w, h) {
    var hit = [], cnt = [], x, y, e, c, q, i, n = 0, big = W.innerWidth * W.innerHeight * 0.4;
    for (x = x0 + 3; x < x0 + w; x += 9) for (y = y0 + 3; y < y0 + h; y += 9) {
      e = D.elementFromPoint(x, y);
      c = e && e.closest ? e.closest('.dk-hit, button, a[href], [role="button"], [role="tab"], input, select, textarea, [tabindex="0"]') : null;
      if (!c) continue;
      i = hit.indexOf(c);
      if (i < 0) { hit.push(c); cnt.push(1); } else cnt[i]++;
    }
    for (i = 0; i < hit.length; i++) {
      q = hit[i].getBoundingClientRect();
      if (q.width * q.height < big) n += Math.min(1, cnt[i] * 81 / Math.max(81, q.width * q.height));   // a whole screen is not a thing on it
    }
    return n;
  }
  function corner() {
    var vw = W.innerWidth, vh = W.innerHeight, u = (SB.UI.unit && SB.UI.unit()) || 1, p = u * 1.25, ox = (vw - 1600 * u) / 2, oy = (vh - 1000 * u) / 2, w = 122 * p, h = 84 * p, best = null, bestN = 1e9, i, c, x, y, n;   // the stage's corners, not the window's
    if (!root || root.hidden || !D.elementFromPoint) return;
    root.style.visibility = 'hidden';
    try {
      /* on the desk the bottom right corner is the cash envelope's (js/desk/scene.js, user 2026-11-24), so the player
         tries the top right first there */
      var order = CORNERS, rt = '';
      try { rt = SB.UI.route() || ''; } catch (e) { rt = ''; }
      if (rt === 'desk') order = ['tr', 'br', 'bl', 'tl'];
      root.classList.toggle('on-desk', rt === 'desk');
      for (i = 0; i < order.length; i++) {
        c = order[i];
        x = c.charAt(1) === 'r' ? ox + 1600 * u - 18 * p - w : ox + 18 * p;
        y = c.charAt(0) === 'b' ? oy + 1000 * u - 16 * p - h : oy + 12 * p;
        n = covers(x, y, w, h);
        if (n < bestN) { best = c; bestN = n; }
        if (!n) break;
      }
    } finally { root.style.visibility = ''; }
    if (best && best !== at) {
      if (at) root.classList.remove('at-' + at);
      root.classList.add('at-' + best);
      at = best;
    }
  }

  /* ---------------------------------------------------------------- */
  /* build                                                             */
  /* ---------------------------------------------------------------- */

  function key(cls, label, word, fn) {
    var b = el('button', 'mb-key ' + cls, null);
    b.type = 'button'; b.tabIndex = -1;
    b.setAttribute('aria-label', label);
    var w = el('span', 'mb-key-word', b, word);
    b.addEventListener('click', function (e) { e.stopPropagation(); try { fn(); } catch (x) { /* never breaks the page */ } paint(); });
    return { b: b, w: w };
  }
  function setVol(lit) {
    lit = Math.max(0, Math.min(5, lit));
    SB.Music.setVolume(lit / 5);
    paint();
  }

  function build() {
    var row, k;
    if (!D || !D.body || root || !SB.Music) return;
    root = el('div', 'mb', D.body);
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', L('label'));
    root.hidden = true;
    if (reduced()) root.classList.add('is-still');

    /* the deck: the song strip, then the keys and the volume */
    deck = el('div', 'mb-deck', root);
    deck.id = 'mb-deck';
    song = el('div', 'mb-song', deck);
    song.setAttribute('aria-live', 'polite');
    songIn = el('span', 'mb-song-in', song, L('idle'));
    row = el('div', 'mb-row', deck);
    row.appendChild(key('mb-rew', L('back'), L('rew'), function () { SB.Music.prev(); }).b);
    k = key('mb-play', L('play'), L('playKey'), function () { SB.Music.setPaused(!!SB.Music.now().playing); });
    kPlay = k.b; kPlayWord = k.w; row.appendChild(kPlay);
    row.appendChild(key('mb-ff', L('next'), L('ff'), function () { SB.Music.next(); }).b);
    vol = el('div', 'mb-vol', row);
    vol.setAttribute('role', 'slider'); vol.tabIndex = -1;
    vol.setAttribute('aria-label', L('volume'));
    vol.setAttribute('aria-valuemin', '0'); vol.setAttribute('aria-valuemax', '5');
    el('span', 'mb-vol-word', vol, L('vol')).setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 5; i++) {
      (function (n) {
        var b = el('span', 'mb-bar', vol);
        b.style.setProperty('--h', 'calc(var(--p) * ' + (8 + n * 3) + ')');
        b.style.setProperty('--r', ((n % 2 ? 1 : -1) * (2 + n % 3)) + 'deg');
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          var now = Number(vol.getAttribute('aria-valuenow'));
          setVol(now === n + 1 ? n : n + 1);              // pressing the top lit mark takes one off: down to silence
        });
        bars.push(b);
      })(i);
    }
    vol.addEventListener('keydown', function (e) {
      var now = Number(vol.getAttribute('aria-valuenow')), to = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') to = now + 1;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') to = now - 1;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = 5;
      if (to !== null) { e.preventDefault(); setVol(to); }
    });
    /* the quick menu (js/ui/pause.js): pause, volume, full screen, text size, save and quit */
    row.appendChild(key('mb-menu', L('menu'), L('menuKey'), function () { if (SB.Pause) SB.Pause.toggle(); }).b);

    /* the cassette itself: the way in */
    tape = el('button', 'mb-tape pz-hl', root);
    tape.type = 'button';
    tape.setAttribute('aria-controls', 'mb-deck');
    var shell = el('span', 'mb-shell', tape);
    cassette(shell);
    overlay(shell);
    el('span', 'mb-tab', tape).setAttribute('aria-hidden', 'true');      // the strip of masking tape holding it down
    tape.addEventListener('click', function () { pinned = !root.classList.contains('is-open') || !pinned; setOpen(pinned); if (pinned) closeSoon(7000); });

    /* a mouse: pointing opens it, leaving closes it after a breath */
    root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { if (openT) { clearTimeout(openT); openT = null; } setOpen(true); } });
    root.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && !pinned) closeSoon(120); });   // gone as soon as the mouse is, like the clock (the short wait lets it cross the gap to the deck)
    root.addEventListener('focusin', function () { setOpen(true); if (openT) { clearTimeout(openT); openT = null; } });
    root.addEventListener('focusout', function () { setTimeout(function () { if (!root.contains(D.activeElement)) setOpen(false); }, 0); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('is-open')) { e.stopPropagation(); setOpen(false); tape.focus(); } });
    D.addEventListener('pointerdown', function (e) { if (root.classList.contains('is-open') && !root.contains(e.target)) setOpen(false); }, true);

    setOpen(false);
    if (SB.Music.watch) SB.Music.watch(paint);
    setInterval(paint, 500);                   // a cutscene or the show night coming and going
    paint();
  }

  if (D && typeof D.addEventListener === 'function' && W) {
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', build); else build();
  }

  SB.MusicBar = { paint: paint, open: function (on) { setOpen(on !== false); } };
})(SB);
