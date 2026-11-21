SB.Cities.register('cape-coral-fl', {
  v: 1,
  slug: 'cape-coral-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['gulf american land corporation', 'gulf american', 'publix', 'walmart', 'florida gulf coast university', 'fgcu', 'florida southwestern state college',
           'fsw', 'hodges university', 'hurricane ian', 'hurricane charley', 'red sox', 'boston red sox', 'jetblue park', 'minnesota twins', 'macdill',
           'cape bike night', 'red white and boom', 'reindeer run', 'tour de cape', 'trunk or treat', 'songwriter fest', 'sounds of jazz and blues',
           'holiday boat-a-long', 'edison festival of light', 'swamp cabbage festival', 'cape coral yacht club', 'lee county sheriff', 'vfw', 'american legion', 'elks',
           'slab hall', 'seawall social hall', 'back unit 9', 'lot 14', 'redfish hall', 'the dock annex', 'unit c practice', 'mangrove music hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storms are written only as 'the storm' in game text. */
  blocklist: ['publix*', 'fgcu*', 'cape bike night*', 'red white and boom*', 'edison festival*', 'jetblue*', 'hurricane ian*'],

  blurb: ['A small canal-suburb scene that built its room in a pizza place. The canals are quiet, the amps are not.',
          "Everyone knows everyone, hardcore and emo share the bill, and the next room might be somebody's backyard."],
  hard: 'Few all-ages rooms, and the big fest is 21 and up.',
  region: 'the Gulf',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'emo', d: .06, reason: 'Hardcore and emo kids share the bill at the main room.' },
    { fan: 'emo', band: 'hardcore', d: .06, reason: 'Hardcore and emo kids share the bill at the main room.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cape Coral' },
    { id: 'fort-myers', kind: 'FEEDER', name: 'Fort Myers', minutes: 25, bearing: 100, pop: 86395, scene: 500, note: 'Across the bridges: the old buildings, the arts district and the real stage for Cape kids.', beyond: 'river-bridges' },
    { id: 'north-fort-myers', kind: 'FEEDER', name: 'North Fort Myers', minutes: 30, bearing: 60, scene: 80, note: 'A working-class strip of trailer and RV parks along the highway.' },
    { id: 'pine-island', kind: 'FEEDER', name: 'Matlacha and Pine Island', minutes: 30, bearing: 285, note: 'A fishing village and island at the end of one road. Few kids, little scene.', beyond: 'pine-island-road' },
    { id: 'punta-gorda', kind: 'FEEDER', name: 'Punta Gorda', minutes: 45, bearing: 340, pop: 19471, note: 'An older retiree canal city hit hard by two storms.' },
    { id: 'lehigh-acres', kind: 'FEEDER', name: 'Lehigh Acres', minutes: 50, bearing: 95, pop: 114287, note: 'A huge, poor bedroom suburb with no venues. Kids drive west to shows.' },
    { id: 'port-charlotte', kind: 'FEEDER', name: 'Port Charlotte', minutes: 50, bearing: 355, pop: 60625, note: 'Another planned canal suburb, older, with a young working-class minority.' },
    { id: 'bonita-springs', kind: 'FEEDER', name: 'Bonita Springs and Estero', minutes: 55, bearing: 145, note: 'Wealthy and old, with golf and beach tourism. The few kids come north.', beyond: 'river-bridges' },
    { id: 'labelle', kind: 'FEEDER', name: 'LaBelle', minutes: 70, bearing: 85, pop: 4966, note: 'A rural ranching county seat, a long drive east.' },
    { id: 'naples', kind: 'PEER', name: 'Naples', state: 'FL', minutes: 70, bearing: 150, slug: 'naples-fl', note: 'The wealthy edge of the region, down the interstate.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', slug: 'sarasota-fl', state: 'FL', minutes: 105, bearing: 350, scene: 700, note: 'An arts town up the interstate that sees the Cape as retiree sprawl.' },
    { id: 'lakeland', kind: 'PEER', name: 'Lakeland', state: 'FL', minutes: 150, bearing: 15, slug: 'lakeland-fl', note: 'A mid-size inland city, a rare stop on a route north.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the Cape Coral Bridge', p: .025 },
    { id: 'pine-island-road', name: 'Pine Island Road', p: .015 }
  ],

  hoods: [
    { id: 'southeast-cape', name: 'the Parkway end', route: 'downtown', note: 'The oldest canal houses, the bridge approach and the only thing like a downtown. Bars, back rooms and event lawns, with waterfront redevelopment pricing it up.' },
    { id: 'southwest-cape', name: 'the southwest Cape', route: 'old-side', note: 'Long residential grids of retirees, families and rentals. Garages and lanais, and the old houses are being torn down for bigger ones.' },
    { id: 'del-prado', name: 'the Del Prado corridor', route: 'work-side', note: 'Old strip plazas, chain restaurants and empty storefronts, and the most renters. Leased units and a church hall or two.' },
    { id: 'northeast-cape', name: 'the Pine Island Road belt', route: 'work-side', note: 'Warehouses, auto shops and industrial units, with small rented houses behind. Where a practice space would be; cheap and ignored for now.' },
    { id: 'northwest-cape', name: 'the northwest Cape', route: 'campus', note: 'New subdivisions with HOAs and big garages. Young families, no nightlife, farthest from anywhere.' },
    { id: 'north-river', name: 'the north river strip', route: 'town:north-fort-myers', note: 'The cheap strip along the highway north of the river: bars, posts and trailer parks, reachable without a bridge.' }
  ],

  contacts: ['naples-fl', 'lakeland-fl', 'port-st-lucie-fl', { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87 }],

  points: [
    { name: 'Fort Myers', state: 'FL', lat: 26.64, lon: -81.87, pop: 86000 },
    { name: 'Sarasota', state: 'FL', lat: 27.34, lon: -82.53, pop: 55000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 400000 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19, pop: 450000 },
    { name: 'Fort Lauderdale', state: 'FL', lat: 26.12, lon: -80.14, pop: 180000 }
  ],
  roads: ['I-75', 'US 41', 'SR 78', 'Cape Coral Parkway', 'Del Prado Boulevard', 'Alligator Alley'],

  words: {
    street: ['Cape Coral Parkway', 'Del Prado Boulevard', 'Pine Island Road', 'Burnt Store Road', 'Veterans Parkway'],
    water: ['the Caloosahatchee', 'the canals', 'Matlacha Pass', 'Redfish Point'],
    hood: ['the Cape', 'Southeast Cape', 'Southwest Cape', 'Northwest Cape', 'North Cape', 'Matlacha', 'Pine Island', 'Burnt Store'],
    thing: ['lanai', 'pool cage', 'canal lot', 'box fan', 'garage door', 'boat dock', 'slab', 'mangrove', 'pizza-place stage', 'free fest', 'parking-lot show', 'record store'],
    weather: ['afternoon thunderstorm', 'storm watch', 'red tide', 'mosquitoes']
  }
});
