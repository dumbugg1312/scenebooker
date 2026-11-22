'use strict';
// cutscene-audio.test — what the cutscenes sound like (js/content/cutscene-audio.js, js/audio/cutscene-audio.js):
// every cutscene has a mood, every picture it uses has an entry, every bed and every cue named is one that exists,
// the per-frame notes point at real frames, and the player's hooks are no-ops without an AudioContext.
const fs = require('fs'), path = require('path'), vm = require('vm');
const H = require('../helpers.js');

const MOODS = ['warm', 'tense', 'sad', 'big', 'road', 'quiet'];
const AMBS = ['crickets', 'rain', 'crowd', 'chatter', 'street', 'van', 'highway', 'kitchen', 'fluoro', 'room', 'bar', 'radio', 'wind'];
const HIT_POOLS = ['cs_knock', 'cs_doorSlam', 'cs_bottle', 'cs_roar', 'cs_cheer', 'cs_chirp', 'cs_vanDoor', 'cs_chairs', 'cs_staple', 'cs_tape',
  'cs_shutter', 'cs_mailslot', 'cs_xerox', 'cs_slap', 'cs_turn', 'cs_cassette', 'cs_feedback', 'cs_thunder'];
const SHARED_POOLS = ['buzz', 'coins', 'flip', 'place', 'slide', 'tear'];
const FILES = ['js/content/cutscene-audio.js', 'js/content/cutscene-audio-files.js', 'js/audio/sfx.js', 'js/audio/cutscene-audio.js'];

module.exports = function (t) {
  const sb = H.fresh({ packs: ['pensacola'], text: false });
  const missing = FILES.filter(f => !fs.existsSync(path.join(H.ROOT, f)));
  if (missing.length) { t.fail('missing: ' + missing.join(', ')); return; }
  FILES.forEach(f => vm.runInThisContext(fs.readFileSync(path.join(H.ROOT, f), 'utf8'), { filename: f }));
  const cuts = sb.Content.story.cutscenes, D = sb.Content.cutsceneAudio, F = sb.Content.cutsceneAudioFiles, CA = sb.CutsceneAudio;
  const cues = sb.Sfx.cues(), keys = Object.keys(cuts);
  const list = v => v == null ? [] : (Array.isArray(v) ? v : [v]);
  const arts = a => typeof a === 'object' && a ? Object.keys(a).map(k => a[k]) : [a || 'POSTCARD_FRONT'];

  H.section(t, 'moods', () => {
    t.eq(D.MOODS, MOODS, 'the six moods of the contract');
    keys.forEach(k => {
      t.ok(MOODS.indexOf(D.MOOD[k]) >= 0, k + ' has a mood of its own');
      t.eq(CA.moodOf(Object.assign({ key: k }, cuts[k])), cuts[k].mood || D.MOOD[k], k + ' plays that mood');
    });
    Object.keys(D.MOOD).forEach(k => t.ok(!!cuts[k], 'MOOD.' + k + ' is a cutscene'));
    D.MOOD_PREFIX.forEach(p => t.ok(MOODS.indexOf(p[1]) >= 0, 'prefix ' + p[0] + ' names a mood'));
    t.eq(CA.moodOf({ key: 'M_GOOD_9' }), 'big', 'a new good night is big');
    t.eq(CA.moodOf({ key: 'M_ROUGH_9' }), 'quiet', 'a new rough night is quiet');
    t.eq(CA.moodOf({ key: 'M_KNOCK_TALK_9' }), 'tense', 'a new knock is tense');
    t.eq(CA.moodOf({ key: 'M_FIGHT_9' }), 'tense', 'a new fight is tense');
    t.ok(MOODS.indexOf(CA.moodOf({ key: 'MS_HUNDRED' })) >= 0, 'a new milestone has a mood');
    t.eq(CA.moodOf({ key: 'NOBODY_KNOWS' }), D.MOOD_DEFAULT, 'an unknown key gets the default');
    t.eq(CA.moodOf({ key: 'M_GOOD_1', mood: 'sad' }), 'sad', 'a cutscene\'s own mood wins');
    t.eq(CA.moodOf({ key: 'M_GOOD_1', mood: 'loud' }), 'big', 'a mood that is not one is ignored');
  });

  H.section(t, 'pictures, beds and cues', () => {
    const used = {};
    keys.forEach(k => cuts[k].frames.forEach(f => arts(f.art).forEach(a => { used[a] = true; })));
    Object.keys(used).forEach(a => t.ok(!!D.ART[a], 'the picture ' + a + ' has an ART entry'));
    const cueOk = (c, where) => t.ok(cues.indexOf(c) >= 0, where + ': the cue ' + c + ' is an SB.Sfx cue');
    Object.keys(D.ART).forEach(a => {
      const e = D.ART[a];
      t.ok(e.amb === null || AMBS.indexOf(e.amb) >= 0, 'ART.' + a + ' bed ' + e.amb + ' is in the contract');
      t.ok(e.bleed === null || e.bleed === 'near' || e.bleed === 'far', 'ART.' + a + ' bleed is near, far or null');
      list(e.hit).forEach(c => cueOk(c, 'ART.' + a));
    });
    ['STAGE_BAND', 'STAGE_DIVE', 'CROWD_FRONT', 'SOLO_SET'].forEach(a => t.eq(D.ART[a].bleed, 'near', a + ' is in the room with the band'));
    ['CARPORT_NIGHT', 'SIDEWALK_LINE', 'YARD_NIGHT', 'DOOR_TABLE'].forEach(a => t.eq(D.ART[a].bleed, 'far', a + ' hears it through the wall'));
    t.eq(D.ART.POLICE_LIGHTS.bleed, null, 'the amps are off when the police are there');
    Object.keys(D.FRAMES).forEach(k => {
      t.ok(!!cuts[k], 'FRAMES.' + k + ' is a cutscene');
      Object.keys(D.FRAMES[k]).forEach(i => {
        const o = D.FRAMES[k][i];
        t.ok(cuts[k] && !!cuts[k].frames[+i], 'FRAMES.' + k + '.' + i + ' is a frame');
        if ('amb' in o) t.ok(o.amb === null || AMBS.indexOf(o.amb) >= 0, 'FRAMES.' + k + '.' + i + ' bed is in the contract');
        if ('bleed' in o) t.ok(o.bleed === null || o.bleed === 'near' || o.bleed === 'far', 'FRAMES.' + k + '.' + i + ' bleed');
        list(o.hit).forEach(c => cueOk(c, 'FRAMES.' + k + '.' + i));
      });
    });
    D.HIT_PREFIX.forEach(p => cueOk(p[2], 'HIT_PREFIX ' + p[0]));
    t.ok(AMBS.indexOf(D.DROP.amb) >= 0, 'the desk bed is in the contract');
    /* content may say it on the frame itself */
    keys.forEach(k => cuts[k].frames.forEach((f, i) => {
      if (f.amb != null) t.ok(AMBS.indexOf(f.amb) >= 0, k + '.' + i + ' amb is in the contract');
      list(f.sfx).forEach(c => cueOk(c, k + '.' + i));
    }));
    /* every cs.* cue draws only from the cutscene pools or the shared ones (sfx.js is read as text for its table) */
    const src = fs.readFileSync(path.join(H.ROOT, 'js/audio/sfx.js'), 'utf8');
    cues.filter(c => c.indexOf('cs.') === 0).forEach(c => {
      const m = new RegExp("'" + c.replace('.', '\\.') + "':\\s*(\\[\\[.*\\]\\]),?\\s*$", 'm').exec(src);
      t.ok(!!m, c + ' is in the CUES table');
      if (m) (m[1].match(/\['([A-Za-z_]+)'/g) || []).forEach(p => {
        const pool = p.slice(2, -1);
        t.ok(HIT_POOLS.indexOf(pool) >= 0 || SHARED_POOLS.indexOf(pool) >= 0, c + ' plays the pool ' + pool);
      });
    });
    HIT_POOLS.forEach(p => t.ok(src.indexOf("['" + p + "'") >= 0, 'the pool ' + p + ' is used by a cue'));
  });

  H.section(t, 'the plan of every cutscene', () => {
    keys.forEach(k => {
      const c = Object.assign({ key: k }, cuts[k]), p = CA.plan(c, {});
      t.eq(p.frames.length, c.frames.length, k + ' has a plan for every frame');
      p.frames.forEach((f, i) => {
        t.ok(f.amb === null || AMBS.indexOf(f.amb) >= 0, k + '.' + i + ' bed');
        t.ok(f.paper.length > 0 && f.paper.concat(f.hits).every(x => cues.indexOf(x) >= 0), k + '.' + i + ' paper and hits are cues');
        if (p.kind === 'DROP') t.eq(f.bleed, null, k + '.' + i + ' nothing bleeds onto the desk');
      });
    });
    const knock = CA.plan(Object.assign({ key: 'M_KNOCK_TALK_2' }, cuts.M_KNOCK_TALK_2), {});
    t.eq(knock.frames[0].hits, ['cs.knock'], 'the knock is on the first frame');
    t.eq(knock.frames[1].hits, ['cs.chirp'], 'the police lights chirp');
    t.eq(knock.frames[1].bleed, null, 'and nothing plays');
    const fight = CA.plan(Object.assign({ key: 'M_FIGHT_1' }, cuts.M_FIGHT_1), {});
    t.eq(fight.frames[1].hits, ['cs.bottle'], 'a bottle in the fight');
    t.eq(fight.frames[0].bleed, 'near', 'the band is playing when it starts');
    const first = CA.plan(Object.assign({ key: 'GOING_AWAY_open' }, cuts.GOING_AWAY_open), {});
    t.eq(first.frames[0].paper, ['cs.shutter'], 'a scene opens on the shutter');
    const tin = cuts.GOING_AWAY_open.frames.findIndex(f => f.art === 'HANDS_TIN');
    t.ok(tin > 0, 'the going-away scene has the tin');
    t.eq(first.frames[tin].amb, first.frames[tin - 1].amb, 'the tin holds the bed of the picture before it');
    t.eq(CA.plan(Object.assign({ key: 'ROOM_GONE' }, cuts.ROOM_GONE), { POLICE: true }).frames[0].art, 'POLICE_LIGHTS', 'a cause-keyed picture is resolved');
    t.eq(CA.plan(Object.assign({ key: 'ROOM_GONE' }, cuts.ROOM_GONE), {}).frames[0].paper, ['cs.note'], 'the note is taped up');
    t.eq(CA.plan({ key: 'M_KNOCK_NEW_1', kind: 'PANELS', frames: [{ art: 'DOOR_TABLE' }, { art: 'CROWD_FRONT', sfx: 'cs.cheer', amb: null, bleed: 'far' }] }, {}).frames
      .map(f => [f.amb, f.bleed, f.hits]), [['chatter', 'far', ['cs.knock']], [null, 'far', ['cs.cheer']]], 'a prefix hit, and a frame that says it itself');
  });

  H.section(t, 'the files that were built', () => {
    t.ok(F && typeof F.base === 'string' && F.music && F.amb && Array.isArray(F.hits), 'cutsceneAudioFiles has base, music, amb, hits');
    Object.keys(F.music).forEach(m => {
      t.ok(MOODS.indexOf(m) >= 0, 'music mood ' + m);
      F.music[m].forEach(f => t.ok(fs.existsSync(path.join(H.ROOT, F.base, f)), F.base + f + ' exists'));
    });
    Object.keys(F.amb).forEach(a => {
      t.ok(AMBS.indexOf(a) >= 0, 'bed ' + a);
      t.ok(fs.existsSync(path.join(H.ROOT, F.base, F.amb[a])), F.base + F.amb[a] + ' exists');
    });
    F.hits.forEach(h => t.ok(HIT_POOLS.indexOf(h) >= 0, 'hit pool ' + h));
    const noMusic = MOODS.filter(m => !(F.music[m] && F.music[m].length)), noAmb = AMBS.filter(a => !F.amb[a]), noHit = HIT_POOLS.filter(h => F.hits.indexOf(h) < 0);
    if (noMusic.length) t.note('no score yet for: ' + noMusic.join(', '));
    if (noAmb.length) t.note('no bed yet for: ' + noAmb.join(', '));
    if (noHit.length) t.note('no clip yet for: ' + noHit.join(', '));
  });

  H.section(t, 'no AudioContext, no sound, no error', () => {
    const c = Object.assign({ key: 'M_GOOD_1' }, cuts.M_GOOD_1);
    CA.start(c, { band: 'nobody' });
    CA.frame(0, c.frames[0], { band: 'nobody' }, 'PANELS');
    CA.turn('PANELS');
    CA.end(false);
    CA.frame(0, null, null, 'DROP'); CA.end(true);
    t.eq(CA.playing(), false, 'nothing is playing');
    t.eq(sb.Sfx.audio(), null, 'SB.Sfx.audio() is null without a context');
    t.eq(sb.Sfx.has('cs.knock'), false, 'and no cue has a take');
  });
};
