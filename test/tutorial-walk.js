/* test/tutorial-walk.js — the guided first show, played through the interface.
 * One script, two hosts: test/uismoke.js runs it against the fake DOM (node test/uismoke.js --only tutorial), and
 * test/tutshots.js runs it in headless Chrome and saves a picture of every step (design/sample/tut-NN-STEP.png).
 *
 *   SBTutorialWalk(env) -> { phases: [{ name, shot, need, run }], log: [] }
 *   env: { flush() }   flush runs the timers that are waiting (the fake DOM's never fire by themselves); a browser passes nothing.
 * A new Pensacola game must already be at the desk with the opening cutscenes over (step ANSWER).
 * Everything is a click on the thing the masking tape points at: tap(selector) first checks that the one tape on the
 * page is on that element (it carries data-taped), then clicks it. The show is booked on its card
 * (design/spec/11-booking-pipeline.md): BOOK IT on the band's message, then the hold, the offer, the asks and the jobs
 * (DO IT TONIGHT) on the card, and CALL IT A NIGHT on the card's foot wherever the guide says to wait. Only the play-out
 * is moved another way: a called night is played to the next stop with the 'sb-play' { cmd: 'next' } event
 * (js/ui/screens/week.js); from the desk an evening is called on the tape deck (the end of a week closed there). A phase throws on the first thing that is wrong. `shot` names the picture to take after it.
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
    /* the outgoing booker's call at the start of a step (js/ui/story.js coach) plays over whatever is up: watch it through */
    function coachKey() {
      var c = cur(), k = 'TUT_' + (c.step || '') + (c.stage ? '_' + c.stage : ''), all = SB.Content.story.coach || {};
      return all[k] ? k : 'TUT_' + (c.step || '');
    }
    function cuts() {
      for (var i = 0; i < 12 && q('.cs-root'); i++) { var c = SB.Chapters.nextCutscene(S()); seenCuts.push(c ? c.key : coachKey()); q('.cs-root .cs-skip').click(); }
    }
    function taped(sel) {
      cuts();
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
      cuts();
      var c = cur();
      if (c.step !== step || (stage && c.stage !== stage)) fail('expected ' + step + (stage ? ':' + stage : ''));
    }
    function fk(v) { return '#main [data-fk="' + v + '"]'; }
    /* CALL IT A NIGHT is the pinned night clock's (js/ui/nightclock.js), on the card as everywhere else */
    var NIGHT = '#nightclock .ck-call';   // the clock's one button: call it a night, or play on between evenings (no :not() in the fake DOM)
    /* where calling it a night is on the desk: the pinned clock while a week is played, its close-the-week at the end of one, else the tape deck */
    var WEEKEND = '[data-fk="closeweek"]:not([disabled])';
    function nightSel() { return q(WEEKEND) && !q(NIGHT) ? WEEKEND : NIGHT; }   // no tape deck on the desk (2026-11-22): the clock
    function hit(id) { return '#desk .dk-hit[data-obj="' + id + '"]'; }
    function clip() {
      var objs = SB.Desk.objects(), i, c = cur();
      for (i = 0; i < objs.length; i++) if (/^clip\d/.test(objs[i].id) && objs[i].params && objs[i].params.showId === c.showId) return hit(objs[i].id);
      fail('the show has no clip on the desk');
    }
    /* back to the desk. The tape is on "put it down" only when the thing to press is not here; on the show's card it is
     * on the card's own button (CALL IT A NIGHT while waiting), so putting the card down is a plain click. */
    function down() {
      var e;
      if (SB.UI.route() === 'desk') return;
      e = q('#main .cu-down');
      if (!e) fail('nothing here goes back to the desk');
      if (tapedEl() === e) tap('#main .cu-down'); else e.click();
      if (SB.UI.route() !== 'desk') fail('putting it down did not go back to the desk');
    }
    /* the guided show's card, from wherever the walk is: the clip on the desk (where the tape is) opens it */
    function toCard() {
      if (SB.UI.route() === 'show' && q(NIGHT)) return card();
      down();
      tap(clip());
      if (SB.UI.route() !== 'show') fail('the clip did not open the show\'s card');
      return card();
    }
    /* CALL IT A NIGHT on the card's foot, where the tape is while the guide says wait. The card asks to be picked up
     * again at the next evening; the walk drives the play-out itself, so it stops the deck as the player would. */
    function cardNight() {
      tap(NIGHT);
      if (SB.UI.route() !== 'desk') fail('CALL IT A NIGHT on the card did not go to the desk');
      if (SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause', by: 'player' });
    }
    function show() { return S().shows[cur().showId]; }
    /* the card (js/ui/screens/shows.js): its root, the count on its foot, and its rows all on the sheet (a real browser only) */
    function card() { var e = q('#main .cb-card'); if (!e) fail('the show\'s card is not up'); return e; }
    function outN() { var e = q('#main .cb-asksout'); return e ? Number(e.getAttribute('data-n')) : -1; }
    /* the seven steps, one of them unfolded to its rows (the one named), the NEXT line, tonight's clock and
     * CALL IT A NIGHT on the foot; all of it on the sheet (a real browser only) */
    function cardFits(step) {
      cuts();
      var heads = d.querySelectorAll('#main .cb-stephead'), rows = d.querySelectorAll('#main .cb-cardrow'), box = q('#main .cu-in'),
          b = box && box.getBoundingClientRect ? box.getBoundingClientRect() : null, all = [], i, r;
      if (heads.length !== 7) fail('the card has ' + heads.length + ' steps, not seven');
      if (!rows.length) fail('the card has no step unfolded');
      if (step && card().getAttribute('data-step') !== step) fail('the card is unfolded on ' + card().getAttribute('data-step') + ', not ' + step);
      if (!q('#main .cb-next .cb-nexttext') || !/\S/.test(q('#main .cb-next .cb-nexttext').textContent)) fail('the card has no NEXT line');
      if (!q(NIGHT)) fail('the night clock has no CALL IT A NIGHT over the card');
      if (!b || !b.height) return;
      for (i = 0; i < heads.length; i++) all.push(heads[i]);
      for (i = 0; i < rows.length; i++) all.push(rows[i]);
      for (i = 0; i < all.length; i++) { r = all[i].getBoundingClientRect(); if (r.height && (r.top < b.top - 1 || r.bottom > b.bottom + 1)) fail('on the card, ' + describe(all[i]) + ' is off the sheet'); }
    }
    function text() { var c = cur(); return (c.text || '') + ' ' + (c.more || ''); }
    function clean() { var t = text(); if (!/\S/.test(t) || /\{|\}|undefined|  |\.,|, ,| \./.test(t)) fail('the step text has a hole in it: "' + t + '"'); }

    /* let the days go by, through the interface, until done() */
    function time(done, what) {
      var i, e, c, bs, s;
      for (i = 0; i < 400; i++) {
        s = S();
        if (done()) return;
        if (q('.cs-root')) { c = SB.Chapters.nextCutscene(s); seenCuts.push(c ? c.key : coachKey()); q('.cs-root .cs-skip').click(); continue; }
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
        /* the show's card is up at an evening: CALL IT A NIGHT is on its foot (the tape is there while the guide waits) */
        if (SB.UI.route() === 'show' && q(NIGHT) && s.clock.stop && s.clock.stop.kind === 'EVENING') {
          if (cur().target === 'lamp') taped(NIGHT);
          q(NIGHT).click();
          if (SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause', by: 'player' });
          continue;
        }
        if (SB.UI.route() !== 'desk') { down(); continue; }
        /* an evening: call it a night on the tape deck (where the tape is, when the step points there); the end of a week: close it */
        if (s.clock.stop && (s.clock.stop.kind === 'EVENING' || s.clock.stop.kind === 'END_OF_WEEK')) {
          if (cur().target === 'lamp' || cur().target === 'night') taped(nightSel());
          q(nightSel()).click();
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
    /* BOOK IT is the one yes on a band's message: it says you are interested (a message: half an hour), makes the
     * show and opens its card on the room */
    phase('answer: book it', null, function () {
      var e, left0 = SB.Week.tonight(S()).left;
      tap('#main .ph-row[data-fk="c-q:' + cur().requestId + '"]');
      e = taped('#main [data-tut="req-book"]');
      if (q(fk('tab-INTERESTED')) || q(fk('tab-HOLD')) || q(fk('tab-OFFER'))) fail('the request still has more than one way to say yes');
      if (!q(fk('tab-PASS'))) fail('the request has no PASS');
      if (!/\u00bd HR/.test(e.textContent)) fail('BOOK IT does not say what it costs: "' + e.textContent + '"');
      tap('#main [data-tut="req-book"]');
      if (SB.UI.route() !== 'show') fail('BOOK IT did not open the show\'s card');
      if (left0 - SB.Week.tonight(S()).left !== SB.Config.MAIL.hours) fail('BOOK IT took ' + (left0 - SB.Week.tonight(S()).left) + ' hours of the night, not the one message');
      expect('HOLD', 'ASK'); clean();
    });
    /* 2 HOLD: the card opens on the ROOM step */
    phase('hold: hold a room, ask for the hold', '02-HOLD', function () {
      if (card().getAttribute('data-sel') !== 'room') fail('the card did not open on the room row');
      cardFits('ROOM');
      taped(fk('hold'));
    });
    phase('hold: sent, the host answers, confirm', null, function () {
      tap(fk('hold'));
      expect('HOLD', 'WAIT'); clean();
      if (outN() !== 1) fail('the card\'s foot counts ' + outN() + ' asks going out tonight, not the one hold');
      /* waiting is CALL IT A NIGHT, on the card: nobody goes looking for the tape deck */
      taped(NIGHT);
      cardNight();
      taped(nightSel());
      if (env.autoPause) env.autoPause(NIGHT); else until('HOLD:WAIT', 'the hold');
      if (at() === 'HOLD:HELD') { if (cur().target !== 'lamp') fail('the room is held with something still wanted: ' + text()); until('HOLD:HELD', 'the held night to be booked'); }
      /* a yes is a yes: the host's answer books the night, no second message */
      expect('BILL', 'OFFER'); clean();
      if (show().status !== 'CONFIRMED') fail('the host said yes but the show is not booked');
      if (S().clock.stop && S().clock.stop.kind === 'END_OF_WEEK') fail('time ran to the end of the week past the hold');
    });
    /* 3 BILL: all of it on the card, which stands on the row the guide is about: the offer slip, then the sticker sheet */
    phase('bill: the offer to the touring band', null, function () {
      var touring = cur().bandId, name = S().bands[touring].name;
      if (text().indexOf(name) < 0 || !/offer/i.test(text())) fail('the BILL text does not say how ' + name + ' gets on the bill: "' + text() + '"');
      toCard();
      if (card().getAttribute('data-sel') !== 'offer') fail('the card did not open on the offer');
      tap(fk('send-offer'));
      expect('BILL', 'KIDS'); clean();
    });
    phase('bill: the sticker sheet', '03-BILL', function () {
      if (card().getAttribute('data-sel') !== 'slot-' + cur().slot) fail('the card did not move on to the ' + cur().slot + ' slot');
      cardFits('BILL');
      taped(fk('cand-' + cur().bandId));
    });
    phase('bill: kids open, the draw closes', null, function () {
      var c = cur(), fee;
      tap(fk('cand-' + c.bandId));
      expect('BILL', 'LOCAL'); clean();
      c = cur();
      fee = SB.Bands.fee(S(), c.bandId, c.showId);
      if (fee.pay === 'FLAT' || fee.amount > 0) fail('the local draw the texts name asks ' + fee.pay + ' $' + fee.amount + ' for a ' + show().door.price + ' dollar door');
      if (card().getAttribute('data-sel') !== 'slot-CLOSE') fail('the card did not move on to the headliner');
      tap(fk('cand-' + c.bandId));
      /* everybody on the bill is asked: sound next, in the same sitting, before any wait */
      expect('SOUND', 'ASK'); clean();
      if (outN() !== 3) fail('the card\'s foot counts ' + outN() + ' messages going out tonight, not the offer and the two locals');
    });
    /* 4 SOUND: asked while the bands answer, so bands and sound come back over one wait */
    phase('sound: the row, the crew', '04-SOUND', function () {
      if (card().getAttribute('data-sel') !== 'sound') fail('the card did not move on to sound');
      cardFits('CREW');
      taped(fk('cr-sound' + cur().personId));
    });
    /* the room is confirmed, so the flyer does not wait on the bands (they go on it as TBA): asked, the guide goes
     * straight to the flyer, the same night */
    phase('sound: asked; the flyer goes on the same night', null, function () {
      tap(fk('cr-sound' + cur().personId));
      expect('FLYER', 'MAKE'); clean();
      if (outN() !== 4) fail('the card\'s foot counts ' + outN() + ' messages going out tonight, not the offer, the two locals and sound');
    });
    /* 5 FLYER: the card's flyer row, into the flyer desk, and USE THIS FLYER comes back to the card */
    phase('flyer: the flyer desk', '05-FLYER', function () {
      toCard();
      if (card().getAttribute('data-sel') !== 'flyer') fail('the card did not open on the flyer');
      tap(fk('flyer'));
      if (SB.UI.route() !== 'flyerdesk') fail('the flyer row did not open the flyer desk');
      taped('#main [data-tut="flyer-make"]');
    });
    /* the room is booked and the flyer made, so the evenings spent waiting on the bands and sound go to getting the
     * word out (SB.Tutorial.current: PROMO while BILL or SOUND waits); the answers come in along the way */
    phase('flyer: use this flyer, on to getting the word out', null, function () {
      tap('#main [data-tut="flyer-make"]');
      if (SB.UI.route() !== 'show' || card().getAttribute('data-sel') !== 'promo') fail('USE THIS FLYER did not make the flyer and come back to the card\'s promo row');
      clean();
      if (!/^(PROMO|BILL|SOUND):/.test(at())) fail('with the flyer made, the guide says ' + at());
    });
    /* 6 PROMO: the ANNOUNCE step: each job with what it takes and when it is due, and DO IT TONIGHT */
    phase('promo: the calendar, a job', '06-PROMO', function () {
      if (at() !== 'PROMO:PLAN') return;
      cardFits('ANNOUNCE');
      taped('#main [data-tut="card-donow"][data-tut-ref="' + cur().jobId + '"]');
    });
    phase('promo: jobs on days, done; the bands and sound answered', null, function () {
      var i, e, n = 0, nights = 0, k, o, last;
      for (i = 0; i < 80 && /^(PROMO|BILL|SOUND)$/.test(cur().step || ''); i++) {
        if (at() === 'PROMO:PLAN') {
          /* the job the guide names: its DO IT TONIGHT, or the row (or folded step) it is under */
          toCard();
          cuts();
          e = tapedEl();
          if (!e || d.querySelectorAll('.sy-tape').length !== 1) fail('no tape on the card');
          k = e.getAttribute('data-tut');
          if (k === 'card-donow') { if (e.getAttribute('data-tut-ref') !== cur().jobId) fail('the tape is on another job\'s DO IT TONIGHT'); n++; }
          else if (k !== 'card-row' && k !== 'card-step') fail('the tape is on ' + describe(e) + ', not on a job to do tonight');
          if (e.disabled) fail(describe(e) + ' is disabled');
          e.click();
        } else if (/:WAIT$/.test(at())) {
          /* nothing more fits tonight, or answers are out: call it a night */
          if (nights++ > 14) fail('the promo jobs never got done');
          if (SB.UI.route() === 'show') cardNight();
          until(at(), 'tomorrow');
        } else fail('the guide asks for ' + at() + ' while getting the word out');
      }
      if (n < 3) fail('fewer than the flyer and two promo jobs were done from the card (' + n + ')');
      expect('WAIT', 'PLAY'); clean();
      o = SB.Chapters.billOrder(S(), show()); last = show().bill.slots[show().bill.slots.length - 1];
      if (!o.ok || o.n < 3) fail('the bill is not kids, touring, draw: ' + JSON.stringify(show().bill.slots.map(function (x) { return S().bands[x.bandId].name + ' ' + x.role; })));
      if (last.pay === 'FLAT' || last.fee > 0) fail('the closer is on the bill for a flat fee');
      if (!(show().crew && show().crew.sound)) fail('sound did not say yes');
    });
    /* 7 WAIT */
    phase('wait: the tape deck', '07-WAIT', function () {
      /* waiting is CALL IT A NIGHT on the pinned night clock, on the card or the desk; the tape deck when the clock is away */
      if (SB.UI.route() === 'show') taped(NIGHT);
      down();
      taped(nightSel());
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
      /* a full room on the first show slides one note onto the table (DOORS_FULL): answer it with its first choice */
      function answerNote() { var n = q('#main .nt-note .nt-tab:not([disabled])'); if (n) { n.click(); flush(); return true; } return false; }
      answerNote();
      /* while the night plays out the guide keeps quiet (no tape: js/ui/story.js, body.nt-playing); the player skips to
       * the settle themselves, or lets it play */
      for (i = 0; i < 400 && !q('#main .nt-tab[data-option="custom"]'); i++) {
        if (answerNote()) continue;
        e = tapedEl() || q(fk('skip') + ':not([disabled])');
        if (e) e.click();
        flush();
      }
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
      taped(nightSel());
    }, '#main [data-fk="leave"]');
    phase('close-out: the week closes', null, function () {
      time(function () { return !S().story.tutorial.on; }, 'the close-out');
      if (S().story.tutorial.done === null) fail('the walkthrough did not finish');
      if (d.querySelector('.sy-tape')) fail('the tape is still up after the last step');
      /* the outgoing booker's call played as a cutscene for the two steps that keep one (fix-list 1.19: every other step's
       * call is folded into the mentor's text on the strip, so it is never "seen" as a scene) */
      ['TUT_ANSWER_REPLY', 'TUT_DOOR'].forEach(function (k) {
        if (S().story.seen.indexOf(k) < 0) fail('the call ' + k + ' never played (seen: ' + S().story.seen.join(', ') + ')');
      });
      log.push('settle ' + JSON.stringify(env.settle) + '; cutscenes ' + seenCuts.join(', ') + '; patches ' + Object.keys(S().patches).join(', '));
    });

    return { phases: P, log: log, at: at };
  }
  root.SBTutorialWalk = SBTutorialWalk;
})(typeof globalThis !== 'undefined' ? globalThis : this);
