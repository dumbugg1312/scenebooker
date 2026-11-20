SB.Cities.register('yakima-wa', {
  v: 1,
  slug: 'yakima-wa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['yakima valley college', 'heritage university', 'central washington university', 'cwu', 'pacific northwest university of health sciences', 'yakima training center',
           'yakima herald-republic', 'herald-republic', 'whirlpool', 'seahawks', 'seattle seahawks', 'fresh hop ale festival', 'fresh-hop ale festival', 'folklife festival',
           'central washington state fair', 'state fair park', 'ellensburg rodeo', 'toppenish pow wow', 'pow-wow', 'fiestas patrias', 'palm springs of washington', 'yakistan',
           'yakama', 'yakama nation', 'vfw', 'eagles', 'elks', 'grange', 'washington state liquor and cannabis board', 'liquor and cannabis board', 'amtrak', 'wsdot',
           'bin room', 'kiln sixteen', 'cold storage nine', 'packing annex', 'ahtanum road hall', 'wiley flats barn', 'gap rail shed', 'orchard row garage',
           'naches bend grange', 'terrace overlook shop', 'canal street basement', 'rattlesnake ridge room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['yakima herald*', 'seahawks*', 'whirlpool*', 'central washington university*', 'yakima valley college*', 'heritage university*'],

  blurb: ['A hops, fruit and wine city in the dry valley east of the Cascades, where garages, yards and church halls carry small, scrappy shows.',
          'Punk comes in bursts from a few kids with a PA, and the Latino and suburban scenes mostly run on separate tracks.'],
  hard: 'A long drive over the pass, few all-ages rooms, and kids with no rides.',
  region: 'the Northwest',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43 },
    { name: 'Tacoma', state: 'WA', lat: 47.25, lon: -122.44 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Yakima' },
    { id: 'selah', kind: 'FEEDER', name: 'Selah', minutes: 10, bearing: 355, note: 'An orchard commuter town just north; a source of garage bands.' },
    { id: 'union-gap', kind: 'FEEDER', name: 'Union Gap', minutes: 10, bearing: 180, note: 'The retail city to the south: big-box lots and light-industrial units, no scene of its own.' },
    { id: 'moxee', kind: 'FEEDER', name: 'Moxee', minutes: 15, bearing: 95, note: 'Hop country and barn-show territory.' },
    { id: 'naches', kind: 'FEEDER', name: 'Naches', minutes: 20, bearing: 300, note: 'A tiny foothill orchard town on the road toward the pass.' },
    { id: 'wapato', kind: 'FEEDER', name: 'Wapato', minutes: 20, bearing: 150, note: 'A small farm town with a tight-knit rock and metal crowd.' },
    { id: 'toppenish', kind: 'FEEDER', name: 'Toppenish', minutes: 25, bearing: 190, note: 'A small town of murals and a branch college, with some scene overlap.' },
    { id: 'zillah', kind: 'FEEDER', name: 'Zillah', minutes: 25, bearing: 130, note: 'A small wine and farm town with no scene of note.' },
    { id: 'ellensburg', kind: 'FEEDER', name: 'Ellensburg', minutes: 40, bearing: 5, note: 'A college town with its own DIY scene: the nearest rival and friend.' },
    { id: 'sunnyside', kind: 'FEEDER', name: 'Sunnyside and Grandview', minutes: 40, bearing: 125, note: 'Farm and food-processing towns, largely Latino, with garage and Spanish-language rock.' },
    { id: 'prosser', kind: 'FEEDER', name: 'Prosser', minutes: 45, bearing: 120, note: 'A wine-country county seat with little scene.' },
    { id: 'tri-cities', kind: 'PEER', name: 'The Tri-Cities', minutes: 75, bearing: 115, slug: 'kennewick-wa', note: 'A bigger, windier engineering-and-nuclear region. The usual stop on the loop between the coast and Spokane.' },
    { id: 'wenatchee', kind: 'PEER', name: 'Wenatchee', minutes: 135, bearing: 5, note: 'An apple and tourism city to the north; occasional exchange.' },
    { id: 'walla-walla', kind: 'PEER', name: 'Walla Walla', minutes: 140, bearing: 110, note: 'A small college and wine town; occasional exchange.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Yakima', route: 'downtown', note: 'Old brick storefronts and fruit warehouses along the tracks. More bars every year, which squeezes all-ages shows.' },
    { id: 'southeast', name: 'the Southeast and South 1st Street', route: 'old-side', note: 'The Latino commercial strip and its neighborhoods: backyard and garage parties, cumbia, norteño and Spanish-language rock.' },
    { id: 'west-valley', name: 'West Valley', route: 'campus', note: 'Orchards and newer subdivisions with big garages and pole barns. Parent-adjacent, and a ride is needed.' },
    { id: 'nob-hill', name: 'Nob Hill Boulevard and the college strip', route: 'campus', note: 'Strip-mall cheap: chain restaurants, auto shops, shop-bay practice rooms and church halls.' },
    { id: 'terrace-heights', name: 'Terrace Heights', route: 'work-side', note: 'A quiet bluff suburb across the river; easy to be stuck over the bridge with no ride.' },
    { id: 'northwest', name: 'the northwest side and Fruitvale', route: 'old-side', note: 'Older houses with real basements near the river trails. Slowly gentrifying.' },
    { id: 'warehouses', name: 'the rail warehouses', route: 'work-side', note: 'Leftover fruit warehouses near the tracks: the best DIY space if the landlords stay indifferent.' }
  ],

  contacts: ['kennewick-wa', 'spokane-wa'],

  points: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68, pop: 2500000 },
    { name: 'Spokane', state: 'WA', lat: 47.66, lon: -117.43, pop: 590000 },
    { name: 'Ellensburg', state: 'WA', lat: 46.99, lon: -120.55, pop: 19000 },
    { name: 'Wenatchee', state: 'WA', lat: 47.42, lon: -120.31, pop: 120000 }
  ],
  roads: ['I-82', 'US 97', 'US 12', 'SR 24', 'I-90', 'Snoqualmie Pass'],

  words: {
    street: ['Yakima Avenue', 'Nob Hill Boulevard', 'Summitview Avenue', 'South 1st Street', 'Front Street', 'Ahtanum Road'],
    water: ['the Yakima River', 'the Naches River', 'the Greenway', 'the Yakima Canyon'],
    hood: ['Terrace Heights', 'West Valley', 'Fruitvale', 'the Gap', 'Union Gap', 'Selah', 'Moxee'],
    thing: ['hop kiln', 'fruit bin', 'packing shed', 'espresso stand', 'taco truck', 'orchard row', 'wildfire smoke', 'generator', 'space heater', 'sagebrush ridge'],
    weather: ['wildfire smoke', 'heat wave', 'pass closure']
  }
});
