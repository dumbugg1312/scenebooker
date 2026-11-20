'use strict';
// music.test — the mixtape that plays from the menu on (the title song is one song on it) (js/content/mixtape.js, js/audio/music.js):
// the generated list has the shape the player reads, every file it names is on disk and under the licences the game
// takes, the 'music' preference is on by default, and the player is a no-op without Audio.
const fs = require('fs'), path = require('path'), vm = require('vm');
const H = require('../helpers.js');

const FILES = ['js/content/mixtape.js', 'js/ui/dom.js', 'js/audio/music.js'];
const FIELDS = ['file', 'artist', 'title', 'license', 'licenseUrl', 'url'];
const OK_LICENSE = /^(CC0|CC[ -]BY(-SA)?\b|Public Domain)/i, NOT_LICENSE = /\b(NC|ND)\b/;

module.exports = function (t) {
  const sb = H.fresh({ packs: ['pensacola'], text: false });
  const missing = FILES.filter(f => !fs.existsSync(path.join(H.ROOT, f)));
  if (missing.length) { t.fail('missing: ' + missing.join(', ')); return; }
  FILES.forEach(f => { if (f !== 'js/ui/dom.js' || !(sb.UI && sb.UI.prefs)) vm.runInThisContext(fs.readFileSync(path.join(H.ROOT, f), 'utf8'), { filename: f }); });
  const X = sb.Content.mixtape, M = sb.Music;

  H.section(t, 'the list', () => {
    t.ok(X && typeof X === 'object', 'SB.Content.mixtape is there');
    t.eq(typeof X.base, 'string', 'it says where the files are');
    t.ok(/\/$/.test(X.base), 'base ends with a slash');
    t.ok(Array.isArray(X.tracks), 'tracks is a list');
    t.ok(X.title === null || (typeof X.title === 'object' && !!X.title.file), 'title is a song or null');
    if (!X.tracks.length) t.note('no mixtape built yet: the pocket player stays hidden');
    if (!X.title) t.note('no title song built yet: the menu is silent');
    t.ok(X.tracks.length === 0 || (X.tracks.length >= 12 && X.tracks.length <= 18), 'twelve to eighteen songs on the tape (' + X.tracks.length + ')');
    const seen = {};
    const song = (x, where) => {
      FIELDS.forEach(k => t.ok(typeof x[k] === 'string' && x[k].length > 0, where + ' has ' + k));
      t.ok(typeof x.seconds === 'number' && x.seconds > 20, where + ' says how long it is');
      t.ok(OK_LICENSE.test(x.license) && !NOT_LICENSE.test(x.license), where + ' is CC0, public domain, BY or BY-SA (' + x.license + ')');
      t.ok(/^https?:\/\//.test(x.licenseUrl) && /^https?:\/\//.test(x.url), where + ' links its licence and its source');
      t.ok(/^[\w.-]+\.mp3$/.test(x.file), where + ' names a plain mp3 file');
      t.ok(fs.existsSync(path.join(H.ROOT, X.base, x.file)), where + ': ' + X.base + x.file + ' is on disk');
      t.ok(!seen[x.file], where + ' is not on the tape twice');
      seen[x.file] = true;
    };
    X.tracks.forEach((x, i) => { song(x, 'track ' + (i + 1)); t.ok(typeof x.style === 'string' && x.style.length > 0, 'track ' + (i + 1) + ' has a style'); });
    if (X.title) { song(X.title, 'the title song'); t.eq(typeof X.title.loop, 'boolean', 'the title song says whether it loops clean'); }
  });

  H.section(t, 'preferences', () => {
    t.eq(sb.UI.prefs.defaults.music, 'on', 'music is on by default');
    t.eq(sb.UI.prefs.defaults.tape, 'on', 'the cassette starts out playing');
    t.eq(sb.UI.prefs.defaults.sound, 'full', 'sound is still full by default');
    t.eq(M.on(), sb.UI.prefs.get('music') !== 'off', 'SB.Music reads the preference');
  });

  H.section(t, 'no Audio: nothing happens, nothing throws', () => {
    ['title', 'desk', 'toggle', 'next', 'stop', 'now', 'watch'].forEach(k => t.eq(typeof M[k], 'function', 'SB.Music.' + k + ' is a function'));
    let calls = 0;
    const off = M.watch(() => { calls++; });
    t.eq(typeof off, 'function', 'watch returns a way to stop watching');
    M.title(true); M.desk(true); M.next(); M.title(false); M.desk(false);
    t.eq(M.now().mode, null, 'nothing is in the player');
    t.eq(M.now().track, null, 'no song');
    t.eq(M.now().playing, false, 'not playing');
    t.eq(M.has(), X.tracks.length > 0, 'has() says whether there is a tape');
    t.eq(M.toggle(), X.tracks.length > 0, 'the cassette takes a press only when there is a tape');
    t.eq(M.now().playing, false, 'still not playing');
    M.stop();
    t.eq(sb.UI.prefs.get('tape'), 'off', 'stop is remembered');
    M.toggle();
    if (X.tracks.length) t.eq(sb.UI.prefs.get('tape'), 'on', 'and so is play');
    off();
    sb.UI.prefs.set('tape', 'on');
  });

  H.section(t, 'the pocket player keys', () => {
    ['prev', 'playPause', 'setPaused', 'setVolume', 'ducked'].forEach(k => t.eq(typeof M[k], 'function', 'SB.Music.' + k + ' is a function'));
    t.eq(sb.UI.prefs.defaults.musicVol, 0.8, 'the music volume starts at 0.8');
    M.setVolume(0.35);
    t.eq(sb.UI.prefs.get('musicVol'), 0.35, 'the volume is remembered');
    t.eq(M.now().volume, 0.35, 'now() reports it');
    M.setVolume(7); t.eq(M.now().volume, 1, 'the volume stops at 1');
    M.setVolume(-1); t.eq(M.now().volume, 0, 'and at 0');
    sb.UI.prefs.set('musicVol', 0.8);
    M.setPaused(true);
    t.eq(M.now().paused, true, 'pause holds');
    t.eq(sb.UI.prefs.get('tape'), 'off', 'and is remembered');
    M.prev(); M.next();
    t.eq(M.now().paused, false, 'back or next is asking for music: it un-pauses');
    t.eq(M.ducked(), false, 'nothing has the room in a test');
    sb.UI.prefs.set('tape', 'on');
  });

  H.section(t, 'one tape from the first screen', () => {
    const src = fs.readFileSync(path.join(H.ROOT, 'js/audio/music.js'), 'utf8');
    t.ok(!/el\.loop\s*=\s*(true|mode)/.test(src), 'nothing is set to repeat one song');
    t.ok(/t\.concat\(\[s\]\)/.test(src), 'the title song is one more song on the tape');
  });
};
