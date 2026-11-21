SB.Cities.register('salt-lake-city', {
  v: 1,
  slug: 'salt-lake-city',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of utah', 'utah utes', 'brigham young university', 'byu', 'utah state university', 'utah jazz', 'real salt lake', 'salt lake tribune',
           'deseret news', 'city weekly', 'slug magazine', 'ksl', 'kutv', 'kslx', 'kxrk', 'latter-day saints', 'lds', 'temple square', 'salt lake temple',
           'delta center', 'vivint', 'energysolutions', 'intermountain health', 'intermountain', 'zions bank', 'delta air lines', 'utah transit authority',
           'trax', 'sundance film festival', 'sundance', 'crucialfest', 'dark arts festival', 'pioneer day', 'pioneer day parade', 'hill air force base',
           'hill afb', 'utah jazz arena', 'wasatch front', 'great salt lake', 'olympic', 'olympics', 'powder mountain', 'snowbird', 'alta', 'solitude', 'brighton',
           'gateway mall', 'the depot', 'kilby court', 'club sound', 'bar deluxe', 'the urban lounge'],
  /* "The valley", "the canyon road", "the university", "the train": no real institutions in game text. */
  blocklist: ['kilby court*', 'urban lounge*', 'salt lake tribune*', 'deseret*', 'crucialfest*', 'utah jazz*', 'real salt lake*', 'zions*'],

  blurb: ['A mountain capital with a deep punk history and an all-ages tradition older than most cities have. Half the room does not drink, so shows are sober and loud.',
          'A garden-court room, a punk bar with a 21+ corner and a merch shop that does all-ages bills carry it, with houses and warehouses by word of mouth behind them.'],
  hard: 'Rooms close on rent and zoning, and snow can shut the mountain road.',
  region: 'the Mountain West',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Salt Lake City' },
    { id: 'murray', kind: 'FEEDER', name: 'Murray', minutes: 15, bearing: 170, note: 'An inner suburb. Kids come up on the train.' },
    { id: 'west-valley', kind: 'FEEDER', name: 'West Valley City', minutes: 20, bearing: 235, note: 'A big working-class suburb with garages and crews.' },
    { id: 'bountiful', kind: 'FEEDER', name: 'Bountiful', minutes: 20, bearing: 350, note: 'A northern suburb with a history of an all-ages room.' },
    { id: 'sandy', kind: 'FEEDER', name: 'Sandy', minutes: 25, bearing: 165, note: 'A large suburb at the south end of the valley.' },
    { id: 'draper', kind: 'FEEDER', name: 'Draper', minutes: 30, bearing: 170, note: 'A south-valley suburb of teenagers.' },
    { id: 'ogden', kind: 'FEEDER', name: 'Ogden', minutes: 40, bearing: 5, note: 'Its own scene, with halls and one DIY room that moved up from the city.' },
    { id: 'park-city', kind: 'FEEDER', name: 'Park City', minutes: 40, bearing: 100, beyond: 'canyon-roads', note: 'A mountain town over the pass. Occasional shows.' },
    { id: 'provo', kind: 'PEER', name: 'Provo and Orem', minutes: 50, bearing: 170, slug: 'provo-ut', note: 'A student scene where rooms close and reopen.' },
    { id: 'logan', kind: 'PEER', name: 'Logan', minutes: 90, bearing: 5, note: 'A college town rebuilding after a venue closure.' },
    { id: 'boise', kind: 'PEER', name: 'Boise', state: 'ID', minutes: 150, bearing: 320, slug: 'boise-id', note: 'A comparable scene across the desert.' }
  ],

  chokepoints: [{ id: 'canyon-roads', name: 'the canyon road', p: .03 }],

  hoods: [
    { id: 'downtown', name: 'downtown and the train hub', route: 'downtown', note: 'Bars, big clubs and the transit stop. The touring-band center.' },
    { id: 'sugar-house', name: 'Sugar House', route: 'old-side', note: 'A hip shopping district with cheap older houses. Band houses and record stores.' },
    { id: 'avenues', name: 'the Avenues', route: 'old-side', note: 'Hilly Victorian rentals with little noise tolerance. Small bands.' },
    { id: 'ninth-ninth', name: '9th and 9th', route: 'old-side', note: 'Mixed rentals near bars and small stages.' },
    { id: 'granary', name: 'the Granary District', route: 'work-side', note: 'Industrial blocks of warehouses turned arts spaces. Rehearsal rooms and larger DIY spaces.' },
    { id: 'west-side', name: 'Glendale and Rose Park', route: 'work-side', note: 'Working-class west-side streets with a big Latino population. Garages and backyards.' },
    { id: 'south-salt-lake', name: 'Millcreek and South Salt Lake', route: 'work-side', note: 'Strip malls, cheap warehouses and some rehearsal rooms.' },
    { id: 'foothill', name: 'the University and Foothill', route: 'campus', note: 'Student housing on the east bench.' }
  ],

  contacts: ['provo-ut', 'ogden-ut', 'boise-id', 'denver'],

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 3000000 },
    { name: 'Las Vegas', state: 'NV', lat: 36.17, lon: -115.14, pop: 2400000 },
    { name: 'Boise', state: 'ID', lat: 43.62, lon: -116.20, pop: 750000 },
    { name: 'Wendover', state: 'NV', lat: 40.74, lon: -114.04, pop: 4500 }
  ],
  roads: ['I-15', 'I-80', 'I-215', 'State Street', 'Redwood Road'],

  words: {
    street: ['State Street', '700 East', '2100 South', '400 South', 'Redwood Road'],
    water: ['the lake', 'the Jordan River', 'Emigration Creek'],
    hood: ['Sugar House', 'the Avenues', 'Granary District', 'Rose Park', 'Glendale', 'Marmalade', 'Liberty Wells', 'Millcreek'],
    thing: ['inversion', 'canyon', 'sunday', 'cream soda', 'snow tires', 'smog day'],
    weather: ['inversion', 'lake-effect snow', 'canyon closure']
  },

  events: [
    { id: 'SALT_LAKE_CITY_PASS_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true, months: [11, 12, 1, 2, 3] },
      telegraph: 'A storm is stacking up on the peaks, and the canyon road is on the closure list.',
      title: 'The canyon road is shut',
      body: 'Avalanche crews closed the canyon road at noon. The band from the mountain town and the kids from over the pass are on the wrong side of it.',
      options: [
        { id: 'EARLY', label: 'Move the show earlier so the early cars get through', likely: 'Some get down before the gates. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .6, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who made it down did so on chains.' },
        { id: 'ACCEPT', label: 'Run it without them', likely: 'Lose everyone over the pass.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .2, beyond: true }],
          result: 'The road stayed shut all night. The mountain side watched a phone video.' },
        { id: 'RIDES', label: 'Send a van the long way around', likely: 'Three hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .85, beyond: true }, { op: 'HOURS', d: -3, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'The van came in late with six kids and a drum kit. They will remember that.' }
      ] },

    { id: 'SALT_LAKE_CITY_INVERSION', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], weather: 'COLD', months: [12, 1, 2] },
      telegraph: 'The inversion has been sitting on the valley for six days.',
      title: 'The inversion has everyone indoors',
      body: 'The air is brown and the warnings say to stay inside. Half the kids are coughing, and a few parents have said no to the drive.',
      options: [
        { id: 'GO', label: 'Run it anyway and hand out masks at the door', likely: 'Costs thirty dollars. Most of the crowd comes.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .01 }],
          result: 'A box of masks at the door. The room was sealed and loud and hazy.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'The parents keep a lot of the kids home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The kids with parents stayed in. The rest came in coughing.' }
      ] }
  ]
});
