/* Scene Booker — engine/world/territory.js
 * SB.Territory: Word (the town's standing with touring bands, moved by every booker's shows), how a night spreads
 * through a band's circle, contacts in other towns, swaps, drive times, and tours for a local band.
 * Owner: E3b. Streams: TERRITORY (everything here), TEXT (lines).
 * Spec: design/spec/02-engine.md 4.5 and 7.17; 01-state 1 (town), 2.4 (Contact), 2.8 (Tour); mechanics 12.
 */
SB.module('Territory', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function week(state) { return (state.clock && typeof state.clock.week === 'number') ? state.clock.week : Math.floor(today(state) / 7); }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function rt(state) { return SB.rng.stream(state, E.STREAM.TERRITORY); }
  function rngT(state) { return SB.rng.stream(state, E.STREAM.TEXT); }
  function pack(state) { return SB.Cities.pack(state); }

  function rec(state, t, payload, text, showId) {
    var r = { t: t, day: today(state), half: half(state), showId: showId || null, text: text || '' }, k;
    for (k in payload) r[k] = payload[k];
    return r;
  }

  function line(state, path, slots) {
    if (SB.text.off || !SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, rngT(state));
  }

  function refuse(state, code) { return U.no(code, line(state, 'strings.refuse.' + code)); }

  function stageOf(v) {
    var cuts = C.TRUST_STAGES, i, n = 0;
    for (i = 0; i < cuts.length; i++) if (v >= cuts[i]) n = i + 1;
    return ['SOUR', 'STRANGER', 'WORKING', 'TRUSTED', 'ALLY'][n];
  }

  function personName(state, id) {
    var p = state.people && state.people[id];
    if (!p) return '';
    return p.nick || [p.first, p.last].filter(Boolean).join(' ');
  }

  function getContact(state, id, where) {
    var c = state.contacts && state.contacts[id];
    if (!c) SB.fail(where || 'Territory', 'unknown contact "' + id + '"');
    return c;
  }

  function getTour(state, id, where) {
    var t = state.tours && state.tours[id];
    if (!t) SB.fail(where || 'Territory', 'unknown tour "' + id + '"');
    return t;
  }

  function monthEnds(w) { return SB.time.month(w * 7 + 6) !== SB.time.month(w * 7 + 13); }

  function cityPoint(state) {
    var p = pack(state), ix = (p.derived && p.derived.index) || SB.Cities.entry(state.citySlug) || {};
    return { slug: state.citySlug, name: ix.name || '', state: ix.state || '', lat: ix.lat, lon: ix.lon, pop: ix.pop || 0 };
  }

  function town(state) {
    if (!state.town) state.town = {};
    var t = state.town;
    if (typeof t.word !== 'number') t.word = pack(state).scene.wordStart || 22;
    if (typeof t.wordBase !== 'number') t.wordBase = t.word;
    if (!Array.isArray(t.wordLine)) t.wordLine = [];
    return t;
  }

  /* ------------------------------------------------------------------ */
  /* Word                                                                */
  /* ------------------------------------------------------------------ */

  function tier(value) {
    var n = 0, i, cuts = C.WORD.tiers;
    if (typeof value !== 'number' || !isFinite(value)) SB.fail('Territory.tier', 'value must be a number');
    for (i = 0; i < cuts.length; i++) if (value >= cuts[i]) n = i + 1;
    return E.WORD_TIERS[n];
  }

  function word(state) {
    var t = town(state), tr = tier(t.word);
    return { value: U.round(t.word, 1), base: U.round(t.wordBase, 1), tier: tr,
             text: line(state, 'strings.wordTier.' + tr + '.text', { city: cityPoint(state).name }) };
  }

  function adjustWord(state, d, k) {
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('Territory.adjustWord', 'd is not a number');
    var t = town(state), from = t.word, to = U.round(U.clamp(from + d, 0, 100), 2);
    t.word = to;
    var tf = tier(from), tt = tier(to);
    return rec(state, 'WORD', { from: from, to: to, tier: tt, tierChanged: tf !== tt, k: k || null },
               tf !== tt ? line(state, 'strings.wordTier.' + tt + '.text', { city: cityPoint(state).name }) : '');
  }

  /* ------------------------------------------------------------------ */
  /* contacts                                                            */
  /* ------------------------------------------------------------------ */

  function contacts(state) {
    return Object.keys(state.contacts || {}).map(function (id) {
      var c = state.contacts[id], s = typeof c.strength === 'number' ? c.strength : 0;
      return { id: id, name: personName(state, id), place: U.copy(c.place), strength: s, stage: stageOf(s),
               owes: U.copy(c.owes || []), youOwe: U.copy(c.youOwe || []) };
    });
  }

  function adjustContact(state, id, d, k) {
    var c = getContact(state, id, 'Territory.adjustContact');
    if (typeof d !== 'number' || !isFinite(d)) SB.fail('Territory.adjustContact', 'd is not a number');
    var from = typeof c.strength === 'number' ? c.strength : 0, to = U.round(U.clamp(from + d, 0, 100), 2);
    c.strength = to;
    return rec(state, 'TRUST', { id: id, name: personName(state, id), d: U.round(to - from, 2), k: k, value: to,
                                 stage: stageOf(to), stageChanged: stageOf(from) !== stageOf(to) }, '');
  }

  function contactByPlace(state, name, st) {
    var found = null;
    Object.keys(state.contacts || {}).forEach(function (id) {
      var c = state.contacts[id];
      if (!found && c.place && c.place.name === name && (!st || !c.place.state || c.place.state === st)) found = id;
    });
    return found;
  }

  /* ------------------------------------------------------------------ */
  /* drive times                                                         */
  /* ------------------------------------------------------------------ */

  function zoneOf(state, id) {
    var p = pack(state), zs = p.zones || [], i;
    for (i = 0; i < zs.length; i++) if (zs[i].id === id) return zs[i];
    return null;
  }

  /* A zone's map point: its slug's coordinates, else placed by bearing and minutes from downtown. */
  function zonePoint(state, z) {
    var here = cityPoint(state);
    if (z.id === 'city' || !z.minutes) return { lat: here.lat, lon: here.lon };
    if (z.slug) { var e = SB.Cities.entry(z.slug); if (e) return { lat: e.lat, lon: e.lon }; }
    var miles = z.minutes / C.DRIVE_FACTOR, b = (z.bearing || 0) * Math.PI / 180;
    var dLat = miles * Math.cos(b) / 69, dLon = miles * Math.sin(b) / (69 * Math.cos((here.lat || 0) * Math.PI / 180) || 1);
    return { lat: here.lat + dLat, lon: here.lon + dLon };
  }

  function pointOf(state, x, where) {
    if (x && typeof x === 'object' && typeof x.lat === 'number' && typeof x.lon === 'number') return { lat: x.lat, lon: x.lon };
    if (typeof x === 'string') {
      var z = zoneOf(state, x);
      if (z) return zonePoint(state, z);
      if (x === state.citySlug) { var h = cityPoint(state); return { lat: h.lat, lon: h.lon }; }
      var e = SB.Cities.entry(x);
      if (e) return { lat: e.lat, lon: e.lon };
    }
    SB.fail(where || 'Territory.drive', 'not a zone, city slug or { lat, lon }: ' + JSON.stringify(x));
  }

  /* Pack minutes for the city's own zones, else SB.geo.drive. */
  function drive(state, a, b) {
    var za = typeof a === 'string' ? zoneOf(state, a) : null, zb = typeof b === 'string' ? zoneOf(state, b) : null;
    if (typeof a === 'string' && a === state.citySlug) za = zoneOf(state, 'city');
    if (typeof b === 'string' && b === state.citySlug) zb = zoneOf(state, 'city');
    if (za && zb) {
      if (za.id === zb.id) return 0;
      if (za.id === 'city') return zb.minutes || 0;
      if (zb.id === 'city') return za.minutes || 0;
      var m1 = za.minutes || 0, m2 = zb.minutes || 0, dd = ((za.bearing || 0) - (zb.bearing || 0)) * Math.PI / 180;
      return Math.round(Math.sqrt(Math.max(0, m1 * m1 + m2 * m2 - 2 * m1 * m2 * Math.cos(dd))));
    }
    return SB.geo.drive(pointOf(state, a), pointOf(state, b));
  }

  /* ------------------------------------------------------------------ */
  /* answerAsk: CONTACT_VET, CONTACT_SHARE, TOUR_DATE                    */
  /* ------------------------------------------------------------------ */

  function silentFor(c) {
    if (!c) return C.TOUR.coldSilent;
    return (c.strength || 0) >= C.WAIT.CONTACT.knownAt ? C.WAIT.CONTACT.silentKnown : C.WAIT.CONTACT.silentCold;
  }

  function answerAsk(state, ask, phase) {
    if (!ask || typeof ask !== 'object') SB.fail('Territory.answerAsk', 'no ask');
    if (phase !== 'SEND' && phase !== 'DELIVER') SB.fail('Territory.answerAsk', 'phase must be SEND or DELIVER');
    if (ask.kind !== 'CONTACT_VET' && ask.kind !== 'CONTACT_SHARE' && ask.kind !== 'TOUR_DATE') SB.fail('Territory.answerAsk', 'not a territory ask: ' + ask.kind);
    var c = ask.toId ? getContact(state, ask.toId, 'Territory.answerAsk') : null;
    if (!c && ask.kind !== 'TOUR_DATE') SB.fail('Territory.answerAsk', ask.kind + ' needs a contact');
    return phase === 'SEND' ? send(state, ask, c) : deliver(state, ask, c);
  }

  function send(state, ask, c) {
    var r = rt(state), p = ask.payload || {}, w = C.WAIT.CONTACT, will = 'YES';
    var days = p.inPerson ? 0 : r.range(w.days[0], w.days[1]);
    if (c) c.asked = (c.asked || 0) + 1;
    if (ask.kind === 'CONTACT_SHARE') will = r.chance(U.clamp(0.2 + (c.strength || 0) / 100, 0, 0.95)) ? 'YES' : 'NO';
    if (ask.kind === 'TOUR_DATE') {
      if (c) will = r.chance(U.clamp(0.3 + 0.6 * (c.strength || 0) / 100, 0, 0.95)) ? 'YES' : 'NO';
      else will = r.chance(C.TOUR.coldYes) ? 'YES' : 'NO';
      if (p.tourId && state.tours && state.tours[p.tourId]) {
        var st = stopOf(state.tours[p.tourId], p.stop);
        if (st) st.status = 'SENT';
      }
    }
    if (!p.inPerson && r.chance(ask.kind === 'TOUR_DATE' && !c ? C.TOUR.coldSilent : silentFor(c))) will = 'SILENT';
    return { days: days, will: will, counter: null };
  }

  function stopOf(tour, n) {
    var i;
    for (i = 0; i < (tour.stops || []).length; i++) if (tour.stops[i].n === n) return tour.stops[i];
    return null;
  }

  /* The pester and first-ask changes of mechanics 12.3, applied when the answer comes. */
  function askedRecords(state, ask, c, records) {
    if (!c) return;
    if (c.firstAsked === undefined || c.firstAsked === null) {
      c.firstAsked = week(state);
      records.push(adjustContact(state, ask.toId, C.CONTACT.firstAsk, 'FIRST_ASK'));
    } else if ((c.asked || 0) > C.CONTACT.pesterPerMonth) {
      records.push(adjustContact(state, ask.toId, C.CONTACT.pester, 'PESTER'));
    }
  }

  /* What a booker elsewhere says about a band: whether they had them, how they drew and behaved. */
  function vetAnswer(state, c, req) {
    var b = req && req.bandId ? state.bands && state.bands[req.bandId] : null, h = (b && b.hid) || {};
    var had = false;
    if (b && c.place && typeof c.place.lat === 'number') {
      if (b.place && typeof b.place.lat === 'number' && SB.geo.drive(b.place, c.place) <= C.TOUR.legMaxMinutes) had = true;
      (req.route && req.route.stops || []).forEach(function (s) { if (s.name === c.place.name) had = true; });
    }
    if (!had) return { grade: 'unknown', n: null };
    var grade = ((h.rel || 0) < 0.4 || (h.honest || 0) < 0.35) ? 'bad' : (((h.rel || 0) >= 0.7 && (h.honest || 0) >= 0.6) ? 'good' : 'mixed');
    var n = Math.max(1, Math.round(((b.followers || 300) * C.AWAY_RATE * (h.conversion || 1)) * 1.3));
    return { grade: grade, n: n };
  }

  function deliver(state, ask, c) {
    var p = ask.payload || {}, records = [], will = (ask.hid && ask.hid.will) || 'NO', slots, res;
    askedRecords(state, ask, c, records);
    if (ask.kind === 'CONTACT_VET') {
      var req = p.requestId && state.requests ? state.requests[p.requestId] : null;
      var a = vetAnswer(state, c, req), b = req && req.bandId && state.bands ? state.bands[req.bandId] : null;
      slots = { booker: personName(state, ask.toId), band: b ? b.name : '', home: b && b.place ? b.place.name : '', n: a.n || '',
                town: c.place ? c.place.name : '' };
      var key = { good: 'VET_GOOD', mixed: 'VET_MIXED', bad: 'VET_BAD', unknown: 'VET_UNKNOWN' }[a.grade];
      var text = line(state, 'people.contact.' + key, slots) || line(state, 'requests.vet.ASK_BOOKER.' + a.grade, slots);
      res = { status: 'YES', text: text, counter: null, records: records, grade: a.grade, n: a.n, contactId: ask.toId };
      return res;
    }
    if (ask.kind === 'CONTACT_SHARE') {
      var show = state.shows && state.shows[p.showId];
      slots = { booker: personName(state, ask.toId), town: c.place ? c.place.name : '' };
      if (will === 'YES' && show && (show.status === 'DRAFT' || show.status === 'CONFIRMED')) {
        return { status: 'YES', text: line(state, 'people.contact.SHARE_YES', slots), counter: null, records: records };
      }
      return { status: 'NO', text: '', counter: null, records: records };
    }
    /* TOUR_DATE */
    var tour = p.tourId && state.tours ? state.tours[p.tourId] : null, stop = tour ? stopOf(tour, p.stop) : null;
    var bd = tour && state.bands ? state.bands[tour.bandId] : null;
    slots = { booker: c ? personName(state, ask.toId) : '', band: bd ? bd.name : '', town: stop && stop.place ? stop.place.name : '',
              date: stop ? SB.time.date(stop.day).d : '', city: cityPoint(state).name };
    if (!tour || !stop || (tour.status !== 'PLANNING' && tour.status !== 'ASKING' && tour.status !== 'READY')) {
      return { status: 'NO', text: '', counter: null, records: records };
    }
    stop.askId = ask.id || stop.askId || null;
    if (will === 'YES') {
      stop.status = 'YES';
      return { status: 'YES', text: c ? line(state, 'people.contact.TOUR_YES', slots) : '', counter: null, records: records };
    }
    if (will === 'SILENT') { stop.status = 'SILENT'; return { status: 'SILENT', text: '', counter: null, records: records }; }
    stop.status = 'NO';
    return { status: 'NO', text: c ? line(state, 'people.contact.TOUR_NO', slots) : '', counter: null, records: records };
  }

  /* ------------------------------------------------------------------ */
  /* after a night: Word, circles, the bookers either side, swaps owed   */
  /* ------------------------------------------------------------------ */

  function bandTier(state, b) {
    if (typeof b.tierPublic === 'number') return b.tierPublic;
    return SB.Bands.tier(state, b, 'city') || 1;
  }

  function afterShow(state, show, hostScores, byPlayer) {
    if (!show) SB.fail('Territory.afterShow', 'no show');
    hostScores = hostScores || {};
    var records = [], dWord = 0, w = week(state), anyTouring = false;
    var req = show.requestId && state.requests ? state.requests[show.requestId] : null;
    Object.keys(hostScores).forEach(function (key) {
      var hs = hostScores[key];
      if (typeof hs !== 'number' || !isFinite(hs)) return;
      if (key === '_touring') {                        // another booker's touring headliner (Rooms.weekly)
        dWord += C.WORD_K * hs * (1 + C.WORD.perTier * (show.tier || 1));
        return;
      }
      var b = state.bands && state.bands[key];
      if (!b || b.local) return;                       // Word is the town's standing with touring bands
      anyTouring = true;
      dWord += C.WORD_K * hs * (1 + C.WORD.perTier * bandTier(state, b));
      if (!byPlayer) return;
      /* the circle (7.17) */
      if (hs > C.HOST_SCORE.wellAbove || hs < C.HOST_SCORE.badBelow) {
        var good = hs > C.HOST_SCORE.wellAbove, until = w + C.CIRCLE_SPREAD.weeks;
        /* SPEC?: band.spread belongs to the band's shape (E3a) but 7.17 makes Territory the one that sets it. */
        b.spread = { until: until, good: good };
        if (!good) {
          (b.circle || []).forEach(function (cid) {
            var cb = state.bands[cid];
            if (cb && !cb.local && !(cb.spread && cb.spread.good === false && cb.spread.until >= until)) cb.spread = { until: until, good: false };
          });
        }
        if (req && req.route) {
          [req.route.prev, req.route.next].forEach(function (leg) {
            if (!leg || !leg.name) return;
            var cid2 = contactByPlace(state, leg.name, leg.state);
            if (cid2) records.push(adjustContact(state, cid2, good ? C.CIRCLE_SPREAD.contactGood : C.CIRCLE_SPREAD.contactBad, good ? 'SPREAD_GOOD' : 'SPREAD_BAD'));
          });
        }
      }
      /* a band a contact sent, or a swap: hosting it builds the contact; a swap hosted well is owed back */
      if (req && hs >= 0) {
        var sender = (req.fromId && state.contacts && state.contacts[req.fromId]) ? req.fromId
                   : ((req.referrerId && state.contacts && state.contacts[req.referrerId]) ? req.referrerId : null);
        if (sender) records.push(adjustContact(state, sender, C.CONTACT.hosted, 'HOSTED'));
        if (req.kind === 'SWAP' && req.fromId && state.contacts && state.contacts[req.fromId]) {
          var c = state.contacts[req.fromId];
          c.owes = c.owes || [];
          c.owes.push({ k: 'SWAP_DATE', bandId: null, dueWeek: w + C.CONTACT.swapOwedWeeks });
        }
      }
    });
    if (dWord !== 0 || anyTouring) records.unshift(adjustWord(state, U.round(dWord, 3), byPlayer ? 'HOSTED' : 'OTHER_BOOKER'));
    return records;
  }

  /* ------------------------------------------------------------------ */
  /* tours for a local band (7.17)                                       */
  /* ------------------------------------------------------------------ */

  function localBand(state, bandId, where) {
    var b = state.bands && state.bands[bandId];
    if (!b) SB.fail(where, 'unknown band "' + bandId + '"');
    return b;
  }

  function onTour(state, bandId) {
    return Object.keys(state.tours || {}).some(function (id) {
      var t = state.tours[id];
      return t.bandId === bandId && t.status !== 'DONE' && t.status !== 'DROPPED';
    });
  }

  function reach() { return C.TOUR.legMaxMinutes * 2; }

  function contactsInReach(state) {
    var here = cityPoint(state);
    return Object.keys(state.contacts || {}).filter(function (id) {
      var c = state.contacts[id];
      return c.place && typeof c.place.lat === 'number' && SB.geo.drive(here, c.place) <= reach();
    });
  }

  function candidateOk(state, bandId) {
    var b = localBand(state, bandId, 'Territory.tourCandidates');
    if (!b.local) return refuse(state, 'INVALID');
    if (((state.player && state.player.stage) || 1) < C.STAGE_TOURS) return refuse(state, 'STAGE');
    if (b.stage === 'ENDED' || (typeof b.endedWeek === 'number')) return refuse(state, 'INVALID');
    if (typeof b.outUntil === 'number' && b.outUntil > today(state)) return refuse(state, 'BUSY');
    if (onTour(state, bandId)) return refuse(state, 'ALREADY');
    if ((SB.Bands.tier(state, b, 'city') || 0) < C.TOUR.tier) return refuse(state, 'NEEDS');
    var t = SB.Bands.trust(state, bandId);
    if (!t || t.value < C.TOUR.trust) return refuse(state, 'RELATIONSHIP');
    if (contactsInReach(state).length < C.TOUR.contacts) return refuse(state, 'NEEDS');
    return U.yes();
  }

  function tourCandidates(state) {
    return (SB.Bands.list(state, { local: true, active: true }) || []).map(function (id) {
      return { bandId: id, ok: candidateOk(state, id) };
    });
  }

  function tourStops(state, bandId) {
    localBand(state, bandId, 'Territory.tourStops');
    var here = cityPoint(state), out = [], seen = {};
    Object.keys(state.contacts || {}).forEach(function (id) {
      var c = state.contacts[id];
      if (!c.place || typeof c.place.lat !== 'number') return;
      var m = SB.geo.drive(here, c.place);
      if (m > reach()) return;
      seen[c.place.name + '|' + c.place.state] = true;
      out.push({ place: U.copy(c.place), contactId: id, minutesFromHome: m, strength: c.strength || 0 });
    });
    (SB.CityIndex || []).forEach(function (e) {
      if (!e || e.slug === state.citySlug || typeof e.lat !== 'number' || seen[e.name + '|' + e.state]) return;
      var m = SB.geo.drive(here, e);
      if (m < 45 || m > reach()) return;
      seen[e.name + '|' + e.state] = true;
      out.push({ place: { slug: e.slug, name: e.name, state: e.state, lat: e.lat, lon: e.lon }, contactId: null, minutesFromHome: m, strength: 0 });
    });
    out.sort(function (a, b) { return (b.contactId ? 1 : 0) - (a.contactId ? 1 : 0) || a.minutesFromHome - b.minutesFromHome; });
    return out.slice(0, 16);
  }

  function startTour(state, bandId, stops, startDay) {
    if (state.clock && state.clock.phase === 'OVER') return refuse(state, 'OVER');
    var ok = candidateOk(state, bandId);
    if (!ok.ok) return ok;
    if (!Array.isArray(stops)) SB.fail('Territory.startTour', 'stops must be an array');
    if (typeof startDay !== 'number') SB.fail('Territory.startTour', 'startDay must be a number');
    if (stops.length < C.TOUR.dates[0]) return refuse(state, 'NEEDS');
    if (stops.length > C.TOUR.dates[1]) return refuse(state, 'TOO_MANY');
    if (startDay - today(state) < C.TOUR.leadWeeks[0] * 7) return refuse(state, 'WINDOW');
    var here = cityPoint(state), prev = here, i, s, legs = [];
    for (i = 0; i < stops.length; i++) {
      s = stops[i] && stops[i].place ? stops[i].place : stops[i];
      if (!s || typeof s.lat !== 'number' || typeof s.lon !== 'number') SB.fail('Territory.startTour', 'stop ' + i + ' has no place');
      var m = SB.geo.drive(prev, s);
      if (m > C.TOUR.legMaxMinutes) return refuse(state, 'INVALID');
      legs.push(m);
      prev = s;
    }
    var id = U.newId(state, 't');
    var tour = {
      id: id, bandId: bandId, status: 'PLANNING', startDay: startDay,
      stops: stops.map(function (x, n) {
        var place = x.place ? x.place : x;
        var cid = x.contactId !== undefined ? x.contactId : contactByPlace(state, place.name, place.state);
        if (cid && (!state.contacts || !state.contacts[cid])) cid = null;
        return { n: n, place: { slug: place.slug || null, name: place.name, state: place.state, lat: place.lat, lon: place.lon },
                 day: startDay + n, contactId: cid || null, askId: null, status: null, result: null };
      }),
      jobs: [], startedWeek: week(state), doneWeek: null
    };
    if (!state.tours) state.tours = {};
    state.tours[id] = tour;
    ['TOUR_ROUTE', 'TOUR_ADVANCE'].forEach(function (type) {
      var res = SB.Week.addJob(state, type, { tourId: id });
      if (res && res.ok && res.jobId) tour.jobs.push(res.jobId);
    });
    return U.yes({ tourId: id });
  }

  function tour(state, tourId) {
    var t = getTour(state, tourId, 'Territory.tour'), out = U.copy(t), here = cityPoint(state), prev = here;
    var b = state.bands && state.bands[t.bandId];
    out.bandName = b ? b.name : '';
    out.legs = (t.stops || []).map(function (s) {
      var m = s.place && typeof s.place.lat === 'number' ? SB.geo.drive(prev, s.place) : 0;
      if (s.place && typeof s.place.lat === 'number') prev = s.place;
      return { minutes: m };
    });
    delete out.echo;
    return out;
  }

  /* Index-city scale for a place: its scene and its own Word, from its population (04-cities 4.2). */
  function placeScale(place) {
    var e = place && place.slug ? SB.Cities.entry(place.slug) : null, pop = (e && e.pop) || (place && place.pop) || 150000;
    var CT = C.CITY, t = (Math.log(pop) / Math.LN10 - Math.log(CT.REF_SMALL) / Math.LN10) /
                         (Math.log(CT.REF_LARGE) / Math.LN10 - Math.log(CT.REF_SMALL) / Math.LN10);
    t = U.clamp(t, CT.T_MIN, CT.T_MAX);
    var scene = CT.SCENE_SIZE.k * Math.pow(pop, CT.SCENE_SIZE.exp);
    var w = U.clamp(CT.SCALED.wordStart[0] + (CT.SCALED.wordStart[1] - CT.SCALED.wordStart[0]) * t, 0, 100);
    return { scene: scene, word: w };
  }

  /* One date of a tour, in one line from a light model (7.17). */
  function playDate(state, t, s, r) {
    var b = state.bands[t.bandId], h = (b && b.hid) || {}, sc = placeScale(s.place), A = C.AWAY;
    var c = s.contactId && state.contacts ? state.contacts[s.contactId] : null;
    var heads = ((b && b.followers) || 0) * C.AWAY_RATE * Math.pow(Math.max(1, sc.scene) / A.sceneRef, A.sceneExp) *
                (A.wordBase + A.wordSpan * sc.word / 100) * (h.conversion || 1);
    var dow = SB.time.dow(s.day);
    if (dow === 4 || dow === 5) heads *= 1.3;
    /* SPEC?: "x contact strength / 60, capped 1.3" would give a cold town nothing; a cold town counts as strength 30. */
    heads *= Math.min(1.3, ((c ? c.strength || 0 : 30)) / 60);
    if (t.unadvanced) heads *= 0.8;                    // SPEC?: a tour that was never advanced draws a fifth less
    heads = Math.max(0, Math.round(heads * r.range(0.8, 1.2)));
    var homeDraw = (h.draw && h.draw.city) || 0;
    var good = heads >= 15 || heads >= homeDraw * 0.3;
    s.result = { heads: heads, good: good, text: '' };
    return s.result;
  }

  function comeHome(state, t, records, r) {
    var b = state.bands[t.bandId], w = week(state), played = t.stops.filter(function (s) { return s.result; });
    var goodN = played.filter(function (s) { return s.result.good; }).length, badN = played.length - goodN;
    t.status = 'DONE';
    t.doneWeek = w;
    if (b) {
      var h = b.hid || (b.hid = {});
      /* SPEC?: 7.17 has the tour change live, home draw and cohesion, which live in the band's hidden shape (E3a);
       * Bands has no function for it, so Territory writes them here, as the spec directs. */
      h.live = U.clamp((h.live || 50) + r.int(C.TOUR.live[0], C.TOUR.live[1]), 20, 95);
      if (h.draw && typeof h.draw.city === 'number') h.draw.city = U.round(h.draw.city * C.TOUR.homeDraw, 2);
      if (badN >= C.TOUR.badNightsBreak) h.cohesion = U.clamp((h.cohesion || 0.5) - 0.1, 0, 1);
      else h.cohesion = U.clamp((h.cohesion || 0.5) + 0.05, 0, 1);
      if (typeof b.outUntil === 'number' && b.outUntil > today(state)) b.outUntil = null;
      records.push(SB.Bands.addTrust(state, t.bandId, 'TOUR_BOOKED', { showId: null, scale: 1 }));
    }
    played.forEach(function (s) {
      if (s.result.good && s.contactId && state.contacts && state.contacts[s.contactId]) {
        records.push(adjustContact(state, s.contactId, C.TOUR.contact, 'TOUR_HOSTED'));
      }
    });
    if (goodN) records.push(adjustWord(state, C.TOUR.wordPerGoodDate * goodN, 'TOUR'));
    t.echo = { until: w + 52, n: Math.round(played.length * C.TOUR.requestsPerDate) };
    /* SPEC?: zone.tourBoostUntil is the crowd's field (E3a); 7.17 makes the tour set it. */
    var p = pack(state);
    (p.zones || []).forEach(function (z) {
      var zs = state.zones && state.zones[z.id];
      if (!zs || z.id === 'city') return;
      var zp = zonePoint(state, z);
      var near = t.stops.some(function (s) { return s.place && typeof s.place.lat === 'number' && SB.geo.drive(zp, s.place) <= 90; });
      if (near) zs.tourBoostUntil = w + C.CHANNELS.TOUR_REACH_WEEKS;
    });
    if (SB.Legacy && typeof SB.Legacy.mark === 'function') {
      var m = SB.Legacy.mark(state, 'TOUR', { bandId: t.bandId });
      if (m) records.push(m);
    }
  }

  function toursWeekly(state, records) {
    var w = week(state), end = (w + 1) * 7, r = rt(state);
    Object.keys(state.tours || {}).forEach(function (id) {
      var t = state.tours[id];
      if (t.status === 'DONE' || t.status === 'DROPPED') return;
      var yes = t.stops.filter(function (s) { return s.status === 'YES'; });
      if (t.status !== 'OUT' && t.startDay < end) {
        if (!yes.length) { t.status = 'DROPPED'; t.doneWeek = w; return; }
        if (t.status !== 'READY') t.unadvanced = true;
        t.status = 'OUT';
        var b = state.bands[t.bandId];
        /* SPEC?: "while OUT the band cannot play at home" is kept with the band's own outUntil (E3a's field). */
        if (b) b.outUntil = Math.max(b.outUntil || 0, yes[yes.length - 1].day);
      }
      if (t.status !== 'OUT') return;
      yes.forEach(function (s) {
        if (s.result || s.day >= end) return;
        var res = playDate(state, t, s, r), bd = state.bands[t.bandId];
        /* SPEC?: 6.2 names the date's number `n`, which is the log's stamp (Week.log skips a record that has one); carried as `stop`. */
        records.push(rec(state, 'TOUR_DATE', { tourId: id, stop: s.n, place: U.copy(s.place), heads: res.heads, good: res.good },
                         line(state, 'people.band.AFTER_TOUR', { band: bd ? bd.name : '', town: s.place.name, n: res.heads })));
      });
      var last = yes.length ? yes[yes.length - 1].day : t.startDay;
      if (last < end && yes.every(function (s) { return s.result; })) comeHome(state, t, records, r);
    });
  }

  /* ------------------------------------------------------------------ */
  /* the week                                                            */
  /* ------------------------------------------------------------------ */

  function swapsWeekly(state, records) {
    var w = week(state), r = rt(state);
    Object.keys(state.contacts || {}).forEach(function (cid) {
      var c = state.contacts[cid];
      if (!c.owes || !c.owes.length) return;
      c.owes = c.owes.filter(function (o) {
        if (o.k !== 'SWAP_DATE') return true;
        var left = Math.max(1, o.dueWeek - w);
        if (!r.chance(1 / left)) return true;
        if ((c.strength || 0) < C.CONTACT.weakUnder && r.chance(C.CONTACT.swapFail)) {
          records.push(adjustContact(state, cid, C.CONTACT.swapFailCost, 'SWAP_FAILED'));
          var ft = line(state, 'people.contact.SWAP_FAILED', { booker: personName(state, cid), town: c.place ? c.place.name : '' });
          if (ft) {
            var fm = SB.Mail.post(state, { kind: 'CONTACT', fromId: cid, fromName: personName(state, cid), subject: '', body: ft, needs: false,
                                           refs: { requestId: null, showId: null, askId: null, bandId: null, offerId: null }, keep: false });
            records.push(rec(state, 'MESSAGE', { messageId: fm, kind: 'CONTACT', fromName: personName(state, cid), needs: false }, ''));
          }
          return false;
        }
        /* delivered: a date for the player's most trusted local band */
        var best = null, bestT = -1;
        (SB.Bands.list(state, { local: true, active: true }) || []).forEach(function (bid) {
          var tv = SB.Bands.trust(state, bid);
          if (tv && tv.value > bestT) { bestT = tv.value; best = bid; }
        });
        if (o.bandId && state.bands[o.bandId]) best = o.bandId;
        if (best) {
          var b = state.bands[best];
          /* SPEC?: 7.17 says the swap delivered raises the band's city draw by 3 percent; that number is in the
           * band's hidden shape (E3a) and is written here as the spec directs. */
          if (b.hid && b.hid.draw && typeof b.hid.draw.city === 'number') b.hid.draw.city = U.round(b.hid.draw.city * 1.03, 2);
          records.push(SB.Bands.addTrust(state, best, 'TOUR_BOOKED', { showId: null, scale: 0.5 }));
          records.push(rec(state, 'NEWS', { k: 'SWAP', refs: { bandId: best, personId: cid, roomId: null, genre: null, showId: null } },
                           line(state, 'people.news.SWAP', { band: b.name, town: c.place ? c.place.name : '', booker: personName(state, cid) })));
        }
        records.push(adjustContact(state, cid, C.CONTACT.swap, 'SWAP'));
        return false;
      });
    });
  }

  function monthly(state, records) {
    var t = town(state), w = week(state);
    /* Word drifts back toward the baseline; the baseline rises by half of any gain held for a year */
    var from = t.word;
    t.word = U.round(U.clamp(t.word + C.WORD.driftPerMonth * (t.wordBase - t.word), 0, 100), 2);
    t.wordLine.push({ week: w, word: t.word });
    var span = t.wordLine.filter(function (x) { return x.week > w - C.WORD.baselineWeeks; });
    if (span.length >= 12 && span[0].week <= w - C.WORD.baselineWeeks + 5) {
      var held = Math.min.apply(null, span.map(function (x) { return x.word; })) - t.wordBase;
      if (held > 0) t.wordBase = U.round(Math.min(100, t.wordBase + C.WORD.baselineShare * held / 13), 2);
    }
    if (t.wordLine.length > 120) t.wordLine.shift();
    if (Math.abs(t.word - from) >= 0.5) records.push(rec(state, 'WORD', { from: from, to: t.word, tier: tier(t.word), tierChanged: tier(from) !== tier(t.word), k: 'DRIFT' }, ''));
    /* contacts drift like trust, and their monthly ask counters reset */
    var D = C.TRUST_DRIFT;
    Object.keys(state.contacts || {}).forEach(function (cid) {
      var c = state.contacts[cid], s = c.strength || 0, step = D.perMonth * (s > D.slowAbove ? 0.5 : 1);
      if (s > D.toward) c.strength = U.round(Math.max(D.toward, s - step), 2);
      else if (s < D.toward) c.strength = U.round(Math.min(D.toward, s + step), 2);
      c.asked = 0;
    });
  }

  function weekly(state) {
    var records = [];
    town(state);
    toursWeekly(state, records);
    swapsWeekly(state, records);
    if (monthEnds(week(state))) monthly(state, records);
    return records;
  }

  return {
    word: word, tier: tier, adjustWord: adjustWord, contacts: contacts, adjustContact: adjustContact, answerAsk: answerAsk,
    drive: drive, tourCandidates: tourCandidates, tourStops: tourStops, startTour: startTour, tour: tour,
    afterShow: afterShow, weekly: weekly
  };
});
