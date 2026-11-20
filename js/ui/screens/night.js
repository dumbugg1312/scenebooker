/* Scene Booker — ui/screens/night.js (UI-B)
 * The show night: the lamp clicks off and the desk is swapped for the door. You work the door all night: a flat lay seen
 * from above, the same photocopied paste-up as the desk, the surface the room gives you (a lectern, a card table, the end
 * of a bar, a tailgate...) under one small light. On it: the clicker (the door count), the drink, the cash box, the set
 * list and a cheap watch, the marker and the hand stamp. Past its top edge, in the dark, the room as heads by generation.
 * Posts land as scraps at the edge; a decision is a note slid onto the surface with tear-off tabs; at the end the cash
 * box is emptied into the envelope line by line.
 * Spec: design/spec/07-desk.md 2, 2b and 3 ("a show night clicks the lamp off"). The screen stages the records
 * Night.begin / next / settle return; it reads Shows.view, Forecast.card, Night.settleView, Jobs.forShow and the show's
 * public fields, and changes state only through SB.UI.act. No rule is computed here: every figure came in a record or a view.
 * The look of the door is drawn from the room (its kind, a seed from its id, its sketch, curfew and ages), never from a rule.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.night = {
    title: 'Show night',
    loading: 'Getting the night ready.',
    noShow: 'There is no show to run here.',
    notYet: 'This show is not confirmed, so there is no night to run.',
    toWeek: 'Back to the desk',
    open: 'Open the doors',
    skip: 'Skip to settle',
    doorsAt: 'Doors {t}',
    bill: 'On the bill',
    callLine: 'Your call {lo}–{hi}',
    parLine: 'Par {par}',
    timeline: 'The set list',
    hardStop: 'Hard stop {t}',
    curfew: 'the room\'s curfew',
    loadIn: 'load-in',
    doors: 'doors',
    door: 'Door count',
    heads: 'in the room',
    turnedAway: '{n} turned away',
    cashBox: 'Cash box',
    cashPending: 'not counted yet',
    hat: 'and the hat',
    heat: 'Heat',
    posts: 'Posts',
    postHeld: 'a post went up',
    now: 'Now',
    nowSet: '{band} is on. {present} here.',
    nowDoors: 'Doors are open. {heads} so far.',
    nowOver: 'The last set is done.',
    nowWait: 'Waiting for the doors.',
    roomLabel: 'The room from the door',
    roomText: '{heads} in the room: {k} kids, {m} in the middle, {o} old heads.',
    kids: 'kids',
    middle: 'middle',
    old: 'old heads',
    envelope: 'The envelope',
    result: 'How it went',
    after: 'After the night',
    yourName: 'Your name',
    standing: 'The town\'s standing',
    reload: 'The night picks up where you left it.',
    stageLine: 'Something changed',
    needsYou: 'needs you',
    short: 'short {gap}',
    youLine: 'You',
    tonight: 'Tonight',
    full: 'full',
    beer: 'Beer', soda: 'Soda', coffee: 'Coffee',
    drinkSay: 'The {drink}. {n} sets in.',
    stamp: 'Stamp',
    marker: 'Marker',
    stampSay: 'The hand stamp and the marker: X on the under-21 hands at an all-ages door.',
    stampSay21: 'The hand stamp: everybody gets one at the door.',
    setsSay: '{n} on the bill. {cur}',
    cashSay: 'The cash box: {cash}.',
    cashSayPending: 'The cash box: counted at the end of the night.',
    counterSay: '{n} in the room: {k} kids, {m} in the middle, {o} old heads.',
    watch: 'Watch',
    peak: 'peak',
    heatSay: 'heat {n}',
    likely: 'likely',
    cannot: 'can\'t:',
    keepCustom: 'the usual split',
    keepFair: 'only what is fair',
    keepNone: 'keep nothing',
    youKeep: 'you keep {n}',
    doorLine: '{paid} paid × {price}',
    tear: 'tear one off',
    lineN: 'the line: {n}',
    lineGone: 'the line: gone home',
    onNow: 'on now: {band}',
    lightsUp: 'lights up · {t}',
    soundcheck: 'soundcheck: {band} · doors {t}',
    openL1: 'Open the',
    openL2: 'doors',
    leaveL1: 'Back to',
    leaveL2: 'the desk'
  };

  function L(key, ctx) { return SB.text.label('ui.night.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function K() { return SB.DeskKit; }
  function D() { return SB.UI.cuDraw; }
  function game() { return SB.UI.game(); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function f(n) { return Math.round(n * 10) / 10; }
  function money(n) { return SB.text.money ? SB.text.money(n || 0) : '$' + Math.round(n || 0); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb, ctx) { return has(key) ? SB.text.label(key, ctx) : (fb === undefined ? '' : fb); }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, ' '); }
  function clock(m) { try { return SB.time.clock(m); } catch (e) { return ''; } }

  var NIGHT_TYPES = { NIGHT_START: 1, TICK: 1, ARRIVALS: 1, SET_START: 1, SET_END: 1, POST: 1, INCIDENT: 1, NIGHT_END: 1 };
  /* The night plays at about MS_PER_MIN of real time per minute of show time (a gap never longer than GAP_MAX), so a two-to-four
   * band night takes about 45 to 90 seconds at normal speed; between counts people come in a few at a time (ARRIVE_STEPS). */
  var MS_PER_MIN = 280, GAP_MAX = 9000, ARRIVE_STEPS = 14;
  var BASE_DELAY = { TICK: 650, ARRIVALS: 500, SET_START: 900, SET_END: 700, POST: 500, INCIDENT: 900, NIGHT_START: 600, NIGHT_END: 900, SETTLE_LINE: 420, SETTLE_DONE: 500 };
  var TONER = '#141413', PAPER = '#f4f2ea', BONE = '#e7ddc4';
  var W = 1280, HT = 800;

  function reducedMotion() {
    var p = null, m = false;
    try { p = SB.UI.prefs && SB.UI.prefs.get('motion'); } catch (e) { p = null; }
    if (p === 'reduce') return true;
    if (p === 'full') return false;
    try { m = !!(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e2) { m = false; }
    return m;
  }
  function speedK() {
    var p = null;
    try { p = SB.UI.prefs && SB.UI.prefs.get('speed'); } catch (e) { p = null; }
    return p === 'fast' ? 0.35 : (p === 'slow' ? 1.5 : 1);
  }

  /* ---------------------------------------------------------------- */
  /* the model the staging builds up, one record at a time             */
  /* ---------------------------------------------------------------- */

  function freshModel() {
    return { par: null, call: null, cap: null, started: false, heads: 0, byGen: [0, 0, 0], turnedAway: null, sets: [], current: null, phase: 'gather',
             now: null, marks: [], ticker: [], posts: [], incidents: [], ended: false, lines: [], settled: false, live: '', arrived: 0 };
  }

  function apply(m, r) {
    var set, i;
    if (num(r.at)) m.now = r.at;
    switch (r.t) {
      case 'NIGHT_START': m.started = true; m.par = r.par; m.call = r.call; m.cap = r.cap; break;
      case 'TICK': if (r.text) m.ticker.push({ at: r.at, text: r.text }); if (num(r.at)) m.marks.push({ at: r.at, text: r.text }); break;
      case 'ARRIVALS': m.arrived += Math.max(0, (r.heads || 0) - m.heads); m.heads = r.heads; m.byGen = (r.byGen || [0, 0, 0]).slice(); break;
      case 'SET_START':
        m.current = { n: r.set, bandId: r.bandId, name: r.name || '', start: r.at, end: null, present: r.present, energy: null, peak: false };
        m.sets.push(m.current); m.phase = 'set';
        if (num(r.present)) m.heads = r.present;
        m.live = L('nowSet', { band: r.name || '', present: num(r.present) ? r.present : m.heads });
        if (r.text) m.ticker.push({ at: r.at, text: r.text });
        break;
      case 'SET_END':
        for (i = m.sets.length - 1; i >= 0; i--) if (m.sets[i].n === r.set) { set = m.sets[i]; break; }
        if (set) { set.end = r.at; set.energy = r.energy; set.peak = !!r.peak; set.fill = r.fill; }
        if (r.byGen) m.byGen = r.byGen.slice();
        if (num(r.present)) m.heads = r.present;
        m.phase = 'change';
        if (r.text) m.ticker.push({ at: r.at, text: r.text });
        break;
      case 'POST': m.posts.push(r.text || L('postHeld')); break;
      case 'INCIDENT': m.incidents.push({ at: r.at, kind: r.kind, q: r.q, text: r.text || '' }); break;
      case 'NIGHT_END': m.ended = true; m.phase = 'leave'; m.turnedAway = r.turnedAway; if (num(r.heads)) m.heads = r.heads; break;
      case 'SETTLE_LINE': m.lines.push({ k: r.k, label: r.label || '', amount: r.amount, running: r.running }); break;
      case 'SETTLE_DONE': m.settled = true; break;
      default: break;
    }
  }

  function modelFrom(records) {
    var m = freshModel();
    (records || []).forEach(function (r) { apply(m, r); });
    return m;
  }

  /* ---------------------------------------------------------------- */
  /* drawing helpers                                                   */
  /* ---------------------------------------------------------------- */

  function costText(c) {
    var chip = (SB.Content.ui.c && SB.Content.ui.c.chip) || {}, k = c.k, v = c.v, label = chip[k] !== undefined ? chip[k] : lower(k), val, sg;
    function sgn(n) { n = Math.round(n * 10) / 10; return (n > 0 ? '+' : (n < 0 ? '−' : '')) + Math.abs(n); }
    if (k === 'MONEY') val = Array.isArray(v) ? money(Math.abs(v[0])) + '–' + money(Math.abs(v[1])) : money(Math.abs(Number(v) || 0));
    else if (Array.isArray(v)) val = sgn(Number(v[0])) + '…' + sgn(Number(v[1]));
    else if (num(Number(v))) val = sgn(Number(v));
    else val = '?';
    if (k === 'MONEY') { sg = Array.isArray(v) ? (v[0] + v[1]) / 2 : Number(v); val = (sg < 0 ? '−' : '+') + val; }
    return [label, c.who || '', val].filter(Boolean).join(' ');
  }

  /* ---------------------------------------------------------------- */
  /* the door: what the room gives you to work on                      */
  /* ---------------------------------------------------------------- */

  /* The look of the room's door, from its kind and a seed from its id: the surface, its damage, the light, the drink.
   * Everything here is appearance; nothing is a rule. */
  function doorLook(room, show) {
    var id = room && room.id ? room.id : 'x', kind = room && room.kind ? room.kind : 'DIY', r = K().rng('door:' + id), sketch = room && num(room.sketch) ? room.sketch : 10,
        noBooze = !!(room && (room.owner === 'CHURCH_CONTACT' || /no alcohol/i.test(room.note || ''))), ages = show && show.door ? show.door.ages : 'ALL', v = Math.floor(r.next() * 4), light, drink;
    var LIGHTS = { HOUSE: ['porch', 'clamp'], DIY: ['trouble', 'string'], HALL: ['tube'], BAR: ['neon'], CLUB: ['clamp', 'neon'], SHOP: ['tube', 'clamp'], OUTDOOR: ['flash'], BIG: ['clamp'] };
    light = (LIGHTS[kind] || ['clamp'])[Math.floor(r.next() * (LIGHTS[kind] || ['clamp']).length)];
    drink = noBooze ? 'coffee' : (kind === 'HALL' || kind === 'SHOP' ? (r.next() < 0.5 ? 'soda' : 'coffee') : 'beer');
    return { kind: kind, seed: id, v: v, light: light, rough: sketch >= 30, sketch: sketch, drink: drink, allAges: ages === 'ALL',
             curfew: room && num(room.curfew) ? room.curfew : null, neon: ['blue', 'pink', 'mint'][Math.floor(r.next() * 3)], r: r };
  }

  /* the pieces on the table are SB.NightScene's (js/art/nightscene.js): the doorway sheet with the line and the band
   * through the door (cut-out photos through the photocopier), the clicker, the tin, the stamp, the watch, the drink */
  function NS() { return SB.NightScene; }
  function rulesFor(id) {
    var list = (SB.Content.strings && SB.Content.strings.flyer && SB.Content.strings.flyer.rules) || [], r, a, b;
    if (list.length < 2) return list.slice();
    r = SB.rng.make('rules:' + id); a = Math.floor(r.next() * list.length); b = (a + 1 + Math.floor(r.next() * (list.length - 1))) % list.length;
    return [list[a], list[b]];
  }

  /* ---------------------------------------------------------------- */
  /* the screen                                                        */
  /* ---------------------------------------------------------------- */

  SB.UI.screen('night', {
    rail: null, title: 'ui.night.title', full: true,
    mount: function (root, params) {
      var S0 = game(), showId = params && params.showId, show = S0 && S0.shows ? S0.shows[showId] : null;
      var model = freshModel(), queue = [], flushing = false, stop = null, timer = null, view = null, savedView = null, fcard = null, photo = null,
          stageRecs = [], doorCache = null, phase = 'init', stopKey = '', alive = true, look = null, onResize = null, said = '';
      var seenLines = 0, heroKey = '', heroLast = { gross: 0, net: 0 }, lastHeads = 0, lastCash = 0, ro = null;
      function F() { return SB.Finish; }
      /* the hero has the light: while a decision or the doors wait, the rest of the table sits back */
      function quiet(on) { el.classList.toggle('is-quiet', !!on); }
      var region = {};
      var el = h('section', { class: 'nt sb-stage' + (reducedMotion() ? ' is-still' : ''), data: { show: showId || '', 'mv-exit': 'wipe' } });
      root.appendChild(el);

      function S() { return game(); }
      function curShow() { var s = S(); return s && s.shows ? s.shows[showId] : null; }
      function roomOf() { return view && view.room ? view.room : null; }

      /* ---------- staging ---------- */
      function delayOf(r) {
        var d = BASE_DELAY[r.t];
        if (d === undefined) return 0;
        if (reducedMotion()) return r.t === 'SET_START' ? 1400 : 0;
        return Math.round(d * speedK());
      }
      function clearTimer() { if (timer) { try { clearTimeout(timer); } catch (e) { /* none */ } timer = null; } }
      /* what has been staged so far (the clock and the count), so arrivals can be spread over the minutes before them */
      var staged = { at: null, heads: 0, byGen: [0, 0, 0] };
      function spreadArrivals(r) {
        var from = staged.heads, to = num(r.heads) ? r.heads : from, t0 = num(staged.at) ? staged.at : (num(r.at) ? r.at - 30 : null), n, k, f, g, gens;
        if (!num(r.at) || !num(t0) || to - from < 2 || r.at <= t0) return;
        n = Math.min(ARRIVE_STEPS, to - from);
        for (k = 1; k < n; k++) {
          f = k / n; gens = [];
          for (g = 0; g < 3; g++) gens.push(Math.round(staged.byGen[g] + ((r.byGen || [0, 0, 0])[g] - staged.byGen[g]) * f));
          queue.push({ t: 'ARRIVALS', at: Math.round(t0 + (r.at - t0) * f), heads: gens[0] + gens[1] + gens[2], byGen: gens, between: true });
        }
      }
      function stage(records) {
        (records || []).forEach(function (r) {
          if (!r || !(NIGHT_TYPES[r.t] || r.t === 'SETTLE_LINE' || r.t === 'SETTLE_DONE' || r.t === 'STAGE')) return;
          if (r.t === 'ARRIVALS' && !reducedMotion()) spreadArrivals(r);
          queue.push(r);
          if (num(r.at)) staged.at = r.at;
          if (r.t === 'ARRIVALS' && num(r.heads)) { staged.heads = r.heads; staged.byGen = (r.byGen || [0, 0, 0]).slice(); }
          else if ((r.t === 'SET_START' || r.t === 'SET_END') && num(r.present)) staged.heads = r.present;
        });
        pump();
      }
      function step() {
        var r = queue.shift(), nx, gap, h0;
        if (!r) return 0;
        h0 = model.heads;
        if (r.t === 'STAGE') stageRecs.push(r); else apply(model, r);
        if (SB.Sfx && !flushing) SB.Sfx.night(r, (model.heads || 0) - (h0 || 0));
        paint(r);
        /* the time to the next thing on the night's clock, so the sets take their time and people visibly arrive */
        nx = queue[0];
        gap = !reducedMotion() && nx && num(nx.at) && num(r.at) && nx.at > r.at ? Math.min(GAP_MAX, (nx.at - r.at) * MS_PER_MIN) * speedK() : 0;
        return Math.max(delayOf(r), Math.round(gap));
      }
      function pump() {
        var d;
        if (timer || !alive) return;
        while (queue.length) {
          d = step();
          if (d > 0) { timer = setTimeout(function () { timer = null; pump(); }, d); return; }
        }
        drained();
      }
      function flush() {
        clearTimer();
        flushing = true;
        try { while (queue.length) step(); } finally { flushing = false; }
        drained();
      }
      function drained() { paintStop(); paintButtons(); }

      /* ---------- actions ---------- */
      function begin() {
        var r = SB.UI.act(function (s) { return SB.Night.begin(s, showId); });
        if (!r) return;
        phase = 'night'; stop = r.stop || null;
        build();
        stage(r.records);
      }
      function choose(optionId, decId) {
        var dec = stop && stop.decision, r;
        if (!dec || (decId && decId !== dec.id)) return;     // a tab of a note already torn: the night has moved on
        /* the torn note goes at once: it is not left on the surface while the night's records play out under it */
        stopKey = 'torn:' + dec.id; quiet(false);
        if (region.stop) SB.UI.clear(region.stop);
        r = SB.UI.act(function (s) { return SB.Night.next(s, showId, { decisionId: dec.id, optionId: optionId }); });
        if (!r) { stopKey = ''; paintStop(true); return; }
        stop = r.stop || null; stopKey = '';
        stage(r.records);
        paintStop();
      }
      function skip() {
        var r = SB.UI.act(function (s) { return SB.Night.auto(s, showId, { untilSettle: true }); }), sh = curShow();
        if (!r) return;
        stop = sh && sh.night ? sh.night.at : stop; stopKey = '';
        stage(r.records);
        flush();
      }
      function settle(choice) {
        var r;
        try { savedView = SB.Night.settleView(S(), showId); } catch (e) { savedView = null; }
        r = SB.UI.act(function (s) { return SB.Night.settle(s, showId, choice); });
        if (!r || r.ok === false) return;
        stop = null; stopKey = '';
        phase = 'settled';
        stage(r.records);
        paintStop();
      }
      function leave() {
        var stages = stageRecs.slice();
        SB.UI.go('week');
        stages.forEach(function (r) {
          var close = function () {}, kids = [h('h2', { class: 'cb-typed nt-stage-h', text: r.text || L('stageLine') })];
          if (r.opens && r.opens.length) kids.push(h('ul', { class: 'nt-stage-list' }, r.opens.map(function (o) { return h('li', { class: 'cb-typed', text: o }); })));
          kids.push(D().act(L('toWeek'), L('toWeek'), 'stage-ok', function () { close(); }));
          try { close = SB.UI.card(h('div', { class: 'sb-stage-card cb-piece cb-stock-bone nt-stagecard' }, kids), {}); } catch (e) { /* the card is a courtesy */ }
        });
      }
      function say(t) { said = t; paintNow(); }

      /* ---------- the working objects ---------- */
      function settling() { return phase === 'settled' || model.ended || !!(curShow() && curShow().status === 'PLAYED'); }
      function hhmm(m) { var t = clock(m); return /:/.test(t) ? t : (t ? t + ':00' : '--:--'); }
      function put(host, x) { (Array.isArray(x) ? x : [x]).forEach(function (e) { if (e) host.appendChild(e); }); }
      function bandNames() { return (view ? view.bands : []).map(function (b) { return (b.band && b.band.name) || ''; }); }
      /* how many are still out front: an appearance only, from the town's number and the count so far */
      function lineCount() {
        var base = num(model.par) ? model.par : (fcard && fcard.par && num(fcard.par.heads) ? fcard.par.heads : 20);
        if (settling()) return 0;
        if (!model.started) return Math.max(2, Math.min(8, Math.round(base / 4)));
        return Math.max(0, Math.min(8, Math.round((base - (model.heads || 0)) / 4)));
      }
      function paintCrowd() {
        var room = roomOf(), sx = settling(), cur = model.current && model.phase === 'set' ? model.current : null, n = lineCount(), names = bandNames(), sh = curShow();
        if (!region.door || !photo) return;
        photo.paint({ room: NS().doorKind(room), phase: sx ? 'settle' : (cur ? 'set' : 'doors'), band: cur ? cur.name : (names[0] || ''), bands: names,
                      seed: String((S() && S().seed) || ''), paper: NS().paperFor(room ? room.id : showId), line: n },
          L('roomLabel') + (room && room.name ? ', ' + room.name : '') + ': ' + L('roomText', { heads: model.heads, k: model.byGen[0], m: model.byGen[1], o: model.byGen[2] }));
        SB.UI.clear(region.door);
        put(region.door, NS().parts.label(String(n > 0 ? L('lineN', { n: n }) : (sx ? L('lineGone') : L('lineN', { n: 0 }))).toUpperCase(), 'lineLbl', sx));
        put(region.door, NS().parts.label((cur ? L('onNow', { band: cur.name }) : (sx ? (model.ended && num(model.now) ? L('lightsUp', { t: clock(model.now) }) : L('nowOver')) :
          L('soundcheck', { band: names[0] || '', t: sh && sh.bill && num(sh.bill.doors) ? clock(sh.bill.doors) : '' }))).toUpperCase(), 'onLbl', sx, true));
        if (region.live) region.live.textContent = model.live || '';
      }
      function paintSetList() {
        var host = region.setlist, sh = curShow(), bands = view ? view.bands : [], doors = sh && sh.bill ? sh.bill.doors : null, room = roomOf(), sx = settling(),
            curfew = room && num(room.curfew) ? room.curfew : null, loadIn = null, cur = model.current && model.phase === 'set' ? model.current.name : '', t = num(model.now) ? hhmm(model.now) : '--:--', d;
        if (!host) return;
        model.marks.forEach(function (mk) { if (num(doors) && mk.at < doors && loadIn === null) loadIn = clock(mk.at); });
        d = { title: word('ui.c.bill', L('timeline')), doors: num(doors) ? L('doorsAt', { t: clock(doors) }).toUpperCase() + (loadIn ? '   ' + L('loadIn') + ' ' + loadIn : '') : '',
              stop: curfew !== null ? L('hardStop', { t: clock(curfew) }).toUpperCase() : '',
              bands: bands.map(function (b, i) {
                var played = model.sets[i] || null, on = !!(played && !num(played.end)), done = !!(played && num(played.end)), st = played ? played.start : b.start;
                return { start: num(st) ? hhmm(st) : '', name: (b.band && b.band.name) || '', state: on ? 'on' : (done ? 'done' : 'next'),
                         note: done && num(played.energy) ? L('heatSay', { n: Math.round(played.energy * 100) }) + (played.peak ? ' · ' + L('peak') : '') : '' };
              }) };
        SB.UI.clear(host);
        put(host, NS().parts.setList(d, L('timeline') + ': ' + d.bands.map(function (b) { return b.start + ' ' + b.name + (b.state === 'on' ? ', ' + L('now').toLowerCase() : ''); }).join(', ') + (d.stop ? '. ' + d.stop : ''),
          function () { say(L('setsSay', { n: bands.length, cur: cur ? L('nowSet', { band: cur, present: model.heads }) : '' })); }, sx));
        paintWatch();
      }
      function paintWatch() {
        var t = num(model.now) ? hhmm(model.now) : '--:--';
        if (!region.watch) return;
        SB.UI.clear(region.watch);
        put(region.watch, NS().parts.thing({ kind: 'watch', art: { time: t }, name: 'watch', cls: 'nt-watch nc-watch', label: L('watch') + ' ' + (num(model.now) ? clock(model.now) : ''),
          onClick: function () { say(L('watch') + ' ' + t); } }, settling()));
      }
      function cashFigure() {
        var sh = curShow(), sv, gross = null, hat = null;
        if (doorCache) { gross = doorCache.gross; hat = doorCache.hat; }
        if (model.ended && !doorCache && phase !== 'settled') { try { sv = SB.Night.settleView(S(), showId); if (sv && sv.door && num(sv.door.gross)) { gross = sv.door.gross; hat = sv.door.hat; doorCache = { gross: gross, hat: hat }; } } catch (e) { sv = null; } }
        if (gross === null && sh && sh.result && sh.result.door) { gross = sh.result.door.gross; hat = sh.result.door.hat; }
        return { gross: gross, hat: hat };
      }
      /* the door count and the cash count up (three held frames) when they change; a flush just sets them */
      function countChip(host, to, from, fmt) {
        var n = host.querySelector('.nc-chip span');
        if (!n || flushing || !F() || to === from) return;
        F().countUp(n, to, { from: from, fmt: fmt });
      }
      function paintDoor() {
        var host = region.counter, c = cashFigure(), cash = c.gross === null ? '?' : money(c.gross) + (num(c.hat) && c.hat > 0 ? ' +' + money(c.hat) : ''), sx = settling(), P = NS().parts,
            sayCash = c.gross === null ? L('cashSayPending') : L('cashSay', { cash: money(c.gross) + (num(c.hat) && c.hat > 0 ? ' ' + L('hat') + ' ' + money(c.hat) : '') }),
            counterSay = L('counterSay', { n: model.heads, k: model.byGen[0], m: model.byGen[1], o: model.byGen[2] }) + (model.ended && model.turnedAway > 0 ? ' ' + L('turnedAway', { n: model.turnedAway }) + '.' : ''),
            par = num(model.par) ? model.par : (fcard && fcard.par && num(fcard.par.heads) ? fcard.par.heads : null),
            call = model.call || (fcard && fcard.call ? fcard.call : null), cap = num(model.cap) && model.cap > 0 ? model.cap : (fcard && num(fcard.cap) && fcard.cap > 0 ? fcard.cap : null),
            drinkSay = L('drinkSay', { drink: L(look.drink).toLowerCase(), n: model.sets.length }), aria = [];
        if (!host) return;
        SB.UI.clear(region.counter); SB.UI.clear(region.cash); SB.UI.clear(region.drink); SB.UI.clear(region.call);
        put(region.counter, P.thing({ kind: 'clicker', art: { count: model.heads }, name: 'clicker', cls: 'nt-counter nc-clicker', label: L('door') + ': ' + counterSay, onClick: function () { say(counterSay); } }, sx));
        put(region.counter, P.chip(null, String(model.heads || 0), 'doorChip'));
        countChip(region.counter, model.heads || 0, lastHeads, String);
        lastHeads = model.heads || 0;
        put(region.counter, P.strip(model.byGen[0] + ' ' + L('kids') + ' · ' + model.byGen[1] + ' ' + L('middle') + ' · ' + model.byGen[2] + ' ' + L('old'), 'gens', sx));
        if (num(par)) aria.push(word('ui.c.par', 'par') + ' ' + par);
        if (call) aria.push(L('callLine', { lo: call.lo, hi: call.hi }));
        if (cap) aria.push(SB.text.label('ui.c.cap', { n: cap }));
        if (model.ended && model.turnedAway > 0) aria.push(L('turnedAway', { n: model.turnedAway }));
        if (aria.length) put(region.call, P.tally({ parLabel: word('ui.c.par', 'TOWN EXPECTS'), par: num(par) ? par : null, callLabel: word('ui.c.call', 'YOUR CALL'), lo: call ? call.lo : null, hi: call ? call.hi : null,
          cap: cap ? SB.text.label('ui.c.cap', { n: cap }).toUpperCase() : '', away: model.ended && model.turnedAway > 0 ? L('turnedAway', { n: model.turnedAway }) : '', aria: aria.join('. ') + '.' }, sx));
        put(region.cash, P.thing({ kind: 'tin', art: { fill: Math.min(1, (model.heads || 0) / Math.max(10, cap || 40)), empty: sx, seed: sx ? 'out' : 'in', size: 0.86 }, name: 'tin', cls: 'nt-cash',
          label: L('cashBox') + ': ' + sayCash, onClick: function () { say(sayCash); } }, sx));
        put(region.cash, P.chip(null, cash === '?' ? L('cashPending') : cash, 'cashChip'));
        if (c.gross !== null) { countChip(region.cash, c.gross, lastCash, function (n) { return money(n) + (num(c.hat) && c.hat > 0 ? ' +' + money(c.hat) : ''); }); lastCash = c.gross; }
        put(region.drink, P.thing({ kind: 'rings', art: { n: Math.min(5, 1 + model.sets.length), seed: showId }, name: 'rings' }, sx));
        put(region.drink, P.thing({ kind: 'can', art: { empty: !!model.ended, cup: look.drink === 'coffee' }, name: 'can', cls: 'nt-drink', label: L(look.drink), onClick: function () { say(drinkSay); } }, sx));
        put(region.drink, P.card(L(look.drink), rulesFor(look.seed), sx));
      }
      function paintStamp() {
        var sx = settling(), key = sx ? 's' : 'n';
        if (!region.stamp || region.stamp.getAttribute('data-mode') === key) return;
        region.stamp.setAttribute('data-mode', key);
        SB.UI.clear(region.stamp);
        put(region.stamp, NS().parts.thing({ kind: 'stamp', art: { size: sx ? 0.62 : 1 }, name: 'stamp', cls: 'nt-stampset', label: L('stamp') + ', ' + L('marker'),
          onClick: function () { say(look.allAges ? L('stampSay') : L('stampSay21')); } }, sx));
        put(region.stamp, NS().parts.thing({ kind: 'marker', art: { size: sx ? 0.7 : 1 }, name: 'marker' }, sx));
      }
      function paintPosts() {
        var host = region.posts, items = [];
        if (!host) return;
        SB.UI.clear(host);
        model.posts.slice(-2).forEach(function (t) { items.push({ t: t, kind: 'post' }); });
        model.incidents.slice(-2).forEach(function (x) { items.push({ t: (num(x.at) ? clock(x.at) + ' ' : '') + x.text + (num(x.q) && x.q !== 0 ? ' (' + costText({ k: 'Q', v: x.q }) + ')' : ''), kind: 'inc' }); });
        items.forEach(function (it, n) { host.appendChild(NS().parts.scrap(it.t, it.kind, n)); });
      }
      /* the cash counted out on the table, a pile for each line of the envelope */
      function paintPiles() {
        var host = region.piles, lines = [];
        if (!host) return;
        SB.UI.clear(host);
        if (phase === 'settled' && curShow() && curShow().result && !queue.length) return;      // paid out: the piles are gone
        if (phase === 'settled' || model.lines.length) lines = model.lines;
        else if (stop && stop.kind === 'SETTLE' && savedView) lines = savedView.lines || [];
        put(host, NS().parts.piles(lines.filter(function (l) { return num(l.amount) && l.amount !== 0; }).map(function (l) {
          var p = NS().pileOf(l.amount); return { who: l.label || lower(l.k), amount: money(Math.abs(l.amount)), n: p.n, bill: p.bill };
        })));
      }
      function paintNow() {
        var host = region.now, cur = model.current, line;
        if (!host) return;
        SB.UI.clear(host);
        if (said) line = said;
        else if (!model.started) line = L('nowWait');
        else if (model.ended) line = L('nowOver');
        else if (model.phase === 'set' && cur) line = L('nowSet', { band: cur.name, present: num(cur.present) ? cur.present : model.heads });
        else line = L('nowDoors', { heads: model.heads });
        host.appendChild(h('p', { class: 'cb-typed nt-now-line nc-now nc-piece', style: NS().layout.at(34, 768, -0.8) }, [line, !said && model.ticker.length ? h('span', { class: 'nt-now-tick', text: ' · ' + model.ticker[model.ticker.length - 1].text }) : null]));
      }
      function paint(r) {
        if (r && r.t === 'POST') { paintPosts(); return; }
        if (r && r.t === 'TICK') { paintSetList(); paintNow(); return; }
        if (r && r.between) { paintCrowd(); paintDoor(); paintWatch(); paintNow(); return; }   // someone else through the door: the clicker clicks
        if (r && (r.t === 'SETTLE_LINE' || r.t === 'SETTLE_DONE')) { stopKey = ''; paintStop(true); paintDoor(); paintPiles(); return; }
        said = '';
        paintCrowd(); paintSetList(); paintDoor(); paintStamp(); paintPosts(); paintPiles(); paintNow();
      }

      function paintButtons() {
        var host = region.actions, sh = curShow(), dec = stop && stop.kind === 'DECISION';
        if (!host) return;
        SB.UI.clear(host);
        if (phase === 'night' && sh && sh.night && !dec && !model.ended)
          host.appendChild(h('button', { type: 'button', class: 'nc-piece nc-btn pz-hl', style: NS().layout.at(1100, 762, -2), aria: { label: L('skip') }, data: { fk: 'skip' }, on: { click: skip } }, [h('span', { text: L('skip') })]));
      }

      /* ---------- the note slid onto the surface, the envelope, how it went ---------- */
      /* a tear-off tab: a perforated slip; the words of the choice, then what it costs */
      function tab(o, i, onPick) {
        var dis = o.enabled === false, costs = (o.costs || []).map(costText);
        return h('button', { type: 'button', class: 'nt-tab pz-hl', disabled: dis, data: { fk: 'opt-' + i, option: o.id || null },
                             aria: { label: (i + 1) + '. ' + (o.label || '') + (costs.length ? '. ' + costs.join(', ') : '') + (dis && o.why ? '. ' + L('cannot') + ' ' + o.why : '') },
                             on: { click: function () { if (!dis) onPick(o); } } }, [
          h('span', { class: 'nt-tab-n', aria: { hidden: 'true' }, text: String(i + 1) }),
          h('span', { class: 'nt-tab-label', text: o.label || '' }),
          costs.length ? h('span', { class: 'nt-tab-costs' }, costs.map(function (c) { return h('span', { class: 'nt-cost', text: c }); })) : null,
          o.likely ? h('span', { class: 'nt-tab-likely', text: L('likely') + ': ' + o.likely }) : null,
          dis && o.why ? h('span', { class: 'nt-tab-why', text: L('cannot') + ' ' + o.why }) : null
        ]);
      }
      function tabRow(opts, onPick, label, tut) {
        return h('div', { class: 'nt-tabs', role: 'group', aria: { label: label || L('tear') }, data: { tut: tut || null, 'tut-ref': tut ? showId || null : null },
          on: { keydown: function (e) { var n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length && opts[n - 1].enabled !== false) { e.preventDefault(); onPick(opts[n - 1]); } } } },
          opts.map(function (o, i) { return tab(o, i, onPick); }));
      }
      function noteFor(dec) {
        var bang = D().art(D().bang(4, 52, 52), 88, 70);
        var el2 = h('section', { class: 'nt-note cb-piece cb-stock-white', role: 'group', tabindex: '-1', aria: { live: 'assertive', label: (dec.title || '') + ' ' + L('needsYou') } }, [
          h('div', { class: 'nt-note-head' }, [bang, h('h2', { class: 'nt-note-title', text: dec.title || '' })]),
          dec.body ? h('p', { class: 'cb-typed nt-note-body', text: dec.body }) : null,
          tabRow((dec.options || []).slice(0, 4), function (o) { choose(o.id, dec.id); }, dec.title)
        ]);
        if (F()) F().move(el2, 'stamp', { cue: 'stamp', cueAt: 83, cueOpts: { gain: -5 } });
        if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { try { var b = el2.querySelector('.nt-tab:not([disabled])'); if (b) b.focus(); } catch (e) { /* fine */ } });
        return el2;
      }
      function envelope(v, lines, done) {
        var kids = [], split, opts, shN = curShow(), hero, heroN, heroV, key, from;
        var netV = done && shN ? (shN.result && num(shN.result.playerNet) ? shN.result.playerNet : (shN.night && shN.night.settled ? shN.night.settled.playerNet : null)) : null;
        kids.push(h('div', { class: 'nt-env-flap', aria: { hidden: 'true' } }));
        kids.push(D().word(L('envelope'), 26, { cls: 'nt-env-h' }));
        /* the hero: the night's money, stamped on and counted up; once it is paid out, what you keep */
        key = num(netV) ? 'net' : 'gross';
        heroV = key === 'net' ? netV : (v && v.door && num(v.door.gross) ? v.door.gross : null);
        if (heroV !== null) {
          heroN = h('strong', { class: 'nt-fig nt-hero-n', text: (key === 'net' && heroV > 0 ? '+' : '') + money(heroV) });
          hero = h('p', { class: 'nt-hero nt-hero--' + key, data: { n: String(heroV) } }, [key === 'net' ? h('span', { class: 'cb-typed nt-hero-k', text: SB.text.label('settle.NET') }) : null, heroN]);
          kids.push(hero);
          from = heroKey === key ? heroLast[key] : 0;
          if (F()) {
            if (heroKey !== key) F().move(hero, 'stamp', { cue: 'stamp', cueAt: 83, cueOpts: { gain: -5 } });
            F().countUp(heroN, heroV, { from: from, delay: heroKey !== key ? 83 : 0, fmt: function (n) { return (key === 'net' && n > 0 ? '+' : '') + money(n); } });
          }
          heroKey = key; heroLast[key] = heroV;
        }
        if (v && v.door) {
          kids.push(h('p', { class: 'cb-typed nt-env-door' }, [L('doorLine', { paid: v.door.paid, price: money(v.door.price || 0) })]));
          if (v.door.hat) kids.push(h('p', { class: 'cb-typed nt-env-door' }, [L('hat') + ' ', h('strong', { class: 'nt-fig', text: money(v.door.hat) })]));
        }
        kids.push(h('ol', { class: 'nt-env-lines' }, lines.map(function (l, i) {
          var fresh = i >= seenLines;
          return h('li', { class: 'nt-env-line' + (l.k === 'YOU' ? ' is-you' : '') + (fresh ? ' mv-slap' : ''), style: { '--i': String(Math.max(0, i - seenLines)) }, data: { tut: ({ ROOM: 'settle-pay-room', SOUND: 'settle-pay-sound', SHARE: 'settle-pay-touring', LOCAL: 'settle-pay-local' })[l.k] || null, 'tut-ref': showId || null } }, [
            h('span', { class: 'cb-typed nt-env-label', text: l.label || '' }),
            h('span', { class: 'nt-fig', text: num(l.amount) ? money(l.amount) : '' }),
            num(l.running) ? h('span', { class: 'nt-env-run', text: money(l.running) }) : null
          ]);
        })));
        seenLines = lines.length;
        if (v && !done) {
          if (num(v.gap) && v.gap > 0) {
            var gapT = L('short', { gap: money(v.gap) }).toUpperCase(), gapW = K().markerWidth(gapT, 22) + 24;
            kids.push(h('p', { class: 'nt-env-gap' }, [D().art(D().swipe(0, 22, gapW - 10, 22) + K().marker(gapT, 6, 32, 22, { seed: 'gap' }), gapW, 44)]));
            opts = (v.shortfall || []).map(function (o) { return { id: o.k, label: o.label || lower(o.k), costs: o.costs || [], enabled: o.enabled, why: o.why }; });
            kids.push(tabRow(opts, function (o) { settle({ shortfall: o.id, keep: 0 }); }, L('short', { gap: money(v.gap) }), 'settle-done'));
          } else {
            split = v.split || {};
            opts = [];
            if (split.custom && num(split.custom[2])) opts.push({ id: 'custom', label: L('keepCustom'), costs: [], likely: L('youKeep', { n: money(split.custom[2]) }), keep: split.custom[2] });
            if (num(split.fairMax)) opts.push({ id: 'fair', label: L('keepFair'), costs: [], likely: L('youKeep', { n: money(split.fairMax) }), keep: split.fairMax });
            opts.push({ id: 'none', label: L('keepNone'), costs: [], likely: L('youKeep', { n: money(0) }), keep: 0 });
            kids.push(tabRow(opts, function (o) { settle({ shortfall: null, keep: o.keep }); }, L('envelope'), 'settle-done'));
          }
        }
        return h('section', { class: 'nt-env nt-envelope pz-paper' + (done ? ' is-done' : ''), role: 'group', aria: { label: L('envelope') } }, kids);
      }

      function result(sh) {
        var r = sh.result, kids = [], stamps;
        if (!r) return null;
        kids.push(D().word(L('result'), 26));
        if (r.verdictLine) kids.push(h('p', { class: 'cb-typed nt-verdict', text: r.verdictLine }));
        kids.push(h('p', { class: 'cb-typed nt-heads' }, [h('strong', { class: 'nt-fig', text: String(r.heads) }), ' ' + L('heads'),
          r.call ? ' · ' + L('callLine', { lo: r.call.lo, hi: r.call.hi }) : '', r.par ? ' · ' + L('parLine', { par: r.par.heads }) : '',
          r.vsPar ? ' · ' + word('vsPar.' + r.vsPar, lower(r.vsPar)) : '']));
        if (Array.isArray(r.byGen)) kids.push(h('p', { class: 'nt-gens' }, r.byGen.map(function (n, g) { return h('span', { class: 'nt-gen' }, [SB.UI.C.GenGlyph({ gen: g, size: 13 }), ' ' + Math.round(n || 0)]); })));
        stamps = (r.memory && r.memory.stamps) || [];
        if (stamps.length) kids.push(h('div', { class: 'nt-stamps' }, stamps.map(function (k2) { var t = word('stamp.' + k2, String(k2).replace(/_/g, ' ')); return h('span', { role: 'img', aria: { label: t } }, D().art(D().stamp(t, 4, 4, 16, { rot: -4 }), D().stampW(t, 16) + 12, 44)); })));
        if (r.ledger && r.ledger.length) kids.push(h('ul', { class: 'nt-chits', aria: { label: word('feedback.ledger.TOTAL', 'why') } }, r.ledger.map(function (x) {
          var t = (x.col === 'PAR' || x.col === 'TOTAL' ? '' : (x.d > 0 ? '+' : (x.d < 0 ? '−' : ''))) + (num(x.d) ? Math.abs(Math.round(x.d)) : '?');
          return h('li', { class: 'nt-chit nt-chit--' + lower(x.col) }, [h('strong', { class: 'nt-fig', text: t }), ' ', h('span', { class: 'cb-typed', text: x.label || word('feedback.ledger.' + x.col, lower(x.col)) })]);
        })));
        (r.luck || []).forEach(function (l) { kids.push(h('p', { class: 'cb-typed nt-scrapline', text: l.text || '' })); });
        if (r.comments && r.comments.length) kids.push(h('div', { class: 'nt-comments' }, r.comments.map(function (c) {
          return h('blockquote', { class: 'nt-comment cb-piece cb-stock-white' }, [h('p', { class: 'cb-typed', text: c.text || '' }), h('footer', { class: 'cb-typed nt-by', text: '— ' + (c.byName || '') }),
            c.noteKey ? D().act(word('notebook.cause.' + c.cause + '.title', lower(c.cause || 'note')), word('notebook.cause.' + c.cause + '.title', lower(c.cause || 'note')), 'cm-' + c.noteKey, function () { SB.UI.go('notebook', { key: c.noteKey }); }, { size: 10 }) : null]);
        })));
        (r.learned || []).forEach(function (l) { kids.push(h('p', { class: 'cb-typed nt-scrapline nt-learned', text: l.text || l.label || '' })); });
        kids.push(h('p', { class: 'nt-you' }, [h('span', { class: 'cb-typed', text: SB.text.label('settle.NET') + ': ' }), h('strong', { class: 'nt-fig', text: (r.playerNet > 0 ? '+' : '') + money(r.playerNet) })]));
        var wt = r.word && num(r.word.to) ? SB.Territory.tier(r.word.to) : null, wf = r.word && num(r.word.from) ? SB.Territory.tier(r.word.from) : null;
        if (r.name || (wt && wf !== wt)) kids.push(h('p', { class: 'cb-typed nt-moves' }, [
          r.name ? L('yourName') + ' ' + Math.round(r.name.from) + ' → ' + Math.round(r.name.to) + '. ' : '',
          wt && wf !== wt ? L('standing') + ': ' + SB.text.label('wordTier.' + wt + '.name') : '']));
        return h('section', { class: 'nt-result cb-piece cb-stock-bone' }, kids);
      }
      function afterJobs(host) {
        var jobs = [];
        try { jobs = SB.Jobs.forShow(S(), showId).filter(function (j) { return j.group === 'NIGHT' && j.status !== 'DONE' && j.status !== 'MOOT'; }); } catch (e) { jobs = []; }
        if (!jobs.length) return;
        host.appendChild(h('div', { class: 'nt-after cb-piece cb-stock-white' }, [D().word(L('after'), 18),
          h('ul', { class: 'nt-after-list' }, jobs.map(function (j) { return h('li', { class: 'cb-typed', text: j.label || j.type }); }))]));
      }
      /* before the doors: the town's number and your call on the tally scrap, the cardboard sign that opens the doors */
      function prelude() {
        var host = region.sign, sh = curShow(), doors = sh && sh.bill && num(sh.bill.doors) ? L('doorsAt', { t: clock(sh.bill.doors) }) : '';
        SB.UI.clear(host);
        paintDoor();
        put(host, NS().parts.sign(L('openL1'), L('openL2'), [doors, L('setsSay', { n: (view ? view.bands : []).length, cur: '' }).trim()].filter(Boolean).join(' · '), L('open'), 'open', begin));
        quiet(true);
        if (F() && host.querySelector('.nc-sign')) F().move(host.querySelector('.nc-sign'), 'stamp', { delay: 560, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5 } });
        if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { try { var b = host.querySelector('[data-fk="open"]'); if (b) b.focus(); } catch (e) { /* fine */ } });
      }

      function paintStop(soft) {
        var host = region.stop, sh = curShow(), key, dec;
        if (!host) return;
        if (queue.length && !soft) return;
        if (phase === 'prelude') return;
        if (phase === 'settled' || (sh && sh.status === 'PLAYED')) {
          key = 'result:' + model.lines.length + ':' + (queue.length ? 'q' : 'd');
          if (key === stopKey) return;
          stopKey = key;
          SB.UI.clear(host); SB.UI.clear(region.result); SB.UI.clear(region.leave);
          host.className = 'nt-at nt-at--stop is-env'; quiet(false);
          host.appendChild(envelope(savedView, model.lines, true));
          if (!queue.length && sh && sh.result) {
            region.result.appendChild(result(sh));
            afterJobs(region.result);
            put(region.leave, NS().parts.sign(L('leaveL1'), L('leaveL2'), '', L('toWeek'), 'leave', leave, 'leave'));
            if (F() && region.leave.querySelector('.nc-sign')) F().move(region.leave.querySelector('.nc-sign'), 'slap');
            paintPiles(); paintStamp();
          }
          return;
        }
        if (stop && stop.kind === 'DECISION' && stop.decision) {
          dec = stop.decision;
          key = 'dec:' + dec.id;
          if (key === stopKey) return;
          stopKey = key;
          SB.UI.clear(host);
          host.className = 'nt-at nt-at--stop is-note'; quiet(true);
          host.appendChild(noteFor(dec));
          if (SB.Sfx) SB.Sfx.noteIn();
          return;
        }
        if (stop && stop.kind === 'SETTLE' && phase === 'night') {
          key = 'env';
          if (key === stopKey) return;
          stopKey = key;
          SB.UI.clear(host);
          host.className = 'nt-at nt-at--stop is-env'; quiet(false);
          try { savedView = SB.Night.settleView(S(), showId); } catch (e) { savedView = null; }
          host.appendChild(envelope(savedView, savedView ? savedView.lines.map(function (l) { return { k: l.k, label: l.label, amount: l.amount }; }) : [], false));
          paintDoor(); paintPiles(); paintCrowd(); paintSetList(); paintStamp();
          if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { try { var b = host.querySelector('.nt-tab:not([disabled])'); if (b) b.focus(); } catch (e) { /* fine */ } });
          return;
        }
        if (phase === 'night' && stopKey !== 'none') { stopKey = 'none'; quiet(false); SB.UI.clear(host); host.className = 'nt-at nt-at--stop'; }
      }

      /* ---------- the skeleton: the board, the doorway sheet past the table, the objects on it ---------- */
      function fit() {
        /* the board is 1280 x 800 of --p and fills the stage; with the walkthrough's strip up (css/story.css gives .nt a
           bottom band) it shrinks to what is left, so nothing of the night sits under the strip */
        var cw = region.stage ? region.stage.offsetWidth : 0, pb = 0, k = 1;        /* the board's own width: 1280 of --p, in px */
        if (!region.stage) return;
        try { pb = parseFloat(getComputedStyle(el).paddingBottom) || 0; } catch (e) { pb = 0; }
        if (cw > 0 && pb > 0) k = Math.max(0.3, Math.min(1, (el.clientHeight - pb) / (HT * cw / W)));
        el.style.setProperty('--k', k.toFixed(4));
      }
      function build() {
        var sh = curShow(), room = roomOf(), title;
        SB.UI.clear(el);
        region = {};
        look = doorLook(room, sh);
        quiet(false); seenLines = 0; heroKey = '';
        try { fcard = SB.Forecast.card(S(), showId); } catch (e) { fcard = null; }
        title = [room ? room.name : '', sh ? SB.time.fmt(sh.day, 'long') : ''].filter(Boolean).join(' · ');
        ['door', 'setlist', 'watch', 'stamp', 'counter', 'call', 'cash', 'drink', 'piles', 'posts', 'sign', 'stop', 'result', 'leave', 'now', 'actions'].forEach(function (k2) {
          region[k2] = h('div', { class: 'nt-at nt-at--' + k2 });
        });
        region.live = h('p', { class: 'cb-sr', aria: { live: 'polite' } });
        photo = NS().parts.photo(L('roomLabel'));
        region.stage = h('div', { class: 'nt-stage nc-stage nt-kind--' + lower(look.kind) + (look.rough ? ' is-rough' : '') }, [
          NS().parts.title(room ? room.name : L('title'), sh ? SB.time.fmt(sh.day, 'long') : ''),
          photo.el, region.door,
          look.curfew !== null ? NS().parts.stopTape(L('hardStop', { t: clock(look.curfew) })) : null,
          region.setlist, region.watch, region.stamp, region.call, region.piles, region.counter, region.drink, region.cash, region.posts, region.sign,
          region.stop, region.result, region.leave, region.now, region.actions, region.live
        ]);
        region.stage.setAttribute('aria-label', title || L('title'));
        region.fit = h('div', { class: 'nt-fit' }, region.stage);
        el.appendChild(region.fit);
        fit();
        if (!onResize && typeof window !== 'undefined') { onResize = function () { fit(); }; window.addEventListener('resize', onResize); }
        if (!ro && typeof ResizeObserver === 'function') { try { ro = new ResizeObserver(function () { fit(); }); ro.observe(el); } catch (e) { ro = null; } }
        if (F()) { F().scrollbar(region.stop); F().scrollbar(region.result); }
        paint();
        paintButtons();
        /* the papers slap down one after another */
        if (F()) {
          var pieces = Array.prototype.slice.call(region.stage.querySelectorAll('.nc-piece'));
          pieces.forEach(function (pc, n) { pc.style.setProperty('--i', String(Math.min(n, 16))); pc.classList.add('mv-slap'); });
        }
      }

      /* ---------- start ---------- */
      function lostLog() {
        var s = S(), log = (s && s.week && s.week.log) || [];
        return log.filter(function (r) { return r && r.showId === showId && NIGHT_TYPES[r.t]; });
      }
      function settleLog() {
        var s = S(), log = (s && s.week && s.week.log) || [];
        return log.filter(function (r) { return r && r.showId === showId && r.t === 'SETTLE_LINE'; });
      }
      function emptyNote(text) {
        el.appendChild(h('div', { class: 'nt-empty cb-piece cb-stock-white' }, [h('p', { class: 'cb-typed', text: text }),
          D().act(L('toWeek'), L('toWeek'), 'back', function () { SB.UI.go('week'); }, { size: 14 })]));
      }

      if (!show) emptyNote(L('noShow'));
      else {
        try { view = SB.Shows.view(S(), showId); } catch (e) { view = null; }
        if (show.status === 'PLAYED') {
          phase = 'settled';
          model = modelFrom(lostLog().concat(settleLog()));
          model.settled = true;
          build();
          paintStop();
        } else if (show.status === 'CONFIRMED' && show.night && show.night.at) {
          phase = 'night'; stop = show.night.at;
          queue = lostLog().slice();
          build();
          flush();
        } else if (show.status === 'CONFIRMED') {
          phase = 'prelude';
          build();
          prelude();
        } else emptyNote(L('notYet'));
      }

      return {
        update: function () { if (phase === 'night' || phase === 'settled') { paint(); paintButtons(); } },
        flush: flush,
        unmount: function () { alive = false; clearTimer(); if (ro) { try { ro.disconnect(); } catch (e) { /* fine */ } } if (onResize && typeof window !== 'undefined') window.removeEventListener('resize', onResize); }
      };
    }
  });
})(SB);
