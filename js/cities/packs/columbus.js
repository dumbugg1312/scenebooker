SB.Cities.register('columbus', {
  v: 1,
  slug: 'columbus',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ohio state university', 'osu', 'ohio state', 'the ohio state university', 'columbus state community college', 'capital university', 'otterbein university', 'the lantern', 'columbus dispatch', 'columbus alive', 'columbus underground', 'columbus blue jackets', 'blue jackets', 'columbus crew', 'ohio state buckeyes', 'buckeyes', 'ohio stadium', 'the horseshoe', 'ohio state fair', 'columbus zoo', 'battelle', 'nationwide insurance', 'l brands', 'wexner medical center', 'nationwide children\'s hospital', 'wosu', 'wbns', 'wcmh', 'wsyx', 'ohio statehouse', 'ohio expo center', 'doo dah parade', 'columbus arts festival', 'rickenbacker', 'wright-patt', 'jeni\'s', 'short north arts district', 'the ohio state', 'columbus metro library', 'columbus monthly', 'step out columbus', 'matter news', '10tv', 'nbc4', 'abc6', 'fox28', 'experience columbus', 'arts midwest', 'crew stadium', 'arnold sports festival', 'arnold classic', 'comfest', 'goodale park', 'breakaway festival', 'rock on the range', 'warriors of metal fest', 'stonewall columbus', 'greater columbus convention center', 'columbus city council', 'ohio department of commerce', 'ohio division of liquor control'],
  blocklist: ['columbus dispatch*', 'ohio state*', 'columbus blue jackets*', 'nationwide arena*', 'wexner*', 'columbus underground*'],

  blurb: ['Campus basements and a laundromat hardcore room anchor a growing, inclusive scene around North High Street.',
          'A hardcore revival is running, and landlords keep selling to apartment developers.'],
  hard: 'Football weekends, rising rents and zoning heat keep rooms short-lived.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A hardcore revival and a hardcore-centered room are documented.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbus' },
    { id: 'grove-city', kind: 'FEEDER', name: 'Grove City', minutes: 15, bearing: 195, note: 'Suburban teens.' },
    { id: 'westerville', kind: 'FEEDER', name: 'Westerville', minutes: 20, bearing: 30, note: 'A northern suburb with a small college.' },
    { id: 'dublin', kind: 'FEEDER', name: 'Dublin', minutes: 20, bearing: 320, note: 'A rich suburb; kids with cars.' },
    { id: 'hilliard', kind: 'FEEDER', name: 'Hilliard', minutes: 20, bearing: 290, note: 'A west suburb.' },
    { id: 'delaware', kind: 'FEEDER', name: 'Delaware', minutes: 30, bearing: 5, note: 'A small college town.' },
    { id: 'london', kind: 'FEEDER', name: 'London', minutes: 30, bearing: 255, note: 'A farm town.' },
    { id: 'lancaster', kind: 'FEEDER', name: 'Lancaster', minutes: 35, bearing: 150, note: 'A small factory town.' },
    { id: 'marysville', kind: 'FEEDER', name: 'Marysville', minutes: 35, bearing: 320, note: 'Exurban.' },
    { id: 'newark', kind: 'FEEDER', name: 'Newark', minutes: 40, bearing: 75, note: 'A small town with garage bands.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', minutes: 70, bearing: 255, slug: 'dayton-oh', note: 'A scrappy sister scene.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', minutes: 75, bearing: 145, note: 'A small college-town scene, in Ohio.' },
    { id: 'cincinnati', kind: 'PEER', name: 'Cincinnati', minutes: 105, bearing: 230, slug: 'cincinnati', note: 'A similar-size neighbor.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 125, bearing: 35, slug: 'akron-oh', note: 'Smaller.' }
  ],

  hoods: [
    { id: 'university', name: 'the University District', route: 'campus', note: 'The student ghetto near the big state university; house shows from pop-punk to hardcore to noise.' },
    { id: 'old-north', name: 'Old North Columbus', route: 'campus', note: 'The North High Street bar strip near campus, where a laundromat bar hosts hardcore and metal.' },
    { id: 'clintonville', name: 'Clintonville', route: 'old-side', note: 'A northern neighborhood of old houses and basements; quieter.' },
    { id: 'short-north', name: 'the Short North', route: 'downtown', note: 'A gentrified arts and bar district north of downtown.' },
    { id: 'franklinton', name: 'Franklinton', route: 'work-side', note: 'West of the river: cheap warehouses and older houses.' },
    { id: 'olde-towne', name: 'Olde Towne East', route: 'old-side', note: 'Victorian mansions turned cheap houses, east of downtown.' },
    { id: 'german-village', name: 'German Village and the Brewery District', route: 'downtown', note: 'Brick and bars south of downtown.' },
    { id: 'hilltop', name: 'Hilltop', route: 'work-side', note: 'The west side; cheap houses.' },
    { id: 'linden', name: 'Linden', route: 'work-side', note: 'The northeast side; low rent and a rowhouse feel.' },
    { id: 'downtown', name: 'Downtown Columbus', route: 'downtown', note: 'The big theaters and a riverfront of parking decks. Touring acts only.' }
  ],

  rooms: [
    { id: 'campus-basement', kind: 'HOUSE', hood: 'university', cap: 60, curfew: 1350, ac: false, outdoor: false, standing: [70, 60, 40], pressure: 55, start: true,
      note: 'A student rental basement near campus. The lease, the neighbors and the ten o\'clock quiet hour all want the same thing.' },
    { id: 'olde-towne-house', kind: 'HOUSE', hood: 'olde-towne', cap: 50, curfew: 1350, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 50,
      note: 'A big old frame house with a damp basement and a porch. A landlord call or a noise call ends it.' },
    { id: 'clintonville-basement', kind: 'HOUSE', hood: 'clintonville', cap: 40, curfew: 1320, ac: false, outdoor: false, standing: [65, 60, 50], pressure: 50,
      note: 'A basement on a quiet residential block. The neighbors complain fast, so the night ends early.' },
    { id: 'franklinton-warehouse', kind: 'DIY', hood: 'franklinton', cap: 150, curfew: 1380, ac: false, standing: [55, 60, 45], pressure: 65, needs: ['VOUCH'],
      note: 'A warehouse space on the west bank. The city has already closed an unpermitted club nearby, and fire code is the question.' },
    { id: 'laundromat', kind: 'BAR', hood: 'old-north', cap: 150, soundFee: 40, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: true, following: .4, standing: [65, 70, 70], pressure: 55,
      note: 'A laundromat bar with a stage on the tile between the washers and dryers. A small pit, a safe bar, and a sale that has everyone nervous.' },
    { id: 'corner-bar', kind: 'BAR', hood: 'old-north', cap: 200, soundFee: 60, ages: ['A21', 'A18'], curfew: 1500, ac: true, following: .3, standing: [50, 65, 70], pressure: 50,
      note: 'A music bar in an old corner building. It shut for two months when the owners sold and reopened under new ones.' },
    { id: 'metal-bar', kind: 'BAR', hood: 'university', cap: 120, soundFee: 50, ages: ['A21'], curfew: 1500, ac: true, following: .3, standing: [50, 65, 70],
      note: 'A small bar on the strip that hosts local metal and black metal bills. Loud, dark and over twenty-one.' },
    { id: 'campus-club', kind: 'CLUB', hood: 'university', cap: 250, houseCosts: 150, ages: ['ALL', 'A18', 'A21'], curfew: 1530, ac: true, following: .5, standing: [50, 70, 65], owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A club near campus that books hardcore and crossover, with ages set show by show. Tickets cost more than the DIY room.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'short-north', cap: 300, ages: ['A18'], curfew: 1440, ac: true, following: .5, standing: [50, 70, 65], owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A mid-size all-ages hall. Mostly bigger acts, with the occasional heavy tour.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 1700, ages: ['ALL', 'A18', 'A21'], curfew: 1380, ac: true, standing: [40, 65, 55], owner: 'TALENT_BUYER', notice: 90,
      note: 'A historic theater that takes touring heavy and alt acts. The company that ran the hall downtown folded in 2025.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'short-north', cap: 200, rent: 25, curfew: 1140, standing: [55, 65, 50],
      note: 'A park pavilion on a summer afternoon. It needs a permit, and everyone is gone by seven.' }
  ],

  contacts: ['dayton-oh', 'cincinnati', 'akron-oh', 'cleveland', 'toledo-oh'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.8, .9, .9], hoods: ['university', 'old-north', 'short-north'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.8, .9, .9], hoods: ['university', 'old-north', 'short-north'], elsewhere: [.95, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.8, .9, .9], hoods: ['university', 'old-north', 'short-north'], elsewhere: [.95, .97, .97] },
    { id: 'strength-fest', label: 'the big strength festival', tag: 'festival', month: 3, week: 1, dows: [3, 4, 5, 6], can: [.92, .9, .9], hoods: ['downtown'], elsewhere: [.97, .97, .97] },
    { id: 'park-fest', label: 'the neighborhood park festival', tag: 'festival', month: 6, week: 4, dows: [4, 5, 6], can: [.9, .88, .88], hoods: ['short-north'], elsewhere: [1, .97, .97] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 8, week: 1, dows: [4, 5, 6], can: [.95, .93, .93] },
    { id: 'move-out', label: 'spring move-out weekend', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['university', 'old-north'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },


  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2100000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 2300000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 2370000 },
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 2200000 }
  ],
  roads: ['I-70', 'I-71', 'I-270', 'I-670', 'High Street', 'Route 23'],

  words: {
    street: ['North High Street', 'Broad Street', 'Summit Street', 'Fourth Street', 'Hudson Street', 'Cleveland Avenue'],
    water: ['the Scioto', 'the Olentangy'],
    hood: ['Clintonville', 'Franklinton', 'Olde Towne East', 'Hilltop', 'Linden', 'Old North'],
    thing: ['laundromat', 'High Street', 'football weekend', 'student ghetto', 'sticky couch', 'copy shop'],
    weather: ['tornado watch', 'ice storm']
  },

  events: [
    { id: 'COLUMBUS_GAME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'Kickoff is at noon on Saturday, and every bus on the main strip is already detoured.',
      title: 'Kickoff closes the strip',
      body: 'Home football has the main street shut and every bus rerouted. The laundromat show has no kids and a bartender with nothing to do.',
      options: [
        { id: 'LATE', label: 'Push doors back until the stadium crowd has cleared', likely: 'The ones who want a night out show up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The kids who walked in from the side streets were loud and glad.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed home. The regulars came, and the dryers kept running.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'COLUMBUS_TEEN_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A younger crowd is on the list for an all-ages night, and the new youth curfew has everyone counting minutes.',
      title: 'The door after ten',
      body: 'A fifteen-year-old shows up after ten and the new youth curfew is a real problem at the door. You can let the kid in, send the kid home, or call a parent.',
      options: [
        { id: 'PARENT', label: 'Call a parent and wait with them', likely: 'A slow few minutes. The family remembers it.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'The parent came and picked the kid up and said thanks. It was the right call.' },
        { id: 'TURN', label: 'Turn them away at the door', likely: 'Safe, and the door gets quieter.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'You turned two more away before eleven. Nobody was happy, and nobody got cited.' },
        { id: 'ACCEPT', label: 'Let them in and keep the night going', likely: 'Risky if anyone is watching the block.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'MONEY', amount: -25 }],
          result: 'The night went on, but the whole room kept one eye on the street.' }
      ] },

    { id: 'COLUMBUS_WAREHOUSE_INSPECTION', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'Word is that a wall came down in a building across town and the fire marshal is walking every converted space.',
      title: 'The fire marshal is walking the block',
      body: 'A warehouse in another part of town had a wall collapse, and the inspectors are visiting every converted building on the west bank. Tonight\'s bill is in one of them.',
      options: [
        { id: 'BASEMENT', label: 'Move the whole bill to a basement', likely: 'Smaller and louder. Nobody inspects a house.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with an hour to spare, and the floor was packed.' },
        { id: 'LIMIT', label: 'Cap the room and run it by the book', likely: 'A smaller crowd on the door, and a clean night.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'You counted heads at the door and stayed under the line. The marshal never came.' },
        { id: 'MOVEDAY', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});