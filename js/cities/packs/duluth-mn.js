SB.Cities.register('duluth-mn', {
  v: 1,
  slug: 'duluth-mn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['umd', 'university of minnesota duluth', 'college of st. scholastica', 'st. scholastica', 'lake superior college', 'uw-superior', 'northland college',
           'duluth news tribune', 'news tribune', 'kumd', 'grain belt', 'hamm\'s', 'dta', 'canal park', 'aerial lift bridge', 'lift bridge', 'lakewalk',
           'grandma\'s marathon', 'blues festival', 'bentleyville', 'homegrown', 'twin ports', 'fond du lac', 'spirit mountain', 'blatnik', 'blatnik bridge', 'bong bridge',
           'american legion', 'vfw', 'elks',
           'the slipway', 'taconite hall', 'bridge tender\'s annex', 'the cold storage', 'skyline hall', 'ballast', 'the gale warning', 'ship canal social club',
           'lake effect annex', 'hoist house', 'fourth street gym', 'ironhead lounge'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions are written only in generic form. */
  blocklist: ['umd*', 'kumd*', 'news tribune*', 'bentleyville*', 'canal park*', 'ironhead*'],

  blurb: ['The end of the interstate, so everyone you play for already knows everyone else. Punk and metal share rooms and a crowd.',
          'The record shop and the old practice building are gone. A cafe punk night, a basement across the bridge and one big festival week are what is left.'],
  hard: 'A long, cold detour from anywhere, with a small crowd that already knows everyone.',
  region: 'the North Shore',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Duluth' },
    { id: 'proctor', kind: 'FEEDER', name: 'Proctor', minutes: 10, bearing: 255, note: 'A railroad-yard town on the hill; a suburb of Duluth in everything but name.' },
    { id: 'superior', kind: 'FEEDER', name: 'Superior', state: 'WI', minutes: 15, bearing: 135, pop: 27000, note: 'The sister port across the bridge: rust-belt bars, its own metal and punk, rival and partner.', bands: 3 },
    { id: 'hermantown', kind: 'FEEDER', name: 'Hermantown', minutes: 15, bearing: 320, pop: 10000, note: 'The big suburb of strip malls and a large high school; teens with cars come in.' },
    { id: 'cloquet', kind: 'FEEDER', name: 'Cloquet', minutes: 25, bearing: 245, pop: 12600, note: 'A paper-mill and hockey town with its own small scene.', bands: 1 },
    { id: 'carlton', kind: 'FEEDER', name: 'Carlton', minutes: 30, bearing: 225, note: 'A tiny town of families; a few kids drive in.' },
    { id: 'two-harbors', kind: 'FEEDER', name: 'Two Harbors', minutes: 40, bearing: 40, pop: 3600, note: 'An ore-dock town up the shore with some teen punks and metal kids.' },
    { id: 'silver-bay', kind: 'FEEDER', name: 'Silver Bay', minutes: 60, bearing: 40, pop: 1800, note: 'A taconite company town; young people drive down for anything.' },
    { id: 'virginia', kind: 'FEEDER', name: 'Virginia and Eveleth', minutes: 75, bearing: 340, pop: 8500, note: 'Iron Range mining towns with a strong metal and hardcore tradition.' },
    { id: 'st-cloud', kind: 'PEER', name: 'St. Cloud', minutes: 165, bearing: 215, scene: 700, note: 'A college town more suburban in feel, down I-35 and across.' },
    { id: 'eau-claire', kind: 'PEER', name: 'Eau Claire', state: 'WI', minutes: 180, bearing: 170, slug: 'eau-claire-wi', note: 'A university and indie town with a big music reputation; a friendly rivalry.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the lakefront', route: 'downtown', note: 'A tourist district of hotels and restaurants below the hill; dead for DIY except as a place noise gets complained about.' },
    { id: 'hillside', name: 'the Central Hillside', route: 'old-side', note: 'Steep slope of dense old frame houses, rentals and churches; cheap, ignored and where house shows live.' },
    { id: 'west-end', name: 'the West End', route: 'work-side', note: 'Old working-class neighborhood of warehouses and brick storefronts below the rail yards; cheap space for makers.' },
    { id: 'west-duluth', name: 'West Duluth and Morgan Park', route: 'work-side', note: 'Far west end by the river and the old steel plant: a worn commercial strip and a planned company town of block houses.' },
    { id: 'campus', name: 'the campus side', route: 'campus', note: 'Big old houses and duplexes around the university on the hill; student-churned rentals and house parties.' },
    { id: 'lakeside', name: 'Lakeside and Lester Park', route: 'campus', note: 'Pricey east end along London Road with bigger lots; a few basements and garages.' },
    { id: 'park-point', name: 'Park Point', route: 'old-side', note: 'A long sandbar of beach houses at the dead end of one road; summer bonfires only.' }
  ],

  contacts: ['eau-claire-wi', 'fargo-nd', 'minneapolis'],

  points: [
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 430000 },
    { name: 'Thunder Bay', state: 'ON', lat: 48.38, lon: -89.25, pop: 108000 },
    { name: 'Marquette', state: 'MI', lat: 46.54, lon: -87.4, pop: 21000 },
    { name: 'Grand Marais', state: 'MN', lat: 47.75, lon: -90.33, pop: 1300 }
  ],
  roads: ['I-35', 'US 53', 'US 2', 'MN 61', 'MN 23', 'I-535'],

  words: {
    street: ['Superior Street', 'Lake Avenue', 'London Road', 'Skyline Parkway', 'Grand Avenue', 'Central Entrance', 'Michigan Street'],
    water: ['Lake Superior', 'the St. Louis River', 'the harbor', 'Park Point', 'Lester River'],
    hood: ['Central Hillside', 'West End', 'Lincoln Park', 'Morgan Park', 'West Duluth', 'Chester Park', 'Lakeside', 'Lester Park', 'Park Point', 'Spirit Valley'],
    thing: ['ore boat', 'taconite pellet', 'hotdish', 'pasty', 'wild rice soup', 'snowbank', 'shovel', 'cafe punk night', 'festival week', 'practice building', 'record shop'],
    weather: ['lake effect', 'whiteout', 'lake fog']
  }
});
