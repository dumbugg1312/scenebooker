SB.Cities.register('san-diego', {
  v: 1,
  slug: 'san-diego',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of california san diego', 'ucsd', 'san diego state university', 'sdsu', 'university of san diego', 'point loma nazarene university',
           'san diego city college', 'san diego union-tribune', 'union-tribune', 'san diego reader', 'san diego city beat', 'citybeat', 'times of san diego',
           'voice of san diego', 'kpbs', 'kcr', 'kgtv', 'kfmb', 'kusi', 'san diego padres', 'padres', 'petco park', 'san diego county fair', 'del mar fairgrounds',
           'comic-con', 'comic con', 'san diego zoo', 'seaworld', 'naval base san diego', 'camp pendleton', 'marine corps recruit depot', 'miramar', 'north island',
           'qualcomm', 'general atomics', 'kaiser permanente', 'scripps', 'sharp healthcare', 'balboa park', 'gaslamp quarter', 'gaslamp', 'hurricane kay', 'tropical storm kay',
           'fleet week'],
  blocklist: ['union-tribune*', 'san diego reader*', 'citybeat*', 'comic-con*', 'comic con*', 'seaworld*', 'gaslamp*'],

  blurb: ['A navy-and-border port on the far corner of California, where backyards, a sober all-ages hall and a heavy-music room keep the noise going.',
          'Hardcore with a south-bay lineage meets crowds from Tijuana, while rent and redevelopment eat the old rooms.'],
  hard: 'Rent and redevelopment keep closing rooms; the border is a gamble.',
  region: 'the border coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A long hardcore and straight-edge lineage from the south bay, and a revival now.' },
    { fan: 'metal', band: 'metal', d: .06, reason: 'A heavy-music room on the west side has kept the metal crowd together for decades.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'San Diego' },
    { id: 'national-city', kind: 'FEEDER', name: 'National City', minutes: 15, bearing: 175, note: 'Shipyards and strip malls on the way to the south bay.' },
    { id: 'chula-vista', kind: 'FEEDER', name: 'Chula Vista', minutes: 20, bearing: 170, note: 'The south bay: where the early hardcore bands and house parties came from.' },
    { id: 'la-mesa', kind: 'FEEDER', name: 'La Mesa', minutes: 20, bearing: 75, note: 'A close east suburb of students and teens.' },
    { id: 'el-cajon', kind: 'FEEDER', name: 'El Cajon', minutes: 25, bearing: 70, note: 'East county sprawl of garages and backyards.' },
    { id: 'tijuana', kind: 'FEEDER', name: 'Tijuana', state: 'BC', minutes: 40, bearing: 175, note: 'Promoters on both sides stage shows across the line. Add the border wait.' },
    { id: 'santee', kind: 'FEEDER', name: 'Santee', minutes: 30, bearing: 45, note: 'An inland suburb with a skate and hardcore habit.' },
    { id: 'escondido', kind: 'FEEDER', name: 'Escondido', minutes: 40, bearing: 25, note: 'Inland north county, with a small scene of its own.' },
    { id: 'oceanside', kind: 'FEEDER', name: 'Oceanside', minutes: 45, bearing: 335, note: 'Coastal north county of surfers and men on weekend leave.' },
    { id: 'temecula', kind: 'PEER', name: 'Temecula', minutes: 55, bearing: 5, scene: 300, note: 'Suburban and thin. Bands come out of it rarely.' },
    { id: 'riverside', kind: 'PEER', name: 'Riverside', minutes: 95, bearing: 20, slug: 'riverside', note: 'Inland Empire hardcore, scrappier and farther out.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and East Village', route: 'downtown', note: 'The bar core. Condos are pushing out the older industrial rooms.' },
    { id: 'north-park', name: 'North Park and South Park', route: 'old-side', note: 'Craftsman houses and murals, with a long record of DIY houses and small rooms. Rent is rising.' },
    { id: 'city-heights', name: 'City Heights', route: 'old-side', note: 'A dense immigrant neighborhood east of North Park. Cheap, with community halls and garages.' },
    { id: 'ocean-beach', name: 'Ocean Beach', route: 'old-side', note: 'A beach hippie holdout of surf shops, bars and old rentals.' },
    { id: 'barrio-logan', name: 'Barrio Logan', route: 'work-side', note: 'The old Mexican-American neighborhood by the shipyards: murals, warehouses and a cultural center with all-ages shows.' },
    { id: 'bay-park', name: 'Bay Park and Midway', route: 'work-side', note: 'Strip malls and light industry west of the 5. A heavy-music pocket.' },
    { id: 'lemon-grove', name: 'Lemon Grove', route: 'work-side', note: 'A small east-county suburb with a rec center that once held shows.' },
    { id: 'south-bay', name: 'National City and Chula Vista', route: 'work-side', note: 'The south bay toward the border, with deep roots in early straight-edge and hardcore.' },
    { id: 'college-area', name: 'the College Area', route: 'campus', note: 'Student rentals east of the 8, with house shows and a long-running sober all-ages hall.' },
    { id: 'pacific-beach', name: 'Pacific Beach and Mission Beach', route: 'downtown', note: 'Beer and bro nightlife. Little DIY.' }
  ],

  contacts: ['los-angeles', 'riverside'],

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91, pop: 346000 },
    { name: 'Tijuana', state: 'BC', lat: 32.51, lon: -117.04, pop: 1900000 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 }
  ],
  roads: ['the 5', 'the 805', 'the 8', 'the 15', 'the 163', 'the 94'],

  words: {
    street: ['University Avenue', 'El Cajon Boulevard', 'Park Boulevard', 'Washington Street', 'Broadway', 'Sports Arena Boulevard', 'Newport Avenue'],
    water: ['San Diego Bay', 'Mission Bay', 'the San Diego River', 'Point Loma', 'the Silver Strand'],
    hood: ['North Park', 'South Park', 'City Heights', 'Barrio Logan', 'Bay Park', 'Ocean Beach', 'Lemon Grove', 'College Area'],
    thing: ['bungalow', 'marine layer', 'taco shop', 'border line', 'lemon tree', 'seagull', 'ship horn'],
    weather: ['June gloom', 'marine layer', 'brush fire smoke']
  }
});
