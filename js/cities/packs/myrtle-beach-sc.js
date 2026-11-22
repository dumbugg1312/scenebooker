SB.Cities.register('myrtle-beach-sc', {
  v: 1,
  slug: 'myrtle-beach-sc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['bike week', 'black bike week', 'can-am days', 'can-am', 'coastal uncorked', 'sun fun festival', 'sun fun', 'senior week',
           'carolina country music fest', 'coastal carolina university', 'coastal carolina', 'sun news', 'waffle house', 'hurricane matthew',
           'hurricane florence', 'hurricane ian', 'myrtle beach air force base', 'pavilion amusement park', 'american legion', 'vfw', 'low tide hall',
           'the bypass annex', 'bypass annex', 'dune road garage', 'shag hall backroom', 'waterway warehouse', 'hushpuppy hall',
           'the rented room on kings', 'tern street studio', 'marsh lot', 'peanut stand annex', 'the motel ballroom',
           'atlantic beach bikefest', 'atlantic beach', 'bikefest', 'black pearl', 'spring bike week', 'harley bike week', 'run to the sun', 'myrtle beach mini marathon',
           'mini marathon', 'myrtle beach classic', 'myrtle beach international film festival', 'mbiff', 'dickens christmas show', 'myrtle beach convention center',
           'plyler park', 'grand strand magazine', 'visit myrtle beach', 'myrtle beach sun news', 'myrtle beach police department', 'quality of life court',
           'horry county', 'beach n chili fest', 'myrtle beach food truck festival'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm' in game text. */
  blocklist: ['sun news*', 'coastal carolina*', 'bike week*', 'can-am*', 'waffle house*', 'low tide hall*', 'hushpuppy hall*', 'senior week*'],

  blurb: ['Summer pays the rent and the crowd leaves in September.',
          'Shows fit around restaurant shifts, beach traffic and the next storm, and the cover-band strip is what the scene defines itself against.'],
  hard: 'Seasonal crowd, strict noise rules, no basements, long drives.',
  region: 'the Carolina coast',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Charleston', state: 'SC', lat: 32.78, lon: -79.93 },
    { name: 'Wilmington', state: 'NC', lat: 34.23, lon: -77.94 },
    { name: 'Columbia', state: 'SC', lat: 34.0, lon: -81.03 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Myrtle Beach' },
    { id: 'surfside', kind: 'FEEDER', name: 'Surfside Beach', minutes: 15, bearing: 220, note: 'A family beach town of retirees. Occasional backyard shows.' },
    { id: 'conway', kind: 'FEEDER', name: 'Conway', minutes: 25, bearing: 280, note: 'The college and riverfront town inland: the likeliest second scene, full from fall to spring and drained in summer.' },
    { id: 'murrells-inlet', kind: 'FEEDER', name: 'Murrells Inlet and Pawleys Island', minutes: 30, bearing: 225, note: 'Seafood and marsh towns down US 17.' },
    { id: 'north-myrtle', kind: 'FEEDER', name: 'North Myrtle Beach', minutes: 30, bearing: 40, note: 'A separate resort city of beach music and bars, with a different crowd and its own rivalries.' },
    { id: 'little-river', kind: 'FEEDER', name: 'Little River', minutes: 35, bearing: 45, note: 'A fishing village at the North Carolina line.' },
    { id: 'loris', kind: 'FEEDER', name: 'Loris and Aynor', minutes: 35, bearing: 325, note: 'Small farm and mill towns up US 9.' },
    { id: 'georgetown', kind: 'FEEDER', name: 'Georgetown', minutes: 45, bearing: 225, note: 'An old port with a steel mill and a paper mill. Working-class.' },
    { id: 'mullins', kind: 'FEEDER', name: 'Mullins', minutes: 50, bearing: 305, note: 'Tobacco and farm country on US 501.' },
    { id: 'florence', kind: 'PEER', name: 'Florence', state: 'SC', minutes: 75, bearing: 295, scene: 500, note: 'A similar-sized rail and highway hub inland. Crowds trade both ways.' },
    { id: 'wilmington', kind: 'PEER', name: 'Wilmington', state: 'NC', minutes: 100, bearing: 55, slug: 'wilmington-nc', note: 'Bigger, more of an arts town, with more rooms: where a Strand band most wants to play.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', state: 'SC', minutes: 120, bearing: 225, slug: 'charleston-sc', note: 'Bigger and pricier with a large scene. It takes bands and people.' },
    { id: 'fayetteville', kind: 'PEER', name: 'Fayetteville', state: 'NC', minutes: 135, bearing: 330, slug: 'fayetteville-nc', note: 'A military city, friendly to hardcore.' }
  ],

  hoods: [
    { id: 'oceanfront', name: 'the oceanfront strip', route: 'downtown', note: 'Hotels, arcades and shirt shops along the boulevard. Almost no room for a show, priced up and heavily policed.' },
    { id: 'old-town', name: 'Withers Swash and old downtown', route: 'old-side', note: 'Older motels and small houses just inland of the oceanfront: the best old bet for a cheap storefront or house, and it is being cleared fast.' },
    { id: 'carver', name: 'the Carver neighborhood', route: 'old-side', note: 'The historic Black community of the old city, with its own history. A real neighborhood, not a punk district.' },
    { id: 'market-common', name: 'Market Common', route: 'campus', note: 'Polished shops and apartments on the old air base. Expensive, with no DIY space.' },
    { id: 'socastee', name: 'Socastee and the Intracoastal side', route: 'work-side', note: 'Working-class strip malls, boat storage and subdivisions across the waterway. Garages and yards: the likeliest house shows.' },
    { id: 'carolina-forest', name: 'Carolina Forest', route: 'campus', note: 'Big inland subdivisions full of teenagers whose parents drive them. Garage bands and no venues.' },
    { id: 'south-strand', name: 'Garden City and the south strand', route: 'old-side', note: 'Quiet beach and fishing-village towns down US 17. Retirees, seafood and the odd backyard show.' },
    { id: 'north-myrtle-hood', name: 'North Myrtle Beach', route: 'old-side', note: 'A separate resort city up the road, with its own bars and crowd.' }
  ],

  contacts: ['wilmington-nc', 'charleston-sc', 'columbia-sc', 'fayetteville-nc'],

  calendar: [
    { id: 'spring-break-fest', label: 'the spring-break festival weekends', tag: 'festival', month: 3, weeks: [2, 3], dows: [4, 5, 6], can: [.80, .75, .75], hoods: ['oceanfront', 'old-town'], elsewhere: [.95, .92, .92] },
    { id: 'spring-bike-rally', label: 'the spring bike rally', tag: 'festival', month: 5, weeks: [2, 3], dows: [4, 5, 6], can: [.70, .65, .65], hoods: ['oceanfront', 'old-town', 'socastee'], elsewhere: [.88, .85, .85] },
    { id: 'memorial-bike-fest', label: 'the Memorial Day bike festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6, 0], can: [.70, .65, .65], hoods: ['oceanfront', 'old-town'], elsewhere: [.90, .88, .88] },
    { id: 'senior-trip', label: 'the graduates\' beach week', tag: 'graduation', month: 6, week: 4, dows: [3, 4, 5, 6], can: [.90, .92, .92], hoods: ['oceanfront', 'old-town'], elsewhere: [1, 1, 1] },
    { id: 'fourth-weekend', label: 'the Fourth of July weekend', tag: 'holiday', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.75, .72, .72], hoods: ['oceanfront', 'old-town'], elsewhere: [.92, .90, .90] },
    { id: 'half-marathon', label: 'the fall half-marathon', tag: 'race', month: 10, week: 2, dows: [5], can: [.92, .90, .90], hoods: ['oceanfront'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Florence', state: 'SC', lat: 34.2, lon: -79.76, pop: 40000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 880000 },
    { name: 'Whiteville', state: 'NC', lat: 34.34, lon: -78.7, pop: 5000 }
  ],
  roads: ['US 17', 'US 501', 'SC 22', 'Highway 31', 'I-95', 'the Bypass'],

  words: {
    street: ['Ocean Boulevard', 'Kings Highway', 'US 501', 'the Bypass', 'Highway 17', 'Highway 31', 'Highway 544'],
    water: ['the Intracoastal', 'Withers Swash', 'the Waccamaw', 'the marsh'],
    hood: ['Withers Swash', 'Socastee', 'Carolina Forest', 'Market Common', 'Garden City', 'Surfside', 'Arcadian Shores', 'Ocean Forest', 'Springmaid', 'Carver'],
    thing: ['mini golf', 'saltwater taffy', 'hushpuppies', 'boiled peanuts', 'carport', 'seafood buffet', 'shirt shop', 'neon sign', 'motel', 'off-season motel', 'cover band', 'bug spray', 'beach traffic'],
    weather: ['humidity', 'storm watch', 'sea breeze']
  }
});
