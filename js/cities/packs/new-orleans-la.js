SB.Cities.register('new-orleans-la', {
  v: 1,
  slug: 'new-orleans-la',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of new orleans', 'uno', 'tulane university', 'tulane', 'loyola university new orleans', 'xavier university of louisiana', 'dillard university',
           'southern university at new orleans', 'delgado community college', 'louisiana state university', 'lsu', 'times-picayune', 'the times-picayune', 'nola.com',
           'the advocate', 'gambit', 'offbeat', 'wwoz', 'wwl', 'wdsu', 'wgno', 'wvue', 'new orleans saints', 'new orleans saints', 'new orleans pelicans', 'new orleans breakers',
           'new orleans baby cakes', 'zephyrs', 'caesars superdome', 'superdome', 'smoothie king center', 'krewe', 'jazz fest', 'essence festival', 'voodoo fest',
           'french quarter fest', 'sugar bowl', 'hurricane katrina', 'katrina', 'hurricane ida', 'hurricane gustav', 'gustav', 'hurricane isaac', 'entergy',
           'chevron', 'port of new orleans', 'naval air station joint reserve base', 'naval support activity', 'ochsner', 'harrah\'s', 'preservation hall',
           'tipitina\'s', 'maple leaf', 'bourbon street', 'bacchanal', 'cafe du monde'],
  blocklist: ['times-picayune*', 'nola.com*', 'jazz fest*', 'voodoo fest*', 'tipitina*', 'preservation hall*', 'wwoz*'],

  blurb: ['A humid, flood-scarred port town where crust and sludge play warehouses and punk houses.',
          'Music is everywhere here and it is the famous kind. Punk lives in the gaps: back rooms, backyards, a shotgun double with a band in each half.'],
  hard: 'Storm season, zoning, and a city that books the tourists first.',
  region: 'the Gulf',
  whereGo: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 }
  ],

  tilt: [
    { fan: 'crust', band: 'crust', d: .08, reason: 'Crust and sludge are the stand-out sound in this town.' }
  ],

  chokepoints: [
    { id: 'river-bridge', name: 'the big river bridge', p: .02 },
    { id: 'lake-bridge', name: 'the Twin Span', p: .015 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'New Orleans' },
    { id: 'metairie', kind: 'FEEDER', name: 'Metairie', minutes: 15, bearing: 275, note: 'The big suburb to the west. Some bands, and kids come in.' },
    { id: 'chalmette', kind: 'FEEDER', name: 'Chalmette', minutes: 15, bearing: 110, note: 'Industrial and working class, east of the city.' },
    { id: 'gretna', kind: 'FEEDER', name: 'Gretna', minutes: 15, bearing: 215, beyond: 'river-bridge', note: 'West bank, working class. The bridge is the only way over.' },
    { id: 'kenner', kind: 'FEEDER', name: 'Kenner', minutes: 20, bearing: 285, note: 'The airport suburb. A few bands.' },
    { id: 'slidell', kind: 'FEEDER', name: 'Slidell', minutes: 40, bearing: 55, beyond: 'lake-bridge', note: 'Across the lake on the north shore. Kids drive in.' },
    { id: 'mandeville', kind: 'FEEDER', name: 'Mandeville', minutes: 40, bearing: 340, beyond: 'lake-bridge', note: 'North shore suburb. Kids and band members.' },
    { id: 'hammond', kind: 'FEEDER', name: 'Hammond', minutes: 60, bearing: 320, note: 'A college town with house shows.' },
    { id: 'houma', kind: 'FEEDER', name: 'Houma', minutes: 70, bearing: 235, beyond: 'river-bridge', note: 'A bayou town. Metal and sludge.', lean: ['metal'] },
    { id: 'baton-rouge', kind: 'PEER', name: 'Baton Rouge', minutes: 80, bearing: 305, slug: 'baton-rouge-la', note: 'A university city with its own scene.' },
    { id: 'lafayette', kind: 'PEER', name: 'Lafayette', minutes: 135, bearing: 270, slug: 'lafayette-la', note: 'Acadiana. A friendly scene.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 140, bearing: 85, slug: 'mobile-al', note: 'A small port and a fill date.' }
  ],

  hoods: [
    { id: 'marigny', name: 'the Marigny and Bywater', route: 'old-side', note: 'Colorful shotgun rows east of the Quarter. Artists, bartenders, back rooms and a few warehouses.' },
    { id: 'quarter', name: 'the French Quarter', route: 'downtown', note: 'Tourist bars and a few old dives with a punk past. Locals work here more than they play here.' },
    { id: 'mid-city', name: 'Mid-City', route: 'old-side', note: 'Shotgun houses and bayou side streets. The punk house district.' },
    { id: 'central-city', name: 'Central City', route: 'work-side', note: 'Cheap, old and industrial, with churches and arts warehouses.' },
    { id: 'st-claude', name: 'the St. Claude corridor', route: 'work-side', note: 'An artsy industrial stretch of galleries, warehouses and a DIY art space.' },
    { id: 'uptown', name: 'Uptown and the avenues', route: 'campus', note: 'Big oaks, students and a venue strip along the avenues.' },
    { id: 'carrollton', name: 'Carrollton', route: 'campus', note: 'An old neighborhood at the river bend. Students and bars.' },
    { id: 'gentilly', name: 'Gentilly and Lakeview', route: 'campus', note: 'Rebuilt after the flood. Quieter, with students and families.' }
  ],

  points: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7500000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Jackson', state: 'MS', lat: 32.3, lon: -90.18, pop: 330000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 }
  ],
  roads: ['I-10', 'I-610', 'I-310', 'US 90', 'St. Claude Avenue', 'Claiborne Avenue'],

  words: {
    street: ['St. Claude Avenue', 'Claiborne Avenue', 'St. Charles Avenue', 'Esplanade Avenue', 'Magazine Street', 'Elysian Fields'],
    water: ['Lake Pontchartrain', 'the Mississippi', 'Bayou St. John', 'the canal'],
    hood: ['Bywater', 'the Marigny', 'Mid-City', 'Central City', 'Carrollton', 'Gentilly', 'Lakeview', 'Metairie'],
    thing: ['shotgun', 'levee', 'parade', 'sump pump', 'second line', 'box fan', 'beads', 'mosquito truck'],
    weather: ['afternoon thunderstorm', 'storm watch', 'standing water']
  },

  events: [
    { id: 'NEW_ORLEANS_LA_SECOND_LINE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [1, 2, 3, 4, 5] },
      telegraph: 'A parade is rolling through the neighborhood on show day.',
      title: 'The van is stuck behind a parade',
      body: 'A parade has the main street shut for six blocks, and the band and half the list are on the wrong side of it. Brass is playing under the overpass.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone to come by the back streets', likely: 'Most get through before the route closes. A thinner start.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. Most took the back streets and some walked in with beads on.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Many give up and join the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The parade went on for hours. The room filled up after it ended.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'NEW_ORLEANS_LA_STREETS_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'A slow storm is parked over the city and the pumps are behind.',
      title: 'The street is a river',
      body: 'Two inches in an hour and the low blocks are under. The sump pump in the corner is running and the load-in door is ankle deep.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'HIGH', label: 'Move it to a house on high ground', likely: 'Smaller and louder, with a wall of neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A double on the ridge took the whole bill, and the floor was packed.' },
        { id: 'SANDBAG', label: 'Sandbag the door and play on', likely: 'Costs forty dollars. The crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed on the street. The room was half full and wet to the ankle.' }
      ] }
  ]
});
