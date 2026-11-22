/* Scene Booker — engine/show/irl.js. SB.IRL: which IN REAL LIFE lessons and what-ifs a played show gets
 * (design/spec/13-real-booking.md, parts 1 and 3).
 *
 * Picked once, stored. `pick` runs inside Night.finish, from the causes Feedback just measured, and writes result.irl;
 * `settle` runs inside Night.settle and writes night.settled.irl. Each counts the lesson in state.notebook.irl, so a
 * screen only reads what is stored and a close-up drawn twice never counts twice. A lesson stops being picked once it
 * has been shown LIMIT times; `learned` lists every lesson ever shown, for the notebook.
 * Keys: 'cause:<E.CAUSE>', 'job:<E.JOB type>', 'settle:<E.SHORTFALL>'. The words are in SB.Content.irl and
 * SB.Content.jobs[type].why; this file never reads them, so a missing text prints nothing.
 * Streams: none. Nothing here is left to chance.
 */
SB.module('IRL', function (SB) {
  'use strict';
  var E = SB.Enums;
  var LIMIT = 3;               // showings after which a lesson stops appearing
  var MAX = 3;                 // lessons per show
  var MIN_CONTROLLED = 2;      // a cause the player controlled counts from this many heads, either way
  var MIN_HIDDEN = 3;          // a cause the player could not have known counts from this many
  /* a cause measured in how the bands were treated, not in people: no dollars at the door */
  var NOT_HEADS = { HOSPITALITY: true, PAY: true };
  /* the booking step a lesson is filed under when SB.Content.irl.step does not say */
  var STEP = { NIGHT: 'DATE', COMPETITION: 'DATE', TOWN_EVENT: 'DATE', REPEAT: 'DATE',
               ROOM_FIT: 'ROOM', AGE_GATE: 'ROOM', VENUE_REP: 'ROOM',
               DOOR_PRICE: 'DEAL',
               GENRE_MIX: 'BILL', GEN_MIX: 'BILL', ORDER: 'BILL', RUNTIME: 'BILL', DRAW_AWAY: 'BILL', LOCAL_DRAW: 'BILL', OVERUSE: 'BILL', TREND: 'BILL',
               SOUND: 'CREW', SAFETY: 'CREW', DOOR_COUNT: 'CREW',
               PROMO_ANNOUNCE: 'ANNOUNCE', PROMO_FLYER: 'ANNOUNCE', PROMO_POSTERS: 'ANNOUNCE', PROMO_SHARES: 'ANNOUNCE', PROMO_DMS: 'ANNOUNCE',
               PROMO_PUSH: 'ANNOUNCE', PROMO_EXIT: 'ANNOUNCE', REGULARS: 'ANNOUNCE',
               ADVANCE: 'NIGHT', HOSPITALITY: 'NIGHT', PAY: 'SETTLE' };
  var GROUP_STEP = { GETTING: 'BILL', TELLING: 'ANNOUNCE', RUNNING: 'CREW', NIGHT: 'NIGHT', FREE: 'NIGHT' };

  function num(v, d) { return (typeof v === 'number' && v === v && v !== Infinity && v !== -Infinity) ? v : d; }
  function showOf(state, showId, where) {
    var s = state && state.shows && state.shows[showId];
    if (!s) SB.fail(where, 'unknown show "' + showId + '"');
    return s;
  }
  function book(state) {
    if (!state || !state.notebook) SB.fail('IRL', 'the state has no notebook');
    if (!state.notebook.irl || typeof state.notebook.irl !== 'object') state.notebook.irl = {};
    return state.notebook.irl;
  }
  function shown(state, key) { var e = state && state.notebook && state.notebook.irl ? state.notebook.irl[key] : null; return e ? num(e.shown, 0) : 0; }
  function open(state, key) { return shown(state, key) < LIMIT; }
  function bump(state, key) {
    var b = book(state);
    if (!b[key]) b[key] = { shown: 0 };
    b[key].shown = num(b[key].shown, 0) + 1;
  }

  function stepOf(key) {
    var at = key.indexOf(':'), kind = key.slice(0, at), name = key.slice(at + 1), map = SB.Content && SB.Content.irl && SB.Content.irl.step, job;
    if (kind === 'settle') return 'SETTLE';
    if (map && typeof map[name] === 'string') return map[name];
    if (kind === 'cause') return STEP[name] || 'NIGHT';
    job = SB.Config && SB.Config.JOBS && SB.Config.JOBS[name];
    return (job && GROUP_STEP[job.group]) || 'NIGHT';
  }

  /* biggest first; equal sizes keep the order Feedback gave them, so the pick never depends on the engine's sort */
  function bySize(a, b) { return (Math.abs(b.d) - Math.abs(a.d)) || (a.at - b.at); }
  function bigLoss(a, b) { return (a.d - b.d) || (a.at - b.at); }

  /* the generation a cause lost the most of, when the cause carries its heads by generation; else null */
  function genOf(c) {
    var g = c.byGen || c.gens, i, best = null, lo = 0;
    if (!Array.isArray(g)) return null;
    for (i = 0; i < 3; i++) if (num(g[i], 0) < lo) { lo = g[i]; best = i; }
    return best === null ? null : ((E.GEN_KEY && E.GEN_KEY[best]) || best);
  }

  /* the jobs of the show that were done late or skipped, in the show's own order, one per type */
  function jobLessons(state, show) {
    var jobs = state.jobs || {}, ids = show.jobs || [], out = [], seen = {}, i, j;
    for (i = 0; i < ids.length; i++) {
      j = jobs[ids[i]];
      if (!j || !j.type || seen[j.type]) continue;
      if (j.timing === 'LATE' || j.timing === 'SKIPPED' || j.status === 'SKIPPED') { seen[j.type] = true; out.push('job:' + j.type); }
    }
    return out;
  }

  /* pick(state, showId[, result]) -> the irl block it stored. Night.finish passes the result it is building (the show
   * has none yet); called without one it reads show.result. A result that already has its lessons is left alone. */
  function pick(state, showId, result) {
    var show = showOf(state, showId, 'IRL.pick'), res = result || show.result, causes, ctl, hid, lessons = [], whatIf = [], unknown = null, price, i, c, k, n, jobs;
    if (!res) SB.fail('IRL.pick', 'show "' + showId + '" has no result');
    if (res.irl) return res.irl;
    causes = (res.causes || []).filter(function (x) { return x && E.CAUSE[x.cause] && typeof x.d === 'number'; })
                               .map(function (x, at) { return { cause: x.cause, d: x.d, hidden: !!x.hidden, byGen: x.byGen, gens: x.gens, at: at }; });
    ctl = causes.filter(function (x) { return !x.hidden; });
    hid = causes.filter(function (x) { return x.hidden; });

    /* the lessons: the two biggest things the player controlled, one thing they could not have known, then the jobs */
    c = ctl.filter(function (x) { return Math.abs(x.d) >= MIN_CONTROLLED && open(state, 'cause:' + x.cause); }).sort(bySize);
    for (i = 0; i < c.length && i < 2; i++) lessons.push('cause:' + c[i].cause);
    c = hid.filter(function (x) { return Math.abs(x.d) >= MIN_HIDDEN && open(state, 'cause:' + x.cause); }).sort(bySize);
    if (c.length && lessons.indexOf('cause:' + c[0].cause) < 0) lessons.push('cause:' + c[0].cause);
    jobs = jobLessons(state, show);
    for (i = 0; i < jobs.length && lessons.length < MAX; i++) if (open(state, jobs[i]) && lessons.indexOf(jobs[i]) < 0) lessons.push(jobs[i]);
    lessons = lessons.slice(0, MAX);

    /* what would have changed it: the three biggest losses the player controlled, in people and in dollars at the door */
    price = show.door && !show.door.donation ? num(show.door.price, 0) : 0;
    c = ctl.filter(function (x) { return x.d <= -MIN_CONTROLLED; }).sort(bigLoss);
    for (i = 0; i < c.length && i < 3; i++) {
      n = Math.round(-c[i].d);
      whatIf.push({ cause: c[i].cause, n: n, gen: genOf(c[i]), money: price > 0 && !NOT_HEADS[c[i].cause] ? Math.round(n * price) : null });
    }
    c = hid.filter(function (x) { return x.d <= -MIN_HIDDEN; }).sort(bigLoss);
    if (c.length) unknown = { cause: c[0].cause, n: Math.round(-c[0].d) };

    for (i = 0; i < lessons.length; i++) { k = lessons[i]; bump(state, k); }
    /* the settle's own lesson was picked at the settle; the night is cleared when the show is played, so it is kept here too */
    k = show.night && show.night.settled && show.night.settled.irl;
    res.irl = { lessons: lessons, whatIf: whatIf, unknown: unknown, settle: typeof k === 'string' ? k : null };
    return res.irl;
  }

  /* settle(state, showId, chosen) -> the key it stored, or null. `chosen` is how the gap was covered (E.SHORTFALL);
   * a settle with no gap has no lesson. Stored on night.settled.irl; a settle that already has one is left alone. */
  function settle(state, showId, chosen) {
    var show = showOf(state, showId, 'IRL.settle'), st = (show.night && show.night.settled) || null, key;
    if (!st) return null;
    if (st.irl !== undefined) return st.irl;
    key = chosen && E.SHORTFALL[chosen] ? 'settle:' + chosen : null;
    if (key && !open(state, key)) key = null;
    if (key) bump(state, key);
    st.irl = key;
    return key;
  }

  /* learned(state) -> [{ key, step, shown }]: every lesson shown at least once, in the order they were first shown.
   * step is one of DATE, ROOM, DEAL, BILL, CREW, ANNOUNCE, NIGHT, SETTLE. Changes nothing. */
  function learned(state) {
    var b = (state && state.notebook && state.notebook.irl) || {};
    return Object.keys(b).filter(function (k) { return b[k] && num(b[k].shown, 0) > 0 && k.indexOf(':') > 0; })
                         .map(function (k) { return { key: k, step: stepOf(k), shown: b[k].shown }; });
  }

  /* counts(state) -> { key: shown }. Changes nothing. */
  function counts(state) {
    var b = (state && state.notebook && state.notebook.irl) || {}, out = {};
    Object.keys(b).forEach(function (k) { if (b[k]) out[k] = num(b[k].shown, 0); });
    return out;
  }

  return { pick: pick, settle: settle, learned: learned, counts: counts, LIMIT: LIMIT };
});
