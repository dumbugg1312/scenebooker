SB.Cities.register('state-college-pa', {
  v: 1,
  slug: 'state-college-pa',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['penn state', 'pennsylvania state university', 'beaver stadium', 'blue-white game', 'thon', 'central pennsylvania festival of the arts',
           'centre county grange', 'grange fair', 'grange encampment', 'sheetz', 'cata', 'nittany lions', 'nittany lion', 'whiteout',
           'lock haven university', 'juniata college', 'bucknell', 'bloomsburg university', 'lycoming college', 'penn college', 'little league world series',
           'university of pittsburgh at johnstown', 'happy valley latin festival', 'first night state college', 'fall fest',
           'mount nittany annex', 'the pump house', 'the orchard basement', 'the ridge street rec room', 'nittany valley grange', 'the sub basement',
           'bald eagle fire company social hall', 'the greenhouse room', 'hollow road hall', 'the cheese shop loft',
           'penn state university park', 'university park', 'beaver stadium', 'bryce jordan center', 'white out', 'onward state', 'daily collegian', 'statecollege.com',
           'centre daily times', 'wpsu', 'valley magazine', 'state college police department', 'pennsylvania liquor control board', 'plcb',
           'central pennsylvania festival of the arts', 'talleyrand park', 'schlow library', 'mount nittany medical center', 'altoona mirror'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Real institutions appear only as generic phrases in game text. */
  blocklist: ['penn state*', 'beaver stadium*', 'sheetz*', 'nittany lion*', 'bucknell*', 'grange fair*', 'thon*'],

  blurb: ['A huge college town with a small punk pocket, reset by every lease and every football Saturday.',
          'Rooms last a year, then the seniors graduate. Summers are empty.'],
  hard: 'Students leave in summer and football eats the fall Saturdays.',
  region: 'central Pennsylvania',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.00 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'State College' },
    { id: 'boalsburg', kind: 'FEEDER', name: 'Boalsburg', minutes: 10, bearing: 115, note: 'A historic farm village with few shows of its own.' },
    { id: 'pine-grove-mills', kind: 'FEEDER', name: 'Pine Grove Mills and Port Matilda', minutes: 20, bearing: 255, note: 'Villages to the south and west where a hall show is possible.' },
    { id: 'bellefonte', kind: 'FEEDER', name: 'Bellefonte', minutes: 20, bearing: 50, scene: 100, note: 'An old Victorian county seat with big old buildings: the likeliest cheap rentable hall, and a low-key scene of its own.', bands: 1 },
    { id: 'tyrone', kind: 'FEEDER', name: 'Tyrone', minutes: 40, bearing: 225, note: 'A paper-mill town; the kids drive out to State College.' },
    { id: 'philipsburg', kind: 'FEEDER', name: 'Philipsburg', minutes: 40, bearing: 295, note: 'A former coal and glass town up the road.' },
    { id: 'lewistown', kind: 'FEEDER', name: 'Lewistown', minutes: 45, bearing: 145, note: 'An old industrial county seat ringed by Amish and Mennonite farmland.' },
    { id: 'clearfield', kind: 'FEEDER', name: 'Clearfield', minutes: 50, bearing: 305, note: 'A county seat by the interstate, where kids from the northern corridor come in.' },
    { id: 'lock-haven', kind: 'FEEDER', name: 'Lock Haven', minutes: 50, bearing: 30, note: 'A small college town on the river with a modest scene of its own, and a flood town.', bands: 1 },
    { id: 'huntingdon', kind: 'FEEDER', name: 'Huntingdon', minutes: 55, bearing: 180, note: 'A small college town to the south; a tiny scene likely.' },
    { id: 'altoona', kind: 'PEER', name: 'Altoona', minutes: 45, bearing: 220, scene: 600, note: 'A former railroad city and the nearest peer; bands trade back and forth and it is the cheaper show.' },
    { id: 'williamsport', kind: 'PEER', name: 'Williamsport', minutes: 75, bearing: 55, scene: 450, note: 'A modest scene of its own with two colleges; people drive between the two for shows.' },
    { id: 'johnstown', kind: 'PEER', name: 'Johnstown', minutes: 90, bearing: 240, scene: 350, note: 'A fallen steel town in a flood valley: smaller and grittier.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 105, bearing: 115, slug: 'harrisburg-pa', note: 'A bigger state-capital scene, and the way east to the I-81 corridor.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, bookstores and alleys between campus and Beaver Avenue, with tall student apartments replacing small cheap buildings.' },
    { id: 'highlands', name: 'the Highlands', route: 'old-side', note: 'The biggest neighborhood: big old rented houses with basements near campus, a long-time house-show zone tolerated until a landlord or neighbor complains.' },
    { id: 'college-heights', name: 'College Heights and Holmes-Foster', route: 'old-side', note: 'Quiet, expensive blocks of faculty and retirees where neighbors call early.' },
    { id: 'west-end', name: 'the West End', route: 'campus', note: 'Newer apartment complexes, strip commercial and light industrial buildings that rent cheap for practice rooms.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Small old houses of townies and older workers, with backyards, garages and the odd porch show.' },
    { id: 'orchard-park', name: 'Orchard Park and Penfield', route: 'campus', note: 'Suburban-style apartments and families toward the borough edge; living-room shows at most.' },
    { id: 'bellefonte-hood', name: 'Bellefonte', route: 'town:bellefonte', note: 'An old Victorian county seat of big brick buildings: the cheap hall in the next borough, and nobody grading your lease.' }
  ],

  rooms: [
    { id: 'highlands-basement', kind: 'HOUSE', hood: 'highlands', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rented basement in an old frame house near campus. The lease year and one neighbor decide how long it lasts.' },
    { id: 'coop-house', kind: 'HOUSE', hood: 'highlands', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A living-room set in a band house near campus. The name on the lease changes every August.' },
    { id: 'south-end-garage', kind: 'HOUSE', hood: 'south-end', cap: 50, curfew: 1320, ac: false, outdoor: false,
      note: 'A garage and a backyard in a townie neighborhood. Safer from student landlords, closer to neighbors of thirty years.' },
    { id: 'side-street-room', kind: 'DIY', hood: 'downtown', cap: 80, curfew: 1350, ac: false, pressure: 55,
      note: 'A student-and-local run all-ages room on a downtown side street. Rent and redevelopment decide whether it is still there.' },
    { id: 'practice-unit', kind: 'DIY', hood: 'west-end', cap: 50, curfew: 1320, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A practice-room unit in a light-industrial strip. A Saturday set is possible until the landlord finds out.' },
    { id: 'bellefonte-hall', kind: 'HALL', hood: 'bellefonte-hood', cap: 150, curfew: 1350, ac: true,
      note: 'A fire-company or lodge hall in the next borough, rented one night at a time.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 200, ages: ['A21'], curfew: 1500, ac: true, pressure: 60,
      note: 'A back-room stage on the main strip. The state has been hard on the borough\'s bars over noise and disorder.' },
    { id: 'all-ages-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1410, ac: true,
      note: 'A club in a former bar that wants under-21s in and sells no drink of its own. It leans world music and touring indie, so punk is a rental.' }
  ],

  contacts: ['harrisburg-pa', 'lancaster-pa', 'pittsburgh', 'reading-pa'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4, 5], can: [.70, .80, .80], hoods: ['downtown', 'highlands'], elsewhere: [.85, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4, 5], can: [.70, .80, .80], hoods: ['downtown', 'highlands'], elsewhere: [.85, .90, .90] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [4, 5], can: [.70, .80, .80], hoods: ['downtown', 'highlands'], elsewhere: [.85, .90, .90] },
    { id: 'alumni-weekend', label: 'the alumni weekend', tag: 'game', month: 10, weeks: [2, 4], dows: [4, 5], can: [.75, .80, .80], hoods: ['downtown', 'highlands'], elsewhere: [.90, .92, .92] },
    { id: 'student-fundraiser', label: 'the student fundraiser weekend', tag: 'festival', month: 2, week: 3, dows: [4, 5, 6], can: [.85, .85, .85] },
    { id: 'move-out', label: 'move-out week', tag: 'holiday', month: 5, week: 1, dows: [4, 5, 6], can: [.85, .85, .85], hoods: ['highlands', 'west-end', 'orchard-park'], elsewhere: [1, 1, 1] },
    { id: 'summer-street-fest', label: 'the downtown summer festival', tag: 'festival', month: 7, week: 2, dows: [2, 3, 4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [3, 4], dows: [4, 5, 6], can: [.95, .93, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1140 },

  points: [
    { name: 'Altoona', state: 'PA', lat: 40.52, lon: -78.39, pop: 44000 },
    { name: 'Williamsport', state: 'PA', lat: 41.24, lon: -77.00, pop: 28000 },
    { name: 'Johnstown', state: 'PA', lat: 40.33, lon: -78.92, pop: 18000 }
  ],
  roads: ['I-99', 'I-80', 'US 322', 'US 220', 'PA 26', 'PA 45'],

  words: {
    street: ['College Avenue', 'Beaver Avenue', 'Allen Street', 'Atherton Street', 'Park Avenue', 'Westerly Parkway'],
    water: ['Spring Creek', 'the Bald Eagle Valley', 'Bald Eagle Creek'],
    hood: ['the Highlands', 'Orchard Park', 'Holmes-Foster', 'College Heights', 'Boalsburg', 'Lemont', 'Pine Grove Mills', 'Park Forest', 'Happy Valley'],
    thing: ['rent by the bedroom', 'tailgate', 'ridge road', 'hollow', 'move-out curb', 'Amish buggy', 'fire company hall', 'lease', 'football Saturday'],
    weather: ['lake effect', 'ridge fog']
  },

  events: [
    { id: 'STATE_COLLEGE_PA_GAME_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is a home weekend, and every bar, hotel and lot in the borough is already full.',
      title: 'The stadium takes the town',
      body: 'The bar with the back-room stage asks you to be done early so the crowd can get home before the stadium traffic. The hall in Bellefonte is the only free room within an hour.',
      options: [
        { id: 'EARLY', label: 'Move doors up to early evening', likely: 'The crowd gets home. A short night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors came up and the set times shrank. Everybody was home by the first kickoff story.' },
        { id: 'HALL', label: 'Move to the hall in the next borough', likely: 'Costs a favor. A smaller, calmer night.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The hall took the bill and the traffic never found it. The ones with a ride made the drive.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is in the stands.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The casual crowd was elsewhere. The regulars came, late and loud.' }
      ] },

    { id: 'STATE_COLLEGE_PA_MOVE_OUT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'holiday', months: [5, 8] },
      telegraph: 'The lease year turns over this week, and there are couches and speaker stacks on every curb.',
      title: 'The new tenants have never heard of you',
      body: 'The seniors who gave you the amp stack and the key are gone. The new tenants have never heard of you, and they are not sure they want a show.',
      options: [
        { id: 'VOUCH', label: 'Spend the afternoon on the porch with them', likely: 'Costs time. The house stays open.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two hours and a pizza later the new tenants said yes. The house is yours another year.' },
        { id: 'MOVE', label: 'Take the bill to a practice unit', likely: 'Cheap and loud, with a landlord who may not know.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The unit took the bill. It was loud and sweaty, and nobody asked questions.' },
        { id: 'ACCEPT', label: 'Play it and see', likely: 'The house may not be ready.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The new tenants stood in the doorway the whole night. It was fine, and nobody was sure why.' }
      ] },

    { id: 'STATE_COLLEGE_PA_RIDGE_SNOW', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'A snow band is sitting on the ridge road, and the plows are behind.',
      title: 'The ridge road is closed',
      body: 'The headliner from the west is stuck on the far side of the ridge, and the bill has a local opener who has never played two sets.',
      options: [
        { id: 'TWO', label: 'Let the local opener play twice', likely: 'A loose, odd night for the ones who came.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two sets, one band, and a lot of jokes. The room was half full and warm.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'A late start. People get restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van made it at ten. You started late and almost nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
