#!/usr/bin/env node
'use strict';
// tools/walk.js — plays one whole Pensacola show in headless Chrome through the real interface, with the guided first
// show SKIPPED ("I've done this before"): the start screen, a request in the phone, a room held and confirmed, the
// touring band offered, local bands put on the bill, a sound person asked, a flyer made, promo jobs put on days, the
// weeks played to the night, the doors opened, the night's choices taken, the envelope settled, the week closed out.
// Every step is a click on a real element (time inside a week is stepped with the deck's own 'sb-play' next event, as
// test/tutorial-walk.js does). After every step: a picture in design/shots/walk/NN-step.png, and the console errors,
// uncaught exceptions and SB.log errors that step caused are printed. Exit 1 on the first broken step.
//   node tools/walk.js [--url http://127.0.0.1:8792] [--out design/shots/walk]
// ONE Chrome on the machine: takes tools/.shots.lock first (tools/withlock.js), waits while someone else holds it.
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const lock = require('./withlock.js');
const ROOT = path.join(__dirname, '..'), PORT = 9483;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const argv = process.argv.slice(2);
const BASE = argv.includes('--url') ? argv[argv.indexOf('--url') + 1] : 'http://127.0.0.1:8792';
const OUT = path.resolve(ROOT, argv.includes('--out') ? argv[argv.indexOf('--out') + 1] : 'design/shots/walk');

let chrome = null, prof = null, done = false;
function cleanup() {
  if (done) return; done = true;
  if (chrome) try { process.kill(chrome.pid, 'SIGKILL'); } catch (e) { /* gone */ }
  if (prof) { try { cp.spawnSync('pkill', ['-9', '-f', 'user-data-dir=' + prof]); } catch (e) { /* fine */ } try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { /* fine */ } }
  lock.release();
}
process.on('exit', cleanup);
['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(sg => process.on(sg, () => { cleanup(); process.exit(130); }));

/* the page side: one object of steps; each throws on the first thing that is wrong */
const PAGE = `(function () {
  var d = document, W = window, log = [];
  function S() { return SB.UI.game(); }
  function q(sel) { return d.querySelector(sel); }
  function qa(sel) { return Array.prototype.slice.call(d.querySelectorAll(sel)); }
  function fk(v) { return '#main [data-fk="' + v + '"]'; }
  function hit(id) { return '#desk .dk-hit[data-obj="' + id + '"]'; }
  function fail(m) { throw new Error('[' + SB.UI.route() + ' day ' + (S() ? S().clock.day : '?') + '] ' + m); }
  function click(sel) { var e = typeof sel === 'string' ? q(sel) : sel; if (!e) fail('nothing matches ' + sel); if (e.disabled) fail(sel + ' is disabled'); e.click(); return e; }
  function down() { if (SB.UI.route() !== 'desk') { var b = q('#main .cu-down'); if (b) b.click(); else SB.UI.go('desk'); } if (SB.UI.route() !== 'desk') fail('could not get back to the desk'); }
  function show() { return W.__sid ? S().shows[W.__sid] : null; }
  function clip(sid) {
    var objs = SB.Desk.objects(), i;
    for (i = 0; i < objs.length; i++) if (/^clip\\d/.test(objs[i].id) && objs[i].params && objs[i].params.showId === sid) return hit(objs[i].id);
    fail('the show has no clip on the desk');
  }
  function openShow() { down(); click(clip(W.__sid)); if (SB.UI.route() !== 'show') fail('the clip did not open the show'); }
  /* let the days go by, through the interface, until done() */
  function time(isDone, what, max) {
    var i, e, bs, s, c;
    for (i = 0; i < (max || 400); i++) {
      s = S();
      if (isDone()) return i;
      if (q('.cs-root')) { q('.cs-root .cs-skip').click(); continue; }
      if (q('.sy-card')) { q('.sy-card .sy-card-go').click(); continue; }
      e = q('#overlay .sb-check');
      if (e) { bs = e.querySelectorAll('button'); bs[bs.length - 1].click(); continue; }
      e = q('#overlay .sb-decision') || q('#overlay .cc-slap');
      if (e) {
        bs = qa('#overlay button').filter(function (b) { return !b.disabled && e.contains(b); });
        if (!bs.length) fail('a card with nothing to press: ' + e.textContent.slice(0, 80));
        c = bs.filter(function (b) { return /^(yes|take|accept|ok|sure|book)/i.test(b.textContent.trim()); })[0] || bs.filter(function (b) { return /later|keep waiting|close/i.test(b.textContent); })[0] || bs[0];
        log.push('card: "' + e.textContent.replace(/\\s+/g, ' ').slice(0, 70) + '" -> ' + c.textContent.trim().slice(0, 30));
        c.click(); continue;
      }
      if (SB.UI.route() === 'night') { if (isDone()) return i; fail('the night opened while waiting for ' + what); }
      if (s.clock.phase === 'CLOSE') {
        if (SB.UI.route() !== 'close') SB.UI.go('close');
        e = q('#main .cc-tab--big.is-hot') || q('#main .cc-tab--big');
        if (!e) fail('the close-out has no button to go on');
        e.click(); continue;
      }
      if (SB.UI.route() !== 'desk') { down(); continue; }
      if (s.clock.phase === 'PLAN' || (s.clock.stop && s.clock.stop.kind === 'END_OF_WEEK')) {
        click(hit('lamp'));
        if (SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause' });
        continue;
      }
      SB.UI.fire('sb-play', { cmd: 'next' });
    }
    fail('time ran out waiting for ' + what);
  }
  function openRequest() {
    down(); click(hit('phone'));
    if (SB.UI.route() !== 'inbox') fail('the phone did not open the inbox');
    var row = q('#main .ph-row[data-fk="c-q:' + W.__rid + '"]');
    if (!row) { var t = q('#main [data-fk="tab-fALL"]') || q('#main [data-fk^="tab-f"]'); if (t) t.click(); row = q('#main .ph-row[data-fk="c-q:' + W.__rid + '"]'); }
    click(row || fail('the request ' + W.__rid + ' has no row in the phone'));
  }
  var STEPS = {
    request: function () {
      /* a band asking for a show: wait for one if the phone has none yet */
      function pick() {
        var ids = SB.Requests.list(S(), { open: true }).filter(function (id) { var r = S().requests[id]; return r.bandId && r.dates && r.dates.length; });
        ids.sort(function (a, b) { return S().requests[a].dates[0] - S().requests[b].dates[0]; });
        return ids.filter(function (id) { return S().requests[id].dates[0] > S().clock.day + 12; })[0] || ids[ids.length - 1];
      }
      if (!pick()) time(function () { return !!pick(); }, 'a request', 60);
      W.__rid = pick();
      openRequest();
      var b = q(fk('tab-INTERESTED'));
      if (b && !b.disabled) b.click();
      return 'request ' + W.__rid + ' from ' + (S().bands[S().requests[W.__rid].bandId] || {}).name;
    },
    hold: function () {
      click(fk('tab-HOLD'));
      var rooms = qa('#main [data-fk^="tab-room-"]');
      if (!rooms.length) fail('no rooms to hold');
      click(fk('tab-send-hold'));
      var id; for (id in S().shows) if (S().shows[id].requestId === W.__rid && S().shows[id].status !== 'CANCELLED') W.__sid = id;
      if (!W.__sid) fail('sending the hold made no show');
      return 'show ' + W.__sid + ' in ' + (S().rooms[show().roomId || (show().hold && show().hold.roomId)] || {}).name + ' on day ' + show().day + ' (' + rooms.length + ' rooms offered)';
    },
    holdBack: function () {
      down();
      var n = time(function () { return !!show().hold || show().status === 'CANCELLED'; }, 'the hold', 120);
      if (!show().hold) fail('the room said no (' + show().status + ')');
      return 'held after ' + n + ' ticks';
    },
    confirm: function () {
      openShow();
      click(fk('confirm'));
      down();
      var n = time(function () { return show().status === 'CONFIRMED' || show().status === 'CANCELLED'; }, 'the room to confirm', 120);
      if (show().status !== 'CONFIRMED') fail('the show is ' + show().status);
      return 'confirmed after ' + n + ' ticks';
    },
    offer: function () {
      openRequest();
      click(fk('tab-OFFER'));
      click(fk('tab-send-offer'));
      return 'offer sent';
    },
    bill: function () {
      openShow();
      click(fk('tobill'));
      if (SB.UI.route() !== 'bill') fail('the bill did not open');
      var asked = [], i, cands, gaps;
      for (i = 0; i < 2; i++) {
        cands = qa('#main [data-fk^="cand-"]').filter(function (b) { return !b.disabled && asked.indexOf(b.getAttribute('data-fk')) < 0 && b.getAttribute('data-fk') !== 'cand-' + S().requests[W.__rid].bandId; });
        if (!cands.length) break;
        asked.push(cands[0].getAttribute('data-fk')); cands[0].click();
        gaps = qa('#main [data-fk^="gap-"]').filter(function (b) { return !b.disabled; });
        if (!gaps.length) fail('a band picked but no gap on the bill to put it in');
        gaps[0].click();
      }
      return 'asked ' + asked.join(', ') + '; ' + qa('#main [data-fk^="cand-"]').length + ' candidates on the sheet';
    },
    billBack: function () {
      down();
      var d0 = S().clock.day;
      time(function () { return S().clock.day >= d0 + 4; }, 'the bands to answer', 200);
      return 'bill: ' + show().bill.slots.map(function (x) { return (S().bands[x.bandId] || {}).name + ' ' + x.role + ' ' + (x.status || ''); }).join(' / ');
    },
    sound: function () {
      openShow();
      var cr = qa('#main [data-fk^="cr-"]').filter(function (b) { return !b.disabled; });
      if (!cr.length) return 'no crew to ask on the clipboard';
      cr[0].click();
      return 'asked crew ' + cr[0].getAttribute('data-fk');
    },
    flyer: function () {
      down(); click(hit('paper'));
      if (SB.UI.route() !== 'flyerdesk') fail('the paper opened ' + SB.UI.route());
      var b = q('#main [data-tut="flyer-make"]') || q('#main .sb-fd-use');
      click(b || fail('no use-this-flyer button'));
      if (!(show().promo && show().promo.flyer) && !show().flyer) fail('the flyer did not stick to the show');
      return 'flyer made';
    },
    promo: function () {
      down(); click(hit('calendar'));
      if (SB.UI.route() !== 'week') fail('the calendar opened ' + SB.UI.route());
      var placed = 0, i, note, halves, pile, tried = [], back;
      for (i = 0; i < 20 && placed < 4; i++) {
        note = qa('#main .cc-note.cc-lift').filter(function (e) { return !e.classList.contains('is-planned') && !e.disabled && tried.indexOf(e.getAttribute('data-fk') || e.textContent) < 0; })[0];
        if (!note) { pile = qa('#main .cc-pile-top').filter(function (e) { return e.getAttribute('aria-expanded') !== 'true'; })[0]; if (!pile) break; pile.click(); continue; }
        tried.push(note.getAttribute('data-fk') || note.textContent);
        note.click();
        halves = qa('#main .cc-half.is-ok');
        if (!halves.length) { back = qa('#main button').filter(function (b) { return /put it back/i.test(b.textContent); })[0]; if (back) back.click(); continue; }
        halves[0].click();
        placed++;
      }
      return placed + ' job(s) put on days (week ' + S().clock.week + ')';
    },
    wait: function () {
      down();
      var weeks = [], n = time(function () {
        if (SB.UI.route() === 'night') return true;
        var s = S();
        if (s.clock.phase === 'PLAN' && weeks.indexOf(s.clock.week) < 0 && SB.UI.route() === 'desk' && !q('.cs-root') && !q('.sy-card') && !q('#overlay .sb-decision') && !q('#overlay .cc-slap')) {
          weeks.push(s.clock.week); log.push('promo: ' + STEPS.promo()); down();
        }
        return false;
      }, 'the night of the show', 900);
      if (show().status !== 'CONFIRMED') fail('the show is ' + show().status + ' on its night');
      return 'the night came after ' + n + ' ticks (day ' + S().clock.day + ')';
    },
    open: function () { SB.UI.prefs.set('speed', 'fast'); click(fk('open')); return 'doors open'; },
    nightTick: function () {
      if (q('#main [data-fk="leave"]')) return 'leave';
      var opt0 = q('#main .nt-tab[data-fk="opt-0"]');
      if (opt0 && q('#main [data-tut="settle-done"]') && !opt0.disabled) return 'settle';
      var t = qa('#main .nt-tab').filter(function (b) { return !b.disabled; })[0];
      if (t) { log.push('night choice: ' + t.textContent.trim().slice(0, 40)); t.click(); return 'choice'; }
      return 'wait';
    },
    settle: function () { click('#main .nt-tab[data-fk="opt-0"]'); return 'settled: show ' + show().status; },
    leave: function () {
      click(fk('leave'));
      var n = time(function () { return S().clock.phase === 'CLOSE' && SB.UI.route() === 'close' || (S().clock.phase === 'CLOSE'); }, 'the week to end', 200);
      if (SB.UI.route() !== 'close') SB.UI.go('close');
      return 'week close-out after ' + n + ' ticks';
    },
    close: function () {
      var w = S().clock.week, n = time(function () { return S().clock.week > w && SB.UI.route() === 'desk' && !q('.cs-root') && !q('.sy-card'); }, 'the close-out', 100);
      return 'week ' + w + ' closed (' + n + ' ticks); money ' + JSON.stringify(S().money && S().money.cash != null ? S().money.cash : S().money).slice(0, 60);
    }
  };
  W.__walk = { steps: STEPS, log: log };
  return 'ok';
})()`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  await lock.take();
  prof = fs.mkdtempSync(path.join(os.tmpdir(), 'sb-walk-'));
  chrome = cp.spawn(CHROME, ['--headless=new', '--remote-debugging-port=' + PORT, '--user-data-dir=' + prof, '--window-size=1280,800', '--hide-scrollbars',
    '--no-first-run', '--no-default-browser-check', '--mute-audio', '--disable-extensions', '--disable-background-networking', '--disable-sync', 'about:blank'], { stdio: 'ignore' });
  let tgt = null;
  for (let i = 0; i < 80 && !tgt; i++) { try { tgt = (await (await fetch('http://127.0.0.1:' + PORT + '/json')).json()).find(t => t.type === 'page'); } catch (e) { /* not up */ } if (!tgt) await sleep(250); }
  if (!tgt) throw new Error('Chrome did not start');
  const ws = new WebSocket(tgt.webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });
  let id = 0; const pend = {}, errs = [];
  ws.onmessage = m => {
    const x = JSON.parse(m.data);
    if (x.id && pend[x.id]) { pend[x.id](x); delete pend[x.id]; return; }
    if (x.method === 'Runtime.exceptionThrown') { const d = x.params.exceptionDetails; errs.push('EXCEPTION ' + ((d.exception && d.exception.description) || d.text).split('\n').slice(0, 2).join(' | ')); }
    if (x.method === 'Runtime.consoleAPICalled' && (x.params.type === 'error' || x.params.type === 'warning' || x.params.type === 'assert')) errs.push('console.' + x.params.type + ' ' + x.params.args.map(a => a.value != null ? a.value : a.description).join(' ').slice(0, 300));
    if (x.method === 'Log.entryAdded' && x.params.entry.level === 'error') errs.push('log ' + x.params.entry.text.slice(0, 200) + ' ' + (x.params.entry.url || ''));
  };
  const send = (method, params) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params: params || {} })); });
  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    if (r.result.exceptionDetails) throw new Error((r.result.exceptionDetails.exception && r.result.exceptionDetails.exception.description) || JSON.stringify(r.result.exceptionDetails));
    return r.result.result.value;
  };
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  await send('Network.enable'); await send('Network.setCacheDisabled', { cacheDisabled: true }); await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  let n = 0, code = 0;
  const shot = async name => { const r = await send('Page.captureScreenshot', { format: 'png' }); const f = path.join(OUT, String(++n).padStart(2, '0') + '-' + name + '.png'); fs.writeFileSync(f, Buffer.from(r.result.data, 'base64')); return path.relative(ROOT, f); };
  const sbErrs = () => ev('(SB.log && SB.log.entries ? SB.log.entries.filter(function (e) { return e.level === "error"; }).map(function (e) { return String(e.msg || e.message || e.text || JSON.stringify(e)).slice(0, 200); }) : [])').catch(() => []);
  let sbSeen = 0;
  const report = async (name, res) => {
    await sleep(900);
    const f = await shot(name);
    const sb = await sbErrs(), fresh = sb.slice(sbSeen); sbSeen = sb.length;
    const all = errs.splice(0).concat(fresh.map(x => 'SB.log ' + x));
    console.log((all.length ? 'WARN ' : 'ok   ') + name.padEnd(10) + ' ' + res + '  [' + f + ']');
    all.forEach(e => console.log('      ' + e));
  };
  try {
    let ok = false;
    for (let t = 0; t < 6 && !ok; t++) {
      await send('Page.navigate', { url: BASE + '/index.html?t=' + Date.now() });
      for (let i = 0; i < 40 && !ok; i++) { await sleep(400); ok = await ev("document.readyState === 'complete' && !!(window.SB && SB.UI && SB.UI.go && SB.verify && !SB.verify(['engine','cities','art','ui']).length && SB.Game)").catch(() => false); }
    }
    if (!ok) throw new Error('the game did not load');
    await ev('localStorage.clear(); 1');
    await send('Page.navigate', { url: BASE + '/index.html?t=' + Date.now() });
    ok = false;
    for (let i = 0; i < 60 && !ok; i++) { await sleep(400); ok = await ev("document.readyState === 'complete' && !!(window.SB && SB.UI && SB.UI.route && document.querySelector('[data-fk=\"new\"]'))").catch(() => false); }
    if (!ok) throw new Error('the start screen did not come up');
    await ev(PAGE);
    const click = async (sel, wait) => { await ev('(function () { var e = document.querySelector(' + JSON.stringify(sel) + '); if (!e) throw new Error("no ' + sel.replace(/"/g, '\\"') + '"); if (e.disabled) throw new Error("disabled ' + sel.replace(/"/g, '\\"') + '"); e.click(); return 1; })()'); await sleep(wait || 600); };
    const waitFor = async (sel, ms) => { for (let i = 0; i < (ms || 10000) / 250; i++) { if (await ev('!!document.querySelector(' + JSON.stringify(sel) + ')')) return true; await sleep(250); } throw new Error('never appeared: ' + sel); };
    await report('start', 'the start screen');
    await click('[data-fk="new"]', 900); await waitFor('[data-fk="city-pensacola"]');
    await click('[data-fk="city-pensacola"]', 400); await click('[data-fk="city-pick"]', 400);
    await waitFor('[data-fk="name-in"]', 15000); await sleep(400);
    await ev('(function () { var i = document.querySelector("[data-fk=\\"name-in\\"] input") || document.querySelector("input[data-fk=\\"name-in\\"]"); i.focus(); i.value = "Extension Cord Booking"; i.dispatchEvent(new Event("input", { bubbles: true })); return 1; })()');
    await sleep(600); await report('name', 'named the outfit');
    await click('[data-fk="name-next"]', 1000); await waitFor('[data-fk="skip-tutorial"]');
    await report('setup', 'setup, the skip button is there');
    await click('[data-fk="skip-tutorial"]', 1500);
    await waitFor('.cs-root, #desk .dk-hit', 15000);
    await ev('(function () { var g = 0; while (document.querySelector(".cs-root .cs-skip") && g++ < 12) document.querySelector(".cs-root .cs-skip").click(); return 1; })()');
    await sleep(1500);
    const tut = await ev('JSON.stringify(SB.UI.game().story.tutorial)');
    await report('desk', 'the desk; tutorial ' + tut + '; tapes on page: ' + await ev('document.querySelectorAll(".sy-tape").length'));
    if (await ev('!!document.querySelector(".sy-card .sy-card-go")')) { await ev('document.querySelector(".sy-card .sy-card-go").click(); 1'); await report('pinned', 'pinned the patch card the skip gave'); }
    for (const st of ['request', 'hold', 'holdBack', 'confirm', 'offer', 'bill', 'billBack', 'sound', 'flyer', 'wait', 'open']) {
      const res = await ev('__walk.steps.' + st + '()');
      await report(st, res);
    }
    let stage = 'wait', mid = false;
    for (let i = 0; i < 400 && stage !== 'settle' && stage !== 'leave'; i++) {
      await sleep(400);
      stage = await ev('__walk.steps.nightTick()');
      if (stage === 'choice' && !mid) { mid = true; await report('night', 'the first choice of the night'); }
    }
    if (stage === 'wait') throw new Error('the night never reached the settle-up');
    await report('envelope', 'the settle-up envelope (' + stage + ')');
    if (stage === 'settle') { await ev('__walk.steps.settle()'); await waitFor('#main [data-fk="leave"]', 60000); }
    await report('settled', 'settled');
    await report('closeout', await ev('__walk.steps.leave()'));
    await report('closed', await ev('__walk.steps.close()'));
    console.log((await ev('__walk.log')).map(x => '      ' + x).join('\n'));
  } catch (e) {
    code = 1;
    console.log('FAIL ' + String(e && e.message).split('\n').slice(0, 3).join(' | '));
    try { await report('fail', 'the page when it broke'); console.log((await ev('__walk.log')).map(x => '      ' + x).join('\n')); } catch (e2) { /* fine */ }
  }
  try { ws.close(); } catch (e) { /* fine */ }
  cleanup();
  process.exit(code);
})().catch(e => { console.error('FAIL ' + (e && e.stack || e)); cleanup(); process.exit(1); });
