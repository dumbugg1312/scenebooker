#!/usr/bin/env node
'use strict';
// tools/stagemod.js — the mechanical half of the polish brief's job 3 (one stage, one scale), run once over the
// stylesheets. At 1280 x 800 one stage unit is .8px, so --p (1.25 units) is exactly one px of the old layout: every
// length rewritten in --p keeps today's 1280 x 800 picture and scales with the stage at every other size.
//   node tools/stagemod.js [--write] [files...]     default: every css/*.css except tokens, fonts, finish, cu-phone
// What it does, outside comments:
//   Npx -> calc(var(--p) * N)        (0px -> 0)
//   Nvw -> calc(var(--p) * 12.8 * N), Nvh -> calc(var(--p) * 8 * N)   (the window was 1280 x 800); 100vw/100vh are left
//   @media with only width/height (and screen): the rules that applied at 1280 x 800 are kept, the rest dropped
//   font-size and the size in a font shorthand: calc(var(--fs) * N), never under 12 (the type floor)
//   named font stacks -> var(--f-type) | var(--f-gothic) | var(--f-mono)
//   cursor declarations -> removed (css/finish.css draws the pointers); smooth transitions -> steps(2, end)
// Without --write it prints what it would change per file.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const argv = process.argv.slice(2), WRITE = argv.indexOf('--write') >= 0;
const SKIP = /(^|\/)(tokens|fonts|finish|cu-phone)\.css$/;
let files = argv.filter(a => !a.startsWith('--'));
if (!files.length) files = fs.readdirSync(path.join(ROOT, 'css')).filter(f => f.endsWith('.css')).map(f => 'css/' + f).filter(f => !SKIP.test(f));

const n = x => String(Math.round(x * 1000) / 1000);
function family(v) {
  if (/var\(--f-/.test(v)) return null;
  if (/Courier|Nimbus Mono/i.test(v)) return 'var(--f-type)';
  if (/Impact|Arial Black|Haettenschweiler|Arial Narrow|Anton|Oswald|Bebas/i.test(v)) return 'var(--f-gothic)';
  if (/ui-monospace|Menlo|SF Mono|Consolas|Liberation Mono|\bmonospace\b/i.test(v)) return 'var(--f-mono)';
  if (/system-ui|-apple-system|Helvetica|Arial|Verdana|Trebuchet|Segoe UI|Roboto|sans-serif|Georgia|Times|serif|cursive|Marker Felt|Bradley|Segoe Print|Comic/i.test(v)) return 'var(--f-type)';
  return null;
}
/* does a media query that only tests width/height apply at 1280 x 800? null when it tests anything else */
function applies(q) {
  const parts = q.split(',').map(s => s.trim());
  let any = false;
  for (const p of parts) {
    const feats = p.match(/\([^)]*\)/g) || [], rest = p.replace(/\([^)]*\)/g, '').replace(/\b(and|only|screen|all)\b/g, '').trim();
    if (rest) return null;
    let ok = true;
    for (const f of feats) {
      const m = /^\(\s*(min|max)-(width|height)\s*:\s*([\d.]+)px\s*\)$/.exec(f);
      if (!m) return null;
      const v = +m[3], have = m[2] === 'width' ? 1280 : 800;
      if (m[1] === 'min' ? have < v : have > v) ok = false;
    }
    if (ok) any = true;
  }
  return any;
}
function block(s, open) {                     // index of the } that closes the { at open
  let d = 0;
  for (let i = open; i < s.length; i++) { if (s[i] === '{') d++; else if (s[i] === '}') { d--; if (!d) return i; } }
  return -1;
}

let changedFiles = 0;
files.forEach(f => {
  const p = path.join(ROOT, f), src = fs.readFileSync(p, 'utf8'), log = { px: 0, vw: 0, mediaKept: 0, mediaDropped: 0, mediaLeft: 0, font: 0, floor: 0, cursor: 0, ease: 0, left: [] };
  /* hide comments behind markers so nothing inside them changes */
  const comments = [];
  let s = src.replace(/\/\*[\s\S]*?\*\//g, m => { comments.push(m); return '\u0000' + (comments.length - 1) + '\u0000'; });

  /* breakpoints: keep what applied at 1280 x 800 */
  for (let guard = 0; guard < 200; guard++) {
    const re = /@media([^{]*)\{/g; let m, did = false;
    while ((m = re.exec(s))) {
      const a = applies(m[1]);
      if (a === null) continue;
      const open = m.index + m[0].length - 1, close = block(s, open);
      if (close < 0) break;
      const inner = s.slice(open + 1, close);
      s = s.slice(0, m.index) + (a ? '/* (kept from a breakpoint that applied at 1280 x 800) */' + inner : '') + s.slice(close + 1);
      if (a) log.mediaKept++; else log.mediaDropped++;
      did = true; break;
    }
    if (!did) break;
  }
  (s.match(/@media[^{]*\((min|max)-(width|height)[^{]*/g) || []).forEach(q => { log.mediaLeft++; log.left.push('media ' + q.trim()); });

  /* declarations */
  s = s.replace(/([{;]\s*)([a-z-]+)(\s*:\s*)([^;{}]*)/g, (all, pre, prop, colon, val) => {
    if (prop.startsWith('--') && /^--(f-|font)/.test(prop)) return all;
    let v = val;
    if (prop === 'cursor') { if (!/^\s*(none|text)\s*(!important)?\s*$/.test(v)) { log.cursor++; return pre.replace(/\s*$/, '') + ' '; } return all; }
    if (!/url\(/.test(v)) {
      v = v.replace(/(^|[\s(,/+*-])(-?\d*\.?\d+)px\b/g, (m0, b, num) => { log.px++; return b + (+num === 0 ? '0' : 'calc(var(--p) * ' + n(+num) + ')'); });
      v = v.replace(/(^|[\s(,/+*-])(-?\d*\.?\d+)(vw|vh)\b/g, (m0, b, num, u) => {
        if (+num === 100 && !/calc|min|max|clamp/.test(v)) { log.left.push(prop + ': ' + val.trim()); return m0; }
        log.vw++; return b + 'calc(var(--p) * ' + n((u === 'vw' ? 12.8 : 8) * +num) + ')';
      });
    }
    if (prop === 'font-family' || prop === 'font') {
      if (prop === 'font-family') { const fam = family(v); if (fam) { log.font++; v = ' ' + fam + (/!important/.test(v) ? ' !important' : ''); } }
      else {
        const mm = /^(.*?)(calc\(var\(--p\) \* [\d.]+\)|[\d.]+(?:em|rem|%)|inherit)((?:\s*\/\s*[^\s,]+)?)\s+(.+)$/.exec(v.trim());
        if (mm) { const fam = family(mm[4]); if (fam) { log.font++; v = ' ' + mm[1] + mm[2] + mm[3] + ' ' + fam + (/!important/.test(mm[4]) ? ' !important' : ''); } }
      }
    }
    if (prop === 'font-size' || prop === 'font') {
      v = v.replace(/calc\(var\(--p\) \* ([\d.]+)\)/, (m0, num) => { if (+num < 12) log.floor++; return 'calc(var(--fs) * ' + n(Math.max(12, +num)) + ')'; });
    }
    if (prop === 'transition' || prop === 'transition-timing-function') {
      v = v.replace(/cubic-bezier\([^)]*\)|\b(ease-in-out|ease-in|ease-out|ease|linear)\b/g, () => { log.ease++; return 'steps(2, end)'; });
    }
    return pre + prop + colon + v;
  });
  s = s.replace(/\u0000(\d+)\u0000/g, (m, i) => comments[+i]);
  const changed = s !== src;
  if (changed) changedFiles++;
  console.log((changed ? '~ ' : '  ') + f.padEnd(24) + ` px ${log.px}, vw/vh ${log.vw}, media kept ${log.mediaKept} dropped ${log.mediaDropped}, fonts ${log.font}, floor ${log.floor}, cursor ${log.cursor}, ease ${log.ease}` + (log.left.length ? '\n      left for a person: ' + log.left.join('\n      left for a person: ') : ''));
  if (WRITE && changed) fs.writeFileSync(p, s);
});
console.log((WRITE ? 'wrote ' : 'would change ') + changedFiles + ' files');
