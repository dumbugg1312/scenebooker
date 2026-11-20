/* Scene Booker — js/ui/boot.js
 * SB.Boot: the loading screen (polish brief job 8). The page opens on #boot (index.html, styled by css/shell.css, so it
 * paints before a single script has run): the black stage, a strip of masking tape that fills as the game comes in, and
 * a typed line saying what is loading. It stays up until the three faces, the sound and the title screen's pictures are
 * in (the network goes quiet once the start screen has mounted), then tears away. Nothing the first screen shows pops in.
 * A cap (MAX_MS) lifts it anyway on a slow connection; reduced motion skips the wipe.
 *
 *   SB.Boot.step(name)   a part is in (js/ui/app.js and this file report them); the tape moves on
 *   SB.Boot.hold(ids, cb, o)  the in-game loading moment: load these cut-out photos first (SB.Scenes.loadCuts), showing
 *                        the small tape in the corner if it takes a while; cb() when they are in or after o.max ms
 *   SB.Boot.done()       true once the loading screen has gone
 */
(function (SB) {
  'use strict';

  SB.Content.ui.boot = {
    label: 'Loading Scene Booker',
    steps: { code: 'the game', fonts: 'the type', sound: 'the sound', pictures: 'the flyers', ready: 'doors open' }
  };

  var W = typeof window !== 'undefined' ? window : null;
  var D = typeof document !== 'undefined' && document && document.getElementById ? document : null;
  var MAX_MS = 15000, QUIET_MS = 650;
  var ORDER = ['code', 'fonts', 'sound', 'pictures', 'ready'];
  var got = {}, gone = false, t0 = Date.now(), quietT = null, lastCount = -1;

  function L(k) { try { return SB.text.label('ui.boot.' + k); } catch (e) { return k; } }
  function el() { return D ? D.getElementById('boot') : null; }

  function paint() {
    var b = el(), n = 0, i, cur = ORDER[0], fill, word;
    if (!b) return;
    for (i = 0; i < ORDER.length; i++) { if (got[ORDER[i]]) n++; else { cur = ORDER[i]; break; } }
    fill = b.querySelector('.bt-fill'); word = b.querySelector('.bt-word');
    /* the tape moves in held steps, a part at a time: never a smooth bar */
    if (fill) fill.style.setProperty('--bt', String(Math.max(0.06, n / ORDER.length)));
    if (word) word.textContent = L('steps.' + (n >= ORDER.length ? 'ready' : cur));
    b.setAttribute('aria-valuenow', String(Math.round(n / ORDER.length * 100)));
  }

  function step(name) {
    if (got[name]) return;
    got[name] = true;
    paint();
    if (ORDER.every(function (k) { return k === 'ready' || got[k]; })) finish();
  }

  function finish() {
    var b = el(), reduced = SB.Finish && SB.Finish.reduced ? SB.Finish.reduced() : false;
    if (gone) return;
    gone = true;
    got.ready = true; paint();
    if (D && D.documentElement) D.documentElement.classList.remove('is-booting');
    if (!b) return;
    b.setAttribute('aria-busy', 'false');
    if (reduced || !SB.Finish) { b.parentNode.removeChild(b); return; }
    /* a beat on "doors open", then the loading screen is torn away to the left */
    setTimeout(function () {
      b.addEventListener('animationend', function () { if (b.parentNode) b.parentNode.removeChild(b); });
      SB.Finish.move(b, 'wipe-out');
      setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 1200);
    }, 180);
  }

  /* the title screen's pictures: wait until it has mounted and nothing new has been fetched for a moment */
  function watchPictures() {
    if (!W || !W.performance || !W.performance.getEntriesByType) { step('pictures'); return; }
    function tick() {
      var n = W.performance.getEntriesByType('resource').length, imgs = D ? D.images : [], waiting = false, i;
      for (i = 0; i < imgs.length; i++) if (!imgs[i].complete) { waiting = true; break; }
      if (n === lastCount && !waiting && SB.UI && SB.UI.route && SB.UI.route()) { step('pictures'); return; }
      lastCount = n;
      quietT = setTimeout(tick, QUIET_MS);
    }
    quietT = setTimeout(tick, QUIET_MS);
  }

  function start() {
    if (!D) return;
    paint();
    step('code');
    /* the three faces (index.html preloads them) */
    try {
      if (D.fonts && D.fonts.load) Promise.all(['SB Type', 'SB Gothic', 'SB Mono'].map(function (f) { return D.fonts.load("1em '" + f + "'"); }))
        .then(function () { step('fonts'); }, function () { step('fonts'); });
      else step('fonts');
    } catch (e) { step('fonts'); }
    /* the sound: SB.Sfx decodes its clips after boot */
    (function waitSound(n) {
      if (!SB.Sfx || !SB.Sfx.ready || SB.Sfx.ready() || !SB.Sfx.level || n > 120) { step('sound'); return; }
      setTimeout(function () { waitSound(n + 1); }, 100);
    })(0);
    watchPictures();
    setTimeout(finish, MAX_MS);
  }

  /* ---------------- the in-game loading moment ---------------- */
  var holdEl = null, holds = 0;
  function showHold(on) {
    if (!D || !D.body) return;
    holds = Math.max(0, holds + (on ? 1 : -1));
    if (holds && !holdEl) {
      holdEl = D.createElement('div');
      holdEl.className = 'bt-hold';
      holdEl.setAttribute('role', 'status');
      holdEl.setAttribute('aria-label', L('label'));
      holdEl.innerHTML = '<span class="bt-hold-tape"><span class="bt-hold-fill"></span></span>';
      D.body.appendChild(holdEl);
    } else if (!holds && holdEl) { if (holdEl.parentNode) holdEl.parentNode.removeChild(holdEl); holdEl = null; }
  }
  function hold(ids, cb, o) {
    o = o || {};
    var fired = false, shown = false, slowT, capT;
    function go() { if (fired) return; fired = true; clearTimeout(slowT); clearTimeout(capT); if (shown) showHold(false); if (cb) cb(); }
    if (!ids || !ids.length || !SB.Scenes || !SB.Scenes.loadCuts) { go(); return; }
    slowT = setTimeout(function () { if (!fired) { shown = true; showHold(true); } }, o.slow || 250);
    capT = setTimeout(go, o.max || 6000);
    try { SB.Scenes.loadCuts(ids, go); } catch (e) { go(); }
  }

  SB.Boot = { step: step, hold: hold, done: function () { return gone; } };
  /* only in a real page (a test context without timers loads this file too) */
  if (D && typeof setTimeout === 'function') { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start(); }
})(SB);
