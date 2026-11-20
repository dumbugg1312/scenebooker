/* Scene Booker — js/desk/kit.js
 * SB.DeskKit: the paste-up kit for the desk and every close-up (design/spec/07-desk.md section 2).
 * The desk is a photocopied paste-up on a black table: cut copy paper with scissor-straight uneven edges and hard
 * paste-up shadows, toner blacks, halftone and hatch shading, tape, staples, glue ghosts, registration marks,
 * jagged marker capitals, ransom type in black bars, broken typewriter text, marker scrawl, and xeroxed cut-outs
 * with a white scissor border for the things that are not paper.
 * Every drawing function returns an SVG markup string (no DOM), so it is safe in Node. photocopy(ctx, ...) is the
 * one canvas function: the same toner pass js/art/flyer.js runs on flyers (contrast gain, noise, a soft threshold
 * on the near-gray pixels), so the desk and the flyers on it come out of one copier.
 * Seeding: pass o.seed (a string) or o.rng (an SB.rng.make generator); the same seed draws the same cut.
 * The older names (rect, poly, ellipse, line, path, blob, hatch, torn, tape, sticker, letter, tag, heart, star,
 * skull, cat, flower, bolt, scrawl...) are kept for the screens that still call them, drawn in the same hand.
 */
(function (SB) {
  'use strict';

  SB.module('DeskKit', function () {

    /* The flyer inks (same values as js/art/flyer.js), the copy-paper stocks and the desk materials. */
    var INK = { toner: '#141413', copyGray: '#7D7D78', fireRed: '#E03A2F', ballpointBlue: '#2F4FB5', bayouTeal: '#0F7C82',
                oliveDrab: '#6B6B2E', fluorPink: '#FF48B0', fluorOrange: '#FF6C2F', fluorYellow: '#FFE800', mint: '#5FD4A8',
                lavender: '#A58CE0', brick: '#9C3B27' };
    var STOCK = { white: '#f4f2ea', bone: '#e7ddc4', blue: '#55bfe8', mint: '#86e2b4', goldenrod: '#f0b02a', pink: '#f68fbd',
                  manila: '#d9c288', kraft: '#b38a57', newsprint: '#d9d5c7', olive: '#6b6b2e', table: '#0c0c0d' };
    var MAT = { toner: '#141413', paper: STOCK.bone, paperLo: '#d6cbb0', white: STOCK.white, kraft: STOCK.kraft, kraftLo: '#9a7446',
                wood: '#2a2723', woodLo: '#1c1a17', woodHi: '#3a3631', wall: '#1a1a19', wallLo: '#262624', tape: '#e6dcb8',
                duct: '#8f918f', pink: STOCK.pink, pinkLo: '#e2709f', tin: '#a9aca6', tinLo: '#7d807b', red: '#d8392b',
                sky: STOCK.blue, night: '#1b2233', cactus: '#4f7a40', manila: STOCK.manila, table: STOCK.table, olive: STOCK.olive,
                bone: STOCK.bone, blue: STOCK.blue, mint: STOCK.mint, goldenrod: STOCK.goldenrod, newsprint: STOCK.newsprint };
    var FONT = {
      type: "'Courier New', Courier, 'Nimbus Mono PS', monospace",
      ransom: ["Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", "Georgia, 'Times New Roman', serif", "'Courier New', Courier, monospace",
               "'Arial Black', 'Helvetica Neue', Arial, sans-serif", "'Times New Roman', Times, serif", "'Trebuchet MS', Verdana, sans-serif",
               "'American Typewriter', 'Rockwell', serif"]
    };
    var uid = 0;

    function f(n) { return Math.round(n * 10) / 10; }
    function R(o) {
      if (o && o.rng && typeof o.rng.next === 'function') return o.rng;
      return SB.rng.make('desk:' + ((o && o.seed !== undefined) ? o.seed : 'x'));
    }
    function j(r, a) { return (r.next() * 2 - 1) * a; }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
    function opt(o, k, d) { return o && o[k] !== undefined && o[k] !== null ? o[k] : d; }
    function cls(o) { return o && o.cls ? ' class="' + esc(o.cls) + '"' : ''; }
    function id(p) { uid += 1; return (p || 'dk') + uid; }
    function stock(name) { return STOCK[name] || MAT[name] || INK[name] || (/^#/.test(String(name)) ? name : STOCK.white); }
    function rotG(inner, rot, cx, cy, extra) {
      return '<g' + (extra || '') + (rot ? ' transform="rotate(' + f(rot) + ' ' + f(cx) + ' ' + f(cy) + ')"' : '') + '>' + inner + '</g>';
    }

    /* A smooth path through points, by midpoints and quadratic curves. closed: join the end to the start. */
    function smooth(pts, closed) {
      var n = pts.length, d, i, a, b, m;
      if (n < 2) return '';
      if (!closed) {
        d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
        for (i = 1; i < n - 1; i++) {
          a = pts[i]; b = pts[i + 1]; m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          d += 'Q' + f(a[0]) + ' ' + f(a[1]) + ' ' + f(m[0]) + ' ' + f(m[1]);
        }
        return d + 'L' + f(pts[n - 1][0]) + ' ' + f(pts[n - 1][1]);
      }
      m = [(pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2];
      d = 'M' + f(m[0]) + ' ' + f(m[1]);
      for (i = 0; i < n; i++) {
        a = pts[i]; b = pts[(i + 1) % n];
        d += 'Q' + f(a[0]) + ' ' + f(a[1]) + ' ' + f((a[0] + b[0]) / 2) + ' ' + f((a[1] + b[1]) / 2);
      }
      return d + 'Z';
    }
    function polyD(pts) { return 'M' + pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join('L') + 'Z'; }
    function openD(pts) { return 'M' + pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join('L'); }

    /* ------------------------------------------------------------ */
    /* cut paper                                                     */
    /* ------------------------------------------------------------ */

    /** cutPts(x, y, w, h, o): the corners of a scissor-cut piece: straight sides that wander a little and kink where
     *  the scissors were re-set; o.torn: the sides that are torn instead ('t', 'b', 'l', 'r' in any mix); o.cut px of wander. */
    function cutPts(x, y, w, h, o) {
      o = o || {};
      var r = R(o), c = opt(o, 'cut', 3.4), torn = opt(o, 'torn', ''), pts = [], corners, i, a, b, n, k, t, isT, nx, ny, L;
      corners = [[x + j(r, c), y + j(r, c)], [x + w + j(r, c), y + j(r, c)], [x + w + j(r, c), y + h + j(r, c)], [x + j(r, c), y + h + j(r, c)]];
      var sides = ['t', 'r', 'b', 'l'];
      for (i = 0; i < 4; i++) {
        a = corners[i]; b = corners[(i + 1) % 4];
        L = Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])) || 1;
        nx = -(b[1] - a[1]) / L; ny = (b[0] - a[0]) / L;
        isT = torn.indexOf(sides[i]) >= 0;
        pts.push(a);
        n = isT ? Math.max(4, Math.round(L / 7)) : (L > 50 ? 1 + Math.floor(r.next() * (1.5 + L / 120)) : 0);
        for (k = 1; k <= n; k++) {
          t = k / (n + 1) + (isT ? j(r, 0.3 / (n + 1)) : j(r, 0.12));
          var d = isT ? (r.next() * 5 - 1) : j(r, c * 0.7);
          pts.push([a[0] + (b[0] - a[0]) * t + nx * d, a[1] + (b[1] - a[1]) * t + ny * d]);
        }
      }
      return pts;
    }

    /** paper(x, y, w, h, o): a cut piece of copy paper: a hard paste-up shadow, the stock (o.stock: white, bone, blue,
     *  mint, goldenrod, pink, manila, kraft, newsprint, or a hex), edge burn from the copier, then o.inner on top, all
     *  turned o.rot degrees about the centre. o.torn sides, o.shadow false for none, o.burn 0..1, o.dots halftone level. */
    function paper(x, y, w, h, o) {
      o = o || {};
      var r = R(o), pts = o.pts || cutPts(x, y, w, h, { rng: r, cut: opt(o, 'cut', 3.4), torn: opt(o, 'torn', '') }), d = polyD(pts), out = '',
          burn = opt(o, 'burn', 0.75), cid;
      if (o.shadow !== false) out += '<path d="' + d + '" transform="translate(' + f(opt(o, 'sx', 5)) + ' ' + f(opt(o, 'sy', 7)) + ')" fill="#000" fill-opacity="' + opt(o, 'sop', 0.62) + '"/>';
      out += '<path d="' + d + '" fill="' + stock(opt(o, 'stock', 'white')) + '"/>';
      if (o.dots) out += '<path d="' + d + '" fill="url(#dk-ht' + o.dots + ')"/>';
      if (burn > 0 || o.inner) {
        cid = id('pc');
        out += '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + cid + ')">';
        if (burn > 0) out += '<path d="' + d + '" fill="none" stroke="#2c2b28" stroke-opacity="' + f(0.3 * burn) + '" stroke-width="' + f(10 + r.next() * 10) + '"/>' +
                             '<path d="' + d + '" fill="none" stroke="#111" stroke-opacity="' + f(0.55 * burn) + '" stroke-width="3"/>';
        out += (o.inner || '') + '</g>';
      }
      return rotG(out, o.rot, x + w / 2, y + h / 2, cls(o));
    }

    /** cutout(pts, inner, o): a xeroxed cut-out of a thing that is not paper: its silhouette (points) cut out with a
     *  white scissor border (o.edge px), a hard shadow, and inner (SVG) drawn over the silhouette; o.fill silhouette color. */
    function cutout(pts, inner, o) {
      o = o || {};
      var r = R(o), e = opt(o, 'edge', 7), jp = pts.map(function (p) { return [p[0] + j(r, 1.2), p[1] + j(r, 1.2)]; }), d = polyD(jp), out = '';
      if (o.shadow !== false) out += '<path d="' + d + '" transform="translate(5 7)" fill="#000" fill-opacity=".7" stroke="#000" stroke-opacity=".7" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
      out += '<path d="' + d + '" fill="' + STOCK.white + '" stroke="' + STOCK.white + '" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
      out += '<path d="' + d + '" fill="' + opt(o, 'fill', INK.toner) + '"/>';
      out += inner || '';
      return rotG(out, o.rot, opt(o, 'cx', 0), opt(o, 'cy', 0), cls(o));
    }

    /** dots(d, level, o): fill a path with a halftone screen (level 1 light .. 4 heavy; o.white for white dots on black). */
    function dots(d, level, o) {
      return '<path d="' + d + '" fill="url(#dk-ht' + (o && o.white ? 'w' : '') + (level || 2) + ')"' + (o && o.op ? ' fill-opacity="' + o.op + '"' : '') + '/>';
    }
    /** dotsRect(x, y, w, h, level, o): the same in a box. */
    function dotsRect(x, y, w, h, level, o) { return dots(polyD([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]), level, o); }

    /** photo(x, y, w, h, o): a xeroxed snapshot (markup to put inside a paper): gray ground the copier turns to grit,
     *  a dot screen, and black figures (heads and shoulders, a crowd) with screened highlights. o.n figures, o.light. */
    function photo(x, y, w, h, o) {
      o = o || {};
      var r = R(o), out = '<path d="M' + f(x) + ' ' + f(y) + 'h' + f(w) + 'v' + f(h) + 'h' + f(-w) + 'Z" fill="' + (o.light ? '#b9b8b0' : '#7c7b75') + '"/>', i, n = opt(o, 'n', 4), fx, fy, s, cid = id('ph');
      out += '<clipPath id="' + cid + '"><path d="M' + f(x) + ' ' + f(y) + 'h' + f(w) + 'v' + f(h) + 'h' + f(-w) + 'Z"/></clipPath><g clip-path="url(#' + cid + ')">';
      out += dotsRect(x, y, w, h * (0.3 + r.next() * 0.4), 3);
      for (i = 0; i < n; i++) {
        s = Math.min(w, h) * (0.28 + r.next() * 0.3); fx = x + w * (i + 0.5) / n + j(r, w * 0.08); fy = y + h * (0.45 + r.next() * 0.3);
        out += '<path d="M' + f(fx - s * 0.9) + ' ' + f(y + h + 4) + 'L' + f(fx - s * 0.75) + ' ' + f(fy + s * 0.55) + 'L' + f(fx - s * 0.2) + ' ' + f(fy + s * 0.35) + 'L' + f(fx + s * 0.25) + ' ' + f(fy + s * 0.35) +
               'L' + f(fx + s * 0.8) + ' ' + f(fy + s * 0.6) + 'L' + f(fx + s * 0.95) + ' ' + f(y + h + 4) + 'Z" fill="#111"/>';
        out += '<path d="' + polyD([[fx - s * 0.32, fy + s * 0.32], [fx - s * 0.36, fy - s * 0.05], [fx - s * 0.2, fy - s * 0.38], [fx + s * 0.18, fy - s * 0.4], [fx + s * 0.34, fy - s * 0.05], [fx + s * 0.28, fy + s * 0.34]]) + '" fill="#111"/>';
        out += dots(polyD([[fx - s * 0.05, fy - s * 0.3], [fx + s * 0.3, fy - s * 0.2], [fx + s * 0.26, fy + s * 0.2], [fx + s * 0.02, fy + s * 0.1]]), r.next() < 0.5 ? 3 : 2, { white: true });
        if (r.next() < 0.5) out += dots(polyD([[fx + s * 0.2, fy + s * 0.5], [fx + s * 0.75, fy + s * 0.65], [fx + s * 0.9, y + h], [fx + s * 0.3, y + h]]), 2, { white: true });
      }
      if (o.flash !== false) out += '<path d="M' + f(x) + ' ' + f(y) + 'h' + f(w * 0.3) + 'L' + f(x) + ' ' + f(y + h * 0.4) + 'Z" fill="#f4f2ea" fill-opacity=".5"/>';
      return out + '</g>';
    }

    /** hatch(x, y, w, h, o): quick diagonal marker hatching in a box (shadow, toner build-up); o.gap spacing, o.angle 1 or -1. */
    function hatch(x, y, w, h, o) {
      o = o || {};
      var r = R(o), gap = opt(o, 'gap', 7), d = '', t, dir = opt(o, 'angle', 1), a, b;
      for (t = -h; t < w; t += gap) {
        a = [x + Math.max(0, t), y + (t < 0 ? -t : 0)];
        b = [x + Math.min(w, t + h), y + (t + h > w ? h - (t + h - w) : h)];
        if (dir < 0) { a = [x + w - (a[0] - x), a[1]]; b = [x + w - (b[0] - x), b[1]]; }
        d += 'M' + f(a[0] + j(r, 1)) + ' ' + f(a[1] + j(r, 1)) + 'L' + f(b[0] + j(r, 1)) + ' ' + f(b[1] + j(r, 1));
      }
      return '<path' + cls(o) + ' d="' + d + '" fill="none" stroke="' + opt(o, 'stroke', INK.toner) + '" stroke-width="' + f(opt(o, 'sw', 1.6)) + '" stroke-linecap="square" opacity="' + opt(o, 'opacity', 0.85) + '"/>';
    }

    /** tape(cx, cy, w, h, o): a strip of masking tape centred at cx, cy, turned o.rot degrees; scissor-cut ends, or torn with o.torn. */
    function tape(cx, cy, w, h, o) {
      o = o || {};
      var r = R(o), x = w / 2, y = h / 2, pts = [], k, n = 5, col = opt(o, 'color', MAT.tape), torn = opt(o, 'torn', true);
      pts.push([-x + j(r, 2), -y]); pts.push([x + j(r, 2), -y]);
      for (k = 1; k < n; k++) pts.push([x + (torn ? (k % 2 ? 2.5 : -1.5) + j(r, 1.2) : j(r, 0.4) + (k / n) * 3), -y + (h * k) / n]);
      pts.push([x + j(r, 2), y]); pts.push([-x + j(r, 2), y]);
      for (k = n - 1; k > 0; k--) pts.push([-x + (torn ? (k % 2 ? -2.5 : 1.5) + j(r, 1.2) : j(r, 0.4) - (k / n) * 3), -y + (h * k) / n]);
      return '<g' + cls(o) + ' transform="translate(' + f(cx) + ' ' + f(cy) + ') rotate(' + f(opt(o, 'rot', 0)) + ')">' +
             '<path d="' + polyD(pts) + '" fill="' + col + '" fill-opacity="' + opt(o, 'op', 0.8) + '"/>' +
             '<path d="M' + f(-x + 3) + ' ' + f(-y + 2) + 'L' + f(x - 3) + ' ' + f(-y + 2) + 'M' + f(-x + 3) + ' ' + f(y - 2) + 'L' + f(x - 3) + ' ' + f(y - 2) + '" stroke="#000" stroke-opacity=".12" stroke-width="1.4"/>' +
             '</g>';
    }

    /** staple(x, y, o): a staple, o.rot degrees. */
    function staple(x, y, o) {
      o = o || {};
      return '<g transform="translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(opt(o, 'rot', 0)) + ')"><path d="M-8 2.5V-1H8V2.5" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="3" transform="translate(1 1.5)"/>' +
             '<path d="M-8 2.5V-1H8V2.5" fill="none" stroke="#b9bab4" stroke-width="2.2" stroke-linejoin="miter"/></g>';
    }

    /** regmark(x, y, s, o): a registration mark: a crosshair through a ring. */
    function regmark(x, y, s, o) {
      s = s || 14;
      var c = opt(o, 'stroke', INK.toner);
      return '<g><circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(s * 0.42) + '" fill="none" stroke="' + c + '" stroke-width="1.6"/>' +
             '<path d="M' + f(x - s) + ' ' + f(y) + 'H' + f(x + s) + 'M' + f(x) + ' ' + f(y - s) + 'V' + f(y + s) + '" stroke="' + c + '" stroke-width="1.6"/></g>';
    }

    /** glue(x, y, w, h, o): the ghost a glue stick leaves: a gray smear that the copier turns to grit. */
    function glue(x, y, w, h, o) {
      var r = R(o), pts = [], i;
      for (i = 0; i < 9; i++) pts.push([x + w / 2 + Math.cos(i / 9 * Math.PI * 2) * w / 2 * (0.7 + r.next() * 0.4), y + h / 2 + Math.sin(i / 9 * Math.PI * 2) * h / 2 * (0.6 + r.next() * 0.5)]);
      return '<path d="' + smooth(pts, true) + '" fill="#5a5850" fill-opacity="' + opt(o, 'op', 0.22) + '"/>';
    }

    /** pin(x, y, o): a push pin seen from above, o.color head. */
    function pin(x, y, o) {
      o = o || {};
      return '<g><circle cx="' + f(x + 3) + '" cy="' + f(y + 4) + '" r="7" fill="#000" fill-opacity=".5"/><circle cx="' + f(x) + '" cy="' + f(y) + '" r="7" fill="' + opt(o, 'color', INK.fireRed) + '" stroke="' + INK.toner + '" stroke-width="2"/>' +
             '<circle cx="' + f(x - 2) + '" cy="' + f(y - 2.5) + '" r="2" fill="#fff" fill-opacity=".8"/></g>';
    }

    /** stud(cx, cy, s): a pyramid stud, for jackets and notebook covers. */
    function stud(cx, cy, s) {
      s = s || 8;
      return '<g><path d="M' + f(cx - s) + ' ' + f(cy) + 'L' + f(cx) + ' ' + f(cy - s) + 'L' + f(cx + s) + ' ' + f(cy) + 'L' + f(cx) + ' ' + f(cy + s) + 'Z" fill="#c8c9c4" stroke="' + INK.toner + '" stroke-width="2"/>' +
             '<path d="M' + f(cx - s) + ' ' + f(cy) + 'L' + f(cx) + ' ' + f(cy - s) + 'L' + f(cx) + ' ' + f(cy) + 'Z" fill="#f4f2ea"/><path d="M' + f(cx) + ' ' + f(cy) + 'L' + f(cx + s) + ' ' + f(cy) + 'L' + f(cx) + ' ' + f(cy + s) + 'Z" fill="#555"/></g>';
    }

    /* ------------------------------------------------------------ */
    /* marker lines and marks                                        */
    /* ------------------------------------------------------------ */

    function stroke(r, p, q, over, wob) {
      var dx = q[0] - p[0], dy = q[1] - p[1], L = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / L, uy = dy / L,
          e1 = over * (0.2 + r.next() * 0.9), e2 = over * (0.2 + r.next() * 0.9), bow = j(r, wob) * Math.min(1.4, L / 80 + 0.3),
          a = [p[0] - ux * e1 + j(r, wob * 0.3), p[1] - uy * e1 + j(r, wob * 0.3)],
          b = [q[0] + ux * e2 + j(r, wob * 0.3), q[1] + uy * e2 + j(r, wob * 0.3)],
          c = [(a[0] + b[0]) / 2 - uy * bow, (a[1] + b[1]) / 2 + ux * bow];
      return 'M' + f(a[0]) + ' ' + f(a[1]) + 'Q' + f(c[0]) + ' ' + f(c[1]) + ' ' + f(b[0]) + ' ' + f(b[1]);
    }
    function strokeAttrs(o, w) {
      return ' fill="none" stroke="' + opt(o, 'stroke', INK.toner) + '" stroke-width="' + f(w) + '" stroke-linecap="' + opt(o, 'cap', 'square') + '" stroke-linejoin="miter"';
    }

    /** poly(points, o): a closed cut shape: flat fill (o.fill) and a hard marker edge (o.sw, 0 for none). */
    function shape(pts, o) {
      o = o || {};
      var r = R(o), wob = opt(o, 'wob', 1.2), sw = opt(o, 'sw', 3.5), fill = opt(o, 'fill', null), out = '', d = '', i, jp, over = opt(o, 'over', 2.5);
      jp = pts.map(function (p) { return [p[0] + j(r, wob), p[1] + j(r, wob)]; });
      if (fill && fill !== 'none') out += '<path d="' + polyD(jp) + '" fill="' + fill + '"' + (o.op !== undefined ? ' fill-opacity="' + o.op + '"' : '') + '/>';
      if (sw > 0) {
        for (i = 0; i < jp.length; i++) d += stroke(r, jp[i], jp[(i + 1) % jp.length], over, wob * 0.6);
        out += '<path d="' + d + '"' + strokeAttrs(o, sw) + '/>';
        if (o.twice) {
          d = '';
          for (i = 0; i < jp.length; i++) d += stroke(r, [jp[i][0] + j(r, 1.5), jp[i][1] + j(r, 1.5)], jp[(i + 1) % jp.length], over * 0.6, wob);
          out += '<path d="' + d + '"' + strokeAttrs(o, sw * 0.6) + '/>';
        }
      }
      return '<g' + cls(o) + (o.filter ? ' filter="url(#' + o.filter + ')"' : '') + '>' + out + '</g>';
    }

    /** rect(x, y, w, h, o): a cut box with a hard edge; o.rot turns it about its centre. */
    function rect(x, y, w, h, o) {
      o = o || {};
      var s = shape([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], o);
      return o.rot ? '<g transform="rotate(' + f(o.rot) + ' ' + f(x + w / 2) + ' ' + f(y + h / 2) + ')">' + s + '</g>' : s;
    }

    /** ellipse(cx, cy, rx, ry, o): a marker oval: a fill and one outline that runs past where it started. */
    function ellipse(cx, cy, rx, ry, o) {
      o = o || {};
      var r = R(o), wob = opt(o, 'wob', 1.4), sw = opt(o, 'sw', 3.5), fill = opt(o, 'fill', null),
          n = 18, pts = [], i, a, k, a0 = r.next() * Math.PI * 2, line = [], out = '';
      for (i = 0; i < n; i++) {
        a = (i / n) * Math.PI * 2; k = 1 + j(r, wob / Math.max(8, Math.min(rx, ry)));
        pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
      }
      if (fill && fill !== 'none') out += '<path d="' + smooth(pts, true) + '" fill="' + fill + '"' + (o.op !== undefined ? ' fill-opacity="' + o.op + '"' : '') + '/>';
      if (sw > 0) {
        for (i = 0; i <= n + 2; i++) {
          a = a0 + (i / n) * Math.PI * 2 + (i > n ? 0.12 : 0);
          k = 1 + j(r, wob / Math.max(6, Math.min(rx, ry))) + (i > n ? 0.05 : 0);
          line.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
        }
        out += '<path d="' + smooth(line, false) + '"' + strokeAttrs(Object.assign({ cap: 'round' }, o), sw) + '/>';
      }
      return '<g' + cls(o) + '>' + out + '</g>';
    }
    /** circle(cx, cy, r, o): ellipse with one radius. */
    function circle(cx, cy, rad, o) { return ellipse(cx, cy, rad, rad, o); }

    /** circle3(cx, cy, rx, ry, o): circled three times, fast, in marker: the way today gets circled. */
    function circle3(cx, cy, rx, ry, o) {
      o = o || {};
      var r = R(o), out = '', i;
      for (i = 0; i < 3; i++) out += ellipse(cx + j(r, rx * 0.06), cy + j(r, ry * 0.08), rx * (0.96 + i * 0.05 + j(r, 0.03)), ry * (0.9 + i * 0.07 + j(r, 0.04)),
                                            { rng: r, sw: opt(o, 'sw', 3.2) * (1 - i * 0.18), stroke: opt(o, 'stroke', INK.fireRed), wob: opt(o, 'wob', 2.4) });
      return '<g' + cls(o) + '>' + out + '</g>';
    }

    /** line(x1, y1, x2, y2, o): one marker stroke that overshoots its ends; o.twice draws it again. */
    function line(x1, y1, x2, y2, o) {
      o = o || {};
      var r = R(o), wob = opt(o, 'wob', 1.2), over = opt(o, 'over', 2), sw = opt(o, 'sw', 3.5),
          d = stroke(r, [x1, y1], [x2, y2], over, wob);
      if (o.twice) d += stroke(r, [x1 + j(r, 2), y1 + j(r, 2)], [x2 + j(r, 2), y2 + j(r, 2)], over, wob * 1.4);
      return '<path' + cls(o) + ' d="' + d + '"' + strokeAttrs(o, sw) + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
    }

    /** under3(x, y, w, o): underlined three times, each pass a little shorter and crookeder. */
    function under3(x, y, w, o) {
      o = o || {};
      var r = R(o), out = '', i;
      for (i = 0; i < 3; i++) out += line(x + j(r, 4) + i * 3, y + i * opt(o, 'gap', 6), x + w * (1 - i * 0.08) + j(r, 4), y + i * opt(o, 'gap', 6) + j(r, 3),
                                         { rng: r, sw: opt(o, 'sw', 3) * (1 - i * 0.15), stroke: opt(o, 'stroke', INK.toner), over: 4 });
      return out;
    }

    /** arrow(x1, y1, x2, y2, o): a marker arrow, a fast bent shaft and an open head at x2, y2. */
    function arrow(x1, y1, x2, y2, o) {
      o = o || {};
      var r = R(o), a = Math.atan2(y2 - y1, x2 - x1), hl = opt(o, 'head', 16), sw = opt(o, 'sw', 3.5), s = { rng: r, sw: sw, stroke: opt(o, 'stroke', INK.toner), over: 1.5, wob: opt(o, 'wob', 4) };
      return line(x1, y1, x2, y2, s) + line(x2, y2, x2 - Math.cos(a - 0.5) * hl, y2 - Math.sin(a - 0.5) * hl, s) + line(x2, y2, x2 - Math.cos(a + 0.5) * hl, y2 - Math.sin(a + 0.5) * hl, s);
    }

    /** scribble(x, y, w, h, o): scribbled out: a fast zigzag of marker over a box. */
    function scribble(x, y, w, h, o) {
      o = o || {};
      var r = R(o), pts = [], n = opt(o, 'n', 7), i;
      for (i = 0; i <= n; i++) pts.push([x + (i % 2 ? w : 0) + j(r, 3), y + (i / n) * h + j(r, 2)]);
      return '<path d="' + openD(pts) + '"' + strokeAttrs(o, opt(o, 'sw', 3)) + '/>';
    }

    /** xout(x, y, w, h, o): crossed out with two strokes. */
    function xout(x, y, w, h, o) {
      o = o || {};
      var r = R(o), s = { rng: r, sw: opt(o, 'sw', 3), stroke: opt(o, 'stroke', INK.toner), over: 3 };
      return line(x, y, x + w, y + h, s) + line(x + w, y, x, y + h, s);
    }

    /** path(points, o): an open marker line through points (smoothed), for cords, strings and routes. */
    function path(pts, o) {
      o = o || {};
      var r = R(o), wob = opt(o, 'wob', 1.2), jp = pts.map(function (p) { return [p[0] + j(r, wob), p[1] + j(r, wob)]; });
      return '<path' + cls(o) + ' d="' + smooth(jp, !!o.closed) + '"' + strokeAttrs(Object.assign({ cap: 'round' }, o), opt(o, 'sw', 3)) + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
    }

    /** blob(points, o): a closed smooth shape (fills only, outline optional with o.sw), for stains and smears. */
    function blob(pts, o) {
      o = o || {};
      var r = R(o), wob = opt(o, 'wob', 1.5), jp = pts.map(function (p) { return [p[0] + j(r, wob), p[1] + j(r, wob)]; }), d = smooth(jp, true);
      return '<path' + cls(o) + ' d="' + d + '" fill="' + opt(o, 'fill', 'none') + '"' + (o.op !== undefined ? ' fill-opacity="' + o.op + '"' : '') +
             (opt(o, 'sw', 0) > 0 ? ' stroke="' + opt(o, 'stroke', INK.toner) + '" stroke-width="' + o.sw + '" stroke-linejoin="miter"' : '') + '/>';
    }

    /** torn(x, y, w, h, o): a scrap of paper with torn edges (o.edges, default 'tb'); o.fill the stock. */
    function torn(x, y, w, h, o) {
      o = o || {};
      var inner = '';
      if (opt(o, 'sw', 0) > 0) inner = '<path d="' + polyD([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]) + '" fill="none" stroke="' + opt(o, 'stroke', INK.toner) + '" stroke-width="' + f(o.sw * 2) + '"/>';
      return paper(x, y, w, h, { seed: opt(o, 'seed', 'torn'), rng: o.rng, stock: opt(o, 'fill', STOCK.bone), torn: opt(o, 'edges', 'tb'), rot: o.rot, shadow: o.shadow, burn: 0.35, inner: inner, cls: o.cls });
    }

    /* ------------------------------------------------------------ */
    /* lettering                                                     */
    /* ------------------------------------------------------------ */

    function glyphs(text) { return String(text == null ? '' : text).split(''); }

    /* lay out marker capitals: one Skeleton block glyph per character, each its own size, tilt and baseline */
    function markerLay(text, size, o) {
      var r = SB.rng.make('mk:' + text + ':' + opt(o, 'seed', '')), vary = opt(o, 'vary', 0.16), tilt = opt(o, 'tilt', 5), out = [], x = 0, i, ch, s, p, gap = opt(o, 'track', 0.06);
      var chars = glyphs(String(text).toUpperCase());
      for (i = 0; i < chars.length; i++) {
        ch = chars[i];
        if (ch === ' ') { x += size * 0.42; continue; }
        s = size * (1 + j(r, vary));
        p = null;
        try { p = SB.Skeleton.path(ch, s, 'block', { rng: r }); } catch (e) { p = null; }
        if (!p || !p.d) { x += size * 0.3; continue; }
        out.push({ d: p.d, x: x, s: s, w: p.width, sw: p.strokeWidth, dy: j(r, size * 0.08), rot: j(r, tilt) });
        x += p.width + size * gap;
      }
      return { items: out, width: Math.max(0, x - size * gap) };
    }
    /** markerWidth(text, size, o): the width marker capitals will take. */
    function markerWidth(text, size, o) { try { return markerLay(text, size, o || {}).width; } catch (e) { return String(text).length * size * 0.8; } }

    /** marker(text, x, y, size, o): jagged marker block capitals filled solid, uneven in size and baseline, baseline at y.
     *  o.fill ink, o.weight stroke multiplier, o.anchor 'start'|'middle'|'end', o.maxWidth squeezes, o.rot tilts the line,
     *  o.halo a paper-colored outline under it (for black-on-black), o.rough false for clean edges. */
    function marker(text, x, y, size, o) {
      o = o || {};
      if (!text || !SB.Skeleton || typeof SB.Skeleton.path !== 'function') return '';
      var L = markerLay(text, size, o), w = L.width, sx = 1, ax, ink = opt(o, 'fill', INK.toner), wt = opt(o, 'weight', 1.05), out = '', halo = '';
      if (o.maxWidth && w > o.maxWidth) { sx = o.maxWidth / w; w = o.maxWidth; }
      ax = o.anchor === 'middle' ? x - w / 2 : (o.anchor === 'end' ? x - w : x);
      L.items.forEach(function (it) {
        var tr = 'translate(' + f(it.x) + ' ' + f(it.dy - it.s) + ') rotate(' + f(it.rot) + ' ' + f(it.w / 2) + ' ' + f(it.s / 2) + ')';
        if (o.halo) halo += '<path d="' + it.d + '" transform="' + tr + '" fill="none" stroke="' + o.halo + '" stroke-width="' + f(it.sw * wt + opt(o, 'haloW', 7)) + '" stroke-linecap="square" stroke-linejoin="miter"/>';
        out += '<path d="' + it.d + '" transform="' + tr + '" fill="none" stroke="' + ink + '" stroke-width="' + f(it.sw * wt) + '" stroke-linecap="square" stroke-linejoin="miter" stroke-miterlimit="3"/>';
      });
      return '<g' + cls(o) + ' transform="' + (o.rot ? 'rotate(' + f(o.rot) + ' ' + f(x) + ' ' + f(y) + ') ' : '') + 'translate(' + f(ax) + ' ' + f(y) + ') scale(' + f(sx * 1000) / 1000 + ' 1)"' +
             (o.rough === false ? '' : ' filter="url(#dk-rough)"') + '>' + halo + out + '</g>';
    }

    /** ransom(text, x, y, size, o): headline type pasted in one black bar, as on the 1987-96 flyers: plain heavy capitals
     *  cut out as a single strip, baseline at y (the name is kept for callers; there are no ransom-note letters).
     *  o.fill the bar (toner), o.ink the type (paper), o.anchor, o.rot. */
    function ransomWidth(text, size) { return String(text == null ? '' : text).length * size * 0.62 + size * 0.7; }
    function ransom(text, x, y, size, o) {
      o = o || {};
      text = String(text == null ? '' : text).toUpperCase();
      if (!text) return '';
      var r = SB.rng.make('bar:' + text + ':' + opt(o, 'seed', '')), w = ransomWidth(text, size), ax = o.anchor === 'middle' ? x - w / 2 : o.anchor === 'end' ? x - w : x,
          pts = cutPts(ax, y - size * 1.02, w, size * 1.32, { rng: r, cut: 1.6 }), d = polyD(pts);
      return '<g' + cls(o) + (o.rot ? ' transform="rotate(' + f(o.rot) + ' ' + f(x) + ' ' + f(y) + ')"' : '') + '>' +
             '<path d="' + d + '" transform="translate(3 4)" fill="#000" fill-opacity=".55"/><path d="' + d + '" fill="' + opt(o, 'fill', INK.toner) + '"/>' +
             '<text x="' + f(ax + size * 0.35) + '" y="' + f(y) + '" textLength="' + f(w - size * 0.7) + '" lengthAdjust="spacingAndGlyphs" font-family="' + esc(FONT.ransom[0]) + '" font-size="' + f(size) + '" fill="' + opt(o, 'ink', STOCK.white) + '">' + esc(text) + '</text></g>';
    }

    /** type(text, x, y, size, o): typewriter text, a little broken: letters drop or ride up, some hit light, some
     *  doubled; o.fill ink, o.anchor, o.bold, o.track. Monospace, so typeWidth is exact enough. */
    function typeWidth(text, size, o) { return String(text == null ? '' : text).length * size * (0.6 + opt(o, 'track', 0)); }
    function type(text, x, y, size, o) {
      o = o || {};
      text = String(text == null ? '' : text);
      if (!text) return '';
      var r = SB.rng.make('tw:' + text + ':' + opt(o, 'seed', '') + ':' + f(x) + ':' + f(y)), adv = size * (0.6 + opt(o, 'track', 0)), w = text.length * adv,
          ax = o.anchor === 'middle' ? x - w / 2 : o.anchor === 'end' ? x - w : x, xs = [], ys = [], spans = '', i, c, op, ink = opt(o, 'fill', INK.toner);
      if (o.maxWidth && w > o.maxWidth) { adv *= o.maxWidth / w; w = o.maxWidth; ax = o.anchor === 'middle' ? x - w / 2 : o.anchor === 'end' ? x - w : x; }
      for (i = 0; i < text.length; i++) {
        c = text.charAt(i);
        op = r.next() < 0.12 ? 0.55 : 1;
        spans += '<tspan x="' + f(ax + i * adv + j(r, size * 0.03)) + '" y="' + f(y + j(r, size * 0.05) + (r.next() < 0.06 ? size * 0.09 : 0)) + '"' + (op < 1 ? ' fill-opacity="' + op + '"' : '') + '>' + esc(c) + '</tspan>';
      }
      return '<text' + cls(o) + ' font-family="' + esc(FONT.type) + '" font-size="' + f(size) + '" font-weight="' + (o.bold ? 700 : 600) + '" fill="' + ink + '"' +
             (o.rot ? ' transform="rotate(' + f(o.rot) + ' ' + f(x) + ' ' + f(y) + ')"' : '') + ' stroke="' + ink + '" stroke-width="' + f(size * 0.02) + '" stroke-opacity=".5">' + spans + '</text>';
    }
    /** typeLines(lines, x, y, size, lh, o): typed lines down from y, lh apart. */
    function typeLines(lines, x, y, size, lh, o) { return (lines || []).map(function (t, i) { return type(t, x, y + i * lh, size, o); }).join(''); }

    /** letter(text, x, y, size, o): hand lettering from SB.Skeleton, baseline at y; o.treatment ('marker' default, or 'block'
     *  which draws marker capitals), o.anchor, o.stroke color, o.rot degrees about (x, y), o.maxWidth, o.weight. */
    function letter(text, x, y, size, o) {
      o = o || {};
      if (!text || !SB.Skeleton || typeof SB.Skeleton.path !== 'function') return '';
      if (o.treatment === 'block' || o.treatment === 'stencil') return marker(text, x, y, size, { fill: opt(o, 'stroke', INK.toner), anchor: o.anchor, rot: o.rot, maxWidth: o.maxWidth, weight: opt(o, 'weight', 1) * 0.9, seed: o.seed, cls: o.cls, vary: 0.08, tilt: 3 });
      var p, w, ax;
      try { p = SB.Skeleton.path(String(text), size, 'marker', { rng: R({ seed: 'lt:' + text + ':' + opt(o, 'seed', '') }), maxWidth: o.maxWidth }); }
      catch (e) { return ''; }
      w = p.width;
      ax = o.anchor === 'middle' ? x - w / 2 : (o.anchor === 'end' ? x - w : x);
      return '<g' + cls(o) + (o.rot ? ' transform="rotate(' + f(o.rot) + ' ' + f(x) + ' ' + f(y) + ')"' : '') + '><path d="' + p.d + '" transform="translate(' + f(ax) + ' ' + f(y - size) + ')"' +
             ' fill="none" stroke="' + opt(o, 'stroke', INK.toner) + '" stroke-width="' + f(p.strokeWidth * opt(o, 'weight', 1.3)) + '" stroke-linecap="round" stroke-linejoin="round"/></g>';
    }
    /** letterWidth(text, size, treatment): the width lettering will take, in px. */
    function letterWidth(text, size, treatment) {
      if (treatment === 'block' || treatment === 'stencil') return markerWidth(text, size, { vary: 0.08, tilt: 3 });
      try { return SB.Skeleton.measure(String(text || ''), size, 'marker'); } catch (e) { return String(text || '').length * size * 0.6; }
    }

    /** tag(text, x, y, o): a paper tag on a string from (x, y), typed; o.fill stock, o.ink, o.size, o.rot, o.string. */
    function tag(text, x, y, o) {
      o = o || {};
      var size = opt(o, 'size', 16), w = typeWidth(text, size) + 30, h = size * 1.9, s = opt(o, 'string', 18), tx = x - 10, ty = y + s, out;
      out = '<path d="M' + f(x) + ' ' + f(y) + 'L' + f(tx + 9) + ' ' + f(ty + h / 2) + '" stroke="#f4f2ea" stroke-width="1.6"/>';
      out += paper(tx, ty, w, h, { seed: 'tag' + text, stock: opt(o, 'fill', STOCK.manila), cut: 1.4, sx: 3, sy: 4, burn: 0.3,
                                   inner: '<circle cx="' + f(tx + 9) + '" cy="' + f(ty + h / 2) + '" r="3.5" fill="#111"/>' + type(text, tx + 18, ty + h / 2 + size * 0.36, size, { fill: opt(o, 'ink', INK.toner) }) });
      return '<g' + cls(o) + (o.rot ? ' transform="rotate(' + f(o.rot) + ' ' + f(x) + ' ' + f(y) + ')"' : '') + '>' + out + '</g>';
    }

    /** tagSvg(text, o): a whole little <svg> holding a typed strip of paper with a bit of tape, sized to fit, for the
     *  HTML hover and focus tags and the put-it-down button. o.fill the stock, o.size. */
    function tagSvg(text, o) {
      o = o || {};
      var size = opt(o, 'size', 16), t = String(text || '').toUpperCase(), w = typeWidth(t, size) + 26, h = size * 1.75 + 6, body;
      body = paper(4, 6, w, h, { seed: 'tt' + t, stock: opt(o, 'fill', STOCK.white), cut: 1.3, sx: 4, sy: 5, sop: 0.75, burn: 0.45,
                                 inner: type(t, 4 + 13, 6 + h / 2 + size * 0.36, size, { bold: true }) }) +
             tape(14, 8, 34, 11, { seed: 'tt2' + t, rot: -28 });
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 ' + f(w + 16) + ' ' + f(h + 18) + '" width="' + f(w + 16) + '" height="' + f(h + 18) + '" aria-hidden="true" focusable="false">' + body + '</svg>';
    }

    /* ------------------------------------------------------------ */
    /* small marks, all centred at cx, cy and about s px across      */
    /* ------------------------------------------------------------ */

    /** heart(cx, cy, s, o): a sharpie heart: angular, filled or open (o.fill 'none'). */
    function heart(cx, cy, s, o) {
      o = o || {};
      var k = s / 20, P = function (x, y) { return [cx + x * k, cy + y * k]; },
          pts = [P(0, -4), P(4, -9), P(9, -8), P(10, -3), P(7, 3), P(0, 10), P(-7, 3), P(-10, -3), P(-9, -8), P(-4, -9)];
      return shape(pts, { seed: 'h' + opt(o, 'seed', ''), fill: opt(o, 'fill', INK.toner), sw: opt(o, 'sw', Math.max(1.6, 2.2 * k)), stroke: opt(o, 'stroke', INK.toner), wob: 0.5 * k, over: 1.2 * k, cap: 'round' });
    }

    /** star(cx, cy, s, o): kept for callers, but the desk has no star motifs: a solid marker dot, s px across, a little lopsided. */
    function star(cx, cy, s, o) {
      o = o || {};
      return ellipse(cx, cy, s * 0.3, s * 0.27, { seed: 'st' + opt(o, 'seed', ''), fill: opt(o, 'fill', INK.toner), sw: Math.max(1.6, s / 14), stroke: INK.toner, wob: s / 30 });
    }

    /** skull(cx, cy, s, o): a xeroxed skull: bone, black sockets, teeth. o.fill bone color. */
    function skull(cx, cy, s, o) {
      o = o || {};
      var k = s / 40, sw = opt(o, 'sw', Math.max(1.6, 2.4 * k)), seed = opt(o, 'seed', ''), out = '', ink = INK.toner;
      out += shape([[cx - 16 * k, cy + 2 * k], [cx - 17 * k, cy - 10 * k], [cx - 8 * k, cy - 19 * k], [cx + 8 * k, cy - 19 * k], [cx + 17 * k, cy - 10 * k],
                    [cx + 16 * k, cy + 2 * k], [cx + 10 * k, cy + 8 * k], [cx + 10 * k, cy + 16 * k], [cx - 10 * k, cy + 16 * k], [cx - 10 * k, cy + 8 * k]],
                   { seed: 'sk' + seed, fill: opt(o, 'fill', STOCK.white), sw: sw, wob: 0.6 * k });
      out += '<path d="M' + f(cx - 12 * k) + ' ' + f(cy - 8 * k) + 'L' + f(cx - 3 * k) + ' ' + f(cy - 7 * k) + 'L' + f(cx - 5 * k) + ' ' + f(cy + 1 * k) + 'L' + f(cx - 11 * k) + ' ' + f(cy) + 'Z" fill="' + ink + '"/>';
      out += '<path d="M' + f(cx + 12 * k) + ' ' + f(cy - 8 * k) + 'L' + f(cx + 3 * k) + ' ' + f(cy - 7 * k) + 'L' + f(cx + 5 * k) + ' ' + f(cy + 1 * k) + 'L' + f(cx + 11 * k) + ' ' + f(cy) + 'Z" fill="' + ink + '"/>';
      out += '<path d="M' + f(cx) + ' ' + f(cy + 2 * k) + 'L' + f(cx - 2.5 * k) + ' ' + f(cy + 6 * k) + 'L' + f(cx + 2.5 * k) + ' ' + f(cy + 6 * k) + 'Z" fill="' + ink + '"/>';
      out += '<path d="M' + f(cx - 5 * k) + ' ' + f(cy + 9 * k) + 'V' + f(cy + 15 * k) + 'M' + f(cx) + ' ' + f(cy + 9 * k) + 'V' + f(cy + 15 * k) + 'M' + f(cx + 5 * k) + ' ' + f(cy + 9 * k) + 'V' + f(cy + 15 * k) + '" stroke="' + ink + '" stroke-width="' + f(sw * 0.8) + '"/>';
      return '<g' + cls(o) + '>' + out + '</g>';
    }

    /** cat(cx, cy, s, o): a cat's head in silhouette, as from a photocopied snapshot; o.fill fur, o.sleepy closes the eyes. */
    function cat(cx, cy, s, o) {
      o = o || {};
      var k = s / 40, seed = opt(o, 'seed', ''), out = '', ink = opt(o, 'stroke', INK.toner), fill = opt(o, 'fill', INK.toner), eye = fill === 'none' ? ink : STOCK.white;
      out += shape([[cx - 17 * k, cy + 6 * k], [cx - 16 * k, cy - 8 * k], [cx - 14 * k, cy - 19 * k], [cx - 6 * k, cy - 11 * k], [cx + 6 * k, cy - 11 * k],
                    [cx + 14 * k, cy - 19 * k], [cx + 16 * k, cy - 8 * k], [cx + 17 * k, cy + 6 * k], [cx + 9 * k, cy + 14 * k], [cx - 9 * k, cy + 14 * k]],
                   { seed: 'ct' + seed, fill: fill, sw: opt(o, 'sw', Math.max(1.4, 2 * k)), stroke: ink, wob: 0.5 * k });
      if (o.sleepy) out += '<path d="M' + f(cx - 10 * k) + ' ' + f(cy - 1 * k) + 'L' + f(cx - 4 * k) + ' ' + f(cy - 1 * k) + 'M' + f(cx + 4 * k) + ' ' + f(cy - 1 * k) + 'L' + f(cx + 10 * k) + ' ' + f(cy - 1 * k) + '" stroke="' + eye + '" stroke-width="' + f(1.8 * k) + '"/>';
      else out += '<path d="M' + f(cx - 10 * k) + ' ' + f(cy - 1 * k) + 'L' + f(cx - 4 * k) + ' ' + f(cy - 3 * k) + 'L' + f(cx - 5 * k) + ' ' + f(cy + 1 * k) + 'Z M' + f(cx + 10 * k) + ' ' + f(cy - 1 * k) + 'L' + f(cx + 4 * k) + ' ' + f(cy - 3 * k) + 'L' + f(cx + 5 * k) + ' ' + f(cy + 1 * k) + 'Z" fill="' + eye + '"/>';
      return '<g' + cls(o) + '>' + out + '</g>';
    }

    /** flower(cx, cy, s, o): a five-petal flower in toner, the pressed kind. */
    function flower(cx, cy, s, o) {
      o = o || {};
      var k = s / 40, seed = opt(o, 'seed', ''), out = '', i, a;
      for (i = 0; i < 5; i++) {
        a = i / 5 * Math.PI * 2 + 0.3;
        out += ellipse(cx + Math.cos(a) * 11 * k, cy + Math.sin(a) * 11 * k, 9 * k, 6.5 * k, { seed: 'p' + i + seed, fill: opt(o, 'fill', STOCK.white), sw: Math.max(1.4, 2 * k), wob: 0.5 });
      }
      out += circle(cx, cy, 6 * k, { seed: 'c' + seed, fill: opt(o, 'center', INK.toner), sw: Math.max(1.4, 2 * k), wob: 0.4 });
      return '<g' + cls(o) + '>' + out + '</g>';
    }

    /** bolt(cx, cy, s, o): a lightning bolt. */
    function bolt(cx, cy, s, o) {
      o = o || {};
      var k = s / 40;
      return shape([[cx - 4 * k, cy - 20 * k], [cx + 10 * k, cy - 20 * k], [cx + 3 * k, cy - 4 * k], [cx + 11 * k, cy - 4 * k], [cx - 8 * k, cy + 20 * k], [cx - 2 * k, cy + 2 * k], [cx - 10 * k, cy + 2 * k]],
                   { seed: 'b' + opt(o, 'seed', ''), fill: opt(o, 'fill', INK.toner), sw: opt(o, 'sw', Math.max(1.6, 2.2 * k)), wob: 0.6 * k, over: 1.2 * k });
    }

    /** scrawl(x, y, w, o): a line of scribbled not-quite-writing (for notes too small to read). */
    function scrawl(x, y, w, o) {
      o = o || {};
      var r = R(o), pts = [], t = 0, amp = opt(o, 'amp', 3);
      while (t < w) { pts.push([x + t, y + j(r, amp)]); t += 3 + r.next() * 5; }
      return path(pts, { rng: r, sw: opt(o, 'sw', 1.6), stroke: opt(o, 'stroke', '#2a2926'), wob: 0.6 });
    }

    /** sticker(outline, inner, o): a die-cut sticker: hard shadow, fat white edge, then the inner art.
     *  outline: { circle: [cx, cy, r] } or { rect: [x, y, w, h] } or { poly: [[x, y], ...] }; o.fill the backing. */
    function sticker(outline, inner, o) {
      o = o || {};
      var r = R(o), d, edge = opt(o, 'edge', 7), fill = opt(o, 'fill', STOCK.white), sh, pts, i, c, q;
      if (outline.circle) {
        c = outline.circle; pts = [];
        for (i = 0; i < 16; i++) pts.push([c[0] + Math.cos(i / 16 * Math.PI * 2) * (c[2] + j(r, 0.8)), c[1] + Math.sin(i / 16 * Math.PI * 2) * (c[2] + j(r, 0.8))]);
        d = polyD(pts);
      } else if (outline.rect) {
        q = outline.rect;
        d = polyD(cutPts(q[0], q[1], q[2], q[3], { rng: r, cut: 1.2 }));
      } else d = polyD(outline.poly);
      sh = '<path d="' + d + '" transform="translate(4 6)" fill="#000" fill-opacity=".65" stroke="#000" stroke-opacity=".65" stroke-width="' + (edge * 2) + '" stroke-linejoin="bevel"/>';
      return '<g' + cls(o) + (o.rot ? ' transform="rotate(' + f(o.rot) + ' ' + f(opt(o, 'cx', 0)) + ' ' + f(opt(o, 'cy', 0)) + ')"' : '') + '>' + sh +
             '<path d="' + d + '" fill="' + STOCK.white + '" stroke="' + STOCK.white + '" stroke-width="' + (edge * 2) + '" stroke-linejoin="bevel"/>' +
             '<path d="' + d + '" fill="' + fill + '"/>' + (inner || '') + '</g>';
    }

    /** cutouts(parts, o): several xeroxed cut-out pieces that touch (a key's bow and blade, scissor blades and loops)
     *  under one white scissor border: all shadows, then all white edges, then all fills, so the border hugs the whole.
     *  parts: [{ d: path data, fill, rule: 'evenodd' }]; o.edge, o.rot, o.cx, o.cy, o.inner on top. */
    function cutouts(parts, o) {
      o = o || {};
      var e = opt(o, 'edge', 6), sh = '', wh = '', fl = '';
      parts.forEach(function (p) {
        var fr = p.rule ? ' fill-rule="' + p.rule + '"' : '';
        sh += '<path d="' + p.d + '"' + fr + ' transform="translate(5 7)" fill="#000" fill-opacity=".7" stroke="#000" stroke-opacity=".7" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
        wh += '<path d="' + p.d + '"' + fr + ' fill="' + STOCK.white + '" stroke="' + STOCK.white + '" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
        fl += '<path d="' + p.d + '"' + fr + ' fill="' + (p.fill || INK.toner) + '"/>';
      });
      return rotG((o.shadow === false ? '' : sh) + wh + fl + (o.inner || ''), o.rot, opt(o, 'cx', 0), opt(o, 'cy', 0), cls(o));
    }

    function ring(cx, cy, rx, ry, n, a0) {
      var pts = [], i;
      for (i = 0; i < n; i++) pts.push([cx + Math.cos(a0 + i / n * Math.PI * 2) * rx, cy + Math.sin(a0 + i / n * Math.PI * 2) * ry]);
      return pts;
    }

    /** keyShape(x, y, len, deg, o): a house key as a xeroxed cut-out, its bow's hole at (x, y), hanging along deg
     *  (90 = straight down), len px long: a round bow with a hole, a shoulder, a blade cut with bitting on one edge,
     *  a halftone highlight down the blade. o.fill, o.seed. Returns markup. */
    function keyShape(x, y, len, deg, o) {
      o = o || {};
      var r = R(o), a = (deg - 90) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), bow = 22, b0 = bow * 2 + 4, pts, blade, i, n, t, cuts = [], d;
      function T(p) { return [x + p[0] * c - p[1] * s, y + p[0] * s + p[1] * c]; }
      d = polyD(ring(0, bow, bow, bow, 16, 0.2).map(T)) + polyD(ring(0, 8, 6, 6, 10, 0).map(T));
      blade = [[-10, b0 - 6], [10, b0 - 6], [10, b0 + 6], [6, b0 + 8]];
      n = 5;
      for (i = 0; i < n; i++) { t = b0 + 14 + i * (len - b0 - 30) / n; cuts.push([6, t], [12 + r.next() * 5, t + 4], [6, t + 9 + r.next() * 3]); }
      blade = blade.concat(cuts, [[6, len - 12], [0, len], [-6, len - 10], [-6, b0 + 8], [-10, b0 + 6]]);
      var bd = polyD(blade.map(T)), hl = polyD([[-4, b0 + 10], [-1, b0 + 10], [-1, len - 16], [-4, len - 20]].map(T));
      return cutouts([{ d: d, fill: opt(o, 'fill', '#2c2c2a'), rule: 'evenodd' }, { d: bd, fill: opt(o, 'fill', '#2c2c2a') }], { edge: 4,
        inner: dots(polyD(ring(-6, bow - 6, 9, 9, 10, 0).map(T)), 3, { white: true }) + '<path d="' + hl + '" fill="#f4f2ea" fill-opacity=".8"/>' +
               '<path d="' + polyD([[-12, b0 - 7], [12, b0 - 7], [12, b0 - 3], [-12, b0 - 3]].map(T)) + '" fill="#f4f2ea" fill-opacity=".35"/>' });
    }

    /** scissors(cx, cy, s, deg, o): a pair of scissors as a xeroxed cut-out, pivot at cx, cy, s px long, pointing deg:
     *  two tapered blades a little open, two finger loops (one bigger), the pivot screw. */
    function scissors(cx, cy, s, deg, o) {
      o = o || {};
      var a = deg * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a), k = s / 200, parts;
      function T(p) { return [cx + (p[0] * c - p[1] * sn) * k, cy + (p[0] * sn + p[1] * c) * k]; }
      function P(list) { return polyD(list.map(T)); }
      parts = [
        { d: P([[-6, -9], [118, -26], [122, -22], [8, 8]]), fill: '#3a3a37' },
        { d: P([[-6, 9], [124, 20], [120, 26], [8, -8]]), fill: '#2a2a28' },
        { d: P(ring(-58, -22, 30, 21, 16, 0.3)) + P(ring(-58, -22, 18, 11, 12, 0.3)), fill: '#141413', rule: 'evenodd' },
        { d: P(ring(-52, 26, 25, 18, 16, 0.3)) + P(ring(-52, 26, 14, 9, 12, 0.3)), fill: '#141413', rule: 'evenodd' },
        { d: P([[-34, -16], [-4, -10], [-2, -2], [-30, -6]]), fill: '#141413' },
        { d: P([[-30, 18], [-4, 10], [-2, 2], [-28, 10]]), fill: '#141413' }
      ];
      return cutouts(parts, { edge: 5, inner: '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(6 * k) + '" fill="#f4f2ea"/>' +
        '<path d="' + P([[20, -10], [116, -24], [117, -22], [20, -7]]) + '" fill="#f4f2ea" fill-opacity=".7"/>' });
    }

    /* ------------------------------------------------------------ */
    /* shared defs and the copier                                    */
    /* ------------------------------------------------------------ */

    function htPattern(pid, cell, rad, ink, rot) {
      return '<pattern id="' + pid + '" width="' + cell + '" height="' + cell + '" patternUnits="userSpaceOnUse" patternTransform="rotate(' + (rot || 45) + ')">' +
             '<circle cx="' + (cell / 2) + '" cy="' + (cell / 2) + '" r="' + rad + '" fill="' + ink + '"/></pattern>';
    }

    /** defs(): the shared <defs>: halftone screens dk-ht1..4 (black) and dk-htw1..4 (white), dk-hatch, dk-rough (the
     *  marker's ragged edge), dk-grain, dk-toner, dk-boil and dk-boil-still, dk-dots and dk-lines. Put it once per SVG. */
    function defs() {
      return '<defs>' +
        htPattern('dk-ht1', 7, 1.1, '#111') + htPattern('dk-ht2', 7, 1.8, '#111') + htPattern('dk-ht3', 6, 2.3, '#111') + htPattern('dk-ht4', 6, 2.9, '#111') +
        htPattern('dk-htw1', 7, 1.1, '#f4f2ea') + htPattern('dk-htw2', 7, 1.8, '#f4f2ea') + htPattern('dk-htw3', 6, 2.3, '#f4f2ea') + htPattern('dk-htw4', 6, 2.9, '#f4f2ea') +
        '<pattern id="dk-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><path d="M0 3H6" stroke="#111" stroke-width="1.6"/></pattern>' +
        '<filter id="dk-rough" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="4" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/></filter>' +
        '<filter id="dk-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/>' +
        '<feColorMatrix values="0 0 0 0 .1  0 0 0 0 .1  0 0 0 0 .1  0 0 0 -1.1 .62"/></filter>' +
        '<filter id="dk-toner" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="3" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G"/></filter>' +
        '<filter id="dk-boil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="1" seed="1" result="n">' +
        '<animate attributeName="seed" values="1;5;9;13" dur=".42s" calcMode="discrete" repeatCount="indefinite"/></feTurbulence>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/></filter>' +
        '<filter id="dk-boil-still" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="1" seed="5" result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>' +
        '<filter id="dk-tonerize" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer>' +
        '<feFuncR type="discrete" tableValues=".07 .07 .07 .07 1"/><feFuncG type="discrete" tableValues=".07 .07 .07 .07 1"/><feFuncB type="discrete" tableValues=".07 .07 .07 .07 1"/></feComponentTransfer></filter>' +
        htPattern('dk-dots', 7, 1.4, '#111', 20) +
        '<pattern id="dk-lines" width="10" height="22" patternUnits="userSpaceOnUse"><path d="M0 21.5H10" stroke="#5a7fa6" stroke-opacity=".55" stroke-width="1"/></pattern>' +
        '</defs>';
    }

    /** photocopy(ctx, cw, ch, seed, o): the copier, on a canvas already drawn: the toner layer (near-gray pixels) gets
     *  contrast gain, noise and a soft threshold, as in js/art/flyer.js; colored stock keeps its color and takes grain;
     *  toner specks land on light paper and dust on the blacks. o.gain, o.amp, o.strength, o.floor. Returns true if it ran. */
    function photocopy(ctx, cw, ch, seed, o) {
      o = o || {};
      if (!ctx || !ctx.getImageData || !ctx.putImageData || cw < 2 || ch < 2) return false;
      var img;
      try { img = ctx.getImageData(0, 0, cw, ch); } catch (e) { return false; }
      if (!img || !img.data) return false;
      var d = img.data, rng = SB.rng.make('copy:' + seed), gain = opt(o, 'gain', 1.55), amp = opt(o, 'amp', 0.2), strength = opt(o, 'strength', 0.64),
          floor = opt(o, 'floor', 11), cell = Math.max(6, Math.round(opt(o, 'cell', 9) * opt(o, 'px', 1))), gw = Math.ceil(cw / cell) + 2, gh = Math.ceil(ch / cell) + 2,
          grid = new Float32Array(gw * gh), s0 = rng.int(1, 100000), s1 = rng.int(1, 100000), i, x, y, idx, r, g, b, mx, mn, L, gx, gy, x0, y0, fx, fy, nl, nh, hv, v, t, out, dl, sp;
      var streak = new Float32Array(cw), bands = opt(o, 'streaks', 7), bx, bw2, bi, q;
      for (i = 0; i < grid.length; i++) grid[i] = rng.next() * 2 - 1;
      for (i = 0; i < bands; i++) {
        bx = rng.int(0, cw - 1); bw2 = rng.int(1, Math.max(2, Math.round(cw / 60))); bi = rng.range(10, 34);
        for (q = bx; q < bx + bw2 && q < cw; q++) streak[q] += bi * (0.6 + 0.4 * Math.sin((q - bx) / bw2 * Math.PI));
      }
      for (y = 0; y < ch; y++) {
        gy = y / cell; y0 = gy | 0; fy = gy - y0;
        for (x = 0; x < cw; x++) {
          idx = (y * cw + x) * 4;
          r = d[idx]; g = d[idx + 1]; b = d[idx + 2];
          mx = r > g ? (r > b ? r : b) : (g > b ? g : b); mn = r < g ? (r < b ? r : b) : (g < b ? g : b);
          L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          gx = x / cell; x0 = gx | 0; fx = gx - x0;
          nl = (grid[y0 * gw + x0] * (1 - fx) + grid[y0 * gw + x0 + 1] * fx) * (1 - fy) + (grid[(y0 + 1) * gw + x0] * (1 - fx) + grid[(y0 + 1) * gw + x0 + 1] * fx) * fy;
          hv = Math.imul(x + s0, 374761393) ^ Math.imul(y + s1, 668265263);
          hv = Math.imul(hv ^ (hv >>> 13), 1274126177);
          nh = ((hv ^ (hv >>> 16)) >>> 0) / 4294967296;
          if (mx - mn <= 44) {
            v = (L - 0.5) * gain + 0.5 + amp * (0.6 * (nh * 2 - 1) + 0.4 * nl);
            v = v < 0 ? 0 : v > 1 ? 1 : v;
            t = (v - 0.42) / 0.16; t = t < 0 ? 0 : t > 1 ? 1 : t; t = t * t * (3 - 2 * t);
            out = v + (t - v) * strength;
            dl = (out - L) * 255;
          } else {
            dl = amp * 0.3 * (nh * 2 - 1) * 255 + (nl > 0.6 ? -(nl - 0.6) * 40 : 0);
          }
          sp = L > 0.45 ? -streak[x] * (0.6 + 0.4 * nl) - (L > 0.7 && nl > 0.15 ? (nl - 0.15) * 34 : 0) : 0;
          hv = Math.imul((x >> 1) + s1, 668265263) ^ Math.imul((y >> 1) + s0, 374761393);
          hv = Math.imul(hv ^ (hv >>> 15), 2246822519);
          t = ((hv ^ (hv >>> 13)) >>> 0) / 4294967296;
          if (t < 0.007 + (nl > 0.35 ? 0.009 : 0) && L > 0.55) sp = -150 - t * 9000;
          else if (t > 0.996 && L < 0.25) sp = 50 + (1 - t) * 14000;
          r = r + dl + sp; g = g + dl + sp; b = b + dl + sp;
          d[idx] = r < floor ? floor : r > 255 ? 255 : r;
          d[idx + 1] = g < floor ? floor : g > 255 ? 255 : g;
          d[idx + 2] = b < floor + 1 ? floor + 1 : b > 255 ? 255 : b;
        }
      }
      ctx.putImageData(img, 0, 0);
      return true;
    }

    /** ink(name): a flyer ink's hex (city inks are names like 'bayouTeal'); unknown names give toner. */
    function ink(name) { return INK[name] || (/^#/.test(String(name)) ? name : INK.toner); }
    /** mat(name): a stock or desk material's hex: toner, paper, white, bone, blue, mint, goldenrod, pink, manila, kraft, table, olive... */
    function mat(name) { return MAT[name] || STOCK[name] || MAT.toner; }
    /** rng(seed): a seeded generator for scene-level placement (SB.rng.make under the hood). */
    function rng(seed) { return R({ seed: seed }); }

    return {
      rect: rect, poly: shape, ellipse: ellipse, circle: circle, line: line, path: path, blob: blob, hatch: hatch,
      torn: torn, tape: tape, staple: staple, pin: pin, stud: stud, sticker: sticker,
      letter: letter, letterWidth: letterWidth, tag: tag, tagSvg: tagSvg,
      heart: heart, star: star, skull: skull, cat: cat, flower: flower, bolt: bolt, scrawl: scrawl,
      paper: paper, photo: photo, cutPts: cutPts, cutout: cutout, cutouts: cutouts, keyShape: keyShape, scissors: scissors, dots: dots, dotsRect: dotsRect, regmark: regmark, glue: glue,
      circle3: circle3, under3: under3, arrow: arrow, scribble: scribble, xout: xout,
      marker: marker, markerWidth: markerWidth, ransom: ransom, ransomWidth: ransomWidth, type: type, typeWidth: typeWidth, typeLines: typeLines,
      photocopy: photocopy, stock: stock, polyD: polyD, id: id,
      defs: defs, ink: ink, mat: mat, rng: rng, esc: esc, smooth: smooth
    };
  });
})(SB);
