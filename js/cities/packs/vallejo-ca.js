SB.Cities.register('vallejo-ca', {
  v: 1,
  slug: 'vallejo-ca',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['six flags', 'six flags discovery kingdom', 'discovery kingdom', 'cal maritime', 'california state university maritime', 'cal poly', 'touro', 'solano community college',
           'vallejo times-herald', 'times-herald', 'vallejo sun', 'open vallejo', 'vallejo community access television', 'vallejo city unified', 'kaiser', 'travis air force base',
           'concord naval weapons station', 'san francisco bay ferry', 'amtrak', 'in-n-out', 'jack in the box', 'mad hatter', 'ghost ship', 'oakland warehouse fire',
           'solano county fair', 'napa valley', 'hiddenbrooke kid', 'vfw', 'american legion',
           'tennessee street hall', 'dry dock annex', 'carquinez carport', 'glen cove clubhouse', 'st. anselm\'s parish hall', 'the heights parlor', 'springs road bowl',
           'hog island garage', 'georgia street back room', 'the fairgrounds lot', 'sandy beach shed'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['six flags*', 'times-herald*', 'vallejo sun*', 'open vallejo*', 'in-n-out*', 'cal maritime*', 'touro*'],

  blurb: ['A former Navy shipyard town on the northeast corner of the Bay, with cheap garages, halls and industrial leftovers and a long mixed-up history of its own music.',
          'The scene is small and always short of rooms, because one bridge or one ferry puts the whole Bay Area in reach.'],
  hard: 'Small crowd, noisy neighbors, and the Bay\'s rooms are a ferry or a bridge away.',
  region: 'the Bay Area',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Vallejo' },
    { id: 'american-canyon', kind: 'FEEDER', name: 'American Canyon', minutes: 10, bearing: 20, note: 'A newer suburb of warehouses and big-box stores to the north; no scene of its own.' },
    { id: 'benicia', kind: 'FEEDER', name: 'Benicia', minutes: 15, bearing: 110, note: 'The wealthier bedroom town across I-780; the rich neighbor, with a small scene at best.' },
    { id: 'crockett', kind: 'FEEDER', name: 'Crockett, Rodeo and Hercules', minutes: 20, bearing: 205, note: 'Refinery and mill towns across the bridge, tied to the East Bay punk orbit.' },
    { id: 'martinez', kind: 'FEEDER', name: 'Martinez', minutes: 20, bearing: 130, note: 'A county seat across the strait with a few bands.' },
    { id: 'napa', kind: 'FEEDER', name: 'Napa', minutes: 30, bearing: 10, note: 'A tourist and wine town; some local bands, priced out by the money.' },
    { id: 'vacaville', kind: 'FEEDER', name: 'Vacaville', minutes: 35, bearing: 55, note: 'A suburb up I-80 with a fair number of pop-punk and metal kids.' },
    { id: 'petaluma', kind: 'FEEDER', name: 'Petaluma and Novato', minutes: 40, bearing: 300, note: 'Rural-suburban North Bay towns with some active DIY.' },
    { id: 'antioch', kind: 'FEEDER', name: 'Pittsburg and Antioch', minutes: 40, bearing: 110, note: 'Delta suburbs with long commutes and a scene that comes and goes.' },
    { id: 'davis', kind: 'FEEDER', name: 'Davis and Dixon', minutes: 45, bearing: 60, note: 'A university town and its farm neighbor up I-80.' },
    { id: 'fairfield', kind: 'PEER', name: 'Fairfield', minutes: 45, bearing: 55, scene: 500, note: 'The closest peer: a suburb by an Air Force base. People drive both ways.' },
    { id: 'richmond', kind: 'PEER', name: 'Richmond', minutes: 45, bearing: 215, scene: 700, note: 'An industrial and port city of the same weight, with a lot of overlap in crowds.' },
    { id: 'concord', kind: 'PEER', name: 'Concord', minutes: 40, bearing: 150, scene: 500, note: 'A suburb with a train connection; smaller overlap.' },
    { id: 'santa-rosa', kind: 'PEER', name: 'Santa Rosa', minutes: 60, bearing: 330, slug: 'santa-rosa-ca', note: 'The other big North Bay city, up Highway 37 and 101.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the waterfront', route: 'downtown', note: 'Old brick, a ferry terminal and a monthly art walk; vacant storefronts let rooms come and go.' },
    { id: 'heights', name: 'Vallejo Heights', route: 'old-side', note: 'Hilltop Victorians above downtown; big living rooms, few basements, tenants who tolerate noise for a while.' },
    { id: 'mare-island', name: 'Mare Island', route: 'work-side', note: 'The old shipyard across the river: shops, dry docks and warehouses, shrinking under redevelopment.' },
    { id: 'south-vallejo', name: 'South Vallejo and the Sonoma corridor', route: 'work-side', note: 'Dense, working-class and heavily Filipino and Latino; garages, backyards and strip-mall units.' },
    { id: 'glen-cove', name: 'Glen Cove', route: 'old-side', note: 'A quiet marina end by the bridge; a backyard or two.' },
    { id: 'east-hills', name: 'Northgate, Rancho Vallejo and the east hills', route: 'campus', note: 'Newer tract homes and big driveways; commuters, families and suburban teenagers.' },
    { id: 'springs-road', name: 'Springs Road and Tennessee Street', route: 'downtown', note: 'The cross-town arterials of old storefronts, a bowling alley, pizza and taquerias.' },
    { id: 'fairgrounds', name: 'the fairgrounds and Highway 37', route: 'campus', note: 'Big parking lots and event traffic; no rooms, but it warps the roads.' }
  ],

  contacts: ['oakland', 'santa-rosa-ca', 'stockton-ca'],

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 4700000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 },
    { name: 'Berkeley', state: 'CA', lat: 37.87, lon: -122.27, pop: 125000 },
    { name: 'Reno', state: 'NV', lat: 39.53, lon: -119.81, pop: 250000 }
  ],
  roads: ['I-80', 'I-780', 'Highway 37', 'Highway 29', 'Carquinez Bridge'],

  words: {
    street: ['Georgia Street', 'Tennessee Street', 'Sonoma Boulevard', 'Springs Road', 'Curtola Parkway', 'Broadway'],
    water: ['the Carquinez Strait', 'San Pablo Bay', 'the Napa River'],
    hood: ['Mare Island', 'Glen Cove', 'Vallejo Heights', 'Northgate', 'Rancho Vallejo', 'South Vallejo', 'Benicia', 'Crockett'],
    thing: ['garage', 'lumpia', 'taco truck', 'ferry', 'tule fog', 'dry dock', 'carport', 'rented hall', 'bakery pastry', 'shipyard'],
    weather: ['tule fog', 'bay wind']
  }
});
