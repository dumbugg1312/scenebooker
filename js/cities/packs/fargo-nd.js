SB.Cities.register('fargo-nd', {
  v: 1,
  slug: 'fargo-nd',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ndsu', 'north dakota state university', 'bison', 'north dakota state bison', 'concordia college', 'minnesota state university moorhead',
           'msum', 'university of north dakota', 'matbus', 'forum of fargo-moorhead', 'knds', 'kdsu', 'krff', 'knnz', 'fargo marathon',
           'usa wrestling', 'empire builder', 'amtrak', 'fargodome', 'mountain west', 'vfw', 'american legion', 'elks', 'knights of columbus',
           'sandbag room', 'agassiz hall', 'hotdish annex', 'dike street rec', 'beet piler hall', 'legion post 19', 'wind chill lounge',
           'lakebed social club', 'prairie rose rink', 'sump & pump garage', 'sump and pump garage', 'northern pacific mezzanine',
           'fargo underground', 'fargo monthly', 'inforum', 'valley news live', 'kfgo', 'minnesota public radio', 'fargo public schools', 'fargo park district',
           'downtown community partnership', 'downtown fargo street fair', 'red river market', 'red river valley fair', 'north dakota state fair',
           'fargo pride', 'fargo winter carnival', 'winter carnival', 'ndsu bison', 'bison football', 'fargo police', 'west fargo police', 'moorhead police',
           'metro sports foundation', 'fargo-moorhead visitors bureau', '2009 flood', 'fm diversion', 'fm area diversion authority', 'concordia', 'high plains reader'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['ndsu*', 'north dakota state*', 'concordia college*', 'fargodome*', 'matbus*', 'fargo marathon*', 'empire builder*', 'msum*', 'high plains reader*', 'red river market*'],

  blurb: ['A tight prairie scene where one hardcore room kept everyone together until the rent went up. Now it is houses and a sober downtown space.',
          'Licensed rooms are 21 and over, so the kids make their own. Winter and the river decide who gets there.'],
  hard: 'All-ages rooms are scarce and the licensed ones are 21 and over.',
  region: 'the northern plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Winnipeg', state: 'MB', lat: 49.90, lon: -97.14 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A hardcore room ran here for years and the kids never lost the habit.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fargo' },
    { id: 'moorhead', kind: 'FEEDER', name: 'Moorhead', state: 'MN', minutes: 10, bearing: 90, pop: 44505, scene: 100, note: 'Across the Red River with its own colleges and house shows; a different state means different cops and rules.', bands: 2,
      rooms: [
      { id: 'moorhead-house', kind: 'HOUSE', hood: 'moorhead-hood', cap: 60, curfew: 1350, ac: false,
        note: 'A rental house across the river. Different state, different cops, and nobody is sure what the code says.' },
      { id: 'moorhead-amphitheater', kind: 'BIG', hood: 'moorhead-hood', cap: 3000, ages: ['ALL'], curfew: 1350,
        note: 'The amphitheater across the river. Dark since its promoter folded, and only for a big touring name.' }] },
    { id: 'west-fargo', kind: 'FEEDER', name: 'West Fargo', minutes: 15, bearing: 275, pop: 38626, note: 'A fast-growing suburb of high-school bands, church rooms and garages.', bands: 2 },
    { id: 'dilworth', kind: 'FEEDER', name: 'Dilworth', state: 'MN', minutes: 12, bearing: 85, scene: 50, note: 'A small railroad town just east over the line in Minnesota, with a stage room that takes all ages.',
      rooms: [
      { id: 'dilworth-stage', kind: 'DIY', hood: 'dilworth-hood', cap: 250, curfew: 1380, ac: false,
        note: 'A stage room just over the line that takes all ages and every kind of band. The margins are thin.' }] },
    { id: 'casselton', kind: 'FEEDER', name: 'Casselton', minutes: 25, bearing: 265, note: 'A small farm and rail town on the interstate.' },
    { id: 'hawley', kind: 'FEEDER', name: 'Hawley', state: 'MN', minutes: 25, bearing: 85, note: 'A small farm town to the east.' },
    { id: 'hillsboro', kind: 'FEEDER', name: 'Hillsboro', minutes: 45, bearing: 5, note: 'A beet-plant town and bedroom community up the interstate.' },
    { id: 'wahpeton', kind: 'FEEDER', name: 'Wahpeton and Breckenridge', minutes: 50, bearing: 175, note: 'Twin towns across the river with a technical college; small and college-driven.' },
    { id: 'detroit-lakes', kind: 'FEEDER', name: 'Detroit Lakes', state: 'MN', minutes: 50, bearing: 95, note: 'A lake resort town, busy and seasonal in summer.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'valley-city', kind: 'FEEDER', name: 'Valley City', minutes: 60, bearing: 275, note: 'A small college town to the west on the interstate.' },
    { id: 'fergus-falls', kind: 'FEEDER', name: 'Fergus Falls', state: 'MN', minutes: 60, bearing: 145, note: 'A quiet Lutheran county seat with an arts streak.' },
    { id: 'grand-forks', kind: 'PEER', name: 'Grand Forks', minutes: 70, bearing: 355, scene: 800, note: 'The nearest real show town: a university town up I-29, smaller and flood-scarred, and the stop on the way north.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old brick blocks by the river and the rail line, licensed bars and converted lofts. Polished, policed and pricing out DIY.' },
    { id: 'roosevelt', name: 'Roosevelt and the campus side', route: 'campus', note: 'Old houses and duplexes cut into student rentals with basements and alleys. The best ground for house shows, and owners are watching.' },
    { id: 'horace-mann', name: 'Horace Mann and Riverview', route: 'old-side', note: 'Older tree-lined streets near the river, with families and renters. Quiet basements and backyards, with gaps where flood-prone houses were bought out.' },
    { id: 'north-fargo', name: 'north Fargo', route: 'work-side', note: 'Warehouses, light industry and old commercial buildings toward the rail yards. Practice spaces and one-off shows, cheap and ignored.' },
    { id: 'south-fargo', name: 'south Fargo', route: 'campus', note: 'New subdivisions and big-box retail by the interstate. Church youth rooms and garage bands.' },
    { id: 'west-fargo-edge', name: 'the west edge', route: 'campus', note: 'Slab and finished-basement suburbs on the growth edge; kids ride the avenues downtown.' },
    { id: 'moorhead-hood', name: 'Moorhead', route: 'town:moorhead', note: 'Across the river in Minnesota: college rentals and old houses, with its own cops and its own rules.' },
    { id: 'dilworth-hood', name: 'Dilworth', route: 'town:dilworth', note: 'A railroad town a few minutes east in Minnesota, with room to be loud.' }
  ],

  rooms: [
    { id: 'roosevelt-basement', kind: 'HOUSE', hood: 'roosevelt', cap: 50, curfew: 1350, ac: false, pressure: 55, start: true,
      note: 'A basement on the campus side with a stage that is a rug. Too many people in too little space, and the neighbors keep count.' },
    { id: 'riverview-basement', kind: 'HOUSE', hood: 'horace-mann', cap: 40, curfew: 1320, lowLying: true, ac: false,
      note: 'A basement on a quiet family block near the river. Early hours, and the sump pump runs all spring.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['A21', 'ALL'], matinee: true, curfew: 1500, ac: true, pressure: 55,
      note: 'A licensed club with a small stage. Loud nights, now and then an early all-ages set, and a booking scene that just lost its promoter.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A21'], curfew: 1440, ac: true,
      note: 'The same licensed rooms on a touring night. Twenty-one and over, and all-ages is the exception.' },
    { id: 'north-co-op', kind: 'DIY', hood: 'north-fargo', cap: 80, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A rented unit near the rail yards, run by everyone who has a key. Cheap and ignored until the rent goes up.' },
    { id: 'south-hall', kind: 'HALL', hood: 'south-fargo', cap: 200, curfew: 1320, ac: true,
      note: 'A rented veterans-style hall on a south-side street. All ages, no beer, and out by ten.' },
    { id: 'west-fellowship', kind: 'HALL', hood: 'west-fargo-edge', cap: 100, curfew: 1320, ac: true,
      note: 'A church youth room on the west edge. The kids come, but there is a long list of what you cannot play.' },
    { id: 'downtown-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 150, curfew: 1260, outdoor: true,
      note: 'A parking lot with a generator. Only in the short warm months, and out by nine.' }
  ],

  contacts: ['minneapolis', 'sioux-falls-sd', 'duluth-mn'],

  calendar: [
    { id: 'street-fair', label: 'the street fair', tag: 'festival', month: 7, week: 3, dows: [3, 4, 5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 7, weeks: [4, 5], dows: [4, 5, 6], can: [.92, .88, .88] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 5, week: 3, dows: [4, 5], can: [.92, .90, .90], hoods: ['downtown', 'roosevelt'], elsewhere: [1, 1, 1] },
    { id: 'spring-crest', label: 'the spring crest', tag: 'flood', month: 4, weeks: [2, 4], dows: [4, 5, 6], can: [.85, .88, .90], hoods: ['horace-mann'], elsewhere: [.95, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['roosevelt', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['roosevelt', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [.85, .95, .95], hoods: ['roosevelt', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Bismarck', state: 'ND', lat: 46.81, lon: -100.78, pop: 73622 },
    { name: 'Sioux Falls', state: 'SD', lat: 43.55, lon: -96.73, pop: 192517 },
    { name: 'Winnipeg', state: 'MB', lat: 49.90, lon: -97.14, pop: 750000 },
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.50, pop: 117000 }
  ],
  roads: ['I-94', 'I-29', 'US 10', 'US 52', 'US 81', 'University Drive'],

  words: {
    street: ['Broadway', 'University Drive', 'Main Avenue', '13th Avenue', '32nd Avenue', '25th Street', 'Center Avenue'],
    water: ['the Red River', 'the Red', 'the diversion', 'the river'],
    hood: ['Roosevelt', 'Horace Mann', 'Riverview', 'north Fargo', 'West Fargo', 'Island Park', 'Moorhead'],
    thing: ['hotdish', 'lefse', 'sump pump', 'plug-in', 'sandbag', 'knoephla', 'alley', 'parka', 'house show', 'sober space', 'church basement', 'bridge'],
    weather: ['blizzard', 'wind chill', 'ground blizzard', 'spring crest']
  },

  events: [
    { id: 'FARGO_ND_COLD_SNAP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], months: [12, 1, 2, 3] },
      telegraph: 'A hard cold snap is coming down from Canada.',
      title: 'Load-in in the snow',
      body: 'It is far below zero the night of your show. The bands are loading in through a snowbank, the van barely started, and half the kids have a long drive across the river.',
      options: [
        { id: 'EARLY', label: 'Open early and let them warm up inside', likely: 'More make it. The night runs a bit long.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -45 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour early. The room filled with coats and stayed warm.' },
        { id: 'RIDES', label: 'Run a few carloads from campus', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You shuttled kids in your car all evening. They remember that.' },
        { id: 'ACCEPT', label: 'Run it and take what shows up', likely: 'A thin crowd of the stubborn.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The cold kept most people home. The ones who came stood close.' }
      ] },

    { id: 'FARGO_ND_SPRING_CREST', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [3, 4, 5] },
      telegraph: 'The river is rising and the sandbag crews are out on the riverside blocks.',
      title: 'The sump pump will not stop',
      body: 'The river is coming up the street. The host has a pump running all night in the basement and wants to know if you still want your show.',
      options: [
        { id: 'MOVE', label: 'Move the bill to a dry room across town', likely: 'A smaller room. The host keeps the trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A dry basement across town took the bill, and the crowd followed.' },
        { id: 'RISK', label: 'Run it with a bucket line and a pump', likely: 'Risky for the floor and the equipment.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Water crept under the amps all night. The room stayed loud and nervous.' },
        { id: 'SKIP', label: 'Call it off and move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The river kept rising anyway.' }
      ] },

    { id: 'FARGO_ND_STREET_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The street fair closes the downtown streets this weekend.',
      title: 'The streets are closed',
      body: 'All of downtown is closed off for the street fair. The parking is gone and the matinee crowd has to walk from the far lot.',
      options: [
        { id: 'LATE', label: 'Push doors back until the crowds thin out', likely: 'Later than planned. The ones who come, come.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The fair crowd wandered in tired and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the kids never get past the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The barricades turned half the list around.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make it.' }
      ] }
  ]
});
