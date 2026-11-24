'use strict';
// slots.test — fix-list 0.13: no message prints with its money, count or name missing.
//   * across a played game with text on, no line under people., jobs. or requests. renders an empty slot
//     ({of1}/{of2} are the month words, empty on purpose when both dates share a month);
//   * a crew yes with or without a stated rate has no gap ("for ." / "for I'll");
//   * every job and message the game wrote has no "{", "undefined", "null", " ." or "$ " in it.
const H = require('../helpers.js');

const BAD = [/\{|\}/, /undefined/, /\bnull\b/, /\$ /, /\s\./, /\bfor \./, /\.\s+copies\b/, /  +\./];

module.exports = function (t) {
  if (!H.needs(t, ['Night', 'Jobs', 'People', 'Mail'], 'slots')) return;
  const run = require('../bots/run.js');
  /* {of1}/{of2} and {tbaNote} are empty on purpose (same month; no bands to write in yet) */
  const OK_EMPTY = /^\{(of1|of2|tbaNote)\}$/;
  const MINE = /^(people|jobs|requests)\./;

  H.section(t, 'no empty slot in people, jobs or requests lines', () => {
    const SB = H.fresh({ packs: ['pensacola'], text: true });
    SB.log.max = 5000000; SB.log.entries.length = 0;
    const gaps = {};
    ['line', 'label'].forEach(fn => {
      const o = SB.text[fn];
      SB.text[fn] = function (path) {
        const n = SB.log.entries.length, r = o.apply(this, arguments);
        for (let i = n; i < SB.log.entries.length; i++) {
          const m = /^empty slot (\{.*\})$/.exec(SB.log.entries[i].message || '');
          if (m && MINE.test(String(path)) && !OK_EMPTY.test(m[1])) gaps[path + ' ' + m[1]] = (gaps[path + ' ' + m[1]] || 0) + 1;
        }
        return r;
      };
    });
    let r = null;
    ['slot-1', 'slot-2', 'slot-3'].forEach(seed => {
      r = run.runGame({ sb: SB, seed: seed, bot: 'learner', weeks: 30, city: 'pensacola', text: true });
      t.ok(r.ok, 'the game ran (' + seed + ')' + (r.error ? ': ' + r.error.message : ''));
    });
    t.eq(Object.keys(gaps).slice(0, 8), [], 'no empty slot in a people, jobs or requests line');
    /* what the game wrote on its jobs reads whole */
    const bad = [];
    Object.keys((r.state && r.state.jobs) || {}).forEach(id => {
      const j = r.state.jobs[id], s = String(j.text || '');
      if (s && BAD.some(re => re.test(s))) bad.push(j.type + ': ' + s);
    });
    t.eq(bad.slice(0, 5), [], 'finished job lines have no gap');
  });

  H.section(t, 'a crew yes carries the rate', () => {
    const SB = H.fresh({ packs: ['pensacola'], text: true });
    const golden = require('../fixtures/golden.js');
    const f = golden.build(SB, { notebook: true });
    const pid = Object.keys(f.state.people).filter(id => f.state.people[id].roles && f.state.people[id].roles.indexOf('SOUND') >= 0)[0] || 'p42';
    ['sound', 'security'].forEach(role => {
      [{ role, pay: { kind: 'CASH', amount: 80 } }, { role }, { role, amount: 60 }].forEach(pl => {
        const p = f.state.people[pid];
        if (!p) return;
        p.rate = p.rate || 80;
        const ask = { kind: 'CREW', toId: pid, showId: 's1', status: 'SENT', payload: Object.assign({ showId: 's1' }, pl), hid: { will: SB.Enums.ASK_STATUS.YES } };
        let res;
        try { res = SB.People.answerAsk(f.state, ask, 'DELIVER'); } catch (e) { t.fail('answerAsk threw: ' + e.message); return; }
        const s = String(res.text || '');
        t.ok(s && !BAD.some(re => re.test(s)), role + ' yes has no gap (' + s + ')');
      });
    });
  });
};
