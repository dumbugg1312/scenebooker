SB.Cities.register('rockford-il', {
  v: 1,
  slug: 'rockford-il',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['cherryvale', 'rockford university', 'rock valley college', 'beloit college', 'northern illinois university', 'niu', 'head of the rock', 'women\'s baseball world cup',
           'heritage days', 'petunia festival', 'corn fest', 'city of murals', 'pretzel city', 'hub city', 'jane addams memorial tollway', 'metra', 'amtrak',
           'rockford symphony', 'riverfront museum park', 'rockford speedway', 'icehogs', 'rockford peaches', 'rockford register star', 'rockford airport',
           'chicago rockford international', 'stellantis', 'chrysler', 'belvidere assembly', 'great lakes naval', 'naval station great lakes',
           'fastener hall', 'kishwaukee annex', 'the pattern shop', 'alpine lanes party room', 'union hall no. 9', 'the coal chute', 'perryville pizza and pins',
           'swedish club basement', 'the dry dock', 'harrison avenue roller rink', 'old hardware back room', 'the machine shop'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['rockford register*', 'icehogs*', 'cherryvale*', 'head of the rock*', 'rock valley*', 'niu*', 'belvidere assembly*'],

  blurb: ['A river town of idled plants and cheap basements, split into an east side and a west side that barely talk.',
          'The best shows go to Chicago or Madison, so locals build their own rooms and lose them fast.'],
  hard: 'Fragile rooms, thin crowds, and bigger cities pulling bands both ways.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.40 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Rockford' },
    { id: 'loves-park', kind: 'FEEDER', name: 'Loves Park and Machesney Park', minutes: 15, bearing: 20, note: 'Suburbs north of the city; the car-owning teen core of an all-ages crowd.' },
    { id: 'cherry-valley', kind: 'FEEDER', name: 'Cherry Valley, Rockton and Roscoe', minutes: 20, bearing: 340, note: 'Suburbs and fringe towns; kids with cars and parents\' garages.' },
    { id: 'belvidere', kind: 'FEEDER', name: 'Belvidere', minutes: 20, bearing: 105, pop: 25339, note: 'A factory town hit hard by an idled plant; probably a small loyal scene.', bands: 2 },
    { id: 'beloit', kind: 'FEEDER', name: 'Beloit and South Beloit', state: 'WI', minutes: 25, bearing: 5, pop: 36657, note: 'A small college town over the state line, with its own small scene.', bands: 1 },
    { id: 'freeport', kind: 'FEEDER', name: 'Freeport', minutes: 35, bearing: 285, pop: 23973, note: 'A German-heritage river town to the west.' },
    { id: 'janesville', kind: 'FEEDER', name: 'Janesville', state: 'WI', minutes: 40, bearing: 5, pop: 65615, note: 'A sister to Belvidere; lost its century-old auto plant.' },
    { id: 'harvard', kind: 'FEEDER', name: 'Harvard and Marengo', minutes: 45, bearing: 95, note: 'Farm and exurban kids to the east.' },
    { id: 'oregon', kind: 'FEEDER', name: 'Oregon', minutes: 45, bearing: 230, note: 'Rock River bluffs and a state park; no known scene.' },
    { id: 'rochelle', kind: 'FEEDER', name: 'Rochelle', minutes: 45, bearing: 190, note: 'A rail crossing town to the south on the interstate.' },
    { id: 'dekalb', kind: 'FEEDER', name: 'DeKalb', minutes: 50, bearing: 150, pop: 40290, note: 'A big university town with its own punk lineage; a trading partner as much as a feeder.', bands: 3 },
    { id: 'dixon', kind: 'FEEDER', name: 'Dixon', minutes: 55, bearing: 220, pop: 15274, note: 'A small river town whose kids drive to Rockford for anything bigger.' },
    { id: 'elgin', kind: 'PEER', name: 'Elgin', minutes: 50, bearing: 115, scene: 800, note: 'A near twin in size and decline, with a direct road and a train to Chicago.' },
    { id: 'davenport', kind: 'PEER', name: 'Davenport', state: 'IA', minutes: 115, bearing: 250, slug: 'davenport-ia', note: 'A comparable river hub; bands often route through the Quad Cities.' },
    { id: 'peoria', kind: 'PEER', name: 'Peoria', minutes: 140, bearing: 190, slug: 'peoria-il', note: 'A sister river-and-factory city; a long drive for a trade show.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Main and State streets: bar rooms, a few storefronts and an old theater district, with retail long gone.' },
    { id: 'industrial-belt', name: 'the old industrial belt', route: 'work-side', note: 'Foundries, machine shops and warehouses along the river and creeks. Warehouse shows and practice rooms.' },
    { id: 'seventh-street', name: 'Seventh Street and the southwest side', route: 'work-side', note: 'A Swedish-then-Latino commercial strip with dense old housing. House shows and church-adjacent halls.' },
    { id: 'near-east', name: 'the near east side', route: 'old-side', note: 'Older houses around a creek that flooded; whole blocks torn down. Cheap, ignored and full of empty lots.' },
    { id: 'east-state', name: 'East State Street', route: 'campus', note: 'Chain restaurants, big boxes and the enclosed mall. Parking-lot hangs and strip-mall units.' },
    { id: 'northwest', name: 'the northwest side', route: 'old-side', note: 'An older mall and a prairie park; the first suburbs, now aging.' },
    { id: 'suburbs-north', name: 'Loves Park and Machesney Park', route: 'campus', note: 'The car-owning suburbs past the city line, where the all-ages crowd drives in from.' }
  ],

  contacts: ['davenport-ia', 'peoria-il', 'madison-wi', 'chicago'],

  points: [
    { name: 'Elgin', state: 'IL', lat: 42.04, lon: -88.28, pop: 114797 },
    { name: 'Kenosha', state: 'WI', lat: 42.58, lon: -87.82, pop: 99000 },
    { name: 'Dubuque', state: 'IA', lat: 42.50, lon: -90.66, pop: 59667 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1570000 }
  ],
  roads: ['I-90', 'I-39', 'US 20', 'US 51', 'IL 2', 'IL 251'],

  words: {
    street: ['State Street', 'Main Street', 'Seventh Street', 'Harrison Avenue', 'Alpine Road', 'Perryville Road'],
    water: ['the Rock River', 'Kishwaukee River', 'Keith Creek', 'Kent Creek'],
    hood: ['the east side', 'the west side', 'Loves Park', 'Machesney Park', 'Cherry Valley', 'Rockton', 'Roscoe'],
    thing: ['machine shop', 'fastener plant', 'foundry', 'Swedish bakery', 'taqueria', 'pump house', 'blizzard', 'union hall', 'shift change', 'practice room'],
    weather: ['blizzard', 'lake effect', 'spring storm']
  }
});
