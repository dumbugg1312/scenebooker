/* Scene Booker — js/ui/evening.js
 * SB.UI.evening: the rest of tonight (design/spec/12-day-activities.md). One card, opened from the pinned night clock
 * ("things to do") and from the calendar's free notes, with everything SB.Evening offers tonight in two columns, at
 * home and out. Each is a paper scrap with a photocopied picture (a real kit cut-out through the copier's toner pass),
 * what it is, what it does for you and what it takes. Pressing one does it on the spot (user, 2026-11-22: buttons act,
 * never route to the calendar): the hours come off tonight, a toast says what happened, or why not.
 *
 *   SB.UI.evening.open()    the card, for the evening that is up
 */
(function (SB) {
  'use strict';

  SB.Content.ui.evening = {
    title: 'The rest of tonight', label: 'Things to do tonight', open: 'things to do',
    openSay: 'Things to do with the rest of tonight: at home or out', note: 'Things to do tonight',
    noteSay: 'Pick something to do with the hours you have left', left: '{n} left tonight', none: 'No hours left. Staying up costs tomorrow.',
    close: 'done for now', takes: 'takes {n}', instant: 'ends tonight', cant: 'not tonight'
  };

  /* what each one is a picture of: kit roles (js/art/cutouts.js), the first that has photos wins */
  var ART = {
    JOURNAL: ['marker', 'envelope'], WORKOUT: ['road'], BED_EARLY: ['bedding', 'asleep'], POST_PAGE: ['handset', 'deskphone'],
    DIG_BANDS: ['cassette'], STICKERS: ['flyer', 'rubberstamp'], SHOW: ['crowd'], OPEN_MIC: ['singguitar', 'mic'],
    DROP_BY: ['storefront', 'house'], MARKET: ['merch', 'storefront'], FRIENDS: ['sitting', 'sofa'], SHIFT: ['carrying']
  };
  var PAPERS = ['canary', 'pink', 'blue', 'green', 'white', 'goldenrod', 'salmon', 'lilac'];

  var closeFn = null, bodyEl = null;

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(k, c) { return SB.text.label('ui.evening.' + k, c); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function game() { return safe(function () { return SB.UI.game(); }, null); }
  function cost(n) { return SB.Clock ? SB.Clock.cost(n) : String(n); }
  function res() { return Math.max(1, Math.min(2, SB.Finish && SB.Finish.res ? SB.Finish.res() : (typeof window !== 'undefined' && window.devicePixelRatio) || 1)); }

  /* ---- the picture: one real cut-out, pasted on grey, then the copier's toner pass on coloured paper ---- */
  function cutFor(type, seed) {
    var roles = ART[type] || ['standing'], list = [], i;
    for (i = 0; i < roles.length && !list.length; i++) list = (SB.Cutouts || []).filter(function (k) { return k.role === roles[i]; });
    if (!list.length) return null;
    return list[SB.rng.make('eve:' + seed).int(0, list.length - 1)];
  }
  function photo(type, seed, w, ht) {
    var d = typeof document !== 'undefined' ? document : null, cv, S = SB.Scenes, k = cutFor(type, seed), r = res();
    if (!d || !d.createElement) return null;
    cv = d.createElement('canvas'); cv.width = Math.round(w * r); cv.height = Math.round(ht * r);
    cv.className = 'ev-photo'; cv.setAttribute('aria-hidden', 'true');
    if (!k || !S || !S.paste || !S.copier || !S.loadCuts || typeof cv.getContext !== 'function') return cv;
    S.loadCuts([k.id], function () {
      safe(function () {
        var c = cv.getContext('2d'), fit = k.w / k.h > w / ht, rr = SB.rng.make('evp:' + seed);
        if (!c) return;
        c.scale(r, r);
        c.fillStyle = '#d6d6d6'; c.fillRect(0, 0, w, ht);
        S.paste(c, k.id, fit ? { x: w / 2, y: ht * 0.98, w: w * 0.96, rot: rr.range(-0.04, 0.04), border: 3, bright: 1.1, contrast: 1.2, flip: rr.chance(0.3) }
                             : { x: w / 2, y: ht * 1.02, h: ht * 0.98, rot: rr.range(-0.04, 0.04), border: 3, bright: 1.1, contrast: 1.2, flip: rr.chance(0.3) });
        S.copier(cv, { paper: PAPERS[rr.int(0, PAPERS.length - 1)], cell: Math.max(2, w / 70) * r, contrast: 1.35, bias: 0.05, seed: 'eve:' + seed });
      });
    });
    return cv;
  }

  /* ---- one scrap ---- */
  function scrap(s, v, day) {
    var t = v.hours > 0 ? cost(v.hours) : L('instant'), money = v.cost > 0 ? ' · ' + SB.text.money(v.cost) : '', b;
    b = h('button', { type: 'button', class: 'ev-item pz-hl' + (v.ok ? '' : ' is-cant'), data: { fk: 'ev-' + v.id, ev: v.id },
                      aria: { label: v.label + ', ' + t + money + '. ' + v.benefit + (v.note ? ' ' + v.note : '') + (v.ok ? '' : ' ' + (v.why || L('cant'))) },
                      on: {
                        click: function () { press(v); },
                        mouseenter: function () { if (SB.NightClock && v.ok) SB.NightClock.preview(v.hours, b); },
                        focus: function () { if (SB.NightClock && v.ok) SB.NightClock.preview(v.hours, b); },
                        mouseleave: function () { if (SB.NightClock) SB.NightClock.preview(0, b); },
                        blur: function () { if (SB.NightClock) SB.NightClock.preview(0, b); }
                      } }, [
      photo(v.type, day + ':' + v.id, 84, 68),
      h('span', { class: 'ev-txt' }, [
        h('span', { class: 'ev-label', text: v.label }),
        h('span', { class: 'ev-benefit', text: v.benefit }),
        v.note ? h('span', { class: 'ev-note', text: v.note }) : null,
        !v.ok && v.why ? h('span', { class: 'ev-why', text: v.why }) : null
      ]),
      h('span', { class: 'ev-cost', text: t + money })
    ]);
    return b;
  }

  function body(s) {
    var list = safe(function () { return SB.Evening.list(s); }, []) || [], t = safe(function () { return SB.Week.tonight(s); }, null),
        home = list.filter(function (v) { return v.where === 'HOME'; }), out = list.filter(function (v) { return v.where === 'OUT'; }), day = t ? t.day : 0;
    return h('div', { class: 'ev-body' }, [
      h('p', { class: 'ev-left', text: t && t.left > 0 ? L('left', { n: cost(t.left) }) : L('none') }),
      h('div', { class: 'ev-cols' }, [
        h('section', { class: 'ev-col', aria: { label: SB.text.label('evening.home') } }, [
          h('h3', { class: 'ev-k', text: SB.text.label('evening.home') }), home.map(function (v) { return scrap(s, v, day); })]),
        h('section', { class: 'ev-col', aria: { label: SB.text.label('evening.out') } }, [
          h('h3', { class: 'ev-k', text: SB.text.label('evening.out') }), out.map(function (v) { return scrap(s, v, day); })])
      ])
    ]);
  }

  function redraw() {
    var s = game(), nb;
    if (!bodyEl || !s) return;
    nb = body(s);
    if (bodyEl.parentNode) bodyEl.parentNode.replaceChild(nb, bodyEl);
    bodyEl = nb;
  }

  /* pressing does it now: a refusal is toasted by SB.UI.act; what happened is toasted here */
  function press(v) {
    var r = SB.UI.act(function (x) { return SB.Evening.doIt(x, v.id); });
    if (SB.NightClock) SB.NightClock.preview(0, null);
    if (!r || r.ok === false) return;
    if (r.text) SB.UI.toast(r.text, 'info');
    (r.records || []).forEach(function (x) { if (x && x.t === 'OVERTIME' && x.text) SB.UI.toast(x.text, 'info'); });
    if (SB.Sfx && SB.Sfx.play) safe(function () { SB.Sfx.play('stamp'); });
    if (r.callNight) {
      if (closeFn) closeFn();
      if (SB.NightClock && SB.NightClock.callNight) SB.NightClock.callNight();
      return;
    }
    redraw();
  }

  function open() {
    var s = game();
    if (!s || !SB.Evening) return;
    if (closeFn) closeFn();
    bodyEl = body(s);
    closeFn = SB.UI.card(h('div', { class: 'ev-card' }, [
      h('h2', { class: 'ev-title', text: L('title').toUpperCase() }),
      bodyEl,
      h('div', { class: 'ev-foot' }, [
        h('button', { type: 'button', class: 'ev-done pz-hl', data: { fk: 'ev-close' }, text: L('close'), on: { click: function () { if (closeFn) closeFn(); } } })
      ])
    ]), { label: L('label'), wide: true, onClose: function () { closeFn = null; bodyEl = null; if (SB.NightClock) SB.NightClock.preview(0, null); } });
  }

  SB.UI.evening = { open: open, redraw: redraw };
})(SB);
