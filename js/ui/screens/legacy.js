/* Scene Booker — ui/screens/legacy.js (UI-B, drawn as the box: design/story.md 6.5, css/cu-box.css)
 * The game has no score; the box is the record. A kraft shoebox on the black table, manila dividers standing up out of it:
 *   the box .......... every flyer the booker made (SB.UI.parts.flyerThumb), stacked crooked by year behind a sharpie
 *                      divider, newest on top; pick one up to hold it (turn it over, save it as PNG). Beside it the front
 *                      page, typed by the box. Loose in it: the nights people still talk about, clipped out as photocopies
 *                      with a photo (real kit cut-outs through SB.Scenes.copier) and how the story has grown ("41 were
 *                      there, 60 say they were"); the firsts on an index card; the earned patches; the rooms as snapshots
 *                      (SB.Scenes.draw), closed ones gone, not failed; the people's cards; the chapters on tape (rewatch).
 *   bands ............ each band that got somewhere: its sticker and a strip of its flyers in order, its history typed
 *   the town ......... how touring bands talk about the town: a marker line climbing a page with the rungs labelled
 *   years ............ a photocopied zine page per year (the part yearPage, also used by the close-out): facts, no grade
 *   end .............. hand it on (three people ticked, three lines typed) or one last show, with a confirming note
 * Offers (someone asking) sit on top as a note with tear-off tabs. Reads Legacy views, Territory.word, Bands, People,
 * Rooms.list and public state; actions Legacy.answerOffer and Legacy.end through SB.UI.act. Nothing is computed here.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.legacy = {
    title: 'Legacy',
    tabWall: 'The pile',
    tabFlyers: 'Every flyer',
    tabBands: 'Bands',
    tabTown: 'The town',
    tabYears: 'Years',
    tabEnd: 'End it',
    openSay: 'Open: {what}',
    wallEmpty: 'Nothing taped up yet. A night goes up when people keep talking about it.',
    taped: 'Taped up',
    grown: '{n} were there, {told} say they were',
    flip: 'Turn it over',
    flipBack: 'Turn it back',
    hold: 'Pick up the flyer for {show}',
    holding: 'In your hand',
    holdHint: 'Pick a flyer up off the pile to look at it.',
    putBack: 'Put it back',
    told: 'told: {n}',
    counted: 'counted: {n}',
    flyersEmpty: 'No flyers yet. They are kept here once a show has been played.',
    allYears: 'every year',
    allRooms: 'every room',
    year: 'Year',
    room: 'Room',
    noFlyer: 'no flyer kept',
    exportPng: 'Save as PNG',
    exportNone: 'Cannot draw this one at full size.',
    bandsEmpty: 'No band has got anywhere on your stages yet.',
    playedFor: 'played for you {n} times',
    openBand: 'Open {band}',
    townRungs: 'How the town talks about you',
    townNow: 'now',
    townFirsts: 'Firsts',
    townFirstsNone: 'No firsts yet.',
    townWeek: 'wk {n}',
    townRegulars: 'Regulars over time',
    townKids: 'Kids in town over time',
    townRoomsOpen: 'Rooms open',
    townRoomsGone: 'Rooms gone',
    townNone: 'Nothing on record yet.',
    yearsEmpty: 'No year is finished yet. A year page is written in week 52.',
    yearH: 'Year {n}',
    yearShows: '{shows} shows, {heads} people through the door.',
    yearShowsN: 'shows',
    yearHeadsN: 'through the door',
    yearFirst: 'First shows for',
    yearToured: 'Went on tour',
    yearRoomsOpen: 'Rooms open',
    yearRoomsClosed: 'Rooms that closed',
    yearNights: 'Nights people will remember',
    yearCalls: 'Your calls',
    yearCallsLine: '{inside} of {shows} inside your range.',
    yearFlyers: 'On the wall',
    yearSeasons: 'The seasons',
    yearForward: 'Going into next year',
    offerH: 'Someone is asking',
    offerYes: 'Say yes',
    offerNo: 'Say no',
    offerLater: 'Not yet',
    offerOver: 'answered',
    endH: 'Ending it',
    endIntro: 'The scene goes on without you either way. Choose how.',
    endHand: 'Hand it on',
    endHandHelp: 'Pick three people to pass it to, and write three lines for whoever comes next.',
    endHandPick: 'Three people',
    endHandLines: 'Three lines',
    endLine: 'Line {n}',
    endHandGo: 'Hand it on',
    endLast: 'One last show',
    endLastHelp: 'Book it, play it, and close the book after.',
    endLastGo: 'End it with a last show',
    endSure: 'This ends the game. Go ahead?',
    endYes: 'Yes, end it',
    endNo: 'Not yet',
    endNeedThree: 'Pick exactly three people and write three lines.',
    epilogue: 'What happened after',
    ended: 'It is over.',
    nobody: 'Nobody you know is free to take it on yet.',
    unknown: '—',
    /* the box (the pile tab, drawn as the shoebox of design/story.md 6.5) */
    tabBox: 'The box',
    boxLabel: 'The box: every flyer you made, by year',
    lid: 'Flyers',
    lidKeep: 'keep. do not throw out.',
    thinOne: 'only one so far. keep going.',
    thinN: 'only {n} so far. keep going.',
    stackOne: 'one flyer',
    stackN: '{n} flyers',
    frontH: 'The box',
    frontIssue: 'week {n} · written by the box',
    frontLabel: 'The front page of the box',
    frontNone: 'Nothing in it yet. The first flyer goes in once a show has been played.',
    frontOne: 'One show so far: {date} at {room}, {heads} people through the door. Its flyer is the only thing in the box. Every box starts like that.',
    frontMany: '{shows} shows so far and {heads} people through the door, most of them at {room}. The biggest night was {big}: {bigHeads} people.',
    frontWallOne: 'People still talk about one of those nights.',
    frontWallN: 'People still talk about {n} of those nights.',
    frontLast: 'The last flyer in: {date}, {room}.',
    frontShows: 'shows',
    frontShowsOne: 'show',
    frontHeads: 'through the door',
    clipsH: 'Nights people still talk about',
    clipsNone: 'Nothing clipped yet. A night gets clipped when people keep talking about it.',
    patchesH: 'Patches you earned',
    roomsH: 'The rooms',
    roomShowsOne: 'one of your shows',
    roomShowsN: '{n} of your shows',
    roomLast: 'last: {date}',
    roomGone: 'gone',
    peopleH: 'The people',
    tapesH: 'Chapters, on tape'
  };

  function L(key, ctx) { return SB.text.label('ui.legacy.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function K() { return SB.DeskKit; }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function game() { return SB.UI.game(); }
  function count(v) { return Array.isArray(v) ? v.length : (num(v) ? v : 0); }
  function f(n) { return Math.round(n * 10) / 10; }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'legacy', String(e && e.message)); return fb; } }
  var TONER = '#141413';

  /* a flyer as a thumb (the generator's real flyer), or a blank sheet when none was kept */
  function flyerEl(rec, width) {
    var el = null;
    if (rec && rec.flyer && SB.UI.parts && typeof SB.UI.parts.flyerThumb === 'function') {
      try { el = SB.UI.parts.flyerThumb(rec.flyer, width); } catch (e) { el = null; }
    }
    if (el) return el;
    return h('div', { class: 'p2-blankflyer', style: { width: width + 'px', height: Math.round(width * 22 / 17) + 'px' } }, [
      h('span', { class: 'p2-blankflyer-room', text: rec && rec.roomName ? rec.roomName : '' }),
      h('span', { text: rec && num(rec.day) ? SB.time.fmt(rec.day, 'short') : L('noFlyer') })
    ]);
  }

  function billText(rec) { return (rec && rec.bill ? rec.bill : []).map(function (b) { return b.name; }).filter(Boolean).join(' · '); }
  function showName(rec) { return (rec && num(rec.day) ? SB.time.fmt(rec.day, 'short') : '') + (rec && rec.roomName ? ', ' + rec.roomName : ''); }

  function exportFlyer(rec) {
    var canvas, d = typeof document !== 'undefined' ? document : null;
    if (!d || !SB.Flyer || typeof SB.Flyer.render !== 'function' || !rec || !rec.flyer) { SB.UI.toast(L('exportNone'), 'no'); return; }
    /* the flyer's photos first, so the saved picture has them */
    if (typeof SB.Flyer.need === 'function' && !exportFlyer.ready) {
      SB.Flyer.need(rec.flyer.recipe, rec.flyer.spec, function () { exportFlyer.ready = true; try { exportFlyer(rec); } finally { exportFlyer.ready = false; } });
      return;
    }
    try {
      canvas = d.createElement('canvas'); canvas.width = 1700; canvas.height = 2200;
      SB.Flyer.render(canvas, rec.flyer.recipe, rec.flyer.spec, { width: 1700, dpr: 1, noWait: true });
      canvas.toBlob(function (blob) {
        var a, url;
        if (!blob) { SB.UI.toast(L('exportNone'), 'no'); return; }
        url = URL.createObjectURL(blob);
        a = d.createElement('a'); a.href = url; a.download = 'flyer-' + (rec.showId || 'show') + '.png';
        d.body.appendChild(a); a.click(); d.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      }, 'image/png');
    } catch (e) { SB.UI.toast(L('exportNone'), 'no'); }
  }

  /* a typed scrap of paper (reading matter: no sign of a control on it) */
  function scrap(text, stock, cls) {
    return h('div', { class: 'cb-piece cb-stock-' + (stock || 'white') + ' p2-scrap' + (cls ? ' ' + cls : '') }, h('p', { class: 'cb-typed cb-small', text: text }));
  }
  /* a hand-lettered line on a strip of masking tape */
  function tapeLine(text, w, seed) {
    var k = K(), t = String(text || ''), s = 14, lines = [t], words, i, best = 0, a2, b2, ht, out, fit;
    fit = function (line, size) { return k.letterWidth(line, size) <= w - 22; };
    if (!fit(t, s)) {
      /* two lines, broken at the space nearest the middle */
      words = t.split(' ');
      for (i = 1; i < words.length; i++) if (Math.abs(words.slice(0, i).join(' ').length - t.length / 2) < Math.abs(words.slice(0, best || 1).join(' ').length - t.length / 2)) best = i;
      a2 = words.slice(0, best || 1).join(' '); b2 = words.slice(best || 1).join(' ');
      lines = b2 ? [a2, b2] : [a2];
      s = 13;
      while (s > 8 && !lines.every(function (l) { return fit(l, s); })) s -= 1;
    }
    ht = 18 + lines.length * s * 1.25;
    out = k.tape(w / 2, ht / 2 + 2, w - 4, ht, { seed: 'tp' + seed, rot: 0, op: 0.92 });
    lines.forEach(function (l, j) { out += k.letter(l, w / 2, 10 + (j + 1) * s * 1.2, s, { anchor: 'middle', seed: 'tl' + seed + j, weight: 1.4, maxWidth: w - 16 }); });
    return D().art(out, w, ht + 6, 'p2-tapeline-art');
  }
  /* a head and shoulders, for counts of people */
  function heads(n, per, size) {
    var out = '', i, s = size || 18, step = s * 0.72, shown = Math.min(n, per * 2), W = Math.min(n, per) * step + s;
    for (i = 0; i < shown; i++) out += D().head(s * 0.6 + (i % per) * step, s * 1.05 + Math.floor(i / per) * s * 0.9, s, { mode: i % 4 === 3 ? 'dots' : 'solid' });
    return { svg: out, w: Math.max(s, W), h: s * 1.1 + (shown > per ? s * 0.9 : 0) };
  }

  /* ---------------------------------------------------------------- */
  /* the box: paper, sharpie and copier photos (the approved look)     */
  /* ---------------------------------------------------------------- */

  function NS() { return SB.NightScene || null; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* sharpie capitals as SVG markup */
  function mk(text, size, o) { var n = NS(); return n ? safe(function () { return n.marker(String(text), size, o || {}); }, esc(text)) : '<span class="bx-mkfb">' + esc(text) + '</span>'; }
  function mkEl(tag, cls, text, size, o, label) { return h(tag, { class: 'bx-mk ' + (cls || ''), role: label === false ? null : 'img', aria: label === false ? { hidden: 'true' } : { label: label || text }, html: mk(text, size, o) }); }
  /* cut from a sheet of copy paper: the night screen's paper texture and torn edges */
  function paperOn(el, stock, seed, edges) {
    var n = NS(), st;
    if (!n || !el || !el.style || !el.style.setProperty) return el;
    st = safe(function () { return n.paperStyle(stock, seed, edges); }, null);
    if (st) Object.keys(st).forEach(function (k) { if (st[k] != null) safe(function () { el.style.setProperty(k, st[k]); }); });
    return el;
  }
  function tilt(el, deg) { if (el && el.style && el.style.setProperty) el.style.setProperty('--r', f(deg) + 'deg'); return el; }
  function bxTape(cls) { return h('span', { class: 'bx-tape ' + (cls || ''), aria: { hidden: 'true' } }); }
  function rr(seed) { return SB.rng.make('box:' + seed); }
  function stockFor(seed) { var n = NS(); return n ? safe(function () { return n.paperFor(seed); }, 'canary') : 'canary'; }
  function cutsBy(roles) { return (SB.Cutouts || []).filter(function (k) { return roles.indexOf(k.role) >= 0 && k.frame !== 'photo'; }); }
  function newCanvas(w, ht, cls) {
    var d = typeof document !== 'undefined' ? document : null, cv;
    if (!d || !d.createElement) return null;
    cv = d.createElement('canvas'); cv.width = Math.round(w); cv.height = Math.round(ht);
    cv.className = 'bx-photo' + (cls ? ' ' + cls : ''); if (cv.setAttribute) cv.setAttribute('aria-hidden', 'true');
    return cv;
  }
  /* a photo through the copier: real cut-outs from the kits pasted up, then one toner pass on coloured paper.
   * plan(r, W, H) -> [{ id, x, y, h | w, rot, flip, border, bright, contrast }] */
  function copierPhoto(w, ht, seed, paperName, plan, cls) {
    var cv = newCanvas(w, ht, cls), S = SB.Scenes, list;
    if (!cv || !S || !S.paste || !S.copier || !S.loadCuts || typeof cv.getContext !== 'function' || typeof Image === 'undefined') return cv;
    list = safe(function () { return plan(rr('ph:' + seed), w, ht) || []; }, []);
    S.loadCuts(list.map(function (p) { return p.id; }), function () {
      safe(function () {
        var c = cv.getContext('2d'), g;
        if (!c) return;
        c.fillStyle = '#d8d8d8'; c.fillRect(0, 0, w, ht);
        list.forEach(function (p) { S.paste(c, p.id, p); });
        g = c.createRadialGradient(w * 0.5, ht * 0.4, ht * 0.15, w * 0.5, ht * 0.45, w * 0.75);
        g.addColorStop(0, 'rgba(255,255,255,.1)'); g.addColorStop(1, 'rgba(0,0,0,.3)'); c.fillStyle = g; c.fillRect(0, 0, w, ht);
        S.copier(cv, { paper: paperName, cell: Math.max(2.4, w / 160), contrast: 1.35, bias: 0.05, seed: 'box:' + seed });
      });
    });
    return cv;
  }
  /* a live photo: a whole print from the kits (the stage from the back of the room, hands up, the front row), or a band
   * member cut out and pasted over the backs of the crowd; chosen by the night's seed */
  function livePlan(r, W, H) {
    var front = cutsBy(['singer', 'guitar', 'bass']), a = front[r.int(0, front.length - 1)], k = r.int(0, 3), out = [];
    if (k === 0) return [{ id: 'crowd-01', x: W * r.range(0.4, 0.6), y: H * 1.02, w: W * 1.25, border: 0, bright: 1.2, contrast: 1.05 }];
    if (k === 1) {
      out.push({ id: r.chance(0.5) ? 'crowd-04' : 'stand-04', x: W * 0.5, y: H * r.range(1.1, 1.35), w: W * 1.08, border: 0, bright: 1.1, contrast: 1.1 });
      return out;
    }
    if (k === 2) out.push({ id: 'crowd-03', x: W * 0.3, y: H + 4, h: H * 1.05, rot: r.range(-0.04, 0.04), border: 0, bright: 1.15 });
    if (a) out.push({ id: a.id, x: W * (k === 2 ? 0.72 : r.range(0.36, 0.6)), y: H * 1.1, h: H * 1.18, rot: r.range(-0.05, 0.05), flip: a.facing === 'left', border: 4, bright: 1.12, contrast: 1.15 });
    if (k === 3) out.push({ id: 'crowd-05', x: W * 0.5, y: H + 8, h: H * 0.42, rot: r.range(-0.015, 0.015), border: 0, bright: 0.8, contrast: 1.2 });
    return out;
  }
  /* the room from the back: the stage shot, the band lit up past the crowd */
  function crowdPlan(r, W, H) {
    return [{ id: 'crowd-02', x: W * r.range(0.42, 0.58), y: H * 1.1, w: W * 1.3, border: 0, bright: 1.18, contrast: 1.12 }];
  }
  /* a story's name in sharpie, broken onto two lines when it is long */
  function mkLines(text, size, seed, maxW) {
    var t = String(text || ''), words = t.split(' '), best = 0, i, a, b;
    if (t.length <= 24 || words.length < 3) return mk(t, size, { seed: seed, maxWidth: maxW });
    for (i = 1; i < words.length; i++) if (Math.abs(words.slice(0, i).join(' ').length - t.length / 2) < Math.abs(words.slice(0, best || 1).join(' ').length - t.length / 2)) best = i;
    a = words.slice(0, best || 1).join(' '); b = words.slice(best || 1).join(' ');
    return mk(a, size, { seed: seed + 'a', maxWidth: maxW }) + mk(b, size, { seed: seed + 'b', maxWidth: maxW });
  }
  /* a room, as the cutscenes draw it (no people drawn: the scenes paste real ones) */
  var ROOM_ART = { HOUSE: ['CARPORT_EMPTY', 'KITCHEN_FLOOR', 'CARPORT_NIGHT'], OUTDOOR: 'CARPORT_NIGHT', DIY: 'EMPTY_ROOM', HALL: 'EMPTY_ROOM', BAR: 'BAR_DOOR', CLUB: 'BAR_DOOR', SHOP: 'STOREFRONT', BIG: 'BAR_DOOR' };
  function roomPhoto(room, w, ht) {
    var cv = newCanvas(w, ht, 'bx-roomcv'), S = SB.Scenes, key = ROOM_ART[room && room.kind] || 'EMPTY_ROOM', ctx;
    if (Array.isArray(key)) key = key[rr('rk' + (room && room.id)).int(0, key.length - 1)];
    if (!cv || !S || !S.draw || typeof cv.getContext !== 'function' || typeof Image === 'undefined') return cv;
    ctx = { seed: 'box:' + (room && room.id), paper: stockFor('room' + (room && room.id)), room: room && room.name, empty: room && room.open === false };
    safe(function () { S.draw(cv, key, ctx); });
    return cv;
  }

  /* ---------------------------------------------------------------- */
  /* the year page (a part): a photocopied zine page of the year       */
  /* ---------------------------------------------------------------- */

  SB.UI.part('yearPage', function (recap) {
    var r = recap || {}, s = game(), recs = (s && s.legacy && s.legacy.records) || {}, k = K(), kids = [], tally = r.callTally, nShows = count(r.shows),
        hd = num(r.heads) ? r.heads : 0, hh, unit = hd > 400 ? 20 : (hd > 120 ? 10 : 5), i, out;
    kids.push(h('h2', { class: 'p2-zine-h', role: 'img', aria: { label: L('yearH', { n: num(r.year) ? r.year : '' }) } },
      D().art(k.ransom(L('yearH', { n: num(r.year) ? r.year : '' }), 6, 40, 34, { seed: 'yr' + r.year }), k.ransomWidth(L('yearH', { n: r.year || '' }), 34) + 16, 54)));
    if (r.front) kids.push(h('p', { class: 'cb-typed p2-zine-front', text: r.front }));
    hh = heads(Math.max(1, Math.round(hd / unit)), 14, 18);
    out = k.marker(String(nShows), 6, 46, 44, { seed: 'yn' + nShows }) + k.type(L('yearShowsN').toUpperCase(), 10 + k.markerWidth(String(nShows), 44), 44, 13, { bold: true }) +
          k.marker(String(hd), 6, 112, 44, { seed: 'yh' + hd }) + k.type(L('yearHeadsN').toUpperCase(), 10 + k.markerWidth(String(hd), 44), 110, 13, { bold: true }) +
          '<g transform="translate(8 124)">' + hh.svg + '</g>' + D().head(12, 124 + hh.h + 22, 12) + k.type('= ' + unit, 22, 124 + hh.h + 20, 10, { bold: true });
    kids.push(h('div', { class: 'p2-zine-figs', role: 'img', aria: { label: L('yearShows', { shows: nShows, heads: hd }) } }, D().art(out, Math.max(300, hh.w + 20), 124 + hh.h + 30)));
    if (r.crowd) kids.push(h('p', { class: 'cb-typed cb-small', text: r.crowd }));
    if (r.firstShows && r.firstShows.length) {
      kids.push(h('h3', { class: 'p2-zine-k', text: L('yearFirst') }));
      kids.push(h('ul', { class: 'p2-cutnames' }, r.firstShows.map(function (n, j) { return h('li', { class: 'p2-cutname', style: { '--r': ((j * 41) % 7 - 3) * 0.8 + 'deg' }, text: n }); })));
    }
    if (r.toured && r.toured.length) {
      kids.push(h('h3', { class: 'p2-zine-k', text: L('yearToured') }));
      kids.push(h('ul', { class: 'p2-cutnames' }, r.toured.map(function (n) { return h('li', { class: 'p2-cutname is-black', text: n }); })));
    }
    if (num(r.roomsOpen) || (r.roomsClosed && r.roomsClosed.length)) {
      kids.push(h('p', { class: 'cb-typed' }, [num(r.roomsOpen) ? h('strong', { text: L('yearRoomsOpen') + ': ' + r.roomsOpen + '. ' }) : null,
        r.roomsClosed && r.roomsClosed.length ? h('span', null, [L('yearRoomsClosed') + ': ', h('s', { text: r.roomsClosed.join(', ') })]) : null]));
    }
    if (r.nights && r.nights.length) {
      kids.push(h('h3', { class: 'p2-zine-k', text: L('yearNights') }));
      kids.push(h('ul', { class: 'p2-zine-nights' }, r.nights.map(function (n) {
        var rec = recs[n.showId] || n;
        return h('li', { class: 'p2-zine-night' }, [flyerEl(rec, 92), h('p', { class: 'cb-typed cb-small', text: showName(n) + (n.story && n.story.name ? ' — ' + n.story.name : '') })]);
      })));
    }
    if (tally && num(tally.shows) && tally.shows > 0) {
      out = '';
      for (i = 0; i < Math.min(40, tally.shows); i++) out += D().tick(i < tally.inside ? 'DONE' : 'MISSED', 18).replace(/<path/g, '<path transform="translate(' + (i % 20) * 20 + ' ' + Math.floor(i / 20) * 22 + ')"');
      kids.push(h('h3', { class: 'p2-zine-k', text: L('yearCalls') }));
      kids.push(h('div', { class: 'p2-zine-calls', role: 'img', aria: { label: L('yearCallsLine', { inside: tally.inside, shows: tally.shows }) } }, [
        D().art(out, Math.min(20, tally.shows) * 20 + 4, Math.ceil(Math.min(40, tally.shows) / 20) * 22 + 2),
        h('p', { class: 'cb-typed cb-small', text: L('yearCallsLine', { inside: tally.inside, shows: tally.shows }) })]));
    }
    if (r.flyers && r.flyers.length) {
      kids.push(h('h3', { class: 'p2-zine-k', text: L('yearFlyers') }));
      kids.push(h('div', { class: 'p2-zine-flyers' }, r.flyers.slice(0, 6).map(function (id) { return flyerEl(recs[id] || null, 84); })));
    }
    if (r.seasons && r.seasons.length) {
      kids.push(h('h3', { class: 'p2-zine-k', text: L('yearSeasons') }));
      kids.push(h('ul', { class: 'p2-zine-seasons' }, r.seasons.map(function (t) { return h('li', { class: 'cb-typed cb-small', text: t }); })));
    }
    if (r.forward) kids.push(h('p', { class: 'p2-zine-forward' }, [h('strong', { text: L('yearForward') + ': ' }), r.forward]));
    return h('section', { class: 'p2-zine sb-yearpage' }, kids);
  });

  /* ---------------------------------------------------------------- */
  /* the screen                                                        */
  /* ---------------------------------------------------------------- */

  SB.UI.screen('legacy', {
    rail: 'legacy', title: 'ui.legacy.title', full: false,
    mount: function (root, params) {
      var VIEWS = ['wall', 'bands', 'town', 'years', 'end'], view = params && params.tab === 'flyers' ? 'wall' : (params && VIEWS.indexOf(params.tab) >= 0 ? params.tab : 'wall'),
          flipped = {}, held = null, fYear = '', fRoom = '', picks = {}, lines = ['', '', ''], confirming = null;

      function keepFocus(fn) {
        var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
        fn();
        if (key) { el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null); if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } } }
      }
      function go(v) { view = v; keepFocus(render); }

      /* ---------- the dividers standing up out of the box: each opens a part of it ---------- */
      function opener(key, label, n, i) {
        var k = K(), on = view === key, w = 158, ht = 64, tw = Math.min(140, k.markerWidth(label.toUpperCase(), 17) + 24), tx = 6 + (i % 3) * 5, out = '';
        out += k.paper(4, 24, w - 8, ht - 26, { seed: 'dv' + key, stock: on ? 'bone' : 'manila', sx: 0, sy: 0, burn: 0.5 });
        out += k.paper(tx, 4, tw, 28, { seed: 'dvt' + key, stock: on ? 'bone' : 'manila', sx: 0, sy: 0, burn: 0.4 });
        out += k.marker(label.toUpperCase(), tx + 10, 26, 17, { seed: 'dvm' + key, maxWidth: tw - 18 });
        if (on) out += k.line(tx + 8, 30, tx + tw - 8, 30, { seed: 'dvu' + key, sw: 3, over: 0, stroke: D().cityInk()[0] });
        return D().thing({ cls: 'bx-divider p2-opener' + (on ? ' is-on' : ''), label: L('openSay', { what: label }), pressed: on, fk: 'open-' + key,
                           svg: out, w: w, h: ht, onClick: function () { go(key); } });
      }
      function openers(s) {
        var recN = safe(function () { return SB.Legacy.binder(s, {}).length; }, 0);
        return h('nav', { class: 'bx-dividers p2-openers', aria: { label: L('title') } }, [
          opener('wall', L('tabBox'), recN, 0), opener('bands', L('tabBands'), 0, 1), opener('town', L('tabTown'), 0, 2),
          opener('years', L('tabYears'), safe(function () { return (s.legacy.years || []).length; }, 0), 3), opener('end', L('tabEnd'), 0, 4)
        ]);
      }

      function offersBlock(s) {
        var list = safe(function () { return SB.Legacy.offers(s).filter(function (o) { return o.status === 'OPEN'; }); }, []);
        if (!list.length) return null;
        return h('section', { class: 'p2-offers', aria: { label: L('offerH') } }, list.map(function (o) {
          function answer(v) { SB.UI.act(function (st) { return SB.Legacy.answerOffer(st, o.id, v); }); }
          return h('div', { class: 'cb-piece cb-stock-bone p2-offer' }, [
            h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: '!!' }),
            h('p', { class: 'cb-typed' }, [h('strong', { text: o.fromName + ' ' }), o.text]),
            D().tabs({ label: L('offerH'), size: 11, items: [
              { text: L('offerYes'), fk: 'of-y-' + o.id, onClick: function () { answer(true); } },
              { text: L('offerNo'), fk: 'of-n-' + o.id, onClick: function () { answer(false); } },
              { text: L('offerLater'), fk: 'of-l-' + o.id, onClick: function () { answer('LATER'); } }] })
          ]);
        }));
      }

      /* ---------- the box: every flyer, stacked crooked by year; pick one up to hold it ---------- */
      function hold(rec) { held = held && held.showId === rec.showId ? null : rec; keepFocus(render); }
      function pickable(rec, width, cls, extra, kids) {
        return D().thing({ cls: 'p2-pick ' + (cls || '') + (held && held.showId === rec.showId ? ' is-held' : ''), label: L('hold', { show: showName(rec) }) + (rec.story && rec.story.name ? '. ' + rec.story.name : ''),
                           pressed: !!(held && held.showId === rec.showId), fk: 'fl-' + rec.showId, kids: (kids || [flyerEl(rec, width)]).concat(extra || []), onClick: function () { hold(rec); } });
      }
      function grownOf(r) { var told = r.story && num(r.story.told) ? r.story.told : null; return told !== null && told !== r.heads ? L('grown', { n: r.heads, told: told }) : null; }

      /* the stories: each night people still talk about, clipped out as a photocopy with its photo */
      function clipsView(s) {
        var wall = safe(function () { return SB.Legacy.wall(s); }, []).slice().reverse();
        if (!wall.length) return h('section', { class: 'bx-clips is-empty', aria: { label: L('clipsH') } }, [
          h('h2', { class: 'bx-k' }, D().stripArt(L('clipsH'), 12)),
          paperOn(tilt(h('div', { class: 'bx-clip bx-clip--none' }, [h('p', { class: 'cb-typed', text: L('clipsNone') })]), -1.2), 'white', 'clipnone', 'rb')]);
        return h('section', { class: 'bx-clips', aria: { label: L('clipsH') } }, [
          h('h2', { class: 'bx-k' }, D().stripArt(L('clipsH'), 12)),
          h('div', { class: 'bx-cliprow' }, wall.map(function (r, i) {
            var g = grownOf(r), name = r.story && r.story.name ? r.story.name : showName(r), stock = stockFor('clip' + r.showId), paper = h('div', { class: 'bx-clip-paper' }, [
              h('div', { class: 'bx-clip-photo' }, [copierPhoto(220, 138, 'clip' + r.showId, stock, livePlan)]),
              h('p', { class: 'bx-clip-h', html: mkLines(name, 18, 'cl' + r.showId, 206) }),
              g ? h('p', { class: 'cb-typed bx-clip-told', text: g }) : null,
              h('p', { class: 'cb-typed cb-small bx-clip-when', text: showName(r) })
            ]);
            paperOn(paper, stock, 'clip' + r.showId, i % 2 ? 'rb' : 'lb');
            return h('div', { class: 'bx-clipwrap', style: { '--r': ((i * 37) % 9 - 4) * 0.6 + 'deg' } }, [
              pickable(r, 0, 'bx-clip', null, [paper]), bxTape(i % 2 ? 'bx-tape--tr' : 'bx-tape--tl')]);
          }))
        ]);
      }

      /* the front page: a few sentences the box writes about the career so far, typed on a zine page */
      function frontPage(s, recs) {
        var heads0 = 0, rooms = {}, top = null, big = null, last = recs.length ? recs[recs.length - 1] : null, wallN = safe(function () { return SB.Legacy.wall(s).length; }, 0),
            years = (s.legacy && s.legacy.years) || [], lines = [], el, who = (s.player && (s.player.bookingName || s.player.name)) || L('frontH');
        recs.forEach(function (r) { heads0 += r.heads || 0; rooms[r.roomName] = (rooms[r.roomName] || 0) + 1; if (!big || (r.heads || 0) > (big.heads || 0)) big = r; });
        Object.keys(rooms).forEach(function (k) { if (!top || rooms[k] > rooms[top]) top = k; });
        if (!recs.length) lines.push(L('frontNone'));
        else if (recs.length === 1) lines.push(L('frontOne', { date: SB.time.fmt(last.day, 'short'), room: last.roomName, heads: last.heads || 0 }));
        else {
          if (years.length && years[years.length - 1].front) lines.push(years[years.length - 1].front);
          lines.push(L('frontMany', { shows: recs.length, heads: heads0, room: top, big: showName(big), bigHeads: big.heads || 0 }));
          if (wallN) lines.push(wallN === 1 ? L('frontWallOne') : L('frontWallN', { n: wallN }));
          lines.push(L('frontLast', { date: SB.time.fmt(last.day, 'short'), room: last.roomName }));
        }
        el = h('article', { class: 'bx-front', aria: { label: L('frontLabel') } }, [
          h('header', { class: 'bx-front-mast' }, [
            mkEl('h2', 'bx-front-h', String(who).toUpperCase(), 30, { seed: 'fronth', maxWidth: 300 }, who),
            h('p', { class: 'cb-typed cb-small bx-front-issue', text: L('frontIssue', { n: (s.clock && num(s.clock.week) ? s.clock.week : 0) + 1 }) })]),
          h('div', { class: 'bx-front-photo' }, [copierPhoto(300, 170, 'front' + (recs.length ? recs[0].showId : 'none') + (s.seed || ''), 'white', crowdPlan)]),
          h('div', { class: 'bx-front-figs', role: 'img', aria: { label: recs.length + ' ' + L(recs.length === 1 ? 'frontShowsOne' : 'frontShows') + ', ' + heads0 + ' ' + L('frontHeads') } }, [
            h('span', { class: 'bx-fig', html: mk(String(recs.length), 40, { seed: 'fs' + recs.length }) }), h('span', { class: 'cb-typed bx-fig-k', text: L(recs.length === 1 ? 'frontShowsOne' : 'frontShows').toUpperCase() }),
            h('span', { class: 'bx-fig', html: mk(String(heads0), 40, { seed: 'fh' + heads0 }) }), h('span', { class: 'cb-typed bx-fig-k', text: L('frontHeads').toUpperCase() })]),
          h('div', { class: 'bx-front-text' }, lines.map(function (t) { return h('p', { class: 'cb-typed', text: t }); }))
        ]);
        paperOn(el, 'white', 'front' + (s.seed || ''), 'b');
        return el;
      }

      /* firsts typed on an index card, earned patches loose beside it */
      function firstsCard(s) {
        var firsts = safe(function () { return SB.Legacy.firsts(s); }, []), el;
        el = h('section', { class: 'bx-card bx-firsts', aria: { label: L('townFirsts') } }, [
          mkEl('h2', 'bx-card-h', L('townFirsts').toUpperCase(), 22, { seed: 'fst' }, L('townFirsts')),
          firsts.length ? h('ol', null, firsts.filter(function (x) { return x.text; }).slice(0, 12).map(function (fi) {
            return h('li', { class: 'cb-typed cb-small' }, [h('strong', { text: L('townWeek', { n: fi.week + 1 }) + ' ' }), fi.text]); }))
            : h('p', { class: 'cb-typed cb-small', text: L('townFirstsNone') })]);
        return tilt(el, -1.4);
      }
      function patchesBit(s) {
        var all = safe(function () { return SB.Patches.all(s); }, []) || [], got = all.filter(function (p) { return p.earned; }), words = (SB.Content.story && SB.Content.story.patches) || {};
        if (!got.length || !SB.Scenes || !SB.Scenes.patch) return null;
        return h('section', { class: 'bx-patches', aria: { label: L('patchesH') } }, [
          h('h2', { class: 'bx-k' }, D().stripArt(L('patchesH'), 11)),
          h('ul', null, got.map(function (p, i) {
            var w = words[p.id] || {}, name = w.name || String(p.id).replace(/_/g, ' ').toLowerCase(), cv = safe(function () { return SB.Scenes.patch(p.id, { name: name, kind: p.kind, earned: true, size: 84 }); }, null);
            if (cv && cv.setAttribute) cv.setAttribute('aria-hidden', 'true');
            return h('li', { class: 'bx-patch', style: { '--r': ((i * 47) % 11 - 5) * 1.6 + 'deg' }, aria: { label: name + (w.card ? '. ' + w.card : '') } }, cv ? [cv] : [h('span', { class: 'cb-typed cb-small', text: name })]);
          }))]);
      }

      /* the rooms: a photo of each room the shows went in, with its count; closed rooms are gone, not failures */
      function roomsBit(s, recs) {
        var by = {}, list = [];
        recs.forEach(function (r) { if (!r.roomId) return; by[r.roomId] = by[r.roomId] || { n: 0, last: null }; by[r.roomId].n++; by[r.roomId].last = r.day; });
        Object.keys(by).forEach(function (id) { var room = s.rooms && s.rooms[id]; if (room) list.push({ room: room, n: by[id].n, last: by[id].last }); });
        if (!list.length) return null;
        list.sort(function (a, b) { return b.n - a.n; });
        return h('section', { class: 'bx-rooms', aria: { label: L('roomsH') } }, [
          h('h2', { class: 'bx-k' }, D().stripArt(L('roomsH'), 11)),
          h('ul', null, list.slice(0, 8).map(function (x, i) {
            var gone = x.room.open === false, nm = String(x.room.name || '').replace(/^the /i, ''), cnt = x.n === 1 ? L('roomShowsOne') : L('roomShowsN', { n: x.n });
            return h('li', { class: 'bx-room' + (gone ? ' is-gone' : ''), style: { '--r': ((i * 29) % 7 - 3) * 0.9 + 'deg' }, aria: { label: x.room.name + ', ' + cnt + (gone ? ', ' + L('roomGone') : '') } }, [
              h('div', { class: 'bx-room-photo' }, [roomPhoto(x.room, 196, 122), gone ? h('span', { class: 'bx-gone', aria: { hidden: 'true' }, html: mk(L('roomGone').toUpperCase(), 26, { seed: 'gone' + x.room.id }) }) : null]),
              h('p', { class: 'bx-room-name', aria: { hidden: 'true' }, html: mk(nm.toUpperCase(), 15, { seed: 'rn' + x.room.id, maxWidth: 190 }) }),
              h('p', { class: 'cb-typed cb-small', aria: { hidden: 'true' }, text: cnt + ' · ' + L('roomLast', { date: SB.time.fmt(x.last, 'md') }) })
            ]);
          }))]);
      }
      /* the people: who you met along the way and what they do, on the cards they handed you */
      function peopleBit(s) {
        var cards = [];
        safe(function () {
          Object.keys(s.people || {}).forEach(function (id) { var p = s.people[id]; if (p && p.met !== null && p.met !== undefined && p.roles && p.roles.length) cards.push({ id: id, met: p.met, roles: p.roles, state: p.state }); });
        }, null);
        if (!cards.length) return null;
        cards.sort(function (a, b) { return a.met - b.met; });
        return h('section', { class: 'bx-people', aria: { label: L('peopleH') } }, [
          h('h2', { class: 'bx-k' }, D().stripArt(L('peopleH'), 11)),
          h('ul', null, cards.slice(0, 10).map(function (x, i) {
            var c = safe(function () { return SB.People.card(s, x.id); }, null), el;
            if (!c) return null;
            el = h('li', { class: 'bx-pcard' + (x.state !== 'ACTIVE' ? ' is-gone' : ''), style: { '--r': ((i * 31) % 7 - 3) * 0.8 + 'deg' } }, [
              h('p', { class: 'cb-typed bx-pcard-n', text: c.name }),
              h('p', { class: 'cb-typed cb-small', text: x.roles.map(function (q) { return String(q).toLowerCase().replace(/_/g, ' '); }).join(', ') + (c.where ? ' · ' + c.where : '') })]);
            return el;
          }))]);
      }
      /* the chapters and their cutscenes, kept on tape: the notebook's list (watch one again from here too) */
      function tapesBit(s) {
        var el = SB.UI.story && SB.UI.story.chapters ? safe(function () { return SB.UI.story.chapters(s); }, null) : null;
        if (!el) return null;
        return h('section', { class: 'bx-tapes', aria: { label: L('tapesH') } }, [mkEl('h2', 'bx-card-h', L('tapesH').toUpperCase(), 20, { seed: 'tps' }, L('tapesH')), el]);
      }

      function boxView(s) {
        var all = safe(function () { return SB.Legacy.binder(s, {}); }, []), recs, years = {}, rooms = {}, groups = [], byYear = {}, yTabs, rTabs, tray, thin = all.length > 0 && all.length < 4, clipsEl = clipsView(s);
        all.forEach(function (r) { years[SB.time.year(r.day)] = 1; if (r.roomId) rooms[r.roomId] = r.roomName; });
        recs = all.filter(function (r) { return (!fYear || String(SB.time.year(r.day)) === fYear) && (!fRoom || r.roomId === fRoom); });
        recs.forEach(function (r) {
          var y = SB.time.year(r.day);
          if (!byYear[y]) { byYear[y] = { year: y, recs: [] }; groups.push(byYear[y]); }
          byYear[y].recs.push(r);
        });
        groups.reverse();
        yTabs = Object.keys(years).length > 1 ? D().tabs({ label: L('year'), title: L('year'), size: 10, items: [{ text: L('allYears'), on: !fYear, fk: 'y-', onClick: function () { fYear = ''; keepFocus(render); } }]
              .concat(Object.keys(years).map(function (y) { return { text: y, on: fYear === y, fk: 'y-' + y, onClick: function () { fYear = fYear === y ? '' : y; keepFocus(render); } }; })) }) : null;
        rTabs = Object.keys(rooms).length > 1 ? D().tabs({ label: L('room'), title: L('room'), size: 10, cls: 'p2-roomtabs', items: [{ text: L('allRooms'), on: !fRoom, fk: 'r-', onClick: function () { fRoom = ''; keepFocus(render); } }]
              .concat(Object.keys(rooms).map(function (id) { var t = String(rooms[id] || '').replace(/^the /i, ''); return { text: t.slice(0, 22), label: rooms[id], on: fRoom === id, fk: 'r-' + id, onClick: function () { fRoom = fRoom === id ? '' : id; keepFocus(render); } }; })) }) : null;
        tray = h('section', { class: 'bx-tray' + (thin ? ' is-thin' : ''), aria: { label: L('boxLabel') } }, [
          h('div', { class: 'bx-lid', aria: { hidden: 'true' } }, [
            h('span', { class: 'bx-lid-label' }, [h('span', { class: 'bx-lid-mk', html: mk(L('lid').toUpperCase() + (all.length ? ' ' + SB.time.year(all[0].day) + '–' : ''), 22, { seed: 'lid' }) }),
              h('span', { class: 'cb-typed cb-small', text: L('lidKeep') })])]),
          h('div', { class: 'bx-filters' }, [yTabs, rTabs, all.length ? h('p', { class: 'cb-typed cb-small bx-hint', text: L('holdHint') }) : null]),
          all.length ? h('div', { class: 'bx-years' }, groups.map(function (g) {
            var stack = g.recs.slice().reverse();
            return h('section', { class: 'bx-year', aria: { label: String(g.year) } }, [
              h('div', { class: 'bx-yeartab', aria: { hidden: 'true' } }, [h('span', { class: 'bx-yeartab-mk', html: mk(String(g.year), 22, { seed: 'yt' + g.year, maxWidth: 76 }) }),
                h('span', { class: 'cb-typed cb-small', text: stack.length === 1 ? L('stackOne') : L('stackN', { n: stack.length }) })]),
              h('div', { class: 'bx-stack' + (stack.length === 1 ? ' is-one' : '') }, stack.map(function (r, i) {
                var rot = ((i * 53 + r.day) % 11 - 5) * (thin ? 1.5 : 1.1), dy = ((i * 31 + r.day) % 7) * (thin ? 4 : 2);
                return h('div', { class: 'bx-piled', style: { '--r': f(rot) + 'deg', '--dy': dy + 'px', 'z-index': String(stack.length - i) } }, pickable(r, thin ? 205 : (stack.length === 1 ? 190 : 128), 'bx-flyer'));
              })),
              thin ? paperOn(tilt(h('div', { class: 'bx-thinnote' }, [h('p', { class: 'cb-typed', text: stack.length === 1 ? L('thinOne') : L('thinN', { n: ['', '', 'two', 'three'][stack.length] || stack.length }) })]), 1.6), 'canary', 'thin' + g.year, 'rb') : null
            ]);
          })) : h('div', { class: 'bx-emptybox' }, [scrap(L('flyersEmpty'), 'bone')]),
          thin ? clipsEl : null
        ]);
        return h('div', { class: 'bx-grid' }, [
          h('div', { class: 'bx-main' }, [
            tray,
            thin ? null : clipsEl,
            h('div', { class: 'bx-loose' }, [firstsCard(s), patchesBit(s)]),
            roomsBit(s, all),
            h('div', { class: 'bx-loose' }, [peopleBit(s), tapesBit(s)])
          ]),
          h('aside', { class: 'bx-side' }, [held ? heldPanel(s) : frontPage(s, all)])
        ]);
      }
      function heldPanel(s) {
        var r = held, show, back;
        show = s.shows && s.shows[r.showId];
        back = !!flipped[r.showId];
        return h('div', { class: 'bx-held p2-held', aria: { label: L('holding') } }, [
          h('p', { class: 'bx-k bx-held-k', aria: { hidden: 'true' } }, D().stripArt(L('holding'), 11)),
          back
            ? h('div', { class: 'cb-piece cb-stock-white p2-flyerback' }, [
                show && show.result && C().ShowResult ? C().ShowResult({ show: show, onNote: function (key) { SB.UI.go('notebook', { key: key }); } }) : h('p', { class: 'cb-typed', text: billText(r) })])
            : h('div', { class: 'bx-heldflyer p2-heldflyer' }, [flyerEl(r, 300), bxTape('bx-tape--tl'), bxTape('bx-tape--br')]),
          paperOn(h('div', { class: 'bx-heldcard p2-heldcard' }, [
            h('p', { class: 'cb-typed', text: showName(r) }),
            h('p', { class: 'cb-typed cb-small', text: billText(r) }),
            r.story && r.story.name ? h('p', { class: 'bx-heldstory', role: 'img', aria: { label: r.story.name }, html: mk(r.story.name, 17, { seed: 'hs' + r.showId, maxWidth: 290 }) }) : null,
            r.story && num(r.story.told) ? h('p', { class: 'cb-typed cb-small', text: L('counted', { n: r.heads }) + ' · ' + L('told', { n: r.story.told }) }) : null
          ]), 'bone', 'held' + r.showId, 'b'),
          h('div', { class: 'cb-row p2-heldacts' }, [
            D().act(back ? L('flipBack') : L('flip'), back ? L('flipBack') : L('flip'), 'h-flip', function () { flipped[r.showId] = !back; keepFocus(render); }, { size: 11 }),
            r.flyer ? D().act(L('exportPng'), L('exportPng'), 'h-png', function () { exportFlyer(r); }, { size: 11 }) : null,
            D().act(L('putBack'), L('putBack'), 'h-back', function () { held = null; render(); var el = root.querySelector('[data-fk="fl-' + r.showId + '"]'); if (el) el.focus(); }, { size: 11 })
          ])
        ]);
      }

      /* ---------- bands: each a strip of its flyers ---------- */
      function bandsView(s) {
        var cards = safe(function () { return SB.Bands.list(s, {}).map(function (id) { return SB.Bands.card(s, id); }); }, []);
        cards = cards.filter(function (c) { return c && c.shows && c.shows.length && ((c.tierPublic || 0) >= 2 || (c.history && c.history.length)); });
        if (!cards.length) return scrap(L('bandsEmpty'), 'bone');
        return h('ul', { class: 'p2-bandstrips' }, cards.map(function (c, i) {
          var hist = safe(function () { return SB.Legacy.bandHistory(s, c.id); }, null), recs = safe(function () { return SB.Legacy.binder(s, { bandId: c.id }); }, []);
          return h('li', { class: 'p2-bandstrip', style: { '--r': (i % 2 ? 0.6 : -0.5) + 'deg' } }, [
            D().thing({ cls: 'p2-bandsticker', label: L('openBand', { band: c.name }), fk: 'band-' + c.id, svg: D().bandSticker(c, 190), w: 190, h: 80, strip: c.name.slice(0, 18), stripSize: 9,
                        onClick: function () { SB.UI.go('band', { bandId: c.id }); } }),
            h('div', { class: 'p2-filmstrip', role: 'list', aria: { label: c.name } }, recs.map(function (r) {
              return h('div', { class: 'p2-filmcell', role: 'listitem', aria: { label: showName(r) } }, [flyerEl(r, 62), h('span', { class: 'p2-filmdate', text: SB.time.fmt(r.day, 'md') })]);
            })),
            h('div', { class: 'cb-piece cb-stock-white p2-bandhist' }, [
              h('p', { class: 'cb-typed cb-small', text: SB.text.label('bandTier.' + c.tierPublic) + ' · ' + L('playedFor', { n: c.shows.length }) }),
              hist && hist.lines.length ? h('ul', null, hist.lines.map(function (x) { return h('li', { class: 'cb-typed cb-small', text: x.text }); })) : null,
              hist && hist.yourPart ? h('p', { class: 'cb-typed cb-small', text: hist.yourPart }) : null
            ])
          ]);
        }));
      }

      /* ---------- the town: a line climbing a page, the rungs labelled ---------- */
      function townView(s) {
        var tl = safe(function () { return SB.Legacy.townLine(s); }, null), firsts = safe(function () { return SB.Legacy.firsts(s); }, []), w = safe(function () { return SB.Territory.word(s); }, null),
            tiers = SB.Enums.WORD_TIERS, cuts = (SB.Config && SB.Config.WORD && SB.Config.WORD.tiers) || [20, 40, 60, 80], k = K(), W = 640, H = 420, x0 = 168, x1 = W - 30, y0 = 30, y1 = H - 44,
            pts = (tl && tl.line) || [], maxW = Math.max(10, s.clock.week + 1), out = '', inner = '', i, Y, X, line = [], last = null, rooms = { open: [], gone: [] };
        Y = function (v) { return y1 - Math.max(0, Math.min(100, v)) / 100 * (y1 - y0); };
        X = function (wk) { return x0 + wk / maxW * (x1 - x0); };
        for (i = 20; i < W - 10; i += 20) inner += '<path d="M' + i + ' 10V' + (H - 10) + '" stroke="#5a7fa6" stroke-opacity=".25" stroke-width=".8"/>';
        for (i = 20; i < H - 10; i += 20) inner += '<path d="M10 ' + i + 'H' + (W - 10) + '" stroke="#5a7fa6" stroke-opacity=".25" stroke-width=".8"/>';
        /* the rungs: a cut line at each threshold, the tier's name written in its band */
        [0].concat(cuts).forEach(function (c, j) {
          var top = j < cuts.length ? cuts[j] : 100, nm = SB.text.label('wordTier.' + tiers[j] + '.name'), mid = (Y(c) + Y(j < cuts.length ? cuts[j] : 100)) / 2, now = w && w.tier === tiers[j];
          if (j > 0) inner += k.line(x0 - 150, Y(c), x1, Y(c), { seed: 'rg' + j, sw: 2, over: 0, wob: 0.8 });
          if (now) inner += k.under3(x0 - 150, mid + 10, Math.min(140, k.letterWidth(nm, 15)), { seed: 'rnu' + j, sw: 1.8, gap: 3 });
          inner += k.letter(nm, x0 - 150, mid + 6, 15, { seed: 'rn' + j, maxWidth: 150 });
          if (j === cuts.length) inner += k.line(x0 - 150, Y(top), x1, Y(top), { seed: 'rgt', sw: 1.4, over: 0, dash: '4 4' });
        });
        inner += k.line(x0, y0 - 6, x0, y1 + 4, { seed: 'ax', sw: 2.4, over: 0 }) + k.line(x0 - 4, y1, x1, y1, { seed: 'axx', sw: 2.4, over: 0 });
        pts.forEach(function (p) { line.push([X(p.week), Y(p.word)]); });
        if (w && num(w.value)) { line.push([X(s.clock.week), Y(w.value)]); last = line[line.length - 1]; }
        if (line.length > 1) inner += k.path(line, { seed: 'tln', sw: 4, wob: 0.8 });
        ((tl && tl.marks) || []).forEach(function (m, j) {
          var mx = X(m.week), my = y1 + 14;
          inner += k.line(mx, y1 - 6, mx, y1 + 6, { seed: 'fm' + j, sw: 2, over: 0 }) + k.type(String(j + 1), mx, my + 8, 9, { anchor: 'middle', bold: true });
        });
        if (last) inner += k.circle3(last[0], last[1], 13, 13, { seed: 'now', stroke: TONER, sw: 2.6 }) + k.arrow(last[0] - 70, last[1] - 46, last[0] - 16, last[1] - 12, { seed: 'nowa', sw: 3 }) +
                           k.marker(L('townNow'), last[0] - 76, last[1] - 50, 18, { anchor: 'end', seed: 'nowm' });
        inner += k.type(L('townWeek', { n: 1 }), x0, y1 + 34, 9) + k.type(L('townWeek', { n: s.clock.week + 1 }), x1, y1 + 34, 9, { anchor: 'end' });
        out = k.paper(8, 8, W - 16, H - 16, { seed: 'twnpg', stock: 'white', burn: 0.4, rot: -0.6, inner: inner });
        safe(function () { SB.Rooms.list(s, {}).forEach(function (id) { var r = s.rooms[id]; (r.open === false ? rooms.gone : rooms.open).push(r.name); }); }, null);
        return h('div', { class: 'p2-towncols' }, [
          h('div', { class: 'p2-col' }, [
            h('div', { class: 'p2-linepage', role: 'img', aria: { label: L('townRungs') + (w ? '. ' + L('townNow') + ': ' + SB.text.label('wordTier.' + w.tier + '.name') : '') } }, [D().art(out, W, H), D().stripArt(L('townRungs'), 11)]),
            w && w.text ? scrap(w.text, 'bone', 'p2-wordtext') : null
          ]),
          h('div', { class: 'p2-col' }, [
            h('div', { class: 'cb-piece cb-stock-white p2-firsts' }, [
              h('h3', { class: 'cb-typed', text: L('townFirsts').toUpperCase() }),
              firsts.length ? h('ol', null, firsts.map(function (fi, j) { return h('li', { class: 'cb-typed cb-small' }, [h('strong', { text: (j + 1) + '. ' + L('townWeek', { n: fi.week + 1 }) + ' ' }), fi.text]); }))
                            : h('p', { class: 'cb-typed cb-small', text: L('townFirstsNone') })
            ]),
            lineScrap(s.regulars && s.regulars.line, 'total', L('townRegulars'), 'rg'),
            lineScrap(s.town && s.town.kidsLine, 'kids', L('townKids'), 'kd'),
            h('div', { class: 'cb-piece cb-stock-bone p2-roomslist' }, [
              h('h3', { class: 'cb-typed', text: L('townRoomsOpen').toUpperCase() + ' ' + rooms.open.length }),
              h('p', { class: 'cb-typed cb-small', text: rooms.open.join(', ') }),
              rooms.gone.length ? h('h3', { class: 'cb-typed', text: L('townRoomsGone').toUpperCase() }) : null,
              rooms.gone.length ? h('p', { class: 'cb-typed cb-small' }, h('s', { text: rooms.gone.join(', ') })) : null
            ])
          ])
        ]);
      }
      function lineScrap(list, key, label, seed) {
        var k = K(), W = 280, Hh = 92, pts, lo, hi, out, i, last;
        if (!list || list.length < 1) return null;
        pts = list.map(function (x) { return x[key] || 0; });
        lo = Math.min.apply(null, pts); hi = Math.max.apply(null, pts); if (hi === lo) hi = lo + 1;
        out = k.type(label.toUpperCase(), 14, 22, 10, { bold: true });
        out += k.path(pts.map(function (v, j) { return [16 + j * (W - 90) / Math.max(1, pts.length - 1), 78 - (v - lo) / (hi - lo) * 46]; }), { seed: 'ls' + seed, sw: 2.6 });
        last = pts[pts.length - 1];
        out += k.marker(String(Math.round(last)), W - 18, 70, 22, { anchor: 'end', seed: 'lsm' + seed + last });
        i = k.paper(4, 4, W - 12, Hh - 10, { seed: 'lsp' + seed, stock: 'white', torn: 'r', sx: 3, sy: 4, burn: 0.3, inner: out });
        return h('div', { class: 'p2-linescrap', role: 'img', aria: { label: label + ': ' + Math.round(last) } }, D().art(i, W, Hh));
      }

      /* ---------- years: zine pages ---------- */
      function yearsView(s) {
        var years = (s.legacy && s.legacy.years) || [];
        if (!years.length || !SB.UI.parts.yearPage) return scrap(L('yearsEmpty'), 'bone');
        return h('div', { class: 'p2-years' }, years.slice().reverse().map(function (y) { return SB.UI.parts.yearPage(y); }));
      }

      /* ---------- the end ---------- */
      function endView(s) {
        var ended = s.legacy && s.legacy.ended, people = [], ids = [], chosen;
        if (ended) {
          return h('div', { class: 'cb-piece cb-stock-white p2-endpage' }, [
            h('h2', { role: 'img', aria: { label: L('ended') } }, D().art(K().ransom(L('ended'), 6, 40, 30, { seed: 'end' }), K().ransomWidth(L('ended'), 30) + 16, 54)),
            h('p', { class: 'cb-typed p2-epilogue', text: ended.epilogue || '' })]);
        }
        safe(function () {
          Object.keys(s.people || {}).forEach(function (id) { var p = s.people[id]; if (p && p.met !== null && p.met !== undefined && p.state === 'ACTIVE' && !p.listed) ids.push(id); });
          people = ids.slice(0, 60).map(function (id) { return SB.People.card(s, id); });
        }, null);
        chosen = Object.keys(picks).filter(function (q) { return picks[q]; }).length;
        return h('div', { class: 'p2-endcols' }, [
          h('section', { class: 'cb-piece cb-stock-white p2-endhand', aria: { label: L('endHand') } }, [
            h('h2', { role: 'img', aria: { label: L('endHand') } }, D().art(K().marker(L('endHand'), 4, 34, 32, { seed: 'eh' }), K().markerWidth(L('endHand'), 32) + 12, 44)),
            h('p', { class: 'cb-typed cb-small', text: L('endIntro') + ' ' + L('endHandHelp') }),
            h('h3', { class: 'cb-typed', text: L('endHandPick').toUpperCase() + ' (' + chosen + '/3)' }),
            people.length ? h('ul', { class: 'p2-endpeople' }, people.map(function (p) {
              return h('li', null, D().tickThing({ on: !!picks[p.id], text: (p.name + (p.where ? ', ' + p.where : '')).slice(0, 34), label: p.name + (p.where ? ', ' + p.where : ''), fk: 'pk-' + p.id,
                onClick: function () { picks[p.id] = !picks[p.id]; keepFocus(render); } }));
            })) : h('p', { class: 'cb-typed cb-small', text: L('nobody') }),
            h('h3', { class: 'cb-typed', text: L('endHandLines').toUpperCase() }),
            [0, 1, 2].map(function (i) {
              return h('label', { class: 'p2-typeline' }, [h('span', { class: 'cb-sr', text: L('endLine', { n: i + 1 }) }), h('span', { class: 'p2-typeline-n', aria: { hidden: 'true' }, text: (i + 1) + '.' }),
                h('input', { type: 'text', class: 'p2-typein', value: lines[i], maxlength: '140', data: { fk: 'ln-' + i }, on: { input: function (e) { lines[i] = e.target.value; } } })]);
            }),
            D().tabs({ label: L('endHand'), size: 12, items: [{ text: L('endHandGo'), fk: 'end-hand', onClick: function () {
              var ch = Object.keys(picks).filter(function (q) { return picks[q]; }), typed = lines.map(function (x) { return x.trim(); }).filter(Boolean);
              if (ch.length !== 3 || typed.length !== 3) { SB.UI.toast(L('endNeedThree'), 'no'); return; }
              confirming = { how: 'HANDED_ON', contacts: ch, lines: typed }; render(); } }] })
          ]),
          h('section', { class: 'p2-col' }, [
            h('div', { class: 'cb-piece cb-stock-bone p2-endlast', aria: { label: L('endLast') } }, [
              h('h2', { role: 'img', aria: { label: L('endLast') } }, D().art(K().marker(L('endLast'), 4, 30, 28, { seed: 'el' }), K().markerWidth(L('endLast'), 28) + 12, 40)),
              h('p', { class: 'cb-typed cb-small', text: L('endLastHelp') }),
              D().tabs({ label: L('endLast'), size: 11, items: [{ text: L('endLastGo'), fk: 'end-last', onClick: function () { confirming = { how: 'LAST_SHOW' }; render(); } }] })
            ]),
            confirming ? h('div', { class: 'cb-piece cb-stock-white p2-endsure', role: 'alertdialog', aria: { label: L('endSure') } }, [
              h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: '!!' }),
              h('p', { class: 'cb-typed', text: L('endSure') }),
              D().tabs({ label: L('endSure'), size: 12, items: [
                { text: L('endYes'), fk: 'end-yes', onClick: function () {
                  var c = confirming;
                  confirming = null;
                  SB.UI.act(function (st) { return c.how === 'HANDED_ON' ? SB.Legacy.end(st, 'HANDED_ON', { contacts: c.contacts, lines: c.lines }) : SB.Legacy.end(st, 'LAST_SHOW'); });
                  render(); } },
                { text: L('endNo'), fk: 'end-no', onClick: function () { confirming = null; render(); } }] })
            ]) : null
          ])
        ]);
      }

      function render() {
        var s = game(), body;
        SB.UI.clear(root);
        if (!s) { root.appendChild(C().Empty({})); return; }
        body = view === 'bands' ? bandsView(s) : (view === 'town' ? townView(s) : (view === 'years' ? yearsView(s) : (view === 'end' ? endView(s) : boxView(s))));
        root.appendChild(h('div', { class: 'p2 p2-pile bx bx--' + view, style: { '--hot': D().cityInk()[0] } }, [
          h('h1', { class: 'cb-sr', text: L('title') }),
          openers(s),
          offersBlock(s),
          h('div', { class: 'p2-pilebody bx-body' }, view === 'wall' ? body : h('div', { class: 'bx-tray bx-tray--open' }, body)),
          SB.UI.calKit && SB.UI.calKit.grainEl ? SB.UI.calKit.grainEl() : null
        ]));
      }

      render();
      return { update: function () { keepFocus(render); }, unmount: function () {} };
    }
  });
})(SB);
