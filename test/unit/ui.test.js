'use strict';
// ui.test — 06-harness section 3, `ui.test`: js/ui/components.js loads in Node without touching the DOM, and SB.UI.C.LogCard.homes
// names a home for every SB.Enums.REC (05-interface 3.1). Skipped with a note while js/ui does not exist.
const fs = require('fs'), path = require('path');
const H = require('../helpers.js');
const load = require('../load.js');

module.exports = function (t) {
  const file = 'js/ui/components.js';
  if (!fs.existsSync(path.join(H.ROOT, file))) { t.note('skipped: ' + file + ' does not exist yet'); return; }
  const SB = H.fresh({ packs: ['pensacola'] });
  const hadDocument = typeof globalThis.document, hadWindow = typeof globalThis.window;
  let err = null;
  try { load.run(file); } catch (e) { err = e; }
  t.ok(!err, 'components.js loads in Node without a DOM' + (err ? ': ' + err.message : ''));
  t.eq([typeof globalThis.document, typeof globalThis.window], [hadDocument, hadWindow], 'loading it defined no document or window');
  if (err) return;
  t.ok(SB.UI && SB.UI.C, 'SB.UI.C exists');
  const C = SB.UI.C;
  t.ok(C.LogCard, 'SB.UI.C.LogCard exists');
  if (!C.LogCard) return;
  const homes = C.LogCard.homes;
  t.ok(homes && typeof homes === 'object', 'LogCard.homes is a table');
  if (!homes) return;
  const missing = Object.keys(SB.Enums.REC).filter(k => homes[k] === undefined || homes[k] === null || homes[k] === '');
  t.eq(missing, [], 'LogCard.homes names a home for every REC (' + Object.keys(SB.Enums.REC).length + ' types)');
  const extra = Object.keys(homes).filter(k => !SB.Enums.REC[k]);
  t.eq(extra, [], 'LogCard.homes names no record type that does not exist');
  Object.keys(C).forEach(k => t.ok(typeof C[k] === 'function' || (C[k] && typeof C[k] === 'object'), 'SB.UI.C.' + k + ' is a function or a table'));
};
