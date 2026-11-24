SB.Cities.register('chattanooga-tn', {
  v: 1,
  slug: 'chattanooga-tn',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['volkswagen', 'bluecross blueshield', 'bluecross', 'unum', 'chattanooga bakery', 'moon pie', 'moon pies', 'mckee foods', 'lee university',
           'university of tennessee', 'university of tennessee at chattanooga', 'utc', 'chattanooga state', 'southern adventist university',
           'covenant college', 'bryan college', 'tennessee wesleyan', 'berry college', 'bonnaroo', 'ironman', 'ironman chattanooga',
           'head of the hooch', 'krystal', 'waffle house', 'rc cola', 'times free press', 'chattanooga times free press', 'nooga.com', 'vfw',
           'american legion', 'arnold air force base', 'gig city', 'epb', 'scopes trial', 'wauhatchie grange', 'the tunnel room',
           'orchard knob social club', 'cowart street laundry', 'glass mill annex', 'moccasin hall', 'lupton ironworks loft', 'citico rec center',
           'post 214 legion hall', 'tiftonia pavilion', 'walden basement', 'riverbend festival', 'ironman 70.3', 'ironman 703', 'erlanger chattanooga marathon', 'erlanger', 'jfest', 'bacon and barrel', 'make music day', 'nightfall music series', 'miller plaza', 'coolidge park', 'tennessee riverpark', 'first horizon pavilion', 'ibma', 'world of bluegrass', 'world food truck festival', 'reflection riding', 'wutc', 'do ya hear we', 'noogatoday', '6am city', 'chattanoogan', 'chattanooga pulse', 'chattanooga public library', 'wdef', 'newschannel 9', 'visit chattanooga', 'mocs', 'southern conference'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the spring storms'. */
  blocklist: ['bonnaroo*', 'riverbend*', 'moon pie*', 'waffle house*', 'times free press*', 'volkswagen*'],

  blurb: ['Chattanooga remembers its punk past and is proud of it. The pits are friendly, the bills are mixed, and the rooms are few.',
          'Rich kids and working-class kids go to the same shows, and metalcore kids pack the big all-ages hall.'],
  hard: 'Few all-ages rooms, and the bar nights are 21+.',
  region: 'the Southeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .05, reason: 'All-ages metalcore bills fill the big halls.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Chattanooga' },
    { id: 'rossville', kind: 'FEEDER', name: 'Rossville, Fort Oglethorpe and Ringgold', state: 'GA', minutes: 20, bearing: 165, note: 'The Georgia side of the line: cheap rent, a different county, and kids who are effectively city kids.', bands: 3 },
    { id: 'cleveland', kind: 'FEEDER', name: 'Cleveland', minutes: 35, bearing: 75, note: 'A church-heavy small city up I-75 with a few metal and hardcore kids.', bands: 1 },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper and South Pittsburg', minutes: 35, bearing: 270, note: 'River and mill towns west on I-24; small-town halls and garages. An hour behind on the clock.' },
    { id: 'dalton', kind: 'FEEDER', name: 'Dalton', state: 'GA', minutes: 40, bearing: 150, note: 'A carpet-mill town south on I-75 with some DIY of its own.', bands: 1 },
    { id: 'dayton', kind: 'FEEDER', name: 'Dayton', minutes: 40, bearing: 30, note: 'A small county seat north on US 27; it sends a few kids.' },
    { id: 'sequatchie', kind: 'FEEDER', name: 'Dunlap and Pikeville', minutes: 45, bearing: 340, note: 'Hardscrabble farm towns up the Sequatchie Valley.' },
    { id: 'monteagle', kind: 'FEEDER', name: 'Monteagle and Sewanee', minutes: 50, bearing: 285, note: 'Plateau towns up the mountain on I-24; Sewanee is a small college town with its own music.', bands: 1 },
    { id: 'athens', kind: 'FEEDER', name: 'Athens', minutes: 50, bearing: 55, note: 'A small college and farm town northeast on I-75.' },
    { id: 'manchester', kind: 'FEEDER', name: 'Tullahoma and Manchester', minutes: 65, bearing: 290, note: 'Two plateau towns on I-24 with a few bands each.', bands: 2 },
    { id: 'rome', kind: 'FEEDER', name: 'Rome', state: 'GA', minutes: 70, bearing: 190, note: 'A two-college town south on US 27 with more music than most of the list.', bands: 2 },
    { id: 'fort-payne', kind: 'FEEDER', name: 'Fort Payne', state: 'AL', minutes: 75, bearing: 225, note: 'A hosiery-mill town on top of the mountain, down I-59.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', slug: 'knoxville-tn', minutes: 105, bearing: 50, scene: 3000, note: 'The bigger university sibling up I-75; the two trade bands.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', state: 'AL', minutes: 105, bearing: 255, slug: 'huntsville-al', note: 'A rocket-and-defense city of similar size, a separate tour stop.' },
    { id: 'murfreesboro', kind: 'PEER', name: 'Murfreesboro', minutes: 110, bearing: 290, scene: 2000, note: 'A big state-university town with a busy house-show culture.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 175, bearing: 75, slug: 'asheville-nc', note: 'The art-and-tourist mountain city that people go to for shows.' }
  ],

  hoods: [
    { id: 'southside', name: 'the Southside', route: 'downtown', note: 'Old warehouses and rail buildings now breweries, galleries and apartments: once the cheap arts end, now the most heated-up part of town.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Tourist riverfront on one side, old commercial blocks and the university on the other; bars with stages and tourist-priced rent.' },
    { id: 'north-shore', name: 'the North Shore', route: 'old-side', note: 'A walkable strip of shops and bars across the bridges, with small wood-frame houses behind: porch and backyard shows, priced out.' },
    { id: 'st-elmo', name: 'St. Elmo', route: 'old-side', note: 'A shabby-arty old-street neighborhood at the foot of the mountain; hillside houses with uneven basements, heating up fast.' },
    { id: 'highland-park', name: 'Highland Park and Fort Wood', route: 'old-side', note: 'Big old houses divided into apartments, with porches and basements: the likeliest place for a house-show culture.' },
    { id: 'brainerd', name: 'East Chattanooga and Brainerd', route: 'work-side', note: 'Strip malls, car lots and ranch houses over the ridge: garages, carports and old shopping-center units, where a lot of teenagers live.' },
    { id: 'alton-park', name: 'Alton Park and the south-side belt', route: 'work-side', note: 'A historically Black working-class community beside foundries and rail yards, under pressure from the Southside next door. Not a backdrop.' },
    { id: 'red-bank', name: 'Red Bank and Hixson', route: 'campus', note: 'Postwar suburbs north of the river: ranch-house garages and basements, church halls, and the teenagers who start the bands.' },
    { id: 'rossville-side', name: 'the Georgia side', route: 'work-side', note: 'The strip across the state line, with cheap rent and different police.' }
  ],

  rooms: [
    { id: 'highland-house', kind: 'HOUSE', hood: 'highland-park', cap: 60, curfew: 1320, ac: false, outdoor: false, start: true, note: "A big divided house with a basement, run by a few people who book mixed bills for locals. One neighbor's call or one burnout ends it." },
    { id: 'elmo-basement', kind: 'HOUSE', hood: 'st-elmo', cap: 40, curfew: 1320, ac: false, outdoor: false, note: 'A hillside basement with a long history of shows. The floor is uneven and the rent next door keeps climbing.' },
    { id: 'hixson-garage', kind: 'HOUSE', hood: 'red-bank', cap: 50, curfew: 1320, ac: false, outdoor: false, note: 'A ranch-house garage where the teenage bands start. The parents and the neighbors are the threat.' },
    { id: 'church-hall', kind: 'HALL', hood: 'north-shore', cap: 150, curfew: 1350, ac: true, note: "A church room that has hosted punk and metal on weekends. It is a church on Sunday, so the pastor's patience is the rent." },
    { id: 'record-shop', kind: 'SHOP', hood: 'downtown', cap: 100, curfew: 1260, ac: true, note: 'The record store. Early, low-key bills between the shelves for about ten dollars, and the floor is the limit.' },
    { id: 'punk-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true, note: 'A longtime punk bar on the main strip, with a stage. Half the yearly DIY weekend is here, so the kids wait outside.' },
    { id: 'mid-hall', kind: 'CLUB', hood: 'downtown', cap: 250, ages: ['A18'], curfew: 1380, ac: true, note: 'A mid-size hall for punk and touring bills. Eighteen and up, and nobody under eighteen without an adult.' },
    { id: 'coffee-hall', kind: 'CLUB', hood: 'north-shore', cap: 200, ages: ['ALL'], curfew: 1380, ac: true, note: 'A coffee shop with a stage and a hall. All ages, and it said once it might close over money.' },
    { id: 'lot-room', kind: 'DIY', hood: 'southside', cap: 150, curfew: 1350, ac: false, needs: ['VOUCH'], note: 'A small indoor-and-outdoor lot in the old warehouse blocks. The breweries and the apartments are crowding it.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 1200, curfew: 1410, ac: true, note: 'The big all-ages concert hall that touring metalcore packs fill. It changed hands lately, and a local bill is a long way from it.' },
    { id: 'skate-lot', kind: 'OUTDOOR', hood: 'brainerd', cap: 100, curfew: 1140, note: 'A skatepark or a shopping-center lot for a daytime show. The sun and a shop owner end it.' }
  ],

  contacts: ['knoxville-tn', 'huntsville-al', 'asheville-nc', 'nashville', 'atlanta'],

  calendar: [
    { id: 'triathlon', label: 'the triathlon', tag: 'race', month: 9, week: 4, dows: [6], can: [.85, .85, .88], hoods: ['downtown', 'red-bank', 'north-shore'], elsewhere: [1, .97, .97] },
    { id: 'half-triathlon', label: 'the half triathlon', tag: 'race', month: 5, week: 3, dows: [6], can: [.90, .90, .92], hoods: ['downtown', 'red-bank', 'north-shore'], elsewhere: [1, 1, 1] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 3, week: 3, dows: [5, 6], can: [.92, .90, .90], hoods: ['downtown', 'north-shore'], elsewhere: [1, 1, 1] },
    { id: 'friday-concerts', label: 'the free Friday concerts', tag: 'festival', month: 6, week: 2, dows: [4], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'diy-fest', label: 'the DIY punk fest', tag: 'festival', month: 6, week: 2, dows: [4, 5], can: [1.05, 1.10, 1.05], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1440, inForce: false } },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2000000 },
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 880000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1100000 }
  ],
  roads: ['I-24', 'I-75', 'I-59', 'US 27', 'Highway 153'],

  words: {
    street: ['Market Street', 'Main Street', 'Frazier Avenue', 'Brainerd Road', 'Rossville Boulevard', 'Lee Highway', 'Highway 153'],
    water: ['the Tennessee River', 'the river', 'Chattanooga Creek'],
    hood: ['the Southside', 'the North Shore', 'St. Elmo', 'Highland Park', 'Fort Wood', 'Glenwood', 'Alton Park', 'Red Bank', 'Hixson', 'East Ridge', 'Brainerd', 'Missionary Ridge', 'Lookout Mountain'],
    thing: ['carport', 'tall boy', 'sweet tea', 'meat and three', 'kudzu', 'foundry', 'incline', 'ridge road', 'church show', 'poster archive', 'pit', 'all-ages hall'],
    weather: ['afternoon thunderstorm', 'tornado watch', 'mountain fog', 'ice']
  },

  events: [
    { id: 'CHATTANOOGA_TN_TRIATHLON_ROADS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The triathlon shuts the riverfront and US 27 from five in the morning.',
      title: 'The roads are shut',
      body: 'Race day closes every road to the riverfront and US 27 from dawn, and the bands, the van and the crowd are all on the wrong side of the river.',
      options: [
        { id: 'HALL', label: 'Move the bill to a church hall on the right side', likely: 'It\'s smaller and quieter, and the pastor will want it out by ten.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'A church hall took the bill, and everyone who could get there came.' },
        { id: 'EARLY', label: 'Open early and tell everyone the back way', likely: 'Most get in before the closures bite.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'You opened doors an hour early, and the people who came used the back roads.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Many of them give up on the roads.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The closures held all day, and half the list never got across.' }
      ] },

    { id: 'CHATTANOOGA_TN_FRIDAY_TOWING', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'festival' },
      telegraph: 'The free concerts downtown fill every lot by six on Friday.',
      title: 'The lots are full',
      body: 'The free concerts downtown have taken every parking lot just as the bar night starts, and the tow trucks are working the side streets.',
      options: [
        { id: 'PARK', label: 'Tell everyone to park on the ridge and walk', likely: 'You lose some of the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
          result: 'Most of them walked down from the ridge, but a few lost cars to the tow trucks anyway.' },
        { id: 'ACCEPT', label: 'Run it and take what you get', likely: 'The casual crowd stays home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The lots stayed full, and the regulars found a way.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'CHATTANOOGA_TN_DIY_FEST_SPLIT', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], months: [6] },
      telegraph: 'The DIY weekend splits across a bar night and an all-ages night.',
      title: 'The bar night shuts the kids out',
      body: 'One of your bands is on the bar night, but its youngest member is under 21, and the kids on your list can only get into the all-ages night.',
      options: [
        { id: 'DOOR', label: 'Ask the bar to let the youngest member in', likely: 'It costs a favor, and the band plays.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: 1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The bar let the kid in for the set and then out again, and the band played well.' },
        { id: 'SWAP', label: 'Swap the band to the all-ages night', likely: 'The bar night thins out.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The band played the all-ages night, and the kids packed the floor.' }
      ] }
  ]
});
