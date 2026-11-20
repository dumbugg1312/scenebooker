SB.Cities.register('huntington-wv', {
  v: 1,
  slug: 'huntington-wv',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['marshall university', 'marshall', 'thundering herd', 'the herd', 'ohio university', 'morehead state', 'university of charleston',
           'old central city days', 'jazz-mu-tazz', 'hot dog festival', 'rails and ales', 'chilifest', 'hilltop festival', 'ritter park days',
           'guyandotte civil war days', 'heritage days', 'appalachian film festival', 'tri-state comic con', 'camden park', 'csx',
           'port of huntington tri-state', 'tri-state airport', 'tri-state transit authority', 'amtrak', 'cabell midland', 'heroin(e)',
           '1970 plane crash', 'plane crash memorial', 'waffle house', 'vfw', 'american legion',
           'the freight room', 'twelve pole hall', 'switchman\'s lodge', 'the third avenue annex', 'guyandotte grange', 'the flood gate',
           'mud river rec', 'the boxcar basement', 'tri-state parish hall', 'eighth avenue garage', 'the slaw room', 'cabell street pavilion'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['marshall*', 'thundering herd*', 'camden park*', 'ritter park days*', 'freight room*', 'twelve pole*', 'flood gate*', 'slaw room*'],

  blurb: ['A West Virginia river city on the Ohio, at the heart of a three-state metro, where cheap old houses near the university carry the shows.',
          'A sober, orderly show keeps a room open longer here, and a spring flood or a football Saturday can scatter the whole bill.'],
  hard: 'Small crowd, a skippable stop between two bigger draws, and the university turns the crowd over every fall.',
  region: 'the Tri-State',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Lexington', state: 'KY', lat: 38.04, lon: -84.5 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Huntington' },
    { id: 'ceredo', kind: 'FEEDER', name: 'Ceredo and Kenova', minutes: 10, bearing: 270, note: 'Small river and rail towns on the Wayne County side.' },
    { id: 'barboursville', kind: 'FEEDER', name: 'Barboursville, Milton and Hurricane', minutes: 15, bearing: 85, note: 'Mall-and-chain suburbs up I-64; the suburban teenagers come from here.' },
    { id: 'chesapeake', kind: 'FEEDER', name: 'Chesapeake and Proctorville', state: 'OH', minutes: 20, bearing: 355, note: 'Ohio suburbs across the river; kids cross the bridge for shows.' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', state: 'KY', minutes: 25, bearing: 285, note: 'A steel-and-hospital town tied to Huntington at the hip; a small scene of its own.', bands: 2 },
    { id: 'wayne', kind: 'FEEDER', name: 'Wayne', minutes: 25, bearing: 200, note: 'A small county seat to the south.' },
    { id: 'ironton', kind: 'FEEDER', name: 'Ironton', state: 'OH', minutes: 30, bearing: 310, note: 'An old iron town up US 52 with a branch campus.' },
    { id: 'louisa', kind: 'FEEDER', name: 'Louisa and Catlettsburg', state: 'KY', minutes: 35, bearing: 240, note: 'Small eastern Kentucky towns.' },
    { id: 'gallipolis', kind: 'FEEDER', name: 'Point Pleasant and Gallipolis', minutes: 55, bearing: 25, note: 'Historic river villages up the Ohio.' },
    { id: 'morehead', kind: 'FEEDER', name: 'Morehead', state: 'KY', minutes: 70, bearing: 260, note: 'A small university town west on I-64 with probably a small scene.' },
    { id: 'logan', kind: 'FEEDER', name: 'Logan', minutes: 75, bearing: 160, note: 'A declined coal town on the Guyandotte; kids drive the winding road in.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', minutes: 55, bearing: 100, scene: 1800, note: 'The state capital and the great rival: buttoned-up, and a sister scene on I-64.' },
    { id: 'portsmouth', kind: 'PEER', name: 'Portsmouth', state: 'OH', minutes: 60, bearing: 300, scene: 800, note: 'A hilly river town on the Ohio side.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', state: 'OH', minutes: 90, bearing: 10, scene: 1500, note: 'A live university town and likely the strongest scene within range.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old commercial buildings, bars with bands and a revived plaza; landlords and the city pay attention.' },
    { id: 'campus', name: 'the university district', route: 'campus', note: 'Student blocks beside downtown, around 16th Street and 5th Avenue; fills in September, empties in December.' },
    { id: 'central-city', name: 'Old Central City', route: 'work-side', note: 'A rail-era west-end strip of antique shops and empty storefronts; the best bet for a storefront or garage space.' },
    { id: 'westmoreland', name: 'Westmoreland', route: 'work-side', note: 'Far west, partly in Wayne County; backyards, carports and confusing enforcement across the county line.' },
    { id: 'southside', name: 'the Southside and Fairfield', route: 'old-side', note: 'Older houses with basements along the Hal Greer corridor; students and working families.' },
    { id: 'ritter-park', name: 'Ritter Park', route: 'old-side', note: 'The affluent historic blocks around the big park; neighbors with lawyers, and where the polite complaints come from.' },
    { id: 'guyandotte', name: 'Guyandotte', route: 'old-side', note: 'A river village at the east end with a small old-town strip; cheap, quirky and flood-prone.' },
    { id: 'east-side', name: 'Highlawn and the east side', route: 'campus', note: 'Walnut Hills, Forest Hills and Altizer: student-adjacent rentals and family housing.' }
  ],

  contacts: ['lexington-ky'],

  points: [
    { name: 'Charleston', state: 'WV', lat: 38.35, lon: -81.63, pop: 210000 },
    { name: 'Athens', state: 'OH', lat: 39.33, lon: -82.1, pop: 65000 },
    { name: 'Lexington', state: 'KY', lat: 38.04, lon: -84.5, pop: 520000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2100000 }
  ],
  roads: ['I-64', 'US 60', 'US 52', 'WV 10', 'US 23', 'WV 2'],

  words: {
    street: ['Hal Greer Boulevard', '5th Avenue', '16th Street', '3rd Avenue', '8th Street', 'US 60'],
    water: ['the Ohio', 'the Guyandotte', 'the floodwall', 'Mud River'],
    hood: ['Old Central City', 'Westmoreland', 'Guyandotte', 'Fairfield', 'Highlawn', 'Walnut Hills', 'Forest Hills', 'Altizer', 'Ritter Park'],
    thing: ['pepperoni roll', 'slaw dog', 'floodwall', 'coal train', 'holler', 'pop', 'rail yard', 'fellowship hall', 'river bridge', 'pavilion'],
    weather: ['river flood', 'humid', 'ice and snow']
  }
});
