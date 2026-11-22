SB.Cities.register('rockford-il', {
  v: 1,
  slug: 'rockford-il',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['rockford register star', 'rock river current', 'gorockford', 'go rockford', 'wnij', 'northern public radio', 'wrok', 'hard rock casino', 'hard rock live', 'coronado theater', 'coronado', 'arcada', 'apollo theatre', 'rock & roll institute', 'rock and roll institute', 'old settlers days', 'festa italiana', 'crossroads blues festival', 'rhythm of the heart', 'rockford jams', 'sinnissippi park', 'davis park', 'lyran park', 'jefferson street bridge', 'viva rockford', 'greenwich village art fair', 'north end city market', 'rivets', 'rockford rivets', 'ellida lodge', 'spider on quinta', 'rock-a-bago', 'cherryvale', 'rockford university', 'rock valley college', 'beloit college', 'northern illinois university', 'niu', 'head of the rock', 'women\'s baseball world cup',
           'heritage days', 'petunia festival', 'corn fest', 'city of murals', 'pretzel city', 'hub city', 'jane addams memorial tollway', 'metra', 'amtrak',
           'rockford symphony', 'riverfront museum park', 'rockford speedway', 'icehogs', 'rockford peaches', 'rockford register star', 'rockford airport',
           'chicago rockford international', 'stellantis', 'chrysler', 'belvidere assembly', 'great lakes naval', 'naval station great lakes',
           'fastener hall', 'kishwaukee annex', 'the pattern shop', 'alpine lanes party room', 'union hall no. 9', 'the coal chute', 'perryville pizza and pins',
           'swedish club basement', 'the dry dock', 'harrison avenue roller rink', 'old hardware back room', 'the machine shop'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['rockford register*', 'icehogs*', 'cherryvale*', 'head of the rock*', 'rock valley*', 'niu*', 'belvidere assembly*'],

  blurb: ['A river town of idled plants and cheap basements, split into an east side and a west side that barely talk.',
          'The best shows go to Chicago or Madison, so locals build their own rooms and lose them fast.'],
  hard: 'Fragile rooms, thin crowds, and bigger cities pulling bands both ways.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.40 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Rockford' },
    { id: 'loves-park', kind: 'FEEDER', name: 'Loves Park and Machesney Park', minutes: 15, bearing: 20, scene: 120, note: 'Suburbs north of the city; the car-owning teen core of an all-ages crowd.' },
    { id: 'cherry-valley', kind: 'FEEDER', name: 'Cherry Valley, Rockton and Roscoe', minutes: 20, bearing: 340, note: 'Suburbs and fringe towns; kids with cars and parents\' garages.' },
    { id: 'belvidere', kind: 'FEEDER', name: 'Belvidere', minutes: 20, bearing: 105, pop: 25339, note: 'A factory town hit hard by an idled plant; probably a small loyal scene.', bands: 2 },
    { id: 'beloit', kind: 'FEEDER', name: 'Beloit and South Beloit', state: 'WI', minutes: 25, bearing: 5, pop: 36657, note: 'A small college town over the state line, with its own small scene.', bands: 1 },
    { id: 'freeport', kind: 'FEEDER', name: 'Freeport', minutes: 35, bearing: 285, pop: 23973, note: 'A German-heritage river town to the west.' },
    { id: 'janesville', kind: 'FEEDER', name: 'Janesville', state: 'WI', minutes: 40, bearing: 5, pop: 65615, note: 'A sister to Belvidere; lost its century-old auto plant.' },
    { id: 'harvard', kind: 'FEEDER', name: 'Harvard and Marengo', minutes: 45, bearing: 95, note: 'Farm and exurban kids to the east.' },
    { id: 'oregon', kind: 'FEEDER', name: 'Oregon', minutes: 45, bearing: 230, note: 'Rock River bluffs and a state park; no known scene.' },
    { id: 'rochelle', kind: 'FEEDER', name: 'Rochelle', minutes: 45, bearing: 190, note: 'A rail crossing town to the south on the interstate.' },
    { id: 'dekalb', kind: 'FEEDER', name: 'DeKalb', minutes: 50, bearing: 150, pop: 40290, note: 'A big university town with its own punk lineage; a trading partner as much as a feeder.', bands: 3 },
    { id: 'dixon', kind: 'FEEDER', name: 'Dixon', minutes: 55, bearing: 220, pop: 15274, note: 'A small river town whose kids drive to Rockford for anything bigger.' },
    { id: 'elgin', kind: 'PEER', name: 'Elgin', minutes: 50, bearing: 115, scene: 800, note: 'A near twin in size and decline, with a direct road and a train to Chicago.' },
    { id: 'davenport', kind: 'PEER', name: 'Davenport', state: 'IA', minutes: 115, bearing: 250, slug: 'davenport-ia', note: 'A comparable river hub; bands often route through the Quad Cities.' },
    { id: 'peoria', kind: 'PEER', name: 'Peoria', minutes: 140, bearing: 190, slug: 'peoria-il', note: 'A sister river-and-factory city; a long drive for a trade show.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Main and State streets: bar rooms, a few storefronts and an old theater district, with retail long gone.' },
    { id: 'industrial-belt', name: 'the old industrial belt', route: 'work-side', note: 'Foundries, machine shops and warehouses along the river and creeks. Warehouse shows and practice rooms.' },
    { id: 'seventh-street', name: 'Seventh Street and the southwest side', route: 'work-side', note: 'A Swedish-then-Latino commercial strip with dense old housing. House shows and church-adjacent halls.' },
    { id: 'near-east', name: 'the near east side', route: 'old-side', note: 'Older houses around a creek that flooded; whole blocks torn down. Cheap, ignored and full of empty lots.' },
    { id: 'east-state', name: 'East State Street', route: 'campus', note: 'Chain restaurants, big boxes and the enclosed mall. Parking-lot hangs and strip-mall units.' },
    { id: 'northwest', name: 'the northwest side', route: 'old-side', note: 'An older mall and a prairie park; the first suburbs, now aging.' },
    { id: 'suburbs-north', name: 'Loves Park and Machesney Park', route: 'campus', note: 'The car-owning suburbs past the city line, where the all-ages crowd drives in from.' },
    { id: 'loves-park-town', name: 'Loves Park', route: 'town:loves-park', note: 'The suburb past the city line: finished basements, garages and a pub or two. The all-ages crowd drives in from here.' }
  ],

  rooms: [
    { id: 'west-basement', kind: 'HOUSE', hood: 'seventh-street', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A basement in an old house on the west side, close to weekly, no door charge. The donation jar keeps it on the right side of zoning, until the fire inspector asks.' },
    { id: 'suburb-garage', kind: 'HOUSE', hood: 'loves-park-town', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, standing: [65, 60, 45],
      pressure: 50, note: 'A finished basement and a garage in the car-owning suburbs. It dies the first time a neighbor calls.' },
    { id: 'print-shop', kind: 'DIY', hood: 'downtown', cap: 80, rent: 60, pa: .5, curfew: 1380, ac: true, standing: [60, 60, 55],
      pressure: 50, note: 'A storefront where the print shop pays the bills and the back room does the shows. Rent and empty-building red tape are the threat.' },
    { id: 'foundry-bay', kind: 'DIY', hood: 'industrial-belt', cap: 120, rent: 70, pa: .6, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A bay in an old machine shop with a practice room next door. The best-sounding room you can get and the fire marshal knows it.' },
    { id: 'west-hall', kind: 'HALL', hood: 'seventh-street', cap: 150, pa: .5, curfew: 1320, ac: true, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A church-adjacent hall rented by the night. One bad night and you will not be rented to again.' },
    { id: 'state-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], matinee: true, curfew: 1500, ac: true, following: .3, standing: [50, 65, 70],
      note: 'A downtown bar with a stage and local-band nights. Some nights have an early all-ages window, but nobody posts which.' },
    { id: 'plaza-bar', kind: 'BAR', hood: 'east-state', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .2, standing: [45, 60, 65],
      pressure: 50, note: 'A bar in a strip-mall plaza with rock and tribute nights. The last one closed over its license.' },
    { id: 'pub-room', kind: 'BAR', hood: 'loves-park-town', cap: 120, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .2, standing: [50, 65, 65],
      note: 'A neighborhood pub that still lists bands. Bars like this go when the owner retires.' },
    { id: 'listening-room', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .85, ages: ['A18'], curfew: 1440, ac: true, following: .5, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'An upscale listening room and bar that packed out a local anniversary show. A stretch for loud bands.' },
    { id: 'big-hall', kind: 'BIG', hood: 'downtown', cap: 1600, pa: .95, curfew: 1380, ac: true, standing: [45, 65, 70],
      owner: 'TALENT_BUYER', notice: 90, needs: ['FULL_BILL'], note: 'A seated hall downtown that a youth rock showcase has filled. The touring acts go to the old theater and the casino.' },
    { id: 'prairie-yard', kind: 'OUTDOOR', hood: 'northwest', cap: 50, rent: 10, pa: .4, curfew: 1260, standing: [60, 55, 45],
      note: 'A prairie park or a yard on the northwest side. Summer evenings, a generator, and over by nine.' }
  ],
  contacts: ['davenport-ia', 'peoria-il', 'madison-wi', 'chicago', 'milwaukee'],

  calendar: [
    { id: 'fourth', label: 'the Fourth of July celebration', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.88, .85, .88], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'italian-fest', label: 'the Italian festival', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'town-fest', label: 'the summer town festival', tag: 'festival', month: 6, week: 3, dows: [3, 4, 5, 6], can: [.92, .90, .90] },
    { id: 'blues-fest', label: 'the blues festival', tag: 'festival', month: 8, week: 4, dows: [5], can: [.92, .88, .88] },
    { id: 'fiesta', label: 'the Latino culture day', tag: 'festival', month: 10, week: 1, dows: [6], can: [.95, .90, .90], hoods: ['seventh-street'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Elgin', state: 'IL', lat: 42.04, lon: -88.28, pop: 114797 },
    { name: 'Kenosha', state: 'WI', lat: 42.58, lon: -87.82, pop: 99000 },
    { name: 'Dubuque', state: 'IA', lat: 42.50, lon: -90.66, pop: 59667 },
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 1570000 }
  ],
  roads: ['I-90', 'I-39', 'US 20', 'US 51', 'IL 2', 'IL 251'],

  words: {
    street: ['State Street', 'Main Street', 'Seventh Street', 'Harrison Avenue', 'Alpine Road', 'Perryville Road'],
    water: ['the Rock River', 'Kishwaukee River', 'Keith Creek', 'Kent Creek'],
    hood: ['the east side', 'the west side', 'Loves Park', 'Machesney Park', 'Cherry Valley', 'Rockton', 'Roscoe'],
    thing: ['machine shop', 'fastener plant', 'foundry', 'Swedish bakery', 'taqueria', 'pump house', 'blizzard', 'union hall', 'shift change', 'practice room'],
    weather: ['blizzard', 'lake effect', 'spring storm']
  },

  events: [
    { id: 'ROCKFORD_IL_BLIZZARD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'A blizzard is coming down from the north and the highway to the suburbs is already closed.',
      title: 'The blizzard shuts the north road',
      body: 'The garage show up in the suburbs is dead, because nobody can get there. The west side basement says it will take the whole bill if you can get the gear across town.',
      options: [
        { id: 'BASEMENT', label: 'Move the whole bill to the west side basement', likely: 'Smaller and packed. The donation jar turns into a heater fund.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'The basement filled with people in coats, and the jar went round twice for the heater.' },
        { id: 'WAIT', label: 'Wait for the plows and start late', likely: 'A late night. The crowd that comes is loyal.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The plows came at nine. You started at ten and nobody left early.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The snow stopped, and not everyone could make the new one.' }
      ] },

    { id: 'ROCKFORD_IL_BRIDGE_SHUT', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3], months: [7], calendar: 'holiday' },
      telegraph: 'The downtown bridge closes for the fireworks and the storefront has no other way in.',
      title: 'The fireworks shut the bridge',
      body: 'The bridge is closed for the Fourth of July fireworks, and the downtown storefront loses its load-in path. The crowd will walk over after the finale if you can wait.',
      options: [
        { id: 'WAIT', label: 'Hold the doors until the finale', likely: 'A late start. The crowd comes over all at once.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }],
          result: 'The last rocket went off and half the riverbank walked in. Loud and happy.' },
        { id: 'EARLY', label: 'Load in early and play before the fireworks', likely: 'A smaller early crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'You played to the early birds and were done by dark.' },
        { id: 'ACCEPT', label: 'Run it as planned and hand-carry everything', likely: 'Sweaty and slow.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Every amp went around the long way. The show started on time, barely.' }
      ] },

    { id: 'ROCKFORD_IL_DONATION_JAR', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor has been counting cars outside the basement show and asking questions.',
      title: 'Is the jar a cover charge?',
      body: 'The show runs on donations to stay clear of zoning. A neighbor asks whether the canned food and extension cords add up to a cover charge, and says they will call it in.',
      options: [
        { id: 'TALK', label: 'Go over and talk to the neighbor', likely: 'Costs an hour. Might keep the room.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You stood on the porch for an hour and left with a promise to end by ten.' },
        { id: 'SHORT', label: 'End the night early and keep the jar quiet', likely: 'A short night, a quiet street.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Done by ten. The jar still came back with two heaters\' worth.' },
        { id: 'ACCEPT', label: 'Ignore it and run the show', likely: 'The neighbor makes the call.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'A patrol car rolled by twice. Half the room left early.' }
      ] }
  ]
});
