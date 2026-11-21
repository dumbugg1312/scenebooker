SB.Cities.register('syracuse-ny', {
  v: 1,
  slug: 'syracuse-ny',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['syracuse university', 'suny', 'suny oswego', 'suny cortland', 'suny esf', 'carrier dome', 'jma wireless dome', 'syracuse orange', 'upstate medical university',
           'upstate medical', 'le moyne college', 'lemoyne college', 'onondaga community college', 'new york state fair', 'state fair', 'fort drum',
           '10th mountain division', 'tenth mountain division', 'united way', 'syracuse.com', 'post-standard', 'syracuse new times', 'siberacuse',
           'lock seven hall', 'the salt shed', 'creekwalk annex', 'the hanover loft', 'brine street social club', 'tipp hill parish annex', 'the onondaga room',
           'the third rail basement', 'erie basin hall', 'eastwood grange', 'the lakefront garage', 'westcott porch'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['syracuse university*', 'suny*', 'carrier dome*', 'new york state fair*', 'fort drum*', 'syracuse new times*', 'the salt shed*'],

  blurb: ['Lake-effect snow decides who shows up. Basements and halls keep the lights on while the college crowd comes and goes.',
          'Students without cars ride in with suburban kids, and winters make the road skip you for bigger cities.'],
  hard: 'Winter weather and thin all-ages rooms; the road skips you for bigger cities.',
  region: 'upstate New York',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Syracuse' },
    { id: 'liverpool', kind: 'FEEDER', name: 'Liverpool and Baldwinsville', minutes: 15, bearing: 330, note: 'Middle-class village suburbs that turn out suburban garage bands.' },
    { id: 'camillus', kind: 'FEEDER', name: 'Camillus and Skaneateles', minutes: 25, bearing: 270, note: 'Lake-resort and suburban villages: richer, quieter.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', minutes: 30, bearing: 245, note: 'An old factory and prison city with a small scene.' },
    { id: 'cazenovia', kind: 'FEEDER', name: 'Cazenovia', minutes: 30, bearing: 100, note: 'A small college village on the lake.' },
    { id: 'cortland', kind: 'FEEDER', name: 'Cortland', minutes: 35, bearing: 185, note: 'A state college town on the Southern Tier line with a scene of its own.', bands: 2 },
    { id: 'fulton', kind: 'FEEDER', name: 'Fulton', minutes: 35, bearing: 350, note: 'A small mill town on the river north of the city.' },
    { id: 'oneida', kind: 'FEEDER', name: 'Oneida', minutes: 40, bearing: 80, note: 'A small canal and sports city to the east.' },
    { id: 'oswego', kind: 'FEEDER', name: 'Oswego', minutes: 45, bearing: 345, note: 'A lakeport with a state college and a scene of its own.', bands: 2 },
    { id: 'watertown', kind: 'FEEDER', name: 'Watertown', minutes: 70, bearing: 10, note: 'The service city for a big army base: young soldiers who need a night off.', season: { months: [9, 10, 11, 12], mul: 1.2 } },
    { id: 'utica', kind: 'PEER', name: 'Utica', minutes: 50, bearing: 85, slug: 'utica-ny', note: 'A Mohawk Valley mill town with a small scene of its own.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', minutes: 60, bearing: 185, slug: 'ithaca-ny', note: 'A smaller college town with a respected scene; people travel between the two.' },
    { id: 'binghamton', kind: 'PEER', name: 'Binghamton', minutes: 65, bearing: 175, scene: 800, note: 'A university town down I-81 that links Syracuse to the Pennsylvania side of the circuit.' },
    { id: 'rochester', kind: 'PEER', name: 'Rochester', slug: 'rochester', minutes: 85, bearing: 265, scene: 2400, note: 'The other upstate city and a long-standing rival that trades bands.' }
  ],

  hoods: [
    { id: 'university-hill', name: 'the Hill by campus', route: 'campus', note: 'Big old houses cut into student flats, with fraternity and sorority houses. House shows run by students.' },
    { id: 'westcott', name: 'Westcott', route: 'old-side', note: 'A bohemian strip beside the campus park: students, professors and families, and the closest thing to an outsider\'s idea of a scene.' },
    { id: 'downtown', name: 'downtown and Armory Square', route: 'downtown', note: 'Bars, restaurants and old industrial buildings turned nightlife; 21 and over, popular with students.' },
    { id: 'near-westside', name: 'the Near Westside and the SALT District', route: 'work-side', note: 'Old factory buildings and a rail yard around Onondaga Circle; one of the poorest, cheapest blocks in the city.' },
    { id: 'eastwood', name: 'Eastwood', route: 'old-side', note: 'A working-class village-within-the-city with owner-occupied family houses, basements and garages.' },
    { id: 'tipp-hill', name: 'Tipperary Hill', route: 'old-side', note: 'A proud Irish hill above the canal with pubs, parish halls and family basements.' },
    { id: 'north-side', name: 'the North Side and Little Italy', route: 'work-side', note: 'Cheap storefronts, big old houses and social-club halls, with the highway rebuild changing its edges.' },
    { id: 'south-side', name: 'the South Side', route: 'work-side', note: 'Low-income blocks with vacant lots and boarded two-families, mostly outside the college scene\'s circuit.' }
  ],

  contacts: ['utica-ny', 'ithaca-ny'],

  points: [
    { name: 'Rochester', state: 'NY', lat: 43.16, lon: -77.61, pop: 210000 },
    { name: 'Binghamton', state: 'NY', lat: 42.10, lon: -75.91, pop: 47000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 99000 },
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 278000 },
    { name: 'Watertown', state: 'NY', lat: 43.97, lon: -75.91, pop: 25000 }
  ],
  roads: ['I-81', 'I-90', 'I-690', 'I-481', 'Route 20', 'Route 5'],

  words: {
    street: ['Westcott Street', 'James Street', 'Erie Boulevard', 'South Salina Street', 'West Onondaga Street', 'Genesee Street', 'Teall Avenue'],
    water: ['Onondaga Lake', 'Onondaga Creek', 'Lake Ontario', 'the Erie Canal'],
    hood: ['Westcott', 'Eastwood', 'Tipperary Hill', 'Tipp Hill', 'Armory Square', 'Little Italy', 'Sedgwick Farms', 'Strathmore', 'Thornden Park'],
    thing: ['snow emergency', 'plow', 'road salt', 'lake effect', 'snow tire', 'viaduct', 'salt potato', 'ramp season', 'steamed window', 'minivan', 'porch', 'skatepark'],
    weather: ['lake effect', 'snow emergency', 'gray November']
  }
});
