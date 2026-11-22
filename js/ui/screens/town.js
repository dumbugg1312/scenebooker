/* Scene Booker — ui/screens/town.js (UI-B, redrawn as the road map: design/spec/07-desk.md 2, 2b, 3)
 * The folded gas-station road map of the real region, photocopied, on the black table:
 *   around town ...... the home town circled; the feeder towns and the peer cities placed by bearing and drive time
 *                      (the city pack's zones); roads as lines with the drive time written along them, the real bridges
 *                      (the pack's chokepoints) marked and named where a road crosses one; how many of your regulars come
 *                      from each place as a small crowd of heads; the pack's real road names in the map's key. Tap a town
 *                      to read its note pinned beside the map.
 *   the country ...... unfolded further: the lower 48 with a dot for every city in the index, your contacts pinned, the
 *                      open requests' routes and your bands' tours inked on it, and the tour sheet beside it.
 * Spec 05-interface 4.12 for what it shows. Reads SB.Cities.pack, state.zones, Crowd.regulars, Territory.contacts / word /
 * tour / tourCandidates / tourStops, Requests.list / route, Notebook.range. Action: Territory.startTour, through SB.UI.act.
 * Every place and number comes from those views; no geography is invented (no coastline: the region is drawn by bearing).
 */
(function (SB) {
  'use strict';

  SB.Content.ui.town = {
    title: 'Town',
    zoomRegion: 'Around town',
    zoomNation: 'The country',
    unfold: 'unfold it',
    foldBack: 'fold it back',
    mapTitle: 'road map',
    mapSub: '{city} and around',
    ringMin: '{n} min',
    minShort: '{n} min',
    roadsKey: 'roads',
    ringKey: 'each ring: {n} minutes',
    regionLabel: 'The towns around {city}, by how long it takes to drive there.',
    nationLabel: 'The lower 48. Every dot is a city.',
    standing: '{city}: {word}',
    zonePick: 'Tap a town on the map to read about it.',
    zoneSay: '{name}, {min}. {n} of your regulars.',
    zoneDrive: '{n} minutes out',
    zoneScene: 'about {n} people who go to shows',
    zoneRegulars: '{n} of your regulars live here',
    zoneKnow: 'What you know',
    zoneContact: 'Someone you know there: {stage}',
    zoneBeyond: 'The way there runs over {what}.',
    zoneNoKnow: 'You do not know much about it yet.',
    legendArc: 'Lines to the city: more regulars, a thicker line.',
    legendCut: 'A bracket across a road: a bridge, one way in.',
    contacts: 'Numbers out of town',
    routes: 'Routes bands are on',
    routesNone: 'No band has asked for a date on a route yet.',
    routeLine: '{band}: {stops}',
    tours: 'Your bands on tour',
    toursNone: 'No local band is on tour.',
    tourStops: '{n} stops',
    tourStart: 'Send a band out',
    tourBand: 'Which band',
    tourPick: 'Pick the stops',
    tourWeek: 'Start',
    tourGo: 'Send them out',
    tourNone: 'No band can go out yet.',
    tourNoContacts: 'You do not know anyone out of town yet.',
    tourWeekOpt: 'week {n}, a Friday',
    tourWeekTab: 'wk {n}',
    tourMin: '{n} min away',
    tourKnown: 'a contact there',
    tourNeedStops: 'Pick some stops first.',
    contactsNone: 'No contacts out of town yet.',
    standingHead: '{city}:',
    roomsKey: 'The rooms',
    roomsOne: '1 room',
    roomsN: '{n} rooms',
    roomsWhere: 'in {where}',
    roomsHere: 'Rooms here: {list}',
    roomsPhoto: '{kind}: {n}, in {where}.',
    roomsMapKey: 'Marked in pen: the rooms, by kind.',
    doorCARPORT: 'carports',
    doorHOUSE: 'houses',
    doorHALL: 'halls',
    doorBAR: 'bars',
    unknown: '—'
  };

  function L(key, ctx) { return SB.text.label('ui.town.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function K() { return SB.DeskKit; }
  /* a drawn piece, shown w by ht in --p (the stage's unit; or the whole width of its box when fluid) and photocopied fine
     enough for the screen: drawn k times larger, scaled back down, so the copier's raster has the pixels --p needs */
  function artP(inner, w, ht, cls, fluid) {
    var res = SB.Finish && SB.Finish.res ? SB.Finish.res() : 1, dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1,
        k = Math.max(1, Math.min(3, Math.ceil(res / Math.max(1.5, Math.min(2, dpr))))), el;
    el = D().art(k > 1 ? '<g transform="scale(' + k + ')">' + inner + '</g>' : inner, w * k, ht * k, cls);
    el.style.width = fluid ? '100%' : 'calc(var(--p) * ' + w + ')'; el.style.height = 'auto'; el.style.aspectRatio = w + ' / ' + ht;
    return el;
  }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function game() { return SB.UI.game(); }
  function has(path) { return SB.text.has('strings.' + path); }
  function lbl(path, fb) { return has(path) ? SB.text.label(path) : (fb || ''); }
  function f(n) { return Math.round(n * 10) / 10; }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'town', String(e && e.message)); return fb; } }
  var TONER = '#141413', PAPER = '#f4f2ea';

  /* A coarse outline of the lower 48: latitude and longitude, clockwise from the Washington coast. */
  var OUTLINE = [
    48.4, -124.7, 46.3, -124.0, 43.0, -124.5, 42.0, -124.4, 40.4, -124.4, 38.9, -123.7, 37.8, -122.5, 36.6, -121.9, 34.6, -120.6, 34.0, -118.5, 32.6, -117.1,
    32.7, -114.7, 31.3, -111.1, 31.3, -108.2, 31.8, -106.5, 29.8, -104.4, 29.0, -103.1, 29.8, -101.4, 28.0, -99.5, 26.0, -97.2,
    27.8, -97.3, 29.3, -94.8, 29.6, -93.8, 29.2, -91.3, 29.0, -89.2, 30.2, -88.1, 30.3, -86.5, 29.7, -85.3, 30.0, -84.0, 29.0, -82.8, 27.0, -82.3, 25.9, -81.7, 25.2, -80.9,
    25.7, -80.2, 27.2, -80.1, 28.4, -80.6, 30.3, -81.4, 32.0, -80.9, 33.9, -78.0, 35.2, -75.5, 36.9, -76.0, 38.0, -75.2, 39.4, -74.4, 40.5, -74.0,
    41.2, -72.0, 41.7, -70.0, 42.7, -70.8, 43.6, -70.2, 44.4, -68.2, 44.8, -67.0, 47.4, -68.3, 47.3, -69.0, 45.0, -71.5, 45.0, -74.7,
    43.6, -76.3, 43.2, -79.0, 42.3, -83.0, 43.6, -82.4, 45.8, -84.7, 46.5, -84.4, 47.5, -89.5, 48.0, -89.6, 48.6, -93.0, 49.0, -95.2, 49.0, -104.0, 49.0, -117.0, 49.0, -123.1
  ];

  function outlinePts() {
    var out = [], i, p;
    for (i = 0; i + 1 < OUTLINE.length; i += 2) { p = SB.geo.project(OUTLINE[i], OUTLINE[i + 1]); out.push([p.x, p.y]); }
    return out;
  }

  function findPlace(name, st, pack) {
    var i, e, pts = (pack && pack.points) || [], idx = SB.CityIndex || [];
    for (i = 0; i < pts.length; i++) if (pts[i].name === name && (!st || !pts[i].state || pts[i].state === st)) return pts[i];
    for (i = 0; i < idx.length; i++) { e = idx[i]; if (e.name === name && (!st || e.state === st)) return e; }
    return null;
  }

  /* the pack's own record for a zone (bearing, scene, the bridge beyond it, its note), merged over the state's */
  function zonesOf(s) {
    var pack = safe(function () { return SB.Cities.pack(s); }, null), pz = {}, list = pack && pack.zones ? (Array.isArray(pack.zones) ? pack.zones : Object.keys(pack.zones).map(function (k) { return pack.zones[k]; })) : [];
    list.forEach(function (z) { if (z && z.id) pz[z.id] = z; });
    return Object.keys(s.zones || {}).map(function (id) {
      var z = s.zones[id], p = pz[id] || {};
      return { id: id, name: z.name || p.name, kind: z.kind || p.kind, minutes: num(z.minutes) ? z.minutes : (p.minutes || 0), bearing: num(p.bearing) ? p.bearing : (z.bearing || 0),
               scene: num(p.scene) ? p.scene : (z.scene || 0), beyond: p.beyond || z.beyond || null, note: p.note || z.note || '', state: p.state || z.state || '' };
    });
  }

  /* ---------------- the rooms, as the map marks them ---------------- */
  var DOORS = ['CARPORT', 'HOUSE', 'HALL', 'BAR'];
  var DOOR_GLYPH = { CARPORT: 'OUTDOOR', HOUSE: 'HOUSE', HALL: 'HALL', BAR: 'BAR' };
  var DOOR_PAPER = { CARPORT: 'goldenrod', HOUSE: 'pink', HALL: 'blue', BAR: 'green' };
  var DOOR_X = { CARPORT: 646, HOUSE: 700, HALL: 650, BAR: 660 };   /* where the night sheet's doorway opens (nightscene.js) */
  function doorOf(card) {
    var ns = SB.NightScene;
    return ns && ns.doorKind ? safe(function () { return ns.doorKind(card); }, 'HOUSE') : (DOOR_GLYPH[card.kind] ? card.kind : 'HOUSE');
  }
  /* every room the rooms screen lists, as { id, name, kind, door, zoneId } */
  function roomsOf(s) {
    var ids = safe(function () { return SB.Rooms.list(s, {}) || []; }, []);
    return ids.map(function (id) {
      var c = safe(function () { return SB.Rooms.card(s, id); }, null);
      return c ? { id: id, name: c.name, kind: c.kind, door: doorOf(c), zoneId: c.zoneId } : null;
    }).filter(Boolean);
  }
  function glyph(door, size) { return safe(function () { return SB.Identity.roomGlyph(DOOR_GLYPH[door] || 'HOUSE', size); }, ''); }
  function roomsCount(n) { return n === 1 ? L('roomsOne') : L('roomsN', { n: n }); }

  /* a snapshot of each kind of room: the night screen's doorway sheet (cut-outs in line, the band through the door,
     through the copier on coloured paper), shot once per kind and cropped to a print */
  var SNAPS = {};
  function snapshot(door, seed, dest) {
    var key = door + '|' + seed, e = SNAPS[key], ns = SB.NightScene;
    function paint(cv) {
      safe(function () {
        var src = e.cv, s = src.width / 1220, x0 = Math.max(0, (DOOR_X[door] - 250) * s), w = 480 * s, c = cv.getContext('2d');
        c.drawImage(src, x0, 0, w, src.height, 0, 0, cv.width, cv.height);
      });
    }
    if (!e) {
      e = SNAPS[key] = { ready: false, cv: null, waits: [] };
      if (ns && ns.doorway && typeof document !== 'undefined' && document.createElement) safe(function () {
        var big = document.createElement('canvas'); big.width = 976; big.height = 288;
        ns.doorway(big, { room: door, phase: 'doors', line: 3, seed: 'town:' + seed + ':' + door, paper: DOOR_PAPER[door] }, function () {
          e.cv = big; e.ready = true; e.waits.forEach(paint); e.waits = [];
        });
      });
    }
    if (e.ready) paint(dest); else e.waits.push(dest);
  }

  /* pieces of paper cut from the copy stock: a cut or torn edge from the shared set (css/finish.css --edge-*); a note that
     is not already a .cb-piece is a .pz-paper (toner edge, shadow down and right) on the stock's colour */
  var STOCK = { white: 'var(--pp-white)', bone: 'var(--pp-buff)', canary: 'var(--pp-buff)', goldenrod: 'var(--pp-kraft)', pink: 'var(--pp-salmon)', blue: 'var(--pp-blue)', green: 'var(--pp-green)',
                salmon: 'var(--pp-salmon)', lilac: 'var(--pp-gray)', kraft: 'var(--pp-kraft)', index: 'var(--pp-white)', tape: 'var(--pp-buff)' };
  function edgeFor(edges, seed) {
    var e = String(edges || ''), n = 0, i;
    if (e === 'b') return 'var(--edge-torn-b)';
    if (e === 't') return 'var(--edge-torn-t)';
    if (e.indexOf('r') >= 0) return 'var(--edge-torn-r)';
    for (i = 0; i < String(seed).length; i++) n += String(seed).charCodeAt(i);
    return 'var(--edge-cut-' + (n % 3 + 1) + ')';
  }
  function paperUp(el, stock, seed, edges) {
    el.classList.add('tw-paper');
    el.style.setProperty('--edge', edgeFor(edges, seed));
    if (!el.classList.contains('cb-piece')) { el.classList.add('pz-paper'); el.style.setProperty('--paper', STOCK[stock] || 'var(--pp-white)'); }
    return el;
  }
  function marker(text, size, o) {
    var ns = SB.NightScene;
    return ns && ns.marker ? safe(function () { return ns.marker(String(text), size, o || {}); }, '') : '';
  }
  function taped(el, rot, tapes) {
    return h('div', { class: 'tw-taped', style: { '--rot': rot + 'deg' } }, [el].concat((tapes || ['top']).map(function (t) { return h('span', { class: 'tw-tape tw-tape--' + t, aria: { hidden: 'true' } }); })));
  }

  SB.UI.screen('town', {
    rail: 'town', title: 'ui.town.title', full: false,
    mount: function (root, params) {
      var zoom = params && params.zoom === 'nation' ? 'nation' : 'region', pickedZone = null, tour = { bandId: '', stops: {}, weekOff: 1 };

      function keepFocus(fn) {
        var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el;
        fn();
        if (key) { el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null); if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } } }
      }
      function cityName(s) { return s.zones && s.zones.city ? s.zones.city.name : ''; }
      function scrap(text, stock, cls) { return h('div', { class: 'cb-piece cb-stock-' + (stock || 'white') + ' p2-scrap' + (cls ? ' ' + cls : '') }, h('p', { class: 'cb-typed cb-small', text: text })); }

      /* the fold-out control: a little folded map with a label strip */
      function folder(toNation) {
        var k = K(), art = '', i;
        for (i = 0; i < 3; i++) art += k.paper(14 + i * 22, 14 + (i % 2) * 4, 24, 46, { seed: 'fo' + i, stock: i === 1 ? 'bone' : 'white', sx: 2, sy: 3, burn: 0.4,
          inner: k.path([[16 + i * 22, 50], [26 + i * 22, 30], [36 + i * 22, 22]], { seed: 'fol' + i, sw: 1.6 }) });
        return D().thing({ cls: 'p2-fold', label: toNation ? L('unfold') + ': ' + L('zoomNation') : L('foldBack') + ': ' + L('zoomRegion'), fk: 'fold', svg: art, w: 100, h: 68,
                           strip: toNation ? L('unfold') + ' → ' + L('zoomNation') : '← ' + L('foldBack'), stripSize: 10,
                           onClick: function () { zoom = toNation ? 'nation' : 'region'; keepFocus(render); } });
      }

      /* your town on the map: the pin (a ringed dot) and the name in ransom letters on a highlighter swipe, 2.4 times what
         the other places get, askew, stamped on. Drawn on its own sheet laid over the map, centred on the pin, so it can be
         stamped (mv-stamp, in moves()); the room marks and the click target stay in the map under it. */
      function homeHero(W, H, cx, cy, name) {
        var k = K(), one = k.ransomWidth(name, 22) || 1, right = (W - 40 - cx) > (cx - 40), room = Math.max(W - 40 - cx, cx - 40) - 90, size = Math.max(40, Math.min(54, 22 * room / one)),
            nw = k.ransomWidth(name, size), w = Math.ceil(nw + 150), ht = 134, px = right ? 68 : w - 68, art = '', pct;
        art += '<circle cx="' + px + '" cy="67" r="20" fill="' + TONER + '"/>' + k.circle3(px, 67, 62, 54, { seed: 'home', stroke: TONER, sw: 7 });
        art += '<path d="M' + (right ? px + 74 : px - 74 - nw - 8) + ' 96L' + (right ? px + 74 + nw + 8 : px - 74) + ' 92" stroke="#F2D93B" stroke-opacity=".8" stroke-width="30"/>';
        art += k.ransom(name, right ? px + 78 : px - 78, 100, size, { anchor: right ? 'start' : 'end', seed: 'hm' });
        pct = px / w * 100;
        return h('div', { class: 'tw-home', aria: { hidden: 'true' },
          style: { left: f(cx / W * 100) + '%', top: f(cy / H * 100) + '%', width: f(w / W * 100) + '%', transform: 'translate(-' + f(pct) + '%, -50%) rotate(-6deg)', transformOrigin: f(pct) + '% 50%' } },
          artP(art, w, ht, 'tw-homeart', true));
      }

      /* the moves (js/ui/finish.js): the notes and snapshots slap on one after another when the map first opens (and when
         it is folded out or back), your town is stamped on; the buttons get the highlighter */
      var moved = '';
      function dress() {
        var F = SB.Finish, key = zoom, first = moved !== key, hero, list;
        Array.prototype.forEach.call(root.querySelectorAll('button, a[href], [role="button"]'), function (b) { b.classList.add('pz-hl'); });
        if (!F) return;
        if (first) {
          list = Array.prototype.slice.call(root.querySelectorAll('.p2-mapside > *, .tw-pola'));
          F.stagger(list, 3);
          list.forEach(function (el) { el.classList.add('mv-slap'); });
          hero = root.querySelector('.tw-home');
          if (hero) F.move(hero, 'stamp', { delay: 260, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
        }
        moved = key;
      }

      /* ---------------- around town ---------------- */
      function regionView(s) {
        var k = K(), W = 860, H = 620, cx = 440, cy = 300, R = 250, zones = zonesOf(s), maxMin = 60, scale, reg = null, byZone = {}, pack = safe(function () { return SB.Cities.pack(s); }, null),
            chokes = {}, named = {}, out = '', inner = '', pos = {}, unit = 1, maxReg = 0, hits = [], i, ringStep = 30, rings = [], letters = 'ABCDEFGH';
        zones.forEach(function (z) { if (num(z.minutes) && z.minutes > maxMin) maxMin = z.minutes; });
        /* fit the farthest places to the sheet, home in the middle: the scale is minutes, the direction is the real bearing */
        /* home sits where the places around it leave room: lower when they are mostly north, and so on */
        (function () {
          var n = 1, so = 1, we = 1, ea = 1;
          zones.forEach(function (z) {
            var b = (z.bearing || 0) * Math.PI / 180, m = z.minutes || 0;
            if (z.kind === 'CITY') return;
            n = Math.max(n, Math.cos(b) * m); so = Math.max(so, -Math.cos(b) * m); ea = Math.max(ea, Math.sin(b) * m); we = Math.max(we, -Math.sin(b) * m);
          });
          cy = Math.max(170, Math.min(H - 170, 100 + (H - 200) * n / (n + so)));
          cx = Math.max(240, Math.min(W - 240, 150 + (W - 300) * we / (we + ea)));
        })();
        scale = Infinity;
        zones.forEach(function (z) {
          var b = (z.bearing || 0) * Math.PI / 180, dx = Math.abs(Math.sin(b)) * (z.minutes || 0), dy = Math.abs(Math.cos(b)) * (z.minutes || 0);
          if (z.kind === 'CITY') return;
          var sx = Math.sin(b) >= 0 ? W - 150 - cx : cx - 150, sy = Math.cos(b) >= 0 ? cy - 100 : H - 110 - cy;
          if (dx > 1) scale = Math.min(scale, sx / dx);
          if (dy > 1) scale = Math.min(scale, sy / dy);
        });
        if (!isFinite(scale)) scale = R / maxMin;
        var rooms = roomsOf(s), roomsBy = {}, home = cityName(s);
        rooms.forEach(function (rm) { (roomsBy[rm.zoneId] = roomsBy[rm.zoneId] || []).push(rm); });
        Object.keys(roomsBy).forEach(function (zid) { roomsBy[zid].sort(function (a, b) { return DOORS.indexOf(a.door) - DOORS.indexOf(b.door); }); });
        reg = safe(function () { return SB.Crowd.regulars(s); }, null);
        (reg && reg.byZone || []).forEach(function (x) { byZone[x.zoneId] = x.n; if (x.n > maxReg) maxReg = x.n; });
        unit = maxReg > 40 ? 10 : (maxReg > 16 ? 5 : (maxReg > 8 ? 2 : 1));
        ((pack && pack.chokepoints) || []).forEach(function (c) { chokes[c.id] = c; });
        zones.forEach(function (z) {
          var b = (z.bearing || 0) * Math.PI / 180, r = (z.minutes || 0) * scale;
          pos[z.id] = z.kind === 'CITY' ? { x: cx, y: cy } : { x: cx + Math.sin(b) * r, y: cy - Math.cos(b) * r };
        });
        /* the sheet: grid letters and numbers along the edge, two folds each way, halftone on one side of each */
        for (i = 0; i < 8; i++) inner += k.type(letters.charAt(i), 30 + (i + 0.5) * (W - 60) / 8, 30, 11, { anchor: 'middle', bold: true }) + '<path d="M' + f(30 + i * (W - 60) / 8) + ' 18V36" stroke="' + TONER + '" stroke-width="1.2"/>';
        for (i = 0; i < 6; i++) inner += k.type(String(i + 1), 22, 44 + (i + 0.5) * (H - 70) / 6, 11, { anchor: 'middle', bold: true });
        inner += '<path d="M30 38H' + (W - 30) + 'V' + (H - 24) + 'H30Z" fill="none" stroke="' + TONER + '" stroke-width="2.2"/>';
        [W / 3, 2 * W / 3].forEach(function (x, j) { inner += '<path d="M' + f(x) + ' 8V' + (H - 8) + '" stroke="#000" stroke-opacity=".25" stroke-width="1.4"/>' + k.dotsRect(x + (j ? -10 : 0), 8, 10, H - 16, 1, { op: 0.55 }); });
        inner += '<path d="M8 ' + (H / 2) + 'H' + (W - 8) + '" stroke="#000" stroke-opacity=".25" stroke-width="1.4"/>' + k.dotsRect(8, H / 2, W - 16, 9, 1, { op: 0.55 });
        /* rings of drive time */
        for (i = ringStep; i <= maxMin + 5; i += ringStep) rings.push(i);
        /* the gas-station map's colour: each band of drive time printed in its own pale tint, nearest on top */
        inner = rings.slice().reverse().map(function (m, j) {
          var tints = ['#F5E9AE', '#F6D5DC', '#D8E5F1', '#DDEBCF'];
          return '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(m * scale) + '" fill="' + tints[(rings.length - 1 - j) % 4] + '"/>';
        }).join('') + inner;
        rings.forEach(function (m) {
          inner += '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(m * scale) + '" fill="none" stroke="' + TONER + '" stroke-opacity=".55" stroke-width="1.3" stroke-dasharray="2 6"/>';
          inner += k.type(L('ringMin', { n: m }).toUpperCase(), cx + 6, cy - m * scale - 5, 9, { bold: true, fill: '#55544f' });
        });
        /* the roads: a cased line from town to each place, wider with more regulars; the drive time written along it */
        zones.forEach(function (z) {
          var p = pos[z.id], n = byZone[z.id] || 0, peer = z.kind === 'PEER', wv = peer ? 7 : 4 + Math.min(6, n / Math.max(1, unit) * 0.8), ang, mx, my, tx, ck, bx, by, nx, ny, L2, t;
          if (z.kind === 'CITY') return;
          /* where your regulars drive in from: gone over with a highlighter */
          if (n > 0) inner += '<path d="M' + cx + ' ' + cy + 'L' + f(p.x) + ' ' + f(p.y) + '" stroke="#F2D93B" stroke-opacity=".78" stroke-width="' + f(wv + 16) + '" stroke-linecap="round"/>';
          inner += k.line(cx, cy, p.x, p.y, { seed: 'rd' + z.id, sw: wv + 3.5, over: 0, wob: 1.4 }) + '<path d="M' + cx + ' ' + cy + 'L' + f(p.x) + ' ' + f(p.y) + '" stroke="' + PAPER + '" stroke-width="' + f(Math.max(1.2, wv - 3)) + '"' + (peer ? '' : ' stroke-dasharray="9 5"') + '/>';
          ang = Math.atan2(p.y - cy, p.x - cx) * 180 / Math.PI; if (ang > 90) ang -= 180; if (ang < -90) ang += 180;
          mx = cx + (p.x - cx) * 0.62; my = cy + (p.y - cy) * 0.62; t = L('minShort', { n: z.minutes }).toUpperCase(); tx = k.typeWidth(t, 10);
          inner += '<g transform="rotate(' + f(ang) + ' ' + f(mx) + ' ' + f(my) + ')"><path d="M' + f(mx - tx / 2 - 4) + ' ' + f(my - 16) + 'h' + f(tx + 8) + 'v13h' + f(-(tx + 8)) + 'Z" fill="' + PAPER + '"/>' +
                   k.type(t, mx, my - 6, 10, { anchor: 'middle', bold: true }) + '</g>';
          ck = z.beyond && chokes[z.beyond] ? chokes[z.beyond] : null;
          if (ck) {
            L2 = Math.sqrt((p.x - cx) * (p.x - cx) + (p.y - cy) * (p.y - cy)) || 1; nx = -(p.y - cy) / L2; ny = (p.x - cx) / L2;
            bx = cx + (p.x - cx) * 0.34; by = cy + (p.y - cy) * 0.34;
            inner += '<g stroke="' + TONER + '" stroke-width="2.6" fill="none">' + [1, -1].map(function (sd) {
              var ux = (p.x - cx) / L2, uy = (p.y - cy) / L2, ax = bx - ux * 10 + nx * sd * 9, ay = by - uy * 10 + ny * sd * 9, ex = bx + ux * 10 + nx * sd * 9, ey = by + uy * 10 + ny * sd * 9;
              return '<path d="M' + f(ax - ux * 4 + nx * sd * 5) + ' ' + f(ay - uy * 4 + ny * sd * 5) + 'L' + f(ax) + ' ' + f(ay) + 'L' + f(ex) + ' ' + f(ey) + 'L' + f(ex + ux * 4 + nx * sd * 5) + ' ' + f(ey + uy * 4 + ny * sd * 5) + '"/>';
            }).join('') + '</g>';
            if (!named[ck.id]) {
              named[ck.id] = true;
              t = String(ck.name).replace(/^the /i, '').toUpperCase();
              inner += '<path d="M' + f(bx + nx * 16 - 3) + ' ' + f(by + ny * 16 - 11) + 'h' + f(k.typeWidth(t, 9) + 6) + 'v14h' + f(-(k.typeWidth(t, 9) + 6)) + 'Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="1"/>' +
                       k.type(t, bx + nx * 16, by + ny * 16, 9, { bold: true });
            }
          }
        });
        /* the rooms, marked in pen beside each place: one glyph a room, on a scrap so it reads over the roads */
        function roomMarks(list, x, y, anchor, perRow) {
          var gs = 21, nr = Math.min(perRow, list.length), rows = Math.ceil(list.length / perRow), w = nr * gs + 6, x0 = anchor === 'end' ? x - w : (anchor === 'middle' ? x - w / 2 : x), o = '';
          o += '<path d="M' + f(x0) + ' ' + f(y - 2) + 'h' + f(w) + 'v' + f(rows * gs + 4) + 'h' + f(-w) + 'Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="1.2"/>';
          list.forEach(function (rm, j) { o += '<g style="color:' + TONER + '">' + D().place(glyph(rm.door, 19), x0 + 4 + (j % perRow) * gs, y + Math.floor(j / perRow) * gs) + '</g>'; });
          return { svg: o, w: w, h: rows * gs + 4 };
        }
        /* the places */
        zones.forEach(function (z) {
          var p = pos[z.id], n = byZone[z.id] || 0, rad, lx, ly, anchor, name = String(z.name || ''), hd = '', hn, j, hw, rm = roomsBy[z.id] || [], mk;
          if (z.kind === 'CITY') {
            /* the pin and the name are THE loud thing: drawn on their own sheet over the map (homeHero), not in the map */
            if (rm.length) { mk = roomMarks(rm, cx - 34, cy + 74, 'end', 6); inner += mk.svg; }
            hits.push({ z: z, x: cx, y: cy + 20 + (mk ? mk.h / 2 : 0), w: 300, h: 140 + (mk ? mk.h : 0) });
            return;
          }
          rad = Math.max(5, Math.min(18, 3 + Math.sqrt(Math.max(0, z.scene || 0)) * 0.5));
          if (z.kind === 'PEER') inner += k.rect(p.x - 11, p.y - 11, 22, 22, { seed: 'pr' + z.id, fill: TONER, sw: 2, wob: 0.6 }) + k.dotsRect(p.x - 7, p.y - 7, 6, 6, 3, { white: true });
          else inner += '<circle cx="' + f(p.x) + '" cy="' + f(p.y) + '" r="' + f(rad) + '" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="2.4"/><circle cx="' + f(p.x) + '" cy="' + f(p.y) + '" r="' + f(rad * 0.45) + '" fill="' + TONER + '"/>';
          anchor = p.x < cx - 30 ? 'end' : (p.x > cx + 30 ? 'start' : 'middle');
          lx = p.x + (anchor === 'end' ? -rad - 8 : (anchor === 'start' ? rad + 8 : 0)); ly = p.y + (anchor === 'middle' ? (p.y < cy ? -rad - 10 : rad + 18) : 5);
          name = name.toUpperCase() + (z.state && pack && z.state !== ((zones.filter(function (q) { return q.kind === 'CITY'; })[0] || {}).state || z.state) ? ', ' + z.state : '');
          hw = z.kind === 'PEER' ? k.ransomWidth(name, 13) : k.typeWidth(name, 12);
          /* keep every name on the sheet: one that would run off an edge goes under its dot instead */
          if ((anchor === 'end' && lx - hw < 40) || (anchor === 'start' && lx + hw > W - 40)) { anchor = 'middle'; lx = Math.max(40 + hw / 2, Math.min(W - 40 - hw / 2, p.x)); ly = p.y + rad + 18; }
          if (z.kind === 'PEER') inner += k.ransom(name, lx, ly, 13, { anchor: anchor, seed: 'pn' + z.id });
          else inner += k.type(name, lx, ly, 12, { anchor: anchor, bold: true });
          if (n > 0) {
            hn = Math.max(1, Math.round(n / unit));
            for (j = 0; j < Math.min(hn, 10); j++) hd += D().head(0 + j * 9, 16, 14, { mode: 'solid' });
            hw = Math.max(hw, Math.min(hn, 10) * 9 + 30);
            inner += '<g transform="translate(' + f(anchor === 'end' ? lx - Math.min(hn, 10) * 9 - 26 : (anchor === 'middle' ? lx - Math.min(hn, 10) * 4.5 - 12 : lx)) + ' ' + f(ly + 4) + ')">' + hd +
                     k.marker(String(n), Math.min(hn, 10) * 9 + 4, 18, 14, { seed: 'zn' + z.id + n }) + '</g>';
          }
          mk = null;
          if (rm.length) {
            inner += k.circle3(p.x, p.y, rad + 9, rad + 7, { seed: 'rc' + z.id, stroke: TONER, sw: 2.6 });
            mk = roomMarks(rm, lx, ly + (n > 0 ? 28 : 7), anchor, 5);
            inner += mk.svg;
          }
          hits.push({ z: z, x: anchor === 'end' ? lx - hw / 2 + rad : (anchor === 'start' ? lx + hw / 2 - rad : lx), y: p.y + (n > 0 ? 12 : 0) + (mk ? mk.h / 2 : 0), w: hw + rad * 2 + 16, h: (n > 0 ? 64 : 40) + (mk ? mk.h : 0) });
        });
        /* the key: north, rings, the pack's road names as shields */
        inner += k.arrow(70, 112, 70, 64, { seed: 'north', sw: 3.4, head: 14 }) + k.marker('N', 62, 134, 20, { seed: 'nn' });
        var roads = (pack && pack.roads) || [], ky = H - 40 - Math.ceil(roads.length / 2) * 26, kx = 46;
        inner += '<path d="M' + kx + ' ' + (ky - 28) + 'h236v' + (H - 36 - ky + 28) + 'h-236Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="2"/>';
        inner += k.type(L('roadsKey').toUpperCase(), kx + 10, ky - 10, 11, { bold: true }) + k.type(L('ringKey', { n: ringStep }).toUpperCase(), kx + 226, ky - 10, 8.5, { anchor: 'end' });
        roads.forEach(function (rd, j) {
          var sx = kx + 12 + (j % 2) * 112, sy = ky + Math.floor(j / 2) * 26, tw = Math.min(96, k.typeWidth(rd, 9.5) + 12);
          inner += '<path d="M' + sx + ' ' + (sy + 1) + 'l' + f(tw / 2) + ' -4l' + f(tw / 2) + ' 4v13l-' + f(tw / 2) + ' 6l-' + f(tw / 2) + ' -6Z" fill="' + TONER + '"/>' +
                   k.type(String(rd).toUpperCase(), sx + tw / 2, sy + 13, 9.5, { anchor: 'middle', bold: true, fill: PAPER, maxWidth: tw - 6 });
        });
        /* the title block */
        var tt = L('mapTitle'), sub = L('mapSub', { city: cityName(s) }).toUpperCase();
        inner += k.ransom(tt, W - 50, H - 66, 26, { anchor: 'end', seed: 'mt' }) + k.type(sub, W - 52, H - 38, 11, { anchor: 'end', bold: true });
        out = k.paper(10, 10, W - 20, H - 20, { seed: 'rmap', stock: 'white', burn: 0.6, inner: inner, cut: 2 }) + k.tape(70, 22, 90, 24, { seed: 'rmt1', rot: -30 }) + k.tape(W - 60, H - 20, 90, 24, { seed: 'rmt2', rot: -26 });
        var mapEl = h('div', { class: 'p2-map', role: 'group', aria: { label: L('regionLabel', { city: cityName(s) }) }, style: { aspectRatio: W + ' / ' + H } }, [
          artP(out, W, H, 'p2-mapart', true),
          homeHero(W, H, cx, cy, home),
          hits.map(function (t) {
            var n = byZone[t.z.id] || 0, min = t.z.kind === 'CITY' ? '' : L('minShort', { n: t.z.minutes });
            return h('button', { type: 'button', class: 'p2-maphit fx' + (pickedZone === t.z.id ? ' is-on' : ''), data: { fk: 'z-' + t.z.id },
              aria: { label: L('zoneSay', { name: t.z.name, min: min, n: n }), pressed: pickedZone === t.z.id ? 'true' : 'false' },
              style: { left: f((t.x - t.w / 2) / W * 100) + '%', top: f((t.y - t.h / 2) / H * 100) + '%', width: f(t.w / W * 100) + '%', height: f(t.h / H * 100) + '%' },
              on: { click: function () { pickedZone = pickedZone === t.z.id ? null : t.z.id; keepFocus(render); } } });
          })
        ]);
        return h('div', { class: 'p2-mapcols tw-cols' }, [
          h('div', { class: 'p2-mapwrap' }, [mapEl, roomPhotos(s, rooms)]),
          h('div', { class: 'p2-col p2-mapside' }, [standingNote(s), folder(true),
            taped(zoneNote(s, pickedZone ? zones.filter(function (z) { return z.id === pickedZone; })[0] : null, byZone, chokes, roomsBy), 0.8, ['top']),
            taped(contactsScrap(s), -1.2, ['tl']),
            h('p', { class: 'cb-typed cb-small p2-quiet', text: L('legendArc') + ' ' + L('legendCut') + ' ' + L('roomsMapKey') })])
        ]);
      }

      /* the town's standing, written on a sticky note in marker */
      function standingNote(s) {
        var word = safe(function () { return SB.Territory.word(s); }, null), city = cityName(s), tier, el;
        if (!word) return null;
        tier = lbl('wordTier.' + word.tier + '.name', '');
        el = paperUp(h('div', { class: 'tw-note tw-standing', role: 'note', aria: { label: L('standing', { city: city, word: tier }) + (word.text ? '. ' + word.text : '') } }, [
          h('span', { class: 'tw-mk', aria: { hidden: 'true' }, html: marker(L('standingHead', { city: city }).toUpperCase(), 16, { seed: 'stc', maxWidth: 240 }) }),
          tier ? h('span', { class: 'tw-mk tw-mk--big', aria: { hidden: 'true' }, html: marker(tier.toUpperCase(), 22, { seed: 'stt', maxWidth: 250 }) }) : null,
          word.text ? h('p', { class: 'cb-typed cb-small', aria: { hidden: 'true' }, text: word.text }) : null
        ]), 'bone', 'stand' + city, 'b');
        return taped(el, -2.4, ['top']);
      }

      /* the rooms, one snapshot of each kind, taped under the map with what kind it is and how many */
      function roomPhotos(s, rooms) {
        var by = {}, zoneN = function (id) { return s.zones && s.zones[id] ? s.zones[id].name : ''; }, rots = [-3.2, 2.1, -1.4, 2.8], i = 0;
        rooms.forEach(function (rm) { (by[rm.door] = by[rm.door] || []).push(rm); });
        if (!rooms.length) return null;
        return h('div', { class: 'tw-pics', role: 'group', aria: { label: L('roomsKey') } }, DOORS.filter(function (d) { return by[d]; }).map(function (d) {
          var list = by[d], where = [], cv, kind = L('door' + d), cap;
          list.forEach(function (rm) { var n = zoneN(rm.zoneId); if (n && where.indexOf(n) < 0) where.push(n); });
          cv = document.createElement('canvas'); cv.width = Math.round(Math.max(360, 134 * 1.5 * (SB.Finish && SB.Finish.res ? SB.Finish.res() : 1))); cv.height = Math.round(cv.width * 0.75); cv.className = 'tw-piccv'; cv.setAttribute('aria-hidden', 'true');
          snapshot(d, String(s.seed || ''), cv);
          cap = kind.toUpperCase() + ' ' + list.length;
          return h('figure', { class: 'tw-pola pz-paper', role: 'img', style: { '--rot': rots[i++ % 4] + 'deg' }, aria: { label: L('roomsPhoto', { kind: kind, n: roomsCount(list.length), where: where.join(', ') }) } }, [
            h('div', { class: 'tw-pic' }, [cv]),
            h('figcaption', { class: 'tw-cap', aria: { hidden: 'true' } }, [
              h('span', { class: 'tw-capglyph', html: glyph(d, 22) }),
              h('span', { class: 'tw-mk', html: marker(cap, 21, { seed: 'pc' + d, maxWidth: 150 }) })
            ]),
            h('p', { class: 'tw-label', aria: { hidden: 'true' }, text: L('roomsWhere', { where: where.join(', ') }) })
          ]);
        }));
      }

      function zoneNote(s, z, byZone, chokes, roomsBy) {
        var el = zoneNote0(s, z, byZone, chokes, roomsBy);
        return paperUp(el, z ? 'white' : 'bone', 'zn' + (z ? z.id : ''), 'b');
      }
      function zoneNote0(s, z, byZone, chokes, roomsBy) {
        var k = K(), rg, contact = null, range = null, key, kids = [], art, here = z && roomsBy ? roomsBy[z.id] || [] : [];
        if (!z) return scrap(L('zonePick'), 'bone', 'p2-zonenote');
        rg = byZone[z.id] || 0;
        safe(function () { (SB.Territory.contacts(s) || []).forEach(function (c) { if (c.place && c.place.name === z.name) contact = c; }); }, null);
        range = safe(function () { key = SB.Notebook.key && SB.Notebook.key.zone ? SB.Notebook.key.zone(z.id) : 'zone:' + z.id; return SB.Notebook.range(s, key); }, null);
        art = k.marker(z.name, 6, 34, 28, { seed: 'zh' + z.id, maxWidth: 250 });
        kids.push(h('h2', { role: 'img', aria: { label: z.name } }, artP(art, 262, 44)));
        kids.push(h('p', { class: 'cb-typed cb-small', text: lbl('zone.' + z.kind, '') + (num(z.minutes) && z.minutes > 0 ? ' · ' + L('zoneDrive', { n: z.minutes }) : '') }));
        if (z.note) kids.push(h('p', { class: 'cb-typed cb-small', text: z.note }));
        if (rg > 0) {
          var hd = '', j;
          for (j = 0; j < Math.min(rg, 14); j++) hd += D().head(8 + j * 13, 22, 20, { mode: 'solid' });
          kids.push(h('div', { role: 'img', aria: { label: L('zoneRegulars', { n: rg }) } }, artP(hd + k.marker(String(rg), Math.min(rg, 14) * 13 + 10, 22, 22, { seed: 'zr' + rg }), Math.min(rg, 14) * 13 + 60, 30)));
          kids.push(h('p', { class: 'cb-typed cb-small', text: L('zoneRegulars', { n: rg }) }));
        }
        if (z.scene) kids.push(h('p', { class: 'cb-typed cb-small', text: L('zoneScene', { n: z.scene }) }));
        if (z.beyond && chokes[z.beyond]) kids.push(h('p', { class: 'cb-typed cb-small', text: L('zoneBeyond', { what: chokes[z.beyond].name }) }));
        if (contact) kids.push(h('p', { class: 'cb-typed cb-small', text: L('zoneContact', { stage: lbl('stage.' + contact.stage, '') }) }));
        if (here.length) kids.push(h('p', { class: 'cb-typed cb-small tw-roomsline', text: L('roomsHere', { list: here.map(function (rm) { return rm.name; }).join('; ') }) }));
        kids.push(h('h3', { class: 'cb-typed', text: L('zoneKnow').toUpperCase() }));
        if (range && range.conf > 0) {
          kids.push(h('p', { class: 'p2-range', role: 'img', aria: { label: L('zoneKnow') + ': ' + range.text } }, artP(D().swipe(4, 22, k.markerWidth(range.text, 24) + 10, 24) + k.marker(range.text, 8, 32, 24, { seed: 'rg' + z.id }), k.markerWidth(range.text, 24) + 24, 42)));
        } else kids.push(h('p', { class: 'cb-typed cb-small', text: L('zoneNoKnow') }));
        return h('div', { class: 'cb-piece cb-stock-bone p2-zonenote', aria: { live: 'polite' } }, kids);
      }

      function contactsScrap(s) {
        var list = safe(function () { return SB.Territory.contacts(s); }, []);
        if (!list.length) return paperUp(scrap(L('contactsNone'), 'white'), 'index', 'ct0', 'r');
        return paperUp(h('div', { class: 'cb-piece cb-stock-white p2-contacts tw-index' }, [
          h('h3', { class: 'cb-typed', text: L('contacts').toUpperCase() }),
          h('ul', null, list.map(function (c) { return h('li', { class: 'cb-typed cb-small', text: c.name + ' — ' + (c.place ? c.place.name + (c.place.state ? ', ' + c.place.state : '') : '') + ' · ' + lbl('stage.' + c.stage, '') }); }))
        ]), 'index', 'ct', 'r');
      }

      /* ---------------- the country ---------------- */
      function nationView(s) {
        var k = K(), pack = safe(function () { return SB.Cities.pack(s); }, null), box = SB.geo.BOX, here = null, word = safe(function () { return SB.Territory.word(s); }, null), idx = SB.CityIndex || [],
            tours = [], insetPts = [], routeNames = [], inner = '', out, contacts = safe(function () { return SB.Territory.contacts(s); }, []), seen = {}, preview = [], stops;
        function P(lat, lon) { return SB.geo.project(lat, lon); }
        inner += k.poly(outlinePts(), { seed: 'us', fill: '#e7ddc4', sw: 2.6, wob: 0.6 });
        inner += k.dots(k.polyD(outlinePts()), 1, { op: 0.6 });
        inner += '<clipPath id="tn-us-clip"><path d="' + k.polyD(outlinePts()) + '"/></clipPath><path d="' + SB.stateLinesD(0, 0) + '" clip-path="url(#tn-us-clip)" fill="none" stroke="' + TONER + '" stroke-opacity=".75" stroke-width="1.8" stroke-linejoin="round" stroke-dasharray="9 3 2 3"/>';
        idx.forEach(function (e) {
          var p;
          if (!num(e.lat) || !num(e.lon)) return;
          p = P(e.lat, e.lon);
          if (p.inset) insetPts.push(p);
          seen[e.name + '|' + e.state] = 1;
          if (e.slug === s.citySlug) { here = { p: p, e: e }; return; }
          inner += '<rect x="' + f(p.x - 2.2) + '" y="' + f(p.y - 2.2) + '" width="4.4" height="4.4" fill="' + TONER + '"/>';
        });
        ((pack && pack.points) || []).forEach(function (e) {
          var p;
          if (!num(e.lat) || !num(e.lon) || seen[e.name + '|' + e.state]) return;
          p = P(e.lat, e.lon);
          inner += '<rect x="' + f(p.x - 2.2) + '" y="' + f(p.y - 2.2) + '" width="4.4" height="4.4" fill="' + TONER + '"/>';
        });
        if (insetPts.length) {
          var x0 = Math.min.apply(null, insetPts.map(function (p) { return p.x; })) - 10, x1 = Math.max.apply(null, insetPts.map(function (p) { return p.x; })) + 10,
              y0 = Math.min.apply(null, insetPts.map(function (p) { return p.y; })) - 10, y1 = Math.max.apply(null, insetPts.map(function (p) { return p.y; })) + 10;
          inner += '<path d="M' + f(x0) + ' ' + f(y0) + 'H' + f(x1) + 'V' + f(y1) + 'H' + f(x0) + 'Z" fill="none" stroke="' + TONER + '" stroke-width="1.4" stroke-dasharray="4 3"/>';
        }
        /* open requests' routes: dashed olive ink */
        safe(function () {
          SB.Requests.list(s, { open: true }).forEach(function (id, j) {
            var q = s.requests[id], rt = SB.Requests.route(s, id), pts = [], band = s.bands && s.bands[q.bandId];
            rt.stops.forEach(function (st) {
              var pl = st.here ? (here ? here.e : null) : findPlace(st.name, st.state, pack);
              if (pl && num(pl.lat)) { var p = P(pl.lat, pl.lon); pts.push([p.x, p.y]); }
            });
            if (pts.length > 1) {
              inner += k.path(pts, { seed: 'rq' + id, sw: 2.6, stroke: k.ink('oliveDrab'), dash: '7 5', wob: 1 });
              routeNames.push({ band: band ? band.name : '', stops: rt.stops.map(function (st) { return st.name; }).join(' → ') });
            }
          });
        }, null);
        /* your bands' tours: solid marker */
        safe(function () {
          Object.keys(s.tours || {}).forEach(function (id) {
            var t = SB.Territory.tour(s, id), pts = [];
            if (here) pts.push([here.p.x, here.p.y]);
            (t.stops || []).forEach(function (st) { if (st.place && num(st.place.lat)) { var p = P(st.place.lat, st.place.lon); pts.push([p.x, p.y]); } });
            if (pts.length > 1) { inner += k.path(pts, { seed: 'tr' + id, sw: 4.4, wob: 1.2 }); pts.slice(1).forEach(function (p) { inner += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="5" fill="' + TONER + '"/>'; }); }
            tours.push(t);
          });
        }, null);
        /* the tour being planned: pencil */
        stops = tour.bandId ? safe(function () { return SB.Territory.tourStops(s, tour.bandId) || []; }, []) : [];
        if (here) preview.push([here.p.x, here.p.y]);
        stops.forEach(function (st, j) { if (tour.stops[j] && st.place && num(st.place.lat)) { var p = P(st.place.lat, st.place.lon); preview.push([p.x, p.y]); } });
        if (preview.length > 1) inner += k.path(preview, { seed: 'pv', sw: 2, stroke: '#6d6a62', dash: '3 4', wob: 1.6 });
        /* contacts: pinned with their names */
        contacts.forEach(function (c, j) {
          var p;
          if (!c.place || !num(c.place.lat)) return;
          p = P(c.place.lat, c.place.lon);
          inner += '<path d="M' + f(p.x) + ' ' + f(p.y) + 'L' + f(p.x + 10) + ' ' + f(p.y - 18 - (j % 3) * 10) + '" stroke="' + TONER + '" stroke-width="1.4"/>' +
                   '<circle cx="' + f(p.x) + '" cy="' + f(p.y) + '" r="4.5" fill="' + k.ink('oliveDrab') + '" stroke="' + TONER + '" stroke-width="1.6"/>' +
                   '<path d="M' + f(p.x + 8) + ' ' + f(p.y - 30 - (j % 3) * 10) + 'h' + f(k.typeWidth(c.name, 9) + 8) + 'v14h' + f(-(k.typeWidth(c.name, 9) + 8)) + 'Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="1"/>' +
                   k.type(c.name, p.x + 12, p.y - 19 - (j % 3) * 10, 9, { bold: true });
        });
        if (here) {
          inner += k.circle3(here.p.x, here.p.y, 30, 26, { seed: 'nh', stroke: TONER, sw: 4.4 }) + '<circle cx="' + f(here.p.x) + '" cy="' + f(here.p.y) + '" r="10" fill="' + TONER + '"/>';
          inner += k.ransom(L('standing', { city: here.e.name, word: word ? lbl('wordTier.' + word.tier + '.name', '') : '' }), here.p.x - 30, here.p.y + 74, 30, { anchor: 'middle', seed: 'nst' });
        }
        out = k.paper(6, 6, box.w - 12, box.h - 12, { seed: 'nmap', stock: 'white', burn: 0.5, inner: inner, cut: 2 }) + k.tape(56, 18, 90, 24, { seed: 'nmt', rot: -28 });
        return h('div', { class: 'p2-mapcols p2-mapcols--nation' }, [
          h('div', { class: 'p2-mapwrap' }, [h('div', { class: 'p2-map', role: 'img', aria: { label: L('nationLabel') + (here && word ? ' ' + L('standing', { city: here.e.name, word: lbl('wordTier.' + word.tier + '.name', '') }) : '') } }, artP(out, box.w, box.h, 'p2-mapart', true))]),
          h('div', { class: 'p2-col p2-mapside' }, [
            standingNote(s),
            folder(false),
            taped(paperUp(h('div', { class: 'cb-piece cb-stock-white p2-routes' }, [
              h('h3', { class: 'cb-typed', text: L('routes').toUpperCase() }),
              routeNames.length ? h('ul', null, routeNames.map(function (r) { return h('li', { class: 'cb-typed cb-small', text: L('routeLine', r) }); })) : h('p', { class: 'cb-typed cb-small', text: L('routesNone') }),
              h('h3', { class: 'cb-typed', text: L('tours').toUpperCase() }),
              tours.length ? h('ul', null, tours.map(function (t) { return h('li', { class: 'cb-typed cb-small', text: t.bandName + ' · ' + L('tourStops', { n: (t.stops || []).length }) }); })) : h('p', { class: 'cb-typed cb-small', text: L('toursNone') })
            ]), 'index', 'rt', 'r'), 1.1, ['tl']),
            taped(tourSheet(s), -0.8, ['top'])
          ])
        ]);
      }

      /* ---------------- the tour sheet ---------------- */
      function tourSheet(s) {
        var cands = safe(function () { return SB.Territory.tourCandidates(s) || []; }, []), okList, notOk, stops = [], k, base, kids = [], weeks = [];
        okList = cands.filter(function (c) { return c.ok && c.ok.ok !== false; });
        notOk = cands.filter(function (c) { return !(c.ok && c.ok.ok !== false) && c.ok && c.ok.why; })[0];
        kids.push(h('h3', { role: 'img', aria: { label: L('tourStart') } }, artP(K().marker(L('tourStart'), 4, 28, 24, { seed: 'ts' }), K().markerWidth(L('tourStart'), 24) + 12, 36)));
        if (!okList.length) { kids.push(h('p', { class: 'cb-typed cb-small', text: notOk ? notOk.ok.why : L('tourNone') })); return h('div', { class: 'cb-piece cb-stock-bone p2-toursheet' }, kids); }
        if (!tour.bandId || !okList.some(function (c) { return c.bandId === tour.bandId; })) { tour.bandId = okList[0].bandId; tour.stops = {}; }
        stops = safe(function () { return SB.Territory.tourStops(s, tour.bandId) || []; }, []);
        base = s.clock.week;
        for (k = 1; k <= 12; k++) weeks.push(k);
        kids.push(D().tabs({ label: L('tourBand'), title: L('tourBand'), size: 10, items: okList.map(function (c) {
          var nm = s.bands[c.bandId] ? s.bands[c.bandId].name : c.bandId;
          return { text: String(nm).slice(0, 20), label: nm, on: tour.bandId === c.bandId, fk: 'tb-' + c.bandId, onClick: function () { if (tour.bandId !== c.bandId) { tour.bandId = c.bandId; tour.stops = {}; keepFocus(render); } } };
        }) }));
        kids.push(h('h4', { class: 'cb-typed', text: L('tourPick').toUpperCase() }));
        kids.push(stops.length ? h('ul', { class: 'p2-stops' }, stops.map(function (st, i) {
          var nm = st.place.name + (st.place.state ? ', ' + st.place.state : '');
          return h('li', null, D().tickThing({ on: !!tour.stops[i], text: (nm + ' ' + L('tourMin', { n: st.minutesFromHome })).slice(0, 38), fk: 'st-' + i,
            label: nm + ', ' + L('tourMin', { n: st.minutesFromHome }) + (st.contactId ? ', ' + L('tourKnown') : ''),
            onClick: function () { tour.stops[i] = !tour.stops[i]; keepFocus(render); } }));
        })) : h('p', { class: 'cb-typed cb-small', text: L('tourNoContacts') }));
        kids.push(D().tabs({ label: L('tourWeek'), title: L('tourWeek'), size: 9, items: weeks.map(function (n) {
          return { text: L('tourWeekTab', { n: base + n + 1 }), label: L('tourWeekOpt', { n: base + n + 1 }), on: tour.weekOff === n, fk: 'tw-' + n, onClick: function () { tour.weekOff = n; keepFocus(render); } };
        }) }));
        kids.push(h('div', { class: 'p2-tourgo' }, [h('span', { class: 'cc-hotmark', aria: { hidden: 'true' }, text: Object.keys(tour.stops).some(function (q) { return tour.stops[q]; }) ? '!!' : '' }),
          D().tabs({ label: L('tourGo'), size: 12, items: [{ text: L('tourGo'), fk: 'tour-go', onClick: function () {
            var chosen = stops.filter(function (st, i) { return tour.stops[i]; }), day = (s.clock.week + tour.weekOff) * 7 + 4, r;
            if (!chosen.length) { SB.UI.toast(L('tourNeedStops'), 'no'); return; }
            r = SB.UI.act(function (st) { return SB.Territory.startTour(st, tour.bandId, chosen, day); });
            if (r && r.ok !== false) { tour.stops = {}; render(); }
          } }] })]));
        return h('div', { class: 'cb-piece cb-stock-bone p2-toursheet', aria: { label: L('tourStart') } }, kids);
      }

      function render() {
        var s = game();
        SB.UI.clear(root);
        if (!s) { root.appendChild(C().Empty({})); return; }
        root.appendChild(h('div', { class: 'p2 p2-town', style: { '--hot': D().cityInk()[0] } }, [
          h('h1', { class: 'cb-sr', text: L('title') + ': ' + (zoom === 'nation' ? L('zoomNation') : L('zoomRegion')) }),
          zoom === 'nation' ? nationView(s) : regionView(s),
          SB.UI.calKit && SB.UI.calKit.grainEl ? SB.UI.calKit.grainEl() : null
        ]));
        safe(dress);
      }

      render();
      return { update: function () { keepFocus(render); }, unmount: function () {} };
    }
  });
})(SB);
