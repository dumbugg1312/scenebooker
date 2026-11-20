#!/usr/bin/env node
'use strict';
// tools/finishlint.js — the polish brief's checks on stylesheets (and px left in screen scripts).
//   node tools/finishlint.js [files...]        default: every css/*.css; js files get only the px check
//   --all                                       list every finding, not just the first 12 of each kind per file
// A finished file has none of these:
//   px        a length in px (sizes are stage units: var(--u), or var(--p) = 1.25u, one px of the old 1280 x 800 layout)
//   important !important (fold the override into the rule it overrides)
//   hex       a hex colour outside css/tokens.css, css/finish.css (use the tokens: --pp-*, --toner, --hl-*, the signal colours)
//   font      a font named directly (use var(--f-type), var(--f-gothic), var(--f-mono))
//   media     a width/height breakpoint (the stage letterboxes instead)
//   cursor    a cursor set by hand (css/finish.css draws the two pointers)
//   ease      a smooth transition or animation (moves step: steps(n) or the four mv- moves)
//   small     type under the floor: 12p / 15u (16px at 1920 x 1080)
// Comments are ignored. Exit 1 when anything is found.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2), ALL = argv.indexOf('--all') >= 0;
let files = argv.filter(a => !a.startsWith('--'));
if (!files.length) files = fs.readdirSync(path.join(ROOT, 'css')).filter(f => f.endsWith('.css')).map(f => 'css/' + f);
const TOKEN_FILES = /(^|\/)(tokens|finish|fonts)\.css$/;

function strip(s) { return s.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' ')); }
function lineOf(s, i) { return s.slice(0, i).split('\n').length; }

let total = 0;
files.forEach(f => {
  const p = path.isAbsolute(f) ? f : path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log(f + ': missing'); return; }
  const raw = fs.readFileSync(p, 'utf8'), s = strip(raw), out = {}, add = (k, i, what) => { (out[k] = out[k] || []).push(lineOf(s, i) + ': ' + what.trim().slice(0, 90)); };
  if (f.endsWith('.js')) {
    const re = /['"][^'"\n]*\b\d+(\.\d+)?px\b[^'"\n]*['"]|\+\s*['"]px['"]/g; let m;
    while ((m = re.exec(s))) add('px', m.index, m[0]);
  } else {
    let m;
    const decl = /([a-z-]+)\s*:\s*([^;{}]+)/g;
    while ((m = decl.exec(s))) {
      const prop = m[1], val = m[2], at = m.index;
      if (prop.startsWith('--') && TOKEN_FILES.test(f)) continue;
      if (/(?<![\w.-])-?\d*\.?\d+px\b/.test(val) && !/^0px$/.test(val.trim())) add('px', at, prop + ': ' + val);
      if (/!important/.test(val)) add('important', at, prop + ': ' + val);
      if (!TOKEN_FILES.test(f) && /#[0-9a-fA-F]{3,8}\b/.test(val) && !/url\(/.test(val)) add('hex', at, prop + ': ' + val);
      if ((prop === 'font-family' || prop === 'font') && /['"]|\b(Courier|Arial|Impact|Georgia|Times|Helvetica|Verdana|Trebuchet|system-ui|ui-monospace|Menlo|Marker Felt|Bradley|Segoe|cursive|serif|sans-serif|monospace)\b/.test(val) && !/^\s*(inherit|var\(--f-)/.test(val.replace(/^[^,]*?\b(?=var\()/, '')) && !TOKEN_FILES.test(f)) add('font', at, prop + ': ' + val);
      if (prop === 'cursor' && !/^(none|inherit|var\()/.test(val.trim()) && !/finish\.css$/.test(f)) add('cursor', at, prop + ': ' + val);
      if (/^(transition|animation)(-timing-function)?$/.test(prop) && /\b(ease|ease-in|ease-out|ease-in-out|linear|cubic-bezier)\b/.test(val) && !/\binfinite\b/.test(val)) add('ease', at, prop + ': ' + val);
      if (prop === 'font-size' || prop === 'font') {
        const n = /calc\(\s*var\(--(p|fs|u)\)\s*\*\s*([\d.]+)/.exec(val);
        if (n && ((n[1] === 'u' && +n[2] < 15) || (n[1] !== 'u' && +n[2] < 12))) add('small', at, prop + ': ' + val);
      }
    }
    const mq = /@media[^{]*\b(min|max)-(width|height)\b[^{]*/g;
    while ((m = mq.exec(s)) && !/finish\.css$/.test(f)) add('media', m.index, m[0]);   // finish.css: the pointer pictures come in two sizes
  }
  const kinds = Object.keys(out), n = kinds.reduce((a, k) => a + out[k].length, 0);
  total += n;
  console.log((n ? 'x ' : 'ok ') + f + (n ? '  ' + kinds.map(k => k + ' ' + out[k].length).join(', ') : ''));
  kinds.forEach(k => (ALL ? out[k] : out[k].slice(0, 12)).forEach(l => console.log('    ' + k.padEnd(9) + l)));
});
console.log(total ? total + ' findings' : 'clean');
process.exit(total ? 1 : 0);
