/* Scene Booker: art/skeleton.js (ART-A)
 * SB.Skeleton: the single-stroke lettering alphabet of art.md 4.6 and its eight stroke treatments.
 * Glyphs sit on a 4 x 6 unit grid (y down, cap line 0, baseline 6). A glyph is { w, s } where s is a list of
 * strokes and a stroke a list of points; a point with a third element 1 is a quadratic control point.
 * Pure: every jitter comes from the rng the caller passes (or one seeded from the text). Canvas functions save and
 * restore the context, so its state is left as found.
 */
SB.module('Skeleton', function (SB) {
  'use strict';

  var G = {
    A: [4, [[[0, 6], [2, 0], [4, 6]], [[0.8, 3.8], [3.2, 3.8]]]],
    B: [4, [[[0, 3], [2.6, 3], [3.8, 3, 1], [3.8, 1.5], [3.8, 0, 1], [2.6, 0], [0, 0], [0, 6], [2.6, 6], [4, 6, 1], [4, 4.5], [4, 3, 1], [2.6, 3]]]],
    C: [4, [[[4, 0.7], [3.3, 0], [2, 0], [0, 0, 1], [0, 3], [0, 6, 1], [2, 6], [3.3, 6], [4, 5.3]]]],
    D: [4, [[[0, 0], [0, 6], [1.8, 6], [4, 6, 1], [4, 3], [4, 0, 1], [1.8, 0], [0, 0]]]],
    E: [4, [[[4, 0], [0, 0], [0, 6], [4, 6]], [[0, 3], [3, 3]]]],
    F: [4, [[[4, 0], [0, 0], [0, 6]], [[0, 3], [3, 3]]]],
    G: [4, [[[4, 0.8], [3.3, 0], [2, 0], [0, 0, 1], [0, 3], [0, 6, 1], [2, 6], [4, 6, 1], [4, 3.4], [2.2, 3.4]]]],
    H: [4, [[[0, 0], [0, 6]], [[4, 0], [4, 6]], [[0, 3], [4, 3]]]],
    I: [1, [[[0.5, 0], [0.5, 6]]]],
    J: [4, [[[4, 0], [4, 4.2], [4, 6, 1], [2, 6], [0, 6, 1], [0, 4.4]]]],
    K: [4, [[[0, 0], [0, 6]], [[4, 0], [0, 3.8]], [[1.4, 2.6], [4, 6]]]],
    L: [4, [[[0, 0], [0, 6], [4, 6]]]],
    M: [5, [[[0, 6], [0, 0], [2.5, 4], [5, 0], [5, 6]]]],
    N: [4, [[[0, 6], [0, 0], [4, 6], [4, 0]]]],
    O: [4, [[[2, 0], [4, 0, 1], [4, 3], [4, 6, 1], [2, 6], [0, 6, 1], [0, 3], [0, 0, 1], [2, 0]]]],
    P: [4, [[[0, 6], [0, 0], [2.6, 0], [4, 0, 1], [4, 1.6], [4, 3.2, 1], [2.6, 3.2], [0, 3.2]]]],
    Q: [4, [[[2, 0], [4, 0, 1], [4, 3], [4, 6, 1], [2, 6], [0, 6, 1], [0, 3], [0, 0, 1], [2, 0]], [[2.4, 4.3], [4.2, 6.4]]]],
    R: [4, [[[0, 6], [0, 0], [3, 0], [4, 1.5, 1], [3, 3], [0, 3]], [[2, 3], [4, 6]]]],
    S: [4, [[[4, 0.6], [3, 0], [1, 0], [0, 1.4, 1], [1, 2.8], [3, 3.2], [4, 4.6, 1], [3, 6], [1, 6], [0, 5.4]]]],
    T: [4, [[[0, 0], [4, 0]], [[2, 0], [2, 6]]]],
    U: [4, [[[0, 0], [0, 4], [0, 6, 1], [2, 6], [4, 6, 1], [4, 4], [4, 0]]]],
    V: [4, [[[0, 0], [2, 6], [4, 0]]]],
    W: [5, [[[0, 0], [1.2, 6], [2.5, 2], [3.8, 6], [5, 0]]]],
    X: [4, [[[0, 0], [4, 6]], [[4, 0], [0, 6]]]],
    Y: [4, [[[0, 0], [2, 3], [4, 0]], [[2, 3], [2, 6]]]],
    Z: [4, [[[0, 0], [4, 0], [0, 6], [4, 6]]]],
    '0': [4, [[[2, 0], [4, 0, 1], [4, 3], [4, 6, 1], [2, 6], [0, 6, 1], [0, 3], [0, 0, 1], [2, 0]], [[3.3, 1], [0.7, 5]]]],
    '1': [4, [[[0.8, 1.2], [2.2, 0], [2.2, 6]], [[0.8, 6], [3.6, 6]]]],
    '2': [4, [[[0, 1.2], [0.8, 0], [3, 0], [4, 0, 1], [4, 1.6], [4, 2.8, 1], [3, 3.6], [0, 6], [4, 6]]]],
    '3': [4, [[[0, 0.6], [1, 0], [3, 0], [4, 0, 1], [4, 1.5], [4, 3, 1], [2.6, 3], [1.4, 3]], [[2.6, 3], [4, 3, 1], [4, 4.5], [4, 6, 1], [3, 6], [1, 6], [0, 5.4]]]],
    '4': [4, [[[3, 6], [3, 0], [0, 4.2], [4, 4.2]]]],
    '5': [4, [[[4, 0], [0.5, 0], [0, 2.8], [2.5, 2.4], [4, 4.2, 1], [2.6, 6], [0, 5.3]]]],
    '6': [4, [[[3.6, 0.2], [2, 0], [0, 0, 1], [0, 3.5], [0, 6, 1], [2, 6], [4, 6, 1], [4, 4.4], [4, 2.8, 1], [2, 2.8], [0, 2.8, 1], [0, 4.2]]]],
    '7': [4, [[[0, 0], [4, 0], [1.4, 6]]]],
    '8': [4, [[[2, 3], [0.2, 3, 1], [0.2, 1.5], [0.2, 0, 1], [2, 0], [3.8, 0, 1], [3.8, 1.5], [3.8, 3, 1], [2, 3], [0, 3, 1], [0, 4.5], [0, 6, 1], [2, 6], [4, 6, 1], [4, 4.5], [4, 3, 1], [2, 3]]]],
    '9': [4, [[[4, 1.6], [4, 3.2, 1], [2, 3.2], [0, 3.2, 1], [0, 1.6], [0, 0, 1], [2, 0], [4, 0, 1], [4, 1.6], [4, 6]]]],
    '$': [4, [[[3.6, 1.2], [2, 0.6], [0.6, 1.6, 1], [2, 3], [3.4, 4.4, 1], [2, 5.4], [0.4, 4.8]], [[2, 0], [2, 6]]]],
    '+': [4, [[[2, 1.6], [2, 5.2]], [[0.2, 3.4], [3.8, 3.4]]]],
    '-': [3, [[[0.3, 3.4], [2.7, 3.4]]]],
    '/': [3, [[[2.8, 0], [0.2, 6]]]],
    '.': [1, [[[0.5, 5.6], [0.5, 6]]]],
    ',': [1, [[[0.7, 5.4], [0.7, 6], [0.2, 7]]]],
    ':': [1, [[[0.5, 1.8], [0.5, 2.2]], [[0.5, 5.6], [0.5, 6]]]],
    '!': [1, [[[0.5, 0], [0.5, 4]], [[0.5, 5.6], [0.5, 6]]]],
    '?': [4, [[[0, 1.2], [0.8, 0], [3, 0], [4, 0, 1], [4, 1.4], [4, 2.8, 1], [2, 3.2], [2, 4.2]], [[2, 5.6], [2, 6]]]],
    '\'': [1, [[[0.5, 0], [0.5, 1.6]]]],
    '&': [4, [[[4, 6], [0.8, 2], [0.8, 0.8], [1.6, 0], [2.6, 0.8], [2.6, 1.6], [0, 4.2], [0, 5.2], [1, 6], [2.4, 6], [4, 3.6]]]],
    '(': [2, [[[1.8, 0], [-0.6, 3, 1], [1.8, 6]]]],
    ')': [2, [[[0.2, 0], [2.6, 3, 1], [0.2, 6]]]],
    '#': [4, [[[1.4, 0.6], [1, 5.4]], [[3, 0.6], [2.6, 5.4]], [[0, 2], [4, 2]], [[0, 4], [4, 4]]]],
    '@': [4, [[[3, 4], [3, 2], [2, 1.6], [1.2, 2.4], [1.4, 3.8], [2.4, 4.2], [3, 3.6], [3.4, 4.4], [4, 4], [4, 2], [4, 0, 1], [2, 0], [0, 0, 1], [0, 3], [0, 6, 1], [2, 6], [3.4, 6]]]],
    '~': [4, [[[0, 3.6], [1, 2.6, 1], [2, 3.4], [3, 4.2, 1], [4, 3.2]]]],
    '*': [3, [[[1.5, 1], [1.5, 4]], [[0.2, 1.8], [2.8, 3.2]], [[2.8, 1.8], [0.2, 3.2]]]],
    '=': [3, [[[0.2, 2.6], [2.8, 2.6]], [[0.2, 4.2], [2.8, 4.2]]]],
    '%': [4, [[[3.8, 0], [0.2, 6]], [[0.6, 0.4], [0.6, 1.6]], [[3.4, 4.4], [3.4, 5.6]]]],
    '·': [1, [[[0.5, 3.2], [0.5, 3.6]]]]
  };
  var SPACE = 2.4, GAP = 1.2;
  var KERN = { AV: -0.5, VA: -0.5, LT: -0.6, TA: -0.5, TO: -0.3, AT: -0.4, AY: -0.4, YA: -0.4, LV: -0.4 };
  var ALIAS = { '’': '\'', '‘': '\'', '"': '\'', '“': '\'', '”': '\'', '–': '-', '—': '-',
                '|': '/', '[': '(', ']': ')', '{': '(', '}': ')', '_': '-', ';': ':', '<': '(', '>': ')' };

  /* Per-treatment stroke width and glyph width scale, in units (art.md 4.6). */
  var SPEC = {
    marker: { lw: 0.9, ws: 1 }, block: { lw: 1.9, ws: 1.1 }, bubble: { lw: 2.4, ws: 1.15 }, stencil: { lw: 1.9, ws: 1.1 },
    nib: { lw: 1.3, ws: 1.05 }, spike: { lw: 1.9, ws: 1.1 }, drip: { lw: 1.9, ws: 1.1 }, tape: { lw: 0.9, ws: 1 }
  };
  function specOf(t) { return SPEC[t] || SPEC.block; }   // SPEC? font treatments (ransom, typewriter...) fall back to block here

  function norm(text) {
    var s = String(text == null ? '' : text), out = '', i, c;
    if (s.normalize) s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (i = 0; i < s.length; i++) {
      c = s.charAt(i).toUpperCase();
      if (ALIAS[c]) c = ALIAS[c];
      out += c;
    }
    return out;
  }

  /* Flatten a stroke with quadratic control points into a polyline (units). */
  function flatten(stroke) {
    var out = [], i = 0, p, c, n, k, t, mt;
    if (!stroke.length) return out;
    out.push([stroke[0][0], stroke[0][1]]);
    p = stroke[0];
    for (i = 1; i < stroke.length; i++) {
      if (stroke[i][2] === 1 && i + 1 < stroke.length) {
        c = stroke[i]; n = stroke[i + 1];
        for (k = 1; k <= 6; k++) {
          t = k / 6; mt = 1 - t;
          out.push([mt * mt * p[0] + 2 * mt * t * c[0] + t * t * n[0], mt * mt * p[1] + 2 * mt * t * c[1] + t * t * n[1]]);
        }
        p = n; i++;
      } else {
        p = stroke[i];
        out.push([p[0], p[1]]);
      }
    }
    return out;
  }

  var FLAT = {};
  function glyph(ch) {
    if (FLAT[ch]) return FLAT[ch];
    var g = G[ch];
    if (!g) return null;
    FLAT[ch] = { w: g[0], s: g[1].map(flatten) };
    return FLAT[ch];
  }

  /* Lay a line out in units: [{ ch, x, w, strokes }] and the total advance. */
  function lay(text, treatment, track) {
    var s = norm(text), sp = specOf(treatment), x = 0, out = [], i, ch, g, prev = '', adv;
    track = track || 0;
    for (i = 0; i < s.length; i++) {
      ch = s.charAt(i);
      if (ch === ' ' || ch === '\t' || ch === '\n') { x += SPACE + track; prev = ''; continue; }
      g = glyph(ch);
      if (!g) { x += SPACE * 0.6; prev = ''; continue; }
      if (prev && KERN[prev + ch]) x += KERN[prev + ch];
      out.push({ ch: ch, x: x + sp.lw / 2, w: g.w * sp.ws, g: g, ws: sp.ws });
      adv = g.w * sp.ws + GAP + sp.lw * 0.5 + track;
      x += adv;
      prev = ch;
    }
    if (out.length) x -= GAP + track;
    return { glyphs: out, width: Math.max(0, x) + (out.length ? sp.lw * 0.5 : 0) };
  }

  function measure(text, size, treatment, opts) {
    var u = size / 6, w = lay(text, treatment, opts && opts.track).width * u;
    if (opts && opts.maxWidth && w > opts.maxWidth) return opts.maxWidth;
    return w;
  }

  function rngFor(opts, text) { return opts && opts.rng ? opts.rng : SB.rng.make('skeleton:' + text); }

  /* The strokes of a laid-out line in units, with marker jitter applied when asked. */
  function strokesOf(L, treatment, rng) {
    var marker = treatment === 'marker' || treatment === 'tape', out = [], i, j, k, gl, rot, cs, sn, wob, cx, pts, p, x, y;
    for (i = 0; i < L.glyphs.length; i++) {
      gl = L.glyphs[i];
      rot = marker ? rng.range(-2, 2) * Math.PI / 180 : 0;
      cs = Math.cos(rot); sn = Math.sin(rot);
      wob = marker ? rng.range(-0.15, 0.15) : 0;
      cx = gl.w / 2;
      for (j = 0; j < gl.g.s.length; j++) {
        pts = [];
        for (k = 0; k < gl.g.s[j].length; k++) {
          p = gl.g.s[j][k];
          x = p[0] * gl.ws - cx; y = p[1] - 3;
          if (marker) { x += rng.range(-0.07, 0.07); y += rng.range(-0.07, 0.07); }
          pts.push([gl.x + cx + x * cs - y * sn, 3 + x * sn + y * cs + wob]);
        }
        out.push({ pts: pts, gi: i });
      }
    }
    return out;
  }

  function polyPath(ctx, pts, u, ox, oy) {
    var k;
    ctx.moveTo(ox + pts[0][0] * u, oy + pts[0][1] * u);
    if (pts.length === 1) ctx.lineTo(ox + pts[0][0] * u + 0.01, oy + pts[0][1] * u);
    for (k = 1; k < pts.length; k++) ctx.lineTo(ox + pts[k][0] * u, oy + pts[k][1] * u);
  }

  function strokeAll(ctx, strokes, u, ox, oy, lw, cap, join, color) {
    var i;
    ctx.lineWidth = lw * u; ctx.lineCap = cap; ctx.lineJoin = join; ctx.strokeStyle = color;
    ctx.beginPath();
    for (i = 0; i < strokes.length; i++) polyPath(ctx, strokes[i].pts, u, ox, oy);
    ctx.stroke();
  }

  function segLen(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1]; return Math.sqrt(dx * dx + dy * dy); }
  function strokeLen(pts) { var s = 0, k; for (k = 1; k < pts.length; k++) s += segLen(pts[k - 1], pts[k]); return s; }

  function nib(ctx, strokes, u, ox, oy, color) {
    var a = 35 * Math.PI / 180, nx = Math.cos(a) * 0.65, ny = -Math.sin(a) * 0.65, i, k, p, q;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (i = 0; i < strokes.length; i++) {
      p = strokes[i].pts;
      if (p.length === 1) p = [p[0], [p[0][0] + 0.05, p[0][1] + 0.3]];
      for (k = 1; k < p.length; k++) {
        q = [p[k - 1], p[k]];
        ctx.moveTo(ox + (q[0][0] + nx) * u, oy + (q[0][1] + ny) * u);
        ctx.lineTo(ox + (q[1][0] + nx) * u, oy + (q[1][1] + ny) * u);
        ctx.lineTo(ox + (q[1][0] - nx) * u, oy + (q[1][1] - ny) * u);
        ctx.lineTo(ox + (q[0][0] - nx) * u, oy + (q[0][1] - ny) * u);
        ctx.closePath();
      }
    }
    ctx.fill();
  }

  function ends(pts) {
    var n = pts.length;
    if (n < 2) return [];
    return [{ p: pts[0], from: pts[1] }, { p: pts[n - 1], from: pts[n - 2] }];
  }

  function spikes(ctx, strokes, u, ox, oy, color, rng) {
    var i, j, e, dx, dy, len, L, px, py, w = 0.95;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (i = 0; i < strokes.length; i++) {
      e = ends(strokes[i].pts);
      for (j = 0; j < e.length; j++) {
        dx = e[j].p[0] - e[j].from[0]; dy = e[j].p[1] - e[j].from[1]; len = Math.sqrt(dx * dx + dy * dy) || 1;
        dx /= len; dy /= len; L = rng.range(0.8, 1.6);
        px = -dy; py = dx;
        ctx.moveTo(ox + (e[j].p[0] + px * w) * u, oy + (e[j].p[1] + py * w) * u);
        ctx.lineTo(ox + (e[j].p[0] + dx * (L + 0.9)) * u, oy + (e[j].p[1] + dy * (L + 0.9)) * u);
        ctx.lineTo(ox + (e[j].p[0] - px * w) * u, oy + (e[j].p[1] - py * w) * u);
        ctx.closePath();
      }
    }
    ctx.fill();
  }

  function drips(ctx, strokes, u, ox, oy, color, rng, lw) {
    var i, j, e, L, p, share = rng.range(0.2, 0.4), r = lw * 0.5;
    ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineCap = 'round';
    for (i = 0; i < strokes.length; i++) {
      e = ends(strokes[i].pts);
      for (j = 0; j < e.length; j++) {
        if (e[j].p[1] - e[j].from[1] <= 0.2 || !rng.chance(share)) continue;
        p = e[j].p; L = rng.range(0.5, 3);
        ctx.lineWidth = Math.max(1, r * 0.8 * u);
        ctx.beginPath(); ctx.moveTo(ox + p[0] * u, oy + p[1] * u); ctx.lineTo(ox + p[0] * u, oy + (p[1] + L) * u); ctx.stroke();
        ctx.beginPath(); ctx.arc(ox + p[0] * u, oy + (p[1] + L) * u, Math.max(1, r * 0.75 * u), 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  function stencilCuts(ctx, strokes, u, ox, oy, paper, lw) {
    var i, k, p, best, bl, l, mx, my, ang;
    ctx.fillStyle = paper;
    for (i = 0; i < strokes.length; i++) {
      p = strokes[i].pts;
      if (strokeLen(p) < 2) continue;
      best = 1; bl = 0;
      for (k = 1; k < p.length; k++) { l = segLen(p[k - 1], p[k]); if (l > bl) { bl = l; best = k; } }
      mx = (p[best - 1][0] + p[best][0]) / 2; my = (p[best - 1][1] + p[best][1]) / 2;
      ang = Math.atan2(p[best][1] - p[best - 1][1], p[best][0] - p[best - 1][0]);
      ctx.save();
      ctx.translate(ox + mx * u, oy + my * u); ctx.rotate(ang);
      ctx.fillRect(-0.175 * u, -(lw * 0.5 + 0.3) * u, 0.35 * u, (lw + 0.6) * u);
      ctx.restore();
    }
  }

  /* Draw one line with its baseline at y. Returns the drawn width in px. */
  function draw(ctx, text, x, y, size, treatment, opts) {
    opts = opts || {};
    var t = SPEC[treatment] ? treatment : 'block', u = size / 6, rng = rngFor(opts, text), L = lay(text, t, opts.track),
        w = L.width * u, sx = 1, ink = opts.ink || '#1A1A1A', paper = opts.paper || '#F7F6F1', sp = specOf(t), strokes, oy, i, gl;
    if (!L.glyphs.length) return w;
    if (opts.maxWidth && w > opts.maxWidth) { sx = opts.maxWidth / w; w = opts.maxWidth; }
    strokes = strokesOf(L, t, rng);
    ctx.save();
    ctx.translate(x, y);
    if (sx !== 1) ctx.scale(sx, 1);
    oy = -size;
    if (t === 'tape') {
      ctx.fillStyle = opts.tape || 'rgba(236,228,196,0.85)';
      for (i = 0; i < L.glyphs.length; i++) {
        gl = L.glyphs[i];
        ctx.save();
        ctx.translate((gl.x + gl.w / 2) * u, oy + 3 * u);
        ctx.rotate(rng.range(-0.08, 0.08));
        ctx.fillRect(-(gl.w / 2 + 0.9) * u, -3.8 * u, (gl.w + 1.8) * u, 7.6 * u);
        ctx.restore();
      }
      strokeAll(ctx, strokes, u, 0, oy, sp.lw, 'round', 'round', ink);
    } else if (t === 'marker') {
      strokeAll(ctx, strokes, u, 0, oy, sp.lw, 'round', 'round', ink);
    } else if (t === 'bubble') {
      if (opts.ink2) strokeAll(ctx, strokes, u, 0.5 * u, oy + 0.5 * u, sp.lw, 'round', 'round', opts.ink2);
      strokeAll(ctx, strokes, u, 0, oy, sp.lw, 'round', 'round', ink);
      strokeAll(ctx, strokes, u, 0, oy, 1.4, 'round', 'round', paper);
    } else if (t === 'nib') {
      nib(ctx, strokes, u, 0, oy, ink);
    } else {
      strokeAll(ctx, strokes, u, 0, oy, sp.lw, 'square', 'miter', ink);
      if (t === 'stencil') stencilCuts(ctx, strokes, u, 0, oy, paper, sp.lw);
      if (t === 'spike') spikes(ctx, strokes, u, 0, oy, ink, rng);
      if (t === 'drip') drips(ctx, strokes, u, 0, oy, ink, rng, sp.lw);
    }
    ctx.restore();
    return w;
  }

  function f(n) { return Math.round(n * 100) / 100; }

  /* The same lettering as SVG path data: open strokes in px, baseline at y = size. */
  function path(text, size, treatment, opts) {
    opts = opts || {};
    var t = SPEC[treatment] ? treatment : 'block', u = size / 6, L = lay(text, t, opts.track), rng = rngFor(opts, text),
        strokes = strokesOf(L, t, rng), w = L.width * u, sx = 1, d = [], i, k, p;
    if (opts.maxWidth && w > opts.maxWidth) { sx = opts.maxWidth / w; w = opts.maxWidth; }
    for (i = 0; i < strokes.length; i++) {
      p = strokes[i].pts;
      d.push('M' + f(p[0][0] * u * sx) + ' ' + f(p[0][1] * u));
      if (p.length === 1) d.push('l0.01 0');
      for (k = 1; k < p.length; k++) d.push('L' + f(p[k][0] * u * sx) + ' ' + f(p[k][1] * u));
    }
    return { d: d.join(''), width: w, height: size, strokeWidth: specOf(t).lw * u };
  }

  return { draw: draw, path: path, measure: measure, glyphs: function () { return Object.keys(G); } };
});
