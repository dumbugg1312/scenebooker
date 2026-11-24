SB.Cities.register('merced-ca', {
  v: 1,
  slug: 'merced-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['castle air force base', 'castle afb', 'castle airport', 'castle air museum', 'uc merced', 'university of california, merced', 'merced college', 'cal state stanislaus',
           'california state university, stanislaus', 'merced sun-star', 'sun-star', 'merced county times', 'kbif', 'merced county fair', 'hmong new year', 'yarts',
           'greyhound', 'amtrak', 'gold runner', 'merced high', 'golden valley', 'el capitan', 'jack in the box', 'taco bell', 'denny\'s', 'modelo', 'corona',
           'merced theatre', 'merced zoo', 'naia', 'merced county fairgrounds', 'merced county spring fair', 'jaripeo', 'jaripeo tremendo', 'pro rodeo', 'prca', 'lao family', 'yaya music fest', 'madera district fair', 'knights ferry arts & music festival', 'antidote festival', 'merced focus', 'turlock journal', '209 magazine', 'kvpr', 'valley public radio', 'abc30', 'gvwire', 'merced police department', 'merced county sheriff', 'the almond hull annex', 'tule fog room', 'hangar nine storage', 'the sweet potato shed', 'yosemite ave carport',
           'dairy row back lot', 'the canal street pit', 'south side swap stage', 'bear creek bunker', 'the packing house loft', 'the foreclosure house', '99 frontage garage'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['merced sun-star*', 'uc merced*', 'merced college*', 'castle air*', 'kbif*', 'merced county fair*', 'taco bell*', 'turlock journal*', 'yaya music fest*'],

  blurb: ['A San Joaquin Valley farm town on Highway 99 where a show is a garage with the door up and a cord run from the house.',
          'The shows are in garages, halls and the odd ranch shed, run on car-pools and fog, and the heat sets the clock while the neighbors set the curfew.'],
  hard: 'Small crowd, few steady rooms, and bands usually keep driving past.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Merced' },
    { id: 'atwater', kind: 'FEEDER', name: 'Atwater and Winton', minutes: 10, bearing: 325, scene: 50, note: 'A suburb and old base town up Highway 99, effectively the same metro. Kids come for shows without thinking about it.',
      rooms: [
  { id: 'atwater-park', kind: 'OUTDOOR', hood: 'atwater-hood', cap: 60, rent: 10, pa: .4, curfew: 1290, sketch: 30, standing: [60, 60, 55],
          note: 'The old hangar and park grid up the road. Summer afternoons are a heat risk, so it starts at dusk.' }] },
    { id: 'planada', kind: 'FEEDER', name: 'Planada and Le Grand', minutes: 15, bearing: 70, note: 'Farm-worker towns on the foothill side. Few venues, so kids ride in.' },
    { id: 'livingston', kind: 'FEEDER', name: 'Livingston', minutes: 20, bearing: 330, note: 'A small poultry and sweet potato town with a family-centered garage-band scene, maybe.' },
    { id: 'delhi', kind: 'FEEDER', name: 'Delhi and Hilmar', minutes: 25, bearing: 330, note: 'Farm and dairy towns between Livingston and Turlock.' },
    { id: 'chowchilla', kind: 'FEEDER', name: 'Chowchilla', minutes: 25, bearing: 165, note: 'A farm town to the south with two prisons. Kids drive north to Merced.' },
    { id: 'dos-palos', kind: 'FEEDER', name: 'Dos Palos', minutes: 35, bearing: 215, note: 'A farm town on the west side of the county.' },
    { id: 'turlock', kind: 'FEEDER', name: 'Turlock', minutes: 35, bearing: 325, scene: 60, note: 'The nearest college town, with a smaller-town attitude. The two trade bands easily.' },
    { id: 'los-banos', kind: 'FEEDER', name: 'Los Banos and Gustine', minutes: 40, bearing: 240, scene: 55, note: 'The west side\'s biggest town of ag and dairy, likeliest to have a scene of its own.' },
    { id: 'madera', kind: 'FEEDER', name: 'Madera', minutes: 40, bearing: 150, note: 'A heavily Latino farm town that is half a Fresno suburb.' },
    { id: 'mariposa', kind: 'FEEDER', name: 'Mariposa', minutes: 60, bearing: 65, note: 'A tiny mountain town at the gate of the park. Its kids make a long drive for shows.' },
    { id: 'modesto', kind: 'PEER', name: 'Modesto', state: 'CA', minutes: 50, bearing: 320, slug: 'modesto-ca', note: 'Bigger, the nearby city, a rival and an ally with a longer punk and hardcore reputation.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', state: 'CA', minutes: 80, bearing: 330, slug: 'stockton-ca', note: 'Up the valley, with the commuter suburbs beyond it shaped by the Bay.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', state: 'CA', minutes: 105, bearing: 150, slug: 'visalia-ca', note: 'A bigger valley city to the south with its own scene.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Merced', route: 'downtown', note: 'Older storefronts around Main Street, some vacant. Where a real room would be, and where complaints reach the police fastest.' },
    { id: 'south-merced', name: 'South Merced', route: 'old-side', note: 'Working-class, heavily Latino, with older small houses and big yards. Backyard and garage shows are most plausible here, and neighbors are used to family parties.' },
    { id: 'north-merced', name: 'North Merced', route: 'campus', note: 'Newer tract houses and cul-de-sacs near the community college. Quiet, and quick to call in a noise complaint.' },
    { id: 'bellevue', name: 'Bellevue Ranch and the university corridor', route: 'campus', note: 'The newest planned side toward the campus northeast of town. Student rentals, parking and roommate problems, and a car is required.' },
    { id: 'highway-99', name: 'the Highway 99 industrial edge', route: 'work-side', note: 'Warehouses, packing sheds and big-box strips. Practice units and shared warehouse shows, with owners who worry about insurance.' },
    { id: 'ranch-edge', name: 'the county edge', route: 'work-side', note: 'Ranch outbuildings and sheds outside city limits, under the sheriff, with neighbors far away.' },
    { id: 'atwater-hood', name: 'Atwater', route: 'town:atwater', note: 'A suburban grid and the old hangars, the nearest thing to raw space.' }
  ],

  rooms: [
    { id: 'south-garage', kind: 'HOUSE', hood: 'south-merced', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A garage with the door up and a cord run from the house. The first neighbor to call, or one drunk teenager, ends it.' },
    { id: 'north-yard', kind: 'HOUSE', hood: 'north-merced', cap: 40, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 45],
      pressure: 60, note: 'A backyard on a quiet cul-de-sac with the fences close. Fast to call in, so the set stays short.' },
    { id: 'bellevue-rental', kind: 'HOUSE', hood: 'bellevue', cap: 60, hostCut: 0, pa: .4, ages: ['A18'], curfew: 1350, ac: true, outdoor: false, sketch: 25, standing: [65, 55, 40],
      pressure: 55, note: 'A student rental with roommates, a landlord and no parking. The crowd vanishes at finals and every break.' },
    { id: 'highway-unit', kind: 'DIY', hood: 'highway-99', cap: 80, rent: 50, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A warehouse unit in a packing-shed strip. The owner\'s insurance and the fire marshal are the only real threats.' },
    { id: 'ranch-shed', kind: 'DIY', hood: 'ranch-edge', cap: 100, rent: 40, deposit: 0, pa: .5, curfew: 1440, ac: false, outdoor: true, sketch: 45, standing: [60, 60, 45],
      pressure: 40, note: 'An outbuilding past the city limits. No neighbors and a far-off sheriff, but a dark fog road in and a hot afternoon to load.' },
    { id: 'civic-hall', kind: 'HALL', hood: 'downtown', cap: 150, rent: 150, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'An old civic hall rented by the night, with a deposit and a hard clock. One loud night and the next date is a no.' },
    { id: 'main-street-shop', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [65, 65, 75], following: .2,
      note: 'A Main Street storefront with half its neighbors vacant. An afternoon set, over early because the owner wants to close.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 20, standing: [45, 60, 65],
      pressure: 50, note: 'A stage bar on West Main with a mostly twenty-one-plus calendar. The owner decides which kind of music books, and under-age bands are the problem.' },
    { id: 'main-street-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .8, ages: ['A18'], curfew: 1560, ac: true, following: .3, sketch: 10, standing: [45, 65, 65],
      owner: 'TALENT_BUYER', needs: ['FULL_BILL'], note: 'A restaurant and showroom on West Main. Tribute, tejano and party nights fill the calendar, so a heavy bill is a stretch.' },
    { id: 'old-theatre', kind: 'BIG', hood: 'downtown', cap: 900, rent: 1800, deposit: 500, pa: .9, curfew: 1380, ac: true, sketch: 5, standing: [40, 60, 70],
      note: 'A restored historic theatre on Main that hosts touring shows. Far above a garage booker\'s reach, until the day it is not.' },
    { id: 'fairgrounds', kind: 'BIG', hood: 'north-merced', cap: 1500, rent: 2000, deposit: 500, pa: .8, curfew: 1320, ac: false, outdoor: true, sketch: 10, standing: [40, 60, 65],
      note: 'The fairgrounds in the north of town, with a one-day music festival and the fair concerts. On fair and event weekends it is taken.' }
  ],

  contacts: ['modesto-ca', 'visalia-ca', 'stockton-ca', 'fresno'],

  calendar: [
    { id: 'county-fair', label: 'the county fair and rodeo', tag: 'fair', month: 6, week: 2, dows: [2, 3, 4, 5, 6], can: [.88, .82, .80], hoods: ['north-merced'], elsewhere: [.92, .88, .88] },
    { id: 'spring-fair', label: 'the spring fair out west', tag: 'fair', month: 4, week: 4, dows: [5, 6], can: [.92, .90, .90] },
    { id: 'family-festival', label: 'the big winter family festival', tag: 'festival', month: 12, week: 3, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['north-merced'], elsewhere: [.95, .92, .92] },
    { id: 'music-day', label: 'the one-day music festival at the fairgrounds', tag: 'festival', month: 9, week: 4, dows: [5], can: [.90, .88, .88] },
    { id: 'independence-week', label: 'the Mexican independence weekend', tag: 'holiday', month: 9, week: 3, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['south-merced', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .90, .90] },
    { id: 'finals', label: 'finals and graduation', tag: 'graduation', month: 5, weeks: [1, 2], dows: [3, 4, 5], can: [.90, .88, .88], hoods: ['bellevue'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 1000000 },
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 2400000 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 4700000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 900000 }
  ],
  roads: ['Highway 99', 'Highway 140', 'Highway 59', 'Highway 152', 'I-5'],

  words: {
    street: ['Main Street', '18th Street', 'Highway 99', 'Highway 140', 'Highway 59'],
    water: ['Bear Creek', 'the canal', 'the San Joaquin'],
    hood: ['South Merced', 'North Merced', 'Bellevue Ranch', 'Atwater', 'Winton', 'Planada', 'Livingston', 'Delhi', 'Dos Palos'],
    thing: ['tule fog', 'almond orchard', 'taco truck', 'garage door', 'sweet potato', 'crop duster', 'water tower', 'swamp cooler', 'ranch shed', 'carport', 'group chat', 'car-pool'],
    weather: ['hundred-degree afternoon', 'tule fog', 'heat wave']
  },

  events: [
    { id: 'MERCED_CA_FOG_NIGHT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2] },
      telegraph: 'The fog came down on Highway 99 this morning and has not lifted.',
      title: 'The van is stuck in the fog',
      body: 'The headliners are sitting in a parking lot in Modesto because the highway is shut, and the yard crowd is already standing in the cold.',
      options: [
        { id: 'WAIT', label: 'Hold the doors until the van crawls in', likely: 'It means a late start and a cold crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The van pulled in at ten, and the crowd had a fire in a barrel and nobody left.' },
        { id: 'SHORT', label: 'Run the local bands and play on', likely: 'It\'s a thin night, but a warm one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was two local bands and a long, loose night, and the people who came were glad.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'MERCED_CA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is in town and every parking lot on the north side is full.',
      title: 'The midway wins',
      body: 'The fairgrounds have taken the parking and the kids, and rodeo night is the same evening as your garage show.',
      options: [
        { id: 'LATE', label: 'Push doors back until the rodeo lets out', likely: 'The people who want a night out come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors opened an hour late, and the crowd came in smelling like funnel cake.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the midway.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd rode the Ferris wheel, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'MERCED_CA_HEAT_LOAD_IN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'It is 109 and the ranch shed is an oven all afternoon.',
      title: 'Loading in at a hundred and nine',
      body: 'The shed past the city limits has no shade and no air, and the amps are too hot to touch, and the bands want to know if anyone is bringing ice.',
      options: [
        { id: 'LATER', label: 'Push everything back until the sun is down', likely: 'Most people wait it out, and everyone is up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors were at nine, and fans blew all night, and the shed was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Only the committed show up.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the list stayed home in the air conditioning.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
