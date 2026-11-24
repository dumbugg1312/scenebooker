SB.Cities.register('santa-barbara-ca', {
  v: 1,
  slug: 'santa-barbara-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ucsb', 'uc santa barbara', 'university of california santa barbara', 'gauchos', 'santa barbara city college', 'vandenberg', 'vandenberg space force base',
           'port hueneme', 'naval base ventura county', 'chumash casino', 'santa ynez chumash', 'old spanish days', 'amtrak', 'pacific surfliner', 'coast starlight',
           'cal poly', 'cuesta college', 'santa barbara independent', 'news-press', 'kcsb', 'santa barbara barbarian', 'sheriff\'s foot patrol',
           'the gaviota grange', 'salsipuedes social hall', 'the sundowner room', 'fogbank', 'mesa lane laundry', 'haley street annex', 'the lemon grove',
           'casitas pass hall', 'rincon rec room', 'the marine layer', 'padaro pallet yard', 'alameda avenue carport',
           'isla vista community services district', 'ivcsd', 'isla vista roadhouse', 'deltopia', 'daily nexus', 'noozhawk', 'keyt', 'santa barbara county sheriff', 'ivpd',
           'american medical response', 'bandsintown', 'halloween in isla vista', 'funzone', 'casa de la raza', 'red barn', 'memehuenes', 'lompunk805'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['ucsb*', 'santa barbara independent*', 'news-press*', 'kcsb*', 'old spanish days*', 'vandenberg*'],

  blurb: ['Students, surfers and skaters share the same backyards, and punk knows it is the counter-culture in a mellow, wealthy beach town.',
          'Shows end early because the neighbors have lawyers. A room lasts about three school years, then the people running it graduate.'],
  hard: 'Short-lived rooms, early curfews, and a town that empties each summer.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Barbara' },
    { id: 'goleta', kind: 'FEEDER', name: 'Goleta', minutes: 15, bearing: 285, note: 'A suburb west of town with the airport, the university and light industry. Part of the same scene.' },
    { id: 'isla-vista', kind: 'FEEDER', name: 'Isla Vista', minutes: 15, bearing: 280, note: 'A dense one-square-mile student town of renters and bikes, with its own house-show culture. Most of the audience lives here.' },
    { id: 'carpinteria', kind: 'FEEDER', name: 'Carpinteria', minutes: 15, bearing: 115, note: 'A small beach town east on US 101 with surf and skate kids.' },
    { id: 'ventura', kind: 'FEEDER', name: 'Ventura', minutes: 40, bearing: 120, note: 'The closest big sibling: scruffier, more surf and punk. Crowds go both ways constantly.' },
    { id: 'santa-ynez', kind: 'FEEDER', name: 'Santa Ynez Valley', minutes: 45, bearing: 315, note: 'Wine country and a tourist town over the mountain pass. Teenagers drive over; no scene of their own.' },
    { id: 'ojai', kind: 'FEEDER', name: 'Ojai', minutes: 60, bearing: 100, note: 'A small mountain valley of artists and retreats, with a punk and skate fringe.' },
    { id: 'lompoc', kind: 'FEEDER', name: 'Lompoc', minutes: 65, bearing: 295, note: 'A farm and prison town beside a space base, with a hardcore and metal fringe.', scene: 100, rooms: [
      { id: 'lompoc-space', kind: 'DIY', hood: 'lompoc-town', cap: 100, rent: 50, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 35, standing: [55, 60, 45],
      pressure: 70, note: 'An all-ages rehearsal room for metal, goth and queercore bands, about to close when the owner wants the building. A replacement is planned.' }
    ] },
    { id: 'santa-maria', kind: 'FEEDER', name: 'Santa Maria', minutes: 70, bearing: 315, note: 'A big, mostly Latino farm city north on US 101 with a real scene; kids drive south.' },
    { id: 'oxnard', kind: 'PEER', name: 'Oxnard', minutes: 60, bearing: 120, slug: 'oxnard-ca', note: 'Bigger, more Latino and more working class, with a strong hardcore following that will drive.' },
    { id: 'san-luis-obispo', kind: 'PEER', name: 'San Luis Obispo', minutes: 110, bearing: 325, slug: 'san-luis-obispo-ca', note: 'The other nice coast college town, over the grade; the natural next tour stop north.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and lower State Street', route: 'downtown', note: 'The tourist spine from the beach up through the old mall: bars and storefronts that turn over constantly.' },
    { id: 'warehouse-blocks', name: 'the old warehouse blocks by the waterfront', route: 'old-side', note: 'Old auto shops and canneries that were cheap practice space once. Now tasting rooms and galleries, and gone for DIY.' },
    { id: 'eastside', name: 'the Eastside and Milpas Street', route: 'old-side', note: 'Working-class, heavily Latino bungalows and small lots. Backyards, driveways, back houses and taquerias, and the most neighborhood feeling in town.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Small working-class homes and light industrial pockets west of State Street. Garages and backyards.' },
    { id: 'mesa', name: 'the Mesa', route: 'work-side', note: 'Bluff-top streets of surfers and skaters sharing rentals, with a college campus. Getting pricey.' },
    { id: 'upper-state', name: 'Upper State and the north side', route: 'campus', note: 'Strip centers, chains and apartments north of the freeway. Rehearsal studios in commercial buildings; bland and cheaper.' },
    { id: 'goleta-side', name: 'Goleta and Isla Vista', route: 'campus', note: 'The university side to the west: house shows, courtyards and garages, policed by the county and not the city.' },
    { id: 'lompoc-town', name: 'Lompoc', route: 'town:lompoc', note: 'A farm and prison town over the pass. An all-ages room hangs on there by a lease.' }
  ],

  rooms: [
    { id: 'iv-house', kind: 'HOUSE', hood: 'goleta-side', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 30, standing: [70, 60, 45],
      pressure: 60, start: true, note: 'A rented house in Isla Vista with a courtyard and a patio. It lasts until the residents graduate or the sheriff arrives.' },
    { id: 'eastside-yard', kind: 'HOUSE', hood: 'eastside', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 45, note: 'A backyard and a driveway at a working-class house. No basements here, just a garage and a good neighbor.' },
    { id: 'westside-garage', kind: 'HOUSE', hood: 'westside', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 50],
      pressure: 50, note: 'A garage with the door rolled up. The city\'s ten o\'clock line applies, and the neighbors call.' },
    { id: 'co-op-garage', kind: 'DIY', hood: 'goleta-side', cap: 120, rent: 40, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 35, standing: [60, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A co-op garage run dry, one of the few rooms left in the square mile. Bring a drink and lose the room.' },
    { id: 'goleta-print-shop', kind: 'DIY', hood: 'goleta-side', cap: 150, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 50, needs: ['VOUCH'], note: 'A storefront in a light-industrial strip that does occasional benefit bills. All ages, and the landlord keeps an eye on the lot.' },
    { id: 'eastside-hall', kind: 'HALL', hood: 'eastside', cap: 200, rent: 200, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', pressure: 40, note: 'A community hall on the Eastside that took all-ages punk once. Dated and cheap, and nobody is sure it still says yes.' },
    { id: 'state-street-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [65, 65, 75],
      note: 'A retail storefront that clears the floor for an early bill. Out by nine, and the tourists pause at the window.' },
    { id: 'mesa-bluff', kind: 'OUTDOOR', hood: 'mesa', cap: 80, rent: 10, pa: .3, curfew: 1080, sketch: 35, standing: [60, 55, 45],
      pressure: 55, note: 'A bluff-top park for a day show only. Somebody reports the sound before the second band.' },
    { id: 'state-street-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A lower State Street bar with a stage, mostly 21 and up and now and then all ages. The rent on the tourist strip is what kills these.' },
    { id: 'lower-club', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1470, ac: true, following: .5, sketch: 15, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A real club that books indie and reggae mostly. Touring punk gets a night now and then.' },
    { id: 'old-bowl', kind: 'BIG', hood: 'upper-state', cap: 1000, rent: 1800, deposit: 500, pa: .95, ages: ['A18'], curfew: 1380, ac: false, sketch: 10, standing: [40, 70, 70],
      note: 'The historic bowl on the hill. Only a big touring act ever fills it.' }
  ],

  contacts: ['oxnard-ca', 'san-luis-obispo-ca', 'bakersfield-ca', 'los-angeles'],

  calendar: [
    { id: 'spring-break', label: 'the spring-break street party', tag: 'festival', month: 4, weeks: [1, 2], dows: [4, 5, 6], can: [.50, .40, .40], hoods: ['goleta-side'], elsewhere: [.90, .85, .85] },
    { id: 'halloween-iv', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [.85, .80, .80], hoods: ['goleta-side'], elsewhere: [1.05, 1.05, 1] },
    { id: 'solstice-parade', label: 'the summer-solstice parade', tag: 'parade', month: 6, weeks: [3, 4], dows: [5], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'summer-fiesta', label: 'the big summer fiesta', tag: 'parade', month: 8, week: 1, dows: [2, 3, 4, 5, 6], can: [.85, .80, .80], hoods: ['downtown', 'eastside'], elsewhere: [.97, .95, .95] },
    { id: 'harvest-fairs', label: 'the fall harvest fairs', tag: 'fair', month: 9, weeks: [2, 3], dows: [5, 6], can: [.94, .92, .90] },
    { id: 'finals-june', label: 'finals and the quarter break', tag: 'graduation', month: 6, weeks: [2, 4], dows: [4, 5, 6], can: [.75, .70, .70], hoods: ['goleta-side'], elsewhere: [.95, .93, .93] },
    { id: 'finals-dec', label: 'finals and the winter break', tag: 'graduation', month: 12, weeks: [2, 4], dows: [4, 5, 6], can: [.75, .70, .70], hoods: ['goleta-side'], elsewhere: [.95, .93, .93] },
    { id: 'halloween-all', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.05, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Ventura', state: 'CA', lat: 34.27, lon: -119.23, pop: 110000 },
    { name: 'Santa Maria', state: 'CA', lat: 34.95, lon: -120.44, pop: 110000 },
    { name: 'Ojai', state: 'CA', lat: 34.45, lon: -119.24, pop: 7500 },
    { name: 'Thousand Oaks', state: 'CA', lat: 34.17, lon: -118.84, pop: 125000 }
  ],
  roads: ['US 101', 'Highway 154', 'Highway 150', 'Highway 217', 'Highway 246'],

  words: {
    street: ['State Street', 'Milpas Street', 'Highway 101', 'Highway 154'],
    water: ['the harbor', 'the channel'],
    hood: ['the Eastside', 'the Westside', 'the Mesa', 'Isla Vista', 'Goleta', 'Lower State', 'Five Points', 'Mission Canyon', 'Carpinteria'],
    thing: ['taqueria', 'tri-tip sandwich', 'fish taco', 'garage', 'bike path', 'tasting room', 'back house', 'surf wax', 'skatepark', 'towels on the door', 'bluff', 'wine bar'],
    weather: ['sundowner wind', 'fog bank', 'week of fire smoke']
  },

  events: [
    { id: 'SANTA_BARBARA_CA_SPRING_BREAK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [4] },
      telegraph: 'The county is posting the street-party notices again: seventy-two hours of noise rules and extra deputies.',
      title: 'The street party eats the weekend',
      body: 'Thousands of people are in the streets by day and every house show is called off. Half your crowd is out there, and the rest are afraid of the deputies.',
      options: [
        { id: 'MOVE', label: 'Move the bill across town', likely: 'It\'s smaller, but out of the county\'s reach.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage on the Eastside took the bill, and the deputies never came that far.' },
        { id: 'LATE', label: 'Push doors back until the streets quiet', likely: 'You start late, and the tired ones show up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were at ten, and they came in sunburned and loud.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The street keeps most of them.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .5 }],
          result: 'Half the list was at the party and the other half stayed home.' }
      ] },

    { id: 'SANTA_BARBARA_CA_DRY_GARAGE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The co-op garage has one rule, and one of the bands has a reputation.',
      title: 'A case in the van',
      body: 'The room is run dry or not at all. One of the bands pulls up with a case of beer, and the co-op is watching to see what you do.',
      options: [
        { id: 'DRY', label: 'Keep it dry and tell them so', likely: 'There\'s some grumbling, but the room stays yours.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The case stayed in the van, and the set was tighter for it, and the co-op noticed.' },
        { id: 'MOVE', label: 'Take the bill to a backyard', likely: 'It breaks the date and costs the co-op\'s trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }],
          result: 'A backyard took the bill, and the co-op heard about it by morning.' },
        { id: 'ACCEPT', label: 'Look away', likely: 'You\'re gambling with the room.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }, { op: 'MONEY', amount: -30 }],
          result: 'The beer came out and somebody told, and it cost you the deposit and some goodwill.' }
      ] },

    { id: 'SANTA_BARBARA_CA_SUNDOWNER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], months: [9, 10, 11] },
      telegraph: 'The wind is coming over the mountains tonight, hot and dry and from the wrong direction.',
      title: 'The wind takes the tent',
      body: 'A sundowner wind knocks the power out and blows the tent over at the backyard show on the Mesa. The generator is still going, and the smoke is coming.',
      options: [
        { id: 'GENERATOR', label: 'Run it on the generator', likely: 'It\'s quieter and shorter, and the wind howls.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The sets were short, on a generator, with the wind through the fence, and it was an odd, warm night.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A thin night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Most stayed in, and the ones who came kept their jackets on.' }
      ] }
  ]
});
