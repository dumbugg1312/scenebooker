SB.Cities.register('erie-pa', {
  v: 1,
  slug: 'erie-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['gannon', 'gannon university', 'mercyhurst', 'penn state behrend', 'behrend', 'lecom', 'pennsylvania western university', 'edinboro university',
           'presque isle state park', 'wabtec', 'ge transportation', 'erie insurance', 'ontario hockey league', 'detroit tigers', 'erie reader',
           'erie times-news', 'bicentennial tower', 'lake shore limited', 'amtrak', 'csx', 'greyhound', 'intermodal transportation center',
           'roar on the shore', 'yuengling', 'genesee', 'liquor control board', 'vfw', 'american legion', 'sponge candy',
           'holland street annex', 'sixth street social', 'lakeview legion', 'perch & pierogi', 'perch and pierogi', 'ore dock',
           'peninsula skate barn', 'boiler annex', 'mill creek rec', 'snow belt room', 'east avenue basement', 'dobbins back room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['gannon*', 'mercyhurst*', 'behrend*', 'wabtec*', 'erie reader*', 'roar on the shore*', 'erie times*', 'lecom*'],

  blurb: ['Erie\'s hardcore and metal kids pack one all-ages hall and treasure it, since rooms here keep closing. Locals open, and the lake does the rest.',
          'Everyone remembers a closed room. Benefit nights keep the lights on, and snow decides who shows up.'],
  hard: 'One reliable all-ages room, and a history of closed rooms and lost tours.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88 },
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -79.99 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: 0.06, reason: 'Hardcore and metal share the same all-ages bills.' },
    { fan: 'metal', band: 'hardcore', d: 0.06, reason: 'Metalcore and revival nights draw both crowds.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Erie' },
    { id: 'harborcreek', kind: 'FEEDER', name: 'Harborcreek and Wesleyville', minutes: 15, bearing: 70, note: 'East suburbs with garages, barns and backyards on the road to the college.' },
    { id: 'fairview', kind: 'FEEDER', name: 'Girard and Fairview', minutes: 20, bearing: 265, note: 'Suburb and farm edge to the west; kids drive in.' },
    { id: 'north-east', kind: 'FEEDER', name: 'North East', minutes: 25, bearing: 65, note: 'Grape country with a small downtown. Kids drive in.' },
    { id: 'edinboro', kind: 'FEEDER', name: 'Edinboro', minutes: 30, bearing: 175, note: 'A college town in winter and a lake resort in summer; the likeliest to have a small scene of its own.', bands: 1 },
    { id: 'albion', kind: 'FEEDER', name: 'Albion', minutes: 30, bearing: 225, note: 'A tiny farm borough southwest.' },
    { id: 'union-city', kind: 'FEEDER', name: 'Union City and Waterford', minutes: 35, bearing: 165, note: 'Farm and creek towns to the south.' },
    { id: 'corry', kind: 'FEEDER', name: 'Corry', minutes: 40, bearing: 130, note: 'An old rail and factory town.' },
    { id: 'meadville', kind: 'FEEDER', name: 'Meadville', minutes: 40, bearing: 190, note: 'A small college town down I-79 with a scene of its own.', bands: 1 },
    { id: 'conneaut', kind: 'FEEDER', name: 'Conneaut and Ashtabula', state: 'OH', minutes: 45, bearing: 255, note: 'Working-class port and rail towns on the Ohio shore.' },
    { id: 'jamestown', kind: 'PEER', name: 'Jamestown', state: 'NY', minutes: 60, bearing: 80, scene: 500, note: 'A smaller industrial city across the state line; people cross both ways for shows.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', state: 'OH', minutes: 90, bearing: 220, slug: 'youngstown-oh', note: 'A Rust Belt twin with the same economy and the same winters.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The square, the old commercial blocks and a thin bar strip. Always being revitalized, and the rent near the water keeps rising.' },
    { id: 'little-italy', name: 'Little Italy and West 18th', route: 'old-side', note: 'Old working-class blocks with corner bars, bakeries, social halls and basements in doubles. Stable and slowly gentrifying.' },
    { id: 'east-side', name: 'the lower east side', route: 'work-side', note: 'Doubles, old churches and former factory blocks along the rail line. The cheapest rent and the most empty buildings, and the likeliest home of a basement or warehouse room.' },
    { id: 'college-orbits', name: 'the college rental streets', route: 'campus', note: 'Rental houses ringing the campuses. House shows follow the school calendar and churn every May.' },
    { id: 'millcreek', name: 'Millcreek and Peach Street', route: 'campus', note: 'Strip malls, chains and subdivisions south of the grid. Where the suburban kids live; practice garages, few real rooms.' },
    { id: 'millionaires-row', name: 'Millionaires Row', route: 'old-side', note: 'Victorian mansions on West 6th, many cut into apartments. Big basements and quiet neighbors who call.' }
  ],

  contacts: ['youngstown-oh', 'akron-oh', 'pittsburgh'],

  points: [
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 278000 },
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69, pop: 372000 },
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61, pop: 211000 },
    { name: 'Jamestown', state: 'NY', lat: 42.10, lon: -79.24, pop: 28000 }
  ],
  roads: ['I-90', 'I-79', 'I-86', 'PA 290', 'US 20', 'US 6N'],

  words: {
    street: ['State Street', 'Peach Street', 'West 18th', 'Holland Street', 'Parade Street', 'East Avenue', 'West 26th'],
    water: ['Lake Erie', 'the bay', 'Mill Creek', 'the Bayfront'],
    hood: ['Little Italy', 'the Bayfront', 'Millcreek', 'Harborcreek', 'Wesleyville', 'the lower east side', 'Millionaires Row'],
    thing: ['double house', 'fish fry', 'pierogi', 'perch sandwich', 'plow', 'road salt', 'parish hall', 'wedding soup', 'all-ages hall', 'revival night', 'benefit bill', 'canned food drive'],
    weather: ['lake effect', 'whiteout']
  }
});
