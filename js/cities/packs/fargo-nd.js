SB.Cities.register('fargo-nd', {
  v: 1,
  slug: 'fargo-nd',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['ndsu', 'north dakota state university', 'bison', 'north dakota state bison', 'concordia college', 'minnesota state university moorhead',
           'msum', 'university of north dakota', 'matbus', 'forum of fargo-moorhead', 'knds', 'kdsu', 'krff', 'knnz', 'fargo marathon',
           'usa wrestling', 'empire builder', 'amtrak', 'fargodome', 'mountain west', 'vfw', 'american legion', 'elks', 'knights of columbus',
           'sandbag room', 'agassiz hall', 'hotdish annex', 'dike street rec', 'beet piler hall', 'legion post 19', 'wind chill lounge',
           'lakebed social club', 'prairie rose rink', 'sump & pump garage', 'sump and pump garage', 'northern pacific mezzanine'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['ndsu*', 'north dakota state*', 'concordia college*', 'fargodome*', 'matbus*', 'fargo marathon*', 'empire builder*', 'msum*'],

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
    { id: 'moorhead', kind: 'FEEDER', name: 'Moorhead', state: 'MN', minutes: 10, bearing: 90, pop: 44505, note: 'Across the Red River with its own colleges and house shows; a different state means different cops and rules.', bands: 2 },
    { id: 'west-fargo', kind: 'FEEDER', name: 'West Fargo', minutes: 15, bearing: 275, pop: 38626, note: 'A fast-growing suburb of high-school bands, church rooms and garages.', bands: 2 },
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
    { id: 'west-fargo-edge', name: 'the west edge', route: 'campus', note: 'Slab and finished-basement suburbs on the growth edge; kids ride the avenues downtown.' }
  ],

  contacts: ['minneapolis', 'sioux-falls-sd', 'duluth-mn'],

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
      ] }
  ]
});
