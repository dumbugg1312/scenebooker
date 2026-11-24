/* Scene Booker — engine/world/rooms.js
 * SB.Rooms: rooms, their calendars ten weeks ahead, holds (first and second in line, challenge, confirm, release),
 * owners, standing and incidents, rooms closing and opening, and the other bookers in town with their shows.
 * Owner: E3b. Streams: ROOMS (owners, standing, closures), BOOKERS (other bookers, challenges), TEXT (lines).
 * Spec: design/spec/02-engine.md 4.3 and 7.14; 01-state 2.3 and 2.4; mechanics 7.
 *
 * Calendar shape (01-state 2.3): room.calendar[day] = { state: NIGHT_STATE, holds: [Hold], label? }.
 * Hold = { by: 'player' | bookerId, state: HOLD, since: day, expires: day | null, showId, challenge?: { by, until } }.
 * A player's hold always names a live player show; a booker's hold always names one of that booker's OtherShows
 * (its id 'o12' in showId). daily() removes any hold whose show is gone, so every hold belongs to a live show.
 */
SB.module('Rooms', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  /* ------------------------------------------------------------------ */
  /* small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function week(state) { return (state.clock && typeof state.clock.week === 'number') ? state.clock.week : Math.floor(today(state) / 7); }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function rngT(state) { return SB.rng.stream(state, E.STREAM.TEXT); }

  function rec(state, t, payload, text, showId) {
    var r = { t: t, day: today(state), half: half(state), showId: showId || null, text: text || '' }, k;
    for (k in payload) r[k] = payload[k];
    return r;
  }

  /* A line from content, or '' when the path is empty. */
  function line(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, rngT(state));
  }

  /* The sentence for a refusal: the owner's own words when content has them, else the refusal's fallback. */
  function refuse(state, code, path, slots) {
    var why = path ? line(state, path, slots) : '';
    if (!why) why = line(state, 'strings.refuse.' + code, slots);
    return U.no(code, why);
  }

  function stageOf(v) {
    var cuts = C.TRUST_STAGES, keys = E.STAGE, i, n = 0;
    for (i = 0; i < cuts.length; i++) if (v >= cuts[i]) n = i + 1;
    return [keys.SOUR, keys.STRANGER, keys.WORKING, keys.TRUSTED, keys.ALLY][n];
  }

  function personName(state, id) {
    var p = state.people && state.people[id];
    if (!p) return '';
    if (p.nick) return p.nick;
    return [p.first, p.last].filter(Boolean).join(' ');
  }

  function getRoom(state, roomId, where) {
    var r = state.rooms && state.rooms[roomId];
    if (!r) SB.fail(where || 'Rooms', 'unknown room "' + roomId + '"');
    return r;
  }

  function getBooker(state, bookerId, where) {
    var b = state.bookers && state.bookers[bookerId];
    if (!b) SB.fail(where || 'Rooms', 'unknown booker "' + bookerId + '"');
    return b;
  }

  function ownerKind(state, room) {
    var p = state.people && state.people[room.ownerId];
    if (p && p.ownerKind) return p.ownerKind;
    switch (room.kind) {
      case 'HOUSE': return 'HOST';
      case 'BAR': return 'BAR_OWNER';
      case 'HALL': return 'HALL_MANAGER';
      case 'SHOP': return 'SHOP_OWNER';
      case 'CLUB': case 'BIG': return 'TALENT_BUYER';
      default: return 'LANDLORD';
    }
  }

  function ownerPath(state, room, key) { return 'people.owner.' + ownerKind(state, room) + '.' + key; }

  function bookerPath(state, bookerId, key) {
    var b = state.bookers && state.bookers[bookerId];
    return 'people.booker.' + ((b && b.kind) || 'GENRE') + '.' + key;
  }

  function maxHolds(room) { return C.HOLDS_MAX[room.kind] || C.HOLDS_MAX.def; }

  function isWeekend(day) { var d = SB.time.dow(day); return d === 4 || d === 5; }

  function liveShow(state, showId) {
    var s = state.shows && state.shows[showId];
    return !!s && (s.status === 'DRAFT' || s.status === 'CONFIRMED');
  }

  function otherShowById(state, id) {
    var list = state.otherShows || [], i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function cell(room, day) { return room.calendar ? room.calendar[day] || null : null; }

  function nightState(c) {
    var i;
    if (!c) return 'OPEN';
    if (c.state === 'OWN') return 'OWN';
    for (i = 0; i < c.holds.length; i++) if (c.holds[i].state === 'CONFIRMED') return 'CONFIRMED';
    return c.holds.length ? 'HELD' : 'OPEN';
  }

  /* Recompute a night's state; drop the entry when nothing is on it. */
  function tidyNight(room, day) {
    var c = cell(room, day);
    if (!c) return;
    if (c.state === 'OWN') return;
    c.state = nightState(c);
    if (c.state === 'OPEN') delete room.calendar[day];
  }

  function ensureCell(room, day) {
    if (!room.calendar) room.calendar = {};
    if (!room.calendar[day]) room.calendar[day] = { state: 'OPEN', holds: [] };
    return room.calendar[day];
  }

  function holdIndex(c, by, showId) {
    var i;
    if (!c) return -1;
    for (i = 0; i < c.holds.length; i++) {
      if (c.holds[i].by === by && (showId === undefined || c.holds[i].showId === showId)) return i;
    }
    return -1;
  }

  /* Every day key of a room's calendar, sorted (01-state 4: never rely on key order). */
  function days(room) {
    return Object.keys(room.calendar || {}).map(Number).sort(function (a, b) { return a - b; });
  }

  function roomIds(state) { return Object.keys(state.rooms || {}); }

  /* Every player hold of a show, wherever it is. */
  function playerHolds(state, showId) {
    var out = [];
    roomIds(state).forEach(function (rid) {
      var room = state.rooms[rid];
      days(room).forEach(function (d) {
        var c = room.calendar[d], i;
        for (i = 0; i < c.holds.length; i++) {
          if (c.holds[i].by === 'player' && c.holds[i].showId === showId) out.push({ room: room, day: d, idx: i, hold: c.holds[i] });
        }
      });
    });
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* relationships                                                       */
  /* ------------------------------------------------------------------ */

  function relRecord(state, id, name, from, to, k) {
    return rec(state, 'TRUST', { id: id, name: name, d: U.round(to - from, 2), k: k, value: to,
                                 stage: stageOf(to), stageChanged: stageOf(from) !== stageOf(to) }, '');
  }

  /* Owner relationship. k 'VISIT' lifts a stranger to OWNER.stranger first (then adds d each time after);
   * k 'VOUCH' lifts to at least OWNER.vouched (02-engine 7.14). */
  function adjustRel(state, roomId, d, k) {
    var room = getRoom(state, roomId, 'Rooms.adjustRel');
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('Rooms.adjustRel', 'd is not a number');
    var from = typeof room.ownerRel === 'number' ? room.ownerRel : C.OWNER.start, to = from;
    if (k === 'VISIT' && from < C.OWNER.stranger) to = C.OWNER.stranger;
    else if (k === 'VOUCH') to = Math.max(from, C.OWNER.vouched);
    else to = from + d;
    to = U.round(U.clamp(to, 0, 100), 2);
    room.ownerRel = to;
    return relRecord(state, room.ownerId || room.id, personName(state, room.ownerId) || room.name, from, to, k);
  }

  function rel(state, roomId) {
    var room = getRoom(state, roomId, 'Rooms.rel');
    var v = typeof room.ownerRel === 'number' ? room.ownerRel : C.OWNER.start;
    return { value: v, stage: stageOf(v) };
  }

  function bookerRel(state, bookerId) {
    var b = getBooker(state, bookerId, 'Rooms.bookerRel');
    var v = typeof b.rel === 'number' ? b.rel : C.BOOKERS.relStart;
    return { value: v, stage: stageOf(v) };
  }

  function adjustBookerRel(state, bookerId, d, k) {
    var b = getBooker(state, bookerId, 'Rooms.adjustBookerRel');
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('Rooms.adjustBookerRel', 'd is not a number');
    var from = typeof b.rel === 'number' ? b.rel : C.BOOKERS.relStart;
    var to = U.round(U.clamp(from + d, 0, 100), 2);
    b.rel = to;
    return relRecord(state, bookerId, personName(state, bookerId), from, to, k);
  }

  /* ------------------------------------------------------------------ */
  /* the gates: who will hold a night, and what confirming needs         */
  /* ------------------------------------------------------------------ */

  /* Why the owner would not grant the player a hold. day may be null (bookable "today", any weeknight). */
  function holdGate(state, room, day, showId) {
    var r = typeof room.ownerRel === 'number' ? room.ownerRel : C.OWNER.start, c, path = ownerPath(state, room, 'HOLD_NO');
    var slots = { room: room.name, date: day === null ? '' : SB.time.date(day).d, dow: day === null ? '' : SB.time.fmt(day, 'dow') };
    if (!room.open) return refuse(state, 'TAKEN', null, slots);
    if (r < C.OWNER.stranger) return refuse(state, 'RELATIONSHIP', path, slots);
    if (room.kind === 'BAR' || room.kind === 'CLUB') {
      if (r < C.OWNER.weeknights) return refuse(state, 'RELATIONSHIP', path, slots);
      if (day !== null && isWeekend(day) && r < C.OWNER.weekends) return refuse(state, 'RELATIONSHIP', path, slots);
    }
    if ((room.kind === 'DIY' || room.kind === 'SHOP' || room.kind === 'OUTDOOR') && !(room.deposit > 0) && r < C.OWNER.vouched) {
      return refuse(state, 'RELATIONSHIP', path, slots);
    }
    if (day !== null) {
      if (day < today(state)) return refuse(state, 'INVALID', null, slots);
      c = cell(room, day);
      if (showId && c && c.holds.some(function (h) { return h.by === 'player' && h.showId !== showId && liveShow(state, h.showId); })) {
        return U.no('TAKEN', 'You already hold that night for another show.');
      }
      var ns = nightState(c);
      if (ns === 'OWN' || ns === 'CONFIRMED') return refuse(state, 'TAKEN', path, slots);
      if (c && c.holds.length >= maxHolds(room)) return refuse(state, 'TOO_MANY', path, slots);
    }
    return U.yes();
  }

  function discountOf(room) { return (room.ownerRel || 0) >= C.OWNER.discount ? C.OWNER.discountPct : 0; }

  /* Shows in town (the player's, played) at or above ABOUT against Par: a club's track record. */
  function trackRecord(state) {
    var n = 0;
    Object.keys(state.shows || {}).forEach(function (id) {
      var s = state.shows[id];
      if (s.status === 'PLAYED' && s.result && (s.result.vsPar === 'ABOUT' || s.result.vsPar === 'OVER' || s.result.vsPar === 'WAY_OVER')) n++;
    });
    return n;
  }

  function billCounts(show) {
    var out = { touring: 0, locals: 0 }, slots = (show && show.bill && show.bill.slots) || [], i;
    for (i = 0; i < slots.length; i++) {
      if (slots[i].confirmed === false) continue;
      if (slots[i].role === 'TOURING') out.touring++; else out.locals++;
    }
    return out;
  }

  /* What a room needs before it confirms (02-engine 7.14), as [{ k, text, met }]. k is a content key of jobs.needs. */
  function confirmNeeds(state, room, show) {
    var r = typeof room.ownerRel === 'number' ? room.ownerRel : C.OWNER.start, out = [], deposit = depositOf(room);
    var slots = { deposit: deposit, room: room.name, insurance: insuranceCost(state, room) };
    function add(k, met) { out.push({ k: k, text: line(state, 'jobs.needs.' + k, slots), met: !!met }); }
    var bc = billCounts(show);
    switch (room.kind) {
      case 'HOUSE':
        add('HOST_TRUSTS_YOU', r >= C.OWNER.stranger);
        break;
      case 'DIY':
        add('VOUCH', r >= C.OWNER.vouched || (room.playerShows || 0) >= 2);
        if (deposit > 0) add('DEPOSIT', SB.Money.canCover(state, deposit));
        break;
      case 'HALL': case 'BIG':
        add('DEPOSIT', deposit > 0 ? SB.Money.canCover(state, deposit) : true);
        break;
      case 'BAR':
        add('TOURING_AND_LOCAL', bc.touring >= 1 && bc.locals >= 1);
        break;
      case 'CLUB':
        /* SPEC?: "a locked bill and (three shows in town at vsPar >= ABOUT, or the deposit)". A club with no deposit
         * offers only the track record; the smaller reading is used: no deposit means the track record is needed. */
        add('FULL_BILL', !!(show && show.bill && show.bill.locked));
        add(deposit > 0 ? 'DEPOSIT' : 'FULL_BILL', deposit > 0 ? (trackRecord(state) >= 3 || SB.Money.canCover(state, deposit)) : trackRecord(state) >= 3);
        break;
      default:
        add('ASK_NICELY', r >= C.OWNER.stranger);
        if (deposit > 0) add('DEPOSIT', SB.Money.canCover(state, deposit));
    }
    /* security and event insurance, where the room will not go without them (C.SECURITY, C.INSURANCE) */
    if (securityRequired(room)) add('SECURITY', !!(show && show.crew && show.crew.security));
    if (insuranceRequired(room)) add('INSURANCE', !!(show && (show.insure || insuranceBought(state, show.id) > 0)));
    return out;
  }

  function depositOf(room) {
    return Math.round((room.deposit || 0) * 1);
  }

  /* ------------------------------------------------------------------ */
  /* security and event insurance (C.SECURITY, C.INSURANCE)              */
  /* ------------------------------------------------------------------ */

  function priceIndex(state) {
    var p = null;
    try { p = SB.Cities.pack(state); } catch (e) { p = null; }
    return p && p.money && typeof p.money.priceIndex === 'number' ? p.money.priceIndex : 1;
  }
  /* A pack's room may say security: true or false; otherwise the kind and the size decide. */
  function securityRequired(room) {
    if (!room) return false;
    if (room.security === true || room.security === false) return room.security;
    return C.SECURITY.kinds.indexOf(room.kind) >= 0 || (room.kind === 'HALL' && (room.cap || 0) >= C.SECURITY.hallCap);
  }
  function insuranceRequired(room) {
    if (!room) return false;
    if (room.insurance === true || room.insurance === false) return room.insurance;
    return C.INSURANCE.kinds.indexOf(room.kind) >= 0 || (room.cap || 0) >= C.INSURANCE.capAt;
  }
  function insuranceCost(state, room) {
    return room ? Math.round((C.INSURANCE.base + C.INSURANCE.perCap * (room.cap || 0)) * priceIndex(state)) : 0;
  }
  /* what was paid for the show's insurance (it is bought when the date confirms) */
  function insuranceBought(state, showId) {
    var led = (state.money && state.money.ledger) || [], i, n = 0;
    if (!showId) return 0;
    for (i = 0; i < led.length; i++) if (led[i].showId === showId && led[i].cat === 'INSURANCE' && led[i].amount < 0) n -= led[i].amount;
    return n;
  }
  /* What the show page says about security and insurance for a room (and a show, when given):
   *   security:  { required, recommended, why: ['SKETCHY' | 'BIG' | 'ROWDY'], chill, rate, personId, on }
   *   insurance: { required, cost, on, bought } */
  function crewRules(state, roomId, showId) {
    var room = roomId && state.rooms ? state.rooms[roomId] || null : null, show = showId && state.shows ? state.shows[showId] || null : null;
    var why = [], rowdy = false, sec = null, ids = Object.keys(state.people || {}), i, p, pi = priceIndex(state);
    if (room && (room.sketch || 0) >= C.SECURITY.sketchy) why.push('SKETCHY');
    if (show && show.label === 'BIG') why.push('BIG');
    if (show && show.bill) show.bill.slots.forEach(function (s) {
      var b = state.bands && state.bands[s.bandId];
      if (b && C.ROOM_GENRE.pit.indexOf(b.genre) >= 0) rowdy = true;
    });
    if (rowdy) why.push('ROWDY');
    for (i = 0; i < ids.length && !sec; i++) {
      p = state.people[ids[i]];
      if (p && (!p.state || p.state === 'ACTIVE') && (p.roles || []).indexOf('SECURITY') >= 0 && p.met !== null && p.met !== undefined) sec = p;
    }
    return {
      security: { required: securityRequired(room), recommended: !securityRequired(room) && why.length > 0, why: why,
                  chill: !!(room && C.SECURITY.chill.indexOf(room.kind) >= 0), personId: sec ? sec.id : null,
                  rate: sec && typeof sec.rate === 'number' ? sec.rate : Math.round(C.PAY.SECURITY[0] * pi),
                  on: !!(show && show.crew && show.crew.security) },
      insurance: { required: insuranceRequired(room), cost: insuranceCost(state, room),
                   on: !!(show && (show.insure || insuranceBought(state, show.id) > 0)), bought: show ? insuranceBought(state, show.id) : 0 }
    };
  }

  /* ------------------------------------------------------------------ */
  /* views                                                               */
  /* ------------------------------------------------------------------ */

  function get(state, roomId) { return getRoom(state, roomId, 'Rooms.get'); }

  function list(state, filter) {
    filter = filter || {};
    return roomIds(state).filter(function (id) {
      var r = state.rooms[id];
      if (filter.zoneId && r.zoneId !== filter.zoneId) return false;
      if (filter.kind && (Array.isArray(filter.kind) ? filter.kind.indexOf(r.kind) < 0 : r.kind !== filter.kind)) return false;
      if (filter.open === true && !r.open) return false;
      if (filter.open === false && r.open) return false;
      if (filter.bookable && !holdGate(state, r, null).ok) return false;
      return true;
    });
  }

  function terms(state, roomId, showId) {
    var room = getRoom(state, roomId, 'Rooms.terms');
    var show = showId ? state.shows && state.shows[showId] : null;
    if (showId && !show) SB.fail('Rooms.terms', 'unknown show "' + showId + '"');
    var disc = discountOf(room);
    var rent = Math.round((room.rent || 0) * (1 - disc)), houseCosts = Math.round((room.houseCosts || 0) * (1 - disc));
    var deposit = depositOf(room), parts = [];
    /* SPEC?: TermsView.words has no content path; it is assembled from money figures only. */
    if (rent > 0) parts.push('rent ' + SB.text.money(rent));
    if (deposit > 0) parts.push(SB.text.money(deposit) + ' deposit');
    if (room.soundFee > 0) parts.push(SB.text.money(room.soundFee) + ' sound');
    if (houseCosts > 0) parts.push(SB.text.money(houseCosts) + ' off the top');
    if (room.split !== null && room.split !== undefined && room.kind === 'CLUB') parts.push(Math.round(room.split * 100) + '/' + Math.round((1 - room.split) * 100));
    if (room.hostCut > 0 && room.kind === 'HOUSE') parts.push(SB.text.money(room.hostCut) + ' to the host');
    return { rent: rent, deposit: deposit, soundFee: room.soundFee || 0, houseCosts: houseCosts,
             split: room.split === undefined ? null : room.split, hostCut: room.hostCut || 0, discount: disc,
             needs: confirmNeeds(state, room, show), words: parts.join(' + ') };
  }

  function keyOf(fam, a, b) { return fam + ':' + a + (b === undefined ? '' : ':' + b); }

  function rangeOr(state, key, fallback) {
    var r = null;
    if (SB.Notebook && typeof SB.Notebook.range === 'function') r = SB.Notebook.range(state, key);
    return r || fallback;
  }

  function flatRange(v) {
    var x = typeof v === 'number' ? v : 0;
    return { lo90: x, lo50: x, hi50: x, hi90: x, conf: 0, src: 'PRIOR', seen: null, text: String(Math.round(x)), known: false };
  }

  function publicFields(room) {
    var out = {}, k;
    for (k in room) {
      if (k === 'hid' || k === 'calendar') continue;
      out[k] = U.copy(room[k]);
    }
    return out;
  }

  function card(state, roomId) {
    var room = getRoom(state, roomId, 'Rooms.card'), v = publicFields(room), r = rel(state, roomId), w = week(state);
    var ratios = [];
    Object.keys(state.shows || {}).forEach(function (id) {
      var s = state.shows[id];
      if (s.roomId === roomId && s.status === 'PLAYED' && s.result && s.result.par && s.result.par.heads > 0) {
        ratios.push(s.result.heads / s.result.par.heads);
      }
    });
    v.ownerName = personName(state, room.ownerId);
    v.ownerStage = r.stage;
    v.terms = terms(state, roomId, null);
    v.capRange = rangeOr(state, keyOf('roomcap', roomId), flatRange(room.cap));
    v.gens = [0, 1, 2].map(function (g) { return rangeOr(state, keyOf('roomgen', roomId, g), flatRange(0)); });
    v.fit = rangeOr(state, keyOf('roomfit', roomId), flatRange(0));
    v.needs = v.terms.needs.map(function (n) { return { text: n.text, met: n.met }; });
    v.yours = { shows: room.playerShows || 0, avgVsPar: ratios.length ? U.round(U.mean(ratios), 2) : null };
    v.incidents = (room.incidents || []).map(function (i) {
      return { week: i.week, text: line(state, 'people.owner.' + ownerKind(state, room) + '.AFTER_BAD', { room: room.name }) || '',
               kind: i.kind, fading: w - i.week >= C.STANDING.cleanWeeks };
    });
    v.canHold = holdGate(state, room, null);
    /* the card says plainly what stands in the way; the owner's own words come only after you ask (fix list 2.17) */
    if (v.canHold && v.canHold.ok === false && v.canHold.code === 'RELATIONSHIP') v.canHold = U.no('RELATIONSHIP', '');
    v.facts = facts(state, roomId);
    v.howIn = howIn(state, room);
    return v;
  }

  /* What kind of night the room allows, as plain facts: how many fit, when the music stops, who runs it, where to park,
   * what the neighbors are like, whether there is a PA, who can come in. Only what the room's own record or its city
   * pack says: a house carries the plain facts a house has (fictional), a named venue carries nothing the pack does not. */
  function facts(state, roomId) {
    var room = getRoom(state, roomId, 'Rooms.facts'), pk = null, i, rs, r = rel(state, roomId), house = room.kind === 'HOUSE' || room.kind === 'OUTDOOR';
    try { rs = SB.Cities.pack(state).rooms || []; for (i = 0; i < rs.length; i++) if (rs[i].id === room.packId) pk = rs[i]; } catch (e) { pk = null; }
    return {
      cap: room.cap, curfew: typeof room.curfew === 'number' ? room.curfew : null,
      host: personName(state, room.ownerId), hostStage: r.stage, hostKind: ownerKind(state, room),
      parking: (pk && pk.parking) || (room.kind === 'HOUSE' ? 'street' : null),
      neighbor: (pk && pk.neighbor) || (room.kind === 'HOUSE' ? 'close' : null),
      pa: room.soundFee > 0 ? 'HOUSE_SOUND' : (room.pa >= 0.6 ? 'REAL' : (room.pa >= 0.4 ? 'SMALL' : 'NONE')),
      soundFee: room.soundFee || 0, ages: (room.ages || ['ALL']).slice(), outdoor: !!room.outdoor, house: house,
      drinks: room.kind === 'BAR' || room.kind === 'CLUB' || room.kind === 'HALL' && (room.ages || []).indexOf('A21') >= 0
    };
  }

  /* what stands between the player and a night here: the steps, each with whether it is done (fix list 4.2) */
  function howIn(state, room) {
    var r = typeof room.ownerRel === 'number' ? room.ownerRel : C.OWNER.start, out = [], need;
    if (!room.open) return { ok: false, closed: true, steps: [] };
    if (r < C.OWNER.stranger) out.push({ k: 'KNOW', met: false });
    if ((room.kind === 'BAR' || room.kind === 'CLUB') && r < C.OWNER.weeknights) out.push({ k: 'WEEKNIGHTS', met: false });
    if ((room.kind === 'BAR' || room.kind === 'CLUB') && r < C.OWNER.weekends) out.push({ k: 'WEEKENDS', met: false });
    if ((room.kind === 'DIY' || room.kind === 'SHOP' || room.kind === 'OUTDOOR') && !(room.deposit > 0) && r < C.OWNER.vouched) out.push({ k: 'VOUCH', met: false });
    try { need = confirmNeeds(state, room, null); } catch (e) { need = []; }
    need.forEach(function (n) {
      if (n.k === 'HOST_TRUSTS_YOU' || n.k === 'ASK_NICELY' || out.some(function (x) { return x.k === n.k; })) return;
      out.push({ k: n.k, met: !!n.met, text: n.text });
    });
    return { ok: out.every(function (x) { return x.met; }), steps: out };
  }

  function calendar(state, roomId, fromDay, n) {
    var room = getRoom(state, roomId, 'Rooms.calendar'), out = [], d, c, known, t = today(state);
    if (typeof fromDay !== 'number') fromDay = t;
    if (typeof n !== 'number') n = C.HOLD.calendarWeeks * 7;
    known = (room.ownerRel || 0) > C.OWNER.stranger;
    for (d = fromDay; d < fromDay + n; d++) {
      c = cell(room, d);
      out.push({
        day: d, state: nightState(c), label: (c && c.label) || '',
        holds: c ? c.holds.map(function (h, i) {
          var mine = h.by === 'player';
          return { by: mine ? 'player' : (known ? h.by : null), byName: mine ? '' : (known ? personName(state, h.by) : ''),
                   state: h.state, rank: i + 1, expiresIn: h.expires === null || h.expires === undefined ? null : h.expires - t,
                   mine: mine, showId: mine ? h.showId : null };
        }) : [],
        known: known
      });
    }
    return out;
  }

  function stripOther(o) {
    var out = {}, k;
    for (k in o) if (k !== 'hid') out[k] = U.copy(o[k]);
    return out;
  }

  function otherShows(state, fromDay, toDay) {
    var t = today(state);
    if (typeof fromDay !== 'number') fromDay = t;
    if (typeof toDay !== 'number') toDay = fromDay + C.HOLD.calendarWeeks * 7;
    return (state.otherShows || []).filter(function (o) {
      if (o.day < fromDay || o.day > toDay) return false;
      if (o.status === 'CONFIRMED' || o.status === 'PLAYED') return true;
      var room = o.roomId && state.rooms && state.rooms[o.roomId];
      return !!room && (room.ownerRel || 0) > C.OWNER.stranger;
    }).sort(function (a, b) { return a.day - b.day; }).map(stripOther);
  }

  function bookers(state) {
    return Object.keys(state.bookers || {}).map(function (id) {
      var b = state.bookers[id];
      return { id: id, name: personName(state, id), kind: b.kind, genres: (b.genres || []).slice(),
               homeRooms: (b.homeRooms || []).map(function (rid) { return (state.rooms[rid] && state.rooms[rid].name) || rid; }),
               rel: bookerRel(state, id), active: b.active !== false };
    });
  }

  /* ------------------------------------------------------------------ */
  /* holds                                                               */
  /* ------------------------------------------------------------------ */

  function holdExpiry(state, room, day) {
    var t = today(state), e;
    if (room.kind === 'HOUSE') {
      e = day - C.HOLD_DAYS.HOUSE_UNTIL;
      /* SPEC?: a house holds "until three weeks before"; for a night already inside three weeks the hold would be
       * born lapsed. The smaller behavior: it lasts three days, never past the night itself. */
      if (e < t + 3) e = Math.min(day, t + 3);
      return e;
    }
    e = t + (C.HOLD_DAYS[room.kind] || 10);
    return Math.min(e, day);
  }

  /* Put a hold on a night. Returns { rank, expires }. */
  function placeHold(state, room, day, by, showId, expires) {
    var c = ensureCell(room, day);
    c.holds.push({ by: by, state: 'SOFT', since: today(state), expires: expires, showId: showId });
    c.state = nightState(c);
    return { rank: c.holds.length, expires: expires };
  }

  function removeHold(room, day, idx) {
    var c = cell(room, day);
    if (!c) return null;
    var h = c.holds.splice(idx, 1)[0];
    tidyNight(room, day);
    return h;
  }

  /* After a hold ahead of the player's went away: tell Shows the player is first now. */
  function promoted(state, room, day, records) {
    var c = cell(room, day), h;
    if (!c || !c.holds.length) return;
    h = c.holds[0];
    if (h.by === 'player' && liveShow(state, h.showId)) {
      records.push(rec(state, 'HOLD', { roomId: room.id, night: day, change: 'GRANTED' }, line(state, ownerPath(state, room, 'HOLD_YES'),
        { room: room.name, date: SB.time.date(day).d, dow: SB.time.fmt(day, 'dow'), curfew: SB.time.clock(room.curfew || 1380) }), h.showId));
      var s = state.shows[h.showId];
      if (s && s.status === 'DRAFT') SB.Shows.move(state, h.showId, { roomId: room.id, day: day, slot: s.slot || 'EVENING', hold: { rank: 1, expires: h.expires } });
    } else if (h.by !== 'player') {
      var o = otherShowById(state, h.showId);
      if (o && o.hid) o.hid.rank = 1;
    }
  }

  /* A booker's show loses its room: drop its hold and the OtherShow. */
  function dropOther(state, o) {
    var room = o.roomId && state.rooms && state.rooms[o.roomId], c, i;
    if (room) {
      c = cell(room, o.day);
      if (c) {
        for (i = c.holds.length - 1; i >= 0; i--) if (c.holds[i].showId === o.id) c.holds.splice(i, 1);
        tidyNight(room, o.day);
      }
    }
    state.otherShows = (state.otherShows || []).filter(function (x) { return x.id !== o.id; });
  }

  /* The player's hold on a night is overtaken: a booker confirmed it. */
  function playerLoses(state, room, day, records) {
    var c = cell(room, day), i, h;
    if (!c) return;
    for (i = c.holds.length - 1; i >= 0; i--) {
      h = c.holds[i];
      if (h.by === 'player' && h.state !== 'CONFIRMED') {
        c.holds.splice(i, 1);
        records.push(rec(state, 'HOLD', { roomId: room.id, night: day, change: 'LOST' }, '', h.showId));
        if (liveShow(state, h.showId) && SB.Shows && SB.Shows.notice) SB.Shows.notice(state, state.shows[h.showId], 'roomGone');
      }
    }
    tidyNight(room, day);
  }

  /* Let a hold go. With opts.roomId / opts.day only that hold; otherwise every hold of the show. */
  function release(state, showId, opts) {
    if (state.clock && state.clock.phase === 'OVER') return refuse(state, 'OVER');
    if (typeof showId !== 'string') SB.fail('Rooms.release', 'showId must be a string');
    opts = opts || {};
    var found = playerHolds(state, showId).filter(function (x) {
      return (!opts.roomId || x.room.id === opts.roomId) && (opts.day === undefined || x.day === opts.day);
    });
    var records = [];
    if (!found.length) return refuse(state, 'INVALID');
    /* remove from the highest index down so the indexes stay valid */
    found.sort(function (a, b) { return b.idx - a.idx; });
    found.forEach(function (x) {
      var wasFirst = x.idx === 0, wasConfirmed = x.hold.state === 'CONFIRMED';
      removeHold(x.room, x.day, x.idx);
      records.push(rec(state, 'HOLD', { roomId: x.room.id, night: x.day, change: 'RELEASED' }, '', showId));
      if (!wasConfirmed) {
        /* mechanics 7.4: let go 21 days or more before, the owner +1; later, -3. A confirmed night is a cancellation,
         * which Shows.cancel costs on its own. */
        var early = x.day - today(state) >= C.HOLD.releaseEarlyDays;
        records.push(adjustRel(state, x.room.id, early ? C.HOLD.releaseEarly : C.HOLD.releaseLate, 'RELEASE'));
      }
      if (wasFirst) promoted(state, x.room, x.day, records);
    });
    if (SB.Week && typeof SB.Week.log === 'function') SB.Week.log(state, records);
    return U.yes({ records: records });
  }

  /* Confirm the player's hold for a show (02-engine 7.14). Takes the deposit. */
  function confirm(state, showId) {
    var show = state.shows && state.shows[showId];
    if (!show) SB.fail('Rooms.confirm', 'unknown show "' + showId + '"');
    if (!show.roomId || typeof show.day !== 'number') return refuse(state, 'NEEDS');
    var room = getRoom(state, show.roomId, 'Rooms.confirm'), c = cell(room, show.day), idx = holdIndex(c, 'player', showId), i;
    var slots = { room: room.name, date: SB.time.date(show.day).d, dow: SB.time.fmt(show.day, 'dow'), curfew: SB.time.clock(room.curfew || 1380) };
    if (idx < 0) return refuse(state, 'NEEDS', ownerPath(state, room, 'CONFIRM_NEEDS'), slots);
    if (c.holds[idx].state === 'CONFIRMED') return refuse(state, 'ALREADY');
    if (idx > 0) return refuse(state, 'TAKEN', ownerPath(state, room, 'HOLD_SECOND'), slots);
    var needs = confirmNeeds(state, room, show).filter(function (n) { return !n.met && n.k !== 'DEPOSIT'; });
    if (needs.length) return refuse(state, 'NEEDS', ownerPath(state, room, 'CONFIRM_NEEDS'), slots);
    var dep = depositOf(room), records = [], ins = show.insure && !(insuranceBought(state, showId) > 0) ? insuranceCost(state, room) : 0;
    if (ins > 0 && !SB.Money.canCover(state, dep + ins)) return refuse(state, 'NO_MONEY');
    if (dep > 0) {
      var paid = SB.Money.spend(state, dep, 'DEPOSIT', room.name, { showId: showId });
      if (!paid || !paid.ok) return refuse(state, 'NO_MONEY');
    }
    if (ins > 0) SB.Money.spend(state, ins, 'INSURANCE', room.name, { showId: showId });
    c.holds[idx].state = 'CONFIRMED';
    c.holds[idx].expires = null;
    delete c.holds[idx].challenge;
    /* everyone behind the player on that night loses it */
    for (i = c.holds.length - 1; i >= 0; i--) {
      if (i === idx) continue;
      var h = c.holds[i];
      c.holds.splice(i, 1);
      if (h.by !== 'player') {
        var o = otherShowById(state, h.showId);
        if (o) state.otherShows = state.otherShows.filter(function (x) { return x.id !== o.id; });
      } else if (h.showId && h.showId !== showId) {
        /* another of the player's own shows held this night: it loses it, with no dead roomId or hold left */
        var lost = state.shows && state.shows[h.showId];
        if (lost && lost.roomId === room.id && lost.day === show.day) { lost.hold = null; lost.roomId = null; }
        records.push(rec(state, 'HOLD', { roomId: room.id, night: show.day, change: 'RELEASED' }, '', h.showId));
      }
    }
    tidyNight(room, show.day);
    records.push(rec(state, 'HOLD', { roomId: room.id, night: show.day, change: 'CONFIRMED' },
                     line(state, ownerPath(state, room, 'CONFIRM_YES'), slots), showId));
    return U.yes({ records: records });
  }

  /* A yes is a yes (user, 2026-11-21): there is no second "confirm" message. The player's first hold on the show's own
   * night becomes the booking as soon as the room has what it asked for (confirmNeeds) and the deposit can be paid.
   * Called when a hold is granted (Mail) and every day (daily), so meeting a need later books it with no ask.
   * Also settles a hold some other path confirmed (an event) whose show is still a draft. Returns records. */
  function firmUp(state, showId, day) {
    var show = state.shows && state.shows[showId], room, c, idx, res, records = [];
    if (!show || show.status !== 'DRAFT' || !show.roomId || typeof show.day !== 'number') return records;
    if (state.clock && state.clock.phase === 'OVER') return records;
    room = state.rooms && state.rooms[show.roomId];
    c = room ? cell(room, show.day) : null;
    idx = c ? holdIndex(c, 'player', showId) : -1;
    if (idx !== 0) return records;
    if (c.holds[0].state !== 'CONFIRMED') {
      res = confirm(state, showId);
      if (!res || !res.ok) return records;
      records = records.concat(res.records || []);
    }
    if (SB.Shows && SB.Shows.onConfirmed) records = records.concat(SB.Shows.onConfirmed(state, showId, typeof day === 'number' ? day : today(state)) || []);
    return records;
  }

  /* The player challenges the first holder of a night they hold second. */
  function challenge(state, roomId, day) {
    if (state.clock && state.clock.phase === 'OVER') return refuse(state, 'OVER');
    var room = getRoom(state, roomId, 'Rooms.challenge');
    if (typeof day !== 'number') SB.fail('Rooms.challenge', 'day must be a number');
    var c = cell(room, day), mine = holdIndex(c, 'player');
    if (!c || !c.holds.length) return refuse(state, 'INVALID');
    if (mine < 0) return refuse(state, 'NEEDS');
    if (mine === 0) return refuse(state, 'ALREADY');
    var first = c.holds[0];
    if (first.by === 'player' || first.state === 'CONFIRMED') return refuse(state, 'TAKEN');
    if (first.state === 'CHALLENGED') return refuse(state, 'ALREADY');
    if (!state.bookers || !state.bookers[first.by]) return refuse(state, 'INVALID');
    var hours = (room.ownerRel || 0) >= C.CHALLENGE_HOURS.friendlyAt ? C.CHALLENGE_HOURS.friendly : C.CHALLENGE_HOURS.base;
    first.state = 'CHALLENGED';
    first.challenge = { by: 'player', until: today(state) + Math.ceil(hours / 24) };
    var records = [rec(state, 'HOLD', { roomId: roomId, night: day, change: 'CHALLENGED' },
                       line(state, bookerPath(state, first.by, 'CHALLENGE'), { room: room.name, date: SB.time.date(day).d }), c.holds[mine].showId)];
    records.push(adjustBookerRel(state, first.by, -C.HOLD.challengeCost, 'CHALLENGE'));
    if (SB.Week && typeof SB.Week.log === 'function') SB.Week.log(state, records);
    return U.yes({ records: records, until: first.challenge.until });
  }

  /* ------------------------------------------------------------------ */
  /* answerAsk: ROOM_HOLD, ROOM_CONFIRM, HOLDER_RELEASE                  */
  /* ------------------------------------------------------------------ */

  /* SPEC?: Config.WAIT names HOST, BAR and HALL. DIY is read as BAR (a landlord answers like a bar), SHOP and OUTDOOR
   * as HOST (asking nicely), BIG as HALL. */
  function waitFor(room) {
    switch (room.kind) {
      case 'HOUSE': case 'SHOP': case 'OUTDOOR': return C.WAIT.HOST;
      case 'HALL': case 'BIG': return C.WAIT.HALL;
      default: return C.WAIT.BAR;
    }
  }

  function sendDays(r, w, inPerson) {
    if (inPerson) return 0;
    return r.range(w.days[0], w.days[1] + (w.days[1] > w.days[0] ? 0 : 0.0001));
  }

  function answerAsk(state, ask, phase) {
    if (!ask || typeof ask !== 'object') SB.fail('Rooms.answerAsk', 'no ask');
    if (phase !== 'SEND' && phase !== 'DELIVER') SB.fail('Rooms.answerAsk', 'phase must be SEND or DELIVER');
    switch (ask.kind) {
      case 'ROOM_HOLD': return phase === 'SEND' ? holdSend(state, ask) : holdDeliver(state, ask);
      case 'ROOM_CONFIRM': return phase === 'SEND' ? confirmSend(state, ask) : confirmDeliver(state, ask);
      case 'HOLDER_RELEASE': return phase === 'SEND' ? releaseSend(state, ask) : releaseDeliver(state, ask);
      default: SB.fail('Rooms.answerAsk', 'not a room ask: ' + ask.kind);
    }
  }

  function payload(ask) { return ask.payload || {}; }

  function holdSend(state, ask) {
    var room = getRoom(state, ask.toId, 'Rooms.answerAsk'), p = payload(ask), r = SB.rng.stream(state, E.STREAM.ROOMS);
    if (typeof p.day !== 'number') SB.fail('Rooms.answerAsk', 'ROOM_HOLD needs payload.day');
    var w = waitFor(room), gate = holdGate(state, room, p.day, p.showId);
    var will = gate.ok ? 'YES' : 'NO';
    if (!p.inPerson && w.silent > 0 && r.chance(w.silent)) will = 'SILENT';
    return { days: sendDays(r, w, p.inPerson), will: will, counter: null };
  }

  function holdDeliver(state, ask) {
    var room = getRoom(state, ask.toId, 'Rooms.answerAsk'), p = payload(ask), records = [];
    var slots = { room: room.name, date: SB.time.date(p.day).d, dow: SB.time.fmt(p.day, 'dow'), curfew: SB.time.clock(room.curfew || 1380) };
    var willNo = ask.hid && ask.hid.will === 'NO';
    var gate = holdGate(state, room, p.day, p.showId);
    if (willNo || !gate.ok) {
      return { status: 'NO', text: gate.ok ? line(state, ownerPath(state, room, 'HOLD_NO'), slots) : gate.why, counter: null, records: records };
    }
    if (p.showId && !liveShow(state, p.showId)) return { status: 'NO', text: line(state, 'strings.refuse.INVALID'), counter: null, records: records };
    var c = cell(room, p.day);
    if (holdIndex(c, 'player', p.showId) >= 0) {
      var at = holdIndex(c, 'player', p.showId);
      return { status: 'YES', text: line(state, ownerPath(state, room, 'HOLD_YES'), slots), counter: null, records: records,
               hold: { rank: at + 1, expires: c.holds[at].expires } };
    }
    /* holding two rooms for one date: each owner may hear (mechanics 7.4) */
    var others = p.showId ? playerHolds(state, p.showId).filter(function (x) { return x.day === p.day && x.room.id !== room.id; }) : [];
    var r = SB.rng.stream(state, E.STREAM.ROOMS);
    var h = placeHold(state, room, p.day, 'player', p.showId || null, holdExpiry(state, room, p.day));
    records.push(rec(state, 'HOLD', { roomId: room.id, night: p.day, change: h.rank === 1 ? 'GRANTED' : 'SECOND' },
                     line(state, ownerPath(state, room, h.rank === 1 ? 'HOLD_YES' : 'HOLD_SECOND'), slots), p.showId || null));
    /* first in line but the room wants something first: it holds the night and says what it needs; the night is the
       player's the day they have it (firmUp), with no second message */
    if (h.rank === 1 && p.showId && state.shows && state.shows[p.showId] &&
        confirmNeeds(state, room, state.shows[p.showId]).some(function (n) { return !n.met; })) {
      records[0].text = line(state, 'people.holdUntil', slots) + ' ' + line(state, ownerPath(state, room, 'CONFIRM_NEEDS'), slots);
    }
    others.forEach(function (x) {
      if (r.chance(C.HOLD.twoRooms.p)) {
        records.push(adjustRel(state, room.id, C.HOLD.twoRooms.rel, 'TWO_ROOMS'));
        records.push(adjustRel(state, x.room.id, C.HOLD.twoRooms.rel, 'TWO_ROOMS'));
      }
    });
    return { status: 'YES', text: records[0].text, counter: null, records: records, hold: { rank: h.rank, expires: h.expires } };
  }

  function confirmSend(state, ask) {
    var p = payload(ask), show = state.shows && state.shows[p.showId], r = SB.rng.stream(state, E.STREAM.ROOMS);
    if (!show) SB.fail('Rooms.answerAsk', 'ROOM_CONFIRM for unknown show "' + p.showId + '"');
    var room = getRoom(state, show.roomId || ask.toId, 'Rooms.answerAsk'), w = waitFor(room);
    var c = cell(room, show.day), idx = holdIndex(c, 'player', show.id);
    var will = 'YES';
    if (idx !== 0) will = 'NO';
    else if (confirmNeeds(state, room, show).filter(function (n) { return !n.met && n.k !== 'DEPOSIT'; }).length) will = 'NO';
    if (!p.inPerson && w.silent > 0 && r.chance(w.silent)) will = 'SILENT';
    return { days: sendDays(r, w, p.inPerson), will: will, counter: null };
  }

  function confirmDeliver(state, ask) {
    var p = payload(ask), show = state.shows && state.shows[p.showId];
    if (!show) SB.fail('Rooms.answerAsk', 'ROOM_CONFIRM for unknown show "' + p.showId + '"');
    if (!liveShow(state, p.showId)) return { status: 'NO', text: line(state, 'strings.refuse.INVALID'), counter: null, records: [] };
    var res = confirm(state, p.showId);
    if (!res.ok) return { status: 'NO', text: res.why, counter: null, records: [], code: res.code };
    return { status: 'YES', text: res.records[0].text, counter: null, records: res.records };
  }

  function releaseSend(state, ask) {
    var p = payload(ask), b = getBooker(state, ask.toId, 'Rooms.answerAsk'), r = SB.rng.stream(state, E.STREAM.BOOKERS);
    var room = getRoom(state, p.roomId, 'Rooms.answerAsk'), c = cell(room, p.day), idx = holdIndex(c, ask.toId), w = C.WAIT.HOLDER;
    var will = 'NO';
    if (idx >= 0 && c.holds[idx].state !== 'CONFIRMED') {
      will = r.chance(0.2 + 0.6 * (typeof b.rel === 'number' ? b.rel : C.BOOKERS.relStart) / 100) ? 'YES' : 'NO';
    }
    if (!p.inPerson && w.silent > 0 && r.chance(w.silent)) will = 'SILENT';
    return { days: sendDays(r, w, p.inPerson), will: will, counter: null };
  }

  function releaseDeliver(state, ask) {
    var p = payload(ask), records = [];
    var room = getRoom(state, p.roomId, 'Rooms.answerAsk'), c = cell(room, p.day), idx = holdIndex(c, ask.toId);
    var slots = { room: room.name, date: SB.time.date(p.day).d, dow: SB.time.fmt(p.day, 'dow') };
    var yes = ask.hid && ask.hid.will === 'YES';
    if (!yes || idx < 0 || c.holds[idx].state === 'CONFIRMED' || (p.showId && !liveShow(state, p.showId))) {
      return { status: 'NO', text: line(state, bookerPath(state, ask.toId, 'RELEASE_NO'), slots), counter: null, records: records };
    }
    var h = c.holds[idx], o = otherShowById(state, h.showId);
    if (o) dropOther(state, o); else removeHold(room, p.day, idx);
    c = ensureCell(room, p.day);
    var mine = holdIndex(c, 'player', p.showId);
    if (mine < 0) {
      placeHold(state, room, p.day, 'player', p.showId || null, holdExpiry(state, room, p.day));
      mine = c.holds.length - 1;
    }
    if (mine > 0) c.holds.unshift(c.holds.splice(mine, 1)[0]);
    c.state = nightState(c);
    records.push(rec(state, 'HOLD', { roomId: room.id, night: p.day, change: 'WON' },
                     line(state, bookerPath(state, ask.toId, 'RELEASE_YES'), slots), p.showId || null));
    return { status: 'YES', text: records[0].text, counter: null, records: records, hold: { rank: 1, expires: c.holds[0].expires } };
  }

  /* ------------------------------------------------------------------ */
  /* after a show                                                        */
  /* ------------------------------------------------------------------ */

  function afterShow(state, show, outcome) {
    if (!show || !show.roomId) return [];
    var room = state.rooms && state.rooms[show.roomId];
    if (!room) return [];
    outcome = outcome || {};
    var r = SB.rng.stream(state, E.STREAM.ROOMS), d = 0, records = [], w = week(state);
    var incidents = outcome.incidents || [];
    var heads = outcome.heads || 0;
    if (room.kind === 'BAR' || room.kind === 'CLUB') {
      var takings = (outcome.barHeads || 0) * C.BAR_SPEND, good = C.BAR_GOOD_NIGHT * (room.cap || 80) / 80;
      var ratio = good > 0 ? takings / good : 0;
      if (ratio >= 1) d += U.lerp(C.OWNER.drank[0], C.OWNER.drank[1], U.clamp(ratio - 1, 0, 1));
      else if (isWeekend(show.day)) d += U.lerp(C.OWNER.thin[1], C.OWNER.thin[0], U.clamp(1 - ratio, 0, 1));
      if (show.slot === 'MATINEE' && room.kind === 'BAR') d += C.OWNER.kidsNoDrinks;
    }
    var ends = ((show.bill && show.bill.ends) || 0) + (outcome.lateMin || 0);
    var over = room.curfew && ends > room.curfew;
    if (!incidents.length && (outcome.run === undefined || outcome.run >= 1) && !over) d += C.OWNER.clean;
    d += C.OWNER.paid;
    if (over) d += C.OWNER.overCurfew;
    var addressOut = show.door && show.door.address === 'FULL' && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0;
    var byGen = outcome.byGen || [0, 0, 0];
    incidents.forEach(function (inc) {
      var size = U.clamp(Math.abs(inc.q || 0) / 20, 0, 1);
      if (inc.kind !== 'PA_FAIL') d += U.lerp(C.OWNER.trouble[1], C.OWNER.trouble[0], size);
      [0, 1, 2].forEach(function (g) {
        if (!(byGen[g] > 0) || !room.standing) return;
        var drop = r.range(C.STANDING.drop[0], C.STANDING.drop[1]) * (addressOut ? C.CHANNELS.ADDRESS.standing : 1);
        room.standing[g] = Math.round(U.clamp(room.standing[g] - drop, 0, 100));
      });
      room.incidents = room.incidents || [];
      room.incidents.push({ week: w, kind: inc.kind, showId: show.id });
      room.cleanSince = w;
      if (room.hid && inc.kind !== 'PA_FAIL') room.hid.pressure = U.clamp((room.hid.pressure || 0) + 5, 0, 100);   // SPEC?: complaints on record add 5 pressure each
    });
    if (show.tags && show.tags.indexOf('BENEFIT') >= 0 && show.benefitFor === room.id && room.hid) {
      room.hid.pressure = U.clamp((room.hid.pressure || 0) + C.ROOM_PRESSURE.benefit, 0, 100);
      if (SB.Legacy && typeof SB.Legacy.mark === 'function') {
        var m = SB.Legacy.mark(state, 'ROOM_KEPT', { roomId: room.id, showId: show.id });
        if (m) records.push(m);
      }
    }
    room.playerShows = (room.playerShows || 0) + 1;
    room.playerQ = room.playerQ || [];
    room.playerQ.push(typeof outcome.q === 'number' ? Math.round(outcome.q) : 0);
    if (room.playerQ.length > 20) room.playerQ.shift();
    if (d !== 0 || heads >= 0) records.unshift(adjustRel(state, room.id, U.round(d, 2), 'AFTER_SHOW'));
    return records;
  }

  /* ------------------------------------------------------------------ */
  /* the day                                                             */
  /* ------------------------------------------------------------------ */

  function challengeDecision(state, room, day, h, bookerId) {
    var ev = null, list = SB.Content.events, i;
    if (Array.isArray(list)) for (i = 0; i < list.length; i++) if (list[i] && list[i].id === 'HOLD_CHALLENGED') ev = list[i];
    if (!ev) return null;
    var show = state.shows[h.showId];
    var bind = { show: h.showId, room: room.id, owner: room.ownerId || null, booker: bookerId };
    var ctx = { show: show, bind: bind, night: false };
    var slots = { room: room.name, owner: personName(state, room.ownerId), booker: personName(state, bookerId),
                  date: SB.time.date(day).d, dow: SB.time.fmt(day, 'dow'), daysOut: day - today(state),
                  city: (SB.Cities.pack(state) || {}).derived ? SB.Cities.pack(state).derived.index.name : '',
                  bookingName: state.player ? state.player.bookingName : '' };
    var r = rngT(state);
    function rd(t) { return (typeof t === 'string' && !SB.text.off) ? SB.text.render(t, slots, r) : ''; }
    /* SPEC?: the Decision shape has no place for the bound refs; `bind` is added so Director.resolve can apply the
     * option's effects (ROOM_HOLD CONFIRM / RELEASE) to the right show. */
    return {
      id: SB.util.newId(state, 'd'), kind: 'INTERRUPT', eventId: 'HOLD_CHALLENGED', showId: h.showId,
      day: today(state), half: 'DAY', at: null, tier: ev.tier || 'REAL', title: rd(ev.title), body: rd(ev.body), bind: bind,
      options: (ev.options || []).map(function (o) {
        var ok = o.needs ? SB.Effects.test(state, o.needs, ctx) : true;
        return { id: o.id, label: rd(o.label), likely: rd(o.likely), costs: SB.Effects.preview(state, o.effects || [], ctx),
                 enabled: !!ok, why: ok ? null : SB.Effects.why(state, o.needs, ctx) };
      })
    };
  }

  function daily(state, day) {
    if (typeof day !== 'number') SB.fail('Rooms.daily', 'day must be a number');
    var records = [], stops = [], rb = SB.rng.stream(state, E.STREAM.BOOKERS);
    roomIds(state).forEach(function (rid) {
      var room = state.rooms[rid];
      days(room).forEach(function (d) {
        var c = room.calendar[d], i, h, o, s;
        if (!c) return;
        if (d < day - 1 && c.state !== 'OWN') {
          /* the night has passed: nothing is held on it any more */
          var past = c.holds.filter(function (x) { return x.state === 'CONFIRMED'; });
          if (!past.length) { delete room.calendar[d]; return; }
        }
        for (i = c.holds.length - 1; i >= 0; i--) {
          h = c.holds[i];
          if (!h) continue;
          /* orphans: a hold whose show is gone */
          if (h.by === 'player') {
            s = h.showId && state.shows && state.shows[h.showId];
            if (!s || (s.status !== 'DRAFT' && s.status !== 'CONFIRMED' && !(s.status === 'PLAYED' && h.state === 'CONFIRMED')) ||
                (s.status === 'CONFIRMED' && h.state !== 'CONFIRMED' && (s.roomId !== room.id || s.day !== d))) {
              var first = i === 0;
              removeHold(room, d, i);
              records.push(rec(state, 'HOLD', { roomId: rid, night: d, change: 'RELEASED' }, '', h.showId || null));
              if (first) promoted(state, room, d, records);
              continue;
            }
          } else {
            o = otherShowById(state, h.showId);
            if (!o) {
              var f0 = i === 0;
              removeHold(room, d, i);
              if (f0) promoted(state, room, d, records);
              continue;
            }
          }
          /* challenges resolving */
          if (h.state === 'CHALLENGED' && h.challenge && h.challenge.until <= day) {
            if (h.by === 'player') {
              /* the player did not confirm in time: the hold goes to the challenger */
              var mine = removeHold(room, d, i);
              records.push(rec(state, 'HOLD', { roomId: rid, night: d, change: 'LOST' }, '', mine.showId));
              c = ensureCell(room, d);
              c.holds.push({ by: 'player', state: 'SOFT', since: day, expires: holdExpiry(state, room, d), showId: mine.showId });
              promoted(state, room, d, records);
              continue;
            }
            o = otherShowById(state, h.showId);
            if (o && rb.chance(C.BOOKERS.firmUp)) {
              h.state = 'CONFIRMED'; h.expires = null; delete h.challenge;
              o.status = 'CONFIRMED';
              playerLoses(state, room, d, records);
            } else {
              var mineIdx = holdIndex(c, 'player');
              if (o) dropOther(state, o); else removeHold(room, d, i);
              c = cell(room, d);
              if (mineIdx >= 0 && c && c.holds.length) {
                records.push(rec(state, 'HOLD', { roomId: rid, night: d, change: 'WON' }, '', c.holds[0].showId));
                promoted(state, room, d, records);
              }
            }
            continue;
          }
          /* holds lapsing */
          if (h.state === 'SOFT' && h.expires !== null && h.expires !== undefined && day > h.expires) {
            if (h.by === 'player') {
              var wasFirst = i === 0;
              removeHold(room, d, i);
              records.push(rec(state, 'HOLD', { roomId: rid, night: d, change: 'LAPSED' }, '', h.showId));
              if (wasFirst) promoted(state, room, d, records);
            }
            /* a booker's own holds firm up or go below (bookersDaily) */
          }
        }
      });
    });
    bookersDaily(state, day, records);
    /* a yes is a yes: any held show that now has what its room asked for is booked */
    Object.keys(state.shows || {}).forEach(function (sid) { records.push.apply(records, firmUp(state, sid, day)); });
    challengesAgainstPlayer(state, day, records, stops);
    return { records: records, stops: stops };
  }

  /* Other bookers' holds firm up or are released on their day. */
  function bookersDaily(state, day, records) {
    (state.otherShows || []).slice().forEach(function (o) {
      if (o.status !== 'HELD' || !o.hid || o.hid.firmDay > day) return;
      var room = o.roomId && state.rooms[o.roomId];
      if (!room) { state.otherShows = state.otherShows.filter(function (x) { return x.id !== o.id; }); return; }
      var c = cell(room, o.day), idx = c ? holdIndex(c, o.bookerId, o.id) : -1;
      if (idx < 0) { state.otherShows = state.otherShows.filter(function (x) { return x.id !== o.id; }); return; }
      var h = c.holds[idx];
      if (h.state === 'CHALLENGED') return;                       // resolved by the challenge
      if (o.hid.firm && idx === 0 && nightState(c) !== 'CONFIRMED') {
        h.state = 'CONFIRMED'; h.expires = null;
        o.status = 'CONFIRMED';
        playerLoses(state, room, o.day, records);
      } else {
        dropOther(state, o);
        if (idx === 0) promoted(state, room, o.day, records);
      }
    });
  }

  /* SPEC?: the rate at which other bookers challenge the player is not in the spec. Chosen: a booker holding second
   * behind the player's soft first hold challenges with chance 0.04 a day. */
  var CHALLENGE_PER_DAY = 0.04;

  function challengesAgainstPlayer(state, day, records, stops) {
    var rb = SB.rng.stream(state, E.STREAM.BOOKERS);
    roomIds(state).forEach(function (rid) {
      var room = state.rooms[rid];
      days(room).forEach(function (d) {
        var c = room.calendar[d];
        if (!c || c.holds.length < 2 || d <= day) return;
        var first = c.holds[0], second = c.holds[1];
        if (first.by !== 'player' || first.state !== 'SOFT' || second.by === 'player') return;
        if (!state.bookers[second.by] || state.bookers[second.by].active === false) return;
        if (!rb.chance(CHALLENGE_PER_DAY)) return;
        var hours = (room.ownerRel || 0) >= C.CHALLENGE_HOURS.friendlyAt ? C.CHALLENGE_HOURS.friendly : C.CHALLENGE_HOURS.base;
        first.state = 'CHALLENGED';
        first.challenge = { by: second.by, until: day + Math.ceil(hours / 24) };
        records.push(rec(state, 'HOLD', { roomId: rid, night: d, change: 'CHALLENGED' },
                         line(state, bookerPath(state, second.by, 'CHALLENGE'), { room: room.name, date: SB.time.date(d).d }), first.showId));
        var dec = challengeDecision(state, room, d, first, second.by);
        if (dec) stops.push({ kind: 'DECISION', decision: dec });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* the week: other bookers, standing, closures and openings            */
  /* ------------------------------------------------------------------ */

  function pack(state) { return SB.Cities.pack(state); }

  function poisson(r, lambda) {
    if (!(lambda > 0)) return 0;
    var L = Math.exp(-Math.min(lambda, 30)), k = 0, p = 1;
    do { k++; p *= r.next(); } while (p > L && k < 50);
    return k - 1;
  }

  /* A night for a booker: the weekday nearest the target among its nights. */
  function nightNear(target, nights) {
    var best = target, bestD = 99, dd, d;
    if (!nights || !nights.length) return target;
    for (dd = -3; dd <= 3; dd++) {
      d = target + dd;
      if (nights.indexOf(SB.time.dow(d)) >= 0 && Math.abs(dd) < bestD) { best = d; bestD = Math.abs(dd); }
    }
    return best;
  }

  function placeBookerShows(state, records) {
    var rb = SB.rng.stream(state, E.STREAM.BOOKERS), w = week(state), start = (w + 1) * 7;
    Object.keys(state.bookers || {}).forEach(function (bid) {
      var b = state.bookers[bid];
      if (b.active === false) return;
      var lambda = (b.showsPerMonth || 0) * 12 / 52, n = poisson(rb, lambda), k;
      for (k = 0; k < n; k++) {
        var ahead = rb.int(C.BOOKERS.holdAhead[0], C.BOOKERS.holdAhead[1]);
        var day = nightNear(start + ahead, b.nights || [4, 5]);
        var homes = (b.homeRooms || []).filter(function (rid) { return state.rooms[rid] && state.rooms[rid].open; });
        if (!homes.length) homes = roomIds(state).filter(function (rid) { return state.rooms[rid].open && state.rooms[rid].zoneId === 'city'; });
        if (!homes.length) return;
        var rid = rb.pick(homes), room = state.rooms[rid], c = cell(room, day), ns = nightState(c);
        if (ns === 'OWN' || ns === 'CONFIRMED' || (c && c.holds.length >= maxHolds(room))) continue;
        if (c && holdIndex(c, bid) >= 0) continue;
        /* the bill: two to four free local bands in its genres */
        var pool = [];
        (b.genres || []).forEach(function (g) {
          SB.Bands.list(state, { local: true, active: true, genre: g, freeOn: day }).forEach(function (id) { if (pool.indexOf(id) < 0) pool.push(id); });
        });
        pool = rb.shuffle(pool).slice(0, rb.int(2, 4));
        var genres = [];
        pool.forEach(function (id) { var bd = state.bands[id]; if (bd && genres.indexOf(bd.genre) < 0) genres.push(bd.genre); });
        if (!genres.length) genres = (b.genres || []).slice(0, 1);
        var id = U.newId(state, 'o');
        /* SPEC?: other bookers' touring headliners are not generated as bands (that would fill the save with bands
         * nobody meets). A show has one with a chance from the booker's name; it carries `touring` and `tier`, which
         * is all Word and the crowd need. */
        var touring = rb.chance(U.clamp((b.name || 20) / 100, 0.1, 0.6));
        var tier = touring ? rb.int(1, 3) : Math.max(1, Math.min(3, Math.round((b.name || 20) / 25)));
        var room2 = state.rooms[rid];
        var ageList = room2.ages || ['ALL'];
        var o = { id: id, bookerId: bid, roomId: rid, zoneId: room2.zoneId || 'city', day: day, slot: 'EVENING', bands: pool,
                  genres: genres, ages: ageList[0], price: (C.DOOR && C.DOOR.def) || 7, status: 'HELD', heads: null, q: null,
                  tier: tier, touring: touring, hostScore: null,
                  hid: { firm: rb.chance(C.BOOKERS.firmUp), firmDay: today(state) + 7 + rb.int(1, C.BOOKERS.firmDays) } };
        var expires = o.hid.firmDay;
        placeHold(state, room2, day, bid, id, expires);
        state.otherShows = state.otherShows || [];
        state.otherShows.push(o);
      }
    });
    return records;
  }

  function peerShows(state) {
    var rb = SB.rng.stream(state, E.STREAM.BOOKERS), w = week(state), p = pack(state);
    (p.zones || []).forEach(function (z) {
      if (z.kind !== 'PEER') return;
      var day = (w + 2) * 7 + (rb.chance(0.5) ? 4 : 5);
      state.otherShows = state.otherShows || [];
      state.otherShows.push({ id: U.newId(state, 'o'), bookerId: null, roomId: null, zoneId: z.id, day: day, slot: 'EVENING',
                              bands: [], genres: [rb.pick(E.GENRES)], ages: 'ALL', price: 10, status: 'CONFIRMED',
                              heads: null, q: null, tier: rb.int(1, 3), touring: true, hostScore: null });
    });
  }

  function playOtherShows(state, records) {
    var w = week(state), end = (w + 1) * 7, rb = SB.rng.stream(state, E.STREAM.BOOKERS);
    (state.otherShows || []).forEach(function (o) {
      if (o.status === 'PLAYED' || o.day >= end) return;
      if (o.status === 'HELD') return;                    // never firmed up: dropped by daily
      o.status = 'PLAYED';
      if (!o.roomId) return;                              // a big night in a peer city: competition only
      var res = SB.Night.resolveOther(state, o) || {};
      var b = state.bookers[o.bookerId] || {}, pays = (b.style && typeof b.style.pays === 'number') ? b.style.pays : 0.7;
      o.heads = Math.max(0, Math.round(res.heads || 0));
      o.q = Math.round(U.clamp(res.q || 0, 0, 100));
      /* 7.14: their shows move Word with a host score drawn from style.pays */
      o.hostScore = U.round(U.clamp((pays - 0.6) * 2 + rb.normal(0, 0.25), -1, 1), 2);
      /* SPEC?: 7.14 says other bookers' shows wear the bands (band.plays); Bands has no function for it, so the
       * day is pushed here, inside Bands' own shape. */
      (o.bands || []).forEach(function (id) {
        var bd = state.bands && state.bands[id];
        if (bd) { bd.plays = bd.plays || []; if (bd.plays.indexOf(o.day) < 0) bd.plays.push(o.day); }
      });
      if (o.touring) {
        var sh = { id: o.id, day: o.day, roomId: o.roomId, zoneId: o.zoneId, requestId: null, tier: o.tier, touring: true, bookerId: o.bookerId };
        var hs = {}; hs._touring = o.hostScore;
        SB.Territory.afterShow(state, sh, hs, false).forEach(function (x) { records.push(x); });
      }
      var room = state.rooms[o.roomId];
      if (room && room.calendar && room.calendar[o.day]) {
        /* a played night stays on the calendar until daily clears passed days */
      }
    });
    /* trim: played shows twelve weeks gone (01-state 3) */
    state.otherShows = (state.otherShows || []).filter(function (o) { return !(o.status === 'PLAYED' && o.day < (w - 12) * 7); });
  }

  function monthEnds(w) { return SB.time.month(w * 7 + 6) !== SB.time.month(w * 7 + 13); }

  function standingAndOwners(state, records) {
    var w = week(state);
    roomIds(state).forEach(function (rid) {
      var room = state.rooms[rid];
      if (!room.open || !room.standing) return;
      if (w - (room.cleanSince || 0) >= C.STANDING.cleanWeeks) {
        room.standing = room.standing.map(function (s) { return Math.round(U.clamp(s + C.STANDING.cleanGain, 0, 100)); });
        room.cleanSince = w;
      }
    });
    if (!monthEnds(w)) return;
    /* a steady run of shows: the owner +1 a month, and steady good nights lower pressure */
    var recent = {};
    Object.keys(state.shows || {}).forEach(function (id) {
      var s = state.shows[id];
      if (s.status === 'PLAYED' && s.roomId && s.day >= (w - 4) * 7) {
        recent[s.roomId] = recent[s.roomId] || [];
        recent[s.roomId].push(s.result && typeof s.result.q === 'number' ? s.result.q : 50);
      }
    });
    Object.keys(recent).forEach(function (rid) {
      var room = state.rooms[rid];
      if (!room || !room.open) return;
      records.push(adjustRel(state, rid, C.OWNER.steadyPerMonth, 'STEADY'));
      if (room.hid && U.mean(recent[rid]) >= 60) room.hid.pressure = U.clamp((room.hid.pressure || 0) + C.ROOM_PRESSURE.steadyPerMonth, 0, 100);
    });
  }

  /* A band at trust 45 or more that has played a room for the player vouches for them there (7.14). */
  function vouches(state, records) {
    var vouched = {};
    Object.keys(state.bands || {}).forEach(function (bid) {
      var b = state.bands[bid];
      if (!b.shows || !b.shows.length) return;
      var t = SB.Bands.trust(state, bid);
      if (!t || t.value < 45) return;
      b.shows.forEach(function (sid) {
        var s = state.shows && state.shows[sid];
        if (s && s.status === 'PLAYED' && s.roomId) vouched[s.roomId] = true;
      });
    });
    Object.keys(vouched).forEach(function (rid) {
      var room = state.rooms[rid];
      if (room && (room.ownerRel || 0) < C.OWNER.vouched) records.push(adjustRel(state, rid, 0, 'VOUCH'));
    });
  }

  function closeRoom(state, room, why, records) {
    var w = week(state);
    room.open = false;
    room.closedWeek = w;
    room.closedWhy = why;
    days(room).forEach(function (d) {
      var c = room.calendar[d];
      c.holds.slice().forEach(function (h) {
        if (h.by === 'player') {
          var s = state.shows && state.shows[h.showId];
          if (s && (s.status === 'DRAFT' || s.status === 'CONFIRMED') && s.roomId === room.id) {
            var res = SB.Shows.cancel(state, h.showId, 'ROOM');
            (res && res.records || []).forEach(function (x) { records.push(x); });
          }
        } else {
          var o = otherShowById(state, h.showId);
          if (o) dropOther(state, o);
        }
      });
      if (room.calendar[d] && room.calendar[d].state !== 'OWN') delete room.calendar[d];
    });
    records.push(rec(state, 'NEWS', { k: 'ROOM_CLOSED', refs: { bandId: null, personId: room.ownerId || null, roomId: room.id, genre: null, showId: null } },
                     line(state, 'people.news.ROOM_CLOSED.' + why, { room: room.name, owner: personName(state, room.ownerId) })));
  }

  function closuresAndOpenings(state, records) {
    var w = week(state);
    if (w <= 0 || w % 13 !== 0) return;
    var r = SB.rng.stream(state, E.STREAM.ROOMS), closed = 0;
    roomIds(state).forEach(function (rid) {
      var room = state.rooms[rid];
      if (!room.open) return;
      var hid = room.hid || {};
      var leaseOut = room.kind === 'HOUSE' && typeof hid.leaseEnds === 'number' && w >= hid.leaseEnds;
      if (leaseOut || r.chance((hid.pressure || 0) / C.ROOM_CLOSE)) {
        var why = leaseOut ? (r.chance(0.5) ? 'RENT' : 'TIRED')
                           : r.pick(room.kind === 'HOUSE' ? ['RENT', 'SOLD', 'TIRED'] : (room.kind === 'DIY' ? ['RENT', 'MARSHAL', 'COMPLAINTS'] : ['SOLD', 'RENT', 'TIRED']));
        closeRoom(state, room, why, records);
        closed++;
      }
    });
    var p = C.ROOM_PRESSURE.newRoomsPerYear / 4 + (closed ? 0.25 : 0);
    if (!r.chance(p)) return;
    /* a kind the town is short of, against the room mix */
    var mix = C.CITY.ROOM_MIX, counts = {}, total = 0;
    roomIds(state).forEach(function (rid) { var x = state.rooms[rid]; if (x.open && x.zoneId === 'city') { counts[x.kind] = (counts[x.kind] || 0) + 1; total++; } });
    var best = null, bestGap = -1;
    Object.keys(mix).forEach(function (k) {
      if (k === 'BIG' || k === 'CLUB') return;
      var gap = mix[k] * Math.max(total, 1) - (counts[k] || 0);
      if (gap > bestGap) { bestGap = gap; best = k; }
    });
    var hoods = (pack(state).hoods || []).filter(function (h) { return !h.zone || h.zone === 'city'; });
    var hood = hoods.length ? r.pick(hoods).id : null;
    var rid2 = SB.WorldGen.room(state, { kind: best || 'HOUSE', zoneId: 'city', hood: hood });
    var nr = state.rooms && state.rooms[rid2];
    if (nr) {
      if (nr.open === undefined) nr.open = true;
      if (nr.openedWeek === null || nr.openedWeek === undefined) nr.openedWeek = w;
    }
    records.push(rec(state, 'NEWS', { k: 'ROOM_OPENED', refs: { bandId: null, personId: nr ? nr.ownerId || null : null, roomId: rid2, genre: null, showId: null } },
                     line(state, 'people.news.ROOM_OPENED', { room: nr ? nr.name : '', hood: hood || '' })));
  }

  function weekly(state) {
    var records = [];
    playOtherShows(state, records);
    placeBookerShows(state, records);
    peerShows(state);
    standingAndOwners(state, records);
    vouches(state, records);
    closuresAndOpenings(state, records);
    return records;
  }

  return {
    get: get, list: list, card: card, calendar: calendar, facts: facts, howIn: function (state, roomId) { return howIn(state, getRoom(state, roomId, 'Rooms.howIn')); }, terms: terms, answerAsk: answerAsk, confirm: confirm, firmUp: firmUp,
    release: release, challenge: challenge, rel: rel, adjustRel: adjustRel, otherShows: otherShows, bookers: bookers,
    bookerRel: bookerRel, adjustBookerRel: adjustBookerRel, afterShow: afterShow, daily: daily, weekly: weekly,
    /* internal outside the manifest: security and event insurance (Shows, Money, Night read them) */
    crewRules: crewRules, insuranceCost: insuranceCost, insuranceBought: insuranceBought, securityRequired: securityRequired
  };
});
