SB.Cities.register('youngstown-oh', {
  v: 1,
  slug: 'youngstown-oh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ysu', 'youngstown state', 'youngstown state university', 'kent state', 'kent state university', 'brier hill festival', 'brier hill pizza', 'brier hill-style pizza',
           'canfield fair', 'mahoning county fair', 'youngstown air reserve station', 'idora park', 'idora', 'mill creek park', 'greyhound', 'amtrak', 'vfw', 'american legion',
           'st. patrick\'s day parade', 'ohio turnpike', 'covelli centre', 'covelli', 'eastwood mall', 'southern park mall', 'youngstown vindicator', 'vindicator',
           'tribune chronicle', 'wkbn', 'wfmj', 'ysu penguins', 'penguins', 'eastern gateway community college',
           'bessemer basement', 'slag hill social club', 'lanterman lot', 'open hearth annex', 'local 1462 hall', 'furnace room', 'cinder street rec',
           'fosterville pool hall', 'coke oven pizza back room', 'midlothian roller palace',
           'stambaugh stadium', 'vindy', 'tribtoday', 'mahoning matters', 'ideastream', 'downtown event calendar', 'debartolo commons', 'greater youngstown italian fest',
           'ribs n rock', 'panerathon', 'pickle fest', 'sparkle light-up night', 'flea on phelps', 'youngstown live', 'cleveland scene'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 1984 fire is written only as 'the old fire'. */
  blocklist: ['vindicator*', 'ysu*', 'youngstown state*', 'idora*', 'brier hill festival*', 'covelli*', 'canfield fair*'],

  blurb: ['A half-empty Rust Belt steel town on the Mahoning River, an hour from Cleveland and from Pittsburgh. Rent is nearly free, and the crowd is small, tired and proud.',
          'Somebody always has a basement and a PA, but the ambitious kids drive away in either direction.'],
  hard: 'A fill-date town: small local crowds, and the best kids leave for Cleveland or Pittsburgh.',
  region: 'the Rust Belt',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Youngstown' },
    { id: 'struthers', kind: 'FEEDER', name: 'Struthers and Campbell', minutes: 10, bearing: 130, note: 'Small old mill towns along the river with Eastern European and Italian families.' },
    { id: 'boardman', kind: 'FEEDER', name: 'Boardman', minutes: 15, bearing: 180, note: 'The big suburb: malls and chain strips. Kids come in by car.' },
    { id: 'austintown', kind: 'FEEDER', name: 'Austintown', minutes: 15, bearing: 270, note: 'A suburb where the interstates meet; a few bands.' },
    { id: 'canfield', kind: 'FEEDER', name: 'Canfield and Poland', minutes: 15, bearing: 160, note: 'Wealthy suburbs. Kids come for shows and parents worry.' },
    { id: 'girard', kind: 'FEEDER', name: 'Girard and Niles', minutes: 20, bearing: 350, note: 'Old mill towns to the north.' },
    { id: 'hubbard', kind: 'FEEDER', name: 'Hubbard, Sharon and Hermitage', state: 'PA', minutes: 25, bearing: 55, note: 'State-line mill and shopping towns to the east.' },
    { id: 'warren', kind: 'FEEDER', name: 'Warren', minutes: 25, bearing: 320, note: 'A twin to Youngstown with its own cheap houses and bands. Trades the most acts.' },
    { id: 'salem', kind: 'FEEDER', name: 'Salem', minutes: 30, bearing: 215, note: 'A small farm-country town where a few kids drive in.' },
    { id: 'new-castle', kind: 'FEEDER', name: 'New Castle', state: 'PA', minutes: 35, bearing: 85, note: 'The outer reach of the mill towns; a couple of kids drive.' },
    { id: 'alliance', kind: 'FEEDER', name: 'Alliance', minutes: 40, bearing: 250, note: 'A small college town to the west.' },
    { id: 'east-liverpool', kind: 'FEEDER', name: 'East Liverpool', minutes: 50, bearing: 150, note: 'A river town on the Ohio at the end of the freeway.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 60, bearing: 265, slug: 'akron-oh', note: 'The nearest bigger music city: peer and big brother.' },
    { id: 'canton', kind: 'PEER', name: 'Canton', minutes: 60, bearing: 235, slug: 'canton-oh', note: 'A similar decayed industrial town. Youngstown sees it as boring; Canton sees Youngstown as tougher.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 100, bearing: 25, slug: 'erie-pa', note: 'A lake city with more college and a more independent scene.' },
    { id: 'wheeling', kind: 'PEER', name: 'Wheeling', state: 'WV', minutes: 95, bearing: 165, note: 'A smaller river and mill town to the south.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Youngstown', route: 'downtown', note: 'Offices, courts and a few bars among surface lots and empty upper floors. A couple of storefront rooms.' },
    { id: 'university', name: 'Wick Park and the university', route: 'campus', note: 'Big old houses with real basements and porches around the campus, and a bar strip. Student-run events.' },
    { id: 'smoky-hollow', name: 'Smoky Hollow', route: 'downtown', note: 'An old industrial district being remade as an arts and maker area. Converted warehouse and storefront rooms.' },
    { id: 'brier-hill', name: 'Brier Hill', route: 'old-side', note: 'The old Italian neighborhood: social-club basements, church halls and a few houses.' },
    { id: 'north-heights', name: 'North Heights and Crandall Park', route: 'old-side', note: 'Single-family houses, many vacant. Cheap and mostly ignored; house and garage shows.' },
    { id: 'south-side', name: 'the South Side', route: 'work-side', note: 'The densest part of the city: stone-basement houses, corner-store lots and club halls on the main avenues.' },
    { id: 'west-side', name: 'the West Side', route: 'work-side', note: 'Stable bungalow streets with garages and backyards. The neighbors are the main constraint.' },
    { id: 'east-side', name: 'the East Side', route: 'work-side', note: 'Mostly vacant land and empty buildings. Almost nothing sanctioned, but a one-off is possible.' },
    { id: 'boardman-edge', name: 'Boardman and the south suburbs', route: 'campus', note: 'Strip malls, roller rinks and banquet halls just outside the city line for an all-ages bill.' }
  ],

  rooms: [
    { id: 'heights-basement', kind: 'HOUSE', hood: 'north-heights', cap: 40, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45],
      pressure: 40, start: true, note: 'A basement under a house on a half-empty block. Nobody to complain, but a landlord or a sale can end it.' },
    { id: 'wick-house', kind: 'HOUSE', hood: 'university', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 40],
      pressure: 55, note: 'A big old campus house with a real basement. Student-run, so it changes every autumn, and the stable streets call it in.' },
    { id: 'bungalow-garage', kind: 'HOUSE', hood: 'west-side', cap: 30, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 45],
      pressure: 50, note: 'A bungalow garage and backyard. Summer only, and the neighbors are the whole constraint.' },
    { id: 'alley-room', kind: 'CLUB', hood: 'west-side', cap: 400, houseCosts: 150, split: .8, pa: .85, ages: ['A21', 'A18', 'ALL'], curfew: 1440, ac: true, following: .6, sketch: 15,
      standing: [50, 70, 70], pressure: 55, owner: 'TALENT_BUYER', notice: 35, needs: ['FULL_BILL'],
      note: 'A bowling alley with a pizza counter and a stage, reborn as a rock room. It holds the whole scene up, and the roof and the lease are never safe.' },
    { id: 'belmont-bar', kind: 'BAR', hood: 'downtown', cap: 200, soundFee: 50, pa: .65, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], pressure: 55, note: 'A small bar with a stage on the nightlife strip. Downtown redevelopment is squeezing it.' },
    { id: 'funeral-bar', kind: 'BAR', hood: 'west-side', cap: 150, soundFee: 40, pa: .6, ages: ['ALL', 'A21'], matinee: true, curfew: 1440, ac: true, following: .3, sketch: 25,
      standing: [55, 65, 65], note: 'A former funeral home turned into a live room. The quiet chapel is the green room.' },
    { id: 'hollow-room', kind: 'CLUB', hood: 'smoky-hollow', cap: 120, houseCosts: 80, split: .8, pa: .6, ages: ['ALL'], curfew: 1350, ac: false, following: .3, sketch: 30,
      standing: [55, 65, 55], pressure: 50, owner: 'LANDLORD', note: 'A converted warehouse room in the district being remade as an arts quarter. The rent rises with every new studio.' },
    { id: 'brier-hall', kind: 'HALL', hood: 'brier-hill', cap: 150, rent: 150, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A social-club basement on the old Italian hill, shared with a wedding or a fish fry. The membership is falling.' },
    { id: 'south-hall', kind: 'HALL', hood: 'south-side', cap: 200, rent: 200, deposit: 75, pa: .6, curfew: 1320, ac: true, sketch: 15, standing: [55, 60, 60],
      owner: 'HALL_MANAGER', pressure: 55, note: 'A club hall on the main avenue. The board worries about insurance, and the city has shut halls before.' },
    { id: 'storefront-shop', kind: 'SHOP', hood: 'downtown', cap: 60, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [65, 65, 70],
      note: 'A storefront art and record space downtown. These do not last, so go while it is open.' },
    { id: 'rink-room', kind: 'OUTDOOR', hood: 'boardman-edge', cap: 150, rent: 25, pa: .5, curfew: 1260, ac: true, sketch: 15, standing: [60, 55, 55],
      note: 'A banquet hall or roller rink outside the city line, for a clean all-ages bill. Out by nine.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 900, rent: 2000, deposit: 500, pa: 1, ages: ['A18'], curfew: 1380, ac: true, sketch: 5, standing: [45, 65, 65],
      owner: 'TALENT_BUYER', notice: 90, note: 'The downtown arena takes touring shows only. No local band plays it, but it takes the town\'s attention.' }
  ],

  contacts: ['akron-oh', 'canton-oh', 'erie-pa', 'pittsburgh', 'cleveland'],

  calendar: [
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 5, dows: [2, 3, 4, 5, 6, 0], can: [.85, .88, .90] },
    { id: 'italian-fest', label: 'the downtown Italian festival', tag: 'festival', month: 8, week: 1, dows: [5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth-parades', label: 'the Fourth of July parades', tag: 'parade', month: 7, week: 1, dows: [4, 5, 6], can: [.95, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [3, 5], can: [.85, .95, .95], hoods: ['university'], elsewhere: [.97, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [3, 5], can: [.85, .95, .95], hoods: ['university'], elsewhere: [.97, 1, 1] },
    { id: 'light-up', label: 'the holiday parade and light-up night', tag: 'parade', month: 12, week: 1, dows: [4, 5], can: [1.08, 1.05, 1.05], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },


  events: [
    { id: 'YOUNGSTOWN_OH_ROOM_FLOOD', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5, 6, 7, 8] },
      telegraph: 'It has rained all week and the bowling-alley room is taking on water.',
      title: 'The rock room is under water',
      body: 'The flood shut the one room that holds the scene up, on show night, and the bill has to land somewhere with a stage by dark.',
      options: [
        { id: 'STOREFRONT', label: 'Move the bill to a storefront', likely: 'It\'s smaller and rougher, and on short notice.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A storefront downtown took the bill. It was cramped, and the floor held.' },
        { id: 'BASEMENT', label: 'Move it to a basement', likely: 'It\'s smaller and louder.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .5 }],
          result: 'A basement on the north side took the bill, and everyone packed in.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] },

    { id: 'YOUNGSTOWN_OH_FAIR_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'fair' },
      telegraph: 'Every kid in the south suburbs is at the fair this week, and the highways are jammed.',
      title: 'The valley is at the fair',
      body: 'The fair has the whole valley on the roads, and your show is the same night, so the only crowd left is the old heads who hate it.',
      options: [
        { id: 'OLDHEADS', label: 'Book it for the old heads', likely: 'It\'s smaller, but the people who come stay late.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The old heads filled the front and stayed to the last note.' },
        { id: 'LATE', label: 'Push doors back until the fair lets out', likely: 'The crowd arrives late and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at ten, and the fair crowd came in sunburned and ready.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Half the list is at the fair.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The room was thin, and the bands played to the people who came.' }
      ] },

    { id: 'YOUNGSTOWN_OH_HALL_SHUT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The city is looking at the South Side hall again after a complaint.',
      title: 'The city shuts the hall',
      body: 'The city closed the South Side hall by order after a complaint, so the booker has to find where the hall board\'s insurance lets the bill go.',
      options: [
        { id: 'OTHERHALL', label: 'Move to the other hall', likely: 'You get a different crowd and a different rule list.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The hill hall took the bill between a wedding and a fish fry.' },
        { id: 'HOUSE', label: 'Move to a house', likely: 'It\'s smaller, and nobody has to ask the board.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill, and the floor was packed.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ],

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0, pop: 2400000 },
    { name: 'Kent', state: 'OH', lat: 41.15, lon: -81.36, pop: 30000 },
    { name: 'Wheeling', state: 'WV', lat: 40.06, lon: -80.72, pop: 27000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2100000 }
  ],
  roads: ['I-80', 'I-76', 'I-680', 'SR 11', 'US 422', 'US 62'],

  words: {
    street: ['Market Street', 'Mahoning Avenue', 'Belmont Avenue', 'Glenwood Avenue', 'Madison Avenue', 'Federal Street'],
    water: ['the Mahoning River', 'Mill Creek', 'Lake Erie'],
    hood: ['Wick Park', 'Smoky Hollow', 'Brier Hill', 'Crandall Park', 'Oak Hill', 'Fosterville', 'Lansingville', 'Belle Vista', 'Cornersburg', 'Boardman'],
    thing: ['social club', 'parish hall', 'stone basement', 'vacant lot', 'mill yard', 'lake-effect snow', 'double house', 'fish fry', 'leftover bar', 'vacant block'],
    weather: ['lake-effect snow', 'whiteout']
  }
});
