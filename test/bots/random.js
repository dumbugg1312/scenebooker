'use strict';
// test/bots/random.js — the Random bot (06-harness section 4): any legal choice, uniformly. It exists to find throws and dead
// ends, so it also does the odd things the edge rules of 02-engine 7.0 guard against: moves a show to an earlier date after
// promoting it, books bands with no followers, prices a door at $0, books rooms in tiny zones, cancels, drops shifts, turns the
// phone off, chases and withdraws asks. Every choice comes from its own seeded generator (SB.rng.make); it reads only what a
// player can see (views and public fields) and calls only view and action functions.
const L = require('./lib.js');

let R = null;          // the bot's own generator
let SEED = 'x';

function pick(list) { return list.length ? R.pick(list) : undefined; }
function coin(p) { return R.chance(p); }

module.exports = {
  name: 'random',

  setup: function (opts) {
    SEED = String((opts && opts.seed) || 'x');
    R = null;
    return { bills: opts && opts.bills, dayJob: 'FULL' };
  },

  planWeek: function (state, SB) {
    if (!R) R = SB.rng.make('bot:random:' + SEED);
    const week = state.clock && typeof state.clock.week === 'number' ? state.clock.week : 0;
    const day0 = week * 7;

    /* requests: any of the three replies, at random */
    L.openRequests(state, SB).forEach(q => {
      const roll = R.next();
      if (roll < .35) SB.Mail.reply(state, q.requestId, 'INTERESTED', {});
      else if (roll < .65) {
        const dates = L.arr(q.view.dates);
        if (!dates.length) return;
        const d = pick(dates), s = SB.Shows.create(state, { requestId: q.requestId });
        if (!L.ok(s)) return;
        const rooms = L.bookableRooms(state, SB, d.day);
        const room = pick(rooms);
        if (room) SB.Mail.ask(state, 'ROOM_HOLD', room.roomId, { showId: s.showId, day: d.day, slot: 'EVENING', inPerson: coin(.2) });
        SB.Mail.reply(state, q.requestId, 'OFFER', { showId: s.showId, date: d.day, deal: L.dealFromRequest(q.view.request, coin(.5)) });
      } else SB.Mail.reply(state, q.requestId, 'PASS', { tone: pick(['SHORT', 'REASON', 'LEAD']), referTo: null });
    });

    /* start a show of one's own now and then, on a random day of the next ten weeks */
    if (coin(.15)) SB.Shows.create(state, { own: true, day: day0 + R.int(7, 70), tags: [], benefitFor: null });

    /* every live show: random asks, rooms (tiny zones included), bands (no followers included), prices, labels, crew */
    L.liveShows(state, SB).forEach(show => {
      if (coin(.25)) {
        const zones = Object.keys(state.zones || {});
        const zid = coin(.3) ? pick(zones) : undefined;
        const rooms = L.arr(SB.Rooms.list(state, zid ? { zoneId: zid, open: true } : { open: true }));
        const rid = pick(rooms);
        if (rid) SB.Mail.ask(state, 'ROOM_HOLD', rid, { showId: show.id, day: show.day, slot: 'EVENING', inPerson: coin(.2) });
      }
      if (coin(.2) && show.roomId) SB.Mail.ask(state, 'ROOM_CONFIRM', show.roomId, { showId: show.id });
      if (coin(.35)) {
        const bands = L.arr(SB.Bands.list(state, { local: true, active: true }));
        const b = pick(bands);
        if (b) {
          let fee = { pay: 'FREE', amount: 0 };
          try { fee = SB.Bands.fee(state, b, show.id) || fee; } catch (e) { /* default */ }
          SB.Mail.ask(state, 'BAND_PLAY', b, { showId: show.id, pay: pick(['FREE', 'GAS', 'FLAT', 'SHARE']), fee: coin(.5) ? fee.amount : 0, wantSlot: pick(['OPEN', 'MIDDLE', 'CLOSE']), inPerson: false });
        }
      }
      if (coin(.15)) SB.Shows.setDoor(state, show.id, { price: pick(SB.Config.DOOR.prices), donation: coin(.1), suggested: coin(.1) ? pick(SB.Config.DOOR.suggested) : null, ages: 'ALL', sheet: coin(.7), address: null });
      if (coin(.05)) SB.Shows.setLabel(state, show.id, pick(['LOWKEY', 'NORMAL', 'BIG']), []);
      if (coin(.2)) {
        const role = pick(['sound', 'security']);
        const c = pick(L.arr(SB.People.crew(state, role, show.id)));
        if (c) SB.Mail.ask(state, 'CREW', c.personId, { showId: show.id, role: role, pay: { kind: 'CASH', amount: L.num(c.rate, 30) } });
      }
      if (coin(.1)) SB.Shows.setCrew(state, show.id, 'lodging', 'player');
      if (coin(.04)) SB.Shows.cancel(state, show.id, pick(['PLAYER', 'RESPECTED']));
      // after promoting, move the show to an earlier date (7.0 rule 1)
      if (coin(.04) && show.promo && show.promo.announce !== null && show.promo.announce !== undefined) {
        const rooms = L.bookableRooms(state, SB, show.day - 3);
        const rm = pick(rooms);
        if (rm) SB.Shows.move(state, show.id, { roomId: rm.roomId, day: Math.max(day0 + 1, show.day - R.int(1, 10)), slot: 'EVENING', hold: null });
      }
      if (coin(.04)) SB.Shows.setBilling(state, show.id, R.shuffle(L.arr(show.bill && show.bill.slots).map(s => s.bandId)));
    });

    /* asks: chase, withdraw, a need-by date */
    L.arr(SB.Mail.waiting(state)).forEach(a => {
      if (coin(.08)) SB.Mail.chase(state, a.id);
      else if (coin(.04)) SB.Mail.withdraw(state, a.id);
      else if (coin(.05)) SB.Mail.setNeedBy(state, a.id, day0 + R.int(1, 10));
    });

    /* jobs: random days, halves and helpers, legal or not (a refusal is an outcome) */
    const tray = SB.Jobs.tray(state) || {};
    ['late', 'thisWeek', 'soon'].forEach(k => {
      L.arr(tray[k]).forEach(j => {
        if (j.mode !== 'HOURS' || !coin(.6)) return;
        const dayIdx = R.int(0, 6), half = j.half === 'ANY' ? pick(['DAY', 'NIGHT']) : j.half;
        const opts = { by: 'player' };
        if (j.opt && j.opt.choices && j.opt.choices.length && coin(.5)) opts.opt = pick(j.opt.choices).key;
        SB.Week.plan(state, j.id, dayIdx, half, opts);
      });
    });
    L.arr(SB.Jobs.freeJobs(state)).forEach(f => {
      if (!coin(.2)) return;
      const r = SB.Week.addJob(state, f.type, f.args || {});
      if (L.ok(r)) SB.Week.plan(state, r.jobId, R.int(0, 6), f.half === 'ANY' || !f.half ? pick(['DAY', 'NIGHT']) : f.half, { by: 'player' });
    });
    L.arr(SB.Week.suggest(state)).forEach(e => {            // the odd plan from the usual, applied at random
      if (!coin(.15) || !e.jobId) return;
      SB.Week.plan(state, e.jobId, e.dayIdx, e.half, { by: e.by || 'player' });
    });

    /* the week itself */
    if (coin(.1)) SB.Week.phoneOff(state, R.int(0, 6), coin(.7));
    if (coin(.05)) SB.Week.dropShift(state, R.int(0, 4));
    if (coin(.03)) SB.Week.setDayJob(state, pick(['FULL', 'PART', 'NONE']));
    if (coin(.05)) SB.Week.check(state);
    if (coin(.03)) SB.Money.move(state, R.int(1, 100), pick(['FUND', 'BANK']), pick(['FUND', 'BANK']));
    if (coin(.05)) SB.Mail.markRead(state, (pick(L.arr(SB.Mail.inbox(state, 'ALL'))) || {}).id);
  },

  onStop: function (state, SB, stop) {
    if (stop.kind === 'DECISION') {
      const opts = L.arr(stop.decision.options).filter(o => o.enabled !== false);
      if (!R) R = SB.rng.make('bot:random:' + SEED);
      const o = pick(opts);
      return { optionId: o ? o.id : null };
    }
    return null;
  },

  onNight: function (state, SB, showId) {
    if (!R) R = SB.rng.make('bot:random:' + SEED);
    if (coin(.3)) { SB.Night.auto(state, showId, { settle: pick(['FAIR', 'KEEP_ALL', 'GIVE_ALL']) }); return; }
    // by hand: a random enabled option at every stop, then a random settle
    let step = SB.Night.begin(state, showId), guard = 0;
    while (step && step.stop && step.stop.kind === 'DECISION' && guard++ < 12) {
      const d = step.stop.decision, o = pick(L.arr(d.options).filter(x => x.enabled !== false));
      step = SB.Night.next(state, showId, { decisionId: d.id, optionId: o ? o.id : null });
    }
    const sv = SB.Night.settleView(state, showId) || {};
    const split = sv.split || {};
    const sf = L.arr(sv.shortfall).filter(x => x.enabled !== false);
    SB.Night.settle(state, showId, {
      shortfall: sv.gap > 0 && sf.length ? pick(sf).k : null,
      keep: Math.round(R.next() * L.num(split.keepMax)), extraToLocals: coin(.3) ? R.int(0, 20) : 0, gas: coin(.3) ? R.int(0, 20) : 0
    });
  },

  onClose: function (state, SB, report) {
    if (!R) R = SB.rng.make('bot:random:' + SEED);
    if (!report || !report.bills) return { bills: { pay: 'ALL' } };
    const lines = L.arr(report.bills.lines).map(l => l.k);
    const pay = lines.filter(() => coin(.7)), late = lines.filter(k => pay.indexOf(k) < 0);
    const ladder = L.arr(report.bills.ladder).filter(x => x.available && coin(.5)).map(x => x.k);
    return { bills: { pay: pay, late: late, ladder: ladder } };
  }
};
