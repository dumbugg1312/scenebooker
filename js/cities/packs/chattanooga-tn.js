SB.Cities.register('chattanooga-tn', {
  v: 1,
  slug: 'chattanooga-tn',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['volkswagen', 'bluecross blueshield', 'bluecross', 'unum', 'chattanooga bakery', 'moon pie', 'moon pies', 'mckee foods', 'lee university',
           'university of tennessee', 'university of tennessee at chattanooga', 'utc', 'chattanooga state', 'southern adventist university',
           'covenant college', 'bryan college', 'tennessee wesleyan', 'berry college', 'bonnaroo', 'ironman', 'ironman chattanooga',
           'head of the hooch', 'krystal', 'waffle house', 'rc cola', 'times free press', 'chattanooga times free press', 'nooga.com', 'vfw',
           'american legion', 'arnold air force base', 'gig city', 'epb', 'scopes trial', 'wauhatchie grange', 'the tunnel room',
           'orchard knob social club', 'cowart street laundry', 'glass mill annex', 'moccasin hall', 'lupton ironworks loft', 'citico rec center',
           'post 214 legion hall', 'tiftonia pavilion', 'walden basement'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the spring storms'. */
  blocklist: ['bonnaroo*', 'riverbend*', 'moon pie*', 'waffle house*', 'times free press*', 'volkswagen*'],

  blurb: ['Chattanooga remembers its punk past and is proud of it. The pits are friendly, the bills are mixed, and the rooms are few.',
          'Rich kids and working-class kids at the same show, and metalcore kids packing the big all-ages hall.'],
  hard: 'Few all-ages rooms, and the bar nights are 21+.',
  region: 'the Southeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .05, reason: 'All-ages metalcore bills fill the big halls.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Chattanooga' },
    { id: 'rossville', kind: 'FEEDER', name: 'Rossville, Fort Oglethorpe and Ringgold', state: 'GA', minutes: 20, bearing: 165, note: 'The Georgia side of the line: cheap rent, a different county, and kids who are effectively city kids.', bands: 3 },
    { id: 'cleveland', kind: 'FEEDER', name: 'Cleveland', minutes: 35, bearing: 75, note: 'A church-heavy small city up I-75 with a few metal and hardcore kids.', bands: 1 },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper and South Pittsburg', minutes: 35, bearing: 270, note: 'River and mill towns west on I-24; small-town halls and garages. An hour behind on the clock.' },
    { id: 'dalton', kind: 'FEEDER', name: 'Dalton', state: 'GA', minutes: 40, bearing: 150, note: 'A carpet-mill town south on I-75 with some DIY of its own.', bands: 1 },
    { id: 'dayton', kind: 'FEEDER', name: 'Dayton', minutes: 40, bearing: 30, note: 'A small county seat north on US 27; it sends a few kids.' },
    { id: 'sequatchie', kind: 'FEEDER', name: 'Dunlap and Pikeville', minutes: 45, bearing: 340, note: 'Hardscrabble farm towns up the Sequatchie Valley.' },
    { id: 'monteagle', kind: 'FEEDER', name: 'Monteagle and Sewanee', minutes: 50, bearing: 285, note: 'Plateau towns up the mountain on I-24; Sewanee is a small college town with its own music.', bands: 1 },
    { id: 'athens', kind: 'FEEDER', name: 'Athens', minutes: 50, bearing: 55, note: 'A small college and farm town northeast on I-75.' },
    { id: 'manchester', kind: 'FEEDER', name: 'Tullahoma and Manchester', minutes: 65, bearing: 290, note: 'Two plateau towns on I-24 with a few bands each.', bands: 2 },
    { id: 'rome', kind: 'FEEDER', name: 'Rome', state: 'GA', minutes: 70, bearing: 190, note: 'A two-college town south on US 27 with more music than most of the list.', bands: 2 },
    { id: 'fort-payne', kind: 'FEEDER', name: 'Fort Payne', state: 'AL', minutes: 75, bearing: 225, note: 'A hosiery-mill town on top of the mountain, down I-59.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', minutes: 105, bearing: 50, scene: 3000, note: 'The bigger university sibling up I-75; the two trade bands.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', state: 'AL', minutes: 105, bearing: 255, slug: 'huntsville-al', note: 'A rocket-and-defense city of similar size, a separate tour stop.' },
    { id: 'murfreesboro', kind: 'PEER', name: 'Murfreesboro', minutes: 110, bearing: 290, scene: 2000, note: 'A big state-university town with a busy house-show culture.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 175, bearing: 75, slug: 'asheville-nc', note: 'The art-and-tourist mountain city that people go to for shows.' }
  ],

  hoods: [
    { id: 'southside', name: 'the Southside', route: 'downtown', note: 'Old warehouses and rail buildings now breweries, galleries and apartments: once the cheap arts end, now the most heated-up part of town.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Tourist riverfront on one side, old commercial blocks and the university on the other; bars with stages and tourist-priced rent.' },
    { id: 'north-shore', name: 'the North Shore', route: 'old-side', note: 'A walkable strip of shops and bars across the bridges, with small wood-frame houses behind: porch and backyard shows, priced out.' },
    { id: 'st-elmo', name: 'St. Elmo', route: 'old-side', note: 'A shabby-arty old-street neighborhood at the foot of the mountain; hillside houses with uneven basements, heating up fast.' },
    { id: 'highland-park', name: 'Highland Park and Fort Wood', route: 'old-side', note: 'Big old houses divided into apartments, with porches and basements: the likeliest place for a house-show culture.' },
    { id: 'brainerd', name: 'East Chattanooga and Brainerd', route: 'work-side', note: 'Strip malls, car lots and ranch houses over the ridge: garages, carports and old shopping-center units, where a lot of teenagers live.' },
    { id: 'alton-park', name: 'Alton Park and the south-side belt', route: 'work-side', note: 'A historically Black working-class community beside foundries and rail yards, under pressure from the Southside next door. Not a backdrop.' },
    { id: 'red-bank', name: 'Red Bank and Hixson', route: 'campus', note: 'Postwar suburbs north of the river: ranch-house garages and basements, church halls, and the teenagers who start the bands.' },
    { id: 'rossville-side', name: 'the Georgia side', route: 'work-side', note: 'The strip across the state line, with cheap rent and different police.' }
  ],

  contacts: ['huntsville-al', 'asheville-nc'],

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2000000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 880000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1100000 }
  ],
  roads: ['I-24', 'I-75', 'I-59', 'US 27', 'Highway 153'],

  words: {
    street: ['Market Street', 'Main Street', 'Frazier Avenue', 'Brainerd Road', 'Rossville Boulevard', 'Lee Highway', 'Highway 153'],
    water: ['the Tennessee River', 'the river', 'Chattanooga Creek'],
    hood: ['the Southside', 'the North Shore', 'St. Elmo', 'Highland Park', 'Fort Wood', 'Glenwood', 'Alton Park', 'Red Bank', 'Hixson', 'East Ridge', 'Brainerd', 'Missionary Ridge', 'Lookout Mountain'],
    thing: ['carport', 'tall boy', 'sweet tea', 'meat and three', 'kudzu', 'foundry', 'incline', 'ridge road', 'church show', 'poster archive', 'pit', 'all-ages hall'],
    weather: ['afternoon thunderstorm', 'tornado watch', 'mountain fog', 'ice']
  }
});
