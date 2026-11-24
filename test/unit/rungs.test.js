'use strict';
// rungs.test — a guided start fills the desk in show by show (js/engine/story/rungs.js).
//   off unless the game started guided; rung follows shows played; the desk, the friend's chores, the hidden extras
//   and the put-off day job all follow the rung; an old save without the setting sees everything.
const H = require('../helpers.js');

const NEED = ['Rungs', 'Game', 'Jobs', 'Money', 'Week'];

module.exports = function (t) {
  if (!H.needs(t, NEED, 'the ladder')) return;
  const sb = H.fresh({ packs: ['pensacola'], text: false });
  const R = sb.Rungs;
  function guided(seed) {
    return sb.Game.newGame({ seed: seed, citySlug: 'pensacola', bookingName: 'Carport Weather', mark: H.MARK,
                             settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL' }, tune: null, tutorial: true });
  }

  H.section(t, 'off by default', () => {
    const s = H.newGame(sb, { seed: 'rungs-off' });
    t.ok(!s.settings.ladder, 'a game not started guided has no ladder');
    t.eq(R.rung(s), R.AT.length - 1, 'off: the top rung');
    t.ok(R.onDesk(s, 'tin') && R.onDesk(s, 'jacket'), 'off: everything on the desk');
    t.ok(!R.covers(s, 'ADVANCE') && !R.hides(s, 'HAND_OUT') && !R.billsWaiting(s), 'off: nothing covered, hidden or put off');
    t.eq(s.player.dayJob, 'FULL', 'off: the day job from day one');
  });

  H.section(t, 'a guided start', () => {
    const s = guided('rungs-on');
    t.ok(s.settings.ladder && R.rung(s) === 0, 'guided: on, at rung 0');
    ['calendar', 'lamp', 'paper', 'clips', 'clip0', 'phone', 'drawer', 'tin'].forEach(id => t.ok(R.onDesk(s, id), id + ' is out'));
    Object.keys(R.DESK).filter(id => id !== 'tin').forEach(id => t.ok(!R.onDesk(s, id), id + ' waits'));   // the tin is out from night one (1.17): the bank figure
    t.ok(R.mentor(s), 'the friend who handed it over is there');
    t.ok(!R.covers(s, 'PRINT') && !R.covers(s, 'FLYER_RUN') && !R.covers(s, 'LISTINGS') && !R.covers(s, 'MAKE_FLYER') && !R.covers(s, 'ANNOUNCE'), 'getting the word out is yours from the first show');
    t.ok(R.covers(s, 'ADVANCE') && R.covers(s, 'HOUSE_RULES') && R.covers(s, 'NEIGHBORS') && R.covers(s, 'THANKS'), 'the friend covers the running-the-night chores');
    t.ok(R.hides(s, 'HAND_OUT') && R.hides(s, 'LOCAL_AD'), 'the extras wait');
    t.ok(R.covers(s, 'LOCK_BILL'), 'the friend locks the bill on the first show');
    t.eq(s.player.dayJob, 'FULL', 'the day job from day one: work nights from the first show');
    t.eq(s.player.dayJobLater, null, 'nothing put off');
    t.ok(R.billsWaiting(s) && sb.Money.billsSettled(s), 'no rent yet');
    t.ok(R.isNew(s, 'notebook') === false, 'nothing is new before it is out');
  });

  H.section(t, 'climbing', () => {
    const s = guided('rungs-climb');
    s.player.showsPlayed = 1;
    t.eq(R.rung(s), 1, 'one show: rung 1');
    t.ok(R.onDesk(s, 'notebook') && R.isNew(s, 'notebook'), 'the notebook comes out, new');
    R.opened(s, 'notebook');
    t.ok(!R.isNew(s, 'notebook'), 'opened: no longer new');
    s.player.showsPlayed = 2;
    t.ok(R.onDesk(s, 'stickers') && R.onDesk(s, 'keys') && R.covers(s, 'ADVANCE'), 'two shows: bands and rooms, the friend still advances');
    t.ok(!R.covers(s, 'LOCK_BILL'), 'two shows: locking the bill is yours');
    s.player.showsPlayed = 5;
    t.eq(R.rung(s), 4, 'five shows: rung 4');
    t.ok(!R.covers(s, 'ADVANCE') && !R.hides(s, 'HAND_OUT') && R.onDesk(s, 'mug') && R.onDesk(s, 'tin'), 'the chores and the extras are yours');
    t.ok(!R.billsWaiting(s), 'the rent comes due');
    s.player.dayJob = 'NONE'; s.player.dayJobLater = 'FULL';   // a save from before the day job started on day one
    R.weekly(s);
    t.ok(s.player.dayJob === 'FULL' && s.player.dayJobLater === null, 'an old save: the day job starts at the week turn');
    s.player.showsPlayed = 8;
    t.ok(Object.keys(R.DESK).every(id => R.onDesk(s, id)), 'eight shows: the whole desk');
  });

  H.section(t, 'a covered job is AUTO and off the tray', () => {
    const s = guided('rungs-tray');
    const tray = sb.Jobs.tray(s), all = [].concat(tray.late, tray.thisWeek, tray.soon, tray.later);
    t.ok(all.every(v => !R.covers(s, v.type) && !R.hides(s, v.type)), 'nothing covered or hidden on the tray');
    Object.keys(s.jobs).forEach(id => {
      const j = s.jobs[id];
      if (R.covers(s, j.type) && (j.status === 'TODO')) t.eq(sb.Jobs.modeOf(s, j), 'AUTO', j.type + ' runs itself');
    });
  });
};
