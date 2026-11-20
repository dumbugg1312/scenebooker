/* Scene Booker: js/art/identity.js
 * SB.Identity (ART-B): the stable look of every band, person, room, booker and city, drawn in code as SVG strings
 * (05-interface 7, art.md 8). Pure. Every function seeds itself from the entity (SB.rng.make('id:' + id)), so the
 * same id gives the same mark in every screen and every save. Each SVG has role="img" and a <title>.
 * Lettering comes from SB.Skeleton.path when it is loaded; otherwise a plain SVG text fallback in a generic family.
 * Motifs come from SB.Draw.motif, replayed into SVG through a small recording context (no SVG function on SB.Draw).
 * Desk-context strokes use currentColor; an entity's own inks come from inks().
 */
SB.module('Identity', function (SB) {
  'use strict';

  var TAU = Math.PI * 2;
  var INK_HEX = {
    toner: '#1A1A1A', copyGray: '#7D7D78', fireRed: '#E03A2F', ballpointBlue: '#2F4FB5', bayouTeal: '#0F7C82',
    oliveDrab: '#6B6B2E', fluorPink: '#FF48B0', fluorOrange: '#FF6C2F', fluorYellow: '#FFE800', mint: '#5FD4A8',
    lavender: '#A58CE0', brick: '#9C3B27'
  };
  var PAPER_HEX = {
    copyWhite: '#F7F6F1', newsprint: '#E6E1D3', goldenrod: '#F2C14E', pastelPink: '#F6C9D4', pastelBlue: '#C9DDF0',
    pastelGreen: '#D3EBC5', kraft: '#C8A77A', cardboard: '#B8916A', blackStock: '#1C1B1A'
  };
  var PAPER_LIGHT = '#F7F6F1', TONER = '#1A1A1A';
  /* Ink a is the band's desk border, so it is drawn from inks that hold up on both desk themes; ink b is any other ink
   * far enough from a in lightness that the two stay apart in grayscale. */
  var INK_A = ['fireRed', 'bayouTeal', 'oliveDrab', 'copyGray', 'ballpointBlue', 'brick', 'fluorPink', 'fluorOrange', 'lavender'];
  var INK_ALL = ['toner', 'copyGray', 'fireRed', 'ballpointBlue', 'bayouTeal', 'oliveDrab', 'fluorPink', 'fluorOrange',
                 'fluorYellow', 'mint', 'lavender', 'brick'];

  /* ---------------- helpers ---------------- */

  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function n2(v) { return String(Math.round(v * 100) / 100); }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function rgbOf(hex) {
    var h = String(hex || '').replace('#', '');
    var n = parseInt(h, 16);
    if (h.length !== 6 || isNaN(n)) return [26, 26, 26];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function lum(hex) {
    var c = rgbOf(hex).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  /** The legible letter color on a ground of this ink. */
  function onInk(hex) { return lum(hex) > 0.3 ? TONER : PAPER_LIGHT; }
  function inkHex(id, def) { return INK_HEX[id] || PAPER_HEX[id] || (typeof id === 'string' && id.charAt(0) === '#' ? id : def); }
  function safeId(s) { return String(s).replace(/[^A-Za-z0-9_-]/g, '_'); }
  function svgOpen(w, h, vbw, vbh, title, extra) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + n2(w) + '" height="' + n2(h) + '" viewBox="0 0 ' + n2(vbw) + ' ' +
      n2(vbh) + '" role="img" aria-label="' + esc(title) + '"' + (extra || '') + '><title>' + esc(title) + '</title>';
  }
  function initials(a, b) {
    var s = '';
    if (a) s += String(a).replace(/[^A-Za-z0-9]/g, '').charAt(0);
    if (b) s += String(b).replace(/[^A-Za-z0-9]/g, '').charAt(0);
    return s.toUpperCase() || '?';
  }
  function nameInitials(name) {
    var words = String(name || '').replace(/^the\s+/i, '').split(/\s+/).filter(function (w) { return /[A-Za-z0-9]/.test(w); });
    if (!words.length) return '?';
    return initials(words[0], words.length > 1 ? words[1] : '');
  }

  function pickInks(r) {
    var a = r.pick(INK_A), ah = INK_HEX[a];
    var bs = INK_ALL.filter(function (k) { return k !== a && Math.abs(lum(INK_HEX[k]) - lum(ah)) >= 0.15; });
    var b = r.pick(bs.length ? bs : INK_ALL.filter(function (k) { return k !== a; }));
    return { a: ah, b: INK_HEX[b], aId: a, bId: b };
  }

  /* ---------------- a recording context: canvas calls in, SVG out (for SB.Draw.motif) ---------------- */

  function Rec() {
    this.m = [1, 0, 0, 1, 0, 0]; this.stack = []; this.d = ''; this.out = []; this.has = false;
    this.fillStyle = TONER; this.strokeStyle = TONER; this.lineWidth = 1; this.lineCap = 'butt'; this.lineJoin = 'miter';
    this.globalAlpha = 1; this.font = '10px sans-serif'; this.textAlign = 'start'; this.textBaseline = 'alphabetic';
    this.globalCompositeOperation = 'source-over';
  }
  Rec.prototype = {
    save: function () {
      this.stack.push({ m: this.m.slice(), fillStyle: this.fillStyle, strokeStyle: this.strokeStyle, lineWidth: this.lineWidth,
        lineCap: this.lineCap, lineJoin: this.lineJoin, globalAlpha: this.globalAlpha, font: this.font,
        textAlign: this.textAlign, textBaseline: this.textBaseline });
    },
    restore: function () {
      var s = this.stack.pop(), k;
      if (!s) return;
      for (k in s) if (Object.prototype.hasOwnProperty.call(s, k)) this[k] = s[k];
    },
    transform: function (a, b, c, d, e, f) {
      var m = this.m;
      this.m = [m[0] * a + m[2] * b, m[1] * a + m[3] * b, m[0] * c + m[2] * d, m[1] * c + m[3] * d,
                m[0] * e + m[2] * f + m[4], m[1] * e + m[3] * f + m[5]];
    },
    setTransform: function (a, b, c, d, e, f) { this.m = [a, b, c, d, e, f]; },
    translate: function (x, y) { this.transform(1, 0, 0, 1, x, y); },
    scale: function (x, y) { this.transform(x, 0, 0, y, 0, 0); },
    rotate: function (a) { var c = Math.cos(a), s = Math.sin(a); this.transform(c, s, -s, c, 0, 0); },
    pt: function (x, y) { var m = this.m; return n2(m[0] * x + m[2] * y + m[4]) + ' ' + n2(m[1] * x + m[3] * y + m[5]); },
    beginPath: function () { this.d = ''; this.has = false; },
    moveTo: function (x, y) { this.d += 'M' + this.pt(x, y); this.has = true; },
    lineTo: function (x, y) { this.d += (this.has ? 'L' : 'M') + this.pt(x, y); this.has = true; },
    quadraticCurveTo: function (a, b, x, y) { if (!this.has) this.moveTo(a, b); this.d += 'Q' + this.pt(a, b) + ' ' + this.pt(x, y); },
    bezierCurveTo: function (a, b, c, d, x, y) { if (!this.has) this.moveTo(a, b); this.d += 'C' + this.pt(a, b) + ' ' + this.pt(c, d) + ' ' + this.pt(x, y); },
    closePath: function () { this.d += 'Z'; },
    rect: function (x, y, w, h) { this.moveTo(x, y); this.lineTo(x + w, y); this.lineTo(x + w, y + h); this.lineTo(x, y + h); this.closePath(); },
    ellipse: function (x, y, rx, ry, rot, a0, a1, ccw) {
      var sweep;
      if (!ccw) { while (a1 < a0) a1 += TAU; sweep = Math.min(a1 - a0, TAU); }
      else { while (a0 < a1) a0 += TAU; sweep = -Math.min(a0 - a1, TAU); }
      var cr = Math.cos(rot || 0), sr = Math.sin(rot || 0);
      function P(t) { var ct = Math.cos(t), st = Math.sin(t); return [x + rx * ct * cr - ry * st * sr, y + rx * ct * sr + ry * st * cr]; }
      function D(t) { var ct = Math.cos(t), st = Math.sin(t); return [-rx * st * cr - ry * ct * sr, -rx * st * sr + ry * ct * cr]; }
      var p0 = P(a0);
      if (this.has) this.lineTo(p0[0], p0[1]); else this.moveTo(p0[0], p0[1]);
      var segs = Math.max(1, Math.ceil(Math.abs(sweep) / (Math.PI / 2))), dt = sweep / segs, k = 4 / 3 * Math.tan(dt / 4);
      for (var i = 0; i < segs; i++) {
        var t0 = a0 + i * dt, t1 = t0 + dt, q0 = P(t0), q1 = P(t1), d0 = D(t0), d1 = D(t1);
        this.d += 'C' + this.pt(q0[0] + k * d0[0], q0[1] + k * d0[1]) + ' ' + this.pt(q1[0] - k * d1[0], q1[1] - k * d1[1]) + ' ' + this.pt(q1[0], q1[1]);
      }
    },
    arc: function (x, y, r, a0, a1, ccw) { this.ellipse(x, y, r, r, 0, a0, a1, ccw); },
    scaleOf: function () { var m = this.m; return Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2])) || 1; },
    paint: function (style) { return typeof style === 'string' ? style : (style && style.first) || TONER; },
    alpha: function () { return this.globalAlpha < 1 ? ' opacity="' + n2(this.globalAlpha) + '"' : ''; },
    fill: function (rule) {
      if (!this.d) return;
      this.out.push('<path d="' + this.d + '" fill="' + esc(this.paint(this.fillStyle)) + '"' +
        (rule === 'evenodd' ? ' fill-rule="evenodd"' : '') + this.alpha() + '/>');
    },
    stroke: function () {
      if (!this.d) return;
      this.out.push('<path d="' + this.d + '" fill="none" stroke="' + esc(this.paint(this.strokeStyle)) + '" stroke-width="' +
        n2(this.lineWidth * this.scaleOf()) + '" stroke-linecap="' + this.lineCap + '" stroke-linejoin="' + this.lineJoin + '"' + this.alpha() + '/>');
    },
    fillRect: function (x, y, w, h) { var d = this.d, has = this.has; this.beginPath(); this.rect(x, y, w, h); this.fill(); this.d = d; this.has = has; },
    strokeRect: function (x, y, w, h) { var d = this.d, has = this.has; this.beginPath(); this.rect(x, y, w, h); this.stroke(); this.d = d; this.has = has; },
    clearRect: function () {},
    clip: function () {},
    setLineDash: function () {},
    fontPx: function () { var m = /(\d+(?:\.\d+)?)px/.exec(this.font); return m ? +m[1] : 10; },
    measureText: function (t) { return { width: String(t).length * this.fontPx() * 0.62 }; },
    fillText: function (t, x, y) {
      var m = this.m, anchor = this.textAlign === 'center' ? 'middle' : this.textAlign === 'right' || this.textAlign === 'end' ? 'end' : 'start';
      var base = this.textBaseline === 'middle' ? 'central' : 'alphabetic';
      this.out.push('<text transform="matrix(' + m.map(n2).join(' ') + ')" x="' + n2(x) + '" y="' + n2(y) + '" font-family="sans-serif" font-weight="900" font-size="' +
        n2(this.fontPx()) + '" text-anchor="' + anchor + '" dominant-baseline="' + base + '" fill="' + esc(this.paint(this.fillStyle)) + '"' + this.alpha() + '>' + esc(t) + '</text>');
    },
    createLinearGradient: function () { return { first: null, addColorStop: function (o, c) { if (!this.first) this.first = c; } }; },
    createRadialGradient: function () { return { first: null, addColorStop: function (o, c) { if (!this.first) this.first = c; } }; }
  };

  /** A motif of SB.Enums.MOTIF as SVG elements, centered at cx, cy. '' when SB.Draw is not loaded or the id is unknown. */
  function motifSvg(id, cx, cy, size, color, r, extra) {
    var D = SB.Draw;
    if (!D || typeof D.motif !== 'function' || !id) return '';
    var rec = new Rec(), o = { rng: r, ink: color };
    if (extra) for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    try { D.motif(rec, id, cx, cy, size, o); } catch (e) { return ''; }
    return rec.out.join('');
  }

  /* ---------------- lettering ---------------- */

  var SKELETON_T = { marker: 1, block: 1, bubble: 1, stencil: 1, nib: 1, spike: 1, drip: 1, tape: 1 };
  var STROKE_U = { marker: 0.9, block: 1.9, bubble: 2.4, stencil: 1.9, nib: 1.3, spike: 1.9, drip: 0.9, tape: 0.9 };
  var FACE = {
    heavy: { family: 'sans-serif', weight: 900, adv: 0.66 },
    serif: { family: 'serif', weight: 900, adv: 0.6 },
    mono: { family: 'monospace', weight: 700, adv: 0.6 },
    hand: { family: 'sans-serif', weight: 700, adv: 0.56, italic: true }
  };

  /* Bounding box of absolute path data (M L Q C Z). null when the data uses other commands. */
  function pathBox(d) {
    if (/[^MLQCZmlqcz0-9eE.,\s+-]/.test(d) || /[mlqc]/.test(d)) return null;
    var nums = d.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
    if (!nums || nums.length < 2) return null;
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (var i = 0; i + 1 < nums.length; i += 2) {
      var x = +nums[i], y = +nums[i + 1];
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
    return { x: x0, y: y0, w: Math.max(1e-6, x1 - x0), h: Math.max(1e-6, y1 - y0) };
  }

  /* Skeleton lettering when SB.Skeleton is loaded. // SPEC? The return of Skeleton.path is read as open strokes in
   * its own units at size 60 (u = 10), stroked at the treatment's width from art.md 4.6; p.fill === true fills it. */
  function skeletonPath(text, treatment, seed) {
    var S = SB.Skeleton;
    if (!S || typeof S.path !== 'function' || !SKELETON_T[treatment]) return null;
    try {
      var p = S.path(text, 60, treatment, { rng: SB.rng.make('letters:' + seed) });
      if (!p || typeof p.d !== 'string' || !p.d) return null;
      var box = pathBox(p.d) || (p.width > 0 && p.height > 0 ? { x: 0, y: 0, w: p.width, h: p.height } : null);
      if (!box) return null;
      return { d: p.d, box: box, fill: p.fill === true || treatment === 'nib', sw: (STROKE_U[treatment] || 1) * 10 };
    } catch (e) {
      return null;
    }
  }

  /**
   * One line of lettering fitted into the box (x, y, w, h), centered. st = { treatment, face, color, outline,
   * outlineWidth, seed, upper, lower, skew, anchor }. Returns an SVG fragment.
   */
  function letters(text, x, y, w, h, st) {
    text = String(text || '');
    if (st.upper) text = text.toUpperCase();
    if (st.lower) text = text.toLowerCase();
    if (!text) return '';
    var color = st.color || 'currentColor';
    var sk = skeletonPath(text, st.treatment, st.seed || text);
    if (sk) {
      var pad = sk.fill ? 0 : sk.sw / 2;
      var bw = sk.box.w + pad * 2, bh = sk.box.h + pad * 2, s = Math.min(w / bw, h / bh);
      var tx = x + (w - bw * s) / 2 - (sk.box.x - pad) * s, ty = y + (h - bh * s) / 2 - (sk.box.y - pad) * s;
      var g = '<g transform="translate(' + n2(tx) + ' ' + n2(ty) + ') scale(' + n2(s) + ')' + (st.skew ? ' skewX(' + n2(st.skew) + ')' : '') + '">';
      if (st.outline) {
        g += '<path d="' + sk.d + '" fill="none" stroke="' + esc(st.outline) + '" stroke-width="' + n2(sk.sw + (st.outlineWidth || 8) / s) +
          '" stroke-linecap="round" stroke-linejoin="round"/>';
      }
      if (sk.fill) g += '<path d="' + sk.d + '" fill="' + esc(color) + '"/>';
      else g += '<path d="' + sk.d + '" fill="none" stroke="' + esc(color) + '" stroke-width="' + n2(sk.sw) + '" stroke-linecap="' +
        (st.treatment === 'block' || st.treatment === 'stencil' ? 'square' : 'round') + '" stroke-linejoin="round"/>';
      return g + '</g>';
    }
    var face = FACE[st.face] || FACE.heavy, fs = h * 0.86, natural = text.length * fs * face.adv;
    if (natural > w) { fs = Math.max(h * 0.5, fs * Math.sqrt(w / natural)); natural = text.length * fs * face.adv; }
    var len = Math.min(w, natural), lx = st.anchor === 'start' ? x : x + (w - len) / 2, by = y + h / 2 + fs * 0.35;
    var attrs = ' x="' + n2(lx) + '" y="' + n2(by) + '" font-family="' + face.family + '" font-weight="' + face.weight + '"' +
      (face.italic ? ' font-style="italic"' : '') + ' font-size="' + n2(fs) + '" textLength="' + n2(len) +
      '" lengthAdjust="spacingAndGlyphs"' + (st.skew ? ' transform="skewX(' + n2(st.skew) + ')"' : '');
    var out = '';
    if (st.outline) {
      out += '<text' + attrs + ' fill="none" stroke="' + esc(st.outline) + '" stroke-width="' + n2(st.outlineWidth || fs * 0.18) +
        '" stroke-linejoin="round">' + esc(text) + '</text>';
    }
    return out + '<text' + attrs + ' fill="' + esc(color) + '">' + esc(text) + '</text>';
  }

  /* ---------------- bands ---------------- */

  var MARK_WEIGHTS = {
    FAST:    { boxed: 5, stencil: 2, geometric: 1.5, scrawl: 1.5 },
    CRUST:   { boxed: 3.5, stencil: 4.5, ransom: 1, scrawl: 1 },
    METAL:   { spiky: 7, boxed: 1.5, stencil: 1.5 },
    MELODIC: { bubble: 6, scrawl: 2.5, boxed: 1.5 },
    PARTY:   { bubble: 4.5, scrawl: 4, ransom: 1.5 },
    EMO:     { scrawl: 5.5, typed: 3, bubble: 1.5 },
    GARAGE:  { scrawl: 3.5, ransom: 4, boxed: 2.5 },
    ART:     { typed: 3.5, geometric: 4.5, ransom: 2 }
  };
  var EMBLEMS = {
    FAST: ['x', 'fist', 'bridgeTruss', 'bolt', 'arrow'],
    CRUST: ['skull', 'crow', 'barbedWire', 'hurricane', 'bones', 'gear'],
    METAL: ['skull', 'flame', 'crow', 'horns', 'eye'],
    MELODIC: ['cat', 'checker', 'starburst', 'star', 'heart'],
    PARTY: ['mullet', 'palm', 'sun', 'anchor', 'oyster'],
    EMO: ['flower', 'cassette', 'heart', 'record', 'waves'],
    GARAGE: ['flame', 'bolt', 'record', 'speaker', 'star'],
    ART: ['eye', 'gear', 'record', 'waves', 'x']
  };
  var MARK_T = { boxed: 'block', spiky: 'spike', bubble: 'bubble', scrawl: 'marker', stencil: 'stencil', typed: 'typewriter',
                 geometric: 'block', ransom: 'ransom' };

  function weightedKey(r, table) {
    var keys = Object.keys(table);
    return r.weighted(keys, keys.map(function (k) { return table[k]; })) || keys[0];
  }

  function bandPlan(band) {
    var id = band && band.id !== undefined ? band.id : '?';
    var r = SB.rng.make('id:' + id), ink = pickInks(r);
    var fam = (SB.Enums && SB.Enums.GENRE_FAMILY && SB.Enums.GENRE_FAMILY[band && band.genre]) || 'ART';
    var name = String((band && band.name) || '?');
    var style = weightedKey(r, MARK_WEIGHTS[fam] || MARK_WEIGHTS.ART);
    if (style === 'ransom' && name.replace(/\s/g, '').length > 12) style = fam === 'GARAGE' ? 'scrawl' : 'boxed';
    var emblem = r.chance(0.6) ? r.pick(EMBLEMS[fam] || EMBLEMS.ART) : null;
    var frame = r.pick(['circle', 'square', 'diamond']);
    return { r: r, ink: ink, fam: fam, name: name, style: style, emblem: emblem, frame: frame, id: id };
  }

  function frameShape(kind, cx, cy, rad, fill, stroke, sw) {
    var a = ' fill="' + fill + '"' + (stroke ? ' stroke="' + stroke + '" stroke-width="' + n2(sw) + '"' : '');
    if (kind === 'circle') return '<circle cx="' + n2(cx) + '" cy="' + n2(cy) + '" r="' + n2(rad) + '"' + a + '/>';
    if (kind === 'diamond') return '<path d="M' + n2(cx) + ' ' + n2(cy - rad * 1.12) + 'L' + n2(cx + rad * 1.12) + ' ' + n2(cy) + 'L' + n2(cx) + ' ' +
      n2(cy + rad * 1.12) + 'L' + n2(cx - rad * 1.12) + ' ' + n2(cy) + 'Z"' + a + '/>';
    return '<rect x="' + n2(cx - rad) + '" y="' + n2(cy - rad) + '" width="' + n2(rad * 2) + '" height="' + n2(rad * 2) + '"' + a + '/>';
  }

  function wordmark(p, x, y, w, h) {
    var r = p.r, A = p.ink.a, B = p.ink.b, name = p.name, out = '', t = MARK_T[p.style], seed = p.id + ':mark';
    var th = h * 0.62, ty = y + (h - th) / 2;
    if (p.style === 'boxed') {
      var rev = r.chance(0.5), sw = 6;
      if (rev) {
        out += '<rect x="' + n2(x + 2) + '" y="' + n2(y + 8) + '" width="' + n2(w - 4) + '" height="' + n2(h - 16) + '" fill="' + A + '"/>';
        out += letters(name, x + 12, ty + 2, w - 24, th - 4, { treatment: t, face: 'heavy', color: onInk(A), upper: true, seed: seed });
      } else {
        out += '<rect x="' + n2(x + 5) + '" y="' + n2(y + 11) + '" width="' + n2(w - 10) + '" height="' + n2(h - 22) + '" fill="none" stroke="' + A +
          '" stroke-width="' + sw + '"/>';
        out += letters(name, x + 16, ty + 4, w - 32, th - 8, { treatment: t, face: 'heavy', color: 'currentColor', upper: true, seed: seed });
      }
    } else if (p.style === 'spiky') {
      var up = name.toUpperCase(), R = (w - 28) * r.range(3, 6);
      var sk = skeletonPath(up, t, seed);
      if (sk) out += letters(up, x + 14, ty, w - 28, th, { treatment: t, face: 'serif', color: 'currentColor', seed: seed });
      else {
        /* letters set one by one on an arc of radius 3 to 6 times the width, each turned to the arc */
        var cnt0 = Math.max(1, up.length), fs = Math.min(th, (w - 32) / cnt0 / 0.62), span = Math.min(w - 32, cnt0 * fs * 0.62);
        var ccx = x + w / 2, ccy = y + h * 0.74 + R;
        for (var q = 0; q < up.length; q++) {
          var chq = up.charAt(q);
          if (chq === ' ') continue;
          var ax = -span / 2 + span * (q + 0.5) / cnt0, ang = ax / R, px = ccx + Math.sin(ang) * R, py = ccy - Math.cos(ang) * R;
          out += '<text x="' + n2(px) + '" y="' + n2(py) + '" transform="rotate(' + n2(ang * 180 / Math.PI) + ' ' + n2(px) + ' ' + n2(py) +
            ')" font-family="serif" font-weight="900" font-size="' + n2(fs) + '" text-anchor="middle" fill="currentColor">' + esc(chq) + '</text>';
        }
      }
      var my = y + h * 0.55;
      out += '<path d="M' + n2(x + 2) + ' ' + n2(my) + 'L' + n2(x + 18) + ' ' + n2(my - 9) + 'L' + n2(x + 16) + ' ' + n2(my + 7) + 'Z' +
        'M' + n2(x + w - 2) + ' ' + n2(my) + 'L' + n2(x + w - 18) + ' ' + n2(my - 9) + 'L' + n2(x + w - 16) + ' ' + n2(my + 7) + 'Z" fill="' + A + '"/>';
      out += '<path d="M' + n2(x + w / 2) + ' ' + n2(y + 2) + 'l-5 10h10z" fill="' + A + '"/>';
    } else if (p.style === 'bubble') {
      out += letters(name, x + 8 + 4, ty + 4, w - 16, th, { treatment: t, face: 'heavy', color: B, outline: B, upper: true, seed: seed + 's' });
      out += letters(name, x + 8, ty, w - 16, th, { treatment: t, face: 'heavy', color: PAPER_LIGHT, outline: 'currentColor', outlineWidth: 7, upper: true, seed: seed });
    } else if (p.style === 'scrawl') {
      out += letters(name, x + 6, ty - 4, w - 12, th, { treatment: t, face: 'hand', color: 'currentColor', lower: true, skew: -r.range(4, 8), seed: seed });
      var uy = y + h * 0.84;
      out += '<path d="M' + n2(x + 10) + ' ' + n2(uy) + 'Q' + n2(x + w * 0.5) + ' ' + n2(uy - 8) + ' ' + n2(x + w - 8) + ' ' + n2(uy - 2) +
        'q-12 6 -30 4" fill="none" stroke="' + A + '" stroke-width="4" stroke-linecap="round"/>';
    } else if (p.style === 'stencil') {
      out += letters(name, x + 8, ty, w - 16, th, { treatment: t, face: 'heavy', color: 'currentColor', upper: true, seed: seed });
      if (!skeletonPath(name.toUpperCase(), t, seed)) {
        var n = name.length, step = (w - 16) / Math.max(1, n);
        out += '<g fill="' + PAPER_LIGHT + '">';
        for (var i = 0; i < n; i++) if (name.charAt(i) !== ' ') out += '<rect x="' + n2(x + 8 + step * (i + 0.5) - 1.2) + '" y="' + n2(ty) + '" width="2.4" height="' + n2(th) + '"/>';
        out += '</g>';
      }
      out += '<g fill="' + A + '" opacity=".35">';
      for (var k = 0; k < 40; k++) out += '<circle cx="' + n2(x + r.range(4, w - 4)) + '" cy="' + n2(r.chance(0.5) ? ty - r.range(1, 8) : ty + th + r.range(1, 8)) + '" r="' + n2(r.range(0.6, 1.8)) + '"/>';
      out += '</g>';
    } else if (p.style === 'typed') {
      var low = name.toLowerCase(), fsT = Math.min(th * 0.9, (w - 16) / Math.max(1, low.length) / 0.6), len = low.length * fsT * 0.6;
      var tx0 = x + (w - len) / 2, base = y + h / 2 + fsT * 0.35;
      out += '<text x="' + n2(tx0) + '" y="' + n2(base) + '" font-family="monospace" font-weight="700" font-size="' + n2(fsT) + '" textLength="' + n2(len) +
        '" lengthAdjust="spacingAndGlyphs" fill="currentColor">' + esc(low) + '</text>';
      var idx = [], c;
      for (c = 0; c < low.length; c++) if (/[a-z0-9]/.test(low.charAt(c))) idx.push(c);
      if (idx.length) {
        var si = r.pick(idx), sx = tx0 + len * si / low.length;
        out += '<path d="M' + n2(sx - 1) + ' ' + n2(base - fsT * 0.3) + 'L' + n2(sx + len / low.length + 1) + ' ' + n2(base - fsT * 0.3) + '" stroke="' + A + '" stroke-width="3"/>';
      }
    } else if (p.style === 'geometric') {
      var upG = name.toUpperCase(), m = upG.length, adv = (w - 16) / Math.max(1, m), fsG = Math.min(th, adv / 0.66);
      var swap = -1;
      for (c = 0; c < m; c++) if (upG.charAt(c) === 'O' || upG.charAt(c) === 'A') { swap = c; break; }
      for (c = 0; c < m; c++) {
        var ch = upG.charAt(c), cx = x + 8 + adv * (c + 0.5), cy = y + h / 2;
        if (ch === ' ') continue;
        if (c === swap && ch === 'O') out += '<circle cx="' + n2(cx) + '" cy="' + n2(cy) + '" r="' + n2(fsG * 0.36) + '" fill="' + A + '"/>';
        else if (c === swap) out += '<path d="M' + n2(cx) + ' ' + n2(cy - fsG * 0.38) + 'L' + n2(cx + fsG * 0.36) + ' ' + n2(cy + fsG * 0.34) + 'L' + n2(cx - fsG * 0.36) + ' ' + n2(cy + fsG * 0.34) + 'Z" fill="' + A + '"/>';
        else out += '<text x="' + n2(cx) + '" y="' + n2(cy + fsG * 0.35) + '" font-family="sans-serif" font-weight="900" font-size="' + n2(fsG) + '" text-anchor="middle" fill="currentColor">' + esc(ch) + '</text>';
      }
      if (swap < 0) out += '<rect x="' + n2(x + 2) + '" y="' + n2(y + h * 0.2) + '" width="5" height="' + n2(h * 0.6) + '" fill="' + A + '"/>';
    } else {
      /* ransom: three to six cut letters on mismatched grounds */
      var chars = name.replace(/\s+/g, ' ').split(''), cnt = chars.length, advR = (w - 8) / Math.max(1, cnt), prev = null;
      var grounds = [PAPER_LIGHT, PAPER_HEX.newsprint, TONER, A, B, PAPER_HEX.goldenrod];
      for (c = 0; c < cnt; c++) {
        var chR = chars[c];
        if (chR === ' ') continue;
        var gnd;
        do { gnd = r.pick(grounds); } while (gnd === prev);
        prev = gnd;
        var face = r.pick(['serif', 'sans-serif', 'monospace']), upper = r.chance(0.7), sz = advR * r.range(0.85, 1.15), rot = r.range(-7, 7);
        var bx = x + 4 + advR * c, byy = y + h / 2 - sz / 2 + r.range(-3, 3);
        out += '<g transform="rotate(' + n2(rot) + ' ' + n2(bx + advR / 2) + ' ' + n2(byy + sz / 2) + ')"><path d="M' + n2(bx + r.range(0, 1.5)) + ' ' + n2(byy + r.range(0, 1.5)) +
          'L' + n2(bx + advR - r.range(0, 1.5)) + ' ' + n2(byy + r.range(0, 1.5)) + 'L' + n2(bx + advR - r.range(0, 1.5)) + ' ' + n2(byy + sz - r.range(0, 1.5)) +
          'L' + n2(bx + r.range(0, 1.5)) + ' ' + n2(byy + sz - r.range(0, 1.5)) + 'Z" fill="' + gnd + '" stroke="currentColor" stroke-width=".8"/>' +
          '<text x="' + n2(bx + advR / 2) + '" y="' + n2(byy + sz * 0.78) + '" font-family="' + face + '" font-weight="' + (r.chance(0.5) ? 900 : 400) +
          '" font-size="' + n2(sz * 0.82) + '" text-anchor="middle" fill="' + onInk(gnd) + '">' + esc(upper ? chR.toUpperCase() : chR.toLowerCase()) + '</text></g>';
      }
    }
    return out;
  }

  /** bandMark({ id, name, genre }, size): size is the height in px. At 20 px and under it is a square emblem
   *  (or initials) in a seeded frame; above, a 3:1 wordmark with the emblem at its left when it has one.
   *  // SPEC? the 3:1 proportion of the full mark is this file's choice. */
  function bandMark(band, size) {
    size = size > 0 ? size : 32;
    var p = bandPlan(band || {}), A = p.ink.a, title = p.name;
    if (size <= 20) {
      var s = svgOpen(size, size, 100, 100, title);
      s += frameShape(p.frame, 50, 50, 44, A, 'currentColor', 5);
      if (p.emblem) s += motifSvg(p.emblem, 50, 50, 60, onInk(A), SB.rng.make('id:' + p.id + ':emblem'));
      else s += '<text x="50" y="66" font-family="sans-serif" font-weight="900" font-size="46" text-anchor="middle" fill="' + onInk(A) + '">' + esc(nameInitials(p.name)) + '</text>';
      return s + '</svg>';
    }
    var out = svgOpen(size * 3, size, 300, 100, title);
    if (p.emblem) {
      out += motifSvg(p.emblem, 47, 50, 82, A, SB.rng.make('id:' + p.id + ':emblem'), { paper: PAPER_LIGHT });
      out += wordmark(p, 96, 0, 202, 100);
    } else {
      out += wordmark(p, 4, 0, 292, 100);
    }
    return out + '</svg>';
  }

  /* ---------------- people ---------------- */

  function instrumentGlyph(kind, x, y, s, color) {
    /* a 24-unit glyph scaled to s, top-left at x, y */
    var g = '<g transform="translate(' + n2(x) + ' ' + n2(y) + ') scale(' + n2(s / 24) + ')" fill="none" stroke="' + color +
      '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">';
    switch (kind) {
      case 'GUITAR':
        g += '<circle cx="8" cy="17" r="4.5" fill="' + color + '"/><circle cx="11.5" cy="13" r="3.2" fill="' + color + '"/><path d="M12 12L20 4"/><path d="M19 3l2 2"/>';
        break;
      case 'BASS':
        g += '<ellipse cx="7" cy="18" rx="4" ry="3.3" transform="rotate(-45 7 18)" fill="' + color + '"/><path d="M9 15L22 2"/><path d="M19 2.5l2.5 2.5M17.5 4l2.5 2.5"/>';
        break;
      case 'DRUMS':
        g += '<ellipse cx="12" cy="12" rx="8" ry="3"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/><path d="M6 3l7 7M18 3l-7 7"/>';
        break;
      case 'VOX':
        g += '<circle cx="12" cy="7" r="4.5" fill="' + color + '"/><path d="M12 11.5V20M7 21h10"/>';
        break;
      case 'KEYS':
        g += '<rect x="2.5" y="5" width="19" height="14" rx="1"/><path d="M7.5 5v14M12 5v14M16.5 5v14"/><path d="M6 5h3v8H6zM10.5 5h3v8h-3zM15 5h3v8h-3z" fill="' + color + '" stroke="none"/>';
        break;
      default:
        g += '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.4 9.3l6-.7z" fill="' + color + '"/>';
    }
    return g + '</g>';
  }

  /** personStamp({ id, first, last, instrument }, size, opts): initials on a square of the person's ink, an
   *  instrument glyph in a corner chip, and a seeded mark (stripe, dots, inner border or none) so stamps stay apart
   *  in grayscale. opts.past fades it and dashes the edge; opts.watched adds a small ring. No faces. */
  function personStamp(person, size, opts) {
    person = person || {}; opts = opts || {};
    size = size > 0 ? size : 32;
    var id = person.id !== undefined ? person.id : '?', r = SB.rng.make('id:' + id), ink = pickInks(r);
    var A = ink.a, fg = onInk(A), ini = initials(person.first, person.last), pat = r.int(0, 3);
    var inst = SB.Enums && SB.Enums.INSTRUMENT && SB.Enums.INSTRUMENT[person.instrument] ? person.instrument : 'OTHER';
    var title = [person.first, person.last].filter(Boolean).join(' ') || ini;
    if (person.instrument) title += ', ' + String(person.instrument).toLowerCase();
    if (opts.past) title += ' (past)';
    var s = svgOpen(size, size, 100, 100, title);
    s += '<g' + (opts.past ? ' opacity=".45"' : '') + '>';
    s += '<rect x="4" y="4" width="92" height="92" rx="4" fill="' + A + '" stroke="currentColor" stroke-width="4"' + (opts.past ? ' stroke-dasharray="10 6"' : '') + '/>';
    if (pat === 1) s += '<path d="M4 70L70 4H86L4 86Z" fill="' + fg + '" opacity=".22"/>';
    else if (pat === 2) s += '<g fill="' + fg + '" opacity=".35"><circle cx="16" cy="16" r="4"/><circle cx="30" cy="16" r="4"/><circle cx="44" cy="16" r="4"/></g>';
    else if (pat === 3) s += '<rect x="13" y="13" width="74" height="74" fill="none" stroke="' + fg + '" stroke-width="3" opacity=".5"/>';
    var lettered = letters(ini, 12, 22, 76, 46, { treatment: 'block', face: 'heavy', color: fg, upper: true, seed: id + ':stamp' });
    s += lettered;
    s += '<rect x="62" y="62" width="30" height="30" rx="3" fill="' + fg + '"/>';
    s += instrumentGlyph(inst, 65, 65, 24, A);
    s += '</g>';
    if (opts.watched) s += '<circle cx="88" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="88" cy="12" r="3.5" fill="currentColor"/>';
    return s + '</svg>';
  }

  /* ---------------- rooms ---------------- */

  var FLICK_STYLE = '<style>@keyframes sbflick{0%,49%{opacity:1}50%,100%{opacity:.25}}.sbflick{animation:sbflick 2s steps(1) infinite}' +
    '@media (prefers-reduced-motion:reduce){.sbflick{animation:none}}.reduce-motion .sbflick,[data-motion="reduce"] .sbflick{animation:none}</style>';
  /* // SPEC? the game's own reduced-motion switch is matched as a .reduce-motion class or data-motion="reduce" on an ancestor. */

  function tree(style, x, base, h, r) {
    if (style === 'pine') {
      return '<path d="M' + n2(x) + ' ' + n2(base - h) + 'l' + n2(h * 0.22) + ' ' + n2(h * 0.35) + 'h' + n2(-h * 0.1) + 'l' + n2(h * 0.18) + ' ' + n2(h * 0.3) +
        'h' + n2(-h * 0.1) + 'l' + n2(h * 0.16) + ' ' + n2(h * 0.25) + 'h' + n2(-h * 0.72) + 'l' + n2(h * 0.16) + ' ' + n2(-h * 0.25) + 'h' + n2(-h * 0.1) +
        'l' + n2(h * 0.18) + ' ' + n2(-h * 0.3) + 'h' + n2(-h * 0.1) + 'z" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.5"/>' +
        '<path d="M' + n2(x) + ' ' + n2(base - h * 0.1) + 'V' + n2(base) + '" stroke="currentColor" stroke-width="3"/>';
    }
    var lean = r.range(-8, 8), top = base - h, s = '<path d="M' + n2(x - 2) + ' ' + n2(base) + 'Q' + n2(x + lean * 0.3) + ' ' + n2(base - h * 0.5) + ' ' + n2(x + lean) + ' ' + n2(top) +
      'L' + n2(x + lean + 2.5) + ' ' + n2(top) + 'Q' + n2(x + lean * 0.3 + 3) + ' ' + n2(base - h * 0.5) + ' ' + n2(x + 3) + ' ' + n2(base) + 'Z" fill="currentColor"/>';
    s += '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">';
    for (var i = 0; i < 7; i++) {
      var a = Math.PI + (i + 0.5) * Math.PI / 7, L = h * 0.38;
      s += '<path d="M' + n2(x + lean + 1) + ' ' + n2(top) + 'q' + n2(Math.cos(a) * L * 0.5) + ' ' + n2(Math.sin(a) * L * 0.5 - 6) + ' ' + n2(Math.cos(a) * L) + ' ' + n2(Math.sin(a) * L * 0.4 + 8) + '"/>';
    }
    return s + '</g>';
  }
  function bulbs(x0, x1, y, sag, n, color) {
    var s = '<path d="M' + n2(x0) + ' ' + n2(y) + 'Q' + n2((x0 + x1) / 2) + ' ' + n2(y + sag * 2) + ' ' + n2(x1) + ' ' + n2(y) + '" fill="none" stroke="currentColor" stroke-width=".8"/>';
    for (var i = 0; i < n; i++) {
      var t = (i + 0.5) / n, bx = x0 + (x1 - x0) * t, by = y + sag * 4 * t * (1 - t);
      s += '<circle cx="' + n2(bx) + '" cy="' + n2(by + 2) + '" r="2.2" fill="' + color + '" stroke="currentColor" stroke-width=".6"/>';
    }
    return s;
  }
  function win(x, y, w, h, boarded, lit) {
    var s = '<rect x="' + n2(x) + '" y="' + n2(y) + '" width="' + n2(w) + '" height="' + n2(h) + '" fill="' + (lit || 'currentColor') + '" fill-opacity="' + (lit ? '.85' : '.12') +
      '" stroke="currentColor" stroke-width="1.5"/>';
    if (boarded) s += '<path d="M' + n2(x - 2) + ' ' + n2(y + h * 0.25) + 'L' + n2(x + w + 2) + ' ' + n2(y + h * 0.55) + 'M' + n2(x - 2) + ' ' + n2(y + h * 0.75) + 'L' + n2(x + w + 2) + ' ' + n2(y + h * 0.4) +
      '" stroke="currentColor" stroke-width="4"/>';
    return s;
  }
  function signName(name, sketchy, r) {
    var s = String(name || '').replace(/^the\s+/i, '');
    if (sketchy && s.length > 3) {
      var i = r.int(1, s.length - 2);
      if (s.charAt(i) !== ' ') s = s.slice(0, i) + ' ' + s.slice(i + 1);
    }
    return s;
  }

  /** roomDrawing({ id, kind, cap, sketch, standing, name, outdoor }, width, height, opts): the building by kind on a
   *  240 x 140 stage, wider for a bigger room, worn when sketchy, tidy with flowers when it stands well.
   *  opts = { houseType: HOUSE_TYPE, style: 'palm' | 'pine' }. */
  function roomDrawing(room, width, height, opts) {
    room = room || {}; opts = opts || {};
    width = width > 0 ? width : 240; height = height > 0 ? height : 140;
    var id = room.id !== undefined ? room.id : '?', r = SB.rng.make('id:' + id), ink = pickInks(r);
    var kind = room.outdoor && room.kind !== 'OUTDOOR' && room.kind !== 'HOUSE' ? 'OUTDOOR' : (room.kind || 'HOUSE');
    var sketchy = (+room.sketch || 0) >= 60, good = !sketchy && (+room.standing || 0) >= 60;
    var cap = +room.cap > 0 ? +room.cap : 60, fw = clamp(Math.log(cap / 30) / Math.log(1000 / 30), 0, 1);
    var bw = 110 + 100 * fw, G = 128, B = ink.b, A = ink.a, style = opts.style === 'pine' ? 'pine' : 'palm';
    var x0 = (240 - bw) / 2, s = '', glowId = 'sbglow-' + safeId(id), name = room.name || '';
    var title = name || String(kind).toLowerCase();
    var flick = sketchy ? ' class="sbflick"' : '';
    var neonDefs = '<defs><filter id="' + glowId + '" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="2"/></filter></defs>';
    s += '<path d="M0 ' + G + 'H240" stroke="currentColor" stroke-width="2"/>';

    if (kind === 'HOUSE') {
      var ht = opts.houseType || 'CARPORT';
      if (ht === 'ROWHOUSE') {
        var rw = Math.min(70, bw * 0.45), rx = 120 - rw / 2;
        s += '<rect x="' + n2(rx - rw) + '" y="34" width="' + n2(rw) + '" height="94" fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>';
        s += '<rect x="' + n2(rx + rw) + '" y="40" width="' + n2(rw) + '" height="88" fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>';
        s += '<rect x="' + n2(rx) + '" y="28" width="' + n2(rw) + '" height="100" fill="currentColor" fill-opacity=".14" stroke="currentColor" stroke-width="2"/>';
        s += '<rect x="' + n2(rx - 3) + '" y="24" width="' + n2(rw + 6) + '" height="5" fill="currentColor"/>';
        s += win(rx + 10, 38, 18, 22, false) + win(rx + rw - 28, 38, 18, 22, sketchy) + win(rx + 10, 72, 18, 22, false, B);
        s += '<rect x="' + n2(rx + rw - 26) + '" y="98" width="16" height="30" fill="currentColor" fill-opacity=".35" stroke="currentColor" stroke-width="1.5"/>';
        s += '<path d="M' + n2(rx + rw - 32) + ' 128h28v-4h-24v-4h20" fill="none" stroke="currentColor" stroke-width="1.5"/>';
      } else {
        var hx = x0, hw = Math.min(bw * 0.6, 120), hy = 70;
        s += '<path d="M' + n2(hx - 4) + ' ' + hy + 'L' + n2(hx + hw / 2) + ' ' + n2(hy - 26) + 'L' + n2(hx + hw + 4) + ' ' + hy + 'Z" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="2"/>';
        s += '<rect x="' + n2(hx) + '" y="' + hy + '" width="' + n2(hw) + '" height="' + (G - hy) + '" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="2"/>';
        s += '<rect x="' + n2(hx + hw * 0.42) + '" y="96" width="16" height="32" fill="currentColor" fill-opacity=".4" stroke="currentColor" stroke-width="1.5"/>';
        if (ht === 'LIVING_ROOM') {
          s += win(hx + 8, 80, hw * 0.3, 24, false, B);
          for (var f = 0; f < 3; f++) s += '<circle cx="' + n2(hx + 14 + f * 9) + '" cy="92" r="3" fill="currentColor"/><rect x="' + n2(hx + 11 + f * 9) + '" y="95" width="6" height="9" fill="currentColor"/>';
        } else {
          s += win(hx + 10, 82, 18, 16, sketchy) + win(hx + hw - 28, 82, 18, 16, false);
        }
        var cx0 = hx + hw, cx1 = Math.min(236, cx0 + Math.max(50, bw - hw));
        if (ht === 'GARAGE') {
          s += '<rect x="' + n2(cx0) + '" y="84" width="' + n2(cx1 - cx0) + '" height="44" fill="currentColor" fill-opacity=".12" stroke="currentColor" stroke-width="2"/>';
          s += '<rect x="' + n2(cx0 + 6) + '" y="96" width="' + n2(cx1 - cx0 - 12) + '" height="32" fill="' + B + '" fill-opacity=".8" stroke="currentColor" stroke-width="1.5"/>';
          s += '<path d="M' + n2(cx0 + 6) + ' 90h' + n2(cx1 - cx0 - 12) + 'M' + n2(cx0 + 6) + ' 93h' + n2(cx1 - cx0 - 12) + '" stroke="currentColor"/>';
        } else if (ht === 'BASEMENT') {
          s += win(hx + 6, G - 2, 14, 7, false, B) + win(hx + hw - 20, G - 2, 14, 7, false, B);
          s += '<path d="M' + n2(cx0 + 4) + ' ' + G + 'l8 -8h6l8 8M' + n2(cx0 + 10) + ' ' + n2(G - 2) + 'h10" fill="none" stroke="currentColor" stroke-width="1.5"/>';
          s += '<path d="M' + n2(cx0 + 2) + ' ' + G + 'v6h28v-6" fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-width="1.5"/>';
        } else {
          s += '<path d="M' + n2(cx0) + ' 86H' + n2(cx1) + '" stroke="currentColor" stroke-width="4"/>';
          s += '<path d="M' + n2(cx1 - 3) + ' 86V' + G + 'M' + n2(cx0 + (cx1 - cx0) * 0.5) + ' 86V' + G + '" stroke="currentColor" stroke-width="2.5"/>';
          s += bulbs(cx0 + 2, cx1 - 4, 90, 4, r.int(8, 14), B);
        }
        var fx = Math.max(4, hx - 40);
        s += '<path d="M' + n2(fx) + ' 112H' + n2(hx) + '" stroke="currentColor" stroke-width="1.5"/>';
        for (var p = fx; p < hx; p += 6) s += '<path d="M' + n2(p) + ' 110V' + G + '" stroke="currentColor" stroke-width="1.2"/>';
        s += tree(style, Math.max(14, hx - 22), G, 70, r);
      }
    } else if (kind === 'DIY') {
      s += '<path d="M' + n2(x0) + ' ' + G + 'V60L' + n2(x0 + bw / 2) + ' 46L' + n2(x0 + bw) + ' 60V' + G + '" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="2"/>';
      for (var rib = x0 + 6; rib < x0 + bw; rib += 6) s += '<path d="M' + n2(rib) + ' ' + n2(60 - 14 * (1 - Math.abs(rib - x0 - bw / 2) / (bw / 2))) + 'V' + G + '" stroke="currentColor" stroke-width=".6" opacity=".6"/>';
      var dx = x0 + bw * 0.25, dw = bw * 0.38;
      s += '<rect x="' + n2(dx) + '" y="80" width="' + n2(dw) + '" height="' + (G - 80) + '" fill="currentColor" fill-opacity=".22" stroke="currentColor" stroke-width="2"/>';
      for (var dr = 84; dr < G; dr += 5) s += '<path d="M' + n2(dx) + ' ' + dr + 'h' + n2(dw) + '" stroke="currentColor" stroke-width=".8"/>';
      s += '<rect x="' + n2(dx - 4) + '" y="' + G + '" width="' + n2(dw + 8) + '" height="5" fill="currentColor"/>';
      s += '<rect x="' + n2(x0 + bw * 0.75) + '" y="96" width="14" height="32" fill="' + B + '" fill-opacity=".7" stroke="currentColor" stroke-width="1.5"/>';
      if (sketchy) s += win(x0 + 8, 70, 16, 12, true);
    } else if (kind === 'HALL') {
      var gable = r.chance(0.5);
      if (gable) s += '<path d="M' + n2(x0 - 4) + ' 62L' + n2(x0 + bw / 2) + ' 30L' + n2(x0 + bw + 4) + ' 62Z" fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-width="2"/>';
      s += '<rect x="' + n2(x0) + '" y="62" width="' + n2(bw) + '" height="' + (G - 62) + '" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="2"/>';
      for (var row = 0; row < 8; row++) {
        var yy = 62 + row * 8;
        for (var bx = x0 + (row % 2 ? 0 : 8); bx < x0 + bw; bx += 16) s += '<path d="M' + n2(bx) + ' ' + yy + 'v8" stroke="currentColor" stroke-width=".5" opacity=".5"/>';
        s += '<path d="M' + n2(x0) + ' ' + yy + 'h' + n2(bw) + '" stroke="currentColor" stroke-width=".5" opacity=".5"/>';
      }
      s += '<rect x="' + n2(x0 + bw / 2 - 9) + '" y="96" width="18" height="32" fill="currentColor" fill-opacity=".5" stroke="currentColor" stroke-width="2"/>';
      s += win(x0 + 10, 76, 16, 14, sketchy) + win(x0 + bw - 26, 76, 16, 14, false);
      if (!gable) s += '<path d="M' + n2(x0 + bw + 10) + ' ' + G + 'V30" stroke="currentColor" stroke-width="1.5"/><path d="M' + n2(x0 + bw + 10) + ' 31h16v10h-16z" fill="' + B + '" stroke="currentColor"/>';
      var sbx = x0 + bw * 0.15, sbw = bw * 0.7;
      s += '<rect x="' + n2(sbx) + '" y="' + (gable ? 66 : 48) + '" width="' + n2(sbw) + '" height="13" fill="' + PAPER_LIGHT + '" stroke="currentColor" stroke-width="1.5"/>';
      s += letters(signName(name, sketchy, r), sbx + 3, (gable ? 66 : 48) + 2, sbw - 6, 9, { treatment: 'block', face: 'heavy', color: TONER, upper: true, seed: id + ':sign' });
    } else if (kind === 'BAR' || kind === 'CLUB' || kind === 'BIG') {
      var tall = kind === 'BIG' ? 30 : kind === 'CLUB' ? 44 : 56;
      s += neonDefs;
      s += '<rect x="' + n2(x0) + '" y="' + tall + '" width="' + n2(bw) + '" height="' + (G - tall) + '" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="2"/>';
      if (kind === 'BIG') {
        s += '<path d="M' + n2(x0 + 10) + ' 72H' + n2(x0 + bw - 10) + 'L' + n2(x0 + bw - 22) + ' 88H' + n2(x0 + 22) + 'Z" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="2"/>';
        for (var bb = x0 + 14; bb < x0 + bw - 12; bb += 8) s += '<circle cx="' + n2(bb) + '" cy="72" r="1.6" fill="' + B + '"' + (sketchy && r.chance(0.3) ? ' opacity=".2"' : '') + '/>';
        s += '<rect x="' + n2(x0 + bw / 2 - 9) + '" y="8" width="18" height="60" fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-width="1.5"/>';
        s += '<g' + flick + '>' + letters(signName(name, sketchy, r).slice(0, 8), x0 + bw / 2 - 58, 76, 116, 10, { treatment: 'block', face: 'heavy', color: 'currentColor', upper: true, seed: id + ':sign' }) + '</g>';
        for (var dd = 0; dd < 3; dd++) s += '<rect x="' + n2(x0 + bw / 2 - 30 + dd * 21) + '" y="98" width="18" height="30" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.5"/>';
      } else {
        var aw = bw - 8, ay = kind === 'CLUB' ? 76 : 82;
        s += '<path d="M' + n2(x0 + 4) + ' ' + ay + 'h' + n2(aw) + 'l-6 10h' + n2(-aw + 12) + 'z" fill="' + A + '" stroke="currentColor" stroke-width="1.5"/>';
        for (var st = x0 + 10; st < x0 + aw; st += 12) s += '<path d="M' + n2(st) + ' ' + ay + 'l-2 10" stroke="' + PAPER_LIGHT + '" stroke-width="4" opacity=".7"/>';
        s += win(x0 + 10, ay + 14, bw * 0.45, G - ay - 22, sketchy) + '<rect x="' + n2(x0 + bw - 30) + '" y="' + (ay + 14) + '" width="18" height="' + (G - ay - 14) + '" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.5"/>';
        var ny = tall + 6, nh = ay - tall - 12, neon = signName(name, sketchy, r);
        var tubes = letters(neon, x0 + 10, ny, bw - 20, Math.max(8, nh), { treatment: 'marker', face: 'hand', color: B, lower: true, seed: id + ':sign' });
        s += '<g' + flick + '><g filter="url(#' + glowId + ')" opacity=".8">' + tubes + '</g>' + tubes + '</g>';
      }
    } else if (kind === 'SHOP') {
      s += '<rect x="' + n2(x0) + '" y="50" width="' + n2(bw) + '" height="' + (G - 50) + '" fill="currentColor" fill-opacity=".1" stroke="currentColor" stroke-width="2"/>';
      s += '<rect x="' + n2(x0 + 6) + '" y="56" width="' + n2(bw - 12) + '" height="14" fill="' + PAPER_LIGHT + '" stroke="currentColor" stroke-width="1.5"/>';
      s += letters(signName(name, sketchy, r), x0 + 10, 58, bw - 20, 10, { treatment: 'block', face: 'heavy', color: TONER, upper: true, seed: id + ':sign' });
      var wx = x0 + 10, ww = bw * 0.55, wy = 80;
      s += win(wx, wy, ww, 36, sketchy);
      if (r.chance(0.5)) {
        for (var rc = 0; rc < Math.floor(ww / 12); rc++) s += '<rect x="' + n2(wx + 3 + rc * 12) + '" y="' + n2(wy + 22) + '" width="9" height="9" fill="' + (rc % 2 ? A : B) + '" stroke="currentColor" stroke-width=".6"/>';
      } else {
        s += '<rect x="' + n2(wx + ww / 2 - 22) + '" y="' + n2(wy + 14) + '" width="44" height="10" rx="5" fill="' + A + '" stroke="currentColor"/>';
        s += '<circle cx="' + n2(wx + ww / 2 - 14) + '" cy="' + n2(wy + 27) + '" r="2.5" fill="currentColor"/><circle cx="' + n2(wx + ww / 2 + 14) + '" cy="' + n2(wy + 27) + '" r="2.5" fill="currentColor"/>';
      }
      s += '<rect x="' + n2(x0 + bw - 28) + '" y="90" width="18" height="38" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.5"/>';
    } else {
      /* OUTDOOR: an open lot, a generator, a cord, a pop-up canopy */
      var cx = x0 + bw * 0.35, cw = Math.min(110, bw * 0.6);
      s += '<path d="M' + n2(cx) + ' 70L' + n2(cx + cw / 2) + ' 56L' + n2(cx + cw) + ' 70Z" fill="' + B + '" fill-opacity=".8" stroke="currentColor" stroke-width="2"/>';
      s += '<path d="M' + n2(cx) + ' 70h' + n2(cw) + '" stroke="currentColor" stroke-width="2"/>';
      for (var sc = 0; sc < 6; sc++) s += '<path d="M' + n2(cx + sc * cw / 6) + ' 70q' + n2(cw / 12) + ' 6 ' + n2(cw / 6) + ' 0" fill="none" stroke="currentColor" stroke-width="1.2"/>';
      s += '<path d="M' + n2(cx + 2) + ' 70V' + G + 'M' + n2(cx + cw - 2) + ' 70V' + G + '" stroke="currentColor" stroke-width="2"/>';
      s += '<rect x="' + n2(cx + 10) + '" y="106" width="22" height="22" fill="currentColor" fill-opacity=".5" stroke="currentColor" stroke-width="1.5"/>';
      var gx = x0 + 6;
      s += '<rect x="' + n2(gx) + '" y="110" width="22" height="16" rx="2" fill="currentColor" fill-opacity=".35" stroke="currentColor" stroke-width="1.5"/><circle cx="' + n2(gx + 6) + '" cy="126" r="2.5" fill="currentColor"/><circle cx="' + n2(gx + 16) + '" cy="126" r="2.5" fill="currentColor"/>';
      s += '<path d="M' + n2(gx + 22) + ' 118q20 12 ' + n2(cx - gx - 12) + ' 2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="1 0"/>';
      s += tree(style, Math.min(226, cx + cw + 22), G, 66, r);
      for (var gr = 0; gr < 18; gr++) { var gxx = r.range(4, 236); s += '<path d="M' + n2(gxx) + ' ' + G + 'l1.5 -4" stroke="currentColor" stroke-width=".8"/>'; }
    }

    if (good) {
      s += '<path d="M' + n2(x0) + ' ' + (G - 3) + 'h' + n2(bw) + '" stroke="' + A + '" stroke-width="2"/>';
      for (var fl = 0; fl < 5; fl++) {
        var fx2 = x0 + 6 + fl * (bw - 12) / 4;
        s += '<path d="M' + n2(fx2) + ' ' + G + 'v-7" stroke="currentColor" stroke-width="1"/><circle cx="' + n2(fx2) + '" cy="' + (G - 8) + '" r="2.4" fill="' + B + '" stroke="currentColor" stroke-width=".6"/>';
      }
    }
    if (sketchy) {
      for (var cr = 0; cr < 3; cr++) { var crx = x0 + r.range(8, bw - 8); s += '<path d="M' + n2(crx) + ' ' + n2(G - r.range(20, 50)) + 'l3 6 -2 5 4 7" fill="none" stroke="currentColor" stroke-width=".8"/>'; }
    }
    var out = svgOpen(width, height, 240, 140, title, ' preserveAspectRatio="xMidYMax meet"');
    if (sketchy) out += FLICK_STYLE;
    return out + s + '</svg>';
  }

  /** roomGlyph(kind, size): the small kind glyph for lists and maps, in currentColor. */
  function roomGlyph(kind, size) {
    size = size > 0 ? size : 16;
    var g = '';
    switch (kind) {
      case 'HOUSE': g = '<path d="M3 12L12 4l9 8"/><path d="M5 11v9h14v-9"/><path d="M10 20v-5h4v5"/>'; break;
      case 'DIY': g = '<path d="M3 20V9l9-4 9 4v11z"/><path d="M8 20v-7h8v7M8 15h8M8 17h8"/>'; break;
      case 'HALL': g = '<path d="M3 20V8h18v12z"/><path d="M10 20v-6h4v6"/><path d="M6 11h12"/><path d="M21 8V3h3"/>'; break;
      case 'BAR': g = '<path d="M3 20V7h18v13"/><path d="M3 11l2-3h14l2 3"/><rect x="6" y="13" width="6" height="5"/><path d="M15 20v-7h3v7"/>'; break;
      case 'CLUB': g = '<path d="M4 20V5h16v15"/><path d="M2 10h20l-2 3H4z"/><path d="M10 20v-5h4v5"/><circle cx="7" cy="7.5" r=".8"/><circle cx="12" cy="7.5" r=".8"/><circle cx="17" cy="7.5" r=".8"/>'; break;
      case 'BIG': g = '<path d="M3 20V8h18v12"/><path d="M10 8V2h4v6"/><path d="M5 11h14l-2 3H7z"/><path d="M8 20v-4M12 20v-4M16 20v-4"/>'; break;
      case 'SHOP': g = '<path d="M3 20V6h18v14"/><path d="M3 9h18"/><rect x="5" y="12" width="8" height="5"/><circle cx="9" cy="14.5" r="1.6"/><path d="M16 20v-8h3v8"/>'; break;
      case 'OUTDOOR': g = '<path d="M3 10l9-5 9 5z"/><path d="M4 10v10M20 10v10"/><path d="M2 20h20"/><rect x="7" y="15" width="5" height="5"/>'; break;
      default: g = '<rect x="4" y="6" width="16" height="14"/>';
    }
    var title = String(kind || 'room').toLowerCase();
    return svgOpen(size, size, 24, 24, title) + '<g fill="none" stroke="currentColor" stroke-width="' + (size < 16 ? 2.2 : 1.7) +
      '" stroke-linecap="round" stroke-linejoin="round">' + g + '</g></svg>';
  }

  /* ---------------- bookers ---------------- */

  var BOOKER_T = ['block', 'marker', 'bubble', 'stencil', 'nib', 'spike', 'typewriter'];
  var BOOKER_FACE = { block: 'heavy', marker: 'hand', bubble: 'heavy', stencil: 'heavy', nib: 'serif', spike: 'serif', typewriter: 'mono' };
  var BOOKER_EMBLEMS = ['star', 'x', 'heart', 'bolt', 'eye', 'record', 'cassette', 'flower', 'sun', 'skull', 'crow', 'cat', 'flame', 'anchor', 'waves'];

  function splitLines(name, maxChars) {
    var words = String(name || '').split(/\s+/).filter(Boolean), lines = [], cur = '';
    words.forEach(function (w) {
      if (!cur) cur = w;
      else if ((cur + ' ' + w).length <= maxChars) cur += ' ' + w;
      else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    if (lines.length > 3) lines = [lines[0], lines[1], lines.slice(2).join(' ')];
    return lines.length ? lines : ['?'];
  }

  /** bookerMark(name, markOrSeed, size): the booking name in one treatment with an optional emblem inside a frame
   *  (circle, box, star or none), square. markOrSeed is player.mark ({ v: 1, seed }) or a seed string (a person id). */
  function bookerMark(name, markOrSeed, size) {
    size = size > 0 ? size : 64;
    var seed = typeof markOrSeed === 'string' || typeof markOrSeed === 'number' ? String(markOrSeed) :
      (markOrSeed && markOrSeed.seed !== undefined ? String(markOrSeed.seed) : String(name || ''));
    var r = SB.rng.make('mark:' + seed), ink = pickInks(r);
    var t = r.pick(BOOKER_T), frame = r.pick(['circle', 'box', 'star', 'none']), emblem = r.chance(0.65) ? r.pick(BOOKER_EMBLEMS) : null;
    var upper = t === 'block' || t === 'stencil' || t === 'spike' || (t === 'bubble' && r.chance(0.6));
    var title = String(name || 'booking mark');
    var s = svgOpen(size, size, 100, 100, title);
    if (frame === 'circle') s += '<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="50" r="40" fill="none" stroke="' + ink.a + '" stroke-width="1.5"/>';
    else if (frame === 'box') s += '<rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" stroke-width="4"/><rect x="11" y="11" width="78" height="78" fill="' + ink.a + '" fill-opacity=".14"/>';
    else if (frame === 'star') {
      var pts = [];
      for (var i = 0; i < 16; i++) { var a = -Math.PI / 2 + i * Math.PI / 8, rr = i % 2 ? 40 : 48; pts.push(n2(50 + Math.cos(a) * rr) + ' ' + n2(50 + Math.sin(a) * rr)); }
      s += '<path d="M' + pts.join('L') + 'Z" fill="' + ink.a + '" fill-opacity=".14" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>';
    }
    var inset = frame === 'none' ? 4 : frame === 'box' ? 14 : 20, top = inset + 2, avail = 100 - inset * 2;
    if (emblem) {
      s += motifSvg(emblem, 50, top + avail * 0.22, avail * 0.38, ink.a, SB.rng.make('mark:' + seed + ':emblem'));
      top += avail * 0.46; avail = 100 - inset - top;
    }
    var lines = splitLines(name, emblem ? 12 : 9), lh = Math.min(avail / lines.length, 22);
    var y0 = top + (avail - lh * lines.length) / 2;
    lines.forEach(function (ln, k) {
      var wFrac = frame === 'circle' || frame === 'star' ? 0.86 : 1;
      var lw = (100 - inset * 2) * wFrac;
      s += letters(ln, 50 - lw / 2, y0 + k * lh, lw, lh * 0.95, { treatment: t, face: BOOKER_FACE[t], color: 'currentColor', upper: upper, lower: t === 'marker' || t === 'typewriter', seed: seed + ':' + k });
    });
    return s + '</svg>';
  }

  /* ---------------- cities ---------------- */

  /** cityStamp(indexEntry, size): the city name round the top of a rubber-stamp circle, the state in the middle, in the
   *  entry's first ink on its paper, slightly rotated, with dropouts in the ink. */
  function cityStamp(entry, size) {
    entry = entry || {};
    size = size > 0 ? size : 96;
    var slug = entry.slug || entry.name || 'city', r = SB.rng.make('city:' + slug);
    var inks = entry.inks || [], A = inkHex(inks[0], TONER), P = inkHex(entry.paper, PAPER_LIGHT);
    if (Math.abs(lum(A) - lum(P)) < 0.2) A = lum(P) > 0.4 ? TONER : PAPER_LIGHT;
    var rot = r.range(-8, 8), id = safeId(slug) + '-' + Math.round(size), name = String(entry.name || '').toUpperCase(), st = String(entry.state || '').toUpperCase();
    var title = [entry.name, entry.state].filter(Boolean).join(', ') || 'city';
    var s = svgOpen(size, size, 100, 100, title);
    s += '<defs><path id="sbcp-' + id + '" d="M18 52A32 32 0 0 1 82 52"/><mask id="sbcm-' + id + '"><rect width="100" height="100" fill="#fff"/>';
    for (var i = 0; i < 70; i++) s += '<circle cx="' + n2(r.range(4, 96)) + '" cy="' + n2(r.range(4, 96)) + '" r="' + n2(r.range(0.3, 1.4)) + '" fill="#000"/>';
    s += '</mask></defs>';
    s += '<circle cx="50" cy="50" r="49" fill="' + P + '"/>';
    s += '<g transform="rotate(' + n2(rot) + ' 50 50)" mask="url(#sbcm-' + id + ')" fill="' + A + '" stroke="' + A + '">';
    s += '<circle cx="50" cy="50" r="45" fill="none" stroke-width="4"/><circle cx="50" cy="50" r="38" fill="none" stroke-width="1.5"/>';
    var fs = clamp(150 / Math.max(4, name.length), 6, 12);
    s += '<text font-family="sans-serif" font-weight="900" font-size="' + n2(fs) + '" text-anchor="middle" stroke="none"><textPath href="#sbcp-' + id +
      '" startOffset="50%"' + (name.length > 9 ? ' textLength="96" lengthAdjust="spacingAndGlyphs"' : '') + '>' + esc(name) + '</textPath></text>';
    s += letters(st || '?', 30, 46, 40, 24, { treatment: 'block', face: 'heavy', color: A, upper: true, seed: 'city:' + slug });
    s += '<path d="M27 76h46" stroke-width="1.5"/>';
    s += '<path d="M15 50l2.5 -2 2.5 2 -2.5 2zM80 50l2.5 -2 2.5 2 -2.5 2z" stroke="none"/>';
    s += '</g>';
    return s + '</svg>';
  }

  /* ---------------- generations ---------------- */

  /** genGlyph(gen, size): open ring, half-filled ring, filled dot (art.md 2.1); under 8 px a square outline, a
   *  triangle and a filled square, so the three stay different shapes when tiny. currentColor. */
  function genGlyph(gen, size) {
    size = size > 0 ? size : 12;
    var g = +gen === 1 ? 1 : +gen === 2 ? 2 : 0, title = ['kids', 'the middle', 'old heads'][g], s;
    if (size < 8) {
      s = svgOpen(size, size, 8, 8, title);
      if (g === 0) s += '<rect x="1" y="1" width="6" height="6" fill="none" stroke="currentColor" stroke-width="2"/>';
      else if (g === 1) s += '<path d="M4 0.6L7.6 7.2H0.4Z" fill="currentColor"/>';
      else s += '<rect x="0.5" y="0.5" width="7" height="7" fill="currentColor"/>';
      return s + '</svg>';
    }
    s = svgOpen(size, size, 12, 12, title);
    if (g === 0) s += '<circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    else if (g === 1) s += '<path d="M6 1.5A4.5 4.5 0 0 0 6 10.5Z" fill="currentColor"/><circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>';
    else s += '<circle cx="6" cy="6" r="5.25" fill="currentColor"/>';
    return s + '</svg>';
  }

  /** inks(id): the entity's stable ink pair. */
  function inks(id) {
    return pickInks(SB.rng.make('id:' + id));
  }

  return {
    inks: inks,
    bandMark: bandMark,
    personStamp: personStamp,
    roomDrawing: roomDrawing,
    roomGlyph: roomGlyph,
    bookerMark: bookerMark,
    cityStamp: cityStamp,
    genGlyph: genGlyph
  };
});
