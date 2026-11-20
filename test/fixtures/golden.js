'use strict';
// test/fixtures/golden.js — the golden show of mechanics 1.13 and the accounts of 8.1, built by hand as a full game state
// (shapes from 01-state, never from an engine file) with its hidden truths. model.test, forecast.test, settle.test and
// leak.test use it.  Everything the player could not know is under `hid` or in `state.truth`.
//
//   const g = require('./fixtures/golden.js');
//   const f = g.build(SB, { notebook: true });          // SB loaded with the Pensacola pack
//   f.state, f.show (= state.shows.sX), f.ids, f.EXPECT
//   f.variant('promo14')                                 // a deep copy of f with one thing changed (g.VARIANTS lists them)
//   f.withLuck()                                         // stores the worked example's one labelled luck draw on show.night
//
// The player is in their second year: Name 31, 420 followers, 60 regulars (16 / 34 / 10, mostly hardcore), a mailing list.
// The room is the pack's lodge hall (cap 160, all ages, $225, PA .8); the sound person is skilled .9 so sound = .85.
// Opener (local emo, nineteen-year-olds, 610 followers, really worth 14); the touring crust band (4,900 followers, worth 22
// here); the closer (local hardcore, four years old, 1,430 followers, worth 46). Thursday in mid-October, clear, the first
// cool evening of the fall (+5 percent). Door $10. Deal: $150 guaranteed plus half of what is left; $20 gas for the opener,
// $60 to the closer.
// `live` values are calibrated so the 1.9 energy formula (sound .85, the room liking each band about .9) lands on the
// worked example's set energies (.59, .75, .69); the example does not state them.

const SHOW_DAY_YMD = [2028, 10, 12];       // a Thursday (checked in build)

const EXPECT = {
  heads: 100, headsTol: 4, byGen: [23, 66, 11], byGenTol: 3, q: 69, qTol: 2, door: 910, doorTol: 40,
  par: 87, parTol: 4, parQ: 64,
  call: [70, 108], beat: .18, posts: 28,
  accounts: { door: 910, hall: 225, sound: 60, guarantee: 150, locals: 80, left: 395, touringShare: 197, playerCosts: 56, playerHand: 142 },   // the player works the door: nobody is paid for it
  // mechanics 1.13 "what the same show would have done otherwise": heads (and where given kids/middle/old, in-room for the touring set, q, door)
  rows: {
    promo14:   { heads: 76,  byGen: [18, 49, 8],  q: 62, door: 670 },
    promo8:    { heads: 42,  byGen: [12, 27, 4],  q: 46, door: 330 },
    noRuns:    { heads: 90 },
    noShares:  { heads: 87 },
    noPush:    { heads: 93 },
    noListings:{ heads: 95 },
    friday:    { heads: 126, byGen: [36, 76, 15], q: 76, door: 1170 },
    tuesday:   { heads: 70,  byGen: [18, 45, 7],  q: 60, door: 610 },
    door5:     { heads: 109, byGen: [32, 67, 11], q: 72, door: 500 },
    door15:    { heads: 68,  byGen: [12, 47, 9],  q: 59, door: 880 },
    barRoom:   { heads: 88,  byGen: [0, 75, 13],  q: 80, door: 790 },
    touringLast: { heads: 100, q: 66 },
    rain:      { heads: 86,  q: 65, door: 770 },
    oldHeadOpener: { heads: 106, byGen: [18, 68, 21], q: 71 }
  },
  rowTol: .06
};

/* ---------------- builders ---------------- */

function clone(x) { return JSON.parse(JSON.stringify(x)); }

function popFor(SB, pack, z) {
  // people per (generation, genre) for a zone: scene x generation shares x genre shares (lean x1.5 renormalised); no jitter
  const E = SB.Enums, scene = z.kind === 'CITY' ? pack.scene.size : (z.scene || 40);
  const gens = z.gens || pack.scene.gens, shares = pack.scene.genreShares;
  return [0, 1, 2].map(g => {
    let row = shares[g].slice();
    if (z.lean && z.lean.length) {
      row = row.map((v, s) => v * (z.lean.indexOf(E.GENRES[s]) >= 0 ? SB.Config.CITY.TUNE.lean : 1));
      const t = row.reduce((a, b) => a + b, 0); row = row.map(v => v / t);
    }
    return row.map(v => scene * gens[g] * v);
  });
}

function person(id, first, born, roles, extra) {
  return Object.assign({
    id: id, first: first, last: 'Fixture', nick: null, born: born, gen: born >= 2007 ? 0 : (born >= 1992 ? 1 : 2), zoneId: 'city', place: null,
    state: 'ACTIVE', roles: roles, bands: [], pastBands: [], instrument: null, rel: 50, relLog: [], met: 0,
    taste: { loves: [], wont: null }, wants: 'CASH', rate: 30, favors: 0, jobs: 6, last: ['DONE', 'DONE'], asked: 0,
    ownerOf: null, ownerKind: null, regularType: null, originShowId: null, listed: null,
    hid: { reliability: 1, skill: {}, harm: false }
  }, extra || {});
}

function band(id, name, local, genre, o) {
  return {
    id: id, name: name, local: local, zoneId: local ? 'city' : null,
    place: local ? null : { slug: 'richmond-va', name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    genre: genre, genre2: null, formedYear: o.formed, stage: o.stage || 'ESTABLISHED', motive: 'GROW',
    members: o.members.map((pid, i) => ({ personId: pid, instrument: ['GUITAR', 'BASS', 'DRUMS', 'VOX'][i % 4], since: -150, founder: i < 2 })),
    past: [], contactId: o.members[0], followers: o.followers, tierPublic: o.tier, ask: o.ask || null,
    trust: { base: o.trust === undefined ? 60 : o.trust, events: [] }, knows: { motive: false, needs: [], promotes: null },
    plays: [], shows: [], outUntil: null, playedOutUntil: null, endedWeek: null, history: [], circle: [], visits: [], spread: null,
    hid: {
      draw: { city: o.draw }, drawPeak: o.draw, buzz: 0, cross: o.cross, live: o.live, rel: .8, promo: o.promo, honest: .9, cohesion: .7,
      needs: ['PAID', 'SLOT'], freeRate: 1, conversion: 1, oversell: 1, knownHere: 1, tells: [], floor: 0
    }
  };
}

function build(SB, opts) {
  opts = opts || {};
  const E = SB.Enums, C = SB.Config;
  const DAY = SB.time.dayOf(SHOW_DAY_YMD[0], SHOW_DAY_YMD[1], SHOW_DAY_YMD[2]);
  if (SB.time.dow(DAY) !== 3) SB.fail('golden', 'the show day is not a Thursday');
  const week = SB.time.week(DAY);

  const state = {
    v: SB.SAVE_VERSION, seed: 'golden-1', citySlug: 'pensacola',
    settings: { bills: true, fog: 'NORMAL', windows: 'NORMAL', pauseOnReplies: true, noText: true }, tune: null,
    rng: SB.rng.init(), ids: { b: 10, p: 40, r: 20, s: 1, j: 100, o: 5 }, flags: { sawConfirmLine: true },
    clock: { day: DAY - 3, week: week, phase: 'PLAY', cursor: { dayIdx: 3, half: 'NIGHT' }, opened: DAY - 1, done: 0, sent: DAY - 1, stop: null, pending: [] },
    player: {
      bookingName: 'Carport Weather', mark: { v: 1, treatment: 'block', emblem: 'star', frame: 'box', seed: 'cw' },
      houseStyle: { templates: {}, inks: {}, papers: {}, treatments: {} },
      name: 31, nameLine: [31], followers: 420, stage: 2, stress: 20, stressLog: [], dayJob: 'FULL', dayJobNext: null, shiftDrops: 0,
      couch: false, strikes: 0, burnoutUntil: null, houseRules: true, mailingList: 40, showsPlayed: 14, lastShowWeek: week - 3,
      recentGenres: [['hardcore'], ['hardcore', 'metal'], ['emo', 'hardcore']],
      focus: { value: .31, kind: 'BETWEEN', genres: ['hardcore'] }, usual: { sound: 'p41', security: null, floor: null }
    },
    money: { fund: 0, bank: 400, ledger: [], overdraftMonths: 0, loans: [], billsMonth: { y: 2028, m: 10 }, lateFee: 0 },
    town: { word: 35, wordBase: 30, wordLine: [], forecast: {}, allAges: { 2028: 3 }, kidsLine: [], signs: [] },
    zones: {}, regulars: null, truth: null,
    notebook: { est: {}, causes: {}, notes: [], terms: {}, calls: [], tells: {} },
    bands: {}, people: {}, rooms: {}, bookers: {}, contacts: {}, requests: {}, shows: {}, otherShows: [], jobs: {}, asks: {}, mail: { messages: [] }, tours: {},
    week: { n: week, shifts: [true, true, true, true, true, false, false], dropped: [], cap: [], used: [], plan: [], phoneOff: [], log: [], logN: 0, shows: [], report: null },
    director: { queue: [], followups: [], used: {}, lastHardWeek: null, quietWeek: null, opening: null },
    harm: { open: null, lastWeek: null, nextWeek: 40, closed: [] },
    legacy: { records: {}, wall: [], firsts: [], bandsFromShows: [], roomsKept: [], years: [], offers: [], ended: null }
  };
  for (let i = 0; i < 7; i++) { state.week.cap.push({ DAY: 1, NIGHT: 2 }); state.week.used.push({ DAY: 0, NIGHT: 0 }); }

  const pack = SB.Cities.pack(state);

  /* zones from the pack (no jitter) */
  pack.zones.forEach(z => {
    state.zones[z.id] = { id: z.id, kind: z.kind, name: z.name, minutes: z.minutes || 0, pop: popFor(SB, pack, z), tourBoostUntil: null };
  });
  state.regulars = {
    by: {}, total: 60, faces: [], lastBadWeek: null, priceyRun: 0, line: []
  };
  pack.zones.forEach(z => { state.regulars.by[z.id] = [0, 1, 2].map(() => new Array(12).fill(0)); });
  const gi = SB.Enums.GENRE_INDEX;
  [['hardcore', 10], ['emo', 3], ['pop-punk', 3]].forEach(p => { state.regulars.by.city[0][gi[p[0]]] = p[1]; });
  [['hardcore', 22], ['crust', 4], ['metal', 4], ['emo', 4]].forEach(p => { state.regulars.by.city[1][gi[p[0]]] = p[1]; });
  [['hardcore', 6], ['metal', 2], ['crust', 2]].forEach(p => { state.regulars.by.city[2][gi[p[0]]] = p[1]; });

  /* the hidden truths of the town */
  const chan = {}; ['ANNOUNCE', 'LISTINGS', 'WOM', 'SHARE', 'ROOM', 'MAIL'].forEach(k => { chan[k] = [1, 1, 1]; });
  pack.routes.forEach(r => { chan['RUN:' + r.id] = [1, 1, 1]; });
  const heat = {}, heatLine = {}; E.GENRES.forEach(g => { heat[g] = 0; heatLine[g] = [0]; });
  state.truth = { quirks: [], nightQuirks: [], chan: chan, comfort: [7, 10, 12], zoneMul: {}, heat: heat, heatLine: heatLine, waves: {}, pulses: [], parKnows: {}, weather: {} };
  state.truth.weather[DAY] = 'CLEAR'; state.town.forecast[DAY] = 'CLEAR';

  /* people */
  const P = {};
  function addP(p) { P[p.id] = p; state.people[p.id] = p; return p; }
  addP(person('p41', 'Sound', 1995, ['SOUND'], { rate: 60, hid: { reliability: 1, skill: { SOUND: .9 }, harm: false } }));
  addP(person('p42', 'Calm', 1990, ['SECURITY'], { rate: 100, hid: { reliability: 1, skill: { SECURITY: .9 }, harm: false } }));   // security, when a show needs it; not on s1 (a hall under C.SECURITY.hallCap)
  addP(person('p43', 'Owner', 1970, ['OWNER'], { ownerOf: 'r21', ownerKind: 'HALL_MANAGER', rel: 60 }));
  [['p50', 2008], ['p51', 2008], ['p52', 2009], ['p53', 2008]].forEach(a => addP(person(a[0], 'Opener' + a[0], a[1], ['MUSICIAN'], { bands: ['b11'] })));
  [['p54', 1996], ['p55', 1995], ['p56', 1993], ['p57', 1997]].forEach(a => addP(person(a[0], 'Touring' + a[0], a[1], ['MUSICIAN'], { bands: ['b12'], zoneId: null })));
  [['p58', 1995], ['p59', 1994], ['p60', 1996], ['p61', 1993]].forEach(a => addP(person(a[0], 'Closer' + a[0], a[1], ['MUSICIAN'], { bands: ['b13'] })));
  [['p62', 1968], ['p63', 1971], ['p64', 1969], ['p65', 1973]].forEach(a => addP(person(a[0], 'Veteran' + a[0], a[1], ['MUSICIAN'], { bands: ['b14'] })));
  [['p66', 1996], ['p67', 1995]].forEach(a => addP(person(a[0], 'Other' + a[0], a[1], ['MUSICIAN'], { bands: ['b15'] })));
  [['p68', 1996], ['p69', 1995]].forEach(a => addP(person(a[0], 'Other' + a[0], a[1], ['MUSICIAN'], { bands: ['b16'] })));
  [['p71', 1997], ['p72', 1996]].forEach(a => addP(person(a[0], 'Other' + a[0], a[1], ['MUSICIAN'], { bands: ['b17'] })));
  addP(person('p70', 'Booker', 1990, ['BOOKER'], {}));
  state.bookers.p70 = { id: 'p70', kind: 'GENRE', genres: ['ska', 'pop-punk'], homeRooms: ['r22'], name: 40, showsPerMonth: 2, style: { reliable: .9, pays: .8, promotes: .7 }, rel: 40, regulars: 60, chasing: null, active: true };

  /* bands (invented names) */
  const B = {
    // The three bands of the bill have no crossover: mechanics 1.13 lists the example's hidden truths (the three draws) and a
    // band's crossover is a hidden number (1.4), so each band draws on its plain age profile. With the public guess of .3 instead,
    // the Old heads come out at 16 where the example has 11.
    b11: band('b11', 'Slow Drain Summer', true, 'emo', { formed: 2027, members: ['p50', 'p51', 'p52', 'p53'], followers: 610, tier: 1, draw: 14, cross: 0, live: 60, promo: .9, trust: 55, ask: { pay: 'GAS', amount: 20 } }),
    b12: band('b12', 'Brine Ladder Hymn', false, 'crust', { formed: 2022, members: ['p54', 'p55', 'p56', 'p57'], followers: 4900, tier: 2, draw: 22, cross: 0, live: 92, promo: .3, trust: 50 }),
    b13: band('b13', 'Cinder Block Weather', true, 'hardcore', { formed: 2024, members: ['p58', 'p59', 'p60', 'p61'], followers: 1430, tier: 2, draw: 46, cross: 0, live: 80, promo: .8, trust: 65, ask: { pay: 'FLAT', amount: 60 } }),
    b14: band('b14', 'Veteran Street Gang Union', true, 'street-punk', { formed: 2012, members: ['p62', 'p63', 'p64', 'p65'], followers: 860, tier: 2, draw: 30, cross: .30, live: 80, promo: .7, trust: 60, ask: { pay: 'FLAT', amount: 40 } }),
    b15: band('b15', 'Pier Review Of Spring', true, 'ska', { formed: 2023, members: ['p66', 'p67'], followers: 900, tier: 2, draw: 40, cross: .3, live: 70, promo: .7 }),
    b16: band('b16', 'Plywood Partiers Local', true, 'pop-punk', { formed: 2023, members: ['p68', 'p69'], followers: 900, tier: 2, draw: 40, cross: .3, live: 70, promo: .7 }),
    // the hardcore band of the other booker's show nine days before (mechanics 1.13: "another booker's hardcore show, 70 people")
    b17: band('b17', 'Rebar Sermon Cadence', true, 'hardcore', { formed: 2025, members: ['p71', 'p72'], followers: 1100, tier: 2, draw: 38, cross: .3, live: 70, promo: .7 })
  };
  Object.keys(B).forEach(k => { state.bands[k] = B[k]; });
  B.b13.hid.draw.city = 46;

  /* the room: the pack's lodge hall */
  const pr = pack.rooms.filter(r => r.id === 'lodge')[0];
  state.rooms.r21 = {
    id: 'r21', packId: 'lodge', name: pr.name, kind: 'HALL', zoneId: 'city', hood: pr.hood, route: 'work-side', cap: 160, rent: 225, deposit: 100,
    soundFee: 0, houseCosts: 0, split: null, hostCut: 0, pa: .8, ages: ['ALL'], matinee: false, curfew: 1380, ac: true, outdoor: false, lowLying: false,
    seated: false, following: 0, sketch: 15, standing: [100, 100, 100] /* mechanics 1.13 works Can as night x room x price alone: roomRep is 1 */, ownerId: 'p43', ownerRel: 60, needs: [], notice: 28, open: true,
    openedWeek: null, closedWeek: null, closedWhy: null, incidents: [], cleanSince: 0, playerShows: 4, playerQ: [66, 70, 62, 68],
    calendar: {}, hid: { capReal: 160, genFit: [0, 0, 0], fit: 0, pressure: 30, leaseEnds: 500, flaky: 0 }
  };
  state.rooms.r21.calendar[DAY] = { state: 'CONFIRMED', holds: [{ by: 'player', state: 'CONFIRMED', since: week - 6, expires: null, showId: 's1' }] };
  state.rooms.r23 = {                                    // the bar back room of the "otherwise" table: 21 and over, 80, no rent
    id: 'r23', packId: 'cleat', name: 'the back room', kind: 'BAR', zoneId: 'city', hood: 'east-hill', route: 'hills', cap: 80, rent: 0, deposit: 0, soundFee: 50, houseCosts: 0,
    split: null, hostCut: 0, pa: .7, ages: ['A21'], matinee: true, curfew: 1560, ac: true, outdoor: false, lowLying: false, seated: false, following: .3, sketch: 20,
    standing: [100, 100, 100] /* as for the hall: the example's bar row is night x room x price alone (Middle 66 -> 75 is .827 / .725) */, ownerId: 'p43', ownerRel: 40, needs: [], notice: 28, open: true, openedWeek: null, closedWeek: null, closedWhy: null, incidents: [],
    cleanSince: 0, playerShows: 0, playerQ: [], calendar: {}, hid: { capReal: 80, genFit: [0, 0, 0], fit: 0, pressure: 30, leaseEnds: 500, flaky: 0 }
  };
  state.rooms.r22 = {                                    // the room of the other booker's show downtown
    id: 'r22', packId: 'club', name: 'the downtown room', kind: 'CLUB', zoneId: 'city', hood: 'downtown', route: 'downtown', cap: 300, rent: 0, deposit: 0, soundFee: 0, houseCosts: 150,
    split: .8, hostCut: 0, pa: .9, ages: ['A21', 'A18'], matinee: false, curfew: 1560, ac: true, outdoor: false, lowLying: false, seated: false, following: .6, sketch: 15,
    standing: [45, 70, 70], ownerId: 'p43', ownerRel: 30, needs: [], notice: 42, open: true, openedWeek: null, closedWeek: null, closedWhy: null, incidents: [], cleanSince: 0,
    playerShows: 0, playerQ: [], calendar: {}, hid: { capReal: 300, genFit: [0, 0, 0], fit: 0, pressure: 30, leaseEnds: 500, flaky: 0 }
  };
  state.rooms.r22.calendar[DAY] = { state: 'CONFIRMED', holds: [{ by: 'p70', state: 'CONFIRMED', since: week - 4, expires: null, showId: null }] };
  state.otherShows.push({ id: 'o1', bookerId: 'p70', roomId: 'r22', zoneId: 'city', day: DAY, slot: 'EVENING', bands: ['b15', 'b16'], genres: ['ska', 'pop-punk'],
    ages: 'A18', price: 10, status: 'CONFIRMED', heads: null, q: null, tier: 2, hostScore: null });
  // the hardcore show at which the player handed out flyers nine days before
  // Its bill is a hardcore band, as its genres say, so the nine-day-old load (mechanics 6.4) falls on the cells that went to it.
  state.otherShows.push({ id: 'o2', bookerId: 'p70', roomId: 'r22', zoneId: 'city', day: DAY - 9, slot: 'EVENING', bands: ['b17'], genres: ['hardcore'],
    ages: 'ALL', price: 8, status: 'PLAYED', heads: 70, q: 66, tier: 2, hostScore: .5 });

  /* the show */
  const D = DAY;
  state.shows.s1 = {
    id: 's1', status: 'CONFIRMED', requestId: null, origin: D - 40, day: D, slot: 'EVENING', roomId: 'r21', zoneId: 'city', label: 'NORMAL', tags: [], benefitFor: null,
    deal: { shape: 'GUARANTEE_PLUS', guarantee: 150, pct: .5, afterCosts: true, lodging: true, meal: false, written: true, agreedDay: D - 36 },
    bill: {
      slots: [
        { bandId: 'b11', role: 'LOCAL', minutes: 25, pay: 'GAS', fee: 20, askId: null, confirmed: true },
        { bandId: 'b12', role: 'TOURING', minutes: 30, pay: null, fee: 0, askId: null, confirmed: true },
        { bandId: 'b13', role: 'LOCAL', minutes: 20, pay: 'FLAT', fee: 60, askId: null, confirmed: true }
      ],
      billing: ['b12', 'b13', 'b11'], locked: true, lockedDay: D - 34, doors: 1240, times: [1285, 1320, 1360], ends: 1380
    },
    door: { price: 10, donation: false, suggested: null, ages: 'ALL', comps: 9, sheet: true, address: null },
    crew: { sound: 'p41', security: null, floor: null, lodging: 'player' }, insure: false,
    hold: null, confirmedDay: D - 35,
    promo: {
      announce: D - 30, announceHadFlyer: true, flyer: { day: D - 30, quality: 1.0, by: 'player', tba: false }, printed: D - 24, print: 'USUAL',
      runs: {
        'downtown': { day: D - 22, again: null, by: 'player', effect: 1 },
        'work-side': { day: D - 22, again: null, by: 'player', effect: 1 },
        'campus': { day: D - 22, again: null, by: 'player', effect: 1 }
      },
      listings: D - 20, mail: D - 28, push: D - 4, dayOf: true, paid: null, ad: null,
      shares: { b11: D - 26, b13: D - 27, b12: D - 20 },
      // mechanics 1.7: "the best affinity between that crowd and the bill". The other show is a hardcore show and the closer is a
      // hardcore band, so the best affinity is 1 (70 x .08 x 1 = 5.6 before Can; with the hour of invitations, the example's 9).
      handouts: [{ day: D - 9, otherShowId: 'o2', heads: 70, aff: 1 }], invites: [D - 14], roomPosted: false
    },
    prep: { advance: D - 21, gear: D - 21, neighbors: D - 30, dayBefore: D - 1, food: null, rules: null /* the worked example has no house-rules turnout (x 1.03) in its Can */, lodging: D - 25 },
    flyer: null, mods: {}, jobs: [], cancelled: null, night: null, result: null
  };
  // The request (mechanics 1.13): the tour is in Mobile on the Wednesday and Tallahassee on the Friday. Mechanics 6.3: "When the
  // worked example's tour plays Mobile on Wednesday, nobody from Mobile drives to the Thursday", so the route is part of the show.
  state.requests.q1 = {
    id: 'q1', kind: 'COLD', template: 'CAREFUL', bandId: 'b12', fromId: 'p54', day: D - 40, replyBy: D - 33, dates: [D],
    route: { prev: { name: 'Mobile', state: 'AL', minutes: 60, day: D - 1 }, next: { name: 'Tallahassee', state: 'FL', minutes: 200, day: D + 1 },
             stops: [{ day: D - 1, name: 'Mobile', state: 'AL' }, { day: D + 1, name: 'Tallahassee', state: 'FL' }] },
    ask: { shape: 'GUARANTEE', guarantee: 150, pct: 0, lodging: true, meal: false, members: 4 },
    statedDraw: null, referrerId: null, localAsk: null, status: 'ACCEPTED', offers: [], followups: 0, messageId: null, showId: 's1',
    vetted: {}, signals: [], shortNotice: false, hid: { raced: false, gone: null, wants: 'FLOOR' }
  };
  state.shows.s1.requestId = 'q1';
  state.week.shows = [];

  if (opts.notebook && SB.Notebook && SB.Notebook.init) SB.Notebook.init(state);

  const fx = { state: state, show: state.shows.s1, day: D, ids: { show: 's1', room: 'r21', opener: 'b11', touring: 'b12', closer: 'b13', other: 'b14', sound: 'p41', security: 'p42' }, EXPECT: EXPECT,
               lensOver: { stale: false } };
  fx.withLuck = function () {
    fx.show.night = { luck: [{ k: 'FINE_EVENING', mul: 1.05, gen: null, zones: null }], mods: {}, stops: [], at: null, par: null, call: null, emitted: 0, dispute: null, demand: null };
    return fx;
  };
  fx.variant = function (name) { return variant(SB, fx, name); };
  return fx;
}

/* ---------------- the "otherwise" table ---------------- */

const VARIANTS = ['promo14', 'promo8', 'noRuns', 'noShares', 'noPush', 'noListings', 'friday', 'tuesday', 'door5', 'door15', 'barRoom', 'touringLast', 'rain', 'oldHeadOpener'];

function copyFx(fx) {
  // The state is plain data, so a copy is a JSON round trip; the rng streams come with it.
  const state = JSON.parse(JSON.stringify(fx.state));
  const out = Object.assign({}, fx, { state: state, show: state.shows.s1 });
  return out;
}

/* Mechanics 3.5: "the worked example's show with everything started on the given day and done promptly after (flyer and announce
 * that day, bands sharing two days later, runs five days later, listings only if still open)". Only what that sentence names moves.
 * The listings go in on the first day while the deadline (12 days) is still ahead: 3.5 puts "the sharp drop between 14 and 10 days"
 * down to the deadline passing, so a show begun 14 days out still made them. The hour of direct invitations and the hand-out at the
 * other booker's show stay as the example has them (they are the floor of the table: about 9 heads in 100 with one day's notice);
 * an invitation cannot come before the announcement, so it is held to that day. */
function retime(v, daysOut) {
  const s = v.show, p = s.promo, D = s.day;
  p.flyer.day = D - daysOut; p.announce = D - daysOut;
  p.mail = D - daysOut + 2 < D ? D - daysOut + 2 : null; p.printed = Math.min(D, D - daysOut + 3);
  Object.keys(p.runs).forEach(k => { p.runs[k].day = Math.min(D, D - daysOut + 5); });
  p.listings = daysOut >= 12 ? D - daysOut : null;
  p.push = Math.min(D - 1, D - Math.min(daysOut, 4));
  Object.keys(p.shares).forEach(b => { p.shares[b] = Math.min(D, D - daysOut + 2); });
  p.invites = p.invites.map(d => Math.max(d, D - daysOut));
  return v;
}

function variant(SB, fx, name) {
  const v = copyFx(fx), s = v.show, D = fx.day, p = s.promo;
  switch (name) {
    case 'promo14': retime(v, 14); break;
    case 'promo8': retime(v, 8); break;
    case 'noRuns': p.runs = {}; break;
    case 'noShares': p.shares = {}; break;
    case 'noPush': p.push = null; break;
    case 'noListings': p.listings = null; break;
    case 'friday': case 'tuesday': {
      const nd = name === 'friday' ? D + 1 : D - 2;
      v.state.rooms.r21.calendar[nd] = v.state.rooms.r21.calendar[D]; delete v.state.rooms.r21.calendar[D];
      v.state.truth.weather[nd] = 'CLEAR'; v.state.town.forecast[nd] = 'CLEAR';
      // "Each line changes one thing": the night moves and every job keeps its lead time, so the promotion days move with it.
      // The example's Friday is the night-of-the-week table alone (Kids 23 -> 36 is 1.0 / .65); the pack's October calendar
      // (a football Friday) is another rule, so the variant asks for the lens override that leaves the calendar out.
      const dd = nd - D;
      s.day = nd; p.announce += dd; p.flyer.day += dd; p.printed += dd; p.listings += dd; p.mail += dd; p.push += dd;
      Object.keys(p.runs).forEach(k => { p.runs[k].day += dd; });
      Object.keys(p.shares).forEach(b => { p.shares[b] += dd; });
      p.invites = p.invites.map(d => d + dd); p.handouts.forEach(h => { h.day += dd; });
      v.state.otherShows.forEach(o => { if (o.id === 'o2') o.day += dd; });
      v.lensOver = { stale: false, noCalendar: true };
      break;
    }
    case 'door5': s.door.price = 5; break;
    case 'door15': s.door.price = 15; break;
    case 'barRoom': {
      const r = v.state.rooms.r23; r.calendar[D] = { state: 'CONFIRMED', holds: [{ by: 'player', state: 'CONFIRMED', since: 1, expires: null, showId: 's1' }] };
      s.roomId = 'r23'; s.door.ages = 'A21'; s.deal = Object.assign({}, s.deal);
      break;
    }
    case 'touringLast': {
      const sl = s.bill.slots, t = sl.splice(1, 1)[0]; sl.push(t);
      s.bill.billing = ['b12', 'b13', 'b11'];
      // the closer's twenty minutes now come second and the touring band's thirty last: the same changeover, the same end (11:00)
      s.bill.times = [1285, 1320, 1350];
      break;
    }
    case 'rain': v.state.truth.weather[D] = 'RAIN'; v.state.town.forecast[D] = 'RAIN'; v.rain = true; break;
    case 'oldHeadOpener': {
      s.bill.slots[0] = { bandId: 'b14', role: 'LOCAL', minutes: 25, pay: 'FLAT', fee: 40, askId: null, confirmed: true };
      s.bill.billing = ['b12', 'b13', 'b14'];
      p.shares.b14 = p.shares.b11; delete p.shares.b11;     // the new opener shares the flyer when the old one did: one thing changes
      break;
    }
    default: SB.fail('golden.variant', 'unknown variant ' + name);
  }
  v.name = name;
  // Every variant except rain carries the worked example's fine evening; rain replaces it.
  if (name === 'rain') v.show.night = { luck: [], mods: {}, stops: [], at: null, par: null, call: null, emitted: 0, dispute: null, demand: null };
  else v.withLuck();
  return v;
}

module.exports = { build: build, retime: retime, EXPECT: EXPECT, VARIANTS: VARIANTS, SHOW_DAY_YMD: SHOW_DAY_YMD };
