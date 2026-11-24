'use strict';
// breakeven-settle.test — fix list 1.5. The break-even shown at the offer (Forecast.breakEven) must be the head count at which the
// real settle (Night.settleView, the same figure() the settle pays out of) leaves the player at even, once what was spent before the
// night is counted. At the break-even the player is within a few dollars of even; one more paying person puts them up, one fewer down.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Night', 'Money', 'Model', 'Forecast', 'Notebook', 'Rooms'], 'break-even against the settle')) return;
  const SB = H.fresh({ packs: ['pensacola'] });

  // the night played with exactly n paying people at the door; the player's net from the settle view (costs before the night included)
  function netAt(f, n) {
    f.show.night = null;
    SB.Night.auto(f.state, 's1', { untilSettle: true, settle: 'FAIR' });
    const o = f.show.night.outcome || (f.show.night.outcome = {}), price = f.show.door.price;
    o.paid = n; o.heads = n; o.comps = 0; o.gross = Math.round(n * price); o.hat = 0; o.turnedAway = 0;
    const sv = SB.Night.settleView(f.state, 's1');
    return { net: sv.net, gap: sv.gap, sv: sv };
  }
  // do what breakEven said was still to come, the way the game does: hire the usual sound person at the rate guessed, and pay for
  // printing, pushes, food and insurance into the ledger, so the settle sees every cost
  function payPlanned(f, b) {
    (b.extras || []).forEach(x => {
      if (x.k === 'SOUND') {
        f.state.people.p_sound = Object.assign({}, f.state.people.p41, { id: 'p_sound', rate: x.amount });
        f.show.crew.sound = 'p_sound';
        return;
      }
      f.state.money.bank += x.amount; SB.Money.spend(f.state, x.amount, x.k, '', { showId: 's1' });
    });
    // a job that has been done is paid for in the ledger and no longer a plan
    Object.keys(f.state.jobs || {}).forEach(id => { if (f.state.jobs[id].showId === 's1') f.state.jobs[id].status = 'DONE'; });
    f.state.week.plan = [];
  }

  const SCENES = {
    'guarantee plus (golden)': f => {},
    'door deal 70%': f => { f.show.deal = Object.assign({}, f.show.deal, { shape: 'DOOR', guarantee: 0, pct: .7 }); },
    'guarantee only': f => { f.show.deal = Object.assign({}, f.show.deal, { shape: 'GUARANTEE', guarantee: 150 }); },
    'versus': f => { f.show.deal = Object.assign({}, f.show.deal, { shape: 'VERSUS', guarantee: 100, pct: .6 }); },
    'door after costs': f => { f.show.deal = Object.assign({}, f.show.deal, { shape: 'DOOR', guarantee: 0, pct: .6, afterCosts: false }); },
    'no sound hired, room sound fee': f => { f.show.crew.sound = null; f.state.rooms.r21.soundFee = 60; },
    'paid sound $80': f => { f.state.people.p41.rate = 80; },
    'house, free PA': f => {
      const r = f.state.rooms.r21; r.kind = 'HOUSE'; r.rent = 0; r.soundFee = 0; r.hostCut = 0; f.show.crew.sound = null;
      f.show.deal = Object.assign({}, f.show.deal, { shape: 'DOOR', guarantee: 0, pct: .6 });
    },
    'print and food on the ledger': f => {
      f.state.money.bank += 200;
      SB.Money.spend(f.state, 25, 'PRINT', '', { showId: 's1' }); SB.Money.spend(f.state, 28, 'FOOD', '', { showId: 's1' });
    },
    'food promised, not yet bought': f => { f.show.deal = Object.assign({}, f.show.deal, { meal: true }); },
    'insurance required, not bought': f => { f.state.rooms.r21.insurance = true; },
    'planned print run and paid push': f => {
      f.state.jobs.j_print = { id: 'j_print', showId: 's1', type: 'PRINT', status: 'PLANNED', key: '', opt: 'BIG' };
      f.state.jobs.j_push = { id: 'j_push', showId: 's1', type: 'WEEK_PUSH', status: 'PLANNED', key: '', opt: 'MID' };
      f.show.jobs = ['j_print', 'j_push'];
      f.state.week.plan = [{ jobId: 'j_print', dayIdx: 0, opt: 'BIG' }, { jobId: 'j_push', dayIdx: 1, opt: Object.keys(SB.Config.CHANNELS.PAID_PUSH)[0] }];
    },
    'ask at the door (hat)': f => { f.show.deal = Object.assign({}, f.show.deal, { shape: 'HAT', guarantee: 0, pct: 1 }); },
    'friday, bar room, $5 door': f => { f.show.door.price = 5; f.show.deal = Object.assign({}, f.show.deal, { shape: 'VERSUS', guarantee: 120, pct: .5 }); },
    'price $8': f => { f.show.door.price = 8; },
    'comps 0 price $12 guarantee 200': f => { f.show.door.comps = 0; f.show.door.price = 12; f.show.deal = Object.assign({}, f.show.deal, { shape: 'GUARANTEE', guarantee: 200 }); }
  };

  Object.keys(SCENES).forEach(name => {
    H.section(t, name, () => {
      ['offer', 'night'].forEach(when => {
        const scene = () => { const f = golden.build(SB, { notebook: true }); f.withLuck(); SCENES[name](f); return f; };
        const paid = () => { const f = scene(); payPlanned(f, SB.Forecast.breakEven(f.state, 's1')); return f; };
        const pre = SB.Forecast.breakEven(scene().state, 's1');
        const b = when === 'offer' ? pre : SB.Forecast.breakEven(paid().state, 's1');
        const play = paid;
        if (!b || b.even === null) { t.note(name + ' (' + when + '): no break-even (' + (b && b.hat ? 'hat' : 'none') + ')'); return; }
        t.note(name + ' / ' + when + ': even ' + b.even + ' extras ' + JSON.stringify(b.extras));
        t.eq(SB.Money.exposure(scene().state, 's1').breakEven, pre.even, name + ': the exposure line and the offer say the same break-even');
        { const sc = scene(), ex = SB.Money.exposure(sc.state, 's1'), nb = SB.Forecast.breakEven(sc.state, 's1').nobody;
          t.near(ex.total, -nb, 1, name + ': "if nobody comes you owe" ' + ex.total + ' matches the offer\'s ' + (-nb)); }
        const tag = name + ' / ' + when + ' at ' + b.even;
        const at = netAt(play(), b.even), more = netAt(play(), b.even + 1), less = b.even > 0 ? netAt(play(), b.even - 1) : null;
        if (when === 'night') t.eq(b.even, pre.even, tag + ': paying for the planned costs does not move the break-even');
        t.ok(at.net >= -1 && at.net <= 12, tag + ': the player ends within a few dollars of even (net ' + at.net + ')');
        t.eq(at.gap, 0, tag + ': nothing is owed that the door cannot pay');
        t.ok(more.net > at.net || more.net >= at.net, tag + ': one more paying person never leaves them worse off (' + more.net + ' vs ' + at.net + ')');
        if (less) t.ok(less.net < 0 || less.gap > 0, tag + ': one fewer leaves them down (net ' + less.net + ', gap ' + less.gap + ')');
      });
    });
  });
};
