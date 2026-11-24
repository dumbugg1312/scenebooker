SB.Cities.register('casper-wy', {
  v: 1,
  slug: 'casper-wy',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of wyoming', 'uw', 'casper college', 'natrona county high school', 'kelly walsh', 'natrona county school district', 'casper star-tribune',
           'star-tribune', 'oil city news', 'k2 radio', 'kisscasper', 'wyoming public media', 'cowboy state daily', 'ford wyoming center', 'central wyoming fair',
           'central wyoming rodeo', 'casper events center', 'wyoming state fair', 'frontier days', 'cheyenne frontier days', 'casper mountain', 'casper rockies',
           'casper ghosts', 'f.e. warren air force base', 'warren air force base', 'wyoming medical center', 'banner health', 'wyoming refining', 'sinclair',
           'cenveo', 'halliburton', 'schlumberger', 'tronox', 'wyoming cowboys', 'denver broncos', 'broncos', 'cowboys', 'natrona county', 'wyoming department of transportation',
           'wyodot', 'amtrak', 'greyhound', 'waffle house', 'taco bell', 'sonic drive-in', 'vfw', 'american legion', 'elks', 'moose lodge', 'fort caspar',
           'national historic trails interpretive center', 'hell\'s half acre', 'devils tower', 'yellowstone national park', 'walmart', 'wal-mart', 'costco', 'bandsintown', 'punk rock bowling', 'kiss casper', 'k2radio', 'cwf', 'cnfr', 'college national finals rodeo', 'national intercollegiate rodeo association', 'wydot', 'wyoming highway patrol', 'casper police department', 'national pony express association', 'pony express re-ride', 'visit casper', 'travel wyoming', 'trib.com', 'central wyoming fair and rodeo', 'k2 radio'],
  /* Dossier names are research, not content. The college is written as "the junior college", the fair as "the county fair". */
  blocklist: ['casper college*', 'star-tribune*', 'frontier days*', 'halliburton*', 'sinclair*', 'kisscasper*'],

  blurb: ['The second city of a nearly empty state: wind, oil money, one long interstate and a mountain over the south side.',
          'Shows hide in bar back rooms and a brewery. Kids drive an hour to be there, and the same faces turn up every time.'],
  hard: 'A tiny crowd, a long drive from anywhere, and the wind shuts the road.',
  region: 'the high plains',
  whereGo: [
    { name: 'Fort Collins', state: 'CO', lat: 40.55, lon: -105.06 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.5 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Casper' },
    { id: 'evansville', kind: 'FEEDER', name: 'Evansville', minutes: 5, bearing: 80, scene: 100, note: 'A river town on the east edge. Kids come in constantly.' },
    { id: 'mills', kind: 'FEEDER', name: 'Mills', minutes: 5, bearing: 290, note: 'A tiny town on the west edge with cheap old houses.' },
    { id: 'bar-nunn', kind: 'FEEDER', name: 'Bar Nunn', minutes: 10, bearing: 25, note: 'A bedroom town north by the airport. Teenagers get rides in.' },
    { id: 'glenrock', kind: 'FEEDER', name: 'Glenrock', minutes: 30, bearing: 85, note: 'A small highway town east. A few kids, rarely a band.' },
    { id: 'edgerton', kind: 'FEEDER', name: 'Edgerton and Midwest', minutes: 45, bearing: 5, note: 'Very small oil-field towns north on Highway 387.' },
    { id: 'douglas', kind: 'FEEDER', name: 'Douglas', minutes: 55, bearing: 80, note: 'A ranch and railroad town. A few kids drive in for a show.' },
    { id: 'shoshoni', kind: 'FEEDER', name: 'Shoshoni', minutes: 100, bearing: 290, note: 'A tiny junction town west. Only on a good night.' },
    { id: 'gillette', kind: 'PEER', name: 'Gillette', minutes: 110, bearing: 10, scene: 300, note: 'A coal-country town of about the same size, with a few touring stops.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', minutes: 160, bearing: 155, slug: 'cheyenne-wy', note: 'A small downtown hall with punk and metal bands. Down I-25.' },
    { id: 'laramie', kind: 'PEER', name: 'Laramie', minutes: 165, bearing: 150, slug: 'laramie-wy', note: 'A university town with a known house scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and David Street', route: 'downtown', note: 'The bar strip and old brick storefronts: tour-stop rooms and cover bands, an occasional all-ages night.' },
    { id: 'old-yellowstone', name: 'Old Yellowstone', route: 'old-side', note: 'An older district by the river with warehouses and cheap rents. The likeliest place for a hall.' },
    { id: 'center-cy', name: 'Center Street and CY Avenue', route: 'work-side', note: 'Wide commercial strips of motels, auto shops and strip malls. Cheap storefront rooms.' },
    { id: 'poplar', name: 'Poplar and the east-central grid', route: 'old-side', note: 'Small old houses, alleys and garages. Where house shows would live.' },
    { id: 'mills', name: 'Mills and the river flats', route: 'work-side', note: 'Cheap and industrial, with trailers and old houses on the west edge.' },
    { id: 'southwest', name: 'Mountain View and the southwest', route: 'campus', note: 'Newer subdivisions and schools. Suburban kids with garages.' },
    { id: 'evansville-town', name: 'Evansville by the river', route: 'town:evansville', note: 'Cheap rent east of town by the river. Kids come in from every side.' },
    { id: 'north-edge', name: 'the north edge', route: 'campus', note: 'New sprawl by the airport and the highway north. Kids drive in.' }
  ],

  rooms: [
    { id: 'poplar-garage', kind: 'HOUSE', hood: 'poplar', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A garage behind a small old house. Neighbors have the cops\' number, and the kids have a curfew.' },
    { id: 'mills-yard', kind: 'HOUSE', hood: 'mills', cap: 50, curfew: 1380, ac: false, outdoor: true,
      note: 'A yard and garage on the west edge, run off a generator. Wind and cold decide who stands outside.' },
    { id: 'evansville-house', kind: 'HOUSE', hood: 'evansville-town', cap: 40, curfew: 1350, ac: false, outdoor: false, pressure: 55,
      note: 'A cheap rental by the river. Kids come from every side, and the landlord is the threat.' },
    { id: 'church-hall', kind: 'HALL', hood: 'downtown', cap: 100, curfew: 1320, ac: true,
      note: 'A rented church hall downtown. Folk and blues are its usual crowd, and loud bands are a stretch.' },
    { id: 'back-room', kind: 'BAR', hood: 'downtown', cap: 200, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A bar back room with cover bands and the odd touring punk act. The bartender runs the sound.' },
    { id: 'social-club', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['ALL', 'A21'], curfew: 1440, ac: true, outdoor: false, needs: ['FULL_BILL'],
      note: 'A downtown club with an indoor stage and a summer yard. Some nights are all ages, late ones go 21 and up.' },
    { id: 'taproom', kind: 'CLUB', hood: 'old-yellowstone', cap: 300, ages: ['ALL'], curfew: 1380, ac: true, needs: ['FULL_BILL'],
      note: 'A brewery taproom that has hosted punk bills all ages. The likeliest real room, and the license decides who gets in.' },
    { id: 'strip-unit', kind: 'SHOP', hood: 'center-cy', cap: 60, curfew: 1260, ac: true, pressure: 50,
      note: 'A strip-mall unit rented month to month. A landlord who reads the news closes it.' },
    { id: 'plaza', kind: 'OUTDOOR', hood: 'downtown', cap: 800, curfew: 1320, rent: 25, pa: .5,
      note: 'A downtown plaza with free summer shows. The city picks the lineup, and the permit is the whole fight.' }
  ],

  contacts: ['cheyenne-wy', 'laramie-wy', 'fort-collins-co', 'denver'],

  calendar: [
    { id: 'college-rodeo', label: 'the college rodeo week', tag: 'festival', month: 6, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.85, .85, .85], hoods: ['downtown', 'center-cy'], elsewhere: [.95, .92, .92] },
    { id: 'county-fair', label: 'the county fair and rodeo', tag: 'fair', month: 7, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['center-cy'], elsewhere: [.95, .92, .92] },
    { id: 'plaza-festival', label: 'the downtown music festival', tag: 'festival', month: 8, week: 3, dows: [5], can: [.80, .80, .80], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'hunting', label: 'hunting season weekend', tag: 'holiday', month: 10, weeks: [2, 4], dows: [5, 6], can: [.85, .88, .88] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  roads: ['I-25', 'US 20', 'US 26', 'Highway 220', 'Highway 387'],
  points: [
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.5, pop: 117000 },
    { name: 'Riverton', state: 'WY', lat: 43.02, lon: -108.38, pop: 11000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 200000 },
    { name: 'Rapid City', state: 'SD', lat: 44.08, lon: -103.23, pop: 75000 }
  ],

  words: {
    street: ['David Street', 'CY Avenue', 'Center Street', 'Yellowstone Highway', 'Wyoming Boulevard', 'Poplar Street'],
    water: ['the North Platte'],
    hood: ['Old Yellowstone', 'Mills', 'Evansville', 'Bar Nunn', 'Mountain View'],
    thing: ['wind', 'oilfield', 'pickup', 'tribute band', 'refinery smell', 'mule deer'],
    weather: ['ground blizzard', 'wind advisory']
  },

  events: [
    { id: 'CASPER_WY_CURFEW_CLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'City police are counting curfew calls again, and a few of the younger regulars have mentioned it.',
      title: 'The curfew beats the doors',
      body: 'A fifteen-year-old regular has to be home by eleven, and the bill runs past half past ten. Her friends are doing the same math.',
      options: [
        { id: 'EARLY', label: 'Move the first band earlier', likely: 'The kids hear everyone, in a short, early night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were early, the kids heard every band, and they were home before the clock.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The young ones leave before the headliner.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the kids walked out at ten forty, and the room felt it.' }
      ] },

    { id: 'CASPER_WY_RODEO_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [6, 8] },
      telegraph: 'Out-of-town trucks are filling the motel lots and every downtown room has a sign out.',
      title: 'The big week fills the town',
      body: 'Visitors have taken every downtown room and the arena parking. Your bill has to fight for the one open night.',
      options: [
        { id: 'LATE', label: 'Push doors back until the crowds thin', likely: 'It starts late, but the ones who want a night out show up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were an hour late, and the visitors wandered in and the locals found you.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids avoid the crowds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The kids stayed home and the regulars came, so it was a thin night.' }
      ] },

    { id: 'CASPER_WY_WIND_CLOSURE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The wind is up and the highway signs say the road east may close.',
      title: 'The highway is closed',
      body: 'Blowing snow shut the interstate an hour before doors. The out-of-town band is parked at a truck stop, and half the kids who drive in are stuck at home.',
      options: [
        { id: 'LONG', label: 'Let the local band play long', likely: 'It\'s a small, warm night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The locals stretched out, and the room stayed warm. The van never made it.' },
        { id: 'WAIT', label: 'Hold the doors for the van', likely: 'It starts late, and the ones who drove in stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The van pulled in at ten, white with snow, and the night ran long.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' }
      ] }
  ]
});
