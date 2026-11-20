'use strict';
// ahead.test — looking forward in the burnout load (C.AHEAD), on the golden show (test/fixtures/golden.js):
//   "if venues have a similar show the night before, [or] a bigger version of it the night after, less people will come".
//   * the same show draws fewer with a bigger similar show the night after than without, under the truth and under Par;
//   * a show of the same size or smaller, four nights on, held, cancelled, or the player's own not yet announced changes nothing;
//     a different crowd (a distant genre, another zone) costs far less than the matching bill;
//   * the night after costs more than the third night after;
//   * Crowd.load and Crowd.loads agree cell for cell with the forward part;
//   * the request's calendar flags a similar show the night before and a bigger one within three nights after, naming the room.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Model', 'Forecast', 'Notebook', 'Crowd', 'Requests'], 'looking ahead')) return;
  const SB = H.fresh({ packs: ['pensacola'] });
  const C = SB.Config, E = SB.Enums;
  // C.AHEAD is the one look-ahead rule: the older SAVING_IT (model.js) is gone, so a bigger show the night after is counted once.
  t.ok(C.SAVING_IT === undefined, 'there is no second look-ahead rule (C.SAVING_IT is gone)');
  const fx = golden.build(SB, { notebook: true });
  const clone = x => JSON.parse(JSON.stringify(x));
  const SAME = ['b11', 'b12', 'b13'];
  // a copy of the golden state with the other bookers' shows taken out, so only the show added by a case matters
  function copy() { const s = clone(fx.state); s.otherShows = []; return { state: s, show: s.shows.s1, day: fx.day }; }
  function other(day, bands, tier, extra) {
    return Object.assign({ id: 'ox' + day + tier, bookerId: 'p70', roomId: 'r22', zoneId: 'city', day: day, slot: 'EVENING', bands: bands, genres: [],
                           ages: 'ALL', price: 8, status: 'CONFIRMED', heads: null, q: null, tier: tier, hostScore: null }, extra || {});
  }
  function heads(f, mode) {
    const lens = SB.Forecast.lens(f.state, mode || 'TRUTH', { stale: false, luck: false }); lens.luck = false;
    return SB.Model.resolve(f.state, f.show, lens, f.show.mods).night.exact;
  }
  function withShow(add) { const f = copy(); add(f.state, f.day); return f; }
  const base = { TRUTH: heads(copy(), 'TRUTH'), PAR: heads(copy(), 'PAR') };
  const tier = SB.Crowd.showTier(fx.state, fx.show);

  H.section(t, 'a bigger similar show the night after', () => {
    ['TRUTH', 'PAR'].forEach(mode => {
      const h = heads(withShow((s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1))), mode);
      t.ok(h < base[mode] - 1, mode + ': fewer come with a bigger similar show the night after (' + h.toFixed(1) + ' against ' + base[mode].toFixed(1) + ')');
    });
    const one = heads(withShow((s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1))));
    const three = heads(withShow((s, D) => s.otherShows.push(other(D + 3, SAME, tier + 1))));
    t.ok(one < three, 'the night after costs more than the third night after (' + one.toFixed(1) + ' < ' + three.toFixed(1) + ')');
    const own = withShow((s, D) => {
      const c = clone(s.shows.s1); c.id = 's9'; c.day = D + 1; c.bill.slots = [{ bandId: 'b17', role: 'LOCAL' }]; c.promo = { announce: D - 20 };
      s.bands.b17.tierPublic = tier + 1; s.shows.s9 = c;
    });
    t.ok(heads(own) < base.TRUTH - 0.5, 'the player\'s own announced bigger show the night after counts too');
  });

  H.section(t, 'what changes nothing', () => {
    const cases = {
      'the same size': (s, D) => s.otherShows.push(other(D + 1, SAME, tier)),
      'smaller': (s, D) => s.otherShows.push(other(D + 1, SAME, Math.max(0, tier - 1))),
      'four nights on': (s, D) => s.otherShows.push(other(D + 4, SAME, tier + 1)),
      'a held date': (s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1, { status: 'HELD' })),
      'a cancelled one': (s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1, { status: 'CANCELLED' })),
      'the player\'s own, not yet announced': (s, D) => {
        const c = clone(s.shows.s1); c.id = 's9'; c.day = D + 1; c.bill.slots = [{ bandId: 'b17', role: 'LOCAL' }]; c.promo = { announce: null };
        s.bands.b17.tierPublic = tier + 1; s.shows.s9 = c;
      }
    };
    Object.keys(cases).forEach(k => {
      ['TRUTH', 'PAR'].forEach(mode => t.near(heads(withShow(cases[k]), mode), base[mode], 1e-9, mode + ': a bigger show ahead, ' + k + ', changes nothing'));
    });
    // A different crowd costs far less than the matching bill, though not nothing: no genre affinity is zero, and the few who
    // would drive in from another zone are that zone's crowd, worn by that zone's shows.
    const lostSame = base.TRUTH - heads(withShow((s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1))));
    const away = Object.keys(fx.state.zones).filter(z => z !== 'city')[0];
    if (away) {
      const lostAway = base.TRUTH - heads(withShow((s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1, { zoneId: away, roomId: null }))));
      t.ok(lostAway >= 0 && lostAway < lostSame / 10, 'the same bill in another zone (' + away + ') costs almost nothing (' + lostAway.toFixed(2) + ' against ' + lostSame.toFixed(1) + ')');
    }
    const far = E.GENRES.filter(g => ['emo', 'crust', 'hardcore'].every(x => C.AFFINITY[E.GENRE_INDEX[x]][E.GENRE_INDEX[g]] <= .25))[0];
    const fb = Object.keys(fx.state.bands).filter(id => fx.state.bands[id].genre === far)[0] || null;
    if (far && fb) {
      const lostFar = base.TRUTH - heads(withShow((s, D) => s.otherShows.push(other(D + 1, [fb], tier + 1))));
      t.ok(lostFar < lostSame / 2, 'a ' + far + ' bill ahead costs far less than the matching one (' + lostFar.toFixed(1) + ' against ' + lostSame.toFixed(1) + ')');
    } else t.note('ahead: no golden band of a distant genre; the genre case is skipped');
  });

  H.section(t, 'load and loads agree cell for cell', () => {
    const f = withShow((s, D) => {
      s.otherShows.push(other(D + 1, SAME, tier + 1));
      s.otherShows.push(other(D + 2, ['b14'], tier + 2));
      s.otherShows.push(other(D - 1, ['b17'], 1));
      s.otherShows.push(other(D + 3, ['b15', 'b16'], tier + 1, { status: 'HELD' }));
    });
    let bad = 0, fwd = 0;
    [undefined, 0, tier, tier + 1].forEach(tr => {
      const tab = SB.Crowd.loads(f.state, 'city', f.day, tr);
      for (let g = 0; g < 3; g++) E.GENRES.forEach((s, k) => {
        const one = SB.Crowd.load(f.state, 'city', g, s, f.day, tr);
        if (one !== tab[g][k]) bad++;
        if (tr === tier && one > SB.Crowd.load(f.state, 'city', g, s, f.day)) fwd++;
      });
    });
    t.eq(bad, 0, 'Crowd.load equals Crowd.loads in every cell, with and without a tier');
    t.ok(fwd > 0, 'with this show\'s tier the forward part adds to the load (' + fwd + ' cells)');
  });

  H.section(t, 'the warning on a request\'s date', () => {
    const SBt = H.fresh({ packs: ['pensacola'], text: true });
    const g = golden.build(SBt, { notebook: true });
    const s = g.state, D = g.day, tq = SBt.Crowd.showTier(s, { bill: { slots: [{ bandId: 'b12' }] } });
    s.otherShows = [];
    const view = () => SBt.Requests.view(s, 'q1').dates.filter(d => d.day === D)[0];
    t.eq(view().crowd, [], 'no warning on a clear week');
    t.eq(SBt.Crowd.near(s, 'city', ['b12'], D), { before: [], after: [] }, 'Crowd.near finds nothing on a clear week');
    s.otherShows.push(other(D - 1, ['b17'], 1, { genres: ['hardcore'] }));
    let n = SBt.Crowd.near(s, 'city', ['b12'], D);
    t.eq(n.before.map(x => x.day), [D - 1], 'a similar show the night before is flagged');
    t.eq(n.after, [], 'and nothing after');
    let c = view().crowd;
    t.ok(c.length === 1 && c[0].toLowerCase().indexOf('the downtown room') >= 0 && c[0].indexOf(SBt.time.fmt(D - 1, 'long')) >= 0,
         'the line names the room and the night (' + c[0] + ')');
    s.otherShows.push(other(D + 2, ['b17'], tq + 1, { genres: ['hardcore'], roomId: 'r23' }));
    s.otherShows.push(other(D + 1, ['b17'], tq, { genres: ['hardcore'] }));                        // the same size: no flag
    s.otherShows.push(other(D + 3, ['b17'], tq + 1, { genres: ['hardcore'], status: 'HELD' }));   // held: no flag
    s.otherShows.push(other(D + 4, ['b17'], tq + 1, { genres: ['hardcore'] }));                   // too far: no flag
    s.otherShows.push(other(D + 1, ['b15'], tq + 1, { genres: ['ska'] }));                        // another crowd: no flag
    n = SBt.Crowd.near(s, 'city', ['b12'], D);
    t.eq(n.after.map(x => x.day + ':' + x.roomId), [(D + 2) + ':r23'], 'only the bigger similar public show within three nights is flagged after');
    c = view().crowd;
    t.eq(c.length, 2, 'two lines: the night before and the bigger one after');
    t.ok(c[1] && c[1].toLowerCase().indexOf('the back room') >= 0 && c[1].indexOf(SBt.time.fmt(D + 2, 'long')) >= 0, 'the second names the room and the night (' + c[1] + ')');
    t.eq(view().clash.indexOf('the back room'), -1, 'the warning is not a clash');
  });

  H.section(t, 'after the show: saving it is sayable', () => {
    if (!SB.Feedback) { t.note('ahead: no Feedback; the cause case is skipped'); return; }
    const comp = f => (SB.Feedback.causes(f.state, 's1').filter(c => c.cause === 'COMPETITION')[0]) || null;
    const ahead = comp(withShow((s, D) => s.otherShows.push(other(D + 1, SAME, tier + 1))));
    t.ok(ahead && ahead.d < 0 && ahead.after === true, 'COMPETITION carries the loss and marks the bigger show after as its larger part (' + JSON.stringify(ahead) + ')');
    const same = withShow((s, D) => s.otherShows.push(other(D, SAME, tier)));
    const night = comp(same);
    t.ok(night && night.d < 0 && !night.after, 'a show the same night is COMPETITION without the mark');
    const SBt = H.fresh({ packs: ['pensacola'], text: true });
    const line = SBt.text.line('feedback.comments.COMPETITION.ANY.DOWN.LEARNING', { savingIt: true, aheadShow: 'the downtown room', aheadNight: 'Friday' }, null);
    t.ok(/saving it/i.test(line) && line.indexOf('the downtown room') >= 0, 'the saving-it line is chosen when it is the case (' + line + ')');
  });
};
