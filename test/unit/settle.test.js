'use strict';
// settle.test — 06-harness section 3, `settle.test`, from 02-engine 7.11 and mechanics 8.1 / 8.2.
// The test carries its own small settle calculator, written from 7.11, and checks the engine against it on the golden show:
//   * the worked accounts of 8.1 come to $142 in hand +- $5 (checked on the calculator, then on the engine at the door the night produced);
//     the player works the door, so nobody is paid for it (it was a $30 line, $127 in hand);
//   * each deal shape pays in the order ROOM, SOUND, SECURITY, HOST, GUARANTEE, LOCAL, SHARE, INSURANCE, DAMAGES, COSTS, YOU,
//     and no settle has a door line;
//   * no line is negative, even when the costs off the top are more than the door;
//   * breakEven is null at a price of 0 and for a donation door;
//   * each SHORTFALL option settles and applies its effects; a guarantee can be offered and settled at stage 1.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

// 7.11 for the golden show's hall: rent 225, sound $60 (no door person: the player works the door; no security: the hall
// is under C.SECURITY.hallCap), a $150 guarantee plus half of what is left, opener $20 gas, closer $60, the player's own costs $56.
function calc(deal, paid, price, hat) {
  const G = paid * price + (hat || 0), off = 225 + 60, locals = 80, costs = 56, PLUS = 0.5;
  let touring = 0, plusShare = 0;
  const rest = Math.max(0, G - off);
  switch (deal.shape) {
    case 'DOOR': touring = deal.pct * Math.max(0, deal.afterCosts ? G - off : G); break;
    case 'GUARANTEE': touring = deal.guarantee; break;
    case 'GUARANTEE_PLUS': touring = deal.guarantee; break;
    case 'VERSUS': touring = Math.max(deal.guarantee, deal.pct * Math.max(0, G - off)); break;
    case 'HAT': touring = deal.pct * Math.max(0, G - off); break;
  }
  const left = Math.max(0, G - off - touring - locals);
  if (deal.shape === 'GUARANTEE_PLUS') plusShare = Math.floor(PLUS * left);
  const player = Math.max(0, left - plusShare) - costs;
  return { G: G, off: off, touring: touring + plusShare, locals: locals, left: left, plusShare: plusShare, player: player, gap: Math.max(0, off + touring + locals - G) };
}

module.exports = function (t) {
  // the calculator against mechanics 8.1: 91 paid at $10, $150 plus half of what is left
  const w = calc({ shape: 'GUARANTEE_PLUS', guarantee: 150, pct: .5 }, 91, 10, 0);
  t.eq(w.G, 910, 'the door is $910');
  t.eq(w.left, 395, 'after the room, sound, the guarantee and the locals $395 is left');
  t.eq(w.plusShare, 197, 'the touring band\'s half of what is left is $197');
  t.near(w.player, 142, 5, 'the worked accounts come to $142 in hand');
  const late = calc({ shape: 'GUARANTEE_PLUS', guarantee: 150, pct: .5 }, 33, 10, 0);   // the same show promoted from 8 days out
  t.near(late.off + 150 + 80 + 56 - late.G, 286 - 15 + 15 - 0, 300, 'promoted from 8 days out the player is deep out of pocket (about $241)');

  if (!H.needs(t, ['Night', 'Money', 'Model', 'Forecast', 'Notebook'], 'settling')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const E = SB.Enums, C = SB.Config;
  const ORDER = ['ROOM', 'SOUND', 'SECURITY', 'HOST', 'GUARANTEE', 'LOCAL', 'SHARE', 'INSURANCE', 'DAMAGES', 'COSTS', 'YOU'];
  const clone = x => JSON.parse(JSON.stringify(x));

  function toSettle(mutate) {
    const f = golden.build(SB, { notebook: true }); f.withLuck();
    f.show.night = null;                                  // let Night.begin store its own
    if (mutate) mutate(f);
    SB.Night.auto(f.state, 's1', { untilSettle: true, settle: 'FAIR' });
    return f;
  }

  H.section(t, 'engine against the calculator', () => {
    const f = toSettle();
    const sv = SB.Night.settleView(f.state, 's1');
    t.ok(sv && sv.lines && sv.lines.length, 'the settle view has lines');
    const ks = sv.lines.map(l => ORDER.indexOf(l.k));
    t.ok(ks.every((v, i) => v >= 0 && (i === 0 || v >= ks[i - 1])), 'lines come in the order ' + ORDER.join(', ') + ' (' + sv.lines.map(l => l.k).join(' ') + ')');
    t.ok(!sv.lines.some(l => /DOOR/.test(l.k)), 'no settle line pays anyone for the door');
    t.ok(sv.lines.every(l => l.amount >= 0), 'no line is negative');
    const exp = calc(f.show.deal, sv.door.paid, sv.door.price, sv.door.hat);
    const line = k => sv.lines.filter(l => l.k === k).reduce((s, l) => s + l.amount, 0);
    t.near(line('ROOM'), 225, 1, 'the hall is $225');
    t.near(line('GUARANTEE'), 150, 1, 'the guarantee is $150');
    t.near(line('LOCAL'), exp.locals, 1, 'the locals are paid as agreed ($80)');
    t.near(sv.left, exp.left, 2, 'what is left after the off-the-top, the guarantee and the locals');
    t.near(line('SHARE'), exp.plusShare, 2, 'the touring band\'s half of what is left');
    t.near(sv.gap, exp.gap, 1, 'gap');
  });

  H.section(t, 'each deal shape', () => {
    Object.keys(E.DEAL).forEach(shape => {
      const f = toSettle(g => { g.show.deal = Object.assign({}, g.show.deal, { shape: shape, guarantee: shape === 'DOOR' || shape === 'HAT' ? 0 : 150, pct: shape === 'DOOR' ? .7 : .5 }); });
      const sv = SB.Night.settleView(f.state, 's1');
      t.ok(sv.lines.every(l => l.amount >= 0 && isFinite(l.amount)), shape + ': no line is negative or not finite');
      const ks = sv.lines.map(l => ORDER.indexOf(l.k));
      t.ok(ks.every((v, i) => v >= 0 && (i === 0 || v >= ks[i - 1])), shape + ': lines are in settle order');
      const exp = calc(f.show.deal, sv.door.paid, sv.door.price, sv.door.hat);
      const touring = sv.lines.filter(l => l.k === 'GUARANTEE' || l.k === 'SHARE').reduce((s, l) => s + l.amount, 0);
      t.near(touring, exp.touring, 3, shape + ': the touring band is paid as 7.11 says');
      const r = SB.Night.settle(f.state, 's1', { shortfall: null, keep: Math.max(0, sv.split.fairMax), extraToLocals: 0, gas: 0 });
      t.ok(r && r.ok !== false, shape + ': the night settles');
      t.eq(f.state.shows.s1.status, 'PLAYED', shape + ': the show is PLAYED after settle');
    });
  });

  H.section(t, 'costs more than the door', () => {
    const f = toSettle(g => { g.show.door.price = 1; });
    const sv = SB.Night.settleView(f.state, 's1');
    t.ok(sv.lines.every(l => l.amount >= 0), 'no line is negative when the costs off the top exceed the door');
    t.ok(sv.gap > 0, 'there is a gap to cover (' + sv.gap + ')');
    t.ok(Array.isArray(sv.shortfall) && sv.shortfall.length >= 1, 'the shortfall ladder is offered');
    t.ok(sv.shortfall.every(s => E.SHORTFALL[s.k] && typeof s.covers === 'number'), 'each shortfall option is a SHORTFALL with what it covers');
    ['POCKET', 'ASK_LESS', 'LOCALS_GIVE', 'HAT', 'SHORT_SILENT', 'OFF_RENT'].forEach(k => {
      const g = toSettle(h => { h.show.door.price = 1; });
      const v = SB.Night.settleView(g.state, 's1');
      const opt = v.shortfall.filter(s => s.k === k)[0];
      if (!opt || opt.enabled === false) { t.note('settle: shortfall ' + k + ' is not offered here' + (opt && opt.why ? ' (' + opt.why + ')' : '')); return; }
      const before = JSON.stringify([g.state.money.fund, g.state.money.bank]);
      const r = SB.Night.settle(g.state, 's1', { shortfall: k, keep: 0, extraToLocals: 0, gas: 0 });
      t.ok(r && r.ok !== false, 'shortfall ' + k + ' settles');
      t.eq(g.state.shows.s1.status, 'PLAYED', 'shortfall ' + k + ': PLAYED');
      if (k === 'POCKET') t.ok(JSON.stringify([g.state.money.fund, g.state.money.bank]) !== before, 'POCKET takes the gap from the fund or the bank');
      t.eq(H.jsonIssues(g.state), [], 'shortfall ' + k + ': state is JSON-safe afterwards');
    });
  });

  H.section(t, 'break-even', () => {
    const f = golden.build(SB, { notebook: true });
    f.show.door.price = 0;
    t.eq(SB.Money.exposure(f.state, 's1').breakEven, null, 'breakEven is null at a price of 0');
    const g = golden.build(SB, { notebook: true }); g.show.door.donation = true; g.show.door.suggested = 7;
    t.eq(SB.Money.exposure(g.state, 's1').breakEven, null, 'breakEven is null for a donation door');
    const h = golden.build(SB, { notebook: true });
    const ex = SB.Money.exposure(h.state, 's1');
    t.ok(ex.total >= 150 + 225, 'exposure holds at least the guarantee and the rent (' + ex.total + ')');
    t.eq(ex.breakEven, Math.ceil(ex.total / 10) + 9, 'breakEven is ceil(total / price) plus the comps');
    t.ok(ex.lines.some(l => /guarantee/i.test(l.label) || l.cat === 'TOURING'), 'exposure lists the guarantee');
  });

  H.section(t, 'a guarantee at stage 1', () => {
    const f = golden.build(SB, { notebook: true }); f.state.player.stage = 1; f.show.deal.shape = 'GUARANTEE'; f.show.deal.guarantee = 150;
    t.ok(SB.Money.exposure(f.state, 's1').total >= 150, 'a guarantee shows in the exposure at stage 1');
    SB.Night.auto(f.state, 's1', { untilSettle: true, settle: 'FAIR' });
    const sv = SB.Night.settleView(f.state, 's1');
    t.ok(sv.lines.some(l => l.k === 'GUARANTEE' && l.amount > 0), 'a guarantee is settled at stage 1');
  });
};
