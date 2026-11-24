#!/usr/bin/env node
'use strict';
// tools/playtest.js — a text-only remote control for one headless Chrome, so an agent can play the game the way a
// player does (only what is on screen, only clicks and typing) without paying for screenshots.
//   node tools/playtest.js start [--fresh] [url]   launch Chrome (holds tools/.shots.lock) and load the game. Serves the
//                                          repo itself (tools/static.js) unless a url is given. Saves are kept between
//                                          runs; --fresh wipes them. If a driver is already up, it just shows the screen.
//   node tools/playtest.js look            what is on screen: text, then numbered things you can press or type in
//   node tools/playtest.js click N         press thing N from the last look (then prints a fresh look)
//   node tools/playtest.js type N "text"   type into field N (then prints a fresh look)
//   node tools/playtest.js key Enter       press a key
//   node tools/playtest.js wait S          let S seconds pass (cutscenes, animations), then look
//   node tools/playtest.js shot NAME       save a picture to design/shots/playtest/NAME.png (only when text is not enough)
//   node tools/playtest.js stop            close Chrome, free the lock
// Several at once: prefix every command with PT_SLOT=1 (or 2) for a second (third) separate game.
// Page errors that happened since the last command are printed under "!! errors".
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process'), http = require('http');
// PT_SLOT=1 (or 2...) runs a separate driver beside slot 0: its own ports, Chrome profile and no shared Chrome lock.
// One playtest Chrome is ~1.4 GB (measured 2026-11-23); keep it to three at once on a 16 GB machine.
const SLOT = Math.max(0, parseInt(process.env.PT_SLOT || '0', 10) || 0);
const ROOT = path.join(__dirname, '..'), CTL = 9491 + SLOT * 10, CDP = 9492 + SLOT * 10, STATIC = 9493 + SLOT * 10;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const [cmd, ...args] = process.argv.slice(2);

const LOOK = `(function () {
  var d = document, out = [], items = [], seen = {};
  function vis(e, off) { if (!e.getClientRects().length) return false; var r = e.getBoundingClientRect(), s = getComputedStyle(e);
    if (s.visibility === 'hidden' || +s.opacity === 0 || r.width < 2 || r.height < 2) return false;
    if (!off && (r.bottom < 0 || r.right < 0 || r.top > innerHeight || r.left > innerWidth)) return false;
    if (e.closest('[aria-hidden="true"]:not(.dk-hit *)') && !e.closest('.dk-hit')) return false;
    if (e.closest('.is-leaving')) return false; return true; }
  function clean(t) { return (t || '').replace(/\\s+/g, ' ').trim(); }
  d.querySelectorAll('[data-pt]').forEach(function (e) { e.removeAttribute('data-pt'); });
  var sel = '.dk-hit, button, a[href], [role="button"], [role="tab"], input, select, textarea, [tabindex="0"]';
  d.querySelectorAll(sel).forEach(function (e) {
    if (!vis(e, true) || e.closest('[data-pt]')) return;
    var lab = e.classList.contains('dk-hit') ? clean((e.querySelector('.dk-strip') || {}).textContent) + ' ' + clean((e.querySelector('.dk-state') || {}).textContent)
      : clean(((e.getAttribute('aria-label') || '') + ' ' + (e.innerText && e.innerText !== e.getAttribute('aria-label') ? '· ' + e.innerText : '')).trim() || e.value || e.placeholder || e.title || e.name);
    if (e.tagName === 'INPUT' || e.tagName === 'TEXTAREA') lab = '[field] ' + clean(e.placeholder || e.getAttribute('aria-label') || e.name) + ' = "' + e.value + '"';
    if (e.tagName === 'SELECT') lab = '[choose] ' + Array.prototype.map.call(e.options, function (o) { return (o.selected ? '*' : '') + o.text; }).join(' | ');
    var r = e.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, top = d.elementFromPoint(cx, cy);
    var blocked = top && !e.contains(top) && !top.contains(e) && !(top.closest && top.closest('.dk-hit') === e);
    items.push(e); e.setAttribute('data-pt', items.length);
    out.push('[' + items.length + '] ' + (clean(lab).slice(0, 90) || '(no label: ' + e.className.toString().slice(0, 40) + ')') + (e.disabled ? ' (greyed out)' : '') + (r.top > innerHeight || r.bottom < 0 ? ' (off screen: scroll or just click it)' : blocked ? ' (covered)' : ''));
  });
  var main = d.querySelector('[role="dialog"]:not([hidden])') ? null : null;
  var w = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT), n, lines = [], last = '';
  while ((n = w.nextNode())) { var p = n.parentElement; if (!p || p.closest('script,style,[data-pt]:not(.sb-tip):not(.wd-term)')) continue;
    var t = clean(n.textContent); if (!t || t === last || !vis(p)) continue; last = t; lines.push(t); }
  var txt = lines.join(' / ').replace(/( \\/ )+/g, ' / ');
  var r = window.SB && SB.UI && SB.UI.route ? SB.UI.route() : '?';
  return 'SCREEN: ' + r + '\\nTEXT: ' + txt.slice(0, 2500) + (txt.length > 2500 ? ' …(cut)' : '') + '\\nCAN PRESS:\\n' + out.join('\\n');
})()`;

/* ---------- client ---------- */
function call(body) {
  return new Promise((res, rej) => {
    const q = http.request({ host: '127.0.0.1', port: CTL, method: 'POST', path: '/', headers: { 'content-type': 'application/json' } }, r => {
      let s = ''; r.on('data', c => { s += c; }); r.on('end', () => res(s));
    });
    q.on('error', rej); q.end(JSON.stringify(body));
  });
}

/* ---------- server (holds Chrome) ---------- */
const free = port => new Promise(r => { const s = http.createServer(); s.once('error', () => r(false)); s.listen(port, '127.0.0.1', () => s.close(() => r(true))); });
async function serve(url, fresh) {
  // never touch a Chrome or a page that is not ours: a second driver used to wait on the lock, take it as stale after
  // 10 minutes, attach to the first driver's Chrome on the same debug port and reload the game mid-show
  if (!(await free(CTL)) || !(await free(CDP))) { console.error('a driver or Chrome is already on ports ' + CTL + '/' + CDP + '; not starting another'); process.exit(1); }
  const lock = SLOT ? { release() {} } : require('./withlock.js');
  if (!SLOT) await lock.take();
  const LOCKDIR = path.join(__dirname, '.shots.lock');
  if (!SLOT) setInterval(() => { try { const t = new Date(); fs.utimesSync(LOCKDIR, t, t); } catch (e) { /* gone */ } }, 60000); // keep our lock from looking stale
  if (!url) { await require('./static.js').start(STATIC); url = 'http://127.0.0.1:' + STATIC; }
  const prof = path.join(os.tmpdir(), 'sb-pt-profile' + (SLOT ? '-' + SLOT : '')); // kept between runs so saves survive a stop/start
  if (fresh) fs.rmSync(prof, { recursive: true, force: true });
  fs.mkdirSync(prof, { recursive: true });
  const chrome = cp.spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + CDP, '--user-data-dir=' + prof, '--window-size=1280,800', '--hide-scrollbars',
    '--no-first-run', '--no-default-browser-check', '--mute-audio', '--disable-extensions', '--disable-background-networking', '--disable-sync', 'about:blank'], { stdio: 'ignore' });
  const bye = () => { try { process.kill(chrome.pid, 'SIGKILL'); } catch (e) { /* gone */ } lock.release(); process.exit(0); };
  ['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(s => process.on(s, bye));
  let tgt = null;
  for (let i = 0; i < 80 && !tgt; i++) { try { tgt = (await (await fetch('http://127.0.0.1:' + CDP + '/json')).json()).find(t => t.type === 'page'); } catch (e) { /* not up */ } if (!tgt) await sleep(250); }
  if (!tgt) { console.error('Chrome did not start'); bye(); }
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pend = {}, errs = [];
  ws.onmessage = m => {
    const x = JSON.parse(m.data);
    if (x.id && pend[x.id]) { pend[x.id](x); delete pend[x.id]; return; }
    if (x.method === 'Runtime.exceptionThrown') { const d = x.params.exceptionDetails; errs.push('EXCEPTION ' + ((d.exception && d.exception.description) || d.text).split('\n')[0]); }
    if (x.method === 'Runtime.consoleAPICalled' && x.params.type === 'error') errs.push('console.error ' + x.params.args.map(a => a.value != null ? a.value : a.description).join(' ').slice(0, 200));
  };
  const send = (method, params) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const ev = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); return r.result.exceptionDetails ? 'JS ERROR ' + JSON.stringify(r.result.exceptionDetails.text) : r.result.result.value; };
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: url + '/index.html?t=' + Date.now() });
  await sleep(4000);
  const look = async () => { let s = await ev(LOOK); const e = errs.splice(0); if (e.length) s += '\n!! errors: ' + e.slice(0, 5).join(' || '); return s; };
  http.createServer((req, res) => {
    let b = ''; req.on('data', c => { b += c; }); req.on('end', async () => {
      const q = JSON.parse(b || '{}'); let out = '';
      try {
        if (q.cmd === 'look') out = await look();
        else if (q.cmd === 'click') {
          const r = await ev(`(function(){var e=document.querySelector('[data-pt="${+q.n}"]'); if(!e) return 'no thing ${+q.n} — look again'; e.scrollIntoView({block:'center'}); var r=e.getBoundingClientRect(); return JSON.stringify([r.left+r.width/2, r.top+r.height/2]);})()`);
          if (r[0] !== '[') out = r; else {
            const [x, y] = JSON.parse(r);
            for (const t of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type: t, x, y, button: 'left', clickCount: 1 });
            await sleep(1200); out = await look();
          }
        } else if (q.cmd === 'type') {
          await ev(`(function(){var e=document.querySelector('[data-pt="${+q.n}"]'); if(e){e.focus(); if(e.select) e.select();}})()`);
          await send('Input.insertText', { text: q.text }); await sleep(500); out = await look();
        } else if (q.cmd === 'key') {
          const kn = q.key === 'Space' ? ' ' : q.key, vk = { Enter: 13, Escape: 27, ' ': 32, Tab: 9, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39 }[kn] || 0;
          for (const t of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', Object.assign({ type: t, key: kn, code: kn === ' ' ? 'Space' : kn, windowsVirtualKeyCode: vk }, t === 'keyDown' && (kn === 'Enter' || kn === ' ') ? { text: kn === 'Enter' ? '\r' : ' ' } : {}));
          await sleep(800); out = await look();
        } else if (q.cmd === 'eval') { out = JSON.stringify(await ev(q.js)).slice(0, 4000);   // debugging only: never give this to a playtester
        } else if (q.cmd === 'wait') { await sleep(Math.min(30, +q.s || 2) * 1000); out = await look(); }
        else if (q.cmd === 'shot') {
          const dir = path.join(ROOT, 'design/shots/playtest'); fs.mkdirSync(dir, { recursive: true });
          const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: 60 }); const f = path.join(dir, (q.name || 'shot') + '.jpg');
          fs.writeFileSync(f, Buffer.from(r.result.data, 'base64')); out = 'saved ' + path.relative(ROOT, f);
        } else if (q.cmd === 'stop') { res.end('stopped'); return setTimeout(bye, 100); }
        else out = 'unknown command';
      } catch (e) { out = 'driver error: ' + e.message; }
      res.end(out);
    });
  }).listen(CTL, '127.0.0.1', () => console.log('ready'));
}

(async () => {
  if (cmd === '__serve') return serve(args[0] === '-' ? '' : args[0], args[1] === 'fresh');
  if (cmd === 'start') {
    try { const s = await call({ cmd: 'look' }); console.log('(already running — same game, not restarted)\n' + s); return; } catch (e) { /* not running: start one */ }
    const fresh = args.includes('--fresh'), url = args.find(a => a.startsWith('http')) || '-';
    const log = fs.openSync(path.join(os.tmpdir(), 'sb-playtest' + (SLOT ? '-' + SLOT : '') + '.log'), 'a');
    cp.spawn(process.execPath, [__filename, '__serve', url, fresh ? 'fresh' : ''], { detached: true, stdio: ['ignore', log, log] }).unref();
    for (let i = 0; i < 120; i++) { try { console.log(await call({ cmd: 'look' })); return; } catch (e) { await sleep(500); } }
    console.log('driver did not come up; see ' + path.join(os.tmpdir(), 'sb-playtest.log')); return;
  }
  const body = { cmd };
  if (cmd === 'click') body.n = args[0];
  if (cmd === 'type') { body.n = args[0]; body.text = args.slice(1).join(' '); }
  if (cmd === 'key') body.key = args[0];
  if (cmd === 'wait') body.s = args[0];
  if (cmd === 'shot') body.name = args[0];
  if (cmd === 'eval') body.js = args.join(' ');
  try { console.log(await call(body)); } catch (e) { console.log('driver not running — node tools/playtest.js start'); }
})();
