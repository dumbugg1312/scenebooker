/* Scene Booker: js/ui/cutscene.js (ART, 09-tutorial-story-patches §3, 09a "Content shape")
 * SB.Cutscene.play(cutscene, slots, onDone): plays one cutscene from SB.Content.story.cutscenes over whatever is on
 * screen, then calls onDone({ key, skipped }). Three kinds:
 *   SCENE   full screen, the picture pans slowly, a few words typed on strips and lettered in sharpie.
 *   PANELS  xeroxed zine panels slid onto the desk one at a time, up to three to a spread, then the spread turns.
 *   DROP    things land on the desk one after another: postcard, polaroid, note, text, tape, flyer.
 * Every kind: click, Space, Enter or the right arrow turns; Escape or the skip button skips; focus is held in the
 * player and given back after. Words are filled with SB.text.render(template, slots). Pictures are SB.Scenes.draw
 * with the slots as their context; a frame's picture also gets `index` (how many times this art key came before in
 * this cutscene) and `band` (slots.bands[index] for STAGE_BAND, else slots.band), so a run of STAGE_BAND frames
 * shows the bands in order. The photo cut-outs a frame's picture pastes in are preloaded (SB.Scenes.preload) before
 * the first frame shows; the rest load behind it. Respects prefers-reduced-motion and the game's .reduce-motion / data-motion="reduce".
 * Sound: SB.CutsceneAudio (js/audio/cutscene-audio.js) is told when the cutscene starts, when each frame lands, when a
 * spread turns and when it closes; it plays a score by mood, a bed under each picture, the bill's bands bleeding
 * through the wall, and its own paper sounds. What plays is decided in content/cutscene-audio.js; content can also say
 * it here: a cutscene's `mood` ('warm' | 'tense' | 'sad' | 'big' | 'road' | 'quiet'), and on a frame `amb` (a bed id,
 * or null for none), `bleed` ('near' | 'far' | null) and `sfx` (an SB.Sfx cue such as 'cs.knock', a list, or null).
 */
SB.module('Cutscene', function (SB) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var current = null;

  function el(tag, cls, parent, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function reduced() {
    var de = document.documentElement;
    return !!((window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ||
      de.classList.contains('reduce-motion') || document.querySelector('[data-motion="reduce"]'));
  }
  function fill(tpl, slots) {
    if (tpl == null) return '';
    try { return SB.text && SB.text.render ? SB.text.render(String(tpl), slots || {}, null) : String(tpl); }
    catch (e) { return String(tpl); }
  }
  function whoName(who, slots, art) {
    if (!who || who === 'crowd') return '';
    if (who === 'you') return 'you';
    if (who === 'band') return art.band || slots.band || 'the band';
    if (slots && slots[who] != null) return String(slots[who]);
    return who;
  }
  function wrap(text, max) {
    var words = String(text).split(/\s+/), out = [], cur = '';
    words.forEach(function (w) { if (cur && (cur + ' ' + w).length > max) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; });
    if (cur) out.push(cur);
    return out;
  }
  /* the stage is 1280 x 800 of --p (css/finish.css) whatever the window is: sizes here are in those units, shown through
     calc(var(--p) * n), and canvases raster at SB.Finish.res() so they stay sharp at any size */
  function res() { return SB.Finish && SB.Finish.res ? SB.Finish.res() : 1; }
  function P(n) { return 'calc(var(--p) * ' + (Math.round(n * 100) / 100) + ')'; }
  function sized(svg, w, h) {
    svg.setAttribute('width', w); svg.setAttribute('height', h);
    svg.style.width = P(w); svg.style.height = P(h);
  }
  function mv(e, name, delay) {
    if (!e || !SB.Finish) return e;
    if (delay) e.style.setProperty('--mv-d', delay + 'ms');
    e.classList.add('mv-' + name);
    return e;
  }

  /* ---------------- lettering ---------------- */

  /* Sharpie capitals as an SVG (SB.Skeleton strokes), wrapped to maxChars a line. Returns { svg, w, h }. */
  function lettering(text, size, maxChars, seed) {
    var lines = wrap(String(text).toUpperCase(), maxChars), lh = size * 1.5, sk = SB.Skeleton, w = 0, svg = document.createElementNS(NS, 'svg');
    var paths = lines.map(function (ln, i) {
      if (sk && sk.path) {
        var p = sk.path(ln, size, 'marker', { rng: SB.rng.make('say:' + seed + ':' + i) });
        w = Math.max(w, p.width);
        return p;
      }
      w = Math.max(w, ln.length * size * 0.66);
      return { text: ln };
    });
    var h = lines.length * lh - (lh - size);
    paths.forEach(function (p, i) {
      if (p.d) {
        var path = document.createElementNS(NS, 'path');
        path.setAttribute('d', p.d); path.setAttribute('transform', 'translate(0 ' + (i * lh) + ')');
        path.setAttribute('fill', 'none'); path.setAttribute('stroke', 'currentColor'); path.setAttribute('stroke-width', p.strokeWidth.toFixed(2));
        path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
      } else {
        var t = document.createElementNS(NS, 'text');
        t.setAttribute('x', 0); t.setAttribute('y', i * lh + size); t.setAttribute('class', 'cs-letter-fallback'); t.textContent = p.text;
        svg.appendChild(t);
      }
    });
    return { svg: svg, w: w, h: h, lines: lines.length };
  }

  /* A rough outline around a w x h box: a lumpy balloon with a tail, or a spiky burst for the crowd. */
  function outline(w, h, kind, seed, tail, tailH) {
    var r = SB.rng.make('bubble:' + seed), pts = [], i, n = kind === 'burst' ? 22 : 28, cx = w / 2, cy = h / 2;
    for (i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      var k = Math.pow(Math.abs(ca), 6) + Math.pow(Math.abs(sa), 6), sq = Math.pow(k, -1 / 6); /* a squircle, nearly square */
      var rr = kind === 'burst' ? (i % 2 ? 1.0 : 1.32) : 1 + r.range(-0.025, 0.035);
      pts.push([cx + ca * sq * (w / 2) * rr, cy + sa * sq * (h / 2) * rr]);
    }
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (i = 1; i <= n; i++) {
      var p = pts[i % n];
      if (kind !== 'burst' && tail && i === Math.round(n * (tail < 0 ? 0.33 : 0.17))) {
        d += 'L' + (cx + tail * w * 0.18).toFixed(1) + ' ' + (h + 2).toFixed(1) + 'L' + (cx + tail * w * 0.3).toFixed(1) + ' ' + (h + (tailH == null ? h * 0.55 + 14 : tailH)).toFixed(1);
      }
      d += 'L' + p[0].toFixed(1) + ' ' + p[1].toFixed(1);
    }
    return d + 'Z';
  }

  /* One speech line: a tag with the speaker's name in typewriter and the words lettered in a balloon. */
  function speech(line, slots, art, seed, side, small) {
    var who = line.who || '', say = fill(line.say, slots), name = whoName(who, slots, art);
    var box = el('div', 'cs-say cs-say-' + (who === 'crowd' ? 'crowd' : who === 'you' ? 'you' : 'them'));
    var sr = el('span', 'cs-sr', box, (name ? name + ': ' : '') + say);
    void sr;
    if (name) el('span', 'cs-who', box, name);
    var size = small ? 13 : 17, L = lettering(say, size, who === 'crowd' ? 14 : (small ? 24 : 20), seed), pad = small ? 11 : 15;
    var W = Math.ceil(L.w + pad * 2), H = Math.ceil(L.h + pad * 2), burst = who === 'crowd';
    var tailDir = side === 'right' ? 1 : -1;
    var tailH = small ? 16 : H * 0.55 + 14;
    var bx = burst ? W * 0.2 : 4, by = burst ? H * 0.25 : 4, VW = W + bx * 2, VH = H + by * 2 + (burst ? 0 : tailH);
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VW.toFixed(0) + ' ' + VH.toFixed(0));
    sized(svg, +VW.toFixed(0), +VH.toFixed(0));
    svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'cs-balloon');
    var g = document.createElementNS(NS, 'g'); g.setAttribute('transform', 'translate(' + bx.toFixed(1) + ' ' + by.toFixed(1) + ')');
    var shape = document.createElementNS(NS, 'path');
    shape.setAttribute('d', outline(W, H, burst ? 'burst' : 'balloon', seed, burst ? 0 : tailDir, tailH));
    shape.setAttribute('class', 'cs-balloon-shape');
    g.appendChild(shape);
    L.svg.setAttribute('x', pad); L.svg.setAttribute('y', pad);
    L.svg.setAttribute('width', Math.ceil(L.w) + 2); L.svg.setAttribute('height', Math.ceil(L.h) + 6);
    L.svg.setAttribute('overflow', 'visible');
    g.appendChild(L.svg);
    svg.appendChild(g);
    box.appendChild(svg);
    return box;
  }

  /* Typed captions name bands the way a caption would: a band that writes its name all in small letters gets capitals
   * here ("Field Trip Rider Canceled opened."), so the sentence can be read. Speech and tags keep the band's own way. */
  var NAMES = ['band', 'band1', 'band2', 'band3', 'touring', 'local', 'kids', 'closer', 'referrer'];
  function captionSlots(slots) {
    var o = {}, k;
    for (k in slots) o[k] = slots[k];
    NAMES.forEach(function (n) {
      var v = o[n];
      if (typeof v === 'string' && v && v === v.toLowerCase()) o[n] = v.replace(/(^|[\s-])([a-z])/g, function (m, a, b) { return a + b.toUpperCase(); });
    });
    return o;
  }
  function capFill(tpl, slots) {
    var t = fill(tpl, captionSlots(slots));
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  }

  function caption(text, cls) {
    var p = el('p', 'cs-cap pz-paper' + (cls ? ' ' + cls : ''));
    el('span', null, p, text);
    return p;
  }

  /* ---------------- pictures ---------------- */

  function artCtx(frame, slots, counts) {
    var key = frame.art || 'POSTCARD_FRONT', n = counts[key] || 0, x = {}, k;
    counts[key] = n + 1;
    for (k in slots) x[k] = slots[k];
    x.index = n;
    /* whose picture it is: the band that speaks in the frame (a line's `who` naming a band slot), else the next band */
    var who = null;
    (frame.lines || []).forEach(function (ln) { if (!who && ln && /^band\d*$/.test(String(ln.who || '')) && ln.who !== 'band' && slots[ln.who]) who = String(slots[ln.who]); });
    if (who) x.band = who;
    else if ((key === 'STAGE_BAND' || slots.bands && slots.bands.length > 1) && slots.bands && slots.bands.length) x.band = slots.bands[n % slots.bands.length];
    else if (!x.band && slots.bands && slots.bands.length) x.band = slots.bands[0];
    x.seed = slots.seed || slots.bookingName || '';
    return x;
  }
  function picture(frame, x, cssW, cssH, cls, sized) {
    var cv = el('canvas', cls || 'cs-art'), s = Math.min(res(), 4000 / Math.max(cssW, cssH, 1));
    cv.width = Math.round(cssW * s); cv.height = Math.round(cssH * s);
    if (sized) { cv.style.width = P(cssW); cv.style.height = P(cssH); }
    cv.setAttribute('aria-hidden', 'true');
    if (SB.Scenes && SB.Scenes.draw) {
      /* the photos this picture needs that are not in yet: the picture stays hidden until they are (it draws itself
         again when they land), so it shows whole, never its stand-in first; a slow load shows the loading tape */
      var need = SB.Scenes.need ? SB.Scenes.need(frame.art || 'POSTCARD_FRONT', SB.util && SB.util.copy ? SB.util.copy(x) : x) : [];
      try { SB.Scenes.draw(cv, frame.art || 'POSTCARD_FRONT', x); }
      catch (e) { if (SB.log) SB.log('warn', 'SB.Cutscene', 'art ' + frame.art + ': ' + e.message); }
      if (need.length && SB.Boot && SB.Boot.hold) {
        cv.classList.add('cs-wait');
        SB.Boot.hold(need, function () { cv.classList.remove('cs-wait'); });
      }
    }
    return cv;
  }

  /* ---------------- the player ---------------- */

  function play(cutscene, slots, onDone) {
    if (current) current.close(true);
    cutscene = cutscene || {}; slots = slots || {};
    var frames = (cutscene.frames || []).filter(Boolean), kind = String(cutscene.kind || 'PANELS').toUpperCase();
    if (kind !== 'SCENE' && kind !== 'DROP') kind = 'PANELS';
    var counts = {}, ctxs = frames.map(function (f) { return artCtx(f, slots, counts); });
    var still = reduced(), idx = -1, done = false, wasSkipped = false, lastFocus = document.activeElement;
    var narrow = false;
    var key = cutscene.key || '';

    var root = el('div', 'cs-root cs-k-' + kind.toLowerCase() + (still ? ' cs-still' : ''));
    /* the stage: 16:10 and letterboxed, like every full screen; everything of the cutscene is on it */
    var box = el('div', 'cs-box cs-k-' + kind.toLowerCase() + (still ? ' cs-still' : ''), root);
    if (kind !== 'SCENE' && !still) mv(box, 'wipe');
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', fill(cutscene.title, slots) || 'Cutscene');
    root.tabIndex = -1;
    var stage = el('div', 'cs-stage', box);
    var live = el('div', 'cs-sr', box); live.setAttribute('aria-live', 'polite');
    if (cutscene.title) {
      var tt = el('div', 'cs-title', box);
      var tl = lettering(fill(cutscene.title, slots), 26, 28, 'title:' + key);
      tl.svg.setAttribute('viewBox', '0 -2 ' + Math.ceil(tl.w + 4) + ' ' + Math.ceil(tl.h + 8));
      sized(tl.svg, Math.ceil(tl.w + 4), Math.ceil(tl.h + 8)); tl.svg.setAttribute('aria-hidden', 'true');
      if (!still) mv(tt, 'slap', 300);
      tt.appendChild(tl.svg);
    }
    var bar = el('div', 'cs-bar', box);
    var strip = el('span', 'cs-strip pz-paper', bar);
    var count = el('span', 'cs-count', strip);
    var hint = el('span', 'cs-hint', strip, 'click or space');
    void hint;
    var nextBtn = el('button', 'cs-btn cs-next pz-hl', bar, 'next');
    nextBtn.type = 'button';
    var skipBtn = el('button', 'cs-btn cs-skip pz-hl', box, 'skip');
    skipBtn.type = 'button'; skipBtn.setAttribute('aria-label', 'Skip this cutscene');

    var spread = null, spreadCount = 0, perSpread = narrow ? 1 : (frames.length === 4 ? 2 : 3);

    function announce(f) {
      var bits = [];
      if (f.caption) bits.push(capFill(f.caption, slots));
      (f.lines || []).forEach(function (ln) { var n = whoName(ln.who, slots, {}); bits.push((n ? n + ': ' : '') + fill(ln.say, slots)); });
      live.textContent = bits.join(' ');
    }
    function words(f, x, into, base) {
      var t = base || 0;
      if (f.caption) { var cp = caption(capFill(f.caption, slots)); if (!still) mv(cp, 'slap', t); into.appendChild(cp); t += 500; }
      (f.lines || []).forEach(function (ln, i) {
        var sp = speech(ln, slots, x, key + ':' + idx + ':' + i, i % 2 ? 'right' : 'left');
        sp.classList.add(i % 2 ? 'cs-right' : 'cs-left');
        if (!still) mv(sp, 'slap', t); t += 700;
        into.appendChild(sp);
      });
    }

    function showScene(f, x) {
      var fr = el('div', 'cs-frame', stage);
      if (!still) mv(fr, 'wipe');
      /* the scene is a taped photo print that fills the stage; the canvas is drawn at the print's shape and zoomed so the lit part fills it */
      var print = el('div', 'cs-print pz-paper', fr), inner = el('div', 'cs-print-in', print);
      var PW = 1280 - 108, PH = 800 - 188, Z = 1.35;      /* the print's shape, in --p */
      var cv = picture(f, x, PW * Z, PH * Z, 'cs-art');
      var r = SB.rng.make('pan:' + key + ':' + idx);
      cv.style.setProperty('--px0', r.range(-3, 3).toFixed(2) + '%'); cv.style.setProperty('--py0', r.range(-2, 2).toFixed(2) + '%');
      cv.style.setProperty('--px1', r.range(-3, 3).toFixed(2) + '%'); cv.style.setProperty('--py1', r.range(-2, 2).toFixed(2) + '%');
      inner.appendChild(cv);
      var w = el('div', 'cs-words', fr);
      words(f, x, w, still ? 0 : 900);
      var old = stage.querySelectorAll('.cs-frame');
      for (var i = 0; i < old.length - 1; i++) (function (o) { setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, still ? 0 : 300); })(old[i]);
    }

    function showPanel(f, x) {
      if (!spread || spreadCount >= perSpread) {
        if (spread) { var o = spread; if (!still) { o.classList.remove('mv-slap', 'mv-wipe'); mv(o, 'wipe-out'); } if (SB.CutsceneAudio) SB.CutsceneAudio.turn(kind); setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, still ? 0 : 260); }
        spread = el('div', 'cs-spread', stage); spreadCount = 0;
        var left = frames.length - idx; spread.style.setProperty('--n', Math.min(perSpread, left));
      }
      spreadCount++;
      var r = SB.rng.make('panel:' + key + ':' + idx);
      var fig = el('figure', 'cs-panel', spread);
      if (!still) { fig.style.setProperty('--i', spreadCount - 1); mv(fig, 'slap', 120); }
      fig.style.setProperty('--tilt', r.range(-2.2, 2.2).toFixed(2) + 'deg');
      fig.style.setProperty('--from', (r.chance(0.5) ? 1 : -1) * r.range(8, 14).toFixed(1) + 'deg');
      var says = el('div', 'cs-says', fig);
      var pic = el('div', 'cs-pic pz-paper', fig);
      if (f.caption) fig.appendChild(caption(capFill(f.caption, slots), 'cs-cap-panel'));
      var cssW = Math.min((1280 - 120) / perSpread - 40, 760);
      cssW = Math.min(cssW, (800 - 230 - 20) / 0.75);
      var px = {}, k; for (k in x) px[k] = x[k];
      px.paper = ['canary', 'pink', 'blue', 'green', 'salmon', 'lilac'][(idx + (key.length || 0)) % 6]; /* a photocopy on coloured copy paper, the same pass as the night scene */
      pic.appendChild(picture(f, px, cssW, cssW * 0.75, 'cs-art', true));
      (f.lines || []).forEach(function (ln, i) {
        var sp = speech(ln, slots, x, key + ':' + idx + ':' + i, i % 2 ? 'right' : 'left', true);
        sp.classList.add(i % 2 ? 'cs-right' : 'cs-left');
        if (!still) mv(sp, 'slap', 450 + i * 600);
        says.appendChild(sp);
      });
    }

    function showDrop(f, x) {
      var obj = f.obj || 'postcard', r = SB.rng.make('drop:' + key + ':' + idx);
      var o = el('div', 'cs-obj cs-obj-' + obj + (obj === 'tape' || obj === 'text' ? '' : ' pz-paper'), stage);
      if (!still) mv(o, 'slap');
      o.style.setProperty('--tilt', r.range(-6, 6).toFixed(1) + 'deg');
      o.style.setProperty('--dx', P(((idx % 3) - 1) * 77 + r.range(-38, 38)));
      o.style.setProperty('--dy', P(r.range(-32, 32)));
      var lines = f.lines || [], txt = lines.map(function (l) { return fill(l.say, slots); });
      if (obj === 'note') {
        var L = lettering(txt.join(' ') || capFill(f.caption, slots), 20, 22, 'note:' + key + idx);
        L.svg.setAttribute('viewBox', '0 -2 ' + Math.ceil(L.w + 4) + ' ' + Math.ceil(L.h + 8)); sized(L.svg, Math.ceil(L.w + 4), Math.ceil(L.h + 8));
        L.svg.setAttribute('aria-hidden', 'true'); o.appendChild(L.svg);
      } else if (obj === 'text') {
        var ph = el('div', 'cs-phone', o);
        lines.forEach(function (l) { el('p', 'cs-msg' + (l.who === 'you' ? ' cs-msg-you' : ''), ph, fill(l.say, slots)); });
      } else {
        var dims = obj === 'polaroid' ? [300, 300] : obj === 'flyer' ? [300, 388] : obj === 'tape' ? [150, 150] : [420, 280];
        o.appendChild(picture(f, x, dims[0], dims[1], 'cs-art', true));
        if (obj !== 'flyer' && txt.length) {
          var M = lettering(txt.join(' '), obj === 'polaroid' ? 16 : 15, obj === 'polaroid' ? 24 : 30, 'drop:' + key + idx);
          M.svg.setAttribute('viewBox', '0 -2 ' + Math.ceil(M.w + 4) + ' ' + Math.ceil(M.h + 8)); sized(M.svg, Math.ceil(M.w + 4), Math.ceil(M.h + 8));
          M.svg.setAttribute('aria-hidden', 'true');
          var wr = el('div', 'cs-scrawl', o); wr.appendChild(M.svg);
        }
      }
      if (f.caption && obj !== 'note') { var cp = caption(capFill(f.caption, slots), 'cs-cap-drop'); o.appendChild(cp); }
      var objs = stage.querySelectorAll('.cs-obj');
      if (objs.length > 3) objs[0].parentNode.removeChild(objs[0]);
    }

    function go(i) {
      if (done) return;
      if (i >= frames.length) { finish(false); return; }
      idx = i;
      var f = frames[i], x = ctxs[i];
      if (kind === 'SCENE') showScene(f, x); else if (kind === 'DROP') showDrop(f, x); else showPanel(f, x);
      if (SB.CutsceneAudio) SB.CutsceneAudio.frame(i, f, x, kind);                   // the paper, the bed, the moment
      else if (SB.Sfx) SB.Sfx.play(kind === 'DROP' ? 'place' : 'slide', { gap: 120 });
      count.textContent = (i + 1) + ' / ' + frames.length;
      nextBtn.textContent = i + 1 >= frames.length ? 'done' : 'next';
      announce(f);
    }
    function next() { if (started) go(idx + 1); }
    function onKey(e) {
      if (done) return;
      var k = e.key;
      if (k === 'Escape') { e.preventDefault(); finish(true); return; }
      if (e.target && e.target.tagName === 'BUTTON' && (k === ' ' || k === 'Enter')) return;
      if (k === ' ' || k === 'Enter' || k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); next(); }
      if (k === 'Tab') { /* keep focus inside: the two buttons */
        var f = [nextBtn, skipBtn], at = f.indexOf(document.activeElement);
        e.preventDefault(); f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    }
    function onClick(e) {
      if (e.target.closest('.cs-btn')) return;
      next();
    }
    function finish(skipped) {
      if (done) return;
      wasSkipped = !!skipped;
      close(false);
      if (typeof onDone === 'function') onDone({ key: key, skipped: !!skipped });
    }
    function close(silent) {
      if (done) return;
      done = true;
      document.removeEventListener('keydown', onKey, true);
      /* the stage tears away from the left over whatever is under it: the box goes into a ghost layer (not .cs-root) for the move */
      if (!silent && !still && SB.Finish && !SB.Finish.reduced() && typeof document !== 'undefined' && document.body && root.parentNode) {
        try {
          var ghost = el('div', 'pz-ghost pz-ghost--full'), gone = function () { if (ghost.parentNode) ghost.parentNode.removeChild(ghost); };
          ghost.setAttribute('aria-hidden', 'true'); ghost.appendChild(box); document.body.appendChild(ghost);
          box.classList.remove('mv-wipe'); box.style.pointerEvents = 'none';
          SB.Finish.move(box, 'wipe-out'); setTimeout(gone, 400);
        } catch (e) { /* the exit is a courtesy */ }
      }
      if (root.parentNode) root.parentNode.removeChild(root);
      if (current && current.root === root) current = null;
      if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) { /* gone */ }
      if (SB.CutsceneAudio) SB.CutsceneAudio.end(!!silent || wasSkipped);
    }

    nextBtn.addEventListener('click', function () { next(); });
    skipBtn.addEventListener('click', function () { finish(true); });
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey, true);
    document.body.appendChild(root);
    root.focus();
    if (!frames.length) { finish(false); return null; }
    if (SB.CutsceneAudio) SB.CutsceneAudio.start(cutscene, slots);
    /* the pictures paste in photo cut-outs that load async: wait for the first frame's, fetch the rest behind it */
    var started = false, want = 0;
    function start() { if (started || done) return; started = true; go(0); while (idx < want && !done) go(idx + 1); }
    var arts = frames.map(function (f) { return f.art || 'POSTCARD_FRONT'; });
    if (SB.Scenes && SB.Scenes.preload) {
      SB.Scenes.preload(arts.slice(0, 1), start, ctxs.slice(0, 1), 3000);
      SB.Scenes.preload(arts, null, ctxs);
    } else start();

    current = { root: root, next: next, skip: function () { finish(true); }, close: close,
      /** goTo(i): jump to frame i (for the sample page and tests); panels before it are laid down too. */
      goTo: function (i) { if (!started) { want = i; return; } while (idx < i && !done) go(idx + 1); } };
    return current;
  }

  return { play: play, playing: function () { return !!current; } };
});
