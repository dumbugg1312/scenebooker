/* test/tutorial-walk.js — the guided first show, played through the interface.
 * One script, two hosts: test/uismoke.js runs it against the fake DOM (node test/uismoke.js --only tutorial), and
 * test/tutshots.js runs it in headless Chrome and saves a picture of every step (design/sample/tut-NN-STEP.png).
 *
 *   SBTutorialWalk(env) -> { phases: [{ name, shot, need, run }], log: [] }
 *   env: { flush() }   flush runs the timers that are waiting (the fake DOM's never fire by themselves); a browser passes nothing.
 * A new Pensacola game must already be at the desk with the opening cutscenes over (step ANSWER).
 * Everything is a click on the thing the masking tape points at: tap(selector) first checks that the one tape on the
 * page is on that element (it carries data-taped), then clicks it. Only time is moved another way: the tape deck is
 * clicked to start and close a week, and inside a week the days are stepped with the 'sb-play' { cmd: 'next' } event
 * the deck's own keys send. A phase throws on the first thing that is wrong. `shot` names the picture to take after it.
 */
(function (root) {
  'use strict';
  function SBTutorialWalk(env) {
    env = env || {};
    var SB = root.SB, d = root.document, log = [], seenCuts = [], cards = [], money0 = null;
    function S() { return SB.UI.game(); }
    function cur() { return SB.Tutorial.current(S()) || {}; }
    function at() { var c = cur(); return (c.step || 'OFF') + ':' + (c.stage || ''); }
    function q(sel) { return d.querySelector(sel); }
    /* the first match that is not on a card already peeling off (SB.Finish removes it on a timer the fake DOM never runs) */
    function live(sel) {
      var all = d.querySelectorAll(sel), i, e, gone;
      for (i = 0; i < all.length; i++) {
        for (e = all[i], gone = false; e; e = e.parentNode) if (e.classList && e.classList.contains('is-leaving')) { gone = true; break; }
        if (!gone) return all[i];
      }
      return null;
    }
    function day() { var c = S() && S().clock; return c ? 'day ' + c.day + ' ' + c.phase + (c.stop && c.stop.kind ? '/' + c.stop.kind : '') : 'no clock'; }
    function fail(msg) { throw new Error('tutorial walk [' + at() + ', ' + SB.UI.route() + ', ' + day() + ']: ' + msg); }
    function flush() { if (env.flush) env.flush(); }
    function tapedEl() { return q('[data-taped]'); }
    function describe(e) { return e ? ((e.getAttribute('data-fk') || e.getAttribute('data-obj') || e.getAttribute('data-tut') || e.className || e.tagName) + '') : 'nothing'; }
    /* the one tape is on this element */
    function taped(sel) {
      var want = q(sel), tapes = d.querySelectorAll('.sy-tape'), got = tapedEl();
      if (!want) fail('nothing on the page matches ' + sel);
      if (tapes.length !== 1) fail(tapes.length + ' tapes on the page, wanted one on ' + sel);
      if (got !== want) fail('the tape is on ' + describe(got) + ', not on ' + sel);
      /* where it comes to rest (it is 134 x 55 and turned; the sticking-on animation is not counted) */
      var k = (tapes[0].offsetWidth || 134) / 134;     // it is sized in stage units: 134 x 55 at 1280 x 800
      var cx = parseFloat(tapes[0].style.left) + 67 * k, cy = parseFloat(tapes[0].style.top) + 27.5 * k, W = root.innerWidth || 1280, H = root.innerHeight || 800;
      var flat = /(^|[^0-9])-?90deg/.test(String(tapes[0].style.getPropertyValue ? tapes[0].style.getPropertyValue('--tr') : '')), hw = (flat ? 28 : 72) * k, hh = (flat ? 67 : 58) * k;
      if (!(cx - hw >= 0 && cy - hh >= 0 && cx + hw <= W && cy + hh <= H)) fail('the tape on ' + sel + ' hangs off the window: centre ' + Math.round(cx) + ',' + Math.round(cy));
      return want;
    }
    function tap(sel) { var e = taped(sel); if (e.disabled) fail(sel + ' is disabled'); e.click(); flush0(); return e; }
    function flush0() { /* a click's own redraw is synchronous; nothing to wait for */ }
    function expect(step, stage) {
      var c = cur();
      if (c.step !== step || (stage && c.stage !== stage)) fail('expected ' + step + (stage ? ':' + stage : ''));
    }
    function fk(v) { return '#main [data-fk="' + v + '"]'; }
    function hit(id) { return '#desk .dk-hit[data-obj="' + id + '"]'; }
    function clip() {
      var objs = SB.Desk.objects(), i, c = cur();
      for (i = 0; i < objs.length; i++) if (/^clip\d/.test(objs[i].id) && objs[i].params && objs[i].params.showId === c.showId) return hit(objs[i].id);
      fail('the show has no clip on the desk');
    }
    function down() { if (SB.UI.route() !== 'desk') tap('#main .cu-down'); if (SB.UI.route() !== 'desk') fail('putting it down did not go back to the desk'); }
    function show() { return S().shows[cur().showId]; }
    function text() { var c = cur(); return (c.text || '') + ' ' + (c.more || ''); }
    function clean() { var t = text(); if (!/\S/.test(t) || /\{|\}|undefined|  |\.,|, ,| \./.test(t)) fail('the step text has a hole in it: "' + t + '"'); }

    /* let the days go by, through the interface, until done() */
    function time(done, what) {
      var i, e, c, bs, s;
      for (i = 0; i < 400; i++) {
        s = S();
        if (done()) return;
        if (q('.cs-root')) { c = SB.Chapters.nextCutscene(s); if (c) seenCuts.push(c.key); q('.cs-root .cs-skip').click(); continue; }
        if (q('.sy-card')) { cards.push(q('.sy-card').getAttribute('data-patch')); q('.sy-card .sy-card-go').click(); continue; }
        e = live('#overlay .sb-check');
        if (e) { bs = e.querySelectorAll('button'); bs[bs.length - 1].click(); continue; }
        e = live('#overlay .sb-decision') || live('#overlay .cc-slap');
        if (e) {
          bs = Array.prototype.filter.call(e.querySelectorAll('button'), function (b) { return !b.disabled; });
          if (!bs.length) fail('a card with nothing to press: ' + e.textContent.slice(0, 80));
          c = bs.filter(function (b) { return /^\s*\d*\s*(later|keep waiting|close)\b/i.test(b.textContent); })[0] || bs[0];
          c.click(); continue;
        }
        if (SB.UI.route() === 'night') { if (done()) return; fail('the night opened while waiting for ' + what); }
        if (s.clock.phase === 'CLOSE') {
          if (SB.UI.route() !== 'close') SB.UI.go('close');
          e = q('#main .cc-tab--big.is-hot') || q('#main .cc-tab--big');
          if (!e) fail('the close-out has no button to go on');
          if (cur().target === 'lamp') taped(e.classList.contains('is-hot') ? '#main .cc-tab--big.is-hot' : '#main .cc-tab--big');
          e.click(); continue;
        }
        if (SB.UI.route() !== 'desk') { down(); continue; }
        if (s.clock.phase === 'PLAN' || (s.clock.stop && s.clock.stop.kind === 'END_OF_WEEK')) {
          if (cur().target === 'lamp' || cur().target === 'night') taped(hit('lamp'));
          q(hit('lamp')).click();
          if (SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause' });
          continue;
        }
        SB.UI.fire('sb-play', { cmd: 'next' });
      }
      e = q('#overlay');
      fail('time ran out waiting for ' + what + (e && /\S/.test(e.textContent || '') ? '; on the overlay: "' + String(e.textContent).replace(/\s+/g, ' ').slice(0, 200) + '"' : ''));
    }
    function until(key, what) { time(function () { return at() !== key; }, what); }

    var P = [];
    /* need: a selector that must be on the page before the phase runs (the host waits for it: the night plays out in real time) */
    function phase(name, shot, run, need) { P.push({ name: name, shot: shot, need: need || null, run: function () { run(); log.push(name + ' -> ' + at() + ' (' + day() + ')'); } }); }

    /* 1 ANSWER */
    phase('answer: the phone, the request row', '01-ANSWER', function () {
      expect('ANSWER'); clean();
      money0 = S().money ? JSON.stringify(S().money) : null;
      tap(hit('phone'));
      taped('#main .ph-row[data-fk="c-q:' + cur().requestId + '"]');
    });
    phase('answer: interested', null, function () {
      tap('#main .ph-row[data-fk="c-q:' + cur().requestId + '"]');
      tap(fk('tab-INTERESTED'));
      expect('HOLD', 'ASK'); clean();
    });
    /* 2 HOLD */
    phase('hold: hold a room, ask for the hold', '02-HOLD', function () {
      tap(fk('tab-HOLD'));
      taped(fk('tab-send-hold'));
    });
    phase('hold: sent, the host answers, confirm', null, function () {
      tap(fk('tab-send-hold'));
      expect('HOLD', 'WAIT'); clean();
      down();
      taped(hit('lamp'));
      if (env.autoPause) env.autoPause(hit('lamp')); else until('HOLD:WAIT', 'the hold');
      expect('HOLD', 'CONFIRM'); clean();
      if (!show().hold) fail('the room is not held');
      if (S().clock.stop && S().clock.stop.kind === 'END_OF_WEEK') fail('time ran to the end of the week past the hold');
      tap(clip());
      tap(fk('confirm'));
      expect('HOLD', 'WAIT');
      down();
      until('HOLD:WAIT', 'the room to confirm');
      expect('BILL', 'OFFER'); clean();
      if (show().status !== 'CONFIRMED') fail('the show is not confirmed');
    });
    /* 3 BILL */
    phase('bill: the offer to the touring band', null, function () {
      var touring = cur().bandId, name = S().bands[touring].name;
      if (text().indexOf(name) < 0 || !/offer/i.test(text())) fail('the BILL text does not say how ' + name + ' gets on the bill: "' + text() + '"');
      tap(hit('phone'));
      tap('#main .ph-row[data-fk="c-q:' + cur().requestId + '"]');
      tap(fk('tab-OFFER'));
      tap(fk('tab-send-offer'));
      expect('BILL', 'KIDS'); clean();
      down();
    });
    phase('bill: the sticker sheet', '03-BILL', function () {
      tap(clip());
      tap(fk('tobill'));
      taped(fk('cand-' + cur().bandId));
    });
    phase('bill: kids open, the draw closes', null, function () {
      var c = cur(), fee;
      tap(fk('cand-' + c.bandId)); tap(fk('gap-OPEN'));
      expect('BILL', 'LOCAL'); clean();
      c = cur();
      fee = SB.Bands.fee(S(), c.bandId, c.showId);
      if (fee.pay === 'FLAT' || fee.amount > 0) fail('the local draw the texts name asks ' + fee.pay + ' $' + fee.amount + ' for a ' + show().door.price + ' dollar door');
      tap(fk('cand-' + c.bandId)); tap(fk('gap-CLOSE'));
      expect('BILL', 'WAIT'); clean();
      down();
      until('BILL:WAIT', 'the bands to answer');
      expect('SOUND', 'ASK'); clean();
      var o = SB.Chapters.billOrder(S(), show()), last = show().bill.slots[show().bill.slots.length - 1];
      if (!o.ok || o.n < 3) fail('the bill is not kids, touring, draw: ' + JSON.stringify(show().bill.slots.map(function (x) { return S().bands[x.bandId].name + ' ' + x.role; })));
      if (last.pay === 'FLAT' || last.fee > 0) fail('the closer is on the bill for a flat fee');
    });
    /* 4 SOUND */
    phase('sound: the clipboard, the crew', '04-SOUND', function () {
      tap(clip());
      taped(fk('cr-sound' + cur().personId));
    });
    phase('sound: asked, answered', null, function () {
      tap(fk('cr-sound' + cur().personId));
      expect('SOUND', 'WAIT');
      down();
      until('SOUND:WAIT', 'sound to answer');
      expect('FLYER'); clean();
    });
    /* 5 FLYER */
    phase('flyer: the flyer desk', '05-FLYER', function () {
      tap(hit('paper'));
      taped('#main [data-tut="flyer-make"]');
    });
    phase('flyer: use this flyer', null, function () {
      tap('#main [data-tut="flyer-make"]');
      expect('PROMO', 'PLAN'); clean();
      down();
    });
    /* 6 PROMO */
    phase('promo: the calendar, a job', '06-PROMO', function () {
      var i, e;
      tap(hit('calendar'));
      for (i = 0; i < 6; i++) {            // open the pile the job is in
        e = tapedEl();
        if (!e) fail('no tape on the calendar');
        if (e.classList.contains('cc-note')) break;
        if (!e.classList.contains('cc-pile-top')) fail('the tape is on ' + describe(e) + ', not on a job');
        e.click();
      }
      taped('#main .cc-note[data-job="' + cur().jobId + '"]');
    });
    phase('promo: jobs on days, done', null, function () {
      var i, e, n = 0;
      for (i = 0; i < 40 && at() === 'PROMO:PLAN'; i++) {
        e = tapedEl();
        if (!e || d.querySelectorAll('.sy-tape').length !== 1) fail('no tape on the calendar');
        if (e.classList.contains('cc-half')) n++;
        else if (!e.classList.contains('cc-note') && !e.classList.contains('cc-pile-top')) fail('the tape is on ' + describe(e));
        e.click();
      }
      if (at() === 'PROMO:PLAN') fail('the jobs never got planned');
      if (n < 2) fail('fewer than two jobs were put on days');
      if (cur().step === 'PROMO') { down(); until('PROMO:WAIT', 'the jobs to get done'); }
      expect('WAIT', 'PLAY'); clean();
    });
    /* 7 WAIT */
    phase('wait: the tape deck', '07-WAIT', function () {
      if (SB.UI.route() !== 'desk') down();
      taped(hit('lamp'));
    });
    phase('wait: the weeks go by', null, function () {
      time(function () { return SB.UI.route() === 'night'; }, 'the night of the show');
      if (show().status !== 'CONFIRMED') fail('the show is ' + show().status + ' on its night');
      expect('DOOR'); clean();
    });
    /* 8 DOOR */
    phase('door: open the doors', '08-DOOR', function () {
      taped(fk('open'));
    });
    phase('door: the night', null, function () {
      var i, e;
      tap(fk('open'));
      for (i = 0; i < 60 && cur().step === 'DOOR'; i++) { e = tapedEl(); if (e) e.click(); flush(); }
      for (i = 0; i < 60 && !q('#main .nt-tab[data-option="custom"]'); i++) { e = tapedEl(); if (!e) flush(); else { e.click(); flush(); } }
      expect('SETTLE'); clean();
    });
    /* 9 SETTLE */
    phase('settle: the envelope', '09-SETTLE', function () {
      var v = SB.Night.settleView(S(), cur().showId);
      taped('#main .nt-tab[data-fk="opt-0"]');
      if (!q('#main .nt-tab[data-option="custom"]')) fail('the tape is not on the settle choices');
      if (v.gap > 0 || v.left < 0) fail('the show the texts built lost money: gap ' + v.gap + ', left ' + v.left);
      env.settle = { paid: v.door.paid, gross: v.door.gross, left: v.left };
    });
    phase('settle: paid', null, function () {
      tap('#main .nt-tab[data-fk="opt-0"]'); flush();
      expect('CLOSEOUT'); clean();
      if (show().status !== 'PLAYED') fail('the show is not played');
    });
    /* 10 CLOSEOUT */
    phase('close-out: back to the desk, the cutscene, the patch', '10-CLOSEOUT', function () {
      flush();
      tap(fk('leave'));
      time(function () { return !q('.cs-root') && !q('.sy-card') && !live('#overlay .cc-slap') && SB.UI.route() === 'desk'; }, 'the desk');
      if (seenCuts.indexOf('DOORS_AT_8_close') < 0) fail('DOORS_AT_8_close did not play (played: ' + seenCuts.join(', ') + ')');
      if (!S().patches.DOORS_AT_8) fail('the DOORS_AT_8 patch was not earned');
      if (cards.indexOf('DOORS_AT_8') < 0) fail('the DOORS_AT_8 card did not land on the desk');
      expect('CLOSEOUT');
      taped(hit('lamp'));
    }, '#main [data-fk="leave"]');
    phase('close-out: the week closes', null, function () {
      time(function () { return !S().story.tutorial.on; }, 'the close-out');
      if (S().story.tutorial.done === null) fail('the walkthrough did not finish');
      if (d.querySelector('.sy-tape')) fail('the tape is still up after the last step');
      log.push('settle ' + JSON.stringify(env.settle) + '; cutscenes ' + seenCuts.join(', ') + '; patches ' + Object.keys(S().patches).join(', '));
    });

    return { phases: P, log: log, at: at };
  }
  root.SBTutorialWalk = SBTutorialWalk;
})(typeof globalThis !== 'undefined' ? globalThis : this);
