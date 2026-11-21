SB.Cities.register('bridgeport-ct', {
  v: 1,
  slug: 'bridgeport-ct',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of bridgeport', 'sacred heart university', 'fairfield university', 'housatonic community college', 'university of new haven', 'connecticut post', 'ctinsider',
           'wpkn', 'wice', 'bridgeport bluefish', 'bridgeport sound tigers', 'bridgeport islanders', 'hartford yard goats', 'webster bank arena', 'harbor yard amphitheater',
           'hartford healthcare amphitheater', 'barnum museum', 'p.t. barnum', 'bridgeport hospital', 'st. vincent\'s', 'sikorsky', 'lycoming', 'bridgeport & port jefferson ferry',
           'port jefferson ferry', 'bridgeport brass', 'general electric', 'hubbell', 'people\'s united bank', 'webster bank', 'metro-north', 'amtrak', 'merritt parkway',
           'capulet fest', 'connecticut metal fest', 'connecticut death fest', 'hurricane sandy', 'hurricane irene', 'hurricane gloria', 'ct post', 'long island sound'],
  blocklist: ['connecticut post*', 'ctinsider*', 'sikorsky*', 'barnum museum*', 'webster bank*', 'connecticut metal fest*', 'connecticut death fest*'],

  blurb: ['A faded factory and harbor city that gave the early Connecticut punk shows and a metalcore sound the whole state still chases.',
          'Rooms are pizza parlors and borrowed halls, and half the crowd drives in from the rich suburbs. The ferry horn cuts the soundcheck, and the old heads say the city had it all first.'],
  hard: 'The good rooms keep closing and half your crowd lives in another town.',
  region: 'the Sound shore',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A band from this city shaped metalcore, and the old heads still expect hardcore.' }
  ],

  chokepoints: [
    { id: 'i95-river-crossing', name: 'the river crossing on I-95', p: .03 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Bridgeport' },
    { id: 'fairfield', kind: 'FEEDER', name: 'Fairfield', minutes: 10, bearing: 240, note: 'A wealthy suburb. Teens come in, and there are a few bands.' },
    { id: 'stratford', kind: 'FEEDER', name: 'Stratford', minutes: 10, bearing: 100, beyond: 'i95-river-crossing', note: 'A blue-collar suburb across the river. Garage bands.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 20, bearing: 80, beyond: 'i95-river-crossing', note: 'A shoreline suburb with a pop-punk and metal pool.' },
    { id: 'trumbull', kind: 'FEEDER', name: 'Trumbull and Shelton', minutes: 20, bearing: 335, note: 'Hillside suburbs full of teenagers with cars.' },
    { id: 'westport', kind: 'FEEDER', name: 'Westport and Weston', minutes: 20, bearing: 270, note: 'Wealthy, with kids who have money and a few bands.' },
    { id: 'norwalk', kind: 'FEEDER', name: 'Norwalk', minutes: 25, bearing: 245, note: 'A small city with its own all-ages hall and real scene overlap.' },
    { id: 'stamford', kind: 'FEEDER', name: 'Stamford', minutes: 35, bearing: 235, note: 'A harder city near the state line, with bands and old heads.' },
    { id: 'danbury', kind: 'FEEDER', name: 'Danbury', minutes: 40, bearing: 325, note: 'An inland city with its own DIY and metal crowd.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 45, bearing: 60, slug: 'new-haven-ct', note: 'Older, with a deeper house and DIY network.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', minutes: 60, bearing: 35, slug: 'hartford', note: 'A similar spread-out scene.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 100, bearing: 65, slug: 'providence', note: 'Occasional bill swaps along I-95.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'An arena, a courthouse and a few bars and clubs. Dead after events.' },
    { id: 'east-end', name: 'the East End', route: 'work-side', note: 'Old factory buildings and triple-deckers: cheap rent and warehouses.' },
    { id: 'east-side', name: 'the East Side', route: 'work-side', note: 'Rowhouses, immigrant families and auto shops.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Dense houses near the old factory district, with many two-family flats.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'The harbor side: the port and the industrial waterfront.' },
    { id: 'north-end', name: 'the North End', route: 'campus', note: 'A quieter residential area near the highway and the suburbs.' },
    { id: 'black-rock', name: 'Black Rock', route: 'old-side', note: 'A harbor neighborhood with a main street, bars and bungalows.' },
    { id: 'the-hollow', name: 'the Hollow', route: 'work-side', note: 'Mixed residential and industrial near the river.' }
  ],

  contacts: ['new-haven-ct', 'hartford', 'providence', 'new-york'],

  points: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 19900000 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'Port Chester', state: 'NY', lat: 41, lon: -73.67, pop: 30000 },
    { name: 'New Rochelle', state: 'NY', lat: 40.91, lon: -73.78, pop: 80000 }
  ],
  roads: ['I-95', 'Route 8', 'Route 25', 'Route 1'],

  words: {
    street: ['Main Street', 'Fairfield Avenue', 'Park Avenue', 'State Street', 'Stratford Avenue', 'Barnum Avenue'],
    water: ['the Pequonnock', 'the harbor', 'Black Rock Harbor'],
    hood: ['East End', 'West Side', 'South End', 'North End', 'Black Rock', 'the Hollow'],
    thing: ['drawbridge', 'ferry horn', 'nor\'easter', 'pizza box', 'triple-decker', 'train ride home'],
    weather: ['nor\'easter', 'ice storm', 'summer heat']
  },

  events: [
    { id: 'BRIDGEPORT_CT_I95_BREAKDOWN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews have the lanes on the highway over the river down to one.',
      title: 'A truck is stuck on the river crossing',
      body: 'A broken-down truck has the highway crossing backed up for miles on the night of your show. The bands and the kids from the shore towns are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The shore towns stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together. They will remember that.' }
      ] }
  ]
});
