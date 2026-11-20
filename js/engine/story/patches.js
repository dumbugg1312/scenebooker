/* Scene Booker — engine/story/patches.js
 * SB.Patches: the patches and buttons on the jacket. Nothing is unlocked by one; none is for anything in the harm system.
 * Triggers read what the engine already records (SB.Legacy firsts and records, player.showsPlayed, the money ladder,
 * room closures) plus the small counters of 09 section 4, kept in state.story.counts by afterShow / replied / weekly.
 * Owner: SYSTEMS. Spec: design/spec/09-tutorial-story-patches.md 4; 09a-build-contract.md.
 * Pure on state, no DOM, and it draws from no random stream.
 * Beyond the manifest: afterShow, replied, weekly (the counters), nextToast / toastShown (the card the UI lands on the desk).
 */
SB.module('Patches', function (SB) {
  'use strict';
  var GOOD = { GOOD: 1, TALKED: 1, WALL: 1 }, HELD_UP = { HELD: 1, GOOD: 1, TALKED: 1, WALL: 1 };
  var N = { door: 10, flyerSameDay: 5, weekOfFlyerDays: 3, secondToLast: 10, fourPeople: 5, doneBy: 10, sameRoom: 25, answerWeeks: 8, answerReplies: 4,
            tenYears: 520 };

  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function counts(state) { return SB.Chapters.ensure(state).counts; }
  function bump(c, k, by) { c[k] = (c[k] || 0) + (by === undefined ? 1 : by); }

  /* ---------------- the counters ---------------- */

  /* the walkthrough's show: Dana set it up (the touring band, the draw, the room), so it earns DOORS AT 8 and nothing else */
  function guidedId(state) { var t = state.story && state.story.tutorial; return (t && !t.skipped && t.showId) || null; }

  /* Called by Night.finish once the show is PLAYED. settled is the night's settle record ({ pocket, agreed, short }). */
  function afterShow(state, show, result, settled) {
    if (!show || !result) SB.fail('Patches.afterShow', 'needs the show and its result');
    if (show.id === guidedId(state)) return counts(state);
    var c = counts(state), room = show.roomId && state.rooms ? state.rooms[show.roomId] : null, C = SB.Config, slots = (show.bill && show.bill.slots) || [];
    var incs = (result.incidents || []).map(function (x) { return x.kind; }), f = show.promo && show.promo.flyer, o, q, d = state.director || {}, dow, lastEnd, wet, m;
    settled = settled || {};
    /* the running order */
    o = SB.Chapters.billOrder(state, show);
    if (o.ok && o.touring && o.closer && o.n >= 3) bump(c, 'secondToLast');
    if (slots.some(function (s) { return s.role === 'TOURING'; })) bump(c, 'touringPlayed');
    /* the flyer */
    if (f && typeof f.day === 'number') {
      if (typeof show.confirmedDay === 'number' && f.day <= show.confirmedDay) bump(c, 'flyerSameDay');
      if (f.day >= show.day - N.weekOfFlyerDays) bump(c, 'weekOfFlyer');
    }
    /* the door and the tin */
    if ((result.paid || 0) <= N.fourPeople) bump(c, 'fourPeople');
    if ((settled.pocket || 0) > 0) bump(c, 'outOfPocket');
    if (!(result.door && result.door.leak > 0) && incs.indexOf('THEFT') < 0 && settled.agreed !== false && !settled.short && (result.comps || 0) === 0 && (result.paid || 0) > 0) bump(c, 'countTwice');
    if ((result.turnedAway || 0) > 0 || (room && (result.heads || 0) >= room.cap)) bump(c, 'packed');
    /* the room and the clock */
    if (room && room.kind === 'HOUSE') {
      lastEnd = result.sets && result.sets.length ? result.sets[result.sets.length - 1].end : null;
      if ((typeof result.run === 'number' && result.run <= C.RUN.cut) || (typeof room.curfew === 'number' && typeof lastEnd === 'number' && lastEnd > room.curfew)) c.doneBy = 0;
      else bump(c, 'doneBy');
    }
    dow = SB.time.dow(show.day);
    if (dow === 0 && GOOD[result.verdict]) bump(c, 'monday');
    if (room && (room.open === false || (room.closedWeek !== null && room.closedWeek !== undefined))) bump(c, 'lastShow');
    if (incs.indexOf('NOISE') >= 0 && typeof result.run === 'number' && result.run < 1) bump(c, 'copsCame');
    /* rain the night actually played through (the model's weather draw), not the truth table: the model can waive it */
    wet = incs.indexOf('RAINED_OUT') >= 0 || (result.luck || []).some(function (x) { return x && (x.k || x) === 'RAIN'; });
    if (room && room.outdoor && wet && HELD_UP[result.verdict]) bump(c, 'rainedOut');
    /* who asked, and how */
    q = show.requestId && state.requests ? state.requests[show.requestId] : null;
    if (q && q.kind === 'SWAP' && show.requestId !== (d.firstRequestId || d.swapRequestId)) bump(c, 'swaps');
    if (q && (dow === 4 || dow === 5) && slots.some(function (s) { return s.role === 'TOURING'; }) &&
        (state.otherShows || []).some(function (x) { return x && x.day === show.day; }) && SB.Legacy && SB.Legacy.mark) {
      m = SB.Legacy.mark(state, 'WEEKEND_PICK', { showId: show.id, bandId: q.bandId || null });
      if (m && SB.Week && SB.Week.log) SB.Week.log(state, [m]);
    }
    return c;
  }

  /* the player answered a request (yes, no or not yet) */
  function replied(state) { var c = counts(state); bump(c, 'replies'); bump(c, 'repliesRun'); return c; }

  /* the weekly tick: was every request answered this week? */
  function weekly(state) {
    var c = counts(state), from = (week(state) - 1) * 7, to = from + 7, ids = Object.keys(state.requests || {}), i, q, missed = false;
    for (i = 0; i < ids.length; i++) {
      q = state.requests[ids[i]];
      if (q && q.status === 'IGNORED' && typeof q.closedDay === 'number' && q.closedDay >= from && q.closedDay < to) { missed = true; break; }
    }
    if (missed) { c.answerRun = 0; c.repliesRun = 0; }
    else bump(c, 'answerRun');
    return c;
  }

  /* ---------------- the set ---------------- */

  function context(state) {
    var l = state.legacy || {}, firsts = {}, recs = Object.keys(l.records || {}).map(function (k) { return l.records[k]; }), byRoom = {}, sold = false, any;
    (l.firsts || []).forEach(function (f) { firsts[f.k] = f; });
    recs.forEach(function (r) { if (r.roomId) byRoom[r.roomId] = (byRoom[r.roomId] || 0) + 1; });
    Object.keys(byRoom).forEach(function (id) { var room = state.rooms && state.rooms[id]; if (room && room.closedWhy === 'SOLD') sold = true; });
    var guided = guidedId(state);
    any = function (test) { var i; for (i = 0; i < recs.length; i++) if (recs[i].showId !== guided && test(recs[i])) return recs[i]; return null; };
    return { firsts: firsts, recs: recs, byRoom: byRoom, sold: sold, any: any, c: (state.story && state.story.counts) || {},
             P: state.player || {}, t: (state.story && state.story.tutorial) || {}, played: (state.player && state.player.showsPlayed) || 0 };
  }

  function first(k) { return function (state, x) { var f = x.firsts[k]; return f ? (f.refs || {}) : false; }; }
  function count(k, n) { return function (state, x) { return (x.c[k] || 0) >= (n || 1); }; }
  function shows(n) { return function (state, x) { return x.played >= n; }; }

  /* kind and hidden as in 09 section 4 */
  var DEFS = [
    { id: 'DOORS_AT_8', kind: 'patch', test: function (state, x) { return x.firsts.SHOW ? (x.firsts.SHOW.refs || {}) : x.played > 0; } },
    { id: 'SKIPPED_TUTORIAL', kind: 'button', hidden: true, test: function (state, x) { return !!x.t.skipped; } },
    { id: 'YOU_ARE_THE_DOOR', kind: 'button', test: shows(N.door) },
    { id: 'COUNT_IT_TWICE', kind: 'button', hidden: true, test: count('countTwice') },
    { id: 'ANSWER_EVERYONE', kind: 'patch', test: function (state, x) { return (x.c.answerRun || 0) >= N.answerWeeks && (x.c.repliesRun || 0) >= N.answerReplies; } },
    { id: 'FLYER_SAME_DAY', kind: 'button', test: count('flyerSameDay', N.flyerSameDay) },
    { id: 'WEEK_OF_FLYER', kind: 'button', hidden: true, test: count('weekOfFlyer') },
    { id: 'SECOND_TO_LAST', kind: 'button', test: count('secondToLast', N.secondToLast) },
    { id: 'OUT_OF_STATE', kind: 'patch', test: function (state, x) {
      return (x.c.touringPlayed || 0) > 0 || !!x.any(function (r) { return (r.bill || []).some(function (b) { return b.role === 'TOURING'; }); }); } },
    { id: 'THEY_CAME_BACK', kind: 'patch', test: first('RETURN') },
    { id: 'ASK_FOR_YOU', kind: 'patch', test: first('WORD_OF_MOUTH') },
    { id: 'PACKED', kind: 'patch', test: count('packed') },
    { id: 'ON_THE_WALL', kind: 'patch', test: function (state, x) { var r = x.any(function (q) { return q.verdict === 'WALL'; }); return r ? { showId: r.showId } : false; } },
    { id: 'FOUR_PEOPLE', kind: 'button', hidden: true, test: count('fourPeople') },
    { id: 'OUT_OF_POCKET', kind: 'button', hidden: true, test: count('outOfPocket') },
    { id: 'DONE_BY_1030', kind: 'button', test: count('doneBy', N.doneBy) },
    { id: 'MONDAY_NIGHT', kind: 'button', test: count('monday') },
    { id: 'WEEKEND_PICK', kind: 'button', test: first('WEEKEND_PICK') },
    { id: 'SWAP', kind: 'button', test: count('swaps') },
    { id: 'FIRST_SHOW_EVER', kind: 'patch', test: function (state, x) { var r = x.any(function (q) { return !!q.firstBand; }); return r ? { showId: r.showId, bandId: r.firstBand } : false; } },
    { id: 'PIT_TO_STAGE', kind: 'patch', test: first('BAND_FROM_SHOW') },
    { id: 'THEY_WENT_ON_TOUR', kind: 'patch', test: first('TOUR') },
    { id: 'SAME_ROOM_25', kind: 'patch', test: function (state, x) {
      var id = Object.keys(x.byRoom).sort().filter(function (k) { return x.byRoom[k] >= N.sameRoom; })[0]; return id ? { roomId: id } : false; } },
    { id: 'LAST_SHOW_IN_ROOM', kind: 'button', hidden: true, test: count('lastShow') },
    { id: 'CONDOS', kind: 'button', hidden: true, test: function (state, x) { return x.sold; } },
    { id: 'COPS_CAME', kind: 'button', hidden: true, test: count('copsCame') },
    { id: 'RAINED_OUT', kind: 'button', hidden: true, test: count('rainedOut') },
    { id: 'COUCH', kind: 'button', hidden: true, test: function (state, x) { return !!x.P.couch; } },
    { id: 'ROOM_TOWN_DIDNT_HAVE', kind: 'patch', test: first('ROOM_KEPT') },
    { id: 'SHOWS_50', kind: 'patch', test: shows(50) },
    { id: 'SHOWS_100', kind: 'patch', test: shows(100) },
    { id: 'SHOWS_250', kind: 'patch', test: shows(250) },
    { id: 'TEN_YEARS', kind: 'patch', test: function (state) { return week(state) >= N.tenYears; } }
  ];

  function plain(o) { var out = {}, k; if (o && typeof o === 'object') for (k in o) if (typeof o[k] === 'string' || typeof o[k] === 'number') out[k] = o[k]; return out; }

  /* -> the ids newly earned; each is also put on state.story.toasts for the card that lands on the desk */
  function check(state) {
    if (!state || typeof state !== 'object') SB.fail('Patches.check', 'state must be a State');
    var story = SB.Chapters.ensure(state), x = context(state), out = [], i, d, r;
    for (i = 0; i < DEFS.length; i++) {
      d = DEFS[i];
      if (state.patches[d.id]) continue;
      r = d.test(state, x);
      if (!r) continue;
      state.patches[d.id] = { week: week(state), refs: plain(r) };
      story.toasts.push(d.id);
      out.push(d.id);
    }
    return out;
  }

  /* every patch, earned or not: { id, kind, hidden, earned, week } (reads only) */
  function all(state) {
    var p = (state && state.patches) || {};
    return DEFS.map(function (d) {
      var e = p[d.id];
      return { id: d.id, kind: d.kind, hidden: !!d.hidden, earned: !!e, week: e ? e.week : null };
    });
  }

  /* the next card to land on the desk (reads only), and "it has been sewn on" */
  function nextToast(state) { var q = state && state.story && state.story.toasts; return q && q.length ? q[0] : null; }
  function toastShown(state, id) {
    var q = SB.Chapters.ensure(state).toasts, i = q.indexOf(id);
    if (i >= 0) q.splice(i, 1);
    return { ok: true };
  }

  return { check: check, all: all,
           /* beyond the manifest */
           afterShow: afterShow, replied: replied, weekly: weekly, nextToast: nextToast, toastShown: toastShown,
           IDS: DEFS.map(function (d) { return d.id; }) };
});
