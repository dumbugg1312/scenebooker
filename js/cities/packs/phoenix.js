SB.Cities.register('phoenix', {
  v: 1,
  slug: 'phoenix',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['arizona state university', 'asu', 'sun devils', 'grand canyon university', 'gcu', 'northern arizona university', 'nau', 'the arizona republic',
           'azcentral', 'phoenix new times', 'state press', 'kjzz', 'ktar', 'kpnx', 'abc15', 'kslx', 'phoenix suns', 'arizona diamondbacks', 'arizona cardinals',
           'arizona coyotes', 'phoenix mercury', 'mlb spring training', 'super bowl', 'waste management phoenix open', 'phoenix open', 'arizona state fair',
           'first friday', 'tempe festival of the arts', 'luke air force base', 'intel', 'banner health', 'honeywell', 'state farm', 'phoenix sky harbor',
           'sky harbor', 'salt river project', 'srp', 'apache gold', 'hurricane hilary', 'monsoon season', 'roosevelt row', 'valley metro', 'footprint center',
           'chase field', 'mill avenue merchants', 'rhythm room', 'crescent ballroom', 'valley bar', 'club red', 'the nile theater', 'hail mary', 'lost leaf'],
  /* "The state university", "the air base", "the light rail", "the spring training crowd". Tempe, Mesa and the rest are places and are used as places. */
  blocklist: ['rhythm room*', 'crescent ballroom*', 'valley bar*', 'club red*', 'arizona republic*', 'phoenix new times*', 'luke air force*', 'sky harbor*'],

  blurb: ['A huge desert grid where punk lives in rental houses in Tempe and warehouse units downtown. The scene is spread over a dozen small clusters, each with its own crowd and its own police.',
          'Rooms come and go as the rent rises, a few collectives keep all-ages alive, and the summer heat empties the shows.'],
  hard: 'Sprawl, 110-degree summers and rooms that close when the rent goes up.',
  region: 'the Southwest',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Phoenix' },
    { id: 'scottsdale', kind: 'FEEDER', name: 'Scottsdale', minutes: 20, bearing: 60, note: 'Rich, with little DIY. Some kids drive down to Tempe.' },
    { id: 'glendale', kind: 'FEEDER', name: 'Glendale', minutes: 20, bearing: 305, note: 'A west-side suburb with teen bands and a few rooms.' },
    { id: 'mesa', kind: 'FEEDER', name: 'Mesa', minutes: 25, bearing: 100, beyond: 'river-bridges', note: 'A huge suburb. Kids and bands come in, and it has its own heavy history.' },
    { id: 'peoria', kind: 'FEEDER', name: 'Peoria', minutes: 25, bearing: 315, note: 'Northwest sprawl. Kids need rides.' },
    { id: 'chandler', kind: 'FEEDER', name: 'Chandler', minutes: 30, bearing: 125, beyond: 'river-bridges', note: 'A tech-job suburb with garage bands.' },
    { id: 'gilbert', kind: 'FEEDER', name: 'Gilbert', minutes: 30, bearing: 115, beyond: 'river-bridges', note: 'A family suburb. Church-hall and garage shows.' },
    { id: 'surprise', kind: 'FEEDER', name: 'Surprise', minutes: 35, bearing: 310, note: 'Retirement-and-new-build sprawl. Rare.' },
    { id: 'apache-junction', kind: 'FEEDER', name: 'Apache Junction', minutes: 40, bearing: 100, beyond: 'river-bridges', note: 'A desert-edge town with trailer parks and a few bands.' },
    { id: 'casa-grande', kind: 'FEEDER', name: 'Casa Grande', minutes: 45, bearing: 175, note: 'A farm town on the interstate. One or two bands.' },
    { id: 'tucson', kind: 'PEER', name: 'Tucson', minutes: 100, bearing: 140, slug: 'tucson', note: 'Smaller and scrappier, where rooms close often.' },
    { id: 'prescott', kind: 'PEER', name: 'Prescott', minutes: 100, bearing: 340, note: 'A small old mining-town scene.' },
    { id: 'flagstaff', kind: 'PEER', name: 'Flagstaff', minutes: 140, bearing: 0, slug: 'flagstaff-az', note: 'A mountain college town with a small scene.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the river bridges and the I-10 tunnel', p: .03 }],

  hoods: [
    { id: 'downtown', name: 'downtown and the arts district', route: 'downtown', note: 'Bars, galleries and old warehouse blocks. Rooms squeezed by development.' },
    { id: 'grand-ave', name: 'Grand Avenue', route: 'old-side', note: 'A diagonal old railroad road of warehouses, auto shops and art spaces. Cheap units and one-off venues.' },
    { id: 'garfield', name: 'Garfield, Coronado and Willo', route: 'old-side', note: 'Old bungalows north and east of downtown. House shows and gentrification.' },
    { id: 'melrose', name: 'Melrose and Uptown', route: 'old-side', note: 'A strip of vintage shops, bars and apartments. An older punk crowd.' },
    { id: 'south-phoenix', name: 'South Phoenix', route: 'work-side', note: 'A Latino working-class neighborhood south of the river. Cheap warehouses and backyard parties.' },
    { id: 'maryvale', name: 'Maryvale and the west side', route: 'work-side', note: 'Tract houses and strip malls. Many teen bands start in garages here.' },
    { id: 'sunnyslope', name: 'North Phoenix and Sunnyslope', route: 'work-side', note: 'Cheap commercial units and old apartments. A DIY room grew here from backyard shows.' },
    { id: 'tempe', name: 'Tempe', route: 'campus', note: 'Dense rental houses full of students. The center of the house-show scene.' },
    { id: 'east-valley', name: 'Mesa, Chandler and Gilbert', route: 'campus', note: 'Newer suburban sprawl. Garages, church halls and teen bands.' }
  ],

  contacts: ['tucson', 'flagstaff-az', 'el-paso-tx'],

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 12800000 },
    { name: 'Gila Bend', state: 'AZ', lat: 32.94, lon: -112.72, pop: 1900 },
    { name: 'Yuma', state: 'AZ', lat: 32.69, lon: -114.63, pop: 200000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2400000 }
  ],
  roads: ['I-10', 'I-17', 'Loop 101', 'Loop 202', 'Grand Avenue', 'Camelback Road'],

  words: {
    street: ['Central Avenue', 'Camelback Road', 'McDowell Road', 'Indian School Road', 'Mill Avenue', 'Apache Boulevard', 'Grand Avenue', 'Van Buren'],
    water: ['the Salt River', 'the canal', 'Tempe Town Lake'],
    hood: ['Garfield', 'Coronado', 'Willo', 'Melrose', 'Maryvale', 'Sunnyslope', 'South Phoenix', 'Tempe', 'Chandler', 'Gilbert'],
    thing: ['haboob', 'swamp cooler', 'canal', 'monsoon', 'mister', 'cinder-block fence', 'orange tree', 'light rail'],
    weather: ['dust storm', 'monsoon storm', 'heat advisory']
  },

  events: [
    { id: 'PHOENIX_HABOOB', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [7, 8, 9] },
      telegraph: 'The storms are building over the mountains south of town.',
      title: 'A haboob turns the sky brown',
      body: 'A wall of dust a mile high rolled in at sunset. The yard is brown, the PA is full of grit and the host is hosing down the amps.',
      options: [
        { id: 'INSIDE', label: 'Move everything into the living room', likely: 'Smaller and sweatier. The crowd shrinks to the ones who made it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Everyone crammed into the living room with the windows taped shut and the amps wrapped in towels.' },
        { id: 'WAIT', label: 'Wait for the dust to settle and push doors late', likely: 'The ones who wanted to come stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The air cleared by nine. The crowd came in coughing and loved it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'PHOENIX_TUNNEL_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The interstate through downtown is on the overnight closure list.',
      title: 'The interstate is shut at the river',
      body: 'A wreck at the tunnel has the whole freeway down. The east valley kids and the bands from Mesa are on the wrong side of the river.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The freeway never cleared. The east side stayed home.' },
        { id: 'RAIL', label: 'Tell everyone to take the light rail', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'A train full of kids with guitar cases. The last one home at midnight.' }
      ] }
  ]
});
