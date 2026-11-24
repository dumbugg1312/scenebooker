SB.Cities.register('laredo-tx', {
  v: 1,
  slug: 'laredo-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['washington\'s birthday celebration', 'jalapeno festival', 'jamboozie', 'sister cities festival', 'border olympics', 'texas a&m international university', 'tamiu',
           'texas a&m', 'laredo college', 'fort mcintosh', 'border patrol', 'tabc', 'whataburger', 'h-e-b', 'topo chico', 'tecate', 'carta blanca', 'laredo morning times',
           'laredos', 'el manana', 'laredo sun', 'kjbz', 'kbdr', 'klnt', 'knex', 'kgns', 'laredo isd', 'united isd', 'el metro', 'greyhound', 'vfw', 'american legion',
           'laughlin air force base', 'laughlin', 'society of martha washington', 'princess pocahontas', 'dustdevils',
           'salon mesquite', 'the laydown yard', 'patio cuatro', 'bodega ochenta y tres', 'el cuarto fresco', 'casita zacate', 'the weigh station', 'tarima seca',
           'salon norte', 'cinder block hall', 'casa mojada', 'the brush line',
           'washington\'s birthday celebration association', 'wbca', 'anheuser-busch', 'anheuser busch', 'youth parade under the stars', 'presidents\' cup',
           'laredo country club', 'sames auto arena', 'sames arena', 'casablanca event center', 'casa blanca ballroom', 'laredo center for the arts',
           'visit laredo', 'laredo convention and visitors bureau', 'laredo international sister cities festival', 'bandsintown', 'reverbnation',
           'north central park', 'laredo sector', 'cityrulelookup', 'municode', 'sector border patrol'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['whataburger*', 'h-e-b*', 'laredo morning times*', 'texas a&m*', 'laredo college*', 'washington\'s birthday*', 'jalapeno festival*'],

  blurb: ['A border-city scene in backyards and carports, where family feeds the bands and the heat sets the start time. Few rooms, loyal kids.',
          'Shows start late and run bilingual. Half the crowd has a cousin across the river, and a visiting band is an event.'],
  hard: 'Few rooms, a long empty drive, and a crowd that thins when the border gets tense.',
  region: 'South Texas',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Laredo' },
    { id: 'rio-bravo', kind: 'FEEDER', name: 'Rio Bravo and El Cenizo', minutes: 15, bearing: 160, note: 'Neighborhoods just south on the river; they supply a lot of kids.' },
    { id: 'encinal', kind: 'FEEDER', name: 'Encinal and Asherton', minutes: 30, bearing: 20, note: 'Tiny places on I-35 north; a rural bus reaches some of them.' },
    { id: 'zapata', kind: 'FEEDER', name: 'Zapata', minutes: 50, bearing: 135, note: 'A fishing and ranching town down US 83; Laredo is its big town.' },
    { id: 'cotulla', kind: 'FEEDER', name: 'Cotulla', minutes: 55, bearing: 20, note: 'An oil and hunting-lease town on I-35; touring vans pass through it.' },
    { id: 'hebbronville', kind: 'FEEDER', name: 'Hebbronville', minutes: 60, bearing: 80, note: 'A ranching town east on Highway 359.' },
    { id: 'freer', kind: 'FEEDER', name: 'Freer', minutes: 75, bearing: 65, note: 'A small oil town up Highway 359.' },
    { id: 'carrizo-springs', kind: 'FEEDER', name: 'Carrizo Springs', minutes: 85, bearing: 335, note: 'A farm and ranch town northwest on US 83.' },
    { id: 'eagle-pass', kind: 'PEER', name: 'Eagle Pass', minutes: 120, bearing: 325, scene: 350, note: 'A smaller border sibling; its kids sometimes drive down.' },
    { id: 'corpus-christi', kind: 'PEER', name: 'Corpus Christi', minutes: 150, bearing: 70, slug: 'corpus-christi-tx', note: 'The bigger bay city with an older rock scene; the beach city, a bit stuck up.' },
    { id: 'mcallen', kind: 'PEER', name: 'McAllen and Edinburg', minutes: 165, bearing: 120, scene: 1500, note: 'The Valley cluster, the nearest real group of towns.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the river', route: 'downtown', note: 'Old masonry storefronts and a plaza by the bridge; shoppers by day, empty after dark.' },
    { id: 'el-barrio', name: 'El Barrio Azteca', route: 'old-side', note: 'Old, dense and working-class, with small houses and corner stores. Backyards, carports and a corner hall.' },
    { id: 'the-heights', name: 'the Heights', route: 'old-side', note: 'Older houses and mature trees north of the core. Yard shows and a parish room.' },
    { id: 'south-laredo', name: 'South Laredo and the US 83 corridor', route: 'work-side', note: 'Poor and industrial along the rail yard and bridge approaches. Warehouses, auto shops and a flea-market lot.' },
    { id: 'mines-road', name: 'Mines Road and the northwest', route: 'work-side', note: 'Truck yards and distribution warehouses; any cheap space there is temporary.' },
    { id: 'del-mar', name: 'Del Mar and Nye', route: 'campus', note: 'Tract houses and strip malls. Garage bands and strip-center practice bays.' },
    { id: 'north-laredo', name: 'North Laredo', route: 'campus', note: 'New gated subdivisions and big-box stores; money, with few places for a show.' }
  ],

  rooms: [
    { id: 'barrio-carport', kind: 'HOUSE', hood: 'el-barrio', cap: 60, curfew: 1350, outdoor: true, ac: false, pressure: 45, start: true, note: 'A carport and backyard with the whole family in earshot. Fine until a neighbor calls after ten.' },
    { id: 'heights-yard', kind: 'HOUSE', hood: 'the-heights', cap: 50, curfew: 1320, outdoor: true, ac: false, pressure: 50, note: 'A yard show under old trees near a parish room. The neighbors are close and they talk.' },
    { id: 'tract-garage', kind: 'HOUSE', hood: 'del-mar', cap: 40, curfew: 1320, ac: false, pressure: 60, note: 'A garage in a tract subdivision. Complaints and a patrol car arrive faster here than in the old barrios.' },
    { id: 'auto-bay', kind: 'DIY', hood: 'south-laredo', cap: 120, curfew: 1380, ac: false, pressure: 60, needs: ['VOUCH'], note: 'A warehouse bay by the rail yard. Loud, hot and temporary, until the landlord or the fire marshal finds out.' },
    { id: 'practice-bay', kind: 'DIY', hood: 'del-mar', cap: 50, curfew: 1350, ac: true, pressure: 55, needs: ['VOUCH'], note: 'A strip-center practice bay used as a stage. The lease says no, and everybody knows it.' },
    { id: 'party-hall', kind: 'HALL', hood: 'el-barrio', cap: 150, curfew: 1380, ac: true, note: 'A rented hall built for quinceaneras. Weddings and parties get the weekends first, so you get what is left.' },
    { id: 'river-bar', kind: 'BAR', hood: 'downtown', cap: 200, curfew: 1500, ac: true, soundFee: 60, following: .3, standing: [50, 65, 70], note: 'A downtown bar with a small stage that gives metal its weekends. Houston and San Antonio bands drive down for it.' },
    { id: 'rock-lounge', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A18', 'A21'], curfew: 1500, ac: true, soundFee: 40, note: 'A small lounge that mixes rock nights in with everything else. Whoever checks IDs picks the crowd.' },
    { id: 'north-event-center', kind: 'CLUB', hood: 'north-laredo', cap: 300, ages: ['A18', 'A21'], curfew: 1470, ac: true, notice: 56, needs: ['FULL_BILL'], note: 'A north-side event center that rents by the night. Nice floor, and no patience for a loud band.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 2000, ac: true, curfew: 1380, note: 'The big arena by the river. Out of reach for a local band; a name to book against.' },
    { id: 'ranch-road-lot', kind: 'OUTDOOR', hood: 'mines-road', cap: 80, curfew: 1320, pressure: 30, note: 'A lot off a ranch road past the city limits. Nobody to complain but the heat and the trucks.' }
  ],

  contacts: ['corpus-christi-tx', 'san-antonio', 'mcallen-tx', 'brownsville-tx'],

  calendar: [
    { id: 'carnival', label: 'the carnival', tag: 'fair', month: 2, weeks: [2, 3], dows: [0, 1, 2, 3, 4, 5, 6], can: [.85, .80, .78], hoods: ['downtown'], elsewhere: [.95, .92, .90] },
    { id: 'big-parade', label: 'the big parade', tag: 'parade', month: 2, week: 3, dows: [5], can: [.78, .72, .70], hoods: ['downtown'], elsewhere: [.95, .92, .92] },
    { id: 'youth-parade', label: 'the youth parade at night', tag: 'parade', month: 2, week: 3, dows: [3], can: [.85, .85, .85], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'sister-cities', label: 'the border-cities summer festival', tag: 'festival', month: 7, week: 2, dows: [4, 5, 6], can: [.90, .88, .88] },
    { id: 'day-of-dead', label: 'the day-of-the-dead event', tag: 'holiday', month: 11, week: 1, dows: [4, 5, 6], can: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 2600000 },
    { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23, pop: 870000 },
    { name: 'Eagle Pass', state: 'TX', lat: 28.71, lon: -100.5, pop: 28000 },
    { name: 'Del Rio', state: 'TX', lat: 29.36, lon: -100.9, pop: 35000 }
  ],
  roads: ['I-35', 'US 83', 'US 59', 'I-69W', 'Highway 359', 'Loop 20'],

  events: [
    { id: 'LAREDO_TX_PARADE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The big parade is this weekend and the main street is already roped off.',
      title: 'No parking, no kids',
      body: 'The parade closes the main street through the afternoon and the carnival has the kids every night. Your show is a few blocks away, and the out-of-town visitors are wandering the streets.',
      options: [
        { id: 'LATE', label: 'Push doors back until the crowds thin out', likely: 'The visitors wander in, and it\'s a late start.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors went an hour late, and a few visitors wandered in off the street and stayed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Nobody can park and the kids are at the carnival.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The regulars walked in from a long way off, and the room was thin.' },
        { id: 'YARD', label: 'Move the bill to a yard away from downtown', likely: 'Smaller and easier to reach.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A backyard took the bill and the cousins came in by car, and it was loud and close.' }
      ] },

    { id: 'LAREDO_TX_NORTHER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], months: [11, 12, 1, 2] },
      telegraph: 'A norther is coming through, and the forecast drops twelve degrees by dark.',
      title: 'The carport in the wind',
      body: 'The temperature falls twelve degrees on show day and the wind comes straight through the carport. The crowd has to pick between the cold and the wall, and the first band plays in jackets.',
      options: [
        { id: 'HALL', label: 'Move inside to a rented hall', likely: 'Warm, but you pay and the hall has rules.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The hall took the bill, and it was warm and the folding chairs stayed stacked.' },
        { id: 'ACCEPT', label: 'Run it in the carport and hand out blankets', likely: 'A thin night, but the ones who came are loud.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'People wore jackets and their breath showed in the air, and the smaller crowd packed close together.' }
      ] },

    { id: 'LAREDO_TX_QUINCE_SEASON', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5], months: [4, 5, 6, 12] },
      telegraph: 'The hall owner called: quinceanera season, and every weekend is taken.',
      title: 'Quinceanera season',
      body: 'Parties fill every hall in town on the weekends. The owner will only give you the room on a Thursday.',
      options: [
        { id: 'THURSDAY', label: 'Take the Thursday', likely: 'It\'s a school night, so there are fewer kids and a calmer room.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'It was a Thursday in the party hall, and the ones who could stay up late did.' },
        { id: 'YARD', label: 'Keep the weekend and move it to a yard', likely: 'Smaller, and the family will feed everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A backyard, a cousin on the grill, and the weekend crowd.' }
      ] }
  ],

  words: {
    street: ['San Bernardo', 'Loop 20', 'Mines Road', 'San Dario', 'Saunders', 'Bob Bullock Loop'],
    water: ['the Rio Grande', 'Falcon Lake'],
    hood: ['El Barrio Azteca', 'the Heights', 'Del Mar', 'Nye', 'San Isidro', 'Mines Road', 'Rio Bravo', 'El Cenizo'],
    thing: ['carport', 'patio', 'raspa', 'elote cart', 'taco stand', 'quinceanera hall', 'truck bed', 'cinder-block wall', 'tia\'s kitchen', 'cousin across the river'],
    weather: ['triple digits', 'norther', 'dust']
  }
});
