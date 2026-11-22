SB.Cities.register('greensboro-nc', {
  v: 1,
  slug: 'greensboro-nc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['greensboro coliseum', 'coliseum complex', 'o. henry', 'a&t homecoming', 'aggie fanfest', 'wyndham championship', 'first presbyterian', 'central carolina spring fair', 'ghoulash', 'greensboro youth council', 'wunc', 'wfae', 'nc folk festival', 'triad moms', 'youth protection ordinance',
           'unc greensboro', 'uncg', 'north carolina a&t', 'a&t', 'aggies', 'central carolina fair', 'first friday', 'first fridays', 'north carolina folk festival',
           'fun fourth', 'north carolina comedy festival', 'winter wonderlights', 'sedgefield', 'acc tournament', 'greensboro transit authority', 'news & record',
           'yes! weekly', 'triad city beat', 'carolina peacemaker', 'wqfs', 'wuag', 'wnaa', 'cook out', 'cheerwine', 'waffle house', 'fedex',
           'piedmont triad international', 'amtrak', 'fort bragg', 'fort liberty', 'high point market', 'vfw', 'american legion',
           'the piety hill annex', 'gate city garage', 'mill pond social hall', 'the kudzu room', 'spring garden carport', 'boro hardware',
           'the lowe lot warehouse', 'dogwood fellowship hall', 'lindley lot', 'the wendover annex', 'freight door hall', 'carolina hosiery loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['cook out*', 'news & record*', 'yes! weekly*', 'triad city beat*', 'uncg*', 'a&t*', 'central carolina fair*', 'waffle house*'],

  blurb: ['A flat, tree-covered Piedmont city built on textiles, tobacco and rail, the biggest of the three Triad cities, with two big universities and a small downtown that was hollowed out and partly revived.',
          'Two universities feed the porches and carports, but the crowd turns over every four years. Everyone needs a car, shows are found rather than stumbled on, and rooms open and shut every few years as leases rise.'],
  hard: 'A fill-date town: no late transit, thin all-ages, easy for bands to skip.',
  region: 'the Piedmont',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Greensboro' },
    { id: 'high-point', kind: 'FEEDER', name: 'High Point', minutes: 20, bearing: 240, pop: 114000, note: 'A furniture-market twin to the southwest with a smaller scene of its own.' },
    { id: 'kernersville', kind: 'FEEDER', name: 'Kernersville', minutes: 25, bearing: 285, note: 'A suburb on the interstate between Greensboro and Winston-Salem.' },
    { id: 'burlington', kind: 'FEEDER', name: 'Burlington, Graham, Mebane and Elon', minutes: 30, bearing: 85, note: 'A former textile town and its neighbors to the east, with a small scene and a private university.' },
    { id: 'reidsville', kind: 'FEEDER', name: 'Reidsville', minutes: 30, bearing: 10, note: 'A tobacco and mill town up the highway; no known scene.' },
    { id: 'thomasville', kind: 'FEEDER', name: 'Thomasville and Lexington', minutes: 30, bearing: 220, note: 'Furniture and barbecue towns down the interstate.' },
    { id: 'asheboro', kind: 'FEEDER', name: 'Asheboro', minutes: 45, bearing: 195, note: 'A hosiery and zoo town in the hills to the south with a small scene.' },
    { id: 'eden', kind: 'FEEDER', name: 'Eden', minutes: 45, bearing: 15, note: 'A mill town where two rivers meet; the mall is closed.' },
    { id: 'salisbury', kind: 'FEEDER', name: 'Salisbury', minutes: 50, bearing: 215, note: 'A small college town down the interstate.' },
    { id: 'mount-airy', kind: 'FEEDER', name: 'Mount Airy', minutes: 70, bearing: 320, note: 'A small old-time music and granite town by the Virginia line.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 35, bearing: 270, slug: 'winston-salem-nc', note: 'The twin sister city: friendly rivals who swap bands and fans.' },
    { id: 'durham', kind: 'PEER', name: 'Durham', minutes: 60, bearing: 100, slug: 'durham-nc', note: 'The scene most likely to take Greensboro bands.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', minutes: 105, bearing: 150, slug: 'fayetteville-nc', note: 'A military town with a harder-edged crowd.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', state: 'VA', minutes: 175, bearing: 20, slug: 'richmond', note: 'A comparable city with real touring exchange.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Elm Street core', route: 'downtown', note: 'Old brick blocks, bars, old theaters and lofts. Heating up and expensive: a DIY room here is a short-lease gamble.' },
    { id: 'southside', name: 'Southside', route: 'downtown', note: 'The old rail-edge district, mostly redeveloped into townhomes. Gentrified; little left to book.' },
    { id: 'college-hill', name: 'College Hill and Tate Street', route: 'campus', note: 'The old hilltop neighborhood by the university: big rental houses with porches, coffee shops, a historic district and neighbors who call.' },
    { id: 'lindley-park', name: 'Lindley Park and Spring Garden', route: 'campus', note: 'Bungalows south and west of campus, mixing students, artists and long-time residents. House shows and noise complaints.' },
    { id: 'glenwood', name: 'Glenwood', route: 'old-side', note: 'Small houses and church spaces, Black, white and Latino working-class. Yard shows; cheap and partly heating.' },
    { id: 'east-side', name: 'the east side and East Market Street', route: 'old-side', note: 'Black, working-class neighborhoods around the big state university. Church halls, rec centers and step-show culture; a booker who skips this half of town is missing half the city.' },
    { id: 'gate-city', name: 'Gate City Boulevard and the arena corridor', route: 'work-side', note: 'Motels, chains and a huge arena. Event days wreck the parking; nothing DIY.' },
    { id: 'mill-south', name: 'the south and southwest mill neighborhoods', route: 'work-side', note: 'Old mill villages, warehouses and rail yards. Practice units and the odd warehouse show; cheap, but developers are buying.' },
    { id: 'north-side', name: 'the north side and Battleground Avenue', route: 'campus', note: 'Rich suburbs and big churches. The bands\' parents live here; the teenagers with cars come from here.' }
  ],

  rooms: [
    { id: 'college-house', kind: 'HOUSE', hood: 'college-hill', cap: 60, curfew: 1350, ac: false, pressure: 55, start: true,
      note: 'A rental house with a porch near the university, a front room and a door fee. A church or a developer buying the block is the long threat.' },
    { id: 'glenwood-collective', kind: 'DIY', hood: 'glenwood', cap: 100, curfew: 1350, ac: false, pressure: 50,
      note: 'A collective-run space on a residential-industrial street, with heavy, alternative and small touring bills. The landlord could sell as the neighborhood heats up.' },
    { id: 'mill-carport', kind: 'HOUSE', hood: 'mill-south', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 45,
      note: 'A concrete carport pad in the mill neighborhoods, with extension cords and the generator. Summer storms are the enemy.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 50, curfew: 1080, ac: true,
      note: 'A record shop or coffee shop clears a corner for an afternoon set. All ages, and over by six.' },
    { id: 'elm-bar', kind: 'BAR', hood: 'downtown', cap: 150, curfew: 1500, ac: true,
      note: 'A stage bar on the Elm Street core, twenty-one most nights. The bread-and-butter fill date, in a block where bars keep closing.' },
    { id: 'elm-club', kind: 'CLUB', hood: 'downtown', cap: 300, curfew: 1410, ac: true, ages: ['A18'],
      note: 'A mid-size club with an eighteen-plus door that carries touring hardcore and metal. A second club down the street books the rock and indie end.' },
    { id: 'arena-club', kind: 'CLUB', hood: 'gate-city', cap: 1000, curfew: 1380, ac: true, ages: ['A18'],
      note: 'A big heavy room near the arena that takes touring metalcore bills. Too big for a new booker, a goal for later.' },
    { id: 'arena-hall', kind: 'BIG', hood: 'gate-city', cap: 2500, curfew: 1380, ages: ['ALL'], ac: true,
      note: 'A hall at the arena complex that takes the big hardcore and metal tours. A place to aim at.' },
    { id: 'rec-hall', kind: 'HALL', hood: 'east-side', cap: 150, curfew: 1320, ac: true, pressure: 45,
      note: 'A church fellowship hall or a recreation center on the east side, with a strict fire marshal and a step-show crowd next door.' },
    { id: 'mill-bay', kind: 'DIY', hood: 'mill-south', cap: 80, curfew: 1380, ac: false, pressure: 55,
      note: 'A practice unit in an old mill with a front room. Cheap, until a developer buys the building.' },
    { id: 'skate-lot', kind: 'OUTDOOR', hood: 'southside', cap: 80, curfew: 1140, ac: false, outdoor: true,
      note: 'A public skatepark lot for acoustic or generator sets. Daylight only.' }
  ],

  contacts: ['winston-salem-nc', 'durham-nc', 'asheville-nc', 'fayetteville-nc', 'richmond'],

  calendar: [
    { id: 'homecoming', label: 'the big university homecoming', tag: 'parade', month: 10, week: 2, dows: [3, 4, 5, 6], can: [0.85, 0.8, 0.8], hoods: ['east-side', 'downtown'], elsewhere: [0.95, 0.92, 0.92] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 9, weeks: [1, 2], dows: [4, 5, 6], can: [0.9, 0.88, 0.85], hoods: ['gate-city'], elsewhere: [1, 0.97, 0.97] },
    { id: 'folk-weekend', label: 'the downtown folk weekend', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [0.92, 0.88, 0.88], hoods: ['downtown', 'east-side'], elsewhere: [1, 0.97, 0.97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'basketball-week', label: 'the big basketball tournament week', tag: 'game', month: 3, week: 2, dows: [2, 3, 4, 5, 6], can: [0.9, 0.88, 0.88], hoods: ['gate-city'], elsewhere: [1, 0.97, 0.97] },
    { id: 'graduation', label: 'commencement weekend', tag: 'graduation', month: 5, week: 1, dows: [4, 5], can: [0.9, 0.85, 0.8] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 875000 },
    { name: 'Chapel Hill', state: 'NC', lat: 35.91, lon: -79.06, pop: 61000 },
    { name: 'Danville', state: 'VA', lat: 36.59, lon: -79.40, pop: 42000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 19000 }
  ],
  roads: ['I-40', 'I-85', 'I-73', 'US 29', 'US 220', 'the Loop'],

  words: {
    street: ['Elm Street', 'Tate Street', 'Spring Garden', 'Market Street', 'Gate City Boulevard', 'Wendover Avenue', 'Battleground Avenue', 'Randleman Road'],
    water: ['Lake Brandt', 'Buffalo Creek', 'the Haw River'],
    hood: ['College Hill', 'Lindley Park', 'Glenwood', 'Southside', 'Friendly', 'Lawndale', 'Mendenhall'],
    thing: ['carport', 'mill house', 'sweet tea', 'barbecue', 'kudzu', 'crawlspace', 'porch', 'practice space', 'milkshake run'],
    weather: ['ice storm', 'thunderstorm', 'humidity']
  },

  events: [
    { id: 'GREENSBORO_NC_HOMECOMING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The east side is closing to traffic for homecoming, and every lot is taken.',
      title: 'Homecoming closes the east side',
      body: 'Homecoming week has shut the east side to traffic on the same Saturday as your show in Glenwood. Nobody books against it.',
      options: [
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' },
        { id: 'LATE', label: 'Push doors back until the traffic clears', likely: 'Later than planned, but the people who come stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour late. The ones who made it through were loud and happy.' },
        { id: 'ACCEPT', label: 'Run it and take a thin door', likely: 'The casual crowd is stuck in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The door was thin. The regulars made it.' }
      ] },

    { id: 'GREENSBORO_NC_CARPORT_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9] },
      telegraph: 'A summer thunderstorm is stacking up west of town, and the carport has no walls.',
      title: 'Thunder over the carport',
      body: 'A summer thunderstorm is over the mill neighborhoods, and the generator is the only dry thing at your carport show.',
      options: [
        { id: 'HOUSE', label: 'Move the bill inside a house', likely: 'Smaller and louder, and dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A house took the whole bill, and the floor was packed.' },
        { id: 'WAIT', label: 'Wait for the storm to pass', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The storm passed by ten. You started late and nobody left.' },
        { id: 'ACCEPT', label: 'Run it under the carport', likely: 'Half the list stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The generator held and the floor was wet. Half the list stayed home.' }
      ] },

    { id: 'GREENSBORO_NC_YOUTH_CURFEW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9, 10, 11] },
      telegraph: 'The city is debating a youth curfew after a shooting, and parents are nervous.',
      title: 'The curfew debate',
      body: 'The city is talking about a curfew for kids under eighteen. The under-eighteens at your show must be out by ten, no matter who is playing.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish by ten', likely: 'A short, tight night. Everyone gets home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done by ten. A short, tight set, and the parents were glad.' },
        { id: 'SPLIT', label: 'Send the youngest home before the last set', likely: 'The last band plays to older heads.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The youngest left at ten. The late set was smaller and tighter.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Parents stay home to be safe.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Some parents kept their kids home. The ones who came stayed for the whole bill.' }
      ] },

    { id: 'GREENSBORO_NC_FAIR_LOTS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The county fair is parking cars on every lot near the arena.',
      title: 'Fair parking',
      body: 'The county fair has parked every lot near the arena, and the club on that side is hard to reach for the bands and the crowd.',
      options: [
        { id: 'LATE', label: 'Push doors back until the lots clear', likely: 'Later, and the crowd gets in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour late. Everyone got in, slow and sweaty.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd takes one look at the lot and goes home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lots were full and the room was thin.' }
      ] }
  ]
});
