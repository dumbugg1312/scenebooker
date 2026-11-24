SB.Cities.register('hartford', {
  v: 1,
  slug: 'hartford',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of connecticut', 'uconn', 'trinity college', 'university of hartford', 'central connecticut state', 'ccsu', 'wesleyan', 'university of saint joseph',
           'capital community college', 'hartford courant', 'ctinsider', 'hartford advocate', 'wesu', 'wtic', 'wfsb', 'wvit', 'hartford yard goats', 'hartford wolf pack',
           'uconn huskies', 'connecticut sun', 'aetna', 'cigna', 'travelers', 'hartford healthcare', 'pratt & whitney', 'pratt and whitney', 'stanley black & decker',
           'mohegan sun', 'foxwoods', 'xl center', 'dunkin park', 'the bushnell', 'connecticut science center', 'mark twain house', 'connecticut state capitol',
           'hartford marathon', 'connecticut death fest', 'capulet fest', 'hurricane irene', 'hurricane gloria', 'hurricane sandy', 'colt firearms', 'eversource', 'riverfront dragon boat', 'dragon boat & asian festival', 'mortensen riverfront plaza', 'riverfront recapture',
           'capital city pride', 'hartford pride', 'pridefest', 'greater hartford festival of jazz', 'bushnell park', 'riverside park', 'head of the riverfront',
           'puerto rican day parade', 'west indian independence celebration', 'rentschler field', 'daily campus', 'ctvisit', 'ctpublic', 'connecticut public',
           'wnpr', 'new journal at yale', 'new haven independent', 'new haven register', 'bandsintown', 'jambase', 'hartford bonanza', 'music at the market'],
  blocklist: ['hartford courant*', 'ctinsider*', 'uconn*', 'aetna*', 'cigna*', 'mohegan sun*', 'foxwoods*', 'connecticut death fest*'],

  blurb: ['A spread-out insurance town where the heavy shows live in suburban basements and one big club. Downtown goes dark at six.',
          'The scene drives in from every direction, one night here, one night in a mill town. Nobody lives near the room, and everyone is home by midnight.'],
  hard: 'Nobody lives near the venue, and downtown is empty after dark.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New Haven', state: 'CT', lat: 41.31, lon: -72.92 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges and the viaduct', p: .035 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Hartford' },
    { id: 'west-hartford', kind: 'FEEDER', name: 'West Hartford', minutes: 10, bearing: 270, scene: 100, note: 'An affluent suburb of teen bands, basements and garages.',
      rooms: [
      { id: 'suburb-basement', kind: 'HOUSE', hood: 'west-hartford-hood', cap: 60, curfew: 1320, ac: false,
      note: 'A basement with a boiler and a drum kit in the teen-band suburb. The neighbors and the quiet hour are the threat.' }
      ] },
    { id: 'east-hartford', kind: 'FEEDER', name: 'East Hartford and Manchester', minutes: 15, bearing: 95, beyond: 'river-bridges', note: 'Across the river. Working-class, with bands, and the kids come in.' },
    { id: 'new-britain', kind: 'FEEDER', name: 'New Britain', minutes: 20, bearing: 235, note: 'An old factory town with Polish roots and a few bands.' },
    { id: 'enfield', kind: 'FEEDER', name: 'Enfield and Windsor Locks', minutes: 25, bearing: 5, note: 'Northern suburbs by the Massachusetts line.' },
    { id: 'vernon', kind: 'FEEDER', name: 'Vernon and Rockville', minutes: 25, bearing: 70, beyond: 'river-bridges', note: 'Mill towns to the east with a few bands.' },
    { id: 'bristol', kind: 'FEEDER', name: 'Bristol', minutes: 30, bearing: 245, note: 'A smaller factory town. Kids drive in.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown', minutes: 30, bearing: 175, beyond: 'river-bridges', note: 'A college and river town with bands and a student crowd.' },
    { id: 'meriden', kind: 'FEEDER', name: 'Meriden', minutes: 30, bearing: 205, note: 'A small city with cheap basements.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 45, bearing: 200, slug: 'new-haven-ct', note: 'A deeper DIY network with a house-show history.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 60, bearing: 100, slug: 'providence', note: 'Shared bills along Route 6 and I-84.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 60, bearing: 55, slug: 'worcester-ma', note: 'A similar-sized scene. Fill dates both ways.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The office district and the arena strip: a few clubs and bars, dead after work hours.' },
    { id: 'asylum-hill', name: 'Asylum Hill', route: 'old-side', note: 'Victorian houses and apartments among the office towers. Mixed, with some old rooms.' },
    { id: 'frog-hollow', name: 'Frog Hollow', route: 'work-side', note: 'A Latino corridor of old factories and cheap rent.' },
    { id: 'parkville', name: 'Parkville', route: 'work-side', note: 'Old industrial buildings turned art and music spaces. The likeliest place for a loud room.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'Italian and Irish rowhouses and two-families close to downtown.' },
    { id: 'barry-square', name: 'Barry Square', route: 'campus', note: 'Near a small college: cheap flats and basements.' },
    { id: 'west-end', name: 'the West End', route: 'old-side', note: 'Leafy houses, artists and students. The more affluent edge.' },
    { id: 'north-end', name: 'the North End', route: 'work-side', note: 'Hard-hit and mostly residential, with little nightlife.' },
    { id: 'west-hartford-hood', name: 'West Hartford', route: 'town:west-hartford', note: 'The affluent suburb to the west: old frame houses, teen bands, boilers and drum kits in the basements.' },
    { id: 'east-hartford-hood', name: 'East Hartford', route: 'campus', note: 'Across the river: subdivisions, strip malls and basements.' }
  ],

  rooms: [
    { id: 'barry-flat', kind: 'HOUSE', hood: 'barry-square', cap: 60, curfew: 1350, ac: false, pressure: 55, start: true,
      note: 'A flat and a basement near the small college. Landlords and the student turnover each May decide how long it lasts.' },
    { id: 'river-basement', kind: 'HOUSE', hood: 'east-hartford-hood', cap: 50, curfew: 1320, ac: false,
      note: 'A finished basement across the river bridges. The Hartford kids show up late, or not at all.' },
    { id: 'bakery-studio', kind: 'DIY', hood: 'parkville', cap: 100, curfew: 1380, needs: ['VOUCH'], pressure: 55,
      note: 'An old industrial building turned arts space. The building code and a landlord who might sell hang over every show.' },
    { id: 'hollow-loft', kind: 'DIY', hood: 'frog-hollow', cap: 80, curfew: 1350, needs: ['VOUCH'], pressure: 60,
      note: 'A storefront or loft in the old factory corridor, if anyone opens one. The fire marshal knows the block.' },
    { id: 'club-hall', kind: 'HALL', hood: 'asylum-hill', cap: 150, curfew: 1350, owner: 'HALL_MANAGER', ac: true,
      note: 'An ethnic social club hall rented by the night for all-ages bills. The club board and the insurance are the worry.' },
    { id: 'west-end-shop', kind: 'SHOP', hood: 'west-end', cap: 40, curfew: 1140, ac: true,
      note: 'An in-store afternoon set among the leafy streets. Over by seven.' },
    { id: 'music-pub', kind: 'BAR', hood: 'downtown', cap: 200, ages: ['ALL', 'A21'], matinee: true, curfew: 1500,
      note: 'A pub stage on the main strip with a band every night. Daytime shows go all ages, and the crowd is gone by the time the towers go dark.' },
    { id: 'pizza-bar', kind: 'BAR', hood: 'south-end', cap: 120, ages: ['A21'], curfew: 1500, pressure: 50,
      note: 'A pizza-and-beer room where the age line is the drink wristband. One bad night with the liquor board could end it.' },
    { id: 'heavy-club', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['A18', 'A21'], curfew: 1410, following: .6,
      note: 'The one dependable room for touring heavy bills, with a basement room under it. The promoter\'s rent and arena nights are the threat.' },
    { id: 'music-hall', kind: 'BIG', hood: 'downtown', cap: 2500, ages: ['ALL'], curfew: 1380,
      note: 'A downtown music hall and theater. The scene sees it only as a package opener or a ticket-holder.' },
    { id: 'plaza-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 400, curfew: 1260, rent: 25, pressure: 45,
      note: 'The park and the riverfront plaza host summer festivals. A daytime slot, a permit and a bad forecast.' }
  ],

  contacts: ['new-haven-ct', 'providence', 'worcester-ma', 'springfield-ma'],

  calendar: [
    { id: 'marathon', label: 'marathon morning', tag: 'race', month: 10, week: 2, dows: [5], can: [.90, .88, .90], hoods: ['downtown', 'asylum-hill'], elsewhere: [1, 1, 1] },
    { id: 'dragon-boat', label: 'the dragon boat festival', tag: 'festival', month: 8, week: 3, dows: [5], can: [.92, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'riverfront-pride', label: 'Pride at the riverfront', tag: 'festival', month: 6, week: 2, dows: [5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'jazz-fest', label: 'the park jazz festival', tag: 'festival', month: 7, week: 3, dows: [4, 5, 6], can: [.92, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'pr-parade', label: 'the Puerto Rican parade', tag: 'parade', month: 9, week: 3, dows: [6], can: [.92, .90, .90], hoods: ['downtown', 'frog-hollow'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football across the river', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['east-hartford-hood'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football across the river', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.88, .95, .95], hoods: ['east-hartford-hood'], elsewhere: [1, 1, 1] },
    { id: 'snow-ice', label: 'snow and ice week', tag: 'holiday', month: 1, week: 3, dows: [4, 5], can: [.80, .85, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 19900000 },
    { name: 'Springfield', state: 'MA', lat: 42.12, lon: -72.54, pop: 464000 },
    { name: 'Northampton', state: 'MA', lat: 42.32, lon: -72.63, pop: 29000 }
  ],
  roads: ['I-84', 'I-91', 'Route 2', 'Route 9', 'I-691'],

  words: {
    street: ['Albany Avenue', 'Park Street', 'Farmington Avenue', 'Main Street', 'Wethersfield Avenue', 'Capitol Avenue'],
    water: ['the Connecticut River', 'the Park River'],
    hood: ['Asylum Hill', 'Frog Hollow', 'Parkville', 'Barry Square', 'Clay Arsenal', 'Wethersfield Avenue'],
    thing: ['triple-decker', 'viaduct', 'turnpike', 'boiler', 'basement', 'diner run'],
    weather: ['snow squall', 'ice storm', 'humidity']
  },

  events: [
    { id: 'HARTFORD_VIADUCT_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the viaduct downtown this week.',
      title: 'The viaduct is a parking lot',
      body: 'A wreck on the viaduct in rush hour has the whole river crossing backed up on the night of your show, and the bands and the kids from the east side are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat rush hour', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You opened doors an hour early, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared, and the east side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together.' }
      ] },

    { id: 'HARTFORD_RACE_BRIDGES', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The marathon closes the downtown streets and the river bridges on Saturday morning.',
      title: 'The marathon has the bridges',
      body: 'The race shuts the river bridges and the downtown streets for the day. The east-side bands and kids can\'t cross, and the barricades come down slowly.',
      options: [
        { id: 'EARLY', label: 'Open late enough for the barricades, and tell everyone the back way', likely: 'Most get in once the streets reopen, but it\'s thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
          result: 'Doors were half an hour late, and the ones who came took the long way around.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The bridges stayed shut past noon, and half the list never made it across.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'HARTFORD_FOOTBALL_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is across the river on Saturday, and the highway exits will back up.',
      title: 'The football-day backup',
      body: 'A home game across the river has every exit backed up, and the van arrives at load-in an hour late. Half the crowd is stuck in the same traffic.',
      options: [
        { id: 'LATE', label: 'Push doors back until the traffic breaks', likely: 'The crowd that wants a night out shows up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and the crowd came in tired and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is stuck on the highway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd gave up at the exit, but the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
