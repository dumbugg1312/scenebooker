SB.Cities.register('omaha', {
  v: 1,
  slug: 'omaha',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of nebraska omaha', 'unomaha', 'creighton university', 'creighton', 'university of nebraska', 'nebraska cornhuskers', 'cornhuskers', 'huskers',
           'college world series', 'berkshire hathaway', 'berkshire', 'omaha world-herald', 'world-herald', 'hear nebraska', 'ketv', 'wowt', 'kmtv',
           'offutt air force base', 'offutt', 'union pacific', 'mutual of omaha', 'tenaska', 'warren buffett', 'buffett', 'first national bank of omaha',
           'tyson', 'omaha storm chasers', 'storm chasers', 'omaha mavericks', 'kfab', 'kgor', 'henry doorly zoo', 'old market', 'bob kerrey bridge',
           'conagra', 'kiewit', 'werner enterprises', 'ameritas', 'omaha steaks', 'charles schwab stadium', 'cha cha cha', 'conor oberst', 'saddle creek',
           'slowdown', 'the waiting room', 'the brothers lounge', 'reverb lounge', 'the sydney', 'the barley street tavern',
           'flatwater free press', 'omaha daily record', 'omaha magazine', 'ohmyomaha', 'visit omaha', 'uno gateway', 'charles schwab field',
           'college world series', 'mcws', 'maha music festival', 'maha festival', 'heartland pride', 'star city pride', 'artsarben', 'aksarben village',
           'stinson park', 'omaha zombie walk', 'junkstock', 'taste of omaha', 'jazz on the green', 'omaha fringe festival', 'omaha restaurant week',
           'zootacular', 'lauritzen gardens', 'union station', 'little bohemia', 'nebraska liquor control commission', 'omaha police department'],
  /* The ban list is the dossier's, plus the obvious local institutions. Game text says "the university", "the air base", "the rail company". */
  blocklist: ['creighton*', 'offutt*', 'berkshire hathaway*', 'world-herald*', 'union pacific*', 'mutual of omaha*', 'omaha storm chasers*', 'cornhuskers*', 'flatwater free press*', 'omaha daily record*'],

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

  rooms: [
    { id: 'dundee-house', kind: 'HOUSE', hood: 'dundee', cap: 60, curfew: 1350, ac: false, pressure: 50, start: true,
      note: 'A living room or basement in the old frame houses, with no stage. Parking and the neighbors are the worry.' },
    { id: 'north-barn', kind: 'HOUSE', hood: 'north-omaha', cap: 100, curfew: 1320, outdoor: true, ac: false, pressure: 55,
      note: 'A barn behind a band member\'s house. A Tuesday crowd of a hundred is a lot of cars for one street.' },
    { id: 'bohemia-space', kind: 'DIY', hood: 'south-omaha', cap: 200, curfew: 1350, ac: true,
      note: 'A nonprofit rehearsal and show space south of downtown. It cannot fully replace the room that closed, and the calendar is thin.' },
    { id: 'south-storefront', kind: 'DIY', hood: 'south-omaha', cap: 80, curfew: 1380, ac: false, pressure: 55,
      note: 'A storefront and warehouse room in the cheap blocks. A sale of the building would end it.' },
    { id: 'benson-bar', kind: 'BAR', hood: 'benson', cap: 120, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A bar with a back-room stage on the walkable strip. It backs the local bills and turns the kids away at the door.' },
    { id: 'benson-lounge', kind: 'CLUB', hood: 'benson', cap: 300, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A mid-size lounge that allows all ages when the booker pushes. Liquor-licensed, so the kids need a form.' },
    { id: 'maple-lounge', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A lounge with a stage and an all-ages hardcore night. The bigger draws get the slots first.' },
    { id: 'blackstone-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A basement-feeling bar for the heavier bills. The age policy leaves the teens out.' },
    { id: 'warehouse-club', kind: 'CLUB', hood: 'market', cap: 350, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'A club in the tourist district that takes touring packages. Kids on a budget do not drive in.' },
    { id: 'big-room', kind: 'BIG', hood: 'benson', cap: 900, ages: ['ALL'], curfew: 1380,
      note: 'The big indie-leaning room. Only a touring headliner gets in, not a local bill.' },
    { id: 'park-lawn', kind: 'OUTDOOR', hood: 'campus', cap: 300, ages: ['ALL'], curfew: 1260, outdoor: true,
      note: 'A park pavilion and lawn with a generator. Permits and the weather decide it.' },
    { id: 'millard-garage', kind: 'HOUSE', hood: 'west-omaha', cap: 40, curfew: 1320, ac: false,
      note: 'A garage or finished basement where teenage bands start. The parents set the end time.' }
  ],

  contacts: ['lincoln-ne', 'des-moines-ia', 'kansas-city', 'sioux-falls-sd'],

  calendar: [
    { id: 'baseball-series', label: 'the national college baseball tournament', tag: 'festival', month: 6, weeks: [2, 4], dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['downtown', 'market'], elsewhere: [.95, .95, .95] },
    { id: 'pride', label: 'the Pride parade', tag: 'parade', month: 7, week: 3, dows: [5], can: [.88, .88, .88], hoods: ['downtown', 'market'], elsewhere: [.97, .97, .97] },
    { id: 'cinco', label: 'the Cinco de Mayo celebrations', tag: 'holiday', month: 5, week: 1, dows: [5, 6], can: [.95, .95, .95], hoods: ['south-omaha'], elsewhere: [1, 1, 1] },
    { id: 'summer-fest', label: 'the summer music festival', tag: 'festival', month: 8, weeks: [2, 3], dows: [5], can: [.90, .90, .90], hoods: ['campus'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

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
      ] },

    { id: 'OMAHA_BARN_QUIET_HOUR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The barn crowd keeps growing and the neighbors on the street have started to count the cars.',
      title: 'A call at ten',
      body: 'A Tuesday crowd of about a hundred has filled the street. At ten a neighbor calls in the quiet-hour complaint, and an officer is on the way.',
      options: [
        { id: 'WRAP', label: 'Wrap the set up and clear the street', likely: 'Short. The host keeps the trust.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'REGULARS', pct: .01 }],
          result: 'You cut the last band down and had the street empty before the car pulled up.' },
        { id: 'PLAY', label: 'Keep playing and hope', likely: 'If the officer comes, the whole thing ends.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The officer stood at the gate for two songs. The host was not happy.' },
        { id: 'INDOOR', label: 'Pull the amps inside the barn and shut the doors', likely: 'Hot and loud, but quieter outside.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Doors shut and the crowd packed in. The last set shook the loft.' }
      ] },

    { id: 'OMAHA_TOURNEY_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The big college baseball weekend is coming and every downtown parking space is spoken for.',
      title: 'The bar cancels the bill',
      body: 'The bar with the back-room stage lost its parking to the tournament and has dropped your bill for the final weekend.',
      options: [
        { id: 'HOUSE', label: 'Move the bill to a house', likely: 'Smaller and louder. Nobody has to park downtown.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A house took the bill with a day to spare and the floor was packed.' },
        { id: 'LATER', label: 'Push the show to the next weekend', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You moved it a week. Most of the bands could make it.' },
        { id: 'ACCEPT', label: 'Look for a smaller slot at another room', likely: 'Cheaper and thinner.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'A smaller room took it for a thinner night.' }
      ] }
  ]
});
