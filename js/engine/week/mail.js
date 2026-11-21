/* Scene Booker — engine/week/mail.js   (E1b)
 * SB.Mail: the inbox, asks (anything waiting on another person), replies to requests, the evening send.
 * Spec: design/spec/02-engine.md 2.5, 5.1 (steps 1 and 6), 5.2 (the evening slip); 01-state 2.7.
 * Streams: MAIL (the evening slip), TEXT (only as the rng of SB.text.line).
 *
 * The night clock (design/spec/10-night-clock.md): every message the player writes (an ask of any kind, a reply to a
 * request, a chase) takes Config.MAIL.hours of the evening it is written, through SB.Week.spend, and is refused when
 * that does not fit tonight even staying up. Taking it back the same evening (withdraw, unqueue) gives the time back.
 * What was charged is kept on the item as `paid: { day, hours }`. The evening send itself costs nothing more.
 * An ask the engine makes inside something already paid for (payload.noClock: the dates of a tour route, a quiet
 * word, a loan asked while paying the bills) is not charged.
 *
 * state.mail = { messages: [Message], out: [OutItem], replied: { requestId: day }, extended: { requestId: true } }
 *   out:      what was written that is not an ask and goes out with the evening send: a reply to a request
 *             (INTERESTED, PASS) or a chase. OutItem = { id, kind: 'REPLY' | 'CHASE', action, requestId, askId, args, queuedDay }
 *   replied:  the day a request was first answered (any reply or terms sent), for the ANSWER_REQUEST job
 *   extended: a request whose reply-by date INTERESTED has already pushed back
 *
 * Besides the manifest this module exports one internal the VISIT job needs:
 *   answerInPerson(state, askId, day, half) -> [Record]   the ask is answered on the spot (SEND then DELIVER)
 */
SB.module('Mail', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  var OPEN = { QUEUED: true, SENT: true };
  var ANSWERED = { YES: true, NO: true, COUNTER: true };
  var MSG_FOR = { TERMS: 'BAND', BAND_PLAY: 'BAND', ROOM_HOLD: 'ROOM', ROOM_CONFIRM: 'ROOM', HOLDER_RELEASE: 'BOOKER',
                  CREW: 'CREW', HELPER_JOB: 'HELPER', LODGING: 'HELPER', BORROW: 'HELPER', CONTACT_VET: 'CONTACT',
                  CONTACT_SHARE: 'CONTACT', TOUR_DATE: 'CONTACT', QUIET_WORD: 'BAND' };
  var SHOW_KINDS = { BAND_PLAY: true, ROOM_HOLD: true, ROOM_CONFIRM: true, CREW: true, LODGING: true, CONTACT_SHARE: true };

  /* ------------------------------------------------------------------ */
  /* helpers                                                             */
  /* ------------------------------------------------------------------ */

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function over(state) { return !!(state.clock && state.clock.phase === 'OVER'); }
  function no(code) { return U.no(code, SB.text.label('refuse.' + code)); }
  function mail(state) {
    if (!state.mail) state.mail = {};
    var m = state.mail;
    if (!m.messages) m.messages = [];
    if (!m.out) m.out = [];
    if (!m.replied) m.replied = {};
    if (!m.extended) m.extended = {};
    return m;
  }
  function asks(state) { if (!state.asks) state.asks = {}; return state.asks; }
  /* the guided first show and the "answer everyone" counter hear about it (09a-build-contract) */
  function story(state, what, data) {
    if (what === 'REPLY' && SB.Patches && SB.Patches.replied) SB.Patches.replied(state);
    if (SB.Tutorial && SB.Tutorial.notify) SB.Tutorial.notify(state, what, data);
  }
  function getAsk(state, askId, where) {
    var a = state.asks && state.asks[askId];
    if (!a) SB.fail(where || 'Mail', 'unknown ask "' + askId + '"');
    return a;
  }
  function bandOf(state, id) { return state.bands && id ? state.bands[id] || null : null; }
  function roomOf(state, id) { return state.rooms && id ? state.rooms[id] || null : null; }
  function personOf(state, id) { return state.people && id ? state.people[id] || null : null; }
  function showOf(state, id) { return state.shows && id ? state.shows[id] || null : null; }
  function personName(state, id) {
    var p = personOf(state, id);
    if (!p) return null;
    return p.nick || ((p.first || '') + (p.last ? ' ' + p.last : '')).trim() || null;
  }
  function log(state, records) {
    records = (records || []).filter(Boolean);
    if (records.length && SB.Week && SB.Week.log) SB.Week.log(state, records);
    return records;
  }
  function rec(t, day, half, showId, text, payload) {
    var r = { t: t, day: day, half: half || null, showId: showId || null, text: SB.text.off ? '' : (text || '') }, k;
    for (k in payload) r[k] = payload[k];
    return r;
  }
  function line(state, path, slots, useRng) {
    if (!SB.text.has(path)) return '';
    return SB.text.line(path, slots || {}, useRng === false ? null : SB.rng.stream(state, E.STREAM.TEXT));
  }
  function burnt(state, day) { return !!(state.player && state.player.burnoutUntil != null && state.player.burnoutUntil > day); }

  /* ---- the half hour a message takes (spec 10) ---- */
  function clock() { return SB.Week && SB.Week.spend && SB.Week.fits ? SB.Week : null; }
  /* would one more message fit tonight? -> null, or the refusal (NO_TIME with what it takes and what is left) */
  function noTime(state) {
    var r = clock() ? clock().fits(state, C.MAIL.hours) : null;
    return r && r.ok === false ? r : null;
  }
  /* charge it to tonight and remember it on the item; -> the records of the charge (staying up says so) */
  function pay(state, item) {
    var r = clock() ? clock().spend(state, C.MAIL.hours) : null;
    if (!r || r.ok === false || !r.hours) return [];
    item.paid = { day: r.day, hours: r.hours };
    return r.records || [];
  }
  /* taken back the evening it was written: the time comes back */
  function unpay(state, item) {
    if (item && item.paid && SB.Week && SB.Week.refund) SB.Week.refund(state, item.paid.hours, item.paid.day);
    if (item) item.paid = null;
  }
  function phoneOff(state, day) {
    var w = state.week, idx;
    if (!w || !w.phoneOff || !state.clock) return false;
    idx = day - state.clock.week * 7;
    return w.phoneOff.indexOf(idx) >= 0;
  }

  /* who answers each kind of ask */
  function owner(kind) {
    switch (kind) {
      case 'TERMS': return SB.Requests;
      case 'BAND_PLAY': return SB.Bands;
      case 'ROOM_HOLD': case 'ROOM_CONFIRM': case 'HOLDER_RELEASE': return SB.Rooms;
      case 'CREW': case 'HELPER_JOB': case 'LODGING': case 'BORROW': return SB.People;
      case 'CONTACT_VET': case 'CONTACT_SHARE': case 'TOUR_DATE': return SB.Territory;
      case 'QUIET_WORD': return SB.Harm;
    }
    SB.fail('Mail', 'unknown ask kind "' + kind + '"');
  }

  function toName(state, ask) {
    var b, r, n;
    if (ask.toId == null) return SB.text.has('strings.mail.cold') ? SB.text.label('mail.cold') : '';
    b = bandOf(state, ask.toId); if (b) return b.name;
    r = roomOf(state, ask.toId); if (r) return r.name;
    n = personName(state, ask.toId);
    return n || '';
  }
  function fromOf(state, ask) {
    var b = bandOf(state, ask.toId), r = roomOf(state, ask.toId);
    if (b) return { id: b.contactId || null, name: b.name };
    if (r) return { id: r.ownerId || null, name: personName(state, r.ownerId) || r.name };
    return { id: ask.toId || null, name: personName(state, ask.toId) || '' };
  }

  /* Wait in days as the player knows this person: Bands.replyWindow for a band, else Config.WAIT by who answers. */
  function waitKey(state, ask) {
    var r;
    switch (ask.kind) {
      case 'TERMS': return 'TOURING';
      case 'ROOM_HOLD': case 'ROOM_CONFIRM':
        r = roomOf(state, ask.toId);
        if (!r) return 'HALL';
        if (r.kind === 'HOUSE') return 'HOST';
        if (r.kind === 'BAR' || r.kind === 'CLUB') return 'BAR';
        return 'HALL';
      case 'HOLDER_RELEASE': return 'HOLDER';
      case 'CONTACT_VET': case 'CONTACT_SHARE': case 'TOUR_DATE': return 'CONTACT';
      default: return 'HELPER';
    }
  }
  function windowOf(state, ask) {
    var w;
    if (ask.kind === 'BAND_PLAY' || ask.kind === 'QUIET_WORD') {
      w = SB.Bands && SB.Bands.replyWindow ? SB.Bands.replyWindow(state, ask.toId) : null;
      if (w && typeof w.lo === 'number') return { lo: w.lo, hi: w.hi };
      return { lo: C.WAIT.LOCAL_BAND.min, hi: C.WAIT.LOCAL_BAND.base };
    }
    w = C.WAIT[waitKey(state, ask)];
    return w && w.days ? { lo: w.days[0], hi: w.days[1] } : { lo: 1, hi: 3 };
  }
  function weekdaysOnly(state, ask) { var w = C.WAIT[waitKey(state, ask)]; return !!(w && w.weekdaysOnly); }
  function addDays(start, n, weekdays) {
    var d = start, left = n;
    if (!weekdays) return start + n;
    while (left > 0) { d++; if (SB.time.dow(d) < 5) left--; }
    return d;
  }

  /* The player's own words for an ask (requests.compose), for the outbox and the waiting list. */
  function composeSlots(state, ask) {
    var p = ask.payload || {}, show = showOf(state, ask.showId), day = p.date != null ? p.date : (p.day != null ? p.day : (show ? show.day : null)),
        room = roomOf(state, (show && show.roomId) || p.roomId || (ask.kind === 'ROOM_HOLD' ? ask.toId : null)), t, deal = p.deal || {}, touring = null, b;
    if (show && show.bill) show.bill.slots.forEach(function (s) { if (s.role === 'TOURING' && !touring) touring = bandOf(state, s.bandId); });
    if (!touring && show && show.requestId && state.requests && state.requests[show.requestId]) touring = bandOf(state, state.requests[show.requestId].bandId);
    b = bandOf(state, ask.toId) || bandOf(state, p.bandId);
    t = day != null ? SB.time.date(day) : null;
    return {
      dateLong: day != null ? SB.time.fmt(day, 'dow') + ' the ' + SB.text.ordinal(t.d) : null, dow: day != null ? SB.time.fmt(day, 'dow') : null,
      date: t ? t.d : null, band: b ? b.name : null, touring: touring ? touring.name : null,
      home: touring && touring.place ? touring.place.name : null, room: room ? room.name : null,
      fee: p.fee || null, role: p.role || null, pay: p.pay && typeof p.pay === 'object' ? p.pay.amount : null,
      n: deal.members || null, bands: show && show.bill ? show.bill.slots.length : null,
      curfew: room && room.curfew ? SB.time.clock(room.curfew) : null, amount: p.amount || null,
      guarantee: deal.guarantee || null, doorDeal: deal.shape === 'DOOR', lodging: !!deal.lodging,
      price: show && show.door ? show.door.price : null, ages: show && show.door ? SB.text.label('ages.' + (show.door.ages || 'ALL')) : null,
      host: room ? personName(state, room.ownerId) : null, city: null,
      stay: room && personName(state, room.ownerId) ? personName(state, room.ownerId) + '\'s' : 'my place',
      costs: show && ask.kind === 'TERMS' && SB.Money && SB.Money.showAccounts ? costsOf(state, show) : null
    };
  }
  /* what comes off the top before the door deal (room, host, sound: expected until somebody is hired), as the offer says it */
  function costsOf(state, show) {
    var acc = null;
    try { acc = SB.Money.showAccounts(state, show.id); } catch (e) { acc = null; }
    return acc && acc.offTop ? acc.offTop.reduce(function (t, x) { return t + (x.amount || 0); }, 0) : null;
  }
  function what(state, ask) { return line(state, 'requests.compose.' + ask.kind, composeSlots(state, ask), false); }

  function askView(state, ask) {
    var v = {}, k;
    for (k in ask) if (k !== 'hid' && Object.prototype.hasOwnProperty.call(ask, k)) v[k] = U.copy(ask[k]);
    v.toName = toName(state, ask);
    v.what = what(state, ask);
    v.window = ask.window || windowOf(state, ask);
    v.overdue = ask.status === 'SENT' && ask.sentDay != null && today(state) > ask.sentDay + Math.ceil(v.window.hi) ||
                (ask.status === 'SENT' && ask.needBy != null && today(state) > ask.needBy);
    return v;
  }

  function jobFor(state, ask) {
    var show = showOf(state, ask.showId), ids, i, j;
    var type = { BAND_PLAY: 'ASK_LOCALS', ROOM_HOLD: 'HOLD_ROOM', HOLDER_RELEASE: 'HOLD_ROOM', TERMS: 'AGREE_TERMS',
                 ROOM_CONFIRM: 'CONFIRM_ROOM', CREW: 'LINE_UP_CREW', LODGING: 'LODGING' }[ask.kind];
    if (!show || !type) return null;
    ids = show.jobs || [];
    for (i = 0; i < ids.length; i++) {
      j = state.jobs && state.jobs[ids[i]];
      if (j && j.type === type && (type !== 'ASK_LOCALS' || j.key === ask.toId)) return j.id;
    }
    return null;
  }
  function ensureShow(state, showId) {
    if (showId && showOf(state, showId) && SB.Jobs && SB.Jobs.ensure) SB.Jobs.ensure(state, showId);
  }

  /* ------------------------------------------------------------------ */
  /* the inbox                                                           */
  /* ------------------------------------------------------------------ */

  function messageView(state, m) {
    var v = U.copy(m), ask = m.refs && m.refs.askId && state.asks ? state.asks[m.refs.askId] : null,
        req = m.refs && m.refs.requestId && state.requests ? state.requests[m.refs.requestId] : null;
    v.window = ask && ask.status === 'SENT' ? (ask.window || windowOf(state, ask)) : null;
    v.replyBy = req && req.replyBy != null && (req.status === 'NEW' || req.status === 'REPLIED' || req.status === 'NEGOTIATING') ? req.replyBy : null;
    return v;
  }

  function waitingOn(state, m) {
    var k, a, refs = m.refs || {};
    if (!state.asks) return false;
    for (k in state.asks) {
      a = state.asks[k];
      if (!OPEN[a.status]) continue;
      if (refs.askId && a.id === refs.askId) return true;
      if (refs.requestId && a.requestId === refs.requestId) return true;
    }
    return false;
  }

  function inbox(state, filter) {
    var list = mail(state).messages.slice().reverse();
    filter = filter || 'ALL';
    if (filter === 'NEEDS') list = list.filter(function (m) { return m.needs; });
    else if (filter === 'WAITING') list = list.filter(function (m) { return waitingOn(state, m); });
    else if (filter !== 'ALL') {
      if (!E.MSG[filter]) SB.fail('Mail.inbox', 'unknown filter "' + filter + '"');
      list = list.filter(function (m) { return m.kind === filter; });
    }
    return list.map(function (m) { return messageView(state, m); });
  }

  function findMessage(state, messageId, where) {
    var list = mail(state).messages, i;
    for (i = list.length - 1; i >= 0; i--) if (list[i].id === messageId) return list[i];
    SB.fail(where || 'Mail', 'unknown message "' + messageId + '"');
  }

  function message(state, messageId) { return messageView(state, findMessage(state, messageId, 'Mail.message')); }

  function markRead(state, messageId) {
    var m = findMessage(state, messageId, 'Mail.markRead');
    if (m.read) return no('ALREADY');
    m.read = true;
    return U.yes();
  }

  function post(state, msg) {
    var m = mail(state), id, refs;
    if (!msg || !E.MSG[msg.kind]) SB.fail('Mail.post', 'a message needs a kind from MSG');
    id = U.newId(state, 'm');
    refs = msg.refs || {};
    m.messages.push({
      id: id, kind: msg.kind, fromId: msg.fromId == null ? null : msg.fromId, fromName: msg.fromName || '',
      subject: msg.subject || '', body: msg.body || '', day: typeof msg.day === 'number' ? msg.day : today(state), read: false,
      needs: !!msg.needs,
      refs: { requestId: refs.requestId || null, showId: refs.showId || null, askId: refs.askId || null,
              bandId: refs.bandId || null, offerId: refs.offerId || null },
      keep: !!msg.keep
    });
    return id;
  }

  /* ------------------------------------------------------------------ */
  /* asks                                                                */
  /* ------------------------------------------------------------------ */

  function ask(state, kind, toId, payload) {
    var a, id, k, o, show = null, req = null, flags, records = [], counterOf = null, job;
    if (over(state)) return no('OVER');
    if (!E.ASK[kind]) SB.fail('Mail.ask', 'unknown ask kind "' + kind + '"');
    payload = U.copy(payload || {});
    if (kind !== 'TOUR_DATE' && (toId == null || toId === '')) SB.fail('Mail.ask', kind + ' needs someone to ask');
    if (payload.showId) { show = showOf(state, payload.showId); if (!show) SB.fail('Mail.ask', 'unknown show "' + payload.showId + '"'); }
    else if (SHOW_KINDS[kind]) SB.fail('Mail.ask', kind + ' needs payload.showId');
    if (payload.requestId) { req = state.requests ? state.requests[payload.requestId] : null; if (!req) SB.fail('Mail.ask', 'unknown request "' + payload.requestId + '"'); }
    if ((kind === 'TERMS' || kind === 'CONTACT_VET') && !req) SB.fail('Mail.ask', kind + ' needs payload.requestId');
    if (kind === 'TERMS' && !show) SB.fail('Mail.ask', 'TERMS needs payload.showId');
    if ((kind === 'BAND_PLAY' || kind === 'TERMS' || kind === 'QUIET_WORD') && !bandOf(state, toId) && !(SB.Bands && SB.Bands.get(state, toId))) SB.fail('Mail.ask', 'unknown band "' + toId + '"');
    if ((kind === 'ROOM_HOLD' || kind === 'ROOM_CONFIRM') && !roomOf(state, toId) && !(SB.Rooms && SB.Rooms.get(state, toId))) SB.fail('Mail.ask', 'unknown room "' + toId + '"');
    if (show && (show.status === 'PLAYED' || show.status === 'CANCELLED')) return no('LOCKED');
    /* SPEC?: 2.5 lists no refusal for asking a band onto a bill already locked. Such an ask would open a new
     * ASK_LOCALS while LOCK_BILL, which needs every ASK_LOCALS DONE or MOOT (2.4 canDo), is already DONE. The bill
     * is locked, so the ask is refused (the smaller behavior; the alternative, unlocking the bill, is not in the spec). */
    if (kind === 'BAND_PLAY' && show && show.bill && show.bill.locked) return no('LOCKED');
    if (kind === 'ROOM_HOLD' && payload.day == null) payload.day = show.day;
    if (kind === 'ROOM_HOLD' && payload.slot == null) payload.slot = show.slot || 'EVENING';
    if (kind === 'BAND_PLAY' && SB.Harm && SB.Harm.flags) {
      flags = SB.Harm.flags(state, toId);
      if (flags && flags.listed && flags.listed.length && !payload.confirmList) return no('CONFIRM_LIST');
    }
    /* one open ask of a kind to one person for one show */
    for (k in asks(state)) {
      o = state.asks[k];
      if (o.kind === kind && o.toId === toId && OPEN[o.status] && (o.showId || null) === (payload.showId || null) &&
          (o.requestId || null) === (payload.requestId || null) &&
          (kind !== 'TOUR_DATE' || (o.payload && o.payload.stop) === payload.stop)) return no('ALREADY');
    }
    if (payload.acceptCounter) {
      counterOf = getAsk(state, payload.acceptCounter, 'Mail.ask');
      if (counterOf.status !== 'COUNTER') return no('INVALID');
    }
    if (payload.inPerson && burnt(state, today(state))) return no('BURNT_OUT');
    if (!payload.noClock) { o = noTime(state); if (o) return o; }

    id = U.newId(state, 'a');
    a = { id: id, kind: kind, toId: toId == null ? null : toId, showId: payload.showId || null, jobId: null,
          requestId: payload.requestId || null, payload: payload, status: 'QUEUED', queuedDay: today(state), sentDay: null,
          needBy: typeof payload.needBy === 'number' ? payload.needBy : null, window: null, chased: 0, answer: null, hid: {} };
    a.window = windowOf(state, a);
    state.asks[id] = a;
    if (!payload.noClock) records = pay(state, a);
    /* a counter is answered by the next ask of its kind to the same person: it keeps its status and its answer
       (nothing is lost) and no longer needs the player */
    for (k in state.asks) {
      o = state.asks[k];
      if (o.id !== id && o.status === 'COUNTER' && o.kind === kind && o.toId === a.toId && (o.showId || null) === a.showId &&
          (o.requestId || null) === a.requestId && o.answer && !o.answer.followed) {
        o.answer.followed = id;
        mail(state).messages.forEach(function (msg) { if (msg.refs && msg.refs.askId === o.id) msg.needs = false; });
      }
    }

    if (kind === 'CONTACT_VET' && SB.Jobs && SB.Jobs.add) {
      job = SB.Jobs.add(state, 'VET_ASK_BOOKER', { requestId: payload.requestId });
      if (job && job.ok) a.jobId = job.jobId;
    }
    ensureShow(state, a.showId);
    if (!a.jobId) a.jobId = jobFor(state, a);

    if (counterOf) {
      /* accepting a counter: an ask with the counter's payload, answered YES at once */
      a.status = 'SENT'; a.sentDay = today(state);
      a.hid = { answerDay: today(state), will: 'YES', counter: null };
      records = records.concat(deliverOne(state, a, today(state), state.clock && state.clock.cursor ? state.clock.cursor.half : null).records);
    } else if (payload.inPerson) {
      records = records.concat(answerInPerson(state, id, today(state), state.clock && state.clock.cursor ? state.clock.cursor.half : null));
    }
    if (kind === 'TERMS' && a.status !== 'QUEUED') mail(state).replied[a.requestId] = mail(state).replied[a.requestId] == null ? today(state) : mail(state).replied[a.requestId];
    records = log(state, records);
    story(state, 'ASK', { kind: kind, showId: a.showId || null });
    return U.yes({ askId: id, records: records });
  }

  function withdraw(state, askId, quiet) {
    var a = getAsk(state, askId, 'Mail.withdraw'), records = [], wasSent;
    if (over(state)) return no('OVER');
    if (!OPEN[a.status]) return no('ALREADY');
    wasSent = a.status === 'SENT';
    if (!wasSent) unpay(state, a);                       // never went out: the half hour comes back (the same evening)
    a.status = 'WITHDRAWN';
    a.answer = { status: 'WITHDRAWN', day: today(state), counter: null, text: '' };
    mail(state).out = mail(state).out.filter(function (o) { if (o.askId === a.id) unpay(state, o); return o.askId !== a.id; });
    if (wasSent && !quiet && (a.kind === 'BAND_PLAY' || a.kind === 'TERMS') && SB.Bands && SB.Bands.addTrust) {
      records.push(SB.Bands.addTrust(state, a.toId, 'DROPPED_ASK', { showId: a.showId, scale: 1 }));
    }
    ensureShow(state, a.showId);
    records = log(state, records);
    return U.yes({ records: records });
  }

  function chase(state, askId) {
    var a = getAsk(state, askId, 'Mail.chase'), o;
    if (over(state)) return no('OVER');
    if (a.status !== 'SENT') return no('INVALID');
    if (a.chased) return no('ALREADY');
    o = noTime(state); if (o) return o;
    a.chased = 1;
    o = { id: U.newId(state, 'mo'), kind: 'CHASE', askId: a.id, requestId: null, action: null, args: null, queuedDay: today(state) };
    mail(state).out.push(o);
    return U.yes({ records: log(state, pay(state, o)) });
  }

  function setNeedBy(state, askId, day) {
    var a = getAsk(state, askId, 'Mail.setNeedBy');
    if (over(state)) return no('OVER');
    if (day != null && (typeof day !== 'number' || day !== Math.floor(day))) SB.fail('Mail.setNeedBy', 'day must be a whole day number or null');
    if (day != null && day < today(state)) return no('INVALID');
    if (!OPEN[a.status]) return no('ALREADY');
    a.needBy = day == null ? null : day;
    if (a.hid) a.hid.needByStop = false;
    return U.yes();
  }

  /* ------------------------------------------------------------------ */
  /* replies to requests                                                 */
  /* ------------------------------------------------------------------ */

  function reply(state, requestId, action, args) {
    var req = state.requests ? state.requests[requestId] : null, m = mail(state), r, o;
    if (over(state)) return no('OVER');
    if (!req) SB.fail('Mail.reply', 'unknown request "' + requestId + '"');
    if (!E.REPLY[action]) SB.fail('Mail.reply', 'unknown reply "' + action + '"');
    if (req.status !== 'NEW' && req.status !== 'REPLIED' && req.status !== 'NEGOTIATING') return no('INVALID');
    args = args || {};
    if (m.out.some(function (o) { return o.kind === 'REPLY' && o.requestId === requestId && o.action === action; })) return no('ALREADY');
    if (action === 'OFFER') {
      if (!args.showId || !showOf(state, args.showId)) SB.fail('Mail.reply', 'OFFER needs args.showId');
      if (!req.bandId) return no('INVALID');
      r = ask(state, 'TERMS', req.bandId, { requestId: requestId, showId: args.showId, date: args.date == null ? showOf(state, args.showId).day : args.date,
                                             deal: args.deal || U.copy(showOf(state, args.showId).deal) });
      if (r && r.ok !== false) story(state, 'REPLY', { requestId: requestId, action: action });
      return r;
    }
    if (action === 'INTERESTED' && m.extended[requestId]) return no('ALREADY');
    if (action === 'PASS' && args.tone && !E.PASS_TONE[args.tone]) SB.fail('Mail.reply', 'unknown pass tone "' + args.tone + '"');
    r = noTime(state); if (r) return r;
    o = { id: U.newId(state, 'mo'), kind: 'REPLY', action: action, requestId: requestId, askId: null, args: U.copy(args), queuedDay: today(state) };
    m.out.push(o);
    r = log(state, pay(state, o));
    if (SB.Jobs && SB.Jobs.refreshAll) syncAnswerJob(state, requestId);
    story(state, 'REPLY', { requestId: requestId, action: action });
    return U.yes({ records: r });
  }

  function syncAnswerJob(state, requestId) {
    var k, s;
    if (state.shows) for (k in state.shows) { s = state.shows[k]; if (s.requestId === requestId && (s.status === 'DRAFT' || s.status === 'CONFIRMED')) SB.Jobs.ensure(state, s.id); }
  }

  /* Take back something written that has not gone out yet: a queued ask (by its ask id), or a reply or a chase (by the
   * id Mail.outbox gives it). Written tonight, its half hour comes back. */
  function unqueue(state, id) {
    var m = mail(state), a = state.asks ? state.asks[id] : null, i, o, c;
    if (over(state)) return no('OVER');
    if (a) return a.status === 'QUEUED' ? withdraw(state, id, true) : no('ALREADY');
    for (i = 0; i < m.out.length; i++) if (m.out[i].id === id) break;
    if (i >= m.out.length) return no('INVALID');
    o = m.out.splice(i, 1)[0];
    unpay(state, o);
    if (o.kind === 'CHASE') { c = state.asks ? state.asks[o.askId] : null; if (c) c.chased = 0; }
    else if (o.requestId && SB.Jobs && SB.Jobs.refreshAll) syncAnswerJob(state, o.requestId);
    return U.yes();
  }

  /* ------------------------------------------------------------------ */
  /* the evening send                                                    */
  /* ------------------------------------------------------------------ */

  function send(state, a, day) {
    var res = owner(a.kind).answerAsk(state, a, 'SEND') || {}, days, inPerson = !!(a.payload && a.payload.inPerson), rig;
    a.status = 'SENT';
    a.sentDay = day;
    days = inPerson ? 0 : Math.max(1, Math.ceil(typeof res.days === 'number' && isFinite(res.days) ? res.days : 1));
    a.hid = { answerDay: inPerson ? day : addDays(day, days, weekdaysOnly(state, a)), will: res.will || 'YES',
              counter: res.counter == null ? null : res.counter };
    /* the guided first show: the people the texts name say yes, and soon (SB.Tutorial.rig) */
    rig = SB.Tutorial && SB.Tutorial.rig ? SB.Tutorial.rig(state, a) : null;
    if (rig) { a.hid.will = rig.will; a.hid.counter = null; if (!inPerson && days > rig.days) a.hid.answerDay = addDays(day, rig.days, weekdaysOnly(state, a)); }
    if (a.requestId && (a.kind === 'TERMS') && mail(state).replied[a.requestId] == null) mail(state).replied[a.requestId] = day;
  }

  function queue(state) {
    var items = [], k, a, m = mail(state);
    for (k in asks(state)) { a = state.asks[k]; if (a.status === 'QUEUED') items.push({ ask: a, day: a.queuedDay }); }
    m.out.forEach(function (o, i) { items.push({ out: o, day: o.queuedDay, i: i }); });
    /* an ask for a show in the coming week (sound on Monday for a Thursday) goes out first */
    function soon(it) { var s = it.ask ? showOf(state, it.ask.showId) : null; return s && s.day - today(state) <= 7 ? 0 : 1; }
    return items.sort(function (x, y) { return (soon(x) - soon(y)) || (x.day - y.day); });
  }

  /* Everything written goes out. Each message took its half hour when it was written (spec 10), so the send costs
   * nothing and holds nothing back: `hours` is always 0. */
  function flush(state, day, half) {
    var records = [], items, n = 0, sent = [], m = mail(state), done = [], slips;
    half = half || 'NIGHT';
    if (phoneOff(state, day) || burnt(state, day)) return { records: records, hours: 0 };
    items = queue(state);
    items.forEach(function (it) {
      n++;
      if (it.ask) { send(state, it.ask, day); sent.push(it.ask); ensureShow(state, it.ask.showId); }
      else { records = records.concat(sendOut(state, it.out, day, half)); done.push(it.out.id); }
    });
    m.out = m.out.filter(function (o) { return done.indexOf(o.id) < 0; });
    if (n > 0) {
      slips = eveningSlip(state, sent, day, half);
      records = records.concat(slips);
    }
    return { records: records, hours: 0 };
  }

  function sendOut(state, o, day, half) {
    var req = o.requestId && state.requests ? state.requests[o.requestId] : null, a, remaining, records = [], r, m = mail(state);
    if (o.kind === 'CHASE') {
      a = state.asks ? state.asks[o.askId] : null;
      if (!a || a.status !== 'SENT') return records;
      remaining = a.hid.answerDay - day;
      if (remaining > 1) a.hid.answerDay = day + Math.max(1, Math.ceil(remaining / 2));
      r = relationship(state, a, -1, 'CHASED');
      if (r) records.push(r);
      return records;
    }
    if (!req) return records;
    if (m.replied[req.id] == null) m.replied[req.id] = day;
    if (o.action === 'INTERESTED') {
      /* SPEC?: 2.5 says INTERESTED extends replyBy and the reply marks the request answered, but a Request belongs to
       * E3b and Requests has no function for it; Mail writes request.replyBy (once) and status NEW -> REPLIED */
      if (!m.extended[req.id]) { m.extended[req.id] = true; if (typeof req.replyBy === 'number') req.replyBy += 7; }
      if (req.status === 'NEW') req.status = 'REPLIED';
    } else if (o.action === 'PASS') {
      records = records.concat(SB.Requests.pass(state, req.id, (o.args && o.args.tone) || 'SHORT', (o.args && o.args.referTo) || null) || []);
    }
    syncAnswerJob(state, req.id);
    return records;
  }

  /* relationship -1 (a chase) with whoever was asked */
  function relationship(state, a, d, k) {
    var b = bandOf(state, a.toId);
    if (b) return b.contactId && SB.People && SB.People.adjust ? SB.People.adjust(state, b.contactId, d, k) : null;
    if (roomOf(state, a.toId)) return SB.Rooms && SB.Rooms.adjustRel ? SB.Rooms.adjustRel(state, a.toId, d, k) : null;
    if (state.bookers && state.bookers[a.toId]) return SB.Rooms.adjustBookerRel(state, a.toId, d, k);
    if (state.contacts && state.contacts[a.toId]) return SB.Territory.adjustContact(state, a.toId, d, k);
    if (a.toId && SB.People && SB.People.adjust) return SB.People.adjust(state, a.toId, d, k);
    return null;
  }

  /* At most one slip for the whole evening, at the zone's chance (5.2): SHORT_ANSWER or CREW_UNCONFIRMED. */
  function eveningSlip(state, sent, day, half) {
    var zone = SB.Stress && SB.Stress.zone ? SB.Stress.zone(state) : 'STEADY', p = C.SLIP[zone] || 0, r, kinds = [], kind, tgt, crew, out = [], t;
    if (!(p > 0)) return out;
    r = SB.rng.stream(state, E.STREAM.MAIL);
    if (!r.chance(p)) return out;
    tgt = sent.filter(function (a) { return a.toId && (bandOf(state, a.toId) || personOf(state, a.toId)); });
    if (tgt.length) kinds.push('SHORT_ANSWER');
    crew = Object.keys(state.asks).map(function (k) { return state.asks[k]; }).filter(function (a) {
      var s = showOf(state, a.showId);
      return a.kind === 'CREW' && a.status === 'YES' && s && (s.status === 'DRAFT' || s.status === 'CONFIRMED') && s.day > day &&
             s.crew && s.crew[a.payload.role] === a.toId;
    });
    if (crew.length) kinds.push('CREW_UNCONFIRMED');
    if (!kinds.length) return out;
    kind = r.pick(kinds);
    if (kind === 'SHORT_ANSWER') {
      t = r.pick(tgt);
      if (bandOf(state, t.toId) && SB.Bands && SB.Bands.addTrust) out.push(SB.Bands.addTrust(state, t.toId, 'SHORT_ANSWER', { showId: t.showId, scale: 1 }));
      else if (SB.People && SB.People.adjust) out.push(SB.People.adjust(state, t.toId, C.TRUST_EVENTS.SHORT_ANSWER.size, 'SHORT_ANSWER'));
      out.unshift(rec('SLIP', day, half, t.showId, line(state, 'jobs.slips.SHORT_ANSWER', { band: toName(state, t), person: toName(state, t) }),
                      { jobId: t.jobId || null, slip: 'SHORT_ANSWER' }));
    } else {
      t = r.pick(crew);
      SB.Shows.assignCrew(state, t.showId, t.payload.role, null);
      t.status = 'WITHDRAWN';
      out.unshift(rec('SLIP', day, half, t.showId, line(state, 'jobs.slips.CREW_UNCONFIRMED', { person: toName(state, t), role: t.payload.role }),
                      { jobId: t.jobId || null, slip: 'CREW_UNCONFIRMED' }));
    }
    return out.filter(Boolean);
  }

  /* ------------------------------------------------------------------ */
  /* delivery                                                            */
  /* ------------------------------------------------------------------ */

  function deliverOne(state, a, day, half) {
    var res = owner(a.kind).answerAsk(state, a, 'DELIVER') || {}, status = res.status || 'NO', records = [], from = fromOf(state, a), msgId,
        stop = null, show = showOf(state, a.showId), subject, p = a.payload || {}, hold, r, b;
    if (!ANSWERED[status] && status !== 'SILENT') status = 'NO';
    a.status = status;
    a.answer = { status: status, day: day, counter: res.counter == null ? null : res.counter, text: res.text || '' };
    records = records.concat((res.records || []).filter(Boolean));
    if (status === 'SILENT') { ensureShow(state, a.showId); return { records: records, stop: null }; }
    subject = what(state, a);
    msgId = post(state, { kind: MSG_FOR[a.kind] || 'GAME', fromId: from.id, fromName: from.name, subject: subject, body: res.text || '',
                          day: day, needs: status === 'COUNTER',
                          refs: { askId: a.id, showId: a.showId, requestId: a.requestId, bandId: bandOf(state, a.toId) ? a.toId : (p.bandId || null) } });
    records.push(rec('MESSAGE', day, half, a.showId, '', { messageId: msgId, kind: MSG_FOR[a.kind] || 'GAME', fromName: from.name, needs: status === 'COUNTER' }));
    records.push(rec('ASK_ANSWERED', day, half, a.showId, res.text || '', { askId: a.id, kind: a.kind, status: status, toName: toName(state, a) }));
    if (status === 'COUNTER') stop = { kind: 'REPLY', messageId: msgId };

    if (status === 'YES') {
      switch (a.kind) {
        case 'TERMS':
          if (show && (show.status === 'DRAFT' || show.status === 'CONFIRMED')) {
            SB.Shows.setDeal(state, show.id, p.deal || {}, true);
            SB.Shows.addBand(state, show.id, a.toId, { role: 'TOURING', askId: a.id });
            if (p.date != null && p.date !== show.day) {
              hold = holdOf(state, show.roomId, p.date, show.id);
              if (hold || !show.roomId) { r = SB.Shows.move(state, show.id, { roomId: show.roomId, day: p.date, hold: hold }); if (r && r.records) records = records.concat(r.records); }
            }
            if (SB.Requests && SB.Requests.accept) SB.Requests.accept(state, a.requestId, show.id, show.deal);
          }
          break;
        case 'BAND_PLAY':
          if (show) SB.Shows.addBand(state, show.id, a.toId, { role: 'LOCAL', pay: p.pay || 'FREE', fee: p.fee || 0, askId: a.id, minutes: p.minutes, want: p.wantSlot });
          break;
        case 'ROOM_HOLD':
          if (show) {
            hold = holdOf(state, a.toId, p.day, show.id) || (res.counter && res.counter.hold) || { rank: 1, expires: null };
            r = SB.Shows.move(state, show.id, { roomId: a.toId, day: p.day == null ? show.day : p.day, slot: p.slot, hold: hold });
            if (r && r.records) records = records.concat(r.records);
            records = records.concat(SB.Rooms.firmUp(state, show.id, day) || []);   // their yes books it when nothing is missing
          }
          break;
        case 'ROOM_CONFIRM':
          if (show) records = records.concat(SB.Shows.onConfirmed(state, show.id, day) || []);
          break;
        case 'HOLDER_RELEASE':
          if (show) {
            hold = holdOf(state, p.roomId, p.day, show.id) || { rank: 1, expires: null };
            hold.rank = 1;
            r = SB.Shows.move(state, show.id, { roomId: p.roomId || show.roomId, day: p.day == null ? show.day : p.day, hold: hold });
            if (r && r.records) records = records.concat(r.records);
            records = records.concat(SB.Rooms.firmUp(state, show.id, day) || []);
          }
          break;
        case 'CREW':
          if (show && p.role) SB.Shows.assignCrew(state, show.id, p.role, a.toId);
          break;
        case 'LODGING':
          if (show) SB.Shows.assignCrew(state, show.id, 'lodging', a.toId);
          break;
        case 'BORROW':
          if (p.amount > 0 && SB.Money && SB.Money.earn) {
            SB.Money.earn(state, Math.round(p.amount), 'LOAN', from.name, { personId: a.toId, askId: a.id },
                          state.settings && state.settings.bills === false ? 'FUND' : 'BANK');
            records.push(rec('MONEY', day, half, null, '', { amount: Math.round(p.amount), cat: 'LOAN', pot: state.settings && state.settings.bills === false ? 'FUND' : 'BANK' }));
          }
          break;
        case 'CONTACT_VET':
          if (a.requestId && SB.Requests && SB.Requests.vet) records = records.concat(SB.Requests.vet(state, a.requestId, 'ASK_BOOKER', a.answer) || []);
          break;
        case 'CONTACT_SHARE':
          /* SPEC?: 2.5 says the contact's town hears this show at full out-of-town reach, but names no field; it is kept
           * on the show as promo.contactShares (zone ids) for the model to read */
          if (show) {
            b = shareZone(state, a.toId);
            if (b) { if (!show.promo.contactShares) show.promo.contactShares = []; if (show.promo.contactShares.indexOf(b) < 0) show.promo.contactShares.push(b); }
          }
          break;
      }
    }
    ensureShow(state, a.showId);
    return { records: records.filter(Boolean), stop: stop };
  }

  function holdOf(state, roomId, day, showId) {
    var room = roomOf(state, roomId), cell, i, h, rank = 0;
    if (!room || !room.calendar || day == null) return null;
    cell = room.calendar[day];
    if (!cell || !cell.holds) return null;
    for (i = 0; i < cell.holds.length; i++) {
      h = cell.holds[i];
      if (h.state !== 'CONFIRMED') rank++;
      if (h.by === 'player' && (h.showId == null || h.showId === showId)) return { rank: Math.max(1, rank), expires: h.expires == null ? null : h.expires };
    }
    return null;
  }

  function shareZone(state, contactId) {
    var c = state.contacts ? state.contacts[contactId] : null, k, z;
    if (!c || !c.place || !state.zones) return null;
    for (k in state.zones) {
      z = state.zones[k];
      if (z.name === c.place.name || (c.place.slug && c.place.slug.indexOf(z.id || k) === 0)) return z.id || k;
    }
    return null;
  }

  function deliver(state, day, half) {
    var records = [], stops = [], k, a, r, list = [];
    half = half || 'DAY';
    if (phoneOff(state, day)) return { records: records, stops: stops };
    for (k in asks(state)) list.push(state.asks[k]);
    list.forEach(function (x) {
      if (x.status !== 'SENT' || !x.hid) return;
      if (x.hid.will !== 'SILENT' && x.hid.answerDay != null && x.hid.answerDay <= day) {
        r = deliverOne(state, x, day, half);
        records = records.concat(r.records);
        if (r.stop) stops.push(r.stop);
      }
    });
    list.forEach(function (x) {
      a = x;
      if (a.status === 'SENT' && a.needBy != null && day > a.needBy && !(a.hid && a.hid.needByStop)) {
        a.hid.needByStop = true;
        stops.push({ kind: 'NEED_BY', askId: a.id });
      }
    });
    return { records: records, stops: stops };
  }

  function answerInPerson(state, askId, day, half) {
    var a = getAsk(state, askId, 'Mail.answerInPerson'), r;
    if (!OPEN[a.status]) return [];
    a.payload.inPerson = true;
    send(state, a, day);
    a.hid.answerDay = day;
    if (a.hid.will === 'SILENT') a.hid.will = 'NO';   // someone asked to their face answers
    r = deliverOne(state, a, day, half || null);
    return r.records;
  }

  /* ------------------------------------------------------------------ */
  /* lists                                                               */
  /* ------------------------------------------------------------------ */

  function waiting(state) {
    return Object.keys(asks(state)).map(function (k) { return state.asks[k]; })
      .filter(function (a) { return a.status === 'SENT'; })
      .map(function (a) { return askView(state, a); })
      .sort(function (x, y) { return (x.sentDay || 0) - (y.sentDay || 0); });
  }

  function outbox(state) {
    var m = mail(state), out = Object.keys(asks(state)).map(function (k) { return state.asks[k]; })
      .filter(function (a) { return a.status === 'QUEUED'; }).map(function (a) { return askView(state, a); });
    m.out.forEach(function (o) {
      var req = o.requestId && state.requests ? state.requests[o.requestId] : null, a = o.askId && state.asks ? state.asks[o.askId] : null;
      out.push({ id: o.id, kind: o.kind === 'CHASE' ? 'CHASE' : o.action, toId: req ? req.bandId : (a ? a.toId : null),
                 showId: a ? a.showId : null, requestId: o.requestId, status: 'QUEUED', queuedDay: o.queuedDay,
                 toName: req ? (bandOf(state, req.bandId) ? bandOf(state, req.bandId).name : '') : (a ? toName(state, a) : ''),
                 what: o.kind === 'REPLY' ? line(state, o.action === 'PASS' ? 'requests.pass.' + ((o.args && o.args.tone) || 'SHORT') : 'requests.compose.' + o.action, {}, false) : '',
                 window: null, overdue: false });
    });
    return out;
  }

  function needsYou(state) {
    var out = [], k, req, a, day = today(state), m = mail(state), msg;
    if (state.requests) for (k in state.requests) {
      req = state.requests[k];
      if (req.status !== 'NEW' || m.replied[req.id] != null) continue;
      if (m.out.some(function (o) { return o.requestId === req.id; })) continue;
      msg = req.messageId ? m.messages.filter(function (x) { return x.id === req.messageId; })[0] : null;
      out.push({ k: 'REQUEST', id: req.id, text: msg ? msg.subject : (bandOf(state, req.bandId) ? bandOf(state, req.bandId).name : ''), by: req.replyBy == null ? null : req.replyBy });
    }
    for (k in asks(state)) {
      a = state.asks[k];
      if (a.status === 'COUNTER' && !(a.answer && a.answer.followed)) {
        msg = m.messages.filter(function (x) { return x.refs && x.refs.askId === a.id; })[0];
        out.push({ k: 'COUNTER', id: a.id, text: msg ? (msg.body || msg.subject) : toName(state, a), by: a.requestId && state.requests && state.requests[a.requestId] ? state.requests[a.requestId].replyBy : null });
      }
      if (a.status === 'SENT' && a.needBy != null && day > a.needBy) out.push({ k: 'NEED_BY', id: a.id, text: what(state, a) || toName(state, a), by: a.needBy });
    }
    if (state.rooms) for (k in state.rooms) {
      var room = state.rooms[k], days = room.calendar ? Object.keys(room.calendar).map(Number).sort(function (x, y) { return x - y; }) : [];
      days.forEach(function (d) {
        (room.calendar[d].holds || []).forEach(function (h) {
          if (h.by === 'player' && h.state === 'CHALLENGED') out.push({ k: 'CHALLENGE', id: room.id + ':' + d, text: room.name + ', ' + SB.time.fmt(d, 'short'), by: h.expires == null ? null : h.expires });
        });
      });
    }
    if (state.legacy && state.legacy.offers) state.legacy.offers.forEach(function (o) {
      if (o.status !== 'OPEN') return;
      msg = m.messages.filter(function (x) { return x.refs && x.refs.offerId === o.id; })[0];
      out.push({ k: 'OFFER', id: o.id, text: msg ? msg.subject : '', by: null });
    });
    if (state.harm && state.harm.open) {
      msg = m.messages.filter(function (x) { return x.kind === 'HARM' && x.needs; }).slice(-1)[0];
      out.push({ k: 'HARM', id: state.harm.open.id, text: msg ? msg.subject : '', by: state.harm.open.closesWeek == null ? null : state.harm.open.closesWeek * 7 });
    }
    return out.sort(function (x, y) { return (x.by == null ? 1e9 : x.by) - (y.by == null ? 1e9 : y.by); });
  }

  return {
    inbox: inbox, message: message, markRead: markRead, reply: reply, ask: ask, withdraw: withdraw, chase: chase,
    setNeedBy: setNeedBy, waiting: waiting, needsYou: needsYou, outbox: outbox, post: post, flush: flush, deliver: deliver,
    unqueue: unqueue,
    /* internal outside the manifest (see the header) */
    answerInPerson: answerInPerson
  };
});
