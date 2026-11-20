SB.Cities.register('longview-tx', {
  v: 1,
  slug: 'longview-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['kilgore college', 'letourneau university', 'letourneau', 'ut tyler', 'university of texas at tyler', 'tyler junior college', 'wiley university',
           'wiley college', 'east texas baptist university', 'etbu', 'stephen f. austin', 'stephen f. austin state university', 'sfa', 'eastman',
           'komatsu', 'aaon', 'trinity rail', 'kito-crosby', 'gap distribution', 'whataburger', 'waffle house', 'dairy queen', 'taco bell',
           'dr pepper', 'big red', 'topo chico', 'longview news-journal', 'news-journal', 'kltv', 'ketk', 'great texas balloon race',
           'balloon race capital', 'balloon race', 'lobos', 'lobo', 'texas eagle', 'amtrak', 'yamboree', 'tabc', 'vfw', 'american legion',
           'moose lodge', 'elks', 'east texas state fair', 'pine tree high', 'spring hill isd', 'pine tree isd', 'longview isd', 'hallsville isd',
           'the loop annex', 'greggton hall', 'the fellowship room', 'piney woods lodge', 'the big inch', 'fredonia pit', 'the pipeline room',
           'spring hill barn', 'the derrick', 'highway 80 social club', 'the dogwood basement', 'balloon field garage'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['whataburger*', 'news-journal*', 'kltv*', 'ketk*', 'letourneau*', 'balloon race*', 'waffle house*', 'dr pepper*'],

  blurb: ['Garages and fellowship halls in the pines, built by a few stubborn kids. Friday football eats the crowd and graduation eats the band.',
          'Church, family and neighbors set the schedule, and every room is borrowed.'],
  hard: 'Church, football and no basements; every room is borrowed and the neighbors know you.',
  region: 'East Texas',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Shreveport', state: 'LA', lat: 32.53, lon: -93.75 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Longview' },
    { id: 'white-oak', kind: 'FEEDER', name: 'White Oak', minutes: 10, bearing: 270, note: 'A bedroom town next door with no scene of its own; kids go to Longview.' },
    { id: 'kilgore', kind: 'FEEDER', name: 'Kilgore', minutes: 15, bearing: 255, note: 'A junior-college town with a small youth scene; the first name a local says.', bands: 2 },
    { id: 'hallsville', kind: 'FEEDER', name: 'Hallsville', minutes: 15, bearing: 85, note: 'A football-first town to the east; teens come in for everything.' },
    { id: 'gladewater', kind: 'FEEDER', name: 'Gladewater', minutes: 20, bearing: 285, note: 'An antiques-and-small-town stop; a tiny scene at most.' },
    { id: 'marshall', kind: 'FEEDER', name: 'Marshall', minutes: 30, bearing: 80, note: 'The old rival to the east, with its own tiny scene; the natural town over.', bands: 1 },
    { id: 'henderson', kind: 'FEEDER', name: 'Henderson', minutes: 40, bearing: 195, note: 'Oil-and-timber county seat; church and bar bands.' },
    { id: 'gilmer', kind: 'FEEDER', name: 'Gilmer', minutes: 40, bearing: 320, note: 'Farm and timber country to the northwest.' },
    { id: 'mount-pleasant', kind: 'FEEDER', name: 'Mount Pleasant', minutes: 60, bearing: 10, note: 'A growing poultry-and-county-seat town to the north.' },
    { id: 'carthage', kind: 'FEEDER', name: 'Carthage', minutes: 60, bearing: 150, note: 'A small oil-and-gas county seat to the southeast.' },
    { id: 'tyler', kind: 'PEER', name: 'Tyler', minutes: 55, bearing: 255, slug: 'tyler-tx', note: 'The fellow regional hub: a bit bigger and snootier, and the closest trade partner.' },
    { id: 'nacogdoches', kind: 'PEER', name: 'Nacogdoches', minutes: 90, bearing: 195, scene: 1500, note: 'A college town to the south with more scene than its size.' },
    { id: 'texarkana', kind: 'PEER', name: 'Texarkana', state: 'AR', minutes: 100, bearing: 20, scene: 1500, note: 'A twin city on the state line; an occasional trade.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A compact brick grid by the rail line with storefronts and a few weekend bars; civic money is arriving, so a room is tolerated until the building sells.' },
    { id: 'greggton', name: 'Greggton and the old US 80 side', route: 'work-side', note: 'Older ranch houses, shop bays and a tired commercial strip; carports and garages, cheap and ignored.' },
    { id: 'spring-hill', name: 'Spring Hill', route: 'old-side', note: 'Semi-rural north side with bigger lots, pole barns and backyards; the best yards in town and a long drive for kids without cars.' },
    { id: 'loop-belt', name: 'the Loop 281 retail belt', route: 'campus', note: 'Mall, big boxes and strip centers; empty bays can be rented on a handshake and an insurance rider.' },
    { id: 'south-side', name: 'south Longview', route: 'campus', note: 'Older rentals near the small private university and interstate motels; house shows and churn.' },
    { id: 'northeast', name: 'northeast Longview', route: 'work-side', note: 'Plant-family and older neighborhoods; church halls and community centers more than punk rooms.' }
  ],

  contacts: ['tyler-tx'],

  points: [
    { name: 'Shreveport', state: 'LA', lat: 32.53, lon: -93.75, pop: 390000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 7500000 },
    { name: 'Jackson', state: 'MS', lat: 32.3, lon: -90.18, pop: 590000 },
    { name: 'Denton', state: 'TX', lat: 33.21, lon: -97.13, pop: 140000 }
  ],
  roads: ['I-20', 'US 80', 'US 259', 'SH 31', 'Loop 281', 'I-30'],

  words: {
    street: ['Judson Road', 'Mobberly Avenue', 'Fredonia Street', 'Highway 80', 'Loop 281'],
    water: ['the Sabine', 'Lake Cherokee'],
    hood: ['Greggton', 'Spring Hill', 'Lakeport', 'White Oak', 'Hallsville'],
    thing: ['pumpjack', 'pole barn', 'pickup', 'catfish', 'pine tree', 'box fan', 'storage row', 'fellowship hall', 'extension cord', 'stadium lights', 'chain breakfast', 'fellowship hall', 'extension cord', 'stadium lights', 'chain breakfast'],
    weather: ['severe thunderstorm', 'ice storm', 'heat index']
  }
});
