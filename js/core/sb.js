/* Scene Booker — core/sb.js
 * The namespace, the module registry, seeded random numbers, shared helpers,
 * the text templater and the manifest of every function each module must export.
 *
 * FROZEN CONTRACT FILE. Owned by the architect. No engineer edits it.
 * Loads first, in the browser (classic script) and in Node (vm.runInThisContext).
 * Spec: design/spec/00-overview.md section 6, 02-engine.md, 03-content.md section 2.
 *
 * Revision 2 (after review): the SB.UI registry lives here so any file may register a screen or a part while
 * loading; the manifest gained Week.log / raise / phoneOff, Game.adjustName / adjustFollowers, Jobs.promise,
 * Forecast.usual, Cities.pack / questions, and the Skeleton and Draw seams; SB.text got paren-depth parsing,
 * guards on single nodes, a stricter has(), safe number filters, and the name rule (blocked, block, nameOk).
 * The hashes of the three core files are in js/core/core.sha; the architect re-issues it with every change.
 */
(function (root) {
  'use strict';

  var SB = root.SB = root.SB || {};
  SB.VERSION = '1.1.0';
  SB.SAVE_VERSION = 3;

  /* ------------------------------------------------------------------ */
  /* Errors, assertions, log                                             */
  /* ------------------------------------------------------------------ */

  function SBError(where, message) {
    this.name = 'SBError';
    this.where = where;
    this.message = '[' + where + '] ' + message;
    this.stack = (new Error(this.message)).stack;
  }
  SBError.prototype = Object.create(Error.prototype);
  SBError.prototype.constructor = SBError;
  SB.SBError = SBError;

  /** A broken contract: wrong arguments, unknown id, missing module. Always throws. */
  SB.fail = function (where, message) { throw new SBError(where, message); };

  /** Cheap invariant. Throws SBError when cond is falsy. */
  SB.assert = function (cond, where, message) { if (!cond) SB.fail(where, message || 'assertion failed'); };

  /** Log sink. level: 'debug' | 'info' | 'warn' | 'error'. Kept in memory; the harness reads SB.log.entries. */
  SB.log = function (level, where, message, data) {
    var e = { level: level, where: where, message: message, data: data };
    SB.log.entries.push(e);
    if (SB.log.entries.length > SB.log.max) SB.log.entries.shift();
    if (SB.log.echo && typeof console !== 'undefined' && (level === 'warn' || level === 'error')) {
      console[level]('[' + where + '] ' + message, data === undefined ? '' : data);
    }
  };
  SB.log.entries = [];
  SB.log.max = 2000;
  SB.log.echo = true;

  /* ------------------------------------------------------------------ */
  /* Module registry                                                     */
  /* ------------------------------------------------------------------ */

  SB.modules = {};

  /** Define a module once. factory(SB) returns the object of public functions; it becomes SB[name]. */
  SB.module = function (name, factory) {
    if (SB.modules[name]) SB.fail('SB.module', 'module "' + name + '" is defined twice');
    if (typeof factory !== 'function') SB.fail('SB.module', 'factory for "' + name + '" is not a function');
    var api = factory(SB);
    if (!api || typeof api !== 'object') SB.fail('SB.module', 'module "' + name + '" returned nothing');
    SB.modules[name] = true;
    SB[name] = api;
    return api;
  };

  /** Fetch a module or fail with a clear message (use inside functions, never at load time). */
  SB.need = function (name) {
    if (!SB.modules[name]) SB.fail('SB.need', 'module "' + name + '" is not loaded');
    return SB[name];
  };

  /* Data namespaces filled by other files. */
  SB.Content = SB.Content || {};     // js/content/*.js assign SB.Content.<file>
  SB.Content.ui = SB.Content.ui || {};   // interface chrome labels: each screen file assigns SB.Content.ui.<screen>
  SB.CityIndex = SB.CityIndex || []; // js/cities/index.js

  /* ------------------------------------------------------------------ */
  /* The interface manifest: every function a module must export.        */
  /* Signatures and return shapes are in design/spec/02-engine.md,       */
  /* 04-cities.md and 05-interface.md. SB.verify() checks presence.      */
  /* ------------------------------------------------------------------ */

  SB.API = {
    engine: {
      /* E1: the week and its jobs */
      /* E1a: Game, Week, Money, Stress, Save.   E1b: Shows, Jobs, Mail. */
      Game:      ['newGame', 'strip', 'setSetting', 'adjustName', 'adjustFollowers'],
      Week:      ['view', 'plan', 'unplan', 'addJob', 'removeJob', 'suggest', 'dropShift', 'setDayJob', 'phoneOff',
                  'check', 'startPlay', 'step', 'decide', 'close', 'payBills', 'nextWeek', 'log', 'raise',
                  'tonight', 'canDoNow', 'doNow', 'endNight', 'crunch'],
      Shows:     ['create', 'get', 'list', 'view', 'setBill', 'setBilling', 'setDoor', 'setLabel', 'setDeal',
                  'setCrew', 'setInsurance', 'addBand', 'addOwnBand', 'setHouseRules', 'dropBand', 'lock', 'onConfirmed', 'move', 'cancel', 'tellOff'],
      Jobs:      ['catalog', 'ensure', 'refreshAll', 'get', 'forShow', 'tray', 'freeJobs', 'window', 'canDo',
                  'promise', 'resolve', 'flyerSpec', 'setFlyer'],
      Mail:      ['inbox', 'message', 'markRead', 'reply', 'ask', 'withdraw', 'chase', 'setNeedBy',
                  'waiting', 'needsYou', 'outbox', 'post', 'flush', 'deliver', 'unqueue'],
      Money:     ['spend', 'earn', 'move', 'canCover', 'exposure', 'owedAhead', 'showAccounts', 'ledger',
                  'billsView', 'payBills', 'weekly'],
      Stress:    ['add', 'zone', 'view', 'slip', 'weekly'],
      Save:      ['save', 'load', 'list', 'remove', 'exportText', 'importText'],
      /* things to do with the rest of the night (design/spec/12-day-activities.md) */
      Evening:   ['list', 'can', 'doIt'],

      /* E2: the show */
      Model:     ['affinity', 'bandGen', 'reach', 'demand', 'night', 'resolve'],
      Forecast:  ['lens', 'usual', 'par', 'call', 'ablate', 'card', 'what', 'reachStrip', 'jobLoss'],
      Night:     ['begin', 'next', 'settleView', 'settle', 'auto', 'finish', 'resolveOther'],
      Feedback:  ['causes', 'build', 'debrief'],
      Notebook:  ['init', 'est', 'range', 'narrow', 'reopen', 'learnFromShow', 'scout', 'knowledge', 'mark',
                  'addNote', 'seeTerm', 'pages', 'entry', 'tally', 'weekly'],

      /* E3a: WorldGen, Bands, Trends, Crowd.   E3b: Rooms, Requests, Territory. */
      WorldGen:  ['build', 'band', 'person', 'touringBand', 'room'],
      Bands:     ['get', 'list', 'card', 'tier', 'publicDraw', 'fresh', 'isFree', 'fee', 'replyWindow',
                  'yesWords', 'filledLine', 'cancelLine', 'ensurePlayerBand', 'answerAsk', 'addTrust', 'trust', 'removeMember', 'afterShow', 'weekly'],
      Rooms:     ['get', 'list', 'card', 'calendar', 'facts', 'howIn', 'terms', 'answerAsk', 'confirm', 'release', 'challenge',
                  'rel', 'adjustRel', 'otherShows', 'bookers', 'bookerRel', 'adjustBookerRel', 'afterShow',
                  'daily', 'weekly'],
      Requests:  ['get', 'list', 'view', 'route', 'vet', 'answerAsk', 'pass', 'accept', 'daily', 'weekly'],
      Trends:    ['heat', 'known', 'arrow', 'signs', 'weekly'],
      Crowd:     ['cells', 'regulars', 'addRegulars', 'loseRegulars', 'load', 'focus', 'afterShow', 'weekly'],
      Territory: ['word', 'tier', 'adjustWord', 'contacts', 'adjustContact', 'answerAsk', 'drive',
                  'tourCandidates', 'tourStops', 'startTour', 'tour', 'afterShow', 'weekly'],

      /* E4: people and story */
      Effects:   ['test', 'why', 'apply', 'preview'],
      Director:  ['opening', 'planWeek', 'due', 'resolve', 'nightStops', 'risks'],
      People:    ['get', 'card', 'rel', 'adjust', 'stage', 'crew', 'circle', 'favor', 'meet', 'answerAsk',
                  'perform', 'afterShow', 'weekly'],
      Harm:      ['current', 'act', 'answerAsk', 'list', 'add', 'remove', 'flags', 'onBooked', 'weekly'],
      Legacy:    ['stage', 'mark', 'afterShow', 'wall', 'binder', 'bandHistory', 'townLine', 'firsts',
                  'offers', 'answerOffer', 'end', 'yearly', 'weekly'],

      /* SYSTEMS: the first show, the chapters, the patches (design/spec/09a-build-contract.md) */
      Chapters:  ['check', 'nextCutscene', 'markSeen', 'list'],
      Moments:   ['afterShow', 'note', 'milestones', 'kept'],
      Tutorial:  ['start', 'skip', 'current', 'notify'],
      Patches:   ['check', 'all'],
      Rungs:     ['rung', 'onDesk', 'isNew', 'opened', 'covers', 'hides', 'mentor', 'billsWaiting', 'cover', 'weekly']
    },
    cities: {
      Cities:    ['register', 'load', 'isLoaded', 'get', 'pack', 'entry', 'near', 'normalize', 'validate', 'questions']
    },
    art: {
      /* ART-A: Skeleton, Flyer (and the flyer desk screen).   ART-B: Draw, Identity. */
      Skeleton:  ['draw', 'path', 'measure'],
      Draw:      ['motif', 'picture', 'texture', 'tape', 'torn', 'halftone'],
      Flyer:     ['recipe', 'roll', 'render', 'thumb', 'text', 'check', 'learn', 'sample'],
      Identity:  ['inks', 'bandMark', 'personStamp', 'roomDrawing', 'roomGlyph', 'bookerMark', 'cityStamp', 'genGlyph']
    },
    ui: {
      /* screen, part and extend are defined below in this file. dom.js adds h; app.js adds the rest. */
      UI:        ['screen', 'part', 'extend', 'go', 'back', 'act', 'game', 'toast', 'h']
    }
  };

  /* ------------------------------------------------------------------ */
  /* The interface registry.                                             */
  /* It lives in the core so that any file (a screen, the flyer code,    */
  /* a part one role lends another) can register while it loads, in any  */
  /* order, in the browser and in Node. It holds no DOM code.            */
  /* js/ui/dom.js, components.js and app.js add to it with SB.UI.extend  */
  /* and by filling SB.UI.C; nothing ever calls SB.module('UI').         */
  /* ------------------------------------------------------------------ */

  SB.UI = {
    screens: {},   // name -> def, filled by SB.UI.screen
    parts: {},     // name -> function, filled by SB.UI.part
    C: {},         // shared components, filled by js/ui/components.js: SB.UI.C.RangeBar = function (props) { ... }
    /** Register a screen. def = { rail, title, full, mount: function (root, params) -> { update, unmount } }. */
    screen: function (name, def) {
      if (SB.UI.screens[name]) SB.fail('SB.UI.screen', 'screen "' + name + '" is registered twice');
      if (!def || typeof def.mount !== 'function') SB.fail('SB.UI.screen', 'screen "' + name + '" has no mount function');
      SB.UI.screens[name] = def;
    },
    /** Register a piece one role lends another. Read back, inside a function, as SB.UI.parts[name]. */
    part: function (name, fn) {
      if (SB.UI.parts[name]) SB.fail('SB.UI.part', 'part "' + name + '" is registered twice');
      if (typeof fn !== 'function') SB.fail('SB.UI.part', 'part "' + name + '" is not a function');
      SB.UI.parts[name] = fn;
    },
    /** Add functions or objects to SB.UI. Refuses to replace anything already there. */
    extend: function (members) {
      Object.keys(members).forEach(function (k) {
        if (Object.prototype.hasOwnProperty.call(SB.UI, k)) SB.fail('SB.UI.extend', '"' + k + '" is already defined on SB.UI');
        SB.UI[k] = members[k];
      });
    }
  };

  /** Returns a list of 'Module.fn' strings that are missing. groups defaults to all. */
  SB.verify = function (groups) {
    var missing = [];
    (groups || Object.keys(SB.API)).forEach(function (g) {
      var mods = SB.API[g];
      if (!mods) { missing.push('(unknown group ' + g + ')'); return; }
      Object.keys(mods).forEach(function (m) {
        if (!SB[m]) { missing.push(m + ' (module)'); return; }
        mods[m].forEach(function (fn) {
          if (typeof SB[m][fn] !== 'function') missing.push(m + '.' + fn);
        });
      });
    });
    return missing;
  };

  /* ------------------------------------------------------------------ */
  /* Seeded random numbers                                               */
  /* ------------------------------------------------------------------ */

  function hash2(str, seed) {
    var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed, i, ch;
    for (i = 0; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return [h1 >>> 0, h2 >>> 0];
  }

  /** cyrb53: a 53-bit hash of a string, as a non-negative integer. */
  function hash(str, seed) {
    var h = hash2(String(str), seed || 0);
    return 4294967296 * (2097151 & h[1]) + h[0];
  }

  function sfc32(s) {
    var a = s[0] | 0, b = s[1] | 0, c = s[2] | 0, d = s[3] | 0;
    var t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ (b >>> 9);
    b = c + (c << 3) | 0;
    c = (c << 21) | (c >>> 11);
    c = c + t | 0;
    s[0] = a; s[1] = b; s[2] = c; s[3] = d;
    return (t >>> 0) / 4294967296;
  }

  function seedArray(seedString) {
    var h = hash2(String(seedString), 0), g = hash2(String(seedString), 1);
    var s = [h[0] | 0, h[1] | 0, g[0] | 0, g[1] | 0], i;
    for (i = 0; i < 12; i++) sfc32(s);
    return s;
  }

  /* An Rng wraps a 4-integer state array and advances it in place. */
  function wrap(s) {
    var r = {
      /** uniform in [0, 1) */
      next: function () { return sfc32(s); },
      /** integer in [lo, hi], both included */
      int: function (lo, hi) { return lo + Math.floor(sfc32(s) * (hi - lo + 1)); },
      /** uniform in [lo, hi) */
      range: function (lo, hi) { return lo + sfc32(s) * (hi - lo); },
      /** true with probability p */
      chance: function (p) { return sfc32(s) < p; },
      /** one element of a non-empty array; undefined for an empty one */
      pick: function (list) { return list.length ? list[Math.floor(sfc32(s) * list.length)] : undefined; },
      /** one element chosen by weight. weights: array of numbers, or function(item, index). null if all weights are 0 */
      weighted: function (list, weights) {
        var total = 0, w = [], i, x;
        for (i = 0; i < list.length; i++) {
          x = typeof weights === 'function' ? weights(list[i], i) : weights[i];
          x = x > 0 ? x : 0; w.push(x); total += x;
        }
        if (total <= 0) return null;
        x = sfc32(s) * total;
        for (i = 0; i < list.length; i++) { x -= w[i]; if (x < 0) return list[i]; }
        return list[list.length - 1];
      },
      /** a shuffled copy */
      shuffle: function (list) {
        var a = list.slice(), i, j, t;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(sfc32(s) * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      },
      /** normal distribution */
      normal: function (mean, sd) {
        var u = 1 - sfc32(s), v = sfc32(s);
        return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
      },
      state: s
    };
    return r;
  }

  SB.rng = {
    hash: hash,
    /** A free-standing generator. Not stored anywhere. For art, UI and tests. */
    make: function (seedString) { return wrap(seedArray(seedString)); },
    /** The named stream of a game state. Its position is saved in state.rng.streams[name]. */
    stream: function (state, name) {
      if (!state || !state.rng || !state.rng.streams) SB.fail('SB.rng.stream', 'state has no rng');
      var s = state.rng.streams[name];
      if (!s) s = state.rng.streams[name] = seedArray(state.seed + ':' + name);
      return wrap(s);
    },
    /** The rng block of a new state. */
    init: function () { return { streams: {} }; }
  };

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                       */
  /* ------------------------------------------------------------------ */

  SB.util = {
    clamp: function (x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    sum: function (list, fn) {
      var t = 0, i;
      for (i = 0; i < list.length; i++) t += fn ? fn(list[i], i) : list[i];
      return t;
    },
    mean: function (list) { return list.length ? SB.util.sum(list) / list.length : 0; },
    round: function (x, places) { var p = Math.pow(10, places || 0); return Math.round(x * p) / p; },
    /** Deep copy of plain data. */
    copy: function (x) { return x === undefined ? undefined : JSON.parse(JSON.stringify(x)); },
    /** Next id with a prefix: newId(state, 'b') -> 'b12'. Counters live in state.ids. */
    newId: function (state, prefix) {
      state.ids = state.ids || {};
      state.ids[prefix] = (state.ids[prefix] || 0) + 1;
      return prefix + state.ids[prefix];
    },
    /** Piecewise-linear lookup. points: [[x, y], ...] sorted by x. Flat beyond the ends. */
    curve: function (points, x) {
      var i, a, b;
      if (x <= points[0][0]) return points[0][1];
      for (i = 1; i < points.length; i++) {
        if (x <= points[i][0]) {
          a = points[i - 1]; b = points[i];
          return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
        }
      }
      return points[points.length - 1][1];
    },
    /** A result that says no. */
    no: function (code, why) { return { ok: false, code: code, why: why || '' }; },
    /** A result that says yes, with extra fields. */
    yes: function (extra) { var r = { ok: true }, k; if (extra) for (k in extra) r[k] = extra[k]; return r; }
  };

  /* ------------------------------------------------------------------ */
  /* Time. Day 0 is Monday 18 January 2027. Weekday 0 is Monday.         */
  /* ------------------------------------------------------------------ */

  var DAY_MS = 86400000;
  var START_MS = Date.UTC(2027, 0, 18);
  var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];

  /** 4 -> '4th'. Anything that is not a whole, finite number comes back unchanged, as a string. */
  function ordinal(n) {
    if (typeof n !== 'number' || !isFinite(n) || n !== Math.floor(n)) return String(n);
    var v = Math.abs(n) % 100, s = ['th', 'st', 'nd', 'rd'];
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  /** A value as a finite number, or null when it is not one ('', null, 'Thursday'). */
  function numeric(v) {
    if (v === null || v === undefined || v === '' || typeof v === 'boolean') return null;
    var n = Number(v);
    return isFinite(n) ? n : null;
  }

  SB.time = {
    DAYS: DAYS,
    MONTHS: MONTHS,
    /** {y, m (1-12), d (1-31), dow (0 = Monday), week, doy (1-366)} for a day number. */
    date: function (day) {
      var dt = new Date(START_MS + day * DAY_MS), y = dt.getUTCFullYear();
      return { y: y, m: dt.getUTCMonth() + 1, d: dt.getUTCDate(),
               dow: ((day % 7) + 7) % 7, week: Math.floor(day / 7),
               doy: Math.round((dt.getTime() - Date.UTC(y, 0, 1)) / DAY_MS) + 1 };
    },
    /** Day number of a calendar date. */
    dayOf: function (y, m, d) { return Math.round((Date.UTC(y, m - 1, d) - START_MS) / DAY_MS); },
    dow: function (day) { return ((day % 7) + 7) % 7; },
    week: function (day) { return Math.floor(day / 7); },
    /** First day (Monday) of a week number. */
    weekStart: function (week) { return week * 7; },
    month: function (day) { return SB.time.date(day).m; },
    year: function (day) { return SB.time.date(day).y; },
    /** Game year, 1-based: year 1 is weeks 0 to 51. */
    gameYear: function (day) { return Math.floor(day / 364) + 1; },
    /** Which week of its month a day falls in, 1 to 5 (days 1-7 are week 1). */
    weekOfMonth: function (day) { return Math.floor((SB.time.date(day).d - 1) / 7) + 1; },
    /** True when the week after `week` ends in a different month than `week` ends in: bills are due at this close-out. */
    billsDue: function (week) {
      return SB.time.month(week * 7 + 6) !== SB.time.month(week * 7 + 13);
    },
    /** Text for a day. style: 'dow' Thursday | 'dow3' Thu | 'the' the 4th | 'md' Feb 4 | 'short' Thu Feb 4 |
     *  'long' Thursday, February 4 | 'week' Week of January 18 | 'month' February */
    fmt: function (day, style) {
      var t = SB.time.date(day), dn = DAYS[t.dow], mn = MONTHS[t.m - 1];
      switch (style) {
        case 'dow': return dn;
        case 'dow3': return dn.slice(0, 3);
        case 'the': return 'the ' + ordinal(t.d);
        case 'md': return mn.slice(0, 3) + ' ' + t.d;
        case 'short': return dn.slice(0, 3) + ' ' + mn.slice(0, 3) + ' ' + t.d;
        case 'week': return 'Week of ' + mn + ' ' + SB.time.date(day - t.dow).d;
        case 'month': return mn;
        default: return dn + ', ' + mn + ' ' + t.d;
      }
    },
    /** Clock text from minutes after midnight: 1200 -> '8', 1245 -> '8:45', 1410 -> '11:30', 60 -> '1' (a.m.). */
    clock: function (minutes) {
      var m = ((minutes % 1440) + 1440) % 1440, h = Math.floor(m / 60) % 12, mm = m % 60;
      if (h === 0) h = 12;
      return h + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '');
    }
  };

  /* ------------------------------------------------------------------ */
  /* Geography                                                           */
  /* ------------------------------------------------------------------ */

  SB.geo = {
    /** The box SB.geo.project draws into. */
    BOX: { w: 1000, h: 560 },
    /** Straight-line miles between two points. */
    miles: function (lat1, lon1, lat2, lon2) {
      var R = 3958.8, k = Math.PI / 180;
      var dLat = (lat2 - lat1) * k, dLon = (lon2 - lon1) * k;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * k) * Math.cos(lat2 * k) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
    },
    /** Drive minutes between two {lat, lon} points: straight-line miles x Config.DRIVE_FACTOR. */
    drive: function (a, b) {
      return Math.round(SB.geo.miles(a.lat, a.lon, b.lat, b.lon) * SB.Config.DRIVE_FACTOR);
    },
    /** Compass bearing in degrees (0 north, 90 east) from a to b. */
    bearing: function (a, b) {
      var k = Math.PI / 180, y = Math.sin((b.lon - a.lon) * k) * Math.cos(b.lat * k);
      var x = Math.cos(a.lat * k) * Math.sin(b.lat * k) -
              Math.sin(a.lat * k) * Math.cos(b.lat * k) * Math.cos((b.lon - a.lon) * k);
      return (Math.atan2(y, x) / k + 360) % 360;
    },
    /** Map position in BOX for the national map. The lower 48 fill the box; Alaska and Hawaii go to an inset
     *  at the bottom left and come back with inset: true. */
    project: function (lat, lon) {
      var s = 1000 / (59 * 0.788);
      if (lat > 50.5) return { x: 40 + (lon + 170) * 3.2, y: 545 - (lat - 54) * 5.5, inset: true };
      if (lon < -140) return { x: 230 + (lon + 160) * 9, y: 545 - (lat - 19) * 9, inset: true };
      return { x: (lon + 125) * 0.788 * s, y: (50 - lat) * s, inset: false };
    }
  };

  /* ------------------------------------------------------------------ */
  /* Text: the template language of design/spec/03-content.md section 2  */
  /* ------------------------------------------------------------------ */

  var WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
               'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];

  function money(n) {
    var neg = n < 0, v = Math.abs(Math.round(n));
    return (neg ? '−' : '') + '$' + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /* The number filters leave a value that is not a number exactly as it was, so a slot that sometimes
   * carries text never prints "NaNth" or "$NaN". */
  var FILTERS = {
    cap: function (v) { v = String(v); return v.charAt(0).toUpperCase() + v.slice(1); },
    upper: function (v) { return String(v).toUpperCase(); },
    lower: function (v) { return String(v).toLowerCase(); },
    money: function (v) { var n = numeric(v); return n === null ? String(v) : money(n); },
    ord: function (v) { var n = numeric(v); return n === null ? String(v) : ordinal(Math.round(n)); },
    num: function (v) { var n = numeric(v); return n === null ? String(v) : String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); },
    words: function (v) { var n = numeric(v); return n === null ? String(v) : ((n >= 0 && n <= 20 && n === Math.floor(n)) ? WORDS[n] : FILTERS.num(n)); },
    a: function (v) { v = String(v); return (/^[aeiou]/i.test(v) ? 'an ' : 'a ') + v; },
    poss: function (v) { return String(v) + '\'s'; }
  };

  function lookup(ctx, path) {
    var parts = path.split('.'), v = ctx, i;
    for (i = 0; i < parts.length; i++) {
      if (v === null || v === undefined) return undefined;
      v = v[parts[i]];
    }
    return v;
  }

  /* Parser. Produces a list of nodes:
   *   'literal'                                    string
   *   { k: 'slot', name, filters, fallback }       {name:filter:filter|fallback}
   *   { k: 'pick', options: [{ guard, not, weight, nodes }] }      [a | ?flag: b | c^3]
   *   { k: 'cond', kind: 'flag'|'not'|'chance', arg, nodes }       (?flag: ...) (?!flag: ...) (%40: ...)
   */
  function parse(src) {
    var pos = 0;

    function seq(stops) {
      var nodes = [], buf = '', c, depth = 0, inCond = stops.indexOf(')') >= 0;
      function flush() { if (buf) { nodes.push(buf); buf = ''; } }
      while (pos < src.length) {
        c = src.charAt(pos);
        if (c === '\\' && pos + 1 < src.length) { buf += src.charAt(pos + 1); pos += 2; continue; }
        /* Inside a (?flag: ...) block, a plain "(" opens a literal pair and its ")" does not end the block. */
        if (c === ')' && inCond && depth > 0) { depth--; buf += c; pos++; continue; }
        if (stops.indexOf(c) >= 0) break;
        if (c === '{') { flush(); nodes.push(slot()); continue; }
        if (c === '[') { flush(); nodes.push(pick()); continue; }
        if (c === '(' && (src.charAt(pos + 1) === '?' || src.charAt(pos + 1) === '%')) {
          var save = pos, node = cond();
          if (node) { flush(); nodes.push(node); continue; }
          pos = save;
        }
        if (c === '(' && inCond) depth++;
        buf += c; pos++;
      }
      flush();
      return nodes;
    }

    function slot() {
      var end = src.indexOf('}', pos), body, bar, parts, name, filters = [], fallback = null, i;
      if (end < 0) SB.fail('SB.text', 'unclosed { in: ' + src.slice(pos, pos + 40));
      body = src.slice(pos + 1, end); pos = end + 1;
      bar = body.indexOf('|');
      if (bar >= 0) { fallback = body.slice(bar + 1); body = body.slice(0, bar); }
      parts = body.split(':');
      name = parts[0].trim();
      for (i = 1; i < parts.length; i++) {
        if (!parts[i].trim()) continue;
        if (!FILTERS[parts[i].trim()]) SB.fail('SB.text', 'unknown filter "' + parts[i].trim() + '"');
        filters.push(parts[i].trim());
      }
      return { k: 'slot', name: name, filters: filters, fallback: fallback };
    }

    function pick() {
      var options = [], m, opt, nodes, last, w;
      pos++; // [
      while (pos <= src.length) {
        opt = { guard: null, not: false, weight: 1, nodes: null };
        m = /^\s*\?(!?)([A-Za-z0-9_.]+):/.exec(src.slice(pos));
        if (m) { opt.guard = m[2]; opt.not = m[1] === '!'; pos += m[0].length; }
        nodes = seq('|]');
        last = nodes.length ? nodes[nodes.length - 1] : null;
        if (typeof last === 'string') {
          w = /\^(\d+(?:\.\d+)?)\s*$/.exec(last);
          if (w) { opt.weight = Number(w[1]); nodes[nodes.length - 1] = last.slice(0, w.index); }
        }
        trimEnds(nodes);
        opt.nodes = nodes;
        options.push(opt);
        if (pos >= src.length) SB.fail('SB.text', 'unclosed [ in: ' + src.slice(0, 60));
        if (src.charAt(pos) === ']') { pos++; break; }
        pos++; // |
      }
      return { k: 'pick', options: options };
    }

    function cond() {
      var m = /^\((\?(!?)([A-Za-z0-9_.]+)|%(\d+(?:\.\d+)?)):/.exec(src.slice(pos)), nodes, node;
      if (!m) return null;
      pos += m[0].length;
      nodes = seq(')');
      if (src.charAt(pos) !== ')') SB.fail('SB.text', 'unclosed ( in: ' + src.slice(0, 60));
      pos++;
      if (typeof nodes[0] === 'string') nodes[0] = nodes[0].replace(/^ /, '');
      node = m[4] !== undefined ? { k: 'cond', kind: 'chance', arg: Number(m[4]) / 100, nodes: nodes }
                                : { k: 'cond', kind: m[2] === '!' ? 'not' : 'flag', arg: m[3], nodes: nodes };
      return node;
    }

    function trimEnds(nodes) {
      if (!nodes.length) return;
      if (typeof nodes[0] === 'string') nodes[0] = nodes[0].replace(/^\s+/, '');
      var n = nodes.length - 1;
      if (typeof nodes[n] === 'string') nodes[n] = nodes[n].replace(/\s+$/, '');
    }

    var out = seq('');
    if (pos < src.length) SB.fail('SB.text', 'unexpected "' + src.charAt(pos) + '" in: ' + src.slice(0, 60));
    return out;
  }

  var parseCache = {};

  function run(nodes, ctx, rng) {
    var out = '', i, n, v, eligible, chosen, j;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (typeof n === 'string') { out += n; continue; }
      if (n.k === 'slot') {
        v = lookup(ctx, n.name);
        if (v === undefined || v === null || v === '') {
          if (n.fallback === null) SB.log('debug', 'SB.text', 'empty slot {' + n.name + '}');
          out += n.fallback === null ? '' : n.fallback;
        } else {
          if (Array.isArray(v)) v = v.join(', ');
          for (j = 0; j < n.filters.length; j++) v = FILTERS[n.filters[j]](v);
          out += String(v);
        }
      } else if (n.k === 'pick') {
        /* Options whose guard passes compete among themselves; unguarded options are the fallback when none passes. */
        eligible = []; chosen = [];
        for (j = 0; j < n.options.length; j++) {
          v = n.options[j];
          if (v.guard === null) chosen.push(v);
          else if ((!!lookup(ctx, v.guard)) !== v.not) eligible.push(v);
        }
        if (!eligible.length) eligible = chosen;
        if (!eligible.length) continue;
        chosen = rng ? rng.weighted(eligible, function (o) { return o.weight; }) : eligible[0];
        if (chosen) out += run(chosen.nodes, ctx, rng);
      } else if (n.k === 'cond') {
        if (n.kind === 'chance') { if (rng ? rng.chance(n.arg) : n.arg >= 0.5) out += run(n.nodes, ctx, rng); }
        else if ((!!lookup(ctx, n.arg)) === (n.kind === 'flag')) out += run(n.nodes, ctx, rng);
      }
    }
    return out;
  }

  function tidy(s) {
    return s.replace(/[ \t]{2,}/g, ' ')
            .replace(/ +([,.!?;:])/g, '$1')
            .replace(/[ \t]+\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/^\s+|\s+$/g, '');
  }

  /* A content node is a template string, or { t: template, w: weight, if: flag, not: flag },
   * or an array of those (one is chosen). A single object node honors its if / not like one in a list. */
  function choose(node, ctx, rng) {
    var list, ok = [], i, n;
    if (typeof node === 'string') return node;
    if (node && typeof node === 'object' && !Array.isArray(node) && typeof node.t === 'string') node = [node];
    if (!Array.isArray(node)) return null;
    list = node;
    for (i = 0; i < list.length; i++) {
      n = list[i];
      if (typeof n === 'string') { ok.push(n); continue; }
      if (!n || typeof n.t !== 'string') continue;
      if (n.if && !lookup(ctx, n.if)) continue;
      if (n.not && lookup(ctx, n.not)) continue;
      ok.push(n);
    }
    if (!ok.length) return null;
    n = rng ? rng.weighted(ok, function (o) { return typeof o === 'string' ? 1 : (o.w === undefined ? 1 : o.w); }) : ok[0];
    return n === null ? null : (typeof n === 'string' ? n : n.t);
  }

  /* True for a text node that can render something: a non-empty string, { t: 'non-empty' }, or a list holding one. */
  function usable(n) {
    var i;
    if (typeof n === 'string') return n.length > 0;
    if (Array.isArray(n)) { for (i = 0; i < n.length; i++) if (usable(n[i])) return true; return false; }
    return !!n && typeof n === 'object' && typeof n.t === 'string' && n.t.length > 0;
  }

  /* ---- The name rule (03-content section 4.1). ---- */

  /* A name as it is compared: lower case, punctuation dropped, hyphens as spaces, a leading "the" removed. */
  function normName(name) {
    return String(name).toLowerCase().replace(/[-_\/]+/g, ' ').replace(/[^a-z0-9 ]+/g, '').replace(/\s+/g, ' ')
                       .replace(/^\s+|\s+$/g, '').replace(/^the /, '');
  }

  /* A blocklist term is a name to refuse outright ('half mast'), or, written with a trailing star
   * ('hurricane party*'), a word or phrase that no name may contain. Stored normalized; the star is kept. */
  function normTerm(term) {
    var s = String(term), star = /\*\s*$/.test(s), n = normName(s);
    return n ? n + (star ? '*' : '') : '';
  }

  var blockExtra = {};                                     // terms added by SB.text.block (city packs), normalized
  var blockCache = { src: null, n: -1, extra: -1, exact: {}, within: [] };
  var blockExtraCount = 0;

  /* Real well-known band names (SB.Content.bandNames.blockFamous), normalized, as a lookup. Band names only. */
  var famousCache = { src: null, n: -1, map: {} };
  function famousIndex() {
    var list = (SB.Content.bandNames && SB.Content.bandNames.blockFamous) || [], i, t;
    if (famousCache.src === list && famousCache.n === list.length) return famousCache.map;
    famousCache = { src: list, n: list.length, map: {} };
    for (i = 0; i < list.length; i++) { t = normName(list[i]); if (t) famousCache.map[t] = true; }
    return famousCache.map;
  }

  function blockIndex() {
    var list = (SB.Content.names && SB.Content.names.blocklist) || [], i, t, keys, seen = {};
    if (blockCache.src === list && blockCache.n === list.length && blockCache.extra === blockExtraCount) return blockCache;
    blockCache = { src: list, n: list.length, extra: blockExtraCount, exact: {}, within: [] };
    keys = Object.keys(blockExtra);
    for (i = 0; i < list.length + keys.length; i++) {
      t = i < list.length ? normTerm(list[i]) : keys[i - list.length];
      if (!t || seen[t]) continue;
      seen[t] = true;
      if (t.charAt(t.length - 1) === '*') { t = t.slice(0, -1); blockCache.within.push(' ' + t + ' '); }
      blockCache.exact[t] = true;
    }
    return blockCache;
  }

  SB.text = {
    /** When true, line() returns '' (the harness sets this for speed). */
    off: false,
    money: money,
    ordinal: ordinal,
    /** Render one template string. ctx supplies slots and flags. rng may be null (first option, no chance blocks). */
    render: function (template, ctx, rng) {
      var nodes = parseCache[template] || (parseCache[template] = parse(template));
      return tidy(run(nodes, ctx || {}, rng || null));
    },
    /** Find content at a dotted path under SB.Content (e.g. 'jobs.MAKE_FLYER.late'), choose a variant, render it.
     *  Returns '' and logs a warning when the path has no text. */
    line: function (path, ctx, rng) {
      if (SB.text.off) return '';
      var node = lookup(SB.Content, path), tpl = choose(node, ctx || {}, rng || null);
      if (tpl === null || tpl === undefined) {
        SB.log('warn', 'SB.text.line', 'no text at "' + path + '"');
        return '';
      }
      return SB.text.render(tpl, ctx, rng);
    },
    /** True when a text node that can render something exists at the path. An empty list, an empty string and a
     *  group object (one that only holds further keys) are all false, so "fall back when the path is empty" works
     *  on stubs such as HOLD_NO: []. */
    has: function (path) { return usable(lookup(SB.Content, path)); },
    /** A static label. Looked up in SB.Content.strings (game vocabulary, owned by CONTENT), then from the root of
     *  SB.Content, so 'ui.week.play' finds SB.Content.ui.week.play (interface chrome, owned by the screen's file).
     *  Falls back to the key itself so a missing label is visible. */
    label: function (key, ctx) {
      var node = lookup(SB.Content.strings || {}, key), tpl;
      if (node === undefined || node === null) node = lookup(SB.Content, key);
      tpl = choose(node, ctx || {}, null);
      if (tpl === null || tpl === undefined) { SB.log('warn', 'SB.text.label', 'no label "' + key + '"'); return key; }
      return SB.text.render(tpl, ctx, null);
    },
    /** The form in which names are compared: lower case, no punctuation, no leading "the". */
    normName: normName,
    /** Add terms to the blocklist for this session. SB.Cities.register calls it with a pack's own `blocklist`,
     *  so pack writers never edit names.js. */
    block: function (terms) {
      var i, t;
      for (i = 0; i < (terms || []).length; i++) {
        t = normTerm(terms[i]);
        if (t && !blockExtra[t]) { blockExtra[t] = true; blockExtraCount++; }
      }
    },
    /** True when a name is on the blocklist: SB.Content.names.blocklist plus every term added with block().
     *  Compared case- and punctuation-insensitively with a leading "the" dropped. A plain term refuses exactly that
     *  name ('half mast' refuses "Half Mast", not "Half Mast Till Sunday"). A term written with a trailing star
     *  refuses every name that contains it as whole words ('hurricane party*' refuses "Hurricane Party Favors"):
     *  use the star for real organisations, venues, festivals and brands. The list is a filter and is never shown. */
    blocked: function (name) {
      var idx = blockIndex(), n = normName(name), padded, i;
      if (!n) return true;
      if (idx.exact[n]) return true;
      padded = ' ' + n + ' ';
      for (i = 0; i < idx.within.length; i++) if (padded.indexOf(idx.within[i]) >= 0) return true;
      return false;
    },
    /** The generator rule for every invented band, room, label, zine, agency and booking name.
     *  A name passes when it is not blocked and, counted without a leading "the":
     *    it has three or more words; or
     *    it has two words and holds a rare word (SB.Content.names.rare) or a local word (localWords: the city
     *    pack's street, water and hood banks), without being nothing but that local word.
     *  A one-word name never passes. The one exception to the counting: a whole name listed in
     *  SB.Content.names.cleared (two words or more, searched by itself and found clear) passes as it stands.
     *  Every generator calls this before a name enters a save.
     *  kind 'band' relaxes the word count for band names only (see below); every other kind of name keeps the rule. */
    nameOk: function (name, localWords, kind) {
      var n = normName(name), tokens, rare, cleared, padded, i, w;
      if (!n || SB.text.blocked(name)) return false;
      if (kind === 'band') {
        /* Band names only: any length passes, one word included. Still refused: a blocked name (above), a real
         * well-known band (SB.Content.bandNames.blockFamous) and a name that is nothing but a local word. */
        if (famousIndex()[n]) return false;
        for (i = 0; i < (localWords || []).length; i++) if (normName(localWords[i]) === n) return false;
        return true;
      }
      tokens = n.split(' ');
      if (tokens.length >= 3) return true;
      if (tokens.length < 2) return false;
      cleared = (SB.Content.names && SB.Content.names.cleared) || [];
      for (i = 0; i < cleared.length; i++) if (normName(cleared[i]) === n) return true;
      rare = (SB.Content.names && SB.Content.names.rare) || [];
      for (i = 0; i < rare.length; i++) if (tokens.indexOf(normName(rare[i])) >= 0) return true;
      padded = ' ' + n + ' ';
      for (i = 0; i < (localWords || []).length; i++) {
        w = normName(localWords[i]);
        if (w && w !== n && padded.indexOf(' ' + w + ' ') >= 0) return true;
      }
      return false;
    },
    /** Validate a template without rendering. Returns null when fine, else the error message. */
    lint: function (template) {
      try { parse(template); return null; } catch (e) { return e.message; }
    }
  };

})(typeof window !== 'undefined' ? window : globalThis);
