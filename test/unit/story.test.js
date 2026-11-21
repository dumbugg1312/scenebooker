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
    ['SECOND_TO_LAST', 'FLYER_SAME_DAY', 'DONE_BY_1030', 'FOUR_PEOPLE', 'SWAP', 'COPS_CAME'].forEach(id => t.ok(got.indexOf(id) >= 0 || (id === 'SWAP' && !!s.patches.SWAP), id + ' from its counter'));   // the swap of week 5 may already have been played
    t.ok(got.indexOf('SWAP:closed') >= 0 || open('SWAP'), 'a swap played opens (and closes) The swap');
    t.eq(check(), [], 'nothing is earned or opened twice');
    Object.keys(s.patches).forEach(id => t.ok(typeof s.patches[id].week === 'number' && s.patches[id].refs && typeof s.patches[id].refs === 'object', id + ' is { week, refs }'));

    // answering everyone: eight clean weeks with replies; one ignored request breaks the run
    const a = copy(played); a.patches = {}; a.story.counts = {};
    for (let i = 0; i < 8; i++) { sb.Patches.replied(a); sb.Patches.weekly(a); }
    t.ok(sb.Patches.check(a).indexOf('ANSWER_EVERYONE') >= 0, 'eight weeks of answering everyone earns the patch');
    const b = copy(played); b.patches = {}; b.story.counts = {};
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
