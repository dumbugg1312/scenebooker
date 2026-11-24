'use strict';
// playerband.test: the player's own band (fix list 4.9): a flagged free local act, once, with state.player.band set.
const H = require('../helpers.js');

module.exports = function (t) {
  if (!H.needs(t, ['Game', 'Bands', 'WorldGen'], 'the player band')) return;
  const sb = H.fresh({ packs: ['pensacola'], text: false });
  H.section(t, 'your band is a free local act', () => {
    const st = H.newGame(sb, { seed: 'player-band', bookingName: 'Tin Lid', tutorial: false });
    t.eq(st.player.band, null, 'no band until one is asked for');
    const b = sb.Bands.addPlayerBand(st, { name: 'Wet Cement', genre: 'garage' });
    t.ok(b && b.playerBand === true && b.local, 'a local band flagged playerBand');
    t.eq(b.name, 'Wet Cement', 'it has the name');
    t.eq(b.ask.amount, 0, 'it plays for nothing');
    t.eq(st.player.band.name, 'Wet Cement', 'state.player.band keeps the name');
    t.eq(st.player.band.genre, 'garage', 'and the genre');
    t.ok(sb.Bands.list(st).indexOf(b.id) >= 0, 'it is on the list the bill picker reads');
    t.eq(sb.Bands.addPlayerBand(st, { name: 'Another' }).id, b.id, 'only one');
  });
};
