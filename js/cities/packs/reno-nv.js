SB.Cities.register('reno-nv', {
  v: 1,
  slug: 'reno-nv',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['burning man', 'hot august nights', 'great reno balloon race', 'balloon race', 'reno air races', 'air races', 'biggest little city in the world',
           'biggest little city', 'university of nevada', 'unr', 'truckee meadows community college', 'tmcc', 'nevada day', 'nevada air national guard',
           'naval air station fallon', 'washoe zephyr', 'reno-tahoe international', 'reno-sparks convention center', 'rib cook-off', 'street vibrations',
           'artown', 'reno rodeo', 'santa crawl', 'amtrak', 'california zephyr', 'wolf pack', 'nevada wolf pack', 'aces',
           'pinyon annex', 'mogul street garage', 'rail city rec room', 'the weekly rate', 'glendale cold storage', 'peavine carport',
           'sagebrush social hall', 'wingfield loading dock', 'the zephyr room', 'sun valley swap annex', 'mill street mattress', 'truckee meadows auxiliary'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['burning man*', 'hot august*', 'artown*', 'street vibrations*', 'wolf pack*', 'biggest little*'],

  blurb: ['Wind, dust and long drives shape a small valley scene held together by a few stubborn promoters, in garages, bays and bar rooms.',
          'Rooms keep getting sold out from under the scene, and the next city is a long drive over the mountains or across the desert.'],
  hard: 'Rooms are scarce and sold off, and nobody lives close to anything.',
  region: 'the Great Basin',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Reno' },
    { id: 'sparks', kind: 'FEEDER', name: 'Sparks', minutes: 15, bearing: 95, pop: 108000, note: 'The rail-yard city next door: industrial units, garages and a big suburban sprawl. Shares Reno\'s scene.' },
    { id: 'fernley', kind: 'FEEDER', name: 'Fernley', minutes: 35, bearing: 100, note: 'A logistics and bedroom town with no real scene.' },
    { id: 'carson-city', kind: 'FEEDER', name: 'Carson City', minutes: 35, bearing: 180, pop: 58000, note: 'The state capital with a small scene; its kids come to Reno routinely.', bands: 2 },
    { id: 'incline', kind: 'FEEDER', name: 'Incline Village', minutes: 40, bearing: 210, note: 'A wealthy lake town; resort-worker youth are the audience.', season: { months: [6, 7, 8, 12, 1, 2], mul: 1.4 } },
    { id: 'truckee', kind: 'FEEDER', name: 'Truckee', state: 'CA', minutes: 45, bearing: 265, beyond: 'sierra-pass', note: 'A ski and resort town over the pass with some shows of its own.', bands: 1 },
    { id: 'dayton', kind: 'FEEDER', name: 'Dayton', minutes: 45, bearing: 150, note: 'A growing exurb on the Carson River.' },
    { id: 'minden', kind: 'FEEDER', name: 'Minden and Gardnerville', minutes: 55, bearing: 185, note: 'Ranch country; teenagers drive up the valley.' },
    { id: 'fallon', kind: 'FEEDER', name: 'Fallon', minutes: 70, bearing: 105, note: 'A farm town half given over to the air station.' },
    { id: 'susanville', kind: 'FEEDER', name: 'Susanville', state: 'CA', minutes: 90, bearing: 340, note: 'A prison and ranch town; kids drive far.' },
    { id: 'chico', kind: 'PEER', name: 'Chico', state: 'CA', minutes: 175, bearing: 285, slug: 'chico-ca', note: 'A college-town peer across the mountains; bands trade both ways.' }
  ],

  chokepoints: [{ id: 'sierra-pass', name: 'the Donner Pass crossing', p: .03 }],

  hoods: [
    { id: 'downtown', name: 'downtown and the riverfront', route: 'downtown', note: 'Casino core, weekly motels and pawn shops by the river. Occasional bars and empty storefronts.' },
    { id: 'west-fourth', name: 'the West Fourth Street corridor', route: 'work-side', note: 'Old warehouses and motels along the tracks, now breweries and rising rent. The cheap industrial era is ending.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'Thrift shops, murals and bars on South Virginia Street. The hot one, already priced out of cheap use.' },
    { id: 'wells', name: 'Wells Avenue', route: 'work-side', note: 'Working-class, mostly Hispanic strip east of downtown: garages, storefronts and backyards.' },
    { id: 'university', name: 'the university district', route: 'campus', note: 'Older houses rented by students north of downtown. House shows, basements rare.' },
    { id: 'sparks-side', name: 'Sparks', route: 'work-side', note: 'Industrial units, garages and a restored main street, cheaper than Reno.' },
    { id: 'sun-valley', name: 'Sun Valley and the north valley', route: 'campus', note: 'Mobile-home lots and dusty subdivisions. Garages, carports and generators; no commercial rooms.' },
    { id: 'south-meadows', name: 'South Meadows', route: 'campus', note: 'New-build suburb behind the malls. Parents\' garages and practice rooms; kids drive to Midtown.' }
  ],

  contacts: ['chico-ca', 'boise-id'],

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 },
    { name: 'Winnemucca', state: 'NV', lat: 40.97, lon: -117.74, pop: 8000 },
    { name: 'Elko', state: 'NV', lat: 40.83, lon: -115.76, pop: 20000 },
    { name: 'Truckee', state: 'CA', lat: 39.33, lon: -120.18, pop: 16000 },
    { name: 'Redding', state: 'CA', lat: 40.59, lon: -122.39, pop: 93000 }
  ],
  roads: ['I-80', 'US 395', 'I-580', 'US 50', 'NV 431', 'Virginia Street'],

  words: {
    street: ['Virginia Street', 'West Fourth Street', 'Wells Avenue', 'Center Street', 'Mount Rose Highway'],
    water: ['the Truckee', 'Pyramid Lake', 'Lake Tahoe', 'Washoe Lake'],
    hood: ['Midtown', 'Sparks', 'Sun Valley', 'Lemmon Valley', 'Stead', 'Cold Springs', 'Damonte Ranch', 'Peavine'],
    thing: ['weekly motel', 'pawn shop', 'swamp cooler', 'sagebrush', 'generator', 'tumbleweed', 'chain-up sign', 'roll-up door', 'taco truck', 'desert'],
    weather: ['wildfire smoke', 'afternoon wind', 'dry cold']
  }
});
