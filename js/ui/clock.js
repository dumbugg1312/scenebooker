/* Scene Booker — js/ui/clock.js (the night clock, design/spec/10-night-clock.md "Interface")
 * SB.Clock: tonight's hours as the player sees them, wherever they are on screen: the desk (js/desk/scene.js), the
 * calendar (js/ui/screens/week.js) and the booking card. One piece, so the clock reads the same everywhere.
 * The hours are empty pencil boxes, one per half hour, toner as they are spent; what a show takes of the night is
 * hatched; hours lost to last night are crossed out; the stay-up hour is drawn in the city's hot ink (only it is hot:
 * it is the one that costs you).
 * Reads the view Week.tonight / Week.view(state).tonight / Game.strip(state).tonight and Week.crunch; computes no
 * rule (whether a thing fits is Week.canDoNow / Week.fits, never worked out here).
 *
 *   SB.Clock.boxes(tonight, opts) -> element   the half-hour boxes. opts: { hot, extra, tired, cls, say }
 *   SB.Clock.line(tonight)        -> string    "TONIGHT · 2½ OF 4 HRS LEFT", "DAY OFF · 10 HRS", "SHOW NIGHT", tired noted
 *   SB.Clock.cost(hours)          -> string    "½ HR", "1 HR", "2½ HRS" ('' for no time)
 *   SB.Clock.crunchLine(item, o)  -> string    "THURSDAY: 5 HRS OF WORK DUE, 3 HRS FREE BEFORE THEN" (o: { today })
 *   SB.Clock.tag(label, hours)    -> string    "ASK THEM TO HOLD IT · ½ HR": a button's words with what it costs
 *   SB.Clock.due(jobView, o)      -> { text, late } | null   "DUE THU", "DUE TONIGHT", "LATE" (o: { today })
 *   SB.Clock.why(result)          -> string    a refusal's words (NO_TIME says what it takes and what is left)
 *   SB.Clock.hot(state)           -> colour    the city's hot ink
 *   SB.Clock.slip(state, opts)    -> element   the whole clock: the line, the boxes and the crunch warnings.
 *                                              opts: { crunch: n lines (default 1), list (Week.crunch, if read
 *                                              already), cls, tonight, hot, extra (as boxes) }
 */
(function (SB) {
  'use strict';

  SB.Content.ui.clock = {
    tonight: 'tonight', dayOff: 'day off', showNight: 'show night', burnt: 'burnt out', called: 'night called',
    left: '{left} of {cap} hrs left', all: '{cap} hrs', none: 'no hours left',
    stay: 'stay up {n} more', stayed: 'up {n} late', tired: 'tired, {n} short',
    beforeDoors: '{n} before doors', noTimeShow: 'the show takes the night',
    half: '½ hr', one: '1 hr', many: '{n} hrs',
    crunch: '{day}: {need} of work due, {have} free before then', crunchNone: '{day}: {need} of work due, no hours free before then',
    today: 'tonight', tomorrow: 'tomorrow',
    due: 'due {day}', late: 'late', say: '{line}. Each box is half an hour.(?stay: The last {stay} in red is staying up.)'
  };

  var TONER = '#141413', PAPER = '#f4f2ea', PENCIL = '#6d6a62', SHOW = '#8d8a80';

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(key, ctx) { return SB.text.label('ui.clock.' + key, ctx); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function halves(n) { return num(n) ? Math.max(0, Math.round(n * 2)) : 0; }
  function up(t) { return String(t || '').toUpperCase(); }

  /** 2½, 10, ½: hours the way they are pencilled. */
  function fmt(n) {
    var x = num(n) ? Math.max(0, Math.round(n * 2) / 2) : 0, whole = Math.floor(x), half = x - whole > 0.25;
    if (!whole) return half ? '½' : '0';
    return whole + (half ? '½' : '');
  }

  /** cost(hours): "½ HR", "1 HR", "2½ HRS"; '' when it takes no time. */
  function cost(hours) {
    var x = num(hours) ? Math.round(hours * 2) / 2 : 0;
    if (x <= 0) return '';
    if (x === 0.5) return up(L('half'));
    if (x === 1) return up(L('one'));
    return up(L('many', { n: fmt(x) }));
  }

  function tag(label, hours) { var c = cost(hours); return String(label || '') + (c ? ' · ' + c : ''); }

  /* hours in a line: "4 HRS", "½ HR" */
  function hrs(n) { return cost(n) || up(L('many', { n: '0' })); }

  /** line(tonight): the clock in words, upper case, for a label strip. */
  function line(t) {
    var parts = [], head, pool, left, cap, stay;
    if (!t) return '';
    if (t.burnt) return up(L('burnt')) + ' · ' + up(L('none'));
    cap = num(t.cap) ? t.cap : 0;
    pool = Math.max(0, cap - (num(t.reserved) ? t.reserved : 0));
    left = num(t.left) ? t.left : pool;
    stay = t.stay || {};
    head = t.show ? L('showNight') : (t.off ? L('dayOff') : L('tonight'));
    parts.push(head);
    if (t.called) parts.push(L('called'));
    else if (t.show && pool <= 0) { if ((stay.used || 0) > 0) parts.push(L('stayed', { n: cost(stay.used) })); }
    else if (left <= 0) {
      parts.push(L('none'));
      if ((stay.used || 0) > 0) parts.push(L('stayed', { n: cost(stay.used) }));
      if ((stay.left || 0) > 0) parts.push(L('stay', { n: cost(stay.left) }));
    } else if (t.show) parts.push(L('beforeDoors', { n: hrs(left) }));
    else if (left >= pool) parts.push(L('all', { cap: fmt(pool) }));
    else parts.push(L('left', { left: fmt(left), cap: fmt(pool) }));
    if (num(t.tired) && t.tired > 0) parts.push(L('tired', { n: cost(t.tired) }));
    return up(parts.join(' · '));
  }

  /* the half-hour boxes, in order: the pool (spent, a preview, free, the show's), what last night took, the stay-up hour */
  function cells(t, o) {
    var out = [], cap2, res2, spent2, extra2, ex1, ex2, free2, i, max2, used2, stay = (t && t.stay) || {}, poolSpent;
    cap2 = halves(t && t.cap);
    res2 = Math.min(cap2, halves(t && t.reserved));
    poolSpent = Math.max(0, (num(t && t.spent) ? t.spent : (num(t && t.used) ? t.used - (t.reserved || 0) : 0)) - (stay.used || 0));
    spent2 = Math.min(cap2 - res2, halves(poolSpent));
    free2 = cap2 - res2 - spent2;
    extra2 = halves(o.extra);
    ex1 = Math.min(free2, extra2); ex2 = extra2 - ex1;
    for (i = 0; i < cap2 - res2; i++) out.push({ g: 'pool', k: i < spent2 ? 'spent' : (i < spent2 + ex1 ? 'extra' : 'free') });
    for (i = 0; i < res2; i++) out.push({ g: 'pool', k: 'show' });
    if (o.tired !== false) for (i = 0; i < halves(t && t.tired); i++) out.push({ g: 'tired', k: 'tired' });
    max2 = halves(stay.max); used2 = Math.min(max2, halves(stay.used));
    for (i = 0; i < max2; i++) out.push({ g: 'stay', k: i < used2 ? 'staySpent' : (i < used2 + ex2 ? 'stayExtra' : 'stayFree') });
    return out;
  }

  /* one half-hour box: 9 x 12 units, a little crooked */
  function cell(c, x, hot, seed) {
    var stroke = c.g === 'stay' ? hot : (c.k === 'tired' ? PENCIL : TONER), fill = PAPER, extra = '', rot = ((seed * 7) % 5 - 2) * 0.9, sw = c.g === 'stay' ? 1.8 : 1.4;
    if (c.k === 'spent') fill = TONER;
    else if (c.k === 'staySpent') fill = hot;
    else if (c.k === 'show') { fill = SHOW; extra = '<path d="M' + (x + 1) + ' 12L' + (x + 8) + ' 2" stroke="' + PAPER + '" stroke-width="1.3"/>'; }
    else if (c.k === 'extra' || c.k === 'stayExtra') extra = '<path d="M' + (x + 1) + ' 6L' + (x + 4) + ' 2M' + (x + 1) + ' 11L' + (x + 8) + ' 2M' + (x + 4) + ' 12L' + (x + 8) + ' 7" stroke="' + (c.k === 'stayExtra' ? hot : TONER) + '" stroke-width="1.3"/>';
    else if (c.k === 'tired') extra = '<path d="M' + (x + 1) + ' 2L' + (x + 8) + ' 12M' + (x + 8) + ' 2L' + (x + 1) + ' 12" stroke="' + PENCIL + '" stroke-width="1.4"/>';
    return '<g transform="rotate(' + rot + ' ' + (x + 4.5) + ' 7)"><rect x="' + x + '" y="1.5" width="9" height="11" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + sw + '"/>' + extra + '</g>';
  }

  /** boxes(tonight, opts): the half-hour boxes as an element, one group per hour so a narrow place wraps between hours.
   *  opts: { hot: colour, extra: hours to show hatched (what a choice would take), tired: false to leave out last
   *  night's crossed boxes, cls, say: false to leave it out of the reading order } */
  function boxes(t, opts) {
    var o = opts || {}, hot = o.hot || hot0(), list = cells(t || {}, o), groups = [], i, g, cur = null, kids, label;
    for (i = 0; i < list.length; i++) {
      if (!cur || cur.g !== list[i].g || cur.items.length === 2) { cur = { g: list[i].g, items: [] }; groups.push(cur); }
      cur.items.push(list[i]);
    }
    kids = groups.map(function (gr, n) {
      var w = gr.items.length * 10 + 1, inner = '';
      gr.items.forEach(function (c, j) { inner += cell(c, 1 + j * 10, hot, n * 2 + j); });
      return h('span', { class: 'ck-hr ck-hr--' + gr.g, aria: { hidden: 'true' },
                         html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' 14" style="width:' + (w / 14) + 'em" focusable="false">' + inner + '</svg>' });
    });
    label = L('say', { line: line(t || {}), stay: t && t.stay && t.stay.max > 0 ? cost(t.stay.max) : null });
    g = h('span', { class: 'ck-boxes' + (o.cls ? ' ' + o.cls : ''), style: { '--ck-hot': hot }, role: o.say === false ? null : 'img',
                    aria: o.say === false ? { hidden: 'true' } : { label: label } }, kids);
    return g;
  }

  /* a day as the reader says it: tonight, tomorrow, Thursday, Feb 19 */
  function dayWord(day, today) {
    if (!num(day)) return '';
    if (num(today)) {
      if (day <= today) return L('today');
      if (day === today + 1) return L('tomorrow');
      if (day - today <= 6) return SB.time.fmt(day, 'dow');
    }
    return SB.time.fmt(day, 'md');
  }
  function todayOf(o) {
    if (o && num(o.today)) return o.today;
    return safe(function () { var s = SB.UI.game(); return s ? SB.Week.tonight(s).day : null; }, null);
  }

  /** crunchLine(item, opts): one due day that needs more hours than there are, from Week.crunch. */
  function crunchLine(item, opts) {
    if (!item) return '';
    var day = up(dayWord(item.day, todayOf(opts)));
    return up(item.have > 0 ? L('crunch', { day: day, need: cost(item.need), have: cost(item.have) })
                            : L('crunchNone', { day: day, need: cost(item.need) }));
  }

  /** due(jobView, opts): when a job is due, in a few words; null when it has no due day. */
  function due(jv, opts) {
    var w = jv && jv.window, d = jv ? (num(jv.due) ? jv.due : (w && num(w.idealUntil) ? w.idealUntil : null)) : null, today = todayOf(opts);
    if (w && w.state === 'LATE') return { text: up(L('late')), late: true };
    if (!num(d)) return null;
    if (num(today) && d < today && !(w && w.state === 'DONE')) return { text: up(L('late')), late: true };   // late while it waits on another job
    /* "due Thu": the short day name inside the week ahead; tonight and tomorrow by name; further off the date */
    return { text: up(L('due', { day: num(today) && d > today + 1 && d - today <= 6 ? SB.time.fmt(d, 'dow3') : dayWord(d, today) })), late: false };
  }

  function why(r) {
    if (!r) return '';
    if (r.why) return r.why;
    return r.code ? safe(function () { return SB.text.label('refuse.' + r.code); }, '') : '';
  }

  /** hot(state): the city's hot ink (its first hot city ink), for the stay-up hour and what needs the player now.
   *  Fluorescent yellow is left out: it cannot be read on paper (the card, the desk slip), so a yellow city falls back
   *  to its next hot ink, or fire red. */
  var HOTS = ['fluorPink', 'fireRed', 'fluorOrange'];
  function hot(s) {
    var p = safe(function () { return SB.Cities.pack(s); }, null), inks = (p && p.style && p.style.cityInks) || [], name = inks.filter(function (n) { return HOTS.indexOf(n) >= 0; })[0] || 'fireRed';
    return safe(function () { return SB.DeskKit.ink(name); }, '#d8392b') || '#d8392b';
  }
  function hot0() { var s = safe(function () { return SB.UI.game(); }, null); return s ? hot(s) : '#d8392b'; }

  /** slip(state, opts): the clock as one paper slip: the line on a label strip, the boxes, and the crunch warnings.
   *  opts.split: the line's first part as a big headline ("TONIGHT", "DAY OFF") with the rest beside it (the desk). */
  function slip(s, opts) {
    var o = opts || {}, t = o.tonight || safe(function () { return SB.Week.tonight(s); }, null), ink = o.hot || hot(s), cr, n = o.crunch === undefined ? 1 : o.crunch, today, words, head;
    if (!t) return null;
    cr = n ? (o.list || safe(function () { return SB.Week.crunch(s); }, []) || []) : [];
    today = t.day;
    words = line(t).split(' · ');
    head = o.split && words.length > 1 ?
      h('span', { class: 'ck-line ck-line--split' }, [h('span', { class: 'ck-head', text: words[0] }), h('span', { class: 'ck-rest', text: words.slice(1).join(' · ') })]) :
      h('span', { class: 'ck-line', text: line(t) });
    return h('div', { class: 'ck-slip' + (o.cls ? ' ' + o.cls : '') + (t.left <= 0 && !t.called ? ' is-out' : '') + (cr.length ? ' is-crunch' : '') +
                       ((t.cap || 0) + ((t.stay && t.stay.max) || 0) > 6 ? ' is-long' : ''), style: { '--ck-hot': ink } }, [
      head,
      boxes(t, { hot: ink, extra: o.extra }),
      cr.length ? h('ul', { class: 'ck-crunch', role: 'note' }, cr.slice(0, n).map(function (c) {
        return h('li', null, [h('span', { class: 'ck-bang', aria: { hidden: 'true' }, text: '!!' }), crunchLine(c, { today: today })]);
      })) : null
    ]);
  }

  SB.Clock = { boxes: boxes, line: line, cost: cost, crunchLine: crunchLine, tag: tag, due: due, why: why, hot: hot, slip: slip, fmt: fmt };
})(SB);
