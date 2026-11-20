/* Scene Booker — engine/story/people.js
 * SB.People: relationships with people, crew, the circle of helpers, favors, helper asks and helper work.
 * Owner: E4. Spec: design/spec/02-engine.md 4b and 7.18; 01-state.md 2.2 (Person). Stream: PEOPLE.
 */
SB.module('People', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var HELPER_ROLES = ['RUNNER', 'ARTIST', 'FLOOR', 'LODGING'];

  /* ---------------- small helpers ---------------- */

  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function nowHalf(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function rng(state) { return SB.rng.stream(state, E.STREAM.PEOPLE); }

  function person(state, id, where) {
    if (typeof id !== 'string') SB.fail(where || 'People', 'person id must be a string, got ' + String(id));
    var p = state.people && state.people[id];
    if (!p) SB.fail(where || 'People', 'unknown person "' + id + '"');
    return p;
  }

  function fullName(p) {
    if (!p) return '';
    var n = [p.first, p.last].filter(function (x) { return !!x; }).join(' ');
    return n || p.nick || '';
  }

  function bandName(state, bandId) {
    var b = state.bands && state.bands[bandId];
    return b ? b.name : '';
  }

  function stage(value) {
    var cuts = C.TRUST_STAGES, keys = E.STAGE;
    if (value === null || value === undefined) return keys.STRANGER;
    if (value < cuts[0]) return keys.SOUR;
    if (value < cuts[1]) return keys.STRANGER;
    if (value < cuts[2]) return keys.WORKING;
    if (value < cuts[3]) return keys.TRUSTED;
    return keys.ALLY;
  }

  function trustRecord(state, p, d, k, before, showId) {
    var after = p.rel;
    return { t: E.REC.TRUST, day: today(state), half: nowHalf(state), showId: showId || null, text: '',
             id: p.id, name: fullName(p), d: d, k: k, value: after, stage: stage(after),
             stageChanged: stage(before) !== stage(after) };
  }

  /* Change rel in place. Returns the change actually made. */
  function bump(state, p, d, k) {
    var before = p.rel, start = before === null || before === undefined ? C.HELP.relStart : before;
    if (p.met === null || p.met === undefined) p.met = week(state);
    p.rel = Math.round(U.clamp(start + d, 0, 100));
    p.relLog = p.relLog || [];
    p.relLog.push({ d: d, k: k, week: week(state) });
    if (p.relLog.length > 12) p.relLog.splice(0, p.relLog.length - 12);
    return before;
  }

  function isActive(p) { return !p.state || p.state === E.PERSON_STATE.ACTIVE; }
  function hasRole(p, role) { return (p.roles || []).indexOf(role) >= 0; }

  function liveShow(s) { return s && s.status !== E.SHOW.PLAYED && s.status !== E.SHOW.CANCELLED; }

  /* The genre the top of the bill is known for: the first band of the billing order, else a touring slot. */
  function topGenre(state, show) {
    if (!show || !show.bill) return null;
    var id = (show.bill.billing && show.bill.billing[0]) || null, i;
    if (!id) {
      for (i = 0; i < (show.bill.slots || []).length; i++) if (show.bill.slots[i].role === E.BILL_ROLE.TOURING) id = show.bill.slots[i].bandId;
      if (!id && show.bill.slots && show.bill.slots.length) id = show.bill.slots[show.bill.slots.length - 1].bandId;
    }
    var b = id && state.bands && state.bands[id];
    return b ? b.genre : null;
  }

  /* True when the person is on the crew of a live show that day, other than showId. */
  function busyOn(state, personId, day, showId) {
    var ids = Object.keys(state.shows || {}), i, s, c;
    for (i = 0; i < ids.length; i++) {
      s = state.shows[ids[i]];
      if (!liveShow(s) || s.id === showId || s.day !== day || !s.crew) continue;
      c = s.crew;
      if (c.sound === personId || c.security === personId || c.floor === personId || c.lodging === personId) return true;
    }
    return false;
  }

  function slotsFor(state, p, show, extra) {
    var room = show && show.roomId && state.rooms ? state.rooms[show.roomId] : null, k, o = {
      person: p ? p.first : '', name: p ? fullName(p) : '',
      date: show ? SB.time.date(show.day).d : null, dow: show ? SB.time.fmt(show.day, 'dow') : '',
      dateLong: show ? SB.time.fmt(show.day, 'long') : '',
      room: room ? room.name : '', show: room ? room.name : '',
      band: show ? bandName(state, (show.bill && show.bill.billing && show.bill.billing[0]) ||
                                   (show.bill && show.bill.slots && show.bill.slots.length ? show.bill.slots[show.bill.slots.length - 1].bandId : null)) : ''
    };
    if (extra) for (k in extra) o[k] = extra[k];
    return o;
  }

  function say(state, path, slots, speakerId) {
    if (speakerId && SB.Effects && typeof SB.Effects.textPath === 'function') path = SB.Effects.textPath(state, path, speakerId);
    return SB.text.has(path) ? SB.text.line(path, slots, textRng(state)) : '';
  }

  /* ---------------- views ---------------- */

  function get(state, personId) { return person(state, personId, 'People.get'); }

  function rel(state, personId) {
    var p = person(state, personId, 'People.rel');
    var v = p.rel === undefined ? null : p.rel;
    return { value: v, stage: stage(v) };
  }

  function card(state, personId) {
    var p = person(state, personId, 'People.card'), where = '', origin = null, owedText = '', z, r;
    if (p.zoneId && state.zones && state.zones[p.zoneId]) where = state.zones[p.zoneId].name || '';
    else if (p.place) where = p.place.name + (p.place.state ? ', ' + p.place.state : '');
    if (p.originShowId) {
      r = state.legacy && state.legacy.records && state.legacy.records[p.originShowId];
      z = r ? ((r.story && r.story.name) || r.roomName) : null;
      origin = z || null;
    }
    if (p.favors > 0) owedText = say(state, 'people.owed.THEY_OWE', { person: p.first, n: p.favors });
    else if (p.favors < 0) owedText = say(state, 'people.owed.YOU_OWE', { person: p.first, n: -p.favors });
    return {
      id: p.id, name: fullName(p), nick: p.nick || null, gen: p.gen, roles: (p.roles || []).slice(),
      bands: (p.bands || []).map(function (b) { return { bandId: b, name: bandName(state, b) }; }),
      rel: rel(state, personId), taste: p.taste ? U.copy(p.taste) : null, wants: p.wants || null, rate: p.rate || 0,
      owed: { favors: p.favors || 0, text: owedText }, last: (p.lastOutcomes || []).slice(), lastReport: p.lastReport || null,
      origin: origin, listed: !!p.listed, where: where
    };
  }

  function crew(state, role, showId) {
    var R = String(role || '').toUpperCase(), show = showId ? (state.shows && state.shows[showId]) : null, out = [];
    if (R !== 'SOUND' && R !== 'SECURITY') SB.fail('People.crew', 'role must be sound or security, got ' + String(role));
    if (showId && !show) SB.fail('People.crew', 'unknown show "' + showId + '"');
    Object.keys(state.people || {}).forEach(function (id) {
      var p = state.people[id], known = null;
      if (!isActive(p) || !hasRole(p, R) || p.met === null || p.met === undefined) return;
      if (SB.Notebook && typeof SB.Notebook.range === 'function') known = SB.Notebook.range(state, 'person:' + id);
      out.push({ personId: id, name: fullName(p), rate: p.rate || 0, rel: rel(state, id),
                 busy: show ? busyOn(state, id, show.day, show.id) : false, known: known });
    });
    return out;
  }

  function circleMax(state) {
    var pl = state.player || {};
    if ((pl.stage || 1) < C.STAGE_HELPERS) return 0;
    return Math.min(C.CIRCLE.max, C.CIRCLE.base + Math.floor((pl.name || 0) / C.CIRCLE.perName));
  }

  function circleIds(state) {
    var max = circleMax(state), ids = [];
    if (!max) return ids;
    Object.keys(state.people || {}).forEach(function (id) {
      var p = state.people[id], i;
      if (!isActive(p) || p.met === null || p.met === undefined || p.listed) return;
      for (i = 0; i < HELPER_ROLES.length; i++) if (hasRole(p, HELPER_ROLES[i])) { ids.push(id); return; }
    });
    return ids.slice(0, max);
  }

  function circle(state) {
    return { max: circleMax(state), people: circleIds(state).map(function (id) { return card(state, id); }) };
  }

  /* ---------------- internals ---------------- */

  function adjust(state, personId, d, k) {
    var p = person(state, personId, 'People.adjust');
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('People.adjust', 'd must be a number');
    var before = bump(state, p, d, k || 'EVENT');
    return trustRecord(state, p, d, k || 'EVENT', before, null);
  }

  function favor(state, personId, d) {
    var p = person(state, personId, 'People.favor');
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('People.favor', 'd must be a number');
    p.favors = Math.round((p.favors || 0) + d);
  }

  function meet(state, personId, where) {
    var p = person(state, personId, 'People.meet'), before = p.rel === undefined ? null : p.rel, d = 0;
    if (before === null) {
      p.rel = C.HELP.relStart;
      p.met = week(state);
      d = C.HELP.relStart;
      p.relLog = p.relLog || [];
      p.relLog.push({ d: d, k: 'MET', week: week(state) });
    } else if (p.met === null || p.met === undefined) p.met = week(state);
    var r = trustRecord(state, p, d, 'MET', before === null ? 0 : before, null);
    r.where = where || null;
    return r;
  }

  var WAIT_KEY = { CREW: 'HELPER', HELPER_JOB: 'HELPER', LODGING: 'HELPER', BORROW: 'HELPER' };

  function askShow(state, ask) {
    var pl = ask.payload || {}, sid = pl.showId || ask.showId || null, j;
    if (!sid && pl.jobId && state.jobs && state.jobs[pl.jobId]) { j = state.jobs[pl.jobId]; sid = j.showId; }
    return sid && state.shows ? state.shows[sid] || null : null;
  }

  function helperRoleFor(state, p, jobType) {
    var cfg = C.JOBS[jobType] || {}, i;
    if (cfg.helper && cfg.helper !== 'CIRCLE' && hasRole(p, cfg.helper)) return cfg.helper;
    if (cfg.helper && cfg.helper !== 'CIRCLE') return cfg.helper;
    for (i = 0; i < HELPER_ROLES.length; i++) if (hasRole(p, HELPER_ROLES[i])) return HELPER_ROLES[i];
    return 'RUNNER';
  }

  function answerAsk(state, ask, phase) {
    if (!ask || typeof ask !== 'object') SB.fail('People.answerAsk', 'ask must be an Ask');
    if (!WAIT_KEY[ask.kind]) SB.fail('People.answerAsk', 'People does not answer asks of kind ' + ask.kind);
    var p = person(state, ask.toId, 'People.answerAsk'), pl = ask.payload || {}, show = askShow(state, ask);
    var job = pl.jobId && state.jobs ? state.jobs[pl.jobId] : null, role, path, status, text, r, yes, g, w;
    if (phase === 'SEND') {
      r = rng(state);
      w = C.WAIT[WAIT_KEY[ask.kind]];
      if (ask.kind === 'HELPER_JOB' && job && (C.JOBS[job.type] || {}).helper === 'ARTIST') w = C.WAIT.ARTIST;
      var days = r.range(w.days[0], w.days[1] + 1e-9);
      if (!isActive(p)) return { days: days, will: E.ASK_STATUS.NO, counter: null };
      if (ask.kind === 'CREW' && show && busyOn(state, p.id, show.day, show.id)) return { days: days, will: E.ASK_STATUS.NO, counter: null };
      if (ask.kind === 'BORROW' && (pl.amount || 0) > C.MONEY.BORROW.max) return { days: days, will: E.ASK_STATUS.NO, counter: null };
      /* the crew the handoff introduced do the opening's first show (the fair first month): no coin flip on sound */
      if (ask.kind === 'CREW' && show && SB.Director && SB.Director.firstShow && SB.Director.firstShow(state, show)) {
        p.asked = (p.asked || 0) + 1;
        return { days: days, will: E.ASK_STATUS.YES, counter: null };
      }
      yes = C.HELP.yes.base + C.HELP.yes.perRel * ((p.rel === null || p.rel === undefined ? C.HELP.relStart : p.rel) / 100);
      g = topGenre(state, show);
      if (g && p.taste) {
        if ((p.taste.loves || []).indexOf(g) >= 0) yes += C.HELP.yes.lovesBill;
        if (p.taste.wont === g) yes += C.HELP.yes.wontTouch;
      }
      if ((p.asked || 0) > C.HELP.yes.oftenPerMonth) yes += C.HELP.yes.askedOften;
      if (ask.kind === 'CREW') yes += 0.25;
      p.asked = (p.asked || 0) + 1;
      if (w.silent && r.chance(w.silent)) return { days: days, will: E.ASK_STATUS.SILENT, counter: null };
      return { days: days, will: r.chance(U.clamp(yes, 0, 1)) ? E.ASK_STATUS.YES : E.ASK_STATUS.NO, counter: null };
    }
    if (phase !== 'DELIVER') SB.fail('People.answerAsk', 'phase must be SEND or DELIVER');
    status = (ask.hid && ask.hid.will) || E.ASK_STATUS.NO;
    if (status === E.ASK_STATUS.YES && !isActive(p)) status = E.ASK_STATUS.NO;
    if (status === E.ASK_STATUS.YES && ask.kind === 'CREW' && show && busyOn(state, p.id, show.day, show.id)) status = E.ASK_STATUS.NO;
    var yn = status === E.ASK_STATUS.YES ? 'YES' : 'NO';
    if (ask.kind === 'CREW') path = 'people.crew.' + (String(pl.role || 'sound').toUpperCase() === 'SECURITY' ? 'SECURITY' : 'SOUND') + '.' + yn;
    else if (ask.kind === 'LODGING') path = 'people.helper.LODGING.' + yn;
    else if (ask.kind === 'HELPER_JOB') { role = helperRoleFor(state, p, job ? job.type : null); path = 'people.helper.' + role + '.' + yn; }
    else path = 'people.borrow.' + yn;   // SPEC?: 03-content 9 names no BORROW lines; used only when C2 adds them.
    text = say(state, path, slotsFor(state, p, show, { amount: pl.amount || null, role: pl.role || '' }), p.id);
    return { status: status, text: text, counter: null, records: [] };
  }

  function perform(state, jobId, personId) {
    var job = state.jobs && state.jobs[jobId];
    if (!job) SB.fail('People.perform', 'unknown job "' + jobId + '"');
    var p = person(state, personId, 'People.perform'), r = rng(state);
    var rely = (p.hid && typeof p.hid.reliability === 'number') ? p.hid.reliability : U.mean(C.HELP.reliability);
    var role = helperRoleFor(state, p, job.type), show = job.showId && state.shows ? state.shows[job.showId] : null;
    var x = r.next(), outcome, effect, g;
    if (!isActive(p)) x = 1;                                  // gone: never does it
    if (x < rely) outcome = E.HELP_OUTCOME.DONE;
    else if (x < rely + (1 - rely) * C.HELP.notDoneShare || !isActive(p)) {
      outcome = r.chance(C.HELP.toldShare) ? E.HELP_OUTCOME.NOT_DONE_TOLD : E.HELP_OUTCOME.NOT_DONE_SILENT;
    } else outcome = E.HELP_OUTCOME.DIFFERENT;
    if (outcome === E.HELP_OUTCOME.DONE) effect = 1;
    else if (outcome === E.HELP_OUTCOME.DIFFERENT) {
      g = topGenre(state, show);
      effect = (role === 'RUNNER' && g && p.taste && (p.taste.loves || []).indexOf(g) >= 0) ? 1.15 : C.HELP.differentEffect;
    } else effect = 0;
    /* SPEC?: 01-state 2.2 gives Person two keys named `last` (the surname and the last eight HELP_OUTCOMEs). The surname
     * keeps `last` (WorldGen writes it, every name reads it); the outcome list is stored as `lastOutcomes` and shown
     * as PersonView.last. */
    p.lastOutcomes = p.lastOutcomes || [];
    p.lastOutcomes.push(outcome);
    if (p.lastOutcomes.length > 8) p.lastOutcomes.splice(0, p.lastOutcomes.length - 8);
    if (effect > 0) { p.jobs = (p.jobs || 0) + 1; bump(state, p, C.HELP.relPerJob, 'JOB_DONE'); }
    var route = job.type === 'FLYER_RUN' ? String(job.key || '').split('#')[0] : '';
    var rt = route && SB.Cities && SB.Cities.pack ? (SB.Cities.pack(state).derived || {}).routeById : null;
    var spots = rt && rt[route] && rt[route].spots ? rt[route].spots.map(function (s) { return s.label; }) : [];
    var text = say(state, 'people.helper.' + role + '.' + outcome,
                   slotsFor(state, p, show, { route: rt && rt[route] ? rt[route].name : route, spots: spots.slice(0, 3),
                                              skipped: spots.length > 1 ? spots[spots.length - 1] : '', reason: '' }), p.id);
    p.lastReport = text || p.lastReport || null;
    return { outcome: outcome, effect: effect, text: text };
  }

  function afterShow(state, show, outcome) {
    if (!show || typeof show !== 'object') SB.fail('People.afterShow', 'show must be a Show');
    var out = [], seen = {}, c = show.crew || {};
    ['sound', 'security', 'floor', 'lodging'].forEach(function (k) {
      var id = c[k], p, before;
      if (!id || id === 'player' || seen[id] || !(state.people && state.people[id])) return;
      seen[id] = true;
      p = state.people[id];
      p.jobs = (p.jobs || 0) + 1;
      p.lastOutcomes = p.lastOutcomes || [];
      p.lastOutcomes.push(E.HELP_OUTCOME.DONE);
      if (p.lastOutcomes.length > 8) p.lastOutcomes.splice(0, p.lastOutcomes.length - 8);
      before = bump(state, p, C.HELP.relPerJob, 'PAID_ON_THE_DAY');
      out.push(trustRecord(state, p, C.HELP.relPerJob, 'PAID_ON_THE_DAY', before, show.id));
      /* the security person's word on the night: quiet, or what they handled */
      if (k === 'security') {
        var rough = ((outcome && outcome.incidents) || []).some(function (i) { return C.SECURITY.incidents.indexOf(i.kind) >= 0; });
        p.lastReport = say(state, 'people.crew.SECURITY.' + (rough ? 'HANDLED' : 'QUIET'), slotsFor(state, p, show, {}), p.id) || p.lastReport || null;
      }
    });
    /* The faces of the regulars who love what was on the bill become people the player knows. */
    var g = topGenre(state, show);
    ((state.regulars && state.regulars.faces) || []).forEach(function (id) {
      var p = state.people && state.people[id];
      if (!p || !isActive(p) || (p.met !== null && p.met !== undefined)) return;
      if (g && p.taste && (p.taste.loves || []).indexOf(g) >= 0) out.push(meet(state, id, show.id));
    });
    return out;
  }

  function weekly(state) {
    var w = week(state), out = [], monthTurns = SB.time.billsDue(w), oddMonth = SB.time.month(w * 7 + 13) % 2 === 1;
    Object.keys(state.people || {}).forEach(function (id) {
      var p = state.people[id], before, recent, i, d;
      if (!isActive(p) || p.rel === null || p.rel === undefined) return;
      if ((p.favors || 0) < -C.HELP.favorsOwedMax) {
        before = bump(state, p, -C.HELP.favorsOwedCost, 'FAVORS_OWED');
        out.push(trustRecord(state, p, -C.HELP.favorsOwedCost, 'FAVORS_OWED', before, null));
      }
      if (!monthTurns) return;
      p.asked = 0;
      recent = false;
      for (i = 0; i < (p.relLog || []).length; i++) if (p.relLog[i].week > w - 4 && p.relLog[i].k !== 'DRIFT') recent = true;
      if (recent || p.rel === C.TRUST_DRIFT.toward) return;
      if (p.rel > C.TRUST_DRIFT.slowAbove && oddMonth) return;      // half speed above slowAbove
      d = p.rel > C.TRUST_DRIFT.toward ? -C.TRUST_DRIFT.perMonth : C.TRUST_DRIFT.perMonth;
      bump(state, p, d, 'DRIFT');
    });
    // SPEC?: 7.18's favors "called in (queued for the Director)", people leaving town and the "what they do next" news
    // line have no rate or content path in the contract; they are left out (the smaller behavior).
    return out;
  }

  /* ---------------- trimming (called by SB.Save.trim and SB.Bands.trim) ---------------- */

  /* Which of the ids in `cand` (a map id -> true) appear anywhere in the state outside their own person record, as a
   * value or as a key. The notebook's estimates (keys like 'person:p12') and the random streams do not count. */
  var SKIP_TOP = { notebook: 1, rng: 1, ids: 1 };
  function refsTo(state, cand) {
    var found = {}, k, stack, o, i, v, keys, j;
    function see(x) { if (typeof x === 'string' && cand[x] === true) found[x] = true; }
    stack = [];
    for (k in state) {
      if (SKIP_TOP[k] || !state[k] || typeof state[k] !== 'object') { see(state[k]); continue; }
      if (k === 'people') {
        for (v in state.people) if (cand[v] !== true && state.people[v]) stack.push(state.people[v]);
        continue;
      }
      stack.push(state[k]);
    }
    while (stack.length) {
      o = stack.pop();
      if (Array.isArray(o)) {
        for (i = 0; i < o.length; i++) { v = o[i]; if (typeof v === 'string') { if (cand[v] === true) found[v] = true; } else if (v && typeof v === 'object') stack.push(v); }
        continue;
      }
      keys = Object.keys(o);
      for (j = 0; j < keys.length; j++) {
        if (cand[keys[j]] === true) found[keys[j]] = true;
        v = o[keys[j]];
        if (typeof v === 'string') { if (cand[v] === true) found[v] = true; } else if (v && typeof v === 'object') stack.push(v);
      }
    }
    return found;
  }

  /* Delete people records (and their notebook estimate). */
  function drop(state, ids) {
    var est = state.notebook && state.notebook.est, i;
    for (i = 0; i < ids.length; i++) {
      delete state.people[ids[i]];
      if (est) delete est['person:' + ids[i]];
    }
  }

  /* Architect's ruling on the lifetimes 01-state 3 left out: a person who is not in a band (now or before), does not run
   * a room, has never been met (so is not crew or the circle), is not a face of the regulars, not on the list, and appears
   * nowhere else (a remembered show, a booker, a contact, a message...), and has been so for 52 weeks, is dropped.
   * `idleWeek` is the week the person was first found so. Runs every fourth week (the idle clock is in weeks). */
  var IDLE_WEEKS = 52;
  function trim(state) {
    var all = state.people, wk = week(state), cand = {}, any = false, id, p, found, gone = [];
    if (!all || wk % 4 !== 0) return 0;
    for (id in all) {
      p = all[id];
      if (!p) continue;
      if ((p.bands && p.bands.length) || (p.pastBands && p.pastBands.length) || p.ownerOf || p.listed || p.regularType ||
          (p.rel !== null && p.rel !== undefined) || (typeof p.met === 'number')) { if (p.idleWeek !== undefined) delete p.idleWeek; continue; }
      cand[id] = true; any = true;
    }
    if (!any) return 0;
    found = refsTo(state, cand);
    for (id in cand) {
      p = all[id];
      if (found[id]) { if (p.idleWeek !== undefined) delete p.idleWeek; continue; }
      if (typeof p.idleWeek !== 'number') { p.idleWeek = wk; continue; }
      if (wk - p.idleWeek >= IDLE_WEEKS) gone.push(id);
    }
    drop(state, gone);
    return gone.length;
  }

  return {
    get: get, card: card, rel: rel, adjust: adjust, stage: stage, crew: crew, circle: circle, favor: favor, meet: meet,
    answerAsk: answerAsk, perform: perform, afterShow: afterShow, weekly: weekly,
    /* extras (not in the manifest) */
    trim: trim, refsTo: refsTo, drop: drop
  };
});
