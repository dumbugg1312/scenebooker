'use strict';
// test/bots/learner.js — the Learner bot and its two variants (06-harness section 4).
// Checklist, plus:
//   * chooses the bill, the night and the room by Forecast.what: the Call's midpoint, less a penalty of half its width;
//   * vets every request with HISTORY and, when it has a contact, asks a booker (CONTACT_VET);
//   * spends free Night hours on GO_TO_SHOW at shows whose genres it has least knowledge of;
//   * changes one thing at a time: prefers a bill with at most one band it has never booked;
//   * runs a DEBRIEF after any show outside its Call;
//   * books toward a genre when Trends.arrow is UP, and away from one its last two shows were.
// learner-specialist takes requests only in its three best-known genres; learner-allround prefers the genre it has booked least.
// It reads only views and public fields (06-harness 4: leak.test runs it under a proxy that throws on a hidden read).
const L = require('./lib.js');
const checklist = require('./checklist.js');

function genreCounts(state) {
  const n = {};
  L.arr(state.player && state.player.recentGenres).forEach(list => L.arr(list).forEach(g => { n[g] = (n[g] || 0) + 1; }));
  return n;
}
function lastTwo(state) {
  const rg = L.arr(state.player && state.player.recentGenres), out = [];
  rg.slice(-2).forEach(list => L.arr(list).forEach(g => out.push(g)));
  return out;
}

function make(name, variant) {
  return checklist.make({
    name: name,
    setup: function (M) { M.vetted = {}; M.debrief = {}; M.scouted = {}; },

    // the Call's midpoint, less half its width; a trend up is worth a tenth, the genre of the last two shows costs a fifth
    roomScore: function (state, SB, c) {
      const call = c.w && c.w.call ? c.w.call : null;
      let v = call ? L.num(call.mid) - .5 * (L.num(call.hi) - L.num(call.lo)) : c.par;
      const g = c.request && c.request.band ? c.request.band.genre : null;
      if (g) {
        let arrow = null; try { arrow = SB.Trends.arrow(state, g); } catch (e) { arrow = null; }
        if (arrow === 'UP') v *= 1.1;
        if (lastTwo(state).indexOf(g) >= 0 && lastTwo(state).filter(x => x === g).length >= 2) v *= .8;
        if (variant === 'allround') v -= 8 * (genreCounts(state)[g] || 0);
      }
      return v;
    },

    wants: function (state, SB, q, M) {
      if (variant !== 'specialist') return true;
      const counts = genreCounts(state), ranked = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
      if (ranked.length < 3) return true;                                                    // not enough history to specialise yet
      const g = q.view.band && q.view.band.genre;
      return !g || ranked.slice(0, 3).indexOf(g) >= 0;
    },

    // vet every request: HISTORY planned in the first half-day that has an hour, and a booker asked when the player knows one
    beforeRequests: function (state, SB, M) {
      L.openRequests(state, SB).forEach(q => {
        if (M.vetted[q.requestId]) return;
        M.vetted[q.requestId] = true;
        const j = SB.Week.addJob(state, 'VET_HISTORY', { requestId: q.requestId });
        if (L.ok(j)) for (let d = 0; d < 7; d++) { if (L.ok(SB.Week.plan(state, j.jobId, d, 'DAY', { by: 'player' }))) break; }
        const contacts = L.arr(SB.Territory.contacts(state)).filter(c => L.num(c.strength) >= 40);
        if (contacts.length) SB.Mail.ask(state, 'CONTACT_VET', contacts[0].id, { requestId: q.requestId });
      });
    },

    // one new band at most; the ranked list is reordered so the booked ones come first
    pickLocals: function (state, SB, show, ranked) {
      const out = []; let unseen = 0;
      const booked = x => L.arr(x.card && x.card.shows).length > 0;
      const g = show && show.id && ranked.length ? null : null;
      const score = x => { let v = x.score; let arrow = null; try { arrow = SB.Trends.arrow(state, x.genre); } catch (e) { arrow = null; } if (arrow === 'UP') v *= 1.1; if (lastTwo(state).indexOf(x.genre) >= 0) v *= .8; if (x.playedOut) v *= .5; return v; };
      ranked.slice().sort((a, b) => score(b) - score(a)).forEach(x => {
        if (out.length >= 3) return;
        if (!booked(x)) { if (unseen >= 1) return; unseen++; }
        out.push(x.bandId);
      });
      return out.length ? out : ranked.slice(0, 3).map(x => x.bandId);
    },

    // free Night hours go to somebody else's show, in the genres it knows least
    afterPlan: function (state, SB, M) {
      const view = SB.Week.view(state);
      const free = L.arr(SB.Jobs.freeJobs(state)).filter(f => f.type === 'GO_TO_SHOW' && f.args && f.args.otherShowId);
      if (!free.length) { debrief(state, SB, M); return; }
      const known = genreCounts(state);
      const rooms = L.arr(SB.Rooms.otherShows(state, state.clock.day, state.clock.day + 7));
      const byId = {}; rooms.forEach(o => { byId[o.id] = o; });
      free.sort((a, b) => {
        const ga = L.arr((byId[a.args.otherShowId] || {}).genres), gb = L.arr((byId[b.args.otherShowId] || {}).genres);
        const ka = ga.reduce((s, g) => s + (known[g] || 0), 0) / Math.max(1, ga.length), kb = gb.reduce((s, g) => s + (known[g] || 0), 0) / Math.max(1, gb.length);
        return ka - kb;
      });
      let went = 0;
      for (let i = 0; i < free.length && went < 1; i++) {
        const o = byId[free[i].args.otherShowId];
        const dayIdx = o ? o.day - state.clock.week * 7 : null;
        if (dayIdx === null || dayIdx < 0 || dayIdx > 6) continue;
        const d = view.days[dayIdx];
        if (!d || (d.cap.NIGHT - d.used.NIGHT) < 3 || M.scouted[o.id]) continue;     // only a free night
        const a = SB.Week.addJob(state, 'GO_TO_SHOW', { otherShowId: o.id });
        if (L.ok(a) && L.ok(SB.Week.plan(state, a.jobId, dayIdx, 'NIGHT', { by: 'player' }))) { M.scouted[o.id] = true; went++; }
      }
      debrief(state, SB, M);
    },

    onClose: function (state, SB, report, M) {
      L.arr(report && report.shows).forEach(id => {
        const sh = SB.Shows.get(state, id);
        const r = sh && sh.result;
        if (r && r.call && r.call.inside === false) M.debrief[id] = true;
      });
    }
  });
}

// a DEBRIEF for any show outside its Call, the week after it (the job is optional)
function debrief(state, SB, M) {
  Object.keys(M.debrief || {}).forEach(id => {
    if (M.debrief[id] === 'done') return;
    // a show is trimmed out of state.shows after 104 weeks and its jobs after 8 (01-state 3): the chance has gone by then
    let sh = null;
    try { sh = SB.Shows.get(state, id); } catch (e) { sh = null; }
    if (!sh || sh.day < state.clock.day - 28) { M.debrief[id] = 'done'; return; }
    const job = L.arr(SB.Jobs.forShow(state, id)).filter(j => j.type === 'DEBRIEF' && j.status === 'TODO')[0];
    if (!job) return;
    for (let d = 0; d < 7; d++) { if (L.ok(SB.Week.plan(state, job.id, d, 'DAY', { by: 'player' }))) { M.debrief[id] = 'done'; break; } }
  });
}

module.exports = make('learner', null);
module.exports.variants = {
  'learner-specialist': make('learner-specialist', 'specialist'),
  'learner-allround': make('learner-allround', 'allround')
};
