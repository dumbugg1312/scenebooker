SB.Cities.register('bridgeport-ct', {
  v: 1,
  slug: 'bridgeport-ct',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of bridgeport', 'sacred heart university', 'fairfield university', 'housatonic community college', 'university of new haven', 'connecticut post', 'ctinsider',
           'wpkn', 'wice', 'bridgeport bluefish', 'bridgeport sound tigers', 'bridgeport islanders', 'hartford yard goats', 'webster bank arena', 'harbor yard amphitheater',
           'hartford healthcare amphitheater', 'barnum museum', 'p.t. barnum', 'bridgeport hospital', 'st. vincent\'s', 'sikorsky', 'lycoming', 'bridgeport & port jefferson ferry',
           'port jefferson ferry', 'bridgeport brass', 'general electric', 'hubbell', 'people\'s united bank', 'webster bank', 'metro-north', 'amtrak', 'merritt parkway',
           'capulet fest', 'connecticut metal fest', 'connecticut death fest', 'hurricane sandy', 'hurricane irene', 'hurricane gloria', 'ct post', 'long island sound', 'barnum festival', 'great street parade', 'wing ding parade', 'skyblast', 'harambee festival', 'seaside park',
           'pleasure beach', 'steelpointe harbor', 'beardsley zoo', 'pseg power', 'new haven independent', 'new haven arts', 'new journal at yale', 'connecticut public',
           'ct mirror', 'news12', 'wshu', 'daily voice', 'hartford courant', 'stereogum', 'louder sound', 'bandsintown', 'songkick', 'nonoise', 'municode', 'ecode360',
           'aclu of connecticut'],
  blocklist: ['connecticut post*', 'ctinsider*', 'sikorsky*', 'barnum museum*', 'webster bank*', 'connecticut metal fest*', 'connecticut death fest*'],

  blurb: ['A faded factory and harbor city that gave the early Connecticut punk shows and a metalcore sound the whole state still chases.',
          'Rooms are pizza parlors and borrowed halls, and half the crowd drives in from the rich suburbs. The ferry horn cuts the soundcheck, and the old heads say the city had it all first.'],
  hard: 'The good rooms keep closing and half your crowd lives in another town.',
  region: 'the Sound shore',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A band from this city shaped metalcore, and the old heads still expect hardcore.' }
  ],

  chokepoints: [
    { id: 'i95-river-crossing', name: 'the river crossing on I-95', p: .03 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bridgeport' },
    { id: 'fairfield', kind: 'FEEDER', name: 'Fairfield', minutes: 10, bearing: 240, note: 'A wealthy suburb. Teens come in, and there are a few bands.' },
    { id: 'stratford', kind: 'FEEDER', name: 'Stratford', minutes: 10, bearing: 100, beyond: 'i95-river-crossing', note: 'A blue-collar suburb across the river. Garage bands.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 20, bearing: 80, beyond: 'i95-river-crossing', note: 'A shoreline suburb with a pop-punk and metal pool.' },
    { id: 'trumbull', kind: 'FEEDER', name: 'Trumbull and Shelton', minutes: 20, bearing: 335, note: 'Hillside suburbs full of teenagers with cars.' },
    { id: 'westport', kind: 'FEEDER', name: 'Westport and Weston', minutes: 20, bearing: 270, note: 'Wealthy, with kids who have money and a few bands.' },
    { id: 'norwalk', kind: 'FEEDER', name: 'Norwalk', minutes: 25, bearing: 245, note: 'A small city with its own all-ages hall and real scene overlap.' },
    { id: 'stamford', kind: 'FEEDER', name: 'Stamford', minutes: 35, bearing: 235, note: 'A harder city near the state line, with bands and old heads.' },
    { id: 'danbury', kind: 'FEEDER', name: 'Danbury', minutes: 40, bearing: 325, note: 'An inland city with its own DIY and metal crowd.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 45, bearing: 60, slug: 'new-haven-ct', note: 'Older, with a deeper house and DIY network.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', minutes: 60, bearing: 35, slug: 'hartford', note: 'A similar spread-out scene.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 100, bearing: 65, slug: 'providence', note: 'Occasional bill swaps along I-95.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'An arena, a courthouse and a few bars and clubs. Dead after events.' },
    { id: 'east-end', name: 'the East End', route: 'work-side', note: 'Old factory buildings and triple-deckers: cheap rent and warehouses.' },
    { id: 'east-side', name: 'the East Side', route: 'work-side', note: 'Rowhouses, immigrant families and auto shops.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Dense houses near the old factory district, with many two-family flats.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'The harbor side: the port and the industrial waterfront.' },
    { id: 'north-end', name: 'the North End', route: 'campus', note: 'A quieter residential area near the highway and the suburbs.' },
    { id: 'black-rock', name: 'Black Rock', route: 'old-side', note: 'A harbor neighborhood with a main street, bars and bungalows.' },
    { id: 'the-hollow', name: 'the Hollow', route: 'work-side', note: 'Mixed residential and industrial near the river.' }
  ],

  rooms: [
    { id: 'west-flat', kind: 'HOUSE', hood: 'west-side', cap: 40, curfew: 1320, ac: false, start: true,
      note: 'A front room and basement in a two-family flat on the west side. The downstairs neighbor is the whole threat.' },
    { id: 'east-end-flat', kind: 'HOUSE', hood: 'east-end', cap: 60, curfew: 1350, ac: false, pressure: 55,
      note: 'A ground-floor flat and a garage behind a triple-decker. It floods in a nor\'easter and the landlord lives upstairs.' },
    { id: 'factory-loft', kind: 'DIY', hood: 'east-end', cap: 100, curfew: 1380, needs: ['VOUCH'], pressure: 60,
      note: 'A loft in an old factory building, shared with a studio. Rent hikes close rooms like this one, and everyone knows it.' },
    { id: 'avenue-cafe', kind: 'HALL', hood: 'downtown', cap: 120, curfew: 1350, ac: true,
      note: 'A cafe on the avenue that books punk-adjacent bills in the evening. All ages, daytime-business hours and a lease it depends on.' },
    { id: 'rock-bar', kind: 'BAR', hood: 'black-rock', cap: 90, ages: ['A21'], curfew: 1500,
      note: 'A neighborhood bar with a corner stage, in a block of bungalows. The people next door call early and often.' },
    { id: 'avenue-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL', 'A21'], curfew: 1380, following: .5,
      note: 'A club that took over when the Black Rock room closed. All-ages metal one night, a 21-plus tribute the next, so the age line moves.' },
    { id: 'harbor-arena', kind: 'BIG', hood: 'downtown', cap: 1500, ages: ['ALL'], curfew: 1380,
      note: 'The arena and the amphitheater by the harbor. Tours of other genres, and not the room a new booker gets.' },
    { id: 'north-shop', kind: 'SHOP', hood: 'north-end', cap: 30, curfew: 1140, ac: true,
      note: 'A shop on a strip beside the houses. An in-store set after hours, over by seven.' },
    { id: 'shore-lawn', kind: 'OUTDOOR', hood: 'south-end', cap: 200, curfew: 1200, rent: 20, pressure: 45,
      note: 'A pavilion and a lawn on the shore used for the summer festivals. It needs the city\'s blessing and goes quiet at dusk.' },
    { id: 'club-hall', kind: 'HALL', hood: 'the-hollow', cap: 150, curfew: 1320, ac: true,
      note: 'A rented parish or club hall near the river. The neighbors\' lease, not the cops, is the worry.' }
  ],

  contacts: ['new-haven-ct', 'hartford', 'providence', 'new-york'],

  calendar: [
    { id: 'street-parade', label: 'the big parade weekend', tag: 'parade', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.88, .82, .85], hoods: ['downtown', 'south-end', 'north-end'], elsewhere: [.97, .95, .95] },
    { id: 'juneteenth', label: 'the Juneteenth parade', tag: 'parade', month: 6, week: 2, dows: [5], can: [.95, .90, .92], hoods: ['south-end'], elsewhere: [1, 1, 1] },
    { id: 'pr-parade', label: 'the Puerto Rican parade weekend', tag: 'parade', month: 7, week: 2, dows: [5, 6], can: [.92, .85, .88], hoods: ['south-end', 'east-side'], elsewhere: [1, .97, .97] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.90, .88, .90], hoods: ['south-end', 'black-rock'], elsewhere: [.97, .97, .97] },
    { id: 'arena-winter', label: 'home basketball and hockey', tag: 'game', month: 1, weeks: [1, 3], dows: [4, 5], can: [.90, .97, .97], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'noreaster', label: 'nor\'easter season', tag: 'holiday', month: 2, week: 2, dows: [4, 5, 6], can: [.80, .85, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'thanksgiving-weekend', label: 'Thanksgiving weekend', tag: 'holiday', month: 11, week: 4, dows: [4, 5, 6], can: [.75, .85, .90] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 19900000 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'Port Chester', state: 'NY', lat: 41, lon: -73.67, pop: 30000 },
    { name: 'New Rochelle', state: 'NY', lat: 40.91, lon: -73.78, pop: 80000 }
  ],
  roads: ['I-95', 'Route 8', 'Route 25', 'Route 1'],

  words: {
    street: ['Main Street', 'Fairfield Avenue', 'Park Avenue', 'State Street', 'Stratford Avenue', 'Barnum Avenue'],
    water: ['the Pequonnock', 'the harbor', 'Black Rock Harbor'],
    hood: ['East End', 'West Side', 'South End', 'North End', 'Black Rock', 'the Hollow'],
    thing: ['drawbridge', 'ferry horn', 'nor\'easter', 'pizza box', 'triple-decker', 'train ride home'],
    weather: ['nor\'easter', 'ice storm', 'summer heat']
  },

  events: [
    { id: 'BRIDGEPORT_CT_I95_BREAKDOWN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews have the lanes on the highway over the river down to one.',
      title: 'A truck is stuck on the river crossing',
      body: 'A broken-down truck has the highway crossing backed up for miles on the night of your show. The bands and the kids from the shore towns are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared, and the shore towns stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together.' }
      ] },

    { id: 'BRIDGEPORT_CT_PARADE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade route is posted along the avenue, and the cafe\'s block is on it.',
      title: 'The parade has the avenue',
      body: 'A parade and a street festival shut the avenue and half the blocks around the room. The van has to park three streets away in Brooklawn.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone where to park', likely: 'Most get in before the barricades, but the crowd is thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You opened doors an hour early, and the ones who came parked a mile away and carried the amps.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The street stayed shut, and half the list never found a place to leave the car.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'BRIDGEPORT_CT_NOREASTER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'A nor\'easter is stacking up over the Sound, and the shore highway is already slow.',
      title: 'The highway is shut at the river',
      body: 'The storm closed the highway at the river. The band from New Haven can\'t get in, and a Stratford garage band is the only act within walking distance of the room.',
      options: [
        { id: 'LOCAL', label: 'Let the garage band fill the slot', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was one local band and a long, loose night, and the room was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the plows', likely: 'The start is late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, and you started late but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everyone trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come came.' }
      ] }
  ]
});
