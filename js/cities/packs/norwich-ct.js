SB.Cities.register('norwich-ct', {
  v: 1,
  slug: 'norwich-ct',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['norwich free academy', 'nfa', 'backus hospital', 'william w. backus hospital', 'norwich public utilities', 'three rivers community college',
           'uconn', 'university of connecticut', 'eastern connecticut state', 'connecticut college', 'coast guard academy', 'naval submarine base', 'sub base',
           'mohegan sun', 'foxwoods', 'mashantucket pequot', 'mohegan tribal', 'norwich bulletin', 'the day of new london', 'seat bus', 'norwich transportation center',
           'dunkin\'', 'dunkin', 'narragansett', 'wesleyan', 'vfw', 'american legion', 'knights of columbus', 'elks lodge', 'harbor day', 'rose of new england',
           'shetucket social hall', 'yantic falls room', 'the bean hill grange', 'bean hill grange', 'thamesville rod and gun', 'greeneville polish annex',
           'taftville loading dock', 'the chelsea back room', 'laurel hill boiler house', 'occum mill annex', 'the rose city lanes', 'rose city lanes',
           'east plains fire hall', 'the upstairs at franklin square',
           'rose arts festival', 'rose arts races', 'rock the docks', 'norwich winter festival', 'winter festival parade', 'norwich harbor fireworks', 'harbor fireworks',
           'greater norwich chamber duck race', 'gnacc', 'greater norwich area chamber of commerce', 'dodd stadium', 'chelsea parade park', 'howard brown park',
           'howard t. brown park', 'norwichtown green', 'mohegan park', 'norwich tech', 'norwich technical high school', 'norwich sports hall of fame',
           'norwich events organization', 'macaroni kid', 'eventbrite', 'bandsintown', 'songkick', 'daily campus', 'uconn daily campus', 'hartford courant',
           'new haven independent', 'connecticut department of consumer protection', 'dcp liquor control'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real schools, casinos, press and clubs are written only in generic form. */
  blocklist: ['norwich bulletin*', 'foxwoods*', 'mohegan sun*', 'norwich free*', 'rose city lanes*', 'shetucket social*', 'bean hill grange*'],

  blurb: ['A small old mill city at the head of the Thames River, where a night that happens feels like a small win.',
          'Halls, basements and yards stand in for the clubs it never had, and most nights are a borrowed room and a long drive home.'],
  hard: 'Few rooms, liquor permits and neighbors; everything is borrowed.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41 },
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Norwich' },
    { id: 'new-london', kind: 'FEEDER', name: 'New London', minutes: 20, bearing: 190, note: 'The harbor town just south: the arty sibling, where Norwich kids go for shows.' },
    { id: 'lisbon-sprague', kind: 'FEEDER', name: 'Lisbon and Sprague', minutes: 15, bearing: 30, note: 'Tiny mill villages up the Shetucket; kids come to Norwich for everything.' },
    { id: 'griswold', kind: 'FEEDER', name: 'Griswold and Jewett City', minutes: 20, bearing: 55, note: 'A small working-class mill borough up Route 12.' },
    { id: 'groton', kind: 'FEEDER', name: 'Groton', minutes: 25, bearing: 170, note: 'A submarine-base town with a transient young crowd.' },
    { id: 'colchester', kind: 'FEEDER', name: 'Colchester', minutes: 25, bearing: 280, note: 'An exurban commuter town with kids who have cars and basements.' },
    { id: 'willimantic', kind: 'FEEDER', name: 'Willimantic', minutes: 30, bearing: 335, note: 'A mill and college town with a scene of its own; the closest neighbor in spirit.' },
    { id: 'plainfield', kind: 'FEEDER', name: 'Plainfield and Canterbury', minutes: 30, bearing: 45, note: 'The quiet-corner farm and old-mill towns; kids drive in for shows.' },
    { id: 'mystic', kind: 'FEEDER', name: 'Stonington and Mystic', minutes: 35, bearing: 135, note: 'A tourist seaport and beach towns to the southeast.' },
    { id: 'storrs', kind: 'FEEDER', name: 'Storrs', minutes: 40, bearing: 340, note: 'The big state university: student bands and a taste for house shows.' },
    { id: 'middletown', kind: 'PEER', name: 'Middletown', minutes: 45, bearing: 285, note: 'A college town of similar size with a bigger arts crowd.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 65, bearing: 10, slug: 'worcester-ma', note: 'A real hardcore and metal hub, an hour up I-395.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 70, bearing: 245, slug: 'new-haven-ct', note: 'Down the shoreline on I-95; a bigger scene and a standard tour stop.' }
  ],

  hoods: [
    { id: 'chelsea', name: 'Chelsea and downtown', route: 'downtown', note: 'Brick blocks on a steep hill above the harbor, with vacant upper floors and landlords who want tenants who can pass inspection.' },
    { id: 'norwichtown', name: 'Norwichtown', route: 'old-side', note: 'The old settlement around the green: big old houses, church basements and halls, and neighbors who call.' },
    { id: 'taftville', name: 'Taftville', route: 'work-side', note: 'A mill village on the Shetucket with a big old mill complex, low rents and a village identity of its own.' },
    { id: 'greeneville', name: 'Greeneville', route: 'work-side', note: 'Dense triple-deckers and corner halls along the river; cheap, working-class and ignored.' },
    { id: 'thamesville', name: 'Thamesville and Laurel Hill', route: 'work-side', note: 'Riverside industrial land: warehouses, garages and practice rooms, with little pressure.' },
    { id: 'the-plains', name: 'East Great Plains and Yantic', route: 'campus', note: 'Quiet single-family edges with finished basements and yards; suburbanizing.' },
    { id: 'occum', name: 'Occum and the northern villages', route: 'old-side', note: 'Semi-rural barns and backyards far up the Shetucket.' }
  ],

  contacts: ['worcester-ma', 'new-haven-ct', 'providence', 'hartford'],

  calendar: [
    { id: 'park-fest', label: 'the downtown park festival', tag: 'festival', month: 6, weeks: [2, 3], dows: [5], can: [.88, .85, .85], hoods: ['chelsea'], elsewhere: [1, .97, .97] },
    { id: 'concert-series', label: 'the free summer concerts', tag: 'festival', month: 7, weeks: [2, 4], dows: [3], can: [.92, .90, .90], hoods: ['chelsea'], elsewhere: [1, 1, 1] },
    { id: 'july-fireworks', label: 'the July fireworks', tag: 'holiday', month: 7, week: 1, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .88, .88], hoods: ['chelsea'], elsewhere: [1, .97, .97] },
    { id: 'fall-fair', label: 'the fall family fair', tag: 'fair', month: 10, week: 1, dows: [5], can: [.92, .92, .92] },
    { id: 'football-fri', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [4], can: [.88, .95, .95] },
    { id: 'rivalry-day', label: 'the Thanksgiving-morning football game', tag: 'game', month: 11, week: 4, dows: [3], can: [.85, .88, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'winter-parade', label: 'the winter parade', tag: 'parade', month: 12, weeks: [1, 2], dows: [5, 6], can: [.90, .88, .88], hoods: ['chelsea'], elsewhere: [1, 1, 1] }
  ],


  points: [
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 190000 },
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 120000 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 20000000 }
  ],
  roads: ['I-395', 'I-95', 'Route 2', 'Route 12', 'Route 32', 'Route 97'],

  words: {
    street: ['Route 2', 'Route 12', 'Route 32', 'Route 169', 'Main Street', 'Franklin Square', 'West Town Street'],
    water: ['the Thames', 'the Yantic', 'the Shetucket', 'the Quinebaug'],
    hood: ['Chelsea', 'Norwichtown', 'Bean Hill', 'Taftville', 'Greeneville', 'Occum', 'Thamesville', 'Laurel Hill', 'East Great Plains', 'Yantic'],
    thing: ['triple-decker', 'grinder', 'mill pond', 'mill village', 'rose garden', 'iced coffee', 'club hall', 'parish hall', 'van'],
    weather: ['nor\'easter', 'flood warning', 'black ice']
  },

  events: [
    { id: 'NORWICH_CT_PARK_STAGE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The downtown park is putting up a free stage this weekend, and the road is going to be shut.',
      title: 'The free stage across the street',
      body: 'Local bands are playing the park for nothing, the road is closed, and your kids are standing outside watching them, so your door is empty.',
      options: [
        { id: 'LATE', label: 'Push doors back until the park shuts down', likely: 'The people who want more come up the hill, late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at nine, and half the park walked up the hill still carrying their drinks.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Free music wins the early crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The free stage took the kids, and the hall had the regulars and a few strays.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] },

    { id: 'NORWICH_CT_HILL_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'A nor\'easter is coming up the coast, and the hill streets ice over first.',
      title: 'The van on the wrong hill',
      body: 'The storm shut the steep road to the hillside house. The van is stuck two valleys away, and the first band is walking.',
      options: [
        { id: 'SHORT', label: 'Run the short bill with whoever got there', likely: 'It\'s a thin night, but a warm one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was two bands and a long, loose night, and the people who could walk up came.' },
        { id: 'WAIT', label: 'Hold the doors for the van', likely: 'It\'s a late start, and some will leave.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van crawled in at ten with a plow behind it, so you started late, and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] },

    { id: 'NORWICH_CT_RIVALRY_DAY', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'game' },
      telegraph: 'The big football game is Thursday morning, and every family in town is booked for the whole day.',
      title: 'Thursday night, after dinner',
      body: 'The teenagers are at the game all morning, then at their grandmothers\' tables. A show that night only works if the doors wait until dinner is over.',
      options: [
        { id: 'LATE', label: 'Hold the doors until after dinner', likely: 'It\'s a late start, but the kids show up fed.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were at eight, and the kids came in loud and full and stayed until the hall closed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Dinner wins.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list was still at the table, and the bands played to the people who ran away early.' }
      ] }
  ]
});
