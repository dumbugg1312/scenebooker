/* Scene Booker — js/ui/finish.js
 * SB.Finish: the boxed-game finish every screen shares (design polish brief, jobs 1, 3 and 5; the looks are in
 * css/finish.css). Safe in Node: with no document every call is a no-op.
 *
 *   SB.UI.unit()                 px in one stage unit (--u): the 16:10 stage is 1600 x 1000 units, letterboxed
 *   SB.Finish.stagger(els, from) number children for the 35ms stagger (--i)
 *   SB.Finish.move(el, name, o)  play one of the four moves ('slap', 'wipe', 'stamp', 'peel'); o.delay ms, o.done()
 *   SB.Finish.countUp(el, to, o) count a number up in three held frames; o.from, o.fmt(n), o.cue (a sound per frame)
 *   SB.Finish.scrollbar(el)      hide el's native scrollbar and draw the pencil-and-tape one beside it
 *   SB.Finish.leave(main, from, to) hand the outgoing close-up to its exit move (js/ui/app.js mount())
 *   SB.Finish.fontStyle(markup)  the shipped faces as an SVG <style>, for drawings the copier rasters (an SVG drawn as
 *                                an image cannot reach the page's fonts); SB.Finish.withFonts(svgDoc) puts it inside
 *   SB.Finish.res()              how finely to raster a canvas or copier picture (px per --p unit, times the screen's dpr)
 * Inside .pz (a finished screen): no context menu, no image drag, no text selection, except in text inputs.
 */
(function (SB) {
  'use strict';

  var W = typeof window !== 'undefined' ? window : null;
  var D = typeof document !== 'undefined' && document && document.addEventListener ? document : null;
  var FRAME = 83;                                    // one held frame: 12 a second

  function unit() { return W ? Math.min((W.innerWidth || 1600) / 1600, (W.innerHeight || 1000) / 1000) : 1; }
  function reduced() {
    var r = D && D.documentElement, m;
    if (!r) return true;
    if (r.getAttribute('data-motion') === 'reduce') return true;
    if (r.getAttribute('data-motion') === 'full') return false;
    try { m = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)'); } catch (e) { m = null; }
    return !!(m && m.matches);
  }
  function inPz(t) { return !!(t && t.closest && t.closest('.pz')); }
  function typing(t) {
    var tag = t && t.tagName ? String(t.tagName).toLowerCase() : '';
    return tag === 'input' || tag === 'textarea' || !!(t && t.isContentEditable);
  }
  function sfx(cue, o) { try { if (SB.Sfx && SB.Sfx.play) SB.Sfx.play(cue, o || {}); } catch (e) { /* fine */ } }

  /* ---------------- job 1: the browser's own tells ---------------- */
  if (D) {
    ['contextmenu', 'dragstart', 'selectstart'].forEach(function (ev) {
      D.addEventListener(ev, function (e) { if (inPz(e.target) && !typing(e.target)) e.preventDefault(); }, true);
    });
  }

  /* ---------------- job 5: the moves ---------------- */
  function stagger(els, from) {
    (els || []).forEach(function (el, i) { if (el && el.style && el.style.setProperty) el.style.setProperty('--i', String((from || 0) + i)); });
    return els;
  }
  var DUR = { slap: 250, wipe: 250, 'wipe-out': 250, stamp: 333, peel: 250 };
  function move(el, name, o) {
    o = o || {};
    if (!el || !el.classList) return el;
    if (o.delay) el.style.setProperty('--mv-d', o.delay + 'ms');
    el.classList.remove('mv-' + name);
    void el.offsetWidth;                             // start it again if it was already playing
    el.classList.add('mv-' + name);
    if (o.cue) setTimeout(function () { sfx(o.cue, o.cueOpts); }, reduced() ? 0 : (o.delay || 0) + (o.cueAt || 0));
    if (o.done) setTimeout(o.done, reduced() ? 0 : (o.delay || 0) + (DUR[name] || 250));
    return el;
  }
  /* count a number up: from, then two in-between values, then the number, one held frame each */
  function countUp(el, to, o) {
    o = o || {};
    var from = o.from || 0, fmt = o.fmt || function (n) { return String(n); }, frames = [], i, n, t0 = o.delay || 0;
    if (!el) return;
    if (reduced() || to === from) { el.textContent = fmt(to); return; }
    for (i = 0; i <= 3; i++) {
      n = Math.round(from + (to - from) * i / 3);
      if (!frames.length || frames[frames.length - 1] !== n) frames.push(n);
    }
    el.textContent = fmt(frames[0]);
    frames.slice(1).forEach(function (v, k) {
      setTimeout(function () { el.textContent = fmt(v); if (o.cue) sfx(o.cue, o.cueOpts); }, t0 + (k + 1) * FRAME);
    });
  }

  /* ---------------- job 1: a drawn scrollbar ---------------- */
  function scrollbar(el) {
    var bar, thumb, drag = null, ro = null;
    if (!D || !el || !el.parentNode) return null;
    el.classList.add('pz-scroll');
    thumb = D.createElement('div'); thumb.className = 'pz-sb-thumb';
    bar = D.createElement('div'); bar.className = 'pz-sb'; bar.setAttribute('aria-hidden', 'true'); bar.appendChild(thumb);
    el.parentNode.insertBefore(bar, el.nextSibling);
    function place() {
      var sh = el.scrollHeight, ch = el.clientHeight, top = el.offsetTop, th, max, y;
      if (!bar.isConnected) { if (ro) ro.disconnect(); return; }
      bar.hidden = !(sh > ch + 2);
      if (bar.hidden) return;
      bar.style.top = top + 'px'; bar.style.height = ch + 'px';
      bar.style.left = (el.offsetLeft + el.offsetWidth - bar.offsetWidth) + 'px';
      th = Math.max(ch * ch / sh, unit() * 44);
      max = ch - th; y = sh - ch > 0 ? el.scrollTop / (sh - ch) * max : 0;
      thumb.style.height = th + 'px'; thumb.style.top = y + 'px';
    }
    el.addEventListener('scroll', place, { passive: true });
    if (typeof ResizeObserver === 'function') { ro = new ResizeObserver(place); try { ro.observe(el); if (el.firstElementChild) ro.observe(el.firstElementChild); } catch (e) { /* fine */ } }
    thumb.addEventListener('pointerdown', function (e) {
      drag = { y: e.clientY, s: el.scrollTop }; bar.classList.add('is-dragging');
      try { thumb.setPointerCapture(e.pointerId); } catch (x) { /* fine */ }
      e.preventDefault(); e.stopPropagation();
    });
    thumb.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var ch = el.clientHeight, sh = el.scrollHeight, th = thumb.offsetHeight;
      el.scrollTop = drag.s + (e.clientY - drag.y) * (sh - ch) / Math.max(1, ch - th);
    });
    function end() { drag = null; bar.classList.remove('is-dragging'); }
    thumb.addEventListener('pointerup', end); thumb.addEventListener('pointercancel', end);
    bar.addEventListener('pointerdown', function (e) {                    // a click on the line: a page that way
      if (e.target !== bar) return;
      var r = thumb.getBoundingClientRect();
      el.scrollBy({ top: (e.clientY < r.top ? -1 : 1) * el.clientHeight * 0.85, behavior: reduced() ? 'auto' : 'smooth' });
      sfx('slide', { gain: -8, el: bar, gap: 120 });
    });
    place();
    setTimeout(place, 60); setTimeout(place, 400);
    return { place: place };
  }

  /* ---------------- job 5: every screen leaves with a move ---------------- */
  /* the outgoing screen is moved, as it is, into a ghost layer over the incoming one and plays its exit there: a
     close-up peels off its stage while the dim lifts; a full screen (.sb-stage) plays the move its data-mv-exit names
     ('peel' unless it says 'wipe'). Nothing to do for the desk itself, which stays put under everything. */
  function leave(main, from, to) {
    var back, ghost, obj, full;
    if (!D || !main || !main.querySelector || from === to || reduced()) return;
    back = main.querySelector('.cu-back--staged');
    full = back ? null : main.querySelector(':scope > .sb-stage');
    if (!back && !full) return;
    ghost = D.createElement('div'); ghost.className = 'pz-ghost' + (full ? ' pz-ghost--full' : ''); ghost.setAttribute('aria-hidden', 'true');
    try { ghost.inert = true; } catch (e) { /* fine */ }
    while (main.firstChild) ghost.appendChild(main.firstChild);
    D.body.appendChild(ghost);
    if (full) {
      obj = full;
      function goneFull() { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); }
      obj.addEventListener('animationend', function (e) { if (e.target === obj) goneFull(); });
      move(obj, obj.getAttribute('data-mv-exit') === 'wipe' ? 'wipe-out' : 'peel');
      setTimeout(goneFull, 2000);
      return;
    }
    back.classList.add('is-leaving');
    obj = back.querySelector('.cu-obj');
    function gone() { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); }
    if (obj) {
      obj.classList.remove('mv-slap');
      obj.addEventListener('animationend', function (e) { if (e.target === obj) gone(); });
      move(obj, 'peel');
    }
    setTimeout(gone, obj ? 2000 : 0);                // in case the peel never reports its end
  }

  /* ---------------- job 2: the fonts, for drawings rastered by the copier ---------------- */
  var FONTS = { type: ['SB Type', 'special-elite.woff2'], gothic: ['SB Gothic', 'anton.woff2'], mono: ['SB Mono', 'plex-mono-bold.woff2'] }, DATA = {};
  function loadFonts() {
    /* canvases draw with whatever face is loaded when they draw: load all three now */
    try { if (D.fonts && D.fonts.load) ['SB Type', 'SB Gothic', 'SB Mono'].forEach(function (f) { D.fonts.load("1em '" + f + "'"); }); } catch (e) { /* fine */ }
    if (!W || typeof fetch !== 'function' || typeof FileReader === 'undefined') return;
    Object.keys(FONTS).forEach(function (k) {
      fetch('assets/fonts/' + FONTS[k][1]).then(function (r) { return r.ok ? r.blob() : null; }).then(function (b) {
        if (!b) return;
        var fr = new FileReader();
        fr.onload = function () { DATA[k] = String(fr.result).replace(/^data:[^;,]*/, 'data:font/woff2'); };
        fr.readAsDataURL(b);
      }).catch(function () { /* the drawing keeps its fallback face */ });
    });
  }
  /* the kit's typewriter and its heavy ransom letters, drawn with the shipped faces */
  function fontStyle(markup) {
    var m = String(markup || ''), css = '', rules = '';
    if (m.indexOf('<text') < 0) return '';
    if (DATA.type && /Courier|SB Type/.test(m)) { css += "@font-face{font-family:'SB Type';src:url(" + DATA.type + ")}"; rules += "text[font-family*='Courier']{font-family:'SB Type';font-weight:400}"; }
    if (DATA.gothic && /Impact|Arial Black|SB Gothic/.test(m)) { css += "@font-face{font-family:'SB Gothic';src:url(" + DATA.gothic + ")}"; rules += "text[font-family^='Impact'],text[font-family*='Arial Black']{font-family:'SB Gothic';font-weight:400}"; }
    if (DATA.mono && /SB Mono|ui-monospace|Menlo/.test(m)) { css += "@font-face{font-family:'SB Mono';src:url(" + DATA.mono + ")}"; rules += "text[font-family*='ui-monospace'],text[font-family*='Menlo']{font-family:'SB Mono'}"; }
    return css || rules ? '<style>' + css + rules + '</style>' : '';
  }
  if (D) { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', loadFonts); else loadFonts(); }

  /* how finely a canvas or the copier must raster a drawing that is w --p wide on screen to stay sharp at this size */
  function res() { return Math.max(1, Math.min(4, Math.round(unit() * 1.25 * ((W && W.devicePixelRatio) || 1) * 4) / 4)); }
  /* an SVG document with the shipped faces inside it, ready to be drawn as an image (Blob URL / img) */
  function withFonts(svg) { var st = fontStyle(svg), i = String(svg).indexOf('>'); return st && i > 0 ? svg.slice(0, i + 1) + st + svg.slice(i + 1) : svg; }

  SB.Finish = { stagger: stagger, move: move, countUp: countUp, scrollbar: scrollbar, leave: leave, fontStyle: fontStyle, withFonts: withFonts, res: res,
                reduced: reduced, unit: unit, FRAME: FRAME };
  if (SB.UI) SB.UI.unit = unit;
})(SB);
