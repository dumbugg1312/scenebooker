SB.Cities.register('modesto-ca', {
  v: 1,
  slug: 'modesto-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['modesto bee', 'american graffiti', 'graffiti night', 'modesto junior college', 'mjc', 'travis air force base', 'travis afb', 'amtrak',
           'university of the pacific', 'uc merced', 'university of california merced', 'csu stanislaus', 'stanislaus state', 'ace train', 'altamont commuter express',
           'elks', 'vfw', 'american legion', 'portuguese hall', 'almond blossom festival', 'modesto nuts', 'modesto a\'s', 'modesto music awards',
           'the almond hull', 'almond hull', 'tule fog room', '99 shoulder', 'dry creek annex', 'the arch lot', 'cannery row backroom', 'hall 209',
           'orchard row', 'valley oak shed', 'graffiti night garage', 'the fruit stand', 'oakland warehouse fire', 'ghost ship',
           'graffiti summer', 'graffiti parade', 'stanislaus county fair', 'stancofair', 'modesto porchfest', 'porchfest', 'visit modesto', 'modestoview',
           'central valley ska fest', 'ska fest', 'almond blossom', 'music in the plaza', 'brown bag summer concert', 'turlock journal', 'ceres courier', 'manteca bulletin'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['modesto bee*', 'american graffiti*', 'almond hull*', 'tule fog room*', 'hall 209*', 'mjc*', 'modesto junior*'],

  blurb: ['Garages, fraternal halls and farm sheds in a hot, flat Valley town where punk is a side door.',
          'Most of the crowd drives in from the small towns, and the older bands leave for Sacramento and the Bay.'],
  hard: 'Heat, a thin crowd, and the Bay and Sacramento pulling your kids away.',
  region: 'the Valley',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Modesto' },
    { id: 'ceres', kind: 'FEEDER', name: 'Ceres', minutes: 15, bearing: 160, pop: 49300, note: 'Working-class city that runs straight into Modesto. Kids come constantly.' },
    { id: 'hughson', kind: 'FEEDER', name: 'Hughson', minutes: 20, bearing: 140, pop: 7500, note: 'Farm and orchard town to the southeast.' },
    { id: 'riverbank', kind: 'FEEDER', name: 'Riverbank', minutes: 20, bearing: 40, pop: 24900, note: 'Small, industrial and working-class. No scene to speak of.' },
    { id: 'turlock', kind: 'FEEDER', name: 'Turlock', minutes: 25, bearing: 150, pop: 72700, note: 'A college town with its own small scene and rooms: the nearest real rival.' },
    { id: 'oakdale', kind: 'FEEDER', name: 'Oakdale', minutes: 25, bearing: 70, pop: 23200, note: 'Ranch and rodeo town: cowboys, metalheads and a few garage bands.' },
    { id: 'waterford', kind: 'FEEDER', name: 'Waterford', minutes: 30, bearing: 85, pop: 9100, note: 'A small farm town on the river.' },
    { id: 'patterson', kind: 'FEEDER', name: 'Patterson', minutes: 30, bearing: 235, pop: 23800, note: 'An orchard and Bay Area commuter town off I-5.' },
    { id: 'manteca', kind: 'FEEDER', name: 'Manteca and Ripon', minutes: 30, bearing: 340, note: 'Suburban sprawl and almond villages, a short hop from Stockton.' },
    { id: 'newman', kind: 'FEEDER', name: 'Newman', minutes: 40, bearing: 215, pop: 12400, note: 'A farm and commuter town to the southwest.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', state: 'CA', minutes: 30, bearing: 340, slug: 'stockton-ca', note: 'Bigger and grittier, with its own long-running scene. The two trade bands and crowds all the time.' },
    { id: 'merced', kind: 'PEER', name: 'Merced', state: 'CA', minutes: 45, bearing: 155, slug: 'merced-ca', note: 'A smaller farm and campus town down Highway 99.' },
    { id: 'visalia', kind: 'PEER', name: 'Visalia', state: 'CA', minutes: 105, bearing: 155, slug: 'visalia-ca', note: 'Similar size and the same Valley feel, farther down 99.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A grid of numbered and lettered streets under the arch: licensed bars, a restored theater and a monthly art walk. Cheap storefronts are being squeezed by redevelopment.' },
    { id: 'old-northwest', name: 'the old northwest', route: 'old-side', note: 'Prewar bungalows and big trees around the park. Backyard and living-room shows only, and the neighbors are alert.' },
    { id: 'college', name: 'the college area', route: 'campus', note: 'Rented bungalows around the junior college, full of commuter students and working-class renters.' },
    { id: 'north-end', name: 'the McHenry strip and the north end', route: 'campus', note: 'Big-box chains, tract homes and the mall. Suburban teens with cars and parents\' garages.' },
    { id: 'west-modesto', name: 'west of 99', route: 'work-side', note: 'Dense, working-class and heavily Latino, with body shops and warehouses. The one place a warehouse might rent for a show, and the fire-code risk that comes with it.' },
    { id: 'east-side', name: 'east along Yosemite Boulevard', route: 'work-side', note: 'Older commercial strip and ranch-house streets edging into farmland. Garages and a few halls.' },
    { id: 'south-side', name: 'south toward Ceres', route: 'old-side', note: 'Commuter sprawl along Crows Landing and Mitchell roads. Garages and strip-mall units.' },
    { id: 'salida', name: 'Salida', route: 'campus', note: 'Rural-suburban ranch properties along 99, far from police and neighbors. Barn and shed shows.' }
  ],

  rooms: [
    { id: 'ceres-garage', kind: 'HOUSE', hood: 'south-side', cap: 50, hostCut: 0, pa: .4, curfew: 1305, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A garage with the door up and the driveway for overflow. One neighbor\'s call ends it, and July afternoons are an oven.' },
    { id: 'college-house', kind: 'HOUSE', hood: 'college', cap: 40, hostCut: 0, pa: .4, curfew: 1305, ac: false, outdoor: true, sketch: 20, standing: [70, 55, 40],
      pressure: 55, note: 'A renter bungalow near the junior college: living room or backyard, commuter students, and a landlord who may not know.' },
    { id: 'northwest-porch', kind: 'HOUSE', hood: 'old-northwest', cap: 30, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: true, sketch: 25, standing: [65, 60, 45],
      pressure: 55, note: 'A prewar bungalow with a porch and a small yard. The neighbors tolerate bands in daylight and not much after.' },
    { id: 'salida-barn', kind: 'HOUSE', hood: 'salida', cap: 80, hostCut: 0, pa: .5, curfew: 1350, ac: false, outdoor: true, sketch: 30, standing: [60, 60, 45],
      pressure: 35, note: 'A shed on a ranch lot, far from anyone to complain. Also far from town, and heat or smoke cancels it.' },
    { id: 'west-bay', kind: 'DIY', hood: 'west-modesto', cap: 120, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A rented unit between the body shops. Loud and cheap, and one call to the fire marshal ends it.' },
    { id: 'yosemite-hall', kind: 'HALL', hood: 'east-side', cap: 200, rent: 150, deposit: 75, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented fraternal hall with a dry rule and a manager who watches the clock.' },
    { id: 'strip-shop', kind: 'SHOP', hood: 'north-end', cap: 60, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [65, 65, 70], following: .15,
      note: 'A shop floor on the strip cleared for a bill. Over by nine, and the lease is the threat.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1530, ac: true, following: .25, sketch: 20, standing: [50, 65, 70],
      note: 'A downtown bar with a small stage. Nights are 21-plus; an early all-ages slot is the most you will get.' },
    { id: 'taproom', kind: 'CLUB', hood: 'downtown', cap: 250, houseCosts: 150, split: .8, pa: .8, ages: ['ALL'], curfew: 1380, ac: true, following: .4, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 35, needs: ['FULL_BILL'], note: 'A taproom and coffee house that books all-ages bills from local promoters, one night at a time, with downtown rents rising.' },
    { id: 'plaza-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 150, rent: 20, pa: .4, curfew: 1260, sketch: 35, standing: [60, 55, 40],
      note: 'A plaza stage in daylight, with a permit and a noise rule. Done by nine, and the afternoon sun is the opponent.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 550, rent: 1500, deposit: 500, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 5,
      standing: [40, 65, 70], owner: 'TALENT_BUYER', notice: 70, note: 'A restored downtown theater for touring bills. Rented, not DIY, and far above a new booker\'s means.' }
  ],

  contacts: ['stockton-ca', 'merced-ca', 'visalia-ca', 'sacramento', 'vallejo-ca'],

  calendar: [
    { id: 'cruise-summer', label: 'cruise summer weekends', tag: 'parade', month: 6, weeks: [1, 4], dows: [4, 5], can: [.90, .85, .85], hoods: ['downtown', 'north-end'], elsewhere: [.97, .95, .95] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [2, 3], dows: [4, 5, 6], can: [.92, .88, .88], hoods: ['east-side', 'south-side'], elsewhere: [.97, .95, .95] },
    { id: 'porch-day', label: 'the porch music day', tag: 'festival', month: 5, weeks: [2, 3], dows: [5], can: [.92, .90, .90], hoods: ['old-northwest', 'college', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'spring-ska', label: 'the spring ska weekend', tag: 'festival', month: 4, week: 3, dows: [5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  points: [
    { name: 'Sacramento', state: 'CA', lat: 38.58, lon: -121.49, pop: 525000 },
    { name: 'Fresno', state: 'CA', lat: 36.74, lon: -119.79, pop: 545000 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Bakersfield', state: 'CA', lat: 35.37, lon: -119.02, pop: 405000 }
  ],
  roads: ['Highway 99', 'I-5', 'Highway 132', 'Highway 108', 'I-580'],

  words: {
    street: ['Yosemite Boulevard', 'McHenry Avenue', 'Briggsmore', 'Crows Landing Road', 'Oakdale Road', 'Highway 99'],
    water: ['the Tuolumne', 'Dry Creek', 'the Stanislaus'],
    hood: ['Graceada Park', 'Bret Harte', 'Airport District', 'Del Rio', 'La Loma', 'Salida', 'West Modesto', 'Empire', 'Riverdale Park'],
    thing: ['almond orchard', 'taco truck', 'garage', 'canopy and a generator', 'ditch', 'lowrider', 'horchata', 'skatepark', 'practice unit', 'taco truck lot', 'generator'],
    weather: ['tule fog', 'triple digits', 'smoke day']
  },

  events: [
    { id: 'MODESTO_CA_GARAGE_OVEN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast says triple digits all week.',
      title: 'The garage is an oven',
      body: 'It is a hundred and ten on the driveway at four in the afternoon. The band wants to play in shorts, and the crowd is staying out in the street.',
      options: [
        { id: 'LATE', label: 'Push the start back until the sun goes down', likely: 'Cooler, but the ones with curfews and rides are gone.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were at dusk, and the people who stayed were glad they did.' },
        { id: 'FANS', label: 'Borrow fans and a cooler of ice, play on', likely: 'It costs a little, and fewer people come inside.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'You set up two box fans and forty pounds of ice, and the room was damp and the driveway was full.' },
        { id: 'MOVE', label: 'Move it a day, when it might break', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and it was ninety-nine instead of a hundred and ten.' }
      ] },

    { id: 'MODESTO_CA_CRUISE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The classic cars are cruising downtown this weekend and the hotels are full.',
      title: 'The cruise closes the streets',
      body: 'Downtown is shut for the cruise and parking is gone for six blocks. Your all-ages show has no place for a van, and the kids cannot get near the door.',
      options: [
        { id: 'HALL', label: 'Move the bill to a hall on the east side', likely: 'It\'s away from the traffic, but not everyone finds it.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A hall off Yosemite took the bill, and it was a smaller night but nobody circled for parking.' },
        { id: 'LATE', label: 'Push doors back until the street thins out', likely: 'The cruise ends early, and the crowd who stayed is loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors went an hour late, and the ones who waited came in smelling like exhaust and funnel cake.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list gives up on parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The door was easy because half the list was still circling the block.' }
      ] },

    { id: 'MODESTO_CA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The county fair is on up the road in Turlock, and half the east side is working a booth.',
      title: 'Fair week takes the kids',
      body: 'Half your regulars have fair jobs in Turlock and the rest are riding the rides. A Friday show looks thin.',
      options: [
        { id: 'LATE', label: 'Start late so the fair crowd can get back', likely: 'A later night, a better crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at nine, and the fair kids showed up smelling like corn dogs and stayed.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'Thin, but the loyal ones come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'It was a thin Friday, and the people who came were the ones who always come.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the fair let out and a few more could come.' }
      ] },

    { id: 'MODESTO_CA_PORCH_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [4, 5] },
      telegraph: 'Bands are signing up to play porches and driveways all over the old northwest on Saturday.',
      title: 'Everybody has a porch',
      body: 'It is the one day the blocks let bands play, and your show is competing with forty porches. The neighbors who usually complain are sitting on their steps listening.',
      options: [
        { id: 'JOIN', label: 'Play a porch in the afternoon and skip the night', likely: 'A better crowd for a shorter set.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }],
          result: 'Your bill played a bungalow porch in daylight. The neighbors clapped, which has never happened before.' },
        { id: 'ACCEPT', label: 'Run the night show anyway', likely: 'The crowd is tired, with a few strays.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Everyone had been out since noon, so the night show was a nap with a drum kit.' }
      ] }
  ]
});
