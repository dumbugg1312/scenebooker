SB.Cities.register('fort-wayne-in', {
  v: 1,
  slug: 'fort-wayne-in',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['purdue fort wayne', 'ipfw', 'university of saint francis', 'saint francis', 'indiana tech', 'ivy tech', 'huntington university',
           'trine university', 'taylor university', 'manchester university', 'parkview field', 'three rivers festival', 'johnny appleseed festival',
           'johnny appleseed', 'germanfest', 'komets', 'war memorial coliseum', 'air national guard', 'steak n shake', 'summit city', 'city of churches',
           'magnet wire capital', 'vfw', 'american legion', 'the magnet room', 'wire mill hall', 'three rivers annex', 'calhoun basement', 'swinney carport',
           'maumee lanes back room', 'rudisill rec', 'summit city social hall', 'st. joe boiler house', 'broadway storage unit 14', 'lakeside porch', 'post 214 annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['komets*', 'parkview field*', 'steak n shake*', 'johnny appleseed*', 'three rivers festival*', 'germanfest*'],

  blurb: ['Old heads still tell kids they missed the real scene. Rooms open, go sober or go dark, and the bar bills carry on.',
          'The big all-ages night is a ticketed anniversary show at the theater, not a basement.'],
  hard: 'Few DIY rooms left; the big theater is for touring names, not locals.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.00 },
    { name: 'Cleveland', state: 'OH', lat: 41.50, lon: -81.69 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Wayne' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn', minutes: 25, bearing: 15, note: 'A small classic-car town up the highway; its kids drive down to the city.' },
    { id: 'columbia-city', kind: 'FEEDER', name: 'Columbia City', minutes: 25, bearing: 300, note: 'A rural commuter town to the northwest.' },
    { id: 'huntington', kind: 'FEEDER', name: 'Huntington', minutes: 30, bearing: 225, note: 'A county seat with a small college and a few local bands.' },
    { id: 'decatur', kind: 'FEEDER', name: 'Decatur', minutes: 30, bearing: 170, note: 'A farm town to the south.' },
    { id: 'bluffton', kind: 'FEEDER', name: 'Bluffton', minutes: 35, bearing: 195, note: 'A farm town with a small college, down the state road.' },
    { id: 'kendallville', kind: 'FEEDER', name: 'Kendallville and Garrett', minutes: 40, bearing: 25, note: 'Small factory and farm towns to the north.' },
    { id: 'angola', kind: 'FEEDER', name: 'Angola', minutes: 45, bearing: 5, note: 'A lake-country college town up the interstate; busier in summer.', season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'van-wert', kind: 'FEEDER', name: 'Van Wert', state: 'OH', minutes: 45, bearing: 100, note: 'An Ohio farm town; its kids drive west for shows.' },
    { id: 'warsaw', kind: 'FEEDER', name: 'Warsaw', minutes: 50, bearing: 295, note: 'A lake town of its own with a few small shows.' },
    { id: 'defiance', kind: 'FEEDER', name: 'Defiance', state: 'OH', minutes: 55, bearing: 60, note: 'A small Ohio college town to the northeast.' },
    { id: 'muncie', kind: 'PEER', name: 'Muncie', minutes: 80, bearing: 215, scene: 400, note: 'A college town with a strong DIY tradition that sees the bigger city as squarer.' },
    { id: 'south-bend', kind: 'PEER', name: 'South Bend', minutes: 90, bearing: 305, slug: 'south-bend-in', note: 'A bigger college and arts scene to the northwest.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 105, bearing: 65, slug: 'toledo-oh', note: 'A close rival and the road to Detroit.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', state: 'OH', minutes: 120, bearing: 150, slug: 'dayton-oh', note: 'Two hours south-east, with its own touring traffic.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Landing', route: 'downtown', note: 'A revived grid at the meeting of the rivers: bars with back rooms and a few short-lived pop-up spaces. Priced up and polished.' },
    { id: 'fairfield', name: 'the Fairfield Avenue corridor', route: 'old-side', note: 'Record shops, thrift, coffee and old brick houses with basements. The heart of house shows, heating up for years.' },
    { id: 'west-central', name: 'West Central and Lakeside', route: 'old-side', note: 'Big old Victorian houses cut into apartments. Basements and porches, with rents rising.' },
    { id: 'broadway', name: 'Broadway and the near south side', route: 'work-side', note: 'Cheap duplexes, corner stores and light-industrial units. Practice spaces and backyard shows, mostly ignored.' },
    { id: 'northeast', name: 'the northeast and Coliseum Boulevard', route: 'work-side', note: 'Postwar ranch houses, strip malls, church halls and rec rooms. Stable and unglamorous.' },
    { id: 'crescent', name: 'Crescent Avenue and the commuter campus', route: 'campus', note: 'Apartments and fast food around a commuter university. Risky apartment shows.' },
    { id: 'waynedale', name: 'Waynedale and the southwest', route: 'work-side', note: 'Working-class suburb with big yards: garage, carport and yard shows.' },
    { id: 'northwest', name: 'the northwest sprawl', route: 'campus', note: 'Affluent big-box suburbs. Nothing for shows but the parents\' basements.' }
  ],

  contacts: ['south-bend-in', 'toledo-oh', 'dayton-oh', 'lafayette-in', { name: 'Muncie', state: 'IN', lat: 40.19, lon: -85.39 }],

  points: [
    { name: 'Indianapolis', state: 'IN', lat: 39.77, lon: -86.16, pop: 880000 },
    { name: 'Muncie', state: 'IN', lat: 40.19, lon: -85.39, pop: 65000 },
    { name: 'Lima', state: 'OH', lat: 40.74, lon: -84.11, pop: 35000 },
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 630000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 }
  ],
  roads: ['I-69', 'I-469', 'US 30', 'US 24', 'US 27', 'SR 930'],

  words: {
    street: ['Fairfield', 'Broadway', 'Calhoun Street', 'Coliseum Boulevard', 'Rudisill', 'Main Street', 'Lincoln Highway', 'Crescent Avenue'],
    water: ['the St. Marys', 'the St. Joseph', 'the Maumee'],
    hood: ['Fairfield', 'West Central', 'Lakeside', 'Southwood Park', 'Rudisill', 'South Wayne', 'Waynedale', 'Time Corners', 'Tillman'],
    thing: ['coney', 'tenderloin sandwich', 'church basement', 'fellowship hall', 'carport', 'bowling alley', 'community room', 'anniversary show', 'sober bar'],
    weather: ['lake-effect snow', 'muggy storm']
  }
});
