/* Scene Booker — engine/story/legacy.js
 * SB.Legacy: show records kept forever, memory, the distinctive detail and story names, the wall, firsts, stages,
 * career offers, endings, the year page. Owner: E4. Spec: 02-engine 4b and 7.22; 01-state 2.9; story 6. Stream: LEGACY.
 */
SB.module('Legacy', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util, M = C.MEMORY;
  /* The distinctive detail, rarest first (02-engine 7.22), with the rarity used for a ROUGH night's place on the wall. */
  var RARITY = { ROOM_LAST: .98, REUNION: .96, STORM: .94, INCIDENT: .9, DECISION: .75, BAND_FIRST: .6, TOURING_FIRST: .55,
                 TOWN_FIRST: .5, TURNED_AWAY: .45, OBJECT: .4, BAND_LAST: .97, ROOM_FIRST: .5, ORDINARY: 0 };
  var SEASONS = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter'];

  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function nowHalf(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function rng(state) { return SB.rng.stream(state, E.STREAM.LEGACY); }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function isArr(x) { return Array.isArray(x); }

  function leg(state) {
    var l = state.legacy = state.legacy || {};
    if (!l.records || typeof l.records !== 'object') l.records = {};
    ['wall', 'firsts', 'bandsFromShows', 'roomsKept', 'years', 'offers'].forEach(function (k) { if (!isArr(l[k])) l[k] = []; });
    if (l.ended === undefined) l.ended = null;
    if (!l.details || typeof l.details !== 'object') l.details = {};     // showId -> { detail, rarity, object } from MEMORY effects
    if (!l.offerLast || typeof l.offerLast !== 'object') l.offerLast = {};   // 'ROOM:r3' | 'BAND:b7' -> week offered
    return l;
  }

  function rec(state, t, showId, text, extra) {
    var r = { t: t, day: today(state), half: nowHalf(state), showId: showId || null, text: text || '' }, k;
    if (extra) for (k in extra) r[k] = extra[k];
    return r;
  }

  function say(state, path, sl) { return !SB.text.off && SB.text.has(path) ? SB.text.line(path, sl, textRng(state)) : ''; }
  function pname(state, id) { var p = id && state.people ? state.people[id] : null; return p ? [p.first, p.last].filter(Boolean).join(' ') : ''; }
  function bname(state, id) { var b = id && state.bands ? state.bands[id] : null; return b ? b.name : ''; }
  function shortRoom(name) { return String(name || '').replace(/^the /i, ''); }
  function ordered(l) { return Object.keys(l.records).map(function (k) { return l.records[k]; }).sort(function (a, b) { return a.day - b.day; }); }
  function over(state) { return (state.clock && state.clock.phase === E.PHASE.OVER) || !!leg(state).ended; }
  function log(state, records) { if (records.length) SB.Week.log(state, records); }

  /* ---------------- stages and firsts ---------------- */

  function stage(state) {
    var pl = state.player || {}, l = leg(state), S = C.STAGES, s = pl.stage || 1, t = 1, name = pl.name || 0, shows = pl.showsPlayed || 0;
    var word = state.town ? state.town.word || 0 : 0;
    if (name >= S[2].name && shows >= S[2].shows) t = 2;
    if (t >= 2 && name >= S[3].name && word >= S[3].word && shows >= S[3].shows) t = 3;
    if (t >= 3 && name >= S[4].name && word >= S[4].word) t = 4;
    if (l.offers.length) t = 4;
    if (t > s) {
      pl.stage = t;
      if (t >= 2) mark(state, 'STAGE_2', {});
      if (t >= 3) mark(state, 'STAGE_3', {});
    }
    return pl.stage || 1;
  }

  function firstSlots(state, refs) {
    var o = { heads: null, room: '', dow: '', band: '' }, r = refs && refs.showId ? leg(state).records[refs.showId] : null, s;
    s = refs && refs.showId && state.shows ? state.shows[refs.showId] : null;
    if (r) { o.heads = r.heads; o.room = r.roomName; o.dow = SB.time.fmt(r.day, 'dow'); }
    else if (s) { o.room = s.roomId && state.rooms && state.rooms[s.roomId] ? state.rooms[s.roomId].name : ''; o.dow = SB.time.fmt(s.day, 'dow'); }
    if (refs && refs.bandId) o.band = bname(state, refs.bandId);
    if (refs && refs.roomId && state.rooms && state.rooms[refs.roomId]) o.room = state.rooms[refs.roomId].name;
    o.town = r && state.zones && state.zones[r.zoneId] ? state.zones[r.zoneId].name : '';
    o.word = state.town ? SB.text.label('wordTier.' + SB.Territory.tier(state.town.word || 0) + '.name') : '';
    return o;
  }

  function mark(state, k, refs) {
    if (!E.FIRST[k]) SB.fail('Legacy.mark', 'unknown FIRST "' + k + '"');
    var l = leg(state), text;
    refs = refs || {};
    if (k === 'BAND_FROM_SHOW' && refs.bandId) l.bandsFromShows.push({ bandId: refs.bandId, showId: refs.showId || null, personId: refs.personId || null });
    if (k === 'ROOM_KEPT' && refs.roomId) l.roomsKept.push({ roomId: refs.roomId, week: week(state) });
    if (l.firsts.some(function (f) { return f.k === k; })) return null;
    text = say(state, 'legacy.firsts.' + k, firstSlots(state, refs));
    l.firsts.push({ k: k, week: week(state), text: text, refs: U.copy(refs) });
    return rec(state, E.REC.FIRST, refs.showId || null, text, { k: k });
  }

  /* ---------------- after a show ---------------- */

  function storySlots(state, show, r, detail, obj) {
    var slotsB = r.bill, touring = null, band = null, local = null, i;
    for (i = 0; i < slotsB.length; i++) {
      if (slotsB[i].role === E.BILL_ROLE.TOURING && !touring) touring = slotsB[i];
      if (slotsB[i].role === E.BILL_ROLE.LOCAL) local = slotsB[i];
    }
    band = (r.firstBand && slotsB.filter(function (x) { return x.bandId === r.firstBand; })[0]) || local || slotsB[slotsB.length - 1] || null;
    var tb = touring && state.bands ? state.bands[touring.bandId] : null;
    var lb = band && state.bands ? state.bands[band.bandId] : null;
    var inc = r.incidents[0];
    return {
      band: band ? band.name : '', touring: touring ? touring.name : '', room: r.roomName, roomShort: shortRoom(r.roomName),
      home: tb && tb.place ? tb.place.name : (lb && lb.zoneId && state.zones && state.zones[lb.zoneId] ? state.zones[lb.zoneId].name : ''),
      dow: SB.time.fmt(r.day, 'dow'), object: obj || '', town: state.zones && state.zones[r.zoneId] ? state.zones[r.zoneId].name : '',
      incident: inc && SB.text.has('legacy.incident.' + inc) ? SB.text.line('legacy.incident.' + inc, {}, null) : '',
      decision: r.choiceText || ''
    };
  }

  function afterShow(state, show, result) {
    if (!show || typeof show !== 'object') SB.fail('Legacy.afterShow', 'show must be a Show');
    if (!result || typeof result !== 'object') SB.fail('Legacy.afterShow', 'result must be a ShowResult');
    var l = leg(state), out = [], room = show.roomId && state.rooms ? state.rooms[show.roomId] : null, prior = ordered(l);
    var slots = (show.bill && show.bill.slots) || [], times = (show.bill && show.bill.times) || [], verdict = result.verdict || 'HELD';
    var bill = slots.map(function (s, i) {
      var b = state.bands && state.bands[s.bandId];
      return { bandId: s.bandId, name: b ? b.name : '', role: s.role, start: times[i] === undefined ? null : times[i], followers: b ? b.followers || 0 : 0 };
    });
    var seenBand = {}, seenRoom = false, seenZone = false, touringBefore = !!l.touringFirstDone, i;
    prior.forEach(function (p) {
      p.bill.forEach(function (b) { seenBand[b.bandId] = true; });
      if (p.roomId === show.roomId) seenRoom = true;
      if (p.zoneId === show.zoneId) seenZone = true;
    });
    var firstBand = null;
    bill.forEach(function (b) {
      var band = state.bands && state.bands[b.bandId];
      if (!firstBand && b.role === E.BILL_ROLE.LOCAL && band && !seenBand[b.bandId] && (band.plays || []).filter(function (d) { return d < show.day; }).length === 0) firstBand = b.bandId;
    });
    var touringFirst = !touringBefore && bill.some(function (b) {
      var band = state.bands && state.bands[b.bandId];
      return b.role === E.BILL_ROLE.TOURING && band && (band.tierPublic || 0) >= 2;
    });
    var zone = state.zones && state.zones[show.zoneId];
    var townFirst = !!zone && zone.kind === 'FEEDER' && !seenZone;
    var roomLast = !!room && (room.open === false || room.closedWeek !== null && room.closedWeek !== undefined);
    var roomFirst = !!room && !seenRoom && (room.playerShows || 0) <= 1;
    var reunion = (show.tags || []).indexOf('REUNION') >= 0;
    var turned = (result.turnedAway || 0) > 0;
    var given = l.details[show.id] || null;
    var storm = !!(given && given.detail === 'STORM');
    var incidents = (result.incidents || []).map(function (x) { return x.kind; });
    var choices = (result.choices || []).map(function (c) { return { decision: c.eventId, option: c.optionId }; });

    var memory = verdict === 'WALL' ? M.WALL : (verdict === 'TALKED' ? M.TALKED : 0);
    [firstBand, touringFirst, roomFirst || roomLast, reunion, turned, storm, townFirst].forEach(function (x) { if (x) memory += M.each; });

    var detail = 'ORDINARY', obj = null;
    if (given && given.detail && given.detail !== 'ORDINARY') { detail = given.detail; obj = given.object; }
    else if (roomLast) detail = 'ROOM_LAST';
    else if (reunion) detail = 'REUNION';
    else if (incidents.length) detail = 'INCIDENT';
    else if (choices.length) detail = 'DECISION';
    else if (firstBand) detail = 'BAND_FIRST';
    else if (touringFirst) detail = 'TOURING_FIRST';
    else if (townFirst) detail = 'TOWN_FIRST';
    else if (turned) detail = 'TURNED_AWAY';
    else {
      var objs = SB.Content.legacy && isArr(SB.Content.legacy.objects) ? SB.Content.legacy.objects : [];
      if (objs.length && rng(state).chance(0.3)) { detail = 'OBJECT'; obj = rng(state).pick(objs); }
    }
    var rarity = given && typeof given.rarity === 'number' && given.detail === detail ? given.rarity : (RARITY[detail] || 0);
    var wall = memory >= C.WALL_AT && (verdict !== 'ROUGH' || rarity >= M.roughStoryRarity);

    var call = result.call || {}, par = result.par || {};
    var causes = (result.ledger || []).filter(function (x) { return x.cause; }).sort(function (a, b) { return Math.abs(b.d) - Math.abs(a.d); })
      .slice(0, 3).map(function (x) { return { cause: x.cause, d: Math.round(x.d) }; });
    var r = {
      showId: show.id, day: show.day, roomId: show.roomId || null, roomName: room ? room.name : '', zoneId: show.zoneId || null,
      bill: bill, heads: result.heads || 0, paid: result.paid || 0, comps: result.comps || 0, byGen: (result.byGen || [0, 0, 0]).slice(),
      par: par.heads === undefined ? null : par.heads, call: { lo: call.lo === undefined ? null : call.lo, hi: call.hi === undefined ? null : call.hi },
      q: result.q || 0, verdict: verdict, vsPar: result.vsPar || 'ABOUT', causes: causes, choices: choices, incidents: incidents,
      luck: (result.luck || []).map(function (x) { return x.k; }),
      posts: (result.posts && result.posts.lines ? result.posts.lines : []).slice(0, 3),
      flyer: show.flyer ? U.copy(show.flyer) : null, memory: memory, wall: wall, story: null, people: [],
      door: result.door && typeof result.door.gross === 'number' ? result.door.gross : 0, playerNet: result.playerNet || 0,
      detail: detail, firstBand: firstBand, choiceText: (result.choices && result.choices[0] && result.choices[0].text) || ''
    };
    if (memory >= C.WALL_AT) {
      r.story = { name: say(state, 'legacy.storyName.' + detail, storySlots(state, show, r, detail, obj)), detail: detail, told: r.heads };
    }
    l.records[show.id] = r;
    if (wall && l.wall.indexOf(show.id) < 0) l.wall.push(show.id);
    if (touringFirst) l.touringFirstDone = true;
    delete l.details[show.id];

    var stamps = [];
    if (typeof result.run === 'number' && result.run < 1) stamps.push('LATE');
    if (wall) stamps.push('REMEMBERED');
    if (turned || (room && r.heads >= room.cap)) stamps.push('PACKED');
    if (firstBand) stamps.push('FIRST_SHOW');
    if (roomLast) stamps.push('LAST_SHOW');
    out.push(rec(state, E.REC.MEMORY, show.id, r.story ? r.story.name : '', { score: memory, wall: wall, story: r.story ? { name: r.story.name } : null, stamps: stamps }));

    var req = show.requestId && state.requests ? state.requests[show.requestId] : null, m;
    [['SHOW', prior.length === 0], ['WALL', wall], ['FEEDER_SHOW', townFirst],
     ['COLD_ASK', !!req && req.kind === 'COLD'], ['RETURN', !!req && req.kind === 'RETURNING']].forEach(function (pair) {
      if (!pair[1]) return;
      m = mark(state, pair[0], { showId: show.id, roomId: show.roomId || null });
      if (m) out.push(m);
    });
    for (i = 0; i < out.length; i++) out[i].showId = show.id;
    return out;
  }

  /* ---------------- views ---------------- */

  function wall(state) {
    var l = leg(state);
    return l.wall.map(function (id) { return l.records[id]; }).filter(Boolean).sort(function (a, b) { return a.day - b.day; }).map(U.copy);
  }

  function binder(state, filter) {
    filter = filter || {};
    if (typeof filter !== 'object') SB.fail('Legacy.binder', 'filter must be an object');
    return ordered(leg(state)).filter(function (r) {
      if (filter.year !== undefined && filter.year !== null && SB.time.year(r.day) !== filter.year) return false;
      if (filter.roomId && r.roomId !== filter.roomId) return false;
      if (filter.bandId && !r.bill.some(function (b) { return b.bandId === filter.bandId; })) return false;
      if (filter.wallOnly && !r.wall) return false;
      if (filter.family && !r.bill.some(function (b) { var band = state.bands && state.bands[b.bandId]; return band && E.GENRE_FAMILY[band.genre] === filter.family; })) return false;
      return true;
    }).map(U.copy);
  }

  function bandHistory(state, bandId) {
    var b = state.bands && state.bands[bandId];
    if (!b) SB.fail('Legacy.bandHistory', 'unknown band "' + bandId + '"');
    var recs = binder(state, { bandId: bandId });
    return { name: b.name, lines: (b.history || []).map(function (h) { return { week: h.week, text: h.text || '' }; }),
             yourPart: say(state, 'legacy.bandHistory.yourPart', { band: b.name, n: recs.length, count: recs.length, shows: recs.length,
                                                                     first: recs[0] ? recs[0].roomName : '', room: recs[0] ? recs[0].roomName : '' }) };
  }

  function townLine(state) {
    var l = leg(state);
    return { line: ((state.town && state.town.wordLine) || []).map(function (x) { return { week: x.week, word: x.word, tier: SB.Territory.tier(x.word) }; }),
             marks: l.firsts.map(function (f) { return { week: f.week, text: f.text }; }) };
  }

  function firsts(state) { return leg(state).firsts.map(function (f) { return { k: f.k, week: f.week, text: f.text }; }); }

  function offerFrom(state, o) { return o.kind === 'BAND' ? (bname(state, o.bandId) || pname(state, o.fromId)) : pname(state, o.fromId); }

  function offers(state) {
    return leg(state).offers.map(function (o) { return { id: o.id, kind: o.kind, fromName: offerFrom(state, o), text: o.text || '', status: o.status }; });
  }

  /* ---------------- offers and endings ---------------- */

  function answerOffer(state, offerId, accept) {
    var l = leg(state), o = l.offers.filter(function (x) { return x.id === offerId; })[0], out = [], res, m;
    if (!o) SB.fail('Legacy.answerOffer', 'unknown offer "' + offerId + '"');
    if (over(state)) return U.no(E.REFUSE.OVER, SB.text.label('refuse.OVER'));
    if (o.status !== 'OPEN') return U.no(E.REFUSE.ALREADY, SB.text.label('refuse.ALREADY'));
    if (accept === 'LATER' || accept === 'NOT_YET') { o.until = week(state) + 4; return U.yes({ records: [] }); }
    if (accept === true || accept === 'ACCEPT') {
      o.status = 'ACCEPTED';
      res = end(state, o.kind === 'ROOM' ? E.END.TOOK_ROOM : E.END.TOOK_BAND, {});
      return U.yes({ records: (res && res.records) || [] });
    }
    o.status = 'DECLINED';
    m = mark(state, o.kind === 'ROOM' ? 'OFFER_ROOM' : 'OFFER_BAND', { roomId: o.roomId || null, bandId: o.bandId || null });
    if (m) out.push(m);
    if (o.kind === 'ROOM' && o.roomId && state.rooms && state.rooms[o.roomId]) out.push(SB.Rooms.adjustRel(state, o.roomId, -5, 'OFFER_DECLINED'));
    log(state, out);
    return U.yes({ records: out });
  }

  function epilogueSlots(state) {
    var recs = ordered(leg(state)), visits = {}, returned = 0, p = SB.Cities && state.citySlug && (!SB.Cities.isLoaded || SB.Cities.isLoaded(state.citySlug)) ? SB.Cities.pack(state) : null;
    recs.forEach(function (r) { r.bill.forEach(function (b) { if (b.role === E.BILL_ROLE.TOURING) visits[b.bandId] = (visits[b.bandId] || 0) + 1; }); });
    Object.keys(visits).forEach(function (k) { if (visits[k] > 1) returned++; });
    var toured = Object.keys(state.tours || {}).filter(function (t) { return state.tours[t].status === 'DONE'; }).length;
    var word = state.town ? state.town.word || 0 : 0;
    var owes = ((state.money && state.money.loans) || []).reduce(function (a, x) { return a + (x.amount || 0); }, 0);
    var top = {};
    recs.forEach(function (r) { top[r.roomName] = (top[r.roomName] || 0) + 1; });
    var topRoom = Object.keys(top).sort(function (a, b) { return top[b] - top[a]; })[0] || '';
    var bandCount = {};
    recs.forEach(function (r) { r.bill.forEach(function (b) { if (b.role === E.BILL_ROLE.LOCAL) bandCount[b.name] = (bandCount[b.name] || 0) + 1; }); });
    return { room: topRoom, band: Object.keys(bandCount).sort(function (a, b) { return bandCount[b] - bandCount[a]; })[0] || '',
             years: Math.max(1, Math.round(week(state) / 52)), oneYear: Math.max(1, Math.round(week(state) / 52)) === 1, shows: recs.length, returned: returned, toured: toured,
             wordTier: SB.text.label('wordTier.' + SB.Territory.tier(word) + '.name'), city: p && p.zones && p.zones[0] ? p.zones[0].name : '', owes: owes };
  }

  function end(state, how, args) {
    if (!E.END[how]) SB.fail('Legacy.end', 'unknown END "' + how + '"');
    var l = leg(state), out = [], epilogue;
    args = args || {};
    if (over(state)) return U.no(E.REFUSE.OVER, SB.text.label('refuse.OVER'));
    if (how === 'HANDED_ON') {
      if (!isArr(args.contacts) || args.contacts.length !== 3) SB.fail('Legacy.end', 'HANDED_ON needs three contacts');
      args.contacts.forEach(function (id) { if (!(state.people && state.people[id])) SB.fail('Legacy.end', 'unknown person "' + id + '"'); });
      if (!isArr(args.lines) || args.lines.length !== 3) SB.fail('Legacy.end', 'HANDED_ON needs three lines');
    }
    epilogue = say(state, 'legacy.endings.' + how, epilogueSlots(state));
    l.ended = { how: how, week: week(state), epilogue: epilogue,
                contacts: isArr(args.contacts) ? args.contacts.slice() : [], lines: isArr(args.lines) ? args.lines.slice() : [] };
    // SPEC?: clock.phase belongs to Week, which has no function to end a career; Legacy.end sets OVER itself.
    if (state.clock) state.clock.phase = E.PHASE.OVER;
    out.push(rec(state, E.REC.ENDING, null, epilogue, { how: how }));
    log(state, out);
    return U.yes({ epilogue: epilogue, records: out });
  }

  /* ---------------- the year ---------------- */

  function yearly(state) {
    var w = week(state), year = Math.floor(w / 52) + 1, from = (year - 1) * 364, to = year * 364 - 1, l = leg(state), all = ordered(l);
    var recs = all.filter(function (r) { return r.day >= from && r.day <= to; });
    var firstSeen = {};
    all.forEach(function (r) { r.bill.forEach(function (b) { if (firstSeen[b.bandId] === undefined) firstSeen[b.bandId] = r.day; }); });
    var firstShows = [];
    recs.forEach(function (r) { r.bill.forEach(function (b) { if (b.role === E.BILL_ROLE.LOCAL && firstSeen[b.bandId] === r.day && firstShows.indexOf(b.name) < 0) firstShows.push(b.name); }); });
    var toured = Object.keys(state.tours || {}).map(function (k) { return state.tours[k]; })
      .filter(function (t) { return t.doneWeek !== null && t.doneWeek !== undefined && Math.floor(t.doneWeek / 52) + 1 === year; })
      .map(function (t) { return bname(state, t.bandId); });
    var rooms = Object.keys(state.rooms || {}).map(function (k) { return state.rooms[k]; });
    var nights = recs.slice().sort(function (a, b) { return (b.memory - a.memory) || (b.q - a.q); }).slice(0, 3).map(U.copy);
    var kl = (state.town && state.town.kidsLine) || [], dirKey = 'FLAT';
    if (kl.length >= 2) { var a = kl[kl.length - 2].kids, b = kl[kl.length - 1].kids; dirKey = b > a * 1.03 ? 'UP' : (b < a * .97 ? 'DOWN' : 'FLAT'); }
    var seasons = [0, 1, 2, 3].map(function (q) {
      var qs = from + q * 91, qe = qs + 90, n = recs.filter(function (r) { return r.day >= qs && r.day <= qe; }).length;
      return say(state, 'legacy.year.season', { season: SEASONS[SB.time.month(qs + 45) - 1], shows: n, note: '' });
    });
    var top = {};
    recs.forEach(function (r) { top[r.roomName] = (top[r.roomName] || 0) + 1; });
    return {
      year: year, shows: recs.length, heads: U.sum(recs, function (r) { return r.heads; }), firstShows: firstShows, toured: toured,
      roomsOpen: rooms.filter(function (r) { return r.open !== false; }).length,
      roomsClosed: rooms.filter(function (r) { return r.closedWeek !== null && r.closedWeek !== undefined && Math.floor(r.closedWeek / 52) + 1 === year; }).map(function (r) { return r.name; }),
      nights: nights, crowd: say(state, 'legacy.year.crowd.' + dirKey, { n: year }),
      callTally: SB.Notebook.tally(state, SB.time.year(today(state))),
      flyers: recs.filter(function (r) { return r.wall; }).map(function (r) { return r.showId; }), seasons: seasons,
      forward: say(state, 'legacy.year.forward', { nextSeason: SEASONS[SB.time.month(to + 30) - 1] }),
      front: say(state, 'legacy.year.front', { years: year, oneYear: year === 1, shows: recs.length,
                 topRooms: Object.keys(top).sort(function (x, y) { return top[y] - top[x]; }).slice(0, 2).join(' and '),
                 returned: epilogueSlots(state).returned, owes: epilogueSlots(state).owes,
                 stories: recs.filter(function (r) { return r.story; }).length })
    };
  }

  /* ---------------- the week ---------------- */

  function offerDecision(state, o, subject, body) {
    var t = 'legacy.offers.' + o.kind + '.';
    return { id: U.newId(state, 'd'), kind: E.DECISION.OFFER, eventId: null, showId: null, day: today(state), half: 'DAY', at: null, tier: null,
             title: subject, body: body, offerId: o.id,
             options: [['ACCEPT', 'accept'], ['DECLINE', 'decline'], ['LATER', 'later']].map(function (x) {
               return { id: x[0], label: say(state, t + x[1], {}) || x[0], likely: '', costs: [], enabled: true, why: null };
             }) };
  }

  function makeOffer(state, kind, fromId, roomId, bandId) {
    var l = leg(state), o = { id: U.newId(state, 'o'), kind: kind, week: week(state), fromId: fromId || null, roomId: roomId || null,
                             bandId: bandId || null, status: 'OPEN', text: '' }, sl, subject, body, id, out = [];
    var nights = roomId ? ordered(l).filter(function (x) { return x.roomId === roomId; }).length : 0, pk = epilogueSlots(state);
    sl = { room: roomId && state.rooms[roomId] ? state.rooms[roomId].name : '', band: bname(state, bandId), person: pname(state, fromId),
           owner: pname(state, fromId), member: pname(state, fromId), nights: nights, city: pk.city,
           salary: C.OFFERS.ROOM.salary, cut: Math.round(C.OFFERS.BAND.cut * 100), bookingName: state.player ? state.player.bookingName : '' };
    subject = say(state, 'legacy.offers.' + kind + '.subject', sl);
    body = say(state, 'legacy.offers.' + kind + '.body', sl);
    o.text = body;
    l.offers.push(o);
    l.offerLast[kind + ':' + (roomId || bandId)] = week(state);
    id = SB.Mail.post(state, { kind: E.MSG.OFFER, fromId: fromId || null, fromName: kind === 'BAND' ? sl.band : sl.person, subject: subject, body: body,
                               needs: true, refs: { requestId: null, showId: null, askId: null, bandId: bandId || null, offerId: o.id }, keep: true });
    out.push(rec(state, E.REC.OFFER, null, subject, { offerId: o.id, kind: kind, messageId: id }));
    if (state.player) state.player.stage = 4;
    SB.Week.raise(state, offerDecision(state, o, subject, body));
    return out;
  }

  function offerCheck(state) {
    var l = leg(state), w = week(state), pl = state.player || {}, out = [], done = false;
    if (w < C.OFFERS.notBeforeWeek) return out;
    /* "Not yet" keeps an offer open four weeks (from the answer, or from its arrival when Week left it open); then it lapses. */
    l.offers.forEach(function (o) { if (o.status === 'OPEN' && w >= (o.until !== undefined ? o.until : o.week + 4)) o.status = 'DECLINED'; });
    if (l.offers.some(function (o) { return o.status === 'OPEN'; })) return out;
    function fresh(key) { return l.offerLast[key] === undefined || w - l.offerLast[key] >= C.OFFERS.repeatAfterWeeks; }
    if ((pl.name || 0) >= C.OFFERS.ROOM.name) {
      Object.keys(state.rooms || {}).forEach(function (id) {
        var r = state.rooms[id], recs, avg;
        if (done || r.open === false || (r.ownerRel || 0) < C.OFFERS.ROOM.ownerRel || !fresh('ROOM:' + id)) return;
        recs = ordered(l).filter(function (x) { return x.roomId === id; });
        if (recs.length < C.OFFERS.ROOM.shows) return;
        avg = U.mean(recs.map(function (x) { return x.q; }));
        if (avg < C.OFFERS.ROOM.avgQ) return;
        out = out.concat(makeOffer(state, 'ROOM', r.ownerId, id, null));
        done = true;
      });
    }
    if (done) return out;
    Object.keys(state.bands || {}).forEach(function (id) {
      var b = state.bands[id];
      if (done || !b.local || b.stage === 'ENDED' || !fresh('BAND:' + id)) return;
      if (SB.Bands.tier(state, b, 'city') < C.OFFERS.BAND.tier || SB.Bands.trust(state, id).value < C.OFFERS.BAND.trust) return;
      out = out.concat(makeOffer(state, 'BAND', b.contactId || null, null, id));
      done = true;
    });
    return out;
  }

  function weekly(state) {
    var l = leg(state), w = week(state), out = [], next = (w + 1) * 7, before = (state.player && state.player.stage) || 1, s, st;
    if (l.ended) return out;
    /* anniversaries: a wall night a year before next week */
    l.wall.forEach(function (id) {
      var r = l.records[id];
      if (!r || r.day < next - 364 || r.day > next - 358) return;
      out.push(rec(state, E.REC.NEWS, id, say(state, 'legacy.retell.ANNIVERSARY', { story: r.story ? r.story.name : r.roomName }),
                   { k: 'ANNIVERSARY', refs: { showId: id, roomId: r.roomId } }));
    });
    /* later promotion and told counts */
    Object.keys(l.records).forEach(function (id) {
      var r = l.records[id], room;
      if (!r.laterDone && r.bill.some(function (b) {
        var band = state.bands && state.bands[b.bandId];
        if (!band) return false;
        if (b.role === E.BILL_ROLE.LOCAL) return SB.Bands.tier(state, band, 'city') >= M.laterTier;
        return (b.followers || 0) > 0 && (band.followers || 0) >= M.laterFollowers * b.followers;
      })) {
        r.laterDone = true;
        r.memory += M.later;
        if (r.memory >= C.WALL_AT && !r.wall && (r.verdict !== 'ROUGH' || (RARITY[r.detail] || 0) >= M.roughStoryRarity)) {
          r.wall = true;
          l.wall.push(id);
          if (!r.story) r.story = { name: say(state, 'legacy.storyName.' + (r.detail || 'ORDINARY'), storySlots(state, null, r, r.detail, null)), detail: r.detail || 'ORDINARY', told: r.heads };
        }
      }
      if (r.story) {
        room = r.roomId && state.rooms ? state.rooms[r.roomId] : null;
        var years = Math.max(0, (next - r.day) / 364);
        r.story.told = Math.round(Math.min(C.TOLD.capOfRoom * (room ? room.cap : r.heads || 1), Math.round(r.heads * (1 + C.TOLD.perYear * years))));
      }
    });
    out = out.concat(offerCheck(state));
    s = stage(state);
    if (s > before) {
      for (st = before + 1; st <= s; st++) {
        var opens = SB.Content.legacy && SB.Content.legacy.stage && SB.Content.legacy.stage[st] && isArr(SB.Content.legacy.stage[st].opens)
          ? SB.Content.legacy.stage[st].opens.map(function (t) { return SB.text.off ? '' : SB.text.render(String(t), {}, null); }) : [];
        out.push(rec(state, E.REC.STAGE, null, say(state, 'legacy.stage.' + st + '.line', {}), { stage: st, opens: opens }));
      }
    }
    if (w % 52 === 51) {
      var recap = yearly(state);
      l.years.push(recap);
      out.push(rec(state, E.REC.YEAR, null, recap.front || '', { recap: recap }));
    }
    return out;
  }

  return { stage: stage, mark: mark, afterShow: afterShow, wall: wall, binder: binder, bandHistory: bandHistory,
           townLine: townLine, firsts: firsts, offers: offers, answerOffer: answerOffer, end: end, yearly: yearly, weekly: weekly };
});
