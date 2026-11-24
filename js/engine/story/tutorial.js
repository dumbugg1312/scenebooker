/* Scene Booker — engine/story/tutorial.js
 * SB.Tutorial: the guided first show. Ten steps, each done when the state says so: notify() only says "something
 * happened, look again", so a step done by any route (a bot, a shortcut, a helper) still counts and nothing can
 * deadlock. The show is real: it is the first show the player makes (the opening's swap request, if they take it).
 * Owner: SYSTEMS. Spec: design/spec/09-tutorial-story-patches.md 1; 09a-build-contract.md.
 * Pure on state, no DOM, and it draws from no random stream.
 * A step can have stages (what to do right now inside it): current() says which, and where on the desk to go for it.
 * The night clock (design/spec/10-night-clock.md) keeps the stage names and changes what three of them ask for:
 *   PROMO:PLAN   do the job (jobId) tonight (SB.Week.doNow), where it used to be pencilled in on a day
 *   *:WAIT, WAIT:PLAY, DOOR:PLAY   call it a night (SB.Week.endNight), where the tape deck used to be left running
 * The first show is rigged so that doing what the texts say works: the people the texts name say yes (rig), and the
 * big local draw plays for a cut of the door (ask).
 * Beyond the manifest: STEPS, TARGET, showOf, cast, rig, ask, keeps.
 */
SB.module('Tutorial', function (SB) {
  'use strict';
  var STEPS = ['ANSWER', 'HOLD', 'BILL', 'SOUND', 'FLYER', 'PROMO', 'WAIT', 'DOOR', 'SETTLE', 'CLOSEOUT'];
  /* The desk object each step points at: ids of js/desk/scene.js add('...'). 'clip' is the show's own clip on the
   * calendar (scene ids clip0, clip1, ...: the one whose params.showId is current().showId); 'night' is the night screen. */
  var TARGET = { ANSWER: 'phone', HOLD: 'clip', BILL: 'clip', SOUND: 'clip', FLYER: 'clip', PROMO: 'clip', WAIT: 'lamp',
                 DOOR: 'night', SETTLE: 'night', CLOSEOUT: 'lamp' };
  /* where a stage sends the player, when it is not the step's own target ('lamp' is calling it a night: the card's own
   * CALL IT A NIGHT while the card is open, the tape deck on the desk when it is not; the interface picks). The whole
   * show is built on its card (design/spec/11-booking-pipeline.md): ANSWER is BOOK IT on the band's message, which
   * makes the show; until the show exists there is no clip, so the phone it is. A stage can also say `wait: true`
   * (HOLD:HELD with nothing left to get): then it is 'lamp' too, so nobody is sent to a row with nothing to press. */
  var STAGE_TARGET = { WAIT: 'lamp', PLAY: 'lamp', OPEN: 'lamp', EVE: 'lamp' };
  var RIG_DAYS = 2;
  var NUDGE_DAYS = 2, BILL_MIN = 3, PROMO_MIN = 2, LATE_FLYER_DAYS = 3;
  /* One new thing a night (design/spec/14-first-show-tutorial.md, the night table): the lessons in the order the nights
   * teach them. t.taught = { day, step } is the lesson the guide started that night on; a later lesson waits for the next
   * night. With GATE_OFF days or fewer to the show nothing waits any more, so the show is never short for it.
   * The flyer never waits (user 2026-11-24: the flyer goes up the night the room confirms, as Dana says): once its job
   * is open it is tonight's work whatever else was taught tonight. */
  var LESSONS = ['ROOM', 'BANDS', 'ORDER', 'SOUND', 'FLYER', 'PROMO'], GATE_OFF = 4, ONE_A_NIGHT = false;

  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function tut(state) { return SB.Chapters.ensure(state).tutorial; }
  function peek(state) { return state && state.story && state.story.tutorial ? state.story.tutorial : null; }

  /* the show the walkthrough follows: the one already chosen, else the swap request's, else the player's first live show */
  function showOf(state, t) {
    var shows = state.shows || {}, s = t.showId ? shows[t.showId] : null, ids, i, first = null;
    if (s && s.status !== 'CANCELLED') return s;
    ids = Object.keys(shows).sort(function (a, b) { return (shows[a].day - shows[b].day) || (a < b ? -1 : 1); });
    for (i = 0; i < ids.length; i++) {
      s = shows[ids[i]];
      if (!s || s.status === 'CANCELLED') continue;
      if (t.requestId && s.requestId === t.requestId) return s;
      if (!first) first = s;
    }
    return first;
  }

  function played(s) { return !!s && s.status === 'PLAYED'; }

  function promoDone(state, s) {
    var n = 0, jobs = state.jobs || {}, C = SB.Config;
    (s.jobs || []).forEach(function (id) {
      var j = jobs[id], c = j && C.JOBS[j.type];
      if (j && c && c.group === 'TELLING' && j.type !== 'MAKE_FLYER' && j.status === 'DONE') n++;
    });
    return n;
  }

  function debriefed(state, s) {
    var jobs = state.jobs || {};
    return (s.jobs || []).some(function (id) { return jobs[id] && jobs[id].type === 'DEBRIEF' && jobs[id].status === 'DONE'; });
  }

  /* is this step done? (may set t.wrong[step] when it was done badly) */
  function done(state, t, step, s) {
    var o, f;
    switch (step) {
      case 'ANSWER': return !!t.replied || !!s;
      case 'HOLD': return !!s && (s.status === 'CONFIRMED' || played(s) || !!s.night);
      case 'BILL':
        if (!s) return false;
        o = SB.Chapters.billOrder(state, s);
        if (o.n >= BILL_MIN && o.ok) { delete t.wrong.BILL; return true; }
        if (o.n >= 2 && !o.ok && !early(state, s, o)) t.wrong.BILL = o.why;
        if (s.bill.locked || played(s) || s.night) { if (o.ok) delete t.wrong.BILL; else if (!t.wrong.BILL) t.wrong.BILL = o.why || 'SHORT'; return true; }
        return false;
      case 'SOUND': return !!s && (!!(s.crew && s.crew.sound) || played(s));
      case 'FLYER':
        if (!s) return false;
        f = s.promo && s.promo.flyer;
        if (f) { if (typeof f.day === 'number' && f.day >= s.day - LATE_FLYER_DAYS) t.wrong.FLYER = 'LATE'; return true; }
        if (s.flyer && s.flyer.recipe) return true;
        if (played(s) || s.night) { t.wrong.FLYER = 'NONE'; return true; }
        return false;
      case 'PROMO': return !!s && (promoDone(state, s) >= PROMO_MIN || today(state) >= s.day || played(s) || !!s.night);
      case 'WAIT': return !!s && (today(state) >= s.day || played(s) || !!s.night);
      case 'DOOR': return !!s && (played(s) || !!(s.night && s.night.ended));
      case 'SETTLE': return played(s);
      case 'CLOSEOUT': return played(s) && (!!t.closeout || debriefed(state, s));
    }
    return false;
  }

  /* ---------------- the cast, the stages, the rig ---------------- */

  /* who the texts name for this show: { show, request, touring, closer, kids, sound, host, roomId } (ids; null when unknown) */
  function cast(state) {
    var w = SB.Chapters.walk(state), c = (state.director && state.director.cast) || {};
    return { showId: w.show ? w.show.id : null, requestId: w.request ? w.request.id : null, touring: w.touring ? w.touring.id : null,
             closer: w.closer ? w.closer.id : null, kids: w.kids ? w.kids.id : null, sound: c.sound || null, host: c.host || null, roomId: c.roomId || null };
  }
  function keepCast(state, t) {
    var c = cast(state);
    if (c.closer && c.kids) t.cast = { closer: c.closer, kids: c.kids };
  }

  /* an ask of this kind about this show that has not been answered yet (queued or sent), or a counter waiting */
  function pending(state, kind, showId, toId) {
    var k, a;
    for (k in (state.asks || {})) {
      a = state.asks[k];
      if (a.kind !== kind || (a.status !== 'QUEUED' && a.status !== 'SENT' && a.status !== 'COUNTER')) continue;
      if (showId && a.showId !== showId && !(a.payload && a.payload.showId === showId)) continue;
      if (toId && a.toId !== toId) continue;
      return a;
    }
    return null;
  }
  function offerOut(state, requestId) {
    var out = (state.mail && state.mail.out) || [], i, k, a;
    for (i = 0; i < out.length; i++) if (out[i].requestId === requestId && out[i].action === 'OFFER') return true;
    for (k in (state.asks || {})) {
      a = state.asks[k];
      if (a.kind === 'TERMS' && a.requestId === requestId && (a.status === 'QUEUED' || a.status === 'SENT' || a.status === 'COUNTER')) return true;
    }
    return false;
  }
  function onBill(s, bandId) { return !!s && ((s.bill && s.bill.slots) || []).some(function (x) { return x.bandId === bandId; }); }
  /* the telling jobs of the show (not the flyer itself): how many are done or with somebody, and the next one to do
   * (the flyer job first; then one whose window is open and that takes hours), and whether that one can be done
   * tonight: there is time for it, even staying up (SB.Week.canDoNow). One that fits tonight goes before one that
   * does not. */
  function telling(state, s) {
    var n = 0, next = {}, push = {}, flyer = {}, jobs = state.jobs || {}, C = SB.Config, pick;
    function take(slot, id, fits) {
      if (fits && !slot.fit) slot.fit = id;
      if (!slot.any) slot.any = id;
    }
    function now(id) {
      var r = null;
      if (!SB.Week.canDoNow) return true;
      try { r = SB.Week.canDoNow(state, id); } catch (e) { r = null; }
      return !!r && r.ok !== false;
    }
    (s.jobs || []).forEach(function (id) {
      var j = jobs[id], c = j && C.JOBS[j.type], v = null, open;
      if (!j || !c || c.group !== 'TELLING') return;
      try { v = SB.Jobs.get(state, id); } catch (e) { v = null; }
      if (!v) return;
      open = v.status === 'TODO' && !v.planned && !v.hidden && v.mode === 'HOURS' && v.window &&
             (v.window.state === 'OPEN' || v.window.state === 'CLOSING' || v.window.state === 'LATE');
      if (j.type === 'MAKE_FLYER') { if (open) take(flyer, id, now(id)); return; }
      if (v.status === 'DONE' || v.planned) n++;
      else if (open && !(v.opt && v.opt.kind)) take(next, id, now(id));
      else if (open && v.opt && v.opt.kind === 'PUSH') take(push, id, now(id));
    });
    pick = flyer.any ? flyer : (next.fit ? next : (push.fit ? push : (next.any ? next : push)));
    return { n: n, next: pick.fit || pick.any || null, fits: !!pick.fit };
  }

  /* any open job of this show with hours that fits tonight (not only the telling ones): its id, or null. The mentor never
   * says "call it a night" while one of these is waiting (fix-list 1.13). */
  function openFits(state, s) {
    var jobs = state.jobs || {}, ids = (s.jobs || []).slice(), i, v, r, best = null, due;
    for (i = 0; i < ids.length; i++) {
      if (!jobs[ids[i]]) continue;
      try { v = SB.Jobs.get(state, ids[i]); } catch (e) { v = null; }
      if (!v || v.status !== 'TODO' || v.planned || v.hidden || v.optional || v.mode !== 'HOURS' || !v.window ||
          !(v.window.state === 'OPEN' || v.window.state === 'CLOSING' || v.window.state === 'LATE')) continue;
      if (v.type === 'RUN_SHOW' || v.type === 'THANKS' || v.type === 'DEBRIEF') continue;
      r = null;
      try { r = SB.Week.canDoNow ? SB.Week.canDoNow(state, ids[i]) : { ok: true }; } catch (e2) { r = null; }
      if (!r || r.ok === false) continue;
      due = typeof v.due === 'number' ? v.due : 1e9;
      if (!best || due < best.due) best = { id: ids[i], due: due };
    }
    return best ? best.id : null;
  }

  /* a held night: is there anything the room still wants that the player can go and get? Second in line there is
   * not (the room ahead has to fall through); first in line with every need met there is not either (it is theirs in
   * the morning, SB.Rooms.firmUp). Only first in line with a need unmet is something to do. */
  function heldWants(state, s) {
    var v = null;
    if (!s || !s.hold || (typeof s.hold.rank === 'number' && s.hold.rank > 1)) return false;
    try { v = SB.Shows.view(state, s.id); } catch (e) { v = null; }
    return !!v && (v.needsToConfirm || []).some(function (n) { return !n.met; });
  }

  /* what to do right now inside the step: { stage, bandId, slot, personId, jobId, wait } */
  function stageOf(state, t, step, s) {
    var c = cast(state), o;
    switch (step) {
      case 'ANSWER': return { stage: 'REPLY' };
      case 'HOLD':
        if (!s || (!s.hold && s.status !== 'CONFIRMED')) return { stage: s && pending(state, 'ROOM_HOLD', s.id) ? 'WAIT' : 'ASK' };
        /* held, not booked yet (no confirm ask): yours in the morning or second in line (wait: call it a night), or
         * the room wants something first (the card's ROOM step says what) */
        return { stage: 'HELD', wait: s.status !== 'CONFIRMED' && !heldWants(state, s) };
      case 'BILL':
        if (!s) return { stage: 'OFFER' };
        o = SB.Chapters.billOrder(state, s);
        if (o.n >= 2 && !o.ok && o.n >= BILL_MIN) return { stage: 'ORDER' };
        if (c.touring && !onBill(s, c.touring) && c.requestId && !offerOut(state, c.requestId)) return { stage: 'OFFER', bandId: c.touring };
        /* the local draw before the kids (spec 14's nights: the draw writes on night 2, the kids on night 3), and the
           card's own order: the headliner first, then the opener */
        if (c.closer && !onBill(s, c.closer) && !pending(state, 'BAND_PLAY', s.id, c.closer)) return { stage: 'LOCAL', bandId: c.closer, slot: 'CLOSE' };
        if (c.kids && !onBill(s, c.kids) && !pending(state, 'BAND_PLAY', s.id, c.kids) && kidsWrote(state)) return { stage: 'KIDS', bandId: c.kids, slot: 'OPEN' };
        if (o.n >= 2 && !o.ok && !early(state, s, o)) return { stage: 'ORDER' };
        return { stage: 'WAIT' };
      case 'SOUND': return s && c.sound && pending(state, 'CREW', s.id, c.sound) ? { stage: 'WAIT', personId: c.sound } : { stage: 'ASK', personId: c.sound };
      /* NAME (spec 14, night "5 Fri"): a first-timer has no booking name until the first flyer, and the flyer desk asks it
         first (the name sheet). A game that already has a name (every older save) goes straight to MAKE. */
      case 'FLYER': return { stage: state.player && state.player.bookingName === '' ? 'NAME' : 'MAKE' };
      case 'PROMO':
        /* PLAN: do this job tonight. WAIT: nothing more fits tonight (or nothing is open yet): call it a night; the
         * job that is waiting for tomorrow's hours is still named */
        o = s ? telling(state, s) : { n: 0, next: null, fits: false };
        if (!o.next || !(o.n < PROMO_MIN || state.jobs[o.next].type === 'MAKE_FLYER')) return { stage: 'WAIT' };
        return o.fits ? { stage: 'PLAN', jobId: o.next } : { stage: 'WAIT', jobId: o.next };
      /* the last night before the show says so (fix-list 1.13); every other night it is one night at a time */
      case 'WAIT': return { stage: s && s.day - today(state) === 1 ? 'EVE' : 'PLAY' };
      case 'DOOR': return { stage: s && s.night ? 'DOOR' : (s && today(state) >= s.day ? 'OPEN' : 'PLAY') };
      case 'SETTLE': return { stage: 'SETTLE' };
      case 'CLOSEOUT': return { stage: 'READ' };
    }
    return { stage: null };
  }

  /* walking(state): the walkthrough is on and its show has not been played yet. While it is, nothing else arrives and
   * nothing interrupts (design/spec/14-first-show-tutorial.md, "Rules while the walkthrough is on"): the Director holds
   * its other mail and its week events, and Chapters holds its cutscenes, until the show is played. Reads only. */
  /* The one test for "being walked through" (SB.Director.walking asks here): the game was started guided
   * (state.director.guided, written by the opening), its show has not been played, and the walkthrough was neither
   * skipped nor ended. A save from before state.director.guided has none and goes on as it always did. */
  function walking(state) {
    var d = state && state.director, t = peek(state);
    if (!d || !d.guided || ((state.player && state.player.showsPlayed) || 0) > 0) return false;
    return !(t && (t.skipped || (t.done !== null && t.done !== undefined)));
  }
  /* the kids are asked once their own message has come (spec 14, night 3); only a walked-through game waits for it */
  function kidsWrote(state) {
    if (!walking(state) || !SB.Director || !SB.Director.written) return true;
    return SB.Director.written(state, 'KIDS_OPENER');
  }
  /* A walked-through bill with one of its two locals still to come (the nights ask them one at a time) is not out of
   * order yet: two bands cannot be judged against the order of three. */
  function early(state, s, o) {
    var c;
    if (!o || o.n >= BILL_MIN || !walking(state)) return false;
    c = cast(state);
    return !!((c.kids && !onBill(s, c.kids)) || (c.closer && !onBill(s, c.closer)));
  }
  function tonightOf(state) { var tn = null; try { tn = SB.Week.tonight(state); } catch (e) { tn = null; } return tn; }
  /* which night's lesson a stage belongs to; null for a stage that waits, a correction, and everything from the wait on */
  function lessonOf(state, step, g) {
    var j;
    if (!g || !g.stage || g.wait) return null;
    if (step === 'ANSWER' || step === 'HOLD') return g.stage === 'WAIT' ? null : 'ROOM';
    if (step === 'BILL') return g.stage === 'OFFER' || g.stage === 'LOCAL' ? 'BANDS' : (g.stage === 'KIDS' ? 'ORDER' : null);
    if (step === 'SOUND') return g.stage === 'ASK' ? 'SOUND' : null;
    if (step === 'FLYER') return 'FLYER';
    if (step === 'PROMO' && g.stage === 'PLAN') { j = g.jobId && state.jobs ? state.jobs[g.jobId] : null; return j && j.type === 'MAKE_FLYER' ? 'FLYER' : 'PROMO'; }
    return null;
  }

  /* The clock lesson (spec 14, night 1): the first thing that costs time is BOOK IT, and right after it, before the
   * room is asked, the walkthrough stops once on the night clock: what that took, what is left, and that replies come
   * overnight. It is the stage CLOCK of the step HOLD (target 'clock'), there until the player has looked
   * (notify 'CLOCK'), or asks the room anyway. t.clockSeen is optional: a save without it has not had the lesson.
   * -> { cost, left } in words, or null. Reads only. */
  function hoursWords(n) {
    var whole = Math.floor(n + 1e-6), half = n - whole > 0.25;
    if (SB.text.off) return '';
    if (!whole && half) return SB.text.has('strings.clock.half') ? SB.text.label('clock.half') : '';
    if (whole === 1 && !half) return SB.text.has('strings.clock.one') ? SB.text.label('clock.one') : '';
    return SB.text.has('strings.clock.many') ? SB.text.label('clock.many', { n: whole + (half ? '\u00bd' : '') }) : '';
  }
  function clockBeat(state, t, step, g) {
    var tn = null, o;
    if (t.clockSeen || step !== 'HOLD' || !g || g.stage !== 'ASK' || !walking(state)) return null;
    tn = tonightOf(state);
    if (!tn || tn.called || !(tn.left > 0)) return null;
    /* nothing spent yet (BOOK IT one night, the night called at once): the lesson is still owed, said without a cost */
    o = { cost: tn.used > 0 ? hoursWords(tn.used) : '', left: hoursWords(tn.left) };
    return o.left && (o.cost || !(tn.used > 0)) ? o : null;
  }

  /* is this the first show, still being walked through? */
  function guiding(state, showId) {
    var t = peek(state), s;
    if (!t || !t.on || ((state.player && state.player.showsPlayed) || 0) > 0) return null;
    s = showOf(state, t);
    return s && (!showId || s.id === showId) ? s : null;
  }

  /* rig(state, ask): an ask the texts told the player to send (the room, the touring band's offer, the two locals,
   * sound) is answered yes, within RIG_DAYS days. -> { will: 'YES', days } or null. Reads only. */
  function rig(state, a) {
    var s, c, ok = false;
    if (!a) return null;
    s = guiding(state, a.showId || (a.payload && a.payload.showId) || null);
    if (!s) return null;
    c = cast(state);
    if (a.kind === 'ROOM_HOLD' || a.kind === 'ROOM_CONFIRM') ok = a.toId === c.roomId;
    else if (a.kind === 'TERMS') ok = !!c.requestId && a.requestId === c.requestId;
    else if (a.kind === 'BAND_PLAY') ok = a.toId === c.kids || a.toId === c.closer;
    else if (a.kind === 'CREW') ok = a.toId === c.sound && a.payload && a.payload.role === 'sound';
    return ok ? { will: 'YES', days: RIG_DAYS } : null;
  }

  /* floor(state, show): the guided first show draws at least the crowd that pays everybody promised and leaves the player
   * a little (SB.Night keeps it at the night's start). -> { paid } or null (any other show). Reads only. */
  var FLOOR_LEFT = 20;
  function floor(state, show) {
    var cap, n, f;
    if (!show || !guiding(state, show.id) || !SB.Night || !SB.Night.figureAt) return null;
    cap = (state.rooms && state.rooms[show.roomId] && state.rooms[show.roomId].cap) || 120;
    for (n = 1; n <= cap; n++) {
      f = SB.Night.figureAt(state, show, n);
      if (!f) return null;
      if (f.gap <= 0 && f.left >= FLOOR_LEFT) return { paid: Math.min(cap, Math.ceil(n * 1.1) + 1) };
    }
    return { paid: cap };
  }

  /* ask(state, bandId, showId): what the big local draw asks for the first show: a cut of the door, no flat fee.
   * -> { pay, amount } or null (the band's own ask stands). Reads only. */
  function ask(state, bandId, showId) {
    var s = guiding(state, showId), c;
    if (!s) return null;
    c = cast(state);
    return bandId === c.closer ? { pay: 'SHARE', amount: 0 } : null;
  }

  /* keeps(state, q): the band the texts name waits for the player. While the walkthrough is on and no show has been
   * played, its request does not lapse and no rival booker takes the band, as long as one of its dates is still ahead
   * (the player can be slow to make the offer without losing the tutorial). -> bool. Reads only. */
  function keeps(state, q) {
    var t = peek(state), d = today(state);
    if (!q || !t || !t.on || !t.requestId || q.id !== t.requestId) return false;
    if (((state.player && state.player.showsPlayed) || 0) > 0) return false;
    return (q.dates || []).some(function (x) { return typeof x === 'number' && x > d; });
  }

  /* the show fell through after the room said yes (the hold lapsed, the room said no, the show was cancelled):
   * -> 'HOLD' to go back and find a room, 'END' when there is no show and the band's request is gone, else null */
  function fellThrough(state, t, s) {
    var q;
    if (!t.step || STEPS.indexOf(t.step) <= STEPS.indexOf('HOLD')) return null;
    if (s) return s.status === 'CONFIRMED' || played(s) || s.night ? null : 'HOLD';
    q = t.requestId && state.requests ? state.requests[t.requestId] : null;
    return q && (q.status === 'NEW' || q.status === 'REPLIED' || q.status === 'NEGOTIATING') ? 'HOLD' : 'END';
  }

  function advance(state, t) {
    var out = [], guard = 0, s, i, f;
    f = t.on ? fellThrough(state, t, showOf(state, t)) : null;
    if (f === 'HOLD') { t.step = 'HOLD'; t.nudgedAt = today(state); t.clockSeen = true; }
    else if (f === 'END') { t.on = false; t.step = null; t.done = week(state); t.lapsed = true; return out; }   // lapsed: no "that's a show" text
    while (t.on && t.step && guard++ < STEPS.length + 1) {
      s = showOf(state, t);
      if (s && t.showId !== s.id) t.showId = s.id;
      if (s && !t.cast) keepCast(state, t);
      if (!done(state, t, t.step, s)) break;
      out.push(t.step);
      if (t.step === 'HOLD') t.clockSeen = true;             // the room is asked and answered: the clock lesson's moment has passed
      i = STEPS.indexOf(t.step);
      t.nudgedAt = today(state);
      if (i === STEPS.length - 1) { t.step = null; t.on = false; t.done = week(state); }
      else t.step = STEPS[i + 1];
    }
    learn(state, t);
    return out;
  }

  /* What the nights of a walked-through game have taught so far, written down when something happens (notify):
   *   t.taught = { day, step }   the lesson the guide was on when it first looked tonight (LESSONS)
   *   t.stayTold                 the day staying up was explained (the first night the hours ran out with work left)
   *   t.offDay                   the first day off the ten hours were said on
   * All three are optional: a save without them has not been told yet. */
  function learn(state, t) {
    var d = today(state), r = null, ls, tn;
    if (!t.on || !t.step || !walking(state)) return;
    try { r = raw(state, t, showOf(state, t)); } catch (e) { r = null; }
    if (!r) return;
    if (!t.taught || t.taught.day !== d) { ls = lessonOf(state, r.free.step, r.free.g); if (ls) t.taught = { day: d, step: ls }; }
    if (r.g.out && t.stayTold === undefined) t.stayTold = d;
    tn = tonightOf(state);
    if (t.offDay === undefined && tn && tn.off && !tn.called && offLine(r.step, r.g, state)) t.offDay = d;
  }

  /* turn the walkthrough on (a new game). A skipped walkthrough stays skipped. */
  function start(state) {
    var t = tut(state), d = state.director || {};
    if (t.skipped || t.done !== null) return { ok: true, step: t.step };
    t.on = true; t.step = STEPS[0]; t.nudgedAt = today(state); t.showId = null; t.replied = false; t.closeout = false; t.wrong = {};
    t.requestId = d.firstRequestId || d.swapRequestId || null;
    advance(state, t);
    return { ok: true, step: t.step };
  }

  /* "I've done this before" */
  function skip(state) {
    var t = tut(state);
    if (t.done !== null) return { ok: true, step: null };
    t.on = false; t.step = null; t.skipped = true;
    if (state.settings) state.settings.ladder = false;     // "I've done this before": the whole desk, for good (0.2)
    over(state, t);
    return { ok: true, step: null };
  }

  function say(path, ctx) { return !SB.text.off && SB.text.has(path) ? SB.text.line(path, ctx, null) : ''; }

  /* what to show now: { step, n, of, target, stage, bandId, slot, personId, showId, requestId, text, more, nudge, wrong } or null. Reads only.
   * stage is what to do right now inside the step (with bandId / slot / personId when it is about one), target the desk
   * object to go to for it, more the stage's own line (null when it has none);
   * nudge is the "you there?" text once the player has left the step alone for NUDGE_DAYS days (null before that);
   * wrong is the line for a step being done badly (the bill out of order), else null. */
  function mailWaiting(state) { try { return !!(SB.Mail && SB.Mail.needsYou && SB.Mail.needsYou(state).length); } catch (e) { return true; } }
  /* the stage line said on the first day off, when the stage has one ('<stage>_OFF'): its path, or null */
  function offLine(step, g, state) {
    var p = 'story.tutorial.steps.' + step + '.stages.', k = g.stage;
    if (!k || g.rest || g.out || SB.text.off) return null;
    if (k === 'PLAN' && g.jobId && state.jobs[g.jobId] && state.jobs[g.jobId].type === 'MAKE_FLYER') k = 'PLAN_FLYER';
    return SB.text.has(p + k + '_OFF') ? p + k + '_OFF' : null;
  }

  /* raw(state, t, s): the step and stage to show now -> { step, g, w, free: { step, g } } or null (nothing left to walk
   * through). `free` is the same before the night's gate, which is what tonight's lesson is read from. Reads only. */
  function raw(state, t, s) {
    var o, w, g, step, sg, f, step0, w0, free, ls, tn, d = today(state);
    /* the show fell through: back to finding a room, or nothing left to walk through (advance() writes it down) */
    f = fellThrough(state, t, s);
    if (f === 'END') return null;
    o = s ? SB.Chapters.billOrder(state, s) : { touring: null, closer: null };
    step = f === 'HOLD' ? 'HOLD' : t.step;
    w = step === 'BILL' && s && o.n >= 2 && !o.ok && !early(state, s, o) ? o.why : null;
    g = stageOf(state, t, step, s);
    step0 = step; w0 = w;
    /* Everybody on the bill is asked: ask sound in the same sitting, so the bands and sound answer over one wait.
     * (done() is given a scratch record: this is a read.) */
    if (step === 'BILL' && g.stage === 'WAIT' && s && cast(state).sound) {
      sg = stageOf(state, t, 'SOUND', s);
      if (sg.stage === 'ASK' && !done(state, { replied: t.replied, wrong: {} }, 'SOUND', s)) { step = 'SOUND'; g = sg; w = null; }
    }
    /* Waiting on the bands with the room confirmed: the flyer does not wait on them (bands go on it as TBA), so the
     * evenings spent waiting go to the flyer instead of a dead night (Marisol: flyer the day you confirm) */
    if ((step === 'BILL' || step === 'SOUND') && g.stage === 'WAIT' && s && s.status === 'CONFIRMED') {
      if (!done(state, { replied: t.replied, wrong: {} }, 'FLYER', s)) { step = 'FLYER'; g = stageOf(state, t, 'FLYER', s); w = null; }
      /* the flyer is designed: making it (and the promo due soonest) is tonight's work when it fits */
      else { sg = stageOf(state, t, 'PROMO', s); if (sg.stage === 'PLAN' || sg.jobId) { step = 'PROMO'; g = sg; w = null; } }   // PLAN, or a job waiting for tomorrow's hours
    }
    /* any other open job that fits tonight (before the room is confirmed, say) is tonight's work too: never "call it a night" over it */
    if ((step === 'BILL' || step === 'SOUND') && g.stage === 'WAIT' && s) {
      sg = openFits(state, s);
      if (sg) { step = 'PROMO'; g = { stage: 'PLAN', jobId: sg }; w = null; }
    }
    free = { step: step, g: g };
    if (walking(state)) {
      /* one new thing a night: tonight's lesson was started, and this belongs to a later night. Call it a night
       * (the stage is WAIT with rest: true, said in story.tutorial.rest). A save with no t.taught is not held. */
      ls = lessonOf(state, step, g);
      /* the gate is off (user 2026-11-24: "we dont need one night for every move to be made - it just needs to hold yr
         hand better"): a night does as much as its hours allow. Kept behind ONE_A_NIGHT in case it comes back. */
      if (ONE_A_NIGHT && ls && ls !== 'FLYER' && t.taught && t.taught.day === d && LESSONS.indexOf(ls) > LESSONS.indexOf(t.taught.step) && !(s && s.day - d <= GATE_OFF)) {
        /* the flyer is the one thing that does not wait for its own night: with the room confirmed and no flyer yet,
           it is tonight's work before anyone is told to call it a night */
        if (s && s.status === 'CONFIRMED' && !done(state, { replied: t.replied, wrong: {} }, 'FLYER', s)) { step = 'FLYER'; g = stageOf(state, t, 'FLYER', s); w = null; }
        else { step = step0; w = w0; g = { stage: 'WAIT', wait: true, rest: true }; }
      } else if (ls || (step === 'PROMO' && g.stage === 'WAIT' && g.jobId)) {
        /* staying up, the first time the hours run out with work left: the choice is the player's, on the clock */
        tn = tonightOf(state);
        if (tn && !tn.called && tn.left <= 0 && tn.stay && tn.stay.left > 0 && (t.stayTold === undefined || t.stayTold === d))
          g = { stage: 'OUT', wait: true, out: true, jobId: g.jobId || null, bandId: g.bandId || null, slot: g.slot || null, personId: g.personId || null };
      }
    }
    return { step: step, g: g, w: w, free: free };
  }

  function current(state) {
    var t = peek(state), s, ctx, base, w, g, tx, step, r, cb, k, tn, off;
    if (!t || !t.on || !t.step) return null;
    s = showOf(state, t);
    r = raw(state, t, s);
    if (!r) return null;
    ctx = SB.Chapters.slots(state, 'tutorial');
    step = r.step; g = r.g; w = r.w;
    /* the clock lesson, once, between BOOK IT and asking the room: one line, the tape on the night clock */
    cb = clockBeat(state, t, step, g);
    if (cb) {
      for (k in ctx) if (cb[k] === undefined) cb[k] = ctx[k];
      tx = say(cb.cost ? 'story.tutorial.clock' : 'story.tutorial.clockNew', cb);
      if (tx) return { step: step, n: STEPS.indexOf(step) + 1, of: STEPS.length, target: 'clock', stage: 'CLOCK', under: g.stage,
                       bandId: null, slot: null, personId: null, jobId: null,
                       showId: s ? s.id : null, requestId: (s && s.requestId) || t.requestId || null,
                       text: '', more: tx, nudge: null, wrong: null };
    }
    base = 'story.tutorial.steps.' + step;
    /* PLAN on the flyer's own job says to make the flyer first; on any other job it never mentions the flyer (fix-list 1.13) */
    tx = g.stage ? ((g.stage === 'PLAN' && g.jobId && state.jobs[g.jobId] && state.jobs[g.jobId].type === 'MAKE_FLYER' && say(base + '.stages.PLAN_FLYER', ctx)) ||
                    say(base + '.stages.' + g.stage, ctx)) : '';
    /* tonight's lesson is done (one new thing a night), or the hours ran out with work left (staying up, said once) */
    if (g.rest) tx = say('story.tutorial.rest', ctx) || tx;
    else if (g.out) tx = say('story.tutorial.stayUp', ctx) || tx;
    else if (walking(state)) {
      /* the first day off (ten hours): the stage's own day-off line, on that day only */
      tn = tonightOf(state); off = tn && tn.off && (t.offDay === undefined || t.offDay === today(state)) ? offLine(step, g, state) : null;
      if (off) tx = say(off, ctx) || tx;
    }
    return { step: step, n: STEPS.indexOf(step) + 1, of: STEPS.length, target: (g.wait ? 'lamp' : STAGE_TARGET[g.stage]) || (TARGET[step] === 'clip' && !s ? 'phone' : TARGET[step]),
             stage: g.stage, bandId: g.bandId || null, slot: g.slot || null, personId: g.personId || null, jobId: g.jobId || null,
             showId: s ? s.id : null, requestId: (s && s.requestId) || t.requestId || null,
             text: say(base + '.text', ctx), more: tx || null,
             /* the wait's nudge is about mail: only when the phone has something that needs an answer */
             nudge: !g.rest && !g.out && today(state) - (t.nudgedAt || 0) >= NUDGE_DAYS && !(step === 'WAIT' && !mailWaiting(state)) ? say(base + '.nudge', ctx) : null,
             wrong: w ? say(base + '.wrong', ctx) : null };
  }

  /* undone(state): while the walkthrough is on, the one thing tonight's step still has for the player to do tonight, as the
   * words that finish "You still haven't ..." (story.tutorial.undone); null when the step is waiting on someone else, or
   * on the night itself, or the walkthrough is off. Reads only. */
  function undone(state) {
    var c = current(state), tx;
    if (!c || !c.stage || c.target === 'lamp') return null;
    tx = say('story.tutorial.undone.' + c.step + '_' + c.stage, SB.Chapters.slots(state, 'tutorial'));
    return tx ? { step: c.step, stage: c.stage, thing: tx } : null;
  }

  /* payout(state): paying out, one line for each part of the envelope in the order it is paid (spec 14, "After": the
   * room, sound, the touring band, the locals, you), only the parts this show has. -> [{ k, text }], k one of ROOM,
   * SOUND, TOURING, LOCALS, YOU; [] unless the walkthrough is at SETTLE. Reads only. */
  function payout(state) {
    var t = peek(state), s, c, ctx, slots, has = {}, out = [];
    if (!t || !t.on || t.step !== 'SETTLE') return out;
    s = showOf(state, t);
    if (!s) return out;
    c = cast(state); ctx = SB.Chapters.slots(state, 'tutorial');
    slots = (s.bill && s.bill.slots) || [];
    has.ROOM = !!s.roomId; has.SOUND = !!(s.crew && s.crew.sound); has.YOU = true;
    has.TOURING = slots.some(function (x) { return x.role === 'TOURING' || (!!c.touring && x.bandId === c.touring); });
    has.LOCALS = slots.some(function (x) { return x.role !== 'TOURING' && !(c.touring && x.bandId === c.touring); });
    ['ROOM', 'SOUND', 'TOURING', 'LOCALS', 'YOU'].forEach(function (k) {
      var tx = has[k] ? say('story.tutorial.steps.SETTLE.tabs.' + k, ctx) : '';
      if (tx) out.push({ k: k, text: tx });
    });
    return out;
  }

  /* Something happened: look again. eventName is one of
   *   REPLY (data.requestId)   the player answered a request        CLOSEOUT   the close-out was read
   *   NUDGED                   the "you there?" text was shown      CLOCK      the clock lesson was read
   *   anything else: just re-check
   * -> { step, advanced: [steps just finished], done: bool }, or null when the walkthrough is off. */
  function notify(state, eventName, data) {
    var t = peek(state), adv;
    if (!t || !t.on) return null;
    t = tut(state);
    data = data || {};
    if (eventName === 'REPLY' && (!t.requestId || !data.requestId || data.requestId === t.requestId || t.step === 'ANSWER')) t.replied = true;
    if (eventName === 'CLOSEOUT' && played(showOf(state, t))) t.closeout = true;
    if (eventName === 'NUDGED') t.nudgedAt = today(state);
    if (eventName === 'CLOCK') t.clockSeen = true;           // the clock lesson was read
    adv = advance(state, t);
    over(state, t);
    return { step: t.step, advanced: adv, done: t.done !== null };
  }

  /* the walkthrough just ended on a game that asks its setup afterwards (spec 14, state.story.setup 'LATER'): the
     chapters look again now, so the setup scene is waiting at the desk and not a week later */
  function over(state, t) {
    if (!t.on && state.story && state.story.setup === 'LATER' && SB.Chapters && SB.Chapters.check) SB.Chapters.check(state);
  }

  return { start: start, skip: skip, current: current, notify: notify,
           /* beyond the manifest */
           STEPS: STEPS, TARGET: TARGET, showOf: function (state) { var t = peek(state); return t ? showOf(state, t) : null; },
           walking: walking, cast: cast, rig: rig, floor: floor, undone: undone, payout: payout, ask: ask, keeps: keeps };
});
