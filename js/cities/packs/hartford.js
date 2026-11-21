SB.Cities.register('hartford', {
  v: 1,
  slug: 'hartford',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of connecticut', 'uconn', 'trinity college', 'university of hartford', 'central connecticut state', 'ccsu', 'wesleyan', 'university of saint joseph',
           'capital community college', 'hartford courant', 'ctinsider', 'hartford advocate', 'wesu', 'wtic', 'wfsb', 'wvit', 'hartford yard goats', 'hartford wolf pack',
           'uconn huskies', 'connecticut sun', 'aetna', 'cigna', 'travelers', 'hartford healthcare', 'pratt & whitney', 'pratt and whitney', 'stanley black & decker',
           'mohegan sun', 'foxwoods', 'xl center', 'dunkin park', 'the bushnell', 'connecticut science center', 'mark twain house', 'connecticut state capitol',
           'hartford marathon', 'connecticut death fest', 'capulet fest', 'hurricane irene', 'hurricane gloria', 'hurricane sandy', 'colt firearms'],
  blocklist: ['hartford courant*', 'ctinsider*', 'uconn*', 'aetna*', 'cigna*', 'mohegan sun*', 'foxwoods*', 'connecticut death fest*'],

  blurb: ['A spread-out insurance town where the heavy shows live in suburban basements and one big club. Downtown goes dark at six.',
          'The scene drives in from every direction, one night here, one night in a mill town. Nobody lives near the room, and everyone is home by midnight.'],
  hard: 'Nobody lives near the venue, and downtown is empty after dark.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New Haven', state: 'CT', lat: 41.31, lon: -72.92 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges and the viaduct', p: .035 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Hartford' },
    { id: 'west-hartford', kind: 'FEEDER', name: 'West Hartford', minutes: 10, bearing: 270, note: 'An affluent suburb of teen bands, basements and garages.' },
    { id: 'east-hartford', kind: 'FEEDER', name: 'East Hartford and Manchester', minutes: 15, bearing: 95, beyond: 'river-bridges', note: 'Across the river. Working-class, with bands, and the kids come in.' },
    { id: 'new-britain', kind: 'FEEDER', name: 'New Britain', minutes: 20, bearing: 235, note: 'An old factory town with Polish roots and a few bands.' },
    { id: 'enfield', kind: 'FEEDER', name: 'Enfield and Windsor Locks', minutes: 25, bearing: 5, note: 'Northern suburbs by the Massachusetts line.' },
    { id: 'vernon', kind: 'FEEDER', name: 'Vernon and Rockville', minutes: 25, bearing: 70, beyond: 'river-bridges', note: 'Mill towns to the east with a few bands.' },
    { id: 'bristol', kind: 'FEEDER', name: 'Bristol', minutes: 30, bearing: 245, note: 'A smaller factory town. Kids drive in.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown', minutes: 30, bearing: 175, beyond: 'river-bridges', note: 'A college and river town with bands and a student crowd.' },
    { id: 'meriden', kind: 'FEEDER', name: 'Meriden', minutes: 30, bearing: 205, note: 'A small city with cheap basements.' },
    { id: 'new-haven', kind: 'PEER', name: 'New Haven', minutes: 45, bearing: 200, slug: 'new-haven-ct', note: 'A deeper DIY network with a house-show history.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 60, bearing: 100, slug: 'providence', note: 'Shared bills along Route 6 and I-84.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 60, bearing: 55, slug: 'worcester-ma', note: 'A similar-sized scene. Fill dates both ways.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The office district and the arena strip: a few clubs and bars, dead after work hours.' },
    { id: 'asylum-hill', name: 'Asylum Hill', route: 'old-side', note: 'Victorian houses and apartments among the office towers. Mixed, with some old rooms.' },
    { id: 'frog-hollow', name: 'Frog Hollow', route: 'work-side', note: 'A Latino corridor of old factories and cheap rent.' },
    { id: 'parkville', name: 'Parkville', route: 'work-side', note: 'Old industrial buildings turned art and music spaces. The likeliest place for a loud room.' },
    { id: 'south-end', name: 'the South End', route: 'old-side', note: 'Italian and Irish rowhouses and two-families close to downtown.' },
    { id: 'barry-square', name: 'Barry Square', route: 'campus', note: 'Near a small college: cheap flats and basements.' },
    { id: 'west-end', name: 'the West End', route: 'old-side', note: 'Leafy houses, artists and students. The more affluent edge.' },
    { id: 'north-end', name: 'the North End', route: 'work-side', note: 'Hard-hit and mostly residential, with little nightlife.' },
    { id: 'east-hartford-hood', name: 'East Hartford', route: 'campus', note: 'Across the river: subdivisions, strip malls and basements.' }
  ],

  contacts: ['new-haven-ct', 'providence', 'worcester-ma', 'springfield-ma'],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 19900000 },
    { name: 'Springfield', state: 'MA', lat: 42.12, lon: -72.54, pop: 464000 },
    { name: 'Northampton', state: 'MA', lat: 42.32, lon: -72.63, pop: 29000 }
  ],
  roads: ['I-84', 'I-91', 'Route 2', 'Route 9', 'I-691'],

  words: {
    street: ['Albany Avenue', 'Park Street', 'Farmington Avenue', 'Main Street', 'Wethersfield Avenue', 'Capitol Avenue'],
    water: ['the Connecticut River', 'the Park River'],
    hood: ['Asylum Hill', 'Frog Hollow', 'Parkville', 'Barry Square', 'Clay Arsenal', 'Wethersfield Avenue'],
    thing: ['triple-decker', 'viaduct', 'turnpike', 'boiler', 'basement', 'diner run'],
    weather: ['snow squall', 'ice storm', 'humidity']
  },

  events: [
    { id: 'HARTFORD_VIADUCT_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the viaduct downtown this week.',
      title: 'The viaduct is a parking lot',
      body: 'A wreck on the viaduct in rush hour has the whole river crossing backed up on the night of your show. The bands and the kids from the east side are stuck.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat rush hour', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The east side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together. They will remember that.' }
      ] }
  ]
});
