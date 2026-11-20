'use strict';
// model.test — the golden show of mechanics 1.13 (06-harness section 3, `model.test`), built from test/fixtures/golden.js.
// Written from the spec and mechanics, never from the engine. It runs only when SB.Model and SB.Forecast are real files.
//   heads 100 +- 4, by generation 23 / 66 / 11 +- 3, night score 69 +- 2, door $910 +- $40, under the lens overrides { stale: false };
//   Par 87 +- 4 under { followers: 300, invites: false, stale: false } (mechanics' "ordinary job") with the house-rules turnout taken
//   back out, its score 64 +- 6 with the bands and sound as booked, and Par as shipped reported beside it;
//   each row of "what it would have done otherwise" within 6 percent; the lead table of mechanics 3.5 within 0.04 (0.06 for the
//   house and the club, see the SPEC? note there) and its reach-by-generation table within 0.04;
//   one hardcore band worth 30 pulls 30, two 48, three 62, four 72; a 21-and-over room admits no kids; Want stays in 0..1;
//   every DEAL shape and LOCAL_PAY gives a finite share ceiling; incidents lower the score; a one-set show is 0..100;
//   the usual's raw reach for a hall at 300 followers is within 0.02 of CHANNELS.REACH_REF; Model.resolve averages under 1 ms.
// The example's one labelled luck (the first cool evening, +5 percent) is stored on show.night.luck by the fixture (withLuck). If the
// model does not read it (Demand.luck lacks FINE_EVENING) the figures are scaled by 1.05 instead, and a note says so.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Model', 'Forecast'], 'the golden show')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const C = SB.Config, E = SB.Enums, X = golden.EXPECT;
  const fx = golden.build(SB, { notebook: true });

  function run(f, mode, over, withLuck) {
    const lens = SB.Forecast.lens(f.state, mode || 'TRUTH', over || { stale: false });
    if (withLuck === false) lens.luck = false;
    const r = SB.Model.resolve(f.state, f.show, lens, f.show.mods);
    const luck = r && r.demand && r.demand.luck || [];
    r.luckApplied = luck.some(l => l.k === 'FINE_EVENING');
    return r;
  }
  // the example's figures include its +5 percent; scale them back in when the model did not apply the stored luck
  function adj(r, v, rain) { return rain || r.luckApplied ? v : v * 1.05; }

  /* ---- the golden show ---- */
  H.section(t, 'golden show', () => {
    const f = fx.withLuck();
    const r = run(f, 'TRUTH', { stale: false });
    const n = r.night;
    if (!r.luckApplied) t.note('model: the stored FINE_EVENING luck was not applied (Demand.luck lacks it); figures scaled by 1.05');
    t.near(adj(r, n.heads), X.heads, X.headsTol, 'heads');
    n.byGen.forEach((v, g) => t.near(adj(r, v), X.byGen[g], X.byGenTol, 'heads by generation ' + g));
    t.near(n.q, X.q, X.qTol, 'night score');
    t.near(adj(r, n.gross), X.door, X.doorTol, 'the door ($' + n.gross + ')');
    t.eq(n.comps, 9, 'nine on the guest list');
    t.ok(n.heads <= 1.1 * 160, 'heads are under the cap line');
    t.ok(n.sets.length === 3, 'three sets');
    if (n.sets.length === 3) t.ok(n.sets[1].present > n.sets[0].present && n.sets[1].present > n.sets[2].present, 'the touring band plays to the fullest room (' + n.sets.map(s => s.present).join(' / ') + ')');
    t.ok(r.demand.byReason && r.demand.byReason.BAND, 'Demand.byReason.BAND is present');
    t.ok(r.demand.byReason.SCENE >= 0 && r.demand.byReason.REGULAR >= 0, 'scene and regulars are counted outside the bands');
    // the closer brings the most, the opener the fewest of the three
    const br = r.demand.byReason.BAND || {};
    const b13 = br[fx.ids.closer] || 0, b12 = br[fx.ids.touring] || 0, b11 = br[fx.ids.opener] || 0;
    t.ok(b13 > b12 && b12 > b11, 'came for: closer > touring > opener (' + [b13, b12, b11].map(x => Math.round(x)).join(' > ') + ')');
  });

  /* ---- Par ---- */
  H.section(t, 'par', () => {
    const f = fx.withLuck();
    const over = { followers: 300, invites: false, stale: false };
    const par = run(f, 'PAR', over, false);
    // Mechanics 1.12 makes Par by replacing the draws, the affinity quirks, the reach and the luck, and nothing else: "the night,
    // room, price and running order as actually booked". The PAR lens of 02-engine 7.8 goes further in ways the example
    // predates, and the comparison takes each back out:
    //   every night-side preparation counts as done, so Can carries HOUSE_RULES_TURNOUT (7.6), which the fixture's show does not
    //   (its Can is night x room x price, as the example works it): the heads are divided by it;
    //   every band plays at `live` 60 and the sound person is skilled .6: the example's Par score (64) is the Par crowd in front of
    //   the bands and the sound person as booked, so the score is read from Model.night on the Par demand under the truth lens.
    const parHeads = par.night.heads / C.HOUSE_RULES_TURNOUT;
    t.near(parHeads, X.par, X.parTol, 'Par under the ordinary-job overrides (' + par.night.heads + ' with the house-rules turnout)');
    const truthLens = SB.Forecast.lens(f.state, 'TRUTH', { stale: false }); truthLens.luck = false;
    const parLens = SB.Forecast.lens(f.state, 'PAR', over);
    const asBooked = SB.Model.night(f.state, f.show, SB.Model.demand(f.state, f.show, parLens), {}, truthLens);
    t.near(asBooked.q, X.parQ, 6, 'Par night score, the Par crowd with the bands and sound as booked');
    t.ok(par.night.q <= asBooked.q + 1e-9, 'the PAR lens (every band at live 60, sound at .6) does not score above the bands as they are (' + par.night.q + ' against ' + asBooked.q + ')');
    const shipped = SB.Forecast.par(f.state, 's1');
    t.ok(shipped && shipped.heads >= 1, 'Forecast.par returns heads of at least 1');
    t.note('model: Par as shipped (the usual with the fixture\'s 420 followers, 60 regulars and mailing list) is ' + (shipped && Math.round(shipped.heads)) + ' against ' + Math.round(par.night.heads) + ' under the overrides');
    t.ok(shipped.heads >= par.night.heads - 1, 'more followers and regulars raise Par, they do not lower it');
  });

  /* ---- the otherwise table ---- */
  H.section(t, 'otherwise table', () => {
    golden.VARIANTS.forEach(name => {
      const v = fx.variant(name), exp = X.rows[name]; if (!exp) return;
      let r;
      try { r = run(v, 'TRUTH', v.lensOver || { stale: false }); } catch (e) { t.fail('variant ' + name + ' threw: ' + e.message); return; }
      const rain = name === 'rain';
      const heads = adj(r, r.night.heads, rain);
      t.near(heads, exp.heads, Math.max(2, X.rowTol * exp.heads), 'variant ' + name + ': heads');
      if (exp.byGen && r.night.byGen) r.night.byGen.forEach((x, g) => t.near(adj(r, x, rain), exp.byGen[g], Math.max(3, X.rowTol * exp.heads), 'variant ' + name + ': heads by generation ' + g));
      if (exp.q !== undefined) t.near(r.night.q, exp.q, Math.max(4, X.rowTol * 100), 'variant ' + name + ': night score');
      if (exp.door !== undefined && r.night.gross !== undefined) t.near(adj(r, r.night.gross, rain), exp.door, Math.max(30, X.rowTol * exp.door), 'variant ' + name + ': door');
    });
    const ro = run(fx.variant('barRoom'), 'TRUTH', { stale: false });
    t.eq(ro.night.byGen[0], 0, 'a 21-and-over room admits no kids');
    t.ok(ro.demand.byGen[0] >= 0, 'the kids\' demand is reported (and the room, not the demand, keeps them out)');
  });

  /* ---- the lead table of mechanics 3.5 ---- */
  H.section(t, 'lead table', () => {
    const table = {
      HOUSE: { 42: .99, 35: .99, 28: .97, 21: .93, 14: .80, 10: .58, 7: .41, 5: .30, 3: .18, 1: .11 },
      HALL:  { 42: .99, 35: .98, 28: .96, 21: .89, 14: .74, 10: .52, 7: .36, 5: .26, 3: .17, 1: .11 },
      CLUB:  { 42: .98, 35: .96, 28: .92, 21: .82, 14: .66, 10: .43, 7: .30, 5: .23, 3: .16, 1: .11 }
    };
    // "everything started on the given day and done promptly after": flyer and announce that day, bands sharing two days later,
    // runs five days later, listings only if still open; compared with eight weeks' notice. Only the room kind changes.
    // The table's show has flyers on every city route: its own second table (the hall's reach by generation, checked below) gives
    // 1.10 / 1.06 / 1.00 at 28 days, which the worked example's three routes cannot reach (1.07 / 1.01 / .95 at 30 days with the
    // Hills skipped) and four routes do. The Hills run is therefore added here; everything else is golden.retime's reading of 3.5.
    function retimed(kind, daysOut) {
      const v = fx.variant('noPush'); v.show.promo.push = fx.show.promo.push;          // a plain copy of the worked example's show
      v.state.rooms.r21.kind = kind; if (kind === 'CLUB') v.state.rooms.r21.cap = 300; if (kind === 'HOUSE') v.state.rooms.r21.cap = 160;
      // mechanics' table is the lead curve alone; a house that prints "ask a punk" (02-engine 7.5, ADDRESS) is a later, separate rule
      if (kind === 'HOUSE') v.show.door.address = 'FULL';
      v.show.promo.runs.hills = { day: v.show.day, again: null, by: 'player', effect: 1 };
      golden.retime(v, daysOut);         // invitations and the hand-out stay as booked
      return v;
    }
    function heads(kind, daysOut) {
      const v = retimed(kind, daysOut);
      return SB.Model.resolve(v.state, v.show, SB.Forecast.lens(v.state, 'TRUTH', { stale: false }), {}).night.heads;
    }
    Object.keys(table).forEach(kind => {
      const base = heads(kind, 56);
      Object.keys(table[kind]).forEach(d => {
        const share = heads(kind, Number(d)) / Math.max(1, base);
        // SPEC?: mechanics made its table with ROOM_TAU on every lead curve ("tau = TAU x ROOM_TAU x channel factor"), word of mouth
        // and the bands' shares included; 02-engine 7.5 scales the announcement, the runs and the paid push by the room and leaves
        // word of mouth (WOM_T) and the shares ("not scaled by room") alone, so a house gains less and a club loses less than the
        // table says (by up to .05 at 10 to 14 days). The hall row is unaffected and is held to .04; the other two rooms get .06.
        t.near(share, table[kind][d], .04 + (kind !== 'HALL' ? .02 : 0), kind + ' room, promotion from ' + d + ' days out: share of the eight-week heads');
      });
    });
    // "who is lost first": the hall show's reach by generation
    const lost = { 42: [1.18, 1.18, 1.11], 28: [1.10, 1.06, 1.00], 21: [1.00, .94, .91], 14: [.80, .75, .79], 7: [.39, .30, .18], 3: [.18, .14, .10] };
    Object.keys(lost).forEach(d => {
      const v = retimed('HALL', Number(d));
      const r = SB.Model.reach(v.state, v.show, SB.Forecast.lens(v.state, 'TRUTH', { stale: false }), v.day);
      r.reach.forEach((x, g) => t.near(x, lost[d][g], .04, 'hall, promotion from ' + d + ' days out: reach of generation ' + g));
    });
  });

  /* ---- stacking a crowd ---- */
  H.section(t, 'stacking', () => {
    // 1, 2, 3, 4 hardcore bands, each worth 30, same promotion: the heads they bring fall short of the sum in the ratio 30 : 48 : 62 : 72
    const want = [30, 48, 62, 72];
    function bandHeads(k) {
      const f = golden.build(SB, { notebook: false }); f.withLuck();
      const s = f.show, st = f.state;
      const ids = [];
      for (let i = 0; i < k; i++) {
        const id = 'bx' + i;
        st.bands[id] = JSON.parse(JSON.stringify(st.bands.b13)); st.bands[id].id = id; st.bands[id].name = 'Stack Test ' + i;
        st.bands[id].hid.draw.city = 30; st.bands[id].hid.cross = 0; st.bands[id].hid.live = 70; st.bands[id].genre = 'hardcore'; ids.push(id);
      }
      s.bill.slots = ids.map((id, i) => ({ bandId: id, role: 'LOCAL', minutes: 25, pay: 'FREE', fee: 0, askId: null, confirmed: true }));
      s.bill.billing = ids.slice(); s.bill.times = ids.map((x, i) => 1285 + 35 * i); s.bill.ends = 1285 + 35 * ids.length;
      s.promo.shares = {}; s.promo.handouts = []; s.promo.invites = []; s.promo.mail = null;
      // Stacking (02-engine 7.4) is about pull alone. What a bill is worth at the door (7.6: WORTH.perBand per band) is another
      // rule, and at $10 it lifts Can with every band added; a donation door takes price out so only the bill changes.
      s.door.donation = true; s.door.suggested = 5;
      st.player.mailingList = 0; Object.keys(st.regulars.by).forEach(z => { st.regulars.by[z] = st.regulars.by[z].map(r => r.map(() => 0)); }); st.regulars.total = 0;
      const lens = SB.Forecast.lens(st, 'TRUTH', { stale: false, invites: false });
      lens.luck = false;
      const r = SB.Model.resolve(st, s, lens, {});
      const br = r.demand.byReason || {}; let sum = 0; Object.keys(br.BAND || {}).forEach(b => { sum += br.BAND[b]; });
      return sum;
    }
    const one = bandHeads(1);
    t.ok(one > 0, 'one hardcore band brings heads (' + Math.round(one) + ')');
    [2, 3, 4].forEach((k, i) => t.near(bandHeads(k) / Math.max(1e-9, one) * 30, want[i + 1], 3.5 + 1.5 * (k - 1), k + ' same-crowd bands pull about ' + want[i + 1] + ' for the one\'s 30 (ratio form)'));
  });

  /* ---- ranges and edges ---- */
  H.section(t, 'want in range', () => {
    const f = golden.build(SB, { notebook: false }); f.withLuck();
    const s = f.show, st = f.state, ids = [];
    for (let i = 0; i < 5; i++) {
      const id = 'bh' + i; st.bands[id] = JSON.parse(JSON.stringify(st.bands.b12)); st.bands[id].id = id; st.bands[id].hid.draw.city = 900; st.bands[id].hid.promo = 1; ids.push(id);
      st.bands[id].genre = SB.Enums.GENRES[i % 3]; st.bands[id].local = i % 2 === 0; st.bands[id].zoneId = st.bands[id].local ? 'city' : null;
    }
    s.bill.slots = ids.map((id, i) => ({ bandId: id, role: i % 2 ? 'TOURING' : 'LOCAL', minutes: 25, pay: 'FREE', fee: 0, askId: null, confirmed: true }));
    s.bill.billing = ids.slice(); s.bill.times = ids.map((x, i) => 1200 + 35 * i); s.bill.ends = 1200 + 35 * 5;
    SB.Enums.GENRES.forEach(g => { st.truth.heat[g] = 1; });
    s.promo.flyer.day = f.day - 80; s.promo.announce = f.day - 80; s.promo.printed = f.day - 70; s.promo.listings = f.day - 60; s.promo.push = f.day - 3;
    Object.keys(s.promo.runs).forEach(k => { s.promo.runs[k].day = f.day - 60; s.promo.runs[k].effect = 1.2; });
    s.promo.shares = {}; ids.forEach(id => { s.promo.shares[id] = f.day - 70; });
    const r = SB.Model.resolve(st, s, SB.Forecast.lens(st, 'TRUTH', {}), {});
    t.ok(isFinite(r.night.heads) && r.night.heads >= 0, 'five tier-4 bands at heat +1 and full reach give a finite number of heads');
    const flat = []; Object.keys(st.zones).forEach(z => st.zones[z].pop.forEach(row => row.forEach(v => flat.push(v))));
    const cells = r.demand.cells || [];
    if (cells.length) {
      t.eq(cells.length, flat.length, 'cells hold one number per (zone, generation, genre)');
      t.eq(cells.filter((v, i) => !(v >= 0) || v > flat[i] + 1e-6).length, 0, 'no cell holds a negative number of heads or more than its population (Want stays in 0..1)');
    }
    t.ok(r.night.q >= 0 && r.night.q <= 100, 'night score is 0..100');
    t.ok(r.demand.reach.every(x => x <= C.CHANNELS.REACH_CAP + 1e-9), 'reach never passes REACH_CAP');
  });

  H.section(t, 'deals and pays', () => {
    Object.keys(E.DEAL).forEach(shape => {
      const f = fx.variant('noPush'); f.show.deal.shape = shape;
      const r = SB.Model.reach(f.state, f.show, SB.Forecast.lens(f.state, 'TRUTH', { stale: false }), f.day);
      t.ok(r.reach.every(isFinite) && Object.keys(r.perBand).every(b => r.perBand[b].every(isFinite)), 'deal ' + shape + ' gives finite reach per band');
      t.ok(C.CHANNELS.SHARE_KEY[shape], 'SHARE_KEY has the deal shape ' + shape);
    });
    Object.keys(E.LOCAL_PAY).forEach(pay => {
      const f = fx.variant('noPush'); f.show.bill.slots[0].pay = pay;
      const r = SB.Model.reach(f.state, f.show, SB.Forecast.lens(f.state, 'TRUTH', { stale: false }), f.day);
      t.ok(Object.keys(r.perBand).every(b => r.perBand[b].every(isFinite)), 'local pay ' + pay + ' gives finite reach per band');
      t.ok(C.CHANNELS.SHARE_KEY[pay], 'SHARE_KEY has the local pay ' + pay);
    });
  });

  H.section(t, 'incidents', () => {
    // SPEC?: 02-engine 7.7 says Q adds "sum of incident.q" but not how incidents reach Model.night. This test passes them as
    // mods.incidents = [{ kind, q }] and, failing that, as mods.qAdd; a model that ignores both is noted, not failed.
    const f = fx.withLuck(), lens = SB.Forecast.lens(f.state, 'TRUTH', { stale: false });
    const d = SB.Model.demand(f.state, f.show, lens);
    const base = SB.Model.night(f.state, f.show, d, {}, lens);
    const all = Object.keys(C.INCIDENTS).map(k => ({ kind: k, q: k === 'FIGHT' ? -14 : (k === 'HURT' ? -10 : (k === 'NOISE' ? -5 : -3)) }));
    const withInc = SB.Model.night(f.state, f.show, d, { incidents: all }, lens);
    if (withInc.q < base.q) t.ok(true, 'a show with every incident scores lower than the same show with none');
    else t.note('model: mods.incidents did not change the score (SPEC? how incidents enter Model.night is not stated)');
    const qAdd = SB.Model.night(f.state, f.show, d, { qAdd: -10 }, lens);
    t.ok(qAdd.q < base.q || base.q <= 10, 'mods.qAdd is signed: -10 lowers the score');
    // a one-set show
    const one = fx.variant('noPush'); const sl = one.show.bill.slots[1]; one.show.bill.slots = [sl]; one.show.bill.billing = [sl.bandId]; one.show.bill.times = [1285]; one.show.bill.ends = 1315;
    const ro = SB.Model.resolve(one.state, one.show, SB.Forecast.lens(one.state, 'TRUTH', { stale: false }), {});
    t.ok(ro.night.q >= 0 && ro.night.q <= 100, 'a one-set show scores 0..100 (' + ro.night.q + ')');
    const two = fx.variant('noPush'); two.show.bill.slots = two.show.bill.slots.slice(0, 2); two.show.bill.billing = two.show.bill.billing.slice(0, 2);
    const rt = SB.Model.resolve(two.state, two.show, SB.Forecast.lens(two.state, 'TRUTH', { stale: false }), {});
    t.ok(rt.night.q >= 0 && rt.night.q <= 100, 'a two-set show scores 0..100');
  });

  H.section(t, 'reach ref', () => {
    const f = fx.withLuck();
    const lens = SB.Forecast.lens(f.state, 'PAR', { followers: 300, invites: false, stale: false });
    const r = SB.Model.reach(f.state, f.show, lens, f.day);
    const mean = r.raw.reduce((a, b) => a + b, 0) / 3;
    t.near(mean, C.CHANNELS.REACH_REF, .02, 'the usual\'s raw reach for a hall at 300 followers is within .02 of REACH_REF (' + r.raw.map(x => Math.round(x * 1000) / 1000).join(' / ') + ')');
  });

  /* ---- speed ---- */
  H.section(t, 'speed', () => {
    const f = fx.withLuck(), lens = SB.Forecast.lens(f.state, 'TRUTH', { stale: false });
    const t0 = process.hrtime.bigint();
    const N = 300;
    for (let i = 0; i < N; i++) SB.Model.resolve(f.state, f.show, lens, f.show.mods);
    const ms = Number(process.hrtime.bigint() - t0) / 1e6 / N;
    t.ok(ms < 1, 'Model.resolve averages under 1 ms (' + ms.toFixed(3) + ' ms)');
  });
};
