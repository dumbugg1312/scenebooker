SB.Cities.register('detroit', {
  v: 1,
  slug: 'detroit',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['wayne state university', 'university of detroit mercy', 'university of michigan', 'michigan state', 'eastern michigan university', 'oakland university',
           'detroit free press', 'detroit news', 'metro times', 'hour detroit', 'wdet', 'wxyz', 'wjr', 'detroit lions', 'detroit tigers', 'detroit red wings', 'detroit pistons',
           'general motors', 'chrysler', 'stellantis', 'fiat chrysler', 'henry ford health', 'little caesars', 'quicken loans', 'rocket mortgage', 'ilitch', 'comerica',
           'greektown casino', 'motorcity casino', 'mgm grand detroit', 'north american international auto show', 'auto show', 'woodward dream cruise', 'detroit grand prix',
           'ford fireworks', 'thanksgiving parade', 'selfridge air national guard base', 'motown', 'detroit lions', 'tigers', 'red wings', 'ambassador bridge', 'detroit-windsor tunnel'],
  blocklist: ['metro times*', 'detroit free press*', 'motown*', 'little caesars*', 'greektown*', 'rocket mortgage*', 'dream cruise*'],

  blurb: ['A huge, shrunken factory city with blocks of empty lots between everything. Deep punk and hardcore roots run through the Hamtramck bars and the basements in the southwest.',
          'Nobody lives close to anybody. Houses cost almost nothing and space is everywhere, so the scene runs on cars, old halls and a lot of nerve.'],
  hard: 'Everything is far apart, and bars hold the age rules so all-ages rooms are rare.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A hardcore legacy from the old basement-and-hall days, and the basements are still going.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Detroit' },
    { id: 'ferndale', kind: 'FEEDER', name: 'Ferndale', minutes: 20, bearing: 350, note: 'An inner suburb where a lot of bands live.' },
    { id: 'dearborn', kind: 'FEEDER', name: 'Dearborn', minutes: 20, bearing: 250, note: 'A big suburb by the factory complex.' },
    { id: 'warren', kind: 'FEEDER', name: 'Warren', minutes: 25, bearing: 5, note: 'A blue-collar suburb with metal and punk kids.' },
    { id: 'royal-oak', kind: 'FEEDER', name: 'Royal Oak', minutes: 25, bearing: 340, note: 'A bar-heavy suburb.' },
    { id: 'taylor', kind: 'FEEDER', name: 'Taylor', minutes: 30, bearing: 215, note: 'A south suburb with garage bands.' },
    { id: 'livonia', kind: 'FEEDER', name: 'Livonia', minutes: 30, bearing: 270, note: 'A west suburb.' },
    { id: 'mount-clemens', kind: 'FEEDER', name: 'Mount Clemens', minutes: 35, bearing: 25, note: 'A small bar circuit to the northeast.' },
    { id: 'pontiac', kind: 'FEEDER', name: 'Pontiac', minutes: 40, bearing: 335, note: 'An old auto town with cheap rooms.' },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', minutes: 45, bearing: 265, slug: 'ann-arbor-mi', note: 'A campus scene with steady house shows.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 60, bearing: 185, slug: 'toledo-oh', note: 'A smaller scene to the south.' },
    { id: 'flint', kind: 'PEER', name: 'Flint', minutes: 70, bearing: 335, slug: 'flint-mi', note: 'Smaller and tough.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 90, bearing: 295, slug: 'lansing-mi', note: 'A mid-size scene up the highway.' }
  ],

  hoods: [
    { id: 'hamtramck', name: 'Hamtramck', route: 'old-side', note: 'An independent enclave of old two-family houses and lots of bars, ringed by the city. The center of the punk bar scene.' },
    { id: 'corktown', name: 'Corktown', route: 'downtown', note: 'The oldest neighborhood, west of downtown: bars and old houses, and rents on the way up.' },
    { id: 'southwest', name: 'Southwest Detroit', route: 'work-side', note: 'A Mexican neighborhood by the rail yards. A house here hosts basement punk shows.' },
    { id: 'cass', name: 'Cass Corridor and Midtown', route: 'campus', note: 'A gritty strip with an art-space legacy and the early hardcore roots.' },
    { id: 'delray', name: 'Delray', route: 'work-side', note: 'A heavy-industry pocket by the river that once held an all-ages hall.' },
    { id: 'eastern-market', name: 'Eastern Market', route: 'downtown', note: 'Market sheds and warehouses with a few loft spaces.' },
    { id: 'ferndale', name: 'Ferndale', route: 'old-side', note: 'An inner suburb of bars and nightlife. More expensive than the city.' },
    { id: 'east-side', name: 'the East Side and Jefferson Chalmers', route: 'work-side', note: 'Cheap houses on a grid by the river.' }
  ],

  contacts: ['ann-arbor-mi', 'toledo-oh', 'flint-mi', 'lansing-mi', 'cleveland', 'chicago'],

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38, pop: 6200000 },
    { name: 'Windsor', state: 'ON', lat: 42.31, lon: -83.04, pop: 330000 }
  ],
  roads: ['I-75', 'I-94', 'I-96', 'M-10', 'Woodward'],

  words: {
    street: ['Woodward', 'Michigan Avenue', 'Gratiot', 'Joseph Campau', 'Caniff', 'Jefferson'],
    water: ['the Detroit River'],
    hood: ['Hamtramck', 'Corktown', 'Delray', 'Cass Corridor', 'Springwells', 'Jefferson Chalmers', 'Eastern Market'],
    thing: ['empty lot', 'pothole', 'rail crossing', 'road salt', 'Polish bakery', 'flooded basement'],
    weather: ['lake-effect snow', 'summer storm']
  },

  events: [
    { id: 'DETROIT_BASEMENT_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'A line of violent storms is headed across the county.',
      title: 'The basement is under water',
      body: 'The storm dumped hours of rain on the block, and the basement is standing in four inches of water. The host has a shop vac and not much hope.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once it drains', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'UP', label: 'Move it up to the first floor', likely: 'Smaller and louder, with the neighbors right there.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The whole bill played in a living room. People stood on the stairs.' },
        { id: 'VAC', label: 'Pump it out and play on', likely: 'Costs forty dollars. Most of the crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water went down by eight. The floor was damp and the room was half full.' }
      ] }
  ]
});
