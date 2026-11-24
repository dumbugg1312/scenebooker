SB.Cities.register('san-luis-obispo-ca', {
  v: 1,
  slug: 'san-luis-obispo-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['cal poly', 'california polytechnic', 'cal poly corporation', 'cuesta college', 'cuesta', 'pg&e', 'diablo canyon', 'california men\'s colony',
           'camp roberts', 'vandenberg', 'poly royal', 'mardi gras', 'festival mozaic', 'bubblegum alley', 'madonna inn', 'amtrak', 'pacific surfliner',
           'coast starlight', 'greyhound', 'ucsb', 'uc santa barbara', 'thursday farmers\' market', 'farmers\' market', 'first-thursday bike night',
           'the grade shed', 'tank farm annex', 'cerro hall', 'higuera back room', 'chorro street garage', 'sycamore flats hall', 'the boxcar on marsh',
           'laguna lake carport', 'mustang news', 'kcpr', 'new times slo', 'newtimesslo', 'cal coast news', 'calcoastnews', 'san luis obispo tribune', 'shabang', 'cuesta ridge', 'slo county', 'slopd', 'san luis obispo police', 'the edna valley barn', 'nine sisters hall', 'foothill duplex', 'orcutt road warehouse'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['cal poly*', 'cuesta college*', 'diablo canyon*', 'poly royal*', 'festival mozaic*', 'madonna inn*'],

  blurb: ['A pretty college town where punk lives in garages and borrowed rooms.',
          'The crowd is students and kids from the small towns around it, and it empties every summer.'],
  hard: 'Pricey, quiet town, big summer drop, nowhere sound-proofed.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'San Luis Obispo' },
    { id: 'pismo', kind: 'FEEDER', name: 'Pismo Beach and Grover Beach', minutes: 15, bearing: 175, note: 'Beach and suburb towns south on US 101; surf and skate kids.' },
    { id: 'morro-bay', kind: 'FEEDER', name: 'Morro Bay', minutes: 20, bearing: 305, note: 'A fishing and tourist beach town; little scene, so the kids come in.' },
    { id: 'los-osos', kind: 'FEEDER', name: 'Los Osos', minutes: 20, bearing: 285, note: 'A bedroom community with real surf and skate culture.' },
    { id: 'atascadero', kind: 'FEEDER', name: 'Atascadero', minutes: 20, bearing: 345, note: 'An inland suburb over the grade; the usual source of high-school bands.', scene: 100, rooms: [
      { id: 'atascadero-hall', kind: 'CLUB', hood: 'atascadero-town', cap: 250, houseCosts: 120, split: .8, pa: .8, ages: ['ALL'], curfew: 1350, ac: true, following: .4, sketch: 10,
        standing: [55, 65, 65], owner: 'TALENT_BUYER', note: 'An all-ages room over the grade. The usual place for a high-school band to get a real stage.' }
    ] },
    { id: 'arroyo-grande', kind: 'FEEDER', name: 'Arroyo Grande and Nipomo', minutes: 25, bearing: 170, note: 'Suburban and rural edge to the south.' },
    { id: 'templeton', kind: 'FEEDER', name: 'Templeton and Paso Robles', minutes: 35, bearing: 355, note: 'Wine-country bedroom town and the farm city beyond, with more local culture than the others.' },
    { id: 'cambria', kind: 'FEEDER', name: 'Cambria and Cayucos', minutes: 35, bearing: 320, note: 'Small coastal towns of retirees and artists; few kids.' },
    { id: 'santa-maria', kind: 'FEEDER', name: 'Santa Maria', minutes: 40, bearing: 165, note: 'A working-class farm city south on US 101: the biggest feeder, with a scene of its own.' },
    { id: 'lompoc', kind: 'FEEDER', name: 'Lompoc', minutes: 60, bearing: 160, note: 'A farm and prison town with a base nearby; military kids.' },
    { id: 'santa-barbara', kind: 'PEER', name: 'Santa Barbara', minutes: 110, bearing: 140, slug: 'santa-barbara-ca', note: 'A little richer and bigger, with a university and stronger live music. A campus rivalry.' },
    { id: 'salinas', kind: 'PEER', name: 'Salinas', minutes: 140, bearing: 330, slug: 'salinas-ca', note: 'The next farm city up US 101; occasional trade.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', minutes: 150, bearing: 60, slug: 'visalia-ca', note: 'Over the hills to the Central Valley: more working class, different bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A flat grid around the old mission and creek: bars, restaurants and a weekly market that closes the main street. Prime rents, tourists and students.' },
    { id: 'railroad', name: 'the Railroad District', route: 'work-side', note: 'Old warehouses by the train station, an historic district being redeveloped. The best fit for a warehouse or loft room.' },
    { id: 'south-industrial', name: 'South Higuera and the airport area', route: 'work-side', note: 'Metal buildings, auto shops, storage and breweries south of town. Practice rooms and garage bays, and nobody sleeps next door.' },
    { id: 'foothill', name: 'Foothill and the campus side', route: 'campus', note: 'Student rentals in small old houses and big new apartment blocks. Backyard shows live here, and so does the most neighbor and police trouble.' },
    { id: 'old-town', name: 'Old Town and Fremont Heights', route: 'old-side', note: 'Victorian and bungalow streets of professors, families and renters. Low tolerance for noise.' },
    { id: 'laguna', name: 'Laguna Lake and Los Osos Valley Road', route: 'campus', note: 'Postwar tract homes around a lake and big-box strips. Where the locally raised teenagers live, and garage-band country.' },
    { id: 'johnson', name: 'Johnson Avenue and Broad Street', route: 'old-side', note: 'Churches, small commercial units and middle-income blocks toward the valley road.' },
    { id: 'atascadero-town', name: 'Atascadero', route: 'town:atascadero', note: 'The suburb over the grade. Where the high-school bands go to get a real stage.' }
  ],

  rooms: [
    { id: 'foothill-house', kind: 'HOUSE', hood: 'foothill', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 50],
      pressure: 55, start: true, note: 'A student house with a sign on the door: no drinking, no drugs. Five dollars, a loyal fifty, and a neighbor who has called twice.' },
    { id: 'foothill-living-room', kind: 'HOUSE', hood: 'foothill', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [60, 60, 45],
      pressure: 65, note: 'A farewell show in a living room. The police came twice just as quiet hours began, and the fine is the host\'s.' },
    { id: 'laguna-garage', kind: 'HOUSE', hood: 'laguna', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50],
      pressure: 45, note: 'A tract-house garage with the door up. It ends when a neighbor calls or somebody\'s mother pulls in.' },
    { id: 'old-town-porch', kind: 'HOUSE', hood: 'old-town', cap: 40, hostCut: 0, pa: .3, curfew: 1290, ac: false, outdoor: true, sketch: 20, standing: [60, 60, 50],
      pressure: 65, note: 'A rented bungalow with a porch set. One call on this street and it is over.' },
    { id: 'airport-bay', kind: 'DIY', hood: 'south-industrial', cap: 80, rent: 60, deposit: 0, pa: .6, curfew: 1410, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 50, needs: ['VOUCH'], note: 'A garage bay in a metal building with no neighbors to wake. The landlord and the fire inspector are the worry.' },
    { id: 'coffee-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1320, ac: true, sketch: 5, standing: [65, 65, 75], following: .2,
      note: 'A coffee shop with a standing hardcore and metal night. The manager\'s goodwill is the only lease.' },
    { id: 'church-hall', kind: 'HALL', hood: 'johnson', cap: 150, rent: 120, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 40, note: 'A borrowed hall, dry and out by ten. The last resort for kids from the north county.' },
    { id: 'taproom-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1590, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar with a long music history and a taproom with a basement stage. The punk nights run late and 21 and up.' },
    { id: 'brewery-yard', kind: 'CLUB', hood: 'south-industrial', cap: 300, houseCosts: 150, split: .8, pa: .85, ages: ['A18'], curfew: 1380, ac: true, following: .5, sketch: 15,
      standing: [50, 70, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A brewery with a yard and metal fests. Ticketed shows are 18 and up, and the bar closes to kids after eight.' },
    { id: 'ridge-field', kind: 'OUTDOOR', hood: 'foothill', cap: 500, rent: 25, pa: .4, curfew: 1230, sketch: 50, standing: [55, 55, 45],
      pressure: 50, note: 'A ridge outside the city line, one day a year. The festival that started here grew past four thousand tickets and funds the next one.' }
  ],

  contacts: ['santa-barbara-ca', 'salinas-ca', 'visalia-ca', 'bakersfield-ca', 'oxnard-ca'],

  calendar: [
    { id: 'ridge-fest', label: 'the DIY festival on the ridge', tag: 'festival', month: 5, week: 3, dows: [5], can: [.80, .75, .75] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.90, .95, .95], hoods: ['foothill'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.90, .95, .95], hoods: ['foothill'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.05, 1.0, .95], hoods: ['foothill'], elsewhere: [1.05, 1.05, 1] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 6, weeks: [2, 3], dows: [4, 5, 6], can: [.85, .80, .75] },
    { id: 'county-fairs', label: 'the summer fairs in the farm towns', tag: 'fair', month: 7, weeks: [2, 4], dows: [4, 5, 6], can: [.92, .90, .88] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Santa Maria', state: 'CA', lat: 34.95, lon: -120.44, pop: 110000 },
    { name: 'Paso Robles', state: 'CA', lat: 35.63, lon: -120.69, pop: 31000 },
    { name: 'Morro Bay', state: 'CA', lat: 35.37, lon: -120.85, pop: 10000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 400000 }
  ],
  roads: ['US 101', 'Highway 1', 'Highway 227', 'Highway 58', 'Highway 46'],

  words: {
    street: ['Higuera Street', 'Foothill Boulevard', 'Los Osos Valley Road', 'Marsh Street', 'Highway 101'],
    water: ['the creek', 'Laguna Lake', 'the bay'],
    hood: ['the Railroad District', 'Laguna Lake', 'Foothill', 'Old Town', 'Fremont Heights', 'Johnson Avenue', 'Tank Farm Road'],
    thing: ['tri-tip sandwich', 'taco truck', 'garage bay', 'practice room', 'hillside letter', 'bike lane', 'oak tree', 'donut shop', 'student rental', 'farmers market'],
    weather: ['fog bank', 'heat wave', 'winter rain']
  },

  events: [
    { id: 'SAN_LUIS_OBISPO_CA_QUIET_HOUR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The deputies have been driving the student streets on Sunday nights, and the neighbors have your host\'s number.',
      title: 'Twice before the last band',
      body: 'The police came once as quiet hours began and said they would be back. The last band has not gone on, and the fine will go on the host\'s name.',
      options: [
        { id: 'CUT', label: 'End the last band mid-set', likely: 'Nobody is happy, but the host keeps the house.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last band stopped in the middle of a song. The kids filed out quietly, and the host breathed again.' },
        { id: 'MOVE', label: 'Move the bill to a garage down south', likely: 'The crowd is smaller, and there\'s nobody to wake.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A bay by the airport took the bill with an hour to spare, and nobody called anybody.' },
        { id: 'ACCEPT', label: 'Play on and take the fine', likely: 'The host will remember who paid.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'MONEY', amount: -40 }],
          result: 'They came back and wrote the ticket, which cost you, and the host noticed.' }
      ] },

    { id: 'SAN_LUIS_OBISPO_CA_RIDGE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The big DIY day on the ridge is this weekend, and everybody who matters is going.',
      title: 'Half the crowd is on the ridge',
      body: 'The festival outside town has the scene for the day. Your show is in town, the same night, and nobody has said they are coming back down.',
      options: [
        { id: 'LATE', label: 'Push doors back until they drive down', likely: 'It starts late, and the tired ones show up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and they came down from the ridge dusty and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'It\'s thin, but the ones who skipped the ridge are the regulars.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The room was a third full, and everyone else was on the ridge.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'SAN_LUIS_OBISPO_CA_MARKET_NIGHT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The market closes the main street on Thursday, and the coffee shop has no back door.',
      title: 'Six blocks with the amps',
      body: 'The street is shut for the market and the lot is full. The band has to carry its gear six blocks to the coffee shop.',
      options: [
        { id: 'CARRY', label: 'Carry it and start late', likely: 'It\'s sweaty and late, and fine.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'It was six blocks with the amps and a late start, and the room was packed anyway.' },
        { id: 'SHORT', label: 'Play a short acoustic bill', likely: 'It\'s quieter, with fewer people.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands played with no amps, and the ones who came sat on the floor and liked it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] }
  ]
});
