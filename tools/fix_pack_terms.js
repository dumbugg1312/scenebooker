#!/usr/bin/env node
'use strict';
// One-off: narrow or drop pack `banned` and `blocklist` entries that collide with ordinary game text or block
// ordinary generated names. Edits only the literal inside the banned: [...] / blocklist: [...] arrays.
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '../js/cities/packs');

// banned: term -> replacement (null = drop)
const BANNED = {
  'dow': 'dow chemical', 'flyers': null, 'saints': 'new orleans saints', 'the record': 'the stockton record',
  'the times': 'the shreveport times', 'bart': null, 'dart': null, 'comet': null, 'gazette': 'cedar rapids gazette',
  'rounder': 'rounder records', 'liberty': 'liberty university', 'mariners': 'seattle mariners', 'colby': 'colby college',
  'red line': null, 'big sky': null, 'first night': null, 'civic center': null, 'riverbend': null, 'saturday market': null,
  'homecoming': null, 'slack water': null, 'the gnat line': null, 'gnat line': null, 'the spillway': null,
  'the loading dock': null, 'the parts counter': null, 'clay pit': null, 'the fellowship hall': null, 'third shift': null,
  'feed store annex': null, 'cold storage': null, 'the pavilion': null, 'common ground': null, 'cypress knee': null,
  'sweet pea': null, 'the salt flats': null
};
// blocklist entries (as written) to drop: common words and surnames that would block ordinary names
const BLOCK_DROP = new Set(['the current*', 'the grill*', 'the breeze*', 'the slipway*', 'jewel*', 'duke*', "duke's*", 'grandma*',
  'kernels*', 'hoodoo*', 'malone*', 'maxwell*', 'bradley*', 'snyder*', 'eastman*', 'tyson*', 'freddy*', 'harley*', 'clarion*',
  'trane*', 'citadel*', 'jeep*', 'amazon*', 'kellogg*', 'rawhide*', 'ironman*', 'moxie*', 'wort*', 'krystal*', 'shiner*',
  'badgers*', 'culver*', 'hanes*', "bell's*", "pal's*", "marco's*", 'mifflin*']);

function q(s) { return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
function fixArray(src, key, fn) {
  const start = src.indexOf(key + ': [');
  if (start < 0) return [src, 0];
  const open = src.indexOf('[', start), close = src.indexOf(']', open);
  const body = src.slice(open + 1, close);
  let n = 0;
  const items = [];
  body.replace(/'((?:[^'\\]|\\.)*)'/g, (m, s) => { items.push(s.replace(/\\'/g, "'").replace(/\\\\/g, '\\')); return m; });
  const out = [];
  items.forEach(it => { const r = fn(it); if (r !== it) n++; if (r !== null && out.indexOf(r) < 0) out.push(r); });
  if (!n) return [src, 0];
  // rewrite, wrapping at ~140 columns with the original indentation of continuation lines
  const indent = ' '.repeat(open - src.lastIndexOf('\n', open) );
  const lines = []; let line = '';
  out.forEach((it, i) => { const piece = q(it) + (i < out.length - 1 ? ', ' : ''); if (line && (line.length + piece.length) > 140) { lines.push(line.trimEnd()); line = ''; } line += piece; });
  lines.push(line);
  return [src.slice(0, open + 1) + lines.join('\n' + indent) + src.slice(close), n];
}

let total = 0;
fs.readdirSync(DIR).filter(f => f.endsWith('.js')).forEach(f => {
  const file = path.join(DIR, f);
  let src = fs.readFileSync(file, 'utf8'), a, b;
  [src, a] = fixArray(src, 'banned', it => (Object.prototype.hasOwnProperty.call(BANNED, it.toLowerCase()) ? BANNED[it.toLowerCase()] : it));
  [src, b] = fixArray(src, 'blocklist', it => (BLOCK_DROP.has(it.toLowerCase()) ? null : it));
  if (a || b) { fs.writeFileSync(file, src); total += a + b; console.log(f, 'banned:', a, 'blocklist:', b); }
});
console.log('changed entries:', total);
