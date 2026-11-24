SB.Cities.register('fort-walton-beach-fl', {
  v: 1,
  slug: 'fort-walton-beach-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['eglin air force base', 'eglin afb', 'hurlburt field', 'duke field', 'air force special operations command', 'special forces', 'tyndall',
           'northwest florida state college', 'nwfsc', 'university of west florida', 'wallace community college', 'florida state', 'billy bowlegs', 'pirate festival',
           'destin fishing rodeo', 'fishing rodeo', 'destin seafood festival', 'boggy fest', 'boggy bayou mullet festival', 'mullet festival',
           'northwest florida daily news', 'the beachcomber', 'okaloosa county transit', 'uptown station', 'sunpass', 'waffle house', 'the camellia city', 'the sonic city',
           'vfw', 'american legion', 'legion post', 'the sound side annex', 'camellia hall', 'mullet row social club', 'the quarterdeck garage', 'santa rosa rec room',
           'the bridge toll lounge', 'tower beach backroom', 'the sandbar shed', 'pensacola road pavilion', 'eglin parkway pool hall', 'the big dipper carport',
           'okaloosa county', 'niceville high', 'choctawhatchee high', 'fort walton beach high', 'fwb high', 'felicity plastic surgery', 'krewe of bowlegs',
           'william augustus bowles museum', 'fort walton beach landing', 'landing park', 'emerald coast magazine', 'getthecoast', 'midbay news', 'sowal', 'niceville.com',
           'jazz in the park', 'emerald coast home and boat show', 'nashcar show tour', 'inweekly', 'orlando weekly'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Eglin is not banned alone because Pensacola's list bans the bare word;
     the road named for the base is written SR 85 here so the two lists never collide. */
  blocklist: ['eglin*', 'hurlburt*', 'billy bowlegs*', 'boggy fest*', 'destin fishing rodeo*', 'waffle house*'],

  blurb: ['A beach and base town with a few rooms, a thin crowd and bands who treat the bridge like a border. A touring band gets a real welcome.',
          'Clubs change hands, and the better scene is an hour west.'],
  hard: 'Few rooms, a moving crowd, and the better scene an hour west.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Pensacola', state: 'FL', lat: 30.42, lon: -87.22 },
    { name: 'Tallahassee', state: 'FL', lat: 30.45, lon: -84.25 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Walton Beach' },
    { id: 'destin', kind: 'FEEDER', name: 'Destin', minutes: 25, bearing: 105, beyond: 'brooks-bridge', season: { months: [5, 6, 7, 8], mul: 1.3 },
      note: 'The tourist end. Kids work there and drive west to play; rent has pushed everyone out.' },
    { id: 'niceville', kind: 'FEEDER', name: 'Niceville and Valparaiso', minutes: 25, bearing: 50, pop: 20500,
      note: 'Base-contractor kids and the commuter college crowd across the bay. Suburban and affluent.' },
    { id: 'navarre', kind: 'FEEDER', name: 'Navarre', minutes: 25, bearing: 265, note: 'Military and retiree bedroom town to the west. A few teen bands.' },
    { id: 'crestview', kind: 'FEEDER', name: 'Crestview', minutes: 35, bearing: 350, note: 'The county seat up SR 85 and I-10. A railroad town grown by the base.' },
    { id: 'gulf-breeze', kind: 'FEEDER', name: 'Gulf Breeze', minutes: 45, bearing: 262, note: 'Affluent bedroom town across from Pensacola.' },
    { id: 'freeport', kind: 'FEEDER', name: 'Freeport', minutes: 45, bearing: 80, note: 'A fast-growing commuter town; the road there crosses the bay or goes around it.' },
    { id: 'santa-rosa-beach', kind: 'FEEDER', name: 'Santa Rosa Beach and 30A', minutes: 55, bearing: 95, beyond: 'brooks-bridge', season: { months: [5, 6, 7, 8], mul: 1.4 },
      note: 'Rich visitors and beach communities. Summer traffic doubles the drive.' },
    { id: 'defuniak', kind: 'FEEDER', name: 'DeFuniak Springs', minutes: 50, bearing: 55, note: 'A rural county seat built around a round lake.' },
    { id: 'milton', kind: 'FEEDER', name: 'Milton', minutes: 60, bearing: 300, note: 'A river town toward Pensacola, with some teen bands.' },
    { id: 'laurel-hill', kind: 'FEEDER', name: 'Laurel Hill', minutes: 70, bearing: 10, note: 'Farm and church country; kids drive far for any show.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', minutes: 65, bearing: 270, slug: 'pensacola',
      note: 'The bigger scene an hour west. The local kids drive there for shows, and it pulls the bands this town fails to keep.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 115, bearing: 280, slug: 'mobile-al', note: 'A trade partner and a place people leave for, past Pensacola.' },
    { id: 'panama-city', kind: 'PEER', name: 'Panama City', minutes: 100, bearing: 105, scene: 500,
      note: 'The next stop east, still rebuilding after the big storm of 2018.' },
    { id: 'tallahassee', kind: 'PEER', name: 'Tallahassee', minutes: 170, bearing: 90, slug: 'tallahassee-fl', note: 'A university city three hours east where bands go for a college crowd.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'brooks-bridge', name: 'the Brooks Bridge', p: .03 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A compact grid of older low buildings on US 98 and the Sound: a few bars, a hall and the odd storefront.' },
    { id: 'sr85', name: 'the SR 85 strip', route: 'work-side', note: 'Motels, pawn shops, tattoo shops and laundromats on the road to the base. Cheap strip bays and enlisted renters.' },
    { id: 'west-side', name: 'Mary Esther and the west side', route: 'work-side', note: 'Ranch houses and mobile home parks along US 98 toward the airfield. Backyards, carports and garages.' },
    { id: 'shalimar', name: 'Shalimar and Cinco Bayou', route: 'old-side', note: 'Older homes along the bayou, mixed incomes, dock and yard space. The waterfront neighbors hear everything across the water.' },
    { id: 'island', name: 'Okaloosa Island and the bayside', route: 'downtown', note: 'The beach park and Sound waterfront, with a pavilion and docks. Open to the weather and the tourist traffic.' },
    { id: 'north-fwb', name: 'North Fort Walton, Wright and Lake Lorraine', route: 'campus', note: 'Subdivisions and apartment complexes toward the base gates, where most working families and enlisted renters live.' }
  ],

  rooms: [
    { id: 'west-carport', kind: 'HOUSE', hood: 'west-side', cap: 50, curfew: 1350, ac: false, outdoor: false, sketch: 25, pressure: 55, start: true,
      note: 'A carport and back yard on the west side, with a generator. No basements here, and a new noise rule gives the neighbors a way to call it in.' },
    { id: 'bayou-house', kind: 'HOUSE', hood: 'shalimar', cap: 60, curfew: 1320, ac: false, outdoor: false, sketch: 20, pressure: 55,
      note: 'An older bayou house with dock and yard space. The sound carries across the water to wealthier neighbors, so it ends early.' },
    { id: 'base-garage', kind: 'HOUSE', hood: 'north-fwb', cap: 40, curfew: 1350, ac: false, outdoor: false, sketch: 25, pressure: 50,
      note: 'A garage in a subdivision near the base gates. Apartment clubhouses get shut down fast, and renters risk their lease.' },
    { id: 'strip-bay', kind: 'DIY', hood: 'sr85', cap: 80, curfew: 1380, ac: false, sketch: 40, pressure: 55, needs: ['VOUCH'],
      note: 'A rehearsal bay on the strip that turns into a show after hours. Redevelopment and a fire-code complaint are always one call away.' },
    { id: 'rented-hall', kind: 'HALL', hood: 'downtown', cap: 100, curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'A rented fraternal or church hall at a flat fee. Whether it takes a punk bill depends on who is running the keys this year.' },
    { id: 'shop-instore', kind: 'SHOP', hood: 'downtown', cap: 40, curfew: 1200, ac: true, sketch: 5,
      note: 'An in-store at a record or skate shop. Shops here turn over, so ask before you print the poster.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1439, ac: true, soundFee: 60, standing: [50, 60, 65],
      note: 'A bar with a small stage and mostly cover bands for visitors. Live music has to stop at midnight on weeknights, so a punk bill gets a weeknight or an off-season Sunday.' },
    { id: 'sound-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1500, ac: true, houseCosts: 180, following: .4, standing: [45, 65, 60],
      note: 'A nightclub-style music hall on the Sound that has had a few owners. It has run some heavy bills, and whether it is open this month is a fair question.' },
    { id: 'us98-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1470, ac: true, houseCosts: 160, following: .4, standing: [45, 65, 60],
      note: 'A second music hall that promotes local and touring acts. Its address keeps moving, and so does its plan.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 800, ages: ['A18'], curfew: 1440, ac: true, standing: [40, 60, 60],
      note: 'The big room on the Sound. It only fills for a touring name, and it runs mostly hip-hop and tribute nights.' },
    { id: 'island-pavilion', kind: 'OUTDOOR', hood: 'island', cap: 200, curfew: 1260, standing: [55, 55, 50],
      note: 'A pavilion or dock show in the dry months. Afternoon thunderstorms and tourist traffic end it.' }
  ],

  contacts: ['pensacola', 'mobile-al', 'tallahassee-fl', 'daphne-al', { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66 }],

  calendar: [
    { id: 'waterfront-fest', label: 'the spring waterfront festival', tag: 'festival', month: 5, weeks: [2, 3], dows: [3, 4, 5, 6, 0], can: [.82, .85, .88], hoods: ['downtown', 'island'], elsewhere: [.95, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66, pop: 200000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 150000 }
  ],
  roads: ['I-10', 'US 98', 'SR 85', 'US 90', 'SR 189'],

  words: {
    street: ['Racetrack Road', 'Highway 98', 'Highway 85', 'Highway 189', 'Highway 20'],
    water: ['Santa Rosa Sound', 'the Sound', 'Choctawhatchee Bay', 'Boggy Bayou', 'Poquito Bayou', 'Lake Lorraine'],
    hood: ['Shalimar', 'Cinco Bayou', 'Mary Esther', 'Wright', 'Lake Lorraine', 'Valparaiso', 'Okaloosa Island'],
    thing: ['smoked mullet', 'fish dip', 'boiled peanuts', 'pontoon', 'camellia', 'sandbar', 'mirror ball', 'fog machine', 'tourist traffic'],
    weather: ['afternoon thunderstorm', 'heat index']
  },

  events: [
    { id: 'FORT_WALTON_BEACH_FL_BRIDGE_JAM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The beach crowd is in and US 98 is backing up at the bridge.',
      title: 'The Brooks Bridge is jammed',
      body: 'A wreck and a holiday crowd have the Brooks Bridge at a crawl the night of your show. The kids who work and live out toward the beach can\'t get across in time.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from the beach side.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared, so the beach side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads sat in traffic together all the way across.' }
      ] },

    { id: 'FORT_WALTON_BEACH_FL_STILL_WATER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The wind has died and the bayou is flat, and the neighbors have started to notice every sound.',
      title: 'Someone across the water hears every word',
      body: 'On the still bayou the sound carries all the way across, and a neighbor has called it in. An officer is on the way with a laser to measure fifty feet from the property line.',
      options: [
        { id: 'QUIET', label: 'Turn it down and play an acoustic set', likely: 'Quiet and strange, and the crowd thins.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The amps stayed off and the singer leaned in, and the people who stayed listened.' },
        { id: 'MOVE', label: 'Move the bill to a house away from the water', likely: 'Smaller and louder, with different neighbors.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage across town took the bill, and the floor was packed.' },
        { id: 'FINE', label: 'Run it and hope the officer is slow', likely: 'It may cost you a fine.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The officer measured the distance twice and wrote the ticket.' }
      ] },

    { id: 'FORT_WALTON_BEACH_FL_FESTIVAL_DOWNTOWN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The waterfront festival closes streets downtown, and a fireworks barge is coming.',
      title: 'Downtown is closed for the festival',
      body: 'The festival has downtown closed to cars for five days, so the band that booked the downtown club can\'t get to the door, and the parking has been replaced by a fireworks barge.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone where to park', likely: 'Most get in before the barricades. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors opened an hour early, and the people who came parked a mile away and walked.' },
        { id: 'HOUSE', label: 'Move the whole bill to a garage on the west side', likely: 'Smaller and louder, outside the closures.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A carport out west took the bill, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed shut, and half the list never found a place to leave the car.' }
      ] }
  ]
});
