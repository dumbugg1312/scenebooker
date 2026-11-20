/* Scene Booker: js/ui/kit.js (styles in css/kit.css, prefix kt-; usage in design/kit.md)
 * SB.UI.Kit: the shared collage parts, built on SB.UI.h. Each returns a real element (a <button>, <input>, <label>,
 * <fieldset>...) so the keyboard and screen readers work; the paper look is css/kit.css and SB.DeskKit's marker strokes.
 * Photos are cut-outs from assets/cutouts (SB.Cutouts) put through SB.Scenes.copier; nothing here draws a person.
 * Every helper is safe without a canvas or without the art modules (the test DOM): the paper is there, the art is not.
 */
(function (SB) {
  'use strict';

  var TONER = '#141312', CREAM = '#F4F1E8';
  var PAPERS = ['white', 'canary', 'goldenrod', 'pink', 'blue', 'green', 'salmon', 'lilac', 'bone', 'kraft', 'black'];
  var ART = {};          // drawn SVG strings, by key (display memory)
  var PHOTOS = {};       // finished photo canvases, by key, so a re-render paints at once

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function K() { return SB.DeskKit || null; }
  function doc() { return typeof document !== 'undefined' ? document : null; }
  function r1(n) { return Math.round(n * 10) / 10; }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { if (SB.log) SB.log('warn', 'kit', String(e && e.message)); return fb; } }
  function hash(s) { var x = 2166136261, i; s = String(s); for (i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function cls() { return Array.prototype.slice.call(arguments).filter(Boolean).join(' '); }
  function svg(w, ht, inner, extra) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + r1(w) + '" height="' + r1(ht) + '" viewBox="0 0 ' + r1(w) + ' ' + r1(ht) +
           '" aria-hidden="true" focusable="false"' + (extra || '') + '>' + inner + '</svg>';
  }

  /** rot(seed, max): a steady small tilt for a paper piece, in degrees (|max| <= 1.5). */
  function rot(seed, max) {
    var m = Math.min(1.5, Math.abs(max === undefined ? 1.2 : max));
    return r1(((hash('kt' + seed) % 1000) / 1000 * 2 - 1) * m);
  }
  function rotStyle(o, seed) {
    var v = o && o.rot !== undefined && o.rot !== null ? Math.max(-1.5, Math.min(1.5, Number(o.rot) || 0)) : rot(seed);
    return v + 'deg';
  }

  /** defs(): the marker's roughen filter and halftone patterns, put in the page once (the marker strokes refer to them). */
  function defs() {
    var d = doc(), el;
    if (!d || !K()) return null;
    el = safe(function () { return d.getElementById ? d.getElementById('kt-defs') : null; }, null);
    if (el) return el;
    el = h('span', { id: 'kt-defs', class: 'kt-defs', aria: { hidden: 'true' }, html: svg(1, 1, K().defs()) });
    safe(function () { if (d.body) d.body.appendChild(el); });
    return el;
  }

  /** tape(o): a strip of masking tape. o: { at: 'tl'|'tr'|'bl'|'br'|'top', w (px), rot (deg, its own angle) } */
  function tape(o) {
    o = o || {};
    var st = {};
    if (o.w) st['--kt-w'] = o.w + 'px';
    if (o.rot !== undefined) st['--kt-trot'] = o.rot + 'deg';
    return h('span', { class: cls('kt-tape', o.at ? 'kt-tape--' + o.at : null, o.cls), aria: { hidden: 'true' }, style: st });
  }

  /** card(o, kids): a piece of copy paper. o: { paper (PAPERS), rot, torn, tape: ['tl','tr'...], tag ('div'), cls, label, seed, style } */
  function card(o, kids) {
    o = o || {};
    var st = Object.assign({ '--kt-rot': rotStyle(o, o.seed || o.label || o.paper || 'card') }, o.style || {});
    var tapes = (o.tape || []).map(function (at) { return tape(typeof at === 'string' ? { at: at } : at); });
    return h(o.tag || 'div', { class: cls('kt-card', 'kt-card--' + (PAPERS.indexOf(o.paper) >= 0 ? o.paper : 'white'), o.torn ? 'kt-card--torn' : null, o.cls),
                               style: st, role: o.role || null, aria: o.label ? { label: o.label } : null }, tapes.concat(kids || []));
  }

  /** label(k, v, o): a black tape label with typed caps, and an optional cream tab beside it. o: { tag ('p'), cls, rot } */
  function label(k, v, o) {
    o = o || {};
    return h(o.tag || 'p', { class: cls('kt-label', o.cls), style: o.rot !== undefined ? { '--kt-rot': o.rot + 'deg' } : null }, [
      h('span', { class: 'kt-label__k', text: String(k).toUpperCase() }),
      v !== undefined && v !== null && v !== '' ? h('span', { class: 'kt-label__v', text: String(v).toUpperCase() }) : null
    ]);
  }

  /** markerSvg(text, size, o): sharpie block capitals as an SVG string. o: { fill, max (px), seed } */
  function markerSvg(text, size, o) {
    o = o || {};
    var t = String(text == null ? '' : text), k = K(), key = 'm|' + t + '|' + size + '|' + (o.fill || '') + '|' + (o.max || ''), w, s = size;
    if (!t || !k || !SB.Skeleton) return '';
    if (ART[key]) return ART[key];
    w = k.markerWidth(t, s);
    if (o.max && w > o.max) { s = Math.max(10, s * o.max / w); w = k.markerWidth(t, s); }
    ART[key] = svg(w + 12, s * 1.32 + 8, k.marker(t, 6, s + 4, s, { fill: o.fill || TONER, seed: o.seed || t }));
    return ART[key];
  }

  /** tapeLabel(text, o): a strip of masking tape written on in sharpie (a folder's label, a box's contents).
   *  o: { size (24), tag ('p'), rot (deg, |rot| <= 1.5 unless o.free), cls, id } */
  function tapeLabel(text, o) {
    o = o || {};
    var art = markerSvg(String(text).toUpperCase(), o.size || 24, { max: o.max });
    defs();
    return h(o.tag || 'p', { class: cls('kt-tapelabel', o.cls), id: o.id || null, style: { '--kt-rot': rotStyle(o, 'tl' + text) } }, [
      h('span', { class: 'kt-sr', text: String(text) }),
      art ? h('span', { aria: { hidden: 'true' }, html: art }) : h('span', { class: 'kt-type', aria: { hidden: 'true' }, text: String(text).toUpperCase() })
    ]);
  }

  /** headline(text, o): a sharpie headline; the words are in the page for readers, the drawing is hidden.
   *  o: { size (36), tag ('h2'), light (cream ink, for the black table), max (px), cls, id } */
  function headline(text, o) {
    o = o || {};
    var art = markerSvg(String(text).toUpperCase(), o.size || 36, { fill: o.light ? CREAM : TONER, max: o.max });
    defs();
    return h(o.tag || 'h2', { class: cls('kt-head', o.cls), id: o.id || null }, [
      h('span', { class: 'kt-sr', text: String(text) }),
      art ? h('span', { aria: { hidden: 'true' }, html: art }) : h('span', { class: 'kt-type', aria: { hidden: 'true' }, text: String(text).toUpperCase() })
    ]);
  }

  /** button(o): a taped paper slip (kind 'secondary', the default) or a black tape label (kind 'primary').
   *  o: { label, on(e), kind, disabled, why (said and shown when disabled), say (aria-label), big (marker letters, primary),
   *       paper ('white' for a whiter slip), fk (data-fk), rot, cls, type, id, data } */
  function button(o) {
    o = o || {};
    var kind = o.kind === 'primary' ? 'primary' : 'secondary', art = null, say = o.say || null, data = Object.assign({}, o.data || {});
    if (o.fk) data.fk = o.fk;
    if (o.big && kind === 'primary') art = markerSvg(String(o.label).toUpperCase(), o.big === true ? 26 : o.big, { fill: CREAM });
    if (art) defs();
    if (o.disabled && o.why) say = (say || o.label) + ', ' + o.why;
    return h('button', { type: o.type || 'button', id: o.id || null, class: cls('kt-btn', 'kt-btn--' + kind, art ? 'kt-btn--big' : null, o.paper === 'white' ? 'kt-btn--white' : null, o.cls),
                         disabled: !!o.disabled, title: o.disabled && o.why ? o.why : null, data: data, aria: say ? { label: say } : null,
                         style: { '--kt-rot': rotStyle(o, o.label) },
                         on: { click: function (e) { if (!o.disabled && typeof o.on === 'function') o.on(e); } } }, [
      art ? h('span', { class: 'kt-sr', text: String(o.label) }) : null,
      art ? h('span', { aria: { hidden: 'true' }, html: art }) : h('span', { class: 'kt-btn__t', text: String(o.label) }),
      o.disabled && o.why && !art ? h('span', { class: 'kt-sr', text: ', ' + o.why }) : null
    ]);
  }

  /** tabs(o): torn paper tabs (role tablist), arrow keys, Home and End move between them.
   *  o: { list: [{ id, label }], value (id), on(id), label (the set's name), idPrefix ('kt-tab-'), panel (id of the tabpanel) }
   *  on(id) is called on click and on arrow keys; the caller re-renders, then the tab with that id gets focus. */
  function tabs(o) {
    o = o || {};
    var list = o.list || [], pre = o.idPrefix || 'kt-tab-', ids = list.map(function (t) { return t.id; });
    function go(id) {
      o.on(id);
      safe(function () { var d = doc(), el = d && d.getElementById ? d.getElementById(pre + id) : null; if (el && el.focus) el.focus(); });
    }
    return h('div', { class: cls('kt-tabs', o.cls), role: 'tablist', aria: { label: o.label || null } }, list.map(function (t, i) {
      var on = t.id === o.value;
      return h('button', { type: 'button', role: 'tab', id: pre + t.id, class: 'kt-tab', tabindex: on ? '0' : '-1', data: { fk: 'tab-' + t.id },
                           aria: { selected: on ? 'true' : 'false', controls: o.panel || null }, style: { '--kt-rot': rotStyle({}, 'tab' + t.id + i) },
                           on: { click: function () { if (!on) go(t.id); },
                                 keydown: function (e) {
                                   var at = ids.indexOf(o.value), n = ids.length, to = null;
                                   if (e.key === 'ArrowRight') to = ids[(at + 1) % n];
                                   else if (e.key === 'ArrowLeft') to = ids[(at - 1 + n) % n];
                                   else if (e.key === 'Home') to = ids[0];
                                   else if (e.key === 'End') to = ids[n - 1];
                                   if (to === null) return;
                                   e.preventDefault(); if (to !== o.value) go(to);
                                 } } },
        h('span', { class: 'kt-tab__t', text: String(t.label).toUpperCase() }));
    }));
  }

  /** input(o): a typewriter line on a strip of paper, in a <label>. Returns the label; .field is the <input>.
   *  o: { label, value, on(value) (on change), onInput(value), onKey(e) (keydown), placeholder, hint, fk, max, readonly, disabled,
   *       area (textarea), rows, big (a large typed line, e.g. a name), type ('text', 'search'...), say (aria-label when no label), cls, id } */
  function input(o) {
    o = o || {};
    var data = o.fk ? { fk: o.fk } : null, ctl, ev = {}, wrap;
    if (typeof o.on === 'function') ev.change = function (e) { o.on(e.target.value); };
    if (typeof o.onInput === 'function') ev.input = function (e) { o.onInput(e.target.value); };
    if (typeof o.onKey === 'function') ev.keydown = function (e) { o.onKey(e); };
    ctl = h(o.area ? 'textarea' : 'input', { type: o.area ? null : (o.type || 'text'), class: cls('kt-input', o.area ? 'kt-input--area' : null, o.big ? 'kt-input--big' : null), id: o.id || null,
                                             placeholder: o.placeholder || null, maxlength: o.max ? String(o.max) : null, rows: o.area ? String(o.rows || 4) : null,
                                             readonly: !!o.readonly, disabled: !!o.disabled, spellcheck: 'false', autocomplete: 'off', data: data, on: ev });
    if (o.value !== undefined && o.value !== null) ctl.value = String(o.value);
    wrap = h('label', { class: cls('kt-field', o.cls) }, [
      o.label ? h('span', { class: 'kt-field__l', text: o.label }) : null,
      ctl,
      o.hint ? h('span', { class: 'kt-field__hint', text: o.hint }) : null
    ]);
    if (!o.label && o.say) ctl.setAttribute('aria-label', o.say);
    wrap.field = ctl;
    return wrap;
  }

  function boxSvg(seed) {
    var key = 'box|' + seed, k = K();
    if (ART[key]) return ART[key];
    if (!k) return '';
    ART[key] = svg(30, 30, k.rect(3, 3, 24, 24, { seed: 'ktb' + seed, sw: 2.4, wob: 0.8, over: 1.6, fill: '#FBFAF4' }) +
      '<g class="kt-check__x">' + k.line(7, 7, 24, 24, { seed: 'ktx' + seed, sw: 3.4, wob: 1, over: 3, cap: 'round' }) +
      k.line(24, 6, 8, 25, { seed: 'kty' + seed, sw: 3.4, wob: 1, over: 3, cap: 'round' }) + '</g>');
    return ART[key];
  }

  /** check(o): a drawn box with a marker X; a real checkbox inside a <label>. Returns the label; .field is the <input>.
   *  o: { label, checked, on(bool), disabled, hint (shown and said, e.g. why it is locked), pen (the X in ballpoint blue), fk, cls } */
  function check(o) {
    o = o || {};
    var ctl = h('input', { type: 'checkbox', class: 'kt-check__in', disabled: !!o.disabled, data: o.fk ? { fk: o.fk } : null,
                           on: { change: function (e) { if (typeof o.on === 'function') o.on(!!e.target.checked); } } }), wrap;
    ctl.checked = !!o.checked;
    if (o.checked) ctl.setAttribute('checked', '');
    wrap = h('label', { class: cls('kt-check', o.disabled ? 'is-off' : null, o.pen ? 'kt-pen' : null, o.cls) }, [
      ctl,
      h('span', { class: 'kt-check__box', aria: { hidden: 'true' }, html: boxSvg(o.fk || o.label) }),
      h('span', { class: 'kt-check__t' }, [h('span', { text: o.label }), o.hint ? h('span', { class: 'kt-check__hint', text: o.hint }) : null])
    ]);
    wrap.field = ctl;
    return wrap;
  }

  function ringSvg(seed) {
    var key = 'ring|' + seed, k = K(), inner;
    if (ART[key]) return ART[key];
    if (!k) return '';
    inner = k.ellipse(50, 20, 47, 17, { seed: 'ktr' + seed, sw: 3, stroke: TONER, wob: 1.8 }).replace(/<path /g, '<path vector-effect="non-scaling-stroke" ');
    ART[key] = '<svg class="kt-slip__ring" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">' + inner + '</svg>';
    return ART[key];
  }

  /** pick(o): choose one. Real radios in a <fieldset>, so arrow keys work. Two looks: paper slips with the chosen one
   *  circled in marker (default), or box: true, a typed form line where each choice has a drawn box and the chosen one is
   *  ticked (X). o: { label, name (unique per page), value, options: [[value, words], ...], on(value) (string), disabled,
   *  box (the form look), line (label and choices on one typed line, with a dotted leader), pen (the X in ballpoint blue),
   *  light (on the black table), fk (data-fk prefix), cls } */
  function pick(o) {
    o = o || {};
    var name = o.name || ('kt-pick-' + hash(o.label || '')), cur = String(o.value);
    return h('fieldset', { class: cls('kt-pick', o.light ? 'kt-pick--light' : null, o.box ? 'kt-pick--box' : null, o.line ? 'kt-pick--line' : null, o.pen ? 'kt-pen' : null, o.cls), disabled: !!o.disabled }, [
      o.label ? h('legend', { class: o.line ? 'kt-sr' : 'kt-pick__l', text: o.label }) : null,
      o.label && o.line ? h('span', { class: 'kt-pick__w', aria: { hidden: 'true' }, text: o.label }) : null,
      o.line ? h('span', { class: 'kt-pick__lead', aria: { hidden: 'true' } }) : null,
      h('div', { class: 'kt-pick__opts' }, (o.options || []).map(function (op, i) {
        var v = String(op[0]), on = v === cur, ctl;
        ctl = h('input', { type: 'radio', class: 'kt-slip__in', name: name, value: v, data: o.fk ? { fk: o.fk + '-' + v } : null,
                           on: { change: function (e) { if (e.target.checked && typeof o.on === 'function') o.on(v); } } });
        ctl.checked = on;
        if (on) ctl.setAttribute('checked', '');
        if (o.box) return h('label', { class: 'kt-slip kt-opt' }, [
          ctl,
          h('span', { class: 'kt-opt__p' }, [h('span', { class: 'kt-check__box', aria: { hidden: 'true' }, html: boxSvg(name + v) }), h('span', { class: 'kt-opt__w', text: String(op[1]) })])
        ]);
        return h('label', { class: 'kt-slip' }, [
          ctl,
          h('span', { class: 'kt-slip__p', style: { '--kt-rot': rotStyle({}, name + v + i) }, html: ringSvg(name + v) }, [h('span', { text: String(op[1]) })])
        ]);
      }))
    ]);
  }

  /** slip(o): one paper slip as a button, for long lists of things to choose (a listbox of towns, a row of ideas). When
   *  o.on is true it is circled in marker, like pick()'s chosen slip. The caller gives the semantics: role 'option' (then
   *  aria-selected) or none (then aria-pressed when o.toggle). o: { label, on, click(e), role, toggle, paper ('white'|'bone'|
   *  any PAPERS name), tag (a small black label inside, e.g. 'start here'), note (small text after the words), fk, say,
   *  disabled, struck (crossed out: not available), keydown(e), cls, seed } */
  function slip(o) {
    o = o || {};
    var seed = o.seed || o.label, aria = { label: o.say || null };
    if (o.role === 'option') aria.selected = o.on ? 'true' : 'false';
    else if (o.toggle) aria.pressed = o.on ? 'true' : 'false';
    return h('button', { type: 'button', role: o.role || null, class: cls('kt-slipbtn', o.on ? 'is-on' : null, o.struck ? 'is-struck' : null, o.cls), disabled: !!o.disabled,
                         data: o.fk ? { fk: o.fk } : null, aria: aria,
                         on: { click: function (e) { if (!o.disabled && typeof o.click === 'function') o.click(e); }, keydown: typeof o.keydown === 'function' ? o.keydown : null } },
      h('span', { class: 'kt-slip__p', style: { '--kt-rot': rotStyle({}, seed), '--kt-slip': o.paper && o.paper !== 'bone' ? 'var(--kt-' + o.paper + ')' : null },
                  html: o.on ? ringSvg(seed) : '' }, [
        h('span', { class: 'kt-slip__w', text: String(o.label) }),
        o.tag ? h('span', { class: 'kt-slip__tag', text: String(o.tag) }) : null,
        o.note ? h('span', { class: 'kt-slip__note', aria: { hidden: 'true' }, text: String(o.note) }) : null
      ]));
  }

  /* ---------------- photo slot ---------------- */

  function cutInfo(id) { var L = SB.Cutouts || [], i; for (i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; return null; }
  function drawPhoto(cv, o, ids, W, H, dpr) {
    var c = cv.getContext('2d'), S = SB.Scenes, g, n = ids.length;
    if (!c || !S || !S.paste || !S.copier) return false;
    c.clearRect(0, 0, W, H);
    if (!o.cut) {
      /* a flash photo in a dark room: a lit patch behind the subject, falling off to black */
      g = c.createRadialGradient(W * 0.5, H * 0.42, Math.min(W, H) * 0.08, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
      g.addColorStop(0, '#c9c9c9'); g.addColorStop(0.55, '#7a7a7a'); g.addColorStop(1, '#1e1e1e');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
    }
    var ok = true;
    ids.forEach(function (id, i) {
      var info = cutInfo(id), iw = info ? info.w : 600, ih = info ? info.h : 900, ht, x, y, sc;
      if (info && info.frame === 'photo' && !o.cut && n === 1) {
        sc = Math.max(W / iw, H / ih); ht = ih * sc;                              // a printed photo: fill the slot
        ok = S.paste(c, id, { x: W / 2, y: (H + ht) / 2, h: ht, border: 0, contrast: o.contrast || 1.15 }) !== false && ok;
        return;
      }
      ht = H * (o.scale || (o.cut ? 0.97 : 0.9));
      if (iw * ht / ih > W / n * 1.05) ht = (W / n * 1.05) * ih / iw;
      x = W * (i + 0.5) / n; y = H - (o.cut ? 6 * dpr : 0);
      ok = S.paste(c, id, { x: x, y: y + (info && info.frame === 'full' && !o.cut ? ht * 0.04 : 0), h: ht, border: (o.cut ? 6 : 4) * dpr, flip: !!(o.flip && i === 0), contrast: o.contrast || 1.15 }) !== false && ok;
    });
    if (!ok) return false;
    S.copier(cv, { paper: o.paper || 'canary', cell: (o.cell || 3.4) * dpr, contrast: o.tone || 1.5, alpha: !!o.cut, seed: o.seed || ids.join(',') });
    return true;
  }

  /** photo(o): a photo slot: cut-outs from assets/cutouts put through the copier onto coloured paper, at the size asked.
   *  o: { id | ids: [...] (SB.Cutouts ids), w, h (css px), paper (SB.Scenes.papers name or hex: canary...), cut (true: the
   *       person cut out, no print edge), alt (said; without it the photo is decoration), caption, tape: ['top'...], rot,
   *       cell (dot size, css px, 3.4), tone (copier contrast, 1.5), contrast (photo contrast), scale, flip, seed, cls } */
  function photo(o) {
    o = o || {};
    var ids = o.ids || (o.id ? [o.id] : []), W = Math.max(20, o.w || 240), H = Math.max(20, o.h || 180),
        dpr = Math.min(2, Math.max(1, (typeof window !== 'undefined' && window.devicePixelRatio) || 1)),
        key = [ids.join(','), W, H, o.paper, o.cut ? 1 : 0, o.cell, o.tone, o.scale, o.flip ? 1 : 0, o.seed, dpr].join('|'),
        cv = h('canvas', { class: 'kt-photo__c', width: String(Math.round(W * dpr)), height: String(Math.round(H * dpr)),
                           style: { width: W + 'px', height: H + 'px' }, aria: { hidden: 'true' } }),
        paper = (SB.Scenes && SB.Scenes.papers && SB.Scenes.papers[o.paper]) || (/^#/.test(String(o.paper)) ? o.paper : null),
        tapes = (o.tape || []).map(function (at) { return tape(typeof at === 'string' ? { at: at } : at); }), fig;
    if (paper && !o.cut && cv.style && cv.style.setProperty) cv.style.setProperty('--kt-paper', paper);   // the paper shows while the photo loads
    fig = h('figure', { class: cls('kt-photo', o.cut ? 'kt-photo--bare' : null, o.cls), style: { '--kt-rot': rotStyle(o, key) },
                        role: o.alt ? 'img' : null, aria: o.alt ? { label: o.alt } : { hidden: 'true' } },
            tapes.concat([cv, o.caption ? h('figcaption', { class: 'kt-photo__cap', aria: { hidden: o.alt ? 'true' : null }, text: o.caption }) : null]));
    function paint() {
      return safe(function () {
        var c = cv.getContext && cv.getContext('2d'), done = PHOTOS[key], tmp;
        if (!c) return true;
        if (done) { c.drawImage(done, 0, 0); return true; }
        tmp = h('canvas', { width: cv.width, height: cv.height });
        tmp.width = cv.width; tmp.height = cv.height;
        if (!drawPhoto(tmp, o, ids, cv.width, cv.height, dpr)) return false;
        PHOTOS[key] = tmp; c.clearRect(0, 0, cv.width, cv.height); c.drawImage(tmp, 0, 0);
        return true;
      }, true);
    }
    if (ids.length && !paint() && SB.Scenes && SB.Scenes.loadCuts) SB.Scenes.loadCuts(ids, function () { paint(); });
    return fig;
  }

  SB.UI.Kit = { card: card, tape: tape, tapeLabel: tapeLabel, label: label, headline: headline, marker: markerSvg, button: button, tabs: tabs, input: input,
                check: check, pick: pick, slip: slip, photo: photo, rot: rot, defs: defs, PAPERS: PAPERS.slice() };
})(SB);
