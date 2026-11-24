SB.Cities.register('springfield-ma', {
  v: 1,
  slug: 'springfield-ma',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['baystate medical center', 'baystate', 'massmutual', 'massmutual center', 'smith & wesson', 'general dynamics', 'mercy medical center',
           'basketball hall of fame', 'hall of fame', 'bright nights', 'eastern states exposition', 'the big e', 'springfield college', 'amtrak',
           'bradley international', 'bradley airport', 'pioneer valley transit authority', 'pvta', 'five college', 'five colleges', 'five college consortium',
           'mgm springfield', 'mgm', 'springfield thunderbirds', 'thunderbirds', 'springfield republican', 'masslive', 'valley advocate', 'wfcr',
           'dunkin', 'dunkin donuts', 'friendly\'s', 'white castle',
           'the mill river pump house', 'mill river pump house', 'tapley street annex', 'sixteen acres lanes', 'st. casimir\'s lower hall', 'st. casimirs lower hall',
           'the orchard loading dock', 'orchard loading dock', 'dwight street social club', 'chapman yard', 'brightwood boxing gym',
           'armory hill bocce club', 'forest park rec annex', 'the pioneer pallet co.', 'pioneer pallet', 'boston road skate and sub',
           'springfield museums', 'springfield technical community college', 'stcc', 'american international college', 'western new england university',
           'westover air reserve base', 'barnes air national guard base', 'springfield business improvement district', 'springfield pride parade',
           'caribbean parade', 'new england metal & hardcore fest', 'new england metal and hardcore festival', 'western massachusetts news', 'wwlp',
           'nepm', 'new england public media', 'western mass news', 'stearns square', 'enshrinement weekend', 'bright nights at forest park', 'big e parade'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['baystate*', 'massmutual*', 'smith & wesson*', 'mgm*', 'thunderbirds*', 'valley advocate*', 'dunkin*', 'hall of fame*'],

  blurb: ['It\'s a heavy mill town of halls, basements and old heads who remember the metalcore boom.',
          'The scene is small and scattered, and local bands play the valley more than they play at home.'],
  hard: 'Few rooms, and every one depends on one landlord or one parent.',
  region: 'the Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Springfield' },
    { id: 'west-springfield', kind: 'FEEDER', name: 'West Springfield', minutes: 10, bearing: 275, note: 'Across the river: strip-mall suburb with cheap warehouse units. Kids come over for shows.' },
    { id: 'chicopee', kind: 'FEEDER', name: 'Chicopee', minutes: 15, bearing: 15, note: 'A Polish and Irish mill city with an air reserve base; real shows have happened here.' },
    { id: 'holyoke', kind: 'FEEDER', name: 'Holyoke', minutes: 20, bearing: 335, note: 'A canal and paper-mill city, mostly Puerto Rican, with its own mill-space artists.' },
    { id: 'enfield', kind: 'FEEDER', name: 'Enfield', state: 'CT', minutes: 20, bearing: 180, note: 'A Connecticut border suburb tied to the Springfield crowd.' },
    { id: 'westfield', kind: 'FEEDER', name: 'Westfield', minutes: 25, bearing: 280, note: 'A state college town with a guard base and a small scene of its own.' },
    { id: 'palmer', kind: 'FEEDER', name: 'Palmer and Monson', minutes: 30, bearing: 95, note: 'Rail-junction mill towns on the rural edge; kids who drive in.' },
    { id: 'northampton', kind: 'FEEDER', name: 'Northampton', minutes: 30, bearing: 350, note: 'A college and arts town with a strong scene of its own and the draw for kids who want a nicer night.' },
    { id: 'amherst', kind: 'FEEDER', name: 'Amherst', minutes: 35, bearing: 25, note: 'A big state university and four more colleges; students and a real local scene.' },
    { id: 'greenfield', kind: 'FEEDER', name: 'Greenfield', minutes: 45, bearing: 0, note: 'The northern anchor of the valley: rural and countercultural.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', minutes: 55, bearing: 85, slug: 'worcester-ma', note: 'The east-west pipeline for bands, with a bigger scene and more rooms.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', state: 'CT', minutes: 60, bearing: 190, slug: 'new-haven-ct', note: 'A college and arts city that shares some touring bands.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', slug: 'albany-ny', state: 'NY', minutes: 85, bearing: 290, scene: 1500, note: 'The mirror image to the west and the next stop on a tour.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', slug: 'providence', state: 'RI', minutes: 90, bearing: 110, scene: 2500, note: 'A bigger, arts-heavy scene.' }
  ],

  hoods: [
    { id: 'metro-center', name: 'downtown', route: 'downtown', note: 'A compact grid of bars, club stages and empty upper floors, with a casino at the south end. Mostly 21 and over.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'The old Italian neighborhood: social clubs and church halls on Main Street.' },
    { id: 'mason-square', name: 'Mason Square and the Hill', route: 'old-side', note: 'Storefronts, church basements and community halls up the hill, long ignored by outside money.' },
    { id: 'brightwood', name: 'Brightwood and the North End', route: 'work-side', note: 'Dense Puerto Rican blocks cut off by the elevated highway. Cheap, ignored, proud; mill space and backyards.' },
    { id: 'forest-park', name: 'Forest Park and Sixteen Acres', route: 'campus', note: 'Quiet capes and subdivisions where the finished basements are, and parents who tolerate it.' },
    { id: 'indian-orchard', name: 'Indian Orchard', route: 'work-side', note: 'A self-contained mill village in the northeast corner with old mill rooms, church halls and yards.' },
    { id: 'liberty-heights', name: 'Liberty Heights and Six Corners', route: 'old-side', note: 'Big old houses with real basements, rented cheap to students and artists.' },
    { id: 'boston-road', name: 'Boston Road and East Springfield', route: 'work-side', note: 'Chain stores, motels and industrial park units: dead-end commercial and cheap.' }
  ],

  contacts: ['worcester-ma', 'new-haven-ct', 'hartford', 'albany-ny', 'providence'],

  calendar: [
    { id: 'pride', label: 'Pride weekend', tag: 'parade', month: 6, week: 1, dows: [4, 5], can: [.88, .90, .90], hoods: ['metro-center'], elsewhere: [1, .98, .98] },
    { id: 'italian-feast', label: 'the Italian feast', tag: 'festival', month: 7, weeks: [2, 3], dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['south-end'], elsewhere: [1, .98, .98] },
    { id: 'summer-parade', label: 'the big summer neighborhood parade', tag: 'parade', month: 8, weeks: [3, 4], dows: [5], can: [.90, .85, .85], hoods: ['brightwood', 'mason-square'], elsewhere: [1, .97, .97] },
    { id: 'regional-fair', label: 'the big regional fair', tag: 'fair', month: 9, weeks: [3, 5], dows: [4, 5, 6], can: [.90, .85, .85] },
    { id: 'lights-drive', label: 'the lights drive at the big park', tag: 'festival', month: 12, weeks: [1, 4], dows: [0, 1, 2, 3, 4, 5, 6], can: [.95, .92, .92], hoods: ['forest-park'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 121000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 99000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 190000 }
  ],
  roads: ['I-91', 'I-90', 'I-291', 'US 20', 'US 5', 'Route 57'],

  words: {
    street: ['Main Street', 'State Street', 'Dwight Street', 'Boston Road', 'Memorial Avenue', 'Court Square'],
    water: ['the Connecticut River', 'the Chicopee River'],
    hood: ['Brightwood', 'Indian Orchard', 'Sixteen Acres', 'Pine Point', 'McKnight', 'Six Corners', 'Liberty Heights', 'Old Hill', 'Memorial Square'],
    thing: ['three-decker', 'packie', 'grinder', 'rotary', 'mill room', 'nor\'easter', 'bocce court', 'social club', 'practice room'],
    weather: ['nor\'easter', 'ice storm']
  },

  events: [
    { id: 'SPRINGFIELD_MA_FAIR_JAM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The big regional fair opens across the river, and the bridges will be a parking lot.',
      title: 'The bridges are a parking lot',
      body: 'The fair has I-91 and the river bridges backed up, so a show downtown or on the west bank has bands stuck for hours and a half-empty room.',
      options: [
        { id: 'EARLIER', label: 'Move the start up so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: 0.8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: 0.3, beyond: true }],
          result: 'The backup never cleared, and the people across the river stayed home.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'SPRINGFIELD_MA_YARD_NOISE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor has been talking about calling the police about the amps.',
      title: 'A patrol car at the second band',
      body: 'The amplification rule lets a patrol car shut down a yard show even at eight on a Saturday. It\'s the second band, and the amps can be heard down the block.',
      options: [
        { id: 'DOWN', label: 'Turn the amps down', likely: 'It\'s a quieter, looser set, but the room still has a night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The amps came down and the set got tighter, and the officer drove off.' },
        { id: 'INSIDE', label: 'Move the rest of the bill inside', likely: 'It\'s smaller and louder, and nobody can hear it from the street.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'The bill moved indoors, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'They may shut it down for good.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }],
          result: 'The patrol car came back at nine, and the night ended on a flat note.' }
      ] },

    { id: 'SPRINGFIELD_MA_PARK_LIGHTS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [11, 12, 1] },
      telegraph: 'The lights drive at the big park opens, and traffic is already backing into the neighborhood.',
      title: 'Traffic is in the basement streets',
      body: 'For five weeks the lights drive backs traffic into the streets where the finished basements are, so a basement show there needs a back-road route and an early start.',
      options: [
        { id: 'EARLY', label: 'Open early and send everyone the back way', likely: 'Most get in before the cars, but it\'s thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
          result: 'You opened doors early and the back road worked, and the people who came parked a mile away.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The cars crawled past the house all night, and half the list gave up.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
