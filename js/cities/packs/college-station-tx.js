SB.Cities.register('college-station-tx', {
  v: 1,
  slug: 'college-station-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['texas a&m', 'a&m', 'aggie', 'aggies', 'aggieland', 'the corps', 'corps of cadets', 'kyle field', 'post oak mall', 'blinn college',
           'blue bell', 'baylor', 'sam houston state', 'fort hood', 'rellis', 'bryan air force base', 'easterwood', 'kanm', 'the battalion', 'shiner',
           'lone star beer', 'tito\'s', 'topo chico', 'university of texas', 'longhorns', 'gang safety zone', 'northgate music', 'rock prairie hall',
           'sixth street carport', 'cross-tie lodge', 'harvey road laundromat backroom', 'the pasture on 60', 'lick creek fellowship hall',
           'the hide and tallow', 'carters bend hall', 'navasota bottoms barn', 'boonville skate shed'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['texas a&m*', 'aggie*', 'kyle field*', 'post oak mall*', 'the battalion*', 'kanm*', 'blue bell*'],

  blurb: ['The campus is all football and red dirt. The punk kids found the old brick downtown next door in Bryan and made it theirs.',
          'Bands form fast and leave at graduation, so every year the scene starts over.'],
  hard: 'Student turnover, football weekends and a summer ghost town.',
  region: 'the Brazos Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'College Station' },
    { id: 'bryan', kind: 'FEEDER', name: 'Bryan', minutes: 15, bearing: 15, note: 'The county seat next door: older, cheaper and more working class, with garages and its own small scene.' },
    { id: 'navasota', kind: 'FEEDER', name: 'Navasota', minutes: 25, bearing: 130, note: 'A small antique and blues town down the highway; kids drive up.' },
    { id: 'hearne', kind: 'FEEDER', name: 'Hearne', minutes: 40, bearing: 320, note: 'A rail junction and farm town to the north.' },
    { id: 'caldwell', kind: 'FEEDER', name: 'Caldwell', minutes: 35, bearing: 225, note: 'A Czech-heritage farm county seat to the southwest.' },
    { id: 'somerville', kind: 'FEEDER', name: 'Somerville', minutes: 35, bearing: 245, note: 'A small rail and lake town.' },
    { id: 'madisonville', kind: 'FEEDER', name: 'Madisonville', minutes: 45, bearing: 50, note: 'A farm county seat toward the interstate.' },
    { id: 'brenham', kind: 'FEEDER', name: 'Brenham', minutes: 55, bearing: 170, note: 'The biggest small town around, with a junior college campus.', bands: 1 },
    { id: 'giddings', kind: 'FEEDER', name: 'Giddings', minutes: 70, bearing: 230, note: 'A farm and oil town on the way to Austin.' },
    { id: 'bellville', kind: 'FEEDER', name: 'Bellville', minutes: 70, bearing: 150, note: 'A farm seat on the exurban Houston edge.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', minutes: 60, bearing: 75, scene: 700, note: 'The nearest other college crowd, in the pine woods.' },
    { id: 'waco', kind: 'PEER', name: 'Waco', minutes: 105, bearing: 335, slug: 'waco-tx', note: 'A university town up the highway; a booker from either town could fill a bill.' },
    { id: 'killeen', kind: 'PEER', name: 'Killeen', minutes: 120, bearing: 285, slug: 'killeen-tx', note: 'An army town: a different, transient crowd.' }
  ],

  hoods: [
    { id: 'northgate', name: 'Northgate', route: 'downtown', note: 'The bar strip across from campus: country music, bars, apartments. Licensed 21-plus shows.' },
    { id: 'southside', name: 'Southside and Eastgate', route: 'campus', note: 'Older houses and duplexes rented to students, with yards and detached garages. The best backyards in the metro, and neighbors with lawyers.' },
    { id: 'texas-avenue', name: 'the Texas Avenue and University Drive strips', route: 'work-side', note: 'Strip centers, chains and big boxes. An occasional vacant unit becomes a short-lived room.' },
    { id: 'wolf-pen', name: 'Wolf Pen Creek', route: 'old-side', note: 'A city-run park and amphitheater. Permit-and-curfew music, not DIY.' },
    { id: 'wellborn', name: 'Wellborn', route: 'old-side', note: 'A rural old rail camp southwest of town: sheds, barns, generators and few complaints.' },
    { id: 'downtown-bryan', name: 'downtown Bryan', route: 'downtown', note: 'The only real downtown in the metro: old brick, a rail line, a few bars and storefronts.' },
    { id: 'east-bryan', name: 'east and south Bryan', route: 'work-side', note: 'Working-class streets, metal buildings and warehouses. The cheapest square footage in the metro.' }
  ],

  contacts: ['waco-tx', 'killeen-tx', 'austin', 'beaumont-tx'],

  points: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7500000 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74, pop: 2300000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 7700000 },
    { name: 'Huntsville', state: 'TX', lat: 30.72, lon: -95.55, pop: 46000 },
    { name: 'Lake Charles', state: 'LA', lat: 30.23, lon: -93.22, pop: 80000 }
  ],
  roads: ['SH 6', 'SH 21', 'SH 30', 'FM 60', 'SH 6 bypass'],

  words: {
    street: ['Texas Avenue', 'University Drive', 'Harvey Road', 'Wellborn Road', 'South College Avenue', 'Highway 6'],
    water: ['the Brazos', 'Carters Creek', 'Wolf Pen Creek', 'Lick Creek'],
    hood: ['Northgate', 'Southside', 'Eastgate', 'Wellborn', 'Boonville', 'Bryan'],
    thing: ['kolache', 'breakfast taco', 'queso', 'feed store', 'sweet tea', 'stock trailer', 'red dirt band', 'brick downtown', 'zine', 'dorm room'],
    weather: ['humidity', 'pop-up storm']
  }
});
