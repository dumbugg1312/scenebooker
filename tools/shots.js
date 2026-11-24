#!/usr/bin/env node
'use strict';
// tools/shots.js — the screenshot tool: saves 1280x800 PNGs of Scene Booker's screens from headless Chrome.
//   node tools/shots.js --list                          every shot name, one line each
//   node tools/shots.js <name> [<name>...] [--out dir]  those shots   (default dir design/shots/current)
//   node tools/shots.js --all [--out dir]               every shot
//   --url http://127.0.0.1:8792                         the preview server (started here if it does not answer)
//   --reach                                             also list every button or field a player cannot get to on each shot:
//                                                       past the stage edge, clipped by a box that does not scroll, or covered
//                                                       by something drawn on top. Exit 1 when one is out of reach (OFF);
//                                                       covered ones (UNDER) are printed to check by eye.
//   --scale 1.5                                         the text-size setting to shoot at (1, 1.25, 1.5); run --reach at 1.5,
//                                                       the biggest, where things run out of room first. Known quirk
//                                                       (2026-11-24): the start flow is right at 1.5 here, but the mid-game
//                                                       shots came out laid out wrong in headless Chrome at 1.5 (fine in a
//                                                       real browser), so check in-game screens at big text in a real one
// No packages: Chrome is driven over its DevTools port with Node's own WebSocket and fetch (Node 22+), the way
// test/tutshots.js does. ONE Chrome at a time on the whole machine: tools/.shots.lock (a directory) is taken first, waited
// for when someone else holds it, and recovered when it is older than 10 minutes (or its owner is gone). Chrome, its
// temp profile and the lock are removed when the run ends, even on an error or ctrl-C.
// Fresh-game shots play the start screen's own clicks. Mid-game shots load a game that a bot played in Node
// (test/bots/run.js, the Checklist bot, Pensacola, 9 weeks, tutorial off) into the page with SB.Save.importText +
// SB.UI.start, so --all builds it once. A shot that cannot be reached is skipped with a printed note.
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.join(__dirname, '..');
const LOCK = path.join(__dirname, '.shots.lock'), STALE_MS = 10 * 60 * 1000;
const PORT = 9481;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ------------------------------------------------------------------ the shots ------------------------------------------------------------------ */
// kind: 'fresh' (the start flow, in order), or a state key: mid | close | night
// go: [route, params-expression] ; after: an optional page-side async function body run after the route is mounted
const SHOTS = [
  { name: 'start', kind: 'fresh', desc: 'the start screen of a new browser (no game, no saves)' },
  { name: 'city', kind: 'fresh', desc: 'start flow: choose your city' },
  { name: 'tune', kind: 'fresh', desc: 'start flow: tune the city (the questions about your scene)' },
  { name: 'opening', kind: 'fresh', desc: 'the opening cutscene (the going-away show)' },
  { name: 'ask', kind: 'fresh', desc: 'the setup asked in the going-away show: the first question (bills)' },
  { name: 'name', kind: 'fresh', desc: 'the going-away show: name your booking outfit, with the marks and the flyer' },
  { name: 'desk-fresh', kind: 'fresh', desc: 'the desk of a fresh game with the guided first show on (tutorial tape)' },

  { name: 'desk', kind: 'mid', desc: 'the desk, week 9 of a Pensacola game (tutorial off)', go: ['desk', '{}'] },
  { name: 'week', kind: 'mid', desc: 'the week calendar', go: ['week', '{}'] },
  { name: 'inbox', kind: 'mid', desc: 'the inbox list', go: ['inbox', '{}'] },
  { name: 'inbox-band', kind: 'mid', desc: 'an inbox message from a band asking for a show', go: ['inbox', '{messageId: P.msgBand}'] },
  { name: 'inbox-room', kind: 'mid', desc: 'an inbox message from a room', go: ['inbox', '{messageId: P.msgRoom}'] },
  { name: 'shows', kind: 'mid', desc: 'the shows list (the clipboards)', go: ['shows', '{}'] },
  { name: 'show-draft', kind: 'mid', desc: 'a show being built (a draft, nothing booked yet)', go: ['show', '{showId: P.draft}'] },
  { name: 'show-confirmed', kind: 'mid', desc: 'a confirmed show with its jobs', go: ['show', '{showId: P.confirmed}'] },
  { name: 'bill', kind: 'mid', desc: 'the bill (the sticker sheet) of a confirmed show', go: ['bill', '{showId: P.confirmed}'] },
  { name: 'show-played', kind: 'mid', desc: "a played show's record", go: ['show', '{showId: P.played}'] },
  { name: 'flyerdesk', kind: 'mid', desc: 'the flyer desk for a confirmed show', go: ['flyerdesk', '{showId: P.confirmed}'] },
  { name: 'bands', kind: 'mid', desc: 'the bands list (local tab)', go: ['bands', '{}'] },
  { name: 'band', kind: 'mid', desc: 'one band page (a band from the played show)', go: ['band', '{bandId: P.band}'] },
  { name: 'rooms', kind: 'mid', desc: 'the rooms list', go: ['rooms', '{}'] },
  { name: 'room', kind: 'mid', desc: "one room page (the played show's room)", go: ['room', '{roomId: P.room}'] },
  { name: 'people', kind: 'mid', desc: 'people (help tab)', go: ['people', '{}'] },
  { name: 'town', kind: 'mid', desc: 'the town map', go: ['town', '{}'] },
  { name: 'money', kind: 'mid', desc: 'the money screen', go: ['money', '{}'] },
  { name: 'notebook-crowds', kind: 'mid', desc: 'the notebook, crowds page', go: ['notebook', "{page: 'CROWDS'}"] },
  { name: 'notebook-bands', kind: 'mid', desc: 'the notebook, bands page', go: ['notebook', "{page: 'BANDS'}"] },
  { name: 'notebook-door', kind: 'mid', desc: 'the notebook, door page', go: ['notebook', "{page: 'DOOR'}"] },
  { name: 'legacy', kind: 'mid', desc: 'the legacy wall', go: ['legacy', '{}'] },
  { name: 'jacket', kind: 'mid', desc: 'the jacket (patches)', go: ['jacket', '{}'] },
  { name: 'settings-game', kind: 'mid', desc: 'settings folder, the game tab', go: ['settings', '{}'], tab: 'game' },
  { name: 'settings-look', kind: 'mid', desc: 'settings folder, how it looks tab', go: ['settings', '{}'], tab: 'look' },
  { name: 'settings-saves', kind: 'mid', desc: 'settings folder, the saves tab', go: ['settings', '{}'], tab: 'saves' },
  { name: 'settings-credits', kind: 'mid', desc: 'settings folder, the credits tab (music attribution)', go: ['settings', '{}'], tab: 'credits' },

  { name: 'close', kind: 'close', desc: 'the week close-out (end of a week, bills waiting)', go: ['close', '{}'] },
  { name: 'night-doors', kind: 'night', desc: 'a show night before the doors open', go: ['night', '{showId: P.night}'] },
  { name: 'night-mid', kind: 'night', desc: 'a show night, a few minutes in', go: ['night', '{showId: P.night}'], night: 'mid' },
  { name: 'night-settle', kind: 'night', desc: 'a show night, the settle-up envelope', go: ['night', '{showId: P.night}'], night: 'settle' }
];

/* ------------------------------------------------------------------ arguments ------------------------------------------------------------------ */
function parseArgs(argv) {
  const a = { names: [], all: false, list: false, out: null, url: 'http://127.0.0.1:8792', reach: false, scale: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === '--all') a.all = true; else if (x === '--list') a.list = true; else if (x === '--reach') a.reach = true;
    else if (x === '--scale') a.scale = Number(argv[++i]);
    else if (x === '--out') a.out = argv[++i]; else if (x === '--url') a.url = argv[++i];
    else if (x.startsWith('--')) { console.error('unknown option ' + x); process.exit(2); }
    else a.names.push(x);
  }
  return a;
}

/* ------------------------------------------------------------------ the lock and cleanup ------------------------------------------------------------------ */
let haveLock = false, chrome = null, profDir = null;
function alive(pid) { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } }
async function takeLock() {
  let announced = false;
  for (;;) {
    try { fs.mkdirSync(LOCK); fs.writeFileSync(path.join(LOCK, 'owner'), process.pid + ' ' + Date.now()); haveLock = true; return; }
    catch (e) {
      if (e.code !== 'EEXIST') throw e;
      let age = Infinity, pid = 0;
      try { age = Date.now() - fs.statSync(LOCK).mtimeMs; pid = parseInt(fs.readFileSync(path.join(LOCK, 'owner'), 'utf8'), 10) || 0; } catch (e2) { /* gone just now */ }
      if (age > STALE_MS || (pid && !alive(pid) && age > 3000)) {
        console.error('removing a stale lock (' + Math.round(age / 1000) + 's old, owner ' + (pid || '?') + ')');
        try { fs.rmSync(LOCK, { recursive: true, force: true }); } catch (e3) { /* retry */ }
        continue;
      }
      if (!announced) { console.error('waiting for the Chrome lock (held by pid ' + (pid || '?') + ')...'); announced = true; }
      await sleep(2000);
    }
  }
}
let cleaned = false;
function cleanup() {
  if (cleaned) return; cleaned = true;
  try { if (chrome && chrome.pid) { try { process.kill(chrome.pid, 'SIGKILL'); } catch (e) { /* gone */ } } } catch (e) { /* fine */ }
  if (profDir) { try { cp.spawnSync('pkill', ['-9', '-f', 'user-data-dir=' + profDir]); } catch (e) { /* fine */ } }
  if (profDir) { try { fs.rmSync(profDir, { recursive: true, force: true }); } catch (e) { /* fine */ } }
  if (haveLock) { try { fs.rmSync(LOCK, { recursive: true, force: true }); } catch (e) { /* fine */ } haveLock = false; }
}
process.on('exit', cleanup);
['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(sg => process.on(sg, () => { cleanup(); process.exit(130); }));
process.on('uncaughtException', e => { console.error('FAIL ' + (e && e.stack || e)); cleanup(); process.exit(1); });

/* ------------------------------------------------------------------ the preview server ------------------------------------------------------------------ */
async function ensureServer(base) {
  const up = async () => { try { return (await fetch(base + '/index.html', { method: 'HEAD' })).ok; } catch (e) { return false; } };
  if (await up()) return;
  const u = new URL(base);
  console.error('the preview server is not answering; starting python3 -m http.server ' + u.port);
  const p = cp.spawn('python3', ['-m', 'http.server', u.port, '--bind', u.hostname], { cwd: ROOT, detached: true, stdio: 'ignore' });
  p.unref();
  for (let i = 0; i < 40; i++) { await sleep(250); if (await up()) return; }
  throw new Error('could not start the preview server at ' + base);
}

/* ------------------------------------------------------------------ the games a bot plays (Node side) ------------------------------------------------------------------ */
/* a copy of a bot's game as save text, with the cutscenes the bot never watched marked seen (they would cover every screen) */
function packState(state) {
  const o = JSON.parse(JSON.stringify(state)); let g = 0, n;
  while (g++ < 60 && (n = SB.Chapters.nextCutscene(o))) SB.Chapters.markSeen(o, n.key);
  return JSON.stringify({ v: SB.SAVE_VERSION, state: o });
}

function buildStates(need) {
  const R = require(path.join(ROOT, 'test', 'bots', 'run.js'));
  const checklist = require(path.join(ROOT, 'test', 'bots', 'checklist.js'));
  const out = { texts: {}, P: {} };
  let closeText = null, nightText = null, weekN = 0;
  const bot = Object.assign({}, checklist, {
    onNight: function (view, bsb, showId) {
      if (!nightText && weekN >= 5 && need.night) { nightText = packState(view); out.P.night = showId; }
      return checklist.onNight ? checklist.onNight(view, bsb, showId) : undefined;
    }
  });
  const r = R.runGame({
    seed: 'shots-1', bot: bot, weeks: 9, city: 'pensacola', text: true,
    hooks: {
      afterWeek: function () { weekN++; },
      afterClose: function (state) {           // the week is closed and the bills wait: the close-out screen's moment
        if (!closeText && weekN === 7 && need.close && state.clock.phase === 'CLOSE') closeText = packState(state);
      }
    }
  });
  if (!r.ok) throw new Error('the bot game failed: ' + (r.error && r.error.message));
  const s = r.state;
  const shows = Object.values(s.shows);
  const played = shows.filter(x => x.status === 'PLAYED').sort((a, b) => a.day - b.day);
  const conf = shows.filter(x => x.status === 'CONFIRMED').sort((a, b) => ((b.bill && b.bill.slots || []).length - (a.bill && a.bill.slots || []).length) || a.day - b.day);
  const dr = SB.Shows.create(s, { own: true, day: s.clock.day + 21, tags: [], benefitFor: null });
  const msgs = s.mail.messages;
  const bandMsg = msgs.filter(m => m.kind === 'REQUEST' && m.refs && m.refs.bandId).pop() || msgs.filter(m => m.kind === 'BAND').pop();
  const roomMsg = msgs.filter(m => m.kind === 'ROOM').pop();
  const pl = played[played.length - 1] || null;
  const P = out.P;
  P.played = pl && pl.id; P.confirmed = conf[0] && conf[0].id; P.draft = dr && dr.ok ? dr.showId : null;
  P.room = (pl && pl.roomId) || Object.keys(s.rooms)[0];
  P.band = (pl && pl.bill && pl.bill.slots[0] && pl.bill.slots[0].bandId) || Object.keys(s.bands)[0];
  P.msgBand = bandMsg && bandMsg.id; P.msgRoom = roomMsg && roomMsg.id;
  out.texts.mid = packState(s);
  if (closeText) out.texts.close = closeText;
  if (nightText) out.texts.night = nightText;
  return out;
}

/* ------------------------------------------------------------------ Chrome ------------------------------------------------------------------ */
async function launch() {
  profDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-shots-'));
  chrome = cp.spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + profDir, '--window-size=1280,800',
    '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--mute-audio', '--disable-extensions', '--disable-background-networking',
    '--disable-sync', '--disable-component-update', '--disable-breakpad', 'about:blank'], { stdio: 'ignore' });
  let tgt = null;
  for (let i = 0; i < 80 && !tgt; i++) { try { tgt = (await (await fetch('http://127.0.0.1:' + PORT + '/json')).json()).find(t => t.type === 'page'); } catch (e) { /* not up yet */ } if (!tgt) await sleep(250); }
  if (!tgt) throw new Error('Chrome did not start (CHROME=' + CHROME + ')');
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('devtools socket failed')); });
  let id = 0; const pend = {};
  ws.onmessage = m => { const x = JSON.parse(m.data); if (x.id && pend[x.id]) { pend[x.id](x); delete pend[x.id]; } };
  const send = (method, params) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.result.exceptionDetails) throw new Error((r.result.exceptionDetails.exception && r.result.exceptionDetails.exception.description) || JSON.stringify(r.result.exceptionDetails));
    return r.result.result.value;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Page.enable');
  return { send, ev, ws };
}

/* page-side helpers, evaluated once after the game has loaded */
const PAGE = `(function () {
  var W = window;
  W.__sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  W.__q = function (sel) { return document.querySelector(sel); };
  W.__click = function (sel) { var e = document.querySelector(sel); if (!e) throw new Error('no ' + sel); e.click(); return true; };
  W.__settle = async function (ms) {
    await __sleep(ms || 700);
    for (var i = 0; i < 25; i++) {
      var imgs = Array.prototype.slice.call(document.images).filter(function (m) { return !m.complete; });
      if (!imgs.length) break;
      await __sleep(200);
    }
    try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) { /* fine */ }
    await __sleep(250);
  };
  W.__tidy = function () {
    var g = 0; while (document.querySelector('.cs-root .cs-skip') && g++ < 12) document.querySelector('.cs-root .cs-skip').click();
    ['#overlay', '#cards', '#pop'].forEach(function (s) { var o = document.querySelector(s); if (o) while (o.firstChild) o.removeChild(o.firstChild); });
  };
  W.__loadState = async function (key) {
    __tidy();
    var r = SB.Save.importText(W.__T[key]);
    if (!r || r.ok === false || !r.state) throw new Error('the saved game ' + key + ' did not import');
    SB.UI.start(r.state);
    /* patch cards and cutscenes that the bot's game has waiting would cover the screen: send them away */
    for (var i = 0; i < 14; i++) {
      await __sleep(250);
      var c = document.querySelector('.sy-card .sy-card-go'), k = document.querySelector('.cs-root .cs-skip');
      if (c) c.click(); else if (k) k.click(); else if (i > 3) break;
    }
    return SB.UI.route();
  };
  /* --reach: every control a player could want, and whether it can be got to. A box that scrolls makes what is inside it
     reachable (the player scrolls to it), so the test climbs to the nearest scrolling box and checks that box instead. */
  W.__reach = function () {
    var out = [], vw = innerWidth, vh = innerHeight;
    var sel = 'button, a[href], input:not([type=hidden]), select, textarea, [role=button], [tabindex]:not([tabindex="-1"])';
    function scrolls(el, cs) { return /(auto|scroll)/.test(cs.overflowY + cs.overflowX) && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1); }
    function name(el) {
      var t = (el.getAttribute('aria-label') || el.textContent || el.value || '').replace(/\s+/g, ' ').trim().slice(0, 40);
      return el.tagName.toLowerCase() + (el.getAttribute('data-fk') ? '[' + el.getAttribute('data-fk') + ']' : '') + (t ? ' "' + t + '"' : '');
    }
    Array.prototype.slice.call(document.querySelectorAll(sel)).forEach(function (el) {
      var r = el.getBoundingClientRect(), cs = getComputedStyle(el), box, a, acs, clip, cx, cy, hit, inScroll = false;
      if (r.width < 2 || r.height < 2 || cs.visibility === 'hidden' || el.disabled) return;
      if (el.closest('[inert], [aria-hidden="true"], .cb-sr')) return;
      box = { l: r.left, t: r.top, r: r.right, b: r.bottom };
      clip = { l: -1e9, t: -1e9, r: 1e9, b: 1e9 };          /* the clips met on the way up; the screen comes in at the end */
      for (a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        acs = getComputedStyle(a);
        if (acs.display === 'none') return;
        if (scrolls(a, acs)) {
          /* inside a scrolling box: the clips met so far move with the control, so test against them now, then start over
             with the scrolling box itself as the thing that has to be in view */
          cx = (box.l + box.r) / 2; cy = (box.t + box.b) / 2;
          if (cx < clip.l || cx > clip.r || cy < clip.t || cy > clip.b) { out.push('OFF   ' + name(el) + ' clipped inside its scrolling box'); return; }
          var ar = a.getBoundingClientRect(); box = { l: ar.left, t: ar.top, r: ar.right, b: ar.bottom }; clip = { l: -1e9, t: -1e9, r: 1e9, b: 1e9 }; inScroll = true; continue;
        }
        if (/(hidden|clip)/.test(acs.overflowY + acs.overflowX)) {
          var cr = a.getBoundingClientRect();
          clip = { l: Math.max(clip.l, cr.left), t: Math.max(clip.t, cr.top), r: Math.min(clip.r, cr.right), b: Math.min(clip.b, cr.bottom) };
        }
      }
      clip = { l: Math.max(clip.l, 0), t: Math.max(clip.t, 0), r: Math.min(clip.r, vw), b: Math.min(clip.b, vh) };
      /* the middle of the control (or of the scrolling box it lives in) has to be inside every clip and on the screen */
      cx = (box.l + box.r) / 2; cy = (box.t + box.b) / 2;
      if (cx < clip.l || cx > clip.r || cy < clip.t || cy > clip.b) { out.push('OFF   ' + name(el) + ' at ' + Math.round(r.left) + ',' + Math.round(r.top) + ' (visible area ends ' + Math.round(clip.b) + ')'); return; }
      /* covered: something else gets the click at the control's own middle (only when the control itself is in view) */
      /* covered: something else gets the click at the control's middle. Only for controls that do not scroll (a scrolled list
         can be moved out from under a slip), and word notes are skipped: they close with a tap. A note, not a failure. */
      if (inScroll) return;
      cx = (r.left + r.right) / 2; cy = (r.top + r.bottom) / 2;
      hit = document.elementFromPoint(cx, cy);
      if (hit && hit.closest && hit.closest('.wd-note, .wd-pop, [role=tooltip]')) return;
      if (hit && hit !== el && !el.contains(hit) && !hit.contains(el)) out.push('UNDER ' + name(el) + ' at ' + Math.round(cx) + ',' + Math.round(cy) + ' covered by ' + hit.tagName.toLowerCase() + '.' + String(hit.className && hit.className.baseVal !== undefined ? hit.className.baseVal : hit.className).split(' ').slice(0, 2).join('.'));
    });
    return out;
  };
  return 'ok';
})()`;

async function main() {
  const a = parseArgs(process.argv.slice(2));
  if (a.list) { SHOTS.forEach(s => console.log(s.name.padEnd(16) + s.desc)); return; }
  let want;
  if (a.all) want = SHOTS.slice();
  else {
    want = a.names.map(n => SHOTS.find(s => s.name === n) || (console.error('no shot called ' + n + ' (try --list)'), process.exit(2)));
    if (!want.length) { console.error('usage: node tools/shots.js --list | <name>... | --all   [--out dir] [--url base]'); process.exit(2); }
  }
  const outDir = path.resolve(a.out || path.join(ROOT, 'design', 'shots', 'current'));
  fs.mkdirSync(outDir, { recursive: true });
  await ensureServer(a.url);
  const needKinds = new Set(want.map(s => s.kind));
  const need = { close: needKinds.has('close'), night: needKinds.has('night') };
  let built = null;
  if (['mid', 'close', 'night'].some(k => needKinds.has(k))) {          // before Chrome starts: the bot's game needs no browser
    const t0 = Date.now(); built = buildStates(need); console.error('bot game played in ' + (Date.now() - t0) + ' ms');
  }
  await takeLock();
  const { send, ev, ws } = await launch();
  const saved = [], skipped = [], reachBad = [];
  /* peak memory of Chrome and all its helpers (everything started with our temp profile), sampled every 1.5 s */
  let peakKB = 0;
  const sample = () => { try { const o = cp.spawnSync('ps', ['-axo', 'rss=,command=']).stdout.toString(); let t = 0; o.split('\n').forEach(l => { if (l.includes('user-data-dir=' + profDir) || (l.includes('--type=') && l.includes(profDir))) t += parseInt(l, 10) || 0; }); if (t > peakKB) peakKB = t; } catch (e) { /* fine */ } };
  const sampler = setInterval(sample, 1500);
  try {
    let ok = false;
    for (let t = 0; t < 6 && !ok; t++) {                       // a busy preview server can drop a script: load again
      await send('Page.navigate', { url: a.url + '/index.html?t=' + Date.now() });
      for (let i = 0; i < 40 && !ok; i++) {
        await sleep(400);
        ok = await ev("document.readyState === 'complete' && !!(window.SB && SB.UI && SB.UI.go && SB.verify && !SB.verify(['engine','cities','art','ui']).length && SB.Game && SB.Cutscene && SB.Scenes)").catch(() => false);
      }
    }
    if (!ok) throw new Error('the game did not load from ' + a.url);
    await ev(PAGE);
    if (a.scale) await ev('(function () { SB.UI.prefs.set("textScale", ' + JSON.stringify(a.scale) + '); return 1; })()');
    for (let t = 0; t < 5; t++) {                              // the pack is one more script: a busy server can drop it
      try { await ev("new Promise(function (res, rej) { SB.Cities.load('pensacola', function (e) { if (e) rej(new Error(String(e && e.message || e))); else res(1); }); })"); break; }
      catch (e) { if (t === 4) throw e; await sleep(1500); }
    }
    if (built) { await ev('window.__T = ' + JSON.stringify(built.texts) + '; window.P = ' + JSON.stringify(built.P) + '; 1'); }

    const shot = async (name) => {
      if (a.reach) {
        const bad = await ev('__reach()').catch(e => ['the check failed: ' + e.message]);
        const off = bad.filter(x => x.startsWith('OFF')), under = bad.filter(x => !x.startsWith('OFF'));
        if (off.length) reachBad.push(name);
        if (bad.length) console.error((off.length ? 'REACH ' : 'reach ok (covered, check by eye) ') + name + ':\n  ' + bad.join('\n  ')); else console.error('reach ok: ' + name);
      }
      const r = await send('Page.captureScreenshot', { format: 'png' });
      const f = path.join(outDir, name + '.png'); fs.writeFileSync(f, Buffer.from(r.result.data, 'base64')); saved.push(f); console.log(f);
    };
    const errs = async () => ev('(SB.log && SB.log.entries ? SB.log.entries.filter(function (e) { return e.level === "error"; }).length : 0)').catch(() => 0);
    const skip = (name, why) => { skipped.push(name); console.error('skipped ' + name + ': ' + why); };

    /* --- the fresh-game flow, in order; one failure skips the shots after it that depend on it --- */
    const fresh = want.filter(s => s.kind === 'fresh').map(s => s.name);
    if (fresh.length) {
      let broke = null;
      const step = async (name, fn) => {
        if (broke) { if (fresh.includes(name)) skip(name, broke); return; }
        try { await fn(); if (fresh.includes(name)) await shot(name); }
        catch (e) { broke = 'an earlier step failed (' + name + ': ' + String(e.message).split('\n')[0] + ')'; if (fresh.includes(name)) skip(name, String(e.message).split('\n')[0]); }
      };
      await ev('(function () { __tidy(); SB.UI.go("start"); return 1; })()');
      await step('start', async () => { await ev('__settle(1200)'); });
      await step('city', async () => { await ev('(function () { __click("[data-fk=\\"new\\"]"); return 1; })()'); await ev('__settle(900)'); });
      await step('tune', async () => {
        /* Pensacola has no tune questions (its scene is verified); show the questions for the first loaded-able town that does */
        const slug = await ev(`(async function () {
          var c = ['daphne-al', 'gulfport-ms', 'tallahassee-fl', 'mobile-al', 'fort-walton-beach-fl', 'richmond', 'anchorage-ak'], i, q;
          for (i = 0; i < c.length; i++) {
            try { await new Promise(function (res, rej) { SB.Cities.load(c[i], function (e) { if (e) rej(e); else res(); }); }); q = SB.Cities.questions(c[i]); } catch (e) { q = []; }
            if (q.length) return c[i];
          }
          return null; })()`);
        if (!slug) throw new Error('no town with tune questions');
        await ev('(function () { SB.UI.go("tune", { slug: ' + JSON.stringify(slug) + ' }); return 1; })()');
        await ev('__settle(1000)');
      });
      await step('opening', async () => {
        await ev('(function () { SB.UI.go("city"); return 1; })()'); await sleep(500);
        await ev('(function () { __click("[data-fk=\\"city-pensacola\\"]"); return 1; })()'); await sleep(400);
        await ev('(function () { __click("[data-fk=\\"city-pick\\"]"); return 1; })()');
        for (let i = 0; i < 30 && !(await ev('!!__q(".cs-root")')); i++) await sleep(250);
        await sleep(2500);
      });
      await step('ask', async () => {
        await ev('(function () { __click(".cs-root .cs-skip"); return 1; })()');
        for (let i = 0; i < 30 && !(await ev('!!__q(".cs-root .cs-reply")')); i++) await sleep(250);
        await ev('__settle(2000)');
      });
      await step('name', async () => {
        /* answer each question with its first reply till the booking name is asked */
        for (let i = 0; i < 60 && !(await ev('!!__q(".cs-ask-name input")')); i++) {
          await ev('(function () { var b = __q(".cs-root .cs-reply:not([disabled])") || __q(".cs-root .cs-next:not([hidden])"); if (b) b.click(); return 1; })()'); await sleep(400);
        }
        await sleep(1500);
        await ev('(function () { var i = __q(".cs-ask-name input"); if (!i) throw new Error("no name field"); i.focus(); i.value = "Extension Cord Booking"; i.dispatchEvent(new Event("input", { bubbles: true })); return 1; })()');
        await ev('__settle(1500)');
      });
      await step('desk-fresh', async () => {
        await ev('(function () { __click("[data-fk=\\"name-done\\"]"); return 1; })()');
        for (let i = 0; i < 30 && !(await ev('!!__q(".cs-root .cs-reply:not([disabled])")')); i++) await sleep(250);
        await ev('(function () { __click(".cs-root .cs-reply"); return 1; })()');   /* yes, walk me through it */
        for (let i = 0; i < 30 && await ev('!!__q(".cs-root .cs-reply")'); i++) await sleep(250);
        await ev('(function () { var g = 0; while (__q(".cs-root .cs-skip") && g++ < 12) __q(".cs-root .cs-skip").click(); return 1; })()');
        for (let i = 0; i < 20 && !(await ev('SB.UI.route() === "desk" && !__q(".cs-root")')); i++) await sleep(300);
        await ev('__settle(1800)');
      });
    }

    /* --- the played games --- */
    for (const s of want.filter(x => x.kind !== 'fresh')) {
      try {
        if (!built.texts[s.kind]) { skip(s.name, 'the ' + s.kind + ' state was not reached by the bot'); continue; }
        const [route, params] = s.go;
        if (/P\.(\w+)/.test(params)) { const key = /P\.(\w+)/.exec(params)[1]; if (!built.P[key]) { skip(s.name, 'no ' + key + ' in the bot game'); continue; } }
        const before = await errs();
        await ev('__loadState(' + JSON.stringify(s.kind) + ')');
        await ev('__settle(900)');
        if (route !== 'desk') await ev('(function () { SB.UI.go(' + JSON.stringify(route) + ', ' + params + '); return 1; })()');
        await ev('__settle(1000)');
        if (s.tab) await ev('(function () { var t = document.getElementById("sf-tab-' + s.tab + '"); if (!t) throw new Error("no tab ' + s.tab + '"); t.click(); return 1; })()');
        if (s.night === 'mid' || s.night === 'settle') {
          /* the night plays in real time; run it at "fast", open the doors, and stop at the first choice (mid) or the settle-up envelope */
          await ev('(function () { SB.UI.prefs.set("speed", "fast"); __click("[data-fk=\\"open\\"]"); return 1; })()');
          let stage = '';
          for (let i = 0; i < 160 && stage !== 'done'; i++) {
            await sleep(500);
            stage = await ev(`(function () {
              if (__q('[data-tut="settle-done"]')) return 'done';
              var t = __q('.nt-tab:not([disabled])');
              if (t) { if (${JSON.stringify(s.night)} === 'mid') return 'done'; t.click(); return 'choice'; }
              var b = __q('[data-fk="skip"]');
              if (b && ${JSON.stringify(s.night)} === 'settle') { b.click(); return 'skipped'; }
              return 'wait'; })()`);
          }
          if (stage !== 'done' && s.night === 'settle') throw new Error('the night never reached the settle-up');
          await sleep(s.night === 'mid' ? 2500 : 1200);       // let the picture catch up with the stop
        }
        if (s.tab || s.night) await ev('__settle(900)'); else await ev('__settle(300)');
        const route2 = await ev('SB.UI.route()');
        if (route2 !== route) { skip(s.name, 'the route ended on ' + route2 + ', not ' + route); continue; }
        if (await errs() > before) console.error('note: ' + s.name + ' logged an engine/UI error (see SB.log)');
        await shot(s.name);
      } catch (e) { skip(s.name, String(e.message).split('\n')[0]); }
    }
    try { ws.close(); } catch (e) { /* fine */ }
  } finally { clearInterval(sampler); sample(); cleanup(); }
  console.error('peak Chrome RSS (all processes) ' + Math.round(peakKB / 1024) + ' MB');
  console.error('saved ' + saved.length + ' shot(s)' + (skipped.length ? ', skipped ' + skipped.length + ': ' + skipped.join(', ') : ''));
  if (a.reach) console.error(reachBad.length ? 'out of reach on: ' + reachBad.join(', ') : 'every control on every shot can be reached');
  process.exit((skipped.length && !saved.length) || (a.reach && reachBad.length) ? 1 : 0);
}
main().catch(e => { console.error('FAIL ' + (e && e.stack || e)); cleanup(); process.exit(1); });
