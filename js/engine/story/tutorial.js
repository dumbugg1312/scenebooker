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
  var STAGE_TARGET = { WAIT: 'lamp', PLAY: 'lamp' };
  var RIG_DAYS = 2;
  var NUDGE_DAYS = 2, BILL_MIN = 3, PROMO_MIN = 2, LATE_FLYER_DAYS = 3;

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
        if (o.n >= 2 && !o.ok) t.wrong.BILL = o.why;
        if (s.bill.locked || played(s) || s.night) { if (!o.ok && !t.wrong.BILL) t.wrong.BILL = o.why || 'SHORT'; return true; }
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
        if (c.kids && !onBill(s, c.kids) && !pending(state, 'BAND_PLAY', s.id, c.kids)) return { stage: 'KIDS', bandId: c.kids, slot: 'OPEN' };
        if (c.closer && !onBill(s, c.closer) && !pending(state, 'BAND_PLAY', s.id, c.closer)) return { stage: 'LOCAL', bandId: c.closer, slot: 'CLOSE' };
        if (o.n >= 2 && !o.ok) return { stage: 'ORDER' };
        return { stage: 'WAIT' };
      case 'SOUND': return s && c.sound && pending(state, 'CREW', s.id, c.sound) ? { stage: 'WAIT', personId: c.sound } : { stage: 'ASK', personId: c.sound };
      case 'FLYER': return { stage: 'MAKE' };
      case 'PROMO':
        /* PLAN: do this job tonight. WAIT: nothing more fits tonight (or nothing is open yet): call it a night; the
         * job that is waiting for tomorrow's hours is still named */
        o = s ? telling(state, s) : { n: 0, next: null, fits: false };
        if (!o.next || !(o.n < PROMO_MIN || state.jobs[o.next].type === 'MAKE_FLYER')) return { stage: 'WAIT' };
        return o.fits ? { stage: 'PLAN', jobId: o.next } : { stage: 'WAIT', jobId: o.next };
      case 'WAIT': return { stage: 'PLAY' };
      case 'DOOR': return { stage: s && s.night ? 'DOOR' : 'PLAY' };
      case 'SETTLE': return { stage: 'SETTLE' };
      case 'CLOSEOUT': return { stage: 'READ' };
    }
    return { stage: null };
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

  function advance(state, t) {
    var out = [], guard = 0, s, i;
    while (t.on && t.step && guard++ < STEPS.length + 1) {
      s = showOf(state, t);
      if (s && t.showId !== s.id) t.showId = s.id;
      if (s && !t.cast) keepCast(state, t);
      if (!done(state, t, t.step, s)) break;
      out.push(t.step);
      i = STEPS.indexOf(t.step);
      t.nudgedAt = today(state);
      if (i === STEPS.length - 1) { t.step = null; t.on = false; t.done = week(state); }
      else t.step = STEPS[i + 1];
    }
    return out;
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
    return { ok: true, step: null };
  }

  function say(path, ctx) { return !SB.text.off && SB.text.has(path) ? SB.text.line(path, ctx, null) : ''; }

  /* what to show now: { step, n, of, target, stage, bandId, slot, personId, showId, requestId, text, more, nudge, wrong } or null. Reads only.
   * stage is what to do right now inside the step (with bandId / slot / personId when it is about one), target the desk
   * object to go to for it, more the stage's own line (null when it has none);
   * nudge is the "you there?" text once the player has left the step alone for NUDGE_DAYS days (null before that);
   * wrong is the line for a step being done badly (the bill out of order), else null. */
  function current(state) {
    var t = peek(state), s, o, ctx, base, w, g, tx, step, sg;
    if (!t || !t.on || !t.step) return null;
    s = showOf(state, t);
    o = s ? SB.Chapters.billOrder(state, s) : { touring: null, closer: null };
    ctx = SB.Chapters.slots(state, 'tutorial');
    step = t.step;
    w = t.step === 'BILL' && s && o.n >= 2 && !o.ok ? o.why : null;
    g = stageOf(state, t, t.step, s);
    /* Everybody on the bill is asked: ask sound in the same sitting, so the bands and sound answer over one wait.
     * (done() is given a scratch record: this is a read.) */
    if (t.step === 'BILL' && g.stage === 'WAIT' && s && cast(state).sound) {
      sg = stageOf(state, t, 'SOUND', s);
      if (sg.stage === 'ASK' && !done(state, { replied: t.replied, wrong: {} }, 'SOUND', s)) { step = 'SOUND'; g = sg; w = null; }
    }
    base = 'story.tutorial.steps.' + step;
    tx = g.stage ? say(base + '.stages.' + g.stage, ctx) : '';
    return { step: step, n: STEPS.indexOf(step) + 1, of: STEPS.length, target: (g.wait ? 'lamp' : STAGE_TARGET[g.stage]) || (TARGET[step] === 'clip' && !s ? 'phone' : TARGET[step]),
             stage: g.stage, bandId: g.bandId || null, slot: g.slot || null, personId: g.personId || null, jobId: g.jobId || null,
             showId: s ? s.id : null, requestId: (s && s.requestId) || t.requestId || null,
             text: say(base + '.text', ctx), more: tx || null,
             nudge: today(state) - (t.nudgedAt || 0) >= NUDGE_DAYS ? say(base + '.nudge', ctx) : null,
             wrong: w ? say(base + '.wrong', ctx) : null };
  }

  /* Something happened: look again. eventName is one of
   *   REPLY (data.requestId)   the player answered a request        CLOSEOUT   the close-out was read
   *   NUDGED                   the "you there?" text was shown      anything else: just re-check
   * -> { step, advanced: [steps just finished], done: bool }, or null when the walkthrough is off. */
  function notify(state, eventName, data) {
    var t = peek(state), adv;
    if (!t || !t.on) return null;
    t = tut(state);
    data = data || {};
    if (eventName === 'REPLY' && (!t.requestId || !data.requestId || data.requestId === t.requestId || t.step === 'ANSWER')) t.replied = true;
    if (eventName === 'CLOSEOUT' && played(showOf(state, t))) t.closeout = true;
    if (eventName === 'NUDGED') t.nudgedAt = today(state);
    adv = advance(state, t);
    return { step: t.step, advanced: adv, done: t.done !== null };
  }

  return { start: start, skip: skip, current: current, notify: notify,
           /* beyond the manifest */
           STEPS: STEPS, TARGET: TARGET, showOf: function (state) { var t = peek(state); return t ? showOf(state, t) : null; },
           cast: cast, rig: rig, ask: ask, keeps: keeps };
});
