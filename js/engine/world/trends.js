/* Scene Booker — js/engine/world/trends.js
 * SB.Trends: genre heat that arrives late from bigger cities, Par's knowledge of it, and the signs a careful
 * player meets. Stream TRENDS. Owner: E3a. Spec: design/spec/02-engine.md 4.5, 7.16; mechanics.md 11.
 * Heat, waves, pulses and parKnows live in state.truth; the signs the player has met in state.town.signs.
 */
SB.module('Trends', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;
  var GENRES = E.GENRES, T = C.TREND;
  var QUARTER = 13;

  function rt(state) { return SB.rng.stream(state, E.STREAM.TRENDS); }
  function week(state) { return state.clock ? state.clock.week : 0; }
  function today(state) { return state.clock ? state.clock.day : 0; }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function r3(x) { return Math.round(x * 1000) / 1000; }
  function checkGenre(genre, where) { if (!E.GENRE[genre]) SB.fail(where, 'unknown genre ' + genre); }

  function say(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, SB.rng.stream(state, E.STREAM.TEXT));
  }

  function heat(state, genre) {
    checkGenre(genre, 'Trends.heat');
    return (state.truth && state.truth.heat && state.truth.heat[genre]) || 0;
  }

  function known(state, genre) {
    checkGenre(genre, 'Trends.known');
    return !!(state.truth && state.truth.parKnows && state.truth.parKnows[genre]);
  }

  function heatKey(genre) {
    var K = SB.Notebook && SB.Notebook.key;
    return K && typeof K.heat === 'function' ? K.heat(genre) : 'heat:' + genre;
  }

  function estimate(state, genre) {
    return SB.Notebook && SB.Notebook.est ? SB.Notebook.est(state, heatKey(genre)) : null;
  }

  function arrow(state, genre) {
    checkGenre(genre, 'Trends.arrow');
    var e = estimate(state, genre);
    if (!e || (e.conf || 0) < E.CONF.HEARD) return null;
    if (e.lo > 0) return 'UP';
    if (e.hi < 0) return 'DOWN';
    return null;
  }

  function signs(state) {
    var all = (state.town && state.town.signs) || [];
    return GENRES.map(function (genre) {
      var mine = all.filter(function (s) { return s.genre === genre; }), e = estimate(state, genre);
      return {
        genre: genre,
        line: mine.map(function (s) { return { week: s.week, v: typeof s.v === 'number' ? s.v : 0, observed: true }; }),
        arrow: arrow(state, genre),
        conf: e ? (e.conf || 0) : 0,
        signs: mine.map(function (s) { return { k: s.k, text: s.text, week: s.week }; })
      };
    });
  }

  /* ------------------------------------------------------------------ */
  /* the weekly tick (7.16)                                              */
  /* ------------------------------------------------------------------ */

  function wave(state, genre, wk, lag) {
    var w = 0, t = state.truth;
    (t.waves[genre] || []).forEach(function (c) { w += c.amp * Math.sin(2 * Math.PI * (wk - lag) / c.period + c.phase); });
    (t.pulses || []).forEach(function (p) {
      if (p.genre !== genre) return;
      var ago = (wk - lag) - p.week;
      if (ago >= 0 && ago < T.pulseFadeWeeks) w += T.pulse * (1 - ago / T.pulseFadeWeeks);
    });
    return w;
  }

  function showGenres(state, s) {
    var out = [];
    ((s.bill && s.bill.slots) || []).forEach(function (sl) {
      var b = state.bands[sl.bandId];
      if (b && out.indexOf(b.genre) < 0) out.push(b.genre);
    });
    return out;
  }

  /** Shows in town (the city zone, anyone's) in the last `weeks` weeks, by genre. */
  function showsByGenre(state, weeks, onlyOthers) {
    var from = today(state) - weeks * 7, to = today(state) + 7, n = {};
    GENRES.forEach(function (g) { n[g] = 0; });
    if (!onlyOthers) {
      Object.keys(state.shows || {}).forEach(function (sid) {
        var s = state.shows[sid];
        if (s.status !== 'PLAYED' || s.zoneId !== 'city' || s.day < from || s.day >= to) return;
        showGenres(state, s).forEach(function (g) { n[g]++; });
      });
    }
    (state.otherShows || []).forEach(function (o) {
      if (o.zoneId !== 'city' || o.day < from || o.day >= to || o.status === 'HELD') return;
      (o.genres || []).forEach(function (g) { if (n[g] !== undefined) n[g]++; });
    });
    return n;
  }

  function tierFourBands(state) {
    var out = [];
    Object.keys(state.bands || {}).forEach(function (id) {
      var b = state.bands[id];
      if (b.stage === 'ENDED') return;
      var t4 = b.local ? (SB.Bands && SB.Bands.tier ? SB.Bands.tier(state, b, 'city') >= 4 : b.stage === 'BROKE_OUT')
                       : ((b.hid && b.hid.tier) || b.tierPublic || 0) >= 4;
      if (t4) out.push(b);
    });
    return out;
  }

  function lastSign(state, genre, k) {
    var last = null;
    ((state.town && state.town.signs) || []).forEach(function (s) {
      if (s.genre === genre && s.k === k && (last === null || s.week > last)) last = s.week;
    });
    return last;
  }

  function plain(genre) {
    var g = SB.Content.strings && SB.Content.strings.genre && SB.Content.strings.genre[genre];
    return g && g.plain ? g.plain : genre;
  }

  function sign(state, r, genre, k, out) {
    var wk = week(state), last = lastSign(state, genre, k);
    if (last !== null && wk - last < QUARTER) return;
    var descr = SB.Content.names && SB.Content.names.trend && SB.Content.names.trend[genre];
    var bk = Object.keys(state.bookers || {}).filter(function (id) {
      return (state.bookers[id].genres || []).indexOf(genre) >= 0;
    });
    var bigger = Object.keys(state.contacts || {}).filter(function (id) { return state.contacts[id].bigger; });
    var bp = bk.length ? state.people[bk[0]] : null, cp = bigger.length ? state.contacts[r.pick(bigger)] : null;
    var slots = { genre: plain(genre), trend: descr && descr.length ? r.pick(descr) : plain(genre),
                  booker: bp ? bp.first + (typeof bp.last === 'string' ? ' ' + bp.last : '') : '',
                  town: cp && cp.place ? cp.place.name : '' };
    if (k === 'BOOKERS' && !slots.booker) slots.booker = 'Somebody';
    var text = say(state, 'people.news.TREND_SIGN.' + k, slots);
    var learned = null;
    if (SB.Notebook && SB.Notebook.narrow) learned = SB.Notebook.narrow(state, heatKey(genre), C.HUNCH, 'SCOUT');
    var e = estimate(state, genre);
    state.town.signs.push({ genre: genre, k: k, week: wk, text: text, v: e ? r3((e.lo + e.hi) / 2) : r3(state.truth.heat[genre]) });
    out.push({ t: 'NEWS', day: today(state), half: half(state), showId: null, text: text, k: 'TREND_SIGN',
               refs: { genre: genre, sign: k } });
    if (learned) out.push({ t: 'NOTE', day: today(state), half: half(state), showId: null, text: learned.text || '', learned: learned });
  }

  function weekly(state) {
    if (!state.truth || !state.truth.heat) SB.fail('Trends.weekly', 'state has no truth (WorldGen.build first)');
    var out = [], r = rt(state), t = state.truth, wk = week(state) + 1, P = SB.Cities.pack(state);
    var lag = (P.scene && P.scene.trendLag) || 0, glutAt = (P.scene && P.scene.glutAt) || 4;
    if (!t.pulses) t.pulses = [];

    /* a pulse when a band of the genre reaches tier 4 anywhere (once per band) */
    tierFourBands(state).forEach(function (b) {
      if (t.pulses.some(function (p) { return p.bandId === b.id; })) return;
      t.pulses.push({ genre: b.genre, week: wk, bandId: b.id });
    });
    t.pulses = t.pulses.filter(function (p) { return wk - lag - p.week < T.pulseFadeWeeks || !!p.bandId; });

    var glut = showsByGenre(state, T.glutWeeks, false);
    var buzz = {};
    GENRES.forEach(function (g) { buzz[g] = 0; });
    Object.keys(state.bands || {}).forEach(function (id) {
      var b = state.bands[id];
      if (b.local && b.stage !== 'ENDED' && b.stage !== 'ON_ICE') buzz[b.genre] += (b.hid && b.hid.buzz) || 0;
    });

    GENRES.forEach(function (g) {
      var h = t.heat[g] || 0, w = wave(state, g, wk, lag);
      h += T.follow * (w - h) + T.localBuzz * U.clamp(buzz[g], -T.localBuzzClamp, T.localBuzzClamp)
           - T.glut * Math.max(0, glut[g] - glutAt);
      h = r3(U.clamp(h, -1, 1));
      t.heat[g] = h;
      t.heatLine[g] = (t.heatLine[g] || []).concat([h]).slice(-26);
      var run = t.heatLine[g].slice(-T.parKnowsWeeks);
      t.parKnows[g] = run.length >= T.parKnowsWeeks && run.every(function (x) { return x > T.parKnowsAt; });
    });

    /* signs (7.16): two new bands in a quarter; requests above twice the usual share; other bookers' shows in it;
     * a contact in a bigger city when the national (unlagged) wave passes 0.4. A kid's TREND comment and an opener
     * out-posting a headliner come from a show's feedback, not from this tick. */
    var formed = {}, reqs = {}, reqTotal = 0, from8 = today(state) - 8 * 7;
    GENRES.forEach(function (g) { formed[g] = 0; reqs[g] = 0; });
    Object.keys(state.bands || {}).forEach(function (id) {
      var b = state.bands[id];
      if (!b.local) return;
      (b.history || []).forEach(function (h) { if (h.k === 'FORMED' && h.week >= 0 && h.week > wk - 1 - QUARTER) formed[b.genre]++; });
    });
    Object.keys(state.requests || {}).forEach(function (qid) {
      var q = state.requests[qid], b = state.bands[q.bandId];
      if (!b || q.day < from8) return;
      reqs[b.genre]++; reqTotal++;
    });
    var others = showsByGenre(state, 8, true);
    var hasBigger = Object.keys(state.contacts || {}).some(function (cid) { return state.contacts[cid].bigger; });
    GENRES.forEach(function (g) {
      if (formed[g] >= 2) sign(state, r, g, 'NEW_BANDS', out);
      var usual = U.mean(P.scene.genreShares.map(function (row) { return row[E.GENRE_INDEX[g]]; }));
      if (reqTotal >= 6 && reqs[g] >= 3 && reqs[g] / reqTotal > 2 * usual) sign(state, r, g, 'REQUESTS', out);
      if (others[g] >= 3 && t.heat[g] > 0.2) sign(state, r, g, 'BOOKERS', out);
      if (hasBigger) {
        var now = wave(state, g, wk, 0), before = wave(state, g, wk - 1, 0);
        if (now > 0.4 && before <= 0.4) sign(state, r, g, 'CONTACT', out);
      }
    });
    return out;
  }

  return { heat: heat, known: known, arrow: arrow, signs: signs, weekly: weekly,
           /* extra: the national wave for a genre, unlagged (lag 0) or as this town hears it */
           wave: function (state, genre, lagged) {
             var P = SB.Cities.pack(state);
             return wave(state, genre, week(state), lagged ? ((P.scene && P.scene.trendLag) || 0) : 0);
           } };
});
