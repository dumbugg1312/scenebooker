SB.Cities.register('college-station-tx', {
  v: 1,
  slug: 'college-station-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['texas a&m', 'a&m', 'aggie', 'aggies', 'aggieland', 'the corps', 'corps of cadets', 'kyle field', 'post oak mall', 'blinn college',
           'blue bell', 'baylor', 'sam houston state', 'fort hood', 'rellis', 'bryan air force base', 'easterwood', 'kanm', 'the battalion', 'shiner',
           'lone star beer', 'tito\'s', 'topo chico', 'university of texas', 'longhorns', 'gang safety zone', 'northgate music', 'rock prairie hall',
           'sixth street carport', 'cross-tie lodge', 'harvey road laundromat backroom', 'the pasture on 60', 'lick creek fellowship hall',
           'the hide and tallow', 'carters bend hall', 'navasota bottoms barn', 'boonville skate shed',
           'destination bryan', 'visit college station', 'kbtx', 'the eagle', 'community impact', 'kamu', 'texags', 'the batt', 'reed arena',
           'rudder auditorium', 'tamu', 'texas reds', 'bryan cotton pickin', 'texas a&m health science center', 'transport.tamu.edu',
           'wolf pen creek amphitheater', 'northgate parking garage', 'houston press', 'dallas observer'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['texas a&m*', 'aggie*', 'kyle field*', 'post oak mall*', 'the battalion*', 'kanm*', 'blue bell*'],

  blurb: ['The campus is all football and red dirt. The punk kids found the old brick downtown next door in Bryan and made it theirs.',
          'Bands form fast and leave at graduation, so every year the scene starts over.'],
  hard: 'Student turnover, football weekends and a summer ghost town.',
  region: 'the Brazos Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'College Station' },
    { id: 'bryan', kind: 'FEEDER', name: 'Bryan', minutes: 15, bearing: 15, note: 'The county seat next door: older, cheaper and more working class, with garages and its own small scene.' },
    { id: 'navasota', kind: 'FEEDER', name: 'Navasota', minutes: 25, bearing: 130, note: 'A small antique and blues town down the highway; kids drive up.' },
    { id: 'hearne', kind: 'FEEDER', name: 'Hearne', minutes: 40, bearing: 320, note: 'A rail junction and farm town to the north.' },
    { id: 'caldwell', kind: 'FEEDER', name: 'Caldwell', minutes: 35, bearing: 225, note: 'A Czech-heritage farm county seat to the southwest.' },
    { id: 'somerville', kind: 'FEEDER', name: 'Somerville', minutes: 35, bearing: 245, note: 'A small rail and lake town.' },
    { id: 'madisonville', kind: 'FEEDER', name: 'Madisonville', minutes: 45, bearing: 50, note: 'A farm county seat toward the interstate.' },
    { id: 'brenham', kind: 'FEEDER', name: 'Brenham', minutes: 55, bearing: 170, note: 'The biggest small town around, with a junior college campus.', bands: 1 },
    { id: 'giddings', kind: 'FEEDER', name: 'Giddings', minutes: 70, bearing: 230, note: 'A farm and oil town on the way to Austin.' },
    { id: 'bellville', kind: 'FEEDER', name: 'Bellville', minutes: 70, bearing: 150, note: 'A farm seat on the exurban Houston edge.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', minutes: 60, bearing: 75, scene: 700, note: 'The nearest other college crowd, in the pine woods.' },
    { id: 'waco', kind: 'PEER', name: 'Waco', minutes: 105, bearing: 335, slug: 'waco-tx', note: 'A university town up the highway; a booker from either town could fill a bill.' },
    { id: 'killeen', kind: 'PEER', name: 'Killeen', minutes: 120, bearing: 285, slug: 'killeen-tx', note: 'An army town: a different, transient crowd.' }
  ],

  hoods: [
    { id: 'northgate', name: 'Northgate', route: 'downtown', note: 'The bar strip across from campus: country music, bars, apartments. Licensed 21-plus shows.' },
    { id: 'southside', name: 'Southside and Eastgate', route: 'campus', note: 'Older houses and duplexes rented to students, with yards and detached garages. The best backyards in the metro, and neighbors with lawyers.' },
    { id: 'texas-avenue', name: 'the Texas Avenue and University Drive strips', route: 'work-side', note: 'Strip centers, chains and big boxes. An occasional vacant unit becomes a short-lived room.' },
    { id: 'wolf-pen', name: 'Wolf Pen Creek', route: 'old-side', note: 'A city-run park and amphitheater. Permit-and-curfew music, not DIY.' },
    { id: 'wellborn', name: 'Wellborn', route: 'old-side', note: 'A rural old rail camp southwest of town: sheds, barns, generators and few complaints.' },
    { id: 'downtown-bryan', name: 'downtown Bryan', route: 'downtown', note: 'The only real downtown in the metro: old brick, a rail line, a few bars and storefronts.' },
    { id: 'east-bryan', name: 'east and south Bryan', route: 'work-side', note: 'Working-class streets, metal buildings and warehouses. The cheapest square footage in the metro.' }
  ],

  rooms: [
    { id: 'southside-yard', kind: 'HOUSE', hood: 'southside', cap: 60, curfew: 1320, ac: false, outdoor: true, pressure: 55, start: true,
      note: 'A backyard behind a rented duplex. The quiet hour starts at ten, and the neighbors have lawyers.' },
    { id: 'bryan-garage', kind: 'HOUSE', hood: 'east-bryan', cap: 50, curfew: 1380, ac: false, outdoor: false, sketch: 30,
      note: 'A garage on a working-class street in Bryan. Fewer complaints than the student side, and fewer students.' },
    { id: 'metal-bay', kind: 'DIY', hood: 'east-bryan', cap: 90, curfew: 1410, ac: false, pressure: 55,
      note: 'A bay in a rented metal building. The lease and the fire code are the threat, and nobody knows which comes first.' },
    { id: 'wellborn-barn', kind: 'OUTDOOR', hood: 'wellborn', cap: 100, curfew: 1380, outdoor: true,
      note: 'A barn and a generator out past the edge of town. Nobody to complain, and a long drive in the heat.' },
    { id: 'cafe-bar', kind: 'BAR', hood: 'downtown-bryan', cap: 120, curfew: 1500, ac: true, following: .3,
      note: 'A cafe-bar with a small stage on the main street, the old punk room. Songwriter nights and free-music nights compete for the floor.' },
    { id: 'brick-club', kind: 'CLUB', hood: 'downtown-bryan', cap: 250, ages: ['ALL'], curfew: 1410, ac: true,
      note: 'A brick club with a stage and a bar that rents to promoters for a cut of the drinks.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown-bryan', cap: 400, ages: ['ALL'], curfew: 1410, ac: true,
      note: 'A restored theater with a mezzanine. Every touring band asks about it, and a local bill can rarely afford it.' },
    { id: 'northgate-bar', kind: 'BAR', hood: 'northgate', cap: 200, curfew: 1560, ac: true, pressure: 55,
      note: 'A campus-edge bar on the strip. Country on the bill, covers bleeding through the walls, and bars here have shut with no warning.' },
    { id: 'strip-hall', kind: 'HALL', hood: 'texas-avenue', cap: 150, curfew: 1350, ac: true, pressure: 55,
      note: 'An empty strip-center unit or a rented hall on a month-to-month lease. It will be gone before you learn its name.' },
    { id: 'creek-stage', kind: 'OUTDOOR', hood: 'wolf-pen', cap: 300, ages: ['ALL'], curfew: 1320, outdoor: true,
      note: 'A city-run amphitheater by the creek. A permit and a curfew, free-night bills, and not DIY at all.' }
  ],

  contacts: ['waco-tx', 'killeen-tx', 'houston', 'austin'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.80, .90, .90], hoods: ['northgate', 'southside', 'texas-avenue'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.80, .90, .90], hoods: ['northgate', 'southside', 'texas-avenue'], elsewhere: [.95, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [5], can: [.80, .90, .90], hoods: ['northgate', 'southside', 'texas-avenue'], elsewhere: [.95, .97, .97] },
    { id: 'graduation', label: 'spring graduation week', tag: 'graduation', month: 5, weeks: [1, 2], dows: [2, 3, 4, 5], can: [.85, .85, .80] },
    { id: 'downtown-fest', label: 'the downtown music festival', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6], can: [.85, .85, .80], hoods: ['downtown-bryan'], elsewhere: [1, .97, .97] },
    { id: 'songwriter-fest', label: 'the songwriter festival weekend', tag: 'festival', month: 10, week: 4, dows: [4, 5], can: [.88, .85, .85], hoods: ['downtown-bryan'], elsewhere: [1, .97, .97] },
    { id: 'spring-fest', label: 'the all-ages spring music day', tag: 'festival', month: 4, week: 1, dows: [5], can: [.92, .90, .90], hoods: ['downtown-bryan'], elsewhere: [1, 1, 1] },
    { id: 'move-in', label: 'fall move-in week', tag: 'holiday', month: 8, weeks: [3, 4], dows: [3, 4, 5, 6], can: [1.05, 1.05, 1.05] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1321 },

  points: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7500000 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74, pop: 2300000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 7700000 },
    { name: 'Huntsville', state: 'TX', lat: 30.72, lon: -95.55, pop: 46000 },
    { name: 'Lake Charles', state: 'LA', lat: 30.23, lon: -93.22, pop: 80000 }
  ],
  roads: ['SH 6', 'SH 21', 'SH 30', 'FM 60', 'SH 6 bypass'],


  events: [
    { id: 'COLLEGE_STATION_TX_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and every hotel in two towns is full.',
      title: 'Football swallows the strip',
      body: 'A home Saturday has put the whole town in traffic. A drive across it takes half an hour, and the show is on the other side.',
      options: [
        { id: 'EARLY', label: 'Open early, before the traffic builds', likely: 'Most get in. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early. The crowd got in before the tailgates started and left before the traffic broke.' },
        { id: 'LATE', label: 'Push doors back until the game traffic clears', likely: 'The crowd that wants a night out shows up. Later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd came in from the bars, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is stuck in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed on the couch. The regulars came.' }
      ] },

    { id: 'COLLEGE_STATION_TX_BAR_SHUTS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9, 10, 11, 2, 3, 4, 5] },
      telegraph: 'A bar on the strip has a notice on the door, and the owner will not say why.',
      title: 'The bar locks its doors',
      body: 'The campus-edge bar that was hosting your show has shut with no warning, over what the owner owed the suppliers. The bands are already on the road.',
      options: [
        { id: 'BAR', label: 'Move the bill to a cafe-bar downtown', likely: 'Smaller and quieter, and a different crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'BAR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A cafe-bar in Bryan took the bill with a day to spare. A smaller room, and a better one.' },
        { id: 'YARD', label: 'Move it to a backyard on short notice', likely: 'Smaller and louder, with neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A backyard took the whole bill, and the floor was packed.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it. Not everyone could make the new one.' }
      ] },

    { id: 'COLLEGE_STATION_TX_FEST_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'A festival is taking over the brick streets this weekend, and every room on them is booked.',
      title: 'The festival has every room',
      body: 'The festival has filled every stage on the brick streets, and the crowd is going where the free music is.',
      options: [
        { id: 'OFFSPOT', label: 'Move the bill to a barn or a garage', likely: 'Smaller and loud, away from the crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A garage took the bill. The ones who wanted the loud room found it.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The casual crowd goes to the free stages.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The free stages took the casual crowd. The regulars came.' },
        { id: 'EARLY', label: 'Start early and finish before the headliners', likely: 'A short night, and it shares the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors early. You were done before the big stages let out.' }
      ] },

    { id: 'COLLEGE_STATION_TX_GRAD_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'graduation' },
      telegraph: 'Graduation is this week, and half the people you know are packing a truck.',
      title: 'The bands graduate',
      body: 'Three of the four bands on the bill lost a member to a job somewhere else. The booker has to find fill-ins or play short.',
      options: [
        { id: 'SHORT', label: 'Run a shorter bill', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Fewer bands and a long, loose night. The room was half full and warm.' },
        { id: 'FILL', label: 'Scramble for fill-ins', likely: 'Costs a day of calls. Most of the bill holds.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two phone calls and a borrowed drummer. It held, and they will remember who called.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it. Not everyone could make the new one.' }
      ] }
  ],

  words: {
    street: ['Texas Avenue', 'University Drive', 'Harvey Road', 'Wellborn Road', 'South College Avenue', 'Highway 6'],
    water: ['the Brazos', 'Carters Creek', 'Wolf Pen Creek', 'Lick Creek'],
    hood: ['Northgate', 'Southside', 'Eastgate', 'Wellborn', 'Boonville', 'Bryan'],
    thing: ['kolache', 'breakfast taco', 'queso', 'feed store', 'sweet tea', 'stock trailer', 'red dirt band', 'brick downtown', 'zine', 'dorm room'],
    weather: ['humidity', 'pop-up storm']
  }
});
