SB.Cities.register('harrisburg-pa', {
  v: 1,
  slug: 'harrisburg-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['harrisburg senators', 'fnb field', 'city island', 'america\'s largest rv show', 'harrisburg outdoor show', 'big 26 baseball classic', 'kipona festival', 'theburg', 'whtm', 'abc27', 'visit hershey harrisburg', 'harrisburg city council', 'harrisburg police', 'dauphin county', 'cumberland county', 'susquehanna river', 'summerdale', 'pennsylvania farm show', 'farm show complex', 'farm show', 'great american outdoor show', 'kipona', 'penn state', 'penn state harrisburg',
           'harrisburg university', 'hacc', 'messiah university', 'messiah college', 'dickinson college', 'dickinson', 'shippensburg university',
           'lebanon valley college', 'susquehanna university', 'carlisle barracks', 'army war college', 'fort indiantown gap', 'new cumberland army depot',
           'hersheypark', 'hershey chocolate', 'pennlive', 'patriot-news', 'patriot news', 'witf', 'capital area transit', 'sheetz', 'rutter\'s', 'rutters',
           'wawa', 'yuengling', 'hurricane agnes', 'agnes flood', 'liquor control board', 'vfw', 'american legion', 'elks', 'moose lodge',
           'paxton street hall', 'the camelback room', 'cumberland social club', 'second street annex', 'the maclay basement', 'susquehanna grange no. 9',
           'steelworkers\' rec', 'the hill street pavilion', 'reily street garage', 'the capitol loft', 'front & verbeke hall', 'riverfront slab'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['pennlive*', 'sheetz*', 'wawa*', 'yuengling*', 'farm show*', 'kipona*', 'paxton street hall*', 'camelback room*'],

  blurb: ['A capital whose downtown shuts at five, so the kids carry the scene out to basements and fire halls. The rowhouse cellars are cheap, and everyone has a car.',
          'The river is the west edge, and the West Shore bands have to cross a bridge to play in town. Baltimore and Philadelphia keep pulling the ambitious ones away.'],
  hard: 'Tiny walkable core; most rooms are halls and houses far apart.',
  region: 'the Mid-Atlantic',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Harrisburg' },
    { id: 'west-shore', kind: 'FEEDER', name: 'Lemoyne, Camp Hill and Mechanicsburg', minutes: 15, bearing: 250, note: 'Across the river bridges: suburban teenagers and basements.' },
    { id: 'hershey', kind: 'FEEDER', name: 'Hershey and Hummelstown', minutes: 20, bearing: 100, note: 'A chocolate and amusement-park town; suburban kids drive in.' },
    { id: 'carlisle', kind: 'FEEDER', name: 'Carlisle', minutes: 25, bearing: 245, note: 'A small college town on I-81.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon and Annville', minutes: 30, bearing: 95, note: 'A Pennsylvania Dutch working town with a small college next door.' },
    { id: 'elizabethtown', kind: 'FEEDER', name: 'Elizabethtown and Mount Joy', minutes: 35, bearing: 150, note: 'College and farm towns toward Lancaster.' },
    { id: 'gettysburg', kind: 'FEEDER', name: 'Gettysburg', minutes: 50, bearing: 205, note: 'A college and tourist town down US 15.' },
    { id: 'shippensburg', kind: 'FEEDER', name: 'Shippensburg', minutes: 45, bearing: 235, note: 'A university town on I-81.' },
    { id: 'selinsgrove', kind: 'FEEDER', name: 'Selinsgrove and Sunbury', minutes: 55, bearing: 5, note: 'River towns up US 11 and 15.' },
    { id: 'chambersburg', kind: 'FEEDER', name: 'Chambersburg', minutes: 55, bearing: 230, note: 'A farm and mill town, big for its region.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 45, bearing: 145, slug: 'lancaster-pa', note: 'The nicer, wealthier cousin; crowds trade both ways.' },
    { id: 'reading', kind: 'PEER', name: 'Reading', minutes: 60, bearing: 95, slug: 'reading-pa', note: 'Larger and poorer; shares touring bands.' },
    { id: 'state-college', kind: 'PEER', name: 'State College', minutes: 90, bearing: 295, slug: 'state-college-pa', note: 'A college town with its own bill-building tradition.' },
    { id: 'scranton', kind: 'PEER', name: 'Scranton and Wilkes-Barre', minutes: 105, bearing: 35, slug: 'scranton-pa', note: 'Another capital-sized scene with the same dynamics, up I-81.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Capitol', route: 'downtown', note: 'Offices and a few bars; dull after dark, good for licensed rooms.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'Rowhouses, coffee, small galleries; the likeliest place for record shops and storefront rooms.' },
    { id: 'uptown', name: 'Uptown', route: 'old-side', note: 'Big brick rowhouses split into units, with attics and basements.' },
    { id: 'allison-hill', name: 'Allison Hill', route: 'work-side', note: 'Dense, low-income and long disinvested; cheap space, but an outsider\'s show there is a different situation.' },
    { id: 'shipoke', name: 'Shipoke', route: 'old-side', note: 'Quaint riverfront rowhouses with older homeowners and noise complaints.' },
    { id: 'steelton', name: 'Steelton', route: 'work-side', note: 'An old steel borough of small rowhouses, social halls and cheap practice space.' },
    { id: 'west-shore-hood', name: 'the West Shore', route: 'campus', note: 'Car-dependent suburbs across the river, full of teenagers and finished basements.' },
    { id: 'north-suburbs', name: 'Susquehanna Township and Lower Paxton', route: 'campus', note: 'Car-only suburbs north of the city: garages, big lots and townships with their own complaint lines.' },
    { id: 'north-end', name: 'the north end', route: 'work-side', note: 'Road corridors and parking lots around the big expo grounds. Big halls, and nothing to walk to.' }
  ],

  rooms: [
    { id: 'shore-basement', kind: 'HOUSE', hood: 'west-shore-hood', cap: 50, curfew: 1320, start: true,
      note: 'A finished basement across the river. The street is quiet and so are the neighbors, until ten.' },
    { id: 'midtown-cellar', kind: 'HOUSE', hood: 'midtown', cap: 40, curfew: 1320,
      note: 'A stone cellar under a split rowhouse. The walls are shared and so is the landlord.' },
    { id: 'paxton-garage', kind: 'HOUSE', hood: 'north-suburbs', cap: 60, curfew: 1350,
      note: 'A two-car garage in the township. Room for the whole bill, and a neighbor with a phone.' },
    { id: 'steelton-hall', kind: 'HALL', hood: 'steelton', cap: 200, curfew: 1350,
      note: 'A borough social hall with the bar walled off. The board is nervous and the insurance is a form.' },
    { id: 'midtown-storefront', kind: 'DIY', hood: 'midtown', cap: 100, curfew: 1380,
      note: 'A storefront room off a Midtown block. Cheap, until the license trouble starts.' },
    { id: 'midtown-coffeehouse', kind: 'SHOP', hood: 'midtown', cap: 60, curfew: 1260,
      note: 'A coffeehouse that has done a benefit show or two. Early, small and over by nine.' },
    { id: 'river-pavilion', kind: 'OUTDOOR', hood: 'shipoke', cap: 150, curfew: 1260,
      note: 'A pavilion by the river in summer. The permit is easy and the neighbors are not.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500,
      note: 'A downtown bar that books punk some nights. After dark the street around it is empty.' },
    { id: 'shore-club', kind: 'CLUB', hood: 'west-shore-hood', cap: 300, ages: ['ALL'], curfew: 1380,
      note: 'An all-ages club that moved to a new address across the river. Nobody walks there.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['ALL'], curfew: 1410,
      note: 'A mid-sized club on the main blocks that takes touring punk and metal. Wants a name on the bill.' },
    { id: 'expo-hall', kind: 'BIG', hood: 'north-end', cap: 1000, ages: ['ALL'], curfew: 1380,
      note: 'A touring-act hall by the big expo grounds. The booker only buys a ticket.' }
  ],

  contacts: ['lancaster-pa', 'york-pa', 'reading-pa', 'state-college-pa'],

  calendar: [
    { id: 'expo-week', label: 'the big January expo week', tag: 'fair', month: 1, week: 2, dows: [3, 4, 5, 6], can: [0.85, 0.8, 0.85], hoods: ['north-end'], elsewhere: [0.95, 0.92, 0.95] },
    { id: 'river-fest', label: 'the Labor Day river festival', tag: 'festival', month: 9, week: 1, dows: [5, 6, 0], can: [0.88, 0.85, 0.9], hoods: ['shipoke','downtown'], elsewhere: [0.97, 0.95, 0.97] },
    { id: 'camper-expo', label: 'the camper expo', tag: 'fair', month: 9, week: 3, dows: [3, 4, 5, 6], can: [0.92, 0.9, 0.92], hoods: ['north-end'], elsewhere: [1, 0.97, 0.97] },
    { id: 'baseball-classic', label: 'a summer youth baseball tournament', tag: 'game', month: 7, week: 5, dows: [3, 4, 5, 6], can: [0.93, 0.9, 0.9], hoods: ['shipoke'], elsewhere: [1, 0.97, 0.97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [0.85, 0.95, 0.95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.1] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1440, inForce: true } },

  points: [
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6100000 },
    { name: 'Hagerstown', state: 'MD', lat: 39.64, lon: -77.72, pop: 90000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0, pop: 2300000 }
  ],
  roads: ['I-81', 'I-83', 'I-76', 'I-283', 'US 322', 'US 11'],

  words: {
    street: ['Market Street', 'Third Street', 'Maclay Street', 'Derry Street', 'Front Street', 'Paxton Street'],
    water: ['the Susquehanna', 'Paxton Creek', 'the river'],
    hood: ['Allison Hill', 'Midtown', 'Uptown', 'Shipoke', 'Steelton', 'Bellevue Park', 'Camp Curtin', 'the West Shore', 'Lower Paxton'],
    thing: ['rowhouse', 'hoagie', 'scrapple', 'soft pretzel', 'shoofly pie', 'pierogi', 'fire hall', 'cellar', 'bridge', 'gas station run'],
    weather: ['ice storm', 'river flood', 'humid']
  },

  events: [
    { id: 'HARRISBURG_PA_EXPO_GRIDLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The big expo week has the north end roads jammed, and the show is across town.',
      title: 'The expo week eats the roads',
      body: 'Eight days of expo crowds have the north end at a crawl, and the van from Baltimore is stuck in it somewhere on the way to your show.',
      options: [
        { id: 'EARLY', label: 'Move doors up an hour so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You opened doors an hour early, and the people who came left work before the roads locked up.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Most of the people who have to cross the north end stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The expo crowd had the roads, and half the list never made the trip.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'HARRISBURG_PA_RIVER_FEST', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [9] },
      telegraph: 'The riverfront is filling up for the holiday weekend, and every parking spot is spoken for.',
      title: 'The river is full',
      body: 'The holiday weekend has the riverfront packed and the parking gone. Your show starts as the fireworks end, and the kids from the West Shore have to cross a bridge in the middle of all of it.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fireworks are over', likely: 'The people who want a night out come in late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'You opened doors an hour late, and the crowd came in off the riverfront, loud and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is down at the river.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed on the riverbank, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'HARRISBURG_PA_LICENSE_PULLED', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'A club across town just lost its license, and the other bookers are scrambling.',
      title: 'The club loses its license',
      body: 'The city shut the room on your routing over a tax bill with the bands already on the road, and the show has to go somewhere within the week.',
      options: [
        { id: 'HOUSE', label: 'Move the whole bill to a house', likely: 'It\'s smaller and louder, and nobody can pull a house license.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill with a day to spare, and the floor was packed.' },
        { id: 'HALL', label: 'Find a hall and eat the rent', likely: 'It costs forty dollars, and the hall wants a say in the bill.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A borough hall took the bill, and the board watched from the kitchen.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody trusts you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'HARRISBURG_PA_CURFEW_SWEEP', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12, 1, 2, 3, 4, 5] },
      telegraph: 'The city says it will enforce the youth curfew, and police are returning kids to their parents.',
      title: 'The curfew is reinforced',
      body: 'Police are stopping anyone under 18 on the walk home after ten on a school night. Your all-ages show runs past that, and the kids know it.',
      options: [
        { id: 'EARLY', label: 'End the show early so nobody walks home late', likely: 'It\'s a short night, and the parents like it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The show was done by ten, the kids got home in time, and the parents noticed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The younger kids leave early or stay home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The youngest left at nine-thirty, and the floor thinned out by the last band.' }
      ] }
  ]
});
