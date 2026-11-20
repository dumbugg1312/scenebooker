'use strict';
// test/fixtures/large-city.js — a synthetic large-city pack (06-harness 5.1), built from the Philadelphia column of
// mechanics 12.6, for the balance matrix and for tests that need a second, very different city. It is registered under the
// slug 'philadelphia' only while no real js/cities/packs/philadelphia.js exists, so the real pack replaces it the day it lands.
// Places are real (towns, roads, neighborhoods, drive times); nothing else is. Every room, band and booking name is generated per save.
//   const big = require('./fixtures/large-city.js');
//   big.ensure(SB)   -> the slug to start a game with ('philadelphia'), registering the synthetic pack when needed
//   big.pack         -> the raw pack object (what SB.Cities.validate takes)
const fs = require('fs'), path = require('path');

const SLUG = 'philadelphia';

const pack = {
  v: 1,
  slug: SLUG,
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: [],
  blocklist: [],
  blurb: ['A big old city of rowhouses and basements, with a hundred places to be on a Tuesday and six other bookers asking for the same room.',
          'Trains run late and the kids get themselves there.'],
  hard: 'Getting noticed among thirty bookers; inspectors close rooms on the spot.',
  region: 'the Northeast',
  houseType: 'ROWHOUSE',
  whereGo: [{ name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }, { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }],

  scene: {
    size: 32000,
    gens: [.24, .54, .22],
    stack: .85, roomTau: 1.3, trendLag: 3, glutAt: 20, traffic: 40, wordStart: 78,
    kidIntake: 1600, memberChurn: .0005, transit: true
  },
  money: {
    comfort: [10, 15, 18],
    bills: { RENT: 1050, UTILITIES: 240, CAR: 300, FOOD: 560 },
    shiftPay: 118, startCash: 400, priceIndex: 1.48
  },
  night: [                                      // Monday to Sunday: weeknights work
    [.50, .55, .60, .70, 1.00, 1.00, .75],      // kids
    [.60, .75, .80, .85, .92, .88, .75],        // middle
    [.40, .50, .60, .70, .90, 1.00, .65]        // old heads
  ],
  tilt: [
    { fan: 'emo', band: 'hardcore', d: .10, reason: 'The same basements for thirty years.' },
    { fan: 'hardcore', band: 'emo', d: .10, reason: 'The same basements for thirty years.' },
    { fan: 'indie', band: 'emo', d: .10, reason: 'One record shop feeds both.' },
    { fan: 'emo', band: 'indie', d: .10, reason: 'One record shop feeds both.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Philadelphia' },
    { id: 'camden', kind: 'FEEDER', name: 'Camden', state: 'NJ', minutes: 35, bearing: 100, scene: 700, note: 'Across the river; kids take the train.', bands: 4 },
    { id: 'chester', kind: 'FEEDER', name: 'Chester', minutes: 40, bearing: 215, scene: 500, note: 'A river town with a few bands.', bands: 3 },
    { id: 'norristown', kind: 'FEEDER', name: 'Norristown', minutes: 45, bearing: 300, scene: 450, note: 'Basements and a commuter line.', bands: 3 },
    { id: 'wilmington-de', kind: 'FEEDER', name: 'Wilmington', state: 'DE', minutes: 55, bearing: 220, scene: 900, note: 'Its own small scene.', bands: 5 },
    { id: 'doylestown', kind: 'FEEDER', name: 'Doylestown', minutes: 60, bearing: 355, scene: 350, note: 'Suburban kids with cars.', bands: 2 },
    { id: 'west-chester', kind: 'FEEDER', name: 'West Chester', minutes: 65, bearing: 265, scene: 600, note: 'A college town of its own.', bands: 4 },
    { id: 'trenton', kind: 'FEEDER', name: 'Trenton', state: 'NJ', minutes: 70, bearing: 45, scene: 500, note: 'Old rooms and a long history.', bands: 3 },
    { id: 'allentown', kind: 'FEEDER', name: 'Allentown', minutes: 85, bearing: 340, scene: 650, note: 'A mill town with a loud scene.', bands: 4 },
    { id: 'reading', kind: 'FEEDER', name: 'Reading', minutes: 90, bearing: 295, scene: 450, note: 'Basement shows and one hall.', bands: 3 },
    { id: 'new-york-peer', kind: 'PEER', name: 'New York', state: 'NY', minutes: 125, bearing: 40, slug: 'new-york', scene: 20000, note: 'Bigger, faster, and always booked.' },
    { id: 'baltimore', kind: 'PEER', name: 'Baltimore', state: 'MD', minutes: 140, bearing: 215, scene: 9000, note: 'A peer scene with its own rooms.' },
    { id: 'washington-peer', kind: 'PEER', name: 'Washington', state: 'DC', minutes: 170, bearing: 220, slug: 'washington-dc', scene: 12000, note: 'A long tradition of bands and rooms.' }
  ],

  hoods: [
    { id: 'center-city', name: 'Center City', note: 'Bars with stages and a lot of foot traffic; polished.', route: 'downtown' },
    { id: 'south-philly', name: 'South Philly', note: 'Rowhouse basements and corner bars.', route: 'old-side' },
    { id: 'kensington', name: 'Kensington', note: 'Cheap warehouses and DIY rooms.', route: 'work-side' },
    { id: 'west-philly', name: 'West Philly', note: 'Students, houses cut into apartments and porch shows.', route: 'campus' },
    { id: 'germantown', name: 'Germantown', note: 'Big old houses and church halls.', route: 'old-side' },
    { id: 'northeast', name: 'the Northeast', note: 'Suburban kids with cars and a lot of garages.', route: 'work-side' }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true }, quiet: 1320 },
  roads: ['I-95', 'I-76', 'Broad Street', 'Market Street'],
  words: {
    street: ['Girard', 'Allegheny', 'Passyunk', 'Baltimore Avenue', 'Frankford'],
    water: ['the Schuylkill', 'the Delaware'],
    hood: ['Fishtown', 'Kensington', 'Germantown', 'Point Breeze'],
    thing: ['stoop', 'rowhouse', 'transit pass'],
    weather: ['slush', 'humidity']
  }
};

function realPackExists() { return fs.existsSync(path.join(__dirname, '..', '..', 'js', 'cities', 'packs', SLUG + '.js')); }

// Register the synthetic pack in this SB when no real pack was loaded. Returns the slug.
function ensure(SB) {
  if (!SB.Cities.isLoaded(SLUG)) SB.Cities.register(SLUG, JSON.parse(JSON.stringify(pack)));
  return SLUG;
}

module.exports = { slug: SLUG, pack: pack, ensure: ensure, realPackExists: realPackExists };
