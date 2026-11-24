/* Scene Booker — js/desk/scene.js
 * SB.Desk: the desk, looked straight down on: a black table under one hard lamp with the game's things laid out on it
 * as separate islands of paper and xeroxed cut-outs (design/spec/07-desk.md sections 2, 2b and 3).
 * Composition (2b): fewer, bigger objects on a loose grid by zone, bare table all round each one, none overlapping.
 * Left: time (calendar, tape deck, coffee). Middle: the work (paste-up, set lists). Right: places (road map, keys) and
 * people and money (phone, stickers, matchbook, envelope). Bottom: composition book, flyer pile, folder, and the
 * (the mixtape is not on the desk: it is the pocket player, js/ui/musicbar.js, on every screen).
 * Every object is its own <button> holding its own drawing: SVG from SB.DeskKit, rasterised onto a canvas and run
 * through the copier (SB.DeskKit.photocopy, the flyer's toner pass). Each carries a label-maker strip with its name on
 * the same corner, and a second strip with its live state; the city's hot ink marks only what needs the player.
 * Hover and focus straighten and lift the object and invert its strip (css/desk-scene.css). The table and its few
 * gray scraps are one background canvas. The SVG stays as the fallback (and is what the Node smoke test sees).
 * Reads the game only through engine views (Game.strip, Week.view, Mail, Shows, Jobs.flyerSpec, Bands, Rooms,
 * Money, People, Notebook, Legacy, Cities) and state.clock / state.player / state.seed.
 * The tape deck plays the night out (design/spec/10-night-clock.md): it pauses and plays it on and closes the week.
 * Calling it a night is the pinned clock's alone (js/ui/nightclock.js, user 2026-11-21: one place); pressed at an
 * evening, the deck nudges that clock.
 * Also registers the 'desk' route: the home of a running game. It shows nothing in #main except a hidden week
 * screen that keeps the play loop (js/ui/screens/week.js) running while you sit at the desk.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.desk = {
    title: 'Your desk',
    names: {
      calendar: 'Calendar page', flyers: 'Flyer pile', map: 'Road map', keys: 'Key ring', phone: 'Phone', paper: 'Paste-up and markers',
      clips: 'Set lists', clip: 'Set list for {when}', stickers: 'Sticker pile', notebook: 'Composition book', tin: 'Cash envelope', mug: 'Coffee',
      book: 'Matchbook', lamp: 'Tape deck', drawer: 'Manila folder', pad: 'Sticky notes', tonight: 'To-do list', jacket: 'Jean jacket'
    },
    strip: {
      calendar: 'CALENDAR', flyers: 'FLYERS', map: 'TOWN', keys: 'ROOMS', phone: 'PHONE', paper: 'NEXT FLYER', clips: 'SHOWS', clip: 'SHOW',
      stickers: 'BANDS', notebook: 'NOTEBOOK', tin: 'MONEY', mug: 'COFFEE', book: 'PEOPLE', lamp: 'TAPE DECK', drawer: 'FILES', pad: 'SETTINGS', tonight: 'TONIGHT', jacket: 'JACKET'
    },
    state: {
      week: 'WEEK {n}: {from}-{to}', late: '{n} LATE', lateOne: '1 LATE', lateNamed: 'LATE: {what}', flyersNone: 'NONE YET', flyers: '{n} MADE', flyersStar: '{n} MADE, {k} STARRED',
      keysNone: 'NO KEYS YET', keys: '{n} [?one: ROOM | ROOMS]', keysHeld: '{n} [?one: ROOM | ROOMS], {k} HELD', phoneNone: 'QUIET', phone: '{n} NEED YOU',
      paperNone: 'NOTHING TO FLYER', paperTodo: '{when}: NOT MADE', paperDone: '{when}: MADE', clipsNone: 'NOTHING BOOKED: START ONE',
      clip: '{when}', clipDays: '{when} · {n} DAYS', clipToday: '{when} · TONIGHT', clipTomorrow: '{when} · TOMORROW',
      stickers: '{n} LOCAL', stickersNone: 'NONE YET', notebook: '{n} THINGS', notebookNew: 'NEW PAGE', tin: '{total}', tinBank: 'BANK {bank}', tinDue: '{what} IN {n} DAYS', tinToday: '{what} DUE TODAY',
      mug: '{zone}', book: '{n} PEOPLE', bookNone: 'NONE', drawer: '', pad: '', tonight: '{left} LEFT', tonightNone: '', jacket: '{n} ON IT', jacketNone: 'BARE', new: 'NEW'
    },
    tag: {
      new: 'new on the desk. {what}', week: 'week {n}: {from} to {to}', weekShows: 'week {n}, {k} show nights', late: '{n} jobs running late',
      flyersNone: 'no flyers made yet', flyers: '{n} flyers in the pile', flyersStar: '{n} flyers, {k} remembered', map: '{town} and the road',
      keysNone: 'no keys yet', keys: '{n} [?one: room | rooms] you know(?more:, {more} more to find)', keysHeld: '{n} [?one: room | rooms], {k} dates held(?more:, {more} more to find)',
      phoneNone: 'nothing needs you', phone: '{n} need an answer', phoneOne: '1 needs an answer',
      paperNone: 'nothing to flyer yet', paperTodo: 'flyer for {when}: not made', paperDone: 'flyer for {when}: made',
      clipsNone: 'no shows on the way: press to start one', clip: '{when}: {days}', today: 'tonight', tomorrow: 'tomorrow', days: '{n} days out',
      stickers: '{n} local bands', stickersNone: 'no local bands yet', notebook: '{n} things learned', notebookNew: 'something new in here',
      tin: 'fund {fund}, bank {bank}', tinBank: 'You have {bank} in the bank.', tinDue: 'fund {fund}, {what} due {when}', mug: 'stress: {zone}',
      book: '{n} people you can call', bookNone: 'nobody in here yet', drawer: 'settled shows and cheat sheets', pad: 'settings and saves', tonight: 'things to do with the rest of tonight', tonightOff: 'things to do, once it\u2019s evening', lampNight: 'call it a night on the clock in the corner',
      jacket: '{n} patches and buttons on it', jacketNone: 'nothing sewn on yet'
    },
    /* the hover slip (js/ui/tooltip.js): what each thing on the desk is for */
    tip: {
      calendar: 'Your week, night by night: what is planned, jobs due, and closing out the week.',
      flyers: 'Every flyer you have made. Star the ones worth remembering.',
      map: 'Your town and the road: the places you can go and who is out there.',
      keys: 'The rooms you know: book dates, see their rules, find new ones.',
      phone: 'Messages from bands and rooms. Answer here; a band asking for a night starts a show.',
      paper: 'The flyer for your next show. Make it before the show to bring people in.',
      clips: 'Your shows on the way. Open one to work through its card.',
      clip: 'This show\'s card: room, bands, sound, flyer, money. NEXT on it says what is left.',
      stickers: 'The local bands you know and how they feel about you.',
      notebook: 'What you have learned so far.',
      tin: 'Your money: the scene fund, your bank, and what is due.',
      mug: 'How stressed you are. Rest or stop early if it climbs.',
      book: 'People you can call for help: sound, door, rides.',
      lamp: 'The tape deck: music while you work. The night itself is ended on the clock in the corner.',
      drawer: 'Your paperwork: a sheet for every show you\u2019ve settled, and cheat sheets on booking in real life.',
      pad: 'Settings and saves.',
      tonight: 'Things to do with the rest of tonight, at home or out: write, work out, dig for bands, see a show, sleep early.',
      jacket: 'Patches and buttons you have earned.'
    },
    zone: { STEADY: 'steady', STRETCHED: 'stretched', FRIED: 'fried', BURNING_OUT: 'burning out', BURNT_OUT: 'burnt out' },
    words: { notes: 'NOTES', safe: 'get home safe', nothing: 'NOTHING BOOKED', flyersHere: 'NO FLYERS YET', mom: 'call mom',
             roadMap: 'OFFICIAL ROAD MAP', composition: 'COMPOSITION', learned: '{n} things', deposit: 'DEPOSIT', week: 'WEEK {n}',
             folder: 'FILES', folderLabel: 'SHOWS + CHEAT SHEETS', padNote: 'SETTINGS', padSub: '+ saves', todoHead: 'TONIGHT', todo: 'write,see a show,find bands,sleep', matches: 'COCKTAILS * POOL', noKeys: 'no keys yet', noBands: 'no local bands yet', newMsg: '{n} NEW',
             glue: 'GLUE STICK', perm: 'PERMANENT', nothingToFlyer: 'nothing to flyer yet', doors: 'doors {t}', due: 'DUE {when}', pastDue: 'PAST DUE' }
  };

  SB.module('Desk', function () {
    var W = 1600, H = 1000, M = 30;
    /* the loose grid: [x, y, w, h, crooked degrees] in desk units */
    var BOX = {
      calendar: [40, 42, 340, 410, -2.4], lamp: [54, 438, 330, 176, 2], mug: [78, 712, 290, 196, -1.5],
      paper: [446, 40, 604, 412, 1.4], notebook: [470, 742, 300, 176, -3], flyers: [752, 726, 260, 190, 2.5],
      map: [1104, 44, 268, 250, 2.4], keys: [1386, 36, 180, 282, -2],
      phone: [1112, 352, 156, 268, -3], stickers: [1292, 382, 280, 250, 1.6],
      book: [1092, 686, 166, 150, 3], tin: [1276, 668, 284, 160, -2], drawer: [1046, 700, 330, 230, -1], pad: [1100, 640, 270, 270, 0],   /* a small square stack (smaller than any sheet of paper) with tacks lying round it */ tonight: [880, 520, 190, 230, 2],
      jacket: [292, 716, 172, 200, 4]
    };
    var CLIP = { x: 452, y: 440, w: 142, h: 206, step: 144, dy: [0, 0, 0, 0], rot: [-1, 0.8, -0.6, 1] };   // a straight row

    /* Where each thing lies on the table (polish brief job 7): [centre x, centre y, zoom, crooked degrees]. BOX above is
       what each drawing is drawn in; this is where it is put and how big it is shown, so a bigger calendar is the same
       calendar seen closer (its type and toner scale with it). Things overlap like papers piled on a real desk: later
       in the list lies on top. The table is laid out full; whatever is out (a guided start puts things out show by show,
       SB.Rungs) is then zoomed to fill the table, so a week-one desk is a few big things in the lamp's light, not islands
       in the dark. The folder is pinned over the table's front edge, and the bottom right corner is left to the
       pocket player (js/ui/musicbar.js). */
    /* laid out in three columns (user 2026-11-22: "reorganize this desk and make it look more organized", "too much
       overlapping at the bottom"): time on the left (calendar, the settings folder where the tape deck was, coffee),
       the work in the middle (paste-up, the set lists in a row under it, notebook and flyers), people and places on
       the right in two columns. Nothing lies on anything else; tilts are a degree or so. The bottom band is left to
       the guide's strip, the pinned clock and the pocket player (js/ui/musicbar.js). */
    var LAYOUT = {
      calendar: [265, 270, 1.0, -1.2], drawer: [265, 610, 1.18, -0.6], mug: [150, 860, 0.86, 1], jacket: [392, 870, 1, -1],
      paper: [770, 268, 1.08, 0.8], notebook: [670, 892, 1.08, -1], flyers: [935, 892, 1.08, 1],
      map: [1220, 150, 1.0, 1], keys: [1480, 150, 0.95, -1], phone: [1205, 548, 1.4, -1.2], pad: [1215, 188, 1.0, 1.5], tonight: [985, 628, 1.0, 2.2],   // phone + pad span the same height as the calendar + folder and the mat + set lists (user 2026-11-22)
      stickers: [1480, 450, 1.08, 0.8], book: [1220, 790, 1.2, 1], tin: [1480, 780, 1.1, -0.8]
    };
    var CLIPLAY = { x: 580, y: 620, step: 184, z: 1.12 };
    /* the cash envelope is pinned in the bottom band, like the night clock (user 2026-11-24: on the
       table it stretched the fitted desk and left "a lot of dead space"; "it could be a pop up thing like the clock
       piece"). Pinned things keep their place and size and are left out of the fit, so the desk fills the table. */
    var PINNED = { tin: true };
    /* in the bottom right corner, where the pocket player was (user 2026-11-24: "put the mixtape up there and the envelope
       where the mixtape is"); the player picks the first corner that covers nothing (js/ui/musicbar.js corner()), so on
       the desk it goes up to the top right */
    LAYOUT.tin = [1462, 926, 0.74, -2];
    var TABLE = { x: 34, y: 20, w: 1532, h: 920, lip: 34 };          // the table top; its front edge drops lip units to the floor
    var AREA = { x: 60, y: 34, w: 1480, h: 850 }, AREA_GUIDED = { x: 60, y: 34, w: 1480, h: 786 };   // the walkthrough's strip takes the bottom band
    var LIGHT = { x: 760, y: 420 };                                   // the lamp's pool on the table
    function layoutOf(id) {
      var m = /^clip(\d)$/.exec(id), i;
      if (id === 'clips') m = [0, '0'];
      if (m) { i = +m[1]; return [CLIPLAY.x + i * CLIPLAY.step, CLIPLAY.y + CLIP.dy[i % 4] * CLIPLAY.z, CLIPLAY.z, CLIP.rot[i % 4]]; }
      return LAYOUT[id] || null;
    }
    /* each object's place on the stage: disp = { x0, y0, scale, rot }, the top left of its drawing box (with its margin of
       bare table) in desk units, and desk units per drawing unit */
    function fit(list) {
      var guided = typeof document !== 'undefined' && document.body && document.body.classList.contains('sy-guiding'),
          area = guided ? AREA_GUIDED : AREA, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, sc, tx, ty;
      list.forEach(function (o) {
        var l = layoutOf(o.id), hw, hh;
        if (!l || PINNED[o.id]) return;
        hw = o.box[2] * l[2] / 2; hh = o.box[3] * l[2] / 2;
        x0 = Math.min(x0, l[0] - hw); x1 = Math.max(x1, l[0] + hw); y0 = Math.min(y0, l[1] - hh); y1 = Math.max(y1, l[1] + hh);
      });
      if (x1 <= x0) { x0 = 0; y0 = 0; x1 = W; y1 = H; }
      x0 -= 14; y0 -= 14; x1 += 14; y1 += 14;
      sc = Math.max(0.8, Math.min(1.32, area.w / (x1 - x0), area.h / (y1 - y0)));
      tx = area.x + area.w / 2 - (x0 + x1) / 2 * sc; ty = area.y + area.h / 2 - (y0 + y1) / 2 * sc;
      list.forEach(function (o) {
        var l = layoutOf(o.id) || [o.box[0] + o.box[2] / 2, o.box[1] + o.box[3] / 2, 1, o.box[4] || 0], pin = !!PINNED[o.id],
            z = pin ? l[2] : l[2] * sc, cx = pin ? l[0] : l[0] * sc + tx, cy = pin ? l[1] : l[1] * sc + ty;
        o.disp = { x0: cx - (o.box[2] / 2 + M) * z, y0: cy - (o.box[3] / 2 + M) * z, scale: z, rot: l[3] };
      });
      return list;
    }
    var host = null, stage = null, bgCv = null, bgArt = null, hits = null, memo = {}, built = {}, hitKey = '', lastV = null,
        lastLearned = null, seenLearned = null, resizeOn = false, resizeT = null, gens = {};
    var thumbs = {};

    function K() { return SB.DeskKit; }
    function L(key, ctx) { return SB.text.label('ui.desk.' + key, ctx); }
    function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { return fb; } }
    function f(n) { return Math.round(n * 10) / 10; }
    function stripTitle(svg) { return String(svg || '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/ role="img"/, '').replace(/ aria-label="[^"]*"/, ''); }
    function money(n) { n = Math.round(n || 0); return (n < 0 ? '-$' : '$') + Math.abs(n); }
    function dowShort(day) { return SB.time.fmt(day, 'dow3'); }
    function md(day) { var d = SB.time.date(day); return d.m + '/' + d.d; }
    function short(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '.' : s; }
    function roomWord(name) { return String(name || '').replace(/^the\s+/i, '').split(/\s+/).slice(0, 2).join(' ').toUpperCase().slice(0, 12); }
    var HOT = ['fluorPink', 'fireRed', 'fluorOrange', 'fluorYellow'];
    var T = '#141413', PAPER = '#f4f2ea';

    /* ---------------------------------------------------------------- */
    /* what the desk shows: engine views only                           */
    /* ---------------------------------------------------------------- */

    function gather(s) {
      var v = { seed: String(s.seed || 'desk'), clock: s.clock || {}, player: s.player || {} }, today, pack, hot;
      today = v.clock.day || 0;
      v.st = safe(function () { return SB.Game.strip(s); }, null) || { week: 0, from: today, to: today + 6, phase: 'PLAN', fund: 0, bank: 0, stress: { value: 0, zone: 'STEADY' }, badges: {} };
      v.wk = safe(function () { return SB.Week.view(s); }, null);
      v.today = today;
      v.daysTo = function (day) { return safe(function () { return SB.Week.daysTo(s, day); }, day - today); };   // the one count (2.11)
      v.moneyEarly = !!(s.settings && s.settings.ladder && SB.Rungs && SB.Rungs.rung(s) < 3);
      v.cursor = v.clock.cursor || { dayIdx: 0, half: 'DAY' };
      v.needs = safe(function () { return SB.Mail.needsYou(s).length; }, 0);
      v.late = (v.st.badges && v.st.badges.late) || 0;
      v.lateWhat = (v.st.badges && v.st.badges.lateWhat) || '';
      pack = safe(function () { return SB.Cities.pack(s); }, null);
      v.pack = pack || {};
      v.entry = safe(function () { return SB.Cities.entry(pack.slug); }, null) || {};
      v.inks = (pack && pack.style && pack.style.cityInks) || ['fireRed'];
      hot = v.inks.filter(function (n) { return HOT.indexOf(n) >= 0; })[0] || 'fireRed';
      v.hot = K().ink(hot);
      v.cityName = v.entry.name || (pack && pack.name) || '';
      var all = safe(function () { return SB.Shows.list(s); }, []);
      v.upcoming = all.filter(function (x) { return x.day >= today && x.status !== 'PLAYED' && x.status !== 'CANCELLED'; }).sort(function (a, b) { return a.day - b.day; });
      v.allShows = all.filter(function (x) { return x.status !== 'CANCELLED'; });
      v.flyered = all.filter(function (x) { return x.promo && x.promo.flyer; });
      v.held = v.upcoming.filter(function (x) { return x.hold; });
      v.bands = safe(function () {
        return SB.Bands.list(s, { local: true, stack: true }).map(function (id) { return SB.Bands.card(s, id); }).filter(Boolean)
          .sort(function (a, b) { return (a.years || 0) - (b.years || 0) || (a.id < b.id ? -1 : 1); });
      }, []);
      /* the key ring: only the rooms the booker knows (the one the handoff named, rooms whose people they have met, rooms
         they have held or played); the rest are still to find */
      v.allRooms = safe(function () { return SB.Rooms.list(s); }, []) || [];
      v.rooms = v.allRooms.filter(function (id) {
        var r = s.rooms && s.rooms[id], o = r && r.ownerId && s.people ? s.people[r.ownerId] : null, k;
        if (!r) return false;
        if ((o && o.met !== null && o.met !== undefined) || (typeof r.ownerRel === 'number' && SB.Config.OWNER && r.ownerRel !== SB.Config.OWNER.start)) return true;
        for (k in (s.shows || {})) if (s.shows[k] && s.shows[k].roomId === id) return true;
        return false;
      }).map(function (id) { return safe(function () { return SB.Rooms.card(s, id); }, null); }).filter(Boolean);
      v.roomsToFind = Math.max(0, v.allRooms.length - v.rooms.length);
      v.owed = safe(function () { return SB.Money.owedAhead(s); }, null);
      v.due = v.owed && v.owed.lines && v.owed.lines[0] ? v.owed.lines[0] : null;
      /* the matchbook: everyone the booker can call, from day one the sound person, security and the host the handoff named,
         then the circle */
      v.circleList = safe(function () {
        var ids = [], out = [];
        function add(id) { var p = id && s.people && s.people[id]; if (p && p.met !== null && p.met !== undefined && (!p.state || p.state === 'ACTIVE') && ids.indexOf(id) < 0) ids.push(id); }
        ['SOUND', 'SECURITY'].forEach(function (role) { (SB.People.crew(s, role) || []).forEach(function (c) { add(c.personId); }); });
        (SB.Rooms.list(s) || []).forEach(function (rid) { var r = s.rooms && s.rooms[rid]; if (r) add(r.ownerId); });
        ((SB.People.circle(s) || {}).people || []).forEach(function (c) { add(c.id); });
        ids.forEach(function (id) { var c = safe(function () { return SB.People.card(s, id); }, null); if (c) out.push(c); });
        return out;
      }, []) || [];
      v.circle = v.circleList.length;
      v.tally = safe(function () { return SB.Notebook.tally(s); }, { shows: 0 });
      v.how = safe(function () { return SB.Notebook.pages(s, 'HOW').rows.length; }, 0);
      v.wall = safe(function () { return SB.Legacy.wall(s); }, []);
      v.binder = safe(function () { return SB.Legacy.binder(s, {}); }, []);
      v.lamp = safe(function () { return SB.UI.lamp.label(); }, null);
      v.tonight = v.st && v.st.tonight ? v.st.tonight : null;
      v.crunch = (v.wk && v.wk.crunch) || [];
      v.playing = safe(function () { return SB.UI.playing(); }, false);
      v.specs = {};
      v.upcoming.slice(0, 4).forEach(function (sh) { v.specs[sh.id] = safe(function () { return SB.Jobs.flyerSpec(s, sh.id); }, null); });
      return v;
    }

    /* A flyer thumbnail as a data URL, drawn once per flyer by SB.Flyer. null where there is no canvas. */
    function flyerUrl(key, recipe, spec) {
      var c, url;
      if (thumbs[key] !== undefined) return thumbs[key];
      url = null;
      try {
        if (spec && SB.Flyer && typeof document !== 'undefined' && document.createElement) {
          c = SB.Flyer.thumb(recipe || null, spec, 240);
          if (c && typeof c.toDataURL === 'function') url = c.toDataURL('image/png');
        }
      } catch (e) { url = null; }
      thumbs[key] = url || null;
      return thumbs[key];
    }
    function showFlyer(s, show) {
      var spec = safe(function () { return SB.Jobs.flyerSpec(s, show.id); }, null), rec = show.flyer && show.flyer.recipe;
      if (!spec) return null;
      return flyerUrl(show.id + '|' + SB.rng.hash(JSON.stringify(spec)) + '|' + JSON.stringify(rec || null), rec, spec);
    }
    function img(url, x, y, w, h) { return '<image href="' + url + '" x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" preserveAspectRatio="xMidYMid slice"/>'; }

    /* ---------------------------------------------------------------- */
    /* the table: black, scratched, a few gray scraps at the edges      */
    /* ---------------------------------------------------------------- */

    /* the table runs out to the window's edges (user 2026-11-23: "no big black bars"): the objects stay on the 16:10
       stage, the table and floor are drawn bigger by the bleed, in desk units past each side of the stage */
    function bleed() {
      var u, ex = 0, ey = 0;
      if (typeof window !== 'undefined' && stage && stage.clientWidth) {
        u = stage.clientWidth / W;
        ex = Math.max(0, Math.ceil(((window.innerWidth || 0) / u - W) / 2) + 2);
        ey = Math.max(0, Math.ceil(((window.innerHeight || 0) / u - H) / 2) + 2);
      }
      return [-ex, -ey, W + 2 * ex, H + 2 * ey];
    }
    function drawTable(v, vb) {
      vb = vb || [0, 0, W, H];
      var k = K(), out = '', r = k.rng(v.seed + 'table'), i, x, y, t = TABLE, bx = t.x + vb[0], by = t.y + vb[1], bw = t.w + vb[2] - W, bh = t.h + vb[3] - H, front = by + bh,
          top = '#1e1c19', grain = '#272520', dark = '#121110', floor = '#050505';
      /* the floor, and the table's shadow on it */
      out += '<rect x="' + vb[0] + '" y="' + vb[1] + '" width="' + vb[2] + '" height="' + vb[3] + '" fill="' + floor + '"/>';
      out += '<defs><radialGradient id="dkPool" cx="' + f(LIGHT.x) + '" cy="' + f(LIGHT.y) + '" r="900" gradientUnits="userSpaceOnUse">' +
             '<stop offset="0" stop-color="#fff4d6" stop-opacity=".17"/><stop offset=".45" stop-color="#fff4d6" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>' +
             '<linearGradient id="dkLip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3833"/><stop offset=".18" stop-color="#151412"/><stop offset="1" stop-color="#0d0c0b"/></linearGradient>' +
             '<linearGradient id="dkDrop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".9"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>' +
             /* the copier's speckle, light flecks and dark, the same grain the old black table had */
             '<filter id="dkSpeck" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="7"/>' +
             '<feColorMatrix values="0 0 0 0 .93  0 0 0 0 .91  0 0 0 0 .86  0 0 0 9 -7.4"/></filter>' +
             '<filter id="dkSoot" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="3"/>' +
             '<feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 5 -3"/></filter></defs>';
      out += '<rect x="' + (bx + 10) + '" y="' + (front + t.lip) + '" width="' + (bw - 20) + '" height="' + Math.max(0, vb[1] + vb[3] - front - t.lip) + '" fill="url(#dkLip)" opacity="0"/>';
      out += '<rect x="' + bx + '" y="' + (front + t.lip - 4) + '" width="' + bw + '" height="44" fill="url(#dkDrop)"/>';
      /* the top: a scuffed, xeroxed wood grain */
      out += '<path d="M' + bx + ' ' + (by + 6) + 'L' + (bx + 6) + ' ' + by + 'H' + (bx + bw - 6) + 'L' + (bx + bw) + ' ' + (by + 6) + 'V' + front + 'H' + bx + 'Z" fill="' + top + '"/>';
      for (i = 0; i < 46; i++) {
        y = by + 10 + i * (bh - 20) / 46 + r.range(-6, 6);
        x = bx + r.range(0, 120);
        out += '<path d="M' + f(x) + ' ' + f(y) + 'C' + f(x + 380) + ' ' + f(y + r.range(-14, 14)) + ' ' + f(x + 760) + ' ' + f(y + r.range(-10, 10)) + ' ' + f(bx + bw - r.range(0, 120)) + ' ' + f(y + r.range(-12, 12)) +
               '" stroke="' + (i % 3 ? grain : dark) + '" stroke-width="' + f(r.range(1.2, 3.6)) + '" fill="none" stroke-opacity="' + f(r.range(0.4, 0.9)) + '"/>';
      }
      for (i = 0; i < 18; i++) {
        x = r.range(bx + 40, bx + bw - 40); y = r.range(by + 30, front - 30);
        out += '<path d="M' + f(x) + ' ' + f(y) + 'l' + f(r.range(-160, 160)) + ' ' + f(r.range(-40, 40)) + '" stroke="#3a3833" stroke-opacity=".5" stroke-width="' + f(r.range(0.8, 1.8)) + '"/>';
      }
      /* toner soot and flecks, then the lamp's pool, falling off to the edges */
      out += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" filter="url(#dkSoot)" opacity=".55"/>';
      out += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" fill="url(#dkPool)"/>';
      out += '<rect x="' + vb[0] + '" y="' + vb[1] + '" width="' + vb[2] + '" height="' + vb[3] + '" filter="url(#dkSpeck)" opacity=".7"/>';
      /* the edges: the near edge catches the light and drops to the floor; the sides are a lit line */
      out += '<rect x="' + bx + '" y="' + front + '" width="' + bw + '" height="' + t.lip + '" fill="url(#dkLip)"/>';
      out += '<path d="M' + bx + ' ' + front + 'H' + (bx + bw) + '" stroke="#8a857a" stroke-width="3" stroke-opacity=".7"/>';
      out += '<path d="M' + (bx + 1) + ' ' + (by + 6) + 'V' + front + 'M' + (bx + bw - 1) + ' ' + (by + 6) + 'V' + front + '" stroke="#55524b" stroke-width="2" stroke-opacity=".6"/>';
      /* offcuts and a typed scrap, left lying about on the top */
      [[60, 496, 26, 6, -4], [420, 30, 40, 5, 20], [1066, 520, 30, 6, -60], [1540, 340, 6, 30, 4], [770, 900, 60, 6, 3], [396, 700, 30, 5, -12]].forEach(function (q) {
        out += '<path d="M' + q[0] + ' ' + q[1] + 'h' + q[2] + 'v' + q[3] + 'h-' + q[2] + 'Z" fill="#4a4944" transform="rotate(' + q[4] + ' ' + q[0] + ' ' + q[1] + ')"/>';
      });
      out += k.tape(bx + 18, by + 22, 40, 12, { seed: 'tt1', rot: -40, op: 0.35 }) + k.tape(bx + bw - 22, front - 18, 40, 12, { seed: 'tt2', rot: 30, op: 0.35 });
      /* (the typed "get home safe" scrap at the front left is gone: the guide's strip sat on it, a grey sliver showing, 2026-11-22) */
      return out;
    }

    /* ---------------------------------------------------------------- */
    /* the objects, each drawn inside its own box                        */
    /* ---------------------------------------------------------------- */

    /* the calendar page: the month photocopied, show nights in marker, other bookers' nights scribbled out, today
       circled three times, the weather scrawled on the days */
    function drawCalendar(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], st = v.st, from = st.from, d0 = SB.time.date(from), first, start, rows, i, inner = '',
          gx = x + 14, gy = y + 104, cw = (w - 28) / 7, ch, day, dd, wv = v.wk, inWeek, showDays = {}, otherDays = {}, todayDay, weather = {}, idx, cx2, cy2;
      v.allShows.forEach(function (s) { showDays[s.day] = (showDays[s.day] || 0) + 1; });
      if (wv && wv.days) wv.days.forEach(function (d) { if (d.other && d.other.length) otherDays[d.day] = true; if (d.forecast) weather[d.day] = d.forecast; });
      todayDay = from + (st.phase === 'PLAY' ? (v.cursor.dayIdx || 0) : 0);
      inner += '<path d="M' + (x - 10) + ' ' + (y + 6) + 'H' + (x + w + 10) + 'V' + (y + 74) + 'H' + (x - 10) + 'Z" fill="' + T + '"/>';
      inner += k.marker(SB.time.fmt(from, 'month').toUpperCase(), x + 20, y + 62, 44, { fill: PAPER, seed: 'cal', maxWidth: w - 110 });
      inner += k.type(String(d0.y), x + w - 18, y + 54, 17, { fill: PAPER, anchor: 'end', bold: true });
      ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (c, n) { inner += k.type(c, gx + n * cw + cw / 2, gy - 9, 14, { anchor: 'middle', bold: true }); });
      first = SB.time.dayOf(d0.y, d0.m, 1);
      start = first - SB.time.dow(first);
      rows = Math.ceil((SB.time.dayOf(d0.m === 12 ? d0.y + 1 : d0.y, d0.m === 12 ? 1 : d0.m + 1, 1) - start) / 7);
      ch = Math.min(56, (y + h - gy - 14) / rows);
      idx = Math.floor((from - start) / 7);
      if (idx >= 0 && idx < rows) inner += k.dotsRect(gx, gy + idx * ch, cw * 7, ch, 2);
      for (i = 0; i <= rows; i++) inner += k.line(gx, gy + i * ch, gx + cw * 7, gy + i * ch, { seed: 'gl' + i, sw: i === 0 ? 3.5 : 1.8, over: 2, wob: 0.6 });
      for (i = 0; i <= 7; i++) inner += k.line(gx + i * cw, gy, gx + i * cw, gy + rows * ch, { seed: 'gv' + i, sw: 1.8, over: 2, wob: 0.6 });
      for (i = 0; i < rows * 7; i++) {
        day = start + i; dd = SB.time.date(day);
        cx2 = gx + (i % 7) * cw; cy2 = gy + Math.floor(i / 7) * ch;
        inWeek = day >= from && day <= from + 6;
        if (dd.m !== d0.m && !inWeek) { inner += k.dotsRect(cx2 + 2, cy2 + 2, cw - 4, ch - 4, 1); continue; }
        if (inWeek) inner += '<rect x="' + f(cx2 + 2) + '" y="' + f(cy2 + 3) + '" width="' + f(cw * 0.5) + '" height="17" fill="' + PAPER + '"/>';
        inner += k.type(String(dd.d), cx2 + 4, cy2 + 16, 14, { bold: true, fill: dd.m === d0.m ? T : '#666' });
        if (otherDays[day] && !showDays[day]) inner += k.scribble(cx2 + 5, cy2 + 6, cw - 10, ch - 12, { seed: 'x' + day, sw: 2.6, n: 6 });
        if (showDays[day]) inner += k.marker('SHOW', cx2 + cw / 2, cy2 + ch - 7, 12, { anchor: 'middle', seed: 'sw' + day, maxWidth: cw - 6 }) + k.line(cx2 + 5, cy2 + ch - 4, cx2 + cw - 5, cy2 + ch - 5, { seed: 'su' + day, sw: 2.4 });
        if (inWeek && weather[day] && weather[day] !== 'CLEAR' && !showDays[day]) inner += k.letter(weather[day] === 'STORM' ? 'STORM!' : weather[day].toLowerCase(), cx2 + cw / 2, cy2 + ch - 6, 10, { anchor: 'middle', seed: 'wx' + day, rot: -6 });
        if (day === todayDay) inner += k.circle3(cx2 + cw / 2, cy2 + ch / 2, cw * 0.58, ch * 0.52, { seed: 'today' + day, stroke: T, sw: 3 });
      }
      return k.paper(x, y, w, h, { seed: v.seed + 'cal', stock: 'white', torn: 't', inner: inner, burn: 0.7 }) + k.staple(x + w / 2, y + 14, { rot: -6 });
    }

    /* the tape deck: a xeroxed cut-out; pressed, it pauses or plays on the night playing out, closes the week (at an
       evening it points at the pinned clock); the tape's label is the week. Stopped at an evening, playing while the
       night plays out. */
    function deckDown(v) {
      var st = v.st, key = v.lamp ? v.lamp.key : '';
      return v.playing ? 'PLAY' : (key === 'night' || key === 'close' || st.phase === 'CLOSE' ? 'STOP' : (st.phase === 'PLAY' ? 'PAUSE' : ''));
    }
    function reels(b) { return [[b[0] + 116, b[1] + 70], [b[0] + b[2] - 116, b[1] + 70]]; }
    function drawLamp(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], st = v.st, inner = '', keys = ['REW', 'PLAY', 'FF', 'STOP', 'PAUSE'], down = deckDown(v), kw = (w - 40) / 5;
      inner += '<path d="M' + (x + 22) + ' ' + (y + 14) + 'H' + (x + w - 22) + 'V' + (y + 116) + 'H' + (x + 22) + 'Z" fill="#2a2a28" stroke="' + PAPER + '" stroke-width="2"/>';
      inner += '<path d="M' + (x + 36) + ' ' + (y + 22) + 'H' + (x + w - 36) + 'V' + (y + 110) + 'H' + (x + 36) + 'Z" fill="' + PAPER + '"/>';
      inner += '<path d="M' + (x + 36) + ' ' + (y + 22) + 'H' + (x + w - 36) + 'V' + (y + 40) + 'H' + (x + 36) + 'Z" fill="' + k.stock('goldenrod') + '"/>';
      inner += k.type(L('words.week', { n: st.week + 1 }) + '  ' + md(st.from) + '-' + md(st.to), x + 46, y + 36, 13, { bold: true });
      inner += '<path d="M' + (x + 96) + ' ' + (y + 48) + 'H' + (x + w - 96) + 'V' + (y + 94) + 'H' + (x + 96) + 'Z" fill="' + T + '"/>';
      reels(b).forEach(function (p) { inner += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="20" fill="' + T + '" stroke="' + PAPER + '" stroke-width="3"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="' + PAPER + '"/>'; });
      inner += k.letter(String(v.cityName || '').toLowerCase() + ' mix', x + w / 2, y + 106, 10, { anchor: 'middle', seed: 'mix' });
      inner += k.dotsRect(x + 22, y + 14, 90, 102, 1, { white: true });
      keys.forEach(function (kk, i) {
        var kx = x + 20 + i * kw, isDown = kk === down;
        inner += '<path d="M' + f(kx + 3) + ' ' + (y + 128 + (isDown ? 5 : 0)) + 'h' + f(kw - 6) + 'v' + (isDown ? 31 : 36) + 'h-' + f(kw - 6) + 'Z" fill="' + (isDown ? PAPER : '#3a3a37') + '" stroke="' + PAPER + '" stroke-width="2"/>';
        inner += k.type(kk, kx + kw / 2, y + 151 + (isDown ? 3 : 0), 11, { anchor: 'middle', bold: true, fill: isDown ? T : PAPER });
      });
      return k.cutout([[x, y + 8], [x + 8, y], [x + w - 8, y], [x + w, y + 8], [x + w, y + h], [x, y + h]], inner, { seed: 'deck', edge: 7 });
    }

    /* coffee: a cup seen from above; more cups and rings as stress rises */
    function cupAt(k, cx, cy, rad, full, seed) {
      var pts = [], i, inner;
      for (i = 0; i < 22; i++) pts.push([cx + Math.cos(i / 22 * Math.PI * 2) * rad, cy + Math.sin(i / 22 * Math.PI * 2) * rad]);
      inner = '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(rad - 2) + '" fill="' + PAPER + '" stroke="' + T + '" stroke-width="4"/>' +
              '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(rad * 0.74) + '" fill="' + (full ? '#1a120c' : '#cfc6ae') + '" stroke="' + T + '" stroke-width="3"/>' +
              (full ? k.dots('M' + f(cx - rad * 0.5) + ' ' + f(cy - rad * 0.2) + 'Q' + f(cx - rad * 0.3) + ' ' + f(cy - rad * 0.6) + ' ' + f(cx + rad * 0.2) + ' ' + f(cy - rad * 0.6) + 'Q' + f(cx - rad * 0.2) + ' ' + f(cy - rad * 0.4) + ' ' + f(cx - rad * 0.5) + ' ' + f(cy - rad * 0.2) + 'Z', 3, { white: true })
                    : '<circle cx="' + cx + '" cy="' + cy + '" r="' + f(rad * 0.55) + '" fill="none" stroke="#6b4a2a" stroke-width="3" stroke-opacity=".6"/>') +
              k.dotsRect(cx + rad * 0.25, cy - rad, rad * 0.75, rad * 2, 1);
      return k.cutouts([{ d: k.polyD(pts) }, { d: k.polyD([[cx + rad - 6, cy - 15], [cx + rad + 30, cy - 13], [cx + rad + 32, cy + 13], [cx + rad - 6, cy + 15]]) }],
                       { edge: 6, inner: '<path d="M' + f(cx + rad + 4) + ' ' + f(cy - 5) + 'H' + f(cx + rad + 24) + 'V' + f(cy + 5) + 'H' + f(cx + rad + 4) + '" fill="' + PAPER + '"/>' }).replace(/fill="#141413"/g, 'fill="' + PAPER + '"') + inner;
    }
    function drawMug(v, b) {
      var k = K(), sv = v.st.stress ? v.st.stress.value : 0, out = '', x = b[0], y = b[1], n = Math.min(4, Math.floor(sv / 22)), i;
      for (i = 0; i < n; i++) out += '<circle cx="' + f(x + 60 + i * 52) + '" cy="' + f(y + 60 + (i % 2) * 70) + '" r="46" fill="none" stroke="#5a4a38" stroke-opacity=".7" stroke-width="5" stroke-dasharray="' + (200 + i * 20) + ' 90"/>';
      if (sv >= 75) out += cupAt(k, x + 236, y + 52, 40, false, 'cup3');
      if (sv >= 50) out += cupAt(k, x + 236, y + 146, 40, false, 'cup2');
      out += cupAt(k, x + 100, y + 100, 80, true, 'cup1');
      return out;
    }

    /* the paste-up: the next show's flyer half pasted up on the cutting mat, scissors, glue stick, markers */
    function nextShow(v) { return v.upcoming.length ? v.upcoming[0] : null; }
    function flyerDue(v) { var sh = nextShow(v); return !!(sh && !(sh.promo && sh.promo.flyer) && v.daysTo(sh.day) <= 21); }
    function drawPaper(v, s, b) {
      var k = K(), out = '', mx = b[0], my = b[1], mw = b[2], mh = b[3], i, inner = '', sh = nextShow(v), sp = sh ? v.specs[sh.id] : null, url = null,
          x = mx + 34, y = my + 40, w = 250, h = 324, cid, strip = '', nm;
      for (i = 1; i < mw / 30; i++) inner += '<path d="M' + (mx + i * 30) + ' ' + my + 'V' + (my + mh) + '" stroke="#9a9a5a" stroke-opacity="' + (i % 5 ? 0.35 : 0.8) + '" stroke-width="' + (i % 5 ? 1 : 2) + '"/>';
      for (i = 1; i < mh / 30; i++) inner += '<path d="M' + mx + ' ' + (my + i * 30) + 'H' + (mx + mw) + '" stroke="#9a9a5a" stroke-opacity="' + (i % 5 ? 0.35 : 0.8) + '" stroke-width="' + (i % 5 ? 1 : 2) + '"/>';
      for (i = 1; i < mw / 150; i++) inner += k.type(String(i * 5), mx + i * 150 + 4, my + mh - 8, 10, { fill: '#c9c98a' });
      out += k.paper(mx, my, mw, mh, { seed: 'mat', stock: 'olive', inner: inner, burn: 0.4, cut: 1.2 });
      out += k.regmark(mx + mw - 24, my + 24, 12);
      if (sh && sh.promo && sh.promo.flyer) url = showFlyer(s, sh);
      if (url) {
        cid = k.id('pu');
        inner = '<clipPath id="' + cid + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + f(h * 0.68) + '"/></clipPath><g clip-path="url(#' + cid + ')">' + img(url, x, y, w, h) + '</g>';
        inner += '<path d="M' + (x + 14) + ' ' + f(y + h * 0.72) + 'H' + (x + w - 14) + 'V' + (y + h - 16) + 'H' + (x + 14) + 'Z" fill="none" stroke="#7fb6d9" stroke-width="1.5" stroke-dasharray="7 5"/>' + k.glue(x + 30, y + h * 0.74, w - 60, h * 0.2, { seed: 'gl1' });
        cid = k.id('ps');
        strip = '<clipPath id="' + cid + '"><rect x="' + x + '" y="' + f(y + h * 0.68) + '" width="' + w + '" height="' + f(h * 0.32) + '"/></clipPath>' +
                '<g transform="translate(290 70) rotate(-8 ' + f(x + w / 2) + ' ' + f(y + h * 0.84) + ')"><path d="M' + (x + 4) + ' ' + f(y + h * 0.68 + 6) + 'h' + w + 'v' + f(h * 0.32) + 'h-' + w + 'Z" fill="#000" fill-opacity=".6"/><g clip-path="url(#' + cid + ')">' + img(url, x, y, w, h) + '</g></g>';
      } else if (sh && sp) {
        nm = String(sp.billing && sp.billing[0] ? sp.billing[0].name : 'SHOW').toUpperCase();
        inner = '<path d="M' + (x + 14) + ' ' + (y + 14) + 'H' + (x + w - 14) + 'V' + (y + h - 14) + 'H' + (x + 14) + 'Z" fill="none" stroke="#7fb6d9" stroke-width="1.5" stroke-dasharray="7 5"/>';
        inner += k.ransom(short(nm, 14), x + w / 2, y + 64, 22, { anchor: 'middle', seed: 'pu' + sh.id, grounds: [T, PAPER, T, k.stock('goldenrod')] });
        inner += '<path d="M' + (x + 30) + ' ' + (y + 96) + 'H' + (x + w - 30) + 'V' + (y + 196) + 'H' + (x + 30) + 'Z" fill="none" stroke="' + T + '" stroke-width="2"/>' + k.xout(x + 30, y + 96, w - 60, 100, { seed: 'pux', sw: 1.6 });
        inner += k.marker((sp.date ? sp.date.dow + ' ' + md(sh.day) : md(sh.day)), x + w / 2, y + 250, 40, { anchor: 'middle', seed: 'pd' + sh.id, maxWidth: w - 30 });
        inner += k.under3(x + 40, y + 260, w - 80, { seed: 'pdu', sw: 3 });
        inner += k.type(short(sp.room ? sp.room.name : '', 24), x + w / 2, y + 304, 12, { anchor: 'middle', bold: true });
        if (sp.billing && sp.billing[1]) strip = k.paper(x + w + 40, my + 300, 200, 34, { seed: 'pus', stock: 'white', rot: -5, inner: '<rect x="' + (x + w + 40) + '" y="' + (my + 300) + '" width="200" height="34" fill="' + T + '"/>' + k.type('+ ' + short(String(sp.billing[1].name).toUpperCase(), 14), x + w + 52, my + 323, 15, { fill: PAPER, bold: true }) });
      } else {
        inner = k.marker('???', x + w / 2, y + 150, 60, { anchor: 'middle', seed: 'pq' }) + k.type(L('words.nothingToFlyer'), x + w / 2, y + 200, 13, { anchor: 'middle' });
      }
      out += k.paper(x, y, w, h, { seed: 'pusheet', stock: 'white', rot: -1.5, inner: inner, burn: 0.45 });
      out += strip;
      out += k.tape(x + 6, y + 4, 54, 18, { seed: 'put1', rot: -35 }) + k.tape(x + w - 4, y + 6, 54, 18, { seed: 'put2', rot: 30 });
      /* on the mat: scissors, a glue stick, markers, as cut-outs */
      out += k.scissors(mx + 420, my + 110, 230, -20, { seed: 'sc' });
      out += k.cutout([[mx + 540, my + 170], [mx + 580, my + 170], [mx + 580, my + 300], [mx + 540, my + 300]],
                      '<rect x="' + (mx + 540) + '" y="' + (my + 170) + '" width="40" height="36" fill="#3a3a37"/>' + k.type(L('words.glue'), 0, 0, 11, { fill: PAPER, bold: true }).replace('<text', '<text transform="translate(' + (mx + 565) + ' ' + (my + 292) + ') rotate(-90)"'), { seed: 'glue', edge: 6, rot: 6, cx: mx + 560, cy: my + 235 });
      [[mx + 330, my + 200, 12], [mx + 322, my + 244, 4], [mx + 336, my + 288, -6]].forEach(function (m, n) {
        out += k.cutout([[m[0], m[1]], [m[0] + 170, m[1]], [m[0] + 170, m[1] + 26], [m[0], m[1] + 26]],
                        '<rect x="' + (m[0] + 132) + '" y="' + m[1] + '" width="38" height="26" fill="#55544e"/>' + k.type(L('words.perm'), m[0] + 10, m[1] + 18, 11, { fill: PAPER, bold: true }), { seed: 'mk' + n, edge: 5, rot: m[2], cx: m[0] + 85, cy: m[1] + 13 });
      });
      return out;
    }

    /* set lists: one typed, marked-up sheet per show on the way, days out circled */
    function clipShows(v) { return v.upcoming.slice(0, 4); }
    function clipBox(i) { return [CLIP.x + i * CLIP.step, CLIP.y + CLIP.dy[i % 4], CLIP.w, CLIP.h, CLIP.rot[i % 4]]; }
    function drawClip(v, b, sh, i) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], inner, sp, days, lines;
      if (!sh) {
        inner = k.marker(L('words.nothing'), x + w / 2, y + 100, 20, { anchor: 'middle', maxWidth: w - 20, seed: 'nb', rot: -8 }) + k.scrawl(x + 14, y + 150, w - 40, { seed: 'sl1' });
        return k.paper(x, y, w, h, { seed: 'sl0', stock: 'bone', inner: inner });
      }
      sp = v.specs[sh.id] || {}; days = v.daysTo(sh.day);
      lines = (sp.billing || []).slice(0, 5).map(function (bb, j) { return (j + 1) + '.' + short(String(bb.name || '').toUpperCase(), 13) + (bb.unconfirmed ? '?' : ''); });
      inner = '<path d="M' + (x - 4) + ' ' + (y - 4) + 'H' + (x + w + 4) + 'V' + (y + 40) + 'H' + (x - 4) + 'Z" fill="' + T + '"/>';
      inner += k.marker(dowShort(sh.day).toUpperCase() + ' ' + md(sh.day), x + 10, y + 32, 22, { seed: 'sd' + sh.id, maxWidth: w - 20, fill: PAPER });
      inner += k.type(short(sp.room ? sp.room.name : '', 19), x + 10, y + 58, 10);
      inner += k.typeLines(lines.length ? lines : ['1.???'], x + 10, y + 82, 11, 17, {});
      inner += k.type(days <= 0 ? 'TONIGHT' : days === 1 ? 'TOMORROW' : days + ' DAYS', x + w - 14, y + h - 16, 13, { anchor: 'end', bold: true });
      inner += k.circle3(x + w - 46, y + h - 21, 42, 14, { seed: 'sc' + sh.id, stroke: T, sw: 2.4 });
      if (i === 0) inner += k.heart(x + 18, y + h - 20, 13, { seed: 'slh' });
      return k.paper(x, y, w, h, { seed: 'sl' + sh.id, stock: ['white', 'blue', 'bone', 'goldenrod'][i % 4], inner: inner, burn: 0.5 });
    }

    /* the composition book: black marbled cover, a typed label, fatter as it fills, a scrap sticking out when something is new */
    function learnedKey(v) { return String((v.tally.shows || 0) + v.how); }
    function isNotebookNew(v) {
      var key = learnedKey(v);
      if (seenLearned === null) seenLearned = key;
      lastLearned = key;
      return key !== seenLearned;
    }
    function drawNotebook(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3] - 12, learned = (v.tally.shows || 0) + v.how, thick = Math.min(12, 3 + Math.floor(learned / 2)), fresh = isNotebookNew(v),
          r = k.rng(v.seed + 'marble'), marble = '', i, px, py, out = '';
      for (i = 0; i < 190; i++) {
        px = x + r.range(0, w); py = y + r.range(0, h);
        marble += '<path d="M' + f(px) + ' ' + f(py) + 'l' + f(r.range(3, 13)) + ' ' + f(r.range(-5, 5)) + 'l' + f(r.range(-6, 3)) + ' ' + f(r.range(3, 9)) + 'l' + f(r.range(-11, -2)) + ' ' + f(r.range(-3, 5)) + 'Z" fill="' + PAPER + '"/>';
      }
      marble += '<rect x="' + (x - 4) + '" y="' + (y - 4) + '" width="28" height="' + (h + 8) + '" fill="' + T + '"/>';
      marble += '<path d="M' + (x + 70) + ' ' + (y + 36) + 'H' + (x + w - 30) + 'V' + (y + 124) + 'H' + (x + 70) + 'Z" fill="' + PAPER + '" stroke="' + T + '" stroke-width="3"/>';
      marble += k.type(L('words.composition'), x + 80, y + 56, 12, { bold: true });
      marble += k.marker(L('words.notes'), x + 82, y + 98, 28, { seed: 'nb' });
      marble += k.type(L('words.learned', { n: learned }), x + w - 38, y + 117, 11, { anchor: 'end' });
      if (fresh) out += k.paper(x + 200, y - 26, 40, 50, { seed: 'nbnew', stock: 'pink', torn: 't' });
      for (i = thick; i > 0; i -= 3) out += '<path d="M' + (x + i) + ' ' + (y + i) + 'h' + w + 'v' + h + 'h-' + w + 'Z" fill="' + (i % 2 ? '#e7ddc4' : '#d6cbb0') + '"/>';
      out += k.paper(x, y, w, h, { seed: 'nbc', stock: T, inner: marble, burn: 0, cut: 1.2 });
      return out;
    }

    /* the flyer pile: every flyer made, newest on top, the remembered ones starred in marker */
    function drawFlyers(v, s, b) {
      var k = K(), out = '', r = k.rng(v.seed + 'fp'), items = [], seen = {}, starred = {}, i, it, x, y, w = 124, h = 160, url, inner;
      v.wall.forEach(function (rec) { if (rec && rec.id) starred[rec.id] = true; if (rec && rec.showId) starred[rec.showId] = true; });
      v.binder.forEach(function (rec) {
        var sid = rec.showId || rec.id;
        if (!rec.flyer || seen[sid]) return;
        seen[sid] = true; items.push({ key: sid, rec: rec, star: !!(rec.wall || starred[rec.id]) });
      });
      v.flyered.forEach(function (sh) { if (!seen[sh.id]) { seen[sh.id] = true; items.push({ key: sh.id, show: sh, star: !!starred[sh.id] }); } });
      items = items.slice(-4);
      if (!items.length) {
        ['goldenrod', 'blue', 'pink'].forEach(function (st, n) { out += k.paper(b[0] + 20 + n * 34, b[1] + 6 + n * 4, w, h + 10, { rng: r, stock: st, rot: -8 + n * 7, burn: 0.4 }); });
        out += k.paper(b[0] + 50, b[1] + 80, 170, 34, { seed: 'nfs', stock: 'bone', rot: -4, inner: k.type(L('words.flyersHere'), b[0] + 135, b[1] + 103, 15, { anchor: 'middle', bold: true }) });
        return out;
      }
      for (i = 0; i < items.length; i++) {
        it = items[i];
        x = b[0] + 4 + i * 38 + r.range(-4, 4); y = b[1] + 4 + (i % 2) * 14;
        url = it.show ? showFlyer(s, it.show) : (it.rec.flyer && it.rec.flyer.spec ? flyerUrl('rec' + it.key, it.rec.flyer.recipe, it.rec.flyer.spec) : null);
        inner = url ? img(url, x, y, w, h) : k.marker('SHOW', x + w / 2, y + 70, 26, { anchor: 'middle', seed: it.key });
        if (it.star) inner += k.line(x + w - 46, y + h - 30, x + w - 34, y + h - 16, { seed: 'ck1' + it.key, sw: 5 }) + k.line(x + w - 34, y + h - 16, x + w - 10, y + h - 50, { seed: 'ck2' + it.key, sw: 5 }) + k.letter('KEEP', x + w - 60, y + h - 6, 10, { seed: it.key });
        out += k.paper(x, y, w, h, { seed: 'fl' + it.key, stock: 'white', rot: r.range(-9, 9), inner: inner, burn: 0.55, cut: 2 });
      }
      return out;
    }

    /* the road map: a folded gas-station map of the real region, the town circled, routes inked on it */
    function drawMap(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], inner = '', pts = (v.pack.points || []).slice(0, 10), town = v.entry, all, lo, la, bb, p, near,
          mx0 = x + 22, my0 = y + 58, mw = w - 44, mh = h - 80, kx, proj, tpos, roads = (v.pack.roads || []).slice(0, 2), i;
      for (i = 0; i < 3; i++) if (i % 2 === 0) inner += k.dotsRect(x + i * w / 3, y, w / 3, h, 1);
      inner += '<path d="M' + f(x + w / 3) + ' ' + y + 'V' + (y + h) + 'M' + f(x + 2 * w / 3) + ' ' + y + 'V' + (y + h) + 'M' + x + ' ' + f(y + h / 2) + 'H' + (x + w) + '" stroke="#3a3a36" stroke-width="2.5"/>';
      inner += '<path d="M' + (x - 5) + ' ' + (y - 5) + 'H' + (x + w + 5) + 'V' + (y + 40) + 'H' + (x - 5) + 'Z" fill="' + T + '"/>';
      inner += k.type(L('words.roadMap'), x + w - 12, y + 26, 11, { fill: PAPER, bold: true, anchor: 'end' });
      all = pts.concat(town && town.lat ? [town] : []);
      if (all.length) {
        lo = all.map(function (q) { return q.lon; }); la = all.map(function (q) { return q.lat; });
        bb = { x0: Math.min.apply(null, lo), x1: Math.max.apply(null, lo), y0: Math.min.apply(null, la), y1: Math.max.apply(null, la) };
        kx = Math.cos((town.lat || 32) * Math.PI / 180);
        var sc = Math.min(mw / Math.max(0.5, (bb.x1 - bb.x0) * kx), mh / Math.max(0.5, bb.y1 - bb.y0));
        proj = function (q) { return [mx0 + mw / 2 + (q.lon - (bb.x0 + bb.x1) / 2) * kx * sc, my0 + mh / 2 - (q.lat - (bb.y0 + bb.y1) / 2) * sc]; };
        tpos = town.lat ? proj(town) : [x + w / 2, y + h / 2];
        near = pts.slice().sort(function (a, c) { return Math.abs(a.lat - town.lat) + Math.abs(a.lon - town.lon) - Math.abs(c.lat - town.lat) - Math.abs(c.lon - town.lon); });
        near.slice(0, 4).forEach(function (q, n) {
          p = proj(q);
          inner += '<path d="M' + f(tpos[0]) + ' ' + f(tpos[1]) + 'L' + f(p[0]) + ' ' + f(p[1]) + '" stroke="' + T + '" stroke-width="' + (n < 2 ? 5 : 3) + '"/>';
          if (n < 2) inner += '<path d="M' + f(tpos[0]) + ' ' + f(tpos[1]) + 'L' + f(p[0]) + ' ' + f(p[1]) + '" stroke="' + PAPER + '" stroke-width="1.4" stroke-dasharray="6 6"/>';
        });
        near.slice(-2).forEach(function (q, n) { p = proj(q); inner += k.path([tpos, [(tpos[0] + p[0]) / 2 + (n ? 16 : -16), (tpos[1] + p[1]) / 2 - 12], p], { seed: 'rt' + n, sw: 3, stroke: T, wob: 3, dash: '9 5' }); });
        pts.forEach(function (q) {
          p = proj(q);
          inner += '<rect x="' + f(p[0] - 3.5) + '" y="' + f(p[1] - 3.5) + '" width="7" height="7" fill="' + T + '"/>';
          inner += k.type(short(q.name, 11).toUpperCase(), p[0] + (p[0] > x + w - 90 ? -7 : 7), p[1] - 6, 9.5, { anchor: p[0] > x + w - 90 ? 'end' : 'start', bold: true });
        });
        roads.forEach(function (rd, n) {
          var q = near[n] ? proj(near[n]) : tpos, mx = (tpos[0] + q[0]) / 2, my = (tpos[1] + q[1]) / 2, tw = k.typeWidth(rd, 9) + 8;
          inner += '<rect x="' + f(mx - tw / 2) + '" y="' + f(my - 8) + '" width="' + f(tw) + '" height="15" fill="' + PAPER + '" stroke="' + T + '" stroke-width="2"/>' + k.type(rd, mx, my + 4, 9, { anchor: 'middle', bold: true });
        });
        inner += '<rect x="' + f(tpos[0] - 7) + '" y="' + f(tpos[1] - 7) + '" width="14" height="14" fill="' + T + '"/>';
        inner += k.ransom(String(v.cityName), Math.min(tpos[0] + 14, x + w - 16 - k.ransomWidth(String(v.cityName), 15)), tpos[1] + 30, 15, { seed: 'tn' });
        inner += k.circle3(tpos[0], tpos[1], 24, 20, { seed: 'tc', stroke: T, sw: 3.5 });
      }
      return k.paper(x, y, w, h, { seed: v.seed + 'map', stock: 'white', inner: inner, burn: 0.6 });
    }

    /* the key ring: keys as xeroxed cut-outs, each with a paper tag lettered with its room; a held date is a second tag */
    function drawKeys(v, b) {
      var k = K(), out = '', x = b[0], y = b[1], w = b[2], cx = x + 56, cy = y + 34, rooms = v.rooms.slice(0, 4), heldBy = {}, n = rooms.length, tags = '', keys = '', strings = '';
      v.held.forEach(function (sh) { if (sh.roomId && !heldBy[sh.roomId]) heldBy[sh.roomId] = sh; });
      rooms.forEach(function (room, i) {
        var deg = n === 1 ? 92 : 64 + i * (52 / Math.max(1, n - 1)), a = deg * Math.PI / 180, len = 104, rm = k.rng('key' + room.id),
            tipx = cx + Math.cos(a) * (len + 20), tipy = cy + Math.sin(a) * (len + 20), tx = x + 4 + (i % 2) * 52, ty = y + 156 + i * 28, held = heldBy[room.id];
        keys += k.keyShape(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26, len, deg, { rng: rm, fill: i % 2 ? '#3a3a37' : '#232321' });
        strings += '<path d="M' + f(tipx) + ' ' + f(tipy - 10) + 'L' + f(tx + 10) + ' ' + f(ty + 12) + '" stroke="' + PAPER + '" stroke-width="1.4"/>';
        tags += k.paper(tx, ty, 102, 26, { rng: rm, stock: held ? 'pink' : ['manila', 'goldenrod', 'blue', 'white'][i % 4], cut: 1.6, burn: 0.4,
                                         inner: '<circle cx="' + (tx + 9) + '" cy="' + (ty + 13) + '" r="3.5" fill="' + T + '"/>' + k.marker(roomWord(room.name), tx + 17, ty + 20, 13, { maxWidth: held ? 46 : 80, seed: room.id }) +
                                                (held ? k.type(md(held.day), tx + 98, ty + 18, 10, { anchor: 'end', bold: true }) : '') });
      });
      out = keys + strings + tags;
      out += '<circle cx="' + cx + '" cy="' + cy + '" r="26" fill="none" stroke="#000" stroke-opacity=".7" stroke-width="18" transform="translate(4 6)"/>' +
             '<circle cx="' + cx + '" cy="' + cy + '" r="26" fill="none" stroke="' + PAPER + '" stroke-width="16"/><circle cx="' + cx + '" cy="' + cy + '" r="26" fill="none" stroke="' + T + '" stroke-width="7"/>' +
             '<path d="M' + (cx + 18) + ' ' + (cy - 20) + 'A26 26 0 0 1 ' + (cx + 26) + ' ' + (cy - 2) + '" stroke="' + PAPER + '" stroke-width="2" fill="none"/>';
      if (v.rooms.length > 4) out += k.type('+' + (v.rooms.length - 4), x + w - 6, y + 70, 14, { anchor: 'end', bold: true, fill: PAPER });
      if (!n) out += k.paper(x + 10, y + 110, 140, 30, { seed: 'nokey', stock: 'manila', inner: k.type(L('words.noKeys'), x + 80, y + 130, 12, { anchor: 'middle' }) });
      return out;
    }

    /* the phone: a xeroxed cut-out, screen lit when someone wrote */
    function drawPhone(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], n = v.needs, inner = '', sx = x + 12, sy = y + 36, sw = w - 24, sh = h - 84, i;
      if (n > 0) {
        inner += '<rect x="' + sx + '" y="' + sy + '" width="' + sw + '" height="' + sh + '" fill="' + PAPER + '"/>';
        inner += k.type(dowShort(v.st.from + (v.cursor.dayIdx || 0)).toUpperCase(), sx + 8, sy + 20, 12, { bold: true });
        inner += k.marker(L('words.newMsg', { n: n > 9 ? '9+' : n }), sx + sw / 2, sy + 74, 32, { anchor: 'middle', maxWidth: sw - 14, seed: 'pn' });
        for (i = 0; i < Math.min(3, n); i++) {
          inner += '<rect x="' + (sx + 8) + '" y="' + (sy + 94 + i * 34) + '" width="' + (sw - 16) + '" height="26" fill="' + T + '"/>';
          inner += k.scrawl(sx + 14, sy + 108 + i * 34, sw - 34, { seed: 'pm' + i, stroke: PAPER, sw: 1.8 });
        }
      } else {
        inner += '<rect x="' + sx + '" y="' + sy + '" width="' + sw + '" height="' + sh + '" fill="#222"/>' + k.dots('M' + sx + ' ' + (sy + 30) + 'L' + (sx + sw) + ' ' + sy + 'V' + (sy + 70) + 'L' + sx + ' ' + (sy + 140) + 'Z', 1, { white: true });
        inner += '<path d="M' + (sx + 18) + ' ' + (sy + 10) + 'L' + (sx + 62) + ' ' + (sy + 90) + 'L' + (sx + 48) + ' ' + (sy + 150) + 'M' + (sx + 62) + ' ' + (sy + 90) + 'L' + (sx + sw - 6) + ' ' + (sy + 112) + '" stroke="' + PAPER + '" stroke-width="1.2" fill="none"/>';
      }
      inner += '<rect x="' + (x + w / 2 - 20) + '" y="' + (y + 16) + '" width="40" height="6" fill="#555"/>';
      inner += '<rect x="' + (x + w / 2 - 13) + '" y="' + (y + h - 38) + '" width="26" height="20" fill="none" stroke="#666" stroke-width="3"/>';
      return k.cutout([[x + 10, y], [x + w - 10, y], [x + w, y + 10], [x + w, y + h - 10], [x + w - 10, y + h], [x + 10, y + h], [x, y + h - 10], [x, y + 10]], inner, { seed: 'phone', edge: 7 });
    }

    /* the sticker pile: the local bands' marks, through the toner: black on one or two stocks, halftone, die-cut */
    function markSize(svg) { var m = /width="([\d.]+)"/.exec(svg || ''), n = /height="([\d.]+)"/.exec(svg || ''); return [m ? +m[1] : 120, n ? +n[1] : 50]; }
    function drawStickers(v, b) {
      var k = K(), out = '', list = v.bands.slice(0, 3), r = k.rng(v.seed + 'stk'), backs = [PAPER, k.stock('goldenrod'), PAPER, k.stock('blue')];
      if (!list.length) return k.paper(b[0] + 20, b[1] + 30, 220, 160, { seed: 'nostk', stock: 'white', inner: k.type(L('words.noBands'), b[0] + 130, b[1] + 114, 12, { anchor: 'middle' }) + '<path d="M' + (b[0] + 40) + ' ' + (b[1] + 70) + 'H' + (b[0] + 220) + 'M' + (b[0] + 40) + ' ' + (b[1] + 160) + 'H' + (b[0] + 220) + '" stroke="#999" stroke-dasharray="4 4"/>' });
      list.forEach(function (bd, i) {
        var mk = safe(function () { return SB.Identity.bandMark({ id: bd.id, name: bd.name, genre: bd.genre }, 40); }, ''), sz = markSize(mk), sc = Math.min(2.2, 206 / sz[0]), bw = sz[0] * sc + 20, bh = sz[1] * sc + 14,
            cx = b[0] + 6 + r.range(0, 12) + (i % 2) * 4, cy = b[1] + 8 + i * 82, back = backs[i % backs.length], ht = i % 2 === 1;
        out += k.sticker({ rect: [cx, cy, bw, bh] }, (ht ? k.dotsRect(cx, cy, bw, bh, 1) : '') +
                         (mk ? '<g transform="translate(' + f(cx + 10) + ' ' + f(cy + 7) + ') scale(' + f(sc * 100) / 100 + ')" style="color:' + T + '" filter="url(#dk-tonerize)">' + stripTitle(mk).replace('<svg', '<svg x="0" y="0"') + '</g>' : k.type(bd.name, cx + 8, cy + 30, 12)),
                         { rng: r, fill: back, edge: 5, rot: r.range(-4, 4), cx: cx + bw / 2, cy: cy + bh / 2 });
      });
      return out;
    }

    /* the matchbook and the scraps with numbers on them: the people who help */
    function drawBook(v, b) {
      var k = K(), out = '', x = b[0] + 6, y = b[1] + 12, w = 154, h = 80, list = v.circleList.slice(0, 2), inner;
      list.forEach(function (p, i) {
        var r = k.rng(v.seed + 'num' + i), nm = String((p && (p.name || p.first)) || '').split(/\s+/)[0].toUpperCase().slice(0, 9),
            num = '555-' + String(1000 + Math.floor(r.next() * 8999)).slice(0, 4), sx = b[0] + i * 66, sy = b[1] + 102;
        out += k.paper(sx, sy, 96, 40, { rng: r, stock: i % 2 ? 'white' : 'bone', torn: 'tr', rot: r.range(-6, 6),
                                        inner: k.letter(nm, sx + 7, sy + 17, 11, { seed: 'pn' + i }) + k.type(num, sx + 7, sy + 33, 11, { fill: K().ink('ballpointBlue'), bold: true }) });
      });
      inner = '<path d="M' + x + ' ' + (y + h - 20) + 'H' + (x + w) + 'V' + (y + h) + 'H' + x + 'Z" fill="#8a8984"/>' + k.dotsRect(x, y + h - 20, w, 20, 4) +
              '<path d="M' + x + ' ' + (y + 6) + 'H' + (x + w) + 'V' + (y + 28) + 'H' + x + 'Z" fill="' + T + '"/>' + k.type(L('words.matches'), x + w / 2, y + 22, 11, { fill: PAPER, anchor: 'middle', bold: true }) +
              k.letter(L('words.mom'), x + 14, y + 50, 14, { stroke: K().ink('ballpointBlue'), rot: -4, seed: 'mom' });
      out += k.paper(x, y, w, h, { seed: 'match', stock: 'goldenrod', inner: inner, burn: 0.5 });
      return out;
    }

    /* the cash envelope: a figure crossed out and rewritten, bills showing; stamped when bills are due */
    function billsNear(v) { return !!(v.due && v.due.day - v.today <= 7); }
    function drawTin(v, b) {
      var k = K(), out = '', x = b[0], y = b[1] + 26, w = b[2], h = b[3] - 26, fund = v.st.fund || 0, bank = v.st.bank || 0, total = fund + bank, bills = Math.max(0, Math.min(3, Math.ceil(Math.max(0, total) / 150))), i, inner,
          due = v.due, near = billsNear(v), past = due && due.day < v.today;
      for (i = 0; i < bills; i++) {
        inner = '<ellipse cx="' + (x + 76 + i * 56) + '" cy="' + (y - 4) + '" rx="14" ry="17" fill="none" stroke="#3d3d38" stroke-width="2"/>' + k.dotsRect(x + 66 + i * 56, y - 20, 20, 30, 2) + k.type('20', x + 44 + i * 56, y - 14, 11, { bold: true });
        out += k.paper(x + 36 + i * 56, y - 26, 84, 46, { seed: 'bill' + i, stock: '#c4c8b8', rot: -6 + i * 5, inner: inner, burn: 0.3 });
      }
      inner = '<path d="M' + x + ' ' + y + 'L' + (x + w / 2) + ' ' + (y + h * 0.5) + 'L' + (x + w) + ' ' + y + '" fill="none" stroke="#8c7f60" stroke-width="2.5"/>' + k.type(L('words.deposit'), x + 16, y + 26, 11, { bold: true });
      if (near) {
        inner += k.marker(money(total), x + 22, y + 70, 24, { seed: 'm1', fill: '#555', maxWidth: 120 }) + k.line(x + 16, y + 61, x + 128, y + 59, { seed: 'mx', sw: 4 });
        inner += k.marker(money(total - (due.amount || 0)), x + w / 2, y + h - 14, 36, { anchor: 'middle', seed: 'm2' });
        /* the stamp sits in the top-right corner, clear of both figures (no number under the stamp) */
        inner += '<g transform="rotate(-7 ' + (x + w - 62) + ' ' + (y + 28) + ')"><rect x="' + (x + w - 114) + '" y="' + (y + 10) + '" width="104" height="34" fill="none" stroke="' + v.hot + '" stroke-width="4"/>' +
                 k.marker(past ? L('words.pastDue') : L('words.due', { when: md(due.day) }), x + w - 62, y + 36, 18, { anchor: 'middle', fill: v.hot, maxWidth: 94, seed: 'due' }) + '</g>';
      } else {
        inner += k.marker(money(total), x + w / 2, y + h - 20, 46, { anchor: 'middle', seed: 'm3' });
      }
      out += k.paper(x, y, w, h, { seed: 'env', stock: 'bone', inner: inner, burn: 0.6 });
      return out;
    }

    /* the manila folder: lying along the bottom edge with a typed tab */
    /* a whole manila folder lying shut (user 2026-11-22: "settings should be an actual manila folder not just the top of
       one"): the back cover with its tab, two sheets showing past the top edge, the front cover a little shorter, and
       a typed label stuck on it */
    function drawDrawer(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], tabW = Math.round(w * 0.42), fy = y + 46, out = '';
      out += k.paper(0, 0, 0, 0, { pts: [[x, y + 24], [x + 12, y + 2], [x + tabW, y], [x + tabW + 12, y + 22], [x + w, y + 22], [x + w, y + h], [x, y + h]],
                                   stock: 'manila', burn: 0.7, inner: k.type(L('words.folder'), x + 22, y + 17, 13, { bold: true }) });
      out += k.paper(x + w * 0.46, y + 26, w * 0.46, 40, { stock: 'white', burn: 0.3, seed: 'fold-s1' });
      out += k.paper(x + w * 0.3, y + 34, w * 0.4, 30, { stock: 'bone', burn: 0.3, seed: 'fold-s2' });
      out += k.paper(0, 0, 0, 0, { pts: [[x - 2, fy], [x + w + 2, fy + 4], [x + w, y + h + 2], [x, y + h]], stock: 'manila', burn: 0.5,
                                   inner: k.dotsRect(x, y + h - 46, w, 46, 1) +
                                          '<path d="M' + (x + 4) + ' ' + (fy + 10) + 'H' + (x + w - 4) + '" stroke="#8c7f60" stroke-width="1.5"/>' });
      out += k.paper(x + w * 0.2, fy + 46, w * 0.6, 44, { stock: 'white', burn: 0.2, seed: 'fold-lbl',
                                   inner: k.type(L('words.folderLabel'), x + w * 0.5, fy + 75, 16, { bold: true, anchor: 'middle' }) });
      return out;
    }

    /* the rest of tonight: a sheet torn off a lined pad, TONIGHT at the top and a few things to do with boxes, in ballpoint */
    function drawTonight(v, b) {
      var k = K(), x = b[0], y = b[1], w = b[2], h = b[3], blue = K().ink('ballpointBlue'), items = L('words.todo'), inner = '', i, ly;
      if (!Array.isArray(items)) items = String(items).split(',');
      for (ly = y + 58; ly < y + h - 8; ly += 30) inner += '<path d="M' + x + ' ' + ly + 'H' + (x + w) + '" stroke="#8fb3d9" stroke-width="1.2" stroke-opacity=".8"/>';
      inner += '<path d="M' + (x + 30) + ' ' + y + 'V' + (y + h) + '" stroke="#d9534f" stroke-width="1.4" stroke-opacity=".7"/>';
      inner += k.letter(L('words.todoHead'), x + 38, y + 40, 20, { stroke: blue, rot: -3, seed: 'tn-h' });
      for (i = 0; i < items.length && i < 5; i++) {
        ly = y + 82 + i * 30;
        inner += '<rect x="' + (x + 38) + '" y="' + (ly - 15) + '" width="14" height="14" fill="none" stroke="' + blue + '" stroke-width="1.6"/>';
        inner += k.letter(items[i], x + 60, ly - 2, 14, { stroke: blue, rot: -1.5 + (i % 2) * 2, seed: 'tn' + i });
      }
      return k.paper(x, y, w, h, { stock: 'white', burn: 0.4, seed: 'tonight', torn: 't', inner: inner });
    }

    /* the settings: a pad of sticky notes, SETTINGS written on the top one in sharpie (user 2026-11-22) */
    function drawPad(v, b) {
      /* the stack of sticky notes, and a few push pins dumped next to it, lying on their sides (user 2026-11-22: "they
         are push pin thumb tacks and they should just lie next to the note pad") */
      var k = K(), x0 = b[0], y0 = b[1], bw = b[2], bh = b[3], S = 150, x = x0 + 24, y = y0 + 28, w = S + 8, h = S + 10, out;
      out = k.paper(x + 8, y + 10, w - 8, h - 10, { stock: '#d9c34a', burn: 0.3, seed: 'pad-u' }) +
            k.paper(x + 4, y + 5, w - 8, h - 10, { stock: '#e6cf52', burn: 0.3, seed: 'pad-m', shadow: false }) +
            k.paper(x, y, w - 8, h - 10, { stock: '#f2dc5d', burn: 0.4, seed: 'pad-t', shadow: false,
                                          inner: '<rect x="' + x + '" y="' + y + '" width="' + (w - 8) + '" height="24" fill="#000" fill-opacity=".07"/>' +
                                                 k.type(L('words.padNote'), x + (w - 8) / 2, y + 72, 21, { bold: true, anchor: 'middle' }) +
                                                 k.type(L('words.padSub'), x + (w - 8) / 2, y + 100, 13, { anchor: 'middle' }) });
      /* a push pin on its side, seen from above: a fat plastic grip (barrel, flared collar, wide flat end) and a short
         stubby steel point, a hard paste-up shadow under it; chunky, so it reads as a push pin and not a needle */
      function pin(px, py, deg, col) {
        var g = '<g transform="translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ') rotate(' + deg + ')">';
        g += '<path d="M4 5H38" stroke="#000" stroke-opacity=".55" stroke-width="16" stroke-linecap="round"/>';
        g += '<path d="M-9 0H3" stroke="#c9c6bd" stroke-width="3" stroke-linecap="round"/>';
        g += '<rect x="2" y="-6" width="20" height="12" rx="3" fill="' + col + '" stroke="#141413" stroke-width="1.8"/>';
        g += '<ellipse cx="23" cy="0" rx="4" ry="9" fill="' + col + '" stroke="#141413" stroke-width="1.8"/>';
        g += '<rect x="25" y="-5" width="9" height="10" rx="2" fill="' + col + '" stroke="#141413" stroke-width="1.8"/>';
        g += '<ellipse cx="35" cy="0" rx="4" ry="9" fill="' + col + '" stroke="#141413" stroke-width="1.8"/>';
        g += '<path d="M6 -3H19" stroke="#fff" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>';
        return g + '</g>';
      }
      /* spilled round the stack, filling the corner: [x, y] as a share of the box, the angle, the colour */
      var C = ['#E03A2F', '#f4f2ea', '#141413', '#E8C73A', '#2F4FB5'];
      [[0.80, 0.10, -18, 0], [0.92, 0.30, 24, 1], [0.78, 0.40, -62, 2], [0.94, 0.56, 158, 3], [0.80, 0.70, 40, 4],
       [0.60, 0.90, -150, 0], [0.36, 0.94, 12, 2], [0.12, 0.90, 75, 1], [0.04, 0.12, 200, 3]].forEach(function (q) {
        out += pin(x0 + q[0] * bw, y0 + q[1] * bh, q[2], C[q[3]]);
      });
      return out;
    }

    /* ---------------------------------------------------------------- */
    /* the objects: boxes, names, strips                                 */
    /* ---------------------------------------------------------------- */

    function zoneWord(v) { return safe(function () { return L('zone.' + v.st.stress.zone); }, ''); }
    function objects(v) {
      var st = v.st, list = [], night, sh = nextShow(v), clips = clipShows(v), learnedNew = lastLearned !== null && seenLearned !== null && lastLearned !== seenLearned,
          due = v.due, nf = Math.max(v.flyered.length, v.binder.length), dd = due ? due.day - v.today : 0, what = due ? String(due.label || 'bills').toUpperCase() : '';
      function add(id, box, name, tag, state, hotNow, route, params, extra) {
        list.push({ id: id, box: box, name: name, tag: tag, strip: L('strip.' + (/^clip\d/.test(id) ? 'clip' : id)), state: state || '', hot: !!hotNow, route: route, params: params || {}, cls: extra && extra.cls,
                    hidden: !!(extra && extra.hidden) });
      }
      add('calendar', BOX.calendar, L('names.calendar'), v.late ? L('tag.late', { n: v.late }) : L('tag.week', { n: st.week + 1, from: md(st.from), to: md(st.to) }),
          v.late ? (v.late === 1 && v.lateWhat ? L('state.lateNamed', { what: String(v.lateWhat).toUpperCase() }) : L(v.late === 1 ? 'state.lateOne' : 'state.late', { n: v.late })) : L('state.week', { n: st.week + 1, from: md(st.from), to: md(st.to) }), v.late > 0, 'week');
      night = !!v.lamp && v.lamp.key === 'night';
      /* no tape deck on the desk any more (user 2026-11-22): the pinned clock calls the night and closes the week */
      void night; void clockSay;
      add('mug', BOX.mug, L('names.mug'), L('tag.mug', { zone: zoneWord(v) }), zoneWord(v).toUpperCase(), false, null, {}, { cls: 'is-mug' });
      add('paper', BOX.paper, L('names.paper'),
          !sh ? L('tag.paperNone') : L(sh.promo && sh.promo.flyer ? 'tag.paperDone' : 'tag.paperTodo', { when: dowShort(sh.day) + ' ' + md(sh.day) }),
          !sh ? L('state.paperNone') : L(sh.promo && sh.promo.flyer ? 'state.paperDone' : 'state.paperTodo', { when: md(sh.day) }), flyerDue(v),
          /* the flyer desk is locked until the room says yes: until then the flyer opens the show's card */
          !sh ? 'shows' : (sh.status === 'CONFIRMED' ? 'flyerdesk' : 'show'), sh ? { showId: sh.id } : {});
      if (!clips.length) add('clips', clipBox(0), L('names.clips'), L('tag.clipsNone'), L('state.clipsNone'), false, 'shows');
      clips.forEach(function (c, i) {
        var d = v.daysTo(c.day), when = dowShort(c.day) + ' ' + md(c.day);
        add('clip' + i, clipBox(i), L('names.clip', { when: when }), L('tag.clip', { when: when, days: d <= 0 ? L('tag.today') : d === 1 ? L('tag.tomorrow') : L('tag.days', { n: d }) }),
            d <= 0 ? 'TONIGHT' : d === 1 ? 'TOMORROW' : d + ' DAYS', false, 'show', { showId: c.id });
      });
      add('notebook', BOX.notebook, L('names.notebook'), learnedNew ? L('tag.notebookNew') : L('tag.notebook', { n: (v.tally.shows || 0) + v.how }),
          learnedNew ? L('state.notebookNew') : L('state.notebook', { n: (v.tally.shows || 0) + v.how }), false, 'notebook');
      add('flyers', BOX.flyers, L('names.flyers'), !nf ? L('tag.flyersNone') : (v.wall.length ? L('tag.flyersStar', { n: nf, k: v.wall.length }) : L('tag.flyers', { n: nf })),
          !nf ? L('state.flyersNone') : (v.wall.length ? L('state.flyersStar', { n: nf, k: v.wall.length }) : L('state.flyers', { n: nf })), false, 'legacy');
      add('map', BOX.map, L('names.map'), L('tag.map', { town: v.cityName }), String(v.cityName).toUpperCase(), false, 'town');
      add('keys', BOX.keys, L('names.keys'), !v.rooms.length ? L('tag.keysNone') : v.held.length ? L('tag.keysHeld', { n: v.rooms.length, one: v.rooms.length === 1, k: v.held.length, more: v.roomsToFind || null }) : L('tag.keys', { n: v.rooms.length, one: v.rooms.length === 1, more: v.roomsToFind || null }),
          !v.rooms.length ? L('state.keysNone') : v.held.length ? L('state.keysHeld', { n: v.rooms.length, one: v.rooms.length === 1, k: v.held.length }) : L('state.keys', { n: v.rooms.length, one: v.rooms.length === 1 }), false, 'rooms');
      add('phone', BOX.phone, L('names.phone'), v.needs === 1 ? L('tag.phoneOne') : v.needs ? L('tag.phone', { n: v.needs }) : L('tag.phoneNone'),
          v.needs ? L('state.phone', { n: v.needs }) : L('state.phoneNone'), v.needs > 0, 'inbox');
      add('stickers', BOX.stickers, L('names.stickers'), v.bands.length ? L('tag.stickers', { n: v.bands.length }) : L('tag.stickersNone'),
          v.bands.length ? L('state.stickers', { n: v.bands.length }) : L('state.stickersNone'), false, 'bands');
      add('book', BOX.book, L('names.book'), v.circle ? L('tag.book', { n: v.circle }) : L('tag.bookNone'), v.circle ? L('state.book', { n: v.circle }) : L('state.bookNone'), false, 'people');
      /* the bank is on the desk from night one (1.17); the fund and the bills grow in at rung 3 */
      add('tin', BOX.tin, L('names.tin'), v.moneyEarly ? L('tag.tinBank', { bank: money(st.bank || 0) }) : billsNear(v) ? L('tag.tinDue', { fund: money(st.fund), what: due.label || 'bills', when: md(due.day) }) : L('tag.tin', { fund: money(st.fund), bank: money(st.bank || 0) }),
          v.moneyEarly ? L('state.tinBank', { bank: money(st.bank || 0) }) : billsNear(v) ? (dd <= 0 ? L('state.tinToday', { what: what }) : L('state.tinDue', { what: what, n: dd })) : L('state.tin', { total: money((st.fund || 0) + (st.bank || 0)) }), !v.moneyEarly && billsNear(v), 'money');
      add('drawer', BOX.drawer, L('names.drawer'), L('tag.drawer'), L('state.drawer'), false, 'files');
      add('pad', BOX.pad, L('names.pad'), L('tag.pad'), L('state.pad'), false, 'settings');
      /* the rest of tonight (spec 12): a torn to-do list; pressed, the things to do (js/ui/evening.js). Lit while an
         evening has hours left to spend (user 2026-11-22: "it should be an icon on the desk like everything else") */
      var eve = v.tonight && v.tonight.left > 0 && v.lamp && v.lamp.key === 'night' && !!SB.UI.evening;
      add('tonight', BOX.tonight, L('names.tonight'), L(eve ? 'tag.tonight' : 'tag.tonightOff'),
          eve ? L('state.tonight', { left: SB.Clock && SB.Clock.cost ? String(SB.Clock.cost(v.tonight.left)).toUpperCase() : v.tonight.left + 'H' }) : '', eve, null);
      /* the jean jacket on the back of the chair (09 section 4): its patches and buttons */
      var worn = jacketItems(s0(v)).length;
      add('jacket', BOX.jacket, L('names.jacket'), worn ? L('tag.jacket', { n: worn }) : L('tag.jacketNone'), worn ? L('state.jacket', { n: worn }) : L('state.jacketNone'), false, 'jacket');
      return fit(quiet(ladder(list, s0(v))));
    }

    /* what the clock slip under the deck says, for the deck's name: ". tonight, 2½ of 4 hrs left. thursday: ..." */
    function clockSay(v) {
      var t = v.tonight, out = '';
      if (!t || !SB.Clock || v.st.phase !== 'PLAY') return '';
      out = '. ' + SB.Clock.line(t).toLowerCase();
      if (v.crunch.length) out += '. ' + SB.Clock.crunchLine(v.crunch[0], { today: t.day }).toLowerCase();
      return out;
    }

    /* the second strip says what the drawing does not: drop it where the thing already shows it (the map's town, the
       envelope's total, "nothing booked" on the empty set list...), unless it is the hot one that needs you */
    function quiet(list) {
      var SAYS = { drawer: 1, map: 1, notebook: 1, tin: 1, flyers: 1, paper: 1, clips: 1 };
      list.forEach(function (o) { if (SAYS[o.id] && !o.hot && !/^(NEW|NEW PAGE)$/.test(o.state)) o.state = ''; });
      return list;
    }

    /* A guided start fills the desk in show by show (SB.Rungs): what is not out yet is left off the table, and what
     * just came out says NEW and wears the hot ink until it is picked up. */
    function ladder(list, s) {
      if (!s || !SB.Rungs) return list;
      return list.filter(function (o) { return SB.Rungs.onDesk(s, o.id); }).map(function (o) {
        if (!SB.Rungs.isNew(s, o.id)) return o;
        o.state = L('state.new'); o.tag = L('tag.new', { what: o.tag }); o.hot = true;
        return o;
      });
    }

    /* the jacket: what is sewn or pinned on it (earned only), in the words of SB.Content.story.patches */
    function s0(v) { return v && v.s ? v.s : (SB.UI.game ? SB.UI.game() : null); }
    function jacketItems(s) {
      var names = (SB.Content.story && SB.Content.story.patches) || {};
      return safe(function () { return SB.Patches.all(s); }, []).filter(function (p) { return p.earned; }).map(function (p) {
        return { id: p.id, name: (names[p.id] && names[p.id].name) || p.id.replace(/_/g, ' '), kind: p.kind, earned: true, hidden: false };
      });
    }
    /* drawn by SB.Scenes.jacket (the art kit's own copier grit) onto a canvas in the object's live layer */
    function drawJacket(p, o, s) {
      var items = jacketItems(s).slice(-6), key = items.map(function (i) { return i.id; }).join(',') + '|' + (stage ? stage.clientWidth : 0) + '|' + (o.disp ? o.disp.scale.toFixed(2) : 1), cv, vb = vbOf(o.box), sc;
      if (p.jacketKey === key || !SB.Scenes || !SB.Scenes.jacket) return;
      p.jacketKey = key;
      cv = canvasEl('dk-jacket');
      if (!cv) return;
      sc = Math.max(1, Math.min(3, ((stage && stage.clientWidth) || W) / W * 2 * (o.disp ? o.disp.scale : 1)));
      cv.width = Math.round(o.box[2] * sc * 1.6); cv.height = Math.round(o.box[3] * sc * 1.6);
      cv.style.left = pct(M, vb[2]); cv.style.top = pct(M, vb[3]); cv.style.width = pct(o.box[2], vb[2]); cv.style.height = pct(o.box[3], vb[3]);
      try { SB.Scenes.jacket(cv, items, { seed: String(s && s.seed || '') }); } catch (e) { SB.log('warn', 'SB.Desk', 'jacket: ' + (e && e.message)); }
      SB.UI.clear(p.live);
      p.live.appendChild(cv);
      p.obj.classList.add('is-copied');
    }

    function layerHtml(id, v, s, b) {
      if (/^clip\d$/.test(id)) { var i = +id.slice(4); return drawClip(v, b, clipShows(v)[i], i); }
      switch (id) {
        case 'clips': return drawClip(v, b, null, 0);
        case 'calendar': return drawCalendar(v, b);
        case 'lamp': return drawLamp(v, b);
        case 'mug': return drawMug(v, b);
        case 'paper': return drawPaper(v, s, b);
        case 'notebook': return drawNotebook(v, b);
        case 'flyers': return drawFlyers(v, s, b);
        case 'map': return drawMap(v, b);
        case 'keys': return drawKeys(v, b);
        case 'phone': return drawPhone(v, b);
        case 'stickers': return drawStickers(v, b);
        case 'book': return drawBook(v, b);
        case 'tin': return drawTin(v, b);
        case 'drawer': return drawDrawer(v, b);
        case 'pad': return drawPad(v, b);
        case 'tonight': return drawTonight(v, b);
        default: return '';
      }
    }

    /* What each drawing depends on: when its key is unchanged it is not redrawn or recopied. */
    function layerKey(id, v) {
      var st = v.st, sh;
      if (/^clip\d$/.test(id)) { sh = clipShows(v)[+id.slice(4)]; return sh ? sh.id + sh.status + (sh.day - v.today) + JSON.stringify(v.specs[sh.id] ? [v.specs[sh.id].billing, v.specs[sh.id].room] : null) : ''; }
      switch (id) {
        case 'table': case 'drawer': case 'clips': return v.seed;
        case 'calendar': return [st.from, st.week, st.phase, v.cursor.dayIdx, v.allShows.map(function (x) { return x.day; }).join(','), v.wk && v.wk.days ? v.wk.days.map(function (d) { return (d.other || []).length + (d.forecast || ''); }).join('') : ''].join('|');
        case 'flyers': return [v.flyered.map(function (x) { return x.id + JSON.stringify(x.flyer || null); }).join(','), v.binder.length, v.wall.length].join('|');
        case 'map': return v.cityName + (v.pack.points || []).length;
        case 'keys': return [v.rooms.map(function (r) { return r.id; }).join(','), v.held.map(function (x) { return x.roomId + x.day; }).join(',')].join('|');
        case 'paper': sh = nextShow(v); return sh ? sh.id + (sh.promo && sh.promo.flyer ? 'f' : '') + JSON.stringify(sh.flyer || null) + sh.day + JSON.stringify(v.specs[sh.id] ? v.specs[sh.id].billing : null) : 'none';
        case 'book': return v.circleList.map(function (p) { return p && p.id; }).join(',');
        case 'mug': return String(Math.floor((st.stress ? st.stress.value : 0) / 11));
        case 'phone': return [v.needs, st.from, v.cursor.dayIdx].join('|');
        case 'notebook': return learnedKey(v) + '|' + seenLearned;
        case 'stickers': return v.bands.slice(0, 3).map(function (b) { return b.id; }).join(',');
        case 'tin': return [st.fund, st.bank, v.moneyEarly ? 'e' : '', v.today, v.due ? v.due.day + ':' + v.due.amount : ''].join('|');
        case 'lamp': return [deckDown(v), st.week, st.from].join('|');
        default: return '';
      }
    }

    /* ---------------------------------------------------------------- */
    /* DOM and the copier                                               */
    /* ---------------------------------------------------------------- */

    function h(t, a, c) { return SB.UI.h(t, a, c); }
    function canvasEl(cls) {
      var c = typeof document !== 'undefined' && document.createElement ? document.createElement('canvas') : null;
      if (c) { c.className = cls; c.setAttribute('aria-hidden', 'true'); }
      return c;
    }
    function svgDoc(vb, body) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb.join(' ') + '" width="' + f(vb[2]) + '" height="' + f(vb[3]) + '" preserveAspectRatio="xMidYMid meet" focusable="false">' + K().defs() + body + '</svg>';
    }
    function vbOf(box) { return [box[0] - M, box[1] - M, box[2] + 2 * M, box[3] + 2 * M]; }

    function build(container) {
      host = container;
      SB.UI.clear(host);
      bgArt = h('div', { class: 'dk-art', aria: { hidden: 'true' } });
      bgCv = canvasEl('dk-copy');
      hits = h('div', { class: 'dk-hits', role: 'group', aria: { label: L('title') } });
      stage = h('div', { class: 'dk-stage' }, bgCv ? [bgArt, bgCv, hits] : [bgArt, hits]);
      host.appendChild(stage);
      memo = {}; built = {}; hitKey = '';
      if (!resizeOn && typeof window !== 'undefined' && window.addEventListener) {
        resizeOn = true;
        window.addEventListener('resize', function () {
          if (resizeT) clearTimeout(resizeT);
          resizeT = setTimeout(function () { sizeUnit(); memo = {}; if (lastV && SB.UI.game()) render(SB.UI.game(), { closeup: !!(document.body && document.body.classList.contains('is-closeup')) }); }, 180);
        });
      }
    }
    function sizeUnit() { if (stage && stage.style && stage.style.setProperty) stage.style.setProperty('--u', ((stage.clientWidth || W) / W) + 'px'); }

    /* draw svg onto canvas cv at the stage's scale, run the copier and the lamp; vb is the drawing's place on the desk */
    function raster(key, cv, svg, vb, seed, done, disp) {
      var gen, url, im, cw, ch, scale, wd, pxu;
      if (!cv || !stage || typeof Image === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) return;
      wd = stage.clientWidth || 0;
      if (wd < 10) return;
      disp = disp || { x0: vb[0], y0: vb[1], scale: 1 };
      pxu = wd / W * Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1);   // canvas px per desk unit
      scale = pxu * disp.scale;                                                                     // canvas px per drawing unit
      cw = Math.max(2, Math.round(vb[2] * scale)); ch = Math.max(2, Math.round(vb[3] * scale));
      gen = gens[key] = (gens[key] || 0) + 1;
      try { url = URL.createObjectURL(new Blob([SB.Finish && SB.Finish.withFonts ? SB.Finish.withFonts(svg) : svg], { type: 'image/svg+xml' })); } catch (e) { return; }
      im = new Image();
      im.onload = function () {
        var off = null;
        /* copied on a canvas of its own, a slice at a time (SB.DeskKit.photocopyAsync), and put on the desk when done */
        function show() {
          var ctx, g, lx, ly;
          try {
            if (gen !== gens[key]) return;
            if (cv.width !== cw) cv.width = cw;
            if (cv.height !== ch) cv.height = ch;
            ctx = cv.getContext('2d');
            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(off.cv, 0, 0);
            lx = (LIGHT.x - disp.x0) * pxu; ly = (LIGHT.y - disp.y0) * pxu;
            g = ctx.createRadialGradient(lx, ly, H * 0.3 * pxu, lx, ly, H * 1.02 * pxu);
            g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.7, 'rgba(0,0,0,0.12)'); g.addColorStop(1, 'rgba(0,0,0,0.5)');
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch);
            ctx.globalCompositeOperation = 'source-over';
            if (done) done();
          } catch (e) { SB.log('warn', 'SB.Desk', 'copier: ' + (e && e.message)); }
        }
        try {
          if (gen !== gens[key]) return;
          off = K().copyCanvas(cw, ch);
          off.ctx.drawImage(im, 0, 0, cw, ch);
        } catch (e) { off = null; SB.log('warn', 'SB.Desk', 'copier: ' + (e && e.message)); }
        finally { URL.revokeObjectURL(url); }
        if (!off) return;
        /* the table is not put through the copier (it would crush its lit wood to toner black): it carries its own speckle */
        if (key === 'table') show(); else K().photocopyAsync(off.ctx, cw, ch, seed, { px: pxu, floor: 0 }, show);
      };
      im.onerror = function () { URL.revokeObjectURL(url); };
      im.src = url;
    }

    function hexA(hex, a) { var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex || ''); return m ? 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',' + a + ')' : 'rgba(255,232,0,' + a + ')'; }
    function pct(n, of) { return (n / of * 100) + '%'; }
    function makeButton(o) {
      var vb = vbOf(o.box), art = h('div', { class: 'dk-ink', aria: { hidden: 'true' } }), cv = canvasEl('dk-cut'), live = h('div', { class: 'dk-live', aria: { hidden: 'true' } }),
          name = h('span', { class: 'dk-strip', text: o.strip }), state = h('span', { class: 'dk-state' }),
          strips = h('span', { class: 'dk-strips', aria: { hidden: 'true' } }, [name, state]),
          obj = h('span', { class: 'dk-obj' }, cv ? [art, cv, live, strips] : [art, live, strips]),
          pad = h('span', { class: 'dk-pad', aria: { hidden: 'true' } }),
          b = h('button', { type: 'button', class: 'dk-hit ' + (o.cls || ''), data: { obj: o.id }, on: { click: function () { open(o.id); } } }, [pad, obj]);
      pad.style.left = pct(M, vb[2]); pad.style.top = pct(M, vb[3]); pad.style.width = pct(o.box[2], vb[2]); pad.style.height = pct(o.box[3], vb[3]);
      put(b, o);
      strips.style.left = pct(M - 12, vb[2]); strips.style.top = pct(M - 27, vb[3]);
      built[o.id] = { b: b, art: art, cv: cv, live: live, state: state, obj: obj };
      return b;
    }
    /* where a thing sits and how big it is shown (fit): its button covers its drawing box, scaled */
    function put(b, o) {
      var vb = vbOf(o.box), d = o.disp || { x0: vb[0], y0: vb[1], scale: 1, rot: o.box[4] || 0 }, obj = b.querySelector ? b.querySelector('.dk-obj') : null;
      b.style.left = pct(d.x0, W); b.style.top = pct(d.y0, H); b.style.width = pct(vb[2] * d.scale, W); b.style.height = pct(vb[3] * d.scale, H);
      if (obj && obj.style && obj.style.setProperty) obj.style.setProperty('--r', (d.rot || 0) + 'deg');
    }

    var current = [];
    function placeHits(list, v, s) {
      var key = list.map(function (o) { return o.id; }).join(','), focusId = null, act;
      if (key !== hitKey) {
        act = typeof document !== 'undefined' ? document.activeElement : null;
        if (act && act.getAttribute && hits.contains && hits.contains(act)) focusId = act.getAttribute('data-obj');
        SB.UI.clear(hits); built = {}; memo = {};
        list.forEach(function (o) { hits.appendChild(makeButton(o)); });
        hitKey = key;
        if (focusId) { var again = hits.querySelector('[data-obj="' + focusId + '"]'); if (again && again.focus) { try { again.focus(); } catch (e) { /* fine */ } } }
      }
      current = list;
      list.forEach(function (o) {
        var p = built[o.id], k2, svg, vb;
        if (!p) return;
        p.b.setAttribute('aria-label', o.name + (o.tag ? ': ' + o.tag : ''));
        k2 = SB.Content.ui.desk && SB.Content.ui.desk.tip ? SB.Content.ui.desk.tip[/^clip\d/.test(o.id) ? 'clip' : o.id] : '';
        p.b.setAttribute('data-tip-head', o.name);
        p.b.setAttribute('data-tip', (o.tag ? o.tag.charAt(0).toUpperCase() + o.tag.slice(1) + '.' : '') + (k2 ? '\n' + k2 : ''));
        k2 = undefined;
        if (p.state.textContent !== o.state) p.state.textContent = o.state;
        p.state.hidden = !o.state;
        p.b.classList.toggle('is-hot', o.hot);
        p.b.hidden = !!o.hidden;
        if (p.b.style && p.b.style.setProperty) p.b.style.setProperty('--hl', hexA(v.hot, 0.72));
        put(p.b, o);
        k2 = layerKey(o.id, v) + '|' + o.box.join(',') + '|' + (o.disp ? o.disp.scale.toFixed(3) + ',' + Math.round(o.disp.x0) + ',' + Math.round(o.disp.y0) : '');
        if (memo[o.id] !== k2) {
          memo[o.id] = k2;
          vb = vbOf(o.box);
          svg = svgDoc(vb, layerHtml(o.id, v, s, o.box));
          p.art.innerHTML = svg;
          p.obj.classList.remove('is-copied');
          raster(o.id, p.cv, svg, vb, v.seed + o.id, (function (obj) { return function () { obj.classList.add('is-copied'); }; })(p.obj), o.disp);
        }
        if (o.id === 'lamp') drawLive(p, v, o);
        if (o.id === 'jacket') drawJacket(p, o, s);
        if (o.id === 'phone') p.live.innerHTML = v.needs > 0 ? '<svg viewBox="' + vbOf(o.box).join(' ') + '"><rect class="dk-glow" x="' + (o.box[0] + 12) + '" y="' + (o.box[1] + 36) + '" width="' + (o.box[2] - 24) + '" height="' + (o.box[3] - 84) + '" fill="#fffbe0" fill-opacity=".16"/></svg>' : '';
      });
    }
    function drawLive(p, v, o) {
      var out = '';
      if (v.playing) reels(o.box).forEach(function (q) {
        out += '<g class="dk-reel" style="transform-origin:' + q[0] + 'px ' + q[1] + 'px"><circle cx="' + q[0] + '" cy="' + q[1] + '" r="8" fill="' + PAPER + '"/>' +
               [0, 60, 120].map(function (a) { return '<path d="M' + q[0] + ' ' + (q[1] - 13) + 'V' + (q[1] + 13) + '" stroke="' + T + '" stroke-width="3" transform="rotate(' + a + ' ' + q[0] + ' ' + q[1] + ')"/>'; }).join('') + '</g>';
      });
      p.live.innerHTML = out ? '<svg viewBox="' + vbOf(o.box).join(' ') + '">' + out + '</svg>' : '';
    }


    /* ---------------------------------------------------------------- */
    /* render                                                           */
    /* ---------------------------------------------------------------- */

    /** render(state, info): draw the desk for this state into #desk (info: { closeup: bool, full: bool }). */
    function render(s, info) {
      var el = typeof document !== 'undefined' && document.getElementById ? document.getElementById('desk') : null, v, k2, svg, tb;
      if (!el) return;
      if (!s || (info && info.full)) { el.hidden = true; topBar(false); return; }
      el.hidden = false;
      if (host !== el || !stage) build(el);
      sizeUnit();
      v = gather(s);
      tb = bleed();
      k2 = layerKey('table', v) + '|' + (stage.clientWidth || 0) + '|' + tb.join(',');
      if (memo.table !== k2) {
        memo.table = k2;
        svg = svgDoc(tb, drawTable(v, tb));
        bgArt.innerHTML = svg;
        [bgArt, bgCv].forEach(function (e) {
          if (!e || !e.style) return;
          e.style.left = pct(tb[0], W); e.style.top = pct(tb[1], H); e.style.width = pct(tb[2], W); e.style.height = pct(tb[3], H);
        });
        raster('table', bgCv, svg, tb, v.seed + 'table', function () { stage.classList.add('is-copied'); });
      }
      lastV = v;
      placeHits(objects(v), v, s);
      el.classList.toggle('is-playing', !!v.playing);
      el.classList.toggle('is-under', !!(info && info.closeup));
      if (hits) { if (info && info.closeup) hits.setAttribute('inert', ''); else hits.removeAttribute('inert'); }
      topBar(!!(info && info.closeup));
    }

    /* The top bar (0.9): while a close-up covers the desk, the phone, the show and the next flyer stay one press away in a
     * strip above every page, so nobody goes back to the desk to find the phone. Pressing one opens its close-up in place. */
    var barEl = null, barKey = '';
    function topBar(on) {
      var d = typeof document !== 'undefined' ? document : null, ids = ['phone', 'clips', 'clip0', 'clip', 'paper'], list = [], here, k, seen = {};
      if (!d || !d.body) return;
      if (!on) { if (barEl && barEl.parentNode) barEl.parentNode.removeChild(barEl); barEl = null; barKey = ''; return; }
      here = SB.UI.route ? SB.UI.route() : null;
      current.forEach(function (o) {
        if (ids.indexOf(o.id) < 0 || o.hidden || !o.route || o.route === here || seen[o.route + (o.id === 'phone' ? 'p' : '')]) return;
        seen[o.route + (o.id === 'phone' ? 'p' : '')] = 1;
        list.push(o);
      });
      list = list.slice(0, 3);
      k = here + '|' + list.map(function (o) { return o.id + ':' + (o.tag || '') + ':' + (o.state || ''); }).join(',');
      if (barEl && barKey === k && barEl.isConnected !== false) return;
      barKey = k;
      if (barEl && barEl.parentNode) barEl.parentNode.removeChild(barEl);
      if (!list.length) { barEl = null; return; }
      barEl = h('nav', { class: 'dk-bar', aria: { label: 'Desk shortcuts' },
                         style: { position: 'fixed', top: '0', right: '0', zIndex: '40', display: 'flex', gap: '6px', padding: '6px 8px', background: 'rgba(14,14,15,.9)' } },
        list.map(function (o) {
          return h('button', { type: 'button', class: 'dk-bar-b pz-hl' + (o.hot ? ' is-hot' : ''), data: { fk: 'bar-' + o.id },
                               aria: { label: o.name + (o.tag ? ': ' + o.tag : ''), keyshortcuts: o.id === 'phone' ? 'P' : null },
                               text: (o.id === 'phone' && o.state ? o.name + ' ' + o.state : o.name),
                               on: { click: function () { SB.UI.go(o.route, o.params); } } });
        }));
      /* first in the document, so it is the first Tab stop on every page (keyboard play, 0.9), not the last after the whole page */
      if (d.body.firstChild) d.body.insertBefore(barEl, d.body.firstChild); else d.body.appendChild(barEl);
    }

    /** open(id): pick up a thing on the desk: its route opens as a close-up, the tape deck plays the night out (at an
     *  evening it points at the pinned clock, the one place a night is called), the coffee answers. */
    function open(id) {
      var o = null, i;
      for (i = 0; i < current.length; i++) if (current[i].id === id) o = current[i];
      if (!o) return;
      if (SB.Rungs && SB.UI.game && SB.UI.game() && SB.Rungs.isNew(SB.UI.game(), id)) SB.UI.act(function (st) { SB.Rungs.opened(st, id); });
      if (id === 'notebook') { seenLearned = lastLearned; memo.notebook = null; }
      if (id === 'lamp') {
        if (SB.UI.lamp && (SB.UI.lamp.label() || {}).key === 'night') { if (SB.NightClock) SB.NightClock.nudge(); }
        else if (SB.UI.lamp) SB.UI.lamp.pull();
        return;
      }
      if (id === 'mug') { if (SB.DeskCloseup) SB.DeskCloseup.stress(); return; }
      if (id === 'tonight') { if (SB.UI.evening) SB.UI.evening.open(); return; }
      if (o.route) SB.UI.go(o.route, o.params);
    }

    /* The 'desk' route: nothing in #main but a hidden week screen, so the play loop runs while you sit here. */
    SB.UI.screen('desk', { rail: null, title: 'ui.desk.title', full: false, desk: true, mount: function (root) {
      var box = h('div', { class: 'dk-loop', hidden: true, aria: { hidden: 'true' } }), hooks = null;
      root.appendChild(box);
      if (SB.UI.screens.week) {
        try { hooks = SB.UI.screens.week.mount(box, {}) || null; } catch (e) { SB.log('warn', 'SB.Desk', 'loop host: ' + (e && e.message)); hooks = null; }
      }
      return {
        update: function () { if (hooks && hooks.update) hooks.update(); },
        unmount: function () { if (hooks && hooks.unmount) hooks.unmount(); hooks = null; }
      };
    } });

    return { render: render, open: open, objects: function () { return current.slice(); } };
  });
})(SB);
