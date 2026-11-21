SB.Cities.register('cleveland', {
  v: 1,
  slug: 'cleveland',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['case western reserve university', 'cwru', 'cleveland state university', 'john carroll university', 'baldwin wallace', 'oberlin college', 'cleveland scene', 'scene magazine', 'the plain dealer', 'cleveland.com', 'cleveland browns', 'cleveland guardians', 'cleveland cavaliers', 'rock and roll hall of fame', 'rock hall', 'the cleveland clinic', 'university hospitals', 'cleveland orchestra', 'cleveland museum of art', 'great lakes brewing', 'cuyahoga county fair', 'cleveland national air show', 'cleveland marathon', 'tri-c', 'cleveland public library', 'progressive field', 'firstenergy stadium', 'rocket arena', 'playhouse square', 'wkyc', 'wews', 'wjw', 'wtam', 'wmms', 'jacobs field', 'burke lakefront airport', 'lake erie monsters', 'kent state', 'detroit-superior bridge', 'lorain-carnegie bridge'],
  blocklist: ['plain dealer*', 'cleveland clinic*', 'rock hall*', 'great lakes brew*', 'playhouse square*', 'cleveland scene*'],

  blurb: ['Hardcore basements on the west side and warehouse shows in Midtown, with a rebuilt DIY crowd and long grey winters.',
          'Parking lots and bridges fill in when the houses get shut down.'],
  hard: 'Venues vanish when neighbors complain, and lake snow kills turnout.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Post-pandemic DIY bills are built around hardcore.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cleveland' },
    { id: 'lakewood', kind: 'FEEDER', name: 'Lakewood', minutes: 15, bearing: 270, beyond: 'river-bridges', note: 'Kids come in; plenty of bands.' },
    { id: 'parma', kind: 'FEEDER', name: 'Parma', minutes: 20, bearing: 195, note: 'A blue-collar suburb with basement bands.' },
    { id: 'euclid', kind: 'FEEDER', name: 'Euclid', minutes: 20, bearing: 55, note: 'A lakefront suburb of old industrial strips.' },
    { id: 'strongsville', kind: 'FEEDER', name: 'Strongsville', minutes: 25, bearing: 200, note: 'Suburban teens drive in.' },
    { id: 'mentor', kind: 'FEEDER', name: 'Mentor', minutes: 30, bearing: 50, note: 'A far east lakefront suburb; car only.' },
    { id: 'elyria', kind: 'FEEDER', name: 'Elyria', minutes: 35, bearing: 250, beyond: 'river-bridges', note: 'A small factory town west.' },
    { id: 'medina', kind: 'FEEDER', name: 'Medina', minutes: 40, bearing: 195, note: 'An exurb where bands rehearse in garages.' },
    { id: 'kent', kind: 'FEEDER', name: 'Kent', minutes: 45, bearing: 150, note: 'Students and a punk-literate small scene.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 40, bearing: 160, slug: 'akron-oh', note: 'A close sister scene; shows swap often.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', minutes: 65, bearing: 120, slug: 'youngstown-oh', note: 'A smaller steel-town scene.' },
    { id: 'canton', kind: 'PEER', name: 'Canton', minutes: 60, bearing: 175, slug: 'canton-oh', note: 'Small.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 100, bearing: 70, slug: 'erie-pa', note: 'A smaller lake town up the interstate.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the bridges over the river valley', p: 0.03 }],

  hoods: [
    { id: 'lakewood', name: 'Lakewood', route: 'old-side', note: 'A dense west-side suburb of doubles and porches; young renters and basement shows in old houses.' },
    { id: 'ohio-city', name: 'Ohio City', route: 'downtown', note: 'West of the river: bars, breweries and converted warehouses, pricey now.' },
    { id: 'tremont', name: 'Tremont', route: 'old-side', note: 'A hilltop of old churches and row houses; artists priced upward.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'A warehouse strip between downtown and the east side; big cheap buildings and new neighbors who complain.' },
    { id: 'gordon-square', name: 'Gordon Square', route: 'downtown', note: 'A west-side arts district of theaters and bars.' },
    { id: 'slavic-village', name: 'Slavic Village', route: 'work-side', note: 'East-side rowhouses hit by foreclosures; very cheap.' },
    { id: 'collinwood', name: 'Collinwood', route: 'work-side', note: 'The northeast lakefront with old industrial blocks and a long history of house shows.' },
    { id: 'cleveland-heights', name: 'Cleveland Heights', route: 'campus', note: 'A hilly inner suburb of students, old stone houses and record stores.' },
    { id: 'near-west', name: 'the Near West side', route: 'work-side', note: 'Basements with a rug for a stage.' }
  ],

  contacts: ['akron-oh', 'youngstown-oh', 'canton-oh', 'erie-pa'],

  points: [
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 2370000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83, pop: 2240000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4390000 },
    { name: 'Toledo', state: 'OH', lat: 41.66, lon: -83.58, pop: 600000 }
  ],
  roads: ['I-90', 'I-71', 'I-77', 'I-480', 'I-271', 'Route 2'],

  words: {
    street: ['Euclid Avenue', 'Detroit Avenue', 'Lorain Avenue', 'Superior Avenue', 'St. Clair Avenue', 'Clifton Boulevard'],
    water: ['Lake Erie', 'the Cuyahoga'],
    hood: ['Lakewood', 'Ohio City', 'Tremont', 'Collinwood', 'Slavic Village', 'Midtown'],
    thing: ['pierogi', 'rust', 'lake effect', 'generator', 'rug for a stage', 'fish fry'],
    weather: ['lake effect', 'grey slush']
  },

  events: [
    { id: 'CLEVELAND_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The high bridges over the river valley have crews on them this week.',
      title: 'The bridge is closed',
      body: 'A bridge over the valley is shut the night of your show, and it strands the west side from the east. The bands and the kids on the far bank have to go the long way around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared. The ones on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way. They will remember that.' }
      ] }
  ]
});
