SB.Cities.register('columbia-sc', {
  v: 1,
  slug: 'columbia-sc',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['university of south carolina', 'usc', 'fort jackson', 'shaw air force base', 'gamecocks', 'clemson', 'fireflies', 'the state newspaper',
           'free times', 'columbia star', 'carolina panorama', 'sc black news', 'soda city market', 'soda city', 'carolina cup', 'state fair',
           'south carolina state fair', 'amtrak', 'silver star', 'greyhound', 'megabus', 'waffle house', 'cheerwine', 'pbr', 'allen university',
           'benedict college', 'columbia college', 'midlands technical college', 'newberry college', 'claflin', 'south carolina state university',
           'morris college', 'savannah river site', 'american legion', 'vfw', 'famously hot', 'the pecan room', 'fall line hall', 'the lazy congaree',
           'mill row annex', 'kudzu court', 'broad river bay', 'the oyster cracker', 'twelve mile garage', 'red clay social', 'gervais and back',
           'palmetto porch', 'the lowcountry upstairs',
           'the daily gamecock', 'scenesc', 'wusc', 'williams-brice stadium', 'columbia fireflies', 'south carolina state fair', 'state fairgrounds',
           'the palmetto substack', 'bandcamp daily', 'jasper magazine', 'october 2015 flood', 'lake murray fireworks', 'read freely fest',
           'columbia international festival', 'hurricane hugo'],
  blocklist: ['waffle house*', 'cheerwine*', 'soda city*', 'free times*', 'fort jackson*', 'gamecocks*'],

  blurb: ['The state capital at the fall line, where three rivers meet: a big university, an Army training post and a town that drives everywhere.',
          'Bands share rented bungalows in the old neighborhoods until the rent climbs or the students turn over.'],
  hard: 'The college turns over every four years and football swallows the autumn weekends.',
  region: 'the Southeast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: .08, reason: 'Screamo and hardcore bands share bills for the same kids.' },
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'The metal and hardcore underground runs mixed bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbia' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington and Irmo', minutes: 20, bearing: 285, note: 'Growing suburbs; the likeliest all-ages kids, who drive in.' },
    { id: 'camden', kind: 'FEEDER', name: 'Camden', minutes: 40, bearing: 40, note: 'A horse-country county seat; its kids come to Columbia.' },
    { id: 'sumter', kind: 'FEEDER', name: 'Sumter', minutes: 50, bearing: 95, note: 'The biggest outlying town: military kids and some real punk.' },
    { id: 'orangeburg', kind: 'FEEDER', name: 'Orangeburg', minutes: 45, bearing: 150, note: 'Three colleges; more hip-hop and gospel than punk.' },
    { id: 'newberry', kind: 'FEEDER', name: 'Newberry', minutes: 50, bearing: 315, note: 'A small college town with a few musicians.' },
    { id: 'winnsboro', kind: 'FEEDER', name: 'Winnsboro', minutes: 40, bearing: 350, note: 'Rural county seat; kids drive in on weekends.' },
    { id: 'batesburg', kind: 'FEEDER', name: 'Batesburg-Leesville and Saluda', minutes: 40, bearing: 255, note: 'Farm towns; teenagers drive forty-five minutes for a Saturday.' },
    { id: 'aiken', kind: 'FEEDER', name: 'Aiken', minutes: 70, bearing: 235, note: 'Horse country between here and Augusta; its kids go either way.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', state: 'GA', minutes: 75, bearing: 240, slug: 'augusta-ga', note: 'Close in size and mood: the easiest weekend swap.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', slug: 'greenville-sc', minutes: 95, bearing: 320, scene: 900, note: 'Richer and polished; the Upstate and the Midlands trade bands.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', minutes: 105, bearing: 150, slug: 'charleston-sc', note: 'The coast: pricier, and it takes some of the bands.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 150, bearing: 320, slug: 'asheville-nc', note: 'Hipper and costlier; a tour-stop partner.' }
  ],

  hoods: [
    { id: 'five-points', name: 'Five Points', route: 'campus', note: 'The old shopping district turned college bar strip; bar shows and the odd all-ages afternoon, not houses.' },
    { id: 'shandon', name: 'Old Shandon', route: 'old-side', note: 'Bungalows from the 1920s with porches and front rooms: the likeliest band houses.' },
    { id: 'vista', name: 'the Vista', route: 'downtown', note: 'Old warehouses made into restaurants and hotels; ticketed bars, no DIY.' },
    { id: 'rosewood', name: 'Rosewood and the near east side', route: 'work-side', note: 'Small mid-century houses, auto shops and bays; cheap, near the fairgrounds.' },
    { id: 'mill-villages', name: 'Olympia and Granby', route: 'work-side', note: 'Old mill-village houses eight feet apart; neighbors call the cops.' },
    { id: 'north-side', name: 'Earlewood, Elmwood Park and Cottontown', route: 'old-side', note: 'The northern fringe: cheap, ignored, slowly being eyed.' },
    { id: 'campus-hill', name: 'University Hill, Arsenal Hill and Waverly', route: 'campus', note: 'Student housing and redevelopment all around; friends live here.' },
    { id: 'across-river', name: 'Cayce and West Columbia', route: 'downtown', note: 'Across the river with brick shop fronts and their own noise rules and police.' }
  ],

  rooms: [
    { id: 'shandon-bungalow', kind: 'HOUSE', hood: 'shandon', cap: 60, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45], pressure: 45, start: true,
      note: 'A one-story bungalow on a slab, with the living room as the stage. Most of the crowd knows the band, and a neighbor\'s call ends it.' },
    { id: 'mill-house', kind: 'HOUSE', hood: 'mill-villages', cap: 80, curfew: 1380, ac: false, outdoor: false, sketch: 30, standing: [65, 60, 45], pressure: 65,
      note: 'A mill-village house with a famous floor, eight feet from the next one. The shows outgrew the walls.' },
    { id: 'band-house', kind: 'HOUSE', hood: 'north-side', cap: 50, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 55, 45], pressure: 55,
      note: 'A band\'s own home turned regular venue. A business-license question and a neighbor are all it takes.' },
    { id: 'rosewood-bay', kind: 'DIY', hood: 'rosewood', cap: 120, rent: 70, curfew: 1410, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'],
      note: 'A hardcore storefront bay that has moved before and will again. Better set up for touring bands than for locals.' },
    { id: 'word-of-mouth', kind: 'DIY', hood: 'rosewood', cap: 150, rent: 40, curfew: 1500, ac: false, sketch: 55, standing: [50, 55, 40], pressure: 65, needs: ['VOUCH'],
      note: 'A metal and hardcore room with no posted address. Ask at the record shop, and a tip to the fire marshal ends it.' },
    { id: 'skate-shop', kind: 'SHOP', hood: 'vista', cap: 60, curfew: 1290, ac: true, sketch: 10, standing: [65, 65, 70],
      note: 'A skate shop on the main street. Tiny afternoon shows, and the shop hours set the end.' },
    { id: 'club-five', kind: 'BAR', hood: 'five-points', cap: 300, ages: ['A18'], soundFee: 60, curfew: 1470, ac: true, following: .5, sketch: 15, standing: [50, 65, 70],
      note: 'The long-running original-music club, moved here when its old building was sold. All-ages nights are the point of it.' },
    { id: 'river-club', kind: 'CLUB', hood: 'across-river', cap: 250, ages: ['A21'], curfew: 1500, ac: true, following: .4, sketch: 15, standing: [45, 65, 70], needs: ['FULL_BILL'],
      note: 'A rock and metal club across the river. It answers to its own town\'s police and noise rules.' },
    { id: 'arts-basement', kind: 'HALL', hood: 'campus-hill', cap: 200, rent: 150, deposit: 50, curfew: 1350, ac: true, sketch: 10, standing: [60, 65, 65], pressure: 35,
      note: 'A basement hall under an arts center. All ages, with real sound, lights and projections, and rental fees.' },
    { id: 'river-skatepark', kind: 'OUTDOOR', hood: 'vista', cap: 100, rent: 15, curfew: 1200, sketch: 35, standing: [60, 55, 40],
      note: 'The city skatepark by the river. Cool-month afternoons with a generator, and the heat and the permit are the limits.' },
    { id: 'theater-room', kind: 'BIG', hood: 'vista', cap: 1500, ages: ['A18'], curfew: 1380, ac: true, following: .8, sketch: 5, standing: [40, 70, 70],
      note: 'A big downtown theater for metalcore and hard-rock packages. Agents book it, not local bands.' }
  ],

  contacts: ['augusta-ga', 'charleston-sc', 'asheville-nc', 'greenville-sc', 'charlotte'],

  calendar: [
    { id: 'fall-fair', label: 'the fall fair', tag: 'fair', month: 10, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['rosewood'], elsewhere: [1, .96, .96] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.85, .92, .92], hoods: ['five-points', 'vista', 'campus-hill'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .92, .92], hoods: ['five-points', 'vista', 'campus-hill'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.82, .90, .90], hoods: ['five-points', 'vista', 'campus-hill'], elsewhere: [1, 1, 1] },
    { id: 'st-pat', label: 'the spring street party', tag: 'festival', month: 3, weeks: [2, 3], dows: [5], can: [.85, .85, .85], hoods: ['five-points'], elsewhere: [1, 1, 1] },
    { id: 'race-weekend', label: 'the big horse race weekend', tag: 'race', month: 4, week: 4, dows: [5], can: [.95, .95, .95] },
    { id: 'lake-fireworks', label: 'the Fourth of July lake fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.85, .90, .92] },
    { id: 'semester-end', label: 'the end of the spring semester', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.90, .88, .88], hoods: ['five-points', 'campus-hill'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 900000 },
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70000 },
    { name: 'Florence', state: 'SC', lat: 34.2, lon: -79.76, pop: 40000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 }
  ],
  roads: ['I-26', 'I-20', 'I-77', 'I-126', 'US 1', 'US 378'],

  words: {
    street: ['Harden Street', 'Devine Street', 'Santee Avenue', 'Rosewood Drive', 'Meeting Street', 'Knox Abbott Drive', 'Gervais Street'],
    water: ['the Congaree', 'the Saluda', 'Lake Marion'],
    hood: ['Five Points', 'Old Shandon', 'the Vista', 'Rosewood', 'Olympia', 'Granby', 'Earlewood', 'Elmwood Park', 'Cottontown', 'Bellevue', 'Waverly', 'Cayce'],
    thing: ['kudzu', 'boiled peanuts', 'pimento cheese', 'sweet tea', 'porch', 'carport', 'mustard barbecue', 'hash and rice', 'skate shop', 'bungalow', 'move-in week', 'bar stage'],
    weather: ['heat index', 'afternoon storm']
  },

  events: [
    { id: 'COLUMBIA_SC_FAIR_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair\'s last weekend is coming, and the near east side is already a parking lot.',
      title: 'The fair is on your street',
      body: 'The fairgrounds side has gridlocked and every lot is full. Your bay is on the same street, and the crowd walks in from the midway in wristbands, smelling of fried dough.',
      options: [
        { id: 'LATE', label: 'Push doors back until the midway thins out', likely: 'The ones who walk over come in late and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }],
          result: 'Doors opened an hour late, and the midway crowd came in by the dozens.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The regulars can\'t park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars circled the block twice and went home.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] },

    { id: 'COLUMBIA_SC_FIRE_TIP', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The address went around the record shop on Tuesday, and someone you do not know was asking about it.',
      title: 'A tip goes to the fire marshal',
      body: 'Somebody has called in the room with no posted address, and the fire marshal will be by before doors. The only place the marshal can\'t reach is a club across the river under a different police department.',
      options: [
        { id: 'RIVER', label: 'Move the bill across the river', likely: 'It\'s a different town\'s rules, and 21 and over.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'CLUB', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The club across the river took the bill, and the kids under 21 never made it in.' },
        { id: 'HOUSE', label: 'Move the bill to a house', likely: 'It\'s smaller, and word has to get around fast.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A living room took the bill with an hour to spare, and the porch overflowed.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'If they come, the show ends early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'MONEY', amount: -40 }],
          result: 'The marshal counted heads and wrote a warning, and the room was half empty by ten.' }
      ] },

    { id: 'COLUMBIA_SC_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'Home football is on Saturday, and every bar in the Five Points is already advertising.',
      title: 'The tailgaters wander in',
      body: 'The all-ages matinee at the club is on, but the game lets out at five and drunk tailgaters will fill the strip all afternoon.',
      options: [
        { id: 'LATE', label: 'Push the matinee back until the strip clears', likely: 'The kids get in, but it\'s a later night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors opened an hour late, and the kids came in after the crowd had cleared out.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Tailgaters mix with the kids, and it gets messy.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Half the floor was strangers in team colors, and it was loud and not very kind.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] }
  ]
});
