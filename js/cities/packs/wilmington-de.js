SB.Cities.register('wilmington-de', {
  v: 1,
  slug: 'wilmington-de',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of delaware', 'delaware state university', 'wilmington university', 'widener university', 'delaware technical community college',
           'news journal', 'delaware online', 'delaware today', 'spotlight delaware', 'whyy', 'wdel', 'wilmington blue rocks', 'blue rocks',
           'philadelphia eagles', 'eagles', 'phillies', '76ers', 'blue hens', 'delaware park', 'dover international speedway', 'dover air force base',
           'wilmington riverfront', 'jpmorgan', 'jpmorgan chase', 'bank of america', 'capital one', 'dupont', 'chemours', 'corteva', 'astrazeneca',
           'christiana care', 'nemours', 'wsfs', 'delaware state fair', 'return day', 'firefly festival', 'riverfront blues festival',
           'clifford brown jazz festival', 'hurricane sandy', 'hurricane isabel', 'delaware memorial bridge authority', 'amtrak', 'septa',
           'dart first state', 'christiana mall', 'wawa', 'acme', 'saint georges bridge', 'drexel', 'temple university', 'penn state',
           'west chester university', 'cabrini', 'widener', 'longwood gardens', 'fort delaware', 'the daily times', 'inquirer', 'philadelphia inquirer',
           'italian festival', 'saint anthony', 'st anthony of padua', 'greek festival', 'wilmington flower market', 'flower market', 'rockford park', 'rockwood park',
           'ice cream festival', 'august quarterly', 'separation day', 'delaware sängerbund', 'sangerbund', 'oktoberfest', 'brandywine festival of the arts',
           'st patrick\'s day parade', 'walnut street ymca', 'ymca', 'associated press', 'delaware public media', 'brandywine valley',
           'greater wilmington convention and visitors bureau', 'visit wilmington', 'macaroni kid', 'delaware general assembly', 'oabcc'],
  /* Nothing here is an invented venue name: rooms carry no names. */
  blocklist: ['news journal*', 'delaware online*', 'wawa*', 'septa*', 'amtrak*', 'dupont*', 'blue rocks*'],

  blurb: ['A small river city between Philadelphia and Baltimore. Banks and credit-card offices fill downtown by day and leave it dark at five.',
          'Shows happen in a bar back room, one all-ages theater and rowhouse basements. Everyone has a cousin or an ex up the road.'],
  hard: 'Philly eats the crowd; few rooms, noisy rowhouse neighbors.',
  region: 'the Northeast Corridor',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Wilmington' },
    { id: 'newark', kind: 'FEEDER', name: 'Newark', state: 'DE', minutes: 20, bearing: 250, bands: 2, scene: 70, note: 'The college town to the southwest: students, house shows, the closest second pole.',
      rooms: [
      { id: 'newark-basement', kind: 'HOUSE', hood: 'newark-town', zone: 'newark', cap: 60, ages: ['A18'], curfew: 1440, ac: false, outdoor: false, pressure: 50,
      note: 'A student basement in the college town with four-band bills and a ten dollar cover. The address goes by word of mouth, and the road out front is busy.' },
      { id: 'newark-records', kind: 'SHOP', hood: 'newark-town', zone: 'newark', cap: 60, curfew: 1230, ac: true,
      note: 'A record shop in the college town with a stage by the bins. Early evening sets, then the students go to dinner.' },
      { id: 'newark-club', kind: 'CLUB', hood: 'newark-town', zone: 'newark', cap: 250, ages: ['A18'], curfew: 1470, ac: true, owner: 'TALENT_BUYER',
      note: 'An old Main Street bar allowed to keep its bands. DJ nights and cover bands pay the bills, and the town has run other rooms out.' }
      ] },
    { id: 'new-castle', kind: 'FEEDER', name: 'New Castle', state: 'DE', minutes: 15, bearing: 190, note: 'A small river town; a few kids come up.' },
    { id: 'bear', kind: 'FEEDER', name: 'Bear', state: 'DE', minutes: 20, bearing: 215, note: 'Suburban sprawl and garage bands. The kids need rides.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown', state: 'DE', minutes: 30, bearing: 205, note: 'Exurban growth and some teen bands.' },
    { id: 'chester', kind: 'FEEDER', name: 'Chester', state: 'PA', minutes: 20, bearing: 50, note: 'A post-industrial river city; kids come in on I-95.' },
    { id: 'media', kind: 'FEEDER', name: 'Media', state: 'PA', minutes: 25, bearing: 40, note: 'A county suburb the area\'s hardcore has long drawn from.' },
    { id: 'west-chester', kind: 'FEEDER', name: 'West Chester', state: 'PA', minutes: 30, bearing: 25, note: 'A college-town suburb with bands of its own.' },
    { id: 'kennett-square', kind: 'FEEDER', name: 'Kennett Square', state: 'PA', minutes: 25, bearing: 305, note: 'Rural-suburban. A few kids.' },
    { id: 'elkton', kind: 'FEEDER', name: 'Elkton', state: 'MD', minutes: 25, bearing: 235, note: 'A small town with few venues; kids drive up.' },
    { id: 'pennsville', kind: 'FEEDER', name: 'Pennsville', state: 'NJ', minutes: 20, bearing: 150, beyond: 'jersey-bridge', note: 'South Jersey kids come across the bridge.' },
    { id: 'dover', kind: 'PEER', name: 'Dover', state: 'DE', minutes: 55, bearing: 185, slug: 'dover-de', note: 'The state capital, with a smaller, younger scene.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', state: 'PA', minutes: 65, bearing: 310, slug: 'lancaster-pa', note: 'A small DIY-house town of similar size.' },
    { id: 'trenton', kind: 'PEER', name: 'Trenton', state: 'NJ', minutes: 60, bearing: 55, slug: 'trenton-nj', note: 'A rough city with an older all-ages hall tradition.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', state: 'PA', minutes: 80, bearing: 340, slug: 'reading-pa', note: 'A hardcore-heavy peer the area has drawn from.' }
  ],

  chokepoints: [{ id: 'jersey-bridge', name: 'the bridge to Jersey', p: .02 }],

  hoods: [
    { id: 'market-street', name: 'downtown on Market Street', route: 'downtown', note: 'Bars, a few theaters and office towers. Rooms here are bars and one theater, not houses.' },
    { id: 'trolley-square', name: 'Trolley Square', route: 'old-side', note: 'Rowhouses and brunch bars. Rent is high and the neighbors complain.' },
    { id: 'riverfront', name: 'the riverfront', route: 'downtown', note: 'Converted warehouses, a ballpark and restaurants. New money and no basements.' },
    { id: 'delaware-avenue', name: 'Delaware Avenue and the hill', route: 'old-side', note: 'Big old rowhouses split into rentals. The likeliest house-show streets.' },
    { id: 'east-side', name: 'the East Side', route: 'work-side', note: 'Rowhouses and corner stores. Cheap rent and little nightlife.' },
    { id: 'southbridge', name: 'Southbridge', route: 'work-side', note: 'Across the river by the port and rail yards. Warehouse space exists.' },
    { id: 'browntown', name: 'Browntown and Hedgeville', route: 'work-side', note: 'Old working-class blocks, a short walk to everything.' },
    { id: 'newark-side', name: 'the college town to the southwest', route: 'campus', note: 'Students and house shows, a short drive out.' },
    { id: 'newark-town', name: 'Newark', route: 'town:newark', note: 'The college town twenty minutes southwest. Basements for the students and a main street of grandfathered bars.' },
    { id: 'elsmere', name: 'Elsmere and the suburban cul-de-sacs', route: 'campus', note: 'Garages and basements. Kids ride in with their parents.' }
  ],

  rooms: [
    { id: 'avenue-rowhouse', kind: 'HOUSE', hood: 'delaware-avenue', zone: 'city', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rowhouse basement on the hill with a low ceiling and a shared wall. The neighbors and the landlord are the ones to keep happy.' },
    { id: 'elsmere-garage', kind: 'HOUSE', hood: 'elsmere', zone: 'city', cap: 35, curfew: 1290, ac: false, outdoor: false, pressure: 45,
      note: 'A suburban garage on a cul-de-sac. The kids ride in with their parents and everyone is gone by nine-thirty.' },
    { id: 'port-warehouse', kind: 'DIY', hood: 'southbridge', zone: 'city', cap: 120, curfew: 1380, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A warehouse bay by the port and rail yards. Room for a real crowd, with no permit and a fire marshal who would shut it in a minute.' },
    { id: 'browntown-storefront', kind: 'DIY', hood: 'browntown', zone: 'city', cap: 60, curfew: 1350, ac: false, pressure: 50, needs: ['VOUCH'],
      note: 'A storefront on an old working-class block, half practice space. Hard to say who still has the key.' },
    { id: 'market-records', kind: 'SHOP', hood: 'market-street', zone: 'city', cap: 50, curfew: 1230, ac: true,
      note: 'A record shop on Market Street with in-store sets. A small crowd and a lot of regulars.' },
    { id: 'market-theater', kind: 'HALL', hood: 'market-street', zone: 'city', cap: 500, curfew: 1380, ac: true, owner: 'HALL_MANAGER', pressure: 40,
      note: 'The restored theater downtown, the one big all-ages room. Doors at six-thirty, and who runs it has changed more than once.' },
    { id: 'market-bar', kind: 'BAR', hood: 'market-street', zone: 'city', cap: 150, ages: ['A21'], curfew: 1500, ac: true, pressure: 45,
      note: 'A bar on Market Street with a back-room stage and local hardcore nights. Rooms like it have a way of closing.' },
    { id: 'pike-bar', kind: 'BAR', hood: 'east-side', zone: 'city', cap: 200, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A bigger bar room out on the pike, north of the city. Some nights are all ages, depending on who is working the door.' },
    { id: 'riverfront-stage', kind: 'BIG', hood: 'riverfront', zone: 'city', cap: 1200, curfew: 1380, ac: false, owner: 'TALENT_BUYER',
      note: 'The waterfront stage and the ballpark next to it. Touring headliners only, and the money is in the other room.' }
  ],

  contacts: ['dover-de', 'lancaster-pa', 'trenton-nj', 'reading-pa', 'philadelphia'],

  calendar: [
    { id: 'hill-festival', label: 'the hill street festival', tag: 'festival', month: 6, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.90, .85, .85], hoods: ['delaware-avenue'], elsewhere: [1, .97, .97] },
    { id: 'arts-fair', label: 'the arts fair', tag: 'fair', month: 6, week: 2, dows: [5, 6], can: [.92, .90, .90] },
    { id: 'march-parade', label: 'the March parade', tag: 'parade', month: 3, week: 2, dows: [6], can: [.85, .90, .90], hoods: ['market-street'], elsewhere: [1, 1, 1] },
    { id: 'beer-festival', label: 'the fall beer festival', tag: 'festival', month: 10, weeks: [1, 2], dows: [4, 5, 6], can: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.88, .95, .95], hoods: ['newark-town'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.88, .95, .95], hoods: ['newark-town'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.88, .95, .95], hoods: ['newark-town'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Trenton', state: 'NJ', lat: 40.22, lon: -74.76, pop: 399000 },
    { name: 'Dover', state: 'DE', lat: 39.16, lon: -75.52, pop: 190000 }
  ],
  roads: ['I-95', 'I-295', 'I-495', 'Route 202', 'Route 141', 'Route 9'],

  words: {
    street: ['Market Street', 'Delaware Avenue', 'Union Street', 'Lancaster Avenue', 'Concord Pike', 'Maryland Avenue'],
    water: ['the Christina', 'the Delaware', 'the Brandywine', 'the river'],
    hood: ['Trolley Square', 'Browntown', 'Hedgeville', 'Southbridge', 'the East Side', 'Elsmere', 'Union Hill'],
    thing: ['credit card', 'rowhouse', 'I-95', 'toll booth', 'call center', 'port crane', 'regional train', 'bank cafeteria'],
    weather: ['nor\'easter', 'cold wind off the water']
  },

  events: [
    { id: 'WILMINGTON_DE_JERSEY_BRIDGE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the bridge to Jersey this week.',
      title: 'The bridge to Jersey is shut',
      body: 'A wreck has closed the bridge over the river the night of your show. The South Jersey kids and one of the bands are stuck on the far side.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat it', likely: 'Some make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people on the far side.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The bridge never reopened in time, and the Jersey kids stayed home.' },
        { id: 'RIDES', label: 'Organize rides the long way round', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the long way around together.' }
      ] },

    { id: 'WILMINGTON_DE_HILL_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], months: [6], calendar: 'festival' },
      telegraph: 'The street crews are putting up barricades on the hill for the festival.',
      title: 'The hill is closed for the festival',
      body: 'There are carnival rides and closed streets on the hill, and your house show is two blocks away. Your guests have nowhere to park and the neighbors are already angry about their own spots.',
      options: [
        { id: 'WALK', label: 'Tell everyone to park across town and walk', likely: 'Some give up, and the ones who come are patient.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
          result: 'A long line of people walked up the hill together, and the neighbors mostly let it go.' },
        { id: 'QUIET', label: 'Keep it small and quiet', likely: 'Fewer people, fewer fights over parking.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'You kept the list short, and nobody blocked a driveway.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Angry neighbors and a thin turnout.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The street fight over parking was louder than the band.' }
      ] },

    { id: 'WILMINGTON_DE_I95_BACKUP', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'There was a wreck on I-95 and the road is a parking lot back to the state line.',
      title: 'Stuck behind the wreck on I-95',
      body: 'Two bands from Philadelphia are sitting in a backup on I-95. They will be an hour late, and the early set is for kids who have to be home by ten.',
      options: [
        { id: 'REBUILD', label: 'Rebuild the bill with the local band first', likely: 'The kids see a shorter, odd set, and the band gets there for the end.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The local band played twice as long as planned, and the van pulled in for the last set.' },
        { id: 'WAIT', label: 'Hold the doors until they arrive', likely: 'The kids may miss them and leave early.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors went an hour late, and the kids under curfew left before the headliners.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
