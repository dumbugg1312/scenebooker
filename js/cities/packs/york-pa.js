SB.Cities.register('york-pa', {
  v: 1,
  slug: 'york-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['harley-davidson', 'harley davidson', 'harley', 'rabbit transit', 'york state fair', 'street rod nationals', 'street rod nationals east', 'olde york street fair',
           'york expo center', 'york revolution', 'central market', 'york college', 'york college of pennsylvania', 'penn state', 'penn state york', 'hacc', 'gettysburg college',
           'mcdaniel college', 'dickinson college', 'wilson college', 'hood college', 'elizabethtown college', 'army war college', 'fort indiantown gap', 'york daily record',
           'york dispatch', 'war of the roses', 'hurricane agnes', 'agnes', 'utz', 'snyder\'s of hanover', 'dillsburg farmers fair', 'pickle drop', 'indian rock dam',
           'lancaster first fridays', 'christmas eve whistle', 'factory whistle', 'vfw', 'american legion', 'amtrak', 'pennsylvania turnpike',
           'whistle room', 'codorus hall', 'arsenal annex', 'white rose lodge', 'pershing street garage', 'queen street basement', 'pretzel loft',
           'mount rose social club', 'rutter road hall', 'old cigar works', 'emigsville fire hall annex', 'george street dry goods',
           'york fair', 'expo center', 'utz arena', 'nsra', 'continental square', 'wgal', 'abc27', 'fox43', 'yorkmix',
           'macaroni kid', 'make music york county', 'eventbrite', 'wyndham garden', 'gettysburg reenactment', 'hellfest', 'local21'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['york daily record*', 'york dispatch*', 'rabbit transit*', 'penn state*', 'york college*', 'utz*'],

  blurb: ['A small brick factory city ringed by richer townships, where county kids funnel in to fire halls and damp rowhouse basements. The noise clock runs out at nine.',
          'Baltimore is an hour down the interstate, and the good bands are always one move from leaving for it.'],
  hard: 'An early curfew and a noise law cut shows short, and the crowd drives off.',
  region: 'the Mid-Atlantic',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'York' },
    { id: 'red-lion', kind: 'FEEDER', name: 'Red Lion', minutes: 15, bearing: 125, scene: 100, note: 'An old factory borough with a real kid scene of its own.' },
    { id: 'dallastown', kind: 'FEEDER', name: 'Dallastown', minutes: 15, bearing: 150, note: 'A sports-and-band suburb that shares a rivalry and a teenager pool with Red Lion.' },
    { id: 'spring-grove', kind: 'FEEDER', name: 'Spring Grove', minutes: 20, bearing: 215, note: 'A paper-mill town on the creek; mill families and farm kids.' },
    { id: 'wrightsville', kind: 'FEEDER', name: 'Wrightsville', minutes: 20, bearing: 100, note: 'A river town and the gate to Lancaster County; crossover shows start here.' },
    { id: 'dillsburg', kind: 'FEEDER', name: 'Dillsburg', minutes: 25, bearing: 330, scene: 100, note: 'A farm town where the lot is the hangout.' },
    { id: 'new-freedom', kind: 'FEEDER', name: 'New Freedom', minutes: 25, bearing: 175, note: 'A commuter town on the Maryland line; its real orbit is Baltimore.' },
    { id: 'hanover', kind: 'FEEDER', name: 'Hanover', minutes: 30, bearing: 235, note: 'A snack-food town with its own scene and its own rivalry with York.' },
    { id: 'stewartstown', kind: 'FEEDER', name: 'Stewartstown', minutes: 30, bearing: 165, note: 'A farm-and-railroad village near the state line.' },
    { id: 'gettysburg', kind: 'FEEDER', name: 'Gettysburg', minutes: 40, bearing: 265, note: 'A tourist and college town; its kids come to York as the next city.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 40, bearing: 55, note: 'A college borough across the river; students are a seasonal crowd.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 45, bearing: 95, slug: 'lancaster-pa', note: 'The old rival across the river: bigger, artier, with more rooms.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 45, bearing: 340, slug: 'harrisburg-pa', note: 'The capital up I-83 and the nearest bigger booking circuit.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 75, bearing: 70, slug: 'reading-pa', note: 'A bigger, poorer city to the northeast; shows trade now and then.' },
    { id: 'hagerstown', kind: 'PEER', name: 'Hagerstown', slug: 'hagerstown-md', state: 'MD', minutes: 75, bearing: 255, note: 'A warehouse and rail town out west; the occasional band trades.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown York and the market district', route: 'downtown', note: 'Brick commercial blocks, galleries, a theater district and storefronts. The usual home of ticketed shows.' },
    { id: 'royal-square', name: 'Royal Square', route: 'downtown', note: 'Older storefronts and upstairs spaces, pitched as the next arts and food district.' },
    { id: 'weco', name: 'WECO, west of the creek', route: 'old-side', note: 'Dense rowhouse streets and corner stores. Basements, rowhouse rooms and backyards, cheap and mixed.' },
    { id: 'arch-street', name: 'Arch Street and the ballpark', route: 'work-side', note: 'Old industrial buildings near the ballpark. Game-night traffic and parking make it useless for shows.' },
    { id: 'fairmount', name: 'Fairmount and Springdale', route: 'old-side', note: 'Historic districts of big old brick houses and rowhouses, with damp basements and porches.' },
    { id: 'east-york', name: 'East York and Springettsbury', route: 'work-side', note: 'Suburban basements, strip-mall units and light-industrial practice space just outside the city.' },
    { id: 'college-edge', name: 'the college edge', route: 'campus', note: 'Student rentals along the city-township line south of downtown. House shows and campus nights.' },
    { id: 'west-york', name: 'West York and North York', route: 'old-side', note: 'Separate boroughs of basements, garages and church halls where many city kids really live and rehearse.' },
    { id: 'red-lion-hood', name: 'Red Lion', route: 'town:red-lion', note: 'An old factory borough with its own kid crowd, and a borough hall that wants no profanity.' },
    { id: 'dillsburg-hood', name: 'Dillsburg', route: 'town:dillsburg', note: 'The rural half of the county, where a barn or a carport is the room and nobody hears it.' }
  ],

  rooms: [
    { id: 'weco-basement', kind: 'HOUSE', hood: 'weco', cap: 40, curfew: 1260, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rowhouse basement with shared walls and a damp floor. Cheap, and one neighbor ends it.' },
    { id: 'west-york-basement', kind: 'HOUSE', hood: 'west-york', cap: 60, curfew: 1350, ac: false, outdoor: false,
      note: 'A big detached basement in the boroughs, farther from the neighbors. Parents and landlords are the threat.' },
    { id: 'fairmount-porch', kind: 'HOUSE', hood: 'fairmount', cap: 50, curfew: 1290, ac: false, outdoor: false, pressure: 55,
      note: 'A damp basement and a porch in a historic block where the neighbors watch.' },
    { id: 'market-garage', kind: 'DIY', hood: 'downtown', cap: 150, curfew: 1350, ac: false, pressure: 65,
      note: 'A storefront-and-garage room on the Market Street corridor. Rooms here last a year or two, then a sale or a bad month ends them.' },
    { id: 'west-market-club', kind: 'BAR', hood: 'west-york', cap: 250, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A loud bar club that books touring metal and punk and turns the kids away.' },
    { id: 'matinee-room', kind: 'CLUB', hood: 'downtown', cap: 200, ages: ['ALL', 'A21'], matinee: true, curfew: 1380, ac: true,
      note: 'A small ticketed room with early matinees that suit the curfew. The lease and the bar license are the risk.' },
    { id: 'fire-hall', kind: 'HALL', hood: 'east-york', cap: 200, curfew: 1320, ac: true,
      note: 'A volunteer fire company banquet room, rented around the wedding and bingo nights.' },
    { id: 'red-lion-hall', kind: 'HALL', hood: 'red-lion-hood', cap: 150, curfew: 1320, ac: true,
      note: 'A borough hall with its own kid crowd. No profanity, no beer-flavored bands.' },
    { id: 'hallam-bar', kind: 'BAR', hood: 'west-york', cap: 150, ages: ['A18', 'A21'], curfew: 1500, ac: true,
      note: 'A county bar with a back-room stage that gave local bands a Saturday. It ended when the owner retired.' },
    { id: 'square-shop', kind: 'SHOP', hood: 'royal-square', cap: 40, curfew: 1200, ac: true,
      note: 'An in-store set in a record or comic shop. A few a year, early, so the staff can close.' },
    { id: 'county-barn', kind: 'OUTDOOR', hood: 'dillsburg-hood', cap: 100, curfew: 1320, ac: false,
      note: 'A barn, a field or a carport out in the farm half of the county. Nobody hears it, and the drive is the cost.' },
    { id: 'big-theater', kind: 'BIG', hood: 'downtown', cap: 1500, curfew: 1380, ac: true,
      note: 'A big downtown performing-arts theater that books national acts. The ticketed tier a booker here aspires to.' }
  ],

  contacts: ['lancaster-pa', 'harrisburg-pa', 'reading-pa', 'hagerstown-md', 'baltimore'],

  calendar: [
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 7, weeks: [4, 5], dows: [2, 3, 4, 5, 6], can: [.85, .88, .90], hoods: ['west-york', 'weco'], elsewhere: [.95, .95, .95] },
    { id: 'rod-weekend', label: 'street rod weekend', tag: 'race', month: 6, week: 1, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['downtown', 'royal-square'], elsewhere: [1, 1, .97] },
    { id: 'street-fair', label: 'the downtown street fair', tag: 'fair', month: 5, week: 2, dows: [6], can: [.85, .85, .85], hoods: ['downtown', 'royal-square'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Hagerstown', state: 'MD', lat: 39.64, lon: -77.72, pop: 43000 },
    { name: 'Frederick', state: 'MD', lat: 39.41, lon: -77.41, pop: 78000 },
    { name: 'Westminster', state: 'MD', lat: 39.58, lon: -76.99, pop: 20000 },
    { name: 'Lebanon', state: 'PA', lat: 40.34, lon: -76.41, pop: 27000 }
  ],
  roads: ['I-83', 'US 30', 'US 15', 'PA 74', 'PA 462', 'I-81'],

  words: {
    street: ['Market Street', 'George Street', 'Philadelphia Street', 'Queen Street', 'Mount Rose Avenue', 'Arsenal Road', 'Carlisle Avenue'],
    water: ['Codorus Creek', 'the Susquehanna', 'Tyler Run'],
    hood: ['WECO', 'Royal Square', 'Arch Street', 'Fairmount', 'Springdale', 'Emigsville', 'West York', 'North York', 'Springettsbury'],
    thing: ['rowhouse', 'fire hall', 'white rose', 'snack factory', 'deer season', 'creek flood', 'hot rod', 'bingo night', 'curfew', 'noise clock'],
    weather: ['creek flood', 'ice storm']
  },

  events: [
    { id: 'YORK_PA_NINE_O_CLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A neighbor on the next block has been asking who is playing this week.',
      title: 'Audible across the property line',
      body: 'The city noise rule says anything plainly audible past a property line after nine is a violation. In a rowhouse, that is the whole show. The under-18 crowd also has a curfew, and the headliner is on late.',
      options: [
        { id: 'EARLY', label: 'Start early and be done by nine', likely: 'Thin early crowd, nobody gets a ticket.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors came up an hour. The kids with a ride made it before the set times.' },
        { id: 'ACCEPT', label: 'Play it as planned and keep the volume down', likely: 'A quieter night than anyone wanted.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The drummer played with brushes in the last set. People did not love it.' },
        { id: 'HALL', label: 'Take it to a hall with a nonprofit host', likely: 'Costs a favor and a donation.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'The hall was fine with the noise, and the neighbors never knew. The hall will want a thank-you.' }
      ] },

    { id: 'YORK_PA_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair opens this week, and the west side is already jammed.',
      title: 'The grandstand takes the west side',
      body: 'The midway and the grandstand concert fill the west side for ten days. A metal bill in a West York hall will play to the bartender and the kids who could not afford the fair.',
      options: [
        { id: 'EAST', label: 'Move the show across town', likely: 'Away from the fair traffic. Fewer of the usual crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The east side was quiet and easy to find. The ones who came got in without a lot.' },
        { id: 'LATE', label: 'Push doors back until the grandstand lets out', likely: 'Later. The fair crowd drifts in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. Half the fair came in smelling of fried dough.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The fair has the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The room was thin. The kids who could not afford the fair made up for it.' }
      ] },

    { id: 'YORK_PA_TEN_THIRTY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The headliner is on late, and the under-18 curfew is posted at the door.',
      title: 'The ten-thirty announcement',
      body: 'The headliner is on at 10:25 on a Friday, and the owner is about to announce the curfew that sends the under-18s home. Half the room is under 18.',
      options: [
        { id: 'SHORT', label: 'Play short and finish before the announcement', likely: 'Everyone hears the whole set. A short one.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The set was twenty minutes of nothing but the loud parts. Everyone stayed.' },
        { id: 'WALK', label: 'Let the under-18s walk', likely: 'Half the room leaves. The ones who stay are loud.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The kids filed out at 10:30 with their hands stamped. The back half of the set was for the grown-ups.' },
        { id: 'MATINEE', label: 'Move the next one to an afternoon', likely: 'Costs you a night. Keeps the kids.',
          effects: [{ op: 'REGULARS', pct: .02 }, { op: 'HOURS', d: -1, when: 'TODAY' }],
          result: 'You promised an afternoon next time. The kids heard it and cheered.' }
      ] },

    { id: 'YORK_PA_ROD_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'Every hotel downtown is booked by old-car owners, and the engines have not stopped.',
      title: 'Every room is taken',
      body: 'The old-car crowd has the hotels and the downtown blocks. The touring band sleeps on a floor in a Fairmount rowhouse, and the engine noise outlasts the noise law.',
      options: [
        { id: 'FLOOR', label: 'Put them up on a rowhouse floor', likely: 'Costs a favor. A good story.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'REGULARS', pct: .02 }],
          result: 'They slept on the floor and played like it was a hotel. The neighbors heard nothing over the engines.' },
        { id: 'ACCEPT', label: 'Run it and let them find a room', likely: 'The band is tired.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'They found a couch an hour from town and got to the load-in with no sleep.' },
        { id: 'SHIFT', label: 'Start early and send them home before dark', likely: 'A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done by nine. The band drove home with the hot-rod crowd still circling.' }
      ] }
  ]
});
