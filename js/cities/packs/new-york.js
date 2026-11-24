SB.Cities.register('new-york', {
  v: 1,
  slug: 'new-york',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['nyu', 'new york university', 'columbia university', 'pratt', 'the new school', 'cuny', 'brooklyn college', 'hunter college', 'suny', 'rutgers', 'new paltz',
           'mta', 'nj transit', 'metro-north', 'long island rail road', 'lirr', 'fdny', 'nypd', 'office of nightlife', 'cabaret law', 'west indian day parade', 'us open',
           'nyc marathon', 'new york city marathon', 'mets', 'yankees', 'citi field', 'yankee stadium', 'corcoran', 'wnyc', 'vfw', 'american legion', 'hurricane sandy',
           'superstorm sandy', 'sandy', 'congestion pricing', 'billyburg',
           'the wyckoff annex', 'halsey street cellar', 'troutman hall', 'the knickerbocker back room', 'knickerbocker back room', 'grandview storage', 'the metropolitan basement',
           'cooper park social club', 'stanwix warehouse', 'the himrod room', 'starr street hall', 'central avenue garage', 'the wilson ave. annex', 'wilson ave. annex',
           'vandervoort loft', 'seneca street social', 'the catalpa room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 2012 flood is 'the '12 storm' in game text. */
  blocklist: ['cabaret law*', 'west indian day*', 'nyc marathon*', 'office of nightlife*', 'lirr*', 'fdny*', 'nypd*', 'wnyc*'],

  blurb: ['It\'s dense, fast and loud, with kids riding the train to a show and carrying their own gear up a flight of stairs, and the bills are short and stacked.',
          'Licensed back rooms and fragile basements live side by side, and the landlord wins in the end.'],
  hard: 'Rent and neighbors kill rooms fast; stairs, tolls and parking eat the guarantee.',
  region: 'the Northeast corridor',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  scene: { traffic: 1.0 },

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Hardcore and metal have shared the same floors in the outer boroughs for forty years.' },
    { fan: 'metal', band: 'hardcore', d: .08, reason: 'Hardcore and metal have shared the same floors in the outer boroughs for forty years.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'New York' },
    { id: 'staten-island', kind: 'FEEDER', name: 'Staten Island', minutes: 40, bearing: 215, lean: ['hardcore', 'metal'], bands: 3, beyond: 'crossings',
      note: 'Car country with its own loyal metal and hardcore crowd; the bridge and the ferry make it feel like another state.' },
    { id: 'newark', kind: 'FEEDER', name: 'Newark and Montclair', state: 'NJ', minutes: 40, bearing: 265, beyond: 'crossings',
      note: 'Close suburbs and small cities. Most kids just take the commuter train in.' },
    { id: 'long-island', kind: 'FEEDER', name: 'Long Island', minutes: 60, bearing: 100, scene: 400, lean: ['hardcore', 'pop-punk'], bands: 5,
      note: 'Endless suburbs with an enormous supply of kids and a hardcore and pop-punk tradition. They take the late train home or sleep on the floor.' },
    { id: 'stamford', kind: 'FEEDER', name: 'Stamford and Bridgeport', state: 'CT', minutes: 60, bearing: 30,
      note: 'A corporate suburb and a struggling port city on the interstate; some kids drive in.' },
    { id: 'asbury', kind: 'FEEDER', name: 'Asbury Park and the Jersey Shore', state: 'NJ', minutes: 80, bearing: 205, season: { months: [6, 7, 8], mul: 1.3 },
      note: 'Beach towns with a music tradition and a seasonal crowd.' },
    { id: 'trenton', kind: 'FEEDER', name: 'Trenton', state: 'NJ', minutes: 80, bearing: 235, note: 'An old industrial state capital between here and Philadelphia, with a modest scene.' },
    { id: 'poughkeepsie', kind: 'FEEDER', name: 'Poughkeepsie and Newburgh', minutes: 90, bearing: 5, beyond: 'crossings',
      note: 'Small struggling river cities up the Hudson where teenagers treat the city as the destination.' },
    { id: 'allentown', kind: 'FEEDER', name: 'Allentown and Bethlehem', state: 'PA', minutes: 90, bearing: 270, note: 'Steel and mill towns with basements and clubs; kids drive in on I-78.' },
    { id: 'new-brunswick', kind: 'PEER', name: 'New Brunswick', state: 'NJ', minutes: 60, bearing: 240, scene: 1500,
      note: 'A college city with a famous all-ages basement scene of its own.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', state: 'CT', minutes: 100, bearing: 40, slug: 'new-haven-ct', note: 'A college and arts city whose kids visit often.' },
    { id: 'philadelphia', kind: 'PEER', name: 'Philadelphia', state: 'PA', minutes: 110, bearing: 235, slug: 'philadelphia', note: 'A big scene of its own: a competitor and a friend.' }
  ],

  chokepoints: [
    { id: 'crossings', name: 'the bridges and tunnels', p: .03 }
  ],

  hoods: [
    { id: 'bushwick', name: 'Bushwick', route: 'work-side', note: 'Old brick factories, warehouses and rowhouses; the densest concentration of rooms in the city, and rents to match.' },
    { id: 'ridgewood', name: 'Ridgewood', route: 'old-side', note: 'Quiet brick rowhouses just over the Queens line, with basements and storefronts and an underground spine.' },
    { id: 'williamsburg', name: 'Williamsburg and Greenpoint', route: 'downtown', note: 'Where the warehouse boom started; now towers and hotels, a few legit bars, and a permanent myth.' },
    { id: 'east-williamsburg', name: 'East Williamsburg', route: 'work-side', note: 'Auto shops, cold storage and practice buildings behind fences. Loud rooms live here until the towers arrive.' },
    { id: 'gowanus', name: 'Gowanus and Sunset Park', route: 'work-side', note: 'Canal-side warehouses and big waterfront buildings; artist lofts and rehearsal studios, heating up fast.' },
    { id: 'central-brooklyn', name: 'Crown Heights and Bed-Stuy', route: 'old-side', note: 'Brownstones and rowhouses with parlor floors and backyards; friction over noise and displacement.' },
    { id: 'lower-east-side', name: 'the Lower East Side and East Village', route: 'downtown', note: 'Tiny bars with back rooms and the legend; priced out of nearly everything else.' },
    { id: 'queens-west', name: 'Long Island City and Astoria', route: 'campus', note: 'Immigrant districts with industrial blocks, storefronts and warehouse shows, slowly heating.' },
    { id: 'bronx', name: 'the Bronx', route: 'work-side', note: 'Cheap warehouses and hall rentals, an old hardcore tradition, and waterfront rents starting to rise.' },
    { id: 'staten-hood', name: 'Staten Island', route: 'campus', note: 'Basements, garages and halls for a loyal metal and hardcore crowd the rest of the city ignores.' }
  ],

  rooms: [
    { id: 'ridgewood-basement', kind: 'HOUSE', hood: 'ridgewood', cap: 45, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A low basement under a rowhouse. Thirty to sixty sweating people, and upstairs neighbors who can hear every kick.' },
    { id: 'bushwick-loft', kind: 'DIY', hood: 'bushwick', cap: 150, rent: 90, deposit: 0, pa: .6, curfew: 1500, ac: false, outdoor: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A warehouse loft with a freight elevator. A window of a year or two before the landlord, a neighbor or the inspector notices.' },
    { id: 'east-wburg-practice', kind: 'DIY', hood: 'east-williamsburg', cap: 90, rent: 70, deposit: 0, pa: .6, curfew: 1440, ac: false, outdoor: false, sketch: 40,
      standing: [55, 60, 45], pressure: 55, needs: ['VOUCH'], note: 'A practice-space building where a party in a soundproofed room is the usual show.' },
    { id: 'gowanus-warehouse', kind: 'DIY', hood: 'gowanus', cap: 130, rent: 100, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A canal-side warehouse bay. Cheap until the rezoning catches up.' },
    { id: 'bed-stuy-yard', kind: 'OUTDOOR', hood: 'central-brooklyn', cap: 60, rent: 10, pa: .4, curfew: 1320, sketch: 25, standing: [60, 55, 40],
      note: 'A rowhouse backyard with an extension cord from the kitchen. Summer only; the neighbors on four sides are the whole problem.' },
    { id: 'bronx-hall', kind: 'HALL', hood: 'bronx', cap: 150, rent: 180, deposit: 75, pa: .5, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented hall in the Bronx. A flat fee, folding chairs, and no sale of drinks.' },
    { id: 'staten-garage', kind: 'HOUSE', hood: 'staten-hood', cap: 55, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 40,
      note: 'A basement and garage in a Staten Island house. Easier on neighbors, a long way from everywhere.' },
    { id: 'les-backroom', kind: 'BAR', hood: 'lower-east-side', cap: 120, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar with a back room and a stage. Matinees for kids, wristbands for the over-21s.' },
    { id: 'bushwick-bar', kind: 'BAR', hood: 'bushwick', cap: 200, soundFee: 80, pa: .7, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .4, sketch: 10,
      standing: [50, 65, 70], note: 'A licensed room with a basement stage, one of the new ones replacing the warehouses. The band is paid off a bar tab.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'central-brooklyn', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record shop with an afternoon set. Free or donation, over by seven.' },
    { id: 'williamsburg-club', kind: 'CLUB', hood: 'williamsburg', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A legal club with a door guy and a real PA. Wants six weeks and a draw.' }
  ],

  contacts: ['philadelphia', 'new-haven-ct', 'trenton-nj', 'poughkeepsie-ny'],

  weather: { preset: 'NORTHEAST', storm: { months: [6, 7, 8, 9, 10, 11, 12, 1, 2, 3], peak: [1, 2, 8, 9], perWeek: .015, perWeekPeak: .04 } },

  calendar: [
    { id: 'island-parade', label: 'the Labor Day parade', tag: 'parade', month: 9, week: 1, dows: [0], can: [.80, .75, .75], hoods: ['central-brooklyn'], elsewhere: [.92, .90, .92] },
    { id: 'tennis', label: 'the tennis tournament', tag: 'festival', month: 9, week: 1, dows: [4, 5, 6], can: [.95, .92, .92], hoods: ['queens-west'], elsewhere: [1, 1, 1] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 11, week: 1, dows: [5, 6], can: [.90, .88, .88], hoods: ['central-brooklyn', 'staten-hood'], elsewhere: [.98, .98, .98] },
    { id: 'pride', label: 'Pride weekend', tag: 'festival', month: 6, week: 4, dows: [5, 6], can: [.95, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'new-years', label: 'New Year\'s Eve', tag: 'holiday', month: 12, week: 5, dows: [0, 1, 2, 3, 4, 5, 6], can: [.90, .92, .95] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 1200000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 1700000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 900000 }
  ],
  roads: ['I-278', 'I-495', 'I-95', 'I-78', 'the Verrazzano Bridge', 'the Brooklyn-Queens Expressway'],

  words: {
    street: ['Wyckoff Avenue', 'Myrtle Avenue', 'Flushing Avenue', 'Bedford Avenue', 'Grand Street', 'Morgan Avenue', 'Johnson Avenue', 'Fulton Street', 'Eastern Parkway', 'Broadway', 'Jefferson Street', 'Knickerbocker Avenue'],
    water: ['the East River', 'the Gowanus Canal', 'Newtown Creek', 'the Hudson', 'the Narrows'],
    hood: ['Bushwick', 'Ridgewood', 'Williamsburg', 'Greenpoint', 'Gowanus', 'Sunset Park', 'Crown Heights', 'Bed-Stuy', 'Flatbush', 'Astoria', 'Mott Haven', 'Hunts Point', 'Alphabet City'],
    thing: ['bodega', 'stoop', 'railroad flat', 'brownstone', 'dollar slice', 'tall boy', 'alternate-side parking', 'freight elevator', 'halal cart', 'fire escape', 'practice space', 'stair carry', 'matinee'],
    weather: ['heat wave', 'nor\'easter', 'slush', 'thunderstorm'],
    surnames: ['Rodriguez', 'Kowalski', 'Chen', 'Okafor', 'Rosario', 'Brennan', 'Petrov', 'Williams']
  },

  events: [
    { id: 'NEW_YORK_NOISE_CALL', when: 'NIGHT', tier: 'REAL', weight: 3, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 0] },
      telegraph: 'The neighbors upstairs have been giving you looks all week.',
      title: 'Someone called the city',
      body: 'Mid-set, a neighbor calls the city complaint line about the drummer, and the whole block can hear the kick drum, so police are on the way.',
      options: [
        { id: 'QUIET', label: 'Cut the set short and go acoustic', likely: 'You keep the room but lose the night.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The set went quiet, the neighbor stopped calling, and the crowd stayed anyway.' },
        { id: 'TALK', label: 'Go knock on their door and talk', likely: 'It costs time, and it might win them over.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }],
          result: 'You stood at the stoop for twenty minutes, and by the end they asked to be on the list.' },
        { id: 'PLAY', label: 'Play on and hope', likely: 'It puts the room at risk.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The cops showed up before the last song, and now the room is on notice.' }
      ] },

    { id: 'NEW_YORK_HEAT_WAVE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast says a heat wave is coming, and the basement is already an oven.',
      title: 'The block loses power',
      body: 'A heat wave has knocked out power on the block, so the basement is a sauna and the amps are dead.',
      options: [
        { id: 'CANDLES', label: 'Go acoustic by candlelight', likely: 'It\'s small and strange, but people will remember it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'REGULARS', pct: .02 }],
          result: 'The whole bill played unplugged by candlelight, and it was a great night with half the usual crowd.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and that costs some trust.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, to when the power came back.' },
        { id: 'ROOF', label: 'Take it up to a roof with a generator', likely: 'It\'s cooler and louder, and a bigger risk.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A rented generator on the roof kept the night alive, and the super was not amused.' }
      ] },

    { id: 'NEW_YORK_LANDLORD_SELLS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 6] },
      telegraph: 'There are surveyors on the sidewalk outside the warehouse.',
      title: 'The building was sold',
      body: 'The warehouse was sold to a developer overnight, and the new owner wants everyone out in two weeks.',
      options: [
        { id: 'LASTSHOW', label: 'Throw one last big show', likely: 'You get a farewell crowd, and a lot of work.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'HOURS', d: -2, when: 'TODAY' }],
          result: 'The last night packed the floor with everybody who ever played there.' },
        { id: 'MOVEIT', label: 'Move it to a basement', likely: 'It\'s smaller and louder, with a wall of neighbors on the other side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'A rowhouse basement took the bill, and it was packed to the stairs.' },
        { id: 'DROP', label: 'Cancel and look for a new room', likely: 'It costs you the date and the bands\' patience.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 7, respect: false }],
          result: 'You pushed the show a week and went hunting for a room.' }
      ] },

    { id: 'NEW_YORK_TRAIN_SHUTDOWN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The subway line that feeds the neighborhood is shut for repairs this weekend.',
      title: 'The train is down',
      body: 'The line most of your crowd rides is shut for repairs and the replacement buses are crawling, so everyone has to detour, and the late train home is gone.',
      options: [
        { id: 'EARLIER', label: 'Move doors an hour earlier', likely: 'Most people make it, but the start is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .85, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You opened doors an hour early, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'You lose the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .4, beyond: true }],
          result: 'The detour was too much, and the outer-borough kids stayed home.' }
      ] }
  ]
});
