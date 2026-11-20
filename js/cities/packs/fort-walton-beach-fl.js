SB.Cities.register('fort-walton-beach-fl', {
  v: 1,
  slug: 'fort-walton-beach-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['eglin air force base', 'eglin afb', 'hurlburt field', 'duke field', 'air force special operations command', 'special forces', 'tyndall',
           'northwest florida state college', 'nwfsc', 'university of west florida', 'wallace community college', 'florida state', 'billy bowlegs', 'pirate festival',
           'destin fishing rodeo', 'fishing rodeo', 'destin seafood festival', 'boggy fest', 'boggy bayou mullet festival', 'mullet festival',
           'northwest florida daily news', 'the beachcomber', 'okaloosa county transit', 'uptown station', 'sunpass', 'waffle house', 'the camellia city', 'the sonic city',
           'vfw', 'american legion', 'legion post', 'the sound side annex', 'camellia hall', 'mullet row social club', 'the quarterdeck garage', 'santa rosa rec room',
           'the bridge toll lounge', 'tower beach backroom', 'the sandbar shed', 'pensacola road pavilion', 'eglin parkway pool hall', 'the big dipper carport'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Eglin is not banned alone because Pensacola's list bans the bare word;
     the road named for the base is written SR 85 here so the two lists never collide. */
  blocklist: ['eglin*', 'hurlburt*', 'billy bowlegs*', 'boggy fest*', 'destin fishing rodeo*', 'waffle house*'],

  blurb: ['A beach and base town with a few rooms, a thin crowd and bands who treat the bridge like a border. A touring band gets a real welcome.',
          'Clubs change hands, and the better scene is an hour west.'],
  hard: 'Few rooms, a moving crowd, and the better scene an hour west.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Pensacola', state: 'FL', lat: 30.42, lon: -87.22 },
    { name: 'Tallahassee', state: 'FL', lat: 30.45, lon: -84.25 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Walton Beach' },
    { id: 'destin', kind: 'FEEDER', name: 'Destin', minutes: 25, bearing: 105, beyond: 'brooks-bridge', season: { months: [5, 6, 7, 8], mul: 1.3 },
      note: 'The tourist end. Kids work there and drive west to play; rent has pushed everyone out.' },
    { id: 'niceville', kind: 'FEEDER', name: 'Niceville and Valparaiso', minutes: 25, bearing: 50, pop: 20500,
      note: 'Base-contractor kids and the commuter college crowd across the bay. Suburban and affluent.' },
    { id: 'navarre', kind: 'FEEDER', name: 'Navarre', minutes: 25, bearing: 265, note: 'Military and retiree bedroom town to the west. A few teen bands.' },
    { id: 'crestview', kind: 'FEEDER', name: 'Crestview', minutes: 35, bearing: 350, note: 'The county seat up SR 85 and I-10. A railroad town grown by the base.' },
    { id: 'gulf-breeze', kind: 'FEEDER', name: 'Gulf Breeze', minutes: 45, bearing: 262, note: 'Affluent bedroom town across from Pensacola.' },
    { id: 'freeport', kind: 'FEEDER', name: 'Freeport', minutes: 45, bearing: 80, note: 'A fast-growing commuter town; the road there crosses the bay or goes around it.' },
    { id: 'santa-rosa-beach', kind: 'FEEDER', name: 'Santa Rosa Beach and 30A', minutes: 55, bearing: 95, beyond: 'brooks-bridge', season: { months: [5, 6, 7, 8], mul: 1.4 },
      note: 'Rich visitors and beach communities. Summer traffic doubles the drive.' },
    { id: 'defuniak', kind: 'FEEDER', name: 'DeFuniak Springs', minutes: 50, bearing: 55, note: 'A rural county seat built around a round lake.' },
    { id: 'milton', kind: 'FEEDER', name: 'Milton', minutes: 60, bearing: 300, note: 'A river town toward Pensacola, with some teen bands.' },
    { id: 'laurel-hill', kind: 'FEEDER', name: 'Laurel Hill', minutes: 70, bearing: 10, note: 'Farm and church country; kids drive far for any show.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', minutes: 65, bearing: 270, slug: 'pensacola',
      note: 'The bigger scene an hour west. The local kids drive there for shows, and it pulls the bands this town fails to keep.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 115, bearing: 280, slug: 'mobile-al', note: 'A trade partner and a place people leave for, past Pensacola.' },
    { id: 'panama-city', kind: 'PEER', name: 'Panama City', minutes: 100, bearing: 105, scene: 500,
      note: 'The next stop east, still rebuilding after the big storm of 2018.' },
    { id: 'tallahassee', kind: 'PEER', name: 'Tallahassee', minutes: 170, bearing: 90, slug: 'tallahassee-fl', note: 'A university city three hours east where bands go for a college crowd.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'brooks-bridge', name: 'the Brooks Bridge', p: .03 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A compact grid of older low buildings on US 98 and the Sound: a few bars, a hall and the odd storefront.' },
    { id: 'sr85', name: 'the SR 85 strip', route: 'work-side', note: 'Motels, pawn shops, tattoo shops and laundromats on the road to the base. Cheap strip bays and enlisted renters.' },
    { id: 'west-side', name: 'Mary Esther and the west side', route: 'work-side', note: 'Ranch houses and mobile home parks along US 98 toward the airfield. Backyards, carports and garages.' },
    { id: 'shalimar', name: 'Shalimar and Cinco Bayou', route: 'old-side', note: 'Older homes along the bayou, mixed incomes, dock and yard space. The waterfront neighbors hear everything across the water.' },
    { id: 'north-fwb', name: 'North Fort Walton, Wright and Lake Lorraine', route: 'campus', note: 'Subdivisions and apartment complexes toward the base gates, where most working families and enlisted renters live.' }
  ],

  contacts: ['pensacola', 'mobile-al', 'tallahassee-fl', { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66 }],

  points: [
    { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66, pop: 200000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 150000 }
  ],
  roads: ['I-10', 'US 98', 'SR 85', 'US 90', 'SR 189'],

  words: {
    street: ['Racetrack Road', 'Highway 98', 'Highway 85', 'Highway 189', 'Highway 20'],
    water: ['Santa Rosa Sound', 'the Sound', 'Choctawhatchee Bay', 'Boggy Bayou', 'Poquito Bayou', 'Lake Lorraine'],
    hood: ['Shalimar', 'Cinco Bayou', 'Mary Esther', 'Wright', 'Lake Lorraine', 'Valparaiso', 'Okaloosa Island'],
    thing: ['smoked mullet', 'fish dip', 'boiled peanuts', 'pontoon', 'camellia', 'sandbar', 'mirror ball', 'fog machine', 'tourist traffic'],
    weather: ['afternoon thunderstorm', 'heat index']
  },

  events: [
    { id: 'FORT_WALTON_BEACH_FL_BRIDGE_JAM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The beach crowd is in and US 98 is backing up at the bridge.',
      title: 'The Brooks Bridge is jammed',
      body: 'A wreck and a holiday crowd have the Brooks Bridge at a crawl the night of your show. The kids who work and live out toward the beach can\'t get across in time.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from the beach side.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared. The beach side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads sat in traffic together all the way across. They\'ll remember that.' }
      ] }
  ]
});
