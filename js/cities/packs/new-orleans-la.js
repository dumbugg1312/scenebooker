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
           'tipitina\'s', 'maple leaf', 'bourbon street', 'bacchanal', 'cafe du monde',
           'southern decadence', 'creepy fest', 'french quarter festival', 'jazz and heritage festival', 'new orleans jazz and heritage festival', 'rave act',
           'new orleans police department', 'nopd', 'new orleans and company', 'loyola maroon', 'uptown messenger', 'wwltv', 'wwno', 'axios new orleans'],
  blocklist: ['times-picayune*', 'nola.com*', 'jazz fest*', 'voodoo fest*', 'tipitina*', 'preservation hall*', 'wwoz*', 'southern decadence*', 'creepy fest*', 'new orleans and company*'],

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

  contacts: ['baton-rouge-la', 'lafayette-la', 'mobile-al', 'slidell-la', 'gulfport-ms'],

  calendar: [
    { id: 'carnival', label: 'carnival season, the last week', tag: 'parade', month: 2, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.75, .70, .70], hoods: ['uptown', 'mid-city', 'carrollton'], elsewhere: [.88, .85, .85] },
    { id: 'quarter-fest', label: 'the free spring Quarter festival', tag: 'festival', month: 4, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.85, .80, .80], hoods: ['quarter', 'marigny'], elsewhere: [.95, .92, .92] },
    { id: 'spring-music', label: 'the big spring music festival', tag: 'festival', month: 4, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.85, .80, .80], hoods: ['mid-city'], elsewhere: [.93, .90, .90] },
    { id: 'heavy-weekend', label: 'the local heavy-music weekend', tag: 'festival', month: 7, week: 3, dows: [3, 4, 5], can: [1.05, 1.08, 1] },
    { id: 'pride-weekend', label: 'the late-summer pride weekend', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['quarter', 'marigny'], elsewhere: [.97, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 5], dows: [6], can: [.90, .95, .95], hoods: ['central-city', 'quarter'], elsewhere: [.97, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [6], can: [.90, .95, .95], hoods: ['central-city', 'quarter'], elsewhere: [.97, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1260, weekend: 1380, inForce: true } },

  chokepoints: [
    { id: 'river-bridge', name: 'the big river bridge', p: .02 },
    { id: 'lake-bridge', name: 'the Twin Span', p: .015 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'New Orleans' },
    { id: 'metairie', kind: 'FEEDER', name: 'Metairie', minutes: 15, bearing: 275, note: 'The big suburb to the west. Some bands, and kids come in.' },
    { id: 'chalmette', kind: 'FEEDER', name: 'Chalmette', minutes: 15, bearing: 110, scene: 60, note: 'Industrial and working class, east of the city.',
      rooms: [{ id: 'chalmette-house', kind: 'HOUSE', hood: 'chalmette', cap: 50, hostCut: 0, pa: .4, curfew: 1260, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 50],
      pressure: 40, note: 'An early-start house show east of the city, six o\'clock doors, for kids who cannot stay out.' }] },
    { id: 'gretna', kind: 'FEEDER', name: 'Gretna', minutes: 15, bearing: 215, beyond: 'river-bridge', scene: 60, note: 'West bank, working class. The bridge is the only way over.',
      rooms: [{ id: 'westbank-house', kind: 'HOUSE', hood: 'gretna', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 45, note: 'A kids\' house across the river. The bridge is the only way over, so nobody drops in.' }] },
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
    { id: 'gentilly', name: 'Gentilly and Lakeview', route: 'campus', note: 'Rebuilt after the flood. Quieter, with students and families.' },
    { id: 'gretna', name: 'the West Bank', route: 'town:gretna', note: 'Working-class streets across the river. The bridge is the only way over, and everyone on the other side knows it.' },
    { id: 'chalmette', name: 'Chalmette', route: 'town:chalmette', note: 'Small houses and refinery fences east of the city. Early shows for kids who cannot stay out.' }
  ],

  rooms: [
    { id: 'midcity-shotgun', kind: 'HOUSE', hood: 'mid-city', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, lowLying: true, sketch: 25, standing: [70, 55, 45],
      pressure: 50, start: true, note: 'A shotgun house with a living-room and yard set. The neighbors and the noise code are the threat, and there is a sump pump by the amp.' },
    { id: 'marigny-double', kind: 'HOUSE', hood: 'marigny', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, note: 'A double with a band in each half and a stage in the back room. Rents are rising and the people who live here are being pushed out.' },
    { id: 'claude-warehouse', kind: 'DIY', hood: 'st-claude', cap: 150, rent: 80, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A warehouse that is also an art space on a side street. Nobody has done a fire inspection and zoning is the threat.' },
    { id: 'ridge-hall', kind: 'HALL', hood: 'carrollton', cap: 200, rent: 300, deposit: 100, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A hall out on the ridge, all ages by rental. The hourly rate and the required police officer eat the door.' },
    { id: 'magazine-shop', kind: 'SHOP', hood: 'uptown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A record store on the tourist street. A free afternoon set between the racks, over by seven.' },
    { id: 'frenchmen-bar', kind: 'BAR', hood: 'marigny', cap: 100, soundFee: 40, pa: .6, ages: ['A18', 'A21'], curfew: 1560, ac: true, following: .3, sketch: 15, standing: [50, 65, 75],
      note: 'A back room with a PA, bands paid a share of the bar tab. The bar wants tourist money first.' },
    { id: 'claude-bar', kind: 'BAR', hood: 'st-claude', cap: 120, soundFee: 40, pa: .6, ages: ['A18', 'A21'], curfew: 1560, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A working-class bar on the avenue with a small stage. Free Saturday shows, with the bands paid.' },
    { id: 'avenue-club', kind: 'CLUB', hood: 'uptown', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, lowLying: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The step up from a bar, on the club strip. The better rooms keep closing or selling.' },
    { id: 'warehouse-hall', kind: 'BIG', hood: 'central-city', cap: 900, rent: 1800, deposit: 500, pa: .95, ages: ['A18'], curfew: 1380, ac: true, sketch: 5, standing: [40, 65, 70],
      notice: 84, note: 'A big hall for touring bands. It books the touring crowd before the locals.' }
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
      ] },

    { id: 'NEW_ORLEANS_LA_CARNIVAL_LOADOUT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'It is the last week of carnival and every avenue is a parade route.',
      title: 'The van cannot cross the route',
      body: 'Every street the band needs is roped off for the night parades. The load-in waits until after midnight, and the crowd is out watching floats.',
      options: [
        { id: 'LATE', label: 'Push doors back until the parades are done', likely: 'A very late night. The crowd that stays is loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors at eleven. The people who came in off the route were tired and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Most of the list is stuck behind a float.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The band got through at ten. The room was nearly empty and then it was not.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'NEW_ORLEANS_LA_TOURIST_BACKROOM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The hotels are full and the bar is crawling with people who ask where the real music is.',
      title: 'A tourist wants the real thing',
      body: 'A man in a festival wristband wandered into the back room asking where the real music is. He is buying drinks for the whole bar and his friends are outside.',
      options: [
        { id: 'WELCOME', label: 'Let them in and put the merch out', likely: 'A bigger crowd and a big merch night, but not the usual one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The merch table sold out to people who had never heard of any of it. The regulars stood in the back.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The tourists wander in and out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'He stayed for two bands and bought a shirt. The night went the way it was going to.' }
      ] }
  ]
});
