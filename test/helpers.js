'use strict';
// test/helpers.js — shared by the unit tests, the bots and balance.js (TEST, second delivery).
// Nothing here knows an engine module's insides: it knows the manifest (SB.API), the file tree, and the state shapes of 01-state.
const fs = require('fs'), path = require('path'), vm = require('vm');
const load = require('./load.js');
const ROOT = load.ROOT;

/* ---------------- real or stub ---------------- */

// 'Model' -> 'js/engine/show/model.js'
function enginePath(mod) {
  const base = String(mod).toLowerCase();
  return load.ENGINE.filter(f => path.basename(f, '.js') === base)[0] || null;
}
function isReal(mod) { const p = enginePath(mod); return !!p && fs.existsSync(path.join(ROOT, p)); }
function stubbed(mods) { return mods.filter(m => !isReal(m)); }
// needs(t, ['Model', 'Forecast']) -> true when every module is a real file; else notes "skipped: ..." and returns false.
function needs(t, mods, what) {
  const s = stubbed(mods);
  if (!s.length) return true;
  t.note('skipped' + (what ? ' (' + what + ')' : '') + ': module ' + s.join(', ') + (s.length > 1 ? ' are' : ' is') + ' still a stub');
  return false;
}
function allEngineReal() { return stubbed(Object.keys(SB_API_ENGINE())).length === 0; }
function SB_API_ENGINE() {
  // The manifest is in sb.js; read it in a throwaway context without loading the whole engine.
  const ctx = vm.createContext({});
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/core/sb.js'), 'utf8'), ctx, { filename: 'sb.js' });
  return ctx.SB && ctx.SB.API ? ctx.SB.API.engine : {};
}

/* ---------------- loading ---------------- */

// A fresh SB with the engine (stubs where a file is missing). opts as load(), plus `pack` (a raw pack object to register).
function fresh(opts) {
  opts = Object.assign({ stubs: true, text: false }, opts || {});
  return load(opts);
}

/* ---------------- the banned list ---------------- */

function bannedGeneral() {
  const j = JSON.parse(fs.readFileSync(path.join(__dirname, 'banned.json'), 'utf8'));
  const out = [];
  Object.keys(j).forEach(k => { if (Array.isArray(j[k])) j[k].forEach(x => out.push(String(x).toLowerCase())); });
  return out;
}
function termRegex(term) {
  const esc = String(term).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?:^|[^a-z0-9])' + esc + '(?![a-z0-9])', 'i');
}
function compile(terms) { return terms.map(t => ({ term: t, re: termRegex(t) })); }
// text -> [terms found]
function bannedHits(text, compiled) {
  const out = [];
  for (let i = 0; i < compiled.length; i++) if (compiled[i].re.test(text)) out.push(compiled[i].term);
  return out;
}

/* ---------------- walking data ---------------- */

// visit(path, string) for every string under obj; skip(key, path) true to leave a subtree out.
function eachString(obj, visit, skip, p) {
  p = p || '';
  if (typeof obj === 'string') { visit(p, obj); return; }
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) { obj.forEach((v, i) => eachString(v, visit, skip, p + '[' + i + ']')); return; }
  Object.keys(obj).forEach(k => {
    const q = p ? p + '.' + k : k;
    if (skip && skip(k, q)) return;
    eachString(obj[k], visit, skip, q);
  });
}

// Problems that make a value not JSON-safe: NaN, Infinity, undefined, functions. Returns [path] (at most `max`).
function jsonIssues(x, max) {
  const out = []; max = max || 10;
  (function walk(v, p, depth) {
    if (out.length >= max) return;
    if (depth > 60) { out.push(p + ': too deep (a cycle?)'); return; }
    const t = typeof v;
    if (v === undefined) { out.push(p + ': undefined'); return; }
    if (t === 'function') { out.push(p + ': function'); return; }
    if (t === 'number') { if (!isFinite(v)) out.push(p + ': ' + v); return; }
    if (!v || t !== 'object') return;
    if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) walk(v[i], p + '[' + i + ']', depth + 1); return; }
    const keys = Object.keys(v);
    for (let i = 0; i < keys.length; i++) walk(v[keys[i]], p ? p + '.' + keys[i] : keys[i], depth + 1);
  })(x, '', 0);
  return out;
}

/* ---------------- packs ---------------- */

// The raw pack a file registers, captured without touching the real SB.Cities.
function rawPack(slug) {
  const file = path.join(ROOT, 'js/cities/packs/' + slug + '.js');
  if (!fs.existsSync(file)) return null;
  let got = null;
  const sandbox = { SB: { Cities: { register: function (s, p) { got = { slug: s, pack: p }; } } } };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: 'js/cities/packs/' + slug + '.js' });
  return got;
}
function packSlugs() {
  const dir = path.join(ROOT, 'js/cities/packs');
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.js$/.test(f)).map(f => f.replace(/\.js$/, '')).sort() : [];
}

/* ---------------- a new game ---------------- */

// A mark the engine treats as opaque (01-state).
const MARK = { v: 1, treatment: 'block', emblem: 'star', frame: 'box', seed: 'cw' };

// Start a game through Game.newGame with the pack already loaded. over: { seed, citySlug, bills, fog, windows, tune, bookingName }
function newGame(SB, over) {
  over = over || {};
  const slug = over.citySlug || 'pensacola';
  if (!SB.Cities.isLoaded(slug)) SB.fail('test.helpers', 'pack "' + slug + '" is not loaded');
  return SB.Game.newGame({
    seed: over.seed || 'seed-1', citySlug: slug, bookingName: over.bookingName || 'Carport Weather', mark: MARK,
    settings: { bills: over.bills !== false, fog: over.fog || 'NORMAL', windows: over.windows || 'NORMAL' },
    tune: over.tune || null
  });
}

/* ---------------- a tiny runner for assertions inside loops ---------------- */

// first(list, pred) -> { ok, bad } where bad is the first item failing pred, so a loop is one assertion.
function all(list, pred) {
  for (let i = 0; i < list.length; i++) if (!pred(list[i], i)) return { ok: false, bad: list[i], at: i };
  return { ok: true };
}

// Run one part of a test; a throw is a failure of that part, not of the whole file.
function section(t, name, fn) {
  try { return fn(); } catch (e) { t.fail(name + ' threw: ' + (e && e.message ? e.message : e) + (e && e.stack ? ' | ' + String(e.stack).split('\n').slice(1, 3).join(' | ').replace(/\s+/g, ' ') : '')); return undefined; }
}

function median(xs) { if (!xs.length) return null; const a = xs.slice().sort((x, y) => x - y), m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; }
function pct(xs, p) { if (!xs.length) return null; const a = xs.slice().sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.max(0, Math.round(p * (a.length - 1))))]; }
function mean(xs) { return xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : null; }

module.exports = {
  ROOT, load, enginePath, isReal, stubbed, needs, allEngineReal, fresh,
  bannedGeneral, compile, bannedHits, eachString, jsonIssues, rawPack, packSlugs, MARK, newGame, all, section, median, pct, mean
};
