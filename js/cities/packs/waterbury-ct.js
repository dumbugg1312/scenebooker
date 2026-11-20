SB.Cities.register('waterbury-ct', {
  v: 1,
  slug: 'waterbury-ct',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['yale', 'uconn', 'university of connecticut', 'western connecticut state', 'western ct state', 'vfw', 'american legion', 'knights of columbus',
           'metro-north', 'dunkin\'', 'dunkin', 'narragansett', 'patriots', 'republican-american', 'brass mill center', 'brass city',
           'the annealing room', 'annealing room', 'number nine mill', 'the grinder hall', 'grinder hall', 'pine hill social', 'hopeville annex',
           'the rolling room', 'sixth ward hall', 'brass lot', 'the spindle', 'washington hill cellar', 'naugatuck street social club', 'the triple-decker'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['uconn*', 'yale*', 'republican-american*', 'brass mill*', 'dunkin*', 'annealing room*', 'number nine mill*'],

  blurb: ['A brass-and-clock mill city in the Naugatuck Valley, all brick factories, steep hillsides and an interstate that runs straight through it.',
          'The basements are loud and cheap, the upstairs landlord is the real threat, and "who has the van" is the lineup.'],
  hard: 'Few all-ages rooms; tours skip you for the bigger cities.',
  region: 'the Northeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Waterbury' },
    { id: 'naugatuck', kind: 'FEEDER', name: 'Naugatuck', minutes: 15, bearing: 160, note: 'A close cousin mill town down Route 8 with a small high-school punk crowd.' },
    { id: 'wolcott', kind: 'FEEDER', name: 'Wolcott', minutes: 15, bearing: 80, note: 'A bedroom suburb of kids with basements and cars.' },
    { id: 'watertown', kind: 'FEEDER', name: 'Watertown and Oakville', minutes: 15, bearing: 300, note: 'A quiet suburb where parents tolerate a basement.' },
    { id: 'thomaston', kind: 'FEEDER', name: 'Thomaston', minutes: 20, bearing: 340, note: 'A small old mill town to the north.' },
    { id: 'cheshire', kind: 'FEEDER', name: 'Cheshire and Prospect', minutes: 20, bearing: 120, note: 'Richer suburbs to the southeast.' },
    { id: 'southbury', kind: 'FEEDER', name: 'Southbury, Oxford and Middlebury', minutes: 20, bearing: 230, note: 'Wealthier suburbs; some kids have cars.' },
    { id: 'southington', kind: 'FEEDER', name: 'Southington and Bristol', minutes: 25, bearing: 70, note: 'A big suburban pool of punk and metal kids east on I-84.' },
    { id: 'lower-valley', kind: 'FEEDER', name: 'Seymour, Ansonia and Derby', minutes: 25, bearing: 190, note: 'Small mill cities with their own band pools down the valley.' },
    { id: 'torrington', kind: 'FEEDER', name: 'Torrington', minutes: 30, bearing: 335, note: 'An old mill city in the hills with a small scene and a friendly rivalry.' },
    { id: 'meriden', kind: 'FEEDER', name: 'Meriden', minutes: 30, bearing: 100, note: 'A small mill-minded city to the east.' },
    { id: 'danbury', kind: 'FEEDER', name: 'Danbury', minutes: 35, bearing: 245, pop: 85000, note: 'A bigger city west on I-84 with a hardcore circuit of its own.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 45, bearing: 135, slug: 'new-haven-ct', note: 'The big Connecticut all-ages tradition; it takes Waterbury\'s best bands.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', state: 'MA', minutes: 75, bearing: 45, slug: 'springfield-ma', note: 'Another old industrial city up I-91 with some touring overlap.' },
    { id: 'poughkeepsie', kind: 'PEER', name: 'Poughkeepsie', state: 'NY', minutes: 90, bearing: 275, slug: 'poughkeepsie-ny', note: 'A Hudson Valley peer down I-84.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Green', route: 'downtown', note: 'Civic buildings, bars, a clock tower and a lot of empty upper floors. A cheap storefront can be found, but a distant landlord usually owns it.' },
    { id: 'brooklyn', name: 'Brooklyn', route: 'old-side', note: 'Dense two- and three-family houses just east of downtown, with corner stores, social clubs and leftover industrial buildings.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'A working-class riverside area of old industrial units and mixed housing. Cheap and ignored.' },
    { id: 'bunker-hill', name: 'Bunker Hill', route: 'old-side', note: 'A hillside of porches, small yards and cellars where the neighbors are close and the stairs are steep.' },
    { id: 'town-plot', name: 'Town Plot and Overlook', route: 'campus', note: 'Older single-family hill streets on the west side. Basement shows with tolerant parents.' },
    { id: 'waterville', name: 'Waterville and Hopeville', route: 'work-side', note: 'Quiet working-class mill villages up and across the river. Garages, basements and church halls.' },
    { id: 'abrigador', name: 'Abrigador and Willow Street', route: 'old-side', note: 'An old family east side of social clubs and bakeries. Little for DIY, but the clubs rent halls.' },
    { id: 'chase-strip', name: 'the Chase Parkway strip', route: 'campus', note: 'Highway retail and a fading mall. Where kids hang in the parking lots.' }
  ],

  contacts: ['new-haven-ct', 'springfield-ma', 'poughkeepsie-ny'],

  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 121000 },
    { name: 'Bridgeport', state: 'CT', lat: 41.19, lon: -73.20, pop: 148000 },
    { name: 'Stamford', state: 'CT', lat: 41.05, lon: -73.54, pop: 135000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 8300000 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 650000 }
  ],
  roads: ['I-84', 'Route 8', 'I-95', 'Route 6', 'I-91'],

  words: {
    street: ['Bank Street', 'Meadow Street', 'Willow Street', 'Highland Avenue', 'Watertown Avenue', 'East Main Street'],
    water: ['the Naugatuck', 'the Naugatuck River'],
    hood: ['Brooklyn', 'Bunker Hill', 'Washington Hill', 'Overlook', 'Town Plot', 'Waterville', 'Hopeville', 'Abrigador', 'the South End'],
    thing: ['grinder', 'apizza', 'brick mill', 'cellar', 'social club', 'parish hall', 'the Mixmaster', 'triple-decker', 'mill rehearsal room', 'van'],
    weather: ['nor\'easter', 'black ice', 'snow squall']
  }
});
