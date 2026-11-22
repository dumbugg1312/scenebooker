/* Scene Booker — engine/week/game.js
 * SB.Game: a new game, the strip summary, settings, and the only writers of player.name and player.followers.
 * Owner: E1a. Spec: design/spec/02-engine.md 2.1, 7.8; 01-state section 1.
 */
SB.module('Game', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function has(key) { return SB.text.has('strings.' + key); }
  function label(key) { return has(key) ? SB.text.label(key) : String(key).split('.').pop(); }
  function say(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
  }
  function isStr(s) { return typeof s === 'string' && s.length > 0; }

  /* ------------------------------------------------------------------ */
  /* a new game                                                          */
  /* ------------------------------------------------------------------ */

  function keepGoingAway(state, g) {
    var e = state.story && state.story.chapters && state.story.chapters.GOING_AWAY, refs = {}, k;
    if (!g || typeof g !== 'object' || !e) return;
    ['band1', 'band2', 'band2Home', 'band3'].forEach(function (n) { if (isStr(g[n])) refs[n] = g[n]; });
    if (!refs.band1 || !refs.band2 || !refs.band3) return;
    refs.bands = [refs.band1, refs.band2, refs.band3];
    e.refs = e.refs || {};
    for (k in refs) e.refs[k] = refs[k];
  }

  function newGame(opts) {
    var o = opts || {}, set = o.settings || {}, state, pack, bills;
    if (!isStr(o.seed)) SB.fail('Game.newGame', 'opts.seed must be a non-empty string');
    if (!isStr(o.citySlug)) SB.fail('Game.newGame', 'opts.citySlug must be a non-empty string');
    if (typeof o.bookingName !== 'string') SB.fail('Game.newGame', 'opts.bookingName must be a string');
    if (set.fog !== undefined && !E.FOG[set.fog]) SB.fail('Game.newGame', 'unknown fog ' + set.fog);
    if (set.windows !== undefined && !E.WINDOWS[set.windows]) SB.fail('Game.newGame', 'unknown windows ' + set.windows);
    bills = set.bills !== false;

    state = {
      v: SB.SAVE_VERSION,
      seed: o.seed,
      citySlug: o.citySlug,
      settings: { bills: bills, fog: set.fog || E.FOG.NORMAL, windows: set.windows || E.WINDOWS.NORMAL,
                  pauseOnReplies: set.pauseOnReplies !== false, noText: !!set.noText,
                  ladder: set.ladder !== undefined ? !!set.ladder : o.tutorial === true },
      tune: o.tune || null,
      rng: SB.rng.init(),
      ids: {},
      flags: {},
      /* a game is in play from its first morning (spec 10): nobody sits in PLAN. evening: the last day whose EVENING stop was raised */
      clock: { day: 0, week: 0, phase: E.PHASE.PLAY, cursor: { dayIdx: 0, half: E.HALF.DAY },
               opened: -1, done: 0, sent: -1, evening: -1, stop: null, pending: [] },
      player: {
        bookingName: o.bookingName, mark: o.mark || null,
        houseStyle: { templates: {}, inks: {}, papers: {}, treatments: {} },
        name: C.NAME_START, nameLine: [C.NAME_START], followers: C.FOLLOWERS_START, stage: 1,
        stress: C.STRESS.START, stressLog: [],
        dayJob: bills ? E.DAY_JOB.FULL : E.DAY_JOB.NONE, dayJobNext: null, dayJobLater: null, shiftDrops: 0,
        couch: false, strikes: 0, burnoutUntil: null, tired: null, houseRules: false, mailingList: 0,
        showsPlayed: 0, lastShowWeek: null, recentGenres: [],
        focus: { value: 0, kind: E.FOCUS.BETWEEN, genres: [] },
        usual: { sound: null, security: null, floor: null }
      },
      money: { fund: 0, bank: null, ledger: [], overdraftMonths: 0, loans: [], billsMonth: null, lateFee: 0 },
      town: { word: 0, wordBase: 0, wordLine: [], forecast: {}, allAges: {}, kidsLine: [], signs: [] },
      zones: {},
      regulars: { by: {}, total: 0, faces: [], lastBadWeek: null, priceyRun: 0, line: [] },
      truth: { quirks: [], nightQuirks: [], chan: {}, comfort: [0, 0, 0], zoneMul: {}, heat: {}, heatLine: {},
               waves: {}, pulses: [], parKnows: {}, weather: {} },
      notebook: { est: {}, causes: {}, notes: [], terms: {}, calls: [], tells: {} },
      bands: {}, people: {}, rooms: {}, bookers: {}, contacts: {}, requests: {}, shows: {}, otherShows: [],
      jobs: {}, asks: {}, mail: { messages: [] }, tours: {},
      week: null,
      director: { queue: [], followups: [], used: {}, lastHardWeek: null, quietWeek: null, opening: null },
      harm: { open: null, lastWeek: null, nextWeek: null, closed: [] },
      legacy: { records: {}, wall: [], firsts: [], bandsFromShows: [], roomsKept: [], years: [], offers: [], ended: null },
      /* the first show, the chapters, the cutscene queue, the jacket (09a-build-contract) */
      story: SB.Chapters.blank ? SB.Chapters.blank()
                               : { tutorial: { on: false, step: null, skipped: false, nudgedAt: 0 }, chapters: {}, cutscenes: [], seen: [] },
      patches: {}
    };

    pack = SB.Cities.pack(state);                        // fails clearly when the pack is not loaded
    if (bills) {
      state.money.bank = (pack.money && typeof pack.money.startCash === 'number') ? pack.money.startCash : C.CITY.START_CASH;
      state.money.fund = 0;
    } else {
      state.money.fund = C.MONEY.BILLS_OFF.fund;
      state.money.bank = null;
    }
    // The month the game starts in counts as paid: the first bills are those of the next month.
    state.money.billsMonth = { y: SB.time.date(0).y, m: SB.time.date(0).m };
    /* a guided start puts the rent off until the desk has filled in (SB.Rungs.billsWaiting); the day job starts on day one,
       so the night clock has work nights from the first show (user, 2026-11-21) */

    state.week = SB.Week.blankWeek(state, 0);

    SB.WorldGen.build(state, pack);
    SB.Notebook.init(state);
    SB.Jobs.refreshAll(state);
    /* "I've done this before" is settled before the opening, which writes a guided first show closer in (Director) */
    if (o.tutorial === false) SB.Tutorial.skip(state);
    SB.Director.opening(state);
    SB.Director.planWeek(state);
    SB.Week.refreshHours(state);
    /* the guided first show is on until the start screen skips it (opts.tutorial === false starts with it skipped) */
    if (o.tutorial !== false) SB.Tutorial.start(state);
    SB.Chapters.check(state);
    /* the going-away show's bill as the player watched it: the way in plays that scene on a first draft of this game
       and asks the setup questions in it, and "I've done this before" can free a different local draw for the first
       show. Kept on the chapter so the scene watched again shows the same three bands. */
    keepGoingAway(state, o.goingAway);
    SB.Patches.check(state);
    return state;
  }

  /* ------------------------------------------------------------------ */
  /* the strip                                                           */
  /* ------------------------------------------------------------------ */

  function strip(state) {
    var W = state.week || {}, used = 0, capH = 0, i, word = (state.town && state.town.word) || 0, tier, inbox = 0, late = 0, night = null;
    for (i = 0; i < 7; i++) {
      if (W.used && W.used[i]) used += (W.used[i].DAY || 0) + (W.used[i].NIGHT || 0);
      if (W.cap && W.cap[i]) capH += (W.cap[i].DAY || 0) + (W.cap[i].NIGHT || 0);
    }
    try { tier = SB.Territory.tier(word); } catch (e) { tier = E.WORD_TIER.SKIPPED; }
    try { inbox = SB.Mail.needsYou(state).length; } catch (e) { inbox = 0; }
    try { late = SB.Jobs.tray(state).late.length; } catch (e) { late = 0; }
    try { night = SB.Week.tonight(state); } catch (e) { night = null; }   // the evening's clock, always on screen (spec 10)
    return {
      week: state.clock.week, from: state.clock.week * 7, to: state.clock.week * 7 + 6, phase: state.clock.phase,
      fund: state.money.fund, bank: state.money.bank,
      hours: { used: used, cap: capH, over: Math.max(0, used - capH) }, tonight: night,
      stress: { value: Math.round(state.player.stress), zone: SB.Stress.zone(state) },
      name: Math.round(state.player.name), word: Math.round(word), wordTier: tier, stage: state.player.stage,
      badges: { inbox: inbox, late: late }
    };
  }

  /* ------------------------------------------------------------------ */
  /* settings                                                            */
  /* ------------------------------------------------------------------ */

  function setSetting(state, key, value) {
    var S = state.settings, pack, ok;
    if (state.clock.phase === E.PHASE.OVER) return U.no(E.REFUSE.OVER, label('refuse.OVER'));
    switch (key) {
      case 'bills':
        if (typeof value !== 'boolean') return U.no(E.REFUSE.INVALID, label('refuse.INVALID'));
        if (value === S.bills) return U.yes();
        /* open until the first morning has been played */
        if (state.clock.week > 0 || state.clock.opened >= 0) return U.no(E.REFUSE.LOCKED, label('refuse.LOCKED'));
        S.bills = value;
        pack = SB.Cities.pack(state);
        if (value) {
          state.money.bank = (pack.money && typeof pack.money.startCash === 'number') ? pack.money.startCash : C.CITY.START_CASH;
          state.money.fund = 0;
          state.player.dayJob = E.DAY_JOB.FULL;
        } else {
          state.money.fund = C.MONEY.BILLS_OFF.fund;
          state.money.bank = null;
          state.player.dayJob = E.DAY_JOB.NONE;
        }
        state.player.dayJobNext = null;
        SB.Week.resetShape(state);
        return U.yes();
      case 'fog': ok = !!E.FOG[value]; break;
      case 'windows': ok = !!E.WINDOWS[value]; break;
      case 'pauseOnReplies': case 'noText': ok = typeof value === 'boolean'; break;
      default: SB.fail('Game.setSetting', 'unknown setting ' + key);
    }
    if (!ok) return U.no(E.REFUSE.INVALID, label('refuse.INVALID'));
    S[key] = value;
    if (key === 'noText') SB.text.off = value;
    return U.yes();
  }

  /* ------------------------------------------------------------------ */
  /* Name and followers                                                  */
  /* ------------------------------------------------------------------ */

  /* SPEC?: the NAME record carries `beat` only with k BEAT, but adjustName's signature has no beat. An optional
   * fourth argument ctx = { beat, showId } is accepted for Night.finish; without it beat is null. */
  function adjustName(state, d, k, ctx) {
    var P = state.player, from = P.name, peak = from, i, floor, to, r;
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('Game.adjustName', 'd is not a finite number: ' + d);
    if (!isStr(k)) SB.fail('Game.adjustName', 'k must be a word');
    for (i = 0; i < (P.nameLine || []).length; i++) if (P.nameLine[i] > peak) peak = P.nameLine[i];
    floor = Math.max(C.NAME_FLOOR.abs, C.NAME_FLOOR.ofPeak * peak);
    to = U.clamp(from + d, floor, C.NAME_MAX);
    if (d < 0 && to > from) to = from;                  // a loss never raises a name that sits under the floor
    to = U.round(to, 3);
    P.name = to;
    r = { t: E.REC.NAME, day: today(state), half: half(state), showId: (ctx && ctx.showId) || null, text: '',
          from: U.round(from, 2), to: U.round(to, 2), k: k, beat: (k === 'BEAT' && ctx && typeof ctx.beat === 'number') ? ctx.beat : null };
    r.text = say(state, 'game.NAME.' + k, { from: Math.round(from), to: Math.round(to), d: U.round(to - from, 1) });
    return r;
  }

  function adjustFollowers(state, d, k) {
    var P = state.player, v = P.followers || 0;
    if (d && typeof d === 'object') {
      if (typeof d.mul !== 'number' || !isFinite(d.mul)) SB.fail('Game.adjustFollowers', 'mul is not a finite number');
      v = v * d.mul;
    } else {
      if (typeof d !== 'number' || !isFinite(d)) SB.fail('Game.adjustFollowers', 'd is not a finite number: ' + d);
      v = v + d;
    }
    P.followers = Math.max(0, Math.round(v));
  }

  return { newGame: newGame, strip: strip, setSetting: setSetting, adjustName: adjustName, adjustFollowers: adjustFollowers };
});
