SB.Cities.register('johnson-city-tn', {
  v: 1,
  slug: 'johnson-city-tn',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['east tennessee state', 'east tennessee state university', 'etsu', 'buccaneers', 'ballad health', 'milligan university', 'milligan', 'king university', 'tusculum',
           'walters state', 'eastman chemical', 'eastman', 'appalachian state', 'virginia tech', 'tri-cities regional airport', 'johnson city transit', 'tweetsie trail',
           'founders park', 'fountain square', 'food city', 'ingles', 'hurricane helene', 'helene', 'csx', 'science hill', 'daniel boone high', 'model city', 'greyhound',
           'va medical center', 'johnson city press', 'wjhl', 'wets', 'wetb', 'wjcw', 'wqut', 'bristol rhythm', 'rhythm and roots', 'rhythm & roots', 'national storytelling festival',
           'storytelling festival', 'covered bridge days', 'fun fest', 'sycamore shoals', 'bristol motor speedway', 'waffle house', 'cook out', 'mountain dew', 'tabc',
           'the boilerhouse', 'boilerhouse', 'rayon hall', 'fountain annex', 'the switchyard', 'nolichucky room', 'hollow ridge hall', 'the roundhouse back lot',
           'lowgap social club', 'quarry lane garage', 'sycamore door', 'depot street basement', 'the gap',
           'visit johnson city', 'king commons', 'blue plum', 'brewgrass', 'east tennessean', 'northeast tennessee', 'bristol night race', 'food city 500', 'bass pro',
           'bristol dragway', 'tipton street', 'covered bridge jams', 'fridays after 5', 'william b. greene', 'greene stadium', 'southern conference', 'tennessee tech', 'samford',
           'west georgia', 'western carolina', 'watauga dam', 'bandsintown', 'songkick', 'setlist.fm'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university, the paper, the festivals and the storm are written only in generic form. */
  blocklist: ['johnson city press*', 'ballad health*', 'tweetsie*', 'bristol rhythm*', 'waffle house*', 'cook out*', 'food city*'],

  blurb: ['A hospital and college town in the valley where bluegrass is the official sound. The punks bring a banjo and a car.',
          'Shows live on porches, in yards and in church halls, and the night ends at a chain diner.'],
  hard: 'Small regional draw: few rooms, no real all-ages, and a car ride to everything.',
  region: 'Appalachia',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Johnson City' },
    { id: 'jonesborough', kind: 'FEEDER', name: 'Jonesborough', minutes: 15, bearing: 240, note: 'The state\'s oldest town, quiet and historic; a punk scene is unlikely.' },
    { id: 'elizabethton', kind: 'FEEDER', name: 'Elizabethton', minutes: 20, bearing: 100, note: 'An old rayon-mill county seat with a small college; the nearest town a local names first.' },
    { id: 'bluff-city', kind: 'FEEDER', name: 'Bluff City and Piney Flats', minutes: 20, bearing: 30, note: 'Tiny rural towns on the way to the state line.' },
    { id: 'erwin', kind: 'FEEDER', name: 'Unicoi and Erwin', minutes: 25, bearing: 175, note: 'A railroad town in the river gorge, hit by flooding; kids drive up for shows.' },
    { id: 'greeneville', kind: 'FEEDER', name: 'Greeneville', minutes: 40, bearing: 235, note: 'A church-heavy county seat with a thin scene.' },
    { id: 'roan-mountain', kind: 'FEEDER', name: 'Roan Mountain and Hampton', minutes: 40, bearing: 125, note: 'Mountain communities with long drives and little to do.' },
    { id: 'abingdon', kind: 'FEEDER', name: 'Abingdon', state: 'VA', minutes: 55, bearing: 50, note: 'An arts-and-theater town up I-81 with a community college.' },
    { id: 'rogersville', kind: 'FEEDER', name: 'Rogersville', minutes: 55, bearing: 280, note: 'A small farm and church county seat to the west.' },
    { id: 'mountain-city', kind: 'FEEDER', name: 'Mountain City', minutes: 60, bearing: 70, note: 'The highest town in the state, near the lake; a handful of kids make the drive.' },
    { id: 'morristown', kind: 'FEEDER', name: 'Morristown', minutes: 60, bearing: 240, pop: 30400, note: 'A factory town with a community college and a big Latino community.' },
    { id: 'kingsport', kind: 'PEER', name: 'Kingsport', minutes: 45, bearing: 30, slug: 'kingsport-tn', note: 'The tidy company-town sibling up I-26; the two mildly mock each other.' },
    { id: 'boone', kind: 'PEER', name: 'Boone', state: 'NC', minutes: 75, bearing: 135, scene: 500, note: 'A college mountain town over the line; crowds cross easily.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 110, bearing: 165, slug: 'asheville-nc', note: 'The better-known music town over the mountains that pulls bands and kids away.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 150, bearing: 50, slug: 'roanoke-va', note: 'A larger peer on the I-81 touring line.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The rail-junction core of old brick buildings: bar-and-restaurant rooms, storefronts and warehouse space by the tracks.' },
    { id: 'campus', name: 'the university and West Walnut', route: 'campus', note: 'Cheap student rentals and chain food by campus: where house shows live.' },
    { id: 'tree-streets', name: 'the Tree Streets', route: 'old-side', note: 'Small frame houses between downtown and campus, slowly renovating: the best bet for porch and backyard shows.' },
    { id: 'north-roan', name: 'North Roan Street and State of Franklin Road', route: 'campus', note: 'The retail strip of chains and big-box lots, where closed shops become practice rooms.' },
    { id: 'bristol-highway', name: 'the Bristol Highway and Unaka Avenue corridors', route: 'work-side', note: 'Old commercial arteries of motels, auto shops and light industry: cheap warehouse and shop space for practice rooms.' },
    { id: 'boones-creek', name: 'Boones Creek and Gray', route: 'work-side', note: 'The suburban-to-rural fringe of acreage, sheds and barns; the city and county argue over who polices it.' },
    { id: 'mountain-home', name: 'Mountain Home', route: 'old-side', note: 'Institutional hospital and veteran ground: not a show space, but it matters for the crowd.' }
  ],

  contacts: ['kingsport-tn', 'asheville-nc', 'roanoke-va', 'knoxville-tn', 'chattanooga-tn'],

  rooms: [
    { id: 'walnut-porch', kind: 'HOUSE', hood: 'campus', cap: 40, curfew: 1380, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A rented front room and porch by campus. The eleven o\'clock limit and a landlord are the whole threat.' },
    { id: 'tree-yard', kind: 'HOUSE', hood: 'tree-streets', cap: 60, curfew: 1380, ac: false, outdoor: true, pressure: 55,
      note: 'A backyard show on a small frame lot, one long extension cord and neighbors a fence away.' },
    { id: 'shop-room', kind: 'DIY', hood: 'bristol-highway', cap: 80, curfew: 1380, ac: false, outdoor: false,
      note: 'A practice room turned venue in a metal-roofed shop. The landlord and the fire marshal are the risks.' },
    { id: 'main-street-club', kind: 'CLUB', hood: 'downtown', cap: 150, ages: ['A18'], curfew: 1620, ac: true, pressure: 60, standing: [60, 65, 65],
      note: 'The only real punk and hardcore room in town: a small stage, cans of beer, and a second noise violation could cost the license.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'downtown', cap: 200, curfew: 1500, ac: true, standing: [50, 60, 60],
      note: 'A bar with a stage a few doors from the club, booking punk on the nights between cover bands.' },
    { id: 'listening-room', kind: 'BAR', hood: 'downtown', cap: 250, curfew: 1440, ac: true, standing: [45, 60, 60],
      note: 'An old listening room with a long history of independent bookings. Roots music is the rule and punk the exception.' },
    { id: 'post-hall', kind: 'HALL', hood: 'north-roan', cap: 150, curfew: 1320, ac: false, pressure: 45,
      note: 'A fellowship hall or veterans\' post rented by the night. The host\'s rules decide what you can play.' },
    { id: 'creek-lot', kind: 'OUTDOOR', hood: 'boones-creek', cap: 120, curfew: 1320, ac: false, outdoor: true, pressure: 55,
      note: 'A farm lot or skatepark with a generator, and the city and county arguing over who polices it.' },
    { id: 'campus-hall', kind: 'BIG', hood: 'campus', cap: 800, curfew: 1380, ac: true, standing: [40, 60, 55],
      note: 'A campus ballroom or arena a touring act might fill. The school books it and it is rarely punk.' }
  ],

  calendar: [
    { id: 'downtown-fest', label: 'the downtown music-and-arts festival', tag: 'festival', month: 6, week: 1, dows: [4, 5], can: [.85, .85, .80], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'race-spring', label: 'race weekend', tag: 'race', month: 4, week: 2, dows: [4, 5, 6], can: [.90, .88, .85] },
    { id: 'race-fall', label: 'race weekend, fall', tag: 'race', month: 9, week: 2, dows: [3, 4, 5], can: [.90, .88, .85] },
    { id: 'roots-fest', label: 'the roots festival', tag: 'festival', month: 9, weeks: [3, 4], dows: [4, 5, 6], can: [.92, .88, .85] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .92, .92], hoods: ['campus', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .92, .92], hoods: ['campus', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'graduation weekend', tag: 'graduation', month: 5, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['campus', 'tree-streets'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1380 },

  points: [
    { name: 'Knoxville', state: 'TN', lat: 35.96, lon: -83.92, pop: 190000 },
    { name: 'Bristol', state: 'TN', lat: 36.6, lon: -82.19, pop: 27000 },
    { name: 'Boone', state: 'NC', lat: 36.22, lon: -81.67, pop: 19000 },
    { name: 'Abingdon', state: 'VA', lat: 36.71, lon: -81.98, pop: 8000 }
  ],
  roads: ['I-26', 'I-81', 'US 11E', 'US 19W', 'US 321', 'US 23'],

  words: {
    street: ['West Walnut Street', 'North Roan Street', 'State of Franklin Road', 'Unaka Avenue', 'Market Street', 'Buffalo Street', 'Bristol Highway', 'Tree Streets'],
    water: ['the Nolichucky', 'Boone Lake', 'Watauga Lake', 'the Watauga'],
    hood: ['Boones Creek', 'Gray', 'Mountain Home', 'Piney Flats', 'Roan Mountain', 'Buffalo Mountain', 'the Tri-Cities'],
    thing: ['biscuit', 'pimento cheese', 'banana pudding', 'sweet tea', 'rail yard', 'tobacco barn', 'covered bridge', 'church sign', 'banjo', 'fiddle', 'porch', 'chain diner'],
    weather: ['mountain ice', 'valley fog', 'flash flood', 'thunderstorm']
  },

  events: [
    { id: 'JOHNSON_CITY_TN_RACE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'Every motel on the interstate is full and half the town has gone up the road to the track.',
      title: 'Race weekend empties the club',
      body: 'Everyone with a truck has left for the speedway. You have a full bill and a room that is going to hold ten people.',
      options: [
        { id: 'RUN', label: 'Run the full bill for whoever shows', likely: 'A tiny crowd and a loose, friendly night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'REGULARS', pct: .02 }],
          result: 'Ten people and five bands. It was the best sound check of the year.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'PORCH', label: 'Move the bill to a porch and keep it small', likely: 'Smaller and louder, and nobody pays a cover.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The bill fit on a porch and the neighbors were at the track too.' }
      ] },

    { id: 'JOHNSON_CITY_TN_NOISE_STRIKE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The downtown streets are closed off for the festival and the cops are walking the strip.',
      title: 'Another noise complaint',
      body: 'A second noise violation landed on the club the night of the festival, and the license is two days short. The booker wants the bill quiet and early.',
      options: [
        { id: 'EARLY', label: 'Start early and finish before the hour', likely: 'A short, loud night with no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before the hour. The cops walked past twice and kept walking.' },
        { id: 'MOVE', label: 'Move it to a house', likely: 'No license to lose. The neighbors are close.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A porch took the bill with an hour to spare, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Some of the crowd stays out of the way.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The door was nervous all night and half the list stayed outside.' }
      ] },

    { id: 'JOHNSON_CITY_TN_FLASH_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5, 6, 7, 8, 9] },
      telegraph: 'Fog in the valley and a flash-flood watch for the creeks.',
      title: 'The pass is under water',
      body: 'A band booked from over the mountains is crawling around a closed road. They will reach the porch show three hours after load-in.',
      options: [
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten. You started late and nobody left.' },
        { id: 'SHORT', label: 'Run the short bill and play on', likely: 'A thin night, but the ones who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a long, loose night on a wet porch.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
