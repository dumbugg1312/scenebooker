SB.Cities.register('cleveland', {
  v: 1,
  slug: 'cleveland',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['case western reserve university', 'cwru', 'cleveland state university', 'john carroll university', 'baldwin wallace', 'oberlin college', 'cleveland scene', 'scene magazine', 'the plain dealer', 'cleveland.com', 'cleveland browns', 'cleveland guardians', 'cleveland cavaliers', 'rock and roll hall of fame', 'rock hall', 'the cleveland clinic', 'university hospitals', 'cleveland orchestra', 'cleveland museum of art', 'great lakes brewing', 'cuyahoga county fair', 'cleveland national air show', 'cleveland marathon', 'tri-c', 'cleveland public library', 'progressive field', 'firstenergy stadium', 'rocket arena', 'playhouse square', 'wkyc', 'wews', 'wjw', 'wtam', 'wmms', 'jacobs field', 'burke lakefront airport', 'lake erie monsters', 'kent state', 'detroit-superior bridge', 'lorain-carnegie bridge', 'great lakes burning river fest', 'burning river fest', 'cleveland pride', 'pride in the cle', 'st. patrick\'s day parade', 'cleveland international film festival', 'cleveland boat show', 'lakewood chocolate walk', 'ideastream', 'signal cleveland', 'cleveland magazine', 'clevescene', 'buckeye flame', 'news5', 'news 5', 'axios cleveland', 'cool cleveland', 'warped tour', 'huber park', 'cleveland city council', 'cleveland police', 'rustbelt ripper fest', 'cle daily', 'case western observer'],
  blocklist: ['plain dealer*', 'cleveland clinic*', 'rock hall*', 'great lakes brew*', 'playhouse square*', 'cleveland scene*'],

  blurb: ['Hardcore basements on the west side and warehouse shows in Midtown, a rebuilt DIY crowd and long grey winters.',
          'When the houses get shut down, parking lots and bridges fill in.'],
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
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Since the pandemic, DIY bills here have been built around hardcore.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cleveland' },
    { id: 'lakewood', kind: 'FEEDER', name: 'Lakewood', minutes: 15, bearing: 270, beyond: 'river-bridges', note: 'Kids come in; plenty of bands.' },
    { id: 'parma', kind: 'FEEDER', name: 'Parma', minutes: 20, bearing: 195, note: 'A blue-collar suburb with basement bands.' },
    { id: 'euclid', kind: 'FEEDER', name: 'Euclid', minutes: 20, bearing: 55, note: 'A lakefront suburb of old industrial strips.' },
    { id: 'strongsville', kind: 'FEEDER', name: 'Strongsville', minutes: 25, bearing: 200, note: 'Suburban teens drive in.', scene: 100,
      rooms: [
        { id: 'suburb-basement', kind: 'HOUSE', hood: 'strongsville', zone: 'strongsville', cap: 60, ages: ['A18'], curfew: 1380, ac: false, outdoor: false, standing: [60, 60, 45], pressure: 55,
      note: 'A bring-your-own basement down a long rural road. No license, no ride home, and one bad night ends it.' }
      ] },
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
    { id: 'near-west', name: 'the Near West side', route: 'work-side', note: 'Basements with a rug for a stage.' },
    { id: 'strongsville', name: 'Strongsville and the far southwest', route: 'town:strongsville', note: 'Rural-edge suburbs of basements and long driveways. Car only, and no license for anything.' }
  ],

  rooms: [
    { id: 'lakewood-basement', kind: 'HOUSE', hood: 'lakewood', cap: 40, curfew: 1350, ac: false, outdoor: false, standing: [70, 60, 45], pressure: 50, start: true,
      note: 'A basement with a makeshift stage and a merch table. Fewer bands, an earlier finish, and a landlord upstairs who hears everything.' },
    { id: 'west-basement', kind: 'HOUSE', hood: 'near-west', cap: 40, curfew: 1320, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 55,
      note: 'A small basement run by a crew, address by RSVP only. Kids under eighteen inside make it a legal risk.' },
    { id: 'heights-house', kind: 'HOUSE', hood: 'cleveland-heights', cap: 50, ages: ['A18'], curfew: 1380, ac: false, outdoor: false, standing: [65, 60, 50], pressure: 55,
      note: 'An old stone house with a porch and a basement. Neighbors and landlords end these, usually in the spring.' },
    { id: 'warehouse', kind: 'DIY', hood: 'midtown', cap: 50, rent: 0, curfew: 1380, ac: false, standing: [60, 60, 50], pressure: 60, needs: ['VOUCH'],
      note: 'A bare converted warehouse on donations, with no booze and no drugs. New neighbors are one text away from the landlord.' },
    { id: 'collective', kind: 'DIY', hood: 'gordon-square', cap: 80, rent: 60, curfew: 1350, ac: false, standing: [60, 60, 50], pressure: 50,
      note: 'An arts collective on the west side. Donation door, all ages, and a rent that depends on whoever owns the building.' },
    { id: 'bridge', kind: 'OUTDOOR', hood: 'near-west', cap: 150, rent: 0, curfew: 1320, standing: [55, 55, 40], pressure: 55,
      note: 'A blighted bridge with the skyline behind it and a generator for power. The span is coming down, so every show is called the last.' },
    { id: 'parking-lot', kind: 'OUTDOOR', hood: 'near-west', cap: 100, rent: 0, curfew: 1290, standing: [55, 55, 40], pressure: 65,
      note: 'A lit lot behind a fast-food place, invite only. The guard threatens the police at the second band.' },
    { id: 'west-club', kind: 'CLUB', hood: 'ohio-city', cap: 250, houseCosts: 120, ages: ['A18', 'A21'], curfew: 1530, ac: true, following: .4, standing: [50, 65, 70], owner: 'TALENT_BUYER', needs: ['FULL_BILL'], pressure: 55,
      note: 'A west-side dive with a rock room and a cheap cover. It stops booking the loud nights after something gets broken.' },
    { id: 'east-ballroom', kind: 'CLUB', hood: 'collinwood', cap: 300, ages: ['ALL', 'A18', 'A21'], curfew: 1440, ac: true, following: .5, standing: [50, 70, 65], owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A ballroom and tavern on the east side. Most nights are all ages with a wristband, and the small-venue tax break is gone.' },
    { id: 'heights-club', kind: 'CLUB', hood: 'cleveland-heights', cap: 350, ages: ['A21'], curfew: 1530, ac: true, following: .5, standing: [45, 70, 65], owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A long-running punk-friendly club near the Heights. Under-21s are mostly shut out.' },
    { id: 'bowling-basement', kind: 'CLUB', hood: 'gordon-square', cap: 250, houseCosts: 120, ages: ['A18', 'A21'], curfew: 1440, ac: false, following: .4, standing: [55, 65, 65], needs: ['FULL_BILL'],
      note: 'A bowling alley with a basement stage. The pit thrashes under the lanes, and the fire code sets the hour.' },
    { id: 'downtown-hall', kind: 'BIG', hood: 'ohio-city', cap: 900, ages: ['A18', 'A21'], curfew: 1380, ac: true, standing: [40, 65, 55], owner: 'TALENT_BUYER', notice: 90,
      note: 'The downtown theater and club tier. Touring acts only, and a long step up from anything else on this list.' }
  ],

  contacts: ['akron-oh', 'youngstown-oh', 'canton-oh', 'erie-pa', 'pittsburgh'],

  calendar: [
    { id: 'air-show', label: 'the lakefront air show', tag: 'airshow', month: 9, week: 1, dows: [5, 6, 0], can: [.9, .88, .85], hoods: ['ohio-city'], elsewhere: [1, .98, .98] },
    { id: 'pride', label: 'Pride weekend', tag: 'parade', month: 6, week: 2, dows: [5], can: [.9, .9, .9], hoods: ['gordon-square', 'ohio-city'], elsewhere: [.97, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [6], can: [.88, .95, .95], hoods: ['ohio-city', 'midtown'], elsewhere: [.97, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [6], can: [.88, .95, .95], hoods: ['ohio-city', 'midtown'], elsewhere: [.97, .97, .97] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [6], can: [.88, .95, .95], hoods: ['ohio-city', 'midtown'], elsewhere: [.97, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },


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
      body: 'A bridge over the valley is shut the night of your show, which cuts the west side off from the east. The bands and the kids on the far bank have to go the long way around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared, and the people on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way around.' }
      ] },

    { id: 'CLEVELAND_LOT_GUARD', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The hardcore night is on in a lit parking lot on the west side, and the guard has been seen walking the edge of it.',
      title: 'The guard comes round',
      body: 'Halfway through the second band the lot guard walks up and says he will call the police because it\'s private property. The generator is running and the crowd is packed in tight.',
      options: [
        { id: 'MOVE', label: 'Carry the gear to a basement and finish there', likely: 'It\'s smaller and louder, and the kids follow the vans.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill finished in a basement across town, which turned out to be a better room than the lot.' },
        { id: 'SHORT', label: 'Cut the bill short and clear the lot', likely: 'It\'s a short night, and nobody gets cited.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands played and the rest packed out, and the lot was empty before any squad car came.' },
        { id: 'ACCEPT', label: 'Argue and play on', likely: 'He might actually call.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The guard stood there with his phone out for two songs, and half the crowd left before he used it.' }
      ] },

    { id: 'CLEVELAND_NEW_NEIGHBORS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'New tenants have moved into the building next to the warehouse, and the landlord has stopped answering texts.',
      title: 'One text to the landlord',
      body: 'The new neighbors next door to the Midtown warehouse sent one message to the landlord, and tonight\'s donation-only bill has lost its room.',
      options: [
        { id: 'BASEMENT', label: 'Move the bill to a basement on the west side', likely: 'It\'s smaller, and nearer the kids.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the whole bill with an hour to spare, and the floor was packed.' },
        { id: 'MOVEDAY', label: 'Hold the date and find a room for tomorrow', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' },
        { id: 'ACCEPT', label: 'Run it in the street out front', likely: 'You get a smaller crowd, and the neighbors watching.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The bill played on the curb under a streetlight while the neighbors watched from their windows.' }
      ] },

    { id: 'CLEVELAND_LAKE_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The forecast says lake snow by Saturday night, hard on the east side and thinner on the west.',
      title: 'The snow shuts the high bridges',
      body: 'Snow has the high bridges closed on a Saturday. The west-side basement is full of kids who can walk there, and the east-side ballroom is half empty.',
      options: [
        { id: 'WAIT', label: 'Hold doors and wait for the plows', likely: 'It starts late, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The vans pulled in at ten, and you started late, but nobody left.' },
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'It\'s a thin night, but the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands played a long, loose night in a room that was half full and warm.' },
        { id: 'MOVEDAY', label: 'Move it a day', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] }
  ]
});
