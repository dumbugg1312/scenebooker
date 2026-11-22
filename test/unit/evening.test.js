'use strict';
// evening.test — things to do with the rest of the night (design/spec/12-day-activities.md), through SB.Evening only:
//   * every evening offers the eleven: six at home, five out (a show, or the open mic when none is on), each with its
//     hours, plain words and the benefit it gives;
//   * pressing one does it on the spot: its hours come off tonight's clock and its benefit lands at once;
//   * refusals: not enough time (nothing changes), once a night, once a week, a shift on a work night, the night called;
//   * the same thing again inside a week gives half, then a quarter, and the list says so before the tap;
//   * going to bed early ends the night and tomorrow has an extra hour; a run makes tomorrow's work a zone steadier.
const H = require('../helpers.js');

module.exports = function (t) {
  const NEED = ['Game', 'Week', 'Jobs', 'Mail', 'Money', 'Stress', 'Rooms', 'Bands', 'People', 'Notebook', 'Crowd', 'Territory', 'Evening'];
  if (!H.needs(t, NEED, 'the evening activities')) return;
  const SB = H.fresh({ packs: ['pensacola'], text: true });
  const C = SB.Config;
  const tonight = s => SB.Week.tonight(s);
  const item = (s, id) => SB.Evening.list(s).filter(v => v.id === id)[0];
  const ofType = (s, type) => SB.Evening.list(s).filter(v => v.type === type);
  function toEvening(s) {
    for (let g = 0; g < 80; g++) {
      const st = s.clock.stop;
      if (st && st.kind === 'EVENING') return st;
      const r = SB.Week.step(s);
      if (r.stop && r.stop.kind === 'DECISION') SB.Week.decide(s, r.stop.decision.id, r.stop.decision.options.filter(o => o.enabled !== false)[0].id);
      else if (r.stop && r.stop.kind === 'SHOW_NIGHT') SB.Night.auto(s, r.stop.showId, { settle: 'FAIR' });
      else if (r.stop && r.stop.kind === 'END_OF_WEEK') { SB.Week.close(s); const rep = s.week.report; if (rep && rep.bills) SB.Week.payBills(s, {}); SB.Week.nextWeek(s); }
    }
    return null;
  }
  const next = s => { SB.Week.endNight(s); return toEvening(s); };
  const game = seed => { const s = H.newGame(SB, { seed: seed, tutorial: false }); toEvening(s); return s; };

  H.section(t, 'the list: eleven things, at home and out', () => {
    const s = game('eve-list');
    const L = SB.Evening.list(s);
    const types = Array.from(new Set(L.map(v => v.type)));
    t.eq(types.filter(x => ['JOURNAL', 'WORKOUT', 'BED_EARLY', 'POST_PAGE', 'DIG_BANDS', 'STICKERS'].indexOf(x) >= 0).length, 6, 'six at home');
    t.ok(types.indexOf('SHOW') >= 0 || types.indexOf('OPEN_MIC') >= 0, 'a show to go to, or the open mic when nothing is on');
    ['DROP_BY', 'MARKET', 'FRIENDS', 'SHIFT'].forEach(x => t.ok(types.indexOf(x) >= 0, x + ' is offered'));
    t.ok(L.every(v => v.label && v.benefit), 'every one has a button label and a benefit line');
    t.ok(L.every(v => !/[A-Z]{2,}_/.test(v.label + v.benefit)), 'no game ids in the words');
    t.eq(L.filter(v => v.where === 'HOME').length, 6, 'six at home');
    const firstOut = L.findIndex(v => v.where === 'OUT');
    t.ok(L.slice(firstOut).every(v => v.where === 'OUT'), 'at home first, then out');
    t.eq(item(s, 'JOURNAL').hours, 0.5, 'the journal is half an hour');
    t.eq(item(s, 'WORKOUT').hours, 1, 'a run is an hour');
    t.eq(item(s, 'STICKERS').hours, 2, 'stickers are two hours');
    t.eq(item(s, 'SHIFT').hours, 6, 'a shift is six');
  });

  H.section(t, 'doing one takes its hours and gives its benefit', () => {
    const s = game('eve-do');
    const left = tonight(s).left, st = s.player.stress;
    const r = SB.Evening.doIt(s, 'JOURNAL');
    t.ok(r.ok !== false, 'journal: done');
    t.eq(tonight(s).left, left - 0.5, 'half an hour off tonight');
    t.ok(s.player.stress < st, 'stress is down');
    t.ok(typeof r.text === 'string' && r.text.length > 0, 'it says what happened');
    t.ok((s.week.log || []).some(x => x.t === 'EVENING' && x.act === 'JOURNAL'), 'the day log has it');
    const again = SB.Evening.doIt(s, 'JOURNAL');
    t.eq(again.code, 'ALREADY', 'once a night');

    const f = s.player.followers;
    t.ok(SB.Evening.doIt(s, 'POST_PAGE').ok !== false, 'a post: done');
    t.eq(s.player.followers, f + C.EVENING.POST_PAGE.followers, 'followers up');

    const nbKey = Object.keys(s.notebook.est).filter(k => /^draw:/.test(k));
    const before = nbKey.filter(k => s.notebook.est[k].n).length;
    t.ok(SB.Evening.doIt(s, 'DIG_BANDS').ok !== false, 'digging: done');
    t.ok(nbKey.filter(k => s.notebook.est[k].n).length > before, 'a local band is in the notebook now');
  });

  H.section(t, 'not enough time: refused, nothing changes', () => {
    const s = game('eve-time');
    SB.Week.spend(s, tonight(s).left);
    const st = s.player.stress, left = tonight(s).left;
    const r = SB.Evening.doIt(s, 'FRIENDS');
    t.eq(r.code, 'NO_TIME', 'two hours do not fit an hour of staying up');
    t.ok(/time/i.test(r.why), 'and it says why');
    t.eq([s.player.stress, tonight(s).left], [st, left], 'nothing was spent or eased');
    t.eq(item(s, 'FRIENDS').ok, false, 'the list says so before the tap');
  });

  H.section(t, 'again inside a week: half, then a quarter', () => {
    const s = game('eve-repeat');
    const f0 = s.player.followers;
    SB.Evening.doIt(s, 'POST_PAGE');
    const one = s.player.followers - f0;
    next(s);
    t.ok(item(s, 'POST_PAGE').factor === 0.5 && item(s, 'POST_PAGE').note, 'the next night it says half as much');
    const f1 = s.player.followers;
    SB.Evening.doIt(s, 'POST_PAGE');
    t.eq(s.player.followers - f1, Math.round(one / 2), 'and gives half');
    next(s);
    t.eq(item(s, 'POST_PAGE').factor, 0.25, 'a third time: a quarter');
  });

  H.section(t, 'once a week: stickers and dropping by', () => {
    const s = game('eve-week');
    const money = s.money.fund + (s.money.bank || 0), word = s.town.word, regs = s.regulars.total || 0;
    t.ok(SB.Evening.doIt(s, 'STICKERS').ok !== false, 'stickers: done');
    t.eq(s.money.fund + (s.money.bank || 0), money - item(s, 'STICKERS').cost, 'they cost about $15');
    t.ok(s.town.word > word, 'word of mouth up');
    t.ok((s.regulars.total || 0) > regs, 'a few regulars');
    next(s);
    t.eq(SB.Evening.doIt(s, 'STICKERS').code, 'ALREADY', 'not again this week');
    const drop = ofType(s, 'DROP_BY')[0];
    if (!drop) { t.note('no known room to drop by'); return; }
    const room = s.rooms[drop.id.split(':')[1]], rel = room.ownerRel;
    const r = SB.Evening.doIt(s, drop.id);
    t.ok(r.ok !== false, 'dropping by: done');
    t.eq(room.ownerRel, rel + C.EVENING.DROP_BY.ownerRel, 'the owner likes you more');
    t.eq(SB.Evening.doIt(s, drop.id).code, 'ALREADY', 'once a week per room');
  });

  H.section(t, 'bed early: the night ends, tomorrow has an extra hour', () => {
    const s = game('eve-bed');
    const capTomorrow = SB.Week.view(s).days[1].cap;
    const st = s.player.stress;
    const r = SB.Evening.doIt(s, 'BED_EARLY');
    t.ok(r.ok !== false && r.callNight === true, 'done, and it asks for the night to be called');
    t.ok(s.player.stress < st, 'a little less stress');
    t.eq(s.player.rested, { day: tonight(s).day + 1, hours: 1 }, 'rested for tomorrow');
    next(s);
    const n = tonight(s);
    t.eq(n.cap, capTomorrow.DAY + capTomorrow.NIGHT + 1, 'tomorrow has an extra hour');
  });

  H.section(t, 'a run: tomorrow is a zone steadier', () => {
    const s = game('eve-run');
    SB.Evening.doIt(s, 'WORKOUT');
    t.eq(SB.Evening.steadier(s, 'STRETCHED'), 'STRETCHED', 'not tonight');
    next(s);
    t.eq(SB.Evening.steadier(s, 'STRETCHED'), 'STEADY', 'tomorrow a stretched booker works like a steady one');
    t.eq(SB.Evening.steadier(s, 'FRIED'), 'STRETCHED', 'and a fried one like a stretched one');
  });

  H.section(t, 'out: friends, the market, the open mic or a show', () => {
    const s = game('eve-out');
    const HELP = ['SOUND', 'SECURITY', 'FLOOR', 'RUNNER', 'ARTIST', 'LODGING'];
    const circle = Object.keys(s.people).filter(k => s.people[k].rel != null && (s.people[k].roles || []).some(r => HELP.indexOf(r) >= 0));
    t.ok(circle.length > 0, 'there are friends who help (sound, security...) at the start');
    const rels = circle.map(id => s.people[id].rel), st = s.player.stress;
    t.ok(SB.Evening.doIt(s, 'FRIENDS').ok !== false, 'friends: done');
    t.ok(s.player.stress < st, 'stress down');
    t.ok(circle.every((id, i) => s.people[id].rel > rels[i]), 'friends like you more, so they say yes more');
    next(s);
    const met = Object.keys(s.people).filter(k => s.people[k].rel != null).length;
    const regs = s.regulars.total || 0;
    t.ok(SB.Evening.doIt(s, 'MARKET').ok !== false, 'the market: done');
    t.ok(Object.keys(s.people).filter(k => s.people[k].rel != null).length > met || (s.regulars.total || 0) > regs, 'someone new, or regulars');
    next(s);
    const show = ofType(s, 'SHOW')[0], mic = item(s, 'OPEN_MIC');
    t.ok(!!show !== !!mic, 'a show when one is on, else the open mic');
    const st2 = s.player.stress, left = tonight(s).left;
    const r = SB.Evening.doIt(s, show ? show.id : 'OPEN_MIC');
    t.ok(r.ok !== false, (show ? 'the show' : 'the open mic') + ': done');
    t.eq(tonight(s).left, left - (show ? 3 : 2), 'it takes its hours');
    t.ok(s.player.stress < st2, 'and eases stress');
  });

  H.section(t, 'a show in town: the old GO_TO_SHOW, done tonight', () => {
    const s = game('eve-show');
    let show = null, g = 0;
    while (!(show = ofType(s, 'SHOW')[0]) && g++ < 28) next(s);
    if (!show) { t.note('no show in town in four weeks on this seed'); return; }
    t.eq(item(s, 'OPEN_MIC'), undefined, 'no open mic on a night with a show');
    const left = tonight(s).left, n = Object.keys(s.jobs).length;
    const r = SB.Evening.doIt(s, show.id);
    t.ok(r.ok !== false, 'going: done');
    t.eq(tonight(s).left, Math.max(0, left - 3), 'three hours');
    const j = Object.keys(s.jobs).map(k => s.jobs[k]).filter(x => x.type === 'GO_TO_SHOW');
    t.ok(j.length === 1 && j[0].status === 'DONE', 'it is the GO_TO_SHOW job, done');
    t.ok(Object.keys(s.jobs).length === n + 1, 'one job made');
    t.ok(!/at a show in town|undefined/.test(r.text), 'it says where you went in plain words');
  });

  H.section(t, 'a shift: days off only, a day\'s pay', () => {
    const s = game('eve-shift');
    t.eq(SB.Evening.doIt(s, 'SHIFT').code, 'WINDOW', 'not on a work night');
    let g = 0;
    while (!tonight(s).off && g++ < 8) next(s);
    if (!tonight(s).off) { t.fail('no day off came'); return; }
    const money = s.money.fund + (s.money.bank || 0), left = tonight(s).left;
    const r = SB.Evening.doIt(s, 'SHIFT');
    t.ok(r.ok !== false, 'a shift on a day off: done');
    t.eq(s.money.fund + (s.money.bank || 0), money + 88, 'Pensacola pays $88');
    t.eq(tonight(s).left, left - 6, 'six hours');
  });

  H.section(t, 'the night called: nothing more tonight', () => {
    const s = game('eve-called');
    SB.Week.endNight(s);
    t.eq(SB.Evening.doIt(s, 'JOURNAL').code, 'PHASE', 'refused once the night is called');
  });
};
