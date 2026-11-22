SB.Cities.register('brownsville-tx', {
  v: 1,
  slug: 'brownsville-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['utrgv', 'university of texas rio grande valley', 'texas southmost college', 'tsc', 'spacex', 'starbase', 'port of brownsville',
           'border patrol', 'tabc', 'charro days', 'sombrero festival', 'latin jazz festival', 'brownsville herald', 'monitor and valley morning star',
           'valley morning star', 'the rider', 'kurv', 'kvns', 'kveo', 'brownsville metro', 'whataburger', 'taco palenque', 'topo chico', 'jarritos',
           'tecate', 'knights of columbus', 'vfw', 'sunrise mall', 'texas a&m-kingsville', 'texas state', 'utsa', 'ut austin', 'winter texans',
           'salon la ceiba', 'cotton compress annex', 'casa cuatro esquinas', 'resaca roller palace', 'boca chica lodge', 'taller tres equis',
           'shrimp basin social club', 'elizabeth street dry goods', 'papa rafa\'s carport', 'southmost sign shop', 'ebony tree hall', 'salon tamaulipas',
           'midtown entertainment district', 'pablo kisel', 'charro days fiesta', 'charro days inc', 'bisd', 'brownsville independent school district',
           'illuminated night parade', 'grand international parade', 'amigoland mall', 'itec center', 'historic alonso building', 'kgrv', 'krgv',
           'myrgv', 'texas monthly', 'austin chronicle', 'remezcla', 'songkick', 'bandsintown', 'jambase', 'reverbnation', 'brownsville police department',
           'cameron county sheriff', 'port isabel lighthouse', 'padre island causeway'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['utrgv*', 'spacex*', 'starbase*', 'charro days*', 'brownsville herald*', 'whataburger*', 'taco palenque*', 'sombrero festival*'],

  blurb: ['One promoter, a few friend groups, and a Valley of kids who drive an hour for a show, with punk, metal and indie on one bill.',
          'Rooms open, last a couple of years and close. Heat and fear of enforcement can empty a night.'],
  hard: 'Few stable rooms; the scene depends on one or two organizers.',
  region: 'the Valley',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Brownsville' },
    { id: 'matamoros', kind: 'FEEDER', name: 'Matamoros', state: 'TAM', minutes: 25, bearing: 175, scene: 200, note: 'Across the bridge: its own rock, metal and punk crowd, held back by papers and bridge lines.',
      rooms: [
      { id: 'matamoros-theater', kind: 'BIG', hood: 'matamoros-hall', zone: 'matamoros', cap: 600, curfew: 1380, ac: true,
      note: 'A big hall on the Mexican side. You need papers, a bridge line and a crowd willing to wait for both.' }
      ] },
    { id: 'los-fresnos', kind: 'FEEDER', name: 'Los Fresnos', minutes: 20, bearing: 40, pop: 8000, note: 'A commuter and school town. Teen bands, no real room.' },
    { id: 'san-benito', kind: 'FEEDER', name: 'San Benito', minutes: 25, bearing: 330, pop: 24000, note: 'A farm and conjunto town up the highway.' },
    { id: 'harlingen', kind: 'FEEDER', name: 'Harlingen', minutes: 30, bearing: 335, pop: 70000, note: 'The crowd-sharing neighbor up the expressway, with a small scene of its own.' },
    { id: 'port-isabel', kind: 'FEEDER', name: 'Port Isabel', minutes: 30, bearing: 70, note: 'A small fishing and lighthouse town on the bay.' },
    { id: 'la-feria', kind: 'FEEDER', name: 'La Feria and Rio Hondo', minutes: 35, bearing: 325, note: 'Farm towns where kids carpool in.' },
    { id: 'south-padre', kind: 'FEEDER', name: 'South Padre Island', minutes: 40, bearing: 65, note: 'A beach resort with a tourist rock-bar economy, and few local punks.', beyond: 'causeway', season: { months: [3, 4, 5, 6, 7], mul: 1.5 } },
    { id: 'raymondville', kind: 'FEEDER', name: 'Raymondville', minutes: 55, bearing: 340, note: 'A small farm town.' },
    { id: 'mcallen', kind: 'PEER', name: 'McAllen and Edinburg', state: 'TX', minutes: 65, bearing: 295, scene: 1500, note: 'The big Valley cluster: more rooms, more bands, and the campus up the road.' },
    { id: 'corpus-christi', kind: 'PEER', name: 'Corpus Christi', state: 'TX', minutes: 165, bearing: 350, slug: 'corpus-christi-tx', note: 'The first big stop north out of the Valley.' }
  ],

  chokepoints: [{ id: 'causeway', name: 'the Island causeway', p: .02 }],

  hoods: [
    { id: 'downtown', name: 'downtown Brownsville', route: 'downtown', note: 'Old masonry storefronts and upstairs rooms by the bridge: busy with shoppers by day, empty at night, slowly restored and still cheap.' },
    { id: 'campus', name: 'the old fort and campus district', route: 'campus', note: 'The college grounds beside a resaca and big old houses along Palm Boulevard. Student halls and rented houses; empties in summer.' },
    { id: 'southmost', name: 'Southmost', route: 'old-side', note: 'Single-story houses with fenced yards and carports along the levee. Cheap and ignored, with heavy policing.' },
    { id: 'expressway', name: 'the Expressway and Boca Chica strip', route: 'work-side', note: 'Strip malls, chain restaurants and bars with weekend bands. Restaurant back rooms; commercial rents rising.' },
    { id: 'port-road', name: 'the port road east', route: 'work-side', note: 'Warehouses and shrimp boats, then wetland and beach. Room to be loud, but the road closes on launch days.' },
    { id: 'north-side', name: 'north Brownsville', route: 'campus', note: 'Slab-built subdivisions and big-box stores. Family driveways and garages, hostile to noise.' },
    { id: 'military-highway', name: 'Military Highway and the west edge', route: 'old-side', note: 'Mobile homes and big yards with few neighbors. Yard shows, far from everything and rough on roads.' },
    { id: 'night-strip', name: 'the late-night entertainment strip', route: 'downtown', note: 'A bar-and-club boulevard under a late-night ordinance: cameras, ID scanners and code inspectors. Busy, and one bad inspection from dark.' },
    { id: 'matamoros-hall', name: 'across the bridge in Matamoros', route: 'town:matamoros', note: 'Big halls on the Mexican side, reachable only with papers and a long bridge line.' }
  ],

  rooms: [
    { id: 'southmost-carport', kind: 'HOUSE', hood: 'southmost', cap: 60, curfew: 1350, ac: false, outdoor: true, start: true,
      note: 'A carport and fenced yard behind a single-story house, a borrowed PA and a box fan. One noise call and the night is over.' },
    { id: 'west-yard', kind: 'HOUSE', hood: 'military-highway', cap: 80, curfew: 1440, ac: false, outdoor: true, sketch: 30,
      note: 'A big yard among mobile homes, far from any neighbor and from everything else. Only distance protects it, and the heat makes it a night-only room.' },
    { id: 'warehouse', kind: 'DIY', hood: 'downtown', cap: 150, curfew: 1380, ac: false, pressure: 60,
      note: 'An old masonry space downtown, the best kind of room and the shortest-lived. Rent, occupancy rules and a landlord who wants insurance all come for it.' },
    { id: 'north-hall', kind: 'HALL', hood: 'north-side', cap: 200, curfew: 1320, ac: true,
      note: 'A rented hall near the subdivisions. Sober and legal, but one rowdy night gets it shut.' },
    { id: 'campus-hall', kind: 'HALL', hood: 'campus', cap: 120, curfew: 1320, ac: true,
      note: 'A student hall near the college grounds. It empties when the term is out, and the administration has a short patience.' },
    { id: 'storefront-shop', kind: 'SHOP', hood: 'downtown', cap: 50, curfew: 1260, ac: true,
      note: 'A shop that clears its floor for an afternoon set. Small and over by nine, which is why nobody bothers it.' },
    { id: 'dive-bar', kind: 'BAR', hood: 'downtown', cap: 120, curfew: 1500, ac: true,
      note: 'A dive by the main drag that books whatever rock, metal or punk fills a weekend. The owner leans toward whatever sells drinks.' },
    { id: 'expressway-bar', kind: 'BAR', hood: 'expressway', cap: 150, curfew: 1500, ac: true,
      note: 'A strip-mall bar with a weekend band. The commercial rent keeps climbing.' },
    { id: 'strip-club', kind: 'CLUB', hood: 'night-strip', cap: 300, curfew: 1560, ac: true, pressure: 60,
      note: 'A club on the entertainment strip, with cameras, ID scanners and a two-in-the-morning line. Several of its neighbors just lost their certificates.' },
    { id: 'port-lot', kind: 'OUTDOOR', hood: 'port-road', cap: 100, curfew: 1380, outdoor: true, lowLying: true,
      note: 'Open ground by the warehouses and wetland, room to be loud. The road closes on launch days.' }
  ],

  contacts: ['corpus-christi-tx', 'mcallen-tx', 'laredo-tx', 'san-antonio'],

  calendar: [
    { id: 'fiesta-parades', label: 'the two-nation fiesta parades', tag: 'parade', month: 2, week: 4, dows: [3, 4, 5], can: [.85, .80, .75], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'carnival', label: 'the downtown carnival weekend', tag: 'festival', month: 3, week: 1, dows: [4, 5, 6], can: [.92, .90, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'jazz-weekend', label: 'the downtown jazz weekend', tag: 'festival', month: 10, week: 1, dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'Friday night football', tag: 'game', month: 9, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'Friday night football', tag: 'game', month: 10, weeks: [1, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1440 },

  points: [
    { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23, pop: 140000 },
    { name: 'Harlingen', state: 'TX', lat: 26.19, lon: -97.7, pop: 70000 },
    { name: 'Kingsville', state: 'TX', lat: 27.52, lon: -97.86, pop: 25000 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 1500000 },
    { name: 'Monterrey', state: 'NL', lat: 25.69, lon: -100.32, pop: 1100000 }
  ],
  roads: ['I-69E', 'US 77', 'US 83', 'US 281', 'SH 4', 'I-2'],

  events: [
    { id: 'BROWNSVILLE_TX_LAUNCH_CLOSURE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A rocket launch is on the schedule, and the notice says the beach highway will close for hours.',
      title: 'The highway closes for a launch',
      body: 'A launch has closed the beach highway and the roads around it. Half the crowd is stuck on the wrong side of the checkpoint and the other half is watching the sky.',
      options: [
        { id: 'EARLY', label: 'Open early so they can get in before the closure', likely: 'Most make it. A thin start.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came got in just ahead of the barricades.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Anyone coming from the island stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road stayed shut for hours. Everyone from out of town stayed home.' },
        { id: 'RIDES', label: 'Organize rides by the back roads', likely: 'Two hours of your day. Most get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Carloads took the back roads together. They will remember that.' }
      ] },

    { id: 'BROWNSVILLE_TX_FIESTA_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The big night parade is on Friday, and the bridge streets will be closed.',
      title: 'The parade has downtown',
      body: 'The night parade fills the downtown streets. A hundred kids are outside the show who cannot park, and the van cannot cross the closed blocks.',
      options: [
        { id: 'EARLY', label: 'Start early and tell everyone where to park', likely: 'Most get in before the closures. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors early. The ones who came parked a mile away and walked.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people give up on the closed streets.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed shut. Half the list never found a place to park.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'BROWNSVILLE_TX_LEVEE_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10, 11] },
      telegraph: 'A tropical storm is stalled in the gulf, and the forecast says flooding for the low streets.',
      title: 'The levee streets go under',
      body: 'Rain has flooded the streets along the levee in Southmost. The carport show is a joke now, and the neighbors who flooded need something more than a show.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'BENEFIT', label: 'Turn it into a benefit for the flooded block', likely: 'Smaller and wetter, and people remember it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .02 }],
          result: 'Cans of food and a donation jar by the door. The crowd was small and stayed late.' },
        { id: 'HIGHER', label: 'Move it to a house on higher ground', likely: 'Smaller and louder, with neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A house on the ridge took the whole bill, and the floor was packed.' }
      ] }
  ],

  words: {
    street: ['Boca Chica Boulevard', 'Elizabeth Street', 'Palm Boulevard', 'Military Highway', 'Paredes Line Road', 'Old Alice Road'],
    water: ['the Rio Grande', 'the resaca', 'the Brownsville Ship Channel', 'Laguna Madre'],
    hood: ['Southmost', 'Fort Brown', 'Olmito', 'Rancho Viejo', 'Los Fresnos', 'Matamoros'],
    thing: ['carport', 'trompo', 'raspa cart', 'cooler of ice', 'extension cord', 'quinceanera hall', 'box fan', 'benefit show', 'box fan', 'borrowed hall', 'Spanglish set'],
    weather: ['heat index', 'flash flood', 'storm watch'],
    surnames: ['Garza', 'Treviño', 'Salinas', 'Cantú', 'Villarreal', 'Guerra', 'Saenz', 'Ochoa', 'Pruitt']
  }
});
