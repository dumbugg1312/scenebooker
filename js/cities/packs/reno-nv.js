SB.Cities.register('reno-nv', {
  v: 1,
  slug: 'reno-nv',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['burning man', 'hot august nights', 'great reno balloon race', 'balloon race', 'reno air races', 'air races', 'biggest little city in the world',
           'biggest little city', 'university of nevada', 'unr', 'truckee meadows community college', 'tmcc', 'nevada day', 'nevada air national guard',
           'naval air station fallon', 'washoe zephyr', 'reno-tahoe international', 'reno-sparks convention center', 'rib cook-off', 'street vibrations',
           'artown', 'reno rodeo', 'santa crawl', 'amtrak', 'california zephyr', 'wolf pack', 'nevada wolf pack', 'aces',
           'pinyon annex', 'mogul street garage', 'rail city rec room', 'the weekly rate', 'glendale cold storage', 'peavine carport',
           'sagebrush social hall', 'wingfield loading dock', 'the zephyr room', 'sun valley swap annex', 'mill street mattress', 'truckee meadows auxiliary',
           'reno news & review', 'renonr', 'our town reno', 'tahoe weekly', 'tahoe guide', 'sierra nevada ally', 'kirby group', 'spring rally', 'fall rally', 'offbeat music festival', 'nugget rib cook-off', 'reno santa crawl', 'mackay stadium', 'university of nevada reno', 'grand sierra resort', 'circus circus', 'reno-sparks livestock events center', 'nevada state fairgrounds', 'carson city summer concert series', 'roadshows inc', 'visit reno tahoe', 'nevada arts council', 'reno police', 'nrs 202.030', 'reno municipal code', 'harley-davidson'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['burning man*', 'hot august*', 'artown*', 'street vibrations*', 'wolf pack*', 'biggest little*', 'reno news & review', 'grand sierra resort', 'roadshows inc'],

  blurb: ['Wind, dust and long drives shape a small valley scene held together by a few stubborn promoters, in garages, bays and bar rooms.',
          'Rooms keep getting sold out from under the scene, and the next city is a long drive over the mountains or across the desert.'],
  hard: 'Rooms are scarce and sold off, and nobody lives close to anything.',
  region: 'the Great Basin',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Reno' },
    { id: 'sparks', kind: 'FEEDER', name: 'Sparks', minutes: 15, bearing: 95, pop: 108000, scene: 80, note: 'The rail-yard city next door: industrial units, garages and a big suburban sprawl. Shares Reno\'s scene.',
      rooms: [{ id: 'pizza-back-room', kind: 'DIY', hood: 'sparks-town', zone: 'sparks', cap: 80, rent: 60, pa: 0.5, curfew: 1380, ac: true, sketch: 35, standing: [60, 60, 45], pressure: 55, note: 'A pizza shop by day that turns punk at night. It has its own crowd out here, and a shop lease is a thin thing to stand on.' },
               { id: 'maker-hall', kind: 'HALL', hood: 'sparks-town', zone: 'sparks', cap: 300, rent: 250, deposit: 100, pa: 0.6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 65], owner: 'HALL_MANAGER', note: 'A big maker space on the industrial strip that holds all-ages days with bands and vendors. The hard part is getting a permanent space.' }] },
    { id: 'fernley', kind: 'FEEDER', name: 'Fernley', minutes: 35, bearing: 100, note: 'A logistics and bedroom town with no real scene.' },
    { id: 'carson-city', kind: 'FEEDER', name: 'Carson City', minutes: 35, bearing: 180, pop: 58000, scene: 60, note: 'The state capital with a small scene; its kids come to Reno routinely.', bands: 2,
      rooms: [{ id: 'old-grade-lawn', kind: 'OUTDOOR', hood: 'carson-town', zone: 'carson-city', cap: 500, rent: 25, pa: 0.4, curfew: 1260, sketch: 40, standing: [60, 55, 50], note: 'A summer lawn series and the odd saloon night up the hill. Wind and wildfire smoke can end any evening.' }] },
    { id: 'incline', kind: 'FEEDER', name: 'Incline Village', minutes: 40, bearing: 210, note: 'A wealthy lake town; resort-worker youth are the audience.', season: { months: [6, 7, 8, 12, 1, 2], mul: 1.4 } },
    { id: 'truckee', kind: 'FEEDER', name: 'Truckee', state: 'CA', minutes: 45, bearing: 265, beyond: 'sierra-pass', note: 'A ski and resort town over the pass with some shows of its own.', bands: 1 },
    { id: 'dayton', kind: 'FEEDER', name: 'Dayton', minutes: 45, bearing: 150, note: 'A growing exurb on the Carson River.' },
    { id: 'minden', kind: 'FEEDER', name: 'Minden and Gardnerville', minutes: 55, bearing: 185, note: 'Ranch country; teenagers drive up the valley.' },
    { id: 'fallon', kind: 'FEEDER', name: 'Fallon', minutes: 70, bearing: 105, note: 'A farm town half given over to the air station.' },
    { id: 'susanville', kind: 'FEEDER', name: 'Susanville', state: 'CA', minutes: 90, bearing: 340, note: 'A prison and ranch town; kids drive far.' },
    { id: 'chico', kind: 'PEER', name: 'Chico', state: 'CA', minutes: 175, bearing: 285, slug: 'chico-ca', note: 'A college-town peer across the mountains; bands trade both ways.' }
  ],

  chokepoints: [{ id: 'sierra-pass', name: 'the Donner Pass crossing', p: .03 }],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Casino core, weekly motels and pawn shops by the river. Occasional bars and empty storefronts.' },
    { id: 'west-fourth', name: 'the West Fourth Street corridor', route: 'work-side', note: 'Old warehouses and motels along the tracks, now breweries and rising rent. The cheap industrial era is ending.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'Thrift shops, murals and bars on South Virginia Street. The hot one, already priced out of cheap use.' },
    { id: 'wells', name: 'Wells Avenue', route: 'work-side', note: 'Working-class, mostly Hispanic strip east of downtown: garages, storefronts and backyards.' },
    { id: 'university', name: 'the university district', route: 'campus', note: 'Older houses rented by students north of downtown. House shows, basements rare.' },
    { id: 'sparks-side', name: 'Sparks', route: 'work-side', note: 'Industrial units, garages and a restored main street, cheaper than Reno.' },
    { id: 'sun-valley', name: 'Sun Valley and the north valley', route: 'campus', note: 'Mobile-home lots and dusty subdivisions. Garages, carports and generators; no commercial rooms.' },
    { id: 'south-meadows', name: 'South Meadows', route: 'campus', note: 'New-build suburb behind the malls. Parents\' garages and practice rooms; kids drive to Midtown.' },
    { id: 'sparks-town', name: 'Sparks, the industrial strip', route: 'town:sparks', note: 'Warehouse units, a restored main street and a pizza room next door to the tracks. Cheaper than Reno and with its own crowd.' },
    { id: 'carson-town', name: 'Carson City and the grade', route: 'town:carson-city', note: 'The capital down the valley and the saloon towns up the hill, with free summer evenings on a lawn.' }
  ],

  rooms: [
    { id: 'north-vine-house', kind: 'HOUSE', hood: 'university', cap: 60, curfew: 1320, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 55, start: true, note: 'A rented house turned all-ages indie and art room. The owner is fine with it, and the risk is a landlord changing his mind or a neighbor calling it in.' },
    { id: 'old-frame-house', kind: 'HOUSE', hood: 'wells', cap: 40, curfew: 1320, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 65, note: 'A living room and backyard on an older street. The neighbors have called the police before, and the old houses are being torn down around it.' },
    { id: 'dry-hub', kind: 'DIY', hood: 'midtown', cap: 250, rent: 70, pa: 0.7, curfew: 1350, ac: true, standing: [55, 65, 50], pressure: 50, note: 'The all-ages art and music hub, no alcohol. Everyone goes here, so young bands wait for a slot, and there is no second room like it.' },
    { id: 'roaster-floor', kind: 'SHOP', hood: 'midtown', cap: 70, pa: 0.4, curfew: 1290, ac: true, sketch: 10, standing: [70, 70, 75], following: 0.2, note: 'A coffee roaster that hosts all-ages music in the slow winter hours. It suits loud punk better than the boba shops do.' },
    { id: 'dive-room', kind: 'BAR', hood: 'midtown', cap: 150, soundFee: 50, pa: 0.7, ages: ['A21'], curfew: 1530, ac: true, following: 0.3, sketch: 20, standing: [50, 65, 65], pressure: 50, note: 'A dive bar in Midtown with a small stage and loud local openers. Under-21s are shut out, and the rent is climbing.' },
    { id: 'saloon-room', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 60, pa: 0.7, ages: ['A21'], curfew: 1560, ac: true, following: 0.3, sketch: 25, standing: [45, 65, 65], pressure: 55, note: 'A saloon-style room at the edge of the casino core. Punk, metal and country, and the police watch the block hard.' },
    { id: 'fourth-street-club', kind: 'CLUB', hood: 'west-fourth', cap: 350, houseCosts: 200, split: 0.8, pa: 0.9, ages: ['A18'], curfew: 1470, ac: true, following: 0.5, sketch: 15, standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A new room on the old warehouse corridor. Wants a name, and the street is getting pricier by the month.' },
    { id: 'big-music-hall', kind: 'BIG', hood: 'downtown', cap: 1500, rent: 1800, deposit: 500, pa: 0.95, ages: ['A18'], curfew: 1410, ac: true, standing: [40, 65, 70], note: 'A mid-size music hall in an old brewhouse. Bigger tours routed here skip it when the advance sales are low.' }
  ],

  contacts: ['chico-ca', 'sacramento', 'stockton-ca'],

  calendar: [
    { id: 'classic-cars', label: 'the classic-car festival', tag: 'festival', month: 8, weeks: [1, 2], dows: [4, 5, 6], can: [.88, .88, .90], hoods: ['downtown', 'sparks-side'], elsewhere: [.97, .95, .95] },
    { id: 'balloon-weekend', label: 'the hot-air balloon weekend', tag: 'festival', month: 9, week: 2, dows: [3, 4, 5, 6], can: [.92, .92, .95], hoods: ['sun-valley'], elsewhere: [1, .97, .97] },
    { id: 'motorcycle-weekend', label: 'the motorcycle weekend', tag: 'festival', month: 9, week: 4, dows: [3, 4, 5, 6], can: [.90, .88, .90], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'pro-rodeo', label: 'the pro rodeo', tag: 'fair', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.93, .90, .92] },
    { id: 'rib-weekend', label: 'the Labor Day rib weekend', tag: 'fair', month: 9, week: 1, dows: [4, 5, 6], can: [.90, .88, .90], hoods: ['sparks-side'], elsewhere: [1, 1, 1] },
    { id: 'costume-crawl', label: 'the costume bar crawl', tag: 'holiday', month: 12, week: 2, dows: [5], can: [.90, .88, .88], hoods: ['downtown', 'west-fourth'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .97, .97], hoods: ['university'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .97, .97], hoods: ['university'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 },
    { name: 'Winnemucca', state: 'NV', lat: 40.97, lon: -117.74, pop: 8000 },
    { name: 'Elko', state: 'NV', lat: 40.83, lon: -115.76, pop: 20000 },
    { name: 'Truckee', state: 'CA', lat: 39.33, lon: -120.18, pop: 16000 },
    { name: 'Redding', state: 'CA', lat: 40.59, lon: -122.39, pop: 93000 }
  ],
  roads: ['I-80', 'US 395', 'I-580', 'US 50', 'NV 431', 'Virginia Street'],

  words: {
    street: ['Virginia Street', 'West Fourth Street', 'Wells Avenue', 'Center Street', 'Mount Rose Highway'],
    water: ['the Truckee', 'Pyramid Lake', 'Lake Tahoe', 'Washoe Lake'],
    hood: ['Midtown', 'Sparks', 'Sun Valley', 'Lemmon Valley', 'Stead', 'Cold Springs', 'Damonte Ranch', 'Peavine'],
    thing: ['weekly motel', 'pawn shop', 'swamp cooler', 'sagebrush', 'generator', 'tumbleweed', 'chain-up sign', 'roll-up door', 'taco truck', 'desert'],
    weather: ['wildfire smoke', 'afternoon wind', 'dry cold']
  },

  events: [
    { id: 'RENO_NV_HUB_FULL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [10] },
      telegraph: 'The big October music weekend is on every bar window in Midtown.',
      title: 'The only dry hub is booked solid',
      body: 'The all-ages hub has given its weekend to the October festival, so your kid bill has nowhere to land. The coffee roaster says you can have the floor, but only until nine.',
      options: [
        { id: 'ROASTER', label: 'Take the roaster floor and play early', likely: 'Smaller, earlier and closer.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'SHOP', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The roaster cleared the tables and the kids packed in. Out the door by nine, still buzzing.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You moved it a week. A few bands could not make the new date.' },
        { id: 'ACCEPT', label: 'Run it in a garage', likely: 'Rough and loud.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'A garage took the bill. The neighbors heard every note.' }
      ] },

    { id: 'RENO_NV_SMOKE_WIND', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9] },
      telegraph: 'The wind picked up and the sky has gone orange with wildfire smoke.',
      title: 'Smoke and a dawn load-out',
      body: 'Smoke blew into the valley and the balloon crowd is filling the north end at dawn. The room needs the load-out done by two or the show is off.',
      options: [
        { id: 'EARLY', label: 'Start early and load out by two', likely: 'Tight, but the kids can sleep.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Short sets and the gear out by two. Nobody complained about the quiet.' },
        { id: 'ACCEPT', label: 'Run it and breathe through a bandana', likely: 'Half the list stays inside.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The smoke kept most of them home. The ones who came wore masks and played anyway.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The smoke had cleared by then, mostly.' }
      ] },

    { id: 'RENO_NV_NEIGHBOR_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A new infill house went up across the street from the show house.',
      title: 'A call from across the street',
      body: 'The new neighbors across the street have called the police on the house show twice this month. Tonight the downtown curfew for minors starts at nine and the kids walk out early.',
      options: [
        { id: 'EARLY', label: 'Finish by nine and send the kids home', likely: 'Short and quiet.',
          effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Done by nine, doors closed. The street stayed dark.' },
        { id: 'MOVE', label: 'Move it to a hall', likely: 'Loses the house feel.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }],
          result: 'A hall took the bill. It was cleaner and a little colder.' },
        { id: 'ACCEPT', label: 'Run it and keep the volume down', likely: 'Quiet sets, tense night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Everybody played quietly and watched the window.' }
      ] }
  ]
});
