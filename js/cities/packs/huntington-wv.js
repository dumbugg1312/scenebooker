SB.Cities.register('huntington-wv', {
  v: 1,
  slug: 'huntington-wv',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['marshall university', 'marshall', 'thundering herd', 'the herd', 'ohio university', 'morehead state', 'university of charleston',
           'old central city days', 'jazz-mu-tazz', 'hot dog festival', 'rails and ales', 'chilifest', 'hilltop festival', 'ritter park days',
           'guyandotte civil war days', 'heritage days', 'appalachian film festival', 'tri-state comic con', 'camden park', 'csx',
           'port of huntington tri-state', 'tri-state airport', 'tri-state transit authority', 'amtrak', 'cabell midland', 'heroin(e)',
           '1970 plane crash', 'plane crash memorial', 'waffle house', 'vfw', 'american legion',
           'the freight room', 'twelve pole hall', 'switchman\'s lodge', 'the third avenue annex', 'guyandotte grange', 'the flood gate',
           'mud river rec', 'the boxcar basement', 'tri-state parish hall', 'eighth avenue garage', 'the slaw room', 'cabell street pavilion',
           'west virginia hot dog festival', 'huntington chilifest', 'huntington ribfest', 'ribfest', 'huntington music and arts festival', 'music and arts festival',
           'mothman festival', 'marshall health network arena', 'joan c. edwards stadium', 'ritter amphitheater', 'pullman square', 'visit huntington',
           'huntington quarterly', 'the parthenon', 'marshall parthenon', 'wv public broadcasting', 'west virginia public broadcasting', 'herald-dispatch'],
  /* Dossier institutions and its unchecked invented venue names are banned: research, not content. */
  blocklist: ['marshall*', 'thundering herd*', 'camden park*', 'ritter park days*', 'freight room*', 'twelve pole*', 'flood gate*', 'slaw room*'],

  blurb: ['A West Virginia river city on the Ohio, at the heart of a three-state metro, where cheap old houses near the university carry the shows.',
          'A sober, orderly show keeps a room open longer here, and a spring flood or a football Saturday can scatter the whole bill.'],
  hard: 'Small crowd, a skippable stop between two bigger draws, and the university turns the crowd over every fall.',
  region: 'the Tri-State',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Lexington', state: 'KY', lat: 38.04, lon: -84.5 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Cincinnati', state: 'OH', lat: 39.1, lon: -84.51 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.0 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Huntington' },
    { id: 'ceredo', kind: 'FEEDER', name: 'Ceredo and Kenova', minutes: 10, bearing: 270, note: 'Small river and rail towns on the Wayne County side.' },
    { id: 'barboursville', kind: 'FEEDER', name: 'Barboursville, Milton and Hurricane', minutes: 15, bearing: 85, note: 'Mall-and-chain suburbs up I-64; the suburban teenagers come from here.' },
    { id: 'chesapeake', kind: 'FEEDER', name: 'Chesapeake and Proctorville', state: 'OH', minutes: 20, bearing: 355, note: 'Ohio suburbs across the river; kids cross the bridge for shows.' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', state: 'KY', minutes: 25, bearing: 285, note: 'A steel-and-hospital town tied to Huntington at the hip; a small scene of its own.', bands: 2 },
    { id: 'wayne', kind: 'FEEDER', name: 'Wayne', minutes: 25, bearing: 200, note: 'A small county seat to the south.' },
    { id: 'ironton', kind: 'FEEDER', name: 'Ironton', state: 'OH', minutes: 30, bearing: 310, note: 'An old iron town up US 52 with a branch campus.' },
    { id: 'louisa', kind: 'FEEDER', name: 'Louisa and Catlettsburg', state: 'KY', minutes: 35, bearing: 240, note: 'Small eastern Kentucky towns.' },
    { id: 'gallipolis', kind: 'FEEDER', name: 'Point Pleasant and Gallipolis', minutes: 55, bearing: 25, note: 'Historic river villages up the Ohio.' },
    { id: 'morehead', kind: 'FEEDER', name: 'Morehead', state: 'KY', minutes: 70, bearing: 260, note: 'A small university town west on I-64 with probably a small scene.' },
    { id: 'logan', kind: 'FEEDER', name: 'Logan', minutes: 75, bearing: 160, note: 'A declined coal town on the Guyandotte; kids drive the winding road in.' },
    { id: 'charleston', kind: 'PEER', name: 'Charleston', minutes: 55, bearing: 100, scene: 1800, note: 'The state capital and the great rival: buttoned-up, and a sister scene on I-64.' },
    { id: 'portsmouth', kind: 'PEER', name: 'Portsmouth', state: 'OH', minutes: 60, bearing: 300, scene: 800, note: 'A hilly river town on the Ohio side.' },
    { id: 'athens', kind: 'PEER', name: 'Athens', state: 'OH', minutes: 90, bearing: 10, scene: 1500, note: 'A live university town and likely the strongest scene within range.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old commercial buildings, bars with bands and a revived plaza; landlords and the city pay attention.' },
    { id: 'campus', name: 'the university district', route: 'campus', note: 'Student blocks beside downtown, around 16th Street and 5th Avenue; fills in September, empties in December.' },
    { id: 'central-city', name: 'Old Central City', route: 'work-side', note: 'A rail-era west-end strip of antique shops and empty storefronts; the best bet for a storefront or garage space.' },
    { id: 'westmoreland', name: 'Westmoreland', route: 'work-side', note: 'Far west, partly in Wayne County; backyards, carports and confusing enforcement across the county line.' },
    { id: 'southside', name: 'the Southside and Fairfield', route: 'old-side', note: 'Older houses with basements along the Hal Greer corridor; students and working families.' },
    { id: 'ritter-park', name: 'Ritter Park', route: 'old-side', note: 'The affluent historic blocks around the big park; neighbors with lawyers, and where the polite complaints come from.' },
    { id: 'guyandotte', name: 'Guyandotte', route: 'old-side', note: 'A river village at the east end with a small old-town strip; cheap, quirky and flood-prone.' },
    { id: 'east-side', name: 'Highlawn and the east side', route: 'campus', note: 'Walnut Hills, Forest Hills and Altizer: student-adjacent rentals and family housing.' }
  ],

  rooms: [
    { id: 'southside-house', kind: 'HOUSE', hood: 'southside', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A living room and porch in an old frame house with a basement. Neighbors called in the cars, so the host keeps it indoors and quiet.' },
    { id: 'highlawn-house', kind: 'HOUSE', hood: 'east-side', cap: 50, curfew: 1380, ac: false, outdoor: false, pressure: 55, standing: [65, 55, 40],
      note: 'A student-adjacent rental. It flips every fall with the lease cycle, and the landlord can end it.' },
    { id: 'westmoreland-yard', kind: 'HOUSE', hood: 'westmoreland', cap: 60, curfew: 1380, ac: false, outdoor: true, pressure: 45,
      note: 'A backyard and a carport out west, on the county line. Nobody is sure which office takes the complaint.' },
    { id: 'sober-room', kind: 'DIY', hood: 'downtown', cap: 100, curfew: 1380, ac: true, pressure: 40, standing: [65, 65, 55],
      note: 'An alcohol-free all-ages room downtown, with workshops and shows all week. It lives on the owner\'s lease and the local crowd.' },
    { id: 'storefront', kind: 'DIY', hood: 'central-city', cap: 120, curfew: 1380, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A storefront on the west-end strip. The sign says respect the space, and the rent is the real risk.' },
    { id: 'ministry-hall', kind: 'HALL', hood: 'campus', cap: 150, curfew: 1320, ac: true, standing: [60, 60, 65],
      note: 'A campus ministry building that hosted a free show once. It works only on campus rules and the school calendar.' },
    { id: 'river-hall', kind: 'HALL', hood: 'guyandotte', cap: 120, curfew: 1350, ac: false, lowLying: true, pressure: 45,
      note: 'A rental hall in the river village. Cheap and quirky, and the floor goes under when the river rises.' },
    { id: 'plaza-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1500, ac: true, following: .3, pressure: 50,
      note: 'A bar with a back-room stage on the plaza strip. The plaza watches the noise and the rent.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'downtown', cap: 500, ages: ['A18', 'A21'], curfew: 1470, ac: true, following: .5,
      note: 'The mid-size downtown room, eighteen and up. Touring punk and metal can fill it when the bill is right.' },
    { id: 'factory-hall', kind: 'BIG', hood: 'central-city', cap: 1000, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A converted factory space where a name act lands. It can pull a whole weekend\'s crowd out of the small rooms.' },
    { id: 'park-gazebo', kind: 'OUTDOOR', hood: 'ritter-park', cap: 150, curfew: 1200, rent: 15,
      note: 'A gazebo in the big park. Summer only, with a city permit, and the weather has the last word.' }
  ],

  contacts: ['lexington-ky', 'columbus', 'cincinnati', 'louisville'],

  calendar: [
    { id: 'food-festival', label: 'the downtown food festival', tag: 'festival', month: 6, week: 1, dows: [5], can: [.88, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'west-end-street', label: 'the west-end street festival', tag: 'festival', month: 6, week: 2, dows: [4, 5], can: [.90, .88, .88], hoods: ['central-city'], elsewhere: [1, 1, 1] },
    { id: 'arts-weekend', label: 'the park music and arts weekend', tag: 'festival', month: 8, week: 4, dows: [5, 6], can: [.90, .90, .88] },
    { id: 'rib-weekend', label: 'the rib weekend', tag: 'festival', month: 9, week: 3, dows: [3, 4, 5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['campus', 'downtown'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['campus', 'downtown'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.85, .95, .95], hoods: ['campus', 'downtown'], elsewhere: [.95, 1, 1] },
    { id: 'chili-day', label: 'the downtown chili day', tag: 'festival', month: 10, week: 3, dows: [5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Charleston', state: 'WV', lat: 38.35, lon: -81.63, pop: 210000 },
    { name: 'Athens', state: 'OH', lat: 39.33, lon: -82.1, pop: 65000 },
    { name: 'Lexington', state: 'KY', lat: 38.04, lon: -84.5, pop: 520000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2100000 }
  ],
  roads: ['I-64', 'US 60', 'US 52', 'WV 10', 'US 23', 'WV 2'],

  words: {
    street: ['Hal Greer Boulevard', '5th Avenue', '16th Street', '3rd Avenue', '8th Street', 'US 60'],
    water: ['the Ohio', 'the Guyandotte', 'the floodwall', 'Mud River'],
    hood: ['Old Central City', 'Westmoreland', 'Guyandotte', 'Fairfield', 'Highlawn', 'Walnut Hills', 'Forest Hills', 'Altizer', 'Ritter Park'],
    thing: ['pepperoni roll', 'slaw dog', 'floodwall', 'coal train', 'holler', 'pop', 'rail yard', 'fellowship hall', 'river bridge', 'pavilion'],
    weather: ['river flood', 'humid', 'ice and snow']
  },

  events: [
    { id: 'HUNTINGTON_WV_GAME_FEST', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home football Saturday is lined up with a downtown festival, and every hotel is full.',
      title: 'Every bar downtown is full',
      body: 'A home game and a downtown festival share the weekend. The bars are packed and the parking is gone, but the sober room with a stage is quiet.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game crowd thins', likely: 'The ones who want a quiet night come in late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd drifted in from the bars and the room felt like a refuge.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed downtown. The regulars filled the room.' }
      ] },

    { id: 'HUNTINGTON_WV_PORCH_COMPLAINT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor asked the host about the cars on the street after the last show.',
      title: 'The neighbors counted the cars',
      body: 'Someone called in the parking and the porch crowd. The host is nervous and wants to know whether the show can be quieter.',
      options: [
        { id: 'INSIDE', label: 'Move it indoors and turn it down', likely: 'Smaller and gentler. The neighbors are won over.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .7 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'An acoustic night in the front room, with the porch empty. The next morning a neighbor waved.' },
        { id: 'MOVE', label: 'Move the bill to a house on another block', likely: 'Breaks the date for a few.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'A friend with a basement took the bill. Not everyone found the new street.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Someone may call again.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'It went off, but the host spent the night watching the street.' }
      ] },

    { id: 'HUNTINGTON_WV_RIVER_RISE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [2, 3, 4, 5] },
      telegraph: 'The river is coming up after a week of rain, and the floodwall gates are being checked.',
      title: 'Water on the hall floor',
      body: 'The river rose overnight and the village hall has water across the floor. The bill is tomorrow, and a house on higher ground is the only place left.',
      options: [
        { id: 'HOUSE', label: 'Move the whole bill to a house on high ground', likely: 'Smaller and louder, but dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A house up the hill took the bill with hours to spare. The floor was packed.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'The water went down a day later. Some of the list could still make it.' },
        { id: 'ACCEPT', label: 'Run it and wade', likely: 'A mess, and not many will come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'A damp, short night with boots on. The few who came remembered it.' }
      ] }
  ]
});
