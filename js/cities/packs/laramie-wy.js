SB.Cities.register('laramie-wy', {
  v: 1,
  slug: 'laramie-wy',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of wyoming', 'uw', 'wyoming cowboys', 'cowboys', 'cowgirls', 'wyoming cowgirls', 'laramie boomerang', 'boomerang', 'wyoming public media',
           'wyofile', 'cowboy state daily', 'wyoming tribune eagle', 'kuwr', 'union pacific', 'wyoming territorial prison', 'territorial prison',
           'snowy range ski area', 'snowy range ski', 'medicine bow national forest', 'jubilee days', 'cheyenne frontier days', 'frontier days',
           'wyoming state fair', 'laramie plains civic center', 'civic center', 'wyoming theatre', 'ivinson memorial hospital', 'laramie high school',
           'albany county school district', 'f.e. warren air force base', 'warren air force base', 'warren afb', 'rawhide energy', 'mckinley',
           'wyoming wind', 'wyoming department of transportation', 'wydot', 'western wyoming community college', 'laramie county community college',
           'ucross', 'bnsf', 'amtrak', 'walmart', 'wal-mart', 'taco john\'s', 'albany county fair', 'albany county fairgrounds', 'pilot hill',
           'colorado state university', 'csu', 'university of colorado', 'casper college', 'wyoming blizzard', 'nolan\'s', 'the cowboy bar',
           'laramie live', 'kowb', 'laramie main street alliance', 'visit laramie', 'travel wyoming', 'uwpd', 'uw police department', 'uwaa', 'brewfest',
           'laramie brewfest', 'laramie jubilee days', 'tom horn days', 'lake hattie', 'prca', 'bosler', 'bandsintown', 'songkick'],
  blocklist: ['university of wyoming*', 'laramie boomerang*', 'union pacific*', 'frontier days*', 'wyoming cowboys*', 'territorial prison*'],

  blurb: ['A wind-scoured college and railroad town high on the plains, with a downtown basement and a house-born collective holding the scene together.',
          'A pop-punk town that gave the genre a famous export. Vans from Colorado fill the weekends, and half of every band leaves in May.'],
  hard: 'A small crowd, closed interstates, and a scene that empties every May.',
  region: 'the high plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Fort Collins', state: 'CO', lat: 40.55, lon: -105.06 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 }
  ],

  rooms: [
    { id: 'north-basement', kind: 'HOUSE', hood: 'north-blocks', cap: 40, ages: ['ALL'], curfew: 1350, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'A basement under an old Victorian split into apartments. Donations in a jar, a low ceiling, and a host who is tired of hosting.' },
    { id: 'west-garage', kind: 'HOUSE', hood: 'west-side', cap: 30, ages: ['ALL'], curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A garage behind a frame house with a space heater and a door that rattles in the wind. One neighbor has the police number memorized.' },
    { id: 'campus-yard', kind: 'HOUSE', hood: 'grand-avenue', cap: 50, ages: ['A18'], curfew: 1380, ac: false, outdoor: false, pressure: 60,
      note: 'A student rental by campus with a living-room stage. Loud, crowded, and a landlord who reads the complaints.' },
    { id: 'storefront-basement', kind: 'DIY', hood: 'downtown', cap: 100, ages: ['ALL'], curfew: 1410, ac: false, outdoor: false, pressure: 55,
      note: 'A basement under a downtown storefront, run by a collective with one organizer carrying the rent. Tickets at the door.' },
    { id: 'post-hall', kind: 'HALL', hood: 'downtown', cap: 200, ages: ['ALL'], curfew: 1320, ac: true,
      note: 'A hall rented by the night, with folding chairs and a long list of rules. Rare, all ages, out by ten.' },
    { id: 'campus-hall', kind: 'HALL', hood: 'grand-avenue', cap: 150, ages: ['ALL'], curfew: 1320, ac: true,
      note: 'A student-run room by campus. Busy in term and empty by the first week of summer.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1530, ac: true,
      note: 'A long-running bar on the strip with open mics and the odd local hardcore night. Wants a draw and a bar tab.' },
    { id: 'saloon', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1530, ac: true,
      note: 'A western saloon and dance hall. Mostly country, and the crowd is not your crowd.' },
    { id: 'civic-hall', kind: 'BIG', hood: 'grand-avenue', cap: 800, ages: ['ALL'], curfew: 1350, ac: true,
      note: 'The civic auditorium on the south edge. Touring concerts, rarely punk, and far out of reach.' }
  ],

  contacts: ['cheyenne-wy', 'fort-collins-co', 'casper-wy', 'denver'],

  calendar: [
    { id: 'statehood-week', label: 'the hometown summer festival week', tag: 'festival', month: 7, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .80, .78], hoods: ['downtown'], elsewhere: [.95, .92, .90] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [4, 5], dows: [4, 5, 6], can: [.92, .88, .88] },
    { id: 'homecoming', label: 'homecoming weekend', tag: 'parade', month: 9, week: 4, dows: [4, 5], can: [.85, .80, .85], hoods: ['grand-avenue', 'downtown'], elsewhere: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .92, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.85, .92, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] },
    { id: 'winter-break', label: 'winter break', tag: 'holiday', month: 12, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.65, .70, .75] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, week: 2, dows: [4, 5, 6], can: [.80, .78, .85] }
  ],

  tilt: [
    { fan: 'pop-punk', band: 'pop-punk', d: .08, reason: 'A pop-punk band from town broke out and put Laramie on the map.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Laramie' },
    { id: 'wheatland', kind: 'FEEDER', name: 'Wheatland', minutes: 50, bearing: 25, note: 'A small town north; a few kids come down for something to do.' },
    { id: 'centennial', kind: 'FEEDER', name: 'Centennial', minutes: 35, bearing: 270, note: 'A tiny mountain community on the way over the pass. A handful of ranch kids.' },
    { id: 'rock-river', kind: 'FEEDER', name: 'Rock River', minutes: 30, bearing: 335, note: 'A hamlet along the highway north. Very few people, the occasional ride in.' },
    { id: 'medicine-bow', kind: 'FEEDER', name: 'Medicine Bow', minutes: 55, bearing: 335, note: 'Tiny, with almost no scene.' },
    { id: 'albany', kind: 'FEEDER', name: 'Albany', minutes: 25, bearing: 270, note: 'A few houses. Mostly a path, not a source.' },
    { id: 'tie-siding', kind: 'FEEDER', name: 'Tie Siding', minutes: 25, bearing: 140, note: 'Tiny. A few kids come in with their parents.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', minutes: 50, bearing: 90, slug: 'cheyenne-wy', beyond: 'i80-east', note: 'A punk, alt and metal scene around a hidden downtown room. Bands and members cross between the two towns.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', state: 'CO', minutes: 75, bearing: 170, slug: 'fort-collins-co', note: 'The larger, better-served scene. Laramie bands share members with it.' },
    { id: 'casper', kind: 'PEER', name: 'Casper', minutes: 150, bearing: 335, slug: 'casper-wy', note: 'A smaller scene; bands share members.' }
  ],

  chokepoints: [
    { id: 'i80-east', name: 'I-80 east to Cheyenne', p: .04 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Second Street strip', route: 'downtown', note: 'Bars, a historic district by the tracks and old brick basements. Most rooms that book bands are within a few blocks.' },
    { id: 'grand-avenue', name: 'the Grand Avenue corridor', route: 'campus', note: 'Student apartments, fast food and rentals along the edge of campus. House parties and the occasional show.' },
    { id: 'west-side', name: 'old Laramie west of the tracks', route: 'old-side', note: 'Small frame houses, cheap rent and older locals. Some basements and garages.' },
    { id: 'snowy-range-road', name: 'the Snowy Range Road side', route: 'work-side', note: 'Warehouses, auto shops and cheap industrial space along the highway.' },
    { id: 'east-laramie', name: 'East Laramie and the Highway 30 corridor', route: 'work-side', note: 'Trailers, truck stops, yards and plants, far from anything at night.' },
    { id: 'spring-creek', name: 'Spring Creek and the north edge', route: 'campus', note: 'Newer subdivisions with families and staff. Quiet, and noise complaints are likely.' },
    { id: 'north-blocks', name: 'the north blocks by the library and park', route: 'old-side', note: 'Old Victorian houses split into apartments, where basement shows get started.' }
  ],

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Rawlins', state: 'WY', lat: 41.79, lon: -107.24, pop: 8200 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 200000 },
    { name: 'Rock Springs', state: 'WY', lat: 41.59, lon: -109.20, pop: 23000 }
  ],
  roads: ['I-80', 'US 287', 'Wyoming 130', 'Highway 30'],

  words: {
    street: ['Grand Avenue', 'Third Street', 'Second Street', 'Ivinson Avenue', 'Garfield Street', 'Snowy Range Road'],
    water: ['the Laramie River', 'Spring Creek'],
    hood: ['Spring Creek', 'East Laramie', 'Gateway', 'Snowy Range Road'],
    thing: ['wind', 'tracks', 'snowbank', 'plates', 'pickup', 'tie-down strap', 'antelope', 'space heater'],
    weather: ['ground blizzard', 'high wind', 'road closed']
  },

  events: [
    { id: 'LARAMIE_WY_I80_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true, months: [10, 11, 12, 1, 2, 3, 4] },
      telegraph: 'The wind is up and the road signs on I-80 say the pass may close.',
      title: 'The interstate is shut',
      body: 'I-80 is closed between here and Cheyenne for snow and wind. The van with Colorado plates is sitting on the wrong side, and so is half the crowd from the east.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the weather', likely: 'The ones already in town make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors an hour early. The ones who live here showed up and the rest stayed put.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people coming from the east.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road never reopened. The ones across the line stayed home.' },
        { id: 'RIDES', label: 'Organize rides on the back roads', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two pickups took the long way together. They will remember that.' }
      ] },

    { id: 'LARAMIE_WY_GARAGE_WIND', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12, 1, 2, 3, 4, 5] },
      telegraph: 'The flags on Grand Avenue are standing straight out and the garage fence is already leaning.',
      title: 'The wind takes the fence',
      body: 'A gust knocked the fence flat behind the west-side garage, and the garage door is the only wall the band has left. A neighbor on the old side is on the phone with the police non-emergency line.',
      options: [
        { id: 'BASEMENT', label: 'Move the bill to the north blocks basement', likely: 'Smaller and out of the wind. Nobody can call about a basement.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A basement took the bill and the floor was packed. The wind stayed outside.' },
        { id: 'EARLY', label: 'Start early and finish before the neighbor wins', likely: 'Most get in. A short, cold night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done by nine, the garage door shaking the whole time.' },
        { id: 'ACCEPT', label: 'Run it and hold the door down', likely: 'A rough night. Some people leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The crowd stood in coats and a van door held the wall. The band played anyway.' }
      ] },

    { id: 'LARAMIE_WY_STATEHOOD_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The parade route is going up and the strip is filling with trucks and trailers.',
      title: 'The parade closed the street',
      body: 'Your downtown basement show lands on the Saturday of the summer festival. The street is closed for the parade, the strip is full of rodeo crowd, and the stairs down are the only quiet place in town.',
      options: [
        { id: 'LATE', label: 'Push doors back until the street dance dies down', likely: 'The ones who want out of the noise find you, late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors at ten. The crowd came down the stairs sunburnt and ready.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Parking is gone and the casual crowd is at the rodeo.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars walked in. Nobody else could park.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LARAMIE_WY_UTAH_VAN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [2, 3, 4] },
      telegraph: 'A van with Utah plates is on the way, and the forecast has snow all over the pass.',
      title: 'The Utah van is snowed in',
      body: 'The band from Salt Lake arrives for a spring show in a snowstorm, and I-80 is shut behind them. They need a floor in the north blocks tonight and a night off before they can play.',
      options: [
        { id: 'FLOOR', label: 'Put them up and move the show a day', likely: 'Breaks the date, but the band is fed and warm.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }, { op: 'REGULARS', pct: .02 }],
          result: 'They slept on the floor and played the next night. The town was glad to see them.' },
        { id: 'SHORT', label: 'Run the show with the bands who are in town', likely: 'A thin night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two local bands and a long set. The Utah band watched from the stairs.' },
        { id: 'WAIT', label: 'Hold the doors for the plows', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten, white to the windows. You started late and nobody left.' }
      ] }
  ]
});
