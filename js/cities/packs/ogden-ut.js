SB.Cities.register('ogden-ut', {
  v: 1,
  slug: 'ogden-ut',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['weber state', 'weber state university', 'kwcr', 'union pacific', 'southern pacific', 'hill air force base', 'hill afb',
           'internal revenue service', 'standard-examiner', 'frontrunner', 'ogden marathon', 'ogden arts festival', 'harvest moon festival',
           'winterfest', 'hot rocking 4th', 'peach days', 'pioneer days', 'ogden pioneer days', 'pioneer day', 'sundance', 'general conference',
           'lds', 'latter-day saints', 'mormon', 'brigham young university', 'byu', 'utah state university', 'cafe rio', 'crumbl', 'ogden high',
           'ben lomond high', 'freeport center', 'zion curtain', 'snowbasin', 'powder mountain', 'ogden union station', 'city weekly', 'vfw',
           'american legion', 'the switch shack', 'two-bit annex', 'wall avenue garage', 'eccles avenue rec room', 'the hostler\'s basement',
           'junction loading dock', 'shadow valley shed', 'canyon mouth hall', 'slaterville quonset', 'bench road carport', 'depot row pizza',
           'weber grange no. 9', 'weber grange'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real schools, base, press, church and events are written only in generic form. */
  blocklist: ['standard-examiner*', 'weber state*', 'hill air force*', 'peach days*', 'cafe rio*', 'switch shack*', 'two-bit annex*', 'weber grange*'],

  blurb: ['Sober kids pack basements and halls before curfew, and the bar rooms are a different, older crowd.',
          'A satellite of the big city forty minutes south: modest turnouts, loyal locals, and bands that skip it.'],
  hard: 'Bars can\'t take minors, so the two crowds never share a bill.',
  region: 'the Mountain West',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.2 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Ogden' },
    { id: 'roy-clearfield', kind: 'FEEDER', name: 'Roy and Clearfield', minutes: 15, bearing: 190, note: 'Bedroom suburbs by the base where many of the teenagers actually live; basements everywhere.' },
    { id: 'north-ogden', kind: 'FEEDER', name: 'North Ogden and Harrisville', minutes: 10, bearing: 355, note: 'Farm-turned-subdivision suburbs just north.' },
    { id: 'plain-city', kind: 'FEEDER', name: 'Plain City and West Haven', minutes: 20, bearing: 285, note: 'Flat farm country west toward the lake.' },
    { id: 'layton', kind: 'FEEDER', name: 'Layton and Kaysville', minutes: 25, bearing: 185, note: 'A mall-and-chain bedroom town and a farming-origin suburb; the nicer side of the county line.' },
    { id: 'morgan', kind: 'FEEDER', name: 'Morgan', minutes: 25, bearing: 110, note: 'A ranch and commuter town through the canyon on I-84.' },
    { id: 'ogden-valley', kind: 'FEEDER', name: 'Huntsville and Eden', minutes: 25, bearing: 75, note: 'Ski-money mountain valley up the canyon; far for kids without cars.' },
    { id: 'brigham-city', kind: 'FEEDER', name: 'Brigham City', minutes: 30, bearing: 340, note: 'An orchard town to the north with a small scene of its own.' },
    { id: 'bountiful', kind: 'FEEDER', name: 'Bountiful and Woods Cross', minutes: 35, bearing: 180, note: 'Salt Lake suburbs that send kids north for cheaper rooms.' },
    { id: 'tremonton', kind: 'FEEDER', name: 'Tremonton and Garland', minutes: 40, bearing: 330, note: 'A farm and factory town where a few teenagers drive for everything.' },
    { id: 'evanston', kind: 'FEEDER', name: 'Evanston', state: 'WY', minutes: 75, bearing: 100, note: 'An oil and rail town in Wyoming; kids drive in because nothing happens at home.' },
    { id: 'logan', kind: 'PEER', name: 'Logan', minutes: 60, bearing: 15, note: 'A college town up the canyon in a tight-knit valley; a smaller, closer scene.' },
    { id: 'provo', kind: 'PEER', name: 'Provo', minutes: 75, bearing: 180, slug: 'provo-ut', note: 'A big sober city to the south that locals call the other Utah.' },
    { id: 'pocatello', kind: 'PEER', name: 'Pocatello', state: 'ID', minutes: 110, bearing: 25, note: 'The next real stop north on I-15 for touring bands.' }
  ],

  hoods: [
    { id: 'twenty-fifth', name: 'downtown and Historic 25th Street', route: 'downtown', note: 'Old rail-hotel brick with restaurants, galleries and upstairs rooms; tourist-polished and heating up.' },
    { id: 'west-ogden', name: 'West Ogden and the rail yards', route: 'work-side', note: 'Warehouses, garages and lower-income families by the tracks; cheap now and eyed for redevelopment.' },
    { id: 'east-central', name: 'East Central', route: 'old-side', note: 'Old Victorian and bungalow streets with basements and porches; renters and students, slowly gentrifying.' },
    { id: 'east-bench', name: 'the East Bench by the university', route: 'campus', note: 'Student rentals and mid-century houses on the bench; quiet over breaks.' },
    { id: 'south-ogden', name: 'South Ogden and Riverdale', route: 'work-side', note: 'Chain-store strips and tract houses at the interstate junction; strip-mall practice rooms and basements.' },
    { id: 'shadow-valley', name: 'Shadow Valley and the hillside', route: 'old-side', note: 'Expensive hillside homes; almost nothing but parents with finished basements.' }
  ],

  contacts: ['provo-ut', 'boise-id', 'fort-collins-co', 'boulder-co'],

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1300000 },
    { name: 'Pocatello', state: 'ID', lat: 42.87, lon: -112.45, pop: 56000 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2300000 }
  ],
  roads: ['I-15', 'I-84', 'US 89', 'SR 39', 'I-80', 'Harrison Boulevard'],

  words: {
    street: ['Washington Boulevard', 'Harrison Boulevard', 'Wall Avenue', 'Twenty-Fifth Street', 'Twelfth Street', 'Grant Avenue', 'Lincoln Avenue'],
    water: ['the Weber River', 'the Ogden River', 'Pineview Reservoir', 'the Great Salt Lake'],
    hood: ['East Central', 'the East Bench', 'Shadow Valley', 'West Ogden', 'Riverdale', 'Harrisville', 'Eden'],
    thing: ['fry sauce', 'dirty soda', 'freight train', 'basement', 'canyon road', 'funeral potatoes', 'pastrami burger', 'skatepark', 'curfew', 'merch table'],
    weather: ['inversion', 'air alert', 'canyon wind', 'monsoon storm']
  }
});
