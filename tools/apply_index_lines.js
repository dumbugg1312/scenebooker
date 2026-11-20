#!/usr/bin/env node
'use strict';
// One-off: write new city-card blurb/hard lines (from a JSON list of {slug, indexBlurb, indexHard}) into js/cities/index.js.
const fs = require('fs'), path = require('path'), H = require('../test/helpers.js');
const FILE = path.join(__dirname, '../js/cities/index.js');
const rows = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
let src = fs.readFileSync(FILE, 'utf8'), done = 0;
const skipped = [];
const general = H.bannedGeneral();
function q(s) { return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }
rows.forEach(r => {
  const b = String(r.indexBlurb || '').trim(), h = String(r.indexHard || '').trim();
  const why = [];
  if (!b || b.length > 140) why.push('blurb length ' + b.length);
  if (!h || h.length > 90) why.push('hard length ' + h.length);
  const rp = H.rawPack(r.slug);
  const comp = H.compile(general.concat(((rp && rp.pack.banned) || []).map(x => String(x).toLowerCase())));
  const hits = H.bannedHits(b + ' ' + h, comp);
  if (hits.length) why.push('banned: ' + hits.join(','));
  const at = src.indexOf("{ slug: '" + r.slug + "',");
  if (at < 0) why.push('no index entry');
  if (why.length) { skipped.push(r.slug + ' (' + why.join('; ') + ')'); return; }
  const end = src.indexOf('featured:', at);
  let entry = src.slice(at, end);
  const nb = entry.replace(/blurb: '(?:[^'\\]|\\.)*'/, 'blurb: ' + q(b)).replace(/hard: '(?:[^'\\]|\\.)*'/, 'hard: ' + q(h));
  if (nb === entry) { skipped.push(r.slug + ' (pattern not found)'); return; }
  src = src.slice(0, at) + nb + src.slice(end); done++;
});
fs.writeFileSync(FILE, src);
console.log('updated', done, 'entries'); if (skipped.length) console.log('skipped:\n  ' + skipped.join('\n  '));
