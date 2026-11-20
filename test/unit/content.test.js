'use strict';
// content.test — the checks of 03-content section 12, run on whichever content files exist (a missing file is a note, not a failure):
//   1. every string passes SB.text.lint; 2. every required key exists (enum labels, jobs, causes, event ids, request templates);
//   3. every event validates; 6. lengths; 7. banned words and general banned terms; 8. shape: data only, no function.
// Item 4 (a slot outside the slot list) is a warning in the spec and is reported as a note.
// Item 5 (names) is names.test.
const fs = require('fs'), path = require('path');
const H = require('../helpers.js');

const REQUIRED_EVENTS = ['DOORS', 'COUNT', 'DEAL_DISPUTE', 'HOLD_CHALLENGED', 'ROOM_FORGOT', 'BAND_DROPS', 'TOUR_CANCELLED', 'STORM_WATCH', 'VAN_NOT_HERE',
                         'OPENER_NO_SHOW', 'PA_DIED', 'KNOCK_AT_THE_DOOR', 'LINE_DOWN_THE_BLOCK', 'A_FIGHT', 'SOMEONE_HURT', 'NOWHERE_TO_SLEEP', 'SOMEONE_ON_LIST', 'SOMEBODY_GOOD'];
const TERMS = ['guarantee', 'door deal', 'versus', 'hat', 'hold', 'challenge', 'confirm', 'advance', 'load-in', 'backline', 'changeover', 'off the top', 'settle', 'comps',
               'the list', 'listings', 'all ages', 'matinee', 'par', 'the call', 'regulars', 'the cash box'];

function words(s) { return String(s).replace(/\{[^}]*\}/g, 'x x x').split(/\s+/).filter(Boolean).length; }
function sentences(s) { return (String(s).replace(/\{[^}]*\}/g, 'x').match(/[^.!?]+[.!?]+(\s|$)/g) || [String(s)]).length; }
// Every plain variant of a template: each [a | b] pick expanded, guards and weights dropped, optional blocks kept (at most 64 variants).
function expand(s) {
  let out = [String(s)], guard = 0;
  while (guard++ < 6) {
    let again = false; const next = [];
    out.forEach(v => {
      const i = v.indexOf('[');
      if (i < 0 || next.length > 64) { next.push(v); return; }
      let depth = 0, j = i, bars = [i];
      for (; j < v.length; j++) {
        const c = v[j];
        if (c === '\\') { j++; continue; }
        if (c === '[') depth++;
        else if (c === ']') { depth--; if (depth === 0) break; }
        else if (c === '|' && depth === 1) bars.push(j);
      }
      bars.push(j);
      for (let k = 0; k + 1 < bars.length; k++) {
        const opt = v.slice(bars[k] + 1, bars[k + 1]).replace(/^\s*\?!?[A-Za-z0-9_.]+:\s*/, '').replace(/\^\d+(\.\d+)?\s*$/, '');
        next.push(v.slice(0, i) + opt + v.slice(j + 1)); again = true;
      }
    });
    out = next; if (!again) break;
  }
  return out;
}
function nodes(node) {            // the template strings a text node can render
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return [].concat.apply([], node.map(nodes));
  if (node && typeof node === 'object' && typeof node.t === 'string') return [node.t];
  return [];
}

module.exports = function (t) {
  const SB = H.fresh({ packs: H.packSlugs() });
  const E = SB.Enums, C = SB.Config, CT = SB.Content;
  const has = f => fs.existsSync(path.join(H.ROOT, 'js/content/' + f + '.js'));
  ['strings', 'names', 'requests', 'jobs', 'feedback', 'events', 'people', 'legacy', 'notebook'].forEach(f => { if (!has(f)) t.note('js/content/' + f + '.js does not exist yet: its checks are skipped'); });

  /* ---- 8. shape: no function anywhere in content ---- */
  (function () {
    const fns = [];
    (function walk(o, p) {
      if (typeof o === 'function') { fns.push(p); return; }
      if (!o || typeof o !== 'object') return;
      Object.keys(o).forEach(k => walk(o[k], p ? p + '.' + k : k));
    })(CT, '');
    t.eq(fns, [], 'SB.Content holds no function');
  })();

  /* ---- 1. lint ---- */
  (function () {
    const bad = []; let n = 0;
    H.eachString(CT, (p, s) => { n++; const m = SB.text.lint(s); if (m) bad.push(p + ': ' + m); },
                 (k, p) => /(^|\.)names\.(blocklist|rare|cleared|first|last|shared|band|room|label|zine|agency|booking|trend|nick)(\.|$)/.test(p) && /banks|blocklist|rare|^names\.(first|last|shared)/.test(p));
    t.eq(bad.slice(0, 5), [], 'every content string passes SB.text.lint (' + n + ' strings, ' + bad.length + ' bad)');
  })();

  /* ---- 2. required keys ---- */
  (function () {
    const S = CT.strings; if (!S) return;
    const members = (name) => E[name] ? Object.keys(E[name]).filter(k => typeof E[name][k] === 'string') : null;
    const MAP = { gen: 'GEN_KEY', five: 'FIVE', conf: 'CONF_KEY', stage: 'STAGE', bandStage: 'BAND_STAGE', motive: 'MOTIVE', need: 'NEED', wordTier: 'WORD_TIER',
                  vsPar: 'VS_PAR', room: 'ROOM', ages: 'AGES', address: 'ADDRESS', printRun: 'PRINT_RUN', push: 'PUSH', ad: 'AD', deal: 'DEAL', localPay: 'LOCAL_PAY',
                  label: 'LABEL', slot: 'SLOT', window: 'WINDOW', timing: 'TIMING', jobGroup: 'JOB_GROUP', jobStatus: 'JOB_STATUS', slip: 'SLIP', dayJob: 'DAY_JOB',
                  fog: 'FOG', windows: 'WINDOWS', stamp: 'STAMP', helpOutcome: 'HELP_OUTCOME', ladder: 'LADDER', settle: 'SETTLE', shortfall: 'SHORTFALL' };
    Object.keys(MAP).forEach(k => {
      if (S[k] === undefined) { t.fail('strings.' + k + ' is missing (needed for every ' + MAP[k] + ')'); return; }
      let need = MAP[k] === 'GEN_KEY' ? E.GEN_KEY : (MAP[k] === 'CONF_KEY' ? E.CONF_KEY : members(MAP[k]));
      if (!need) return;
      t.eq(need.filter(m => S[k][m] === undefined), [], 'strings.' + k + ' has every ' + MAP[k]);
    });
    if (S.genre) t.eq(E.GENRES.filter(g => !S.genre[g]), [], 'strings.genre has every genre');
    if (S.verdict && S.verdict.count) t.eq(Object.keys(E.VS_PAR).filter(v => !S.verdict.count[v]), [], 'strings.verdict.count has every VS_PAR');
    if (S.verdict && S.verdict.tier) t.eq(['ROUGH', 'THIN', 'HELD', 'GOOD', 'TALKED'].filter(v => !S.verdict.tier[v]), [], 'strings.verdict.tier has the five tiers');
    if (S.verdict && S.verdict.word) t.eq(Object.keys(E.VERDICT).filter(v => !S.verdict.word[v]), [], 'strings.verdict.word has every VERDICT');
    if (S.refuse) t.eq(Object.keys(E.REFUSE).filter(k => !S.refuse[k]), [], 'strings.refuse has every REFUSE');
    if (S.stress && S.stress.cause) t.eq(Object.keys(E.STRESS).filter(k => typeof E.STRESS[k] === 'string' && !S.stress.cause[k]), [], 'strings.stress.cause has every STRESS');
    if (S.stress) t.eq(Object.keys(E.STRESS_ZONE).filter(k => !S.stress[k]), [], 'strings.stress has every zone');
    if (S.bandTier) t.eq(S.bandTier.length, 5, 'strings.bandTier has five tiers');
    if (S.glossary) {
      const camel = x => x.replace(/[^a-z ]+/g, ' ').trim().split(/\s+/).map((w, i) => i ? w.charAt(0).toUpperCase() + w.slice(1) : w).join('');
      const keys = Object.keys(S.glossary);
      t.eq(TERMS.filter(x => !(keys.indexOf(camel(x)) >= 0 || keys.indexOf(camel(x.replace(/^the /, ''))) >= 0 || keys.indexOf(camel('the ' + x)) >= 0)), [], 'the glossary has every required term');
    }
    if (S.tune) t.eq(['nights', 'lean', 'allAges', 'barOnly', 'town', 'mainRoom', 'football'].filter(k => !S.tune[k]), [], 'strings.tune has the seven questions');
  })();

  (function () {                                                           // jobs
    const J = CT.jobs; if (!J) return;
    t.eq(Object.keys(E.JOB).filter(j => !J[j]), [], 'jobs.js has an entry for every JOB');
    Object.keys(E.JOB).forEach(j => {
      const e = J[j]; if (!e) return;
      ['label', 'verb', 'card', 'why'].forEach(k => { if (!SB.text.has('jobs.' + j + '.' + k) && !(k === 'card' && C.JOBS[j].mode === 'AUTO')) t.fail('jobs.' + j + '.' + k + ' is empty'); });
      const optional = C.JOBS[j].optional, mode = C.JOBS[j].mode;
      ['ON_TIME', 'LATE', 'SKIPPED'].forEach(k => {
        const need = k === 'ON_TIME' || (!optional && mode !== 'AUTO' && j !== 'ANSWER_REQUEST');
        if (need && !SB.text.has('jobs.' + j + '.' + k)) t.fail('jobs.' + j + '.' + k + ' is empty');
      });
      if (mode === 'PROMISE' || C.JOBS[j].thenPromise) { if (!e.tick || !e.unticked) t.fail('jobs.' + j + ' is a promise and needs tick and unticked'); else { t.ok(words(e.tick) <= 6, 'jobs.' + j + '.tick is at most six words'); } }
      if (typeof e.verb === 'string') t.ok(e.verb.length <= 14, 'jobs.' + j + '.verb is at most 14 characters (' + e.verb + ')');
      nodes(e.card).forEach(c => t.ok(words(c) <= 25, 'jobs.' + j + '.card is under 25 words: ' + c.slice(0, 40)));
    });
    ['PRINT', 'ANNOUNCE', 'WEEK_PUSH', 'LOCAL_AD'].forEach(j => { if (J[j] && !J[j].opts) t.fail('jobs.' + j + '.opts (the priced choices) is missing'); });
    if (J.slips) t.eq(Object.keys(E.SLIP).filter(k => !J.slips[k]), [], 'jobs.slips has every SLIP');
  })();

  (function () {                                                           // feedback
    const F = CT.feedback; if (!F) return;
    const miss = [];
    Object.keys(E.CAUSE).forEach(c => {
      const cc = F.comments && F.comments[c];
      if (!cc) { miss.push(c); return; }
      ['DOWN', 'UP'].forEach(d => ['NEW', 'LEARNING', 'KNOWS'].forEach(l => { if (!SB.text.has('feedback.comments.' + c + '.ANY.' + d + '.' + l)) miss.push(c + '.ANY.' + d + '.' + l); }));
    });
    t.eq(miss.slice(0, 6), [], 'every CAUSE has an ANY comment for DOWN and UP at NEW, LEARNING and KNOWS (' + miss.length + ' missing)');
    t.eq(['RUNNER', 'ARTIST', 'FLOOR', 'LODGING'].filter(r => !(F.helper && F.helper[r] && F.helper[r].UP && F.helper[r].DOWN)), [], 'feedback.helper has RUNNER, ARTIST, FLOOR and LODGING, UP and DOWN');
    t.eq(Object.keys(E.LUCK).filter(k => !(F.luck && F.luck[k])), [], 'feedback.luck has every LUCK kind');
    const longOnes = [];
    Object.keys(F.comments || {}).forEach(c => H.eachString(F.comments[c], (p, s) => { if (expand(s).some(v => sentences(v.replace(/\(\?[^)]*\)/g, '')) > 2)) longOnes.push(c + ' ' + p); }));
    t.eq(longOnes.slice(0, 5), [], 'comment lines are at most two sentences');
  })();

  (function () {                                                           // requests
    const R = CT.requests; if (!R) return;
    const T = R.templates || R;
    t.eq(Object.keys(E.REQ_TEMPLATE).filter(k => !(T[k])), [], 'requests.js has every REQ_TEMPLATE');
  })();

  (function () {                                                           // people: the harm lines
    const P = CT.people; if (!P || !P.harm) return;
    const long = [];
    H.eachString(P.harm, (p, s) => { if (words(s) >= 40) long.push(p); });
    t.eq(long.slice(0, 5), [], 'harm lines are under 40 words (each slot counted as three)');
  })();

  /* ---- 3. events ---- */
  (function () {
    const EV = CT.events; if (!EV) return;
    if (!Array.isArray(EV)) { t.fail('SB.Content.events is not a list'); return; }
    const ids = {}, probs = [];
    const condKeys = Object.keys(E.COND), ops = Object.keys(E.EFFECT);
    const showOnly = { daysOut: 1, roomKind: 1, outdoor: 1, ages: 1, slot: 1, jobDone: 1, jobNotDone: 1, deal: 1, written: 1, label: 1, bands: 1, hasCrew: 1 };
    EV.forEach((ev, i) => {
      const w = 'event ' + (ev.id || '#' + i);
      if (!ev.id || !/^[A-Z0-9_]+$/.test(ev.id)) probs.push(w + ': id is not UPPER_SNAKE');
      if (ids[ev.id]) probs.push(w + ': id repeated'); ids[ev.id] = true;
      if (!E.EVENT_WHEN[ev.when]) probs.push(w + ': bad when ' + ev.when);
      if (!E.TIER[ev.tier]) probs.push(w + ': bad tier ' + ev.tier);
      Object.keys(ev.if || {}).forEach(k => { if (condKeys.indexOf(k) < 0) probs.push(w + ': unknown condition ' + k); });
      const bindsShow = (ev.bind || []).indexOf('show') >= 0;
      if (!bindsShow) Object.keys(ev.if || {}).forEach(k => { if (showOnly[k]) probs.push(w + ': show-only condition ' + k + ' without binding show'); });
      (ev.bind || []).forEach(b => { if (!E.REF[b]) probs.push(w + ': bind of unknown ref ' + b); });
      const opts = ev.options || [];
      if (opts.length < 2 || opts.length > 4) probs.push(w + ': ' + opts.length + ' options');
      const oid = {};
      opts.forEach(o => {
        if (oid[o.id]) probs.push(w + ': option id repeated ' + o.id); oid[o.id] = true;
        Object.keys(o.needs || {}).forEach(k => { if (condKeys.indexOf(k) < 0) probs.push(w + '.' + o.id + ': unknown needs key ' + k); });
        (function walk(effs) {
          (effs || []).forEach(f => {
            if (ops.indexOf(f.op) < 0) probs.push(w + '.' + o.id + ': unknown op ' + f.op);
            if (f.op === 'SHOW_MOD' && !E.MOD[f.key]) probs.push(w + '.' + o.id + ': SHOW_MOD key ' + f.key);
            if (f.amountOf && !E.AMOUNT_OF[f.amountOf]) probs.push(w + '.' + o.id + ': amountOf ' + f.amountOf);
            if (f.op === 'DISPUTE' && !E.DISPUTE[f.resolve]) probs.push(w + '.' + o.id + ': DISPUTE.resolve ' + f.resolve);
            if (f.op === 'ROOM_HOLD' && !E.HOLD_DO[f.do]) probs.push(w + '.' + o.id + ': ROOM_HOLD.do ' + f.do);
            if (f.op === 'INCIDENT' && !E.INCIDENT[f.kind]) probs.push(w + '.' + o.id + ': INCIDENT.kind ' + f.kind);
            if (f.op === 'FOLLOWUP' && !EV.some(x => x.id === f.event)) probs.push(w + '.' + o.id + ': FOLLOWUP to missing event ' + f.event);
            if (f.op === 'CANCEL_SHOW' && f.why && !E.CANCEL[f.why]) probs.push(w + '.' + o.id + ': CANCEL_SHOW.why ' + f.why);
            if (f.op === 'CHANCE') { walk(f.then); walk(f.else); }
          });
        })(o.effects);
      });
    });
    t.eq(probs.slice(0, 8), [], 'every event validates (' + EV.length + ' events, ' + probs.length + ' problems)');
    t.eq(REQUIRED_EVENTS.filter(id => !ids[id]), [], 'the events the engine raises by id exist');
    t.ok(EV.length >= 49 || !has('events'), 'at least 49 events (18 required + 31 more): ' + EV.length);
  })();

  /* ---- 7. banned words and terms ---- */
  (function () {
    const general = H.compile(H.bannedGeneral());
    const perPack = {}; H.packSlugs().forEach(s => { const rp = H.rawPack(s); perPack[s] = rp ? (rp.pack.banned || []).map(x => String(x).toLowerCase()) : []; });
    const all = [].concat.apply([], Object.keys(perPack).map(k => perPack[k]));
    const comp = H.compile(Array.from(new Set(all)));
    const hits = [];
    H.eachString(CT, (p, s) => {
      const h = H.bannedHits(s, general).concat(H.bannedHits(s, comp));
      if (h.length) hits.push(p + ' [' + h.join(', ') + ']: ' + s.slice(0, 60));
    }, (k, p) => /(^|\.)names\.blocklist$/.test(p) || /^names\.rare/.test(p) || /(^|\.)bandNames\.blockFamous$/.test(p));   // block lists hold real names on purpose
    t.eq(hits.slice(0, 8), [], 'no content string holds a banned word or a banned term (general list plus every loaded pack): ' + hits.length + ' hits');
  })();
};
