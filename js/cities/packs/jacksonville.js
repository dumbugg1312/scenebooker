SB.Cities.register('jacksonville', {
  v: 1,
  slug: 'jacksonville',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['jacksonville university', 'university of north florida', 'unf', 'florida state college at jacksonville', 'fscj', 'edward waters university',
           'jacksonville jaguars', 'jumbo shrimp', 'jacksonville sharks', 'icemen', 'jacksonville sheriff\'s office', 'jso', 'jacksonville fire rescue',
           'naval air station jacksonville', 'nas jax', 'naval station mayport', 'mayport', 'kings bay', 'blount island', 'jaxport', 'florida times-union',
           'times-union', 'folio weekly', 'jax today', 'wjct', 'wjxt', 'wtlv', 'wjax', 'the players championship', 'tpc sawgrass', 'gate river run',
           'jacksonville jazz festival', 'florida-georgia game', 'daytona 500', 'hurricane irma', 'hurricane matthew', 'hurricane dora', 'tropical storm fay',
           'mayo clinic', 'baptist health', 'csx', 'fidelity national', 'florida blue', 'everbank', 'tiaa bank field', 'publix', 'waffle house', 'amtrak'],
  blocklist: ['folio weekly*', 'times-union*', 'jacksonville jumbo shrimp*', 'jaxport*', 'gate river run*', 'florida blue*'],

  blurb: ['A sprawling river city where hardcore keeps getting kicked out of rooms and rebuilding anyway.',
          'The kids drive an hour to a show, and the vans cross a bridge to get there.'],
  hard: 'Fire code and distance: a room can close overnight and nothing is near anything.',
  region: 'the Southeast',
  whereGo: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A rebuilt hardcore room and a long memory of the eighties.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Jacksonville' },
    { id: 'orange-park', kind: 'FEEDER', name: 'Orange Park', minutes: 20, bearing: 195, beyond: 'river-bridges', note: 'Suburban, across the river. Kids drive in.' },
    { id: 'ponte-vedra', kind: 'FEEDER', name: 'Ponte Vedra', minutes: 30, bearing: 120, note: 'A beach suburb. Few kids go to hardcore shows.' },
    { id: 'green-cove', kind: 'FEEDER', name: 'Green Cove Springs', minutes: 35, bearing: 195, beyond: 'river-bridges', note: 'The rural edge of the next county over.' },
    { id: 'fernandina', kind: 'FEEDER', name: 'Fernandina Beach', minutes: 40, bearing: 25, note: 'An island town with a few bands and a small crowd.' },
    { id: 'kingsland', kind: 'FEEDER', name: 'Kingsland', state: 'GA', minutes: 40, bearing: 335, note: 'Across the state line, near the sub base.' },
    { id: 'st-augustine', kind: 'FEEDER', name: 'St. Augustine', minutes: 45, bearing: 155, note: 'A tourist town with a college crowd and some bands.' },
    { id: 'palatka', kind: 'FEEDER', name: 'Palatka', minutes: 60, bearing: 190, beyond: 'river-bridges', note: 'A small river town with a few kids.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 90, bearing: 215, slug: 'gainesville-fl', note: 'A long-running scene where bands trade dates.' },
    { id: 'savannah', kind: 'PEER', name: 'Savannah', state: 'GA', minutes: 140, bearing: 340, slug: 'savannah-ga', note: 'A similar-size scene up I-95.' }
  ],
  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges', p: .03 }
  ],

  hoods: [
    { id: 'murray-hill', name: 'Murray Hill', route: 'old-side', note: 'Small bungalows and a main drag of old storefronts. A hardcore room reopened here after a fire-permit closure.' },
    { id: 'riverside', name: 'Riverside and Avondale', route: 'old-side', note: 'The oldest arty district: big old houses, bars and a historic strip. It has lost rooms that took hardcore.' },
    { id: 'five-points', name: 'Five Points', route: 'old-side', note: 'Vintage shops, cheap bars and tattoo shops. It lost a punk-friendly bar too.' },
    { id: 'downtown', name: 'downtown and the Northbank', route: 'downtown', note: 'Mostly empty after office hours. Stadium nights and a few bars.' },
    { id: 'springfield', name: 'Springfield', route: 'old-side', note: 'Old houses coming back. Cheap rent for house shows.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Warehouses, strip malls and cheap square footage.' },
    { id: 'arlington', name: 'Arlington', route: 'campus', note: 'East-side sprawl with young families and renters.' },
    { id: 'northside', name: 'the Northside', route: 'work-side', note: 'Port, airport and industrial yards. Far from everything.' },
    { id: 'the-beaches', name: 'the beaches', route: 'downtown', note: 'Surf, bars and beach rentals. A different crowd, and a ride out.' }
  ],

  contacts: ['gainesville-fl', 'savannah-ga', 'orlando'],
  points: [
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 307000 },
    { name: 'Tallahassee', state: 'FL', lat: 30.44, lon: -84.28, pop: 200000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Daytona Beach', state: 'FL', lat: 29.21, lon: -81.02, pop: 80000 }
  ],
  roads: ['I-95', 'I-10', 'I-295', 'Beach Boulevard', 'Atlantic Boulevard', 'Philips Highway'],

  words: {
    street: ['Beach Boulevard', 'Atlantic Boulevard', 'Philips Highway', 'Roosevelt Boulevard', 'San Jose Boulevard', 'Park Street'],
    water: ['the St. Johns', 'the river', 'the Intracoastal'],
    hood: ['Murray Hill', 'Riverside', 'Avondale', 'Five Points', 'Springfield', 'San Marco', 'Arlington'],
    thing: ['bridge', 'humidity', 'storage unit', 'fire code', 'river barge'],
    weather: ['afternoon thunderstorm', 'storm watch']
  },

  events: [
    { id: 'JACKSONVILLE_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A ship is due under the bridge the afternoon of your show, and the crews are working on the approach.',
      title: 'The bridge is up',
      body: 'A wreck and a ship have the river bridges tied up the night of your show. Everyone coming from the other bank is sitting in traffic.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared. The ones on the far bank stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went the long way round together. They will remember that.' }
      ] }
  ]
});
