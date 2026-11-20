/* Scene Booker — engine/week/shows.js   (E1b)
 * SB.Shows: a show from draft to played. The bill, the door, the deal, the crew, moving and cancelling.
 * The player always works their own door: the crew is sound, security (sometimes), the floor and lodging.
 * Spec: design/spec/02-engine.md 2.3, 7.11, 7.12; 01-state 2.6.
 *
 * Besides the manifest this module exports one internal Mail needs and the manifest has no name for:
 *   assignCrew(state, showId, role, personId) -> void   sets a crew role on an answered ask (no checks)
 */
SB.module('Shows', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  var ROLES = ['sound', 'security', 'floor', 'lodging'];
  var DOORS_EVENING = 1140;          // 7 p.m.
  var DOORS_MATINEE = 900;           // SPEC?: no default doors time is given for a matinee; 3 p.m.

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function over(state) { return !!(state.clock && state.clock.phase === 'OVER'); }
  function no(code) { return U.no(code, SB.text.label('refuse.' + code)); }
  function getShow(state, showId, where) {
    var s = state.shows && state.shows[showId];
    if (!s) SB.fail(where || 'Shows', 'unknown show "' + showId + '"');
    return s;
  }
  function roomOf(state, show) { return show && show.roomId && state.rooms ? state.rooms[show.roomId] || null : null; }
  function bandOf(state, id) { return state.bands ? state.bands[id] || null : null; }
  function log(state, records) {
    records = (records || []).filter(Boolean);
    if (records.length && SB.Week && SB.Week.log) SB.Week.log(state, records);
    return records;
  }
  function ensure(state, show) { if (SB.Jobs && SB.Jobs.ensure) SB.Jobs.ensure(state, show.id); }
  function cityZoneId(state) {
    var k, z;
    if (state.zones) for (k in state.zones) { z = state.zones[k]; if (z && z.kind === 'CITY') return z.id || k; }
    return 'city';
  }
  function slotIndex(show, bandId) {
    var i, s = show.bill.slots;
    for (i = 0; i < s.length; i++) if (s[i].bandId === bandId) return i;
    return -1;
  }
  function isPerm(a, b) {
    if (!Array.isArray(a) || a.length !== b.length) return false;
    var x = a.slice().sort(), y = b.slice().sort(), i;
    for (i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  }
  function trustRecord(state, bandId, k, showId, scale) {
    if (!SB.Bands || !SB.Bands.addTrust) return null;
    return SB.Bands.addTrust(state, bandId, k, { showId: showId, scale: scale == null ? 1 : scale });
  }
  /* A ranged trust event (CANCELLED: [-25, -5]) placed so that its size is `target`. */
  function scaleFor(k, target) {
    var size = C.TRUST_EVENTS[k] && C.TRUST_EVENTS[k].size;
    if (!Array.isArray(size) || target == null) return 1;
    return U.clamp((target - size[0]) / (size[1] - size[0]), 0, 1);
  }

  function emptyPromo() {
    return { announce: null, announceHadFlyer: false, flyer: null, printed: null, print: null, runs: {}, listings: null,
             mail: null, push: null, dayOf: false, paid: null, ad: null, shares: {}, handouts: [], invites: [], roomPosted: false };
  }

  /* set times: the first set starts SET.doorsLead after doors; each changeover is SET.changeover */
  function retime(show) {
    var b = show.bill, t = b.doors + C.SET.doorsLead, i;
    b.times = [];
    for (i = 0; i < b.slots.length; i++) {
      b.times.push(t);
      t += (b.slots[i].minutes || C.SET.def) + (i < b.slots.length - 1 ? C.SET.changeover : 0);
    }
    b.ends = b.slots.length ? t : null;
  }
  function minutesOk(m) {
    m = Math.round(Number(m));
    if (!isFinite(m)) return C.SET.def;
    m = Math.round(m / C.SET.step) * C.SET.step;
    return U.clamp(m, C.SET.min, C.SET.max);
  }

  /* Flyer order when never set: touring bands first, then locals by tierPublic, highest first. */
  function defaultBilling(state, show) {
    return show.bill.slots.slice().sort(function (a, c) {
      var ta = a.role === 'TOURING' ? 1 : 0, tc = c.role === 'TOURING' ? 1 : 0, ba, bc;
      if (ta !== tc) return tc - ta;
      ba = bandOf(state, a.bandId); bc = bandOf(state, c.bandId);
      return ((bc && bc.tierPublic) || 0) - ((ba && ba.tierPublic) || 0);
    }).map(function (s) { return s.bandId; });
  }
  function billing(state, show) {
    var b = show.bill.billing && show.bill.billing.length ? show.bill.billing.filter(function (id) { return slotIndex(show, id) >= 0; }) : null;
    if (!b) return defaultBilling(state, show);
    show.bill.slots.forEach(function (s) { if (b.indexOf(s.bandId) < 0) b.push(s.bandId); });
    return b;
  }

  function playerHold(state, roomId, day, showId) {
    var room = state.rooms ? state.rooms[roomId] : null, cell, i, h, rank = 0;
    if (!room || !room.calendar) return null;
    cell = room.calendar[day];
    if (!cell || !cell.holds) return null;
    for (i = 0; i < cell.holds.length; i++) {
      h = cell.holds[i];
      if (h.state !== 'CONFIRMED') rank++;
      if (h.by === 'player' && (h.showId == null || h.showId === showId)) return { rank: Math.max(1, rank), expires: h.expires == null ? null : h.expires };
    }
    return null;
  }

  /* ------------------------------------------------------------------ */
  /* create, get, list, view                                             */
  /* ------------------------------------------------------------------ */

  function create(state, spec) {
    var req = null, day, id, show, k, ask;
    if (over(state)) return no('OVER');
    spec = spec || {};
    if (!state.shows) state.shows = {};
    if (spec.requestId) {
      req = state.requests ? state.requests[spec.requestId] : null;
      if (!req) SB.fail('Shows.create', 'unknown request "' + spec.requestId + '"');
      for (k in state.shows) {
        if (state.shows[k].requestId === spec.requestId && state.shows[k].status !== 'CANCELLED') return no('ALREADY');
      }
      if (req.status === 'PASSED' || req.status === 'LAPSED' || req.status === 'IGNORED' || req.status === 'WITHDRAWN') return no('INVALID');
      day = req.dates && req.dates.length ? req.dates[0] : null;
      if (day == null) SB.fail('Shows.create', 'request "' + spec.requestId + '" has no dates');
    } else if (spec.own) {
      day = spec.day;
      if (typeof day !== 'number' || day !== Math.floor(day)) SB.fail('Shows.create', 'an own show needs a whole day number');
      if (day <= today(state)) return no('INVALID');
    } else SB.fail('Shows.create', 'spec needs requestId or own');

    id = U.newId(state, 's');
    ask = req && req.ask ? req.ask : null;
    show = {
      id: id, status: 'DRAFT',
      requestId: req ? req.id : null,
      origin: req ? (req.day == null ? null : req.day) : null,
      day: day, slot: 'EVENING', roomId: null, zoneId: cityZoneId(state),
      label: 'NORMAL',
      tags: req ? [] : (spec.tags || []).filter(function (t) { return E.FLYER_TAG[t]; }),
      benefitFor: req ? null : (spec.benefitFor || null),
      deal: ask ? { shape: ask.shape || 'DOOR', guarantee: ask.guarantee || 0, pct: ask.pct == null ? 1 : ask.pct, afterCosts: true,
                    lodging: !!ask.lodging, meal: !!ask.meal, written: true, agreedDay: null }
                : { shape: 'DOOR', guarantee: 0, pct: 0, afterCosts: true, lodging: false, meal: false, written: true, agreedDay: null },
      bill: { slots: [], billing: [], locked: false, lockedDay: null, doors: DOORS_EVENING, times: [], ends: null },
      door: { price: C.DOOR.def, donation: false, suggested: null, ages: 'ALL', comps: 0, sheet: true, address: null },
      crew: { sound: null, security: null, floor: null, lodging: null }, insure: false,
      hold: null, confirmedDay: null,
      promo: emptyPromo(),
      prep: { advance: null, gear: null, neighbors: null, dayBefore: null, food: null, rules: null, lodging: null },
      flyer: null, mods: {}, jobs: [], cancelled: null, night: null, result: null
    };
    state.shows[id] = show;
    ensure(state, show);
    return U.yes({ showId: id });
  }

  function get(state, showId) { return getShow(state, showId, 'Shows.get'); }

  function list(state, filter) {
    var out = [], k, s;
    filter = filter || {};
    if (!state.shows) return out;
    for (k in state.shows) {
      s = state.shows[k];
      if (filter.status && (Array.isArray(filter.status) ? filter.status.indexOf(s.status) < 0 : s.status !== filter.status)) continue;
      if (filter.fromDay != null && s.day < filter.fromDay) continue;
      if (filter.toDay != null && s.day > filter.toDay) continue;
      out.push(s);
    }
    return out.sort(function (a, b) { return a.day - b.day || (a.id < b.id ? -1 : 1); });
  }

  function view(state, showId) {
    var show = getShow(state, showId, 'Shows.view'), terms = null, flags, rules = null;
    if (show.roomId && SB.Rooms && SB.Rooms.terms) terms = SB.Rooms.terms(state, show.roomId, show.id);
    if (SB.Rooms && SB.Rooms.crewRules) rules = SB.Rooms.crewRules(state, show.roomId, show.id);
    return {
      show: show,
      room: show.roomId && SB.Rooms ? SB.Rooms.card(state, show.roomId) : null,
      bands: show.bill.slots.map(function (s, i) {
        flags = SB.Harm && SB.Harm.flags ? SB.Harm.flags(state, s.bandId) : { listed: [] };
        return { slot: i, band: SB.Bands.card(state, s.bandId), start: show.bill.times[i] == null ? null : show.bill.times[i],
                 minutes: s.minutes, pay: s.pay, fee: s.fee, confirmed: !!s.confirmed, listed: !!(flags && flags.listed && flags.listed.length) };
      }),
      billing: billing(state, show),
      jobs: SB.Jobs.forShow(state, show.id),
      forecast: SB.Forecast.card(state, show.id),
      accounts: SB.Money.showAccounts(state, show.id),
      deal: show.deal,
      needsToConfirm: terms && terms.needs ? terms.needs.map(function (n) { return { k: n.k, text: n.text, met: !!n.met }; }) : [],
      canAnnounce: show.status === 'CONFIRMED',
      /* security (hired like sound, sometimes required) and event insurance (bought when the date confirms) */
      security: rules ? rules.security : null,
      insurance: rules ? rules.insurance : null
    };
  }

  /* ------------------------------------------------------------------ */
  /* the bill                                                            */
  /* ------------------------------------------------------------------ */

  function live(show) { return show.status === 'DRAFT' || show.status === 'CONFIRMED'; }

  function setBill(state, showId, bill) {
    var show = getShow(state, showId, 'Shows.setBill'), b = show.bill, oldIdx = {}, records = [], order;
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    bill = bill || {};
    order = bill.order || b.slots.map(function (s) { return s.bandId; });
    if (!isPerm(order, b.slots.map(function (s) { return s.bandId; }))) return no('INVALID');
    b.slots.forEach(function (s, i) { oldIdx[s.bandId] = i; });
    b.slots = order.map(function (id) { return b.slots[oldIdx[id]]; });
    if (bill.minutes) b.slots.forEach(function (s) { if (bill.minutes[s.bandId] != null) s.minutes = minutesOk(bill.minutes[s.bandId]); });
    if (bill.doors != null) {
      if (typeof bill.doors !== 'number' || !isFinite(bill.doors)) return no('INVALID');
      b.doors = Math.round(bill.doors);
    }
    retime(show);
    /* after the lock, a band moved down the night (to an earlier set) takes it as a bump */
    if (b.locked) b.slots.forEach(function (s, i) {
      if (i < oldIdx[s.bandId] && s.confirmed) records.push(trustRecord(state, s.bandId, 'BUMPED', show.id));
    });
    ensure(state, show);
    records = log(state, records);
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'BILL', { showId: show.id });
    return U.yes({ records: records });
  }

  function setBilling(state, showId, order) {
    var show = getShow(state, showId, 'Shows.setBilling');
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    if (show.promo && show.promo.printed != null) return no('LOCKED');
    if (!isPerm(order, show.bill.slots.map(function (s) { return s.bandId; }))) return no('INVALID');
    show.bill.billing = order.slice();
    return U.yes();
  }

  function setDoor(state, showId, door) {
    var show = getShow(state, showId, 'Shows.setDoor'), room = roomOf(state, show), d = show.door, announced, ages, addrRoom;
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    door = door || {};
    announced = show.promo && show.promo.announce != null;
    if (door.price != null) {
      if (typeof door.price !== 'number' || !isFinite(door.price) || door.price < 0) return no('INVALID');
    }
    if (door.suggested != null && (typeof door.suggested !== 'number' || door.suggested < 0)) return no('INVALID');
    if (door.ages != null) {
      ages = door.ages;
      if (!E.AGES[ages]) return no('INVALID');
      if (room && room.ages && room.ages.indexOf(ages) < 0 && !(ages === 'ALL' && show.slot === 'MATINEE' && room.matinee)) {
        return U.no('INVALID', SB.text.has('strings.refuse.AGES') ? SB.text.label('refuse.AGES') : SB.text.label('refuse.INVALID'));
      }
    }
    addrRoom = room && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0;
    if (door.address !== undefined && door.address !== null) {
      if (!E.ADDRESS[door.address]) return no('INVALID');
      if (!addrRoom) return no('INVALID');
      if (announced && door.address !== d.address) return no('LOCKED');
    }
    if (door.price != null) d.price = Math.round(door.price);
    if (door.donation != null) d.donation = !!door.donation;
    if (door.suggested !== undefined) d.suggested = door.suggested == null ? null : Math.round(door.suggested);
    if (door.ages != null) d.ages = door.ages;
    if (door.sheet != null) d.sheet = !!door.sheet;
    if (door.address != null) d.address = door.address;
    if (addrRoom && d.address == null) d.address = C.USUAL.address;
    if (!addrRoom) d.address = null;
    ensure(state, show);
    return U.yes();
  }

  function setLabel(state, showId, label, tags) {
    var show = getShow(state, showId, 'Shows.setLabel');
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    if (show.promo && show.promo.announce != null) return no('LOCKED');
    if (label != null && !E.LABEL[label]) return no('INVALID');
    if (tags != null && (!Array.isArray(tags) || tags.some(function (t) { return !E.FLYER_TAG[t]; }))) return no('INVALID');
    if (label != null) show.label = label;
    if (tags != null) {
      show.tags = tags.slice();
      if (show.tags.indexOf('BENEFIT') < 0) show.benefitFor = null;
    }
    return U.yes();
  }

  function setDeal(state, showId, deal, agreed) {
    var show = getShow(state, showId, 'Shows.setDeal'), d = show.deal || {}, k;
    deal = deal || {};
    for (k in deal) if (Object.prototype.hasOwnProperty.call(deal, k) && k !== 'agreedDay') d[k] = deal[k];
    if (d.shape && !E.DEAL[d.shape]) SB.fail('Shows.setDeal', 'unknown deal shape "' + d.shape + '"');
    if (d.guarantee != null) d.guarantee = Math.max(0, Math.round(d.guarantee));
    if (agreed) d.agreedDay = today(state);
    show.deal = d;
    ensure(state, show);
  }

  function askedYes(state, showId, kinds, personId) {
    var k, a;
    if (!state.asks) return false;
    for (k in state.asks) {
      a = state.asks[k];
      if (a.showId === showId && kinds.indexOf(a.kind) >= 0 && a.toId === personId && a.status === 'YES') return true;
    }
    return false;
  }

  function assignCrew(state, showId, role, personId) {
    var show = getShow(state, showId, 'Shows.assignCrew');
    if (ROLES.indexOf(role) < 0) SB.fail('Shows.assignCrew', 'unknown crew role "' + role + '"');
    show.crew[role] = personId || null;
    if (personId && personId !== 'player' && role !== 'lodging' && state.player) {
      if (!state.player.usual) state.player.usual = { sound: null, security: null, floor: null };
      state.player.usual[role] = personId;
    }
    if (role === 'lodging') show.prep.lodging = personId ? today(state) : null;
    ensure(state, show);
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'SOUND', { showId: show.id, role: role });
  }

  function setCrew(state, showId, role, personId) {
    var show = getShow(state, showId, 'Shows.setCrew');
    if (over(state)) return no('OVER');
    if (ROLES.indexOf(role) < 0) SB.fail('Shows.setCrew', 'unknown crew role "' + role + '"');
    if (!live(show)) return no('LOCKED');
    if (personId == null || personId === '') { assignCrew(state, showId, role, null); return U.yes(); }
    if (personId === 'player') {
      if (role !== 'floor' && role !== 'lodging') return no('INVALID');
      assignCrew(state, showId, role, 'player'); return U.yes();
    }
    if (!(state.people && state.people[personId]) && !(SB.People && SB.People.get(state, personId))) SB.fail('Shows.setCrew', 'unknown person "' + personId + '"');
    if (role !== 'floor') {
      var kinds = role === 'lodging' ? ['LODGING'] : ['CREW'];
      if (!askedYes(state, showId, kinds, personId)) return U.no('NEEDS', SB.text.label('refuse.NEEDS'));
    }
    assignCrew(state, showId, role, personId);
    return U.yes();
  }

  /* Event insurance (C.INSURANCE): on or off before the date confirms, bought when it does; turned on after, it is bought
   * now. Once paid for it stays. */
  function setInsurance(state, showId, on) {
    var show = getShow(state, showId, 'Shows.setInsurance'), room = roomOf(state, show), bought, cost, res;
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    bought = SB.Rooms && SB.Rooms.insuranceBought ? SB.Rooms.insuranceBought(state, show.id) : 0;
    if (!on) {
      if (bought > 0) return no('LOCKED');
      show.insure = false;
      ensure(state, show);
      return U.yes();
    }
    if (show.status === 'CONFIRMED' && !(bought > 0) && room) {
      cost = SB.Rooms.insuranceCost(state, room);
      if (cost > 0) {
        if (!SB.Money.canCover(state, cost)) return no('NO_MONEY');
        res = SB.Money.spend(state, cost, 'INSURANCE', room.name || '', { showId: show.id });
        if (res && res.ok === false) return no('NO_MONEY');
      }
    }
    show.insure = true;
    ensure(state, show);
    return U.yes();
  }

  function addBand(state, showId, bandId, slot) {
    var show = getShow(state, showId, 'Shows.addBand'), b = show.bill, i, entry, at;
    slot = slot || {};
    if (!bandOf(state, bandId) && !(SB.Bands && SB.Bands.get(state, bandId))) SB.fail('Shows.addBand', 'unknown band "' + bandId + '"');
    i = slotIndex(show, bandId);
    if (i >= 0) {
      entry = b.slots[i];
      entry.confirmed = true;
      if (slot.pay !== undefined) entry.pay = slot.pay;
      if (slot.fee != null) entry.fee = slot.fee;
      if (slot.askId) entry.askId = slot.askId;
      if (slot.role) entry.role = slot.role;
    } else {
      entry = { bandId: bandId, role: slot.role === 'TOURING' ? 'TOURING' : 'LOCAL', minutes: minutesOk(slot.minutes == null ? C.SET.def : slot.minutes),
                pay: slot.role === 'TOURING' ? null : (slot.pay || 'FREE'), fee: Math.max(0, Math.round(slot.fee || 0)),
                askId: slot.askId || null, confirmed: slot.confirmed === false ? false : true };
      if (slot.want === 'OPEN' || slot.want === 'CLOSE') entry.want = slot.want;
      /* in play order: where it was asked to play (first, last), else before the closer */
      if (entry.want === 'OPEN') at = 0;
      else if (entry.want === 'CLOSE') at = b.slots.length;
      else at = b.slots.length >= 1 && b.slots[b.slots.length - 1].want !== 'OPEN' ? b.slots.length - 1 : b.slots.length;
      b.slots.splice(at, 0, entry);
      if (b.billing && b.billing.length) {
        if (entry.role === 'TOURING') b.billing.unshift(bandId); else b.billing.push(bandId);
      }
    }
    retime(show);
    ensure(state, show);
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, 'BILL', { showId: show.id });
  }

  function withdrawAsksFor(state, show, bandId) {
    var k, a, records = [];
    if (!state.asks) return records;
    for (k in state.asks) {
      a = state.asks[k];
      if (a.showId === show.id && a.toId === bandId && (a.status === 'QUEUED' || a.status === 'SENT') && SB.Mail && SB.Mail.withdraw) {
        var r = SB.Mail.withdraw(state, a.id);
        if (r && r.records) records = records.concat(r.records);
      }
    }
    return records;
  }

  function dropBand(state, showId, bandId, why) {
    var show = getShow(state, showId, 'Shows.dropBand'), b = show.bill, i = slotIndex(show, bandId), records = [], pendingAsk = false, k, a;
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    if (state.asks) for (k in state.asks) {
      a = state.asks[k];
      if (a.showId === show.id && a.toId === bandId && (a.status === 'QUEUED' || a.status === 'SENT')) pendingAsk = true;
    }
    if (i < 0 && !pendingAsk) return no('INVALID');
    if (pendingAsk) records = records.concat(withdrawAsksFor(state, show, bandId));   // Mail.withdraw charges DROPPED_ASK
    if (i >= 0) {
      if (why !== 'BAND' && why !== 'ROOM' && b.slots[i].confirmed) records.push(trustRecord(state, bandId, 'BUMPED', show.id));
      b.slots.splice(i, 1);
      if (b.billing) b.billing = b.billing.filter(function (id) { return id !== bandId; });
      retime(show);
    }
    ensure(state, show);
    records = log(state, records);
    return U.yes({ records: records });
  }

  function lock(state, showId, day) {
    var show = getShow(state, showId, 'Shows.lock');
    show.bill.locked = true;
    show.bill.lockedDay = typeof day === 'number' ? day : today(state);
    if (!show.bill.billing || !show.bill.billing.length) show.bill.billing = defaultBilling(state, show);
    retime(show);
  }

  function onConfirmed(state, showId, day) {
    var show = getShow(state, showId, 'Shows.onConfirmed'), records = [], text;
    if (show.status === 'PLAYED' || show.status === 'CANCELLED') return records;
    day = typeof day === 'number' ? day : today(state);
    show.status = 'CONFIRMED';
    show.confirmedDay = day;
    show.hold = null;
    if (!state.flags) state.flags = {};
    if (!state.flags.sawConfirmLine) {
      /* SPEC?: state.flags belongs to Effects; the one-time confirm line is the only flag written here */
      state.flags.sawConfirmLine = true;
      text = SB.text.has('legacy.opening.confirmLine') ? SB.text.line('legacy.opening.confirmLine', {}, null) : '';
      records.push({ t: 'HOLD', day: day, half: null, showId: show.id, text: SB.text.off ? '' : text,
                     roomId: show.roomId, night: show.day, change: 'CONFIRMED' });
    }
    ensure(state, show);
    return records;
  }

  /* ------------------------------------------------------------------ */
  /* move and cancel                                                     */
  /* ------------------------------------------------------------------ */

  function move(state, showId, to) {
    var show = getShow(state, showId, 'Shows.move'), room, hold, records = [], wasConfirmed, oldRoom, r, scale;
    if (over(state)) return no('OVER');
    if (!live(show)) return no('LOCKED');
    to = to || {};
    var roomId = to.roomId || show.roomId, day = to.day == null ? show.day : to.day, slot = to.slot || show.slot;
    if (typeof day !== 'number' || day < today(state)) return no('INVALID');
    if (slot && !E.SLOT[slot]) return no('INVALID');
    room = roomId && state.rooms ? state.rooms[roomId] : null;
    if (roomId && !room && !(SB.Rooms && SB.Rooms.get(state, roomId))) SB.fail('Shows.move', 'unknown room "' + roomId + '"');
    hold = to.hold || (roomId ? playerHold(state, roomId, day, show.id) : null);
    var same = roomId === show.roomId && day === show.day;
    if (!hold && !same) return U.no('NEEDS', SB.text.label('refuse.NEEDS'));
    wasConfirmed = show.status === 'CONFIRMED';
    if (wasConfirmed && !same) {
      /* a new hold and confirm; printed flyers are wrong; bands and the room take it as a far cancellation */
      oldRoom = show.roomId;
      if (oldRoom && SB.Rooms && SB.Rooms.release) SB.Rooms.release(state, show.id);
      Object.keys(show.promo.runs || {}).forEach(function (k) { show.promo.runs[k].effect = U.round((show.promo.runs[k].effect || 1) * 0.5, 3); });
      scale = scaleFor('CANCELLED', C.CANCEL.far.trust);
      show.bill.slots.forEach(function (s) { if (s.confirmed) records.push(trustRecord(state, s.bandId, 'CANCELLED', show.id, scale)); });
      if (oldRoom && SB.Rooms && SB.Rooms.adjustRel) records.push(SB.Rooms.adjustRel(state, oldRoom, C.OWNER.cancel[1], 'CANCELLED'));
      if (SB.Territory && SB.Territory.adjustWord) records.push(SB.Territory.adjustWord(state, C.CANCEL.far.word, 'MOVED'));
      show.status = 'DRAFT';
      show.confirmedDay = null;
    }
    show.roomId = roomId || null;
    show.zoneId = room && room.zoneId ? room.zoneId : show.zoneId;
    show.day = day;
    if (slot !== show.slot) {
      show.slot = slot;
      show.bill.doors = slot === 'MATINEE' ? DOORS_MATINEE : DOORS_EVENING;
      retime(show);
    }
    if (hold) show.hold = { rank: hold.rank || 1, expires: hold.expires == null ? null : hold.expires };
    if (room && C.CHANNELS.ADDRESS.kinds.indexOf(room.kind) >= 0) { if (show.door.address == null) show.door.address = C.USUAL.address; }
    else if (room) show.door.address = null;
    if (room && room.ages && room.ages.indexOf(show.door.ages) < 0 && !(show.door.ages === 'ALL' && show.slot === 'MATINEE' && room.matinee)) show.door.ages = room.ages[0];
    ensure(state, show);
    r = log(state, records);
    return U.yes({ records: r });
  }

  function cancel(state, showId, why) {
    var show = getShow(state, showId, 'Shows.cancel'), out, tier, f, records = [], room, k, a, scaleT, scaleL;
    if (over(state)) return no('OVER');
    if (!live(show)) return no('ALREADY');
    why = why || 'PLAYER';
    if (!E.CANCEL[why]) SB.fail('Shows.cancel', 'unknown cancel reason "' + why + '"');
    out = show.day - today(state);
    tier = out >= C.CANCEL.far.days ? C.CANCEL.far : (out >= C.CANCEL.mid.days ? C.CANCEL.mid : C.CANCEL.near);
    /* SPEC?: costs are a third for RESPECTED and STORM; a band or a room that cancels is not the player's doing, so
     * BAND and ROOM carry no trust, word or regulars cost (stress still applies) */
    f = (why === 'RESPECTED' || why === 'STORM') ? C.CANCEL.respected : (why === 'BAND' || why === 'ROOM' ? 0 : 1);
    /* SPEC?: 2.3 says a draft costs nothing to make, and Config.CANCEL prices a cancellation by days out alone. A draft
     * nobody was told about (not confirmed, no band agreed, never announced) is an idea put down, not a show
     * cancelled: it costs no trust, word, regulars or stress. A hold it had is let go by Rooms.release, on that rule's terms. */
    var committed = show.status === 'CONFIRMED' || show.bill.slots.some(function (s) { return s.confirmed; }) ||
                    (show.promo && show.promo.announce != null);
    if (!committed) f = 0;
    room = roomOf(state, show);
    /* pending asks go away without a charge */
    if (state.asks) for (k in state.asks) {
      a = state.asks[k];
      if (a.showId === show.id && (a.status === 'QUEUED' || a.status === 'SENT') && SB.Mail && SB.Mail.withdraw) SB.Mail.withdraw(state, a.id, true);
    }
    if (f > 0) {
      scaleT = scaleFor('CANCELLED', tier.trust * f);
      scaleL = scaleFor('CANCELLED', (tier.locals == null ? tier.trust : tier.locals) * f);
      show.bill.slots.forEach(function (s) {
        if (s.confirmed) records.push(trustRecord(state, s.bandId, 'CANCELLED', show.id, s.role === 'TOURING' ? scaleT : scaleL));
      });
      if (room && tier.room && SB.Rooms && SB.Rooms.adjustRel) records.push(SB.Rooms.adjustRel(state, room.id, Math.round(tier.room * f), 'CANCELLED'));
      if (tier.word && SB.Territory && SB.Territory.adjustWord) records.push(SB.Territory.adjustWord(state, tier.word * f, 'CANCELLED'));
      if (tier.regulars && SB.Crowd && SB.Crowd.loseRegulars) SB.Crowd.loseRegulars(state, Math.abs(tier.regulars) * f, null, 'CANCELLED');
    }
    if (committed && SB.Stress && SB.Stress.add) SB.Stress.add(state, C.CANCEL.stress, 'CANCELLED');
    if (show.roomId && SB.Rooms && SB.Rooms.release) SB.Rooms.release(state, show.id);
    show.status = 'CANCELLED';
    show.cancelled = { day: today(state), why: why };
    show.hold = null;
    ensure(state, show);
    records = log(state, records);
    return U.yes({ records: records });
  }

  return {
    create: create, get: get, list: list, view: view, setBill: setBill, setBilling: setBilling, setDoor: setDoor,
    setLabel: setLabel, setDeal: setDeal, setCrew: setCrew, setInsurance: setInsurance, addBand: addBand, dropBand: dropBand, lock: lock,
    onConfirmed: onConfirmed, move: move, cancel: cancel,
    /* internal outside the manifest (see the header) */
    assignCrew: assignCrew, billing: function (state, showId) { return billing(state, getShow(state, showId, 'Shows.billing')); }
  };
});
