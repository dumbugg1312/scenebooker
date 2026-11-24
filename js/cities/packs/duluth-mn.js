SB.Cities.register('duluth-mn', {
  v: 1,
  slug: 'duluth-mn',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['umd', 'university of minnesota duluth', 'college of st. scholastica', 'st. scholastica', 'lake superior college', 'uw-superior', 'northland college',
           'duluth news tribune', 'news tribune', 'kumd', 'grain belt', 'hamm\'s', 'dta', 'canal park', 'aerial lift bridge', 'lift bridge', 'lakewalk',
           'grandma\'s marathon', 'blues festival', 'bentleyville', 'homegrown', 'twin ports', 'fond du lac', 'spirit mountain', 'blatnik', 'blatnik bridge', 'bong bridge',
           'american legion', 'vfw', 'elks',
           'the slipway', 'taconite hall', 'bridge tender\'s annex', 'the cold storage', 'skyline hall', 'ballast', 'the gale warning', 'ship canal social club',
           'lake effect annex', 'hoist house', 'fourth street gym', 'ironhead lounge',
           'perfect duluth day', 'perfectduluthday', 'the north 103.3', '103.3 the north', 'wdse', 'pbs north', 'duluth reader', 'mpr news', 'star tribune',
           'visit duluth', 'destination duluth', 'duluth police', 'homegrown music festival', 'tour of lights', 'monsters of rock', 'air and aviation expo',
           'tall ships duluth', 'park point art fair', 'minnesota hardcore', 'mn hardcore', 'twin cities pbs'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['umd*', 'kumd*', 'news tribune*', 'bentleyville*', 'canal park*', 'ironhead*'],

  blurb: ['The end of the interstate, so everyone you play for already knows everyone else. Punk and metal share rooms and a crowd.',
          'The record shop and the old practice building are gone. A cafe punk night, a basement across the bridge and one big festival week are what is left.'],
  hard: 'A long, cold detour from anywhere, with a small crowd that already knows everyone.',
  region: 'the North Shore',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Duluth' },
    { id: 'proctor', kind: 'FEEDER', name: 'Proctor', minutes: 10, bearing: 255, note: 'A railroad-yard town on the hill; a suburb of Duluth in everything but name.' },
    { id: 'superior', kind: 'FEEDER', name: 'Superior', state: 'WI', minutes: 15, bearing: 135, pop: 27000, scene: 60, note: 'The sister port across the bridge: rust-belt bars, its own metal and punk, rival and partner.', bands: 3 },
    { id: 'hermantown', kind: 'FEEDER', name: 'Hermantown', minutes: 15, bearing: 320, pop: 10000, note: 'The big suburb of strip malls and a large high school; teens with cars come in.' },
    { id: 'cloquet', kind: 'FEEDER', name: 'Cloquet', minutes: 25, bearing: 245, pop: 12600, note: 'A paper-mill and hockey town with its own small scene.', bands: 1 },
    { id: 'carlton', kind: 'FEEDER', name: 'Carlton', minutes: 30, bearing: 225, note: 'A tiny town of families; a few kids drive in.' },
    { id: 'two-harbors', kind: 'FEEDER', name: 'Two Harbors', minutes: 40, bearing: 40, pop: 3600, note: 'An ore-dock town up the shore with some teen punks and metal kids.' },
    { id: 'silver-bay', kind: 'FEEDER', name: 'Silver Bay', minutes: 60, bearing: 40, pop: 1800, note: 'A taconite company town; young people drive down for anything.' },
    { id: 'virginia', kind: 'FEEDER', name: 'Virginia and Eveleth', minutes: 75, bearing: 340, pop: 8500, note: 'Iron Range mining towns with a strong metal and hardcore tradition.' },
    { id: 'st-cloud', kind: 'PEER', name: 'St. Cloud', minutes: 165, bearing: 215, scene: 700, note: 'A college town more suburban in feel, down I-35 and across.' },
    { id: 'eau-claire', kind: 'PEER', name: 'Eau Claire', state: 'WI', minutes: 180, bearing: 170, slug: 'eau-claire-wi', note: 'A university and indie town with a big music reputation; a friendly rivalry.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the lakefront', route: 'downtown', note: 'A tourist district of hotels and restaurants below the hill; dead for DIY except as a place noise gets complained about.' },
    { id: 'hillside', name: 'the Central Hillside', route: 'old-side', note: 'Steep slope of dense old frame houses, rentals and churches; cheap, ignored and where house shows live.' },
    { id: 'west-end', name: 'the West End', route: 'work-side', note: 'Old working-class neighborhood of warehouses and brick storefronts below the rail yards; cheap space for makers.' },
    { id: 'west-duluth', name: 'West Duluth and Morgan Park', route: 'work-side', note: 'Far west end by the river and the old steel plant: a worn commercial strip and a planned company town of block houses.' },
    { id: 'campus', name: 'the campus side', route: 'campus', note: 'Big old houses and duplexes around the university on the hill; student-churned rentals and house parties.' },
    { id: 'lakeside', name: 'Lakeside and Lester Park', route: 'campus', note: 'Pricey east end along London Road with bigger lots; a few basements and garages.' },
    { id: 'park-point', name: 'Park Point', route: 'old-side', note: 'A long sandbar of beach houses at the dead end of one road; summer bonfires only.' },
    { id: 'superior', name: 'Superior, across the bridge', route: 'town:superior', note: 'Rust-belt bars and old basements over the harbor bridge. The heavy bands cross it for a room that will have them.' }
  ],

  rooms: [
    { id: 'hill-basement', kind: 'HOUSE', hood: 'hillside', cap: 30, curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rental basement on a steep block of old frame houses. The neighbors and the landlord are the threat, and the spring melt floods it.' },
    { id: 'bridge-basement', kind: 'HOUSE', hood: 'superior', cap: 40, curfew: 1380, ac: false, outdoor: false, pressure: 50,
      note: 'A shady basement over the bridge where grind, black metal and hardcore share one all-ages bill. The heavy bands cross the harbor for it.' },
    { id: 'music-hall', kind: 'HALL', hood: 'downtown', cap: 150, curfew: 1320, ac: true,
      note: 'A nonprofit hall in an old church-style building. All ages and out by ten, and it costs more than a basement.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1530, ac: true,
      note: 'A bar on the tourist strip that runs rock and metal nights. The stage is a corner with no riser.' },
    { id: 'harbor-club', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1470, ac: true, needs: ['FULL_BILL'],
      note: 'The kind of mid-size room the town lost once and has not fully replaced. Eighteen and up, and it wants a real bill.' },
    { id: 'cafe-room', kind: 'SHOP', hood: 'west-end', cap: 80, curfew: 1320, ac: true, following: .2,
      note: 'A cafe with an all-ages punk night and the espresso machine going. The steadiest early room in town, until the cafe decides otherwise.' },
    { id: 'taproom-yard', kind: 'OUTDOOR', hood: 'west-end', cap: 400, curfew: 1350,
      note: 'A brewery yard by the harbor that holds one big summer day of rock and metal. The weather and the closing hour are the limit.' },
    { id: 'beach-fire', kind: 'OUTDOOR', hood: 'park-point', cap: 40, curfew: 1320,
      note: 'A bonfire on the sandbar with a generator and an acoustic set. The parks close at ten, and the police are patient until then.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 800, curfew: 1380, ac: true,
      note: 'A restored downtown theater for the touring packages. No punk bill books it on its own.' },
    { id: 'brick-warehouse', kind: 'DIY', hood: 'west-end', cap: 60, curfew: 1350, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A brick bay near the rail yards, in the style of the practice building the town lost. A show here is a dare and the fire marshal knows it.' }
  ],

  contacts: ['eau-claire-wi', 'fargo-nd', 'minneapolis'],

  calendar: [
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 6, week: 3, dows: [4, 5], can: [.90, .85, .85], hoods: ['downtown', 'park-point'], elsewhere: [1, .97, .97] },
    { id: 'light-display', label: 'the waterfront light display', tag: 'holiday', month: 12, weeks: [1, 4], dows: [4, 5], can: [.90, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'music-week', label: 'the local-music festival week', tag: 'festival', month: 5, week: 1, dows: [3, 4, 5], can: [.70, .70, .75] },
    { id: 'metal-fest', label: 'the summer metal and rock fest', tag: 'festival', month: 7, week: 1, dows: [5], can: [.90, .88, .90] },
    { id: 'air-show', label: 'the air show', tag: 'airshow', month: 7, week: 1, dows: [5, 6], can: [.95, .92, .92] },
    { id: 'hockey', label: 'home hockey weekends', tag: 'game', month: 11, weeks: [1, 2], dows: [4, 5], can: [.90, .95, .95], hoods: ['campus', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Thunder Bay', state: 'ON', lat: 48.38, lon: -89.25, pop: 108000 },
    { name: 'Marquette', state: 'MI', lat: 46.54, lon: -87.4, pop: 21000 },
    { name: 'Grand Marais', state: 'MN', lat: 47.75, lon: -90.33, pop: 1300 }
  ],
  roads: ['I-35', 'US 53', 'US 2', 'MN 61', 'MN 23', 'I-535'],

  words: {
    street: ['Superior Street', 'Lake Avenue', 'London Road', 'Skyline Parkway', 'Grand Avenue', 'Central Entrance', 'Michigan Street'],
    water: ['Lake Superior', 'the St. Louis River', 'the harbor', 'Park Point', 'Lester River'],
    hood: ['Central Hillside', 'West End', 'Lincoln Park', 'Morgan Park', 'West Duluth', 'Chester Park', 'Lakeside', 'Lester Park', 'Park Point', 'Spirit Valley'],
    thing: ['ore boat', 'taconite pellet', 'hotdish', 'pasty', 'wild rice soup', 'snowbank', 'shovel', 'cafe punk night', 'festival week', 'practice building', 'record shop'],
    weather: ['lake effect', 'whiteout', 'lake fog']
  },

  events: [
    { id: 'DULUTH_MN_FIRST_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The first hard snow is coming and the highway south is already closing in places.',
      title: 'The highway south is shut',
      body: 'A whiteout has closed the interstate south of town and the touring band is stuck at the far end of it. The bill is down to the locals.',
      options: [
        { id: 'LOCALS', label: 'Run it with the local bands and play on', likely: 'A thin night, but the ones who walk over are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Locals only, a long loose night and a warm room full of people who live nearby.' },
        { id: 'WAIT', label: 'Hold the doors for the van', likely: 'The start is late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van crawled in near ten, and you started late but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everyone trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could make the new date did.' }
      ] },

    { id: 'DULUTH_MN_MARATHON_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The lakefront road is closing for the race and every hotel is full.',
      title: 'Marathon weekend',
      body: 'The shore road is shut, parking is gone and the downtown streets are full of visitors in race shirts. The scene kids are staying up the hill.',
      options: [
        { id: 'LATE', label: 'Push doors back until the streets clear', likely: 'The ones who live here show up, but later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened an hour late, and the crowd walked down the hill after the road reopened.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Tourists wander in, but not many of them stay.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A few visitors stuck their heads in and left, and the regulars made it up from the hill.' },
        { id: 'BASEMENT', label: 'Move the bill to a basement up the hill', likely: 'Smaller and louder, and nobody can tow a house.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement on the slope took the bill and the floor was full by nine.' }
      ] },

    { id: 'DULUTH_MN_BEACH_CLOSING', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'City police are going down the beach asking people to be gone by ten.',
      title: 'The park closes at ten',
      body: 'The bonfire set on Park Point was going well, and then the patrol came down the sand at the closing hour. The generator has to be off and everyone off the beach.',
      options: [
        { id: 'BASEMENT', label: 'Carry the set to a basement across the bridge', likely: 'Smaller and louder, and half of them follow.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The whole bill and a few dozen people crossed the bridge and finished in a basement.' },
        { id: 'EARLY', label: 'Start at six and be done by the closing hour', likely: 'A short, bright night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Early doors, a short bright set and everyone off the sand before the patrol.' },
        { id: 'ACCEPT', label: 'Pack up and end it', likely: 'The night ends flat.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The fire went out early, and people drifted off in the dark.' }
      ] }
  ]
});
