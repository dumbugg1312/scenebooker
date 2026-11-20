/* Scene Booker — js/ui/pause.js
 * SB.Pause: the quick menu (polish brief job 8). Escape (when nothing is held up close and no card is open) or the
 * pocket player's MENU key opens it; Escape or "back to it" puts it away. While it is up, a week that was playing is
 * paused, and it plays on when the menu goes. It holds what you reach for mid-game: music and sound volume on drawn
 * faders, full screen, text size, motion, and save and quit to the title. The game's rules and the saves stay in the
 * settings folder on the desk (js/ui/screens/settings.js).
 * Preferences go through SB.UI.prefs (textScale, motion, sfxVol, sound) and SB.Music.setVolume (musicVol).
 */
(function (SB) {
  'use strict';

  SB.Content.ui.pause = {
    label: 'Paused: options', title: 'PAUSED', resume: 'back to it',
    music: 'music', sound: 'sound', full: 'full screen', text: 'text size', motion: 'motion',
    texts: { s100: 'normal', s115: 'bigger', s130: 'big', s150: 'biggest' },
    motions: { auto: 'like the computer', reduce: 'reduced', full: 'full' },
    quit: 'save and quit to the title', percent: '{n} percent'
  };

  var D = typeof document !== 'undefined' && document && document.createElement ? document : null;
  var closeFn = null, wasPlaying = false;

  function L(k, c) { try { return SB.text.label('ui.pause.' + k, c); } catch (e) { return k; } }
  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function P() { return SB.UI.prefs; }
  function sfx(cue, o) { try { if (SB.Sfx && SB.Sfx.play) SB.Sfx.play(cue, o || {}); } catch (e) { /* fine */ } }

  /* a drawn fader: a pencil line, the level in toner, a knob of black tape. Arrows, Page keys, Home/End, or drag. */
  function fader(label, value, onSet) {
    var v = Math.max(0, Math.min(1, value)), el, knob, fill, drag = false;
    function show() {
      el.style.setProperty('--v', String(v));
      el.setAttribute('aria-valuenow', String(Math.round(v * 100)));
      el.setAttribute('aria-valuetext', L('percent', { n: Math.round(v * 100) }));
    }
    function set(nv, quiet) {
      nv = Math.max(0, Math.min(1, Math.round(nv * 20) / 20));
      if (nv === v) return;
      v = nv; show(); onSet(v);
      if (!quiet) sfx('tick', { gain: -10, el: el, gap: 60 });
    }
    function fromX(x) { var r = el.getBoundingClientRect(); return r.width ? (x - r.left) / r.width : v; }
    fill = h('span', { class: 'pm-fill', aria: { hidden: 'true' } });
    knob = h('span', { class: 'pm-knob', aria: { hidden: 'true' } });
    el = h('div', { class: 'pm-fader pz-hl', role: 'slider', tabindex: '0', aria: { label: label, valuemin: '0', valuemax: '100' },
      on: {
        keydown: function (e) {
          var k = e.key, step = { ArrowRight: 0.05, ArrowUp: 0.05, ArrowLeft: -0.05, ArrowDown: -0.05, PageUp: 0.25, PageDown: -0.25 }[k];
          if (step) { e.preventDefault(); set(v + step); } else if (k === 'Home') { e.preventDefault(); set(0); } else if (k === 'End') { e.preventDefault(); set(1); }
        },
        pointerdown: function (e) { drag = true; try { el.setPointerCapture(e.pointerId); } catch (x) { /* fine */ } set(fromX(e.clientX)); e.preventDefault(); },
        pointermove: function (e) { if (drag) set(fromX(e.clientX), true); },
        pointerup: function () { if (drag) sfx('tick', { gain: -10, el: el }); drag = false; },
        pointercancel: function () { drag = false; }
      } }, [h('span', { class: 'pm-track', aria: { hidden: 'true' } }), fill, knob]);
    show();
    return el;
  }

  /* typed words to pick one of, the one you are on a strip of black tape (the phone's filters) */
  function choices(label, now, list, onPick) {
    var box = h('div', { class: 'pm-choices', role: 'radiogroup', aria: { label: label } });
    function draw(cur) {
      SB.UI.clear(box);
      list.forEach(function (c) {
        var on = String(c[0]) === String(cur);
        box.appendChild(h('button', { type: 'button', class: 'pm-choice pz-hl' + (on ? ' is-on' : ''), role: 'radio', aria: { checked: on ? 'true' : 'false' },
          on: { click: function () { onPick(c[0]); draw(c[0]); } } }, c[1]));
      });
    }
    draw(now);
    return box;
  }

  function fullNow() { return !!(D && (D.fullscreenElement || D.webkitFullscreenElement)); }
  function setFull(on) {
    var de = D && D.documentElement;
    try {
      if (on && de) (de.requestFullscreen || de.webkitRequestFullscreen).call(de);
      else if (!on && D) (D.exitFullscreen || D.webkitExitFullscreen).call(D);
    } catch (e) { /* the browser said no */ }
  }
  function tick(label, on, onFlip) {
    var b = h('button', { type: 'button', class: 'pm-tick pz-hl' + (on ? ' is-on' : ''), role: 'checkbox', aria: { checked: on ? 'true' : 'false', label: label },
      on: { click: function () { onFlip(!(b.getAttribute('aria-checked') === 'true')); } } }, [h('span', { class: 'pm-box', aria: { hidden: 'true' } })]);
    b.mark = function (v) { b.classList.toggle('is-on', !!v); b.setAttribute('aria-checked', v ? 'true' : 'false'); };
    return b;
  }

  function row(label, ctl) { return h('div', { class: 'pm-row' }, [h('span', { class: 'pm-label', text: label }), ctl]); }

  function open() {
    var p = P(), m = SB.Music && SB.Music.now ? SB.Music.now() : null, sv = Number(p.get('sfxVol')), hero, full, onFs, content, game = SB.UI.game && SB.UI.game();
    if (closeFn || !D || !SB.UI.card) return;
    if (!(sv >= 0 && sv <= 1)) sv = p.get('sound') === 'off' ? 0 : (p.get('sound') === 'low' ? 0.4 : 1);
    wasPlaying = !!(SB.UI.playing && SB.UI.playing());
    if (wasPlaying) SB.UI.fire('sb-play', { cmd: 'pause' });
    hero = h('h2', { class: 'pm-hero', text: L('title') });
    full = tick(L('full'), fullNow(), function (v) { setFull(v); });
    onFs = function () { full.mark(fullNow()); };
    D.addEventListener('fullscreenchange', onFs);
    content = h('div', { class: 'pm' }, [
      hero,
      h('button', { type: 'button', class: 'pm-resume pz-hl', data: { fk: 'pm-resume' }, on: { click: function () { close(); } } }, L('resume')),
      h('div', { class: 'pm-rows' }, [
        row(L('music'), fader(L('music'), m && typeof m.volume === 'number' ? m.volume : 0.8, function (v) { if (SB.Music && SB.Music.setVolume) SB.Music.setVolume(v); })),
        row(L('sound'), fader(L('sound'), sv, function (v) {
          p.set('sfxVol', v); p.set('sound', v > 0 ? 'full' : 'off');
          if (SB.Sfx && SB.Sfx.level) SB.Sfx.level();
        })),
        row(L('full'), full),
        row(L('text'), choices(L('text'), String(Number(p.get('textScale')) || 1), [[1, 's100'], [1.15, 's115'], [1.3, 's130'], [1.5, 's150']].map(function (k) { return [String(k[0]), L('texts.' + k[1])]; }),
          function (k) { p.set('textScale', Number(k)); })),
        row(L('motion'), choices(L('motion'), p.get('motion') === 'reduce' || p.get('motion') === 'full' ? p.get('motion') : 'auto',
          ['auto', 'reduce', 'full'].map(function (k) { return [k, L('motions.' + k)]; }), function (k) { p.set('motion', k); }))
      ]),
      game && SB.UI.quit ? h('button', { type: 'button', class: 'pm-quit pz-hl', on: { click: function () { close(true); SB.UI.quit(); } } }, L('quit')) : null
    ]);
    closeFn = SB.UI.card(content, { label: L('label'), onClose: function () {
      D.removeEventListener('fullscreenchange', onFs);
      closeFn = null;
      if (wasPlaying && SB.UI.game && SB.UI.game()) SB.UI.fire('sb-play', { cmd: 'resume' });
      wasPlaying = false;
    } });
    if (SB.Finish && SB.Finish.move) SB.Finish.move(hero, 'stamp', { delay: 120, cue: 'stamp', cueAt: 83, cueOpts: { gain: -8 } });
    try { content.querySelector('.pm-resume').focus({ preventScroll: true }); } catch (e) { /* fine */ }
  }
  function close(quitting) {
    if (quitting) wasPlaying = false;
    if (closeFn) closeFn();
  }

  SB.Pause = { open: open, close: close, toggle: function () { if (closeFn) close(); else open(); }, isOpen: function () { return !!closeFn; } };
})(SB);
