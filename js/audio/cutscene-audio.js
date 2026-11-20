/* Scene Booker — js/audio/cutscene-audio.js
 * SB.CutsceneAudio: what a cutscene sounds like. None of it is heard anywhere else in the game.
 *   - a score: one lo-fi cue of the cutscene's mood (content/cutscene-audio.js MOOD), the least recently played one,
 *     faded in, looped, faded out at the end
 *   - an ambience bed under each picture (ART.amb), crossfaded when the picture changes it
 *   - band bleed: on a show picture the band's own loop (SB.Audio.loopFor) through a lowpass, 'near' (in the room,
 *     through the crowd) or 'far' (through a wall, from the yard), and the score ducks under it
 *   - hits: the moment in the picture (a knock, a siren chirp, the van door), a beat after the frame lands
 *   - the paper being handled: the copier and a slap for zine panels, a shutter for a scene, the thing itself for a drop
 * js/ui/cutscene.js calls:  start(cutscene, slots)  frame(i, frame, artCtx, kind)  turn(kind)  end(skipped)
 * Files: content/cutscene-audio-files.js lists what was built under assets/cutscene/; anything missing is silence.
 * Sound goes through SB.Sfx's AudioContext (SB.Sfx.audio()); the hits and paper are SB.Sfx 'cs.*' cues. Opened from
 * a file (fetch fails), the score and beds play through plain <audio> elements, quieter, with no bleed.
 * Follows the 'sound' preference while it plays. With no AudioContext (Node, the smoke test) every call is a no-op,
 * and nothing here ever throws into the cutscene.
 *   plan(cutscene, slots) -> { mood, frames: [{ art, amb, bleed, hits, paper }] }   the decisions, no sound (tests)
 */
(function (SB) {
  'use strict';

  var W = typeof window !== 'undefined' ? window : null;
  var BASE = (W && W.SB_ASSET_BASE) || '';

  /* levels in dB, times in seconds */
  var SCORE_DB = -4, DUCK_DB = -10, AMB_DB = -3;
  var BLEED = { near: { db: -10, hz: 2200, send: 0.06 }, far: { db: -13, hz: 500, send: 0.4 } };
  var FADE_IN = 1.2, FADE_OUT = 1.5, FADE_SKIP = 0.4, XFADE = 0.8, HIT_MS = 250, HIT_GAP_MS = 450, TURN_MS = 240;
  var EL_VOL = 0.5;                                   // <audio> fallback: no compressor behind it, so it sits lower
  var CACHE_MAX = 12, CACHE_SECONDS = 300;            // decoded audio is 8 bytes a stereo frame: about 100 MB at most

  /* a cue whose own clip was not built falls back to the desk's paper */
  var FALLBACK = { 'cs.slap': 'slide', 'cs.turn': 'flip', 'cs.shutter': 'slide', 'cs.mailslot': 'place', 'cs.photo': 'place',
                   'cs.note': 'place', 'cs.cassette': 'place', 'cs.flyer': 'place', 'cs.peel': 'flip', 'cs.tape': 'tear' };
  var DROP_CUE = { postcard: 'cs.mailslot', polaroid: 'cs.photo', note: 'cs.note', text: 'cs.text', tape: 'cs.cassette', flyer: 'cs.flyer' };
  /* slots that can hold a band's name, most likely the band playing first */
  var BAND_SLOTS = ['band', 'band3', 'band2', 'band1', 'touring', 'closer', 'local', 'kids'];

  function db(x) { return Math.pow(10, x / 20); }
  function own(o, k) { return !!o && Object.prototype.hasOwnProperty.call(o, k); }
  function data() { return (SB.Content && SB.Content.cutsceneAudio) || {}; }
  function files() { return (SB.Content && SB.Content.cutsceneAudioFiles) || {}; }
  function warn(msg) { try { if (SB.log) SB.log('warn', 'SB.CutsceneAudio', msg); } catch (e) { /* fine */ } }
  function level() { try { return SB.Sfx && SB.Sfx.level ? SB.Sfx.level() : 0; } catch (e) { return 0; } }

  /* ---------------------------------------------------------------- */
  /* the decisions (no sound: also what the tests read)                */
  /* ---------------------------------------------------------------- */

  function moodOf(cutscene) {
    var d = data(), moods = d.MOODS || [], key = String((cutscene && cutscene.key) || ''), pre = d.MOOD_PREFIX || [], i;
    if (cutscene && cutscene.mood && moods.indexOf(cutscene.mood) >= 0) return cutscene.mood;
    if (own(d.MOOD, key)) return d.MOOD[key];
    for (i = 0; i < pre.length; i++) if (key.indexOf(pre[i][0]) === 0) return pre[i][1];
    return d.MOOD_DEFAULT || 'quiet';
  }

  /* an art keyed by cause ({ SOLD: 'FOR_SALE', ..., _: 'EMPTY_ROOM' }) comes to one key, the way SB.Scenes draws it */
  function artKey(art, x) {
    var ks, i, k, last = null, f;
    art = art || 'POSTCARD_FRONT';
    if (typeof art !== 'object') return String(art);
    if (SB.Scenes && SB.Scenes.resolve) { try { return String(SB.Scenes.resolve(art, x)); } catch (e) { /* by hand */ } }
    x = x || {}; f = x.flags || {}; ks = Object.keys(art);
    for (i = 0; i < ks.length; i++) {
      k = ks[i];
      if (k === '_' || k === 'default') continue;
      last = art[k];
      if (f[k] || x[k] || x.why === k) return String(art[k]);
    }
    return String(art._ || art['default'] || last);
  }

  function list(v) { return v == null ? [] : (Array.isArray(v) ? v.slice() : [v]); }

  /* what frame i sounds like. bedNow: the bed already playing (for a close-up that holds it). turned: a spread just turned. */
  function frameCue(cutscene, i, frame, x, kind, bedNow, turned) {
    var d = data(), key = String((cutscene && cutscene.key) || ''), art = artKey(frame && frame.art, x);
    var e = (d.ART && d.ART[art]) || {}, o = (d.FRAMES && d.FRAMES[key] && d.FRAMES[key][i]) || null, pre = d.HIT_PREFIX || [], j;
    var amb = e.amb || null, bleed = e.bleed || null, hit = e.hit || null, paper = [];
    frame = frame || {};
    if (kind === 'DROP') { amb = (d.DROP && d.DROP.amb) || null; bleed = null; hit = null; }
    else if (e.hold && bedNow) amb = bedNow;
    if (o) {
      if (own(o, 'amb')) amb = o.amb;
      if (own(o, 'bleed')) bleed = o.bleed;
      if (own(o, 'hit')) hit = o.hit;
    } else if (!(d.FRAMES && d.FRAMES[key])) {
      for (j = 0; j < pre.length; j++) if (key.indexOf(pre[j][0]) === 0 && pre[j][1] === i) { hit = pre[j][2]; break; }
    }
    if (own(frame, 'amb')) amb = frame.amb;
    if (own(frame, 'bleed')) bleed = frame.bleed;
    if (own(frame, 'sfx')) hit = frame.sfx;
    if (kind === 'DROP') paper.push(DROP_CUE[frame.obj || 'postcard'] || 'cs.slap');
    else if (kind === 'SCENE') paper.push(i === 0 ? 'cs.shutter' : 'cs.pan');
    else { if (i === 0) paper.push('cs.xerox'); if (turned) paper.push('cs.turn'); paper.push('cs.slap'); }
    return { art: art, amb: amb || null, bleed: bleed === 'near' || bleed === 'far' ? bleed : null, hits: list(hit), paper: paper };
  }

  function kindOf(cutscene) {
    var k = String((cutscene && cutscene.kind) || 'PANELS').toUpperCase();
    return k === 'SCENE' || k === 'DROP' ? k : 'PANELS';
  }

  function plan(cutscene, slots) {
    var kind = kindOf(cutscene), bed = null;
    return { mood: moodOf(cutscene), kind: kind, frames: ((cutscene && cutscene.frames) || []).filter(Boolean).map(function (f, i) {
      var c = frameCue(cutscene, i, f, slots || {}, kind, bed, false);
      bed = c.amb;
      return c;
    }) };
  }

  /* ---------------------------------------------------------------- */
  /* the sound                                                         */
  /* ---------------------------------------------------------------- */

  var g = null;                 // the graph, built once
  var cache = {}, clock = 0;    // url -> { p, buf, secs, at }
  var playedAt = {};            // score url -> when it last played (the least recently used cue is next)
  var active = null;            // the cutscene playing: { cutscene, slots, kind, mood, timers, last, bed, turned, off, tick }
  var chans = null;

  function graph() {
    var a, c;
    if (g) return g;
    try { a = SB.Sfx && SB.Sfx.audio ? SB.Sfx.audio() : null; } catch (e) { a = null; }
    if (!a || !a.ctx) return null;
    try {
      c = a.ctx;
      g = { ctx: c };
      g.out = c.createGain(); g.out.gain.value = 0.9 * level(); g.out.connect(c.destination);   // past the sfx compressor: music does not pump
      g.score = c.createGain(); g.score.gain.value = db(SCORE_DB); g.score.connect(g.out);
      g.amb = c.createGain(); g.amb.gain.value = db(AMB_DB); g.amb.connect(g.out);
      /* the wall: two lowpasses in a row, then how loud it gets through, and a little of the room it is in */
      g.lp = c.createBiquadFilter(); g.lp.type = 'lowpass'; g.lp.frequency.value = BLEED.near.hz; g.lp.Q.value = 0.5;
      g.lp2 = c.createBiquadFilter(); g.lp2.type = 'lowpass'; g.lp2.frequency.value = BLEED.near.hz; g.lp2.Q.value = 0.5;
      g.bleed = c.createGain(); g.bleed.gain.value = db(BLEED.near.db);
      g.send = c.createGain(); g.send.gain.value = BLEED.near.send;
      g.lp.connect(g.lp2); g.lp2.connect(g.bleed); g.bleed.connect(g.out);
      g.bleed.connect(g.send); if (a.verb) g.send.connect(a.verb);
    } catch (e2) { g = null; }
    return g;
  }

  /* -> a promise of the decoded buffer. Cached, a few at a time; the oldest one not playing goes first. */
  function buffer(url) {
    var e = cache[url];
    if (e) { e.at = ++clock; return e.p; }
    e = cache[url] = { p: null, buf: null, secs: 0, at: ++clock };
    e.p = W.fetch(url).then(function (r) {
      if (!r.ok && r.status !== 0) throw new Error(url + ': ' + r.status);
      return r.arrayBuffer();
    }).then(function (ab) {
      return new Promise(function (ok, no) {
        var t = setTimeout(function () { no(new Error(url + ': decode timed out')); }, 8000);
        g.ctx.decodeAudioData(ab, function (b) { clearTimeout(t); ok(b); }, function (err) { clearTimeout(t); no(err || new Error(url + ': not decoded')); });
      });
    }).then(function (b) { e.buf = b; e.secs = b.duration; trim(); return b; });
    e.p.catch(function () { if (cache[url] === e) delete cache[url]; });
    return e.p;
  }
  function inUse(url) {
    var k;
    for (k in chans) if (chans[k].url === url) return true;
    return false;
  }
  function trim() {
    var urls, n, secs, i, u;
    for (;;) {
      urls = Object.keys(cache).filter(function (k) { return cache[k].buf; });
      n = urls.length; secs = 0;
      for (i = 0; i < n; i++) secs += cache[urls[i]].secs;
      if (n <= CACHE_MAX && secs <= CACHE_SECONDS) return;
      urls = urls.filter(function (k) { return !inUse(k); }).sort(function (a, b) { return cache[a].at - cache[b].at; });
      if (!urls.length) return;
      u = urls[0]; cache[u].buf = null; delete cache[u];
    }
  }

  /* one looping buffer into `dest`, faded in */
  function bufVoice(buf, dest, fade) {
    var c = g.ctx, src = c.createBufferSource(), gain = c.createGain(), t = c.currentTime + 0.02, dead = false;
    src.buffer = buf; src.loop = true;
    gain.gain.setValueAtTime(0, t); gain.gain.linearRampToValueAtTime(1, t + Math.max(0.02, fade));
    src.connect(gain); gain.connect(dest);
    src.onended = function () { try { src.disconnect(); gain.disconnect(); } catch (e) { /* gone */ } };
    src.start(t);
    return { stop: function (f) {
      var now = c.currentTime;
      if (dead) return; dead = true;
      f = Math.max(0.03, f || 0.03);
      try {
        gain.gain.cancelScheduledValues(now); gain.gain.setTargetAtTime(0, now, f / 3.5);
        src.stop(now + f + 0.1);
      } catch (e) { try { src.stop(); } catch (e2) { /* never started */ } }
    }, level: function () { /* the graph's out follows the preference */ } };
  }

  /* the same on a plain <audio> element: the fallback when the file cannot be fetched (a page opened from a file) */
  function elVoice(url, vol, fade) {
    var a, v = 0, want = 1, timer = null, dead = false;
    if (!W || typeof W.Audio !== 'function') return null;
    try { a = new W.Audio(url); } catch (e) { return null; }
    a.loop = true; a.volume = 0;
    function set() { try { a.volume = Math.max(0, Math.min(1, v * vol * EL_VOL * level())); } catch (e) { /* fine */ } }
    function ramp(to, secs, then) {
      var step = 0.05 / Math.max(0.05, secs);
      want = to;
      if (timer) clearInterval(timer);
      timer = setInterval(function () {
        v = want > v ? Math.min(want, v + step) : Math.max(want, v - step);
        set();
        if (v === want) { clearInterval(timer); timer = null; if (then) then(); }
      }, 50);
    }
    a.addEventListener('error', function () { dead = true; if (timer) clearInterval(timer); });
    try { var p = a.play(); if (p && p.catch) p.catch(function () { /* no gesture yet, or no file */ }); } catch (e2) { return null; }
    ramp(1, fade);
    return { stop: function (f) {
      if (dead) return; dead = true;
      ramp(0, f || 0.05, function () { try { a.pause(); a.removeAttribute('src'); a.load(); } catch (e) { /* fine */ } });
    }, level: set };
  }

  /* one thing at a time on a channel, crossfaded when it changes */
  function Chan(dest, elOk, vol) { this.dest = dest; this.elOk = elOk; this.vol = vol; this.url = null; this.cur = null; this.tok = 0; }
  Chan.prototype.set = function (url, fade, up) {
    var self = this, my;
    if (url === this.url) return;
    this.drop(fade);
    if (!url) return;
    this.url = url; my = this.tok;
    function byEl() {
      if (my !== self.tok || !self.elOk) return;
      self.cur = elVoice(url, self.vol, fade);
    }
    if (!W || typeof W.fetch !== 'function') { byEl(); return; }
    buffer(url).then(function (buf) {
      if (my !== self.tok) return;
      self.cur = bufVoice(buf, g[self.dest], fade);
      if (up) up();
    }, function (e) {
      if (W.location && W.location.protocol === 'file:') byEl();
      else if (my === self.tok) warn(String((e && e.message) || url + ' did not load'));
    });
  };
  Chan.prototype.drop = function (fade) {
    this.tok++;
    if (this.cur) { try { this.cur.stop(fade); } catch (e) { /* gone */ } }
    this.cur = null; this.url = null;
  };

  function ready() {
    if (!graph()) return false;
    if (!chans) chans = { score: new Chan('score', true, db(SCORE_DB)), amb: new Chan('amb', true, db(AMB_DB)), bleed: new Chan('lp', false, 1) };
    return true;
  }

  function urlOf(rel) { var f = files(); return BASE + (f.base || 'assets/cutscene/') + rel; }

  /* the cue of this mood played longest ago (never, first) */
  function pickScore(mood) {
    var l = ((files().music || {})[mood] || []).slice(), best = null, bestAt = Infinity, i, u, at;
    if (!l.length) return null;
    l.sort(function () { return Math.random() - 0.5; });
    for (i = 0; i < l.length; i++) { u = urlOf(l[i]); at = playedAt[u] || 0; if (at < bestAt) { best = u; bestAt = at; } }
    playedAt[best] = ++clock;
    return best;
  }

  function duck(on) {
    if (!g) return;
    try { g.score.gain.setTargetAtTime(db(SCORE_DB + (on ? DUCK_DB : 0)), g.ctx.currentTime, on ? 0.25 : 0.5); } catch (e) { /* fine */ }
  }

  /* a band's name -> its loop's url, through the game's bands */
  function loopUrl(name) {
    var s, id, b = null, want = String(name || '').toLowerCase().replace(/\s+/g, ' ').trim(), loop, d;
    if (!want || !SB.Audio || !SB.Audio.loopFor) return null;
    try { s = SB.UI && SB.UI.game ? SB.UI.game() : null; } catch (e) { s = null; }
    if (!s || !s.bands) return null;
    for (id in s.bands) if (s.bands[id] && String(s.bands[id].name || '').toLowerCase().replace(/\s+/g, ' ').trim() === want) { b = s.bands[id]; break; }
    if (!b) return null;
    try { loop = SB.Audio.loopFor(b); } catch (e2) { loop = null; }
    d = (SB.Content && SB.Content.loops) || {};
    return loop && loop.file ? BASE + (d.base || '') + loop.file : null;
  }
  function bleedUrl(x) {
    var slots = active.slots || {}, u = loopUrl(x && x.band), i;
    if (u) return u;
    if (chans.bleed.url) return chans.bleed.url;               // nobody named: whoever is already playing
    for (i = 0; i < BAND_SLOTS.length && !u; i++) u = loopUrl(slots[BAND_SLOTS[i]]);
    for (i = 0; slots.bands && i < slots.bands.length && !u; i++) u = loopUrl(slots.bands[i]);
    return u;
  }

  function setBleed(mode, x) {
    var url = mode ? bleedUrl(x) : null, p, t;
    if (!url) { chans.bleed.drop(XFADE); duck(false); return; }
    p = BLEED[mode]; t = g.ctx.currentTime;
    try {
      g.lp.frequency.setTargetAtTime(p.hz, t, 0.15); g.lp2.frequency.setTargetAtTime(p.hz, t, 0.15);
      g.bleed.gain.setTargetAtTime(db(p.db), t, 0.15); g.send.gain.setTargetAtTime(p.send, t, 0.15);
    } catch (e) { /* fine */ }
    if (chans.bleed.url === url) { if (chans.bleed.cur) duck(true); return; }
    duck(false);
    chans.bleed.set(url, XFADE, function () { duck(true); });
  }

  function cue(name, opts) {
    try {
      if (!SB.Sfx || !name) return;
      if (SB.Sfx.has && !SB.Sfx.has(name) && FALLBACK[name]) name = FALLBACK[name];
      SB.Sfx.play(name, opts);
    } catch (e) { /* sound never breaks the cutscene */ }
  }
  function later(fn, ms) {
    if (!active) return;
    var a = active, t = setTimeout(function () { if (active === a) fn(); }, ms);
    a.timers.push(t);
  }
  function clearTimers(a) { a.timers.forEach(function (t) { clearTimeout(t); }); a.timers = []; }

  function beds(c, x) {
    var f = files();
    chans.amb.set(c.amb && f.amb && f.amb[c.amb] ? urlOf(f.amb[c.amb]) : null, XFADE);
    setBleed(c.bleed, x);
  }
  function score() {
    var u = pickScore(active.mood);
    if (u) chans.score.set(u, FADE_IN);
  }

  /* the 'sound' preference, while it plays: the level follows; switched on mid-scene, the score and beds come in */
  function tick() {
    var lv = level(), k;
    if (!active || !g) return;
    try { g.out.gain.setTargetAtTime(0.9 * lv, g.ctx.currentTime, 0.05); } catch (e) { /* fine */ }
    for (k in chans) if (chans[k].cur && chans[k].cur.level) chans[k].cur.level();
    if (active.off && lv > 0) {
      active.off = false;
      score();
      if (active.last) beds(active.last.c, active.last.x);
    }
  }

  /** start(cutscene, slots): the cutscene is on screen. Any band loop the player had going stops; the score comes in. */
  function start(cutscene, slots) {
    try {
      if (active) end(true);
      try { if (SB.Audio && SB.Audio.stop) SB.Audio.stop(); } catch (e) { /* fine */ }
      if (!ready()) return;
      active = { cutscene: cutscene || {}, slots: slots || {}, kind: kindOf(cutscene), mood: moodOf(cutscene), timers: [], last: null,
                 bed: null, turned: false, off: level() === 0, tick: null };
      active.tick = setInterval(tick, 400);
      duck(false);
      try { g.out.gain.setTargetAtTime(0.9 * level(), g.ctx.currentTime, 0.05); } catch (e2) { /* fine */ }
      if (!active.off) score();
    } catch (e3) { warn('start: ' + (e3 && e3.message)); }
  }

  /** frame(i, frame, artCtx, kind): frame i has landed. Its bed, its bleed, the paper, then the moment in the picture. */
  function frame(i, f, x, kind) {
    var c, wait;
    try {
      if (!active) return;
      c = frameCue(active.cutscene, i, f, x || active.slots, active.kind || kind, active.bed, active.turned);
      active.turned = false; active.bed = c.amb; active.last = { c: c, x: x };
      clearTimers(active);
      if (active.off) return;
      beds(c, x);
      wait = 0;
      c.paper.forEach(function (name) {
        if (name === 'cs.slap' && wait) later(function () { cue(name, { gap: 100 }); }, wait);
        else cue(name, { gap: 100 });
        if (name === 'cs.turn') wait = TURN_MS;
      });
      c.hits.forEach(function (name, n) { later(function () { cue(name, { gap: 200 }); }, wait + HIT_MS + n * HIT_GAP_MS); });
    } catch (e) { warn('frame: ' + (e && e.message)); }
  }

  /** turn(kind): a spread of panels is being turned; the next frame() makes the page sound before its slap. */
  function turn() { if (active) active.turned = true; }

  /** end(skipped): the cutscene closed. Everything fades (quickly when skipped) and the paper is put away. */
  function end(skipped) {
    var a = active, f = skipped ? FADE_SKIP : FADE_OUT, k;
    try {
      if (!a) return;
      active = null;
      clearTimers(a);
      if (a.tick) clearInterval(a.tick);
      for (k in chans) chans[k].drop(k === 'score' ? f : Math.min(f, XFADE));
      duck(false);
      if (!a.off) cue(a.kind === 'SCENE' && !skipped ? 'cs.peel' : 'cs.close', { gap: 100 });
      trim();
    } catch (e) { active = null; warn('end: ' + (e && e.message)); }
  }

  SB.CutsceneAudio = { start: start, frame: frame, turn: turn, end: end, plan: plan, moodOf: moodOf,
                       playing: function () { return !!active; } };
})(SB);
