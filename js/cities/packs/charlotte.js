SB.Cities.register('charlotte', {
  v: 1,
  slug: 'charlotte',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of north carolina at charlotte', 'unc charlotte', 'uncc', 'queens university of charlotte', 'johnson c smith university',
           'central piedmont community college', 'davidson college', 'charlotte observer', 'queen city nerve', 'qc nerve', 'creative loafing',
           'axios charlotte', 'charlotte magazine', 'wfae', 'wbtv', 'wsoc', 'wcnc', 'carolina panthers', 'charlotte hornets', 'charlotte fc',
           'charlotte knights', 'bank of america', 'wells fargo', 'truist', 'duke energy', 'lowe\'s', 'charlotte douglas international airport',
           'charlotte motor speedway', 'coca-cola 600', 'nascar', 'carowinds', 'fort mill', 'carolina renaissance festival', 'hurricane hugo',
           'hurricane helene', 'lynx', 'bojangles', 'waffle house', 'amtrak'],
  blocklist: ['charlotte observer*', 'queen city nerve*', 'creative loafing*', 'carowinds*', 'bank of america*', 'coca-cola 600*'],

  blurb: ['A banking skyline sitting on top of a punk scene that keeps losing its rooms to condos.',
          'The all-ages kids still find each other.'],
  hard: 'Redevelopment keeps erasing rooms and the sprawl scatters the crowd.',
  region: 'the Carolinas',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Charlotte' },
    { id: 'gastonia', kind: 'FEEDER', name: 'Gastonia', minutes: 30, bearing: 270, note: 'A working-class textile town with bands and kids.' },
    { id: 'concord', kind: 'FEEDER', name: 'Concord and Kannapolis', minutes: 30, bearing: 40, note: 'A racetrack town to the northeast.' },
    { id: 'rock-hill', kind: 'FEEDER', name: 'Rock Hill', state: 'SC', minutes: 30, bearing: 190, note: 'Across the line, with some DIY.' },
    { id: 'mooresville', kind: 'FEEDER', name: 'Mooresville and Huntersville', minutes: 35, bearing: 345, note: 'Lake suburbs.' },
    { id: 'monroe', kind: 'FEEDER', name: 'Monroe and Matthews', minutes: 35, bearing: 125, note: 'East suburbs.' },
    { id: 'salisbury', kind: 'FEEDER', name: 'Salisbury', minutes: 50, bearing: 20, note: 'A small old town.' },
    { id: 'shelby', kind: 'FEEDER', name: 'Shelby and Kings Mountain', minutes: 55, bearing: 270, note: 'Small towns to the west.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', state: 'SC', minutes: 100, bearing: 220, slug: 'greenville-sc', note: 'Its own DIY scene.' },
    { id: 'winston-salem', kind: 'PEER', name: 'Winston-Salem', minutes: 90, bearing: 40, slug: 'winston-salem-nc', note: 'Its own scene up I-77 and I-40.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 95, bearing: 175, slug: 'columbia-sc', note: 'A college-town scene.' }
  ],

  hoods: [
    { id: 'uptown', name: 'Uptown', route: 'downtown', note: 'Towers, arenas and bars. Nothing DIY.' },
    { id: 'noda', name: 'NoDa', route: 'downtown', note: 'An arts district of old mill houses. Clubs and bars, and condos rising where rooms closed.' },
    { id: 'plaza-midwood', name: 'Plaza Midwood', route: 'old-side', note: 'Older bungalows and bars. House-show territory.' },
    { id: 'south-end', name: 'South End', route: 'work-side', note: 'An old rail corridor full of apartments now. A big all-ages club closed here.' },
    { id: 'elizabeth', name: 'Elizabeth and Villa Heights', route: 'old-side', note: 'Old houses and renters.' },
    { id: 'belmont', name: 'Belmont and Optimist Park', route: 'old-side', note: 'Cheaper old houses near NoDa.' },
    { id: 'west-charlotte', name: 'West Charlotte and Wilkinson Boulevard', route: 'work-side', note: 'Warehouses and cheap space near the airport.' },
    { id: 'university-city', name: 'University City', route: 'campus', note: 'Students and suburban sprawl to the northeast.' },
    { id: 'matthews', name: 'Matthews and Pineville', route: 'campus', note: 'Suburbs where kids drive in.' },
    { id: 'dilworth', name: 'Dilworth and Myers Park', route: 'old-side', note: 'Wealthy. Not a scene base.' }
  ],

  contacts: ['greenville-sc', 'winston-salem-nc', 'columbia-sc', 'raleigh'],
  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 500000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55, pop: 95000 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 230000 }
  ],
  roads: ['I-77', 'I-85', 'I-485', 'I-277', 'Independence Boulevard', 'Tryon Street'],

  words: {
    street: ['Tryon Street', 'Independence Boulevard', 'North Davidson Street', 'Central Avenue', 'Wilkinson Boulevard', 'South Boulevard'],
    water: ['Lake Norman', 'Lake Wylie', 'Sugar Creek'],
    hood: ['NoDa', 'Plaza Midwood', 'South End', 'Elizabeth', 'Villa Heights', 'Optimist Park'],
    thing: ['light rail', 'mill house', 'speedway', 'sweet tea', 'condo tower'],
    weather: ['afternoon thunderstorm', 'ice storm']
  }
});
