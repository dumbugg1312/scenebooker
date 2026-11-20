SB.Cities.register('oxnard-ca', {
  v: 1,
  slug: 'oxnard-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['nardcore', 'the nard', 'naval base ventura county', 'seabee', 'seabees', 'point mugu', 'naval air station point mugu', 'california strawberry festival',
           'strawberry festival', 'salsa festival', 'reggae jam on the coast', 'reggae jam', 'tall ships festival', 'channel islands tall ships', 'csu channel islands',
           'cal state channel islands', 'oxnard college', 'cal lutheran', 'california lutheran', 'amazon', 'amtrak', 'metrolink', 'greyhound', 'union pacific',
           'thomas fire', 'henry t. oxnard historic district', 'carnegie art museum', 'river ridge field', 'ventura county fair', 'ventura county fairgrounds',
           'vfw', 'american legion', 'oxnard refinery',
           'the cold storage', 'quonset nine', 'fifth street annex', 'the packing shed', 'hueneme road hall', 'the drainage ditch', 'pallet yard',
           'salt air room', 'ranchito rec', 'the windbreak', 'lima bean lounge', 'tide table'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The regional hardcore scene, the base, colleges and festivals are written only in generic form. */
  blocklist: ['nardcore*', 'seabee*', 'strawberry festival*', 'reggae jam*', 'cold storage*', 'quonset nine*', 'lima bean lounge*', 'salt air room*'],

  blurb: ['A strawberry-field and Navy city on the Ventura County coast, northwest of Los Angeles, built on a flat plain of tract homes and old barrios.',
          'Everyone is somebody\'s cousin, the tacos come after the set, and the old heads still guard the early-80s hardcore the town made for itself. Shows live in garages, yards and back lots.'],
  hard: 'Garage and yard rooms only; noise calls and fog kill nights, and bands skip it.',
  region: 'the California coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Oxnard' },
    { id: 'port-hueneme', kind: 'FEEDER', name: 'Port Hueneme', minutes: 10, bearing: 200, note: 'The Navy town at the southwest edge, where the early shows were held in halls.' },
    { id: 'camarillo', kind: 'FEEDER', name: 'Camarillo', minutes: 15, bearing: 100, note: 'A suburb with outlet shopping and its own pop-punk and metal bands.' },
    { id: 'ventura', kind: 'FEEDER', name: 'Ventura', minutes: 20, bearing: 320, note: 'The county seat and beach town up the freeway: the bigger bar economy, rival and partner.' },
    { id: 'thousand-oaks', kind: 'FEEDER', name: 'Thousand Oaks', minutes: 30, bearing: 95, note: 'A wealthy suburb with no rooms of its own; its kids come to shows here.' },
    { id: 'santa-paula', kind: 'FEEDER', name: 'Santa Paula', minutes: 30, bearing: 45, note: 'A farm and citrus town up Highway 126; its kids come down for shows.' },
    { id: 'moorpark', kind: 'FEEDER', name: 'Moorpark', minutes: 35, bearing: 75, note: 'A suburb and farm town on Highway 118.' },
    { id: 'fillmore', kind: 'FEEDER', name: 'Fillmore', minutes: 40, bearing: 50, note: 'A small farm town with railroad heritage.' },
    { id: 'ojai', kind: 'FEEDER', name: 'Ojai', minutes: 40, bearing: 350, note: 'A mountain-valley arts and wellness town.' },
    { id: 'simi-valley', kind: 'FEEDER', name: 'Simi Valley', minutes: 40, bearing: 90, note: 'A big suburb with an old skate and punk legacy.' },
    { id: 'santa-barbara', kind: 'PEER', name: 'Santa Barbara', minutes: 60, bearing: 310, slug: 'santa-barbara-ca', note: 'A smaller, wealthier college and beach town up the coast with its own scene.' },
    { id: 'santa-clarita', kind: 'PEER', name: 'Santa Clarita', minutes: 65, bearing: 65, note: 'A suburban city of similar size with its own punk and metal circuit.' },
    { id: 'antelope-valley', kind: 'PEER', name: 'Lancaster and Palmdale', minutes: 100, bearing: 45, note: 'A desert scene that is famously separate.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the historic district', route: 'downtown', note: 'Old commercial storefronts, small galleries and restaurants with back rooms; slowly gentrifying as cheap space closes.' },
    { id: 'colonia', name: 'Colonia', route: 'old-side', note: 'The long-rooted central barrio of dense old houses, big garages and back-lot units. Not a place to treat as sketchy; locals will correct you.' },
    { id: 'southwinds', name: 'Southwinds and south Oxnard', route: 'campus', note: 'Postwar and later tract homes, apartments and strip malls with Navy families; garages and rec rooms.' },
    { id: 'rose-park', name: 'Rose Park and the north-central side', route: 'old-side', note: 'Older bungalows with backyards and garages; quiet and creeping up in price.' },
    { id: 'shores', name: 'Oxnard Shores and Hollywood Beach', route: 'old-side', note: 'The beach strip: surf and skate culture, cottages, and big money moving in. Almost no commercial rooms.' },
    { id: 'del-norte', name: 'Del Norte and El Rio', route: 'work-side', note: 'Industrial yards, packing sheds, fields and warehouses by the north side; practice rooms and generator shows near the fields.' },
    { id: 'hueneme-side', name: 'the Port Hueneme edge', route: 'work-side', note: 'Halls and base-adjacent rooms where kids come and go with the rotations.' }
  ],

  contacts: ['santa-barbara-ca', 'los-angeles', 'san-luis-obispo-ca'],

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 12800000 },
    { name: 'Santa Clarita', state: 'CA', lat: 34.39, lon: -118.54, pop: 230000 },
    { name: 'Lancaster', state: 'CA', lat: 34.7, lon: -118.14, pop: 175000 },
    { name: 'San Bernardino', state: 'CA', lat: 34.11, lon: -117.29, pop: 225000 }
  ],
  roads: ['US 101', 'CA 1', 'CA 126', 'CA 118', 'CA 34', 'I-5'],

  words: {
    street: ['Fifth Street', 'Saviers Road', 'Rice Avenue', 'Channel Islands Boulevard', 'Hueneme Road', 'Ventura Road'],
    water: ['Channel Islands Harbor', 'the Santa Clara River', 'the Pacific'],
    hood: ['Colonia', 'Southwinds', 'Rose Park', 'Oxnard Shores', 'Hollywood Beach', 'Del Norte', 'El Rio', 'Silver Strand', 'Port Hueneme'],
    thing: ['strawberry field', 'taco truck', 'two-car garage', 'half-pipe', 'dry pool', 'agua fresca', 'birria', 'patio', 'fog', 'side yard'],
    weather: ['May gray', 'June gloom', 'marine layer', 'Santa Ana wind']
  }
});
