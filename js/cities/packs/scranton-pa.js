SB.Cities.register('scranton-pa', {
  v: 1,
  slug: 'scranton-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of scranton', 'marywood', 'marywood university', 'johnson college', 'lackawanna college', 'penn state scranton', 'penn state', 'keystone college',
           'wilkes university', 'king\'s college', 'east stroudsburg university', 'bloomsburg university', 'luzerne county community college',
           'st. patrick\'s day parade', 'la festa italiana', 'steamtown', 'steamtown marathon', 'scranton fringe festival', 'fringe festival',
           'pittston tomato festival', 'tomato festival', 'cherry blossom festival', 'bloomsburg fair', 'pocono raceway', 'the electric city', 'electric city',
           'the times-tribune', 'times-tribune', 'scranton times', 'elks', 'moose lodge', 'knights of columbus', 'vfw', 'american legion',
           'the culm bank', 'culm bank', 'breaker boy hall', 'number nine social club', 'st. casimir\'s annex', 'slate picker\'s rec',
           'hose company no. 6 banquet room', 'hose company no. 6', 'the dummy line', 'dummy line', 'gravity plane records back room', 'gravity plane records',
           'keyser creek garage', 'the wet cellar', 'wet cellar', 'lackawanna avenue mezzanine', 'the anthracite annex', 'anthracite annex',
           'lackawanna music festival', 'lackawanna county heritage fair', 'heritage fair', 'scrantastic spectacular', 'scrantastic', 'st. ubaldo day', 'running of the saints',
           'torch light parade', 'montage mountain', 'nepa scene', 'discovernepa', 'visitnepa', 'wvia', 'bandsintown', 'mohegan arena', 'apocalypse fest',
           'scranton half marathon', 'lackawanna winter market', 'roba family farms', 'plcb'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['university of scranton*', 'marywood*', 'penn state*', 'steamtown*', 'la festa*', 'pocono raceway*', 'times-tribune*', 'bloomsburg fair*'],

  blurb: ['Halls, basements and a rival town down the valley. The scene runs on a few people with a van.',
          'Heavy music feels at home in the old mill-and-parish country, and everybody is a few steps from everybody else.'],
  hard: 'Few rooms, thin tour traffic, and the next town down the valley competes.',
  region: 'the valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Scranton' },
    { id: 'dunmore', kind: 'FEEDER', name: 'Dunmore', minutes: 5, bearing: 100, note: 'The adjoining borough at the highway junction; its scene is Scranton\'s scene.' },
    { id: 'south-valley', kind: 'FEEDER', name: 'Old Forge, Taylor and Moosic', minutes: 15, bearing: 205, note: 'Working-class valley boroughs down the road; kids drift in all the time.' },
    { id: 'pittston', kind: 'FEEDER', name: 'Pittston', minutes: 20, bearing: 230, note: 'A coal and clothing-mill town on the way to the twin city.' },
    { id: 'carbondale', kind: 'FEEDER', name: 'Carbondale', minutes: 25, bearing: 40, note: 'An old struggling railroad and coal town to the north-east; the kids come down for shows.' },
    { id: 'wilkes-barre', kind: 'FEEDER', name: 'Wilkes-Barre', minutes: 30, bearing: 225, pop: 44000, scene: 100, note: 'The twin city down the interstate with its own colleges and bars; trade runs both ways.' },
    { id: 'tunkhannock', kind: 'FEEDER', name: 'Tunkhannock', minutes: 30, bearing: 280, note: 'A rural county seat; small bands and long roads.' },
    { id: 'honesdale', kind: 'FEEDER', name: 'Honesdale', minutes: 45, bearing: 70, note: 'A pretty canal-era town with a small arts crowd and a thin punk presence.' },
    { id: 'mount-pocono', kind: 'FEEDER', name: 'Mount Pocono and the Poconos', minutes: 45, bearing: 150, note: 'Tourism and exurbs; plenty of bored teenagers and few places to go.' },
    { id: 'hazleton', kind: 'FEEDER', name: 'Hazleton', minutes: 50, bearing: 205, note: 'A warehouse-economy city up on the ridge with a small scene of its own.' },
    { id: 'montrose', kind: 'FEEDER', name: 'Montrose', minutes: 55, bearing: 340, note: 'A rural northern county seat; the kids drive to Scranton or Binghamton.' },
    { id: 'stroudsburg', kind: 'FEEDER', name: 'Stroudsburg and East Stroudsburg', minutes: 60, bearing: 135, note: 'A college-town corner of the Poconos.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', state: 'NY', minutes: 65, bearing: 355, scene: 450, note: 'A university city an hour north on the interstate, a frequent tour stop and the nearest outside crowd.' },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', minutes: 80, bearing: 165, slug: 'allentown-pa', note: 'The bigger valley to the south, closer to Philadelphia; bands travel both ways.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', state: 'NY', minutes: 105, bearing: 330, slug: 'ithaca-ny', note: 'A smaller, more bohemian college town.' }
  ],

  hoods: [
    { id: 'central-city', name: 'Central City', route: 'downtown', note: 'The flat river core: bars on the avenues, lofts above storefronts and old industrial buildings. Noise complaints come from the lofts.' },
    { id: 'south-side', name: 'the South Side', route: 'old-side', note: 'Dense rowhouses and corner bars on the hill south of downtown, with old ethnic clubs and newer families. Cheap.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Rowhouses and double blocks across the river with parish and fire-company culture. Club rooms and basements.' },
    { id: 'hill-section', name: 'the Hill Section', route: 'campus', note: 'Big old houses split into apartments around the university. Student house shows, and landlords who notice.' },
    { id: 'north-scranton', name: 'North Scranton', route: 'work-side', note: 'A long working-class strip up the valley of small lots and rowhouses. Basements and corner bars.' },
    { id: 'green-ridge', name: 'Green Ridge', route: 'campus', note: 'Tidy single homes in the north-east. Quiet, and the neighbors call.' },
    { id: 'minooka', name: 'Minooka', route: 'work-side', note: 'Narrow rows at the south edge: cheap, ignored, and the least known to outsiders.' },
    { id: 'mountains', name: 'West Mountain and East Mountain', route: 'old-side', note: 'Ridge-top ranches and split-levels with big lots, barns and pole buildings. The place for a generator show.' },
    { id: 'wb-basement-hood', name: 'Wilkes-Barre', route: 'town:wilkes-barre', note: 'The twin city down the interstate: a working all-ages basement, and a different set of landlords and cops.' }
  ],

  rooms: [
    { id: 'hill-rowhouse', kind: 'HOUSE', hood: 'hill-section', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rowhouse basement in a split-up old house. Kids start here, and the noise code is one call away.' },
    { id: 'minooka-corner', kind: 'HOUSE', hood: 'north-scranton', cap: 50, curfew: 1350, ac: false, outdoor: false, pressure: 55,
      note: 'A corner-lot basement with a low ceiling. A second noise call and the citation goes to the host.' },
    { id: 'ridge-lot', kind: 'OUTDOOR', hood: 'mountains', cap: 120, curfew: 1320, ac: false,
      note: 'A big lot and a pole barn up a ridge road. Generator shows in the warm months, and a long drive home.' },
    { id: 'marketplace-hall', kind: 'BIG', hood: 'central-city', cap: 500, rent: 400, deposit: 0, curfew: 1380, ac: true, owner: 'HALL_MANAGER',
      note: 'A second-floor hall run by a youth music nonprofit, with the drinks kept outside and the lessons paying the rent. Few people know it is up there.' },
    { id: 'gym-room', kind: 'DIY', hood: 'central-city', cap: 80, curfew: 1350, ac: false, pressure: 65,
      note: 'An upstairs lounge over a wrestling gym. The city shut a room like this down once on safety grounds, and it is one inspection from closing.' },
    { id: 'side-street-hall', kind: 'HALL', hood: 'west-side', cap: 150, curfew: 1350, ac: true,
      note: 'A church or community hall on a side street, rented by the day. A committee can say no.' },
    { id: 'hardcore-bar', kind: 'BAR', hood: 'central-city', cap: 200, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: true,
      note: 'A downtown bar with a recurring hardcore night. The license decides who gets in.' },
    { id: 'avenue-club', kind: 'CLUB', hood: 'central-city', cap: 300, ages: ['A21', 'ALL'], curfew: 1410, ac: true,
      note: 'A theater-style club on the avenue for touring metal and punk. The rare night is all ages.' },
    { id: 'avenue-pub', kind: 'BAR', hood: 'central-city', cap: 120, ages: ['A21'], curfew: 1470, ac: true, pressure: 55,
      note: 'A pub with a corner stage. The city has stepped in before on nights judged too big for the room.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'central-city', cap: 40, curfew: 1260, ac: true,
      note: 'A record and comic shop floor. Afternoons only, and the bazaar crowd knows it.' },
    { id: 'wb-basement', kind: 'DIY', hood: 'wb-basement-hood', cap: 100, curfew: 1350, ac: false,
      note: 'A basement hall down the valley that reopened for punk and hardcore. The nearest working all-ages room outside town.' }
  ],

  contacts: ['allentown-pa', 'ithaca-ny', 'reading-pa', 'harrisburg-pa', 'new-york'],

  calendar: [
    { id: 'parade', label: 'the St. Patrick\'s parade weekend', tag: 'parade', month: 3, week: 2, dows: [5], can: [.85, .80, .80], hoods: ['central-city'], elsewhere: [1, 1, .97] },
    { id: 'half-marathon', label: 'the half marathon', tag: 'race', month: 4, weeks: [3, 4], dows: [6], can: [.92, .90, .90], hoods: ['central-city'], elsewhere: [1, 1, 1] },
    { id: 'saints-fest', label: 'the saints festival weekend', tag: 'festival', month: 5, week: 2, dows: [4, 5, 6], can: [.95, .92, .92] },
    { id: 'ridge-fair', label: 'the ridge-top fair', tag: 'fair', month: 6, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.95, .92, .90], hoods: ['mountains'], elsewhere: [1, .97, .97] },
    { id: 'labor-day', label: 'Labor Day weekend', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6, 0], can: [.80, .80, .75], hoods: ['central-city'], elsewhere: [.90, .88, .85] },
    { id: 'city-marathon', label: 'the marathon', tag: 'race', month: 10, weeks: [2, 3], dows: [6], can: [.92, .90, .88], hoods: ['central-city', 'north-scranton'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [4, 5], can: [.90, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Binghamton', state: 'NY', lat: 42.1, lon: -75.91, pop: 48000 },
    { name: 'Wilkes-Barre', state: 'PA', lat: 41.25, lon: -75.88, pop: 44000 },
    { name: 'Williamsport', state: 'PA', lat: 41.24, lon: -77.0, pop: 28000 },
    { name: 'Bethlehem', state: 'PA', lat: 40.63, lon: -75.37, pop: 75000 }
  ],
  roads: ['I-81', 'I-84', 'I-380', 'US 6', 'US 11', 'PA 307'],

  words: {
    street: ['Lackawanna Avenue', 'Wyoming Avenue', 'Cedar Avenue', 'Main Avenue', 'Penn Avenue', 'Mulberry Street'],
    water: ['the Lackawanna River', 'Roaring Brook', 'Leggetts Creek'],
    hood: ['Minooka', 'Green Ridge', 'West Mountain', 'East Mountain', 'Hyde Park', 'Providence', 'the Hill Section', 'the South Side', 'the West Side', 'Dunmore'],
    thing: ['slag heap', 'breaker', 'pierogi', 'pizza tray', 'rowhouse', 'stone basement', 'coal door', 'club bar', 'banquet room', 'snow shovel', 'parish hall', 'hatchback', 'mill practice space'],
    weather: ['snow squall', 'black ice', 'lake-effect flurry', 'road closure']
  },

  events: [
    { id: 'SCRANTON_PA_MARATHON', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'race' },
      telegraph: 'The marathon route is posted, and it runs up the north-side road the kids use.',
      title: 'The road is shut',
      body: 'The race closes the road from the north to downtown for the whole morning and half the afternoon. The kids who live up the valley cannot get through, and your band has an amp to carry.',
      options: [
        { id: 'FOOT', label: 'Tell everyone to park up the valley and walk in', likely: 'Costs a few of them. The ones who come carry things.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }],
          result: 'The amps came in on a hand truck and a wagon. People showed up late, a little sweaty, and happy.' },
        { id: 'MOVE', label: 'Move the show to a basement up the valley', likely: 'Smaller and closer to the kids.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill and nobody had to cross the barricades.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The detour eats the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The detour was an hour. Half the list gave up on the way.' }
      ] },

    { id: 'SCRANTON_PA_INSPECTOR', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Someone posted the show with the address, and the posts are going around.',
      title: 'A man with a clipboard',
      body: 'A city inspector turns up at the upstairs room because the show was posted online. The city shut a room like this down once on safety grounds, and the stairwell is the whole fire plan.',
      options: [
        { id: 'MOVE', label: 'Move the show to a basement tonight', likely: 'Smaller, loud and off the inspector map.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill moved across town with an hour to spare, and the floor was packed.' },
        { id: 'CAP', label: 'Cap the room and keep the door on the count', likely: 'Fewer people, no citation.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'MONEY', amount: -25 }],
          result: 'You counted heads at the stairs. The inspector left with his clipboard and a long look.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'If the room gets closed, it stays closed.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'He stood in the back through two songs. Nobody could relax.' }
      ] },

    { id: 'SCRANTON_PA_LABOR_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [9] },
      telegraph: 'The festival is on downtown and a punk camping weekend is on in the hills, both on the same days.',
      title: 'Two weekends in one',
      body: 'The festival fills downtown, takes the parking and packs the bars. The camping weekend pulls the scene kids out of town. A bill in between draws almost no one.',
      options: [
        { id: 'LATE', label: 'Push doors back and aim at the bar crowd', likely: 'Later, and not their usual crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour late. A few of the festival people wandered in and stayed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The kids are in the hills.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The room was thin. The ones who stayed in town were glad of it.' },
        { id: 'MOVE', label: 'Move the show a week', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You moved it a week. Not every band could.' }
      ] }
  ]
});
