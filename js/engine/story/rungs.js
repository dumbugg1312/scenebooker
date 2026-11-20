/* Scene Booker — engine/story/rungs.js
 * SB.Rungs: the desk fills in as the player plays. A new booker starts with a handful of things on the desk and the
 * friend who handed the scene over (the director's cast.outgoing) doing the chores nobody needs to learn on night one.
 * Each show played puts more on the desk and hands a chore back. Nothing here locks a rule of the game: a rung only
 * decides what is in front of the player and who does a job.
 * On only when state.settings.ladder is true (a new game started guided). Off, every function answers "everything".
 * Pure on state, no DOM, and it draws from no random stream.
 *
 * rung(state)           0..5, from player.showsPlayed (never goes down)
 * onDesk(state, id)     is this desk object out yet (ids of js/desk/scene.js add())
 * isNew(state, id)      out, and the player has not opened it since
 * opened(state, id)     the player opened it
 * covers(state, type)   does the friend do this job type for the player right now (the bill lock: only once it is ready)
 * hides(state, type)    is this (optional) job kept off the player's list for now
 * mentor(state)         the person id who covers
 * billsWaiting(state)   rent and the day job have not started yet
 * cover(state, day)     the daily pass: the friend does every covered job that is due and doable -> records
 * weekly(state)         at the week's turn: starts the day job once the rung for it is reached -> records
 */
SB.module('Rungs', function (SB) {
  'use strict';
  var C = SB.Config, E = SB.Enums;

  /* shows played -> rung. 0: the first show. 1: what you learned. 2: your own bill. 3: money. 4: your week. 5: the town. */
  var AT = [0, 1, 2, 4, 5, 8];
  /* the rung each desk object comes out at (absent: always out) */
  var DESK = { notebook: 1, stickers: 2, keys: 2, tin: 3, mug: 4, map: 5, book: 5, flyers: 5, jacket: 5 };
  /* the friend does these until the rung named: then they are the player's */
  var COVER = { LOCK_BILL: 2, PRINT: 4, FLYER_RUN: 4, LISTINGS: 4, MAILING_LIST: 4, HOUSE_RULES: 4, NEIGHBORS: 4, ADVANCE: 4, THANKS: 4,
                INVITES: 2, WEEK_PUSH: 2 };
  /* optional extras kept off the list until the rung named */
  var HIDE = { LOCAL_AD: 4, HAND_OUT: 4 };
  var BILLS_AT = 4;

  function on(state) { return !!(state && state.settings && state.settings.ladder); }
  function played(state) { return (state && state.player && state.player.showsPlayed) || 0; }
  function story(state) { return SB.Chapters.ensure(state); }

  function rung(state) {
    if (!on(state)) return AT.length - 1;
    var n = played(state), r = 0, i;
    for (i = 0; i < AT.length; i++) if (n >= AT[i]) r = i;
    return r;
  }

  function onDesk(state, id) {
    if (!on(state)) return true;
    var key = /^clip\d/.test(id) ? 'clips' : id;
    return DESK[key] === undefined || rung(state) >= DESK[key];
  }

  function isNew(state, id) {
    if (!on(state) || DESK[id] === undefined || !onDesk(state, id)) return false;
    var seen = story(state).deskSeen || {};
    return !seen[id];
  }

  function opened(state, id) {
    if (!on(state) || DESK[id] === undefined) return;
    var s = story(state);
    if (!s.deskSeen) s.deskSeen = {};
    s.deskSeen[id] = true;
  }

  function covers(state, type) {
    if (!on(state) || COVER[type] === undefined || !mentor(state)) return false;
    return rung(state) < COVER[type];
  }

  function hides(state, type) {
    return on(state) && HIDE[type] !== undefined && rung(state) < HIDE[type];
  }

  function mentor(state) {
    var d = state && state.director, id = d && d.cast ? d.cast.outgoing : null;
    return id && state.people && state.people[id] ? id : null;
  }

  function billsWaiting(state) {
    return on(state) && !!(state.player && state.player.dayJobLater) && rung(state) < BILLS_AT;
  }

  /* The friend does a covered job on the first day it is doable: its window open and what it needs done. */
  function cover(state, day) {
    var out = [], by, ids, i, job, show, v;
    if (!on(state)) return out;
    by = mentor(state);
    if (!by || !state.jobs) return out;
    ids = Object.keys(state.jobs).sort();
    for (i = 0; i < ids.length; i++) {
      job = state.jobs[ids[i]];
      if (!job || (job.status !== 'TODO' && job.status !== 'PLANNED' && job.status !== 'PROMISED') || !covers(state, job.type)) continue;
      show = job.showId && state.shows ? state.shows[job.showId] : null;
      if (!show || show.status === 'CANCELLED') continue;
      v = SB.Jobs.get(state, job.id);
      if (!v || !v.window || v.window.state === 'EARLY' || v.window.state === 'MISSED' || (v.needs || []).some(function (n) { return !n.done; })) continue;
      if (job.type === 'LOCK_BILL' && !lockReady(state, show, v.window.state)) continue;
      out = out.concat(SB.Jobs.resolve(state, job.id, { day: day, half: 'DAY', by: by, covered: true }) || []);
    }
    return out;
  }

  /* The friend locks the bill the way the player set it: once three bands are on in a good order, or when the lock is
   * about to run late with what there is. Locking any sooner would shut out a band the player is still asking. */
  function lockReady(state, show, windowState) {
    var o = SB.Chapters.billOrder(state, show);
    if (o.n >= 3 && o.ok) return true;
    return o.n >= 2 && (windowState === 'CLOSING' || windowState === 'LATE');
  }

  /* Once the rung for it comes round, the job the player put off starts with the next week. */
  function weekly(state) {
    var P = state.player;
    if (!on(state) || !P || !P.dayJobLater || rung(state) < BILLS_AT) return [];
    P.dayJob = P.dayJobLater;
    P.dayJobLater = null;
    return [];
  }

  return { rung: rung, onDesk: onDesk, isNew: isNew, opened: opened, covers: covers, hides: hides, mentor: mentor,
           billsWaiting: billsWaiting, cover: cover, weekly: weekly,
           /* tables, for tests and the desk */
           AT: AT, DESK: DESK, COVER: COVER, HIDE: HIDE, BILLS_AT: BILLS_AT };
});
