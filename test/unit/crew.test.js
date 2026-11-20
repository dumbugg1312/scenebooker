'use strict';
// crew.test — who is paid on a show night now that the player works their own door (the booker: "take out hiring a door
// guy because thats your whole job ... but you do have to hire sound guy and sometimes security", "even event insurance
// once you play bigger places"). On the golden show (test/fixtures/golden.js):
//   * a room that needs security (a bar) or event insurance (here by the per-room override) will not confirm without it;
//   * security halves the damages of a serious incident on the same fixed night, and a fight's sting;
//   * a house show with security scores a little lower than the same show without;
//   * the settle and the exposure have no door line;
//   * an insured serious incident costs the booker nothing extra at the settle; an uninsured one does.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Night', 'Money', 'Model', 'Forecast', 'Notebook', 'Rooms', 'Shows', 'Effects'], 'the crew')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const E = SB.Enums, C = SB.Config;

  /* the golden show taken back to a draft holding its room first in line */
  function draft(roomId) {
    const f = golden.build(SB, { notebook: true });
    const room = f.state.rooms[roomId];
    Object.keys(f.state.rooms).forEach(id => { delete f.state.rooms[id].calendar[f.day]; });
    room.calendar[f.day] = { state: 'HELD', holds: [{ by: 'player', state: 'HELD', since: f.day - 30, expires: f.day, showId: 's1' }] };
    f.show.status = 'DRAFT'; f.show.confirmedDay = null; f.show.roomId = roomId; f.show.zoneId = room.zoneId;
    f.show.door.ages = room.ages[0];
    f.state.money.fund = 2000;
    return f;
  }
  function settled(mutate) {
    const f = golden.build(SB, { notebook: true }); f.withLuck();
    f.show.night = null;
    if (mutate) mutate(f);
    SB.Night.auto(f.state, 's1', { untilSettle: true, settle: 'FAIR' });
    return f;
  }
  const spentOn = (f, cat) => f.state.money.ledger.filter(l => l.showId === 's1' && l.cat === cat && l.amount < 0).reduce((s, l) => s - l.amount, 0);
  const hurt = f => { f.show.mods = Object.assign({}, f.show.mods, { incidents: [{ kind: 'HURT', q: -8, fromEvent: true }] }); };

  H.section(t, 'the rules', () => {
    t.ok(E.MONEY.DOOR_PERSON === undefined && E.SETTLE.DOOR_PERSON === undefined, 'there is no door person to pay: no DOOR_PERSON money or settle line');
    t.ok(E.ROLE.DOOR === undefined && E.ROLE.SECURITY === 'SECURITY', 'a person can do security; nobody is hired for the door');
    t.ok(C.PAY.DOOR === undefined && C.PAY.SECURITY[0] >= 80 && C.PAY.SECURITY[1] <= 120, 'PAY.SECURITY is about $80 to $120, and there is no PAY.DOOR');
    t.eq(SB.Cities.pack({ citySlug: 'pensacola' }).cast.soundRate, 80, 'Pensacola\'s sound person charges $80');
    const f = golden.build(SB, { notebook: true });
    const R = id => SB.Rooms.crewRules(f.state, id, null);
    t.ok(R('r23').security.required, 'a bar needs security');
    t.ok(R('r22').security.required && R('r22').insurance.required, 'a club needs security and event insurance');
    t.ok(!R('r21').security.required && !R('r21').insurance.required, 'a 160-person hall needs neither');
    t.ok(R('r22').insurance.cost > R('r21').insurance.cost, 'insurance costs more for a bigger room');
  });

  H.section(t, 'confirming needs them', () => {
    const f = draft('r23');                                // the bar: a touring band and a local are on the bill
    let r = SB.Rooms.confirm(f.state, 's1');
    t.ok(r && r.ok === false && r.code === 'NEEDS', 'the bar will not confirm without security (' + (r && r.code) + ')');
    t.ok(SB.Shows.view(f.state, 's1').needsToConfirm.some(n => n.k === 'SECURITY' && !n.met), 'the show page lists security as unmet');
    SB.Shows.assignCrew(f.state, 's1', 'security', 'p42');
    r = SB.Rooms.confirm(f.state, 's1');
    t.ok(r && r.ok !== false, 'with security on, the bar confirms' + (r && r.why ? ' (' + r.why + ')' : ''));

    const g = draft('r21');
    g.state.rooms.r21.insurance = true;                    // a pack's per-room override
    r = SB.Rooms.confirm(g.state, 's1');
    t.ok(r && r.ok === false && r.code === 'NEEDS', 'a room that needs insurance will not confirm without it');
    t.eq(spentOn(g, 'INSURANCE'), 0, 'nothing is paid for insurance before it is chosen');
    t.ok(SB.Shows.setInsurance(g.state, 's1', true).ok, 'insurance can be chosen on a draft');
    const cost = SB.Rooms.insuranceCost(g.state, g.state.rooms.r21);
    t.ok(SB.Money.exposure(g.state, 's1').lines.some(l => l.cat === 'INSURANCE' && l.amount === cost), 'the exposure shows the insurance before it is bought');
    r = SB.Rooms.confirm(g.state, 's1');
    t.ok(r && r.ok !== false, 'with insurance chosen, it confirms');
    t.eq(spentOn(g, 'INSURANCE'), cost, 'the insurance is bought when the date confirms ($' + cost + ')');
    t.ok(SB.Shows.setInsurance(g.state, 's1', false).ok === false, 'bought insurance stays bought');
  });

  H.section(t, 'security lowers the cost of an incident', () => {
    const a = settled(hurt), b = settled(g => { hurt(g); g.show.crew.security = 'p42'; });
    const dmg = f => SB.Night.settleView(f.state, 's1').lines.filter(l => l.k === 'DAMAGES').reduce((s, l) => s + l.amount, 0);
    t.ok(dmg(a) > 0, 'someone hurt leaves damages ($' + dmg(a) + ')');
    t.ok(dmg(b) > 0 && dmg(b) < dmg(a), 'security on the same night makes them smaller ($' + dmg(b) + ' against $' + dmg(a) + ')');
    t.ok(SB.Night.settleView(b.state, 's1').lines.some(l => l.k === 'SECURITY' && l.amount === 100), 'security is paid off the top, beside sound');
    // a fight's sting, through the incident machinery (Effects INCIDENT)
    const q = withSec => {
      const f = golden.build(SB, { notebook: true });
      if (withSec) f.show.crew.security = 'p42';
      SB.Effects.apply(f.state, [{ op: 'INCIDENT', kind: 'FIGHT', q: -12 }], { show: 's1', bind: { show: 's1' } });
      return f.show.mods.incidents[f.show.mods.incidents.length - 1].q;
    };
    t.ok(q(true) > q(false), 'a fight costs the night less with security (' + q(true) + ' against ' + q(false) + ')');
  });

  H.section(t, 'a guard at a house show', () => {
    const qOf = withSec => {
      const f = golden.build(SB, { notebook: true });
      f.state.rooms.r21.kind = 'HOUSE';
      if (withSec) f.show.crew.security = 'p42';
      const L = SB.Forecast.lens(f.state, 'TRUTH', { luck: false });
      return SB.Model.resolve(f.state, f.show, L, f.show.mods).night.q;
    };
    const without = qOf(false), withG = qOf(true);
    t.ok(withG < without && without - withG <= 5, 'a house show with security scores a little lower (' + withG + ' against ' + without + ')');
  });

  H.section(t, 'no door line', () => {
    const f = settled();
    const sv = SB.Night.settleView(f.state, 's1');
    t.ok(sv.lines.length && !sv.lines.some(l => /DOOR/.test(l.k)), 'the settle has no door line (' + sv.lines.map(l => l.k).join(' ') + ')');
    const g = golden.build(SB, { notebook: true });
    t.ok(!SB.Money.exposure(g.state, 's1').lines.some(l => /DOOR/.test(l.cat)), 'the exposure has no door line');
    t.ok(!SB.Money.showAccounts(g.state, 's1').offTop.some(l => /door/i.test(l.label)), 'the accounts take nothing off the top for the door');
  });

  H.section(t, 'a save from before loads', () => {
    // a version-1 save: a door person hired on the show, the usual door person, a door ask still out, a door line paid
    const f = golden.build(SB, { notebook: true }), s = JSON.parse(JSON.stringify(f.state));
    s.v = 1;
    s.people.p42.roles = ['DOOR']; s.people.p42.rate = 30; s.people.p42.hid.skill = { DOOR: .9 };
    s.shows.s1.crew = { sound: 'p41', door: 'p42', floor: null, lodging: 'player' }; delete s.shows.s1.insure;
    s.player.usual = { sound: 'p41', door: 'p42', floor: null };
    s.asks = s.asks || {};
    s.asks.a900 = { id: 'a900', kind: 'CREW', toId: 'p42', showId: 's1', status: 'SENT', payload: { showId: 's1', role: 'door', pay: { kind: 'CASH', amount: 30 } } };
    s.money.ledger.push({ day: f.day - 40, amount: -30, cat: 'DOOR_PERSON', memo: 'old', showId: 's0' });
    let r = null;
    try { r = SB.Save.importText(JSON.stringify({ v: 1, state: s })); } catch (e) { t.fail('an old save threw: ' + e.message); return; }
    t.ok(r && r.ok && r.state.v === SB.SAVE_VERSION, 'an old save loads and is brought up to version ' + SB.SAVE_VERSION);
    const m = r.state;
    t.ok(!('door' in m.shows.s1.crew) && m.shows.s1.crew.security === null && m.shows.s1.insure === false, 'the show\'s door person is gone; security and insurance start off');
    t.ok(m.people.p42.roles.indexOf('SECURITY') >= 0 && m.people.p42.roles.indexOf('DOOR') < 0 && m.people.p42.rate >= C.PAY.SECURITY[0], 'the old door person now does security');
    t.ok(m.asks.a900.status === 'WITHDRAWN', 'a door ask still out is withdrawn');
    t.ok(!m.money.ledger.some(l => l.cat === 'DOOR_PERSON'), 'old door pay stays in the ledger, as OTHER');
    t.ok(!('door' in m.player.usual), 'the usual crew has no door person');
    const sv = (() => { try { SB.Night.auto(m, 's1', { untilSettle: true, settle: 'FAIR' }); return SB.Night.settleView(m, 's1'); } catch (e) { t.fail('the migrated show threw: ' + e.message); return null; } })();
    if (sv) t.ok(!sv.lines.some(l => /DOOR/.test(l.k)), 'the migrated show settles with no door line');
  });

  H.section(t, 'insurance pays for a serious incident', () => {
    const plain = settled(hurt);
    const insured = settled(g => { hurt(g); t.ok(SB.Shows.setInsurance(g.state, 's1', true).ok, 'insurance bought on the confirmed show'); });
    const net = f => { const r = SB.Night.settle(f.state, 's1', {}); t.ok(r && r.ok !== false, 'it settles'); return f.state.shows.s1.result.playerNet; };
    const pa = SB.Night.settleView(plain.state, 's1'), pb = SB.Night.settleView(insured.state, 's1');
    const dmg = pa.lines.filter(l => l.k === 'DAMAGES')[0];
    t.ok(dmg && dmg.amount > 0, 'without insurance the damages are a settle line');
    t.ok(pb.lines.some(l => l.k === 'INSURANCE'), 'with insurance, the insurance is its own settle line');
    const prem = spentOn(insured, 'INSURANCE');
    const na = net(plain), nb = net(insured);
    t.eq(spentOn(plain, 'DAMAGES'), dmg.amount, 'uninsured, the booker pays the damages ($' + dmg.amount + ')');
    t.eq(spentOn(insured, 'DAMAGES'), 0, 'insured, the booker pays no damages');
    t.eq(nb + prem - na, dmg.amount, 'insured, the night costs the booker nothing past the premium');
  });
};
