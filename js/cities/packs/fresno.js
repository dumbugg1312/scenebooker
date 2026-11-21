SB.Cities.register('fresno', {
  v: 1,
  slug: 'fresno',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['california state university fresno', 'fresno state', 'fresno pacific university', 'fresno city college', 'clovis community college', 'fresno bee', 'fresno new',
           'kmph', 'kfsn', 'kfsr', 'fresno grizzlies', 'fresno state bulldogs', 'fresno fc', 'big fresno fair', 'fresno punk invasion', 'yosemite national park',
           'sequoia national park', 'central california food bank', 'community medical centers', 'saint agnes medical center', 'fresno unified', 'clovis unified',
           'gottschalks', 'bulldog stadium', 'save mart center', 'chukchansi park', 'fresno yosemite international airport', 'camp pendleton', 'naval air station lemoore',
           'lemoore', 'blue diamond growers', 'foster farms', 'gallo', 'fresno county', 'fresno art museum'],
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
    { id: 'clovis', kind: 'FEEDER', name: 'Clovis', minutes: 15, bearing: 45, note: 'Suburban kids with cars, and some bands.' },
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
    { id: 'university-edge', name: 'the university edge', route: 'campus', note: 'Students, apartments and strip malls.' }
  ],

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
      ] }
  ]
});
