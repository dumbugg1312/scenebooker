SB.Cities.register('riverside', {
  v: 1,
  slug: 'riverside',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of california riverside', 'ucr', 'california baptist university', 'riverside community college', 'riverside city college', 'la sierra university',
           'california state university san bernardino', 'csusb', 'university of redlands', 'loma linda university', 'the press-enterprise', 'press enterprise',
           'inland empire weekly', 'riverside art museum', 'mission inn', 'kvcr', 'kcal', 'kesq', 'riverside county', 'march air reserve base', 'march field',
           'amazon', 'kaiser permanente', 'los angeles angels', 'the 66ers', 'inland empire 66ers', '66ers', 'riverside raceway', 'auto club speedway',
           'national orange show', 'orange show', 'festival of lights', 'ontario airport', 'santa ana winds', 'hurricane hilary', 'tropical storm hilary'],
  blocklist: ['mission inn*', 'press-enterprise*', 'inland empire weekly*', '66ers*', 'orange show*', 'riverside festival of lights*'],

  blurb: ['Warehouses, stucco and freeway sprawl east of LA, with backyard hardcore and a long habit of all-ages halls and word-of-mouth maps.',
          'The scene is spread across a dozen small towns, and a show means a garage, a shop or a living room.'],
  hard: 'Heat, the 91 and the 60, and nobody lives close enough to walk.',
  region: 'the Inland Empire',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A young, Latino-led hardcore revival runs through the whole basin.' }
  ],

  chokepoints: [{ id: 'the-91', name: 'the 91 at the Corona interchange', p: .03 }],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Riverside' },
    { id: 'rubidoux', kind: 'FEEDER', name: 'Rubidoux', minutes: 10, bearing: 315, note: 'Across the river: house and backyard shows.' },
    { id: 'colton', kind: 'FEEDER', name: 'Colton', minutes: 20, bearing: 30, note: 'A railroad town beside the 215: cheap, loud, industrial.' },
    { id: 'moreno-valley', kind: 'FEEDER', name: 'Moreno Valley', minutes: 20, bearing: 85, note: 'A big suburb out the 60: lots of teens, few rooms.' },
    { id: 'corona', kind: 'FEEDER', name: 'Corona', minutes: 25, bearing: 250, beyond: 'the-91', note: 'West along the 91. Kids come in both ways, and there is a small punk pocket of its own.' },
    { id: 'san-bernardino', kind: 'FEEDER', name: 'San Bernardino', minutes: 25, bearing: 35, note: 'A rougher town with a strong hardcore pocket.' },
    { id: 'redlands', kind: 'FEEDER', name: 'Redlands', minutes: 25, bearing: 55, note: 'An older town of students and church kids.' },
    { id: 'fontana', kind: 'FEEDER', name: 'Fontana', minutes: 30, bearing: 340, note: 'Freeway and warehouse sprawl: bands, but few rooms.' },
    { id: 'perris', kind: 'FEEDER', name: 'Perris', minutes: 30, bearing: 135, note: 'A young farm-edge town far from everything.' },
    { id: 'pomona', kind: 'FEEDER', name: 'Pomona', minutes: 35, bearing: 295, beyond: 'the-91', note: 'Over the county line, with a few scrappy rooms.' },
    { id: 'palm-springs', kind: 'PEER', name: 'Palm Springs and the desert', minutes: 60, bearing: 85, scene: 600, note: 'A desert scene running on a handful of all-ages rooms, several now closed.' },
    { id: 'san-diego', kind: 'PEER', name: 'San Diego', minutes: 90, bearing: 195, slug: 'san-diego', note: 'A bigger scene with a hall and a house tradition.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Riverside', route: 'downtown', note: 'Bars, restaurants and a pedestrian mall, with a few small all-ages rooms and shops that host.' },
    { id: 'eastside', name: 'the Eastside', route: 'old-side', note: 'Old bungalows by the freeway and the old grove streets. Garages and backyards in a long-running Latino neighborhood.' },
    { id: 'wood-streets', name: 'the Wood Streets', route: 'old-side', note: 'Historic houses on tree-lined streets. Quiet, and the noise complaints come fast.' },
    { id: 'arlington', name: 'Arlington', route: 'old-side', note: 'An older commercial strip of storefronts, tattoo shops and record stores.' },
    { id: 'casa-blanca', name: 'Casa Blanca', route: 'work-side', note: 'A small old neighborhood by the railroad. Cheap houses and garages.' },
    { id: 'rubidoux-jurupa', name: 'Rubidoux and Jurupa Valley', route: 'work-side', note: 'Warehouses, trailer lots and tract homes across the river. Backyard shows.' },
    { id: 'la-sierra', name: 'La Sierra', route: 'campus', note: 'The southwest side: student rentals and suburban tracts.' },
    { id: 'canyon-crest', name: 'Canyon Crest', route: 'campus', note: 'A hillside suburb by the university. Students, rentals, quiet streets.' },
    { id: 'orangecrest', name: 'Orangecrest and Mission Grove', route: 'campus', note: 'Newer southern suburbs of cul-de-sacs and parents. Few rooms.' }
  ],

  contacts: ['san-diego', 'los-angeles'],

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91, pop: 346000 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 },
    { name: 'Palm Springs', state: 'CA', lat: 33.83, lon: -116.55, pop: 45000 }
  ],
  roads: ['the 91', 'the 60', 'the 215', 'the 15', 'the 10'],

  words: {
    street: ['Market Street', 'Magnolia Avenue', 'University Avenue', 'Van Buren Boulevard', 'La Sierra Avenue'],
    water: ['the Santa Ana River', 'the river bottom'],
    hood: ['Eastside', 'Arlington', 'Casa Blanca', 'La Sierra', 'Canyon Crest', 'Orangecrest', 'Rubidoux', 'Wood Streets'],
    thing: ['freeway', 'stucco', 'backyard', 'swamp cooler', 'taco truck', 'patio umbrella'],
    weather: ['triple digits', 'brush fire smoke']
  },

  events: [
    { id: 'RIVERSIDE_91_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The 91 is torn up at the Corona interchange this week.',
      title: 'The 91 is a parking lot',
      body: 'A wreck at the Corona interchange has the whole 91 backed up on the night of your show. The kids from Corona and Pomona are stuck, and so is the band, and the AC in their van is out.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the rush', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the interchange.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones out west stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the surface streets together. They will remember that.' }
      ] }
  ]
});
