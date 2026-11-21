'use strict';
// test/bots/gambler.js — the Gambler bot (06-harness section 4).
// Takes every request it can hold a room for, from week 0 (nothing is stage-locked); always offers the full guarantee asked; the
// largest room that will have it, deposit paid; the highest price in DOOR.prices at or below 1.5 x the middle generation's comfort;
// the BIG print run, a HIGH paid push and an ad on every show; the address in print at every house; pays what is due by the public
// numbers; never drops a shift (and never goes part time), and stays up the extra hour whenever a job needs it. Its balance target: late rent in year 1 in 40 to 60 percent of runs, bills on.
const L = require('./lib.js');
const checklist = require('./checklist.js');

function gamblerDoor(state, SB, show, room) {
  let comfort = 10;
  try { comfort = SB.Cities.pack(state).money.comfort[1]; } catch (e) { /* default */ }
  const limit = 1.5 * comfort;
  const prices = SB.Config.DOOR.prices.filter(p => p <= limit);
  const price = prices.length ? prices[prices.length - 1] : comfort;
  const kind = room && room.kind;
  const house = SB.Config.CHANNELS.ADDRESS.kinds.indexOf(kind) >= 0;
  return { price: price, donation: false, suggested: null, ages: room && room.ages && room.ages[0] ? room.ages[0] : 'ALL', sheet: true, address: house ? 'FULL' : null };
}

module.exports = checklist.make({
  name: 'gambler',
  takeAll: true,
  parMin: 0,
  ignoreCover: true,
  noPartTime: true,
  stayUp: true,                                                                          // the stay-up hour is spent on the usual jobs
  roomScore: function (state, SB, c) { return c.cap; },                                  // the largest room that will have it
  door: gamblerDoor,
  deal: function (state, SB, show, req) { return L.dealFromRequest(req, true); },        // the full guarantee asked
  optFor: function (e) {
    if (e.type === 'PRINT') return 'BIG';
    if (e.type === 'ANNOUNCE' || e.type === 'WEEK_PUSH') return 'HIGH';
    return e.opt;
  },
  afterPlan: function (state, SB, M) {
    // an ad in the weekly paper on every show: the optional job, done tonight if it fits (staying up included)
    L.liveShows(state, SB).forEach(show => {
      const job = L.arr(SB.Jobs.forShow(state, show.id)).filter(j => j.type === 'LOCAL_AD' && j.status === 'TODO')[0];
      if (!job) return;
      const o = { opt: 'PAPER' };
      if (L.ok(SB.Week.canDoNow(state, job.id, o))) SB.Week.doNow(state, job.id, o);
    });
  }
});
