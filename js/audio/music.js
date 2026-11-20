/* Scene Booker — js/audio/music.js
 * SB.Music: the two places the game plays whole songs.
 *   One mixtape from the first screen on, like a player in your pocket: it starts under the menu after the first press
 *   and carries straight on into the desk; its controls are the pocket player (js/ui/musicbar.js). The title song
 *   (SB.Content.mixtape.title) is one more song on it. Shuffled, every song once before any comes round again, a moment
 *   of nothing between songs. Back/next keep a history, so back then next returns where you were.
 * js/ui/musicbar.js is the always-there control (back, play/pause, next, volume) on every screen that has this music.
 * One <audio> element, streamed (a whole song is never decoded into memory). Over http it goes through SB.Sfx's
 * AudioContext for a little boombox colour (the lows and the top rolled off, a touch of the room) and smooth fades;
 * opened from a file it is the plain element, no filters.
 * It listens to the page on its own: no game on screen is the menu, a game on screen is the desk. It goes quiet and
 * pauses while a cutscene plays, on the show night, and while a band's loop is being played (SB.Audio), and picks the
 * same song up where it was afterwards.
 * Preferences (SB.UI.prefs): 'sound' full | low | off (followed live), 'music' on | off (the folder, how it looks),
 * 'tape' on | off (whether the cassette was left playing).
 *   title(on)   desk(on)   say which of the two is wanted (the module calls these itself from the route on screen)
 *   toggle()    the cassette pressed: play if paused, else the next song
 *   next()  prev()  playPause()  setPaused(bool)  stop() (= pause, remembered)  setVolume(0..1) (pref 'musicVol')
 *   now()       { mode: 'title' | 'desk' | null, track, playing, paused, volume, time, canBack }
 *   ducked()    a cutscene, the show night or a band's loop has the room
 *   watch(fn)   fn() after every change of now(); returns a function that stops watching
 * Safe anywhere: with no Audio (Node, the smoke test) every call is a no-op, and nothing here throws into the UI.
 */
(function (SB) {
  'use strict';

  var W = typeof window !== 'undefined' ? window : null;
  var D = typeof document !== 'undefined' ? document : null;
  var BASE = (W && W.SB_ASSET_BASE) || '';

  /* levels in dB, times in seconds */
  var DESK_DB = -14, TITLE_DB = -7;
  var FADE_TITLE = 2, FADE_X = 1.2, FADE_IN = 1, FADE_DUCK = 0.6, FADE_SKIP = 0.25;
  var GAP_MS = 1500, TICK_MS = 300;
  var BOX = { hp: 60, lp: 12000, send: 0.03 }, CLEAN = { hp: 20, lp: 20000, send: 0 };

  var el = null, g = null, gTried = false;
  var st = { mode: null, track: null, on: false };   // what is in the player, and whether it is meant to be sounding
  var wantTitle = false, wantDesk = false, gestured = false, switching = false;
  var vol = 0, rampTok = 0, rampT = null, gapT = null, bag = [], lastFile = null, errors = 0, dead = { title: false, desk: false };
  var watchers = [], heard = false;
  var titleDone = false, paused = null, hist = [], fwd = [];   // the title song plays once a visit; then the tape

  function db(x) { return Math.pow(10, x / 20); }
  function data() { return (SB.Content && SB.Content.mixtape) || {}; }
  /* the title song is just one more song on the tape */
  var all = null;
  function tracks() {
    var t = data().tracks, s = data().title;
    if (all && all.src === t) return all.list;
    t = Array.isArray(t) ? t : [];
    all = { src: data().tracks, list: s && s.file ? t.concat([s]) : t.slice() };
    return all.list;
  }
  function titleSong() { var t = data().title; return t && t.file ? t : null; }
  function pref(key, fb) {
    try { var v = SB.UI && SB.UI.prefs ? SB.UI.prefs.get(key) : fb; return v === 'on' || v === 'off' ? v : fb; } catch (e) { return fb; }
  }
  function setPref(key, v) { try { if (SB.UI && SB.UI.prefs) SB.UI.prefs.set(key, v); } catch (e) { /* lasts this session */ } }
  function level() {
    try {
      if (SB.Sfx && SB.Sfx.level) return SB.Sfx.level();
      var v = SB.UI && SB.UI.prefs ? SB.UI.prefs.get('sound') : 'full';
      return v === 'off' ? 0 : (v === 'low' ? 0.4 : 1);
    } catch (e) { return 1; }
  }
  function warn(msg) { try { if (SB.log) SB.log('warn', 'SB.Music', msg); } catch (e) { /* fine */ } }
  function tell() { watchers.slice().forEach(function (fn) { try { fn(); } catch (e) { /* a dead control */ } }); }

  /* ---------------------------------------------------------------- */
  /* what should be playing                                            */
  /* ---------------------------------------------------------------- */

  /* one mixtape from the first screen on, like a player in your pocket: the menu and the desk play the same tape */
  function wanted() {
    if (!wantDesk && !wantTitle) return null;
    return tracks().length && !dead.desk ? 'desk' : null;
  }
  function isPaused() { if (paused === null) paused = pref('tape', 'on') === 'off'; return paused; }
  function musicVol() {
    var v;
    try { v = Number(SB.UI && SB.UI.prefs ? SB.UI.prefs.get('musicVol') : 0.8); } catch (e) { v = 0.8; }
    return v >= 0 && v <= 1 ? v : 0.8;
  }
  /* something else has the room: a cutscene, the show night, a band's loop */
  function ducked() {
    try {
      if (SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()) return true;
      if (SB.CutsceneAudio && SB.CutsceneAudio.playing && SB.CutsceneAudio.playing()) return true;
      if (SB.UI && SB.UI.route && SB.UI.route() === 'night') return true;
      if (SB.Audio && SB.Audio.now && SB.Audio.now().kind) return true;
    } catch (e) { /* not ducked */ }
    return false;
  }
  function held() { return isPaused() || pref('music', 'on') === 'off' || level() === 0 || ducked(); }
  function target() { var v = musicVol(); return v <= 0 ? 0 : db(wantTitle ? TITLE_DB : DESK_DB) * level() * v; }

  /* the next song off the tape: a shuffled bag, refilled when it runs out, never the same song twice running */
  function nextTrack() {
    var l = tracks(), i, j, x;
    if (!l.length) return null;
    bag = bag.filter(function (n) { return n < l.length; });
    if (!bag.length) {
      for (i = 0; i < l.length; i++) bag.push(i);
      for (i = bag.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); x = bag[i]; bag[i] = bag[j]; bag[j] = x; }
      if (bag.length > 1 && l[bag[0]].file === lastFile) { x = bag[0]; bag[0] = bag[bag.length - 1]; bag[bag.length - 1] = x; }
    }
    x = l[bag.shift()];
    lastFile = x.file;
    return x;
  }

  /* ---------------------------------------------------------------- */
  /* the player                                                        */
  /* ---------------------------------------------------------------- */

  function element() {
    if (el || !W || typeof W.Audio !== 'function') return el;
    try {
      el = new W.Audio();
      el.preload = 'auto';
      el.addEventListener('ended', onEnded);
      el.addEventListener('error', onError);
      el.addEventListener('playing', function () { errors = 0; });
    } catch (e) { el = null; }
    return el;
  }

  /* the boombox: highpass, lowpass, the fader, a little of the desk's room. Only over http, and only once. */
  function graph() {
    var a, c;
    if (g || gTried || !el) return g;
    try { if (W.location && W.location.protocol === 'file:') { gTried = true; return null; } } catch (e) { /* try it */ }
    try { a = SB.Sfx && SB.Sfx.audio ? SB.Sfx.audio() : null; } catch (e2) { a = null; }
    if (!a || !a.ctx || !a.ctx.createMediaElementSource) return null;
    gTried = true;
    try {
      c = a.ctx;
      g = { ctx: c };
      g.src = c.createMediaElementSource(el);
      g.hp = c.createBiquadFilter(); g.hp.type = 'highpass'; g.hp.Q.value = 0.5;
      g.lp = c.createBiquadFilter(); g.lp.type = 'lowpass'; g.lp.Q.value = 0.5;
      g.out = c.createGain(); g.out.gain.value = 0;
      g.send = c.createGain(); g.send.gain.value = 0;
      g.src.connect(g.hp); g.hp.connect(g.lp); g.lp.connect(g.out); g.out.connect(c.destination);   // past the sfx compressor: music does not pump
      g.out.connect(g.send); if (a.verb) g.send.connect(a.verb);
      el.volume = 1; vol = 0;
    } catch (e3) { g = null; warn('no boombox: ' + (e3 && e3.message)); }
    return g;
  }
  function colour(mode) {
    var p = mode === 'desk' ? BOX : CLEAN, t;
    if (!g) return;
    try { t = g.ctx.currentTime; g.hp.frequency.setTargetAtTime(p.hp, t, 0.05); g.lp.frequency.setTargetAtTime(p.lp, t, 0.05); g.send.gain.setTargetAtTime(p.send, t, 0.05); } catch (e) { /* fine */ }
  }
  function wake() { try { if (SB.Sfx && SB.Sfx.audio) SB.Sfx.audio(); } catch (e) { /* the next press */ } }

  /* the fader to `to` over `secs`, then then() unless another move started meanwhile */
  function ramp(to, secs, then) {
    var my = ++rampTok, t, step;
    if (rampT) { clearTimeout(rampT); clearInterval(rampT); rampT = null; }
    secs = Math.max(0.03, secs || 0.03);
    if (g) {
      try {
        t = g.ctx.currentTime;
        g.out.gain.cancelScheduledValues(t); g.out.gain.setValueAtTime(g.out.gain.value, t); g.out.gain.linearRampToValueAtTime(to, t + secs);
      } catch (e) { try { g.out.gain.value = to; } catch (e2) { /* fine */ } }
      vol = to;
      rampT = setTimeout(function () { rampT = null; if (my === rampTok && then) then(); }, secs * 1000 + 30);
      return;
    }
    step = Math.max(0.002, Math.abs(to - vol) / (secs / 0.05));
    rampT = setInterval(function () {
      vol = to > vol ? Math.min(to, vol + step) : Math.max(to, vol - step);
      try { el.volume = Math.max(0, Math.min(1, vol)); } catch (e) { /* fine */ }
      if (vol === to) { clearInterval(rampT); rampT = null; if (my === rampTok && then) then(); }
    }, 50);
  }

  function load(meta, mode) {
    st.track = meta || null;
    if (!meta) return;
    try {
      el.loop = false;
      void mode;
      el.src = BASE + (data().base || 'assets/mixtape/') + meta.file;
    } catch (e) { warn('load: ' + (e && e.message)); }
  }

  function resume(fade) {
    var p;
    wake(); graph(); colour(st.mode);
    st.on = true;
    try {
      p = el.play();
      if (p && p.catch) p.catch(function (e) {
        st.on = false;
        if (e && e.name === 'NotAllowedError') gestured = false;        // no press yet: the next one starts it
      });
    } catch (e2) { st.on = false; return; }
    ramp(target(), fade);
    tell();
  }
  function pause(fade) {
    st.on = false;
    ramp(0, fade, function () { try { el.pause(); } catch (e) { /* fine */ } });
    tell();
  }

  /* fade what is playing, then put the other thing (or nothing) in the player */
  function switchTo(want) {
    var from = st.mode;
    if (gapT) { clearTimeout(gapT); gapT = null; }
    switching = true;
    if (from === 'title') titleDone = true;            // heard (or left): the menu does not start it over this visit
    st.mode = want;
    function go() {
      switching = false; st.on = false;
      try { el.pause(); } catch (e) { /* fine */ }
      if (!want) { st.track = null; tell(); return; }
      load(want === 'title' ? titleSong() : forward(), want);
      tell();
      sync();
    }
    if (st.on) ramp(0, from === 'title' && want === 'desk' ? FADE_X : FADE_DUCK, go); else go();
  }

  /* songs gone back past wait in fwd; the next song is one of those first, else a new one off the bag */
  function forward() { return fwd.length ? fwd.pop() : nextTrack(); }

  /* put another song in: `meta` given (going back), else the next one, the current one kept for going back */
  function advance(fade, meta) {
    if (gapT) { clearTimeout(gapT); gapT = null; }
    if (st.mode !== 'desk' || !element()) return;
    if (!meta) { if (st.track) { hist.push(st.track); if (hist.length > 40) hist.shift(); } meta = forward(); }
    function go() {
      st.on = false;
      try { el.pause(); } catch (e) { /* fine */ }
      load(meta, 'desk');
      tell();
      sync();
    }
    if (st.on && fade) { switching = true; ramp(0, fade, function () { switching = false; go(); }); } else go();
  }

  function onEnded() {
    if (st.mode === 'title') { titleDone = true; st.on = false; sync(); return; }   // the title song once, then the tape
    if (st.mode !== 'desk') return;
    st.on = false;
    if (gapT) clearTimeout(gapT);
    gapT = setTimeout(function () { gapT = null; advance(0); }, GAP_MS);
  }
  /* a file that is not there: the next song; when none of them are, the tape is simply not there */
  function onError() {
    var m = st.mode;
    st.on = false;
    if (m === 'title') { dead.title = true; warn('the title song did not load'); sync(); return; }
    if (m !== 'desk') return;
    errors++;
    if (errors >= tracks().length) { dead.desk = true; warn('no mixtape file loaded'); sync(); return; }
    if (gapT) clearTimeout(gapT);
    gapT = setTimeout(function () { gapT = null; advance(0); }, 400);
  }

  /* bring the player in line with what is wanted */
  function sync() {
    var want, hold, to;
    try {
      want = wanted();
      if (!gestured || !element()) return;
      if (want !== st.mode) { switchTo(want); return; }
      if (!st.mode || switching || !st.track) return;
      hold = held();
      if (hold && st.on) pause(FADE_DUCK);
      else if (!hold && !st.on && !gapT) { resume(st.mode === 'title' && !heard ? FADE_TITLE : FADE_IN); heard = true; }
      else if (st.on && !rampT) { to = target(); if (Math.abs(to - vol) > 0.002) ramp(to, 0.2); }
    } catch (e) { warn('sync: ' + (e && e.message)); }
  }

  /* no game on screen is the menu; a game on screen is the desk */
  function auto() {
    var r = null, game = null;
    try { r = SB.UI && SB.UI.route ? SB.UI.route() : null; game = SB.UI && SB.UI.game ? SB.UI.game() : null; } catch (e) { r = null; }
    if (r === null) return;
    wantTitle = !game; wantDesk = !!game;
  }

  /* ---------------------------------------------------------------- */
  /* the calls                                                         */
  /* ---------------------------------------------------------------- */

  function cue(name) {
    try { if (SB.Sfx) SB.Sfx.play(name, { el: D && D.querySelector ? D.querySelector('.mb-tape') : null, gap: 150 }); } catch (e) { /* fine */ }
  }
  function title(on) { wantTitle = !!on; if (on) wantDesk = false; sync(); }
  function desk(on) { wantDesk = !!on; if (on) wantTitle = false; sync(); }
  /* pausing holds the song where it is (remembered across screens and reloads in the 'tape' pref) */
  function setPaused(p) {
    gestured = true;
    p = !!p;
    if (!p && pref('music', 'on') === 'off') setPref('music', 'on');   // pressing play is asking for music
    if (p === isPaused()) { sync(); tell(); return; }
    paused = p;
    setPref('tape', p ? 'off' : 'on');
    cue(p ? 'tapeStop' : 'tapePlay');
    sync(); tell();
  }
  function playPause() { setPaused(!(isPaused() || pref('music', 'on') === 'off')); }
  function next() {
    gestured = true;
    if (isPaused() || pref('music', 'on') === 'off') { paused = false; setPref('tape', 'on'); setPref('music', 'on'); }
    cue('tapeNext');
    if (st.mode === 'title' || !st.mode) { titleDone = true; sync(); tell(); return; }   // skip the title song: on to the tape
    advance(FADE_SKIP);
  }
  /* back: to the top of this song if it is a few seconds in, else the song before it */
  function prev() {
    var t = 0;
    gestured = true;
    if (isPaused() || pref('music', 'on') === 'off') { paused = false; setPref('tape', 'on'); setPref('music', 'on'); }
    cue('tapeNext');
    try { t = el ? el.currentTime : 0; } catch (e) { t = 0; }
    if (st.mode === 'desk' && t < 4 && hist.length) { if (st.track) fwd.push(st.track); advance(FADE_SKIP, hist.pop()); return; }
    try { if (el) el.currentTime = 0; } catch (e2) { /* fine */ }
    sync(); tell();
  }
  function stop() { setPaused(true); }
  /** the cassette pressed: play if paused, else the next song */
  function toggle() {
    if (!tracks().length || dead.desk) return false;
    if (isPaused() || pref('music', 'on') === 'off') { setPaused(false); return true; }
    next();
    return true;
  }
  function setVolume(v) {
    v = Math.max(0, Math.min(1, Number(v) || 0));
    setPref('musicVol', Math.round(v * 100) / 100);
    sync(); tell();
  }
  function now() {
    var t = st.track, c = null, k;
    if (t) { c = {}; for (k in t) if (Object.prototype.hasOwnProperty.call(t, k)) c[k] = t[k]; }
    return { mode: st.mode, track: c, playing: !!st.on, paused: isPaused() || pref('music', 'on') === 'off', volume: musicVol(),
             time: el ? el.currentTime || 0 : 0, canBack: st.mode === 'desk' && hist.length > 0 };
  }
  function watch(fn) {
    watchers.push(fn);
    return function () { var i = watchers.indexOf(fn); if (i >= 0) watchers.splice(i, 1); };
  }

  /* ---------------------------------------------------------------- */
  /* boot                                                              */
  /* ---------------------------------------------------------------- */
  function onGesture() { if (!gestured) { gestured = true; setTimeout(sync, 0); } }
  function boot() {
    if (!W || typeof W.Audio !== 'function') return;
    D.addEventListener('pointerdown', onGesture, true);
    D.addEventListener('keydown', onGesture, true);
    try { if (SB.Audio && SB.Audio.watch) SB.Audio.watch(function () { sync(); }); } catch (e) { /* the tick sees it */ }
    setInterval(function () { auto(); sync(); }, TICK_MS);
  }
  if (D && typeof D.addEventListener === 'function') {
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
  }

  SB.Music = { title: title, desk: desk, toggle: toggle, next: next, prev: prev, stop: stop, now: now, watch: watch,
               playPause: playPause, setPaused: setPaused, setVolume: setVolume,
               /** ducked(): a cutscene, the show night or a band's loop has the room (the music bar steps aside) */
               ducked: ducked,
               /** has(): there is a mixtape to play (the cassette is on the desk only then) */
               has: function () { return tracks().length > 0 && !dead.desk; },
               /** on(): the 'music' preference, 'on' unless switched off */
               on: function () { return pref('music', 'on') === 'on'; } };
})(SB);
