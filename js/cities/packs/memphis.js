SB.Cities.register('memphis', {
  v: 1,
  slug: 'memphis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of memphis', 'u of m', 'rhodes college', 'christian brothers university', 'lemoyne-owen college', 'southwest tennessee community college',
           'university of tennessee health science center', 'the commercial appeal', 'commercial appeal', 'memphis flyer', 'daily memphian', 'ballet memphis', 'wkno',
           'wmc', 'wreg', 'wmcn', 'wmff', 'wevl', 'impact 89', 'memphis grizzlies', 'grizzlies', 'memphis tigers', 'memphis redbirds', 'redbirds', 'memphis 901 fc',
           'fedexforum', 'liberty bowl', 'fedex', 'fedex forum', 'st. jude', 'st jude children\'s research hospital', 'methodist le bonheur', 'baptist memorial',
           'autozone', 'international paper', 'memphis in may', 'beale street music festival', 'cooper-young festival', 'beale street', 'graceland',
           'naval support activity mid-south', 'tennessee state', 'sun studio', 'stax', 'mud island', 'hi-tone', 'hernando de soto bridge',
           'gonerfest', 'riverbeat', 'riverbeat music festival', 'mempho', 'mempho music festival', 'radians amphitheater', 'memphis botanic garden', 'southern heritage classic',
           'simmons bank liberty stadium', 'alcorn state', 'arkansas-pine bluff', 'world championship barbecue cooking contest', 'cooper-young beerfest', 'bluff city sports',
           'memphis magazine', 'we are memphis', 'choose901', 'memphis beer blog', 'action news 5', 'localmemphis', 'fox13', 'memphis pyramid', 'mud island amphitheater',
           'memphis punk archive', 'memphis music hall of fame', 'tom lee park', 'memphis travel', 'memphis police department'],
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
    { fan: 'garage', band: 'garage', d: .08, reason: 'A garage-punk town, and the older heads still carry it.' }
  ],

  rooms: [
    { id: 'binghampton-house', kind: 'HOUSE', hood: 'binghampton', cap: 40, curfew: 1350, ac: false, standing: [70, 60, 45], pressure: 50, start: true,
      note: 'A frame rental with the couch pushed out. The people who live there carry all of it, and some nights the wrong guests have to be shown out.' },
    { id: 'midtown-house', kind: 'HOUSE', hood: 'midtown', cap: 50, curfew: 1380, ac: false, pressure: 55,
      note: 'A leafy-street house with a yard. Neighbors and the landlord end these, and most of the others are already gone.' },
    { id: 'garage-room', kind: 'DIY', hood: 'cooper-young', cap: 80, curfew: 1380, ac: false, sketch: 40, pressure: 55, needs: ['VOUCH'],
      note: 'A converted garage that is small, hot and loud. It will not last long once it gets popular.' },
    { id: 'south-main-room', kind: 'DIY', hood: 'downtown', cap: 200, curfew: 1440, ac: true, ages: ['ALL', 'A21'], pressure: 55, needs: ['VOUCH'],
      note: 'A former bar with a stage near a train overpass. It books anything, and the rent is what could end it.' },
    { id: 'madison-room', kind: 'DIY', hood: 'madison', cap: 150, curfew: 1380, ac: true, pressure: 60, needs: ['VOUCH'],
      note: 'An old nightclub with the mirrored bar still on the wall. It is the one room here that could fold next year.' },
    { id: 'arts-hub-hall', kind: 'HALL', hood: 'crosstown', cap: 250, curfew: 1320, ac: true, rent: 250, deposit: 100, owner: 'HALL_MANAGER',
      note: 'A rented room in the big warehouse arts hub. No beer, out by ten, and only on dates the building has free.' },
    { id: 'midtown-bar', kind: 'BAR', hood: 'midtown', cap: 150, curfew: 1500, ac: true, soundFee: 50,
      note: 'A gritty bar with a back room that leans rock. A small turnout is a bad night for a hardcore bill.' },
    { id: 'young-bar', kind: 'BAR', hood: 'cooper-young', cap: 100, curfew: 1500, ac: true, soundFee: 50,
      note: 'A small cocktail bar with live sets most weekends. A garage-rock room, not a hardcore one.' },
    { id: 'cafe-club', kind: 'CLUB', hood: 'midtown', cap: 300, curfew: 1440, ac: true, ages: ['ALL', 'A21'], following: .5,
      note: 'A two-floor club with an all-ages upstairs and a 21-plus downstairs. It has booked tours for years and likes a full bill.' },
    { id: 'midtown-club', kind: 'CLUB', hood: 'midtown', cap: 350, curfew: 1440, ac: true, ages: ['A18'], following: .4,
      note: 'A longtime Midtown room in transition. The calendar is thin now and the owner is choosy.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 900, curfew: 1380, ac: true, ages: ['ALL'],
      note: 'A seated or standing hall for the one night a year the town gets a real tour.' },
    { id: 'riverfront-park', kind: 'OUTDOOR', hood: 'downtown', cap: 400, curfew: 1320, rent: 25, ages: ['ALL'], needs: ['FULL_BILL'],
      note: 'A riverfront park stage that only opens in festival weeks. It is nobody\'s idea of a booker\'s room.' }
  ],

  contacts: ['little-rock-ar', 'nashville', 'jackson-ms', 'birmingham', 'st-louis'],

  calendar: [
    { id: 'spring-fest', label: 'the spring music weekend', tag: 'festival', month: 5, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'bbq-contest', label: 'the barbecue contest week', tag: 'festival', month: 5, weeks: [2, 3], dows: [2, 3, 4, 5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'tourist-week', label: 'the big tourist week', tag: 'holiday', month: 8, weeks: [2, 3], dows: [4, 5, 6], can: [.95, .95, .95] },
    { id: 'football-classic', label: 'the big college football classic', tag: 'game', month: 9, week: 2, dows: [4, 5], can: [.80, .90, .90] },
    { id: 'street-fair', label: 'the Cooper-Young street fair', tag: 'fair', month: 9, week: 3, dows: [5], can: [.80, .85, .85], hoods: ['cooper-young', 'midtown'], elsewhere: [1, 1, 1] },
    { id: 'garage-punk-weekend', label: 'the garage-punk record weekend', tag: 'festival', month: 9, week: 4, dows: [3, 4, 5, 6], can: [1.05, .90, .90] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1380, inForce: false } },

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
      body: 'A barge, a wreck and a rain delay have the bridge to Arkansas crawling on show night, and the kids from across the river are stuck in the line.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You moved doors up an hour, and the people from across the river left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never cleared, so the people on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads crossed together.' }
      ] },

    { id: 'MEMPHIS_ICE_STORM', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [12, 1, 2] },
      telegraph: 'Freezing rain is on the way and the roads will glaze over.',
      title: 'Ice storm',
      body: 'There is an inch of ice on every wire and overpass, the whole weekend is shutting down, and nobody wants to drive to a living room.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the roads clear', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' },
        { id: 'WALK', label: 'Tell the neighbors to walk over', likely: 'Smaller and louder.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .55 }, { op: 'REGULARS', pct: .02 }],
          result: 'Whoever lived within a mile showed up in boots, and the floor was packed anyway.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Most people stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .4 }],
          result: 'The ice held, and the bands played for the couch and the cat.' }
      ] },

    { id: 'MEMPHIS_STREET_FAIR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The street fair is Saturday, and the vendors are already marking off the curbs.',
      title: 'The street fair eats the parking',
      body: 'Every space for six blocks is gone and the streets are shut, and your garage show is one block inside the fence.',
      options: [
        { id: 'WAIT', label: 'Push doors back until the vendors pack up', likely: 'The crowd that wants a night out shows up, later than planned.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were at nine, when the last tent came down, and people walked over from the fair still carrying their cups.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Nobody can park, but the people who live close walk in.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The fair kept the crowd and the parking, but the regulars walked in from three streets away.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new date.' }
      ] }
  ]
});
