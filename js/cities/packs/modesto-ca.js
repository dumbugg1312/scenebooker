SB.Cities.register('modesto-ca', {
  v: 1,
  slug: 'modesto-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['modesto bee', 'american graffiti', 'graffiti night', 'modesto junior college', 'mjc', 'travis air force base', 'travis afb', 'amtrak',
           'university of the pacific', 'uc merced', 'university of california merced', 'csu stanislaus', 'stanislaus state', 'ace train', 'altamont commuter express',
           'elks', 'vfw', 'american legion', 'portuguese hall', 'almond blossom festival', 'modesto nuts', 'modesto a\'s', 'modesto music awards',
           'the almond hull', 'almond hull', 'tule fog room', '99 shoulder', 'dry creek annex', 'the arch lot', 'cannery row backroom', 'hall 209',
           'orchard row', 'valley oak shed', 'graffiti night garage', 'the fruit stand', 'oakland warehouse fire', 'ghost ship'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['modesto bee*', 'american graffiti*', 'almond hull*', 'tule fog room*', 'hall 209*', 'mjc*', 'modesto junior*'],

  blurb: ['Garages, fraternal halls and farm sheds in a hot, flat Valley town where punk is a side door.',
          'Most of the crowd drives in from the small towns, and the older bands leave for Sacramento and the Bay.'],
  hard: 'Heat, a thin crowd, and the Bay and Sacramento pulling your kids away.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Modesto' },
    { id: 'ceres', kind: 'FEEDER', name: 'Ceres', minutes: 15, bearing: 160, pop: 49300, note: 'Working-class city that runs straight into Modesto. Kids come constantly.' },
    { id: 'hughson', kind: 'FEEDER', name: 'Hughson', minutes: 20, bearing: 140, pop: 7500, note: 'Farm and orchard town to the southeast.' },
    { id: 'riverbank', kind: 'FEEDER', name: 'Riverbank', minutes: 20, bearing: 40, pop: 24900, note: 'Small, industrial and working-class. No scene to speak of.' },
    { id: 'turlock', kind: 'FEEDER', name: 'Turlock', minutes: 25, bearing: 150, pop: 72700, note: 'A college town with its own small scene and rooms: the nearest real rival.' },
    { id: 'oakdale', kind: 'FEEDER', name: 'Oakdale', minutes: 25, bearing: 70, pop: 23200, note: 'Ranch and rodeo town: cowboys, metalheads and a few garage bands.' },
    { id: 'waterford', kind: 'FEEDER', name: 'Waterford', minutes: 30, bearing: 85, pop: 9100, note: 'A small farm town on the river.' },
    { id: 'patterson', kind: 'FEEDER', name: 'Patterson', minutes: 30, bearing: 235, pop: 23800, note: 'An orchard and Bay Area commuter town off I-5.' },
    { id: 'manteca', kind: 'FEEDER', name: 'Manteca and Ripon', minutes: 30, bearing: 340, note: 'Suburban sprawl and almond villages, a short hop from Stockton.' },
    { id: 'newman', kind: 'FEEDER', name: 'Newman', minutes: 40, bearing: 215, pop: 12400, note: 'A farm and commuter town to the southwest.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', state: 'CA', minutes: 30, bearing: 340, slug: 'stockton-ca', note: 'Bigger and grittier, with its own long-running scene. The two trade bands and crowds all the time.' },
    { id: 'merced', kind: 'PEER', name: 'Merced', state: 'CA', minutes: 45, bearing: 155, slug: 'merced-ca', note: 'A smaller farm and campus town down Highway 99.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', state: 'CA', minutes: 105, bearing: 155, slug: 'visalia-ca', note: 'Similar size and the same Valley feel, farther down 99.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A grid of numbered and lettered streets under the arch: licensed bars, a restored theater and a monthly art walk. Cheap storefronts are being squeezed by redevelopment.' },
    { id: 'old-northwest', name: 'the old northwest', route: 'old-side', note: 'Prewar bungalows and big trees around the park. Backyard and living-room shows only, and the neighbors are alert.' },
    { id: 'college', name: 'the college area', route: 'campus', note: 'Rented bungalows around the junior college, full of commuter students and working-class renters.' },
    { id: 'north-end', name: 'the McHenry strip and the north end', route: 'campus', note: 'Big-box chains, tract homes and the mall. Suburban teens with cars and parents\' garages.' },
    { id: 'west-modesto', name: 'west of 99', route: 'work-side', note: 'Dense, working-class and heavily Latino, with body shops and warehouses. The one place a warehouse might rent for a show, and the fire-code risk that comes with it.' },
    { id: 'east-side', name: 'east along Yosemite Boulevard', route: 'work-side', note: 'Older commercial strip and ranch-house streets edging into farmland. Garages and a few halls.' },
    { id: 'south-side', name: 'south toward Ceres', route: 'old-side', note: 'Commuter sprawl along Crows Landing and Mitchell roads. Garages and strip-mall units.' },
    { id: 'salida', name: 'Salida', route: 'campus', note: 'Rural-suburban ranch properties along 99, far from police and neighbors. Barn and shed shows.' }
  ],

  contacts: ['stockton-ca', 'merced-ca', 'visalia-ca', 'vallejo-ca'],

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 545000 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 405000 }
  ],
  roads: ['Highway 99', 'I-5', 'Highway 132', 'Highway 108', 'I-580'],

  words: {
    street: ['Yosemite Boulevard', 'McHenry Avenue', 'Briggsmore', 'Crows Landing Road', 'Oakdale Road', 'Highway 99'],
    water: ['the Tuolumne', 'Dry Creek', 'the Stanislaus'],
    hood: ['Graceada Park', 'Bret Harte', 'Airport District', 'Del Rio', 'La Loma', 'Salida', 'West Modesto', 'Empire', 'Riverdale Park'],
    thing: ['almond orchard', 'taco truck', 'garage', 'canopy and a generator', 'ditch', 'lowrider', 'horchata', 'skatepark', 'practice unit', 'taco truck lot', 'generator'],
    weather: ['tule fog', 'triple digits', 'smoke day']
  },

  events: [
    { id: 'MODESTO_CA_GARAGE_OVEN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast says triple digits all week.',
      title: 'The garage is an oven',
      body: 'It is a hundred and ten on the driveway at four in the afternoon. The band wants to play in shorts, and the crowd is staying out in the street.',
      options: [
        { id: 'LATE', label: 'Push the start back until the sun goes down', likely: 'Cooler, but the ones with curfews and rides are gone.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors at dusk. The ones who stayed were glad they did.' },
        { id: 'FANS', label: 'Borrow fans and a cooler of ice, play on', likely: 'Costs a little. Fewer people come inside.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Two box fans and forty pounds of ice. The room was damp and the driveway was full.' },
        { id: 'MOVE', label: 'Move it a day, when it might break', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. It was ninety-nine instead of a hundred and ten.' }
      ] }
  ]
});
