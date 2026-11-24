SB.Cities.register('eau-claire-wi', {
  v: 1,
  slug: 'eau-claire-wi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['uw-eau claire', 'uwec', 'uw-stout', 'stout', 'uw-river falls', 'uw-stevens point', 'blugold', 'blugolds', 'blue devils', 'midwest weirdfest', 'weirdfest',
           'eau claire marathon', 'downtown farmers market', 'wisconsin public radio', 'leinenkugel\'s', 'leinenkugel', 'spotted cow', 'kwik trip', 'culver\'s',
           'eau claire memorial', 'eau claire north', 'packers', 'vikings', 'fort mccoy', 'ho-chunk', 'ho-chunk nation', 'chippewa river state trail',
           'american legion', 'vfw', 'elks',
           'the sawmill annex', 'half moon hall', 'chippewa flats', 'the confluence room', 'randall street basement', 'the lutheran annex', 'bridge number nine',
           'the tire works loft', 'blugold lanes back room', 'the horseradish room', 'eastside hill garage',
           'visit eau claire', 'pablo center', 'country jam', 'country jam usa', 'hoofbeat', 'blue ox', 'blue ox music festival', 'river prairie',
           'cinder city days', 'northern wisconsin state fair', 'chippewa falls springfest', 'eau claire jazz festival', 'clearwater jazz',
           'banbury place', 'banbury art crawl', 'rash fest', 'decadent cabaret', 'leinie lodge', 'chalk fest', 'ginormous pumpkin festival', 'onefest'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['uwec*', 'blugold*', 'weirdfest*', 'leinenkugel*', 'kwik trip*', 'the sawmill annex*', 'half moon hall*', 'pablo center*', 'blue ox music festival*'],

  blurb: ['The punks live in the shadow of the town\'s folk fame, and a house-born fest, long basement bills and a hall keep them loud.',
          'Bills run five to seven bands, and a basement that lasts a year is a good run, because rooms come and go.'],
  hard: 'Houses last about a year, bar rooms are 21+, and the best show is a hall.',
  region: 'the Chippewa Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.4 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Eau Claire' },
    { id: 'altoona', kind: 'FEEDER', name: 'Altoona', minutes: 5, bearing: 100, pop: 8500, note: 'A suburb next door with no scene; its kids are effectively Eau Claire kids.' },
    { id: 'chippewa-falls', kind: 'FEEDER', name: 'Chippewa Falls', minutes: 15, bearing: 5, pop: 14000, note: 'An old mill and brewing town with a long heavy-music tradition and a mild rivalry.', bands: 2 },
    { id: 'fall-creek', kind: 'FEEDER', name: 'Fall Creek', minutes: 20, bearing: 125, note: 'A small farm and commuter town; no scene.' },
    { id: 'augusta', kind: 'FEEDER', name: 'Augusta', minutes: 25, bearing: 135, note: 'A small farm town; no scene.' },
    { id: 'menomonie', kind: 'FEEDER', name: 'Menomonie', minutes: 30, bearing: 275, pop: 16000, note: 'A college town with its own bar and house-show scene; sends and takes bands and crowds.', bands: 3 },
    { id: 'osseo', kind: 'FEEDER', name: 'Osseo', minutes: 30, bearing: 195, note: 'A small farm town on the interstate; no scene.' },
    { id: 'mondovi', kind: 'FEEDER', name: 'Mondovi', minutes: 40, bearing: 235, note: 'A small farm town with a few bands and no venues.', bands: 1 },
    { id: 'durand', kind: 'FEEDER', name: 'Durand', minutes: 45, bearing: 245, note: 'A river town at the bottom of the valley with a tiny scene.' },
    { id: 'rice-lake', kind: 'FEEDER', name: 'Rice Lake', minutes: 60, bearing: 350, pop: 8000, note: 'A northwoods hub with a branch campus; its kids come south for bigger shows.' },
    { id: 'la-crosse', kind: 'PEER', name: 'La Crosse', minutes: 90, bearing: 215, scene: 900, note: 'The nearest true peer: artsier, hillier, and a steady swap of bands.' },
    { id: 'wausau', kind: 'PEER', name: 'Wausau', minutes: 90, bearing: 95, scene: 500, note: 'A paper-mill and insurance town; its kids come west for shows.' },
    { id: 'duluth', kind: 'PEER', name: 'Duluth', state: 'MN', minutes: 165, bearing: 340, slug: 'duluth-mn', note: 'The nearest same-size port city with a distinct scene; trades bands more than crowds.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the confluence', route: 'downtown', note: 'Walkable bars, restaurants, new apartments and a market where the rivers meet.' },
    { id: 'water-street', name: 'Water Street', route: 'campus', note: 'A historic strip of student bars, pizza, tattoo and thrift across the river by campus.' },
    { id: 'third-ward', name: 'the Third Ward', route: 'old-side', note: 'An older residential district near downtown; porches, a few big houses and basements, and close neighbors.' },
    { id: 'randall-park', name: 'Randall Park', route: 'old-side', note: 'Old houses cut into apartments for students and young workers: the best bet for basements and yards.' },
    { id: 'eastside-hill', name: 'Eastside Hill', route: 'old-side', note: 'A quiet residential hill east of downtown; basements and garages, and the grade makes loading a pain.' },
    { id: 'north-side', name: 'the old industrial north side', route: 'work-side', note: 'A big former factory complex and old mill buildings now holding workshops, studios and practice rooms.' },
    { id: 'south-side', name: 'Hastings Way and the south side', route: 'work-side', note: 'Strip malls and chains along the highway, where pizza places will take an all-ages show.' }
  ],

  rooms: [
    { id: 'randall-basement', kind: 'HOUSE', hood: 'randall-park', cap: 60, curfew: 1380, ac: false, pressure: 55, start: true,
      note: 'A student basement in an old frame house. Free or a donation, and it lasts exactly as long as the lease.' },
    { id: 'third-ward-porch', kind: 'HOUSE', hood: 'third-ward', cap: 40, curfew: 1350, ac: false, outdoor: true, pressure: 55,
      note: 'A porch and yard on a close block. One landlord letter from over.' },
    { id: 'hill-garage', kind: 'HOUSE', hood: 'eastside-hill', cap: 30, curfew: 1350, ac: false, pressure: 45,
      note: 'A garage and a basement on the grade. Loading in is the whole job.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'downtown', cap: 300, curfew: 1530, ac: true, owner: 'HALL_MANAGER', ages: ['ALL'], pressure: 45,
      note: 'A lodge basement with a stage at each end so the bands swap without a gap, and a bar along one side that still lets kids in. The year hangs on one yes.' },
    { id: 'mill-unit', kind: 'DIY', hood: 'north-side', cap: 80, curfew: 1320, ac: false, pressure: 45, needs: ['VOUCH'],
      note: 'A practice room in the old mill complex. The last cheap commercial space in town.' },
    { id: 'downtown-shop', kind: 'SHOP', hood: 'downtown', cap: 50, curfew: 1200, ac: true,
      note: 'A record shop on the avenue. In-stores and daytime sets, done by eight.' },
    { id: 'barstow-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A small room and a basement bar that book punk and thrash, with openers from the Twin Cities. Kids stay outside.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1440, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A mid-size music hall that books touring punk and rock. The age line is the door staff\'s call.' },
    { id: 'lifestyle-lawn', kind: 'OUTDOOR', hood: 'south-side', cap: 400, curfew: 1140, ages: ['ALL'],
      note: 'A free daytime festival on the lawns of a shopping district out toward Altoona. The basement crew\'s last act, and over by seven.' }
  ],

  contacts: ['duluth-mn', 'madison-wi', 'minneapolis', 'green-bay-wi'],

  calendar: [
    { id: 'spring-arts', label: 'the spring arts festival', tag: 'festival', month: 5, week: 2, dows: [5], can: [.90, .88, .88] },
    { id: 'summer-fest', label: 'the summer music festival', tag: 'festival', month: 6, week: 3, dows: [4, 5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'country-festival', label: 'the big country festival', tag: 'festival', month: 7, week: 3, dows: [4, 5, 6], can: [.78, .72, .72] },
    { id: 'football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'homecoming', label: 'homecoming weekend', tag: 'game', month: 10, weeks: [2, 3], dows: [5], can: [.90, .92, .92], hoods: ['water-street', 'randall-park'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.12, 1.10, 1.05], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'deer-opener', label: 'deer opener weekend', tag: 'hunt', month: 11, week: 3, dows: [4, 5], can: [.85, .80, .80] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.4, pop: 270000 },
    { name: 'Stevens Point', state: 'WI', lat: 44.52, lon: -89.57, pop: 25000 },
    { name: 'Rochester', state: 'MN', lat: 44.02, lon: -92.47, pop: 120000 }
  ],
  roads: ['I-94', 'US 53', 'US 12', 'WI 37', 'WI 29'],

  words: {
    street: ['Water Street', 'Hastings Way', 'Clairemont Avenue', 'Barstow Street', 'Graham Avenue', 'Madison Street'],
    water: ['the Chippewa', 'the Eau Claire River', 'Half Moon Lake', 'Lake Wissota'],
    hood: ['Third Ward', 'Randall Park', 'Eastside Hill', 'Emery Street', 'Shawtown', 'West Eau Claire'],
    thing: ['fish fry', 'supper club', 'brandy old fashioned', 'cheese curd', 'tavern', 'bubbler', 'snowbank', 'basement show', 'lodge hall', 'coffee bar', 'festival weekend'],
    weather: ['wind chill', 'blizzard']
  },

  events: [
    { id: 'EAU_CLAIRE_WI_LODGE_CALLS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2], months: [9, 10, 11] },
      telegraph: 'The lodge that rents out the basement has a bingo night on the calendar the same weekend.',
      title: 'The lodge calls the night before',
      body: 'The bingo crew needs the floor at one end of the lodge basement, so the second stage has to come out, and the bill was built for two stages and no gaps.',
      options: [
        { id: 'ONE', label: 'Cut the bill to one stage and an hour', likely: 'It\'s a short, tight night, and some of the bands are sore about it.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'With one stage and no time lost to bingo, the room still filled.' },
        { id: 'HOUSE', label: 'Move the whole bill to a basement', likely: 'It\'s smaller and louder, and the kids will find it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement on Randall Park took the bill with an hour to spare, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it and let the bingo crew share the room', likely: 'It\'s strange, but nobody leaves.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Somebody called B-9 into a feedback squeal, and everybody remembers it.' }
      ] },

    { id: 'EAU_CLAIRE_WI_COUNTRY_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [7] },
      telegraph: 'Every hotel is full, and the sound rental is booked out on the festival grounds.',
      title: 'Country festival weekend',
      body: 'The big festival has every bed and bar in town and the scene has emptied out, so your show needs backline from a cousin in Chippewa Falls.',
      options: [
        { id: 'COUSIN', label: 'Drive to the cousin and borrow the gear', likely: 'It takes two hours of your day, and the show goes on.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The cousin had a drum kit and a bass cab in a barn, and the show started on time.' },
        { id: 'SMALL', label: 'Play it small, in a basement', likely: 'Nobody who came for the festival will find it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'There were thirty people and a box fan, and the festival was a mile away and nobody cared.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, but the festival was still going and half the list was busy.' }
      ] },

    { id: 'EAU_CLAIRE_WI_DEER_OPENER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'hunt' },
      telegraph: 'Half the county is out in blaze orange and every pickup has a rack in the back.',
      title: 'Deer opener Saturday',
      body: 'Two out-of-town bands have cancelled to hunt, and the drummer for the Eastside garage show just texted you a photo of a tree stand.',
      options: [
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'It\'s a thin night, but the people who come are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was two bands and a long, loose night, and the room was half full and warm.' },
        { id: 'LATE', label: 'Push doors back so he can get out of the woods', likely: 'It means a late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The drummer got in at nine, still in orange, and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody loses some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
