/* Scene Booker: js/ui/irl.js (styles in css/irl.css, prefix irl-)
 * SB.UI.parts.irl(line, opts): the IN REAL LIFE scrap, a torn bit of paper with a stamp and one line in toner type.
 *   line  string  the lesson, plain booking words
 *   opts  { compact: true }   a one-line version (stamp and line side by side, no tilt)
 *         { tone: 'hot' }     the line in the city's hot ink
 * Returns a <p role="note"> (null when the line is empty). Draws no people; the paper is css/irl.css.
 */
(function (SB) {
  'use strict';

  function h(t, a, k) { return SB.UI.h(t, a, k); }

  function irl(line, opts) {
    var o = opts || {}, text = line == null ? '' : String(line).trim(), cls;
    if (!text) return null;
    cls = 'irl' + (o.compact ? ' irl--compact' : '') + (o.tone === 'hot' ? ' irl--hot' : '');
    return h('p', { class: cls, role: 'note' }, [
      h('span', { class: 'irl__stamp', aria: { hidden: 'true' }, text: 'IN REAL LIFE' }),
      h('span', { class: 'irl__sr', text: 'In real life: ' }),
      h('span', { class: 'irl__line', text: text })
    ]);
  }

  SB.UI.part('irl', irl);
})(SB);
