SB.Cities.register('sioux-falls-sd', {
  v: 1,
  slug: 'sioux-falls-sd',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['augustana university', 'augustana', 'university of sioux falls', 'south dakota state university', 'sdsu', 'university of south dakota',
           'dakota state university', 'dordt university', 'dordt', 'mount marty university', 'mount marty', 'dakota wesleyan university', 'dakota wesleyan',
           'argus leader', 'wells fargo', 'citigroup', 'hy-vee', 'hy vee', 'casey\'s', 'kum & go', 'kum and go', 'taco john\'s', 'culver\'s', 'pizza ranch',
           'empire mall', 'plaza 41', 'sculpturewalk', 'first fridays', 'downtown riverfest', 'festival of bands', 'sioux empire spectacular',
           'party in the park', 'sioux empire fair', 'siouxpercon', 'sioux falls pride', 'summit league', 'ushl', 'sturgis rally', 'sturgis', 'tyson',
           'jefferson lines', 'sioux area metro', 'south dakota public broadcasting', 'corn palace', 'ellsworth', 'sioux falls regional airport',
           'the quartzite room', 'split rock hall', 'the packer\'s annex', 'packer\'s annex', 'skywalk basement', 'the falls overlook post',
           'falls overlook post', 'east bank dock door', 'terrace park shed', 'st. anselm\'s fellowship hall', 'minnehaha rec', 'the cold storage',
           'sod house social', 'the 41st street unit'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges and events appear in game text only as generic words. */
  blocklist: ['argus leader*', 'augustana*', 'empire mall*', 'sculpturewalk*', 'sod house*', 'quartzite room*', 'split rock*', 'hy-vee*'],

  blurb: ['A flat, car-bound city where the next big stop is hours away. Shows take whatever room says yes that month.',
          'Winter decides what happens. Summer moves it into garages and yards, until the thunderstorm.'],
  hard: 'Weather, distance, and few all-ages rooms; Minneapolis and Omaha pull the bands.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.94 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Sioux Falls' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon', minutes: 10, bearing: 90, pop: 11048, note: 'A growing suburb east on I-90; its kids come in for everything.' },
    { id: 'dell-rapids', kind: 'FEEDER', name: 'Dell Rapids', minutes: 25, bearing: 10, note: 'A small quarry town up the river valley.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 25, bearing: 185, pop: 3066, note: 'A small county seat to the south; no scene of its own.' },
    { id: 'luverne', kind: 'FEEDER', name: 'Luverne', state: 'MN', minutes: 30, bearing: 100, pop: 4946, note: 'A farm and county-seat town just over the Minnesota line.' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 40, bearing: 320, pop: 6191, note: 'A small college town with a few kids who might start something.', bands: 1 },
    { id: 'brookings', kind: 'FEEDER', name: 'Brookings', minutes: 60, bearing: 5, pop: 23377, note: 'The big college-town feeder up I-29; students come south for bigger bills and go home for the summer.', bands: 3 },
    { id: 'vermillion', kind: 'FEEDER', name: 'Vermillion', minutes: 60, bearing: 205, pop: 11695, note: 'A state-college town to the southwest with a plausible small scene.', bands: 2 },
    { id: 'mitchell', kind: 'FEEDER', name: 'Mitchell', minutes: 60, bearing: 265, pop: 15660, note: 'Kids drive east on I-90 for bigger shows.' },
    { id: 'worthington', kind: 'FEEDER', name: 'Worthington', state: 'MN', minutes: 60, bearing: 100, pop: 13947, note: 'A pork-packing and immigrant town an hour east on I-90.' },
    { id: 'sioux-city', kind: 'PEER', name: 'Sioux City', state: 'IA', minutes: 85, bearing: 190, scene: 700, note: 'The smaller, slightly rougher sibling down I-29; the two trade bands.' },
    { id: 'mankato', kind: 'PEER', name: 'Mankato', state: 'MN', minutes: 165, bearing: 80, scene: 600, note: 'A college town to the east over the Minnesota line.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Phillips Avenue', route: 'downtown', note: 'The old brick core south of the falls: bars with stages, galleries, an arena, and rents climbing out of reach.' },
    { id: 'east-bank', name: 'the East Bank', route: 'work-side', note: 'The old packing-house strip by the river: warehouses and loading docks, turning into apartments.' },
    { id: 'cathedral', name: 'the Cathedral District', route: 'old-side', note: 'Old brick houses and parish halls east of downtown; quietly gentrifying, still room for a basement show.' },
    { id: 'mckennan', name: 'McKennan Park and Whittier', route: 'old-side', note: 'Older streets around the park with student and nurse rentals and long-time families.' },
    { id: 'campus', name: 'the campus areas', route: 'campus', note: 'Two small private colleges inside the city; student houses within a few blocks, a thin crowd.' },
    { id: '41st', name: '41st Street', route: 'work-side', note: 'The southwest retail belt: chain restaurants, strip malls and cheap commercial units that can hold a show.' },
    { id: 'suburbs', name: 'the south and east suburbs', route: 'campus', note: 'New subdivisions with finished basements and parents with cars; audience, not where shows start.' },
    { id: 'north-side', name: 'the north side', route: 'work-side', note: 'Working-class streets along the river near the pork plant; cheap and ignored, with garages and backyards.' }
  ],

  contacts: ['fargo-nd', 'lincoln-ne', 'minneapolis', 'des-moines-ia'],

  points: [
    { name: 'Sioux City', state: 'IA', lat: 42.5, lon: -96.4, pop: 85800 },
    { name: 'Rapid City', state: 'SD', lat: 44.08, lon: -103.23, pop: 74000 },
    { name: 'Fargo', state: 'ND', lat: 46.88, lon: -96.79, pop: 126000 },
    { name: 'Mitchell', state: 'SD', lat: 43.71, lon: -98.03, pop: 15700 }
  ],
  roads: ['I-90', 'I-29', 'I-229', '41st Street', 'US 81'],

  words: {
    street: ['Phillips Avenue', '41st Street', '12th Street', 'Minnesota Avenue'],
    water: ['the Big Sioux', 'the Falls', 'the river trail'],
    hood: ['the East Bank', 'the Cathedral District', 'McKennan Park', 'Whittier', 'Pettigrew Heights', 'Brandon'],
    thing: ['chislic', 'kuchen', 'block heater', 'church basement', 'Morton building', 'pork tenderloin', 'fry bread', 'blizzard warning', 'gas-station pizza', 'campus room'],
    weather: ['blizzard', 'ground blizzard', 'tornado warning']
  }
});
