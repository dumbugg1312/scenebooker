SB.Cities.register('santa-cruz-ca', {
  v: 1,
  slug: 'santa-cruz-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['ucsc', 'uc santa cruz', 'university of california santa cruz', 'santa cruz beach boardwalk', 'giant dipper', 'pacific garden mall', 'loma prieta',
           'czu fire', 'czu lightning complex', 'santa cruz sentinel', 'sentinel', 'good times', 'santa cruz weekly', 'lookout santa cruz', 'city on a hill press',
           'kzsc', 'ksqd', 'kpig', 'ksco', 'surf city', 'huntington beach', 'mavericks', 'pumpkin festival', 'csu monterey bay', 'csumb', 'fort ord',
           'defense language institute', 'naval postgraduate school', 'monterey bay aquarium', 'steamer lane', 'santa cruz metro', 'amtrak', 'amtrak thruway',
           'highway 17 express', 'cal poly',
           'the fogline', 'slug hours', 'lower ocean garage co-op', 'the riverbank annex', 'hecker pass hall', 'the tidepool room', 'natural bridges carport',
           'boulder creek cabin', 'the fishhook social club', 'mission hill lodge', 'pleasure point backyard', 'soquel grange annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['ucsc*', 'santa cruz sentinel*', 'santa cruz beach boardwalk*', 'kzsc*', 'czu*', 'city on a hill*', 'good times*'],

  blurb: ['Garage doors up, fog rolling in, skate kids and students packed in a yard. Friendly more than aggressive.',
          'Everyone loads out early because of the neighbors, and the crowd leaves with the quarter.'],
  hard: 'Rent is brutal, one mountain road in, and the crowd leaves with the quarter.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Cruz' },
    { id: 'capitola', kind: 'FEEDER', name: 'Capitola, Soquel and Aptos', minutes: 15, bearing: 110, note: 'Comfortable beach villages down the coast; no scene to speak of.' },
    { id: 'scotts-valley', kind: 'FEEDER', name: 'Scotts Valley', minutes: 15, bearing: 20, note: 'An affluent, older suburb up the hill road. Its teenagers come down to town.' },
    { id: 'davenport', kind: 'FEEDER', name: 'Davenport and Bonny Doon', minutes: 20, bearing: 320, note: 'Tiny coastal and mountain settlements; a handful of kids.' },
    { id: 'slv', kind: 'FEEDER', name: 'Felton, Ben Lomond and Boulder Creek', minutes: 30, bearing: 10, note: 'Redwood mountain towns with garage and cabin shows. A real source of bands, and fire country.' },
    { id: 'watsonville', kind: 'FEEDER', name: 'Watsonville', minutes: 25, bearing: 130, note: 'A mostly Latino berry town with its own music life and a long Chicano punk community. A major source of crowds.' },
    { id: 'los-gatos', kind: 'FEEDER', name: 'Los Gatos', minutes: 35, bearing: 30, note: 'Rich, small and tidy; teens hop over the summit.' },
    { id: 'gilroy', kind: 'FEEDER', name: 'Gilroy', minutes: 45, bearing: 100, note: 'A garlic town turning into a Silicon Valley bedroom; some band activity.' },
    { id: 'marina', kind: 'FEEDER', name: 'Marina and Seaside', minutes: 50, bearing: 150, note: 'Former army-base towns around the bay, with a university and military families.' },
    { id: 'salinas', kind: 'PEER', name: 'Salinas', minutes: 55, bearing: 145, slug: 'salinas-ca', note: 'A much bigger farm city an hour away: a trade partner more than a feeder.' },
    { id: 'santa-rosa', kind: 'PEER', name: 'Santa Rosa', minutes: 150, bearing: 340, slug: 'santa-rosa-ca', note: 'Wine country north of the Bay; bands on the North Bay run reach both.' },
    { id: 'san-luis-obispo', kind: 'PEER', name: 'San Luis Obispo', minutes: 165, bearing: 155, slug: 'san-luis-obispo-ca', note: 'The nearest coast college-town peer; the two trade bands on the Bay to Los Angeles run.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Pacific Avenue', route: 'downtown', note: 'The main street, rebuilt after the big quake: street musicians, chains, bars and a visible homeless population.' },
    { id: 'beach-flats', name: 'Beach Flats and the beach strip', route: 'old-side', note: 'A dense, working-class, heavily Latino pocket of cottages and motels behind the amusement park. Noise gets called in as a public safety matter.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Bungalows, student rentals and a light-industrial strip of warehouses, breweries and rehearsal spaces toward the cliffs.' },
    { id: 'seabright', name: 'Seabright and the near Eastside', route: 'old-side', note: 'A lived-in beach neighborhood by the harbor. Gentrified and expensive; house and garage shows, not venues.' },
    { id: 'live-oak', name: 'Live Oak and Pleasure Point', route: 'work-side', note: 'Surf culture mixed with family suburbia and strip roads. Garages and backyards.' },
    { id: 'campus-edge', name: 'the campus edge and Mission Street', route: 'campus', note: 'Student rentals around the university in the hills. Shows follow the quarter calendar.' },
    { id: 'harvey-west', name: 'Harvey West and the river flats', route: 'work-side', note: 'Warehouses and light industry near the river. The likeliest spot for practice rooms, and the most exposed to code enforcement and redevelopment.' }
  ],

  contacts: ['salinas-ca', 'santa-rosa-ca', 'san-luis-obispo-ca'],

  points: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 },
    { name: 'Watsonville', state: 'CA', lat: 36.91, lon: -121.76, pop: 52000 },
    { name: 'Monterey', state: 'CA', lat: 36.6, lon: -121.89, pop: 30000 },
    { name: 'Half Moon Bay', state: 'CA', lat: 37.46, lon: -122.43, pop: 12000 }
  ],
  roads: ['Highway 1', 'Highway 17', 'Highway 9', 'Highway 152', 'Highway 129'],

  words: {
    street: ['Pacific Avenue', 'Mission Street', 'Highway 1', 'Highway 17', 'Highway 9'],
    water: ['the San Lorenzo River', 'Monterey Bay', 'the harbor'],
    hood: ['the Westside', 'the Eastside', 'Seabright', 'Live Oak', 'Pleasure Point', 'Beach Flats', 'Harvey West', 'Felton', 'Soquel'],
    thing: ['banana slug', 'redwood', 'taqueria', 'surf shop', 'levee path', 'strawberry stand', 'garage', 'roller coaster', 'back-lot unit', 'fog', 'skateboard', 'finals week'],
    weather: ['fog bank', 'winter storm', 'week of fire smoke']
  }
});
