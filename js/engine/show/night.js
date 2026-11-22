/* Scene Booker — engine/show/night.js (role E2). SB.Night: the show night, the settle and what follows (02-engine 3.3,
 * 5.5, 5.6, 7.7, 7.11).
 *
 * While a night is played the show carries `night`:
 *   { demand, mods, stops, at, par, call, luck, emitted, dispute,          (01-state 2.6)
 *     idx, ids, choices, incidents, setIdx, ended, outcome, accounts, ... }  (this module's own bookkeeping)
 * `mods` starts as a copy of show.mods and is where SB.Effects writes during the night; `incidents` is the night's own
 * list ({ kind, q, fromEvent }). The Demand is computed once, at begin; Model.night is run again after every decision.
 * Streams: 'show:' + showId (luck, the end-of-night rolls, the dispute, the hat), TEXT for lines.
 *
 * Extras beside the manifest: asShow(state, otherShow) builds the show-shaped object resolveOther runs (Notebook.scout
 * uses it too).
 */
SB.module('Night', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, CH = C.CHANNELS, EMPTY = [];
  var ORDER = ['SHOW_RESULT', 'LEDGER', 'LUCK', 'COMMENT', 'LEARNED', 'DRAW', 'TRUST', 'REGULARS', 'NAME', 'WORD', 'MEMORY', 'STAGE', 'FIRST'];
  var LEARNED_MAX = 6;
  var SETTLE_ORDER = ['ROOM', 'DEPOSIT', 'SOUND', 'SECURITY', 'HOST', 'GUARANTEE', 'LOCAL', 'SHARE', 'INSURANCE', 'DAMAGES', 'COSTS', 'YOU'];

  function num(v, d) { return (typeof v === 'number' && v === v && v !== Infinity && v !== -Infinity) ? v : d; }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function showOf(state, showId, where) {
    var s = state && state.shows && state.shows[showId];
    if (!s) SB.fail(where, 'unknown show "' + showId + '"');
    return s;
  }
  function roomOf(state, show) { return show.roomId && state.rooms ? state.rooms[show.roomId] : null; }
  function has(mod, fn) { return SB[mod] && typeof SB[mod][fn] === 'function'; }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function line(state, path, slots) { return SB.text.off ? '' : (SB.text.has(path) ? SB.text.line(path, slots, textRng(state)) : ''); }
  function rec(show, t, text, payload) {
    var r = { t: t, day: show.day, half: 'NIGHT', showId: show.id, text: text || '' }, k;
    if (payload) for (k in payload) r[k] = payload[k];
    return r;
  }
  function log(state, records) { if (has('Week', 'log')) SB.Week.log(state, records); }
  function push(list, more) { var i; if (more) for (i = 0; i < more.length; i++) if (more[i]) list.push(more[i]); return list; }
  function touringSlot(show) {
    var s = (show.bill && show.bill.slots) || EMPTY, i;
    for (i = 0; i < s.length; i++) if (s[i].role === 'TOURING') return s[i];
    return null;
  }
  function bandName(state, id) { var b = state.bands && state.bands[id]; return b ? b.name : ''; }
  function personName(state, id) { var p = id && state.people ? state.people[id] : null; return p ? (p.nick || p.first || '') : ''; }

  /* The mods the model reads tonight: what Effects has written so far, with the night's own incidents listed. */
  function effMods(show) {
    var n = show.night, m = (n && n.mods) || show.mods || {}, out, k;
    if (!n || !n.incidents || !n.incidents.length) return m;
    out = {};
    for (k in m) out[k] = m[k];
    out.incidents = (m.incidents || EMPTY).concat(n.incidents);
    return out;
  }

  function outcomeNow(state, show) {
    return SB.Model.night(state, show, show.night.demand, effMods(show), SB.Forecast.lens(state, 'TRUTH', null));
  }

  /* ---------------- the night as a sequence of things that happen ---------------- */

  function timeline(state, show, out) {
    var items = [], sets = out.sets, n = sets.length, night = show.night, doors = num(show.bill && show.bill.doors, n ? sets[0].start - C.SET.doorsLead : 1140);
    var ts = touringSlot(show), first = ts ? ts.bandId : (n ? sets[0].bandId : null), i, s, arr = [0, 0, 0], g, last = n ? sets[n - 1].end : doors, cut = n;
    if (typeof night.endAt === 'number' && n) cut = Math.max(1, Math.min(n, night.endAt));
    items.push({ id: 'loadIn', at: doors - 60, t: 'TICK', path: 'feedback.ticker.loadIn', slots: { band: bandName(state, first) } });
    items.push({ id: 'doors', at: doors + num(night.mods && night.mods.set1Presence ? 15 : 0, 0), t: 'TICK', path: 'feedback.ticker.doors', slots: {} });
    for (i = 0; i < cut; i++) {
      s = sets[i];
      for (g = 0; g < 3; g++) arr[g] = Math.min(out.byGen[g], Math.max(arr[g], s.byGen[g]));
      items.push({ id: 'arr:' + s.bandId, at: s.start - 1, t: 'ARRIVALS', path: 'feedback.ticker.arrivals',
                   payload: { heads: arr[0] + arr[1] + arr[2], byGen: arr.slice() }, slots: { heads: arr[0] + arr[1] + arr[2] } });
      /* SPEC?: 02-engine 6.2 gives SET_START and SET_END a payload field `n` (the set's number), but `n` is also the
       * stamp Week.log puts on every record, and a record that already has `n` is skipped (2.2), so a set record
       * carrying `n` never reached the log. The log's stamp keeps `n`; the set's number is carried as `set`. */
      items.push({ id: 'start:' + s.bandId, at: s.start, t: 'SET_START', path: 'feedback.ticker.setStart',
                   payload: { set: i + 1, bandId: s.bandId, name: bandName(state, s.bandId) }, slots: { band: bandName(state, s.bandId), present: s.present }, set: i });
      items.push({ id: 'end:' + s.bandId, at: s.end, t: 'SET_END', path: s.peak ? 'feedback.ticker.full' : null,
                   payload: { set: i + 1, bandId: s.bandId, present: s.present, byGen: s.byGen.slice(), fill: s.fill, energy: s.energy, peak: s.peak }, slots: {} });
      if (s.peak) items.push({ id: 'post', at: s.end, t: 'POST', path: null, slots: {} });
      last = s.end;
    }
    items.push({ id: 'last', at: last, t: 'TICK', path: 'feedback.ticker.done', slots: {}, closing: true });
    return items;
  }

  function emit(state, show, out, records, until, closing) {
    var night = show.night, items = timeline(state, show, out), i, it, pl, k, sl, started = 0;
    for (i = 0; i < items.length; i++) {
      it = items[i];
      if (!night.ids[it.id]) {
        if (it.closing ? !closing : it.at > until) break;
        night.ids[it.id] = 1; night.emitted += 1;
        pl = { at: it.at };
        if (it.payload) for (k in it.payload) pl[k] = it.payload[k];
        sl = it.slots || {}; sl.t = SB.time.clock(it.at);
        records.push(rec(show, it.t, it.path ? line(state, it.path, sl) : '', pl));
      }
      if (it.set !== undefined) started = it.set + 1;
    }
    night.setIdx = started;
  }

  /* ---------------- the end of the night: incidents nobody decided, a dispute ---------------- */

  function endRolls(state, show, out, records) {
    var night = show.night, r = SB.rng.stream(state, 'show:' + show.id), room = roomOf(state, show), I = C.INCIDENTS, mods = night.mods || {};
    var full = CH.ADDRESS.kinds.indexOf(room.kind) >= 0 && show.door && show.door.address === 'FULL', sketch = num(room.sketch, 0) + (full ? CH.ADDRESS.sketch : 0);
    var u1 = r.next(), loss = r.int(I.THEFT.loss[0], I.THEFT.loss[1]), u2 = r.next(), fill = out.heads / Math.max(1, num(out.cap, room.cap)), p, at = out.sets.length ? out.sets[out.sets.length - 1].end : null, i, seen = {};
    var all = (mods.incidents || EMPTY).concat(night.incidents);
    for (i = 0; i < all.length; i++) seen[all[i].kind] = true;
    night.hatPer = Math.round(r.range(C.SHORTFALL.HAT.perHead[0], C.SHORTFALL.HAT.perHead[1]) * 100) / 100;
    /* SPEC?: 7.14 leaves "the rest" of the incidents to Night without naming them. The ones with an event of their own
     * (noise, a fight, the PA, someone hurt) are the Director's; Night rolls the two that have none: theft and a room over its number. */
    /* the player is on the door; security (C.SECURITY) makes theft and a crowd at the gate rarer, and a theft smaller */
    p = I.THEFT.p * (1 + sketch / I.THEFT.sketchDiv) * secMul(show, 'THEFT', 'pMul');
    if (has('Director', 'firstShow') && SB.Director.firstShow(state, show)) seen.THEFT = true;   // the opening's first show: no bad luck
    if (!seen.THEFT && u1 < p && out.gross + out.hat > 0) {
      night.theft = Math.min(out.gross + out.hat, Math.round(loss * secMul(show, 'THEFT', 'costMul')));
      night.incidents.push({ kind: 'THEFT', q: 0 });
      records.push(rec(show, 'INCIDENT', line(state, 'feedback.incident.THEFT', { amount: night.theft }), { at: at, kind: 'THEFT', q: 0 }));
    }
    p = mods.uncapped ? 1 : (fill >= I.OVER_CAP.above ? I.OVER_CAP.pAbove : (fill >= I.OVER_CAP.from ? I.OVER_CAP.p : 0)) * secMul(show, 'OVER_CAP', 'pMul');
    if (!seen.OVER_CAP && u2 < p) {
      night.incidents.push({ kind: 'OVER_CAP', q: 0 });
      records.push(rec(show, 'INCIDENT', line(state, 'feedback.incident.OVER_CAP', {}), { at: at, kind: 'OVER_CAP', q: 0 }));
    }
    night.damages = damagesOf(state, show, (mods.incidents || EMPTY).concat(night.incidents));
    return r;
  }

  /* C.SECURITY's multiplier `which` (pMul, costMul) for an incident kind, when the show has security on the night */
  function secMul(show, kind, which) {
    return show.crew && show.crew.security && C.SECURITY.incidents.indexOf(kind) >= 0 ? C.SECURITY[which] : 1;
  }
  function priceIndex(state) {
    var p = null;
    try { p = SB.Cities.pack(state); } catch (e) { p = null; }
    return p && p.money && typeof p.money.priceIndex === 'number' ? p.money.priceIndex : 1;
  }
  /* A serious incident (C.INSURANCE.serious: someone hurt, a room damaged in a fight) leaves a bill, once per kind, smaller
   * with security. Event insurance pays it; without it the booker does, at the settle. { amount, insured, kinds } or null. */
  function damagesOf(state, show, list) {
    var S = C.INSURANCE.serious, seen = {}, amt = 0, kinds = [], i, e, sec = !!(show.crew && show.crew.security);
    for (i = 0; i < list.length; i++) {
      e = list[i];
      if (!e || !S[e.kind] || seen[e.kind]) continue;
      seen[e.kind] = true; kinds.push(e.kind);
      amt += S[e.kind] * (sec ? C.SECURITY.costMul : 1);
    }
    if (!kinds.length) return null;
    return { amount: Math.round(amt * priceIndex(state)), kinds: kinds,
             insured: !!(has('Rooms', 'insuranceBought') && SB.Rooms.insuranceBought(state, show.id) > 0) };
  }

  function eventById(state, id) {
    var list = SB.Content.events, i;
    if (Array.isArray(list)) for (i = 0; i < list.length; i++) if (list[i] && list[i].id === id) return list[i];
    return null;
  }

  function buildDecision(state, show, ev, at, extra) {
    var ctx = { show: show.id, bind: {}, night: true }, sl = has('Effects', 'slots') ? (SB.Effects.slots(state, ctx) || {}) : {}, k, rng = textRng(state);
    function render(t) { return SB.text.off || !t ? '' : SB.text.render(t, sl, rng); }
    for (k in extra) sl[k] = extra[k];
    if (typeof at === 'number') sl.t = SB.time.clock(at);
    var options = (ev.options || []).map(function (o) {
      var en = o.needs && has('Effects', 'test') ? !!SB.Effects.test(state, o.needs, ctx) : true;
      return { id: o.id, label: render(o.label), likely: render(o.likely), costs: has('Effects', 'preview') ? SB.Effects.preview(state, o.effects || [], ctx) : [],
               enabled: en, why: en || !has('Effects', 'why') ? null : SB.Effects.why(state, o.needs, ctx) };
    });
    if (options.length && !options.some(function (o) { return o.enabled; })) { options[0].enabled = true; options[0].why = null; }
    return { id: SB.util.newId(state, 'd'), kind: 'NIGHT_STOP', eventId: ev.id, showId: show.id, day: show.day, half: 'NIGHT',
             at: typeof at === 'number' ? at : null, tier: ev.tier || null, title: render(ev.title), body: render(ev.body), options: options };
  }

  function maybeDispute(state, show, out, r) {
    var night = show.night, deal = show.deal || {}, ts = touringSlot(show), ev, f, yours, theirs, ask, req, u = r.next(), k = r.range(1.15, 1.4);
    if (!ts || deal.written !== false || (night.mods && night.mods.noDispute) || !(u < C.HANDSHAKE_DISPUTE)) return null;
    ev = eventById(state, 'DEAL_DISPUTE');
    if (!ev) { SB.log('warn', 'Night', 'no DEAL_DISPUTE event in SB.Content.events: the handshake stands'); return null; }
    f = figure(state, show, null);
    yours = f.touringAgreed; if (!(yours > 0)) return null;
    theirs = Math.round(yours * k);
    req = show.requestId && state.requests ? state.requests[show.requestId] : null; ask = req && req.ask ? num(req.ask.guarantee, 0) : 0;
    if (ask > theirs) theirs = ask;
    night.dispute = { theirs: theirs, yours: yours, split: Math.round((theirs + yours) / 2), answered: false };
    night.dispute.decision = buildDecision(state, show, ev, out.sets.length ? out.sets[out.sets.length - 1].end : null,
                                           { amount: theirs - yours, theirs: theirs, yours: yours, split: night.dispute.split, touring: bandName(state, ts.bandId) });
    return night.dispute.decision;
  }

  function byAt(a, b) { return (a.at === null || a.at === undefined ? Infinity : a.at) - (b.at === null || b.at === undefined ? Infinity : b.at); }

  /* Runs the night on from where it stands: to the next decision, or to its end. */
  function advance(state, show, records) {
    var night = show.night, out, dec, stop, r;
    if (show.status === 'CANCELLED' || !show.night) return { records: records, stop: { kind: 'SETTLE', showId: show.id } };
    if (night.mods && night.mods.endEarly && typeof night.endAt !== 'number') night.endAt = Math.max(1, night.setIdx);
    out = outcomeNow(state, show);
    while (night.idx < night.stops.length) {
      dec = night.stops[night.idx];
      if (typeof night.endAt === 'number' && typeof dec.at === 'number' && out.sets[night.endAt - 1] && dec.at > out.sets[night.endAt - 1].end) { night.idx++; continue; }
      emit(state, show, out, records, typeof dec.at === 'number' ? dec.at : Infinity, false);
      records.push(rec(show, 'EVENT', dec.title || '', { decisionId: dec.id, eventId: dec.eventId || null, tier: dec.tier || null }));
      stop = { kind: 'DECISION', decision: dec };
      night.at = stop;
      return { records: records, stop: stop };
    }
    emit(state, show, out, records, Infinity, false);
    r = endRolls(state, show, out, records);
    out = outcomeNow(state, show);
    emit(state, show, out, records, Infinity, true);
    night.ended = true; night.outcome = out;
    records.push(rec(show, 'NIGHT_END', '', { heads: out.heads, turnedAway: out.turnedAway, q: out.q }));
    dec = maybeDispute(state, show, out, r);
    if (dec) {
      records.push(rec(show, 'EVENT', dec.title || '', { decisionId: dec.id, eventId: dec.eventId, tier: dec.tier || null }));
      stop = { kind: 'DECISION', decision: dec };
    } else stop = { kind: 'SETTLE', showId: show.id };
    night.at = stop;
    return { records: records, stop: stop };
  }

  /* ---------------- begin, next ---------------- */

  function begin(state, showId) {
    var show = showOf(state, showId, 'Night.begin'), room = roomOf(state, show), records = [], night, par, call, luck, lens, stops, step;
    if (show.status !== 'CONFIRMED') SB.fail('Night.begin', 'show "' + showId + '" is ' + show.status + ', not CONFIRMED');
    if (!room || !show.bill) SB.fail('Night.begin', 'show "' + showId + '" has no room');
    if (!show.bill.slots) show.bill.slots = [];             // a night with nobody on the bill still happens: an empty room
    if (show.night && show.night.demand && show.night.at) return { records: [], stop: show.night.at };   // a reload mid-night
    par = SB.Forecast.par(state, showId); call = SB.Forecast.call(state, showId);                          // before luck is drawn
    luck = (show.night && show.night.luck) || SB.Model.luck(state, show);
    night = show.night = { demand: null, mods: SB.util.copy(show.mods || {}), stops: [], at: null, par: par, call: call, luck: luck, emitted: 0,
                           dispute: null, idx: 0, ids: {}, choices: [], incidents: [], setIdx: 0, ended: false, outcome: null, accounts: null, theft: 0 };
    lens = SB.Forecast.lens(state, 'TRUTH', null);
    night.demand = SB.Model.demand(state, show, lens, night.mods);
    stops = has('Director', 'nightStops') ? (SB.Director.nightStops(state, showId, night.demand) || []) : [];
    night.stops = stops.slice().sort(byAt);
    records.push(rec(show, 'NIGHT_START', '', { roomId: room.id, par: par.heads, call: { lo: call.lo, hi: call.hi, mid: call.mid }, cap: num(room.cap, 0) }));
    step = advance(state, show, records);
    log(state, step.records);
    if (has('Tutorial', 'notify')) SB.Tutorial.notify(state, 'NIGHT', { showId: showId });
    return step;
  }

  function next(state, showId, answer) {
    var show = showOf(state, showId, 'Night.next'), night = show.night, dec, opt = null, i, records = [], step;
    if (!night || !night.at || night.at.kind !== 'DECISION') SB.fail('Night.next', 'show "' + showId + '" has no decision waiting');
    if (!answer || typeof answer !== 'object') SB.fail('Night.next', 'an answer { decisionId, optionId } is needed');
    dec = night.at.decision;
    if (answer.decisionId !== dec.id) SB.fail('Night.next', 'decision "' + answer.decisionId + '" is not the one waiting ("' + dec.id + '")');
    for (i = 0; i < dec.options.length; i++) if (dec.options[i].id === answer.optionId) opt = dec.options[i];
    if (!opt) SB.fail('Night.next', 'decision ' + dec.id + ' has no option "' + answer.optionId + '"');
    if (dec.kind === 'SHORTFALL') {                         // the settle's own choice, when it is put as a decision
      night.shortfall = answer.optionId; night.at = { kind: 'SETTLE', showId: showId };
      return { records: [], stop: night.at };
    }
    push(records, has('Director', 'resolve') ? SB.Director.resolve(state, dec, answer.optionId) : []);
    if (!show.night) { log(state, records); return { records: records, stop: { kind: 'SETTLE', showId: showId } }; }   // the option ended the show
    night.choices.push({ decisionId: dec.id, eventId: dec.eventId || null, optionId: answer.optionId, text: opt.label || '' });
    /* compare by id: after a reload the dispute's decision is a copy, not the same object. A decision after the night ended is never an ordinary stop. */
    if (night.ended || (night.dispute && night.dispute.decision && night.dispute.decision.id === dec.id)) {
      if (night.dispute) night.dispute.answered = true;
      night.at = { kind: 'SETTLE', showId: showId };
      step = { records: records, stop: night.at };
    } else {
      night.idx += 1;
      step = advance(state, show, records);
    }
    log(state, step.records);
    if (has('Tutorial', 'notify')) SB.Tutorial.notify(state, 'NIGHT', { showId: showId });
    return step;
  }

  /* ---------------- 7.11 settling ---------------- */

  function crewPay(state, show, role) {
    var id = show.crew && show.crew[role], p = id && state.people ? state.people[id] : null, asks = state.asks || {}, ks, i, a;
    if (!id || id === 'player') return 0;
    ks = Object.keys(asks);
    for (i = ks.length - 1; i >= 0; i--) {
      a = asks[ks[i]];
      if (a.kind === 'CREW' && a.showId === show.id && a.toId === id && a.payload && a.payload.role === role && a.payload.pay) {
        return a.payload.pay.kind === 'CASH' ? Math.max(0, Math.round(num(a.payload.pay.amount, 0))) : 0;
      }
    }
    return p ? Math.max(0, Math.round(num(p.rate, 0))) : 0;
  }

  function spentOn(state, show, cats) {
    var led = (state.money && state.money.ledger) || EMPTY, i, l, out = [];
    for (i = 0; i < led.length; i++) {
      l = led[i];
      if (l.showId === show.id && l.amount < 0 && cats.indexOf(l.cat) >= 0) out.push({ label: SB.text.label('money.' + l.cat), amount: -l.amount, cat: l.cat });
    }
    return out;
  }

  function hostSoFar(state, show) {
    var n = show.night, ts = touringSlot(show);
    return ts && n && n.final && n.final.hostScores ? num(n.final.hostScores[ts.bandId], 0) : 0;
  }

  /* Every figure of the settle, from the night's outcome and one choice. Changes nothing. */
  function figure(state, show, choice) {
    var night = show.night, out = night.outcome || outcomeNow(state, show), room = roomOf(state, show), deal = show.deal || {}, slots = show.bill.slots;
    var terms = has('Rooms', 'terms') ? SB.Rooms.terms(state, room.id, show.id) : room, ts = touringSlot(show), shape = deal.shape || 'DOOR', S = C.SHORTFALL;
    var lines = [], G = out.gross + out.hat - num(night.theft, 0), offTop = 0, i, s, b, amt, dep, rentDue = 0, hc, base, tNow = 0, tKind = null, locals = [], localSum = 0;
    var owed, gap, left, custom, tFix = 0, keep, give, tGive = 0, lGive = 0, sf = choice && choice.shortfall, hs01, share, cover, hatAmt = 0, shareLocals = [], keepMax, fixed, trust;
    var sc = C.SPLIT.custom, shortfall = [], unpaid = 0, pocket = 0, avail, pay, costs, costSum = 0, x, gas = 0, extra = 0, short = false, why, tDeal = 0, ins = 0, dmg = null, dmgOwed = 0;
    function add(k, toId, amount, agreed) { var l = { k: k, label: SB.text.label('settle.' + k), toId: toId || null, amount: Math.max(0, Math.round(amount)), agreed: agreed !== false, disputed: false }; lines.push(l); return l; }
    if (G < 0) G = 0;
    /* 1. off the top */
    if (room.kind === 'CLUB') {
      hc = Math.min(G, num(terms.houseCosts, 0));
      rentDue = hc + Math.round((1 - clamp(num(terms.split, 1), 0, 1)) * Math.max(0, G - hc));
    } else if (room.kind !== 'HOUSE' && room.kind !== 'BAR' && num(terms.rent, 0) > 0) rentDue = Math.round(num(terms.rent, 0));
    /* a deposit already paid is not part of the split: the full rent comes off the top and the deposit comes back to the player.
     * Ledger lines carry the show, not the room, so every deposit held for this show counts. */
    dep = depositHeld(state, show);
    if (rentDue > 0) { x = add('ROOM', room.ownerId, rentDue); if (dep > 0 && dep <= rentDue && SB.text.has('strings.settle.ROOM_DEP')) x.label = SB.text.label('settle.ROOM_DEP', { rent: rentDue, dep: dep }); }
    amt = show.crew && show.crew.sound ? crewPay(state, show, 'sound') : Math.round(num(terms.soundFee, 0));
    if (amt > 0) add('SOUND', (show.crew && show.crew.sound) || room.ownerId, amt);
    amt = crewPay(state, show, 'security');
    if (amt > 0) add('SECURITY', show.crew.security, amt);
    if (room.kind === 'HOUSE' && num(terms.hostCut, 0) > 0) add('HOST', room.ownerId, terms.hostCut);
    for (i = 0; i < lines.length; i++) offTop += lines[i].amount;
    /* 2. the touring band */
    if (ts) {
      base = Math.max(0, deal.afterCosts === false ? G : G - offTop);
      if (shape === 'DOOR') { tNow = Math.round(clamp(num(deal.pct, 0), 0, 1) * base); tKind = 'SHARE'; }
      else if (shape === 'HAT') { tNow = Math.round(clamp(num(deal.pct, 0), 0, 1) * Math.max(0, G - offTop)); tKind = 'SHARE'; }
      else if (shape === 'VERSUS') { tNow = Math.max(Math.round(num(deal.guarantee, 0)), Math.round(clamp(num(deal.pct, 0), 0, 1) * Math.max(0, G - offTop))); tKind = 'GUARANTEE'; }
      else { tNow = Math.max(0, Math.round(num(deal.guarantee, 0))); tKind = 'GUARANTEE'; }
    }
    tDeal = tNow;
    if (ts && night.dispute && night.dispute.settled && typeof night.dispute.pay === 'number') tNow = Math.max(0, Math.round(night.dispute.pay));
    if (ts && tNow > 0) { s = add(tKind, ts.bandId, tNow); s.disputed = !!(night.dispute && !night.dispute.answered); }
    /* 3. the locals' agreed money */
    for (i = 0; i < slots.length; i++) {
      s = slots[i]; if (s.role === 'TOURING') continue;
      if (s.pay === 'SHARE') { shareLocals.push(s.bandId); continue; }
      if ((s.pay === 'FLAT' || s.pay === 'GAS') && num(s.fee, 0) > 0) { locals.push(add('LOCAL', s.bandId, s.fee)); localSum += Math.round(s.fee); }
    }
    owed = offTop + tNow + localSum;
    gap = Math.max(0, owed - G);
    /* the shortfall ladder */
    hs01 = (hostSoFar(state, show) + 1) / 2;
    if (gap > 0) {
      share = S.ASK_LESS.share[0] + (S.ASK_LESS.share[1] - S.ASK_LESS.share[0]) * hs01;
      trust = Math.round(S.ASK_LESS.trust[0] + (S.ASK_LESS.trust[1] - S.ASK_LESS.trust[0]) * hs01);
      hatAmt = out.q >= S.HAT.minQ && !night.hatPassed ? Math.round(num(night.hatPer, S.HAT.perHead[0]) * out.heads) : 0;
      why = SB.text.label('refuse.INVALID');
      [['POCKET', gap, has('Money', 'canCover') ? SB.Money.canCover(state, gap) : true, [{ k: 'MONEY', v: -gap, who: null }, { k: 'STRESS', v: S.POCKET.stress, who: null }, { k: 'WORD', v: S.POCKET.word, who: null }]],
       ['ASK_LESS', Math.min(tNow, Math.round(share * gap)), !!ts && tNow > 0, [{ k: 'TRUST', v: trust, who: ts ? bandName(state, ts.bandId) : null }, { k: 'WORD', v: S.ASK_LESS.word, who: null }]],
       ['LOCALS_GIVE', Math.min(gap, localSum), localSum > 0, [{ k: 'TRUST', v: S.LOCALS_GIVE.localTrust, who: null }]],
       ['HAT', Math.min(gap, hatAmt), hatAmt > 0, [{ k: 'MONEY', v: [Math.round(S.HAT.perHead[0] * out.heads), Math.round(S.HAT.perHead[1] * out.heads)], who: null }]],
       ['SHORT_SILENT', gap, true, [{ k: 'TRUST', v: S.SHORT_SILENT.trust, who: ts ? bandName(state, ts.bandId) : null }, { k: 'WORD', v: S.SHORT_SILENT.word, who: null }]],
       ['OFF_RENT', Math.min(gap, room.kind === 'CLUB' ? 0 : rentDue), rentDue > 0 && room.kind !== 'CLUB', [{ k: 'REL', v: S.OFF_RENT.ownerRel, who: personName(state, room.ownerId) }]]
      ].forEach(function (o) {
        shortfall.push({ k: o[0], label: SB.text.label('shortfall.' + o[0] + '.name'), covers: Math.max(0, o[1]), costs: o[3], enabled: !!o[2] && o[1] > 0, why: o[2] && o[1] > 0 ? null : why });
      });
      if (!sf || !E.SHORTFALL[sf]) sf = shortfall[0].enabled ? 'POCKET' : 'SHORT_SILENT';
      if (!shortfall.filter(function (o) { return o.k === sf; })[0].enabled) sf = shortfall[0].enabled ? 'POCKET' : 'SHORT_SILENT';
      cover = shortfall.filter(function (o) { return o.k === sf; })[0].covers;
      if (sf === 'ASK_LESS') { lines.forEach(function (l) { if (ts && l.toId === ts.bandId && l.amount >= cover) { l.amount -= cover; l.agreed = false; } }); tNow -= cover; }
      else if (sf === 'LOCALS_GIVE') { x = cover; locals.forEach(function (l) { var t = Math.min(l.amount, x); l.amount -= t; x -= t; l.agreed = false; }); localSum -= cover; }
      else if (sf === 'HAT') G += hatAmt;
      else if (sf === 'OFF_RENT') { lines.forEach(function (l) { if (l.k === 'ROOM') { l.amount -= cover; l.agreed = false; } }); offTop -= cover; }
      owed = offTop + tNow + localSum;
      unpaid = Math.max(0, owed - G);
      if (unpaid > 0 && sf !== 'SHORT_SILENT' && (!has('Money', 'canCover') || SB.Money.canCover(state, unpaid))) { pocket = unpaid; unpaid = 0; }
      short = unpaid > 0;
    }
    /* what each line really gets, in order */
    avail = G + pocket;
    lines.forEach(function (l) { pay = Math.min(l.amount, Math.max(0, avail)); l.paid = pay; avail -= pay; });
    left = Math.max(0, G - owed);
    /* 4. what is left */
    fixed = !ts || shape !== 'GUARANTEE';
    /* a settled dispute fixed the whole of what the touring band is paid, the plus share included */
    if (ts && shape === 'GUARANTEE_PLUS' && !(night.dispute && night.dispute.settled)) tFix = Math.floor(C.PLUS_SHARE * left);
    if (!fixed) custom = [Math.floor(left * sc[0]), slots.length > 1 ? Math.floor(left * sc[1]) : 0, 0];
    else if (!ts && slots.length) custom = [0, Math.floor(left * sc[1] / (sc[1] + sc[2])), 0];
    else custom = [tFix, shareLocals.length ? Math.floor((left - tFix) * sc[1]) : 0, 0];
    custom[2] = left - custom[0] - custom[1];
    keepMax = left - tFix;
    /* Until the player says otherwise the lines hold only what was agreed: everything else that is left is theirs to keep or to give. */
    keep = choice && typeof choice.keep === 'number' ? clamp(Math.round(choice.keep), 0, keepMax) : keepMax;
    give = keepMax - keep;
    if (give > 0) {
      x = slots.length - (ts ? 1 : 0);                      // local bands
      if (ts && !fixed && x > 0) { tGive = Math.floor(give * sc[0] / (sc[0] + sc[1])); lGive = give - tGive; }
      else if (x > 0 && (fixed || !ts)) lGive = give;
      else if (ts) tGive = give;
      else keep += give;
    }
    if (choice && keep > 0) {
      gas = ts ? clamp(Math.round(num(choice.gas, 0)), 0, keep) : 0; keep -= gas;
      extra = (slots.length - (ts ? 1 : 0)) > 0 ? clamp(Math.round(num(choice.extraToLocals, 0)), 0, keep) : 0; keep -= extra;
    }
    if (ts && tFix + tGive + gas > 0) add('SHARE', ts.bandId, tFix + tGive + gas, tFix > 0).paid = tFix + tGive + gas;
    /* every share line says whose it is: a local's cut used to read "the touring band's share" too */
    function shareOf(id) { var bd = state.bands && state.bands[id]; return bd && bd.name ? SB.text.label('settle.SHARE_OF', { band: bd.name }) : null; }
    x = lGive + extra;
    if (x > 0) {
      b = shareLocals.length ? shareLocals : slots.filter(function (q) { return q.role !== 'TOURING'; }).map(function (q) { return q.bandId; });
      b.forEach(function (id, j) { var part = Math.floor(x / b.length) + (j < x % b.length ? 1 : 0); if (part > 0) { var sl = add('SHARE', id, part, false); sl.paid = part; sl.label = shareOf(id) || sl.label; } });
    }
    costs = spentOn(state, show, ['PRINT', 'PROMO', 'FOOD', 'HELPER', 'FLYER', 'MOTEL']);
    costs.forEach(function (c) { costSum += c.amount; });
    /* event insurance, bought when the date confirmed, and the damages of a serious incident: the insurance pays them, or you do */
    ins = spentOn(state, show, ['INSURANCE']).reduce(function (a, c) { return a + c.amount; }, 0);
    if (ins > 0) add('INSURANCE', null, ins).paid = 0;
    if (dep > 0) add('DEPOSIT', null, dep).paid = dep;      // back to the player, outside the split: not from the box
    dmg = night.damages && num(night.damages.amount, 0) > 0 ? night.damages : null;
    if (dmg) { x = add('DAMAGES', room.ownerId, dmg.amount); x.paid = 0; x.insured = !!dmg.insured; if (dmg.insured) x.label = SB.text.label('settle.DAMAGES_COVERED'); }
    dmgOwed = dmg && !dmg.insured ? dmg.amount : 0;
    /* what was spent on this show before the night, one line each by name (printing, flyer art, ads, food...): not from the box */
    x = {};
    costs.forEach(function (c) { if (x[c.cat]) x[c.cat].amount += c.amount; else x[c.cat] = { label: c.label, amount: c.amount, cat: c.cat }; });
    Object.keys(x).forEach(function (cat) {
      var l = add('COSTS', null, x[cat].amount);
      l.paid = 0; l.cat = cat;
      l.label = SB.text.has('strings.settle.COSTS_BEFORE') ? SB.text.label('settle.COSTS_BEFORE', { what: x[cat].label }) : x[cat].label;
    });
    add('YOU', null, keep).paid = keep;
    lines.forEach(function (l, j) { l.at = j; });
    lines.sort(function (p, q) { return (SETTLE_ORDER.indexOf(p.k) - SETTLE_ORDER.indexOf(q.k)) || (p.at - q.at); });
    return { out: out, lines: lines, G: G, gross: out.gross, hat: out.hat + (sf === 'HAT' && gap > 0 ? hatAmt : 0), offTop: offTop, owed: owed, gap: gap, left: left,
             custom: custom, keepMax: keepMax, fairMax: Math.floor(C.SPLIT.FAIR_SHARE * left), keep: keep, shortfall: shortfall, chosen: gap > 0 ? sf : null,
             pocket: pocket, unpaid: unpaid, short: short, touringAgreed: ts ? tDeal + tFix : 0,
             touringBand: ts ? ts.bandId : null, fixed: fixed, tFix: tFix, costs: costs, costSum: costSum, playerNet: keep - costSum - pocket - ins - dmgOwed, hatAdded: sf === 'HAT' && gap > 0 ? hatAmt : 0,
             insurance: ins, damages: dmg ? dmg.amount : 0, damagesOwed: dmgOwed, depBack: dep };
  }

  /* the deposit paid for this show and not yet given back */
  function depositHeld(state, show) {
    var led = (state.money && state.money.ledger) || EMPTY, i, t = 0;
    for (i = 0; i < led.length; i++) if (led[i].showId === show.id && led[i].cat === 'DEPOSIT') t -= led[i].amount;
    return Math.max(0, Math.round(t));
  }

  function emptyView() {
    return { door: { paid: 0, price: 0, gross: 0, hat: 0 }, lines: [], gap: 0, shortfall: [], left: 0, split: { custom: [0, 0, 0], keepMax: 0, fairMax: 0 }, dispute: null };
  }

  /* each shortfall answer's outcome, figured as if chosen (figure changes nothing): who gets what, and what you pay */
  function previewShortfall(state, show, f) {
    return f.shortfall.map(function (o) {
      var p, g, sum = function (test) { return p.lines.reduce(function (a, l) { return a + (test(l) ? num(l.paid, 0) : 0); }, 0); };
      o = SB.util.copy(o);
      if (!o.enabled) return o;
      p = figure(state, show, { shortfall: o.k });
      g = function (l) { return !!p.touringBand && l.toId === p.touringBand && (l.k === 'GUARANTEE' || l.k === 'SHARE'); };
      o.preview = { pocket: p.pocket, unpaid: p.unpaid, hat: p.hatAdded, touring: p.touringBand ? sum(g) : null,
                    locals: sum(function (l) { return l.k === 'LOCAL'; }), room: sum(function (l) { return l.k === 'ROOM'; }) };
      return o;
    });
  }

  function settleView(state, showId) {
    var show = showOf(state, showId, 'Night.settleView'), night = show.night, f, door = show.door || {};
    if (!night || !night.demand || !roomOf(state, show)) return emptyView();
    f = figure(state, show, night.shortfall ? { shortfall: night.shortfall } : null);
    return { door: { paid: f.out.paid, price: door.donation ? num(door.suggested, 0) : num(door.price, 0), gross: f.gross, hat: f.hat },
             lines: f.lines.map(function (l) { return { k: l.k, label: l.label, toId: l.toId, amount: l.amount, paid: NOT_FROM_THE_BOX[l.k] ? l.amount : l.paid, agreed: l.agreed, disputed: l.disputed }; }),
             gap: f.gap, shortfall: f.gap > 0 ? previewShortfall(state, show, f) : f.shortfall, left: f.left, split: { custom: f.custom, keepMax: f.keepMax, fairMax: f.fairMax, fixed: f.fixed },
             net: f.playerNet,
             dispute: night.dispute && !night.dispute.answered ? night.dispute.decision : null };
  }

  var LINE_CAT = { ROOM: 'ROOM', SOUND: 'SOUND', SECURITY: 'SECURITY', HOST: 'HOST', GUARANTEE: 'TOURING', LOCAL: 'LOCAL' };
  var NOT_FROM_THE_BOX = { YOU: 1, COSTS: 1, INSURANCE: 1, DAMAGES: 1, DEPOSIT: 1 };   // settle lines the cash box does not pay

  function settle(state, showId, choice) {
    var show = showOf(state, showId, 'Night.settle'), night = show.night, records = [], f, i, l, cat, running, res, ts, S = C.SHORTFALL, slots, acc, tTotal = 0, paidTo = {}, room, b, tr, memo;
    if (show.status === 'CANCELLED' || show.status === 'PLAYED') return SB.util.yes({ records: [] });
    if (!night || !night.ended) return SB.util.no(E.REFUSE.STOP_PENDING, SB.text.label('refuse.STOP_PENDING'));
    if (night.dispute && !night.dispute.answered) return SB.util.no(E.REFUSE.STOP_PENDING, SB.text.label('refuse.STOP_PENDING'));
    choice = choice || {};
    if (!choice.shortfall && night.shortfall) choice = { shortfall: night.shortfall, keep: choice.keep, extraToLocals: choice.extraToLocals, gas: choice.gas };
    f = figure(state, show, choice); room = roomOf(state, show); ts = touringSlot(show); slots = show.bill.slots;
    memo = room.name || '';
    /* the door comes in */
    if (has('Money', 'earn')) {
      if (f.gross > 0) SB.Money.earn(state, f.gross, show.door && show.door.donation ? 'HAT' : 'DOOR', memo, { showId: showId });
      if (f.hat > 0) SB.Money.earn(state, f.hat, 'HAT', memo, { showId: showId });
      if (f.depBack > 0) SB.Money.earn(state, f.depBack, 'DEPOSIT', memo, { showId: showId });   // the deposit comes back, outside the split
    }
    if (num(night.theft, 0) > 0 && has('Money', 'spend')) SB.Money.spend(state, Math.round(night.theft), 'THEFT', memo, { showId: showId });
    running = f.G;
    /* and goes out, in order */
    for (i = 0; i < f.lines.length; i++) {
      l = f.lines[i];
      if (NOT_FROM_THE_BOX[l.k]) { records.push(rec(show, 'SETTLE_LINE', '', { k: l.k, label: l.label, toId: l.toId || null, amount: l.amount, running: Math.max(0, running) })); continue; }
      cat = LINE_CAT[l.k] || (ts && l.toId === ts.bandId ? 'TOURING' : 'LOCAL');
      if (l.paid > 0 && has('Money', 'spend')) {
        res = SB.Money.spend(state, l.paid, cat, memo, { showId: showId });
        if (res && res.ok === false) { f.short = true; l.paid = 0; }
      }
      running -= l.paid;
      if (l.toId) paidTo[l.toId] = (paidTo[l.toId] || 0) + l.paid;
      records.push(rec(show, 'SETTLE_LINE', '', { k: l.k, label: l.label, toId: l.toId, amount: l.paid, owed: l.amount, running: Math.max(0, running) }));
    }
    /* uninsured damages come out of your own pocket */
    if (f.damagesOwed > 0 && has('Money', 'spend')) SB.Money.spend(state, f.damagesOwed, 'DAMAGES', memo, { showId: showId });
    /* what the choice costs or earns with people */
    if (f.chosen === 'POCKET' || f.pocket > 0) { if (has('Territory', 'adjustWord') && f.chosen === 'POCKET') push(records, [SB.Territory.adjustWord(state, S.POCKET.word, 'POCKET')]); }
    if (f.chosen === 'ASK_LESS' && ts) {
      push(records, [SB.Bands.addTrust(state, ts.bandId, 'ASKED_TO_GIVE', { showId: showId, scale: 0.5 })]);
      if (has('Territory', 'adjustWord')) push(records, [SB.Territory.adjustWord(state, S.ASK_LESS.word, 'ASK_LESS')]);
    }
    if (f.chosen === 'LOCALS_GIVE') slots.forEach(function (s) {
      if (s.role === 'TOURING' || !(s.fee > 0)) return;
      tr = has('Bands', 'trust') ? num((SB.Bands.trust(state, s.bandId) || {}).value, 0) : 0;
      if (tr < S.LOCALS_GIVE.offerFreeAt) push(records, [SB.Bands.addTrust(state, s.bandId, 'ASKED_TO_GIVE', { showId: showId, scale: 0.5 })]);
    });
    if (f.chosen === 'SHORT_SILENT' && has('Territory', 'adjustWord')) push(records, [SB.Territory.adjustWord(state, S.SHORT_SILENT.word, 'SHORT_SILENT')]);
    if (f.chosen === 'OFF_RENT' && has('Rooms', 'adjustRel')) push(records, [SB.Rooms.adjustRel(state, room.id, S.OFF_RENT.ownerRel, 'OFF_RENT')]);
    if (f.hatAdded > 0) night.hatPassed = true;
    /* the split of what was left (only where the deal fixed no share of it) */
    night.splitTrust = 0;
    /* only a keep the player chose is judged: a shortfall answer leaves what the hat raised past the gap with them */
    if (f.left > 0 && !f.fixed && typeof choice.keep === 'number') {
      if (f.keep === 0) {
        slots.forEach(function (s) { push(records, [SB.Bands.addTrust(state, s.bandId, 'GAVE_ALL', { showId: showId })]); });
        if (has('Territory', 'adjustWord')) push(records, [SB.Territory.adjustWord(state, C.SPLIT.takeNothing.word, 'GAVE_ALL')]);
        night.splitTrust = C.SPLIT.takeNothing.trust;
      } else if (f.keep > C.SPLIT.FAIR_SHARE * f.left) {
        slots.forEach(function (s) { push(records, [SB.Bands.addTrust(state, s.bandId, 'TOOK_TOO_MUCH', { showId: showId })]); });
        if (ts && f.keep > (paidTo[ts.bandId] || 0) && has('Territory', 'adjustWord')) push(records, [SB.Territory.adjustWord(state, C.SPLIT.takeTooMuch.word, 'TOOK_TOO_MUCH')]);
        night.splitTrust = C.SPLIT.takeTooMuch.trust;
      }
    }
    /* the accounts as they came out (the shape of Money.showAccounts) */
    acc = { door: f.G, offTop: [], guarantee: 0, locals: [], left: f.left, touringShare: 0, playerCosts: f.costs.map(function (c) { return { label: c.label, amount: c.amount }; }), player: f.playerNet };
    if (f.insurance > 0) acc.playerCosts.push({ label: SB.text.label('money.INSURANCE'), amount: f.insurance });
    if (f.damagesOwed > 0) acc.playerCosts.push({ label: SB.text.label('money.DAMAGES'), amount: f.damagesOwed });
    f.lines.forEach(function (ln) {
      if (LINE_CAT[ln.k] && ln.k !== 'GUARANTEE' && ln.k !== 'LOCAL') acc.offTop.push({ label: ln.label, amount: ln.paid });
      else if (ts && ln.toId === ts.bandId) { if (ln.k === 'GUARANTEE') acc.guarantee += ln.paid; else acc.touringShare += ln.paid; tTotal += ln.paid; }
      else if (ln.toId && (ln.k === 'LOCAL' || ln.k === 'SHARE')) {
        b = acc.locals.filter(function (q) { return q.bandId === ln.toId; })[0];
        if (b) b.amount += ln.paid; else acc.locals.push({ bandId: ln.toId, amount: ln.paid });
      }
    });
    night.accounts = acc;
    night.settled = { keep: f.keep, playerNet: f.playerNet, pocket: f.pocket, short: f.short || f.unpaid > 0, chosen: f.chosen, door: f.gross, hat: f.hat, paidTo: paidTo,
                      agreed: !f.short && !(f.unpaid > 0) && (!f.chosen || f.chosen === 'POCKET' || f.chosen === 'HAT') };
    records.push(rec(show, 'SETTLE_DONE', '', { playerNet: f.playerNet, fund: num(state.money && state.money.fund, 0), bank: state.money ? state.money.bank : null }));
    push(records, finish(state, showId));
    log(state, records);
    return SB.util.yes({ records: records });
  }

  function auto(state, showId, policy) {
    var show = showOf(state, showId, 'Night.auto'), records = [], step, guard = 0, dec, opt, i, view, keep, sf, res;
    policy = policy || {};
    if (show.status !== 'CONFIRMED') return { records: records };
    step = show.night && show.night.demand && show.night.at ? { records: [], stop: show.night.at } : begin(state, showId);
    push(records, step.records);
    while (step.stop && step.stop.kind === 'DECISION' && guard++ < 24) {
      dec = step.stop.decision; opt = null;
      for (i = 0; i < dec.options.length; i++) if (dec.options[i].enabled !== false) { opt = dec.options[i]; break; }
      if (!opt) opt = dec.options[0];
      if (!opt) SB.fail('Night.auto', 'decision ' + dec.id + ' has no options');
      step = next(state, showId, { decisionId: dec.id, optionId: opt.id });
      push(records, step.records);
    }
    if (policy.untilSettle || show.status !== 'CONFIRMED' || !show.night) return { records: records };
    view = settleView(state, showId);
    /* FAIR: the most the player can keep without anyone minding (everything, where the deal already fixed the shares) */
    keep = policy.settle === 'KEEP_ALL' ? view.split.keepMax : (policy.settle === 'GIVE_ALL' ? 0 : (view.split.fixed ? view.split.keepMax : Math.min(view.split.keepMax, view.split.fairMax)));
    sf = null;
    if (view.gap > 0) { for (i = 0; i < view.shortfall.length; i++) if (view.shortfall[i].enabled) { sf = view.shortfall[i].k; break; } }
    res = settle(state, showId, { shortfall: sf, keep: keep, extraToLocals: 0, gas: 0 });
    push(records, res.records);
    return { records: records };
  }

  /* ---------------- 7.13 how each band was hosted ---------------- */

  /* The booker (config D): the touring band plays second to last, with the big local draw closing, so it plays to the
   * fullest room. 1 there (or alone, or with no local to close); -1 opening a bill of three or more; 0 anywhere else. */
  function touringSlotScore(slots, i) {
    var n = slots.length, locals = 0, k;
    for (k = 0; k < n; k++) if (slots[k].role !== 'TOURING') locals++;
    if (n <= 1 || !locals) return 1;
    if (i === n - 2 && slots[n - 1].role !== 'TOURING') return 1;
    return i === 0 && n >= 3 ? -1 : 0;
  }

  function hostScores(state, show, out) {
    var slots = show.bill.slots, night = show.night || {}, acc = night.accounts, deal = show.deal || {}, scores = {}, detail = {}, n = slots.length, dow = SB.time.dow(show.day);
    var lens = SB.Forecast.lens(state, 'TRUTH', null), wrongDate = false, jobs = state.jobs || {}, i, j, s, b, needs, v, sum, w, k, set, paid, agreed, want, got, a, cnt, t, broken, more;
    (show.jobs || EMPTY).forEach(function (id) { if (jobs[id] && jobs[id].slip === 'WRONG_DATE' && jobs[id].type === 'PRINT') wrongDate = true; });
    broken = (deal.lodging && !(show.crew && show.crew.lodging)) || (deal.meal && !(show.prep && show.prep.food !== null && show.prep.food !== undefined));
    for (i = 0; i < n; i++) {
      s = slots[i]; b = state.bands && state.bands[s.bandId]; if (!b) continue;
      needs = (b.hid && b.hid.needs) || EMPTY; set = out.sets[i] || null; detail[b.id] = {}; more = false;
      if (s.role === 'TOURING') { agreed = Math.max(0, num(deal.guarantee, 0)); paid = acc ? acc.guarantee + acc.touringShare : agreed; more = acc ? acc.touringShare > 0 && deal.shape === 'GUARANTEE' : false; }
      else { agreed = Math.max(0, num(s.fee, 0)); paid = agreed; if (acc) { paid = 0; acc.locals.forEach(function (x) { if (x.bandId === b.id) paid += x.amount; }); more = paid > agreed * 1.1 + 5; } }
      want = s.askId && state.asks && state.asks[s.askId] && state.asks[s.askId].payload ? state.asks[s.askId].payload.wantSlot : null;
      got = i === 0 && n > 1 ? 'OPEN' : (i === n - 1 ? 'CLOSE' : 'MIDDLE');
      t = has('Bands', 'tier') ? num(SB.Bands.tier(state, b, show.zoneId || 'city'), 0) : num(b.tierPublic, 0);
      sum = 0; w = 0;
      for (k = 0; k < needs.length; k++) {
        switch (needs[k]) {
          case 'PAID': v = paid + 0.5 >= agreed ? 1 : (paid >= agreed / 2 ? 0 : -1); break;
          case 'CROWD': v = set ? (set.fill >= 0.3 ? 1 : (set.fill >= 0.2 ? 0 : -1)) : 0; break;
          case 'SLOT': v = want ? (want === got ? 1 : 0) : (t >= 2 && got === 'OPEN' ? -1 : 1); if (s.role === 'TOURING') v = touringSlotScore(slots, i); break;
          case 'SOUND': v = num(out.sound, 0.6) >= 0.6 ? 1 : (num(out.sound, 0.6) >= 0.45 ? 0 : -1); break;
          case 'FLOOR': v = show.crew && show.crew.lodging ? 1 : -1; break;
          case 'MEAL': v = show.prep && show.prep.food !== null && show.prep.food !== undefined ? 1 : -1; break;
          case 'ON_TIME': v = out.run >= 1 ? 1 : (out.run >= C.RUN.over20 ? 0 : -1); break;
          case 'WEEKEND': v = dow === 4 || dow === 5 ? 1 : -1; break;
          case 'ALL_AGES': v = (show.door && show.door.ages) === 'ALL' ? 1 : -1; break;
          case 'BILL':
            a = 0; cnt = 0;
            for (j = 0; j < n; j++) if (j !== i && state.bands[slots[j].bandId]) { a += SB.Model.affinity(state, b.genre, state.bands[slots[j].bandId].genre, 1, lens); cnt++; }
            v = !cnt || a / cnt >= 0.4 ? 1 : (a / cnt >= 0.25 ? 0 : -1); break;
          case 'NAME_RIGHT': v = wrongDate ? -1 : 1; break;
          default: v = 0;
        }
        detail[b.id][needs[k]] = v;
        sum += v * (k === 0 ? 2 : 1); w += k === 0 ? 2 : 1;
      }
      detail[b.id].paid = paid; detail[b.id].agreed = agreed;
      scores[b.id] = Math.round(clamp((w ? sum / w : 0) + (more ? C.HOST_SCORE.paidMore : 0) + (s.role === 'TOURING' && broken ? C.HOST_SCORE.brokenPromise : 0), -1, 1) * 100) / 100;
    }
    return { scores: scores, detail: detail };
  }

  /* ---------------- 5.5 finish ---------------- */

  function verdictOf(q, heads, par) {
    var V = C.VERDICT;
    if (q >= V.WALL.q && heads >= V.WALL.par * par) return 'WALL';
    if (q >= V.TALKED.q && heads >= V.TALKED.par * par) return 'TALKED';
    return q >= V.GOOD.q ? 'GOOD' : (q >= V.HELD.q ? 'HELD' : (q >= V.THIN.q ? 'THIN' : 'ROUGH'));
  }
  function vsParOf(heads, par) {
    var r = heads / Math.max(1, par), c = C.VS_PAR;
    return r < c[0] ? 'WELL_UNDER' : (r < c[1] ? 'UNDER' : (r <= c[2] ? 'ABOUT' : (r <= c[3] ? 'OVER' : 'WAY_OVER')));
  }
  function ofType(list, t) { return list.filter(function (r) { return r && r.t === t; }); }

  function finish(state, showId) {
    var show = showOf(state, showId, 'Night.finish'), night = show.night, P = state.player, out, par, call, heads, verdict, vsPar, beat, host, inside, fb, learnedAll, learned;
    var label, records = [], world = [], r, dName, clean, isClean, settled, result, posts, tier, room, stage0, stage1, i, t, word0, name0, fol0, incs, zone, slots, mem, reg, wr, nr, st;
    if (!night || !night.demand) SB.fail('Night.finish', 'show "' + showId + '" has no night to finish');
    if (!night.ended || !night.outcome) { night.outcome = outcomeNow(state, show); night.ended = true; }
    out = night.outcome; par = night.par = SB.Forecast.par(state, showId); call = night.call; heads = out.heads; room = roomOf(state, show); settled = night.settled || {};
    label = C.LABELS[show.label] || C.LABELS.NORMAL; word0 = num(state.town && state.town.word, 0); name0 = num(P.name, 0); fol0 = num(P.followers, 0);
    /* 1. how it went against what the town expected */
    verdict = verdictOf(out.q, heads, par.heads); vsPar = vsParOf(heads, par.heads);
    beat = clamp(C.BEAT.heads * (heads / Math.max(1, par.heads) - 1) + C.BEAT.q * (out.q - num(par.q, 0)) / C.BEAT.qSpan, -1, 1);
    host = hostScores(state, show, out);
    inside = heads >= call.lo && heads <= call.hi;
    night.final = { outcome: out, verdict: verdict, vsPar: vsPar, beat: beat, hostScores: host.scores, hostDetail: host.detail, par: par, call: call, inside: inside };
    night.finalMods = effMods(show);
    /* 2. feedback, before learning, so that comments see what the player knew */
    fb = has('Feedback', 'build') ? SB.Feedback.build(state, showId) : { ledger: [], comments: [], luck: [], verdictLine: '' };
    /* 3. learning, and the Call's record */
    learnedAll = has('Notebook', 'learnFromShow') ? (SB.Notebook.learnFromShow(state, showId) || []) : [];
    learned = (fb.learned || []).concat(learnedAll.slice(0, LEARNED_MAX));
    if (has('Notebook', 'recordCall')) SB.Notebook.recordCall(state, { showId: showId, lo: call.lo, hi: call.hi, heads: heads, inside: inside, week: SB.time.week(show.day) });
    /* 4. the world */
    if (has('Bands', 'afterShow')) push(world, SB.Bands.afterShow(state, show, out, host.scores));
    if (has('Crowd', 'afterShow')) push(world, SB.Crowd.afterShow(state, show, out, verdict));
    if (has('Rooms', 'afterShow')) push(world, SB.Rooms.afterShow(state, show, out));
    if (has('People', 'afterShow')) push(world, SB.People.afterShow(state, show, out));
    if (has('Territory', 'afterShow')) push(world, SB.Territory.afterShow(state, show, host.scores, true));
    if (has('Harm', 'onBooked')) push(world, SB.Harm.onBooked(state, show));
    /* 5. Name, followers, stress */
    dName = C.NAME_K * beat * clamp(Math.sqrt(heads / C.NAME_SIZE.ref), C.NAME_SIZE.min, C.NAME_SIZE.max) * label.name;
    incs = out.incidents || EMPTY;
    isClean = out.run >= 1 && !incs.length && !settled.short && settled.agreed !== false;
    if (has('Game', 'adjustName')) {
      r = SB.Game.adjustName(state, Math.round(dName * 100) / 100, 'BEAT', { showId: showId, beat: Math.round(beat * 100) / 100 });
      if (r) { r.showId = showId; if (r.beat === null || r.beat === undefined) r.beat = Math.round(beat * 100) / 100; world.push(r); }
      clean = C.NAME_CLEAN.d * Math.max(0, 1 - num(P.name, 0) / C.NAME_CLEAN.until) * label.name;
      if (isClean && clean > 0) { r = SB.Game.adjustName(state, Math.round(clean * 100) / 100, 'CLEAN', { showId: showId }); if (r) { r.showId = showId; world.push(r); } }
    }
    if (has('Game', 'adjustFollowers')) SB.Game.adjustFollowers(state, Math.round(out.posts * C.POST.followersPerPost), 'POSTS');
    if (has('Stress', 'add')) {
      st = C.STRESS;
      SB.Stress.add(state, st.UP.RAN_SHOW, 'RAN_SHOW');
      if (state.week && state.week.shifts && state.week.shifts[SB.time.dow(show.day)] && (state.week.dropped || EMPTY).indexOf(SB.time.dow(show.day)) < 0 && state.settings && state.settings.bills) SB.Stress.add(state, st.UP.AFTER_SHIFT, 'AFTER_SHIFT');
      if (verdict === 'ROUGH') SB.Stress.add(state, st.UP.DUD, 'DUD');
      if (verdict === 'TALKED' || verdict === 'WALL') SB.Stress.add(state, st.DOWN.GREAT_NIGHT, 'GREAT_NIGHT');
      for (i = 0; i < incs.length; i++) SB.Stress.add(state, Math.round(st.UP.INCIDENT[0] + (st.UP.INCIDENT[1] - st.UP.INCIDENT[0]) * clamp(Math.abs(num(incs[i].q, 0)) / 20, 0, 1)), 'INCIDENT');
      if (num(settled.pocket, 0) > 0) SB.Stress.add(state, st.UP.COVERED, 'COVERED');
      if (show.crew && show.crew.lodging === 'player') SB.Stress.add(state, st.UP.HOUSEGUEST, 'HOUSEGUEST');
    }
    /* the result, as it is kept */
    tier = verdict === 'WALL' ? 'TALKED' : verdict; slots = show.bill.slots; zone = state.zones[show.zoneId];
    posts = [];
    t = { n: heads, room: room ? room.name : '', roomShort: room ? String(room.name).replace(/^the /i, '') : '', dow: SB.time.fmt(show.day, 'dow'), dowLower: SB.time.fmt(show.day, 'dow').toLowerCase(), par: par.heads };
    for (i = 0; i < 2 && out.posts > i; i++) { r = line(state, 'feedback.posts.tier.' + tier, t); if (r && posts.indexOf(r) < 0) posts.push(r); }
    if (fb.causes && fb.causes.length && out.posts > 2) { r = line(state, 'feedback.posts.cause.' + fb.causes[0].cause + '.' + (fb.causes[0].d > 0 ? 'UP' : 'DOWN'), t); if (r) posts.push(r); }
    result = {
      heads: heads, paid: out.paid, comps: out.comps, turnedAway: out.turnedAway, byGen: out.byGen.slice(), byZone: SB.util.copy(night.demand.byZone || {}),
      byReason: SB.util.copy(night.demand.byReason || {}), sets: SB.util.copy(out.sets), q: out.q, run: out.run, verdict: verdict, vsPar: vsPar,
      par: { heads: par.heads, q: par.q, byGen: (par.byGen || EMPTY).slice() }, call: { lo: call.lo, hi: call.hi, mid: call.mid, unknowns: SB.util.copy(call.unknowns || []), inside: inside },
      beat: Math.round(beat * 100) / 100, door: { gross: out.gross, hat: num(settled.hat, out.hat), price: show.door ? num(show.door.price, 0) : 0, leak: out.leak },
      accounts: night.accounts || (has('Money', 'showAccounts') ? SB.Money.showAccounts(state, showId) : null), playerNet: num(settled.playerNet, 0),
      luck: fb.luck || [], incidents: incs.map(function (x) { return { kind: x.kind, text: line(state, 'feedback.incident.' + x.kind, {}), q: x.q }; }),
      choices: night.choices.slice(), ledger: fb.ledger || [], comments: fb.comments || [], learned: learned, verdictLine: fb.verdictLine || '',
      posts: { count: out.posts, lines: posts }, hostScores: host.scores, regulars: { won: 0, lost: 0 }, name: { from: name0, to: name0 }, word: { from: word0, to: word0 },
      followers: { from: fol0, to: num(P.followers, fol0) }, memory: { score: 0, wall: false, story: null }, thanked: null, demand: night.demand,
      causes: (fb.causes || []).filter(function (x) { return Math.abs(x.d) >= 0.5; }).slice(0, 14).map(function (x) { return { cause: x.cause, d: x.d, hidden: x.hidden, ctx: x.ctx }; })
    };
    /* 6. memory and stages */
    stage0 = num(P.stage, 1);
    if (has('Legacy', 'afterShow')) push(world, SB.Legacy.afterShow(state, show, result));
    stage1 = has('Legacy', 'stage') ? num(SB.Legacy.stage(state), stage0) : stage0;
    if (stage1 > stage0 && !ofType(world, 'STAGE').length) {
      st = SB.Content.legacy && SB.Content.legacy.stage && SB.Content.legacy.stage[stage1];
      world.push(rec(show, 'STAGE', SB.text.off || !st || !st.line ? '' : SB.text.render(st.line, {}, null), { stage: stage1, opens: SB.text.off || !st || !st.opens ? [] : st.opens.slice() }));
    }
    mem = ofType(world, 'MEMORY')[0]; reg = ofType(world, 'REGULARS')[0]; wr = ofType(world, 'WORD'); nr = ofType(world, 'NAME');
    if (mem) result.memory = { score: num(mem.score, 0), wall: !!mem.wall, story: mem.story || null };
    if (reg) result.regulars = { won: num(reg.won, 0), lost: num(reg.lost, 0) };
    result.word = { from: word0, to: num(state.town && state.town.word, word0) };
    result.name = { from: name0, to: num(P.name, name0) };
    /* 7. the show is played */
    show.status = 'PLAYED'; show.result = result; show.night = null;
    P.showsPlayed = num(P.showsPlayed, 0) + 1; P.lastShowWeek = SB.time.week(show.day);
    if (state.week && state.week.shows && state.week.shows.indexOf(showId) < 0) state.week.shows.push(showId);
    if (has('Jobs', 'ensure')) SB.Jobs.ensure(state, showId);
    /* the records, in the order of 5.5 */
    records.push(rec(show, 'SHOW_RESULT', result.verdictLine, { heads: heads, byGen: out.byGen.slice(), paid: out.paid, comps: out.comps, par: par.heads,
                     call: { lo: call.lo, hi: call.hi, mid: call.mid }, inside: inside, q: out.q, verdict: verdict, vsPar: vsPar, door: out.gross + num(settled.hat, out.hat),
                     playerNet: result.playerNet, posts: out.posts }));
    records.push(rec(show, 'LEDGER', '', { rows: result.ledger }));
    result.luck.forEach(function (l) { records.push(rec(show, 'LUCK', l.text || '', { k: l.k, d: l.d })); });
    result.comments.forEach(function (c) { records.push(rec(show, 'COMMENT', c.text || '', { comment: c })); });
    learned.forEach(function (l) { records.push(rec(show, 'LEARNED', l.text || '', { learned: l })); });
    world.sort(function (a, b) { var x = ORDER.indexOf(a.t), y = ORDER.indexOf(b.t); return (x < 0 ? 99 : x) - (y < 0 ? 99 : y); });   // Array.sort is stable
    push(records, world);
    /* the story after a settle: the small counters, the guided first show, then the chapters and the patches (09a-build-contract) */
    if (has('Patches', 'afterShow')) SB.Patches.afterShow(state, show, result, settled);
    if (has('Tutorial', 'notify')) SB.Tutorial.notify(state, 'SETTLE', { showId: showId });
    var queued0 = state.story && Array.isArray(state.story.cutscenes) ? state.story.cutscenes.length : 0;
    if (has('Chapters', 'check')) SB.Chapters.check(state);
    if (has('Moments', 'afterShow')) SB.Moments.afterShow(state, show, queued0);   // a short scene from the night, or a milestone
    if (has('Patches', 'check')) SB.Patches.check(state);
    return records;
  }

  /* ---------------- other bookers' shows ---------------- */

  function asShow(state, os) {
    var room = os && os.roomId && state.rooms ? state.rooms[os.roomId] : null, slots = [], ids = [], i, b, booker, k, show, p, rk, t, doors = 1140;
    if (!room) return null;
    for (i = 0; i < (os.bands || EMPTY).length && slots.length < 5; i++) {
      b = state.bands && state.bands[os.bands[i]]; if (!b) continue;
      slots.push({ bandId: b.id, role: b.local ? 'LOCAL' : 'TOURING', minutes: C.SET.def, pay: 'FREE', fee: 0, askId: null, confirmed: true }); ids.push(b.id);
    }
    if (!slots.length) return null;
    show = { id: os.id, status: 'CONFIRMED', requestId: null, origin: null, day: os.day, slot: os.slot || 'EVENING', roomId: room.id, zoneId: os.zoneId || room.zoneId,
             label: 'NORMAL', tags: [], benefitFor: null, deal: { shape: 'DOOR' }, bill: { slots: slots, billing: ids, locked: true, lockedDay: os.day - 28, doors: doors, times: null, ends: null },
             door: { price: num(os.price, 0), donation: false, suggested: null, ages: os.ages || (room.ages && room.ages[0]) || 'ALL', comps: null, sheet: false,
                     address: CH.ADDRESS.kinds.indexOf(room.kind) >= 0 ? C.USUAL.address : null },
             crew: { sound: null, security: null, floor: null, lodging: null }, promo: null,
             prep: { advance: os.day - 10, gear: os.day - 10, neighbors: os.day - 1, dayBefore: os.day - 1, food: null, rules: true, lodging: null }, mods: {}, jobs: [], night: null, result: null };
    t = doors + C.SET.doorsLead; show.bill.times = [];
    for (i = 0; i < slots.length; i++) { show.bill.times.push(t); t += C.SET.def + C.SET.changeover; }
    show.bill.ends = t - C.SET.changeover;
    booker = state.bookers && state.bookers[os.bookerId];
    k = clamp(num(booker && booker.style && booker.style.promotes, C.PAR.promotes) / C.PAR.promotes, 0.5, 1.3);
    p = SB.Forecast.usual(state, show);
    if (p.flyer) p.flyer.quality = Math.round(p.flyer.quality * k * 100) / 100;
    rk = Object.keys(p.runs || {});
    for (i = 0; i < rk.length; i++) p.runs[rk[i]].effect = Math.round(k * 100) / 100;
    p.mail = null; p.invites = [];
    show.promo = p;
    return show;
  }

  function resolveOther(state, os) {
    if (!os || typeof os !== 'object' || !os.id) SB.fail('Night.resolveOther', 'an OtherShow is needed');
    var show, booker = state.bookers && state.bookers[os.bookerId], r, lens, res, hs, base, g = C.CITY.GENS;
    if (typeof os.heads === 'number' && typeof os.q === 'number') {
      return { heads: os.heads, q: os.q, byGen: os.byGen ? os.byGen.slice() : [Math.round(os.heads * g[0]), Math.round(os.heads * g[1]), Math.round(os.heads * g[2])], hostScore: num(os.hostScore, 0) };
    }
    r = SB.rng.stream(state, 'show:' + os.id);
    hs = Math.round(clamp(2 * num(booker && booker.style && booker.style.pays, 0.7) - 1 + r.range(-0.3, 0.3), -1, 1) * 100) / 100;
    show = asShow(state, os);
    if (!show) {                                            // a big night in a peer city, or a bill nobody here knows
      base = Math.round((os.tier > 0 ? C.TIERS[Math.min(4, os.tier) - 1] * 1.5 : 8) * (0.85 + 0.3 * r.next()));
      return { heads: base, q: 60, byGen: [Math.round(base * g[0]), Math.round(base * g[1]), Math.round(base * g[2])], hostScore: hs };
    }
    /* SPEC?: the model counts the player's followers and regulars; for another booker their standing stands in (24 followers a point of name, no regulars of the player's). */
    lens = SB.Forecast.lens(state, 'TRUTH', { soundSkill: 0.6, noRegulars: true, invites: false, noLeak: true, followers: Math.round(num(booker && booker.name, 20) * 24) });
    res = SB.Model.resolve(state, show, lens, {});
    return { heads: res.night.heads, q: res.night.q, byGen: res.night.byGen.slice(), hostScore: hs };
  }

  return { begin: begin, next: next, settleView: settleView, settle: settle, auto: auto, finish: finish, resolveOther: resolveOther, asShow: asShow };
});
