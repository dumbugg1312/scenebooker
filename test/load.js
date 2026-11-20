// test/load.js — loads core, content, cities and engine into Node exactly as the browser's script tags do.
// 06-harness section 1, plus two extensions (both noted below):
//   opts.real   an optional array of file paths relative to the root; when given, an engine file is loaded for
//               real only if it is in that array, and every other engine module comes from its stub.
//   a fresh SB: each call starts from a clean global, so one process can load more than once.
// A file that throws while loading is rethrown with its name in the message.
const vm = require('vm'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');

const CORE    = ['js/core/sb.js', 'js/core/enums.js', 'js/core/config.js'];
const CONTENT = ['strings', 'names', 'requests', 'jobs', 'feedback', 'events', 'people', 'legacy', 'notebook', 'story', 'bandNames'].map(f => 'js/content/' + f + '.js');
const CITIES  = ['js/cities/cities.js', 'js/cities/index.js'];
const ENGINE  = [
  'show/model', 'show/notebook', 'show/forecast', 'show/night', 'show/feedback',
  'world/worldgen', 'world/bands', 'world/rooms', 'world/requests', 'world/trends', 'world/crowd', 'world/territory',
  'story/effects', 'story/director', 'story/people', 'story/harm', 'story/legacy', 'story/chapters', 'story/moments', 'story/tutorial', 'story/rungs', 'story/patches',
  'week/money', 'week/stress', 'week/mail', 'week/shows', 'week/jobs', 'week/week', 'week/save', 'week/game'
].map(f => 'js/engine/' + f + '.js');

function exists(rel) { return fs.existsSync(path.join(ROOT, rel)); }

function run(rel) {
  let src;
  try {
    src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    vm.runInThisContext(src, { filename: rel });
  } catch (e) {
    const err = new Error('loading ' + rel + ': ' + (e && e.message ? e.message : String(e)));
    err.name = (e && e.name) || 'Error';
    err.file = rel;
    err.cause = e;
    if (e && e.stack) err.stack = err.name + ': ' + err.message + '\n' + String(e.stack).split('\n').slice(1).join('\n');
    throw err;
  }
}

// strip(src) -> { code, blank }. Both have every comment removed (block comments keep their line breaks so line
// numbers survive). In `blank` the insides of string literals, template text and regular expressions are also
// blanked to spaces (their quotes stay), so a search of `blank` sees only code: an object key `window:` or a
// string 'Windows' is never an identifier. Template `${ ... }` holes are code and stay. Used by scope.test and
// purity.test, and available to the other tests.
function strip(src) {
  const n = src.length;
  let code = '', blank = '', i = 0, last = '', lastWord = '';
  const stack = [];                        // open template holes: brace depth inside each
  let depth = 0;
  const REGEX_AFTER = '(,=:[!&|?{};+-*%<>~^';
  const REGEX_WORDS = ['return', 'typeof', 'case', 'in', 'of', 'delete', 'void', 'throw', 'new', 'else', 'do', 'instanceof'];
  function both(c) { code += c; blank += c; }
  function copyBlankSpaces(c) { code += c; blank += (c === '\n' ? '\n' : ' '); }
  function readString(q) {
    both(q); i++;
    while (i < n && src[i] !== q) {
      if (src[i] === '\\') { copyBlankSpaces(src[i]); i++; if (i < n) { copyBlankSpaces(src[i]); i++; } continue; }
      if (src[i] === '\n') break;
      copyBlankSpaces(src[i]); i++;
    }
    if (i < n && src[i] === q) { both(q); i++; }
  }
  function readTemplate() {              // positioned after the opening backtick or after a hole's closing brace
    while (i < n) {
      const c = src[i];
      if (c === '\\') { copyBlankSpaces(c); i++; if (i < n) { copyBlankSpaces(src[i]); i++; } continue; }
      if (c === '`') { both('`'); i++; return false; }
      if (c === '$' && src[i + 1] === '{') { both('${'); i += 2; stack.push(depth); depth = 0; return true; }
      copyBlankSpaces(c); i++;
    }
    return false;
  }
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; code += ' '; blank += ' '; continue; }
    if (c === '/' && d === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') both('\n'); i++; }
      i += 2; both(' '); continue;
    }
    if (c === '"' || c === "'") { readString(c); last = '"'; lastWord = ''; continue; }
    if (c === '`') { both('`'); i++; readTemplate(); last = '`'; lastWord = ''; continue; }
    if (c === '/') {
      const afterRegex = last === '' || REGEX_AFTER.indexOf(last) >= 0 || REGEX_WORDS.indexOf(lastWord) >= 0;
      if (afterRegex) {
        both('/'); i++;
        let inClass = false;
        while (i < n && src[i] !== '\n') {
          const e = src[i];
          if (e === '\\') { copyBlankSpaces(e); i++; if (i < n) { copyBlankSpaces(src[i]); i++; } continue; }
          if (e === '[') inClass = true; else if (e === ']') inClass = false;
          else if (e === '/' && !inClass) break;
          copyBlankSpaces(e); i++;
        }
        if (i < n && src[i] === '/') { both('/'); i++; }
        last = '/'; lastWord = ''; continue;
      }
    }
    if (c === '{') depth++;
    if (c === '}') {
      if (stack.length && depth === 0) { both('}'); i++; depth = stack.pop(); readTemplate(); last = '`'; continue; }
      depth--;
    }
    both(c); i++;
    if (/[A-Za-z0-9_$]/.test(c)) { lastWord = /[A-Za-z0-9_$]/.test(src[i - 2] || '') ? lastWord + c : c; last = 'a'; }
    else if (!/\s/.test(c)) { last = c; lastWord = ''; }
  }
  return { code, blank };
}

function norm(p) { return String(p).replace(/\\/g, '/').replace(/^\.\//, ''); }

function load(opts) {            // opts: { stubs: bool, packs: [slug], text: bool, real: [path] }
  opts = opts || {};
  delete globalThis.SB;          // extension: a clean slate, so a process can load more than once
  CORE.forEach(run);
  CONTENT.concat(CITIES).forEach(f => { if (exists(f)) run(f); });
  const real = Array.isArray(opts.real) ? opts.real.map(norm) : null;
  ENGINE.forEach(f => {
    const stub = 'test/stubs/' + path.basename(f);
    if (real) {
      if (real.indexOf(f) >= 0) run(f); else run(stub);                // extension: only the named files are real
    } else if (exists(f)) run(f);
    else if (opts.stubs) run(stub);                                    // a stub with the same module name
  });
  // SPEC?: the spec runs every pack unconditionally, which throws while no pack exists. When the caller did not
  // name packs, the default 'pensacola' is skipped if its file is absent; a named pack that is absent still throws.
  const named = Array.isArray(opts.packs);
  (named ? opts.packs : ['pensacola']).forEach(slug => {
    const rel = 'js/cities/packs/' + slug + '.js';
    if (!named && !exists(rel)) return;
    run(rel);
  });
  SB.text.off = opts.text === false;
  SB.log.echo = false;
  return globalThis.SB;
}

load.ROOT = ROOT;
load.CORE = CORE;
load.CONTENT = CONTENT;
load.CITIES = CITIES;
load.ENGINE = ENGINE;
load.run = run;
load.strip = strip;
module.exports = load;
