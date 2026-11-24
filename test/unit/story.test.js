'use strict';
// story.test — the first show, the chapters, the patches and the running order (design/spec/09a-build-contract.md).
//   the walkthrough goes through all ten steps, in order, on a seeded game played by the checklist bot;
//   chapters open (and close) from their triggers; patches are earned; a save round-trips; a version-2 save migrates;
//   the booker's order (touring band second to last, big local draw last) is the best night and feedback names a wrong one.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

const NEED = ['Chapters', 'Tutorial', 'Patches', 'Night', 'Save', 'Game', 'Week', 'Shows', 'Mail', 'Jobs', 'Legacy', 'Model', 'Forecast', 'Feedback'];

module.exports = function (t) {
  if (!H.needs(t, NEED, 'the story')) return;
  const run = require('../bots/run.js');
  const sb = H.fresh({ packs: ['pensacola'], text: false });
  const STEPS = sb.Tutorial.STEPS;
  const copy = x => JSON.parse(JSON.stringify(x));

  /* ---------------- the way in: the setup asked in the going-away scene ---------------- */
  H.section(t, 'the going-away bill is kept', () => {
    /* the scene plays on a first draft (guided, no name); the replies make the real game with the same seed */
    const first = H.newGame(sb, { seed: 'story-way-in', bookingName: '', tutorial: true });
    const a = sb.Chapters.slots(first, 'GOING_AWAY_open');
    const bill = { band1: a.band1, band2: a.band2, band2Home: a.band2Home, band3: a.band3 };
    t.ok(bill.band1 && bill.band2 && bill.band3, 'the draft has a going-away bill');
    const real = sb.Game.newGame({ seed: 'story-way-in', citySlug: 'pensacola', bookingName: 'Tin Lid', settings: { bills: false, fog: 'HARD', windows: 'FORGIVING' },
                                   tutorial: false, goingAway: bill });
    const b = sb.Chapters.slots(real, 'GOING_AWAY_open');
    t.eq([b.band1, b.band2, b.band2Home, b.band3], [bill.band1, bill.band2, bill.band2Home, bill.band3], 'the real game shows the bill that was watched');
    t.eq(b.bands, [bill.band1, bill.band2, bill.band3], 'in that order');
    t.eq([b.outgoing, b.room, b.host, b.sound, b.town], [a.outgoing, a.room, a.host, a.sound, a.town], 'and the same people and room');
    t.ok(real.story.tutorial.skipped && !real.settings.bills && real.settings.fog === 'HARD' && real.settings.windows === 'FORGIVING', 'the replies are the settings');
    const none = sb.Game.newGame({ seed: 'story-way-in', citySlug: 'pensacola', bookingName: 'Tin Lid', goingAway: { band1: 'x' } });
    t.ok(!(none.story.chapters.GOING_AWAY.refs || {}).band1, 'a half bill is not kept');
  });

  /* ---------------- a new game ---------------- */
  H.section(t, 'a new game', () => {
    const s = H.newGame(sb, { seed: 'story-new' });
    t.eq(s.v, sb.SAVE_VERSION, 'a new game is at the current save version');
    t.eq(Object.keys(s.story).sort(), ['chapters', 'counts', 'cutscenes', 'drops', 'seen', 'toasts', 'tutorial'], 'state.story has its keys');
    t.eq(s.patches, {}, 'no patches yet');
    t.ok(s.story.tutorial.on && s.story.tutorial.step === 'ANSWER' && !s.story.tutorial.skipped, 'the walkthrough starts on at ANSWER');
    const cur = sb.Tutorial.current(s);
    t.ok(cur && cur.step === 'ANSWER' && cur.target === 'phone' && cur.n === 1 && cur.of === 10, 'current() points at the phone');
    t.eq(Object.keys(s.story.chapters), ['GOING_AWAY'], 'chapter 0 is open');
    t.eq((sb.Chapters.nextCutscene(s) || {}).key, 'GOING_AWAY_open', 'its opening scene is first on the queue');
    const sl = sb.Chapters.nextCutscene(s).slots;
    t.ok(['outgoing', 'bookingName', 'town', 'bigCity', 'sound', 'host', 'room', 'curfew'].every(k => typeof sl[k] === 'string' && sl[k].length), 'the cutscene carries the common slots (' + JSON.stringify(sl) + ')');
    // views do not write
    const before = JSON.stringify(s);
    sb.Tutorial.current(s); sb.Chapters.list(s); sb.Chapters.nextCutscene(s); sb.Patches.all(s); sb.Chapters.drops(s);
    t.eq(JSON.stringify(s), before, 'current / list / nextCutscene / all do not change the state');
    // seen: off the queue, into the box, and chapter 1 opens
    sb.Chapters.markSeen(s, 'GOING_AWAY_open');
    t.ok(s.story.seen.indexOf('GOING_AWAY_open') >= 0 && !s.story.cutscenes.some(c => c.key === 'GOING_AWAY_open'), 'markSeen takes it off the queue');
    const opened = sb.Chapters.check(s);
    t.ok(opened.indexOf('GOING_AWAY:closed') >= 0 && opened.indexOf('DOORS_AT_8') >= 0, 'chapter 0 ends and chapter 1 opens (' + opened.join(' ') + ')');
    t.eq(sb.Chapters.check(s), [], 'a second check opens nothing more');
    t.eq(sb.Patches.all(s).length, 33, 'the Act I set is 33 patches and buttons');
    t.ok(sb.Patches.all(s).every(p => (p.kind === 'patch' || p.kind === 'button') && typeof p.hidden === 'boolean' && p.earned === false && p.week === null), 'all() gives { id, kind, hidden, earned, week }');
    t.eq(H.jsonIssues(s.story, 3), [], 'state.story is JSON-safe');
  });

  /* ---------------- the skip button ---------------- */
  H.section(t, 'skipping', () => {
    const s = H.newGame(sb, { seed: 'story-skip' });
    sb.Tutorial.skip(s);
    t.ok(!s.story.tutorial.on && s.story.tutorial.skipped && sb.Tutorial.current(s) === null, 'skip turns it off');
    t.eq(sb.Tutorial.notify(s, 'REPLY', {}), null, 'notify does nothing once it is off');
    t.ok(sb.Patches.check(s).indexOf('SKIPPED_TUTORIAL') >= 0, 'and earns the hidden button');
    t.eq(sb.Patches.nextToast(s), 'SKIPPED_TUTORIAL', 'which waits as a card');
    sb.Patches.toastShown(s, 'SKIPPED_TUTORIAL');
    t.eq(sb.Patches.nextToast(s), null, 'until it is shown');
    sb.Tutorial.start(s);
    t.ok(!s.story.tutorial.on, 'a skipped walkthrough does not start again');
    /* the strip's "skip the walkthrough" marks the skip's one text read, so the strip goes straight to the reminder */
    const s2 = H.newGame(sb, { seed: 'story-skip-strip' });
    t.ok(!!sb.Tutorial.current(s2), 'a new game is mid-walkthrough');
    sb.Tutorial.skip(s2); sb.Chapters.markSeen(s2, 'TUTORIAL_SKIP');
    t.ok(sb.Tutorial.current(s2) === null && s2.story.seen.indexOf('TUTORIAL_SKIP') >= 0, 'skipped mid-way: no step, and the skip text is read');
  });

  /* ---------------- the guided band waits for a slow offer ---------------- */
  H.section(t, 'the guided band waits', () => {
    const s = H.newGame(sb, { seed: 'story-wait' });
    const rid = s.story.tutorial.requestId, q = rid && s.requests && s.requests[rid];
    t.ok(q && q.dates && q.dates.length, 'the walkthrough follows a request with dates (' + rid + ')');
    if (!q) return;
    q.hid.raced = true; q.hid.gone = null;          // a rival booker is after them too
    const last = q.dates[0] - 1, before = copy(s);
    for (let d = q.day; d <= last; d++) { s.clock.day = d; sb.Requests.daily(s, d); }
    t.ok(['NEW', 'REPLIED', 'NEGOTIATING'].indexOf(q.status) >= 0 && q.hid.gone === null,
         'never answered, past reply-by (' + q.replyBy + '), it is still open on day ' + last + ' (' + q.status + ')');
    // the same days with the walkthrough off: the request goes, as any other does
    const o = before, oq = o.requests[rid];
    o.story.tutorial.on = false;
    for (let d = oq.day; d <= last; d++) { o.clock.day = d; sb.Requests.daily(o, d); }
    t.ok(['IGNORED', 'LAPSED'].indexOf(oq.status) >= 0, 'with the walkthrough off it lapses or goes to a rival (' + oq.status + ')');
  });

  /* ---------------- the guided show falls through after the room said yes ---------------- */
  H.section(t, 'the guided show falls through', () => {
    const s = H.newGame(sb, { seed: 'story-fall' }), T = s.story.tutorial, rid = T.requestId;
    t.ok(!Object.keys(s.shows || {}).length, 'a new game has no show yet');
    s.shows = s.shows || {};
    s.shows.fall = { id: 'fall', day: s.clock.day + 6, status: 'DRAFT', requestId: rid, roomId: null, hold: null, night: null,
                     bill: { slots: [], times: [], locked: false }, crew: {}, promo: {}, jobs: [] };
    T.step = 'PROMO'; T.showId = 'fall'; T.replied = true;
    const cur = sb.Tutorial.current(s);
    t.ok(cur && cur.step === 'HOLD', 'the room fell through: current() goes back to HOLD (' + (cur && cur.step) + ')');
    sb.Tutorial.notify(s, 'CHECK', null);
    t.eq(T.step, 'HOLD', 'and notify() writes it down');
    s.shows.fall.status = 'CANCELLED';
    if (rid && s.requests[rid]) s.requests[rid].status = 'LAPSED';
    T.step = 'BILL';
    t.eq(sb.Tutorial.current(s), null, 'cancelled with the request gone: nothing to walk through');
    sb.Tutorial.notify(s, 'CHECK', null);
    t.ok(!T.on && T.step === null && T.lapsed && !T.skipped, 'the walkthrough closes, not skipped');
  });

  /* ---------------- the first night is thin (spec 14) ---------------- */
  H.section(t, 'while the first show is walked through, nothing else arrives', () => {
    const kinds = st => sb.Mail.inbox(st).map(m => m.kind).sort().join(',');
    const s = H.newGame(sb, { seed: 'story-thin' });
    t.ok(sb.Tutorial.walking(s), 'a guided new game is being walked through its first show');
    t.eq(kinds(s), 'HANDOFF,REQUEST', 'night one has the handoff and the touring band\'s request, nothing else');
    t.eq(Object.keys(s.requests).length, 1, 'one request');
    t.eq(s.director.later.filter(x => x.hold).length, 2, 'the mass email and the host\'s hello wait for the show');
    t.eq(s.director.later.filter(x => !x.hold).map(x => x.day).sort(), [1, 2], 'the local draw writes on day 1, the kids on day 2');
    t.eq(sb.Director.due(s, 0, 'NIGHT'), null, 'no forced decision');
    t.eq(s.director.later.filter(x => x.hold).length, 2, 'and what waits still waits');
    sb.Chapters.markSeen(s, 'GOING_AWAY_open'); sb.Chapters.check(s);
    t.ok(s.story.cutscenes.length > 0 && s.story.cutscenes.every(c => c.hold), 'a chapter scene that opens on the way is held');
    t.eq(sb.Chapters.nextCutscene(s), null, 'and does not cut in');
    s.player.showsPlayed = 1;
    t.ok(!sb.Tutorial.walking(s), 'the show played: no longer walked through');
    t.ok(sb.Chapters.nextCutscene(s) !== null, 'the held scene plays after');
    sb.Director.due(s, s.clock.day, 'DAY');
    t.eq(s.director.later.filter(x => x.hold).length, 0, 'and the held mail arrives');
    t.eq(Object.keys(s.requests).length, 2, 'the mass email among it');
    // skipped: the old first night
    const k = H.newGame(sb, { seed: 'story-thin', tutorial: false });
    t.ok(!sb.Tutorial.walking(k), 'a skipped walkthrough is not walked through');
    t.eq(kinds(k), 'BAND,HANDOFF,REQUEST,REQUEST,ROOM', 'its first night has everything, as before');
    t.ok(!k.director.later.some(x => x.hold), 'nothing is held');
  });

  /* ---------------- one new thing a night (spec 14, the night table) ---------------- */
  H.section(t, 'the walkthrough, night by night, as far as the hours go', () => {
    const sx = H.fresh({ packs: ['pensacola'], text: true }), ok = r => r && r.ok !== false;
    const s = H.newGame(sx, { seed: 'story-nights' }), T = s.story.tutorial, Tx = sx.Content.story.tutorial;
    const cur = () => sx.Tutorial.current(s), at = () => { const c = cur(); return c ? c.step + ':' + c.stage : null; };
    const evening = () => { for (let g = 0; g < 80; g++) { const st = s.clock.stop; if (st && (st.kind === 'EVENING' || st.kind === 'END_OF_WEEK')) return st; sx.Week.step(s); } return null; };
    const night = () => { sx.Week.endNight(s); return evening(); };
    const cast = () => sx.Tutorial.cast(s);
    // one definition of "being walked through", and an older save is not
    t.ok(sx.Tutorial.walking(s) && sx.Director.walking(s), 'a guided new game is walked through, by the one test');
    const old = copy(s); delete old.director.guided;
    t.ok(old.story.tutorial.on && !sx.Tutorial.walking(old) && !sx.Director.walking(old), 'a save from before state.director.guided is not, for the Director and the Tutorial alike');
    // night 1: BOOK IT, the clock, the room
    evening();
    t.eq(T.taught, { day: 0, step: 'ROOM' }, 'night 1 is the room\'s');
    sx.Shows.create(s, { requestId: cur().requestId }); sx.Week.spend(s, 0.5); sx.Tutorial.notify(s, 'STEP');   // BOOK IT is a message: half an hour
    let c = cur();
    t.ok(c.stage === 'CLOCK' && /That took/.test(c.more), 'BOOK IT, then the clock lesson with what it cost');
    // the night is called before the room is asked: the lesson is still owed the next night, said without a cost
    const s0 = copy(s);
    sx.Week.endNight(s0); for (let g = 0; g < 80 && !(s0.clock.stop && s0.clock.stop.kind === 'EVENING'); g++) sx.Week.step(s0);
    c = sx.Tutorial.current(s0);
    t.ok(s0.clock.day === 1 && c && c.stage === 'CLOCK' && c.under === 'ASK' && c.target === 'clock', 'called at once: the next night still starts on the clock lesson (' + (c && c.stage) + ')');
    t.ok(c && /^You've got/.test(c.more) && !/That took|\{/.test(c.more) && c.more.split(/\s+/).length <= 25, 'in the words for a night nothing was spent on: "' + (c && c.more) + '"');
    sx.Tutorial.notify(s0, 'CLOCK');
    t.eq(sx.Tutorial.current(s0).stage, 'ASK', 'read, it goes on to asking the room');
    sx.Tutorial.notify(s, 'CLOCK');
    t.ok(ok(sx.Mail.ask(s, 'ROOM_HOLD', cast().roomId, { showId: cur().showId })), 'the room is asked');
    t.eq(at(), 'HOLD:WAIT', 'and the night is the room\'s: call it a night');
    // night 2: the offer and the draw; the kids and sound are other nights
    for (let g = 0; g < 4 && at() !== 'BILL:OFFER'; g++) night();
    t.eq(at(), 'BILL:OFFER', 'the room said yes: the offer');
    const d2 = s.clock.day;
    t.ok(ok(sx.Mail.reply(s, cur().requestId, 'OFFER', { showId: cur().showId })), 'the offer goes out');
    t.eq(at(), 'BILL:LOCAL', 'then the draw, the same night');
    t.ok(ok(sx.Mail.ask(s, 'BAND_PLAY', cur().bandId, { showId: cur().showId, pay: 'FREE', fee: 0, wantSlot: 'CLOSE' })), 'the draw is asked');
    // a night does as much as its hours allow (user 2026-11-24: "we dont need one night for every move"): sound next
    c = cur();
    t.eq([c.step, c.stage], ['SOUND', 'ASK'], 'the same sitting: sound, no call-it-a-night between');
    t.eq(sx.Tutorial.undone(s) && sx.Tutorial.undone(s).step, 'SOUND', 'calling it a night now would ask about sound');
    // the hours run out with sound still to ask: staying up is said once, and the choice is the player's
    let tn = sx.Week.tonight(s);
    sx.Week.spend(s, tn.left);
    c = cur();
    t.eq([c.step, c.stage, c.target, c.personId], ['SOUND', 'OUT', 'lamp', cast().sound], 'out of hours with sound still to ask: the stay-up line, on the clock');
    t.eq(c.more, Tx.stayUp, 'in its words');
    sx.Tutorial.notify(s, 'STEP');
    t.eq(T.stayTold, s.clock.day, 'written down as told');
    night();
    // the next night: the kids first if they have written by now (the bill comes before sound), then sound again
    const wrote = () => sx.Mail.inbox(s).some(m => m.kind === 'BAND' && m.refs && m.refs.bandId === cast().kids);
    let kidsAsked = false;
    if (at() === 'BILL:KIDS') {
      t.ok(wrote() && sx.Director.written(s, 'KIDS_OPENER'), 'the kids are asked only once their own message came (day ' + s.clock.day + ')');
      t.ok(ok(sx.Mail.ask(s, 'BAND_PLAY', cur().bandId, { showId: cur().showId, pay: 'FREE', fee: 0, wantSlot: 'OPEN' })), 'the kids are asked');
      kidsAsked = true;
    }
    t.eq(at(), 'SOUND:ASK', 'then it is the sound ask again');
    const s8 = copy(s);
    sx.Week.spend(s8, sx.Week.tonight(s8).left);
    t.eq(sx.Tutorial.current(s8).step + ':' + sx.Tutorial.current(s8).stage, 'SOUND:ASK', 'and running out a second time does not say it twice');
    t.ok(ok(sx.Mail.ask(s, 'CREW', cur().personId, { showId: cur().showId, role: 'sound', pay: { kind: 'CASH', amount: 0 } })), 'sound is asked');
    // the room is confirmed, so the flyer goes up the same night (the bands go on it as TBA)
    c = cur();
    t.ok(c.step === 'FLYER' && /^(NAME|MAKE)$/.test(c.stage), 'then the flyer, the same night (' + c.step + ':' + c.stage + ')');
    t.ok(ok(sx.Jobs.setFlyer(s, cur().showId, { template: 'x' })), 'the flyer is designed');
    for (let g = 0; g < 3; g++) {
      c = cur();
      const j = c.step === 'PROMO' && c.stage === 'PLAN' && c.jobId && s.jobs[c.jobId];
      if (!j || j.type !== 'MAKE_FLYER') break;
      t.ok(ok(sx.Week.doNow(s, c.jobId, {})), 'and made, tonight');
    }
    // the kids, if they had not written yet: once they have
    let early = false;
    for (let g = 0; g < 6 && !kidsAsked && at() !== 'BILL:KIDS'; g++) { night(); if (at() === 'BILL:KIDS' && !wrote()) early = true; }
    if (!kidsAsked) {
      t.ok(at() === 'BILL:KIDS' && wrote() && !early, 'the kids are asked once their own message came (day ' + s.clock.day + ')');
      t.ok(ok(sx.Mail.ask(s, 'BAND_PLAY', cur().bandId, { showId: cur().showId, pay: 'FREE', fee: 0, wantSlot: 'OPEN' })), 'the kids are asked');
    }
    t.ok(!T.wrong.BILL, 'a bill still waiting on the kids is not called out of order');
    // paying out: a line for each part of the envelope this show has, in the order it is paid
    const sp = copy(s); sp.story.tutorial.step = 'SETTLE';
    const pay = sx.Tutorial.payout(sp);
    const ORDER = ['ROOM', 'SOUND', 'TOURING', 'LOCALS', 'YOU'], ks = pay.map(x => x.k);
    t.ok(ks[0] === 'ROOM' && ks[ks.length - 1] === 'YOU' && ks.every((k, i) => i === 0 || ORDER.indexOf(k) > ORDER.indexOf(ks[i - 1])), 'the room first, you last, the rest in the order they are paid (' + ks.join(', ') + ')');
    t.ok(pay.every(x => x.text && !/\{/.test(x.text) && x.text.split(/\s+/).length <= 25), 'each in 25 words or fewer');
    t.eq(sx.Tutorial.payout(s), [], 'and none before paying out');
  });

  /* ---------------- the walkthrough, played ---------------- */
  let played = null;
  H.section(t, 'the first show, start to finish', () => {
    const seen = [], real = sb.Tutorial.notify;
    sb.Tutorial.notify = function (state, ev, data) {
      const r = real(state, ev, data);
      if (r && r.advanced) r.advanced.forEach(x => seen.push(x));
      return r;
    };
    let r;
    try { r = run.runGame({ seed: 'story-3', bot: 'checklist', weeks: 12, city: 'pensacola', text: false, sb: sb }); }
    finally { sb.Tutorial.notify = real; }
    t.ok(r.ok, 'twelve weeks play' + (r.error ? ': ' + r.error.message : ''));
    if (!r.ok) return;
    const s = played = r.state, T = s.story.tutorial;
    t.eq(seen, STEPS, 'the ten steps are finished once each, in order');
    t.ok(!T.on && T.step === null && typeof T.done === 'number' && !T.skipped, 'the walkthrough is done (week ' + T.done + ')');
    t.eq(sb.Tutorial.current(s), null, 'and current() is null');
    const show = s.shows[T.showId];
    t.ok(show && show.status === 'PLAYED', 'it followed a real show that was played (' + T.showId + ')');
    t.ok(show && show.bill.slots.length >= 3 && sb.Chapters.billOrder(s, show).ok && !T.wrong.BILL, 'the bill had three bands in the booker\'s order');
    t.ok(show && show.crew.sound && show.promo.flyer, 'sound was booked and a flyer made');
    t.ok(s.legacy.records[T.showId], 'the first show is in the record');
    // chapters from their triggers
    const ch = s.story.chapters;
    t.ok(ch.GOING_AWAY && ch.GOING_AWAY.closed !== null, 'chapter 0 closed');
    t.ok(ch.DOORS_AT_8 && ch.DOORS_AT_8.closed === T.done, 'Doors at 8 closed the week the first show was settled');
    t.ok(ch.ANSWER_EVERYONE && ch.ANSWER_EVERYONE.opened === ch.DOORS_AT_8.closed, 'Answer everyone opened then');
    const keys = s.story.cutscenes.map(c => c.key);
    ['GOING_AWAY_open', 'GOING_AWAY_close', 'DOORS_AT_8_open', 'DOORS_AT_8_close', 'ANSWER_EVERYONE_open'].forEach(k => t.ok(keys.indexOf(k) >= 0, k + ' is queued'));
    t.ok(keys.indexOf('DOORS_AT_8_open') < keys.indexOf('DOORS_AT_8_close'), 'oldest first');
    t.eq(keys.length, new Set(keys).size, 'no cutscene is queued twice');
    t.ok(s.patches.DOORS_AT_8 && s.patches.DOORS_AT_8.week === T.done, 'the DOORS AT 8 patch was earned that week');
    const showOnly = ['COUNT_IT_TWICE', 'OUT_OF_STATE', 'PACKED', 'ON_THE_WALL', 'FIRST_SHOW_EVER', 'RAINED_OUT', 'WEEKEND_PICK'];
    t.eq(showOnly.filter(id => s.patches[id] && s.patches[id].week === T.done), [], 'the guided show earns DOORS AT 8 and no other show patch');
    t.ok(sb.Patches.all(s).filter(p => p.earned).length === Object.keys(s.patches).length, 'all() agrees with state.patches');
    const list = sb.Chapters.list(s);
    t.ok(list.length === Object.keys(ch).length && list[0].id === 'GOING_AWAY' && list[0].cutscenes.length === 2, 'list() gives the opened chapters with their cutscenes');
    t.eq(H.jsonIssues(s.story, 3), [], 'state.story is still JSON-safe');
    t.ok(!s.story.setup && keys.indexOf('GOING_AWAY_setup') < 0, 'a game not made to ask its setup later never queues the setup scene');
    /* the same finished first show on a game that asks afterwards: the setup goes to the front (the recap card is shown
       with it), and the scenes that stacked up behind the show wait, one an evening from tomorrow (spec 14) */
    const s2 = copy(s);
    s2.story.setup = 'LATER';
    t.ok(sb.Chapters.check(s2).indexOf('GOING_AWAY_setup') >= 0, 'with the first show settled the setup scene is queued');
    const k2 = s2.story.cutscenes.map(c => c.key);
    t.eq(k2.indexOf('GOING_AWAY_setup'), 0, 'at the front of the queue');
    t.eq(s2.story.setup, 'ASK', 'and the setup is open');
    sb.Chapters.check(s2);
    t.eq(s2.story.cutscenes.filter(c => c.key === 'GOING_AWAY_setup').length, 1, 'it is queued once');
    const d2 = s2.clock.day, rest = s2.story.cutscenes.slice(1);
    t.ok(rest.length >= 2 && !rest.some(c => c.key === 'DOORS_AT_8_close') && s2.story.seen.indexOf('DOORS_AT_8_close') >= 0, 'the first show\'s own scene goes in the box unplayed: the recap card tells that night');
    t.ok(s2.story.cutscenes[0].slots.after === true && s2.story.cutscenes[0].slots.cold === false, 'the setup is queued as after the show');
    t.eq(rest.map(c => c.wait), rest.map((c, i) => d2 + 1 + i), 'each scene behind it waits for its own evening, from tomorrow');
    t.eq((sb.Chapters.nextCutscene(s2) || {}).key, 'GOING_AWAY_setup', 'tonight only the setup plays');
    sb.Chapters.markSeen(s2, 'GOING_AWAY_setup');
    t.eq(sb.Chapters.nextCutscene(s2), null, 'and nothing else the same night');
    s2.clock.day = d2 + 5;                                 // days skipped: still one an evening
    const first = sb.Chapters.nextCutscene(s2).key;
    t.eq(first, rest[0].key, 'the oldest scene plays first on a later evening');
    sb.Chapters.markSeen(s2, first);
    t.eq(sb.Chapters.nextCutscene(s2), null, 'the next one is not before the evening after');
    s2.clock.day += 1;
    t.eq((sb.Chapters.nextCutscene(s2) || {}).key, rest[1].key, 'then the next');
    t.ok(!s.story.cutscenes.some(c => 'wait' in c) && sb.Chapters.nextCutscene(s), 'a game that does not ask later keeps its scenes as they were');
  });

  /* ---------------- the name sheet at the first flyer (spec 14, night "5 Fri") ---------------- */
  H.section(t, 'the booking name is asked at the first flyer', () => {
    const s = sb.Game.newGame({ seed: 'story-name', citySlug: 'pensacola', bookingName: '', mark: { v: 1, seed: 'nm' }, tutorial: true, setupLater: true });
    t.eq(s.player.bookingName, '', 'a first-timer starts with no booking name');
    const T = s.story.tutorial, spec = () => { try { return sb.Jobs.flyerSpec(s, 'nm'); } catch (e) { return null; } };
    s.shows.nm = { id: 'nm', day: s.clock.day + 11, status: 'CONFIRMED', requestId: T.requestId, roomId: s.director.cast.roomId, hold: null, night: null,
                   bill: { slots: [], times: [], locked: false }, crew: {}, promo: {}, jobs: [], door: {} };
    T.step = 'FLYER'; T.showId = 'nm'; T.replied = true; delete T.taught;   // put straight on the flyer's night: no lesson was started tonight
    const c = sb.Tutorial.current(s);
    t.ok(c && c.step === 'FLYER' && c.stage === 'NAME' && c.target === 'clip', 'the flyer step starts on the name (' + (c && c.step + ':' + c.stage) + ')');
    t.ok(sb.text.off || (c.more && c.more.split(/\s+/).length <= 25), 'in 25 words or fewer');
    const sp = spec();
    if (sp) t.eq(sp.presenter, '', 'the flyer has nobody presenting it yet');
    if (sp && sb.Flyer && sb.Flyer.text) t.ok(!/presents/.test(sb.Flyer.text(sp)), 'and it does not say a bare "presents"');
    t.eq(sb.Game.setBookingName(s, '   '), { ok: false, why: 'EMPTY' }, 'an empty name is refused');
    t.eq(s.player.bookingName, '', 'and nothing is saved');
    const r = sb.Game.setBookingName(s, '  Tin  Lid ', { treatment: 'stencil' });
    t.ok(r.ok && r.name === 'Tin Lid' && s.player.bookingName === 'Tin Lid', 'the name is saved, tidied');
    t.ok(s.player.mark.treatment === 'stencil' && s.player.mark.seed === 'nm', 'the lettering is the mark\'s treatment, and the rest of the mark is kept');
    const c2 = sb.Tutorial.current(s);
    t.ok(c2 && c2.step === 'FLYER' && c2.stage === 'MAKE', 'named, the flyer step goes on to making it (' + (c2 && c2.step + ':' + c2.stage) + ')');
    if (spec()) t.eq(spec().presenter, 'Tin Lid', 'and the flyer is presented by the name');
    const old = H.newGame(sb, { seed: 'story-name-old', tutorial: true });
    old.story.tutorial.step = 'FLYER';
    t.ok(sb.Tutorial.current(old) === null || sb.Tutorial.current(old).stage !== 'NAME', 'a game that has a name is never asked');
  });

  /* ---------------- the walkthrough's words: one line at a time, 25 words, the why under it (spec 14) ---------------- */
  H.section(t, 'the walkthrough lines fit the text budget', () => {
    const T = sb.Content.story.tutorial, C = sb.Content.story.coach;
    /* a slot counts as two words (a band or a person with two names), the clock's as its longest words */
    const words = x => String(x).replace(/\{cost\}|\{left\}/g, 'half an hour').replace(/\{[^}]+\}/g, 'Aa Bb').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
    const lines = [['clock', T.clock], ['clockNew', T.clockNew], ['rest', T.rest], ['stayUp', T.stayUp]];
    t.ok(T.clockNew && !/\{cost\}/.test(T.clockNew) && /\{left\}/.test(T.clockNew), 'the clock lesson has a line for a night nothing was spent on');
    t.ok(/call it a night/.test(T.rest) && /stay up/.test(T.stayUp), 'one new thing a night and staying up each have their line');
    ['PLAN_OFF', 'PLAN_FLYER_OFF'].forEach(g => t.ok(/ten hours/.test(T.steps.PROMO.stages[g] || ''), 'PROMO:' + g + ' says a day off has ten hours'));
    t.ok(/ten hours/.test(T.steps.WAIT.stages.PLAY_OFF || '') && /mail/.test(T.steps.WAIT.stages.PLAY) && /call it a night/.test(T.steps.WAIT.stages.PLAY), 'the wait: answer the mail, then call it a night; a day off has ten hours');
    t.eq(Object.keys(T.steps.SETTLE.tabs || {}), ['ROOM', 'SOUND', 'TOURING', 'LOCALS', 'YOU'], 'paying out has a line for each part of the envelope, in the order it is paid');
    Object.keys(T.steps.SETTLE.tabs || {}).forEach(k => lines.push(['SETTLE.tabs.' + k, T.steps.SETTLE.tabs[k]]));
    const want = { ANSWER: ['REPLY'], HOLD: ['ASK', 'WAIT', 'HELD'], BILL: ['OFFER', 'LOCAL', 'KIDS', 'WAIT', 'ORDER'], SOUND: ['ASK', 'WAIT'],
                   FLYER: ['NAME', 'MAKE'], PROMO: ['PLAN', 'PLAN_FLYER', 'WAIT'], WAIT: ['PLAY', 'EVE'], DOOR: ['PLAY', 'OPEN', 'DOOR'], SETTLE: ['SETTLE'], CLOSEOUT: ['READ'] };
    t.eq(Object.keys(want), sb.Tutorial.STEPS, 'every step of the walkthrough is checked');
    Object.keys(want).forEach(k => {
      const st = T.steps[k] || {};
      t.ok(st.text && st.nudge && T.where && T.where[k], k + ' has its why, its nudge and its place on the map');
      want[k].forEach(g => t.ok(st.stages && st.stages[g], k + ':' + g + ' has its one line'));
      ['nudge', 'wrong'].forEach(f => { if (st[f]) lines.push([k + '.' + f, st[f]]); });
      Object.keys(st.stages || {}).forEach(g => lines.push([k + ':' + g, st.stages[g]]));
    });
    Object.keys(C).forEach(k => C[k].frames.forEach(f => f.lines.forEach(l => lines.push([k, l.say]))));
    lines.forEach(([k, v]) => t.ok(words(v) <= 25, k + ' is 25 words or fewer (' + words(v) + ')'));
    t.eq(Object.keys(C).sort(), ['TUT_ANSWER_REPLY', 'TUT_DOOR'], 'only the first message and the door are calls; every other step is its one line');
  });

  /* ---------------- the setup asked after the first show (spec 14) ---------------- */
  H.section(t, 'the setup is asked after the first show', () => {
    const cs = sb.Content.story.cutscenes, asks = c => c.frames.filter(f => f.ask).map(f => f.ask.id);
    t.eq(asks(cs.GOING_AWAY_open), [], 'the opening asks nothing');
    const op = cs.GOING_AWAY_open.frames, opWords = op.map(f => [f.caption].concat(f.lines.map(l => l.say)).join(' ')).join(' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
    t.ok(op.length === 8 && opWords < 150, 'the opening is 8 frames and under 150 words (' + op.length + ', ' + opWords + ')');
    t.eq(op.slice(0, 5).map(f => f.art), ['CARPORT_NIGHT', 'STAGE_BAND', 'STAGE_BAND', 'CROWD_FRONT', 'CARPORT_EMPTY'], 'the five going-away show frames first');
    t.ok(op.some(f => f.art === 'KITCHEN_FLOOR') && op.some(f => f.art === 'HANDS_TIN' && f.lines.some(l => /yours if you want it/.test(l.say))), 'then the kitchen floor and the cash tin');
    t.eq(asks(cs.GOING_AWAY_name), ['name'], 'the booking name has its own frame, for somebody who has booked before');
    t.ok(!/\{bookingName\}/.test(JSON.stringify(cs.GOING_AWAY_open)), 'and the opening never says a name nobody has given yet');
    t.eq(asks(cs.GOING_AWAY_setup), ['how', 'band'], 'the setup scene asks how to play and your band');
    const how = cs.GOING_AWAY_setup.frames[0].ask;
    t.eq(how.options.map(o => o.v), ['EASY', 'REALISTIC', 'DIFFICULT'], 'three ways to play');
    t.ok(how.options.every(o => o.level === o.v && o.note) && how.options[1].def && how.toggle && how.toggle.id === 'bills', 'each stamped, with a note, the middle one usual, and the day job tick box');
    const words = x => String(x).replace(/\[\?[^:\]]*:/g, ' ').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;
    cs.GOING_AWAY_setup.frames.forEach(f => f.lines.forEach(l => String(l.say).replace(/^\[\?[^:]*:|\]$/g, '').split('|').forEach(v =>
      t.ok(words(v) <= 25, 'a setup line is 25 words or fewer (' + words(v) + ')'))));

    const opts = { seed: 'story-setup', citySlug: 'pensacola', bookingName: 'Tin Lid', settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tutorial: true };
    const s = sb.Game.newGame(Object.assign({ setupLater: true }, opts));
    t.eq([s.story.setup, sb.Chapters.setup(s)], ['LATER', 'LATER'], 'a first-timer\'s game asks its setup later');
    t.ok(s.story.tutorial.on && s.settings.bills && s.settings.fog === 'NORMAL' && s.player.dayJob !== 'NONE', 'the first show is guided, realistic, with the day job on');
    t.ok(!s.story.cutscenes.some(c => c.key === 'GOING_AWAY_setup'), 'nothing is queued while the walkthrough is on');
    sb.Chapters.check(s);
    t.eq(s.story.setup, 'LATER', 'and looking again changes nothing');
    t.eq(sb.Game.newGame(Object.assign({ setupLater: true }, opts, { tutorial: false })).story.setup, undefined, 'somebody who booked before was asked already');
    s.clock.opened = 0;                                   // the first morning has been played
    t.ok(!sb.Game.setSetting(s, 'bills', false).ok && s.settings.bills, 'the day job cannot change during the first show');
    /* the walkthrough ends (here: skipped mid-game): the setup scene is waiting at once */
    sb.Tutorial.skip(s);
    t.eq((sb.Chapters.nextCutscene(s) || {}).key, 'GOING_AWAY_setup', 'when the walkthrough is over the setup scene is on the queue');
    t.eq(s.story.setup, 'ASK', 'and open');
    const sl = sb.Chapters.slots(s, 'GOING_AWAY_setup');
    t.ok(sl.cold === true && sl.after === false, 'skipped before the show: the setup is queued cold, not as after a show');
    const f0 = cs.GOING_AWAY_setup.frames[0], said = sb.text.render(f0.caption, sl, null) + ' ' + sb.text.render(f0.lines[0].say, sl, null);
    t.ok(!/You did one|kitchen again/.test(said) && /packed/.test(said), 'and its words do not say a show was played (' + said + ')');
    t.ok(sl.outgoing && sl.rent, 'its slots are filled (' + sl.outgoing + ', ' + sl.rent + ')');
    const fund0 = s.money.fund, job0 = s.player.dayJob, shifts0 = copy(s.week.shifts);
    t.ok(sb.Game.setSetting(s, 'fog', 'OPEN').ok && sb.Game.setSetting(s, 'windows', 'FORGIVING').ok && s.settings.fog === 'OPEN', 'how to play changes at once');
    const r = sb.Game.setSetting(s, 'bills', false);
    t.ok(r.ok && s.settings.bills === true && s.settings.billsNext === false, 'the day job off is kept for the next week');
    t.eq([s.player.dayJob, s.week.shifts, s.money.fund], [job0, shifts0, fund0], 'nothing changes in the middle of the week');
    sb.Game.setSetting(s, 'bills', true);
    t.ok(!('billsNext' in s.settings), 'picking how it is now takes the change back');
    sb.Game.setSetting(s, 'bills', false);
    sb.Chapters.markSeen(s, 'GOING_AWAY_setup');
    t.eq(s.story.setup, 'DONE', 'once the scene has played the setup is done');
    t.ok(!sb.Game.setSetting(s, 'bills', true).next && s.settings.billsNext === false, 'and the day job is not asked again');
    t.ok(sb.Game.turnBills(s), 'the week turns');
    t.ok(s.settings.bills === false && !('billsNext' in s.settings) && s.player.dayJob === 'NONE' && s.money.bank === null, 'and the day job and the rent are gone');
    t.eq(s.money.fund, fund0 + sb.Config.MONEY.BILLS_OFF.fund, 'the cash box keeps its show money and gets the float');
    sb.Week.resetShape(s);
    t.eq(s.week.shifts.map((x, i) => x ? i : -1).filter(i => i >= 0), sb.Config.BILLS_OFF_BUSY, 'the week has the hours of a life without a day job');
    t.ok(!sb.Game.turnBills(s), 'a second turn changes nothing');
    const old = sb.Game.newGame(opts);
    t.ok(!sb.Game.turnBills(old) && old.settings.bills, 'a game with nothing waiting is left alone');
    t.eq(H.jsonIssues(s.story, 3), [], 'state.story is still JSON-safe');
  });

  /* ---------------- chapters and patches from what the engine records ---------------- */
  H.section(t, 'triggers', () => {
    if (!played) { t.note('story: no played game, triggers skipped'); return; }
    const s = copy(played);
    const open = id => !!s.story.chapters[id];
    const check = () => sb.Chapters.check(s).concat(sb.Patches.check(s));
    let got;

    // the touring band of a confirmed show: Out of state
    if (!open('OUT_OF_STATE')) {
      const id = Object.keys(s.shows).filter(k => s.shows[k].status === 'PLAYED')[0];
      s.shows[id].bill.slots[0].role = 'TOURING';
      got = check();
      t.ok(got.indexOf('OUT_OF_STATE') >= 0, 'a touring band on a show opens Out of state');
    } else t.ok(true, 'Out of state opened in play');

    // a thin night
    const recs = Object.keys(s.legacy.records).map(k => s.legacy.records[k]).sort((a, b) => a.day - b.day);
    if (!open('THIN')) { recs[recs.length - 1].verdict = 'THIN'; got = check(); t.ok(got.indexOf('THIN') >= 0, 'a thin show opens Thin'); }
    else t.ok(true, 'Thin opened in play');

    // word of mouth
    if (!open('ASK_FOR_YOU')) {
      s.requests.q900 = { id: 'q900', kind: 'REFERRAL', referrerId: 'someone-else', bandId: null, day: s.clock.day - 1, status: 'NEW', dates: [] };
      got = check();
      t.ok(got.indexOf('ASK_FOR_YOU') >= 0 && s.patches.ASK_FOR_YOU, 'a referral that is not from the outgoing booker opens Say to ask for you and earns its patch');
      t.ok(s.legacy.firsts.some(f => f.k === 'WORD_OF_MOUTH'), 'and marks FIRST.WORD_OF_MOUTH');
    } else t.ok(true, 'Say to ask for you opened in play');

    // the name
    s.player.stage = 3; got = check();
    t.ok(got.indexOf('ALL_AGES') >= 0, 'stage 3 opens the all-ages chapter');
    s.player.stage = 4; got = check();
    t.ok(got.indexOf('WATCHING') >= 0, 'stage 4 opens Somebody\'s watching');
    s.legacy.firsts.push({ k: 'ROOM_KEPT', week: s.clock.week, text: '', refs: {} }); got = check();
    t.ok(got.indexOf('ALL_AGES:closed') >= 0 && got.indexOf('ROOM_TOWN_DIDNT_HAVE') >= 0, 'a room kept a year closes it and earns the patch');
    t.ok(s.story.cutscenes.some(c => c.key === 'ALL_AGES_close'), 'with its closing cutscene');

    // the most-used room closes
    const top = recs[0].roomId;
    recs.forEach(r => { r.roomId = top; });
    s.rooms[top].open = false; s.rooms[top].closedWeek = s.clock.week; s.rooms[top].closedWhy = 'SOLD';
    got = check();
    t.ok(got.indexOf('LAST_CALL') >= 0 && got.indexOf('ROOM_GONE') >= 0 && got.indexOf('CONDOS') >= 0, 'the most-used room sold: Last call, the room-gone drop, CONDOS (' + got.join(' ') + ')');
    t.ok(s.story.cutscenes.some(c => c.key === 'ROOM_GONE' && c.slots.gone === s.rooms[top].name), 'the drop names the room');

    // the money ladder
    s.player.couch = true; got = check();
    t.ok(got.indexOf('COUCH') >= 0 && s.patches.COUCH && s.story.drops.COUCH !== undefined, 'the couch: the drop and the button');

    // shows played, the clock
    s.player.showsPlayed = 50; got = check();
    t.ok(got.indexOf('SHOWS_50') >= 0 && got.indexOf('YOU_ARE_THE_DOOR') >= 0 && got.indexOf('DANA_TUESDAY') >= 0, '50 shows: the patch, the door button, Dana\'s Tuesday');
    t.ok(!s.patches.SHOWS_100, 'not yet 100');
    s.clock.week = 520; got = check();
    t.ok(got.indexOf('TEN_YEARS') >= 0, 'ten years');

    // the small counters
    const c = s.story.counts;
    c.secondToLast = 10; c.flyerSameDay = 5; c.doneBy = 10; c.fourPeople = 1; c.swaps = 1; c.copsCame = 1;
    got = check();
    ['SECOND_TO_LAST', 'FLYER_SAME_DAY', 'DONE_BY_1030', 'FOUR_PEOPLE', 'SWAP', 'COPS_CAME'].forEach(id => t.ok(got.indexOf(id) >= 0 || ((id === 'SWAP' || id === 'FOUR_PEOPLE') && !!s.patches[id]), id + ' from its counter'));   // the swap of week 5, or a four-person night, may already have been played
    t.ok(got.indexOf('SWAP:closed') >= 0 || open('SWAP'), 'a swap played opens (and closes) The swap');
    t.eq(check(), [], 'nothing is earned or opened twice');
    Object.keys(s.patches).forEach(id => t.ok(typeof s.patches[id].week === 'number' && s.patches[id].refs && typeof s.patches[id].refs === 'object', id + ' is { week, refs }'));

    // answering everyone: eight clean weeks with replies; one ignored request breaks the run
    // (the twelve played weeks may have left a request unanswered in their last week: these eight start clean)
    const clean = st => Object.keys(st.requests).forEach(k => { if (st.requests[k].status === 'IGNORED') st.requests[k].closedDay = -1; });
    const a = copy(played); a.patches = {}; a.story.counts = {}; clean(a);
    for (let i = 0; i < 8; i++) { sb.Patches.replied(a); sb.Patches.weekly(a); }
    t.ok(sb.Patches.check(a).indexOf('ANSWER_EVERYONE') >= 0, 'eight weeks of answering everyone earns the patch');
    const b = copy(played); b.patches = {}; b.story.counts = {}; clean(b);
    for (let i = 0; i < 7; i++) { sb.Patches.replied(b); sb.Patches.weekly(b); }
    b.requests.q901 = { id: 'q901', kind: 'COLD', status: 'IGNORED', closedDay: (b.clock.week - 1) * 7 + 2, dates: [] };
    sb.Patches.weekly(b);
    t.ok(b.story.counts.answerRun === 0 && sb.Patches.check(b).indexOf('ANSWER_EVERYONE') < 0, 'a request left unanswered starts the run over');
  });

  /* ---------------- save and load ---------------- */
  H.section(t, 'save and load', () => {
    if (!played) { t.note('story: no played game, save round-trip skipped'); return; }
    const text = sb.Save.exportText(played);
    const r = sb.Save.importText(text);
    t.ok(r && r.ok && r.state.v === sb.SAVE_VERSION, 'the save loads');
    if (!r || !r.ok) return;
    t.eq(r.state.story, played.story, 'state.story round-trips');
    t.eq(r.state.patches, played.patches, 'state.patches round-trips');
    t.eq(sb.Chapters.check(r.state).concat(sb.Patches.check(r.state)), [], 'and nothing new opens on load');
    // a version-2 save: no story, no patches
    const old = copy(played); delete old.story; delete old.patches; old.v = 2;
    let m = null;
    try { m = sb.Save.importText(JSON.stringify({ v: 2, state: old })); } catch (e) { t.fail('a version-2 save threw: ' + e.message); return; }
    t.ok(m && m.ok && m.state.v === 3 && sb.SAVE_VERSION === 3, 'a version-2 save is brought up to version 3');
    if (!m || !m.ok) return;
    const st = m.state.story;
    t.ok(st && st.tutorial.on === false && st.tutorial.skipped === false && st.tutorial.step === null, 'its walkthrough is off, not skipped');
    t.eq(st.cutscenes, [], 'no cutscenes wait');
    t.eq(st.toasts, [], 'no patch cards wait');
    t.ok(st.chapters.DOORS_AT_8 && st.seen.indexOf('DOORS_AT_8_open') >= 0, 'the chapters already lived are in the box');
    t.ok(m.state.patches.DOORS_AT_8 && !m.state.patches.SKIPPED_TUTORIAL, 'the patches already earned are on the jacket');
    // a fixture with no story at all still works
    const f = golden.build(sb, { notebook: true });
    delete f.state.story; delete f.state.patches;
    t.eq(sb.Tutorial.current(f.state), null, 'current() on a state with no story is null');
    t.ok(Array.isArray(sb.Chapters.check(f.state)) && f.state.story && f.state.patches, 'check() fills the defaults in');
  });

  /* ---------------- the running order ---------------- */
  H.section(t, 'the running order', () => {
    const f = golden.build(sb, { notebook: true });
    const ids = f.show.bill.slots.map(x => x.bandId);
    const perms = a => a.length < 2 ? [a] : a.reduce((o, x, i) => o.concat(perms(a.slice(0, i).concat(a.slice(i + 1))).map(p => [x].concat(p))), []);
    const rows = perms(ids).map(order => {
      const st = copy(f.state), sh = st.shows[f.show.id];
      sh.bill.slots = order.map(id => sh.bill.slots.filter(x => x.bandId === id)[0]);
      const n = sb.Model.resolve(st, sh, sb.Forecast.lens(st, 'TRUTH', { stale: false }), {}).night;
      return { order: order, state: st, show: sh, q: n.q, ok: sb.Chapters.billOrder(st, sh), peak: n.sets.filter(x => x.peak)[0] };
    });
    const right = rows.filter(r => r.ok.ok);
    t.eq(right.length, 1, 'one order of the golden bill is the booker\'s');
    if (right.length !== 1) return;
    const R = right[0], sl = R.show.bill.slots;
    t.ok(sl[sl.length - 2].role === 'TOURING' && sl[sl.length - 1].bandId === R.ok.closer, 'touring band second to last, the biggest local draw last');
    rows.filter(r => r !== R).forEach(r => {
      t.ok(R.q > r.q, 'that order beats ' + r.order.join(' ') + ' (' + R.q + ' against ' + r.q + ')');
      t.ok(R.peak.present >= r.peak.present, 'and the touring band plays to as full a room or fuller (' + R.peak.present + ' against ' + r.peak.present + ')');
      t.ok(r.ok.why === 'TOURING_SLOT' || r.ok.why === 'CLOSER', 'billOrder says why ' + r.order.join(' ') + ' is wrong (' + r.ok.why + ')');
    });
    // feedback names it: the wrong order shows as a loss under ORDER, the right one does not
    const lossOf = r => {
      const c = sb.Feedback.causes(r.state, r.show.id).filter(x => x.cause === 'ORDER')[0];
      return c ? c.d : 0;
    };
    const worst = rows.slice().sort((a, b) => a.q - b.q)[0];
    t.ok(lossOf(worst) < -0.5, 'feedback counts the worst order as a loss under ORDER (' + lossOf(worst) + ')');
    t.ok(Math.abs(lossOf(R)) < 0.5, 'and the booker\'s order as none (' + lossOf(R) + ')');
    const C = sb.Content.feedback;
    const hasOrderText = JSON.stringify(C || {}).indexOf('second to last') >= 0;
    t.ok(hasOrderText, 'the feedback content has a line that says second to last');
  });
};
