SB.Cities.register('greeley-co', {
  v: 1,
  slug: 'greeley-co',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of northern colorado', 'unc', 'aims community college', 'colorado state university', 'colorado state', 'csu', 'greeley tribune',
           'greeley independence stampede', 'independence stampede', 'stampede', 'island grove', 'union colony', 'warped tour', 'poudre express', 'express arrow',
           'the crucible', 'jbs', 'colorado air national guard', 'air national guard', 'greeley west', 'vfw', 'american legion', 'knights of columbus',
           'downtown greeley entertainment district', 'rocky mountain oysters', 'the feedlot annex', 'meeker street hall', 'union colony basement', 'the beet dump',
           'chinook room', 'latham station', 'the lincoln park carport', 'overland lanes', 'poudre bottom', 'the spud hall', 'dry town social club',
           'tenth street tire and lube', 'greeley stampede', 'island grove regional park', 'family funplex', 'funplex', 'union colony civic center',
           'unc bears', 'bandwagon magazine', 'visit greeley', '9news', 'westword', 'northfortynews', 'north forty news', 'greeley blues jam', 'oktobrewfest',
           'weld county fair', '9th street plaza', 'ninth street plaza', 'greeley history museum', 'greeley central high school', 'gallop bus'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['greeley tribune*', 'stampede*', 'independence stampede*', 'warped tour*', 'jbs*', 'poudre express*', 'island grove*', 'union colony civic center*', 'university of northern colorado*', 'family funplex*'],

  blurb: ['A High Plains farm and meatpacking city on the flat land north of Denver, started as a temperance colony and still church-minded, with a university in the middle and the smell of the feedlots on the wind.',
          'Kids here wait out the shift whistle, the school calendar and the highway snow to get a show going. A big working-class Hispanic east side has the garages, but the better-known college towns up the interstate take the best bands.'],
  hard: 'Off the interstate, shadowed by bigger college towns, and the crowd resets with school.',
  region: 'the Front Range',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Fort Collins', state: 'CO', lat: 40.59, lon: -105.08 },
    { name: 'Boulder', state: 'CO', lat: 40.01, lon: -105.27 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Greeley' },
    { id: 'kersey', kind: 'FEEDER', name: 'Kersey', minutes: 15, bearing: 95, note: 'A farm village to the east on the highway; no scene of its own.' },
    { id: 'evans', kind: 'FEEDER', name: 'Evans and Garden City', minutes: 10, bearing: 190, pop: 22000, note: 'A fast-growing young and heavily Hispanic bedroom city to the south, with a tiny enclave beside it.' },
    { id: 'windsor', kind: 'FEEDER', name: 'Windsor', minutes: 20, bearing: 295, pop: 32000, note: 'A fast-growing suburb toward the interstate; kids here are the garage-band kind.' },
    { id: 'eaton', kind: 'FEEDER', name: 'Eaton', minutes: 20, bearing: 5, note: 'A farm and dairy town up the highway with a high school.' },
    { id: 'johnstown', kind: 'FEEDER', name: 'Johnstown and Milliken', minutes: 25, bearing: 240, note: 'Growing exurbs by the interstate; kids ride the highway for shows.' },
    { id: 'platteville', kind: 'FEEDER', name: 'Platteville, Gilcrest and LaSalle', minutes: 25, bearing: 175, note: 'Oilfield and farm towns, working-class and mostly Hispanic.' },
    { id: 'ault', kind: 'FEEDER', name: 'Ault and Pierce', minutes: 30, bearing: 355, note: 'Farm villages to the north.' },
    { id: 'fort-lupton', kind: 'FEEDER', name: 'Fort Lupton', minutes: 35, bearing: 185, note: 'A farm and oil town with an old Hispanic community and plenty of kids with cars.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 35, bearing: 255, note: 'An arts-and-tourism town of its own to the west.' },
    { id: 'fort-morgan', kind: 'FEEDER', name: 'Fort Morgan', minutes: 50, bearing: 100, note: 'A farm and dairy town out on the eastern interstate; kids come in for the big shows.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', minutes: 40, bearing: 320, slug: 'fort-collins-co', note: 'The better-known college town that Greeley kids look up to and resent.' },
    { id: 'boulder', kind: 'PEER', name: 'Boulder', minutes: 65, bearing: 230, slug: 'boulder-co', note: 'Pricier and more cosmopolitan; where bands leave for.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', state: 'WY', minutes: 75, bearing: 5, scene: 250, slug: 'cheyenne-wy', note: 'A fellow plains-and-rail town up the interstate that trades small tours.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old brick blocks and an entertainment district around Tenth Street. Bar back rooms that go all-ages early; landlord and city attention are highest here.' },
    { id: 'university', name: 'the university area', route: 'campus', note: 'Older houses cut into rentals around a two-part campus. House shows, student rooms, empty in May and December.' },
    { id: 'east-side', name: 'east and southeast Greeley', route: 'work-side', note: 'Working-class, heavily Hispanic and industrial, by the rail line and the plant. Backyards, garages and practice units. Cheap and ignored.' },
    { id: 'northwest', name: 'northwest Greeley and the US 34 strip', route: 'campus', note: 'New subdivisions and big-box strips. Teen garage bands and a church youth room or two.' },
    { id: 'fairgrounds', name: 'the fairgrounds', route: 'old-side', note: 'Arenas and exhibition halls rented to anyone with a deposit. Never a punk neighborhood, but it rules the town in late June.' },
    { id: 'evans-us85', name: 'Evans and Garden City', route: 'work-side', note: 'Commercial strips along US 85 and 23rd Avenue. Warehouse units, backyards and a bar that ignores the noise rules.' },
    { id: 'river', name: 'the Poudre river bottoms', route: 'old-side', note: 'Trail and bridge spots for bonfire and generator nights. Gone the moment someone calls it in.' }
  ],

  rooms: [
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-side', cap: 40, curfew: 1320, ac: false, outdoor: true, start: true,
      note: 'A detached garage and a flat yard on an east-side alley. The ten o\'clock cutoff is the threat, and so is one neighbor with a phone.' },
    { id: 'rental-house', kind: 'HOUSE', hood: 'university', cap: 60, curfew: 1320, ac: false, pressure: 55,
      note: 'An older rental near campus with a basement and a porch. The landlord and the May exodus decide how long it lasts.' },
    { id: 'big-room', kind: 'BIG', hood: 'downtown', cap: 520, ages: ['ALL', 'A18', 'A21'], curfew: 1380,
      note: 'The downtown room built to be the city\'s first real all-ages stage, with a full bar. You rent it by the night, and the costs are the threat.' },
    { id: 'strip-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1440,
      note: 'A long-running bar and stage near Tenth Street. The age line changes with the night and the talent buyer.' },
    { id: 'tenth-dive', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1530,
      note: 'A dive with a stage on the Tenth Street corridor. The 21-plus door cuts out the kids who carry the scene.' },
    { id: 'bowling-stage', kind: 'BAR', hood: 'downtown', cap: 200, ages: ['ALL'], curfew: 1320,
      note: 'A bowling alley with a stage on the concourse. All ages, but league night owns the load-in and the kids can\'t buy anything at the bar.' },
    { id: 'expo-hall', kind: 'HALL', hood: 'fairgrounds', cap: 400, curfew: 1320, ac: true,
      note: 'An exhibition hall rented to anyone with a deposit. Booked solid for the rodeo fortnight and cold the rest of the year.' },
    { id: 'church-hall', kind: 'HALL', hood: 'downtown', cap: 120, curfew: 1320, ac: true, owner: 'CHURCH_CONTACT', pressure: 45,
      note: 'A church hall downtown where the early local shows were held. The pastor wants a clean bill and a short night.' },
    { id: 'coffee-floor', kind: 'SHOP', hood: 'downtown', cap: 50, curfew: 1200, ac: true,
      note: 'A coffee shop with a PA and a clear floor. Over by eight, with a tenant next door who can hear everything.' },
    { id: 'plaza-lawn', kind: 'OUTDOOR', hood: 'fairgrounds', cap: 300, curfew: 1260, rent: 15, pressure: 45,
      note: 'The event-park lawn and the downtown plaza, free summer nights and a festival or two. Permits, a forecast and a 9 pm cutoff.' },
    { id: 'river-bonfire', kind: 'OUTDOOR', hood: 'river', cap: 40, curfew: 1290, rent: 0, pressure: 60,
      note: 'A bonfire and a generator down by the Poudre. It lasts until somebody calls it in.' },
    { id: 'rail-unit', kind: 'DIY', hood: 'east-side', cap: 80, curfew: 1320, needs: ['VOUCH'], pressure: 55,
      note: 'A practice unit with a roll-up door by the rail line. The lease and the fire marshal are the threats.' }
  ],

  contacts: ['fort-collins-co', 'boulder-co', 'denver', 'colorado-springs-co'],

  calendar: [
    { id: 'rodeo-june', label: 'the rodeo fortnight', tag: 'fair', month: 6, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['fairgrounds', 'downtown'], elsewhere: [.97, .95, .95] },
    { id: 'rodeo-july', label: 'the rodeo fortnight and the Fourth', tag: 'fair', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['fairgrounds', 'downtown'], elsewhere: [.97, .95, .95] },
    { id: 'cinco', label: 'the Cinco weekend downtown', tag: 'festival', month: 5, week: 1, dows: [4, 5, 6], can: [.95, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'harvest-beer', label: 'the harvest beer festival', tag: 'festival', month: 9, week: 4, dows: [5], can: [.92, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'tribute-fest', label: 'the tribute-band festival', tag: 'festival', month: 8, week: 1, dows: [5], can: [.92, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'commencement', label: 'graduation weekend', tag: 'graduation', month: 5, week: 2, dows: [4, 5, 6], can: [.60, .90, 1], hoods: ['university'], elsewhere: [.95, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65000 },
    { name: 'Longmont', state: 'CO', lat: 40.17, lon: -105.10, pop: 98000 },
    { name: 'Pueblo', state: 'CO', lat: 38.25, lon: -104.61, pop: 112000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 }
  ],
  roads: ['I-25', 'I-76', 'US 34', 'US 85', 'CO 257', 'Highway 392'],

  words: {
    street: ['Tenth Street', 'Eighth Street', '23rd Avenue', '35th Avenue', 'US 34', 'US 85'],
    water: ['the Poudre', 'the South Platte', 'the Cache la Poudre'],
    hood: ['Evans', 'Garden City', 'Windsor', 'Kersey', 'Eaton', 'Milliken', 'Johnstown', 'Platteville', 'Gilcrest'],
    thing: ['feedlot', 'beet truck', 'breakfast burrito', 'green chili', 'dairy', 'grain elevator', 'garage', 'hay field', 'shift whistle', 'rodeo parking'],
    weather: ['chinook', 'plains wind', 'hail', 'blizzard']
  },

  events: [
    { id: 'GREELEY_CO_RODEO_OVERFLOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The rodeo fortnight is on and the parade runs through downtown every evening at six.',
      title: 'The fortnight has the town',
      body: 'Every hotel, hall and parking lot is spoken for, and a parade closes the main street each evening. The crowd is in town, but it is not looking for you.',
      options: [
        { id: 'LATE', label: 'Push doors back until the parade is done', likely: 'The overflow crowd drifts in late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The parade crowd wandered in loud and happy.' },
        { id: 'EASTSIDE', label: 'Play the quiet east side while the park is full', likely: 'Smaller and local. Nobody has to park downtown.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage on the east side took the bill. The street was empty and the room was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The fairgrounds crowd stays at the fairgrounds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .78 }],
          result: 'The parade took the town. The regulars came and not many others.' }
      ] },

    { id: 'GREELEY_CO_TEN_PM_CUTOFF', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'The garage show is set for a Saturday, and the city stops amplified sound at ten.',
      title: 'Ten o\'clock on the dot',
      body: 'The cutoff for amplified sound is ten, and the headliner does not go on until nine-fifteen. A neighbor across the alley has already said he will call.',
      options: [
        { id: 'EARLY', label: 'Start an hour early and finish at the cutoff', likely: 'A short night. Some miss the start.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early and a tight night. The last song was unplugged, and nobody minded.' },
        { id: 'UNPLUG', label: 'Go unplugged for the last hour', likely: 'Quieter and strange. The crowd stays.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Acoustic after ten, shouted along by everybody. The call came in anyway.' },
        { id: 'ACCEPT', label: 'Run it long and take the risk', likely: 'The call is coming.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'MONEY', amount: -30 }],
          result: 'A patrol car rolled up at ten past. You pulled the plug and paid a thirty-dollar warning fee.' }
      ] },

    { id: 'GREELEY_CO_SPRING_BLIZZARD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5] },
      telegraph: 'A late spring blizzard is headed for the Front Range, and the highway out of town is already slick.',
      title: 'The highway is closed',
      body: 'The blizzard shut the highway to the interstate. The touring band is stuck on the other side, and the only act that can reach the room is a local one.',
      options: [
        { id: 'LOCAL', label: 'Run it with the locals who can walk there', likely: 'A thin bill, but everyone who comes is glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two local bands and a long, loose night. The room was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the plows', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten. You started late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
