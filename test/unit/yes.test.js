'use strict';
// yes.test — a yes is a yes (the booker, 2026-11-21: "once they confirm its confirmed"). There is no second "confirm"
// message: the room's yes books the night, or, when the room wants something first, books it the day the player has it.
// Second in line stays second in line until whoever is ahead lets the night go. On the golden show (test/fixtures/golden.js).
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

module.exports = function (t) {
  if (!H.needs(t, ['Rooms', 'Shows', 'Mail'], 'a yes is a yes')) return;
  const SB = H.fresh({ packs: ['pensacola'] });

  /* the golden show taken back to a draft holding its room, first in line unless `ahead` holds it first */
  function draft(roomId, ahead) {
    const f = golden.build(SB, { notebook: true });
    const room = f.state.rooms[roomId];
    Object.keys(f.state.rooms).forEach(id => { delete f.state.rooms[id].calendar[f.day]; });
    const mine = { by: 'player', state: 'SOFT', since: f.day - 30, expires: f.day, showId: 's1' };
    room.calendar[f.day] = { state: 'HELD', holds: ahead ? [ahead, mine] : [mine] };
    f.show.status = 'DRAFT'; f.show.confirmedDay = null; f.show.roomId = roomId; f.show.zoneId = room.zoneId;
    f.show.hold = { rank: ahead ? 2 : 1, expires: f.day };
    f.show.door.ages = room.ages[0];
    f.state.money.fund = 2000;
    return f;
  }
  const held = (f, roomId) => f.state.rooms[roomId].calendar[f.day].holds.find(h => h.by === 'player');

  H.section(t, 'the room wants something first', () => {
    const f = draft('r23');                                // the bar: it wants security on the night
    t.ok(typeof SB.Rooms.firmUp === 'function', 'Rooms.firmUp exists');
    t.eq(SB.Rooms.firmUp(f.state, 's1').length, 0, 'without security the bar holds the night and nothing is booked');
    t.eq(f.show.status, 'DRAFT', 'the show is still a draft');
    SB.Shows.assignCrew(f.state, 's1', 'security', 'p42');
    const recs = SB.Rooms.firmUp(f.state, 's1');
    t.ok(recs.some(r => r.change === 'CONFIRMED'), 'with security on, the bar books it with no second message');
    t.eq(f.show.status, 'CONFIRMED', 'the show is booked');
    t.eq(held(f, 'r23').state, 'CONFIRMED', 'the hold is confirmed on the calendar');
    t.eq(SB.Rooms.firmUp(f.state, 's1').length, 0, 'a booked show is left alone');
  });

  H.section(t, 'the day after the player has it', () => {
    const f = draft('r23');
    SB.Shows.assignCrew(f.state, 's1', 'security', 'p42');
    SB.Rooms.daily(f.state, f.state.clock.day);
    t.eq(f.show.status, 'CONFIRMED', 'the daily pass books a held show that now has what the room asked for');
  });

  H.section(t, 'second in line', () => {
    const f = draft('r21', { by: 'b1', state: 'SOFT', since: 0, expires: null, showId: 'o-x' });
    t.eq(SB.Rooms.firmUp(f.state, 's1').length, 0, 'second in line is not booked');
    t.eq(f.show.status, 'DRAFT', 'the show waits its turn');
  });
};
