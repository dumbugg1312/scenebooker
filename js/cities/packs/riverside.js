SB.Cities.register('riverside', {
  v: 1,
  slug: 'riverside',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of california riverside', 'ucr', 'california baptist university', 'riverside community college', 'riverside city college', 'la sierra university',
           'california state university san bernardino', 'csusb', 'university of redlands', 'loma linda university', 'the press-enterprise', 'press enterprise',
           'inland empire weekly', 'riverside art museum', 'mission inn', 'kvcr', 'kcal', 'kesq', 'riverside county', 'march air reserve base', 'march field',
           'amazon', 'kaiser permanente', 'los angeles angels', 'the 66ers', 'inland empire 66ers', '66ers', 'riverside raceway', 'auto club speedway',
           'national orange show', 'orange show', 'festival of lights', 'ontario airport', 'santa ana winds', 'hurricane hilary', 'tropical storm hilary',
           'raincross gazette', 'press-enterprise', 'pbs socal', 'kpcc', 'laist', 'la weekly', 'ocweekly', 'oc weekly', 'live nation', 'mission inn festival of lights',
           'riversidescene', 'ucr highlander', 'riverside unified', 'march field air museum', 'riverside air show', 'the ie voice', '60 miles east', 'moreno valley unified'],
  blocklist: ['mission inn*', 'press-enterprise*', 'inland empire weekly*', '66ers*', 'orange show*', 'riverside festival of lights*'],

  blurb: ['Warehouses, stucco and freeway sprawl east of LA, with backyard hardcore and a long habit of all-ages halls and word-of-mouth maps.',
          'The scene is spread across a dozen small towns, and a show means a garage, a shop or a living room.'],
  hard: 'Heat, the 91 and the 60, and nobody lives close enough to walk.',
  region: 'the Inland Empire',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A young, Latino-led hardcore revival runs through the whole basin.' }
  ],

  chokepoints: [{ id: 'the-91', name: 'the 91 at the Corona interchange', p: .03 }],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Riverside' },
    { id: 'rubidoux', kind: 'FEEDER', name: 'Rubidoux', minutes: 10, bearing: 315, scene: 250, note: 'Across the river: house and backyard shows.',
      rooms: [
    { id: 'rubidoux-yard', kind: 'HOUSE', hood: 'town-rubidoux', cap: 80, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 30, standing: [70, 60, 40],
    pressure: 40, note: 'A big backyard across the river, away from the Wood Streets complaints. The county rules stop the music at ten.' },
    { id: 'valley-hall', kind: 'HALL', hood: 'town-rubidoux', cap: 150, rent: 150, deposit: 75, pa: .5, curfew: 1320, ac: false, sketch: 20, standing: [55, 60, 55],
    owner: 'HALL_MANAGER', pressure: 50, note: 'A rented hall or warehouse unit out past the river, found by word of mouth and a hand-drawn map. The fire marshal can end it.' }
      ] },
    { id: 'colton', kind: 'FEEDER', name: 'Colton', minutes: 20, bearing: 30, note: 'A railroad town beside the 215: cheap, loud, industrial.' },
    { id: 'moreno-valley', kind: 'FEEDER', name: 'Moreno Valley', minutes: 20, bearing: 85, note: 'A big suburb out the 60: lots of teens, few rooms.' },
    { id: 'corona', kind: 'FEEDER', name: 'Corona', minutes: 25, bearing: 250, beyond: 'the-91', note: 'West along the 91. Kids come in both ways, and there is a small punk pocket of its own.' },
    { id: 'san-bernardino', kind: 'FEEDER', name: 'San Bernardino', minutes: 25, bearing: 35, note: 'A rougher town with a strong hardcore pocket.' },
    { id: 'redlands', kind: 'FEEDER', name: 'Redlands', minutes: 25, bearing: 55, note: 'An older town of students and church kids.' },
    { id: 'fontana', kind: 'FEEDER', name: 'Fontana', minutes: 30, bearing: 340, note: 'Freeway and warehouse sprawl: bands, but few rooms.' },
    { id: 'perris', kind: 'FEEDER', name: 'Perris', minutes: 30, bearing: 135, note: 'A young farm-edge town far from everything.' },
    { id: 'pomona', kind: 'FEEDER', name: 'Pomona', minutes: 35, bearing: 295, beyond: 'the-91', note: 'Over the county line, with a few scrappy rooms.' },
    { id: 'palm-springs', kind: 'PEER', name: 'Palm Springs and the desert', minutes: 60, bearing: 85, scene: 600, note: 'A desert scene running on a handful of all-ages rooms, several now closed.' },
    { id: 'san-diego', kind: 'PEER', name: 'San Diego', minutes: 90, bearing: 195, slug: 'san-diego', note: 'A bigger scene with a hall and a house tradition.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Riverside', route: 'downtown', note: 'Bars, restaurants and a pedestrian mall, with a few small all-ages rooms and shops that host.' },
    { id: 'eastside', name: 'the Eastside', route: 'old-side', note: 'Old bungalows by the freeway and the old grove streets. Garages and backyards in a long-running Latino neighborhood.' },
    { id: 'wood-streets', name: 'the Wood Streets', route: 'old-side', note: 'Historic houses on tree-lined streets. Quiet, and the noise complaints come fast.' },
    { id: 'arlington', name: 'Arlington', route: 'old-side', note: 'An older commercial strip of storefronts, tattoo shops and record stores.' },
    { id: 'casa-blanca', name: 'Casa Blanca', route: 'work-side', note: 'A small old neighborhood by the railroad. Cheap houses and garages.' },
    { id: 'rubidoux-jurupa', name: 'Rubidoux and Jurupa Valley', route: 'work-side', note: 'Warehouses, trailer lots and tract homes across the river. Backyard shows.' },
    { id: 'la-sierra', name: 'La Sierra', route: 'campus', note: 'The southwest side: student rentals and suburban tracts.' },
    { id: 'canyon-crest', name: 'Canyon Crest', route: 'campus', note: 'A hillside suburb by the university. Students, rentals, quiet streets.' },
    { id: 'orangecrest', name: 'Orangecrest and Mission Grove', route: 'campus', note: 'Newer southern suburbs of cul-de-sacs and parents. Few rooms.' },
    { id: 'town-rubidoux', name: 'Rubidoux and Jurupa Valley', route: 'town:rubidoux', note: 'Tract homes and trailer lots across the river, past the city line. Backyards and halls, and the county noise code instead of the city one.' }
  ],

  rooms: [
    { id: 'eastside-garage', kind: 'HOUSE', hood: 'eastside', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A garage with the door up and a yard behind, in an old bungalow neighborhood. Ten dollars, all ages, and one neighbor\'s call ends it.' },
    { id: 'casa-blanca-yard', kind: 'HOUSE', hood: 'casa-blanca', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A backyard by the railroad with cheap rent and thin walls. August afternoons turn the garage into an oven.' },
    { id: 'collective', kind: 'DIY', hood: 'downtown', cap: 80, rent: 40, deposit: 0, pa: .5, ages: ['ALL'], curfew: 1350, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 55, note: 'A collective-run basement room with no alcohol, no ID checks and a five-dollar donation. Easy to miss, and only as safe as the building.' },
    { id: 'music-shop', kind: 'SHOP', hood: 'arlington', cap: 60, pa: .4, curfew: 1290, ac: true, sketch: 5, standing: [70, 70, 75], following: .15,
      note: 'A music store with rehearsal rooms and an open floor for local showcases. Out by dinner, and the neighbors in the strip are watching.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1530, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A neighborhood bar that books bands about twice a month. Rents are climbing and the owners keep leaning toward DJs.' },
    { id: 'lounge', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1530, ac: true, following: .25, sketch: 15, standing: [45, 65, 70],
      note: 'A small club that used to showcase local bands and now books them less. One of its neighbors already moved out to the suburbs.' },
    { id: 'auditorium-hall', kind: 'HALL', hood: 'downtown', cap: 250, rent: 300, deposit: 100, pa: .7, curfew: 1320, ac: true, sketch: 5, standing: [50, 60, 65],
      owner: 'HALL_MANAGER', pressure: 45, note: 'The lower room of the city auditorium, built for local bands. City-run, so the rules are strict and load-out is on the clock.' },
    { id: 'brewery-lot', kind: 'OUTDOOR', hood: 'downtown', cap: 200, rent: 25, pa: .4, ages: ['ALL'], curfew: 1260, sketch: 30, standing: [60, 55, 40],
      note: 'A free all-ages afternoon on a brewery\'s back lot. The heat and the permit are the opponents, and so is the smoke in fall.' },
    { id: 'main-auditorium', kind: 'BIG', hood: 'downtown', cap: 2000, rent: 2200, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 5,
      standing: [40, 65, 70], owner: 'TALENT_BUYER', notice: 112, note: 'The big city auditorium, run by a national promoter. The occasional hardcore tour lands here, far above your means.' }
  ],

  contacts: ['san-diego', 'los-angeles', 'oxnard-ca', 'bakersfield-ca'],

  calendar: [
    { id: 'lights-nov', label: 'the holiday lights switch-on', tag: 'festival', month: 11, weeks: [3, 5], dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'lights-dec', label: 'the holiday lights festival', tag: 'festival', month: 12, weeks: [1, 4], dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'air-show', label: 'the air show', tag: 'airshow', month: 4, week: 2, dows: [5, 6], can: [.92, .90, .90] },
    { id: 'spring-fest', label: 'the spring food and music festival', tag: 'festival', month: 4, week: 1, dows: [5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'memorial-weekend', label: 'the Memorial Day weekend festival and ride', tag: 'festival', month: 5, week: 4, dows: [5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91, pop: 346000 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 },
    { name: 'Palm Springs', state: 'CA', lat: 33.83, lon: -116.55, pop: 45000 }
  ],
  roads: ['the 91', 'the 60', 'the 215', 'the 15', 'the 10'],

  words: {
    street: ['Market Street', 'Magnolia Avenue', 'University Avenue', 'Van Buren Boulevard', 'La Sierra Avenue'],
    water: ['the Santa Ana River', 'the river bottom'],
    hood: ['Eastside', 'Arlington', 'Casa Blanca', 'La Sierra', 'Canyon Crest', 'Orangecrest', 'Rubidoux', 'Wood Streets'],
    thing: ['freeway', 'stucco', 'backyard', 'swamp cooler', 'taco truck', 'patio umbrella'],
    weather: ['triple digits', 'brush fire smoke']
  },

  events: [
    { id: 'RIVERSIDE_91_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The 91 is torn up at the Corona interchange this week.',
      title: 'The 91 is a parking lot',
      body: 'A wreck at the Corona interchange has the whole 91 backed up on the night of your show. The kids from Corona and Pomona are stuck, and so is the band, and the AC in their van is out.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the rush', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the interchange.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones out west stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the surface streets together. They will remember that.' }
      ] },

    { id: 'RIVERSIDE_LIGHTS_BLOCKED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [11, 12] },
      telegraph: 'The holiday lights come on downtown this weekend and the streets around the mall are closing.',
      title: 'The lights close the streets',
      body: 'Hundreds of thousands are coming downtown for the lights. Every street around your all-ages room is blocked, parking is gone, and the kids will not get near the door.',
      options: [
        { id: 'EAST', label: 'Move the bill to a hall across the river', likely: 'Away from the crowds. Not everyone finds it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A hall out past the river took the bill. A smaller night, and nobody circled for parking.' },
        { id: 'LATE', label: 'Push doors back until the streets open up', likely: 'The ones who waited are tired and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors an hour late. The crowd came in smelling like hot cider and exhaust.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list gives up on parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The door was easy because half the list was still circling the block.' }
      ] },

    { id: 'RIVERSIDE_GARAGE_OVEN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast says a hundred and five all week and the swamp coolers are running flat out.',
      title: 'The garage is an oven',
      body: 'It is a hundred and five with the door up and the encore still to come. A neighbor will call at ten past ten, and the band wants one more song.',
      options: [
        { id: 'LATE', label: 'Start after the sun goes down', likely: 'Cooler, but the ones with curfews are gone.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors at dusk. The ones who stayed were glad they did.' },
        { id: 'FANS', label: 'Borrow fans and a cooler of ice, play on', likely: 'Costs a little. Fewer people come inside.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Two box fans and forty pounds of ice. The room was damp and the driveway was full.' },
        { id: 'MOVE', label: 'Move it a day, when it might break', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. It was ninety-nine instead of a hundred and five.' }
      ] },

    { id: 'RIVERSIDE_SMOKE_DAY', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11] },
      telegraph: 'A brush fire is burning in the hills and the wind is blowing the smoke this way.',
      title: 'Smoke over the brewery lot',
      body: 'Ash is falling on the cars and the sky is orange. The permit is already paid for the outdoor show, and nobody wants to breathe this for three hours.',
      options: [
        { id: 'INSIDE', label: 'Move the bill indoors', likely: 'Smaller and sweatier, but breathable.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A hall took the bill with the doors shut and the air clean. Loud and tight.' },
        { id: 'ACCEPT', label: 'Run it outside anyway', likely: 'The tough ones come in masks.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The tough ones came in masks. The sets were short and the air tasted like a campfire.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The wind turned and the sky cleared.' }
      ] }
  ]
});
