/* Scene Booker — js/audio/sfx.js
 * SB.Sfx: the game's sound effects. No music (that is js/audio/music.js): only the things on the desk and at the door
 * making the noise they make.
 * (Cutscenes have their own score, beds and 'cs.*' cues: js/audio/cutscene-audio.js, which borrows this file's
 * AudioContext through SB.Sfx.audio() and its pools through the CUES table.)
 * The clips are real recordings (Kenney, CC0) plus a few synthesized from how the thing physically sounds (a paper tear,
 * a pen, a phone buzzing on wood, keypad beeps, cassette hiss); all built by tools/sfx/build_sfx.py into
 * assets/sfx/sfx-data.js, which this file loads on its own after boot so it never holds up the page.
 *
 * Every cue is a few layers drawn from pools of takes, never the same take twice in a row, each nudged in pitch and
 * level, panned to where the thing sits on screen, through a small room. Loudness lives only in the CUES table below.
 *
 * How it hears the game, without the game knowing about it:
 *   - a press on any control (pointerdown, or a keyboard click): the label-strip tap, or the object's own sound
 *   - hovering a thing on the desk: the faintest brush of paper
 *   - the route on screen changing: picking a thing up off the desk, putting it down, the lamp going off for a show
 *   - the engine's verbs (booking, holding, writing, paying...): wrapped once at load, a cue when one succeeds,
 *     a dull knock when one is refused; after any verb, the phone buzzes if more people now need an answer
 *   - the show night's records (js/ui/screens/night.js calls SB.Sfx.night): the clicker, scraps landing, the cash
 *   - the tape deck: the 'sb-play' event, and a faint hiss while the week is playing
 * Preference: SB.UI.prefs 'sound' = 'full' | 'low' | 'off' (the folder close-up, how it looks).
 * Safe anywhere: with no AudioContext (Node, the smoke test) every call is a no-op.
 */
(function (SB) {
  'use strict';

  var W = typeof window !== 'undefined' ? window : null;
  var D = typeof document !== 'undefined' ? document : null;
  var AC = W && (W.AudioContext || W.webkitAudioContext);

  /* ---------------------------------------------------------------- */
  /* the cues: [pool, dB, delay ms, pitch jitter, base rate, reverb]   */
  /* ---------------------------------------------------------------- */
  var CUES = {
    tap:        [['tap', -15, 0, 0.06]],
    hover:      [['slide', -33, 0, 0.1, 1.2]],
    'hover.ui': [['slide', -30, 0, 0.12, 1.55]],
    nope:       [['wood', -17, 0, 0.03, 0.72], ['thudSoft', -26, 0, 0.04, 0.8]],
    switch:     [['switch', -13, 0, 0.04]],
    key:        [['key', -22, 0, 0.0]],
    flip:       [['flip', -15, 0, 0.07]],
    slide:      [['slide', -15, 0, 0.07]],
    place:      [['place', -16, 0, 0.07]],

    /* picking a thing up off the desk, and putting it back */
    'up.paper':    [['slide', -15, 0, 0.06]],
    'up.calendar': [['slide', -16, 0, 0.06, 0.95], ['flip', -21, 90, 0.06]],
    'up.phone':    [['plastic', -15, 0, 0.05, 1.1], ['slide', -27, 0, 0.06, 1.25]],
    'up.clipboard':[['slide', -17, 0, 0.06, 0.9], ['latch', -19, 70, 0.04, 0.9]],
    'up.notebook': [['bookOpen', -13, 0, 0.05], ['flip', -19, 110, 0.06]],
    'up.keys':     [['keys', -19, 0, 0.06, 1.15], ['coins', -25, 25, 0.05, 1.4], ['keys', -23, 120, 0.06, 1.3]],
    'up.tin':      [['leather', -15, 0, 0.05], ['coins', -25, 70, 0.05]],
    'up.book':     [['bookOpen', -17, 0, 0.05, 1.5]],
    'up.map':      [['fan', -15, 0, 0.05], ['flip', -19, 160, 0.05, 0.85]],
    'up.folder':   [['slide', -17, 0, 0.05, 0.85], ['bookOpen', -21, 60, 0.05, 0.9]],
    'up.mat':      [['slide', -15, 0, 0.05, 0.8]],
    'up.pile':     [['fan', -15, 0, 0.06]],
    'up.sheet':    [['slide', -15, 0, 0.06, 1.15]],
    'up.jacket':   [['cloth', -13, 0, 0.05], ['belt', -23, 90, 0.05]],
    'up.mug':      [['ceramic', -17, 0, 0.05]],
    'down.paper':    [['place', -16, 0, 0.07]],
    'down.phone':    [['plastic', -14, 0, 0.05, 0.95]],
    'down.notebook': [['bookClose', -13, 0, 0.05]],
    'down.keys':     [['keys', -18, 0, 0.06, 1.1], ['coins', -26, 15, 0.05, 1.3]],
    'down.tin':      [['leather', -16, 0, 0.05, 0.9]],
    'down.book':     [['bookClose', -17, 0, 0.05, 1.45]],
    'down.jacket':   [['cloth', -14, 0, 0.05, 0.9]],
    'down.folder':   [['bookClose', -18, 0, 0.05, 0.85], ['place', -24, 20, 0.05]],

    /* writing, stamping, tearing */
    write:      [['pen', -17, 0, 0.05]],
    tick:       [['tick', -16, 0, 0.06]],
    marker:     [['marker', -16, 0, 0.05]],
    strike:     [['marker', -13, 0, 0.05, 1.08]],
    erase:      [['erase', -17, 0, 0.05]],
    stamp:      [['thudSoft', -24, 0, 0.04, 1.1], ['thudHeavy', -11, 140, 0.04], ['wood', -22, 140, 0.04, 0.85], ['place', -30, 145, 0.05]],
    tear:       [['tear', -13, 0, 0.05]],
    rip:        [['rip', -12, 0, 0.04], ['place', -26, 700, 0.06]],
    pageTear:   [['tear', -13, 0, 0.04, 0.95], ['flip', -24, 380, 0.05]],
    glue:       [['place', -13, 0, 0.05, 0.9], ['cloth', -26, 30, 0.05, 1.35]],

    /* the phone */
    buzz:       [['buzz', -12, 0, 0.01]],
    send:       [['key', -22, 0, 0], ['key', -22, 120, 0], ['key', -22, 230, 0], ['plastic', -28, 330, 0.05, 1.2]],

    /* money */
    coins:      [['coins', -13, 0, 0.05]],
    cash:       [['leather', -17, 0, 0.05], ['coins', -13, 90, 0.05]],
    bills:      [['slide', -16, 0, 0.08, 1.2], ['slide', -18, 110, 0.08, 1.25], ['slide', -18, 210, 0.08, 1.15]],

    /* the tape deck and the lamp */
    tapePlay:   [['switch', -9, 0, 0.03, 0.78], ['thudSoft', -24, 8, 0.04, 0.7]],
    tapeStop:   [['switch', -11, 0, 0.03, 0.88], ['switch', -19, 85, 0.03, 1.1]],
    tapeNext:   [['switch', -12, 0, 0.03, 1.0]],
    lampOff:    [['coins', -32, 0, 0.05, 1.7], ['switch', -10, 40, 0.03, 0.82]],
    lampOn:     [['switch', -12, 0, 0.03, 0.9]],

    /* the show night */
    doorOpen:   [['doorOpen', -12, 0, 0.03, 1, 0.3], ['step', -25, 650, 0.06], ['step', -27, 980, 0.06]],
    doorClose:  [['doorClose', -14, 0, 0.03, 1, 0.3]],
    clicker:    [['tally', -13, 0, 0.05]],
    scrap:      [['place', -20, 0, 0.08, 1.2]],
    note:       [['slide', -13, 0, 0.06, 0.95]],
    step:       [['step', -28, 0, 0.08]],
    map:        [['fan', -13, 0, 0.05]],
    chips:      [['chips', -18, 0, 0.06]],

    /* cutscenes only (js/audio/cutscene-audio.js): the paper being handled, and the moment in the picture.
     * The cs_* pools come from assets/cutscene/cs-sfx-data.js; a pool that is not there plays nothing. */
    'cs.xerox':    [['cs_xerox', -20, 0, 0.02, 1, 0.08]],
    'cs.slap':     [['cs_slap', -15, 0, 0.07]],
    'cs.turn':     [['cs_turn', -14, 0, 0.05]],
    'cs.shutter':  [['cs_shutter', -15, 0, 0.03]],
    'cs.pan':      [['slide', -23, 0, 0.07, 0.85]],
    'cs.mailslot': [['cs_mailslot', -14, 0, 0.04]],
    'cs.photo':    [['cs_shutter', -16, 0, 0.03], ['place', -18, 480, 0.07]],
    'cs.note':     [['cs_tape', -15, 0, 0.05]],
    'cs.text':     [['buzz', -14, 0, 0.01]],
    'cs.cassette': [['cs_cassette', -14, 0, 0.04]],
    'cs.flyer':    [['cs_staple', -14, 0, 0.04]],
    'cs.close':    [['flip', -17, 0, 0.07, 0.9]],
    'cs.peel':     [['cs_tape', -17, 0, 0.05, 1.1]],
    'cs.knock':    [['cs_knock', -12, 0, 0.03, 1, 0.3]],
    'cs.doorSlam': [['cs_doorSlam', -14, 0, 0.03, 1, 0.3]],
    'cs.bottle':   [['cs_bottle', -15, 0, 0.04, 1, 0.25]],
    'cs.roar':     [['cs_roar', -14, 0, 0.02, 1, 0.2]],
    'cs.cheer':    [['cs_cheer', -16, 0, 0.03, 1, 0.2]],
    'cs.chirp':    [['cs_chirp', -17, 0, 0.01, 1, 0.3]],
    'cs.vanDoor':  [['cs_vanDoor', -13, 0, 0.03, 1, 0.25]],
    'cs.chairs':   [['cs_chairs', -15, 0, 0.04, 1, 0.3]],
    'cs.staple':   [['cs_staple', -14, 0, 0.04]],
    'cs.tape':     [['cs_tape', -15, 0, 0.05]],
    'cs.feedback': [['cs_feedback', -20, 0, 0.02, 1, 0.25]],
    'cs.thunder':  [['cs_thunder', -13, 0, 0.03, 1, 0.3]],
    'cs.buzz':     [['buzz', -15, 0, 0.01]],
    'cs.coins':    [['coins', -15, 0, 0.05]]
  };

  /* the close-up each route is held in (js/desk/closeup.js FRAME), as a sound family */
  var ROUTE = { week: 'calendar', close: 'calendar', inbox: 'phone', shows: 'clipboard', show: 'clipboard', bill: 'clipboard',
                bands: 'sheet', band: 'sheet', rooms: 'keys', room: 'keys', notebook: 'notebook', money: 'tin', people: 'book',
                town: 'map', legacy: 'pile', settings: 'folder', flyerdesk: 'mat', jacket: 'jacket' };
  /* a thing on the desk (js/desk/scene.js ids) to its family */
  var OBJ = { calendar: 'calendar', flyers: 'pile', map: 'map', keys: 'keys', phone: 'phone', paper: 'mat', clips: 'clipboard',
              clip: 'clipboard', stickers: 'sheet', notebook: 'notebook', tin: 'tin', mug: 'mug', book: 'book', drawer: 'folder',
              jacket: 'jacket' };
  var DOWN = { phone: 'down.phone', notebook: 'down.notebook', keys: 'down.keys', tin: 'down.tin', book: 'down.book',
               jacket: 'down.jacket', folder: 'down.folder' };

  /* the engine's verbs: a cue when one goes through (a function gets the args and the result and returns a cue or null) */
  var VERBS = {
    'Mail.ask': 'send', 'Mail.reply': 'send', 'Mail.chase': 'send', 'Mail.withdraw': 'down.phone', 'Mail.setNeedBy': 'write',
    'Shows.create': 'stamp', 'Shows.setBill': 'slide', 'Shows.dropBand': 'strike', 'Shows.cancel': 'rip',
    'Shows.setDoor': 'write', 'Shows.setCrew': 'write', 'Shows.setLabel': 'write', 'Shows.setInsurance': 'write', 'Shows.setBilling': 'write',
    'Week.plan': 'write', 'Week.addJob': 'write', 'Week.decide': 'tick', 'Week.unplan': 'erase', 'Week.removeJob': 'erase',
    'Week.close': 'pageTear', 'Week.nextWeek': 'flip', 'Week.payBills': 'cash', 'Week.setDayJob': 'write', 'Week.dropShift': 'erase',
    'Week.phoneOff': 'down.phone',
    'Rooms.release': 'down.keys', 'Rooms.challenge': 'write',
    'Money.move': 'cash',
    'Jobs.setFlyer': 'glue', 'Jobs.promise': 'write',
    'Harm.add': 'marker', 'Harm.remove': 'erase', 'Harm.act': 'marker',
    'Territory.startTour': 'map',
    'Legacy.end': 'down.notebook', 'Legacy.answerOffer': 'stamp',
    'Flyer.learn': 'write', 'Notebook.seeTerm': 'flip',
    'Night.begin': 'doorOpen', 'Night.next': null, 'Night.auto': null, 'Night.settle': 'cash',
    'Game.setSetting': 'tap'
  };

  /* ---------------------------------------------------------------- */
  /* the engine                                                        */
  /* ---------------------------------------------------------------- */
  var ctx = null, master = null, verb = null, bus = null, buffers = {}, pools = {}, last = {}, lastAt = {}, voices = 0;
  var loading = false, ready = false, hissSrc = null, hissGain = null;
  var BASE = (W && W.SB_ASSET_BASE) || '';             // a page in a subfolder (design/sample) sets this to '../../'
  var MAX_VOICES = 28;
  var LEVEL = { full: 1, low: 0.4, off: 0 };

  function pref() {
    try { var v = SB.UI && SB.UI.prefs ? SB.UI.prefs.get('sound') : 'full'; return LEVEL[v] === undefined ? 'full' : v; } catch (e) { return 'full'; }
  }
  function now() { return (W && W.performance && W.performance.now) ? W.performance.now() : Date.now(); }
  function db(x) { return Math.pow(10, x / 20); }

  /** a small, dark room: two channels of decaying noise, the highs dying first */
  function roomIR(c) {
    var len = Math.floor(c.sampleRate * 0.55), ir = c.createBuffer(2, len, c.sampleRate), ch, d, i, t, lpState, a;
    for (ch = 0; ch < 2; ch++) {
      d = ir.getChannelData(ch); lpState = 0;
      for (i = 0; i < len; i++) {
        t = i / c.sampleRate;
        a = 0.25 + 0.7 * Math.min(1, t / 0.25);          // the highs go first
        lpState += (Math.random() * 2 - 1 - lpState) * (1 - a * 0.9);
        d[i] = lpState * Math.exp(-t / 0.11) * (t < 0.006 ? t / 0.006 : 1);
      }
    }
    return ir;
  }

  function build() {
    if (ctx || !AC) return !!ctx;
    try {
      ctx = new AC({ latencyHint: 'interactive' });
      master = ctx.createGain();
      var comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10; comp.knee.value = 6; comp.ratio.value = 4; comp.attack.value = 0.002; comp.release.value = 0.12;
      master.connect(comp); comp.connect(ctx.destination);
      bus = ctx.createGain(); bus.connect(master);
      verb = ctx.createConvolver(); verb.buffer = roomIR(ctx);
      var wet = ctx.createGain(); wet.gain.value = 1; verb.connect(wet); wet.connect(master);
      setLevel();
    } catch (e) { ctx = null; }
    return !!ctx;
  }
  /* the level: the sound preference (full, low, off) times the quick menu's sound fader (pref 'sfxVol', 0 to 1) */
  function faderVol() { var v = NaN; try { v = Number(SB.UI && SB.UI.prefs ? SB.UI.prefs.get('sfxVol') : NaN); } catch (e) { v = NaN; } return v >= 0 && v <= 1 ? v : 1; }
  function setLevel() { if (master) master.gain.value = 0.9 * LEVEL[pref()] * faderVol(); }

  function b64ToBuf(s) {
    var bin = W.atob(s), n = bin.length, u = new Uint8Array(n), i;
    for (i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  function decodeAll(data, after) {
    var keys = Object.keys(data.clips || {}), left = keys.length;
    if (!left) { if (after) after(); return; }
    keys.forEach(function (k) {
      var done = function (buf) {
        if (buf) {
          buffers[k] = buf;
          var p = k.slice(0, k.lastIndexOf('.'));
          (pools[p] = pools[p] || []).push(k);
        }
        if (--left === 0 && after) after();
      };
      try {
        var pr = ctx.decodeAudioData(b64ToBuf(data.clips[k]), done, function () { done(null); });
        if (pr && pr.catch) pr.catch(function () { /* the callback already ran */ });
      } catch (e) { done(null); }
    });
  }
  function load() {
    if (loading || !D || !build()) return;
    loading = true;
    var main = function () { decodeAll(W.SB_SFX_DATA, function () { ready = true; W.SB_SFX_DATA = null; }); loadCs(); };
    if (W.SB_SFX_DATA) { main(); return; }
    var s = D.createElement('script');
    s.src = BASE + 'assets/sfx/sfx-data.js';
    s.async = true;
    s.onload = function () { if (W.SB_SFX_DATA) main(); };
    s.onerror = function () { SB.log && SB.log('warn', 'SB.Sfx', 'assets/sfx/sfx-data.js did not load: no sound'); };
    D.head.appendChild(s);
  }
  /* the cutscenes' own clips, after the main ones: same format, same pools table; a missing file only warns */
  function loadCs() {
    var done = function () { if (W.SB_CS_SFX_DATA) decodeAll(W.SB_CS_SFX_DATA, function () { W.SB_CS_SFX_DATA = null; }); };
    if (W.SB_CS_SFX_DATA) { done(); return; }
    var s = D.createElement('script');
    s.src = BASE + 'assets/cutscene/cs-sfx-data.js';
    s.async = true;
    s.onload = done;
    s.onerror = function () { SB.log && SB.log('warn', 'SB.Sfx', 'assets/cutscene/cs-sfx-data.js did not load: cutscenes use the desk sounds'); };
    D.head.appendChild(s);
  }
  function wake() { if (ctx && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) { /* next gesture */ } } }

  /** one take from a pool, never the one played last */
  function take(pool) {
    var list = pools[pool], k, i;
    if (!list || !list.length) return null;
    if (list.length === 1) return list[0];
    do { i = Math.floor(Math.random() * list.length); k = list[i]; } while (k === last[pool]);
    last[pool] = k;
    return k;
  }

  function voice(key, gainDb, when, rate, pan, send) {
    var buf = buffers[key], src, g, p, s;
    if (!buf || voices >= MAX_VOICES) return;
    src = ctx.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate;
    g = ctx.createGain(); g.gain.value = db(gainDb);
    src.connect(g);
    if (ctx.createStereoPanner) { p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(bus); }
    else { p = null; g.connect(bus); }
    s = ctx.createGain(); s.gain.value = send; g.connect(s); s.connect(verb);
    voices++;
    src.onended = function () { voices--; try { src.disconnect(); g.disconnect(); s.disconnect(); if (p) p.disconnect(); } catch (e) { /* gone */ } };
    src.start(when);
  }

  /** play(cue, opts): opts.pan -1..1, opts.el (pans to the element), opts.gain dB, opts.delay ms, opts.gap (min ms since the same cue) */
  function play(name, o) {
    var cue = CUES[name], t, pan, gap;
    o = o || {};
    if (!cue || !ready || LEVEL[pref()] === 0) return false;
    t = now(); gap = o.gap === undefined ? 45 : o.gap;
    if (lastAt[name] && t - lastAt[name] < gap) return false;
    lastAt[name] = t;
    wake(); setLevel();
    pan = typeof o.pan === 'number' ? o.pan : panOf(o.el);
    var base = ctx.currentTime + 0.005 + (o.delay || 0) / 1000;
    cue.forEach(function (L) {
      var key = take(L[0]), j = L[3] || 0, rate = (L[4] || 1) * (1 + (Math.random() * 2 - 1) * j),
          g = L[1] + (o.gain || 0) + (Math.random() * 2 - 1) * 1.2;
      if (key) voice(key, g, base + L[2] / 1000, rate, Math.max(-1, Math.min(1, pan + (Math.random() - 0.5) * 0.08)), L[5] === undefined ? 0.16 : L[5]);
    });
    return true;
  }

  function panOf(el) {
    var r, w;
    if (!el || !el.getBoundingClientRect || !W) return 0;
    try { r = el.getBoundingClientRect(); w = W.innerWidth || 1; return Math.max(-0.6, Math.min(0.6, ((r.left + r.width / 2) / w * 2 - 1) * 0.6)); } catch (e) { return 0; }
  }

  /* ---------------------------------------------------------------- */
  /* listening to the page                                             */
  /* ---------------------------------------------------------------- */
  var pickedAt = 0, pickedPan = 0, routeNow = null, familyNow = null, pressAt = 0;

  function deskPan(id) {
    var el = D && D.querySelector('.dk-hit[data-obj="' + id + '"]');
    return panOf(el);
  }

  function onPress(e) {
    var el = e.target && e.target.closest ? e.target.closest('button, [role="button"], [role="tab"], [role="radio"], [role="checkbox"], a[href], summary, select, input[type="checkbox"], input[type="radio"]') : null, obj;
    wake();
    if (!el) return;
    if (el.disabled || el.getAttribute('aria-disabled') === 'true') { play('nope', { el: el, gap: 150 }); return; }
    if (el.classList.contains('dk-hit')) {
      obj = el.getAttribute('data-obj');
      if (obj === 'lamp') return;                                   // the tape deck speaks through 'sb-play'
      pickedAt = now(); pickedPan = panOf(el);
      play(OBJ[obj] ? 'up.' + OBJ[obj] : 'up.paper', { el: el });
      return;
    }
    if (el.closest('.mb')) return;                                  // the pocket player's keys are SB.Music's
    if (el.closest('.cu-down')) return;                             // the route change puts it down
    if (el.closest('.nt-tab')) { play('tear', { el: el }); return; }
    if (el.closest('.nt-counter')) { play('clicker', { el: el }); return; }
    if (el.closest('.nt-stampset')) { play('stamp', { el: el }); return; }
    if (el.closest('.ph-strip--btn') || familyNow === 'phone') { play('key', { el: el, gap: 30 }); return; }
    if (el.matches('[role="tab"]')) { play('flip', { el: el, gain: -4 }); return; }
    if (el.matches('[role="checkbox"], input[type="checkbox"]')) { play('tick', { el: el }); return; }
    play('tap', { el: el, gap: 30 });
  }

  function onRoute() {
    var r = null, fam, prev = routeNow, prevFam = familyNow;
    try { r = SB.UI.route ? SB.UI.route() : null; } catch (e) { r = null; }
    if (r === routeNow) return;
    routeNow = r;
    fam = ROUTE[r] || null;
    familyNow = fam;
    if (r === 'night') { play('lampOff'); return; }
    if (prev === 'night') { play('doorClose'); return; }
    if (prevFam && !fam) { play(DOWN[prevFam] || 'down.paper', { pan: pickedPan }); return; }
    if (fam && !prevFam) {
      if (now() - pickedAt > 450) play('up.' + fam);               // reached without a click on the desk (a key, a link)
      return;
    }
    if (fam && prevFam && fam !== prevFam) { play(DOWN[prevFam] || 'down.paper'); play('up.' + fam, { delay: 110 }); return; }
    if (fam && fam === prevFam) play(fam === 'notebook' || fam === 'calendar' ? 'flip' : 'slide', { gain: -3 });
  }

  var hoverObj = null, hoverCtl = null;
  function onOver(e) {
    var el = e.target && e.target.closest ? e.target.closest('.dk-hit') : null, id, ctl;
    if (e.pointerType && e.pointerType !== 'mouse') return;
    /* on a finished screen (.pz, the polish brief) every control has a hover sound too: a quick brush of paper */
    ctl = !el && e.target.closest ? e.target.closest('.pz button:not(:disabled), .pz [role="button"], .pz a[href]') : null;
    if (ctl !== hoverCtl) { hoverCtl = ctl; if (ctl) play('hover.ui', { el: ctl, gap: 70 }); }
    id = el ? el.getAttribute('data-obj') : null;
    if (id === hoverObj) return;
    hoverObj = id;
    if (el) play('hover', { el: el, gap: 110 });
  }

  /* the tape deck keys, and the hiss while the week plays */
  function onPlayCmd(e) {
    var c = e && e.detail && e.detail.cmd, el = D && D.querySelector('.dk-hit[data-obj="lamp"]');
    if (c === 'resume') play('tapePlay', { el: el, gap: 150 });
    else if (c === 'pause') play('tapeStop', { el: el, gap: 150 });
    else if (c === 'next') play('tapeNext', { el: el, gap: 150 });
  }
  function hissTick() {
    var on = false, want;
    try { on = !!(SB.UI.playing && SB.UI.playing()) && routeNow !== 'night' && !(SB.Cutscene && SB.Cutscene.playing()); } catch (e) { on = false; }
    if (!ready || !buffers['hiss.0']) return;
    if (on && !hissSrc && ctx.state === 'running') {
      hissSrc = ctx.createBufferSource(); hissSrc.buffer = buffers['hiss.0']; hissSrc.loop = true;
      hissGain = ctx.createGain(); hissGain.gain.value = 0;
      hissSrc.connect(hissGain); hissGain.connect(bus); hissSrc.start();
    }
    if (hissGain) {
      want = on ? db(-41) : 0;
      hissGain.gain.setTargetAtTime(want, ctx.currentTime, on ? 0.25 : 0.12);
      if (!on && hissSrc) {
        var s = hissSrc, g = hissGain; hissSrc = null; hissGain = null;
        setTimeout(function () { try { s.stop(); s.disconnect(); g.disconnect(); } catch (e) { /* gone */ } }, 900);
      }
    }
  }

  /* ---------------------------------------------------------------- */
  /* the engine's verbs                                                */
  /* ---------------------------------------------------------------- */
  var depth = 0, lastNeeds = null;

  function needsNow() {
    try { var s = SB.UI.game && SB.UI.game(); return s && SB.Mail && SB.Mail.needsYou ? SB.Mail.needsYou(s).length : null; } catch (e) { return null; }
  }
  function afterVerb(name, args, r) {
    var cue = VERBS[name], n;
    if (r && r.ok === false) { if (Object.prototype.hasOwnProperty.call(VERBS, name)) play('nope', { gap: 150 }); }
    else if (cue) play(cue);
    n = needsNow();
    if (n !== null && lastNeeds !== null && n > lastNeeds && name !== 'Mail.reply' && name !== 'Mail.markRead') {
      play('buzz', { pan: deskPan('phone'), delay: cue ? 260 : 0, gap: 900 });
    }
    if (n !== null) lastNeeds = n;
  }
  function wrapVerbs() {
    var all = Object.keys(VERBS).concat(['Week.step', 'Week.startPlay', 'Week.check', 'Mail.markRead']);
    all.forEach(function (full) {
      var m = full.split('.'), mod = SB[m[0]], fn = mod && mod[m[1]];
      if (typeof fn !== 'function' || fn.__sfx) return;
      var wrapped = function () {
        var r;
        depth++;
        try { r = fn.apply(this, arguments); }
        finally { depth--; }
        if (depth === 0) { try { afterVerb(full, arguments, r); } catch (e) { /* sound never breaks the game */ } }
        return r;
      };
      wrapped.__sfx = true;
      mod[m[1]] = wrapped;
    });
    /* a toast that says no (the act refused) is already the knock; 'learned' is a note in the book */
    if (SB.UI && typeof SB.UI.toast === 'function' && !SB.UI.toast.__sfx) {
      var t0 = SB.UI.toast;
      SB.UI.toast = function (text, kind) {
        try { if (kind === 'no') play('nope', { gap: 250 }); else if (kind === 'learned') play('write', { gain: -3 }); } catch (e) { /* fine */ }
        return t0.apply(this, arguments);
      };
      SB.UI.toast.__sfx = true;
    }
  }

  /* ---------------------------------------------------------------- */
  /* the show night: js/ui/screens/night.js calls this for each record */
  /* ---------------------------------------------------------------- */
  var clickQ = 0, clickT = null;
  function clicks(n, el) {
    clickQ = Math.min(clickQ + n, 5);
    if (clickT) return;
    (function go() {
      if (clickQ <= 0) { clickT = null; return; }
      clickQ--;
      play('clicker', { el: el, gap: 0 });
      if (Math.random() < 0.35) play('step', { el: el, delay: 40, gap: 0 });
      clickT = setTimeout(go, 120 + Math.random() * 70);
    })();
  }
  function night(r, delta) {
    if (!r || !ctx) return;
    var counter = D && D.querySelector('.nt-counter');
    if (r.t === 'ARRIVALS' && delta > 0) clicks(delta, counter);
    else if (r.t === 'POST') play('scrap', { pan: 0.35, gap: 120 });
    else if (r.t === 'SET_START' || r.t === 'SET_END') play('tick', { el: D && D.querySelector('.nt-setlist'), gap: 120 });
    else if (r.t === 'SETTLE_LINE') play(Math.random() < 0.5 ? 'bills' : 'chips', { el: D && D.querySelector('.nt-cash'), gap: 160 });
    else if (r.t === 'SETTLE_DONE') play('cash', { gap: 200 });
    else if (r.t === 'STAGE') play('note', { gap: 200 });
  }
  /** a decision note slid onto the surface */
  function noteIn() { play('note', { gap: 300 }); }

  /* ---------------------------------------------------------------- */
  /* boot                                                              */
  /* ---------------------------------------------------------------- */
  function boot() {
    if (!D || !AC) return;
    load();
    wrapVerbs();
    lastNeeds = needsNow();
    D.addEventListener('pointerdown', onPress, true);
    D.addEventListener('click', function (e) { if (e.detail === 0) onPress(e); }, true);   // a keyboard click
    D.addEventListener('keydown', wake, true);
    D.addEventListener('pointerover', onOver, true);
    D.addEventListener('sb-play', onPlayCmd);
    var main = D.getElementById('main');
    if (main && W.MutationObserver) new W.MutationObserver(onRoute).observe(main, { attributes: true, attributeFilter: ['class'] });
    setInterval(hissTick, 400);
  }
  if (D && typeof D.addEventListener === 'function') {
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', boot); else boot();
  }

  /** has(cue): the cue exists and its first layer has a take to play (a cs_* pool may not have been built) */
  function has(name) { var c = CUES[name]; return !!(c && ready && pools[c[0][0]] && pools[c[0][0]].length); }
  /** audio(): the one AudioContext and where to plug in, for js/audio/cutscene-audio.js: { ctx, master, bus, verb } or null */
  function audio() { if (!D || !build()) return null; wake(); return { ctx: ctx, master: master, bus: bus, verb: verb }; }
  /** level(): 1, 0.4 or 0 from the 'sound' preference (and the master follows it) */
  function level() { setLevel(); return LEVEL[pref()] * faderVol(); }

  SB.Sfx = { play: play, night: night, noteIn: noteIn, ready: function () { return ready; }, cues: function () { return Object.keys(CUES); },
             has: has, audio: audio, level: level };
})(SB);
