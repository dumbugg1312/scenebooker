SB.Cities.register('seattle', {
  v: 1,
  slug: 'seattle',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of washington', 'uw', 'seattle university', 'seattle pacific university', 'seattle central college', 'seattle times', 'the stranger',
           'seattle weekly', 'kexp', 'kuow', 'kiro', 'king 5', 'komo', 'kcts', 'seahawks', 'seattle mariners', 'sounders', 'kraken', 'huskies', 'microsoft', 'amazon',
           'boeing', 'starbucks', 'costco', 'nordstrom', 'expedia', 'bumbershoot', 'sasquatch', 'northwest terror fest', 'disemboweled god fest', 'seafair',
           'capitol hill block party', 'emerald city comic con', 'joint base lewis-mcchord', 'jblm', 'naval station everett', 'puget sound naval shipyard',
           'sound transit', 'washington state ferries', 'space needle', 'pike place', 'pike place market', 'lumen field', 't-mobile park', 'climate pledge arena',
           'seattle center', 'sub pop', 'grunge', 'nirvana', 'pearl jam', 'soundgarden', 'tacoma dome', 'evergreen state college', 'western washington university',
           'seattle police', 'link light rail', 'metro transit', 'nintendo', 'valve', 'rei', 'safeco', 'the showbox', 'neumos', 'the crocodile', 'vera project',
           'torchlight parade', 'blue angels', 'hempfest', 'northwest folklife', 'folklife festival', 'fremont solstice parade', 'seattle pride', 'pridefest',
           '206 blast fest', 'hoodstock', 'cascade pbs', 'crosscut', 'spin magazine', 'mynorthwest', 'kiro 7', 'sdot', 'sdci', 'madison park times', 'seattle met'],
  blocklist: ['seattle times*', 'the stranger seattle*', 'kexp*', 'bumbershoot*', 'showbox*', 'crocodile cafe*', 'vera project*', 'neumos*'],

  blurb: ['Rain, ferries and a rent crisis, but an old all-ages tradition keeps the kids coming. Metal and punk both run deep here.',
          'A big, serious stop on I-5, where bills mix ages and genres and everyone wants the room to last.'],
  hard: 'Rent and noise complaints keep killing the rooms; every house show lives on borrowed time.',
  region: 'the Northwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Vancouver', state: 'BC', lat: 49.28, lon: -123.12 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 }
  ],

  tilt: [
    { fan: 'metal', band: 'metal', d: .08, reason: 'A strong extreme metal circuit runs through the whole Sound.' },
    { fan: 'street-punk', band: 'street-punk', d: .08, reason: 'A long all-ages punk history; kids still expect it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Seattle' },
    { id: 'tacoma', kind: 'FEEDER', name: 'Tacoma', minutes: 40, bearing: 195, lean: ['hardcore'], note: 'Its own scene with a strong hardcore history. Kids drive up.' },
    { id: 'everett', kind: 'FEEDER', name: 'Everett', minutes: 35, bearing: 5, note: 'A port and Navy town with young bands. Kids ride in on I-5.' },
    { id: 'bellevue', kind: 'FEEDER', name: 'Bellevue', minutes: 20, bearing: 90, beyond: 'floating-bridges', note: 'The wealthy east side. Suburban kids come west for shows.' },
    { id: 'renton', kind: 'FEEDER', name: 'Renton', minutes: 25, bearing: 140, beyond: 'floating-bridges', note: 'A working-class suburb full of garage bands.' },
    { id: 'kent', kind: 'FEEDER', name: 'Kent', minutes: 30, bearing: 170, note: 'Warehouse and suburb sprawl south of the city.' },
    { id: 'bremerton', kind: 'FEEDER', name: 'Bremerton', minutes: 60, bearing: 250, note: 'A shipyard town across the Sound. The ferry schedule decides when the band arrives.' },
    { id: 'bellingham', kind: 'FEEDER', name: 'Bellingham', minutes: 90, bearing: 5, note: 'A college town up I-5.' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', minutes: 60, bearing: 195, slug: 'olympia-wa', note: 'A small scene with a long DIY tradition, still active with grind and punk.' },
    { id: 'portland', kind: 'PEER', name: 'Portland', state: 'OR', minutes: 175, bearing: 185, slug: 'portland', note: 'A scene of similar size. The usual tour pairing.' }
  ],

  chokepoints: [{ id: 'floating-bridges', name: 'the floating bridges', p: .03 }],

  hoods: [
    { id: 'capitol-hill', name: 'Capitol Hill', route: 'downtown', note: 'Dense bars and apartments, the old home of the small all-ages rooms. Expensive now.' },
    { id: 'belltown', name: 'Belltown', route: 'downtown', note: 'The old club strip, mostly lost to condo towers.' },
    { id: 'ballard', name: 'Ballard', route: 'old-side', note: 'Old fishing streets with houses and breweries. House shows here draw noise complaints.' },
    { id: 'fremont', name: 'Fremont', route: 'old-side', note: 'A canal and bridge neighborhood of converted warehouses and rehearsal spaces.' },
    { id: 'columbia-city', name: 'Columbia City and Rainier Valley', route: 'old-side', note: 'Cheaper houses and family streets.' },
    { id: 'west-seattle', name: 'West Seattle', route: 'old-side', note: 'Across the bridge, a separate feel and few rooms.' },
    { id: 'sodo', name: 'SoDo', route: 'work-side', note: 'Warehouses and rail yards south of downtown. Rehearsal rooms and the odd warehouse show.' },
    { id: 'georgetown', name: 'Georgetown', route: 'work-side', note: 'Industrial, by the airfield and the river. Cheap space and few neighbors to hear it.' },
    { id: 'u-district', name: 'the U District', route: 'campus', note: 'Cheap group houses and low basements with drip pipes. A long all-ages tradition.' }
  ],

  rooms: [
    { id: 'u-district-house', kind: 'HOUSE', hood: 'u-district', cap: 60, curfew: 1380, ac: false, outdoor: false, pressure: 45, start: true,
      note: 'A group house near the university with a low basement and a packed upstairs. Cheap, loud, and the lawn fills up.' },
    { id: 'rainier-porch', kind: 'HOUSE', hood: 'columbia-city', cap: 50, curfew: 1350, ac: false, outdoor: false,
      note: 'A porch-and-basement house on a family block. The neighbors decide how long it lasts.' },
    { id: 'ballard-house', kind: 'HOUSE', hood: 'ballard', cap: 40, curfew: 1320, ac: false, outdoor: true, pressure: 60,
      note: 'An old frame house with a yard, one noise tip from a visit. It lives on borrowed time.' },
    { id: 'rail-warehouse', kind: 'DIY', hood: 'georgetown', cap: 150, curfew: 1440, ac: false, pressure: 65, needs: ['VOUCH'],
      note: 'A warehouse by the rail line and the airfield. The grind and crust bills land here, and the police have come with no noise call.' },
    { id: 'practice-complex', kind: 'DIY', hood: 'sodo', cap: 100, curfew: 1380, ac: false, pressure: 50,
      note: 'A rehearsal-space complex whose big room doubles as a show space. Cheap, and the fire code is a rumor.' },
    { id: 'rail-yard', kind: 'OUTDOOR', hood: 'sodo', cap: 200, curfew: 1260, rent: 0, pressure: 65,
      note: 'A rail yard under a bridge: no permit, no security, and a long bill. The rain, the police or a freight train ends it.' },
    { id: 'arts-hall', kind: 'HALL', hood: 'fremont', cap: 200, curfew: 1320, ac: true, seated: true,
      note: 'An old church turned arts hall, mostly seated. You have to ask for the standing floor.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'georgetown', cap: 60, curfew: 1260, ac: true, following: .2,
      note: 'A record shop with an in-store set. Afternoon or early evening, and done by nine.' },
    { id: 'back-room', kind: 'DIY', hood: 'belltown', cap: 150, curfew: 1350, ac: true, standing: [70, 70, 70], pressure: 55,
      note: 'A volunteer-run all-ages room in the back of a shop. The rules are kept strictly, because the permit is why rooms like it have shut before.' },
    { id: 'hill-bar', kind: 'BAR', hood: 'capitol-hill', cap: 100, ages: ['A21'], curfew: 1440, pressure: 55,
      note: 'A corner bar with a back stage. Minors can come early but must be out by ten, and the rent keeps climbing.' },
    { id: 'bridge-cafe', kind: 'BAR', hood: 'west-seattle', cap: 120, ages: ['A21'], curfew: 1440,
      note: 'A cafe-club on the main drag across the bridge that books punk. Minors out by ten.' },
    { id: 'hill-club', kind: 'CLUB', hood: 'capitol-hill', cap: 300, ages: ['ALL', 'A21'], curfew: 1470, following: .5,
      note: 'A three-hundred-person club with a mezzanine. The metal and hardcore weekenders land here, sometimes all ages.' },
    { id: 'ballroom', kind: 'BIG', hood: 'belltown', cap: 1000, ages: ['A18'], curfew: 1380,
      note: 'A downtown ballroom that touring bills stop at. Out of reach for a new booker.' }
  ],

  contacts: ['olympia-wa', 'portland', 'bellingham-wa', 'spokane-wa'],

  calendar: [
    { id: 'pride', label: 'the pride parade weekend', tag: 'parade', month: 6, week: 4, dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['capitol-hill', 'belltown'], elsewhere: [.95, .95, .95] },
    { id: 'folk-fest', label: 'the spring folk festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [.95, .92, .90] },
    { id: 'solstice', label: 'the solstice parade', tag: 'parade', month: 6, week: 3, dows: [5], can: [.90, .88, .88], hoods: ['fremont', 'ballard'], elsewhere: [1, .97, .97] },
    { id: 'night-parade', label: 'the summer night parade', tag: 'parade', month: 7, week: 4, dows: [5], can: [.88, .85, .85], hoods: ['belltown', 'sodo'], elsewhere: [.97, .95, .95] },
    { id: 'boat-weekend', label: 'the lake boat and air show weekend', tag: 'airshow', month: 8, week: 1, dows: [4, 5, 6], can: [.92, .88, .85] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [6], can: [.90, .95, .95], hoods: ['sodo'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.90, .95, .95], hoods: ['sodo'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2540000 },
    { name: 'Vancouver', state: 'BC', lat: 49.28, lon: -123.12, pop: 2600000 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Eugene', state: 'OR', lat: 44.05, lon: -123.09, pop: 380000 }
  ],
  roads: ['I-5', 'I-90', 'SR-520', 'SR-99', 'I-405'],

  words: {
    street: ['Pike', 'Pine', 'Broadway', 'Aurora', 'Rainier Avenue', '45th'],
    water: ['Puget Sound', 'Lake Washington', 'Lake Union', 'the Duwamish', 'the ship canal'],
    hood: ['Capitol Hill', 'Ballard', 'Fremont', 'Georgetown', 'Columbia City', 'West Seattle', 'Belltown', 'SoDo'],
    thing: ['drizzle', 'ferry', 'espresso', 'bridge', 'wet amp', 'parking ticket'],
    weather: ['drizzle', 'gray day', 'rain on the load-in']
  },

  events: [
    { id: 'SEATTLE_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The floating bridge is scheduled for a maintenance closure this week.',
      title: 'The bridge is shut',
      body: 'The floating bridge closed for the night, and the east-side kids and the bands from over the lake cannot cross. Everyone is rerouting around the water.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the closure', likely: 'Most make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the lake.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never reopened in time. The east side stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way around', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went around together. They will remember that.' }
      ] },

    { id: 'SEATTLE_WAREHOUSE_POLICE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A warehouse show a few weeks back got a visit from the police and a question about permits.',
      title: 'Police at the warehouse door',
      body: 'Police roll up to the rail-side warehouse with no noise call on file, asking for the permit. The bill is half through and the doors are still open.',
      options: [
        { id: 'PAPERS', label: 'Show them every paper you have and keep playing', likely: 'If it holds, the night survives. A shaky one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'They read the papers for an hour. Half the room drifted out, and the rest played on.' },
        { id: 'CLOSE', label: 'Close it down and send everyone home', likely: 'Safe. The bands lose their set.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .5 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You shut it at once. It was a short night and a quiet street.' },
        { id: 'MOVE', label: 'Move the rest of the bill to a house', likely: 'Smaller and louder, and the police are not invited.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'The bill went to a basement across the city. Fewer of them found it.' }
      ] },

    { id: 'SEATTLE_PARADE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'parade' },
      telegraph: 'The parade is this weekend, and every bar on the hill is expecting a flood.',
      title: 'The hill is full',
      body: 'The parade weekend has packed every bar on the hill, so the back stage is empty by nine and the kids are standing in the street.',
      options: [
        { id: 'EARLY', label: 'Start early and finish before the hill fills', likely: 'Most get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early and a tight set. The ones who came were out before the crowd peaked.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids are on the street.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the room stayed on the street. The regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
