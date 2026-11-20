SB.Cities.register('bozeman-mt', {
  v: 1,
  slug: 'bozeman-mt',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['montana state university', 'msu', 'msu bozeman', 'bobcats', 'university of montana', 'grizzlies', 'cat-griz', 'cat griz',
           'sweet pea festival', 'bridger bowl', 'big sky resort', 'yellowstone club', 'gallatin valley mall', 'bozeman health',
           'downtown holiday stroll', 'gallatin county fair', 'the quonset annex', 'quonset annex', 'sourdough hall', 'kagy street basement',
           'the feed store back room', 'lehrkind', 'lehrkind lot', 'the four corners shop', 'cottonwood grange', 'the rail spur',
           'the haybarn at nine mile', 'haybarn at nine mile', 'pass road garage', 'the elevator loft', 'elevator loft', 'the hyalite pavilion',
           'hyalite pavilion'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university'. */
  blocklist: ['montana state*', 'sweet pea*', 'bridger bowl*', 'cat-griz*', 'sourdough hall*', 'lehrkind*'],

  blurb: ['A mountain-valley college town in southwest Montana, where bands can play home a few times before it dries up, so the road is part of the job.',
          'A few organizers keep all-ages shows alive, and a DIY weekend is the high point of the year.'],
  hard: 'Small crowd that tires fast, and few rooms that take under-21s.',
  region: 'Big Sky country',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Missoula', state: 'MT', lat: 46.87, lon: -113.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bozeman' },
    { id: 'gallatin-gateway', kind: 'FEEDER', name: 'Gallatin Gateway', minutes: 15, bearing: 200, note: 'Tiny and rural, on the road to the canyon.' },
    { id: 'belgrade', kind: 'FEEDER', name: 'Belgrade', minutes: 15, bearing: 285, pop: 10000, note: 'The airport suburb and affordable bolt-hole, with a small garage scene.' },
    { id: 'manhattan', kind: 'FEEDER', name: 'Manhattan', minutes: 25, bearing: 280, pop: 2000, note: 'A farm town whose kids come to Bozeman.' },
    { id: 'livingston', kind: 'FEEDER', name: 'Livingston', minutes: 30, bearing: 95, pop: 8000, note: 'A railroad town turned arts and fly-fishing town over the pass, with a small artsy scene.' },
    { id: 'three-forks', kind: 'FEEDER', name: 'Three Forks', minutes: 35, bearing: 265, pop: 2000, note: 'A farm and cement town near the river headwaters.' },
    { id: 'wilsall', kind: 'FEEDER', name: 'Wilsall and Clyde Park', minutes: 40, bearing: 45, note: 'Ranching villages up the north roads.' },
    { id: 'big-sky', kind: 'FEEDER', name: 'Big Sky', minutes: 50, bearing: 190, note: 'A ski resort town of seasonal workers; the canyon road is a winter hazard.', season: { months: [12, 1, 2, 3], mul: 1.6 } },
    { id: 'ennis', kind: 'FEEDER', name: 'Ennis', minutes: 60, bearing: 235, pop: 1000, note: 'A fishing and ranching town over Norris Hill.' },
    { id: 'whitehall', kind: 'FEEDER', name: 'Whitehall', minutes: 60, bearing: 255, note: 'A small mining and ranching town west on I-90.' },
    { id: 'west-yellowstone', kind: 'FEEDER', name: 'West Yellowstone', minutes: 90, bearing: 180, note: 'A tourist gateway, very quiet in winter.' },
    { id: 'butte', kind: 'PEER', name: 'Butte', state: 'MT', minutes: 75, bearing: 255, scene: 500, note: 'A scruffy old mining town with cheap space and a tough identity; a real punk peer.' },
    { id: 'helena', kind: 'PEER', name: 'Helena', state: 'MT', minutes: 90, bearing: 330, scene: 350, note: 'A government town with its own small scene.' },
    { id: 'billings', kind: 'PEER', name: 'Billings', state: 'MT', minutes: 120, bearing: 90, scene: 700, note: 'The state\'s biggest city; bands coming from the east hit it first.' },
    { id: 'missoula', kind: 'PEER', name: 'Missoula', state: 'MT', minutes: 180, bearing: 285, slug: 'missoula-mt', note: 'The cooler, more bohemian college-town sibling, and a rival.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Main Street', route: 'downtown', note: 'Historic brick, now bars, outfitters and galleries. Liquor law and rent are hardest on all-ages shows.' },
    { id: 'southside', name: 'the university district and the Southside', route: 'campus', note: 'Old houses cut into student rentals; the likeliest place for house shows, with landlord and neighbor risk.' },
    { id: 'northeast', name: 'Northeast Bozeman', route: 'work-side', note: 'The old working-class rail and mill side, once cheap and ignored, now heating up. Garages, shops and warehouses.' },
    { id: 'west-side', name: 'the west side and Huffine Lane', route: 'work-side', note: 'Big-box stores, apartments and subdivisions with mini-storage practice rooms and strip-mall units.' },
    { id: 'four-corners', name: 'Four Corners', route: 'old-side', note: 'An unincorporated crossroads west of town with cheaper land and different rules; barns and yards.' },
    { id: 'belgrade', name: 'Belgrade', route: 'old-side', note: 'The affordable suburb out by the airport, with lower rent, garages and shops.' },
    { id: 'south-valley', name: 'south toward Gallatin Gateway', route: 'campus', note: 'Acreage, barns and second homes with few neighbors; the audience has to drive.' }
  ],

  contacts: ['missoula-mt', 'ogden-ut', 'boise-id'],

  points: [
    { name: 'Billings', state: 'MT', lat: 45.78, lon: -108.5, pop: 110000 },
    { name: 'Butte', state: 'MT', lat: 46.0, lon: -112.53, pop: 35000 },
    { name: 'Helena', state: 'MT', lat: 46.59, lon: -112.04, pop: 33000 },
    { name: 'Idaho Falls', state: 'ID', lat: 43.49, lon: -112.03, pop: 65000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Fargo', state: 'ND', lat: 46.88, lon: -96.79, pop: 125000 }
  ],
  roads: ['I-90', 'US 191', 'MT 84', 'I-15', 'Bozeman Pass', 'Homestake Pass'],

  words: {
    street: ['Main Street', '19th Avenue', 'Huffine Lane', 'Kagy Boulevard', 'US 191', 'I-90'],
    water: ['the Gallatin', 'Bozeman Creek', 'Hyalite Canyon'],
    hood: ['Northeast Bozeman', 'the Southside', 'Four Corners', 'Gallatin Gateway', 'Belgrade', 'Bridger Canyon'],
    thing: ['snowpack', 'avalanche', 'fly shop', 'Subaru', 'woodstove', 'quonset hut', 'trailhead', 'barn', 'ski season', 'diy weekend'],
    weather: ['pass closure', 'powder day', 'wildfire smoke', 'early blizzard']
  }
});
