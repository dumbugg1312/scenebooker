/* Scene Booker: js/art/nightscene.js (ART; drawn for js/ui/screens/night.js and design/sample/night-sample.html)
 * SB.NightScene: the show night as a paste-up. You are at the door. Past your table, a photocopied sheet: the room's
 * doorway, the line waiting to get in (real cut-outs from the booker's kits, SB.Cutouts), and through the doorway the
 * band on the floor (SB.Scenes.draw: the same cutscene picture, name on the kick). On the table, from above: the set
 * list, the tally scrap, the clicker, the cash tin, the stamp and pad, the marker, the watch, the drink, the sign.
 * Every person is a cut-out; nothing here draws a person.
 *
 * SB.NightScene.doorway(canvas, ctx, done)  paint the doorway sheet. ctx: { room: CARPORT|HOUSE|HALL|BAR, phase:
 *                                           doors|set|settle|after, band, bands, seed, paper, line (how many waiting) }
 * SB.NightScene.object(kind, opts)         -> <canvas>, a table object xeroxed and cut out with a paper margin.
 *                                           kinds: tin, stamp, marker, clicker, can, rings, watch, pile
 * SB.NightScene.marker(text, size, opts)   -> SVG markup: sharpie capitals (SB.Skeleton), stroke = currentColor
 * SB.NightScene.tally(n, opts)             -> SVG markup: tally marks in fives
 * SB.NightScene.paper(stock, seed)         -> data URL: a sheet of copy paper with toner specks (CSS background)
 * SB.NightScene.view(state, on)            -> the whole screen as DOM (see design/sample/night-sample.html for state)
 *
 * The photocopier pass and the cut-out pasting are SB.Scenes's own (SB.Scenes.copier, .paste, .loadCuts), so the night
 * prints on the same machine as the cutscenes.
 */
SB.module('NightScene', function (SB) {
  'use strict';

  var TAU = Math.PI * 2, TONER = '#141312';
  var PAPERS = (SB.Scenes && SB.Scenes.papers) || { goldenrod: '#EBBA4E', white: '#F2F0E6', pink: '#F0B2C0', canary: '#ECD668', blue: '#B4CDE4', green: '#C0DCA4' };
  var STOCK = { white: '#F2F0E6', bone: '#E9DFC6', kraft: '#B8925C', tape: '#E6DCB8', index: '#F7F5EE' };
  function stockOf(s) { return PAPERS[s] || STOCK[s] || (String(s || '').charAt(0) === '#' ? s : STOCK.white); }

  /* ---------------- small helpers ---------------- */
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function g(v) { var n = Math.round(clamp(v, 0, 1) * 255); return 'rgb(' + n + ',' + n + ',' + n + ')'; }
  function mk(w, h) { var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h)); return c; }
  function R(seed) { return SB.rng.make('night:' + seed); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function rect(c, x, y, w, h, v) { c.fillStyle = g(v); c.fillRect(x, y, w, h); }
  function ell(c, x, y, rx, ry, v, rot) { c.beginPath(); c.ellipse(x, y, Math.abs(rx), Math.abs(ry), rot || 0, 0, TAU); c.fillStyle = g(v); c.fill(); }
  function line(c, x1, y1, x2, y2, w, v) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.lineWidth = w; c.lineCap = 'round'; c.strokeStyle = g(v); c.stroke(); }
  function rrect(c, x, y, w, h, r, v) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); c.fillStyle = g(v); c.fill(); }
  function soft(c, px, fn) { c.save(); c.filter = 'blur(' + px + 'px)'; fn(); c.restore(); }
  function turned(c, x, y, a, fn) { c.save(); c.translate(x, y); c.rotate(a); fn(); c.restore(); }
  function typed(c, t, x, y, size, v, align) { c.save(); c.font = '700 ' + size + 'px "Courier New", Courier, monospace'; c.fillStyle = g(v); c.textAlign = align || 'left'; c.fillText(t, x, y); c.restore(); }

  /* ---------------- the copier and the cut-outs: SB.Scenes's own ---------------- */
  function copier(cv, o) { return SB.Scenes && SB.Scenes.copier ? SB.Scenes.copier(cv, o) : cv; }
  function paste(c, id, o) { return SB.Scenes && SB.Scenes.paste ? SB.Scenes.paste(c, id, o) : false; }
  function load(ids, cb) { if (SB.Scenes && SB.Scenes.loadCuts) SB.Scenes.loadCuts(ids, cb); else if (cb) cb(); }

  /* a white scissor margin around whatever is drawn on cv (uneven, as cut by hand), behind it */
  function margin(cv, px, seed) {
    var W = cv.width, H = cv.height, out = mk(W, H), oc = out.getContext('2d'), sil = mk(W, H), sc = sil.getContext('2d'), r = R('cut:' + seed), i;
    for (i = 0; i < 18; i++) { var a = i * TAU / 18, dd = px * r.range(0.6, 1.3); sc.drawImage(cv, Math.cos(a) * dd, Math.sin(a) * dd); }
    sc.globalCompositeOperation = 'source-in'; sc.fillStyle = '#F4F2EA'; sc.fillRect(0, 0, W, H);
    oc.drawImage(sil, 0, 0); oc.drawImage(cv, 0, 0);
    return out;
  }

  function cuts() { return SB.Cutouts || []; }
  /* who is in the line tonight: from the save's seed, never the same person twice */
  function lineCast(seed, n) {
    var pool = cuts().filter(function (k) { return (k.role === 'line' || k.role === 'back' || k.role === 'standing') && (k.frame === 'full' || k.frame === 'waist'); });
    var r = R('line:' + seed), out = [], i, j, t;
    pool = pool.slice();
    for (i = pool.length - 1; i > 0; i--) { j = Math.floor(r.next() * (i + 1)); t = pool[i]; pool[i] = pool[j]; pool[j] = t; }
    for (i = 0; i < n && pool.length; i++) out.push(pool[i % pool.length]);
    return out;
  }

  /* ---------------- the doorway sheet ---------------- */
  var PW = 1220, PH = 360;
  function openingOf(kind) {
    return ({ CARPORT: [646, 52, 1170, PH], HOUSE: [700, 46, 1010, PH], HALL: [650, 40, 1130, PH], BAR: [660, 58, 1090, PH] })[kind] || [700, 46, 1010, PH];
  }
  function wall(c, r, kind, op) {
    var i, j, x0 = op[0], x1 = op[2], y0 = op[1];
    if (kind === 'CARPORT') {
      rect(c, 0, 0, PW, PH, 0.2);
      soft(c, 60, function () { ell(c, 160, 60, 320, 120, 0.62); ell(c, 480, 30, 220, 60, 0.45); });
      for (i = 0; i < 30; i++) { line(c, 8 + i * 21, 214 + (i % 2) * 4, 9 + i * 21, PH, 15, 0.66); }   // the fence along the drive
      line(c, 0, 248, 640, 244, 7, 0.4); line(c, 0, 318, 640, 314, 7, 0.4);
      line(c, 250, 0, 252, 214, 7, 0.35); soft(c, 14, function () { ell(c, 262, 18, 50, 30, 1); });   // the streetlight
      rect(c, x0 - 40, y0 - 30, PW - x0 + 60, 34, 0.55);                                        // the carport roof edge
      for (i = 0; i < 26; i++) line(c, x0 - 30 + i * 22, y0 - 28, x0 - 30 + i * 22, y0 + 2, 2, 0.4);
      rect(c, x0 - 22, y0, 20, PH - y0, 0.3); rect(c, x1 + 2, y0, 20, PH - y0, 0.3);         // posts
      for (i = 0; i < 12; i++) {                                                                 // string lights
        var bx = x0 + 10 + i * (x1 - x0 - 20) / 11, by = y0 + 10 + Math.sin(i / 11 * Math.PI) * 22;
        soft(c, 6, function () { ell(c, bx, by + 6, 14, 14, 0.95); });
      }
    } else if (kind === 'HALL') {
      rect(c, 0, 0, PW, PH, 0.5);
      for (j = 0; j < PH; j += 26) { line(c, 0, j, PW, j, 2, 0.38); for (i = (j / 26 % 2) * 30; i < PW; i += 60) line(c, i, j, i, j + 26, 2, 0.38); }
      rect(c, x0 - 18, y0 - 18, x1 - x0 + 36, PH, 0.75);
      rect(c, x0 - 70, y0, 64, PH - y0, 0.3); rect(c, x1 + 6, y0, 64, PH - y0, 0.3);            // the doors, swung open
      rect(c, (x0 + x1) / 2 - 34, 6, 68, 26, 0.92); typed(c, 'EXIT', (x0 + x1) / 2, 26, 20, 0.05, 'center');
    } else if (kind === 'BAR') {
      rect(c, 0, 0, PW, PH, 0.22);
      for (j = 0; j < PH; j += 18) { line(c, 0, j, PW, j, 2, 0.34); for (i = (j / 18 % 2) * 22; i < PW; i += 44) line(c, i, j, i, j + 18, 2, 0.34); }
      rect(c, x0 - 16, y0 - 16, x1 - x0 + 32, PH, 0.12);
      soft(c, 8, function () { c.strokeStyle = g(0.95); c.lineWidth = 8; c.strokeRect(80, 60, 300, 110); });
      c.strokeStyle = g(0.98); c.lineWidth = 4; c.strokeRect(80, 60, 300, 110);
      if (SB.Skeleton && SB.Skeleton.draw) { soft(c, 5, function () { SB.Skeleton.draw(c, 'OPEN', 150, 146, 64, 'marker', { ink: g(0.9), rng: SB.rng.make('neon') }); });
        SB.Skeleton.draw(c, 'OPEN', 150, 146, 64, 'marker', { ink: g(1), rng: SB.rng.make('neon') }); }
    } else {                                                                                     // HOUSE (and the rest)
      rect(c, 0, 0, PW, PH, 0.42);
      for (j = 8; j < PH; j += 22) line(c, 0, j, PW, j + 1, 3, 0.3);                            // siding
      rect(c, x0 - 18, y0 - 18, x1 - x0 + 36, PH, 0.86);                                        // the trim
      c.strokeStyle = g(0.15); c.lineWidth = 6; c.beginPath(); c.moveTo(x1 + 18, y0); c.lineTo(x1 + 120, y0 + 30); c.lineTo(x1 + 120, PH); c.stroke();
      soft(c, 18, function () { ell(c, x0 - 50, y0 + 10, 40, 40, 0.98); }); ell(c, x0 - 50, y0 + 10, 12, 16, 1);
    }
  }
  function stageKey(ctx) {
    return ctx.phase === 'set' || ctx.phase === 'doors' ? 'STAGE_BAND' : 'EMPTY_ROOM';
  }
  function blank(cv) {
    try { var d = cv.getContext('2d').getImageData(cv.width / 2 - 40, cv.height / 2 - 40, 80, 80).data, t = 0, i; for (i = 0; i < d.length; i += 4) t += d[i + 3] < 128 ? 0 : d[i] + d[i + 1] + d[i + 2]; return t / (d.length / 4) < 120; } catch (e) { return false; }
  }
  function doorway(cv, ctx, done) {
    ctx = ctx || {};
    var kind = ctx.room || 'HOUSE', n = Math.max(0, Math.min(8, ctx.line || 0)), cast = lineCast(ctx.seed || '', n);
    var key = stageKey(ctx), sctx = { seed: ctx.seed, band: ctx.band, bands: ctx.bands, paper: 'white', cover: ctx.cover, room: ctx.roomName };
    var ids = cast.map(function (k) { return k.id; }), left = 2;
    function go() { if (--left === 0) { paint(); if (done) done(cv); } }
    load(ids, go);
    if (SB.Scenes && SB.Scenes.preload) SB.Scenes.preload([key], go, [sctx], 5000); else go();
    function paint() {
      var W = cv.width, H = cv.height, s = W / PW, src = mk(W, H), c = src.getContext('2d'), r = R('door:' + ctx.seed + kind), op = openingOf(kind);
      c.save(); c.scale(s, s);
      wall(c, r, kind, op);
      /* through the doorway: the room, from the cutscenes (already through their copier, on white) */
      if (SB.Scenes && SB.Scenes.draw) {
        var ow = op[2] - op[0], oh = op[3] - op[1], sh = mk(1200 * s * 0.62, 750 * s * 0.62);
        SB.Scenes.draw(sh, key, sctx);
        for (var tries = 0; tries < 3 && blank(sh); tries++) SB.Scenes.draw(sh, key, sctx);   /* came back empty or all toner (seen in headless runs): again */
        var sc = Math.max(ow / 1200, oh * 1.18 / 750), dw = 1200 * sc, dh = 750 * sc;
        c.save(); c.beginPath(); c.rect(op[0], op[1], ow, oh); c.clip();
        c.filter = 'contrast(1.05) brightness(1.05)';
        c.drawImage(sh, op[0] + ow / 2 - 610 * sc, op[1] + oh - dh * 0.97, dw, dh);
        c.restore();
      }
      /* the line, along the wall to the left of the door; the head of the line at your table */
      var i, k, top, h, bottom, x, wmax = 210;
      for (i = cast.length - 1; i >= 0; i--) {
        k = cast[i]; x = op[0] - 70 - i * 72 + r.range(-10, 10); top = 70 + (i % 3) * 16 + r.range(-8, 8) + (i ? 0 : -18);
        bottom = PH + 14;
        h = k.frame === 'full' ? (bottom - top) / 0.56 : bottom - top;
        if (k.frame === 'full') bottom = top + h;
        if (h * k.w / k.h > wmax) { var h2 = wmax * k.h / k.w; if (k.frame !== 'full') { h = h2; bottom = Math.max(bottom, top + h); } }
        paste(c, k.id, { x: x, y: bottom, h: h, rot: r.range(-0.03, 0.03), flip: (i % 2 === 1) && k.facing !== 'back', border: 5, bright: 1.22, contrast: 1.25 });
      }
      /* the night: darker at the edges */
      var gr = c.createRadialGradient(PW * 0.6, PH * 0.45, PH * 0.3, PW * 0.6, PH * 0.45, PW * 0.75);
      gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(0,0,0,.2)'); c.fillStyle = gr; c.fillRect(0, 0, PW, PH);
      c.restore();
      var out = cv.getContext('2d'); out.drawImage(src, 0, 0);
      copier(cv, { paper: stockOf(ctx.paper || 'goldenrod'), cell: Math.max(3.2, W / 330), contrast: 1.35, bias: 0.09, seed: 'door:' + ctx.seed + ctx.phase });
    }
    return cv;
  }

  /* ---------------- the table objects ---------------- */
  /* each drawn in grays on a transparent sheet at 2x, through the copier on white, cut out with a margin */
  var OBJ = {
    tin: [250, 190, function (c, o, r) {
      var w = 250, h = 190, i, fill = o.fill || 0;
      rect(c, 4, 0, w - 8, 30, 0.35); for (i = 0; i < 12; i++) line(c, 10 + i * 20, 4, 4 + i * 20, 28, 2, 0.55);     // the lid, open
      rrect(c, 0, 26, w, h - 26, 8, 0.5); rect(c, 8, 34, w - 16, h - 42, 0.22);
      for (i = 0; i < 4; i++) {                                                                    // the bill tray
        var tx = 14 + i * 56; rect(c, tx, 40, 50, 76, 0.1);
        var nb = Math.round(fill * 5 + (o.empty ? 0 : (i < 2 ? 1 : 0)) * (fill > 0 ? 1 : 0));
        if (o.empty) nb = 0;
        for (var b = 0; b < nb; b++) turned(c, tx + 25, 80 - b * 1.5, r.range(-0.12, 0.12), function () {
          rect(c, -22, -34, 44, 70, 0.86); c.strokeStyle = g(0.3); c.lineWidth = 1.5; c.strokeRect(-19, -31, 38, 64);
          ell(c, 0, 0, 9, 13, 0.55); typed(c, ['1', '5', '10', '20'][i], -16, -18, 11, 0.2);
        });
      }
      for (i = 0; i < 3; i++) {                                                                    // the coin cups
        ell(c, 48 + i * 77, 150, 28, 22, 0.58); ell(c, 48 + i * 77, 151, 23, 17, 0.12);
        if (!o.empty) for (var cn = 0; cn < Math.round(fill * 6); cn++) ell(c, 40 + i * 77 + r.range(-10, 14), 150 + r.range(-8, 8), 7, 6, 0.8);
      }
    }],
    stamp: [190, 120, function (c, o, r) {
      rect(c, 0, 18, 110, 76, 0.3); rect(c, 8, 26, 94, 60, 0.05);                                  // the ink pad
      for (var i = 0; i < 40; i++) ell(c, 12 + r.next() * 86, 30 + r.next() * 52, 1.5, 1.5, 0.3);
      rrect(c, 124, 52, 56, 52, 4, 0.3); rect(c, 128, 96, 48, 8, 0.05);                            // the stamp
      ell(c, 152, 36, 26, 26, 0.18); ell(c, 146, 30, 9, 7, 0.75); line(c, 152, 58, 152, 62, 10, 0.25);
    }],
    marker: [200, 34, function (c) {
      rrect(c, 0, 4, 140, 26, 12, 0.1); rrect(c, 132, 2, 66, 30, 8, 0.06); rect(c, 18, 9, 94, 16, 0.92);
      typed(c, 'PERMANENT', 22, 22, 13, 0.08); line(c, 194, 17, 200, 17, 6, 0.1);
    }],
    clicker: [150, 160, function (c, o) {
      c.strokeStyle = g(0.35); c.lineWidth = 7; c.beginPath(); c.arc(28, 136, 18, 0, TAU); c.stroke();
      line(c, 40, 124, 52, 112, 7, 0.35);
      line(c, 75, 16, 75, 32, 10, 0.4); ell(c, 75, 12, 15, 10, 0.55); ell(c, 72, 10, 6, 3, 0.9);
      ell(c, 75, 88, 66, 60, 0.42); ell(c, 75, 86, 60, 54, 0.8); ell(c, 60, 66, 26, 12, 0.95, -0.4);
      rect(c, 25, 72, 100, 36, 0.05);
      var d = ('0000' + Math.max(0, Math.round(o.count || 0))).slice(-4);
      for (var i = 0; i < 4; i++) { rect(c, 29 + i * 24, 76, 20, 28, 0.95); typed(c, d.charAt(i), 39 + i * 24, 99, 24, 0.02, 'center'); }
    }],
    can: [104, 104, function (c, o) {
      ell(c, 52, 52, 48, 48, 0.55); ell(c, 52, 52, 41, 41, 0.82); ell(c, 52, 52, 36, 36, 0.7);
      ell(c, 52, 34, 13, 8, o.empty ? 0.05 : 0.15); rrect(c, 40, 42, 24, 30, 9, 0.5); ell(c, 52, 64, 6, 5, 0.85);
      if (o.empty) { line(c, 20, 30, 84, 74, 4, 0.3); line(c, 24, 76, 80, 26, 3, 0.35); }
    }],
    rings: [170, 140, function (c, o, r) {
      for (var i = 0; i < (o.n || 2); i++) { c.strokeStyle = 'rgba(0,0,0,' + r.range(0.35, 0.6) + ')'; c.lineWidth = r.range(2, 4); c.beginPath(); c.arc(70 + r.range(-25, 30), 70 + r.range(-20, 20), 46, r.range(0, 1), r.range(4.5, 6.2)); c.stroke(); }
    }],
    watch: [92, 160, function (c, o) {
      rect(c, 26, 0, 40, 160, 0.12); for (var i = 0; i < 4; i++) ell(c, 46, 124 + i * 9, 3, 3, 0.45);
      rrect(c, 6, 42, 80, 76, 10, 0.28); rect(c, 14, 58, 64, 40, 0.84);
      typed(c, o.time || '--:--', 46, 86, 18, 0.05, 'center'); typed(c, 'LIGHT', 46, 112, 8, 0.8, 'center');
    }],
    pile: [140, 88, function (c, o, r) {
      var n = o.n || 4;
      for (var i = 0; i < n; i++) turned(c, 70 + r.range(-6, 6), 46 - i * 2, r.range(-0.18, 0.18), function () {
        rect(c, -60, -28, 120, 56, 0.85); c.strokeStyle = g(0.35); c.lineWidth = 1.6; c.strokeRect(-55, -24, 110, 48);
        ell(c, 0, 0, 14, 18, 0.55); typed(c, o.bill || '5', -50, -10, 12, 0.2); typed(c, o.bill || '5', 38, 20, 12, 0.2);
      });
      line(c, 46, 14, 50, 80, 5, 0.2);                                                              // the rubber band
    }]
  };
  var OCACHE = {}, ON = 0;
  function object(kind, o) {
    o = o || {};
    var key = kind + JSON.stringify(o), hit = OCACHE[key], cp;
    if (hit) {                                   /* drawn already: a copy of it (one canvas can't sit in two places) */
      cp = mk(hit.width, hit.height); cp.getContext('2d').drawImage(hit, 0, 0);
      cp.style.width = hit.style.width; cp.style.height = hit.style.height; cp.setAttribute('aria-hidden', 'true'); cp.className = 'nc-objart';
      return cp;
    }
    if (++ON > 60) { OCACHE = {}; ON = 0; }
    var spec = OBJ[kind]; if (!spec) return mk(1, 1);
    var k = 2, m = 8, w = spec[0], h = spec[1], cv = mk((w + m * 2) * k, (h + m * 2) * k), c = cv.getContext('2d');
    c.scale(k, k); c.translate(m, m);
    spec[2](c, o, R(kind + ':' + (o.seed || '')));
    copier(cv, { paper: PAPERS.white, cell: 3.4, contrast: 1.5, alpha: true, seed: kind + (o.seed || '') });
    c.setTransform(1, 0, 0, 1, 0, 0);
    var out = kind === 'rings' ? cv : margin(cv, 5 * k, kind + (o.seed || ''));
    var f = o.size || 1;
    out.style.width = ((w + m * 2) * f) + 'px'; out.style.height = ((h + m * 2) * f) + 'px';
    out.setAttribute('aria-hidden', 'true'); out.className = 'nc-objart';
    OCACHE[key] = out;
    return object(kind, o);
  }

  /* ---------------- lettering ---------------- */
  function marker(text, size, o) {
    o = o || {};
    if (!SB.Skeleton) return '<span class="nc-mk-fb">' + esc(text) + '</span>';
    var p = SB.Skeleton.path(String(text).toUpperCase(), size, o.treatment || 'marker', { maxWidth: o.maxWidth, rng: SB.rng.make('nmk:' + text + (o.seed || '')) });
    var sw = p.strokeWidth * (o.weight || 1), pad = sw;
    return '<svg class="nc-mk" aria-hidden="true" width="' + (p.width + pad * 2).toFixed(1) + '" height="' + (size + pad * 2).toFixed(1) + '" viewBox="' + (-pad) + ' ' + (-pad) + ' ' + (p.width + pad * 2).toFixed(1) + ' ' + (size + pad * 2).toFixed(1) + '">' +
      '<path d="' + p.d + '" fill="none" stroke="currentColor" stroke-width="' + sw.toFixed(2) + '" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function tally(n, o) {
    o = o || {};
    var r = R('tally:' + n + (o.seed || '')), hgt = o.h || 30, gap = o.gap || 9, gw = gap * 4 + 14, per = o.per || 6, rows = Math.ceil(Math.max(1, n) / 5 / per), d = '', i, gi, x0, y0, j, cnt;
    for (gi = 0; gi * 5 < n; gi++) {
      x0 = (gi % per) * gw + 4; y0 = Math.floor(gi / per) * (hgt + 10) + 4; cnt = Math.min(5, n - gi * 5);
      for (j = 0; j < Math.min(4, cnt); j++) { var x = x0 + j * gap + r.range(-1.5, 1.5); d += 'M' + x.toFixed(1) + ' ' + (y0 + r.range(0, 3)).toFixed(1) + 'L' + (x + r.range(-2, 2)).toFixed(1) + ' ' + (y0 + hgt + r.range(-3, 0)).toFixed(1); }
      if (cnt === 5) d += 'M' + (x0 - 5) + ' ' + (y0 + hgt * 0.8).toFixed(1) + 'L' + (x0 + gap * 3 + 6) + ' ' + (y0 + hgt * 0.15).toFixed(1);
    }
    var W = per * gw + 8, H = rows * (hgt + 10) + 4;
    return '<svg class="nc-tally" aria-hidden="true" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
  }

  /* ---------------- copy paper ---------------- */
  var TEX = {};
  function paper(stock, seed) {
    var key = stock + ':' + (seed || ''); if (TEX[key]) return TEX[key];
    var S = 360, cv = mk(S, S), c = cv.getContext('2d'), r = R('tex:' + key), i;
    c.fillStyle = stockOf(stock); c.fillRect(0, 0, S, S);
    c.fillStyle = TONER;
    for (i = 0; i < 260; i++) { c.globalAlpha = r.range(0.15, 0.7); c.beginPath(); c.arc(r.range(0, S), r.range(0, S), r.range(0.3, 1.2), 0, TAU); c.fill(); }
    for (i = 0; i < 6; i++) { var cx = r.range(0, S), cy = r.range(0, S); for (var k = 0; k < 14; k++) { c.globalAlpha = r.range(0.2, 0.6); c.beginPath(); c.arc(cx + r.range(-8, 8), cy + r.range(-8, 8), r.range(0.4, 1), 0, TAU); c.fill(); } }
    c.globalAlpha = 0.05; for (i = 0; i < 3; i++) c.fillRect(0, r.range(0, S), S, r.range(1, 3));
    c.globalAlpha = 1;
    TEX[key] = cv.toDataURL('image/png');
    return TEX[key];
  }
  /* a torn edge, as a CSS clip-path: sides is a string of t r b l */
  function torn(sides, seed, depth) {
    var r = R('torn:' + seed), d = depth || 3, pts = [], i, n = 18;
    function j() { return r.range(0, d); }
    for (i = 0; i <= n; i++) pts.push((i / n * 100).toFixed(1) + '% ' + (sides.indexOf('t') >= 0 ? j() : 0).toFixed(1) + 'px');
    for (i = 1; i <= n; i++) pts.push('calc(100% - ' + (sides.indexOf('r') >= 0 ? j() : 0).toFixed(1) + 'px) ' + (i / n * 100).toFixed(1) + '%');
    for (i = n - 1; i >= 0; i--) pts.push((i / n * 100).toFixed(1) + '% calc(100% - ' + (sides.indexOf('b') >= 0 ? j() : 0).toFixed(1) + 'px)');
    for (i = n - 1; i > 0; i--) pts.push((sides.indexOf('l') >= 0 ? j() : 0).toFixed(1) + 'px ' + (i / n * 100).toFixed(1) + '%');
    return 'polygon(' + pts.join(',') + ')';
  }

  /* ---------------- the pieces on the table ---------------- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag), k;
    attrs = attrs || {};
    for (k in attrs) {
      if (attrs[k] == null || attrs[k] === false) continue;
      if (k === 'style' && typeof attrs[k] === 'object') { for (var s in attrs[k]) if (attrs[k][s] != null) el.style.setProperty(s, attrs[k][s]); }
      else if (k === 'html') el.innerHTML = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (k === 'on') { for (var ev in attrs[k]) el.addEventListener(ev, attrs[k][ev]); }
      else el.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c == null) return; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function at(x, y, rot, extra) { var s = { left: x + 'px', top: y + 'px', '--rot': (rot || 0) + 'deg' }; for (var k in (extra || {})) s[k] = extra[k]; return s; }

  /* where everything sits on the 1280 x 800 board: [left, top, turn]; the settle moves a few things to clear the
   * middle of the table for the cash */
  var LAY = {
    title: [26, 8, -0.6], photo: [30, 34, -0.5], lineLbl: [48, 342, -1.4], onLbl: [690, 70, 1.6],
    setlist: [34, 404, -1.6], tally: [296, 414, 1.6], watch: [250, 616, 9], stamp: [396, 628, -6], marker: [560, 690, -24],
    stampChip: [470, 618, -3], clicker: [938, 412, -4], doorChip: [972, 398, -2], gens: [962, 588, 1.2], rings: [1112, 404, 0],
    can: [1146, 406, 12], card: [1100, 524, 4], tin: [936, 618, -2], cashChip: [1020, 640, 2], stop: [664, 762, -2.4],
    now: [34, 768, -0.8], sign: [578, 432, -2.6], note: [566, 412, 1.2], skip: [1100, 762, -2], payout: [572, 400, -0.8],
    result: [30, 398, 0.6], leave: [1004, 232, 3], posts: [1142, 200, -4]
  };
  var LAY_SETTLE = { tally: [44, 150, -3], lineLbl: [330, 342, -1.4], watch: [226, 612, 9], stamp: [1150, 650, 84], marker: [1104, 748, -8] };
  var PILES = [[338, 410], [450, 418], [338, 514], [450, 520], [338, 618], [450, 624]];
  function pos(name, settle) { return (settle && LAY_SETTLE[name]) || LAY[name] || [0, 0, 0]; }
  function placed(name, settle, extra) { var p = pos(name, settle); return at(p[0], p[1], p[2], extra); }
  function paperStyle(stock, seed, edges, extra) {
    var s = { 'background-color': stockOf(stock), 'background-image': 'url(' + paper(stock, seed) + ')', 'clip-path': edges ? torn(edges, seed) : null };
    for (var k in (extra || {})) s[k] = extra[k];
    return s;
  }
  function withPos(style, name, settle) { var p = pos(name, settle); style.left = p[0] + 'px'; style.top = p[1] + 'px'; style['--rot'] = p[2] + 'deg'; return style; }
  function tape(x, y, w, rot, cls) { return h('span', { class: 'nc-piece nc-tape ' + (cls || ''), 'aria-hidden': 'true', style: at(x, y, rot, { width: w + 'px' }) }); }
  function chip(label, value, name, settle) {
    return h('span', { class: 'nc-piece nc-chip', 'aria-hidden': 'true', style: placed(name, settle) }, [h('b', { text: label }), value != null && value !== '' ? h('span', { text: value }) : null]);
  }

  /* the room's kind, as the doorway draws it */
  function doorKind(room) {
    var k = room && room.kind, n = String((room && room.name) || '');
    if (/carport|garage|driveway|yard|porch/i.test(n)) return 'CARPORT';
    return ({ HOUSE: 'HOUSE', DIY: 'CARPORT', OUTDOOR: 'CARPORT', HALL: 'HALL', SHOP: 'HALL', BAR: 'BAR', CLUB: 'BAR', BIG: 'HALL' })[k] || 'HOUSE';
  }
  function paperFor(seed) { var l = ['goldenrod', 'canary', 'pink', 'blue', 'green', 'salmon']; return l[(R('pp:' + seed).next() * l.length) | 0]; }

  var parts = {
    title: function (room, day) { return h('h1', { class: 'nc-piece nc-title', style: placed('title') }, [h('b', { text: room || '' }), day ? h('span', { text: day }) : null]); },
    /* the doorway sheet: { el, canvas, paint(ctx) }; paints only when what it shows changes */
    photo: function (label) {
      var cv = mk(PW * 1.5, PH * 1.5), key = null;
      cv.className = 'nc-doorcv'; cv.setAttribute('aria-hidden', 'true');
      var el = h('div', { class: 'nc-piece nc-photo', role: 'img', 'aria-label': label || '', style: placed('photo') }, [cv, tape(-14, -6, 90, -32), tape(1150, -10, 96, 28), tape(560, -12, 80, 2)]);
      return { el: el, canvas: cv, paint: function (ctx, label2) {
        var k = [ctx.room, ctx.phase, ctx.band, ctx.line, ctx.paper].join('|');
        if (label2 != null) el.setAttribute('aria-label', label2);
        if (k === key) return; key = k; doorway(cv, ctx);
      } };
    },
    label: function (text, name, settle, dark) { return h('p', { class: 'nc-piece nc-lbl' + (dark ? ' nc-lbl--on' : ''), 'aria-hidden': 'true', style: placed(name, settle) }, [h('span', { text: text })]); },
    /* d: { title, doors, bands: [{ start, name, state: on|done|next, note }], stop } */
    setList: function (d, aria, onClick, settle) {
      var el = h('button', { type: 'button', class: 'nc-piece nc-paper nc-setlist', 'aria-label': aria, style: withPos(paperStyle('white', 'sl', 'b'), 'setlist', settle), on: onClick ? { click: onClick } : null });
      el.appendChild(h('span', { class: 'nc-sl-h', html: marker(d.title || 'Set list', 30, { seed: 'sl', maxWidth: 196 }) }));
      if (d.doors) el.appendChild(h('span', { class: 'nc-type nc-sl-doors', text: d.doors }));
      var ol = h('ol', { class: 'nc-sl-list' });
      (d.bands || []).forEach(function (b) {
        ol.appendChild(h('li', { class: 'nc-sl-band is-' + b.state }, [
          h('span', { class: 'nc-type nc-sl-time', text: b.start || '' }),
          h('span', { class: 'nc-type nc-sl-name', text: String(b.name || '').toUpperCase() }),
          b.state === 'on' ? h('span', { class: 'nc-sl-arrow', html: '<svg class="nc-mk" aria-hidden="true" width="34" height="22" viewBox="0 0 34 22"><path d="M2 12C10 10 18 12 28 10M20 3L30 10L21 18" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' }) : null,
          b.note ? h('span', { class: 'nc-type nc-sl-heat', text: b.note }) : null
        ]));
      });
      el.appendChild(ol);
      if (d.stop) el.appendChild(h('span', { class: 'nc-type nc-sl-stop', text: d.stop }));
      return [el, tape(118, 394, 86, -5)];
    },
    /* d: { parLabel, par, callLabel, lo, hi, cap, away, aria } */
    tally: function (d, settle) {
      var el = h('div', { class: 'nc-piece nc-paper nc-tallyscrap', role: 'group', 'aria-label': d.aria || '', style: withPos(paperStyle('pink', 'ts', 'rb'), 'tally', settle) });
      if (d.par != null) {
        el.appendChild(h('span', { class: 'nc-type nc-ts-k', text: d.parLabel }));
        el.appendChild(h('span', { class: 'nc-ts-row' }, [h('span', { html: tally(d.par, { h: 20, per: 5, gap: 7 }) }), h('span', { class: 'nc-ts-n', html: marker(String(d.par), 30, { seed: 'par' }) })]));
      }
      if (d.lo != null) {
        el.appendChild(h('span', { class: 'nc-type nc-ts-k', text: d.callLabel }));
        el.appendChild(h('span', { class: 'nc-ts-call', html: marker(d.lo + '-' + d.hi, 34, { seed: 'call' }) + '<svg class="nc-circle" aria-hidden="true" viewBox="0 0 160 60"><path d="M12 34C10 12 70 4 130 10C158 14 156 46 112 52C70 58 18 56 14 30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>' }));
      }
      if (d.cap) el.appendChild(h('span', { class: 'nc-type nc-ts-cap', text: d.cap }));
      if (d.away) el.appendChild(h('span', { class: 'nc-ts-away', html: marker(d.away, 18, { seed: 'away', maxWidth: 200 }) }));
      return el;
    },
    /* a table object as a control: o = { kind, art (object() opts), name, label, onClick, cls, size } */
    thing: function (o, settle) {
      var art = object(o.kind, o.art || {}), el = h(o.onClick ? 'button' : 'span', { type: o.onClick ? 'button' : null, class: 'nc-piece ' + (o.onClick ? 'nc-obj ' : 'nc-objwrap ') + (o.cls || ''),
        'aria-label': o.onClick ? o.label : null, 'aria-hidden': o.onClick ? null : 'true', style: placed(o.name, settle), on: o.onClick ? { click: o.onClick } : null }, [art]);
      return el;
    },
    chip: chip,
    strip: function (text, name, settle) { return h('p', { class: 'nc-piece nc-paper nc-gens', 'aria-hidden': 'true', style: withPos(paperStyle('tape', 'gen'), name, settle) }, [h('span', { class: 'nc-type', text: text })]); },
    /* the drink's card: its title in marker, the room's rules typed under it */
    card: function (title, lines, settle) {
      var el = h('div', { class: 'nc-piece nc-paper nc-drinkcard', role: 'note', 'aria-label': [title].concat(lines || []).join('. '), style: withPos(paperStyle('index', 'dc'), 'card', settle) });
      el.appendChild(h('span', { class: 'nc-dc-h', html: marker(title, 22, { seed: 'dc', maxWidth: 140 }) }));
      (lines || []).forEach(function (t) { el.appendChild(h('span', { class: 'nc-type', text: t })); });
      return el;
    },
    stopTape: function (text) { return h('div', { class: 'nc-piece nc-paper nc-stoptape', 'aria-hidden': 'true', style: withPos(paperStyle('tape', 'hs', 'lr'), 'stop'), html: marker(text, 21, { seed: 'hs', maxWidth: 250 }) }); },
    /* the cardboard sign: a real button (data-fk for the tutorial's tape and the keyboard) */
    sign: function (l1, l2, sub, label, fk, onClick, name) {
      var small = name === 'leave', el = h('button', { type: 'button', class: 'nc-piece nc-paper nc-sign' + (small ? ' nc-sign--small' : ''), 'aria-label': label, 'data-fk': fk || null, style: withPos(paperStyle('kraft', 'sign' + fk, 'trbl'), name || 'sign'), on: { click: onClick } });
      el.appendChild(h('span', { class: 'nc-sign-l1', html: marker(l1, small ? 24 : 30, { seed: 'o1', weight: 1.5, maxWidth: small ? 180 : 300 }) }));
      el.appendChild(h('span', { class: 'nc-sign-l2', html: marker(l2, small ? 40 : 62, { seed: 'o2', weight: 1.7, maxWidth: small ? 170 : 236 }) +
        '<svg class="nc-mk" aria-hidden="true" width="' + (small ? 34 : 54) + '" height="' + (small ? 26 : 40) + '" viewBox="0 0 54 40"><path d="M3 22C16 19 30 22 46 19M33 6L49 19L35 33" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>' }));
      if (sub) el.appendChild(h('span', { class: 'nc-type nc-sign-sub', text: sub }));
      var p = pos(name || 'sign');
      return [el, tape(p[0] + 22, p[1] - 8, 70, -20), tape(p[0] + 282, p[1] - 4, 70, 24)];
    },
    scrap: function (text, kind, i) {
      var p = pos('posts');
      return h('div', { class: 'nc-piece nc-paper nc-scrap nc-scrap--' + kind, role: 'note', 'aria-label': text, style: at(p[0] - i * 10, p[1] + i * 74, i % 2 ? 3 : p[2], paperStyle(kind === 'inc' ? 'bone' : 'white', 'post' + i + kind, 'tb')) }, [h('span', { class: 'nc-type', text: text })]);
    },
    /* the cash counted out on the table: a pile and a scrap with its figure for every line of the envelope */
    piles: function (list) {
      var out = [];
      (list || []).slice(0, PILES.length).forEach(function (p, i) {
        var q = PILES[i];
        out.push(h('span', { class: 'nc-piece nc-objwrap nc-pile', 'aria-hidden': 'true', style: at(q[0], q[1], i % 2 ? 6 : -5) }, [object('pile', { n: p.n || 3, bill: p.bill || '5', seed: 'p' + i, size: 0.7 })]));
        out.push(h('span', { class: 'nc-piece nc-paper nc-pilelabel', 'aria-hidden': 'true', style: at(q[0] + 4, q[1] + 52, i % 2 ? -3 : 2, paperStyle(i === list.length - 1 ? 'canary' : 'white', 'pl' + i, 'lr')) },
          [h('span', { class: 'nc-pl-amt', html: marker(p.amount || '', 15, { seed: 'pa' + i }) }), h('span', { class: 'nc-type nc-pl-who', text: p.who || p.label || '' })]));
      });
      return out;
    },
    tape: tape
  };
  /* bills for an amount, roughly: which bill and how many to show */
  function pileOf(amount) { var a = Math.abs(amount || 0), bill = a >= 60 ? '20' : (a >= 20 ? '10' : (a >= 5 ? '5' : '1')); return { bill: bill, n: Math.max(1, Math.min(6, Math.round(a / +bill))) }; }

  /* ---------------- the sample screen (design/sample/night-sample.html) ---------------- */
  function view(st, on) {
    on = on || {};
    var settle = st.phase === 'settle' || st.phase === 'after', after = st.phase === 'after';
    var stage = h('div', { class: 'nc-stage nc-ph--' + st.phase + (settle ? ' is-settle' : ''), role: 'region', 'aria-label': 'Show night at the door' });
    function add(x) { (Array.isArray(x) ? x : [x]).forEach(function (e) { if (e) stage.appendChild(e); }); return x; }
    function say(t) { if (on.say) on.say(t); }
    var bandsOn = (st.bands || []).filter(function (b) { return b.state === 'on'; })[0], kind = st.roomKind;
    add(parts.title(st.roomName, st.dayLabel));
    var ph = parts.photo();
    add(ph.el);
    ph.paint({ room: kind, phase: st.phase, band: bandsOn ? bandsOn.name : (st.bands[0] || {}).name, bands: st.bands.map(function (b) { return b.name; }), seed: st.seed, paper: st.paper, line: st.line },
      'The door: ' + (st.line > 0 ? st.line + ' waiting in line' : 'nobody left in line') + '.');
    add(parts.label(st.line > 0 ? 'THE LINE: ' + st.line : (settle ? 'LINE: GONE HOME' : 'THE LINE: 0'), 'lineLbl', settle));
    add(parts.label(st.phase === 'set' && bandsOn ? 'ON NOW: ' + bandsOn.name.toUpperCase() : (settle ? 'LIGHTS UP · ' + (st.now || '') : 'SOUNDCHECK: ' + String((st.bands[0] || {}).name || '').toUpperCase() + ' · DOORS ' + st.doors), 'onLbl', settle, true));
    add(parts.setList({ doors: 'DOORS ' + st.doors + (st.loadIn ? '   load-in ' + st.loadIn : ''), stop: 'HARD STOP ' + st.hardStop,
      bands: st.bands.map(function (b) { return { start: b.start, name: b.name, state: b.state, note: b.state === 'done' && b.heat != null ? 'heat ' + b.heat + (b.peak ? ' · peak' : '') : '' }; }) },
      'The set list', function () { say(st.bands.length + ' on the bill.'); }, settle));
    var fc = st.forecast;
    add(parts.tally({ parLabel: 'TOWN EXPECTS', par: fc.par, callLabel: 'YOUR CALL', lo: fc.lo, hi: fc.hi, cap: 'FULL AT ' + fc.cap, away: st.turnedAway ? st.turnedAway + ' turned away' : '',
      aria: 'Town expects ' + fc.par + '. Your call ' + fc.lo + ' to ' + fc.hi + '.' }, settle));
    add(parts.thing({ kind: 'watch', art: { time: st.now }, name: 'watch', cls: 'nc-watch', label: 'Watch ' + (st.now || ''), onClick: function () { say(st.now); } }, settle));
    add(parts.thing({ kind: 'stamp', art: { size: settle ? 0.62 : 1 }, name: 'stamp', label: 'Stamp, Marker', onClick: function () { say('The hand stamp.'); } }, settle));
    add(parts.thing({ kind: 'marker', art: { size: settle ? 0.7 : 1 }, name: 'marker' }, settle));
    if (!settle) add(parts.chip('STAMP', null, 'stampChip'));
    add(parts.thing({ kind: 'clicker', art: { count: st.heads }, name: 'clicker', cls: 'nc-clicker', label: 'Door count: ' + st.heads, onClick: function () { say(st.heads + ' in the room.'); } }, settle));
    add(parts.chip('DOOR COUNT', String(st.heads), 'doorChip'));
    add(parts.strip(st.byGen[0] + ' kids · ' + st.byGen[1] + ' mid · ' + st.byGen[2] + ' old', 'gens', settle));
    add(parts.thing({ kind: 'rings', art: { n: 1 + (st.setsIn || 0), seed: st.seed }, name: 'rings' }, settle));
    add(parts.thing({ kind: 'can', art: { empty: settle }, name: 'can', label: st.drink, onClick: function () { say('The ' + st.drink + '.'); } }, settle));
    add(parts.card(st.drinkCard[0], st.drinkCard.slice(1), settle));
    add(parts.thing({ kind: 'tin', art: { fill: st.tinFill || 0, empty: settle, seed: st.phase, size: 0.86 }, name: 'tin', label: 'Cash box', onClick: function () { say(st.cash || 'counted at the end of the night'); } }, settle));
    add(parts.chip('CASH BOX', st.cash == null ? 'not counted yet' : st.cash, 'cashChip'));
    add(parts.stopTape('Hard stop ' + st.hardStop.replace(':00', '')));
    add(h('p', { class: 'nc-piece nc-now', 'aria-live': 'polite', style: placed('now') }, [h('span', { class: 'nc-now-t', text: st.nowLine }), st.tick ? h('span', { class: 'nc-now-k', text: ' · ' + st.tick }) : null]));
    (st.posts || []).forEach(function (p, i) { add(parts.scrap(p, 'post', i)); });
    if (st.phase === 'doors') add(parts.sign('Open the', 'doors', 'doors ' + st.doors + ' · ' + st.bands.length + ' on the bill · ' + st.price + ' at the door', 'Open the doors', 'open', function () { if (on.open) on.open(); }));
    if (st.decision) {
      var dec = st.decision, note = add(h('section', { class: 'nc-piece nc-paper nc-note', role: 'group', 'aria-label': dec.title + ' needs you', style: withPos(paperStyle('white', 'note', 'tb'), 'note') }));
      note.appendChild(h('h2', { class: 'nc-note-h', html: marker('!', 30, { seed: 'bang', weight: 1.6 }) + '<span>' + esc(dec.title) + '</span>' }));
      note.appendChild(h('p', { class: 'nc-type nc-note-b', text: dec.body }));
      note.appendChild(tabs(dec.options, function (i) { if (on.choose) on.choose(i); }, dec.title));
    }
    if (st.phase === 'set' && on.skip) add(h('button', { class: 'nc-piece nc-btn', type: 'button', 'data-fk': 'skip', style: placed('skip'), 'aria-label': 'Skip to settle', on: { click: on.skip } }, [h('span', { text: 'skip to settle' })]));
    if (settle && st.envelope) {
      var env = st.envelope, pay = add(h('section', { class: 'nc-piece nc-paper nc-payout', role: 'group', 'aria-label': 'The envelope', style: withPos(paperStyle('white', 'pay', 'b'), 'payout') }));
      pay.appendChild(h('h2', { class: 'nc-pay-h', html: marker('The envelope', 28, { seed: 'env' }) }));
      pay.appendChild(h('p', { class: 'nc-type nc-pay-door', text: env.paid + ' paid x ' + env.price + ' = ' + env.gross + (env.hat ? '   + hat ' + env.hat : '') }));
      var tb = h('ol', { class: 'nc-pay-lines' });
      env.lines.forEach(function (l) { tb.appendChild(h('li', { class: 'nc-type' + (l.you ? ' is-you' : '') }, [h('span', { class: 'nc-pay-l', text: l.label }), h('span', { class: 'nc-pay-a', text: l.amount }), h('span', { class: 'nc-pay-r', text: l.running || '' })])); });
      pay.appendChild(tb);
      if (!after && env.keep) pay.appendChild(tabs(env.keep, function (i) { if (on.keep) on.keep(i); }, 'What you keep'));
      if (after && env.net) pay.appendChild(h('p', { class: 'nc-pay-net', html: '<span class="nc-type">NET:</span>' + marker(env.net, 30, { seed: 'net' }) }));
      add(parts.piles((st.piles || []).map(function (p) { var m = /^(.*?)\s*(\$\d+)$/.exec(p.label) || [p.label, p.label, '']; return { who: m[1], amount: m[2], n: p.n, bill: p.bill }; })));
    }
    if (after && st.result) {
      var res = st.result, rc = add(h('section', { class: 'nc-piece nc-paper nc-result', role: 'group', 'aria-label': 'How it went', style: withPos(paperStyle('bone', 'res', 'b'), 'result') }));
      rc.appendChild(h('h2', { class: 'nc-pay-h', html: marker('How it went', 26, { seed: 'res' }) }));
      rc.appendChild(h('p', { class: 'nc-type', text: res.verdict }));
      (res.lines || []).forEach(function (t) { rc.appendChild(h('p', { class: 'nc-type nc-res-l', text: t })); });
      if (on.leave) add(parts.sign('Back to', 'the desk', '', 'Back to the desk', 'leave', on.leave, 'leave'));
    }
    return stage;
  }
  function tabs(opts, pick, label) {
    var row = h('div', { class: 'nc-tabs nt-tabs', role: 'group', 'aria-label': label || 'tear one off' });
    opts.forEach(function (o, i) {
      var dis = o.enabled === false;
      row.appendChild(h('button', { class: 'nt-tab', type: 'button', disabled: dis, 'data-fk': 'opt-' + i, 'aria-label': (i + 1) + '. ' + o.label + (o.costs && o.costs.length ? '. ' + o.costs.join(', ') : '') + (o.likely ? '. likely: ' + o.likely : ''),
        on: { click: function () { if (!dis) pick(i); } } }, [
        h('span', { class: 'nt-tab-n', 'aria-hidden': 'true', text: String(i + 1) }),
        h('span', { class: 'nt-tab-label', text: o.label }),
        o.costs && o.costs.length ? h('span', { class: 'nt-tab-costs' }, o.costs.map(function (c) { return h('span', { class: 'nt-cost', text: c }); })) : null,
        o.likely ? h('span', { class: 'nt-tab-likely', text: o.likely }) : null
      ]));
    });
    row.addEventListener('keydown', function (e) { var n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length && opts[n - 1].enabled !== false) { e.preventDefault(); pick(n - 1); } });
    return row;
  }

  return { doorway: doorway, object: object, marker: marker, tally: tally, paper: paper, torn: torn, view: view, parts: parts,
           layout: { pos: pos, at: at }, doorKind: doorKind, paperFor: paperFor, pileOf: pileOf, paperStyle: paperStyle, withPos: withPos };
});
