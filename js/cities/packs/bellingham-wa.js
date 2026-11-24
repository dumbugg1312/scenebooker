SB.Cities.register('bellingham-wa', {
  v: 1,
  slug: 'bellingham-wa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['western washington university', 'wwu', 'western front', 'whatcom community college', 'bellingham technical college',
           'northwest indian college', 'ski to sea', 'bellis fair', 'cascadia daily news', 'whatcomtalk', 'whatcom transportation authority', 'wta',
           'go line', 'amtrak', 'amtrak cascades', 'alaska marine highway', 'alaska ferry', 'evergreen state college',
           'naval air station whidbey island', 'naval air station whidbey', 'seahawks', 'seattle mariners', 'cherry point refinery',
           'city of subdued excitement', 'notaflof', 'peace arch', 'swinomish', 'lummi water carnival', 'the salmon weir', 'orca street hall',
           'the railyard annex', 'chuckanut switchback', 'the harbor loft', 'cornwall pole barn', 'the tideflat', 'sehome basement annex',
           'mill race', 'the eldridge carport', 'boundary line hall', 'the ferry slip'],
  /* The dossier's invented venue names are in banned: unchecked, so not used as room names. The relay race is "the relay race weekend" in game text. */
  blocklist: ['ski to sea*', 'bellis fair*', 'cascadia daily*', 'whatcomtalk*', 'western front*', 'salmon weir*', 'orca street*', 'railyard annex*'],

  blurb: ['A rainy college town where the address comes by DM, the door is pay-what-you-can and the room is a damp basement.',
          'Garage and fast punk trade rooms with the indie crowd. Houses come and go with every lease, and the best bands move south.'],
  hard: 'Few houses left, neighbors complain, and the good bands move south.',
  region: 'the Seattle to Vancouver corridor',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Vancouver', state: 'BC', lat: 49.28, lon: -123.12 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bellingham' },
    { id: 'lummi', kind: 'FEEDER', name: 'Lummi Nation', minutes: 20, bearing: 260, note: 'A sovereign community just west of town, with its own college and its own life. Not a suburb.' },
    { id: 'ferndale', kind: 'FEEDER', name: 'Ferndale', minutes: 20, bearing: 340, note: 'A refinery-side bedroom town with almost no scene. Its kids come to town.' },
    { id: 'lynden', kind: 'FEEDER', name: 'Lynden', minutes: 30, bearing: 15, note: 'A tidy, church-going farm town near the border. Very little to do, so the few kids who come are eager.' },
    { id: 'blaine', kind: 'FEEDER', name: 'Blaine', minutes: 30, bearing: 350, note: 'A harbor town at the crossing. Some Canadians pass through; little scene of its own.' },
    { id: 'nooksack', kind: 'FEEDER', name: 'Everson, Nooksack and Sumas', minutes: 35, bearing: 40, note: 'Small farm and border towns up the valley, with a crossing to the Fraser Valley.' },
    { id: 'baker', kind: 'FEEDER', name: 'Deming, Maple Falls and Glacier', minutes: 40, bearing: 80, beyond: 'baker-highway',
      note: 'Logging, ski-bum and back-to-the-land towns up the mountain road. A long winding drive that snow can close.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon and Burlington', state: 'WA', minutes: 40, bearing: 175, note: 'The valley hub to the south: big-box strips, farms, and a few motivated teenagers with a scene.' },
    { id: 'sedro-woolley', kind: 'FEEDER', name: 'Sedro-Woolley', minutes: 45, bearing: 150, note: 'An old logging and mill town turned bedroom town. A kid in a truck will drive up for a show.' },
    { id: 'anacortes', kind: 'FEEDER', name: 'Anacortes and La Conner', minutes: 55, bearing: 195, note: 'A ferry town on the water and a small arty town on the flats.' },
    { id: 'oak-harbor', kind: 'FEEDER', name: 'Oak Harbor', minutes: 75, bearing: 190, note: 'A navy town on the island. Sailors and navy kids, and maybe a small hardcore crowd.' },
    { id: 'abbotsford', kind: 'PEER', name: 'Abbotsford', state: 'BC', minutes: 60, bearing: 20, scene: 3000,
      note: 'A bigger Fraser Valley city with an all-ages scene of its own. The border is the dividing line.' },
    { id: 'everett', kind: 'PEER', name: 'Everett', minutes: 75, bearing: 185, scene: 3500,
      note: 'Working-class, base and aircraft town. Less college, more hard rock and metal.' },
    { id: 'olympia', kind: 'PEER', name: 'Olympia', minutes: 135, bearing: 190, slug: 'olympia-wa',
      note: 'The college-town sibling with a famously strong DIY tradition. They trade bands on weekends.' }
  ],

  chokepoints: [
    { id: 'baker-highway', name: 'the Mount Baker Highway', p: .02 }
  ],

  hoods: [
    { id: 'sehome', name: 'Sehome and the Garden Street edge', route: 'campus', note: 'Old houses cut into student rentals on the hill under campus. Porches, damp basements, and the show houses that burn out and get replaced every few years.' },
    { id: 'happy-valley', name: 'Happy Valley', route: 'old-side', note: 'Small old houses and bikes on every porch, a mix of students and young workers. Fewer neighbors tolerate a loud night.' },
    { id: 'downtown', name: 'Downtown', route: 'downtown', note: 'The brick core by the bay and the tracks. The formal rooms are here, and so are the bars and the neighbors who call at midnight.' },
    { id: 'lettered', name: 'the Lettered Streets, York and Columbia', route: 'old-side', note: 'Craftsman houses on the flats above the bay. Priced past students; porch shows and the odd garage.' },
    { id: 'fairhaven', name: 'Fairhaven', route: 'old-side', note: 'A pretty brick village at the south end. Not a punk place, and expensive.' },
    { id: 'samish', name: 'the Samish Way corridor', route: 'work-side', note: 'Motels, student apartment blocks and strip malls by the freeway ramp. Cheap, ignored, being rebuilt.' },
    { id: 'waterfront', name: 'the waterfront and the old mill site', route: 'work-side', note: 'Flat industrial land, warehouses and marine trades along the harbor. The cheap warehouse years are ending.' },
    { id: 'north-end', name: 'Birchwood, Cordata and Meridian', route: 'work-side', note: 'The mall, the two-year college and the big-box strip. Car country with garages and practice units.' }
  ],

  rooms: [
    { id: 'garden-basement', kind: 'HOUSE', hood: 'sehome', cap: 55, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A damp basement under a student rental on the hill. No cover, no address posted, and the landlord hears everything.' },
    { id: 'valley-house', kind: 'HOUSE', hood: 'happy-valley', cap: 40, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40],
      pressure: 55, note: 'A grown-up student house with a low living room. The neighbors have a short fuse.' },
    { id: 'north-garage', kind: 'HOUSE', hood: 'north-end', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45],
      pressure: 40, note: 'A parents\' garage on the north end. Far from everything, and nobody next door minds.' },
    { id: 'porch-yard', kind: 'OUTDOOR', hood: 'lettered', cap: 60, pa: .4, curfew: 1320, ac: false, sketch: 25, standing: [60, 55, 45],
      note: 'A backyard and porch on the flats. Summer evenings only; the rain decides.' },
    { id: 'commons', kind: 'DIY', hood: 'samish', cap: 80, rent: 30, pa: .4, curfew: 1380, ac: true, sketch: 40, standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'],
      note: 'A common room and parking lot at a student apartment block. Easy to get, and one complaint from losing it.' },
    { id: 'arts-basement', kind: 'DIY', hood: 'downtown', cap: 140, rent: 80, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 15, standing: [65, 65, 55], pressure: 40,
      note: 'The long-running arts space with a basement stage. All ages, and it runs workshops on scene safety.' },
    { id: 'mill-bay', kind: 'DIY', hood: 'waterfront', cap: 120, rent: 70, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse bay near the harbor, from before the redevelopment. One more fence and it is gone.' },
    { id: 'north-hall', kind: 'HALL', hood: 'north-end', cap: 120, rent: 120, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [60, 60, 65], owner: 'HALL_MANAGER',
      note: 'A rented hall off the north-end strip. Folding chairs and a list of rules.' },
    { id: 'records', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store on the downtown block. In-stores in the afternoon.' },
    { id: 'all-ages-room', kind: 'BAR', hood: 'downtown', cap: 220, soundFee: 60, pa: .8, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .4, sketch: 10,
      standing: [60, 65, 65], note: 'The student-run all-ages room in an old nightclub, with a 21+ corner for beer and wine. The legit option.' },
    { id: 'punk-bar', kind: 'BAR', hood: 'downtown', cap: 110, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A small 21+ club for punk and harder rock. Fine with a bill that draws drinkers.' },
    { id: 'taproom', kind: 'BAR', hood: 'fairhaven', cap: 100, soundFee: 40, pa: .5, ages: ['ALL', 'A21'], curfew: 1320, ac: true, following: .3, sketch: 5,
      standing: [50, 65, 75], note: 'A brewery with a patio stage. Folk and acoustic in summer; it wants an early night.' }
  ],

  contacts: ['olympia-wa'],

  weather: { preset: 'PACIFIC_NW', fineMonths: [6, 7, 8], coolMonths: [9] },

  calendar: [
    { id: 'relay', label: 'the relay race weekend', tag: 'race', month: 5, weeks: [4, 5], dows: [5, 6], can: [.88, .85, .85], hoods: ['downtown', 'fairhaven'], elsewhere: [.95, .93, .93] },
    { id: 'farewell', label: 'the end of the school year', tag: 'graduation', month: 6, weeks: [2, 3], dows: [3, 4, 5], can: [1.08, 1.02, 1] },
    { id: 'fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.92, .95, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving', label: 'Thanksgiving week', tag: 'holiday', month: 11, week: 4, dows: [2, 3], can: [.80, 1, 1] },
    { id: 'winter-break', label: 'winter break', tag: 'holiday', month: 12, weeks: [3, 5], dows: [3, 4, 5], can: [.75, .95, 1] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Vancouver', state: 'BC', lat: 49.28, lon: -123.12, pop: 2600000 },
    { name: 'Abbotsford', state: 'BC', lat: 49.05, lon: -122.31, pop: 160000 },
    { name: 'Everett', state: 'WA', lat: 47.98, lon: -122.20, pop: 110000 }
  ],
  roads: ['I-5', 'Chuckanut Drive', 'SR 539', 'Mount Baker Highway', 'SR 9', 'SR 20'],

  words: {
    street: ['Garden Street', 'High Street', 'Holly Street', 'Railroad Avenue', 'Bay Street', 'State Street', 'Samish Way', 'Chuckanut Drive', 'Meridian Street', 'Harris Avenue'],
    water: ['Bellingham Bay', 'Whatcom Creek', 'Lake Whatcom', 'Lummi Island', 'the Nooksack', 'Chuckanut Bay'],
    hood: ['Sehome', 'Happy Valley', 'Fairhaven', 'York', 'Columbia', 'Birchwood', 'Cordata', 'Samish', 'Lettered Streets', 'Alabama Hill', 'Whatcom Falls'],
    thing: ['moss', 'cedar', 'ferry', 'tide flat', 'raspberry', 'drive-through espresso', 'rain jacket', 'subaru', 'basement', 'bulkhead', 'group chat', 'bucket'],
    weather: ['drizzle', 'smoke haze', 'outflow wind', 'atmospheric river', 'marine layer'],
    surnames: ['Johnson', 'Olsen', 'Van Dyk', 'Nguyen', 'Garcia', 'Anderson', 'Kooiman', 'Sandhu']
  },

  events: [
    { id: 'BELLINGHAM_WA_RELAY_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The relay race is this weekend, and the town is already filling with teams.',
      title: 'The relay race has the town',
      body: 'Downtown and the village are jammed, nothing is open for parking within a mile, and half your crowd is working the course or at a team party.',
      options: [
        { id: 'EARLY', label: 'Open early and send people the back way', likely: 'Most get in before the traffic, but it starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors were an hour early, and the ones who came parked uphill and walked down.' },
        { id: 'AFTER', label: 'Run it as planned for the after-party crowd', likely: 'You get fewer regulars and a few strangers who want a party.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .01 }],
          result: 'A crowd of tired relay people drifted in around ten, and they stayed.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'BELLINGHAM_WA_FAREWELL_SETS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 6], months: [6] },
      telegraph: 'The quarter ends this week, and half the scene is packing a truck.',
      title: 'Everybody is leaving',
      body: 'The year is over. Half the bands on your list are playing their last show before they graduate and move away, and the basement is about to lose its whole house.',
      options: [
        { id: 'STACK', label: 'Stack the bill with farewell sets', likely: 'The floor is packed and a lot of people are feeling it, and the list will be shorter by fall.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.2 }, { op: 'REGULARS', pct: -.03 }],
          result: 'The room was full of people saying goodbye, and half of them are gone by Monday.' },
        { id: 'NORMAL', label: 'Keep the show as planned', likely: 'It\'s a fair night, and the bands leave anyway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.0 }],
          result: 'It was a normal night in a week that was anything but.' },
        { id: 'BENEFIT', label: 'Make it a send-off for the house', likely: 'It costs a little, and the leavers remember you.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'REGULARS', pct: .02 }],
          result: 'You covered the cups and the cake, and the leavers will tell people about you in other cities.' }
      ] },

    { id: 'BELLINGHAM_WA_SMOKE_SEASON', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [8, 9] },
      telegraph: 'There is a smoke haze creeping down from the north this week.',
      title: 'The sky is orange',
      body: 'Smoke from fires across the border has turned the afternoon dark and the air thick. Nobody wants to stand in a yard tonight.',
      options: [
        { id: 'INSIDE', label: 'Pack everyone into a basement', likely: 'It\'s smaller and louder, and the air indoors is not much better.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'The whole bill fit in a basement with a box fan and a lot of coughing.' },
        { id: 'MOVE', label: 'Move it a day, once the wind turns', likely: 'Breaks the date, which costs you trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the smoke had thinned by then.' },
        { id: 'MASKS', label: 'Hand out masks and play on', likely: 'It costs twenty dollars, and the crowd thins.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'It was a room of people in masks. The photos looked wild and the crowd was small.' }
      ] },

    { id: 'BELLINGHAM_WA_BAKER_CLOSED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], chokepoint: true, months: [11, 12, 1, 2, 3] },
      telegraph: 'A snowstorm is stacking up on the mountain.',
      title: 'The mountain road is shut',
      body: 'Snow has closed the highway to the ski towns. The kids from the upper valley are cut off, though the ski-bum band is already in town.',
      options: [
        { id: 'ACCEPT', label: 'Run it without the upper valley', likely: 'You lose the mountain kids and keep the rest.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road stayed closed, and the mountain kids watched the show on a phone.' },
        { id: 'EARLY', label: 'Move it an hour earlier so they can beat the plows', likely: 'Some make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .7, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'A truck full of mountain kids pulled in right behind the plow.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the road was open and the snow was gone by then.' }
      ] }
  ]
});
