/* Scene Booker — engine/story/chapters.js
 * SB.Chapters: the Act I chapters and the desk-drops. A chapter opens when the player has done something, never on a
 * date; several can be open at once. Opening or closing one queues its cutscene on state.story.cutscenes for the UI.
 * Owner: SYSTEMS. Spec: design/spec/09-tutorial-story-patches.md 2 and 3; 09a-build-contract.md.
 * Pure on state, no DOM, and it draws from no random stream.
 * Beyond the manifest: blank (the default state.story), ensure, slots (the slots every story text may use; with a
 * cutscene key or 'tutorial' instead of an object, every slot and flag js/content/story.js uses),
 * billOrder (the booker's running order), drops.
 */
SB.module('Chapters', function (SB) {
  'use strict';
  var IDS = ['GOING_AWAY', 'DOORS_AT_8', 'ANSWER_EVERYONE', 'OUT_OF_STATE', 'THIN', 'FACES', 'ASK_FOR_YOU', 'POSTCARD', 'SWAP',
             'YOUR_BAND', 'LAST_CALL', 'ALL_AGES', 'WATCHING'];
  var HAS_CLOSE = { GOING_AWAY: 1, DOORS_AT_8: 1, OUT_OF_STATE: 1, LAST_CALL: 1, ALL_AGES: 1 };
  var DROP_IDS = ['DANA_BRIDGE', 'DANA_BAR_DOOR', 'DANA_TUESDAY', 'DANA_BAD_MONTH', 'ROOM_GONE', 'COUCH'];
  var GOOD = { GOOD: 1, TALKED: 1, WALL: 1 }, BAD = { ROUGH: 1, THIN: 1 };
  /* what "done something" means, in shows played */
  var AT = { bridge: 2, barDoor: 6, tuesday: 12, postcardBandShows: 3, badMonthShows: 4, badMonthDays: 28, lastCallShows: 3, facesShows: 3,
             answered: 8, yourBandTier: 2 };

  function isArr(x) { return Array.isArray(x); }
  function today(state) { return state.clock ? (state.clock.day || 0) : 0; }
  function week(state) { return state.clock ? (state.clock.week || 0) : 0; }

  function blank() {
    return { tutorial: { on: false, step: null, skipped: false, nudgedAt: 0, showId: null, requestId: null, replied: false, closeout: false, wrong: {}, cast: null, done: null },
             chapters: {}, cutscenes: [], seen: [], drops: {}, counts: {}, toasts: [] };
  }

  /* state.story and state.patches with every key present (an old save, a test fixture) */
  function ensure(state) {
    var b = blank(), s = state.story, k;
    if (!s || typeof s !== 'object') s = state.story = b;
    for (k in b) if (s[k] === undefined || s[k] === null) s[k] = b[k];
    for (k in b.tutorial) if (s.tutorial[k] === undefined) s.tutorial[k] = b.tutorial[k];
    if (!state.patches || typeof state.patches !== 'object') state.patches = {};
    return s;
  }

  function person(state, id) { var p = id && state.people ? state.people[id] : null; return p ? (p.first || p.nick || '') : ''; }
  function bandName(state, id) { var b = id && state.bands ? state.bands[id] : null; return b ? b.name : ''; }

  /* the slots every story text may use (09a): outgoing, bookingName, town, bigCity, sound, host, room, curfew */
  function slots(state, more) {
    var d = state.director || {}, cast = d.cast || {}, pack = null, entry = null, room, o, k;
    try { pack = SB.Cities.pack(state); } catch (e) { pack = null; }
    try { entry = SB.Cities.entry(state.citySlug); } catch (e2) { entry = null; }
    room = cast.roomId && state.rooms ? state.rooms[cast.roomId] : null;
    o = {
      outgoing: person(state, cast.outgoing), bookingName: (state.player && state.player.bookingName) || '',
      town: (entry && entry.name) || (pack && pack.name) || '', bigCity: pack && pack.whereGo && pack.whereGo[0] ? pack.whereGo[0].name : '',
      sound: person(state, cast.sound), host: person(state, cast.host || (room && room.ownerId)), room: room ? room.name : '',
      curfew: room && typeof room.curfew === 'number' ? SB.time.clock(room.curfew) : ''
    };
    /* the setup's rent answer says the real numbers (fix-list 1.17 step 3): what you start with and the rent, for this town */
    (function () {
      var C = SB.Config, pm = pack && pack.money ? pack.money : {}, bills = pm.bills || (C.CITY && C.CITY.BILLS) || {};
      var cash = typeof pm.startCash === 'number' ? pm.startCash : (C.CITY && C.CITY.START_CASH);
      if (typeof cash === 'number') o.startCash = '$' + Math.round(cash).toLocaleString('en-US');
      if (typeof bills.RENT === 'number') o.rent = '$' + Math.round(bills.RENT).toLocaleString('en-US');
    })();
    if (typeof more === 'string') return storySlots(state, more, o);
    if (more) for (k in more) if (more[k] !== undefined && more[k] !== null) o[k] = more[k];
    /* a scene about a played show names who really ran its sound (the first pick can cancel and be replaced) */
    if (o.showId && state.shows && state.shows[o.showId] && state.shows[o.showId].crew && state.shows[o.showId].crew.sound && state.shows[o.showId].crew.sound !== 'player')
      o.sound = person(state, state.shows[o.showId].crew.sound) || o.sound;
    return o;
  }

  /* ---------------- every slot and flag js/content/story.js uses (WIRING) ----------------
   * slots(state, key): key is a cutscene key ('GOING_AWAY_open', 'DANA_BRIDGE', ...) or 'tutorial'. Reads only.
   * Filled from real state, each with a fallback so a line never renders with a hole in it:
   *   touring, touringHome, local, kids, date, dow, soundRate   the walkthrough's show (or the request it starts from)
   *   band1, band2, band2Home, band3, bands                     the going-away bill
   *   band, paid, regular, referrer, peer, peerTown, newRoom    from the chapter's own refs and the records
   *   kept, SOLD, POLICE, BEHAVIOR                              flags; at most one cause flag is set */
  var CAUSE = { SOLD: 'SOLD', RENT: 'SOLD', MARSHAL: 'POLICE', COMPLAINTS: 'POLICE', POLICE: 'POLICE', NOISE: 'POLICE', BEHAVIOR: 'BEHAVIOR', DAMAGE: 'BEHAVIOR', FIGHT: 'BEHAVIOR' };
  function homeOf(b) { return b && b.place && b.place.name ? b.place.name : ''; }
  function bandsBy(state, test) {
    return Object.keys(state.bands || {}).sort(function (a, b) { return (+a.slice(1) || 0) - (+b.slice(1) || 0) || (a < b ? -1 : 1); })
      .map(function (id) { return state.bands[id]; }).filter(function (b) { return b && b.stage !== 'ENDED' && test(b); });
  }
  function youngest(state, locals, notId) {
    var best = null, bestAge = 9;
    locals.forEach(function (b) {
      var gs = (b.members || []).map(function (m) { var p = state.people && state.people[m.personId]; return p && typeof p.gen === 'number' ? p.gen : 1; });
      var age = gs.length ? gs.reduce(function (x, y) { return x + y; }, 0) / gs.length : 1;
      if (b.id !== notId && age < bestAge) { bestAge = age; best = b; }
    });
    return best;
  }
  /* The guided first show's own cast (reads only): the show, the request it starts from, the touring band, the big
   * local draw Dana names (`closer`), the kids' band that opens, the night. The two locals are kept once chosen
   * (state.story.tutorial.cast, written by SB.Tutorial); until then: the draw the opening already cast if it is free
   * that night, else the biggest draw that is; the youngest band that is free. */
  function walk(state) {
    var d = state.director || {}, cast = d.cast || {}, st = story0(state) || blank(), t = st.tutorial || {}, kept = t.cast || {};
    var show = null, q, ord, tour = null, closer = null, kids = null, locals, freeL, day = null, sp, i, asked = {};
    try { show = SB.Tutorial && SB.Tutorial.showOf ? SB.Tutorial.showOf(state) : null; } catch (e0) { show = null; }
    q = (show && show.requestId && state.requests && state.requests[show.requestId]) || (state.requests && state.requests[t.requestId || d.firstRequestId || d.swapRequestId]) || null;
    locals = bandsBy(state, function (b) { return !!b.local; });
    if (show) {
      ord = billOrder(state, show);
      tour = ord.touring ? state.bands[ord.touring] : null;
      day = show.day;
      sp = (show.bill && show.bill.slots) || [];
      for (i = 0; i < sp.length; i++) asked[sp[i].bandId] = 1;
      for (i in (state.asks || {})) if (state.asks[i].kind === 'BAND_PLAY' && state.asks[i].showId === show.id) asked[state.asks[i].toId] = 1;
    }
    if (!tour && q && q.bandId) tour = state.bands[q.bandId] || null;
    if (day === null && q && isArr(q.dates) && q.dates.length) day = q.dates[0];
    function free(b) {
      if (day === null || asked[b.id]) return true;
      try { return !!SB.Bands.isFree(state, b.id, day); } catch (e) { return true; }
    }
    function alive(id) { var b = id && state.bands ? state.bands[id] : null; return b && b.stage !== 'ENDED' ? b : null; }
    freeL = locals.filter(free);
    closer = alive(kept.closer);
    if (!closer && alive(cast.closer) && free(alive(cast.closer))) closer = alive(cast.closer);
    if (!closer) closer = (freeL.length ? freeL : locals).slice().sort(function (a, b) { return drawOf(state, b.id) - drawOf(state, a.id); })[0] || null;
    kids = alive(kept.kids);
    if (!kids) kids = youngest(state, freeL, closer && closer.id) || youngest(state, locals, closer && closer.id);
    return { show: show, request: q, touring: tour, closer: closer, kids: kids, day: day };
  }

  function storySlots(state, key, o) {
    var d = state.director || {}, cast = d.cast || {}, st = story0(state) || blank(), l = state.legacy || {}, C = SB.Config || {};
    var w = walk(state), q = w.request, tour = w.touring, closer = w.closer, kids = w.kids, away, day = w.day, sp, m, id, e, refs = {}, queued = null, k, rec, room, why, f, i;
    function put(name, v) { if (v !== undefined && v !== null && v !== '') o[name] = v; }
    away = bandsBy(state, function (b) { return !b.local; });
    o.touring = tour ? tour.name : 'the touring band';
    o.touringHome = homeOf(tour) || 'out of state';
    o.local = closer ? closer.name : 'the local band';
    o.kids = kids ? kids.name : 'the kids';
    o.date = day !== null ? SB.time.fmt(day, 'md') : 'that night';
    o.dow = day !== null ? SB.time.fmt(day, 'dow') : 'that night';
    /* the name on the request's message, as the phone lists it */
    m = null;
    if (q && state.mail && isArr(state.mail.messages)) state.mail.messages.forEach(function (x) { if (x && (x.id === q.messageId || (x.refs && x.refs.requestId === q.id)) && x.fromName) m = x; });
    o.sender = (m && m.fromName) || o.touring;
    /* whoever is actually running sound on the show (Destiny can send a buddy): the texts name them, not the usual */
    if (w.show && w.show.crew && w.show.crew.sound && w.show.crew.sound !== 'player' && person(state, w.show.crew.sound)) o.sound = person(state, w.show.crew.sound);
    sp = cast.sound && state.people ? state.people[cast.sound] : null;
    o.soundRate = sp && typeof sp.rate === 'number' && sp.rate > 0 ? sp.rate : ((C.PAY && C.PAY.SOUND && C.PAY.SOUND[0]) || 40);
    /* a band that writes its name in lowercase ("houses we left") reads as a broken sentence in a text: quote it */
    ['touring', 'local', 'kids', 'sender'].forEach(function (k) { if (typeof o[k] === 'string' && /^[a-z]/.test(o[k]) && !/^the (touring|local) band$|^the kids$/.test(o[k])) o[k] = '\u201c' + o[k] + '\u201d'; });
    o.closer = o.local; o.band = o.touring;
    /* the going-away bill: the kids, a band that drove in (not the one asking you), the draw */
    m = away.filter(function (b) { return !tour || b.id !== tour.id; })[0] || away[0] || null;
    o.band1 = o.kids; o.band2 = m ? m.name : 'the touring band'; o.band2Home = homeOf(m) || 'out of state'; o.band3 = o.local;
    o.bands = [o.band1, o.band2, o.band3];
    o.seed = String(state.seed || o.bookingName || '');
    /* this cutscene's own: what the chapter kept when it opened or closed, and what was queued with it */
    m = /^(.*)_(open|close)$/.exec(key || '');
    id = m ? m[1] : key;
    e = st.chapters && st.chapters[id];
    if (e && e.refs) refs = e.refs;
    for (i = 0; i < (st.cutscenes || []).length; i++) if (st.cutscenes[i].key === key) { queued = st.cutscenes[i].slots || {}; break; }
    if (!queued && st.moments && st.moments.kept && st.moments.kept[key]) queued = st.moments.kept[key];   // a milestone watched again
    for (k in refs) put(k, refs[k]);
    if (queued) for (k in queued) put(k, queued[k]);
    if (key !== 'tutorial' && key !== 'GOING_AWAY_open' && key !== 'GOING_AWAY_close' && key !== 'DOORS_AT_8_open') {
      if ((refs.band || (queued && queued.band)) && /^OUT_OF_STATE/.test(key)) { o.touring = o.band; put('touringHome', refs.home || (queued && queued.home)); }
    }
    if (o.band && key !== 'tutorial') o.bands = key === 'GOING_AWAY_open' ? o.bands : [o.band];
    rec = (refs.showId && l.records && l.records[refs.showId]) || (queued && queued.showId && l.records && l.records[queued.showId]) || null;
    if (!rec && l.records) { k = Object.keys(l.records).sort(function (a, b) { return l.records[a].day - l.records[b].day; }); rec = k.length ? l.records[k[id === 'DOORS_AT_8' ? 0 : k.length - 1]] : null; }
    o.paid = rec && typeof rec.paid === 'number' ? rec.paid : (typeof o.heads === 'number' ? o.heads : 0);
    o.regular = o.face || person(state, ((state.regulars && state.regulars.faces) || [])[0]) || 'somebody';
    /* who told them, and the other booker */
    f = null;
    (l.firsts || []).forEach(function (x) { if (x.k === 'WORD_OF_MOUTH') f = x; });
    q = null;
    Object.keys(state.requests || {}).sort().forEach(function (rid) {
      var x = state.requests[rid];
      if (!q && x && x.kind === 'REFERRAL' && x.referrerId && x.referrerId !== cast.outgoing && (!f || !f.refs || !f.refs.bandId || x.bandId === f.refs.bandId)) q = x;
    });
    m = '';
    if (q) {
      bandsBy(state, function (b) { return (b.members || []).some(function (mm) { return mm.personId === q.referrerId; }); }).forEach(function (b) { if (!m) m = b.name; });
      if (!m) m = person(state, q.referrerId);
    }
    o.referrer = m || o.local;
    q = null;
    Object.keys(state.requests || {}).sort().forEach(function (rid) {
      var x = state.requests[rid];
      if (x && x.kind === 'SWAP' && rid !== (d.firstRequestId || d.swapRequestId) && (!q || (refs.showId && x.showId === refs.showId))) q = x;
    });
    if (!q && d.swapRequestId && state.requests) q = state.requests[d.swapRequestId] || null;
    m = q && q.bandId ? state.bands[q.bandId] : null;
    o.peer = (q && person(state, q.fromId)) || 'a booker you know';
    o.peerTown = homeOf(m) || o.bigCity || 'the next town over';
    if (id === 'SWAP' && m && !refs.band) o.band = m.name;
    /* the room that came after, the room that was kept, and why a room closed */
    f = {};
    (l.firsts || []).forEach(function (x) { f[x.k] = x; });
    room = null;
    ['ROOM_KEPT', 'OFFER_ROOM'].forEach(function (kk) { var rr = f[kk] && f[kk].refs && f[kk].refs.roomId; if (!room && rr && state.rooms && state.rooms[rr]) room = state.rooms[rr]; });
    if (!room) (l.offers || []).forEach(function (x) { if (!room && x && x.kind === 'ROOM' && x.roomId && state.rooms && state.rooms[x.roomId]) room = state.rooms[x.roomId]; });
    if (!o.newRoom) o.newRoom = (id === 'ALL_AGES' && (o.kept || (room && room.name))) || (room && room.name) || 'the new room';
    o.kept = id === 'ALL_AGES' && !!f.ROOM_KEPT && !(room && closed(room));
    why = o.why || (refs.roomId && state.rooms && state.rooms[refs.roomId] && state.rooms[refs.roomId].closedWhy) || (room && closed(room) && room.closedWhy) || '';
    o.SOLD = false; o.POLICE = false; o.BEHAVIOR = false;
    if (CAUSE[why] && !o.kept) o[CAUSE[why]] = true;
    return o;
  }

  /* ---------------- the booker's running order ---------------- */

  function drawOf(state, bandId) {
    var b = state.bands && state.bands[bandId];
    if (!b) return 0;
    try { return SB.Bands.publicDraw(state, b) || 0; } catch (e) { return b.followers || 0; }
  }

  /* Touring band second to last, the biggest local draw last. -> { ok, n, touring, closer, why }
   * why: null | 'SHORT' (under two bands) | 'TOURING_SLOT' | 'CLOSER' (the last band is not the biggest local draw). */
  function billOrder(state, show) {
    var sl = (show && show.bill && show.bill.slots) || [], n = sl.length, i, tIdx = -1, best = -1, bestDraw = -1, d, last, out;
    out = { ok: false, n: n, touring: null, closer: null, why: 'SHORT' };
    if (n < 2) return out;
    for (i = 0; i < n; i++) {
      if (sl[i].role === 'TOURING') { if (tIdx < 0) tIdx = i; continue; }
      d = drawOf(state, sl[i].bandId);
      if (d > bestDraw) { bestDraw = d; best = i; }
    }
    out.touring = tIdx >= 0 ? sl[tIdx].bandId : null;
    out.closer = best >= 0 ? sl[best].bandId : null;
    last = sl[n - 1];
    if (best < 0) { out.ok = true; out.why = null; return out; }                 // no local on the bill: nothing to order
    if (tIdx >= 0 && tIdx !== n - 2) { out.why = 'TOURING_SLOT'; return out; }
    if (last.role === 'TOURING' || drawOf(state, last.bandId) < bestDraw) { out.why = 'CLOSER'; return out; }
    out.ok = true; out.why = null;
    return out;
  }

  /* ---------------- what the engine already records ---------------- */

  function context(state) {
    var l = state.legacy || {}, recs = Object.keys(l.records || {}).map(function (k) { return l.records[k]; }).sort(function (a, b) { return a.day - b.day; });
    var firsts = {}, byRoom = {}, byBand = {}, i, j, r, top = null;
    (l.firsts || []).forEach(function (f) { firsts[f.k] = f; });
    for (i = 0; i < recs.length; i++) {
      r = recs[i];
      if (r.roomId) byRoom[r.roomId] = (byRoom[r.roomId] || 0) + 1;
      for (j = 0; j < (r.bill || []).length; j++) if (r.bill[j].role !== 'TOURING') byBand[r.bill[j].bandId] = (byBand[r.bill[j].bandId] || 0) + 1;
    }
    Object.keys(byRoom).sort().forEach(function (id) { if (!top || byRoom[id] > byRoom[top]) top = id; });
    return { recs: recs, firsts: firsts, byRoom: byRoom, byBand: byBand, topRoom: top, played: (state.player && state.player.showsPlayed) || recs.length,
             P: state.player || {}, story: ensure(state), l: l, cast: (state.director && state.director.cast) || {} };
  }

  function touringOf(rec) { var b = rec.bill || [], i; for (i = 0; i < b.length; i++) if (b[i].role === 'TOURING') return b[i]; return null; }
  function firstRec(c, test) { var i; for (i = 0; i < c.recs.length; i++) if (test(c.recs[i])) return c.recs[i]; return null; }
  function closed(room) { return !!room && (room.open === false || (room.closedWeek !== null && room.closedWeek !== undefined)); }

  function liveTouringShow(state) {
    var ids = Object.keys(state.shows || {}).sort(), i, s, j;
    for (i = 0; i < ids.length; i++) {
      s = state.shows[ids[i]];
      if (!s || (s.status !== 'CONFIRMED' && s.status !== 'PLAYED')) continue;
      for (j = 0; j < ((s.bill && s.bill.slots) || []).length; j++) if (s.bill.slots[j].role === 'TOURING') return { show: s, bandId: s.bill.slots[j].bandId };
    }
    return null;
  }

  /* a request that came by word of mouth: a referral from someone other than the outgoing booker */
  function wordOfMouth(state, c) {
    var ids = Object.keys(state.requests || {}).sort(), i, q;
    for (i = 0; i < ids.length; i++) {
      q = state.requests[ids[i]];
      if (q && q.kind === 'REFERRAL' && q.referrerId !== c.cast.outgoing && (typeof q.day !== 'number' || q.day <= today(state))) return q;
    }
    return null;
  }

  function swapShow(state) {
    var d = state.director || {}, ids = Object.keys(state.shows || {}).sort(), i, s, q;
    for (i = 0; i < ids.length; i++) {
      s = state.shows[ids[i]];
      q = s && s.requestId && state.requests ? state.requests[s.requestId] : null;
      if (q && q.kind === 'SWAP' && s.requestId !== (d.firstRequestId || d.swapRequestId) && (s.status === 'CONFIRMED' || s.status === 'PLAYED')) return s;
    }
    return null;
  }

  /* a local band whose first show was yours and that now draws */
  function yourBand(state, c) {
    var i, r, b;
    for (i = 0; i < c.recs.length; i++) {
      r = c.recs[i];
      b = r.firstBand && state.bands ? state.bands[r.firstBand] : null;
      if (!b) continue;
      try { if (SB.Bands.tier(state, b) >= AT.yourBandTier) return b; } catch (e) { /* a band that has ended */ }
    }
    return null;
  }

  function badMonth(state, c) {
    var i, n = c.recs.length;
    if (c.played < AT.badMonthShows) return false;
    if ((c.P.strikes || 0) > 0 || (state.money && (state.money.overdraftMonths || 0) > 0)) return true;
    for (i = 1; i < n; i++) if (BAD[c.recs[i].verdict] && BAD[c.recs[i - 1].verdict] && c.recs[i].day - c.recs[i - 1].day <= AT.badMonthDays && today(state) - c.recs[i].day <= AT.badMonthDays) return true;
    return false;
  }

  /* ---------------- the chapters: open(state, c) and close(state, c, entry) -> slots (an object) or false ---------------- */

  var DEFS = {
    GOING_AWAY: {
      open: function () { return {}; },
      close: function (state, c) {
        var t = c.story.tutorial;
        return (c.story.seen.indexOf('GOING_AWAY_open') >= 0 || !t.on || t.step !== 'ANSWER' || c.played > 0 || week(state) > 0) ? {} : false;
      }
    },
    DOORS_AT_8: {
      open: function (state, c) { return c.story.chapters.GOING_AWAY && c.story.chapters.GOING_AWAY.closed !== null ? {} : false; },
      close: function (state, c) { var r = c.recs[0]; return c.played > 0 && r ? { room: r.roomName, heads: r.heads, showId: r.showId } : false; }
    },
    ANSWER_EVERYONE: {
      open: function (state, c) { return c.played > 0 ? {} : false; },
      close: function (state, c) { return (c.story.counts.replies || 0) >= AT.answered ? {} : false; }
    },
    OUT_OF_STATE: {
      open: function (state, c) {
        var t = liveTouringShow(state), b, r;
        if (t) { b = state.bands && state.bands[t.bandId]; return { band: bandName(state, t.bandId), home: b && b.place ? b.place.name : '', showId: t.show.id }; }
        r = firstRec(c, touringOf);
        return r ? { band: touringOf(r).name, showId: r.showId } : false;
      },
      close: function (state, c) { var r = firstRec(c, touringOf); return r ? { band: touringOf(r).name, heads: r.heads, showId: r.showId } : false; }
    },
    THIN: {
      open: function (state, c) { var r = firstRec(c, function (x) { return BAD[x.verdict]; }); return r ? { room: r.roomName, heads: r.heads, showId: r.showId } : false; },
      close: function (state, c, e) { return firstRec(c, function (x) { return GOOD[x.verdict] && SB.time.week(x.day) >= e.opened && x.showId !== (e.refs && e.refs.showId); }) ? {} : false; }
    },
    FACES: {
      open: function (state, c) {
        var f = (state.regulars && state.regulars.faces) || [];
        return f.length && c.recs.length >= AT.facesShows ? { face: person(state, f[0]) } : false;
      },
      close: function (state) { return ((state.regulars && state.regulars.faces) || []).length >= 3 ? {} : false; }
    },
    ASK_FOR_YOU: {
      open: function (state, c) {
        var q = c.firsts.WORD_OF_MOUTH ? { bandId: (c.firsts.WORD_OF_MOUTH.refs || {}).bandId } : wordOfMouth(state, c), m;
        if (!q) return false;
        if (!c.firsts.WORD_OF_MOUTH && SB.Legacy && SB.Legacy.mark) {
          m = SB.Legacy.mark(state, 'WORD_OF_MOUTH', { bandId: q.bandId || null });
          if (m && SB.Week && SB.Week.log) SB.Week.log(state, [m]);
        }
        return { band: bandName(state, q.bandId) };
      },
      close: function (state, c, e) { return c.played > 0 && week(state) > e.opened ? {} : false; }
    },
    POSTCARD: {
      open: function (state, c) {
        var best = null;
        if (c.played < AT.tuesday) return false;
        Object.keys(c.byBand).sort().forEach(function (id) { if (state.bands && state.bands[id] && c.byBand[id] >= AT.postcardBandShows && (!best || c.byBand[id] > c.byBand[best])) best = id; });
        return best ? { band: bandName(state, best), bandId: best } : false;
      },
      close: function (state, c) { return c.firsts.TOUR ? {} : false; }
    },
    SWAP: {
      open: function (state, c) {
        var s = swapShow(state), q;
        if (!s) return (c.story.counts.swaps || 0) > 0 ? {} : false;
        q = state.requests[s.requestId];
        return { band: bandName(state, q.bandId), showId: s.id };
      },
      close: function (state, c) { return (c.story.counts.swaps || 0) > 0 ? {} : false; }
    },
    YOUR_BAND: {
      open: function (state, c) { var b = yourBand(state, c); return b ? { band: b.name, bandId: b.id } : false; },
      close: function (state, c) { return c.firsts.TOUR ? {} : false; }
    },
    LAST_CALL: {
      open: function (state, c) {
        var room = c.topRoom && state.rooms ? state.rooms[c.topRoom] : null;
        return room && c.byRoom[c.topRoom] >= AT.lastCallShows && closed(room) ? { gone: room.name, why: room.closedWhy || '', roomId: room.id } : false;
      },
      close: function (state, c, e) {
        var id = e.refs && e.refs.roomId, r = firstRec(c, function (x) { return x.roomId !== id && SB.time.week(x.day) >= e.opened; });
        return r ? { newRoom: r.roomName, showId: r.showId } : false;
      }
    },
    ALL_AGES: {
      open: function (state, c) {
        var offer = (c.l.offers || []).filter(function (o) { return o && o.kind === 'ROOM'; })[0];
        return (c.P.stage || 1) >= 3 || offer || c.firsts.OFFER_ROOM ? {} : false;
      },
      close: function (state, c) {
        var f = c.firsts.ROOM_KEPT, room = f && f.refs && f.refs.roomId && state.rooms ? state.rooms[f.refs.roomId] : null;
        return f ? { kept: room ? room.name : '' } : false;
      }
    },
    WATCHING: {
      open: function (state, c) { return (c.P.stage || 1) >= 4 ? {} : false; },
      close: function () { return false; }
    }
  };

  var DROPS = {
    DANA_BRIDGE: function (state, c) { return c.played >= AT.bridge ? {} : false; },
    DANA_BAR_DOOR: function (state, c) { return c.played >= AT.barDoor ? {} : false; },
    DANA_TUESDAY: function (state, c) { return c.played >= AT.tuesday ? {} : false; },
    DANA_BAD_MONTH: function (state, c) { return badMonth(state, c) ? {} : false; },
    ROOM_GONE: function (state, c) {
      var ids = Object.keys(c.byRoom).sort(), i, room;
      for (i = 0; i < ids.length; i++) { room = state.rooms && state.rooms[ids[i]]; if (closed(room)) return { gone: room.name, why: room.closedWhy || '' }; }
      return false;
    },
    COUCH: function (state, c) { return c.P.couch ? {} : false; }
  };

  function queue(state, story, key, more) { story.cutscenes.push({ key: key, slots: slots(state, more) }); }
  function plain(o) { var out = {}, k; for (k in o) if (typeof o[k] === 'string' || typeof o[k] === 'number') out[k] = o[k]; return out; }

  /* -> the ids newly opened or closed, as ['ID', ...] for an opening and ['ID:closed'] for a closing; their cutscenes are queued */
  function check(state) {
    if (!state || typeof state !== 'object') SB.fail('Chapters.check', 'state must be a State');
    var c = context(state), story = c.story, out = [], w = week(state), i, id, def, e, r, pass;
    if (state.clock && state.clock.phase === 'OVER') return out;
    for (pass = 0; pass < 2; pass++) {                        // twice: a chapter closing can open the next in the same check
      for (i = 0; i < IDS.length; i++) {
        id = IDS[i]; def = DEFS[id]; e = story.chapters[id];
        if (!e) {
          r = def.open(state, c);
          if (!r) continue;
          e = story.chapters[id] = { opened: w, closed: null, refs: plain(r) };
          queue(state, story, id + '_open', r);
          out.push(id);
        }
        if (e.closed === null || e.closed === undefined) {
          r = def.close(state, c, e);
          if (!r) continue;
          e.closed = w;
          if (HAS_CLOSE[id]) queue(state, story, id + '_close', r);
          out.push(id + ':closed');
        }
      }
    }
    for (i = 0; i < DROP_IDS.length; i++) {
      id = DROP_IDS[i];
      if (story.drops[id] !== undefined) continue;
      r = DROPS[id](state, c);
      if (!r) continue;
      story.drops[id] = w;
      queue(state, story, id, r);
      out.push(id);
    }
    return out;
  }

  function story0(state) { return state && state.story && typeof state.story === 'object' ? state.story : null; }

  /* the cutscene the UI should play next: { key, slots }, or null (reads only) */
  function nextCutscene(state) {
    var s = story0(state), q = s && isArr(s.cutscenes) ? s.cutscenes : [];
    return q.length ? { key: q[0].key, slots: SB.util.copy(q[0].slots || {}) } : null;
  }

  /* played or skipped: off the queue, into the box */
  function markSeen(state, key) {
    if (typeof key !== 'string' || !key) SB.fail('Chapters.markSeen', 'key must be a cutscene key');
    var s = ensure(state), i;
    for (i = 0; i < s.cutscenes.length; i++) if (s.cutscenes[i].key === key) { s.cutscenes.splice(i, 1); break; }
    if (s.seen.indexOf(key) < 0) s.seen.push(key);
    return { ok: true };
  }

  function text(path) { return !SB.text.off && SB.text.has(path) ? path : null; }

  /* for the box: every chapter that has opened, in order (reads only) */
  function list(state) {
    var s = story0(state), ch = (s && s.chapters) || {}, seen = (s && s.seen) || [], sl = slots(state), out = [];
    IDS.forEach(function (id, n) {
      var e = ch[id], keys, ctx, k;
      if (!e) return;
      ctx = {}; for (k in sl) ctx[k] = sl[k]; for (k in (e.refs || {})) ctx[k] = e.refs[k];
      keys = [id + '_open'];
      if (HAS_CLOSE[id] && e.closed !== null && e.closed !== undefined) keys.push(id + '_close');
      out.push({ id: id, n: n, opened: e.opened, closed: e.closed === undefined ? null : e.closed,
                 title: text('story.chapters.' + id + '.title') ? SB.text.line('story.chapters.' + id + '.title', ctx, null) : '',
                 line: text('story.chapters.' + id + '.line') ? SB.text.line('story.chapters.' + id + '.line', ctx, null) : '',
                 cutscenes: keys.map(function (key) { return { key: key, seen: seen.indexOf(key) >= 0 }; }) });
    });
    return out;
  }

  /* the desk-drops kept in the box (reads only) */
  function drops(state) {
    var s = story0(state), d = (s && s.drops) || {}, seen = (s && s.seen) || [];
    return DROP_IDS.filter(function (id) { return d[id] !== undefined; }).map(function (id) { return { key: id, week: d[id], seen: seen.indexOf(id) >= 0 }; })
      .concat(SB.Moments && SB.Moments.milestones ? SB.Moments.milestones(state) : []);   // the milestones are kept too
  }

  /* The aim on the week page (4.1, D13): one thing to grow toward, with how far along it is. It follows the real scene: a second
   * house show, then a night at a real venue (about two rooms run Thursday to Saturday), then a house show every month, then a
   * touring band at a venue. -> { id, text, have, need } (reads only). Always names one aim. */
  var HOUSE = { HOUSE: 1, DIY: 1, SHOP: 1, OUTDOOR: 1 };
  function aim(state) {
    var shows = state.shows || {}, rooms = state.rooms || {}, ids = Object.keys(shows), played = [], i, sh, kind, months = {}, venueShows = 0, touring = 0,
        monthNow = SB.time.date(today(state)).m, k, y = SB.time.date(today(state)).y;
    for (i = 0; i < ids.length; i++) {
      sh = shows[ids[i]];
      if (!sh || sh.status !== 'PLAYED') continue;
      kind = rooms[sh.roomId] ? rooms[sh.roomId].kind : null;
      played.push(sh);
      if (kind && !HOUSE[kind]) {
        venueShows++;
        if ((sh.bill && sh.bill.slots || []).some(function (s) { return s.role === 'TOURING'; })) touring++;
      } else { k = SB.time.date(sh.day); months[k.y + '-' + k.m] = 1; }
    }
    if (played.length < 2) return { id: 'SECOND_HOUSE', have: played.length, need: 2, text: 'Play a second house show. Shows played: ' + played.length + ' of 2.' };
    if (venueShows < 1) return { id: 'FIRST_VENUE', have: 0, need: 1, text: 'Book a night at a real venue: get on a room’s calendar. Venue nights played: 0 of 1.' };
    var run = 0;
    for (i = 0; i < 3; i++) { k = monthNow - i; var yy = y; while (k < 1) { k += 12; yy--; } if (months[yy + '-' + k]) run++; }
    if (run < 3) return { id: 'MONTHLY_HOUSE', have: run, need: 3, text: 'Keep a house show going every month: ' + run + ' of the last 3 months had one.' };
    if (touring < 1) return { id: 'TOURING_VENUE', have: 0, need: 1, text: 'Bring a touring band to a venue night. Touring nights played: 0 of 1.' };
    return { id: 'KEEP_GOING', have: played.length, need: played.length, text: 'Keep the scene going: ' + played.length + ' shows played so far.' };
  }

  return { check: check, nextCutscene: nextCutscene, markSeen: markSeen, list: list, aim: aim,
           /* beyond the manifest */
           /* beyond the manifest */
           blank: blank, ensure: ensure, slots: slots, walk: walk, billOrder: billOrder, drops: drops, IDS: IDS, DROP_IDS: DROP_IDS };
});
