'use strict';
// purity.test — the identifier check of 06-harness section 1 on js/engine and js/cities.
// Each file is stripped of comments and string literals first, then searched for the names the engine may not use,
// as identifiers: an object key `window:`, a property `.window`, a label 'Windows' never trips it.
// Exemptions, each requiring a typeof guard in the file: js/engine/week/save.js may use localStorage,
// and js/cities/cities.js may use document (inside SB.Cities.load, to inject a pack's script tag).
// A file that declares `window` or `document` itself (a variable or a parameter) is not using the global; the test
// says so in a note and skips that name for the file.
const fs = require('fs'), path = require('path');
const load = require('../load.js');
const ROOT = load.ROOT;

const NOT_AFTER_DOT = '(?<![.\\w$])';
const RULES = [
  { name: 'document',          re: new RegExp(NOT_AFTER_DOT + 'document\\s*[.\\[]'),                 local: 'document' },
  { name: 'window',            re: new RegExp(NOT_AFTER_DOT + 'window\\s*[.\\[]'),                   local: 'window' },
  { name: 'localStorage',      re: new RegExp(NOT_AFTER_DOT + 'localStorage\\b') },
  { name: 'sessionStorage',    re: new RegExp(NOT_AFTER_DOT + 'sessionStorage\\b') },
  { name: 'setTimeout',        re: new RegExp(NOT_AFTER_DOT + 'setTimeout\\s*\\(') },
  { name: 'setInterval',       re: new RegExp(NOT_AFTER_DOT + 'setInterval\\s*\\(') },
  { name: 'Date.now',          re: new RegExp(NOT_AFTER_DOT + 'Date\\s*\\.\\s*now\\b') },
  { name: 'new Date()',        re: /\bnew\s+Date\s*\(\s*\)/ },
  { name: 'Date()',            re: /(?<![.\w$])(?<!new\s)Date\s*\(\s*\)/ },
  { name: 'Math.random',       re: new RegExp(NOT_AFTER_DOT + 'Math\\s*\\.\\s*random\\b') },
  { name: 'fetch',             re: new RegExp(NOT_AFTER_DOT + 'fetch\\s*\\(') },
  { name: 'XMLHttpRequest',    re: new RegExp(NOT_AFTER_DOT + 'XMLHttpRequest\\b') }
];

function declares(blank, name) {
  return new RegExp('\\b(?:var|let|const)\\s+(?:[\\w$]+\\s*(?:=[^,;]*)?,\\s*)*' + name + '\\b').test(blank) ||
         new RegExp('\\((?:[^()]*,\\s*)?' + name + '\\s*[,)]').test(blank) ||
         new RegExp('\\b' + name + '\\s*=>').test(blank);
}

/* -> { bad: ['document at line 12', ...], notes: [...] } for one file's source */
function check(relPath, src) {
  const blank = load.strip(src).blank, bad = [], notes = [];
  const exempt = {};
  if (relPath === 'js/engine/week/save.js') exempt.localStorage = /typeof\s+localStorage/.test(blank);
  if (relPath === 'js/cities/cities.js') exempt.document = /typeof\s+document/.test(blank);
  RULES.forEach(rule => {
    const m = rule.re.exec(blank);
    if (!m) return;
    if (rule.local && declares(blank, rule.local)) { notes.push(relPath + ' declares its own "' + rule.local + '": not the global'); return; }
    if (exempt[rule.name] === true) return;
    const line = blank.slice(0, m.index).split('\n').length;
    bad.push(rule.name + ' at line ' + line + (rule.name === 'localStorage' || rule.name === 'document' ? ' (allowed here only behind a typeof guard, which was not found)' : ''));
  });
  return { bad, notes };
}

function walk(dir, out) {
  if (!fs.existsSync(dir)) return out;
  fs.readdirSync(dir).sort().forEach(name => {
    const p = path.join(dir, name), st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out); else if (/\.js$/.test(name)) out.push(p);
  });
  return out;
}

module.exports = function (t) {
  /* ---- the checker itself, on known inputs ---- */
  const bad = (rel, src) => check(rel, src).bad.map(s => s.split(' ')[0] === 'new' ? 'new Date()' : s.split(' at ')[0]);
  const E = 'js/engine/x.js';
  t.eq(bad(E, 'var a = document.title;'), ['document'], 'document.x is caught');
  t.eq(bad(E, 'var a = document["x"];'), ['document'], 'document[x] is caught');
  t.eq(bad(E, 'var a = window.x;'), ['window'], 'window.x is caught');
  t.eq(bad(E, 'setTimeout(f, 1); setInterval(f, 1);'), ['setTimeout', 'setInterval'], 'timers are caught');
  t.eq(bad(E, 'var n = Date.now();'), ['Date.now'], 'Date.now is caught');
  t.eq(bad(E, 'var n = new Date();'), ['new Date()'], 'new Date() with no argument is caught');
  t.eq(bad(E, 'var n = new Date(2027, 0, 18);'), [], 'new Date(args) is fine');
  t.eq(bad(E, 'var n = Math.random();'), ['Math.random'], 'Math.random is caught');
  t.eq(bad(E, 'var n = localStorage.getItem("a");'), ['localStorage'], 'localStorage is caught');
  t.eq(bad(E, 'fetch("x");'), ['fetch'], 'fetch is caught');
  t.eq(bad(E, 'var o = { window: 1, document: 2 }; var s = "window.x document.y setTimeout(f) Math.random()"; // window.z\n/* document.q */'), [], 'keys, strings and comments are not code');
  t.eq(bad(E, 'var w = job.window.state, x = view.document.id;'), [], 'a property named window or document is not the global');
  t.eq(bad(E, 'var windows = 1; var documents = 2; var windowed = 3;'), [], 'longer names are not the global');
  t.eq(bad(E, 'var s = `a ${window.x} b`;'), ['window'], 'a template hole is code');
  t.eq(bad(E, 'function f(window) { return window.state; }'), [], 'a parameter named window is its own variable');
  t.eq(bad(E, 'var window = SB.Jobs.window(s, 1); return window.state;'), [], 'a local variable named window is its own variable');
  t.eq(bad('js/engine/week/save.js', 'var ok = typeof localStorage !== "undefined" && localStorage.getItem("a");'), [], 'save.js may use localStorage behind a typeof guard');
  t.eq(bad('js/engine/week/save.js', 'localStorage.getItem("a");'), ['localStorage'], 'save.js without the guard is caught');
  t.eq(bad('js/engine/week/week.js', 'typeof localStorage; localStorage.x;'), ['localStorage'], 'no other file may use localStorage');
  t.eq(bad('js/cities/cities.js', 'if (typeof document !== "undefined") { document.createElement("script"); }'), [], 'cities.js may use document behind a typeof guard');
  t.eq(bad('js/cities/cities.js', 'document.createElement("script");'), ['document'], 'cities.js without the guard is caught');
  t.eq(bad('js/cities/cities.js', 'typeof document; window.x; setTimeout(f, 1);'), ['window', 'setTimeout'], 'the cities exemption covers document only');

  /* ---- the files ---- */
  const dirs = ['js/engine', 'js/cities'];
  let checked = 0;
  dirs.forEach(d => {
    const files = walk(path.join(ROOT, d), []);
    if (!fs.existsSync(path.join(ROOT, d))) t.note(d + ' does not exist yet: skipped');
    else if (!files.length) t.note(d + ' has no files yet');
    files.forEach(f => {
      const r = path.relative(ROOT, f).split(path.sep).join('/');
      const res = check(r, fs.readFileSync(f, 'utf8'));
      res.notes.forEach(n => t.note(n));
      t.eq(res.bad, [], r + ' uses none of document, window, localStorage, timers, Date.now, new Date(), Math.random, fetch');
      checked++;
    });
  });
  t.note(checked + ' files checked under js/engine and js/cities');
  // js/content is not checked here: its strings legitimately contain words such as "window".
};
