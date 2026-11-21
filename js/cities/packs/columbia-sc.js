SB.Cities.register('columbia-sc', {
  v: 1,
  slug: 'columbia-sc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  /* The dossier's real institutions and its invented venue names are in banned: research, not content. */
  banned: ['university of south carolina', 'usc', 'fort jackson', 'shaw air force base', 'gamecocks', 'clemson', 'fireflies', 'the state newspaper',
           'free times', 'columbia star', 'carolina panorama', 'sc black news', 'soda city market', 'soda city', 'carolina cup', 'state fair',
           'south carolina state fair', 'amtrak', 'silver star', 'greyhound', 'megabus', 'waffle house', 'cheerwine', 'pbr', 'allen university',
           'benedict college', 'columbia college', 'midlands technical college', 'newberry college', 'claflin', 'south carolina state university',
           'morris college', 'savannah river site', 'american legion', 'vfw', 'famously hot', 'the pecan room', 'fall line hall', 'the lazy congaree',
           'mill row annex', 'kudzu court', 'broad river bay', 'the oyster cracker', 'twelve mile garage', 'red clay social', 'gervais and back',
           'palmetto porch', 'the lowcountry upstairs'],
  blocklist: ['waffle house*', 'cheerwine*', 'soda city*', 'free times*', 'fort jackson*', 'gamecocks*'],

  blurb: ['The state capital at the fall line, where three rivers meet: a big university, an Army training post and a town that drives everywhere.',
          'Bands share rented bungalows in the old neighborhoods until the rent climbs or the students turn over.'],
  hard: 'The college turns over every four years and football swallows the autumn weekends.',
  region: 'the Southeast',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: .08, reason: 'Screamo and hardcore bands share bills for the same kids.' },
    { fan: 'metal', band: 'hardcore', d: .06, reason: 'The metal and hardcore underground runs mixed bills.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Columbia' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington and Irmo', minutes: 20, bearing: 285, note: 'Growing suburbs; the likeliest all-ages kids, who drive in.' },
    { id: 'camden', kind: 'FEEDER', name: 'Camden', minutes: 40, bearing: 40, note: 'A horse-country county seat; its kids come to Columbia.' },
    { id: 'sumter', kind: 'FEEDER', name: 'Sumter', minutes: 50, bearing: 95, note: 'The biggest outlying town: military kids and some real punk.' },
    { id: 'orangeburg', kind: 'FEEDER', name: 'Orangeburg', minutes: 45, bearing: 150, note: 'Three colleges; more hip-hop and gospel than punk.' },
    { id: 'newberry', kind: 'FEEDER', name: 'Newberry', minutes: 50, bearing: 315, note: 'A small college town with a few musicians.' },
    { id: 'winnsboro', kind: 'FEEDER', name: 'Winnsboro', minutes: 40, bearing: 350, note: 'Rural county seat; kids drive in on weekends.' },
    { id: 'batesburg', kind: 'FEEDER', name: 'Batesburg-Leesville and Saluda', minutes: 40, bearing: 255, note: 'Farm towns; teenagers drive forty-five minutes for a Saturday.' },
    { id: 'aiken', kind: 'FEEDER', name: 'Aiken', minutes: 70, bearing: 235, note: 'Horse country between here and Augusta; its kids go either way.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', state: 'GA', minutes: 75, bearing: 240, slug: 'augusta-ga', note: 'Close in size and mood: the easiest weekend swap.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', slug: 'greenville-sc', minutes: 95, bearing: 320, scene: 900, note: 'Richer and polished; the Upstate and the Midlands trade bands.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', minutes: 105, bearing: 150, slug: 'charleston-sc', note: 'The coast: pricier, and it takes some of the bands.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 150, bearing: 320, slug: 'asheville-nc', note: 'Hipper and costlier; a tour-stop partner.' }
  ],

  hoods: [
    { id: 'five-points', name: 'Five Points', route: 'campus', note: 'The old shopping district turned college bar strip; bar shows and the odd all-ages afternoon, not houses.' },
    { id: 'shandon', name: 'Old Shandon', route: 'old-side', note: 'Bungalows from the 1920s with porches and front rooms: the likeliest band houses.' },
    { id: 'vista', name: 'the Vista', route: 'downtown', note: 'Old warehouses made into restaurants and hotels; ticketed bars, no DIY.' },
    { id: 'rosewood', name: 'Rosewood and the near east side', route: 'work-side', note: 'Small mid-century houses, auto shops and bays; cheap, near the fairgrounds.' },
    { id: 'mill-villages', name: 'Olympia and Granby', route: 'work-side', note: 'Old mill-village houses eight feet apart; neighbors call the cops.' },
    { id: 'north-side', name: 'Earlewood, Elmwood Park and Cottontown', route: 'old-side', note: 'The northern fringe: cheap, ignored, slowly being eyed.' },
    { id: 'campus-hill', name: 'University Hill, Arsenal Hill and Waverly', route: 'campus', note: 'Student housing and redevelopment all around; friends live here.' },
    { id: 'across-river', name: 'Cayce and West Columbia', route: 'downtown', note: 'Across the river with brick shop fronts and their own noise rules and police.' }
  ],

  contacts: ['augusta-ga', 'charleston-sc', 'asheville-nc'],

  points: [
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 900000 },
    { name: 'Greenville', state: 'SC', lat: 34.85, lon: -82.4, pop: 70000 },
    { name: 'Florence', state: 'SC', lat: 34.2, lon: -79.76, pop: 40000 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64, pop: 470000 }
  ],
  roads: ['I-26', 'I-20', 'I-77', 'I-126', 'US 1', 'US 378'],

  words: {
    street: ['Harden Street', 'Devine Street', 'Santee Avenue', 'Rosewood Drive', 'Meeting Street', 'Knox Abbott Drive', 'Gervais Street'],
    water: ['the Congaree', 'the Saluda', 'Lake Marion'],
    hood: ['Five Points', 'Old Shandon', 'the Vista', 'Rosewood', 'Olympia', 'Granby', 'Earlewood', 'Elmwood Park', 'Cottontown', 'Bellevue', 'Waverly', 'Cayce'],
    thing: ['kudzu', 'boiled peanuts', 'pimento cheese', 'sweet tea', 'porch', 'carport', 'mustard barbecue', 'hash and rice', 'skate shop', 'bungalow', 'move-in week', 'bar stage'],
    weather: ['heat index', 'afternoon storm']
  }
});
