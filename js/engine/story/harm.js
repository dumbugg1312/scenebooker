/* Scene Booker — engine/story/harm.js
 * SB.Harm: people who do harm, in proportion. One matter at a time, none before week NOT_BEFORE_WEEK, at least GAP_MIN
 * weeks apart; text only from SB.Content.people.harm, never a detail; the private list ("Not booking"); a listed
 * person flags every band they are in. Owner: E4. Spec: 02-engine 4b and 7.19; mechanics 14; story 8. Stream: HARM.
 */
SB.module('Harm', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, H = C.HARM, U = SB.util;
  var HELPER_ROLES = ['RUNNER', 'ARTIST', 'FLOOR', 'LODGING'];

  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }
  function nowHalf(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function rng(state) { return SB.rng.stream(state, E.STREAM.HARM); }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }

  function harm(state) {
    var h = state.harm = state.harm || {};
    if (h.open === undefined) h.open = null;
    if (h.lastWeek === undefined) h.lastWeek = null;
    if (h.nextWeek === undefined) h.nextWeek = H.NOT_BEFORE_WEEK;
    if (!Array.isArray(h.closed)) h.closed = [];
    if (!Array.isArray(h.after)) h.after = [];      // what follows, by week: { kind, personId, bandId, week }
    if (!h.wrong || typeof h.wrong !== 'object') h.wrong = {};   // personId -> true once the band has said the listing was wrong
    return h;
  }

  function person(state, id, where) {
    var p = typeof id === 'string' && state.people ? state.people[id] : null;
    if (!p) SB.fail(where, 'unknown person "' + id + '"');
    return p;
  }
  function pname(p) { return p ? [p.first, p.last].filter(Boolean).join(' ') : ''; }
  function bname(state, id) { var b = id && state.bands ? state.bands[id] : null; return b ? b.name : ''; }
  function active(p) { return p && (!p.state || p.state === 'ACTIVE'); }

  function rec(state, t, showId, text, extra) {
    var r = { t: t, day: today(state), half: nowHalf(state), showId: showId || null, text: text || '' }, k;
    if (extra) for (k in extra) r[k] = extra[k];
    return r;
  }

  function slots(state, o) {
    var p = o.personId && state.people ? state.people[o.personId] : null, t = o.tellerId && state.people ? state.people[o.tellerId] : null;
    return { person: pname(p), band: bname(state, o.bandId), teller: t ? t.first : '', they: 'they', them: 'them', their: 'their',
             instrument: o.instrument || '', newMember: o.newMember || '', member: o.member || '',
             condition: o.condition || '', floor: o.floor || '' };
  }

  /* Text only from people.harm. A path with no line falls back as listed, then to ''. */
  function say(state, paths, sl) {
    var i;
    if (SB.text.off) return '';
    for (i = 0; i < paths.length; i++) if (SB.text.has(paths[i])) return SB.text.line(paths[i], sl, textRng(state));
    return '';
  }

  function message(state, fromId, body, refs) {
    var p = fromId && state.people ? state.people[fromId] : null;
    var id = SB.Mail.post(state, { kind: E.MSG.HARM, fromId: fromId || null, fromName: pname(p), subject: '', body: body,
                                   needs: false, refs: { requestId: null, showId: null, askId: null, bandId: (refs && refs.bandId) || null, offerId: null }, keep: false });
    return rec(state, E.REC.MESSAGE, null, body, { messageId: id, kind: E.MSG.HARM, fromName: pname(p), needs: false });
  }

  function liveShowsWith(state, bandId) {
    return Object.keys(state.shows || {}).map(function (id) { return state.shows[id]; }).filter(function (s) {
      return s && (s.status === E.SHOW.DRAFT || s.status === E.SHOW.CONFIRMED) &&
             (s.bill && s.bill.slots || []).some(function (x) { return x.bandId === bandId; });
    }).sort(function (a, b) { return a.day - b.day; });
  }

  function memberOf(state, bandId, personId) {
    var b = state.bands && state.bands[bandId];
    return b ? (b.members || []).filter(function (m) { return m.personId === personId; })[0] || null : null;
  }

  /* ---------------- the open matter, as the player sees it ---------------- */

  function optionLabel(state, k, sl) {
    return say(state, ['people.harm.options.' + k], sl) || SB.text.label('harmAct.' + k + '.name');
  }

  function options(state) {
    var h = harm(state), o = h.open, p = o ? state.people[o.personId] : null, sl = o ? slots(state, o) : {}, out = [];
    if (!o) return out;
    E.HARM_ACT && Object.keys(E.HARM_ACT).forEach(function (k) {
      var en = true, why = null, costs = [];
      if (k === 'ASK_AROUND') {
        en = o.asks < H.ASKS; costs.push({ k: 'HOURS', v: -1, who: null });
        if (o.asks >= 1 && o.tellerId) costs.push({ k: 'REL', v: H.ASK_TWICE_REL, who: sl.teller || null });
        if (!en) why = SB.text.label('refuse.TOO_MANY');
      } else if (k === 'LIST') {
        en = !(p && p.listed);
        if (o.bandId) costs.push({ k: 'TRUST', v: H.NOT_BOOK.trust - SB.Bands.trust(state, o.bandId).value, who: sl.band || null });
        if (!en) why = SB.text.label('refuse.ALREADY');
      } else if (k === 'QUIET_WORD') {
        en = !o.wordSent && !!o.bandId && !!memberOf(state, o.bandId, o.personId);
        costs.push({ k: 'HOURS', v: -1, who: null });
        if (!en) why = SB.text.label(o.wordSent ? 'refuse.ALREADY' : 'refuse.INVALID');
      } else if (k === 'PULL_SHOW') {
        en = !!o.bandId && liveShowsWith(state, o.bandId).length > 0;
        costs.push({ k: 'RISK', v: 1, who: null });
        if (!en) why = SB.text.label('refuse.INVALID');
      } else if (k === 'LEAVE') {
        en = o.left === null || o.left === undefined;
        if (!en) why = SB.text.label('refuse.ALREADY');
      }
      out.push({ k: k, label: optionLabel(state, k, sl), costs: costs, enabled: en, why: why });
    });
    return out;
  }

  function current(state) {
    var h = harm(state), o = h.open, sl;
    if (!o) return null;
    sl = slots(state, o);
    return {
      personName: sl.person, bandName: sl.band, weightText: say(state, ['people.harm.weight.' + o.weight], sl),
      // SPEC?: 03-content 9.1 has no word for a source; strings.harmSource.<SOURCE> is used when C1 adds it.
      sourceText: SB.text.has('strings.harmSource.' + o.source) ? SB.text.label('harmSource.' + o.source) : '',
      tellerName: sl.teller, week: o.week, asksLeft: Math.max(0, H.ASKS - o.asks), options: options(state)
    };
  }

  function decision(state) {
    var h = harm(state), o = h.open, sl = slots(state, o);
    return {
      id: U.newId(state, 'd'), kind: E.DECISION.HARM, eventId: null, showId: null, day: today(state), half: 'DAY', at: null, tier: null,
      title: say(state, ['people.harm.weight.' + o.weight], sl), body: o.text || '',
      options: options(state).map(function (x) {
        return { id: x.k, label: x.label, likely: SB.text.has('strings.harmAct.' + x.k + '.says') ? SB.text.label('harmAct.' + x.k + '.says') : '',
                 costs: x.costs, enabled: x.enabled, why: x.why };
      })
    };
  }

  /* ---------------- closing and what follows ---------------- */

  function close(state, outcome) {
    var h = harm(state), o = h.open, r = rng(state), w = week(state), p;
    if (!o) return;
    p = state.people[o.personId];
    h.closed.push({ personId: o.personId, week: w, outcome: outcome, weight: o.weight });
    if (p && p.listed) p.listed.weight = o.weight;
    if (o.hid && o.hid.founded && !h.after.some(function (a) { return a.personId === o.personId && a.kind === o.hid.after; })) {
      if (o.hid.after === 'LEAVES') h.after.push({ kind: 'LEAVES', personId: o.personId, week: w + r.int(4, 12) });
      else if (o.hid.after === 'NEW_BAND') h.after.push({ kind: 'NEW_BAND', personId: o.personId, week: w + r.int(H.NEW_BAND_WEEKS[0], H.NEW_BAND_WEEKS[1]) });
      else if (o.hid.after === 'DOES_THE_WORK') h.after.push({ kind: 'DOES_THE_WORK', personId: o.personId, week: w + 104 });
    }
    h.open = null;
    h.nextWeek = w + H.GAP_MIN;
  }

  function part(state, bandId, personId) {
    var b = state.bands && state.bands[bandId], out = [], z, w = week(state), mul = 1 + H.BAND_RECOVERY.draw;
    if (!b || !memberOf(state, bandId, personId)) return out;
    out = out.concat(SB.Bands.removeMember(state, bandId, personId, 'PARTED') || []);
    // SPEC?: neither the trust floor nor the draw cut has a Bands function; the parting writes them, and the draw comes
    // back after drawWeeks.
    if (b.trust) b.trust.base = Math.max(b.trust.base || 0, H.BAND_RECOVERY.trustFloor);
    if (b.hid && b.hid.draw) { for (z in b.hid.draw) b.hid.draw[z] *= mul; harm(state).after.push({ kind: 'DRAW_BACK', bandId: bandId, week: w + H.BAND_RECOVERY.drawWeeks, mul: mul }); }
    return out;
  }

  function after(state, a) {
    var p = a.personId && state.people ? state.people[a.personId] : null, out = [], id, t, b, z, h = harm(state);
    switch (a.kind) {
      case 'LEAVES':
        if (!active(p)) break;
        (p.bands || []).slice().forEach(function (bid) { out = out.concat(SB.Bands.removeMember(state, bid, p.id, 'MOVED') || []); });
        p.state = E.PERSON_STATE.LEFT_TOWN;
        out.push(rec(state, E.REC.NEWS, null, say(state, ['people.news.PERSON_LEFT'], { person: pname(p) }), { k: 'PERSON_LEFT', refs: { personId: p.id } }));
        break;
      case 'NEW_BAND':
        if (!active(p)) break;
        id = SB.WorldGen.band(state, { memberIds: [p.id], zoneId: p.zoneId || 'city', stage: 'FORMING' });
        t = p.listed ? say(state, ['people.gossip.LISTED_NEW_BAND', 'people.news.BAND_FORMED'], { person: pname(p), band: bname(state, id), members: pname(p) })
                     : say(state, ['people.news.BAND_FORMED'], { band: bname(state, id), members: pname(p) });
        out.push(rec(state, E.REC.NEWS, null, t, { k: 'BAND_FORMED', refs: { bandId: id, personId: p.id } }));
        break;
      case 'DOES_THE_WORK':
        if (!active(p)) break;
        t = Object.keys(state.people || {}).filter(function (pid) { var q = state.people[pid]; return pid !== p.id && active(q) && (q.rel || 0) >= C.TRUST_STAGES[2]; })[0];
        if (!t) break;
        if (p.listed) p.listed.weight = Math.max(1, (p.listed.weight || 1) - 1);
        out.push(message(state, t, say(state, ['people.harm.work'], { teller: state.people[t].first, person: pname(p), they: 'they', them: 'them', their: 'their' }), null));
        break;
      case 'WRONG':
        if (!p || !p.listed) break;
        b = (p.listed.from || []).filter(function (bid) { return state.bands && state.bands[bid]; })[0] || null;
        if (!b) break;
        out.push(SB.Bands.addTrust(state, b, 'LISTED_WRONG', { showId: null }));
        t = state.bands[b].contactId || null;
        out.push(message(state, t, say(state, ['people.harm.wrong'], { member: t && state.people[t] ? state.people[t].first : '', person: pname(p), they: 'they', them: 'them', their: 'their' }), { bandId: b }));
        h.wrong[p.id] = true;
        break;
      case 'PART':
        if (!p || !memberOf(state, a.bandId, p.id)) break;
        out = out.concat(part(state, a.bandId, p.id));
        out.push(message(state, state.bands[a.bandId].contactId || null,
                         say(state, ['people.harm.bandReply.PARTED'], { person: pname(p), instrument: '', newMember: '', they: 'they', them: 'them', their: 'their' }), { bandId: a.bandId }));
        break;
      case 'DRAW_BACK':
        b = state.bands && state.bands[a.bandId];
        if (b && b.hid && b.hid.draw) for (z in b.hid.draw) b.hid.draw[z] /= a.mul;
        break;
    }
    return out;
  }

  /* ---------------- the week ---------------- */

  function tellerFor(state, o, r) {
    var p = state.people, cands = [], src;
    Object.keys(p || {}).forEach(function (id) {
      var q = p[id];
      if (id === o.personId || !active(q) || (q.rel === null || q.rel === undefined || q.rel < 50)) return;
      if (o.bandId && memberOf(state, o.bandId, id)) return;
      if (state.bookers && state.bookers[id]) src = E.HARM_SOURCE.BOOKER;
      else if (state.contacts && state.contacts[id]) src = E.HARM_SOURCE.BOOKER;
      else if ((q.roles || []).indexOf('FLOOR') >= 0) src = E.HARM_SOURCE.SAW_IT;
      else if ((q.bands || []).some(function (b) { return state.bands[b] && state.bands[b].local && SB.Bands.trust(state, b).value >= 60; })) src = E.HARM_SOURCE.DIRECT;
      else src = E.HARM_SOURCE.TRUSTED;
      cands.push({ id: id, src: src });
    });
    return cands.length ? r.pick(cands) : null;
  }

  function candidatesInOrbit(state, circle) {
    var out = [], asked = {}, inCircle = {};
    Object.keys(state.requests || {}).forEach(function (id) { var q = state.requests[id]; if (q.status !== 'LAPSED' && q.status !== 'PASSED') asked[q.bandId] = true; });
    Object.keys(state.shows || {}).forEach(function (id) { (state.shows[id].bill && state.shows[id].bill.slots || []).forEach(function (s) { asked[s.bandId] = true; }); });
    if (circle) SB.People.circle(state).people.forEach(function (c) { inCircle[c.id] = true; });
    Object.keys(state.people || {}).forEach(function (id) {
      var p = state.people[id];
      if (!active(p) || !p.hid || !p.hid.harm || p.listed) return;
      if (circle) { if (inCircle[id]) out.push({ personId: id, bandId: null }); return; }
      (p.bands || []).forEach(function (b) {
        var band = state.bands && state.bands[b];
        if (band && ((band.shows || []).length > 0 || asked[b])) out.push({ personId: id, bandId: b });
      });
    });
    return out;
  }

  function weekly(state) {
    var h = harm(state), w = week(state), r = rng(state), out = [], o, pick, t, wt, founded, aft, keep = [];
    h.after.forEach(function (a) { if (a.week > w) keep.push(a); else out = out.concat(after(state, a)); });
    h.after = keep.concat(h.after.filter(function (a) { return keep.indexOf(a) < 0 && a.week > w; }));
    if (h.open) {
      o = h.open;
      if (o.left !== null && o.left !== undefined) {
        if (o.hid.founded && o.weight < 3 && r.chance(0.1)) {
          o.weight += 1; o.closesWeek = null; o.left = null;
          o.text = say(state, ['people.harm.tell.' + o.source + '.' + o.weight, 'people.harm.tell.' + o.source + '.1'], slots(state, o));
          out.push(message(state, o.tellerId, o.text, { bandId: o.bandId }));
          SB.Week.raise(state, decision(state));
        } else if (o.closesWeek !== null && o.closesWeek !== undefined && w >= o.closesWeek) {
          out.push(message(state, null, say(state, ['people.harm.closed.NOTHING_MORE'], slots(state, o)), null));
          close(state, 'NOTHING_MORE');
        }
      }
      return out;
    }
    if (w < H.NOT_BEFORE_WEEK) return out;
    if (h.lastWeek !== null && w - h.lastWeek < H.GAP_MIN) return out;
    if (!r.chance(1 / H.GAP)) return out;
    var pool = candidatesInOrbit(state, r.chance(0.2));
    if (!pool.length) return out;
    pick = r.pick(pool);
    wt = r.chance(0.7) ? 1 : (r.chance(0.5) ? 2 : 3);
    founded = r.chance(H.FOUNDED[wt - 1]);
    aft = r.weighted(Object.keys(H.AFTER), function (k) { return H.AFTER[k]; });
    o = { id: U.newId(state, 'h'), personId: pick.personId, bandId: pick.bandId, weight: wt, source: E.HARM_SOURCE.RUMOR, tellerId: null,
          week: w, asks: 0, wordSent: false, left: null, closesWeek: null, hid: { founded: founded, after: aft } };
    t = tellerFor(state, o, r);
    if (t) { o.tellerId = t.id; o.source = t.src; }
    else { o.weight = 1; o.hid.founded = r.chance(1 - H.RUMOR_ONLY_WRONG); }
    h.open = o;
    h.lastWeek = w;
    h.nextWeek = w + H.GAP_MIN;
    o.text = say(state, ['people.harm.tell.' + o.source + '.' + o.weight, 'people.harm.tell.' + o.source + '.1', 'people.harm.tell.RUMOR.1'], slots(state, o));
    out.push(message(state, o.tellerId, o.text, { bandId: o.bandId }));
    SB.Week.raise(state, decision(state));
    return out;
  }

  /* ---------------- actions ---------------- */

  function fromJob(args) { return !!(args && (args.jobId || args.job || args.fromJob)); }

  function act(state, k, args) {
    if (!E.HARM_ACT[k]) SB.fail('Harm.act', 'unknown HARM_ACT "' + k + '"');
    args = args || {};
    var h = harm(state), o = h.open, out = [], r = rng(state), res, sl, list, w = week(state);
    if (state.clock && state.clock.phase === E.PHASE.OVER) return U.no(E.REFUSE.OVER, SB.text.label('refuse.OVER'));
    if (!o) return U.no(E.REFUSE.INVALID, SB.text.label('refuse.INVALID'));
    sl = slots(state, o);
    switch (k) {
      case 'ASK_AROUND':
        // SPEC?: the decision adds a HARM_ASK job (Week.addJob); Jobs.resolve then calls act again with { jobId }, which asks.
        if (!fromJob(args)) {
          if (o.asks >= H.ASKS) return U.no(E.REFUSE.TOO_MANY, SB.text.label('refuse.TOO_MANY'));
          res = SB.Week.addJob(state, 'HARM_ASK', {});
          if (!res || !res.ok) return res || U.no(E.REFUSE.INVALID, '');
          return U.yes({ records: [], jobId: res.jobId });
        }
        if (o.asks >= H.ASKS) return U.no(E.REFUSE.TOO_MANY, SB.text.label('refuse.TOO_MANY'));
        o.asks += 1;
        if (o.asks >= 2 && o.tellerId && state.people[o.tellerId]) {
          out.push(SB.People.adjust(state, o.tellerId, H.ASK_TWICE_REL, 'ASKED_TWICE'));
          out.push(message(state, o.tellerId, say(state, ['people.harm.asked.TWICE'], sl), null));
        }
        if (o.bandId && r.chance(H.ASK_WORD_BACK)) {
          out.push(SB.Bands.addTrust(state, o.bandId, 'ASKED_AROUND', { showId: null }));
          out.push(message(state, null, say(state, ['people.harm.asked.WORD_BACK'], sl), { bandId: o.bandId }));
        }
        if (o.hid.founded) {
          if (o.weight < 3 && r.chance(0.5)) { o.weight += 1; out.push(message(state, o.tellerId, say(state, ['people.harm.asked.STRONGER'], slots(state, o)), null)); }
          else out.push(message(state, o.tellerId, say(state, ['people.harm.asked.SAME'], sl), null));
        } else if (r.chance(0.5)) {
          out.push(message(state, o.tellerId, say(state, ['people.harm.asked.NOT_HOLD'], sl), null));
          close(state, 'NOT_HOLD');
        } else out.push(message(state, o.tellerId, say(state, ['people.harm.asked.SAME'], sl), null));
        break;
      case 'LIST':
        res = add(state, o.personId, args.why || '', args.condition || E.LIST_CONDITION.BAND_PARTS, args);
        if (!res.ok) return res;
        close(state, 'LISTED');
        break;
      case 'QUIET_WORD':
        if (!o.bandId || !memberOf(state, o.bandId, o.personId)) return U.no(E.REFUSE.INVALID, SB.text.label('refuse.INVALID'));
        if (o.wordSent) return U.no(E.REFUSE.ALREADY, SB.text.label('refuse.ALREADY'));
        // SPEC?: as ASK_AROUND: the decision adds a HARM_WORD job; the job's act sends the QUIET_WORD ask.
        if (!fromJob(args)) {
          res = SB.Week.addJob(state, 'HARM_WORD', { bandId: o.bandId });
          if (!res || !res.ok) return res || U.no(E.REFUSE.INVALID, '');
          return U.yes({ records: [], jobId: res.jobId });
        }
        res = SB.Mail.ask(state, E.ASK.QUIET_WORD, o.bandId, { noClock: true });   // the HARM_WORD job's hour covers it
        if (!res || !res.ok) return res || U.no(E.REFUSE.INVALID, '');
        o.wordSent = true;
        break;
      case 'PULL_SHOW':
        list = o.bandId ? liveShowsWith(state, o.bandId) : [];
        if (args.showId) list = list.filter(function (s) { return s.id === args.showId; });
        if (!list.length) return U.no(E.REFUSE.INVALID, SB.text.label('refuse.INVALID'));
        res = SB.Shows.cancel(state, list[0].id, E.CANCEL.RESPECTED);
        if (res && !res.ok) return res;
        out = out.concat((res && res.records) || []);
        break;
      case 'LEAVE':
        if (o.left !== null && o.left !== undefined) return U.no(E.REFUSE.ALREADY, SB.text.label('refuse.ALREADY'));
        o.left = w;
        o.closesWeek = w + r.int(H.LEAVE_CLOSES[0], H.LEAVE_CLOSES[1]);
        break;
    }
    SB.Week.log(state, out);
    return U.yes({ records: out });
  }

  function answerAsk(state, ask, phase) {
    if (!ask || ask.kind !== E.ASK.QUIET_WORD) SB.fail('Harm.answerAsk', 'Harm answers QUIET_WORD asks only');
    var b = state.bands && state.bands[ask.toId], r = rng(state), h = harm(state), o = h.open, out = [], pid, wt, m, pPart, text, trust;
    if (!b) SB.fail('Harm.answerAsk', 'unknown band "' + ask.toId + '"');
    if (phase === 'SEND') return { days: r.range(1, 3), will: E.ASK_STATUS.YES, counter: null };
    if (phase !== 'DELIVER') SB.fail('Harm.answerAsk', 'phase must be SEND or DELIVER');
    if (o && o.bandId === b.id) { pid = o.personId; wt = o.weight; }
    else {
      (b.members || []).forEach(function (x) { var p = state.people[x.personId]; if (!pid && p && p.listed) { pid = p.id; wt = p.listed.weight || 1; } });
    }
    m = pid ? memberOf(state, b.id, pid) : null;
    if (!m) return { status: E.ASK_STATUS.YES, text: say(state, ['people.harm.bandReply.SILENT'], {}), counter: null, records: [] };
    trust = SB.Bands.trust(state, b.id).value;
    pPart = H.PART.base + H.PART.perWeight * wt + (m.founder ? H.PART.founder : 0) + (trust >= 60 ? H.PART.trusted : 0);
    var sl = slots(state, { personId: pid, bandId: b.id, instrument: m.instrument ? String(m.instrument).toLowerCase() : '' });
    if (r.chance(U.clamp(pPart, 0, 1))) {
      out = out.concat(part(state, b.id, pid));
      text = say(state, ['people.harm.bandReply.PARTED'], sl);
      if (o && o.bandId === b.id) close(state, 'BAND_PARTED');
    } else if (r.chance(0.5)) {
      text = say(state, ['people.harm.bandReply.HANDLING'], sl);
      h.after.push({ kind: 'PART', personId: pid, bandId: b.id, week: week(state) + r.int(2, 6) });
      if (o && o.bandId === b.id) close(state, 'HANDLING');
    } else {
      out.push(SB.Bands.addTrust(state, b.id, 'CLOSED_RANKS', { showId: null }));
      text = say(state, ['people.harm.bandReply.DEFENSIVE', 'people.harm.bandReply.SILENT'], sl);
      if (o && o.bandId === b.id) close(state, 'CLOSED_RANKS');
    }
    return { status: E.ASK_STATUS.YES, text: text, counter: null, records: out };
  }

  /* ---------------- the list ---------------- */

  function list(state) {
    var w = week(state);
    return Object.keys(state.people || {}).filter(function (id) { return !!state.people[id].listed; }).map(function (id) {
      var p = state.people[id], l = p.listed, was = (p.bands || []).concat(p.pastBands || []), met = false;
      if (l.condition === 'BAND_PARTS') met = (l.from || []).length > 0 && (l.from || []).every(function (b) { return !memberOf(state, b, id); });
      else if (l.condition === 'LOOK_AGAIN') met = l.lookAgain !== null && l.lookAgain !== undefined && w >= l.lookAgain;
      return { personId: id, name: pname(p), wasIn: was.filter(function (b, i) { return was.indexOf(b) === i; }).map(function (b) { return bname(state, b); }).filter(Boolean),
               since: l.since, why: l.why, condition: l.condition, conditionMet: met, bandsNow: (p.bands || []).slice() };
    });
  }

  function add(state, personId, why, condition, opts) {
    var p = person(state, personId, 'Harm.add'), h = harm(state), w = week(state), r = rng(state), founded, friends = {};
    opts = opts || {};
    if (!E.LIST_CONDITION[condition]) SB.fail('Harm.add', 'unknown LIST_CONDITION "' + condition + '"');
    if (why !== undefined && why !== null && typeof why !== 'string') SB.fail('Harm.add', 'why must be text');
    if (state.clock && state.clock.phase === E.PHASE.OVER) return U.no(E.REFUSE.OVER, SB.text.label('refuse.OVER'));
    if (p.listed) return U.no(E.REFUSE.ALREADY, SB.text.label('refuse.ALREADY'));
    p.listed = { since: w, why: why || '', condition: condition, talkTo: opts.talkTo || null,
                 lookAgain: condition === 'LOOK_AGAIN' ? (opts.lookAgain || w + 52) : (opts.lookAgain || null),
                 from: (p.bands || []).slice(), weight: h.open && h.open.personId === personId ? h.open.weight : 1 };
    // SPEC?: "trust base -> NOT_BOOK.trust" and "friends -5" have no Bands function; the listing writes the bases.
    (p.bands || []).forEach(function (bid) {
      var b = state.bands && state.bands[bid];
      if (!b || !b.trust) return;
      b.trust.base = Math.min(b.trust.base, H.NOT_BOOK.trust);
      (b.members || []).forEach(function (m) {
        var q = state.people[m.personId];
        (q && q.bands || []).forEach(function (ob) { if (ob !== bid && (p.bands || []).indexOf(ob) < 0) friends[ob] = true; });
      });
    });
    Object.keys(friends).forEach(function (ob) {
      var b = state.bands && state.bands[ob];
      if (b && b.trust) b.trust.base = U.clamp(b.trust.base + H.NOT_BOOK.friends, 0, 100);
    });
    founded = h.open && h.open.personId === personId ? !!h.open.hid.founded : !!(p.hid && p.hid.harm);
    if (!founded && (p.bands || []).length) h.after.push({ kind: 'WRONG', personId: personId, week: w + r.int(8, 16) });
    return U.yes();
  }

  function remove(state, personId) {
    var p = person(state, personId, 'Harm.remove'), h = harm(state), out = [], text, id, l = p.listed;
    if (!l) return U.no(E.REFUSE.INVALID, SB.text.label('refuse.INVALID'));
    text = say(state, ['people.harm.removed'], { person: pname(p), condition: SB.text.label('listCondition.' + l.condition), they: 'they', them: 'them', their: 'their' });
    if (h.wrong[personId]) {
      (l.from || []).forEach(function (bid) { var b = state.bands && state.bands[bid]; if (b && b.trust) b.trust.base = Math.max(b.trust.base, H.WRONG.apology); });
      var note = say(state, ['people.harm.note'], {});
      id = SB.Notebook.addNote(state, { page: 'LIST', title: note, body: '', conf: E.CONF.KNOWN, from: null, week: week(state), pinned: false });
      out.push(rec(state, E.REC.NOTE, null, note, { learned: { key: id || '', label: note, from: 0, to: E.CONF.KNOWN, text: note, because: '' } }));
      delete h.wrong[personId];
    }
    h.after = h.after.filter(function (a) { return !(a.kind === 'WRONG' && a.personId === personId); });
    p.listed = null;
    out.unshift(rec(state, E.REC.NOTE, null, text, { learned: { key: 'list:' + personId, label: pname(p), from: 0, to: 0, text: text, because: '' } }));
    SB.Week.log(state, out);
    return U.yes({ records: out });
  }

  function flags(state, bandId) {
    var b = state.bands && state.bands[bandId], known, ids;
    if (!b) SB.fail('Harm.flags', 'unknown band "' + bandId + '"');
    ids = (b.members || []).map(function (m) { return m.personId; }).filter(function (id) { return state.people && state.people[id] && state.people[id].listed; });
    if (!b.local) {
      known = !!(b.knows && b.knows.members) || Object.keys(state.requests || {}).some(function (q) {
        var v = state.requests[q].vetted || {};
        return state.requests[q].bandId === bandId && (v.CLIP !== undefined || v.HISTORY !== undefined);
      });
      if (!known) return { listed: [], text: null };
    }
    if (!ids.length) return { listed: [], text: null };
    return { listed: ids, text: say(state, [b.local ? 'people.harm.flag.band' : 'people.harm.flag.request', 'people.harm.flag.band'], {}) || null };
  }

  function onBooked(state, show) {
    if (!show || typeof show !== 'object') SB.fail('Harm.onBooked', 'show must be a Show');
    var h = harm(state), o = h.open, maxW = 0, withHim = {}, out = [], cfg, loss, n, c;
    (show.bill && show.bill.slots || []).forEach(function (s) {
      var b = state.bands && state.bands[s.bandId];
      (b && b.members || []).forEach(function (m) {
        var p = state.people && state.people[m.personId], w = 0;
        if (o && o.personId === m.personId) w = o.weight;
        else if (p && p.listed) w = p.listed.weight || 1;
        if (w) { withHim[s.bandId] = true; maxW = Math.max(maxW, w); }
      });
    });
    if (maxW < 2) return out;
    cfg = H.BOOK_ANYWAY[maxW - 1];
    if (cfg.regulars) {
      loss = Math.min(H.REGULARS_MAX_LOSS, -cfg.regulars);
      n = SB.Crowd.loseRegulars(state, loss, { came: show.id }, 'HARM');
      out.push(rec(state, E.REC.REGULARS, show.id, '', { won: 0, lost: Math.round(n || 0), total: (state.regulars && state.regulars.total) || 0 }));
    }
    if (cfg.localTrust) {
      (show.bill.slots || []).forEach(function (s) {
        if (s.role !== E.BILL_ROLE.LOCAL || withHim[s.bandId]) return;
        // SPEC?: "thinks less of the player (-5)" has no TRUST key; BAD_BILL is sent with ctx.d = localTrust.
        out.push(SB.Bands.addTrust(state, s.bandId, 'BAD_BILL', { showId: show.id, d: cfg.localTrust }));
      });
    }
    if (cfg.name) out.push(SB.Game.adjustName(state, cfg.name, 'HARM'));
    if (cfg.word) out.push(SB.Territory.adjustWord(state, cfg.word, 'HARM'));
    if (maxW >= 3) {
      c = SB.People.circle(state).people;
      if (c.length) {
        var leaver = state.people[rng(state).pick(c).id];
        leaver.roles = (leaver.roles || []).filter(function (x) { return HELPER_ROLES.indexOf(x) < 0; });
      }
    }
    return out;
  }

  return { current: current, act: act, answerAsk: answerAsk, list: list, add: add, remove: remove, flags: flags,
           onBooked: onBooked, weekly: weekly };
});
