SB.Cities.register('yakima-wa', {
  v: 1,
  slug: 'yakima-wa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['yakima edge fest', 'edge fest', 'katsfm', 'kats fm', 'newstalkkit', 'newstalk kit', 'visit yakima', 'yakima valley tourism', 'yakima police', 'commonfest', 'common ground concert series', 'downtown summer nights', 'yakima cinco de mayo cultural festival', 'songkick', 'bandsintown', 'spokesman-review', 'nwpb', 'interlochen', 'yakima valley college', 'heritage university', 'central washington university', 'cwu', 'pacific northwest university of health sciences', 'yakima training center',
           'yakima herald-republic', 'herald-republic', 'whirlpool', 'seahawks', 'seattle seahawks', 'fresh hop ale festival', 'fresh-hop ale festival', 'folklife festival',
           'central washington state fair', 'state fair park', 'ellensburg rodeo', 'toppenish pow wow', 'pow-wow', 'fiestas patrias', 'palm springs of washington', 'yakistan',
           'yakama', 'yakama nation', 'vfw', 'eagles', 'elks', 'grange', 'washington state liquor and cannabis board', 'liquor and cannabis board', 'amtrak', 'wsdot',
           'bin room', 'kiln sixteen', 'cold storage nine', 'packing annex', 'ahtanum road hall', 'wiley flats barn', 'gap rail shed', 'orchard row garage',
           'naches bend grange', 'terrace overlook shop', 'canal street basement', 'rattlesnake ridge room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['yakima herald*', 'seahawks*', 'whirlpool*', 'central washington university*', 'yakima valley college*', 'heritage university*'],

  blurb: ['A hops, fruit and wine city in the dry valley east of the Cascades, where garages, yards and church halls carry small, scrappy shows.',
          'Punk comes in bursts from a few kids with a PA, and the Latino and suburban scenes mostly run on separate tracks.'],
  hard: 'A long drive over the pass, few all-ages rooms, and kids with no rides.',
  region: 'the Northwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43 },
    { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Yakima' },
    { id: 'selah', kind: 'FEEDER', name: 'Selah', minutes: 10, bearing: 355, note: 'An orchard commuter town just north; a source of garage bands.' },
    { id: 'union-gap', kind: 'FEEDER', name: 'Union Gap', minutes: 10, bearing: 180, note: 'The retail city to the south: big-box lots and light-industrial units, no scene of its own.' },
    { id: 'moxee', kind: 'FEEDER', name: 'Moxee', minutes: 15, bearing: 95, note: 'Hop country and barn-show territory.', scene: 50,
      rooms: [
        { id: 'hop-barn', kind: 'DIY', hood: 'moxee-hood', zone: 'moxee', cap: 80, pa: .4, curfew: 1320, ac: false, outdoor: false, pressure: 45,
          note: 'A barn out in the hops, fifteen minutes from the city. Far from the neighbors and far from a ride.' }
      ] },
    { id: 'naches', kind: 'FEEDER', name: 'Naches', minutes: 20, bearing: 300, note: 'A tiny foothill orchard town on the road toward the pass.' },
    { id: 'wapato', kind: 'FEEDER', name: 'Wapato', minutes: 20, bearing: 150, note: 'A small farm town with a tight-knit rock and metal crowd.' },
    { id: 'toppenish', kind: 'FEEDER', name: 'Toppenish', minutes: 25, bearing: 190, note: 'A small town of murals and a branch college, with some scene overlap.' },
    { id: 'zillah', kind: 'FEEDER', name: 'Zillah', minutes: 25, bearing: 130, note: 'A small wine and farm town with no scene of note.' },
    { id: 'ellensburg', kind: 'FEEDER', name: 'Ellensburg', minutes: 40, bearing: 5, note: 'A college town with its own DIY scene: the nearest rival and friend.' },
    { id: 'sunnyside', kind: 'FEEDER', name: 'Sunnyside and Grandview', minutes: 40, bearing: 125, note: 'Farm and food-processing towns, largely Latino, with garage and Spanish-language rock.' },
    { id: 'prosser', kind: 'FEEDER', name: 'Prosser', minutes: 45, bearing: 120, note: 'A wine-country county seat with little scene.' },
    { id: 'tri-cities', kind: 'PEER', name: 'The Tri-Cities', minutes: 75, bearing: 115, slug: 'kennewick-wa', note: 'A bigger, windier engineering-and-nuclear region. The usual stop on the loop between the coast and Spokane.' },
    { id: 'wenatchee', kind: 'PEER', name: 'Wenatchee', minutes: 135, bearing: 5, note: 'An apple and tourism city to the north; occasional exchange.' },
    { id: 'walla-walla', kind: 'PEER', name: 'Walla Walla', minutes: 140, bearing: 110, note: 'A small college and wine town; occasional exchange.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Yakima', route: 'downtown', note: 'Old brick storefronts and fruit warehouses along the tracks. More bars every year, which squeezes all-ages shows.' },
    { id: 'southeast', name: 'the Southeast and South 1st Street', route: 'old-side', note: 'The Latino commercial strip and its neighborhoods: backyard and garage parties, cumbia, norteño and Spanish-language rock.' },
    { id: 'west-valley', name: 'West Valley', route: 'campus', note: 'Orchards and newer subdivisions with big garages and pole barns. Parent-adjacent, and a ride is needed.' },
    { id: 'nob-hill', name: 'Nob Hill Boulevard and the college strip', route: 'campus', note: 'Strip-mall cheap: chain restaurants, auto shops, shop-bay practice rooms and church halls.' },
    { id: 'terrace-heights', name: 'Terrace Heights', route: 'work-side', note: 'A quiet bluff suburb across the river; easy to be stuck over the bridge with no ride.' },
    { id: 'northwest', name: 'the northwest side and Fruitvale', route: 'old-side', note: 'Older houses with real basements near the river trails. Slowly gentrifying.' },
    { id: 'warehouses', name: 'the rail warehouses', route: 'work-side', note: 'Leftover fruit warehouses near the tracks: the best DIY space if the landlords stay indifferent.' },
    { id: 'fairgrounds', name: 'the fairgrounds', route: 'work-side', note: 'The grandstand and expo halls west of downtown. Quiet all year except for the fair, when it eats the traffic.' },
    { id: 'moxee-hood', name: 'Moxee', route: 'town:moxee', note: 'Hop country out east: barns, pole sheds and a long dark road home.' }
  ],

  rooms: [
    { id: 'west-valley-garage', kind: 'HOUSE', hood: 'west-valley', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A big garage on an orchard-edge lot with a borrowed PA. Out by ten, and half the kids need a ride home.' },
    { id: 'northwest-basement', kind: 'HOUSE', hood: 'northwest', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, pressure: 50,
      note: 'An old house near the river trails with a real basement, the one true basement in town. The block is slowly getting nicer.' },
    { id: 'southeast-yard', kind: 'HOUSE', hood: 'southeast', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, pressure: 55,
      note: 'A backyard on the Southeast side where punk bands share the night with cumbia and norteño. Loud, friendly, and one noise call from over.' },
    { id: 'rail-warehouse', kind: 'DIY', hood: 'warehouses', cap: 120, pa: .5, curfew: 1380, ac: false, pressure: 55,
      note: 'A leftover fruit warehouse by the tracks. The best room you can get, as long as the landlord stays indifferent.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['ALL', 'A21'], curfew: 1380, ac: true, pressure: 40,
      note: 'The all-ages music hall on the main avenue, with the bar walled off. It has already lost one building and nobody is sure about the next.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A pizza-and-beer room with a stage that books the rock nights the all-ages hall cannot. Every new bar like it squeezes the kids out.' },
    { id: 'strip-hall', kind: 'HALL', hood: 'nob-hill', cap: 200, ages: ['ALL'], curfew: 1350, ac: true,
      note: 'A strip-mall music room out on the boulevard. Cheap and all ages, until the landlord leases the unit to someone else.' },
    { id: 'bay-shop', kind: 'SHOP', hood: 'nob-hill', cap: 40, ages: ['ALL'], curfew: 1290, ac: false,
      note: 'An auto-shop bay with the door rolled up. Cold in winter, and over by half past nine.' },
    { id: 'street-series', kind: 'OUTDOOR', hood: 'downtown', cap: 600, ages: ['ALL'], curfew: 1260, rent: 25,
      note: 'The downtown street where the city runs its free summer evenings. Not a punk room, but a one-off slot for a night.' },
    { id: 'fairgrounds', kind: 'BIG', hood: 'fairgrounds', cap: 1500, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The grandstand and expo halls at the fairgrounds. Touring acts only; nothing a new booker can rent.' }
  ],

  contacts: ['kennewick-wa', 'spokane-wa', 'seattle', 'portland'],

  calendar: [
    { id: 'state-fair-sep', label: 'the state fair', tag: 'fair', month: 9, weeks: [4, 5], dows: [4, 5, 6], can: [0.85, 0.85, 0.9], hoods: ['fairgrounds'], elsewhere: [.93,.9,.9] },
    { id: 'state-fair-oct', label: 'the state fair', tag: 'fair', month: 10, week: 1, dows: [4, 5, 6], can: [0.88, 0.88, 0.9] },
    { id: 'fresh-hop', label: 'the fresh-hop beer festival', tag: 'festival', month: 10, week: 2, dows: [5], can: [0.95, 0.9, 0.9], hoods: ['downtown'], elsewhere: [1,1,1] },
    { id: 'cinco', label: 'the spring street festival', tag: 'festival', month: 5, week: 1, dows: [4, 5, 6], can: [0.9, 0.88, 0.9], hoods: ['southeast', 'downtown'], elsewhere: [1,1,1] },
    { id: 'summer-thursdays', label: 'the free summer concerts', tag: 'festival', month: 7, week: 2, dows: [3], can: [0.88, 0.95, 1], hoods: ['downtown'], elsewhere: [1,1,1] },
    { id: 'metal-day', label: 'the metal and punk festival day', tag: 'festival', month: 10, week: 1, dows: [5], can: [1.05, 1.05, 1], hoods: ['downtown'], elsewhere: [.95,.95,.95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 2], dows: [4], can: [0.85, 0.95, 0.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 3], dows: [4], can: [0.85, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1410, weekend: 1440, inForce: false } },

  points: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Ellensburg', state: 'WA', lat: 46.99, lon: -120.55, pop: 19000 },
    { name: 'Wenatchee', state: 'WA', lat: 47.42, lon: -120.31, pop: 120000 }
  ],
  roads: ['I-82', 'US 97', 'US 12', 'SR 24', 'I-90', 'Snoqualmie Pass'],

  words: {
    street: ['Yakima Avenue', 'Nob Hill Boulevard', 'Summitview Avenue', 'South 1st Street', 'Front Street', 'Ahtanum Road'],
    water: ['the Yakima River', 'the Naches River', 'the Greenway', 'the Yakima Canyon'],
    hood: ['Terrace Heights', 'West Valley', 'Fruitvale', 'the Gap', 'Union Gap', 'Selah', 'Moxee'],
    thing: ['hop kiln', 'fruit bin', 'packing shed', 'espresso stand', 'taco truck', 'orchard row', 'wildfire smoke', 'generator', 'space heater', 'sagebrush ridge'],
    weather: ['wildfire smoke', 'heat wave', 'pass closure']
  },

  events: [
    { id: 'YAKIMA_WA_SMOKE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [7, 8, 9] },
      telegraph: 'The sky has gone orange and the air tastes like a campfire, and the yard show is still on the flyer.',
      title: 'The smoke settles in the valley',
      body: 'A wildfire to the west has parked its smoke over the whole valley. Your yard show in West Valley is outdoors, the air is bad, and half of your list has asthma.',
      options: [
        { id: 'GARAGE', label: 'Squeeze the show into a garage with the door shut', likely: 'It\'s hot and loud and close, and the people who come really want to.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }],
          result: 'It was a garage in July with one door cracked open, sweaty and tight and packed.' },
        { id: 'ACCEPT', label: 'Run it in the yard and hand out masks', likely: 'The kids who can handle it show up, and the rest stay in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The crowd was thinner in dusty orange light, and nobody stayed long.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the smoke may not clear.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the air was better but the crowd was not.' }
      ] },

    { id: 'YAKIMA_WA_PASS_CLOSED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The pass is closing with the snow, and the western band is on the wrong side of it.',
      title: 'Snow shuts the pass',
      body: 'The band from the coast was due over the mountains today, but the road is closed and the bill has a hole in the middle.',
      options: [
        { id: 'LOCALS', label: 'Rebuild the bill from valley kids and the college town', likely: 'It\'s a shorter, scrappier night, with whoever can drive here.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was three garage bands and a friend of a friend, and the room was loose and loud.' },
        { id: 'WAIT', label: 'Hold the doors and hope the road reopens', likely: 'It means a late start, and the crowd waits in the cold.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van rolled in at ten, and you started late, but nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody loses some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'YAKIMA_WA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is in town and every kid you know is on a ride.',
      title: 'The fair eats the weekend',
      body: 'The all-ages hall has lost another building, the fairgrounds are lit up across town, and the traffic into downtown is a crawl.',
      options: [
        { id: 'YARD', label: 'Move the show to a yard on the Southeast side', likely: 'It\'s smaller and closer, and away from the traffic.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A backyard took the bill with an hour to spare.' },
        { id: 'LATE', label: 'Push doors back until the fair crowd thins out', likely: 'The crowd that wants a night out shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened an hour late, and the people who came were glad to sit down.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list is at the fair.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The kids who wanted the fair went to the fair.' }
      ] }
  ]
});
