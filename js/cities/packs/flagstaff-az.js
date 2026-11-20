SB.Cities.register('flagstaff-az', {
  v: 1,
  slug: 'flagstaff-az',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['northern arizona university', 'lumberjacks', 'the lumberjack', 'skydome', 'snowbowl', 'arizona daily sun', 'flagstaff live', 'knau',
           'kpub', 'bnsf', 'amtrak', 'greyhound', 'flixbus', 'mountain line', 'route 66 days', 'flagstaff festival of science', 'festival of science',
           'coconino county fair', 'mountain film festival', 'pine cone drop', 'whiskey row', 'arizona department of liquor licenses', 'vfw',
           'american legion', 'pinecone annex', 'the ponderosa garage', 'switchback hall', 'the boxcar room', 'peaks view carport',
           'cinder cone basement', 'the third rail studio', 'aspen alley', 'santa fe avenue backroom', 'the lumber mill loft', 'monsoon yard',
           'highline practice space'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['northern arizona*', 'snowbowl*', 'arizona daily sun*', 'flagstaff live*', 'skydome*', 'knau*', 'route 66 days*'],

  blurb: ['A mountain town where a few rooms carry the whole scene, one of them an all-ages art gallery. Pop-punk, emo and heavy bands share bills.',
          'Locals leave for the big city after a few years, and a farewell show is a regular night.'],
  hard: 'Very few rooms, so one closure empties the calendar',
  region: 'the Southwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Tempe', state: 'AZ', lat: 33.43, lon: -111.94 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Flagstaff' },
    { id: 'doney-park', kind: 'FEEDER', name: 'Doney Park', minutes: 15, bearing: 50, note: 'Forest-edge subdivisions northeast of town; kids drive in.' },
    { id: 'kachina', kind: 'FEEDER', name: 'Kachina Village and Munds Park', minutes: 20, bearing: 185, note: 'Cold, quiet pine communities down I-17; a long commute for a show.' },
    { id: 'williams', kind: 'FEEDER', name: 'Williams', minutes: 40, bearing: 280, note: 'A Route 66 tourist town on I-40; its kids have almost no rooms.' },
    { id: 'sedona', kind: 'FEEDER', name: 'Sedona', minutes: 45, bearing: 185, note: 'Retirees and tourism workers; the few young people drive up the canyon.' },
    { id: 'winslow', kind: 'FEEDER', name: 'Winslow', minutes: 60, bearing: 115, note: 'A hard-up railroad town; kids come in for shows.' },
    { id: 'verde-valley', kind: 'FEEDER', name: 'Cottonwood and Camp Verde', minutes: 60, bearing: 195, note: 'A working-class valley with a tiny scene of its own.' },
    { id: 'tuba-city', kind: 'FEEDER', name: 'Tuba City', minutes: 80, bearing: 15, scene: 100, note: 'The largest reservation town, with its own music culture; kids reach Flagstaff for shows.' },
    { id: 'holbrook', kind: 'FEEDER', name: 'Holbrook', minutes: 80, bearing: 100, note: 'A small railroad and highway town far down I-40.' },
    { id: 'prescott', kind: 'PEER', name: 'Prescott', minutes: 90, bearing: 220, scene: 600, note: 'The older, more conservative sibling with three colleges and its own small scene.' },
    { id: 'kingman', kind: 'PEER', name: 'Kingman', minutes: 150, bearing: 280, scene: 250, note: 'A working-class desert town; people drive between the two for shows.' },
    { id: 'gallup', kind: 'PEER', name: 'Gallup', state: 'NM', minutes: 170, bearing: 95, scene: 200, note: 'The next real stop east on I-40.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Brick storefronts, bars and tourists along the old highway and the tracks; ticketed bar bills, hard to run cheap.' },
    { id: 'southside', name: 'Southside', route: 'old-side', note: 'Small old houses south of the tracks, once working-class and Latino, now filling with bars; house shows and rising rent.' },
    { id: 'campus', name: 'the campus blocks', route: 'campus', note: 'Student rentals and apartment complexes by the university; fewer old houses every year.' },
    { id: 'sunnyside', name: 'Sunnyside', route: 'work-side', note: 'A poor, heavily Latino east side of older small houses and motels; garages and backyards.' },
    { id: 'east-side', name: 'east Flagstaff', route: 'work-side', note: 'Subdivisions and mobile home parks past the park; working families and garage practice spaces.' },
    { id: 'west-side', name: 'the west side industrial parks', route: 'work-side', note: 'Warehouses and light-industrial units off the interstate; practice spaces and the odd warehouse show.' },
    { id: 'mountainaire', name: 'Mountainaire', route: 'old-side', note: 'Forest-edge houses with yards south of the city; cheaper, cold and far.' }
  ],

  contacts: ['prescott-valley-az'],

  points: [
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 },
    { name: 'Kingman', state: 'AZ', lat: 35.19, lon: -114.05, pop: 32000 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65, pop: 560000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 650000 }
  ],
  roads: ['I-40', 'I-17', 'US 89', 'US 180', 'Route 66'],

  words: {
    street: ['Route 66', 'Santa Fe Avenue', 'Milton Road', 'Beaver Street', 'San Francisco Street', 'Lake Mary Road'],
    water: ['Lake Mary', 'Oak Creek'],
    hood: ['Southside', 'Sunnyside', 'Mountainaire', 'Doney Park', 'Kachina Village', 'Buffalo Park'],
    thing: ['ponderosa', 'freight train', 'ski rack', 'trailhead', 'green chile', 'wood stove', 'art gallery', 'hotel ballroom', 'farewell show'],
    weather: ['monsoon', 'snow day']
  }
});
