/* Scene Booker: art/lettering.js
 * SB.Lettering: the hands a booker's name can be lettered in on every flyer they make (user 2026-11-24: "there should be
 * a dropdown with alotta fonts"). Two kinds: the flyer's own hand-drawn letters (SB.Skeleton treatments and the
 * typewriter), and display fonts bundled in assets/fonts/flyer (licences in assets/fonts/LICENSES.md). A lettering is
 * kept as the mark's treatment (state.player.mark.treatment): a Skeleton id ('marker'), 'typewriter', or 'f:<slug>'.
 * The fonts load on demand through the FontFace API, so none of them costs anything until it is shown.
 */
(function () {
  'use strict';

  var DRAWN = [
    { id: 'marker', name: 'Marker' }, { id: 'block', name: 'Block letters' }, { id: 'stencil', name: 'Stencil' },
    { id: 'bubble', name: 'Bubble letters' }, { id: 'drip', name: 'Drippy' }, { id: 'nib', name: 'Pen nib' },
    { id: 'spike', name: 'Spiky' }, { id: 'tape', name: 'Tape letters' }, { id: 'typewriter', name: 'Typewriter' }
  ];
  /* [slug, the name shown, weight, cap height as a share of the em] */
  var FONTS = [
    ['permanent-marker', 'Permanent Marker', 400, 0.72], ['rock-salt', 'Rock Salt', 400, 0.62], ['gochi-hand', 'Gochi Hand', 400, 0.68],
    ['covered-by-your-grace', 'Covered By Your Grace', 400, 0.7], ['sedgwick-ave-display', 'Sedgwick Ave Display', 400, 0.7],
    ['black-ops-one', 'Black Ops One', 400, 0.7], ['stardos-stencil', 'Stardos Stencil', 700, 0.7], ['saira-stencil-one', 'Saira Stencil One', 400, 0.7],
    ['bungee', 'Bungee', 400, 0.72], ['bungee-shade', 'Bungee Shade', 400, 0.72], ['rubik-mono-one', 'Rubik Mono One', 400, 0.72],
    ['archivo-black', 'Archivo Black', 400, 0.72], ['bebas-neue', 'Bebas Neue', 400, 0.7], ['staatliches', 'Staatliches', 400, 0.7],
    ['oswald', 'Oswald', 700, 0.74], ['londrina-solid', 'Londrina Solid', 900, 0.7], ['bangers', 'Bangers', 400, 0.72],
    ['alfa-slab-one', 'Alfa Slab One', 400, 0.7], ['ultra', 'Ultra', 400, 0.72], ['rye', 'Rye', 400, 0.7], ['abril-fatface', 'Abril Fatface', 400, 0.7],
    ['shrikhand', 'Shrikhand', 400, 0.7], ['unifrakturmaguntia', 'UnifrakturMaguntia', 400, 0.68], ['pirata-one', 'Pirata One', 400, 0.66],
    ['metal-mania', 'Metal Mania', 400, 0.7], ['new-rocker', 'New Rocker', 400, 0.68], ['creepster', 'Creepster', 400, 0.72],
    ['nosifer', 'Nosifer', 400, 0.7], ['rubik-wet-paint', 'Rubik Wet Paint', 400, 0.72], ['rubik-glitch', 'Rubik Glitch', 400, 0.72],
    ['rubik-dirt', 'Rubik Dirt', 400, 0.72], ['fredericka-the-great', 'Fredericka the Great', 400, 0.7], ['monoton', 'Monoton', 400, 0.72],
    ['faster-one', 'Faster One', 400, 0.72], ['press-start-2p', 'Press Start 2P', 400, 0.7], ['vt323', 'VT323', 400, 0.62],
    ['courier-prime', 'Courier Prime', 700, 0.6], ['cutive-mono', 'Cutive Mono', 400, 0.6]
  ];
  var BASE = 'assets/fonts/flyer/';
  var list = DRAWN.map(function (d) { return { id: d.id, name: d.name, kind: d.id === 'typewriter' ? 'type' : 'drawn' }; })
    .concat(FONTS.map(function (f) { return { id: 'f:' + f[0], name: f[1], kind: 'font', family: 'SBF ' + f[1], weight: f[2], cap: f[3], file: BASE + f[0] + '.woff2' }; }));
  var by = {};
  list.forEach(function (l) { by[l.id] = l; });
  var loading = {};

  function get(id) { return by[id] || null; }
  function isFont(id) { var l = by[id]; return !!(l && l.kind === 'font'); }
  /** The CSS font-family for a font lettering, with a plain fallback; '' for a drawn one. */
  function family(id) { var l = by[id]; return l && l.kind === 'font' ? '"' + l.family + '", Impact, sans-serif' : ''; }
  function ready(id) {
    var l = by[id];
    if (!l || l.kind !== 'font') return true;
    try { return typeof document !== 'undefined' && document.fonts && document.fonts.check(l.weight + ' 20px "' + l.family + '"'); } catch (e) { return true; }
  }
  /** Load a font lettering; cb(ok) once it can be drawn (at once for a drawn one, or with no font loading in this browser). */
  function ensure(id, cb) {
    var l = by[id], ff;
    cb = typeof cb === 'function' ? cb : function () {};
    if (!l || l.kind !== 'font' || typeof document === 'undefined' || !document.fonts || typeof FontFace === 'undefined') { cb(true); return; }
    if (ready(id)) { cb(true); return; }
    if (!loading[id]) {
      ff = new FontFace(l.family, 'url(' + l.file + ') format("woff2")', { weight: String(l.weight), display: 'swap' });
      loading[id] = ff.load().then(function (f) { document.fonts.add(f); return true; }, function () { return false; });
    }
    loading[id].then(cb, function () { cb(false); });
  }

  SB.Lettering = { list: list, get: get, isFont: isFont, family: family, ready: ready, ensure: ensure };
})();
