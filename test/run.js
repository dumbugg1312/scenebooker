#!/usr/bin/env node
'use strict';
// test/run.js — the entry point (06-harness section 2).
//   node test/run.js unit [filter...]        every test/unit/*.test.js, each in its own child process
//   node test/run.js bots [...]              require('./bots/run.js').main(argv, 'bots')
//   node test/run.js play [...]              require('./bots/run.js').main(argv, 'play')
//   node test/run.js balance [...]           require('./balance.js').main(argv, 'balance')
// Exit code 0 only when nothing failed.
//
// A unit test file exports `function (t)` (or an object whose function members are tests; each gets a t).
// t.eq(a, b, msg)           deep equality
// t.near(a, b, tol, msg)    |a - b| <= tol
// t.ok(v, msg)              truthy
// t.throws(fn, match, msg)  fn throws; match (optional): a substring, a RegExp or a constructor
// t.note(msg)               a line printed in the summary (a skipped folder, a missing file); never a failure
// t.fail(msg)               a failure
// Assertions do not stop the test: every failing message is collected. A thrown error fails the test.
const fs = require('fs'), path = require('path'), cp = require('child_process');

const MARK = '@@SB_TEST_RESULT@@';
const UNIT_DIR = path.join(__dirname, 'unit');

/* ---------------- the assertion kit ---------------- */

function show(v) {
  let s;
  try { s = typeof v === 'string' ? JSON.stringify(v) : (v === undefined ? 'undefined' : (typeof v === 'function' ? 'function' : JSON.stringify(v))); }
  catch (e) { s = String(v); }
  if (s === undefined) s = String(v);
  return s.length > 300 ? s.slice(0, 300) + '...' : s;
}

function deepEq(a, b) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number') return a !== a && b !== b;       // NaN equals NaN
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (let i = 0; i < ka.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(b, ka[i])) return false;
    if (!deepEq(a[ka[i]], b[ka[i]])) return false;
  }
  return true;
}

function makeT(sink) {
  function fail(msg) { sink.failures.push(sink.current + ': ' + msg); sink.asserts++; }
  function pass() { sink.asserts++; }
  const t = {
    eq(a, b, msg) { if (deepEq(a, b)) pass(); else fail((msg || 'eq') + ' — expected ' + show(b) + ', got ' + show(a)); },
    near(a, b, tol, msg) {
      if (typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) <= tol) pass();
      else fail((msg || 'near') + ' — expected ' + show(b) + ' ± ' + tol + ', got ' + show(a));
    },
    ok(v, msg) { if (v) pass(); else fail((msg || 'ok') + ' — got ' + show(v)); },
    throws(fn, match, msg) {
      let threw = false, err = null;
      try { fn(); } catch (e) { threw = true; err = e; }
      if (!threw) return fail((msg || 'throws') + ' — nothing was thrown');
      if (match === undefined || match === null) return pass();
      const text = err && err.message !== undefined ? String(err.message) : String(err);
      let good;
      if (typeof match === 'string') good = text.indexOf(match) >= 0;
      else if (match instanceof RegExp) good = match.test(text);
      else if (typeof match === 'function') good = err instanceof match;
      else good = true;
      if (good) pass(); else fail((msg || 'throws') + ' — wrong error: ' + show(text));
    },
    note(msg) { sink.notes.push(sink.current + ': ' + msg); },
    fail(msg) { fail(msg || 'failed'); }
  };
  return t;
}

/* ---------------- child: run one test file ---------------- */

async function runFile(file) {
  const sink = { failures: [], notes: [], asserts: 0, current: path.basename(file) };
  const t = makeT(sink);
  let mod;
  try { mod = require(file); }
  catch (e) { sink.failures.push('could not load ' + path.basename(file) + ': ' + (e && e.stack ? e.stack.split('\n').slice(0, 4).join(' | ') : e)); return sink; }
  const tests = [];
  if (typeof mod === 'function') tests.push([path.basename(file).replace(/\.test\.js$/, ''), mod]);
  else if (mod && typeof mod === 'object') Object.keys(mod).forEach(k => { if (typeof mod[k] === 'function') tests.push([k, mod[k]]); });
  if (!tests.length) sink.failures.push(path.basename(file) + ' exports no test function');
  for (const [name, fn] of tests) {
    sink.current = name;
    try { await fn(t); }
    catch (e) {
      const where = e && e.stack ? String(e.stack).split('\n').slice(0, 3).join(' | ') : String(e);
      sink.failures.push(name + ': threw — ' + (e && e.message ? e.message : where) + (e && e.file ? ' [' + e.file + ']' : ''));
    }
  }
  return sink;
}

/* ---------------- parent: unit ---------------- */

function unit(filters) {
  let files = fs.existsSync(UNIT_DIR) ? fs.readdirSync(UNIT_DIR).filter(f => /\.test\.js$/.test(f)).sort() : [];
  if (filters.length) files = files.filter(f => filters.some(x => f.indexOf(x) >= 0));
  if (!files.length) { console.log('no unit test files found in ' + UNIT_DIR); return 1; }
  const started = Date.now();
  let bad = 0, totalAsserts = 0;
  files.forEach(f => {
    const t0 = Date.now();
    const r = cp.spawnSync(process.execPath, [__filename, '--child', path.join(UNIT_DIR, f)],
                           { encoding: 'utf8', timeout: 120000, maxBuffer: 64 * 1024 * 1024 });
    let res = null;
    const lines = String(r.stdout || '').split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].indexOf(MARK) === 0) { try { res = JSON.parse(lines[i].slice(MARK.length)); } catch (e) { res = null; } break; }
    }
    const ms = Date.now() - t0;
    if (!res) {
      bad++;
      const why = r.error && r.error.code === 'ETIMEDOUT' ? 'timed out after 120 s'
        : 'the test process died (exit ' + r.status + (r.signal ? ', ' + r.signal : '') + ') without reporting';
      console.log('FAIL  ' + f + '  (' + ms + ' ms)');
      console.log('      ' + why);
      String(r.stderr || '').split('\n').filter(Boolean).slice(0, 8).forEach(l => console.log('      ' + l));
      return;
    }
    totalAsserts += res.asserts;
    const failed = res.failures.length > 0;
    if (failed) bad++;
    console.log((failed ? 'FAIL  ' : 'PASS  ') + f + '  (' + res.asserts + ' assertions, ' + ms + ' ms)');
    res.failures.forEach(m => console.log('      x ' + m));
    res.notes.forEach(m => console.log('      note: ' + m));
  });
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  console.log('\n' + (files.length - bad) + ' of ' + files.length + ' test files passed, ' + totalAsserts + ' assertions, ' + secs + ' s');
  return bad ? 1 : 0;
}

/* ---------------- parent: the other commands ---------------- */

function dispatch(cmd, argv, rel, exportName) {
  const file = path.join(__dirname, rel);
  if (!fs.existsSync(file)) {
    console.error('"' + cmd + '" is not available yet: test/' + rel + ' does not exist (the second TEST delivery writes it).');
    return Promise.resolve(1);
  }
  let mod;
  try { mod = require(file); } catch (e) { console.error('could not load test/' + rel + ': ' + (e && e.stack || e)); return Promise.resolve(1); }
  if (!mod || typeof mod[exportName] !== 'function') {
    console.error('test/' + rel + ' does not export ' + exportName + '(argv)');
    return Promise.resolve(1);
  }
  return Promise.resolve().then(() => mod[exportName](argv, cmd)).then(r => (typeof r === 'number' ? r : 0))
    .catch(e => { console.error(e && e.stack || e); return 1; });
}

function usage() {
  console.log('usage: node test/run.js unit [filter...] | bots [opts] | balance | play --seed X --bot checklist --weeks 30 --dump');
  return 1;
}

/* ---------------- main ---------------- */

(async function main() {
  const a = process.argv.slice(2);
  if (a[0] === '--child') {
    const sink = await runFile(a[1]);
    process.stdout.write('\n' + MARK + JSON.stringify({ failures: sink.failures, notes: sink.notes, asserts: sink.asserts }) + '\n');
    process.exit(0);
  }
  let code;
  switch (a[0]) {
    case 'unit': code = unit(a.slice(1)); break;
    case 'bots': code = await dispatch('bots', a.slice(1), 'bots/run.js', 'main'); break;
    case 'play': code = await dispatch('play', a.slice(1), 'bots/run.js', 'main'); break;
    case 'balance': code = await dispatch('balance', a.slice(1), 'balance.js', 'main'); break;
    default: code = usage();
  }
  process.exit(code);
})();
