/* Scene Booker — ui/story.js (WIRING, 09-tutorial-story-patches 1, 3, 4)
 * Act I on the desk. Holds no game rule: it plays what the engine queued and shows what the engine says.
 *   pump()            called by js/ui/app.js after every act() and every mount(): plays the next queued cutscene
 *                     (SB.Chapters.nextCutscene -> SB.Cutscene.play -> markSeen, save), one at a time and never on the
 *                     night screen; then lands the next earned patch's card on the desk; then redraws the guidance.
 *   opening(st, cb)   GOING_AWAY_open played on a made game (no questions), before the desk appears.
 *   openingAsk(...)   the way in: GOING_AWAY_open on a draft game, asking the booking name (and, for somebody who has
 *                     booked before, the setup); then the real game. A first-timer's setup (GOING_AWAY_setup) plays from
 *                     pump at the desk after the first show, and its replies change the game (setupScene, applySetup).
 *   phone(state)      the outgoing booker's texts for the inbox's list (the walkthrough's current step).
 *   chapters(state)   the box, as a notebook page: every opened chapter; a seen cutscene can be watched again.
 *   rewatch(key)      play one again (nothing is marked).
 * The guidance: the step's text is a text on the phone, and a small strip on the desk while the phone is down; one
 * strip of masking tape with a sharpie arrow points at the thing to press next, wherever the player is: on the desk
 * the object SB.Tutorial.current(state).target names (the night screen is reached through the tape deck, a show's
 * set list through its clip); inside a close-up the row, button, sticker, slot, job or tab the step's stage needs
 * (spot()), or "put it down" when the close-up is the wrong one. The tape is one element on <body>, kept inside the
 * window, moved after every act, click, scroll and redraw; the element it points at carries data-taped.
 * Also registers the 'jacket' route: the jacket laid flat, every patch of SB.Patches.all.
 * UI memory only (never saved): which strip was put away, which step has been nudged.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.story = {
    texts: 'Texts from {outgoing}',
    stripOpen: 'Text from {outgoing}: {text} Open the phone.',
    stripSay: 'Text from {outgoing}: {text}',
    downFirst: 'First close this, top right.',
    closeCard: 'Close the {room} card first, top right.',
    closeThing: 'Close {thing} first, top right.',
    thing: { show: 'the show card', inbox: 'the phone', calendar: 'the calendar', week: 'the calendar', flyerdesk: 'the flyer desk', notebook: 'the notebook',
             rooms: 'the room keys', room: 'the room page', people: 'the address book', money: 'the cash tin', town: 'the map', city: 'the map',
             bands: 'the band stickers', band: 'the band page', files: 'the folder', shows: 'the show clips', jacket: 'the jacket', settings: 'the settings pad', close: 'the close-out' },
    leaveFirst: 'First go back to the desk.',
    dismiss: 'Put this away', clockOk: 'got it',
    why: 'why?', whyL: 'Why, from {outgoing}', whyHide: 'Hide why',
    skipLink: 'skip the walkthrough', skipAsk: 'Skip the walkthrough? {outgoing} stops texting steps.',
    skipYes: 'skip it', skipNo: 'keep going',
    tape: 'next',
    jacketTitle: 'Your jacket',
    jacketLabel: 'The back of your jean jacket: {n} of {of} patches and buttons on it',
    jacketNone: 'Nothing on it yet. They get sewn on when you earn them.',
    blank: 'a blank square of denim',
    notYet: '{name}, not on it yet. {hint}',
    earned: '{name}. {card}',
    cardLabel: 'New for the jacket: {name}',
    sew: 'sew it on',
    pin: 'pin it',
    chaptersNone: 'nothing in the box yet.',
    chapterN: '{n}. {title}',
    watchOpen: 'how it started',
    watchClose: 'how it ended',
    kept: 'kept in the box',
    week: 'week {n}',
    /* the standing reminder: what to do next once the guide has nothing to say (or its strip was put away) */
    nextFrom: 'next',
    nxPhone: '{n} {things} on the phone {need} an answer{by}. Pick up the phone.',
    nxBy: ', the soonest by {day}',
    nxThing: 'thing', nxThings: 'things',
    nxRoom: 'Your {date} show needs a room. Open its card and ask one.',
    nxBill: 'Your {date} show needs bands on the bill. Open its card.',
    nxConfirm: 'Your {date} show at {room} isn\'t confirmed yet. Open its card and see what the room wants.',
    nxFlyer: 'Make the flyer for your {date} show at {room}.',
    nxJob: 'Your {date} show: {job}, {hours}, due {due}. Open its card.',
    nxJobAny: 'Your {date} show: {job}, {hours}. Open its card.',
    nxNoFit: 'Nothing fits tonight. Call it a night.',
    nxWaitRoom: 'Waiting on {room} to answer. Call it a night.',
    nxWaitBands: 'Waiting on the bands. Call it a night.',
    nxTonight: 'Your show is tonight at {room}. Press GO TO THE SHOW on the clock, then open the doors.',
    nxReady: 'Your {date} show at {room} is set. Get the word out, or call it a night.',
    nxBook: 'Nothing on the books. Say yes to a band that has written you for a night, or start a show of your own on a date you pick.',
    nxNight: 'Nothing left for the show tonight. Open TONIGHT on the desk if you want to do something with the rest of the night, or call it a night on the clock.',
    nxWeekDone: 'The week\'s done. Close the week on the clock.',
    nxAnswer: 'Answer the message on the phone.',
    coachFlyerDesk: 'Shuffle the layout, type, ink and picture until you like it, then press Use this flyer.',
    coachNameSheet: 'Type a name, or take one of the ideas. Pick the lettering you like, then press the button under it.',
    coachInbox: 'Press the button under their message that says the date works. That starts the show.',
    wbHead: 'Welcome back', wbNight: 'It is {dow} night, week {n}.', wbSaved: 'Saved {ago}.', wbNoShows: 'No show is booked yet.', wbNoRoom: 'no room yet',
    wbTonight: 'tonight', wbTomorrow: 'tomorrow', wbDays: '{n} days out', wbDone: 'Done: {list}.', wbTodo: 'Still to do: {list}.', wbNext: 'Next:', wbGo: 'back to it',
    wbRoom: 'room', wbBands: 'bands ({yes} of {n} yes)', wbBandsNone: 'bands', wbSound: 'sound', wbFlyer: 'flyer', wbPromo: 'word out ({done} of {n})',
    wbJustNow: 'just now', wbMin1: '1 minute ago', wbMin: '{n} minutes ago', wbHour1: '1 hour ago', wbHour: '{n} hours ago', wbDay1: 'yesterday', wbDay: '{n} days ago',
    nxWeekAsks:'Waiting on you: {n} to answer, the soonest by {day}.',
    nxWeekAsksNoDay: 'Waiting on you: {n} to answer.',
    nxWeekLate: 'Running late: {jobs}. A late job still counts, but it reaches fewer people the longer it waits.',
    nxAnswerHere:'Open the message at the top of the list and answer it.',
    nxShowOn: 'Your show is on tonight. Go to the night screen.',
    nxCalled: 'Night\'s called. Tomorrow opens soon.',
    hrsHalf: 'half an hour', hrsOne: 'an hour', hrsMany: '{n} hours'
  };

  var NUDGE_MS = 75000;
  var busy = false, pumping = false;
  var mem = { step: null, key: null, dismissed: null, nudged: null, timer: null, onPhone: null, why: null };
  var stripEl = null, cardEl = null, cardId = null;

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(key, ctx) { return SB.text.label('ui.story.' + key, ctx); }
  function K() { return SB.DeskKit; }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'SB.UI.story', String(e && e.message)); return fb; } }
  function story() { return SB.Content.story || {}; }
  function doc() { return typeof document !== 'undefined' ? document : null; }
  function route() { return SB.UI.route ? SB.UI.route() : null; }
  function seen(s, key) { return !!(s && s.story && s.story.seen && s.story.seen.indexOf(key) >= 0); }
  function say(path, ctx) { return safe(function () { return !SB.text.off && SB.text.has(path) ? SB.text.line(path, ctx, null) : ''; }, ''); }
  function playingCut() { return !!(SB.Cutscene && SB.Cutscene.playing && SB.Cutscene.playing()); }

  /* ---------------------------------------------------------------- */
  /* cutscenes                                                        */
  /* ---------------------------------------------------------------- */

  function cutscene(key) {
    var c = (story().cutscenes && story().cutscenes[key]) || (story().coach && story().coach[key]), out, k;
    if (!c || !c.frames || !c.frames.length || !SB.Cutscene) return null;
    out = {}; for (k in c) out[k] = c[k];
    out.key = key;
    return out;
  }

  /* play one over whatever is on screen (the player loads the first picture's cut-outs before it shows, the rest behind it) */
  /* the replies the player gave to the questions asked on the way in, as the game has them now (a scene watched again
     shows the one picked as a plain line) */
  function picked(s) {
    var set = (s && s.settings) || {}, t = (s && s.story && s.story.tutorial) || {};
    var how = set.fog === 'OPEN' ? 'EASY' : (set.fog === 'HARD' ? 'DIFFICULT' : 'REALISTIC');
    return { how: how, bills: !!set.bills, fog: set.fog, windows: set.windows, walk: !t.skipped, name: (s && s.player && s.player.bookingName) || '', band: (s && s.player && s.player.band) ? true : null };
  }
  /* What the played show really was, as flags a recap line can ask about (fix-list 2.4): short (somebody was not paid in
   * full), none (nobody came), flyered, floor (the band was put up), bills (the money is real). Reads only. */
  function afterFlags(s) {
    var best = null, k, x, st, night, out = { short: false, none: false, flyered: false, floor: false, bills: !!(s && s.settings && s.settings.bills) };
    for (k in ((s && s.shows) || {})) {
      x = s.shows[k];
      if (x && x.status === 'PLAYED' && (!x.by || x.by === 'player') && (!best || x.day > best.day)) best = x;
    }
    if (!best) return out;
    night = best.night || {}; st = night.settled || {};
    /* a played show keeps its night in show.result; a night still running keeps it in show.night */
    out.short = !!(st.short || (best.result && best.result.short));
    out.none = !!((night.outcome && night.outcome.heads === 0) || (best.result && best.result.heads === 0));
    out.flyered = !!(best.promo && best.promo.flyer);
    out.floor = !!((best.crew && best.crew.lodging) || (best.deal && best.deal.lodging));
    return out;
  }
  function withFlags(s, slots) { var f = afterFlags(s), k; for (k in f) if (slots[k] === undefined) slots[k] = f[k]; return slots; }

  function run(s, key, done) {
    var cs = cutscene(key), slots;
    if (!cs) { done({ key: key, skipped: true }); return false; }
    slots = withFlags(s, safe(function () { return SB.Chapters.slots(s, /^TUT_/.test(key) ? 'tutorial' : key); }, {}) || {});
    try { SB.Cutscene.play(cs, slots, done, { answers: picked(s), seen: seen(s, key) }); }
    catch (e) { SB.log('warn', 'SB.UI.story', 'cutscene ' + key + ': ' + (e && e.message)); done({ key: key, skipped: true }); return false; }
    return true;
  }

  function afterSeen(s, key) {
    SB.Chapters.markSeen(s, key);
    SB.Chapters.check(s);          // one chapter's cutscene being seen can close it and open the next
    SB.Patches.check(s);
    return { ok: true };
  }

  /* the guided first show: the outgoing booker's call for what the guide asks right now (content story.coach,
   * 'TUT_' + step + '_' + stage, else 'TUT_' + step), once each. -> { key } or null */
  /* Only the first step's call and the door's play as cutscenes with a DONE (fix list 1.19: about 35 taps and 7
   * cutscenes passed before the first yes); every other step is its one stage line on the strip (spec 14). */
  var COACH_SCENES = { TUT_ANSWER_REPLY: 1, TUT_DOOR: 1 };
  function coachKey(cur) {
    var key;
    if (!cur || !cur.step) return null;
    key = 'TUT_' + cur.step + (cur.stage ? '_' + cur.stage : '');
    if (!(story().coach && story().coach[key])) key = 'TUT_' + cur.step;
    return story().coach && story().coach[key] ? key : null;
  }
  function coachNext(s) {
    var cur = safe(function () { return SB.Tutorial.current(s); }, null), key = coachKey(cur);
    return key && COACH_SCENES[key] && !seen(s, key) ? { key: key } : null;
  }
  /* the show's own night, before the doors open: the one call that belongs there (the show day goes straight to the
   * night screen, where nothing else plays) */
  function doorCall(s) {
    var n = coachNext(s), cur = safe(function () { return SB.Tutorial.current(s); }, null);
    return n && n.key === 'TUT_DOOR' && cur && cur.stage !== 'DOOR' ? n : null;
  }

  /* -> true when a cutscene is now on screen. nightOnly: on the night screen, only the call before the doors open */
  function playNext(s, nightOnly) {
    var n, guard = 0;
    while (guard++ < 40) {
      n = nightOnly ? doorCall(s) : (SB.Chapters.nextCutscene(s) || coachNext(s));
      if (!n) return false;
      if (cutscene(n.key)) break;
      SB.Chapters.markSeen(s, n.key);                      // no words for it: off the queue, nothing to show
    }
    if (!n || guard >= 40) return false;
    /* the setup is asked back at the desk, never over the week's close-out (or in the moment before it comes up);
       what is queued behind it waits with it */
    if (n.key === SETUP_KEY && (route() === 'close' || (s.clock && s.clock.phase === 'CLOSE'))) return false;
    busy = true;
    if (SB.UI.playing && SB.UI.playing()) SB.UI.fire('sb-play', { cmd: 'pause' });
    hideStrip();
    /* The setup asked after the first show (spec 14) is at the front of the queue once that show is settled, and the
       recap card goes in front of it: the card, one press, then the scene. Both are marked together when the scene
       closes, so a game left in between gets the card again. */
    if (n.key === SETUP_KEY) {
      recapCard(s, function (shown) {
        setupScene(s, function (r) {
          busy = false;
          function seenIt(st) {
            applySetup(st, (r && r.answers) || {});
            if (shown) SB.Chapters.markSeen(st, RECAP_SEEN);
            return afterSeen(st, n.key);
          }
          if (SB.UI.game() === s) SB.UI.act(seenIt); else seenIt(s);
        });
      });
      return true;
    }
    run(s, n.key, function () {
      busy = false;
      if (SB.UI.game() === s) SB.UI.act(function (st) { return afterSeen(st, n.key); });
      else afterSeen(s, n.key);
    });
    return true;
  }

  /* ---------------------------------------------------------------- */
  /* the recap card after the guided show (spec 14)                    */
  /* ---------------------------------------------------------------- */

  /* One card from the outgoing booker when the guided show is settled: how many came, the door total, who got paid
   * what as a column (the room and sound, each band by name, you), one line on what went well, and the night's
   * real-life lesson. It reads the played show's stored result (result.accounts, the shape of Money.showAccounts);
   * the words are story.tutorial.recap. Seen once (RECAP_SEEN in story.seen); a game that has had it does not also
   * get the old wrap-up texts (messages(), TUTORIAL_DONE). */
  var RECAP_SEEN = 'TUTORIAL_RECAP';
  /* -> { heads, paid, door, rows: [{ who, amount, you }], lesson } or null when there is no guided show to tell about */
  function recapOf(s) {
    var t = (s && s.story && s.story.tutorial) || {}, sh = t.showId && s.shows ? s.shows[t.showId] : null, r = sh && sh.result, acc, rows = [], tour = null, paidTo = {}, I, T, key, p, lesson = '', door, out = 0;
    if (!sh || sh.status !== 'PLAYED' || !r || t.skipped || t.lapsed) return null;
    function n(v) { return typeof v === 'number' && isFinite(v) ? v : 0; }
    function name(id) { var b = id && s.bands ? s.bands[id] : null; return b ? b.name : ''; }
    acc = r.accounts || {};
    (acc.offTop || []).forEach(function (x) { if (x && x.label) rows.push({ who: String(x.label).charAt(0).toUpperCase() + String(x.label).slice(1), amount: n(x.amount) }); });
    (acc.locals || []).forEach(function (x) { if (x && x.bandId) paidTo[x.bandId] = n(paidTo[x.bandId]) + n(x.amount); });
    ((sh.bill && sh.bill.slots) || []).forEach(function (x) { if (x && x.role === 'TOURING' && !tour) tour = x.bandId; });
    if (tour && name(tour)) rows.push({ who: name(tour), amount: n(acc.guarantee) + n(acc.touringShare) });
    ((sh.bill && sh.bill.slots) || []).forEach(function (x) { if (x && x.bandId && x.bandId !== tour && name(x.bandId)) rows.push({ who: name(x.bandId), amount: n(paidTo[x.bandId]) }); });
    /* your line is what was left of the door once everybody else had theirs, so the column adds up to the door (under
       zero when you made up a gap out of your own pocket) */
    door = n(typeof acc.door === 'number' ? acc.door : (r.door ? n(r.door.gross) + n(r.door.hat) : 0));
    rows.forEach(function (x) { out += x.amount; });
    rows.push({ who: say('story.tutorial.recap.you', {}) || 'You', amount: door - out, you: true });
    /* the night's own lesson, the first it picked; else how the gap was covered; else the card's own */
    I = r.irl || {}; T = (SB.Content && SB.Content.irl) || {};
    key = (I.lessons && I.lessons[0]) || I.settle || '';
    p = String(key).split(':');
    if (p[0] === 'cause' && T.cause && T.cause[p[1]]) lesson = T.cause[p[1]].line || '';
    else if (p[0] === 'job' && SB.Content.jobs && SB.Content.jobs[p[1]]) lesson = SB.Content.jobs[p[1]].why || '';
    else if (p[0] === 'settle' && T.settle && T.settle[p[1]]) lesson = T.settle[p[1]].line || '';
    return { heads: n(r.heads), paid: n(r.paid), door: door, rows: rows, lesson: lesson };
  }
  function recapDue(s) { return !seen(s, RECAP_SEEN) && !!safe(function () { return recapOf(s); }, null); }
  /* recapCard(s, done): the card over the desk; done(true) from its one button, done(false) at once when there is
   * nothing to show (no guided show was played, or it was read already) */
  function recapCard(s, done) {
    var m = recapDue(s) ? safe(function () { return recapOf(s); }, null) : null, Kt = SB.UI.Kit, base = 'story.tutorial.recap.', sl, kids, close = null, irl, went = false;
    if (!m || !SB.UI.card || !say(base + 'title', {})) { done(false); return false; }
    function $(v) { return SB.text.money(v); }
    function go() { if (went) return; went = true; if (close) close(); done(true); }
    sl = withFlags(s, safe(function () { return SB.Chapters.slots(s, 'tutorial'); }, {}) || {});
    sl.heads = m.heads; sl.paid = m.paid; sl.door = $(m.door); sl.none = m.heads === 0; sl.all = m.heads > 0 && m.paid >= m.heads;
    irl = SB.UI.parts && SB.UI.parts.irl ? safe(function () { return SB.UI.parts.irl(m.lesson || say(base + 'lesson', sl)); }, null) : null;
    kids = [
      Kt && Kt.label ? safe(function () { return Kt.label(say(base + 'from', sl), null, { cls: 'sy-recap-from', rot: -1.5 }); }, null) : h('p', { class: 'sy-recap-from', text: say(base + 'from', sl) }),
      h('h2', { class: 'sy-recap-head', text: say(base + 'title', sl) }),
      h('p', { class: 'sy-recap-line', text: say(base + 'came', sl) + ' ' + say(base + 'door', sl) }),
      h('p', { class: 'sy-recap-h', text: say(base + 'paid', sl) }),
      h('ul', { class: 'sy-recap-pay' }, m.rows.map(function (x) {
        return h('li', { class: 'sy-recap-row' + (x.you ? ' is-you' : '') }, [h('span', { class: 'sy-recap-who', text: x.who }), h('span', { class: 'sy-recap-amt', text: $(x.amount) })]);
      })),
      h('p', { class: 'sy-recap-good', text: say(base + 'good', sl) }),
      irl,
      Kt && Kt.button ? safe(function () { return Kt.button({ kind: 'primary', label: say(base + 'go', sl) || 'Okay', fk: 'recap-go', cls: 'sy-recap-go', on: go }); }, null)
                      : h('button', { type: 'button', class: 'sy-recap-go', data: { fk: 'recap-go' }, text: say(base + 'go', sl) || 'Okay', on: { click: go } })
    ];
    try { close = SB.UI.card(h('div', { class: 'sy-recap', data: { fk: 'recap' } }, kids), { label: say(base + 'title', sl), dismiss: false }); }
    catch (e) { SB.log('warn', 'SB.UI.story', 'recap: ' + (e && e.message)); done(false); return false; }
    return true;
  }

  /* ---------------------------------------------------------------- */
  /* the setup, asked after the first show (spec 14)                   */
  /* ---------------------------------------------------------------- */

  /* GOING_AWAY_setup at the desk: how to keep going, the day job, your band. It plays in ask mode on the game being
   * played, and the replies go in through the engine (applySetup). The same frames are asked inside the opening of
   * somebody who has booked before (openingAsk, o.setup). */
  var SETUP_KEY = 'GOING_AWAY_setup';
  /* the one "how" question -> the two settings it stands for (js/ui/screens/start.js keeps the same table for a new game) */
  function howTable() { return SB.UI.setupHow || {}; }
  function setupScene(s, done) {
    var cs = cutscene(SETUP_KEY), slots, bills = !!(s && s.settings && s.settings.bills), W, nm, ask, nameDraft, lettering = null;
    if (!cs) { done({ key: SETUP_KEY, skipped: true, answers: {} }); return false; }
    slots = withFlags(s, safe(function () { return SB.Chapters.slots(s, SETUP_KEY); }, {}) || {});
    /* `after` (a show was played) or `cold` (none was: skipped before it, or it fell through) come queued with the
       scene (SB.Chapters setupCheck); an older save's entry has neither and plays as after the show, as it always did */
    if (typeof slots.after !== 'boolean' && typeof slots.cold !== 'boolean') slots.after = true;
    if (slots.after) slots.cold = false;
    /* the tick box starts where the game is: the first show was played with the day job on */
    cs.frames = cs.frames.map(function (f) {
      var g, k;
      if (!f.ask || !f.ask.toggle) return f;
      g = {}; for (k in f) g[k] = f[k];
      g.ask = {}; for (k in f.ask) g.ask[k] = f.ask[k];
      g.ask.toggle = {}; for (k in f.ask.toggle) g.ask.toggle[k] = f.ask.toggle[k];
      g.ask.toggle.def = bills;
      return g;
    });
    /* no name on the flyers yet (a helper made the flyer, or the flyer desk was never opened): the name is asked
       here, in front of how to keep going (GOING_AWAY_name), so no later line reads with a hole where it goes */
    W = SB.UI.setupWidgets || null;
    nm = s && s.player && s.player.bookingName === '' && W && W.name ? cutscene('GOING_AWAY_name') : null;
    if (nm) {
      ask = nm.frames.filter(function (f) { return f && f.ask && f.ask.id === 'name'; });
      cs.frames = ask.concat(cs.frames);
      nameDraft = { bookingName: '', mark: s.player.mark ? JSON.parse(JSON.stringify(s.player.mark)) : null, markSeeds: null, flyerBase: null, slug: s.citySlug, spec: null };
      W = { name: function (box, ctx) { return SB.UI.setupWidgets.name(box, { draft: nameDraft, answer: function (name, mark) { lettering = mark && mark.treatment ? mark.treatment : null; ctx.answer(name); } }); },
            band: SB.UI.setupWidgets.band };
    }
    function end(r) { if (r && r.answers && lettering) r.answers.lettering = lettering; done(r); }
    try { SB.Cutscene.play(cs, slots, end, { ask: true, widgets: W, onAnswer: function (id, v, sl) { if (id === 'name') sl.bookingName = v; } }); }
    catch (e) { SB.log('warn', 'SB.UI.story', 'setup: ' + (e && e.message)); done({ key: SETUP_KEY, skipped: true, answers: {} }); return false; }
    return true;
  }
  /* the replies, into the game: how much you can see and how strict the deadlines are at once; the day job from the
     next week's turn (SB.Game.setSetting keeps it till then); your band onto the bill list. A question that was not
     answered changes nothing. */
  function applySetup(st, a) {
    var h = a && howTable()[a.how];
    if (!a) return;
    if (h) {
      safe(function () { return SB.Game.setSetting(st, 'fog', h.fog); });
      safe(function () { return SB.Game.setSetting(st, 'windows', h.windows); });
    }
    if (typeof a.bills === 'boolean') safe(function () { return SB.Game.setSetting(st, 'bills', a.bills); });
    /* the booking name, when it was asked here (no name yet): the name and the lettering picked with it */
    if (typeof a.name === 'string' && a.name.trim() && st.player && st.player.bookingName === '' && SB.Game.setBookingName)
      safe(function () { return SB.Game.setBookingName(st, a.name, a.lettering ? { treatment: a.lettering } : null); });
    if (a.band && a.band.name && !(st.player && st.player.band)) safe(function () { return SB.Bands.addPlayerBand(st, a.band); });
  }

  /** opening(st, cb): a new career. GOING_AWAY_open plays before the desk appears; cb() sits the player down. */
  function opening(st, cb) {
    var n = safe(function () { return SB.Chapters.nextCutscene(st); }, null);
    if (!n || n.key !== 'GOING_AWAY_open' || !cutscene(n.key) || busy) { cb(); return; }
    busy = true;
    run(st, n.key, function () {
      busy = false;
      safe(function () { return afterSeen(st, n.key); });
      cb();
    });
  }

  /** openingAsk(draft, o, make, cb): the way in. GOING_AWAY_open plays on a first draft of the new game (so the scene
   *  has its town, room and bands) and asks nothing; with o.setup (booked before) it asks the booking name
   *  (GOING_AWAY_name) and GOING_AWAY_setup's questions (how to play, the day job, your band). Then make(answers, bill) builds the real game from the replies (bill:
   *  the going-away bands as watched, for SB.Game.newGame's goingAway), the scene is marked seen on it and cb(state)
   *  sits the player down; cb(null) if it could not be made. o: { widgets: { name: fn(box, ctx) }, back: { label, on } }:
   *  back closes the scene and nothing is made. */
  function openingAsk(draft, o, make, cb) {
    var key = 'GOING_AWAY_open', cs = cutscene(key), slots, bill, su, fr, nm;
    o = o || {};
    if (!cs || busy) { cb(null); return false; }
    /* o.setup (somebody who has booked before, spec 14): the setup's questions are asked here, right after the name,
       before the game is made. Its goodbye frame is left out: the opening has its own. */
    su = o.setup ? cutscene(SETUP_KEY) : null;
    if (su) {
      /* the name first (GOING_AWAY_name), then the setup's asks, all in front of the opening's last frame. A
         first-timer's opening asks nothing: the name is asked at the first flyer (the flyer desk's name sheet). */
      nm = cutscene('GOING_AWAY_name');
      fr = cs.frames.slice(0, -1);
      if (nm) nm.frames.forEach(function (g) { fr.push(g); });
      su.frames.forEach(function (g) { if (g && g.ask) fr.push(g); });
      fr.push(cs.frames[cs.frames.length - 1]);
      cs.frames = fr;
    }
    slots = safe(function () { return SB.Chapters.slots(draft, key); }, {}) || {};
    bill = { band1: slots.band1, band2: slots.band2, band2Home: slots.band2Home, band3: slots.band3 };
    busy = true;
    try {
      SB.Cutscene.play(cs, slots, function (r) {
        var st;
        busy = false;
        st = safe(function () { return make((r && r.answers) || {}, bill); }, null);
        if (st) safe(function () { return afterSeen(st, key); });
        cb(st || null);
      }, {
        ask: true, widgets: o.widgets || null,
        back: o.back ? { label: o.back.label, on: function () { busy = false; if (o.back.on) o.back.on(); } } : null,
        onAnswer: function (id, v, sl) { if (id === 'name') sl.bookingName = v; }
      });
    } catch (e) { busy = false; SB.log('warn', 'SB.UI.story', 'opening: ' + (e && e.message)); cb(null); return false; }
    return true;
  }

  function rewatch(key) {
    var s = SB.UI.game();
    if (!s || busy || playingCut()) return;
    busy = true;
    run(s, key, function () { busy = false; });
  }

  /* ---------------------------------------------------------------- */
  /* the walkthrough: what the outgoing booker is saying now           */
  /* ---------------------------------------------------------------- */

  /* the first new thing on the desk nobody has said a word about yet (fix list 4.8), one at a time -> { id, text } or null */
  var DESK_ORDER = ['notebook', 'stickers', 'keys', 'tin', 'mug', 'map', 'book', 'flyers', 'jacket'];
  function newOnDesk(s, sl) {
    var i, id, tx;
    if (!SB.Rungs || !SB.Rungs.isNew) return null;
    for (i = 0; i < DESK_ORDER.length; i++) {
      id = DESK_ORDER[i];
      if (!safe(function () { return SB.Rungs.isNew(s, id); }, false) || seen(s, 'DESKNEW_' + id)) continue;
      tx = say('story.deskNew.' + id, sl);
      if (tx) return { id: id, text: tx };
    }
    return null;
  }

  /* -> { key, from, list: [{ text, kind }], why: the longer why-it-works or '', once: seen-key or null } or null.
   * While the walkthrough is on, the list is ONE line (spec 14, "Text budget"): a wrong bill's correction, else the
   * nudge, else the stage's own line. The step's text (after a wrong from the step before) is `why`, with `where`, the
   * map of the whole show, under it: one press away on that line, never pushed. */
  function messages(s) {
    var t = s && s.story && s.story.tutorial, cur, sl, base, line = null, why = [], steps, i, prev, tx, day, lk, idle, where;
    if (!t) return null;
    cur = safe(function () { return SB.Tutorial.current(s); }, null);
    sl = withFlags(s, safe(function () { return SB.Chapters.slots(s, 'tutorial'); }, {}) || {});
    /* the clock lesson (spec 14, night 1): one line and nothing stacked on it, with a GOT IT on the strip (m.ok) */
    if (cur && cur.stage === 'CLOCK' && cur.more) return { key: cur.step + ':CLOCK', step: cur.step, cur: cur, from: sl.outgoing || '', list: [{ text: cur.more, kind: 'how' }], why: '', once: null, ok: 'CLOCK' };
    if (cur) {
      steps = SB.Tutorial.STEPS; i = steps.indexOf(cur.step); prev = i > 0 ? steps[i - 1] : null;
      base = 'story.tutorial.steps.';
      if (prev && t.wrong && t.wrong[prev]) { tx = say(base + prev + '.wrong', sl); if (tx) why.push(tx); }
      tx = cur.text || say(base + cur.step + '.text', sl);
      if (tx) why.push(tx);
      /* the interface's own nudges (a minute idle, or the same line a second night) are about something to do: never
         on a stage that waits on someone else, where the line already says to call it a night */
      idle = cur.target !== 'lamp';
      if (cur.wrong) { tx = say(base + cur.step + '.wrong', sl) || cur.wrong; if (tx) line = { text: tx, kind: 'wrong' }; }
      /* the wait's nudge is about mail: once the phone is answered it goes, even if it was shown before (engine decides) */
      if (!line && (cur.nudge || (idle && mem.nudged === cur.step && cur.step !== 'WAIT'))) { tx = say(base + cur.step + '.nudge', sl) || cur.nudge; if (tx) line = { text: tx, kind: 'nudge' }; }
      /* the same line is never said on two nights in a row: the second night it is the nudge, in its own words (fix-list 1.13) */
      day = s.clock && typeof s.clock.day === 'number' ? s.clock.day : 0;
      lk = cur.step + ':' + (cur.stage || '');
      if (!mem.line || mem.line.key !== lk) mem.line = { key: lk, day: day, said: false };
      /* not on the wait: its nudge is about mail, and only the engine knows when mail is waiting (0.4 step 4) */
      else if (!line && idle && day > mem.line.day && cur.step !== 'WAIT') {
        tx = say(base + cur.step + '.nudge', sl) || cur.nudge;
        if (tx) line = { text: tx, kind: 'nudge' };
      }
      if (!line && cur.more) line = { text: cur.more, kind: 'how' };
      if (!line && why.length) line = { text: why.shift(), kind: 'text' };
      where = say('story.tutorial.where.' + cur.step, sl);
      return line ? { key: cur.step + (cur.stage ? ':' + cur.stage : ''), step: cur.step, cur: cur, from: sl.outgoing || '', list: [line], why: why.join(' '), where: where, once: null } : null;
    }
    if (t.skipped && !seen(s, 'TUTORIAL_SKIP')) { tx = say('story.tutorial.skip.line', sl); return tx ? { key: 'SKIP', from: sl.outgoing || '', list: [{ text: tx, kind: 'text' }], once: 'TUTORIAL_SKIP' } : null; }
    /* the walkthrough ended because its show fell through for good: it never ends silently (fix-list 0.6) */
    if (t.lapsed && !t.skipped && !seen(s, 'TUTORIAL_LAPSED')) { tx = say('story.tutorial.lapsed', sl); if (tx) return { key: 'LAPSED', from: sl.outgoing || '', list: [{ text: tx, kind: 'text' }], once: 'TUTORIAL_LAPSED' }; }
    /* a game that had the recap card and the setup scene's goodbye has heard all of this already (spec 14) */
    if (t.done !== null && t.done !== undefined && !t.skipped && !t.lapsed && !seen(s, 'TUTORIAL_DONE') && !seen(s, RECAP_SEEN)) { tx = say('story.tutorial.done', sl); return tx ? { key: 'DONE', from: sl.outgoing || '', list: [{ text: tx, kind: 'text' }, { text: say('story.tutorial.doneList', sl), kind: 'how' }], once: 'TUTORIAL_DONE' } : null; }
    if (t.on && !(seen(s, RECAP_SEEN) && cur && cur.step === 'CLOSEOUT')) return null;   // the guided show is played and the setup is done: the new desk things get their notes
    tx = newOnDesk(s, sl);
    if (tx) return { key: 'DESKNEW:' + tx.id, from: sl.outgoing || '', list: [{ text: tx.text, kind: 'text' }], once: 'DESKNEW_' + tx.id };
    tx = firsts(s, sl);
    if (tx) return { key: 'FIRST:' + tx.id, from: sl.outgoing || '', list: [{ text: tx.text, kind: 'text' }], once: tx.id };
    tx = stuck(s);
    if (tx) return { key: 'STUCK:' + tx.key, from: sl.outgoing || '', list: [{ text: tx.text, kind: 'nudge' }], once: null, go: tx.go };
    return null;
  }

  /* ---------------------------------------------------------------- */
  /* after the guided show: a text the first time each hard thing happens */
  /* ---------------------------------------------------------------- */

  var ASK_NO = { BAND_PLAY: 'NO_BAND', TERMS: 'NO_BAND', CREW: 'NO_CREW', ROOM_HOLD: 'NO_ROOM' };
  function nameOf(s, id) {
    var b = s.bands && s.bands[id], r = s.rooms && s.rooms[id], p = s.people && s.people[id];
    if (b) return b.name; if (r) return r.name;
    if (p) return p.nick || ((p.first || '') + (p.last ? ' ' + p.last : '')).trim();
    return '';
  }
  function dateOf(day) { return safe(function () { return SB.time.fmt(day, 'short'); }, ''); }
  /* -> { id: seen-key, text } for the most pressing first not yet seen, else null. Reads only. */
  function firsts(s, sl) {
    var day = s.clock && typeof s.clock.day === 'number' ? s.clock.day : 0, out = null, k, a, sh, id, miss, net, tn, cr, ctx;
    function ctxOf(o) { var c = {}, x; for (x in sl) c[x] = sl[x]; for (x in o) c[x] = o[x]; return c; }
    function offer(key, seenKey, o) {
      var tx;
      if (out || seen(s, seenKey)) return;
      tx = say('story.tutorial.after.' + key, ctxOf(o || {}));
      if (tx) out = { id: seenKey, text: tx };
    }
    /* a show of yours coming up soon with something big still missing (once per show) */
    for (k in (s.shows || {})) {
      sh = s.shows[k];
      if (!sh || (sh.by && sh.by !== 'player') || (sh.status !== 'DRAFT' && sh.status !== 'CONFIRMED') || sh.day < day || sh.day - day > 3) continue;
      miss = !sh.roomId ? 'has no room' : sh.status === 'DRAFT' ? 'isn\'t confirmed' : !(sh.bill && sh.bill.slots && sh.bill.slots.length) ? 'has no bands' : !(sh.promo && sh.promo.flyer) ? 'has no flyer' : '';
      if (miss) offer('LATE', 'HELP_LATE_' + sh.id, { date: dateOf(sh.day), n: safe(function () { return SB.Week.daysTo(s, sh.day); }, sh.day - day), missing: miss });
    }
    /* the first night that lost money */
    for (k in (s.shows || {})) {
      sh = s.shows[k];
      net = sh && sh.night && sh.night.settled ? sh.night.settled.playerNet : null;
      if (typeof net === 'number' && net < 0) { offer('LOSS', 'HELP_LOSS', { amount: SB.text.money ? SB.text.money(-net) : '$' + (-net), date: dateOf(sh.day) }); break; }
    }
    /* the first no, counter and silence on something the player asked for, answered in the last few days */
    for (k in (s.asks || {})) {
      a = s.asks[k];
      if (!a || !ASK_NO[a.kind] || !a.answer || typeof a.answer.day !== 'number' || a.answer.day < day - 3) continue;
      if (a.status === 'NO') { id = ASK_NO[a.kind]; offer(id, 'HELP_' + id, { name: nameOf(s, a.toId) || 'They' }); }
      else if (a.status === 'COUNTER') offer('COUNTER', 'HELP_COUNTER', { name: nameOf(s, a.toId) || 'They' });
      else if (a.status === 'SILENT') offer('SILENT', 'HELP_SILENT', { name: nameOf(s, a.toId) || 'They' });
    }
    /* second in line for a room */
    for (k in (s.shows || {})) {
      sh = s.shows[k];
      if (sh && (!sh.by || sh.by === 'player') && sh.status === 'DRAFT' && sh.hold && typeof sh.hold.rank === 'number' && sh.hold.rank > 1) {
        offer('SECOND', 'HELP_SECOND', { room: nameOf(s, sh.roomId) || 'the room' }); break;
      }
    }
    cr = safe(function () { return SB.Week.crunch ? SB.Week.crunch(s) : []; }, []) || [];
    if (cr.length) offer('CRUNCH', 'HELP_CRUNCH', {});
    tn = safe(function () { return SB.Week.tonight(s); }, null);
    if (tn && tn.open && typeof tn.left === 'number' && tn.left <= 0 && !(tn.stay && tn.stay.left > 0)) offer('NO_HOURS', 'HELP_NO_HOURS', {});
    return out;
  }

  /* the standing reminder has said the same thing for two nights running: the outgoing booker says it, with a way out.
   * UI memory only: the night the reminder first said it. -> { key, text, go } or null */
  function stuck(s) {
    var day = s.clock && typeof s.clock.day === 'number' ? s.clock.day : 0, r = safe(function () { return reminder(s); }, null), tx;
    if (!r || !r.go || r.idle) { mem.stuck = null; return null; }
    if (!mem.stuck || mem.stuck.key !== r.key) { mem.stuck = { key: r.key, day: day }; return null; }
    if (day - mem.stuck.day < 2) return null;
    tx = say('story.tutorial.after.STUCK', { next: r.list[0].text });
    return tx ? { key: r.key, text: tx, go: r.go } : null;
  }

  /* the standing reminder: one line on what to do next, read off the game, whenever the walkthrough is quiet.
   * -> a strip message like messages(), plus go: [route, params] for the desk's button, and no put-away */
  var JOB_OPEN = { OPEN: true, CLOSING: true, LATE: true }, JOB_NOT = { RUN_SHOW: true, THANKS: true };
  function hrs(n) {
    var whole = Math.floor((n || 0) + 0.01), half = (n || 0) - whole > 0.25;
    if (!whole && half) return L('hrsHalf');
    if (whole === 1 && !half) return L('hrsOne');
    return L('hrsMany', { n: whole + (half ? '½' : '') });
  }
  /* an ask of one of these kinds about this show, sent and not answered yet */
  function askOut(s, kinds, showId) {
    var k, a;
    for (k in (s.asks || {})) {
      a = s.asks[k];
      if (!a || !kinds[a.kind] || (a.status !== 'QUEUED' && a.status !== 'SENT')) continue;
      if (a.showId === showId || (a.payload && a.payload.showId === showId)) return a;
    }
    return null;
  }
  /* the evening is not open: why, as a line -> { t, go } */
  function closedLine(tn) {
    var st = tn.stop;
    if (st === 'END_OF_WEEK') return { t: L('nxWeekDone'), go: null };
    if (st === 'REPLY') return { t: L('nxAnswer'), go: ['inbox'] };
    if (st === 'DECISION') return { t: L('nxAnswer'), go: null };
    if (st === 'SHOW_NIGHT' || st === 'SETTLE') return { t: L('nxShowOn'), go: null };
    return { t: L('nxCalled'), go: null };
  }
  /* the next thing for one show -> { t, go, act (something the player can do now), idle } */
  function showLine(s, sh, tn, day) {
    var v = safe(function () { return SB.Shows.view(s, sh.id); }, null), room = v && v.room ? (v.room.name || '') : '',
        date = safe(function () { return SB.time.fmt(sh.day, 'short'); }, ''), go = ['show', { showId: sh.id }],
        slots = (sh.bill && sh.bill.slots) || [], yes, a, jobs, fit, noHours;
    function wait(key, ctx) { return { t: L(key, ctx), go: null, act: false, idle: true }; }
    /* the line is the button: it opens the card at the row where the thing is done (fix-list 0.4) */
    function act(key, ctx, row) { return { t: L(key, ctx), go: row ? ['show', { showId: sh.id, row: row }] : go, act: true }; }
    if (sh.status === 'CONFIRMED' && sh.day === day) return { t: L('nxTonight', { room: room || 'the room' }), go: null, act: true, idle: true };
    if (!sh.roomId || sh.status === 'DRAFT') {
      a = askOut(s, { ROOM_HOLD: true, ROOM_CONFIRM: true }, sh.id);
      if (a && (!sh.roomId || slots.length)) return wait('nxWaitRoom', { room: nameOf(s, a.toId) || room || 'the room' });
      if (!sh.roomId) return act('nxRoom', { date: date }, 'room');
    }
    yes = !!(sh.bill && sh.bill.locked) || slots.some(function (x) { return x.confirmed; });
    if (!slots.length || (sh.status === 'CONFIRMED' && !yes)) {
      if (askOut(s, { BAND_PLAY: true }, sh.id)) return wait('nxWaitBands');
      return act('nxBill', { date: date }, 'bill');
    }
    if (sh.status === 'DRAFT') return act('nxConfirm', { date: date, room: room }, 'room');
    if (!(sh.promo && sh.promo.flyer)) return act('nxFlyer', { date: date, room: room }, 'flyer');
    /* jobs open now, soonest due first, then shortest; one that fits tonight first */
    jobs = (v && v.jobs ? v.jobs : []).filter(function (j) {
      return j.status === 'TODO' && !j.optional && !j.hidden && !j.more && !j.covered && !JOB_NOT[j.type] && j.window && JOB_OPEN[j.window.state];
    }).sort(function (x, y) {
      return ((x.due == null ? 1e9 : x.due) - (y.due == null ? 1e9 : y.due)) || ((x.hours || 0) - (y.hours || 0));
    });
    if (jobs.length) {
      noHours = !!tn && typeof tn.left === 'number' && tn.left <= 0 && !(tn.stay && tn.stay.left > 0);
      /* only a job with hours that can be done tonight: AUTO and PROMISE jobs have no button, and a MESSAGE job is named
         only when it is not already out or answered (fix-list 0.4) */
      fit = noHours ? null : jobs.filter(function (j) {
        var r = null;
        if (j.mode !== 'HOURS') return false;
        if (!SB.Week.canDoNow) return true;
        r = safe(function () { return SB.Week.canDoNow(s, j.id); }, null);
        return !!r && r.ok !== false;
      })[0];
      if (!fit) return wait('nxNoFit');
      return act(fit.due == null ? 'nxJobAny' : 'nxJob', { date: date, job: String(fit.label || '').toLowerCase(), hours: hrs(fit.hours),
                                                         due: fit.due == null ? '' : safe(function () { return SB.time.fmt(fit.due, 'short'); }, '') },
                 fit.group === 'TELLING' ? 'promo' : 'prep');
    }
    return { t: L('nxReady', { date: date, room: room }), go: go, act: false, idle: true };
  }

  /* "Open: 2 messages to answer, the soonest by Thu. Late: print flyers." The open asks with their answer-by dates, and the jobs
   * already past their day; '' when there is nothing to say. Said only when it adds to the reminder: more than one thing, a
   * date, or a late job. */
  function weekLine(s, day, phoneSaid) {
    var needs = safe(function () { return SB.Mail.needsYou(s); }, []) || [], by = null, late = [], k, sh, v, parts = [];
    needs.forEach(function (x) { if (typeof x.by === 'number' && x.by >= day && (by === null || x.by < by)) by = x.by; });
    for (k in (s.shows || {})) {
      sh = s.shows[k];
      if (!sh || (sh.by && sh.by !== 'player') || (sh.status !== 'DRAFT' && sh.status !== 'CONFIRMED') || sh.day < day) continue;
      v = safe(function () { return SB.Shows.view(s, sh.id); }, null);
      ((v && v.jobs) || []).forEach(function (j) {
        if (j.status === 'TODO' && !j.optional && !j.hidden && !j.more && !j.covered && j.mode === 'HOURS' && j.window && j.window.state === 'LATE' && late.length < 2) late.push(String(j.label || '').toLowerCase());
      });
    }
    if (!phoneSaid && (needs.length > 1 || (needs.length && by !== null))) parts.push(by !== null ? L('nxWeekAsks', { n: needs.length, day: SB.time.fmt(by, 'dow') }) : L('nxWeekAsksNoDay', { n: needs.length }));
    if (late.length) parts.push(L('nxWeekLate', { jobs: late.join(', ') }));
    return parts.join(' ');
  }

  /* the standing reminder: one line on what to do next, read off the game, whenever the walkthrough is quiet. Never
   * empty (the owner's rule): a closed evening, a wait and a show night each say what to do.
   * -> a strip message like messages(), plus go: [route, params] for the desk's button, and no put-away */
  function reminder(s) {
    var tn = safe(function () { return SB.Week.tonight(s); }, null), day = s.clock && typeof s.clock.day === 'number' ? s.clock.day : 0,
        n = safe(function () { return SB.Mail.needsYou(s).length; }, 0), shows, t, go = ['inbox'], pick = null, first = null, i, x, idle = false;
    if (tn && !tn.open) { x = closedLine(tn); t = x.t; go = x.go; idle = true; }
    else if (n) t = L('nxPhone', { n: n, things: L(n === 1 ? 'nxThing' : 'nxThings'), need: n === 1 ? 'needs' : 'need',
                                    by: safe(function () { var q = SB.Mail.needsYou(s)[0]; return q && typeof q.by === 'number' && q.by >= day ? L('nxBy', { day: SB.time.fmt(q.by, 'dow') }) : ''; }, '') });
    else {
      shows = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'], fromDay: day }); }, []) || [];
      shows = shows.filter(function (y) { return !y.by || y.by === 'player'; });
      /* the soonest show with something the player can do now; else the soonest show's wait */
      for (i = 0; i < shows.length && !pick; i++) {
        x = safe(function () { return showLine(s, shows[i], tn, day); }, null);
        if (!x) continue;
        if (!first) first = x;
        if (x.act) pick = x;
      }
      pick = pick || first;
      if (!shows.length) t = L('nxBook');
      else if (pick) { t = pick.t; go = pick.go; idle = !!pick.idle; }
    }
    if (!t) { t = L('nxNight'); go = null; idle = true; }
    /* the week's open things, with their dates, so nothing lapses unseen (fix-list 4.7) */
    x = safe(function () { return weekLine(s, day, !!n); }, '');
    if (x && !(tn && !tn.open)) t += ' ' + x;
    return { key: 'NEXT:' + t, from: L('nextFrom'), list: [{ text: t, kind: 'next' }], once: null, go: go, fixed: true, idle: idle };
  }

  /** phone(state): the texts, for the top of the inbox's list; null when there is nothing to say. */
  function phone(s) {
    var m = messages(s);
    if (!m) return null;
    if (m.once) mem.onPhone = m.once;
    return h('div', { class: 'sy-dana', role: 'log', aria: { label: L('texts', { outgoing: m.from }) } }, [
      h('p', { class: 'sy-dana-from' }, h('span', { class: 'ph-strip', text: String(m.from || '').toUpperCase() })),
      m.list.map(function (x, i) {
        var bub = h('div', { class: 'ph-bub ph-bub--them pz-paper sy-bub sy-bub--' + x.kind }, h('p', { text: x.text }));
        if (i === m.list.length - 1) whyOn(bub, m, x, null);
        return bub;
      })
    ]);
  }

  /* "why?" on the coach line (spec 14, "Text budget"): one press unfolds the step's longer why-it-works and the map of
   * the show in place, under the line; another folds it back. Kept open while the same line stays up (mem.why).
   * where: the element the button goes in, the unfolded words go at its end; after() runs when it changes size. */
  function whyKey(m, x) { return (m && m.key) + '|' + (x && x.text); }
  function whyOn(where, m, x, after) {
    var btn, box = null, k = whyKey(m, x);
    if (!m || !m.cur || !(m.why || m.where)) return null;
    function open(on) {
      if (box && box.parentNode) box.parentNode.removeChild(box);
      box = null;
      if (on) {
        box = h('div', { class: 'sy-why-box' }, [
          m.why ? h('p', { class: 'sy-why-text', text: m.why }) : null,
          m.where ? h('p', { class: 'sy-why-where', text: m.where }) : null
        ]);
        where.appendChild(box);
      }
      mem.why = on ? k : null;
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      btn.textContent = on ? L('whyHide').toLowerCase() : L('why');
      if (where.classList) where.classList.toggle('is-why', !!on);
      if (after) after();
    }
    btn = h('button', { type: 'button', class: 'sy-why pz-hl', data: { fk: 'tut-why' }, aria: { label: L('whyL', { outgoing: m.from || '' }), expanded: 'false' }, text: L('why'),
                        on: { click: function (e) { if (e && e.stopPropagation) e.stopPropagation(); open(!box); } } });
    where.appendChild(btn);
    if (mem.why === k) open(true);
    return btn;
  }

  /* which desk object carries the tape for this step */
  function targetOf(cur) {
    var objs = safe(function () { return SB.Desk.objects(); }, []) || [], ids = {}, t = cur.target, i;
    objs.forEach(function (o) { ids[o.id] = o; });
    if (t === 'night') return null;                      // the night is played from the pinned clock (spot), not a desk thing
    if (t === 'clip') {
      for (i = 0; i < objs.length; i++) if (/^clip\d/.test(objs[i].id) && objs[i].params && objs[i].params.showId === cur.showId) return objs[i].id;
      return ids.clips ? 'clips' : (ids.clip0 ? 'clip0' : (ids.calendar ? 'calendar' : null));
    }
    return ids[t] ? t : null;
  }

  function tapeSvg(seed) {
    var k = K(), r = k && k.rng ? k.rng('sy-tape' + seed) : null, out = '', i, x;
    if (!k) return '';
    out += k.tape(88, 36, 156, 46, { seed: 'sy-tp' + seed, torn: true, op: 0.97 });
    /* the tape's own texture: creases across it and the paper's tooth */
    for (i = 0; i < 9; i++) {
      x = 18 + i * 17 + (r ? r.range(-5, 5) : 0);
      out += '<path d="M' + Math.round(x) + ' 15L' + Math.round(x + (r ? r.range(-3, 3) : 1)) + ' 57" stroke="#000" stroke-opacity="' + (i % 3 ? '.07' : '.13') + '" stroke-width="' + (i % 2 ? 1 : 2) + '"/>';
    }
    out += '<path d="M12 22H164M12 50H164" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>';
    out += k.arrow(34, 40, 142, 33, { seed: 'sy-ar' + seed, stroke: '#141413', sw: 7, head: 20, wob: 5 });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 72" aria-hidden="true" focusable="false">' + out + '</svg>';
  }

  /* ---- where the tape goes ---- */

  function first(root, sels) {
    var i, e;
    if (!root || !root.querySelector) return null;
    for (i = 0; i < sels.length; i++) {
      if (!sels[i]) continue;
      e = safe(function () { return root.querySelector(sels[i]); }, null);
      if (e && !e.disabled) return { el: e, key: sels[i] };
    }
    return null;
  }
  function fk(v) { return '[data-fk="' + v + '"]'; }
  /* a row of the card that is not the open one; a step of the card that is folded */
  function rowSel(key) { return '.cb-card:not([data-sel="' + key + '"]) ' + fk('row-' + key); }
  function stepSel(key) { return '.cb-card:not([data-step="' + key + '"]) ' + fk('step-' + key); }

  /* spot(cur, route): the element to point at now -> { el, key } or null */
  function spot(cur, r) {
    var d = doc(), desk = d && d.getElementById ? d.getElementById('desk') : null, main = d && d.getElementById ? d.getElementById('main') : null,
        t = cur.target, st = cur.stage, id, list = [], down = '.cu-down', wait = t === 'lamp';
    if (!d) return null;
    /* the clock lesson: the pinned night clock itself (its ruler of hours), whatever is on screen */
    if (t === 'clock') {
      /* the clock: its ruler if it is drawn, else the time line (the compact clock over a card has no ruler showing) */
      id = safe(function () {
        var nc = d.getElementById('nightclock'), seen = function (e) { var r = e && e.getBoundingClientRect ? e.getBoundingClientRect() : null; return !!e && (!r || r.width > 0); };
        if (!nc || nc.hidden) return null;
        return [nc.querySelector('.ck-ruler'), nc.querySelector('.ck-top'), nc.querySelector('.ck-slip'), nc].filter(seen)[0] || nc;
      }, null);
      return id ? { el: id, key: 'clock' } : null;
    }
    /* waiting at an evening is CALL IT A NIGHT, on the pinned clock, whatever is on screen (js/ui/nightclock.js) */
    if (wait && d.getElementById) {
      id = safe(function () { var nc = d.getElementById('nightclock'); return nc && !nc.hidden ? nc.querySelector('.ck-call') : null; }, null);
      if (id) return { el: id, key: fk(id.getAttribute('data-fk')) };
    }
    if (r === 'desk') {
      id = targetOf(cur);
      if (!id && t === 'night' && d.getElementById) {           // go play the night: the clock's button does it
        id = safe(function () { var nc = d.getElementById('nightclock'); return nc && !nc.hidden ? nc.querySelector('.ck-call') : null; }, null);
        return id ? { el: id, key: fk(id.getAttribute('data-fk')) } : null;
      }
      return id ? first(desk, ['.dk-hit[data-obj="' + id + '"]']) : null;
    }
    switch (r) {
      case 'inbox':
        /* a band's message has one yes, BOOK IT: it makes the show and opens its card on the room. While the guided
         * show has no card yet, that is the thing to press (whatever the step: an offer needs the show too). */
        if (cur.step === 'ANSWER' || (!cur.showId && t === 'phone')) list.push('[data-tut="req-book"][data-tut-ref="' + cur.requestId + '"]');
        if (t === 'phone') list.push('.ph-row' + fk('c-q:' + cur.requestId), fk('back'));
        break;
      case 'shows': if (t === 'clip') list.push(fk('clip-' + cur.showId)); break;
      case 'show': case 'bill':
        /* the card (js/ui/screens/shows.js) of the guided show. It stands on the row the guide is about, so the thing
         * to press is in the picker; if the player picked another row, the row (or its folded step) comes first.
         * Whatever else: the card's NEXT button says the same thing the guide does, and waiting is CALL IT A NIGHT,
         * here on the card. Nothing on this list is ever a thing that cannot be pressed (first() skips the disabled). */
        if (!main || !main.querySelector || !safe(function () { return main.querySelector('[data-tut="card-foot"][data-tut-ref="' + cur.showId + '"]'); }, null)) break;
        if (wait) break;
        if (t !== 'clip') break;
        if (cur.step === 'HOLD' && st === 'ASK') list.push(fk('hold'), rowSel('room'), stepSel('ROOM'));
        else if (cur.step === 'HOLD') list.push(rowSel('room'), stepSel('ROOM'));                       // held, and the room wants something first
        else if (cur.step === 'BILL' && st === 'OFFER') list.push(fk('send-offer'), rowSel('offer'), stepSel('DEAL'));
        else if (cur.step === 'BILL' && st === 'ORDER') list.push('[data-tut="bill-move"]:not([disabled])', '.cb-cardrow:not(.is-on)[data-tut-ref="band"]', stepSel('BILL'));
        else if (cur.step === 'BILL') list.push('.cb-card[data-sel="slot-' + cur.slot + '"] ' + fk('cand-' + cur.bandId), '.cb-card[data-sel="slot-' + cur.slot + '"] ' + fk('free'), rowSel('slot-' + cur.slot), stepSel('BILL'));
        else if (cur.step === 'SOUND') list.push(fk('cr-sound' + cur.personId), rowSel('sound'), stepSel('CREW'));
        else if (cur.step === 'FLYER') list.push(fk('flyer'), rowSel('flyer'), stepSel('ANNOUNCE'));
        else if (cur.step === 'PROMO' && st === 'PLAN') {
          /* do this job tonight: its DO IT TONIGHT, under the flyer row (the flyer job) or the promo row */
          id = safe(function () { var j = SB.UI.game().jobs[cur.jobId]; return j && j.type === 'MAKE_FLYER' ? 'flyer' : 'promo'; }, 'promo');
          list.push('[data-tut="card-donow"][data-tut-ref="' + cur.jobId + '"]', rowSel(id), stepSel('ANNOUNCE'));
        }
        list.push(fk('next'));
        down = null;
        break;
      /* the name sheet comes first on the flyer desk while there is no booking name (stage NAME): its field, then its button */
      case 'flyerdesk': if (cur.step === 'FLYER') list.push('[data-tut="name-sheet"] [data-fk="name-done"]', '[data-tut="name-sheet"] [data-fk="name-in"]', '[data-tut="flyer-make"]'); break;
      case 'week':
        /* the calendar's pad (the same job can be done from there): its DO IT TONIGHT tab, or the pile it is folded into */
        if (cur.step === 'PROMO' && st === 'PLAN') {
          list.push('[data-tut="do-tonight"][data-tut-ref="' + cur.jobId + '"]',
                    '.cc-pile-top[data-fk="pile-thisWeek"][aria-expanded="false"]', '.cc-pile-top[data-fk="pile-later"][aria-expanded="false"]',
                    '.cc-pile-top[data-fk="pile-soon"][aria-expanded="false"]', '.cc-pile-top[aria-expanded="false"]');
        } else if (wait) list.push(fk('closeweek'));
        break;
      case 'close': if (wait) list.push('.cc-tab--big.is-hot', '.cc-tab--big'); break;
      case 'night':
        if (cur.step === 'CLOSEOUT') list.push(fk('leave'));
        else list.push(fk('open'), '.nt-envelope .nt-tab:not([disabled])', '.nt-tab' + fk('opt-0'), fk('skip'), fk('leave'));
        down = null;
        break;
    }
    if (down) list.push(down);
    return first(main, list);
  }

  var tapeEl = null, tapeFor = null, tapedEl = null, queued = false;
  var TW = 134, TH = 55;                    // the tape, in phone units (css/story.css .sy-tape; x SB.UI.unit() * 1.25 for px)

  function untape() {
    if (tapedEl && tapedEl.removeAttribute) tapedEl.removeAttribute('data-taped');
    tapedEl = null;
  }
  function dropTape() {
    untape();
    if (tapeEl && tapeEl.parentNode) tapeEl.parentNode.removeChild(tapeEl);
    tapeEl = null; tapeFor = null;
  }
  function scroller(el) {
    var n = el && el.parentNode, cs;
    while (n && n.nodeType === 1 && n !== doc().body) {
      cs = safe(function () { return getComputedStyle(n); }, null);
      if (cs && /(auto|scroll)/.test(String(cs.overflowY || '')) && n.scrollHeight > n.clientHeight + 4) return n;
      n = n.parentNode;
    }
    return null;
  }
  /* put the tape by the element: over its top right corner, the arrow pointing down into it; on the other corner
   * when that would leave the window; flat against the edge of a scrolling page when the element is off it */
  function position(el, fresh) {
    /* the tape is 134 x 55 phone units (css/story.css .sy-tape): every distance here is in those units, times k px */
    var k = SB.UI.unit ? SB.UI.unit() * 1.25 : 1, tw = TW * k, th = TH * k,
        W = (typeof window !== 'undefined' && window.innerWidth) || 1280, H = (typeof window !== 'undefined' && window.innerHeight) || 800,
        r = safe(function () { return el.getBoundingClientRect(); }, null), sc, c, x, y, rot, top = 0, bot = H, pad = 6 * k, hw = tw / 2 + 4 * k, hh = tw / 2 * 0.5 + th / 2;
    if (!r || !tapeEl) return;
    sc = scroller(el);
    c = sc ? safe(function () { return sc.getBoundingClientRect(); }, null) : null;
    if (c) { top = Math.max(0, c.top); bot = Math.min(H, c.bottom); }
    /* newly pointed at and off the page: bring it up, once */
    if (fresh && sc && (r.bottom < top + 10 * k || r.top > bot - 10 * k) && el.scrollIntoView) {
      safe(function () { el.scrollIntoView({ block: 'center', inline: 'nearest' }); }, null);
      r = safe(function () { return el.getBoundingClientRect(); }, r) || r;
    }
    x = r.left + r.width / 2;
    if (r.bottom < top + 10 * k) { y = top + 36 * k; rot = -90; hw = th / 2 + 4 * k; hh = tw / 2; }
    else if (r.top > bot - 10 * k) { y = bot - 40 * k; rot = 90; hw = th / 2 + 4 * k; hh = tw / 2; }
    else {
      /* off the corner, so only the arrow's tip touches the thing and its label stays readable */
      x = r.right + tw * 0.42; y = r.top - th * 0.55; rot = 150;
      if (r.width > 260 * k) x = r.right - 40 * k;                  // a wide thing: sit on it, not past it
      if (x + hw > W - pad) { x = (r.width > 260 * k ? r.left + 40 * k : r.left - tw * 0.42); rot = 30; }
      if (y - hh < pad) { y = r.bottom + th * 0.55; rot = rot === 150 ? 210 : -30; }
    }
    x = Math.max(pad + hw, Math.min(W - pad - hw, x));
    y = Math.max(pad + hh, Math.min(H - pad - hh, y));
    tapeEl.style.left = Math.round(x - tw / 2) + 'px';
    tapeEl.style.top = Math.round(y - th / 2) + 'px';
    if (tapeEl.style.setProperty) tapeEl.style.setProperty('--tr', rot + 'deg');
  }

  /* a card's dim that is peeling off (SB.Finish, .is-leaving) is already gone as far as the tape is concerned */
  function clear_() { var d = doc(); return !busy && !playingCut() && !(d && d.querySelector && d.querySelector('.sb-scrim:not(.is-leaving)')); }

  /* point the tape at what spot() finds (or take it away) */
  function placeTape(cur, r) {
    stick(cur && clear_() ? spot(cur, r) : null, cur ? cur.step : '', r);
  }
  function stick(at, step, r) {
    var d = doc(), key, fresh;
    if (!at || !d || !d.body) { dropTape(); return; }
    key = step + '|' + r + '|' + at.key;
    if (!tapeEl || tapeFor !== key || !tapeEl.parentNode) {
      dropTape();
      tapeEl = h('span', { class: 'sy-tape', aria: { hidden: 'true' }, data: { 'for': r === 'desk' ? String(at.el.getAttribute('data-obj') || '') : at.key, step: step, route: r || '' }, html: tapeSvg(at.key) });
      d.body.appendChild(tapeEl);
      tapeFor = key;
    }
    fresh = tapedEl !== at.el;
    if (fresh) { untape(); tapedEl = at.el; at.el.setAttribute('data-taped', step); }
    position(at.el, fresh);
  }

  /* the way in (js/ui/screens/start.js): no career yet, so no texts; a setup screen hands over a function that says
   * which of its own things to press next, and the same tape points at it. point(null) when the screen goes. */
  var preAt = null;
  function preSpot() {
    var el = preAt && clear_() ? safe(preAt, null) : null;
    return el && el.isConnected !== false && !el.disabled ? { el: el, key: 'setup:' + String((el.getAttribute && el.getAttribute('data-fk')) || el.className || '') } : null;
  }
  function point(fn) {
    preAt = typeof fn === 'function' ? fn : null;
    if (!preAt) dropTape(); else soon();
  }

  /* the screen under the tape changed without an act (a view inside a close-up, a scroll): look again */
  function retape() {
    var s = SB.UI.game ? SB.UI.game() : null, cur;
    queued = false;
    if (preAt) { stick(preSpot(), 'SETUP', route()); return; }
    if (!s) { dropTape(); return; }
    /* the view changed without an act (a message opened on the phone, the tape onto a put-down tag): the tape and the
     * strip's words both follow it */
    if (busy || pumping) { cur = safe(function () { return SB.Tutorial.current(s); }, null); placeTape(cur, route()); return; }
    guide(s);
  }
  function soon() {
    if (queued) return;
    queued = true;
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(retape); else retape();
  }
  function listen() {
    var d = doc(), mo;
    if (!d || !d.addEventListener) return;
    ['click', 'keyup', 'change', 'input'].forEach(function (ev) { d.addEventListener(ev, function () { queued = false; retape(); soon(); }); });
    /* a tap on the night clock while the clock lesson points at it (not on its buttons, which do what they say) */
    d.addEventListener('click', function (e) {
      var nc = d.getElementById ? d.getElementById('nightclock') : null, s = SB.UI.game ? SB.UI.game() : null, cur;
      if (!s || !nc || !e || !e.target || !nc.contains(e.target) || (e.target.closest && e.target.closest('button'))) return;
      cur = safe(function () { return SB.Tutorial.current(s); }, null);
      if (cur && cur.stage === 'CLOCK') ackClock();
    });
    d.addEventListener('scroll', function () { if (tapeEl && tapedEl) position(tapedEl); }, true);
    /* a thing that slaps or slides into place moves out from under the tape: put it back once it lands */
    ['animationend', 'transitionend'].forEach(function (ev) { d.addEventListener(ev, function () { if (tapeEl && tapedEl) position(tapedEl); }, true); });
    if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('resize', soon);
    if (typeof MutationObserver === 'function') {
      mo = new MutationObserver(function () { if (!tapedEl || !tapedEl.isConnected || !tapeEl) soon(); });
      ['main', 'desk'].forEach(function (id) { var e = d.getElementById && d.getElementById(id); if (e) safe(function () { mo.observe(e, { childList: true, subtree: true }); }, null); });
    }
  }

  /* the clock lesson was read: the walkthrough goes on to asking the room */
  function ackClock() {
    var s = SB.UI.game ? SB.UI.game() : null;
    if (!s) return;
    SB.UI.act(function (st) { SB.Tutorial.notify(st, 'CLOCK', null); return { ok: true }; });
  }
  function hideStrip() { if (stripEl && stripEl.parentNode) stripEl.parentNode.removeChild(stripEl); stripEl = null; band(false); }

  function putAway(s, m) {
    mem.dismissed = m.key + '|' + m.list.length;
    hideStrip();
    if (m.once && SB.UI.game() === s) SB.UI.act(function (st) { SB.Chapters.markSeen(st, m.once); return { ok: true }; });
  }

  /* "First put this down" says which thing: "Close the Carport's card first, top right." (fix-list 1.13) */
  function closeFirst(m) {
    var r = route(), s = SB.UI.game(), sid = (m && m.cur && m.cur.showId) || null, sh = s && sid && s.shows ? s.shows[sid] : null, room, thing;
    if (r === 'show' || r === 'bill') {
      room = sh && sh.roomId && s.rooms && s.rooms[sh.roomId] ? s.rooms[sh.roomId].name : '';
      return room ? L('closeCard', { room: room }) : L('closeThing', { thing: L('thing.show') });
    }
    thing = SB.text.has('ui.story.thing.' + r) ? L('thing.' + r) : '';
    return thing ? L('closeThing', { thing: thing }) : L('downFirst');
  }

  /* what the strip says: the one line (what to do now; the why is one press away on its "why?", spec 14), with "put
   * this down first" in front when the tape is on a close-up's put-down tag */
  function stripWords(m) {
    var last = m.list[m.list.length - 1], t = last.text;
    if (tapedEl && tapedEl.classList && tapedEl.classList.contains('cu-down')) t = closeFirst(m) + ' ' + t;
    else if (tapedEl && tapedEl.getAttribute && tapedEl.getAttribute('data-fk') === 'leave' && route() === 'night') t = L('leaveFirst') + ' ' + t;
    return { text: t, kind: last.kind };
  }
  /* the strip gets its own band at the bottom: close-ups, the night and toasts make room for it (css/story.css) */
  function band(on) {
    var d = doc(), b = d && d.body, hgt;
    if (!b) return;
    /* its height plus its gap from the bottom (layout sizes: the slide-in animation does not count) */
    hgt = on && stripEl ? Math.round((stripEl.offsetHeight || 60) + (parseFloat(safe(function () { return getComputedStyle(stripEl).bottom; }, '14')) || 14) + 12) : 0;
    if (b.classList.contains('sy-guiding') === !!on && b.getAttribute('data-sy-band') === String(hgt)) return;
    b.classList.toggle('sy-guiding', !!on);
    b.setAttribute('data-sy-band', String(hgt));
    if (b.style && b.style.setProperty) b.style.setProperty('--sy-band', 'calc(var(--u) * ' + (hgt / ((SB.UI.unit && SB.UI.unit()) || 1)).toFixed(1) + ')');
    if (typeof window !== 'undefined' && window.dispatchEvent) safe(function () { window.dispatchEvent(new Event('resize')); }, null);
  }
  function showStrip(s, m, onDesk) {
    var d = doc(), w = stripWords(m), sig = m.key + '|' + m.list.length + '|' + w.text + '|' + (onDesk ? 1 : 0), open, x, kids, wb;
    if (!d || !d.body) return;
    if (stripEl && stripEl.getAttribute('data-sig') === sig && stripEl.parentNode) { band(true); return; }
    hideStrip();
    kids = [h('span', { class: 'sy-strip-from', text: String(m.from || '').toUpperCase() }), h('span', { class: 'sy-strip-text', text: w.text })];
    /* on the desk it is a button that picks up the phone; anywhere else it is only read */
    if (onDesk && m.fixed && !m.go) onDesk = false;
    open = onDesk ? h('button', { type: 'button', class: 'sy-strip-open pz-hl', aria: { label: L('stripOpen', { outgoing: m.from, text: w.text }) },
                                  on: { click: function () { if (m.go) SB.UI.go(m.go[0], m.go[1]); else SB.UI.go('inbox'); } } }, kids)
                  : h('p', { class: 'sy-strip-open sy-strip-say', aria: { label: L('stripSay', { outgoing: m.from, text: w.text }) } }, kids);
    x = m.fixed ? null : h('button', { type: 'button', class: 'sy-strip-x pz-hl', aria: { label: L('dismiss') }, text: '×', on: { click: function () { putAway(s, m); } } });
    /* the clock lesson is read and then put away with its own GOT IT (or a tap on the clock it points at) */
    if (m.ok === 'CLOCK') x = h('button', { type: 'button', class: 'sy-strip-ok pz-hl', data: { fk: 'clock-ok' }, text: L('clockOk').toUpperCase(), on: { click: ackClock } });
    stripEl = h('div', { class: 'sy-strip pz-paper sy-strip--' + w.kind + (onDesk ? ' sy-strip--desk' : ''), role: 'status', data: { sig: sig } }, x ? [open, x] : [open]);
    if (m.cur) stripEl.appendChild(skipTab(m));
    /* the "why?" sits between the line and its put-away; what it unfolds goes on its own row under them */
    wb = m.cur ? whyOn(stripEl, m, m.list[m.list.length - 1], function () { band(true); }) : null;
    if (wb && x) stripEl.insertBefore(wb, x);
    d.body.appendChild(stripEl);
    band(true);
  }

  /* while the guided show runs: a small tab on the strip to stop it, asked once ("I've done this before" from the desk).
   * After it the strip is the plain reminder: the skip's one text is marked read here. */
  function skipTab(m) {
    var box = h('span', { class: 'sy-strip-skip' });
    function link() {
      SB.UI.clear(box);
      box.classList.remove('is-asking');
      box.appendChild(h('button', { type: 'button', class: 'sy-skip-link', data: { fk: 'tut-skip' }, text: L('skipLink'), on: { click: ask } }));
    }
    function ask() {
      var yes;
      SB.UI.clear(box);
      box.classList.add('is-asking');
      yes = h('button', { type: 'button', class: 'sy-skip-yes pz-hl', data: { fk: 'tut-skip-yes' }, text: L('skipYes'), on: { click: skip } });
      box.appendChild(h('span', { class: 'sy-skip-ask', text: L('skipAsk', { outgoing: m.from || 'Your friend' }) }));
      box.appendChild(yes);
      box.appendChild(h('button', { type: 'button', class: 'sy-skip-no', text: L('skipNo'), on: { click: link } }));
      if (yes.focus) safe(function () { yes.focus({ preventScroll: true }); }, null);
    }
    function skip() {
      if (!SB.UI.game()) return;
      SB.UI.act(function (st) {
        var r = SB.Tutorial.skip(st);
        safe(function () { SB.Chapters.markSeen(st, 'TUTORIAL_SKIP'); }, null);
        return r || { ok: true };
      });
      mem.dismissed = null; mem.nudged = null;
      dropTape(); hideStrip();
      guide(SB.UI.game());
    }
    link();
    return box;
  }

  function armNudge(step) {
    if (mem.timer) { clearTimeout(mem.timer); mem.timer = null; }
    if (!step || typeof setTimeout !== 'function') return;
    mem.timer = setTimeout(function () {
      var s = SB.UI.game();
      mem.timer = null;
      if (!s || mem.step !== step || mem.nudged === step) return;
      mem.nudged = step; mem.dismissed = null;
      guide(s);
    }, NUDGE_MS);
  }

  /* the texts' strip on the desk and the tape on the thing to pick up next */
  /* each close-up gets a coach line about that screen itself, not about the step (fix-list 1.13): on the flyer desk, how to
   * finish the flyer; inside the phone, which button starts the show */
  function screenCoach(m, r) {
    var cur = m && m.cur, tx = '', out, list;
    if (!cur || !m.list.length || m.list[m.list.length - 1].kind !== 'how') return m;
    if (r === 'flyerdesk' && cur.stage === 'NAME') tx = L('coachNameSheet');
    else if (r === 'flyerdesk' && (cur.step === 'FLYER' || cur.stage === 'MAKE')) tx = L('coachFlyerDesk');
    else if (r === 'inbox' && cur.stage === 'REPLY') tx = L('coachInbox', { dow: cur.dow || '' });
    if (!tx) return m;
    list = m.list.slice();
    list[list.length - 1] = { text: tx, kind: 'how' };
    out = {}; Object.keys(m).forEach(function (k) { out[k] = m[k]; });
    out.list = list;
    return out;
  }

  function guide(s) {
    var m = screenCoach(messages(s), route()), r = route(), cur = m && m.cur, d = doc(),
        /* the phone's list already shows the texts in full; inside a message it does not */
        dana = r === 'inbox' && d && d.querySelector ? d.querySelector('.sy-dana') : null,
        onPhone = !!(dana && safe(function () { var b = dana.getBoundingClientRect(); return b.height > 0 && b.bottom > 0 && b.top < ((typeof window !== 'undefined' && window.innerHeight) || 800); }, false));
    if (!m) { dropTape(); mem.step = null; mem.key = null; armNudge(null); standing(s, r); return; }
    if (mem.key !== m.key) { mem.key = m.key; mem.dismissed = null; }
    if (mem.step !== (m.step || m.key)) { mem.step = m.step || m.key; if (mem.nudged !== mem.step) mem.nudged = null; armNudge(cur ? mem.step : null); }
    /* the engine's own "you there?" (days left idle): show it once, and tell the engine it was shown */
    if (cur && cur.nudge && mem.nudged !== cur.step) {
      mem.nudged = cur.step; mem.dismissed = null;
      SB.UI.act(function (st) { SB.Tutorial.notify(st, 'NUDGED', null); return { ok: true }; });
    }
    /* the night is worked out at once and then played back: while it plays, settling up is not yet the next thing.
     * The strip waits (js/ui/screens/night.js marks the body while it plays back, and says when it is done) */
    if (r === 'night' && cur && (cur.step === 'SETTLE' || cur.step === 'CLOSEOUT') && d && d.body && d.body.classList.contains('nt-playing')) { dropTape(); hideStrip(); return; }
    placeTape(cur || null, r);
    /* a one-off line (the skip, the end) read on the phone is done once the phone goes down */
    if (m.once && mem.onPhone === m.once && r !== 'inbox') { mem.onPhone = null; putAway(s, m); return; }
    if (!SB.UI.game() || onPhone || busy || playingCut()) hideStrip();
    else if (mem.dismissed === m.key + '|' + m.list.length) standing(s, r);     // put away: the plain reminder stays
    else { mem.m = m; showStrip(s, m, r === 'desk'); }
  }
  /* the plain reminder, always up when nothing else is (not on the night screen, not over a cutscene) */
  function standing(s, r) {
    var n;
    if (!s || busy || playingCut() || r === 'night') { hideStrip(); return; }
    n = safe(function () { return reminder(s); }, null) || { key: 'NEXT:', from: L('nextFrom'), list: [{ text: L('nxNight'), kind: 'next' }], once: null, go: null, fixed: true, idle: true };
    /* on the card itself, "open its card" is already done */
    if (n && (r === 'show' || r === 'bill')) n.list[0].text = n.list[0].text.replace(/ Open its card( and [^.]*)?\./, function (m0, rest) { return rest ? ' ' + rest.slice(5, 6).toUpperCase() + rest.slice(6) + '.' : ''; });
    /* already on the phone: "pick up the phone" and "answer the message on the phone" would only repeat the screen (fix-list 1.13) */
    if (n && r === 'inbox') n.list[0].text = n.list[0].text.replace(/ Pick up the phone\./, '').replace(/^Answer the message on the phone\.$/, L('nxAnswerHere'));
    if (n) showStrip(s, n, r === 'desk'); else hideStrip();
  }

  /* ---------------------------------------------------------------- */
  /* patches: the card that lands on the desk, and the jacket          */
  /* ---------------------------------------------------------------- */

  function patchWords(id) {
    var p = (story().patches && story().patches[id]) || {};
    return { name: p.name || String(id).replace(/_/g, ' '), card: p.card || '', hint: p.hint || '' };
  }
  function patchInfo(s, id) {
    var all = safe(function () { return SB.Patches.all(s); }, []) || [], i;
    for (i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return { id: id, kind: 'patch', hidden: false, earned: true };
  }
  /* the patch is drawn twice as large as its box: re-rastered finer on a big screen, always shown size --p wide */
  function sharp(cv, size) {
    if (cv && cv.style) { cv.style.width = 'calc(var(--p) * ' + size + ')'; cv.style.height = 'calc(var(--p) * ' + size + ')'; }
    return cv;
  }
  function patchRes() { var F = SB.Finish; return Math.max(1, F && F.res ? F.res() / 2 : 1); }
  function patchCanvas(p, w, size, flat) {
    return safe(function () { return SB.Scenes.patch(p.id, { name: w.name, kind: p.kind, earned: p.earned, hidden: p.hidden, size: Math.round(size * patchRes()), denim: flat ? false : undefined }); }, null);
  }

  function hideCard(peel) {
    var gone = cardEl, F = SB.Finish;
    cardEl = null; cardId = null;
    if (!gone || !gone.parentNode) return;
    if (peel && F && F.move && !(F.reduced && F.reduced())) { gone.inert = true; gone.classList.remove('sy-card'); gone.classList.add('sy-card-leaving', 'is-leaving'); F.move(gone, 'peel', { cue: 'tear', cueOpts: { gain: -12 }, done: function () { if (gone.parentNode) gone.parentNode.removeChild(gone); } }); }
    else gone.parentNode.removeChild(gone);
  }

  /* -> true when a card is on the desk */
  function showCard(s) {
    var d = doc(), id = safe(function () { return SB.Patches.nextToast(s); }, null), p, w, cv, btn, r;
    if (!id) { hideCard(); return false; }
    if (cardEl && cardId === id && cardEl.parentNode) return true;
    hideCard();
    if (!d || !d.body) return false;
    p = patchInfo(s, id); w = patchWords(id);
    p = { id: id, kind: p.kind, hidden: false, earned: true };
    cv = patchCanvas(p, w, 150); sharp(cv, 150);
    r = SB.rng && SB.rng.make ? SB.rng.make('sy-card:' + id) : null;
    btn = h('button', { type: 'button', class: 'sy-card-go pz-paper pz-hl', text: L(p.kind === 'button' ? 'pin' : 'sew'), on: { click: function () {
      hideCard(true);
      if (SB.UI.game() === s) SB.UI.act(function (st) { return SB.Patches.toastShown(st, id); });
    } } });
    cardEl = h('div', { class: 'sy-card pz-paper', role: 'dialog', aria: { label: L('cardLabel', { name: w.name }) }, data: { patch: id } }, [
      h('span', { class: 'sy-card-pic' }, cv),
      h('div', { class: 'sy-card-words' }, [
        h('p', { class: 'sy-card-name', text: w.name }),
        w.card ? h('p', { class: 'sy-card-line', text: w.card }) : null,
        btn
      ])
    ]);
    if (cardEl.style && cardEl.style.setProperty) {
      cardEl.style.setProperty('--tilt', (r ? r.range(-5, 5) : -3).toFixed(1) + 'deg');
      /* lands down by the jacket (where it gets sewn), clear of the phone, the shows and the money */
      cardEl.style.setProperty('--dx', 'calc(var(--u) * -416)'); cardEl.style.setProperty('--dy', 'calc(var(--u) * 220)');
    }
    cardId = id;
    d.body.appendChild(cardEl);
    if (SB.Finish && SB.Finish.move) {
      SB.Finish.move(cardEl, 'slap', { cue: 'scrap', cueOpts: { gain: -6 } });
      SB.Finish.move(cardEl.querySelector('.sy-card-pic'), 'stamp', { delay: 260, cue: 'stamp', cueAt: 83, cueOpts: { gain: -6 } });
    }
    return true;
  }

  function mountJacket(root) {
    var s = SB.UI.game(), all = safe(function () { return SB.Patches.all(s); }, []) || [], n = all.filter(function (p) { return p.earned; }).length, Kc = SB.UI.calKit,
        title = L('jacketTitle'), newest = null, sec, F = SB.Finish;
    all.forEach(function (p) { if (p.earned && (!newest || (p.week || 0) >= (newest.week || 0))) newest = p; });   // the patch sewn on last
    root.appendChild(sec = h('section', { class: 'sy-jacket', aria: { label: L('jacketLabel', { n: n, of: all.length }) } }, [
      h('div', { class: 'sy-back' }, [
        h('h2', { class: 'sy-jacket-title', aria: { label: title } }, Kc && Kc.mk ? safe(function () { return Kc.mk(title.toUpperCase(), 30, { max: 420, say: false }); }, title) : title),
        n ? null : h('p', { class: 'sy-jacket-none', text: L('jacketNone') }),
        h('ul', { class: 'sy-patches' }, all.map(function (p) {
          var w = patchWords(p.id), hero = !!newest && p.id === newest.id, cls = 'sy-patch sy-patch--' + p.kind + (p.earned ? ' is-earned' : (p.hidden ? ' is-blank' : ' is-faint')) + (hero ? ' is-newest' : ''),
              /* a patch not yet earned is a blank square of unfaded denim; its hint rides on a slip under it */
              cv = sharp(patchCanvas({ id: p.id, kind: p.kind, earned: p.earned, hidden: p.earned ? p.hidden : true }, w, hero ? 300 : 128, true), hero ? 300 : 128),
              label = p.earned ? L('earned', { name: w.name, card: w.card }) : (p.hidden ? L('blank') : L('notYet', { name: w.name, hint: w.hint }));
          if (cv && cv.setAttribute) cv.setAttribute('aria-hidden', 'true');
          return h('li', { class: cls, aria: { label: label }, data: { patch: p.id } }, [
            h('span', { class: 'sy-patch-pic' }, cv),
            p.earned ? h('span', { class: 'sy-patch-name', text: w.name }) : null,
            p.earned && w.card ? h('span', { class: 'sy-patch-card', text: w.card }) : null,
            !p.earned && !p.hidden && w.hint ? h('span', { class: 'sy-patch-hint', text: w.hint }) : null
          ]);
        }))
      ])
    ]));
    if (F && F.scrollbar) safe(function () { F.scrollbar(sec); }, null);
    if (F && F.move && newest) {
      var hp = sec.querySelector('.sy-patch.is-newest .sy-patch-pic');
      if (hp) F.move(hp, 'stamp', { delay: 300, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5 } });
      F.stagger([].slice.call(sec.querySelectorAll('.sy-patch:not(.is-newest)')), 2).forEach(function (li) { li.classList.add('mv-slap'); });
    }
    return { update: function () {}, unmount: function () {} };
  }

  /* ---------------------------------------------------------------- */
  /* the box: chapters                                                 */
  /* ---------------------------------------------------------------- */

  function watchBtn(key, label) {
    var Kc = SB.UI.calKit;
    return h('button', { type: 'button', class: 'nb-open fx sy-watch', aria: { label: label }, data: { cutscene: key }, on: { click: function () { rewatch(key); } } },
             Kc && Kc.strip ? Kc.strip(label) : label);
  }

  /** chapters(state): the list for the notebook's CHAPTERS page. */
  function chapters(s) {
    var list = safe(function () { return SB.Chapters.list(s); }, []) || [], drops = safe(function () { return SB.Chapters.drops(s); }, []) || [], kids = [];
    drops = drops.filter(function (d) { return d.seen && cutscene(d.key); });
    if (!list.length && !drops.length) return h('p', { class: 'nb-pencil nb-empty', text: L('chaptersNone') });
    kids.push(h('ol', { class: 'sy-chapters' }, list.map(function (c) {
      var btns = c.cutscenes.filter(function (x) { return x.seen && cutscene(x.key); }).map(function (x) {
        return watchBtn(x.key, L(/_close$/.test(x.key) ? 'watchClose' : 'watchOpen'));
      });
      return h('li', { class: 'sy-chapter' + (c.closed !== null ? ' is-closed' : ''), data: { chapter: c.id } }, [
        h('h3', { class: 'sy-chapter-title', text: L('chapterN', { n: c.n, title: c.title || c.id.replace(/_/g, ' ').toLowerCase() }) }),
        c.line ? h('p', { class: 'sy-chapter-line', text: c.line }) : null,
        h('p', { class: 'sy-chapter-when nb-pencil', text: L('week', { n: (c.opened || 0) + 1 }) }),
        btns.length ? h('div', { class: 'sy-chapter-watch' }, btns) : null
      ]);
    })));
    if (drops.length) {
      kids.push(h('h3', { class: 'sy-chapter-title sy-kept', text: L('kept') }));
      kids.push(h('div', { class: 'sy-chapter-watch' }, drops.map(function (d) {
        var c = cutscene(d.key), sl = safe(function () { return SB.Chapters.slots(s, d.key); }, {});
        return watchBtn(d.key, safe(function () { return SB.text.render(String(c.title || d.key), sl, null); }, d.key));
      })));
    }
    return h('div', { class: 'sy-box' }, kids);
  }

  /* ---------------------------------------------------------------- */
  /* pump                                                              */
  /* ---------------------------------------------------------------- */

  /* ---------------------------------------------------------------- */
  /* welcome back: on Continue, where the game stands (fix-list 4.4)   */
  /* ---------------------------------------------------------------- */

  function agoWords(ms) {
    var m, hr, dy;
    if (typeof ms !== 'number' || !isFinite(ms)) return '';
    m = Math.floor((Date.now() - ms) / 60000);
    if (m < 1) return L('wbJustNow');
    if (m < 60) return L(m === 1 ? 'wbMin1' : 'wbMin', { n: m });
    hr = Math.floor(m / 60);
    if (hr < 24) return L(hr === 1 ? 'wbHour1' : 'wbHour', { n: hr });
    dy = Math.floor(hr / 24);
    return L(dy === 1 ? 'wbDay1' : 'wbDay', { n: dy });
  }
  /* one show, in steps: what is done, what is not (the same seven steps the booking card walks: room, deal, bands, sound, flyer, word out, night) */
  function stepsOf(s, sh) {
    var slots = (sh.bill && sh.bill.slots) || [], yes = slots.filter(function (x) { return x.confirmed; }).length, done = [], todo = [], v, tel = 0, telN = 0;
    (sh.roomId && sh.status === 'CONFIRMED' ? done : todo).push(L('wbRoom'));
    (slots.length >= 2 && yes >= slots.length ? done : todo).push(slots.length ? L('wbBands', { yes: yes, n: slots.length }) : L('wbBandsNone'));
    ((sh.crew && sh.crew.sound) ? done : todo).push(L('wbSound'));
    ((sh.promo && sh.promo.flyer) ? done : todo).push(L('wbFlyer'));
    v = safe(function () { return SB.Shows.view(s, sh.id); }, null);
    ((v && v.jobs) || []).forEach(function (j) { if (j.group === 'TELLING' && j.type !== 'MAKE_FLYER' && j.mode === 'HOURS' && !j.optional && !j.hidden && !j.covered && !j.more) { telN++; if (j.status === 'DONE') tel++; } });
    if (telN) (tel >= telN ? done : todo).push(L('wbPromo', { done: tel, n: telN }));
    return { done: done, todo: todo };
  }
  function welcomeBack(s, savedAt) {
    var day, list, kids = [], nx, close, st;
    if (!s || !s.clock || !SB.UI.card || playingCut()) return false;
    day = s.clock.day;
    list = (safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'], fromDay: day }); }, []) || [])
      .filter(function (x) { return !x.by || x.by === 'player'; }).sort(function (a, b) { return a.day - b.day; }).slice(0, 3);
    kids.push(h('h2', { class: 'sy-wb-head', text: L('wbHead') }));
    kids.push(h('p', { class: 'sy-wb-line', text: L('wbNight', { dow: SB.time.fmt(day, 'dow'), n: (s.clock.week || 0) + 1 }) + (agoWords(savedAt) ? ' ' + L('wbSaved', { ago: agoWords(savedAt) }) : '') }));
    if (!list.length) kids.push(h('p', { class: 'sy-wb-line', text: L('wbNoShows') }));
    list.forEach(function (sh) {
      var room = sh.roomId && s.rooms && s.rooms[sh.roomId] ? s.rooms[sh.roomId].name : L('wbNoRoom'), out = safe(function () { return SB.Week.daysTo(s, sh.day); }, sh.day - day);
      st = stepsOf(s, sh);
      kids.push(h('p', { class: 'sy-wb-show' }, [
        h('b', { text: SB.time.fmt(sh.day, 'short') + (sh.roomId && s.rooms && s.rooms[sh.roomId] ? ' at ' : ', ') + room + ', ' + (out <= 0 ? L('wbTonight') : out === 1 ? L('wbTomorrow') : L('wbDays', { n: out })) + '.' }),
        h('span', { text: ' ' + (st.done.length ? L('wbDone', { list: st.done.join(', ') }) : '') + (st.todo.length ? ' ' + L('wbTodo', { list: st.todo.join(', ') }) : '') })
      ]));
    });
    nx = safe(function () { return reminder(s); }, null);
    if (nx && nx.list && nx.list[0] && nx.list[0].text) kids.push(h('p', { class: 'sy-wb-next' }, [h('b', { text: L('wbNext') + ' ' }), nx.list[0].text]));
    kids.push(h('button', { type: 'button', class: 'sy-wb-go pz-paper pz-hl', text: L('wbGo'), on: { click: function () { if (close) close(); } } }));
    close = SB.UI.card(h('div', { class: 'sy-wb' }, kids), { label: L('wbHead') });
    return true;
  }

  function clearAll() {
    dropTape(); hideStrip(); hideCard(); armNudge(null);
    mem.step = null; mem.key = null; mem.dismissed = null; mem.nudged = null; mem.stuck = null; mem.onPhone = null; mem.m = null;
  }

  function pump() {
    var s = SB.UI.game(), r = route(), d = doc(), blocked;
    if (preAt) { hideStrip(); hideCard(); armNudge(null); soon(); return; }   // a setup screen is up: its own tape, nothing from a career
    if (!s) { clearAll(); return; }
    if (pumping) return;
    pumping = true;
    try {
      /* never two at once, never in the middle of the night screen, never under an open card */
      blocked = busy || playingCut() || r === 'night' || !!(d && d.querySelector && d.querySelector('.sb-scrim'));
      if (!blocked && playNext(s)) return;
      if (r === 'night' && !busy && !playingCut() && !(d && d.querySelector && d.querySelector('.sb-scrim')) && playNext(s, true)) return;
      /* the patch card waits while the close-out is up, so it never sits on START WEEK (fix-list 0.7) */
      if (r === 'night' || r === 'close' || busy || playingCut()) hideCard(); else showCard(s);
      guide(s);
    } finally { pumping = false; }
  }

  listen();

  SB.UI.screen('jacket', { rail: null, title: 'ui.story.jacketTitle', mount: mountJacket });

  SB.UI.extend({ story: { welcomeBack: welcomeBack, retape: soon, pump: pump, opening: opening, openingAsk: openingAsk, phone: phone, chapters: chapters, rewatch: rewatch, messages: messages, point: point,
                          busy: function () { return busy || playingCut(); } } });
})(SB);
