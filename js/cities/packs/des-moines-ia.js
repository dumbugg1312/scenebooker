SB.Cities.register('des-moines-ia', {
  v: 1,
  slug: 'des-moines-ia',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['iowa state fair', 'des moines arts festival', 'capital city pridefest', 'pridefest', 'world food & music festival', '80/35', 'yankee doodle pops', 'des moines symphony', 'live nation', 'ticketmaster', 'iowa events center', 'caseys center', 'little village', 'dsm magazine', 'iowa public radio', 'des moines register', 'catch des moines', 'downtown dsm', 'drake university', 'drake', 'drake relays', 'grand view university', 'iowa state university', 'iowa state', 'university of iowa',
           'simpson college', 'central college', 'william penn university', 'dmacc', 'iowa state fair', 'capital city pride',
           'des moines arts festival', 'jazz in july', 'world food & music festival', 'world food and music festival', 'des moines marathon',
           'hinterland', 'principal charity classic', 'pufferbilly days', 'tulip time', 'des moines register', 'cityview', 'juice', 'kcci', 'kdsm',
           'woi', 'who 1040', 'hy-vee', 'casey\'s', 'maid-rite', 'amtrak', 'jefferson lines', 'greyhound', 'iowa air national guard', 'camp dodge',
           'cy-hawk', 'iowa caucuses', 'american legion', 'vfw', 'principal riverwalk', 'raccoon bend hall', 'the mixmaster basement', 'post 417',
           'keo way garage', 'the tenderloin annex', 'court & fourth storage', 'saylor township grange', 'gold dome skate & lanes',
           'southside panaderia back room', 'hubbell avenue carport', 'capitol hill laundromat', 'the fairgrounds campsite'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['drake university*', 'iowa state*', 'hy-vee*', 'des moines register*', 'hinterland*', 'cityview*', 'raccoon bend hall*', 'maid-rite*'],

  blurb: ['The rooms keep closing, so the scene lives in a few bars and borrowed basements.',
          'Hardcore and metal hold on, with more old heads than kids, and everyone has a story about the last night at the big room.'],
  hard: 'Few independent rooms are left, and the big promoter owns the mid-size ones.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .06, reason: 'Hardcore and metal share bills and the same few faces.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Des Moines' },
    { id: 'ankeny', kind: 'FEEDER', name: 'Ankeny', minutes: 15, bearing: 10, pop: 67887, note: 'A fast-growing suburb with a community college campus; suburban bands and teenage crowds.' },
    { id: 'indianola', kind: 'FEEDER', name: 'Indianola', minutes: 25, bearing: 185, pop: 15833, note: 'A tidy college and commuter town to the south.' },
    { id: 'ames', kind: 'FEEDER', name: 'Ames', minutes: 35, bearing: 355, pop: 66427, note: 'A big college town with its own music scene; the likeliest crossover.', bands: 3 },
    { id: 'newton', kind: 'FEEDER', name: 'Newton', minutes: 35, bearing: 85, pop: 15760, note: 'A working-class factory and racetrack town with no scene of its own.' },
    { id: 'winterset', kind: 'FEEDER', name: 'Winterset', minutes: 40, bearing: 235, pop: 5353, note: 'A small rural tourist town; kids come in by car.' },
    { id: 'perry', kind: 'FEEDER', name: 'Perry', minutes: 40, bearing: 285, pop: 7836, note: 'A meatpacking town hit by a plant closing, with a growing Hispanic population.' },
    { id: 'boone', kind: 'FEEDER', name: 'Boone', minutes: 45, bearing: 325, pop: 12460, note: 'A quiet railroad town; kids drive in for shows.' },
    { id: 'knoxville', kind: 'FEEDER', name: 'Knoxville', minutes: 45, bearing: 130, pop: 7595, note: 'Sprint-car country where punk kids are a minority.' },
    { id: 'pella', kind: 'FEEDER', name: 'Pella', minutes: 50, bearing: 115, pop: 10464, note: 'A Dutch-heritage church town with a small college; students are the crowd.' },
    { id: 'grinnell', kind: 'FEEDER', name: 'Grinnell', minutes: 55, bearing: 85, pop: 9564, note: 'A liberal-arts college town whose students drive to shows.' },
    { id: 'marshalltown', kind: 'FEEDER', name: 'Marshalltown', minutes: 60, bearing: 55, pop: 27591, note: 'An industrial and meatpacking town with a community college.' },
    { id: 'cedar-rapids', kind: 'PEER', name: 'Cedar Rapids', minutes: 120, bearing: 85, slug: 'cedar-rapids-ia', note: 'The nearest similar city: bands and kids swap in both directions.' },
    { id: 'iowa-city', kind: 'PEER', name: 'Iowa City', minutes: 110, bearing: 85, slug: 'iowa-city-ia', note: 'The big college-music town of the state; it hoards the all-ages rooms.' },
    { id: 'lincoln', kind: 'PEER', name: 'Lincoln', state: 'NE', minutes: 180, bearing: 245, slug: 'lincoln-ne', note: 'A hardcore and punk pipeline runs both ways through Omaha.' }
  ],

  hoods: [
    { id: 'east-village', name: 'the East Village', route: 'old-side', note: 'Old wood-frame and brick commercial blocks just across the river from downtown; shops, bars and a revived feel.' },
    { id: 'downtown', name: 'downtown and Court Avenue', route: 'downtown', note: 'The old brick warehouse-and-bar strip between the two rivers; the historic nightlife street.' },
    { id: 'sherman-hill', name: 'Sherman Hill', route: 'old-side', note: 'Late 1800s houses northwest of downtown, big and divided into apartments.' },
    { id: 'university', name: 'the university neighborhood', route: 'campus', note: 'An urban campus of apartments and houses around University Avenue.' },
    { id: 'beaverdale', name: 'Beaverdale', route: 'old-side', note: 'Older bungalows with a small commercial strip; working-class turned family neighborhood.' },
    { id: 'north-side', name: 'the north side', route: 'work-side', note: 'Older, lower-priced houses with basements and garages, and small strips. Highland Park and Oak Park.' },
    { id: 'south-side', name: 'the South Side', route: 'work-side', note: 'The Latino commercial heart along SW 9th, with shop spaces, warehouses and old packing-plant buildings.' },
    { id: 'valley-junction', name: 'Valley Junction', route: 'old-side', note: 'A railroad-town business district in West Des Moines with independent shops.' }
  ],

  rooms: [
    { id: 'north-basement', kind: 'HOUSE', hood: 'north-side', cap: 40, curfew: 1320, ac: false, start: true, note: 'A basement under an older house on the north side. Houses here open and shut fast, and the few students have no time to run one.' },
    { id: 'sherman-front-room', kind: 'HOUSE', hood: 'sherman-hill', cap: 50, curfew: 1320, ac: false, note: 'A front-room show in a big old house cut into apartments. The landlord, the neighbors and the turnover all work against it.' },
    { id: 'beaverdale-garage', kind: 'HOUSE', hood: 'beaverdale', cap: 30, curfew: 1290, ac: false, note: 'A garage and basement in a family neighborhood. The quiet hour and the nosy neighbors end it early.' },
    { id: 'south-side-bay', kind: 'DIY', hood: 'south-side', cap: 80, curfew: 1350, pressure: 55, note: 'A shop bay near the old packing plants on the South Side. Nothing is set up there yet, and you would be the first.' },
    { id: 'campus-hall', kind: 'HALL', hood: 'university', cap: 150, curfew: 1320, ac: true, note: 'A rented hall near the campus. Early all-ages slots are the only way kids get in, and the hall wants a sober adult at the door.' },
    { id: 'village-bar', kind: 'BAR', hood: 'east-village', cap: 100, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: true, note: 'A bar with a back-room stage and a weekly punk night billed as all-ages. The crowd is wider and older, and the city rule makes late nights adults only.' },
    { id: 'court-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true, note: 'A newer bar and stage on Court Avenue for growing bands. The weeknight crowd is the headliner\'s friends.' },
    { id: 'indie-club', kind: 'CLUB', hood: 'university', cap: 250, ages: ['A18'], curfew: 1440, ac: true, note: 'The last independent club that books heavy music. Every band wants its nights, and it is over by midnight.' },
    { id: 'ballroom', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['ALL', 'A18'], curfew: 1410, ac: true, note: 'A historic ballroom with many all-ages shows. The big promoter is nearby, it is expensive, and locals rarely get in.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 1500, curfew: 1380, ac: true, note: 'The arena. A national promoter runs it, and it is not for locals.' },
    { id: 'market-stage', kind: 'OUTDOOR', hood: 'valley-junction', cap: 200, curfew: 1260, note: 'A summer market evening with a music stage in a railroad-town district. A local show is a short set between vendors.' }
  ],

  contacts: ['cedar-rapids-ia', 'iowa-city-ia', 'lincoln-ne', 'davenport-ia', 'omaha'],

  calendar: [
    { id: 'fair', label: 'the big state fair', tag: 'fair', month: 8, weeks: [2, 4], dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['university', 'east-village'], elsewhere: [.95, .92, .92] },
    { id: 'arts-fest', label: 'the big arts festival', tag: 'festival', month: 6, week: 4, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'market-nights', label: 'the Thursday market nights', tag: 'festival', month: 7, weeks: [1, 5], dows: [3], can: [.92, .90, .90], hoods: ['valley-junction'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'college football Saturdays', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'college football Saturdays', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 486000 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 508000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 }
  ],
  roads: ['I-80', 'I-35', 'I-235', 'US 69', 'US 65', 'US 30'],

  words: {
    street: ['Court Avenue', 'University Avenue', 'Grand Avenue', 'Ingersoll Avenue', 'Beaver Avenue', 'Euclid Avenue', 'Keosauqua Way', 'Hubbell Avenue', 'Merle Hay Road', 'SW 9th'],
    water: ['the Des Moines River', 'the Raccoon River', 'the Raccoon', 'Gray\'s Lake', 'Saylorville'],
    hood: ['East Village', 'Sherman Hill', 'Beaverdale', 'Highland Park', 'Oak Park', 'Valley Junction', 'Western Gateway', 'Merle Hay'],
    thing: ['tenderloin', 'skywalk', 'the Mixmaster', 'grain elevator', 'corn dog', 'basement', 'bar night', 'weeknight bill', 'tape archive'],
    weather: ['wind chill', 'derecho', 'humidity']
  },

  events: [
    { id: 'DES_MOINES_IA_FAIR_OPENING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'fair' },
      telegraph: 'Fair opening night is Thursday and the whole town is going.',
      title: 'Fair opening night',
      body: 'Every kid in town is at the fairgrounds and the north side basement is empty. The late bands there let out at midnight with nowhere to go.',
      options: [
        { id: 'LATE', label: 'Start after midnight', likely: 'The fair crowd has nowhere else to be.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors late. A tired, loud crowd poured in from the grounds.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is on the midway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }],
          result: 'The basement was thin. The ones who came were the real ones.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Fewer people could make the new one.' }
      ] },

    { id: 'DES_MOINES_IA_UNDER_21_RULE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The city rule puts the kids out of the bar at nine.',
      title: 'The nine o\'clock rule',
      body: 'The city bars minors from licensed music rooms after nine unless the room holds a special exception. The all-ages early set ends and the kids must clear out before the headliner.',
      options: [
        { id: 'EARLY', label: 'Move the bill early', likely: 'Short sets, and the kids see everyone.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'Doors at five. The kids got the whole bill and were home by nine.' },
        { id: 'HALL', label: 'Move it to a hall', likely: 'No bar, no rule. Smaller and tame.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.7 }],
          result: 'A hall took the bill. No beer, no rule, and the kids stayed.' },
        { id: 'ACCEPT', label: 'Let the headliner play to the bar crowd', likely: 'The kids miss the best set.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The headliner played to the older crowd that stayed. The kids watched the door.' }
      ] },

    { id: 'DES_MOINES_IA_ARTS_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The big downtown weekend takes every parking spot for a mile.',
      title: 'The festival takes the parking',
      body: 'Every spot within a mile is gone. A house on Sherman Hill gets noise complaints from a street full of visitors at ten o\'clock sharp.',
      options: [
        { id: 'EARLY', label: 'Finish by ten', likely: 'Short night, no police.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'Done by ten. The street was quiet when the police rolled by.' },
        { id: 'ACCEPT', label: 'Run it and take the complaints', likely: 'The crowd will park far away and walk.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The cops came twice. The bands finished anyway.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The streets were empty by Monday.' }
      ] }
  ]
});
