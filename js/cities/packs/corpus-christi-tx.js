SB.Cities.register('corpus-christi-tx', {
  v: 1,
  slug: 'corpus-christi-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. The storm is written only as 'the '17 storm'. */
  banned: ['naval air station corpus christi', 'naval air station', 'port of corpus christi', 'buc days', 'bayfest', 'first friday artwalk', 'artwalk',
           'texas a&m', 'texas a&m-kingsville', 'texas a&m-corpus christi', 'del mar college', 'coastal bend college', 'saint leo', 'caller-times',
           'whataburger', 'taco cabana', 'h-e-b', 'heb', 'shiner', 'lone star', 'topo chico', 'dr pepper', 'hurricane harvey', 'harvey', 'vfw',
           'american legion', 'king ranch', 'myspace', 'instagram', 'texas jazz festival', 'texas state aquarium', 'sparkling city by the sea',
           'birdiest city in america', 'the blue heron annex', 'seawall hall', 'the norther', 'tuloso feed & seed', 'tuloso feed and seed',
           'mesquite street warehouse', 'kleberg street garage', 'the dredge', 'cuatro vientos hall', 'the bait shop back room', 'laguna strip unit 4',
           'sandbar lodge no. 12', 'the refinery row rec hall'],
  blocklist: ['whataburger*', 'taco cabana*', 'caller-times*', 'buc days*', 'bayfest*', 'blue heron annex*', 'seawall hall*'],

  blurb: ['A Gulf port and refinery city at the bottom of the Texas coastal bend, long and flat and windy, with a naval base and a loyal metal and hardcore crowd.',
          'Rooms keep closing, storms dent everything, and kids leave for the big Texas cities after high school.'],
  hard: 'Rooms keep closing, hurricanes dent everything, and kids leave after high school.',
  region: 'South Texas',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Corpus Christi' },
    { id: 'robstown', kind: 'FEEDER', name: 'Robstown', minutes: 20, bearing: 285, pop: 10143, note: 'A farm and rail town that already acts like a west suburb.' },
    { id: 'portland', kind: 'FEEDER', name: 'Portland', minutes: 20, bearing: 20, note: 'A bedroom suburb across the bay.' },
    { id: 'ingleside', kind: 'FEEDER', name: 'Ingleside and Aransas Pass', minutes: 30, bearing: 40, note: 'Refinery and shrimp-boat towns.' },
    { id: 'sinton', kind: 'FEEDER', name: 'Sinton and Mathis', minutes: 30, bearing: 330, note: 'Small farm and oil towns; high school kids.' },
    { id: 'kingsville', kind: 'FEEDER', name: 'Kingsville', minutes: 40, bearing: 215, pop: 25402, note: 'A university town down US 77 with the likeliest small scene of its own.', bands: 2 },
    { id: 'rockport', kind: 'FEEDER', name: 'Rockport and Fulton', minutes: 40, bearing: 35, pop: 10070, note: 'Fishing and retirees, rebuilt after the \'17 storm.' },
    { id: 'port-aransas', kind: 'FEEDER', name: 'Port Aransas', minutes: 45, bearing: 55, pop: 2904, note: 'A beach town reached by the free ferry; swells every summer.', season: { months: [3, 6, 7, 8], mul: 1.5 } },
    { id: 'alice', kind: 'FEEDER', name: 'Alice', minutes: 50, bearing: 260, pop: 17891, note: 'An oil-field hub; kids drive in for shows.' },
    { id: 'beeville', kind: 'FEEDER', name: 'Beeville', minutes: 60, bearing: 320, note: 'Prison and community college town.' },
    { id: 'victoria', kind: 'PEER', name: 'Victoria', minutes: 80, bearing: 35, scene: 600, note: 'Smaller, same coastal-plains orbit; bands trade both ways.' },
    { id: 'laredo', kind: 'PEER', name: 'Laredo', minutes: 135, bearing: 250, slug: 'laredo-tx', note: 'A Spanish-speaking border city with a cross-border punk pipeline.' },
    { id: 'brownsville', kind: 'PEER', name: 'Brownsville', minutes: 180, bearing: 185, slug: 'brownsville-tx', note: 'The Valley: a bigger combined scene down US 77.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the bayfront', route: 'downtown', note: 'Hotels and bars on the bay, old brick blocks behind them, and rents that keep squeezing the cheap rooms.' },
    { id: 'north-beach', name: 'North Beach', route: 'downtown', note: 'Beach bars and tourist motels across the channel; seasonal and storm-prone.' },
    { id: 'westside', name: 'the Westside and the old north side', route: 'work-side', note: 'Small frame houses with yards, carports and garages near the industrial corridor: the likeliest backyard shows.' },
    { id: 'midtown', name: 'Midtown and the Morgan Avenue corridor', route: 'old-side', note: 'Mid-century commercial strips with thrift shops, small bars and the best chance of a small DIY room.' },
    { id: 'southside', name: 'the Southside', route: 'campus', note: 'Chain strips, apartments and tract houses where most teenagers and community college students live.' },
    { id: 'flour-bluff', name: 'Flour Bluff', route: 'old-side', note: 'A peninsula past the base on the road to the island: surf shops, military families and small tract houses.' },
    { id: 'calallen', name: 'Calallen and Annaville', route: 'work-side', note: 'Semi-rural western edge along the river with big lots, sheds and shops where noise is tolerated.' }
  ],

  contacts: ['laredo-tx', 'brownsville-tx', 'lafayette-la'],

  points: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 1500000 },
    { name: 'McAllen', state: 'TX', lat: 26.2, lon: -98.23, pop: 140000 },
    { name: 'Harlingen', state: 'TX', lat: 26.19, lon: -97.7, pop: 65000 },
    { name: 'Victoria', state: 'TX', lat: 28.8, lon: -97.0, pop: 65500 }
  ],
  roads: ['I-37', 'US 77', 'SH 358', 'SH 286', 'US 181', 'SH 35'],

  words: {
    street: ['Padre Island Drive', 'Staples Street', 'Everhart Road', 'Morgan Avenue', 'Ocean Drive', 'Leopard Street', 'Agnes Street'],
    water: ['Corpus Christi Bay', 'the Laguna Madre', 'the Nueces', 'the ship channel'],
    hood: ['North Beach', 'Flour Bluff', 'Calallen', 'Annaville', 'Hillcrest', 'Six Points', 'Westside', 'Mustang Island'],
    thing: ['carport', 'breakfast taco', 'refinery flare', 'shrimp boat', 'pan dulce', 'barbacoa', 'raspa', 'backyard', 'empty lot', 'flyer box', 'legion hall'],
    weather: ['norther', 'storm surge', 'red tide']
  }
});
