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
    /* a band nobody has met (the inbox's strangers): never the band you just booked */
    if (who === 'stranger') return 'a band you\'ve never heard of';
    if (who === 'stranger2') return 'another band';
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
    /* the words are what tells the player what to do (user 2026-11-23: "small and in awkward places"): lettered big */
    var size = small ? 18 : 24, L = lettering(say, size, who === 'crowd' ? 16 : (small ? 26 : 36), seed), pad = small ? 13 : 18;
    /* wider than tall, so the squared-off corners clear the first and last letters of a line */
    var padX = pad + Math.round(size * 0.5), W = Math.ceil(L.w + padX * 2), H = Math.ceil(L.h + pad * 2), burst = who === 'crowd';
    var tailDir = side === 'right' ? 1 : -1;
    var tailH = small ? 16 : Math.min(H * 0.3 + 12, 40);
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
    L.svg.setAttribute('x', padX); L.svg.setAttribute('y', pad);
    L.svg.setAttribute('width', Math.ceil(L.w) + 2); L.svg.setAttribute('height', Math.ceil(L.h) + 6);
    L.svg.setAttribute('overflow', 'visible');
    g.appendChild(L.svg);
    svg.appendChild(g);
    box.appendChild(svg);
    box._h = VH + (name ? 28 : 0);   /* its height in --p, for fitting a panel's picture under it */
    return box;
  }
  /* which side a line sits on: your own lines on the right, everyone else's on the left, so they read top to bottom */
  function sideOf(ln) { return ln && ln.who === 'you' ? 'right' : 'left'; }

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
    var p = el('p', 'cs-cap pz-paper' + (cls ? ' ' + cls : '')), m = showMap(text), here = [], first;
    if (!m) { el('span', null, p, text); return p; }
    /* the show map ("Where you are: the date > ROOM > bands > ..."): the steps as a strip of stamps, the step you're
       on (the one written in capitals) under the highlighter, the ones behind you faded (user 2026-11-22: "the
       critical information is not the star", "highlight this better than just capitalizing") */
    p.classList.add('cs-cap-map');
    if (m.lead) el('span', 'cs-map-lead', p, m.lead);
    /* every step in capitals is a step you're on (bands and sound get asked the same night) */
    m.steps.forEach(function (s, i) { if (s.length > 1 && s === s.toUpperCase()) here.push(i); });
    first = here.length ? here[0] : -1;
    var ol = el('ol', 'cs-map', p);
    m.steps.forEach(function (s, i) {
      if (i) el('li', 'cs-arrow', ol, '\u203A').setAttribute('aria-hidden', 'true');
      var on = here.indexOf(i) >= 0, li = el('li', 'cs-step' + (on ? ' is-here' : '') + (first >= 0 && i < first ? ' is-done' : ''), ol, s.toLowerCase());
      if (on) li.setAttribute('aria-current', 'step');
    });
    return p;
  }
  /* "Lead: a > b > c > ..." with four steps or more -> { lead, steps }; anything else -> null */
  function showMap(text) {
    var parts = String(text || '').split(' > '), first, at;
    if (parts.length < 4) return null;
    first = parts[0]; at = first.lastIndexOf(': ');
    parts[0] = at >= 0 ? first.slice(at + 2) : first;
    parts[parts.length - 1] = parts[parts.length - 1].replace(/[.\s]+$/, '');
    return { lead: at >= 0 ? first.slice(0, at + 1) : '', steps: parts.map(function (s) { return s.trim(); }) };
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
  /* The people in a picture, each a photocopied cut-out piece over the room (SB.Scenes.layered): slapped on one by one,
     back to front, then kept going (css/cutscene.css .cs-pc): the band in time, the crowd jumping each to their own
     count, everyone else shifting their weight; in a quiet picture they only breathe. Pieces are placed in % of the
     room, so they follow it at any size; in the full-screen scene they pan with it and a little more (nearer the lens). */
  function pieces(box, cv, x, L, info) {
    var old = box.querySelectorAll('.cs-pc'), i;
    for (i = 0; i < old.length; i++) box.removeChild(old[i]);
    if (!box._t0) box._t0 = Date.now();
    if (!L || !L.length) return;
    var W = cv.width, H = cv.height, n = L.length, key = (info && info.key) || '';
    var base = 'pc:' + key + ':' + (x.seed || '') + ':' + (x.index || 0) + ':' + (x.band || '');
    var beat = SB.rng.make(base).range(0.36, 0.5), gap = Math.max(90, Math.min(170, 1800 / n)), at = 140;
    var since = box.isConnected ? Date.now() - box._t0 : 0;
    function pc(v) { return (Math.round(v * 1000) / 1000) + '%'; }
    L.forEach(function (p, idx) {
      var r = SB.rng.make(base + ':' + idx + ':' + p.seq), k = p.kind || 'calm';
      var d = el('div', 'cs-pc cs-pc-' + k + (p.planted ? ' cs-pc-planted' : ''), box);
      d.style.left = pc(p.x / W * 100); d.style.top = pc(p.y / H * 100);
      d.style.width = pc(p.w / W * 100); d.style.height = pc(p.h / H * 100);
      d.style.setProperty('--pd', Math.round(at) + 'ms'); at += gap + r.range(-20, 20);
      d.style.setProperty('--pr', ((r.chance(0.5) ? 1 : -1) * r.range(2, 4)).toFixed(2) + 'deg');
      d.style.setProperty('--kx', (p.depth * W / p.w).toFixed(4)); d.style.setProperty('--ky', (p.depth * H / p.h).toFixed(4));
      d.style.setProperty('--pt', -Math.round(since) + 'ms');
      var per, dl, a = 0, sk, sy, side = idx % 2 ? 1 : -1;
      if (k === 'band') { per = beat * 2; dl = -beat * (idx % 2); a = r.range(1, 2); sk = side * r.range(0.8, 1.6); sy = r.range(1.008, 1.018); }
      else if (k === 'drums') { per = beat; dl = -beat / 2; a = r.range(0.4, 0.9); sk = r.range(-0.6, 0.6); sy = 1.008; }
      else if (k === 'crowd') { per = r.range(0.55, 1.5); dl = -r.range(0, per); a = p.off ? r.range(3, 6) : r.range(1.5, 3); sk = r.range(-1.2, 1.2); sy = r.range(0.99, 1.012); }
      else if (k === 'person') { per = r.range(1.6, 3.2); dl = -r.range(0, per); sk = side * r.range(0.6, 1.2); sy = r.range(1.004, 1.01); }
      else { per = r.range(3, 5.5); dl = -r.range(0, per); sk = side * r.range(0.25, 0.6); sy = r.range(1.006, 1.012); }
      if (p.planted) a = 0;   /* something stands in front of it: it moves only about its bottom edge */
      d.style.setProperty('--per', per.toFixed(3) + 's'); d.style.setProperty('--dl', dl.toFixed(3) + 's');
      d.style.setProperty('--a', a.toFixed(2)); d.style.setProperty('--sk', sk.toFixed(2) + 'deg'); d.style.setProperty('--sy', sy.toFixed(4));
      p.canvas.className = 'cs-pc-in';
      p.canvas.setAttribute('aria-hidden', 'true');
      d.appendChild(p.canvas);
    });
  }
  function picture(frame, x, cssW, cssH, cls, sized) {
    var cv = el('canvas', cls || 'cs-art'), s = Math.min(res(), 4000 / Math.max(cssW, cssH, 1));
    cv.width = Math.round(cssW * s); cv.height = Math.round(cssH * s);
    /* when things may move, the people come off the room as pieces of their own: the canvas is the room, in a box */
    var lay = !!(SB.Scenes && SB.Scenes.layered) && !reduced(), box = cv, last = null;
    if (lay) { box = el('div', (cls || 'cs-art') + ' cs-layers'); cv.className = 'cs-room'; box.appendChild(cv); }
    if (sized) { box.style.width = P(cssW); box.style.height = P(cssH); }
    box.setAttribute('aria-hidden', 'true');
    if (SB.Scenes && SB.Scenes.draw) {
      /* the photos this picture needs that are not in yet: the picture stays hidden until they are (it draws itself
         again when they land), so it shows whole, never its stand-in first; a slow load shows the loading tape */
      var need = SB.Scenes.need ? SB.Scenes.need(frame.art || 'POSTCARD_FRONT', SB.util && SB.util.copy ? SB.util.copy(x) : x) : [];
      try {
        if (lay) SB.Scenes.layered(cv, frame.art || 'POSTCARD_FRONT', x, function (L, info) { last = [L, info]; pieces(box, cv, x, L, info); });
        else SB.Scenes.draw(cv, frame.art || 'POSTCARD_FRONT', x);
      }
      catch (e) { if (SB.log) SB.log('warn', 'SB.Cutscene', 'art ' + frame.art + ': ' + e.message); }
      if (need.length && SB.Boot && SB.Boot.hold) {
        box.classList.add('cs-wait');
        /* shown at last: the pieces slap on again now there is someone to see it */
        SB.Boot.hold(need, function () { box.classList.remove('cs-wait'); if (last) pieces(box, cv, x, last[0], last[1]); });
      }
    }
    box._t0 = Date.now();   /* about when it goes up and its pan starts: pieces that come later join the pan in step */
    return box;
  }

  /* ---------------- the player ---------------- */

  function play(cutscene, slots, onDone, opts) {
    if (current) current.close(true);
    try { if (SB.UI && SB.UI.flush) SB.UI.flush(); } catch (e) { /* a cutscene still plays */ }   // save before it, so a closed tab comes back here (0.1)
    cutscene = cutscene || {}; slots = slots || {}; opts = opts || {};
    /* a frame with an `ask` waits for the player's reply when opts.ask is on (the setup questions on the way in);
       otherwise the reply picked before (opts.answers[ask.id]) is shown as a plain line */
    var asking = !!opts.ask, answers = {}, prior = opts.answers || null, waiting = null, advancing = false, toggles = {};
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
    /* skip is pressable on every beat; on a cutscene already seen it is first in tab order (fix list 2.20) */
    var skipBtn = opts.seen ? el('button', 'cs-btn cs-skip pz-hl', box, 'skip') : null;
    var bar = el('div', 'cs-bar', box);
    var strip = el('span', 'cs-strip pz-paper', bar);
    var count = el('span', 'cs-count', strip);
    var hint = el('span', 'cs-hint', strip, 'click or space');
    void hint;
    var nextBtn = el('button', 'cs-btn cs-next pz-hl', bar, 'next');
    nextBtn.type = 'button';
    if (!skipBtn) skipBtn = el('button', 'cs-btn cs-skip pz-hl', box, 'skip');
    skipBtn.type = 'button'; skipBtn.setAttribute('aria-label', asking ? 'Skip this question and take the usual answer' : 'Skip this cutscene');
    /* opts.back: { label, on }: a way out before the questions are answered (the way in goes back to the map) */
    var backBtn = opts.back ? el('button', 'cs-btn cs-back pz-hl', box, opts.back.label || 'back') : null;
    if (backBtn) backBtn.type = 'button';

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
        var side = sideOf(ln), sp = speech(ln, slots, x, key + ':' + idx + ':' + i, side);
        sp.classList.add('cs-' + side);
        if (!still) mv(sp, 'slap', t); t += 700;
        into.appendChild(sp);
      });
      /* the replies are pressable at once, while the words are still going up (fix list 1.18) */
      if (f.ask) t = reply(f, x, into, asking ? 0 : t);
    }

    /* A frame that asks the player something: the replies are "you" balloons to press, each with a typed note of what
     * it does in the game, and a foot line under them; an ask with a `kind` the caller drew a widget for
     * (opts.widgets[kind], the booking name) is drawn by it. Nothing turns the frame till it is answered; the answer
     * turns it. Watched again (no opts.ask), the reply that was picked is a plain "you" line. */
    function reply(f, x, into, t) {
      var a = f.ask, wrap, row, widget, v, said = null;
      if (!asking) {
        v = prior ? prior[a.id] : undefined;
        if (v === undefined) return t;
        (a.options || []).forEach(function (o) { if (o.v === v) said = o.say; });
        if (said == null) said = a.say || null;
        if (!said) return t;
        var sp = speech({ who: 'you', say: said }, slots, x, key + ':' + idx + ':r', 'right');
        sp.classList.add('cs-right');
        if (!still) mv(sp, 'slap', t);
        into.appendChild(sp);
        return t + 700;
      }
      waiting = idx; nextBtn.hidden = true; hint.textContent = 'pick an answer';
      skipBtn.disabled = false;
      if (a.options && a.options.length) skipBtn.title = 'Take the usual answer'; else skipBtn.title = 'Type a name first';
      wrap = el('div', 'cs-ask' + (a.kind ? ' cs-ask-' + a.kind : ''), into);
      wrap.setAttribute('role', 'group'); wrap.setAttribute('aria-label', a.q ? fill(a.q, slots) : 'Your answer');
      /* the question as a plain sentence above the answers (fix list 1.18) */
      if (a.q) el('p', 'cs-q', wrap, fill(a.q, slots));
      if (!still) mv(wrap, 'slap', t);
      widget = a.kind && opts.widgets ? opts.widgets[a.kind] : null;
      if (widget) {
        try { widget(wrap, { slots: slots, ask: a, answer: function (val) { answer(a, val, null); } }); }
        catch (e) { if (SB.log) SB.log('warn', 'SB.Cutscene', 'ask ' + a.id + ': ' + e.message); }
        return t + 700;
      }
      row = el('div', 'cs-replies', wrap);
      (a.options || []).forEach(function (o, i) {
        var b = el('button', 'cs-reply', row), say = fill(o.say, slots), note = fill(o.note, slots);
        b.type = 'button';
        var lvl = o.level ? String(o.level).toLowerCase() : '', nEl;
        b.setAttribute('aria-label', say + (lvl ? ', ' + lvl : '') + (note ? ' (' + note + ')' : ''));
        if (note || lvl) {
          /* the effect first, in words, then the voice line under it */
          nEl = el('span', 'cs-note', b, '');
          /* the difficulty stamped first on the strip: EASY / NORMAL / HARD */
          if (lvl) el('b', 'cs-level cs-level-' + lvl, nEl, lvl);
          if (note) nEl.appendChild(document.createTextNode(note));
        }
        b.appendChild(speech({ who: 'you', say: o.say }, slots, x, key + ':' + idx + ':o' + i, 'right', true));
        if (!still) mv(b, 'slap', t + 150 + i * 160);
        b.addEventListener('click', function (e) { e.stopPropagation(); answer(a, o.v, b); });
      });
      /* a.toggle { id, label, on, off, def }: a tick box under the answers, kept with whichever answer is picked
         (user 2026-11-24: the day job switches on and off apart from how hard the game is) */
      if (a.toggle) {
        var tg = a.toggle, tb = el('button', 'cs-toggle pz-hl', wrap), tbox = el('span', 'cs-tick', tb), tcol = el('span', 'cs-togglecol', tb),
            tlab = el('span', 'cs-togglelab', tcol, fill(tg.label, slots)), tnote = el('span', 'cs-togglenote', tcol, '');
        void tlab;
        if (!(tg.id in toggles)) toggles[tg.id] = !!tg.def;
        var paint = function () {
          var on = toggles[tg.id];
          tb.setAttribute('aria-pressed', on ? 'true' : 'false'); tb.classList.toggle('is-on', on);
          tbox.textContent = on ? 'X' : '';
          tnote.textContent = fill(on ? tg.on : tg.off, slots) || '';
        };
        tb.type = 'button';
        tb.addEventListener('click', function (e) { e.stopPropagation(); if (waiting === null) return; toggles[tg.id] = !toggles[tg.id]; paint(); });
        paint();
        if (!still) mv(tb, 'slap', t + 150 + (a.options || []).length * 160);
      }
      if (a.foot) el('p', 'cs-foot', wrap, fill(a.foot, slots));
      var at = idx;
      setTimeout(function () { var b0 = row.querySelector('.cs-reply'); if (b0 && !done && idx === at) try { b0.focus(); } catch (e) { /* gone */ } }, still ? 0 : t + 200);
      return t + 700;
    }
    function answer(a, v, btn) {
      if (done || waiting === null) return;
      answers[a.id] = v;
      if (a.toggle) { answers[a.toggle.id] = a.toggle.id in toggles ? toggles[a.toggle.id] : !!a.toggle.def; Array.prototype.forEach.call(box.querySelectorAll('.cs-toggle'), function (c) { c.disabled = true; }); }
      if (typeof opts.onAnswer === 'function') try { opts.onAnswer(a.id, v, slots); } catch (e) { /* the answer is kept anyway */ }
      waiting = null; advancing = true; nextBtn.hidden = false; skipBtn.disabled = false; skipBtn.removeAttribute('title'); hint.textContent = 'click or space';
      if (btn && btn.parentNode) {
        Array.prototype.forEach.call(btn.parentNode.children, function (c) { c.disabled = true; if (c !== btn) c.classList.add('is-dropped'); });
        btn.classList.add('is-picked');
      }
      var at = idx;
      setTimeout(function () { advancing = false; if (!done && idx === at) go(idx + 1); }, still ? 0 : 520);
    }
    /* the answer a skipped question takes: the one marked def, else NORMAL, else the first */
    function usual(a) {
      var o = a.options || [], i;
      for (i = 0; i < o.length; i++) if (o[i].def) return o[i];
      for (i = 0; i < o.length; i++) if (String(o[i].level || '').toUpperCase() === 'NORMAL') return o[i];
      return o[0] || null;
    }
    /* skip: with questions to answer, on to the next one (never past it); otherwise the end */
    function skip() {
      var j;
      if (!asking) { finish(true); return; }
      if (waiting !== null) {
        var fa = frames[waiting] && frames[waiting].ask, u = fa && fa.options ? usual(fa) : null;
        if (u) { var pb = box.querySelectorAll('.cs-reply'), k2 = (fa.options || []).indexOf(u); answer(fa, u.v, pb[k2] || null); return; }
        var b = box.querySelector('.cs-ask button, .cs-ask input'); if (b) try { b.focus(); } catch (e) { /* fine */ } return;
      }
      for (j = idx + 1; j < frames.length; j++) if (frames[j].ask) { go(j); return; }
      finish(true);
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
      var capText = f.caption ? capFill(f.caption, slots) : '';
      if (capText) fig.appendChild(caption(capText, 'cs-cap-panel'));
      var saysH = 0;
      (f.lines || []).forEach(function (ln, i) {
        var side = sideOf(ln), sp = speech(ln, slots, x, key + ':' + idx + ':' + i, side, true);
        sp.classList.add('cs-' + side);
        if (!still) mv(sp, 'slap', 450 + i * 600);
        says.appendChild(sp); saysH += (sp._h || 0) + 2;
      });
      /* the picture takes what the words leave: the spread is 636 tall (kept 36 spare), the balloons hang 30 over the picture's top,
         and the caption (19 type, about 10.5 a letter) wraps to the picture's width */
      var cssW = Math.min((1280 - 120) / perSpread - 40, 760), capH, room;
      for (var pass = 0; pass < 2; pass++) {
        capH = capText ? Math.ceil(capText.length * 10.5 / Math.max(cssW, 200)) * 28.5 + 22 : 0;
        room = 600 - 20 - Math.max(0, saysH - 30) - capH;
        cssW = Math.max(200, Math.min(cssW, room / 0.75));
      }
      var px = {}, k; for (k in x) px[k] = x[k];
      px.paper = ['canary', 'pink', 'blue', 'green', 'salmon', 'lilac'][(idx + (key.length || 0)) % 6]; /* a photocopy on coloured copy paper, the same pass as the night scene */
      pic.appendChild(picture(f, px, cssW, cssW * 0.75, 'cs-art', true));
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
        var L = lettering(txt.join(' ') || capFill(f.caption, slots), 24, 24, 'note:' + key + idx);
        L.svg.setAttribute('viewBox', '0 -2 ' + Math.ceil(L.w + 4) + ' ' + Math.ceil(L.h + 8)); sized(L.svg, Math.ceil(L.w + 4), Math.ceil(L.h + 8));
        L.svg.setAttribute('aria-hidden', 'true'); o.appendChild(L.svg);
      } else if (obj === 'text') {
        var ph = el('div', 'cs-phone', o);
        lines.forEach(function (l) { el('p', 'cs-msg' + (l.who === 'you' ? ' cs-msg-you' : ''), ph, fill(l.say, slots)); });
      } else {
        var dims = obj === 'polaroid' ? [300, 300] : obj === 'flyer' ? [300, 388] : obj === 'tape' ? [150, 150] : [420, 280];
        o.appendChild(picture(f, x, dims[0], dims[1], 'cs-art', true));
        if (obj !== 'flyer' && txt.length) {
          var M = lettering(txt.join(' '), obj === 'polaroid' ? 17 : 19, obj === 'polaroid' ? 24 : 28, 'drop:' + key + idx);
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
    function next() { if (started && waiting === null && !advancing) go(idx + 1); }
    function onKey(e) {
      if (done) return;
      var k = e.key;
      if (k === 'Escape') { e.preventDefault(); skip(); return; }
      if (k === 'Tab') { /* keep focus inside: the buttons, and a question's replies or field */
        var f = Array.prototype.filter.call(box.querySelectorAll('button, input'), function (b) { return !b.disabled && b.getClientRects().length > 0; }), at = f.indexOf(document.activeElement);
        e.preventDefault(); if (f.length) f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
        return;
      }
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;   // typing a name
      if (e.target && e.target.tagName === 'BUTTON' && (k === ' ' || k === 'Enter')) return;
      if (k === ' ' || k === 'Space' || k === 'Spacebar' || k === 'Enter' || k === 'ArrowRight' || k === 'PageDown') { e.preventDefault(); next(); }
    }
    function onClick(e) {
      if (e.target.closest('.cs-btn') || e.target.closest('.cs-ask')) return;
      next();
    }
    function finish(skipped) {
      if (done) return;
      wasSkipped = !!skipped;
      close(false);
      if (typeof onDone === 'function') onDone({ key: key, skipped: !!skipped, answers: answers });
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
      inerted.forEach(function (c) { try { c.inert = false; } catch (e) { /* gone */ } });
      if (current && current.root === root) current = null;
      if (lastFocus && lastFocus.focus && lastFocus.isConnected !== false) try { lastFocus.focus(); } catch (e) { /* gone */ }
      /* the control it came from is gone (a new screen was built under the scene): put the keyboard on the first thing
         that can be pressed, not on the page (fix list 0.9) */
      setTimeout(function () {
        var a = document.activeElement, t;
        if (a && a !== document.body && a.isConnected !== false) return;
        if (document.querySelector('[role="dialog"]:not([hidden])')) return;
        t = document.querySelector('.sy-strip-open, main .kt-btn, main button, main input, .dk-hits:not([inert]) .dk-hit');
        if (t) try { t.focus({ preventScroll: true }); } catch (e) { /* fine */ }
      }, 120);
      if (SB.CutsceneAudio) SB.CutsceneAudio.end(!!silent || wasSkipped);
    }

    nextBtn.addEventListener('click', function () { next(); });
    skipBtn.addEventListener('click', function () { skip(); });
    if (backBtn) backBtn.addEventListener('click', function () { if (done) return; close(false); if (typeof opts.back.on === 'function') opts.back.on(); });
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey, true);
    /* what is behind the dialog is not reachable by keyboard or screen reader while it plays (restored on close) */
    var inerted = [];
    try {
      Array.prototype.forEach.call(document.body.children || [], function (c) {
        if (c !== root && c.nodeType === 1 && !c.inert && !/^(SCRIPT|STYLE)$/.test(c.tagName)) { c.inert = true; inerted.push(c); }
      });
    } catch (e) { inerted = []; }
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

    current = { root: root, next: next, skip: skip, close: close,
      /** goTo(i): jump to frame i (for the sample page and tests); panels before it are laid down too. */
      goTo: function (i) { if (!started) { want = i; return; } while (idx < i && !done) go(idx + 1); } };
    return current;
  }

  return { play: play, playing: function () { return !!current; } };
});
