SB.Cities.register('santa-barbara-ca', {
  v: 1,
  slug: 'santa-barbara-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['ucsb', 'uc santa barbara', 'university of california santa barbara', 'gauchos', 'santa barbara city college', 'vandenberg', 'vandenberg space force base',
           'port hueneme', 'naval base ventura county', 'chumash casino', 'santa ynez chumash', 'old spanish days', 'amtrak', 'pacific surfliner', 'coast starlight',
           'cal poly', 'cuesta college', 'santa barbara independent', 'news-press', 'kcsb', 'santa barbara barbarian', 'sheriff\'s foot patrol',
           'the gaviota grange', 'salsipuedes social hall', 'the sundowner room', 'fogbank', 'mesa lane laundry', 'haley street annex', 'the lemon grove',
           'casitas pass hall', 'rincon rec room', 'the marine layer', 'padaro pallet yard', 'alameda avenue carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['ucsb*', 'santa barbara independent*', 'news-press*', 'kcsb*', 'old spanish days*', 'vandenberg*'],

  blurb: ['Students, surfers and skaters share the same backyards, and punk knows it is the counter-culture to a mellow, wealthy beach town.',
          'Shows end early because the neighbors have lawyers. A room lasts about three school years, then the people running it graduate.'],
  hard: 'Short-lived rooms, early curfews, and a town that empties each summer.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Barbara' },
    { id: 'goleta', kind: 'FEEDER', name: 'Goleta', minutes: 15, bearing: 285, note: 'A suburb west of town with the airport, the university and light industry. Part of the same scene.' },
    { id: 'isla-vista', kind: 'FEEDER', name: 'Isla Vista', minutes: 15, bearing: 280, note: 'A dense one-square-mile student town of renters and bikes, with its own house-show culture. Most of the audience lives here.' },
    { id: 'carpinteria', kind: 'FEEDER', name: 'Carpinteria', minutes: 15, bearing: 115, note: 'A small beach town east on US 101 with surf and skate kids.' },
    { id: 'ventura', kind: 'FEEDER', name: 'Ventura', minutes: 40, bearing: 120, note: 'The closest big sibling: scruffier, more surf and punk. Crowds go both ways constantly.' },
    { id: 'santa-ynez', kind: 'FEEDER', name: 'Santa Ynez Valley', minutes: 45, bearing: 315, note: 'Wine country and a tourist town over the mountain pass. Teenagers drive over; no scene of their own.' },
    { id: 'ojai', kind: 'FEEDER', name: 'Ojai', minutes: 60, bearing: 100, note: 'A small mountain valley of artists and retreats, with a punk and skate fringe.' },
    { id: 'lompoc', kind: 'FEEDER', name: 'Lompoc', minutes: 65, bearing: 295, note: 'A farm and prison town beside a space base, with a hardcore and metal fringe.' },
    { id: 'santa-maria', kind: 'FEEDER', name: 'Santa Maria', minutes: 70, bearing: 315, note: 'A big, mostly Latino farm city north on US 101 with a real scene; kids drive south.' },
    { id: 'oxnard', kind: 'PEER', name: 'Oxnard', minutes: 60, bearing: 120, slug: 'oxnard-ca', note: 'Bigger, more Latino and more working class, with a strong hardcore following that will drive.' },
    { id: 'san-luis-obispo', kind: 'PEER', name: 'San Luis Obispo', minutes: 110, bearing: 325, slug: 'san-luis-obispo-ca', note: 'The other nice coast college town, over the grade; the natural next tour stop north.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and lower State Street', route: 'downtown', note: 'The tourist spine from the beach up through the old mall: bars and storefronts that turn over constantly.' },
    { id: 'warehouse-blocks', name: 'the old warehouse blocks by the waterfront', route: 'old-side', note: 'Old auto shops and canneries that were cheap practice space once. Now tasting rooms and galleries, and gone for DIY.' },
    { id: 'eastside', name: 'the Eastside and Milpas Street', route: 'old-side', note: 'Working-class, heavily Latino bungalows and small lots. Backyards, driveways, back houses and taquerias, and the most neighborhood feeling in town.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Small working-class homes and light industrial pockets west of State Street. Garages and backyards.' },
    { id: 'mesa', name: 'the Mesa', route: 'work-side', note: 'Bluff-top streets of surfers and skaters sharing rentals, with a college campus. Getting pricey.' },
    { id: 'upper-state', name: 'Upper State and the north side', route: 'campus', note: 'Strip centers, chains and apartments north of the freeway. Rehearsal studios in commercial buildings; bland and cheaper.' },
    { id: 'goleta-side', name: 'Goleta and Isla Vista', route: 'campus', note: 'The university side to the west: house shows, courtyards and garages, policed by the county and not the city.' }
  ],

  contacts: ['oxnard-ca', 'san-luis-obispo-ca'],

  points: [
    { name: 'Ventura', state: 'CA', lat: 34.27, lon: -119.23, pop: 110000 },
    { name: 'Santa Maria', state: 'CA', lat: 34.95, lon: -120.44, pop: 110000 },
    { name: 'Ojai', state: 'CA', lat: 34.45, lon: -119.24, pop: 7500 },
    { name: 'Thousand Oaks', state: 'CA', lat: 34.17, lon: -118.84, pop: 125000 }
  ],
  roads: ['US 101', 'Highway 154', 'Highway 150', 'Highway 217', 'Highway 246'],

  words: {
    street: ['State Street', 'Milpas Street', 'Highway 101', 'Highway 154'],
    water: ['the harbor', 'the channel'],
    hood: ['the Eastside', 'the Westside', 'the Mesa', 'Isla Vista', 'Goleta', 'Lower State', 'Five Points', 'Mission Canyon', 'Carpinteria'],
    thing: ['taqueria', 'tri-tip sandwich', 'fish taco', 'garage', 'bike path', 'tasting room', 'back house', 'surf wax', 'skatepark', 'towels on the door', 'bluff', 'wine bar'],
    weather: ['sundowner wind', 'fog bank', 'week of fire smoke']
  }
});
