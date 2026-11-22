SB.Cities.register('iowa-city-ia', {
  v: 1,
  slug: 'iowa-city-ia',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of iowa', 'iowa hawkeyes', 'hawkeyes', 'hawkeye saturdays', 'kinnick', 'big ten', 'iowa state', 'cyclones', 'cambus', 'iowa city transit',
           'coralville transit', 'press-citizen', 'iowa city press-citizen', 'cedar rapids gazette', 'the gazette', 'kcrg', 'daily iowan', 'hy-vee', 'hy vee',
           'casey\'s', 'maid-rite', 'busch light', 'miller lite', 'procter & gamble', 'procter and gamble', 'american college testing', 'unesco', 'city of literature',
           'writers\' workshop', 'iowa writers', 'iowa memorial union', 'old capitol', 'old capitol cellar', 'iowa state fair', 'summer of the arts',
           'the burlington street annex', 'burlington street annex', 'sycamore room', 'the dubuque street depot', 'dubuque street depot', 'ralston basement',
           'lower city pavilion', 'the gilbert shed', 'gilbert shed', 'linn street garage', 'the riverside room', 'hickory hall', 'muscatine avenue annex', 'the sheaf',
           'little village', 'krui', 'think iowa city', 'iowa arts festival', 'iowa city jazz festival', 'iowa city pride', 'friday night concert series',
           'mission creek', 'mission creek festival', 'pokey\'s fest', 'pokey\'s', 'pentacrest', 'college green park', 'hancher', 'thegazette',
           'iowa public radio', 'hawkeye wire', 'hawkeye sports', 'iowa city police', 'icpd', 'cy-hawk', 'cy hawk'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The university, the paper and the stadium are written only in generic form. */
  blocklist: ['hawkeye*', 'hy-vee*', 'maid-rite*', 'old capitol*', 'daily iowan*', 'kcrg*', 'sycamore room*'],

  blurb: ['Iowa City\'s scene resets with the school year, so every crew is new. Basements, bars and art rooms trade the same few hundred literate, friendly kids.',
          'Football Saturdays and winter break empty the town, and the bars card at 21.'],
  hard: 'Football weekends and student turnover break routing; all-ages means houses and halls.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A punk weekend that grew from two nights to three rooms in four years, and a crowd of kids that turns out for every touring hardcore band.' }
  ],
  whereGo: [
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Iowa City' },
    { id: 'north-liberty', kind: 'FEEDER', name: 'Coralville, North Liberty and Tiffin', minutes: 15, bearing: 335, note: 'Fast-growing commuter suburbs; the kids mostly come in.' },
    { id: 'solon', kind: 'FEEDER', name: 'Solon', minutes: 15, bearing: 20, note: 'A small commuter town with a few teen bands.' },
    { id: 'west-branch', kind: 'FEEDER', name: 'West Branch', minutes: 15, bearing: 80, note: 'Quiet, just off I-80 to the east.' },
    { id: 'kalona', kind: 'FEEDER', name: 'Kalona', minutes: 25, bearing: 190, note: 'Amish and Mennonite country; a few teens come in.' },
    { id: 'williamsburg', kind: 'FEEDER', name: 'Williamsburg', minutes: 25, bearing: 285, note: 'An outlet-mall town west on I-80.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon and Lisbon', minutes: 30, bearing: 15, note: 'A small college town with student bands.' },
    { id: 'washington', kind: 'FEEDER', name: 'Washington', minutes: 30, bearing: 175, note: 'A farm and light-industry county seat to the south.' },
    { id: 'muscatine', kind: 'FEEDER', name: 'Muscatine', minutes: 40, bearing: 110, note: 'A river and factory town on the Mississippi.' },
    { id: 'grinnell', kind: 'FEEDER', name: 'Grinnell', minutes: 50, bearing: 265, note: 'A small college town with student bands.' },
    { id: 'cedar-rapids', kind: 'PEER', name: 'Cedar Rapids', minutes: 45, bearing: 340, slug: 'cedar-rapids-ia', note: 'The larger neighbor up I-380: bands and crowds trade both ways all the time.' },
    { id: 'quad-cities', kind: 'PEER', name: 'Quad Cities', minutes: 60, bearing: 95, slug: 'davenport-ia', note: 'A river and industry cluster an hour east on I-80, a touring stop and a traffic partner.' },
    { id: 'des-moines', kind: 'PEER', name: 'Des Moines', minutes: 120, bearing: 275, slug: 'des-moines-ia', note: 'The capital scene, where bigger tours choose to stop instead.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Ped Mall', route: 'downtown', note: 'A pedestrian plaza of bars, restaurants and a library; legal rooms, 21-and-over at night, and almost no DIY.' },
    { id: 'campus', name: 'campus and along the river', route: 'campus', note: 'Where the student year happens: institutional rooms and the crowd that feeds everything else.' },
    { id: 'northside', name: 'Northside', route: 'old-side', note: 'Old houses with real basements and a bohemian streak, heating up and getting expensive.' },
    { id: 'near-south', name: 'the Near South Side', route: 'old-side', note: 'Old houses cut into rentals near campus and the hospital: the likeliest place for basement and porch shows.' },
    { id: 'peninsula', name: 'Peninsula and the river bottoms', route: 'work-side', note: 'Quiet, flood-prone streets by the river; not a place to put a show.' },
    { id: 'east-side', name: 'the east side along Highway 6', route: 'work-side', note: 'Mid-century houses, strip malls and apartment blocks; garages, carports and rented practice space.' },
    { id: 'coralville-strip', name: 'Coralville and the Strip', route: 'campus', note: 'Big-box retail, hotels and a mall in the next town over; legal event rooms, no DIY.' }
  ],

  rooms: [
    { id: 'near-south-basement', kind: 'HOUSE', hood: 'near-south', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A rental basement near campus with its own regular crowd. Quiet by ten-thirty, and the lease turns over every August.' },
    { id: 'north-basement', kind: 'HOUSE', hood: 'northside', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A second basement on the old north side, harder and heavier than the first. Over by ten.' },
    { id: 'party-basement', kind: 'HOUSE', hood: 'near-south', cap: 30, hostCut: 0, pa: .4, ages: ['A18'], curfew: 1380, ac: false, outdoor: false, sketch: 40, standing: [75, 55, 35],
      pressure: 70, note: 'A party-house basement where a show and a party are hard to tell apart. The police and the landlord know the address.' },
    { id: 'art-center', kind: 'DIY', hood: 'downtown', cap: 120, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 20, standing: [60, 65, 55],
      pressure: 45, note: 'A volunteer-run art center, all ages for twenty years and no alcohol. It runs on tired volunteers and a lease.' },
    { id: 'rented-theater', kind: 'HALL', hood: 'downtown', cap: 250, rent: 350, deposit: 100, pa: .7, curfew: 1350, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented theater for the big all-ages night. It costs real money, nobody drinks, and the load-out is early.' },
    { id: 'back-room-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar with a stage in the back room on the pedestrian mall. Nobody under twenty-one gets in at night.' },
    { id: 'mid-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21', 'A18', 'ALL'], matinee: true, curfew: 1470, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The mid-size stage every touring indie band stops at. The odd all-ages matinee, if you ask early.' },
    { id: 'indie-club', kind: 'CLUB', hood: 'downtown', cap: 350, houseCosts: 220, split: .8, pa: .9, ages: ['ALL'], curfew: 1380, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'An old club that does all-ages shows at eight. Mostly singer-songwriters, and a fill date for bigger bands.' },
    { id: 'summer-yard', kind: 'OUTDOOR', hood: 'northside', cap: 80, rent: 10, pa: .4, curfew: 1260, sketch: 30, standing: [60, 55, 40],
      note: 'A backyard and a porch on the north side. Warm months only, and dusk or a neighbor with a phone ends it.' }
  ],

  contacts: ['cedar-rapids-ia', 'davenport-ia', 'des-moines-ia'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.80, .92, .92], hoods: ['campus', 'downtown', 'near-south'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.80, .92, .92], hoods: ['campus', 'downtown', 'near-south'], elsewhere: [.95, 1, 1] },
    { id: 'arts-fest', label: 'the downtown arts festival', tag: 'festival', month: 6, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'june-parade', label: 'the June parade and festival', tag: 'parade', month: 6, week: 3, dows: [5], can: [1, .95, .95], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'july-fourth-fest', label: 'the July Fourth weekend festival', tag: 'festival', month: 7, week: 1, dows: [4, 5, 6], can: [.88, .85, .85] },
    { id: 'move-in', label: 'move-in week', tag: 'graduation', month: 8, week: 4, dows: [4, 5, 6], can: [1.05, 1.08, 1.05] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 2700000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 },
    { name: 'Dubuque', state: 'IA', lat: 42.5, lon: -90.66, pop: 59000 },
    { name: 'Ames', state: 'IA', lat: 42.03, lon: -93.62, pop: 66000 }
  ],
  roads: ['I-80', 'I-380', 'US 218', 'US 6', 'Iowa 1', 'Iowa 27'],

  words: {
    street: ['Burlington Street', 'Dubuque Street', 'Gilbert Street', 'Muscatine Avenue', 'Highway 6', 'Linn Street', 'Clinton Street'],
    water: ['the Iowa River', 'Coralville Lake', 'the Mississippi'],
    hood: ['the Ped Mall', 'Northside', 'Peninsula', 'Prospect Hill', 'Towncrest', 'Lower Muscatine', 'the Strip', 'the Corridor'],
    thing: ['pork tenderloin', 'loose-meat sandwich', 'gas-station pizza', 'cornfield', 'bonfire', 'basement', 'porch', 'cornstalks', 'bulkhead door', 'art room', 'photocopied flyer', 'all-ages hall'],
    weather: ['derecho', 'thunderstorm', 'ice storm', 'spring flood']
  },

  events: [
    { id: 'IOWA_CITY_IA_NEIGHBOR_CALLS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The house on the next block got nine calls over one weekend, and everyone on the street heard about it.',
      title: 'The police come before the second band',
      body: 'Since the bars started carding at twenty-one, more of the parties have moved into basements, and the neighbors have learned the number to call. A car is at the curb and the second band has not started.',
      options: [
        { id: 'TURNDOWN', label: 'Talk to the officer and turn it down', likely: 'Quieter. A few leave.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The amps came down and the officer left with a warning. The room leaned in close.' },
        { id: 'HALL', label: 'Move the bill to a rented hall', likely: 'Costs money and drops the house crowd. No more calls.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -40 }],
          result: 'A hall took the rest of the bill. It was clean, early and a little stiff.' },
        { id: 'END', label: 'Call it and send everyone home', likely: 'The kids are angry. The house stays open.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'REGULARS', pct: -.01 }],
          result: 'You shut it down. The house kept its keys and the crowd kept its grudge.' }
      ] },

    { id: 'IOWA_CITY_IA_GAME_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'The stadium is sold out again and half the rentals have out-of-town cousins in them.',
      title: 'Football week takes the town',
      body: 'The pedestrian mall is full, the bar crowd is out of reach and the near-campus blocks are walled with cars. Your show is in the middle of it.',
      options: [
        { id: 'HOUSE', label: 'Move it to a house off the main blocks', likely: 'Smaller, but nobody parks there.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'The basement filled early. Nobody wanted to fight the traffic to get out.' },
        { id: 'LATE', label: 'Push doors back until the game crowd thins', likely: 'A late start, but the right people come.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The ones who wanted music showed up as the bars filled.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed downtown. The regulars came.' }
      ] },

    { id: 'IOWA_CITY_IA_JUNE_FLOOD', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [5, 6, 7] },
      telegraph: 'It has rained for three days and the river is over the bike path.',
      title: 'The river is in the basement',
      body: 'A June rain on the river bottoms has the sump pump losing and the water coming up through the floor drain. The amps are already on the stairs.',
      options: [
        { id: 'UPSTAIRS', label: 'Run the show on the first floor', likely: 'Cramped and loud, and the host holds his breath.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Wall to wall on the first floor. The pump kept up until the last chord.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The water went down and some of the crowd did too.' }
      ] }
  ]
});
