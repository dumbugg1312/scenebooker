SB.Cities.register('st-louis', {
  v: 1,
  slug: 'st-louis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['saint louis university', 'slu', 'washington university', 'wash u', 'university of missouri-st. louis', 'umsl', 'southern illinois university edwardsville', 'siue',
           'riverfront times', 'st. louis post-dispatch', 'post-dispatch', 'stlmag', 'st. louis magazine', 'st. louis public radio', 'kdhx', 'kwmu', 'st. louis cardinals',
           'st. louis blues', 'anheuser-busch', 'budweiser', 'boeing', 'bjc healthcare', 'centene', 'scott air force base', 'scott afb', 'gateway arch', 'the arch',
           'fair saint louis', 'st. louis zoo', 'citygarden', 'busch stadium', 'enterprise center', 'fox theatre', 'poplar street bridge', 'eads bridge', 'delmar loop'],
  blocklist: ['riverfront times*', 'post-dispatch*', 'budweiser*', 'anheuser*', 'kdhx*', 'gateway arch*', 'busch stadium*'],

  blurb: ['Brick two-family basements and old halls in South City hold a hardcore-leaning underground that books itself and makes its own posters.',
          'The venue that matters is usually closing or being rescued. The river splits the crowd between two states, and the summers are thick and wet.'],
  hard: 'Rooms close, and the river splits the crowd between two states.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A hardcore revival with an umbrella group that books shows several times a month.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'St. Louis' },
    { id: 'kirkwood', kind: 'FEEDER', name: 'Kirkwood and Webster Groves', minutes: 20, bearing: 245, note: 'Inner suburbs to the west.' },
    { id: 'belleville', kind: 'FEEDER', name: 'Belleville', state: 'IL', minutes: 25, bearing: 130, beyond: 'river-bridges', note: 'A suburb across the river with a punk house in a former convent. Its all-ages room has closed.' },
    { id: 'st-charles', kind: 'FEEDER', name: 'St. Charles', minutes: 30, bearing: 320, note: 'A big suburb of kids with cars.' },
    { id: 'edwardsville', kind: 'FEEDER', name: 'Edwardsville', state: 'IL', minutes: 30, bearing: 25, beyond: 'river-bridges', note: 'A college-adjacent town across the river.' },
    { id: 'festus', kind: 'FEEDER', name: 'Festus and Arnold', minutes: 35, bearing: 195, note: 'Working-class south county.' },
    { id: 'alton', kind: 'FEEDER', name: 'Alton', state: 'IL', minutes: 40, bearing: 5, beyond: 'river-bridges', note: 'A river town with its own house shows.' },
    { id: 'wentzville', kind: 'FEEDER', name: 'Wentzville', minutes: 40, bearing: 300, note: 'An exurb.' },
    { id: 'springfield-il', kind: 'PEER', name: 'Springfield', state: 'IL', minutes: 100, bearing: 5, note: 'Smaller. Bands pass through.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 120, bearing: 270, slug: 'columbia-mo', note: 'A campus town on the way to Kansas City.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign', state: 'IL', minutes: 160, bearing: 55, slug: 'champaign-il', note: 'A campus scene across the state line.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges', p: .03 }
  ],

  hoods: [
    { id: 'south-city', name: 'South City and Dutchtown', route: 'old-side', note: 'Brick two-families with basements and cheap rents. The heart of DIY.' },
    { id: 'carondelet', name: 'Carondelet', route: 'work-side', note: 'Far south city along the river. An old DIY and recording room stood here.' },
    { id: 'cherokee', name: 'Cherokee Street', route: 'downtown', note: 'An arts-and-bars strip in South City. A multipurpose arts venue there closed.' },
    { id: 'soulard', name: 'Soulard and Benton Park', route: 'old-side', note: 'Brick rowhouses and bars near the river.' },
    { id: 'grove', name: 'the Grove', route: 'downtown', note: 'A bar strip with bigger rooms.' },
    { id: 'loop', name: 'the Loop', route: 'campus', note: 'The student and music street in University City.' },
    { id: 'tower-grove', name: 'Tower Grove and Shaw', route: 'old-side', note: 'Big old houses and artists.' },
    { id: 'east-side', name: 'Belleville and East St. Louis', route: 'work-side', note: 'Across the river. An all-ages room there closed after four years.' }
  ],

  contacts: ['columbia-mo', 'champaign-il', 'kansas-city', 'chicago', 'indianapolis'],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 2270000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 1340000 },
    { name: 'Springfield', state: 'MO', lat: 37.21, lon: -93.29, pop: 480000 }
  ],
  roads: ['I-70', 'I-55', 'I-64', 'I-44', 'US 40'],

  words: {
    street: ['Cherokee Street', 'South Grand', 'Delmar Boulevard', 'Gravois Avenue', 'Broadway', 'Chippewa Street'],
    water: ['the Mississippi', 'the Missouri', 'the River Des Peres'],
    hood: ['Dutchtown', 'Carondelet', 'Soulard', 'Benton Park', 'Tower Grove', 'Shaw', 'the Grove'],
    thing: ['toasted ravioli', 'brick two-family', 'generator', 'river bridge', 'limestone foundation'],
    weather: ['thick humidity', 'ice storm']
  },

  events: [
    { id: 'ST_LOUIS_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on one of the river bridges this week.',
      title: 'The bridge is a parking lot',
      body: 'A wreck has one of the river bridges down to a single lane, and the others are jammed behind it. The bands and the kids from the Illinois side are stuck in the dark.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The Illinois side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together. They\'ll remember that.' }
      ] }
  ]
});
