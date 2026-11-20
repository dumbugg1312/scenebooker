/* Scene Booker — ui/dom.js (UI-A1)
 * The DOM builder and the player's display preferences. Spec: design/spec/05-interface.md section 1.1.
 * Adds to the SB.UI registry: h, prefs, on, off, svg, clear, token.
 * Touches no DOM while loading: every document access is inside a function.
 */
(function (SB) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var SVG_TAGS = { svg: 1, g: 1, path: 1, rect: 1, circle: 1, ellipse: 1, line: 1, polyline: 1, polygon: 1, text: 1,
                   tspan: 1, defs: 1, pattern: 1, use: 1, title: 1, clipPath: 1, mask: 1, linearGradient: 1, stop: 1 };
  /* attributes set as properties on form controls, so the live value follows */
  var PROPS = { value: 1, checked: 1, selected: 1, disabled: 1, readOnly: 1, indeterminate: 1 };

  function doc() { return (typeof document !== 'undefined') ? document : null; }

  function appendKids(el, children) {
    var d = doc(), i, c;
    if (children === null || children === undefined || children === false) return;
    if (!Array.isArray(children)) children = [children];
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (c === null || c === undefined || c === false || c === true) continue;
      if (Array.isArray(c)) { appendKids(el, c); continue; }
      if (typeof c === 'string' || typeof c === 'number') el.appendChild(d.createTextNode(String(c)));
      else el.appendChild(c);
    }
  }

  function setStyle(el, style) {
    var k;
    if (!style) return;
    if (typeof style === 'string') { el.setAttribute('style', style); return; }
    for (k in style) {
      if (!Object.prototype.hasOwnProperty.call(style, k) || style[k] === null || style[k] === undefined) continue;
      if (k.indexOf('--') === 0 && el.style.setProperty) el.style.setProperty(k, String(style[k]));
      else el.style[k] = style[k];
    }
  }

  /** h(tag, attrs, children) -> Element. attrs: class, text, html (SVG strings from SB.Identity only),
   *  on: { click: fn }, aria: { label: '…' }, data: { k: v }, style (string or object), any other attribute.
   *  children: an element, a string, or an array of them; null entries are skipped. */
  function h(tag, attrs, children) {
    var d = doc(), el, k, v, a;
    if (!d) SB.fail('SB.UI.h', 'there is no document');
    el = SVG_TAGS[tag] ? d.createElementNS(SVG_NS, tag) : d.createElement(tag);
    a = attrs || {};
    if (typeof a === 'string' || Array.isArray(a) || (a && a.nodeType)) { children = a; a = {}; }
    for (k in a) {
      if (!Object.prototype.hasOwnProperty.call(a, k)) continue;
      v = a[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') { if (SVG_TAGS[tag]) el.setAttribute('class', v); else el.className = Array.isArray(v) ? v.filter(Boolean).join(' ') : v; }
      else if (k === 'text') el.textContent = String(v);
      else if (k === 'html') el.innerHTML = String(v);
      else if (k === 'on') { Object.keys(v).forEach(function (type) { if (typeof v[type] === 'function') el.addEventListener(type, v[type]); }); }
      else if (k === 'aria') { Object.keys(v).forEach(function (n) { if (v[n] !== null && v[n] !== undefined && v[n] !== false) el.setAttribute('aria-' + n, String(v[n])); }); }
      else if (k === 'data') { Object.keys(v).forEach(function (n) { if (v[n] !== null && v[n] !== undefined) el.setAttribute('data-' + n.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); }), String(v[n])); }); }
      else if (k === 'style') setStyle(el, v);
      else if (PROPS[k] && !SVG_TAGS[tag]) el[k] = v;
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, String(v));
    }
    appendKids(el, children);
    return el;
  }

  /** Remove every child of an element. Returns the element. */
  function clear(el) {
    if (!el) return el;
    if (typeof el.replaceChildren === 'function') el.replaceChildren();
    else while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  }

  /** Parse an SVG string (from SB.Identity) into an element holder: a span carrying the markup and a label. */
  function svg(markup, label, cls) {
    return h('span', { class: 'sb-svg' + (cls ? ' ' + cls : ''), html: markup || '', role: label ? 'img' : null,
                       aria: label ? { label: label } : (markup ? { hidden: 'true' } : null) });
  }

  /** on(target, type, fn, opts) -> off function. */
  function on(target, type, fn, opts) {
    if (!target || typeof target.addEventListener !== 'function') return function () {};
    target.addEventListener(type, fn, opts || false);
    return function () { off(target, type, fn, opts); };
  }
  function off(target, type, fn, opts) {
    if (target && typeof target.removeEventListener === 'function') target.removeEventListener(type, fn, opts || false);
  }

  /** The current value of a token (custom property) for canvas and SVG drawing: token('--ink'). */
  function token(name) {
    var d = doc(), v = '';
    if (!d || typeof getComputedStyle !== 'function') return '';
    try { v = getComputedStyle(d.documentElement).getPropertyValue(name); } catch (e) { v = ''; }
    return String(v || '').trim();
  }

  /* ---------------------------------------------------------------- */
  /* preferences: localStorage['sb.prefs'] (00-overview 6.6)          */
  /* ---------------------------------------------------------------- */

  var KEY = 'sb.prefs';
  var DEFAULTS = { theme: 'auto', textScale: 1, motion: 'auto', density: 'normal', plainFlyers: false, speed: 'normal', gray: false, sound: 'full', music: 'on', tape: 'on', musicVol: 0.8 };
  var cache = null;

  function storage() {
    try { return (typeof localStorage !== 'undefined' && localStorage) ? localStorage : null; } catch (e) { return null; }
  }
  function readAll() {
    var ls, raw, obj = {}, k;
    if (cache) return cache;
    ls = storage();
    try { raw = ls ? ls.getItem(KEY) : null; obj = raw ? JSON.parse(raw) : {}; } catch (e) { obj = {}; }
    if (!obj || typeof obj !== 'object') obj = {};
    cache = {};
    for (k in DEFAULTS) cache[k] = DEFAULTS[k];
    for (k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) cache[k] = obj[k];
    return cache;
  }
  function writeAll() {
    var ls = storage();
    try { if (ls) ls.setItem(KEY, JSON.stringify(cache)); } catch (e) { /* storage full or blocked: the setting lasts this session */ }
  }

  function apply() {
    var d = doc(), root, p = readAll(), scale;
    if (!d || !d.documentElement) return;
    root = d.documentElement;
    if (p.theme === 'light' || p.theme === 'dark') root.setAttribute('data-theme', p.theme); else root.removeAttribute('data-theme');
    if (p.motion === 'reduce' || p.motion === 'full') root.setAttribute('data-motion', p.motion); else root.removeAttribute('data-motion');
    if (p.gray) root.setAttribute('data-gray', '1'); else root.removeAttribute('data-gray');
    root.setAttribute('data-density', p.density === 'dense' ? 'dense' : 'normal');
    scale = Number(p.textScale);
    if (!(scale >= 1 && scale <= 1.5)) scale = 1;
    if (root.style && root.style.setProperty) root.style.setProperty('--scale', String(scale));
  }

  function fire(type, detail) {
    var d = doc(), ev;
    if (!d || typeof d.dispatchEvent !== 'function') return;
    try { ev = new CustomEvent(type, { detail: detail }); }
    catch (e) { try { ev = d.createEvent('CustomEvent'); ev.initCustomEvent(type, false, false, detail); } catch (e2) { return; } }
    d.dispatchEvent(ev);
  }

  var prefs = {
    defaults: DEFAULTS,
    get: function (key) { var p = readAll(); return key === undefined ? SB.util.copy(p) : p[key]; },
    set: function (key, value) {
      var p = readAll(), was = p[key];
      p[key] = value;
      writeAll();
      apply();
      if (key === 'theme' && was !== value) fire('themechange', { theme: value });
      if (key === 'gray' && was !== value) fire('themechange', { gray: value });
    },
    /** Apply every preference to <html>: theme, motion, grayscale, density, text scale. */
    apply: apply,
    /** True when motion should be cut (the game's setting, or the OS setting when the game's is auto). */
    reduced: function () {
      var p = readAll();
      if (p.motion === 'reduce') return true;
      if (p.motion === 'full') return false;
      try { return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
    }
  };

  SB.UI.extend({ h: h, prefs: prefs, on: on, off: off, svg: svg, clear: clear, token: token, fire: fire });
})(SB);
