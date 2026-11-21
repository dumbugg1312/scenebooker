SB.Cities.register('honolulu-hi', {
  v: 1,
  slug: 'honolulu-hi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of hawaii', 'uh manoa', 'hawaii pacific university', 'honolulu star-advertiser', 'star-advertiser', 'honolulu advertiser', 'honolulu weekly',
           'midweek', 'hawaii public radio', 'hpr', 'kitv', 'khon', 'kgmb', 'rainbow warriors', 'rainbow wahine', 'aloha stadium', 'pearl harbor',
           'joint base pearl harbor-hickam', 'hickam', 'schofield barracks', 'schofield', 'camp smith', 'us pacific fleet', 'pacific fleet', 'hawaiian airlines',
           'bank of hawaii', 'first hawaiian bank', 'aloha festivals', 'merrie monarch', 'honolulu marathon', 'pro bowl', 'hawaii state fair',
           'hawaiian electric', 'queens medical center', 'tripler', 'ala moana center', 'diamond head', 'iolani palace', 'bishop museum', 'don ho',
           'duke kahanamoku', 'spam musubi', 'foodland', 'zippys', 'longs drugs', 'north shore surf contest', 'vans triple crown', 'hawaii five-o'],
  blocklist: ['star-advertiser*', 'honolulu weekly*', 'aloha stadium*', 'zippys*', 'merrie monarch*', 'hawaiian airlines*'],

  blurb: ['A tiny, tight scene on a rock in the middle of the Pacific.',
          'Every visiting band is a miracle and every flight is a bill. Everyone has a day job, and shows start after shift.'],
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
      body: 'An accident and a slide have shut the road over the ridge. The windward kids and the drummer with the borrowed truck cannot get across.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the closure', likely: 'Most make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people on the other side of the ridge.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road never reopened in time. The windward side stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way around', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went the long way together. They will remember that.' }
      ] }
  ]
});
