SB.Cities.register('jackson-ms', {
  v: 1,
  slug: 'jackson-ms',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['jackson state', 'jsu', 'tougaloo', 'millsaps', 'belhaven university', 'hinds community college', 'mississippi college',
           'mississippi state', 'ole miss', 'university of mississippi', 'egg bowl', 'mississippi state fair', 'dixie national',
           'dixie national rodeo', 'national folk festival', 'mississippi book festival', 'jackson free press', 'clarion-ledger', 'clarion ledger',
           'mississippi today', 'mississippi public broadcasting', 'camp shelby', 'nas meridian', 'nissan', 'amtrak', 'greyhound', 'union station',
           'metrocenter', 'northpark', 'waffle house', 'krystal', 'sonic', 'barq\'s', 'barqs', 'coca-cola', 'eudora welty', 'welty', 'the coliseum',
           'mississippi coliseum', 'ross barnett', 'comeback sauce', 'city with soul', 'jxn', 'choctaw', 'neshoba county fair',
           'the fairground annex', 'fairground annex', 'lakeland hall', 'pearl street social', 'magnolia lanes', 'the old cotton house',
           'reservoir room', 'bluff street garage', 'delta junction', 'county line pavilion', 'the mule barn', 'capitol hill elks'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges, the fair, the papers and the stadium are written only in generic form. */
  blocklist: ['jackson free press*', 'metrocenter*', 'waffle house*', 'dixie national*', 'jackson state*', 'mississippi state*', 'ole miss*'],

  blurb: ['Jackson shows hop between porches, bar stages and borrowed halls. The heat is brutal, the crowd small, and the city\'s soul music is never far away.',
          'Punk shares bills and crowds with hip hop people, and everyone knows who owns the PA.'],
  hard: 'Few fixed rooms, brutal heat, and the water or power may simply be out.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Jackson' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 15, bearing: 275, note: 'A west-side suburb with an old college; kids drive in.' },
    { id: 'ridgeland', kind: 'FEEDER', name: 'Ridgeland and Madison', minutes: 20, bearing: 10, note: 'Wealthy suburbs up I-55; kids with cars.' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon and Pearl', minutes: 20, bearing: 100, note: 'Conservative, church-oriented suburbs east on I-20, a feeder of teenagers.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 30, bearing: 20, note: 'A historic square and a factory nearby, northeast on I-55.' },
    { id: 'yazoo-city', kind: 'FEEDER', name: 'Yazoo City', minutes: 50, bearing: 330, note: 'The gateway to the Delta, hit hard by lost jobs and tornadoes.' },
    { id: 'vicksburg', kind: 'FEEDER', name: 'Vicksburg', minutes: 50, bearing: 265, note: 'A river town with casinos; its own small scene on and off.' },
    { id: 'brookhaven', kind: 'FEEDER', name: 'Brookhaven', minutes: 55, bearing: 190, note: 'A small town with an arts high school; arty kids come up for shows.' },
    { id: 'mccomb', kind: 'FEEDER', name: 'McComb', minutes: 80, bearing: 185, note: 'A railroad town far down I-55 with a community college nearby.' },
    { id: 'hattiesburg', kind: 'PEER', name: 'Hattiesburg', minutes: 90, bearing: 150, scene: 350, note: 'The closest university-town scene; bands trade shows with Jackson regularly.' },
    { id: 'baton-rouge', kind: 'PEER', name: 'Baton Rouge', state: 'LA', minutes: 135, bearing: 190, slug: 'baton-rouge-la', note: 'A similar-sized capital-and-college city that trades crowds now and then.' },
    { id: 'shreveport', kind: 'PEER', name: 'Shreveport', state: 'LA', minutes: 175, bearing: 275, slug: 'shreveport-la', note: 'Three hours west on I-20, the road to Texas.' }
  ],

  hoods: [
    { id: 'fondren', name: 'Fondren', route: 'downtown', note: 'The arty restored commercial strip: bars with stages and patios, where the scene hangs out, and rents are climbing.' },
    { id: 'belhaven', name: 'Belhaven', route: 'old-side', note: 'Leafy streets of old bungalows cut into rentals; house shows are possible, but the neighbors are established.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'Cheaper and mixed, with old commercial buildings, warehouses and small houses: where a room that is not a bar can still happen.' },
    { id: 'downtown', name: 'downtown and Capitol Street', route: 'downtown', note: 'The government core: dead after five, with empty storefronts and a handful of bars, perpetually about to revive.' },
    { id: 'farish-street', name: 'Farish Street', route: 'old-side', note: 'The historic Black entertainment district, mostly empty and long promised redevelopment; not a place for outsiders to treat as a cheap district.' },
    { id: 'west-jackson', name: 'West Jackson', route: 'campus', note: 'Working-class and student streets around the historically Black university, where marching bands and hip hop own the nights.' },
    { id: 'south-jackson', name: 'South Jackson and Terry Road', route: 'work-side', note: 'Spread-out ranch houses and old strip malls; the cheapest rent in town, with garages, carports and big yards.' },
    { id: 'north-suburbs', name: 'the suburban belt north and east', route: 'campus', note: 'Ridgeland, Flowood and Pearl: where many band members grew up, with church rooms and strip-center units.' }
  ],

  contacts: ['baton-rouge-la', 'shreveport-la', 'mobile-al', 'gulfport-ms'],

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Meridian', state: 'MS', lat: 32.36, lon: -88.7, pop: 35000 },
    { name: 'Oxford', state: 'MS', lat: 34.37, lon: -89.52, pop: 25000 }
  ],
  roads: ['I-55', 'I-20', 'I-220', 'US 49', 'US 51', 'US 80'],

  words: {
    street: ['State Street', 'Capitol Street', 'Lakeland Drive', 'County Line Road', 'Old Canton Road', 'Northside Drive', 'Woodrow Wilson Avenue', 'Terry Road', 'Highway 80'],
    water: ['the Pearl River', 'the Reservoir', 'Pearl River', 'the Natchez Trace'],
    hood: ['Fondren', 'Belhaven', 'Midtown', 'Farish Street', 'West Jackson', 'South Jackson', 'Flowood', 'Pearl', 'Ridgeland', 'Madison', 'across the river'],
    thing: ['water tower', 'magnolia', 'tornado shelter', 'gas-station chicken', 'tamale', 'sweet tea', 'boil-water notice', 'window unit', 'borrowed PA', 'porch', 'church hall', 'box fan'],
    weather: ['heat index', 'tornado watch', 'ice storm', 'pop-up storm']
  }
});
