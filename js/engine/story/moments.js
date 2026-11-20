/* Scene Booker — engine/story/moments.js
 * SB.Moments: the short cutscenes after a show night (design/cutscenes-draft.md, approved 2026-11-19).
 *   A moment comes from what happened that night: a night stop and what the booker chose, a week choice about the
 *   show (storm watch), money missing from the tin, or a good or rough night with nothing else in it. Keys in
 *   js/content/story.js are M_<FAMILY>_<n>; every _n that exists is a version, played in turn.
 *   A milestone (MS_*) plays once, is kept, and can be watched again from the chapters box (SB.Chapters.drops).
 * At most one per show. None for the guided first show, and none when the same show already queued a chapter's
 * cutscene. A moment's group (LINE, KNOCK, ...) does not come back within COOL shows; a plain good or rough night
 * waits COOL_PLAIN shows and needs PLAIN_GAP shows since any moment, so most ordinary nights get nothing.
 * Pure on state, no DOM, and it draws from no random stream. Owner: SYSTEMS.
 */
SB.module('Moments', function (SB) {
  'use strict';
  var COOL = 5, COOL_PLAIN = 7, PLAIN_GAP = 3, YEAR_WEEKS = 52;
  /* [decision (event id), option id or '*', family], first match wins: the more serious first */
  var BY_CHOICE = [
    ['SOMEONE_HURT', 'STOP_CHECK', 'HURT'],
    ['A_FIGHT', 'CALL_IT', 'FIGHT_CALL'], ['A_FIGHT', '*', 'FIGHT'],
    ['KNOCK_AT_THE_DOOR', 'TALK', 'KNOCK_TALK'], ['KNOCK_AT_THE_DOOR', 'TURN_DOWN', 'KNOCK_DOWN'], ['KNOCK_AT_THE_DOOR', 'END_NOW', 'KNOCK_END'],
    ['LINE_DOWN_THE_BLOCK', 'LET_IN', 'LINE_IN'], ['LINE_DOWN_THE_BLOCK', 'CAP', 'LINE_CAP'], ['LINE_DOWN_THE_BLOCK', 'OUTSIDE', 'LINE_OUT'],
    ['OPENER_NO_SHOW', 'IN_THE_ROOM', 'ROOMMATE'],
    ['PA_DIED', 'PLAY_THROUGH', 'PA_THROUGH'], ['PA_DIED', 'BORROW', 'PA_BORROW'],
    ['VAN_NOT_HERE', '*', 'VAN_LATE'],
    ['STORM_WATCH', 'GO_AHEAD', 'RAIN']
  ];
  var GROUP = { LINE_IN: 'LINE', LINE_CAP: 'LINE', LINE_OUT: 'LINE', KNOCK_TALK: 'KNOCK', KNOCK_DOWN: 'KNOCK', KNOCK_END: 'KNOCK',
                FIGHT_CALL: 'FIGHT', PA_THROUGH: 'PA', PA_BORROW: 'PA' };
  var PLAIN = { GOOD: 1, ROUGH: 1 };
  var MILESTONES = ['MS_KIDS_BAND', 'MS_BACK_THROUGH', 'MS_FIRST_PACKED', 'MS_FIFTY', 'MS_TEN', 'MS_A_YEAR'];

  function isArr(x) { return Array.isArray(x); }
  function blank() { return { last: {}, n: {}, ms: {}, kept: {}, weekChoices: {}, lastAny: null }; }
  function mem(state) {
    var st = SB.Chapters.ensure(state), b = blank(), k;
    if (!st.moments || typeof st.moments !== 'object') st.moments = b;
    for (k in b) if (st.moments[k] === undefined) st.moments[k] = b[k];
    return st.moments;
  }
  function played(state) { return (state.player && state.player.showsPlayed) || 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function cuts() { return (SB.Content.story && SB.Content.story.cutscenes) || {}; }
  function bandOf(state, id) { return id && state.bands ? state.bands[id] : null; }
  function nameOf(state, id) { var b = bandOf(state, id); return b ? b.name : ''; }
  function recOf(state, showId) { var l = state.legacy || {}; return l.records ? l.records[showId] || null : null; }

  /* the versions of a family that have words: M_FIGHT_1, M_FIGHT_2 (not M_FIGHT_CALL_1) */
  function versions(fam) {
    var re = new RegExp('^M_' + fam + '_(\\d+)$'), out = [];
    Object.keys(cuts()).forEach(function (k) { var m = re.exec(k); if (m) out.push([+m[1], k]); });
    return out.sort(function (a, b) { return a[0] - b[0]; }).map(function (x) { return x[1]; });
  }

  /* the slots a moment's words and pictures use, from the show's record */
  function showSlots(state, show, rec) {
    var bill = (rec && rec.bill) || (show.bill && show.bill.slots) || [], names = bill.map(function (s) { return nameOf(state, s.bandId); }).filter(Boolean);
    var t = bill.filter(function (s) { return s.role === 'TOURING'; })[0], tb = t && bandOf(state, t.bandId);
    return { band: names[names.length - 1] || '', opener: names[0] || '', touring: tb ? tb.name : '', touringHome: tb && tb.place && tb.place.name ? tb.place.name : '',
             room: (rec && rec.roomName) || '', paid: rec ? rec.paid || 0 : 0, heads: rec ? rec.heads || 0 : 0, showId: show.id,
             seed: String(state.seed || '') + ':m:' + show.id };
  }

  /* the milestone this show earns, or null: [key, more slots] */
  function milestone(state, show, rec, m) {
    var t = (state.story && state.story.tutorial) || {}, bill = (rec && rec.bill) || [], n = played(state), i, k, last, recs, tour;
    for (i = 0; i < MILESTONES.length; i++) {
      k = MILESTONES[i];
      if (m.ms[k] !== undefined || !cuts()[k]) continue;
      if (k === 'MS_TEN' && n >= 10) return [k, {}];
      if (k === 'MS_FIFTY' && n >= 50) return [k, {}];
      if (k === 'MS_A_YEAR' && week(state) >= YEAR_WEEKS) return [k, {}];
      if (k === 'MS_KIDS_BAND') {
        last = bill[bill.length - 1];
        if (t.cast && t.cast.kids && last && last.bandId === t.cast.kids && bill.length >= 2) return [k, { kids: nameOf(state, t.cast.kids), band: nameOf(state, t.cast.kids) }];
      }
      if (k === 'MS_BACK_THROUGH') {
        tour = bill.filter(function (s) { return s.role === 'TOURING'; })[0];
        recs = (state.legacy && state.legacy.records) || {};
        if (tour && Object.keys(recs).some(function (id) {
          var r = recs[id]; return id !== show.id && r && isArr(r.bill) && r.bill.some(function (s) { return s.role === 'TOURING' && s.bandId === tour.bandId; });
        })) return [k, {}];
      }
      if (k === 'MS_FIRST_PACKED' && rec && ((rec.incidents || []).indexOf('OVER_CAP') >= 0 || rec.detail === 'TURNED_AWAY' ||
          (rec.choices || []).some(function (c) { return c.decision === 'LINE_DOWN_THE_BLOCK'; }))) return [k, {}];
    }
    return null;
  }

  /* the moment's family for this night, or null */
  function family(state, show, rec, m, wk) {
    var ch = ((rec && rec.choices) || []).concat(wk || []), n = played(state), i, j, f, g, last;
    function ready(fam) {
      g = GROUP[fam] || fam; last = m.last[g];
      if (!versions(fam).length) return false;
      if (PLAIN[fam]) return (last === undefined || n - last >= COOL_PLAIN) && (m.lastAny === null || n - m.lastAny >= PLAIN_GAP);
      return last === undefined || n - last >= COOL;
    }
    for (i = 0; i < BY_CHOICE.length; i++) {
      for (j = 0; j < ch.length; j++) {
        if (ch[j] && ch[j].decision === BY_CHOICE[i][0] && (BY_CHOICE[i][1] === '*' || ch[j].option === BY_CHOICE[i][1])) {
          f = BY_CHOICE[i][2];
          if (ready(f)) return f;
        }
      }
    }
    if (rec && (rec.incidents || []).indexOf('THEFT') >= 0 && ready('TIN_SHORT')) return 'TIN_SHORT';
    if (rec && (rec.verdict === 'WALL' || rec.verdict === 'TALKED') && ready('GOOD')) return 'GOOD';
    if (rec && (rec.verdict === 'ROUGH' || rec.verdict === 'THIN') && ready('ROUGH')) return 'ROUGH';
    return null;
  }

  /** note(state, showId, eventId, optionId): a week choice about a show (Director.resolve), read on its night. */
  function note(state, showId, eventId, optionId) {
    if (!showId) return;
    var m = mem(state);
    (m.weekChoices[showId] = m.weekChoices[showId] || []).push({ decision: eventId, option: optionId });
  }

  /** afterShow(state, show, queuedBefore): after the settle, once the chapters have had their say (Night.settle).
   *  queuedBefore is the cutscene queue's length before this show's Chapters.check. -> the key queued, or null. */
  function afterShow(state, show, queuedBefore) {
    if (!state || !show) return null;
    var m = mem(state), st = state.story, t = st.tutorial || {}, rec = recOf(state, show.id), n = played(state), key = null, more = {}, fam, vs, k, slots;
    var wk = m.weekChoices[show.id] || [];
    delete m.weekChoices[show.id];
    if (show.id === t.showId) return null;                                      // the guided first show has its own
    if (typeof queuedBefore === 'number' && st.cutscenes.length > queuedBefore) return null;   // a chapter spoke tonight
    var ms = milestone(state, show, rec, m);
    if (ms) { key = ms[0]; more = ms[1]; m.ms[key] = week(state); }
    else if ((fam = family(state, show, rec, m, wk))) {
      vs = versions(fam);
      key = vs[(m.n[fam] || 0) % vs.length];
      m.n[fam] = (m.n[fam] || 0) + 1;
      m.last[GROUP[fam] || fam] = n;
      m.lastAny = n;
    }
    if (!key) return null;
    slots = showSlots(state, show, rec);
    for (k in more) slots[k] = more[k];
    if (/^MS_/.test(key)) m.kept[key] = slots;
    st.cutscenes.push({ key: key, slots: SB.Chapters.slots(state, slots) });
    return key;
  }

  /** milestones(state): the milestones earned, for the chapters box: [{ key, week, seen }] (reads only). */
  function milestones(state) {
    var s = state && state.story, m = s && s.moments, seen = (s && s.seen) || [];
    if (!m || !m.ms) return [];
    return MILESTONES.filter(function (k) { return m.ms[k] !== undefined; }).map(function (k) { return { key: k, week: m.ms[k], seen: seen.indexOf(k) >= 0 }; });
  }

  /** kept(state, key): the slots a milestone was played with, for watching it again (reads only). */
  function kept(state, key) {
    var m = state && state.story && state.story.moments;
    return m && m.kept && m.kept[key] ? m.kept[key] : null;
  }

  return { afterShow: afterShow, note: note, milestones: milestones, kept: kept, versions: versions, blank: blank,
           MILESTONES: MILESTONES.slice() };
});
