/* Scene Booker — engine/world/requests.js
 * SB.Requests: touring bands writing (cold asks, referrals, returning bands, swaps, local asks, rescues), the request
 * as a window and a route with drive times, vetting, the TERMS negotiation, passing, lapsing and the race.
 * Owner: E3b. Streams: REQUESTS (everything here), TEXT (lines).
 * Spec: design/spec/02-engine.md 4.4 and 7.15; 01-state 2.5; 03-content 5; mechanics 4.
 *
 * One export beyond the manifest: create(state, spec) -> { requestId, records }. The scripted opening
 * (SB.Director.opening, 03-content 10) and the MESSAGE effect with `localAsk` (SB.Effects, 03-content 8.4) both need
 * to make a request, and the manifest gives them no other way. spec, every field optional except kind:
 *   { kind: REQ_KIND, template: REQ_TEMPLATE, day, bandId, fromId, referrerId, localAsk: LOCAL_ASK, genre, tier,
 *     home: place, lead: [lo, hi] days, dates: [day], ask: 'DOOR' | 'GUARANTEE', from: 'PEER' | 'SWAP_CIRCLE',
 *     calendar: 'ANY', roomId (an owner's empty night) }
 */
SB.module('Requests', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util, Q = C.REQUESTS;

  var OPEN = { NEW: true, REPLIED: true, NEGOTIATING: true };
  var KEEP_CLOSED_DAYS = 26 * 7;                     // a closed request with no show is dropped 26 weeks after it closed
  var LOCAL_FLAG = { RELEASE: 'release', BENEFIT: 'benefit', FIRST_SHOW: 'firstShow', EMPTY_NIGHT: 'emptyNight',
                     LAST_SHOW: 'lastShow', GOING_AWAY: 'goingAway' };
  var GOOD_TELLS = ['PRO', 'HONEST', 'PROMOTES', 'PLEASANT'];
  var BAD_TELLS = ['MASS', 'SLOPPY', 'OVERSELL'];

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function week(state) { return (state.clock && typeof state.clock.week === 'number') ? state.clock.week : Math.floor(today(state) / 7); }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function rq(state) { return SB.rng.stream(state, E.STREAM.REQUESTS); }
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

  function getReq(state, id, where) {
    var q = state.requests && state.requests[id];
    if (!q) SB.fail(where || 'Requests', 'unknown request "' + id + '"');
    return q;
  }

  function personName(state, id) {
    var p = state.people && state.people[id];
    if (!p) return '';
    return p.nick || [p.first, p.last].filter(Boolean).join(' ');
  }
  function firstName(state, id) { var p = state.people && state.people[id]; return p ? (p.nick || p.first || '') : ''; }

  function round10(x) { return Math.max(0, Math.round(x / 10) * 10); }

  function poisson(r, lambda) {
    if (!(lambda > 0)) return 0;
    var L = Math.exp(-Math.min(lambda, 30)), k = 0, p = 1;
    do { k++; p *= r.next(); } while (p > L && k < 50);
    return k - 1;
  }

  function cityPoint(state) {
    var p = pack(state), ix = (p.derived && p.derived.index) || SB.Cities.entry(state.citySlug) || {};
    return { slug: state.citySlug, name: ix.name || '', state: ix.state || '', lat: ix.lat, lon: ix.lon, pop: ix.pop || 0 };
  }

  function word(state) { return (state.town && typeof state.town.word === 'number') ? state.town.word : 22; }

  /* Real places a tour can come from or pass through: the index and the pack's points. Never the player's city. */
  function places(state) {
    var here = cityPoint(state), out = [], seen = {};
    function add(e, slug) {
      if (!e || typeof e.lat !== 'number' || typeof e.lon !== 'number') return;
      var key = (e.name || '') + '|' + (e.state || '');
      if (seen[key] || (e.name === here.name && e.state === here.state)) return;
      seen[key] = true;
      out.push({ slug: slug || null, name: e.name, state: e.state, lat: e.lat, lon: e.lon, pop: e.pop || 100000 });
    }
    (SB.CityIndex || []).forEach(function (e) { add(e, e.slug); });
    (pack(state).points || []).forEach(function (e) { add(e, null); });
    return out;
  }

  function drive(a, b) { return SB.geo.drive(a, b); }

  function placeOnly(p) { return { slug: p.slug || null, name: p.name, state: p.state, lat: p.lat, lon: p.lon }; }

  /* ------------------------------------------------------------------ */
  /* the band's side: draw guesses, the floor, the ask                   */
  /* ------------------------------------------------------------------ */

  function band(state, id) { return id ? (state.bands && state.bands[id]) || null : null; }
  function hidOf(b) { return (b && b.hid) || {}; }

  function homeDraw(b) {
    var h = hidOf(b);
    if (typeof h.homeDraw === 'number') return h.homeDraw;
    return Math.max(1, Math.round(((b && b.followers) || 300) * C.FOLLOW_RATE * (h.conversion || 1)));
  }

  /* What the band believes it draws: the number it quotes, else its home draw inflated by its own oversell. */
  function drawGuess(req, b) {
    if (typeof req.statedDraw === 'number') return req.statedDraw;
    return homeDraw(b) * (hidOf(b).oversell || 1);
  }

  function wordFactor(state) { return C.VAN_COST.wordBase - C.VAN_COST.wordSpan * word(state) / 100; }

  /* floor = (miles to next stop x perMile + perMember x members) x dayOff - hosted, x the Word factor, floored at 0 */
  function floorFor(state, req, deal) {
    var h = req.hid || {}, f = (h.travel || 0) * (h.dayOff ? C.VAN_COST.dayOff : 1);
    if (deal && deal.lodging && deal.meal) f -= C.VAN_COST.hosted;
    f *= wordFactor(state);
    return Math.max(0, Math.round(f));
  }

  function showOf(state, id) { return id ? (state.shows && state.shows[id]) || null : null; }

  function priceOf(show) {
    return (show && show.door && typeof show.door.price === 'number' && show.door.price > 0) ? show.door.price : C.DOOR.def;
  }

  /* 7.15: the value of an offer to the band. Share deals use pct x (their home-draw guess x 0.4 x price). */
  function valueOf(state, req, deal, show) {
    var b = band(state, req.bandId), gross = drawGuess(req, b) * 0.4 * priceOf(show);
    var g = deal.guarantee || 0, pct = typeof deal.pct === 'number' ? deal.pct : 0;
    switch (deal.shape) {
      case 'GUARANTEE': return g;
      case 'GUARANTEE_PLUS': return g + C.PLUS_SHARE * gross * 0.5;   // SPEC?: "half of what is left after costs"; costs are read as half the door
      case 'VERSUS': return Math.max(g, pct * gross);
      case 'HAT': return gross * C.PRICE.HAT_RATE;
      default: return pct * gross;                                   // DOOR
    }
  }

  /* ------------------------------------------------------------------ */
  /* text                                                                */
  /* ------------------------------------------------------------------ */

  function genrePlain(g) {
    var s = SB.Content.strings && SB.Content.strings.genre && SB.Content.strings.genre[g];
    return (s && (s.plain || s.name)) || g || '';
  }

  function localBandName(state, genre) {
    var ids = SB.Bands.list(state, { local: true, active: true }) || [], best = null, i, b;
    for (i = 0; i < ids.length; i++) {
      b = state.bands[ids[i]];
      if (!b) continue;
      if (E.GENRE_FAMILY[b.genre] === E.GENRE_FAMILY[genre]) { best = b; break; }
      if (!best) best = b;
    }
    return best ? best.name : '';
  }

  /* A fixed pick from a list by a key (no random draw, so the same request always reads the same and no stream moves). */
  function keyPick(key, list) {
    var h = 0, i, s = String(key);
    if (!list || !list.length) return '';
    for (i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return list[Math.abs(h) % list.length];
  }
  function namesBank(path) {
    var v = SB.Content.names, parts = path.split('.'), i;
    for (i = 0; i < parts.length && v; i++) v = v[parts[i]];
    return Array.isArray(v) ? v : [];
  }
  function cap1(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

  /* The room the swap's writer books in their own town (03-content 5.1 `theirRoom`). */
  function theirRoomFor(key) {
    var list = namesBank('room.HOUSE.banks.yard').map(function (y) { return 'the ' + y + ' House'; })
      .concat(namesBank('room.DIY.banks.bldg').map(function (x) { return 'the ' + x; }));
    return keyPick(key + ':room', list) || 'the house';
  }
  /* A booking agent and agency for a band big enough to have one (TOO_BIG). Fixed per band. */
  function agentFor(key) {
    var first = keyPick(key + ':af', namesBank('first.MIDDLE')), last = keyPick(key + ':al', namesBank('last'));
    return [first, last].filter(Boolean).join(' ');
  }
  function agencyFor(key) {
    var A = (SB.Content.names && SB.Content.names.agency) || {}, banks = A.banks || {}, last = banks.last || [], road = banks.road || [];
    var pats = (A.patterns || []).filter(function (x) { return !/\{(?!last\}|last2\}|road:cap\})/.test(x); }), pat = keyPick(key + ':ap', pats);
    var l1 = keyPick(key + ':a1', last), l2 = keyPick(key + ':a2', last.filter(function (x) { return x !== l1; }));
    if (!pat) return l1 ? l1 + ' Booking' : '';
    return pat.replace('{last}', l1).replace('{last2}', l2).replace('{road:cap}', cap1(keyPick(key + ':ar', road)));
  }
  /* "the late nineties", "the early 2000s": when a reunion band last played, 14 to 25 years before today. */
  function eraFor(key, day) {
    var y = SB.time.date(day).y - 14 - keyPick(key + ':era', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), dec = Math.floor(y / 10) * 10, part = y % 10;
    var WORD = { 1960: 'sixties', 1970: 'seventies', 1980: 'eighties', 1990: 'nineties' };
    return 'the ' + (part <= 3 ? 'early' : (part <= 6 ? 'mid' : 'late')) + ' ' + (WORD[dec] || (dec + 's'));
  }
  /* How the band knows whoever sent them (FRIEND: "{referrer} ({referrerHow})"). */
  function referrerHowFor(state, req) {
    var id = req.referrerId, c = id && state.contacts ? state.contacts[id] : null, ids, i, x;
    if (c && c.place && c.place.name) return 'who books in ' + c.place.name;
    if (id && state.bands) {
      ids = Object.keys(state.bands);
      for (i = 0; i < ids.length; i++) {
        x = state.bands[ids[i]];
        if (x && x.id !== req.bandId && (x.contactId === id || (x.members || []).some(function (m) { return m && m.personId === id; }))) return 'from ' + x.name;
      }
    }
    return keyPick(req.id + ':how', ['an old friend', 'we toured with them once', 'a friend from back home', 'we met on the road']);
  }

  /* ' of February' when a named day is outside the current game month, else '' */
  function ofMonth(day, t) {
    var a = SB.time.date(day), b = SB.time.date(t);
    return a.m === b.m && a.y === b.y ? '' : ' of ' + SB.time.fmt(day, 'month');
  }

  function slotsFor(state, req) {
    var b = band(state, req.bandId), p = pack(state), here = cityPoint(state), d = req.dates || [], t = today(state);
    var peers = (p.zones || []).filter(function (z) { return z.kind === 'PEER'; });
    var feeders = (p.zones || []).filter(function (z) { return z.kind === 'FEEDER'; });
    var first = d.length ? d[0] : t, flags = (req.hid && req.hid.flags) || {};
    var swapWriter = req.kind === 'SWAP' && !!(req.fromId && state.contacts && state.contacts[req.fromId] && state.people && state.people[req.fromId]);
    var s = {
      city: here.name, band: b ? b.name : '', home: b && b.place ? b.place.name : (b ? here.name : ''),
      genreOwn: genrePlain(b ? b.genre : ''), genrePlain: genrePlain(b ? b.genre : ''),
      n: req.ask ? req.ask.members : '', month: SB.time.fmt(first, 'month'),
      season: ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter'][SB.time.month(first) - 1],
      region: p.region || '',
      prev: req.route && req.route.prev ? req.route.prev.name : '', next: req.route && req.route.next ? req.route.next.name : '',
      tourDays: req.route && req.route.stops ? req.route.stops.length + d.length - 1 : d.length,
      setLen: b && hidOf(b).tier >= 3 ? 40 : 30,
      draw: typeof req.statedDraw === 'number' ? req.statedDraw : '',
      bigNumber: typeof req.statedDraw === 'number' ? Math.max(100, Math.ceil(req.statedDraw * 1.5 / 50) * 50) : '',
      peerCity: peers.length ? peers[0].name : (req.route && req.route.prev ? req.route.prev.name : ''),
      weekday: SB.time.fmt(first + 1, 'dow'),
      local: flags.hasLocal ? localBandName(state, b ? b.genre : 'hardcore') : '',
      referrer: (req.referrerId ? personName(state, req.referrerId) : '') || 'a friend',
      referrerHow: referrerHowFor(state, req),
      you: '',
      dateLong: SB.time.fmt(first, 'dow') + ' the ' + SB.text.ordinal(SB.time.date(first).d) + ofMonth(first, t),
      daysOut: first - t,
      /* who signs is who writes: a swap is written by the contact who books in the band's town (req.fromId), and the
       * message's sender is that same person; otherwise the band's own contact */
      member: swapWriter ? firstName(state, req.fromId) : (b ? firstName(state, b.contactId) : personName(state, req.fromId)),
      agent: agentFor(b ? b.id : req.id), agency: agencyFor(b ? b.id : req.id),
      guarantee: req.ask ? req.ask.guarantee : '', pct: req.ask && typeof req.ask.pct === 'number' ? Math.round(req.ask.pct * 100) : '',
      /* 03-content (MASS): filled only when the engine has decided the message names the wrong city */
      wrongCity: req.hid && req.hid.wrongCity && peers.length ? peers[peers.length - 1].name : '',
      smallTown: b && b.place ? b.place.name : '', nearbyTown: feeders.length ? feeders[0].name : '',
      theirCity: b && b.place ? b.place.name : '', theirRoom: theirRoomFor(req.fromId || req.id), yourBand: localBandName(state, b ? b.genre : 'hardcore'),
      newMember: '', era: eraFor(b ? b.id : req.id, t), host: '',
      amount: req.ask && req.ask.guarantee > 0 ? req.ask.guarantee : round10(200 + 10 * keyPick(req.id + ':amt', [0, 3, 5, 8, 11, 14, 17, 20, 25])), bookingName: state.player ? state.player.bookingName || '' : ''
    }, k;
    if (d.length) { s.day1 = SB.time.fmt(d[0], 'dow'); s.date1 = SB.time.date(d[0]).d; s.date = s.date1; s.of1 = ofMonth(d[0], t); }
    if (d.length > 1) { s.day2 = SB.time.fmt(d[1], 'dow'); s.date2 = SB.time.date(d[1]).d; s.of2 = ofMonth(d[1], t); }
    if (req.route && req.route.prev && typeof req.route.prev.day === 'number') s.date0 = SB.time.date(req.route.prev.day).d;
    /* a flag never overwrites a slot that holds a value: date2 and guarantee are both a flag and a number */
    for (k in flags) if (s[k] === undefined || s[k] === null || s[k] === '') s[k] = flags[k];
    s.shortNotice = !!req.shortNotice;
    if (!s.local) s.hasLocal = false;                                // no local band to name: the line is left out
    if (req.localAsk && LOCAL_FLAG[req.localAsk]) s[LOCAL_FLAG[req.localAsk]] = true;
    return s;
  }

  /* 03-content 5.1: the template whose kind fits and whose tells best match. */
  function chooseTemplate(state, kind, flags, fallback) {
    var all = (SB.Content.requests && SB.Content.requests.templates) || {}, best = null, bestScore = -99, bestW = -1;
    Object.keys(all).forEach(function (key) {
      var t = all[key];
      if (!t || !Array.isArray(t.kind) || t.kind.indexOf(kind) < 0) return;
      var want = (t.tells && t.tells.want) || [], avoid = (t.tells && t.tells.avoid) || [], sc = 0;
      want.forEach(function (x) { if (flags[x]) sc++; });
      avoid.forEach(function (x) { if (flags[x]) sc--; });
      if (key === fallback) sc += 0.5;                               // the band was made for this template
      var w = typeof t.weight === 'number' ? t.weight : 1;
      if (sc > bestScore || (sc === bestScore && w > bestW)) { best = key; bestScore = sc; bestW = w; }
    });
    return best || fallback;
  }

  /* The flags the request is written with: the band's tells, with noise (REQUESTS.GOOD_TELLS, BAD_TELLS). */
  function tellFlags(r, b) {
    var h = hidOf(b), f = {}, tells = h.tells || [];
    tells.forEach(function (t) { if (r.chance(0.85)) f[t] = true; });
    if ((h.honest || 0) >= Q.GOOD_TELLS.honestAt && r.chance(Q.GOOD_TELLS.p)) {
      r.shuffle(GOOD_TELLS).slice(0, Q.GOOD_TELLS.count).forEach(function (t) { f[t] = true; });
    }
    if ((h.oversell || 1) >= Q.BAD_TELLS.hypeAt && r.chance(Q.BAD_TELLS.p)) {
      f.OVERSELL = true;
      r.shuffle(['MASS', 'SLOPPY']).slice(0, Q.BAD_TELLS.count - 1).forEach(function (t) { f[t] = true; });
    }
    if (r.chance(0.1)) f[r.pick(E.TELL ? Object.keys(E.TELL) : GOOD_TELLS)] = true;     // no tell is certain
    return f;
  }

  /* ------------------------------------------------------------------ */
  /* routes                                                              */
  /* ------------------------------------------------------------------ */

  function legCandidates(state, from, exclude) {
    var lo = Math.round(C.TOUR_LEG_MINUTES[0] / 2), hi = C.TOUR_LEG_MINUTES[1];
    /* SPEC?: legs are TOUR_LEG_MINUTES (120 to 330) apart, but the city's nearest real stops (Mobile is 66 minutes
     * from Pensacola) are closer; half the lower bound is allowed for the legs either side of the player's city. */
    return places(state).filter(function (p) {
      if (exclude && exclude.some(function (x) { return x && x.name === p.name && x.state === p.state; })) return false;
      var m = drive(from, p);
      return m >= lo && m <= hi;
    });
  }

  function makeRoute(state, r, first, last, home) {
    var here = cityPoint(state), prevC = legCandidates(state, here, [home]), prev, next, nextC, stops = [];
    if (!prevC.length) {
      return { prev: { name: home ? home.name : '', state: home ? home.state : '', minutes: home ? drive(here, home) : 0, day: first - 1 },
               next: { name: '', state: '', minutes: 0, day: last + 1 }, stops: [] };
    }
    prev = r.weighted(prevC, function (p) { return Math.sqrt(p.pop || 1); });
    nextC = prevC.filter(function (p) {
      if (p === prev) return false;
      var a = SB.geo.bearing(here, prev), b = SB.geo.bearing(here, p), dd = Math.abs(a - b);
      if (dd > 180) dd = 360 - dd;
      return dd > 90;                                             // the far side: the city is on the way
    });
    if (!nextC.length) nextC = prevC.filter(function (p) { return p !== prev; });
    next = nextC.length ? r.weighted(nextC, function (p) { return Math.sqrt(p.pop || 1); }) : null;
    var before = legCandidates(state, prev, [here, next, home]).filter(function (p) { return drive(here, p) > drive(here, prev); });
    var after = next ? legCandidates(state, next, [here, prev, home]).filter(function (p) { return drive(here, p) > drive(here, next); }) : [];
    var b0 = before.length ? r.pick(before) : null, a0 = after.length ? r.pick(after) : null;
    if (b0) stops.push({ day: first - 2, name: b0.name, state: b0.state });
    stops.push({ day: first - 1, name: prev.name, state: prev.state });
    if (next) stops.push({ day: last + 1, name: next.name, state: next.state });
    if (a0 && next) stops.push({ day: last + 2, name: a0.name, state: a0.state });
    return {
      prev: { name: prev.name, state: prev.state, minutes: drive(prev, here), day: first - 1 },
      next: next ? { name: next.name, state: next.state, minutes: drive(here, next), day: last + 1 } : { name: '', state: '', minutes: 0, day: last + 1 },
      stops: stops, nextPoint: next ? placeOnly(next) : null
    };
  }

  /* ------------------------------------------------------------------ */
  /* making a request                                                    */
  /* ------------------------------------------------------------------ */

  function shareFor(state, genre) {
    var name = (state.player && state.player.name) || 5, focus = (state.player && state.player.focus && state.player.focus.genres) || [];
    var booked = (state.player && state.player.recentGenres) || [], everBooked = false;
    booked.forEach(function (row) { if (Array.isArray(row) && row.indexOf(genre) >= 0) everBooked = true; });
    var match = focus.indexOf(genre) >= 0 ? Q.MATCH.known : (everBooked ? Q.MATCH.booked : Q.MATCH.never);
    var w = Math.pow(Math.max(name, 0.01), Q.SHARE_EXP) * match, others = 0;
    Object.keys(state.bookers || {}).forEach(function (id) {
      var bk = state.bookers[id];
      if (bk.active === false) return;
      others += Math.pow(Math.max(bk.name || 20, 0.01), Q.SHARE_EXP) * ((bk.genres || []).indexOf(genre) >= 0 ? Q.MATCH.known : Q.MATCH.never);
    });
    return Math.max(Q.SHARE_FLOOR, w / (w + others));
  }

  function genreFor(state, r) {
    var shares = pack(state).scene.genreShares[1];
    return r.weighted(E.GENRES, shares);
  }

  function preTemplate(r, kind, tier, flagsHint) {
    switch (kind) {
      case 'REFERRAL': return 'FRIEND';
      case 'RETURNING': return 'RETURN';
      case 'SWAP': return 'SWAP';
      case 'LOCAL_ASK': return 'LOCAL';
      case 'RESCUE': return r.chance(0.5) ? 'RESCUE' : 'BREAKDOWN';
      default:
        if (tier >= 3) return 'TOO_BIG';
        return r.weighted(['CAREFUL', 'MASS', 'OVERSELL', 'TERSE', 'KIDS_TOUR', 'REUNION'], [0.3, 0.2, 0.15, 0.15, 0.12, 0.08]);
    }
  }

  function tierFor(state, r, kind) {
    var stage = (state.player && state.player.stage) || 1;
    if (stage === 1 && (kind === 'COLD' || kind === 'RESCUE')) return Q.STAGE1.maxTier;
    return r.weighted([1, 2, 3, 4], [0.45, 0.35, 0.15, 0.05]);
  }

  function homeFor(state, r, spec) {
    if (spec.home) return spec.home;
    var p = pack(state), c;
    if (spec.kind === 'SWAP' || (spec.fromId && state.contacts && state.contacts[spec.fromId])) {
      c = state.contacts && state.contacts[spec.fromId];
      if (c && c.place) return c.place;
    }
    if (spec.from === 'PEER') {
      var peers = (p.zones || []).filter(function (z) { return z.kind === 'PEER' && z.slug; });
      if (peers.length) {
        var e = SB.Cities.entry(r.pick(peers).slug);
        if (e) return { slug: e.slug, name: e.name, state: e.state, lat: e.lat, lon: e.lon };
      }
    }
    var all = places(state);
    if (!all.length) return null;
    return placeOnly(r.weighted(all, function (x) { return x.pop; }));
  }

  /* Snap a day to the nearest Sunday to Thursday (stage 1 small tours want a weeknight). */
  function weeknight(day) {
    var d = SB.time.dow(day);
    if (d === 4) return day - 1;
    if (d === 5) return day + 1;
    return day;
  }
  function weekendNear(day) { var d = SB.time.dow(day); return d <= 4 ? day + (4 - d) : day + (11 - d); }

  function create(state, spec) {
    if (!spec || !E.REQ_KIND[spec.kind]) SB.fail('Requests.create', 'spec.kind must be a REQ_KIND');
    /* the shape SB.Effects passes: { touring: { home, genre, tier }, ask: {…}, replyBy: days, shortNotice } */
    if (spec.touring && typeof spec.touring === 'object') {
      spec = U.copy(spec);
      if (!spec.home && spec.touring.home) spec.home = spec.touring.home;
      if (!spec.genre && spec.touring.genre) spec.genre = spec.touring.genre;
      if (spec.tier === undefined && typeof spec.touring.tier === 'number') spec.tier = spec.touring.tier;
    }
    var r = rq(state), kind = spec.kind, arrival = typeof spec.day === 'number' ? spec.day : today(state);
    var stage = (state.player && state.player.stage) || 1, records = [], p = pack(state), bid = spec.bandId || null, b;
    var tier, genre, pre, home = null, localAsk = spec.localAsk || null, owner = null;

    if (kind === 'LOCAL_ASK') {
      if (!localAsk) localAsk = r.pick(['RELEASE', 'BENEFIT', 'FIRST_SHOW', 'EMPTY_NIGHT', 'LAST_SHOW', 'GOING_AWAY']);
      if (localAsk === 'EMPTY_NIGHT') {
        var rooms = Object.keys(state.rooms || {}).filter(function (id) {
          var x = state.rooms[id];
          return x.open && (x.ownerRel || 0) >= C.OWNER.stranger && x.zoneId === 'city';
        });
        if (spec.roomId) rooms = [spec.roomId];
        if (!rooms.length) localAsk = 'RELEASE';
        else owner = state.rooms[r.pick(rooms)];
      }
      /* Every request names a band: a TERMS ask goes to it. An owner's empty night names the local band the owner
       * would like to see there; the owner is the one who writes (fromId) and the room is kept in roomId. */
      if (!bid) {
        var locals = SB.Bands.list(state, { local: true, active: true }) || [];
        if (localAsk === 'FIRST_SHOW') {
          var forming = locals.filter(function (id) { var x = state.bands[id]; return x && (x.stage === 'FORMING' || x.stage === 'NEW'); });
          if (forming.length) locals = forming;
        }
        if (!locals.length) return { requestId: null, records: [] };
        bid = r.pick(locals);
      }
      pre = 'LOCAL';
    } else if (!bid) {
      tier = typeof spec.tier === 'number' ? spec.tier : tierFor(state, r, kind);
      genre = spec.genre || genreFor(state, r);
      pre = spec.template || preTemplate(r, kind, tier);
      home = homeFor(state, r, spec);
      /* spec.cross (the opening's swap "written carefully"): the band is made with that template's traits */
      bid = SB.WorldGen.touringBand(state, { home: home, genre: genre, tier: tier, kind: spec.cross || pre });
    } else {
      pre = spec.template || preTemplate(r, kind, hidOf(band(state, bid)).tier || 1);
    }
    b = band(state, bid);
    if (b && b.place) home = b.place;
    tier = (b && (hidOf(b).tier || b.tierPublic)) || tier || 1;

    /* dates: one to three days, a lead ahead (RESCUE and BREAKDOWN: 3 to 6) */
    var lead = spec.lead || ((kind === 'RESCUE' || pre === 'RESCUE' || pre === 'BREAKDOWN') ? [3, 6] : (kind === 'LOCAL_ASK' ? [21, 56] : Q.LEAD_DAYS));
    var dates = spec.dates ? spec.dates.slice() : null;
    if (!dates) {
      var first = arrival + r.int(lead[0], lead[1]);
      if (spec.calendar === 'ANY') first = weekendNear(first);
      else if (stage === 1 && kind === 'COLD' && r.chance(Q.STAGE1.weeknight)) first = weeknight(first);
      var n = (kind === 'RESCUE' || pre === 'RESCUE' || pre === 'BREAKDOWN') ? 1 : r.int(Q.DATES[0], Q.DATES[1]), i;
      dates = [];
      for (i = 0; i < n; i++) dates.push(first + i);
    }
    var firstDay = dates[0], lastDay = dates[dates.length - 1];
    var route = kind === 'LOCAL_ASK' ? { prev: null, next: null, stops: [] } : makeRoute(state, r, firstDay, lastDay, home);
    var nextPoint = route.nextPoint || null;
    delete route.nextPoint;
    if (route.stops) route.stops.sort(function (a, c) { return a.day - c.day; });

    var short = firstDay - arrival < C.JOBS.ANNOUNCE.ideal || spec.shortNotice === true;
    var replyBy = short ? Math.min(firstDay - 1, arrival + r.int(1, 2)) : Math.min(firstDay - 1, arrival + r.int(Q.REPLY_BY[0], Q.REPLY_BY[1]));
    if (typeof spec.replyBy === 'number') replyBy = Math.min(firstDay - 1, arrival + spec.replyBy);
    if (replyBy < arrival) replyBy = arrival;

    /* the floor and the ask (7.15) */
    var members = (b && b.members && b.members.length) || r.int(C.MEMBER.size[0], C.MEMBER.size[1]);
    var here = cityPoint(state), miles = nextPoint && typeof here.lat === 'number' ? SB.geo.miles(here.lat, here.lon, nextPoint.lat, nextPoint.lon)
                                                                               : (route.next && route.next.minutes ? route.next.minutes / C.DRIVE_FACTOR : 150);
    var raced = kind !== 'LOCAL_ASK' && kind !== 'SWAP' && r.chance(Q.RACE);
    var travel = miles * C.VAN_COST.perMile + C.VAN_COST.perMember * members;
    var honest = hidOf(b).honest;
    var askX = U.lerp(C.ASK_OVER_FLOOR[1], C.ASK_OVER_FLOOR[0], typeof honest === 'number' ? honest : 0.5);
    var wantsFloor = r.chance(tier <= 1 ? 0.7 : (tier === 2 ? 0.5 : 0.2)), wantsMeal = r.chance(0.5);
    var hidq = { raced: raced, gone: null, wants: (hidOf(b).needs || ['PAID'])[0], travel: Math.round(travel * 100) / 100,
                 dayOff: !raced, flags: {}, askX: askX };
    var tmp = { hid: hidq };
    var fl = floorFor(state, tmp, null);
    var askAmt = round10(fl * askX);
    var shape;
    if (kind === 'LOCAL_ASK') shape = 'DOOR';
    else if (spec.ask === 'GUARANTEE') shape = 'GUARANTEE';
    else if (spec.ask === 'DOOR') shape = 'DOOR';
    else if (stage === 1 && tier <= Q.STAGE1.maxTier) shape = 'DOOR';        // a stage-1 small tour asks for the door
    else if (tier >= 3) shape = r.chance(0.5) ? 'GUARANTEE' : 'VERSUS';
    else if (tier === 2) shape = r.chance(0.6) ? 'GUARANTEE' : 'DOOR';
    else shape = r.chance(0.25) ? 'GUARANTEE' : 'DOOR';
    if (pre === 'OVERSELL' && spec.ask === 'GUARANTEE') shape = 'GUARANTEE';
    if (shape !== 'DOOR' && askAmt < 50) askAmt = Math.max(askAmt, round10(50 + 50 * tier));
    var pct = U.round(r.range(C.DOOR_DEAL_PCT[0], C.DOOR_DEAL_PCT[1]), 2);
    var ask = { shape: shape, guarantee: shape === 'DOOR' ? 0 : askAmt, pct: shape === 'GUARANTEE' ? 0 : pct,
                lodging: kind !== 'LOCAL_ASK' && wantsFloor, meal: kind !== 'LOCAL_ASK' && wantsMeal, members: members };
    if (spec.ask && typeof spec.ask === 'object') {
      Object.keys(spec.ask).forEach(function (k) { if (ask.hasOwnProperty(k)) ask[k] = spec.ask[k]; });
      if (!E.DEAL[ask.shape]) ask.shape = 'DOOR';
      ask.guarantee = Math.max(0, Math.round(+ask.guarantee || 0));
      ask.pct = U.clamp(+ask.pct || 0, 0, 1);
      shape = ask.shape;
    }

    var flags = kind === 'LOCAL_ASK' ? {} : tellFlags(r, b);
    var statedDraw = null;
    if (kind !== 'LOCAL_ASK' && r.chance(flags.HONEST || flags.PRO || flags.OVERSELL ? 0.8 : 0.4)) {
      statedDraw = Math.max(3, Math.round(homeDraw(b) * (hidOf(b).oversell || 1)));
      if (flags.OVERSELL) statedDraw = Math.max(statedDraw, Math.ceil(statedDraw / 25) * 25);
    }
    flags.hasRoute = !!(route.prev && route.prev.name) && !flags.SLOPPY;
    flags.hasDraw = statedDraw !== null;
    flags.hasLocal = kind !== 'LOCAL_ASK' && r.chance(flags.PRO ? 0.4 : 0.15);
    flags.date2 = dates.length > 1;
    flags.doorDeal = shape === 'DOOR';
    flags.guarantee = shape !== 'DOOR' && shape !== 'HAT';
    flags.lodging = ask.lodging;
    flags.meal = ask.meal;
    flags.firstVisit = !(b && b.visits && b.visits.length);
    if (b && b.visits && b.visits.length) {
      var lv = b.visits[b.visits.length - 1];
      flags.lastGood = typeof lv.q === 'number' && lv.q >= C.RETURN_Q;
      flags.lastRough = typeof lv.q === 'number' && lv.q < 35;
      flags.lastWeird = !flags.lastGood && !flags.lastRough;
    }
    flags.shortNotice = short;
    if (kind === 'REFERRAL') flags.REFERRED = true;
    if (pre === 'RESCUE' || pre === 'BREAKDOWN') flags.DESPERATE = true;
    hidq.flags = flags;

    var template = kind === 'LOCAL_ASK' ? 'LOCAL' : chooseTemplate(state, kind, flags, spec.template || pre);
    var signals = [];
    var sig = (SB.Content.requests && SB.Content.requests.signals) || {};
    Object.keys(sig).forEach(function (k) { if (sig[k] && sig[k].tell && flags[sig[k].tell]) signals.push(k); });

    var id = U.newId(state, 'q');
    var fromId = spec.fromId || (owner ? owner.ownerId : (b ? b.contactId : null));
    var req = {
      id: id, kind: kind, template: template, bandId: bid, fromId: fromId || null, day: arrival, replyBy: replyBy,
      dates: dates, route: { prev: route.prev, next: route.next, stops: route.stops || [] }, ask: ask, statedDraw: statedDraw,
      referrerId: spec.referrerId || null, localAsk: kind === 'LOCAL_ASK' ? localAsk : null, status: 'NEW', offers: [],
      followups: 0, messageId: null, showId: null, vetted: {}, signals: signals, shortNotice: short,
      roomId: owner ? owner.id : null, revealed: {}, hid: hidq
    };
    if (!state.requests) state.requests = {};
    state.requests[id] = req;

    /* the message, written once */
    var slots = slotsFor(state, req), base = 'requests.templates.' + template;
    if (owner) slots.room = owner.name;
    var subject = line(state, base + '.subject', slots), body = line(state, base + '.body', slots);
    var fromName = b && kind !== 'LOCAL_ASK' ? b.name : (owner ? personName(state, owner.ownerId) : (b ? b.name : personName(state, fromId)));
    if (kind === 'SWAP' && spec.fromId) fromName = personName(state, spec.fromId) || fromName;
    var mid = SB.Mail.post(state, { kind: 'REQUEST', fromId: req.fromId, fromName: fromName, subject: subject, body: body, needs: true,
                                    refs: { requestId: id, showId: null, askId: null, bandId: bid, offerId: null }, keep: false });
    req.messageId = mid || null;
    records.push(rec(state, 'MESSAGE', { messageId: req.messageId, kind: 'REQUEST', fromName: fromName, needs: true }, ''));
    return { requestId: id, records: records };
  }

  /* ------------------------------------------------------------------ */
  /* views                                                               */
  /* ------------------------------------------------------------------ */

  function get(state, id) { return getReq(state, id, 'Requests.get'); }

  function list(state, filter) {
    filter = filter || {};
    return Object.keys(state.requests || {}).filter(function (id) {
      var q = state.requests[id];
      if (filter.status && (Array.isArray(filter.status) ? filter.status.indexOf(q.status) < 0 : q.status !== filter.status)) return false;
      if (filter.kind && q.kind !== filter.kind) return false;
      if (filter.open === true && !OPEN[q.status]) return false;
      if (filter.open === false && OPEN[q.status]) return false;
      if (filter.bandId && q.bandId !== filter.bandId) return false;
      return true;
    });
  }

  function route(state, id) {
    var q = getReq(state, id, 'Requests.route'), here = cityPoint(state);
    var stops = (q.route && q.route.stops ? q.route.stops : []).map(function (s) { return { day: s.day, name: s.name, state: s.state, here: false }; });
    (q.dates || []).forEach(function (d) { stops.push({ day: d, name: here.name, state: here.state, here: true }); });
    stops.sort(function (a, b) { return a.day - b.day; });
    function leg(x) { return x ? { name: x.name || '', state: x.state || '', minutes: x.minutes || 0, day: typeof x.day === 'number' ? x.day : null }
                               : { name: '', state: '', minutes: 0, day: null }; }
    return { prev: leg(q.route && q.route.prev), next: leg(q.route && q.route.next), stops: stops };
  }

  function strip(q) {
    var out = {}, k;
    for (k in q) if (k !== 'hid') out[k] = U.copy(q[k]);
    return out;
  }

  function nightClash(state, day) {
    var out = [];
    Object.keys(state.shows || {}).forEach(function (id) {
      var s = state.shows[id];
      if (s.day === day && (s.status === 'DRAFT' || s.status === 'CONFIRMED')) {
        out.push((s.roomId && state.rooms[s.roomId] && state.rooms[s.roomId].name) || '');
      }
    });
    SB.Rooms.otherShows(state, day, day).forEach(function (o) {
      if (o.roomId && state.rooms[o.roomId]) out.push(state.rooms[o.roomId].name);
    });
    (pack(state).calendar || []).forEach(function (c) {
      var dt = SB.time.date(day), wk = SB.time.weekOfMonth(day);
      var weeks = c.weeks || (c.week ? [c.week] : null);
      if (c.month === dt.m && (!weeks || weeks.indexOf(wk) >= 0) && (!c.dows || c.dows.indexOf(dt.dow) >= 0)) out.push(c.label);
    });
    return out.filter(Boolean);
  }

  /* SPEC?: the warnings on a date the crowd would feel (C.AHEAD): a similar show the night before, a bigger similar one a
   * few nights after, each in the engine's own words naming the room and the night. Public numbers only (Crowd.near). */
  function nightCrowd(state, bandId, day) {
    var n = SB.Crowd && typeof SB.Crowd.near === 'function' ? SB.Crowd.near(state, 'city', [bandId], day) : { before: [], after: [] };
    function say(path, x) { return line(state, path, { room: x.room, night: SB.time.fmt(x.day, 'long') }); }
    return n.before.map(function (x) { return say('requests.nightBefore', x); })
      .concat(n.after.map(function (x) { return say('requests.biggerAfter', x); })).filter(Boolean);
  }

  function contactNear(state, q) {
    var b = band(state, q.bandId), pts = [];
    if (b && b.place && typeof b.place.lat === 'number') pts.push(b.place);
    var found = null;
    Object.keys(state.contacts || {}).forEach(function (cid) {
      var c = state.contacts[cid];
      if (found || !c.place || typeof c.place.lat !== 'number') return;
      var names = (q.route && q.route.stops || []).map(function (s) { return s.name; });
      if (names.indexOf(c.place.name) >= 0) { found = cid; return; }
      pts.forEach(function (p) { if (!found && SB.geo.drive(p, c.place) <= C.TOUR.legMaxMinutes) found = cid; });
    });
    return found;
  }

  function view(state, id) {
    var q = getReq(state, id, 'Requests.view'), b = band(state, q.bandId);
    var msg = q.messageId ? SB.Mail.message(state, q.messageId) : null;
    var tells = (state.notebook && state.notebook.tells) || {};
    var sig = (SB.Content.requests && SB.Content.requests.signals) || {};
    var seen = tells[q.template] && tells[q.template].seen >= 1;
    var openRooms = SB.Rooms.list(state, { zoneId: 'city', open: true });
    var contact = contactNear(state, q);
    var vet = Object.keys(E.VET).map(function (a) {
      var done = q.vetted && typeof q.vetted[a] === 'number' ? q.vetted[a] : null, avail;
      if (done !== null) avail = refuse(state, 'ALREADY');
      else if (!OPEN[q.status] && q.status !== 'ACCEPTED') avail = refuse(state, 'INVALID');
      else if (a === 'ASK_BOOKER' && !contact) avail = refuse(state, 'NEEDS');
      else avail = U.yes(a === 'ASK_BOOKER' ? { contactId: contact } : null);
      var job = C.JOBS['VET_' + a];
      return { action: a, done: done, hours: job ? job.hours : 0, cost: null, available: avail };
    });
    var flags = [];
    if (b && SB.Harm && typeof SB.Harm.flags === 'function' && q.revealed && q.revealed.members) {
      var hf = SB.Harm.flags(state, q.bandId);
      if (hf && hf.text) flags.push({ text: hf.text, strength: (hf.listed || []).length });
    }
    if (q.revealed && q.revealed.warn) flags.push({ text: q.revealed.warnText || '', strength: 1 });
    return {
      request: strip(q),
      band: b ? SB.Bands.card(state, q.bandId) : null,
      message: msg,
      dates: (q.dates || []).map(function (d) {
        return { day: d, clash: nightClash(state, d), crowd: nightCrowd(state, q.bandId, d),
                 rooms: openRooms.map(function (rid) {
                   var c = SB.Rooms.calendar(state, rid, d, 1)[0];
                   return { roomId: rid, name: state.rooms[rid].name, state: c ? c.state : 'OPEN' };
                 }) };
      }),
      route: route(state, id),
      ask: U.copy(q.ask),
      signals: seen ? (q.signals || []).map(function (k) { return { key: k, text: (sig[k] && sig[k].text) || k, good: !!(sig[k] && sig[k].good) }; }) : [],
      vet: vet,
      flags: flags,
      says: typeof q.statedDraw === 'number' ? q.statedDraw : null,
      here: b ? (SB.Notebook.range(state, 'draw:' + q.bandId + ':city') || null) : null,
      shortNotice: q.shortNotice ? line(state, 'requests.shortNotice', { daysOut: (q.dates[0] || today(state)) - today(state) }) : ''
    };
  }

  /* ------------------------------------------------------------------ */
  /* vetting                                                             */
  /* ------------------------------------------------------------------ */

  var VET_KEYS = { live: function (b) { return 'live:' + b; }, cross: function (b) { return 'cross:' + b; },
                   draw: function (b) { return 'draw:' + b + ':city'; }, honest: function (b) { return 'honest:' + b; },
                   rel: function (b) { return 'rel:' + b; } };

  function gradeOf(b) {
    var h = hidOf(b);
    if ((h.rel || 0) < 0.4 || (h.honest || 0) < 0.35) return 'bad';
    if ((h.rel || 0) >= 0.7 && (h.honest || 0) >= 0.6) return 'good';
    return 'mixed';
  }

  function vet(state, id, action, answer) {
    var q = getReq(state, id, 'Requests.vet');
    if (!E.VET[action]) SB.fail('Requests.vet', 'unknown vetting action "' + action + '"');
    var b = band(state, q.bandId), cfg = C.VET[action] || {}, records = [], learned = [], bid = q.bandId;
    q.vetted = q.vetted || {};
    q.vetted[action] = today(state);
    q.revealed = q.revealed || {};
    if (bid && b) {
      Object.keys(VET_KEYS).forEach(function (f) {
        if (typeof cfg[f] !== 'number') return;
        var key = VET_KEYS[f](bid), e0 = SB.Notebook.est(state, key), before = e0 ? { lo: e0.lo, hi: e0.hi } : null;
        var l = SB.Notebook.narrow(state, key, cfg[f], 'VET');
        var after = SB.Notebook.est(state, key);
        if (l) learned.push(l);
        if (before && after) {
          records.push(rec(state, 'RANGE', { key: key, from: before, to: { lo: after.lo, hi: after.hi },
                                             label: (l && l.label) || '' }, ''));
        }
      });
    }
    if (cfg.genre) q.revealed.genre = true;
    if (cfg.members) q.revealed.members = true;
    var h = hidOf(b), flags = (q.hid && q.hid.flags) || {};
    if (cfg.knownHere) q.revealed.knownHere = (h.knownHere || 1) > 1;
    var slots = slotsFor(state, q);
    slots.genreDiffers = !!(b && b.genre2);
    slots.young = h.gen === 0;
    slots.emptyRoom = (h.oversell || 1) >= 1.5;
    slots.OVERSELL = !!flags.OVERSELL || (h.oversell || 1) >= 1.2;
    slots.knownHere = (h.knownHere || 1) > 1;
    slots.n = action === 'CLIP' ? Math.max(5, Math.round(homeDraw(b) * 0.8)) : slots.n;
    var warn = !!cfg.warn && ((h.honest || 1) < 0.4 || (h.rel || 1) < 0.45);
    slots.warn = warn;
    if (warn) q.revealed.warn = true;
    var text;
    if (action === 'ASK_BOOKER') {
      var grade = (answer && answer.grade) || gradeOf(b), contactId = (answer && answer.contactId) || null;
      slots.booker = contactId ? personName(state, contactId) : '';
      slots.n = (answer && typeof answer.n === 'number') ? answer.n : Math.max(1, Math.round(homeDraw(b) * 0.4));
      text = (answer && answer.text) || line(state, 'requests.vet.ASK_BOOKER.' + grade, slots);
      if (grade === 'bad') { q.revealed.warn = true; q.revealed.warnText = text; }
    } else {
      text = line(state, 'requests.vet.' + action, slots);
      if (warn) q.revealed.warnText = text;
    }
    var first = learned.length ? learned[0] : { key: bid ? 'draw:' + bid + ':city' : 'vet', label: '', from: 0, to: 0, text: text,
                                                 because: SB.time.fmt(today(state), 'short') };
    records.push(rec(state, 'NOTE', { learned: first }, text));
    return records;
  }

  /* ------------------------------------------------------------------ */
  /* the TERMS ask                                                       */
  /* ------------------------------------------------------------------ */

  /* A held room on the date for the show that carries this request. */
  function heldOn(state, showId, date) {
    var s = showOf(state, showId);
    if (!s || !s.roomId || s.day !== date) return false;
    var room = state.rooms[s.roomId], c = room && room.calendar && room.calendar[date];
    if (!c) return false;
    return c.holds.some(function (h) { return h.by === 'player' && h.showId === showId; });
  }

  function answerAsk(state, ask, phase) {
    if (!ask || ask.kind !== 'TERMS') SB.fail('Requests.answerAsk', 'not a TERMS ask');
    if (phase !== 'SEND' && phase !== 'DELIVER') SB.fail('Requests.answerAsk', 'phase must be SEND or DELIVER');
    var p = ask.payload || {}, q = getReq(state, p.requestId, 'Requests.answerAsk'), deal = p.deal || {};
    return phase === 'SEND' ? termsSend(state, ask, q, deal, p) : termsDeliver(state, ask, q, deal, p);
  }

  /* SPEC?: 7.15 says YES when the offer's value reaches the band's floor. A band that asked for the door (every stage-1
   * cold ask, the scripted swap) can have a floor above anything a door share is worth by that sum, and would then
   * refuse the very terms it wrote. An offer that gives the band what it asked for, in the shape it asked, counts
   * as reaching the floor: nobody turns down their own ask. */
  function meetsAsk(q, deal) {
    var a = q.ask || {}, shape = deal.shape || 'DOOR', askShape = a.shape || 'DOOR';
    if ((deal.guarantee || 0) < (a.guarantee || 0)) return false;
    if (a.lodging && !deal.lodging) return false;
    if (a.meal && !deal.meal) return false;
    if (askShape === 'GUARANTEE') return shape === 'GUARANTEE' || shape === 'GUARANTEE_PLUS' || shape === 'VERSUS';
    if (shape === 'HAT' && askShape !== 'HAT') return false;
    return (typeof deal.pct === 'number' ? deal.pct : 0) >= (typeof a.pct === 'number' ? a.pct : 1) - 1e-9;
  }

  function termsSend(state, ask, q, deal, p) {
    var r = rq(state), t = today(state), show = showOf(state, p.showId), w = C.WAIT.TOURING;
    q.offers = q.offers || [];
    q.offers.push({ day: t, by: 'player', date: p.date, deal: U.copy(deal) });
    if (OPEN[q.status]) q.status = 'NEGOTIATING';
    var days = p.inPerson ? 0 : r.range(w.days[0], w.days[1]);
    if (!OPEN[q.status] && q.status !== 'NEGOTIATING') return { days: days, will: 'NO', counter: null };
    if (q.hid && typeof q.hid.gone === 'number' && q.hid.gone <= t) return { days: days, will: 'NO', counter: null };
    if (!p.inPerson && r.chance(w.silent)) return { days: days, will: 'SILENT', counter: null };
    var dateOk = (q.dates || []).indexOf(p.date) >= 0;
    var value = valueOf(state, q, deal, show), floor = floorFor(state, q, deal);
    if (dateOk && (value >= floor || meetsAsk(q, deal))) {
      if (heldOn(state, p.showId, p.date) || r.chance(0.5)) return { days: days, will: 'YES', counter: null };
      /* SPEC?: without a held room YES comes only half the time; the other half is read as "not yet: find a room"
       * (a NO that leaves the request open), the smaller behavior. */
      return { days: days, will: 'NO', counter: null, needRoom: true };
    }
    if (dateOk && value >= 0.6 * floor && q.offers.length < Q.NEGOTIATE_MAX) {
      var askAmt = Math.max(q.ask.guarantee || 0, round10(floor * ((q.hid && q.hid.askX) || 1.5)));
      var fig = Math.max(floor, round10(U.lerp(value, askAmt, 0.5)));
      var cd = U.copy(deal);
      if (cd.shape === 'DOOR' || cd.shape === 'HAT' || !cd.shape) { cd.shape = 'GUARANTEE'; cd.pct = 0; }
      cd.guarantee = Math.max(cd.guarantee || 0, fig);
      return { days: days, will: 'COUNTER', counter: { requestId: q.id, showId: p.showId || null, date: p.date, deal: cd } };
    }
    return { days: days, will: 'NO', counter: null };
  }

  function replySlots(state, q, amount) {
    var s = slotsFor(state, q);
    s.amount = amount;
    s.town = q.route && q.route.next && q.route.next.name ? q.route.next.name : s.peerCity;
    return s;
  }

  function termsDeliver(state, ask, q, deal, p) {
    var t = today(state), will = (ask.hid && ask.hid.will) || 'NO', records = [];
    if (q.hid && typeof q.hid.gone === 'number' && q.hid.gone <= t && q.status !== 'ACCEPTED') {
      will = 'NO';
      return { status: 'NO', text: line(state, 'requests.replies.TOOK_OTHER', replySlots(state, q, 0)), counter: null, records: records };
    }
    if (will === 'YES') {
      accept(state, q.id, p.showId || null, deal);
      var yesIf = q.ask && q.ask.lodging && !deal.lodging;
      return { status: 'YES', text: line(state, 'requests.replies.' + (yesIf ? 'YES_IF' : 'YES'), replySlots(state, q, deal.guarantee || 0)),
               counter: null, records: records };
    }
    if (will === 'COUNTER') {
      var c = (ask.hid && ask.hid.counter) || null;
      if (c) q.offers.push({ day: t, by: 'band', date: c.date, deal: U.copy(c.deal) });
      /* SPEC?: a band that names a figure is waiting for an answer to it, but 7.15 gives no new reply-by, and
       * Requests.daily (which runs after the morning's mail) would lapse the request the same morning its counter
       * arrived. The band waits the shortest REPLY_BY from its counter. */
      if (typeof q.replyBy === 'number' && q.replyBy < t + Q.REPLY_BY[0]) q.replyBy = t + Q.REPLY_BY[0];
      return { status: 'COUNTER', text: line(state, 'requests.replies.COUNTER', replySlots(state, q, c ? c.deal.guarantee : 0)),
               counter: c, records: records };
    }
    if (will === 'SILENT') return { status: 'SILENT', text: '', counter: null, records: records };
    /* NO. Going under the floor ends it (mechanics 4.5); a NO for want of a room leaves it open. */
    var value = valueOf(state, q, deal, showOf(state, p.showId)), floor = floorFor(state, q, deal);
    var dateOk = (q.dates || []).indexOf(p.date) >= 0;
    if (dateOk && value < 0.6 * floor && OPEN[q.status]) {
      q.status = 'WITHDRAWN'; q.closedDay = today(state);
      records.push(rec(state, 'REQUEST_GONE', { requestId: q.id, why: 'WITHDRAWN' }, ''));
    }
    /* a NO for want of a held room says so (the request stays open: offer again once the room is held) */
    return { status: 'NO', text: line(state, 'requests.replies.' + (dateOk && (value >= floor || meetsAsk(q, deal)) ? 'NO_ROOM' : 'NO'), replySlots(state, q, 0)),
             counter: null, records: records };
  }

  function accept(state, id, showId, deal) {
    var q = getReq(state, id, 'Requests.accept');
    q.status = 'ACCEPTED'; q.closedDay = today(state);
    if (showId) q.showId = showId;
    if (deal) q.acceptedDeal = U.copy(deal);
  }

  function pass(state, id, tone, referTo) {
    var q = getReq(state, id, 'Requests.pass'), records = [];
    if (tone && !E.PASS_TONE[tone]) SB.fail('Requests.pass', 'unknown tone "' + tone + '"');
    if (!OPEN[q.status]) return records;
    q.status = 'PASSED'; q.closedDay = today(state);
    records.push(rec(state, 'REQUEST_GONE', { requestId: id, why: 'PASSED' }, ''));
    records.push(SB.Territory.adjustWord(state, C.PASS.answered.word, 'ANSWERED'));
    if (referTo) {
      if (state.bookers && state.bookers[referTo]) records.push(SB.Rooms.adjustBookerRel(state, referTo, C.PASS.passedOn.rel, 'PASSED_ON'));
      else if (state.contacts && state.contacts[referTo]) records.push(SB.Territory.adjustContact(state, referTo, C.PASS.passedOn.rel, 'PASSED_ON'));
    }
    return records;
  }

  /* ------------------------------------------------------------------ */
  /* the day: follow-ups, lapsing, the race, rescues                     */
  /* ------------------------------------------------------------------ */

  function termsOut(state, id) {
    return Object.keys(state.asks || {}).some(function (aid) {
      var a = state.asks[aid];
      return a.kind === 'TERMS' && a.payload && a.payload.requestId === id && (a.status === 'QUEUED' || a.status === 'SENT');
    });
  }

  function playerHoldsFor(state, q) {
    return Object.keys(state.shows || {}).some(function (sid) {
      var s = state.shows[sid];
      return s.requestId === q.id && (q.dates || []).indexOf(s.day) >= 0 && heldOn(state, sid, s.day);
    });
  }

  function followupsDue(q) {
    var f = (q.hid && q.hid.flags) || {};
    if (f.MASS) return [];
    if (f.DESPERATE) return [2, 4, 6];
    if (f.PRO || f.HONEST) return [Q.FOLLOWUP_DAYS[0], Q.FOLLOWUP_DAYS[1]];
    return [Q.FOLLOWUP_DAYS[0]];
  }

  function postReply(state, q, path, slots) {
    var text = line(state, path, slots), b = band(state, q.bandId);
    if (!text) return null;
    var name = b ? b.name : personName(state, q.fromId);
    var mid = SB.Mail.post(state, { kind: 'REQUEST', fromId: q.fromId, fromName: name, subject: '', body: text, needs: false,
                                    refs: { requestId: q.id, showId: q.showId || null, askId: null, bandId: q.bandId, offerId: null }, keep: false });
    return rec(state, 'MESSAGE', { messageId: mid, kind: 'REQUEST', fromName: name, needs: false }, '');
  }

  function coldRate(state) {
    var p = pack(state), m = SB.time.month(today(state));
    return (p.scene.traffic || 0) * Q.SEASON[m - 1] * (Q.STOP.base + Q.STOP.perWord * word(state) / 100);
  }

  function daily(state, day) {
    if (typeof day !== 'number') SB.fail('Requests.daily', 'day must be a number');
    var records = [], r = rq(state);
    Object.keys(state.requests || {}).forEach(function (id) {
      var q = state.requests[id];
      if (!OPEN[q.status]) return;
      var held = playerHoldsFor(state, q);
      /* the guided first show's band waits for the player (SB.Tutorial.keeps): no race, no lapse */
      var kept = !!(SB.Tutorial && SB.Tutorial.keeps && SB.Tutorial.keeps(state, q));
      /* the race: a rival booker holds a room first */
      if (q.hid && q.hid.raced && q.hid.gone === null && !held && !kept && q.kind !== 'LOCAL_ASK') {
        var b0 = band(state, q.bandId), rival = 1 - shareFor(state, b0 ? b0.genre : 'hardcore');
        /* SPEC?: "with chance by their name share each day" would end most raced requests within a day or two, well
         * inside REPLY_BY. Read as that share x 0.15 a day, the smaller behavior. */
        if (r.chance(rival * 0.15)) q.hid.gone = day;
      }
      var gone = q.hid && typeof q.hid.gone === 'number' && q.hid.gone <= day;
      if (gone || (day > q.replyBy && !termsOut(state, id) && !kept)) {
        var never = q.status === 'NEW';
        q.status = never ? 'IGNORED' : 'LAPSED'; q.closedDay = day;
        records.push(rec(state, 'REQUEST_GONE', { requestId: id, why: gone ? 'TOOK_OTHER' : 'LAPSED' }, ''));
        if (never && q.kind !== 'LOCAL_ASK') records.push(SB.Territory.adjustWord(state, C.PASS.never.word, 'NEVER_ANSWERED'));
        if (q.kind !== 'LOCAL_ASK' && (!never || r.chance(0.5))) {
          var m = postReply(state, q, 'requests.replies.' + (never ? 'TOOK_OTHER_SLOW' : 'TOOK_OTHER'), replySlots(state, q, 0));
          if (m) records.push(m);
        }
        return;
      }
      /* follow-ups from bands that have not heard back */
      if (q.status === 'NEW') {
        var due = followupsDue(q);
        if (q.followups < due.length && day - q.day >= due[q.followups]) {
          q.followups++;
          var fm = postReply(state, q, 'requests.templates.' + q.template + '.followup', slotsFor(state, q));
          if (fm) records.push(fm);
        }
      }
    });
    /* rescues: a band whose date fell through, at short notice */
    var stage = (state.player && state.player.stage) || 1;
    if (!(stage === 1 && week(state) < Q.STAGE1.fromWeek)) {
      /* SPEC?: no rate is given for unscripted rescues; a tenth of the cold-ask rate, spread over the days. */
      if (r.chance(coldRate(state) * 0.1 / 7)) {
        var res = create(state, { kind: 'RESCUE', day: day });
        res.records.forEach(function (x) { records.push(x); });
      }
    }
    return records;
  }

  /* ------------------------------------------------------------------ */
  /* the week: new requests by the rates of 7.15                         */
  /* ------------------------------------------------------------------ */

  function returningDue(state, w) {
    var out = [];
    Object.keys(state.bands || {}).forEach(function (bid) {
      var b = state.bands[bid];
      if (b.local || !b.visits || !b.visits.length || b.endedWeek !== null && b.endedWeek !== undefined) return;
      var v = b.visits[b.visits.length - 1];
      if (!(typeof v.host === 'number' && v.host > Q.RETURN.hostAbove)) return;
      var u = SB.rng.hash(state.seed + ':return:' + bid + ':' + v.day) / 9007199254740992;
      if (u >= Q.RETURN.p) return;
      var u2 = SB.rng.hash(state.seed + ':returnWeek:' + bid + ':' + v.day) / 9007199254740992;
      var at = Math.floor(v.day / 7) + Q.RETURN.weeks[0] + Math.floor(u2 * (Q.RETURN.weeks[1] - Q.RETURN.weeks[0] + 1));
      if (at !== w) return;
      var since = Object.keys(state.requests || {}).some(function (id) { var q = state.requests[id]; return q.bandId === bid && q.day > v.day; });
      if (!since) out.push(bid);
    });
    return out;
  }

  /* Bands in the circle of a band whose visit is still being talked about (7.17). */
  function circlePick(state, r, w) {
    var pool = [], weights = [];
    Object.keys(state.bands || {}).forEach(function (bid) {
      var b = state.bands[bid];
      if (b.local || !b.spread || b.spread.until < w || !b.circle) return;
      b.circle.forEach(function (cid) {
        var c = state.bands[cid];
        if (!c || c.local || pool.indexOf(cid) >= 0) return;
        if (Object.keys(state.requests || {}).some(function (id) { var q = state.requests[id]; return q.bandId === cid && OPEN[q.status]; })) return;
        pool.push(cid);
        weights.push(b.spread.good ? C.CIRCLE_SPREAD.likelier : C.CIRCLE_SPREAD.lessLikely);
      });
    });
    if (!pool.length) return null;
    /* SPEC?: how often the next cold ask comes from a circle is not given; a tenth of the summed weights, capped at .6. */
    var p = Math.min(0.6, U.sum(weights) * 0.1);
    if (!r.chance(p)) return null;
    return r.weighted(pool, weights);
  }

  /* ------------------------------------------------------------------ */
  /* trimming (called by SB.Save.trim)                                   */
  /* ------------------------------------------------------------------ */

  /* The day a closed request closed: stamped when it closes; an older save without the stamp uses the latest day the
   * request could still have been open (its reply-by date or its last date), which never drops it early. */
  function closedOn(q) {
    if (typeof q.closedDay === 'number') return q.closedDay;
    var d = Math.max(typeof q.day === 'number' ? q.day : 0, typeof q.replyBy === 'number' ? q.replyBy : 0), i;
    for (i = 0; i < (q.dates || []).length; i++) if (q.dates[i] > d) d = q.dates[i];
    return d;
  }

  /* Architect's ruling on the lifetimes 01-state 3 left out: a closed request with no show is dropped 26 weeks after it
   * closed. A request whose show is gone from state.shows (deleted at 104 weeks) has no show either. A request that
   * anything else still names by value (a kept message, an ask, a job, a show, the director's swap) stays until that
   * goes. Runs every fourth week (the lifetime is in weeks). */
  var NAME_SKIP = { requests: 1, notebook: 1, rng: 1, ids: 1 };
  function trim(state) {
    var all = state.requests, t = today(state), cand = {}, any = false, id, q, k, stack = [], o, i, v, keys, j, n = 0;
    if (!all || week(state) % 4 !== 0) return 0;
    for (id in all) {
      q = all[id];
      if (!q || OPEN[q.status]) continue;
      if (q.showId && state.shows && state.shows[q.showId]) continue;
      if (t - closedOn(q) < KEEP_CLOSED_DAYS) continue;
      cand[id] = true; any = true;
    }
    if (!any) return 0;
    for (k in state) {
      if (NAME_SKIP[k]) continue;
      if (typeof state[k] === 'string') { if (cand[state[k]] === true) delete cand[state[k]]; }
      else if (state[k] && typeof state[k] === 'object') stack.push(state[k]);
    }
    while (stack.length) {                                  /* values only: mail.replied is keyed by request and names nothing */
      o = stack.pop();
      if (Array.isArray(o)) { for (i = 0; i < o.length; i++) { v = o[i]; if (typeof v === 'string') { if (cand[v] === true) delete cand[v]; } else if (v && typeof v === 'object') stack.push(v); } continue; }
      keys = Object.keys(o);
      for (j = 0; j < keys.length; j++) { v = o[keys[j]]; if (typeof v === 'string') { if (cand[v] === true) delete cand[v]; } else if (v && typeof v === 'object') stack.push(v); }
    }
    for (id in cand) { delete all[id]; n++; }
    return n;
  }

  function weekly(state) {
    var records = [], r = rq(state), w = week(state), arrival = (w + 1) * 7;
    var stage = (state.player && state.player.stage) || 1;
    function add(spec) {
      spec.day = arrival;
      var res = create(state, spec);
      res.records.forEach(function (x) { records.push(x); });
      return res.requestId;
    }
    /* cold asks: passing tours that want the town, thinned by the player's share */
    if (!(stage === 1 && w + 1 < Q.STAGE1.fromWeek)) {
      var n = poisson(r, coldRate(state)), i;
      for (i = 0; i < n; i++) {
        var circ = circlePick(state, r, w);
        if (circ) { add({ kind: 'COLD', bandId: circ }); continue; }
        var g = genreFor(state, r);
        if (r.chance(shareFor(state, g))) add({ kind: 'COLD', genre: g });
      }
    }
    /* referrals: trusted local bands and strong contacts */
    var trusted = (SB.Bands.list(state, { local: true, active: true }) || []).filter(function (bid) {
      var t = SB.Bands.trust(state, bid);
      return t && t.value >= Q.REFERRAL.trustAt;
    });
    var strong = Object.keys(state.contacts || {}).filter(function (cid) { return (state.contacts[cid].strength || 0) >= Q.REFERRAL.contactAt; });
    var nRef = poisson(r, Q.REFERRAL.perTrustedBand * trusted.length + Q.REFERRAL.perContact * strong.length);
    for (var j = 0; j < nRef; j++) {
      var fromBand = trusted.length && r.chance(Q.REFERRAL.perTrustedBand * trusted.length / (Q.REFERRAL.perTrustedBand * trusted.length + Q.REFERRAL.perContact * strong.length || 1));
      if (fromBand) {
        var lb = state.bands[r.pick(trusted)];
        add({ kind: 'REFERRAL', referrerId: lb ? lb.contactId : null });
      } else if (strong.length) {
        var cid = r.pick(strong), c = state.contacts[cid];
        add({ kind: 'REFERRAL', referrerId: cid, home: c && c.place && typeof c.place.lat === 'number' ? c.place : null });
      }
    }
    /* tours by the player's bands send people back for a year (7.17) */
    Object.keys(state.tours || {}).forEach(function (tid) {
      var t = state.tours[tid];
      if (!t.echo || t.echo.until < w || !(t.echo.n > 0)) return;
      if (r.chance(Math.min(1, t.echo.n / Math.max(1, t.echo.until - w + 1)))) {
        t.echo.n -= 1;
        var stop = r.pick((t.stops || []).filter(function (s) { return s.result && s.result.good; })) || (t.stops || [])[0];
        add({ kind: 'REFERRAL', home: stop && stop.place && typeof stop.place.lat === 'number' ? stop.place : null,
              referrerId: stop ? stop.contactId || null : null });
      }
    });
    /* returning bands */
    returningDue(state, w + 1).forEach(function (bid) { add({ kind: 'RETURNING', bandId: bid, template: 'RETURN' }); });
    /* swaps */
    var swapC = Object.keys(state.contacts || {}).filter(function (cid) { return (state.contacts[cid].strength || 0) >= Q.SWAP.contactAt; });
    var nSwap = poisson(r, Q.SWAP.perContact * swapC.length);
    for (var k = 0; k < nSwap && swapC.length; k++) add({ kind: 'SWAP', fromId: r.pick(swapC), template: 'SWAP' });
    /* local asks, from the first week */
    if (r.chance(Q.LOCAL_ASK_PER_WEEK)) add({ kind: 'LOCAL_ASK' });
    return records;
  }

  return {
    get: get, list: list, view: view, route: route, vet: vet, answerAsk: answerAsk, pass: pass, accept: accept,
    daily: daily, weekly: weekly, create: create,
    /* extras (not in the manifest) */
    trim: trim, closedOn: closedOn
  };
});
