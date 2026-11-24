SB.Cities.register('albuquerque-nm', {
  v: 1,
  slug: 'albuquerque-nm',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of new mexico', 'unm', 'lobos', 'new mexico lobos', 'new mexico state university', 'albuquerque journal', 'alibi', 'daily lobo', 'kob',
           'koat', 'krqe', 'kkob', 'albuquerque isotopes', 'isotopes', 'new mexico united', 'balloon fiesta', 'albuquerque international balloon fiesta',
           'kirtland air force base', 'kirtland', 'sandia national laboratories', 'sandia labs', 'intel', 'presbyterian', 'lovelace', 'unm hospital',
           'los alamos', 'breaking bad', 'sandia peak tramway', 'tramway', 'route 66', 'albuquerque public schools', 'apps', 'better call saul', 'netflix studios',
           'uss bullhead', 'sunport', 'isleta', 'sandia casino', 'hard rock casino', 'explora', 'the launchpad', 'sister bar', 'burt\'s tiki lounge', 'dive bar',
           'expo new mexico', 'new mexico state fair', 'gathering of nations', 'zozobra', 'old man gloom', 'new mexico news port', 'nm news port',
           'civic plaza', 'balloon fiesta park', 'las posadas', 'biopark', 'sandia national labs'],
  /* The note's ban list is kept; "Route 66" is written only as "Central Avenue". */
  blocklist: ['unm*', 'albuquerque journal*', 'isotopes*', 'balloon fiesta*', 'kirtland*', 'sandia national*', 'launchpad albuquerque*', 'sister bar*', 'gathering of nations*', 'zozobra*'],

  blurb: ['A high-desert city of yards, warehouses and bars with a house-show culture that goes back to the garage bands before the clubs booked punk. It\'s small and tight, and it depends on students who move away.',
          'Touring bands skip it, so locals build their own network. Everything runs on a yard, an arts room or a larger room that does all-ages matinees.'],
  hard: 'Far from every other scene, and one neighbor\'s call can end a backyard show.',
  region: 'the Southwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Albuquerque' },
    { id: 'rio-rancho', kind: 'FEEDER', name: 'Rio Rancho', minutes: 25, bearing: 320, beyond: 'river-bridges', note: 'A big sprawl suburb across the river. Teenagers.' },
    { id: 'corrales', kind: 'FEEDER', name: 'Corrales', minutes: 25, bearing: 335, beyond: 'river-bridges', note: 'A rural village in the cottonwoods. Some bands.' },
    { id: 'bernalillo', kind: 'FEEDER', name: 'Bernalillo', minutes: 30, bearing: 5, note: 'A small town on the river with a few bands.' },
    { id: 'los-lunas', kind: 'FEEDER', name: 'Los Lunas', minutes: 30, bearing: 195, note: 'A south-valley town of teenagers.' },
    { id: 'edgewood', kind: 'FEEDER', name: 'Edgewood', minutes: 35, bearing: 80, note: 'An east-mountain town. A few kids.' },
    { id: 'belen', kind: 'FEEDER', name: 'Belen', minutes: 40, bearing: 190, note: 'A small town and a long drive.' },
    { id: 'santa-fe', kind: 'PEER', name: 'Santa Fe', minutes: 60, bearing: 40, slug: 'santa-fe-nm', note: 'A smaller, quieter scene to the north.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the river bridges', p: .02 }],

  hoods: [
    { id: 'downtown', name: 'downtown on Central', route: 'downtown', note: 'Bars and small clubs along the old highway, with a few arts buildings.' },
    { id: 'nob-hill', name: 'Nob Hill', route: 'old-side', note: 'A trendy strip of old shops and bars east of downtown. Mid-priced rentals.' },
    { id: 'roosevelt', name: 'the old houses around the park', route: 'old-side', note: 'Old houses around a park. Backyard stages have hosted DIY shows.' },
    { id: 'foothills', name: 'Four Hills and the foothills', route: 'old-side', note: 'Hillside rentals. Quiet.' },
    { id: 'barelas', name: 'Barelas and the South Valley', route: 'work-side', note: 'Older working-class neighborhoods by the river. Cheap garages, yards and Chicano art spaces.' },
    { id: 'international', name: 'the International District', route: 'work-side', note: 'Cheap strip-mall rooms and warehouses along Central.' },
    { id: 'heights', name: 'the Northeast Heights', route: 'campus', note: 'Suburban sprawl east of the interstate, where teenage bands start.' },
    { id: 'westside', name: 'the Westside', route: 'campus', note: 'Newer, bigger suburbs across the river.' }
  ],

  rooms: [
    { id: 'park-garage', kind: 'HOUSE', hood: 'roosevelt', cap: 60, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'An insulated garage with a backyard stage across from the park. Donations only, no drinking, and one neighbor with the city line on speed dial.' },
    { id: 'fringe-house', kind: 'HOUSE', hood: 'international', cap: 40, curfew: 1350, ac: false, sketch: 30, standing: [65, 60, 45], pressure: 50,
      note: 'A rented house where the roommates named the room. No drinking outside, and half the crew graduates next spring.' },
    { id: 'heights-garage', kind: 'HOUSE', hood: 'heights', cap: 50, curfew: 1320, ac: false, sketch: 20, standing: [65, 60, 50], pressure: 45,
      note: 'A two-car garage in the sprawl where the teenage bands start. Every kid needs a ride home.' },
    { id: 'barelas-space', kind: 'DIY', hood: 'barelas', cap: 100, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A converted building on the old main avenue, half gallery and half zine library. The land under it is for sale and everybody knows it.' },
    { id: 'storefront-gallery', kind: 'DIY', hood: 'downtown', cap: 60, curfew: 1350, ac: true, sketch: 30, standing: [60, 60, 55], pressure: 45,
      note: 'A small storefront on donations and memberships. A labor of love that has never made a dime.' },
    { id: 'practice-complex', kind: 'DIY', hood: 'nob-hill', cap: 150, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 50], pressure: 55, needs: ['VOUCH'],
      note: 'A rehearsal complex with the roomiest all-ages floor around. Punk, metal and thrash, and fire-code questions.' },
    { id: 'justice-hall', kind: 'HALL', hood: 'downtown', cap: 120, rent: 150, deposit: 50, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65], owner: 'HALL_MANAGER',
      note: 'A peace-and-justice center with a small performance room. All ages, and their rules come before yours.' },
    { id: 'park-matinee', kind: 'OUTDOOR', hood: 'roosevelt', cap: 80, rent: 10, curfew: 1200, outdoor: true, sketch: 30, standing: [60, 55, 40],
      note: 'A daytime set in the park with a generator, done by eight. Monsoon afternoons can end it early.' },
    { id: 'central-bar', kind: 'BAR', hood: 'nob-hill', cap: 120, ages: ['A21'], curfew: 1500, ac: true, soundFee: 50, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar on the strip with a stage by the door. The breweries nearby book bands too, but nobody listens.' },
    { id: 'mid-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL', 'A18'], matinee: true, curfew: 1440, ac: true, following: .6, sketch: 15, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'The mid-size club on Central for touring punk, hardcore and metal. Afternoon all-ages shows when the bill is right.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 900, ages: ['ALL'], curfew: 1380, ac: true, following: .7, sketch: 10, standing: [40, 70, 70],
      owner: 'TALENT_BUYER', note: 'An old theater that takes the big hardcore and metal tours. Not a room for a first show.' }
  ],

  contacts: ['santa-fe-nm', 'el-paso-tx', 'amarillo-tx', 'denver'],

  calendar: [
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 9, weeks: [2, 3], dows: [4, 5, 6], can: [.90, .88, .88] },
    { id: 'balloon-week', label: 'the balloon festival', tag: 'festival', month: 10, weeks: [1, 2], dows: [4, 5, 6], can: [.90, .92, .92], hoods: ['heights'], elsewhere: [1, 1, 1] },
    { id: 'spring-gathering', label: 'the big spring gathering weekend', tag: 'festival', month: 4, week: 4, dows: [4, 5, 6], can: [.90, .88, .88] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.88, .95, .95], hoods: ['nob-hill', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [3, 4], dows: [5], can: [.88, .95, .95], hoods: ['nob-hill', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'posadas', label: 'the family Christmas weeks', tag: 'holiday', month: 12, weeks: [3, 4], dows: [3, 4, 5, 6], can: [.80, .85, .85] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Las Cruces', state: 'NM', lat: 32.31, lon: -106.78, pop: 110000 },
    { name: 'Amarillo', state: 'TX', lat: 35.22, lon: -101.83, pop: 200000 },
    { name: 'Flagstaff', state: 'AZ', lat: 35.20, lon: -111.65, pop: 77000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 3000000 }
  ],
  roads: ['I-25', 'I-40', 'Central Avenue', 'Coors Boulevard', 'Montgomery', 'Lomas'],

  words: {
    street: ['Central', 'Lomas', 'Menaul', 'Coors Boulevard', 'Montgomery'],
    water: ['the Rio Grande', 'the bosque', 'the arroyo'],
    hood: ['Nob Hill', 'Barelas', 'the South Valley', 'Four Hills', 'the Heights', 'the International District', 'Corrales'],
    thing: ['monsoon', 'chile', 'bosque', 'swamp cooler', 'green chile stew', 'arroyo'],
    weather: ['monsoon storm', 'spring wind', 'flash flood']
  },

  events: [
    { id: 'ALBUQUERQUE_NM_MONSOON_YARD', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [7, 8, 9] },
      telegraph: 'The afternoon storms have been stacking up over the mountains all week.',
      title: 'The backyard stage is a pond',
      body: 'A monsoon cell dumped an inch in twenty minutes. The yard is standing water and the arroyo behind the fence is running brown.',
      options: [
        { id: 'GARAGE', label: 'Haul everything into the garage', likely: 'It\'s tight and loud, and only a smaller crowd fits.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Everyone crammed into one car bay, and the thunder kept time on the roof.' },
        { id: 'WAIT', label: 'Wait for it to drain and push doors late', likely: 'The ones who wanted to come stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The water drained by nine, and the crowd stood in wet sandals and loved it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] },

    { id: 'ALBUQUERQUE_NM_NEIGHBOR_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'The house next door had a new tenant move in this week.',
      title: 'A neighbor calls the city line',
      body: 'Someone called the city hotline about the noise, and a patrol car is idling at the end of the block. The backyard is full.',
      options: [
        { id: 'QUIET', label: 'Drop the volume and move the loud bands inside', likely: 'The car leaves, but the night loses its edge.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The set turned acoustic until the patrol car rolled away.' },
        { id: 'TALK', label: 'Go next door and talk to them', likely: 'Costs an hour and a pizza.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'REGULARS', pct: .01 }],
          result: 'You brought a box of pizza over, and the neighbor stayed for two songs.' },
        { id: 'ACCEPT', label: 'Ignore it and keep going', likely: 'It\'s risky, and the room could get shut for good.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'STRESS', d: 1 }],
          result: 'The car left, and everyone knew the next call would be the last.' }
      ] },

    { id: 'ALBUQUERQUE_NM_BALLOON_VANS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'Every motel on the north end has a no-vacancy sign, and a touring van is looking for a floor.',
      title: 'The motels are full',
      body: 'The balloon festival has the whole city booked. The touring band on your bill has nowhere to sleep and is asking if anyone has a spare floor.',
      options: [
        { id: 'FLOORS', label: 'Split them across three houses', likely: 'It costs a morning of calls, and they will not forget it.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'REGULARS', pct: .01 }],
          result: 'Three living rooms took them in, and the band played like they owed everyone.' },
        { id: 'MOTEL', label: 'Pay for one room out in the valley', likely: 'Sixty dollars and a long drive to doors.',
          effects: [{ op: 'MONEY', amount: -60 }, { op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
          result: 'They found a room forty minutes out and made it to the stage just late.' },
        { id: 'ACCEPT', label: 'Tell them to sort it out', likely: 'They may be short and tired.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'They slept in the van behind the gas station and sounded it.' }
      ] },

    { id: 'ALBUQUERQUE_NM_BARELAS_SOLD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 90, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'A sign went up on the fence of the old building by the river, and the curator is not picking up.',
      title: 'The land was sold',
      body: 'The ground under the converted building changed hands without anyone telling the people inside. The new owners want it empty by the end of the season, and your bill is one of the last.',
      options: [
        { id: 'LASTNIGHT', label: 'Make it a farewell night', likely: 'A bigger crowd and a sad one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'REGULARS', pct: .02 }],
          result: 'Everyone who had ever played there came to stand in it one more time.' },
        { id: 'MOVE', label: 'Move the bill to a garage', likely: 'Smaller and quieter, and nobody argues.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage on the other side of the park took the bill and the speaker stacks.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The landlord may notice.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The night went by like any other, and the sign was still on the fence in the morning.' }
      ] }
  ]
});
