'use strict';
// irl.test — design/spec/13-real-booking.md, the engine piece.
//   * SB.IRL.pick: at most two controlled causes and one hidden one, never more than three lessons, a lesson stops after
//     three showings and is still listed by learned(); the what-ifs and the unknown come from result.causes; no stream is drawn from;
//   * SB.IRL.settle: the settle's lesson is stored once and counted;
//   * SB.Forecast.breakEven against a hand count on the golden show (hall $225, sound $60, guarantee $150, locals $80, own costs $56);
//   * Requests: tellSpans point at the text a tell guard wrote, and the body and the TEXT stream are what they were without them;
//   * a save without notebook.irl loads with an empty one.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Night', 'Money', 'Model', 'Forecast', 'Notebook', 'Requests', 'Save'], 'real booking')) return;
  const SB = H.fresh({ packs: ['pensacola'], text: true });
  const E = SB.Enums;
  const clone = x => JSON.parse(JSON.stringify(x));
  t.ok(SB.IRL && typeof SB.IRL.pick === 'function', 'SB.IRL is loaded');

  H.section(t, 'pick: caps', () => {
    const f = golden.build(SB, { notebook: true }), st = f.state, show = f.show;
    delete st.notebook.irl;
    const streams = JSON.stringify(st.rng.streams);
    show.result = { door: { price: 10 }, causes: [
      { cause: 'PROMO_FLYER', d: -9.4, hidden: false }, { cause: 'DRAW_AWAY', d: -6, hidden: true }, { cause: 'NIGHT', d: 5, hidden: false },
      { cause: 'DOOR_PRICE', d: -4, hidden: false }, { cause: 'GENRE_MIX', d: -3.5, hidden: true }, { cause: 'SOUND', d: -2, hidden: false },
      { cause: 'ORDER', d: -1.9, hidden: false }, { cause: 'PAY', d: -2.6, hidden: false }, { cause: 'TREND', d: 2.9, hidden: true }] };
    st.jobs = st.jobs || {}; st.jobs.jx = { id: 'jx', type: 'MAKE_FLYER', showId: show.id, status: 'DONE', timing: 'LATE' };
    show.jobs = (show.jobs || []).concat(['jx']);
    const irl = SB.IRL.pick(st, show.id);
    t.eq(irl.lessons, ['cause:PROMO_FLYER', 'cause:NIGHT', 'cause:DRAW_AWAY'], 'two controlled causes by size, then the biggest hidden one; a late job does not make a fourth');
    t.eq(irl.whatIf.map(w => w.cause), ['PROMO_FLYER', 'DOOR_PRICE', 'PAY'], 'what-ifs: the three biggest controlled losses, biggest first');
    t.eq(irl.whatIf[0], { cause: 'PROMO_FLYER', n: 9, gen: null, money: 90 }, 'a what-if is people and dollars at the door price');
    t.eq(irl.whatIf[2].money, null, 'how the bands were paid is not counted in dollars at the door');
    t.eq(irl.unknown, { cause: 'DRAW_AWAY', n: 6 }, 'the unknown is the biggest hidden loss of three or more');
    t.eq(show.result.irl, irl, 'stored on the result');
    t.eq(SB.IRL.counts(st), { 'cause:PROMO_FLYER': 1, 'cause:NIGHT': 1, 'cause:DRAW_AWAY': 1 }, 'each lesson is counted once');
    SB.IRL.pick(st, show.id);
    t.eq(SB.IRL.counts(st)['cause:PROMO_FLYER'], 1, 'picking again for the same show counts nothing');
    t.eq(JSON.stringify(st.rng.streams), streams, 'no stream is drawn from');

    // nothing big enough: no cause lessons, the late job's lesson shows
    show.result = { door: { price: 0 }, causes: [{ cause: 'SOUND', d: -1.9, hidden: false }, { cause: 'TREND', d: -2.9, hidden: true }] };
    const b = SB.IRL.pick(st, show.id);
    t.eq(b.lessons, ['job:MAKE_FLYER'], 'under the thresholds only the late job teaches');
    t.eq(b.whatIf, [], 'no what-if under two people'); t.eq(b.unknown, null, 'no unknown under three people');

    // a donation door has no price: no dollars
    show.result = { causes: [{ cause: 'SOUND', d: -5, hidden: false }] }; show.door.donation = true;
    t.eq(SB.IRL.pick(st, show.id).whatIf[0].money, null, 'no door price, no dollars');
  });

  H.section(t, 'pick: three showings', () => {
    const f = golden.build(SB, { notebook: true }), st = f.state, show = f.show;
    const causes = [{ cause: 'PROMO_FLYER', d: -9, hidden: false }, { cause: 'SOUND', d: -5, hidden: false }, { cause: 'ORDER', d: -3, hidden: false }];
    const seen = [];
    for (let i = 0; i < 4; i++) { show.result = { door: { price: 10 }, causes: clone(causes) }; seen.push(SB.IRL.pick(st, show.id).lessons.join(' ')); }
    t.eq(seen.slice(0, 3), ['cause:PROMO_FLYER cause:SOUND', 'cause:PROMO_FLYER cause:SOUND', 'cause:PROMO_FLYER cause:SOUND'], 'the same two lessons three times');
    t.eq(seen[3], 'cause:ORDER', 'the fourth time they are spent and the next one shows');
    t.eq(show.result.irl.whatIf.length, 3, 'the what-ifs are not capped by showings');
    const l = SB.IRL.learned(st);
    t.eq(l.map(x => x.key + '=' + x.shown), ['cause:PROMO_FLYER=3', 'cause:SOUND=3', 'cause:ORDER=1'], 'learned lists every lesson shown, spent ones too');
    const steps = ['DATE', 'ROOM', 'DEAL', 'BILL', 'CREW', 'ANNOUNCE', 'NIGHT', 'SETTLE'];
    t.ok(l.every(x => steps.indexOf(x.step) >= 0), 'every learned lesson is filed under a booking step (' + l.map(x => x.step).join(' ') + ')');
    t.ok(Object.keys(E.CAUSE).every(c => { st.notebook.irl = { ['cause:' + c]: { shown: 1 } }; return steps.indexOf(SB.IRL.learned(st)[0].step) >= 0; }), 'every cause has a step');
  });

  H.section(t, 'the night stores its lessons', () => {
    const f = golden.build(SB, { notebook: true }); f.withLuck(); f.show.night = null; f.show.door.price = 1;
    SB.Night.auto(f.state, 's1', { untilSettle: true, settle: 'FAIR' });
    const sv = SB.Night.settleView(f.state, 's1');
    t.ok(sv.gap > 0, 'a $1 door leaves a gap');
    const r = SB.Night.settle(f.state, 's1', { shortfall: 'SHORT_SILENT', keep: 0, extraToLocals: 0, gas: 0 });
    t.ok(r && r.ok !== false, 'the night settles');
    const res = f.state.shows.s1.result;
    t.ok(res.irl && Array.isArray(res.irl.lessons) && Array.isArray(res.irl.whatIf), 'result.irl is there after Night.finish');
    t.ok(res.irl.lessons.length <= 3, 'never more than three lessons (' + res.irl.lessons.join(' ') + ')');
    t.eq(res.irl.settle, 'settle:SHORT_SILENT', 'the settle lesson is kept on the result');
    t.eq(SB.IRL.counts(f.state)['settle:SHORT_SILENT'], 1, 'and counted once');
    res.irl.whatIf.forEach(w => {
      const c = res.causes.filter(x => x.cause === w.cause)[0];
      t.ok(c && !c.hidden && Math.round(-c.d) === w.n, 'what-if ' + w.cause + ' matches result.causes');
    });
    res.irl.lessons.filter(k => k.indexOf('cause:') === 0).forEach(k => t.ok(res.causes.some(c => 'cause:' + c.cause === k && Math.abs(c.d) >= 2), k + ' is a cause of the night'));
  });

  H.section(t, 'settle: three showings', () => {
    const f = golden.build(SB, { notebook: true }), st = f.state, show = f.show, got = [];
    for (let i = 0; i < 4; i++) { show.night = { settled: {} }; got.push(SB.IRL.settle(st, show.id, 'POCKET')); }
    t.eq(got, ['settle:POCKET', 'settle:POCKET', 'settle:POCKET', null], 'the settle lesson stops after three');
    t.eq(show.night.settled.irl, null, 'a spent lesson is stored as null');
    show.night = { settled: {} };
    t.eq(SB.IRL.settle(st, show.id, null), null, 'no gap, no lesson');
    t.eq(SB.IRL.learned(st).filter(x => x.key === 'settle:POCKET')[0].step, 'SETTLE', 'filed under settling up');
  });

  H.section(t, 'breakEven against a hand count', () => {
    const f = golden.build(SB, { notebook: true }), st = f.state;
    st.money.fund += 56; SB.Money.spend(st, 56, 'PRINT', '', { showId: 's1' });      // the player's own costs so far
    const before = JSON.stringify(st);
    // $225 hall + $60 sound + $150 guarantee + $80 locals + $56 own costs = $571
    const g = SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE' });
    t.eq(g.owed, 571, 'owed is the hall, sound, the guarantee, the locals and the player\'s own costs');
    t.eq(g.even, Math.ceil(571 / 10), 'even at 58 paying at $10');
    t.eq(g.price, 10, 'the door price'); t.eq(g.hat, false, 'not a hat'); t.eq(g.split, null, 'no split line on a guarantee');
    const c = SB.Forecast.call(st, 's1');
    t.eq([g.lo, g.hi], [c.lo, c.hi], 'the guess is the Call\'s range');
    t.eq(SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE', guarantee: 250 }).even, Math.ceil(671 / 10), 'a bigger guarantee moves it');
    const p = SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE', price: 8 });
    t.eq(p.even, Math.ceil(571 / 8), 'a lower price moves it');
    t.ok(p.lo !== undefined && p.hi >= p.lo, 'a previewed price has its own guess');
    // $150 plus half of what is left: the player needs $112 left to get the $56 back
    t.eq(SB.Forecast.breakEven(st, 's1').even, Math.ceil((285 + 150 + 80 + 112) / 10), 'with half of what is left going to the band, even is 63');
    t.eq(SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE', price: 0 }).even, null, 'no even number at a price of 0');
    // a door deal: 70 percent to the band after the hall and sound
    const d = SB.Forecast.breakEven(st, 's1', { shape: 'DOOR', share: 0.7 });
    const at = d.split.at, band = Math.round(0.7 * (at * 10 - 285));
    t.eq(d.split.offTop, 285, 'door deal: the hall and sound off the top');
    t.eq(d.split.band, band + 80, 'door deal: the band\'s 70 percent and the locals at the middle of the guess');
    t.eq(d.split.you, at * 10 - 285 - band - 80 - 56, 'door deal: the rest is yours, after what you spent already');
    t.eq(d.owed, 285 + 80 + 56, 'door deal: nothing is promised to the touring band');
    t.eq(SB.Forecast.breakEven(st, 's1', { shape: 'DOOR', share: 70 }).split.band, d.split.band, 'a share may be given as a percent');
    const h = SB.Forecast.breakEven(st, 's1', { shape: 'HAT' });
    t.eq([h.hat, h.even], [true, null], 'a hat has no even number');
    t.eq(JSON.stringify(st), before, 'breakEven changes nothing');
  });

  H.section(t, 'deal options never ask the band to take less (fix list 1.4)', () => {
    const f = golden.build(SB, { notebook: true }), st = f.state, ask = { shape: 'DOOR', guarantee: 0, pct: 0.68 };
    const before = JSON.stringify(st), opts = SB.Forecast.dealOptions(st, 's1', ask);
    t.eq(opts[0].shape, 'DOOR', 'the first option is what they asked for');
    t.ok(opts[0].asked, 'and it is marked as the ask');
    t.ok(opts.every(o => o.band >= opts[0].band), 'every option pays them at least what the ask pays at the middle of the guess');
    t.ok(opts.length > 1, 'from show two there are other kinds of deals');
    t.eq(new Set(opts.map(o => o.shape)).size, opts.length, 'each kind once');
    const g = opts.filter(o => o.shape === 'GUARANTEE')[0];
    t.ok(g && g.nobody < 0, 'a guarantee says what you lose if nobody comes');
    t.eq(JSON.stringify(st), before, 'dealOptions changes nothing');
  });

  H.section(t, 'break-even counts what is still to come (fix list 1.5)', () => {
    const f = golden.build(SB, { notebook: true }), st = f.state;
    const a = SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE' });
    st.shows.s1.crew.sound = null;
    st.rooms[st.shows.s1.roomId].soundFee = 0;
    const b = SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE' });
    t.ok(b.extras.some(x => x.k === 'SOUND' && x.guess), 'with nobody on sound the usual sound person is counted, and said to be a guess');
    t.ok(b.even >= a.even - 20 && b.even > 0, 'the break-even is still a number');
    const m = SB.Forecast.breakEven(st, 's1', { shape: 'GUARANTEE', meal: true });
    t.ok(m.owed > b.owed, 'a promised meal is in what is owed');
  });

  H.section(t, 'tell spans', () => {
    // the marks: one template, by hand
    const tpl = { t1: { kind: ['COLD'], tells: { want: [], avoid: [] }, subject: ['x'],
      body: ['Hi {you|there},\n\nWe play loud. (?PRO: We carry our own cabs (two of them).) (?SLOPPY: no idea what day lol) [?HONEST: Expect ten people. | It will be packed.^2]\n(?hasDraw: We did {draw}.)\nThanks'] } };
    const f = golden.build(SB, { notebook: true }), st = f.state;
    const keep = SB.Content.requests.templates;
    const bandId = Object.keys(st.bands).filter(id => !st.bands[id].local)[0], b = st.bands[bandId];
    b.hid.tells = ['PRO', 'HONEST']; b.hid.honest = 0; b.hid.oversell = 1;
    let q = null, body = '', tries = 0, plain = null;
    SB.Content.requests.templates = tpl;
    try {
      // the flags carry noise (a tell is written 85 percent of the time), so ask until both tells are written
      while (tries++ < 40) {
        const s2 = clone(st), r = SB.Requests.create(s2, { kind: 'COLD', bandId: bandId, template: 't1' });
        const x = s2.requests[r.requestId], m = SB.Mail.message(s2, x.messageId);
        if (x.hid.flags.PRO && x.hid.flags.HONEST && !x.hid.flags.SLOPPY) { q = x; body = m.body; plain = { s: s2 }; break; }
      }
    } finally { SB.Content.requests.templates = keep; }
    if (!q) { t.ok(false, 'no request with both tells in 40 tries'); return; }
    t.ok(Array.isArray(q.tellSpans) && q.tellSpans.length === 2, 'two spans, one per tell written (' + JSON.stringify(q.tellSpans) + ')');
    const by = {}; q.tellSpans.forEach(s => { by[s.tell] = body.slice(s.from, s.to); });
    t.eq(by.PRO, 'We carry our own cabs (two of them).', 'the PRO span is the guard\'s own sentence, plain brackets and all');
    t.eq(by.HONEST, 'Expect ten people.', 'a tell that guards one option of a choice is found too');
    t.ok(body.indexOf('\u0001') < 0 && body.indexOf('\u0003') < 0, 'no mark is left in the body');
    t.ok(!SB.Content.__tellMarks, 'nothing is left in the content');
    t.ok(!('tellSpans' in SB.Requests.view(plain.s, q.id).request) || Array.isArray(SB.Requests.view(plain.s, q.id).request.tellSpans), 'the view carries the spans as stored');

    // a tell that is not the band's own (noise) is not underlined
    b.hid.tells = [];
    SB.Content.requests.templates = tpl;
    try { const s3 = clone(st), r3 = SB.Requests.create(s3, { kind: 'COLD', bandId: bandId, template: 't1' }); t.eq(s3.requests[r3.requestId].tellSpans, [], 'a band with no tells has no spans'); }
    finally { SB.Content.requests.templates = keep; }
  });

  H.section(t, 'tell spans leave the game as it was', () => {
    // every real template: the spans sit inside the body, and the same seed writes the same messages and ends on the same streams
    const f = golden.build(SB, { notebook: true }), st = f.state;
    const ids = Object.keys(st.bands).filter(id => !st.bands[id].local);
    let n = 0, spans = 0, bad = [];
    Object.keys(SB.Content.requests.templates).forEach((key, i) => {
      const tp = SB.Content.requests.templates[key];
      (tp.kind || []).slice(0, 1).forEach(kind => {
        if (kind === 'LOCAL_ASK' || kind === 'SWAP') return;
        const s2 = clone(st), b = s2.bands[ids[i % ids.length]];
        b.hid.tells = Object.keys(E.TELL);
        let r; try { r = SB.Requests.create(s2, { kind: kind, bandId: b.id, template: key }); } catch (e) { return; }
        if (!r || !r.requestId) return;
        const q = s2.requests[r.requestId], m = SB.Mail.message(s2, q.messageId); n++;
        (q.tellSpans || []).forEach(s => { spans++; if (!(s.from >= 0 && s.to > s.from && s.to <= m.body.length && E.TELL[s.tell] && !/^\s|\s$/.test(m.body.slice(s.from, s.to)))) bad.push(key + ' ' + JSON.stringify(s)); });
        // the same request with the band's tells unknown to the writer: same words, same streams
        const s3 = clone(st); s3.bands[b.id].hid.tells = Object.keys(E.TELL);
        const mark = SB.Content.requests.templates[q.template].body, r3 = SB.Requests.create(s3, { kind: kind, bandId: b.id, template: key });
        t.eq(SB.Mail.message(s3, s3.requests[r3.requestId].messageId).body, m.body, key + ': the same seed writes the same body');
        t.eq(JSON.stringify(s3.rng.streams), JSON.stringify(s2.rng.streams), key + ': and ends on the same streams');
        t.ok(SB.Content.requests.templates[q.template].body === mark, key + ': the template is untouched');
      });
    });
    t.ok(n >= 8 && spans >= 8, n + ' requests written, ' + spans + ' spans');
    t.eq(bad, [], 'every span is inside its body, trimmed, and named for a tell');
  });

  H.section(t, 'the body is the one the plain renderer writes', () => {
    // every template, twice from the same state: once as written now, once with the band's tells hidden from the writer
    // after the flags are drawn (so the body is rendered once, the way it was before spans existed)
    const f = golden.build(SB, { notebook: true }), st = f.state;
    const ids = Object.keys(st.bands).filter(id => !st.bands[id].local);
    const line0 = SB.text.line;
    let n = 0, withSpans = 0;
    Object.keys(SB.Content.requests.templates).forEach((key, i) => {
      const tp = SB.Content.requests.templates[key], kind = (tp.kind || [])[0], id = ids[i % ids.length];
      if (!kind || kind === 'LOCAL_ASK' || kind === 'SWAP') return;
      const a = clone(st), b = clone(st);
      a.bands[id].hid.tells = Object.keys(E.TELL); b.bands[id].hid.tells = Object.keys(E.TELL);
      let ra, rb;
      try {
        ra = SB.Requests.create(a, { kind: kind, bandId: id, template: key });
        SB.text.line = function (path, ctx, rng) { if (/\.subject$/.test(path)) b.bands[id].hid.tells = []; return line0(path, ctx, rng); };
        try { rb = SB.Requests.create(b, { kind: kind, bandId: id, template: key }); } finally { SB.text.line = line0; }
      } catch (e) { return; }
      if (!ra || !ra.requestId || !rb || !rb.requestId) return;
      const qa = a.requests[ra.requestId], qb = b.requests[rb.requestId]; n++;
      if (qa.tellSpans.length) withSpans++;
      t.eq(qb.tellSpans, [], key + ': the reference has no spans');
      t.eq(SB.Mail.message(a, qa.messageId).body, SB.Mail.message(b, qb.messageId).body, key + ': marking changes no word');
      t.eq(JSON.stringify(a.rng.streams), JSON.stringify(b.rng.streams), key + ': and draws nothing more from any stream');
    });
    t.ok(n >= 8 && withSpans >= 4, n + ' templates compared, ' + withSpans + ' with spans');
  });

  H.section(t, 'old saves', () => {
    const f = golden.build(SB, { notebook: true }), st = clone(f.state);
    delete st.notebook.irl;
    t.eq(SB.IRL.learned(st), [], 'a notebook without irl has learned nothing');
    t.eq(SB.IRL.counts(st), {}, 'and counts nothing');
    SB.Notebook.est(st, 'x:y');
    t.ok(st.notebook.irl && typeof st.notebook.irl === 'object', 'the notebook fills irl in when it is first read');
  });
};
