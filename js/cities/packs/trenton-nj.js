SB.Cities.register('trenton-nj', {
  v: 1,
  slug: 'trenton-nj',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['nj transit', 'njt', 'septa', 'amtrak', 'wawa', 'quickchek', 'rutgers', 'princeton university', 'rider university', 'the college of new jersey',
           'mercer county community college', 'the trentonian', 'trentonian', 'trenton times', 'times of trenton', 'roebling', 'roebling works', 'trenton makes',
           'joint base mcguire-dix-lakehurst', 'mcguire', 'fort dix', 'ghost ship', 'river line', 'taylor ham', 'vfw', 'american legion', 'washington crossing',
           'crossing the delaware', 'guatemalan independence', 'assunpink annex', 'wire rope hall', 'feeder canal social club', 'sixth ward hall',
           'pottery row basement', 'the hard roll room', 'lamberton hall', 'the burg bocce club', 'switchyard lanes', 'the kaiser crust', 'hiltonia carport',
           'delaware rubber works',
           'trenton thunder', 'thunder ballpark', 'trenton ironhawks', 'ironhawks', 'punk rock flea market', 'levitt amp', 'trenton downtown association', 'heritage week', 'ellarslie', 'trenton city museum', 'cure insurance arena', 'tcnj', 'princeton info', 'town topics', 'new jersey stage', 'njarts', 'nj 101.5', 'njmonthly', 'nj monthly', 'altpress', 'punknews', 'songkick', 'bandsintown', 'mlb draft league', 'draft league', 'trenton downtowner', 'destination trenton', 'jerseyindie', 'jersey indie', 'mill hill park', 'cadwalader park'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['trentonian*', 'trenton times*', 'wawa*', 'quickchek*', 'wire rope hall*', 'lamberton hall*', 'rutgers*', 'septa*'],

  blurb: ["New Jersey's capital on the Delaware: rowhouse basements, a downtown that empties at five, and suburbs that make more bands than the city.",
          'A midpoint between two huge scenes, so bands pass through and the ambitious ones leave.'],
  hard: 'Midpoint stop; bands skip it for the big cities either side.',
  region: 'the Northeast Corridor',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Trenton' },
    { id: 'hamilton', kind: 'FEEDER', name: 'Hamilton', minutes: 10, bearing: 140, note: 'A huge ranch-house suburb next door; most of the kids and bands come from here.' },
    { id: 'ewing', kind: 'FEEDER', name: 'Ewing and Lawrence', minutes: 10, bearing: 330, note: 'Suburbs with a state college and a private university; basements and student crowds.' },
    { id: 'bordentown', kind: 'FEEDER', name: 'Bordentown', minutes: 15, bearing: 160, note: 'A small old river town down US 130 with a little scene.' },
    { id: 'levittown', kind: 'FEEDER', name: 'Yardley, Morrisville and Levittown', state: 'PA', minutes: 20, bearing: 215, note: 'Pennsylvania suburbs across the river; big overlap with Trenton crowds.' },
    { id: 'pennington', kind: 'FEEDER', name: 'Pennington and Hopewell', minutes: 20, bearing: 340, note: 'Wealthy small towns of bored private-school and rural kids.' },
    { id: 'hightstown', kind: 'FEEDER', name: 'Hightstown and East Windsor', minutes: 25, bearing: 80, note: 'A small borough and its suburb to the east.' },
    { id: 'lambertville', kind: 'FEEDER', name: 'Lambertville and New Hope', minutes: 25, bearing: 320, note: 'A tiny arts-and-antiques river town pair.' },
    { id: 'mount-holly', kind: 'FEEDER', name: 'Mount Holly and Burlington', minutes: 30, bearing: 185, note: 'Small county-seat and river towns to the south.' },
    { id: 'wrightstown', kind: 'FEEDER', name: 'Wrightstown and Pemberton', minutes: 30, bearing: 125, note: 'Base towns: young enlisted people with weekends.' },
    { id: 'freehold', kind: 'FEEDER', name: 'Freehold', minutes: 35, bearing: 100, note: 'A big suburban and horse-farm county seat toward the shore.' },
    { id: 'flemington', kind: 'FEEDER', name: 'Flemington', minutes: 40, bearing: 350, note: 'A small county seat in farm country.' },
    { id: 'toms-river', kind: 'FEEDER', name: 'Toms River and Brick', minutes: 50, bearing: 120, note: 'A large shore suburb with strong bands; kids drive inland for shows.' },
    { id: 'camden', kind: 'PEER', name: 'Camden', minutes: 45, bearing: 210, scene: 600, note: 'A poor city in Philadelphia\'s shadow; the two towns share some crowds.' },
    { id: 'new-brunswick', kind: 'PEER', name: 'New Brunswick', minutes: 45, bearing: 45, scene: 1500, note: 'A big university town with a long basement tradition; Trenton kids go there more than the reverse.' },
    { id: 'wilmington-de', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 70, bearing: 225, scene: 700, slug: 'wilmington-de', note: 'A smaller post-industrial city down I-95.' },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', state: 'PA', minutes: 75, bearing: 335, slug: 'allentown-pa', note: 'A post-industrial peer up I-78 with its own scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Mill Hill', route: 'downtown', note: 'Government offices and old brick rowhouses by the creek; dead after work hours.' },
    { id: 'chambersburg', name: 'Chambersburg', route: 'old-side', note: 'Rowhouses, social clubs and parish halls; once Italian, now heavily Latino. Church halls and basements.' },
    { id: 'north-trenton', name: 'North Trenton and Five Points', route: 'work-side', note: 'Mixed rowhouses and small commercial space toward Route 1; cheap and mostly ignored.' },
    { id: 'east-trenton', name: 'East Trenton', route: 'work-side', note: 'Working-class blocks with many vacant houses and empty buildings; hard on out-of-town kids.' },
    { id: 'west-trenton', name: 'West Trenton and Cadwalader Heights', route: 'old-side', note: 'The quiet, leafy side with big old houses, porches and a park.' },
    { id: 'hiltonia', name: 'Hiltonia and Villa Park', route: 'old-side', note: 'Twins and single houses along the township line; yards, garages and basements.' },
    { id: 'riverfront', name: 'the riverfront and station', route: 'downtown', note: 'Ballpark, arena and trains: a pass-through place where game days snarl parking.' },
    { id: 'hamilton-side', name: 'Hamilton and Ewing, over the line', route: 'campus', note: 'Finished basements, two-car garages and the college side of the suburbs.' }
  ],

  rooms: [
    { id: 'hamilton-basement', kind: 'HOUSE', hood: 'hamilton-side', cap: 50, curfew: 1350, start: true, note: 'A finished basement in a suburban house over the line. Four to six bands, word of mouth, and the neighbors are the risk.' },
    { id: 'hiltonia-twin', kind: 'HOUSE', hood: 'hiltonia', cap: 40, curfew: 1350, note: 'An old twin with a basement and a yard on the township line. Quiet until the neighbors are not.' },
    { id: 'rowhouse-basement', kind: 'HOUSE', hood: 'chambersburg', cap: 40, curfew: 1320, pressure: 55, note: 'A brick rowhouse basement with one stairway out. That stairway is the whole fire plan.' },
    { id: 'parish-hall', kind: 'HALL', hood: 'chambersburg', cap: 150, curfew: 1320, rent: 150, owner: 'HALL_MANAGER', note: 'A parish or social-club hall. Cheap rent, the bar stays shut, and the old clubs have their own users.' },
    { id: 'north-storefront', kind: 'DIY', hood: 'north-trenton', cap: 100, curfew: 1380, pressure: 55, needs: ['VOUCH'], note: 'A storefront or a warehouse corner in the empty industrial blocks. Code and the landlord are the threats.' },
    { id: 'record-coffee', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1260, note: 'A record and coffee shop that has hosted a benefit show. Afternoon and early-evening bills only.' },
    { id: 'bar-basement', kind: 'BAR', hood: 'downtown', cap: 80, ages: ['A18'], curfew: 1500, ac: false, soundFee: 40, pressure: 55, note: 'A tiny, hot basement under a dive bar. Punk, hardcore and hip-hop nights, and the owner and the license decide everything.' },
    { id: 'river-ballroom', kind: 'CLUB', hood: 'riverfront', cap: 300, ages: ['A18'], curfew: 1440, note: 'A hotel or bar ballroom near the station. Nothing here yet, but the room is plausible.' },
    { id: 'river-arena', kind: 'BIG', hood: 'riverfront', cap: 7000, ages: ['ALL'], curfew: 1380, note: 'The downtown arena by the river. Only for the one big weekend.' },
    { id: 'suburban-bar', kind: 'BAR', hood: 'hamilton-side', cap: 120, ages: ['A21'], curfew: 1500, note: 'A back room at a suburban bar. Twenty-one and over, and the kids are shut out.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'west-trenton', cap: 200, curfew: 1200, outdoor: true, rent: 20, note: 'A pavilion in the park on a summer afternoon. The city has its own programming, and you need a permit.' }
  ],

  contacts: ['philadelphia', 'new-york', 'allentown-pa', 'reading-pa', 'atlantic-city-nj'],

  calendar: [
    { id: 'july-parade', label: 'the Independence Day parade weekend', tag: 'parade', month: 7, week: 1, dows: [4, 5, 6], can: [.88, .88, .90], hoods: ['downtown'], elsewhere: [.97, .97, .97] },
    { id: 'guatemala-day', label: 'the September independence celebration', tag: 'festival', month: 9, week: 3, dows: [5, 6], can: [.92, .90, .90], hoods: ['chambersburg'], elsewhere: [1, 1, 1] },
    { id: 'baseball-jun', label: 'minor-league baseball', tag: 'game', month: 6, weeks: [1, 4], dows: [4, 5], can: [.95, .95, .95], hoods: ['riverfront', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'baseball-jul', label: 'minor-league baseball', tag: 'game', month: 7, weeks: [2, 4], dows: [4, 5], can: [.95, .95, .95], hoods: ['riverfront', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1259, weekend: 1259, inForce: false } },

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 20000000 },
    { name: 'Asbury Park', state: 'NJ', lat: 40.22, lon: -74.01, pop: 15000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 }
  ],
  roads: ['I-95', 'I-295', 'US 1', 'Route 29', 'Route 33', 'NJ Turnpike'],

  words: {
    street: ['Route 29', 'Route 33', 'Route 130', 'Calhoun Street', 'Hamilton Avenue', 'Broad Street'],
    water: ['the Delaware', 'the Assunpink', 'the Delaware and Raritan Canal'],
    hood: ['Chambersburg', 'Mill Hill', 'Cadwalader Heights', 'Hiltonia', 'Villa Park', 'Five Points', 'Hamilton', 'Ewing'],
    thing: ['tomato pie', 'pork roll', 'jughandle', 'row house', 'twin', 'social club', 'hoagie', 'sub', 'social-club hall', 'toll bridge', 'flooded basement', 'finals week'],
    weather: ['nor\'easter', 'humidity']
  },

  events: [
    { id: 'TRENTON_NJ_FLEA_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], months: [4, 10] },
      telegraph: 'The big punk flea market takes the arena this weekend, and every kid on the list wants to be there.',
      title: 'Two places to be',
      body: 'The flea market weekend packs the arena and the streets around it on the same Saturday as your basement show, and everyone wants both.',
      options: [
        { id: 'LATE', label: 'Push doors back until the arena empties out', likely: 'The ones who want a night out come over late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'Doors went late, and the room filled after the arena let out.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the arena.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The casual crowd went to the arena, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date, which costs you trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'TRENTON_NJ_NINE_FIFTY_NINE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The curfew for kids under eighteen is one minute before ten, and the cops cruise the hall block.',
      title: 'The run for the cars',
      body: 'A hall show for the under-eighteens has to end with a run to the cars at the curb before the cops roll by.',
      options: [
        { id: 'SHORT', label: 'Finish by nine-thirty and get everyone out', likely: 'The sets are short, and the curb stays calm.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You finished early, and the kids were in cars before the patrol came by.' },
        { id: 'PARENTS', label: 'Have the parents wait at the door at nine-forty-five', likely: 'Half the room leaves before the last band.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'Parents lined the door, and the room thinned before the headliner.' },
        { id: 'ACCEPT', label: 'Run it long and risk it', likely: 'Some kids will not make it home in time.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The kids ran for the cars after the last song, and nobody got stopped.' }
      ] },

    { id: 'TRENTON_NJ_AIRLESS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The basement under the bar is airless in July, and the forecast says ninety-five.',
      title: 'The basement is airless',
      body: 'The room under the bar has no air and the heat is climbing. A fan gets heat sick near the front, and the owner has to decide whether to open the street door.',
      options: [
        { id: 'OPEN', label: 'Open the street door and let the noise out', likely: 'It\'s cooler, but louder to the neighbors.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The street door stood open all night. The room cooled, and the neighbors heard every song.' },
        { id: 'WATER', label: 'Hand out water and run a short bill', likely: 'It\'s a short night, but nobody falls over.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'You handed out water by the case and cut the bill short, and everyone stayed upright.' },
        { id: 'ACCEPT', label: 'Run it hot and hope', likely: 'The kids who came will sweat through it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'It was brutal. The ones who stayed loved it, and the rest went home.' }
      ] }
  ]
});
