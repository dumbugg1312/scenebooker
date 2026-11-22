/* Scene Booker — ui/tooltip.js (WIRING)
 * Just-in-time info: rest the mouse on something for a moment and a slip of paper turns up by the pointer saying
 * what it is and what it does. Holds no game rule.
 * The words, in order: data-tip (written for the box: "what it's for"), then the control's aria-label, then title.
 * A label that only repeats the words already printed on the thing is not shown. data-tip-head (optional) is the
 * slip's first line, set in the gothic letters.
 * Mouse only (no touch: a tap is a press), never while a button is held, gone on any press, key, scroll or leave.
 */
(function (SB) {
  'use strict';

  var DELAY = 550, GAP = 16;
  var tipEl = null, timer = null, at = null, lastX = 0, lastY = 0, held = false;
  var SEL = '[data-tip], button[aria-label], a[aria-label], [role="button"][aria-label], [role="tab"][aria-label], input[aria-label], select[aria-label], [title]';

  function doc() { return typeof document !== 'undefined' ? document : null; }
  function norm(t) { return String(t || '').replace(/\s+/g, ' ').trim().toLowerCase(); }

  /* the words for el, or '' when it has nothing to add */
  function words(el) {
    var tip = el.getAttribute('data-tip'), lab = el.getAttribute('aria-label'), ttl = el.getAttribute('data-sb-title') || el.getAttribute('title'),
        seen = norm(el.innerText || el.textContent || el.value || ''), t = tip || lab || ttl || '';
    if (!t) return '';
    if (!tip && (norm(t) === seen || (seen && seen.length > 3 && norm(t).length <= seen.length + 2 && seen.indexOf(norm(t)) >= 0))) return '';
    return String(t);
  }

  function hide() {
    if (timer) { clearTimeout(timer); timer = null; }
    if (at && at.getAttribute && at.getAttribute('data-sb-title') != null) { at.setAttribute('title', at.getAttribute('data-sb-title')); at.removeAttribute('data-sb-title'); }
    at = null;
    if (tipEl) tipEl.hidden = true;
  }

  function place() {
    var W = window.innerWidth, H = window.innerHeight, r, x, y;
    if (!tipEl || tipEl.hidden) return;
    r = tipEl.getBoundingClientRect();
    x = lastX + GAP; y = lastY + GAP + 6;
    if (x + r.width > W - 8) x = lastX - GAP - r.width;
    if (y + r.height > H - 8) y = lastY - GAP - r.height;
    tipEl.style.left = Math.max(8, Math.round(x)) + 'px';
    tipEl.style.top = Math.max(8, Math.round(y)) + 'px';
  }

  function show(el) {
    var d = doc(), t = words(el), head = el.getAttribute('data-tip-head') || '', kids = [];
    if (!t || !d || !d.body || !el.isConnected) return;
    if (!tipEl) {
      tipEl = d.createElement('div');
      tipEl.className = 'sb-tip';
      tipEl.setAttribute('role', 'tooltip');
      tipEl.setAttribute('aria-hidden', 'true');          // screen readers already read the label on the thing
      d.body.appendChild(tipEl);
    }
    tipEl.textContent = '';
    if (head) kids.push(['b', 'sb-tip-head', head]);
    String(t).split('\n').forEach(function (line) { if (line.trim()) kids.push(['span', 'sb-tip-line', line]); });
    kids.forEach(function (k) { var e = d.createElement(k[0]); e.className = k[1]; e.textContent = k[2]; tipEl.appendChild(e); });
    tipEl.hidden = false;
    place();
  }

  function over(ev) {
    var el = ev.target && ev.target.closest ? ev.target.closest(SEL) : null;
    if (ev.pointerType && ev.pointerType !== 'mouse') return;
    lastX = ev.clientX; lastY = ev.clientY;
    if (el === at) return;
    hide();
    if (!el || held || el.closest('.sb-tip')) return;
    at = el;
    /* the browser's own title box would turn up too: hold the title aside while we are on it */
    if (el.hasAttribute('title')) { el.setAttribute('data-sb-title', el.getAttribute('title')); el.removeAttribute('title'); }
    timer = setTimeout(function () { timer = null; if (at === el) show(el); }, DELAY);
  }

  function move(ev) {
    if (ev.pointerType && ev.pointerType !== 'mouse') return;
    lastX = ev.clientX; lastY = ev.clientY;
    if (tipEl && !tipEl.hidden) place();
  }

  function start() {
    var d = doc();
    if (!d || !d.addEventListener || typeof window === 'undefined') return;
    d.addEventListener('pointerover', over, true);
    d.addEventListener('pointermove', move, true);
    d.addEventListener('pointerdown', function () { held = true; hide(); }, true);
    d.addEventListener('pointerup', function () { held = false; }, true);
    d.addEventListener('pointercancel', function () { held = false; }, true);
    /* only leaving the target (or the window) hides it: crossing a child inside it does not */
    d.addEventListener('pointerleave', function (ev) {
      if (at && at.contains && at.contains(ev.target) && (ev.target !== at || (ev.relatedTarget && at.contains(ev.relatedTarget)))) return;
      hide();
    }, true);
    d.addEventListener('keydown', hide, true);
    d.addEventListener('scroll', hide, true);
    window.addEventListener('blur', hide);
    /* the screen changed under the pointer: whatever it was on may be gone */
    if (typeof MutationObserver === 'function') new MutationObserver(function () { if (at && !at.isConnected) hide(); }).observe(d.body || d.documentElement, { childList: true, subtree: true });
  }

  SB.UI = SB.UI || {};
  SB.UI.tooltip = { hide: hide };
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  }
})(SB);
