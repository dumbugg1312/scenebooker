/* Scene Booker — ui/words.js (WIRING)
 * Tap-to-define: booking words on screen (door deal, guarantee, settle, the bill, TBA...) get a dotted underline.
 * Tap or click one and a sticky note says what it means, in plain words. The first time a player meets a word, the
 * note opens by itself, once. Every word met lands in the notebook's HOW page (SB.Notebook.seeTerm).
 * Holds no game rule. The words are the glossary in js/content/strings.js; ALIASES below are the ways they are
 * written on screen. Asked for 2026-11-21: "where would a middle schooler get stuck ... just-in-time info".
 * Only the first time a word shows on a screen is marked, so the page doesn't turn into a sea of underlines.
 * Never inside buttons, links, fields or a playing cutscene (the cutscene types its words out letter by letter).
 */
(function (SB) {
  'use strict';

  SB.Content.ui.words = { more: 'more', gotIt: 'got it', label: 'What "{term}" means' };

  /* how each glossary word is written on screen (lowercase; matched as whole words, any case) */
  var ALIASES = {
    guarantee: ['guarantee', 'guaranteed', 'guarantees'],
    doorDeal: ['door deal', 'cut of the door', 'share of the door', 'door split'],
    versus: ['versus'],
    hat: ['gas money', 'donation door'],
    hold: ['hold', 'on hold', 'held'],
    challenge: ['challenge'],
    confirm: ['confirm', 'confirmed'],
    advance: ['advance', 'advanced', 'advancing'],
    loadIn: ['load-in', 'load in'],
    backline: ['backline'],
    changeover: ['changeover', 'changeovers'],
    offTheTop: ['off the top'],
    settle: ['settle', 'settle up', 'settling', 'pay out'],
    comps: ['comps', 'comped'],
    listings: ['listings'],
    allAges: ['all ages', 'all-ages'],
    matinee: ['matinee'],
    regulars: ['regulars'],
    cashBox: ['cash box'],
    theUsual: ['the usual'],
    exposure: ['exposure'],
    deposit: ['deposit', 'deposits'],
    handshake: ['handshake'],
    bill: ['the bill', 'on the bill'],
    opener: ['opener', 'opening slot'],
    headliner: ['headliner', 'headline'],
    touring: ['touring band', 'touring'],
    draw: ['draw', 'they draw'],
    theDoor: ['the door'],
    flatFee: ['flat fee'],
    counter: ['counter', 'countered', 'counter-offer'],
    tba: ['tba'],
    pa: ['pa'],
    promo: ['promo'],
    callItANight: ['call it a night']
  };
  /* PA and TBA only count in capitals ("pa" is not a word, but "Pa" can be a name) */
  var CAPS = { pa: 1, tba: 1 };
  /* words that are also plain English ("draw a crowd", "hold on"): marked only inside the booking card (the clipboard) and
     the phone's asks, never in running text elsewhere. The tight ones above (door deal, off the top, load-in...) go everywhere */
  var LOOSE = { guarantee: 1, versus: 1, hold: 1, challenge: 1, confirm: 1, advance: 1, settle: 1, listings: 1, regulars: 1, exposure: 1,
                deposit: 1, handshake: 1, bill: 1, opener: 1, headliner: 1, touring: 1, draw: 1, theDoor: 1, counter: 1, promo: 1,
                theUsual: 1, callItANight: 1 };
  var BOOKING = '.cu--clipboard,.cu--phone,.sy-dana';

  var SKIP = 'script,style,svg,canvas,button,a,input,textarea,select,option,label,[role="button"],[role="tab"],[role="menuitem"],' +
             '[contenteditable="true"],[data-term],[data-no-terms],.wd-note,.sb-tip,.cs-root,[aria-hidden="true"]';
  var RE = null, BY = {}, note = null, noteFor = null, busy = false, queued = false, autoShown = {};

  function doc() { return typeof document !== 'undefined' ? document : null; }
  function L(key, ctx) { return SB.text.label('ui.words.' + key, ctx); }
  function gloss() { var S = SB.Content && SB.Content.strings; return (S && S.glossary) || {}; }
  function game() { return SB.UI && SB.UI.game ? SB.UI.game() : null; }

  function build() {
    var g = gloss(), list = [], k;
    for (k in ALIASES) {
      if (!g[k]) continue;
      ALIASES[k].forEach(function (a) { BY[a] = k; list.push(a); });
    }
    list.sort(function (a, b) { return b.length - a.length; });
    RE = list.length ? new RegExp('(^|[^A-Za-z0-9\'-])(' + list.map(function (a) { return a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')(?![A-Za-z0-9-])', 'gi') : null;
  }

  /* the glossary key for a matched piece of text, or null when it does not count */
  function keyOf(txt) {
    var k = BY[String(txt).toLowerCase()];
    if (!k) return null;
    if (CAPS[k] && txt !== txt.toUpperCase()) return null;
    return k;
  }
  /* may this word be marked where it stands? */
  function allowed(k, el) { return !LOOSE[k] || !!(el && el.closest && el.closest(BOOKING)); }

  /* ---------------- marking words ---------------- */

  function present(root, k) { return !!root.querySelector('[data-term="' + k + '"]'); }

  function mark(root) {
    var d = doc(), walker, n, nodes = [], i, m, k, t, before, word, span, after, done = {}, idx;
    if (!RE || !root || !d) return;
    walker = d.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */, {
      acceptNode: function (x) {
        var p = x.parentElement;
        if (!x.nodeValue || x.nodeValue.length < 2 || !p) return 2;
        if (p.closest(SKIP)) return 2;
        return 1;
      }
    });
    while ((n = walker.nextNode())) nodes.push(n);
    for (i = 0; i < nodes.length; i++) {
      t = nodes[i];
      /* a text node can hold several words: walk its matches and mark the ones not marked yet. Nothing is split
         unless a word is marked, so a pass that finds nothing new changes nothing (and wakes no observer) */
      RE.lastIndex = 0;
      while (t && t.nodeValue && (m = RE.exec(t.nodeValue))) {
        idx = m.index + m[1].length; word = m[2]; k = keyOf(word);
        if (!k || done[k] || !allowed(k, t.parentElement) || present(root, k)) { RE.lastIndex = idx + word.length; continue; }
        done[k] = 1;
        before = t; t = before.splitText(idx); after = t.splitText(word.length);
        span = d.createElement('span');
        span.className = 'wd-term';
        span.setAttribute('data-term', k);
        span.setAttribute('tabindex', '0');
        span.setAttribute('role', 'button');
        span.setAttribute('aria-label', L('label', { term: word }));
        /* resting the mouse on the word: the game's slip says what it means, not "What X means" */
        if (gloss()[k] && gloss()[k].short) span.setAttribute('data-tip', gloss()[k].short);
        span.textContent = word;
        t.parentNode.replaceChild(span, t);
        t = after; RE.lastIndex = 0;
      }
    }
  }

  function roots() {
    var d = doc(), out = [], m;
    if (!d) return out;
    m = d.getElementById('main'); if (m) out.push(m);
    Array.prototype.forEach.call(d.querySelectorAll('.sb-scrim:not(.is-leaving), .sy-dana'), function (e) { if (out.indexOf(e) < 0 && !(m && m.contains(e))) out.push(e); });
    return out;
  }

  function scan() {
    queued = false;
    if (busy) return;
    if (!RE) build();
    busy = true;
    try { roots().forEach(mark); autoOpen(); }
    catch (e) { SB.log('warn', 'SB.UI.words', String(e && e.message)); }
    busy = false;
  }
  function soon() {
    if (queued || busy) return;
    queued = true;
    (typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout)(scan);
  }

  /* ---------------- the note ---------------- */

  function seen(k) { var s = game(); return !!(s && s.notebook && s.notebook.terms && s.notebook.terms[k] !== undefined); }
  function learn(k) {
    var s = game();
    if (!s || seen(k) || !SB.Notebook || !SB.Notebook.seeTerm || !SB.UI.act) return;
    try { SB.UI.act(function (st) { return SB.Notebook.seeTerm(st, k); }); } catch (e) { SB.log('warn', 'SB.UI.words', String(e && e.message)); }
  }

  /* the guided first show is pointing at something: no note opens by itself on top of it */
  function guided() {
    var s = game(), t = s && s.story && s.story.tutorial;
    return !!(t && t.on && !t.skipped && !t.done);
  }

  function close() {
    if (note) note.hidden = true;
    if (noteFor && noteFor.classList) noteFor.classList.remove('is-open');
    noteFor = null;
  }

  function open(el, auto) {
    var d = doc(), k = el.getAttribute('data-term'), t = gloss()[k], r, W, H, x, y, nr, body, more, h;
    if (!d || !t) return;
    if (!note) {
      note = d.createElement('div');
      note.className = 'wd-note';
      note.setAttribute('role', 'dialog');
      d.body.appendChild(note);
    }
    h = SB.UI.h;
    while (note.firstChild) note.removeChild(note.firstChild);
    note.appendChild(h('p', { class: 'wd-head', text: t.term }));
    body = h('p', { class: 'wd-short', text: t.short });
    note.appendChild(body);
    if (t.long) {
      more = h('p', { class: 'wd-long', text: t.long });
      note.appendChild(more);
    }
    note.appendChild(h('button', { type: 'button', class: 'wd-ok', text: L('gotIt'), on: { click: function (e) { e.stopPropagation(); close(); if (el.focus) el.focus(); } } }));
    note.setAttribute('aria-label', L('label', { term: t.term }));
    note.classList.toggle('is-auto', !!auto);
    note.hidden = false;
    if (noteFor && noteFor.classList) noteFor.classList.remove('is-open');
    noteFor = el; el.classList.add('is-open');
    /* under the word, kept inside the window; above it when there is no room below */
    r = el.getBoundingClientRect(); W = window.innerWidth; H = window.innerHeight;
    nr = note.getBoundingClientRect();
    x = Math.max(8, Math.min(W - nr.width - 8, r.left + r.width / 2 - nr.width / 2));
    y = r.bottom + 10;
    if (y + nr.height > H - 8) y = Math.max(8, r.top - nr.height - 10);
    note.style.left = Math.round(x) + 'px'; note.style.top = Math.round(y) + 'px';
    learn(k);
  }

  /* the first time a word is met: its note opens by itself, once, and only one at a time, only when nothing else is up */
  function autoOpen() {
    var d = doc(), els, i, el, k, r;
    if (!d || (note && !note.hidden) || !game()) return;
    if (guided()) return;
    if (SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()) return;
    if (d.body && d.body.classList.contains('nt-playing')) return;
    els = d.querySelectorAll('.wd-term[data-term]');
    for (i = 0; i < els.length; i++) {
      el = els[i]; k = el.getAttribute('data-term');
      if (seen(k) || autoShown[k]) continue;
      r = el.getBoundingClientRect();
      if (!(r.width > 0 && r.bottom > 0 && r.top < window.innerHeight && r.left < window.innerWidth)) continue;
      autoShown[k] = 1;
      open(el, true);
      return;
    }
  }

  /* ---------------- input ---------------- */

  function onClick(e) {
    var t = e.target && e.target.closest ? e.target.closest('.wd-term[data-term]') : null;
    if (t) {
      /* the word is the thing tapped: it doesn't also press the row it sits in */
      e.preventDefault(); e.stopPropagation();
      if (noteFor === t && note && !note.hidden) close(); else open(t, false);
      return;
    }
    if (note && !note.hidden && !(e.target && e.target.closest && e.target.closest('.wd-note'))) close();
  }
  function onKey(e) {
    var t = e.target && e.target.closest ? e.target.closest('.wd-term[data-term]') : null;
    if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); open(t, false); return; }
    if (e.key === 'Escape' && note && !note.hidden) { e.stopPropagation(); e.preventDefault(); close(); }
  }

  function boot() {
    var d = doc(), mo;
    if (!d || !d.body) return;
    d.addEventListener('click', onClick, true);
    d.addEventListener('keydown', onKey, true);
    if (typeof window !== 'undefined') window.addEventListener('resize', close);
    d.addEventListener('scroll', function () { if (note && !note.hidden && !note.classList.contains('is-auto')) close(); }, true);
    if (typeof MutationObserver === 'function') {
      mo = new MutationObserver(function (list) {
        var i;
        if (busy) return;
        for (i = 0; i < list.length; i++) if (!(list[i].target && list[i].target.closest && list[i].target.closest('.wd-note'))) { soon(); return; }
      });
      mo.observe(d.body, { childList: true, subtree: true, characterData: true });
    }
    soon();
  }

  SB.UI.words = { scan: scan, close: close, ALIASES: ALIASES };
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
  }
})(SB);
