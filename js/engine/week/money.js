/* Scene Booker — engine/week/money.js
 * SB.Money: the two pots (the show fund and the bank), the ledger, exposure, the bills and the ladder.
 * Owner: E1a. Spec: design/spec/02-engine.md 2.6, 7.11, 7.21; 01-state money; mechanics 8.
 * Stream: MONEY (not drawn from at present: nothing in money is left to chance).
 */
SB.module('Money', function (SB) {
  'use strict';
  var E = SB.Enums, C = SB.Config, U = SB.util;

  /* ------------------------------------------------------------------ */
  /* small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function today(state) { return (state.clock && typeof state.clock.day === 'number') ? state.clock.day : 0; }
  function half(state) { return (state.clock && state.clock.cursor && state.clock.cursor.half) || 'DAY'; }
  function billsOn(state) { return !!(state.settings && state.settings.bills); }
  function pack(state) { try { return SB.Cities.pack(state); } catch (e) { return null; } }
  function priceIndex(state) {
    var p = pack(state);
    return (p && p.money && typeof p.money.priceIndex === 'number') ? p.money.priceIndex : 1;
  }
  function textRng(state) { return SB.rng.stream(state, E.STREAM.TEXT); }

  /* A label from strings.js when it exists, else the key's last part. */
  function label(key, ctx) {
    if (SB.text.has('strings.' + key)) return SB.text.label(key, ctx);
    var parts = String(key).split('.');
    return parts[parts.length - 1];
  }
  /* A line of content when the path holds one, else ''. SPEC?: 03-content names no path for the text of the
   * MONEY, BILLS and LADDER records; 'game.*' is read when a content file supplies it. */
  function say(state, path, slots, fallback) {
    if (SB.text.off) return '';
    if (SB.text.has(path)) return SB.text.line(path, slots || {}, textRng(state));
    return fallback || '';
  }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }

  function rec(state, t, extra, showId) {
    var r = { t: t, day: today(state), half: half(state), showId: showId || null, text: '' }, k;
    for (k in extra) r[k] = extra[k];
    return r;
  }

  function whole(n, where) {
    if (typeof n !== 'number' || !isFinite(n)) SB.fail(where, 'amount is not a finite number: ' + n);
    return Math.round(n);
  }

  function addLine(state, pot, amount, cat, memo, refs) {
    state.money.ledger.push({ day: today(state), pot: pot, amount: amount, cat: cat, memo: memo || '',
                              showId: (refs && refs.showId) || null });
  }

  function checkCat(cat, where) {
    if (!E.MONEY[cat]) SB.fail(where, 'unknown money category ' + cat);
  }

  function billsTotalOf(state) {
    var p = pack(state), bills = (p && p.money && p.money.bills) || C.CITY.BILLS, k, t = 0;
    for (k in bills) t += bills[k];
    return t;
  }

  /* The month's bill lines, halved to COUCH.bills on the couch (spread over the lines by share). */
  function billLines(state) {
    var p = pack(state), bills = (p && p.money && p.money.bills) || C.CITY.BILLS, keys = Object.keys(E.BILL),
        total = 0, lines = [], i, k, a, scale = 1, sum = 0;
    for (i = 0; i < keys.length; i++) total += bills[keys[i]] || 0;
    if (state.player && state.player.couch && total > 0) scale = C.MONEY.COUCH.bills / total;
    for (i = 0; i < keys.length; i++) {
      k = keys[i]; a = Math.round((bills[k] || 0) * scale);
      if (i === keys.length - 1 && scale !== 1) a = C.MONEY.COUCH.bills - sum;   // the couch total is exact
      sum += a;
      lines.push({ k: k, amount: a });
    }
    return lines;
  }

  /* The month whose bills are due at this week's close-out: the month that starts after this week. */
  function dueMonth(state) {
    var w = state.clock.week, t = SB.time.date(w * 7 + 13);
    return { y: t.y, m: t.m };
  }

  /* ------------------------------------------------------------------ */
  /* the pots                                                            */
  /* ------------------------------------------------------------------ */

  function canCover(state, amount) {
    var a = whole(amount, 'Money.canCover'), m = state.money;
    if (a <= 0) return true;
    if (!billsOn(state)) return a <= m.fund;
    return a <= m.fund + Math.max(0, (m.bank || 0) - C.MONEY.OVERDRAFT.limit);
  }

  function spend(state, amount, cat, memo, refs) {
    var a = whole(amount, 'Money.spend'), m = state.money, fromFund, rest;
    checkCat(cat, 'Money.spend');
    if (a <= 0) return U.yes({ from: E.POT.FUND });
    if (!canCover(state, a)) return U.no(E.REFUSE.NO_MONEY, label('refuse.NO_MONEY'));
    fromFund = Math.min(a, Math.max(0, m.fund));
    rest = a - fromFund;
    if (fromFund > 0) { m.fund -= fromFund; addLine(state, E.POT.FUND, -fromFund, cat, memo, refs); }
    if (rest > 0) { m.bank = (m.bank || 0) - rest; addLine(state, E.POT.BANK, -rest, cat, memo, refs); }
    return U.yes({ from: rest > 0 ? E.POT.BANK : E.POT.FUND });
  }

  function earn(state, amount, cat, memo, refs, pot) {
    var a = whole(amount, 'Money.earn'), m = state.money;
    checkCat(cat, 'Money.earn');
    if (!pot) pot = (cat === E.MONEY.WAGES || cat === E.MONEY.LOAN) ? E.POT.BANK : E.POT.FUND;
    // SPEC?: a LOAN is personal money, so it lands in the bank like wages; with bills off everything is the fund.
    if (!billsOn(state)) pot = E.POT.FUND;
    if (!E.POT[pot]) SB.fail('Money.earn', 'unknown pot ' + pot);
    if (a === 0) return;
    if (pot === E.POT.BANK) m.bank = (m.bank || 0) + a; else m.fund += a;
    addLine(state, pot, a, cat, memo, refs);
    if (cat === E.MONEY.LOAN && a > 0 && refs && refs.personId) {
      m.loans.push({ personId: refs.personId, amount: a, dueWeek: state.clock.week + C.MONEY.BORROW.weeks });
    }
  }

  function move(state, amount, from, to) {
    var a, m = state.money;
    if (state.clock.phase === E.PHASE.OVER) return U.no(E.REFUSE.OVER, label('refuse.OVER'));
    if (!billsOn(state)) return U.no(E.REFUSE.INVALID, label('refuse.INVALID'));
    if (!E.POT[from] || !E.POT[to]) SB.fail('Money.move', 'unknown pot');
    a = whole(amount, 'Money.move');
    if (from === to || a <= 0) return U.no(E.REFUSE.INVALID, label('refuse.INVALID'));
    // SPEC?: moving money never dips into the overdraft; only bills and spending do.
    if ((from === E.POT.FUND ? m.fund : (m.bank || 0)) < a) return U.no(E.REFUSE.NO_MONEY, label('refuse.NO_MONEY'));
    if (from === E.POT.FUND) { m.fund -= a; m.bank = (m.bank || 0) + a; }
    else { m.bank -= a; m.fund += a; }
    addLine(state, from, -a, E.MONEY.MOVE, '', null);
    addLine(state, to, a, E.MONEY.MOVE, '', null);
    return U.yes({ fund: m.fund, bank: m.bank });
  }

  /* ------------------------------------------------------------------ */
  /* a show's money                                                      */
  /* ------------------------------------------------------------------ */

  function getShow(state, showId, where) {
    var s = state.shows && state.shows[showId];
    if (!s && SB.Shows && SB.Shows.get) s = SB.Shows.get(state, showId);
    if (!s) SB.fail(where, 'unknown show ' + showId);
    return s;
  }

  function personRate(state, pid) {
    var p = pid && state.people && state.people[pid];
    return (p && typeof p.rate === 'number') ? p.rate : 0;
  }

  function expectedSound(state) {
    var ids = Object.keys(state.people || {}), i, p, best = null;
    for (i = 0; i < ids.length; i++) {
      p = state.people[ids[i]];
      if (!p || (p.state && p.state !== 'ACTIVE') || (p.roles || []).indexOf('SOUND') < 0 || p.met === null || p.met === undefined || typeof p.rate !== 'number') continue;
      if (!best || (p.rel || 0) > (best.rel || 0)) best = p;
    }
    return best ? best.rate : Math.round(C.PAY.SOUND[0] * priceIndex(state));
  }

  function roomTerms(state, show) {
    if (!show.roomId) return null;
    try { return SB.Rooms.terms(state, show.roomId, show.id); } catch (e) { return null; }
  }
  function roomKind(state, show) {
    var r = show.roomId && state.rooms && state.rooms[show.roomId];
    return r ? r.kind : null;
  }

  function optCost(state, type, opt) {
    var j = C.JOBS[type], c = 0;
    if (!j || !j.opt || !opt) return 0;
    if (j.opt === 'PRINT_RUN' && C.FLYER.PRINT[opt]) c = C.FLYER.PRINT[opt].cost;
    else if (j.opt === 'PUSH' && C.CHANNELS.PAID_PUSH[opt]) c = C.CHANNELS.PAID_PUSH[opt].cost;
    else if (j.opt === 'AD' && C.CHANNELS.LOCAL_AD[opt]) c = C.CHANNELS.LOCAL_AD[opt].cost;
    return Math.round(c * priceIndex(state));
  }

  var COUNTED = { ROOM: 1, DEPOSIT: 1, SOUND: 1, SECURITY: 1, HOST: 1, TOURING: 1, LOCAL: 1 };
  /* the show's event insurance not yet bought, when it is chosen or the room needs it (it is bought when the date confirms) */
  function insuranceDue(state, show) {
    var room = show.roomId && state.rooms ? state.rooms[show.roomId] : null, R;
    if (!room || !SB.Rooms || !SB.Rooms.crewRules) return 0;
    R = SB.Rooms.crewRules(state, room.id, show.id).insurance;
    return (show.insure || R.required) && !(R.bought > 0) ? R.cost : 0;
  }
  /* what security costs on the night: the hired person's rate */
  function securityRate(state, crew) { return crew && crew.security ? personRate(state, crew.security) : 0; }

  /* a deal's guarantee is owed only while the touring band is on the bill (as Night's settle) */
  function hasTouring(slots) { return slots.some(function (s) { return s && s.role === 'TOURING'; }); }

  function exposure(state, showId) {
    var show = getShow(state, showId, 'Money.exposure'), lines = [], t = roomTerms(state, show), kind = roomKind(state, show),
        deal = show.deal || {}, slots = (show.bill && show.bill.slots) || [], crew = show.crew || {}, door = show.door || {},
        paidDeposit = false, i, l, total = 0, plan, job, price, comps, sound, planPrint = 0;
    function add(cat, amount, lbl, back) {
      amount = Math.round(amount || 0);
      if (amount > 0) lines.push(back ? { cat: cat, amount: amount, label: lbl || label('money.' + cat), back: true } : { cat: cat, amount: amount, label: lbl || label('money.' + cat) });
    }
    for (i = 0; i < state.money.ledger.length; i++) {
      l = state.money.ledger[i];
      if (l.showId === showId && l.cat === E.MONEY.DEPOSIT && l.amount < 0) paidDeposit = true;
    }
    if (t) {
      add(E.MONEY.ROOM, (t.rent || 0) + (t.houseCosts || 0));
      add(E.MONEY.DEPOSIT, t.deposit || 0, null, true);   // money down, but it comes back at the settle (7.11): not in the total
      if (kind === 'HOUSE') add(E.MONEY.HOST, t.hostCut || 0);
    }
    sound = (t && t.soundFee) ? t.soundFee : personRate(state, crew.sound);
    add(E.MONEY.SOUND, sound);
    add(E.MONEY.SECURITY, securityRate(state, crew));
    add(E.MONEY.INSURANCE, insuranceDue(state, show));
    if (hasTouring(slots) && (deal.shape === 'GUARANTEE' || deal.shape === 'GUARANTEE_PLUS' || deal.shape === 'VERSUS')) add(E.MONEY.TOURING, deal.guarantee || 0);
    for (i = 0; i < slots.length; i++) if (slots[i] && slots[i].role === 'LOCAL' && slots[i].fee > 0) add(E.MONEY.LOCAL, slots[i].fee);
    // money already spent on the show (print, push, food, helpers, art), except what the lines above already count
    for (i = 0; i < state.money.ledger.length; i++) {
      l = state.money.ledger[i];
      if (l.showId !== showId || l.amount >= 0 || COUNTED[l.cat]) continue;
      add(l.cat, -l.amount);
    }
    if (paidDeposit) { /* the deposit line above is the deposit held; it comes back at the settle */ }
    // the priced choices and paid helpers of jobs planned and not yet done
    plan = (state.week && state.week.plan) || [];
    for (i = 0; i < plan.length; i++) {
      job = state.jobs && state.jobs[plan[i].jobId];
      if (!job || job.showId !== showId || job.status === 'DONE') continue;
      if (plan[i].opt) { if (C.JOBS[job.type] && C.JOBS[job.type].opt === 'PRINT_RUN') planPrint += optCost(state, job.type, plan[i].opt); add(C.JOBS[job.type] && C.JOBS[job.type].opt === 'PRINT_RUN' ? E.MONEY.PRINT : E.MONEY.PROMO, optCost(state, job.type, plan[i].opt)); }
      if (plan[i].pay && plan[i].pay.kind === 'CASH') add(E.MONEY.HELPER, plan[i].pay.amount || 0);
    }
    /* fix list 1.5: what the settle will still count that the lines above cannot see (the usual sound person when nobody is hired,
     * the usual print run, a meal promised to the touring band): Forecast.plannedCosts, less what was already counted above */
    if (SB.Forecast && typeof SB.Forecast.plannedCosts === 'function' && show.status !== 'PLAYED' && show.status !== 'CANCELLED') {
      try {
        SB.Forecast.plannedCosts(state, show, null).list.forEach(function (x) {
          if (x.k === 'SOUND' && !sound) add(E.MONEY.SOUND, x.amount);
          else if (x.k === 'FOOD') add(E.MONEY.FOOD, x.amount);
          else if (x.k === 'PRINT' && x.amount > planPrint) add(E.MONEY.PRINT, x.amount - planPrint);
        });
      } catch (e) { /* the forecast cannot read this show yet: the lines stand */ }
    }
    for (i = 0; i < lines.length; i++) if (!lines[i].back) total += lines[i].amount;
    price = door.price || 0; comps = door.comps || 0;
    /* fix list 1.5: the break-even is the one the settle holds to (Forecast.breakEven, paying people, every cost counted); the plain
     * total over price (plus comps) is only the fallback when the forecast cannot read the show yet */
    var be = (door.donation || price <= 0) ? null : Math.ceil(total / price) + comps, fb = null;
    if (be !== null && SB.Forecast && typeof SB.Forecast.breakEven === 'function') {
      try { fb = SB.Forecast.breakEven(state, showId); } catch (e) { fb = null; }
      if (fb && !fb.hat && typeof fb.even === 'number') be = fb.even;
    }
    return { total: total, lines: lines, breakEven: be };
  }

  function liveShows(state) {
    var out = [], id, s;
    for (id in (state.shows || {})) {
      s = state.shows[id];
      if (s && (s.status === 'DRAFT' || s.status === 'CONFIRMED')) out.push(s);
    }
    return out;
  }

  function showLabel(state, show) {
    var r = show.roomId && state.rooms && state.rooms[show.roomId];
    return SB.time.fmt(show.day, 'short') + (r && r.name ? ', ' + r.name : '');
  }

  function owedAhead(state) {
    var from = today(state), to = from + 56, lines = [], total = 0, shows = liveShows(state), i, x, w, d, bt;
    shows.sort(function (a, b) { return a.day - b.day; });
    for (i = 0; i < shows.length; i++) {
      if (shows[i].day < from || shows[i].day >= to) continue;
      x = exposure(state, shows[i].id);
      if (x.total > 0) lines.push({ day: shows[i].day, label: showLabel(state, shows[i]), amount: x.total });
    }
    if (billsOn(state) && !(SB.Rungs && SB.Rungs.billsWaiting(state))) {
      bt = billLines(state).reduce(function (s, b) { return s + b.amount; }, 0) + (state.money.lateFee || 0);
      for (w = state.clock.week; w * 7 < to; w++) {
        if (!SB.time.billsDue(w)) continue;
        d = w * 7 + 7;                                   // the first Monday of the month they pay for, roughly
        if (d < from) continue;
        lines.push({ day: d, label: label('money.BILLS'), amount: bt });
      }
    }
    lines.sort(function (a, b) { return a.day - b.day; });
    for (i = 0; i < lines.length; i++) total += lines[i].amount;
    return { total: total, lines: lines };
  }

  function showAccounts(state, showId) {
    var show = getShow(state, showId, 'Money.showAccounts'), t, kind, deal, door, slots, crew, mid, paid, G, offTop = [],
        offSum = 0, guarantee = 0, locals = [], localSum = 0, left, touringShare = 0, playerCosts = [], costSum = 0,
        i, l, call, after, shareLocals = 0, sound;
    if (show.result && show.result.accounts) return U.copy(show.result.accounts);
    t = roomTerms(state, show); kind = roomKind(state, show); deal = show.deal || {}; door = show.door || {};
    slots = (show.bill && show.bill.slots) || []; crew = show.crew || {};
    try { call = SB.Forecast.call(state, showId); } catch (e) { call = null; }
    mid = (call && typeof call.mid === 'number') ? call.mid : 0;
    paid = Math.max(0, Math.round(mid) - (door.comps || 0));
    G = Math.round(paid * (door.donation ? (door.suggested || door.price || 0) * C.PRICE.HAT_RATE : (door.price || 0)));
    function off(lbl, a) { a = Math.max(0, Math.round(a || 0)); if (a > 0) { offTop.push({ label: lbl, amount: a }); offSum += a; } }
    if (t) {
      if (kind === 'CLUB') {
        off(label('settle.ROOM'), t.houseCosts || 0);
        off(label('settle.ROOM'), (1 - (t.split === null || t.split === undefined ? 1 : t.split)) * Math.max(0, G - (t.houseCosts || 0)));
      } else if (kind === 'HOUSE') off(label('settle.HOST'), t.hostCut || 0);
      else if (kind !== 'BAR') off(label('settle.ROOM'), t.rent || 0);
    }
    sound = (t && t.soundFee) ? t.soundFee : personRate(state, crew.sound);
    /* sound is always hired: before anyone has said yes, what the sound person the booker knows charges (else the going rate) */
    if (!sound && !crew.sound) off(label('settle.SOUND_EXPECTED'), expectedSound(state));
    else off(label('settle.SOUND'), sound);
    off(label('settle.SECURITY'), securityRate(state, crew));
    after = Math.max(0, deal.afterCosts === false ? G : G - offSum);
    switch (hasTouring(slots) ? deal.shape : null) {
      case 'DOOR': guarantee = 0; touringShare = Math.round((deal.pct || 0) * after); break;
      case 'GUARANTEE': guarantee = deal.guarantee || 0; break;
      case 'GUARANTEE_PLUS': guarantee = deal.guarantee || 0; break;
      case 'VERSUS': guarantee = Math.max(deal.guarantee || 0, Math.round((deal.pct || 0) * Math.max(0, G - offSum))); break;
      case 'HAT': touringShare = Math.round((deal.pct || 0) * Math.max(0, G - offSum)); break;
      default: break;
    }
    for (i = 0; i < slots.length; i++) {
      if (slots[i] && slots[i].role === 'LOCAL' && slots[i].fee > 0 && slots[i].pay !== 'SHARE') {
        locals.push({ bandId: slots[i].bandId, amount: slots[i].fee }); localSum += slots[i].fee;
      }
    }
    left = Math.max(0, G - offSum - guarantee - touringShare - localSum);
    if (deal.shape === 'GUARANTEE_PLUS' && hasTouring(slots)) { touringShare = Math.round(C.PLUS_SHARE * left); left -= touringShare; }
    else if (deal.shape === 'GUARANTEE' || !deal.shape) {
      // the custom split of what is left: touring / locals / player
      if (slots.some(function (s) { return s && s.role === 'TOURING'; })) touringShare = Math.round(C.SPLIT.custom[0] * left);
      shareLocals = Math.round(C.SPLIT.custom[1] * left);
      left = Math.max(0, left - touringShare - shareLocals);
    }
    for (i = 0; i < state.money.ledger.length; i++) {
      l = state.money.ledger[i];
      if (l.showId !== showId || l.amount >= 0 || COUNTED[l.cat]) continue;
      playerCosts.push({ label: label('money.' + l.cat), amount: -l.amount }); costSum += -l.amount;
    }
    l = insuranceDue(state, show);
    if (l > 0) { playerCosts.push({ label: label('money.INSURANCE'), amount: l }); costSum += l; }
    return { door: G, offTop: offTop, guarantee: guarantee, locals: locals, left: left, touringShare: touringShare,
             playerCosts: playerCosts, player: left - costSum };
  }

  function ledger(state, filter) {
    var f = filter || {}, out = [], i, l;
    for (i = 0; i < state.money.ledger.length; i++) {
      l = state.money.ledger[i];
      if (f.showId && l.showId !== f.showId) continue;
      if (f.cat && l.cat !== f.cat) continue;
      if (typeof f.fromDay === 'number' && l.day < f.fromDay) continue;
      if (typeof f.toDay === 'number' && l.day > f.toDay) continue;
      out.push(U.copy(l));
    }
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* the bills                                                           */
  /* ------------------------------------------------------------------ */

  /* What the day job pays for a week of shifts, as the weekly close pays it (a view; 1.17: the player can read it on the money page). */
  function weekPay(state) {
    var p = pack(state), W = state.week || {}, P = state.player || {}, pay, n = 0, i;
    if (!billsOn(state) || P.dayJob === 'NONE') return 0;
    pay = (p && p.money && typeof p.money.shiftPay === 'number') ? p.money.shiftPay : Math.round(C.CITY.SHIFT_PAY * priceIndex(state));
    for (i = 0; i < 7; i++) if (W.shifts && W.shifts[i] && (W.dropped || []).indexOf(i) < 0) n++;
    return n * pay;
  }

  function wagesThisMonth(state) {
    var w = state.clock.week, mm = SB.time.date(w * 7 + 6), i, l, t = 0, d;
    for (i = 0; i < state.money.ledger.length; i++) {
      l = state.money.ledger[i];
      if (l.cat !== E.MONEY.WAGES || l.amount <= 0) continue;
      d = SB.time.date(l.day);
      if (d.y === mm.y && d.m === mm.m) t += l.amount;
    }
    return t;
  }

  function hasLender(state) {
    var circle = null;
    try { circle = SB.People.circle(state); } catch (e) { circle = null; }
    return !!(circle && circle.people && circle.people.length);
  }

  function billsView(state) {
    if (!billsOn(state)) return null;
    var lines = billLines(state), m = state.money, lateFee = m.lateFee || 0, total = lateFee, bank = m.bank || 0, i, short,
        P = state.player || {}, ladder = [];
    for (i = 0; i < lines.length; i++) total += lines[i].amount;
    short = bank < total;
    function rung(k, available, why) {
      ladder.push({ k: k, label: label('ladder.' + k + '.name'), available: !!available,
                    why: available ? null : (why || label('refuse.INVALID')) });
    }
    if (short) {
      rung(E.LADDER.OVERDRAFT, bank - total >= C.MONEY.OVERDRAFT.limit, label('refuse.NO_MONEY'));
      rung(E.LADDER.EXTRA_SHIFT, P.dayJob !== 'NONE', label('refuse.INVALID'));
      rung(E.LADDER.BORROW, hasLender(state), label('refuse.RELATIONSHIP'));
      rung(E.LADDER.LATE_RENT, !P.couch, label('refuse.INVALID'));
      rung(E.LADDER.COUCH, !P.couch, label('refuse.ALREADY'));
    }
    return { month: dueMonth(state), lines: lines, lateFee: lateFee, total: total, bank: bank, wages: wagesThisMonth(state),
             after: bank - total, ladder: ladder };
  }

  function billsSettled(state) {
    if (SB.Rungs && SB.Rungs.billsWaiting(state)) return true;   // a guided start: the rent has not started yet
    var due = dueMonth(state), b = state.money.billsMonth;
    return !!(b && b.y === due.y && b.m === due.m);
  }

  function payBills(state, choices) {
    var ch = choices || {}, records = [], m = state.money, P = state.player, lines, i, k, a, pay, late, ladder, paid = 0,
        missed = [], lateKeys = [], lateFee0 = m.lateFee || 0, total = 0, room, borrowFrom, res, jobId;
    if (state.clock.phase === E.PHASE.OVER) return U.no(E.REFUSE.OVER, label('refuse.OVER'));
    if (!billsOn(state)) return U.no(E.REFUSE.INVALID, label('refuse.INVALID'));
    if (billsSettled(state)) return U.no(E.REFUSE.ALREADY, label('refuse.ALREADY'));
    lines = billLines(state);
    pay = Array.isArray(ch.pay) ? ch.pay : lines.map(function (l) { return l.k; });
    late = Array.isArray(ch.late) ? ch.late : [];
    ladder = Array.isArray(ch.ladder) ? ch.ladder : [];
    for (i = 0; i < ladder.length; i++) if (!E.LADDER[ladder[i]]) SB.fail('Money.payBills', 'unknown ladder step ' + ladder[i]);

    // the late fee carried from last month is owed first
    if (lateFee0 > 0) {
      if ((m.bank || 0) - lateFee0 >= C.MONEY.OVERDRAFT.limit) {
        m.bank -= lateFee0; addLine(state, E.POT.BANK, -lateFee0, E.MONEY.FEE, '', null); paid += lateFee0;
      } else missed.push('FEE');
    }
    m.lateFee = 0;
    if (missed.length) m.lateFee += lateFee0;

    for (i = 0; i < lines.length; i++) {
      k = lines[i].k; a = lines[i].amount; total += a;
      // a bill named late, or left out of `pay`, is carried into next month
      if (late.indexOf(k) >= 0 || pay.indexOf(k) < 0) { lateKeys.push(k); m.lateFee += a; continue; }
      if ((m.bank || 0) - a >= C.MONEY.OVERDRAFT.limit) {
        m.bank = (m.bank || 0) - a; addLine(state, E.POT.BANK, -a, E.MONEY.BILLS, label('bill.' + k), null); paid += a;
      } else { missed.push(k); lateKeys.push(k); m.lateFee += a; }
    }
    total += lateFee0;

    // rent paid late is the late-rent step whether or not it was chosen; any other bill not paid is a missed bill
    room = lateKeys.indexOf('RENT') >= 0;
    if (room && ladder.indexOf(E.LADDER.LATE_RENT) < 0) ladder.push(E.LADDER.LATE_RENT);
    for (i = 0; i < lateKeys.length; i++) {
      if (lateKeys[i] !== 'RENT') { SB.Stress.add(state, C.STRESS.UP.BILLS_MISSED, 'BILLS_MISSED'); break; }
    }

    for (i = 0; i < ladder.length; i++) {
      k = ladder[i];
      if (k === E.LADDER.LATE_RENT) {
        m.lateFee += C.MONEY.LATE_RENT.fee;
        P.strikes = (P.strikes || 0) + 1;
        SB.Stress.add(state, C.MONEY.LATE_RENT.stress, 'LATE_RENT');
        if (P.strikes >= C.MONEY.LATE_RENT.strikes && !P.couch) { P.couch = true; records.push(ladderRec(state, E.LADDER.COUCH)); }
      } else if (k === E.LADDER.EXTRA_SHIFT) {
        // An EXTRA_SHIFT job for next week; its wages come when it is worked (Jobs.resolve -> Money.earn WAGES).
        if (P.dayJob === 'NONE') continue;
        res = SB.Week.addJob(state, 'EXTRA_SHIFT', { fromBills: true });
        if (!res.ok) continue;
        jobId = res.jobId;
      } else if (k === E.LADDER.BORROW) {
        borrowFrom = ch.borrowFrom;
        if (!borrowFrom) continue;
        a = Math.max(0, Math.min(C.MONEY.BORROW.max, (m.lateFee || 0) + Math.max(0, -(m.bank || 0))));
        if (a <= 0) a = C.MONEY.BORROW.max;
        res = SB.Mail.ask(state, 'BORROW', borrowFrom, { amount: a, noClock: true });   // asked over the bills, not on an evening's clock
        if (!res || !res.ok) continue;
      } else if (k === E.LADDER.COUCH) {
        if (P.couch) continue;
        P.couch = true;
      }
      // OVERDRAFT is automatic: the bank goes below zero to OVERDRAFT.limit.
      records.push(ladderRec(state, k));
    }
    m.billsMonth = dueMonth(state);
    records.unshift(rec(state, E.REC.BILLS, { total: total, paid: paid, late: lateKeys.slice() }));
    records[0].text = say(state, 'game.BILLS', { total: total, paid: paid },
                          cap(label('money.BILLS')) + ': ' + SB.text.money(paid) + ' / ' + SB.text.money(total));
    if (jobId) records[0].jobId = jobId;
    SB.Week.log(state, records);
    return U.yes({ records: records });
  }

  function ladderRec(state, k) {
    var r = rec(state, E.REC.LADDER, { k: k });
    r.text = say(state, 'game.LADDER.' + k, {}, SB.text.has('strings.ladder.' + k + '.says') ? SB.text.label('ladder.' + k + '.says') : '');
    return r;
  }

  /* ------------------------------------------------------------------ */
  /* the week                                                            */
  /* ------------------------------------------------------------------ */

  function moneyRec(state, amount, cat, pot) {
    var r = rec(state, E.REC.MONEY, { amount: amount, cat: cat, pot: pot });
    r.text = say(state, 'game.MONEY.' + cat, { amount: amount }, cap(label('money.' + cat)) + ': ' + SB.text.money(amount));
    return r;
  }

  function weekly(state) {
    var records = [], m = state.money, W = state.week || {}, P = state.player, p = pack(state), shiftPay, n = 0, i, wages,
        loan, keep = [], person;
    if (billsOn(state)) {
      // wages for the shifts worked this week
      shiftPay = (p && p.money && typeof p.money.shiftPay === 'number') ? p.money.shiftPay : Math.round(C.CITY.SHIFT_PAY * priceIndex(state));
      for (i = 0; i < 7; i++) if (W.shifts && W.shifts[i] && (W.dropped || []).indexOf(i) < 0) n++;
      if (P.dayJob === 'NONE') n = 0;
      wages = n * shiftPay;
      if (wages > 0) { earn(state, wages, E.MONEY.WAGES, '', null, E.POT.BANK); records.push(moneyRec(state, wages, E.MONEY.WAGES, E.POT.BANK)); }
      // the overdraft fee at the month's end
      if (SB.time.billsDue(state.clock.week)) {
        if ((m.bank || 0) < 0) {
          m.overdraftMonths = (m.overdraftMonths || 0) + 1;
          m.bank -= C.MONEY.OVERDRAFT.fee;
          addLine(state, E.POT.BANK, -C.MONEY.OVERDRAFT.fee, E.MONEY.FEE, '', null);
          records.push(moneyRec(state, -C.MONEY.OVERDRAFT.fee, E.MONEY.FEE, E.POT.BANK));
        } else m.overdraftMonths = 0;
      }
      // the couch lasts until the bank reaches COUCH.until
      if (P.couch && (m.bank || 0) >= C.MONEY.COUCH.until) { P.couch = false; P.strikes = 0; }
    }
    // loans falling due: repaid from the bank when it can, else the relationship pays
    for (i = 0; i < m.loans.length; i++) {
      loan = m.loans[i];
      if (loan.dueWeek > state.clock.week) { keep.push(loan); continue; }
      if (billsOn(state) ? (m.bank || 0) >= loan.amount : m.fund >= loan.amount) {
        spendFrom(state, billsOn(state) ? E.POT.BANK : E.POT.FUND, loan.amount, E.MONEY.LOAN);
        records.push(moneyRec(state, -loan.amount, E.MONEY.LOAN, billsOn(state) ? E.POT.BANK : E.POT.FUND));
      } else {
        person = state.people && state.people[loan.personId];
        if (person) records.push(SB.People.adjust(state, loan.personId, C.MONEY.BORROW.rel, 'LOAN'));
      }
    }
    m.loans = keep;
    return records.filter(function (r) { return !!r; });
  }

  function spendFrom(state, pot, amount, cat) {
    var m = state.money;
    if (pot === E.POT.BANK) m.bank = (m.bank || 0) - amount; else m.fund -= amount;
    addLine(state, pot, -amount, cat, '', null);
  }

  return {
    weekPay: weekPay, spend: spend, earn: earn, move: move, canCover: canCover, exposure: exposure, owedAhead: owedAhead,
    showAccounts: showAccounts, ledger: ledger, billsView: billsView, payBills: payBills, weekly: weekly,
    /* not in the manifest: used by Week.nextWeek and Week.close */
    billsSettled: billsSettled, billsTotal: billsTotalOf
  };
});
