SB.Cities.register('st-louis', {
  v: 1,
  slug: 'st-louis',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['saint louis university', 'slu', 'washington university', 'wash u', 'university of missouri-st. louis', 'umsl', 'southern illinois university edwardsville', 'siue',
           'riverfront times', 'st. louis post-dispatch', 'post-dispatch', 'stlmag', 'st. louis magazine', 'st. louis public radio', 'kdhx', 'kwmu', 'st. louis cardinals',
           'st. louis blues', 'anheuser-busch', 'budweiser', 'boeing', 'bjc healthcare', 'centene', 'scott air force base', 'scott afb', 'gateway arch', 'the arch',
           'fair saint louis', 'st. louis zoo', 'citygarden', 'busch stadium', 'enterprise center', 'fox theatre', 'poplar street bridge', 'eads bridge', 'delmar loop',
           'soulard mardi gras', 'dogtown st. patrick\'s day parade', 'ancient order of hibernians', 'ballpark village', 'stltoday', 'do314', 'explore st. louis',
           'ksdk', 'krps', 'the muny', 'taste of soulard', 'st. louis african arts festival', 'st. louis underground music festival', 'slmpd',
           'stlpr', 'st. louis metropolitan police', 'lafayette square antique fair'],
  blocklist: ['riverfront times*', 'post-dispatch*', 'budweiser*', 'anheuser*', 'kdhx*', 'gateway arch*', 'busch stadium*'],

  blurb: ['Brick two-family basements and old halls in South City hold a hardcore-leaning underground that books itself and makes its own posters.',
          'The venue that matters is usually closing or being rescued, the river splits the crowd between two states, and the summers are thick and wet.'],
  hard: 'Rooms close, and the river splits the crowd between two states.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A hardcore revival with an umbrella group that books shows several times a month.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'St. Louis' },
    { id: 'kirkwood', kind: 'FEEDER', name: 'Kirkwood and Webster Groves', minutes: 20, bearing: 245, note: 'Inner suburbs to the west.' },
    { id: 'belleville', kind: 'FEEDER', name: 'Belleville', state: 'IL', minutes: 25, bearing: 130, beyond: 'river-bridges', scene: 60,
      rooms: [
      { id: 'illinois-hall', kind: 'HALL', hood: 'belleville-side', zone: 'belleville', cap: 300, rent: 250, deposit: 100, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 65],
          owner: 'HALL_MANAGER', note: 'An all-ages hall across the river in Sauget. The hall circuit lives on the Illinois side, and the bridges are the hard part.' }
      ], note: 'A suburb across the river with a punk house in a former convent. Its all-ages room has closed.' },
    { id: 'st-charles', kind: 'FEEDER', name: 'St. Charles', minutes: 30, bearing: 320, note: 'A big suburb of kids with cars.' },
    { id: 'edwardsville', kind: 'FEEDER', name: 'Edwardsville', state: 'IL', minutes: 30, bearing: 25, beyond: 'river-bridges', note: 'A college-adjacent town across the river.' },
    { id: 'festus', kind: 'FEEDER', name: 'Festus and Arnold', minutes: 35, bearing: 195, note: 'Working-class south county.' },
    { id: 'alton', kind: 'FEEDER', name: 'Alton', state: 'IL', minutes: 40, bearing: 5, beyond: 'river-bridges', note: 'A river town with its own house shows.' },
    { id: 'wentzville', kind: 'FEEDER', name: 'Wentzville', minutes: 40, bearing: 300, note: 'An exurb.' },
    { id: 'springfield-il', kind: 'PEER', name: 'Springfield', state: 'IL', minutes: 100, bearing: 5, note: 'Smaller. Bands pass through.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', minutes: 120, bearing: 270, slug: 'columbia-mo', note: 'A campus town on the way to Kansas City.' },
    { id: 'champaign', kind: 'PEER', name: 'Champaign', state: 'IL', minutes: 160, bearing: 55, slug: 'champaign-il', note: 'A campus scene across the state line.' }
  ],

  chokepoints: [
    { id: 'river-bridges', name: 'the river bridges', p: .03 }
  ],

  hoods: [
    { id: 'south-city', name: 'South City and Dutchtown', route: 'old-side', note: 'Brick two-families with basements and cheap rents. The heart of DIY.' },
    { id: 'carondelet', name: 'Carondelet', route: 'work-side', note: 'Far south city along the river. An old DIY and recording room stood here.' },
    { id: 'cherokee', name: 'Cherokee Street', route: 'downtown', note: 'An arts-and-bars strip in South City. A multipurpose arts venue there closed.' },
    { id: 'soulard', name: 'Soulard and Benton Park', route: 'old-side', note: 'Brick rowhouses and bars near the river.' },
    { id: 'grove', name: 'the Grove', route: 'downtown', note: 'A bar strip with bigger rooms.' },
    { id: 'loop', name: 'the Loop', route: 'campus', note: 'The student and music street in University City.' },
    { id: 'tower-grove', name: 'Tower Grove and Shaw', route: 'old-side', note: 'Big old houses and artists.' },
    { id: 'north-riverfront', name: 'the near north riverfront', route: 'work-side', note: 'Old warehouses north of downtown, with few neighbors and a lot of empty lots.' },
    { id: 'belleville-side', name: 'Belleville and Sauget', route: 'town:belleville', note: 'Across the river, where the hall circuit lives and the bridges set the price of every trip.' },
    { id: 'east-side', name: 'Belleville and East St. Louis', route: 'work-side', note: 'Across the river. An all-ages room there closed after four years.' }
  ],

  rooms: [
    { id: 'south-basement', kind: 'HOUSE', hood: 'south-city', cap: 40, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [70, 60, 45],
      pressure: 45, start: true, note: 'A basement in a punk house that has run since the nineties. No air conditioning and no heat, so August and January are the enemy.' },
    { id: 'mixed-bill-basement', kind: 'HOUSE', hood: 'south-city', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 45, note: 'A basement that has hosted for about ten years and loves a bill that crosses scenes. Fifty people is the most it holds.' },
    { id: 'dutchtown-house', kind: 'HOUSE', hood: 'south-city', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 50],
      pressure: 45, note: 'A house that takes most kinds of music and performance. Weird bills are welcome and nobody asks what genre you are.' },
    { id: 'river-yard-house', kind: 'HOUSE', hood: 'carondelet', cap: 60, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 30, standing: [65, 60, 45],
      pressure: 55, note: 'A far-south house with a big backyard and a tub for a pool. Summer yard shows are great until the street hears them.' },
    { id: 'patch-storefront', kind: 'DIY', hood: 'carondelet', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 50, note: 'A small storefront on Broadway with a recording studio attached. Dive-bar feel, thin money and one landlord.' },
    { id: 'solar-warehouse', kind: 'DIY', hood: 'north-riverfront', cap: 150, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A warehouse north of downtown that runs off the sun and the wind. A basement, a main floor and a roof, and a still, cloudy week browns out the PA.' },
    { id: 'cherokee-room', kind: 'DIY', hood: 'cherokee', cap: 120, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [60, 60, 50],
      pressure: 50, note: 'A DIY-style room on the arts strip that books every genre, glitch included. Not a hardcore room, but it takes the weird nights.' },
    { id: 'dive-bar', kind: 'BAR', hood: 'tower-grove', cap: 100, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1590, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 70], pressure: 45, needs: ['VOUCH'], note: 'A cash-only dive bar for punk, rock and metal that feels like a basement show. You need a local who knows the owner.' },
    { id: 'bevo-bar', kind: 'BAR', hood: 'south-city', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1590, ac: true, following: .3, sketch: 10,
      standing: [50, 65, 75], note: 'A bar built to put local bands first. Medium stage, a punk, indie and hardcore crowd, and no fuss.' },
    { id: 'marine-club', kind: 'CLUB', hood: 'soulard', cap: 300, houseCosts: 150, split: .8, pa: .85, ages: ['ALL', 'A18'], curfew: 1440, ac: false, outdoor: false, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The long-running mid-size room where local hardcore records get released, with a patio and a fire pit. It wants a draw.' },
    { id: 'midtown-club', kind: 'CLUB', hood: 'grove', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['A21', 'ALL'], curfew: 1470, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A metal, hardcore and hip-hop room. Twenty-one and up after nine, all ages only on the marked nights.' },
    { id: 'diner-basement', kind: 'CLUB', hood: 'loop', cap: 250, houseCosts: 120, split: .8, pa: .8, ages: ['ALL', 'A18'], curfew: 1440, ac: true, following: .4, sketch: 15,
      standing: [50, 70, 70], owner: 'TALENT_BUYER', notice: 42, note: 'A mid-size stage in the basement of a rock-and-roll diner near the university.' },
    { id: 'avenue-theater', kind: 'BIG', hood: 'grove', cap: 800, rent: 1800, deposit: 500, pa: .95, ages: ['ALL'], curfew: 1380, ac: true, following: .6, sketch: 5,
      standing: [40, 70, 70], note: 'A room for touring names on the avenue. A local band does not play it without a draw.' }
  ],

  contacts: ['columbia-mo', 'champaign-il', 'kansas-city', 'chicago', 'indianapolis'],

  calendar: [
    { id: 'mardi-gras', label: 'Mardi Gras parade weekend', tag: 'parade', month: 2, week: 1, dows: [4, 5, 6], can: [.80, .75, .70], hoods: ['soulard', 'south-city'], elsewhere: [.95, .90, .90] },
    { id: 'irish-parade', label: 'the Irish parade', tag: 'parade', month: 3, week: 3, dows: [5, 6], can: [.90, .88, .88] },
    { id: 'street-festival', label: 'the spring street festival', tag: 'festival', month: 5, week: 3, dows: [5, 6], can: [.92, .90, .90], hoods: ['cherokee', 'soulard'], elsewhere: [1, .97, .97] },
    { id: 'july-fair', label: 'the riverfront Fourth of July fair', tag: 'festival', month: 7, week: 1, dows: [3, 4, 5], can: [.88, .85, .85] },
    { id: 'underground-fest', label: 'the underground music festival', tag: 'festival', month: 9, week: 3, dows: [5], can: [.92, .90, .90], hoods: ['grove'], elsewhere: [.95, .92, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 2270000 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9500000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 1340000 },
    { name: 'Springfield', state: 'MO', lat: 37.21, lon: -93.29, pop: 480000 }
  ],
  roads: ['I-70', 'I-55', 'I-64', 'I-44', 'US 40'],

  words: {
    street: ['Cherokee Street', 'South Grand', 'Delmar Boulevard', 'Gravois Avenue', 'Broadway', 'Chippewa Street'],
    water: ['the Mississippi', 'the Missouri', 'the River Des Peres'],
    hood: ['Dutchtown', 'Carondelet', 'Soulard', 'Benton Park', 'Tower Grove', 'Shaw', 'the Grove'],
    thing: ['toasted ravioli', 'brick two-family', 'generator', 'river bridge', 'limestone foundation'],
    weather: ['thick humidity', 'ice storm']
  },

  events: [
    { id: 'ST_LOUIS_BRIDGE_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on one of the river bridges this week.',
      title: 'The bridge is a parking lot',
      body: 'A wreck has one of the river bridges down to a single lane, and the others are jammed behind it. The bands and the kids from the Illinois side are stuck in the dark.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross the river.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared, and the Illinois side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together.' }
      ] },

    { id: 'ST_LOUIS_BASEMENT_HEAT', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The forecast says the thick heat is not breaking all week.',
      title: 'Sweat drips off the pipes',
      body: 'The basement has no air conditioning and the humidity is a wall. The floor is packed, the pipes are dripping, and somebody wants to move the set to the yard, where the whole street can hear.',
      options: [
        { id: 'FANS', label: 'Borrow every fan on the block and run it', likely: 'It\'s hot, loud and packed, and people leave sticky.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You ran six box fans and a lot of water. Nobody fainted, and the pipes kept dripping.' },
        { id: 'YARD', label: 'Move the set to the backyard', likely: 'It\'s cooler, but the neighbors will hear it.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 1.1 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'MONEY', amount: -40 }],
          result: 'The yard was cooler and a lot more people came, and so did a complaint at ten.' },
        { id: 'ACCEPT', label: 'Run it as it is', likely: 'The people who can stand it come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The weak-stomached stayed home, and the people who came wrung out their shirts.' }
      ] },

    { id: 'ST_LOUIS_PARADE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'Barricades are going up in the brick neighborhoods for the parade.',
      title: 'Half the crowd is at the parade',
      body: 'The parade fills the bar streets and eats the parking. Half your crowd is stuck on the other side of it, and the other half is already drunk at it.',
      options: [
        { id: 'LATE', label: 'Push doors back until the parade is over', likely: 'The people who want a loud night come after.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the crowd came in from the street, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the parade.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The casual crowd stayed on the street, and the regulars made it through.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});