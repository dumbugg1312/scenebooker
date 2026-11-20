SB.Cities.register('york-pa', {
  v: 1,
  slug: 'york-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['harley-davidson', 'harley davidson', 'harley', 'rabbit transit', 'york state fair', 'street rod nationals', 'street rod nationals east', 'olde york street fair',
           'york expo center', 'york revolution', 'central market', 'york college', 'york college of pennsylvania', 'penn state', 'penn state york', 'hacc', 'gettysburg college',
           'mcdaniel college', 'dickinson college', 'wilson college', 'hood college', 'elizabethtown college', 'army war college', 'fort indiantown gap', 'york daily record',
           'york dispatch', 'war of the roses', 'hurricane agnes', 'agnes', 'utz', 'snyder\'s of hanover', 'dillsburg farmers fair', 'pickle drop', 'indian rock dam',
           'lancaster first fridays', 'christmas eve whistle', 'factory whistle', 'vfw', 'american legion', 'amtrak', 'pennsylvania turnpike',
           'whistle room', 'codorus hall', 'arsenal annex', 'white rose lodge', 'pershing street garage', 'queen street basement', 'pretzel loft',
           'mount rose social club', 'rutter road hall', 'old cigar works', 'emigsville fire hall annex', 'george street dry goods'],
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
    { id: 'red-lion', kind: 'FEEDER', name: 'Red Lion', minutes: 15, bearing: 125, note: 'An old factory borough with a real kid scene of its own.' },
    { id: 'dallastown', kind: 'FEEDER', name: 'Dallastown', minutes: 15, bearing: 150, note: 'A sports-and-band suburb that shares a rivalry and a teenager pool with Red Lion.' },
    { id: 'spring-grove', kind: 'FEEDER', name: 'Spring Grove', minutes: 20, bearing: 215, note: 'A paper-mill town on the creek; mill families and farm kids.' },
    { id: 'wrightsville', kind: 'FEEDER', name: 'Wrightsville', minutes: 20, bearing: 100, note: 'A river town and the gate to Lancaster County; crossover shows start here.' },
    { id: 'dillsburg', kind: 'FEEDER', name: 'Dillsburg', minutes: 25, bearing: 330, note: 'A farm town where the lot is the hangout.' },
    { id: 'new-freedom', kind: 'FEEDER', name: 'New Freedom', minutes: 25, bearing: 175, note: 'A commuter town on the Maryland line; its real orbit is Baltimore.' },
    { id: 'hanover', kind: 'FEEDER', name: 'Hanover', minutes: 30, bearing: 235, note: 'A snack-food town with its own scene and its own rivalry with York.' },
    { id: 'stewartstown', kind: 'FEEDER', name: 'Stewartstown', minutes: 30, bearing: 165, note: 'A farm-and-railroad village near the state line.' },
    { id: 'gettysburg', kind: 'FEEDER', name: 'Gettysburg', minutes: 40, bearing: 265, note: 'A tourist and college town; its kids come to York as the next city.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown', minutes: 40, bearing: 55, note: 'A college borough across the river; students are a seasonal crowd.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 45, bearing: 95, slug: 'lancaster-pa', note: 'The old rival across the river: bigger, artier, with more rooms.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 45, bearing: 340, slug: 'harrisburg-pa', note: 'The capital up I-83 and the nearest bigger booking circuit.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 75, bearing: 70, slug: 'reading-pa', note: 'A bigger, poorer city to the northeast; shows trade now and then.' },
    { id: 'hagerstown', kind: 'PEER', name: 'Hagerstown', state: 'MD', minutes: 75, bearing: 255, note: 'A warehouse and rail town out west; the occasional band trades.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown York and the market district', route: 'downtown', note: 'Brick commercial blocks, galleries, a theater district and storefronts. The usual home of ticketed shows.' },
    { id: 'royal-square', name: 'Royal Square', route: 'downtown', note: 'Older storefronts and upstairs spaces, pitched as the next arts and food district.' },
    { id: 'weco', name: 'WECO, west of the creek', route: 'old-side', note: 'Dense rowhouse streets and corner stores. Basements, rowhouse rooms and backyards, cheap and mixed.' },
    { id: 'arch-street', name: 'Arch Street and the ballpark', route: 'work-side', note: 'Old industrial buildings near the ballpark. Game-night traffic and parking make it useless for shows.' },
    { id: 'fairmount', name: 'Fairmount and Springdale', route: 'old-side', note: 'Historic districts of big old brick houses and rowhouses, with damp basements and porches.' },
    { id: 'east-york', name: 'East York and Springettsbury', route: 'work-side', note: 'Suburban basements, strip-mall units and light-industrial practice space just outside the city.' },
    { id: 'college-edge', name: 'the college edge', route: 'campus', note: 'Student rentals along the city-township line south of downtown. House shows and campus nights.' },
    { id: 'west-york', name: 'West York and North York', route: 'old-side', note: 'Separate boroughs of basements, garages and church halls where many city kids really live and rehearse.' }
  ],

  contacts: ['lancaster-pa', 'harrisburg-pa', 'reading-pa'],

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
      ] }
  ]
});
