SB.Cities.register('canton-oh', {
  v: 1,
  slug: 'canton-oh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['pro football hall of fame', 'hall of fame village', 'hall of fame game', 'enshrinement week', 'aultman', 'cleveland clinic mercy',
           'malone university', 'walsh university', 'kent state stark', 'kent state', 'stark state', 'university of mount union', 'mount union',
           'college of wooster', 'sarta', 'canton repository', 'first friday', 'ohio state', 'browns', 'amtrak', 'capitol limited',
           'akron-canton airport', 'vfw', 'elks', 'moose lodge', 'fraternal order of eagles', 'massillon tigers',
           'the nimishillen annex', 'nimishillen annex', 'dueber avenue hall', 'the brickyard back room', 'brickyard back room', 'lincoln way rec',
           'fourth street upstairs', 'post 316', 'the roller bearing club', 'roller bearing club', 'hoover road garage', 'the tuscarawas room',
           'st. casimir\'s basement', 'the cleveland ave loft', 'cleveland ave loft', 'mill street lanes',
           'hall of fame game', 'enshrinement festival', 'grand parade', 'community parade', 'balloon classic', 'sugardale fan fest', 'tom benson hall of fame stadium', 'stark county fair', 'stark county fairgrounds', 'african-american arts festival', 'greater alliance carnation festival', 'canton music fest', 'monster fest', 'stark pride', 'centennial plaza', 'ideastream', 'betterkenmore', 'better kenmore', 'visit canton', 'wkyc', 'news 5 cleveland', 'cleveland scene', 'bandsintown', 'songkick', 'hypebot', 'allevents', 'dodiy', 'the hard times', 'ohio hip-hop awards', 'ohio division of liquor control'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['canton repository*', 'hall of fame*', 'enshrinement*', 'walsh university*', 'mount union*', 'sarta*'],

  blurb: ['Canton lost its downtown punk and metal club and borrows all-ages nights from Akron. The riff-heavy bands stuck around.',
          'Punk and metal share bills for five bucks, and everyone in the room is in two or three of the bands.'],
  hard: 'The old downtown room is gone, so nobody has a place that holds a crowd.',
  region: 'the Rust Belt',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Canton' },
    { id: 'north-canton', kind: 'FEEDER', name: 'North Canton', minutes: 10, bearing: 5, scene: 120, note: 'A prosperous suburb with a small college. Half the booker\'s kids come from here.' },
    { id: 'massillon', kind: 'FEEDER', name: 'Massillon', minutes: 15, bearing: 270, pop: 32000, note: 'The football and mill town and old rival, with a small overlapping scene.' },
    { id: 'louisville', kind: 'FEEDER', name: 'Louisville', minutes: 15, bearing: 75, pop: 9000, note: 'A football-first small town to the east. Little scene.' },
    { id: 'canal-fulton', kind: 'FEEDER', name: 'Canal Fulton', minutes: 20, bearing: 320, note: 'A canal-heritage small town with little scene.' },
    { id: 'alliance', kind: 'FEEDER', name: 'Alliance', minutes: 25, bearing: 55, note: 'A small college town with a real if small scene.' },
    { id: 'new-philadelphia', kind: 'FEEDER', name: 'New Philadelphia and Dover', minutes: 30, bearing: 195, note: 'Old German-heritage mill and farm towns down the interstate.' },
    { id: 'kent', kind: 'FEEDER', name: 'Kent', minutes: 40, bearing: 20, pop: 28000, note: 'A big university town with a bigger scene: a magnet more than a feeder.' },
    { id: 'wooster', kind: 'FEEDER', name: 'Wooster', minutes: 40, bearing: 265, pop: 27000, note: 'A college and farm-county seat with a small scene of its own.' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem', minutes: 45, bearing: 80, note: 'A mill and farm town with some punk presence.' },
    { id: 'millersburg', kind: 'FEEDER', name: 'Millersburg', minutes: 50, bearing: 240, note: 'Farm and Amish country. Almost no scene, and the teens come in quietly.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', state: 'OH', minutes: 45, bearing: 355, slug: 'akron-oh', note: 'The real music town up the interstate, where the shows are better and the bars harder to get into.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', state: 'OH', minutes: 60, bearing: 60, slug: 'youngstown-oh', note: 'The other shrunken steel city, a near twin that trades bands and crowds.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 150, bearing: 25, slug: 'erie-pa', note: 'A distant lake city of similar size.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Arts District', route: 'downtown', note: 'Old commercial brick with a restored movie palace and plenty of empty upstairs space. Storefronts and bar back rooms; the likeliest place to get priced upward.' },
    { id: 'northwest-strip', name: 'the northwest strip', route: 'campus', note: 'Hotels and chain restaurants around the big football campus. Nothing DIY, and no parking on event days.' },
    { id: 'east-side', name: 'the southeast and industrial east side', route: 'work-side', note: 'Old plants, rail lines and working-class houses along the creek. Warehouse practice spaces; cheap and ignored.' },
    { id: 'west-park', name: 'West Park and Malone', route: 'campus', note: 'Student rentals and older houses with basements, but the neighbors are close.' },
    { id: 'market-heights', name: 'Market Heights, Mt. Vernon and Dueber', route: 'old-side', note: 'Older residential streets north and east of downtown. Cheap duplexes with basements: the realistic home of house shows.' },
    { id: 'ridgewood', name: 'Ridgewood', route: 'old-side', note: 'Wealthy historic streets where a house show is shut down fast. A source of band kids, not rooms.' },
    { id: 'belden', name: 'Belden Village and Whipple Avenue', route: 'campus', note: 'Malls and chain strips in the township, the center of gravity for suburban teens. Skate and mall hanging, not shows.' },
    { id: 'north-canton-side', name: 'North Canton', route: 'town:north-canton', note: 'A prosperous suburb to the north with a small college and rented halls. Where half the band kids come from.' }
  ],

  rooms: [
    { id: 'market-basement', kind: 'HOUSE', hood: 'market-heights', cap: 40, curfew: 1350, ac: false, start: true, pressure: 50,
      note: 'A basement under an old duplex north of downtown. The neighbors are close and the summer heat makes it miserable.' },
    { id: 'west-park-house', kind: 'HOUSE', hood: 'west-park', cap: 50, curfew: 1320, ac: false, pressure: 55,
      note: 'A student rental near the small university. Students and landlords turn over every year, and that kills a house fast.' },
    { id: 'east-bay', kind: 'DIY', hood: 'east-side', cap: 80, ages: ['ALL'], curfew: 1380, ac: false, needs: ['VOUCH'], pressure: 55,
      note: 'A bay in an old plant on the rail line, a practice space that doubles as a show room. The landlord might sell any month.' },
    { id: 'suburb-hall', kind: 'HALL', hood: 'north-canton-side', cap: 120, ages: ['ALL'], curfew: 1350, ac: true, owner: 'HALL_MANAGER',
      note: 'A rented fraternal or church hall in the suburb. One-off rentals, not a standing room.' },
    { id: 'arts-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['ALL'], curfew: 1440, ac: true, following: .4, needs: [],
      note: 'A small live-music room in the arts district with noise-rock and punk-leaning bills. Some nights are all ages, with an extra charge under twenty-one.' },
    { id: 'metal-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A metal-leaning bar with a stage, on the regional calendars. The age policy locks the kids out.' },
    { id: 'gallery-shop', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1260, ac: true,
      note: 'An in-store set in an empty upstairs or storefront on the gallery night. Over by nine.' },
    { id: 'strip-lot', kind: 'OUTDOOR', hood: 'belden', cap: 100, curfew: 1260, outdoor: true, pressure: 55,
      note: 'A lot or a park pavilion out by the mall strips in the warm months, until security or the police move you.' },
    { id: 'palace', kind: 'BIG', hood: 'downtown', cap: 1500, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A restored movie palace. Not a punk room: this is where the town\'s big touring acts play.' }
  ],

  contacts: ['akron-oh', 'youngstown-oh', 'pittsburgh', 'erie-pa'],

  calendar: [
    { id: 'football-festival', label: 'the big football festival week', tag: 'festival', month: 8, weeks: [1, 2], dows: [4, 5], can: [.80, .80, .80], hoods: ['downtown', 'northwest-strip'], elsewhere: [.92, .92, .92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 9, week: 1, dows: [4, 5, 6], can: [.85, .85, .85] },
    { id: 'summer-downtown', label: 'the downtown summer concert run', tag: 'festival', month: 7, weeks: [1, 4], dows: [5, 6], can: [.92, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'hs-football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 4], dows: [4], can: [.80, .85, .85] },
    { id: 'hs-football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.80, .85, .85] },
    { id: 'commencement', label: 'the spring commencement', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.90, .92, .95], hoods: ['west-park', 'north-canton-side'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 370000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83, pop: 900000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 300000 },
    { name: 'Mansfield', state: 'OH', lat: 40.76, lon: -82.52, pop: 47000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 630000 }
  ],
  roads: ['I-77', 'US 30', 'US 62', 'Tuscarawas Street', 'I-76', 'SR 43'],

  words: {
    street: ['Market Avenue', 'Cleveland Avenue', 'Tuscarawas Street', 'Fulton Road', 'Whipple Avenue', 'Lincoln Highway'],
    water: ['Nimishillen Creek', 'the Tuscarawas River', 'the canal'],
    hood: ['Dueber', 'Harter Heights', 'Market Heights', 'Mt. Vernon', 'Ridgewood', 'West Park', 'Belden Village', 'North Canton', 'Jackson Township'],
    thing: ['pop', 'brick row', 'steel mill', 'pierogi', 'coney dog', 'lodge hall', 'basement', 'strip mall', 'carpool north', 'five-dollar cover', 'group chat', 'riff band'],
    weather: ['lake-effect snow', 'gray winter', 'road salt']
  },

  events: [
    { id: 'CANTON_OH_FESTIVAL_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The hotels are full and the downtown lots are closed for the big football week.',
      title: 'The festival week',
      body: 'Every hotel is full and the downtown lots are closed for the parade. Your band is stuck behind the closures and the hall wants double for the night.',
      options: [
        { id: 'PAY', label: 'Pay the hall its double', likely: 'Costs real money, but the room is yours.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'The hall got its double. The band showed an hour late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' },
        { id: 'ACCEPT', label: 'Run it and eat the closures', likely: 'Thin and late.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }],
          result: 'The gear went in the back way. A short crowd, a long wait.' }
      ] },

    { id: 'CANTON_OH_CURFEW_NIGHT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The city police are going to enforce the eleven o\'clock curfew again this weekend.',
      title: 'The eleven o\'clock curfew',
      body: 'The curfew sends under-eighteen kids home mid-set, and the downtown drinking area enforces nine. The all-ages bill ends early or gets a ticket.',
      options: [
        { id: 'EARLY', label: 'Move the start up and end by ten-thirty', likely: 'Short, loud and legal.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors at six. The kids were home before the curfew and nobody was cited.' },
        { id: 'ACCEPT', label: 'Run it and watch the clock', likely: 'Some kids will have to leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Half the room went home mid-set, and the last band played to the bar.' }
      ] },

    { id: 'CANTON_OH_FAIR_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'A country show at the fairgrounds takes the whole teen crowd that same night.',
      title: 'The fairgrounds night',
      body: 'A country concert at the fairgrounds has taken the teen crowd. Your room is going to get six locals and a few carpoolers from Akron.',
      options: [
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it for the faithful', likely: 'A small night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Six regulars and a car full from up the road. It was a good set anyway.' }
      ] }
  ]
});
