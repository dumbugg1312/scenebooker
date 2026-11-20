SB.Cities.register('visalia-ca', {
  v: 1,
  slug: 'visalia-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['college of the sequoias', 'sequoias', 'naval air station lemoore', 'nas lemoore', 'west hills college', 'fresno state', 'chapman university',
           'fresno pacific', 'porterville college', 'reedley college', 'visalia times-delta', 'times-delta', 'world ag expo', 'tulare county fair',
           'kings district fair', 'visalia rawhide', 'amgen tour of california', 'visalia transit', 'amtrak', 'amtrak thruway',
           'visalia police department', 'tulare county sheriff', 'vfw', 'american legion', 'sequoia national park', 'mexican coca-cola',
           'the packwood room', 'packwood room', 'tule fog annex', 'sycamore street lanes', 'the kaweah hall', 'kaweah hall', 'raisin row',
           'cotton gin garage', 'oak shade social club', 'citrus crate loft', 'goshen junction room', 'swamp cooler records', 'lemon cove lodge',
           'ben maddox carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['visalia times*', 'world ag expo*', 'swamp cooler*', 'tule fog annex*', 'packwood*'],

  blurb: ['A southern San Joaquin Valley farm and distribution city of tract homes and strip malls, with a pretty old downtown and a Sierra horizon on clear days.',
          'Punk lives in garages and backyards, and it starts over every time the seniors graduate and head for the bigger towns north and south.'],
  hard: 'Noise calls in tract homes, brutal heat and smoky air, and a bigger city that steals the crowd.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Visalia' },
    { id: 'tulare', kind: 'FEEDER', name: 'Tulare', minutes: 15, bearing: 175, pop: 68875, note: 'The big dairy-town neighbor to the south, with a small scene of its own.' },
    { id: 'exeter', kind: 'FEEDER', name: 'Exeter', minutes: 15, bearing: 95, pop: 10321, note: 'A citrus town with murals; kids come over for shows.' },
    { id: 'farmersville', kind: 'FEEDER', name: 'Farmersville', minutes: 10, bearing: 130, note: 'Small and blue-collar, just southeast.' },
    { id: 'woodlake', kind: 'FEEDER', name: 'Woodlake', minutes: 20, bearing: 60, note: 'A small farm town at the foothill edge.' },
    { id: 'hanford', kind: 'FEEDER', name: 'Hanford', minutes: 25, bearing: 280, pop: 57990, note: 'A peer-sized town west on 198 with its own scene and a friendly rivalry.' },
    { id: 'lindsay', kind: 'FEEDER', name: 'Lindsay', minutes: 25, bearing: 125, note: 'A small citrus town to the southeast.' },
    { id: 'dinuba', kind: 'FEEDER', name: 'Dinuba', minutes: 30, bearing: 350, note: 'A farm town to the north.' },
    { id: 'porterville', kind: 'FEEDER', name: 'Porterville', minutes: 35, bearing: 140, pop: 62623, note: 'A real second town for shows, up against the foothills, and a friendly rival.' },
    { id: 'lemoore', kind: 'FEEDER', name: 'Lemoore', minutes: 35, bearing: 275, pop: 27038, note: 'Military families from the jet base; sailors sometimes bring friends.' },
    { id: 'reedley', kind: 'FEEDER', name: 'Reedley', minutes: 40, bearing: 5, pop: 25227, note: 'A fruit-basket town up the road in the next county.' },
    { id: 'merced', kind: 'PEER', name: 'Merced', minutes: 125, bearing: 320, slug: 'merced-ca', note: 'Two hours up Highway 99; a trading partner on tours.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 150, bearing: 325, slug: 'modesto-ca', note: 'A bigger Valley town farther up the 99.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A tree-lined walkable core of bars and restaurants that run 21 and over. Priced up and polished, with little noise tolerance.' },
    { id: 'mooney', name: 'Mooney', route: 'campus', note: 'A long commercial strip of chains, a mall and apartments, with a community college at its south end. Strip units are the cheap practice rooms.' },
    { id: 'eastside', name: 'the Eastside', route: 'old-side', note: 'Older, working-class streets of small houses with long lots, garages and carports. Cheap and mostly ignored.' },
    { id: 'north-visalia', name: 'North Visalia', route: 'old-side', note: 'Older houses and newer subdivisions north of 198. Backyards and a few church properties.' },
    { id: 'industrial', name: 'the Industrial Area', route: 'work-side', note: 'Warehouses, packing sheds and small shops along the rail line. Cheap and promising but under pressure from code enforcement.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'The farm edge toward Goshen. Yard shows and generator nights far from everyone.' },
    { id: 'southwest', name: 'Southwest Visalia', route: 'campus', note: 'New tract homes and big lots on the money side of town. Garage practice and little else.' }
  ],

  contacts: ['merced-ca', 'modesto-ca'],

  points: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 542107 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 403455 },
    { name: 'Clovis', state: 'CA', lat: 36.83, lon: -119.70, pop: 120000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 520000 }
  ],
  roads: ['Highway 99', 'Highway 198', 'Highway 63', 'Highway 65', 'I-5'],

  words: {
    street: ['Mooney Boulevard', 'Highway 198', 'Highway 99', 'Highway 63', 'Ben Maddox Way', 'Court Street', 'Main Street'],
    water: ['the Kaweah', 'the Tule', 'the canal'],
    hood: ['Mooney', 'the Eastside', 'Goshen', 'North Visalia', 'the Westside'],
    thing: ['roll-up door', 'swamp cooler', 'taco truck', 'orange grove', 'crop duster', 'raspado', 'canal bank', 'driveway', 'church hall', 'generator'],
    weather: ['tule fog', 'triple digits', 'ag smoke']
  }
});
