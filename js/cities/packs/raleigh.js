SB.Cities.register('raleigh', {
  v: 1,
  slug: 'raleigh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['north carolina state university', 'nc state', 'ncsu', 'wknc', 'meredith college', 'peace university', 'shaw university', 'saint augustine\'s university',
           'wake tech', 'university of north carolina', 'unc', 'duke university', 'indy week', 'news and observer', 'n&o', 'wral', 'wunc', 'wake county',
           'carolina hurricanes', 'nc fc', 'carolina railhawks', 'nc state fair', 'red hat amphitheater', 'pnc arena', 'lenovo center', 'carter-finley', 'dorton arena',
           'research triangle park', 'rtp', 'sas institute', 'red hat', 'fort bragg', 'camp lejeune', 'hurricane fran', 'hurricane florence', 'hurricane matthew',
           'hurricane isabel', 'duke', 'tar heels', 'wolfpack'],
  blocklist: ['nc state*', 'ncsu*', 'wknc*', 'news and observer*', 'indy week*', 'red hat software*', 'sas institute*'],

  blurb: ['A state capital of newcomers and the middle of the Triangle: a big, spread-out city where hardcore and metal rooms come and go.',
          'Scene history is patchy because everyone is from somewhere else. Matinees at stores and halls do the work the bars will not, and the same few dozen faces turn up at each one.'],
  hard: 'Rooms close fast, the Beltline eats load-in, and the kids live out in the suburbs.',
  region: 'the Carolinas',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.9 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore labels, a record shop and a downtown room have kept this town loyal to hardcore.' },
    { fan: 'metal', band: 'metal', d: .08, reason: 'The local metal crowd has been showing up for each other for years.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Raleigh' },
    { id: 'garner', kind: 'FEEDER', name: 'Garner', minutes: 15, bearing: 170, note: 'A working-class suburb to the south; the kids come in.' },
    { id: 'cary', kind: 'FEEDER', name: 'Cary', minutes: 20, bearing: 235, note: 'A huge suburb full of teenagers with cars. A lot of bands start here.' },
    { id: 'knightdale', kind: 'FEEDER', name: 'Knightdale', minutes: 20, bearing: 85, note: 'An east-side suburb; the kids ride in.' },
    { id: 'wake-forest', kind: 'FEEDER', name: 'Wake Forest', minutes: 25, bearing: 5, note: 'A growing bedroom town to the north.' },
    { id: 'apex', kind: 'FEEDER', name: 'Apex', minutes: 25, bearing: 230, note: 'A commuter suburb of young families, with a few bands.' },
    { id: 'clayton', kind: 'FEEDER', name: 'Clayton', minutes: 30, bearing: 140, note: 'A small town past Garner with few shows of its own.' },
    { id: 'fuquay-varina', kind: 'FEEDER', name: 'Fuquay-Varina', minutes: 30, bearing: 195, note: 'A small town with few options.' },
    { id: 'durham', kind: 'PEER', name: 'Durham', minutes: 35, bearing: 315, slug: 'durham-nc', note: 'The Triangle neighbor with a deeper punk and indie lineage.' },
    { id: 'chapel-hill', kind: 'PEER', name: 'Chapel Hill', minutes: 40, bearing: 295, note: 'A student town with many bands and a shared audience.' },
    { id: 'greensboro', kind: 'PEER', name: 'Greensboro', minutes: 90, bearing: 275, slug: 'greensboro-nc', note: 'Smaller, and on the same touring road.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, a few all-ages-friendly rooms and parking decks: the one dense night-out core.' },
    { id: 'glenwood-south', name: 'Glenwood South', route: 'downtown', note: 'A loud bar strip, and expensive. More bachelorette party than basement.' },
    { id: 'oakwood', name: 'Oakwood', route: 'old-side', note: 'Old Victorian houses on quiet streets. Low tolerance for noise.' },
    { id: 'boylan-heights', name: 'Boylan Heights', route: 'old-side', note: 'Small historic streets by the tracks with cheapish renters. House shows are possible.' },
    { id: 'five-points', name: 'Five Points', route: 'old-side', note: 'Leafy bungalows with older money creeping in.' },
    { id: 'hillsborough-street', name: 'Hillsborough Street', route: 'campus', note: 'A strip of cheap food and bars beside the big school. Students and a few rooms.' },
    { id: 'wilmington-street', name: 'South Wilmington Street', route: 'work-side', note: 'Warehouses, auto shops and a rail line. The cheapest space in town.' },
    { id: 'east-raleigh', name: 'East Raleigh and Poole Road', route: 'work-side', note: 'Working-class, older houses, far from the bars.' },
    { id: 'north-raleigh', name: 'North Raleigh', route: 'campus', note: 'Big suburbs and strip malls. The kids who drive in come from here.' }
  ],

  contacts: ['durham-nc', 'greensboro-nc', 'charlotte', 'richmond'],

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2900000 },
    { name: 'Chapel Hill', state: 'NC', lat: 35.91, lon: -79.06, pop: 61000 },
    { name: 'Fayetteville', state: 'NC', lat: 35.05, lon: -78.88, pop: 210000 },
    { name: 'Greenville', state: 'NC', lat: 35.61, lon: -77.37, pop: 90000 }
  ],
  roads: ['I-40', 'I-440', 'I-540', 'US 1', 'US 64', 'I-85'],

  words: {
    street: ['Hillsborough Street', 'Glenwood Avenue', 'Capital Boulevard', 'Wilmington Street', 'Martin Street', 'Person Street'],
    water: ['the Neuse', 'Walnut Creek', 'Crabtree Creek'],
    hood: ['Oakwood', 'Boylan Heights', 'Five Points', 'Glenwood South', 'Cameron Village', 'Poole Road'],
    thing: ['beltline', 'pollen', 'matinee', 'bungalow', 'barbecue plate', 'garden apartment'],
    weather: ['pollen', 'afternoon thunderstorm', 'ice storm']
  }
});
