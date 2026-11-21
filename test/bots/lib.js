'use strict';
// test/bots/lib.js — shared helpers for the bots (06-harness section 4).
//
// A bot plays through the public interface only: the functions marked `view` or `action` in 02-engine, and the public
// fields of `state`. This file builds the two things that enforce that:
//   * wrapSB(SB, ctx)   a view of SB whose engine modules expose only the allowed functions (an `internal` call throws
//                       a BotError), unwrap the guarded state, deep-copy the other arguments, and count the actions
//                       that succeeded (one "player decision" each);
//   * guardState(state) a Proxy that throws when a bot reads `hid`, `state.truth`, `state.rng` or `state.director`,
//                       or writes anywhere.
// and the helpers the five bots share: read the inbox, list bookable rooms on a date, rank candidate bands, do
// tonight's jobs (Week.doNow), advance a show by its jobs.
//
// Everything here is written from 02-engine; where the engine file does not exist yet the bots run against the stubs.
// Every engine call is defensive: a refusal ({ ok: false }) is an outcome, never an exception; the only thing that throws
// is a broken contract in the engine, which the runner records as a failed run.

const H = require('../helpers.js');

/* ---------------- what a bot may call (02-engine: Kind = view | action) ---------------- */

const ALLOWED = {
  Game:      ['newGame', 'strip', 'setSetting'],
  Week:      ['view', 'plan', 'unplan', 'addJob', 'removeJob', 'suggest', 'dropShift', 'setDayJob', 'phoneOff', 'check',
              'startPlay', 'step', 'decide', 'close', 'payBills', 'nextWeek', 'tonight', 'canDoNow', 'doNow', 'endNight', 'crunch'],
  Shows:     ['create', 'get', 'list', 'view', 'setBill', 'setBilling', 'setDoor', 'setLabel', 'setCrew', 'setInsurance', 'dropBand', 'move', 'cancel'],
  Jobs:      ['catalog', 'get', 'forShow', 'tray', 'freeJobs', 'window', 'canDo', 'promise', 'flyerSpec', 'setFlyer'],
  Mail:      ['inbox', 'message', 'markRead', 'reply', 'ask', 'withdraw', 'chase', 'setNeedBy', 'waiting', 'needsYou', 'outbox', 'unqueue'],
  Money:     ['canCover', 'exposure', 'owedAhead', 'showAccounts', 'ledger', 'billsView', 'payBills', 'move'],
  Stress:    ['zone', 'view'],
  Save:      ['save', 'load', 'list', 'remove', 'exportText', 'importText'],
  Model:     [],
  Forecast:  ['par', 'call', 'card', 'what', 'reachStrip'],
  Night:     ['begin', 'next', 'settleView', 'settle', 'auto'],
  Feedback:  [],
  Notebook:  ['range', 'knowledge', 'pages', 'entry', 'tally'],
  WorldGen:  [],
  Bands:     ['get', 'list', 'card', 'fee', 'replyWindow', 'trust'],
  Rooms:     ['get', 'list', 'card', 'calendar', 'terms', 'release', 'challenge', 'rel', 'otherShows', 'bookers', 'bookerRel'],
  Requests:  ['get', 'list', 'view', 'route'],
  Trends:    ['arrow', 'signs'],
  Crowd:     ['regulars', 'focus'],
  Territory: ['word', 'contacts', 'drive', 'tourCandidates', 'tourStops', 'startTour', 'tour'],
  Effects:   ['preview'],
  Director:  ['risks'],
  People:    ['get', 'card', 'rel', 'stage', 'crew', 'circle'],
  Harm:      ['current', 'act', 'list', 'add', 'remove', 'flags'],
  Legacy:    ['wall', 'binder', 'bandHistory', 'townLine', 'firsts', 'offers', 'answerOffer', 'end']
};

// The ones that change state: a successful call is one player decision (06-harness 5.2, "player decisions per week").
const ACTIONS = {
  Week:      ['plan', 'unplan', 'addJob', 'removeJob', 'dropShift', 'setDayJob', 'phoneOff', 'decide', 'doNow'],
  Shows:     ['create', 'setBill', 'setBilling', 'setDoor', 'setLabel', 'setCrew', 'setInsurance', 'dropBand', 'move', 'cancel'],
  Jobs:      ['promise', 'setFlyer'],
  Mail:      ['reply', 'ask', 'withdraw', 'chase', 'setNeedBy', 'unqueue'],
  Money:     ['move'],
  Territory: ['startTour'],
  Harm:      ['act', 'add', 'remove'],
  Legacy:    ['answerOffer', 'end'],
  Rooms:     ['release', 'challenge']
};

class BotError extends Error { constructor(msg) { super(msg); this.name = 'BotError'; } }

/* ---------------- the guard on state ---------------- */

const FORBIDDEN_TOP = { truth: 1, rng: 1, director: 1 };

function guardState(state) {
  const cache = new WeakMap();
  const proxy = guardValue(state, 'state', true, cache);
  return { proxy: proxy, real: state, cache: cache };
}

// A read-only proxy over any value an engine call returned (views may not leak `hid`, and a bot may not change them).
function guardValue(obj, path, top, cache) {
  cache = cache || new WeakMap();
  function wrap(obj, path, top) {
    if (!obj || typeof obj !== 'object') return obj;
    const hit = cache.get(obj);
    if (hit) return hit;
    const p = new Proxy(obj, {
      get(t, k, r) {
        if (typeof k === 'symbol') return Reflect.get(t, k, r);
        if (k === 'hid') throw new BotError('a bot read a hidden value: ' + path + '.hid');
        if (top && FORBIDDEN_TOP[k]) throw new BotError('a bot read state.' + k);
        const v = Reflect.get(t, k, r);
        return (v && typeof v === 'object') ? wrap(v, path + '.' + k, false) : v;
      },
      set(t, k) { throw new BotError('a bot wrote to state: ' + path + '.' + String(k)); },
      deleteProperty(t, k) { throw new BotError('a bot deleted from state: ' + path + '.' + String(k)); }
    });
    cache.set(obj, p);
    return p;
  }
  return wrap(obj, path || 'value', !!top);
}

/* ---------------- the wrapped SB ---------------- */

// ctx: { state, proxy (or null), strict: true, counts: { decisions, calls: {} } }
function wrapSB(SB, ctx) {
  const out = {};
  const cache = {};
  Object.keys(SB).forEach(k => { out[k] = SB[k]; });
  Object.keys(ALLOWED).forEach(mod => {
    if (!SB[mod]) return;
    const w = {};
    ALLOWED[mod].forEach(fn => {
      if (typeof SB[mod][fn] !== 'function') return;
      const isAction = !!(ACTIONS[mod] && ACTIONS[mod].indexOf(fn) >= 0);
      w[fn] = function () {
        const args = [];
        for (let i = 0; i < arguments.length; i++) {
          const a = arguments[i];
          if (ctx.proxy && a === ctx.proxy) args.push(ctx.state);
          else if (ctx.proxy && a && typeof a === 'object') args.push(JSON.parse(JSON.stringify(a)));
          else args.push(a);
        }
        let r = SB[mod][fn].apply(SB[mod], args);
        const key = mod + '.' + fn;
        ctx.counts.calls[key] = (ctx.counts.calls[key] || 0) + 1;
        if (isAction && (r === undefined || r === null || r.ok !== false)) ctx.counts.decisions++;
        if (ctx.proxy && r && typeof r === 'object') r = guardValue(r, key, false, ctx.cache);
        return r;
      };
    });
    if (ctx.strict) {
      cache[mod] = new Proxy(w, {
        get(t, k) {
          if (typeof k === 'symbol' || k in t) return t[k];
          if (SB[mod] && typeof SB[mod][k] === 'function') throw new BotError('a bot called ' + mod + '.' + String(k) + ', which is internal (02-engine)');
          return undefined;
        }
      });
    } else cache[mod] = Object.assign({}, SB[mod], w);
    out[mod] = cache[mod];
  });
  // A bot may not draw from the engine's streams.
  out.rng = { make: SB.rng.make, hash: SB.rng.hash };
  return out;
}

/* ---------------- tiny readers (public data only) ---------------- */

function ok(r) { return !!r && r.ok !== false; }
function num(x, d) { return typeof x === 'number' && isFinite(x) ? x : (d === undefined ? 0 : d); }
function arr(x) { return Array.isArray(x) ? x : []; }
function firstEnabled(decision) {
  const o = arr(decision && decision.options);
  for (let i = 0; i < o.length; i++) if (o[i].enabled !== false) return o[i].id;
  return o.length ? o[0].id : null;
}
function monthlyBills(state, SB) {
  try { const p = SB.Cities.pack(state), b = p.money.bills; return b.RENT + b.UTILITIES + b.CAR + b.FOOD; } catch (e) { return 1450; }
}
function bankOf(state) { return state.money && typeof state.money.bank === 'number' ? state.money.bank : 0; }
function fundOf(state) { return state.money && typeof state.money.fund === 'number' ? state.money.fund : 0; }

// The base affinity between two genres, from the public table and the city's lean (no quirks: those are hidden).
function baseAff(SB, state, fan, band) {
  if (fan === band) return 1;
  const E = SB.Enums, C = SB.Config;
  let v = C.AFFINITY[E.GENRE_INDEX[fan]][E.GENRE_INDEX[band]];
  try {
    arr(SB.Cities.pack(state).tilt).forEach(t => { if (t.fan === fan && t.band === band) v += t.d; });
  } catch (e) { /* no pack */ }
  return Math.max(0, Math.min(1.2, v));
}

/* ---------------- the inbox and requests ---------------- */

// Requests waiting on the player: [{ requestId, view }]. `NEW` and `REPLIED` requests with a live reply-by.
function openRequests(state, SB) {
  const ids = arr(SB.Requests.list(state, { status: 'NEW' }));
  const out = [];
  ids.forEach(id => {
    let v = null;
    try { v = SB.Requests.view(state, id); } catch (e) { v = null; }
    if (v && v.request) out.push({ requestId: id, view: v });
  });
  return out;
}

// Rooms the owner would hold today for a date: [{ roomId, card }]. Uses Rooms.list({ bookable }) and the calendar.
function bookableRooms(state, SB, day, opts) {
  opts = opts || {};
  const out = [];
  arr(SB.Rooms.list(state, { bookable: true, open: true })).forEach(rid => {
    let cal = [];
    try { cal = arr(SB.Rooms.calendar(state, rid, day, 1)); } catch (e) { cal = []; }
    const cell = cal[0];
    if (cell && cell.state && cell.state !== 'OPEN') return;
    let card = null;
    try { card = SB.Rooms.card(state, rid); } catch (e) { card = null; }
    if (opts.kinds && card && opts.kinds.indexOf(card.kind) < 0) return;
    out.push({ roomId: rid, card: card, cap: card ? num(card.cap, num(card.room && card.room.cap, 0)) : 0, kind: card ? card.kind : null });
  });
  return out;
}

// Local bands free on a day, ranked by public numbers: followers x base affinity to `touringGenre` (default: followers only).
function rankLocals(state, SB, day, touringGenre, exclude) {
  const out = [];
  arr(SB.Bands.list(state, { local: true, active: true, freeOn: day })).forEach(id => {
    if (exclude && exclude.indexOf(id) >= 0) return;
    let c = null;
    try { c = SB.Bands.card(state, id); } catch (e) { c = null; }
    if (!c) return;
    const aff = touringGenre ? baseAff(SB, state, touringGenre, c.genre) : 1;
    const t = c.trust && typeof c.trust.value === 'number' ? c.trust.value : 50;
    out.push({ bandId: id, card: c, score: num(c.followers) * aff, trust: t, genre: c.genre, playedOut: !!c.playedOut, listed: num(c.listedMembers) > 0 });
  });
  out.sort((a, b) => b.score - a.score || (a.bandId < b.bandId ? -1 : 1));
  return out;
}

/* ---------------- doing the evening's jobs ---------------- */

// Do open jobs tonight, soonest due day first, while they fit (spec 10: Week.canDoNow / Week.doNow). Replaces the old
// Week.suggest + Week.plan. opts:
//   skip(view) -> true to leave a job alone       opt(view) -> a priced choice key (else the engine's default)
//   effort(view) -> MAKE_FLYER effort             stay: true lets a job run into the stay-up hour (default: it must fit the night)
//   optional: true also does optional jobs        only(view) -> false to leave a job (an extra filter, after skip)
// Returns { done, refused: [why] }.
function doTonight(state, SB, opts) {
  opts = opts || {};
  const res = { done: 0, refused: [] }, tries = {};
  for (let guard = 0; guard < 40; guard++) {
    const tray = SB.Jobs.tray(state) || {};
    const cands = [].concat(arr(tray.late), arr(tray.thisWeek), arr(tray.later), arr(tray.soon)).filter(j => {
      if (!j || j.mode !== 'HOURS' || j.status !== 'TODO' || j.hidden || j.covered) return false;
      if (j.optional && !opts.optional) return false;
      if (!j.window || j.window.state === 'EARLY' || j.window.state === 'MISSED' || j.window.state === 'DONE' || j.window.state === 'NONE') return false;
      if (j.type === 'FLYER_RUN' && String(j.key || '').indexOf('#') >= 0) return false;       // a second run is an extra
      if ((tries[j.id] || 0) >= 2) return false;
      if (opts.skip && opts.skip(j)) return false;
      return true;
    });
    cands.sort((a, b) => (a.due === null || a.due === undefined ? 1e9 : a.due) - (b.due === null || b.due === undefined ? 1e9 : b.due) || (a.id < b.id ? -1 : 1));
    let acted = false;
    for (let i = 0; i < cands.length && !acted; i++) {
      const j = cands[i], o = {};
      const opt = opts.opt ? opts.opt(j) : undefined;
      if (opt !== undefined && opt !== null) o.opt = opt;
      const eff = opts.effort ? opts.effort(j) : undefined;
      if (eff) o.effort = eff;
      const c = SB.Week.canDoNow(state, j.id, o);
      if (!ok(c)) { res.refused.push(j.type + ': ' + (c && c.code)); tries[j.id] = 9; continue; }
      if (!opts.stay && num(c.overtime) > 0) continue;
      tries[j.id] = (tries[j.id] || 0) + 1;
      const r = SB.Week.doNow(state, j.id, o);
      if (ok(r)) { res.done++; acted = true; } else { res.refused.push(j.type + ': ' + (r && r.code)); tries[j.id] = 9; }
    }
    if (!acted) break;
  }
  return res;
}

// Do a job that is not in the tray (a free job: a visit, a show to go to; or one made with Week.addJob) tonight, or take it
// back off the list when it will not go (or would mean staying up, unless `stay`). -> true when it was done.
function doFreeNow(state, SB, type, args, o, stay) {
  const a = SB.Week.addJob(state, type, args || {});
  if (!ok(a)) return false;
  const c = SB.Week.canDoNow(state, a.jobId, o || {});
  if (ok(c) && (stay || !(num(c.overtime) > 0)) && ok(SB.Week.doNow(state, a.jobId, o || {}))) return true;
  SB.Week.removeJob(state, a.jobId);
  return false;
}

// a message that was refused for want of time is tried again tomorrow, not given up on
function noTime(r) { return !!r && r.ok === false && (r.code === 'NO_TIME' || r.code === 'BURNT_OUT'); }

/* ---------------- advancing a show by its jobs ---------------- */

function liveShows(state, SB) {
  return arr(SB.Shows.list(state, {})).filter(s => s && (s.status === 'DRAFT' || s.status === 'CONFIRMED'));
}

// What the usual agrees to: the band's own ask, written down.
function dealFromRequest(request, written) {
  const a = (request && request.ask) || {};
  return { shape: a.shape || 'DOOR', guarantee: num(a.guarantee), pct: a.pct === undefined ? 1 : a.pct, afterCosts: true,
           lodging: !!a.lodging, meal: !!a.meal, written: written !== false, agreedDay: null };
}

// Make one show move one step further by doing what its open message-jobs say. cfg hooks:
//   pickLocals(state, SB, show, ranked) -> [bandId]        default: the top three
//   door(state, SB, show, room) -> door spec               default: the middle generation's comfort
//   crewPay(person) -> pay
// `memo` is the bot's own per-show notes ({ roomId, requestId }).
function advanceShow(state, SB, show, memo, cfg) {
  cfg = cfg || {};
  const acts = [];
  const jobs = arr(SB.Jobs.forShow(state, show.id));
  const byType = {};
  jobs.forEach(j => { (byType[j.type] = byType[j.type] || []).push(j); });
  const todo = t => arr(byType[t]).filter(j => j.status === 'TODO');
  const note = memo[show.id] = memo[show.id] || {};
  const reqId = show.requestId || note.requestId || null;

  // 1. hold the room
  if (todo('HOLD_ROOM').length && note.roomId && !note.holdAsked) {
    const r = SB.Mail.ask(state, 'ROOM_HOLD', note.roomId, { showId: show.id, day: show.day, slot: show.slot || 'EVENING', inPerson: false });
    if (ok(r)) { note.holdAsked = true; acts.push('hold'); }
  }
  // 2. agree terms with the touring band, once the room is held: Config.JOBS gives AGREE_TERMS the need HOLD_ROOM, and a
  //    band says yes for certain only when a room is held on its date (02-engine 7.15)
  const holdJob = arr(byType.HOLD_ROOM)[0];
  const held = !holdJob || holdJob.status === 'DONE';
  if (todo('AGREE_TERMS').length && reqId && !note.termsAsked && (held || cfg.termsBeforeHold)) {
    let req = null;
    try { req = SB.Requests.get(state, reqId); } catch (e) { req = null; }
    if (!req || !req.bandId) { note.termsAsked = true; return acts; }      // a request with no band to write to cannot be offered terms
    const deal = cfg.deal ? cfg.deal(state, SB, show, req) : dealFromRequest(req, true);
    const r = SB.Mail.reply(state, reqId, 'OFFER', { showId: show.id, date: show.day, deal: deal });
    if (ok(r)) { note.termsAsked = true; acts.push('terms'); }
  }
  // 3. ask locals: three at first (06-harness 4), a band that wrote offering to play before the rest, the first of them for the
  //    closing slot ("touring band second to last", so the strongest local closes); then, as answers come in, one more at a
  //    time until two locals have said yes (LOCK_BILL needs two confirmed bands), while the bill is open and the show is a week off
  const asked = arr(note.locals);
  const today = state.clock && typeof state.clock.day === 'number' ? state.clock.day : 0;
  const slots = arr(show.bill && show.bill.slots);
  const localsIn = slots.filter(x => x.role === 'LOCAL' && x.confirmed !== false).length;
  const pending = arr(byType.ASK_LOCALS).filter(j => j.key && j.status === 'WAITING' && today - num((note.askedOn || {})[j.key], today) <= 7).length;
  const wantLocals = cfg.wantLocals === undefined ? 2 : cfg.wantLocals;
  const firstRound = !note.localsAsked;
  const room = firstRound ? 3 : Math.max(0, wantLocals - localsIn - pending);
  if (jobs.length && room > 0 && !(show.bill && show.bill.locked) && show.day - today >= 7 && asked.length < 12 &&
      (firstRound || arr(byType.ASK_LOCALS).length)) {
    let tg = null;
    try { const rv = reqId ? SB.Requests.get(state, reqId) : null; const b = rv && rv.bandId && SB.Bands.card(state, rv.bandId); tg = b && b.genre; } catch (e) { tg = null; }
    const ranked = rankLocals(state, SB, show.day, tg, asked);
    let picks;
    if (cfg.pickLocals && firstRound) picks = cfg.pickLocals(state, SB, show, ranked);
    else {
      // bands that wrote to the player offering to play come first (the inbox is public); then by public numbers
      const wrote = {};
      arr(SB.Mail.inbox(state, 'BAND')).forEach(m => { if (m && m.refs && m.refs.bandId && !m.refs.askId) wrote[m.refs.bandId] = true; });
      picks = ranked.filter(x => wrote[x.bandId]).concat(ranked.filter(x => !wrote[x.bandId])).map(x => x.bandId);
    }
    picks = arr(picks).slice(0, room);
    const hasCloser = slots.some(x => x.role === 'LOCAL') || note.closerAsked;
    picks.forEach((bandId, i) => {
      let fee = { pay: 'FREE', amount: 0 };
      try { fee = SB.Bands.fee(state, bandId, show.id) || fee; } catch (e) { /* default */ }
      const want = (!hasCloser && i === 0) ? 'CLOSE' : 'OPEN';
      const r = SB.Mail.ask(state, 'BAND_PLAY', bandId, { showId: show.id, pay: fee.pay, fee: fee.amount, wantSlot: want, inPerson: false });
      if (ok(r)) { asked.push(bandId); (note.askedOn = note.askedOn || {})[bandId] = today; if (want === 'CLOSE') note.closerAsked = true; acts.push('ask ' + bandId); }
    });
    note.locals = asked; note.localsAsked = true;
  }
  // 4. confirm the room once the hold is ours (with event insurance where the room needs it: it is bought on confirming)
  let rules = null;
  // what the room needs before it confirms (Rooms.terms: cheap, unlike Shows.view and its forecast)
  try {
    const needs = show.roomId ? arr((SB.Rooms.terms(state, show.roomId, show.id) || {}).needs) : [];
    const need = k => needs.some(n => n && n.k === k);
    rules = { security: { required: need('SECURITY') }, insurance: { required: need('INSURANCE'), on: !!show.insure || needs.some(n => n && n.k === 'INSURANCE' && n.met) } };
  } catch (e) { rules = null; }
  if (rules && rules.insurance && rules.insurance.required && !rules.insurance.on && !note.insured) {
    if (ok(SB.Shows.setInsurance(state, show.id, true))) { note.insured = true; acts.push('insure'); }
  }
  // no confirm ask: the room's yes books the night once it has what it asked for (Rooms.firmUp, daily)
  // 5. crew: sound always; security where the room needs it (the player works the door)
  if (todo('LINE_UP_CREW').length || (rules && rules.security && rules.security.required && !(show.crew && show.crew.security))) {
    ['sound', 'security'].forEach(role => {
      if (show.crew && show.crew[role]) return;
      if (role === 'security' && !(rules && rules.security && rules.security.required)) return;
      if (note['crew' + role]) return;
      const cands = arr(SB.People.crew(state, role, show.id)).filter(c => !c.busy);
      cands.sort((a, b) => num(b.rel) - num(a.rel));
      const c = cands[0];
      if (!c) return;
      const pay = cfg.crewPay ? cfg.crewPay(c) : { kind: 'CASH', amount: num(c.rate, 30) };
      const r = SB.Mail.ask(state, 'CREW', c.personId, { showId: show.id, role: role, pay: pay });
      if (ok(r)) { note['crew' + role] = true; acts.push('crew ' + role); }
    });
  }
  // 6. lodging: the player's own floor
  if (todo('LODGING').length && show.deal && show.deal.lodging && !(show.crew && show.crew.lodging)) {
    const r = SB.Shows.setCrew(state, show.id, 'lodging', 'player');
    if (ok(r)) acts.push('lodging');
  }
  // 7. door price once the room is known and before the announcement
  if (!note.doorSet && show.roomId) {
    let room = null;
    try { room = SB.Rooms.get(state, show.roomId); } catch (e) { room = null; }
    const spec = cfg.door ? cfg.door(state, SB, show, room) : defaultDoor(state, SB, show, room);
    if (spec) { const r = SB.Shows.setDoor(state, show.id, spec); if (ok(r)) { note.doorSet = true; acts.push('door'); } }
  }
  return acts;
}

// Middle generation's comfort, the room's first allowed age band, the usual address.
function defaultDoor(state, SB, show, room) {
  let price = 10;
  try { price = SB.Cities.pack(state).money.comfort[1]; } catch (e) { /* default */ }
  const prices = SB.Config.DOOR.prices.filter(p => p <= price);
  price = prices.length ? prices[prices.length - 1] : price;
  const kind = room && room.kind;
  const house = SB.Config.CHANNELS.ADDRESS.kinds.indexOf(kind) >= 0;
  return { price: price, donation: false, suggested: null, ages: room && room.ages && room.ages[0] ? room.ages[0] : 'ALL', sheet: true,
           address: house ? SB.Config.USUAL.address : null };
}

// The play order of the usual: openers by public draw, the touring band second to last, the strongest local last.
function usualOrder(state, SB, show) {
  const slots = arr(show.bill && show.bill.slots);
  const locals = slots.filter(s => s.role === 'LOCAL').map(s => {
    let f = 0; try { f = num(SB.Bands.card(state, s.bandId).followers); } catch (e) { f = 0; }
    return { id: s.bandId, f: f };
  }).sort((a, b) => a.f - b.f || (a.id < b.id ? -1 : 1));
  const touring = slots.filter(s => s.role === 'TOURING').map(s => s.bandId);
  const order = locals.slice(0, Math.max(0, locals.length - 1)).map(x => x.id).concat(touring);
  if (locals.length) order.push(locals[locals.length - 1].id);
  return order;
}

// Put the bill in the usual order before it is locked. Returns true when it called setBill.
function setUsualBill(state, SB, show) {
  if (!show.bill || show.bill.locked || arr(show.bill.slots).length < 2) return false;
  const order = usualOrder(state, SB, show);
  const cur = show.bill.slots.map(s => s.bandId);
  if (order.join() === cur.join()) return false;
  const minutes = {};
  order.forEach(id => { minutes[id] = SB.Config.SET.def; });
  return ok(SB.Shows.setBill(state, show.id, { order: order, minutes: minutes, doors: show.bill.doors }));
}

/* ---------------- running a night ---------------- */

// A whole night by hand, first enabled option at every stop (the public path of 05-interface 4.7), used when a bot wants the
// SB.Night.begin / next / settle steps rather than auto. keep: 'FAIR' | 'ALL' | 'NONE'.
function playNight(state, SB, showId, keep) {
  let step = SB.Night.begin(state, showId), guard = 0;
  while (step && step.stop && step.stop.kind === 'DECISION' && guard++ < 12) {
    const d = step.stop.decision, opt = firstEnabled(d);
    step = SB.Night.next(state, showId, { decisionId: d.id, optionId: opt });
  }
  const sv = SB.Night.settleView(state, showId) || {};
  const split = sv.split || {};
  let choice = { shortfall: null, keep: 0, extraToLocals: 0, gas: 0 };
  if (sv.gap > 0 && arr(sv.shortfall).length) {
    const s = sv.shortfall.filter(x => x.enabled !== false)[0];
    choice.shortfall = s ? s.k : null;
  }
  choice.keep = keep === 'ALL' ? num(split.keepMax) : (keep === 'NONE' ? 0 : num(split.fairMax));
  return SB.Night.settle(state, showId, choice);
}

module.exports = {
  ALLOWED, ACTIONS, BotError, guardState, guardValue, wrapSB,
  ok, num, arr, firstEnabled, monthlyBills, bankOf, fundOf, baseAff,
  openRequests, bookableRooms, rankLocals, doTonight, doFreeNow, noTime, liveShows, dealFromRequest, advanceShow, defaultDoor,
  usualOrder, setUsualBill, playNight
};
