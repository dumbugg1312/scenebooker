#!/usr/bin/env node
'use strict';
// tools/checkpack.js — check city packs one at a time, the way 04-cities 6.3 asks.
//   node tools/checkpack.js mobile-al tyler-tx ...      (no args: every pack present)
// For each pack: one register call for its own slug, SB.Cities.validate on the raw pack finds nothing,
// it normalizes with exactly one start room, no banned term outside banned/blocklist, and a new game starts.
// Prints OK or the problems per slug; exit code 1 if any failed.
const H = require('../test/helpers.js');

const want = process.argv.slice(2);
const slugs = want.length ? want : H.packSlugs();
const general = H.bannedGeneral();
let bad = 0;

slugs.forEach(slug => {
  const probs = [], warns = [];
  let rp = null;
  try { rp = H.rawPack(slug); } catch (e) { probs.push('file does not run: ' + e.message); }
  if (!rp && !probs.length) probs.push('no file js/cities/packs/' + slug + '.js, or it never calls register');
  if (rp && rp.slug !== slug) probs.push('register slug is "' + rp.slug + '"');
  if (rp) {
    let SB = null;
    try { SB = H.fresh({ stubs: false, packs: [slug] }); SB.Cities.generalBanned = general; }
    catch (e) { probs.push('load threw: ' + e.message); }
    if (SB) {
      const v = SB.Cities.validate(JSON.parse(JSON.stringify(rp.pack)), general);
      v.forEach(p => (p.indexOf('warning:') === 0 ? warns : probs).push(p));
      let np = null;
      try { np = SB.Cities.get(slug); } catch (e) { probs.push('normalize threw: ' + e.message); }
      if (np && np.rooms.filter(r => r.start).length !== 1) probs.push('normalized pack does not have exactly one start room');
      const own = H.compile(Array.from(new Set(general.concat((rp.pack.banned || []).map(x => String(x).toLowerCase())))));
      H.eachString(rp.pack, (p, s) => {
        if (/^words\.(street|water|hood)/.test(p) || /^zones\[\d+\]\.name$/.test(p) || /^hoods\[\d+\]\.name$/.test(p)) return;
        const h = H.bannedHits(s, own);
        if (h.length) probs.push('banned term at ' + p + ': ' + h.join(', '));
      }, k => k === 'banned' || k === 'blocklist');
      if (np) {
        try { H.newGame(SB, { citySlug: slug, seed: 'check-' + slug }); }
        catch (e) { probs.push('new game failed: ' + e.message); }
      }
    }
  }
  if (probs.length) { bad++; console.log('FAIL ' + slug); probs.slice(0, 12).forEach(p => console.log('  - ' + p)); }
  else console.log('OK   ' + slug + (warns.length ? '  (' + warns.length + ' warnings: ' + warns.slice(0, 2).join(' | ') + ')' : ''));
});
process.exit(bad ? 1 : 0);
