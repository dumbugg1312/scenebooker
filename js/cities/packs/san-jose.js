SB.Cities.register('san-jose', {
  v: 1,
  slug: 'san-jose',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['san jose state university', 'sjsu', 'santa clara university', 'stanford university', 'stanford', 'de anza college', 'san jose city college', 'evergreen valley college',
           'mercury news', 'san jose mercury news', 'metro silicon valley', 'san jose spotlight', 'kqed', 'kntv', 'san jose sharks', 'san jose earthquakes', 'sap center',
           'levi\'s stadium', 'san francisco 49ers', 'san jose giants', 'san jose jazz fest', 'cinequest', 'apple', 'google', 'adobe', 'cisco', 'ebay', 'intel', 'nvidia',
           'viva calle', 'viva callesj', 'nikkei matsuri', 'san jose taiko', 'christmas in the park', 'dia san jose', 'holo holo', 'sjpd', 'san jose police', 'sf chronicle', 'nbc bay area', 'cbs bay area', 'ktvu', 'sj today', '6am city', 'san jose airport', 'sjc', 'san jose jazz', 'japantown lunar new year festival', 'low brow bbq', 'fountain blues and brews', 'san jose holiday parade',
           'paypal', 'tesla', 'netflix', 'lockheed martin', 'santa clara valley transportation authority', 'vta', 'caltrain', 'norman y. mineta san jose international airport',
           'winchester mystery house', 'tech interactive', 'rosicrucian egyptian museum', 'great america', 'kaiser permanente'],
  blocklist: ['mercury news*', 'metro silicon valley*', 'sap center*', 'cinequest*', 'winchester mystery*', 'great america park*', 'viva calle*', 'christmas in the park*', 'nikkei matsuri*'],

  blurb: ['A rich tech city with no home for the kids who make noise.',
          'Hardcore moves between studios, basements and parking lots, one step ahead of the landlord.'],
  hard: 'Sky-high rent and police mean rooms last months, not years.',
  region: 'the Bay',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore is the scene\'s strongest draw, and it fills lots.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'San Jose' },
    { id: 'santa-clara', kind: 'FEEDER', name: 'Santa Clara', minutes: 15, bearing: 305, note: 'A suburb to the northwest.' },
    { id: 'campbell', kind: 'FEEDER', name: 'Campbell', minutes: 15, bearing: 235, note: 'A suburb to the southwest.' },
    { id: 'milpitas', kind: 'FEEDER', name: 'Milpitas', minutes: 20, bearing: 25, note: 'Suburban kids.' },
    { id: 'sunnyvale', kind: 'FEEDER', name: 'Sunnyvale', minutes: 20, bearing: 305, note: 'Another suburb up the peninsula.' },
    { id: 'los-gatos', kind: 'FEEDER', name: 'Los Gatos', minutes: 20, bearing: 225, note: 'A hill suburb.' },
    { id: 'morgan-hill', kind: 'FEEDER', name: 'Morgan Hill', minutes: 25, bearing: 155, note: 'A small town to the south.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 30, bearing: 340, note: 'Across the bay.' },
    { id: 'gilroy', kind: 'FEEDER', name: 'Gilroy', minutes: 35, bearing: 155, note: 'A small farm town.' },
    { id: 'santa-cruz', kind: 'PEER', name: 'Santa Cruz', minutes: 45, bearing: 215, slug: 'santa-cruz-ca', note: 'A famed punk scene over the mountain on Highway 17.' },
    { id: 'salinas', kind: 'PEER', name: 'Salinas', minutes: 70, bearing: 165, slug: 'salinas-ca', note: 'A farm city to the south.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', minutes: 90, bearing: 70, slug: 'stockton-ca', note: 'A Valley scene across the hills.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A small bar and club core that empties after dark. A few all-ages rooms in restaurants and old clubs.' },
    { id: 'japantown', name: 'Japantown', route: 'old-side', note: 'Older houses and basement creative spaces with small crowds.' },
    { id: 'willow-glen', name: 'Willow Glen', route: 'old-side', note: 'Leafy, wealthier, quiet streets.' },
    { id: 'rose-garden', name: 'Rose Garden', route: 'old-side', note: 'Old bungalows near the park.' },
    { id: 'eastside', name: 'the Eastside and Alum Rock', route: 'work-side', note: 'Working-class Mexican-American and Vietnamese neighborhoods. Backyard and garage shows.' },
    { id: 'south-san-jose', name: 'South San Jose and Blossom Valley', route: 'work-side', note: 'Industrial strips and practice studios on side streets.' },
    { id: 'university-area', name: 'the downtown university area', route: 'campus', note: 'Apartments, basements and practice spaces.' },
    { id: 'north-san-jose', name: 'Berryessa and North San Jose', route: 'campus', note: 'Tech offices and new apartments. No shows.' },
    { id: 'airport-side', name: 'the airport side', route: 'work-side', note: 'Warehouses, motels and family restaurants between downtown and the airport. Big rooms nobody uses at night.' },
    { id: 'almaden', name: 'Santa Teresa and Almaden', route: 'campus', note: 'Suburban, safe and quiet.' }
  ],

  rooms: [
    { id: 'eastside-garage', kind: 'HOUSE', hood: 'eastside', cap: 60, pa: .3, curfew: 1320, ac: false, outdoor: true, sketch: 30, standing: [65, 60, 50],
      pressure: 55, start: true, note: 'A garage and a backyard on the Eastside, with a generator for the amp. The neighbors and the police are the threat, and it rarely lasts a season.' },
    { id: 'bungalow-house', kind: 'HOUSE', hood: 'rose-garden', cap: 40, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [60, 60, 50],
      pressure: 60, note: 'A living-room set in an old bungalow. The quiet block is the whole risk.' },
    { id: 'practice-studios', kind: 'DIY', hood: 'south-san-jose', cap: 50, rent: 60, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, note: 'A complex of practice rooms on an industrial side street with an upstairs live room. It sells out, and then one day the shows just stop.' },
    { id: 'campus-basement', kind: 'DIY', hood: 'university-area', cap: 60, rent: 50, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [60, 60, 45],
      pressure: 55, note: 'A basement practice space by the campus. Weekly noise and hardcore until a neighbor or the landlord finds out.' },
    { id: 'japantown-cellar', kind: 'DIY', hood: 'japantown', cap: 90, rent: 70, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, note: 'A creative basement full of recording gear, down one narrow spiral stair. A fire marshal would not sleep.' },
    { id: 'downtown-shop', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [65, 65, 70], pressure: 55,
      note: 'A storefront with a small speaker rig. Afternoon and early evening only, with a tight head count after too many police visits.' },
    { id: 'punk-dive', kind: 'BAR', hood: 'downtown', cap: 100, soundFee: 40, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [55, 65, 70],
      note: 'A long-running dive on the main strip, open every night with free shows and a cut of the bar. Lately it books more comedy than punk.' },
    { id: 'sofa-bar', kind: 'BAR', hood: 'downtown', cap: 60, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1470, ac: true, sketch: 15, standing: [50, 65, 70],
      note: 'A small bar and restaurant stage that some all-ages promoters rent in daylight, or on the nights it would be closed.' },
    { id: 'banquet-hall', kind: 'HALL', hood: 'airport-side', cap: 120, rent: 150, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      pressure: 40, note: 'A family banquet restaurant that lets all-ages bills in as pop-ups. It lasts as long as the family\'s patience.' },
    { id: 'warehouse-lot', kind: 'OUTDOOR', hood: 'south-san-jose', cap: 2000, rent: 25, pa: .4, curfew: 1320, sketch: 55, standing: [55, 55, 40],
      pressure: 70, note: 'A parking lot behind the warehouses, lit by a generator. A one-off like this sells out, and the city notices a crowd that size.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21'], curfew: 1530, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A standard downtown club. Many of them survive only by booking 21-plus nights.' },
    { id: 'arena-hall', kind: 'BIG', hood: 'downtown', cap: 1500, rent: 1800, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, sketch: 10, standing: [40, 70, 70],
      note: 'The arena-sized room downtown. When there is a big night, the small shows get bumped.' }
  ],

  contacts: ['santa-cruz-ca', 'salinas-ca', 'stockton-ca', 'oakland', 'modesto-ca'],

  calendar: [
    { id: 'lunar-new-year', label: 'the Lunar New Year street festival', tag: 'festival', month: 2, week: 4, dows: [6], can: [.90, .88, .85], hoods: ['japantown'], elsewhere: [1, 1, 1] },
    { id: 'spring-festival', label: 'the Japanese-American spring festival', tag: 'festival', month: 4, week: 4, dows: [5, 6], can: [.90, .88, .85], hoods: ['japantown'], elsewhere: [1, .98, .98] },
    { id: 'cinco-parade', label: 'the Cinco de Mayo parade', tag: 'parade', month: 5, week: 1, dows: [6], can: [.85, .80, .80], hoods: ['eastside'], elsewhere: [1, .97, .97] },
    { id: 'jazz-weekend', label: 'the downtown jazz festival', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'open-streets', label: 'the open-streets Sunday', tag: 'festival', month: 9, week: 3, dows: [6], can: [.92, .90, .90] },
    { id: 'tree-parade', label: 'the holiday tree parade weekend', tag: 'parade', month: 11, weeks: [4, 5], dows: [4, 5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.92, .95, .95], hoods: ['university-area'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.92, .95, .95], hoods: ['university-area'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1410, weekend: 1410, inForce: false } },

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27, pop: 430000 },
    { name: 'Berkeley', state: 'CA', lat: 37.87, lon: -122.27, pop: 120000 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 }
  ],
  roads: ['I-280', 'I-880', 'Highway 101', 'Highway 87', 'Highway 85', 'Highway 17'],

  words: {
    street: ['The Alameda', 'Santa Clara Street', 'First Street', 'Story Road', 'Monterey Road', 'Alum Rock Avenue', 'Stevens Creek Boulevard'],
    water: ['the Guadalupe River', 'the bay'],
    hood: ['Japantown', 'Willow Glen', 'Alum Rock', 'Blossom Valley', 'Berryessa', 'Almaden', 'Rose Garden'],
    thing: ['practice room', 'parking lot', 'light rail', 'taqueria', 'generator', 'industrial park'],
    weather: ['rainy season']
  },

  events: [
    { id: 'SAN_JOSE_LOT_SHOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9] },
      telegraph: 'Word is out about a parking-lot show behind the warehouses, with a generator and no permit.',
      title: 'The crowd gets too big to ignore',
      body: 'The city has no clear noise rule, so the police decide by head count, and a lot full of kids is too many. Your own show is the same night, one exit away.',
      options: [
        { id: 'EARLY', label: 'Start early and be out before the patrols', likely: 'A short night, and most of them make it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before dark. The ones who came got a tight, loud set.' },
        { id: 'BASEMENT', label: 'Move the bill to a basement', likely: 'Smaller and quieter. Nobody can break up a cellar.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill with an hour to spare, and it was packed to the door.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Half the list is afraid of the patrols.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The patrols were out on the strip all night and half the list stayed home.' }
      ] },

    { id: 'SAN_JOSE_PARADE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'A parade weekend is coming and the streets downtown and on the Eastside will be shut.',
      title: 'No curb to unload at',
      body: 'The parade has the roads closed and the parking taken. The bands cannot get a van within six blocks of the room.',
      options: [
        { id: 'LATE', label: 'Push doors back until the streets reopen', likely: 'A late start. The crowd that wants a night out shows up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd came in from the parade, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned and carry the gear', likely: 'Families fill the streets and the regulars come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The bands carried the amps six blocks. The regulars came, and not many more.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'SAN_JOSE_SHOP_STOP', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor of the storefront has been calling the police about the afternoon sets.',
      title: 'The set stops at six-thirty',
      body: 'Another complaint came in and the landlord wants the show over early. An afternoon bill that was meant to run until dark has to end by early evening.',
      options: [
        { id: 'SHORT', label: 'Cut the bill short and play on', likely: 'Fewer bands, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Three short sets and everyone out by half past six.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'ACCEPT', label: 'Run it as planned and hope', likely: 'The landlord may not forget.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'MONEY', amount: -25 }],
          result: 'The police came at seven. It cost you a fine, and the landlord noticed.' }
      ] }
  ]
});
