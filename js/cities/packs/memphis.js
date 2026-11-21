SB.Cities.register('memphis', {
  v: 1,
  slug: 'memphis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of memphis', 'u of m', 'rhodes college', 'christian brothers university', 'lemoyne-owen college', 'southwest tennessee community college',
           'university of tennessee health science center', 'the commercial appeal', 'commercial appeal', 'memphis flyer', 'daily memphian', 'ballet memphis', 'wkno',
           'wmc', 'wreg', 'wmcn', 'wmff', 'wevl', 'impact 89', 'memphis grizzlies', 'grizzlies', 'memphis tigers', 'memphis redbirds', 'redbirds', 'memphis 901 fc',
           'fedexforum', 'liberty bowl', 'fedex', 'fedex forum', 'st. jude', 'st jude children\'s research hospital', 'methodist le bonheur', 'baptist memorial',
           'autozone', 'international paper', 'memphis in may', 'beale street music festival', 'cooper-young festival', 'beale street', 'graceland',
           'naval support activity mid-south', 'tennessee state', 'sun studio', 'stax', 'mud island', 'hi-tone', 'hernando de soto bridge'],
  blocklist: ['memphis in may*', 'beale street*', 'graceland*', 'commercial appeal*', 'memphis flyer*', 'hi-tone*'],

  blurb: ['A cheap river city on the bluffs with a garage-punk legacy and a new queer DIY crowd.',
          'Houses, converted garages and a former nightclub carry the shows. Rooms open and close like seasons, and a drag act can land between two hardcore sets.'],
  hard: 'Rooms move or close, and the big clubs only half want hardcore.',
  region: 'the Mid-South',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 }
  ],

  tilt: [
    { fan: 'garage', band: 'garage', d: .08, reason: 'A garage-punk town. The older heads still carry it.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges', p: .02 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Memphis' },
    { id: 'west-memphis', kind: 'FEEDER', name: 'West Memphis', state: 'AR', minutes: 15, bearing: 275, beyond: 'river-bridges', note: 'Across the river. Kids drive over the bridge.' },
    { id: 'southaven', kind: 'FEEDER', name: 'Southaven', state: 'MS', minutes: 20, bearing: 185, note: 'A suburb across the state line. Some bands.' },
    { id: 'germantown', kind: 'FEEDER', name: 'Germantown', minutes: 25, bearing: 105, note: 'A wealthy suburb. Kids come in.' },
    { id: 'bartlett', kind: 'FEEDER', name: 'Bartlett', minutes: 25, bearing: 55, note: 'Suburban, to the northeast.' },
    { id: 'collierville', kind: 'FEEDER', name: 'Collierville', minutes: 30, bearing: 105, note: 'Suburban kids.' },
    { id: 'olive-branch', kind: 'FEEDER', name: 'Olive Branch', state: 'MS', minutes: 30, bearing: 170, note: 'A suburb with a few bands.' },
    { id: 'jackson-tn', kind: 'FEEDER', name: 'Jackson', minutes: 85, bearing: 80, note: 'A smaller scene. People drive in.' },
    { id: 'oxford', kind: 'PEER', name: 'Oxford', state: 'MS', minutes: 75, bearing: 140, scene: 900, note: 'A college town. Kids drive both ways.' },
    { id: 'little-rock', kind: 'PEER', name: 'Little Rock', state: 'AR', minutes: 140, bearing: 275, slug: 'little-rock-ar', note: 'A smaller scene across the river.' },
    { id: 'nashville', kind: 'PEER', name: 'Nashville', minutes: 180, bearing: 80, slug: 'nashville', note: 'Bigger, and a long drive on I-40.' }
  ],

  hoods: [
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'Leafy old streets by the park. Most of the venues and the artists\' houses.' },
    { id: 'cooper-young', name: 'Cooper-Young', route: 'old-side', note: 'An arts and bars strip with garage and living-room rooms.' },
    { id: 'broad', name: 'Broad Avenue', route: 'old-side', note: 'An arts district on a former industrial strip.' },
    { id: 'madison', name: 'Madison Avenue', route: 'old-side', note: 'A street where an old nightclub became a DIY room.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The tourist strip. A few bars and halls, wide and half empty at night.' },
    { id: 'crosstown', name: 'Crosstown', route: 'work-side', note: 'A big old warehouse turned arts hub on the north side. No-alcohol all-ages shows fit.' },
    { id: 'binghampton', name: 'Binghampton', route: 'work-side', note: 'Cheap rental houses and working families. Little nightlife.' },
    { id: 'south-memphis', name: 'South Memphis', route: 'work-side', note: 'Poorer, industrial, railyards.' },
    { id: 'university', name: 'the university area', route: 'campus', note: 'Student rentals, bars and houses east of the center.' }
  ],

  points: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2197416 },
    { name: 'Little Rock', state: 'AR', lat: 34.73, lon: -92.36, pop: 777607 },
    { name: 'St. Louis', state: 'MO', lat: 38.63, lon: -90.2, pop: 2814421 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1197766 }
  ],
  roads: ['I-40', 'I-55', 'I-240', 'US 78', 'Union Avenue', 'Poplar Avenue'],

  words: {
    street: ['Union Avenue', 'Poplar Avenue', 'Madison Avenue', 'Cooper Street', 'Young Avenue', 'Summer Avenue', 'Lamar Avenue'],
    water: ['the Mississippi', 'the Wolf River', 'the bluff'],
    hood: ['Midtown', 'Cooper-Young', 'Crosstown', 'Binghampton', 'Orange Mound', 'Broad Avenue', 'South Memphis'],
    thing: ['bluff', 'barge', 'box fan', 'overpass', 'barbecue smoke', 'night shift', 'mirrored bar', 'railway overpass'],
    weather: ['ice storm', 'river flood', 'heat index']
  },

  events: [
    { id: 'MEMPHIS_BRIDGE_DELAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Inspection crews are on the river bridges this week.',
      title: 'The river bridge is backed up',
      body: 'A barge, a wreck and a rain delay have the bridge to Arkansas crawling on show night. The kids from across the river are stuck in the line.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors up an hour. The ones from across the river left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared. The ones on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads crossed together. They will remember that.' }
      ] },

    { id: 'MEMPHIS_ICE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [12, 1, 2] },
      telegraph: 'Freezing rain is on the way and the roads will glaze over.',
      title: 'Ice storm',
      body: 'An inch of ice on every wire and overpass. The whole weekend is shutting down, and nobody wants to drive to a living room.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the roads clear', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'WALK', label: 'Tell the neighbors to walk over', likely: 'Smaller and louder.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .55 }, { op: 'REGULARS', pct: .02 }],
          result: 'Whoever lived within a mile showed up in boots. The floor was packed anyway.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Most people stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .4 }],
          result: 'The ice held. The bands played for the couch and the cat.' }
      ] }
  ]
});
