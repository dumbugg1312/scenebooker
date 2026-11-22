/* Scene Booker — ui/components.js (UI-A1)
 * Every shared component of design/spec/05-interface.md section 3, as SB.UI.C.<Name>(props) -> Element.
 * Components are pure functions of their props: they build fresh elements with SB.UI.h and are re-rendered by
 * replacement. They read public state only (never hid, truth, rng or director), compute no game rule, and change
 * nothing: every callback they take is the caller's. Styles are in css/desk.css (block names sb-<component>).
 * Loads in Node without a DOM: nothing here touches document while loading (ui.test checks it).
 * SB.UI.C.LogCard.homes is the copy of the table of 05-interface 3.1 that ui.test walks against SB.Enums.REC.
 */
(function (SB) {
  'use strict';

  var E = SB.Enums;

  /* Interface chrome for the components (00-overview 6.6). Game vocabulary comes from strings.js. */
  SB.Content.ui.c = {
    unknown: '—',
    none: 'Nothing here.',
    more: 'more', less: 'less',
    rising: 'rising', falling: 'falling',
    likely: 'Likely:',
    choose: 'Choose',
    cannot: 'Not possible:',
    plan: 'Plan it',
    assign: 'Who does it',
    yourself: 'You',
    ifYouWant: 'If you want',
    hours: '{n}h',
    riders: '{n} promised',
    late: 'LATE',
    slip: 'SLIP',
    first: 'FIRST',
    helper: 'helper',
    priced: 'costs money',
    open: 'Open',
    note: 'In the notebook',
    starred: 'starred',
    known: 'known',
    actual: 'came',
    cap: 'the room holds {n}',
    overCap: 'over what the room holds',
    heard: 'heard',
    reachable: 'could hear',
    usual: 'the usual',
    missed: 'missed',
    today: 'today',
    planned: 'planned',
    send: 'Send',
    sendPreview: 'What goes out',
    exposureNoBreak: 'If nobody comes you owe {total:money}.',
    door: 'The door: {paid} paid at {price:money}, {gross:money}',
    hat: 'Gas money: {hat:money}',
    gap: 'Short by {gap:money}',
    keepCustom: 'Split it the usual way (you keep {n:money})',
    keepFair: 'Keep only what is fair ({n:money})',
    keepNone: 'Keep nothing',
    playerNet: 'You',
    yours: 'yours',
    hold: 'Hold it', challenge: 'Challenge', release: 'Let it go', ask: 'Ask the room',
    expires: '{n} days left',
    mine: 'yours',
    someone: 'someone',
    from: 'From',
    signals: 'What you notice',
    learned: 'Learned',
    comments: 'What people said',
    luck: 'Luck',
    money: 'Money',
    dows: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    tourGood: 'a good night', tourThin: 'thin',
    rec: {
      DAY_START: 'A new day.', QUIET_DAY: 'A quiet day.', JOB_DONE: 'Done.', JOB_BLOCKED: 'Could not get to it.',
      SLIP: 'Something slipped.', HELPER_REPORT: 'A helper reported back.', MESSAGE: 'A message.',
      ASK_ANSWERED: 'An answer came back.', HOLD: 'A hold changed.', REQUEST_GONE: 'A request is gone.',
      EVENT: 'Something came up.', CHOICE: 'You chose.', OVERTIME: 'Overtime.', MONEY: 'Money moved.',
      STRESS: 'How you are holding up.', TRUST: 'Trust moved.', NEWS: 'News.', NOTE: 'A note.', RANGE: 'A guess narrowed.',
      NIGHT_START: 'Doors.', TICK: '', ARRIVALS: 'People coming in.', SET_START: 'A set starts.', SET_END: 'A set ends.',
      POST: 'A post.', INCIDENT: 'Something happened.', NIGHT_END: 'The night is over.', SETTLE_LINE: '',
      SETTLE_DONE: 'Settled.', SHOW_RESULT: 'How it went.', LEDGER: '', LUCK: '', COMMENT: '', LEARNED: 'Learned.',
      REGULARS: 'Regulars.', NAME: 'Your name.', WORD: 'The town\'s standing.', MEMORY: 'Remembered.', DRAW: '',
      WEEK_SUMMARY: 'The week.', BILLS: 'Bills.', LADDER: 'Bills.', STAGE: 'Something changed.', FIRST: 'A first.',
      OFFER: 'An offer.', TOUR_DATE: 'A tour date.', YEAR: 'A year.', ENDING: 'The end.'
    },
    chip: { HOURS: 'hours', MONEY: '', TRUST: 'trust', REL: 'with', STRESS: 'stress', RISK: 'risk', HEADS: 'people',
            WORD: 'standing', NAME: 'name', REGULARS: 'regulars', Q: 'the night' },
    confGlyph: ['▧', '◌', '◐', '●', '✓'],
    genGlyph: ['○', '◐', '●']
  };

  /* ---------------------------------------------------------------- */
  /* small helpers                                                    */
  /* ---------------------------------------------------------------- */

  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function L(key, ctx) { return SB.text.label(key, ctx); }
  function U(key, ctx) { return SB.text.label('ui.c.' + key, ctx); }
  /** A table or list of chrome (not a single label): read directly. */
  function T(key) { return SB.Content.ui.c[key]; }
  /* label() looks in SB.Content.strings first, then from the root of SB.Content; has() only from the root. */
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  /** A vocabulary word, or the fallback (never the raw key) when content has none. */
  function word(key, fallback) { return has(key) ? L(key) : (fallback === undefined ? '' : fallback); }
  function game() { return (SB.UI.game && SB.UI.game()) || null; }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function money(n) { return num(n) ? SB.text.money(n) : U('unknown'); }
  function pct(v, max) { if (!num(v) || !(max > 0)) return 0; return Math.max(0, Math.min(100, (v / max) * 100)); }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, '-'); }
  function pub(obj, key) { return obj && key !== 'hid' ? obj[key] : undefined; }
  function genKey(g) { return typeof g === 'number' ? ['KIDS', 'MIDDLE', 'OLD'][g] : g; }
  function genIdx(g) { return typeof g === 'number' ? g : (E.GEN[g] !== undefined ? E.GEN[g] : 0); }
  function fn(f) { return typeof f === 'function' ? f : null; }
  function vh(text) { return h('span', { class: 'sb-vh', text: text }); }
  function initials(name) {
    return String(name || '?').replace(/^the\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join('') || '?';
  }
  function lookup(table, id) { var s = game(); return (s && id && s[table]) ? s[table][id] || null : null; }
  function rangeText(v) {
    if (Array.isArray(v)) return Math.abs(v[0]) + '–' + Math.abs(v[1]);
    return String(Math.abs(v));
  }

  /** Inject an SB.Identity SVG with an accessible name, or a plain initials box when Identity is not there yet. */
  function identity(fnName, args, label, cls) {
    var I = SB.Identity, markup = null;
    if (I && typeof I[fnName] === 'function') {
      try { markup = I[fnName].apply(I, args); } catch (e) { SB.log('warn', 'C.' + fnName, String(e && e.message)); markup = null; }
    }
    if (markup && typeof markup === 'string') return SB.UI.svg(markup, label, cls);
    if (markup && markup.nodeType) {
      markup.setAttribute('role', 'img'); markup.setAttribute('aria-label', label || '');
      return h('span', { class: 'sb-svg ' + (cls || '') }, markup);
    }
    return h('span', { class: 'sb-mark-fallback ' + (cls || ''), role: 'img', aria: { label: label || '' }, text: initials(label) });
  }

  var C = SB.UI.C;

  /* ---------------------------------------------------------------- */
  /* plain desk controls                                              */
  /* ---------------------------------------------------------------- */

  /** Button({ label, onClick, kind: 'primary' | 'quiet' | 'danger' | 'hl', disabled, title, small, aria }) */
  C.Button = function (p) {
    p = p || {};
    return h('button', { type: 'button', class: ['sb-btn', 'pz-paper', 'pz-hl', p.kind ? 'sb-btn--' + p.kind : '', p.small ? 'sb-btn--small' : '', p.cls || ''],
                         disabled: !!p.disabled, title: p.title || null, aria: p.aria || null,
                         on: { click: function (e) { if (!p.disabled && fn(p.onClick)) p.onClick(e); } } },
             p.children || p.label || '');
  };

  /** Empty({ text }): the one empty state. */
  C.Empty = function (p) {
    return h('p', { class: 'sb-empty', text: (p && p.text) || U('none') });
  };

  /** Select({ label, value, options: [{ value, label, disabled }], onChange(value) }) */
  C.Select = function (p) {
    p = p || {};
    var sel = h('select', { class: 'sb-select', aria: { label: p.label || null },
                            on: { change: function (e) { if (fn(p.onChange)) p.onChange(e.target.value); } } },
      (p.options || []).map(function (o) {
        return h('option', { value: String(o.value), disabled: !!o.disabled, selected: String(o.value) === String(p.value) }, o.label);
      }));
    if (p.value !== undefined && p.value !== null) sel.value = String(p.value);
    return p.visibleLabel ? h('label', { class: 'sb-field' }, [h('span', { class: 'sb-field-label', text: p.label }), sel]) : sel;
  };

  /** Toggle({ label, on, onChange(bool), hint, disabled }) */
  C.Toggle = function (p) {
    p = p || {};
    var box = h('input', { type: 'checkbox', class: 'sb-toggle-input', checked: !!p.on, disabled: !!p.disabled,
                           on: { change: function (e) { if (fn(p.onChange)) p.onChange(!!e.target.checked); } } });
    return h('label', { class: 'sb-toggle' + (p.disabled ? ' is-disabled' : '') }, [
      box, h('span', { class: 'sb-toggle-label', text: p.label || '' }),
      p.hint ? h('span', { class: 'sb-toggle-hint', text: p.hint }) : null
    ]);
  };

  /** Tooltip({ text, children, term }): a wrapper whose tip shows on hover and focus. */
  C.Tooltip = function (p) {
    p = p || {};
    var id = 'sb-tip-' + Math.floor(Math.random() * 1e9).toString(36);
    return h('span', { class: 'sb-tip', tabindex: '0', aria: { describedby: id }, data: p.term ? { term: p.term } : null }, [
      p.children || '', h('span', { class: 'sb-tip-text', role: 'tooltip', id: id, text: p.text || '' })
    ]);
  };

  /** Tabs({ tabs: [{ key, label, badge }], active, onPick(key) }): a tablist with arrow keys. */
  C.Tabs = function (p) {
    p = p || {};
    var tabs = p.tabs || [], list;
    function pick(key) { if (fn(p.onPick)) p.onPick(key); }
    list = h('div', { class: 'sb-tabs', role: 'tablist', aria: { label: p.label || null },
      on: { keydown: function (e) {
        var i = tabs.map(function (t) { return t.key; }).indexOf(p.active), n = tabs.length;
        if (!n) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); pick(tabs[(i + 1) % n].key); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); pick(tabs[(i - 1 + n) % n].key); }
      } } },
      tabs.map(function (t) {
        var on = t.key === p.active;
        return h('button', { type: 'button', role: 'tab', class: 'sb-tab pz-hl' + (on ? ' is-active' : ''), tabindex: on ? '0' : '-1',
                             aria: { selected: on ? 'true' : 'false' }, on: { click: function () { pick(t.key); } } }, [
          t.label, (t.badge ? h('span', { class: 'sb-badge', text: String(t.badge) }) : null)
        ]);
      }));
    return list;
  };

  /** Table({ columns: [{ key, label, num, render(row) }], rows, onRow(row), empty, caption }) */
  C.Table = function (p) {
    p = p || {};
    var cols = p.columns || [], rows = p.rows || [];
    if (!rows.length) return C.Empty({ text: p.empty });
    return h('table', { class: 'sb-table' + (p.dense ? ' sb-table--dense' : '') }, [
      p.caption ? h('caption', { class: 'sb-vh', text: p.caption }) : null,
      h('thead', null, h('tr', null, cols.map(function (c) { return h('th', { scope: 'col', class: c.num ? 'is-num' : null, text: c.label || '' }); }))),
      h('tbody', null, rows.map(function (r) {
        var tr = h('tr', { class: fn(p.onRow) ? 'is-link' : null, tabindex: fn(p.onRow) ? '0' : null,
                           on: fn(p.onRow) ? { click: function () { p.onRow(r); }, keydown: function (e) { if (e.key === 'Enter') p.onRow(r); } } : null },
          cols.map(function (c) {
            var v = fn(c.render) ? c.render(r) : r[c.key];
            if (v === null || v === undefined || v === '') v = U('unknown');
            return h('td', { class: c.num ? 'is-num' : null }, typeof v === 'number' ? String(v) : v);
          }));
        return tr;
      }))
    ]);
  };

  /* ---------------------------------------------------------------- */
  /* identity wrappers                                                */
  /* ---------------------------------------------------------------- */

  /** GenGlyph({ gen, size }) */
  C.GenGlyph = function (p) {
    p = p || {};
    var key = genKey(p.gen), idx = genIdx(p.gen), size = p.size || 12, name = word('gen.' + key + '.name', lower(key)),
        el = (SB.Identity && typeof SB.Identity.genGlyph === 'function')
          ? identity('genGlyph', [idx, size], name, 'sb-gen sb-gen--' + idx)
          : h('span', { class: 'sb-gen sb-gen--' + idx, role: 'img', aria: { label: name }, text: T('genGlyph')[idx] || '?' });
    el.setAttribute('title', name);
    return el;
  };

  /** GenreTag({ genre, style, arrow: 'UP' | 'DOWN' | null }): with a style, the chip shows the style's tag in its genre's colours */
  C.GenreTag = function (p) {
    p = p || {};
    var st = p.style && E.STYLE_GENRE && E.STYLE_GENRE[p.style] ? p.style : null, g = p.genre || (st ? E.STYLE_GENRE[st] : p.genre),
        fam = (E.GENRE_FAMILY && E.GENRE_FAMILY[g]) || 'FAST',
        tag = st ? E.STYLE_TAG[st] : ((E.GENRE_TAG && E.GENRE_TAG[g]) || String(g || '').toUpperCase());
    return h('span', { class: 'sb-genre sb-fam-' + lower(fam), title: st ? word('style.' + st + '.name', st) : word('genre.' + g + '.name', g) }, [
      h('span', { class: 'sb-genre-tag', text: tag }),
      p.arrow === 'UP' ? [h('span', { class: 'sb-genre-arrow', aria: { hidden: 'true' }, text: '▲' }), vh(U('rising'))] : null,
      p.arrow === 'DOWN' ? [h('span', { class: 'sb-genre-arrow', aria: { hidden: 'true' }, text: '▼' }), vh(U('falling'))] : null
    ]);
  };

  /** BandMark({ band, size }) */
  C.BandMark = function (p) {
    var b = (p && p.band) || {}, size = (p && p.size) || 32;
    return identity('bandMark', [{ id: b.id, name: b.name, genre: b.genre }, size], b.name || '', 'sb-mark sb-mark--band sb-size-' + size);
  };
  /** PersonStamp({ person, size, past, watched }) */
  C.PersonStamp = function (p) {
    var x = (p && p.person) || {}, size = (p && p.size) || 32, name = x.name || [x.first, x.last].filter(Boolean).join(' ');
    return identity('personStamp', [{ id: x.id, first: x.first, last: x.last, instrument: x.instrument }, size, { past: !!p.past, watched: !!p.watched }],
      name, 'sb-mark sb-mark--person sb-size-' + size);
  };
  /** RoomDrawing({ room, width, height, houseType, style }) */
  C.RoomDrawing = function (p) {
    var r = (p && p.room) || {}, w = p.width || 160, ht = p.height || 100;
    return identity('roomDrawing', [{ id: r.id, kind: r.kind, cap: r.cap, sketch: r.sketch, standing: r.standing, name: r.name, outdoor: r.outdoor },
      w, ht, { houseType: p.houseType || r.houseType || null, style: p.style || null }], r.name || '', 'sb-mark sb-mark--room');
  };
  /** RoomGlyph({ kind, size, name }): the small kind glyph for lists and logs. */
  C.RoomGlyph = function (p) {
    p = p || {};
    return identity('roomGlyph', [p.kind, p.size || 16], p.name || word('room.' + p.kind + '.name', lower(p.kind)), 'sb-mark sb-mark--glyph');
  };
  /** BookerMark({ name, mark, size }) */
  C.BookerMark = function (p) {
    p = p || {};
    return identity('bookerMark', [p.name || '', p.mark || p.seed || p.name || '', p.size || 32], p.name || '', 'sb-mark sb-mark--booker');
  };
  /** CityStamp({ entry, size }) */
  C.CityStamp = function (p) {
    p = p || {};
    var e = p.entry || {};
    return identity('cityStamp', [e, p.size || 64], [e.name, e.state].filter(Boolean).join(', '), 'sb-mark sb-mark--city');
  };

  /* ---------------------------------------------------------------- */
  /* numbers                                                          */
  /* ---------------------------------------------------------------- */

  /** Money({ amount, signed }) */
  C.Money = function (p) {
    p = p || {};
    var a = p.amount, t;
    if (!num(a)) return h('span', { class: 'sb-money is-unknown', text: U('unknown') });
    t = SB.text.money(a);
    if (p.signed && a > 0) t = '+' + t;
    return h('span', { class: 'sb-money' + (p.signed ? (a < 0 ? ' is-neg' : (a > 0 ? ' is-pos' : '')) : '') , text: t });
  };

  var BAD_UP = { HOURS: 1, STRESS: 1, RISK: 1 };
  /** CostChip({ chip: { k, v, who } }) */
  C.CostChip = function (p) {
    var c = (p && p.chip) || {}, v = c.v, mid, dir, good, label, value;
    mid = Array.isArray(v) ? (Number(v[0]) + Number(v[1])) / 2 : Number(v);
    dir = mid > 0 ? 1 : (mid < 0 ? -1 : 0);
    good = dir === 0 ? null : ((dir > 0) !== !!BAD_UP[c.k]);
    label = (T('chip')[c.k] !== undefined) ? T('chip')[c.k] : lower(c.k);
    if (c.k === 'MONEY') value = Array.isArray(v) ? SB.text.money(Math.abs(v[0])) + '–' + SB.text.money(Math.abs(v[1])) : SB.text.money(Math.abs(mid || 0));
    else value = num(mid) || Array.isArray(v) ? rangeText(v) : U('unknown');
    return h('span', { class: ['sb-chip', 'sb-chip--' + lower(c.k), good === true ? 'is-good' : '', good === false ? 'is-bad' : ''] }, [
      h('span', { class: 'sb-chip-icon', aria: { hidden: 'true' } }),
      label ? h('span', { class: 'sb-chip-k', text: label + (c.who ? ' ' + c.who : '') }) : null,
      h('span', { class: 'sb-chip-v', text: value }),
      dir ? h('span', { class: 'sb-chip-dir', text: dir > 0 ? U('more') : U('less') }) : null
    ]);
  };

  var lastRange = {};   // RangeBar: the last width drawn per key, so a narrowing can animate. Display memory only.
  /** RangeBar({ view: RangeView | null, axisMax, unit, label, key }) */
  C.RangeBar = function (p) {
    p = p || {};
    var v = p.view, max = p.axisMax || (v && num(v.hi90) ? v.hi90 * 1.25 : 1) || 1, bar, fringe, core, tick, text, prev;
    if (!v) {
      return h('div', { class: 'sb-range is-empty', role: 'img', aria: { label: (p.label ? p.label + ': ' : '') + '?' } }, [
        h('div', { class: 'sb-range-track' }), h('span', { class: 'sb-range-text', text: '?' })
      ]);
    }
    text = (v.text || (v.lo90 + '–' + v.hi90)) + (p.unit ? ' ' + p.unit : '');
    fringe = h('div', { class: 'sb-range-fringe', style: { left: pct(v.lo90, max) + '%', width: Math.max(0.5, pct(v.hi90, max) - pct(v.lo90, max)) + '%' } });
    core = h('div', { class: 'sb-range-core', style: { left: pct(v.lo50, max) + '%', width: Math.max(0.5, pct(v.hi50, max) - pct(v.lo50, max)) + '%' } });
    tick = v.known ? h('div', { class: 'sb-range-tick', style: { left: pct((v.lo50 + v.hi50) / 2, max) + '%' } }) : null;
    bar = h('div', { class: 'sb-range-track' }, [fringe, core, tick]);
    if (p.key) {
      prev = lastRange[p.key];
      lastRange[p.key] = { left: fringe.style.left, width: fringe.style.width };
      if (prev && parseFloat(prev.width) > parseFloat(fringe.style.width) && !(SB.UI.prefs && SB.UI.prefs.reduced && SB.UI.prefs.reduced())) {
        var to = { left: fringe.style.left, width: fringe.style.width };
        fringe.style.left = prev.left; fringe.style.width = prev.width;
        fringe.className += ' is-narrowing';
        if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { fringe.style.left = to.left; fringe.style.width = to.width; });
        else { fringe.style.left = to.left; fringe.style.width = to.width; }
      }
    }
    return h('div', { class: 'sb-range' + (v.known ? ' is-known' : ''), role: 'img', aria: { label: (p.label ? p.label + ': ' : '') + text } }, [
      p.label ? h('span', { class: 'sb-range-label', text: p.label }) : null, bar, h('span', { class: 'sb-range-text', text: text })
    ]);
  };

  /** FiveWord({ cell: NoteCell }) */
  C.FiveWord = function (p) {
    var c = (p && p.cell) || {}, conf = num(c.conf) ? c.conf : 0, w, glyphs = T('confGlyph'), confName;
    confName = word('conf.' + (Object.keys(E.CONF).filter(function (k) { return E.CONF[k] === conf; })[0] || 'NONE'), '');
    if (c.word) w = word('five.' + c.word, lower(c.word));
    else if (c.smear) w = word('five.' + c.smear[0], lower(c.smear[0])) + '–' + word('five.' + c.smear[1], lower(c.smear[1]));
    else w = U('unknown');
    return h('span', { class: ['sb-five', 'sb-conf-' + conf, c.dir > 0 ? 'is-up' : (c.dir < 0 ? 'is-down' : ''), c.smear && !c.word ? 'is-smear' : ''],
                       title: confName, aria: { label: w + (confName ? ', ' + confName : '') } }, [
      h('span', { class: 'sb-five-glyph', aria: { hidden: 'true' }, text: glyphs[conf] || glyphs[0] }),
      h('span', { class: 'sb-five-word', aria: { hidden: 'true' }, text: w })
    ]);
  };

  /** WindowBar({ window: WindowView, today, planned: day | null, size: 6 | 10 | 16 }) */
  C.WindowBar = function (p) {
    p = p || {};
    var w = p.window || { state: 'NONE', label: '' }, size = p.size || 10, segs = [], a, b, span, today = p.today,
        lo, hi, marks = [];
    function n(x) { return num(x) ? x : null; }
    var opens = n(w.opens), ideal = n(w.idealUntil), late = n(w.lateFrom), missed = n(w.missedAt);
    function seg(cls, from, to) {
      if (from === null || to === null || to < from) return;
      segs.push(h('span', { class: 'sb-win-seg sb-win--' + cls, style: { left: pct(from - a, span) + '%', width: pct(to - from + 1, span) + '%' } }));
    }
    lo = [opens, ideal, late, missed, n(today), n(p.planned)].filter(function (x) { return x !== null; });
    if (lo.length) {
      a = Math.min.apply(null, lo); b = Math.max.apply(null, lo); hi = b + 1; span = Math.max(1, hi - a);
      if (opens !== null && opens > a) seg('early', a, opens - 1);
      if (opens !== null || ideal !== null) seg('open', opens !== null ? opens : a, ideal !== null ? ideal : (late !== null ? late - 1 : b));
      if (ideal !== null && late !== null && late - 1 > ideal) seg('closing', ideal + 1, late - 1);
      if (late !== null) seg('late', late, missed !== null ? missed - 1 : b);
      if (missed !== null) seg('missed', missed, b);
      if (n(today) !== null) marks.push(h('span', { class: 'sb-win-today', title: U('today'), style: { left: pct(today - a + 0.5, span) + '%' } }));
      if (n(p.planned) !== null) marks.push(h('span', { class: 'sb-win-planned', title: U('planned'), text: '◆', style: { left: pct(p.planned - a + 0.5, span) + '%' } }));
    }
    return h('div', { class: 'sb-win sb-win-size-' + size + ' is-' + lower(w.state), role: 'img', aria: { label: w.label || word('window.' + w.state, lower(w.state)) } }, [
      h('div', { class: 'sb-win-track' }, segs.concat(marks)),
      size >= 16 ? h('span', { class: 'sb-win-label', text: w.label || '' }) : null
    ]);
  };

  /** ReachStrip({ strip: { gens: [{ heard, reachable, usual, missed }] }, compact }) */
  C.ReachStrip = function (p) {
    p = p || {};
    var gens = (p.strip && p.strip.gens) || [], max = 1.2;
    gens.forEach(function (g) {
      [g.heard && g.heard.hi, g.reachable && g.reachable.hi, g.usual].forEach(function (x) { if (num(x) && x > max) max = x; });
    });
    if (!gens.length) return h('div', { class: 'sb-reach is-empty', text: U('unknown') });
    return h('div', { class: 'sb-reach' + (p.compact ? ' is-compact' : ''), role: 'group', aria: { label: U('heard') } }, gens.map(function (g, i) {
      var parts = [], label;
      if (g.reachable) parts.push(h('span', { class: 'sb-reach-reachable', title: U('reachable'), style: { left: pct(g.reachable.lo, max) + '%', width: Math.max(0.5, pct(g.reachable.hi, max) - pct(g.reachable.lo, max)) + '%' } }));
      if (g.heard) parts.push(h('span', { class: 'sb-reach-heard', title: U('heard'), style: { left: pct(g.heard.lo, max) + '%', width: Math.max(0.5, pct(g.heard.hi, max) - pct(g.heard.lo, max)) + '%' } }));
      if (num(g.usual)) parts.push(h('span', { class: 'sb-reach-usual', title: U('usual'), style: { left: pct(g.usual, max) + '%' } }));
      if (num(g.missed) && g.missed > 0) parts.push(h('span', { class: 'sb-reach-missed', title: U('missed'), style: { left: pct((g.reachable ? g.reachable.hi : 0), max) + '%', width: pct(g.missed, max) + '%' } }));
      label = word('gen.' + genKey(i) + '.short', '') + ': ' + U('heard') + ' ' + (g.heard ? Math.round(g.heard.lo * 100) + '–' + Math.round(g.heard.hi * 100) + '%' : U('unknown')) +
              (g.reachable ? ', ' + U('reachable') + ' ' + Math.round(g.reachable.hi * 100) + '%' : '') +
              (num(g.missed) && g.missed > 0 ? ', ' + U('missed') + ' ' + Math.round(g.missed * 100) + '%' : '');
      return h('div', { class: 'sb-reach-row', aria: { label: label } }, [
        C.GenGlyph({ gen: i, size: 10 }), h('div', { class: 'sb-reach-track' }, parts),
        (!p.compact && num(g.missed) && g.missed > 0) ? h('span', { class: 'sb-reach-missed-label', text: U('missed') + ' ' + Math.round(g.missed * 100) + '%' }) : null
      ]);
    }));
  };

  /** ExpectationBar({ lo, hi, par, actual, cap, byGen: [{ lo, hi, actual }] | null, word }) */
  C.ExpectationBar = function (p) {
    p = p || {};
    var vals = [p.lo, p.hi, p.par, p.actual, p.cap].filter(num), max = Math.max(10, Math.max.apply(null, vals.concat([0])) * 1.1),
        over = num(p.cap) && num(p.actual) && p.actual > p.cap, kids = [], aria;
    if (num(p.lo) && num(p.hi)) kids.push(h('span', { class: 'sb-exp-call', title: word('names.call', ''), style: { left: pct(p.lo, max) + '%', width: Math.max(0.5, pct(p.hi, max) - pct(p.lo, max)) + '%' } }));
    if (num(p.par)) kids.push(h('span', { class: 'sb-exp-par', style: { left: pct(p.par, max) + '%' } }, h('span', { class: 'sb-exp-par-label', text: word('names.par', 'par') })));
    if (num(p.cap)) kids.push(h('span', { class: 'sb-exp-cap' + (over ? ' is-over' : ''), title: U('cap', { n: p.cap }), style: { left: pct(p.cap, max) + '%' } }));
    if (num(p.actual)) kids.push(h('span', { class: 'sb-exp-actual', title: U('actual'), style: { left: pct(p.actual, max) + '%' } }));
    aria = [num(p.lo) && num(p.hi) ? word('names.call', '') + ' ' + p.lo + '–' + p.hi : null, num(p.par) ? word('names.par', '') + ' ' + p.par : null,
            num(p.actual) ? p.actual + ' ' + U('actual') : null, over ? U('overCap') : null, p.word || null].filter(Boolean).join(', ');
    return h('div', { class: 'sb-exp', role: 'img', aria: { label: aria } }, [
      h('div', { class: 'sb-exp-track' }, kids),
      h('div', { class: 'sb-exp-legend' }, [
        num(p.actual) ? h('span', { class: 'sb-exp-n', text: String(p.actual) }) : null,
        p.word ? h('span', { class: 'sb-exp-word', text: p.word }) : null,
        over ? h('span', { class: 'sb-exp-over', text: U('overCap') }) : null
      ]),
      Array.isArray(p.byGen) ? h('div', { class: 'sb-exp-gens' }, p.byGen.map(function (g, i) {
        var gmax = Math.max(5, [g.lo, g.hi, g.actual].filter(num).reduce(function (a, b) { return Math.max(a, b); }, 0) * 1.2);
        return h('div', { class: 'sb-exp-gen' }, [
          C.GenGlyph({ gen: i, size: 10 }),
          h('div', { class: 'sb-exp-track sb-exp-track--gen' }, [
            num(g.lo) && num(g.hi) ? h('span', { class: 'sb-exp-call', style: { left: pct(g.lo, gmax) + '%', width: Math.max(0.5, pct(g.hi, gmax) - pct(g.lo, gmax)) + '%' } }) : null,
            num(g.actual) ? h('span', { class: 'sb-exp-actual', style: { left: pct(g.actual, gmax) + '%' } }) : null
          ]),
          h('span', { class: 'sb-exp-n', text: num(g.actual) ? String(g.actual) : (num(g.lo) ? g.lo + '–' + g.hi : U('unknown')) })
        ]);
      })) : null
    ]);
  };

  /** Sparkline({ points: [{ v, observed }], width, height, label }) */
  C.Sparkline = function (p) {
    p = p || {};
    var pts = (p.points || []).filter(function (x) { return x && num(x.v); }), w = p.width || 120, ht = p.height || 24,
        lo, hi, segs = [], i, x, y, prev = null, d = [];
    if (!pts.length) return h('span', { class: 'sb-spark is-empty', text: U('unknown') });
    lo = Math.min.apply(null, pts.map(function (q) { return q.v; })); hi = Math.max.apply(null, pts.map(function (q) { return q.v; }));
    if (hi === lo) { hi = lo + 1; }
    for (i = 0; i < pts.length; i++) {
      x = pts.length === 1 ? w / 2 : (i / (pts.length - 1)) * (w - 2) + 1;
      y = ht - 2 - ((pts[i].v - lo) / (hi - lo)) * (ht - 4);
      if (prev) segs.push(h('line', { x1: prev.x.toFixed(1), y1: prev.y.toFixed(1), x2: x.toFixed(1), y2: y.toFixed(1),
                                     class: pts[i].observed && prev.observed ? 'sb-spark-seen' : 'sb-spark-guess' }));
      prev = { x: x, y: y, observed: !!pts[i].observed };
      d.push(Math.round(pts[i].v));
    }
    return h('span', { class: 'sb-spark', role: 'img', aria: { label: (p.label ? p.label + ': ' : '') + d.join(', ') } },
      h('svg', { width: w, height: ht, viewBox: '0 0 ' + w + ' ' + ht, 'aria-hidden': 'true', focusable: 'false' }, segs));
  };

  /** TrustBar({ value, stage }) */
  C.TrustBar = function (p) {
    p = p || {};
    var v = num(p.value) ? Math.max(0, Math.min(100, p.value)) : null, stage = p.stage ? word('stage.' + p.stage, lower(p.stage)) : '';
    return h('div', { class: 'sb-trust', role: 'img', aria: { label: stage + (v !== null ? ' (' + Math.round(v) + ')' : '') } }, [
      h('div', { class: 'sb-trust-track' }, v === null ? null : h('span', { class: 'sb-trust-mark', style: { left: v + '%' } })),
      h('span', { class: 'sb-trust-word', text: stage })
    ]);
  };

  /** Stamp({ k: STAMP, text }) */
  C.Stamp = function (p) {
    p = p || {};
    var t = p.text || (p.k ? word('stamp.' + p.k, String(p.k).replace(/_/g, ' ')) : '');
    return h('span', { class: 'sb-stamp sb-stamp--' + lower(p.k || 'x'), text: t });
  };

  /* ---------------------------------------------------------------- */
  /* shows                                                            */
  /* ---------------------------------------------------------------- */

  var DEAD = { PLAYED: 1, CANCELLED: 1, DROPPED: 1, OVER: 1 };
  /** ShowBadge({ show, size, letter }): a letter in a square, by order among live shows, with the top band's mark. */
  C.ShowBadge = function (p) {
    p = p || {};
    var s = p.show || {}, st = game(), letter = p.letter, live, band = null, top;
    if (!letter && st && st.shows) {
      live = Object.keys(st.shows).map(function (k) { return st.shows[k]; })
        .filter(function (x) { return x && !DEAD[x.status]; })
        .sort(function (a, b) { return (a.day - b.day) || (String(a.id) < String(b.id) ? -1 : 1); });
      live.forEach(function (x, i) { if (x.id === s.id) letter = String.fromCharCode(65 + (i % 26)); });
    }
    top = s.bill && s.bill.billing && s.bill.billing[0];
    if (top) band = lookup('bands', top);
    return h('span', { class: 'sb-showbadge sb-size-' + (p.size || 20), title: band ? band.name : null }, [
      h('span', { class: 'sb-showbadge-letter', text: letter || '·' }),
      band && (p.size || 20) >= 20 ? C.BandMark({ band: band, size: 16 }) : null
    ]);
  };

  /** ExposureLine({ exposure: { total, lines, breakEven } }) */
  C.ExposureLine = function (p) {
    var x = (p && p.exposure) || null, text;
    if (!x || !num(x.total)) return h('p', { class: 'sb-exposure is-unknown', text: U('unknown') });
    text = (x.breakEven !== null && x.breakEven !== undefined && has('requests.exposure'))
      ? SB.text.render(SB.Content.requests.exposure, { total: x.total, breakEven: x.breakEven })
      : U('exposureNoBreak', { total: x.total });
    return h('p', { class: 'sb-exposure' }, [
      C.Tooltip({ text: (x.lines || []).map(function (l) { return (l.label || lower(l.cat)) + ' ' + SB.text.money(l.amount || 0); }).join(' · '), children: text })
    ]);
  };

  /** Promises({ riders: [JobView], onToggle(jobId, on) }) */
  C.Promises = function (p) {
    p = p || {};
    var riders = p.riders || [];
    if (!riders.length) return null;
    return h('ul', { class: 'sb-promises' }, riders.map(function (r) {
      var on = r.status === 'PROMISED' || r.status === 'DONE' || !!r.planned;
      return h('li', { class: 'sb-promise' + (on ? ' is-on' : '') }, [
        h('label', { class: 'sb-promise-row' }, [
          h('input', { type: 'checkbox', checked: on, disabled: r.status === 'DONE' || !fn(p.onToggle),
                       on: { change: function (e) { if (fn(p.onToggle)) p.onToggle(r.id, !!e.target.checked); } } }),
          h('span', { class: 'sb-promise-label', text: r.label || '' }),
          num(r.hours) && r.hours ? h('span', { class: 'sb-promise-h', text: U('hours', { n: r.hours }) }) : null,
          r.cost ? h('span', { class: 'sb-promise-cost', text: (r.cost.lo === r.cost.hi ? SB.text.money(r.cost.lo) : SB.text.money(r.cost.lo) + '–' + SB.text.money(r.cost.hi)) }) : null
        ]),
        !on && (r.text || r.why) ? h('p', { class: 'sb-promise-unticked', text: r.text || r.why }) : null
      ]);
    }));
  };

  /** PriceMenu({ opt: { kind, chosen, choices: [{ key, label, cost, chips, enabled, why }] }, onChoose(key) }) */
  C.PriceMenu = function (p) {
    p = p || {};
    var o = p.opt || { choices: [] }, name = 'sb-price-' + Math.floor(Math.random() * 1e9).toString(36);
    return h('fieldset', { class: 'sb-price' }, [
      h('legend', { class: 'sb-vh', text: U('priced') }),
      (o.choices || []).map(function (c) {
        return h('label', { class: 'sb-price-row' + (c.enabled === false ? ' is-disabled' : '') + (o.chosen === c.key ? ' is-chosen' : '') }, [
          h('input', { type: 'radio', name: name, value: c.key, checked: o.chosen === c.key, disabled: c.enabled === false,
                       on: { change: function () { if (fn(p.onChoose)) p.onChoose(c.key); } } }),
          h('span', { class: 'sb-price-label', text: c.label || word('printRun.' + c.key, c.key) }),
          num(c.cost) ? C.CostChip({ chip: { k: 'MONEY', v: -c.cost } }) : null,
          (c.chips || []).map(function (ch) { return C.CostChip({ chip: ch }); }),
          c.enabled === false && c.why ? h('span', { class: 'sb-why', text: c.why }) : null
        ]);
      })
    ]);
  };

  /** JobToken({ job: JobView, onPick(job) }): a day-grid chip. */
  C.JobToken = function (p) {
    p = p || {};
    var j = p.job || {}, riders = j.riders || [], show = j.showId ? lookup('shows', j.showId) : null, hours = num(j.hours) ? j.hours : 0,
        ticked = riders.filter(function (r) { return r.status === 'PROMISED' || !!r.planned; }), st = (j.window && j.window.state) || 'NONE',
        lateish = st === 'LATE' || st === 'MISSED';
    ticked.forEach(function (r) { if (num(r.hours)) hours += r.hours; });
    return h('button', { type: 'button', class: ['sb-token', 'pz-hl', 'is-' + lower(st), j.helper || (j.by && j.by !== 'player') ? 'has-helper' : ''],
                         style: { '--h': String(Math.max(0.5, hours)) }, data: { job: j.id },
                         aria: { label: [j.label, U('hours', { n: hours }), j.window && j.window.label, lateish ? U('late') : null].filter(Boolean).join(', ') },
                         on: { click: function () { if (fn(p.onPick)) p.onPick(j); } } }, [
      h('span', { class: 'sb-token-stripe', aria: { hidden: 'true' } }),
      show ? C.ShowBadge({ show: show, size: 16 }) : null,
      h('span', { class: 'sb-token-verb', text: j.label || '' }),
      h('span', { class: 'sb-token-h', text: U('hours', { n: hours }) }),
      (j.by && j.by !== 'player' && j.byName) ? h('span', { class: 'sb-token-helper', text: initials(j.byName), title: j.byName }) : null,
      lateish ? C.Stamp({ k: 'LATE' }) : null,
      riders.length ? h('span', { class: 'sb-token-riders', title: U('riders', { n: ticked.length }), text: String(ticked.length) + '/' + riders.length }) : null,
      j.opt ? h('span', { class: 'sb-token-money', title: U('priced'), text: '$' }) : null
    ]);
  };

  /** JobCard({ job: JobView, people: [PersonView], onPlan, onAssign, onOpt, onPromise, today }) */
  C.JobCard = function (p) {
    p = p || {};
    var j = p.job || {}, people = p.people || [];
    return h('article', { class: ['sb-jobcard', 'is-' + lower((j.window && j.window.state) || 'none'), j.optional ? 'is-optional' : ''], data: { job: j.id } }, [
      h('header', { class: 'sb-jobcard-head' }, [
        j.showId && lookup('shows', j.showId) ? C.ShowBadge({ show: lookup('shows', j.showId), size: 20 }) : null,
        h('h4', { class: 'sb-jobcard-verb', text: j.label || '' }),
        h('span', { class: 'sb-jobcard-h', text: num(j.hours) ? U('hours', { n: j.hours }) : U('unknown') })
      ]),
      j.window ? C.WindowBar({ window: j.window, today: p.today, planned: j.planned && num(p.weekStart) ? p.weekStart + j.planned.dayIdx : null, size: 10 }) : null,
      j.why ? h('p', { class: 'sb-jobcard-why', text: j.why }) : null,
      j.helperOk && fn(p.onAssign) ? C.Select({ label: U('assign'), value: j.helper || j.by || 'player',
        options: [{ value: 'player', label: U('yourself') }].concat(people.map(function (x) { return { value: x.id, label: x.name || [x.first, x.last].filter(Boolean).join(' ') }; })),
        onChange: function (v) { p.onAssign(j.id, v); } }) : null,
      j.opt ? C.PriceMenu({ opt: j.opt, onChoose: function (k) { if (fn(p.onOpt)) p.onOpt(j.id, k); } }) : null,
      (j.riders && j.riders.length) ? C.Promises({ riders: j.riders, onToggle: fn(p.onPromise) }) : null,
      fn(p.onPlan) ? C.Button({ label: U('plan'), small: true, onClick: function () { p.onPlan(j); } }) : null
    ]);
  };

  /** DecisionCard({ decision: Decision, onChoose(optionId), compact }) */
  C.DecisionCard = function (p) {
    p = p || {};
    var d = p.decision || { options: [] }, opts = (d.options || []).slice(0, 4), el, buttons;
    function choose(o) { if (o && o.enabled !== false && fn(p.onChoose)) p.onChoose(o.id); }
    buttons = opts.map(function (o, i) {
      return h('li', { class: 'sb-decision-opt' + (o.enabled === false ? ' is-disabled' : '') }, [
        h('button', { type: 'button', class: 'sb-btn pz-paper pz-hl sb-decision-btn', disabled: o.enabled === false, data: { option: o.id },
                      on: { click: function () { choose(o); } } }, [
          h('span', { class: 'sb-key', text: String(i + 1) }), h('span', { class: 'sb-decision-label', text: o.label || '' })
        ]),
        (o.costs && o.costs.length) ? h('span', { class: 'sb-chips' }, o.costs.map(function (c) { return C.CostChip({ chip: c }); })) : null,
        o.likely ? h('p', { class: 'sb-decision-likely' }, [h('span', { class: 'sb-decision-likely-k', text: U('likely') + ' ' }), o.likely]) : null,
        o.enabled === false && o.why ? h('p', { class: 'sb-why', text: o.why }) : null
      ]);
    });
    el = h('section', { class: 'sb-decision' + (p.compact ? ' is-compact' : ''), role: 'group', tabindex: '-1', aria: { live: 'assertive', label: d.title || '' },
                        on: { keydown: function (e) { var n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length) { e.preventDefault(); choose(opts[n - 1]); } } } }, [
      d.title ? h('h2', { class: 'sb-decision-title', text: d.title }) : null,
      d.body ? h('p', { class: 'sb-decision-body', text: d.body }) : null,
      h('ol', { class: 'sb-decision-opts' }, buttons)
    ]);
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { try { if (el.focus) el.focus(); } catch (e) { /* not attached */ } });
    return el;
  };

  /** Comment({ comment: Comment, onNote(noteKey, comment) }) */
  C.Comment = function (p) {
    var c = (p && p.comment) || {}, cause = c.cause ? word('notebook.cause.' + c.cause + '.title', lower(c.cause)) : null;
    return h('blockquote', { class: 'sb-comment' + (c.starred ? ' is-starred' : '') + (c.dir < 0 ? ' is-down' : (c.dir > 0 ? ' is-up' : '')) }, [
      c.starred ? h('span', { class: 'sb-comment-star', title: U('starred'), text: '★' }) : null,
      h('p', { class: 'sb-comment-text', text: c.text || '' }),
      h('footer', { class: 'sb-comment-by' }, [
        h('span', { class: 'sb-comment-who', text: c.byName || '' }),
        cause ? (fn(p.onNote) && c.noteKey
          ? h('button', { type: 'button', class: 'sb-chip sb-chip--cause sb-link pz-hl', on: { click: function () { p.onNote(c.noteKey, c); } } }, cause)
          : h('span', { class: 'sb-chip sb-chip--cause', text: cause })) : null
      ])
    ]);
  };

  /** Ledger({ rows: [LedgerRow] }): the three-column close-out ledger: Par above, the total below. */
  C.Ledger = function (p) {
    var rows = (p && p.rows) || [], par = rows.filter(function (r) { return r.col === 'PAR'; }),
        total = rows.filter(function (r) { return r.col === 'TOTAL'; }), cols = ['YOURS', 'HIDDEN', 'LUCK', 'REST'];
    function row(r) {
      return h('tr', { class: 'sb-ledger-row sb-ledger--' + lower(r.col) }, [
        h('th', { scope: 'row', text: r.label || word('feedback.ledger.' + r.col, '') }),
        h('td', { class: 'is-num' + (r.d < 0 ? ' is-neg' : (r.d > 0 ? ' is-pos' : '')), text: num(r.d) ? (r.col === 'PAR' || r.col === 'TOTAL' ? String(Math.round(r.d)) : (r.d > 0 ? '+' : (r.d < 0 ? '−' : '')) + Math.abs(Math.round(r.d))) : U('unknown') })
      ]);
    }
    if (!rows.length) return C.Empty({});
    return h('div', { class: 'sb-ledger' }, [
      h('table', { class: 'sb-ledger-par' }, h('tbody', null, par.map(row))),
      h('div', { class: 'sb-ledger-cols' }, cols.map(function (k) {
        var rs = rows.filter(function (r) { return r.col === k; });
        if (!rs.length) return null;
        return h('table', { class: 'sb-ledger-col sb-ledger-col--' + lower(k) }, [
          h('caption', { text: word('feedback.ledger.' + k, lower(k)) }), h('tbody', null, rs.map(row))
        ]);
      })),
      h('table', { class: 'sb-ledger-total' }, h('tbody', null, total.map(row)))
    ]);
  };

  /** ShowResult({ show }): verdict line, ExpectationBar with generations, Ledger, luck, comments, learned, money, stamps. */
  C.ShowResult = function (p) {
    p = p || {};
    var s = p.show || {}, r = s.result, room = s.roomId ? lookup('rooms', s.roomId) : null, stamps;
    if (!r) return C.Empty({});
    stamps = (r.memory && r.memory.stamps) || [];
    return h('section', { class: 'sb-result' }, [
      r.verdictLine ? h('p', { class: 'sb-result-verdict', text: r.verdictLine }) : null,
      C.ExpectationBar({ lo: r.call && r.call.lo, hi: r.call && r.call.hi, par: r.par && r.par.heads, actual: r.heads,
                         cap: room ? room.cap : null, word: r.vsPar ? word('vsPar.' + r.vsPar, lower(r.vsPar)) : null,
                         byGen: Array.isArray(r.byGen) ? r.byGen.map(function (a) { return { lo: null, hi: null, actual: num(a) ? Math.round(a) : null }; }) : null }),
      stamps.length ? h('div', { class: 'sb-result-stamps' }, stamps.map(function (k) { return C.Stamp({ k: k }); })) : null,
      r.ledger && r.ledger.length ? C.Ledger({ rows: r.ledger }) : null,
      (r.luck && r.luck.length) ? h('ul', { class: 'sb-result-luck', aria: { label: U('luck') } }, r.luck.map(function (l) { return h('li', { text: l.text || '' }); })) : null,
      (r.comments && r.comments.length) ? h('div', { class: 'sb-result-comments', role: 'group', aria: { label: U('comments') } },
        r.comments.map(function (c) { return C.Comment({ comment: c, onNote: p.onNote }); })) : null,
      (r.learned && r.learned.length) ? h('ul', { class: 'sb-result-learned', aria: { label: U('learned') } },
        r.learned.map(function (l) { return h('li', { class: 'sb-learned', text: l.text || l.label || '' }); })) : null,
      h('div', { class: 'sb-result-money' }, [
        h('span', { class: 'sb-result-money-k', text: U('playerNet') }), C.Money({ amount: r.playerNet, signed: true }),
        r.door && num(r.door.gross) ? h('span', { class: 'sb-result-door', text: U('door', { paid: r.paid, price: r.door.price || 0, gross: r.door.gross }) }) : null
      ])
    ]);
  };

  /** Envelope({ view: SettleView, lines: [SETTLE_LINE records], onChoose(choice) }): the kraft envelope.
   *  choice is the second argument of Night.settle: { shortfall, keep }. */
  C.Envelope = function (p) {
    p = p || {};
    var v = p.view || null, lines = p.lines || [], kids = [], split, done = !!p.done;
    if (v && v.door) {
      kids.push(h('p', { class: 'sb-env-door', text: U('door', { paid: v.door.paid, price: v.door.price || 0, gross: v.door.gross || 0 }) }));
      if (v.door.hat) kids.push(h('p', { class: 'sb-env-door', text: U('hat', { hat: v.door.hat }) }));
    }
    kids.push(h('ol', { class: 'sb-env-lines' }, lines.map(function (l, i) {
      return h('li', { class: 'sb-env-line', style: { '--i': String(i) } }, [
        h('span', { class: 'sb-env-label', text: l.label || l.text || '' }),
        C.Money({ amount: l.amount }), num(l.running) ? h('span', { class: 'sb-env-running', text: SB.text.money(l.running) }) : null
      ]);
    })));
    if (v && !done && fn(p.onChoose)) {
      if (num(v.gap) && v.gap > 0) {
        kids.push(h('p', { class: 'sb-env-gap', text: U('gap', { gap: v.gap }) }));
        kids.push(h('ul', { class: 'sb-env-short' }, (v.shortfall || []).map(function (o) {
          return h('li', null, [
            C.Button({ label: o.label || lower(o.k), disabled: o.enabled === false, onClick: function () { p.onChoose({ shortfall: o.k, keep: 0 }); } }),
            (o.costs || []).map(function (c) { return C.CostChip({ chip: c }); }),
            o.enabled === false && o.why ? h('span', { class: 'sb-why', text: o.why }) : null
          ]);
        })));
      } else {
        split = v.split || {};
        kids.push(h('div', { class: 'sb-env-split' }, [
          split.custom && num(split.custom[2]) ? C.Button({ kind: 'primary', label: U('keepCustom', { n: split.custom[2] }), onClick: function () { p.onChoose({ shortfall: null, keep: split.custom[2] }); } }) : null,
          num(split.fairMax) ? C.Button({ label: U('keepFair', { n: split.fairMax }), onClick: function () { p.onChoose({ shortfall: null, keep: split.fairMax }); } }) : null,
          C.Button({ kind: 'quiet', label: U('keepNone'), onClick: function () { p.onChoose({ shortfall: null, keep: 0 }); } })
        ]));
      }
    }
    return h('section', { class: 'sb-envelope' }, kids);
  };

  /* ---------------------------------------------------------------- */
  /* mail                                                             */
  /* ---------------------------------------------------------------- */

  /** MessageBody({ message: MessageView, signals: [{ key, text, good }] }) */
  C.MessageBody = function (p) {
    p = p || {};
    var m = p.message || {}, sig = p.signals || [];
    return h('article', { class: 'sb-message' }, [
      h('header', { class: 'sb-message-head' }, [
        h('span', { class: 'sb-message-from', text: m.fromName || '' }),
        num(m.day) ? h('span', { class: 'sb-message-day', text: SB.time.fmt(m.day, 'short') }) : null,
        m.subject ? h('h3', { class: 'sb-message-subject', text: m.subject }) : null
      ]),
      h('div', { class: 'sb-message-body', text: m.body || m.text || '' }),
      sig.length ? h('ul', { class: 'sb-message-signals', aria: { label: U('signals') } }, sig.map(function (s) {
        return h('li', { class: 'sb-signal' + (s.good === true ? ' is-good' : (s.good === false ? ' is-bad' : '')), text: s.text || '' });
      })) : null
    ]);
  };

  /** Composer({ text, toggles: [{ key, label, on, onChange(bool), disabled }], onSend, sendLabel, exposure }) */
  C.Composer = function (p) {
    p = p || {};
    return h('section', { class: 'sb-composer' }, [
      h('h4', { class: 'sb-composer-k', text: U('sendPreview') }),
      h('div', { class: 'sb-composer-preview', text: p.text || '' }),
      (p.toggles || []).length ? h('div', { class: 'sb-composer-toggles' }, p.toggles.map(function (t) {
        return C.Toggle({ label: t.label, on: t.on, disabled: t.disabled, onChange: t.onChange });
      })) : null,
      p.exposure ? C.ExposureLine({ exposure: p.exposure }) : null,
      fn(p.onSend) ? C.Button({ kind: 'primary', label: p.sendLabel || U('send'), disabled: !!p.disabled, onClick: function () { p.onSend(); } }) : null
    ]);
  };

  /* ---------------------------------------------------------------- */
  /* calendars                                                        */
  /* ---------------------------------------------------------------- */

  /** MiniMonth({ fromDay, days, cells: [{ day, marks: [string | { k, text }] }], onPick(day), selected }) */
  C.MiniMonth = function (p) {
    p = p || {};
    var from = num(p.fromDay) ? p.fromDay : 0, n = p.days || 35, start = from - SB.time.dow(from), end = from + n, byDay = {}, cells = [], d, i,
        m0 = SB.time.fmt(from, 'month'), m1 = SB.time.fmt(end - 1, 'month'), y0 = SB.time.year(from), y1 = SB.time.year(end - 1),
        span = m0 === m1 && y0 === y1 ? m0 + ' ' + y0 : m0 + (y0 !== y1 ? ' ' + y0 : '') + ' – ' + m1 + ' ' + y1;
    (p.cells || []).forEach(function (c) { byDay[c.day] = c; });
    /* the months shown, above the grid; each first of a month (and the first cell) carries its month's short name */
    cells.push(h('span', { class: 'sb-mm-months', aria: { hidden: 'true' }, text: span }));
    for (i = 0; i < 7; i++) cells.push(h('span', { class: 'sb-mm-dow', aria: { hidden: 'true' }, text: T('dows')[i] }));
    for (d = start; d < end; d++) {
      (function (day) {
        var c = byDay[day], marks = (c && c.marks) || [], inRange = day >= from, words = marks.map(function (m) { return typeof m === 'string' ? m : (m.text || m.k); }).filter(Boolean),
            dt = SB.time.date(day), monthTag = day === start || dt.d === 1;
        cells.push(h(inRange && fn(p.onPick) ? 'button' : 'span', {
          type: inRange && fn(p.onPick) ? 'button' : null,
          class: ['sb-mm-day', inRange && fn(p.onPick) ? 'pz-hl' : '', inRange ? '' : 'is-out', p.selected === day ? 'is-selected' : '', monthTag ? 'is-month-start' : ''].concat(marks.map(function (m) { return 'is-' + lower(typeof m === 'string' ? m : m.k); })),
          aria: { label: SB.time.fmt(day, 'long') + ', ' + dt.y + (words.length ? ': ' + words.join(', ') : ''), pressed: inRange && fn(p.onPick) ? (p.selected === day ? 'true' : 'false') : null },
          on: inRange && fn(p.onPick) ? { click: function () { p.onPick(day); } } : null
        }, [monthTag ? h('span', { class: 'sb-mm-mon', aria: { hidden: 'true' }, text: SB.time.fmt(day, 'md').split(' ')[0] }) : null,
            h('span', { class: 'sb-mm-n', aria: { hidden: 'true' }, text: String(dt.d) }), marks.length ? h('span', { class: 'sb-mm-mark', aria: { hidden: 'true' } }) : null]));
      })(d);
    }
    return h('div', { class: 'sb-minimonth', role: 'group', aria: { label: span } }, cells);
  };

  /** HoldStack({ cell: DayCell, onHold(day), onChallenge(day), onRelease(day), onAsk(day) }) */
  C.HoldStack = function (p) {
    p = p || {};
    var c = p.cell || { holds: [] }, holds = (c.holds || []).slice().sort(function (a, b) { return (a.rank || 0) - (b.rank || 0); }),
        mine = holds.some(function (x) { return x.mine; });
    return h('section', { class: 'sb-holds' }, [
      h('header', { class: 'sb-holds-head' }, [
        num(c.day) ? h('span', { class: 'sb-holds-day', text: SB.time.fmt(c.day, 'short') }) : null,
        c.label ? h('span', { class: 'sb-holds-state', text: c.label }) : null
      ]),
      holds.length ? h('ol', { class: 'sb-holds-list' }, holds.map(function (x) {
        return h('li', { class: 'sb-hold is-' + lower(x.state) + (x.mine ? ' is-mine' : '') }, [
          h('span', { class: 'sb-hold-rank', text: String(x.rank || '') }),
          h('span', { class: 'sb-hold-by', text: x.mine ? U('mine') : (x.byName || U('someone')) }),
          h('span', { class: 'sb-hold-state', text: lower(x.state).replace(/-/g, ' ') }),
          num(x.expiresIn) ? h('span', { class: 'sb-hold-exp', text: U('expires', { n: x.expiresIn }) }) : null
        ]);
      })) : C.Empty({}),
      h('div', { class: 'sb-holds-actions' }, [
        !mine && fn(p.onHold) ? C.Button({ label: U('hold'), small: true, onClick: function () { p.onHold(c.day); } }) : null,
        !mine && holds.length && fn(p.onChallenge) ? C.Button({ label: U('challenge'), small: true, onClick: function () { p.onChallenge(c.day); } }) : null,
        mine && fn(p.onRelease) ? C.Button({ label: U('release'), small: true, kind: 'quiet', onClick: function () { p.onRelease(c.day); } }) : null,
        fn(p.onAsk) ? C.Button({ label: U('ask'), small: true, kind: 'quiet', onClick: function () { p.onAsk(c.day); } }) : null
      ])
    ]);
  };

  /* ---------------------------------------------------------------- */
  /* the day log: LogCard and where every record is seen (3.1)        */
  /* ---------------------------------------------------------------- */

  var HOMES = {
    DAY_START: 'day log', QUIET_DAY: 'day log', JOB_DONE: 'day log', JOB_BLOCKED: 'day log', SLIP: 'day log',
    HELPER_REPORT: 'day log', MESSAGE: 'day log', ASK_ANSWERED: 'day log', HOLD: 'day log', REQUEST_GONE: 'day log',
    EVENT: 'overlay', CHOICE: 'day log', OVERTIME: 'day log', MONEY: 'day log', STRESS: 'strip', TRUST: 'day log',
    NEWS: 'day log', NOTE: 'day log', RANGE: 'day log', EVENING: 'day log',
    NIGHT_START: 'night', TICK: 'night', ARRIVALS: 'night', SET_START: 'night', SET_END: 'night', POST: 'night',
    INCIDENT: 'night', NIGHT_END: 'night', SETTLE_LINE: 'night', SETTLE_DONE: 'night',
    SHOW_RESULT: 'night', LEDGER: 'show result', LUCK: 'show result', COMMENT: 'show result', LEARNED: 'show result',
    DRAW: 'show result', REGULARS: 'show result', NAME: 'show result', WORD: 'show result', MEMORY: 'show result',
    WEEK_SUMMARY: 'close-out', BILLS: 'close-out', LADDER: 'close-out', STAGE: 'overlay', FIRST: 'day log',
    OFFER: 'day log', TOUR_DATE: 'day log', YEAR: 'close-out', ENDING: 'legacy'
  };

  function when(r) {
    if (num(r.at)) return SB.time.clock(r.at);
    if (!num(r.day)) return '';
    return SB.time.fmt(r.day, 'dow3') + (r.half ? ' ' + word('half.' + r.half, lower(r.half)) : '');
  }
  function go(name, params) { return function () { if (SB.UI.go) SB.UI.go(name, params); }; }
  function link(label, name, params) { return h('button', { type: 'button', class: 'sb-link pz-hl', on: { click: go(name, params) } }, label); }
  function thumbFor(t) {
    var x, s;
    if (!t || !t.id) return null;
    try {
      if (t.k === 'BAND') { x = lookup('bands', t.id); return x ? C.BandMark({ band: x, size: 32 }) : null; }
      if (t.k === 'PERSON') { x = lookup('people', t.id); return x ? C.PersonStamp({ person: x, size: 32 }) : null; }
      if (t.k === 'ROOM') { x = lookup('rooms', t.id); return x ? C.RoomGlyph({ kind: x.kind, size: 24, name: x.name }) : null; }
      if (t.k === 'FLYER') {
        s = game(); x = lookup('shows', t.id);
        if (x && s && SB.UI.parts.flyerThumb && SB.Jobs && SB.Jobs.flyerSpec) {
          return SB.UI.parts.flyerThumb({ recipe: (x.flyer && x.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, t.id) }, 48);
        }
        return x ? C.ShowBadge({ show: x, size: 20 }) : null;
      }
    } catch (e) { SB.log('warn', 'C.LogCard', 'thumb: ' + (e && e.message)); }
    return null;
  }
  function refThumb(refs) {
    refs = refs || {};
    if (refs.bandId) return thumbFor({ k: 'BAND', id: refs.bandId });
    if (refs.personId) return thumbFor({ k: 'PERSON', id: refs.personId });
    if (refs.roomId) return thumbFor({ k: 'ROOM', id: refs.roomId });
    return null;
  }
  function chips(list) { return (list && list.length) ? h('span', { class: 'sb-chips' }, list.map(function (c) { return C.CostChip({ chip: c }); })) : null; }
  function asRangeView(r) { return r && num(r.lo) ? { lo90: r.lo, lo50: r.lo, hi50: r.hi, hi90: r.hi, text: r.lo + '–' + r.hi, known: r.lo === r.hi } : null; }

  /** What each record type adds to its card (05-interface 3.1). Each returns { cls, lead, extra }. */
  var ADD = {
    DAY_START: function (r) {
      return { cls: 'is-day', lead: h('span', { class: 'sb-log-dayname', text: SB.time.fmt(r.day, 'dow') }),
               extra: [r.weather ? h('span', { class: 'sb-weather sb-weather--' + lower(r.weather), text: word('weather.' + r.weather, lower(r.weather)) }) : null,
                       (r.town || []).map(function (t) { return h('span', { class: 'sb-log-town', text: t }); })] };
    },
    QUIET_DAY: function () { return { cls: 'is-dim' }; },
    JOB_DONE: function (r) { return { lead: thumbFor(r.thumb), extra: chips(r.chips) }; },
    JOB_BLOCKED: function () { return { cls: 'is-late' }; },
    SLIP: function () { return { extra: C.Stamp({ k: 'SLIP', text: U('slip') }) }; },
    HELPER_REPORT: function (r) {
      var x = lookup('people', r.personId);
      return { lead: x ? C.PersonStamp({ person: x, size: 32 }) : null, extra: r.outcome ? h('span', { class: 'sb-log-word', text: word('helpOutcome.' + r.outcome, lower(r.outcome)) }) : null };
    },
    MESSAGE: function (r) { return { extra: link(U('open'), 'inbox', { messageId: r.messageId }) }; },
    ASK_ANSWERED: function (r) {
      return { extra: [h('span', { class: 'sb-log-word is-' + lower(r.status), text: word('askStatus.' + r.status, lower(r.status)) }), link(U('open'), 'inbox', {})] };
    },
    HOLD: function (r) {
      var x = lookup('rooms', r.roomId);
      return { lead: x ? C.RoomGlyph({ kind: x.kind, size: 24, name: x.name }) : null,
               extra: h('span', { class: 'sb-log-word', text: word('holdChange.' + r.change, lower(r.change)) }) };
    },
    REQUEST_GONE: function () { return { cls: 'is-dim' }; },
    EVENT: function () { return { hidden: true }; },
    CHOICE: function (r) { return { extra: chips(r.chips) }; },
    OVERTIME: function (r) { return { extra: C.CostChip({ chip: { k: 'HOURS', v: r.hours } }) }; },
    MONEY: function (r) { return { extra: C.Money({ amount: r.amount, signed: true }) }; },
    STRESS: function (r) { return { extra: r.zone ? h('span', { class: 'sb-log-word', text: word('stress.' + r.zone, lower(r.zone)) }) : null }; },
    TRUST: function (r) {
      return { cls: 'is-chip', extra: h('span', { class: 'sb-trustchip' + (r.d < 0 ? ' is-down' : ' is-up') }, [
        h('span', { aria: { hidden: 'true' }, text: r.d < 0 ? '▼' : '▲' }), vh(r.d < 0 ? U('less') : U('more')),
        h('span', { text: ' ' + (r.name || '') }), r.stageChanged && r.stage ? h('span', { class: 'sb-log-word', text: ' ' + word('stage.' + r.stage, lower(r.stage)) }) : null]) };
    },
    NEWS: function (r) { return { lead: refThumb(r.refs) }; },
    NOTE: function (r) {
      var l = r.learned || {};
      return { cls: 'is-note', extra: [l.text ? h('span', { class: 'sb-learned', text: l.text }) : null, link(U('note'), 'notebook', { key: l.key })] };
    },
    RANGE: function (r) {
      var a = asRangeView(r.from), b = asRangeView(r.to), max = Math.max((r.from && r.from.hi) || 0, (r.to && r.to.hi) || 0) * 1.2 || 1;
      if (a && r.key) C.RangeBar({ view: a, axisMax: max, key: 'log:' + r.key + ':' + r.day });
      return { extra: C.RangeBar({ view: b, axisMax: max, label: r.label || '', key: r.key ? 'log:' + r.key + ':' + r.day : null }) };
    },
    NIGHT_START: function (r) { return { extra: C.ExpectationBar({ lo: r.call && r.call.lo, hi: r.call && r.call.hi, par: r.par && (num(r.par) ? r.par : r.par.heads), cap: r.cap }) }; },
    ARRIVALS: function (r) { return { extra: h('span', { class: 'sb-num', text: String(r.heads) }) }; },
    INCIDENT: function (r) { return { extra: C.CostChip({ chip: { k: 'Q', v: r.q } }) }; },
    NIGHT_END: function (r) { return { extra: h('span', { class: 'sb-num', text: String(r.heads) }) }; },
    SETTLE_LINE: function (r) { return { lead: h('span', { class: 'sb-env-label', text: r.label || '' }), extra: C.Money({ amount: r.amount }) }; },
    SETTLE_DONE: function (r) { return { extra: C.Money({ amount: r.playerNet, signed: true }) }; },
    NAME: function (r) { return { extra: num(r.from) && num(r.to) ? C.CostChip({ chip: { k: 'NAME', v: Math.round(r.to - r.from) } }) : null }; },
    WORD: function (r) { return { extra: r.tierChanged && r.tier ? h('span', { class: 'sb-log-word', text: word('wordTier.' + r.tier + '.name', lower(r.tier)) }) : null }; },
    MEMORY: function (r) { return { extra: (r.stamps || []).map(function (k) { return C.Stamp({ k: k }); }) }; },
    STAGE: function (r) { return { cls: 'is-stage', extra: (r.opens && r.opens.length) ? h('ul', { class: 'sb-log-opens' }, r.opens.map(function (t) { return h('li', { text: t }); })) : null }; },
    FIRST: function () { return { extra: C.Stamp({ k: 'FIRST', text: U('first') }) }; },
    OFFER: function (r) { return { extra: r.messageId ? link(U('open'), 'inbox', { messageId: r.messageId }) : null }; },
    TOUR_DATE: function (r) {
      return { lead: refThumb({ bandId: r.bandId }), extra: [r.place ? h('span', { class: 'sb-log-place', text: r.place }) : null,
               h('span', { class: 'sb-log-word ' + (r.good ? 'is-good' : 'is-thin'), text: r.good ? U('tourGood') : U('tourThin') })] };
    }
  };

  /** LogCard({ record }): one card for a record in the day log. */
  C.LogCard = function (p) {
    var r = (p && p.record) || {}, add = ADD[r.t] ? ADD[r.t](r) : {}, text = r.text || '';
    if (!text && T('rec')[r.t] !== undefined) text = T('rec')[r.t];
    return h('article', { class: ['sb-log', 'sb-log--' + lower(r.t), add.cls || ''], hidden: !!add.hidden, data: { rec: r.t, day: num(r.day) ? r.day : null } }, [
      h('span', { class: 'sb-log-time', text: when(r) }),
      add.lead || null,
      h('span', { class: 'sb-log-text', text: text }),
      add.extra || null
    ]);
  };
  C.LogCard.homes = HOMES;
})(SB);
