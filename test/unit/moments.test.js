'use strict';
// moments.test — the short scenes after a show night and the milestones (js/engine/story/moments.js,
// design/cutscenes-draft.md): which night queues which scene, one at a time, the cooldowns, the versions in turn,
// a chapter's scene winning, the guided show left alone, milestones once and kept for the box.
const H = require('../helpers.js');

const NEED = ['Chapters', 'Moments', 'Legacy'];

module.exports = function (t) {
  if (!H.needs(t, NEED, 'the moments')) return;
  const sb = H.fresh({ packs: ['pensacola'], text: false });
  const cuts = sb.Content.story.cutscenes;

  function game(seed, packedDone) {
    const s = H.newGame(sb, { seed: seed });
    s.story.cutscenes = []; s.story.tutorial.showId = 'guided';
    s.story.moments = sb.Moments.blank();
    if (packedDone !== false) s.story.moments.ms.MS_FIRST_PACKED = 0;     // a line down the block is also the first packed room
    s.legacy = s.legacy || {}; s.legacy.records = s.legacy.records || {};
    return s;
  }
  const ids = s => Object.keys(s.bands).sort().slice(0, 3);
  let k = 0;
  /* one show night: n shows played after it; rec fields override */
  function night(s, n, rec, opts) {
    opts = opts || {};
    const id = opts.id || 'mt' + (++k), b = ids(s);
    const bill = (opts.bill || b).map((bandId, i) => ({ bandId, role: opts.touring === i ? 'TOURING' : 'LOCAL' }));
    s.player.showsPlayed = n;
    s.legacy.records[id] = Object.assign({ showId: id, day: n * 7, roomName: 'the test carport', bill, heads: 40, paid: 35, verdict: 'HELD',
                                           choices: [], incidents: [], detail: null }, rec || {});
    const before = s.story.cutscenes.length;
    if (opts.chapter) s.story.cutscenes.push({ key: 'THIN_open', slots: {} });
    const key = sb.Moments.afterShow(s, { id, bill: { slots: bill } }, before);
    return { key, id, queued: s.story.cutscenes.slice() };
  }
  const line = { choices: [{ decision: 'LINE_DOWN_THE_BLOCK', option: 'LET_IN' }] };

  H.section(t, 'the words are there', () => {
    ['M_LINE_IN_1', 'M_GOOD_1', 'M_ROUGH_1', 'MS_TEN', 'MS_A_YEAR'].forEach(key => t.ok(!!cuts[key], key + ' has words'));
    t.ok(sb.Moments.versions('FIGHT').every(x => /^M_FIGHT_\d+$/.test(x)), 'FIGHT versions do not take FIGHT_CALL');
  });

  H.section(t, 'a night stop and what was chosen', () => {
    const s = game('mom-a');
    const a = night(s, 3, line);
    t.eq(a.key, 'M_LINE_IN_1', 'letting the line in queues the first version');
    t.eq(a.queued.length, 1, 'one scene for the show');
    const sl = a.queued[0].slots;
    t.eq(sl.band, s.bands[ids(s)[2]].name, 'band is the last band on the bill');
    t.eq(sl.room, 'the test carport', 'room is that night\'s room');
    t.ok(String(sl.seed).indexOf(a.id) >= 0, 'the pictures are seeded by the show');
    s.story.cutscenes = [];
    t.eq(night(s, 5, line).key, null, 'the same group waits five shows');
    t.eq(night(s, 6, { choices: [{ decision: 'LINE_DOWN_THE_BLOCK', option: 'CAP' }] }).key, null, 'capping is the same group, still waiting');
    t.eq(night(s, 8, line).key, 'M_LINE_IN_2', 'after five shows the next version plays');
    s.story.cutscenes = [];
    t.eq(night(s, 9, { choices: [{ decision: 'A_FIGHT', option: 'CALL_IT' }, { decision: 'LINE_DOWN_THE_BLOCK', option: 'LET_IN' }] }).key,
      'M_FIGHT_CALL_1', 'the more serious stop wins');
  });

  H.section(t, 'plain nights, theft and the week', () => {
    const s = game('mom-b');
    t.eq(night(s, 2, { verdict: 'WALL' }).key, 'M_GOOD_1', 'a great night with nothing else in it');
    s.story.cutscenes = [];
    t.eq(night(s, 3, { verdict: 'ROUGH' }).key, null, 'a plain night waits since the last moment');
    t.eq(night(s, 5, { verdict: 'THIN' }).key, 'M_ROUGH_1', 'then a thin night gets one');
    s.story.cutscenes = [];
    t.eq(night(s, 6, { incidents: ['THEFT'] }).key, 'M_TIN_SHORT_1', 'money missing from the tin');
    s.story.cutscenes = [];
    sb.Moments.note(s, 'storm1', 'STORM_WATCH', 'GO_AHEAD');
    t.eq(night(s, 7, {}, { id: 'storm1' }).key, 'M_RAIN_1', 'went ahead in the storm (a week choice)');
    t.ok(!s.story.moments.weekChoices.storm1, 'the week choice is cleared after its night');
    s.story.cutscenes = [];
    t.eq(night(s, 8, { verdict: 'HELD' }).key, null, 'an ordinary night gets nothing');
  });

  H.section(t, 'chapters and the guided show come first', () => {
    const s = game('mom-c');
    const c = night(s, 3, line, { chapter: true });
    t.eq(c.key, null, 'a chapter scene queued by the same show: no moment');
    t.eq(c.queued.length, 1, 'only the chapter\'s');
    s.story.cutscenes = [];
    t.eq(night(s, 4, line, { id: 'guided' }).key, null, 'the guided first show gets none');
  });

  H.section(t, 'milestones', () => {
    const p = game('mom-p', false);
    t.eq(night(p, 3, line).key, 'MS_FIRST_PACKED', 'the first line down the block is the first packed room');
    p.story.cutscenes = [];
    t.eq(night(p, 4, { incidents: ['OVER_CAP'] }).key, null, 'and only the first');
    const s = game('mom-d');
    t.eq(night(s, 10, line).key, 'MS_TEN', 'the tenth show is a milestone, ahead of a moment');
    s.story.cutscenes = [];
    t.eq(night(s, 11, line).key, 'M_LINE_IN_1', 'once: the next night is a moment again');
    s.story.cutscenes = [];
    const tour = night(s, 20, {}, { touring: 0 });
    s.story.cutscenes = [];
    const back = night(s, 21, {}, { touring: 0 });
    t.eq(back.key, 'MS_BACK_THROUGH', 'a touring band back through (first visit: ' + tour.key + ')');
    s.story.tutorial.cast = { kids: ids(s)[1] };
    s.story.cutscenes = [];
    const kb = night(s, 22, {}, { bill: [ids(s)[0], ids(s)[1]] });
    t.eq(kb.key, 'MS_KIDS_BAND', 'the kids\' band closes a bill');
    t.eq(kb.queued[0].slots.kids, s.bands[ids(s)[1]].name, 'with their name');
    sb.Chapters.markSeen(s, 'MS_KIDS_BAND');
    const box = sb.Chapters.drops(s).filter(d => d.key === 'MS_KIDS_BAND')[0];
    t.ok(box && box.seen, 'kept in the box once seen');
    t.eq(sb.Chapters.slots(s, 'MS_KIDS_BAND').kids, s.bands[ids(s)[1]].name, 'watched again with the same names');
    const before = JSON.stringify(s);
    sb.Moments.milestones(s); sb.Moments.kept(s, 'MS_TEN'); sb.Moments.versions('GOOD');
    t.eq(JSON.stringify(s), before, 'the views do not change the state');
  });
};
