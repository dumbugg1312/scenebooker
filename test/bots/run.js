'use strict';
// test/bots/run.js — the play loop of 05-interface 4.2 without the staging, and the commands "bots" and "play" of
// 06-harness section 2. Exports { main(argv, cmd), runGame(opts) } (the interface fixed with the first TEST engineer).
//
//   node test/run.js bots [--bot learner|all] [--seeds 20] [--years 2] [--weeks N] [--city pensacola] [--bills on|off] [--text] [--guard] [--stubs]
//   --stubs  play against the stub engine even where a real engine file exists (to test the harness itself)
//   node test/run.js play --seed X --bot checklist --weeks 30 [--dump] [--city ..] [--bills ..]
//
// runGame(opts) plays one game and returns a plain result; it never throws for a failed game, it records the failure:
//   opts   { seed, bot (name | bot object), weeks | years, city, bills (true | false | 'on' | 'off'), text, guard, strict,
//            resume ({ state, startWeek }: continue that game up to week `weeks`), stubs (default true: a missing engine file is its stub), stubsOnly (every engine module from its stub), sb (an already loaded SB), dump, hooks }
// A bot may also have evening(state, SB, stop): called at every EVENING stop (the night clock, spec 10), where it sends its asks and
// does tonight's jobs; the runner then calls Week.endNight. planWeek is called once at the start of each week (day job, phone, shifts).
//   hooks  { afterShow(state, SB, showId, row), afterWeek(state, SB, weekRow), afterClose(state, SB, report, week) }   for balance.js; they may read anything
//   result { ok, error, seed, bot, city, bills, weeks (played), rows: [per week], shows: [per show], counts, ms, state, dump }
const path = require('path');
const H = require('../helpers.js');
const L = require('./lib.js');

const BOTS = {
  random: () => require('./random.js'),
  checklist: () => require('./checklist.js'),
  learner: () => require('./learner.js'),
  'learner-specialist': () => require('./learner.js').variants['learner-specialist'],
  'learner-allround': () => require('./learner.js').variants['learner-allround'],
  late: () => require('./late.js'),
  gambler: () => require('./gambler.js')
};
const BOT_NAMES = Object.keys(BOTS);

function getBot(b) {
  if (b && typeof b === 'object') return b;
  const f = BOTS[b || 'checklist'];
  if (!f) throw new Error('unknown bot "' + b + '" (' + BOT_NAMES.join(', ') + ')');
  return f();
}

/* ---------------- small readers: the runner may read public fields only ---------------- */

function get(o, p, d) {
  const parts = p.split('.'); let v = o;
  for (let i = 0; i < parts.length; i++) { if (v === null || v === undefined) return d; v = v[parts[i]]; }
  return v === undefined ? d : v;
}
function boolBills(b) { return b === undefined || b === true || b === 'on'; }

function loadSB(opts) {
  if (opts.sb) return opts.sb;
  const city = opts.city || 'pensacola';
  const real = H.packSlugs().indexOf(city) >= 0;
  const SB = H.load({ stubs: opts.stubs !== false, text: !!opts.text, packs: real ? [city] : [], real: opts.stubsOnly ? [] : undefined });
  if (!SB.Cities.isLoaded(city)) {
    if (city === 'philadelphia') require('../fixtures/large-city.js').ensure(SB);
    else throw new Error('the pack for "' + city + '" is not available (no js/cities/packs/' + city + '.js)');
  }
  return SB;
}

/* ---------------- one game ---------------- */

function runGame(opts) {
  opts = opts || {};
  const t0 = Date.now();
  const seed = String(opts.seed === undefined ? 'seed-1' : opts.seed);
  const city = opts.city || 'pensacola';
  const bills = boolBills(opts.bills);
  const weeks = opts.weeks !== undefined ? opts.weeks : Math.round((opts.years || 1) * 52);
  const result = { ok: true, error: null, seed: seed, bot: null, city: city, bills: bills, weeks: 0, rows: [], shows: [], counts: { decisions: 0, calls: {} },
                   deadEnds: 0, ms: 0, state: null, dump: [], refusals: {} };
  let SB, state = null, bot, week = 0;
  try {
    SB = loadSB(opts);
    bot = getBot(opts.bot);
    result.bot = bot.name || String(opts.bot);
    const resume = opts.resume || null;           // { state, startWeek }: continue a game (the bot keeps its memory; setup is not called again)
    const setup = resume ? {} : (bot.setup ? (bot.setup({ bills: bills, seed: seed, city: city }) || {}) : {});
    const billsOn = resume ? !!(resume.state.settings && resume.state.settings.bills) : (setup.bills === undefined ? bills : !!setup.bills);
    result.bills = billsOn;
    state = resume ? resume.state : H.newGame(SB, { seed: seed, citySlug: city, bills: billsOn, fog: opts.fog, windows: opts.windows, tune: opts.tune });
    if (opts.text === false || !opts.text) { if (state.settings) state.settings.noText = true; }
    // The bot sees a guarded state and a wrapped SB; the runner keeps the real ones.
    const ctx = { state: state, proxy: null, cache: null, strict: opts.strict !== false, counts: result.counts };
    let view = state;
    if (opts.guard) { const g = L.guardState(state); ctx.proxy = g.proxy; ctx.cache = g.cache; view = g.proxy; }
    const bsb = L.wrapSB(SB, ctx);
    if (setup.dayJob && state.player && state.player.dayJob !== setup.dayJob && billsOn) bsb.Week.setDayJob(view, setup.dayJob);

    for (week = resume ? resume.startWeek : 0; week < weeks; week++) {
      if (get(state, 'clock.phase') === 'OVER') break;
      const d0 = ctx.counts.decisions, shownBefore = {};
      Object.keys(state.shows || {}).forEach(id => { shownBefore[id] = state.shows[id].status; });
      playWeek(SB, bsb, bot, state, view, week, result);
      result.weeks = week + 1; result.lastWeek = week;
      const row = weekRow(state, week, ctx.counts.decisions - d0);
      collectShows(SB, state, week, shownBefore, result, opts);
      result.rows.push(row);
      if (opts.hooks && opts.hooks.afterWeek) opts.hooks.afterWeek(state, SB, row);
      if (opts.dump) result.dump.push(dumpWeek(SB, state, row));
      closeAndAdvance(SB, bsb, bot, state, view, week, result, opts.hooks);
    }
  } catch (e) {
    result.ok = false;
    result.error = {
      message: e && e.message ? e.message : String(e), name: e && e.name, where: e && e.where, week: week,
      phase: get(state, 'clock.phase', null),
      stack: e && e.stack ? String(e.stack).split('\n').slice(0, 6) : [],
      log: (typeof SB !== 'undefined' && SB && SB.log && SB.log.entries ? SB.log.entries.slice(-20) : []).map(x => '[' + x.level + '] ' + x.where + ': ' + x.message),
      bot: e && e.name === 'BotError'
    };
  }
  result.state = state;
  result.ms = Date.now() - t0;
  return result;
}

/* ---------------- the week ---------------- */

function note(result, code) { result.refusals[code] = (result.refusals[code] || 0) + 1; }

function playWeek(SB, bsb, bot, state, view, week, result) {
  bot.planWeek(view, bsb);
  let guard = 0, stop = null, last = '';
  const nightTries = {};
  if (get(state, 'clock.phase') !== 'PLAY') { result.deadEnds++; note(result, 'phase:' + get(state, 'clock.phase')); }
  for (;;) {
    if (++guard > 1500) {
      result.deadEnds++;
      const e = new Error('Week.step did not reach END_OF_WEEK in 1500 calls (last stop ' + last + ')'); e.name = 'StuckError'; throw e;
    }
    let r;
    if (stop) { r = { stop: stop }; stop = null; }
    else {
      r = SB.Week.step(state);
      if (r && r.ok === false) {
        note(result, 'step:' + r.code);
        // STOP_PENDING with a stop still on the clock: answer it below. Anything else ends the week.
        if (r.code === 'STOP_PENDING' && state.clock && state.clock.stop) r = { stop: state.clock.stop };
        else break;
      }
    }
    const st = r && r.stop;
    if (!st) continue;
    last = st.kind;
    if (st.kind === 'END_OF_WEEK') break;
    if (st.kind === 'EVENING') {                        // the bot spends tonight's hours, then calls the night
      if (bot.evening) bot.evening(view, bsb, st);
      const en = SB.Week.endNight(state);
      if (en && en.ok === false) {
        note(result, 'endNight:' + en.code); result.deadEnds++;
        const e = new Error('Week.endNight refused: ' + en.code + ' ' + (en.why || '')); e.name = 'StuckError'; throw e;
      }
      continue;
    }
    if (st.kind === 'DECISION') {
      const d = st.decision;
      let choice = bot.onStop ? bot.onStop(view, bsb, st) : null;
      let opt = choice && choice.optionId && choice.optionId !== 'FIRST' ? choice.optionId : L.firstEnabled(d);
      let res = SB.Week.decide(state, d.id, opt, choice && choice.value);
      result.counts.decisions++;
      if (res && res.ok === false) {                    // a disabled or unknown option: take the first enabled one instead
        note(result, 'decide:' + res.code);
        const alt = L.firstEnabled(d);
        if (alt !== opt) res = SB.Week.decide(state, d.id, alt, undefined);
        if (res && res.ok === false) { result.deadEnds++; const e = new Error('Week.decide refused every option of ' + d.id); e.name = 'StuckError'; throw e; }
      }
      if (res && res.stop) stop = res.stop;
      continue;
    }
    if (st.kind === 'SHOW_NIGHT' || st.kind === 'SETTLE') {
      if (bot.onNight) bot.onNight(view, bsb, st.showId);
      const sh = SB.Shows.get(state, st.showId);
      let autoRes = null;
      if (sh && sh.status !== 'PLAYED' && sh.status !== 'CANCELLED') autoRes = SB.Night.auto(state, st.showId, { settle: 'FAIR' });
      const after = SB.Shows.get(state, st.showId);
      if (after && after.status !== 'PLAYED' && after.status !== 'CANCELLED') {
        nightTries[st.showId] = (nightTries[st.showId] || 0) + 1;
        if (nightTries[st.showId] > 3) {
          result.deadEnds++;
          const e = new Error('show ' + st.showId + ' is still ' + after.status + ' after Night.auto (night ' + (after.night ? 'open' : 'null') + ', result ' + (after.result ? 'set' : 'null') + ', auto returned ' + JSON.stringify(autoRes && (autoRes.ok === undefined ? { records: (autoRes.records || []).length } : autoRes)).slice(0, 160) + ')');
          e.name = 'StuckError'; if (!H.isReal('Night')) e.message += ' [js/engine/show/night.js is still a stub, so no night can be played]'; throw e;
        }
      }
      continue;
    }
    // REPLY and NEED_BY are cleared by the next step; a bot may act on them first.
    if (bot.onStop) bot.onStop(view, bsb, st);
  }
}

function closeAndAdvance(SB, bsb, bot, state, view, week, result, hooks) {
  const report = SB.Week.close(state);
  if (hooks && hooks.afterClose) hooks.afterClose(state, SB, report, week);
  const choices = bot.onClose ? (bot.onClose(view, bsb, report) || {}) : {};
  if (report && report.bills) {
    const pay = choices.bills || { pay: 'ALL' };
    let c = pay;
    if (pay.pay === 'ALL') c = { pay: report.bills.lines ? report.bills.lines.map(l => l.k) : [], late: [], ladder: [] };
    const r = SB.Week.payBills(state, c);
    if (r && r.ok === false) { note(result, 'payBills:' + r.code); SB.Week.payBills(state, { pay: [], late: report.bills.lines.map(l => l.k), ladder: [] }); }
  }
  let n = SB.Week.nextWeek(state);
  if (n && n.ok === false) {
    note(result, 'nextWeek:' + n.code);
    if (n.code === 'BILLS_FIRST') {
      const b = SB.Money.billsView(state);
      SB.Week.payBills(state, { pay: b ? b.lines.map(l => l.k) : [], late: [], ladder: [] });
      n = SB.Week.nextWeek(state);
    }
    if (n && n.ok === false && n.code !== 'OVER') { result.deadEnds++; const e = new Error('Week.nextWeek refused: ' + n.code + ' ' + (n.why || '')); e.name = 'StuckError'; throw e; }
  }
  // The interface autosaves at every Week.nextWeek (01-state 4), and SB.Save.save trims the state before it writes (01-state 3).
  // The runner does the same, so a bot's game is the size and shape a player's is. In Node the write itself is refused (INVALID).
  if (SB.Save && typeof SB.Save.save === 'function') SB.Save.save(state, 'auto', 0);
}

/* ---------------- metrics ---------------- */

function sumHours(list) { return Array.isArray(list) ? list.reduce((s, d) => s + (d ? (d.DAY || 0) + (d.NIGHT || 0) : 0), 0) : null; }

function weekRow(state, week, decisions) {
  const p = state.player || {};
  return {
    week: week, name: get(p, 'name', null), followers: get(p, 'followers', null), stage: get(p, 'stage', null), stress: get(p, 'stress', null),
    regulars: get(state, 'regulars.total', null), fund: get(state, 'money.fund', null), bank: get(state, 'money.bank', null),
    word: get(state, 'town.word', null), hoursUsed: sumHours(get(state, 'week.used', null)), hoursCap: sumHours(get(state, 'week.cap', null)), decisions: decisions, showsPlayed: get(p, 'showsPlayed', null),
    couch: get(p, 'couch', null), dayJob: get(p, 'dayJob', null), clockWeek: get(state, 'clock.week', null), day: get(state, 'clock.day', null)
  };
}

function collectShows(SB, state, week, before, result, opts) {
  const shows = state.shows || {};
  Object.keys(shows).forEach(id => {
    const s = shows[id];
    if (!s || s.status !== 'PLAYED' || before[id] === 'PLAYED' || !s.result) return;
    const r = s.result, room = (state.rooms || {})[s.roomId] || {};
    const bandGenres = ((s.bill && s.bill.slots) || []).map(sl => { const b = (state.bands || {})[sl.bandId]; return b ? b.genre : null; });
    const row = {
      week: week, id: id, day: s.day, dow: SB.time ? SB.time.dow(s.day || 0) : null, label: s.label, roomKind: room.kind || null, zoneId: s.zoneId, cap: room.cap || null,
      ages: get(s, 'door.ages', null), price: get(s, 'door.price', null), deal: get(s, 'deal.shape', null), nBands: ((s.bill && s.bill.slots) || []).length,
      genres: bandGenres, heads: r.heads, par: get(r, 'par.heads', null), parQ: get(r, 'par.q', null), q: r.q, verdict: r.verdict, vsPar: r.vsPar,
      callLo: get(r, 'call.lo', null), callHi: get(r, 'call.hi', null), callMid: get(r, 'call.mid', null), inside: get(r, 'call.inside', null),
      beat: r.beat, nameFrom: get(r, 'name.from', null), nameTo: get(r, 'name.to', null), door: get(r, 'door.gross', null), playerNet: r.playerNet,
      byGen: r.byGen, luck: (r.luck || []).map(l => l.k), incidents: (r.incidents || []).length, requestId: s.requestId || null, origin: s.origin === undefined ? null : s.origin,
      announce: get(s, 'promo.announce', null), roomShowsBefore: room.playerShows === undefined ? null : room.playerShows
    };
    result.shows.push(row);
    if (opts.hooks && opts.hooks.afterShow) opts.hooks.afterShow(state, SB, id, row);
  });
}

/* ---------------- the readable log ---------------- */

function dumpWeek(SB, state, row) {
  const lines = [];
  let date = '';
  try { date = SB.time.fmt(row.week * 7, 'week'); } catch (e) { date = ''; }
  lines.push('== Week ' + row.week + (date ? ' (' + date + ')' : '') + '  name ' + row.name + '  followers ' + row.followers + '  regulars ' + row.regulars +
             '  fund $' + row.fund + '  bank ' + (row.bank === null ? '-' : '$' + row.bank) + '  stress ' + row.stress + '  stage ' + row.stage + '  decisions ' + row.decisions);
  const log = get(state, 'week.log', []) || [];
  log.forEach(rec => {
    if (!rec) return;
    if (rec.t === 'DAY_START' || rec.t === 'QUIET_DAY' || rec.t === 'TICK' || rec.t === 'ARRIVALS') return;
    const t = rec.text ? rec.text : JSON.stringify(rec, (k, v) => (k === 't' || k === 'text' || k === 'day' || k === 'half' || k === 'n') ? undefined : v).slice(0, 110);
    lines.push('   ' + String(rec.t).padEnd(13) + (rec.day !== undefined ? 'd' + rec.day + ' ' : '') + t);
  });
  return lines.join('\n');
}

/* ---------------- summaries ---------------- */

function summarize(results) {
  const ok = results.filter(r => r.ok), bad = results.filter(r => !r.ok);
  const shows = [].concat.apply([], results.map(r => r.shows));
  const ratios = shows.filter(s => s.par > 0 && typeof s.heads === 'number').map(s => s.heads / s.par);
  const lastRows = results.map(r => r.rows[r.rows.length - 1]).filter(Boolean);
  return {
    runs: results.length, ok: ok.length, failed: bad.length, shows: shows.length,
    headsOverPar: ratios.length ? H.mean(ratios) : null,
    name: H.median(lastRows.map(r => r.name).filter(x => typeof x === 'number')),
    followers: H.median(lastRows.map(r => r.followers).filter(x => typeof x === 'number')),
    regulars: H.median(lastRows.map(r => r.regulars).filter(x => typeof x === 'number')),
    decisionsPerWeek: H.median([].concat.apply([], results.map(r => r.rows.map(x => x.decisions))).filter(x => typeof x === 'number')),
    deadEnds: results.reduce((s, r) => s + r.deadEnds, 0), ms: results.reduce((s, r) => s + r.ms, 0)
  };
}

/* ---------------- the command line ---------------- */

function parseArgs(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.slice(0, 2) === '--') {
      const k = a.slice(2), nx = argv[i + 1];
      if (nx === undefined || nx.slice(0, 2) === '--') o[k] = true; else { o[k] = nx; i++; }
    } else o._.push(a);
  }
  return o;
}

function printFailure(r) {
  const e = r.error;
  console.log('  FAILED seed ' + r.seed + ' bot ' + r.bot + ' city ' + r.city + ' week ' + e.week + (e.bot ? ' (bot broke a rule)' : '') + ': ' + e.message);
  (e.stack || []).slice(1, 4).forEach(l => console.log('      ' + l.trim()));
  console.log('      last log entries:');
  (e.log || []).forEach(l => console.log('        ' + l));
}

function main(argv, cmd) {
  const a = parseArgs(argv || []);
  const play = cmd === 'play';
  const city = a.city || 'pensacola';
  const bills = a.bills === 'off' ? false : true;
  if (play) {
    const r = runGame({ seed: a.seed || 'seed-1', bot: a.bot || 'checklist', weeks: a.weeks ? Number(a.weeks) : 30, city: city, bills: bills, text: !!a.text, dump: true, guard: !!a.guard, stubsOnly: !!a.stubs });
    if (a.dump !== false) r.dump.forEach(l => console.log(l));
    console.log('\n' + (r.ok ? 'played ' + r.weeks + ' weeks, ' + r.shows.length + ' shows, ' + r.counts.decisions + ' decisions, ' + r.ms + ' ms' : ''));
    r.shows.forEach(s => console.log('  show wk' + s.week + ' ' + s.roomKind + ' ' + (s.genres || []).join('+') + ': ' + s.heads + ' heads vs par ' + s.par + ' (' + s.vsPar + '), q ' + s.q + ', ' + s.verdict));
    if (!r.ok) { printFailure(r); return 1; }
    return 0;
  }
  const names = !a.bot || a.bot === 'all' ? BOT_NAMES : String(a.bot).split(',');
  const seeds = a.seeds ? Number(a.seeds) : 20, years = a.years ? Number(a.years) : 2;
  const weeks = a.weeks ? Number(a.weeks) : Math.round(years * 52);
  let failed = 0;
  console.log('bots: ' + names.join(', ') + ' x ' + seeds + ' seeds x ' + weeks + ' weeks in ' + city + ', bills ' + (bills ? 'on' : 'off') + (a.text ? ', text on' : ', text off'));
  names.forEach(n => {
    const results = [];
    for (let i = 0; i < seeds; i++) {
      const r = runGame({ seed: city + '-' + n + '-' + i, bot: n, weeks: weeks, city: city, bills: bills, text: !!a.text, guard: !!a.guard, stubsOnly: !!a.stubs });
      results.push(r);
      if (!r.ok) { failed++; printFailure(r); }
    }
    const s = summarize(results);
    const f = x => x === null || x === undefined ? '-' : (typeof x === 'number' ? (Math.round(x * 100) / 100) : x);
    console.log((s.failed ? 'FAIL  ' : 'ok    ') + n.padEnd(20) + ' runs ' + s.ok + '/' + s.runs + '  shows ' + s.shows + '  heads/par ' + f(s.headsOverPar) + '  name ' + f(s.name) +
                '  followers ' + f(s.followers) + '  regulars ' + f(s.regulars) + '  decisions/wk ' + f(s.decisionsPerWeek) + '  dead ends ' + s.deadEnds + '  ' + s.ms + ' ms');
  });
  if (failed) console.log('\n' + failed + ' run(s) failed');
  return failed ? 1 : 0;
}

module.exports = { main: main, runGame: runGame, summarize: summarize, BOTS: BOTS, BOT_NAMES: BOT_NAMES, getBot: getBot, loadSB: loadSB, parseArgs: parseArgs };
