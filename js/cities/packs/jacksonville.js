SB.Cities.register('jacksonville', {
  v: 1,
  slug: 'jacksonville',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['jacksonville university', 'university of north florida', 'unf', 'florida state college at jacksonville', 'fscj', 'edward waters university',
           'jacksonville jaguars', 'jumbo shrimp', 'jacksonville sharks', 'icemen', 'jacksonville sheriff\'s office', 'jso', 'jacksonville fire rescue',
           'naval air station jacksonville', 'nas jax', 'naval station mayport', 'mayport', 'kings bay', 'blount island', 'jaxport', 'florida times-union',
           'times-union', 'folio weekly', 'jax today', 'wjct', 'wjxt', 'wtlv', 'wjax', 'the players championship', 'tpc sawgrass', 'gate river run',
           'jacksonville jazz festival', 'florida-georgia game', 'daytona 500', 'hurricane irma', 'hurricane matthew', 'hurricane dora', 'tropical storm fay',
           'mayo clinic', 'baptist health', 'csx', 'fidelity national', 'florida blue', 'everbank', 'tiaa bank field', 'publix', 'waffle house', 'amtrak',
           'florida georgia', 'gator bowl', 'taxslayer gator bowl', 'everbank stadium', 'vystar', 'vystar arena', 'florida theatre', 'ponte vedra concert hall',
           'thrasher-horne center', 'springing the blues', 'jacksonville beach air show', 'beaches oktoberfest', 'florida fin fest', 'jacksonville today',
           'news4jax', 'action news jax', 'first coast news', 'wokv', 'jaxmusic', 'jax music', 'jacksonville daily record', 'unf spinnaker', 'visit jacksonville',
           'jacksonville center for the performing arts', 'st. augustine amphitheatre', 'environmental protection board'],
  blocklist: ['folio weekly*', 'times-union*', 'jacksonville jumbo shrimp*', 'jaxport*', 'gate river run*', 'florida blue*', 'florida theatre*', 'gator bowl*', 'vystar arena*'],

  blurb: ['A sprawling river city where hardcore keeps getting kicked out of rooms and rebuilding anyway.',
          'The kids drive an hour to a show, and the vans cross a bridge to get there.'],
  hard: 'Fire code and distance: a room can close overnight and nothing is near anything.',
  region: 'the Southeast',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A rebuilt hardcore room and a long memory of the eighties.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Jacksonville' },
    { id: 'orange-park', kind: 'FEEDER', name: 'Orange Park', minutes: 20, bearing: 195, beyond: 'river-bridges', note: 'Suburban, across the river. Kids drive in.' },
    { id: 'ponte-vedra', kind: 'FEEDER', name: 'Ponte Vedra', minutes: 30, bearing: 120, note: 'A beach suburb. Few kids go to hardcore shows.' },
    { id: 'green-cove', kind: 'FEEDER', name: 'Green Cove Springs', minutes: 35, bearing: 195, beyond: 'river-bridges', note: 'The rural edge of the next county over.' },
    { id: 'fernandina', kind: 'FEEDER', name: 'Fernandina Beach', minutes: 40, bearing: 25, note: 'An island town with a few bands and a small crowd.' },
    { id: 'kingsland', kind: 'FEEDER', name: 'Kingsland', state: 'GA', minutes: 40, bearing: 335, note: 'Across the state line, near the sub base.' },
    { id: 'st-augustine', kind: 'FEEDER', name: 'St. Augustine', minutes: 45, bearing: 155, note: 'A tourist town with a college crowd and some bands.' },
    { id: 'palatka', kind: 'FEEDER', name: 'Palatka', minutes: 60, bearing: 190, beyond: 'river-bridges', note: 'A small river town with a few kids.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 90, bearing: 215, slug: 'gainesville-fl', note: 'A long-running scene where bands trade dates.' },
    { id: 'savannah', kind: 'PEER', name: 'Savannah', state: 'GA', minutes: 140, bearing: 340, slug: 'savannah-ga', note: 'A similar-size scene up I-95.' }
  ],
  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges', p: .03 }
  ],

  hoods: [
    { id: 'murray-hill', name: 'Murray Hill', route: 'old-side', note: 'Small bungalows and a main drag of old storefronts. A hardcore room reopened here after a fire-permit closure.' },
    { id: 'riverside', name: 'Riverside and Avondale', route: 'old-side', note: 'The oldest arty district: big old houses, bars and a historic strip. It has lost rooms that took hardcore.' },
    { id: 'five-points', name: 'Five Points', route: 'old-side', note: 'Vintage shops, cheap bars and tattoo shops. It lost a punk-friendly bar too.' },
    { id: 'downtown', name: 'downtown and the Northbank', route: 'downtown', note: 'Mostly empty after office hours. Stadium nights and a few bars.' },
    { id: 'springfield', name: 'Springfield', route: 'old-side', note: 'Old houses coming back. Cheap rent for house shows.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Warehouses, strip malls and cheap square footage.' },
    { id: 'arlington', name: 'Arlington', route: 'campus', note: 'East-side sprawl with young families and renters.' },
    { id: 'northside', name: 'the Northside', route: 'work-side', note: 'Port, airport and industrial yards. Far from everything.' },
    { id: 'san-marco', name: 'San Marco', route: 'old-side', note: 'A walkable square south of the river with old storefronts and a club that has stepped locals up for years.' },
    { id: 'the-beaches', name: 'the beaches', route: 'downtown', note: 'Surf, bars and beach rentals. A different crowd, and a ride out.' }
  ],

  rooms: [
    { id: 'springfield-porch', kind: 'HOUSE', hood: 'springfield', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'A porch and a living room in an old house. The whole street can hear it, and one noise call ends the night at ten.' },
    { id: 'murray-yard', kind: 'HOUSE', hood: 'murray-hill', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 55,
      note: 'A yard and porch on a bungalow block, close to the hardcore room. The neighbors are the threat, and ten o\'clock is the line.' },
    { id: 'laundromat-room', kind: 'DIY', hood: 'murray-hill', cap: 150, ages: ['ALL'], curfew: 1380, ac: true, pressure: 65, needs: ['VOUCH'],
      note: 'A hardcore room in a former laundromat, with a rehearsal space next door. It was shut once over permits, and the kids are welcome. One more inspection could end it.' },
    { id: 'westside-bay', kind: 'DIY', hood: 'westside', cap: 80, curfew: 1350, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse bay with no permits and plenty of floor. The fire marshal is the end of it.' },
    { id: 'skate-lot', kind: 'OUTDOOR', hood: 'arlington', cap: 250, rent: 25, curfew: 1350, ac: false, outdoor: true, following: .2,
      note: 'A skatepark with a live room attached. Doors at seven, sodas for the kids, and the summer thunderstorms win every argument.' },
    { id: 'bridge-field', kind: 'OUTDOOR', hood: 'riverside', cap: 100, rent: 10, curfew: 1290, ac: false, outdoor: true, pressure: 55,
      note: 'Under a bridge or on a ballfield, spread by word. The police move the crowd and a storm cancels the rest.' },
    { id: 'veg-cafe', kind: 'BAR', hood: 'murray-hill', cap: 100, ages: ['A18'], curfew: 1440, ac: true,
      note: 'A cafe by day with a stage by night, and a past of all-ages bills. Ask before you assume it still books them.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'five-points', cap: 120, ages: ['A21'], curfew: 1500, ac: true, pressure: 55,
      note: 'A bar with a back-room stage on the old strip. The rents keep rising, and a landlord lost the last one its lease.' },
    { id: 'square-club', kind: 'CLUB', hood: 'san-marco', cap: 300, ages: ['ALL'], curfew: 1410, ac: true, following: .5,
      note: 'The established punk, ska and metal club, mostly all-ages. The step up when a local band has a following.' },
    { id: 'northbank-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1470, ac: true, following: .4,
      note: 'A low, dark club with punk and hardcore dates under a new name. Another downtown hall is eighteen-plus in practice.' },
    { id: 'westside-hall', kind: 'HALL', hood: 'westside', cap: 200, ages: ['ALL'], curfew: 1350, ac: true, owner: 'HALL_MANAGER',
      note: 'A rented hall for a fundraiser show. All ages, out by ten-thirty, and a manager who counts the chairs.' },
    { id: 'old-cinema', kind: 'BIG', hood: 'five-points', cap: 1250, ages: ['A18'], curfew: 1410, ac: true, owner: 'TALENT_BUYER',
      note: 'A converted cinema that opened last year. Touring level, not a local room.' },
    { id: 'main-drag-shop', kind: 'SHOP', hood: 'murray-hill', cap: 50, curfew: 1170, ac: true, following: .2,
      note: 'An old storefront on the main drag. After-hours in-stores, over by seven-thirty.' }
  ],

  contacts: ['gainesville-fl', 'savannah-ga', 'daytona-beach-fl', 'orlando'],

  calendar: [
    { id: 'road-race', label: 'the long-distance road race', tag: 'race', month: 3, week: 1, dows: [5], can: [.92, .90, .90], hoods: ['downtown', 'riverside', 'five-points'], elsewhere: [1, 1, 1] },
    { id: 'beach-fest', label: 'the beaches fall festival', tag: 'festival', month: 10, week: 3, dows: [4, 5], can: [.92, .90, .90], hoods: ['the-beaches'], elsewhere: [1, .98, .98] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.90, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.90, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: true } },

  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 },
    { name: 'Tallahassee', state: 'FL', lat: 30.44, lon: -84.28, pop: 200000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Daytona Beach', state: 'FL', lat: 29.21, lon: -81.02, pop: 80000 }
  ],
  roads: ['I-95', 'I-10', 'I-295', 'Beach Boulevard', 'Atlantic Boulevard', 'Philips Highway'],

  words: {
    street: ['Beach Boulevard', 'Atlantic Boulevard', 'Philips Highway', 'Roosevelt Boulevard', 'San Jose Boulevard', 'Park Street'],
    water: ['the St. Johns', 'the river', 'the Intracoastal'],
    hood: ['Murray Hill', 'Riverside', 'Avondale', 'Five Points', 'Springfield', 'San Marco', 'Arlington'],
    thing: ['bridge', 'humidity', 'storage unit', 'fire code', 'river barge'],
    weather: ['afternoon thunderstorm', 'storm watch']
  },

  events: [
    { id: 'JACKSONVILLE_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A ship is due under the bridge the afternoon of your show, and the crews are working on the approach.',
      title: 'The bridge is up',
      body: 'A wreck and a ship have the river bridges tied up the night of your show. Everyone coming from the other bank is sitting in traffic.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared, and the people on the far bank stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went the long way around together.' }
      ] },

    { id: 'JACKSONVILLE_INSPECTOR', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Somebody saw the line out the door at the old laundromat and said the word permit out loud.',
      title: 'The fire inspector walks in',
      body: 'Mid-set, a man with a clipboard and a flashlight is counting heads at the back of the room. The last time this happened the doors stayed shut for months.',
      options: [
        { id: 'PORCH', label: 'Move the rest of the bill to a porch down the block', likely: 'It\'s smaller and louder, and the ten o\'clock line is close.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'Twenty minutes later a porch took the bill. The street heard all of it, and nobody called.' },
        { id: 'CLEAR', label: 'Clear the floor and cut the night short', likely: 'Nobody gets hurt, but everybody gets cheated.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The floor was cleared and the inspector left, and this time nobody wrote a thing down.' },
        { id: 'ACCEPT', label: 'Argue the head count and play on', likely: 'It might work, or it might be the last night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'MONEY', amount: -40 }],
          result: 'You argued the count down and paid for the trouble, and the set went on a little tense.' }
      ] },

    { id: 'JACKSONVILLE_STORM_CUT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'The afternoon storm is parked over the east side and the radar will not move.',
      title: 'The power is out at the skatepark',
      body: 'A storm took the power in the middle of the second band. The kids in the bowl offer to run the PA off a car battery, and the rain is not done.',
      options: [
        { id: 'BATTERY', label: 'Run the PA off the car battery', likely: 'It\'s thin and scrappy, and a story they will tell.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .02 }],
          result: 'You used a car battery and a borrowed cord. It sounded awful, and nobody left.' },
        { id: 'WAIT', label: 'Wait out the storm', likely: 'It\'s a late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The rain stopped near ten, so you started late and lost half the little kids.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] }
  ]
});
