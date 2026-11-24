SB.Cities.register('honolulu-hi', {
  v: 1,
  slug: 'honolulu-hi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of hawaii', 'uh manoa', 'hawaii pacific university', 'honolulu star-advertiser', 'star-advertiser', 'honolulu advertiser', 'honolulu weekly',
           'midweek', 'hawaii public radio', 'hpr', 'kitv', 'khon', 'kgmb', 'rainbow warriors', 'rainbow wahine', 'aloha stadium', 'pearl harbor',
           'joint base pearl harbor-hickam', 'hickam', 'schofield barracks', 'schofield', 'camp smith', 'us pacific fleet', 'pacific fleet', 'hawaiian airlines',
           'bank of hawaii', 'first hawaiian bank', 'aloha festivals', 'merrie monarch', 'honolulu marathon', 'pro bowl', 'hawaii state fair',
           'hawaiian electric', 'queens medical center', 'tripler', 'ala moana center', 'diamond head', 'iolani palace', 'bishop museum', 'don ho',
           'duke kahanamoku', 'spam musubi', 'foodland', 'zippys', 'longs drugs', 'north shore surf contest', 'vans triple crown', 'hawaii five-o',
           'honolulu festival', 'chinatown new year celebration', 'pow wow hawaii', 'king kamehameha celebration', 'king kamehameha day', 'floral parade', 'lei day',
           'mango jam', 'prince lot hula festival', 'honolulu pride', 'kapiolani park', 'magic island', 'hawaii news now', 'civil beat', 'honolulu magazine',
           'the garden island', 'manoa mirror', 'honolulu police department', 'honolulu liquor commission', 'bandsintown', 'jambase', 'kalakaua avenue',
           'daniel k. inouye airport'],
  blocklist: ['star-advertiser*', 'honolulu weekly*', 'aloha stadium*', 'zippys*', 'merrie monarch*', 'hawaiian airlines*'],

  blurb: ['A tiny, tight scene on a rock in the middle of the Pacific.',
          'Every visiting band is a miracle and every flight is a bill. Everyone has a day job, so shows start after shift.'],
  hard: 'Everything comes by plane, and the humid air carries every amp to the neighbors.',
  region: 'the islands',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 }
  ],

  weather: { preset: 'CALIFORNIA', rain: [.30, .28, .24, .18, .14, .10, .12, .12, .14, .20, .26, .30] },

  tilt: [
    { fan: 'pop-punk', band: 'pop-punk', d: .08, reason: 'Pop-punk sits at the center of nearly every bill.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Honolulu' },
    { id: 'kailua', kind: 'FEEDER', name: 'Kailua', minutes: 30, bearing: 45, beyond: 'pali-tunnels', note: 'A windward beach town. Kids drive over the Pali.' },
    { id: 'kaneohe', kind: 'FEEDER', name: 'Kaneohe', minutes: 25, bearing: 40, beyond: 'pali-tunnels', note: 'A windward suburb of garage bands.' },
    { id: 'pearl-city', kind: 'FEEDER', name: 'Pearl City', minutes: 25, bearing: 305, note: 'A suburb near the harbor.' },
    { id: 'kapolei', kind: 'FEEDER', name: 'Kapolei', minutes: 35, bearing: 270, note: 'A newer leeward suburb and a long commute west.' },
    { id: 'waipahu', kind: 'FEEDER', name: 'Waipahu', minutes: 25, bearing: 295, note: 'A working-class old plantation town.' },
    { id: 'mililani', kind: 'FEEDER', name: 'Mililani', minutes: 35, bearing: 320, note: 'A suburb in the middle of the island.' },
    { id: 'haleiwa', kind: 'FEEDER', name: 'Haleiwa', minutes: 60, bearing: 330, note: 'A north shore surf town.' }
  ],

  rooms: [
    { id: 'kaimuki-lanai', kind: 'HOUSE', hood: 'kaimuki', cap: 40, curfew: 1290, ac: false, outdoor: true, start: true, pressure: 55,
      note: 'A living room and a lanai on a hillside street. The humid air carries every chord to the neighbors, so the speakers stay low.' },
    { id: 'manoa-porch', kind: 'HOUSE', hood: 'manoa', cap: 50, curfew: 1290, ac: false, outdoor: true, pressure: 55,
      note: 'A student porch in a rainy valley. It moves indoors when the shower comes, and the walls are thin.' },
    { id: 'vintage-back', kind: 'SHOP', hood: 'moiliili', cap: 60, curfew: 1320, ac: true,
      note: 'The back room of a vintage shop that opened because there was nowhere all-ages. A small room that is only as safe as its landlord.' },
    { id: 'third-space', kind: 'DIY', hood: 'kakaako', cap: 120, ages: ['A18'], curfew: 1380, ac: true, pressure: 55,
      note: 'A rented room that is not a bar and has thrown a run of all-ages nights. The towers are crowding out rooms like it.' },
    { id: 'skatepark', kind: 'OUTDOOR', hood: 'kakaako', cap: 80, curfew: 1200, ac: false, outdoor: true,
      note: 'A generator show at the skatepark or on the beach. Over by eight, and a rain shower ends it early.' },
    { id: 'community-hall', kind: 'HALL', hood: 'kalihi', cap: 150, curfew: 1320, ac: true,
      note: 'A rented church or community hall for a benefit. It needs a permit and a sponsor.' },
    { id: 'hotel-bar', kind: 'BAR', hood: 'chinatown', cap: 100, curfew: 1530, ac: true, following: .3,
      note: 'A small bar with a stage in the middle of the scene. The owner lends nights to promoters, and teenagers and old heads share the floor.' },
    { id: 'side-club', kind: 'CLUB', hood: 'chinatown', cap: 250, ages: ['A18'], curfew: 1530, ac: true,
      note: 'A club that books punk and pop-punk, mostly eighteen-plus but never promised. Check the age on every date.' },
    { id: 'gallery-lounge', kind: 'BAR', hood: 'chinatown', cap: 120, curfew: 1500, ac: true,
      note: 'A gallery-lounge with a stage upstairs on a side street. Punk bills love it, and the building has had a rough year.' },
    { id: 'big-room', kind: 'BIG', hood: 'kakaako', cap: 1000, ages: ['A18'], curfew: 1380, ac: true,
      note: 'The island\'s biggest live room, for touring bands only. A local band opens only if a visitor brings it along.' }
  ],

  calendar: [
    { id: 'new-year-parade', label: 'the Chinatown new year parade', tag: 'parade', month: 2, week: 3, dows: [5], can: [.88, .85, .85], hoods: ['chinatown'], elsewhere: [1, .98, .98] },
    { id: 'mural-week', label: 'the mural festival week', tag: 'festival', month: 2, week: 2, dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['kakaako'], elsewhere: [1, 1, 1] },
    { id: 'waikiki-parade', label: 'the Waikiki culture parade', tag: 'parade', month: 3, week: 2, dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['waikiki'], elsewhere: [1, .97, .97] },
    { id: 'june-parade', label: 'the June street parade', tag: 'parade', month: 6, week: 2, dows: [4, 5], can: [.92, .88, .88] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 12, week: 2, dows: [5, 6], can: [.95, .92, .92], hoods: ['waikiki'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  chokepoints: [{ id: 'pali-tunnels', name: 'the Pali and the tunnels', p: .02 }],

  hoods: [
    { id: 'chinatown', name: 'Chinatown', route: 'downtown', note: 'Small bars and lounges on Hotel Street and Nuuanu that open their nights to promoters. The heart of the scene.' },
    { id: 'waikiki', name: 'Waikiki', route: 'downtown', note: 'The tourist strip. Big hotels and few local shows.' },
    { id: 'kaimuki', name: 'Kaimuki', route: 'old-side', note: 'A residential hill neighborhood with a history of all-ages coffeehouse nights.' },
    { id: 'kakaako', name: 'Kakaako', route: 'work-side', note: 'Warehouses and murals turning into towers. Rehearsal space is being pushed out.' },
    { id: 'kalihi', name: 'Kalihi', route: 'work-side', note: 'Industrial and working class. Cheap rooms for rehearsal.' },
    { id: 'aiea', name: 'Aiea and Pearl City', route: 'work-side', note: 'Suburbs by the harbor and the base. Commuter kids.' },
    { id: 'manoa', name: 'Manoa', route: 'campus', note: 'A wet green valley full of student houses.' },
    { id: 'moiliili', name: 'Moiliili', route: 'campus', note: 'Cheap apartments by the college, small shops and kids.' }
  ],

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 12800000 },
    { name: 'Tokyo', state: 'JP', lat: 35.68, lon: 139.69, pop: 37000000 },
    { name: 'Sydney', state: 'AU', lat: -33.87, lon: 151.21, pop: 5300000 }
  ],
  roads: ['H-1', 'H-2', 'H-3', 'Pali Highway', 'Likelike Highway'],

  words: {
    street: ['Hotel Street', 'King Street', 'Nuuanu', 'Kapiolani', 'Ala Moana', 'Kalakaua'],
    water: ['the Koolau', 'Ala Wai', 'Kaneohe Bay'],
    hood: ['Chinatown', 'Kakaako', 'Kaimuki', 'Manoa', 'Moiliili', 'Kalihi', 'Waikiki'],
    thing: ['shaka', 'slippahs', 'plate lunch', 'trade winds', 'borrowed truck', 'flight'],
    weather: ['trade winds', 'humidity', 'passing shower']
  },

  events: [
    { id: 'HONOLULU_HI_PALI_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the Pali this week, and a slide could close it.',
      title: 'The Pali is closed',
      body: 'An accident and a slide have shut the road over the ridge, so the windward kids and the drummer with the borrowed truck cannot get across.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the closure', likely: 'Most make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people on the other side of the ridge.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road never reopened in time, and the windward side stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way around', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads of people went the long way together.' }
      ] },
    { id: 'HONOLULU_HI_GEAR_HELD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'The visiting band says their amps are still at the airport.',
      title: 'The amps are held at the airport',
      body: 'The visiting band\'s gear is stuck at the airport, and every amp on the island is already borrowed. You have until six to find something that plugs in.',
      options: [
        { id: 'BORROW', label: 'Borrow amps from every local band', likely: 'It costs a little and an afternoon, but the show happens.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You went door to door in the rain, and three local bands lent you an amp each.' },
        { id: 'SHORT', label: 'Run a short set on what is already there', likely: 'It\'s a thin night, but the ones who come are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'There was one borrowed amp and a short, loose set, and the room was half full and warm.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the gear showed up by then.' }
      ] },

    { id: 'HONOLULU_HI_PARADE_CLOSURE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'A street parade will close Hotel Street on the afternoon of the show.',
      title: 'The parade has Hotel Street',
      body: 'A parade closes the street the same afternoon as your show, and the bar\'s load-in is a block-long walk through the drums.',
      options: [
        { id: 'EARLY', label: 'Load in early, before the barricades', likely: 'Most get in, but the start is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'The amps were in before the first drum, and you opened doors an hour early.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The street stayed shut, and half the list never found a place to leave the car.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'HONOLULU_HI_SHOWER_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], weather: 'RAIN' },
      telegraph: 'A heavy shower is coming off the mountains and the generator is out on the grass.',
      title: 'The shower floods the generator',
      body: 'A shower has soaked the skatepark and the generator is drowning. The only dry room on the island is the back of a shop.',
      options: [
        { id: 'SHOP', label: 'Move the bill to the shop back room', likely: 'It\'s smaller and earlier, and all ages.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'SHOP', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The shop took the whole bill, and the floor was packed.' },
        { id: 'MOVE', label: 'Move it a day, when it dries', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come, came.' },
        { id: 'ACCEPT', label: 'Play on under a tarp', likely: 'You get a small, wet crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'They stood under the tarp, wet to the ankle, and the ones who stayed won\'t forget it.' }
      ] }
  ]
});
