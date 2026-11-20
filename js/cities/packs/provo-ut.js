SB.Cities.register('provo-ut', {
  v: 1,
  slug: 'provo-ut',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['byu', 'brigham young university', 'uvu', 'utah valley university', 'honor code', 'lds', 'latter-day saints', 'church of jesus christ',
           'general conference', 'vivint', 'qualtrics', 'silicon slopes', 'frontrunner', 'uvx', 'uta', 'amtrak', 'california zephyr', 'kbyu', 'kenz', 'kxrk',
           'america\'s freedom festival', 'freedom festival', 'stadium of fire', 'festival latinoamericano', 'provo pride', 'utah valley marathon',
           'snow college', 'weber state', 'utah state university', 'university of utah', 'hill air force base', 'camp williams', 'tooele army depot',
           'dirty soda', 'fry sauce', 'maeser grange', 'fourth west hall', 'sego annex', 'the quiet hour', 'lakeview roller & skate', 'lakeview roller',
           'y-side garage', 'cottonwood back room', 'temple view carport', 'orchard storage unit', 'deseret warehouse 9', 'fry sauce pizza & games',
           'gilsonite room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['byu*', 'brigham young*', 'freedom festival*', 'stadium of fire*', 'deseret*', 'vivint*', 'qualtrics*', 'frontrunner*'],

  blurb: ['Dry, young and polite: shows run on soda, basements and an all-ages room that never serves beer.',
          'The crowd turns over every few years, as kids graduate, marry or leave on missions, and nobody plays Sunday.'],
  hard: 'Dry rooms, Sunday dead, and the students vanish in April.',
  region: 'the Wasatch Front',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Provo' },
    { id: 'orem', kind: 'FEEDER', name: 'Orem', minutes: 15, bearing: 20, note: 'The other half of the scene: strip malls, a big commuter campus, suburban kids and practice rooms.' },
    { id: 'springville', kind: 'FEEDER', name: 'Springville', minutes: 15, bearing: 165, note: 'Skate and garage kids in a small suburban town to the south.' },
    { id: 'spanish-fork', kind: 'FEEDER', name: 'Spanish Fork', minutes: 20, bearing: 155, note: 'Suburban and farm-edge; kids drive up the freeway.' },
    { id: 'american-fork', kind: 'FEEDER', name: 'American Fork and Pleasant Grove', minutes: 20, bearing: 355, note: 'A fast-growing tech-suburb strip to the north.' },
    { id: 'payson', kind: 'FEEDER', name: 'Payson', minutes: 25, bearing: 160, note: 'A small farm and church town.' },
    { id: 'nephi', kind: 'FEEDER', name: 'Nephi', minutes: 45, bearing: 175, note: 'A farm town in the next valley south.' },
    { id: 'heber', kind: 'FEEDER', name: 'Heber City', minutes: 40, bearing: 60, note: 'Up the canyon; ski-resort staff live here. Probably a handful of bands.', bands: 1 },
    { id: 'ephraim', kind: 'FEEDER', name: 'Ephraim', minutes: 80, bearing: 175, note: 'A small college town far to the south; some kids with a band.' },
    { id: 'price', kind: 'FEEDER', name: 'Price', minutes: 85, bearing: 110, note: 'A coal and rail town over the pass, with a small college branch.' },
    { id: 'ogden', kind: 'PEER', name: 'Ogden', minutes: 70, bearing: 350, slug: 'ogden-ut', note: 'An older, grittier railroad town up the freeway, past Salt Lake.' },
    { id: 'logan', kind: 'PEER', name: 'Logan', minutes: 125, bearing: 5, scene: 600, note: 'A college town in the far north valley with the same church-heavy culture.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old brick on Center Street and University Avenue: dry all-ages rooms, galleries and record shops, with storefront rent as the pressure.' },
    { id: 'student-grid', name: 'the student grid by campus', route: 'campus', note: 'Small old houses and apartment blocks rented to students. Basements, but landlords and housing contracts bite.' },
    { id: 'west-provo', name: 'west Provo', route: 'work-side', note: 'Cheap working-class streets with yards and detached garages. The best fit for backyard and garage shows.' },
    { id: 'southwest-provo', name: 'the I-15 business strip', route: 'work-side', note: 'Warehouses, business parks and big-box lots. Practice spaces and quiet one-night rooms, with few neighbors.' },
    { id: 'east-bench', name: 'the east bench', route: 'old-side', note: 'Wealthy foothill streets with finished basements. Few shows, but the comfortable kids who fund the scene live here.' },
    { id: 'lakeview', name: 'Lakeview and the lake edge', route: 'old-side', note: 'Flat new subdivisions and farmland toward Utah Lake. Quiet and lonely.' },
    { id: 'orem-state-st', name: 'Orem and the State Street strip', route: 'campus', note: 'Strip malls, skate culture and industrial-lot practice rooms. Less watched than Provo and less seasonal.' }
  ],

  contacts: ['ogden-ut'],

  points: [
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Provo Canyon', state: 'UT', lat: 40.33, lon: -111.55, pop: 2000 },
    { name: 'St. George', state: 'UT', lat: 37.10, lon: -113.58, pop: 100000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2300000 }
  ],
  roads: ['I-15', 'US 89', 'US 189', 'US 6', 'University Avenue', 'Center Street'],

  words: {
    street: ['University Avenue', 'Center Street', 'State Street', 'Freedom Boulevard', 'University Parkway'],
    water: ['Utah Lake', 'Provo River', 'Provo Canyon', 'Rock Canyon'],
    hood: ['Joaquin', 'Maeser', 'Franklin', 'Lakeview', 'Riverwoods', 'Provo Bay'],
    thing: ['basement', 'cream soda', 'cultural hall', 'ward building', 'returned missionary', 'inversion', 'foothill', 'soda run', 'finished basement', 'skatepark'],
    weather: ['inversion', 'dry heat', 'canyon wind']
  }
});
