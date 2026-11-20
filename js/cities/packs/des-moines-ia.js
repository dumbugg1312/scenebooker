SB.Cities.register('des-moines-ia', {
  v: 1,
  slug: 'des-moines-ia',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['drake university', 'drake', 'drake relays', 'grand view university', 'iowa state university', 'iowa state', 'university of iowa',
           'simpson college', 'central college', 'william penn university', 'dmacc', 'iowa state fair', 'capital city pride',
           'des moines arts festival', 'jazz in july', 'world food & music festival', 'world food and music festival', 'des moines marathon',
           'hinterland', 'principal charity classic', 'pufferbilly days', 'tulip time', 'des moines register', 'cityview', 'juice', 'kcci', 'kdsm',
           'woi', 'who 1040', 'hy-vee', 'casey\'s', 'maid-rite', 'amtrak', 'jefferson lines', 'greyhound', 'iowa air national guard', 'camp dodge',
           'cy-hawk', 'iowa caucuses', 'american legion', 'vfw', 'principal riverwalk', 'raccoon bend hall', 'the mixmaster basement', 'post 417',
           'keo way garage', 'the tenderloin annex', 'court & fourth storage', 'saylor township grange', 'gold dome skate & lanes',
           'southside panaderia back room', 'hubbell avenue carport', 'capitol hill laundromat', 'the fairgrounds campsite'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['drake university*', 'iowa state*', 'hy-vee*', 'des moines register*', 'hinterland*', 'cityview*', 'raccoon bend hall*', 'maid-rite*'],

  blurb: ['The rooms keep closing, so the scene lives in a few bars and borrowed basements.',
          'Hardcore and metal hold on, with more old heads than kids, and everyone has a story about the last night at the big room.'],
  hard: 'Few independent rooms are left, and the big promoter owns the mid-size ones.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .06, reason: 'Hardcore and metal share bills and the same few faces.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Des Moines' },
    { id: 'ankeny', kind: 'FEEDER', name: 'Ankeny', minutes: 15, bearing: 10, pop: 67887, note: 'A fast-growing suburb with a community college campus; suburban bands and teenage crowds.' },
    { id: 'indianola', kind: 'FEEDER', name: 'Indianola', minutes: 25, bearing: 185, pop: 15833, note: 'A tidy college and commuter town to the south.' },
    { id: 'ames', kind: 'FEEDER', name: 'Ames', minutes: 35, bearing: 355, pop: 66427, note: 'A big college town with its own music scene; the likeliest crossover.', bands: 3 },
    { id: 'newton', kind: 'FEEDER', name: 'Newton', minutes: 35, bearing: 85, pop: 15760, note: 'A working-class factory and racetrack town with no scene of its own.' },
    { id: 'winterset', kind: 'FEEDER', name: 'Winterset', minutes: 40, bearing: 235, pop: 5353, note: 'A small rural tourist town; kids come in by car.' },
    { id: 'perry', kind: 'FEEDER', name: 'Perry', minutes: 40, bearing: 285, pop: 7836, note: 'A meatpacking town hit by a plant closing, with a growing Hispanic population.' },
    { id: 'boone', kind: 'FEEDER', name: 'Boone', minutes: 45, bearing: 325, pop: 12460, note: 'A quiet railroad town; kids drive in for shows.' },
    { id: 'knoxville', kind: 'FEEDER', name: 'Knoxville', minutes: 45, bearing: 130, pop: 7595, note: 'Sprint-car country where punk kids are a minority.' },
    { id: 'pella', kind: 'FEEDER', name: 'Pella', minutes: 50, bearing: 115, pop: 10464, note: 'A Dutch-heritage church town with a small college; students are the crowd.' },
    { id: 'grinnell', kind: 'FEEDER', name: 'Grinnell', minutes: 55, bearing: 85, pop: 9564, note: 'A liberal-arts college town whose students drive to shows.' },
    { id: 'marshalltown', kind: 'FEEDER', name: 'Marshalltown', minutes: 60, bearing: 55, pop: 27591, note: 'An industrial and meatpacking town with a community college.' },
    { id: 'cedar-rapids', kind: 'PEER', name: 'Cedar Rapids', minutes: 120, bearing: 85, slug: 'cedar-rapids-ia', note: 'The nearest similar city: bands and kids swap in both directions.' },
    { id: 'iowa-city', kind: 'PEER', name: 'Iowa City', minutes: 110, bearing: 85, slug: 'iowa-city-ia', note: 'The big college-music town of the state; it hoards the all-ages rooms.' },
    { id: 'lincoln', kind: 'PEER', name: 'Lincoln', state: 'NE', minutes: 180, bearing: 245, slug: 'lincoln-ne', note: 'A hardcore and punk pipeline runs both ways through Omaha.' }
  ],

  hoods: [
    { id: 'east-village', name: 'the East Village', route: 'old-side', note: 'Old wood-frame and brick commercial blocks just across the river from downtown; shops, bars and a revived feel.' },
    { id: 'downtown', name: 'downtown and Court Avenue', route: 'downtown', note: 'The old brick warehouse-and-bar strip between the two rivers; the historic nightlife street.' },
    { id: 'sherman-hill', name: 'Sherman Hill', route: 'old-side', note: 'Late 1800s houses northwest of downtown, big and divided into apartments.' },
    { id: 'university', name: 'the university neighborhood', route: 'campus', note: 'An urban campus of apartments and houses around University Avenue.' },
    { id: 'beaverdale', name: 'Beaverdale', route: 'old-side', note: 'Older bungalows with a small commercial strip; working-class turned family neighborhood.' },
    { id: 'north-side', name: 'the north side', route: 'work-side', note: 'Older, lower-priced houses with basements and garages, and small strips. Highland Park and Oak Park.' },
    { id: 'south-side', name: 'the South Side', route: 'work-side', note: 'The Latino commercial heart along SW 9th, with shop spaces, warehouses and old packing-plant buildings.' },
    { id: 'valley-junction', name: 'Valley Junction', route: 'old-side', note: 'A railroad-town business district in West Des Moines with independent shops.' }
  ],

  contacts: ['cedar-rapids-ia', 'iowa-city-ia', 'lincoln-ne', 'davenport-ia'],

  points: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 486000 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 508000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 }
  ],
  roads: ['I-80', 'I-35', 'I-235', 'US 69', 'US 65', 'US 30'],

  words: {
    street: ['Court Avenue', 'University Avenue', 'Grand Avenue', 'Ingersoll Avenue', 'Beaver Avenue', 'Euclid Avenue', 'Keosauqua Way', 'Hubbell Avenue', 'Merle Hay Road', 'SW 9th'],
    water: ['the Des Moines River', 'the Raccoon River', 'the Raccoon', 'Gray\'s Lake', 'Saylorville'],
    hood: ['East Village', 'Sherman Hill', 'Beaverdale', 'Highland Park', 'Oak Park', 'Valley Junction', 'Western Gateway', 'Merle Hay'],
    thing: ['tenderloin', 'skywalk', 'the Mixmaster', 'grain elevator', 'corn dog', 'basement', 'bar night', 'weeknight bill', 'tape archive'],
    weather: ['wind chill', 'derecho', 'humidity']
  }
});
