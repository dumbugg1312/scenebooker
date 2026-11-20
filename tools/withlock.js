#!/usr/bin/env node
'use strict';
// tools/withlock.js — run one command while holding the Chrome lock tools/shots.js uses (tools/.shots.lock), so a
// Chrome that another tool starts (test/tutshots.js, tools/walk.js) never runs beside another one.
//   node tools/withlock.js node test/tutshots.js
// The lock is a directory; a lock older than 10 minutes, or whose owner is gone, is taken over. Removed on exit.
const fs = require('fs'), path = require('path'), cp = require('child_process');
const LOCK = path.join(__dirname, '.shots.lock'), STALE_MS = 10 * 60 * 1000;
const sleep = ms => new Promise(r => setTimeout(r, ms));
let have = false, child = null;
function alive(pid) { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } }
async function take() {
  let said = false;
  for (;;) {
    try { fs.mkdirSync(LOCK); fs.writeFileSync(path.join(LOCK, 'owner'), process.pid + ' ' + Date.now()); have = true; return; }
    catch (e) {
      if (e.code !== 'EEXIST') throw e;
      let age = Infinity, pid = 0;
      try { age = Date.now() - fs.statSync(LOCK).mtimeMs; pid = parseInt(fs.readFileSync(path.join(LOCK, 'owner'), 'utf8'), 10) || 0; } catch (e2) { /* gone */ }
      if (age > STALE_MS || (pid && !alive(pid) && age > 3000)) { try { fs.rmSync(LOCK, { recursive: true, force: true }); } catch (e3) { /* retry */ } continue; }
      if (!said) { console.error('waiting for the Chrome lock (held by pid ' + (pid || '?') + ')...'); said = true; }
      await sleep(2000);
    }
  }
}
function release() { if (have) { try { fs.rmSync(LOCK, { recursive: true, force: true }); } catch (e) { /* fine */ } have = false; } }
module.exports = { take, release };
if (require.main === module) {
  process.on('exit', release);
  ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(sg => process.on(sg, () => { if (child) try { child.kill(sg); } catch (e) { /* gone */ } release(); process.exit(130); }));
  (async () => {
    const args = process.argv.slice(2);
    if (!args.length) { console.error('usage: node tools/withlock.js <command> [args...]'); process.exit(2); }
    await take();
    child = cp.spawn(args[0], args.slice(1), { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    child.on('exit', code => { release(); process.exit(code == null ? 1 : code); });
  })();
}
