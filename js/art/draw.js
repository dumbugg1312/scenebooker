/* Scene Booker: js/art/draw.js
 * SB.Draw (ART-B): everything on a flyer that is not lettering. Textures, the motifs of SB.Enums.MOTIF, the
 * procedural pictures of SB.Enums.PICTURE, tape, torn edges and the halftone screen (05-interface 6.4, art.md 2.4,
 * 4.5, 4.7). Pure: every random choice comes from the generator in opts.rng (SB.rng.make), never a stream.
 * Canvas functions draw in the current transform and leave the context as they found it, except Draw.torn, whose
 * whole job is to leave a clip in place (the caller wraps it in save and restore).
 * Motifs are drawn with a small set of canvas calls only (paths, arcs, ellipses, fill, stroke, fillText), so
 * SB.Identity can replay them into SVG through a recording context.
 */
SB.module('Draw', function (SB) {
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

  /* ---------------- small helpers ---------------- */

  function col(v, def) {
    if (!v) return def;
    if (typeof v !== 'string') return def;
    if (v.charAt(0) === '#' || v.indexOf('rgb') === 0 || v === 'currentColor') return v;
    return INK_HEX[v] || PAPER_HEX[v] || def;
  }
  function rgbOf(hex) {
    if (typeof hex !== 'string' || hex.charAt(0) !== '#') return [26, 26, 26];
    var h = hex.slice(1);
    if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
    var n = parseInt(h.slice(0, 6), 16);
    if (isNaN(n)) return [26, 26, 26];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) {
    var c = rgbOf(hex);
    return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (Math.round(a * 1000) / 1000) + ')';
  }
  function lum(hex) {
    var c = rgbOf(hex);
    return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
  }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function rngOf(opts, key) { return (opts && opts.rng) || SB.rng.make('draw:' + key); }
  function deg(a) { return (a || 0) * Math.PI / 180; }

  /* The jitter used by rough motifs. Set per motif call. */
  var J = 0, JR = null;
  function j(v) { return J ? v + (JR.next() - 0.5) * 2 * J : v; }

  function mv(c, x, y) { c.moveTo(j(x), j(y)); }
  function ln(c, x, y) { c.lineTo(j(x), j(y)); }
  function qd(c, cx, cy, x, y) { c.quadraticCurveTo(j(cx), j(cy), j(x), j(y)); }
  function bz(c, ax, ay, bx, by, x, y) { c.bezierCurveTo(j(ax), j(ay), j(bx), j(by), j(x), j(y)); }
  function circ(c, x, y, r) { c.moveTo(x + r, y); c.arc(x, y, r, 0, TAU, false); }
  function ell(c, x, y, rx, ry, rot) {
    rot = rot || 0;
    c.moveTo(x + rx * Math.cos(rot), y + rx * Math.sin(rot));
    c.ellipse(x, y, rx, ry, rot, 0, TAU, false);
  }
  function poly(c, pts, open) {
    mv(c, pts[0], pts[1]);
    for (var i = 2; i < pts.length; i += 2) ln(c, pts[i], pts[i + 1]);
    if (!open) c.closePath();
  }
  function rrect(c, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }
  function fz(c) { c.fill(); }
  function fe(c) { c.fill('evenodd'); }
  function st(c, w, cap) {
    c.lineWidth = w;
    c.lineCap = cap || 'round';
    c.lineJoin = 'round';
    c.stroke();
  }
  function line(c, x1, y1, x2, y2, w, cap) {
    c.beginPath(); mv(c, x1, y1); ln(c, x2, y2); st(c, w, cap);
  }
  /* Short lettering inside a motif (route numbers, FREE!). Drawn at 100x and scaled back so tiny unit sizes work. */
  function motifText(c, text, x, y, h, color) {
    if (!text) return;
    c.save();
    c.scale(0.01, 0.01);
    c.fillStyle = color;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    var px = Math.round(h * 100);
    c.font = '900 ' + px + 'px sans-serif';
    var wmax = 76;
    var w = c.measureText ? c.measureText(String(text)).width : 0;
    if (w > wmax && w > 0) {
      c.scale(wmax / w, 1);
      c.fillText(String(text), x * 100 * w / wmax, y * 100);
    } else {
      c.fillText(String(text), x * 100, y * 100);
    }
    c.restore();
  }

  /* ---------------- motifs: unit space, centered, extent about -0.5..0.5, y down ---------------- */

  var MOTIFS = {
    skull: function (c, r) {
      var teeth = r.int(3, 5), crack = r.chance(0.5);
      c.beginPath();
      mv(c, -0.2, 0.42); ln(c, -0.2, 0.22);
      c.arc(0, -0.08, 0.36, 2.16, 0.98 + TAU, false);
      ln(c, 0.2, 0.42); c.closePath();
      ell(c, -0.13, -0.06, 0.09, 0.1, 0); ell(c, 0.13, -0.06, 0.09, 0.1, 0);
      poly(c, [0, 0.07, -0.05, 0.16, 0.05, 0.16]);
      for (var i = 0; i < teeth; i++) {
        var tx = -0.16 + (i + 0.5) * (0.32 / teeth);
        c.rect(tx - 0.012, 0.3, 0.024, 0.1);
      }
      if (crack) poly(c, [-0.02, -0.43, 0.04, -0.33, 0.0, -0.3, 0.07, -0.2, 0.05, -0.2, -0.01, -0.29, 0.02, -0.33, -0.04, -0.43]);
      fe(c);
    },
    bones: function (c) {
      [1, -1].forEach(function (s) {
        /* a bone from (-0.34s, -0.34) to (0.34s, 0.34), two knobs at each end across the bone */
        var px = 0.05 * s, py = -0.05;
        c.beginPath(); mv(c, -0.34 * s, -0.34); ln(c, 0.34 * s, 0.34); st(c, 0.1);
        c.beginPath();
        circ(c, -0.36 * s + px, -0.36 + py, 0.07); circ(c, -0.36 * s - px, -0.36 - py, 0.07);
        circ(c, 0.36 * s + px, 0.36 + py, 0.07); circ(c, 0.36 * s - px, 0.36 - py, 0.07);
        fz(c);
      });
    },
    x: function (c) {
      line(c, -0.36, -0.36, 0.36, 0.36, 0.2, 'square');
      line(c, 0.36, -0.36, -0.36, 0.36, 0.2, 'square');
    },
    bolt: function (c) {
      c.beginPath();
      poly(c, [0.12, -0.5, -0.26, 0.06, -0.02, 0.06, -0.14, 0.5, 0.26, -0.08, 0.02, -0.08, 0.16, -0.5]);
      fz(c);
    },
    star: function (c) {
      c.beginPath();
      var pts = [];
      for (var i = 0; i < 10; i++) {
        var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 0.2 : 0.5;
        pts.push(Math.cos(a) * rr, Math.sin(a) * rr + 0.04);
      }
      poly(c, pts); fz(c);
    },
    starburst: function (c, r, o) {
      var n = r.int(14, 22), pts = [];
      for (var i = 0; i < n * 2; i++) {
        var a = i * Math.PI / n, rr = i % 2 ? 0.37 + r.range(-0.02, 0.02) : 0.5;
        pts.push(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      c.beginPath(); poly(c, pts); fz(c);
      if (o.text) motifText(c, o.text, 0, 0.01, 0.2, o.paper);
    },
    arrow: function (c) {
      c.beginPath();
      poly(c, [-0.5, -0.09, 0.1, -0.09, 0.1, -0.28, 0.5, 0, 0.1, 0.28, 0.1, 0.09, -0.5, 0.09]);
      fz(c);
    },
    fist: function (c) {
      c.beginPath(); rrect(c, -0.3, -0.12, 0.56, 0.5, 0.1); st(c, 0.06);
      c.beginPath();
      for (var i = 0; i < 4; i++) {
        var x = -0.3 + 0.07 + i * 0.14;
        c.moveTo(x - 0.07, -0.12);
        c.arc(x, -0.12, 0.07, Math.PI, TAU, false);
      }
      st(c, 0.06);
      c.beginPath(); mv(c, -0.3, 0.04); qd(c, -0.42, 0.12, -0.3, 0.2); ln(c, 0.0, 0.2); st(c, 0.06);
      c.beginPath(); mv(c, -0.16, 0.38); ln(c, -0.16, 0.5); mv(c, 0.14, 0.38); ln(c, 0.14, 0.5); st(c, 0.06);
    },
    horns: function (c) {
      c.beginPath(); rrect(c, -0.24, -0.02, 0.46, 0.4, 0.1); fz(c);
      line(c, -0.17, 0.0, -0.2, -0.46, 0.11);
      line(c, 0.15, 0.0, 0.18, -0.46, 0.11);
      c.beginPath(); circ(c, -0.04, -0.04, 0.06); circ(c, 0.06, -0.04, 0.06); fz(c);
      line(c, -0.24, 0.12, -0.38, -0.02, 0.1);
      c.beginPath(); rrect(c, -0.16, 0.36, 0.32, 0.14, 0.03); fz(c);
    },
    eye: function (c) {
      c.beginPath(); mv(c, -0.5, 0); qd(c, 0, -0.42, 0.5, 0); qd(c, 0, 0.42, -0.5, 0); c.closePath(); st(c, 0.06);
      c.beginPath(); circ(c, 0, 0, 0.17); circ(c, 0, 0, 0.065); fe(c);
      c.beginPath(); circ(c, 0.05, -0.05, 0.025); fz(c);
    },
    crow: function (c) {
      c.beginPath();
      ell(c, 0.0, 0.05, 0.26, 0.15, -0.25);
      circ(c, 0.24, -0.15, 0.11);
      fz(c);
      c.beginPath(); poly(c, [0.33, -0.19, 0.5, -0.13, 0.33, -0.1]); fz(c);
      c.beginPath(); poly(c, [-0.18, 0.06, -0.5, 0.2, -0.46, 0.08, -0.2, -0.04]); fz(c);
      c.beginPath(); poly(c, [-0.08, -0.04, 0.12, 0.0, -0.02, 0.18, -0.3, 0.12]); fz(c);
      line(c, 0.02, 0.18, -0.02, 0.4, 0.035);
      line(c, 0.1, 0.17, 0.1, 0.4, 0.035);
      line(c, -0.08, 0.4, 0.18, 0.4, 0.03);
    },
    cat: function (c) {
      c.beginPath(); poly(c, [-0.34, -0.1, -0.3, -0.46, -0.06, -0.26]); poly(c, [0.34, -0.1, 0.3, -0.46, 0.06, -0.26]); fz(c);
      c.beginPath();
      ell(c, 0, 0.02, 0.36, 0.32, 0);
      ell(c, -0.13, -0.02, 0.06, 0.08, 0); ell(c, 0.13, -0.02, 0.06, 0.08, 0);
      poly(c, [-0.04, 0.1, 0.04, 0.1, 0, 0.15]);
      fe(c);
      c.beginPath();
      mv(c, -0.3, 0.12); ln(c, -0.5, 0.08); mv(c, -0.3, 0.17); ln(c, -0.5, 0.2);
      mv(c, 0.3, 0.12); ln(c, 0.5, 0.08); mv(c, 0.3, 0.17); ln(c, 0.5, 0.2);
      st(c, 0.025);
    },
    speaker: function (c) {
      c.beginPath(); rrect(c, -0.32, -0.46, 0.64, 0.92, 0.04); st(c, 0.06);
      c.beginPath(); circ(c, 0, -0.2, 0.17); circ(c, 0, 0.2, 0.17); st(c, 0.05);
      c.beginPath(); circ(c, 0, -0.2, 0.06); circ(c, 0, 0.2, 0.06); fz(c);
    },
    cassette: function (c) {
      c.beginPath(); rrect(c, -0.48, -0.3, 0.96, 0.6, 0.05);
      rrect(c, -0.36, -0.22, 0.72, 0.3, 0.03);
      fe(c);
      c.beginPath(); circ(c, -0.17, -0.07, 0.07); circ(c, 0.17, -0.07, 0.07); st(c, 0.035);
      c.beginPath(); poly(c, [-0.26, 0.3, -0.2, 0.18, 0.2, 0.18, 0.26, 0.3]); st(c, 0.035);
    },
    record: function (c) {
      c.beginPath();
      circ(c, 0, 0, 0.48); circ(c, 0, 0, 0.4); circ(c, 0, 0, 0.385); circ(c, 0, 0, 0.3); circ(c, 0, 0, 0.29);
      circ(c, 0, 0, 0.16);
      fe(c);
      c.beginPath(); circ(c, 0, 0, 0.03); fz(c);
    },
    safetyPin: function (c) {
      c.beginPath();
      mv(c, -0.32, -0.12); ln(c, 0.34, -0.12);
      mv(c, -0.32, 0.06); ln(c, 0.4, -0.08);
      st(c, 0.04);
      c.beginPath(); c.moveTo(-0.32, -0.12); c.arc(-0.32, -0.03, 0.09, -Math.PI / 2, Math.PI / 2, true); st(c, 0.04);
      c.beginPath(); circ(c, -0.32, -0.03, 0.035); st(c, 0.03);
      c.beginPath(); rrect(c, 0.3, -0.18, 0.18, 0.13, 0.03); fz(c);
    },
    barbedWire: function (c) {
      var k, x, y1, y2;
      c.beginPath();
      for (k = 0; k <= 40; k++) { x = -0.5 + k / 40; y1 = Math.sin(k / 40 * TAU * 3) * 0.04; if (k) ln(c, x, y1); else mv(c, x, y1); }
      st(c, 0.025);
      c.beginPath();
      for (k = 0; k <= 40; k++) { x = -0.5 + k / 40; y2 = -Math.sin(k / 40 * TAU * 3) * 0.04; if (k) ln(c, x, y2); else mv(c, x, y2); }
      st(c, 0.025);
      c.beginPath();
      for (k = 0; k < 5; k++) {
        x = -0.4 + k * 0.2;
        mv(c, x - 0.06, -0.08); ln(c, x + 0.06, 0.08); mv(c, x + 0.06, -0.08); ln(c, x - 0.06, 0.08);
      }
      st(c, 0.03);
    },
    checker: function (c) {
      c.beginPath();
      for (var row = 0; row < 2; row++) {
        for (var i = 0; i < 8; i++) if ((i + row) % 2 === 0) c.rect(-0.5 + i * 0.125, -0.125 + row * 0.125, 0.125, 0.125);
      }
      fz(c);
      c.beginPath(); c.rect(-0.5, -0.125, 1, 0.25); st(c, 0.02, 'butt');
    },
    waves: function (c) {
      for (var row = 0; row < 4; row++) {
        var y = -0.33 + row * 0.22;
        c.beginPath();
        mv(c, -0.5, y);
        for (var k = 0; k < 4; k++) {
          var x0 = -0.5 + k * 0.25;
          qd(c, x0 + 0.0625, y - 0.1, x0 + 0.125, y); qd(c, x0 + 0.1875, y + 0.1, x0 + 0.25, y);
        }
        st(c, 0.05);
      }
    },
    sun: function (c, r) {
      var n = r.pick([10, 12, 16]);
      c.beginPath(); circ(c, 0, 0, 0.2); fz(c);
      c.beginPath();
      for (var i = 0; i < n; i++) {
        var a = i * TAU / n, a1 = a - 0.12, a2 = a + 0.12;
        mv(c, Math.cos(a1) * 0.26, Math.sin(a1) * 0.26); ln(c, Math.cos(a) * 0.5, Math.sin(a) * 0.5);
        ln(c, Math.cos(a2) * 0.26, Math.sin(a2) * 0.26); c.closePath();
      }
      fz(c);
    },
    flower: function (c, r) {
      var n = r.int(5, 7);
      c.beginPath();
      for (var i = 0; i < n; i++) {
        var a = i * TAU / n;
        ell(c, Math.cos(a) * 0.27, Math.sin(a) * 0.27, 0.2, 0.11, a);
      }
      st(c, 0.045);
      c.beginPath(); circ(c, 0, 0, 0.1); fz(c);
    },
    hurricane: function (c) {
      c.beginPath(); circ(c, 0, 0, 0.15); circ(c, 0, 0, 0.065); fe(c);
      for (var s = 0; s < 2; s++) {
        c.save(); c.rotate(s * Math.PI);
        c.beginPath();
        mv(c, -0.13, -0.08); qd(c, -0.12, -0.42, 0.3, -0.46); qd(c, 0.04, -0.34, 0.14, -0.06); c.closePath();
        fz(c);
        c.restore();
      }
    },
    anchor: function (c) {
      c.beginPath(); circ(c, 0, -0.38, 0.08); st(c, 0.05);
      line(c, 0, -0.3, 0, 0.42, 0.07, 'butt');
      line(c, -0.2, -0.18, 0.2, -0.18, 0.06);
      c.beginPath(); c.moveTo(-0.34, 0.12); c.arc(0, 0.12, 0.34, Math.PI, 0, true); st(c, 0.06);
      c.beginPath(); poly(c, [-0.34, 0.02, -0.44, 0.18, -0.26, 0.16]); poly(c, [0.34, 0.02, 0.44, 0.18, 0.26, 0.16]); fz(c);
    },
    oyster: function (c, r) {
      var pts = [], k, n = 18;
      for (k = 0; k < n; k++) {
        var a = k * TAU / n, rr = 0.42 + r.range(-0.06, 0.05);
        pts.push({ a: a, r: rr });
      }
      for (var ring = 0; ring < 4; ring++) {
        var f = 1 - ring * 0.22;
        c.beginPath();
        for (k = 0; k <= n; k++) {
          var p = pts[k % n], x = Math.cos(p.a) * p.r * f * 0.95, y = Math.sin(p.a) * p.r * f * 0.75 + (1 - f) * 0.12;
          if (k) ln(c, x, y); else mv(c, x, y);
        }
        c.closePath();
        st(c, ring ? 0.03 : 0.055);
      }
      c.beginPath(); ell(c, 0.02, 0.18, 0.05, 0.035, 0); fz(c);
    },
    mullet: function (c) {
      c.beginPath(); ell(c, 0.02, 0.06, 0.34, 0.18, 0); st(c, 0.045);
      c.beginPath(); poly(c, [0.34, 0.06, 0.5, -0.1, 0.5, 0.22]); st(c, 0.045);
      c.beginPath(); circ(c, -0.2, 0.02, 0.035); fz(c);
      c.beginPath(); mv(c, -0.32, 0.1); qd(c, -0.25, 0.14, -0.2, 0.12); st(c, 0.03);
      /* the haircut: short on the brow, long down the back */
      c.beginPath();
      mv(c, -0.3, -0.04); qd(c, -0.28, -0.2, -0.12, -0.16); ln(c, -0.08, -0.22); ln(c, -0.04, -0.15);
      ln(c, 0.0, -0.2); ln(c, 0.04, -0.12); qd(c, 0.12, -0.06, 0.26, -0.02); ln(c, 0.18, -0.06); ln(c, 0.28, 0.06);
      ln(c, 0.14, -0.02); ln(c, 0.2, 0.06); qd(c, 0.02, -0.06, -0.14, -0.08); qd(c, -0.24, -0.08, -0.3, -0.04);
      c.closePath(); fz(c);
    },
    palm: function (c, r) {
      c.beginPath(); mv(c, -0.06, 0.5); qd(c, 0.02, 0.0, -0.02, -0.26); ln(c, 0.03, -0.26); qd(c, 0.08, 0.0, 0.05, 0.5); c.closePath(); fz(c);
      var n = r.int(6, 8);
      for (var i = 0; i < n; i++) {
        var a = Math.PI + (i + 0.5) * Math.PI / n, ex = Math.cos(a) * 0.46, ey = Math.sin(a) * 0.3 - 0.18;
        c.beginPath(); mv(c, 0.0, -0.26); qd(c, ex * 0.6, ey - 0.12, ex, ey + 0.12); st(c, 0.05);
      }
    },
    pineCone: function (c) {
      c.beginPath(); mv(c, 0, -0.48); bz(c, 0.36, -0.3, 0.32, 0.36, 0, 0.48); bz(c, -0.32, 0.36, -0.36, -0.3, 0, -0.48); c.closePath(); st(c, 0.05);
      c.beginPath();
      for (var row = 0; row < 6; row++) {
        var y = -0.32 + row * 0.13, half = 0.12 + Math.sin((row + 1) / 7 * Math.PI) * 0.14, cnt = row % 2 ? 3 : 2;
        for (var k = 0; k < cnt; k++) {
          var x = -half + (k + 0.5) * (2 * half / cnt);
          c.moveTo(x - 0.07, y); c.quadraticCurveTo(x, y + 0.11, x + 0.07, y);
        }
      }
      st(c, 0.03);
    },
    routeShield: function (c, r, o) {
      var us = /^US/i.test(String(o.text || ''));
      c.beginPath();
      if (us) {
        mv(c, -0.38, -0.42); ln(c, 0.38, -0.42); qd(c, 0.46, -0.1, 0.36, 0.14); qd(c, 0.2, 0.44, 0, 0.48);
        qd(c, -0.2, 0.44, -0.36, 0.14); qd(c, -0.46, -0.1, -0.38, -0.42); c.closePath();
        st(c, 0.06);
      } else {
        mv(c, -0.4, -0.42); qd(c, -0.2, -0.36, 0, -0.44); qd(c, 0.2, -0.36, 0.4, -0.42);
        qd(c, 0.5, 0.1, 0, 0.48); qd(c, -0.5, 0.1, -0.4, -0.42); c.closePath();
        st(c, 0.06);
        c.beginPath(); mv(c, -0.4, -0.42); qd(c, -0.2, -0.36, 0, -0.44); qd(c, 0.2, -0.36, 0.4, -0.42);
        ln(c, 0.43, -0.22); ln(c, -0.43, -0.22); c.closePath(); fz(c);
      }
      var num = String(o.text || '').replace(/^(I|US|SR|HWY|STATE)[\s-]*/i, '');
      if (num) motifText(c, num, 0, us ? 0.02 : 0.1, 0.3, o.ink);
    },
    bridgeTruss: function (c) {
      line(c, -0.5, 0.2, 0.5, 0.2, 0.06, 'butt');
      line(c, -0.42, -0.16, 0.42, -0.16, 0.05, 'butt');
      c.beginPath();
      for (var i = 0; i < 6; i++) {
        var x0 = -0.42 + i * 0.14, x1 = x0 + 0.14;
        mv(c, x0, -0.16); ln(c, x0, 0.2);
        mv(c, x0, -0.16); ln(c, x1, 0.2); mv(c, x1, -0.16); ln(c, x0, 0.2);
      }
      mv(c, 0.42, -0.16); ln(c, 0.42, 0.2);
      mv(c, -0.42, -0.16); ln(c, -0.5, 0.2); mv(c, 0.42, -0.16); ln(c, 0.5, 0.2);
      st(c, 0.025);
      c.beginPath(); c.rect(-0.3, 0.2, 0.06, 0.28); c.rect(0.24, 0.2, 0.06, 0.28); fz(c);
    },
    jet: function (c) {
      c.beginPath();
      poly(c, [-0.5, 0.0, -0.4, -0.05, 0.36, -0.05, 0.5, 0.0, 0.36, 0.05, -0.4, 0.05]);
      fz(c);
      c.beginPath(); poly(c, [-0.05, -0.04, 0.2, -0.04, -0.14, -0.38, -0.24, -0.38]); poly(c, [-0.05, 0.04, 0.2, 0.04, -0.14, 0.38, -0.24, 0.38]); fz(c);
      c.beginPath(); poly(c, [-0.4, -0.04, -0.3, -0.04, -0.42, -0.2, -0.48, -0.2]); poly(c, [-0.4, 0.04, -0.3, 0.04, -0.42, 0.2, -0.48, 0.2]); fz(c);
    },
    heart: function (c) {
      c.beginPath(); mv(c, 0, 0.44);
      bz(c, -0.6, 0.0, -0.36, -0.52, 0, -0.22);
      bz(c, 0.36, -0.52, 0.6, 0.0, 0, 0.44);
      c.closePath(); fz(c);
    },
    flame: function (c) {
      c.beginPath();
      mv(c, 0, 0.48); bz(c, -0.4, 0.46, -0.36, 0.0, -0.22, -0.18); qd(c, -0.2, 0.0, -0.1, 0.02);
      qd(c, -0.16, -0.3, 0.02, -0.5); qd(c, 0.0, -0.22, 0.14, -0.12); qd(c, 0.18, -0.24, 0.26, -0.3);
      bz(c, 0.42, 0.0, 0.38, 0.46, 0, 0.48); c.closePath();
      mv(c, 0, 0.4); bz(c, -0.18, 0.4, -0.16, 0.16, -0.04, 0.02); qd(c, 0.02, 0.18, 0.1, 0.12); bz(c, 0.2, 0.26, 0.16, 0.4, 0, 0.4); c.closePath();
      fe(c);
    },
    snowflake: function (c) {
      c.beginPath();
      for (var i = 0; i < 6; i++) {
        var a = i * Math.PI / 3, ca = Math.cos(a), sa = Math.sin(a);
        mv(c, 0, 0); ln(c, ca * 0.48, sa * 0.48);
        [0.22, 0.36].forEach(function (d) {
          var bx = ca * d, by = sa * d, b1 = a + 0.8, b2 = a - 0.8, L = 0.12;
          mv(c, bx, by); ln(c, bx + Math.cos(b1) * L, by + Math.sin(b1) * L);
          mv(c, bx, by); ln(c, bx + Math.cos(b2) * L, by + Math.sin(b2) * L);
        });
      }
      st(c, 0.045);
    },
    cactus: function (c) {
      line(c, 0, 0.46, 0, -0.38, 0.18);
      c.beginPath(); mv(c, -0.06, 0.08); ln(c, -0.28, 0.08); ln(c, -0.28, -0.2); st(c, 0.13);
      c.beginPath(); mv(c, 0.06, -0.04); ln(c, 0.27, -0.04); ln(c, 0.27, -0.28); st(c, 0.13);
      line(c, -0.4, 0.48, 0.4, 0.48, 0.04);
    },
    mountain: function (c) {
      c.beginPath();
      poly(c, [-0.5, 0.4, -0.12, -0.36, 0.1, 0.06, 0.24, -0.14, 0.5, 0.4]);
      poly(c, [-0.12, -0.36, -0.22, -0.16, -0.16, -0.2, -0.12, -0.12, -0.07, -0.2, -0.02, -0.16]);
      fe(c);
    },
    smokestack: function (c, r) {
      c.beginPath(); poly(c, [-0.1, 0.48, -0.06, -0.2, 0.06, -0.2, 0.1, 0.48]); fz(c);
      c.beginPath(); c.rect(-0.3, 0.2, 0.18, 0.28); c.rect(0.12, 0.26, 0.24, 0.22); fz(c);
      c.beginPath();
      var x = 0, y = -0.28;
      for (var i = 0; i < 4; i++) {
        var rr = 0.06 + i * 0.025;
        circ(c, x + r.range(-0.02, 0.02), y, rr);
        x += 0.09; y -= 0.06;
      }
      st(c, 0.035);
    },
    corn: function (c) {
      c.beginPath();
      ell(c, 0.02, -0.08, 0.15, 0.38, 0.12);
      for (var row = 0; row < 6; row++) {
        for (var k = -1; k <= 1; k++) ell(c, k * 0.07 + 0.02 - (row - 2.5) * 0.045 * 0.12 * 2, -0.33 + row * 0.1, 0.022, 0.03, 0);
      }
      fe(c);
      c.beginPath(); mv(c, 0.0, 0.48); qd(c, -0.3, 0.2, -0.24, -0.2); mv(c, 0.04, 0.48); qd(c, 0.34, 0.24, 0.24, -0.1);
      st(c, 0.05);
    },
    gear: function (c, r) {
      var n = r.int(8, 10), pts = [];
      for (var i = 0; i < n; i++) {
        var a = i * TAU / n, w = Math.PI / n * 0.5;
        pts.push(Math.cos(a - w * 1.4) * 0.38, Math.sin(a - w * 1.4) * 0.38,
                 Math.cos(a - w) * 0.49, Math.sin(a - w) * 0.49,
                 Math.cos(a + w) * 0.49, Math.sin(a + w) * 0.49,
                 Math.cos(a + w * 1.4) * 0.38, Math.sin(a + w * 1.4) * 0.38);
      }
      c.beginPath(); poly(c, pts); circ(c, 0, 0, 0.14); fe(c);
    }
  };

  /** Draw.motif(ctx, id, x, y, size, opts). opts = { rng, ink, rotate (degrees), rough, text, paper }.
   *  // SPEC? rotate is taken in degrees (art.md speaks in degrees everywhere). text is an extra: the route number of
   *  routeShield or the lettering inside a starburst; paper is the color of that lettering. Unknown ids draw nothing. */
  function motif(ctx, id, x, y, size, opts) {
    var fn = MOTIFS[id];
    if (!fn || !ctx || !(size > 0)) return;
    opts = opts || {};
    var r = rngOf(opts, 'motif:' + id), ink = col(opts.ink, '#1A1A1A');
    ctx.save();
    ctx.translate(x, y);
    if (opts.rotate) ctx.rotate(deg(opts.rotate));
    ctx.scale(size, size);
    ctx.fillStyle = ink;
    ctx.strokeStyle = ink;
    J = opts.rough ? 0.012 * (opts.rough === true ? 1 : clamp(+opts.rough || 0, 0, 3)) : 0;
    JR = r;
    try {
      fn(ctx, r, { text: opts.text || '', ink: ink, paper: col(opts.paper, '#F7F6F1') });
    } finally {
      J = 0; JR = null;
      ctx.restore();
    }
  }

  /* ---------------- pictures: painted into the box in two inks on the paper ---------------- */

  function lg(ctx, x0, y0, x1, y1, stops) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    return g;
  }
  function rg(ctx, x, y, r0, r1, stops) {
    var g = ctx.createRadialGradient(x, y, r0, x, y, r1);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    return g;
  }
  function fillWith(ctx, style, alpha) {
    var a0 = ctx.globalAlpha;
    ctx.fillStyle = style;
    if (alpha !== undefined) ctx.globalAlpha = a0 * alpha;
    ctx.fill();
    ctx.globalAlpha = a0;
  }
  function strokeWith(ctx, style, w, alpha, cap) {
    var a0 = ctx.globalAlpha;
    ctx.strokeStyle = style; ctx.lineWidth = w; ctx.lineCap = cap || 'round'; ctx.lineJoin = 'round';
    if (alpha !== undefined) ctx.globalAlpha = a0 * alpha;
    ctx.stroke();
    ctx.globalAlpha = a0;
  }
  function capsule(ctx, x1, y1, x2, y2, w, style, alpha) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); strokeWith(ctx, style, w, alpha, 'round');
  }
  function sky(ctx, w, h, A, top, bottom, horizon) {
    ctx.beginPath(); ctx.rect(0, 0, w, h * horizon);
    fillWith(ctx, lg(ctx, 0, 0, 0, h * horizon, [[0, rgba(A, top)], [1, rgba(A, bottom)]]));
  }
  function bands(ctx, w, h, y0, A, n, r, alpha) {
    for (var i = 0; i < n; i++) {
      var y = y0 + (h - y0) * (i + 0.5) / n, x = r.range(-w * 0.1, w * 0.3);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + r.range(w * 0.3, w * 0.9), y);
      strokeWith(ctx, A, Math.max(1, (h - y0) / n * r.range(0.15, 0.4)), alpha);
    }
  }
  function figure(ctx, cx, cy, s, A, pose) {
    /* a jointed silhouette from capsules: head, torso, arms, legs. s is the figure's height. */
    var hw = s * 0.09;
    ctx.beginPath(); circ(ctx, cx, cy - s * 0.42, s * 0.08); fillWith(ctx, A);
    capsule(ctx, cx, cy - s * 0.32, cx + pose.lean * s, cy, hw * 1.6, A);
    capsule(ctx, cx, cy - s * 0.28, cx + pose.a1x * s, cy + pose.a1y * s, hw, A);
    capsule(ctx, cx, cy - s * 0.28, cx + pose.a2x * s, cy + pose.a2y * s, hw, A);
    capsule(ctx, cx + pose.lean * s, cy, cx + pose.l1x * s, cy + pose.l1y * s, hw * 1.1, A);
    capsule(ctx, cx + pose.lean * s, cy, cx + pose.l2x * s, cy + pose.l2y * s, hw * 1.1, A);
  }
  function stormy(month) { return month >= 8 && month <= 10; }
  function wintry(month) { return month === 12 || month <= 2; }

  var PICTURES = {
    crowd: function (ctx, r, w, h, A, B, P) {
      ctx.beginPath(); ctx.rect(0, 0, w, h);
      fillWith(ctx, lg(ctx, 0, 0, 0, h, [[0, rgba(A, 0.05)], [0.5, rgba(A, 0.35)], [1, rgba(A, 0.85)]]));
      ctx.beginPath(); ctx.moveTo(w * 0.5, -h * 0.1); ctx.lineTo(w * 0.15, h); ctx.lineTo(w * 0.85, h); ctx.closePath();
      fillWith(ctx, rgba(P, 0.25));
      var total = r.int(30, 60), rows = [0.42, 0.62, 0.86], sizes = [0.05, 0.075, 0.11], alphas = [0.45, 0.7, 1];
      var arms = r.int(3, 8);
      for (var row = 0; row < 3; row++) {
        var n = Math.round(total * [0.42, 0.33, 0.25][row]), hr = Math.min(w, h) * sizes[row];
        for (var i = 0; i < n; i++) {
          var cx = (i + r.range(0.1, 0.9)) * w / n, cy = h * rows[row] + r.range(-hr, hr) * 0.6;
          if (row === 2 && arms > 0 && r.chance(0.35)) {
            arms--;
            var ax = cx + r.range(-hr, hr) * 1.5;
            capsule(ctx, cx + hr * 0.6, cy + hr * 1.2, ax, cy - hr * r.range(2.4, 3.6), hr * 0.42, A, alphas[row]);
            ctx.beginPath(); circ(ctx, ax, cy - hr * 3.6, hr * 0.3); fillWith(ctx, A, alphas[row]);
          }
          ctx.beginPath(); rrect(ctx, cx - hr * 1.5, cy + hr * 0.7, hr * 3, hr * 3, hr * 0.9); fillWith(ctx, A, alphas[row]);
          ctx.beginPath(); ell(ctx, cx, cy, hr * 0.85, hr, 0);
          fillWith(ctx, rg(ctx, cx - hr * 0.2, cy - hr * 0.4, hr * 0.1, hr * 1.1, [[0, rgba(A, 0.55 * alphas[row])], [1, rgba(A, alphas[row])]]));
        }
      }
      if (B) { ctx.beginPath(); ctx.rect(0, 0, w, h * 0.12); fillWith(ctx, rgba(B, 0.35)); }
    },
    van: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.35, 0.05, 0.75);
      ctx.beginPath(); ctx.rect(0, h * 0.75, w, h * 0.25); fillWith(ctx, rgba(A, 0.25));
      var vx = w * r.range(0.12, 0.2), vw = w * 0.66, vy = h * 0.34, vh = h * 0.36;
      ctx.beginPath(); ell(ctx, vx + vw / 2, h * 0.8, vw * 0.6, h * 0.04, 0); fillWith(ctx, A, 0.4);
      ctx.beginPath();
      ctx.moveTo(vx, vy + vh); ctx.lineTo(vx, vy + vh * 0.12); ctx.quadraticCurveTo(vx, vy, vx + vw * 0.05, vy);
      ctx.lineTo(vx + vw * 0.78, vy); ctx.lineTo(vx + vw * 0.96, vy + vh * 0.42); ctx.quadraticCurveTo(vx + vw, vy + vh * 0.5, vx + vw, vy + vh * 0.6);
      ctx.lineTo(vx + vw, vy + vh); ctx.closePath();
      fillWith(ctx, A);
      ctx.beginPath(); ctx.rect(vx + vw * 0.06, vy + vh * 0.12, vw * 0.6, vh * 0.26); fillWith(ctx, P, 0.8);
      ctx.beginPath(); ctx.moveTo(vx + vw * 0.7, vy + vh * 0.12); ctx.lineTo(vx + vw * 0.79, vy + vh * 0.12); ctx.lineTo(vx + vw * 0.9, vy + vh * 0.4); ctx.lineTo(vx + vw * 0.7, vy + vh * 0.4); ctx.closePath();
      fillWith(ctx, P, 0.65);
      if (B) { ctx.beginPath(); ctx.rect(vx, vy + vh * 0.55, vw, vh * 0.08); fillWith(ctx, B, 0.9); }
      for (var k = 0; k < 4; k++) { ctx.beginPath(); ctx.rect(vx + vw * (0.1 + k * 0.15), vy - vh * 0.1, vw * 0.11, vh * 0.1); fillWith(ctx, A, 0.85); }
      [0.2, 0.8].forEach(function (f) {
        var wx = vx + vw * f, wy = vy + vh, wr = vh * 0.24;
        ctx.beginPath(); circ(ctx, wx, wy, wr); fillWith(ctx, A);
        ctx.beginPath(); circ(ctx, wx, wy, wr * 0.4); fillWith(ctx, P, 0.7);
      });
    },
    carport: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.9, 0.5, 1);
      ctx.beginPath(); circ(ctx, w * r.range(0.65, 0.85), h * 0.16, Math.min(w, h) * 0.06); fillWith(ctx, P, 0.85);
      var gy = h * 0.82;
      ctx.beginPath(); ctx.rect(w * 0.08, h * 0.5, w * 0.5, gy - h * 0.5); fillWith(ctx, A);
      ctx.beginPath(); ctx.moveTo(w * 0.04, h * 0.5); ctx.lineTo(w * 0.33, h * 0.38); ctx.lineTo(w * 0.62, h * 0.5); ctx.closePath(); fillWith(ctx, A);
      ctx.beginPath(); ctx.rect(w * 0.14, h * 0.58, w * 0.08, h * 0.08); ctx.rect(w * 0.42, h * 0.58, w * 0.08, h * 0.08); fillWith(ctx, B || P, 0.9);
      ctx.beginPath(); ctx.rect(w * 0.56, h * 0.53, w * 0.4, h * 0.035); fillWith(ctx, A);
      ctx.beginPath(); ctx.rect(w * 0.93, h * 0.53, w * 0.015, gy - h * 0.53); ctx.rect(w * 0.74, h * 0.53, w * 0.015, gy - h * 0.53); fillWith(ctx, A);
      var n = r.int(8, 14);
      for (var i = 0; i < n; i++) {
        var t = i / (n - 1), lx = w * (0.58 + t * 0.36), ly = h * 0.575 + Math.sin(t * Math.PI) * h * 0.04;
        ctx.beginPath(); circ(ctx, lx, ly, Math.min(w, h) * 0.022); fillWith(ctx, rg(ctx, lx, ly, 0, Math.min(w, h) * 0.022, [[0, B || P], [1, rgba(B || P, 0)]]));
        ctx.beginPath(); circ(ctx, lx, ly, Math.min(w, h) * 0.007); fillWith(ctx, P);
      }
      ctx.beginPath(); ctx.rect(0, gy, w, h - gy); fillWith(ctx, A);
      for (var f = 0; f < 6; f++) figure(ctx, w * (0.64 + f * 0.05), gy - h * 0.02, h * r.range(0.13, 0.17), A, { lean: 0, a1x: -0.08, a1y: -0.05, a2x: 0.08, a2y: -0.03, l1x: -0.04, l1y: 0.14, l2x: 0.04, l2y: 0.14 });
    },
    palmSky: function (ctx, r, w, h, A, B, P, month) {
      sky(ctx, w, h, A, 0.25, 0.02, 0.85);
      if (stormy(month)) {
        for (var k = 0; k < 18; k++) { ctx.beginPath(); ell(ctx, r.range(0, w), r.range(0, h * 0.35), r.range(w * 0.08, w * 0.2), r.range(h * 0.04, h * 0.09), 0); fillWith(ctx, A, r.range(0.15, 0.35)); }
      } else {
        var sx = w * r.range(0.3, 0.7), sy = h * r.range(0.3, 0.45), sr = Math.min(w, h) * 0.17;
        ctx.beginPath(); circ(ctx, sx, sy, sr); fillWith(ctx, B || A, B ? 0.95 : 0.35);
        for (var s = 0; s < 5; s++) { ctx.beginPath(); ctx.rect(sx - sr, sy + sr * (0.2 + s * 0.17), sr * 2, sr * 0.06); fillWith(ctx, P); }
      }
      ctx.beginPath(); ctx.rect(0, h * 0.85, w, h * 0.15); fillWith(ctx, A);
      var trunks = r.int(1, 3);
      for (var t = 0; t < trunks; t++) {
        var bx = w * (0.15 + t * 0.32 + r.range(0, 0.08)), top = h * r.range(0.12, 0.3), lean = w * r.range(-0.12, 0.12), tw = w * 0.02;
        ctx.beginPath(); ctx.moveTo(bx - tw, h * 0.86);
        ctx.quadraticCurveTo(bx + lean * 0.3 - tw * 0.5, h * 0.5, bx + lean - tw * 0.5, top);
        ctx.lineTo(bx + lean + tw * 0.5, top);
        ctx.quadraticCurveTo(bx + lean * 0.3 + tw * 0.5, h * 0.5, bx + tw, h * 0.86); ctx.closePath(); fillWith(ctx, A);
        for (var m = 1; m < 10; m++) {
          var f = m / 10, mx = bx + lean * f * f, my = h * 0.86 - (h * 0.86 - top) * f;
          ctx.beginPath(); ctx.moveTo(mx - tw, my); ctx.lineTo(mx + tw, my); strokeWith(ctx, P, 1, 0.6, 'butt');
        }
        var fronds = r.int(9, 14), cx = bx + lean, cy = top;
        for (var q = 0; q < fronds; q++) {
          var a = -Math.PI + (q + 0.5) * Math.PI * 1.25 / fronds - Math.PI * 0.12, L = Math.min(w, h) * r.range(0.16, 0.26);
          var ex = cx + Math.cos(a) * L, ey = cy + Math.sin(a) * L * 0.6 + L * 0.35;
          for (var seg = 0; seg < 3; seg++) {
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.quadraticCurveTo(cx + Math.cos(a) * L * 0.6, cy + Math.sin(a) * L * 0.7 - L * 0.1, ex, ey + seg * 2);
            strokeWith(ctx, A, Math.max(1, (3 - seg) * Math.min(w, h) * 0.006));
          }
        }
      }
    },
    bridgeSpan: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.3, 0.05, 0.55);
      ctx.beginPath(); ctx.rect(0, h * 0.55, w, h * 0.45); fillWith(ctx, A, 0.15);
      bands(ctx, w, h, h * 0.58, A, 14, r, 0.45);
      var yL = h * 0.78, yR = h * 0.5, thickL = h * 0.06, thickR = h * 0.008;
      function at(t) { return { x: w * (-0.05 + t * 1.1), y: yL + (yR - yL) * t, k: 1 - t * 0.9 }; }
      ctx.beginPath(); ctx.moveTo(-w * 0.05, yL); ctx.lineTo(w * 1.05, yR); ctx.lineTo(w * 1.05, yR + thickR); ctx.lineTo(-w * 0.05, yL + thickL); ctx.closePath(); fillWith(ctx, A);
      var t = 0, step = 0.11;
      ctx.beginPath();
      while (t < 1) {
        var p0 = at(t), p1 = at(Math.min(1, t + step)), h0 = h * 0.2 * p0.k, h1 = h * 0.2 * p1.k;
        ctx.moveTo(p0.x, p0.y); ctx.lineTo(p0.x, p0.y - h0);
        ctx.moveTo(p0.x, p0.y - h0); ctx.lineTo(p1.x, p1.y - h1);
        ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y - h1);
        ctx.moveTo(p0.x, p0.y - h0); ctx.lineTo(p1.x, p1.y);
        t += step; step = Math.max(0.025, step * 0.9);
      }
      strokeWith(ctx, A, Math.max(1, h * 0.008), 1, 'butt');
      for (var pi = 0; pi < 6; pi++) {
        var pp = at(pi * 0.16 + 0.04);
        ctx.beginPath(); ctx.rect(pp.x - w * 0.012 * pp.k, pp.y, w * 0.024 * pp.k, h * 0.25 * pp.k); fillWith(ctx, A, 0.9);
      }
      if (B) { ctx.beginPath(); circ(ctx, w * 0.8, h * 0.22, Math.min(w, h) * 0.08); fillWith(ctx, B, 0.85); }
    },
    skateRamp: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.2, 0.0, 1);
      var x0 = w * 0.3, y0 = h * 0.9, R = Math.min(w * 0.7, h * 0.55);
      ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(w - R, y0);
      ctx.arc(w - R, y0 - R, R, Math.PI / 2, 0, true);
      ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); fillWith(ctx, A, 0.85);
      ctx.beginPath(); ctx.rect(w - R * 0.06, y0 - R - h * 0.02, R * 0.06, h * 0.02); fillWith(ctx, B || A);
      ctx.beginPath(); ctx.moveTo(w - R * 0.15, y0 - R); ctx.lineTo(w, y0 - R); strokeWith(ctx, B || P, Math.max(2, h * 0.015));
      var fx = w * r.range(0.45, 0.6), fy = h * r.range(0.25, 0.35), s = h * 0.32;
      ctx.save(); ctx.translate(fx, fy); ctx.rotate(r.range(-0.5, 0.3));
      figure(ctx, 0, 0, s, A, { lean: -0.05, a1x: -0.25, a1y: -0.2, a2x: 0.22, a2y: -0.08, l1x: -0.12, l1y: 0.16, l2x: 0.1, l2y: 0.12 });
      ctx.beginPath(); rrect(ctx, -s * 0.25, s * 0.16, s * 0.5, s * 0.05, s * 0.02); fillWith(ctx, A);
      ctx.restore();
      void x0;
    },
    guitarist: function (ctx, r, w, h, A, B, P) {
      ctx.beginPath(); ctx.rect(0, 0, w, h); fillWith(ctx, A, 0.85);
      var cx = w * r.range(0.4, 0.6);
      ctx.beginPath(); ctx.moveTo(cx - w * 0.04, 0); ctx.lineTo(cx + w * 0.04, 0); ctx.lineTo(cx + w * 0.38, h); ctx.lineTo(cx - w * 0.38, h); ctx.closePath();
      fillWith(ctx, lg(ctx, 0, 0, 0, h, [[0, rgba(P, 0.85)], [1, rgba(P, 0.35)]]));
      var s = h * 0.75, fy = h * 0.6, flip = r.chance(0.5) ? 1 : -1;
      figure(ctx, cx, fy, s, A, { lean: 0.02 * flip, a1x: 0.14 * flip, a1y: -0.06, a2x: -0.1 * flip, a2y: -0.02, l1x: -0.1, l1y: 0.38, l2x: 0.1, l2y: 0.38 });
      ctx.save(); ctx.translate(cx, fy - s * 0.1); ctx.rotate(-0.35 * flip);
      ctx.beginPath(); ell(ctx, -s * 0.02 * flip, 0, s * 0.14, s * 0.1, 0); ell(ctx, s * 0.09 * flip, 0, s * 0.1, s * 0.08, 0); fillWith(ctx, B || A);
      ctx.beginPath(); ctx.rect(flip > 0 ? s * 0.15 : -s * 0.55, -s * 0.018, s * 0.4, s * 0.036); fillWith(ctx, A);
      ctx.restore();
      ctx.beginPath(); ctx.rect(0, h * 0.96, w, h * 0.04); fillWith(ctx, A);
    },
    storm: function (ctx, r, w, h, A, B, P) {
      ctx.beginPath(); ctx.rect(0, 0, w, h); fillWith(ctx, lg(ctx, 0, 0, 0, h, [[0, rgba(A, 0.7)], [1, rgba(A, 0.2)]]));
      for (var k = 0; k < 40; k++) {
        ctx.beginPath(); ell(ctx, r.range(-w * 0.1, w * 1.1), r.range(-h * 0.05, h * 0.45), r.range(w * 0.08, w * 0.25), r.range(h * 0.04, h * 0.1), r.range(-0.2, 0.2));
        fillWith(ctx, A, r.range(0.12, 0.35));
      }
      ctx.beginPath(); ctx.rect(0, h * 0.3, w, h * 0.08); fillWith(ctx, A, 0.5);
      var x = w * r.range(0.3, 0.7), y = h * 0.3, pts = [[x, y]];
      while (y < h * 0.9) { x += r.range(-w * 0.07, w * 0.07); y += r.range(h * 0.05, h * 0.11); pts.push([x, y]); }
      [[Math.max(4, w * 0.02), B || P, 0.5], [Math.max(2, w * 0.007), P, 1]].forEach(function (pass) {
        ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
        for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        strokeWith(ctx, pass[1], pass[0], pass[2], 'butt');
      });
      ctx.beginPath();
      for (var q = 0; q < 50; q++) { var rx = r.range(0, w), ry = r.range(h * 0.4, h); ctx.moveTo(rx, ry); ctx.lineTo(rx - w * 0.02, ry + h * 0.05); }
      strokeWith(ctx, A, 1, 0.5);
    },
    bayou: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.2, 0.05, 0.6);
      ctx.beginPath(); ctx.rect(0, h * 0.6, w, h * 0.4); fillWith(ctx, A, 0.3);
      bands(ctx, w, h, h * 0.62, P, 10, r, 0.5);
      var trees = r.int(2, 4);
      for (var t = 0; t < trees; t++) {
        var tx = w * (0.1 + t * 0.8 / trees + r.range(0, 0.1)), tw = w * 0.035, by = h * 0.68;
        ctx.beginPath(); ctx.moveTo(tx - tw * 2.2, by); ctx.quadraticCurveTo(tx - tw * 0.6, by - h * 0.1, tx - tw * 0.5, 0);
        ctx.lineTo(tx + tw * 0.5, 0); ctx.quadraticCurveTo(tx + tw * 0.6, by - h * 0.1, tx + tw * 2.2, by); ctx.closePath(); fillWith(ctx, A);
        for (var kn = 0; kn < 3; kn++) {
          var kx = tx + r.range(-w * 0.12, w * 0.12), kh = h * r.range(0.03, 0.06);
          ctx.beginPath(); ctx.moveTo(kx - w * 0.01, by + h * 0.02); ctx.lineTo(kx, by + h * 0.02 - kh); ctx.lineTo(kx + w * 0.01, by + h * 0.02); ctx.closePath(); fillWith(ctx, A);
        }
      }
      var by0 = h * r.range(0.12, 0.2);
      ctx.beginPath(); ctx.moveTo(-w * 0.05, by0); ctx.quadraticCurveTo(w * 0.4, by0 - h * 0.08, w * 0.85, by0 + h * 0.04);
      strokeWith(ctx, A, Math.max(3, h * 0.025));
      ctx.beginPath();
      for (var m = 0; m < 34; m++) {
        var f = m / 34, mx = -w * 0.05 + f * w * 0.9, my = by0 + (f * f * h * 0.04) - Math.sin(f * Math.PI) * h * 0.04, ml = h * r.range(0.06, 0.2);
        ctx.moveTo(mx, my); ctx.quadraticCurveTo(mx + r.range(-6, 6), my + ml * 0.5, mx + r.range(-4, 4), my + ml);
      }
      strokeWith(ctx, B || A, 1.2, 0.8);
    },
    basement: function (ctx, r, w, h, A, B, P) {
      ctx.beginPath(); ctx.rect(0, 0, w, h); fillWith(ctx, A, 0.8);
      var vx = w * 0.5, vy = h * 0.45;
      ctx.beginPath();
      for (var i = 0; i < 7; i++) { var bx = w * (i / 6); ctx.moveTo(bx, 0); ctx.lineTo(vx + (bx - vx) * 0.3, vy * 0.3); }
      strokeWith(ctx, A, Math.max(2, w * 0.012));
      var lx = vx + w * r.range(-0.2, 0.2), ly = h * 0.2;
      ctx.beginPath(); circ(ctx, lx, ly, Math.min(w, h) * 0.35); fillWith(ctx, rg(ctx, lx, ly, 0, Math.min(w, h) * 0.35, [[0, rgba(P, 0.7)], [1, rgba(P, 0)]]));
      ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx, ly); strokeWith(ctx, A, 1.5);
      ctx.beginPath(); circ(ctx, lx, ly, Math.min(w, h) * 0.025); fillWith(ctx, B || P);
      ctx.beginPath(); ctx.rect(w * 0.08, h * 0.45, w * 0.16, h * 0.22); ctx.rect(w * 0.76, h * 0.42, w * 0.16, h * 0.26); fillWith(ctx, A);
      figure(ctx, w * 0.5, h * 0.58, h * 0.36, A, { lean: 0, a1x: 0.12, a1y: -0.18, a2x: -0.08, a2y: 0.02, l1x: -0.08, l1y: 0.2, l2x: 0.1, l2y: 0.2 });
      for (var k = 0; k < 14; k++) {
        var hx = w * (k + r.range(0, 1)) / 14, hy = h * r.range(0.82, 0.92), hr = Math.min(w, h) * r.range(0.045, 0.06);
        ctx.beginPath(); circ(ctx, hx, hy, hr); rrect(ctx, hx - hr * 1.5, hy + hr * 0.7, hr * 3, hr * 3, hr); fillWith(ctx, A);
      }
    },
    rowhouses: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.25, 0.05, 0.8);
      var n = r.int(5, 8), x = 0, uw = w / n;
      for (var i = 0; i < n; i++) {
        var top = h * r.range(0.2, 0.38), hw = uw * r.range(0.92, 1.08);
        ctx.beginPath(); ctx.rect(x, top, hw + 1, h * 0.86 - top); fillWith(ctx, A, i % 2 ? 0.9 : 1);
        ctx.beginPath(); ctx.rect(x - 2, top - h * 0.02, hw + 4, h * 0.025); fillWith(ctx, A);
        ctx.beginPath();
        for (var fl = 0; fl < 3; fl++) for (var wn = 0; wn < 2; wn++) ctx.rect(x + hw * (0.18 + wn * 0.42), top + h * (0.05 + fl * 0.14), hw * 0.22, h * 0.08);
        fillWith(ctx, i === 2 && B ? B : P, 0.85);
        ctx.beginPath(); ctx.rect(x + hw * 0.36, h * 0.74, hw * 0.26, h * 0.12); fillWith(ctx, P, 0.35);
        for (var s = 0; s < 3; s++) { ctx.beginPath(); ctx.rect(x + hw * (0.3 - s * 0.04), h * (0.86 + s * 0.03), hw * (0.38 + s * 0.08), h * 0.03); fillWith(ctx, A, 0.8 - s * 0.15); }
        x += hw;
      }
    },
    grainElevator: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.3, 0.02, 0.8);
      ctx.beginPath(); ctx.rect(0, h * 0.8, w, h * 0.2); fillWith(ctx, A, 0.3);
      var n = r.int(3, 5), cw = w * 0.1, x0 = w * r.range(0.2, 0.35);
      for (var i = 0; i < n; i++) {
        var cx = x0 + i * cw, top = h * r.range(0.25, 0.32);
        ctx.beginPath(); ctx.rect(cx, top, cw * 0.96, h * 0.8 - top); fillWith(ctx, lg(ctx, cx, 0, cx + cw, 0, [[0, rgba(A, 0.65)], [0.4, rgba(A, 0.95)], [1, rgba(A, 0.75)]]));
        ctx.beginPath(); ell(ctx, cx + cw * 0.48, top, cw * 0.48, cw * 0.12, 0); fillWith(ctx, A);
      }
      var tx = x0 + n * cw;
      ctx.beginPath(); ctx.rect(tx, h * 0.1, w * 0.09, h * 0.7); fillWith(ctx, A);
      ctx.beginPath(); ctx.moveTo(tx - w * 0.01, h * 0.1); ctx.lineTo(tx + w * 0.045, h * 0.04); ctx.lineTo(tx + w * 0.1, h * 0.1); ctx.closePath(); fillWith(ctx, A);
      ctx.beginPath(); ctx.moveTo(tx + w * 0.09, h * 0.2); ctx.lineTo(w, h * 0.55); strokeWith(ctx, A, Math.max(2, w * 0.008));
      ctx.beginPath(); ctx.moveTo(0, h * 0.86); ctx.lineTo(w, h * 0.86); ctx.moveTo(0, h * 0.89); ctx.lineTo(w, h * 0.89); strokeWith(ctx, A, 1.5);
      ctx.beginPath(); for (var t = 0; t < 30; t++) { var rx = t * w / 30; ctx.moveTo(rx, h * 0.855); ctx.lineTo(rx + w * 0.01, h * 0.895); } strokeWith(ctx, A, 1, 0.6);
      if (B) { ctx.beginPath(); circ(ctx, w * 0.85, h * 0.2, Math.min(w, h) * 0.07); fillWith(ctx, B, 0.85); }
    },
    mesa: function (ctx, r, w, h, A, B, P) {
      sky(ctx, w, h, A, 0.15, 0.0, 0.7);
      ctx.beginPath(); circ(ctx, w * r.range(0.2, 0.8), h * 0.3, Math.min(w, h) * 0.14); fillWith(ctx, B || A, B ? 0.9 : 0.3);
      for (var layer = 0; layer < 3; layer++) {
        var base = h * (0.62 + layer * 0.1), top = base - h * (0.22 - layer * 0.05), xa = w * r.range(-0.1, 0.4), xb = xa + w * r.range(0.35, 0.7);
        ctx.beginPath(); ctx.moveTo(xa - w * 0.12, base); ctx.lineTo(xa, top + h * 0.02); ctx.lineTo(xa + w * 0.03, top);
        ctx.lineTo(xb - w * 0.03, top); ctx.lineTo(xb, top + h * 0.03); ctx.lineTo(xb + w * 0.15, base); ctx.closePath();
        fillWith(ctx, A, 0.4 + layer * 0.3);
      }
      ctx.beginPath(); ctx.rect(0, h * 0.85, w, h * 0.15); fillWith(ctx, A);
      var savedJ = J; J = 0;
      ctx.save(); ctx.translate(w * r.range(0.1, 0.9), h * 0.78); ctx.scale(h * 0.18, h * 0.18); ctx.fillStyle = A; ctx.strokeStyle = A;
      MOTIFS.cactus(ctx, r, {});
      ctx.restore(); J = savedJ;
    },
    pines: function (ctx, r, w, h, A, B, P, month) {
      sky(ctx, w, h, A, 0.35, 0.05, 1);
      ctx.beginPath(); circ(ctx, w * r.range(0.6, 0.85), h * 0.16, Math.min(w, h) * 0.07); fillWith(ctx, B || P, 0.9);
      for (var layer = 0; layer < 3; layer++) {
        var n = 6 + layer * 3, alpha = 0.35 + layer * 0.32, base = h * (0.6 + layer * 0.15);
        for (var i = 0; i < n; i++) {
          var tx = w * (i + r.range(0, 1)) / n, th = h * r.range(0.25, 0.4) * (0.7 + layer * 0.2), tw = th * 0.32;
          ctx.beginPath();
          for (var tier = 0; tier < 3; tier++) {
            var ty = base - th + tier * th * 0.28;
            ctx.moveTo(tx, ty); ctx.lineTo(tx + tw * (0.5 + tier * 0.25), ty + th * 0.4); ctx.lineTo(tx - tw * (0.5 + tier * 0.25), ty + th * 0.4); ctx.closePath();
          }
          ctx.rect(tx - tw * 0.06, base - th * 0.05, tw * 0.12, th * 0.12);
          fillWith(ctx, A, alpha);
        }
      }
      ctx.beginPath(); ctx.rect(0, h * 0.9, w, h * 0.1); fillWith(ctx, A);
      if (wintry(month)) {
        ctx.beginPath(); for (var s = 0; s < 120; s++) circ(ctx, r.range(0, w), r.range(0, h), r.range(0.8, 2.2)); fillWith(ctx, P, 0.9);
      }
    }
  };

  /** Draw.picture(ctx, id, x, y, w, h, opts). opts = { rng, inks: [a, b], paper, month }. Fills the box with the
   *  paper, then paints the scene in ink a (shapes and tones) with ink b as an accent. Unknown ids draw nothing. */
  function picture(ctx, id, x, y, w, h, opts) {
    var fn = PICTURES[id];
    if (!fn || !ctx || !(w > 0) || !(h > 0)) return;
    opts = opts || {};
    var r = rngOf(opts, 'picture:' + id), inks = opts.inks || [];
    var A = col(inks[0], '#1A1A1A'), B = inks[1] ? col(inks[1], null) : null, P = col(opts.paper, '#F7F6F1');
    if (A.charAt(0) !== '#') A = '#1A1A1A';
    if (B && B.charAt(0) !== '#') B = null;
    if (P.charAt(0) !== '#') P = '#F7F6F1';
    if (B && Math.abs(lum(B) - lum(P)) < 0.12) B = null;       // an accent that vanishes on this paper is dropped
    var month = +opts.month || 1;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.translate(x, y);
    ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.fillStyle = P; ctx.fill();
    try { fn(ctx, r, w, h, A, B, P, month); } finally { ctx.restore(); }
  }

  /* ---------------- device-pixel helpers for the pixel passes ---------------- */

  function deviceBox(ctx, x, y, w, h) {
    var m = ctx.getTransform ? ctx.getTransform() : null;
    var a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
    if (m) { a = m.a; b = m.b; c = m.c; d = m.d; e = m.e; f = m.f; }
    var xs = [], ys = [];
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h]].forEach(function (p) {
      xs.push(a * p[0] + c * p[1] + e); ys.push(b * p[0] + d * p[1] + f);
    });
    var cw = ctx.canvas ? ctx.canvas.width : Infinity, ch = ctx.canvas ? ctx.canvas.height : Infinity;
    var x0 = Math.max(0, Math.floor(Math.min.apply(null, xs))), y0 = Math.max(0, Math.floor(Math.min.apply(null, ys)));
    var x1 = Math.min(cw, Math.ceil(Math.max.apply(null, xs))), y1 = Math.min(ch, Math.ceil(Math.max.apply(null, ys)));
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0, m: [a, b, c, d, e, f], scale: Math.sqrt(Math.abs(a * d - b * c)) || 1 };
  }
  function canPixels(ctx) { return !!(ctx && ctx.getImageData && ctx.putImageData && ctx.canvas); }

  /* Value noise on a coarse grid, filled from the generator. */
  function noiseField(r, cols, rows) {
    var g = new Float32Array((cols + 2) * (rows + 2));
    for (var i = 0; i < g.length; i++) g[i] = r.next() * 2 - 1;
    return function (u, v) {
      var x = Math.floor(u), y = Math.floor(v), fx = u - x, fy = v - y, W = cols + 2;
      if (x < 0) x = 0; if (y < 0) y = 0; if (x > cols) x = cols; if (y > rows) y = rows;
      var n00 = g[y * W + x], n10 = g[y * W + x + 1], n01 = g[(y + 1) * W + x], n11 = g[(y + 1) * W + x + 1];
      return (n00 * (1 - fx) + n10 * fx) * (1 - fy) + (n01 * (1 - fx) + n11 * fx) * fy;
    };
  }

  /* ---------------- textures ---------------- */

  function tonerPass(ctx, x, y, w, h, amount, r) {
    var g = 1 + amount * 4;
    if (!canPixels(ctx)) { speckle(ctx, x, y, w, h, amount, r, '#1A1A1A'); return; }
    var box = deviceBox(ctx, x, y, w, h);
    if (box.w <= 0 || box.h <= 0) return;
    var img = ctx.getImageData(box.x, box.y, box.w, box.h), px = img.data;
    var cell = 12, coarse = noiseField(r, Math.ceil(box.w / cell) + 1, Math.ceil(box.h / cell) + 1);
    var k = 1 + 0.45 * g, amp = 0.04 * g, soft = clamp(amount * 1.2, 0, 1), seed = r.int(1, 1e6);
    for (var yy = 0; yy < box.h; yy++) {
      for (var xx = 0; xx < box.w; xx++) {
        var i = (yy * box.w + xx) * 4;
        if (px[i + 3] === 0) continue;
        var R = px[i], G = px[i + 1], Bb = px[i + 2];
        var L = (0.2126 * R + 0.7152 * G + 0.0722 * Bb) / 255;
        var h1 = ((xx * 374761393 + yy * 668265263 + seed) ^ ((xx * 1274126177) >>> 7)) >>> 0;
        var fine = ((h1 % 1000) / 1000) * 2 - 1;
        var n = amp * (0.6 * fine + 0.4 * coarse(xx / cell, yy / cell));
        var L2 = clamp((L - 0.5) * k + 0.5 + n, 0, 1);
        var t = clamp((L2 - 0.47) / 0.06, 0, 1), sm = t * t * (3 - 2 * t);
        L2 = L2 * (1 - soft) + sm * soft;
        if (L2 < L) {
          var f = L > 0.001 ? L2 / L : 0;
          px[i] = R * f; px[i + 1] = G * f; px[i + 2] = Bb * f;
        } else if (L < 0.999) {
          var u = (L2 - L) / (1 - L);
          px[i] = R + (255 - R) * u; px[i + 1] = G + (255 - G) * u; px[i + 2] = Bb + (255 - Bb) * u;
        }
      }
    }
    ctx.putImageData(img, box.x, box.y);
  }
  function grain(ctx, x, y, w, h, amount, r, ink) {
    var n = Math.min(6000, Math.round(w * h * 0.0015 * amount));
    ctx.save();
    ctx.fillStyle = ink;
    for (var i = 0; i < n; i++) {
      ctx.globalAlpha = r.range(0.04, 0.14);
      var s = r.range(0.6, 1.4);
      ctx.fillRect(x + r.next() * w, y + r.next() * h, s, s);
    }
    ctx.restore();
  }
  function speckle(ctx, x, y, w, h, amount, r, ink) {
    var g = 1 + amount * 4, n = Math.min(3000, Math.round(w * h * 0.00025 * g));
    ctx.save();
    ctx.fillStyle = ink;
    for (var i = 0; i < n; i++) {
      var cx = x + r.next() * w, cy = y + r.next() * h, cl = r.int(1, 3);
      for (var k = 0; k < cl; k++) {
        ctx.globalAlpha = r.range(0.6, 0.95);
        var s = r.range(1, 2);
        ctx.fillRect(cx + r.range(-3, 3), cy + r.range(-3, 3), s, s);
      }
    }
    ctx.restore();
  }
  function streak(ctx, x, y, w, h, amount, r, ink) {
    var n = r.int(2, 4);
    ctx.save();
    for (var i = 0; i < n; i++) {
      var sy = y + r.next() * h, sh = r.range(1, 3), dark = r.chance(0.5);
      ctx.fillStyle = dark ? ink : '#FFFFFF';
      ctx.globalAlpha = 0.06 * clamp(amount * 1.5, 0.2, 1.5);
      ctx.fillRect(x, sy, w, sh);
      ctx.globalAlpha *= 0.5;
      ctx.fillRect(x, sy + sh, w, 1);
    }
    ctx.restore();
  }
  function fold(ctx, x, y, w, h, amount, r, ink) {
    var thirds = r.chance(0.5), lines = [], a = clamp(amount, 0.1, 1);
    if (thirds) lines.push(y + h / 3, y + 2 * h / 3); else lines.push(y + h / 2);
    ctx.save();
    lines.forEach(function (ly) {
      ly += r.range(-4, 4);
      var tilt = r.range(-3, 3);
      ctx.fillStyle = lg(ctx, 0, ly - 18, 0, ly + 18, [[0, 'rgba(0,0,0,0)'], [0.48, rgba(ink.charAt(0) === '#' ? ink : '#1A1A1A', 0.07 * a)], [0.52, 'rgba(255,255,255,' + (0.12 * a) + ')'], [1, 'rgba(255,255,255,0)']]);
      ctx.fillRect(x, ly - 18, w, 36);
      ctx.beginPath(); ctx.moveTo(x, ly); ctx.lineTo(x + w, ly + tilt);
      ctx.strokeStyle = ink; ctx.globalAlpha = 0.12 * a; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, ly + 1.2); ctx.lineTo(x + w, ly + tilt + 1.2);
      ctx.strokeStyle = '#FFFFFF'; ctx.globalAlpha = 0.2 * a; ctx.stroke();
      ctx.globalAlpha = 1;
    });
    ctx.restore();
  }

  /** Draw.texture(ctx, kind, x, y, w, h, opts). kind: toner | grain | fold | speckle | streak. opts = { rng, amount, ink }.
   *  toner is a pixel pass (contrast, soft threshold, two-frequency noise; art.md 4.7 steps 2) and falls back to a
   *  speckle when the context cannot read pixels. The others draw marks over what is there. */
  function texture(ctx, kind, x, y, w, h, opts) {
    if (!ctx || !(w > 0) || !(h > 0)) return;
    opts = opts || {};
    var r = rngOf(opts, 'texture:' + kind), amount = clamp(opts.amount === undefined ? 0.5 : +opts.amount || 0, 0, 1);
    var ink = col(opts.ink, '#1A1A1A');
    if (amount <= 0) return;
    if (kind === 'toner') tonerPass(ctx, x, y, w, h, amount, r);
    else if (kind === 'grain') grain(ctx, x, y, w, h, amount, r, ink);
    else if (kind === 'speckle') speckle(ctx, x, y, w, h, amount, r, ink);
    else if (kind === 'streak') streak(ctx, x, y, w, h, amount, r, ink);
    else if (kind === 'fold') fold(ctx, x, y, w, h, amount, r, ink);
  }

  /** Draw.tape(ctx, x, y, w, angle, opts): a strip of tape centered on x, y, w long, at angle degrees.
   *  opts = { rng, clear: bool, height }. // SPEC? x, y is taken as the center of the strip. */
  function tape(ctx, x, y, w, angle, opts) {
    if (!ctx || !(w > 0)) return;
    opts = opts || {};
    var r = rngOf(opts, 'tape'), th = opts.height > 0 ? opts.height : clamp(w * 0.3, 12, 40);
    var hw = w / 2, hh = th / 2, pts = [], n, i;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg(angle));
    ctx.beginPath();
    ctx.moveTo(-hw, -hh); ctx.lineTo(hw, -hh);
    n = r.int(5, 9);
    for (i = 1; i < n; i++) ctx.lineTo(hw + r.range(-2, 2) + (i % 2 ? 2 : -1), -hh + th * i / n);
    ctx.lineTo(hw, hh); ctx.lineTo(-hw, hh);
    n = r.int(5, 9);
    for (i = n - 1; i > 0; i--) ctx.lineTo(-hw + r.range(-2, 2) + (i % 2 ? -2 : 1), -hh + th * i / n);
    ctx.closePath();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = opts.clear ? 'rgba(255,255,255,.35)' : 'rgba(236,226,190,.72)';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    var g = ctx.createLinearGradient(0, -hh, 0, hh);
    var streaks = r.int(2, 3);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    for (i = 0; i < streaks; i++) {
      var p = (i + 0.5) / streaks + r.range(-0.1, 0.1);
      p = clamp(p, 0.05, 0.95);
      g.addColorStop(clamp(p - 0.04, 0, 1), 'rgba(255,255,255,0)');
      g.addColorStop(p, 'rgba(255,255,255,.28)');
      g.addColorStop(clamp(p + 0.04, 0, 1), 'rgba(255,255,255,0)');
    }
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fill();
    ctx.restore();
    void pts;
  }

  /** Draw.torn(ctx, x, y, w, h, opts): sets a clip to a sheet whose named edges are torn, fills it with opts.paper if
   *  given, and draws the pale fringe of torn paper along the torn edges. The clip stays: the caller wraps this in
   *  save and restore. opts = { rng, edges: ['top','right','bottom','left'] (default all four), paper, core }. */
  function torn(ctx, x, y, w, h, opts) {
    if (!ctx || !(w > 0) || !(h > 0)) return;
    opts = opts || {};
    var r = rngOf(opts, 'torn'), edges = opts.edges || ['top', 'right', 'bottom', 'left'];
    var has = {}; edges.forEach(function (e) { has[e] = true; });
    var path = [];
    function edge(x0, y0, x1, y1, nx, ny, tornEdge) {
      var len = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)), t = 0, pts = [];
      if (!tornEdge) { pts.push([x0, y0]); return pts; }
      while (t < len) {
        var f = t / len, push = r.range(0, 3);
        pts.push([x0 + (x1 - x0) * f + nx * push, y0 + (y1 - y0) * f + ny * push]);
        t += r.range(4, 7);
      }
      return pts;
    }
    var sides = [
      { k: 'top', p: edge(x, y, x + w, y, 0, 1, has.top) },
      { k: 'right', p: edge(x + w, y, x + w, y + h, -1, 0, has.right) },
      { k: 'bottom', p: edge(x + w, y + h, x, y + h, 0, -1, has.bottom) },
      { k: 'left', p: edge(x, y + h, x, y, 1, 0, has.left) }
    ];
    ctx.beginPath();
    sides.forEach(function (s, si) {
      s.p.forEach(function (pt, i) { if (si === 0 && i === 0) ctx.moveTo(pt[0], pt[1]); else ctx.lineTo(pt[0], pt[1]); path.push(pt); });
    });
    ctx.closePath();
    ctx.clip();
    if (opts.paper) { ctx.fillStyle = col(opts.paper, '#F7F6F1'); ctx.fillRect(x - 4, y - 4, w + 8, h + 8); }
    var core = opts.core || 'rgba(255,255,255,.75)';
    ctx.strokeStyle = core;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    sides.forEach(function (s, si) {
      if (!has[s.k] || s.p.length < 2) return;
      var next = sides[(si + 1) % 4].p[0];
      ctx.beginPath();
      s.p.forEach(function (pt, i) { if (i) ctx.lineTo(pt[0], pt[1]); else ctx.moveTo(pt[0], pt[1]); });
      ctx.lineTo(next[0], next[1]);
      ctx.stroke();
    });
  }

  /** Draw.halftone(ctx, x, y, w, h, opts): replaces what is drawn in the box by a dot screen of it (blended by level).
   *  opts = { rng, level: 0..1, cell (5..9 px), angle (degrees, default 45), ink, paper }. Where the context cannot read
   *  pixels it lays an even screen at the level instead. // SPEC? opts.paper (the ground under the dots) is an extra. */
  function halftone(ctx, x, y, w, h, opts) {
    if (!ctx || !(w > 0) || !(h > 0)) return;
    opts = opts || {};
    var level = clamp(opts.level === undefined ? 1 : +opts.level || 0, 0, 1);
    if (level <= 0) return;
    var r = rngOf(opts, 'halftone'), cell = clamp(+opts.cell || 6, 3, 16), ang = deg(opts.angle === undefined ? 45 : opts.angle);
    var ink = col(opts.ink, '#1A1A1A'), paper = col(opts.paper, '#F7F6F1');
    var sample = null, box = null;
    if (canPixels(ctx)) {
      box = deviceBox(ctx, x, y, w, h);
      if (box.w > 0 && box.h > 0) {
        var data = ctx.getImageData(box.x, box.y, box.w, box.h).data, m = box.m;
        sample = function (lx, ly) {
          var dx = Math.round(m[0] * lx + m[2] * ly + m[4]) - box.x, dy = Math.round(m[1] * lx + m[3] * ly + m[5]) - box.y;
          if (dx < 0 || dy < 0 || dx >= box.w || dy >= box.h) return 1;
          var i = (dy * box.w + dx) * 4;
          return (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        };
      }
    }
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    ctx.globalAlpha = level;
    ctx.fillStyle = paper;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = ink;
    var cx = x + w / 2, cy = y + h / 2, R = Math.sqrt(w * w + h * h) / 2 + cell, ca = Math.cos(ang), sa = Math.sin(ang);
    var flat = 1 - clamp(0.35 + r.range(-0.05, 0.05), 0, 1);
    ctx.beginPath();
    for (var v = -R; v <= R; v += cell) {
      for (var u = -R; u <= R; u += cell) {
        var px = cx + u * ca - v * sa, py = cy + u * sa + v * ca;
        if (px < x - cell || py < y - cell || px > x + w + cell || py > y + h + cell) continue;
        var L = sample ? sample(px, py) : flat;
        var rad = cell * 0.71 * Math.sqrt(Math.max(0, 1 - L));
        if (rad < 0.25) continue;
        ctx.moveTo(px + rad, py); ctx.arc(px, py, rad, 0, TAU, false);
      }
    }
    ctx.fill();
    ctx.restore();
  }

  return {
    motif: motif,
    picture: picture,
    texture: texture,
    tape: tape,
    torn: torn,
    halftone: halftone
  };
});
