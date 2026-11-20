'use strict';
// scope.test — every file is wrapped (00-overview section 5, 06-harness section 3).
//   * every .js file under js/ outside js/content and js/cities/packs, after comments are stripped, is exactly one
//     statement beginning `(function` or `SB.module(` (js/cities/index.js is the one assignment to SB.CityIndex);
//   * every content file is exactly one `SB.Content.<name> = ...;` assignment, and holds no `function` and no `=>`
//     outside string literals;
//   * every pack file is exactly one `SB.Cities.register(...)` call;
//   * no file has a top-level const, let, var, class or function declaration;
//   * every file of index.html (or, with no index.html yet, every file load.js would load) loaded twice into one
//     context throws only the "defined twice" errors, never a redeclaration SyntaxError.
// The test stubs obey the same wrapping rule. A missing folder is skipped with a note.
const fs = require('fs'), path = require('path'), vm = require('vm');
const load = require('../load.js');
const ROOT = load.ROOT;

function walk(dir, out) {
  if (!fs.existsSync(dir)) return out;
  fs.readdirSync(dir).sort().forEach(name => {
    const p = path.join(dir, name), st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out); else if (/\.js$/.test(name)) out.push(p);
  });
  return out;
}
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

/* Analyse the shape of one file from its comment-free, string-blanked code.
 * Returns { statements, first, topLevel: [keyword...], ok } where statements counts depth-0 statements. */
function shape(blank) {
  const text = blank, n = text.length;
  let depth = 0, i = 0, statements = 0, started = false, inStmt = false, lastSig = '';
  const topLevel = [];
  const ident = /[A-Za-z_$]/;
  while (i < n) {
    const c = text[i];
    if (/\s/.test(c)) {
      // A newline at depth 0 after `)` or `}` and then an identifier starts a new statement (ASI).
      if (c === '\n' && depth === 0 && inStmt && (lastSig === ')' || lastSig === '}')) {
        let j = i; while (j < n && /\s/.test(text[j])) j++;
        if (j < n && ident.test(text[j])) { inStmt = false; }
      }
      i++; continue;
    }
    if (depth === 0 && ident.test(c)) {
      let j = i; while (j < n && /[A-Za-z0-9_$]/.test(text[j])) j++;
      const word = text.slice(i, j);
      if (!inStmt) { statements++; inStmt = true; }
      if (['const', 'let', 'var', 'class', 'function'].indexOf(word) >= 0) topLevel.push(word);
      if (word === 'async') { let k = j; while (k < n && /\s/.test(text[k])) k++; if (text.slice(k, k + 8) === 'function') topLevel.push('async function'); }
      lastSig = text[j - 1]; i = j; continue;
    }
    if (!inStmt) { statements++; inStmt = true; }
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') depth--;
    else if (c === ';' && depth === 0) { inStmt = false; lastSig = ';'; i++; continue; }
    lastSig = c; i++;
  }
  return { statements, topLevel, depthEnd: depth };
}

function kindOf(r) {
  if (/^js\/content\//.test(r)) return 'content';
  if (/^js\/cities\/packs\//.test(r)) return 'pack';
  if (r === 'js/cities/index.js') return 'cityindex';
  if (/^test\/stubs\//.test(r)) return 'stub';
  return 'wrapped';
}

const GHOST = (function () {      // a document that accepts anything, for files that touch the DOM while loading
  const target = function () {};
  const p = new Proxy(target, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : p), apply: () => p, construct: () => p, set: () => true });
  return p;
})();

const ALLOWED_TWICE = /defined twice|registered twice|already defined/;

module.exports = function (t) {
  /* ---- the scanner itself: a few known inputs, so the rest of the test can be trusted ---- */
  (function () {
    const sh = (s) => shape(load.strip(s).blank);
    t.eq(sh('(function () { var a = 1; })();').statements, 1, 'one wrapped statement counts as one');
    t.eq(sh('// c\n/* d */\nSB.module("X", function (SB) { return { f: function () {} }; });\n').statements, 1, 'comments do not count');
    t.eq(sh('(function () {})();\n(function () {})();').statements, 2, 'two statements count as two');
    t.eq(sh('(function () {})()\n(function () {})()').statements, 1, 'a call on the next line continues the same statement (that is how JavaScript reads it)');
    t.eq(sh('(function () {})()\nfoo()').statements, 2, 'an identifier at depth 0 after a closing bracket is a new statement');
    t.eq(sh('const x = 1;').topLevel, ['const'], 'a top-level const is seen');
    t.eq(sh('function f() {}').topLevel, ['function'], 'a top-level function declaration is seen');
    t.eq(sh('(function () { const x = 1; function g() {} })();').topLevel, [], 'declarations inside the wrapper are fine');
    t.eq(sh("(function () { var s = 'const x; var y;'; })();").statements, 1, 'a string holding keywords and semicolons is blanked');
    t.eq(sh("SB.Content.a = { t: 'x => y', u: \"function\" };").topLevel, [], 'words in strings are not declarations');
    t.ok(!/=>/.test(load.strip("SB.Content.a = { t: 'x => y' };").blank), 'an arrow inside a string is blanked');
    t.ok(/=>/.test(load.strip('SB.Content.a = { f: () => 1 };').blank), 'an arrow outside a string is kept');
  })();

  /* ---- every file under js/ ---- */
  const files = walk(path.join(ROOT, 'js'), []);
  ['js/ui', 'js/art', 'js/engine', 'js/content', 'js/cities'].forEach(d => {
    if (!fs.existsSync(path.join(ROOT, d))) t.note(d + ' does not exist yet: skipped');
  });
  if (!fs.existsSync(path.join(ROOT, 'js/cities/packs'))) t.note('js/cities/packs does not exist yet: no pack to check');
  if (!fs.existsSync(path.join(ROOT, 'index.html'))) t.note('index.html does not exist yet: the double-load test uses the file list of test/load.js');

  const stubFiles = walk(path.join(ROOT, 'test/stubs'), []).filter(f => !/\/_/.test(f.split(path.sep).join('/')));
  files.concat(stubFiles).forEach(f => {
    const r = rel(f), kind = kindOf(r);
    const src = fs.readFileSync(f, 'utf8');
    const s = load.strip(src);
    const sh = shape(s.blank);
    const body = s.blank.replace(/^\s+|\s+$/g, '');
    t.eq(sh.topLevel, [], r + ' has no top-level const, let, var, class or function declaration');
    t.eq(sh.depthEnd, 0, r + ' has balanced brackets');
    t.eq(sh.statements, 1, r + ' is exactly one statement');
    if (kind === 'wrapped' || kind === 'stub') {
      t.ok(/^\(\s*function\b/.test(body) || /^SB\.module\s*\(/.test(body), r + ' begins with (function or SB.module(');
    } else if (kind === 'content') {
      const name = path.basename(r, '.js').replace(/-([a-z])/g, (m, c) => c.toUpperCase());   // cutscene-audio.js assigns SB.Content.cutsceneAudio
      t.ok(new RegExp('^SB\\.Content\\.' + name + '\\s*=').test(body), r + ' is one assignment to SB.Content.' + name);
      t.ok(/;$/.test(body), r + ' ends with a semicolon');
      t.ok(!/\bfunction\b/.test(s.blank), r + ' has no function outside a string (a content file is data)');
      t.ok(!/=>/.test(s.blank), r + ' has no => outside a string (a content file is data)');
    } else if (kind === 'pack') {
      t.ok(/^SB\.Cities\.register\s*\(/.test(body), r + ' is one SB.Cities.register(...) call');
      t.ok(/;$/.test(body), r + ' ends with a semicolon');
    } else if (kind === 'cityindex') {
      t.ok(/^SB\.CityIndex\s*=/.test(body), r + ' is one assignment to SB.CityIndex');
      t.ok(/;$/.test(body), r + ' ends with a semicolon');
    }
  });
  t.ok(files.length >= 3, 'the three core files were checked (' + files.length + ' js files under js/)');

  /* ---- loading every file of index.html twice into one context ---- */
  let list, from;
  const indexPath = path.join(ROOT, 'index.html');
  if (fs.existsSync(indexPath)) {
    list = []; const re = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi; let m; const html = fs.readFileSync(indexPath, 'utf8');
    while ((m = re.exec(html))) list.push(m[1].replace(/^\.\//, '').split('?')[0]);
    from = 'index.html';
  } else {
    list = load.CORE.concat(load.CONTENT, load.CITIES, load.ENGINE).filter(f => fs.existsSync(path.join(ROOT, f)));
    from = 'load.js';
  }
  const ctx = vm.createContext({ document: GHOST, navigator: GHOST });
  const failures = [];
  [1, 2].forEach(pass => {
    list.forEach(f => {
      if (!fs.existsSync(path.join(ROOT, f))) { if (pass === 1) failures.push(f + ' is listed by ' + from + ' but does not exist'); return; }
      try { vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }); }
      catch (e) {
        const msg = (e && e.name ? e.name + ': ' : '') + (e && e.message);
        const okTwice = pass === 2 && e && e.name === 'SBError' && ALLOWED_TWICE.test(e.message);
        if (!okTwice) failures.push('pass ' + pass + ', ' + f + ': ' + msg);
      }
    });
  });
  t.eq(failures, [], 'loading the ' + list.length + ' files of ' + from + ' twice into one context throws only the "defined twice" errors');
  if (list.length) t.ok(list.some(f => /sb\.js$/.test(f)), from + ' lists js/core/sb.js');
};
