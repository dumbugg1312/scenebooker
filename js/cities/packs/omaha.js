SB.Cities.register('omaha', {
  v: 1,
  slug: 'omaha',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of nebraska omaha', 'unomaha', 'creighton university', 'creighton', 'university of nebraska', 'nebraska cornhuskers', 'cornhuskers', 'huskers',
           'college world series', 'berkshire hathaway', 'berkshire', 'omaha world-herald', 'world-herald', 'hear nebraska', 'ketv', 'wowt', 'kmtv',
           'offutt air force base', 'offutt', 'union pacific', 'mutual of omaha', 'tenaska', 'warren buffett', 'buffett', 'first national bank of omaha',
           'tyson', 'omaha storm chasers', 'storm chasers', 'omaha mavericks', 'kfab', 'kgor', 'henry doorly zoo', 'old market', 'bob kerrey bridge',
           'conagra', 'kiewit', 'werner enterprises', 'ameritas', 'omaha steaks', 'charles schwab stadium', 'cha cha cha', 'conor oberst', 'saddle creek',
           'slowdown', 'the waiting room', 'the brothers lounge', 'reverb lounge', 'the sydney', 'the barley street tavern'],
  /* The ban list is the dossier's, plus the obvious local institutions. Game text says "the university", "the air base", "the rail company". */
  blocklist: ['creighton*', 'offutt*', 'berkshire hathaway*', 'world-herald*', 'union pacific*', 'mutual of omaha*', 'omaha storm chasers*', 'cornhuskers*'],

  blurb: ['A Missouri River city with a tight hardcore core and a scene that rebuilt after the pandemic. Benson and Midtown carry the bars, North Omaha carries the barns and yards.',
          'All-ages rooms keep closing, so houses and one mid-size room hold the teenagers. People leave for Chicago or Denver at twenty-five, and some come back for the reunion shows.'],
  hard: 'All-ages rooms keep closing, and the best people move away at twenty-five.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .06, reason: 'A recurring local hardcore showcase keeps the whole town leaning that way.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Omaha' },
    { id: 'council-bluffs', kind: 'FEEDER', name: 'Council Bluffs', state: 'IA', minutes: 15, bearing: 90, beyond: 'river-bridges', note: 'A rail and casino town across the river. A few bands and a handful of house shows.' },
    { id: 'bellevue', kind: 'FEEDER', name: 'Bellevue', minutes: 20, bearing: 170, note: 'A big suburb by the air base. Teenagers come up for shows.' },
    { id: 'papillion', kind: 'FEEDER', name: 'Papillion', minutes: 20, bearing: 195, note: 'A suburb of kids with their parents\' cars, and a few bands.' },
    { id: 'gretna', kind: 'FEEDER', name: 'Gretna', minutes: 25, bearing: 230, note: 'A fast-growing suburb full of teenagers.' },
    { id: 'blair', kind: 'FEEDER', name: 'Blair', minutes: 30, bearing: 340, note: 'A small town north on the river. A few kids.' },
    { id: 'glenwood', kind: 'FEEDER', name: 'Glenwood', state: 'IA', minutes: 30, bearing: 130, beyond: 'river-bridges', note: 'A small town across the river in Iowa.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 40, bearing: 305, note: 'A small city out on the highway. A few bands drive in.' },
    { id: 'lincoln', kind: 'PEER', name: 'Lincoln', minutes: 60, bearing: 235, slug: 'lincoln-ne', note: 'A college-town scene of about the same size, with its own halls and houses.' },
    { id: 'des-moines', kind: 'PEER', name: 'Des Moines', state: 'IA', minutes: 135, bearing: 85, slug: 'des-moines-ia', note: 'The nearest comparable scene, often paired in a weekend.' },
    { id: 'kansas-city', kind: 'PEER', name: 'Kansas City', state: 'MO', minutes: 180, bearing: 170, slug: 'kansas-city', note: 'Bigger, and the next stop south.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the river bridges', p: .02 }],

  hoods: [
    { id: 'downtown', name: 'Midtown and Blackstone', route: 'downtown', note: 'Old brick, bars and mixed-use arts buildings. Where the small rooms cluster.' },
    { id: 'market', name: 'the brick warehouse district', route: 'downtown', note: 'Tourist bars and clubs. Touring bands play here; kids on a budget do not hang out.' },
    { id: 'benson', name: 'Benson', route: 'old-side', note: 'A walkable strip of bars and small stages with cheap old houses behind it. The nearest thing to a DIY district.' },
    { id: 'north-omaha', name: 'North Omaha', route: 'old-side', note: 'Big old houses, barns and yards. Backyards and outbuildings have hosted punk and hardcore since the pandemic.' },
    { id: 'dundee', name: 'Dundee and Field Club', route: 'old-side', note: 'Tree-lined streets near Midtown. A few band houses in the rentals.' },
    { id: 'south-omaha', name: 'South Omaha', route: 'work-side', note: 'Packing-house history, a Latino neighborhood, cheap rent, warehouses and garages.' },
    { id: 'campus', name: 'Elmwood and the campus rentals', route: 'campus', note: 'Student rentals around the university grounds.' },
    { id: 'west-omaha', name: 'West Omaha and Millard', route: 'campus', note: 'Suburban sprawl. Many teenage bands start in garages and basements here.' }
  ],

  contacts: ['lincoln-ne', 'des-moines-ia', 'kansas-city'],

  points: [
    { name: 'Sioux City', state: 'IA', lat: 42.50, lon: -96.40, pop: 85000 },
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58, pop: 2200000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 3000000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3700000 }
  ],
  roads: ['I-80', 'I-680', 'I-29', 'I-480', 'Dodge Street', 'Military Avenue'],

  words: {
    street: ['Dodge', 'Farnam', 'Maple', 'Military Avenue', '72nd Street', '24th Street'],
    water: ['the Missouri', 'the river', 'Papio Creek'],
    hood: ['Benson', 'Blackstone', 'Dundee', 'Field Club', 'Elmwood', 'Millard', 'Aksarben', 'South Omaha', 'North Omaha'],
    thing: ['levee', 'packing house', 'snow shovel', 'barn', 'meat counter', 'ice scraper'],
    weather: ['tornado warning', 'black ice', 'thunderstorm Sunday']
  },

  events: [
    { id: 'OMAHA_ICY_RAMP', when: 'WEEK', tier: 'HARD', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'COLD', months: [12, 1, 2, 3] },
      telegraph: 'Ice is in the forecast, and the street in front of the house is a slope.',
      title: 'The trailer is stuck on the ice',
      body: 'Freezing rain glazed the street overnight. The band\'s trailer is sideways at the bottom of the hill, and the load-in ramp is a sheet of ice.',
      options: [
        { id: 'SALT', label: 'Salt the ramp and push the trailer up by hand', likely: 'Costs a bag of salt and an hour. Doors open late.',
          effects: [{ op: 'MONEY', amount: -15 }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'REGULARS', pct: .01 }],
          result: 'Six people and a bag of salt. The band loaded in by dark and the crowd forgave the wait.' },
        { id: 'EARLY', label: 'Move doors earlier so people beat the worst of it', likely: 'Most make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors an hour early. Everyone came in stamping slush off their boots.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'A lot of the suburban kids never make it in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The side streets never cleared. The room was the ones who could walk.' }
      ] },

    { id: 'OMAHA_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the river bridges this week.',
      title: 'The bridge is down to one lane',
      body: 'A wreck on the river bridge has the interstate crawling. The band from across the water and the Iowa kids are stuck on the wrong bank.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The Iowa side stayed home.' },
        { id: 'RIDES', label: 'Organize rides over the walking bridge', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'A carload walked the footbridge together with their amps. They will remember that.' }
      ] }
  ]
});
