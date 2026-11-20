/* Scene Booker — engine/week/save.js
 * SB.Save: localStorage slots, export, import, trimming and migrations.
 * Owner: E1a. Spec: design/spec/02-engine.md 2.8; 01-state sections 3 and 4.
 * The one engine file allowed to touch localStorage, and only behind a typeof guard.
 */
SB.module('Save', function (SB) {
  'use strict';
  var E = SB.Enums, U = SB.util;
  var INDEX_KEY = 'sb.saves', SLOT_PREFIX = 'sb.save.';

  /* Migrations, keyed by the version a function upgrades FROM. Version 3 is current. */
  var MIGRATIONS = {
    /* 1 -> 2: the player works their own door; nobody is hired or paid for it. The old door person becomes the scene's
     * security person (paid at least PAY.SECURITY[0]); every show's crew, the usual crew and the director's cast lose the
     * door; a door ask still out is withdrawn; ledger lines paid to a door person stay, as OTHER. Nothing here throws. */
    1: function (s) {
      var C = SB.Config, k, p, sh, a, i, l, out;
      Object.keys(s.people || {}).forEach(function (id) {
        p = s.people[id];
        if (!p || !Array.isArray(p.roles) || p.roles.indexOf('DOOR') < 0) return;
        p.roles = p.roles.filter(function (r) { return r !== 'DOOR' && r !== 'SECURITY'; }).concat(['SECURITY']);
        if (!(typeof p.rate === 'number' && p.rate >= C.PAY.SECURITY[0])) p.rate = C.PAY.SECURITY[0];
        if (p.hid && p.hid.skill && p.hid.skill.DOOR !== undefined) { p.hid.skill.SECURITY = p.hid.skill.DOOR; delete p.hid.skill.DOOR; }
      });
      Object.keys(s.shows || {}).forEach(function (id) {
        sh = s.shows[id];
        if (!sh || typeof sh !== 'object') return;
        if (sh.crew && typeof sh.crew === 'object') {
          delete sh.crew.door;
          if (sh.crew.security === undefined) sh.crew.security = null;
        }
        if (sh.insure === undefined) sh.insure = false;
      });
      if (s.player && s.player.usual && typeof s.player.usual === 'object') {
        delete s.player.usual.door;
        if (s.player.usual.security === undefined) s.player.usual.security = null;
      }
      if (s.director && s.director.cast && typeof s.director.cast === 'object' && 'door' in s.director.cast) {
        s.director.cast.security = s.director.cast.door; delete s.director.cast.door;
      }
      out = s.mail && Array.isArray(s.mail.out) ? s.mail.out : null;
      Object.keys(s.asks || {}).forEach(function (id) {
        a = s.asks[id];
        if (!a || a.kind !== 'CREW' || !a.payload || a.payload.role !== 'door') return;
        if (a.status === 'QUEUED' || a.status === 'SENT') {
          a.status = 'WITHDRAWN';
          a.answer = { status: 'WITHDRAWN', day: s.clock && typeof s.clock.day === 'number' ? s.clock.day : 0, counter: null, text: '' };
        }
        if (out) for (i = out.length - 1; i >= 0; i--) if (out[i] && out[i].askId === a.id) out.splice(i, 1);
      });
      l = s.money && Array.isArray(s.money.ledger) ? s.money.ledger : [];
      for (k = 0; k < l.length; k++) if (l[k] && l[k].cat === 'DOOR_PERSON') l[k].cat = 'OTHER';
      s.v = 2;
      return s;
    },
    /* 2 -> 3: the first show, the chapters and the patches (09a-build-contract). A game already under way has no
     * walkthrough (it is off, not skipped); the chapters and patches it has already earned are filled in quietly, with
     * no queue of cutscenes or cards waiting: they are in the box and on the jacket. Nothing here throws. */
    2: function (s) {
      var st;
      s.story = { tutorial: { on: false, step: null, skipped: false, nudgedAt: 0, showId: null, requestId: null, replied: false, closeout: false, wrong: {}, done: null },
                  chapters: {}, cutscenes: [], seen: [], drops: {}, counts: {}, toasts: [] };
      s.patches = {};
      try {
        if (SB.Chapters && SB.Chapters.ensure) SB.Chapters.ensure(s);
        if (SB.Chapters && SB.Chapters.check) SB.Chapters.check(s);
        if (SB.Patches && SB.Patches.check) SB.Patches.check(s);
      } catch (e) { /* a save too old or too odd to read: it keeps the empty defaults */ }
      st = s.story;
      if (st && Array.isArray(st.cutscenes)) { st.cutscenes.forEach(function (c) { if (c && c.key && st.seen.indexOf(c.key) < 0) st.seen.push(c.key); }); st.cutscenes = []; }
      if (st) st.toasts = [];
      s.v = 3;
      return s;
    }
  };

  function label(key) { return SB.text.has('strings.' + key) ? SB.text.label(key) : key; }
  function no(code) { return U.no(code, label('refuse.' + code)); }

  function store() {
    var ls = null;
    try { ls = (typeof localStorage !== 'undefined' && localStorage) ? localStorage : null; } catch (e) { ls = null; }
    return ls;
  }

  function isSlot(slot) { return typeof slot === 'string' && /^[A-Za-z0-9_-]{1,40}$/.test(slot); }

  /* ------------------------------------------------------------------ */
  /* trimming (01-state section 3)                                       */
  /* ------------------------------------------------------------------ */

  function bandKeys(est, bandId) {
    var out = [], k, parts;
    for (k in est) {
      parts = k.split(':');
      if (parts[1] === bandId && (parts[0] === 'draw' || parts[0] === 'cross' || parts[0] === 'live' || parts[0] === 'rel' ||
          parts[0] === 'promo' || parts[0] === 'honest')) out.push(k);
    }
    return out;
  }

  function trim(state) {
    var today = state.clock.day, week = state.clock.week, id, s, k, i, j, live = {}, msgs, m, keep, lines, old, sums, key, l,
        refs, done;
    // shows: result.demand after 2 weeks; jobs and asks 8 weeks after; the show itself after 104 weeks
    var dead = {}, any = false, planned = {}, o;
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (!s) continue;
      done = s.status === 'PLAYED' || s.status === 'CANCELLED';
      if (s.result && s.result.demand && s.day < today - 14) s.result.demand = null;
      if (done && s.day < today - 56 && !s.trimmed) {
        dead[id] = true; any = true;
        s.trimmed = true;                                  // its jobs and asks go once, below
        if (Array.isArray(s.jobs)) s.jobs = [];
      }
      /* SPEC?: 01-state 3 deletes a played show after 104 weeks and says nothing of a cancelled one, which has no
       * ShowRecord and nothing that reads it; it goes at the same age. */
      if (done && s.day < today - 728) delete state.shows[id];
    }
    for (i = 0; i < ((state.week && state.week.plan) || []).length; i++) planned[state.week.plan[i].jobId] = true;
    /* SPEC?: 01-state 3 gives a lifetime only to the jobs and asks "of a played or cancelled show". Those with no show
     * (vetting, a night out, a visit, an extra shift, a contact asked about a band) would be kept forever; a finished
     * one goes after the same 8 weeks. */
    for (k in (state.jobs || {})) {
      o = state.jobs[k];
      if (!o) continue;
      if (o.showId) { if (dead[o.showId] || !state.shows[o.showId]) delete state.jobs[k]; continue; }
      if (planned[k]) continue;
      if ((o.status === 'DONE' || o.status === 'SKIPPED' || o.status === 'MOOT') &&
          (typeof o.doneDay === 'number' ? o.doneDay : (typeof o.madeDay === 'number' ? o.madeDay : today - 57)) < today - 56) delete state.jobs[k];
    }
    for (k in (state.asks || {})) {
      o = state.asks[k];
      if (!o) continue;
      if (o.showId) { if (dead[o.showId] || !state.shows[o.showId]) delete state.asks[k]; continue; }
      if (o.status !== 'QUEUED' && o.status !== 'SENT' && o.answer && typeof o.answer.day === 'number' && o.answer.day < today - 56) delete state.asks[k];
      else if (o.status === 'WITHDRAWN' && typeof o.queuedDay === 'number' && o.queuedDay < today - 56) delete state.asks[k];
    }
    // messages: 26 weeks unless kept or tied to an open request, ask or offer
    for (id in (state.requests || {})) {
      s = state.requests[id];
      if (s && (s.status === 'NEW' || s.status === 'REPLIED' || s.status === 'NEGOTIATING')) live['q:' + id] = true;
    }
    for (id in (state.asks || {})) {
      s = state.asks[id];
      if (s && (s.status === 'QUEUED' || s.status === 'SENT' || s.status === 'COUNTER')) live['a:' + id] = true;
    }
    for (i = 0; i < ((state.legacy && state.legacy.offers) || []).length; i++) {
      if (state.legacy.offers[i].status === 'OPEN') live['o:' + state.legacy.offers[i].id] = true;
    }
    if (state.mail && Array.isArray(state.mail.messages)) {
      msgs = state.mail.messages; keep = [];
      for (i = 0; i < msgs.length; i++) {
        m = msgs[i]; refs = m.refs || {};
        if (m.keep || m.day >= today - 182 || (refs.requestId && live['q:' + refs.requestId]) ||
            (refs.askId && live['a:' + refs.askId]) || (refs.offerId && live['o:' + refs.offerId])) keep.push(m);
      }
      state.mail.messages = keep;
    }
    // the ledger: 104 weeks of lines; older lines summed per month, category and pot
    if (state.money && Array.isArray(state.money.ledger)) {
      lines = []; old = []; sums = {};
      for (i = 0; i < state.money.ledger.length; i++) {
        l = state.money.ledger[i];
        if (l.day < today - 728 && !l.summed) old.push(l); else lines.push(l);
      }
      if (old.length) {
        for (i = 0; i < old.length; i++) {
          l = old[i]; s = SB.time.date(l.day);
          key = s.y + '-' + s.m + '|' + l.cat + '|' + l.pot;
          if (!sums[key]) sums[key] = { day: SB.time.dayOf(s.y, s.m, 1), pot: l.pot, amount: 0, cat: l.cat, memo: '', showId: null, summed: true };
          sums[key].amount += l.amount;
        }
        old = Object.keys(sums).map(function (x) { return sums[x]; }).sort(function (a, b) { return a.day - b.day; });
        state.money.ledger = old.concat(lines);
      }
    }
    // other bookers' shows: 12 weeks after they play
    if (Array.isArray(state.otherShows)) {
      state.otherShows = state.otherShows.filter(function (o) { return !(o && typeof o.day === 'number' && o.day < today - 84); });
    }
    // ended bands: hid reduced to {} after 52 weeks, and their estimates dropped
    for (id in (state.bands || {})) {
      s = state.bands[id];
      if (!s || typeof s.endedWeek !== 'number' || s.endedWeek > week - 52) continue;
      if (!(s.hid && Object.keys(s.hid).length)) continue;   // already reduced, and its estimates dropped with it
      s.hid = {};
      if (state.notebook && state.notebook.est) {
        k = bandKeys(state.notebook.est, id);
        for (j = 0; j < k.length; j++) delete state.notebook.est[k[j]];
      }
    }
    /* the architect's lifetimes, kept by their owners: touring bands nobody is tied to (and their members), closed
     * requests with no show, people nobody has seen in a year. Bands first: they read the requests' closing days. */
    if (SB.Bands && typeof SB.Bands.trim === 'function') SB.Bands.trim(state);
    if (SB.Requests && typeof SB.Requests.trim === 'function') SB.Requests.trim(state);
    if (SB.People && typeof SB.People.trim === 'function') SB.People.trim(state);
    return state;
  }

  /* ------------------------------------------------------------------ */
  /* migrations                                                          */
  /* ------------------------------------------------------------------ */

  function migrate(state) {
    var v, fn;
    if (!state || typeof state !== 'object' || typeof state.v !== 'number') return null;
    if (state.v > SB.SAVE_VERSION) return null;
    while (state.v < SB.SAVE_VERSION) {
      v = state.v; fn = MIGRATIONS[v];
      if (typeof fn !== 'function') return null;
      state = fn(state);
      if (!state || typeof state.v !== 'number' || state.v <= v) return null;
    }
    return fillStyles(state);
  }

  /* A band's style is stored only when it is not its genre; readers use b.style || b.genre. No version bump: the field is additive. */
  function fillStyles(state) {
    var bands = state && state.bands;
    if (bands && typeof bands === 'object') Object.keys(bands).forEach(function (id) {
      var b = bands[id];
      if (b && typeof b === 'object' && b.style && b.style === b.genre) delete b.style;   // style is stored only when it differs from the genre
    });
    return state;
  }

  function looksLikeState(s) {
    return !!(s && typeof s === 'object' && typeof s.v === 'number' && typeof s.seed === 'string' &&
              typeof s.citySlug === 'string' && s.clock && s.rng && s.rng.streams && s.player && s.week);
  }

  function parse(text) {
    var obj, state;
    if (typeof text !== 'string' || !text) return null;
    try { obj = JSON.parse(text); } catch (e) { return null; }
    if (!obj || typeof obj !== 'object') return null;
    state = (obj.state && typeof obj.state === 'object') ? obj.state : obj;
    if (typeof state.v !== 'number' && typeof obj.v === 'number') state.v = obj.v;
    if (!looksLikeState(state)) return null;
    return migrate(state);
  }

  /* ------------------------------------------------------------------ */
  /* the slots                                                           */
  /* ------------------------------------------------------------------ */

  function readIndex(ls) {
    var raw, list;
    try { raw = ls.getItem(INDEX_KEY); list = raw ? JSON.parse(raw) : []; } catch (e) { list = []; }
    return Array.isArray(list) ? list : [];
  }

  function cityName(state) {
    var e = null, z;
    try { e = SB.Cities.entry(state.citySlug); } catch (err) { e = null; }
    if (e && e.name) return e.name;
    z = state.zones && state.zones.city;
    return (z && z.name) || state.citySlug;
  }

  function save(state, slot, savedAt) {
    var ls = store(), text, list, sum;
    if (!state || typeof state !== 'object' || !state.clock) SB.fail('Save.save', 'not a game state');
    if (!isSlot(slot)) SB.fail('Save.save', 'bad slot name ' + slot);
    trim(state);                                         // before anything else: a game is trimmed even where it cannot be written (Node)
    if (!ls) return no(E.REFUSE.INVALID);
    try {
      text = JSON.stringify({ v: SB.SAVE_VERSION, state: state });
      ls.setItem(SLOT_PREFIX + slot, text);
      sum = { slot: slot, city: state.citySlug, cityName: cityName(state), bookingName: state.player.bookingName,
              week: state.clock.week, savedAt: typeof savedAt === 'number' ? savedAt : null, v: SB.SAVE_VERSION };
      list = readIndex(ls).filter(function (x) { return x && x.slot !== slot; });
      list.push(sum);
      ls.setItem(INDEX_KEY, JSON.stringify(list));
    } catch (e) {
      return no(E.REFUSE.INVALID);                       // full or blocked storage: the interface offers the export
    }
    return U.yes({ bytes: text.length });
  }

  function load(slot) {
    var ls = store(), text, state;
    if (!isSlot(slot)) SB.fail('Save.load', 'bad slot name ' + slot);
    if (!ls) return no(E.REFUSE.INVALID);
    try { text = ls.getItem(SLOT_PREFIX + slot); } catch (e) { return no(E.REFUSE.INVALID); }
    if (!text) return no(E.REFUSE.INVALID);
    state = parse(text);
    if (!state) return no(E.REFUSE.INVALID);
    return U.yes({ state: state });
  }

  function list() {
    var ls = store();
    if (!ls) return no(E.REFUSE.INVALID);
    return readIndex(ls).filter(function (x) { return x && isSlot(x.slot); }).map(function (x) {
      return { slot: x.slot, city: x.city, cityName: x.cityName, bookingName: x.bookingName, week: x.week, savedAt: x.savedAt, v: x.v };
    });
  }

  function remove(slot) {
    var ls = store();
    if (!isSlot(slot)) SB.fail('Save.remove', 'bad slot name ' + slot);
    if (!ls) return no(E.REFUSE.INVALID);
    try {
      ls.removeItem(SLOT_PREFIX + slot);
      ls.setItem(INDEX_KEY, JSON.stringify(readIndex(ls).filter(function (x) { return x && x.slot !== slot; })));
    } catch (e) { return no(E.REFUSE.INVALID); }
    return U.yes();
  }

  function exportText(state) {
    if (!state || typeof state !== 'object' || !state.clock) SB.fail('Save.exportText', 'not a game state');
    return JSON.stringify({ v: SB.SAVE_VERSION, state: state });
  }

  function importText(text) {
    var state = parse(text);
    if (!state) return no(E.REFUSE.INVALID);
    return U.yes({ state: state });
  }

  return { save: save, load: load, list: list, remove: remove, exportText: exportText, importText: importText,
           /* not in the manifest: for the harness */
           trim: trim, migrations: MIGRATIONS };
});
