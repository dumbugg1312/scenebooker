'use strict';
// test/bots/checklist.js — the Checklist bot (06-harness section 4): "Par walking around".
// Every usual job on time and nothing else: it applies Week.suggest in full each week, leaves every promise ticked, plans no
// optional job, no second run and no priced choice beyond the usual print run, and never overspends hours.
//   * answers every request inside its window; takes a request when a bookable room is open on one of its dates, the Par is at
//     least 0.4 of the room's capacity, and the exposure is covered by the fund (or by a third of the bank);
//   * chooses the room whose capacity is nearest 1.3 x Par;
//   * asks locals from public numbers only (followers x base affinity to the touring band), best first, three bands;
//   * door price: the middle generation's comfort; touring band second to last, strongest local last;
//   * always pays the guarantee and keeps the fair share (Night.auto settle FAIR); never scouts, never vets beyond LISTEN;
//   * first option at every decision; full time in year one, part time once four weeks of bills are in the bank.
// make(cfg) builds the bot so the Learner, Late and Gambler can be this bot plus a few hooks (06-harness section 4).
const L = require('./lib.js');

const MAX_LIVE = 2;                                   // shows in flight at once; the usual has hours for about this many
const TELLING = { MAKE_FLYER: 1, ANNOUNCE: 1, BANDS_SHARE: 1, PRINT: 1, FLYER_RUN: 1, LISTINGS: 1, LOCAL_AD: 1, MAILING_LIST: 1, HAND_OUT: 1, INVITES: 1, WEEK_PUSH: 1, DAY_OF_POST: 1 };

function make(cfg) {
  cfg = cfg || {};
  let M = null;
  function fresh() { return { notes: {}, decided: {}, drafts: {}, seen: {}, booked: {}, last: {} }; }

  /* --- the decision to take a request, by public numbers (SPEC? "closer first" read as: the highest-ranked local is asked first) --- */
  function evaluate(state, SB, q) {
    const view = q.view, req = view.request;
    const dates = L.arr(view.dates);
    const draft = M.drafts[q.requestId] ? { ok: true, showId: M.drafts[q.requestId] } : SB.Shows.create(state, { requestId: q.requestId });
    if (!L.ok(draft)) return { take: false, why: 'no draft' };
    M.drafts[q.requestId] = draft.showId;
    const fund = L.fundOf(state), bank = L.bankOf(state), cover = state.settings && state.settings.bills === false ? fund : Math.max(fund, bank / 3);
    const guarantee = L.num(req && req.ask && req.ask.guarantee);
    let best = null;
    dates.forEach(d => {
      // "a bookable room is open on one of its dates" (06-harness 4): the rooms whose owner would grant a hold today
      // (Rooms.list bookable, 02-engine 7.14), and of those the ones the request's own calendar shows open that night.
      const shut = {};
      L.arr(d.rooms).forEach(r => { if (r.state && r.state !== 'OPEN') shut[r.roomId] = true; });
      const open = L.bookableRooms(state, SB, d.day).map(r => r.roomId).filter(id => !shut[id]);
      open.forEach(roomId => {
        let card = null;
        try { card = SB.Rooms.card(state, roomId); } catch (e) { card = null; }
        const cap = card ? L.num(card.cap, 0) : 0;
        if (!cap) return;
        let w = null;
        try { w = SB.Forecast.what(state, draft.showId, { roomId: roomId, day: d.day }); } catch (e) { w = null; }
        const par = w && w.par ? L.num(w.par.heads, 0) : 0;
        if (par < (cfg.parMin === undefined ? .4 : cfg.parMin) * cap) return;
        let owed = guarantee;
        try { const t = SB.Rooms.terms(state, roomId, draft.showId) || {}; owed += L.num(t.rent) + L.num(t.deposit) + L.num(t.soundFee) + L.num(t.houseCosts); } catch (e) { /* none */ }
        if (!cfg.ignoreCover && owed > cover) return;
        const score = cfg.roomScore ? cfg.roomScore(state, SB, { par: par, cap: cap, w: w, day: d.day, roomId: roomId, card: card, request: view }) : -Math.abs(cap - 1.3 * par);
        if (!best || score > best.score) best = { roomId: roomId, day: d.day, par: par, cap: cap, score: score };
      });
    });
    return best ? { take: true, pick: best, showId: draft.showId } : { take: false, showId: draft.showId, why: 'no room fits' };
  }

  function handleRequests(state, SB) {
    const live = L.liveShows(state, SB).length;
    let slots = MAX_LIVE - live;
    L.openRequests(state, SB).forEach(q => {
      if (M.decided[q.requestId]) return;
      let take = false, ev = null;
      // SPEC? a LOCAL_ASK is a local band asking for a date; there is no touring band to offer terms to, so the Checklist bot answers it with a polite pass
      const wanted = q.view.request && q.view.request.kind === 'LOCAL_ASK' ? false : (cfg.wants ? cfg.wants(state, SB, q, M) : true);
      if (wanted && (slots > 0 || cfg.takeAll)) { ev = evaluate(state, SB, q); take = ev.take; }
      if (take) {
        const r = SB.Mail.ask(state, 'ROOM_HOLD', ev.pick.roomId, { showId: ev.showId, day: ev.pick.day, slot: 'EVENING', inPerson: false });
        if (L.ok(r)) {
          M.decided[q.requestId] = 'taken'; slots--;
          M.notes[ev.showId] = { roomId: ev.pick.roomId, requestId: q.requestId, holdAsked: true, day: ev.pick.day };
          if (cfg.onTaken) cfg.onTaken(state, SB, q, ev, M);
          return;
        }
      }
      // pass, politely and with a reason; drop the draft
      if (ev && ev.showId) SB.Shows.cancel(state, ev.showId, 'PLAYER');
      else if (M.drafts[q.requestId]) SB.Shows.cancel(state, M.drafts[q.requestId], 'PLAYER');
      const r = SB.Mail.reply(state, q.requestId, 'PASS', { tone: 'REASON', referTo: null });
      M.decided[q.requestId] = L.ok(r) ? 'passed' : 'tried';
    });
  }

  // A draft that can no longer become a show is let go at once (the room's hold with it), not left to be cancelled on its
  // night at the price of a near cancellation: the band took another town, said no, or the request lapsed; or the room said no.
  const REQ_LIVE = { NEW: 1, REPLIED: 1, NEGOTIATING: 1, ACCEPTED: 1 };
  function dropDead(state, SB) {
    L.liveShows(state, SB).forEach(show => {
      if (show.status !== 'DRAFT') return;
      const note = M.notes[show.id] || {};
      const reqId = show.requestId || note.requestId || null;
      let dead = false;
      if (reqId) {
        let req = null;
        try { req = SB.Requests.get(state, reqId); } catch (e) { req = null; }
        if (!req || !REQ_LIVE[req.status]) dead = true;
      }
      if (!dead && note.holdAsked && !show.hold) {
        // the hold was refused or has lapsed, and nothing is out asking for another
        const out = L.arr(SB.Mail.waiting(state)).concat(L.arr(SB.Mail.outbox(state))).some(a => a.showId === show.id && (a.kind === 'ROOM_HOLD' || a.kind === 'ROOM_CONFIRM'));
        if (!out) dead = true;
      }
      if (dead) { SB.Shows.cancel(state, show.id, 'PLAYER'); delete M.notes[show.id]; }
    });
  }

  // A booker with nowhere to put a show goes and meets the people who run rooms (02-engine 7.14: a visit is what makes a
  // hall or a house bookable). One visit a fortnight while fewer than three rooms would hold a date; smallest room first.
  function visit(state, SB) {
    if (cfg.noVisits) return;
    const week = state.clock && typeof state.clock.week === 'number' ? state.clock.week : 0;
    if (M.lastVisit !== undefined && week - M.lastVisit < 2) return;
    if (L.arr(SB.Rooms.list(state, { bookable: true, open: true })).length >= 3) return;
    const free = L.arr(SB.Jobs.freeJobs(state)).filter(f => f.type === 'VISIT' && f.args && f.args.personId && !f.args.askId);
    if (!free.length) return;
    const capOf = {};
    L.arr(SB.Rooms.list(state, { open: true })).forEach(rid => {
      let r = null;
      try { r = SB.Rooms.get(state, rid); } catch (e) { r = null; }
      if (r && r.ownerId && (r.kind === 'HALL' || r.kind === 'HOUSE')) capOf[r.ownerId] = Math.min(L.num(r.cap, 999), capOf[r.ownerId] === undefined ? 999 : capOf[r.ownerId]);
    });
    const cands = free.filter(f => capOf[f.args.personId] !== undefined).sort((a, b) => capOf[a.args.personId] - capOf[b.args.personId]);
    if (!cands.length) return;
    const j = SB.Week.addJob(state, 'VISIT', cands[0].args);
    if (!L.ok(j)) return;
    for (let d = 0; d < 7; d++) {
      const halves = cands[0].half === 'DAY' ? ['DAY'] : (cands[0].half === 'NIGHT' ? ['NIGHT'] : ['NIGHT', 'DAY']);
      for (let h = 0; h < halves.length; h++) if (L.ok(SB.Week.plan(state, j.jobId, d, halves[h], { by: 'player' }))) { M.lastVisit = week; return; }
    }
    SB.Week.removeJob(state, j.jobId);
  }

  // Everything the bot does to move its shows along and place the usual. Called at the start of the week and again
  // whenever the play loop pauses with news (05-interface 4.2: "Replanning is allowed whenever the loop is paused").
  function work(state, SB) {
    handleRequests(state, SB);
    dropDead(state, SB);
    L.liveShows(state, SB).forEach(show => {
      const acts = L.advanceShow(state, SB, show, M.notes, { pickLocals: cfg.pickLocals, door: cfg.door, deal: cfg.deal, crewPay: cfg.crewPay, termsBeforeHold: cfg.termsBeforeHold });
      L.setUsualBill(state, SB, show);
      if (cfg.onShow) cfg.onShow(state, SB, show, M, acts);
    });
    const week = state.clock && typeof state.clock.week === 'number' ? state.clock.week : 0;
    const skip = e => {
      if (cfg.skipSuggest && cfg.skipSuggest(state, SB, e, week, M)) return true;
      if (cfg.lateTelling && TELLING[e.type]) {
        const j = e.jobId ? SB.Jobs.get(state, e.jobId) : null;
        const showId = (j && j.showId) || (e.args && e.args.showId);
        const sh = showId ? SB.Shows.get(state, showId) : null;
        if (sh && sh.day - (week * 7 + e.dayIdx) > cfg.lateTelling) return true;
      }
      return false;
    };
    L.applySuggest(state, SB, { skip: skip, opt: cfg.optFor });
    visit(state, SB);
  }

  function dayJob(state, SB) {
    if (cfg.noPartTime || !state.settings || state.settings.bills === false || !state.player) return;
    const month = L.monthlyBills(state, SB), bank = L.bankOf(state), year1 = state.clock && state.clock.week < 52;
    if (!year1 && bank >= 4 * month && state.player.dayJob === 'FULL') SB.Week.setDayJob(state, 'PART');
    else if (bank < 2 * month && state.player.dayJob === 'PART') SB.Week.setDayJob(state, 'FULL');
  }

  const bot = {
    name: cfg.name || 'checklist',

    setup: function (opts) { M = fresh(); if (cfg.setup) cfg.setup(M, opts); return { bills: opts && opts.bills, dayJob: 'FULL' }; },

    planWeek: function (state, SB) {
      if (!M) M = fresh();
      dayJob(state, SB);
      if (cfg.beforeRequests) cfg.beforeRequests(state, SB, M);
      work(state, SB);
      if (cfg.afterPlan) cfg.afterPlan(state, SB, M);
    },

    // Mid-week, after a morning that brought news (an answer, a message, a hold): the same work again, for the days not yet played.
    replan: function (state, SB, records) {
      if (!M) M = fresh();
      const news = L.arr(records).some(r => r && (r.t === 'ASK_ANSWERED' || r.t === 'MESSAGE' || r.t === 'HOLD' || r.t === 'REQUEST_GONE'));
      if (!news) return;
      if (cfg.beforeRequests) cfg.beforeRequests(state, SB, M);
      work(state, SB);
    },

    onStop: function (state, SB, stop) { return cfg.onStop ? cfg.onStop(state, SB, stop, M) : { optionId: 'FIRST' }; },

    onNight: function (state, SB, showId) {
      if (cfg.onNight) return cfg.onNight(state, SB, showId, M);
      return SB.Night.auto(state, showId, { settle: 'FAIR' });
    },

    onClose: function (state, SB, report) {
      if (cfg.onClose) cfg.onClose(state, SB, report, M);
      return { bills: { pay: 'ALL' } };
    }
  };
  return bot;
}

module.exports = make({});
module.exports.make = make;
module.exports.TELLING = TELLING;
module.exports.MAX_LIVE = MAX_LIVE;
