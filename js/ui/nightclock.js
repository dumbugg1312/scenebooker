/* Scene Booker — js/ui/nightclock.js
 * SB.NightClock: tonight's clock, pinned to the same corner of every screen while a week is played (the desk and every
 * close-up), with the game's one CALL IT A NIGHT (user, 2026-11-21: "you should only be able to call it a night in one
 * place"). The tape deck, the calendar and the show card no longer call it a night: the deck, pressed at an evening,
 * nudges this clock. Close-ups make room for it at the stage's foot (css/clock.css, body.nc-on).
 *
 *   SB.NightClock.render(state, info)  redraw when what it says has changed. info: { full } (js/ui/app.js renderShell)
 *   SB.NightClock.preview(hours, el)   hatch on the ruler what a pointed-at button would take; 0 clears. el: that
 *                                      button, so a preview is dropped once its button is gone
 *   SB.NightClock.nudge()              shake it, say where a night is called, and put the keyboard on its button
 *                                      (the tape deck pressed at an evening)
 * Calling it a night is SB.UI.lamp.pull() (js/ui/app.js), with 'sb-callnight' fired on the document just before and
 * just after it ({ at: 'before' | 'after' }), so the show card can ask to be picked up again next evening.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.nightclock = {
    region: 'Tonight', callNight: 'call it a night',
    callNightSay: 'Call it a night: the night plays out, answers come overnight, and the next evening is yours',
    closeWeek: 'close the week', closeWeekSay: 'Close the week: see how it went and start the next one',
    overnight: 'Overnight', gotIt: 'got it', quiet: 'Nobody has answered yet. They answer when they answer.',
    still: 'Quiet night. Nothing changed.', onClock: 'Call it a night is on the clock.',
    YES: '{who} said yes.', NO: '{who} said no.', COUNTER: '{who} wrote back with a change. Answer them on the phone.',
    gone: '{who}\'s request is gone. They booked somewhere else.', confirmed: '{date} at {room} is confirmed. The show is real.',
    more: '+{n} more on the phone'
  };

  var el = null, key = null, info0 = {}, pv = { hours: 0, el: null }, nudging = null, sayEl = null, saying = null;

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(k, c) { return SB.text.label('ui.nightclock.' + k, c); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function doc() { return typeof document !== 'undefined' ? document : null; }
  function lampKey() { var l = safe(function () { return SB.UI.lamp.label(); }, null); return l ? l.key : ''; }
  function gone(e) { return !!e && e.isConnected === false; }

  function ensure() {
    var d = doc();
    if (el) return el;
    if (!d || !d.body || !SB.UI || !SB.UI.h) return null;
    el = h('section', { class: 'nc', id: 'nightclock', role: 'region', aria: { label: L('region') } });
    el.hidden = true;
    d.body.appendChild(el);
    return el;
  }

  /* ---- the overnight slip: what came back while you slept, shown once at the next evening ---- */
  var snap = null, slipEl = null;
  function nameOf(s, id) {
    var m = [s.bands, s.people, s.rooms], i;
    /* a band that writes its name in lowercase is quoted, so "houses we left said yes" reads as a sentence; a room
     * ("the Fairfield Carport") is not */
    if (id && s.people && s.people[id] && s.people[id].first) return s.people[id].first;
    for (i = 0; i < m.length; i++) if (m[i] && id && m[i][id] && m[i][id].name) return i === 0 && /^[a-z]/.test(m[i][id].name) ? '\u201c' + m[i][id].name + '\u201d' : m[i][id].name;
    return '';
  }
  function takeSnap(s) {
    var shows = {};
    if (!s || !s.clock) return;
    Object.keys(s.shows || {}).forEach(function (k) { shows[k] = s.shows[k].status; });
    snap = { seed: s.seed, day: s.clock.day, shows: shows,
             waiting: Object.keys(s.asks || {}).some(function (k) { var a = s.asks[k]; return !a.answer && a.status !== 'WITHDRAWN'; }) };
  }
  function overnightLines(s, sn) {
    var out = [];
    Object.keys(s.asks || {}).forEach(function (k) {
      var a = s.asks[k], st = a.answer && a.answer.status, who;
      if (!a.answer || a.answer.day == null || a.answer.day <= sn.day || !(st === 'YES' || st === 'NO' || st === 'COUNTER')) return;
      who = nameOf(s, a.toId);
      if (who) out.push({ t: L(st, { who: who }), hot: st !== 'YES' });
    });
    Object.keys(s.shows || {}).forEach(function (k) {
      var x = s.shows[k];
      if (x.status === 'CONFIRMED' && sn.shows[k] !== 'CONFIRMED')
        out.push({ t: L('confirmed', { date: SB.time.fmt(x.day, 'short'), room: nameOf(s, x.roomId) || '?' }) });
    });
    Object.keys(s.requests || {}).forEach(function (k) {
      var q = s.requests[k], who;
      if (q.closedDay == null || q.closedDay <= sn.day || !(q.status === 'LAPSED' || q.status === 'IGNORED' || q.status === 'WITHDRAWN')) return;
      who = nameOf(s, q.bandId);
      if (who) out.push({ t: L('gone', { who: who }), hot: true });
    });
    return out;
  }
  function dropSlip() { if (slipEl && slipEl.parentNode) slipEl.parentNode.removeChild(slipEl); slipEl = null; }
  function showSlip(lines, waiting) {
    var d = doc(), MAX = 6, list;
    dropSlip();
    if (!d || !d.body) return;
    list = lines.length ? lines.slice(0, MAX).map(function (x) { return h('li', { class: x.hot ? 'is-hot' : '', text: x.t }); })
                        : [h('li', { text: L(waiting ? 'quiet' : 'still') })];
    if (lines.length > MAX) list.push(h('li', { class: 'is-more', text: L('more', { n: lines.length - MAX }) }));
    slipEl = h('section', { class: 'on-slip pz-paper', role: 'status', aria: { label: L('overnight') } }, [
      h('h2', { class: 'on-head', text: L('overnight') }),
      h('ul', { class: 'on-list' }, list),
      h('button', { type: 'button', class: 'on-ok pz-hl', text: L('gotIt').toUpperCase(), on: { click: dropSlip } })
    ]);
    d.body.appendChild(slipEl);
  }
  function checkSlip(s, t) {
    if (snap && s && snap.seed !== s.seed) snap = null;
    if (!snap || !t || !s || !s.clock || s.clock.day <= snap.day || lampKey() !== 'night') return;
    var sn = snap; snap = null;
    var lines = safe(function () { return overnightLines(s, sn); }, []) || [];
    showSlip(lines, sn.waiting);                         // nothing came back: one line says so
  }

  function call() {
    if (lampKey() !== 'night') return;
    dropSlip();
    takeSnap(safe(function () { return SB.UI.game(); }, null));
    SB.UI.fire('sb-callnight', { at: 'before' });
    SB.UI.lamp.pull();
    SB.UI.fire('sb-callnight', { at: 'after' });
  }

  function button(t) {
    /* the week is over: the same corner holds the way on, so nobody has to hunt the tape deck for it */
    if (lampKey() === 'close') return h('button', { type: 'button', class: 'ck-call pz-hl is-hot', data: { fk: 'closeweek', tut: 'night' },
                         aria: { label: L('closeWeekSay') }, text: L('closeWeek').toUpperCase(), on: { click: function () { dropSlip(); SB.UI.lamp.pull(); } } });
    return h('button', { type: 'button', class: 'ck-call pz-hl' + (t.left <= 0 ? ' is-hot' : ''), data: { fk: 'callnight', tut: 'night' },
                         aria: { label: L('callNightSay') }, text: L('callNight').toUpperCase(), on: { click: call } });
  }
  /* the rest of tonight (js/ui/evening.js): beside CALL IT A NIGHT while the evening is up */
  function things(t) {
    if (lampKey() !== 'night' || !SB.UI.evening) return null;
    return h('button', { type: 'button', class: 'ck-things pz-hl' + (t.left > 0 ? ' is-on' : ''), data: { fk: 'things' },
                         aria: { label: SB.text.label('ui.evening.openSay') }, text: SB.text.label('ui.evening.open').toUpperCase(),
                         on: { click: function () { SB.UI.evening.open(); } } });
  }

  /** render(state, info): shown while a week is played on the desk or a close-up; hidden on a full screen. */
  function render(s, info) {
    var e = ensure(), d = doc(), t = null, cr, ink, btnOn, k;
    info0 = info || {};
    if (!e) return;
    if (s && s.clock && s.clock.phase === 'PLAY' && !info0.full && SB.Clock && SB.Week) t = safe(function () { return SB.Week.tonight(s); }, null);
    if (d && d.body && d.body.classList) d.body.classList.toggle('nc-on', !!t);
    if (!t) { e.hidden = true; key = null; if (!s || !s.clock || s.clock.phase !== 'PLAY') { dropSlip(); snap = null; } return; }
    e.hidden = false;
    checkSlip(s, t);
    if (pv.el && gone(pv.el)) pv = { hours: 0, el: null };
    cr = safe(function () { return SB.Week.crunch(s); }, []) || [];
    ink = SB.Clock.hot(s);
    btnOn = lampKey() === 'night' || lampKey() === 'close';
    k = JSON.stringify([t, cr.slice(0, 1), ink, btnOn && lampKey(), pv.hours]);
    if (k === key) return;
    key = k;
    SB.UI.clear(e);
    e.appendChild(SB.Clock.slip(s, { tonight: t, list: cr, crunch: 1, short: true, hot: ink, extra: pv.hours, cls: 'nc-slip', foot: btnOn ? h('span', { class: 'ck-btns' }, [things(t), button(t)]) : null }));
    if (sayEl) e.appendChild(sayEl);                             // a redraw keeps the line that is up
  }

  /** preview(hours, el): what a button would take, hatched from now on; preview(0, el) takes that button's off again. */
  function preview(hours, src) {
    var n = hours > 0 ? hours : 0;
    if (!n && src && pv.el && pv.el !== src) return;            // another button's preview is up: leave it
    pv = { hours: n, el: n ? (src || null) : null };
    render(safe(function () { return SB.UI.game(); }, null), info0);
  }

  /* a line on the clock for a few seconds (role status, so it is read out too) */
  function dropSay() { if (saying) clearTimeout(saying); saying = null; if (sayEl && sayEl.parentNode) sayEl.parentNode.removeChild(sayEl); sayEl = null; }
  function sayOn(text) {
    if (!el) return;
    dropSay();
    sayEl = h('p', { class: 'nc-say', role: 'status', text: text });
    el.appendChild(sayEl);
    if (typeof setTimeout === 'function') saying = setTimeout(dropSay, 3200);
  }

  /** nudge(): the clock jumps, so the eye finds it, says where a night is called, and the keyboard is put on CALL IT A NIGHT. */
  function nudge() {
    var b = el && el.querySelector ? el.querySelector('.ck-call') : null;
    if (!el || el.hidden) return;
    el.classList.remove('is-nudged');
    if (nudging) clearTimeout(nudging);
    void el.offsetWidth;                                         // restart the jump if it is already running
    el.classList.add('is-nudged');
    nudging = setTimeout(function () { nudging = null; if (el) el.classList.remove('is-nudged'); }, 700);
    sayOn(L('onClock'));
    if (b && b.focus) { try { b.focus({ preventScroll: true }); } catch (x) { b.focus(); } }
  }

  SB.NightClock = { render: render, preview: preview, nudge: nudge, callNight: call };
})(SB);
