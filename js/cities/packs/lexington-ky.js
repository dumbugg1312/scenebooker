SB.Cities.register('lexington-ky', {
  v: 1,
  slug: 'lexington-ky',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of kentucky', 'kentucky wildcats', 'big blue nation', 'lexvegas', 'wrfl', 'wuky', 'lexington herald-leader', 'herald-leader',
           'kentucky kernel', 'ace weekly', 'eastern kentucky university', 'georgetown college', 'centre college', 'transylvania university',
           'berea college', 'morehead state university', 'morehead state', 'kentucky state university', 'fort knox', 'fort campbell',
           'kentucky derby', 'keeneland', 'kentucky horse park', 'rupp arena', 'ale-8-one', 'ale-8', 'waffle house', 'toyota', 'vfw',
           'american legion', 'elks', 'moose lodge', 'knights of columbus', 'hot brown',
           'the fence row', 'stall nine', 'town branch hall', 'the pepper cellar', 'sinkhole social club', 'burgoo annex', 'the allotment',
           'plank road room', 'tobacco barn number four', 'the mule barn', 'bluegrass bingo hall', 'the switchman\'s loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['wrfl*', 'wuky*', 'keeneland*', 'herald-leader*', 'kentucky kernel*', 'ale-8*', 'waffle house*', 'rupp arena*'],

  blurb: ['A horse-country college town where the scene swells with the semester and shrinks to a stubborn core in summer. Bluegrass roots run under the punk.',
          'Everyone knows everyone in the room, everyone drives, and Louisville is always an hour away.'],
  hard: 'Term-time crowds vanish in summer, game days eat the weekend, and bars card kids.',
  region: 'the Bluegrass',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lexington' },
    { id: 'nicholasville', kind: 'FEEDER', name: 'Nicholasville', minutes: 25, bearing: 190, note: 'A fast-growing bedroom suburb; kids drive north.' },
    { id: 'georgetown', kind: 'FEEDER', name: 'Georgetown', minutes: 25, bearing: 350, note: 'A factory-family town with a small college and a small teen scene.' },
    { id: 'versailles', kind: 'FEEDER', name: 'Versailles', minutes: 25, bearing: 260, note: 'Horse-farm money and a small scene; kids drive in.' },
    { id: 'winchester', kind: 'FEEDER', name: 'Winchester', minutes: 25, bearing: 95, note: 'Farm and light manufacturing, with a modest teen scene.' },
    { id: 'richmond', kind: 'FEEDER', name: 'Richmond', minutes: 30, bearing: 160, note: 'A regional university town with student-run shows; the likeliest full van.', bands: 3 },
    { id: 'paris', kind: 'FEEDER', name: 'Paris', minutes: 30, bearing: 40, note: 'Horse and whiskey country; few shows.' },
    { id: 'frankfort', kind: 'FEEDER', name: 'Frankfort', minutes: 35, bearing: 295, note: 'The state capital and a government town with a small scene.' },
    { id: 'berea', kind: 'FEEDER', name: 'Berea', minutes: 40, bearing: 170, note: 'A craft-and-folk college town; students come to shows.' },
    { id: 'mount-sterling', kind: 'FEEDER', name: 'Mount Sterling', minutes: 40, bearing: 90, note: 'A farm town that pulls toward Lexington.' },
    { id: 'danville', kind: 'FEEDER', name: 'Danville', minutes: 45, bearing: 215, note: 'A small college town with a little radio-minded crowd.' },
    { id: 'morehead', kind: 'FEEDER', name: 'Morehead', minutes: 70, bearing: 85, note: 'A mountain-gateway university town with a scene of its own.' },
    { id: 'london-corbin', kind: 'FEEDER', name: 'London and Corbin', minutes: 65, bearing: 190, note: 'Edge-of-the-mountains towns with metal and hardcore kids who treat Lexington as the big city.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', state: 'OH', minutes: 135, bearing: 350, slug: 'dayton-oh', note: 'A smaller city with a deeper garage reputation than it gets credit for.' },
    { id: 'huntington', kind: 'PEER', name: 'Huntington', state: 'WV', minutes: 135, bearing: 85, slug: 'huntington-wv', note: 'A river and college town; the two trade bands along I-64.' },
    { id: 'bowling-green', kind: 'PEER', name: 'Bowling Green', minutes: 120, bearing: 225, scene: 900, note: 'A smaller college town to the southwest.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', slug: 'knoxville-tn', state: 'TN', minutes: 170, bearing: 175, scene: 2500, note: 'Bigger, with the same university-and-mountains feel; the two trade bands on I-75.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Licensed bars, restaurants and parking decks around the old creek valley; not cheap and hard to do anything unlicensed.' },
    { id: 'north-limestone', name: 'North Limestone', route: 'old-side', note: 'A working-class strip turned cool, with small storefronts and side-street houses; rents are rising and neighbors are being displaced.' },
    { id: 'distillery-district', name: 'the Distillery District', route: 'work-side', note: 'Brick warehouses by the old railyards, mostly turned to event spaces and tourism; once cheap, now owned by development money.' },
    { id: 'campus-edge', name: 'the streets around campus', route: 'campus', note: 'Student rentals, old brick houses and apartment towers; house shows with thin walls and landlord noise clauses.' },
    { id: 'south-side', name: 'the south side', route: 'campus', note: 'Strip malls, ranch subdivisions and apartment blocks along the south pikes; the likeliest home for a strip-unit all-ages room.' },
    { id: 'east-end', name: 'the east end', route: 'work-side', note: 'Cheap older housing, garages and light industry along Winchester Road; the likeliest warehouse geography.' },
    { id: 'north-side', name: 'the northside', route: 'work-side', note: 'Working-class streets and industrial units toward Georgetown Road; garages and houses.' }
  ],

  contacts: ['dayton-oh', 'huntington-wv'],

  points: [
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1300000 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51, pop: 2250000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 900000 },
    { name: 'Charleston', state: 'WV', lat: 38.35, lon: -81.63, pop: 200000 }
  ],
  roads: ['I-75', 'I-64', 'New Circle Road', 'US 27', 'US 60', 'Mountain Parkway'],

  words: {
    street: ['Main Street', 'Limestone', 'Euclid Avenue', 'Nicholasville Road', 'Richmond Road', 'Winchester Road', 'Versailles Road', 'Tates Creek Road', 'New Circle'],
    water: ['Town Branch', 'the Kentucky River'],
    hood: ['North Limestone', 'Ashland Park', 'Woodland Park', 'Aylesford', 'Eastland', 'Manchester Street'],
    thing: ['tallboy', 'horse trailer', 'plank fence', 'tobacco barn', 'bourbon barrel', 'beer cheese', 'taqueria', 'ice storm', 'ring road', 'ginger soda', 'carport show', 'wristband', 'ring road', 'ginger soda', 'carport show', 'wristband'],
    weather: ['ice storm', 'heavy rain']
  }
});
