'use strict';
// irl-content.test — js/content/irl.js (design/spec/13-real-booking.md parts 1 and 3): every CAUSE has its line, whatIf
// and unknown; the settle, cancel and answer keys are all there; every key in `step` is a CAUSE or a JOB and every
// value a step; every string lints and renders with and without the optional slots; no lesson uses a game term.
// Loads only the core and irl.js, so it is cheap.
const path = require('path');
const load = require('../load.js');
const H = require('../helpers.js');

function fresh() {
  delete globalThis.SB;
  load.CORE.forEach(load.run);
  load.run('js/content/irl.js');
  globalThis.SB.log.echo = false;
  return globalThis.SB;
}

module.exports = function (t) {
  const SB = fresh(), E = SB.Enums, I = SB.Content.irl;
  t.ok(I && typeof I === 'object', 'SB.Content.irl exists');
  if (!I) return;

  const causes = Object.keys(E.CAUSE).filter(k => typeof E.CAUSE[k] === 'string');
  const jobs = Object.keys(E.JOB).filter(k => typeof E.JOB[k] === 'string');
  t.eq(causes.length, 30, 'thirty causes');

  /* every cause: line, whatIf, unknown, story slot */
  const miss = [];
  causes.forEach(c => {
    const e = I.cause[c];
    if (!e) { miss.push(c); return; }
    ['line', 'whatIf', 'unknown'].forEach(k => { if (typeof e[k] !== 'string' || !e[k].trim()) miss.push(c + '.' + k); });
    if (!('story' in e) || e.story !== null) miss.push(c + '.story (null until written)');
    if (typeof e.unknown === 'string' && e.unknown.indexOf('You couldn\'t have known') !== 0) miss.push(c + '.unknown starts "You couldn\'t have known"');
  });
  t.eq(miss, [], 'every CAUSE has line, whatIf, unknown and story: null');
  t.eq(Object.keys(I.cause).filter(c => causes.indexOf(c) < 0), [], 'cause holds only real CAUSE keys');

  /* the other groups */
  const shortfall = Object.keys(E.SHORTFALL).filter(k => typeof E.SHORTFALL[k] === 'string');
  t.eq(shortfall.filter(k => !(I.settle[k] && I.settle[k].line)), [], 'settle has a line for every SHORTFALL choice');
  t.eq(['EARLY', 'MID', 'LATE', 'RESPECTED'].filter(k => !(I.cancel[k] && I.cancel[k].line)), [], 'cancel has EARLY, MID, LATE, RESPECTED');
  t.eq(['PASSED', 'NEVER', 'PASSED_ON'].filter(k => !(I.answer[k] && I.answer[k].line)), [], 'answer has PASSED, NEVER, PASSED_ON');
  ['settle', 'cancel', 'answer'].forEach(g => Object.keys(I[g]).forEach(k => t.ok(I[g][k].story === null, g + '.' + k + '.story is null')));

  /* steps */
  t.eq(I.steps, ['DATE', 'ROOM', 'DEAL', 'BILL', 'CREW', 'ANNOUNCE', 'NIGHT', 'SETTLE'], 'the eight steps in order');
  t.eq(I.steps.filter(s => !I.stepLabel[s]), [], 'every step has a label');
  t.eq(Object.keys(I.step).filter(k => causes.indexOf(k) < 0 && jobs.indexOf(k) < 0), [], 'every key in step is a CAUSE or a JOB');
  t.eq(Object.keys(I.step).filter(k => I.steps.indexOf(I.step[k]) < 0), [], 'every step value is one of the eight steps');
  t.eq(causes.concat(jobs).filter(k => !I.step[k]), [], 'every CAUSE and every JOB has a step');

  /* strings: lint, length, game terms, banned words */
  const banned = H.compile(H.bannedGeneral());
  const bad = [], terms = [], long = [], hits = [];
  const GAME = /\b(Par|Name|Word|Beat|Call|notebook)\b|\d+ trust|trust [+−-]?\d/;
  H.eachString(I, (p, s) => {
    if (/^(steps|stepLabel|step)(\.|\[|$)/.test(p)) return;
    const m = SB.text.lint(s); if (m) bad.push(p + ': ' + m);
    if (GAME.test(s)) terms.push(p);
    const n = (s.replace(/\([^)]*\)/g, '').match(/[^.!?]+[.!?]+(\s|$)/g) || [s]).length;
    if (n > 2) long.push(p);
    const h = H.bannedHits(s, banned); if (h.length) hits.push(p + ': ' + h.join(', '));
  });
  t.eq(bad, [], 'every string lints');
  t.eq(terms, [], 'no line uses a game term (Par, Name, Word, Beat, Call, trust numbers)');
  t.eq(long, [], 'every line is one or two sentences');
  t.eq(hits, [], 'no banned word');

  /* whatIf renders cleanly with and without the optional slots */
  const r = (s, ctx) => SB.text.render(s, ctx, null);
  t.eq(r(I.cause.PROMO_FLYER.whatIf, { n: 9, gen: 'old heads', money: 90 }),
       'The flyer done the week the room was confirmed: about 9 more people, mostly old heads (about $90).', 'whatIf with every slot');
  t.eq(r(I.cause.PROMO_FLYER.whatIf, { n: 9 }), 'The flyer done the week the room was confirmed: about 9 more people.', 'whatIf with n alone');
  const holes = [];
  causes.forEach(c => {
    ['whatIf', 'unknown'].forEach(k => {
      [{ n: 7 }, { n: 7, gen: 'kids' }, { n: 7, money: 70 }, { n: 7, gen: 'kids', money: '$70' }].forEach(ctx => {
        const out = r(I.cause[c][k], ctx);
        if (/[{}]|\(\)|\s[.,]|undefined|NaN|\.\.|,,/.test(out)) holes.push(c + '.' + k + ': ' + out);
      });
    });
  });
  t.eq(holes, [], 'every whatIf and unknown renders without a hole');
  t.eq(causes.filter(c => ['HOSPITALITY', 'PAY'].indexOf(c) < 0 && I.cause[c].whatIf.indexOf('{n}') < 0), [], 'every head-counting whatIf carries {n}');
  t.ok(path.basename(__filename) === 'irl-content.test.js', 'file name');
};
