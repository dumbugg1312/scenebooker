'use strict';
// clockpress.test — the clock button on a show's own night always plays the night (fix-list 0.11).
// Show day, one band on a bill that is not locked, open jobs, no hours free: Week.endNight settles it on the spot (the bill
// locks, the open jobs are marked missed with their own line) and the next step opens the doors. A press never does nothing.
const H = require('../helpers.js');

module.exports = function (t) {
  const NEED = ['Game', 'Week', 'Shows', 'Jobs', 'Mail', 'Money', 'Stress', 'WorldGen', 'Director', 'Requests', 'Rooms', 'Bands', 'People', 'Notebook', 'Tutorial', 'Night'];
  if (!H.needs(t, NEED, 'the clock press')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const ok = r => r && r.ok !== false;

  function toEvening(state, limit) {
    for (let g = 0; g < (limit || 80); g++) {
      const st = state.clock.stop;
      if (st && st.kind === 'EVENING') return st;
      const r = SB.Week.step(state);
      if (r.stop && r.stop.kind === 'DECISION') SB.Week.decide(state, r.stop.decision.id, r.stop.decision.options.filter(o => o.enabled !== false)[0].id);
      else if (r.stop && r.stop.kind === 'END_OF_WEEK') return r.stop;
      else if (r.stop && r.stop.kind === 'SHOW_NIGHT') return r.stop;
    }
    return null;
  }

  Array.from({ length: 20 }, (_, i) => 'press-' + (i + 1)).forEach(seed => H.section(t, 'show day, unready: ' + seed, () => {
    const state = H.newGame(SB, { seed });
    const q = SB.Requests.list(state, { status: 'NEW' }).map(id => SB.Requests.get(state, id)).filter(x => x.id === (state.director && state.director.firstRequestId) || x.kind === 'SWAP')[0];
    if (!q) { t.note(seed + ': no opening request'); return; }
    const made = SB.Shows.create(state, { requestId: q.id });
    if (!ok(made)) { t.note(seed + ': no show'); return; }
    const show = state.shows[made.showId];
    SB.Shows.onConfirmed(state, show.id, state.clock.day);
    show.day = 2;                                                  // the show is on the third night
    const band = SB.Bands.list(state, { local: true, active: true })[0];
    if (band) SB.Shows.addBand(state, show.id, band.id || band, { role: 'OPEN' });
    show.bill.locked = false;
    SB.Jobs.refreshAll(state);
    // play to the show's own evening, answering whatever interrupts
    let st = null;
    for (let g = 0; g < 200 && state.clock.day <= 2; g++) {
      st = toEvening(state);
      if (!st || st.kind !== 'EVENING' || state.clock.day >= 2) break;
      SB.Week.endNight(state);
    }
    if (!st || st.kind !== 'EVENING' || state.clock.day !== 2) { t.note(seed + ': never reached the show evening'); return; }
    t.eq(show.status, 'CONFIRMED', seed + ': the show is still on');
    t.eq(show.bill.locked, false, 'the bill is not locked');
    const used = SB.Week.tonight(state);
    t.ok(used.show, 'tonight is the show night');
    const r = SB.Week.endNight(state);
    t.ok(ok(r), 'the press is not refused (' + (r && r.code) + ')');
    t.eq(show.bill.locked, true, 'the bill locked with whoever said yes');
    const open = Object.keys(state.jobs).filter(id => state.jobs[id].showId === show.id && ['TODO', 'PLANNED', 'PROMISED'].indexOf(state.jobs[id].status) >= 0 && !/^(RUN_SHOW|GO_TO_SHOW|THANKS|DEBRIEF)$/.test(state.jobs[id].type));
    t.eq(open.length, 0, 'no job is left open: each is settled' + (open.length ? ' (' + open.map(id => state.jobs[id].type).join(',') + ')' : ''));
    t.ok(Array.isArray(r.settled), 'and what was left undone comes back as lines');
    let stop = null;
    for (let g = 0; g < 6 && !stop; g++) { const s = SB.Week.step(state); if (s.stop) stop = s.stop; }
    t.ok(stop && stop.kind === 'SHOW_NIGHT' && stop.showId === show.id, 'the next step opens the doors (' + JSON.stringify(stop && stop.kind) + ')');
  }));
};
