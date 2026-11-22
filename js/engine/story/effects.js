/* Scene Booker — engine/story/effects.js
 * SB.Effects: interprets the condition and effect language of events as data (design/spec/03-content.md section 8.3
 * and 8.4) and nothing else. The only code that turns content into state changes. Owner: E4. Stream: DIRECTOR.
 * Exports beyond the manifest (internal, used by the other E4 files): slots, request, post, deliverLater, refIds,
 * calendarEntry, textPath.
 */
SB.module('Effects', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var SHOW_ONLY = { daysOut: 1, roomKind: 1, outdoor: 1, ages: 1, jobDone: 1, jobNotDone: 1, hasCrew: 1, deal: 1,
                    written: 1, label: 1, bands: 1, slot: 1 };
  var MUL_MODS = { headsMul: 1, reachMul: 1, qMul: 1, run: 1, capMul: 1 };
  var ADD_MODS = { qAdd: 1, soundAdd: 1, lateMin: 1, comps: 1, doorLeak: 1, hatBonus: 1 };
  var BOOL_MODS = { endEarly: 1, set1Presence: 1, noDispute: 1, uncapped: 1 };

  /* ---------------- small helpers ---------------- */

  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function nowHalf(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function dirRng(state) { return SB.rng.stream(state, E.STREAM.DIRECTOR); }
  function isArr(x) { return Array.isArray(x); }
  function list(x) { return x === undefined || x === null ? [] : (isArr(x) ? x : [x]); }

  function rec(state, t, showId, text, extra) {
    var r = { t: t, day: today(state), half: nowHalf(state), showId: showId || null, text: text || '' }, k;
    if (extra) for (k in extra) r[k] = extra[k];
    return r;
  }

  function pack(state) {
    if (!SB.Cities || typeof SB.Cities.pack !== 'function' || !state.citySlug) return null;
    if (typeof SB.Cities.isLoaded === 'function' && !SB.Cities.isLoaded(state.citySlug)) return null;
    return SB.Cities.pack(state);
  }

  function traits(state) {
    var p = pack(state), t = (p && (p.traits || (p.derived && p.derived.index && p.derived.index.traits))) || null, e;
    if (!t && SB.Cities && typeof SB.Cities.entry === 'function' && state.citySlug) { e = SB.Cities.entry(state.citySlug); t = e && e.traits; }
    return t || [];
  }

  function showOf(state, ctx) {
    var s = ctx && ctx.show;
    if (!s) return null;
    if (typeof s === 'string') {
      if (!state.shows || !state.shows[s]) SB.fail('Effects', 'unknown show "' + s + '"');
      return state.shows[s];
    }
    if (typeof s !== 'object') SB.fail('Effects', 'ctx.show must be a show id or a Show');
    return s;
  }

  function roomOf(state, show) { return show && show.roomId && state.rooms ? state.rooms[show.roomId] || null : null; }

  function nameOf(state, id) {
    if (!id) return '';
    if (id === 'player') return state.player ? state.player.bookingName || '' : '';
    if (state.bands && state.bands[id]) return state.bands[id].name;
    if (state.people && state.people[id]) { var p = state.people[id]; return p.first || [p.first, p.last].join(' '); }
    if (state.rooms && state.rooms[id]) return state.rooms[id].name;
    if (state.zones && state.zones[id]) return state.zones[id].name;
    return '';
  }

  function slotBands(show) { return show && show.bill && show.bill.slots ? show.bill.slots : []; }

  /* '$touring' -> the bound id; '$locals' / '$bill' -> the bands of the bound show; anything else -> itself. */
  function refIds(state, ctx, who) {
    var show, bind = (ctx && ctx.bind) || {};
    if (who === undefined || who === null) return [];
    if (typeof who !== 'string') SB.fail('Effects', 'a ref must be a string, got ' + String(who));
    if (who.charAt(0) !== '$') return [who];
    var k = who.slice(1);
    if (k === 'locals' || k === 'bill') {
      show = showOf(state, ctx);
      return slotBands(show).filter(function (s) { return k === 'bill' || s.role === E.BILL_ROLE.LOCAL; })
                            .map(function (s) { return s.bandId; });
    }
    if (!E.REF[k] && k !== 'new' && k !== 'chokepoint') SB.fail('Effects', 'unknown ref "' + who + '"');
    return bind[k] ? [bind[k]] : [];
  }

  function bandTrust(state, id) {
    if (!(state.bands && state.bands[id])) return null;
    return SB.Bands.trust(state, id).value;
  }

  /* What "relationship" means for a ref: a room's owner (through the room), a booker, a contact, or a person. */
  function relValue(state, id) {
    var p;
    if (state.rooms && state.rooms[id]) return SB.Rooms.rel(state, id).value;
    if (state.bookers && state.bookers[id]) return SB.Rooms.bookerRel(state, id).value;
    if (state.contacts && state.contacts[id]) return state.contacts[id].strength;
    if (state.bands && state.bands[id]) return SB.Bands.trust(state, id).value;
    p = state.people && state.people[id];
    if (!p) return null;
    if (p.ownerOf && state.rooms && state.rooms[p.ownerOf]) return SB.Rooms.rel(state, p.ownerOf).value;   // SPEC?: an owner's relationship lives on the room
    return p.rel === null || p.rel === undefined ? 0 : p.rel;
  }

  function calendarActive(entry, day) {
    var t = SB.time.date(day), wom = SB.time.weekOfMonth(day);
    if (entry.month && entry.month !== t.m) return false;
    if (entry.week && entry.week !== wom) return false;
    if (entry.weeks && (wom < entry.weeks[0] || wom > entry.weeks[1])) return false;
    if (entry.dows && entry.dows.indexOf(t.dow) < 0) return false;
    return true;
  }

  function calendarEntry(state, tag, day) {
    var p = pack(state), cal = (p && p.calendar) || [], i, d;
    for (d = day - 3; d <= day + 3; d++) {
      for (i = 0; i < cal.length; i++) {
        if ((tag === 'ANY' || cal[i].tag === tag) && calendarActive(cal[i], d)) return cal[i];
      }
    }
    return null;
  }

  function cutZones(state, ctx) {
    var p = pack(state), cuts = (p && p.derived && p.derived.cuts) || {}, ids = [], k;
    var only = ctx && ctx.bind && ctx.bind.chokepoint;
    for (k in cuts) if (!only || k === only) ids = ids.concat(cuts[k]);
    return ids;
  }

  function zonePeople(state, zoneId) {
    var z = state.zones && state.zones[zoneId];
    if (!z || !z.pop) return 0;
    return z.pop.reduce(function (a, row) { return a + U.sum(row); }, 0);
  }

  function jobsOfShow(state, show, type) {
    return (show.jobs || []).map(function (id) { return state.jobs && state.jobs[id]; })
      .filter(function (j) { return j && j.type === type; });
  }

  function listedOnShow(state, show) {
    var found = false;
    slotBands(show).forEach(function (s) {
      var b = state.bands && state.bands[s.bandId];
      (b && b.members || []).forEach(function (m) {
        var p = state.people && state.people[m.personId];
        if (p && p.listed) found = true;
      });
    });
    return found;
  }

  function inRange(v, r) { return v !== null && v !== undefined && v >= r[0] && v <= r[1]; }

  /* ---------------- conditions ---------------- */

  function holds(state, key, v, ctx) {
    var show = showOf(state, ctx), room = roomOf(state, show), day = show ? show.day : today(state), ids, i, val, x;
    if (!E.COND[key]) SB.fail('Effects.test', 'unknown condition "' + key + '"');
    if (SHOW_ONLY[key] && !show) return false;
    switch (key) {
      case 'daysOut': return inRange(show.day - today(state), v);
      case 'roomKind': return !!room && list(v).indexOf(room.kind) >= 0;
      case 'outdoor': return !!room && !!room.outdoor === !!v;
      case 'ages': return !!show.door && show.door.ages === v;
      case 'slot': return show.slot === v;
      case 'jobDone':
        return list(v).every(function (t) {
          var js = jobsOfShow(state, show, t);
          return js.length > 0 && js.every(function (j) { return j.status === E.JOB_STATUS.DONE || j.status === E.JOB_STATUS.MOOT; }) &&
                 js.some(function (j) { return j.status === E.JOB_STATUS.DONE; });
        });
      case 'jobNotDone':
        return list(v).every(function (t) {
          var js = jobsOfShow(state, show, t).filter(function (j) { return j.status !== E.JOB_STATUS.MOOT; });
          return js.length > 0 && js.every(function (j) { return j.status !== E.JOB_STATUS.DONE; });
        });
      case 'months': return list(v).indexOf(SB.time.month(today(state))) >= 0;
      case 'calendar': return !!calendarEntry(state, v, day);
      case 'weather':
        val = (state.town && state.town.forecast && state.town.forecast[day]) || null;
        x = (state.truth && state.truth.weather && state.truth.weather[day]) || null;
        return val === v || x === v;
      case 'trait': x = traits(state); return list(v).every(function (t) { return x.indexOf(t) >= 0; });
      case 'chokepoint':
        x = cutZones(state, null).some(function (z) { return zonePeople(state, z) > 0; });
        return x === !!v;
      case 'stage': return inRange((state.player && state.player.stage) || 1, v);
      case 'bills': return !!(state.settings && state.settings.bills) === !!v;
      case 'flag': return !!(state.flags && state.flags[v]);
      case 'notFlag': return !(state.flags && state.flags[v]);
      case 'stress': return inRange((state.player && state.player.stress) || 0, v);
      case 'weekMin': return week(state) >= v;
      case 'weekMax': return week(state) <= v;
      case 'hasCrew': return !!(show.crew && show.crew[v]);
      case 'hasHelper':
        return SB.People.circle(state).people.some(function (p) { return (p.roles || []).indexOf(v) >= 0; });
      case 'trust':
        ids = refIds(state, ctx, v.who);
        if (!ids.length) return false;
        for (i = 0; i < ids.length; i++) {
          val = bandTrust(state, ids[i]);
          if (val === null || val < (v.min === undefined ? 0 : v.min) || val > (v.max === undefined ? 100 : v.max)) return false;
        }
        return true;
      case 'rel':
        ids = refIds(state, ctx, v.who);
        if (!ids.length) return false;
        for (i = 0; i < ids.length; i++) {
          val = relValue(state, ids[i]);
          if (val === null || val < (v.min === undefined ? 0 : v.min) || val > (v.max === undefined ? 100 : v.max)) return false;
        }
        return true;
      case 'deal': return !!show.deal && list(v).indexOf(show.deal.shape) >= 0;
      case 'written': return !!(show.deal && show.deal.written) === !!v;
      case 'label': return show.label === v;
      case 'bands': return inRange(slotBands(show).length, v);
      case 'fundMin': x = state.money || {}; return (x.fund || 0) + (x.bank || 0) >= v;
      case 'heatAbove':
        if (!v || v.genre === 'ANY') return E.GENRES.some(function (g) { return SB.Trends.heat(state, g) > (v ? v.v : 0); });
        return SB.Trends.heat(state, v.genre) > v.v;
      case 'regularsMin': return ((state.regulars && state.regulars.total) || 0) >= v;
      case 'onList':
        x = (show && listedOnShow(state, show)) ||
            !!(ctx && ctx.bind && ctx.bind.person && state.people && state.people[ctx.bind.person] && state.people[ctx.bind.person].listed);
        return x === !!v;
      case 'chance': return dirRng(state).chance(v);
    }
    SB.fail('Effects.test', 'condition "' + key + '" has no rule');
  }

  function test(state, conds, ctx) {
    if (!conds) return true;
    if (typeof conds !== 'object' || isArr(conds)) SB.fail('Effects.test', 'conditions must be an object');
    var keys = Object.keys(conds), i;
    for (i = 0; i < keys.length; i++) if (!holds(state, keys[i], conds[keys[i]], ctx || {})) return false;
    return true;
  }

  function why(state, conds, ctx) {
    if (!conds) return null;
    if (typeof conds !== 'object' || isArr(conds)) SB.fail('Effects.why', 'conditions must be an object');
    var keys = Object.keys(conds), i, k;
    for (i = 0; i < keys.length; i++) {
      k = keys[i];
      if (holds(state, k, conds[k], ctx || {})) continue;
      // SPEC?: 03-content has no lines for an unmet condition. A line at strings.why.<key> is used when C1 adds one;
      // otherwise the general refusal sentence.
      if (SB.text.has('strings.why.' + k)) return SB.text.line('strings.why.' + k, slots(state, ctx || {}), textRng(state));
      return SB.text.label('refuse.NEEDS');
    }
    return null;
  }

  /* ---------------- text slots for events (03-content 8.2) ---------------- */

  function slots(state, ctx) {
    var show = showOf(state, ctx || {}), bind = (ctx && ctx.bind) || {}, room = roomOf(state, show), o = {}, k, p, cal, chk;
    for (k in E.REF) if (k !== 'show' && bind[k]) o[k] = nameOf(state, bind[k]);
    if (show) {
      var slots0 = slotBands(show), tour = null, i;
      for (i = 0; i < slots0.length; i++) if (slots0[i].role === E.BILL_ROLE.TOURING && !tour) tour = slots0[i].bandId;
      if (!o.touring && tour) o.touring = nameOf(state, tour);
      if (!o.closer && slots0.length) o.closer = nameOf(state, slots0[slots0.length - 1].bandId);
      if (!o.opener && slots0.length) o.opener = nameOf(state, slots0[0].bandId);
      if (!o.room && room) o.room = room.name;
      if (!o.owner && room && room.ownerId) o.owner = nameOf(state, room.ownerId);
      ['sound', 'security', 'floor'].forEach(function (c) { if (!o[c] && show.crew && show.crew[c]) o[c] = nameOf(state, show.crew[c]); });
      o.date = SB.time.date(show.day).d;
      o.dow = SB.time.fmt(show.day, 'dow');
      o.dateLong = SB.time.fmt(show.day, 'long');
      o.daysOut = show.day - today(state);
      o.cap = room ? room.cap : null;
      cal = calendarEntry(state, 'ANY', show.day);
      if (cal) o.event = cal.label;
    } else {
      o.date = SB.time.date(today(state)).d;
      o.dow = SB.time.fmt(today(state), 'dow');
    }
    p = pack(state);
    o.city = p && p.zones && p.zones[0] ? p.zones[0].name : (state.zones && state.zones.city ? state.zones.city.name : '');
    o.bookingName = state.player ? state.player.bookingName || '' : '';
    chk = p && p.chokepoints && p.chokepoints.length ? p.chokepoints[0] : null;
    if (bind.chokepoint && p && p.chokepoints) p.chokepoints.forEach(function (c) { if (c.id === bind.chokepoint) chk = c; });
    if (chk) o.chokepoint = chk.name;
    if (bind.new) o.new = bind.new;
    if (ctx && ctx.extra) for (k in ctx.extra) o[k] = ctx.extra[k];
    return o;
  }

  /* ---------------- messages and requests (shared with the Director) ---------------- */

  function msgKindFor(state, id) {
    if (!id) return E.MSG.SCENE;
    if (state.bands && state.bands[id]) return E.MSG.BAND;
    if (state.bookers && state.bookers[id]) return E.MSG.BOOKER;
    if (state.contacts && state.contacts[id]) return E.MSG.CONTACT;
    var p = state.people && state.people[id];
    if (!p) return E.MSG.SCENE;
    if (p.ownerOf) return E.MSG.ROOM;
    var r = p.roles || [];
    if (r.indexOf('SOUND') >= 0 || r.indexOf('SECURITY') >= 0) return E.MSG.CREW;
    if (r.indexOf('OUTGOING') >= 0) return E.MSG.CONTACT;
    if (r.indexOf('REGULAR') >= 0) return E.MSG.REGULAR;
    return E.MSG.HELPER;
  }

  /* Post a message now. m = { kind, fromId, fromName, subject, body, needs, refs, keep, showId }. Returns a MESSAGE record. */
  function post(state, m) {
    var refs = m.refs || {};
    var full = { kind: m.kind || msgKindFor(state, m.fromId), fromId: m.fromId || null,
                 fromName: m.fromName || nameOf(state, m.fromId), subject: m.subject || '', body: m.body || '',
                 needs: !!m.needs, refs: { requestId: refs.requestId || null, showId: refs.showId || null, askId: refs.askId || null,
                                          bandId: refs.bandId || null, offerId: refs.offerId || null }, keep: !!m.keep };
    var id = SB.Mail.post(state, full);
    return rec(state, E.REC.MESSAGE, refs.showId || null, full.subject,
               { messageId: id, kind: full.kind, fromName: full.fromName, needs: full.needs });
  }

  function requestSlots(state, req, band, extra) {
    var d = req.dates || [], p = pack(state), k;
    var o = {
      city: p && p.zones && p.zones[0] ? p.zones[0].name : '', band: band ? band.name : '',
      home: band && band.place ? band.place.name : (band && band.zoneId && state.zones[band.zoneId] ? state.zones[band.zoneId].name : ''),
      genrePlain: band ? band.genre : '', genreOwn: band ? band.genre : '',
      n: req.ask ? req.ask.members : null, member: band && band.contactId ? nameOf(state, band.contactId) : '',
      day1: d[0] !== undefined ? SB.time.fmt(d[0], 'dow') : '', date1: d[0] !== undefined ? SB.time.date(d[0]).d : null,
      day2: d[1] !== undefined ? SB.time.fmt(d[1], 'dow') : '', date2: d[1] !== undefined ? SB.time.date(d[1]).d : null,
      month: d[0] !== undefined ? SB.time.fmt(d[0], 'month') : '', dateLong: d[0] !== undefined ? SB.time.fmt(d[0], 'long') : '',
      daysOut: d[0] !== undefined ? d[0] - req.day : null, guarantee: req.ask ? req.ask.guarantee : null,
      pct: req.ask ? Math.round((req.ask.pct || 0) * 100) : null, bookingName: state.player ? state.player.bookingName : '',
      shortNotice: !!req.shortNotice, doorDeal: !!(req.ask && req.ask.shape === 'DOOR'), lodging: !!(req.ask && req.ask.lodging)
    };
    if (req.localAsk) o[req.localAsk.toLowerCase().replace(/_([a-z])/g, function (m, c) { return c.toUpperCase(); })] = true;
    if (band && band.hid && band.hid.tells) band.hid.tells.forEach(function (t) { o[t] = true; });
    if (extra) for (k in extra) o[k] = extra[k];
    return o;
  }

  /* Create a request and post its message. spec is the shape SB.Requests.create documents (E3b, requests.js header):
   * { kind, template, day, bandId, fromId, referrerId, localAsk, genre, tier, home, lead: [lo, hi], dates, ask: 'DOOR' |
   * 'GUARANTEE', from: 'PEER' | 'SWAP_CIRCLE', calendar: 'ANY', roomId }. Returns { requestId, records }.
   * SPEC?: SB.API has no Requests function that makes a request on demand, yet the opening script and the MESSAGE
   * effect's localAsk need one. E3b exports Requests.create beyond the manifest and it is used; when it is absent this
   * writes a plain request itself, in the shape of 01-state 2.5. */
  function request(state, spec) {
    var r, band, bandId, id, day = today(state), req, msg, tpl, records = [], lead, shape, dates;
    if (!spec || !E.REQ_KIND[spec.kind]) SB.fail('Effects.request', 'spec.kind must be a REQ_KIND');
    if (SB.Requests && typeof SB.Requests.create === 'function') {
      r = SB.Requests.create(state, spec);
      return { requestId: (r && r.requestId) || null, records: (r && r.records) || [] };
    }
    bandId = spec.bandId || SB.WorldGen.touringBand(state, { home: spec.home || null, genre: spec.genre || undefined,
                                                             tier: spec.tier || 1, kind: spec.template || 'CAREFUL' });
    band = state.bands && state.bands[bandId];
    lead = spec.lead || (spec.kind === 'RESCUE' ? [3, 6] : (spec.kind === 'LOCAL_ASK' ? [21, 56] : C.REQUESTS.LEAD_DAYS));
    dates = spec.dates ? spec.dates.slice() : [day + dirRng(state).int(lead[0], lead[1])];
    shape = spec.ask === 'GUARANTEE' ? 'GUARANTEE' : 'DOOR';
    state.requests = state.requests || {};
    id = U.newId(state, 'q');
    req = {
      id: id, kind: spec.kind, template: spec.kind === E.REQ_KIND.LOCAL_ASK ? 'LOCAL' : (spec.template || 'CAREFUL'), bandId: bandId,
      fromId: spec.fromId || (band && band.contactId) || null, day: day,
      replyBy: Math.max(day, Math.min(dates[0] - 1, day + C.REQUESTS.REPLY_BY[1])), dates: dates,
      route: { prev: null, next: null, stops: [] },
      ask: { shape: shape, guarantee: shape === 'GUARANTEE' ? 100 : 0, pct: shape === 'GUARANTEE' ? 0 : U.mean(C.DOOR_DEAL_PCT),
             lodging: false, meal: false, members: band && band.members ? band.members.length || 4 : 4 },
      statedDraw: null, referrerId: spec.referrerId || null, localAsk: spec.localAsk || null, status: E.REQ.NEW,
      offers: [], followups: 0, messageId: null, showId: null, vetted: {}, signals: [],
      shortNotice: dates[0] - day < C.JOBS.ANNOUNCE.ideal, hid: { raced: false, gone: null, wants: shape }
    };
    state.requests[id] = req;
    tpl = 'requests.templates.' + req.template;
    var sl = requestSlots(state, req, band, null);
    msg = post(state, { kind: E.MSG.REQUEST, fromId: req.fromId, fromName: band ? band.name : '',
                        subject: SB.text.has(tpl + '.subject') ? SB.text.line(tpl + '.subject', sl, textRng(state)) : (band ? band.name : ''),
                        body: SB.text.has(tpl + '.body') ? SB.text.line(tpl + '.body', sl, textRng(state)) : '',
                        needs: true, refs: { requestId: id, bandId: bandId } });
    req.messageId = msg.messageId;
    records.push(msg);
    return { requestId: id, records: records };
  }

  /* A content path for a speaker: where the node at `path` is a group keyed by generation (KIDS, MIDDLE, OLD) or by
   * relationship STAGE, step into the speaker's key (03-content 9: missing stages fall back toward WORKING). */
  function textPath(state, path, personId) {
    var node = path, parts = String(path).split('.'), i, p, keys, k, order;
    node = SB.Content;
    for (i = 0; i < parts.length && node; i++) node = node[parts[i]];
    if (!node || typeof node !== 'object' || isArr(node) || typeof node.t === 'string') return path;
    p = personId && state.people ? state.people[personId] : null;
    if (node.KIDS || node.MIDDLE || node.OLD) {
      k = E.GEN_KEY[p && typeof p.gen === 'number' ? p.gen : 1];
      if (SB.text.has(path + '.' + k)) return path + '.' + k;
      order = ['MIDDLE', 'OLD', 'KIDS'];
    } else {
      k = p ? SB.People.stage(p.rel === undefined ? null : p.rel) : 'WORKING';
      if (SB.text.has(path + '.' + k)) return path + '.' + k;
      order = k === 'ALLY' || k === 'TRUSTED' ? ['TRUSTED', 'WORKING', 'ALLY', 'STRANGER', 'SOUR'] : ['WORKING', 'STRANGER', 'TRUSTED', 'SOUR', 'ALLY'];
    }
    for (i = 0; i < order.length; i++) if (SB.text.has(path + '.' + order[i])) return path + '.' + order[i];
    keys = Object.keys(node);
    for (i = 0; i < keys.length; i++) if (SB.text.has(path + '.' + keys[i])) return path + '.' + keys[i];
    return path;
  }

  /* ---------------- effects ---------------- */

  function modsOf(show) {
    // SPEC?: during a night Night keeps the mods "so far" in show.night.mods; before it, show.mods. One is written.
    if (show.night && show.night.mods && typeof show.night.mods === 'object') return show.night.mods;
    show.mods = show.mods || {};
    return show.mods;
  }

  function genIndex(g) {
    if (g === undefined || g === null) return null;
    if (typeof g === 'number') return g;
    var i = E.GEN_KEY.indexOf(String(g).toUpperCase());
    return i >= 0 ? i : null;
  }

  function setMod(state, show, eff, ctx) {
    var key = eff.key, v = eff.v, mods = modsOf(show), g, zones, i;
    if (!E.MOD[key]) SB.fail('Effects.apply', 'unknown SHOW_MOD key "' + key + '"');
    if (MUL_MODS[key]) mods[key] = (typeof mods[key] === 'number' ? mods[key] : 1) * v;
    else if (ADD_MODS[key]) mods[key] = (typeof mods[key] === 'number' ? mods[key] : 0) + v;
    else if (BOOL_MODS[key]) mods[key] = v === undefined ? true : !!v;
    else if (key === 'genMul') {
      mods.genMul = isArr(mods.genMul) ? mods.genMul : [1, 1, 1];
      g = genIndex(eff.gen);
      for (i = 0; i < 3; i++) if (g === null || g === i) mods.genMul[i] *= v;
    } else if (key === 'zoneMul') {
      mods.zoneMul = mods.zoneMul && typeof mods.zoneMul === 'object' && !isArr(mods.zoneMul) ? mods.zoneMul : {};
      if (eff.beyond) zones = cutZones(state, ctx);
      else if (ctx.bind && ctx.bind.zone) zones = [ctx.bind.zone];
      else zones = Object.keys(state.zones || {}).filter(function (z) { return z !== 'city'; });
      zones.forEach(function (z) { mods.zoneMul[z] = (typeof mods.zoneMul[z] === 'number' ? mods.zoneMul[z] : 1) * v; });
    }
  }

  function amountOf(state, eff, show) {
    var a = 0, d, p;
    if (typeof eff.amount === 'number') return Math.round(eff.amount);
    if (!eff.amountOf) SB.fail('Effects.apply', 'MONEY needs amount or amountOf');
    if (!E.AMOUNT_OF[eff.amountOf]) SB.fail('Effects.apply', 'unknown amountOf "' + eff.amountOf + '"');
    if (eff.amountOf === 'DISPUTE') {
      d = show && show.night && show.night.dispute;
      a = d ? Math.max(0, (d.theirs || 0) - (d.yours || 0)) : 0;
    } else if (eff.amountOf === 'GAP') {
      a = show ? Math.max(0, (SB.Night.settleView(state, show.id) || {}).gap || 0) : 0;
    } else if (eff.amountOf === 'MOTEL') {
      p = pack(state);
      a = C.MONEY.MOTEL * ((p && p.money && p.money.priceIndex) || 1);
    }
    if (typeof eff.pct === 'number') a *= eff.pct;
    return Math.round(a * (eff.sign === undefined ? -1 : eff.sign));
  }

  function bandsOf(state, ids) { return ids.filter(function (id) { return state.bands && state.bands[id]; }); }

  function needShow(show, op) { if (!show) SB.fail('Effects.apply', op + ' needs a bound show'); return show; }

  function pickBand(state, show, how) {
    var on = {}, cands, r = dirRng(state), best = null;
    slotBands(show).forEach(function (s) { on[s.bandId] = true; });
    cands = Object.keys(state.bands || {}).filter(function (id) {
      var b = state.bands[id];
      return b.local && !on[id] && b.stage !== 'ENDED' && b.stage !== 'ON_ICE' && SB.Bands.isFree(state, id, show.day);
    });
    if (!cands.length) return null;
    if (how === 'ALWAYS_YES') {
      cands.forEach(function (id) { var t = SB.Bands.trust(state, id).value; if (!best || t > best.t) best = { id: id, t: t }; });
      return best.id;
    }
    if (how === 'NEW_KIDS') {
      var young = cands.filter(function (id) { var s = state.bands[id].stage; return s === 'FORMING' || s === 'NEW'; });
      return r.pick(young.length ? young : cands);
    }
    return r.pick(cands);
  }

  function newOrder(show, a, b, touringTo) {
    var order = slotBands(show).map(function (s) { return s.bandId; }), i, t = null;
    if (touringTo) {
      slotBands(show).forEach(function (s) { if (s.role === E.BILL_ROLE.TOURING && !t) t = s.bandId; });
      if (!t) return order;
      order.splice(order.indexOf(t), 1);
      // SPEC?: "NOW" has no defined position mid-night; it is taken as the next set to start, the first of the bill
      // when the night has not recorded a position.
      if (touringTo === 'LAST') order.push(t);
      else { i = show.night && typeof show.night.setIdx === 'number' ? show.night.setIdx : 0; order.splice(Math.min(i, order.length), 0, t); }
      return order;
    }
    var ia = order.indexOf(a), ib = order.indexOf(b);
    if (ia >= 0 && ib >= 0) { order[ia] = b; order[ib] = a; }
    return order;
  }

  function billMinutes(show) {
    var m = {};
    slotBands(show).forEach(function (s) { m[s.bandId] = s.minutes || C.SET.def; });
    return m;
  }

  function apply(state, effects, ctx) {
    ctx = ctx || {};
    if (!effects) return [];
    if (!isArr(effects)) SB.fail('Effects.apply', 'effects must be a list');
    var out = [], show = showOf(state, ctx), sid = show ? show.id : null;
    effects.forEach(function (eff) {
      if (!eff || typeof eff !== 'object') SB.fail('Effects.apply', 'an effect must be an object');
      if (!E.EFFECT[eff.op]) SB.fail('Effects.apply', 'unknown effect op "' + eff.op + '"');
      var ids, r, a, i, res, room, s;
      switch (eff.op) {
        case 'MONEY':
          a = amountOf(state, eff, show);
          if (!a) break;
          if (eff.cat && !E.MONEY[eff.cat]) SB.fail('Effects.apply', 'unknown money category "' + eff.cat + '"');
          if (a < 0) {
            res = SB.Money.spend(state, -a, eff.cat || 'EVENT', eff.memo || '', { showId: sid });
            if (res && res.ok) out.push(rec(state, E.REC.MONEY, sid, '', { amount: a, cat: eff.cat || 'EVENT', pot: res.from || 'FUND' }));
          } else {
            SB.Money.earn(state, a, eff.cat || 'EVENT', eff.memo || '', { showId: sid });
            out.push(rec(state, E.REC.MONEY, sid, '', { amount: a, cat: eff.cat || 'EVENT', pot: 'FUND' }));
          }
          break;
        case 'STRESS': SB.Stress.add(state, eff.d, 'EVENT'); break;
        case 'HOURS': hours(state, eff); break;
        case 'TRUST':
          bandsOf(state, refIds(state, ctx, eff.who)).forEach(function (b) {
            // SPEC?: Bands.addTrust takes a TRUST key; a bare `d` goes as ctx.d with a key of the same sign.
            var k = eff.k || (eff.d >= 0 ? 'DETAILS' : 'SHORT_ANSWER');
            if (!E.TRUST[k]) SB.fail('Effects.apply', 'unknown TRUST key "' + k + '"');
            out.push(SB.Bands.addTrust(state, b, k, eff.k ? { showId: sid, scale: eff.scale } : { showId: sid, d: eff.d }));
          });
          break;
        case 'REL':
          refIds(state, ctx, eff.who).forEach(function (id) {
            var p = state.people && state.people[id];
            if (state.bookers && state.bookers[id]) out.push(SB.Rooms.adjustBookerRel(state, id, eff.d, 'EVENT'));
            else if (state.contacts && state.contacts[id]) out.push(SB.Territory.adjustContact(state, id, eff.d, 'EVENT'));
            else if (state.rooms && state.rooms[id]) out.push(SB.Rooms.adjustRel(state, id, eff.d, 'EVENT'));
            else if (p && p.ownerOf && state.rooms && state.rooms[p.ownerOf]) out.push(SB.Rooms.adjustRel(state, p.ownerOf, eff.d, 'EVENT'));   // SPEC?: as relValue
            else if (p) out.push(SB.People.adjust(state, id, eff.d, 'EVENT'));
            else if (state.bands && state.bands[id]) out.push(SB.Bands.addTrust(state, id, eff.d >= 0 ? 'DETAILS' : 'SHORT_ANSWER', { showId: sid, d: eff.d }));
          });
          break;
        case 'ROOM_REL':
          room = roomOf(state, needShow(show, 'ROOM_REL')) || (ctx.bind && ctx.bind.room ? state.rooms[ctx.bind.room] : null);
          if (room) out.push(SB.Rooms.adjustRel(state, room.id, eff.d, 'EVENT'));
          break;
        case 'WORD': out.push(SB.Territory.adjustWord(state, eff.d, 'EVENT')); break;
        case 'NAME': out.push(SB.Game.adjustName(state, eff.d, 'EVENT')); break;
        case 'REGULARS': out = out.concat(regulars(state, eff, show)); break;
        case 'FOLLOWERS':
          if (typeof eff.pct === 'number') SB.Game.adjustFollowers(state, { mul: 1 + eff.pct }, 'EVENT');
          else SB.Game.adjustFollowers(state, eff.d || 0, 'EVENT');
          break;
        case 'SHOW_MOD': setMod(state, needShow(show, 'SHOW_MOD'), eff, ctx); break;
        case 'JOB': job(state, needShow(show, 'JOB'), eff); break;
        case 'MOVE_SHOW': out = out.concat(moveShow(state, needShow(show, 'MOVE_SHOW'), eff, ctx)); break;
        case 'CANCEL_SHOW':
          if (eff.why && !E.CANCEL[eff.why]) SB.fail('Effects.apply', 'unknown CANCEL "' + eff.why + '"');
          res = SB.Shows.cancel(state, needShow(show, 'CANCEL_SHOW').id, eff.why || E.CANCEL.PLAYER);
          if (res && res.records) out = out.concat(res.records);
          if (res && !res.ok && ctx.out) ctx.out.text = res.why;
          break;
        case 'DROP_BAND':
          bandsOf(state, refIds(state, ctx, eff.who)).forEach(function (b) {
            res = SB.Shows.dropBand(state, needShow(show, 'DROP_BAND').id, b, E.CANCEL.BAND);
            if (res && res.records) out = out.concat(res.records);
          });
          break;
        case 'ADD_BAND':
          ids = eff.who ? bandsOf(state, refIds(state, ctx, eff.who)) : [];
          if (!ids.length && eff.pick) { a = pickBand(state, needShow(show, 'ADD_BAND'), eff.pick); if (a) ids = [a]; }
          ids.forEach(function (b) {
            SB.Shows.addBand(state, needShow(show, 'ADD_BAND').id, b,
                             { role: E.BILL_ROLE.LOCAL, pay: E.LOCAL_PAY.FREE, fee: 0, askId: null, minutes: C.SET.def });
            if (ctx.bind && !ctx.bind.band) ctx.bind.band = b;
          });
          if (!ids.length && ctx.out) ctx.out.noBand = true;
          break;
        case 'SWAP_ORDER':
          show = needShow(show, 'SWAP_ORDER');
          a = newOrder(show, eff.a ? refIds(state, ctx, eff.a)[0] : null, eff.b ? refIds(state, ctx, eff.b)[0] : null, eff.touringTo);
          SB.Shows.setBill(state, show.id, { order: a, minutes: billMinutes(show), doors: show.bill.doors });
          break;
        case 'CUT_SET':
          show = needShow(show, 'CUT_SET');
          a = billMinutes(show);
          bandsOf(state, refIds(state, ctx, eff.who)).forEach(function (b) { if (a[b]) a[b] = Math.max(C.SET.min, a[b] - (eff.minutes || C.SET.step)); });
          SB.Shows.setBill(state, show.id, { order: slotBands(show).map(function (x) { return x.bandId; }), minutes: a, doors: show.bill.doors });
          break;
        case 'CREW': out = out.concat(crew(state, needShow(show, 'CREW'), eff, ctx)); break;
        case 'ROOM_PRESSURE': case 'STANDING':
          room = show ? roomOf(state, show) : (ctx.bind && ctx.bind.room && state.rooms ? state.rooms[ctx.bind.room] : null);
          if (!room) break;
          // SPEC?: no Rooms function writes pressure or standing; the effect writes the room's fields, clamped 0..100.
          if (eff.op === 'ROOM_PRESSURE') { room.hid = room.hid || {}; room.hid.pressure = U.clamp((room.hid.pressure || 0) + eff.d, 0, 100); }
          else {
            room.standing = room.standing || [60, 60, 60];
            for (i = 0; i < 3; i++) {
              if (eff.gens && list(eff.gens).map(genIndex).indexOf(i) < 0) continue;
              room.standing[i] = U.clamp(room.standing[i] + eff.d, 0, 100);
            }
          }
          break;
        case 'INCIDENT':
          show = needShow(show, 'INCIDENT');
          if (!E.INCIDENT[eff.kind]) SB.fail('Effects.apply', 'unknown incident "' + eff.kind + '"');
          // SPEC?: the night score adds the sum of incident q; an incident from an event is carried as qAdd and listed
          // on show.mods.incidents (or show.night.incidents during a night) for Night and Rooms.afterShow to read.
          /* security on the night takes part of the sting out of a fight, a crowd at the gate or a theft (C.SECURITY.costMul) */
          i = eff.q || 0;
          if (i < 0 && show.crew && show.crew.security && C.SECURITY.incidents.indexOf(eff.kind) >= 0) i = Math.round(i * C.SECURITY.costMul * 10) / 10;
          setMod(state, show, { key: 'qAdd', v: i }, ctx);
          s = show.night ? (show.night.incidents = show.night.incidents || []) : ((show.mods = show.mods || {}).incidents = show.mods.incidents || []);
          s.push({ kind: eff.kind, q: i, fromEvent: true });
          out.push(rec(state, E.REC.INCIDENT, show.id, '',
                       { at: (show.night && show.night.at && show.night.at.at) || null, kind: eff.kind, q: i }));
          break;
        case 'DISPUTE': out = out.concat(dispute(state, needShow(show, 'DISPUTE'), eff, ctx)); break;
        case 'ROOM_HOLD':
          if (!E.HOLD_DO[eff.do]) SB.fail('Effects.apply', 'unknown ROOM_HOLD do "' + eff.do + '"');
          sid = (show || needShow(show, 'ROOM_HOLD')).id;
          res = eff.do === 'CONFIRM' ? SB.Rooms.confirm(state, sid) : SB.Rooms.release(state, sid);
          if (res && !res.ok && ctx.out) ctx.out.text = res.why;
          if (res && res.records) out = out.concat(res.records);
          break;
        case 'CIRCLE_ADD': out = out.concat(circleAdd(state, eff, ctx)); break;
        case 'FLAG':
          if (typeof eff.key !== 'string') SB.fail('Effects.apply', 'FLAG needs a key');
          state.flags = state.flags || {};
          state.flags[eff.key] = eff.v === undefined ? true : eff.v;
          break;
        case 'NOTE': out = out.concat(note(state, eff, ctx)); break;
        case 'MESSAGE': out = out.concat(message(state, eff, ctx)); break;
        case 'FOLLOWUP':
          if (typeof eff.event !== 'string') SB.fail('Effects.apply', 'FOLLOWUP needs an event id');
          state.director = state.director || {};
          state.director.followups = state.director.followups || [];
          a = isArr(eff.delay) ? dirRng(state).int(eff.delay[0], eff.delay[1]) : (eff.delay || 7);
          state.director.followups.push({ eventId: eff.event, day: today(state) + a, bind: U.copy((ctx && ctx.bind) || {}),
                                          p: eff.p === undefined ? 1 : eff.p });
          break;
        case 'NEW_BAND': out = out.concat(newBand(state, eff, show)); break;
        case 'NEW_ROOM':
          if (eff.kind && !E.ROOM[eff.kind]) SB.fail('Effects.apply', 'unknown room kind "' + eff.kind + '"');
          a = SB.WorldGen.room(state, { kind: eff.kind || 'DIY', zoneId: 'city', hood: eff.hood || null });
          out.push(rec(state, E.REC.NEWS, sid, '', { k: 'ROOM_OPENED', refs: { roomId: a } }));
          break;
        case 'MEMORY':
          if (eff.detail && !E.MEMORY[eff.detail]) SB.fail('Effects.apply', 'unknown MEMORY detail "' + eff.detail + '"');
          show = needShow(show, 'MEMORY');
          state.legacy = state.legacy || {};
          state.legacy.details = state.legacy.details || {};
          state.legacy.details[show.id] = { detail: eff.detail || 'ORDINARY', rarity: eff.rarity === undefined ? .9 : eff.rarity,
                                            object: eff.object || null };
          break;
        case 'FAVOR':
          refIds(state, ctx, eff.who).forEach(function (id) { if (state.people && state.people[id]) SB.People.favor(state, id, eff.d || 0); });
          break;
        case 'FLYER_TAG':
          if (!E.FLYER_TAG[eff.tag]) SB.fail('Effects.apply', 'unknown flyer tag "' + eff.tag + '"');
          show = needShow(show, 'FLYER_TAG');
          if ((show.tags || []).indexOf(eff.tag) < 0) SB.Shows.setLabel(state, show.id, show.label, (show.tags || []).concat([eff.tag]));
          break;
        case 'TREND_SIGN': out = out.concat(trendSign(state, eff, sid)); break;
        case 'CHANCE': out = out.concat(chance(state, eff, ctx)); break;
        case 'NOTHING': break;
      }
    });
    return out;
  }

  function hours(state, eff) {
    // SPEC?: no Week function changes week.cap; the effect writes it, never below zero. TODAY: the current half of today;
    // WEEK: a loss is taken from the nights of the days left, latest first; a gain goes to today.
    var w = state.week, d = Math.round(eff.d || 0), idx, half, i, h, take;
    if (!w || !isArr(w.cap) || !d) return;
    idx = U.clamp(today(state) - week(state) * 7, 0, 6);
    half = nowHalf(state);
    if (d > 0 || eff.when !== 'WEEK') { w.cap[idx][half] = Math.max(0, (w.cap[idx][half] || 0) + d); return; }
    take = -d;
    for (i = 6; i >= idx && take > 0; i--) {
      ['NIGHT', 'DAY'].forEach(function (hh) {
        if (take <= 0) return;
        h = Math.min(take, w.cap[i][hh] || 0);
        w.cap[i][hh] -= h; take -= h;
      });
    }
  }

  function regulars(state, eff, show) {
    var pct = eff.pct || 0, n, by = {}, z;
    if (pct < 0) {
      n = SB.Crowd.loseRegulars(state, -pct, eff.only === 'CAME' && show ? { came: show.id } : null, 'EVENT');
      return [rec(state, E.REC.REGULARS, show ? show.id : null, '', { won: 0, lost: Math.round(n || 0), total: (state.regulars && state.regulars.total) || 0 })];
    }
    if (pct > 0 && state.regulars && state.regulars.by) {
      for (z in state.regulars.by) by[z] = state.regulars.by[z].map(function (row) { return row.map(function (x) { return x * pct; }); });
      n = SB.Crowd.addRegulars(state, by, 'EVENT');
      return [rec(state, E.REC.REGULARS, show ? show.id : null, '', { won: Math.round(n || 0), lost: 0, total: state.regulars.total || 0 })];
    }
    return [];
  }

  function job(state, show, eff) {
    if (!E.JOB[eff.type]) SB.fail('Effects.apply', 'unknown job type "' + eff.type + '"');
    var j = jobsOfShow(state, show, eff.type).filter(function (x) { return x.status !== E.JOB_STATUS.MOOT; })[0], p, i;
    if (!j) return;
    // SPEC?: no Jobs function sets a job's status; the effect writes it (E1b owns the field).
    if (eff.set) {
      if (['DONE', 'TODO', 'SKIPPED'].indexOf(eff.set) < 0) SB.fail('Effects.apply', 'JOB set must be DONE, TODO or SKIPPED');
      j.status = eff.set;
      if (eff.set === 'DONE') { j.doneDay = today(state); j.by = j.by || 'player'; j.timing = j.timing || E.TIMING.ON_TIME; }
      if (eff.set === 'SKIPPED') j.timing = E.TIMING.SKIPPED;
    }
    if (eff.addHours && state.week && isArr(state.week.plan)) {
      for (i = 0; i < state.week.plan.length; i++) {
        p = state.week.plan[i];
        if (p.jobId !== j.id) continue;
        p.hours = (p.hours || 0) + eff.addHours;
        if (state.week.used && state.week.used[p.dayIdx]) state.week.used[p.dayIdx][p.half] = (state.week.used[p.dayIdx][p.half] || 0) + eff.addHours;
      }
    }
  }

  function moveShow(state, show, eff, ctx) {
    var day = show.day + (eff.dayShift || 0), roomId = show.roomId, rooms, i, cal, res;
    if (eff.toKind) {
      if (!E.ROOM[eff.toKind]) SB.fail('Effects.apply', 'unknown room kind "' + eff.toKind + '"');
      rooms = SB.Rooms.list(state, { kind: eff.toKind, open: true }) || [];
      roomId = null;
      for (i = 0; i < rooms.length && !roomId; i++) {
        cal = SB.Rooms.calendar(state, rooms[i], day, 1) || [];
        if (!cal.length || cal[0].state === E.NIGHT_STATE.OPEN) roomId = rooms[i];
      }
      if (!roomId) roomId = show.roomId;     // none open: the show stays where it was, unconfirmed on the new night
    }
    res = SB.Shows.move(state, show.id, { roomId: roomId, day: day, slot: show.slot, hold: null });
    if (res && !res.ok && ctx.out) ctx.out.text = res.why;
    return (res && res.records) || [];
  }

  function crew(state, show, eff, ctx) {
    var role = String(eff.role || '').toLowerCase(), to = eff.to, pid = null, out = [], R = role.toUpperCase(), b, p;
    if (['sound', 'security', 'floor', 'lodging'].indexOf(role) < 0) SB.fail('Effects.apply', 'CREW role must be sound, security, floor or lodging');
    if (to === 'NEW') {
      pid = SB.WorldGen.person(state, { roles: [R === 'LODGING' ? 'LODGING' : R], gen: 1, zoneId: 'city' });
      p = state.people && state.people[pid];
      if (p) {
        p.hid = p.hid || {};
        p.hid.skill = p.hid.skill || {};
        if (typeof eff.skill === 'number') p.hid.skill[R] = eff.skill;
        if (ctx.bind && ctx.bind.new && p.first !== undefined) p.first = ctx.bind.new;   // the stand-in the text named
        out.push(SB.People.meet(state, pid, show.id));
      }
    } else if (to === 'BAND') {
      b = slotBands(show).length ? state.bands[slotBands(show)[slotBands(show).length - 1].bandId] : null;
      pid = b ? (b.contactId || (b.members && b.members[0] && b.members[0].personId) || null) : null;
      p = pid && state.people ? state.people[pid] : null;
      if (p) { p.hid = p.hid || {}; p.hid.skill = p.hid.skill || {}; if (typeof eff.skill === 'number' || p.hid.skill[R] === undefined) p.hid.skill[R] = typeof eff.skill === 'number' ? eff.skill : .35; }
    } else if (to === 'PLAYER') pid = 'player';
    else if (to) pid = refIds(state, ctx, to)[0] || null;
    /* the event hands you this person (a stand-in, the closer's PA): they are on the show without an ask of their own.
     * setCrew wants an asked yes, which refused the swap ("Something else has to be done first.") and left the old
     * crew on the show, paid and quoted */
    var res = pid && pid !== 'player' && (to === 'NEW' || to === 'BAND') ? (SB.Shows.assignCrew(state, show.id, role, pid), { ok: true })
                                                                         : SB.Shows.setCrew(state, show.id, role, pid);
    if (res && !res.ok && ctx.out) ctx.out.text = res.why;
    return out;
  }

  function dispute(state, show, eff, ctx) {
    if (!E.DISPUTE[eff.resolve]) SB.fail('Effects.apply', 'unknown DISPUTE resolve "' + eff.resolve + '"');
    var d = show.night && show.night.dispute, tour = null, out = [];
    slotBands(show).forEach(function (s) { if (s.role === E.BILL_ROLE.TOURING && !tour) tour = s.bandId; });
    if (!d) return out;                    // no dispute stands open on this show: nothing to settle
    // SPEC?: Night pays the touring line at settle; the effect fixes which figure it pays and charges the trust.
    d.settled = eff.resolve;
    d.pay = eff.resolve === 'THEIRS' ? d.theirs : (eff.resolve === 'YOURS' ? d.yours : d.split);
    if (tour && eff.resolve !== 'THEIRS') {
      out.push(SB.Bands.addTrust(state, tour, 'PAID_SHORT', { showId: show.id, scale: 0, mul: eff.resolve === 'YOURS' ? 1 / 3 : 1 / 6 }));
    }
    return out;
  }

  function circleAdd(state, eff, ctx) {
    var id = refIds(state, ctx, eff.who || '$person')[0], p, c, role, out = [];
    if (!id || !(state.people && state.people[id])) return out;
    p = state.people[id];
    if (eff.role && ['RUNNER', 'ARTIST', 'FLOOR', 'LODGING'].indexOf(eff.role) < 0) SB.fail('Effects.apply', 'CIRCLE_ADD role must be RUNNER, ARTIST, FLOOR or LODGING');
    out.push(SB.People.meet(state, id, ctx.show ? showOf(state, ctx).id : null));
    c = SB.People.circle(state);
    if (c.people.length >= c.max) { if (ctx.out) ctx.out.full = true; return out; }
    role = eff.role || (p.taste && (p.taste.loves || []).length > 1 ? 'RUNNER' : (p.gen === 0 ? 'ARTIST' : 'FLOOR'));
    p.roles = p.roles || [];
    if (p.roles.indexOf(role) < 0) p.roles.push(role);
    return out;
  }

  function note(state, eff, ctx) {
    var text = eff.text ? SB.text.render(eff.text, slots(state, ctx), textRng(state))
                        : (eff.path ? SB.text.line(eff.path, slots(state, ctx), textRng(state)) : '');
    if (!eff.text && !eff.path) SB.fail('Effects.apply', 'NOTE needs a path or a text');
    var conf = eff.conf === undefined ? E.CONF.RUMOR : eff.conf;
    var id = SB.Notebook.addNote(state, { page: eff.page || 'HOW', title: text, body: '', conf: conf, from: null, week: week(state), pinned: false });
    return [rec(state, E.REC.NOTE, showOf(state, ctx) ? showOf(state, ctx).id : null, text,
                { learned: { key: id || '', label: text, from: 0, to: conf, text: text, because: '' } })];
  }

  function message(state, eff, ctx) {
    var from = eff.from ? refIds(state, ctx, eff.from)[0] || null : null, sl = slots(state, ctx), item, body;
    if (!eff.path && !eff.text && !eff.localAsk) SB.fail('Effects.apply', 'MESSAGE needs a path, a text or a localAsk');
    if (eff.localAsk && !E.LOCAL_ASK[eff.localAsk]) SB.fail('Effects.apply', 'unknown LOCAL_ASK "' + eff.localAsk + '"');
    body = eff.text ? SB.text.render(eff.text, sl, textRng(state)) : (eff.path ? SB.text.line(eff.path, sl, textRng(state)) : '');
    item = { day: today(state) + Math.max(0, Math.round(eff.delay || 0)), what: eff.localAsk ? 'LOCAL' : 'MESSAGE',
             fromId: from, body: body, needs: !!eff.needs, localAsk: eff.localAsk || null,
             showId: showOf(state, ctx) ? showOf(state, ctx).id : null };
    if (item.day <= today(state)) return deliverLater(state, item);
    state.director = state.director || {};
    state.director.later = state.director.later || [];
    state.director.later.push(item);
    return [];
  }

  /* Deliver one postponed item: a message, or a local request from a band. Used by the Director when its day comes. */
  function deliverLater(state, item) {
    if (item.what === 'LOCAL' && item.fromId && state.bands && state.bands[item.fromId]) {
      return request(state, { kind: E.REQ_KIND.LOCAL_ASK, template: 'LOCAL', bandId: item.fromId, localAsk: item.localAsk || 'EMPTY_NIGHT' }).records;
    }
    return [post(state, { kind: item.kind || msgKindFor(state, item.fromId), fromId: item.fromId,
                          fromName: item.fromName || nameOf(state, item.fromId), subject: item.subject || '', body: item.body || '',
                          needs: !!item.needs, keep: !!item.keep, refs: { showId: item.showId || null, bandId: item.bandId || null } })];
  }

  function newBand(state, eff, show) {
    var genre = eff.genre, spec = { zoneId: 'city', stage: 'FORMING' }, members = [], id, out = [];
    if (genre === 'HOT' || !genre) {
      genre = E.GENRES.reduce(function (best, g) { return SB.Trends.heat(state, g) > SB.Trends.heat(state, best) ? g : best; }, E.GENRES[0]);
    } else if (!E.GENRE[genre]) SB.fail('Effects.apply', 'unknown genre "' + genre + '"');
    spec.genre = genre;
    if (eff.from === 'MEMBERS' && show) {
      slotBands(show).forEach(function (s) {
        var b = state.bands[s.bandId];
        if (b && b.local && b.members && b.members.length && members.length < 2) members.push(b.members[b.members.length - 1].personId);
      });
      if (members.length) spec.memberIds = members;
    } else if (show) spec.fromShowId = show.id;
    id = SB.WorldGen.band(state, spec);
    out.push(rec(state, E.REC.NEWS, show ? show.id : null, '', { k: 'BAND_FORMED', refs: { bandId: id, showId: show ? show.id : null } }));
    if (spec.fromShowId) { var m = SB.Legacy.mark(state, 'BAND_FROM_SHOW', { bandId: id, showId: show.id }); if (m) out.push(m); }
    if (eff.wantsShow && state.bands && state.bands[id]) {
      out = out.concat(deliverLater(state, { what: 'LOCAL', fromId: id, localAsk: 'FIRST_SHOW' }));
    }
    return out;
  }

  function trendSign(state, eff, sid) {
    var genre = eff.genre;
    if (genre === 'HOT' || !genre) genre = E.GENRES.reduce(function (b, g) { return SB.Trends.heat(state, g) > SB.Trends.heat(state, b) ? g : b; }, E.GENRES[0]);
    else if (!E.GENRE[genre]) SB.fail('Effects.apply', 'unknown genre "' + genre + '"');
    // SPEC?: town.signs belongs to Trends and has no writer function; the sign narrows the player's heat estimate and is news.
    var l = SB.Notebook.narrow(state, 'heat:' + genre, C.HUNCH, 'TOLD');
    var out = [rec(state, E.REC.NEWS, sid, '', { k: 'TREND_SIGN', refs: { genre: genre } })];
    if (l) out.push(rec(state, E.REC.NOTE, sid, l.text || '', { learned: l }));
    return out;
  }

  function chance(state, eff, ctx) {
    var p = eff.p, i, hit, r;
    if (isArr(eff.pIf)) {
      for (i = 0; i < eff.pIf.length; i++) if (test(state, eff.pIf[i].if, ctx)) { p = eff.pIf[i].p; break; }
    }
    if (typeof p !== 'number') p = 0.5;
    hit = dirRng(state).chance(p);
    r = apply(state, hit ? (eff.then || []) : (eff.else || []), ctx);
    if (ctx.out) {
      var t = hit ? eff.thenText : eff.elseText;
      if (t) ctx.out.text = SB.text.render(t, slots(state, ctx), textRng(state));
      ctx.out.chance = hit;
    }
    return r;
  }

  /* ---------------- preview ---------------- */

  function chipsFor(state, eff, ctx, show) {
    var out = [], names, k, size;
    switch (eff.op) {
      case 'MONEY': out.push({ k: 'MONEY', v: amountOf(state, eff, show), who: null }); break;
      case 'STRESS': out.push({ k: 'STRESS', v: eff.d, who: null }); break;
      case 'HOURS': out.push({ k: 'HOURS', v: eff.d, who: null }); break;
      case 'TRUST':
        names = refIds(state, ctx, eff.who).map(function (id) { return nameOf(state, id); }).join(', ') || null;
        if (eff.k) { size = (C.TRUST_EVENTS[eff.k] || {}).size; out.push({ k: 'TRUST', v: size === undefined ? 0 : size, who: names }); }
        else out.push({ k: 'TRUST', v: eff.d || 0, who: names });
        break;
      case 'REL': case 'ROOM_REL':
        names = eff.op === 'REL' ? refIds(state, ctx, eff.who).map(function (id) { return nameOf(state, id); }).join(', ') : (show ? nameOf(state, (roomOf(state, show) || {}).ownerId) : '');
        out.push({ k: 'REL', v: eff.d || 0, who: names || null });
        break;
      case 'WORD': out.push({ k: 'WORD', v: eff.d, who: null }); break;
      case 'NAME': out.push({ k: 'NAME', v: eff.d, who: null }); break;
      case 'REGULARS': out.push({ k: 'REGULARS', v: eff.pct || 0, who: null }); break;
      case 'SHOW_MOD':
        k = eff.key;
        if (k === 'qAdd') out.push({ k: 'Q', v: eff.v, who: null });
        else if (k === 'qMul') out.push({ k: 'Q', v: Math.round((eff.v - 1) * 100), who: null });
        else if (k === 'headsMul' || k === 'genMul' || k === 'zoneMul' || k === 'reachMul' || k === 'capMul') out.push({ k: 'HEADS', v: U.round(eff.v - 1, 2), who: null });
        else if (k === 'lateMin' && eff.v > 0) out.push({ k: 'RISK', v: eff.v, who: null });
        else if (k === 'uncapped') out.push({ k: 'RISK', v: 1, who: null });
        break;
      case 'INCIDENT': out.push({ k: 'Q', v: eff.q || 0, who: null }); break;
      case 'MOVE_SHOW': case 'CANCEL_SHOW': out.push({ k: 'RISK', v: 1, who: null }); break;
      case 'DISPUTE':
        if (show && show.night && show.night.dispute) {
          var d = show.night.dispute;
          if (eff.resolve === 'THEIRS') out.push({ k: 'MONEY', v: -Math.max(0, d.theirs - d.yours), who: null });
          else if (eff.resolve === 'SPLIT') out.push({ k: 'MONEY', v: -Math.max(0, Math.round((d.theirs - d.yours) / 2)), who: null });
        }
        if (eff.resolve !== 'THEIRS') out.push({ k: 'TRUST', v: eff.resolve === 'YOURS' ? [-7, -3] : [-3, -1], who: null });
        break;
      case 'CHANCE': out.push({ k: 'RISK', v: typeof eff.p === 'number' ? eff.p : [0, 1], who: null }); break;
    }
    return out;
  }

  function preview(state, effects, ctx) {
    ctx = ctx || {};
    if (!effects) return [];
    if (!isArr(effects)) SB.fail('Effects.preview', 'effects must be a list');
    var show = showOf(state, ctx), out = [];
    effects.forEach(function (eff) {
      if (!eff || !E.EFFECT[eff.op]) SB.fail('Effects.preview', 'unknown effect op "' + (eff && eff.op) + '"');
      out = out.concat(chipsFor(state, eff, ctx, show));
    });
    return out;
  }

  return { test: test, why: why, apply: apply, preview: preview,
           /* internal, beyond the manifest */
           slots: slots, request: request, post: post, deliverLater: deliverLater, refIds: refIds, calendarEntry: calendarEntry,
           textPath: textPath };
});
