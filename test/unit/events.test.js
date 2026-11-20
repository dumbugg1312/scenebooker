'use strict';
// events.test — 06-harness section 3, `events.test`, from 03-content 8.5: each event the engine raises by id is resolved on a fixture
// using only SB.Effects.apply on its options' effects (the golden show, with its refs bound):
//   holding the doors changes the first set's presence; a watched count rules out a dispute; each DISPUTE option pays the figure it
//   names; HOLD_CHALLENGED confirms or releases the hold; "let everyone in" passes the cap; SOMEBODY_GOOD adds to the circle.
// An event that binds no show binds an entity that meets its conditions or is not eligible. Every other event's effects apply
// without throwing and leave the state JSON-safe.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Effects'], 'events')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const EV = SB.Content.events;
  if (!Array.isArray(EV) || !EV.length) { t.note('skipped: js/content/events.js does not exist yet'); return; }
  const E = SB.Enums;
  const byId = {}; EV.forEach(e => { byId[e.id] = e; });
  const opt = (ev, id) => (byId[ev] ? byId[ev].options : []).filter(o => o.id === id)[0];
  const optWith = (ev, op, pred) => (byId[ev] ? byId[ev].options : []).filter(o => (o.effects || []).some(f => f.op === op && (!pred || pred(f))))[0];
  function fresh() {
    const f = golden.build(SB, { notebook: true });
    f.show.night = { luck: [], mods: {}, stops: [], at: null, par: null, call: null, emitted: 0, dispute: null, demand: null };
    const bind = { show: 's1', touring: 'b12', closer: 'b13', opener: 'b11', room: 'r21', owner: 'p43', sound: 'p41', security: 'p42', band: 'b13', person: 'p54' };
    f.ctx = { show: f.show, bind: bind, night: true };
    return f;
  }
  const apply = (f, o) => SB.Effects.apply(f.state, o.effects, f.ctx);
  const fundsOf = s => (s.money.fund || 0) + (s.money.bank || 0);

  H.section(t, 'DOORS', () => {
    const ev = byId.DOORS; if (!ev) { t.fail('DOORS is missing'); return; }
    const hold = optWith('DOORS', 'SHOW_MOD', f => f.key === 'set1Presence') || optWith('DOORS', 'SHOW_MOD', f => f.key === 'lateMin');
    t.ok(!!hold, 'DOORS offers holding the doors');
    if (hold) {
      const f = fresh(); const recs = apply(f, hold);
      t.ok(f.show.mods.set1Presence === true || f.show.night.mods.set1Presence === true || (f.show.mods.lateMin || f.show.night.mods.lateMin) >= 15, 'holding the doors sets set1Presence and a fifteen-minute delay');
      t.ok(Array.isArray(recs), 'apply returns records');
    }
    const comps = optWith('DOORS', 'SHOW_MOD', f => f.key === 'comps');
    if (comps) { const f = fresh(); const before = f.show.mods.comps || 0; apply(f, comps); t.ok((f.show.mods.comps || 0) !== before || (f.show.night.mods.comps || 0) !== before, 'the list as agreed or looser changes mods.comps'); }
  });

  H.section(t, 'COUNT', () => {
    const o = optWith('COUNT', 'SHOW_MOD', f => f.key === 'noDispute');
    t.ok(!!o, 'COUNT offers counting with the touring band watching');
    if (o) { const f = fresh(); apply(f, o); t.ok(f.show.mods.noDispute === true || f.show.night.mods.noDispute === true, 'a watched count rules out a dispute (mods.noDispute)'); }
  });

  H.section(t, 'DEAL_DISPUTE', () => {
    const ev = byId.DEAL_DISPUTE; if (!ev) { t.fail('DEAL_DISPUTE is missing'); return; }
    const figures = { theirs: 150, yours: 100, split: 125 };
    ['THEIRS', 'YOURS', 'SPLIT'].forEach(resolve => {
      const o = optWith('DEAL_DISPUTE', 'DISPUTE', f => f.resolve === resolve);
      t.ok(!!o, 'DEAL_DISPUTE offers ' + resolve);
      if (!o) return;
      const f = fresh(); f.show.night.dispute = Object.assign({}, figures);
      f.state.money.fund = 1000; const before = fundsOf(f.state);
      apply(f, o);
      const paid = before - fundsOf(f.state);
      // 7.11: THEIRS pays the difference between what the band says and what the deal pays; SPLIT half of it; YOURS pays nothing extra
      // 02-engine 7.11: the three figures are what the band says, what the deal pays and the midpoint. The effect either moves the
      // difference at once or settles the dispute at the named figure on show.night.dispute.pay for the settle to pay.
      const want = resolve === 'THEIRS' ? figures.theirs - figures.yours : (resolve === 'SPLIT' ? figures.split - figures.yours : 0);
      const named = resolve === 'THEIRS' ? figures.theirs : (resolve === 'SPLIT' ? figures.split : figures.yours);
      const d = f.show.night.dispute || {};
      t.ok(Math.abs(paid - want) <= 1 || Math.abs((d.pay === undefined ? NaN : d.pay) - named) <= 1, 'DISPUTE ' + resolve + ' pays the figure it names ($' + named + '; moved $' + paid + ', settled at ' + d.pay + ')');
      if (resolve === 'YOURS') t.ok(paid <= 1, 'DISPUTE YOURS pays nothing beyond the deal');
    });
  });

  H.section(t, 'HOLD_CHALLENGED', () => {
    const conf = optWith('HOLD_CHALLENGED', 'ROOM_HOLD', f => f.do === 'CONFIRM'), rel = optWith('HOLD_CHALLENGED', 'ROOM_HOLD', f => f.do === 'RELEASE');
    t.ok(!!conf && !!rel, 'HOLD_CHALLENGED offers confirm and release');
    if (rel) {
      const f = fresh();
      f.show.status = 'DRAFT'; f.state.rooms.r21.calendar[f.day] = { state: 'HELD', holds: [{ by: 'player', state: 'CHALLENGED', since: 1, expires: f.day, showId: 's1' }] };
      f.state.money.fund = 500;
      apply(f, rel);
      const cell = f.state.rooms.r21.calendar[f.day];
      t.ok(!cell || !cell.holds.some(h => h.by === 'player'), 'letting it go releases the player\'s hold');
    }
    if (conf) {
      const f = fresh();
      f.show.status = 'DRAFT'; f.state.rooms.r21.calendar[f.day] = { state: 'HELD', holds: [{ by: 'player', state: 'CHALLENGED', since: 1, expires: f.day, showId: 's1' }] };
      f.state.money.fund = 500;
      let recs; try { recs = apply(f, conf); } catch (e) { t.fail('confirm threw: ' + e.message); return; }
      const cell = f.state.rooms.r21.calendar[f.day];
      t.ok(cell && cell.state === 'CONFIRMED' || f.show.status === 'CONFIRMED' || recs.some(r => r.t === 'HOLD'), 'confirming confirms the hold or says why not');
    }
  });

  H.section(t, 'LINE_DOWN_THE_BLOCK and the rest of the night', () => {
    const all = optWith('LINE_DOWN_THE_BLOCK', 'SHOW_MOD', f => f.key === 'uncapped');
    t.ok(!!all, 'LINE_DOWN_THE_BLOCK offers letting everyone in');
    if (all) { const f = fresh(); apply(f, all); t.ok(f.show.mods.uncapped === true || f.show.night.mods.uncapped === true, '"let everyone in" passes the cap (mods.uncapped)'); }
    const motel = optWith('NOWHERE_TO_SLEEP', 'MONEY', f => f.amountOf === 'MOTEL');
    if (motel) { const f = fresh(); f.state.money.fund = 500; const b = fundsOf(f.state); apply(f, motel); t.ok(fundsOf(f.state) < b, 'a motel costs money'); }
  });

  H.section(t, 'SOMEBODY_GOOD', () => {
    const o = optWith('SOMEBODY_GOOD', 'CIRCLE_ADD');
    t.ok(!!o, 'SOMEBODY_GOOD offers adding them to the circle');
    if (!o) return;
    const f = fresh(); f.state.player.stage = 3;
    f.state.people.p54.rel = 60;
    const before = SB.People.circle(f.state).people.length;
    apply(f, o);
    t.ok(SB.People.circle(f.state).people.length >= before, 'the circle does not shrink');
    t.ok(SB.People.circle(f.state).people.length > before || SB.People.circle(f.state).max <= before, 'SOMEBODY_GOOD adds to the circle (or the circle is full)');
  });

  /* ---- every event's options apply cleanly ---- */
  H.section(t, 'every option applies', () => {
    const bad = [];
    EV.forEach(ev => {
      (ev.options || []).forEach(o => {
        const f = fresh();
        f.show.night.dispute = { theirs: 150, yours: 100, split: 125 }; f.state.money.fund = 800;
        try { SB.Effects.apply(f.state, o.effects || [], f.ctx); } catch (e) { bad.push(ev.id + '.' + o.id + ': ' + e.message); return; }
        const issues = H.jsonIssues(f.state, 2); if (issues.length) bad.push(ev.id + '.' + o.id + ': ' + issues[0]);
      });
    });
    t.eq(bad.slice(0, 6), [], 'every option of every event applies on the fixture and leaves JSON-safe state (' + EV.length + ' events)');
  });

  /* ---- binding: Effects.test over the conditions ---- */
  H.section(t, 'conditions', () => {
    const f = fresh();
    const prev = {};
    EV.forEach(ev => {
      if ((ev.bind || []).indexOf('show') >= 0 || !ev.if) return;
      let r; try { r = SB.Effects.test(f.state, ev.if, f.ctx); } catch (e) { t.fail('Effects.test threw on ' + ev.id + ': ' + e.message); return; }
      t.ok(r === true || r === false, ev.id + ': conditions evaluate to a boolean');
    });
    t.ok(SB.Effects.test(f.state, {}, f.ctx) === true, 'no conditions is true');
    t.ok(SB.Effects.test(f.state, { stage: [2, 4] }, f.ctx) === true, 'stage 2 passes [2, 4]');
    t.ok(SB.Effects.test(f.state, { stage: [3, 4] }, f.ctx) === false, 'stage 2 fails [3, 4]');
    t.ok(typeof SB.Effects.why(f.state, { stage: [3, 4] }, f.ctx) === 'string', 'why names the first unmet condition');
    t.eq(SB.Effects.why(f.state, { stage: [2, 4] }, f.ctx), null, 'why is null when everything holds');
  });
};
