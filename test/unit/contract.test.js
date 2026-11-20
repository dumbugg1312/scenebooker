'use strict';
// contract.test — the contract in executable form (06-harness section 3): the manifest against the files,
// the cross-references between enums.js and config.js, and the hashes of the three core files.
// Runs against whatever files exist: a missing engine module is a stub, a missing content file is skipped with a note.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const load = require('../load.js');

module.exports = function (t) {
  const SB = load({ stubs: true });
  const E = SB.Enums, C = SB.Config;
  const has = (rel) => fs.existsSync(path.join(load.ROOT, rel));
  const keys = Object.keys;
  const missingFrom = (list, set) => list.filter(k => !Object.prototype.hasOwnProperty.call(set, k));

  /* ---- the manifest ---- */
  t.eq(SB.verify(['engine', 'cities']), [], 'SB.verify([engine, cities]) is empty');
  // Which engine modules are real and which are stubs, for the record.
  const realFiles = load.ENGINE.filter(has), stubbed = load.ENGINE.filter(f => !has(f));
  t.note(realFiles.length + ' of ' + load.ENGINE.length + ' engine files are real; ' + stubbed.length + ' are stubs');
  if (!has('js/cities/cities.js')) t.note('js/cities/cities.js does not exist yet: SB.Cities is missing, so the verify above fails until it does');
  // Every module the manifest lists is a module (SB.module records it), except SB.UI which is a registry.
  keys(SB.API.engine).forEach(m => t.ok(SB.modules[m] === true, 'engine module ' + m + ' was registered with SB.module'));
  // The manifest and the file list of load.js agree: one file per engine module.
  t.eq(load.ENGINE.map(f => path.basename(f, '.js')).sort(), keys(SB.API.engine).map(m => m.toLowerCase()).sort(), 'load.js ENGINE lists exactly the modules of SB.API.engine');

  /* ---- jobs ---- */
  const JOB = E.JOB, JOBS = C.JOBS;
  t.eq(missingFrom(keys(JOBS), JOB), [], 'every Config.JOBS key is a JOB');
  t.eq(missingFrom(keys(JOB), JOBS), [], 'every JOB has a Config.JOBS entry');
  keys(JOBS).forEach(k => {
    const j = JOBS[k];
    t.ok(E.JOB_MODE[j.mode] === j.mode, k + ' has a legal mode (' + j.mode + ')');
    t.ok(E.JOB_GROUP[j.group] === j.group, k + ' has a legal group (' + j.group + ')');
    (j.needs || []).forEach(n => t.ok(JOB[n] === n, k + ' needs ' + n + ', which is a job'));
    if (j.mode === 'PROMISE') {
      t.ok(JOB[j.rides] === j.rides, 'PROMISE job ' + k + ' rides on ' + j.rides + ', which is a job');
      t.ok(JOBS[j.rides] && JOBS[j.rides].mode !== 'PROMISE', k + ' rides on a job that is not itself a promise');
    }
    if (j.thenPromise) t.ok(JOB[j.thenPromise.rides] === j.thenPromise.rides, k + ' thenPromise rides on a job');
  });
  if (has('js/content/jobs.js') && SB.Content.jobs) {
    t.eq(missingFrom(keys(JOBS), SB.Content.jobs), [], 'every Config.JOBS key has an entry in SB.Content.jobs');
    t.eq(missingFrom(keys(JOB), SB.Content.jobs), [], 'every JOB has an entry in SB.Content.jobs');
  } else t.note('js/content/jobs.js does not exist yet: job content not checked');

  /* ---- trust, causes, voices ---- */
  t.eq(missingFrom(keys(E.TRUST), C.TRUST_EVENTS), [], 'every TRUST has a TRUST_EVENTS entry');
  t.eq(missingFrom(keys(C.TRUST_EVENTS), E.TRUST), [], 'every TRUST_EVENTS key is a TRUST');
  t.eq(missingFrom(keys(E.CAUSE), E.CAUSE_VOICES), [], 'every CAUSE has CAUSE_VOICES');
  t.eq(missingFrom(keys(E.CAUSE_VOICES), E.CAUSE), [], 'every CAUSE_VOICES key is a CAUSE');
  keys(E.CAUSE_VOICES).forEach(c => E.CAUSE_VOICES[c].forEach(v => t.ok(E.VOICE[v] === v, 'CAUSE_VOICES.' + c + ' names ' + v + ', which is a VOICE')));
  keys(E.VOICE).forEach(v => t.ok(Object.prototype.hasOwnProperty.call(E.VOICE_HOBBY, v), 'VOICE_HOBBY has an entry for ' + v));
  keys(E.VOICE_HOBBY).forEach(v => {
    const cause = E.VOICE_HOBBY[v];
    if (cause === null) return;
    t.ok(E.CAUSE[cause] === cause, v + "'s hobby cause " + cause + ' is a CAUSE');
    t.ok((E.CAUSE_VOICES[cause] || []).indexOf(v) >= 0, 'CAUSE_VOICES.' + cause + ' lists ' + v + ', whose hobby it is');
  });

  /* ---- money shapes ---- */
  const SK = C.CHANNELS.SHARE_KEY;
  t.eq(missingFrom(keys(E.DEAL), SK), [], 'every DEAL is in CHANNELS.SHARE_KEY');
  t.eq(missingFrom(keys(E.LOCAL_PAY), SK), [], 'every LOCAL_PAY is in CHANNELS.SHARE_KEY');
  keys(SK).forEach(k => t.ok(Object.prototype.hasOwnProperty.call(C.CHANNELS.SHARE_DEAL, SK[k]), 'SHARE_KEY.' + k + ' names a SHARE_DEAL rate'));

  /* ---- stress ---- */
  // SPEC?: DOWN.UNSPENT_MAX is the cap on DOWN.UNSPENT, not a cause of its own, so it is not a STRESS. The test
  // accepts exactly one such key per STRESS, written <STRESS>_MAX, and says so in a note.
  ['UP', 'DOWN'].forEach(side => {
    const bad = keys(C.STRESS[side]).filter(k => {
      if (E.STRESS[k] === k) return false;
      const m = /^(.*)_MAX$/.exec(k);
      if (m && E.STRESS[m[1]] === m[1] && Object.prototype.hasOwnProperty.call(C.STRESS[side], m[1])) { t.note('STRESS.' + side + '.' + k + ' is read as the cap of ' + m[1]); return false; }
      return true;
    });
    t.eq(bad, [], 'every STRESS.' + side + ' key is a STRESS');
  });

  /* ---- other tables with a key per enum value ---- */
  t.eq(missingFrom(keys(E.PRINT_RUN), C.FLYER.PRINT || {}), [], 'every PRINT_RUN has a Config.FLYER.PRINT row');
  t.eq(keys(E.REC).length, new Set(keys(E.REC)).size, 'REC has no duplicates');
  t.ok(Array.isArray(C.AFFINITY) && C.AFFINITY.length === E.GENRES.length && C.AFFINITY.every(r => r.length === E.GENRES.length), 'AFFINITY is genres by genres');
  C.AFFINITY.forEach((row, i) => t.ok(row[i] === 1, 'AFFINITY diagonal is 1 at ' + E.GENRES[i]));

  /* ---- the three core files match core.sha ---- */
  const shaFile = path.join(load.ROOT, 'js/core/core.sha');
  t.ok(fs.existsSync(shaFile), 'js/core/core.sha exists');
  if (fs.existsSync(shaFile)) {
    const want = {};
    fs.readFileSync(shaFile, 'utf8').split('\n').forEach(line => {
      const m = /^([0-9a-f]{64})\s+\*?(\S+)\s*$/.exec(line);
      if (m) want[path.basename(m[2])] = m[1];
    });
    ['sb.js', 'enums.js', 'config.js'].forEach(f => {
      const got = crypto.createHash('sha256').update(fs.readFileSync(path.join(load.ROOT, 'js/core', f))).digest('hex');
      t.ok(!!want[f], 'core.sha has a line for ' + f);
      t.eq(got, want[f], 'js/core/' + f + ' matches its SHA-256 in core.sha (someone other than the architect edited a core file if not)');
    });
  }
};
