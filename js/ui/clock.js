/* Scene Booker — js/ui/clock.js (the night clock, design/spec/10-night-clock.md "Interface")
 * SB.Clock: tonight's hours as the player sees them. They are drawn as clock time (user, 2026-11-21: the half-hour
 * boxes "dont really represent time well unless you already know what youre looking at"): a ruler marked with the
 * hours of the evening, from getting home to bed at 11 PM. The time spent is inked in up to a NOW pin; what a show
 * takes is hatched before bed; hours lost to last night are crossed out at the start; the stay-up hour runs past bed
 * in the city's hot ink (only it is hot: it is the one that costs you).
 * There is one clock on screen, pinned to the same corner everywhere (js/ui/nightclock.js); the calendar's days carry
 * the ruler's small form. Reads the view Week.tonight / Week.view(state).tonight and Week.crunch; computes no rule
 * (whether a thing fits is Week.canDoNow / Week.fits, never worked out here).
 *
 *   SB.Clock.ruler(tonight, opts) -> element   the evening as a ruler. opts: { hot, extra (hours a choice would take,
 *                                              hatched), mini (no words: a calendar day), cls, say }
 *   SB.Clock.times(tonight)       -> object    the evening in hours of the day: { start, home, doors, bed, end, now, ... }
 *   SB.Clock.at(hours)            -> string    "8:30 PM", "MIDNIGHT"
 *   SB.Clock.span(tonight)        -> string    "7-11 PM": the evening, home to bed
 *   SB.Clock.parts(tonight)       -> object    { head: "TONIGHT", now: "8:30 PM", rest: "2½ HRS TILL BED" }
 *   SB.Clock.line(tonight)        -> string    the parts in one line: "TONIGHT · 8:30 PM · 2½ HRS TILL BED"
 *   SB.Clock.cost(hours)          -> string    "½ HR", "1 HR", "2½ HRS" ('' for no time)
 *   SB.Clock.crunchLine(item, o)  -> string    "THURSDAY: 5 HRS OF WORK DUE, 3 HRS FREE BEFORE THEN" (o: { today, short })
 *   SB.Clock.tag(label, hours)    -> string    "ASK THEM TO HOLD IT · ½ HR": a button's words with what it costs
 *   SB.Clock.due(jobView, o)      -> { text, late } | null   "DUE THU", "DUE TONIGHT", "LATE" (o: { today })
 *   SB.Clock.why(result)          -> string    a refusal's words (NO_TIME says what it takes and what is left)
 *   SB.Clock.hot(state)           -> colour    the city's hot ink
 *   SB.Clock.slip(state, opts)    -> element   the whole clock: the words, the ruler, the crunch warnings.
 *                                              opts: { crunch: n lines (default 1), list (Week.crunch, if read
 *                                              already), short (crunch in few words), cls, tonight, hot, extra,
 *                                              foot (an element set in the crunch's row: the pinned clock's button) }
 */
(function (SB) {
  'use strict';

  SB.Content.ui.clock = {
    tonight: 'tonight', dayOff: 'day off', showNight: 'show night', burnt: 'burnt out', called: 'night called',
    none: 'no hours left', tillBed: '{n} till bed', tillDoors: '{n} till doors', doorsAt: 'doors {t}',
    bedtime: 'bedtime', upLate: 'up late', stayTill: 'can stay up till {t}', tired: 'tired, {n} lost',
    am: 'am', pm: 'pm', midnight: 'midnight', now: 'now', bed: 'bed', stayUp: 'stay up', show: 'show',
    half: '½ hr', one: '1 hr', many: '{n} hrs',
    crunch: '{day}: {need} of work due, {have} free before then', crunchNone: '{day}: {need} of work due, no hours free before then',
    crunchShort: '{day}: {need} due, {have} free', crunchShortNone: '{day}: {need} due, none free',
    today: 'tonight', tomorrow: 'tomorrow',
    due: 'due {day}', late: 'late',
    say: '{line}. The evening runs {span}, bed at {bed}(?stay:; past bed, till {end}, is staying up, and it costs you tomorrow).'
  };

  var TONER = '#141413', PAPER = '#f4f2ea', PENCIL = '#6d6a62', SHOW = '#8d8a80';
  var BED = 23;           // the evening ends at 11 PM: tonight's hours are the ones before it, staying up the ones after
  var uid = 0;            // hatch patterns need ids unique on the page

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(key, ctx) { return SB.text.label('ui.clock.' + key, ctx); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function up(t) { return String(t || '').toUpperCase(); }
  function r1(n) { return Math.round(n * 10) / 10; }

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

  /** times(tonight): the evening laid on the day's clock, in hours of the day (19.5 is 7:30 PM).
   *  start: where last night's lost hours begin; home: when the evening's own hours begin; doors: where a show's take
   *  begins (bed with no show); bed: 11 PM; end: the end of the stay-up hour; now: how far the evening has got. */
  function times(t) {
    t = t || {};
    var cap = Math.max(0, num(t.cap) ? t.cap : 0), res = Math.min(cap, Math.max(0, num(t.reserved) ? t.reserved : 0)),
        tired = Math.max(0, num(t.tired) ? t.tired : 0), st = t.stay || {}, max = Math.max(0, num(st.max) ? st.max : 0),
        sUsed = Math.min(max, Math.max(0, num(st.used) ? st.used : 0)), free = cap - res,
        mine = num(t.spent) ? t.spent : (num(t.used) ? t.used - res : 0),
        pool = Math.min(free, Math.max(0, mine - sUsed)), home = BED - cap, doors = BED - res;
    return { start: home - tired, home: home, doors: doors, bed: BED, end: BED + max, free: free, spent: pool, tired: tired,
             now: sUsed > 0 ? BED + sUsed : (pool >= free ? doors : home + pool), stayUsed: sUsed, stayLeft: Math.max(0, max - sUsed),
             left: num(t.left) ? Math.max(0, t.left) : Math.max(0, free - pool) };
  }

  /** at(hours of the day): "7 PM", "8:30 PM", "MIDNIGHT". */
  function at(hh) {
    var m = Math.round((num(hh) ? hh : 0) * 60), H = Math.floor(m / 60) % 24, M = m % 60;
    if (H === 0 && M === 0) return up(L('midnight'));
    return up((H % 12 || 12) + (M ? ':' + (M < 10 ? '0' : '') + M : '') + ' ' + L(H >= 12 ? 'pm' : 'am'));
  }

  /** span(tonight): the evening, home to bed: "7-11 PM", "1-11 PM", "11 AM-11 PM". */
  function span(t) {
    var x = times(t), a = at(x.home), b = at(x.bed), sa = a.split(' '), sb = b.split(' ');
    if (sa.length === 2 && sb.length === 2 && sa[1] === sb[1]) a = sa[0];
    return a + '-' + b;
  }

  /** parts(tonight): the clock in words, upper case: the head (what kind of evening), the time now, the rest. */
  function parts(t) {
    var x, rest = [], now = '', head;
    if (!t) return { head: '', now: '', rest: '' };
    if (t.burnt) return { head: up(L('burnt')), now: '', rest: up(L('none')) };
    head = up(t.show ? L('showNight') : (t.off ? L('dayOff') : L('tonight')));
    x = times(t);
    if (t.called) rest.push(L('called'));
    else if (t.show && x.free <= 0 && !x.stayUsed) rest.push(L('doorsAt', { t: at(x.doors) }));
    else {
      now = at(x.now);
      if (x.left <= 0) {
        rest.push(L(x.stayUsed > 0 ? 'upLate' : 'bedtime'));
        if (x.stayLeft > 0) rest.push(L('stayTill', { t: at(x.end) }));
      } else rest.push(L(t.show ? 'tillDoors' : 'tillBed', { n: cost(x.left) }));
    }
    if (x.tired > 0) rest.push(L('tired', { n: cost(x.tired) }));
    return { head: head, now: now, rest: up(rest.join(' · ')) };
  }

  /** line(tonight): the clock in words, upper case, for a label or a screen reader. */
  function line(t) { var p = parts(t); return [p.head, p.now, p.rest].filter(Boolean).join(' · '); }

  /** ruler(tonight, opts): the evening as a ruler, an element (an inline drawing).
   *  opts: { hot: colour, extra: hours to show hatched from now on (what a choice would take), mini: the bar alone,
   *  cls, say: false to leave it out of the reading order } */
  function ruler(t, opts) {
    var o = opts || {}, hot = o.hot || hot0(), x = times(t || {}), mini = !!o.mini, W = 280, PL = mini ? 1 : 12, PR = mini ? 1 : 12,
        a = x.start, b = Math.max(x.end, x.bed), k = (W - PL - PR) / Math.max(0.5, b - a),
        Y0 = mini ? 1 : 13, BH = mini ? 9 : 16, Y1 = Y0 + BH, H = mini ? 11 : 46, n = ++uid, out = '', defs = '', words = [],
        ex = num(o.extra) && o.extra > 0 ? o.extra : 0, ex1 = Math.min(Math.max(0, x.doors - x.now), ex), ex2 = Math.max(0, ex - ex1),
        hh, step, first = true, label, wrap;
    function X(v) { return r1(PL + (v - a) * k); }
    function box(v0, v1, fill, stroke, sw, more) {
      if (v1 - v0 <= 0.001) return '';
      return '<rect x="' + X(v0) + '" y="' + Y0 + '" width="' + r1((v1 - v0) * k) + '" height="' + BH + '" fill="' + fill + '"' +
             (stroke ? ' stroke="' + stroke + '" stroke-width="' + sw + '"' : '') + (more || '') + '/>';
    }
    function hatch(id, color, w, gap, cross) {
      defs += '<pattern id="' + id + '" width="' + gap + '" height="' + gap + '" patternUnits="userSpaceOnUse" patternTransform="rotate(' + (cross ? 0 : 45) + ')">' +
              (cross ? '<path d="M0 0L' + gap + ' ' + gap + 'M' + gap + ' 0L0 ' + gap + '" stroke="' + color + '" stroke-width="' + w + '"/>'
                     : '<rect width="' + w + '" height="' + gap + '" fill="' + color + '"/>') + '</pattern>';
      return 'url(#' + id + ')';
    }
    /* last night's lost hours, crossed out in pencil; the evening; what is spent; a show's take; the stay-up hour */
    if (x.tired > 0) out += box(x.start, x.home, PAPER, PENCIL, 1.2) + box(x.start, x.home, hatch('ckt' + n, PENCIL, 1, 6, true));
    out += box(x.home, x.bed, PAPER, TONER, 1.5);
    out += box(x.home, x.home + x.spent, TONER);
    if (x.doors < x.bed) {
      out += box(x.doors, x.bed, SHOW, TONER, 1.5) + box(x.doors, x.bed, hatch('cks' + n, PAPER, 1.3, 5));
      if (!mini && (x.bed - x.doors) * k >= 34) out += '<text x="' + X((x.doors + x.bed) / 2) + '" y="' + (Y1 - 4) + '" text-anchor="middle" font-size="10" fill="' + PAPER + '" stroke="' + SHOW + '" stroke-width="3" paint-order="stroke">' + up(L('show')) + '</text>';
    }
    if (x.end > x.bed) out += box(x.bed, x.end, PAPER, hot, 1.5, ' stroke-dasharray="3 2"') + box(x.bed, x.bed + x.stayUsed, hot);
    if (ex1 > 0) out += box(x.now, x.now + ex1, hatch('cke' + n, TONER, 2, 5));
    if (ex2 > 0) out += box(x.bed + x.stayUsed, x.bed + x.stayUsed + ex2, hatch('ckx' + n, hot, 2, 5));
    /* the hours: a tick on every one, a number over every one (every other on a long day), the first with its am/pm */
    step = mini || k >= 19 ? 1 : 2;
    for (hh = Math.ceil(a - 0.001); hh <= b + 0.001; hh++) {
      out += '<path d="M' + X(hh) + ' ' + (Y0 - (mini ? 0 : 3)) + 'V' + (Y0 + (mini ? 3 : 4)) + '" stroke="' + (hh > x.bed ? hot : TONER) + '" stroke-width="1"/>';
      if (mini || (x.bed - hh) % step) continue;
      label = String(hh % 12 || 12) + (first ? L(hh % 24 >= 12 ? 'pm' : 'am').toUpperCase() : '');
      first = false;
      out += '<text x="' + X(hh) + '" y="9.5" text-anchor="middle" font-size="10" fill="' + (hh > x.bed ? hot : TONER) + '">' + label + '</text>';
    }
    /* bed: a heavy line through the bar */
    out += '<path d="M' + X(x.bed) + ' ' + (Y0 - (mini ? 1 : 4)) + 'V' + (Y1 + (mini ? 1 : 4)) + '" stroke="' + TONER + '" stroke-width="' + (mini ? 1.6 : 2.6) + '"/>';
    if (!mini) {
      /* now: a pin under the bar where the evening has got to; then the words under the bar, nearest first */
      if (!(t && (t.called || t.burnt))) {
        out += '<path d="M' + X(x.now) + ' ' + (Y1 + 1) + 'L' + r1(X(x.now) - 4.5) + ' ' + (Y1 + 8) + 'H' + r1(X(x.now) + 4.5) + 'Z" fill="' + (x.now > x.bed ? hot : TONER) + '"/>';
        words.push({ x: X(x.now), t: up(L('now')), c: x.now > x.bed ? hot : TONER, a: 'middle' });
      }
      words.push({ x: X(x.bed) - 2, t: up(L('bed')), c: TONER, a: 'end' });
      if (x.end > x.bed) words.push({ x: X(x.bed) + 3, t: up(L('stayUp')), c: hot, a: 'start' });
      out += place(words, W, H - 1.5);
    }
    wrap = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '"' + (mini ? ' preserveAspectRatio="none"' : '') + ' focusable="false">' + (defs ? '<defs>' + defs + '</defs>' : '') + out + '</svg>';
    label = L('say', { line: line(t || {}), span: span(t || {}), bed: at(x.bed), end: at(x.end), stay: x.end > x.bed ? 1 : null });
    return h('span', { class: 'ck-ruler' + (mini ? ' ck-ruler--mini' : '') + (o.cls ? ' ' + o.cls : ''), style: { '--ck-hot': hot }, role: o.say === false ? null : 'img',
                       aria: o.say === false ? { hidden: 'true' } : { label: label }, html: wrap });
  }
  /* the words under the bar: each where it points, dropped when it would run into one already placed */
  function place(words, W, y) {
    var taken = [], out = '';
    words.forEach(function (w) {
      var wd = w.t.length * 6 + 2, x0 = w.a === 'middle' ? w.x - wd / 2 : (w.a === 'end' ? w.x - wd : w.x), x1, ok;
      if (x0 < 0) { x0 = 0; w.a = 'start'; w.x = 0; }
      if (x0 + wd > W) { x0 = W - wd; w.a = 'end'; w.x = W; }
      x1 = x0 + wd;
      ok = taken.every(function (r) { return x1 <= r[0] || x0 >= r[1]; });
      if (!ok) return;
      taken.push([x0 - 3, x1 + 3]);
      out += '<text x="' + r1(w.x) + '" y="' + y + '" text-anchor="' + w.a + '" font-size="9.5" fill="' + w.c + '">' + w.t + '</text>';
    });
    return out;
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

  /** crunchLine(item, opts): one due day that needs more hours than there are, from Week.crunch. opts.short: in few words. */
  function crunchLine(item, opts) {
    if (!item) return '';
    var o = opts || {}, today = todayOf(o), day = up(o.short && num(item.day) && num(today) && item.day > today + 1 && item.day - today <= 6 ? SB.time.fmt(item.day, 'dow3') : dayWord(item.day, today)),
        k = o.short ? 'crunchShort' : 'crunch';
    return up(item.have > 0 ? L(k, { day: day, need: cost(item.need), have: cost(item.have) })
                            : L(k + 'None', { day: day, need: cost(item.need) }));
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

  /** slip(state, opts): the clock as one paper slip: what kind of evening on a label strip with the time now big beside
   *  it, the ruler, and the crunch warnings in a row with opts.foot (the pinned clock's button). */
  function slip(s, opts) {
    var o = opts || {}, t = o.tonight || safe(function () { return SB.Week.tonight(s); }, null), ink = o.hot || hot(s), cr, n = o.crunch === undefined ? 1 : o.crunch, p;
    if (!t) return null;
    cr = n ? (o.list || safe(function () { return SB.Week.crunch(s); }, []) || []) : [];
    p = parts(t);
    return h('div', { class: 'ck-slip' + (o.cls ? ' ' + o.cls : '') + (t.left <= 0 && !t.called ? ' is-out' : '') + (cr.length ? ' is-crunch' : ''), style: { '--ck-hot': ink } }, [
      h('div', { class: 'ck-top', aria: { hidden: 'true' } }, [
        h('span', { class: 'ck-line', text: p.head }),
        p.now ? h('span', { class: 'ck-now', text: p.now }) : null,
        p.rest ? h('span', { class: 'ck-rest', text: p.rest }) : null
      ]),
      ruler(t, { hot: ink, extra: o.extra }),
      cr.length || o.foot ? h('div', { class: 'ck-foot' }, [
        o.foot || null,
        cr.length ? h('ul', { class: 'ck-crunch', role: 'note' }, cr.slice(0, n).map(function (c) {
          return h('li', null, [h('span', { class: 'ck-bang', aria: { hidden: 'true' }, text: '!!' }), crunchLine(c, { today: t.day, short: o.short })]);
        })) : null
      ]) : null
    ]);
  }

  SB.Clock = { ruler: ruler, times: times, at: at, span: span, parts: parts, line: line, cost: cost, crunchLine: crunchLine, tag: tag, due: due, why: why,
               hot: hot, slip: slip, fmt: fmt };
})(SB);
