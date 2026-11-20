SB.Cities.register('columbia-mo', {
  v: 1,
  slug: 'columbia-mo',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of missouri', 'mizzou', 'faurot', 'columbia college', 'stephens college', 'true/false', 'roots n blues', 'whiteman air force base',
           'lincoln university', 'central methodist', 'westminster college', 'missouri state fair', 'party cove', 'magic city', 'sharp end',
           'loop 70 rec', 'limestone room', 'rangeline annex', 'spur line hall', 'gravel road barn', 'fourth floor walkup', 'post 311',
           'hinkson basement', 'katy siding', 'auction barn', 'providence pallet'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['mizzou*', 'university of missouri*', 'true/false*', 'roots n blues*', 'columbia college*', 'stephens college*'],

  blurb: ['A Missouri university town about halfway between St. Louis and Kansas City, where football weekends and downtown bars run the calendar.',
          'The art-gallery blocks and old rentals around campus are where anything else has to live.'],
  hard: 'Bars are the default room, students turn over, and downtown real estate keeps getting more valuable.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Metal and hardcore share the same underground room and the same benefit bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbia' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', minutes: 15, bearing: 190, note: 'A fast-growing commuter town; kids come in for shows.' },
    { id: 'centralia', kind: 'FEEDER', name: 'Centralia', minutes: 25, bearing: 10, note: 'A small factory town; a few vanloads.' },
    { id: 'jefferson-city', kind: 'FEEDER', name: 'Jefferson City', minutes: 30, bearing: 165, note: 'The state capital: straighter and bigger, with crowds that go both ways.', bands: 2 },
    { id: 'boonville', kind: 'FEEDER', name: 'Boonville', minutes: 30, bearing: 275, note: 'An old river town on the interstate.' },
    { id: 'moberly', kind: 'FEEDER', name: 'Moberly', minutes: 35, bearing: 345, note: 'A working-class rail town; kids come down for shows.' },
    { id: 'fulton', kind: 'FEEDER', name: 'Fulton', minutes: 40, bearing: 115, note: 'Two small colleges; some interest, no scene.' },
    { id: 'fayette', kind: 'FEEDER', name: 'Fayette', minutes: 40, bearing: 300, note: 'A tiny college seat west of town.' },
    { id: 'mexico', kind: 'FEEDER', name: 'Mexico', minutes: 50, bearing: 60, note: 'A courthouse-square town; kids arrive in carloads on a Friday.' },
    { id: 'sedalia', kind: 'FEEDER', name: 'Sedalia', minutes: 60, bearing: 245, note: 'A rail town with some local rock and country.' },
    { id: 'kirksville', kind: 'PEER', name: 'Kirksville', minutes: 80, bearing: 355, scene: 500, note: 'A smaller college-town scene up the highway; kids drive down for bigger shows.' },
    { id: 'rolla', kind: 'PEER', name: 'Rolla', minutes: 90, bearing: 165, scene: 600, note: 'An engineering college town with a stop on the interstate.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', state: 'KS', minutes: 150, bearing: 280, slug: 'lawrence-ks', note: 'The nearest like-for-like college town with a known scene.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 165, bearing: 215, slug: 'springfield-mo', note: 'A bigger Ozarks city with a larger music infrastructure.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The Broadway bar district: student high-rises, old commercial blocks, loft rooms and stages. Licensed 21-plus shows.' },
    { id: 'north-village', name: 'the North Village arts district', route: 'downtown', note: 'Galleries, small theaters and bars just north. Art-opening-with-a-band nights.' },
    { id: 'campus-ring', name: 'the campus rental ring', route: 'campus', note: 'Older frame houses around campus rented to students, with basements and porches. House shows, and neighbors who call.' },
    { id: 'business-loop', name: 'the Business Loop', route: 'work-side', note: 'The old highway strip north of downtown: motels, pawn shops and cheap storefronts.' },
    { id: 'old-black-district', name: 'the old Black business district', route: 'old-side', note: 'A jazz-era district just north of Broadway; history to respect, not a cheap punk district.' },
    { id: 'south-side', name: 'south Columbia', route: 'campus', note: 'Newer subdivisions, chain restaurants and a bluff state park. Suburban teenagers.' },
    { id: 'east-side', name: 'Paris Road and the east side', route: 'work-side', note: 'Apartment complexes, warehouses and light industry. Unit practice spaces and few neighbors.' }
  ],

  contacts: ['lawrence-ks', 'springfield-mo', 'iowa-city-ia', 'champaign-il'],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 510000 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 300000 },
    { name: 'Jefferson City', state: 'MO', lat: 38.58, lon: -92.17, pop: 43000 },
    { name: 'Rolla', state: 'MO', lat: 37.95, lon: -91.77, pop: 20000 },
    { name: 'Kirksville', state: 'MO', lat: 40.19, lon: -92.58, pop: 17500 }
  ],
  roads: ['I-70', 'US 63', 'US 54', 'Providence Road', 'Stadium Boulevard', 'Business Loop 70'],

  words: {
    street: ['Broadway', 'Providence Road', 'Stadium Boulevard', 'Rangeline', 'Paris Road', 'Business Loop 70'],
    water: ['the Missouri', 'Hinkson Creek', 'Perche Creek'],
    hood: ['North Village', 'East Campus', 'West Broadway', 'Grindstone', 'Rock Bridge', 'the Loop'],
    thing: ['limestone bluff', 'gravel road', 'grain bin', 'pallet', 'frame house', 'yard show', 'benefit bill', 'campus radio', 'torn-down room'],
    weather: ['humidity', 'ice storm']
  }
});
