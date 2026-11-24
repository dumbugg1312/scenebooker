SB.Cities.register('new-haven-ct', {
  v: 1,
  slug: 'new-haven-ct',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['yale', 'yale university', 'yale new haven hospital', 'yale bowl', 'yale daily news', 'yale-harvard', 'harvard', 'knights of columbus',
           'southern connecticut state', 'gateway community college', 'albertus magnus', 'university of new haven', 'quinnipiac university',
           'new haven register', 'new haven independent', 'grand news', 'metro-north', 'shore line east', 'hartford line', 'ct transit', 'mixmaster',
           'international festival of arts and ideas', 'powder house day', 'cherry blossom festival', 'italian feast', 'st. patrick\'s day parade', 'open studios',
           'hartford whalers', 'whalers', 'mohegan sun', 'foxwoods', 'submarine base', 'coast guard academy', 'hurricane irene', 'hurricane sandy',
           'vfw', 'american legion', 'elks',
           'shoreline summer festival', 'freddy fixer parade', 'st. andrew society', 'st. andrew society festa', 'caribbean heritage festival', 'new haven pride center',
           'new haven jazz festival', 'chalk art festival', 'dragon boat festival', 'wooster square association', 'fenway park', 'yale bulldogs', 'yale football',
           'yale commencement', 'new haven coliseum', 'ct public', 'ct examiner', 'new journal', 'daily nutmeg', 'visit new haven', 'ct dcp',
           'dwight street annex', 'the grand avenue social', 'grand avenue social', 'oyster shell hall', 'wooster basement', 'sixth floor, ferry street',
           'the winchester loft', 'council 41 hall', 'edgewood carriage house', 'sound side lanes', 'the long wharf boathouse', 'third floor triple', 'quinnipiac boiler room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm' in game text. */
  blocklist: ['yale*', 'new haven register*', 'new haven independent*', 'knights of columbus*', 'metro-north*', 'mixmaster*', 'oyster shell hall*', 'dwight street annex*'],

  blurb: ['A cramped college-and-hospital city where damp basements, social halls and old factory floors carry the shows.',
          'The hardcore here is heavy and old, rent never stops climbing, and every house has a landlord upstairs.'],
  hard: 'Few rooms, rising rents, and every house has a landlord upstairs.',
  region: 'the Northeast',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'This town has a heavy hardcore lineage, and the old heads and kids both still turn out for it.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'New Haven' },
    { id: 'west-haven', kind: 'FEEDER', name: 'West Haven', minutes: 10, bearing: 250, pop: 55000, note: 'A beach and working-class town of halls and clubs, with some scene of its own.' },
    { id: 'east-haven', kind: 'FEEDER', name: 'East Haven', minutes: 10, bearing: 100, pop: 30000, note: 'Italian-American shoreline town. Little scene: the kids come to the city.' },
    { id: 'hamden', kind: 'FEEDER', name: 'Hamden', minutes: 15, bearing: 350, pop: 60000, scene: 80, note: 'A big suburb of garages and strip malls that supplies the city\'s bands.',
      rooms: [
    { id: 'hamden-garage', kind: 'DIY', hood: 'hamden-industrial', cap: 60, rent: 50, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 45, standing: [60, 60, 40],
      pressure: 60, needs: ['VOUCH'], note: 'A vacant garage beside the practice rooms. The address goes out by message only, and the owner is talking about a wall.' }
      ] },
    { id: 'branford', kind: 'FEEDER', name: 'Branford', minutes: 20, bearing: 90, pop: 28000, note: 'A harbor town with some basement bands.' },
    { id: 'wallingford-meriden', kind: 'FEEDER', name: 'Wallingford and Meriden', minutes: 20, bearing: 10, note: 'Meriden is an old silver and mill city with a real scene; Wallingford is the quieter suburb.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford', minutes: 25, bearing: 245, pop: 52000, note: 'A beach suburb with its own small scene.' },
    { id: 'valley', kind: 'FEEDER', name: 'Ansonia, Derby and Shelton', minutes: 25, bearing: 295, note: 'Small, tough old mill towns on the Naugatuck, with some hardcore of their own.' },
    { id: 'shoreline', kind: 'FEEDER', name: 'Guilford and Madison', minutes: 30, bearing: 80, note: 'Small, affluent beach towns of kids with cars and money.' },
    { id: 'waterbury', kind: 'FEEDER', name: 'Waterbury', minutes: 40, bearing: 320, pop: 114000, scene: 400, note: 'An old brass city with big Italian, Puerto Rican and Albanian communities.' },
    { id: 'middletown', kind: 'FEEDER', name: 'Middletown', minutes: 35, bearing: 30, pop: 47000, note: 'A river city with a liberal arts college, a college radio station and a lively art scene.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', slug: 'hartford', state: 'CT', minutes: 45, bearing: 15, scene: 800, note: 'The capital, called dull and corporate by New Haven. The two trade crowds all the time.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', state: 'MA', minutes: 60, bearing: 5, slug: 'springfield-ma', note: 'An hour up I-91, on the circuit that tours link.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', slug: 'providence', state: 'RI', minutes: 90, bearing: 70, scene: 1200, note: 'A bigger college and arts city up I-95.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 100, bearing: 40, slug: 'worcester-ma', note: 'A bigger mill city on the same regional circuit.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Ninth Square', route: 'downtown', note: 'Around the Green: licensed bars, theaters and a few mid-size rooms. Priced out and getting corporate; DIY survives only in upper floors and the edges.' },
    { id: 'fair-haven', name: 'Fair Haven', route: 'work-side', note: 'Triple-deckers and old river factories across the bridges, heavily Latino. Cheap and mostly ignored: basements, lofts and practice rooms, with gentrification creeping in.' },
    { id: 'east-rock', name: 'East Rock', route: 'campus', note: 'Victorian flats under the ridge, full of grad students and neighbors who call the police. Basement shows are short-lived.' },
    { id: 'westville', name: 'Westville', route: 'old-side', note: 'A village center with galleries and houses with real basements and yards. Artistic, with rising rents and noise complaints.' },
    { id: 'edgewood', name: 'Edgewood and West River', route: 'old-side', note: 'Cut-up Victorians, triple-deckers and old industrial stock, mixed and working-class. Students and artists found cheap rent, and it is heating up.' },
    { id: 'the-hill', name: 'the Hill and Dwight', route: 'work-side', note: 'Dense triple-deckers around the hospital, which keeps expanding. Better for practice than for hosting a public show.' },
    { id: 'newhallville', name: 'Newhallville and Dixwell', route: 'old-side', note: 'Long-standing Black neighborhoods with old community centers and church halls. A place to rent a hall, not to treat as a cheap punk district.' },
    { id: 'city-point', name: 'City Point, the Annex and the harbor', route: 'work-side', note: 'Sparse waterfront of warehouses, boat storage and practice rooms. The loudest-tolerant spots, and the farthest from where the kids live.' },
    { id: 'hamden-industrial', name: 'Hamden, off State Street', route: 'town:hamden', note: 'Industrial buildings just over the line, with garages beside practice rooms. Cheap and out of sight until a landlord notices.' }
  ],

  rooms: [
    { id: 'east-rock-basement', kind: 'HOUSE', hood: 'east-rock', cap: 40, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A basement under a Victorian flat. Two neighbor calls end the night, and the sound ordinance ends it at ten anyway.' },
    { id: 'campus-studio', kind: 'HOUSE', hood: 'east-rock', cap: 15, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 15, standing: [70, 55, 40],
      pressure: 55, note: 'A studio apartment near campus. A dozen people on a Saturday evening, a folk bill, and the lease has a short fuse.' },
    { id: 'triple-decker', kind: 'HOUSE', hood: 'fair-haven', cap: 35, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 45, note: 'A triple-decker basement with a low ceiling and a damp floor. The landlord lives upstairs and can hear every chord.' },
    { id: 'harbor-bay', kind: 'DIY', hood: 'city-point', cap: 80, rent: 70, deposit: 0, pa: .5, curfew: 1350, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A bay in a boat-storage warehouse by the harbor. Loud is fine here, but it is far from the kids and the fire marshal is watching.' },
    { id: 'community-hall', kind: 'HALL', hood: 'newhallville', cap: 150, rent: 150, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A church or community hall on a Sunday afternoon. A rental fee, and a hall member who wants to know what the music is.' },
    { id: 'book-shop', kind: 'SHOP', hood: 'westville', cap: 50, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [70, 65, 70], following: .2,
      note: 'A bookshop that clears its floor for bands. Over by nine, and the owner is tired of the rent going up.' },
    { id: 'green-bar', kind: 'BAR', hood: 'downtown', cap: 120, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar near the Green with small-bill nights and a canned-food benefit in December. Twenty-one and over unless it runs a juice-bar night.' },
    { id: 'harbor-yard', kind: 'OUTDOOR', hood: 'city-point', cap: 400, rent: 25, pa: .5, curfew: 1200, ac: false, outdoor: true, sketch: 35, standing: [55, 55, 45],
      note: 'A brewery yard on the harbor side. All ages for one summer day, and the weather decides everything.' },
    { id: 'rock-club', kind: 'CLUB', hood: 'downtown', cap: 600, houseCosts: 200, split: .8, pa: .9, ages: ['ALL', 'A18'], curfew: 1380, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'], note: 'The long-running rock club downtown, with wristbands and death metal tours. Wants a name on the bill and weeks of lead time.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 2500, rent: 2200, deposit: 500, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .8, sketch: 5,
      standing: [40, 70, 70], notice: 112, needs: ['FULL_BILL'], note: 'A restored theater for punk-adjacent tours. All ages, ticketed, and far out of reach for now.' }
  ],

  contacts: ['hartford', 'bridgeport-ct', 'providence', 'springfield-ma', 'worcester-ma'],

  calendar: [
    { id: 'street-festa', label: 'the Italian street festival', tag: 'festival', month: 6, week: 4, dows: [3, 4, 5, 6], can: [.92, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'arts-fest', label: 'the summer arts festival', tag: 'festival', month: 6, weeks: [2, 4], dows: [4, 5, 6], can: [.92, .90, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'old-side-parade', label: 'the old-side community parade', tag: 'parade', month: 6, week: 2, dows: [5], can: [.90, .88, .88], hoods: ['newhallville'], elsewhere: [1, 1, 1] },
    { id: 'diy-fest', label: 'the summer all-ages festival', tag: 'festival', month: 7, week: 2, dows: [5], can: [.90, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.85, .95, .95] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1200, weekend: 1200, inForce: false } },

  points: [
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 121000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 190000 },
    { name: 'Bridgeport', state: 'CT', lat: 41.19, lon: -73.2, pop: 148000 },
    { name: 'Stamford', state: 'CT', lat: 41.05, lon: -73.54, pop: 136000 }
  ],
  roads: ['I-95', 'I-91', 'Route 15', 'Route 8', 'Route 34', 'Route 1'],

  words: {
    street: ['Chapel Street', 'Grand Avenue', 'Whalley Avenue', 'Whitney Avenue', 'Orange Street', 'Ferry Street', 'Dixwell Avenue', 'Wooster Street'],
    water: ['the harbor', 'the Quinnipiac', 'Long Island Sound', 'the West River'],
    hood: ['Fair Haven', 'East Rock', 'Westville', 'Edgewood', 'the Hill', 'Dwight', 'Newhallville', 'Dixwell', 'Wooster Square', 'City Point', 'the Annex', 'Long Wharf'],
    thing: ['triple-decker', 'apizza', 'damp basement', 'elm', 'oyster shell', 'tomato pie', 'bakery', 'taqueria', 'washer and dryer', 'social hall', 'milk crate', 'practice space'],
    weather: ['nor\'easter', 'slush', 'basement flood']
  },

  events: [
    { id: 'NEW_HAVEN_CT_BASEMENT_FLOOD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN' },
      telegraph: 'A long, hard rain is forecast all week.',
      title: 'The basement floods',
      body: 'The rain has pushed an inch of water across the basement floor. The merch table goes up on milk crates and the singer is standing next to the dryer.',
      options: [
        { id: 'CRATES', label: 'Put everything on milk crates and play on', likely: 'It\'s wet and loud, and some of the crowd stays upstairs.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The floor was wet and the band played on crates.' },
        { id: 'MOVE', label: 'Move it a day, once the floor dries', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come came.' },
        { id: 'HALL', label: 'Ask a social hall to take it for the night', likely: 'Dry and bigger, but with a hall member watching.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A hall member asked what the night was called, then stayed for a set.' }
      ] },

    { id: 'NEW_HAVEN_CT_GAME_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and the roads around the bowl will be jammed all afternoon.',
      title: 'The highway is a parking lot',
      body: 'The streets and the highway around the bowl are jammed. The first band is stuck in the line, and the load-in door is blocked for an hour.',
      options: [
        { id: 'LATE', label: 'Push the doors back an hour', likely: 'The bands get there, but the crowd comes late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'The van got through at nine, doors opened an hour late, and the night ran tight against the ordinance.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is stuck in traffic.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the list sat in the jam and gave up, and the regulars were already in the basement.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come came.' }
      ] },

    { id: 'NEW_HAVEN_CT_FORECLOSURE', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'A notice went up on the front door of the house you booked.',
      title: 'The sign on the porch',
      body: 'The house is in foreclosure and the sign went up the same week as your show. The housemates say it can happen once, if it is over by the end of the month.',
      options: [
        { id: 'ONCE', label: 'Run it as the last one there', likely: 'It\'s a tight, sad, loud night, and it\'s quiet by ten.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'Everyone knew it was the last one, so the floor was packed and the singer signed the wall.' },
        { id: 'HOUSE', label: 'Move it to another house', likely: 'Smaller, and a stranger upstairs.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A friend of a friend took the bill with a day to spare, and it was smaller and quieter.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could come came.' }
      ] },

    { id: 'NEW_HAVEN_CT_LAST_BEFORE_WALL', when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'The owner of the garage building has been seen with a tape measure.',
      title: 'The last show before the drywall',
      body: 'The owner of the industrial building is putting up a wall across the garage next week. Your show is the last one before it goes up.',
      options: [
        { id: 'PACK', label: 'Tell everyone and pack it', likely: 'It\'s a big, loud farewell, and word gets around.',
          effects: [{ op: 'MONEY', amount: -20 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.2 }, { op: 'REGULARS', pct: .02 }],
          result: 'Word spread and the garage was shoulder to shoulder, and somebody wrote on the new wall in marker.' },
        { id: 'QUIET', label: 'Keep it quiet and keep the address private', likely: 'It\'s a small night with no trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Thirty people who knew came, with no owner and no police, and it was a long goodbye.' }
      ] }
  ]
});
