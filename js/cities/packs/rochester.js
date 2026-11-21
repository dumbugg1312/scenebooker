SB.Cities.register('rochester', {
  v: 1,
  slug: 'rochester',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of rochester', 'rochester institute of technology', 'rit', 'nazareth college', 'st. john fisher university', 'roberts wesleyan', 'suny brockport', 'monroe community college', 'eastman school of music', 'eastman kodak', 'kodak', 'xerox', 'bausch and lomb', 'wegmans', 'democrat and chronicle', 'city newspaper', 'rochester city paper', 'roc city mag', 'wxxi', 'wham', 'rochester red wings', 'rochester americans', 'amerks', 'rochester rhinos', 'buffalo bills', 'lilac festival', 'rochester international jazz festival', 'fringe festival', 'clothesline festival', 'new york state thruway', 'rochester airport', 'george eastman museum', 'strong museum of play', 'seabreeze', 'rochester knighthawks', 'rochester rattlers', 'genesee brewery', 'garbage plate', 'nick tahou'],
  blocklist: ['wegmans*', 'kodak*', 'xerox*', 'genesee brew*', 'lilac fest*', 'democrat and chronicle*'],

  blurb: ['Rochester\'s DIY scene lives in church halls, studios and basements, with a strong hardcore and death-metal underground and tape labels.',
          'The big rooms book covers, so bands hit a ceiling. The same old bands have played the same Saturday for ten years.'],
  hard: 'The big rooms book cover bands, and the same bands keep playing.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88 },
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38 },
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'Hardcore and death-metal acts and a tape label carry the underground.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Rochester' },
    { id: 'fairport', kind: 'FEEDER', name: 'Fairport and Pittsford', minutes: 20, bearing: 105, note: 'Rich suburbs; teenagers with cars.' },
    { id: 'webster', kind: 'FEEDER', name: 'Webster and Penfield', minutes: 20, bearing: 70, note: 'East-side suburbs; pop-punk and emo kids.' },
    { id: 'spencerport', kind: 'FEEDER', name: 'Spencerport and Hilton', minutes: 20, bearing: 285, beyond: 'river-bridges', note: 'West suburbs.' },
    { id: 'brockport', kind: 'FEEDER', name: 'Brockport', minutes: 30, bearing: 275, note: 'A college town west; students and bands.' },
    { id: 'geneseo', kind: 'FEEDER', name: 'Geneseo', minutes: 35, bearing: 195, note: 'A small college town south; kids and a few bands.' },
    { id: 'canandaigua', kind: 'FEEDER', name: 'Canandaigua', minutes: 35, bearing: 130, note: 'A lake town; kids drive in.' },
    { id: 'batavia', kind: 'FEEDER', name: 'Batavia', minutes: 35, bearing: 265, note: 'A farm town with a few bands.' },
    { id: 'newark', kind: 'FEEDER', name: 'Newark and Lyons', minutes: 35, bearing: 85, note: 'Small canal towns.' },
    { id: 'buffalo', kind: 'PEER', name: 'Buffalo', minutes: 80, bearing: 265, slug: 'buffalo', note: 'A bigger scene with more all-ages rooms; bands go there.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 85, bearing: 95, slug: 'syracuse-ny', note: 'A similar-size scene.' },
    { id: 'ithaca', kind: 'PEER', name: 'Ithaca', minutes: 90, bearing: 160, slug: 'ithaca-ny', note: 'Smaller; a college town.' }
  ],

  chokepoints: [{ id: 'river-bridges', name: 'the downtown river bridges', p: 0.02 }],

  hoods: [
    { id: 'park-ave', name: 'Park Avenue and the arts district', route: 'old-side', note: 'Cafes, old houses and storefronts; the arts and music district.' },
    { id: 'south-wedge', name: 'the South Wedge', route: 'old-side', note: 'Rowhouses and corner bars; a young scruffy neighborhood that holds basement shows.' },
    { id: 'market', name: 'the Public Market area', route: 'work-side', note: 'Old factories and a market; cheap warehouse and studio space.' },
    { id: 'corn-hill', name: 'Corn Hill and Plymouth-Exchange', route: 'old-side', note: 'Historic houses near the river; some shows.' },
    { id: 'dewey', name: 'Lyell Avenue and Dewey Avenue', route: 'work-side', note: 'A long strip of old commercial buildings and factories; cheap rooms.' },
    { id: 'downtown', name: 'downtown and the East End', route: 'downtown', note: 'Bars and clubs; the 21+ nightlife strip.' },
    { id: 'highland', name: 'Beechwood and Highland Park', route: 'old-side', note: 'Quiet streets of old houses; the odd house show.' },
    { id: 'henrietta', name: 'Henrietta and Brighton', route: 'campus', note: 'Student rentals and suburb; kids who drive in.' },
    { id: 'charlotte', name: 'Charlotte by the lake', route: 'work-side', note: 'A beach strip with summer shows, empty in winter.' }
  ],

  contacts: ['buffalo', 'syracuse-ny', 'ithaca-ny'],

  points: [
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38, pop: 6200000 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01, pop: 19000000 },
    { name: 'Buffalo', state: 'NY', lat: 42.89, lon: -78.88, pop: 1155000 },
    { name: 'Syracuse', state: 'NY', lat: 43.05, lon: -76.15, pop: 650000 }
  ],
  roads: ['I-90', 'I-490', 'I-590', 'I-390', 'the Inner Loop', 'Route 104'],

  words: {
    street: ['Park Avenue', 'East Avenue', 'Monroe Avenue', 'Lake Avenue', 'Clinton Avenue', 'Dewey Avenue'],
    water: ['the Genesee', 'Lake Ontario'],
    hood: ['the South Wedge', 'Charlotte', 'Corn Hill', 'Irondequoit', 'Marketview Heights'],
    thing: ['church hall', 'tape', 'lake snow', 'Inner Loop', 'folding table', 'potluck'],
    weather: ['lake snow', 'lake-effect storm']
  },

  events: [
    { id: 'ROCHESTER_BRIDGE_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on a bridge over the river downtown this week.',
      title: 'The bridge is shut',
      body: 'A bridge over the river is closed the night of your show, and it splits downtown from the west side. The bands and the kids on the other bank have to go the long way around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared. The ones on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way. They will remember that.' }
      ] }
  ]
});
