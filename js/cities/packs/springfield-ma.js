SB.Cities.register('springfield-ma', {
  v: 1,
  slug: 'springfield-ma',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['baystate medical center', 'baystate', 'massmutual', 'massmutual center', 'smith & wesson', 'general dynamics', 'mercy medical center',
           'basketball hall of fame', 'hall of fame', 'bright nights', 'eastern states exposition', 'the big e', 'springfield college', 'amtrak',
           'bradley international', 'bradley airport', 'pioneer valley transit authority', 'pvta', 'five college', 'five colleges', 'five college consortium',
           'mgm springfield', 'mgm', 'springfield thunderbirds', 'thunderbirds', 'springfield republican', 'masslive', 'valley advocate', 'wfcr',
           'dunkin', 'dunkin donuts', 'friendly\'s', 'white castle',
           'the mill river pump house', 'mill river pump house', 'tapley street annex', 'sixteen acres lanes', 'st. casimir\'s lower hall', 'st. casimirs lower hall',
           'the orchard loading dock', 'orchard loading dock', 'dwight street social club', 'chapman yard', 'brightwood boxing gym',
           'armory hill bocce club', 'forest park rec annex', 'the pioneer pallet co.', 'pioneer pallet', 'boston road skate and sub'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['baystate*', 'massmutual*', 'smith & wesson*', 'mgm*', 'thunderbirds*', 'valley advocate*', 'dunkin*', 'hall of fame*'],

  blurb: ['Mill-town heavy: halls, basements and old heads who remember the metalcore boom.',
          'The scene is small and scattered. Local bands play the valley more than they play home.'],
  hard: 'Few rooms, and every one depends on one landlord or one parent.',
  region: 'the Valley',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Springfield' },
    { id: 'west-springfield', kind: 'FEEDER', name: 'West Springfield', minutes: 10, bearing: 275, note: 'Across the river: strip-mall suburb with cheap warehouse units. Kids come over for shows.' },
    { id: 'chicopee', kind: 'FEEDER', name: 'Chicopee', minutes: 15, bearing: 15, note: 'A Polish and Irish mill city with an air reserve base; real shows have happened here.' },
    { id: 'holyoke', kind: 'FEEDER', name: 'Holyoke', minutes: 20, bearing: 335, note: 'A canal and paper-mill city, mostly Puerto Rican, with its own mill-space artists.' },
    { id: 'enfield', kind: 'FEEDER', name: 'Enfield', state: 'CT', minutes: 20, bearing: 180, note: 'A Connecticut border suburb tied to the Springfield crowd.' },
    { id: 'westfield', kind: 'FEEDER', name: 'Westfield', minutes: 25, bearing: 280, note: 'A state college town with a guard base and a small scene of its own.' },
    { id: 'palmer', kind: 'FEEDER', name: 'Palmer and Monson', minutes: 30, bearing: 95, note: 'Rail-junction mill towns on the rural edge; kids who drive in.' },
    { id: 'northampton', kind: 'FEEDER', name: 'Northampton', minutes: 30, bearing: 350, note: 'A college and arts town with a strong scene of its own and the draw for kids who want a nicer night.' },
    { id: 'amherst', kind: 'FEEDER', name: 'Amherst', minutes: 35, bearing: 25, note: 'A big state university and four more colleges; students and a real local scene.' },
    { id: 'greenfield', kind: 'FEEDER', name: 'Greenfield', minutes: 45, bearing: 0, note: 'The northern anchor of the valley: rural and countercultural.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', minutes: 55, bearing: 85, slug: 'worcester-ma', note: 'The east-west pipeline for bands, with a bigger scene and more rooms.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', state: 'CT', minutes: 60, bearing: 190, slug: 'new-haven-ct', note: 'A college and arts city that shares some touring bands.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', slug: 'albany-ny', state: 'NY', minutes: 85, bearing: 290, scene: 1500, note: 'The mirror image to the west and the next stop on a tour.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', slug: 'providence', state: 'RI', minutes: 90, bearing: 110, scene: 2500, note: 'A bigger, arts-heavy scene.' }
  ],

  hoods: [
    { id: 'metro-center', name: 'downtown', route: 'downtown', note: 'A compact grid of bars, club stages and empty upper floors, with a casino at the south end. Mostly 21 and over.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'The old Italian neighborhood: social clubs and church halls on Main Street.' },
    { id: 'mason-square', name: 'Mason Square and the Hill', route: 'old-side', note: 'Storefronts, church basements and community halls up the hill, long ignored by outside money.' },
    { id: 'brightwood', name: 'Brightwood and the North End', route: 'work-side', note: 'Dense Puerto Rican blocks cut off by the elevated highway. Cheap, ignored, proud; mill space and backyards.' },
    { id: 'forest-park', name: 'Forest Park and Sixteen Acres', route: 'campus', note: 'Quiet capes and subdivisions where the finished basements are, and parents who tolerate it.' },
    { id: 'indian-orchard', name: 'Indian Orchard', route: 'work-side', note: 'A self-contained mill village in the northeast corner with old mill rooms, church halls and yards.' },
    { id: 'liberty-heights', name: 'Liberty Heights and Six Corners', route: 'old-side', note: 'Big old houses with real basements, rented cheap to students and artists.' },
    { id: 'boston-road', name: 'Boston Road and East Springfield', route: 'work-side', note: 'Chain stores, motels and industrial park units: dead-end commercial and cheap.' }
  ],

  contacts: ['worcester-ma', 'new-haven-ct'],

  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 121000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 99000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 190000 }
  ],
  roads: ['I-91', 'I-90', 'I-291', 'US 20', 'US 5', 'Route 57'],

  words: {
    street: ['Main Street', 'State Street', 'Dwight Street', 'Boston Road', 'Memorial Avenue', 'Court Square'],
    water: ['the Connecticut River', 'the Chicopee River'],
    hood: ['Brightwood', 'Indian Orchard', 'Sixteen Acres', 'Pine Point', 'McKnight', 'Six Corners', 'Liberty Heights', 'Old Hill', 'Memorial Square'],
    thing: ['three-decker', 'packie', 'grinder', 'rotary', 'mill room', 'nor\'easter', 'bocce court', 'social club', 'practice room'],
    weather: ['nor\'easter', 'ice storm']
  }
});
