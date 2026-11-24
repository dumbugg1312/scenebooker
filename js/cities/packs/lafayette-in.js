SB.Cities.register('lafayette-in', {
  v: 1,
  slug: 'lafayette-in',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['purdue university', 'purdue', 'boilermakers', 'boilermaker', 'boilers', 'wabash college', 'saint joseph\'s college', 'depauw university',
           'depauw', 'indiana state university', 'indiana university', 'ball state', 'notre dame', 'old oaken bucket', 'hunters\' moon',
           'hunters moon', 'feast of the hunters', 'fort ouiatenon', 'indiana beach', 'journal & courier', 'journal and courier', 'purdue exponent',
           'wlfi', 'wpbi', 'citybus', 'subaru', 'amtrak', 'wabash landing', 'tippecanoe battlefield', 'prophetstown', 'the wea plain grange',
           'wea plain grange', 'cold storage no. 3', 'cold storage no 3', 'the buffalo fish social club', 'buffalo fish social club',
           'upper main hardware loft', 'the cornstarch union hall', 'cornstarch union hall', 'starlite lanes', 'the levee back dock',
           'levee back dock', 'ninth street hill rental', 'wabash avenue elks annex', 'elks annex', 'elks', 'the big four skate shop',
           'big four skate shop', 'tenderloin hall', 'ross-ade', 'ross ade stadium', 'big ten', 'evgrandprix', 'autonomous karting series',
           'tippecanoe county 4-h fair', '4-h fair', 'tippecanoe county fair', 'tippecanoe county historical association', 'stars and stripes',
           'wkoa', 'visit indiana', 'indiana alcohol and tobacco commission', 'bandsintown', 'eventbrite', 'indiana daily student'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university is written only as 'the university' or 'the big school'. */
  blocklist: ['purdue*', 'journal & courier*', 'indiana beach*', 'citybus*', 'subaru*', 'wlfi*', 'hunters moon*', 'old oaken*'],

  blurb: ['A river town in flat Indiana farmland, split by the Wabash from a huge university town, where fresh weirdos arrive every August.',
          'Basements, lodge halls and a farm kid\'s barn do the rest. Half the room is new every fall and has never heard the local bands.'],
  hard: 'Students leave in May and take the houses and bands with them.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lafayette' },
    { id: 'battle-ground', kind: 'FEEDER', name: 'Battle Ground and Dayton', minutes: 15, bearing: 10, note: 'Farm villages just north; kids drive in for anything.' },
    { id: 'delphi', kind: 'FEEDER', name: 'Delphi', minutes: 25, bearing: 30, note: 'A canal and farm county seat; kids come to Lafayette for everything.' },
    { id: 'attica', kind: 'FEEDER', name: 'Attica', minutes: 35, bearing: 235, note: 'An old river town down the Wabash.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 40, bearing: 5, note: 'A lake resort town; summer teens come south for shows.' },
    { id: 'frankfort', kind: 'FEEDER', name: 'Frankfort', minutes: 40, bearing: 120, note: 'A rail and meatpacking farm town with a large Latino community.' },
    { id: 'crawfordsville', kind: 'FEEDER', name: 'Crawfordsville', minutes: 40, bearing: 185, note: 'A small college and steel town that genuinely trades bands with Lafayette.', bands: 1 },
    { id: 'logansport', kind: 'FEEDER', name: 'Logansport', minutes: 50, bearing: 55, note: 'A railroad and river town with some DIY activity.' },
    { id: 'rensselaer', kind: 'FEEDER', name: 'Rensselaer', minutes: 55, bearing: 320, note: 'A farm town near the interstate with a small Catholic college.' },
    { id: 'greencastle', kind: 'FEEDER', name: 'Greencastle', minutes: 60, bearing: 175, note: 'A small liberal-arts college town with a small, active scene.', bands: 1 },
    { id: 'terre-haute', kind: 'PEER', name: 'Terre Haute', minutes: 85, bearing: 215, scene: 800, note: 'A river and college town with a revived downtown; the nearest equal.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign', state: 'IL', minutes: 100, bearing: 260, slug: 'champaign-il', note: 'The nearest big-scene college town, across the state line.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 105, bearing: 110, scene: 900, note: 'College and factory, the closest in structure; a regular bill-swapping partner.' },
    { id: 'bloomington', kind: 'PEER', name: 'Bloomington', minutes: 120, bearing: 190, slug: 'bloomington-in', note: 'Bigger, artsier and better established; Lafayette looks up to it and competes with it.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Lafayette', route: 'downtown', note: 'Old brick blocks with upper floors, small bar rooms, a theater or two, and empty ground floors for a one-night pop-up.' },
    { id: 'ninth-street-hill', name: 'Ninth Street Hill', route: 'old-side', note: 'Big old houses cut into apartments, with deep porches and stone cellars; the heart of house shows.' },
    { id: 'centennial', name: 'Centennial and Highland Park', route: 'old-side', note: 'Small frame houses and bungalows, working-class and mixed; garages and backyards.' },
    { id: 'sagamore', name: 'the Sagamore Parkway strip', route: 'work-side', note: 'Car-oriented chain strips, rinks, and warehouse and light-industrial bays for practice rooms.' },
    { id: 'chauncey', name: 'Chauncey Village', route: 'campus', note: 'The student bar and apartment strip at the edge of campus; bars with band nights, not DIY.' },
    { id: 'the-levee', name: 'the Levee riverfront', route: 'campus', note: 'A shiny riverfront of shops and a skating center across the pedestrian bridge; nothing DIY but good for skaters.' },
    { id: 'happy-hollow', name: 'Happy Hollow and West Lafayette', route: 'campus', note: 'Older rental houses with basements, hit by stricter rental enforcement and rising rents.' },
    { id: 'county-edge', name: 'the county edge', route: 'work-side', note: 'Barns, pole buildings and shop sheds out past the last streetlight.' }
  ],

  rooms: [
    { id: 'hill-house', kind: 'HOUSE', hood: 'ninth-street-hill', cap: 60, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'A big old house cut into apartments, with a stone cellar. The usual first room for a new booker, until a landlord or a neighbor finds out.' },
    { id: 'hollow-basement', kind: 'HOUSE', hood: 'happy-hollow', cap: 50, curfew: 1380, ac: false, outdoor: false, sketch: 30, standing: [70, 60, 40], pressure: 60,
      note: 'A rental basement on the campus side where the scene lives. The city already shut one regular room here, and the landlords are reading the rules.' },
    { id: 'centennial-garage', kind: 'HOUSE', hood: 'centennial', cap: 40, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50], pressure: 40,
      note: 'A garage and a backyard among small frame houses. Quiet from the university, cold in winter and rained out in spring.' },
    { id: 'main-storefront', kind: 'DIY', hood: 'downtown', cap: 120, rent: 80, curfew: 1350, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'],
      note: 'A storefront on a main downtown street, talked up as the first all-ages live room downtown in years. Rooms like this live lease to lease.' },
    { id: 'old-hall', kind: 'HALL', hood: 'downtown', cap: 250, rent: 250, deposit: 100, curfew: 1320, ac: true, standing: [55, 60, 65], owner: 'HALL_MANAGER', pressure: 40,
      note: 'A historic downtown hall with an all-ages concert series. No beer, a deposit, and a promoter who is looking for sponsors.' },
    { id: 'tavern', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], soundFee: 50, curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A tavern that books punk and hardcore with a door price. Twenty-one and up, so a booker who wants kids has to go elsewhere.' },
    { id: 'sagamore-bay', kind: 'DIY', hood: 'sagamore', cap: 60, rent: 50, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'],
      note: 'A light-industrial bay used as a practice room. Loud is fine, a fire inspection is not.' },
    { id: 'taproom-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 300, rent: 25, curfew: 1320, sketch: 30, standing: [55, 60, 55], pressure: 40,
      note: 'The open-air lot beside a brewery, good for one big all-ages bill in the early fall. It rains out and ends by a set curfew.' },
    { id: 'pole-barn', kind: 'OUTDOOR', hood: 'county-edge', cap: 120, rent: 15, curfew: 1380, ac: false, outdoor: true, sketch: 35, standing: [60, 60, 50], pressure: 30,
      note: 'A pole building past the last streetlight, run off a generator in summer. The city rules do not reach it.' }
  ],

  contacts: ['champaign-il', 'bloomington-in', 'indianapolis', 'chicago', 'fort-wayne-in'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['happy-hollow', 'chauncey', 'downtown'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['happy-hollow', 'chauncey', 'downtown'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['happy-hollow', 'chauncey', 'downtown'], elsewhere: [.95, 1, 1] },
    { id: 'kart-race', label: 'the big kart race weekend', tag: 'race', month: 4, week: 4, dows: [5], can: [.85, .88, .90], hoods: ['happy-hollow', 'chauncey'], elsewhere: [.97, .97, .97] },
    { id: 'fort-festival', label: 'the living-history festival weekend', tag: 'festival', month: 10, week: 4, dows: [5, 6], can: [.92, .92, .92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [3, 4], dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['county-edge'], elsewhere: [.95, .92, .92] },
    { id: 'finals-moveout', label: 'finals and move-out week', tag: 'graduation', month: 5, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.80, .85, .90], hoods: ['happy-hollow', 'chauncey', 'ninth-street-hill'], elsewhere: [.95, .95, .95] },
    { id: 'move-in', label: 'fall move-in week', tag: 'holiday', month: 8, weeks: [3, 4], dows: [3, 4, 5, 6], can: [1.08, 1.05, 1], hoods: ['happy-hollow', 'chauncey', 'ninth-street-hill'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1500, inForce: false } },

  points: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2100000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Champaign', state: 'IL', lat: 40.12, lon: -88.24, pop: 236000 },
    { name: 'Kokomo', state: 'IN', lat: 40.49, lon: -86.13, pop: 60000 }
  ],
  roads: ['I-65', 'US 52', 'US 231', 'SR 26', 'SR 38', 'I-74'],

  words: {
    street: ['Main Street', 'Sagamore Parkway', 'Ninth Street', 'State Street', 'Teal Road', 'Union Street'],
    water: ['the Wabash', 'Wildcat Creek', 'the old canal'],
    hood: ['Ninth Street Hill', 'Centennial', 'Highland Park', 'Chauncey', 'Happy Hollow', 'Vinton', 'Wabash'],
    thing: ['tenderloin', 'sugar cream pie', 'corn syrup haze', 'pole barn', 'tailgate', 'move-in week', 'finals week', 'lodge hall', 'drummer graduates'],
    weather: ['lake effect snow', 'corn sweat']
  },

  events: [
    { id: 'LAFAYETTE_IN_BRIDGE_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'There is a home game on Saturday and the bridge will be shut to cars.',
      title: 'Game day on the wrong side of the river',
      body: 'The bridge is closed to traffic for the game and your show is at the other end of the river. Nobody has a ride across.',
      options: [
        { id: 'WALK', label: 'Tell everyone to walk the bridge and push doors back', likely: 'A long walk and a late crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'People crossed on foot in clumps all evening, so doors opened an hour late and the room filled slowly.' },
        { id: 'SIDE', label: 'Move the bill to a room on the campus side', likely: 'The crowd is already there, and so is the noise.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A basement on the campus side took the bill and the stairs were full all night.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Most of the crowd is on the wrong side.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The room held the bands and their friends, and nobody else got across.' }
      ] },

    { id: 'LAFAYETTE_IN_INSPECTOR', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The city shut a basement room a while back, and now neighbors know which office to call.',
      title: 'An inspector at the door',
      body: 'This time it is a city inspector with a clipboard instead of a cop, and he wants to see the stairs, the exits and how many people are down there.',
      options: [
        { id: 'CAP', label: 'Cut the crowd to what the stairs can hold', likely: 'A smaller night, but the room stays open.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Half the list waited outside and traded places, and the inspector left without writing anything.' },
        { id: 'MOVE', label: 'Move the bill to a hall that is allowed to be loud', likely: 'Costs money and the feel.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -50 }],
          result: 'The hall took the bill for a flat fee and a deposit, and it felt like a different night.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'The room could be shut for good.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The inspector wrote a warning, and the bands played tense and short.' }
      ] },

    { id: 'LAFAYETTE_IN_FAIR_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The county fair runs nine nights and every farm kid is out there.',
      title: 'Nine nights at the fairgrounds',
      body: 'The fair is on and the whole county is at the fairgrounds. Your ten o\'clock show has two people in it, and one of them is the headliner\'s cousin.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair lets out', likely: 'The farm kids come late and tired.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The fair let out at eleven and a wave of sunburned kids came through the door.' },
        { id: 'FAIR', label: 'Put the bill on at the barn by the fairgrounds', likely: 'The crowd is already there, but the sound is not good.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'OUTDOOR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.0 }],
          result: 'The pole barn was full of fair kids on the edge of the lot, shouting over a generator.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The county is somewhere else.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Two people showed up, the band and a cousin.' }
      ] },

    { id: 'LAFAYETTE_IN_RIVER_ROAD_JAM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The festival weekend is going to jam the river road from end to end.',
      title: 'The river road is a parking lot',
      body: 'The living-history weekend has the river road at a crawl, so the band due in from the south sits in traffic and the opener has to play twice.',
      options: [
        { id: 'STRETCH', label: 'Let the opener stretch and start the headliner late', likely: 'A long night, and the crowd is patient.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The opener played two sets and the headliner arrived in time for the last one.' },
        { id: 'DROP', label: 'Cut the late band from the bill', likely: 'Costs trust with the late band.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The bill ran short without the headliner and the room felt it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] }
  ]
});
