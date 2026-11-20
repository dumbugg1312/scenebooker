/* Scene Booker — audio/loops.js
 * SB.Audio: what a band sounds like. Each band has one short seamless loop, chosen from its style's list in
 * SB.Content.loops (content/loops.js): styles[band.style], else the parent genre's list, at a stable index made
 * from the band's id, within the 'local' or 'touring' half of that list (band.local). Web Audio; the AudioContext
 * is made on the first click. One thing plays at a time.
 *
 *   SB.Audio.has(band)         true when the band has a loop to play (controls hide when false)
 *   SB.Audio.loopFor(band)     the loop's entry { file, bpm, bars, seconds, artist, title, license, licenseUrl, url } or null
 *   SB.Audio.playBand(band)    toggles that band's loop (it repeats until stopped)
 *   SB.Audio.playBill(bands)   each band's loop twice, in the order given, 0.4 s apart; calling it again while it plays stops it
 *   SB.Audio.stop()
 *   SB.Audio.now()             { kind: 'band' | 'bill' | null, bandId }
 *   SB.Audio.watch(fn)         fn() after every change of what is playing; returns a function that stops watching
 * Presentation only: it never reads or writes the game state.
 */
(function (root) {
  'use strict';
  var SB = root.SB;
  if (!SB) return;

  var GAP = 0.4, FADE = 0.03, REPEATS = 2;
  var ctx = null, buffers = {}, live = [], timers = [], els = [], token = 0, watchers = [];
  var cur = { kind: null, bandId: null };

  function data() { return (SB.Content && SB.Content.loops) || null; }

  function listFor(band) {
    var d = data(), styles = (d && d.styles) || {}, E = SB.Enums || {}, st, g, l;
    if (!band) return null;
    st = band.style || band.genre;
    l = styles[st];
    if (l && l.length) return l;
    g = (E.STYLE_GENRE && E.STYLE_GENRE[st]) || band.genre;
    l = styles[g];
    return l && l.length ? l : null;
  }

  /* Local bands draw from the 'local' loops and touring bands from the 'touring' ones, so a touring act never
   * sounds like a local band; a style with no loops in that pool (or loops without a pool) uses its whole list. */
  function loopFor(band) {
    var l = listFor(band), want, p;
    if (!l) return null;
    want = band.local === false ? 'touring' : 'local';
    p = l.filter(function (x) { return x.pool === want; });
    if (p.length) l = p;
    return l[SB.rng.hash(String(band.id)) % l.length] || null;
  }

  function urlOf(loop) { var d = data(); return ((d && d.base) || '') + loop.file; }
  function has(band) { return !!loopFor(band); }

  function context() {
    var AC = root.AudioContext || root.webkitAudioContext;
    if (!ctx && AC) { try { ctx = new AC(); } catch (e) { ctx = null; } }
    if (ctx && ctx.state === 'suspended' && ctx.resume) { try { ctx.resume(); } catch (e2) { /* fine */ } }
    return ctx;
  }

  function tell() {
    watchers.slice().forEach(function (fn) { try { fn(); } catch (e) { /* a dead control */ } });
  }
  function set(kind, bandId) { cur = { kind: kind, bandId: bandId || null }; tell(); }

  function silence() {
    token++;
    live.forEach(function (x) {
      try {
        if (ctx) { x.gain.gain.cancelScheduledValues(ctx.currentTime); x.gain.gain.setTargetAtTime(0, ctx.currentTime, FADE / 3); x.src.stop(ctx.currentTime + FADE * 2); }
        else x.src.stop();
      } catch (e) { /* already stopped */ }
    });
    live = [];
    timers.forEach(function (t) { clearTimeout(t); });
    timers = [];
    els.forEach(function (a) { try { a.pause(); a.src = ''; } catch (e) { /* fine */ } });
    els = [];
  }

  function stop() {
    silence();
    if (cur.kind) set(null);
  }

  /* -> a promise of the decoded buffer, cached by url. Rejects when the file cannot be fetched or decoded. */
  function buffer(url) {
    if (!buffers[url]) {
      buffers[url] = root.fetch(url).then(function (r) {
        if (!r.ok && r.status !== 0) throw new Error('loop ' + url + ': ' + r.status);
        return r.arrayBuffer();
      }).then(function (ab) {
        /* a stalled context (a hidden tab, too many contexts) can leave a decode pending forever: give up after 5 s
         * so the caller falls back to an <audio> element */
        return new Promise(function (ok, no) {
          var t = setTimeout(function () { no(new Error('loop ' + url + ': decode timed out')); }, 5000);
          ctx.decodeAudioData(ab, function (b) { clearTimeout(t); ok(b); }, function (e) { clearTimeout(t); no(e); });
        });
      });
      buffers[url].catch(function () { delete buffers[url]; });
    }
    return buffers[url];
  }

  /* Start a buffer looping at time `at`; with `until`, it stops there. -> the source */
  function start(buf, at, until) {
    var src = ctx.createBufferSource(), gain = ctx.createGain();
    src.buffer = buf; src.loop = true;
    gain.gain.setValueAtTime(0, at);
    gain.gain.linearRampToValueAtTime(0.9, at + FADE);
    if (until) {
      gain.gain.setValueAtTime(0.9, until - FADE);
      gain.gain.linearRampToValueAtTime(0, until);
    }
    src.connect(gain); gain.connect(ctx.destination);
    src.start(at);
    if (until) src.stop(until + 0.01);   // after start(): stop() on a source that has not started throws
    live.push({ src: src, gain: gain });
    return src;
  }

  /* Where fetch or decoding is not possible (a page opened from a file, no Web Audio): a plain audio element. */
  function elementPlay(url, times, done) {
    var a, n = 0;
    if (typeof root.Audio !== 'function') { if (done) done(); return; }
    a = new root.Audio(url);
    a.loop = !times;
    if (times) a.addEventListener('ended', function () {
      n++;
      if (n < times) { try { a.currentTime = 0; a.play(); } catch (e) { if (done) done(); } }
      else if (done) done();
    });
    a.addEventListener('error', function () { if (done) done(); else stop(); });
    els.push(a);
    try { var p = a.play(); if (p && p.catch) p.catch(function () { if (done) done(); else stop(); }); } catch (e) { if (done) done(); else stop(); }
  }

  function playBand(band) {
    var loop = loopFor(band), url, my;
    if (!loop) return false;
    if (cur.kind === 'band' && cur.bandId === band.id) { stop(); return false; }
    silence();
    url = urlOf(loop);
    my = token;
    set('band', band.id);
    if (!context() || typeof root.fetch !== 'function') { elementPlay(url, 0, null); return true; }
    buffer(url).then(function (buf) {
      if (my !== token) return;
      start(buf, ctx.currentTime + 0.02, null);
    }, function () {
      if (my === token) elementPlay(url, 0, null);
    });
    return true;
  }

  function playBill(bands) {
    var list = (bands || []).filter(has), urls, my;
    if (cur.kind === 'bill') { stop(); return false; }
    if (!list.length) return false;
    silence();
    urls = list.map(function (b) { return urlOf(loopFor(b)); });
    my = token;
    set('bill', list[0].id);
    function byElements(i) {
      if (my !== token) return;
      if (i >= list.length) { stop(); return; }
      cur = { kind: 'bill', bandId: list[i].id }; tell();
      elementPlay(urls[i], REPEATS, function () { if (my === token) timers.push(setTimeout(function () { byElements(i + 1); }, GAP * 1000)); });
    }
    if (!context() || typeof root.fetch !== 'function') { byElements(0); return true; }
    /* One band at a time, timed by the wall clock: the first band starts as soon as its own file is decoded (not
     * after every band's), the next file loads while this one plays, and a file that fails falls back to an
     * <audio> element for that band only. */
    function byBuffers(i) {
      if (my !== token) return;
      if (i >= list.length) { stop(); return; }
      if (i + 1 < list.length) buffer(urls[i + 1]).catch(function () { /* that band falls back when its turn comes */ });
      buffer(urls[i]).then(function (buf) {
        var len = buf.duration * REPEATS, at;
        if (my !== token) return;
        context();
        at = ctx.currentTime + 0.03;
        start(buf, at, at + len);
        cur = { kind: 'bill', bandId: list[i].id }; tell();
        timers.push(setTimeout(function () { byBuffers(i + 1); }, (len + GAP) * 1000));
      }, function () {
        if (my !== token) return;
        cur = { kind: 'bill', bandId: list[i].id }; tell();
        elementPlay(urls[i], REPEATS, function () { if (my === token) timers.push(setTimeout(function () { byBuffers(i + 1); }, GAP * 1000)); });
      });
    }
    byBuffers(0);
    return true;
  }

  function watch(fn) {
    watchers.push(fn);
    return function () { var i = watchers.indexOf(fn); if (i >= 0) watchers.splice(i, 1); };
  }

  SB.Audio = {
    has: has, loopFor: loopFor, playBand: playBand, playBill: playBill, stop: stop,
    now: function () { return { kind: cur.kind, bandId: cur.bandId }; },
    watch: watch
  };

})(typeof window !== 'undefined' ? window : globalThis);
