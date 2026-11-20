SB.Cities.register('merced-ca', {
  v: 1,
  slug: 'merced-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['castle air force base', 'castle afb', 'castle airport', 'castle air museum', 'uc merced', 'university of california, merced', 'merced college', 'cal state stanislaus',
           'california state university, stanislaus', 'merced sun-star', 'sun-star', 'merced county times', 'kbif', 'merced county fair', 'hmong new year', 'yarts',
           'greyhound', 'amtrak', 'gold runner', 'merced high', 'golden valley', 'el capitan', 'jack in the box', 'taco bell', 'denny\'s', 'modelo', 'corona',
           'merced theatre', 'merced zoo', 'naia', 'the almond hull annex', 'tule fog room', 'hangar nine storage', 'the sweet potato shed', 'yosemite ave carport',
           'dairy row back lot', 'the canal street pit', 'south side swap stage', 'bear creek bunker', 'the packing house loft', 'the foreclosure house', '99 frontage garage'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['merced sun-star*', 'uc merced*', 'merced college*', 'castle air*', 'kbif*', 'merced county fair*', 'taco bell*'],

  blurb: ['A San Joaquin Valley farm town on Highway 99 where a show is a garage with the door up and a cord run from the house.',
          'Garages, halls and the odd ranch shed, run on car-pools and fog. The heat sets the clock and the neighbors set the curfew.'],
  hard: 'Small crowd, few steady rooms, and bands usually keep driving past.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Merced' },
    { id: 'atwater', kind: 'FEEDER', name: 'Atwater and Winton', minutes: 10, bearing: 325, scene: 50, note: 'A suburb and old base town up Highway 99, effectively the same metro. Kids come for shows without thinking about it.' },
    { id: 'planada', kind: 'FEEDER', name: 'Planada and Le Grand', minutes: 15, bearing: 70, note: 'Farm-worker towns on the foothill side. Few venues, so kids ride in.' },
    { id: 'livingston', kind: 'FEEDER', name: 'Livingston', minutes: 20, bearing: 330, note: 'A small poultry and sweet potato town with a family-centered garage-band scene, maybe.' },
    { id: 'delhi', kind: 'FEEDER', name: 'Delhi and Hilmar', minutes: 25, bearing: 330, note: 'Farm and dairy towns between Livingston and Turlock.' },
    { id: 'chowchilla', kind: 'FEEDER', name: 'Chowchilla', minutes: 25, bearing: 165, note: 'A farm town to the south with two prisons. Kids drive north to Merced.' },
    { id: 'dos-palos', kind: 'FEEDER', name: 'Dos Palos', minutes: 35, bearing: 215, note: 'A farm town on the west side of the county.' },
    { id: 'turlock', kind: 'FEEDER', name: 'Turlock', minutes: 35, bearing: 325, scene: 60, note: 'The nearest college town, with a smaller-town attitude. The two trade bands easily.' },
    { id: 'los-banos', kind: 'FEEDER', name: 'Los Banos and Gustine', minutes: 40, bearing: 240, scene: 55, note: 'The west side\'s biggest town of ag and dairy, likeliest to have a scene of its own.' },
    { id: 'madera', kind: 'FEEDER', name: 'Madera', minutes: 40, bearing: 150, note: 'A heavily Latino farm town that is half a Fresno suburb.' },
    { id: 'mariposa', kind: 'FEEDER', name: 'Mariposa', minutes: 60, bearing: 65, note: 'A tiny mountain town at the gate of the park. Its kids make a long drive for shows.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', state: 'CA', minutes: 50, bearing: 320, slug: 'modesto-ca', note: 'Bigger, the nearby city, a rival and an ally with a longer punk and hardcore reputation.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', state: 'CA', minutes: 80, bearing: 330, slug: 'stockton-ca', note: 'Up the valley, with the commuter suburbs beyond it shaped by the Bay.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', state: 'CA', minutes: 105, bearing: 150, slug: 'visalia-ca', note: 'A bigger valley city to the south with its own scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Merced', route: 'downtown', note: 'Older storefronts around Main Street, some vacant. Where a real room would be, and where complaints reach the police fastest.' },
    { id: 'south-merced', name: 'South Merced', route: 'old-side', note: 'Working-class, heavily Latino, with older small houses and big yards. Backyard and garage shows are most plausible here, and neighbors are used to family parties.' },
    { id: 'north-merced', name: 'North Merced', route: 'campus', note: 'Newer tract houses and cul-de-sacs near the community college. Quiet, and quick to call in a noise complaint.' },
    { id: 'bellevue', name: 'Bellevue Ranch and the university corridor', route: 'campus', note: 'The newest planned side toward the campus northeast of town. Student rentals, parking and roommate problems, and a car is required.' },
    { id: 'highway-99', name: 'the Highway 99 industrial edge', route: 'work-side', note: 'Warehouses, packing sheds and big-box strips. Practice units and shared warehouse shows, with owners who worry about insurance.' },
    { id: 'ranch-edge', name: 'the county edge', route: 'work-side', note: 'Ranch outbuildings and sheds outside city limits, under the sheriff, with neighbors far away.' },
    { id: 'atwater-hood', name: 'Atwater', route: 'town:atwater', note: 'A suburban grid and the old hangars, the nearest thing to raw space.' }
  ],

  contacts: ['modesto-ca', 'visalia-ca', 'stockton-ca'],

  points: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 1000000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 4700000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 900000 }
  ],
  roads: ['Highway 99', 'Highway 140', 'Highway 59', 'Highway 152', 'I-5'],

  words: {
    street: ['Main Street', '18th Street', 'Highway 99', 'Highway 140', 'Highway 59'],
    water: ['Bear Creek', 'the canal', 'the San Joaquin'],
    hood: ['South Merced', 'North Merced', 'Bellevue Ranch', 'Atwater', 'Winton', 'Planada', 'Livingston', 'Delhi', 'Dos Palos'],
    thing: ['tule fog', 'almond orchard', 'taco truck', 'garage door', 'sweet potato', 'crop duster', 'water tower', 'swamp cooler', 'ranch shed', 'carport', 'group chat', 'car-pool'],
    weather: ['hundred-degree afternoon', 'tule fog', 'heat wave']
  }
});
