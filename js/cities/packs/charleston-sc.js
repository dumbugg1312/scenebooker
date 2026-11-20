SB.Cities.register('charleston-sc', {
  v: 1,
  slug: 'charleston-sc',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['boeing', 'joint base charleston', 'naval weapons station', 'navy nuclear power school', 'marine corps air station', 'parris island', 'college of charleston', 'the citadel',
           'medical university of south carolina', 'charleston southern', 'trident technical college', 'spoleto', 'spoleto festival usa', 'piccolo spoleto',
           'cooper river bridge run', 'bridge run', 'charleston wine and food', 'southeastern wildlife exposition', 'festival of houses and gardens', 'moja arts festival',
           'lowcountry oyster festival', 'hugo', 'hurricane hugo', 'silicon harbor', 'jenkins orphanage band', 'university of south carolina', 'gamecocks', 'clemson',
           'waffle house', 'bojangles', 'vfw', 'american legion', 'elks', 'moose lodge', 'holy city', 'ravenel bridge', 'arthur ravenel',
           'the crosstown carport', 'rivers avenue tire and wheel annex', 'moose lodge no. 1190', 'folly road bingo hall', 'hanahan elks hall', 'ladson skate barn',
           'johns island packing shed', 'cainhoy fish camp', 'avondale laundromat back room', 'neck road lodge', 'ashley phosphate storage unit 114', 'shem creek bait annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 1989 storm is written only as 'the storm' in game text. */
  blocklist: ['spoleto*', 'bridge run*', 'joint base*', 'waffle house*', 'bojangles*', 'jenkins orphanage*', 'silicon harbor*'],

  blurb: ['Punk here is small and everybody shares one crowd. Shows live on porches, at a skatepark and at the odd waterfront DIY fest.',
          'The best way to find a show is a social-media group, not a flyer on a pole.'],
  hard: 'Few rooms left for under-21s, and one tiny crowd to split across genres.',
  region: 'the Lowcountry',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Charleston' },
    { id: 'goose-creek', kind: 'FEEDER', name: 'Goose Creek and Hanahan', minutes: 25, bearing: 350, note: 'Military and suburban towns up the interstate; the kids of base families.', bands: 2 },
    { id: 'summerville', kind: 'FEEDER', name: 'Summerville', minutes: 30, bearing: 325, note: 'A fast-growing suburb northwest on I-26; the likeliest kids to come in.', bands: 2 },
    { id: 'ladson', kind: 'FEEDER', name: 'Ladson and Ridgeville', minutes: 35, bearing: 330, note: 'Strip malls and farmland along I-26.' },
    { id: 'moncks-corner', kind: 'FEEDER', name: 'Moncks Corner', minutes: 45, bearing: 355, note: 'A rural county seat up US 52, with a lake nearby.' },
    { id: 'walterboro', kind: 'FEEDER', name: 'Walterboro', minutes: 50, bearing: 275, note: 'A rural county seat west by back roads.' },
    { id: 'st-george', kind: 'FEEDER', name: 'St. George and Holly Hill', minutes: 50, bearing: 300, note: 'Farm and lake towns along I-26.' },
    { id: 'orangeburg', kind: 'FEEDER', name: 'Orangeburg', minutes: 70, bearing: 310, note: 'A college town up I-26 with a small scene of its own.', bands: 1 },
    { id: 'georgetown', kind: 'FEEDER', name: 'Georgetown', minutes: 70, bearing: 40, note: 'A mill and port town up US 17.' },
    { id: 'beaufort', kind: 'FEEDER', name: 'Beaufort', minutes: 80, bearing: 225, note: 'Military and historic tourism to the southwest; a small scene.', bands: 1 },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 105, bearing: 320, slug: 'columbia-sc', note: 'The state capital up I-26; bands play both on one weekend.' },
    { id: 'savannah', kind: 'PEER', name: 'Savannah', minutes: 105, bearing: 245, slug: 'savannah-ga', note: 'A similar port and art-school city down US 17.' },
    { id: 'myrtle-beach', kind: 'PEER', name: 'Myrtle Beach', minutes: 120, bearing: 45, slug: 'myrtle-beach-sc', note: 'A beach resort up the coast.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', minutes: 135, bearing: 285, slug: 'augusta-ga', note: 'A river city to the west.' }
  ],

  hoods: [
    { id: 'upper-peninsula', name: 'Upper King and the Neck', route: 'downtown', note: 'Old warehouses and auto shops turned breweries and hotels; small bars survive but every cheap building is being bought.' },
    { id: 'lower-peninsula', name: 'the Market and the lower peninsula', route: 'old-side', note: 'The tourist core: cover bands, bachelorettes and parking rules. Friends work here; shows do not happen here.' },
    { id: 'west-ashley', name: 'West Ashley', route: 'old-side', note: 'Postwar ranch houses and strip-mall units across the river; the best place for house and storefront shows.' },
    { id: 'james-island', name: 'James Island and Folly Road', route: 'campus', note: 'Marsh-edge streets of small lots: backyards, garages and roadside bars.' },
    { id: 'park-circle', name: 'Park Circle', route: 'downtown', note: 'A planned garden neighborhood in North Charleston, now bikes and craft beer; heating up fast.' },
    { id: 'rivers-avenue', name: 'Rivers Avenue and North Charleston', route: 'work-side', note: 'A long strip of pawn shops, tire places and warehouses: the cheapest and loosest commercial space.' },
    { id: 'mount-pleasant', name: 'Mount Pleasant and East Cooper', route: 'campus', note: 'Affluent suburbs over the big bridge; few rooms but plenty of kids who drive over.' },
    { id: 'johns-island', name: 'Johns Island', route: 'work-side', note: 'Fields, barns and fish camps with no neighbors for a mile; development is eating it.' },
    { id: 'folly-beach', name: 'Folly Beach', route: 'old-side', note: 'A beach town of bars and a pier, packed in summer and empty in winter.' }
  ],

  contacts: ['columbia-sc', 'savannah-ga', 'myrtle-beach-sc'],

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Wilmington', state: 'NC', lat: 34.23, lon: -77.94, pop: 300000 },
    { name: 'Hilton Head', state: 'SC', lat: 32.22, lon: -80.75, pop: 40000 }
  ],
  roads: ['I-26', 'I-526', 'I-95', 'US 17', 'US 52', 'US 78'],

  words: {
    street: ['King Street', 'Meeting Street', 'Rivers Avenue', 'Savannah Highway', 'Folly Road', 'Morrison Drive', 'Dorchester Road'],
    water: ['the Ashley', 'the Cooper', 'Wappoo Cut', 'Shem Creek', 'the marsh'],
    hood: ['the Neck', 'Cannonborough', 'Elliotborough', 'Avondale', 'Park Circle', 'Daniel Island', 'James Island', 'Johns Island', 'Folly Beach', 'West Ashley'],
    thing: ['carport', 'pluff mud', 'tallboy', 'boiled peanuts', 'oyster shell', 'taco truck', 'king tide', 'palmetto bug', 'skatepark', 'boatyard', 'porch', 'farewell show'],
    weather: ['king tide', 'afternoon thunderstorm', 'storm watch', 'no-see-ums']
  }
});
