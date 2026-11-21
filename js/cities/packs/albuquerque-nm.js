SB.Cities.register('albuquerque-nm', {
  v: 1,
  slug: 'albuquerque-nm',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of new mexico', 'unm', 'lobos', 'new mexico lobos', 'new mexico state university', 'albuquerque journal', 'alibi', 'daily lobo', 'kob',
           'koat', 'krqe', 'kkob', 'albuquerque isotopes', 'isotopes', 'new mexico united', 'balloon fiesta', 'albuquerque international balloon fiesta',
           'kirtland air force base', 'kirtland', 'sandia national laboratories', 'sandia labs', 'intel', 'presbyterian', 'lovelace', 'unm hospital',
           'los alamos', 'breaking bad', 'sandia peak tramway', 'tramway', 'route 66', 'albuquerque public schools', 'apps', 'better call saul', 'netflix studios',
           'uss bullhead', 'sunport', 'isleta', 'sandia casino', 'hard rock casino', 'explora', 'the launchpad', 'sister bar', 'burt\'s tiki lounge', 'dive bar'],
  /* The note's ban list is kept; "Route 66" is written only as "Central Avenue". */
  blocklist: ['unm*', 'albuquerque journal*', 'isotopes*', 'balloon fiesta*', 'kirtland*', 'sandia national*', 'launchpad albuquerque*', 'sister bar*'],

  blurb: ['A high-desert city of yards, warehouses and bars with a house-show culture that goes back to the garage bands before the clubs booked punk. Small, tight and dependent on students who move away.',
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

  contacts: ['santa-fe-nm', 'el-paso-tx', 'denver'],

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
        { id: 'GARAGE', label: 'Haul everything into the garage', likely: 'Tight and loud. A smaller crowd fits.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Everyone crammed into one car bay. The thunder kept time on the roof.' },
        { id: 'WAIT', label: 'Wait for it to drain and push doors late', likely: 'The ones who wanted to come stay.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The water drained by nine. The crowd stood in wet sandals and loved it.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'ALBUQUERQUE_NM_NEIGHBOR_CALL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'The house next door had a new tenant move in this week.',
      title: 'A neighbor calls the city line',
      body: 'Someone called the city hotline about the noise, and a patrol car is idling at the end of the block. The backyard is full.',
      options: [
        { id: 'QUIET', label: 'Drop the volume and move the loud bands inside', likely: 'The car leaves. The night loses its edge.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The set turned acoustic until the patrol car rolled away.' },
        { id: 'TALK', label: 'Go next door and talk to them', likely: 'Costs an hour and a pizza.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'REGULARS', pct: .01 }],
          result: 'You brought a box of pizza over. The neighbor stayed for two songs.' },
        { id: 'ACCEPT', label: 'Ignore it and keep going', likely: 'Risky. The room could get shut for good.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'STRESS', d: 1 }],
          result: 'The car left. Everyone knew the next call would be the last.' }
      ] }
  ]
});
