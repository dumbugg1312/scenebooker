SB.Cities.register('new-haven-ct', {
  v: 1,
  slug: 'new-haven-ct',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['yale', 'yale university', 'yale new haven hospital', 'yale bowl', 'yale daily news', 'yale-harvard', 'harvard', 'knights of columbus',
           'southern connecticut state', 'gateway community college', 'albertus magnus', 'university of new haven', 'quinnipiac university',
           'new haven register', 'new haven independent', 'grand news', 'metro-north', 'shore line east', 'hartford line', 'ct transit', 'mixmaster',
           'international festival of arts and ideas', 'powder house day', 'cherry blossom festival', 'italian feast', 'st. patrick\'s day parade', 'open studios',
           'hartford whalers', 'whalers', 'mohegan sun', 'foxwoods', 'submarine base', 'coast guard academy', 'hurricane irene', 'hurricane sandy',
           'vfw', 'american legion', 'elks',
           'dwight street annex', 'the grand avenue social', 'grand avenue social', 'oyster shell hall', 'wooster basement', 'sixth floor, ferry street',
           'the winchester loft', 'council 41 hall', 'edgewood carriage house', 'sound side lanes', 'the long wharf boathouse', 'third floor triple', 'quinnipiac boiler room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm' in game text. */
  blocklist: ['yale*', 'new haven register*', 'new haven independent*', 'knights of columbus*', 'metro-north*', 'mixmaster*', 'oyster shell hall*', 'dwight street annex*'],

  blurb: ['A cramped college-and-hospital city where damp basements, social halls and old factory floors carry the shows.',
          'The hardcore here is heavy and old, rent never stops climbing, and every house has a landlord upstairs.'],
  hard: 'Few rooms, rising rents, and every house has a landlord upstairs.',
  region: 'the Northeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'This town has a heavy hardcore lineage, and the old heads and kids both still turn out for it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'New Haven' },
    { id: 'west-haven', kind: 'FEEDER', name: 'West Haven', minutes: 10, bearing: 250, pop: 55000, note: 'A beach and working-class town of halls and clubs, with some scene of its own.' },
    { id: 'east-haven', kind: 'FEEDER', name: 'East Haven', minutes: 10, bearing: 100, pop: 30000, note: 'Italian-American shoreline town. Little scene: the kids come to the city.' },
    { id: 'hamden', kind: 'FEEDER', name: 'Hamden', minutes: 15, bearing: 350, pop: 60000, note: 'A big suburb of garages and strip malls that supplies the city\'s bands.' },
    { id: 'branford', kind: 'FEEDER', name: 'Branford', minutes: 20, bearing: 90, pop: 28000, note: 'A harbor town with some basement bands.' },
    { id: 'wallingford-meriden', kind: 'FEEDER', name: 'Wallingford and Meriden', minutes: 20, bearing: 10, note: 'Meriden is an old silver and mill city with a real scene; Wallingford is the quieter suburb.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 25, bearing: 245, pop: 52000, note: 'A beach suburb with its own small scene.' },
    { id: 'valley', kind: 'FEEDER', name: 'Ansonia, Derby and Shelton', minutes: 25, bearing: 295, note: 'Small, tough old mill towns on the Naugatuck, with some hardcore of their own.' },
    { id: 'shoreline', kind: 'FEEDER', name: 'Guilford and Madison', minutes: 30, bearing: 80, note: 'Small, affluent beach towns of kids with cars and money.' },
    { id: 'waterbury', kind: 'FEEDER', name: 'Waterbury', minutes: 40, bearing: 320, pop: 114000, scene: 400, note: 'An old brass city with big Italian, Puerto Rican and Albanian communities.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown', minutes: 35, bearing: 30, pop: 47000, note: 'A river city with a liberal arts college, a college radio station and a lively art scene.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', state: 'CT', minutes: 45, bearing: 15, scene: 800, note: 'The capital, called dull and corporate by New Haven. The two trade crowds all the time.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', state: 'MA', minutes: 60, bearing: 5, slug: 'springfield-ma', note: 'An hour up I-91, on the circuit that tours link.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 90, bearing: 70, scene: 1200, note: 'A bigger college and arts city up I-95.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 100, bearing: 40, slug: 'worcester-ma', note: 'A bigger mill city on the same regional circuit.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Ninth Square', route: 'downtown', note: 'Around the Green: licensed bars, theaters and a few mid-size rooms. Priced out and getting corporate; DIY survives only in upper floors and the edges.' },
    { id: 'fair-haven', name: 'Fair Haven', route: 'work-side', note: 'Triple-deckers and old river factories across the bridges, heavily Latino. Cheap and mostly ignored: basements, lofts and practice rooms, with gentrification creeping in.' },
    { id: 'east-rock', name: 'East Rock', route: 'campus', note: 'Victorian flats under the ridge, full of grad students and neighbors who call the police. Basement shows are short-lived.' },
    { id: 'westville', name: 'Westville', route: 'old-side', note: 'A village center with galleries and houses with real basements and yards. Artistic, with rising rents and noise complaints.' },
    { id: 'edgewood', name: 'Edgewood and West River', route: 'old-side', note: 'Cut-up Victorians, triple-deckers and old industrial stock, mixed and working-class. Students and artists found cheap rent, and it is heating up.' },
    { id: 'the-hill', name: 'the Hill and Dwight', route: 'work-side', note: 'Dense triple-deckers around the hospital, which keeps expanding. Better for practice than for hosting a public show.' },
    { id: 'newhallville', name: 'Newhallville and Dixwell', route: 'old-side', note: 'Long-standing Black neighborhoods with old community centers and church halls. A place to rent a hall, not to treat as a cheap punk district.' },
    { id: 'city-point', name: 'City Point, the Annex and the harbor', route: 'work-side', note: 'Sparse waterfront of warehouses, boat storage and practice rooms. The loudest-tolerant spots, and the farthest from where the kids live.' }
  ],

  contacts: ['springfield-ma', 'worcester-ma', 'waterbury-ct', 'norwich-ct'],

  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 121000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 190000 },
    { name: 'Bridgeport', state: 'CT', lat: 41.19, lon: -73.2, pop: 148000 },
    { name: 'Stamford', state: 'CT', lat: 41.05, lon: -73.54, pop: 136000 }
  ],
  roads: ['I-95', 'I-91', 'Route 15', 'Route 8', 'Route 34', 'Route 1'],

  words: {
    street: ['Chapel Street', 'Grand Avenue', 'Whalley Avenue', 'Whitney Avenue', 'Orange Street', 'Ferry Street', 'Dixwell Avenue', 'Wooster Street'],
    water: ['the harbor', 'the Quinnipiac', 'Long Island Sound', 'the West River'],
    hood: ['Fair Haven', 'East Rock', 'Westville', 'Edgewood', 'the Hill', 'Dwight', 'Newhallville', 'Dixwell', 'Wooster Square', 'City Point', 'the Annex', 'Long Wharf'],
    thing: ['triple-decker', 'apizza', 'damp basement', 'elm', 'oyster shell', 'tomato pie', 'bakery', 'taqueria', 'washer and dryer', 'social hall', 'milk crate', 'practice space'],
    weather: ['nor\'easter', 'slush', 'basement flood']
  },

  events: [
    { id: 'NEW_HAVEN_CT_BASEMENT_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN' },
      telegraph: 'A long, hard rain is forecast all week.',
      title: 'The basement floods',
      body: 'The rain has pushed an inch of water across the basement floor. The merch table goes up on milk crates and the singer is standing next to the dryer.',
      options: [
        { id: 'CRATES', label: 'Put everything on milk crates and play on', likely: 'Wet and loud. Some of the crowd stays upstairs.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The floor was wet and the band played on crates. Nobody forgot it.' },
        { id: 'MOVE', label: 'Move it a day, once the floor dries', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'HALL', label: 'Ask a social hall to take it for the night', likely: 'Dry and bigger, but with a hall member watching.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A hall member asked what the night was called, then stayed for a set.' }
      ] }
  ]
});
