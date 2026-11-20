'use strict';
// harm.test — 06-harness section 3, `harm.test`, from mechanics 14 and 02-engine 7.19:
//   * never two matters open; none before week 12;
//   * no generated text for a matter contains anything but the lines of people.harm;
//   * listing a person flags every band they join.
// The first two are read across played years (needs the whole engine); the third runs on the golden fixture.
const H = require('../helpers.js');
const golden = require('../fixtures/golden.js');

// A template as a RegExp that matches whatever it can render: slots become "anything", optional blocks become optional.
function variants(s) {
  let out = [String(s)];
  for (let guard = 0; guard < 6; guard++) {
    const next = []; let again = false;
    out.forEach(v => {
      const i = v.indexOf('[');
      if (i < 0 || next.length > 200) { next.push(v); return; }
      let depth = 0, j = i; const bars = [i];
      for (; j < v.length; j++) { const c = v[j]; if (c === '\\') { j++; continue; } if (c === '[') depth++; else if (c === ']') { depth--; if (depth === 0) break; } else if (c === '|' && depth === 1) bars.push(j); }
      bars.push(j);
      for (let k = 0; k + 1 < bars.length; k++) { next.push(v.slice(0, i) + v.slice(bars[k] + 1, bars[k + 1]).replace(/^\s*\?!?[A-Za-z0-9_.]+:\s*/, '').replace(/\^\d+(\.\d+)?\s*$/, '') + v.slice(j + 1)); again = true; }
    });
    out = next; if (!again) break;
  }
  return out;
}
function toRegex(tmpl) {
  let s = tmpl.replace(/\(\?!?[A-Za-z0-9_.]+:\s?/g, '\u0001').replace(/\(%\d+(\.\d+)?:\s?/g, '\u0001');          // optional blocks: open marker
  let out = '', depth = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\u0001') { out += '(?:'; depth++; continue; }
    if (c === ')' && depth > 0) { out += ')?'; depth--; continue; }
    if (c === '{') { const e = s.indexOf('}', i); out += '.*?'; i = e; continue; }
    if (c === '\\') { i++; out += s[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); continue; }
    out += c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  return new RegExp('^\\s*' + out.replace(/\s+/g, '\\s+') + '\\s*$', 'is');
}
function nodes(n) { if (typeof n === 'string') return [n]; if (Array.isArray(n)) return [].concat.apply([], n.map(nodes)); if (n && typeof n.t === 'string') return [n.t]; if (n && typeof n === 'object') return [].concat.apply([], Object.keys(n).map(k => nodes(n[k]))); return []; }

module.exports = function (t) {
  const run = require('../bots/run.js');

  /* ---- listing a person flags every band they join ---- */
  if (H.needs(t, ['Harm', 'People', 'Bands'], 'listing')) H.section(t, 'listing', () => {
    const SB = H.fresh({ packs: ['pensacola'] });
    const f = golden.build(SB, { notebook: true }), st = f.state;
    const r = SB.Harm.add(st, 'p58', 'a reason of the player\'s own', 'BAND_PARTS', {});
    t.ok(r && r.ok !== false, 'the player may list anyone at any time' + (r && r.ok === false ? ': ' + r.why : ''));
    t.ok(SB.Harm.flags(st, 'b13').listed.indexOf('p58') >= 0, 'the band a listed person is in is flagged');
    t.eq(SB.Harm.flags(st, 'b11').listed, [], 'a band without them is not');
    // they join another band: the flag follows them
    st.bands.b11.members.push({ personId: 'p58', instrument: 'BASS', since: st.clock.week, founder: false }); st.people.p58.bands.push('b11');
    t.ok(SB.Harm.flags(st, 'b11').listed.indexOf('p58') >= 0, 'listing a person flags every band they join');
    const ft = SB.Harm.flags(st, 'b11').text; t.ok(ft === null || typeof ft === 'string', 'the flag carries a line (or null) for the band card');
    const list = SB.Harm.list(st);
    t.ok(list.length === 1 && list[0].personId === 'p58', 'the list shows the person');
    const rm = SB.Harm.remove(st, 'p58');
    t.ok(rm && rm.ok !== false, 'a person can be taken off the list');
    t.eq(SB.Harm.flags(st, 'b11').listed, [], 'and the flag goes with them');
  });

  /* ---- across played years ---- */
  if (!H.needs(t, ['Night', 'Harm', 'Legacy', 'Notebook', 'Forecast', 'Feedback'], 'matters across six years')) return;
  H.section(t, 'matters across play', () => {
    const SB0 = H.fresh({ packs: ['pensacola'], text: true });
    const harm = SB0.Content.people && SB0.Content.people.harm;
    const rx = [];
    if (harm) nodes(harm).forEach(tm => variants(tm).forEach(v => rx.push(toRegex(v))));
    else t.note('harm: js/content/people.js has no harm lines yet; text is not checked');
    let opened = 0, firstWeek = null, two = 0, badText = [], decisions = 0;
    for (let i = 0; i < 4; i++) {
      let seen = null;
      const r = run.runGame({
        sb: SB0, seed: 'harm-' + i, bot: i % 2 ? 'learner' : 'checklist', weeks: 312, city: 'pensacola', text: true,
        hooks: { afterWeek: (state, SB, row) => {
          const open = state.harm && state.harm.open;
          if (open && open.id !== seen) {
            seen = open.id; opened++;
            if (firstWeek === null || row.week < firstWeek) firstWeek = row.week;
            if (open.week !== undefined && open.week < 12) t.fail('a matter opened before week 12 (week ' + open.week + ')');
            const msg = state.mail.messages.filter(m => m.kind === 'HARM' && m.refs && (m.refs.harmId === open.id || m.day === open.week * 7 + 0)).concat(state.mail.messages.filter(m => m.kind === 'HARM').slice(-1))[0];
            if (msg && rx.length && !rx.some(x => x.test(msg.body || ''))) badText.push((msg.body || '').slice(0, 80));
          }
          const pend = (state.clock.pending || []).filter(s => s.kind === 'DECISION' && s.decision.kind === 'HARM').length;
          const cur = state.clock.stop && state.clock.stop.kind === 'DECISION' && state.clock.stop.decision.kind === 'HARM' ? 1 : 0;
          if (pend + cur > 1) two++;
        } }
      });
      if (!r.ok) { t.fail('seed ' + i + ' threw: ' + r.error.message); return; }
    }
    t.eq(two, 0, 'never two matters open at once');
    t.ok(firstWeek === null || firstWeek >= 12, 'no matter before week 12 (first seen in week ' + firstWeek + ')');
    t.eq(badText.slice(0, 3), [], 'the text of every matter is made of the lines of people.harm only');
    t.note('harm: ' + opened + ' matters opened across four six-year games');
  });
};
