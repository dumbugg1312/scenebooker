SB.Cities.register('fresno', {
  v: 1,
  slug: 'fresno',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['california state university fresno', 'fresno state', 'fresno pacific university', 'fresno city college', 'clovis community college', 'fresno bee', 'fresno new',
           'kmph', 'kfsn', 'kfsr', 'fresno grizzlies', 'fresno state bulldogs', 'fresno fc', 'big fresno fair', 'fresno punk invasion', 'yosemite national park',
           'sequoia national park', 'central california food bank', 'community medical centers', 'saint agnes medical center', 'fresno unified', 'clovis unified',
           'gottschalks', 'bulldog stadium', 'save mart center', 'chukchansi park', 'fresno yosemite international airport', 'camp pendleton', 'naval air station lemoore',
           'lemoore', 'blue diamond growers', 'foster farms', 'gallo', 'fresno county', 'fresno art museum', 'tower porchfest', 'tower porch fest', 'big fresno fairgrounds', 'fresno fairgrounds', 'abc30', 'kvpr', 'gv wire', 'fscollegian'],
  blocklist: ['fresno bee*', 'fresno punk invasion*', 'big fresno fair*', 'fresno grizzlies*', 'save mart*', 'chukchansi*'],

  blurb: ['Hot, flat and loud, a Valley town where kids make hardcore shows in warehouses and backyards.',
          'All-ages is the rule and a point of pride, and the police are the weather.'],
  hard: 'Heat, cops and a long drive from anywhere; every room is a favor.',
  region: 'the Central Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Fast hardcore and thrash are the core of the current scene.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fresno' },
    { id: 'clovis', kind: 'FEEDER', name: 'Clovis', minutes: 15, bearing: 45, scene: 120, note: 'Suburban kids with cars, and some bands.',
      rooms: [    { id: 'clovis-hall', kind: 'HALL', hood: 'clovis-town', cap: 120, rent: 150, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
               owner: 'HALL_MANAGER', note: 'A rented community hall in the suburb. One-off dates for kids who have cars.' }] },
    { id: 'kerman', kind: 'FEEDER', name: 'Kerman', minutes: 20, bearing: 275, note: 'A farm town.' },
    { id: 'selma', kind: 'FEEDER', name: 'Selma', minutes: 20, bearing: 165, note: 'A small farm town.' },
    { id: 'madera', kind: 'FEEDER', name: 'Madera', minutes: 25, bearing: 325, note: 'A small farm town. Kids come in on weekends.' },
    { id: 'sanger', kind: 'FEEDER', name: 'Sanger', minutes: 25, bearing: 100, note: 'Small, with some garage bands.', bands: 1 },
    { id: 'reedley', kind: 'FEEDER', name: 'Reedley', minutes: 30, bearing: 115, note: 'A small town with a few kids.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', minutes: 55, bearing: 140, slug: 'visalia-ca', note: 'A bigger town with its own small scene.' },
    { id: 'bakersfield', kind: 'PEER', name: 'Bakersfield', minutes: 110, bearing: 155, slug: 'bakersfield-ca', note: 'A similar-sized Valley scene, heavy on hardcore and metal.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', minutes: 115, bearing: 320, slug: 'modesto-ca', note: 'A similar Valley scene up the 99.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Mural District', route: 'downtown', note: 'Warehouses, bars and a revived core. Rooms here are converted industrial spaces and community halls.' },
    { id: 'tower', name: 'the Tower District', route: 'old-side', note: 'Old bungalows and a theater strip, with an arty crowd. House shows and small bars.' },
    { id: 'van-ness', name: 'Van Ness Extension', route: 'old-side', note: 'Older homes with a plaza used for outdoor events.' },
    { id: 'fig-garden', name: 'Fig Garden', route: 'old-side', note: 'Older, wealthier tree-lined streets. Few shows.' },
    { id: 'fulton', name: 'the Fulton Corridor and Chinatown', route: 'work-side', note: 'Empty lots, rail and warehouse buildings. Cheap space.' },
    { id: 'southeast', name: 'southeast Fresno and Calwa', route: 'work-side', note: 'Rail, packing houses and cheap rent. Backyard shows.' },
    { id: 'west-fresno', name: 'West Fresno', route: 'work-side', note: 'Old neighborhoods along the old highway. Little overlap with the scene.' },
    { id: 'clovis-hood', name: 'Clovis', route: 'campus', note: 'The suburban edge to the northeast. Its kids drive in.' },
    { id: 'university-edge', name: 'the university edge', route: 'campus', note: 'Students, apartments and strip malls.' },
    { id: 'clovis-town', name: 'Clovis', route: 'town:clovis', note: 'The suburb itself: rented halls and kids with cars.' }
  ],

  rooms: [
    { id: 'tower-porch', kind: 'HOUSE', hood: 'tower', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A porch and a yard on a tree-lined street. The neighbors and a decibel limit decide how long it runs, and the police have shut one down.' },
    { id: 'mural-warehouse', kind: 'DIY', hood: 'downtown', cap: 150, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [60, 65, 50],
      pressure: 50, needs: ['VOUCH'], note: 'An old warehouse that is a gig room, a print shop and a skate shop in one. It all hangs on one person\'s lease.' },
    { id: 'rail-unit', kind: 'DIY', hood: 'fulton', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'Cheap space by the tracks. The trains and the landlord are the problem, in that order.' },
    { id: 'church-room', kind: 'HALL', hood: 'university-edge', cap: 150, rent: 40, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [65, 65, 65],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A volunteer-run all-ages room in a church. The speakers are paid for with shirts and donations, and the volunteers are tired.' },
    { id: 'taproom', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A brewery stage. Twenty-one and over most nights, with the odd early all-ages bill.' },
    { id: 'tower-club', kind: 'CLUB', hood: 'tower', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['ALL', 'A21'], curfew: 1410, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The working touring room, with a bar side and a hall side. Most punk bills are twenty-one and over, and a few are for everybody.' },
    { id: 'van-ness-plaza', kind: 'OUTDOOR', hood: 'van-ness', cap: 250, rent: 25, pa: .5, curfew: 1320, sketch: 30, standing: [55, 60, 55],
      note: 'A plaza for summer days and cooler nights. Heat, a permit and the light after dark decide it.' },
    { id: 'tower-record-shop', kind: 'SHOP', hood: 'tower', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store in the theater strip. Afternoon in-stores only.' },
    { id: 'calwa-yard', kind: 'HOUSE', hood: 'southeast', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 45, note: 'A backyard under a tarp. The aunt in the kitchen is the real manager.' }
  ],

  contacts: ['visalia-ca', 'bakersfield-ca', 'modesto-ca', 'san-jose'],

  calendar: [
    { id: 'fair-week', label: 'the big county fair', tag: 'fair', month: 10, weeks: [1, 3], dows: [2, 3, 4, 5, 6], can: [.88, .85, .85] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4, 5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4, 5], can: [.85, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [4, 5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 520000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 410000 }
  ],
  roads: ['Highway 99', 'Highway 41', 'Highway 180', 'Highway 168'],

  words: {
    street: ['Blackstone Avenue', 'Shaw Avenue', 'Fulton Street', 'Olive Avenue', 'Clovis Avenue', 'Ventura Street'],
    water: ['the San Joaquin'],
    hood: ['Tower District', 'Fig Garden', 'Calwa', 'Van Ness', 'Clovis', 'Chinatown'],
    thing: ['swap meet', 'warehouse', 'tule fog', 'almond truck', 'fruit stand', 'taqueria'],
    weather: ['triple digits', 'tule fog', 'wildfire smoke']
  },

  events: [
    { id: 'FRESNO_HOT_PAVEMENT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'It has been 108 all week and the lot is baking.',
      title: 'Too hot to stand on the pavement',
      body: 'At six in the evening the lot is still too hot to stand on, and there is no shade and no air conditioning. The kids are texting to ask if it is really still on.',
      options: [
        { id: 'LATER', label: 'Push the doors back until the sun is down', likely: 'Most wait it out. Everyone is up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors at nine. The fans blew all night and the room was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Only the committed show up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed in the air conditioning at home.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. It was still hot.' }
      ] },

    { id: 'FRESNO_TULE_FOG', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2] },
      telegraph: 'The fog is thick enough that the highway to the south is closing in the mornings.',
      title: 'The fog closes the highway',
      body: 'The headliners were coming up the highway from Visalia when the fog shut it behind them. They are sitting in a truck stop, and the crowd is already in line.',
      options: [
        { id: 'SHORT', label: 'Run the local bands and hold the headliners for the end', likely: 'A long night, and it ends when they arrive.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The locals played long and loose. The van pulled in at eleven and went on last.' },
        { id: 'WAIT', label: 'Cancel the headliners and run a short bill', likely: 'A thin night, but nobody is stranded.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two local bands and a lot of folding chairs. The ones who came were glad.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The fog had lifted by then.' }
      ] },

    { id: 'FRESNO_CURFEW_PUSH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8] },
      telegraph: 'Police are driving kids home after ten, and the news says it will go on all summer.',
      title: 'Every kid out by ten',
      body: 'Police are calling parents and driving young people home after ten at night. Half your crowd is under eighteen, and the parents are waiting in cars out front.',
      options: [
        { id: 'EARLY', label: 'Move the set times up so everyone is out by ten', likely: 'A short, early night. Parents are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at five, done by nine-thirty. The cars out front were all gone by ten.' },
        { id: 'HALL', label: 'Move it to the church room', likely: 'A rule-bound room, but a safe one.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .85 }],
          result: 'The church room took the bill, and the volunteers kept the clock.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The younger kids leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The under-eighteens left at ten and the last bands played to who was left.' }
      ] }
  ]
});
