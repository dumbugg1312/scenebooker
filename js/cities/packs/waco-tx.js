SB.Cities.register('waco-tx', {
  v: 1,
  slug: 'waco-tx',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['silobration', 'heart o\' texas fair', 'heart of texas fair and rodeo', 'cultural arts of waco', 'waco cultural arts fest', 'festival on the brazos',
           'waco cotton palace pageant', 'destination waco', 'waco insider', 'great waco duck race', 'brazos nights', 'wacotrib', 'tourtexas',
           'texas appleseed', 'hb 1819', 'dia de los muertos parade', 'baylor', 'baylor university', 'baylor bubble', 'baylor lariat', 'magnolia market', 'magnolia silos', 'fixer upper', 'dr pepper', 'whataburger',
           'h-e-b', 'tstc', 'texas state technical college', 'mclennan community college', 'university of mary hardin-baylor', 'umhb', 'tarleton',
           'tarleton state', 'hill college', 'fort hood', 'fort cavazos', 'texas eagle', 'amtrak', 'waco tribune-herald', 'tribune-herald', 'waco citizen',
           'kwbu', 'kcen', 'kwtx', 'waco transit', 'cotton palace', 'brazos river festival', 'ironman', 'diadeloso', 'heart of texas fair',
           'buc-ee\'s', 'bucees', 'health camp', 'gut pak', 'lone star beer', 'shiner', 'topo chico', 'sxsw', 'south by southwest', 'austin city limits',
           'state fair of texas', 'vfw', 'american legion', 'elks', 'knights of columbus', 'moose lodge', 'sokol', 'aggies', 'texas a&m', 'sic \'em',
           'american eagle', 'tabc', 'branch davidian', 'waco regional airport', 'hotel 1928', 'alico',
           'the hogsback room', 'hogsback room', 'brazos bottoms annex', 'lake air lanes', 'the spur barn', 'sokol hall no. 2', 'waterworks warehouse',
           'the suspension door', 'valley mills skate and spin', 'the mammoth room', 'cedar ridge carport', 'elm avenue body shop'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['baylor*', 'magnolia market*', 'whataburger*', 'waco tribune*', 'hogsback*', 'sokol*', 'health camp*', 'buc-ee*'],

  blurb: ['A Brazos River city halfway between Austin and Dallas on the interstate, a churchgoing city where punk is a side door and Austin and Dallas pull the best bands away.',
          'Shows are in open garages with a box fan going, lodge halls and church rooms, and the kids are mostly emo, pop-punk and metal.'],
  hard: 'Few rooms, a churchgoing town, and the big cities pull everyone away.',
  region: 'Central Texas',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Waco' },
    { id: 'mcgregor', kind: 'FEEDER', name: 'McGregor', minutes: 25, bearing: 255, note: 'A small town west on US 84.' },
    { id: 'hillsboro', kind: 'FEEDER', name: 'Hillsboro', minutes: 35, bearing: 5, pop: 8221, note: 'A small town up I-35 with a junior college.' },
    { id: 'marlin', kind: 'FEEDER', name: 'Marlin', minutes: 35, bearing: 135, pop: 5462, note: 'A prison and hot-springs town southeast on TX 6.' },
    { id: 'temple', kind: 'FEEDER', name: 'Temple', minutes: 35, bearing: 180, pop: 82073, note: 'A railroad and hospital town down I-35 with distribution centers.' },
    { id: 'belton', kind: 'FEEDER', name: 'Belton', minutes: 40, bearing: 183, pop: 23054, note: 'A small Baptist college town on the interstate.' },
    { id: 'mexia', kind: 'FEEDER', name: 'Mexia', minutes: 45, bearing: 110, pop: 6893, note: 'A small oil-boom town east on US 84.' },
    { id: 'gatesville', kind: 'FEEDER', name: 'Gatesville', minutes: 45, bearing: 262, pop: 16135, note: 'A prison town to the west near the base.' },
    { id: 'meridian', kind: 'FEEDER', name: 'Meridian', minutes: 50, bearing: 320, note: 'A small farm and ranch county seat to the northwest.' },
    { id: 'killeen', kind: 'PEER', name: 'Killeen', minutes: 60, bearing: 215, slug: 'killeen-tx', note: 'A military boom town with a young, churning crowd.' },
    { id: 'college-station', kind: 'PEER', name: 'College Station', minutes: 90, bearing: 150, slug: 'college-station-tx', note: 'A big college town; crowds travel both ways for a show.' },
    { id: 'tyler', kind: 'PEER', name: 'Tyler', minutes: 150, bearing: 65, slug: 'tyler-tx', note: 'An East Texas peer across the pines.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The west bank of the river by the old bridge, rebuilt for visitors and priced up. A few storefronts and lofts are the contested space.' },
    { id: 'campus', name: 'the university and the riverfront', route: 'campus', note: 'Student rentals and student bars by the interstate. Crowds come only when a friend drags them.' },
    { id: 'east-waco', name: 'East Waco', route: 'old-side', note: 'The historically Black east side across the river: older frame houses, church halls and small storefronts. Cheap, being noticed, and not a place to treat as a punk district.' },
    { id: 'north-waco', name: 'North Waco', route: 'old-side', note: 'Older bungalows and cheap rentals north of downtown. Garages, backyards and practice rooms in outbuildings.' },
    { id: 'south-waco', name: 'South Waco', route: 'work-side', note: 'A largely Hispanic south side of older houses, taquerias and small warehouses. Garages and church halls.' },
    { id: 'west-waco', name: 'West Waco and Woodway', route: 'campus', note: 'Suburban sprawl along US 84 and the loop. The place the suburban kids come from, with living rooms and strip-center units.' },
    { id: 'bellmead', name: 'Bellmead and Lake Air', route: 'work-side', note: 'A separate town to the north with cheap highway strip units and warehouse space, and police-jurisdiction headaches.' },
    { id: 'lake-shore', name: 'China Spring and the lake shore', route: 'work-side', note: 'Rural acreage west and northwest. Field parties and generator shows nobody hears.' }
  ],

  rooms: [
    { id: 'west-living-room', kind: 'HOUSE', hood: 'west-waco', cap: 40, curfew: 1320, ac: true, outdoor: false, sketch: 20, standing: [65, 60, 50], pressure: 50, start: true,
      note: 'A living room or a backyard with a box fan going. Everyone heard no for years before this one said yes, and the neighbors still count the cars.' },
    { id: 'bellmead-garage', kind: 'HOUSE', hood: 'bellmead', cap: 60, curfew: 1350, ac: false, outdoor: true, sketch: 30, standing: [65, 60, 45], pressure: 45,
      note: 'An open garage with a box fan and a lot of kids. There are no basements in this clay, so the garage door is the stage curtain.' },
    { id: 'east-warehouse', kind: 'DIY', hood: 'east-waco', cap: 150, rent: 60, curfew: 1380, ac: false, sketch: 45, standing: [60, 65, 40], pressure: 55, needs: ['VOUCH'],
      note: 'A pair of cinderblock buildings behind chain-link, with a food truck out front before the music. The main hardcore room, and the block has a reputation it does not deserve.' },
    { id: 'skate-park', kind: 'OUTDOOR', hood: 'downtown', cap: 100, rent: 10, pa: .4, curfew: 1260, sketch: 35, standing: [55, 55, 45],
      note: 'A city skate park with a generator and a fight over the power. Done by nine, and nobody at the city office answers on a weekend.' },
    { id: 'rented-unit', kind: 'DIY', hood: 'south-waco', cap: 80, rent: 50, curfew: 1320, ac: false, sketch: 40, standing: [55, 60, 40], pressure: 55, needs: ['VOUCH'],
      note: 'A warehouse unit rented for one night: load in, play, and be gone before the landlord finds out.' },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 80, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'The record store used to hold ninety a show. Now the floor is stacked with vinyl and shows are rare.' },
    { id: 'dive-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 15, standing: [45, 65, 70],
      note: 'A dive bar with a small stage. Twenty-one and up, and half the bars in town book only country and church bands.' },
    { id: 'arts-club', kind: 'CLUB', hood: 'downtown', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['A18'], curfew: 1410, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'],
      note: 'The established small venue downtown. It books a punk night now and then between other things, and the rents around it keep climbing.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'north-waco', cap: 200, rent: 200, deposit: 75, pa: .6, curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented lodge or dance hall with an occupancy sign by the door and a manager who counts heads.' },
    { id: 'fair-arena', kind: 'BIG', hood: 'south-waco', cap: 1500, rent: 1800, deposit: 500, pa: .9, ages: ['A18'], curfew: 1380, ac: true, sketch: 10, standing: [40, 65, 70],
      owner: 'TALENT_BUYER', note: 'The fairgrounds arena on the south edge. Rodeo and carnival most of the year, and a touring metal or pop-punk package now and then.' }
  ],

  contacts: ['killeen-tx', 'college-station-tx', 'tyler-tx', 'austin', 'dallas'],

  calendar: [
    { id: 'homecoming', label: 'homecoming parade weekend', tag: 'parade', month: 11, week: 1, dows: [4, 5], can: [.85, .80, .90], hoods: ['downtown', 'campus'], elsewhere: [.97, .95, .95] },
    { id: 'fair', label: 'the fair and rodeo', tag: 'fair', month: 10, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.90, .88, .88] },
    { id: 'fall-fest', label: 'the downtown fall festival', tag: 'festival', month: 10, week: 4, dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['downtown', 'east-waco'], elsewhere: [.97, .95, .95] },
    { id: 'river-fest', label: 'the spring river festival', tag: 'festival', month: 4, week: 4, dows: [3, 4, 5, 6], can: [.92, .88, .88], hoods: ['campus', 'downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74, pop: 980000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80, pop: 1300000 },
    { name: 'Fort Worth', state: 'TX', lat: 32.75, lon: -97.33, pop: 960000 },
    { name: 'Denton', state: 'TX', lat: 33.21, lon: -97.13, pop: 150000 },
    { name: 'Round Rock', state: 'TX', lat: 30.51, lon: -97.68, pop: 125000 }
  ],
  roads: ['I-35', 'US 84', 'TX 6', 'Loop 340', 'I-14'],

  words: {
    street: ['Waco Drive', 'Woodway Drive', 'Elm Avenue', 'Valley Mills Drive', 'Austin Avenue', 'Franklin Avenue'],
    water: ['the Brazos', 'the Bosque', 'Lake Waco'],
    hood: ['North Waco', 'South Waco', 'East Waco', 'Sanger Heights', 'Castle Heights', 'Lake Air', 'Bellmead', 'Woodway', 'Hewitt', 'China Spring', 'Speegleville'],
    thing: ['carport', 'box fan', 'kolache', 'breakfast taco', 'pecan tree', 'live oak', 'fellowship hall', 'lodge hall', 'strip-mall unit', 'youth group', 'garage door', 'dry room'],
    weather: ['hail', 'tornado watch', 'ice storm']
  },

  events: [
    { id: 'WACO_TX_HOMECOMING_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade route is posted, and Austin Avenue closes at dawn on Saturday.',
      title: 'Homecoming closes the street',
      body: 'The parade shuts the downtown streets from before sunrise, and the lot behind your room is filling with alumni cars. The van can\'t get within four blocks.',
      options: [
        { id: 'EARLY', label: 'Load in Friday night, before the barricades', likely: 'It\'s tight, but the gear is inside.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The gear was in by dark and the street closed around you, and it was a short, loud night.' },
        { id: 'CART', label: 'Hand-carry the amps from a lot across the river', likely: 'It\'s slow, and everyone is tired.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You walked amps across a bridge in a crowd of alumni, and doors went late.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'The parade crowd isn\'t your crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The bars took the crowd, and the regulars made do.' }
      ] },

    { id: 'WACO_TX_SKATE_POWER', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The city hasn\'t confirmed the power for the skate park, and the office is closed until Monday.',
      title: 'The city shuts off the power',
      body: 'Halfway through the second set the city cut the outlets at the skate park. The office won\'t answer until Monday, and there\'s a crowd here and a generator in the truck.',
      options: [
        { id: 'GEN', label: 'Rent a generator and run the night', likely: 'It costs a little, and it\'s loud enough that the neighbors hear.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'A generator coughed on and the set went on, and the park rangers drove past twice.' },
        { id: 'ACOUSTIC', label: 'Go acoustic and keep it short', likely: 'It\'s a strange, small night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'REGULARS', pct: .02 }],
          result: 'Three bands played unplugged guitars and shouted, and people still talk about it.' },
        { id: 'GARAGE', label: 'Move the whole bill to a garage', likely: 'It\'s smaller and louder, and a garage has its own power.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the bill, and the floor was packed.' }
      ] },

    { id: 'WACO_TX_FAIR_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The carnival and the rodeo are in town, and every kid is at the fairgrounds until late.',
      title: 'The kids are at the rodeo',
      body: 'Your all-ages bill is the same night as the rodeo and the carnival, and the kids won\'t be done until eleven, but the room has to be quiet by ten.',
      options: [
        { id: 'LATE', label: 'Push doors back to catch them after the rodeo', likely: 'You get a good crowd and a short set list.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the kids came in smelling of funnel cake and the bands played the room loud and short.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the fair.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The regulars came, and everyone else rode the Ferris wheel.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
