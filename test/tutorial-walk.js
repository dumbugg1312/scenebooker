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
      /* spec 14 text budget: the line the guide says now is 25 words at most, and the strip shows that line alone */
      [c.more, c.nudge, c.wrong].forEach(function (x) { if (x && words(x) > 25) fail('a walkthrough line is ' + words(x) + ' words, over 25: "' + x + '"'); });
      var st = q('.sy-strip .sy-strip-text');
      if (st && c.text && st.textContent.indexOf(c.text) >= 0) fail('the strip stacks the step\'s why on its line: "' + st.textContent + '"');
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
      /* a step with one row is that row: it opens with no rows under it (2026-11-24), so an open step is enough */
      if (!rows.length && !q('#main .cb-step.is-open')) fail('the card has no step unfolded');
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
        if (q('.cs-root')) { c = SB.Chapters.nextCutscene(s); seenCuts.push(c ? c.key : coachKey()); if (c) cutDays[c.key] = s.clock.day; q('.cs-root .cs-skip').click(); continue; }
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
    /* one new thing a night: let the nights go by until the guide is on `key` */
    function nightOf(key, what) { time(function () { return at() === key; }, what); }
    /* tonight's lesson is done: the guide says to call it a night (a WAIT on the clock), in its own line */
    function rested(what) {
      var c = cur();
      cuts();
      if (!/:WAIT$/.test(at()) || c.target !== 'lamp') fail('after ' + what + ' the guide goes on to ' + at() + ' the same night');
      if (!/call it a night/i.test(c.more || '')) fail('after ' + what + ' the guide does not say to call it a night: "' + c.more + '"');
      if (words(c.more) > 25) fail('the call-it-a-night line is over 25 words: "' + c.more + '"');
      taped(NIGHT);
    }

    /* what is on the phone (SB.Mail.inbox), as kinds; and the words of a text */
    function mailKinds() { return SB.Mail.inbox(S()).map(function (m) { return m.kind; }).sort().join(','); }
    function words(t) { return String(t || '').split(/\s+/).filter(function (w) { return /\S/.test(w); }).length; }
    var cutsAtDoor = null;
    /* the day each chapter scene played on (time()), and whether this game asks its setup after the show (spec 14) */
    var cutDays = {}, later = false, showDay = null;

    var P = [];
    /* need: a selector that must be on the page before the phase runs (the host waits for it: the night plays out in real time) */
    function phase(name, shot, run, need) { P.push({ name: name, shot: shot, need: need || null, run: function () { run(); log.push(name + ' -> ' + at() + ' (' + day() + ')'); } }); }

    /* 1 ANSWER */
    phase('answer: the phone, the request row', '01-ANSWER', function () {
      var hand;
      expect('ANSWER'); clean();
      /* night 1 has one message on the phone, the touring band's, beside a short handoff (spec 14): the local draw, the
       * kids, the mass email and the host's hello all come later */
      if (mailKinds() !== 'HANDOFF,REQUEST') fail('the first night\'s phone holds ' + mailKinds() + ', not the handoff and the one request');
      hand = SB.Mail.inbox(S()).filter(function (m) { return m.kind === 'HANDOFF'; })[0];
      if (words(hand.body) > 60) fail('the handoff is ' + words(hand.body) + ' words, over the 60 a walked-through player gets');
      if (S().director.queue.length) fail('a week event is queued while the first show is walked through');
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
      /* the first thing that cost time: the walkthrough stops once on the night clock */
      expect('HOLD', 'CLOCK'); clean();
    });
    /* the clock lesson (spec 14, night 1): one line from the outgoing booker naming what that cost and what is left, the
     * tape on the pinned night clock, and GOT IT (or a tap on the clock) goes on to the room */
    phase('the clock lesson: what that took, what is left', '01b-CLOCK', function () {
      var c = cur(), strip = q('.sy-strip'), ok = q('.sy-strip [data-fk="clock-ok"]');
      if (c.target !== 'clock') fail('the clock lesson points at ' + c.target + ', not the clock');
      if (!/half an hour/.test(c.more) || !/3\u00bd hours/.test(c.more) || !/overnight/.test(c.more)) fail('the clock lesson does not name the cost, what is left and the overnight replies: "' + c.more + '"');
      if (words(c.more) > 25) fail('the clock lesson is ' + words(c.more) + ' words, over the 25 of a coach text');
      taped('#nightclock .ck-ruler');
      if (!strip || strip.textContent.indexOf(c.more) < 0) fail('the strip does not say the clock lesson: "' + (strip ? strip.textContent : '') + '"');
      if (!ok) fail('the clock lesson has no GOT IT on the strip');
      tap('#nightclock .ck-ruler');
      expect('HOLD', 'ASK'); clean();
      if (!S().story.tutorial.clockSeen) fail('the clock lesson was not written down as read');
      if (q('.sy-strip [data-fk="clock-ok"]')) fail('GOT IT is still on the strip after the clock lesson');
    });
    /* 2 HOLD: the card opens on the ROOM step */
    phase('hold: hold a room, ask for the hold', '02-HOLD', function () {
      var c = cur(), strip = q('.sy-strip'), why;
      if (card().getAttribute('data-sel') !== 'room') fail('the card did not open on the room row');
      cardFits('ROOM');
      taped(fk('hold'));
      /* one line on the strip; the why is one press away on it, unfolds in place and folds back (spec 14) */
      if (!strip || q('.sy-strip .sy-strip-text').textContent !== c.more) fail('the strip does not say just the stage line: "' + (strip ? strip.textContent : '') + '"');
      why = q('.sy-strip [data-fk="tut-why"]');
      if (!why) fail('the coach line has no "why?"');
      if (q('.sy-strip .sy-why-text')) fail('the why is unfolded before it was asked for');
      why.click();
      if (!q('.sy-strip .sy-why-text') || q('.sy-strip .sy-why-text').textContent !== c.text) fail('"why?" did not unfold the step\'s why: "' + (q('.sy-strip .sy-why-text') || { textContent: '' }).textContent + '"');
      if (!q('.sy-strip .sy-why-where') || !/ROOM/.test(q('.sy-strip .sy-why-where').textContent)) fail('the why does not show where you are on the map');
      q('.sy-strip [data-fk="tut-why"]').click();
      if (q('.sy-strip .sy-why-text')) fail('"why?" did not fold back');
      /* the card's NEXT line says what the guide says: ask the room */
      if (!/hold/i.test(q('#main .cb-next .cb-nexttext').textContent) || !/hold/i.test(c.more)) fail('the card and the guide disagree at HOLD:ASK: "' + q('#main .cb-next .cb-nexttext').textContent + '" / "' + c.more + '"');
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
      /* night 2: the local draw has written by now; the mass email and the host's hello still wait for the show */
      if (S().clock.day >= 1 && !SB.Mail.inbox(S()).some(function (m) { return m.kind === 'BAND' && m.refs && m.refs.bandId === SB.Tutorial.cast(S()).closer; })) fail('the local draw has not written by day ' + S().clock.day);
      if (SB.Mail.inbox(S()).some(function (m) { return m.kind === 'ROOM' && /same rules as before/i.test(m.body || ''); })) fail('the host\'s hello arrived before the guided show was played');
      if (Object.keys(S().requests).length !== 1) fail('another request arrived before the guided show was played (' + Object.keys(S().requests).length + ')');
      if (text().indexOf(name) < 0 || !/offer/i.test(text())) fail('the BILL text does not say how ' + name + ' gets on the bill: "' + text() + '"');
      toCard();
      if (card().getAttribute('data-sel') !== 'offer') fail('the card did not open on the offer');
      tap(fk('send-offer'));
      expect('BILL', 'LOCAL'); clean();   // the local draw first (spec 14: the draw writes on night 2, the kids on night 3)
    });
    phase('bill: the sticker sheet', '03-BILL', function () {
      if (card().getAttribute('data-sel') !== 'slot-' + cur().slot) fail('the card did not move on to the ' + cur().slot + ' slot');
      cardFits('BILL');
      taped(fk('cand-' + cur().bandId));
    });
    phase('bill: the draw closes; sound the same sitting', null, function () {
      var c = cur(), fee;
      fee = SB.Bands.fee(S(), c.bandId, c.showId);
      if (fee.pay === 'FLAT' || fee.amount > 0) fail('the local draw the texts name asks ' + fee.pay + ' $' + fee.amount + ' for a ' + show().door.price + ' dollar door');
      if (card().getAttribute('data-sel') !== 'slot-CLOSE') fail('the card did not open on the headliner');
      tap(fk('cand-' + c.bandId));
      /* a night does as much as its hours allow (user 2026-11-24): sound is asked in the same sitting as the bands */
      if (outN() !== 2) fail('the card\'s foot counts ' + outN() + ' messages going out tonight, not the offer and the draw');
      if (at() !== 'SOUND:ASK') fail('after the offer and the draw the guide says ' + at() + ', not sound the same sitting');
      expect('SOUND', 'ASK'); clean();
    });
    /* 4 SOUND: the same sitting as the bands */
    phase('sound: the row, the crew', '04-SOUND', function () {
      toCard();
      if (card().getAttribute('data-sel') !== 'sound') fail('the card did not open on sound');
      cardFits('CREW');
      taped(fk('cr-sound' + cur().personId));
    });
    /* the room is confirmed, so the flyer goes up the same night (bands as TBA); a first-timer names the outfit first */
    phase('sound: asked; the flyer the same night', null, function () {
      tap(fk('cr-sound' + cur().personId));
      if (at() !== 'FLYER:NAME') fail('after sound the guide says ' + at() + ', not the flyer the same night');
      expect('FLYER', 'NAME'); clean();
      if (S().player.bookingName !== '') fail('the walked-through game already has a booking name: "' + S().player.bookingName + '"');
    });
    /* 5 FLYER: the card's flyer row, into the flyer desk, and USE THIS FLYER comes back to the card */
    phase('flyer: the flyer desk', '05-FLYER', function () {
      toCard();
      if (card().getAttribute('data-sel') !== 'flyer') fail('the card did not open on the flyer');
      /* the card's NEXT line says what the guide says: name your shows at the flyer desk */
      if (cur().stage === 'NAME' && (!/name/i.test(q('#main .cb-next .cb-nexttext').textContent) || !/name/i.test(cur().more))) fail('the card and the guide disagree at FLYER:NAME: "' + q('#main .cb-next .cb-nexttext').textContent + '" / "' + cur().more + '"');
      tap(fk('flyer'));
      if (SB.UI.route() !== 'flyerdesk') fail('the flyer row did not open the flyer desk');
      /* the name sheet comes first (spec 14, night "5 Fri"): the tape on its name field, no flyer to use yet */
      var sheet = q('#main [data-tut="name-sheet"]'), inp, lp;
      if (!sheet) fail('the flyer desk opened with no booking name and no name sheet');
      if (q('#main [data-tut="flyer-make"]')) fail('the flyer can be used before it has a name on it');
      if (!/who's putting it on/.test(sheet.textContent)) fail('the name sheet does not say why it asks: "' + sheet.textContent.slice(0, 160) + '"');
      if (!q('#main [data-tut="name-sheet"] [data-fk="lettering"]') || !q('#main [data-tut="name-sheet"] [data-fk="idea-0"]')) fail('the name sheet has no lettering dropdown or no ideas');
      taped('#main [data-tut="name-sheet"] [data-fk="name-in"]');
      /* an empty name is refused and nothing is saved */
      q('#main [data-fk="name-done"]').click();
      if (S().player.bookingName !== '' || !q('#main [data-tut="name-sheet"]')) fail('the name sheet took an empty name');
      inp = q('#main [data-tut="name-sheet"] input');
      if (!inp) fail('the name sheet has no field to type in');
      inp.value = 'Extension Cord Booking';
      q('#main [data-fk="name-done"]').click();
      if (S().player.bookingName !== 'Extension Cord Booking') fail('the name sheet did not save the booking name ("' + S().player.bookingName + '")');
      if (!S().player.mark || !S().player.mark.treatment) fail('the name sheet did not save the lettering as the mark\'s treatment: ' + JSON.stringify(S().player.mark));
      if (SB.UI.route() !== 'flyerdesk' || q('#main [data-tut="name-sheet"]')) fail('the flyer desk did not carry on after the name was saved');
      if (SB.Jobs.flyerSpec(S(), show().id).presenter !== 'Extension Cord Booking') fail('the flyer is not presented by the new name');
      expect('FLYER', 'MAKE');
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
      var i, e, n = 0, nights = 0, k, o, last, kidsAsked = false;
      for (i = 0; i < 80 && /^(PROMO|BILL|SOUND)$/.test(cur().step || ''); i++) {
        if (at() === 'PROMO:PLAN') {
          /* the first day off says so: ten hours (spec 14, night 6) */
          if (SB.Week.tonight(S()).off && S().story.tutorial.offDay === S().clock.day && !/ten hours/i.test(cur().more || '')) fail('the first day off does not say it has ten hours: "' + cur().more + '"');
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
        } else if (at() === 'BILL:KIDS') {
          /* the kids, once they have written (their own message first) */
          if (!SB.Mail.inbox(S()).some(function (m) { return m.kind === 'BAND' && m.refs && m.refs.bandId === SB.Tutorial.cast(S()).kids; })) fail('the guide asks for the kids before they wrote (day ' + S().clock.day + ')');
          toCard();
          if (card().getAttribute('data-sel') !== 'slot-OPEN') fail('the card did not open on the opener');
          tap(fk('cand-' + cur().bandId));
          kidsAsked = true;
        } else if (/:(WAIT|OUT)$/.test(at())) {
          /* nothing more fits tonight, or answers are out: call it a night */
          if (nights++ > 14) fail('the promo jobs never got done');
          if (SB.UI.route() === 'show') cardNight();
          until(at(), 'tomorrow');
        } else fail('the guide asks for ' + at() + ' while getting the word out');
      }
      if (!kidsAsked && !show().bill.slots.some(function (x) { return x.bandId === SB.Tutorial.cast(S()).kids; })) fail('the kids were never asked');
      if (n < 2) fail('fewer than two promo jobs were done from the card (' + n + ')');
      if (!(show().promo && show().promo.flyer)) fail('the flyer was not made before the word went out');
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
      /* nothing cut in on the way here: no chapter scene, no forced decision, no other request (spec 14) */
      cutsAtDoor = seenCuts.slice();
      if (cutsAtDoor.some(function (k) { return !/^TUT_/.test(k); })) fail('a chapter scene played before the guided show: ' + cutsAtDoor.join(', '));
      if (Object.keys(S().requests).length !== 1) fail('another request arrived before the guided show was played');
      if (S().director.queue.length) fail('a week event was queued before the guided show was played');
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
      env.floor = show().night && show().night.floor ? show().night.floor.paid : null;
    });
    phase('settle: paid', null, function () {
      tap('#main .nt-tab[data-fk="opt-0"]'); flush();
      expect('CLOSEOUT'); clean();
      if (show().status !== 'PLAYED') fail('the show is not played');
    });
    /* 10 CLOSEOUT */
    /* A first-timer's game (SB.Game.newGame setupLater, spec 14 "After the show"): the recap card, then the setup scene,
     * then the patch card, then the desk; the chapter scenes wait for later evenings. Any other game: the show's own
     * scene and the patch, as before. */
    phase('close-out: back to the desk' + ', the recap card', '10-CLOSEOUT', function () {
      var i, e, tx, rows, names, n0 = seenCuts.length;
      later = !!(SB.Chapters.setup && SB.Chapters.setup(S()));
      showDay = show().day;
      flush();
      tap(fk('leave'));
      if (!later) {
        time(function () { return !q('.cs-root') && !q('.sy-card') && !live('#overlay .cc-slap') && SB.UI.route() === 'desk'; }, 'the desk');
        if (seenCuts.indexOf('DOORS_AT_8_close') < 0) fail('DOORS_AT_8_close did not play (played: ' + seenCuts.join(', ') + ')');
        if (!S().patches.DOORS_AT_8) fail('the DOORS_AT_8 patch was not earned');
        if (cards.indexOf('DOORS_AT_8') < 0) fail('the DOORS_AT_8 card did not land on the desk');
        expect('CLOSEOUT');
        taped(nightSel());
        return;
      }
      for (i = 0; i < 6 && !live('#overlay .sy-recap'); i++) flush();
      e = live('#overlay .sy-recap');
      if (!e) fail('no recap card after the guided show (at ' + SB.UI.route() + ', setup ' + S().story.setup + ', queue: ' + S().story.cutscenes.map(function (x) { return x.key; }).join(', ') + ')');
      if (SB.UI.route() !== 'desk') fail('the recap card is not at the desk');
      if (q('.cs-root') || seenCuts.length !== n0) fail('a scene played in front of the recap card (' + seenCuts.slice(n0).join(', ') + ')');
      if (q('.sy-card') || cards.indexOf('DOORS_AT_8') >= 0) fail('the patch card landed before the recap card');
      if (S().story.cutscenes[0].key !== 'GOING_AWAY_setup') fail('the setup scene is not next behind the recap card');
      if (!S().story.cutscenes[0].slots || S().story.cutscenes[0].slots.after !== true || S().story.cutscenes[0].slots.cold) fail('the setup was not queued as after the show');
      /* the recap tells the night, so the show's own scene goes in the box unplayed instead of telling it again a day late */
      if (S().story.cutscenes.some(function (x) { return x.key === 'DOORS_AT_8_close'; }) || S().story.seen.indexOf('DOORS_AT_8_close') < 0) fail('DOORS_AT_8_close should be in the box unplayed behind the recap card');
      tx = String(e.textContent).replace(/\s+/g, ' ');
      if (/\{|\}|undefined|NaN/.test(tx)) fail('the recap card has a hole in it: "' + tx + '"');
      if (tx.indexOf(String(env.settle.paid)) < 0 || tx.indexOf(SB.text.money(show().result.accounts.door)) < 0) fail('the recap card does not say how many paid and what the door took: "' + tx + '"');
      rows = e.querySelectorAll('.sy-recap-row');
      names = show().bill.slots.map(function (x) { return S().bands[x.bandId].name; });
      if (rows.length < names.length + 2) fail('the recap card pays ' + rows.length + ' lines, fewer than the room, ' + names.length + ' bands and you');
      names.forEach(function (nm) { if (tx.indexOf(nm) < 0) fail('the recap card does not name ' + nm); });
      if (!rows[rows.length - 1].classList.contains('is-you')) fail('the last line of the pay-out is not yours');
      if (!q('#overlay .sy-recap .sy-recap-good') || !/\S/.test(q('#overlay .sy-recap .sy-recap-good').textContent)) fail('the recap card has no line on what went well');
      if (!q('#overlay .sy-recap .irl')) fail('the recap card has no real-life lesson under it');
      if (e.querySelectorAll('button').length !== 1) fail('the recap card has ' + e.querySelectorAll('button').length + ' buttons, not one');
      q('#overlay .sy-recap [data-fk="recap-go"]').click(); flush();
      if (live('#overlay .sy-recap')) fail('the recap card did not close');
    }, '#main [data-fk="leave"]');
    /* after the show: the setup (spec 14). A first-timer's game (SB.Game.newGame setupLater) asks how to keep going,
     * the day job and your band at the desk once the first show is settled; the replies change the game being played. */
    phase('the setup: asked at the desk after the show', null, function () {
      var i, c, rs, tg, inp, st0;
      if (!SB.Chapters.setup || !SB.Chapters.setup(S())) return;       // a game that was not made to ask later
      function up() { c = q('.cs-root') ? SB.Chapters.nextCutscene(S()) : null; return !!(c && c.key === 'GOING_AWAY_setup'); }
      flush();
      if (SB.UI.route() === 'close' && up()) fail('the setup scene played over the week\'s close-out');
      for (i = 0; i < 6 && !up(); i++) { flush(); if (!up() && S().clock.phase === 'CLOSE') { time(function () { return up() || S().clock.phase !== 'CLOSE'; }, 'the close-out to be over'); } }
      if (!up() && SB.UI.route() !== 'desk') { down(); flush(); }
      if (SB.UI.route() !== 'desk') fail('the setup scene is not asked at the desk');
      if (!c || c.key !== 'GOING_AWAY_setup') fail('the setup scene did not play after the first show (setup: ' + S().story.setup + ', queue: ' + S().story.cutscenes.map(function (x) { return x.key; }).join(', ') + ')');
      if (S().story.setup !== 'ASK') fail('the setup is ' + S().story.setup + ' while its scene plays');
      for (i = 0; i < 4 && !q('.cs-root .cs-reply'); i++) flush();   // the first picture's cut-outs load before it shows
      rs = d.querySelectorAll('.cs-root .cs-reply'); tg = q('.cs-root .cs-toggle');
      if (rs.length !== 3 || !tg) fail('the setup does not ask how to keep going with the day job under it (' + rs.length + ' replies)');
      if (!/more to go on/i.test(rs[0].getAttribute('aria-label')) || !/easy/i.test(rs[0].getAttribute('aria-label'))) fail('the first reply is "' + rs[0].getAttribute('aria-label') + '"');
      if (tg.getAttribute('aria-pressed') !== 'true') fail('the day job tick box does not start on');
      st0 = { bills: S().settings.bills, job: S().player.dayJob };
      tg.click();
      if (tg.getAttribute('aria-pressed') !== 'false') fail('the day job tick box did not turn off');
      rs[0].click(); flush();
      inp = q('.cs-root .cs-bandcard input');
      if (!inp) fail('the setup did not go on to ask about your band');
      inp.value = 'Wet Cement';
      q('.cs-root [data-fk="band-done"]').click(); flush();
      for (i = 0; i < 8 && q('.cs-root'); i++) { q('.cs-root .cs-skip').click(); flush(); }
      if (q('.cs-root')) fail('the setup scene did not close');
      if (S().story.setup !== 'DONE' || S().story.seen.indexOf('GOING_AWAY_setup') < 0) fail('the setup was not marked asked (' + S().story.setup + ')');
      if (S().story.seen.indexOf('TUTORIAL_RECAP') < 0) fail('the recap card was not marked read with the setup');
      if (S().settings.fog !== 'OPEN' || S().settings.windows !== 'FORGIVING') fail('"give me more to go on" set fog ' + S().settings.fog + ', windows ' + S().settings.windows);
      if (S().settings.bills !== st0.bills || S().player.dayJob !== st0.job || S().settings.billsNext !== false) fail('the day job should stay on until the week turns (bills ' + S().settings.bills + ', next ' + S().settings.billsNext + ')');
      if (!S().player.band || S().bands[S().player.band.id || S().player.band] === undefined && !S().player.band.name) fail('your band was not added');
      seenCuts.push('GOING_AWAY_setup');
    });
    phase('after the setup: the patch card, then the desk', null, function () {
      var n0 = seenCuts.length;
      if (!later) return;
      time(function () { return cards.indexOf('DOORS_AT_8') >= 0 && !q('.cs-root') && !q('.sy-card') && !live('#overlay .cc-slap') && SB.UI.route() === 'desk'; }, 'the patch card and the desk');
      if (!S().patches.DOORS_AT_8) fail('the DOORS_AT_8 patch was not earned');
      if (seenCuts.length !== n0) fail('a scene played the same night as the recap and the setup (' + seenCuts.slice(n0).join(', ') + ')');
      /* what stacked up behind the show waits its turn: each has a day, one a day from tomorrow */
      S().story.cutscenes.forEach(function (x, i, all) {
        if (typeof x.wait !== 'number' || x.wait <= S().clock.day) fail(x.key + ' is not waiting for a later evening (wait ' + x.wait + ', day ' + S().clock.day + ')');
        if (i && x.wait <= all[i - 1].wait) fail(x.key + ' would play the same evening as ' + all[i - 1].key);
      });
      expect('CLOSEOUT');
      taped(nightSel());
    });
    phase('close-out: the week closes', null, function () {
      var ks, days;
      time(function () { return !S().story.tutorial.on; }, 'the close-out');
      if (S().story.tutorial.done === null) fail('the walkthrough did not finish');
      /* what waited for the show has come: the chapter scene that opened on the way, the mass email, the host's hello */
      if (!later && seenCuts.indexOf('OUT_OF_STATE_open') < 0) fail('OUT_OF_STATE_open never played after the show (played: ' + seenCuts.join(', ') + ')');
      if (later) {
        /* "how show night is going to go" is no use once the show is over: it goes in the box unplayed */
        if (seenCuts.indexOf('OUT_OF_STATE_open') >= 0 || S().story.seen.indexOf('OUT_OF_STATE_open') < 0) fail('OUT_OF_STATE_open should be in the box unplayed after the show (played: ' + seenCuts.join(', ') + ')');
        /* the scenes that used to stack behind the show play one an evening, from the evening after it */
        if (seenCuts.indexOf('DOORS_AT_8_close') >= 0) fail('DOORS_AT_8_close played after the recap card had told the night');
        time(function () { return seenCuts.indexOf('ANSWER_EVERYONE_open') >= 0 && !q('.cs-root'); }, 'ANSWER_EVERYONE_open on a later evening');
        ks = ['ANSWER_EVERYONE_open', 'OUT_OF_STATE_close', 'THIN_open'].filter(function (k) { return cutDays[k] !== undefined; });
        days = ks.map(function (k) { return cutDays[k]; });
        ks.forEach(function (k, i) {
          if (cutDays[k] <= showDay) fail(k + ' played on the night of the show (day ' + cutDays[k] + ')');
          if (days.indexOf(cutDays[k]) !== i) fail(k + ' played the same evening as ' + ks[days.indexOf(cutDays[k])] + ' (day ' + cutDays[k] + ')');
        });
      }
      if (Object.keys(S().requests).length < 2) fail('the mass email never arrived after the guided show');
      if (S().director.later.some(function (x) { return x.hold; })) fail('something is still held back after the guided show');
      if (d.querySelector('.sy-tape')) fail('the tape is still up after the last step');
      /* the outgoing booker's call played as a cutscene for the two steps that keep one (fix-list 1.19: every other step's
       * call is folded into the mentor's text on the strip, so it is never "seen" as a scene) */
      ['TUT_ANSWER_REPLY', 'TUT_DOOR'].forEach(function (k) {
        if (S().story.seen.indexOf(k) < 0) fail('the call ' + k + ' never played (seen: ' + S().story.seen.join(', ') + ')');
      });
      /* the guided show drew at least the crowd its floor named (spec 14 part 6), and the "new on your desk" notes play for a player who took the walkthrough */
      if (typeof env.floor !== 'number') fail('the guided show kept no crowd floor');
      if (env.settle.paid < env.floor) fail('the guided show drew ' + env.settle.paid + ' paying, under its floor ' + env.floor);
      /* a game that had the recap card gets no wrap-up text on top of it; any other reads it first */
      if (!later && S().story.seen.indexOf('TUTORIAL_DONE') < 0) S().story.seen.push('TUTORIAL_DONE');
      var dn = SB.UI.story.messages(S());
      if (later && dn && dn.key === 'DONE') fail('the wrap-up text still plays after the recap card');
      if (!dn || String(dn.key).indexOf('DESKNEW:') !== 0) fail('no "new on your desk" note after the walkthrough (got ' + (dn && dn.key) + ')');
      log.push('settle ' + JSON.stringify(env.settle) + '; cutscenes ' + seenCuts.join(', ') + '; patches ' + Object.keys(S().patches).join(', '));
    });

    return { phases: P, log: log, at: at };
  }
  root.SBTutorialWalk = SBTutorialWalk;
})(typeof globalThis !== 'undefined' ? globalThis : this);
