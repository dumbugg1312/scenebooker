#!/usr/bin/env node
'use strict';
// test/shots.js — pictures of the screens at the stage sizes the polish brief names, for before/after checks.
//   node test/shots.js <label> [--only phone,desk] [--sizes 1280x800,1920x1080,3840x2160] [--port 9479] [--base http://127.0.0.1:8792]
//   node test/shots.js --list                      the groups and their views
// Saves design/shots/<label>/<view>-<W>x<H>.png and prints a probe for each: the held close-up's box as a share of the
// stage (or the main screen's box in px), and any container that got scrolled. A new Pensacola game (tutorial on,
// opening skipped); a group with `walk` first plays the guided show (test/tutorial-walk.js) through that step. Each
// view is reached the way a player reaches it. One headless Chrome per run (RAM): parallel runs need different --port.
// The group 'frames' steps the phone's entrance and exit frame by frame.
// No packages: Chrome over its DevTools port with Node's own WebSocket and fetch (Node 22+).
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const LABEL = args[0] && !args[0].startsWith('--') ? args[0] : 'now';
const SIZES = opt('sizes', '1280x800,1920x1080,3840x2160').split(',').map(s => s.split('x').map(Number));
const ONLY = opt('only', 'desk,phone').split(',');
const BASE = opt('base', 'http://127.0.0.1:8792'), PORT = Number(opt('port', 9479));
const OUT = path.join(ROOT, 'design', 'shots', LABEL);
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const first = (coll) => `(function () { var s = SB.UI.game(), o = s && s.${coll} || {}, k = Object.keys(o); return k.length ? k[0] : null; })()`;
const tutShow = `(function () { var s = SB.UI.game(), c = SB.Tutorial && SB.Tutorial.current(s); if (c && c.showId) return c.showId; var k = Object.keys(s.shows || {}); return k[k.length - 1]; })()`;
const click = (sel) => `(document.querySelector(${JSON.stringify(sel)}) || { click: function () {} }).click()`;

/* each group: walk (a step of the guided show to play through first), noGame, skipCut, and its views:
   [name, how to get there from wherever the last view left off (a page expression), settle ms] */
const GROUPS = {
  desk: { views: [['desk', "SB.UI.go('desk')", 2500]] },
  deskfull: { tutorial: false, views: [['desk-full', "SB.UI.go('desk')", 3000]] },
  desklate: { walk: 'close-out: the week closes', views: [['desk-late', "SB.UI.go('desk')", 3000]] },
  phone: { views: [
    ['phone-list', "SB.UI.go('inbox')"],
    ['phone-answer', click('#main .ph-hero-need')],
    ['phone-chat', "(document.querySelector('#main .ph-row[data-tut=\"req-row\"]') || document.querySelector('#main .ph-row')).click()"],
    ['phone-page', click('#main [data-fk="tab-seg-page"]')],
    ['phone-pass', click('#main [data-fk="tab-PASS"]')]
  ] },
  /* the show's card: every part of the show on one clipboard; the pickers for a few of its rows */
  card: { walk: 'sound: asked, answered', views: [
    ['card', `SB.UI.go('show', { showId: ${tutShow} })`],
    ['card-room', click('#main [data-fk="row-room"]')],
    ['card-band', click('#main [data-tut-ref="band"]')],
    ['card-sheet', click('#main [data-fk="another"]')],
    ['card-flyer', click('#main [data-fk="row-flyer"]')],
    ['card-promo', click('#main [data-fk="row-promo"]')],
    ['card-prep', click('#main [data-fk="row-prep"]')],
    ['card-price', click('#main [data-fk="row-price"]')],
    ['card-deal', click('#main [data-fk="row-deal"]')]
  ] },
  cardnew: { views: [
    ['card-new', "(document.querySelector('#desk .dk-hit[data-obj=\"phone\"]') || { click: function () {} }).click(); (document.querySelector('#main .ph-row[data-tut=\"req-row\"]') || document.querySelector('#main .ph-row')).click(); " + click('#main [data-fk="tab-BOOK"]')],
    ['card-offer', click('#main [data-fk="row-offer"]')],
    ['card-hold-asked', click('#main [data-fk="row-room"]') + '; ' + click('#main [data-fk="hold"]')],
    ['card-offer-asked', click('#main [data-fk="row-offer"]') + '; ' + click('#main [data-fk="send-offer"]')]
  ] },
  calendar: { walk: 'promo: jobs on days, done', views: [['week', "SB.UI.go('week')", 2200]] },
  close: { walk: 'close-out: the week closes', views: [['close', "SB.UI.route() === 'close' || SB.UI.go('close')", 2500]] },
  clipboard: { walk: 'sound: asked, answered', views: [
    ['shows', "SB.UI.go('shows')"],
    ['show', `SB.UI.go('show', { showId: ${tutShow} })`],
    ['bill', `SB.UI.go('bill', { showId: ${tutShow} })`]
  ] },
  record: { walk: 'close-out: back to the desk', views: [['record', `SB.UI.go('show', { showId: ${tutShow} })`, 2200]] },
  sheet: { views: [['bands', "SB.UI.go('bands')"], ['band', `SB.UI.go('band', { bandId: ${first('bands')} })`]] },
  keys: { views: [['rooms', "SB.UI.go('rooms')"], ['room', `SB.UI.go('room', { roomId: ${first('rooms')} })`]] },
  paper: { walk: 'close-out: back to the desk', views: [['money', "SB.UI.go('money')"], ['legacy', "SB.UI.go('legacy')"], ['town', "SB.UI.go('town')", 2200]] },
  books: { views: [['notebook', "SB.UI.go('notebook')"], ['people', "SB.UI.go('people')"], ['settings', "SB.UI.go('settings')"]] },
  night: { walk: 'door: open the doors', views: [['night', '1', 2500]] },
  settle: { walk: 'settle: the envelope', views: [['settle', '1', 2500]] },
  flyerdesk: { walk: 'flyer: the flyer desk', views: [['flyerdesk', "SB.UI.route() === 'flyerdesk' || SB.UI.go('flyerdesk')", 2500]] },
  jacket: { walk: 'close-out: the week closes', views: [['jacket', "SB.UI.go('jacket')", 2200]] },
  start: { noGame: true, views: [['start', "SB.UI.route() === 'start' || SB.UI.go('start')", 2500], ['city', "SB.UI.go('city')", 2500]] },
  cutscene: { skipCut: false, views: [['cutscene', '1', 2500]] },
  pause: { views: [['pause', "SB.UI.go('desk'); SB.Pause.open()", 1500], ['pause-title', "SB.Pause.close(); SB.UI.quit(); setTimeout(function () { SB.Pause.open(); }, 900)", 2600]] },
  shell: { views: [['card', "SB.UI.go('desk'); SB.DeskCloseup.stress()", 1500],
                   ['toast', "var b = document.querySelector('.sb-card .cu-down'); if (b) b.click(); SB.UI.toast('A toast to check the finish.')", 900]] },
  frames: { special: true }
};
if (args.indexOf('--list') >= 0) {
  Object.keys(GROUPS).forEach(g => console.log(g.padEnd(10), (GROUPS[g].walk ? '[walk to: ' + GROUPS[g].walk + '] ' : '') + (GROUPS[g].views || [['(phone entrance and exit, frame by frame)']]).map(v => v[0]).join(', ')));
  process.exit(0);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-shots-'));
  const ch = cp.spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, '--window-size=1280,800', '--no-first-run', '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });
  let code = 1;
  try {
    let tgt = null;
    for (let i = 0; i < 60 && !tgt; i++) { try { tgt = (await (await fetch('http://127.0.0.1:' + PORT + '/json')).json()).find(t => t.type === 'page'); } catch (e) { /* not up */ } if (!tgt) await sleep(250); }
    if (!tgt) throw new Error('Chrome did not start on port ' + PORT);
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
    const capture = async (name, W, H) => {
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const f = path.join(OUT, name + '-' + W + 'x' + H + '.png');
      fs.writeFileSync(f, Buffer.from(r.result.data, 'base64'));
      const probe = await ev(`(function () {
        var o = document.querySelector('#main .cu-obj') || document.querySelector('#main > *'), r = o && o.getBoundingClientRect(), sc = [],
            st = document.querySelector('#main .cu-stage'), sr = st && st.getBoundingClientRect();
        document.querySelectorAll('#main, #main *').forEach(function (e) { var oy = getComputedStyle(e).overflowY; if (e.scrollTop > 0 && oy !== 'auto' && oy !== 'scroll') sc.push(String(e.className || e.tagName).slice(0, 40) + ':' + e.scrollTop); });
        var box = !r ? 'nothing in #main' : (sr ? 'stage% ' + ((r.left - sr.left) / sr.width * 100).toFixed(1) + ',' + ((r.top - sr.top) / sr.height * 100).toFixed(1) + ' ' + (r.width / sr.width * 100).toFixed(1) + 'x' + (r.height / sr.height * 100).toFixed(1)
                                                 : 'box ' + Math.round(r.left) + ',' + Math.round(r.top) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
        var mid = document.elementFromPoint(innerWidth / 2, innerHeight / 2), top = mid ? String(mid.className || mid.tagName).slice(0, 30) : '-';
        return SB.UI.route() + ' ' + box + (sc.length ? '  SCROLLED ' + sc.join(' ') : '') + (SB.UI.route() === 'desk' ? '  centre: ' + top : '');
      })()`).catch(() => '');
      console.log('saved ' + path.relative(ROOT, f) + '  ' + probe);
    };
    await send('Page.enable');
    /* a fresh profile per run, so the cache only ever holds this run's files: reloads between groups stay quick */
    for (const [W, H] of SIZES) {
      await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
      let lastWalk = null;                              // groups that play to the same step share one playthrough
      for (const gname of ONLY) {
        const g = GROUPS[gname];
        if (!g) { console.log('no group ' + gname + ' (node test/shots.js --list)'); continue; }
        const shared = !!(g.walk && g.walk === lastWalk);
        lastWalk = g.walk || null;
        let ok = shared;
        for (let t = 0; t < 6 && !ok; t++) {
          await send('Page.navigate', { url: BASE + '/index.html?t=' + Date.now() });
          for (let i = 0; i < 75 && !ok; i++) {
            await sleep(400);
            /* every script and every stylesheet: the local server can drop a request under load, and a page without one
               of its stylesheets draws the desk's pictures as bare thumbnails down a scrolling page */
            ok = await ev("document.readyState === 'complete' && !!(window.SB && SB.UI && SB.UI.go && SB.Game && SB.Cutscene && SB.Scenes && SB.verify && !SB.verify(['engine','cities','art','ui']).length && (!SB.Boot || SB.Boot.done()))" +
                          " && Array.prototype.every.call(document.querySelectorAll('link[rel=stylesheet]'), function (l) { try { return !!(l.sheet && l.sheet.cssRules); } catch (e) { return false; } })").catch(() => false);
          }
        }
        if (!ok) throw new Error('the game did not load from ' + BASE);
        if (shared) { /* same game, same step: go straight to the views */ }
        else if (!g.noGame) {
          await ev(`(async function () {
            localStorage.clear();
            await new Promise(function (res, rej) { SB.Cities.load('pensacola', function (e) { if (e) rej(e); else res(); }); });
            var st = SB.Game.newGame({ seed: 'pensacola-shots', citySlug: 'pensacola', bookingName: 'Extension Cord Booking', mark: { v: 1, seed: 'shots' },
                                       settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tune: null, tutorial: ${g.tutorial === false ? 'false' : 'true'} });
            SB.UI.story.opening(st, function () { SB.UI.start(st); });
            return 'ok';
          })()`);
          await sleep(2000);
          if (g.skipCut !== false) {
            await ev(`(function () { var n = 0; while (document.querySelector('.cs-root') && n++ < 12) document.querySelector('.cs-root .cs-skip').click(); return n; })()`);
            await sleep(1200);
          }
        } else await ev('localStorage.clear(); 1');
        if (g.walk && !shared) {
          await ev(fs.readFileSync(path.join(__dirname, 'tutorial-walk.js'), 'utf8') + '; window.__walk = SBTutorialWalk({}); 1');
          const n = await ev('__walk.phases.length');
          let done = false;
          for (let i = 0; i < n && !done; i++) {
            const need = await ev('__walk.phases[' + i + '].need');
            for (let w = 0; need && w < 240 && !(await ev('!!document.querySelector(' + JSON.stringify(need) + ')')); w++) await sleep(500);
            const name = await ev('(function () { var p = __walk.phases[' + i + ']; p.run(); return p.name; })()');
            await sleep(700);
            if (name.indexOf(g.walk) >= 0) done = true;
          }
          if (!done) throw new Error('the walk never reached "' + g.walk + '"');
          await ev(`(function () { var n = 0; while (document.querySelector('.cs-root') && n++ < 12) document.querySelector('.cs-root .cs-skip').click(); return n; })()`);
          await sleep(1200);
        }
        if (gname === 'frames') {
          /* the phone's entrance and exit, frame by frame: every animation paused and stepped to an exact time (the
             count-up runs on timers, so its number is set to what it shows at that time) */
          const step = async (t, name) => {
            await ev(`(function () { document.getAnimations().forEach(function (a) { a.pause(); a.currentTime = ${t}; });
              var n = document.querySelector('.ph-hero-need .ph-hn-n'); if (n) n.textContent = ${t} < 386 ? '0' : (${t} < 469 ? '1' : '2'); return 1; })()`);
            await sleep(120);
            await capture(name, W, H);
          };
          await ev("SB.UI.go('desk'); 1"); await sleep(1500);
          await ev("SB.UI.go('inbox'); document.getAnimations().forEach(function (a) { a.pause(); a.currentTime = 0; }); 1");
          await sleep(900);                                 // the copier's pictures arrive while the moves are held
          for (const t of [40, 125, 210, 300, 390, 480, 600]) await step(t, 'in-' + String(t).padStart(3, '0'));
          await ev("document.getAnimations().forEach(function (a) { try { a.finish(); } catch (e) { a.play(); } }); document.querySelector('#main .cu-down').click(); document.getAnimations().forEach(function (a) { a.pause(); a.currentTime = 0; }); 1");
          for (const t of [40, 125, 210]) await step(t, 'out-' + String(t).padStart(3, '0'));
          continue;
        }
        for (const [name, how, settle] of (g.views || [])) {
          await ev('(function () { ' + how + '; return 1; })()').catch(e => console.log('  (' + name + ': ' + e.message.split('\n')[0] + ')'));
          await sleep(settle || 1600);
          await capture(name, W, H);
        }
      }
    }
    code = 0;
    ws.close();
  } catch (e) { console.error('FAIL ' + (e && e.message)); }
  ch.kill();
  try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { /* fine */ }
  process.exit(code);
})();
