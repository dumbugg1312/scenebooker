/* Scene Booker — engine/week/stress.js
 * SB.Stress: one number with named causes, its zones, slips, and burning out.
 * Owner: E1a. Spec: design/spec/02-engine.md 2.7, 5.2 (slips), 7.21; 01-state player.stress, stressLog,
 * burnoutUntil; mechanics 9.
 */
SB.module('Stress', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  var LOG_WEEKS = 3;                                     // stressLog keeps the last three weeks

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function week(state) { return (state.clock && typeof state.clock.week === 'number') ? state.clock.week : 0; }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function has(key) { return SB.text.has('strings.' + key); }
  function label(key, ctx) { return has(key) ? SB.text.label(key, ctx) : String(key).split('.').pop(); }
  function say(state, path, slots, fallback) {
    if (SB.text.off) return '';
    if (SB.text.has(path)) return SB.text.line(path, slots || {}, textRng(state));
    return fallback || '';
  }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

  function zoneOf(value, burnt) {
    var z = C.STRESS_ZONES;
    if (burnt) return E.STRESS_ZONE.BURNT_OUT;
    if (value < z[0]) return E.STRESS_ZONE.STEADY;
    if (value < z[1]) return E.STRESS_ZONE.STRETCHED;
    if (value < z[2]) return E.STRESS_ZONE.FRIED;
    if (value < z[3]) return E.STRESS_ZONE.BURNING_OUT;
    return E.STRESS_ZONE.BURNT_OUT;
  }

  function burntOut(state) {
    var b = state.player && state.player.burnoutUntil;
    return typeof b === 'number' && b > today(state);
  }

  function zone(state) { return zoneOf(state.player.stress, burntOut(state)); }

  function trimLog(state) {
    var P = state.player, w = week(state);
    P.stressLog = (P.stressLog || []).filter(function (e) { return e.week > w - LOG_WEEKS; });
  }

  /* The one writer of player.stress. Clamps 0..100, floor COUCH.stressFloor on the couch. Reaching 100 burns out. */
  function add(state, d, k) {
    var P = state.player, before, after, floor, i, entry, log;
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('Stress.add', 'd is not a finite number: ' + d);
    if (!E.STRESS[k]) SB.fail('Stress.add', 'unknown stress cause ' + k);
    before = P.stress;
    floor = P.couch ? C.MONEY.COUCH.stressFloor : 0;
    after = U.clamp(before + d, 0, 100);
    if (d < 0 && after < floor) after = Math.min(before, floor);
    after = U.round(after, 2);
    P.stress = after;
    if (after !== before) {
      log = P.stressLog || (P.stressLog = []);
      entry = null;
      for (i = 0; i < log.length; i++) if (log[i].k === k && log[i].week === week(state)) { entry = log[i]; break; }
      if (entry) entry.d = U.round(entry.d + (after - before), 2);
      else log.push({ k: k, d: U.round(after - before, 2), week: week(state) });
      trimLog(state);
    }
    if (after >= 100 && !burntOut(state)) burnout(state);
  }

  /* Stress reached 100: two weeks off, stress to stressAfter, Name down, and the BURNOUT decision raised. */
  function burnout(state) {
    var P = state.player, day = today(state), until = day + C.BURNOUT.days, shows = [], id, s, nameRec, dec;
    P.burnoutUntil = until;
    P.stress = C.BURNOUT.stressAfter;
    if (SB.Week.recap && state.week) SB.Week.recap(state);   // the days still to come this week lose their hours
    nameRec = SB.Game.adjustName(state, C.BURNOUT.name, 'BURNOUT');
    // SPEC?: Stress.add returns nothing, so the NAME record of a burnout has no caller to pass it up to. It is
    // appended here; Week.log stamps it, so it can never be logged twice.
    if (nameRec) SB.Week.log(state, [nameRec]);
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (s && (s.status === 'DRAFT' || s.status === 'CONFIRMED') && s.day >= day && s.day < until) shows.push(id);
    }
    dec = burnoutDecision(state, shows, day, until);
    SB.Week.raise(state, dec);
    return dec;
  }

  /* SPEC?: 03-content has no text for the BURNOUT decision. Lines are read from 'game.BURNOUT.*' when a content
   * file supplies them; otherwise the zone's own words from strings.js are used, and the option captions below. */
  function burnoutDecision(state, shows, day, until) {
    var opts, has1 = shows.length > 0;
    opts = has1 ? [
      { id: 'HAND_OVER', label: say(state, 'game.BURNOUT.HAND_OVER', { n: shows.length }, 'Hand them to someone'),
        likely: say(state, 'game.BURNOUT.HAND_OVER_LIKELY', {}, ''), costs: [], enabled: true, why: null },
      { id: 'CANCEL', label: say(state, 'game.BURNOUT.CANCEL', { n: shows.length }, 'Call them off'),
        likely: say(state, 'game.BURNOUT.CANCEL_LIKELY', {}, ''),
        costs: [{ k: E.CHIP.TRUST, v: C.CANCEL.far.trust, who: null }], enabled: true, why: null }
    ] : [
      { id: 'REST', label: say(state, 'game.BURNOUT.REST', {}, 'Rest'), likely: '', costs: [], enabled: true, why: null }
    ];
    return { id: SB.util.newId(state, 'd'), kind: E.DECISION.BURNOUT, eventId: null, showId: null,
             day: day, half: half(state), at: null, tier: E.TIER.HARD,
             title: say(state, 'game.BURNOUT.title', { until: until }, cap(label('stress.BURNT_OUT'))),
             body: say(state, 'game.BURNOUT.body', { n: shows.length }, label('stress.effects.BURNT_OUT')),
             options: opts, shows: shows, until: until };
  }

  /* The {n} of a cause label counts things (hours over, messages waiting), not stress points. */
  function units(k, d) {
    var per = (C.STRESS.UP[k] !== undefined && typeof C.STRESS.UP[k] === 'number') ? C.STRESS.UP[k] :
              ((C.STRESS.DOWN[k] !== undefined && typeof C.STRESS.DOWN[k] === 'number') ? C.STRESS.DOWN[k] : 1);
    return Math.round(Math.abs(d / (per || 1)));
  }

  function view(state) {
    var P = state.player, w = week(state), by = {}, causes = [], easing = [], i, e, k, z = zone(state);
    for (i = 0; i < (P.stressLog || []).length; i++) {
      e = P.stressLog[i];
      if (e.week <= w - LOG_WEEKS) continue;
      by[e.k] = (by[e.k] || 0) + e.d;
    }
    for (k in by) {
      if (!by[k]) continue;
      e = { k: k, d: U.round(by[k], 1), label: label('stress.cause.' + k, { n: units(k, by[k]) }) };
      (by[k] > 0 ? causes : easing).push(e);
    }
    causes.sort(function (a, b) { return b.d - a.d; });
    easing.sort(function (a, b) { return a.d - b.d; });
    return { value: Math.round(P.stress), zone: z, causes: causes, easing: easing, effects: label('stress.effects.' + z) };
  }

  /* Which slip a tired person makes on this job (02-engine 5.2), or null. job null (or with no type) is the
   * evening send of Mail.flush: SHORT_ANSWER or CREW_UNCONFIRMED. */
  function slip(state, job) {
    var z = zone(state), p = C.SLIP[z] || 0, r, type = job && job.type;
    if (!(p > 0)) return null;
    // SPEC?: Stress.slip is E1a's function but enums.js names the JOBS stream as the stream of slips, and
    // the slip is rolled for Jobs (and Mail). The roll uses STREAM.JOBS so a slip never moves E1a's MONEY stream.
    r = SB.rng.stream(state, E.STREAM.JOBS);
    if (!r.chance(p)) return null;
    if (!type) return r.chance(0.5) ? E.SLIP.SHORT_ANSWER : E.SLIP.CREW_UNCONFIRMED;
    if (type === 'MAKE_FLYER') return E.SLIP.WRONG_DATE;
    if (type === 'PRINT') return r.chance(0.5) ? E.SLIP.WRONG_DATE : E.SLIP.SHOP_SHUT;
    if (type === 'ADVANCE') return E.SLIP.WRONG_LOADIN;
    if (type === 'FLYER_RUN') return E.SLIP.SHOP_SHUT;
    if (C.JOBS[type] && C.JOBS[type].mode === 'HOURS') return E.SLIP.DOUBLE_BOOKED;
    return null;
  }

  function stressRec(state, d, k, extra) {
    var r = { t: E.REC.STRESS, day: today(state), half: half(state), showId: null, text: '',
              d: U.round(d, 2), k: k, value: Math.round(state.player.stress), zone: zone(state) }, x;
    for (x in (extra || {})) r[x] = extra[x];
    r.text = say(state, 'game.STRESS.' + k, { n: units(k, d) }, label('stress.cause.' + k, { n: units(k, d) }));
    return r;
  }

  /* The weekly rows of Config.STRESS (7.21). usage = { unspent, daysOff, showsInFlight, wentOut, noShowWeek, inboxWaiting } */
  function weekly(state, usage) {
    var u = usage || {}, S = C.STRESS, P = state.player, records = [], z0 = zone(state), bills = !!(state.settings && state.settings.bills),
        circle = 0, comfy, over, m = state.money || {}, total, harm = state.harm && state.harm.open, z1;
    function row(d, k) {
      var before = P.stress;
      if (!d) return;
      add(state, d, k);
      if (P.stress !== before) records.push(stressRec(state, P.stress - before, k));
    }
    row(S.DOWN.WEEK, 'WEEK');
    row(Math.max(S.DOWN.UNSPENT_MAX, S.DOWN.UNSPENT * Math.max(0, u.unspent || 0)), 'UNSPENT');
    row(S.DOWN.DAY_OFF * Math.max(0, u.daysOff || 0), 'DAY_OFF');
    if (u.noShowWeek) row(S.DOWN.NO_SHOW_WEEK, 'NO_SHOW_WEEK');
    if (bills) {
      total = SB.Money.billsTotal ? SB.Money.billsTotal(state) : 0;
      if (total > 0 && (m.bank || 0) >= S.CUSHION_MONTHS * total) row(S.DOWN.CUSHION, 'CUSHION');
      if ((m.fund || 0) + (m.bank || 0) < S.BROKE_UNDER) row(S.UP.BROKE, 'BROKE');
    }
    try { circle = (SB.People.circle(state).people || []).length; } catch (e) { circle = 0; }
    comfy = Math.min(S.LOAD_MAX, S.LOAD_BASE + S.LOAD_PER_HELPER * circle);
    over = Math.max(0, (u.showsInFlight || 0) - comfy);
    if (over > 0) row(S.UP.LOAD * over, 'LOAD');
    if ((u.inboxWaiting || 0) > S.INBOX_OVER) row(S.UP.INBOX * (u.inboxWaiting - S.INBOX_OVER), 'INBOX');
    if (harm && typeof harm.week === 'number' && week(state) - harm.week < C.HARM.STRESS_OPEN_WEEKS) row(S.UP.HARM_OPEN, 'HARM_OPEN');
    // wentOut: GO_TO_SHOW already eased stress when it resolved (02-engine 5.2), so it is not counted again here.
    z1 = zone(state);
    if (z1 !== z0 && records.length) records[records.length - 1].zoneFrom = z0;
    return records;
  }

  return { add: add, zone: zone, view: view, slip: slip, weekly: weekly,
           /* not in the manifest: Week emits the phone-off STRESS record with it */
           record: stressRec };
});
