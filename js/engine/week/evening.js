/* Scene Booker — engine/week/evening.js
 * SB.Evening: things to do with the rest of the night (design/spec/12-day-activities.md, approved 2026-11-21).
 * Every evening has something to spend its hours on, at home or out, and each one pays off through a lever the engine
 * already has (stress, followers, the notebook, word of mouth, regulars, an owner's or a friend's goodwill, money).
 * Pressing one does it on the spot: its hours come off tonight's clock (Week.spend) or it is refused.
 *
 *   list(state)          -> [{ id, type, where: 'HOME' | 'OUT', hours, cost, factor, label, benefit, note, ok, code, why }]
 *                           everything on offer tonight, at home first; `ok` false with the refusal's code and words
 *   can(state, id)       -> Result & { hours, cost, factor }   the checks of doIt, without doing it
 *   doIt(state, id)      -> Result & { records, text, hours, factor, callNight }   does it now. callNight: BED_EARLY
 *                           wants the night called at once (the caller calls it: Week.endNight / the lamp)
 *
 * ids are a type, or 'type:key' (SHOW:<otherShowId>, DROP_BY:<roomId>). SHOW and SHIFT are the old free jobs
 * GO_TO_SHOW and EXTRA_SHIFT, made and done through Week.addJob / Week.doNow so they keep their own effects.
 * Repeats: the same thing again inside Config.EVENING.days gives repeat[1], then repeat[2] of it (state.evening.log).
 * Tomorrow's extra hour is state.player.rested (Week reads it, like `tired`); steadier work tomorrow is
 * state.player.steady (a day number: Stress.slip reads that day one zone better).
 * Streams: 'evening' (who you meet, which band turns up).
 */
SB.module('Evening', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var HOME = ['JOURNAL', 'WORKOUT', 'BED_EARLY', 'POST_PAGE', 'DIG_BANDS', 'STICKERS'];
  var OUT = ['SHOW', 'OPEN_MIC', 'DROP_BY', 'MARKET', 'FRIENDS', 'SHIFT'];
  var HELPS = ['SOUND', 'ARTIST', 'FLOOR', 'RUNNER', 'SECURITY'];      // door, sound, flyer art: people who can help a show
  var BETTER = { STRETCHED: 'STEADY', FRIED: 'STRETCHED', BURNING_OUT: 'FRIED' };
  var LOG_DAYS = 14;

  function cfg(type) { return C.EVENING[type]; }
  function has(k) { return SB.text.has('strings.' + k); }
  function L(k, slots, fb) { return has(k) ? SB.text.label(k, slots || {}) : (fb || ''); }
  function today(state) { return state.clock && typeof state.clock.day === 'number' ? state.clock.day : 0; }
  function tn(state) { return SB.Week.tonight(state); }
  function no(code, why) { return U.no(code, why || L('refuse.' + code, {}, code)); }
  function pack(state) { try { return SB.Cities.pack(state); } catch (e) { return null; } }
  function price(state, n) { var p = pack(state), k = p && p.money && typeof p.money.priceIndex === 'number' ? p.money.priceIndex : 1; return Math.round(n * k); }
  function personName(state, id) {
    var p = state.people && state.people[id];
    return p ? (p.nick || ((p.first || '') + (p.last ? ' ' + p.last : '')).trim()) : '';
  }
  function rng(state) { return SB.rng.stream(state, 'evening'); }

  /* ---- the log of what was done, for repeats and once-a-week ---- */
  function book(state) {
    if (!state.evening || typeof state.evening !== 'object') state.evening = { log: [] };
    if (!Array.isArray(state.evening.log)) state.evening.log = [];
    return state.evening;
  }
  function logOf(state) { return state.evening && Array.isArray(state.evening.log) ? state.evening.log : []; }
  function doneSince(state, type, key, days) {
    var d = today(state), n = 0;
    logOf(state).forEach(function (x) { if (x.t === type && (key == null || x.k === key) && d - x.day < days) n++; });
    return n;
  }
  function lastDay(state, type, key) {
    var best = null;
    logOf(state).forEach(function (x) { if (x.t === type && (key == null || x.k === key) && (best === null || x.day > best)) best = x.day; });
    return best;
  }
  function factorOf(state, type, key) {
    var R = C.EVENING.repeat, n;
    if (type === 'SHOW' || type === 'SHIFT') return 1;                 // the old jobs: a show and a shift give the same every time
    n = doneSince(state, type, type === 'DROP_BY' ? key : null, C.EVENING.days);
    return R[Math.min(R.length - 1, n)];
  }
  function remember(state, type, key) {
    var B = book(state), d = today(state);
    B.log.push({ t: type, k: key == null ? null : key, day: d });
    B.log = B.log.filter(function (x) { return d - x.day < LOG_DAYS; });
  }

  /* ---- who is around ---- */
  function knownRooms(state) {
    var out = [], k, r;
    for (k in (state.rooms || {})) {
      r = state.rooms[k];
      if (r && r.open !== false && r.ownerId && (r.ownerRel || 0) >= C.OWNER.stranger) out.push(r);
    }
    return out.sort(function (a, b) { return (b.ownerRel || 0) - (a.ownerRel || 0) || (a.id < b.id ? -1 : 1); });
  }
  function showsTonight(state) {
    var d = today(state);
    try { return SB.Rooms.otherShows(state, d, d) || []; } catch (e) { return []; }
  }
  function unmet(state, roles) {
    var out = [], k, p;
    for (k in (state.people || {})) {
      p = state.people[k];
      if (!p || (p.state && p.state !== E.PERSON_STATE.ACTIVE) || p.listed) continue;
      if (p.rel !== null && p.rel !== undefined) continue;
      if ((p.roles || []).some(function (r) { return roles.indexOf(r) >= 0; })) out.push(k);
    }
    return out.sort();
  }
  /* the friends who help: the circle, and anyone met who does sound, security, the door, errands, flyer art or a floor */
  function circleIds(state) {
    var c = null, ids = {}, k, p;
    try { c = SB.People.circle(state); } catch (e) { c = null; }
    ((c && c.people) || []).forEach(function (x) { var id = x.id || x.personId; if (id) ids[id] = true; });
    for (k in (state.people || {})) {
      p = state.people[k];
      if (!p || p.rel === null || p.rel === undefined || (p.state && p.state !== E.PERSON_STATE.ACTIVE) || p.listed) continue;
      if ((p.roles || []).some(function (r) { return HELPS.indexOf(r) >= 0 || r === 'LODGING'; })) ids[k] = true;
    }
    return Object.keys(ids).sort();
  }
  function localBands(state) {
    var out = [], k, b;
    for (k in (state.bands || {})) {
      b = state.bands[k];
      if (b && b.local && b.hid && (b.endedWeek === null || b.endedWeek === undefined)) out.push(b);
    }
    return out.sort(function (a, b2) { return a.id < b2.id ? -1 : 1; });
  }
  function drawEst(state, b) { var n = state.notebook && state.notebook.est; return n ? n['draw:' + b.id + ':city'] : null; }

  /* the job behind SHOW and SHIFT, still open, if one was made before */
  function openJob(state, type, key) {
    var id, j;
    for (id in (state.jobs || {})) {
      j = state.jobs[id];
      if (j && j.type === type && (key == null || j.key === key) && (j.status === 'TODO' || j.status === 'PLANNED')) return j;
    }
    return null;
  }

  /* ---- what is on offer tonight ---- */
  function offers(state) {
    var out = [], t = tn(state), shows = showsTonight(state);
    HOME.forEach(function (type) { out.push({ id: type, type: type, where: 'HOME', key: null }); });
    if (shows.length) shows.forEach(function (o) { out.push({ id: 'SHOW:' + o.id, type: 'SHOW', where: 'OUT', key: o.id, os: o }); });
    else out.push({ id: 'OPEN_MIC', type: 'OPEN_MIC', where: 'OUT', key: null });
    knownRooms(state).forEach(function (r) { out.push({ id: 'DROP_BY:' + r.id, type: 'DROP_BY', where: 'OUT', key: r.id, room: r }); });
    out.push({ id: 'MARKET', type: 'MARKET', where: 'OUT', key: t.off ? 'ART' : 'SHOP' });
    out.push({ id: 'FRIENDS', type: 'FRIENDS', where: 'OUT', key: null });
    out.push({ id: 'SHIFT', type: 'SHIFT', where: 'OUT', key: null });
    return out;
  }
  function find(state, id) {
    var list = offers(state), i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function hoursOf(state, o) {
    if (o.type === 'BED_EARLY') return 0;
    if (o.type === 'SHIFT') return C.JOBS.EXTRA_SHIFT.hours;
    if (o.type === 'SHOW') return C.JOBS.GO_TO_SHOW.hours;
    return cfg(o.type).hours;
  }
  function costOf(state, o) { return o.type === 'STICKERS' ? price(state, cfg('STICKERS').cost) : 0; }

  /* the checks: -> null when it can be done, else the refusal */
  function check(state, o) {
    var t, hours = hoursOf(state, o), c = cfg(o.type), last, fit, dj;
    if (state.clock.phase === E.PHASE.OVER) return no(E.REFUSE.OVER);
    if (!SB.Week.eveningOpen(state)) return no(E.REFUSE.PHASE, L('clock.nightOver', {}, L('refuse.PHASE')));
    t = tn(state);
    if (t.burnt) return no(E.REFUSE.BURNT_OUT);
    if (c && c.once === 'NIGHT' && lastDay(state, o.type, null) === today(state)) return no(E.REFUSE.ALREADY, L('evening.again.night'));
    if (c && c.once === 'WEEK') {
      last = lastDay(state, o.type, o.type === 'DROP_BY' ? o.key : null);
      if (last !== null && today(state) - last < C.EVENING.days)
        return no(E.REFUSE.ALREADY, L('evening.again.week', { day: SB.time.fmt(last + C.EVENING.days, 'dow') }));
    }
    if (o.type === 'SHIFT') {
      if (!t.off) return no(E.REFUSE.WINDOW, L('evening.SHIFT.offOnly'));
      dj = state.player.dayJob;
      if (!(state.settings && state.settings.bills) || !dj || dj === 'NONE') return no(E.REFUSE.INVALID, L('evening.SHIFT.noJob'));
    }
    if (o.type === 'SHOW' && openJob(state, 'GO_TO_SHOW', o.key) === null && doneSince(state, 'SHOW', o.key, 1)) return no(E.REFUSE.ALREADY);
    if (o.type === 'BED_EARLY' && t.left <= 0) return no(E.REFUSE.NO_TIME, L('evening.BED_EARLY.late'));
    if (costOf(state, o) > 0 && !SB.Money.canCover(state, costOf(state, o))) return no(E.REFUSE.NO_MONEY);
    if (hours > 0) { fit = SB.Week.fits(state, hours); if (!fit.ok) return fit; }
    return null;
  }

  function words(state, o, factor) {
    var slots = {}, t = tn(state), room, name, x = '', lbl, ben;
    if (o.type === 'SHOW') {
      room = o.os && o.os.roomId && state.rooms ? state.rooms[o.os.roomId] : null;
      slots.room = (room && room.name) || '';
      if (!slots.room) x = '.any';                                       // a room the player has no name for
    }
    if (o.type === 'DROP_BY') { slots.room = o.room.name; slots.name = personName(state, o.room.ownerId) || L('evening.DROP_BY.owner'); }
    if (o.type === 'SHIFT') { var p = pack(state); slots.pay = SB.text.money(p && p.money ? p.money.shiftPay || 0 : 0); }
    if (o.type === 'STICKERS') slots.cost = SB.text.money(costOf(state, o));
    if (o.type === 'MARKET') x = '.' + o.key;
    lbl = L('evening.' + o.type + x + '.label', slots, o.type);
    ben = L('evening.' + o.type + (o.type === 'SHOW' ? '' : x) + '.benefit', slots, '');
    if (o.type === 'JOURNAL' && t && SB.Stress.zone(state) !== 'STEADY') ben = L('evening.JOURNAL.benefitStretched', slots, ben);
    return { label: lbl, benefit: ben, note: factor < 1 ? L(factor >= 0.5 ? 'evening.repeat.half' : 'evening.repeat.quarter') : '' };
  }

  function view(state, o) {
    var factor = factorOf(state, o.type, o.key), r = check(state, o), w = words(state, o, factor);
    return { id: o.id, type: o.type, where: o.where, hours: hoursOf(state, o), cost: costOf(state, o), factor: factor,
             label: w.label, benefit: w.benefit, note: r && r.code === E.REFUSE.ALREADY ? '' : w.note, ok: !r, code: r ? r.code : null, why: r ? r.why : '' };
  }

  function list(state) {
    if (!state.week) return [];
    return offers(state).map(function (o) { return view(state, o); });
  }

  function can(state, id) {
    var o = find(state, id), r;
    if (!o) return no(E.REFUSE.INVALID);
    r = check(state, o);
    return r || U.yes({ hours: hoursOf(state, o), cost: costOf(state, o), factor: factorOf(state, o.type, o.key) });
  }

  /* ---- doing it ---- */
  function stressRec(state, d, k) {
    var before = state.player.stress;
    SB.Stress.add(state, d, k);
    return state.player.stress !== before && SB.Stress.record ? SB.Stress.record(state, state.player.stress - before, k) : null;
  }
  /* a few regulars in the player's own part of town, spread like the ones there already (evenly with none yet) */
  function regulars(state, n) {
    var R = state.regulars, zid = 'city', base, tot = 0, by = {}, G = E.GENRES.length;
    if (!(n > 0) || !R || !state.zones || !state.zones[zid]) return null;
    base = R.by && R.by[zid];
    if (base) base.forEach(function (row) { row.forEach(function (x) { tot += x; }); });
    by[zid] = [0, 1, 2].map(function (g) {
      var row = [], s;
      for (s = 0; s < G; s++) row.push(tot > 0 ? n * base[g][s] / tot : n * [0.3, 0.5, 0.2][g] / G);
      return row;
    });
    var won = SB.Crowd.addRegulars(state, by, 'EVENING');
    return { t: E.REC.REGULARS, day: today(state), half: 'NIGHT', showId: null, text: '', won: Math.round(won), lost: 0, total: Math.round(R.total || 0) };
  }
  function meetOne(state, roles) {
    var ids = unmet(state, roles), id, r;
    if (!ids.length) return null;
    id = rng(state).pick(ids);
    r = SB.People.meet(state, id, 'EVENING');
    return { id: id, rec: r };
  }
  function roleWord(state, id) {
    var p = state.people[id], r = (p.roles || []).filter(function (x) { return HELPS.indexOf(x) >= 0; })[0];
    return r ? L('evening.role.' + r, {}, r.toLowerCase()) : '';
  }
  /* the nights coming up at a room with nothing on them yet, Thursday to Saturday, as the owner would say them */
  function openNights(state, room) {
    var d0 = today(state) + 1, out = [], d, taken;
    for (d = d0; d < d0 + 21 && out.length < 3; d++) {
      if ([3, 4, 5].indexOf(SB.time.dow(d)) < 0) continue;              // Thursday to Saturday (SB.time.dow: 0 is Monday)
      taken = (state.otherShows || []).some(function (o) { return o.roomId === room.id && o.day === d; }) ||
              Object.keys(state.shows || {}).some(function (k) { var s = state.shows[k]; return s.roomId === room.id && s.day === d && s.status !== 'CANCELLED'; });
      if (!taken) out.push(SB.time.fmt(d, 'short'));
    }
    return out;
  }

  /* SHOW and SHIFT: the old free job, made if need be and done tonight through Week.doNow */
  function viaJob(state, type, args, key) {
    var j = openJob(state, type, key), made = false, r, d;
    if (!j) {
      r = SB.Week.addJob(state, type, args);
      if (!r || r.ok === false) return r;
      j = state.jobs[r.jobId]; made = true;
    }
    d = SB.Week.doNow(state, j.id, {});
    if (!d || d.ok === false) { if (made) SB.Week.removeJob(state, j.id); return d; }
    return d;
  }

  function doIt(state, id) {
    var o = find(state, id), refuse, c, f, hours, recs = [], text = '', spent, d, r, x, m, ids, b, est, slots = {}, n;
    if (!o) return no(E.REFUSE.INVALID);
    refuse = check(state, o);
    if (refuse) return refuse;
    c = cfg(o.type); f = factorOf(state, o.type, o.key); hours = hoursOf(state, o);
    function push(v) { if (v) recs.push(v); }

    if (o.type === 'SHOW' || o.type === 'SHIFT') {
      d = o.type === 'SHOW' ? viaJob(state, 'GO_TO_SHOW', { otherShowId: o.key }, o.key) : viaJob(state, 'EXTRA_SHIFT', {}, null);
      if (!d || d.ok === false) return d;
      remember(state, o.type, o.key);
      text = o.type === 'SHOW' ? L('evening.SHOW.done', { what: words(state, o, 1).label.replace(/^Go to /, '') }) : L('evening.SHIFT.done');
      x = { t: E.REC.EVENING, day: today(state), half: 'NIGHT', showId: null, text: text, act: o.type, key: o.key, factor: 1 };
      SB.Week.log(state, [x]);
      return U.yes({ records: (d.records || []).concat([x]), text: text, hours: d.hours, factor: 1, callNight: false });
    }

    if (hours > 0) {
      spent = SB.Week.spend(state, hours);
      if (!spent || spent.ok === false) return spent;
      recs = recs.concat(spent.records || []);
    }
    if (o.type === 'STICKERS') SB.Money.spend(state, costOf(state, o), 'PROMO', L('evening.STICKERS.memo', {}, 'stickers'), {});

    switch (o.type) {
      case 'JOURNAL':
        n = c.stress * (SB.Stress.zone(state) !== 'STEADY' ? c.stretchedX : 1) * f;
        push(stressRec(state, n, 'JOURNAL'));
        text = L('evening.JOURNAL.done');
        break;
      case 'WORKOUT':
        push(stressRec(state, c.stress * f, 'WORKOUT'));
        state.player.steady = today(state) + 1;
        text = L('evening.WORKOUT.done');
        break;
      case 'BED_EARLY':
        push(stressRec(state, c.stress * f, 'SLEPT'));
        n = U.round(c.rested * f, 2);
        x = state.player.rested;
        state.player.rested = { day: today(state) + 1, hours: U.round((x && x.day === today(state) + 1 ? x.hours : 0) + n, 2) };
        if (SB.Week.rest) SB.Week.rest(state);
        text = L('evening.BED_EARLY.done', { hours: n >= 1 ? L('clock.one', {}, 'an hour') : L('clock.half', {}, 'half an hour') });
        break;
      case 'POST_PAGE':
        n = Math.max(1, Math.round(c.followers * f));
        SB.Game.adjustFollowers(state, n, 'POST');
        text = L('evening.POST_PAGE.done', { n: n });
        break;
      case 'DIG_BANDS':
        ids = localBands(state);
        m = ids.filter(function (bb) { var e = drawEst(state, bb); return e && !e.n; });        // never heard a thing about them
        if (m.length) { b = rng(state).pick(m); slots.fresh = true; }
        else {
          b = null;
          ids.forEach(function (bb) { var e = drawEst(state, bb); if (e && (!b || (e.hi - e.lo) > (drawEst(state, b).hi - drawEst(state, b).lo))) b = bb; });
        }
        if (!b) { text = L('evening.DIG_BANDS.nothing'); break; }
        r = SB.Notebook.narrow(state, 'draw:' + b.id + ':city', 1 - (1 - c.narrow) * f, 'TOLD');
        est = drawEst(state, b);
        if (est && !est.n) est.n = 1;                                                               // known now, even if the range held
        if (r) push({ t: E.REC.NOTE, day: today(state), half: 'NIGHT', showId: null, text: r.text || '', learned: r });
        text = L(slots.fresh ? 'evening.DIG_BANDS.found' : 'evening.DIG_BANDS.done', { band: b.name });
        break;
      case 'STICKERS':
        push(SB.Territory.adjustWord(state, c.word * f, 'STICKERS'));
        push(regulars(state, c.regulars * f));
        text = L('evening.STICKERS.done');
        break;
      case 'OPEN_MIC':
        push(stressRec(state, c.stress * f, 'WENT_OUT'));
        push(regulars(state, c.regulars * f));
        m = f >= 1 ? meetOne(state, ['MUSICIAN', 'REGULAR'].concat(HELPS)) : null;
        if (m) push(m.rec);
        text = m ? L('evening.OPEN_MIC.met', { name: personName(state, m.id) }) : L('evening.OPEN_MIC.done');
        break;
      case 'DROP_BY':
        push(SB.Rooms.adjustRel(state, o.room.id, c.ownerRel * f, 'DROP_BY'));
        n = openNights(state, o.room);
        text = L('evening.DROP_BY.done', { name: personName(state, o.room.ownerId) || L('evening.DROP_BY.owner') }) +
               (n.length ? ' ' + L('evening.DROP_BY.open', { nights: n.join(', ') }) : '');
        break;
      case 'MARKET':
        push(regulars(state, c.regulars * f));
        m = f >= 1 ? meetOne(state, HELPS) : null;
        if (!m && f >= 1) m = meetOne(state, ['REGULAR', 'MUSICIAN']);
        if (m) push(m.rec);
        x = m ? roleWord(state, m.id) : '';
        text = m ? L(x ? 'evening.MARKET.metHelp' : 'evening.MARKET.met', { name: personName(state, m.id), role: x }) : L('evening.MARKET.done');
        break;
      case 'FRIENDS':
        push(stressRec(state, c.stress * f, 'FRIENDS'));
        ids = circleIds(state);
        ids.forEach(function (pid) { push(SB.People.adjust(state, pid, Math.max(1, Math.round(c.rel * f)), 'FRIENDS')); });
        text = L(ids.length ? 'evening.FRIENDS.done' : 'evening.FRIENDS.alone');
        break;
    }
    remember(state, o.type, o.type === 'DROP_BY' ? o.key : null);
    if (f < 1 && text) text += ' ' + L(f >= 0.5 ? 'evening.repeat.halfDone' : 'evening.repeat.quarterDone');
    x = { t: E.REC.EVENING, day: today(state), half: 'NIGHT', showId: null, text: text, act: o.type, key: o.key, factor: f };
    recs.push(x);
    SB.Week.log(state, recs.filter(function (q) { return q && typeof q.n !== 'number'; }));
    return U.yes({ records: recs, text: text, hours: hours, factor: f, callNight: o.type === 'BED_EARLY' });
  }

  /* Stress.slip reads this: a day after a workout, work is done one zone steadier */
  function steadier(state, zone) {
    return state.player && state.player.steady === today(state) && BETTER[zone] ? BETTER[zone] : zone;
  }

  return { list: list, can: can, doIt: doIt, steadier: steadier };
});
