SB.Cities.register('canton-oh', {
  v: 1,
  slug: 'canton-oh',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['pro football hall of fame', 'hall of fame village', 'hall of fame game', 'enshrinement week', 'aultman', 'cleveland clinic mercy',
           'malone university', 'walsh university', 'kent state stark', 'kent state', 'stark state', 'university of mount union', 'mount union',
           'college of wooster', 'sarta', 'canton repository', 'first friday', 'ohio state', 'browns', 'amtrak', 'capitol limited',
           'akron-canton airport', 'vfw', 'elks', 'moose lodge', 'fraternal order of eagles', 'massillon tigers',
           'the nimishillen annex', 'nimishillen annex', 'dueber avenue hall', 'the brickyard back room', 'brickyard back room', 'lincoln way rec',
           'fourth street upstairs', 'post 316', 'the roller bearing club', 'roller bearing club', 'hoover road garage', 'the tuscarawas room',
           'st. casimir\'s basement', 'the cleveland ave loft', 'cleveland ave loft', 'mill street lanes'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['canton repository*', 'hall of fame*', 'enshrinement*', 'walsh university*', 'mount union*', 'sarta*'],

  blurb: ['Canton lost its downtown punk and metal club and borrows all-ages nights from Akron. The riff-heavy bands stuck around.',
          'Punk and metal share bills for five bucks, and everyone in the room is in two or three of the bands.'],
  hard: 'The old downtown room is gone, so nobody has a place that holds a crowd.',
  region: 'the Rust Belt',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Canton' },
    { id: 'north-canton', kind: 'FEEDER', name: 'North Canton', minutes: 10, bearing: 5, note: 'A prosperous suburb with a small college. Half the booker\'s kids come from here.' },
    { id: 'massillon', kind: 'FEEDER', name: 'Massillon', minutes: 15, bearing: 270, pop: 32000, note: 'The football and mill town and old rival, with a small overlapping scene.' },
    { id: 'louisville', kind: 'FEEDER', name: 'Louisville', minutes: 15, bearing: 75, pop: 9000, note: 'A football-first small town to the east. Little scene.' },
    { id: 'canal-fulton', kind: 'FEEDER', name: 'Canal Fulton', minutes: 20, bearing: 320, note: 'A canal-heritage small town with little scene.' },
    { id: 'alliance', kind: 'FEEDER', name: 'Alliance', minutes: 25, bearing: 55, note: 'A small college town with a real if small scene.' },
    { id: 'new-philadelphia', kind: 'FEEDER', name: 'New Philadelphia and Dover', minutes: 30, bearing: 195, note: 'Old German-heritage mill and farm towns down the interstate.' },
    { id: 'kent', kind: 'FEEDER', name: 'Kent', minutes: 40, bearing: 20, pop: 28000, note: 'A big university town with a bigger scene: a magnet more than a feeder.' },
    { id: 'wooster', kind: 'FEEDER', name: 'Wooster', minutes: 40, bearing: 265, pop: 27000, note: 'A college and farm-county seat with a small scene of its own.' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem', minutes: 45, bearing: 80, note: 'A mill and farm town with some punk presence.' },
    { id: 'millersburg', kind: 'FEEDER', name: 'Millersburg', minutes: 50, bearing: 240, note: 'Farm and Amish country. Almost no scene, and the teens come in quietly.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', state: 'OH', minutes: 45, bearing: 355, slug: 'akron-oh', note: 'The real music town up the interstate, where the shows are better and the bars harder to get into.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', state: 'OH', minutes: 60, bearing: 60, slug: 'youngstown-oh', note: 'The other shrunken steel city, a near twin that trades bands and crowds.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 150, bearing: 25, slug: 'erie-pa', note: 'A distant lake city of similar size.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Arts District', route: 'downtown', note: 'Old commercial brick with a restored movie palace and plenty of empty upstairs space. Storefronts and bar back rooms; the likeliest place to get priced upward.' },
    { id: 'northwest-strip', name: 'the northwest strip', route: 'campus', note: 'Hotels and chain restaurants around the big football campus. Nothing DIY, and no parking on event days.' },
    { id: 'east-side', name: 'the southeast and industrial east side', route: 'work-side', note: 'Old plants, rail lines and working-class houses along the creek. Warehouse practice spaces; cheap and ignored.' },
    { id: 'west-park', name: 'West Park and Malone', route: 'campus', note: 'Student rentals and older houses with basements, but the neighbors are close.' },
    { id: 'market-heights', name: 'Market Heights, Mt. Vernon and Dueber', route: 'old-side', note: 'Older residential streets north and east of downtown. Cheap duplexes with basements: the realistic home of house shows.' },
    { id: 'ridgewood', name: 'Ridgewood', route: 'old-side', note: 'Wealthy historic streets where a house show is shut down fast. A source of band kids, not rooms.' },
    { id: 'belden', name: 'Belden Village and Whipple Avenue', route: 'campus', note: 'Malls and chain strips in the township, the center of gravity for suburban teens. Skate and mall hanging, not shows.' }
  ],

  contacts: ['akron-oh', 'youngstown-oh', 'pittsburgh', 'erie-pa'],

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 370000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83, pop: 900000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 300000 },
    { name: 'Mansfield', state: 'OH', lat: 40.76, lon: -82.52, pop: 47000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 630000 }
  ],
  roads: ['I-77', 'US 30', 'US 62', 'Tuscarawas Street', 'I-76', 'SR 43'],

  words: {
    street: ['Market Avenue', 'Cleveland Avenue', 'Tuscarawas Street', 'Fulton Road', 'Whipple Avenue', 'Lincoln Highway'],
    water: ['Nimishillen Creek', 'the Tuscarawas River', 'the canal'],
    hood: ['Dueber', 'Harter Heights', 'Market Heights', 'Mt. Vernon', 'Ridgewood', 'West Park', 'Belden Village', 'North Canton', 'Jackson Township'],
    thing: ['pop', 'brick row', 'steel mill', 'pierogi', 'coney dog', 'lodge hall', 'basement', 'strip mall', 'carpool north', 'five-dollar cover', 'group chat', 'riff band'],
    weather: ['lake-effect snow', 'gray winter', 'road salt']
  }
});
