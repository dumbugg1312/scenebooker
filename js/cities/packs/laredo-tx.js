SB.Cities.register('laredo-tx', {
  v: 1,
  slug: 'laredo-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['washington\'s birthday celebration', 'jalapeno festival', 'jamboozie', 'sister cities festival', 'border olympics', 'texas a&m international university', 'tamiu',
           'texas a&m', 'laredo college', 'fort mcintosh', 'border patrol', 'tabc', 'whataburger', 'h-e-b', 'topo chico', 'tecate', 'carta blanca', 'laredo morning times',
           'laredos', 'el manana', 'laredo sun', 'kjbz', 'kbdr', 'klnt', 'knex', 'kgns', 'laredo isd', 'united isd', 'el metro', 'greyhound', 'vfw', 'american legion',
           'laughlin air force base', 'laughlin', 'society of martha washington', 'princess pocahontas', 'dustdevils',
           'salon mesquite', 'the laydown yard', 'patio cuatro', 'bodega ochenta y tres', 'el cuarto fresco', 'casita zacate', 'the weigh station', 'tarima seca',
           'salon norte', 'cinder block hall', 'casa mojada', 'the brush line'],
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

  contacts: ['corpus-christi-tx', 'brownsville-tx', 'el-paso-tx'],

  points: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 2600000 },
    { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23, pop: 870000 },
    { name: 'Eagle Pass', state: 'TX', lat: 28.71, lon: -100.5, pop: 28000 },
    { name: 'Del Rio', state: 'TX', lat: 29.36, lon: -100.9, pop: 35000 }
  ],
  roads: ['I-35', 'US 83', 'US 59', 'I-69W', 'Highway 359', 'Loop 20'],

  words: {
    street: ['San Bernardo', 'Loop 20', 'Mines Road', 'San Dario', 'Saunders', 'Bob Bullock Loop'],
    water: ['the Rio Grande', 'Falcon Lake'],
    hood: ['El Barrio Azteca', 'the Heights', 'Del Mar', 'Nye', 'San Isidro', 'Mines Road', 'Rio Bravo', 'El Cenizo'],
    thing: ['carport', 'patio', 'raspa', 'elote cart', 'taco stand', 'quinceanera hall', 'truck bed', 'cinder-block wall', 'tia\'s kitchen', 'cousin across the river'],
    weather: ['triple digits', 'norther', 'dust']
  }
});
