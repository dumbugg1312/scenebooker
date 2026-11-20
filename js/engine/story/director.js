/* Scene Booker — engine/story/director.js
 * SB.Director: the opening and its scripted first month, the week director (budgets, tiers, quiet weeks), binding and
 * rendering of content events, the stops of a show night, and the risks line. Owner: E4.
 * Spec: design/spec/02-engine.md 4b, 5.1, 5.6; 03-content.md 8 and 10; mechanics 3.6 and 3.7.
 * Streams: DIRECTOR (the week), 'show:' + showId (which risks of a night come up, 00-overview 6.3).
 */
SB.module('Director', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util, D = C.DIRECTOR;
  var AT_ORDER = ['DOORS', 'SET:1', 'CHANGEOVER', 'SET:PEAK', 'LATE', 'SETTLE'];
  var RAISED_ELSEWHERE = { DOORS: 1, COUNT: 1, DEAL_DISPUTE: 1, HOLD_CHALLENGED: 1, TOUR_CANCELLED: 1 };
  var TIER_RANK = { GENTLE: 0, REAL: 1, HARD: 2 };
  // SPEC?: a night event with no `risk` has no chance in 03-content 8.1; it comes up with this chance times its weight.
  var NIGHT_P_NO_RISK = 0.1;
  // SPEC?: BAND_DROPS is raised "by a band's reliability" with no rate given: (1 - rel) times this, per band per week.
  var BAND_DROP_K = 0.15;

  /* The scripted first month of 03-content 10, used when SB.Content.legacy.opening.script is absent. */
  var DEFAULT_SCRIPT = [
    { week: 0, day: 0, post: 'REQUEST', template: 'CAREFUL', first: true, from: 'PEER', dates: [31, 32], ask: 'DOOR' },
    { week: 0, day: 0, post: 'LOCAL', path: 'people.band.FIRST_ASK', band: 'CLOSER' },
    { week: 0, day: 0, post: 'REQUEST', template: 'MASS' },
    { week: 0, day: 0, post: 'OWNER', path: 'people.owner.HOST.HELLO' },
    { week: 0, day: 2, post: 'LOCAL', path: 'people.band.FIRST_ASK', band: 'KIDS_OPENER' },
    { week: 1, event: 'SOUND_GOT_A_GIG' },
    { week: 3, day: 0, post: 'REQUEST', template: 'OVERSELL', calendar: 'ANY', ask: 'GUARANTEE' },
    { week: 3, day: 0, post: 'CONTACT', path: 'people.contact.OUTGOING.NUDGE' },
    { week: 5, day: 0, post: 'REQUEST', template: 'SWAP', from: 'PEER', dates: [66, 67], cross: 'CAREFUL' },
    { week: 6, day: 1, post: 'REQUEST', template: 'FRIEND', from: 'SWAP_CIRCLE', if: 'SWAP_HOST_OK' },
    { week: 9, day: 0, post: 'REQUEST', template: 'RESCUE', lead: [5, 6] }
  ];

  /* ---------------- small helpers ---------------- */

  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function rng(state) { return SB.rng.stream(state, E.STREAM.DIRECTOR); }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function isArr(x) { return Array.isArray(x); }

  function dir(state) {
    var d = state.director = state.director || {};
    if (!isArr(d.queue)) d.queue = [];
    if (!isArr(d.followups)) d.followups = [];
    if (!d.used || typeof d.used !== 'object') d.used = {};
    if (d.lastHardWeek === undefined) d.lastHardWeek = null;
    if (d.quietWeek === undefined) d.quietWeek = null;
    if (d.opening === undefined) d.opening = null;
    if (!isArr(d.later)) d.later = [];          // postponed posts: { day, what: 'SCRIPT' | 'MESSAGE' | 'LOCAL', ... }
    if (!d.live || typeof d.live !== 'object') d.live = {};   // decision id -> { eventId, bind, showId } until resolved
    return d;
  }

  function pack(state) {
    if (!SB.Cities || !state.citySlug || (SB.Cities.isLoaded && !SB.Cities.isLoaded(state.citySlug))) return null;
    return SB.Cities.pack(state);
  }

  function render(node, slots, state) {
    if (SB.text.off || node === undefined || node === null) return '';
    if (typeof node === 'string') return SB.text.render(node, slots, textRng(state));
    if (isArr(node)) { var ok = node.filter(function (n) { return typeof n === 'string' || (n && typeof n.t === 'string'); }); if (!ok.length) return ''; var n = textRng(state).pick(ok); return SB.text.render(typeof n === 'string' ? n : n.t, slots, textRng(state)); }
    if (typeof node.t === 'string') return SB.text.render(node.t, slots, textRng(state));
    return '';
  }

  function line(state, path, slots) { return SB.text.has(path) ? SB.text.line(path, slots, textRng(state)) : ''; }

  function personName(state, id) {
    var p = id && state.people && state.people[id];
    return p ? [p.first, p.last].filter(Boolean).join(' ') : '';
  }
  function firstName(state, id) { var p = id && state.people && state.people[id]; return p ? p.first || '' : ''; }

  function liveShows(state) {
    return Object.keys(state.shows || {}).map(function (id) { return state.shows[id]; })
      .filter(function (s) { return s && (s.status === E.SHOW.DRAFT || s.status === E.SHOW.CONFIRMED) && s.day >= today(state); })
      .sort(function (a, b) { return a.day - b.day; });
  }

  function slotsOf(show) { return show && show.bill && show.bill.slots ? show.bill.slots : []; }

  /* ---------------- events: the catalogue ---------------- */

  function events(state) {
    var gen = isArr(SB.Content.events) ? SB.Content.events : [], p = pack(state), city = (p && isArr(p.events)) ? p.events : [];
    var replaced = {};
    city.forEach(function (e) { if (e.replaces) replaced[e.replaces] = true; });
    return { general: gen.filter(function (e) { return !replaced[e.id]; }), city: city };
  }

  function eventById(state, id) {
    var all = events(state), i, l = all.general.concat(all.city);
    for (i = 0; i < l.length; i++) if (l[i].id === id) return l[i];
    var gen = isArr(SB.Content.events) ? SB.Content.events : [];
    for (i = 0; i < gen.length; i++) if (gen[i].id === id) return gen[i];
    return null;
  }

  /* ---------------- binding (03-content 8.2) ---------------- */

  function refsFromShow(state, show) {
    var b = { show: show.id }, s = slotsOf(show), room = show.roomId && state.rooms ? state.rooms[show.roomId] : null, i;
    for (i = 0; i < s.length; i++) {
      if (s[i].role === E.BILL_ROLE.TOURING && !b.touring) b.touring = s[i].bandId;
      if (s[i].role === E.BILL_ROLE.LOCAL && !b.band) b.band = s[i].bandId;
    }
    if (s.length) { b.opener = s[0].bandId; b.closer = s[s.length - 1].bandId; }
    if (room) { b.room = room.id; if (room.ownerId) b.owner = room.ownerId; }
    ['sound', 'security', 'floor'].forEach(function (k) { if (show.crew && show.crew[k] && show.crew[k] !== 'player') b[k] = show.crew[k]; });
    if (show.zoneId) b.zone = show.zoneId;
    return b;
  }

  function metPeople(state, pred) {
    return Object.keys(state.people || {}).filter(function (id) {
      var p = state.people[id];
      return p && (!p.state || p.state === 'ACTIVE') && p.met !== null && p.met !== undefined && (!pred || pred(p));
    });
  }

  function candidates(state, ref, ev, show) {
    var ids = [];
    switch (ref) {
      case 'owner':
        Object.keys(state.rooms || {}).forEach(function (id) { var r = state.rooms[id]; if (r.open !== false && r.ownerId && (r.playerShows || 0) > 0) ids.push(r.ownerId); });
        if (!ids.length) Object.keys(state.rooms || {}).forEach(function (id) { var r = state.rooms[id]; if (r.open !== false && r.ownerId && (r.ownerRel || 0) > C.OWNER.start) ids.push(r.ownerId); });
        return ids;
      case 'room':
        return Object.keys(state.rooms || {}).filter(function (id) { var r = state.rooms[id]; return r.open !== false && ((r.playerShows || 0) > 0 || (r.ownerRel || 0) > C.OWNER.start); });
      case 'band':
        return Object.keys(state.bands || {}).filter(function (id) { var b = state.bands[id]; return b.local && b.stage !== 'ENDED' && (b.shows || []).length > 0; });
      case 'helper':
        return SB.People.circle(state).people.map(function (p) { return p.id; });
      case 'booker':
        return Object.keys(state.bookers || {}).filter(function (id) { var p = state.people && state.people[id]; return state.bookers[id].active !== false && p && p.met !== null && p.met !== undefined; });
      case 'contact':
        return Object.keys(state.contacts || {}).filter(function (id) { var p = state.people && state.people[id]; return (p && p.met !== null && p.met !== undefined) || (state.contacts[id].strength || 0) >= C.CONTACT.weakUnder; });
      case 'person':
        if (ev && ev.if && ev.if.onList) {
          var onBill = {};
          slotsOf(show).forEach(function (s) { var b = state.bands[s.bandId]; (b && b.members || []).forEach(function (m) { onBill[m.personId] = true; }); });
          return Object.keys(state.people || {}).filter(function (id) { var p = state.people[id]; return p.listed && (!p.state || p.state === 'ACTIVE') && !onBill[id]; });
        }
        // SPEC?: "has been to five of the player's shows" is not counted anywhere; a regular face, or someone met, not yet helping.
        ids = ((state.regulars && state.regulars.faces) || []).filter(function (id) { var p = state.people && state.people[id]; return p && !p.listed; });
        if (!ids.length) ids = metPeople(state, function (p) { return !p.listed && (p.roles || []).indexOf('OWNER') < 0; });
        var inCircle = {};
        SB.People.circle(state).people.forEach(function (p) { inCircle[p.id] = true; });
        return ids.filter(function (id) { return !inCircle[id]; });
      case 'regular':
        return ((state.regulars && state.regulars.faces) || []).filter(function (id) { return state.people && state.people[id]; });
      case 'zone':
        return Object.keys(state.zones || {}).filter(function (id) { return state.zones[id].kind !== 'PEER'; });
    }
    return [];
  }

  function condsNaming(conds, ref) {
    var o = {}, k, any = false;
    for (k in conds || {}) if (conds[k] && typeof conds[k] === 'object' && !isArr(conds[k]) && conds[k].who === '$' + ref) { o[k] = conds[k]; any = true; }
    return any ? o : null;
  }

  function newName(state) {
    var f = SB.Content.names && SB.Content.names.first, g = E.GEN_KEY[rng(state).int(0, 2)];
    var l = f && isArr(f[g]) ? f[g] : [];
    return l.length ? rng(state).pick(l) : '';
  }

  function needsShow(ev) {
    var k;
    if ((ev.bind || []).indexOf('show') >= 0) return true;
    for (k in ev.if || {}) if (['daysOut', 'roomKind', 'outdoor', 'ages', 'jobDone', 'jobNotDone', 'hasCrew', 'deal', 'written', 'label', 'bands', 'slot'].indexOf(k) >= 0) return true;
    return (ev.bind || []).some(function (r) { return ['touring', 'closer', 'opener', 'sound', 'security', 'floor'].indexOf(r) >= 0; });
  }

  /* Bind an event. opts = { show: Show (night: that show only), scripted, skipIf }. Returns { bind, showId } or null. */
  function bindEvent(state, ev, opts) {
    opts = opts || {};
    var shows, i, b, ok, conds = ev.if || {}, k;
    if (opts.skipIf) { conds = {}; for (k in ev.if || {}) if (k !== 'daysOut') conds[k] = ev.if[k]; }
    if (opts.show || needsShow(ev)) {
      shows = opts.show ? [opts.show] : liveShows(state);
      for (i = 0; i < shows.length; i++) {
        b = refsFromShow(state, shows[i]);
        if (!fillRefs(state, ev, b, shows[i], conds)) continue;
        ok = (ev.bind || []).every(function (r) { return r === 'show' || !!b[r]; });
        if (!ok) continue;
        b.new = newName(state);
        if (SB.Effects.test(state, conds, { show: shows[i], bind: b, night: !!opts.show })) return { bind: b, showId: shows[i].id };
      }
      return null;
    }
    b = {};
    if (!fillRefs(state, ev, b, null, conds)) return null;
    b.new = newName(state);
    return SB.Effects.test(state, conds, { show: null, bind: b }) ? { bind: b, showId: null } : null;
  }

  /* Fill the refs the event lists that the show did not give. False when one cannot be filled. */
  function fillRefs(state, ev, b, show, conds) {
    var refs = ev.bind || [], i, ref, cands, part, r;
    for (i = 0; i < refs.length; i++) {
      ref = refs[i];
      if (ref === 'show' || b[ref]) continue;
      cands = candidates(state, ref, ev, show);
      part = condsNaming(conds, ref);
      if (part) cands = cands.filter(function (id) { var t = U.copy(b); t[ref] = id; return SB.Effects.test(state, part, { show: show, bind: t }); });
      if (!cands.length) return false;
      r = rng(state).pick(cands);
      b[ref] = r;
      if (ref === 'owner' && !b.room) Object.keys(state.rooms || {}).forEach(function (id) { if (state.rooms[id].ownerId === r && !b.room) b.room = id; });
    }
    return true;
  }

  /* ---------------- decisions ---------------- */

  function buildDecision(state, ev, bound, kind, at, day, half, extra) {
    var d = dir(state), id = U.newId(state, 'd'), ctx = { show: bound.showId, bind: bound.bind, night: kind !== E.DECISION.INTERRUPT, extra: extra || null };
    var sl = SB.Effects.slots(state, ctx);
    if (typeof at === 'number') sl.t = SB.time.clock(at);
    var options = (ev.options || []).map(function (o) {
      var en = o.needs ? SB.Effects.test(state, o.needs, ctx) : true;
      return { id: o.id, label: render(o.label, sl, state), likely: render(o.likely || '', sl, state),
               costs: SB.Effects.preview(state, o.effects || [], ctx), enabled: en,
               why: en ? null : SB.Effects.why(state, o.needs, ctx) };
    });
    if (options.length && !options.some(function (o) { return o.enabled; })) { options[0].enabled = true; options[0].why = null; }
    d.live[id] = { eventId: ev.id, bind: bound.bind, showId: bound.showId };
    return { id: id, kind: kind, eventId: ev.id, showId: bound.showId || null, day: day, half: half,
             at: typeof at === 'number' ? at : null, tier: ev.tier || null,
             title: render(ev.title, sl, state), body: render(ev.body, sl, state), options: options };
  }

  function resolve(state, decision, optionId) {
    if (!decision || typeof decision !== 'object') SB.fail('Director.resolve', 'decision must be a Decision');
    var d = dir(state), live = d.live[decision.id] || { eventId: decision.eventId, bind: {}, showId: decision.showId };
    var ev = eventById(state, live.eventId);
    if (!ev) SB.fail('Director.resolve', 'no event "' + live.eventId + '"');
    var opt = (ev.options || []).filter(function (o) { return o.id === optionId; })[0];
    if (!opt) SB.fail('Director.resolve', 'event ' + ev.id + ' has no option "' + optionId + '"');
    if (live.showId && !(state.shows && state.shows[live.showId])) live.showId = null;
    var ctx = { show: live.showId, bind: live.bind || {}, night: decision.kind !== E.DECISION.INTERRUPT, out: {} };
    var chips = SB.Effects.preview(state, opt.effects || [], ctx);
    var records = SB.Effects.apply(state, opt.effects || [], ctx);
    var sl = SB.Effects.slots(state, ctx);
    var text = ctx.out.text || render(opt.result || '', sl, state);
    records.push({ t: E.REC.CHOICE, day: today(state), half: (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY',
                   showId: live.showId || null, text: SB.text.off ? '' : text,
                   decisionId: decision.id, eventId: ev.id, optionId: optionId, chips: chips });
    delete d.live[decision.id];
    if (live.showId && SB.Moments && SB.Moments.note) SB.Moments.note(state, live.showId, ev.id, optionId);   // a week choice about a show, for its night's moment
    return records;
  }

  /* ---------------- the opening ---------------- */

  function script(state) {
    var o = SB.Content.legacy && SB.Content.legacy.opening;
    return o && isArr(o.script) && o.script.length ? o.script : DEFAULT_SCRIPT;
  }

  function startRoom(state) {
    var p = pack(state), packId = null, ids = Object.keys(state.rooms || {}), i;
    if (p && isArr(p.rooms)) p.rooms.forEach(function (r) { if (r.start && !packId) packId = r.id; });
    for (i = 0; i < ids.length; i++) if (packId && state.rooms[ids[i]].packId === packId) return state.rooms[ids[i]];
    for (i = 0; i < ids.length; i++) if (state.rooms[ids[i]].kind === 'HOUSE') return state.rooms[ids[i]];
    return ids.length ? state.rooms[ids[0]] : null;
  }

  function withRole(state, role) {
    var ids = Object.keys(state.people || {}), i;
    for (i = 0; i < ids.length; i++) if ((state.people[ids[i]].roles || []).indexOf(role) >= 0) return ids[i];
    return null;
  }

  /* what the person really charges (people[id].rate), the pack's figure only when there is none */
  function rateOf(state, id, dflt) {
    var p = id && state.people ? state.people[id] : null;
    return p && typeof p.rate === 'number' && p.rate === p.rate ? p.rate : dflt;
  }

  function opening(state) {
    var d = dir(state), p = pack(state), room = startRoom(state), out = withRole(state, 'OUTGOING');
    var sound = withRole(state, 'SOUND'), security = withRole(state, 'SECURITY'), host = room ? room.ownerId : null;
    var cast = (p && p.cast) || {}, sl = {
      outgoing: firstName(state, out), outgoingInitial: firstName(state, out).charAt(0),
      bigCity: p && p.whereGo && p.whereGo[0] ? p.whereGo[0].name : '',
      sound: firstName(state, sound), soundRate: rateOf(state, sound, cast.soundRate || C.PAY.SOUND[0]),
      security: firstName(state, security), securityRate: rateOf(state, security, cast.securityRate || C.PAY.SECURITY[0]),
      host: firstName(state, host), room: room ? room.name : '', curfew: room ? SB.time.clock(room.curfew) : ''
    };
    var h = 'legacy.opening.handoff';
    SB.Effects.post(state, { kind: E.MSG.HANDOFF, fromId: out, fromName: personName(state, out),
                             subject: line(state, h + '.subject', sl), body: line(state, h + '.body', sl), needs: false, keep: true });
    var notes = SB.Content.legacy && SB.Content.legacy.opening && isArr(SB.Content.legacy.opening.notes) ? SB.Content.legacy.opening.notes : [];
    notes.forEach(function (n, i) {
      var t = SB.text.off ? '' : render(n, sl, state);
      SB.Notebook.addNote(state, { page: 'HOW', title: t, body: '', conf: E.CONF.RUMOR, from: out, week: 0, pinned: false });
    });
    /* the handoff introduces the host of the room it hands over: the booker knows them from day one, like sound and security */
    if (host && state.people && state.people[host] && (state.people[host].met === null || state.people[host].met === undefined)) SB.People.meet(state, host, 'HANDOFF');
    d.opening = 0;
    d.cast = { outgoing: out, sound: sound, security: security, host: host, roomId: room ? room.id : null };
    runScript(state, week(state));
  }

  /* Move script entries of weeks up to w out of the script: post day-0 ones now, the rest when their day comes. */
  function runScript(state, w) {
    var d = dir(state), sc = script(state), e, day;
    if (d.opening === null || d.opening === undefined) return;
    while (d.opening < sc.length && sc[d.opening].week <= w) {
      e = sc[d.opening];
      day = e.week * 7 + (e.day || 0);
      if (e.event) {
        day = e.week * 7 + (e.day === undefined ? 1 : e.day);
        d.queue.push({ id: U.newId(state, 'd'), eventId: e.event, day: Math.max(day, today(state)), half: 'NIGHT', bind: null, scripted: true });
      } else if (day <= today(state)) scriptPost(state, e);
      else d.later.push({ day: day, what: 'SCRIPT', idx: d.opening });
      d.opening++;
    }
    if (d.opening >= sc.length) d.opening = null;
  }

  function peerPlace(state) {
    var p = pack(state), z = null, e;
    ((p && p.zones) || []).forEach(function (x) { if (x.kind === 'PEER' && !z) z = x; });
    if (!z) return null;
    e = z.slug && SB.Cities.entry ? SB.Cities.entry(z.slug) : null;
    return { slug: z.slug || null, name: z.name, state: z.state || (e && e.state) || '', lat: e ? e.lat : null, lon: e ? e.lon : null };
  }

  function localBand(state, which) {
    var ids = Object.keys(state.bands || {}).filter(function (id) { var b = state.bands[id]; return b.local && b.stage !== 'ENDED' && b.zoneId === 'city'; });
    if (!ids.length) ids = Object.keys(state.bands || {}).filter(function (id) { return state.bands[id].local; });
    if (!ids.length) return null;
    var d = dir(state), used = d.cast && d.cast.closer ? d.cast.closer : null;
    function ageOf(id) {
      var ms = state.bands[id].members || [], gs = ms.map(function (m) { var p = state.people && state.people[m.personId]; return p ? p.gen : 1; });
      return gs.length ? U.mean(gs) : 1;
    }
    if (which === 'KIDS_OPENER') {
      var kids = ids.filter(function (id) { return id !== used && ageOf(id) < .5; });
      return kids.length ? kids[0] : ids.filter(function (id) { return id !== used; }).slice(-1)[0] || ids[0];
    }
    var best = null;
    ids.forEach(function (id) {
      var t = SB.Bands.tier(state, state.bands[id], 'city');
      if (best === null || t > best.t) best = { id: id, t: t };
    });
    d.cast = d.cast || {};
    d.cast.closer = best.id;
    return best.id;
  }

  function weekendNear(state, from, to, wantCalendar) {
    var day, firstSat = null;
    for (day = from; day <= to; day++) {
      var dow = SB.time.dow(day);
      if (dow !== 4 && dow !== 5) continue;
      if (firstSat === null && dow === 5) firstSat = day;
      if (wantCalendar && SB.Effects.calendarEntry(state, 'ANY', day)) return day;
    }
    return firstSat === null ? from : firstSat;
  }

  function scriptPost(state, e) {
    var d = dir(state), day = today(state), spec, res, swapBand, swap, host, from;
    if (e.post === 'REQUEST') {
      /* The spec is the shape SB.Requests.create documents (E3b). */
      spec = { kind: E.REQ_KIND.COLD, template: e.template };
      if (e.first) {
        /* the first show (the walkthrough's): a touring band from the next town over writes the player directly */
        spec.from = 'PEER';
        spec.home = peerPlace(state);
        spec.tier = 1;
      } else if (e.template === 'SWAP') {
        spec.kind = E.REQ_KIND.SWAP;
        spec.from = 'PEER';
        spec.home = peerPlace(state);
        spec.tier = 1;
        spec.dates = (e.dates || [31, 32]).slice();
        Object.keys(state.contacts || {}).forEach(function (id) {
          var c = state.contacts[id];
          if (!spec.fromId && spec.home && c.place && (c.place.slug === spec.home.slug || c.place.name === spec.home.name)) spec.fromId = id;
        });
      } else if (e.template === 'OVERSELL') {
        spec.calendar = e.calendar || null;
        spec.dates = [weekendNear(state, day + 21, day + 56, e.calendar === 'ANY')];
        if (e.ask) spec.ask = e.ask;
      } else if (e.template === 'FRIEND') {
        if (e.if === 'SWAP_HOST_OK' && !swapHostOk(state)) return [];
        spec.kind = E.REQ_KIND.REFERRAL;
        spec.from = 'SWAP_CIRCLE';
        swap = firstReq(state);
        swapBand = swap && state.bands ? state.bands[swap.bandId] : null;
        if (swapBand && isArr(swapBand.circle) && swapBand.circle.length && state.bands[swapBand.circle[0]]) spec.bandId = swapBand.circle[0];
        else if (swapBand && swapBand.place) spec.home = swapBand.place;
        spec.referrerId = swapBand ? swapBand.contactId || null : null;
      } else if (e.template === 'RESCUE') {
        spec.kind = E.REQ_KIND.RESCUE;
        spec.lead = (e.lead || [5, 6]).slice();
      }
      if (e.dates && !spec.dates) spec.dates = e.dates.slice();
      if (e.lead && !spec.lead) spec.lead = e.lead.slice();
      res = SB.Effects.request(state, spec);
      if (e.first) d.firstRequestId = res.requestId;
      else if (e.template === 'SWAP') d.swapRequestId = res.requestId;
      return res.records;
    }
    if (e.post === 'LOCAL') {
      from = localBand(state, e.band);
      if (!from) return [];
      var b = state.bands[from];
      return [SB.Effects.post(state, { kind: E.MSG.BAND, fromId: b.contactId || null, fromName: b.name,
        subject: b.name, body: line(state, SB.Effects.textPath(state, e.path, b.contactId), { band: b.name, date: SB.time.date(31).d, dow: SB.time.fmt(31, 'dow') }),
        needs: false, refs: { bandId: from } })];
    }
    if (e.post === 'OWNER') {
      host = d.cast && d.cast.host;
      var room = d.cast && d.cast.roomId && state.rooms ? state.rooms[d.cast.roomId] : null;
      return [SB.Effects.post(state, { kind: E.MSG.ROOM, fromId: host, fromName: personName(state, host),
        subject: room ? room.name : '', body: line(state, SB.Effects.textPath(state, e.path, host), { room: room ? room.name : '', curfew: room ? SB.time.clock(room.curfew) : '',
                                                                       outgoing: firstName(state, d.cast && d.cast.outgoing) }), needs: false })];
    }
    if (e.post === 'CONTACT') {
      from = d.cast && d.cast.outgoing;
      return [SB.Effects.post(state, { kind: E.MSG.CONTACT, fromId: from, fromName: personName(state, from),
        subject: '', body: line(state, SB.Effects.textPath(state, e.path, from), { outgoing: firstName(state, from) }), needs: false })];
    }
    return [];
  }

  /* the first show's request: the band that wrote on day one (an older save: the opening's swap) */
  function firstReqId(state) { var d = dir(state); return d.firstRequestId || d.swapRequestId || null; }
  function firstReq(state) { var id = firstReqId(state); return id && state.requests ? state.requests[id] || null : null; }

  function swapHostOk(state) {
    var q = firstReq(state), s;
    if (!q || !q.showId || !state.shows) return false;
    s = state.shows[q.showId];
    if (!s || s.status !== E.SHOW.PLAYED || !s.result || !s.result.hostScores) return false;
    var h = s.result.hostScores[q.bandId];
    return typeof h === 'number' && h >= 0;
  }

  /* ---------------- the week ---------------- */

  function showsInFlight(state) { return liveShows(state).length; }

  function eligibleWeek(state, ev, w, tiers) {
    var d = dir(state);
    if (ev.when !== 'WEEK' && ev.when !== 'EITHER') return false;
    if (RAISED_ELSEWHERE[ev.id]) return false;
    if (tiers.indexOf(ev.tier || 'GENTLE') < 0) return false;
    if (typeof d.used[ev.id] === 'number' && w - d.used[ev.id] < (ev.cooldown || 0)) return false;
    if (d.queue.some(function (q) { return q.eventId === ev.id; })) return false;
    return true;
  }

  /* Extra gates for events the engine raises from the world (03-content 8.5). */
  function engineGate(state, ev, bound) {
    var r = rng(state), show = bound && bound.showId && state.shows ? state.shows[bound.showId] : null, p = pack(state), m, st, b;
    if (ev.id === 'STORM_WATCH' || /_STORM_WATCH$/.test(ev.id)) {
      st = p && p.weather && p.weather.storm;
      if (!st) return false;
      m = SB.time.month(today(state));
      if ((st.months || []).indexOf(m) < 0) return false;
      return r.chance((st.peak || []).indexOf(m) >= 0 ? (st.perWeekPeak || 0) : (st.perWeek || 0));
    }
    if (ev.id === 'ROOM_FORGOT') {
      var adv = show && (show.prep && show.prep.advance);
      return r.chance(adv ? C.INCIDENTS.ROOM_FORGOT.advanced : C.INCIDENTS.ROOM_FORGOT.p);
    }
    if (ev.id === 'BAND_DROPS') {
      b = bound && bound.bind && (bound.bind.band || bound.bind.closer);
      var rel = b && state.bands && state.bands[b] && state.bands[b].hid && typeof state.bands[b].hid.rel === 'number' ? state.bands[b].hid.rel : .8;
      return r.chance((1 - rel) * BAND_DROP_K);
    }
    return true;
  }

  function planWeek(state) {
    var d = dir(state), w = week(state), start = w * 7, end = start + 6, r = rng(state), i;
    d.queue = d.queue.filter(function (q) { return q.day >= today(state); });
    runScript(state, w);
    /* follow-ups that fall this week */
    d.followups = d.followups.filter(function (f) {
      if (f.day > end) return true;
      if (r.chance(f.p === undefined ? 1 : f.p)) d.queue.push({ id: U.newId(state, 'd'), eventId: f.eventId, day: Math.max(f.day, today(state)), half: r.chance(.5) ? 'DAY' : 'NIGHT', bind: f.bind || null, followup: true });
      return false;
    });
    if (d.quietWeek === w || w === 0) return;
    var budget = Math.min(D.minorMax, D.minor + Math.floor(showsInFlight(state) / 2) * D.minorPerTwoShows);
    budget -= d.queue.filter(function (q) { return q.day >= start && q.day <= end; }).length;
    var tiers = w < D.gentleOnlyBeforeWeek ? ['GENTLE'] : ['GENTLE', 'REAL'];
    var hardOk = w >= D.hardNotBeforeWeek && !(D.hardNeverTwoWeeksRunning && d.lastHardWeek !== null && w - d.lastHardWeek <= 1);
    if (hardOk) tiers.push('HARD');
    var hardUsed = 0, all = events(state), takenDays = {};
    d.queue.forEach(function (q) { takenDays[q.day + q.half] = true; });
    for (i = 0; i < budget; i++) {
      var useCity = r.chance(D.cityEventShare);
      var pool = [], weights = [];
      [useCity ? all.city : all.general, useCity ? all.general : all.city].some(function (list) {
        list.forEach(function (ev) {
          if (!eligibleWeek(state, ev, w, hardUsed >= D.hardMax ? tiers.filter(function (t) { return t !== 'HARD'; }) : tiers)) return;
          var bound = bindEvent(state, ev, {});
          if (!bound || !engineGate(state, ev, bound)) return;
          pool.push({ ev: ev, bound: bound });
          weights.push(ev.weight === undefined ? 1 : ev.weight);
        });
        return pool.length > 0;
      });
      if (!pool.length) break;
      var pick = r.weighted(pool, weights);
      if (!pick) break;
      if (pick.ev.tier === 'HARD') hardUsed++;
      var day = placeDay(state, pick.ev, pick.bound, start, end, takenDays), half = r.chance(.5) ? 'DAY' : 'NIGHT';
      if (day === null) continue;
      takenDays[day + half] = true;
      d.queue.push({ id: U.newId(state, 'd'), eventId: pick.ev.id, day: day, half: half, bind: pick.bound.bind, showId: pick.bound.showId });
    }
  }

  function placeDay(state, ev, bound, start, end, taken) {
    var lo = Math.max(start, today(state)), hi = end, show = bound.showId && state.shows ? state.shows[bound.showId] : null, days = [], d;
    if (show) {
      hi = Math.min(hi, show.day);
      if (ev.if && isArr(ev.if.daysOut)) { lo = Math.max(lo, show.day - ev.if.daysOut[1]); hi = Math.min(hi, show.day - ev.if.daysOut[0]); }
    }
    for (d = lo; d <= hi; d++) if (!taken[d + 'DAY'] || !taken[d + 'NIGHT']) days.push(d);
    return days.length ? rng(state).pick(days) : null;
  }

  function due(state, day, half) {
    if (typeof day !== 'number') SB.fail('Director.due', 'day must be a number');
    var d = dir(state), sc = script(state), i, q, ev, bound, dec;
    /* postponed posts whose day has come. SPEC?: due returns only a Decision, so the MESSAGE records of these posts
     * are not returned; the messages themselves are in the inbox. */
    var later = d.later;
    d.later = [];
    later.forEach(function (it) {
      if (it.day > day) { d.later.push(it); return; }
      if (it.what === 'SCRIPT') { if (sc[it.idx]) scriptPost(state, sc[it.idx]); }
      else SB.Effects.deliverLater(state, it);
    });
    d.queue.sort(function (a, b) { return a.day - b.day || (a.half === b.half ? 0 : (a.half === 'DAY' ? -1 : 1)); });
    for (i = 0; i < d.queue.length; i++) {
      q = d.queue[i];
      if (q.day > day || (q.day === day && half === 'DAY' && q.half === 'NIGHT')) continue;
      d.queue.splice(i, 1); i--;
      ev = eventById(state, q.eventId);
      if (!ev) continue;
      bound = rebind(state, ev, q);
      if (!bound) continue;
      dec = buildDecision(state, ev, bound, E.DECISION.INTERRUPT, null, day, half);
      d.used[ev.id] = week(state);
      if (ev.tier === 'HARD') d.lastHardWeek = week(state);
      return dec;
    }
    return null;
  }

  function rebind(state, ev, q) {
    var b = q.bind, show, ok, conds = ev.if || {}, k;
    if (q.scripted && !b) return bindEvent(state, ev, {}) || bindEvent(state, ev, { skipIf: true });
    if (!b) return bindEvent(state, ev, {});
    show = q.showId || b.show ? state.shows && state.shows[q.showId || b.show] : null;
    if ((q.showId || b.show) && (!show || show.status === E.SHOW.PLAYED || show.status === E.SHOW.CANCELLED)) return null;
    ok = (ev.bind || []).every(function (r) { return r === 'show' ? !!show : !!b[r] && entityExists(state, b[r]); });
    if (!ok) return null;
    if (q.scripted) { conds = {}; for (k in ev.if || {}) if (k !== 'daysOut') conds[k] = ev.if[k]; }
    if (!SB.Effects.test(state, conds, { show: show, bind: b })) return null;
    return { bind: b, showId: show ? show.id : null };
  }

  function entityExists(state, id) {
    return !!((state.bands && state.bands[id]) || (state.people && state.people[id] && (!state.people[id].state || state.people[id].state === 'ACTIVE')) ||
              (state.rooms && state.rooms[id]) || (state.zones && state.zones[id]) || (state.shows && state.shows[id]));
  }

  /* ---------------- the night ---------------- */

  function atMinutes(show, at) {
    var b = show.bill || {}, t = b.times || [], s = slotsOf(show), i, peak = t.length - 1;
    for (i = 0; i < s.length; i++) if (s[i].role === E.BILL_ROLE.TOURING) peak = i;
    switch (at) {
      case 'DOORS': return b.doors || (t[0] || 1200) - C.SET.doorsLead;
      case 'SET:1': return t[0] || b.doors || 1200;
      case 'CHANGEOVER': return t.length > 1 ? t[1] - C.SET.changeover : (t[0] || 1200) + C.SET.def;
      case 'SET:PEAK': return t[Math.max(0, peak)] || t[0] || 1200;
      case 'LATE': return (b.ends || (t[t.length - 1] || 1200) + C.SET.def) - 15;
      default: return b.ends || (t[t.length - 1] || 1200) + C.SET.def;
    }
  }

  function crossesClock(state, show, room) {
    var p = pack(state), dow = SB.time.dow(show.day), schoolNight = dow === 6 || dow <= 3, lines = [], t = (show.bill && show.bill.times) || [];
    if (room && room.curfew) lines.push(room.curfew);
    if (room && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0) lines.push((p && p.rules && p.rules.quiet) || 1320);
    if (schoolNight) { lines.push(C.CLOCK.kidsSchoolNight); lines.push(C.CLOCK.middleWeeknight); }
    lines.push(C.CLOCK.oldHeads);
    return t.some(function (s) { return lines.some(function (L) { return s <= L && s + 15 > L; }); });
  }

  function incidentP(state, show, room, kind, demand) {
    var I = C.INCIDENTS[kind], p = pack(state), t = (show.bill && show.bill.times) || [], full = show.door && show.door.address === 'FULL';
    var cap = room ? Math.max(1, room.cap || 1) : 1, heads = demand && typeof demand.heads === 'number' ? demand.heads : 0, x, sk;
    /* security on the night makes a fight, a crowd at the gate and theft rarer (C.SECURITY) */
    var sec = show.crew && show.crew.security && C.SECURITY.incidents.indexOf(kind) >= 0 ? C.SECURITY.pMul : 1;
    if (!I) return 0;
    switch (kind) {
      case 'NOISE':
        if (!room || I.kinds.indexOf(room.kind) < 0) return 0;
        x = I.p;
        var nb = (show.jobs || []).map(function (j) { return state.jobs && state.jobs[j]; }).filter(function (j) { return j && j.type === 'NEIGHBORS'; });
        if (nb.length && nb.every(function (j) { return j.status !== 'DONE' && !j.waived; })) x *= I.notTold;
        var quiet = (p && p.rules && p.rules.quiet) || room.curfew || 1320;
        if (t.some(function (s) { return s > quiet; })) x *= I.pastQuiet;
        if (heads > cap) x *= I.overCap;
        if (full && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0) x *= C.CHANNELS.ADDRESS.noise;
        return x;
      case 'FIGHT': sk = (room ? room.sketch || 0 : 0) + (full ? C.CHANNELS.ADDRESS.sketch : 0); return I.p * (1 + sk / I.sketchDiv) * sec;
      case 'THEFT': sk = (room ? room.sketch || 0 : 0) + (full ? C.CHANNELS.ADDRESS.sketch : 0); return I.p * (1 + sk / I.sketchDiv) * sec;
      case 'PA_FAIL':
        var snd = show.crew && show.crew.sound && state.people && state.people[show.crew.sound];
        var skill = snd && snd.hid && snd.hid.skill ? snd.hid.skill.SOUND || 0 : 0;
        return I.p * (1 - ((room && room.pa) || 0)) * (skill >= I.skilledAt ? I.skilled : 1);
      case 'OVER_CAP':
        x = heads / cap;
        return (x >= I.above ? I.pAbove : (x >= I.from ? I.p : 0)) * sec;
      case 'HURT':
        return slotsOf(show).some(function (s) { var b = state.bands && state.bands[s.bandId]; return b && C.ROOM_GENRE.pit.indexOf(b.genre) >= 0; }) ? I.pit : I.p;
    }
    return 0;
  }

  function nightChance(state, ev, show, room, demand, ctx) {
    var risk = ev.risk, x;
    if (!risk) return NIGHT_P_NO_RISK * (ev.weight === undefined ? 1 : ev.weight);
    x = risk.incident ? incidentP(state, show, room, risk.incident, demand) : (risk.base || 0);
    (risk.mul || []).forEach(function (m) { if (SB.Effects.test(state, m.if, ctx)) x *= m.x; });
    return U.clamp(x, 0, 1);
  }

  function nightStops(state, showId, demand) {
    var show = state.shows && state.shows[showId];
    if (!show) SB.fail('Director.nightStops', 'unknown show "' + showId + '"');
    var d = dir(state), r = SB.rng.stream(state, 'show:' + showId), room = show.roomId && state.rooms ? state.rooms[show.roomId] : null;
    var w = week(state), all = events(state), list = all.general.concat(all.city), picks = [], fired = [], hard = false, i;
    var call = show.night && show.night.call ? show.night.call : SB.Forecast.call(state, showId);
    var mid = call && typeof call.mid === 'number' ? call.mid : 0;
    /* doors */
    var present = null, out = null;
    if (SB.Model && typeof SB.Model.night === 'function' && demand) {
      out = SB.Model.night(state, show, demand, show.mods || {}, SB.Forecast.lens(state, E.LENS.TRUTH));
      if (out && out.sets && out.sets[0] && typeof out.sets[0].present === 'number') present = out.sets[0].present;
    }
    if (present === null) present = demand && typeof demand.heads === 'number' ? demand.heads * .6 : 0;
    var doorsQ = present < D.nightStops.doorsUnder * mid || crossesClock(state, show, room);
    /* the count is the player's own (they work the door); a band can still question it on a handshake deal */
    var countQ = !(show.deal && show.deal.written);
    /* night events whose conditions hold */
    list.forEach(function (ev) {
      if (ev.when !== 'NIGHT' && ev.when !== 'EITHER') return;
      if (ev.id === 'DOORS' || ev.id === 'COUNT' || RAISED_ELSEWHERE[ev.id] || ev.at === 'SETTLE' && ev.id === 'DEAL_DISPUTE') return;
      if (typeof d.used[ev.id] === 'number' && ev.cooldown && w - d.used[ev.id] < ev.cooldown) return;
      var bound = bindEvent(state, ev, { show: show });
      if (!bound) return;
      var p = nightChance(state, ev, show, room, demand, { show: show, bind: bound.bind, night: true });
      var hit = r.chance(p);
      if (firstShow(state, show)) hit = false;            // the first show: no bad-luck turn (the doors and the count still come)
      fired.push({ ev: ev, bound: bound, p: p, hit: hit, incident: !!(ev.risk && ev.risk.incident) });
    });
    function add(item) {
      if (picks.length >= D.nightStops.max) return;
      if (item.ev.tier === 'HARD') { if (hard) return; hard = true; }
      picks.push(item);
    }
    function drawFrom(items) {
      items = items.slice();
      while (items.length && picks.length < D.nightStops.max) {
        var it = r.weighted(items, items.map(function (x) { return x.p; })) || items[0];
        items.splice(items.indexOf(it), 1);
        add(it);
      }
    }
    drawFrom(fired.filter(function (f) { return f.hit && f.incident; }));
    [['DOORS', doorsQ], ['COUNT', countQ]].forEach(function (pair) {
      var ev = pair[1] ? eventById(state, pair[0]) : null;
      if (ev) add({ ev: ev, bound: { bind: refsFromShow(state, show), showId: show.id }, p: 1, forced: pair[0] });
    });
    drawFrom(fired.filter(function (f) { return f.hit && !f.incident; }));
    if (!picks.length && !firstShow(state, show)) {
      var gentle = fired.filter(function (f) { return (f.ev.tier || 'GENTLE') === 'GENTLE'; });
      gentle.sort(function (a, b) { return (b.ev.weight || 1) - (a.ev.weight || 1); });
      if (gentle.length) add(gentle[0]);
    }
    var decisions = picks.map(function (it) {
      var at = it.forced === 'DOORS' ? 'DOORS' : (it.forced === 'COUNT' ? 'SETTLE' : (it.ev.at || 'SET:PEAK'));
      var kind = it.forced === 'DOORS' ? E.DECISION.DOORS : (it.forced === 'COUNT' ? E.DECISION.COUNT : E.DECISION.NIGHT_STOP);
      /* the doors question comes when the first band is tuned and waiting, with the count the clicker shows at that minute */
      var mins = it.forced === 'DOORS' && out && out.sets && out.sets[0] && typeof out.sets[0].start === 'number' ? out.sets[0].start - 1 : atMinutes(show, at);
      var dec = buildDecision(state, it.ev, it.bound, kind, mins, show.day, 'NIGHT', it.forced === 'DOORS' ? { heads: doorsCount(out, present) } : null);
      dec.atKey = at;
      d.used[it.ev.id] = w;
      return dec;
    });
    decisions.sort(function (a, b) { return AT_ORDER.indexOf(a.atKey) - AT_ORDER.indexOf(b.atKey) || (a.at || 0) - (b.at || 0); });
    if (hard) { d.lastHardWeek = w; if (D.quietAfterHardNight) d.quietWeek = w + 1; }
    for (i = 0; i < decisions.length; i++) delete decisions[i].atKey;
    return decisions;
  }

  /* The scripted first show (the swap of the opening): the opening promises a fair first month, so this one night has no
   * bad luck (no bad weather, no bad draw, no incident) in Model and here. */
  function firstShow(state, show) {
    var d = state.director, id = d ? (d.firstRequestId || d.swapRequestId) : null;
    return !!(show && id && show.requestId === id);
  }

  /* the count on the clicker when the first band is ready: what Night's first ARRIVALS record carries */
  function doorsCount(out, present) {
    var s0 = out && out.sets && out.sets[0], g, n = 0;
    if (!s0 || !s0.byGen || !out.byGen) return Math.round(present || 0);
    for (g = 0; g < 3; g++) n += Math.min(out.byGen[g], s0.byGen[g]);
    return n;
  }

  /* ---------------- risks ---------------- */

  function risks(state) {
    var out = [], t = today(state), d = dir(state), i;
    var lbl = function (k) { return SB.text.label(k); };
    liveShows(state).forEach(function (s) {
      var room = s.roomId && state.rooms ? state.rooms[s.roomId] : null, fc = state.town && state.town.forecast ? state.town.forecast[s.day] : null;
      if (s.day - t <= C.WEATHER.FORECAST_DAYS && fc && fc !== 'CLEAR' && (fc !== 'RAIN' || (room && room.outdoor)) && (fc !== 'HEAT' || (room && !room.ac))) {
        out.push({ k: 'FORECAST', showId: s.id, text: textFor(state, 'FORECAST', { weather: lbl('weather.' + fc), date: SB.time.fmt(s.day, 'short') },
                                                              lbl('weather.' + fc) + ', ' + SB.time.fmt(s.day, 'short')) });
      }
      if (s.hold && s.hold.rank === 2) {
        out.push({ k: 'SECOND_HOLD', showId: s.id, text: textFor(state, 'SECOND_HOLD', { room: room ? room.name : '', date: SB.time.fmt(s.day, 'short') },
                                                                 (room ? room.name + ', ' : '') + SB.time.fmt(s.day, 'short')) });
      }
    });
    Object.keys(state.asks || {}).forEach(function (id) {
      var a = state.asks[id];
      if (a.status !== 'SENT' || (a.kind !== 'BAND_PLAY' && a.kind !== 'TERMS') || !a.window || a.sentDay === null || a.sentDay === undefined) return;
      if (t - a.sentDay <= a.window.hi) return;
      var b = state.bands && state.bands[a.toId];
      out.push({ k: 'QUIET', showId: a.showId || null, text: textFor(state, 'QUIET', { band: b ? b.name : '' }, b ? b.name : '') });
    });
    if (SB.Jobs && typeof SB.Jobs.tray === 'function') {
      var tray = SB.Jobs.tray(state) || {};
      (tray.thisWeek || []).concat(tray.soon || []).forEach(function (j) {
        if (!j || !j.window || j.window.state !== 'CLOSING') return;
        out.push({ k: 'CLOSING', showId: j.showId || null, text: textFor(state, 'CLOSING', { job: j.label, when: j.window.label }, (j.label || '') + (j.window.label ? ', ' + j.window.label : '')) });
      });
    }
    for (i = 0; i < d.queue.length; i++) {
      var q = d.queue[i], ev = eventById(state, q.eventId);
      if (!ev || !ev.telegraph || q.day - t > 7) continue;
      var sl = SB.Effects.slots(state, { show: q.showId && state.shows && state.shows[q.showId] ? q.showId : null, bind: q.bind || {} });
      out.push({ k: 'TELEGRAPH', showId: q.showId || null, text: render(ev.telegraph, sl, state) });
    }
    return out;
  }

  // SPEC?: the risk kinds other than a telegraph have no content lines; strings.risk.<k> is used when C1 adds it,
  // otherwise the line is put together from existing labels.
  function textFor(state, k, slots, fallback) {
    if (SB.text.off) return '';
    return SB.text.has('strings.risk.' + k) ? SB.text.line('strings.risk.' + k, slots, textRng(state)) : fallback;
  }

  return { opening: opening, planWeek: planWeek, due: due, resolve: resolve, nightStops: nightStops, risks: risks,
           /* extra (not in the manifest) */
           firstShow: firstShow, firstRequestId: firstReqId };
});
