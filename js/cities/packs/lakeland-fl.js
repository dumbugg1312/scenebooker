SB.Cities.register('lakeland-fl', {
  v: 1,
  slug: 'lakeland-fl',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['publix', 'fedex', 'fedex freight', 'amazon', 'geico', 'rooms to go', 'lakeland regional', 'southeastern university', 'florida southern', 'florida southern college',
           'florida polytechnic', 'polk state', 'polk state college', 'keiser university', 'frank lloyd wright', 'sun \'n fun', 'sun n fun', 'sun \'n fun aerospace expo',
           'detroit tigers', 'joker marchant', 'joker marchant stadium', 'publix field', 'flying tigers', 'florida strawberry festival', 'strawberry festival', 'legoland',
           'cypress gardens', 'bok tower', 'bok tower gardens', 'spook hill', 'avelo', 'amtrak', 'citrus connection', 'hurricane charley', 'macdill', 'macdill air force base',
           'saddle creek', 'vfw', 'american legion', 'swan city',
           'the citrus row', 'citrus row', 'swan lot', 'polk parkway annex', 'the bone valley hall', 'bone valley hall', 'lake beulah garage', 'hollingsworth carport',
           'the tin grove', 'orange crate room', 'the kathleen shed', 'dixie porch', 'sinkhole social club', 'the packing house',
           'lakeland ledger', 'lkldnow', 'the lakelander', 'lakeland mom', 'haven magazine', '6am city', 'visit central florida', 'lakeland downtown development authority',
           'ldda', 'historic dixieland neighborhood association', 'munn park', 'munn park concert series', 'lakeland christmas parade', 'mlk parade',
           'martin luther king jr parade', 'lakeland pigfest', 'pigfest', 'mayfaire', 'swan derby', 'lakeland punk rock flea market', 'punk rock flea market',
           'central florida comic con', 'rp funding center', 'lakeland civic center', 'lakes church', 'polk county sheriff', 'lakeland police',
           'plant city christmas parade', 'haines city christmas parade', 'linder regional airport', 'bandsintown', 'floridapunk', 'friday night live'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['publix*', 'sun n fun*', 'florida southern*', 'southeastern university*', 'legoland*', 'joker marchant*'],

  blurb: ['A lake city between Tampa and Orlando, so it borrows from both and builds its own in garages, carports and grove lots.',
          'Nobody has a basement, so a generator, a cooler and a pasture gate someone has to close make a show, and heat and storms end it early.'],
  hard: 'Between two bigger coast scenes; no basements, heat, and neighbors who call.',
  region: 'central Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lakeland' },
    { id: 'auburndale', kind: 'FEEDER', name: 'Auburndale', minutes: 15, bearing: 85, note: 'An old citrus and railroad town turned suburb; no scene of its own.' },
    { id: 'plant-city', kind: 'FEEDER', name: 'Plant City', minutes: 20, bearing: 285, note: 'A strawberry farm town on I-4 toward Tampa; high-school bands and kids who drive east.' },
    { id: 'winter-haven', kind: 'FEEDER', name: 'Winter Haven', minutes: 25, bearing: 125, note: 'The chain-of-lakes city next door with a small scene and a half-friendly rivalry.' },
    { id: 'bartow', kind: 'FEEDER', name: 'Bartow', minutes: 25, bearing: 160, note: 'The county seat down US 98; courthouses and phosphate money, little scene.' },
    { id: 'mulberry', kind: 'FEEDER', name: 'Mulberry and Fort Meade', minutes: 25, bearing: 205, note: 'Very small phosphate towns; the kids drive in.' },
    { id: 'haines-city', kind: 'FEEDER', name: 'Haines City', minutes: 35, bearing: 100, note: 'A citrus town turned Orlando bedroom suburb.' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon', minutes: 40, bearing: 280, note: 'A big Tampa suburb whose kids pick Tampa or Lakeland by the night.' },
    { id: 'lake-wales', kind: 'FEEDER', name: 'Lake Wales', minutes: 40, bearing: 130, note: 'A ridge-top citrus and tourist town.' },
    { id: 'sebring', kind: 'FEEDER', name: 'Sebring', minutes: 60, bearing: 155, note: 'A racetrack town an hour south; its teenagers drive up for shows.' },
    { id: 'wauchula', kind: 'FEEDER', name: 'Wauchula', minutes: 60, bearing: 175, note: 'Cattle and citrus country; a few kids drive in.' },
    { id: 'clearwater', kind: 'PEER', name: 'Clearwater', minutes: 60, bearing: 295, scene: 900, note: 'A beach-and-retiree city; a different, coastal world.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', slug: 'sarasota-fl', minutes: 80, bearing: 215, scene: 700, note: 'A smaller Gulf-coast city that trades the odd band.' },
    { id: 'palm-bay', kind: 'PEER', name: 'Palm Bay and Melbourne', minutes: 105, bearing: 105, slug: 'palm-bay-fl', note: 'The Space Coast, a long drive east on I-4 and I-95.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 120, bearing: 345, slug: 'gainesville-fl', note: 'A university town with an older punk reputation; Lakeland kids look up to it.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Lake Mirror', route: 'downtown', note: 'Brick storefronts, restaurants and a few bars in a long downtown revival. Cheap storefronts are rarer each year.' },
    { id: 'dixieland', name: 'Dixieland', route: 'old-side', note: 'Bungalows with porches and deep back yards south of downtown, and a shop strip. Renters and artists, getting priced out.' },
    { id: 'lake-hollingsworth', name: 'Lake Hollingsworth', route: 'campus', note: 'A college beside the lake and student rentals around it. Parties come and go with the semester.' },
    { id: 'lake-morton', name: 'Lake Morton and the old lake districts', route: 'old-side', note: 'Big old houses and church campuses; the neighbors are organized and the rent is high. Almost nothing for loud shows.' },
    { id: 'moorehead', name: 'Moorehead and the east side', route: 'old-side', note: 'Historically Black neighborhoods with community and church halls; a community with its own history, not cheap-rent scenery.' },
    { id: 'north-lakeland', name: 'north Lakeland and Lake Parker', route: 'work-side', note: 'Older block ranch houses, auto shops and block-building bars. Backyards, garages and shop units.' },
    { id: 'kathleen', name: 'Kathleen and the south side', route: 'work-side', note: 'Flat scrub and old mine land toward Bartow. Sheds, barns and rural lots with a generator.' },
    { id: 'highlands', name: 'Lakeland Highlands and the Parkway sprawl', route: 'campus', note: 'Newer subdivisions and strip malls. Two-car garages for practice, and almost no rooms.' }
  ],

  rooms: [
    { id: 'north-garage', kind: 'HOUSE', hood: 'north-lakeland', cap: 50, curfew: 1320, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'A two-car garage on a block of flat ranch houses. Door up, extension cords, a cooler, and the heat and the neighbors decide when it ends.' },
    { id: 'dixie-yard', kind: 'HOUSE', hood: 'dixieland', cap: 60, curfew: 1320, ac: false, outdoor: true, pressure: 55,
      note: 'A bungalow back yard with a porch for a stage. The neighborhood association meets monthly and the rents are rising.' },
    { id: 'brewery-lot', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['ALL', 'A21'], matinee: true, curfew: 1080, ac: false, outdoor: true, following: .3,
      note: 'A brewery lot with a free daytime bill twice a year. An event, not a weekly room, and it is over by six.' },
    { id: 'event-hall', kind: 'CLUB', hood: 'dixieland', cap: 250, ages: ['A21'], curfew: 1380, ac: true, following: .3,
      note: 'A converted industrial hall that books covers and one original night a month. The pop-punk night is the closest it comes.' },
    { id: 'long-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true, pressure: 55,
      note: 'A long bar with a back-room stage and a few original nights. The owner fears the license, and the neighbors live upstairs.' },
    { id: 'practice-unit', kind: 'DIY', hood: 'north-lakeland', cap: 80, ages: ['A18'], curfew: 1380, ac: true, pressure: 60, needs: ['VOUCH'],
      note: 'A rented practice unit in a flex-warehouse strip, with a PA. The lease says no assembly, so nobody says it is a show.' },
    { id: 'east-hall', kind: 'HALL', hood: 'moorehead', cap: 150, ages: ['ALL'], curfew: 1320, ac: true, owner: 'CHURCH_CONTACT', pressure: 45,
      note: 'A community hall that says yes once, if you ask the way the neighborhood asks. It belongs to the people who live around it.' },
    { id: 'pasture-lot', kind: 'OUTDOOR', hood: 'kathleen', cap: 100, rent: 10, curfew: 1380, ac: false, outdoor: true,
      note: 'A pasture lot with a generator and a gate somebody has to close. Rain ends it.' },
    { id: 'downtown-arena', kind: 'BIG', hood: 'downtown', cap: 1000, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER',
      note: 'A downtown arena for touring package bills. Rarely local, and it wants a name on the poster.' }
  ],

  contacts: ['sarasota-fl', 'palm-bay-fl', 'gainesville-fl', 'tampa', 'orlando'],

  calendar: [
    { id: 'air-show', label: 'the air show', tag: 'airshow', month: 4, weeks: [1, 2], dows: [4, 5, 6], can: [.88, .88, .90] },
    { id: 'xmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, week: 1, dows: [3], can: [.70, .75, .80], hoods: ['downtown'], elsewhere: [.95, .95, .95] },
    { id: 'berry-fair', label: 'the big berry fair', tag: 'fair', month: 3, week: 1, dows: [4, 5, 6], can: [.90, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3200000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'St. Petersburg', state: 'FL', lat: 27.77, lon: -82.64, pop: 260000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1600000 }
  ],
  roads: ['I-4', 'SR 570', 'US 92', 'US 98', 'US 27', 'Florida Avenue'],

  words: {
    street: ['Memorial Boulevard', 'Florida Avenue', 'Lake Parker Drive', 'Winter Lake Road', 'the Polk Parkway'],
    water: ['Lake Morton', 'Lake Mirror', 'Lake Hollingsworth', 'Lake Parker', 'Lake Hunter'],
    hood: ['Dixieland', 'Moorehead', 'Kathleen', 'Highland City', 'Lakeland Highlands', 'Mass Market'],
    thing: ['carport', 'orange grove', 'sinkhole', 'phosphate pit', 'generator', 'strip mall', 'practice unit', 'church hall', 'pasture gate'],
    weather: ['afternoon thunderstorm', 'humidity', 'storm watch']
  },

  events: [
    { id: 'LAKELAND_FL_PARADE_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade and the fireworks are on the same night as your show, and the lake streets are being coned off.',
      title: 'The parade shuts the streets',
      body: 'The fireworks over the lake close every street around downtown. The bar show starts at nine, and the crowd is stuck behind the barricades.',
      options: [
        { id: 'EARLY', label: 'Start early and finish before the parade lets out', likely: 'The ones who came early get a short, tight night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at six, you beat the barricades, and the room emptied for the fireworks.' },
        { id: 'LATE', label: 'Push doors back until the crowd clears', likely: 'The ones who stay get a late night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The streets opened at nine-thirty, and the room filled up fast and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A thin crowd. The parade has them.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The parade had the town, but the regulars found a way through.' }
      ] },

    { id: 'LAKELAND_FL_AIR_SHOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'airshow' },
      telegraph: 'Every motel on the southwest side is full for the air show, and your touring band is still looking for a bed.',
      title: 'No beds near the airport',
      body: 'The air show has taken every room in town, so the van from out of town is circling the motels, and somebody has offered a garage floor.',
      options: [
        { id: 'FLOOR', label: 'Put them on the garage floor', likely: 'Free, and they will remember it, but the night starts a little late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'REGULARS', pct: .02 }],
          result: 'Six people slept on a garage floor and ate a pot of rice, and the set that night was loose and loud.' },
        { id: 'MOTEL', label: 'Pay for a motel an hour away', likely: 'Costs money, but they show up on time.',
          effects: [{ op: 'MONEY', amount: -40 }],
          result: 'You paid for two rooms in the next county, and the band was fresh and a little annoyed.' },
        { id: 'ACCEPT', label: 'Let them figure it out', likely: 'They may not make it, and they will not forget it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'They slept in the van and played tired, and the crowd noticed.' }
      ] },

    { id: 'LAKELAND_FL_NEIGHBOR_CALL', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [3, 4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'The city has no quiet hour, only a reasonable person, and one neighbor on the block is not feeling reasonable.',
      title: 'It is 9:40 and somebody called',
      body: 'The porch show is loud and the code has no clock, just a reasonable-person test, and one neighbor in the historic district has the phone out. You do not know whether it is 9:40 or ten.',
      options: [
        { id: 'TURN', label: 'Turn it down and play acoustic', likely: 'A strange, quiet set, and nobody gets cited.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The amps went off and the drums went to brushes, which was odd and sweet, and the street stayed quiet.' },
        { id: 'MOVE', label: 'Move the rest to a garage across town', likely: 'A smaller crowd, and nobody to call.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A garage took the rest of the bill, and the door stayed up and the street heard nothing.' },
        { id: 'ACCEPT', label: 'Keep playing and see who shows up', likely: 'It might hold or it might not.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'MONEY', amount: -25 }],
          result: 'Someone with a flashlight came by at ten, and you got a warning and a bill to pay.' }
      ] }
  ]
});
