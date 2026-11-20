'use strict';
// names.test — the name checks of 03-content section 12 item 5 and 03-content 4.1 (06-harness section 3).
//   * no duplicates inside a bank; `cleared` entries have two words or more;
//   * every whole name in names.js and in every pack (words.bands, room names) passes SB.text.nameOk with that pack's local words;
//   * names generated from the patterns (this test draws its own, from the banks, with SB.rng.make) pass nameOk at a high rate
//     and yield at least 300 distinct passing band names per genre from 10,000 draws; every other kind (room by kind, label,
//     zine, agency, booking) yields passing names; none is blocked once the rule has been applied;
//   * when SB.WorldGen is real: the bands, rooms and labels it makes all pass (60 bands per genre, fewer than the spec's 10,000
//     so the run stays inside the 60-second budget);
//   * every replacement the name check made is present, and no replaced name appears anywhere in SB.Content or a pack outside a blocklist.
// The replaced (colliding) names are the "was" column of design/name-check.md section 1. They are listed here only as the terms
// that must not appear; they are not used.
const H = require('../helpers.js');

// The names the name check replaced are read from design/name-check.md (section 1, first column of both tables), so no real name is
// written in this file. Each cell becomes the normalized names it holds: "X (genre)" -> X; "Y, The" -> The Y; "A (x), The B (y)" -> A, The B.
function replacedNames(norm) {
  const fs = require('fs'), path = require('path');
  const f = path.join(H.ROOT, 'design/name-check.md');
  if (!fs.existsSync(f)) return null;
  const text = fs.readFileSync(f, 'utf8');
  const start = text.indexOf('## 1.'), end = text.indexOf('## 2.');
  const out = [];
  text.slice(start, end < 0 ? undefined : end).split('\n').forEach(line => {
    if (line.charAt(0) !== '|' || /^\|\s*-/.test(line) || /^\|\s*Name\s*\|/.test(line)) return;
    const cells = line.split('|'); if (/^\s*keep/i.test(cells[3] || '')) return;        // the check said to keep this one
    let cell = cells[1] || '';
    cell = cell.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
    cell.split(/,\s+(?=The\s)|,\s+(?!The$)/).forEach(part => {
      part = part.trim(); if (!part) return;
      const m = /^(.*),\s*The$/.exec(part); if (m) part = 'The ' + m[1];
      const n = norm(part); if (n) out.push(n);
    });
  });
  return out;
}
const REPLACEMENTS = ['Slack Water', 'Mildew Remediation', 'Dredge Barge', 'The Gnat Line', 'The Satsuma Crates', 'The Pier Review', 'The Plywood Partiers'];

module.exports = function (t) {
  const SB = H.fresh({ packs: ['pensacola'] });
  const N = SB.Content.names;
  if (!N) { t.note('skipped: js/content/names.js does not exist yet'); return; }
  const pensacola = H.rawPack('pensacola');
  const localWords = pensacola && pensacola.pack.words ? [].concat(pensacola.pack.words.street || [], pensacola.pack.words.water || [], pensacola.pack.words.hood || []) : [];
  const norm = SB.text.normName;
  const REPLACED = replacedNames(norm);
  if (!REPLACED) t.note('design/name-check.md is missing: the replaced names are not checked');
  else t.ok(REPLACED.length >= 20, 'name-check.md lists the colliding names (' + REPLACED.length + ' read)');

  /* ---- banks: no duplicates, shapes ---- */
  function dupes(list) { const seen = {}, out = []; list.forEach(x => { const k = String(x).toLowerCase(); if (seen[k]) out.push(x); seen[k] = true; }); return out; }
  [['rare', N.rare], ['cleared', N.cleared], ['last', N.last], ['first.KIDS', N.first && N.first.KIDS], ['first.MIDDLE', N.first && N.first.MIDDLE], ['first.OLD', N.first && N.first.OLD]].forEach(p => {
    if (!Array.isArray(p[1])) { t.fail('names.' + p[0] + ' is not a list'); return; }
    t.eq(dupes(p[1]), [], 'no duplicates in names.' + p[0]);
  });
  (N.cleared || []).forEach(c => t.ok(norm(c).split(' ').length >= 2, 'cleared entry has two words or more: ' + c));
  const blockRaw = N.blocklist || [];
  // 03-content 12.5: nothing in names.rare is also on the blocklist except where the entry is the bare word (refused alone, allowed in a longer name)
  const blockStar = blockRaw.filter(x => /\*\s*$/.test(x)).map(x => norm(String(x).replace(/\*\s*$/, '')));
  (N.rare || []).forEach(w => { if (blockStar.indexOf(norm(w)) >= 0) t.fail('rare word "' + w + '" is on the blocklist as a starred entry, which would refuse every longer name'); });
  ['KIDS', 'MIDDLE', 'OLD'].forEach(g => t.ok(((N.first || {})[g] || []).length >= 80, 'at least 80 first names for ' + g));
  t.ok((N.last || []).length >= 60, 'at least 60 surnames');

  /* ---- whole names ---- */
  const wholes = [];
  function addWhole(kind, list, lw) { (list || []).forEach(n => wholes.push({ kind: kind, name: n, lw: lw })); }
  const B = N.band || {};
  Object.keys(B.byGenre || {}).forEach(g => addWhole('band.' + g, B.byGenre[g].whole, localWords));
  Object.keys(B.byGen || {}).forEach(g => addWhole('band.' + g, B.byGen[g].whole, localWords));
  addWhole('zine', (N.zine || {}).whole, localWords);
  addWhole('booking', (N.booking || {}).whole, localWords);
  addWhole('cleared', N.cleared, localWords);
  const bad = wholes.filter(w => !SB.text.nameOk(w.name, w.lw));
  t.eq(bad.map(w => w.kind + ': ' + w.name), [], 'every whole name in names.js passes nameOk (with Pensacola local words)');
  Object.keys(B.byGenre || {}).forEach(g => t.ok(((B.byGenre[g] || {}).whole || []).length >= 20, 'band.byGenre.' + g + ' has at least 20 whole names'));

  /* ---- whole names in every pack ---- */
  H.packSlugs().forEach(slug => {
    const rp = H.rawPack(slug); if (!rp) return;
    const p = rp.pack, lw = [].concat((p.words || {}).street || [], (p.words || {}).water || [], (p.words || {}).hood || []);
    const bands = [];
    Object.keys((p.words || {}).bands || {}).forEach(k => (p.words.bands[k] || []).forEach(n => bands.push(n)));
    const rooms = (p.rooms || []).filter(r => r.name).map(r => r.name);
    t.eq(bands.filter(n => !SB.text.nameOk(n, lw, 'band')).concat(rooms.filter(n => !SB.text.nameOk(n, lw))), [], slug + ': every written band and room name passes nameOk');
  });

  /* ---- generated names: this test draws its own from the patterns ---- */
  function bankFor(group, slotName, packWords) {
    const b = slotName.replace(/\d+$/, '');
    if (group.banks && group.banks[b]) return group.banks[b];
    if (N.shared && N.shared[b]) return N.shared[b];
    if (packWords && packWords[b] && packWords[b].length) return packWords[b];
    if (b === 'first') return [].concat(N.first.KIDS, N.first.MIDDLE, N.first.OLD);
    if (b === 'last') return N.last;
    if (b === 'surname') return (packWords && packWords.surnames) || N.last;
    return null;
  }
  const words = pensacola ? pensacola.pack.words : {};
  function draw(group, tmpl, rng, missing) {
    const ctx = {}, used = {};
    const re = /\{([A-Za-z0-9_]+)/g; let m;
    while ((m = re.exec(tmpl))) {
      const s = m[1], bank = bankFor(group, s, words);
      if (!bank || !bank.length) { missing[s] = true; ctx[s] = 'x'; continue; }
      let w = rng.pick(bank), tries = 0;
      const b = s.replace(/\d+$/, '');
      while (used[b + ':' + w] && tries++ < 8) w = rng.pick(bank);
      used[b + ':' + w] = true; ctx[s] = w;
    }
    return SB.text.render(tmpl, ctx, rng);
  }
  function generate(group, count, seed, extra) {
    const rng = SB.rng.make(seed), out = [], missing = {};
    const patterns = group.patterns || [];
    for (let i = 0; i < count; i++) {
      if (!patterns.length) break;
      out.push(draw(Object.assign({}, group, extra), rng.pick(patterns), rng, missing));
    }
    return { names: out, missing: Object.keys(missing) };
  }

  Object.keys(B.byGenre || {}).forEach(g => {
    const grp = B.byGenre[g];
    const r = generate(grp, 10000, 'names:' + g);
    t.eq(r.missing, [], 'band.' + g + ': every slot of every pattern has a bank');
    const good = {}; r.names.forEach(n => { if (SB.text.nameOk(n, localWords)) good[SB.text.normName(n)] = true; });
    t.ok(Object.keys(good).length + (grp.whole || []).length >= 300, g + ': at least 300 distinct passing band names from 10,000 draws (got ' + Object.keys(good).length + ')');
    // the redraw loop of WorldGen throws away a failing name; the patterns must make that rare
    const rate = r.names.filter(n => SB.text.nameOk(n, localWords)).length / Math.max(1, r.names.length);
    t.ok(rate >= .5, g + ': at least half of the pattern draws pass nameOk (got ' + Math.round(rate * 100) + '%)');
    t.eq(r.names.filter(n => SB.text.nameOk(n, localWords) && SB.text.blocked(n)), [], g + ': nothing passing is blocked');
  });
  Object.keys(B.byGen || {}).forEach(g => {
    const r = generate(B.byGen[g], 1000, 'names:gen:' + g);
    t.eq(r.missing, [], 'band.' + g + ': every slot has a bank');
    t.ok(r.names.filter(n => SB.text.nameOk(n, localWords)).length >= 100, g + ': generation patterns make passing names');
  });
  Object.keys(N.room || {}).forEach(k => {
    const r = generate(N.room[k], 2000, 'names:room:' + k);
    t.eq(r.missing, [], 'room.' + k + ': every slot has a bank (or a pack word list)');
    t.ok(r.names.filter(n => SB.text.nameOk(n, localWords)).length >= 50, 'room.' + k + ': patterns make passing names');
  });
  ['label', 'zine', 'agency', 'booking'].forEach(k => {
    const r = generate(N[k] || {}, 2000, 'names:' + k);
    t.eq(r.missing, [], k + ': every slot has a bank');
    t.ok(r.names.filter(n => SB.text.nameOk(n, localWords)).length >= 20, k + ': patterns make passing names');
  });

  /* ---- through WorldGen, when it is real ---- */
  if (H.needs(t, ['WorldGen', 'Game', 'Notebook'], 'generated names')) {
    const state = H.newGame(SB, { seed: 'names-1' });
    const lw = SB.Cities.pack(state).derived.localWords;
    let badOnes = [];
    Object.keys(B.byGenre || {}).forEach(g => {
      for (let i = 0; i < 60; i++) {
        const id = SB.WorldGen.band(state, { genre: g });
        const b = state.bands[id];
        if (!b || !SB.text.nameOk(b.name, lw, 'band') || SB.text.blocked(b.name)) badOnes.push(g + ': ' + (b && b.name));
      }
    });
    t.eq(badOnes.slice(0, 5), [], 'every band WorldGen makes passes nameOk and is not blocked');
    const names = Object.keys(state.bands).map(k => state.bands[k].name);
    t.eq(dupes(names).length, 0, 'no band name is used twice in one save');
    Object.keys(state.rooms).forEach(k => t.ok(SB.text.nameOk(state.rooms[k].name, lw), 'room name passes nameOk: ' + state.rooms[k].name));
  }

  /* ---- the name check's replacements ---- */
  const all = [];
  H.eachString(SB.Content, (p, s) => all.push({ p: p, s: s }), (k, p) => /(^|\.)names\.(blocklist)/.test(p));
  const wholeOnly = all.filter(x => /\.whole\[|cleared\[/.test(x.p) || !/^names\./.test(x.p));
  REPLACEMENTS.forEach(r => {
    const found = all.some(x => x.s === r) || (N.cleared || []).indexOf(r) >= 0 || JSON.stringify(SB.Content).indexOf(r) >= 0 || H.packSlugs().some(s => { const rp = H.rawPack(s); return rp && JSON.stringify(rp.pack).indexOf(r) >= 0; });
    t.ok(found, 'the replacement "' + r + '" is present somewhere in content or a pack');
  });
  const cmp = (REPLACED || []).map(x => ({ term: x }));
  const hits = [];
  wholeOnly.forEach(x => { const n = SB.text.normName(x.s); cmp.forEach(c => { if (n === c.term) hits.push(x.p + ' = ' + x.s); }); });
  t.eq(hits.slice(0, 5), [], 'no replaced name stands alone as a content string');
  H.packSlugs().forEach(s => {
    const rp = H.rawPack(s); if (!rp) return;
    const ph = [];
    H.eachString(rp.pack, (p, v) => { if (!/^words\.bands|^rooms\[\d+\]\.name$/.test(p)) return; const n = SB.text.normName(v); (REPLACED || []).forEach(r => { if (n === r) ph.push(p + ' = ' + v); }); }, (k) => k === 'banned' || k === 'blocklist');
    t.eq(ph.slice(0, 5), [], s + ': no replaced name stands alone as a pack string');
  });
};
