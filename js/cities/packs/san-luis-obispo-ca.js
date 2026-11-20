SB.Cities.register('san-luis-obispo-ca', {
  v: 1,
  slug: 'san-luis-obispo-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['cal poly', 'california polytechnic', 'cal poly corporation', 'cuesta college', 'cuesta', 'pg&e', 'diablo canyon', 'california men\'s colony',
           'camp roberts', 'vandenberg', 'poly royal', 'mardi gras', 'festival mozaic', 'bubblegum alley', 'madonna inn', 'amtrak', 'pacific surfliner',
           'coast starlight', 'greyhound', 'ucsb', 'uc santa barbara', 'thursday farmers\' market', 'farmers\' market', 'first-thursday bike night',
           'the grade shed', 'tank farm annex', 'cerro hall', 'higuera back room', 'chorro street garage', 'sycamore flats hall', 'the boxcar on marsh',
           'laguna lake carport', 'the edna valley barn', 'nine sisters hall', 'foothill duplex', 'orcutt road warehouse'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['cal poly*', 'cuesta college*', 'diablo canyon*', 'poly royal*', 'festival mozaic*', 'madonna inn*'],

  blurb: ['A pretty college town where punk lives in garages and borrowed rooms.',
          'The crowd is students and kids from the small towns around it, and it empties every summer.'],
  hard: 'Pricey, quiet town, big summer drop, nowhere sound-proofed.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'San Luis Obispo' },
    { id: 'pismo', kind: 'FEEDER', name: 'Pismo Beach and Grover Beach', minutes: 15, bearing: 175, note: 'Beach and suburb towns south on US 101; surf and skate kids.' },
    { id: 'morro-bay', kind: 'FEEDER', name: 'Morro Bay', minutes: 20, bearing: 305, note: 'A fishing and tourist beach town; little scene, so the kids come in.' },
    { id: 'los-osos', kind: 'FEEDER', name: 'Los Osos', minutes: 20, bearing: 285, note: 'A bedroom community with real surf and skate culture.' },
    { id: 'atascadero', kind: 'FEEDER', name: 'Atascadero', minutes: 20, bearing: 345, note: 'An inland suburb over the grade; the usual source of high-school bands.' },
    { id: 'arroyo-grande', kind: 'FEEDER', name: 'Arroyo Grande and Nipomo', minutes: 25, bearing: 170, note: 'Suburban and rural edge to the south.' },
    { id: 'templeton', kind: 'FEEDER', name: 'Templeton and Paso Robles', minutes: 35, bearing: 355, note: 'Wine-country bedroom town and the farm city beyond, with more local culture than the others.' },
    { id: 'cambria', kind: 'FEEDER', name: 'Cambria and Cayucos', minutes: 35, bearing: 320, note: 'Small coastal towns of retirees and artists; few kids.' },
    { id: 'santa-maria', kind: 'FEEDER', name: 'Santa Maria', minutes: 40, bearing: 165, note: 'A working-class farm city south on US 101: the biggest feeder, with a scene of its own.' },
    { id: 'lompoc', kind: 'FEEDER', name: 'Lompoc', minutes: 60, bearing: 160, note: 'A farm and prison town with a base nearby; military kids.' },
    { id: 'santa-barbara', kind: 'PEER', name: 'Santa Barbara', minutes: 110, bearing: 140, slug: 'santa-barbara-ca', note: 'A little richer and bigger, with a university and stronger live music. A campus rivalry.' },
    { id: 'salinas', kind: 'PEER', name: 'Salinas', minutes: 140, bearing: 330, slug: 'salinas-ca', note: 'The next farm city up US 101; occasional trade.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', minutes: 150, bearing: 60, slug: 'visalia-ca', note: 'Over the hills to the Central Valley: more working class, different bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A flat grid around the old mission and creek: bars, restaurants and a weekly market that closes the main street. Prime rents, tourists and students.' },
    { id: 'railroad', name: 'the Railroad District', route: 'work-side', note: 'Old warehouses by the train station, an historic district being redeveloped. The best fit for a warehouse or loft room.' },
    { id: 'south-industrial', name: 'South Higuera and the airport area', route: 'work-side', note: 'Metal buildings, auto shops, storage and breweries south of town. Practice rooms and garage bays, and nobody sleeps next door.' },
    { id: 'foothill', name: 'Foothill and the campus side', route: 'campus', note: 'Student rentals in small old houses and big new apartment blocks. Backyard shows live here, and so does the most neighbor and police trouble.' },
    { id: 'old-town', name: 'Old Town and Fremont Heights', route: 'old-side', note: 'Victorian and bungalow streets of professors, families and renters. Low tolerance for noise.' },
    { id: 'laguna', name: 'Laguna Lake and Los Osos Valley Road', route: 'campus', note: 'Postwar tract homes around a lake and big-box strips. Where the locally raised teenagers live, and garage-band country.' },
    { id: 'johnson', name: 'Johnson Avenue and Broad Street', route: 'old-side', note: 'Churches, small commercial units and middle-income blocks toward the valley road.' }
  ],

  contacts: ['santa-barbara-ca', 'salinas-ca', 'visalia-ca'],

  points: [
    { name: 'Santa Maria', state: 'CA', lat: 34.95, lon: -120.44, pop: 110000 },
    { name: 'Paso Robles', state: 'CA', lat: 35.63, lon: -120.69, pop: 31000 },
    { name: 'Morro Bay', state: 'CA', lat: 35.37, lon: -120.85, pop: 10000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 400000 }
  ],
  roads: ['US 101', 'Highway 1', 'Highway 227', 'Highway 58', 'Highway 46'],

  words: {
    street: ['Higuera Street', 'Foothill Boulevard', 'Los Osos Valley Road', 'Marsh Street', 'Highway 101'],
    water: ['the creek', 'Laguna Lake', 'the bay'],
    hood: ['the Railroad District', 'Laguna Lake', 'Foothill', 'Old Town', 'Fremont Heights', 'Johnson Avenue', 'Tank Farm Road'],
    thing: ['tri-tip sandwich', 'taco truck', 'garage bay', 'practice room', 'hillside letter', 'bike lane', 'oak tree', 'donut shop', 'student rental', 'farmers market'],
    weather: ['fog bank', 'heat wave', 'winter rain']
  }
});
