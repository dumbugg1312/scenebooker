#!/usr/bin/env node
'use strict';
// test/tutshots.js — plays the guided first show in headless Chrome (test/tutorial-walk.js) and saves a picture of
// every step to design/sample/tut-NN-STEP.png, 1280x800.
//   node test/tutshots.js [http://127.0.0.1:8792]      the preview server (python3 -m http.server 8792 --bind 127.0.0.1)
// No packages: Chrome is driven over its DevTools port with Node's own WebSocket and fetch (Node 22+).
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'design', 'sample');
const BASE = process.argv[2] || 'http://127.0.0.1:8792', PORT = 9478;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-tutshots-'));
  const ch = cp.spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, '--window-size=1280,800', '--hide-scrollbars', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
  let code = 1;
  try {
    let tgt = null;
    for (let i = 0; i < 60 && !tgt; i++) { try { tgt = (await (await fetch('http://127.0.0.1:' + PORT + '/json')).json()).find(t => t.type === 'page'); } catch (e) { /* not up yet */ } if (!tgt) await sleep(250); }
    if (!tgt) throw new Error('Chrome did not start');
    const ws = new WebSocket(tgt.webSocketDebuggerUrl);
    await new Promise(r => { ws.onopen = r; });
    let id = 0; const pend = {};
    ws.onmessage = m => { const x = JSON.parse(m.data); if (x.id && pend[x.id]) { pend[x.id](x); delete pend[x.id]; } };
    const send = (method, params) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
    const ev = async (expr) => {
      const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.result.exceptionDetails) throw new Error((r.result.exceptionDetails.exception && r.result.exceptionDetails.exception.description) || JSON.stringify(r.result.exceptionDetails));
      return r.result.result.value;
    };
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Page.enable');
    let ok = false;
    for (let t = 0; t < 6 && !ok; t++) {                 // a busy preview server can drop a script: load again
      await send('Page.navigate', { url: BASE + '/index.html?t=' + Date.now() });
      for (let i = 0; i < 30 && !ok; i++) {
        await sleep(400);
        ok = await ev("document.readyState === 'complete' && !!(window.SB && SB.UI && SB.UI.go && SB.verify && !SB.verify(['engine','cities','art','ui']).length && SB.Game && SB.Cutscene && SB.Scenes)").catch(() => false);
      }
    }
    if (!ok) throw new Error('the game did not load from ' + BASE);
    await ev(fs.readFileSync(path.join(__dirname, 'tutorial-walk.js'), 'utf8') + '; "ok"');
    /* a new Pensacola game from a cleared localStorage, the way the start screen makes one */
    await ev(`(async function () {
      localStorage.clear();
      await new Promise(function (res, rej) { SB.Cities.load('pensacola', function (e) { if (e) rej(e); else res(); }); });
      var st = SB.Game.newGame({ seed: 'pensacola-tutshots', citySlug: 'pensacola', bookingName: 'Extension Cord Booking', mark: { v: 1, seed: 'tutshots' },
                                 settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tune: null, tutorial: true });
      SB.UI.story.opening(st, function () { SB.UI.start(st); });
      return 'ok';
    })()`);
    await sleep(2500);
    const shot = async (name) => { const r = await send('Page.captureScreenshot', { format: 'png' }); const f = path.join(OUT, name); fs.writeFileSync(f, Buffer.from(r.result.data, 'base64')); console.log('saved ' + path.relative(ROOT, f)); };
    await shot('tut-00-OPENING.png');
    await ev(`(function () { var g = 0; while (document.querySelector('.cs-root') && g++ < 12) document.querySelector('.cs-root .cs-skip').click(); window.__walk = SBTutorialWalk({}); return __walk.phases.length; })()`);
    await sleep(600);
    const n = await ev('__walk.phases.length');
    for (let i = 0; i < n; i++) {
      const need = await ev('__walk.phases[' + i + '].need');
      for (let w = 0; need && w < 240 && !(await ev('!!document.querySelector(' + JSON.stringify(need) + ')')); w++) await sleep(500);
      const p = await ev('(function () { var p = __walk.phases[' + i + ']; p.run(); return { name: p.name, shot: p.shot, at: __walk.at() }; })()');
      console.log('ok ' + p.name + ' -> ' + p.at);
      if (p.shot) { await sleep(1400); await shot('tut-' + p.shot + '.png'); }
    }
    console.log(await ev('__walk.log[__walk.log.length - 2]'));
    code = 0;
    ws.close();
  } catch (e) { console.error('FAIL ' + (e && e.message)); }
  ch.kill();
  try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { /* fine */ }
  process.exit(code);
})();
