/* Scene Booker: js/art/scenes.js (ART, 09-tutorial-story-patches §3 and §4, 09a "Look")
 * SB.Scenes: the cutscene pictures and the patches and buttons of the jean jacket.
 * Every picture is painted first as a grayscale "original" (soft photo shapes, ink linework, hatching, sharpie
 * lettering from SB.Skeleton, and the people: real show photos cut out with a paper margin, from SB.Cutouts, pasted
 * onto the drawn room) in a 1200 x 750 design box, then run through a photocopier pass: crushed contrast,
 * a coarse 45-degree dot screen for the midtones, toner unevenness, dropouts and specks, black toner on a sheet of
 * coloured copy paper. Pure apart from the canvas it is given: every choice comes from SB.rng.make(seed).
 *
 * SB.Scenes.draw(target, artKey, ctx)   target: a <canvas> (drawn at its own width/height) or an <svg> element
 *                                       (gets an <image>). ctx: { seed, paper, index, band, bands, outgoing, room,
 *                                       bookingName, cover, banner, sticker, count, empty } (all optional).
 * SB.Scenes.preload(keys, cb, ctxs)    loads the photo cut-outs (SB.Cutouts) those pictures paste in, then cb().
 *                                       draw() copes without it: it paints a drawn stand-in and repaints on load.
 * SB.Scenes.patch(id, { name, kind, earned, hidden, size, denim, grit }) -> <canvas> of a patch or pinback button,
 *                                       run through the same copier grit as the cutscenes (grit: false skips it).
 * SB.Scenes.jacket(canvas, items, opts)  the back of the jean jacket with a few patches on it.
 */
SB.module('Scenes', function (SB) {
  'use strict';

  var TAU = Math.PI * 2;
  var DW = 1200, DH = 750;
  var TONER = '#141312';
  var PAPER = {
    canary: '#ECD668', goldenrod: '#EBBA4E', pink: '#F0B2C0', blue: '#B4CDE4', green: '#C0DCA4', white: '#F2F0E6',
    salmon: '#F1A98A', lilac: '#C8BAE2'
  };
  var PAPER_ORDER = ['canary', 'pink', 'blue', 'green', 'white', 'goldenrod', 'salmon', 'lilac'];
  var KEYS = ['CARPORT_NIGHT', 'CARPORT_EMPTY', 'STAGE_BAND', 'CROWD_FRONT', 'DOOR_TABLE', 'HANDS_TIN', 'KITCHEN_FLOOR',
    'PHONE_SCREEN', 'INBOX_STACK', 'VAN_CURB', 'FLOOR_SLEEP', 'EMPTY_ROOM', 'FLYER_WALL', 'BAR_DOOR', 'BRIDGE',
    'STOREFRONT', 'FOR_SALE', 'POLICE_LIGHTS', 'BROKEN_GLASS', 'MAP_ROUTE', 'POSTCARD_FRONT', 'SIDEWALK_LINE', 'STAGE_DIVE',
    'YARD_NIGHT', 'RAIN_CARPORT', 'SOLO_SET', 'STACK_CHAIRS'];

  /* ---------------- small helpers ---------------- */

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function rgbOf(hex) {
    var h = String(hex || '').replace('#', ''), n = parseInt(h, 16);
    if (h.length !== 6 || isNaN(n)) return [20, 19, 18];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function g(v) { var n = Math.round(clamp(v, 0, 1) * 255); return 'rgb(' + n + ',' + n + ',' + n + ')'; }
  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function paperOf(x, key) {
    if (x.paper) return PAPER[x.paper] || (String(x.paper).charAt(0) === '#' ? x.paper : PAPER.white);
    var r = SB.rng.make('paper:' + (x.seed || '') + ':' + key + ':' + (x.index || 0) + ':' + (x.band || ''));
    return PAPER[r.pick(PAPER_ORDER)];
  }
  function mk(w, h) {
    var cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(w)); cv.height = Math.max(1, Math.round(h));
    return cv;
  }
  function upper(s) { return String(s == null ? '' : s).toUpperCase(); }

  /* ---------------- grayscale painting ---------------- */

  function rect(c, x, y, w, h, v) { c.fillStyle = g(v); c.fillRect(x, y, w, h); }
  function poly(c, pts) {
    c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
    c.closePath();
  }
  function fillPoly(c, pts, v) { poly(c, pts); c.fillStyle = g(v); c.fill(); }
  function ell(c, x, y, rx, ry, rot, v) {
    c.beginPath(); c.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot || 0, 0, TAU); c.fillStyle = g(v); c.fill();
  }
  function line(c, x1, y1, x2, y2, w, v) {
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineWidth = w; c.lineCap = 'round'; c.strokeStyle = g(v); c.stroke();
  }
  function glow(c, x, y, rad, a) {
    tone(c, function (cc) { glow(cc, x, y, rad, a); }, [x - rad, y - rad, x + rad, y + rad]);
    c.save();
    c.globalCompositeOperation = 'lighter';
    var gr = c.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, 'rgba(255,255,255,' + a + ')');
    gr.addColorStop(0.35, 'rgba(255,255,255,' + (a * 0.45) + ')');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = gr; c.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    c.restore();
  }
  function shadow(c, x, y, rad, a) {
    c.save();
    var gr = c.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, 'rgba(0,0,0,' + a + ')'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = gr; c.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    c.restore();
  }
  function vignette(c, a) {
    tone(c, function (cc) { vignette(cc, a); });
    c.save();
    var gr = c.createRadialGradient(DW / 2, DH / 2, DH * 0.35, DW / 2, DH / 2, DW * 0.72);
    gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,' + a + ')');
    c.fillStyle = gr; c.fillRect(0, 0, DW, DH);
    c.restore();
  }
  function blurred(c, px, fn) { c.save(); c.filter = 'blur(' + px + 'px)'; fn(); c.restore(); }

  /* ---------------- ink (drawn style) ---------------- */

  /* A wobbly pen line through points, smoothed through midpoints. */
  function ink(c, pts, w, r, jit, v) {
    if (pts.length < 2) return;
    jit = jit == null ? w * 0.35 : jit;
    var p = pts.map(function (q) { return [q[0] + r.range(-jit, jit), q[1] + r.range(-jit, jit)]; }), i;
    c.beginPath(); c.moveTo(p[0][0], p[0][1]);
    for (i = 1; i < p.length - 1; i++) c.quadraticCurveTo(p[i][0], p[i][1], (p[i][0] + p[i + 1][0]) / 2, (p[i][1] + p[i + 1][1]) / 2);
    c.lineTo(p[p.length - 1][0], p[p.length - 1][1]);
    c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = g(v == null ? 0 : v); c.stroke();
  }
  /* Points along a straight segment, so ink() can wobble it. */
  function seg(x1, y1, x2, y2, n) {
    var out = [], i; n = n || Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 40));
    for (i = 0; i <= n; i++) out.push([x1 + (x2 - x1) * i / n, y1 + (y2 - y1) * i / n]);
    return out;
  }
  /* A closed shape: optional fill, then a wobbly outline drawn edge by edge. */
  function inkShape(c, pts, w, r, fillV) {
    if (fillV != null) fillPoly(c, pts, fillV);
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length];
      ink(c, seg(a[0], a[1], b[0], b[1]), w * r.range(0.8, 1.15), r, w * 0.3);
    }
  }
  /* Parallel pen strokes inside a clip path, slightly uneven, some broken. */
  function hatch(c, clip, box, ang, gap, lw, r, v) {
    c.save(); clip(); c.clip();
    var cx = box[0] + box[2] / 2, cy = box[1] + box[3] / 2, R = Math.hypot(box[2], box[3]) / 2 + 10;
    var ca = Math.cos(ang), sa = Math.sin(ang), d;
    for (d = -R; d <= R; d += gap * r.range(0.8, 1.2)) {
      var a0 = -R + r.range(0, R * 0.25), a1 = R - r.range(0, R * 0.25);
      var x1 = cx + ca * a0 - sa * d, y1 = cy + sa * a0 + ca * d, x2 = cx + ca * a1 - sa * d, y2 = cy + sa * a1 + ca * d;
      ink(c, [[x1, y1], [(x1 + x2) / 2 + r.range(-1, 1), (y1 + y2) / 2 + r.range(-1, 1)], [x2, y2]], lw * r.range(0.7, 1.2), r, lw * 0.4, v);
    }
    c.restore();
  }
  function polyClip(c, pts) { return function () { poly(c, pts); }; }
  function boxOf(pts) {
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    pts.forEach(function (p) { x0 = Math.min(x0, p[0]); y0 = Math.min(y0, p[1]); x1 = Math.max(x1, p[0]); y1 = Math.max(y1, p[1]); });
    return [x0, y0, x1 - x0, y1 - y0];
  }
  /* Sharpie block capitals from SB.Skeleton; y is the baseline. Falls back to a heavy system face. */
  function marker(c, text, x, y, size, opts) {
    opts = opts || {};
    var t = upper(text), w;
    if (SB.Skeleton && SB.Skeleton.draw) {
      w = SB.Skeleton.measure(t, size, opts.treatment || 'marker');
      if (opts.maxWidth && w > opts.maxWidth) w = opts.maxWidth;
      var x0 = opts.align === 'center' ? x - w / 2 : x;
      SB.Skeleton.draw(c, t, x0, y, size, opts.treatment || 'marker',
        { ink: opts.ink || '#000', maxWidth: opts.maxWidth, rng: SB.rng.make('mk:' + t + ':' + (opts.seed || '')) });
      return w;
    }
    c.save(); c.font = '900 ' + size + 'px "SB Gothic", Impact, sans-serif'; c.fillStyle = opts.ink || '#000';
    c.textAlign = opts.align === 'center' ? 'center' : 'left'; c.fillText(t, x, y, opts.maxWidth); c.restore();
    return opts.maxWidth || size * t.length * 0.6;
  }

  /* ---------------- photo pieces (grayscale) ---------------- */

  /* A guitar, body centered at (x, y), s the body length, the neck pointing along ang. */
  function guitar(c, x, y, s, ang, v, r, bass) {
    c.save(); c.translate(x, y); c.rotate(ang);
    var nl = bass ? 1.9 : 1.5;
    rect(c, 0.3 * s, -0.045 * s, nl * s - 0.3 * s, 0.09 * s, 0.1);
    for (var f = 0; f < 9; f++) { var fx = 0.45 * s + f * (nl - 0.45) * s / 9 * (1 - f * 0.03); line(c, fx, -0.045 * s, fx, 0.045 * s, 1.5, 0.45); }
    fillPoly(c, [[nl * s, -0.06 * s], [(nl + 0.22) * s, -0.08 * s], [(nl + 0.24) * s, 0.06 * s], [nl * s, 0.06 * s]], 0.08);
    for (var t = 0; t < 3; t++) { ell(c, (nl + 0.05 + t * 0.065) * s, -0.1 * s, 0.022 * s, 0.022 * s, 0, 0.55); }
    c.beginPath();
    c.ellipse(-0.18 * s, 0, 0.34 * s, 0.31 * s, 0, 0, TAU);
    c.ellipse(0.16 * s, 0, 0.26 * s, 0.24 * s, 0, 0, TAU);
    c.fillStyle = g(v); c.fill();
    c.lineWidth = s * 0.025; c.strokeStyle = g(Math.max(0, v - 0.25)); c.stroke();
    fillPoly(c, [[-0.05 * s, -0.12 * s], [0.18 * s, -0.17 * s], [0.12 * s, 0.05 * s], [-0.2 * s, 0.1 * s]], Math.min(1, v + 0.35));
    rect(c, -0.06 * s, -0.08 * s, 0.05 * s, 0.16 * s, 0.1);
    rect(c, 0.06 * s, -0.08 * s, 0.05 * s, 0.16 * s, 0.1);
    rect(c, -0.3 * s, -0.07 * s, 0.07 * s, 0.14 * s, 0.25);
    for (var k = 0; k < 4; k++) line(c, -0.3 * s, (-0.03 + k * 0.02) * s, nl * s, (-0.03 + k * 0.02) * s, 1, 0.75);
    c.restore();
    void r;
  }
  function micStand(c, x, yFloor, yTop, toX, toY) {
    line(c, x, yFloor, x, yTop, 7, 0.05);
    line(c, x - 40, yFloor, x + 40, yFloor + 6, 6, 0.05);
    line(c, x, yTop, toX, toY, 6, 0.05);
    c.save(); c.translate(toX, toY); c.rotate(Math.atan2(toY - yTop, toX - x));
    rect(c, -6, -9, 34, 18, 0.12); ell(c, 34, 0, 13, 12, 0, 0.3);
    c.restore();
  }
  /* Gear and furniture photos: the next one of this picture's picks for `slot` (SPEC), standing on the floor with its
   * bottom centre at (cx, bottom), fitted in maxW x maxH. false when the picture has none or it is not in yet, and the
   * caller draws its own. */
  var CUR = null;
  function gear(c, slot, cx, bottom, maxW, maxH, o) {
    if (!CUR) return false;
    o = o || {};
    var l = picks(CUR.key, CUR.x)[slot] || [], i = CUR.n[slot] || 0, id = l[i], k = cutById(id);
    CUR.n[slot] = i + 1;
    if (!k || !isIn(id)) return false;
    var h = maxH, w = h * k.w / k.h;
    if (w > maxW) { w = maxW; h = w * k.h / k.w; }
    return paste(c, id, { x: cx, y: bottom, h: h, rot: o.rot || 0, flip: !!o.flip, border: o.border == null ? 3 : o.border,
      bright: (o.bright || 1) * (o.night ? Math.max(0.8, Math.min(2.2, 0.45 / (k.tone || 0.45))) : 1), contrast: o.contrast || 1.1, still: true });
  }
  function amp(c, x, y, w, h, r, label) {
    /* a real amp photo when this picture picked one and it is in: standing on the box's floor, as tall as the box */
    if (gear(c, 'amps', x + w / 2, y + h, w * 1.35, h, { bright: 1.1 })) {
      if (label) { rect(c, x + w * 0.2, y + h * 0.3, w * 0.6, h * 0.1, 0.9); marker(c, label, x + w * 0.5, y + h * 0.38, h * 0.065, { align: 'center', maxWidth: w * 0.56, treatment: 'block' }); }
      return;
    }
    rect(c, x, y, w, h, 0.1);
    rect(c, x + w * 0.06, y + h * 0.2, w * 0.88, h * 0.72, 0.3);
    c.save(); c.beginPath(); c.rect(x + w * 0.06, y + h * 0.2, w * 0.88, h * 0.72); c.clip();
    for (var i = -h; i < w + h; i += 9) { line(c, x + i, y, x + i + h, y + h, 1.6, 0.2); line(c, x + i + h, y, x + i, y + h, 1.6, 0.22); }
    c.restore();
    rect(c, x, y, w, h * 0.16, 0.06);
    for (var k = 0; k < 6; k++) ell(c, x + w * (0.3 + k * 0.1), y + h * 0.08, h * 0.022, h * 0.022, 0, 0.75);
    rect(c, x + w * 0.08, y + h * 0.26, w * 0.24, h * 0.07, 0.85);
    if (label) marker(c, label, x + w * 0.09, y + h * 0.315, h * 0.045, { maxWidth: w * 0.22, treatment: 'block' });
    rect(c, x + w * 0.35, y - h * 0.04, w * 0.3, h * 0.04, 0.1);
    void r;
  }
  function cymbal(c, x, y, rx, ang, floorY) {
    line(c, x, y, x + rx * 0.05, floorY, 4, 0.12);
    ell(c, x, y, rx, rx * 0.12, ang, 0.62); ell(c, x, y, rx, rx * 0.04, ang, 0.35); ell(c, x, y - 2, rx * 0.12, rx * 0.06, ang, 0.2);
  }
  function kick(c, x, y, R, name) {
    ell(c, x, y, R * 1.02, R * 1.02, 0, 0.08);
    ell(c, x, y, R * 0.9, R * 0.9, 0, 0.9);
    for (var i = 0; i < 10; i++) { var a = i * TAU / 10; rect(c, x + Math.cos(a) * R * 0.95 - 5, y + Math.sin(a) * R * 0.95 - 5, 10, 10, 0.6); }
    ell(c, x + R * 0.45, y + R * 0.42, R * 0.13, R * 0.13, 0, 0.05);
    if (name) {
      var words = upper(name).split(/\s+/), lines = [], cur = '';
      words.forEach(function (w) { if ((cur + ' ' + w).trim().length > 9 && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
      if (cur) lines.push(cur);
      lines = lines.slice(0, 3);
      var size = R * (lines.length > 2 ? 0.22 : 0.3), y0 = y - (lines.length - 1) * size * 0.65 + size * 0.45;
      lines.forEach(function (ln, i) { marker(c, ln, x, y0 + i * size * 1.3, size, { align: 'center', maxWidth: R * 1.5, treatment: 'block', seed: name }); });
    }
  }
  function bulbs(c, x0, y0, x1, y1, sag, n, rad) {
    rad = rad || 7;
    var pts = [], i;
    for (i = 0; i <= 40; i++) { var t = i / 40; pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * sag]); }
    c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); pts.forEach(function (p) { c.lineTo(p[0], p[1]); });
    c.lineWidth = 2.5; c.strokeStyle = g(0.05); c.stroke();
    for (i = 0; i < n; i++) {
      var tt = (i + 0.5) / n, bx = x0 + (x1 - x0) * tt, by = y0 + (y1 - y0) * tt + Math.sin(tt * Math.PI) * sag;
      line(c, bx, by, bx, by + rad, 3, 0.05);
      ell(c, bx, by + rad * 1.9, rad * 0.75, rad, 0, 1);
      glow(c, bx, by + rad * 2, rad * 7, 0.22);
    }
  }
  function car(c, x, y, w, v) {
    var h = w * 0.32;
    c.beginPath();
    c.moveTo(x, y); c.lineTo(x, y - h * 0.45); c.quadraticCurveTo(x + w * 0.04, y - h * 0.58, x + w * 0.2, y - h * 0.6);
    c.lineTo(x + w * 0.32, y - h); c.lineTo(x + w * 0.7, y - h); c.lineTo(x + w * 0.82, y - h * 0.6);
    c.quadraticCurveTo(x + w, y - h * 0.55, x + w, y - h * 0.3); c.lineTo(x + w, y); c.closePath();
    c.fillStyle = g(v); c.fill();
    fillPoly(c, [[x + w * 0.34, y - h * 0.94], [x + w * 0.5, y - h * 0.94], [x + w * 0.5, y - h * 0.62], [x + w * 0.24, y - h * 0.62]], v + 0.22);
    fillPoly(c, [[x + w * 0.53, y - h * 0.94], [x + w * 0.68, y - h * 0.94], [x + w * 0.78, y - h * 0.62], [x + w * 0.53, y - h * 0.62]], v + 0.18);
    line(c, x + w * 0.05, y - h * 0.42, x + w * 0.95, y - h * 0.4, 2, v + 0.3);
    ell(c, x + w * 0.2, y, h * 0.27, h * 0.27, 0, 0.02); ell(c, x + w * 0.8, y, h * 0.27, h * 0.27, 0, 0.02);
    ell(c, x + w * 0.2, y, h * 0.1, h * 0.1, 0, v + 0.3); ell(c, x + w * 0.8, y, h * 0.1, h * 0.1, 0, v + 0.3);
  }
  function oak(c, r, x, y, s) {
    for (var i = 0; i < 26; i++) ell(c, x + r.range(-260, 260) * s, y + r.range(-170, 40) * s, r.range(60, 130) * s, r.range(40, 80) * s, 0, 0.03);
    for (var k = 0; k < 40; k++) { /* moss */
      var mx = x + r.range(-280, 280) * s, my = y + r.range(0, 70) * s, ml = r.range(30, 110) * s;
      line(c, mx, my, mx + r.range(-8, 8), my + ml, r.range(2, 5), 0.2);
    }
  }

  /* ---------------- photo cut-outs (SB.Cutouts, assets/cutouts/) ---------------- */

  /* Real printed photos, cut out with scissors and pasted onto the drawn room before the whole frame goes through
   * the copier. Images load async: draw() paints a stand-in for anything not in yet and paints again when it lands;
   * the cutscene player calls preload() first so a frame is complete when it shows. */
  var IMG = {};
  function cutList() { return SB.Cutouts || []; }
  function cutById(id) { var l = cutList(); for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i]; return null; }
  function byRole(role) { return cutList().filter(function (k) { return k.role === role; }); }
  function isIn(id) { var e = IMG[id]; return !!(e && e.state === 'ok'); }
  function isSettled(id) { var e = IMG[id]; return !!(e && e.state !== 'loading') || !cutById(id); }
  function load(ids, cb) {
    var left = 1, fired = false;
    function one() { if (--left <= 0 && !fired) { fired = true; if (cb) cb(); } }
    (ids || []).forEach(function (id) {
      var k = cutById(id), e = IMG[id];
      if (!k || (e && e.state !== 'loading')) return;
      left++;
      if (e) { e.cbs.push(one); return; }
      e = IMG[id] = { img: new Image(), state: 'loading', cbs: [one] };
      function settle(st) { e.state = st; var f = e.cbs; e.cbs = []; f.forEach(function (fn) { fn(); }); }
      e.img.onload = function () { settle('ok'); };
      e.img.onerror = function () { settle('bad'); };
      e.img.src = (cutList().base || '') + k.file;
    });
    one();
  }
  function hashStr(s) {
    var h = 2166136261; s = String(s);
    for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return h >>> 0;
  }
  /* Who is in a band: picked from the band's name, so the same band has the same people in every picture of every
   * show. The bands of one bill are cast in bill order and a later band steps past anyone an earlier one already has,
   * so the bands of one night never share a member. */
  function castOf(name, taken) {
    function one(role) {
      var l = byRole(role), n = l.length, at = hashStr(role + ':' + name), i, id;
      for (i = 0; i < n; i++) { id = l[(at + i) % n].id; if (!taken[id]) { taken[id] = 1; return id; } }
      return n ? l[at % n].id : null;
    }
    var u = SB.rng.make('lineup:' + name).next();
    var roles = u < 0.36 ? ['singer', 'guitar', 'bass'] : u < 0.46 ? ['singer', 'odd', 'bass'] : u < 0.72 ? ['guitar', 'bass'] : u < 0.9 ? ['singguitar', 'bass'] : ['singguitar', 'guitar', 'bass'];
    var drums = one('drums'), front = roles.map(one).filter(Boolean);
    if (!front.length) front = ['guitar', 'bass'].map(one).filter(Boolean);
    return { drums: drums, front: front };
  }
  function bandCast(x, name) {
    var bands = x.bands || [], taken = {}, i, c;
    for (i = 0; i < bands.length; i++) { c = castOf(bands[i], taken); if (bands[i] === name) return c; }
    return castOf(name, taken);
  }

  /* ---------------- everyone else in a picture: a pool per role, nobody seen a moment ago ----------------
   * The people and things a picture pastes in (SPEC: slot -> [roles, how many]) are picked once per picture and kept
   * (PICKS), so the preload, the stand-in and the repaint agree. A pick skips cut-outs among the last RECENT_MAX
   * picked anywhere while the pool has others, and never uses one twice in a picture. Bands are the exception:
   * bandCast keeps a band's people the same in every picture. A slot may narrow its pool with a third entry,
   * { frame: [...], facing: [...] }, so a picture that needs feet on the ground only gets people who have them. */
  var SPEC = {
    STAGE_BAND:    { front: [['back'], 4], amps: [['amp'], 2] },
    CARPORT_NIGHT: { front: [['back'], 5], amps: [['amp'], 2] },
    CARPORT_EMPTY: { chair: [['chair', 'stool'], 1], cooler: [['cooler'], 1], pa: [['pahead', 'mixer', 'pa'], 1] },
    CROWD_FRONT:   { far: [['back'], 5], near: [['back'], 3], amps: [['amp'], 2] },
    POLICE_LIGHTS: { cops: [['cop'], 2], lawn: [['standing', 'adult', 'kids', 'older'], 3] },
    DOOR_TABLE:    { line: [['line', 'standing', 'kids', 'older'], 3], marker: [['marker'], 1], tape: [['tape'], 1], cash: [['cash'], 1] },
    HANDS_TIN:     { cash: [['cash'], 1], stamp: [['rubberstamp', 'clicker'], 1] },
    KITCHEN_FLOOR: { cash: [['cash'], 2], phone: [['handset', 'deskphone'], 1] },
    INBOX_STACK:   { mail: [['envelope'], 3], tapes: [['cassette'], 3], machine: [['machine'], 1] },
    MAP_ROUTE:     { snaps: [['road', 'postcard'], 2] },
    STOREFRONT:    { front: [['storefront'], 1] },
    FOR_SALE:      { house: [['house'], 1] },
    VAN_CURB:      { who: [['carrying', 'standing'], 1], van: [['van'], 1, { facing: ['left', 'right'], minTone: 0.3 }], house: [['house'], 1],
                     bed: [['bedding'], 1, { ids: ['couch-04'] }] },   /* the one real mattress, for the roof (user 2026-11-22) */
    CARPORT_CAR:   { car: [['car', 'van'], 1, { facing: ['left', 'right'] }] },   /* the car parked on the lawn by the carport (any carport picture) */
    BAR_DOOR:      { who: [['adult', 'standing', 'older'], 1] },
    FLOOR_SLEEP:   { who: [['asleep'], 1], sofa: [['sofa'], 1], case: [['case'], 1], fan: [['fan'], 1], bed: [['bedding'], 1] },
    EMPTY_ROOM:    { sofa: [['sofa', 'armchair'], 1], table: [['table', 'chair'], 1] },
    FLYER_WALL:    { photo: [['band', 'room'], 1] },
    SIDEWALK_LINE: { near: [['standing', 'line', 'older'], 1, { frame: ['full'], minTone: 0.25 }],
                     group: [['line'], 1, { frame: ['strip', 'full'], minTone: 0.22 }],
                     far: [['line', 'standing', 'kids', 'older'], 4, { frame: ['full'], minTone: 0.22 }] },
    STAGE_DIVE:    { diver: [['diver'], 1, { minTone: 0.25 }], far: [['back', 'backs'], 4, { frame: ['strip', 'close'] }],
                     pit: [['crowd'], 2, { frame: ['waist'] }], front: [['back'], 6, { frame: ['waist', 'close'] }], amps: [['amp'], 2] },
    YARD_NIGHT:    { seller: [['standing'], 1, { frame: ['full', 'waist'], minTone: 0.25 }], talk: [['standing'], 2, { frame: ['full'], minTone: 0.25 }],
                     grass: [['sitting'], 1, { frame: ['full'], minTone: 0.25 }], merch: [['merch'], 2], cooler: [['cooler'], 1], chair: [['chair'], 1],
                     car: [['car', 'van'], 1, { facing: ['left', 'right'], minTone: 0.3 }] },
    RAIN_CARPORT:  { front: [['back'], 7], amps: [['amp'], 2] },
    SOLO_SET:      { player: [['singguitar'], 1, { frame: ['full', 'waist'] }], floor: [['back'], 5, { frame: ['waist', 'close'] }],
                     side: [['sitting'], 1, { frame: ['full'], facing: ['left', 'right'] }],
                     amps: [['amp'], 1], case: [['case'], 1] },
    STACK_CHAIRS:  { who: [['carrying', 'standing'], 2, { frame: ['full'], minTone: 0.25 }], amps: [['amp'], 1], speaker: [['speaker'], 1],
                     drums: [['drumkit', 'kit'], 1], mixer: [['mixer', 'pahead'], 1], stand: [['micstand', 'mic'], 1] }
  };
  var RECENT = [], RECENT_MAX = 120, PICKS = {}, PICK_ORDER = [];
  function remember(ids) {
    ids.forEach(function (id) { var i = RECENT.indexOf(id); if (i >= 0) RECENT.splice(i, 1); RECENT.push(id); });
    while (RECENT.length > RECENT_MAX) RECENT.shift();
  }
  function picks(key, x) {
    var spec = SPEC[key];
    if (key === 'CARPORT_NIGHT' && x.empty) { key = 'CARPORT_EMPTY'; spec = SPEC[key]; }
    if (!spec) return {};
    var ck = [key, x.seed || '', x.index || 0, x.band || '', (x.bands || []).join('/'), x.room || '', x.showId || ''].join('|');
    if (PICKS[ck]) return PICKS[ck];
    var r = SB.rng.make('pick:' + ck), used = {}, out = {}, all = [];
    Object.keys(spec).forEach(function (slot) {
      var pool = [], n = spec[slot][1], got = [], only = spec[slot][2];
      spec[slot][0].forEach(function (ro) {
        pool = pool.concat(byRole(ro).filter(function (k) {
          return !only || ((!only.ids || only.ids.indexOf(k.id) >= 0) && (!only.frame || only.frame.indexOf(k.frame) >= 0) && (!only.facing || only.facing.indexOf(k.facing) >= 0) &&
            (!only.minTone || (k.tone == null ? 0.5 : k.tone) >= only.minTone));
        }).map(function (k) { return k.id; }));
      });
      /* shuffled, then the ones not shown lately first and the longest-ago after them */
      pool = r.shuffle(pool).map(function (id, i) { return { id: id, i: i, at: RECENT.indexOf(id) }; })
        .sort(function (a, b) { return (a.at - b.at) || (a.i - b.i); });
      for (var i = 0; i < pool.length && got.length < n; i++) if (!used[pool[i].id]) { used[pool[i].id] = 1; got.push(pool[i].id); }
      out[slot] = got; all = all.concat(got);
    });
    remember(all);
    PICKS[ck] = out; PICK_ORDER.push(ck);
    if (PICK_ORDER.length > 400) delete PICKS[PICK_ORDER.shift()];
    return out;
  }
  /* A frame's art can be keyed by cause: { SOLD: 'FOR_SALE', POLICE: 'POLICE_LIGHTS', BEHAVIOR: 'BROKEN_GLASS',
   * _: 'EMPTY_ROOM' }. The first key whose flag is on wins: ctx.flags[k], or ctx[k] itself (the slots carry flags the
   * way the story text reads them), or ctx.why === k (the room's closedWhy). `_` (or `default`) is the fallback,
   * else the last key listed. A plain string is returned as it is. */
  function resolve(art, x) {
    if (!art || typeof art !== 'object') return art;
    x = x || {};
    var f = x.flags || {}, ks = Object.keys(art), i, k, last = null;
    for (i = 0; i < ks.length; i++) {
      k = ks[i];
      if (k === '_' || k === 'default') continue;
      last = art[k];
      if (f[k] || x[k] || x.why === k) return art[k];
    }
    return art._ || art['default'] || last;
  }
  /* Which cut-outs a picture needs, for preload() and for the "is it all in" check. */
  function plan(key, x) {
    x = x || {};
    key = resolve(key, x);
    var ids = [], name = bandName(x) || 'THE BAND', cast, p = picks(key, x);
    if (key === 'STAGE_BAND' || key === 'CROWD_FRONT' || key === 'STAGE_DIVE' || key === 'RAIN_CARPORT' || (key === 'CARPORT_NIGHT' && !x.empty)) {
      cast = bandCast(x, name);
      ids = ids.concat(cast.drums ? [cast.drums] : [], cast.front);
    }
    if (key === 'FLOOR_SLEEP') ids.push('boots-01');
    if (key === 'CARPORT_NIGHT' || key === 'CARPORT_EMPTY' || key === 'RAIN_CARPORT') ids = ids.concat(picks('CARPORT_CAR', x).car || []);
    Object.keys(p).forEach(function (s) { ids = ids.concat(p[s]); });
    return ids.filter(function (id) { return id && cutById(id); });
  }
  function ready(ids) { for (var i = 0; i < ids.length; i++) if (!isIn(ids[i])) return false; return true; }

  /* ---------------- layered pictures ---------------- */

  /* In a layered picture (SB.Scenes.layered) every person pasted on is lifted off the room and comes back as a
   * cut-out piece of their own, photocopied on the same paper, for the cutscene to slap on and move. REC collects them
   * while the room is drawn: the people (paste), and what is drawn over them after (tone: glow, vignette, light through
   * blinds; front: a thing standing in front of someone), replayed on each piece it falls on. */
  var REC = null;
  var PEOPLE = { singer: 1, guitar: 1, bass: 1, singguitar: 1, band: 1, drums: 1, crowd: 1, back: 1, backs: 1, standing: 1,
    sitting: 1, kids: 1, adult: 1, older: 1, carrying: 1, cop: 1, diver: 1, line: 1, asleep: 1 };
  /* pictures with a band playing or a crowd going: their pieces move to it; every other picture only breathes */
  var LOUD = { STAGE_BAND: 1, CROWD_FRONT: 1, CARPORT_NIGHT: 1, STAGE_DIVE: 1, YARD_NIGHT: 1, RAIN_CARPORT: 1, SOLO_SET: 1 };
  function mat(t) { return typeof DOMMatrix !== 'undefined' ? new DOMMatrix([t.a, t.b, t.c, t.d, t.e, t.f]) : t; }
  function pt(t, x, y) { return [t.a * x + t.c * y + t.e, t.b * x + t.d * y + t.f]; }
  function devBox(t, b) {
    var q = [pt(t, b[0], b[1]), pt(t, b[2], b[1]), pt(t, b[0], b[3]), pt(t, b[2], b[3])];
    var xs = q.map(function (p) { return p[0]; }), ys = q.map(function (p) { return p[1]; });
    return [Math.min.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, xs), Math.max.apply(null, ys)];
  }
  /* a tone laid over everything drawn so far (box: where it falls, in the picture's units; none = everywhere) */
  function tone(c, fn, box) {
    if (!REC) return;
    var t = c.getTransform();
    REC.over.push({ seq: REC.seq++, t: t, box: box ? devBox(t, box) : null, run: fn });
  }
  /* fn(c, r) draws something standing in front of the people pasted before it (box: where, in the picture's units).
   * Drawn on the room as always; in a layered picture also replayed, with the same draws of r, on each person piece it
   * covers, and those pieces stay planted (they move only about their bottom edge, so it never comes apart). */
  function front(c, r, fn, box) {
    if (!REC) { fn(c, r); return; }
    var log = [], rec = {}, rep = {}, at = 0, k, hold = REC, t = c.getTransform();
    for (k in r) if (typeof r[k] === 'function') (function (k) {
      rec[k] = function () { var v = r[k].apply(r, arguments); log.push(v); return v; };
      rep[k] = function () { return log[at++]; };
    })(k);
    REC = null;
    try { fn(c, rec); } finally { REC = hold; }
    REC.over.push({ seq: REC.seq++, t: t, box: box ? devBox(t, box) : null, plant: !!box, run: function (cc) { at = 0; fn(cc, rep); } });
  }

  /* The recorded pieces, each drawn into a canvas only as big as it is (plus what hangs off the frame, up to a margin),
   * toned like the room, softened and photocopied the way the room was, one piece a turn of the event loop so the page
   * keeps drawing while they are made; then done([{ canvas, x, y, w, h, seq, kind, depth, planted, off }]) in the target
   * canvas's pixels. live() false drops the work (the picture was drawn again). */
  function lift(rec, W, H, s, key, seed, xo, live, done) {
    var out = [], i = 0;
    (function next() {
      if (!live()) return;
      if (i >= rec.pieces.length) { done(out); return; }
      var L = liftOne(rec, rec.pieces[i++], W, H, s, key, seed, xo);
      if (L) out.push(L);
      setTimeout(next, 0);
    })();
  }
  function liftOne(rec, p, W, H, s, key, seed, xo) {
    var M = Math.round(Math.max(W, H) * 0.06), loud = !!LOUD[key];
    var m = p.m, cw = p.cv.width, ch = p.cv.height;
    var b = devBox(m, [p.ox, p.oy, p.ox + cw, p.oy + ch]), foot = b[3];
    if (p.clip) {
      var cb = [Infinity, Infinity, -Infinity, -Infinity];
      p.clip.forEach(function (q) { cb[0] = Math.min(cb[0], q[0]); cb[1] = Math.min(cb[1], q[1]); cb[2] = Math.max(cb[2], q[0]); cb[3] = Math.max(cb[3], q[1]); });
      b = [Math.max(b[0], cb[0]), Math.max(b[1], cb[1]), Math.min(b[2], cb[2]), Math.min(b[3], cb[3])];
    }
    var x0 = Math.floor(Math.max(b[0], -M)), y0 = Math.floor(Math.max(b[1], -M));
    var x1 = Math.ceil(Math.min(b[2], W + M)), y1 = Math.ceil(Math.min(b[3], H + M)), w = x1 - x0, h = y1 - y0;
    if (w < 2 || h < 2) return null;
    var pc = mk(w, h), c2 = pc.getContext('2d');
    c2.save();
    if (p.clip) { c2.beginPath(); p.clip.forEach(function (q, i) { c2[i ? 'lineTo' : 'moveTo'](q[0] - x0, q[1] - y0); }); c2.closePath(); c2.clip(); }
    c2.setTransform(m.a, m.b, m.c, m.d, m.e - x0, m.f - y0);
    if (p.alpha != null) c2.globalAlpha = p.alpha;
    c2.drawImage(p.cv, p.ox, p.oy);
    c2.restore();
    /* what was drawn over this person after they were pasted: their light, and anything standing in front */
    var planted = p.planted, ov = rec.over.filter(function (o) {
      return o.seq > p.seq && (!o.box || (o.box[0] < x1 && o.box[2] > x0 && o.box[1] < y1 && o.box[3] > y0));
    });
    if (ov.length) {
      var tv = mk(w, h), tc = tv.getContext('2d');
      tc.drawImage(pc, 0, 0);
      ov.forEach(function (o) {
        if (o.plant) planted = true;
        tc.save(); tc.setTransform(o.t.a, o.t.b, o.t.c, o.t.d, o.t.e - x0, o.t.f - y0); o.run(tc); tc.restore();
      });
      tc.globalCompositeOperation = 'destination-in'; tc.drawImage(pc, 0, 0);
      pc = tv; c2 = tc; c2.globalCompositeOperation = 'source-over';
    }
    if (!DRAWN[key]) {
      var soft = mk(w, h), so = soft.getContext('2d');
      so.filter = 'blur(' + (0.8 * s).toFixed(2) + 'px)'; so.drawImage(pc, 0, 0);
      c2.drawImage(soft, 0, 0);
    }
    var cv = mk(w, h), o2 = {}, k;
    for (k in xo) o2[k] = xo[k];
    o2.alpha = true; o2.ox = x0; o2.oy = y0; o2.refW = W; o2.refH = H; o2.streak = false;
    xerox(c2, cv.getContext('2d'), w, h, SB.rng.make(seed + ':piece:' + p.seq), o2);
    return { canvas: cv, x: x0, y: y0, w: w, h: h, seq: p.seq, id: p.id, kind: loud ? p.kind : 'calm', planted: planted,
      off: foot > H + 2, depth: planted ? 0 : clamp(0.32 * Math.pow(foot / H, 2), 0.02, 0.36) };
  }

  /* Paste a cut-out, its bottom centre at (o.x, o.y), o.h tall (or o.w wide), turned o.rot, mirrored if o.flip, with a
   * scissor margin of white paper o.border wide (uneven, as cut by hand) and the faint shadow line a paste-up edge
   * makes on the copier glass. o.contrast / o.bright tone the print. Returns false if the image isn't in yet. */
  function paste(c, id, o) {
    var e = IMG[id];
    if (!e || e.state !== 'ok') return false;
    var img = e.img, iw = img.naturalWidth || 1, ih = img.naturalHeight || 1;
    var h = o.h || o.w * ih / iw, w = h * iw / ih;
    var tr = c.getTransform ? c.getTransform() : { a: 1, b: 0 }, s = Math.hypot(tr.a, tr.b) || 1;
    var pw = Math.max(1, Math.round(w * s)), ph = Math.max(1, Math.round(h * s));
    var pb = Math.max(0, Math.round((o.border == null ? 5 : o.border) * s)), pad = pb + Math.ceil(3 * s);
    var photo = mk(pw, ph), pc = photo.getContext('2d');
    pc.filter = 'contrast(' + (o.contrast || 1.12) + ') brightness(' + (o.bright || 1) + ')';
    if (o.flip) { pc.translate(pw, 0); pc.scale(-1, 1); }
    pc.drawImage(img, 0, 0, pw, ph);
    var cv = mk(pw + pad * 2, ph + pad * 2), cc = cv.getContext('2d');
    if (pb > 0) {
      var rr = SB.rng.make('cut:' + id + ':' + Math.round(o.x) + ':' + Math.round(o.y));
      var sil = mk(cv.width, cv.height), sc = sil.getContext('2d'), k;
      for (k = 0; k < 20; k++) {
        var a = k * TAU / 20, d = pb * rr.range(0.55, 1.35);
        sc.drawImage(photo, pad + Math.cos(a) * d, pad + Math.sin(a) * d);
      }
      sc.globalCompositeOperation = 'source-in';
      sc.fillStyle = '#000'; sc.fillRect(0, 0, sil.width, sil.height);
      cc.save(); cc.globalAlpha = 0.45;
      var e1 = Math.max(1, 1.4 * s);
      [[e1, e1], [-e1 * 0.5, e1], [e1, -e1 * 0.5]].forEach(function (dd) { cc.drawImage(sil, dd[0], dd[1]); });
      cc.restore();
      sc.fillStyle = '#fff'; sc.fillRect(0, 0, sil.width, sil.height);
      cc.drawImage(sil, 0, 0);
    }
    cc.drawImage(photo, pad, pad);
    if (REC && !o.still && PEOPLE[(cutById(id) || {}).role]) {
      /* a layered picture: the person is lifted off the room, to be copied as a piece of their own (lift()) */
      var m = mat(tr).translate(o.x, o.y).rotate((o.rot || 0) * 180 / Math.PI).scale(1 / s, 1 / s);
      REC.pieces.push({ id: id, cv: cv, m: m, ox: -cv.width / 2, oy: -(ph + pad), alpha: o.alpha, kind: o.kind || 'person',
        seq: REC.seq++, clip: o.clip ? o.clip.map(function (q) { return pt(tr, q[0], q[1]); }) : null, planted: !!o.clip });
      return true;
    }
    c.save();
    c.translate(o.x, o.y); c.rotate(o.rot || 0); c.scale(1 / s, 1 / s);
    if (o.alpha != null) c.globalAlpha = o.alpha;
    c.drawImage(cv, -cv.width / 2, -(ph + pad));
    c.restore();
    return true;
  }
  /* A band member standing at the front: head near `top`, cut off by the bottom of the frame, no wider than maxW.
   * Turned to face into the picture. */
  function member(c, r, id, cx, top, maxW, side) {
    var k = cutById(id); if (!k) return false;
    var bottom = k.frame === 'full' ? DH + 70 : DH + 20, h = bottom - top, w = h * k.w / k.h;
    if (w > maxW) { h = maxW * k.h / k.w; bottom = Math.max(bottom - (bottom - top - h) * 0.3, DH + 20); }
    var flip = (side < 0 && k.facing === 'left') || (side > 0 && k.facing === 'right');
    return paste(c, id, { x: cx, y: bottom, h: h, rot: r.range(-0.04, 0.04), flip: flip, border: 6, kind: 'band' });
  }

  function bandIds(cast) { return (cast.drums ? [cast.drums] : []).concat(cast.front || []); }
  /* One person from behind, the top of the head at `top`, sized so heads come out about the same (a whole-body cut is
   * pasted bigger, its legs off the bottom of the frame). */
  function backAt(c, id, cx, top, H, rot, bright, kind) {
    var k = cutById(id); if (!k) return false;
    var h = H * (k.frame === 'full' ? 2.4 : k.frame === 'waist' ? 1.5 : 1.1);
    return paste(c, id, { x: cx, y: top + h, h: h, rot: rot, border: 5, bright: bright || 0.95, contrast: 1.25, kind: kind || 'crowd' });
  }
  /* The crowd from behind: a row of real people from behind, the tops of their heads near `top`, across w centred on
   * cx, printed dark so they stand against the light. Nothing is drawn for a photo not in yet. */
  function backs(c, r, cx, top, w, H, ids, bright, kind) {
    var n = ids ? ids.length : 0, sw = n ? w / n : 0;
    for (var i = 0; i < n; i++) {
      backAt(c, ids[i], cx - w / 2 + sw * (i + 0.5) + r.range(-sw * 0.12, sw * 0.12), top + r.range(-H * 0.12, H * 0.18),
        H * r.range(0.9, 1.12), r.range(-0.04, 0.04), (bright || 1) * r.range(0.85, 1), kind);
    }
  }

  /* ---------------- the photocopier ---------------- */

  function xerox(src, out, W, H, r, opts) {
    var sc = src.getImageData(0, 0, W, H), d = sc.data;
    var o = out.createImageData(W, H), od = o.data;
    var P = rgbOf(opts.paper), I = rgbOf(opts.ink || TONER);
    var cell = opts.cell || Math.max(4, W / 210), ca = Math.SQRT1_2, sa = Math.SQRT1_2;
    var rand = mulberry(r.int(1, 2147483646)), contrast = opts.contrast || 1.55, bias = opts.bias || 0;
    /* a cut-out piece of a bigger page (opts.ox/oy: where it sits on that page, opts.refW/refH: the page's size,
       opts.field: the page's toner unevenness) gets the page's dot screen, unevenness and speck size */
    var ox = opts.ox || 0, oy = opts.oy || 0, RW = opts.refW || W, RH = opts.refH || H;
    var gx = 18, gy = 12, field = opts.field, i, x, y;
    if (!field) { field = []; for (i = 0; i < (gx + 1) * (gy + 1); i++) field.push(r.next()); opts.field = field; }
    var streakX = r.chance(0.6) ? r.int(0, W - 1) : -1, streakW = Math.max(1, Math.round(W / 900));
    if (opts.streak === false) streakX = -1;
    for (y = 0; y < H; y++) {
      var fy = clamp((y + oy) / RH * gy, 0, gy - 1e-6), iy = Math.floor(fy), ty = fy - iy;
      for (x = 0; x < W; x++) {
        var fx = (x + ox) / RW * gx, ix, tx, b;
        if (fx < 0) fx = 0; else if (fx > gx - 1e-6) fx = gx - 1e-6;
        ix = Math.floor(fx); tx = fx - ix; b = iy * (gx + 1) + ix;
        var n = (field[b] * (1 - tx) + field[b + 1] * tx) * (1 - ty) + (field[b + gx + 1] * (1 - tx) + field[b + gx + 2] * tx) * ty;
        var k = (y * W + x) * 4;
        if (opts.alpha && d[k + 3] < 10) { od[k + 3] = 0; continue; }
        var l = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
        l += (n - 0.5) * 0.08 + (rand() - 0.5) * 0.08;
        if (Math.abs(x - streakX) < streakW) l -= 0.18;
        l = (l - 0.5) * contrast + 0.5 + bias;
        var a;
        if (l < 0.16) a = 1;
        else if (l > 0.9) a = 0;
        else {
          var u = ((x + ox) * ca + (y + oy) * sa) / cell, v = (-(x + ox) * sa + (y + oy) * ca) / cell;
          var fu = u - Math.floor(u) - 0.5, fv = v - Math.floor(v) - 0.5, dd = Math.sqrt(fu * fu + fv * fv) * 1.4142;
          a = dd < Math.sqrt((0.9 - l) / 0.74) * 0.98 ? 1 : 0;
        }
        if (a) { a = rand() < 0.003 ? 0 : 0.95 + n * 0.05; }
        else if (rand() < 0.0006) a = 0.85;
        var f = (rand() - 0.5) * 7;
        od[k] = P[0] * (1 - a) + I[0] * a + f;
        od[k + 1] = P[1] * (1 - a) + I[1] * a + f;
        od[k + 2] = P[2] * (1 - a) + I[2] * a + f;
        od[k + 3] = opts.alpha ? d[k + 3] : 255;
      }
    }
    var tmp = mk(W, H), tc = tmp.getContext('2d');
    tc.putImageData(o, 0, 0);
    out.save(); out.filter = 'blur(' + (RW > 900 ? 0.6 : 0.4) + 'px)'; out.drawImage(tmp, 0, 0); out.restore();
    /* toner specks, clustered, and a copier edge on one side (a cut-out piece, opts.alpha, keeps its own shape) */
    out.save(); out.fillStyle = opts.ink || TONER;
    if (opts.alpha) out.globalCompositeOperation = 'source-atop';
    var nSpeck = Math.round(W * H / 9000);
    for (i = 0; i < nSpeck; i++) {
      var sx = r.range(0, W), sy = r.range(0, H), sr = r.range(0.4, 1.6) * RW / 1200;
      out.beginPath(); out.arc(sx, sy, sr, 0, TAU); out.fill();
    }
    if (!opts.alpha && r.chance(0.7)) {
      var side = r.int(0, 3), depth = r.range(4, 14) * W / 1200;
      out.beginPath();
      for (i = 0; i <= 30; i++) {
        var t = i / 30, jitter = depth * r.range(0.4, 1.4);
        if (side === 0) out.lineTo(t * W, jitter); else if (side === 1) out.lineTo(W - jitter, t * H);
        else if (side === 2) out.lineTo(t * W, H - jitter); else out.lineTo(jitter, t * H);
      }
      if (side === 0) { out.lineTo(W, 0); out.lineTo(0, 0); } else if (side === 1) { out.lineTo(W, H); out.lineTo(W, 0); }
      else if (side === 2) { out.lineTo(W, H); out.lineTo(0, H); } else { out.lineTo(0, H); out.lineTo(0, 0); }
      out.closePath(); out.fill();
    }
    out.restore();
  }

  /* The same copier, for things that keep their colour (the jacket, its patches and buttons): the midtones broken
   * into the same 45-degree dot screen, the darks gone to solid toner, uneven coverage, dropouts and specks. Alpha is
   * kept, so a patch on its own stays its own shape. o: { cell, amt (how hard the toner hits), seed }. */
  function grit(cv, o) {
    o = o || {};
    var c = cv.getContext('2d'), W = cv.width, H = cv.height;
    if (!W || !H) return cv;
    var im = c.getImageData(0, 0, W, H), d = im.data, r = SB.rng.make('grit:' + (o.seed || ''));
    var rand = mulberry(r.int(1, 2147483646)), cell = o.cell || Math.max(3, W / 170), amt = o.amt == null ? 0.6 : o.amt;
    var I = rgbOf(TONER), ca = Math.SQRT1_2, gx = 10, gy = 10, field = [], i, x, y;
    for (i = 0; i < (gx + 1) * (gy + 1); i++) field.push(r.next());
    for (y = 0; y < H; y++) {
      var fy = y / H * gy, iy = Math.floor(fy), ty = fy - iy;
      for (x = 0; x < W; x++) {
        var k = (y * W + x) * 4;
        if (d[k + 3] < 8) continue;
        var fx = x / W * gx, ix = Math.floor(fx), tx = fx - ix, b = iy * (gx + 1) + ix;
        var n = (field[b] * (1 - tx) + field[b + 1] * tx) * (1 - ty) + (field[b + gx + 1] * (1 - tx) + field[b + gx + 2] * tx) * ty;
        var l = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255 + (n - 0.5) * 0.22 + (rand() - 0.5) * 0.1;
        var hit;
        if (l < 0.13) hit = 0.88;
        else {
          var u = (x * ca + y * ca) / cell, v = (-x * ca + y * ca) / cell;
          var fu = u - Math.floor(u) - 0.5, fv = v - Math.floor(v) - 0.5, dd = Math.sqrt(fu * fu + fv * fv) * 1.4142;
          hit = dd < Math.sqrt(clamp((0.92 - l) / 0.8, 0, 1)) * 0.95 ? amt * (0.85 + n * 0.3) : -0.1;
        }
        var q = rand();
        if (q < 0.002) hit = -0.35; else if (q > 0.9985) hit = 0.9;
        if (hit > 0) {
          d[k] = d[k] * (1 - hit) + I[0] * hit; d[k + 1] = d[k + 1] * (1 - hit) + I[1] * hit; d[k + 2] = d[k + 2] * (1 - hit) + I[2] * hit;
        } else {
          var lift = -hit;
          d[k] += (245 - d[k]) * lift; d[k + 1] += (240 - d[k + 1]) * lift; d[k + 2] += (228 - d[k + 2]) * lift;
        }
      }
    }
    c.putImageData(im, 0, 0);
    /* clustered toner specks, only where there is something to land on */
    c.save(); c.globalCompositeOperation = 'source-atop'; c.fillStyle = TONER;
    for (i = 0; i < Math.round(W * H / 2500); i++) {
      c.globalAlpha = r.range(0.5, 0.95);
      c.beginPath(); c.arc(r.range(0, W), r.range(0, H), r.range(0.4, 1.5) * Math.max(1, W / 700), 0, TAU); c.fill();
    }
    c.restore();
    return cv;
  }

  /* ---------------- the pictures ---------------- */

  function bandName(x) {
    if (x.band) return x.band;
    if (x.bands && x.bands.length) return x.bands[(x.index || 0) % x.bands.length];
    return '';
  }

  function carport(c, r, x, empty, wet) {
    rect(c, 0, 0, DW, DH, 0.05);
    blurred(c, 30, function () { for (var i = 0; i < 4; i++) ell(c, r.range(0, DW), r.range(10, 150), r.range(140, 280), r.range(18, 40), 0, 0.14); });
    oak(c, r, 1010, 170, 1);
    rect(c, 170, 0, 14, 460, 0.04);
    line(c, 0, 60, 1200, 95, 2, 0.04); line(c, 0, 75, 1200, 120, 2, 0.04); line(c, 120, 30, 240, 30, 6, 0.04);
    /* the house */
    fillPoly(c, [[-30, 260], [190, 140], [480, 262]], 0.05);
    rect(c, 0, 258, 470, 360, 0.3);
    for (var sy = 270; sy < 610; sy += 15) line(c, 0, sy, 470, sy, 3, 0.12);
    rect(c, 110, 330, 140, 112, empty ? 0.6 : 0.97);
    for (var by = 336; by < 440; by += 9) line(c, 112, by, 248, by, 2, empty ? 0.35 : 0.6);
    glow(c, 180, 386, 160, empty ? 0.08 : 0.2);
    rect(c, 300, 360, 70, 250, 0.1);
    /* the carport: fascia, ceiling, back wall */
    fillPoly(c, [[440, 228], [1200, 200], [1200, 248], [440, 266]], 0.04);
    var ceil = [[440, 266], [1200, 248], [1120, 318], [520, 322]];
    fillPoly(c, ceil, empty ? 0.45 : 0.72);
    for (var i = 0; i <= 22; i++) { var t = i / 22; line(c, 440 + 760 * t, 266 - 18 * t, 520 + 600 * t, 322 - 4 * t, 3, empty ? 0.25 : 0.45); }
    rect(c, 520, 318, 600, 250, empty ? 0.55 : 0.84);
    rect(c, 548, 352, 96, 216, empty ? 0.35 : 0.55);
    ell(c, 632, 462, 5, 5, 0, 0.75);
    var name = bandName(x), out = x.outgoing;
    var banner = x.banner || (out && !empty ? 'GOOD LUCK ' + out : '');
    if (banner) {
      fillPoly(c, [[690, 334], [1000, 330], [996, 438], [694, 444]], 0.99);
      for (var f = 0; f < 5; f++) line(c, 720 + f * 60, 336, 712 + f * 62, 440, 2, 0.8);
      marker(c, banner, 845, 404, 34, { align: 'center', maxWidth: 280, treatment: 'block', seed: banner });
    }
    /* floor and lawn */
    fillPoly(c, [[440, 566], [1200, 566], [1200, 750], [360, 750]], empty ? 0.55 : 0.78);
    line(c, 820, 566, 800, 750, 3, 0.2); line(c, 440, 650, 1200, 650, 3, 0.25);
    blurred(c, 12, function () { ell(c, 930, 690, 90, 24, 0, 0.25); });
    rect(c, 0, 610, 450, 140, 0.16);
    for (var gl = 0; gl < 90; gl++) { var gx = r.range(0, 440), gy = r.range(615, 750); line(c, gx, gy, gx + r.range(-5, 5), gy - r.range(8, 20), 2, 0.22); }
    if (!vehicle(c, (picks('CARPORT_CAR', x).car || [])[0], 210, 700, 400, 'right', { bright: 0.95, contrast: NIGHT_LIFT, border: 3 })) car(c, 20, 690, 360, 0.08);
    /* posts */
    rect(c, 448, 262, 16, 400, 0.04); rect(c, 1172, 246, 16, 420, 0.04);
    var cast = !empty && bandCast(x, name || 'THE BAND');
    if (cast && ready(bandIds(cast))) {
      /* the band at the back, cut out of real show photos and pasted in under the carport */
      amp(c, 600, 470, 80, 96, r); amp(c, 990, 450, 90, 116, r);
      paste(c, cast.drums, { x: 815, y: 585, h: 180, rot: r.range(-0.03, 0.03), border: 3, kind: 'drums', still: true });   /* the kick is in front */
      kick(c, 815, 540, 42, name);
      var spots = cast.front.length === 3 ? [590, 1015, 1125] : [610, 1050];
      cast.front.forEach(function (id, i) {
        var k = cutById(id), hh = k.frame === 'full' ? 300 : 215;
        paste(c, id, { x: spots[i], y: k.frame === 'full' ? 665 : 615, h: hh, rot: r.range(-0.04, 0.04), border: 3, kind: 'band',
          flip: (i === 0 && k.facing === 'left') || (i > 0 && k.facing === 'right') });
      });
    } else if (!empty) {
      /* the cut-outs are not in yet: the gear, lit, nobody drawn (people are photos or they are not there) */
      amp(c, 600, 470, 80, 96, r); amp(c, 990, 450, 90, 116, r);
      kick(c, 815, 522, 46, name);
      cymbal(c, 740, 430, 40, -0.1, 560); cymbal(c, 890, 420, 44, 0.12, 560);
    } else {
      /* after: a folding chair, a broom, cans */
      if (!gear(c, 'chair', 722, 568, 150, 160, { night: true })) { line(c, 700, 470, 690, 566, 5, 0.06); line(c, 740, 470, 752, 566, 5, 0.06); rect(c, 692, 500, 60, 8, 0.06); rect(c, 696, 430, 52, 40, 0.06); }
      gear(c, 'cooler', 880, 590, 150, 95, { night: true });
      gear(c, 'pa', 1105, 566, 140, 110, { night: true });
      line(c, 1060, 330, 1010, 566, 6, 0.1); fillPoly(c, [[995, 540], [1030, 540], [1040, 580], [985, 580]], 0.1);
      for (var cn = 0; cn < 9; cn++) { var cx = r.range(560, 1150), cy = r.range(600, 740); ell(c, cx, cy, 9, 5, r.range(0, 3), 0.85); rect(c, cx - 9, cy - 18, 18, 18, 0.7); }
    }
    bulbs(c, 466, 268, 1170, 252, 26, 15, 6);
    glow(c, 820, 330, 520, empty ? 0.12 : 0.3);
    /* the crowd from behind: one strip of a real crowd, cut out and pasted along the front */
    if (wet) backs(c, r, 815, 598, 760, 120, picks('RAIN_CARPORT', x).front, 0.95);   /* packed in out of the rain */
    else if (!empty) backs(c, r, 825, 625, 820, 115, picks('CARPORT_NIGHT', x).front, 1);
    /* a sign on the post */
    front(c, r, function (c) {
      fillPoly(c, [[468, 470], [560, 466], [562, 530], [470, 534]], 0.97);
      marker(c, x.cover || '$5', 515, 516, 40, { align: 'center', maxWidth: 80, seed: 'post' });
    }, [462, 460, 570, 540]);
    if (wet) front(c, r, rain);
    vignette(c, 0.45);
  }


  /* The band on the floor of the room, shot from the front row: the room drawn (pegboard, flyer, bulbs, amps, the
   * kick drum with the band's name), the people cut out of real show photos and pasted on, the front row's heads
   * over the bottom edge. */
  function stageBand(c, r, x) {
    var name = bandName(x) || 'THE BAND';
    var cast = bandCast(x, name), have = ready(bandIds(cast));
    rect(c, 0, 0, DW, DH, 0.62);
    for (var py = 40; py < 600; py += 22) for (var px = 700; px < 1200; px += 22) ell(c, px, py, 3.5, 3.5, 0, 0.3);
    fillPoly(c, [[140, 70], [560, 60], [570, 330], [130, 340]], 0.95);
    for (var fl = 0; fl < 7; fl++) line(c, 170 + fl * 58, 70, 160 + fl * 60, 330, 4, 0.75);
    bulbs(c, -20, 20, 1220, 30, 60, 13, 9);
    amp(c, 40, 300, 250, 290, r, name.split(' ')[0]);
    amp(c, 930, 230, 240, 370, r);
    rect(c, 0, 600, DW, 150, 0.7);
    for (var cb = 0; cb < 4; cb++) { c.beginPath(); c.moveTo(r.range(100, 1100), 610); c.bezierCurveTo(r.range(0, 1200), 680, r.range(0, 1200), 640, r.range(100, 1100), 750); c.lineWidth = 6; c.strokeStyle = g(0.05); c.stroke(); }
    /* the drummer at the back, behind the kick with the name on it */
    var dk = cutById(cast.drums);
    if (have) paste(c, cast.drums, { x: 610, y: 610, h: dk && dk.w > dk.h ? 380 : 430, rot: r.range(-0.03, 0.03), border: 5, kind: 'drums', still: true });
    kick(c, 610, 545, 118, name);
    /* the front line: two or three of them, the kick showing between */
    var n = cast.front.length, xs = n === 3 ? [225, 900, 1120] : [290, 930], tops = n === 3 ? [150, 175, 205] : [150, 170];
    var maxW = n === 3 ? [440, 400, 340] : [500, 500];
    if (have) cast.front.forEach(function (id, i) { member(c, r, id, xs[i] + r.range(-25, 25), tops[i] + r.range(-20, 25), maxW[i], i === 0 ? -1 : 1); });
    /* flash and falloff */
    glow(c, 420, 360, 760, 0.12);
    vignette(c, 0.5);
    /* the front row, from behind: a strip of a real crowd along the bottom edge */
    backs(c, r, 600, 590, 1300, 230, picks('STAGE_BAND', x).front, 1);
  }

  /* A hand gripping something, fingers over an edge. (x, y) is the base of the fingers; dir 1 points the fingers
   * right, -1 left; s is the hand's size. Ink style: white with outlines and hatching. */
  function hand(c, r, x, y, s, dir, sleeve, stamp) {
    var w = s * 0.12, k, fx, fy, len;
    var back = [[x, y - s * 0.06], [x - dir * s * 0.55, y - s * 0.02], [x - dir * s * 0.6, y + s * 0.42], [x, y + s * 0.44]];
    /* sleeve */
    var sl = [[x - dir * s * 0.5, y - s * 0.1], [x - dir * s * 1.3, y - s * 0.22], [x - dir * s * 2.2, y - s * 0.2], [x - dir * s * 2.2, y + s * 0.85], [x - dir * s * 1.3, y + s * 0.72], [x - dir * s * 0.55, y + s * 0.52]];
    inkShape(c, sl, 5, r, 1);
    var sb = boxOf(sl);
    hatch(c, polyClip(c, sl), [sb[0], sb[1] + sb[3] * 0.6, sb[2], sb[3] * 0.4], 0.35, 6, 1.8, r);
    for (k = 0; k < 3; k++) { /* folds */
      var fx0 = x - dir * s * (0.95 + k * 0.38);
      ink(c, [[fx0, y - s * 0.12], [fx0 - dir * s * 0.12, y + s * 0.2], [fx0 + dir * s * 0.02, y + s * 0.55]], 3, r);
    }
    if (sleeve === 'flannel') {
      for (k = 0; k < 3; k++) {
        var bx0 = x - dir * s * (0.8 + k * 0.5), bxL = Math.min(bx0, bx0 - dir * s * 0.12);
        c.save(); poly(c, sl); c.clip();
        hatch(c, function () { c.beginPath(); c.rect(bxL, y - s * 0.4, s * 0.12, s * 1.4); }, [bxL, y - s * 0.4, s * 0.12, s * 1.4], 0.2, 7, 1.8, r);
        hatch(c, function () { c.beginPath(); c.rect(sb[0], y + s * (0.1 + k * 0.22), sb[2], s * 0.07); }, [sb[0], y + s * (0.1 + k * 0.22), sb[2], s * 0.07], 1.45, 7, 1.8, r);
        c.restore();
      }
    } else {
      for (k = 0; k < 9; k++) ink(c, seg(x - dir * s * (0.52 + k * 0.03), y - s * 0.1, x - dir * s * (0.56 + k * 0.03), y + s * 0.53, 4), 2.2, r);
      ink(c, seg(x - dir * s * 0.82, y - s * 0.14, x - dir * s * 0.86, y + s * 0.6, 5), 4, r);
    }
    inkShape(c, back, 5, r, 1);
    var bb = boxOf(back);
    hatch(c, polyClip(c, back), [bb[0], bb[1] + bb[3] * 0.55, bb[2], bb[3] * 0.45], 0.5, 8, 2, r);
    /* knuckle bumps and tendons */
    for (k = 0; k < 4; k++) ink(c, [[x - dir * s * 0.06, y + s * (0.02 + k * 0.11)], [x - dir * s * 0.3, y + s * (0.06 + k * 0.08)]], 2, r);
    if (stamp) { ink(c, [[x - dir * s * 0.42, y + s * 0.1], [x - dir * s * 0.22, y + s * 0.3]], 7, r, 2); ink(c, [[x - dir * s * 0.22, y + s * 0.1], [x - dir * s * 0.42, y + s * 0.3]], 7, r, 2); }
    /* four fingers, lying on the face */
    for (k = 0; k < 4; k++) {
      fy = y + s * (0.02 + k * 0.105); fx = x - dir * s * 0.04; len = s * [0.42, 0.48, 0.45, 0.36][k];
      var ang = dir * (0.08 + k * 0.05), ca = Math.cos(ang), sa = Math.sin(ang), ex = fx + dir * len * ca, ey = fy + len * sa;
      c.beginPath(); c.moveTo(fx, fy); c.lineTo(ex, ey); c.lineWidth = w * 2 - 6; c.lineCap = 'round'; c.strokeStyle = g(1); c.stroke();
      ink(c, seg(fx, fy - w + 2, ex, ey - w + 2, 4), 4, r);
      ink(c, seg(fx, fy + w - 2, ex, ey + w - 2, 4), 4, r);
      ink(c, [[ex, ey - w + 2], [ex + dir * w * 0.9, ey], [ex, ey + w - 2]], 4, r);
      ink(c, [[ex - dir * w * 0.2, ey - w * 0.55], [ex + dir * w * 0.45, ey - w * 0.3], [ex + dir * w * 0.45, ey + w * 0.25], [ex - dir * w * 0.2, ey + w * 0.4]], 2.5, r);
      ink(c, [[fx + dir * len * 0.38, fy - w * 0.5], [fx + dir * len * 0.4, fy + w * 0.5]], 2, r);
      ink(c, [[fx + dir * len * 0.68, fy - w * 0.4], [fx + dir * len * 0.7, fy + w * 0.4]], 2, r);
      hatch(c, function () { c.beginPath(); c.rect(fx - (dir < 0 ? len : 0), fy + w * 0.3, len, w); }, [fx - len, fy, len * 2, w * 2], 0.9, 5, 1.6, r);
    }
    /* thumb up over the top edge */
    var th = [[x - dir * s * 0.3, y - s * 0.02], [x - dir * s * 0.05, y - s * 0.32], [x + dir * s * 0.12, y - s * 0.36], [x + dir * s * 0.12, y - s * 0.24], [x - dir * s * 0.1, y + s * 0.04]];
    inkShape(c, th, 4.5, r, 1);
  }

  function handsTin(c, r, x) {
    rect(c, 0, 0, DW, DH, 0);
    /* the string of bulbs above, drawn in white on the dark */
    var wire = [], i;
    for (i = 0; i <= 12; i++) wire.push([-20 + i * 104, 40 + Math.sin(i / 12 * Math.PI) * 70]);
    ink(c, wire, 3, r, 2, 0.95);
    for (i = 1; i < 12; i += 2) {
      var wx = wire[i][0], wy = wire[i][1];
      ink(c, [[wx, wy], [wx, wy + 14]], 6, r, 1, 0.95);
      inkShape(c, [[wx - 9, wy + 16], [wx + 9, wy + 16], [wx + 12, wy + 36], [wx, wy + 48], [wx - 12, wy + 36]], 3, r, 1);
      for (var ry = 0; ry < 8; ry++) { var ra = ry * TAU / 8; ink(c, [[wx + Math.cos(ra) * 26, wy + 32 + Math.sin(ra) * 26], [wx + Math.cos(ra) * 40, wy + 32 + Math.sin(ra) * 40]], 2.4, r, 1, 0.95); }
    }
    for (i = 0; i < 70; i++) { var sx0 = r.range(0, DW), sy0 = r.range(120, 470); ink(c, [[sx0, sy0], [sx0 + r.range(-30, 30), sy0 + r.range(4, 12)]], 1.6, r, 1, 0.75); }
    /* the table */
    var top = [[-20, 520], [1220, 500], [1220, 760], [-20, 760]];
    fillPoly(c, top, 1);
    for (var gl = 0; gl < 14; gl++) ink(c, seg(-20, 540 + gl * 16, 1220, 520 + gl * 17 + r.range(-4, 4), 10), 1.6, r);
    ink(c, seg(-20, 520, 1220, 500, 12), 6, r);
    /* the tin */
    var F = [[400, 330], [800, 330], [800, 560], [400, 560]], T = [[400, 330], [800, 330], [870, 270], [470, 270]], S = [[800, 330], [870, 270], [870, 495], [800, 560]];
    blurred(c, 10, function () { ell(c, 640, 570, 340, 30, 0, 0.1); });
    inkShape(c, F, 6, r, 1); inkShape(c, T, 6, r, 1); inkShape(c, S, 6, r, 1);
    hatch(c, polyClip(c, S), boxOf(S), 1.2, 7, 2.6, r); hatch(c, polyClip(c, S), boxOf(S), -0.3, 9, 2.2, r);
    hatch(c, polyClip(c, F), [400, 470, 400, 90], 1.35, 9, 2, r);
    ink(c, seg(400, 360, 800, 360, 10), 3, r);
    gear(c, 'cash', 240, 650, 300, 170, { rot: -0.1 });
    gear(c, 'stamp', 1000, 640, 200, 150, { rot: 0.12 });
    /* bills under the lid */
    fillPoly(c, [[430, 360], [770, 360], [762, 372], [436, 374]], 0.2);
    for (var b = 0; b < 5; b++) ink(c, seg(440 + b * 8, 352 - b * 2, 720 + b * 10, 348 - b * 3, 6), 2.4, r);
    ink(c, [[560, 330], [566, 375]], 5, r);
    /* the handle and the lock */
    ink(c, [[560, 300], [565, 262], [640, 255], [712, 262], [715, 298]], 7, r);
    inkShape(c, [[585, 345], [615, 345], [615, 385], [585, 385]], 4, r, 0.3);
    ell(c, 600, 362, 4, 6, 0, 1);
    ink(c, [[600, 385], [596, 430], [610, 470]], 3, r);
    inkShape(c, [[600, 468], [624, 470], [630, 488], [604, 492]], 3, r, 1);
    /* dents */
    for (var dn = 0; dn < 4; dn++) { var dx = r.range(430, 760), dy = r.range(400, 540); ink(c, [[dx, dy], [dx + 14, dy + 6], [dx + 26, dy + 2]], 2.4, r); ink(c, [[dx + 4, dy + 5], [dx + 22, dy + 8]], 1.5, r); }
    /* a sticker */
    var stk = [[560, 478], [690, 472], [694, 540], [564, 546]];
    inkShape(c, stk, 3, r, 1);
    marker(c, x.sticker || 'PAY THE', 627, 503, 19, { align: 'center', maxWidth: 106, seed: 's1' });
    marker(c, x.sticker ? '' : 'BANDS 1ST', 629, 531, 19, { align: 'center', maxWidth: 106, seed: 's2' });
    /* the two hands */
    hand(c, r, 425, 380, 210, 1, 'flannel', true);
    hand(c, r, 780, 410, 200, -1, 'hoodie', false);
  }

  /* ---------------- more helpers for the rest of the pictures ---------------- */

  /* A vertical run of grays from v0 at y0 to v1 at y1, over x..x+w. */
  function vgrad(c, x, y0, w, y1, v0, v1) {
    var gr = c.createLinearGradient(0, y0, 0, y1);
    gr.addColorStop(0, g(v0)); gr.addColorStop(1, g(v1));
    c.fillStyle = gr; c.fillRect(x, y0, w, y1 - y0);
  }
  function rrect(c, x, y, w, h, rad) {
    c.beginPath(); c.moveTo(x + rad, y); c.lineTo(x + w - rad, y); c.quadraticCurveTo(x + w, y, x + w, y + rad);
    c.lineTo(x + w, y + h - rad); c.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); c.lineTo(x + rad, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - rad); c.lineTo(x, y + rad); c.quadraticCurveTo(x, y, x + rad, y); c.closePath();
  }
  /* Typewriter words; y is the baseline. */
  function typed(c, text, x, y, size, v, align) {
    c.save(); c.font = '700 ' + size + 'px "SB Type", "Courier New", monospace'; c.fillStyle = g(v == null ? 0 : v);
    c.textAlign = align || 'left'; c.fillText(String(text), x, y); c.restore();
  }
  /* Scribbled lines standing in for small writing nobody can read at this size. */
  function scribble(c, r, x, y, w, rows, gap, lw, v) {
    for (var i = 0; i < rows; i++) {
      var len = w * (i === rows - 1 ? r.range(0.3, 0.7) : r.range(0.75, 1)), px = x, pts = [];
      while (px < x + len) { pts.push([px, y + i * gap + r.range(-1.5, 1.5)]); px += r.range(8, 16); }
      if (pts.length > 1) ink(c, pts, lw, r, lw * 0.4, v);
    }
  }
  /* Rotate the canvas about (x, y) for fn. */
  function turned(c, x, y, ang, fn) { c.save(); c.translate(x, y); c.rotate(ang); fn(); c.restore(); }
  /* A bill seen from above, w wide, its corner number n. Ink style. */
  function bill(c, r, x, y, w, ang, n) {
    var h = w * 0.43;
    turned(c, x, y, ang, function () {
      inkShape(c, [[-w / 2, -h / 2], [w / 2, -h / 2], [w / 2, h / 2], [-w / 2, h / 2]], 2.6, r, 0.97);
      inkShape(c, [[-w * 0.44, -h * 0.36], [w * 0.44, -h * 0.36], [w * 0.44, h * 0.36], [-w * 0.44, h * 0.36]], 1.4, r);
      ell(c, 0, 0, w * 0.12, h * 0.3, 0, 0.55); ell(c, 0, -h * 0.05, w * 0.06, h * 0.12, 0, 0.3);
      typed(c, n, -w * 0.4, -h * 0.12, h * 0.26, 0); typed(c, n, w * 0.4, h * 0.3, h * 0.26, 0, 'right');
    });
  }
  /* A pile of bills, squared up loosely, the top one face up. */
  function billStack(c, r, x, y, w, n, num) {
    for (var i = 0; i < n; i++) bill(c, r, x + r.range(-6, 6), y - i * 3, w, r.range(-0.08, 0.08), num);
  }
  /* A sticky note with a sharpie word on it. */
  function note(c, r, x, y, s, ang, word, v) {
    turned(c, x, y, ang, function () {
      fillPoly(c, [[-s / 2 + 5, -s / 2 + 7], [s / 2 + 5, -s / 2 + 7], [s / 2 + 5, s / 2 + 7], [-s / 2 + 5, s / 2 + 7]], 0.35);
      inkShape(c, [[-s / 2, -s / 2], [s / 2, -s / 2], [s / 2 + 2, s / 2], [-s / 2, s / 2 - 2]], 2.4, r, v == null ? 1 : v);
      marker(c, word, 0, s * 0.14, s * 0.3, { align: 'center', maxWidth: s * 0.86, seed: 'note:' + word });
    });
  }
  /* Tape: a pale strip at an angle. */
  function tape(c, r, x, y, w, ang) {
    turned(c, x, y, ang, function () { c.save(); c.globalAlpha = 0.7; fillPoly(c, [[-w / 2, -11], [w / 2, -13], [w / 2 + 3, 11], [-w / 2 - 2, 12]], 0.92); c.restore(); });
  }
  /* Light through a gap: soft bright wedges added on top. */
  function beam(c, x, y, ang, spread, len, a) {
    c.save(); c.globalCompositeOperation = 'lighter';
    var gr = c.createRadialGradient(x, y, 0, x, y, len);
    gr.addColorStop(0, 'rgba(255,255,255,' + a + ')'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = gr; c.beginPath(); c.moveTo(x, y);
    c.arc(x, y, len, ang - spread / 2, ang + spread / 2); c.closePath(); c.fill();
    c.restore();
  }
  /* A ranch house face-on: ground line at y, left edge x, w wide. lit: the window glows. */
  function ranch(c, r, x, y, w, v, lit) {
    var h = w * 0.34;
    fillPoly(c, [[x - 30, y - h], [x + w * 0.5, y - h - w * 0.13], [x + w + 30, y - h]], Math.max(0, v - 0.18));
    rect(c, x, y - h, w, h, v);
    for (var sy = y - h + 12; sy < y; sy += 13) line(c, x, sy, x + w, sy, 2, Math.max(0, v - 0.12));
    rect(c, x + w * 0.12, y - h * 0.72, w * 0.2, h * 0.38, lit ? 0.95 : 0.12);
    rect(c, x + w * 0.62, y - h * 0.72, w * 0.22, h * 0.38, lit ? 0.9 : 0.15);
    line(c, x + w * 0.22, y - h * 0.72, x + w * 0.22, y - h * 0.34, 3, v);
    line(c, x + w * 0.73, y - h * 0.72, x + w * 0.73, y - h * 0.34, 3, v);
    rect(c, x + w * 0.42, y - h * 0.8, w * 0.11, h * 0.8, Math.max(0, v - 0.2));
    ell(c, x + w * 0.51, y - h * 0.4, 4, 4, 0, 0.9);
    void r;
  }

  /* ---------------- the rest of the pictures ---------------- */

  /* From the back of the room: the band small on the lit stage, the kick with its name, and the crowd from behind,
   * all of them cut out of real photos: a strip of heads and raised hands, three bigger backs nearest the lens. */
  var LIP = [[-DW, -DH], [DW * 2, -DH], [DW * 2, 556], [-DW, 556]];
  function crowdFront(c, r, x) {
    var name = bandName(x) || 'THE BAND', cast = bandCast(x, name), have = ready(bandIds(cast));
    rect(c, 0, 0, DW, DH, 0.08);
    /* the stage at the back: a lit wall, amps, the band, the kick */
    rect(c, 110, 60, 980, 600, 0.9);
    for (var py = 80; py < 640; py += 26) for (var px = 130; px < 1080; px += 26) ell(c, px, py, 3, 3, 0, 0.74);
    amp(c, 150, 250, 170, 230, r); amp(c, 880, 220, 170, 260, r);
    if (have) {
      var dk = cutById(cast.drums);
      paste(c, cast.drums, { x: 600, y: 560, h: dk && dk.w > dk.h ? 250 : 290, rot: r.range(-0.03, 0.03), border: 4, bright: 1.1, kind: 'drums', still: true });
    }
    kick(c, 600, 515, 74, name);
    if (have) {
      var n = cast.front.length, xs = n === 3 ? [330, 800, 960] : [350, 860];
      cast.front.forEach(function (id, i) {
        var k = cutById(id), full = k.frame === 'full';
        paste(c, id, { x: xs[i] + r.range(-15, 15), y: full ? 640 : 590, h: full ? 430 : 310, rot: r.range(-0.03, 0.03), border: 4, bright: 1.1,
          flip: (i === 0 && k.facing === 'left') || (i > 0 && k.facing === 'right'), kind: 'band', clip: LIP });   /* behind the stage's edge */
      });
    }
    rect(c, 110, 556, 980, 24, 0.25);
    vgrad(c, 110, 580, 980, 660, 0.7, 0.45);
    glow(c, 600, 260, 600, 0.35);
    bulbs(c, 100, 50, 1100, 50, 26, 11, 6);
    rect(c, 0, 0, 110, DH, 0.06); rect(c, 1090, 0, 110, DH, 0.06); rect(c, 0, 0, DW, 40, 0.06);
    /* the crowd from the back */
    var pk = picks('CROWD_FRONT', x), near = pk.near || [];
    backs(c, r, 600, 500, 1260, 190, pk.far, 1);
    [[215, 380, -0.03], [1010, 430, 0.02], [640, 470, 0.03]].forEach(function (q, i) { if (near[i]) backAt(c, near[i], q[0], q[1], 330, q[2], 0.95); });
    vignette(c, 0.45);
  }

  /* Your own table at the door, from your chair: the tin, the stamp, the sharpie, your hand; past the edge, the line,
   * people cut off at the chest by the top of the frame. */
  function doorTable(c, r, x) {
    rect(c, 0, 0, DW, DH, 0.12);
    /* the open door behind the line, the street lit */
    rect(c, 160, 0, 880, 390, 0.75);
    for (var i = 0; i < 300; i++) ell(c, r.range(160, 1040), r.range(0, 390), r.range(1, 3), r.range(1, 3), 0, 0.6);
    rect(c, 140, 0, 30, 390, 0.08); rect(c, 1030, 0, 30, 390, 0.08);
    /* the line: real photos, heads out of frame */
    var ids = picks('DOOR_TABLE', x).line || [];
    var spots = [[330, 1.15, -0.02], [640, 1.25, 0.02], [930, 1.1, -0.01]];
    ids.forEach(function (id, j) {
      var s = spots[j % spots.length];
      paste(c, id, { x: s[0], y: 1230, h: 1250 * s[1], rot: s[2], border: 4, bright: 1.05, contrast: 1.15, flip: j === 1,
        clip: [[-200, -DH], [1400, -DH], [1400, 367.9], [-200, 391.1]] });   /* behind the table's edge */
    });
    /* someone holding out a five, the hand coming down from the line */
    front(c, r, function (c, r) {
      turned(c, 820, 70, Math.PI / 2 + 0.25, function () { hand(c, r, 210, 0, 150, 1, 'hoodie', false); });
      bill(c, r, 790, 330, 150, 0.35, '5');
    }, [560, 0, 1000, 460]);
    /* the table */
    var top = [[-20, 390], [1220, 372], [1220, 760], [-20, 760]];
    inkShape(c, top, 6, r, 1);
    for (var s = 0; s < 9; s++) ink(c, seg(-20, 420 + s * 40, 1220, 402 + s * 41 + r.range(-4, 4), 10), 1.4, r);
    /* the sign taped to the front edge, upside down to you */
    var sign = [[430, 378], [790, 371], [796, 426], [434, 432]];
    inkShape(c, sign, 4, r, 1);
    turned(c, 613, 404, Math.PI - 0.02, function () { marker(c, (x.cover || '$5') + ' AT THE DOOR', 0, 14, 32, { align: 'center', maxWidth: 330, seed: 'door' }); });
    tape(c, r, 440, 384, 50, -0.5); tape(c, r, 785, 377, 50, 0.4);
    /* the open tin, bills in it */
    var tin = [[50, 500], [380, 490], [400, 720], [30, 730]];
    inkShape(c, tin, 6, r, 1);
    var lid = [[50, 500], [380, 490], [372, 432], [66, 442]];
    inkShape(c, lid, 5, r, 1); hatch(c, polyClip(c, lid), boxOf(lid), 1.3, 7, 2.2, r);
    hatch(c, polyClip(c, [[380, 490], [400, 720], [412, 712], [392, 486]]), [380, 486, 32, 240], 1.2, 5, 2, r);
    ink(c, seg(215, 496, 220, 724, 6), 4, r);
    billStack(c, r, 130, 600, 130, 4, '1'); billStack(c, r, 300, 596, 130, 3, '5');
    gear(c, 'cash', 230, 700, 260, 150, { rot: r.range(-0.12, 0.12) });
    for (var cn = 0; cn < 6; cn++) { var cx0 = r.range(70, 360), cy0 = r.range(670, 705); ell(c, cx0, cy0, 14, 10, 0, 0); ell(c, cx0, cy0, 11, 7, 0, 0.8); }
    /* the stamp pad, the stamp */
    var pad = [[460, 470], [640, 464], [648, 556], [464, 562]];
    inkShape(c, pad, 5, r, 1);
    var ink0 = [[476, 482], [628, 477], [634, 544], [480, 548]];
    inkShape(c, ink0, 3, r, 0.15); hatch(c, polyClip(c, ink0), boxOf(ink0), 0.6, 6, 1.6, r, 1);
    var st0 = [[690, 520], [800, 514], [806, 592], [692, 598]];
    inkShape(c, st0, 5, r, 1); hatch(c, polyClip(c, st0), boxOf(st0), 1.1, 6, 1.6, r);
    inkShape(c, [[728, 516], [766, 514], [764, 450], [730, 452]], 4, r, 1);
    ell(c, 747, 436, 36, 26, 0, 0); ell(c, 747, 436, 30, 20, 0, 1); ink(c, [[728, 430], [740, 424]], 3, r);
    /* the sharpie, the clicker */
    if (!gear(c, 'marker', 580, 700, 280, 100, { rot: -0.18 })) turned(c, 580, 670, -0.18, function () {
      inkShape(c, [[-110, -14], [70, -14], [70, 14], [-110, 14]], 4, r, 1); inkShape(c, [[70, -16], [130, -16], [138, 0], [130, 16], [70, 16]], 4, r, 0.05);
      ink(c, seg(-80, -14, -80, 14, 2), 3, r);
    });
    ell(c, 1060, 520, 60, 60, 0, 0.05); ell(c, 1060, 520, 52, 52, 0, 0.8);
    inkShape(c, [[1026, 502], [1094, 502], [1094, 534], [1026, 534]], 3, r, 1);
    typed(c, String(x.count == null ? '041' : ('00' + x.count).slice(-3)), 1060, 527, 26, 0, 'center');
    ink(c, [[1060, 462], [1060, 436]], 12, r);
    gear(c, 'tape', 1135, 720, 150, 120, { rot: 0.2 });
    /* your hand coming in from the bottom, stamped */
    turned(c, 930, 640, -Math.PI / 2 - 0.3, function () { hand(c, r, 0, 0, 240, 1, 'flannel', true); });
  }

  /* The cash on the kitchen floor, from above: piles of bills, a note on each. */
  function kitchenFloor(c, r, x) {
    rect(c, 0, 0, DW, DH, 1);
    turned(c, 600, 375, -0.1, function () {
      var T = 150, i, j;
      for (i = -6; i <= 6; i++) for (j = -5; j <= 5; j++) {
        var tx = i * T, ty = j * T;
        var t = [[tx, ty], [tx + T, ty], [tx + T, ty + T], [tx, ty + T]];
        if ((i + j) & 1) { inkShape(c, t, 2, r, 1); hatch(c, polyClip(c, t), [tx, ty, T, T], 0.78, 9, 2, r); }
        else inkShape(c, t, 2, r, 1);
        if (r.chance(0.12)) ink(c, [[tx + r.range(10, 60), ty + r.range(10, 140)], [tx + r.range(70, 140), ty + r.range(10, 140)]], 1.6, r);
      }
    });
    var who = [['ROOM', 1], ['SOUND', 1], ['BAND', 5], ['LOCALS', 5], ['YOU', 1]];
    if (x.sound) who[1][0] = upper(x.sound);
    var spots = [[190, 230], [480, 190], [800, 240], [1030, 420], [360, 520]];
    who.forEach(function (w, i) {
      var p = spots[i], n = i === 2 ? 6 : i === 4 ? 1 : r.int(2, 4);
      blurred(c, 8, function () { ell(c, p[0] + 10, p[1] + 14, 120, 54, 0, 0.55); });
      billStack(c, r, p[0], p[1], 250, n, w[1] === 5 ? (i === 2 ? '20' : '5') : '1');
      ink(c, [[p[0] - 30, p[1] - 3 * n - 48], [p[0] - 30, p[1] - 3 * n + 48]], 7, r, 1);
      note(c, r, p[0] + 70, p[1] - 70 - 3 * n, 110, r.range(-0.2, 0.2), w[0]);
    });
    gear(c, 'cash', 800, 300, 260, 150, { rot: 0.15 }); gear(c, 'cash', 1030, 480, 260, 150, { rot: -0.2 });
    gear(c, 'phone', 1100, 230, 170, 200, { rot: 0.35 });
    /* the tin, open, empty, at the edge */
    var tin = [[760, 560], [1060, 600], [1030, 790], [720, 760]];
    inkShape(c, tin, 6, r, 1); hatch(c, polyClip(c, tin), boxOf(tin), 0.4, 9, 2, r);
    inkShape(c, [[790, 590], [1030, 622], [1008, 770], [752, 740]], 4, r, 0.95);
    /* a knee and a hand counting */
    hand(c, r, 660, 400, 170, -1, 'hoodie', false);
  }

  /* A phone in a hand, in the dark, the screen the only light. */
  function phoneScreen(c, r, x) {
    rect(c, 0, 0, DW, DH, 0);
    for (var i = 0; i < 14; i++) { var y0 = r.range(0, DH); ink(c, [[r.range(-50, 300), y0], [r.range(400, 800), y0 + r.range(-60, 60)], [r.range(900, 1250), y0 + r.range(-80, 80)]], 1.6, r, 3, 0.4); }
    turned(c, 600, 370, -0.12, function () {
      var w = 330, h = 600, x0 = -w / 2, y0 = -h / 2, f;
      blurred(c, 40, function () { c.fillStyle = 'rgba(255,255,255,0.3)'; c.fillRect(x0 - 70, y0 - 70, w + 140, h + 140); });
      /* no hand: people are never drawn (memory, user 2026-11-22). The phone lies on the table, a shadow under it */
      blurred(c, 18, function () { c.fillStyle = 'rgba(0,0,0,0.55)'; c.fillRect(x0 + 14, y0 + 22, w, h); });
      rrect(c, x0, y0, w, h, 38); c.fillStyle = g(0.05); c.fill();
      c.lineWidth = 5; c.strokeStyle = g(0.6); c.stroke();
      rrect(c, x0 + 16, y0 + 50, w - 32, h - 100, 10); c.fillStyle = g(1); c.fill();
      for (var b = 0; b < 4; b++) rect(c, x0 + 30 + b * 9, y0 + 34 - b * 4, 6, 6 + b * 4, 0.8);
      rect(c, x0 + w - 62, y0 + 22, 34, 14, 0.8);
      rect(c, x0 + 16, y0 + 50, w - 32, 56, 0.85);
      ell(c, x0 + 52, y0 + 78, 18, 18, 0, 0.3);
      scribble(c, r, x0 + 82, y0 + 82, 120, 1, 0, 4, 0.2);
      var by = y0 + 130, sides = [0, 0, 1, 0], k;
      for (k = 0; k < sides.length; k++) {
        var mine = sides[k] === 1, bw = r.range(160, 230), rows = r.int(1, 3), bh = 26 + rows * 20;
        var bx = mine ? x0 + w - 32 - bw : x0 + 32;
        rrect(c, bx, by, bw, bh, 16); c.fillStyle = g(mine ? 0.25 : 0.82); c.fill();
        scribble(c, r, bx + 14, by + 24, bw - 28, rows, 20, 4, mine ? 0.95 : 0.15);
        by += bh + 18;
      }
      rrect(c, x0 + 30, y0 + h - 104, w - 60, 40, 18); c.lineWidth = 3; c.strokeStyle = g(0.6); c.stroke();
    });
  }

  /* The mail: a stack of envelopes and printouts, demo tapes, a note stuck to the lamp. */
  function inboxStack(c, r, x) {
    rect(c, 0, 0, DW, DH, 1);
    var wall = [[-20, -20], [1220, -20], [1220, 250], [-20, 270]];
    inkShape(c, wall, 4, r, 1); hatch(c, polyClip(c, wall), boxOf(wall), 0.1, 10, 2, r); hatch(c, polyClip(c, wall), boxOf(wall), 1.4, 13, 1.8, r);
    for (var s = 0; s < 8; s++) ink(c, seg(-20, 300 + s * 60, 1220, 280 + s * 62 + r.range(-6, 6), 10), 1.5, r);
    /* a flyer pinned to the wall */
    var fl = [[880, 30], [1060, 40], [1052, 220], [870, 212]];
    inkShape(c, fl, 3, r, 1);
    marker(c, x.bookingName || 'SHOWS', 965, 92, 26, { align: 'center', maxWidth: 160, seed: 'wallflyer' });
    scribble(c, r, 895, 130, 140, 4, 20, 2.4);
    ell(c, 965, 36, 6, 6, 0, 0);
    /* the stack */
    var n = 11, base = 640, i;
    for (i = 0; i < n; i++) {
      var w = r.range(380, 460), y = base - i * 30, xc = 520 + r.range(-26, 26), sk = r.range(-0.05, 0.05);
      turned(c, xc, y, sk, function () {
        var e = [[-w / 2, -16], [w / 2, -16], [w / 2 + 40, -46], [-w / 2 + 40, -46]];
        inkShape(c, [[-w / 2, -16], [w / 2, -16], [w / 2, 4], [-w / 2, 4]], 3, r, 1);
        inkShape(c, [[w / 2, -16], [w / 2 + 40, -46], [w / 2 + 40, -26], [w / 2, 4]], 3, r, 0.75);
        if (i === n - 1) {
          inkShape(c, e, 3, r, 1);
          ink(c, [[-w / 2 + 6, -18], [20, -36], [w / 2 + 34, -44]], 2.4, r);
          rect(c, w / 2 - 30, -42, 26, 18, 0.2);
          scribble(c, r, -60, -34, 120, 2, 8, 2);
        }
        if (r.chance(0.5)) ink(c, [[-w / 2 + 20, -6], [-w / 2 + 90, -6]], 2, r);
      });
    }
    gear(c, 'mail', 470, 345, 300, 170, { rot: -0.08 }); gear(c, 'mail', 610, 320, 280, 160, { rot: 0.1 });
    gear(c, 'mail', 1080, 735, 240, 150, { rot: 0.18 });
    gear(c, 'machine', 175, 450, 250, 160);
    /* demo tapes */
    [[140, 610, -0.2], [210, 560, 0.15], [960, 600, 0.25]].forEach(function (t, k) {
      if (gear(c, 'tapes', t[0], t[1] + 60, 200, 130, { rot: t[2] })) return;
      turned(c, t[0], t[1], t[2], function () {
        inkShape(c, [[-90, -56], [90, -56], [90, 56], [-90, 56]], 4, r, 1);
        inkShape(c, [[-70, -40], [70, -40], [70, 4], [-70, 4]], 3, r, 0.95);
        ell(c, -36, 24, 16, 16, 0, 0.05); ell(c, 36, 24, 16, 16, 0, 0.05); ell(c, -36, 24, 7, 7, 0, 1); ell(c, 36, 24, 7, 7, 0, 1);
        marker(c, k === 1 ? 'DEMO' : k ? 'LIVE' : '4 SONGS', 0, -12, 22, { align: 'center', maxWidth: 130, seed: 'tape' + k });
      });
    });
    note(c, r, 880, 430, 150, 0.08, 'ANSWER');
    marker(c, 'EVERYONE', 880, 478, 24, { align: 'center', maxWidth: 130, seed: 'everyone' });
  }

  /* A van at the curb at dusk, stuff on the roof, someone leaning on it. */
  function vanCurb(c, r, x) {
    vgrad(c, 0, 0, DW, 520, 0.92, 0.6);
    blurred(c, 30, function () { for (var i = 0; i < 4; i++) ell(c, r.range(0, DW), r.range(40, 200), r.range(160, 300), r.range(16, 30), 0, 0.98); });
    oak(c, r, 160, 160, 0.9);
    if (!gear(c, 'house', 1000, 536, 540, 330, { bright: 0.9 })) ranch(c, r, 760, 520, 520, 0.4, true);
    line(c, -20, 120, 1220, 160, 2, 0.1); line(c, -20, 140, 1220, 190, 2, 0.1);
    rect(c, 1080, 40, 16, 480, 0.12);
    rect(c, 0, 500, DW, 40, 0.5);
    for (var gl = 0; gl < 60; gl++) { var gx = r.range(0, DW), gy = r.range(500, 535); line(c, gx, gy, gx + r.range(-4, 4), gy - r.range(6, 16), 2, 0.35); }
    rect(c, 0, 532, DW, 40, 0.8); rect(c, 0, 568, DW, 10, 0.3);
    vgrad(c, 0, 578, DW, DH, 0.45, 0.3);
    blurred(c, 14, function () { ell(c, 560, 690, 440, 30, 0, 0.05); });
    /* the van: a real photo, its back to the curb where someone leans; the drawn one until the photo is in */
    var vk = cutById((picks('VAN_CURB', x).van || [])[0]);
    if (vk && vehicle(c, vk.id, 560, 690, 860, 'left', { bright: 1.05, border: 5 })) {
      var vw0 = 860, vh0 = vw0 * vk.h / vk.w, vtop = 690 - vh0 + vh0 * 0.13;   /* the roof line, a little under the top of the cut */
      /* a mattress roped to the roof: the real mattress photo, pressed flat; the drawn slab only until it is in */
      var bedId = (picks('VAN_CURB', x).bed || [])[0], bk = cutById(bedId), mw = vw0 * 0.56, SQ = 0.78, mh = 58, laid = false;
      if (bk && isIn(bedId)) {
        mh = mw * bk.h / bk.w * SQ;
        c.save(); c.translate(560, vtop + 16); c.scale(1, SQ);
        laid = paste(c, bedId, { x: 0, y: 0, h: mw * bk.h / bk.w, border: 4, bright: 0.88, contrast: 1.45, still: true });
        c.restore();
      }
      if (!laid) {
        mh = 58;
        rrect(c, 560 - vw0 * 0.3, vtop - 44, vw0 * 0.6, 58, 22); c.fillStyle = g(0.84); c.fill(); c.lineWidth = 3; c.strokeStyle = g(0.3); c.stroke();
      }
      /* two ropes over the top, down through the doors */
      [-0.17, 0.15].forEach(function (f) {
        line(c, 560 + vw0 * f, vtop + 10 - mh - 4, 560 + vw0 * f + 10, vtop + 14, 5, 0.1);
        line(c, 560 + vw0 * f + 10, vtop + 14, 560 + vw0 * f * 1.5, vtop + vh0 * 0.3, 3, 0.1);
      });
    } else drawnVan();
    function drawnVan() {
    var L = 150, R = 1000, T = 330, B = 660;
    c.beginPath(); c.moveTo(L, B - 20); c.lineTo(L, T + 20); c.quadraticCurveTo(L, T, L + 20, T); c.lineTo(820, T);
    c.lineTo(900, 440); c.lineTo(R - 10, 470); c.quadraticCurveTo(R, 474, R, 500); c.lineTo(R, B - 20); c.closePath();
    c.fillStyle = g(0.9); c.fill();
    vgrad(c, L, 560, R - L, B - 20, 0.85, 0.6);
    fillPoly(c, [[828, 344], [890, 440], [828, 444]], 0.2);
    fillPoly(c, [[L + 30, 355], [440, 355], [440, 440], [L + 30, 440]], 0.18);
    fillPoly(c, [[470, 355], [800, 355], [800, 440], [470, 440]], 0.18);
    line(c, 836, 350, 870, 420, 2, 0.9); line(c, 850, 380, 830, 430, 2, 0.85); line(c, 850, 380, 884, 400, 2, 0.85);
    line(c, 455, 340, 455, 640, 3, 0.45); line(c, 815, 340, 815, 640, 3, 0.45); line(c, L, 520, R, 520, 2, 0.6);
    rect(c, 780, 480, 26, 8, 0.2); rect(c, L - 6, 470, 14, 50, 0.3); rect(c, R - 14, 520, 20, 24, 0.95);
    [300, 860].forEach(function (wx) { ell(c, wx, B - 10, 84, 84, 0, 0.2); ell(c, wx, B, 70, 70, 0, 0.03); ell(c, wx, B, 30, 30, 0, 0.55); ell(c, wx, B, 12, 12, 0, 0.1); });
    /* stickers on the back door */
    rect(c, L + 40, 470, 70, 30, 0.98); rect(c, L + 120, 480, 50, 36, 0.15); rect(c, L + 60, 520, 60, 24, 0.7);
    /* the rack and a mattress tied on */
    rect(c, L + 20, T - 14, 640, 8, 0.1);
    for (var p = 0; p < 6; p++) rect(c, L + 40 + p * 120, T - 14, 6, 14, 0.1);
    rrect(c, L + 40, T - 88, 560, 74, 26); c.fillStyle = g(0.82); c.fill(); c.lineWidth = 3; c.strokeStyle = g(0.35); c.stroke();
    for (var q = 0; q < 9; q++) ell(c, L + 90 + q * 58, T - 50, 4, 4, 0, 0.45);
    [L + 150, L + 470].forEach(function (rx) { line(c, rx, T - 92, rx + 10, T - 8, 5, 0.12); line(c, rx + 10, T - 8, rx + 40, 352, 3, 0.12); });
    }
    /* someone leaning by the back of it */
    var vw = (picks('VAN_CURB', x).who || [])[0];
    if (vw) paste(c, vw, { x: 1090, y: 700, h: 520, rot: 0.02, border: 5, bright: 0.95 });
    vignette(c, 0.4);
  }

  /* People asleep on the floor, the blinds striping them with streetlight. */
  function floorSleep(c, r, x) {
    /* the wall, the window, the couch against it */
    rect(c, 0, 0, DW, 400, 0.62);
    rect(c, 0, 390, DW, 360, 0.4);
    rect(c, 0, 392, DW, 10, 0.12);
    rect(c, 700, 50, 300, 230, 0.12); rect(c, 712, 62, 276, 206, 0.9);
    for (var b = 0; b < 10; b++) rect(c, 712, 66 + b * 21, 276, 9, 0.35);
    glow(c, 850, 160, 300, 0.25);
    /* couch: a real one against the wall when the picture has it, else drawn with someone asleep on it, an arm hanging */
    if (!gear(c, 'sofa', 340, 404, 620, 250, { bright: 0.85 })) {
    rrect(c, 70, 190, 540, 130, 30); c.fillStyle = g(0.26); c.fill();
    rect(c, 70, 310, 540, 50, 0.2); rect(c, 70, 356, 540, 46, 0.1);
    rrect(c, 30, 230, 70, 172, 24); c.fillStyle = g(0.22); c.fill(); rrect(c, 580, 230, 70, 172, 24); c.fill();
    line(c, 250, 200, 250, 312, 3, 0.15); line(c, 430, 200, 430, 312, 3, 0.15);
    c.beginPath(); c.moveTo(120, 318); c.bezierCurveTo(180, 240, 330, 250, 400, 270); c.bezierCurveTo(480, 250, 560, 270, 580, 318); c.closePath(); c.fillStyle = g(0.66); c.fill();
    for (var fo = 0; fo < 4; fo++) line(c, 230 + fo * 80, 280, 250 + fo * 80, 316, 3, 0.45);
    ell(c, 120, 300, 54, 26, -0.2, 0.95); ell(c, 128, 284, 36, 26, 0, 0.04);
    }

    /* guitar cases, a box fan */
    if (!gear(c, 'case', 1100, 400, 190, 330, { rot: 0.1, bright: 0.9 })) turned(c, 1100, 270, 0.12, function () { c.beginPath(); c.ellipse(0, 60, 56, 82, 0, 0, TAU); c.ellipse(0, -60, 40, 54, 0, 0, TAU); c.fillStyle = g(0.08); c.fill(); rect(c, -12, -230, 24, 170, 0.08); });
    if (!gear(c, 'fan', 1065, 595, 200, 190, { bright: 0.95 })) {
    rect(c, 980, 420, 170, 170, 0.08); ell(c, 1065, 505, 72, 72, 0, 0.62); ell(c, 1065, 505, 16, 16, 0, 0.05);
    for (var k = 0; k < 5; k++) { var a = k * TAU / 5 + 0.3; ell(c, 1065 + Math.cos(a) * 36, 505 + Math.sin(a) * 36, 30, 13, a, 0.15); }
    for (var gr = 0; gr < 6; gr++) line(c, 995, 440 + gr * 26, 1135, 440 + gr * 26, 2, 0.08);
    }
    /* the sleepers on the floor: bags, pillows, hair */
    var bags = [[360, 520, 300, 62, -0.04, 1], [560, 650, 380, 80, 0.03, -1]];
    bags.forEach(function (bg, i) {
      blurred(c, 10, function () { ell(c, bg[0], bg[1] + bg[3] * 0.7, bg[2] * 1.05, bg[3] * 0.35, bg[4], 0.06); });
      ell(c, bg[0], bg[1], bg[2], bg[3], bg[4], 0.7);
      for (var z = 1; z < 6; z++) { var zx = bg[0] - bg[2] + z * bg[2] * 0.33; line(c, zx, bg[1] - bg[3] * 0.85, zx - 8, bg[1] + bg[3] * 0.85, 4, 0.45); }
      var hx = bg[0] - bg[2] * 0.95 * bg[5];
      ell(c, hx - 20 * bg[5], bg[1] - 4, 70, 34, 0, 0.94);
      ell(c, hx + 8 * bg[5], bg[1] - 20, 40, 32, 0, 0.04);
      ell(c, hx + 30 * bg[5], bg[1] - 6, 22, 24, 0, 0.75);
      if (i) for (var hl = 0; hl < 7; hl++) line(c, hx, bg[1] - 30, hx - bg[5] * r.range(40, 80), bg[1] - r.range(-20, 30), 6, 0.04);
    });
    gear(c, 'bed', 520, 740, 470, 170, { rot: 0.03, bright: 0.9 });
    var sl = (picks('FLOOR_SLEEP', x).who || [])[0], slk = sl && cutById(sl);
    if (slk) paste(c, sl, slk.w > slk.h ? { x: 890, y: 735, w: 460, rot: 0.03, border: 4, bright: 0.9 }
      : { x: 1130, y: 640, h: 440, rot: -Math.PI / 2 + 0.06, border: 4, bright: 0.9 });   /* shot from above: laid down */
    paste(c, 'boots-01', { x: 140, y: 740, h: 200, rot: -0.08, border: 4, bright: 1.05 });
    /* the streetlight through the blinds, striped across the room */
    front(c, r, function (c) {
      c.save(); c.globalCompositeOperation = 'lighter';
      for (var s = 0; s < 10; s++) {
        var y0 = 340 + s * 44;
        c.beginPath(); c.moveTo(1000, y0 - 200); c.lineTo(1000, y0 - 184); c.lineTo(40, y0 + 160); c.lineTo(40, y0 + 136); c.closePath();
        c.fillStyle = 'rgba(255,255,255,0.18)'; c.fill();
      }
      c.restore();
    });
    vignette(c, 0.5);
  }

  /* An empty room: a bare bulb, tape marks where the flyers were, a mop. */
  function emptyRoom(c, r, x) {
    var bx0 = 330, by0 = 150, bx1 = 870, by1 = 520;
    fillPoly(c, [[0, 0], [DW, 0], [bx1, by0], [bx0, by0]], 0.42);
    fillPoly(c, [[0, 0], [bx0, by0], [bx0, by1], [0, DH]], 0.55);
    fillPoly(c, [[DW, 0], [DW, DH], [bx1, by1], [bx1, by0]], 0.5);
    fillPoly(c, [[0, DH], [bx0, by1], [bx1, by1], [DW, DH]], 0.62);
    rect(c, bx0, by0, bx1 - bx0, by1 - by0, 0.72);
    /* the floor: concrete, stains, a drain */
    blurred(c, 16, function () { ell(c, 560, 640, 160, 40, 0.1, 0.45); ell(c, 820, 590, 70, 20, 0, 0.5); });
    for (var cr = 0; cr < 3; cr++) { var cx = r.range(200, 1000); ink(c, [[cx, 760], [cx + r.range(-40, 40), 640], [cx + r.range(-60, 60), 560]], 2, r, 4, 0.4); }
    /* where the flyers were: lighter squares and tape */
    for (var f = 0; f < 7; f++) {
      var fx = r.range(bx0 + 20, bx1 - 110), fy = r.range(by0 + 20, by0 + 200), fw = r.range(70, 110), fh = fw * 1.3;
      rect(c, fx, fy, fw, fh, 0.8);
      [[fx, fy], [fx + fw, fy], [fx, fy + fh], [fx + fw, fy + fh]].forEach(function (p) { if (r.chance(0.7)) rect(c, p[0] - 9, p[1] - 4, 18, 8, 0.95); });
    }
    fillPoly(c, [[bx0 + 90, by0 + 230], [bx0 + 230, by0 + 226], [bx0 + 232, by0 + 300], [bx0 + 94, by0 + 304]], 0.97);
    marker(c, 'THANK YOU', bx0 + 162, by0 + 276, 30, { align: 'center', maxWidth: 124, seed: 'thanks' });
    /* the outlet the PA used */
    rect(c, 760, 450, 30, 44, 0.9); rect(c, 768, 458, 4, 10, 0.2); rect(c, 778, 458, 4, 10, 0.2);
    /* a door in the right wall, a window in the left letting light across the floor */
    fillPoly(c, [[960, 120], [1090, 60], [1090, 650], [960, 570]], 0.3);
    ell(c, 980, 360, 6, 6, 0, 0.85);
    fillPoly(c, [[90, 160], [240, 200], [240, 380], [90, 400]], 0.95);
    line(c, 165, 180, 165, 390, 4, 0.5); line(c, 90, 280, 240, 290, 4, 0.5);
    c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.28;
    fillPoly(c, [[90, 400], [240, 380], [700, 720], [260, 760]], 1);
    c.restore();
    /* sometimes a couch somebody dragged in off the curb, against the back wall */
    if (r.chance(0.5)) gear(c, 'sofa', 694, 548, 250, 125, { bright: 0.95 });   /* clear of the THANK YOU sign */
    else gear(c, 'table', 690, 560, 230, 150, { bright: 0.95 });
    /* the mop and bucket */
    rect(c, 820, 470, 70, 60, 0.25); ell(c, 855, 470, 35, 8, 0, 0.1);
    line(c, 860, 230, 840, 500, 6, 0.15);
    /* the bulb */
    line(c, 600, 0, 600, 200, 3, 0.1);
    glow(c, 600, 230, 420, 0.4);
    rect(c, 590, 194, 20, 20, 0.05); ell(c, 600, 230, 20, 24, 0, 1);
    c.lineWidth = 3; c.strokeStyle = g(0.2); c.beginPath(); c.ellipse(600, 230, 20, 24, 0, 0, TAU); c.stroke();
    vignette(c, 0.5);
  }

  /* A wall of flyers, stapled over each other, the booker's name on most of them. */
  function flyerWall(c, r, x) {
    rect(c, 0, 0, DW, DH, 0.3);
    /* brick, inked */
    for (var row = 0; row < 18; row++) {
      var y = row * 44, off = row % 2 ? 0 : 60;
      ink(c, seg(0, y, DW, y + r.range(-2, 2), 12), 2.2, r, 1, 0.75);
      for (var bx = -off; bx < DW; bx += 120) ink(c, [[bx, y], [bx + r.range(-2, 2), y + 44]], 2, r, 1, 0.75);
    }
    var bands = (x.bands && x.bands.length ? x.bands : [x.band || 'THE BAND']).slice();
    var where = x.newRoom || x.room || 'THE CARPORT', who = x.bookingName || '';
    var heads = [bands[0], who || bands[1] || 'ALL AGES', bands[1] || 'MATINEE', 'ALL AGES', bands[2] || 'BENEFIT', where, bands[0], 'TONIGHT'];
    var sheets = [[150, 210, -0.08, 250], [440, 170, 0.05, 260], [740, 220, -0.03, 250], [1040, 180, 0.07, 240],
      [250, 520, 0.06, 240], [560, 500, -0.06, 270], [880, 530, 0.04, 250], [1120, 560, -0.1, 200]];
    var photoAt = 5, pid = (picks('FLYER_WALL', x).photo || [])[0];
    sheets.forEach(function (s, i) {
      var w = s[3], h = w * 1.29, k;
      turned(c, s[0], s[1], s[2], function () {
        blurred(c, 6, function () { rect(c, -w / 2 + 8, -h / 2 + 10, w, h, 0.05); });
        rect(c, -w / 2, -h / 2, w, h, i % 3 === 1 ? 0.88 : 0.97);
        var head = heads[i % heads.length];
        if (i === photoAt) {
          rect(c, -w / 2 + 14, -h / 2 + 14, w - 28, h * 0.5, 0.15);
          if (pid) paste(c, pid, { x: 0, y: -h / 2 + 14 + h * 0.5, h: h * 0.48, border: 0, bright: 1.2, still: true });
          marker(c, head, 0, h * 0.16, 36, { align: 'center', maxWidth: w - 30, treatment: 'block', seed: 'fw' + i });
          typed(c, (x.cover || '$5') + '  DOORS 8', 0, h * 0.3, 17, 0, 'center');
        } else {
          if (i % 4 === 2) { rect(c, -w / 2, -h / 2, w, h * 0.34, 0.05); marker(c, head, 0, -h / 2 + h * 0.24, 40, { align: 'center', maxWidth: w - 24, treatment: 'block', ink: '#fff', seed: 'fw' + i }); }
          else marker(c, head, 0, -h / 2 + h * 0.22, 44, { align: 'center', maxWidth: w - 24, treatment: i % 2 ? 'marker' : 'block', seed: 'fw' + i });
          marker(c, ['SAT', 'FRI', 'SUN 3PM', 'THU'][i % 4], -w / 2 + 18, -h / 2 + h * 0.42, 30, { maxWidth: w * 0.5, seed: 'day' + i });
          marker(c, x.cover || '$5', w / 2 - 70, -h / 2 + h * 0.42, 34, { maxWidth: 60, seed: 'cv' + i });
          for (k = 0; k < 3; k++) marker(c, bands[(i + k + 1) % bands.length], 0, -h / 2 + h * (0.58 + k * 0.1), 22, { align: 'center', maxWidth: w - 40, seed: 'b' + i + k });
          if (i % 3 === 0) { /* a crude map in the corner */
            ink(c, [[-w / 2 + 20, h / 2 - 30], [w / 2 - 20, h / 2 - 40]], 3, r); ink(c, [[-10, h / 2 - 70], [-6, h / 2 - 10]], 3, r);
            ell(c, 20, h / 2 - 48, 6, 6, 0, 0);
          } else scribble(c, r, -w / 2 + 24, h / 2 - 40, w - 48, 2, 14, 2);
        }
        for (k = 0; k < 2; k++) rect(c, (k ? 1 : -1) * (w / 2 - 14) - 7, -h / 2 + 8, 14, 3, 0.3);
        if (r.chance(0.35)) fillPoly(c, [[w / 2 - 50, h / 2], [w / 2, h / 2 - 60], [w / 2, h / 2]], 0.3);
      });
    });
    /* torn leftovers and tape over the top */
    for (var t = 0; t < 6; t++) tape(c, r, r.range(80, 1120), r.range(60, 700), r.range(40, 70), r.range(-1, 1));
    vignette(c, 0.3);
  }

  /* A bar door at night: brick, a lit window with a neon sign, a stool and the stamp, the door person. */
  function barDoor(c, r, x) {
    rect(c, 0, 0, DW, DH, 0.36);
    for (var row = 0; row < 17; row++) {
      var y = row * 40, off = row % 2 ? 0 : 50;
      line(c, 0, y, DW, y, 4, 0.16);
      for (var bx = -off; bx < DW; bx += 100) line(c, bx, y, bx, y + 40, 4, 0.16);
    }
    /* the window, dark, the neon in it */
    rect(c, 80, 140, 380, 300, 0.04); rect(c, 96, 156, 348, 268, 0.12);
    glow(c, 270, 290, 260, 0.3);
    turned(c, 270, 280, -0.04, function () {
      marker(c, 'COLD', 0, -10, 70, { align: 'center', maxWidth: 300, ink: '#fff', seed: 'neon1' });
      marker(c, 'BEER', 0, 76, 70, { align: 'center', maxWidth: 300, ink: '#fff', seed: 'neon2' });
    });
    /* the door, open a crack, light spilling */
    rect(c, 560, 120, 270, 530, 0.05); rect(c, 576, 136, 238, 514, 0.2);
    rect(c, 630, 180, 130, 140, 0.95); line(c, 695, 180, 695, 320, 4, 0.2);
    rect(c, 812, 136, 18, 514, 1);
    c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.35; fillPoly(c, [[812, 650], [830, 650], [1020, 760], [880, 760]], 1); c.restore();
    /* the bulb over the door */
    rect(c, 680, 72, 30, 18, 0.08); ell(c, 695, 98, 14, 16, 0, 1); glow(c, 695, 100, 420, 0.35);
    /* the sidewalk */
    rect(c, 0, 650, DW, 100, 0.55); line(c, 0, 650, DW, 650, 5, 0.15);
    for (var sx = 0; sx < DW; sx += 200) line(c, sx, 650, sx - 60, 750, 3, 0.35);
    /* the sign taped up by the door */
    fillPoly(c, [[870, 250], [1010, 244], [1014, 390], [874, 394]], 0.98);
    marker(c, x.cover || '$5', 942, 310, 46, { align: 'center', maxWidth: 120, seed: 'barcover' });
    marker(c, '21+ W/ ID', 942, 362, 22, { align: 'center', maxWidth: 120, seed: 'barid' });
    /* the stool by the door, the stamp on it */
    ell(c, 480, 512, 74, 18, 0, 0.85); rect(c, 406, 512, 148, 14, 0.06);
    line(c, 424, 524, 400, 650, 8, 0.85); line(c, 536, 524, 560, 650, 8, 0.85); line(c, 412, 600, 548, 600, 6, 0.85);
    rect(c, 456, 470, 46, 30, 0.08); rect(c, 470, 448, 18, 24, 0.75); ell(c, 479, 444, 16, 11, 0, 0.08);
    /* the door person, leaning on the wall */
    var bw = (picks('BAR_DOOR', x).who || [])[0];
    if (bw) paste(c, bw, { x: 1100, y: 730, h: 540, rot: -0.02, border: 5, bright: 1.1 });
    vignette(c, 0.4);
  }

  /* The long low bridge over the bay at sunrise. */
  function bridge(c, r, x) {
    vgrad(c, 0, 0, DW, 400, 0.2, 0.5);
    for (var cl = 0; cl < 7; cl++) { var cy = r.range(60, 340), cx = r.range(-100, 1100); blurred(c, 6, function () { ell(c, cx, cy, r.range(140, 320), r.range(6, 14), 0, 0.28); }); }
    glow(c, 520, 395, 420, 0.18);
    ell(c, 520, 400, 84, 84, 0, 1);
    ell(c, 520, 400, 96, 96, 0, 1); c.save(); c.globalAlpha = 0.5; ell(c, 520, 400, 110, 110, 0, 0.85); c.restore(); ell(c, 520, 400, 84, 84, 0, 1);
    vgrad(c, 0, 400, DW, DH, 0.62, 0.42);
    for (var gl = 0; gl < 110; gl++) { var gy = r.range(404, DH), spread = (gy - 400) * 0.7 + 40; var gx = 520 + r.range(-spread, spread) * 0.5; line(c, gx, gy, gx + r.range(10, 40) * (gy / 400), gy, 2 + (gy - 400) / 120, 0.95); }
    for (var wv = 0; wv < 40; wv++) { var wy = r.range(420, DH), wx = r.range(0, DW); line(c, wx, wy, wx + r.range(30, 90), wy, 2, 0.12); }
    rect(c, 0, 397, DW, 5, 0.32);
    /* the bridge: a long low causeway from the near left out to the horizon at right */
    var x0 = -40, y0 = 560, x1 = 1220, y1 = 402;
    function at(t) { var e = Math.pow(t, 0.6); return [x0 + (x1 - x0) * e, y0 + (y1 - y0) * e, 1 - e * 0.95]; }
    var n = 30, i;
    for (i = 0; i < n; i++) {
      var p = at(i / n), sz = p[2];
      rect(c, p[0] - 9 * sz, p[1], 18 * sz, 120 * sz + 3, 0.06);
    }
    c.beginPath();
    for (i = 0; i <= 60; i++) { var q = at(i / 60); c.lineTo(q[0], q[1] - 38 * q[2]); }
    for (i = 60; i >= 0; i--) { var q2 = at(i / 60); c.lineTo(q2[0], q2[1]); }
    c.closePath(); c.fillStyle = g(0.04); c.fill();
    c.beginPath();
    for (i = 0; i <= 60; i++) { var q3 = at(i / 60); c.lineTo(q3[0], q3[1] - 38 * q3[2] - 14 * q3[2]); }
    c.lineWidth = 4; c.strokeStyle = g(0.9); c.stroke();
    for (i = 0; i < 40; i++) { var q4 = at(i / 40); line(c, q4[0], q4[1] - 38 * q4[2], q4[0], q4[1] - 52 * q4[2], 2, 0.05); }
    /* a van on it, small, headed out */
    var vp = at(0.3), vs = vp[2] * 1.4, vb = vp[1] - 38 * vp[2];
    fillPoly(c, [[vp[0] - 50 * vs, vb], [vp[0] + 50 * vs, vb], [vp[0] + 50 * vs, vb - 30 * vs], [vp[0] + 34 * vs, vb - 44 * vs], [vp[0] - 50 * vs, vb - 44 * vs]], 0.03);
    /* pelicans */
    [[260, 200, 30], [320, 230, 24], [210, 250, 22]].forEach(function (b) { ink(c, [[b[0] - b[2], b[1] - 6], [b[0] - b[2] * 0.4, b[1] - b[2] * 0.25], [b[0], b[1]], [b[0] + b[2] * 0.4, b[1] - b[2] * 0.25], [b[0] + b[2], b[1] - 6]], 4, r, 1, 0.05); });
    vignette(c, 0.35);
  }

  /* A storefront in a strip: plate windows, paper inside them, a name in marker on the door. */
  function storefront(c, r, x) {
    vgrad(c, 0, 0, DW, 140, 0.95, 0.8);
    rect(c, 0, 90, DW, 560, 0.62);
    rect(c, 0, 90, DW, 100, 0.8);
    /* the old sign, painted out, ghost letters */
    c.save(); c.globalAlpha = 0.09; marker(c, 'CLEANERS', 600, 170, 70, { align: 'center', maxWidth: 700, treatment: 'block', seed: 'ghost' }); c.restore();
    rect(c, 0, 190, DW, 12, 0.3);
    /* windows */
    [[60, 230, 400, 360], [740, 230, 400, 360]].forEach(function (w, i) {
      rect(c, w[0] - 10, w[1] - 10, w[2] + 20, w[3] + 20, 0.2);
      rect(c, w[0], w[1], w[2], w[3], 0.22);
      c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.22;
      fillPoly(c, [[w[0] + 40, w[1]], [w[0] + 130, w[1]], [w[0] + 30, w[1] + w[3]], [w[0] - 60, w[1] + w[3]]].map(function (p) { return [Math.max(w[0], p[0]), p[1]]; }), 1);
      fillPoly(c, [[w[0] + 200, w[1]], [w[0] + 240, w[1]], [w[0] + 140, w[1] + w[3]], [w[0] + 100, w[1] + w[3]]], 1);
      c.restore();
      /* paper taped up inside */
      var px = w[0] + (i ? 230 : 40), py = w[1] + 60;
      turned(c, px + 70, py + 90, i ? 0.05 : -0.04, function () {
        rect(c, -70, -90, 140, 180, 0.96);
        if (i === 0) { marker(c, 'ALL', 0, -36, 40, { align: 'center', maxWidth: 120, seed: 'all' }); marker(c, 'AGES', 0, 14, 40, { align: 'center', maxWidth: 120, seed: 'ages' }); scribble(c, r, -50, 50, 100, 2, 16, 2.4); }
        else { marker(c, 'SHOW', 0, -30, 38, { align: 'center', maxWidth: 120, seed: 'show' }); marker(c, 'SAT', 0, 20, 38, { align: 'center', maxWidth: 120, seed: 'sat' }); scribble(c, r, -50, 54, 100, 2, 16, 2.4); }
      });
    });
    /* the door */
    rect(c, 500, 220, 200, 430, 0.15); rect(c, 516, 236, 168, 300, 0.3);
    rect(c, 530, 270, 140, 70, 0.95);
    marker(c, x.newRoom || x.room || 'OPEN', 600, 318, 30, { align: 'center', maxWidth: 128, seed: 'doorname' });
    rect(c, 660, 420, 10, 50, 0.85);
    if (gear(c, 'front', 600, 654, 1120, 560, { bright: 1.05 })) {
      turned(c, 600, 430, -0.03, function () { rect(c, -110, -50, 220, 100, 0.96); marker(c, x.newRoom || x.room || 'OPEN', 0, 14, 30, { align: 'center', maxWidth: 196, seed: 'doorname' }); });
      tape(c, r, 500, 382, 50, -0.5); tape(c, r, 700, 378, 50, 0.5);
    }
    /* the sidewalk and a parking block */
    rect(c, 0, 650, DW, 100, 0.78); line(c, 0, 650, DW, 650, 4, 0.3);
    for (var sx = 100; sx < DW; sx += 260) line(c, sx, 650, sx - 40, 750, 3, 0.5);
    rect(c, 820, 700, 260, 40, 0.6); rect(c, 820, 700, 260, 8, 0.85);
    /* a broom by the door */
    line(c, 470, 330, 440, 640, 6, 0.1); fillPoly(c, [[420, 600], [462, 600], [472, 660], [410, 660]], 0.15);
    blurred(c, 14, function () { rect(c, 0, 640, DW, 14, 0.2); });
    vignette(c, 0.3);
  }

  /* The house with a sign in the yard. */
  function forSale(c, r, x) {
    vgrad(c, 0, 0, DW, 400, 0.92, 0.8);
    oak(c, r, 160, 60, 0.8);
    if (!gear(c, 'house', 380, 462, 700, 420)) ranch(c, r, 80, 450, 560, 0.55, false);
    /* the carport off the side, empty */
    fillPoly(c, [[640, 290], [1000, 282], [1000, 306], [640, 314]], 0.1);
    rect(c, 640, 314, 360, 136, 0.3); rect(c, 650, 314, 12, 136, 0.08); rect(c, 984, 306, 12, 144, 0.08);
    rect(c, 0, 450, DW, 300, 0.62);
    for (var gl = 0; gl < 220; gl++) { var gx = r.range(0, DW), gy = r.range(460, 750); line(c, gx, gy, gx + r.range(-6, 6), gy - r.range(8, 24), 2, r.chance(0.5) ? 0.4 : 0.8); }
    fillPoly(c, [[290, 450], [400, 450], [440, 750], [220, 750]], 0.82);
    /* the sign, close, in the yard */
    var sx = 760, sy = 300;
    blurred(c, 8, function () { ell(c, sx + 150, 740, 200, 14, 0, 0.25); });
    rect(c, sx - 10, sy, 20, 460, 0.04); rect(c, sx - 10, sy, 360, 16, 0.04);
    line(c, sx + 70, sy + 16, sx + 70, sy + 56, 3, 0.1); line(c, sx + 290, sy + 16, sx + 290, sy + 56, 3, 0.1);
    rect(c, sx + 26, sy + 56, 320, 220, 0.98);
    c.lineWidth = 8; c.strokeStyle = g(0.04); c.strokeRect(sx + 26, sy + 56, 320, 220);
    marker(c, 'FOR', sx + 186, sy + 124, 58, { align: 'center', maxWidth: 260, treatment: 'block', seed: 'for' });
    marker(c, 'SALE', sx + 186, sy + 198, 68, { align: 'center', maxWidth: 280, treatment: 'block', seed: 'sale' });
    typed(c, '555-0142', sx + 186, sy + 252, 26, 0, 'center');
    turned(c, sx + 190, sy + 316, -0.08, function () { rect(c, -130, -30, 260, 60, 0.04); marker(c, 'SOLD', 0, 20, 50, { align: 'center', maxWidth: 220, ink: '#fff', treatment: 'block', seed: 'sold' }); });
    vignette(c, 0.35);
  }

  /* Night: a patrol car at the curb, the light bar throwing beams across the house. */
  function policeLights(c, r, x) {
    rect(c, 0, 0, DW, DH, 0.04);
    /* the house, lit by the bar */
    ranch(c, r, 180, 460, 760, 0.42, true);
    rect(c, 500, 300, 90, 160, 0.95);
    rect(c, 0, 460, DW, 120, 0.3);
    rect(c, 0, 580, DW, 170, 0.5);
    for (var sx = 0; sx < DW; sx += 160) line(c, sx, 580, sx - 30, 750, 3, 0.35);
    /* people on the lawn and at the door: photos, printed black against the light */
    var pp = picks('POLICE_LIGHTS', x), lawn = pp.lawn || [], cops = pp.cops || [];
    [[lawn[0], 150, 520, 230], [lawn[1], 250, 530, 250], [lawn[2], 545, 460, 175], [cops[0], 705, 476, 190], [cops[1], 790, 482, 200]].forEach(function (p) {
      if (p[0]) paste(c, p[0], { x: p[1], y: p[2], h: p[3], border: 0, bright: 0.12, contrast: 1.2, still: true });   /* the car and the beams are in front */
    });
    beam(c, 600, 344, -0.3, 0.3, 200, 0.55);
    /* the beams */
    var lx = 620, ly = 480;
    for (var b = 0; b < 11; b++) beam(c, lx, ly, -Math.PI - 0.15 + b * (Math.PI + 0.3) / 10 + r.range(-0.05, 0.05), 0.13, 1100, b % 2 ? 0.42 : 0.2);
    glow(c, lx, ly, 300, 0.55);
    /* the car, its light bar */
    car(c, 260, 720, 720, 0.02);
    rrect(c, 520, 468, 200, 24, 7); c.fillStyle = g(1); c.fill();
    rect(c, 618, 468, 4, 24, 0.3);
    line(c, 270, 640, 970, 634, 3, 0.35);
    vignette(c, 0.5);
  }

  /* A window with a hole through it, the cracks running out to the frame, glass on the sill. */
  function brokenGlass(c, r, x) {
    rect(c, 0, 0, DW, DH, 1);
    var frame = [[150, 40], [1050, 40], [1050, 620], [150, 620]];
    inkShape(c, frame, 8, r, 1);
    var pane = [[200, 90], [1000, 90], [1000, 570], [200, 570]];
    inkShape(c, pane, 5, r, 1);
    hatch(c, polyClip(c, frame), [150, 40, 900, 50], 0.05, 7, 2, r);
    /* night through the glass, curtains */
    hatch(c, polyClip(c, pane), [200, 90, 800, 480], 0.95, 16, 1.4, r, 0.2);
    var cur = [[200, 90], [320, 90], [290, 330], [330, 570], [200, 570]];
    inkShape(c, cur, 4, r, 1); for (var f = 0; f < 4; f++) ink(c, [[220 + f * 25, 92], [214 + f * 22, 330], [228 + f * 24, 568]], 2.4, r);
    /* the hole */
    var hx = 640, hy = 300, hole = [];
    for (var k = 0; k < 14; k++) { var a = k * TAU / 14, rad = r.range(50, 110); hole.push([hx + Math.cos(a) * rad, hy + Math.sin(a) * rad * 0.9]); }
    inkShape(c, hole, 5, r, 0);
    /* cracks: spokes, then rings between them */
    var spokes = [];
    for (k = 0; k < 13; k++) {
      var aa = k * TAU / 13 + r.range(-0.15, 0.15), pts = [[hx + Math.cos(aa) * 80, hy + Math.sin(aa) * 72]], len = 80;
      while (len < 700) { len += r.range(40, 90); aa += r.range(-0.12, 0.12); pts.push([hx + Math.cos(aa) * len, hy + Math.sin(aa) * len * 0.9]); }
      c.save(); poly(c, pane); c.clip(); ink(c, pts, r.range(2, 3.5), r, 1); c.restore();
      spokes.push(pts);
    }
    c.save(); poly(c, pane); c.clip();
    for (var ring = 1; ring < 5; ring++) for (k = 0; k < spokes.length; k++) {
      var s0 = spokes[k], s1 = spokes[(k + 1) % spokes.length], j = Math.min(ring * 2, s0.length - 1, s1.length - 1);
      if (r.chance(0.7)) ink(c, [s0[j], [(s0[j][0] + s1[j][0]) / 2 + r.range(-10, 10), (s0[j][1] + s1[j][1]) / 2 + r.range(-10, 10)], s1[j]], 1.8, r, 1);
    }
    c.restore();
    /* the sill and the floor, glass everywhere, the brick */
    var sill = [[110, 620], [1090, 620], [1110, 660], [90, 660]];
    inkShape(c, sill, 5, r, 1); hatch(c, polyClip(c, sill), boxOf(sill), 0.05, 6, 1.8, r);
    for (k = 0; k < 26; k++) {
      var sx = r.range(80, 1120), sy = r.range(670, 740), ss = r.range(10, 34), sa = r.range(0, TAU);
      inkShape(c, [[sx, sy], [sx + Math.cos(sa) * ss, sy + Math.sin(sa) * ss * 0.4], [sx + Math.cos(sa + 1.9) * ss * 0.6, sy + Math.sin(sa + 1.9) * ss * 0.3]], 2.2, r, 1);
    }
    var brick = [[700, 700], [880, 680], [900, 730], [720, 752]];
    inkShape(c, brick, 5, r, 0.1);
    fillPoly(c, [[700, 700], [880, 680], [900, 690], [716, 712]], 0.5);
  }

  /* A map drawn on the back of a flyer: the coast, the interstate, the towns, the route. */
  function mapRoute(c, r, x) {
    rect(c, 0, 0, DW, DH, 1);
    /* the coast and the water */
    var coast = [];
    for (var i = 0; i <= 24; i++) coast.push([-20 + i * 52, 560 + Math.sin(i * 0.9) * 26 + r.range(-12, 12) + (i > 10 && i < 15 ? 60 : 0)]);
    var water = coast.concat([[1220, 780], [-20, 780]]);
    hatch(c, polyClip(c, water), [-20, 520, 1240, 260], 0.05, 12, 2, r);
    ink(c, coast, 5, r, 2);
    marker(c, 'GULF', 1000, 700, 40, { seed: 'gulf' });
    /* the interstate */
    var road = [[-20, 380], [300, 370], [600, 350], [900, 330], [1220, 300]];
    ink(c, road, 6, r, 1); ink(c, road.map(function (p) { return [p[0], p[1] + 16]; }), 6, r, 1);
    var sh = [[150, 330], [200, 330], [206, 360], [175, 376], [144, 360]];
    inkShape(c, sh, 4, r, 1); marker(c, '10', 175, 362, 22, { align: 'center', maxWidth: 40, seed: 'i10' });
    /* side roads */
    ink(c, [[420, 120], [430, 362], [470, 560]], 4, r, 2); ink(c, [[880, 80], [860, 340], [900, 520]], 4, r, 2);
    /* the towns */
    var a = { x: 300, y: 378, name: x.town || 'HERE' }, b = { x: 960, y: 326, name: x.bigCity || x.peerTown || x.touringHome || 'THERE' };
    if (x.touringHome) b.name = x.touringHome;
    if (x.peerTown) b.name = x.peerTown;
    [a, b].forEach(function (t, k) {
      ell(c, t.x, t.y + 8, 26, 26, 0, 0); ell(c, t.x, t.y + 8, 14, 14, 0, 1);
      marker(c, t.name, t.x, t.y - 50, 44, { align: 'center', maxWidth: 380, seed: 'town' + k });
    });
    /* the route, dashed, an arrow */
    var route = [[a.x + 30, a.y - 10], [500, 280], [760, 250], [b.x - 40, b.y - 10]], d;
    function bez(t) { var u = 1 - t; return [u * u * u * route[0][0] + 3 * u * u * t * route[1][0] + 3 * u * t * t * route[2][0] + t * t * t * route[3][0], u * u * u * route[0][1] + 3 * u * u * t * route[1][1] + 3 * u * t * t * route[2][1] + t * t * t * route[3][1]]; }
    for (d = 0; d < 26; d++) ink(c, [bez(d / 26), bez((d + 0.55) / 26)], 6, r, 1);
    ink(c, [[b.x - 80, b.y - 40], [b.x - 40, b.y - 10], [b.x - 86, b.y + 4]], 7, r, 1);
    /* a north arrow, a van, the words */
    ink(c, [[90, 210], [90, 90]], 5, r, 1); ink(c, [[70, 120], [90, 86], [110, 120]], 5, r, 1); marker(c, 'N', 76, 250, 34, { seed: 'n' });
    var vx = 640, vy = 200;
    inkShape(c, [[vx - 50, vy], [vx + 40, vy], [vx + 56, vy + 18], [vx + 56, vy + 40], [vx - 50, vy + 40]], 4, r, 1);
    ell(c, vx - 26, vy + 42, 11, 11, 0, 0); ell(c, vx + 32, vy + 42, 11, 11, 0, 0);
    [[1085, 205, 0.07], [210, 720, -0.06]].forEach(function (q) {   /* clear of the far town's name */
      if (gear(c, 'snaps', q[0], q[1], 250, 170, { rot: q[2], border: 6 })) { tape(c, r, q[0] - 80, q[1] - 165, 60, -0.4); tape(c, r, q[0] + 80, q[1] - 170, 60, 0.4); }
    });
    marker(c, 'GO THERE!!', 600, 470, 50, { align: 'center', maxWidth: 420, seed: 'gothere' });
    typed(c, '* gas in ' + (x.town ? 'town' : 'the van') + ' first', 620, 520, 20, 0);
  }

  /* A postcard: GREETINGS FROM, the city in fat block letters over a beach. */
  function postcardFront(c, r, x) {
    rect(c, 0, 0, DW, DH, 1);
    var card = [[40, 40], [1160, 40], [1160, 710], [40, 710]];
    inkShape(c, card, 4, r, 1);
    var pic = [[80, 80], [1120, 80], [1120, 670], [80, 670]];
    /* sky with rays, sea, sand, palms */
    c.save(); poly(c, pic); c.clip();
    for (var k = 0; k < 18; k++) { var a = Math.PI + k * Math.PI / 17; ink(c, [[900, 420], [900 + Math.cos(a) * 900, 420 + Math.sin(a) * 900]], 3, r, 1); }
    ell(c, 900, 420, 90, 90, 0, 1); ink(c, [[810, 420], [990, 420]], 3, r);
    var sea = [[80, 420], [1120, 420], [1120, 540], [80, 560]];
    hatch(c, polyClip(c, sea), boxOf(sea), 0.02, 9, 2, r);
    var sand = [[80, 560], [1120, 540], [1120, 670], [80, 670]];
    for (var dt = 0; dt < 300; dt++) ell(c, r.range(80, 1120), r.range(560, 670), 1.6, 1.6, 0, 0);
    [[150, 670, 1], [1060, 675, -1]].forEach(function (p) {
      var tx = p[0], ty = p[1], top = [tx - p[2] * 30, ty - 230];
      inkShape(c, [[tx - 16, ty], [tx + 16, ty], [top[0] + 8, top[1]], [top[0] - 8, top[1]]], 4, r, 1);
      for (var bk = 1; bk < 12; bk++) { var bt = bk / 12, bxx = tx + (top[0] - tx) * bt; ink(c, [[bxx - 14 + bt * 6, ty - 230 * bt], [bxx + 14 - bt * 6, ty - 230 * bt + 6]], 2.4, r); }
      for (var f = 0; f < 7; f++) {
        var fa = -Math.PI + f * Math.PI / 6 + 0.1, ex = top[0] + Math.cos(fa) * 150, ey = top[1] + Math.sin(fa) * 60 + 50, mx = (top[0] + ex) / 2, my = Math.min(top[1], ey) - 30;
        var leaf = [top, [mx, my - 14], [ex, ey], [mx, my + 16]];
        inkShape(c, leaf, 3, r, 0.05);
      }
      ell(c, top[0] + 10, top[1] + 10, 12, 12, 0, 0); ell(c, top[0] - 12, top[1] + 14, 12, 12, 0, 0);
    });
    c.restore();
    inkShape(c, pic, 4, r);
    /* the words */
    marker(c, 'GREETINGS FROM', 600, 170, 46, { align: 'center', maxWidth: 700, seed: 'greet' });
    var name = upper(x.bigCity || x.town || 'THE COAST'), sz = Math.min(170, 1300 / Math.max(4, name.length));
    marker(c, name, 606, 368, sz, { align: 'center', maxWidth: 820, treatment: 'block', ink: '#888', seed: 'pcshadow' });
    marker(c, name, 600, 360, sz, { align: 'center', maxWidth: 820, treatment: 'block', seed: 'pc' });
  }

  /* ---------------- more show pictures ---------------- */

  /* Someone stood on the ground: feet at (cx, footY), H the height of a whole person there. A cut cut off above the
   * feet (waist, close) is sized so the head lands where a whole one's would and its bottom goes to o.bottom (which
   * something in front of it must hide). o.face 'left' / 'right' turns them that way; o.maxW keeps a group in. */
  /* A vehicle photo (van, car) standing on the ground: bottom centre at (cx, groundY), w wide, its nose turned to
   * `nose` ('left' | 'right'). false when there is none or it is not in yet (the caller draws its own then). */
  function vehicle(c, id, cx, groundY, w, nose, o) {
    var k = cutById(id); o = o || {};
    if (!k || !isIn(id)) return false;
    var flip = (nose === 'left' && k.facing === 'right') || (nose === 'right' && k.facing === 'left');
    return paste(c, id, { x: cx, y: groundY, w: w, rot: o.rot || 0, flip: flip, border: o.border == null ? 4 : o.border,
      bright: o.bright || 1, contrast: o.contrast || 1.12, still: true });
  }

  /* People in a night scene are lit (a porch light, a headlight): their shadows lifted before the copier, which turns
   * anything under about a quarter grey to solid toner, so they read as people and not as cut-out outlines. */
  var NIGHT_LIFT = 0.72;
  function personAt(c, id, cx, footY, H, o) {
    var k = cutById(id); o = o || {};
    if (!k) return false;
    var whole = k.frame === 'full' || k.frame === 'strip', top = footY - H, bottom = whole ? footY : (o.bottom || footY);
    var h = whole ? H * (k.frame === 'strip' ? 0.95 : 1) : bottom - top;
    if (o.maxW && h * k.w / k.h > o.maxW) h = o.maxW * k.h / k.w;
    var flip = (o.face === 'right' && k.facing === 'left') || (o.face === 'left' && k.facing === 'right');
    /* at night each photo is brightened by what it needs: a dark print more, a pale one a little less */
    var lift = o.night ? Math.max(0.8, Math.min(2.2, 0.45 / (k.tone || 0.45))) : 1;
    return paste(c, id, { x: cx, y: bottom, h: h, rot: o.rot || 0, flip: flip, border: o.border == null ? 4 : o.border,
      bright: (o.bright || 1) * lift, contrast: o.night ? NIGHT_LIFT : (o.contrast || 1.15), kind: o.kind, still: o.still, clip: o.clip });
  }

  /* Rain: a curtain pouring off the carport's roof edge in front of everyone, rain slanting across the whole frame,
   * splashes and puddles. */
  function rain(c, r) {
    var i, j;
    c.save(); c.globalAlpha = 0.1; rect(c, 0, 0, DW, DH, 0.55); c.restore();
    /* puddles on the lawn and the drive, the window in them */
    [[200, 690, 150, 18], [90, 640, 70, 10], [330, 730, 110, 14], [620, 726, 160, 16], [960, 712, 130, 12]].forEach(function (p) {
      ell(c, p[0], p[1], p[2], p[3], 0, 0.5); ell(c, p[0] + p[2] * 0.2, p[1], p[2] * 0.35, p[3] * 0.5, 0, 0.85);
    });
    c.save(); c.globalCompositeOperation = 'lighter'; c.lineCap = 'round';
    /* the sheet off the roof edge, all the way down past the bottom of the frame */
    for (i = 0; i < 95; i++) {
      var t = r.next(), x0 = 440 + 760 * t + r.range(-3, 3), y = 266 - 18 * t + r.range(0, 8), lean = r.range(0.02, 0.06);
      c.lineWidth = r.range(1.2, 3);
      while (y < DH) {
        var len = r.range(40, 170);
        c.strokeStyle = 'rgba(255,255,255,' + r.range(0.1, 0.26).toFixed(2) + ')';
        c.beginPath(); c.moveTo(x0, y); c.lineTo(x0 + len * lean, y + len); c.stroke();
        x0 += (len + 12) * lean; y += len + r.range(4, 24);
      }
    }
    /* the spout off the corner, by the post */
    for (j = 0; j < 7; j++) line(c, 452 + j * 2, 268, 466 + j * 3, DH, 3, 0.28);
    /* rain across everything, slanting */
    for (i = 0; i < 1300; i++) {
      var rx = r.range(-60, DW), ry = r.range(-40, DH), rl = r.range(26, 70);
      c.strokeStyle = 'rgba(255,255,255,' + r.range(0.25, 0.55).toFixed(2) + ')'; c.lineWidth = r.range(1.2, 2.6);
      c.beginPath(); c.moveTo(rx, ry); c.lineTo(rx + rl * 0.18, ry + rl); c.stroke();
    }
    /* splashes along the drip line and the ground */
    for (i = 0; i < 90; i++) {
      var sx = r.range(380, 1200), sy = r.range(705, 750);
      ell(c, sx, sy, r.range(6, 14), r.range(2, 4), 0, 0.35);
    }
    c.restore();
    /* dark streaks over the lit carport, where light ones disappear */
    for (i = 0; i < 110; i++) {
      var dx = r.range(470, 1170), dy = r.range(270, 700), dl = r.range(30, 80);
      line(c, dx, dy, dx + dl * 0.06, dy + dl, r.range(1, 2), 0.35);
    }
  }

  /* Night, out front of a house show: the line down the sidewalk, getting smaller down the block, the porch light, the
   * door open. The street runs off to the left; the house is on the right. Drawn in one-point perspective. */
  function sidewalkLine(c, r, x) {
    var VX = 150, VY = 400, i, f;
    function P(X, ff, Y) { return [VX + X * ff, VY + (400 - (Y || 0)) * ff]; }
    function wall(X, f0, f1, Y0, Y1, v) { fillPoly(c, [P(X, f0, Y0), P(X, f1, Y0), P(X, f1, Y1), P(X, f0, Y1)], v); }
    function ground(X0, X1, f0, f1, v) { fillPoly(c, [P(X0, f0), P(X1, f0), P(X1, f1), P(X0, f1)], v); }
    rect(c, 0, 0, DW, DH, 0.04);
    blurred(c, 30, function () { ell(c, VX + 80, VY - 30, 420, 80, 0, 0.13); });
    /* across the street: trees, a dark house, one window up */
    oak(c, r, 60, 150, 0.7);
    wall(-500, 0.3, 0.05, 0, 420, 0.09); wall(-500, 0.2, 0.16, 140, 300, 0.6);
    /* the street, the curb, the sidewalk, the yards */
    ground(-3000, 360, 1.6, 0.005, 0.1);
    for (i = 1; i < 18; i++) { f = 1 / (0.7 + i * 0.6); ground(-330, -300, f, f * 0.86, 0.45); }
    ground(360, 390, 1.6, 0.005, 0.62);
    ground(390, 900, 1.6, 0.005, 0.5);
    for (i = 0; i < 22; i++) { f = 1 / (0.6 + i * 0.42); line(c, P(390, f)[0], P(390, f)[1], P(900, f)[0], P(900, f)[1], 2.5 * f + 0.5, 0.24); }
    ground(900, 3000, 1.6, 0.005, 0.15);
    for (i = 0; i < 160; i++) {
      f = r.range(0.08, 1.2); var gp = P(r.range(905, 1045), f);
      line(c, gp[0], gp[1], gp[0] + r.range(-3, 3), gp[1] - r.range(6, 20) * f, 2, 0.26);
    }
    /* down the block: more houses, a window lit here and there */
    [[0.5, 0.33, 0.17], [0.29, 0.19, 0.13], [0.17, 0.11, 0.1]].forEach(function (h, k) {
      wall(1120, h[0], h[1], 0, 400, h[2]);
      fillPoly(c, [P(1120, h[0], 400), P(1120, h[1], 400), P(1360, h[1], 560), P(1360, h[0], 560)], 0.03);
      if (k !== 1) wall(1120, h[0] - (h[0] - h[1]) * 0.35, h[0] - (h[0] - h[1]) * 0.6, 160, 320, 0.75);
    });
    oak(c, r, P(1000, 0.4, 0)[0] + 20, 250, 0.45);
    /* the streetlights on the curb, and the light they leave on the sidewalk */
    [0.47, 0.21].forEach(function (sf) {
      var b = P(345, sf, 0), t = P(345, sf, 900), a = P(470, sf, 900);
      line(c, b[0], b[1], t[0], t[1], 9 * sf + 2, 0.34); line(c, t[0], t[1], a[0], a[1], 7 * sf + 2, 0.34);
      ell(c, a[0], a[1] + 6 * sf, 26 * sf + 4, 9 * sf + 3, 0, 0.95);
      glow(c, a[0], a[1] + 10 * sf, 260 * sf + 60, 0.35);
      var pool = P(560, sf, 0);
      blurred(c, 20, function () { c.save(); c.globalCompositeOperation = 'lighter'; ell(c, pool[0], pool[1], 300 * sf, 70 * sf, 0, 0.2); c.restore(); });
    });
    /* the house: siding running off down the block, the roof, a window, the door open, the porch light */
    wall(1050, 1.4, 0.56, 0, 470, 0.46);
    for (var Y = 24; Y < 470; Y += 24) line(c, P(1050, 1.4, Y)[0], P(1050, 1.4, Y)[1], P(1050, 0.56, Y)[0], P(1050, 0.56, Y)[1], 2, 0.2);
    fillPoly(c, [P(1050, 1.4, 470), P(1050, 0.56, 470), P(1300, 0.56, 650), P(1300, 1.4, 650)], 0.05);
    line(c, P(1050, 1.4, 470)[0], P(1050, 1.4, 470)[1], P(1050, 0.56, 470)[0], P(1050, 0.56, 470)[1], 5, 0.5);
    wall(1050, 0.66, 0.6, 150, 330, 0.08); wall(1050, 0.655, 0.605, 160, 320, 0.8);
    wall(1050, 1.0, 0.89, 140, 370, 0.08); wall(1050, 0.99, 0.9, 150, 360, 0.92);
    for (Y = 160; Y < 360; Y += 14) line(c, P(1050, 0.99, Y)[0], P(1050, 0.99, Y)[1], P(1050, 0.9, Y)[0], P(1050, 0.9, Y)[1], 3, 0.55);
    wall(1050, 0.815, 0.705, 0, 316, 0.06);
    wall(1050, 0.8, 0.72, 0, 300, 1);
    wall(1050, 0.8, 0.78, 0, 300, 0.45);   /* the screen door, swung open against the wall */
    /* the porch step and the walk out to the sidewalk, lit from the door */
    fillPoly(c, [P(960, 0.84, 30), P(1050, 0.84, 30), P(1050, 0.68, 30), P(960, 0.68, 30)], 0.6);
    wall(960, 0.84, 0.68, 0, 30, 0.3);
    ground(900, 960, 0.79, 0.73, 0.55);
    c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.22;
    fillPoly(c, [P(1050, 0.8), P(1050, 0.72), P(640, 0.69), P(640, 0.86)], 1);
    c.restore();
    var lamp = P(1050, 0.86, 340);
    rect(c, lamp[0] - 9, lamp[1] - 14, 18, 26, 0.1); ell(c, lamp[0] - 3, lamp[1] + 18, 13, 16, 0, 1);
    /* the line: a few people, a bunch together, smaller and smaller down the block, all facing the door */
    var pk = picks('SIDEWALK_LINE', x), far = pk.far || [], grp = (pk.group || [])[0], near = (pk.near || [])[0];
    var order = [far[0], far[1], grp, far[2], far[3]], fs = [0.14, 0.2, 0.28, 0.39, 0.54];
    order.forEach(function (id, k) {
      if (!id) return;
      var ff = fs[k], p = P(r.range(600, 680), ff);
      personAt(c, id, p[0], p[1], 620 * ff, { face: 'right', maxW: 420 * ff + 40, bright: 1.05 + ff * 0.35, night: true, border: Math.max(2, 5 * ff + 1),
        rot: r.range(-0.03, 0.03) });
    });
    if (near) { var np = P(650, 0.78); personAt(c, near, np[0], np[1], 490, { face: 'right', maxW: 380, bright: 1.45, night: true, border: 5, rot: r.range(-0.02, 0.03) }); }
    glow(c, lamp[0] - 3, lamp[1] + 18, 380, 0.6);
    glow(c, P(1050, 0.76, 120)[0], P(1050, 0.76, 120)[1], 220, 0.25);
    vignette(c, 0.45);
  }

  /* The band on the floor, a kid going over the front of the crowd on everyone's hands, shot from in the crowd. */
  function stageDive(c, r, x) {
    var name = bandName(x) || 'THE BAND', cast = bandCast(x, name), have = ready(bandIds(cast)), pk = picks('STAGE_DIVE', x);
    rect(c, 0, 0, DW, DH, 0.55);
    for (var py = 30; py < 470; py += 22) for (var px = 640; px < 1200; px += 22) ell(c, px, py, 3, 3, 0, 0.3);
    fillPoly(c, [[90, 70], [380, 62], [388, 290], [84, 298]], 0.95);
    for (var fl = 0; fl < 5; fl++) line(c, 120 + fl * 58, 70, 112 + fl * 60, 292, 4, 0.75);
    bulbs(c, -20, 16, 1220, 24, 46, 13, 8);
    amp(c, 30, 250, 210, 240, r, name.split(' ')[0]); amp(c, 960, 200, 210, 290, r);
    rect(c, 0, 470, DW, 280, 0.66);
    /* the drummer behind the kick off to one side (the diver goes over the other), the front line out at the edges */
    var side = r.chance(0.5) ? -1 : 1, kx = 600 - side * 170, dvx = 600 + side * 300;
    var dk = cutById(cast.drums);
    if (have) paste(c, cast.drums, { x: kx, y: 480, h: dk && dk.w > dk.h ? 250 : 300, rot: r.range(-0.03, 0.03), border: 4, kind: 'drums', still: true });
    kick(c, kx, 432, 80, name);
    if (have) {
      /* the front line leaves a gap where the diver goes over (mirrored when the diver is on the left) */
      var n = cast.front.length, xs = (n === 3 ? [110, 650, 1110] : [120, 680]).map(function (v) { return side > 0 ? v : DW - v; });
      if (side < 0) xs.reverse();
      cast.front.forEach(function (id, i) {
        var k = cutById(id), full = k.frame === 'full';
        paste(c, id, { x: xs[i] + r.range(-15, 15), y: full ? 640 : 600, h: full ? 470 : 360, rot: r.range(-0.04, 0.04), border: 4,
          flip: (i === 0 && k.facing === 'left') || (i > 0 && k.facing === 'right'), kind: 'band' });
      });
    }
    glow(c, 600, 260, 700, 0.25);
    /* the crowd: the far side of it, then the ones under the diver, the diver, and the backs nearest the lens */
    /* backlit by the stage: the far side of the crowd and the ones holding the diver up print dark */
    backs(c, r, 600, 478, 1300, 110, pk.far, 0.5);
    var pit = pk.pit || [];
    [[dvx - 150, 430, -0.05], [dvx + 150, 440, 0.05]].forEach(function (q, i) {
      if (pit[i]) paste(c, pit[i], { x: q[0], y: q[1] + 290, h: 290, rot: q[2], border: 4, bright: 0.45, contrast: 1.3, kind: 'crowd' });
    });
    var dv = (pk.diver || [])[0], dkk = dv && cutById(dv);
    if (dkk) {
      /* low and nearly flat across the heads, so it crosses the band's legs and not their faces; lit by the stage */
      var dcx = dvx + r.range(-20, 20), dopt = { border: 7, bright: 1.25, contrast: 0.9, kind: 'crowd' };
      if (dkk.w > dkk.h * 1.1) {   /* already lying across the hands */
        dopt.h = Math.max(170, Math.min(220, 400 * dkk.h / dkk.w)); dopt.x = dcx; dopt.y = 590; dopt.rot = r.range(-0.08, 0.08);
      } else {                     /* a tall one is laid over, head first off the stage, its middle over the crowd */
        var th = -side * r.range(1.38, 1.5), L = 380, cy = 505;
        dopt.h = L; dopt.rot = th; dopt.x = dcx - L / 2 * Math.sin(th); dopt.y = cy + L / 2 * Math.cos(th);
      }
      paste(c, dv, dopt);
    }
    vignette(c, 0.4);
    backs(c, r, 600, 572, 1380, 185, pk.front, 0.85);
  }

  /* The yard of a house show at night: a car's headlights on the merch table, the porch light, people talking on the
   * grass. */
  function yardNight(c, r, x) {
    var i;
    rect(c, 0, 0, DW, DH, 0.04);
    blurred(c, 30, function () { for (i = 0; i < 3; i++) ell(c, r.range(200, DW), r.range(20, 160), r.range(160, 280), r.range(16, 30), 0, 0.12); });
    oak(c, r, 160, 150, 0.9);
    ranch(c, r, 560, 430, 600, 0.42, true);
    /* the porch light by the door */
    ell(c, 840, 300, 8, 10, 0, 1); glow(c, 840, 300, 300, 0.4);
    /* string lights from the eave to the oak */
    bulbs(c, 560, 250, 120, 300, 40, 7, 6);
    /* the grass */
    vgrad(c, 0, 430, DW, DH, 0.2, 0.32);
    for (i = 0; i < 240; i++) { var gx = r.range(0, DW), gy = r.range(440, DH); line(c, gx, gy, gx + r.range(-5, 5), gy - r.range(6, 18) * (gy / 600), 2, r.chance(0.5) ? 0.12 : 0.42); }
    /* the car, nose in, headlights on across the yard */
    if (!vehicle(c, (picks('YARD_NIGHT', x).car || [])[0], 110, 615, 440, 'right', { bright: 1.15, contrast: NIGHT_LIFT, border: 4 })) {
      car(c, -80, 600, 400, 0.42);
      line(c, -70, 542, 300, 546, 4, 0.75);   /* the porch light along its roof and side */
      line(c, 30, 474, 200, 474, 3, 0.7);
    }
    ell(c, 310, 545, 10, 14, 0, 1); glow(c, 310, 545, 130, 0.6);
    beam(c, 310, 545, 0.08, 0.42, 950, 0.38);
    /* a cooler, a folding chair */
    if (!gear(c, 'cooler', 1010, 632, 160, 100, { night: true, bright: 1.2, contrast: 0.8 })) { rect(c, 950, 560, 120, 70, 0.85); rect(c, 950, 560, 120, 16, 0.6); rect(c, 990, 552, 40, 10, 0.2); }
    gear(c, 'chair', 1150, 660, 140, 190, { night: true, bright: 1.15, contrast: 0.8 });
    /* the merch table: a sheet over it, shirts folded, records, a sign */
    var tl = 470, tr = 820, ty = 540;
    var seller = (picks('YARD_NIGHT', x).seller || [])[0];
    /* behind the table: feet well below its top so the sheet hides them from the waist down */
    if (seller) personAt(c, seller, 650, 740, 450, { bottom: 640, face: 'left', bright: 1.5, night: true, border: 4, maxW: 300, still: true });
    fillPoly(c, [[tl, ty], [tr, ty - 6], [tr + 22, ty + 22], [tl - 20, ty + 28]], 0.95);
    fillPoly(c, [[tl - 20, ty + 28], [tr + 22, ty + 22], [tr + 18, 640], [tl - 16, 646]], 0.88);
    for (i = 0; i < 6; i++) line(c, tl + 20 + i * 60, ty + 30, tl + 16 + i * 62, 640, 2, 0.75);
    line(c, tl, 646, tl - 4, 668, 5, 0.1); line(c, tr, 640, tr + 4, 664, 5, 0.1);
    [[510, 548], [568, 546], [626, 544]].forEach(function (s, k) {
      for (var j = 0; j < 3; j++) { rect(c, s[0] - 24, s[1] - j * 7, 48, 7, k === 1 ? 0.15 : 0.8 - j * 0.1); line(c, s[0] - 24, s[1] - j * 7, s[0] + 24, s[1] - j * 7, 1, 0.3); }
    });
    var mpk = picks('YARD_NIGHT', x).merch || [];
    mpk.forEach(function (id, k) { paste(c, id, { x: 700 + k * 70, y: ty + 2, h: 64, rot: r.range(-0.1, 0.1), border: 2 }); });
    turned(c, 640, 600, -0.02, function () {
      fillPoly(c, [[-80, -26], [80, -28], [82, 26], [-80, 28]], 1);
      marker(c, 'SHIRTS $10', 0, 12, 26, { align: 'center', maxWidth: 150, seed: 'shirts' });
    });
    /* people standing around talking, one on the grass */
    var pk = picks('YARD_NIGHT', x), talk = pk.talk || [], grass = (pk.grass || [])[0];
    if (talk[0]) personAt(c, talk[0], 950, 690, 450, { face: 'right', bright: 1.5, night: true, rot: r.range(-0.02, 0.02), maxW: 260 });
    if (talk[1]) personAt(c, talk[1], 1110, 705, 460, { face: 'left', bright: 1.4, night: true, rot: r.range(-0.02, 0.02), maxW: 260 });
    if (grass) personAt(c, grass, 170, 748, 240, { face: 'right', bright: 1.45, night: true, maxW: 300 });
    vignette(c, 0.45);
  }

  /* One person alone on the floor with a borrowed guitar and a mic stand, a few people sat on the rug in front. */
  function soloSet(c, r, x) {
    var i, pk = picks('SOLO_SET', x);
    /* the living room: a wall, a window, a lamp, the rug */
    rect(c, 0, 0, DW, 560, 0.6);
    for (i = 0; i < 26; i++) line(c, i * 48, 0, i * 48, 560, 2, 0.54);
    rect(c, 0, 545, DW, 16, 0.3);
    rect(c, 0, 560, DW, 190, 0.48);
    for (i = 0; i < 9; i++) line(c, 0, 580 + i * 22, DW, 580 + i * 24, 2, 0.42);
    rect(c, 820, 70, 250, 280, 0.12); rect(c, 834, 84, 222, 252, 0.05);
    for (i = 0; i < 12; i++) rect(c, 834, 88 + i * 21, 222, 7, 0.22);
    /* the floor lamp, the only light */
    line(c, 170, 160, 170, 560, 6, 0.06); line(c, 130, 562, 210, 562, 7, 0.06);
    fillPoly(c, [[120, 160], [220, 160], [200, 90], [140, 90]], 0.3); ell(c, 170, 162, 50, 8, 0, 1);
    glow(c, 170, 170, 520, 0.42);
    blurred(c, 20, function () { ell(c, 600, 640, 360, 70, 0, 0.62); });
    /* a flyer taped up, the string lights */
    turned(c, 420, 170, -0.04, function () { rect(c, -70, -90, 140, 180, 0.95); marker(c, 'TONITE', 0, -30, 30, { align: 'center', maxWidth: 120, seed: 'tonite' }); scribble(c, r, -50, 10, 100, 4, 18, 2.4); });
    bulbs(c, -20, 30, 1220, 40, 40, 11, 6);
    /* the borrowed guitar's case open on the floor, a little amp */
    if (!gear(c, 'case', 960, 640, 320, 150, { rot: 0.06 })) turned(c, 960, 590, 0.08, function () {
      c.beginPath(); c.ellipse(-70, 0, 70, 50, 0, 0, TAU); c.ellipse(60, 0, 50, 38, 0, 0, TAU); c.fillStyle = g(0.08); c.fill();
      c.beginPath(); c.ellipse(-70, 0, 58, 40, 0, 0, TAU); c.ellipse(60, 0, 40, 28, 0, 0, TAU); c.fillStyle = g(0.4); c.fill();
      rect(c, 100, -12, 150, 24, 0.08); rect(c, 104, -6, 140, 12, 0.4);
    });
    amp(c, 300, 450, 120, 120, r);
    c.beginPath(); c.moveTo(360, 568); c.bezierCurveTo(420, 640, 520, 610, 590, 590); c.lineWidth = 5; c.strokeStyle = g(0.05); c.stroke();
    /* the player, the mic stand in front */
    var pl = (pk.player || [])[0], k = pl && cutById(pl);
    var cx = 640 + r.range(-20, 20), top = 150, full = k && k.frame === 'full', h = full ? 450 : 470;
    if (k) {
      if (k.w / k.h > 0.75) h = Math.min(h, 520 * k.h / k.w);   /* a wide one: keep it from swallowing the room */
      paste(c, pl, { x: cx, y: full ? 600 : top + h, h: h, rot: r.range(-0.03, 0.03), border: 5, bright: 1.02, kind: 'band' });
    }
    front(c, r, function (c) { micStand(c, cx - 110, 600, 300, cx - 60, 260); }, [cx - 160, 240, cx - 20, 615]);
    /* the people on the floor, from behind, and one sat by the wall watching */
    var side = (pk.side || [])[0];
    if (side) personAt(c, side, 1080, 640, 330, { face: 'left', bright: 0.95, maxW: 300 });
    backs(c, r, 600, 560, 1250, 150, pk.floor, 0.95, 'person');   /* sat listening */
    vignette(c, 0.5);
  }

  /* After the show: the room half lit, the folding chairs stacked, a cable coiled on the floor, cans, someone sweeping
   * up, someone carrying out. */
  function stackChairs(c, r, x) {
    var i, j;
    /* a cinderblock room, one bare bulb still on over the left, the far end dark */
    rect(c, 0, 0, DW, 520, 0.36);
    for (i = 0; i < 9; i++) line(c, 0, 60 + i * 52, DW, 60 + i * 52, 2, 0.26);
    for (i = 0; i < 9; i++) for (j = 0; j < 13; j++) line(c, j * 100 + (i % 2) * 50, 60 + i * 52, j * 100 + (i % 2) * 50, 112 + i * 52, 2, 0.26);
    rect(c, 0, 515, DW, 12, 0.15);
    vgrad(c, 0, 527, DW, DH, 0.42, 0.58);
    blurred(c, 16, function () { ell(c, 720, 660, 160, 30, 0.1, 0.34); ell(c, 300, 700, 90, 20, 0, 0.36); });
    line(c, 420, 0, 420, 110, 3, 0.1); rect(c, 412, 104, 16, 14, 0.1); ell(c, 420, 132, 15, 19, 0, 1);
    glow(c, 420, 160, 620, 0.42);
    /* folding chairs, folded flat and leaned on the wall in a row */
    for (i = 0; i < 8; i++) {
      turned(c, 70 + i * 30, 522, -0.13 + r.range(-0.02, 0.02), function () {
        line(c, -22, 0, -20, -300, 6, 0.82); line(c, 22, 0, 20, -300, 6, 0.82);
        rect(c, -24, -300, 48, 62, 0.78); rect(c, -24, -300, 48, 6, 0.3);
        rect(c, -20, -200, 40, 80, 0.7); line(c, -20, -120, 20, -120, 3, 0.3);
        line(c, -22, -40, 22, -40, 4, 0.75);
      });
    }
    /* and a stack of open ones, nested, from the side */
    for (i = 0; i < 7; i++) {
      var sx = 470 + i * 4, sy = 610 - i * 16;
      line(c, sx, sy, sx + 10, sy - 110, 5, 0.85);                /* front leg */
      line(c, sx + 96, sy, sx + 88, sy - 250, 5, 0.85);           /* back leg, up to the backrest */
      rect(c, sx + 4, sy - 118, 96, 10, 0.78); line(c, sx + 4, sy - 108, sx + 100, sy - 108, 2, 0.3);
      rect(c, sx + 80, sy - 250, 22, 70, 0.75);
    }
    /* the PA on a stand, an amp, the broom on the wall */
    if (!gear(c, 'speaker', 1080, 562, 200, 440, { night: true })) {
    line(c, 1080, 520, 1080, 250, 6, 0.75); line(c, 1040, 560, 1080, 520, 5, 0.75); line(c, 1120, 560, 1080, 520, 5, 0.75);
    rect(c, 1030, 110, 100, 150, 0.12); ell(c, 1080, 200, 36, 36, 0, 0.45); ell(c, 1080, 140, 14, 14, 0, 0.45);
    }
    amp(c, 860, 400, 130, 130, r);
    line(c, 330, 230, 300, 520, 6, 0.8); fillPoly(c, [[280, 490], [320, 490], [330, 540], [270, 540]], 0.25);
    gear(c, 'drums', 560, 566, 300, 210, { night: true });
    gear(c, 'stand', 440, 600, 140, 330, { night: true, rot: 0.04 });
    gear(c, 'mixer', 640, 712, 200, 90, { night: true, rot: -0.04 });
    /* the cable, coiled and trailing */
    for (i = 0; i < 6; i++) { c.beginPath(); c.ellipse(700 + i * 2, 650 - i, 80 - i * 3, 24 - i, 0.05, 0, TAU); c.lineWidth = 5; c.strokeStyle = g(0.05); c.stroke(); }
    c.beginPath(); c.moveTo(780, 652); c.bezierCurveTo(860, 690, 940, 610, 1060, 660); c.bezierCurveTo(1120, 690, 1160, 720, 1220, 700); c.lineWidth = 5; c.strokeStyle = g(0.05); c.stroke();
    /* cans */
    for (i = 0; i < 12; i++) {
      var cx = r.range(80, 1150), cy = r.range(600, 740);
      if (r.chance(0.5)) { rect(c, cx - 8, cy - 26, 16, 26, 0.85); rect(c, cx - 8, cy - 18, 16, 6, 0.3); ell(c, cx, cy - 26, 8, 3, 0, 0.5); }
      else turned(c, cx, cy, r.range(-0.4, 0.4), function () { rect(c, -13, -8, 26, 16, 0.85); rect(c, -4, -8, 6, 16, 0.3); ell(c, 13, 0, 3, 8, 0, 0.5); });
    }
    /* who's left, cleaning up */
    var who = picks('STACK_CHAIRS', x).who || [];
    if (who[0]) personAt(c, who[0], 790, 690, 470, { face: 'left', bright: 1.45, night: true, rot: r.range(-0.02, 0.02), maxW: 420 });
    if (who[1]) personAt(c, who[1], 1020, 660, 430, { face: 'left', bright: 1.35, night: true, rot: r.range(-0.02, 0.02), maxW: 380 });
    /* the lights half on: a string with half its bulbs out, the far end of the room in the dark */
    bulbs(c, -20, 30, 560, 40, 26, 6, 7);
    c.beginPath(); c.moveTo(560, 40); c.quadraticCurveTo(880, 90, 1220, 36); c.lineWidth = 2.5; c.strokeStyle = g(0.05); c.stroke();
    for (i = 0; i < 6; i++) { var t = (i + 0.5) / 6, bx = 560 + 660 * t, by = 40 + Math.sin(t * Math.PI) * 26 - 4 * t; line(c, bx, by, bx, by + 7, 3, 0.05); ell(c, bx, by + 13, 5, 7, 0, 0.3); }
    front(c, r, function (c) {
      c.save(); var dark = c.createLinearGradient(560, 0, 1200, 0);
      dark.addColorStop(0, 'rgba(0,0,0,0)'); dark.addColorStop(1, 'rgba(0,0,0,0.2)');
      c.fillStyle = dark; c.fillRect(0, 0, DW, DH); c.restore();
    });
    vignette(c, 0.45);
  }

  function stub(c, r, key) {
    rect(c, 0, 0, DW, DH, 0.95);
    var b = [[120, 130], [1080, 118], [1092, 620], [108, 632]];
    fillPoly(c, b, 0.04);
    hatch(c, polyClip(c, b), boxOf(b), 0.8, 18, 2, r, 0.3);
    c.save(); c.font = '700 54px "SB Type", "Courier New", monospace'; c.fillStyle = g(0.96); c.textAlign = 'center';
    c.fillText(key, 600, 395, 900); c.restore();
  }

  var DRAW = {
    CARPORT_NIGHT: function (c, r, x) { carport(c, r, x, !!x.empty); },
    CARPORT_EMPTY: function (c, r, x) { carport(c, r, x, true); },
    STAGE_BAND: stageBand,
    CROWD_FRONT: crowdFront,
    HANDS_TIN: handsTin,
    DOOR_TABLE: doorTable,
    KITCHEN_FLOOR: kitchenFloor,
    PHONE_SCREEN: phoneScreen,
    INBOX_STACK: inboxStack,
    VAN_CURB: vanCurb,
    FLOOR_SLEEP: floorSleep,
    EMPTY_ROOM: emptyRoom,
    FLYER_WALL: flyerWall,
    BAR_DOOR: barDoor,
    BRIDGE: bridge,
    STOREFRONT: storefront,
    FOR_SALE: forSale,
    POLICE_LIGHTS: policeLights,
    BROKEN_GLASS: brokenGlass,
    MAP_ROUTE: mapRoute,
    POSTCARD_FRONT: postcardFront,
    SIDEWALK_LINE: sidewalkLine,
    STAGE_DIVE: stageDive,
    YARD_NIGHT: yardNight,
    RAIN_CARPORT: function (c, r, x) { carport(c, r, x, false, true); },
    SOLO_SET: soloSet,
    STACK_CHAIRS: stackChairs
  };
  /* Which keys are photocopied photos (soft shading) and which are drawn (ink). */
  var DRAWN = { HANDS_TIN: true, DOOR_TABLE: true, KITCHEN_FLOOR: true, PHONE_SCREEN: true, INBOX_STACK: true, FLYER_WALL: true,
    BROKEN_GLASS: true, MAP_ROUTE: true, POSTCARD_FRONT: true };

  /** draw(target, artKey, ctx): paints the picture into a canvas (or an <svg> as an <image>). Returns the canvas. */
  function draw(target, key, x) {
    x = x || {};
    key = resolve(key, x);
    /* cut-outs not in yet: paint the stand-in now, and again once they land */
    var need = plan(key, x).filter(function (id) { return !isSettled(id); });
    if (need.length && !x._again) {
      load(need, function () { var y = {}, k; for (k in x) y[k] = x[k]; y._again = true; draw(target, key, y); });
    }
    var isSvg = target && target.namespaceURI === 'http://www.w3.org/2000/svg';
    var W, H, cv;
    if (isSvg) {
      var vb = target.viewBox && target.viewBox.baseVal;
      W = Math.round((vb && vb.width) || target.clientWidth || 600); H = Math.round((vb && vb.height) || target.clientHeight || 375);
      cv = mk(W * 2, H * 2); W *= 2; H *= 2;
    } else {
      cv = target; W = cv.width; H = cv.height;
    }
    var seed = 'scene:' + key + ':' + (x.seed || '') + ':' + (x.index || 0) + ':' + (bandName(x) || '');
    var r = SB.rng.make(seed);
    var src = mk(W, H), sc = src.getContext('2d');
    var s = Math.max(W / DW, H / DH);
    var lay = !isSvg && typeof x._layers === 'function' && !!sc.getTransform, rec = null;
    sc.fillStyle = '#fff'; sc.fillRect(0, 0, W, H);
    sc.save();
    sc.translate((W - DW * s) / 2, (H - DH * s) / 2); sc.scale(s, s);
    CUR = { key: key, x: x, n: {} };   /* amp() and gear() take their photos from this picture's picks */
    if (lay) REC = rec = { pieces: [], over: [], seq: 0 };
    try { (DRAW[key] || function (c, rr) { stub(c, rr, key); })(sc, r, x); } finally { CUR = null; REC = null; }
    sc.restore();
    if (!DRAWN[key]) { /* a photo original is soft; the copier makes it hard */
      var soft = mk(W, H), so = soft.getContext('2d');
      so.filter = 'blur(' + (0.8 * s).toFixed(2) + 'px)'; so.drawImage(src, 0, 0);
      sc.drawImage(soft, 0, 0);
    }
    var out = cv.getContext('2d');
    var photos = !DRAWN[key] && plan(key, x).length > 0 && ready(plan(key, x));
    var xo = {
      paper: paperOf(x, key), ink: TONER, cell: Math.max(4, W / (DRAWN[key] ? 240 : photos ? 250 : 190)),
      contrast: DRAWN[key] ? 1.9 : photos ? 1.3 : 1.4, bias: DRAWN[key] ? 0 : photos ? 0.06 : 0.04
    };
    xerox(sc, out, W, H, SB.rng.make(seed + ':copy'), xo);
    if (lay) {
      /* the people, after the room is up; a newer drawing of this canvas makes these stale */
      var gen = target._sbLayers = (target._sbLayers || 0) + 1, info = { key: key, loud: !!LOUD[key], w: W, h: H };
      lift(rec, W, H, s, key, seed, xo, function () { return target._sbLayers === gen; }, function (L) { x._layers(L, info); });
    }
    if (isSvg) {
      while (target.firstChild) target.removeChild(target.firstChild);
      var im = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      im.setAttribute('href', cv.toDataURL('image/png'));
      im.setAttribute('width', W / 2); im.setAttribute('height', H / 2);
      target.appendChild(im);
    }
    return cv;
  }

  /* ---------------- patches, buttons, denim ---------------- */

  function denim(c, x, y, w, h, r, opts) {
    opts = opts || {};
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    c.fillStyle = opts.dark ? '#2C3E5C' : '#41587D'; c.fillRect(x, y, w, h);
    /* fades */
    for (var f = 0; f < (opts.dark ? 1 : 4); f++) {
      var fx = x + r.range(0, w), fy = y + r.range(0, h), fr = r.range(0.2, 0.6) * Math.max(w, h);
      var gr = c.createRadialGradient(fx, fy, 0, fx, fy, fr);
      gr.addColorStop(0, 'rgba(170,190,215,' + (opts.dark ? 0.08 : 0.22) + ')'); gr.addColorStop(1, 'rgba(170,190,215,0)');
      c.fillStyle = gr; c.fillRect(x, y, w, h);
    }
    /* twill */
    var step = Math.min(opts.step || 3, 3.2);
    c.lineWidth = step * 0.4;
    for (var d = -h; d < w; d += step) {
      c.strokeStyle = 'rgba(' + (d / step % 2 < 1 ? '215,225,240,' + r.range(0.06, 0.13).toFixed(2) : '10,20,40,' + r.range(0.1, 0.18).toFixed(2)) + ')';
      c.beginPath(); c.moveTo(x + d, y + h); c.lineTo(x + d + h * 0.58, y); c.stroke();
    }
    /* slubs */
    c.fillStyle = 'rgba(230,236,245,.35)';
    for (var k = 0; k < w * h / 260; k++) c.fillRect(x + r.range(0, w), y + r.range(0, h), r.range(2, 7), 1);
    c.restore();
  }

  function threadStitches(c, pts, r, color, len) {
    c.save(); c.strokeStyle = color; c.lineCap = 'round';
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(2, Math.round(L / len));
      for (var k = 0; k < n; k += 2) {
        var t0 = k / n + r.range(-0.02, 0.02), t1 = (k + 1) / n + r.range(-0.02, 0.02);
        c.lineWidth = r.range(1.6, 2.6) * len / 12;
        c.beginPath(); c.moveTo(a[0] + (b[0] - a[0]) * t0 + r.range(-1.5, 1.5), a[1] + (b[1] - a[1]) * t0 + r.range(-1.5, 1.5));
        c.lineTo(a[0] + (b[0] - a[0]) * t1 + r.range(-1.5, 1.5), a[1] + (b[1] - a[1]) * t1 + r.range(-1.5, 1.5)); c.stroke();
      }
    }
    c.restore();
  }

  /* Screen-print a mask (black on transparent) in an ink, with dry spots and a slightly shifted second pass. */
  function screenPrint(c, mask, x, y, ink, r, opts) {
    opts = opts || {};
    var W = mask.width, H = mask.height, t = mk(W, H), tc = t.getContext('2d');
    tc.drawImage(mask, 0, 0);
    tc.globalCompositeOperation = 'source-in'; tc.fillStyle = ink; tc.fillRect(0, 0, W, H);
    tc.globalCompositeOperation = 'destination-out';
    for (var k = 0; k < W * H / 140; k++) { tc.fillStyle = 'rgba(0,0,0,' + r.range(0.3, 1) + ')'; tc.fillRect(r.range(0, W), r.range(0, H), r.range(1, 3), r.range(1, 2)); }
    if (opts.wear) for (var wv = 0; wv < 3; wv++) { /* worn patches */
      var gx = r.range(0, W), gy = r.range(0, H), gr = tc.createRadialGradient(gx, gy, 0, gx, gy, W * r.range(0.15, 0.3));
      gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); tc.fillStyle = gr; tc.fillRect(0, 0, W, H);
    }
    c.drawImage(t, x, y);
  }

  function wrapWords(text, max) {
    var words = upper(text).split(/\s+/), out = [], cur = '';
    words.forEach(function (w) { if (cur && (cur + ' ' + w).length > max) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) out.push(cur);
    return out;
  }

  /* The print of a patch, as a black mask, for each id that has its own design; the rest get lettering and a motif. */
  function patchMask(id, name, w, h, r) {
    var m = mk(w, h), c = m.getContext('2d'), ink = '#000';
    c.fillStyle = ink; c.strokeStyle = ink;
    if (id === 'DOORS_AT_8') {
      marker(c, 'DOORS AT', w / 2, h * 0.28, h * 0.17, { align: 'center', treatment: 'block', maxWidth: w * 0.84, seed: id });
      marker(c, '8', w * 0.5, h * 0.9, h * 0.56, { align: 'center', treatment: 'block', seed: id + '8' });
      c.lineWidth = h * 0.04; c.beginPath(); c.moveTo(w * 0.08, h * 0.36); c.lineTo(w * 0.92, h * 0.36); c.stroke();
      return m;
    }
    if (id === 'PACKED') {
      for (var row = 0; row < 3; row++) for (var k = 0; k < 7 - (row % 2); k++) {
        var hx = w * (0.1 + k * 0.135 + (row % 2) * 0.067), hy = h * (0.18 + row * 0.13), hr = h * 0.075;
        c.beginPath(); c.arc(hx, hy, hr, 0, TAU); c.fill();
        c.beginPath(); c.ellipse(hx, hy + hr * 1.9, hr * 1.6, hr * 1.1, 0, Math.PI, TAU); c.fill();
      }
      c.fillRect(0, h * 0.56, w, h * 0.06);
      marker(c, 'PACKED', w / 2, h * 0.93, h * 0.27, { align: 'center', treatment: 'block', maxWidth: w * 0.9, seed: id });
      return m;
    }
    var lines = wrapWords(name, 10).slice(0, 4), size = Math.min(h * 0.22, h * 0.78 / lines.length / 1.3);
    var y0 = h / 2 - (lines.length * size * 1.3) / 2 + size * 1.1;
    lines.forEach(function (ln, i) { marker(c, ln, w / 2, y0 + i * size * 1.3, size, { align: 'center', treatment: r.chance(0.5) ? 'block' : 'stencil', maxWidth: w * 0.88, seed: id + i }); });
    return m;
  }

  function clothPatch(c, S, id, o, r) {
    var fabrics = [['#1E1D1B', '#ECE5D0'], ['#D8CFB2', '#151413'], ['#5A5A38', '#ECE5D0'], ['#8E2C22', '#F0E9D6'], ['#151413', '#E8C547']];
    var fab = id === 'DOORS_AT_8' ? fabrics[0] : id === 'PACKED' ? fabrics[1] : fabrics[r.int(0, fabrics.length - 1)];
    var pw = S * r.range(0.66, 0.76), ph = S * (id === 'PACKED' ? 0.5 : r.range(0.52, 0.62));
    c.save(); c.translate(S / 2, S / 2); c.rotate(r.range(-0.16, 0.16));
    var pts = [[-pw / 2 + r.range(-3, 3), -ph / 2 + r.range(-3, 3)], [pw / 2 + r.range(-3, 3), -ph / 2 + r.range(-3, 3)],
      [pw / 2 + r.range(-3, 3), ph / 2 + r.range(-3, 3)], [-pw / 2 + r.range(-3, 3), ph / 2 + r.range(-3, 3)]];
    poly(c, pts.map(function (p) { return [p[0] + 3, p[1] + 4]; })); c.fillStyle = 'rgba(0,0,0,.35)'; c.fill();
    poly(c, pts); c.fillStyle = fab[0]; c.fill();
    c.save(); poly(c, pts); c.clip();
    for (var k = -ph; k < pw; k += 2.5) { c.strokeStyle = 'rgba(' + (fab[0] === '#D8CFB2' ? '0,0,0,.07' : '255,255,255,.06') + ')'; c.lineWidth = 1; c.beginPath(); c.moveTo(-pw / 2 + k, -ph / 2); c.lineTo(-pw / 2 + k, ph / 2); c.stroke(); }
    var mask = patchMask(id, o.name || id, Math.round(pw * 0.86), Math.round(ph * 0.8), r);
    screenPrint(c, mask, -mask.width / 2 + r.range(-2, 2), -mask.height / 2 + r.range(-2, 2), fab[1], r, { wear: true });
    c.restore();
    /* frayed edge */
    c.strokeStyle = fab[0] === '#D8CFB2' ? 'rgba(200,190,160,.9)' : 'rgba(40,38,34,.9)'; c.lineWidth = 1;
    for (var e = 0; e < 4; e++) {
      var a = pts[e], b = pts[(e + 1) % 4];
      for (var f = 0; f < 22; f++) { var t = r.next(), fx = a[0] + (b[0] - a[0]) * t, fy = a[1] + (b[1] - a[1]) * t; c.beginPath(); c.moveTo(fx, fy); c.lineTo(fx + r.range(-4, 4), fy + r.range(-4, 4)); c.stroke(); }
    }
    var inset = pts.map(function (p) { return [p[0] * 0.9, p[1] * 0.86]; });
    threadStitches(c, inset, r, r.chance(0.5) ? '#F1ECE0' : '#B23A2A', S / 22);
    c.restore();
  }

  /* Typewriter letters on an arc, reading left to right: along the top (bottom false) or along the bottom. */
  function ringText(c, text, R, span, size, color, bottom) {
    var t = upper(text), n = t.length, step = n > 1 ? span / (n - 1) : 0;
    c.save(); c.fillStyle = color; c.font = '700 ' + size + 'px "SB Type", "Courier New", monospace'; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (var i = 0; i < n; i++) {
      var a = bottom ? Math.PI / 2 + span / 2 - i * step : -Math.PI / 2 - span / 2 + i * step;
      c.save(); c.translate(Math.cos(a) * R, Math.sin(a) * R); c.rotate(bottom ? a - Math.PI / 2 : a + Math.PI / 2); c.fillText(t.charAt(i), 0, 0); c.restore();
    }
    c.restore();
  }

  function button(c, S, id, o, r) {
    var R = S * 0.36, papers = ['#F2F0E6', '#ECD668', '#F0B2C0', '#C0DCA4', '#F1A98A'];
    var face = id === 'FOUR_PEOPLE' ? '#E9E4D2' : papers[r.int(0, papers.length - 1)];
    c.save(); c.translate(S / 2, S / 2); c.rotate(r.range(-0.4, 0.4));
    c.beginPath(); c.arc(3, 5, R + 2, 0, TAU); c.fillStyle = 'rgba(0,0,0,.4)'; c.fill();
    c.beginPath(); c.arc(0, 0, R + 1.2, 0, TAU); c.fillStyle = '#5E5B55'; c.fill();
    c.beginPath(); c.arc(0, 0, R, 0, TAU); c.fillStyle = face; c.fill();
    /* print as a xeroxed sheet: draw to a mask, copy it through the toner pass onto the face colour */
    var D = Math.round(R * 2), m = mk(D, D), mc = m.getContext('2d');
    mc.fillStyle = '#fff'; mc.fillRect(0, 0, D, D); mc.translate(D / 2, D / 2);
    mc.fillStyle = '#000';
    if (id === 'FOUR_PEOPLE') {
      ringText(mc, 'FOUR PEOPLE', R * 0.72, 2.1, R * 0.21, '#000', false);
      ringText(mc, 'AND THE BAND', R * 0.72, 2.3, R * 0.21, '#000', true);
      for (var k = 0; k < 4; k++) { /* four little people */
        var px = -R * 0.42 + k * R * 0.28, py = R * 0.12, ph = R * 0.42;
        mc.beginPath(); mc.arc(px, py - ph * 0.82, ph * 0.13, 0, TAU); mc.fill();
        mc.fillRect(px - ph * 0.12, py - ph * 0.66, ph * 0.24, ph * 0.38);
        mc.fillRect(px - ph * 0.1, py - ph * 0.3, ph * 0.08, ph * 0.32); mc.fillRect(px + ph * 0.02, py - ph * 0.3, ph * 0.08, ph * 0.32);
      }
      mc.fillRect(-R * 0.62, R * 0.16, R * 1.24, R * 0.03);
    } else {
      var lines = wrapWords(o.name || id, 9).slice(0, 4), size = Math.min(R * 0.36, R * 1.2 / lines.length / 1.25);
      var y0 = -(lines.length * size * 1.25) / 2 + size;
      lines.forEach(function (ln, i) { marker(mc, ln, 0, y0 + i * size * 1.25, size, { align: 'center', treatment: 'block', maxWidth: R * 1.5, seed: id + i }); });
      mc.lineWidth = R * 0.05; mc.beginPath(); mc.arc(0, 0, R * 0.86, 0, TAU); mc.stroke();
    }
    var out = mk(D, D), oc = out.getContext('2d');
    xerox(mc, oc, D, D, SB.rng.make('btn:' + id), { paper: face, cell: 3, contrast: 1.8 });
    c.save(); c.beginPath(); c.arc(0, 0, R, 0, TAU); c.clip(); c.drawImage(out, -R, -R);
    /* the curl of the paper over the shell edge: flat, no shine */
    var gr = c.createRadialGradient(0, 0, R * 0.78, 0, 0, R);
    gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.14)'); c.fillStyle = gr; c.fillRect(-R, -R, 2 * R, 2 * R);
    for (var sc = 0; sc < 5; sc++) { var sa = r.range(0, TAU), sr = R * r.range(0.3, 0.9); c.strokeStyle = 'rgba(60,55,45,.18)'; c.lineWidth = 1; c.beginPath(); c.arc(0, 0, sr, sa, sa + r.range(0.1, 0.5)); c.stroke(); }
    c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 1; c.beginPath(); c.moveTo(-R * 0.6, R * 0.2); c.lineTo(-R * 0.1, R * 0.5); c.stroke();
    c.restore();
    c.restore();
  }

  function blankSquare(c, S, id, r) {
    var w = S * 0.6, h = S * 0.5;
    c.save(); c.translate(S / 2, S / 2); c.rotate(r.range(-0.08, 0.08));
    c.save(); c.beginPath(); c.rect(-w / 2, -h / 2, w, h); c.clip();
    denim(c, -w / 2, -h / 2, w, h, r, { dark: true, step: S / 50 });
    c.restore();
    c.setLineDash([S / 30, S / 40]); c.strokeStyle = 'rgba(235,232,220,.55)'; c.lineWidth = 1.5;
    c.strokeRect(-w / 2, -h / 2, w, h); c.setLineDash([]);
    c.strokeStyle = 'rgba(240,236,224,.8)'; c.lineWidth = 1.4;
    for (var k = 0; k < 3; k++) { var tx = r.range(-w / 2, w / 2), ty = (r.chance(0.5) ? -1 : 1) * h / 2; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + r.range(-8, 8), ty + r.range(-10, 10), tx + r.range(-12, 12), ty + r.range(-14, 14)); c.stroke(); }
    c.restore();
  }

  function chalkOutline(c, S, id, o, r) {
    var w = S * 0.66, h = S * 0.52;
    c.save(); c.translate(S / 2, S / 2); c.rotate(r.range(-0.1, 0.1));
    c.strokeStyle = 'rgba(236,232,220,.6)'; c.lineWidth = 2; c.setLineDash([3, 4]);
    if (o.kind === 'button') { c.beginPath(); c.arc(0, 0, S * 0.34, 0, TAU); c.stroke(); } else c.strokeRect(-w / 2, -h / 2, w, h);
    c.setLineDash([]);
    var lines = wrapWords(o.name || id, 11).slice(0, 3);
    lines.forEach(function (ln, i) { marker(c, ln, 0, -lines.length * S * 0.05 + i * S * 0.1 + S * 0.07, S * 0.065, { align: 'center', ink: 'rgba(236,232,220,.7)', maxWidth: w * 0.85, seed: id + i }); });
    c.restore();
  }

  /** patch(id, { name, kind: 'patch'|'button', earned, hidden, size, denim, grit }) -> a canvas, size x size CSS px
   *  (drawn at twice that for sharpness). Hidden and not earned: a blank square of unfaded denim. Not hidden and
   *  not earned: a chalk outline with the name. denim: false leaves the ground transparent (for the jacket). */
  function patch(id, o) {
    o = o || {};
    var size = o.size || 160, S = size * 2, cv = mk(S, S), c = cv.getContext('2d'), r = SB.rng.make('patch:' + id);
    cv.style.width = size + 'px'; cv.style.height = size + 'px';
    cv.setAttribute('role', 'img');
    cv.setAttribute('aria-label', o.earned ? (o.name || id) + (o.kind === 'button' ? ' button' : ' patch') : (o.hidden ? 'a blank square, not earned yet' : (o.name || id) + ', not earned yet'));
    if (o.denim !== false) denim(c, 0, 0, S, S, SB.rng.make('denim:' + id), { step: S / 60 });
    if (!o.earned && o.hidden) blankSquare(c, S, id, r);
    else if (!o.earned) chalkOutline(c, S, id, o, r);
    else if (o.kind === 'button') button(c, S, id, o, r);
    else clothPatch(c, S, id, o, r);
    if (o.grit !== false) grit(cv, { seed: 'patch:' + id, cell: Math.max(4, S / 48), amt: 0.72 });
    return cv;
  }

  /** jacket(canvas, items, opts): the back of the jean jacket on the chair, with each item's patch sewn or pinned
   *  on, crooked. items: [{ id, name, kind, earned, hidden }]. Draws at the canvas's own size. */
  function jacket(cv, items, opts) {
    opts = opts || {};
    var c = cv.getContext('2d'), W = cv.width, H = cv.height, r = SB.rng.make('jacket:' + (opts.seed || ''));
    c.clearRect(0, 0, W, H);
    /* the chair back behind */
    c.fillStyle = '#2A2724'; c.fillRect(W * 0.12, H * 0.02, W * 0.76, H * 0.06);
    var body = [[W * 0.14, H * 0.14], [W * 0.36, H * 0.08], [W * 0.64, H * 0.08], [W * 0.86, H * 0.14], [W * 0.95, H * 0.36], [W * 0.92, H * 0.97],
      [W * 0.08, H * 0.97], [W * 0.05, H * 0.36]];
    c.save(); poly(c, body.map(function (p) { return [p[0] + 5, p[1] + 8]; })); c.fillStyle = 'rgba(0,0,0,.35)'; c.fill(); c.restore();
    c.save(); poly(c, body); c.clip();
    denim(c, 0, 0, W, H, r, { step: Math.max(3, W / 160) });
    /* seams: yoke, panels, waistband, each with a double row of tan topstitch */
    function seam(pts) {
      c.strokeStyle = 'rgba(15,25,45,.55)'; c.lineWidth = 3; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); pts.forEach(function (p) { c.lineTo(p[0], p[1]); }); c.stroke();
      c.setLineDash([6, 4]); c.strokeStyle = '#C08A3E'; c.lineWidth = 1.6;
      [-5, 5].forEach(function (o) { c.beginPath(); c.moveTo(pts[0][0], pts[0][1] + o); pts.forEach(function (p) { c.lineTo(p[0] + (pts.length > 2 ? 0 : 0), p[1] + o); }); c.stroke(); });
      c.setLineDash([]);
    }
    seam([[W * 0.05, H * 0.3], [W * 0.5, H * 0.36], [W * 0.95, H * 0.3]]);
    seam([[W * 0.05, H * 0.86], [W * 0.95, H * 0.86]]);
    c.setLineDash([6, 4]); c.strokeStyle = '#C08A3E'; c.lineWidth = 1.6;
    [W * 0.3, W * 0.7].forEach(function (sx) { [-5, 5].forEach(function (o) { c.beginPath(); c.moveTo(sx + o, H * 0.35); c.lineTo(sx + o + (sx < W / 2 ? -8 : 8), H * 0.86); c.stroke(); }); });
    c.setLineDash([]);
    c.save(); c.filter = 'blur(' + Math.round(W / 90) + 'px)';
    for (var cr = 0; cr < 7; cr++) {
      var cx0 = r.range(W * 0.1, W * 0.9), cy0 = r.range(H * 0.3, H * 0.95), ang = r.range(-0.6, 0.6) + Math.PI / 2, L = r.range(H * 0.12, H * 0.3);
      c.strokeStyle = 'rgba(10,18,35,.38)'; c.lineWidth = W / 70; c.beginPath(); c.moveTo(cx0, cy0); c.lineTo(cx0 + Math.cos(ang) * L, cy0 - Math.sin(ang) * L); c.stroke();
      c.strokeStyle = 'rgba(200,215,235,.18)'; c.lineWidth = W / 110; c.beginPath(); c.moveTo(cx0 + W / 60, cy0); c.lineTo(cx0 + W / 60 + Math.cos(ang) * L, cy0 - Math.sin(ang) * L); c.stroke();
    }
    c.restore();
    c.restore();
    /* collar */
    var collar = [[W * 0.3, H * 0.09], [W * 0.5, H * 0.02], [W * 0.7, H * 0.09], [W * 0.66, H * 0.15], [W * 0.5, H * 0.11], [W * 0.34, H * 0.15]];
    c.save(); poly(c, collar); c.clip(); denim(c, 0, 0, W, H * 0.2, r, { dark: true, step: 3 }); c.restore();
    /* the items */
    var n = items.length, slots = [], cols = n <= 4 ? 2 : 3, rowsN = Math.ceil(n / cols), size = Math.min(W / cols * 0.92, H * 0.62 / rowsN);
    items.forEach(function (it, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var px = W * (0.12 + (col + 0.5) * 0.76 / cols) + r.range(-W * 0.03, W * 0.03), py = H * 0.47 + row * size * 0.9 + r.range(-H * 0.02, H * 0.02);
      slots.push([px, py]);
      var pc = patch(it.id, { name: it.name, kind: it.kind, earned: it.earned, hidden: it.hidden, size: size / 2, denim: false, grit: false });
      c.drawImage(pc, px - size / 2, py - size / 2, size, size);
    });
    /* through the copier with everything else: the same dot screen and toner as the cutscenes */
    grit(cv, { seed: 'jacket:' + (opts.seed || ''), cell: Math.max(5, W / 95), amt: 0.72 });
    return cv;
  }

  /** preload(keys, cb, ctxs, wait): load the cut-outs these pictures need (ctxs[i] is the ctx keys[i] will be drawn
   *  with; without it a default cast is loaded), then cb(). cb fires at the latest after `wait` ms (default 6000),
   *  loaded or not; a picture drawn before its cut-outs land repaints itself when they do. */
  function preload(keys, cb, ctxs, wait) {
    var ids = [], done = false, t;
    (keys || []).forEach(function (k, i) { ids = ids.concat(plan(k, (ctxs && ctxs[i]) || {})); });
    function fin() { if (done) return; done = true; clearTimeout(t); if (cb) cb(); }
    t = setTimeout(fin, wait || 6000);
    load(ids, fin);
  }

  return {
    keys: KEYS.slice(),
    preload: preload,
    /** plan(key, ctx): the cut-out ids that picture pastes in (its band's people, then everyone else it picked). */
    plan: plan,
    drawn: function (key) { return !!DRAW[key]; },
    /** resolve(art, ctx): the ART_KEY a frame's art comes to (a string as it is, a cause-keyed object by ctx's flags). */
    resolve: resolve,
    papers: PAPER,
    draw: draw,
    /** layered(canvas, artKey, ctx, onLayers): draw() with the people lifted off: the canvas gets the room, and
     *  onLayers(layers, { key, loud, w, h }) gets each person as a photocopied cut-out piece, back to front:
     *  [{ canvas, x, y, w, h (in the canvas's pixels; a piece may hang past its edges), seq, id, kind ('band' | 'drums' |
     *  'crowd' | 'person' | 'calm': calm in every picture without a band or crowd going), planted (something stands in
     *  front of it: move it only about its bottom edge), off (it runs off the bottom of the frame), depth (0..0.36, how
     *  much nearer the lens than the room) }]. The pieces are made after draw returns, one a turn, so onLayers comes
     *  a little later; it comes again when late photos land and the picture repaints. */
    layered: function (cv, key, x, onLayers) {
      var y = {}, k; x = x || {};
      for (k in x) y[k] = x[k];
      y._layers = onLayers;
      return draw(cv, key, y);
    },
    patch: patch,
    jacket: jacket,
    /** copier(canvas, { paper, ink, cell, contrast, bias, alpha, seed }): the photocopier pass, in place: the canvas's
     *  picture becomes toner on coloured copy paper. alpha: true keeps the canvas's own shape (a cut-out piece). */
    copier: function (cv, o) {
      o = o || {};
      var W = cv.width, H = cv.height, src = mk(W, H), sc = src.getContext('2d'), c = cv.getContext('2d');
      sc.drawImage(cv, 0, 0);
      c.save(); if (c.setTransform) c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, W, H);
      xerox(sc, c, W, H, SB.rng.make('copier:' + (o.seed || '')), { paper: PAPER[o.paper] || o.paper || PAPER.white, ink: o.ink, cell: o.cell, contrast: o.contrast, bias: o.bias, alpha: !!o.alpha });
      c.restore();
      return cv;
    },
    /** paste(ctx, cutoutId, { x, y, h | w, rot, flip, border, contrast, bright, alpha }): a cut-out photo, bottom centre
     *  at (x, y), with its scissor margin. false if the photo isn't loaded yet (loadCuts first). */
    paste: paste,
    /** loadCuts(ids, cb): load these SB.Cutouts photos, then cb() (at once if they are in already). */
    loadCuts: load,
    /** need(artKey, ctx): the cut-out photos this picture would draw that are not in yet (load them first and the
     *  picture never shows its stand-in: js/ui/cutscene.js, SB.Boot.hold) */
    need: function (key, x) { x = x || {}; try { return plan(resolve(key, x), x).filter(function (id) { return !isSettled(id); }); } catch (e) { return []; } },
    /** img(id): the loaded Image of a cut-out photo, or null if it is not in yet (the flyer generator draws from it). */
    img: function (id) { return isIn(id) ? IMG[id].img : null; }
  };
});
