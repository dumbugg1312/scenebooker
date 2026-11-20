SB.Cities.register('naples-fl', {
  v: 1,
  slug: 'naples-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['florida gulf coast university', 'fgcu', 'dunk city', 'ave maria university', 'florida southwestern state college', 'hodges university', 'keiser university',
           'naples daily news', 'wgcu', 'beasley', 'beasley broadcast group', 'publix', 'pub sub', 'pub subs', 'waffle house', 'hurricane ian', 'hurricane irma', 'hurricane donna',
           'swamp buggy', 'swamp buggy races', 'lpga', 'naples half marathon', 'pickleball championship', 'swamp cabbage festival', 'collier area transit',
           'paradise coast', 'seminole casino', 'macdill', 'american legion', 'vfw', 'elks',
           'the estates annex', 'estates annex', 'pine ridge carport', 'cypress knee hall', 'the lanai', 'lely flex unit 9', 'bayshore back lot',
           'tamiami tire and hall', 'the retention pond', 'gate grid garage', 'camp keais barn', 'the sawgrass room', 'airport road unit c'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm' in game text. */
  blocklist: ['naples daily news*', 'fgcu*', 'florida gulf coast*', 'publix*', 'waffle house*', 'estates annex*', 'cypress knee hall*', 'sawgrass room*'],

  blurb: ['Garage doors and backyards in the heat, since nobody here has a basement.',
          'The neighbors are rich, retired and quick to call the sheriff, and the bus stops running before the last band does.'],
  hard: 'No basements, rich retiree neighbors, and nowhere to go after the bus stops.',
  region: 'the Gulf coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Gainesville', state: 'FL', lat: 29.65, lon: -82.32 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Naples' },
    { id: 'golden-gate', kind: 'FEEDER', name: 'Golden Gate and the Estates', minutes: 20, bearing: 55, pop: 25300, note: 'A young, working-class grid and a huge rural subdivision of acre lots and dirt roads: where the backyard show actually lives.' },
    { id: 'bonita-estero', kind: 'FEEDER', name: 'Bonita Springs and Estero', minutes: 30, bearing: 350, note: 'Retiree and suburb belts with a university at the edge. Not cheap.' },
    { id: 'marco', kind: 'FEEDER', name: 'Marco Island', minutes: 35, bearing: 170, pop: 15800, note: 'An older island town behind two bridges. A few kids and almost no scene.' },
    { id: 'ave-maria', kind: 'FEEDER', name: 'Ave Maria', minutes: 45, bearing: 40, pop: 6200, note: 'A planned, quiet new town with a small university. A handful of students drive in.' },
    { id: 'immokalee', kind: 'FEEDER', name: 'Immokalee', minutes: 55, bearing: 25, pop: 24600, note: 'A young farmworker town far inland with its own music and youth culture, and a long drive from anywhere.' },
    { id: 'everglades-city', kind: 'FEEDER', name: 'Everglades City', minutes: 55, bearing: 130, pop: 350, note: 'A fishing village at the end of the road. A few kids come up for a show.' },
    { id: 'lehigh-acres', kind: 'FEEDER', name: 'Lehigh Acres', minutes: 60, bearing: 15, pop: 114300, note: 'A huge young exurb of cheap lots and vacant land. Backyard shows and a lot of kids.' },
    { id: 'fort-myers', kind: 'PEER', name: 'Fort Myers and Cape Coral', state: 'FL', minutes: 45, bearing: 345, slug: 'cape-coral-fl', note: 'Bigger and scruffier with more rooms. Crowds go both ways, mostly south to north.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', state: 'FL', minutes: 135, bearing: 345, scene: 400, note: 'A pricier arts town up the coast with a small, separate scene.' }
  ],

  hoods: [
    { id: 'old-naples', name: 'Old Naples and Fifth Avenue', route: 'downtown', note: 'Canal mansions and boutique streets. No shows are possible: it is where the kids work and where flyers are never allowed.' },
    { id: 'east-naples', name: 'East Naples and Bayshore', route: 'work-side', note: 'Block-and-stucco ranches, mobile home parks and old strip commercial. Bayshore is being priced up, but the lots between US 41 and Collier Boulevard are still cheap.' },
    { id: 'golden-gate-hood', name: 'Golden Gate City', route: 'work-side', note: 'A dense, young, mostly Hispanic grid northeast of town. Garages and yards, and the best taquerias.' },
    { id: 'estates', name: 'the Estates', route: 'work-side', note: 'Acre lots, canals, dirt roads and sheds, with no close neighbors and a stretched-thin sheriff. Generator shows live here.' },
    { id: 'naples-park', name: 'Naples Park and North Naples', route: 'old-side', note: 'Small 1950s ranches with carports, being torn down one by one for big new houses. The likeliest carport show.' },
    { id: 'industrial', name: 'the Airport Road industrial strip', route: 'work-side', note: 'Light-industrial bays rented for a few hundred a month. Practice rooms and the odd Friday show, until an inspector comes.' },
    { id: 'pine-ridge', name: 'Pine Ridge and the gated suburbs', route: 'campus', note: 'Golf and gated money. Suburban kids with a garage and a parent who tolerates it, and the HOA that does not.' },
    { id: 'immokalee-hood', name: 'Immokalee', route: 'old-side', note: 'A young farm town with church halls, backyards and community rooms.' }
  ],

  contacts: ['cape-coral-fl'],

  points: [
    { name: 'Fort Lauderdale', state: 'FL', lat: 26.12, lon: -80.14, pop: 185000 },
    { name: 'Sarasota', state: 'FL', lat: 27.34, lon: -82.53, pop: 58000 },
    { name: 'Port Charlotte', state: 'FL', lat: 26.98, lon: -82.09, pop: 60600 },
    { name: 'Fort Pierce', state: 'FL', lat: 27.45, lon: -80.33, pop: 49000 }
  ],
  roads: ['I-75', 'US 41', 'the Alley', 'Highway 29', 'Highway 951', 'Immokalee Road'],

  words: {
    street: ['the Tamiami Trail', 'Immokalee Road', 'Golden Gate Parkway', 'Pine Ridge Road', 'Airport-Pulling Road', 'Collier Boulevard', 'Bayshore Drive', 'US 41'],
    water: ['the Gordon River', 'Naples Bay', 'Big Cypress', 'the Ten Thousand Islands'],
    hood: ['Naples Park', 'East Naples', 'Golden Gate', 'Golden Gate Estates', 'Pelican Bay', 'Port Royal', 'Lely', 'Vineyards', 'Immokalee', 'Marco Island'],
    thing: ['generator', 'pole barn', 'gator', 'screened porch', 'canal', 'taco truck', 'shuffleboard', 'early-bird special', 'sawgrass', 'mosquito', 'garage door', 'sheriff car', 'bug spray', 'extension cord'],
    weather: ['afternoon thunderstorm', 'humidity', 'storm cone', 'season']
  },

  events: [
    { id: 'NAPLES_FL_STORM_CORD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'Afternoon thunderstorms are building over the Gulf every day this week.',
      title: 'Storm on the extension cord',
      body: 'The yard show runs off a long cord from the shed, and the afternoon storm has soaked the whole run. Nobody wants to stand in a wet yard with a live amp.',
      options: [
        { id: 'GARAGE', label: 'Roll it into the garage and open the door', likely: 'Smaller and louder, with a dry floor and the neighbors close.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The band played with the door up and the crowd stood in the driveway under the eaves.' },
        { id: 'WAIT', label: 'Wait out the storm and start late', likely: 'Some of the kids give up and go home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The rain stopped around ten. The ones who waited got the whole set.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
