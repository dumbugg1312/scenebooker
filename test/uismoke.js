#!/usr/bin/env node
'use strict';
// test/uismoke.js (UI-A1's test tool) — boots the interface in Node against a permissive fake DOM and renders every
// registered screen and part once.
//   node test/uismoke.js                 everything
//   node test/uismoke.js --only week     one route (or a part name, or "shell", or "C" for the component pass,
//                                        or "tutorial" for the guided first show played through, test/tutorial-walk.js)
// It loads the files of index.html in order with vm.runInThisContext (a missing file is skipped with a note),
// pre-loads the Pensacola pack, boots the shell, starts a new game through the calls the start screen makes
// (SB.Cities.load, SB.Game.newGame, SB.UI.start), then mounts each screen inside try/catch and prints
// "ok <route>" or the route with the error and its top stack line. Exit 1 if anything threw.
// No packages. Timers never fire (the play loop must not run away); requestAnimationFrame runs its callback once.

const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');

const argv = process.argv.slice(2);
const onlyAt = argv.indexOf('--only');
const ONLY = onlyAt >= 0 ? argv[onlyAt + 1] : null;
const VERBOSE = argv.indexOf('--verbose') >= 0;
const DUMP = argv.indexOf('--dump') >= 0;      // print the text of the desk and main after the game starts

/* ======================================================================= */
/* the fake DOM                                                             */
/* ======================================================================= */

const listenersOf = new WeakMap();
function lst(t) { let m = listenersOf.get(t); if (!m) { m = {}; listenersOf.set(t, m); } return m; }
function addL(t, type, fn) { if (typeof fn !== 'function' && !(fn && fn.handleEvent)) return; const m = lst(t); (m[type] = m[type] || []).push(fn); }
function remL(t, type, fn) { const m = lst(t); if (!m[type]) return; const i = m[type].indexOf(fn); if (i >= 0) m[type].splice(i, 1); }
function fireOn(t, ev) {
  const m = lst(t), list = (m[ev.type] || []).slice();
  ev.currentTarget = t;
  for (const fn of list) { if (typeof fn === 'function') fn.call(t, ev); else fn.handleEvent(ev); if (ev._stopNow) break; }
}

class FakeEvent {
  constructor(type, opts) {
    opts = opts || {};
    this.type = type; this.bubbles = !!opts.bubbles; this.cancelable = opts.cancelable !== false; this.detail = opts.detail;
    this.defaultPrevented = false; this.target = null; this.currentTarget = null; this._stop = false; this._stopNow = false;
    Object.keys(opts).forEach(k => { if (!(k in this)) this[k] = opts[k]; });
  }
  preventDefault() { this.defaultPrevented = true; }
  stopPropagation() { this._stop = true; }
  stopImmediatePropagation() { this._stop = true; this._stopNow = true; }
  initCustomEvent(type, b, c, detail) { this.type = type; this.bubbles = b; this.detail = detail; }
}
class FakeCustomEvent extends FakeEvent {}

function canvasContext(canvas) {
  const store = { canvas: canvas };
  const special = {
    measureText: (t) => ({ width: String(t || '').length * 6, actualBoundingBoxAscent: 8, actualBoundingBoxDescent: 2, actualBoundingBoxLeft: 0, actualBoundingBoxRight: String(t || '').length * 6 }),
    getImageData: (x, y, w, h) => ({ width: w || 1, height: h || 1, data: new Uint8ClampedArray(Math.max(1, (w || 1) * (h || 1)) * 4) }),
    createImageData: (w, h) => ({ width: w || 1, height: h || 1, data: new Uint8ClampedArray(Math.max(1, (w || 1) * (h || 1)) * 4) }),
    createLinearGradient: () => ({ addColorStop() {} }),
    createRadialGradient: () => ({ addColorStop() {} }),
    createConicGradient: () => ({ addColorStop() {} }),
    createPattern: () => ({ setTransform() {} }),
    getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
    getLineDash: () => [],
    isPointInPath: () => false
  };
  return new Proxy(store, {
    get(t, k) {
      if (k in special) return special[k];
      if (k in t) return t[k];
      if (typeof k === 'symbol') return undefined;
      return function () { return undefined; };
    },
    set(t, k, v) { t[k] = v; return true; }
  });
}

class FakeNode {
  constructor() { this.childNodes = []; this.parentNode = null; }
  get firstChild() { return this.childNodes[0] || null; }
  get lastChild() { return this.childNodes[this.childNodes.length - 1] || null; }
  get nextSibling() { const p = this.parentNode; if (!p) return null; const i = p.childNodes.indexOf(this); return p.childNodes[i + 1] || null; }
  get previousSibling() { const p = this.parentNode; if (!p) return null; const i = p.childNodes.indexOf(this); return i > 0 ? p.childNodes[i - 1] : null; }
  get parentElement() { return this.parentNode && this.parentNode.nodeType === 1 ? this.parentNode : null; }
  get isConnected() { let n = this; while (n.parentNode) n = n.parentNode; return n === fakeDocument; }
  _adopt(kids) {
    const out = [];
    for (const k of kids) {
      if (k === null || k === undefined) continue;
      const node = (typeof k === 'string' || typeof k === 'number') ? new FakeText(String(k)) : k;
      if (!(node instanceof FakeNode)) throw new TypeError('fake DOM: not a node: ' + String(node));
      if (node.nodeType === 11) { out.push(...node.childNodes.splice(0)); continue; }
      if (node.parentNode) node.parentNode.removeChild(node);
      out.push(node);
    }
    out.forEach(n => { n.parentNode = this; });
    return out;
  }
  appendChild(n) { const a = this._adopt([n]); this.childNodes.push(...a); return n; }
  append(...ns) { this.childNodes.push(...this._adopt(ns)); }
  prepend(...ns) { this.childNodes.unshift(...this._adopt(ns)); }
  insertBefore(n, ref) {
    if (!ref) return this.appendChild(n);
    const a = this._adopt([n]); const i = this.childNodes.indexOf(ref);
    this.childNodes.splice(i < 0 ? this.childNodes.length : i, 0, ...a); return n;
  }
  removeChild(n) { const i = this.childNodes.indexOf(n); if (i < 0) throw new Error('fake DOM: removeChild of a node that is not a child'); this.childNodes.splice(i, 1); n.parentNode = null; return n; }
  replaceChild(n, old) { this.insertBefore(n, old); return this.removeChild(old); }
  replaceChildren(...ns) { this.childNodes.forEach(c => { c.parentNode = null; }); this.childNodes = []; this.append(...ns); }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  replaceWith(...ns) { const p = this.parentNode; if (!p) return; const i = p.childNodes.indexOf(this); const a = p._adopt(ns); p.childNodes.splice(p.childNodes.indexOf(this), 1, ...a); this.parentNode = null; void i; }
  contains(n) { while (n) { if (n === this) return true; n = n.parentNode; } return false; }
  hasChildNodes() { return this.childNodes.length > 0; }
  addEventListener(type, fn) { addL(this, type, fn); }
  removeEventListener(type, fn) { remL(this, type, fn); }
  dispatchEvent(ev) {
    ev.target = ev.target || this;
    const path = []; let n = this; while (n) { path.push(n); n = n.parentNode; }
    if (path[path.length - 1] === fakeDocument) path.push(globalThis);
    for (let i = 0; i < path.length; i++) { if (i > 0 && !ev.bubbles) break; fireOn(path[i], ev); if (ev._stop) break; }
    return !ev.defaultPrevented;
  }
  get textContent() { return this.childNodes.map(c => c.textContent).join(''); }
  set textContent(v) { this.replaceChildren(); if (v !== '' && v !== null && v !== undefined) this.appendChild(new FakeText(String(v))); }
  cloneNode(deep) {
    let c;
    if (this.nodeType === 3) return new FakeText(this.data);
    if (this.nodeType === 11) c = new FakeFragment();
    else { c = new FakeElement(this.localName, this.namespaceURI); Object.keys(this._attrs).forEach(k => { c._attrs[k] = this._attrs[k]; }); }
    if (deep) this.childNodes.forEach(k => c.appendChild(k.cloneNode(true)));
    return c;
  }
}

class FakeText extends FakeNode {
  constructor(t) { super(); this.nodeType = 3; this.nodeName = '#text'; this.data = t; }
  get textContent() { return this.data; }
  set textContent(v) { this.data = String(v); }
  get nodeValue() { return this.data; }
  set nodeValue(v) { this.data = String(v); }
}
class FakeFragment extends FakeNode {
  constructor() { super(); this.nodeType = 11; this.nodeName = '#document-fragment'; }
  get children() { return this.childNodes.filter(c => c.nodeType === 1); }
  querySelector(s) { return qsa(this, s)[0] || null; }
  querySelectorAll(s) { return qsa(this, s); }
}

function kebab(k) { return k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()); }
function camel(k) { return k.replace(/-([a-z])/g, (m, c) => c.toUpperCase()); }

function makeStyle() {
  const s = {};
  Object.defineProperties(s, {
    setProperty: { value: function (k, v) { this[k] = String(v); } },
    getPropertyValue: { value: function (k) { return this[k] !== undefined ? this[k] : (this[camel(k)] || ''); } },
    removeProperty: { value: function (k) { const v = this[k]; delete this[k]; return v || ''; } },
    cssText: { get() { return Object.keys(this).map(k => kebab(k) + ': ' + this[k]).join('; '); }, set(v) { Object.keys(this).forEach(k => delete this[k]); String(v || '').split(';').forEach(d => { const i = d.indexOf(':'); if (i > 0) this[camel(d.slice(0, i).trim())] = d.slice(i + 1).trim(); }); } }
  });
  return s;
}

class FakeElement extends FakeNode {
  constructor(tag, ns) {
    super();
    this.nodeType = 1;
    this.namespaceURI = ns || 'http://www.w3.org/1999/xhtml';
    this.localName = ns && ns !== 'http://www.w3.org/1999/xhtml' ? String(tag) : String(tag).toLowerCase();
    this._attrs = {};
    this._html = '';
    this.style = makeStyle();
    this.value = '';
    this.checked = false;
    this.selected = false;
    this.disabled = false;
    this.readOnly = false;
    this.scrollTop = 0; this.scrollLeft = 0;
    if (this.localName === 'canvas') { this.width = 300; this.height = 150; }
    const el = this;
    this.dataset = new Proxy({}, {
      get(t, k) { return typeof k === 'string' ? el.getAttribute('data-' + kebab(k)) === null ? undefined : el.getAttribute('data-' + kebab(k)) : undefined; },
      set(t, k, v) { el.setAttribute('data-' + kebab(String(k)), v); return true; },
      deleteProperty(t, k) { el.removeAttribute('data-' + kebab(String(k))); return true; },
      ownKeys() { return Object.keys(el._attrs).filter(a => a.indexOf('data-') === 0).map(a => camel(a.slice(5))); },
      getOwnPropertyDescriptor() { return { enumerable: true, configurable: true }; }
    });
    this.classList = {
      _list() { return (el._attrs['class'] || '').split(/\s+/).filter(Boolean); },
      _set(l) { el._attrs['class'] = l.join(' '); },
      add(...c) { const l = this._list(); c.forEach(x => { if (l.indexOf(x) < 0) l.push(x); }); this._set(l); },
      remove(...c) { this._set(this._list().filter(x => c.indexOf(x) < 0)); },
      contains(c) { return this._list().indexOf(c) >= 0; },
      toggle(c, force) { const on = force === undefined ? !this.contains(c) : !!force; if (on) this.add(c); else this.remove(c); return on; },
      replace(a, b) { if (!this.contains(a)) return false; this._set(this._list().map(x => x === a ? b : x)); return true; },
      get length() { return this._list().length; },
      item(i) { return this._list()[i] || null; },
      forEach(fn) { this._list().forEach(fn); },
      toString() { return el._attrs['class'] || ''; }
    };
  }
  get tagName() { return this.namespaceURI === 'http://www.w3.org/1999/xhtml' ? this.localName.toUpperCase() : this.localName; }
  get nodeName() { return this.tagName; }
  get children() { return this.childNodes.filter(c => c.nodeType === 1); }
  get childElementCount() { return this.children.length; }
  get firstElementChild() { return this.children[0] || null; }
  get lastElementChild() { const c = this.children; return c[c.length - 1] || null; }
  get nextElementSibling() { const p = this.parentNode; if (!p) return null; const c = p.childNodes.filter(x => x.nodeType === 1); return c[c.indexOf(this) + 1] || null; }
  get ownerDocument() { return fakeDocument; }
  get className() { return this._attrs['class'] || ''; }
  set className(v) { this._attrs['class'] = String(v); }
  get id() { return this._attrs.id || ''; }
  set id(v) { this._attrs.id = String(v); }
  get title() { return this._attrs.title || ''; }
  set title(v) { this._attrs.title = String(v); }
  get hidden() { return this._attrs.hidden !== undefined; }
  set hidden(v) { if (v) this._attrs.hidden = ''; else delete this._attrs.hidden; }
  get tabIndex() { return this._attrs.tabindex !== undefined ? Number(this._attrs.tabindex) : -1; }
  set tabIndex(v) { this._attrs.tabindex = String(v); }
  get innerHTML() { return this._html || this.childNodes.map(c => c.nodeType === 3 ? c.data : (c.outerHTML || '')).join(''); }
  set innerHTML(v) { this.replaceChildren(); this._html = String(v); }
  get outerHTML() { return '<' + this.localName + Object.keys(this._attrs).map(k => ' ' + k + '="' + this._attrs[k] + '"').join('') + '>' + this.innerHTML + '</' + this.localName + '>'; }
  get innerText() { return this.textContent; }
  set innerText(v) { this.textContent = v; }
  get isContentEditable() { return this._attrs.contenteditable === 'true' || this._attrs.contenteditable === ''; }
  get offsetWidth() { return 100; } get offsetHeight() { return 20; }
  get clientWidth() { return 100; } get clientHeight() { return 20; }
  get scrollWidth() { return 100; } get scrollHeight() { return 20; }
  get offsetParent() { return this.parentElement; }
  get options() { return this.querySelectorAll('option'); }
  get selectedIndex() { return 0; }
  get attributes() { return Object.keys(this._attrs).map(k => ({ name: k, value: this._attrs[k] })); }
  setAttribute(k, v) { this._attrs[String(k)] = String(v); }
  setAttributeNS(ns, k, v) { this.setAttribute(k, v); }
  getAttribute(k) { return Object.prototype.hasOwnProperty.call(this._attrs, k) ? this._attrs[k] : null; }
  getAttributeNS(ns, k) { return this.getAttribute(k); }
  removeAttribute(k) { delete this._attrs[k]; }
  hasAttribute(k) { return Object.prototype.hasOwnProperty.call(this._attrs, k); }
  toggleAttribute(k, force) { const on = force === undefined ? !this.hasAttribute(k) : !!force; if (on) this._attrs[k] = ''; else delete this._attrs[k]; return on; }
  querySelector(s) { return qsa(this, s)[0] || null; }
  querySelectorAll(s) { return qsa(this, s); }
  getElementsByTagName(t) { return qsa(this, t); }
  getElementsByClassName(c) { return qsa(this, c.split(/\s+/).map(x => '.' + x).join('')); }
  closest(s) { let n = this; while (n && n.nodeType === 1) { if (matches(n, s)) return n; n = n.parentNode; } return null; }
  matches(s) { return matches(this, s); }
  focus() { fakeDocument.activeElement = this; }
  blur() { if (fakeDocument.activeElement === this) fakeDocument.activeElement = fakeDocument.body; }
  click() { this.dispatchEvent(new FakeEvent('click', { bubbles: true })); }
  select() {} setSelectionRange() {} scrollIntoView() {} scrollTo() {} scrollBy() {}
  setPointerCapture() {} releasePointerCapture() {}
  showModal() { this._attrs.open = ''; } show() { this._attrs.open = ''; } close() { delete this._attrs.open; }
  getBoundingClientRect() { return { x: 0, y: 0, top: 0, left: 0, right: 100, bottom: 20, width: 100, height: 20 }; }
  getClientRects() { return [this.getBoundingClientRect()]; }
  getContext() { if (!this._ctx) this._ctx = canvasContext(this); return this._ctx; }
  toDataURL() { return 'data:image/png;base64,'; }
  toBlob(cb) { if (typeof cb === 'function') cb(null); }
  animate() { return { finished: Promise.resolve(), cancel() {}, finish() {}, play() {}, pause() {}, addEventListener() {}, onfinish: null }; }
  getAnimations() { return []; }
  getBBox() { return { x: 0, y: 0, width: 100, height: 20 }; }
  getTotalLength() { return 100; }
  getPointAtLength() { return { x: 0, y: 0 }; }
}

/* a small selector engine: lists, descendant and child combinators, tag, #id, .class, [attr], [attr="v"],
 * [attr^= $= *= ~=], :not(simple). Other pseudo-classes are ignored (they match). */
function parseCompound(s) {
  const out = { tag: null, id: null, cls: [], attrs: [], not: [] };
  let i = 0;
  const m = /^[a-zA-Z*][\w-]*/.exec(s); if (m) { out.tag = m[0] === '*' ? null : m[0].toLowerCase(); i = m[0].length; }
  while (i < s.length) {
    const c = s[i];
    if (c === '#') { const r = /^#([\w-]+)/.exec(s.slice(i)); out.id = r[1]; i += r[0].length; }
    else if (c === '.') { const r = /^\.([\w-]+)/.exec(s.slice(i)); out.cls.push(r[1]); i += r[0].length; }
    else if (c === '[') {
      const r = /^\[\s*([\w:-]+)\s*(?:([~^$*|!]?=)\s*(?:"([^"]*)"|'([^']*)'|([^\]\s]*)))?\s*\]/.exec(s.slice(i));
      if (!r) throw new Error('fake DOM: bad selector ' + s);
      out.attrs.push({ name: r[1], op: r[2] || null, val: r[3] !== undefined ? r[3] : (r[4] !== undefined ? r[4] : r[5]) }); i += r[0].length;
    } else if (c === ':') {
      const r = /^::?([\w-]+)(\(([^()]*(\([^()]*\))?[^()]*)\))?/.exec(s.slice(i));
      if (!r) throw new Error('fake DOM: bad selector ' + s);
      if (r[1] === 'not' && r[3]) out.not.push(parseCompound(r[3].trim()));
      i += r[0].length;
    } else throw new Error('fake DOM: bad selector ' + s);
  }
  return out;
}
function matchCompound(el, c) {
  if (!el || el.nodeType !== 1) return false;
  if (c.tag && el.localName.toLowerCase() !== c.tag) return false;
  if (c.id && el.getAttribute('id') !== c.id) return false;
  for (const k of c.cls) if (!el.classList.contains(k)) return false;
  for (const a of c.attrs) {
    const v = a.name === 'disabled' && el.disabled ? '' : el.getAttribute(a.name);
    if (v === null) return false;
    if (!a.op) continue;
    if (a.op === '=' && v !== a.val) return false;
    if (a.op === '^=' && v.indexOf(a.val) !== 0) return false;
    if (a.op === '$=' && v.slice(-a.val.length) !== a.val) return false;
    if (a.op === '*=' && v.indexOf(a.val) < 0) return false;
    if (a.op === '~=' && v.split(/\s+/).indexOf(a.val) < 0) return false;
  }
  for (const n of c.not) if (matchCompound(el, n)) return false;
  return true;
}
const selCache = {};
function parseSelector(sel) {
  if (selCache[sel]) return selCache[sel];
  const list = sel.split(',').map(part => {
    const toks = part.trim().replace(/\s*>\s*/g, ' > ').split(/\s+/).filter(Boolean);
    const chain = []; let comb = ' ';
    toks.forEach(t => { if (t === '>') { comb = '>'; return; } chain.push({ comb: comb, c: parseCompound(t) }); comb = ' '; });
    return chain;
  });
  return (selCache[sel] = list);
}
function matchChain(el, chain, i) {
  if (!matchCompound(el, chain[i].c)) return false;
  if (i === 0) return true;
  if (chain[i].comb === '>') return matchChain(el.parentNode, chain, i - 1);
  let p = el.parentNode;
  while (p && p.nodeType === 1) { if (matchChain(p, chain, i - 1)) return true; p = p.parentNode; }
  return false;
}
function matches(el, sel) { return parseSelector(sel).some(chain => matchChain(el, chain, chain.length - 1)); }
function qsa(root, sel) {
  const out = [];
  (function walk(n) { for (const c of n.childNodes) { if (c.nodeType === 1) { if (matches(c, sel)) out.push(c); walk(c); } } })(root);
  return out;
}

class FakeDocument extends FakeNode {
  constructor() {
    super();
    this.nodeType = 9; this.nodeName = '#document';
    this.readyState = 'loading'; this.visibilityState = 'visible'; this.hidden = false; this.title = '';
    this.documentElement = new FakeElement('html');
    this.head = new FakeElement('head'); this.body = new FakeElement('body');
    this.appendChild(this.documentElement);
    this.documentElement.appendChild(this.head); this.documentElement.appendChild(this.body);
    this.activeElement = this.body;
    this.defaultView = globalThis;
  }
  createElement(t) { return new FakeElement(t); }
  createElementNS(ns, t) { return new FakeElement(t, ns); }
  createTextNode(t) { return new FakeText(String(t)); }
  createDocumentFragment() { return new FakeFragment(); }
  createComment() { return new FakeText(''); }
  createEvent() { return new FakeEvent(''); }
  getElementById(id) { return qsa(this, '#' + id)[0] || null; }
  querySelector(s) { return qsa(this, s)[0] || null; }
  querySelectorAll(s) { return qsa(this, s); }
  getElementsByTagName(t) { return qsa(this, t); }
  getElementsByClassName(c) { return qsa(this, '.' + c); }
  hasFocus() { return true; }
  execCommand() { return false; }
  getSelection() { return { removeAllRanges() {}, addRange() {}, toString() { return ''; } }; }
}

const fakeDocument = new FakeDocument();

/* build the body of index.html: the shell's own containers */
function buildBody(html) {
  const re = /<(header|nav|main|div)\b([^>]*)>\s*<\/\1>/g; let m;
  while ((m = re.exec(html))) {
    const el = new FakeElement(m[1]); const attrRe = /([\w-]+)(?:="([^"]*)")?/g; let a;
    while ((a = attrRe.exec(m[2]))) el.setAttribute(a[1], a[2] === undefined ? '' : a[2]);
    fakeDocument.body.appendChild(el);
  }
  const bodyClass = /<body\b[^>]*class="([^"]*)"/.exec(html); if (bodyClass) fakeDocument.body.className = bodyClass[1];
}

/* timers: collected, never run */
const timers = [];
let rafDepth = 0;
function installGlobals() {
  const memory = {};
  const storage = {
    getItem: k => Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null,
    setItem: (k, v) => { memory[k] = String(v); },
    removeItem: k => { delete memory[k]; },
    clear: () => { Object.keys(memory).forEach(k => delete memory[k]); },
    key: i => Object.keys(memory)[i] || null,
    get length() { return Object.keys(memory).length; }
  };
  const define = (k, v) => { try { Object.defineProperty(globalThis, k, { value: v, writable: true, configurable: true }); } catch (e) { globalThis[k] = v; } };
  define('window', globalThis);
  define('self', globalThis);
  define('document', fakeDocument);
  define('localStorage', storage);
  define('sessionStorage', storage);
  define('location', { hash: '', search: '?dev', href: 'file:///index.html?dev', pathname: '/index.html', protocol: 'file:', reload() {}, assign() {}, replace() {} });
  define('navigator', { userAgent: 'uismoke', language: 'en-US', languages: ['en-US'], clipboard: { writeText: () => Promise.resolve() } });
  define('history', { pushState() {}, replaceState() {}, back() {}, length: 1, state: null });
  define('Event', FakeEvent); define('CustomEvent', FakeCustomEvent); define('KeyboardEvent', FakeEvent); define('MouseEvent', FakeEvent);
  define('PointerEvent', FakeEvent); define('FocusEvent', FakeEvent);
  define('Node', FakeNode); define('Element', FakeElement); define('HTMLElement', FakeElement); define('SVGElement', FakeElement);
  define('HTMLCanvasElement', FakeElement); define('Text', FakeText); define('DocumentFragment', FakeFragment);
  define('requestAnimationFrame', function (cb) { if (rafDepth > 0) return 0; rafDepth++; try { cb(0); } finally { rafDepth--; } return 1; });
  define('cancelAnimationFrame', function () {});
  define('setTimeout', function (fn, ms) { timers.push({ fn, ms }); return timers.length; });
  define('setInterval', function (fn, ms) { timers.push({ fn, ms, every: true }); return timers.length; });
  define('clearTimeout', function () {}); define('clearInterval', function () {});
  define('getComputedStyle', function (el) { return { getPropertyValue: k => (el && el.style && el.style.getPropertyValue) ? el.style.getPropertyValue(k) : '' }; });
  define('matchMedia', function (q) { return { matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }; });
  define('devicePixelRatio', 1); define('innerWidth', 1280); define('innerHeight', 800);
  define('scrollTo', function () {}); define('alert', function () {}); define('confirm', function () { return true; }); define('prompt', function () { return null; });
  define('open', function () { return null; });
  define('Path2D', class { constructor() { return new Proxy(this, { get: (t, k) => (k in t ? t[k] : function () {}) }); } });
  ['ResizeObserver', 'IntersectionObserver', 'MutationObserver'].forEach(n => define(n, class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }));
  define('Image', class { constructor() { this.width = 0; this.height = 0; } });
  define('addEventListener', function (type, fn) { addL(globalThis, type, fn); });
  define('removeEventListener', function (type, fn) { remL(globalThis, type, fn); });
  define('dispatchEvent', function (ev) { ev.target = ev.target || globalThis; fireOn(globalThis, ev); return true; });
  if (typeof URL !== 'undefined' && !URL.createObjectURL) URL.createObjectURL = () => 'blob:fake';
  if (typeof URL !== 'undefined' && !URL.revokeObjectURL) URL.revokeObjectURL = () => {};
}

/* ======================================================================= */
/* the run                                                                  */
/* ======================================================================= */

const results = [];      // { name, ok, err }
function report(name, err) {
  if (!err) { results.push({ name, ok: true }); console.log('ok ' + name); return; }
  const stack = String((err && err.stack) || '').split('\n').map(s => s.trim()).filter(s => /^at /.test(s));
  const top = stack.find(s => s.indexOf('uismoke.js') < 0) || stack[0] || '';
  results.push({ name, ok: false, err });
  console.log('FAIL ' + name + ': ' + (err && err.name ? err.name + ': ' : '') + (err && err.message ? err.message : String(err)) + (top ? '\n     ' + top : ''));
}
function wanted(name) { return !ONLY || ONLY === name; }

function scriptsOf(html) {
  const list = []; const re = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi; let m;
  while ((m = re.exec(html))) list.push(m[1].replace(/^\.\//, '').split('?')[0]);
  return list;
}

function main() {
  const indexPath = path.join(ROOT, 'index.html');
  if (!fs.existsSync(indexPath)) { console.log('FAIL index.html does not exist'); process.exit(1); }
  const html = fs.readFileSync(indexPath, 'utf8');
  installGlobals();
  buildBody(html);

  /* 1. load every script of index.html, in order */
  const missing = [];
  let loadFailed = false;
  for (const rel of scriptsOf(html)) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) { missing.push(rel); continue; }
    try { vm.runInThisContext(fs.readFileSync(abs, 'utf8'), { filename: rel }); }
    catch (e) { loadFailed = true; report('load ' + rel, e); }
    if (rel === 'js/core/sb.js' && globalThis.SB && globalThis.SB.log) globalThis.SB.log.echo = false;
  }
  if (missing.length) console.log('note: ' + missing.length + ' file(s) of index.html do not exist yet, skipped: ' + missing.join(', '));
  const SB = globalThis.SB;
  if (!SB || !SB.UI || typeof SB.UI.go !== 'function') { report('shell', new Error('SB.UI.go is not defined: js/ui/app.js did not load')); return finish(); }
  SB.log.echo = false;
  const missingApi = SB.verify(['engine', 'cities', 'art', 'ui']);
  if (missingApi.length) console.log('note: SB.verify reports ' + missingApi.length + ' missing: ' + missingApi.slice(0, 12).join(', ') + (missingApi.length > 12 ? ', …' : '') + ' (booting with ?dev)');

  /* 2. pre-load the Pensacola pack, as the injected script tag would */
  const pack = 'js/cities/packs/pensacola.js';
  try { vm.runInThisContext(fs.readFileSync(path.join(ROOT, pack), 'utf8'), { filename: pack }); }
  catch (e) { report('load ' + pack, e); return finish(); }

  /* 3. boot: DOMContentLoaded */
  const errorsBefore = () => SB.log.entries.filter(e => e.level === 'error' && /^SB\.UI/.test(e.where)).length;
  if (wanted('shell') || !ONLY) {
    try {
      fakeDocument.readyState = 'interactive';
      fakeDocument.dispatchEvent(new FakeEvent('DOMContentLoaded'));
      const main = fakeDocument.getElementById('main');
      if (!main || !main.childNodes.length) throw new Error('boot left #main empty');
      if (errorsBefore()) throw new Error('boot logged: ' + SB.log.entries.filter(e => e.level === 'error').map(e => e.message).join(' | '));
      report('shell boot (' + (SB.UI.screens.start ? 'start screen' : 'placeholder for start') + ')');
    } catch (e) { report('shell boot', e); }
  } else {
    fakeDocument.readyState = 'interactive';
    fakeDocument.dispatchEvent(new FakeEvent('DOMContentLoaded'));
  }

  /* 4. a new game through the calls the start screen makes */
  let state = null;
  try {
    SB.Cities.load('pensacola', function (err) { if (err) throw err; });
    const opts = { seed: 'pensacola-' + Date.now().toString(36), citySlug: 'pensacola', bookingName: 'Carport Weather Collective',
                   mark: { v: 1, seed: 'uismoke' }, settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tune: null };
    state = SB.Game.newGame(opts);
    /* Act I (js/ui/story.js): the going-away show plays before the desk appears; skip through it and the two that
       follow on the desk; then the walkthrough's tape is on the phone and its text is on a strip and in the inbox */
    const cut = () => fakeDocument.querySelector('.cs-root');
    const skipCut = () => { const b = cut() && cut().querySelector('.cs-skip'); if (!b) throw new Error('the cutscene has no skip button'); b.click(); };
    let sat = false, played = [];
    if (SB.UI.story && SB.UI.story.opening && SB.Cutscene) {
      if (!state.story.tutorial.on || state.story.tutorial.step !== 'ANSWER') throw new Error('a new game did not start the walkthrough');
      SB.UI.story.opening(state, function () { sat = true; SB.UI.start(state); });
      if (!cut()) throw new Error('the opening cutscene did not play');
      if (sat || SB.UI.game()) throw new Error('the desk appeared before the opening cutscene was over');
      if (fakeDocument.querySelectorAll('.cs-root').length !== 1) throw new Error('two cutscenes at once');
      skipCut();
      if (!sat) throw new Error('skipping the opening cutscene did not sit the player down');
      if (state.story.seen.indexOf('GOING_AWAY_open') < 0) throw new Error('GOING_AWAY_open was not marked seen');
      played.push('GOING_AWAY_open');
      for (let i = 0; i < 8 && cut(); i++) {
        if (fakeDocument.querySelectorAll('.cs-root').length !== 1) throw new Error('two cutscenes at once');
        const nq = SB.Chapters.nextCutscene(state);   // the queue's, or the outgoing booker's call for the step (js/ui/story.js coach)
        played.push(nq ? nq.key : 'TUT_' + SB.Tutorial.current(state).step + '_' + SB.Tutorial.current(state).stage);
        skipCut();
      }
      if (cut() || SB.Chapters.nextCutscene(state)) throw new Error('the cutscene queue did not empty: ' + JSON.stringify(state.story.cutscenes.map(c => c.key)));
      const tape = fakeDocument.querySelector('#desk .dk-hit[data-obj="phone"][data-taped]');
      if (!tape) throw new Error('no tape on the phone for the first step (taped: ' + fakeDocument.querySelectorAll('.sy-tape').map(t => t.getAttribute('data-for')).join(',') + ')');
      if (fakeDocument.querySelectorAll('.sy-tape').length !== 1) throw new Error('more than one tape on the page');
      const stripText = (fakeDocument.querySelector('.sy-strip') || { textContent: '' }).textContent;
      if (!/\S/.test(stripText) || /\{|\}|  /.test(stripText)) throw new Error('the walkthrough strip is empty or has a hole in it: "' + stripText + '"');
      if (!fakeDocument.querySelector('#desk .dk-hit[data-obj="jacket"]')) throw new Error('the desk has no jacket');
      SB.UI.go('inbox');
      if (!fakeDocument.querySelector('#main .sy-dana .ph-bub')) throw new Error('the phone does not show the walkthrough text');
      if (fakeDocument.querySelector('.sy-strip')) throw new Error('the desk strip stayed up with the phone open');
      SB.UI.go('notebook', { page: 'CHAPTERS' });
      if (!fakeDocument.querySelector('#main .sy-chapter .sy-watch')) throw new Error('the chapters list has nothing to watch again');
      SB.UI.go('jacket');
      if (fakeDocument.querySelectorAll('#main .sy-patch').length !== SB.Patches.all(state).length) throw new Error('the jacket does not show every patch');
      SB.UI.go('desk');
      /* the other start: "I've done this before" */
      const st2 = SB.Game.newGame(Object.assign({}, opts, { seed: opts.seed + '-skip', tutorial: false }));
      if (st2.story.tutorial.on || !st2.story.tutorial.skipped || !st2.patches.SKIPPED_TUTORIAL) throw new Error('opts.tutorial === false did not skip the walkthrough');
      if (wanted('shell') || wanted('story')) report('story (' + played.join(', ') + '; tape on the phone)');
    } else SB.UI.start(state);
    if (SB.UI.game() !== state) throw new Error('SB.UI.game() is not the started state');
    const desk = fakeDocument.getElementById('desk');
    if (!desk || desk.hidden || !desk.childNodes.length) throw new Error('the desk did not render after SB.UI.start');
    if (!desk.querySelector('.dk-hit[data-obj="lamp"]')) throw new Error('the desk has no lamp to pull');
    const n = errorsBefore();
    if (n) throw new Error(SB.log.entries.filter(e => e.level === 'error').map(e => e.where + ': ' + e.message).join(' | '));
    if (wanted('shell')) report('shell start (week ' + (state.clock.week + 1) + ', ' + state.clock.phase + ')');
    if (DUMP) ['desk', 'main'].forEach(id => console.log('dump #' + id + ': ' + fakeDocument.getElementById(id).textContent.replace(/\s+/g, ' ').slice(0, 600)));
  } catch (e) { report('new game', e); return finish(); }

  /* a show to point routes at: the first live one, or a draft the player starts (Shows.create own) */
  function firstId(table) { const t = state[table] || {}; return Object.keys(t)[0] || null; }
  let showId = firstId('shows');
  if (!showId) {
    try {
      const r = SB.UI.act(s => SB.Shows.create(s, { own: true, day: s.clock.day + 21, tags: [], benefitFor: null }));
      if (r && r.ok) showId = r.showId;
    } catch (e) { /* the screens get null */ }
  }
  const messages = (state.mail && state.mail.messages) || [];
  const params = {
    start: {}, city: {}, tune: { slug: 'pensacola' }, name: {}, setup: {}, week: {}, close: {},
    inbox: { messageId: messages.length ? messages[messages.length - 1].id : null }, shows: {}, show: { showId }, bill: { showId },
    money: {}, settings: {}, night: { showId }, bands: {}, band: { bandId: firstId('bands') }, notebook: {}, rooms: {},
    room: { roomId: firstId('rooms') }, people: {}, town: {}, legacy: {}, flyerdesk: { showId }
  };

  /* 5. every registered screen, mounted once into a fresh root, then update and unmount */
  const names = Object.keys(SB.UI.screens);
  if (!names.length) console.log('note: no screen is registered yet');
  for (const name of names) {
    if (!wanted(name)) continue;
    const root = fakeDocument.createElement('main');
    fakeDocument.body.appendChild(root);
    const before = errorsBefore();
    try {
      const hooks = SB.UI.screens[name].mount(root, Object.assign({}, params[name] || {})) || {};
      if (typeof hooks.update === 'function') hooks.update();
      if (typeof hooks.unmount === 'function') hooks.unmount();
      if (errorsBefore() > before) throw new Error(SB.log.entries.filter(e => e.level === 'error').slice(-1).map(e => e.where + ': ' + e.message)[0]);
      report(name);
    } catch (e) { report(name, e); }
    root.remove();
  }
  /* and through the shell, once, so go() and the placeholder are exercised */
  if (wanted('shell')) {
    try {
      SB.UI.go('no-such-route', { x: 1 });
      const ph = fakeDocument.getElementById('main').querySelector('.sb-placeholder');
      if (!ph) throw new Error('an unregistered route did not show the placeholder card');
      SB.UI.back();
      report('shell placeholder');
    } catch (e) { report('shell placeholder', e); }
  }

  /* the corner clock (#nightclock) holds the one CALL IT A NIGHT: a new game sits down at its first evening; pressing the
     tape deck only nudges the clock; its button calls it a night (Week.endNight) and the night plays out; the deck then
     pauses ('sb-play' { cmd: 'pause' }); 'next' plays the night out in one go, to the next stop */
  if (wanted('shell')) {
    try {
      const lamp = () => fakeDocument.querySelector('#desk .dk-hit[data-obj="lamp"]');
      SB.UI.go('desk');
      const btn = lamp();
      if (!btn) throw new Error('no lamp on the desk');
      const stop = () => state.clock.stop ? state.clock.stop.kind : 'none';
      if (stop() !== 'EVENING') throw new Error('the game is not at an evening at the desk (stop ' + stop() + ', phase ' + state.clock.phase + ')');
      const nc = fakeDocument.getElementById('nightclock');
      if (!nc || nc.hidden || !nc.querySelector('.ck-ruler')) throw new Error('no clock in the corner at an evening');
      if (SB.UI.lamp.label().key !== 'night') throw new Error('the tape deck does not offer a night at an evening: ' + JSON.stringify(SB.UI.lamp.label()));
      const day0 = state.clock.day;
      btn.click();
      if (stop() !== 'EVENING') throw new Error('pressing the tape deck at an evening should only nudge the clock (stop ' + stop() + ')');
      const call = nc.querySelector('.ck-call');
      if (!call) throw new Error('no CALL IT A NIGHT button on the corner clock');
      call.click();
      if (stop() === 'EVENING') throw new Error('the clock\'s button did not call it a night');
      if (!SB.UI.playing()) throw new Error('SB.UI.playing() is false after calling it a night');
      let heard = null;
      fakeDocument.addEventListener('sb-play', e => { heard = e.detail && e.detail.cmd; });
      lamp().click();
      if (heard !== 'pause' || SB.UI.playing()) throw new Error('Pause did not send sb-play { cmd: pause }');
      SB.UI.fire('sb-play', { cmd: 'next' });
      if (stop() === 'none') throw new Error('the night played out to no stop');
      report('shell lamp (call it a night from the clock, pause, played out from day ' + day0 + ' to day ' + state.clock.day + ' ' + stop() + ')');
    } catch (e) { report('shell play', e); }
  }

  /* 6. every part */
  const partArgs = {
    yearPage: () => [{ year: 1, week: state.clock.week, shows: [], lines: [] }],     // SPEC?: a stub recap; no year has passed
    flyerThumb: () => [{ recipe: null, spec: showId ? SB.Jobs.flyerSpec(state, showId) : null }, 120]
  };
  for (const name of Object.keys(SB.UI.parts)) {
    if (!wanted(name)) continue;
    try {
      const args = partArgs[name] ? partArgs[name]() : [];
      const el = SB.UI.parts[name].apply(null, args);
      if (!el || typeof el !== 'object' || !el.nodeType) throw new Error('part ' + name + ' returned no element');
      report('part ' + name);
    } catch (e) { report('part ' + name, e); }
  }

  /* 7. the shared components, with small props, and a LogCard for every record type */
  if (wanted('C')) {
    const C = SB.UI.C, E = SB.Enums;
    const range = { lo90: 10, lo50: 14, hi50: 20, hi90: 26, conf: 2, text: '10–26', known: false };
    const job = { id: 'j1', type: 'MAKE_FLYER', label: 'Make the flyer', why: 'People need to see it.', hours: 2, status: 'TODO', showId,
                  window: { state: 'OPEN', opens: 3, idealUntil: 8, lateFrom: 9, missedAt: 14, label: 'open' }, riders: [
                    { id: 'j2', label: 'Meal for the band', hours: 1, status: 'TODO', cost: { lo: 20, hi: 30 }, text: 'They will remember.' }],
                  opt: { kind: 'PRINT_RUN', chosen: null, choices: [{ key: 'SMALL', label: '100 copies', cost: 12, chips: [], enabled: true }] },
                  helperOk: true, planned: null };
    const samples = {
      Button: { label: 'Go' }, Empty: {}, Select: { label: 'x', value: 'a', options: [{ value: 'a', label: 'A' }] }, Toggle: { label: 't', on: true },
      Tooltip: { text: 'tip', children: 'x' }, Tabs: { tabs: [{ key: 'a', label: 'A', badge: 2 }], active: 'a' },
      Table: { columns: [{ key: 'a', label: 'A' }, { key: 'b', label: 'B', num: true }], rows: [{ a: 'x', b: 3 }] },
      GenGlyph: { gen: 1 }, GenreTag: { genre: 'hardcore', arrow: 'UP' }, BandMark: { band: state.bands[firstId('bands')] || { name: 'x' } },
      PersonStamp: { person: state.people[firstId('people')] || {} }, RoomDrawing: { room: state.rooms[firstId('rooms')] || {} },
      RoomGlyph: { kind: 'HOUSE' }, BookerMark: { name: 'Carport Weather Collective', mark: { v: 1, seed: 'x' } },
      CityStamp: { entry: SB.Cities.entry('pensacola') }, Money: { amount: -40, signed: true },
      CostChip: { chip: { k: 'MONEY', v: [-10, -5] } }, RangeBar: { view: range, axisMax: 40, label: 'draw', key: 'k1' },
      FiveWord: { cell: { key: 'x', conf: 2, dir: 1, word: null, smear: ['THIN', 'SOME'] } },
      WindowBar: { window: job.window, today: 5, planned: 7, size: 16 },
      ReachStrip: { strip: { gens: [0, 1, 2].map(() => ({ heard: { lo: .2, hi: .4 }, reachable: { lo: .4, hi: .7 }, usual: .6, missed: .1 })) } },
      ExpectationBar: { lo: 30, hi: 50, par: 40, actual: 61, cap: 55, byGen: [{ lo: 5, hi: 9, actual: 7 }, { lo: 10, hi: 20, actual: 12 }, { lo: 1, hi: 4, actual: 2 }], word: 'over' },
      DecisionCard: { decision: { id: 'd1', title: 'The van is late', body: 'They call from the road.', options: [{ id: 'A', label: 'Wait', likely: 'they make it', costs: [{ k: 'STRESS', v: 2 }], enabled: true }, { id: 'B', label: 'Move them up', enabled: false, why: 'No.' }] }, onChoose() {} },
      JobToken: { job }, JobCard: { job, people: [], onPlan() {}, onAssign() {}, onOpt() {}, onPromise() {} },
      Promises: { riders: job.riders, onToggle() {} }, PriceMenu: { opt: job.opt, onChoose() {} },
      ExposureLine: { exposure: { total: 240, lines: [{ cat: 'ROOM', amount: 100, label: 'room' }], breakEven: 30 } },
      ShowBadge: { show: showId ? state.shows[showId] : {} }, Stamp: { k: 'PACKED' }, TrustBar: { value: 55, stage: 'WORKING' },
      Comment: { comment: { id: 'c1', byName: 'Marisol', cause: 'RUNTIME', dir: -1, starred: true, text: 'Too long.', noteKey: 'RUNTIME|HOUSE' }, onNote() {} },
      Ledger: { rows: [{ col: 'PAR', label: 'Par', d: 40 }, { col: 'YOURS', label: 'posters', d: 6 }, { col: 'HIDDEN', label: 'band', d: -3 }, { col: 'TOTAL', label: 'total', d: 43 }] },
      ShowResult: { show: { id: 's0', roomId: firstId('rooms'), result: { heads: 43, paid: 40, byGen: [10, 25, 8], par: { heads: 40 }, call: { lo: 30, hi: 50 }, vsPar: 'ABOUT', verdictLine: 'Fine.', ledger: [], luck: [{ text: 'It rained.' }], comments: [], learned: [{ text: 'Kids came.' }], playerNet: 35, door: { gross: 280, price: 7 } } } },
      Envelope: { view: { door: { paid: 40, price: 7, gross: 280, hat: 0 }, lines: [], gap: 0, shortfall: [], left: 100, split: { custom: [50, 25, 25], keepMax: 100, fairMax: 40 } }, lines: [{ k: 'ROOM', label: 'the room', amount: 50, running: 230 }], onChoose() {} },
      MessageBody: { message: { fromName: 'Someone', subject: 'swap?', body: 'hey', day: 3 }, signals: [{ key: 'x', text: 'dates clear', good: true }] },
      Composer: { text: 'We can do the 12th.', toggles: [{ key: 'meal', label: 'Offer a meal', on: false, onChange() {} }], onSend() {}, exposure: { total: 100, lines: [], breakEven: null } },
      MiniMonth: { fromDay: 10, days: 21, cells: [{ day: 12, marks: ['clash'] }], onPick() {} },
      HoldStack: { cell: { day: 12, label: 'held', holds: [{ by: 'p1', byName: 'Other', state: 'SOFT', rank: 1, expiresIn: 3, mine: false }] }, onHold() {}, onChallenge() {}, onAsk() {} },
      Sparkline: { points: [{ v: 3, observed: true }, { v: 5, observed: true }, { v: 4, observed: false }] }
    };
    const failed = [];
    Object.keys(C).forEach(name => {
      if (typeof C[name] !== 'function') return;
      try { const el = C[name](samples[name] || {}); if (el !== null && (!el || !el.nodeType)) throw new Error('returned no element'); }
      catch (e) { failed.push(name); report('C.' + name, e); }
    });
    Object.keys(E.REC).forEach(t => {
      try { const el = C.LogCard({ record: { t, day: 3, half: 'DAY', text: '', refs: {}, chips: [], from: { lo: 1, hi: 9 }, to: { lo: 3, hi: 6 }, key: 'k', learned: { text: 'x', key: 'k' }, opens: ['a'] } }); if (!el || !el.nodeType) throw new Error('no element'); }
      catch (e) { failed.push('LogCard ' + t); report('C.LogCard(' + t + ')', e); }
    });
    if (!failed.length) report('components (' + Object.keys(C).length + ' plus a LogCard for each of ' + Object.keys(E.REC).length + ' record types)');
  }

  /* 8. the guided first show, all ten steps, through the interface (test/tutorial-walk.js): a new game, every click on
   *    the thing the tape points at, time moved with the tape deck, through the night, settle and the close-out */
  if (wanted('tutorial')) {
    let where = 'start';
    try {
      vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'tutorial-walk.js'), 'utf8'), { filename: 'test/tutorial-walk.js' });
      SB.UI.go('desk');
      if (SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause' });
      const st = SB.Game.newGame({ seed: 'pensacola-tutshots', citySlug: 'pensacola', bookingName: 'Extension Cord Booking', mark: { v: 1, seed: 'tutshots' },
                                   settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tune: null, tutorial: true });
      SB.UI.story.opening(st, function () { SB.UI.start(st); });
      for (let i = 0; i < 12 && fakeDocument.querySelector('.cs-root'); i++) fakeDocument.querySelector('.cs-root .cs-skip').click();
      if (SB.UI.game() !== st || fakeDocument.querySelector('.cs-root')) throw new Error('the new game did not reach the desk');
      /* the timers that are waiting (the fake DOM's never fire by themselves): short ones only, a few rounds */
      const flush = (rounds) => {
        for (let r = 0; r < (rounds || 400) && timers.length; r++) {
          const batch = timers.splice(0);
          batch.forEach(t => { if (!t.every && (t.ms || 0) <= 5000) t.fn(); });
        }
        SB.UI.story.pump();       // in a browser a MutationObserver moves the tape after a timed redraw; the fake DOM has none
      };
      timers.length = 0;
      const env = {
        flush,
        /* calling it a night plays the night out by itself, on timers, to the next evening; the step moves on within a
           few nights (cards that come up on the way are answered "later") */
        autoPause(lampSel) {
          const before = walk.at(), day0 = st.clock.day, live = sel => Array.from(fakeDocument.querySelectorAll(sel)).filter(e => !e.closest('.is-leaving'))[0];
          for (let n = 0; n < 24 && walk.at() === before; n++) {
            const c = live('#overlay .sb-decision') || live('#overlay .cc-slap');
            if (c) { const bs = Array.from(c.querySelectorAll('button')).filter(b => !b.disabled); (bs.filter(b => /^\s*\d*\s*(later|keep waiting|close)\b/i.test(b.textContent))[0] || bs[0]).click(); continue; }
            if (!(st.clock.stop && st.clock.stop.kind === 'EVENING')) { SB.UI.fire('sb-play', { cmd: 'next' }); continue; }
            fakeDocument.querySelector(lampSel).click();
            if (!SB.UI.playing()) throw new Error('calling it a night did not play the night out');
            for (let i = 0; i < 80 && SB.UI.playing() && !live('#overlay .cc-slap'); i++) flush(1);
            if (SB.UI.playing() && !live('#overlay .cc-slap')) throw new Error('the night never stopped');
            if (st.clock.stop && st.clock.stop.kind === 'END_OF_WEEK') throw new Error('the nights ran from day ' + day0 + ' to the end of the week, past the moment ' + before + ' was done');
          }
          if (walk.at() === before) throw new Error('the nights went by from day ' + day0 + ' to ' + st.clock.day + ' without the step moving on (' + before + ')');
        }
      };
      const walk = SBTutorialWalk(env);
      for (const p of walk.phases) { where = p.name; flush(); p.run(); if (VERBOSE) console.log('   ' + walk.log[walk.log.length - 1]); }
      const warns = SB.log.entries.filter(e => e.level === 'error' && /^SB\.UI/.test(e.where));
      if (warns.length) throw new Error(warns.map(e => e.where + ': ' + e.message).join(' | '));
      /* the guided start fills the desk in show by show, and the friend who handed it over did the chores (SB.Rungs) */
      where = 'ladder';
      const mentor = SB.Rungs.mentor(st), byMentor = Object.keys(st.jobs).map(k => st.jobs[k]).filter(j => j.status === 'DONE' && j.by === mentor);
      const onDesk = Array.from(fakeDocument.querySelectorAll('[data-obj]')).map(e => e.getAttribute('data-obj'));
      if (VERBOSE) console.log('   jobs: ' + Object.keys(st.jobs).map(k => st.jobs[k]).map(j => j.type + ':' + j.status + ':' + (j.by || '') + ':' + j.doneDay + ':' + (st.shows[j.showId] ? st.shows[j.showId].day : '')).join(' '));
      if (!st.settings.ladder) throw new Error('a guided start has no ladder');
      if (SB.Rungs.rung(st) !== 1) throw new Error('after one show the rung is ' + SB.Rungs.rung(st));
      if (!mentor || byMentor.length < 3) throw new Error('the friend did ' + byMentor.length + ' jobs');
      const lock = Object.keys(st.jobs).map(k => st.jobs[k]).filter(j => j.type === 'LOCK_BILL' && j.showId)[0], adv = Object.keys(st.jobs).map(k => st.jobs[k]).filter(j => j.type === 'ADVANCE' && j.showId)[0];
      if (!lock || lock.status !== 'DONE' || !adv || adv.status !== 'DONE') throw new Error('the first show: bill lock ' + (lock && lock.status) + ', advance ' + (adv && adv.status));
      if (st.player.dayJob !== 'FULL') throw new Error('a guided start works its shifts from day one, got ' + st.player.dayJob);
      if (onDesk.length && (onDesk.indexOf('notebook') < 0 || onDesk.indexOf('tin') >= 0)) throw new Error('desk after one show: ' + onDesk.join(','));
      report('tutorial (ten steps by the tape; ' + walk.log[walk.log.length - 2] + '; friend did ' + byMentor.map(j => j.type).join(' ') + '; desk ' + onDesk.join(',') + ')');
    } catch (e) { report('tutorial, at "' + where + '"', e); }
  }

  if (VERBOSE) {
    const warns = SB.log.entries.filter(e => e.level === 'warn');
    console.log('note: ' + warns.length + ' warnings logged'); warns.slice(0, 30).forEach(w => console.log('  warn ' + w.where + ': ' + w.message));
  }
  return finish();
}

function finish() {
  const bad = results.filter(r => !r.ok);
  console.log((bad.length ? 'FAILED ' : 'passed ') + (results.length - bad.length) + ' of ' + results.length + (ONLY ? ' (only ' + ONLY + ')' : ''));
  process.exit(bad.length ? 1 : 0);
}

main();
