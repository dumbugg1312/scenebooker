SB.Cities.register('anchorage-ak', {
  v: 1,
  slug: 'anchorage-ak',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['joint base elmendorf-richardson', 'elmendorf', 'jber', 'university of alaska anchorage', 'uaa', 'alaska pacific university', 'fur rendezvous', 'fur rondy',
           'running of the reindeer', 'iditarod', 'tour of anchorage', 'mayor\'s marathon', 'first friday', 'girdwood forest fair', 'alaska state fair', 'mount marathon',
           'permanent fund dividend', 'pfd', 'people mover', 'anchorage daily news', 'alaska public media', 'xtratufs', 'american legion', 'vfw', 'elks', 'moose lodge',
           'the tudor annex', 'port road cold storage', 'boniface boiler room', 'turnagain grange', 'the sixty-below hall', 'dimond drive-in lounge', 'the glacier mint',
           'muldoon mattress annex', 'chugach elks annex', 'the fireweed lanes', 'seaplane hangar 9', 'the moose pass social club'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['iditarod*', 'fur rondy*', 'fur rendezvous*', 'alaska pacific*', 'jber*', 'people mover*', 'xtratufs*'],

  blurb: ['A stretched-out city at the end of the road system, where metal heads and kids share the few all-ages doors that stay open.',
          'Rooms come and go, so every show feels like one worth showing up for. Touring bands fly in and borrow a backline, and in winter the light is gone by four.'],
  hard: 'Few all-ages rooms, long winters, and a flight to anywhere.',
  region: 'Alaska',
  missing: 'An all-ages room that pays its own rent.',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 },
    { name: 'Bellingham', state: 'WA', lat: 48.75, lon: -122.48 },
    { name: 'Olympia', state: 'WA', lat: 47.04, lon: -122.90 }
  ],

  tilt: [
    { fan: 'metal', band: 'hardcore', d: .10, reason: 'Metal is the old core here, and it shares a room with the one place that will have punk.' },
    { fan: 'hardcore', band: 'metal', d: .10, reason: 'Metal is the old core here, and it shares a room with the one place that will have punk.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Anchorage' },
    { id: 'eagle-river', kind: 'FEEDER', name: 'Eagle River and Chugiak', minutes: 25, bearing: 57, scene: 110, bands: 2, beyond: 'glenn-highway', gens: [.40, .45, .15],
      note: 'The commuter suburb up the Glenn: big lots, big high schools and the kids with the shops. The largest source of teen bands.',
      rooms: [{ id: 'er-shop', kind: 'HOUSE', hood: 'eagle-river', cap: 50, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 10, standing: [70, 55, 45], pressure: 40,
               note: 'A big detached shop behind a house in Eagle River. Insulated and wired, and nobody can hear you.' }] },
    { id: 'wasilla', kind: 'FEEDER', name: 'Wasilla', minutes: 50, bearing: 31, scene: 100, bands: 2, beyond: 'glenn-highway', lean: ['metal', 'hardcore'],
      note: 'The big-box town of the Valley. A scene of school bands and garages, and the most reliable crowd from out of town.' },
    { id: 'palmer', kind: 'FEEDER', name: 'Palmer', minutes: 50, bearing: 45, pop: 5900, scene: 40, beyond: 'glenn-highway', note: 'An old farm town turned suburb, with a small DIY scene of its own.' },
    { id: 'girdwood', kind: 'FEEDER', name: 'Girdwood', minutes: 55, bearing: 128, pop: 2000, beyond: 'seward-highway',
      note: 'A tiny ski town on Turnagain Arm with a lively local-music community. The grown-ups drive in.' },
    { id: 'big-lake', kind: 'FEEDER', name: 'Big Lake', minutes: 70, bearing: 355, scene: 40, beyond: 'glenn-highway', note: 'Lake-and-cabin country: trucks, snowmachines and basements full of gear.' },
    { id: 'sutton', kind: 'FEEDER', name: 'Sutton and Chickaloon', minutes: 75, bearing: 55, scene: 15, beyond: 'glenn-highway', note: 'A mountain-pass road, coal and farm country. Very few kids.' },
    { id: 'whittier', kind: 'FEEDER', name: 'Whittier', minutes: 90, bearing: 127, pop: 300, beyond: 'whittier-tunnel',
      note: 'A harbor town reached through a one-lane tunnel on a fixed schedule. Leave before it closes or sleep in the van.' },
    { id: 'willow', kind: 'FEEDER', name: 'Willow', minutes: 90, bearing: 352, scene: 15, beyond: 'glenn-highway', note: 'Rural and tiny, up the Parks Highway.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'glenn-highway', name: 'the Glenn Highway', p: .02 },
    { id: 'seward-highway', name: 'the Seward Highway', p: .015 },
    { id: 'whittier-tunnel', name: 'the Whittier tunnel', p: .01 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The grid by the water and Ship Creek: bars, hotels and street crowds for the winter carnival and the sled-dog start. Parking disappears on event days.' },
    { id: 'fairview', name: 'Fairview', route: 'work-side', note: 'Working-class, mixed and old, with low commercial buildings, warehouses and rented fourplexes. The historic home of the city\'s underground, and still cheap and ignored.' },
    { id: 'mountain-view', name: 'Mountain View', route: 'old-side', note: 'The first suburb up the Glenn: small ranch houses, garages behind them and church halls. One of the most mixed neighborhoods in the country.' },
    { id: 'spenard', name: 'Spenard', route: 'downtown', note: 'Old bungalows, bars with back rooms and breweries by the seaplane lake. The scruffy, anything-goes old neighborhood, and heating up.' },
    { id: 'government-hill', name: 'Government Hill', route: 'old-side', note: 'A compact old neighborhood on the bluff above the port, hemmed in by the base. Quiet, and barely any room for shows.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'Office parks, strip malls and hotel annexes with free parking and no neighbors. The best place to rent a unit by the night, and no neighborhood feel at all.' },
    { id: 'muldoon', name: 'Muldoon and Russian Jack', route: 'campus', note: 'Postwar subdivisions and apartment complexes toward the mountains, with military and immigrant families. Garages, common rooms and church halls.' },
    { id: 'south-anchorage', name: 'South Anchorage and the Hillside', route: 'campus', note: 'Newer subdivisions with real basements and detached shops, and parents with space. The easiest place for a garage show, if the covenants allow.' },
    { id: 'eagle-river', name: 'Eagle River and Chugiak', route: 'town:eagle-river', note: 'The suburb up the Glenn Highway, thirteen miles north, with big lots and trucks.' }
  ],

  rooms: [
    { id: 'shop', kind: 'HOUSE', hood: 'south-anchorage', cap: 50, hostCut: 0, pa: .4, curfew: 1320, outdoor: false, sketch: 15, standing: [75, 55, 45], pressure: 40, start: true,
      note: 'A detached shop with a woodstove behind a Hillside house. Insulated, wired, and nobody can hear you.' },
    { id: 'basement', kind: 'HOUSE', hood: 'south-anchorage', cap: 45, hostCut: 0, pa: .3, curfew: 1320, outdoor: false, sketch: 15, standing: [75, 50, 40], pressure: 50,
      note: 'A finished basement in the south-side subdivisions. A parents\' house, with covenants.' },
    { id: 'fourplex', kind: 'HOUSE', hood: 'fairview', cap: 30, hostCut: 0, pa: .3, curfew: 1320, outdoor: false, sketch: 35, standing: [60, 55, 40], pressure: 60,
      note: 'A rented fourplex in Fairview. Thin walls, a landlord who checks, and heat that works.' },
    { id: 'mv-garage', kind: 'HOUSE', hood: 'mountain-view', cap: 40, hostCut: 0, pa: .4, curfew: 1350, outdoor: false, sketch: 25, standing: [65, 55, 45], pressure: 45,
      note: 'A garage behind a small house in Mountain View, with a propane heater.' },
    { id: 'warehouse', kind: 'DIY', hood: 'fairview', cap: 150, rent: 100, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 55, standing: [55, 60, 45], pressure: 65, needs: ['VOUCH'],
      note: 'A light-industrial unit in a back lot. It closes when the lease or the fire code catches up, and from October to April it closes when the heater does.' },
    { id: 'strip-unit', kind: 'DIY', hood: 'midtown', cap: 90, rent: 120, deposit: 100, pa: .5, curfew: 1380, ac: true, sketch: 30, standing: [55, 60, 50], pressure: 45,
      note: 'A strip-mall unit in Midtown. Free parking and nobody close enough to complain.' },
    { id: 'yard', kind: 'OUTDOOR', hood: 'spenard', cap: 80, rent: 10, pa: .4, curfew: 1380, sketch: 35, standing: [60, 55, 40],
      note: 'A yard by the lake, summer only. The sun is still up at ten and nobody can tell when to stop.' },
    { id: 'pizza-night', kind: 'SHOP', hood: 'spenard', cap: 70, pa: .4, curfew: 1380, ac: true, sketch: 10, standing: [70, 65, 70], following: .3,
      note: 'A restaurant that gives a weekday night over to punk. The one slot that keeps coming back.' },
    { id: 'back-room', kind: 'BAR', hood: 'spenard', cap: 130, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .4, sketch: 20,
      standing: [50, 65, 70], note: 'A bar with a back room and a roped-off minors section early on. The hub for the local players.' },
    { id: 'annex-bar', kind: 'BAR', hood: 'midtown', cap: 150, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1560, ac: true, following: .3, sketch: 15, standing: [40, 65, 70],
      note: 'A bar in a hotel annex. Free parking and tourists who wander in.' },
    { id: 'hall', kind: 'HALL', hood: 'muldoon', cap: 200, rent: 180, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 70], owner: 'HALL_MANAGER',
      note: 'A big hall off the base road, like the ones from the eighties. A stage, folding chairs and a bar that can be closed off.' },
    { id: 'church', kind: 'HALL', hood: 'mountain-view', cap: 120, rent: 90, deposit: 0, pa: .5, curfew: 1320, ac: true, sketch: 5, standing: [70, 60, 60], owner: 'CHURCH_CONTACT',
      pressure: 50, note: 'A church hall in Mountain View. No beer, over early.' }
  ],

  contacts: [{ name: 'Fairbanks', state: 'AK', lat: 64.84, lon: -147.72 }, { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33 }, { name: 'Juneau', state: 'AK', lat: 58.30, lon: -134.42 }],

  calendar: [
    { id: 'carnival', label: 'the winter carnival', tag: 'festival', month: 2, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'sled-start', label: 'the sled-dog start', tag: 'race', month: 3, week: 1, dows: [5], can: [.80, .78, .78], hoods: ['downtown', 'fairview'], elsewhere: [.95, .95, .95] },
    { id: 'fair-aug', label: 'the state fair', tag: 'fair', month: 8, weeks: [4, 5], dows: [4, 5, 6], can: [.90, .92, .95] },
    { id: 'fair-sep', label: 'the state fair', tag: 'fair', month: 9, week: 1, dows: [4, 5, 6], can: [.90, .92, .95] },
    { id: 'dividend', label: 'dividend week', tag: 'payday', month: 10, week: 1, dows: [4, 5], can: [1.08, 1.05, 1.03] },
    { id: 'hunting', label: 'hunting weekend', tag: 'hunting', month: 9, weeks: [1, 2], dows: [4, 5, 6], can: [1, .88, .82] },
    { id: 'holidays', label: 'the holidays', tag: 'holiday', month: 12, weeks: [4, 5], can: [.80, .85, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'Fairbanks', state: 'AK', lat: 64.84, lon: -147.72, pop: 95000 },
    { name: 'Juneau', state: 'AK', lat: 58.30, lon: -134.42, pop: 32000 },
    { name: 'Talkeetna', state: 'AK', lat: 62.32, lon: -150.11, pop: 1000 },
    { name: 'Seward', state: 'AK', lat: 60.10, lon: -149.44, pop: 2700 },
    { name: 'Soldotna', state: 'AK', lat: 60.49, lon: -151.06, pop: 4400 },
    { name: 'Seattle', state: 'WA', lat: 47.61, lon: -122.33, pop: 4000000 }
  ],
  roads: ['Glenn Highway', 'Parks Highway', 'Seward Highway', 'Minnesota Drive', 'Northern Lights Boulevard', 'Muldoon Road'],

  words: {
    street: ['Fourth Avenue', 'Spenard Road', 'Northern Lights Boulevard', 'Benson Boulevard', 'Minnesota Drive', 'Muldoon Road', 'Dimond Boulevard', 'Tudor Road',
             'Boniface Parkway', 'Gambell Street', 'Ingra Street', 'Old Seward Highway', 'C Street'],
    water: ['Cook Inlet', 'Turnagain Arm', 'Knik Arm', 'Ship Creek', 'Lake Hood', 'Chester Creek'],
    hood: ['Fairview', 'Mountain View', 'Spenard', 'Government Hill', 'Midtown', 'Muldoon', 'Russian Jack', 'Dimond', 'the Hillside', 'Eagle River', 'Chugiak'],
    thing: ['shop', 'woodstove', 'block heater', 'studded tires', 'espresso hut', 'snowmachine', 'snow berm', 'moose', 'sourdough', 'rubber boots', 'all-ages room', 'borrowed backline'],
    weather: ['break-up', 'termination dust', 'whiteout', 'black ice', 'cold snap', 'midnight sun']
  },

  events: [
    { id: 'ANCHORAGE_AK_ROAD_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'The highways are bad this week, with slides and wrecks.',
      title: 'A road is closed',
      body: 'A wreck or a slide has closed {chokepoint} the night of your show. The kids from up the road can\'t get through, and the nearest way around is a day away.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can try to get through', likely: 'Some of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who really wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people from outside town.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The road stayed shut, and the people from out of town stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads waited out the closure together and came in when the road opened.' }
      ] },

    { id: 'ANCHORAGE_AK_SLED_START', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The sled-dog start is Saturday, and downtown will be solid people.',
      title: 'The sled-dog start has downtown',
      body: 'The ceremonial start has Fourth Avenue packed, the hotels full and the parking gone. Half the city is downtown, and none of it is coming to your show.',
      options: [
        { id: 'EARLY', label: 'Open early and tell everyone to park far away', likely: 'Most get in before the crowds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You opened doors an hour early, and the people who came parked a mile away and walked in the snow.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The streets stayed full, and half the list went to the parade instead.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'ANCHORAGE_AK_LOST_BACKLINE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show', 'touring'],
      if: { daysOut: [0, 2] },
      telegraph: 'The touring band flew in, but their gear didn\'t.',
      title: 'The amps did not make the connection',
      body: '{touring} flew in through Seattle, but their amps and cymbals didn\'t. You have a few hours to borrow gear from three suburbs.',
      options: [
        { id: 'BORROW', label: 'Borrow from the local bands', likely: 'It works, and it sounds like borrowed gear.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'TRUST', who: '$touring', d: -1 }],
          result: 'You got three amps from three garages, and the sound was thin, but everyone was kind about it.' },
        { id: 'RENT', label: 'Rent a backline', likely: 'It costs eighty dollars, and you get a good night.',
          effects: [{ op: 'MONEY', amount: -80 }],
          result: 'A van of rented amps showed up at five, and the show went off without a hitch.' },
        { id: 'SHORT', label: 'Run short and play on what is there', likely: 'They play a short set on borrowed drums.',
          effects: [{ op: 'CUT_SET', who: '$touring', minutes: 10 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'It was a short set with a lot of apologies, and the crowd forgave it.' }
      ] },

    { id: 'ANCHORAGE_AK_BREAK_UP_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5], roomKind: ['HOUSE', 'DIY'] },
      telegraph: 'It\'s break-up, the snow is going, and the yards are lakes.',
      title: 'Break-up has the basement',
      body: 'The meltwater is coming under the wall, and two days before the show the floor is an inch deep in mud and slush.',
      options: [
        { id: 'MOVE', label: 'Move the show to a hall', likely: 'You get a bigger room and a rental fee, and some of the crowd follows.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -60 }],
          result: 'A hall took the bill, and it was dry and a little bare.' },
        { id: 'BAIL', label: 'Bail it out and play on', likely: 'It\'s wet and loud, and the crowd is thin.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'STRESS', d: 3 }],
          result: 'Everyone stood on pallets, and the band played in rubber boots.' }
      ] }
  ]
});
