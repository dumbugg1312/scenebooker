SB.Cities.register('flint-mi', {
  v: 1,
  slug: 'flint-mi',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['general motors', 'buick', 'buick city', 'chevrolet', 'ac spark plug', 'fisher body', 'uaw', 'back to the bricks', 'the crim', 'crim',
           'um-flint', 'university of michigan-flint', 'university of michigan', 'kettering university', 'mott community college', 'michigan state', 'central michigan',
           'detroit lions', 'detroit pistons', 'detroit tigers', 'firebirds', 'mlive', 'faygo', 'vernors', 'vfw', 'american legion', 'knights of columbus',
           'local 40 annex', 'the sit-down room', 'carriage house social', 'dort street garage', 'the party store back room', 'chevy flats', 'crooked elm hall',
           'north end lot', 'the spark plug room', 'kearsley basement', 'longway unit b', 'the coney annex',
           'vehicle city fest', 'hap crim', 'crim festival of races', 'genesee county fair', 'flint firebirds', 'flintside', 'the flint journal', 'flint journal',
           'moshpitnation', 'wgrd', 'buckham alley', 'flint drop fest', 'flint farmers market', 'citylab', 'bandsintown', 'songkick', 'jambase', 'flint water crisis'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. The water crisis is written only as 'the water'. */
  blocklist: ['general motors*', 'buick*', 'chevrolet*', 'ac spark plug*', 'back to the bricks*', 'faygo*', 'mlive*', 'kettering university*', 'vehicle city fest*', 'flintside*'],

  blurb: ['The scene is held together by one stubborn all-ages club that keeps changing buildings, and the crowd is loyal and keeps an eye on its own pits.',
          'Reunion shows for old local bands draw more than any touring act, and benefit bills are a regular kind of night.'],
  hard: 'One strict all-ages room; the heavier bands have nowhere else to go',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Ann Arbor', state: 'MI', lat: 42.28, lon: -83.74 },
    { name: 'Grand Rapids', state: 'MI', lat: 42.96, lon: -85.67 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Flint' },
    { id: 'grand-blanc', kind: 'FEEDER', name: 'Grand Blanc', minutes: 15, bearing: 170, scene: 80, note: 'A prosperous suburb to the south; kids with cars and gear, and some basement bands.' },
    { id: 'davison', kind: 'FEEDER', name: 'Davison', minutes: 15, bearing: 50, note: 'A working-class exurb to the northeast; few shows of its own.' },
    { id: 'flushing', kind: 'FEEDER', name: 'Flushing', minutes: 15, bearing: 285, note: 'A river suburb to the west with a small scene.' },
    { id: 'fenton', kind: 'FEEDER', name: 'Fenton', minutes: 20, bearing: 155, note: 'A small, affluent lake town with pop-punk and garage kids.' },
    { id: 'swartz-creek', kind: 'FEEDER', name: 'Swartz Creek and Durand', minutes: 20, bearing: 260, note: 'Suburb and railroad town out I-69.' },
    { id: 'lapeer', kind: 'FEEDER', name: 'Lapeer', minutes: 30, bearing: 100, note: 'A farm and county-seat town with some metal and punk.' },
    { id: 'frankenmuth', kind: 'FEEDER', name: 'Frankenmuth', minutes: 35, bearing: 345, note: 'A tourist town with few shows; its kids drive in.' },
    { id: 'owosso', kind: 'FEEDER', name: 'Owosso', minutes: 40, bearing: 265, note: 'A small manufacturing town with a small scene.' },
    { id: 'caro', kind: 'FEEDER', name: 'Caro', minutes: 45, bearing: 40, note: 'A farm town in the Thumb; likely no scene, kids come to Flint.' },
    { id: 'bay-city', kind: 'FEEDER', name: 'Bay City and Midland', minutes: 55, bearing: 350, note: 'A port town and a chemical town to the north; Bay City has bills of its own.' },
    { id: 'saginaw', kind: 'PEER', name: 'Saginaw', minutes: 40, bearing: 345, scene: 700, note: 'Smaller, rougher, the same decline; the same town with fewer rooms.' },
    { id: 'lansing', kind: 'PEER', name: 'Lansing', minutes: 60, bearing: 265, slug: 'lansing-mi', note: 'The capital and a big university next door; more shows and more money.' },
    { id: 'toledo', kind: 'PEER', name: 'Toledo', state: 'OH', minutes: 100, bearing: 165, slug: 'toledo-oh', note: 'A fellow factory town down US 23.' },
    { id: 'kalamazoo', kind: 'PEER', name: 'Kalamazoo', minutes: 135, bearing: 255, slug: 'kalamazoo-mi', note: 'A college city at the far edge of a day trip.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A slowly reviving core of a market, restaurants and lofts by the river; arts rooms more than true DIY.' },
    { id: 'carriage-town', name: 'Carriage Town', route: 'old-side', note: 'Old Victorians, carriage houses and brick industrial buildings by the rail yard; where artists and cheap warehouse space gathered.' },
    { id: 'cultural-center', name: 'the cultural center east of downtown', route: 'campus', note: 'Museums, a community college and an auditorium; good for sanctioned all-ages nights, poor for DIY.' },
    { id: 'northside', name: 'the north side', route: 'work-side', note: 'Block after block of vacant lots and surviving bungalows; cheap, ignored and loud-tolerant, with real safety worries.' },
    { id: 'eastside', name: 'the east side', route: 'work-side', note: 'Working-class bungalows, strip malls and party stores along Dort Highway; hall and church-basement territory.' },
    { id: 'mott-park', name: 'Mott Park and the west side', route: 'old-side', note: 'An older, intact neighborhood of homeowners and students; backyard and basement shows, and neighbors who call.' },
    { id: 'south-side', name: 'the south side toward Grand Blanc', route: 'campus', note: 'Poor blocks by the city line giving way to richer suburbs; where suburban kids begin.' },
    { id: 'inner-ring', name: 'Flint Township, Burton and Mount Morris', route: 'campus', note: 'Strip malls, posts, church halls and garages; where many suburban all-ages shows really happen.' },
    { id: 'grand-blanc-hood', name: 'Grand Blanc', route: 'town:grand-blanc', note: 'The prosperous suburb to the south: garages and basements, kids with cars and gear.' }
  ],

  rooms: [
    { id: 'mott-basement', kind: 'HOUSE', hood: 'mott-park', cap: 60, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 55, start: true, note: 'A basement under an old frame house on the west side. The neighbors call, and nine o\'clock is the real clock.' },
    { id: 'north-lot', kind: 'HOUSE', hood: 'northside', cap: 40, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 30, standing: [60, 55, 40],
      pressure: 40, note: 'A backyard show between vacant lots. Nobody to complain, and nobody around if something goes wrong.' },
    { id: 'carriage-warehouse', kind: 'DIY', hood: 'carriage-town', cap: 150, rent: 70, deposit: 0, pa: .6, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 50],
      pressure: 55, note: 'A warehouse-style art space that hosts all-ages punk nights and big anniversary bills. The building and the money are always the worry.' },
    { id: 'dry-club', kind: 'DIY', hood: 'downtown', cap: 250, rent: 80, deposit: 0, pa: .7, curfew: 1380, ac: false, sketch: 20, standing: [50, 70, 60],
      pressure: 60, note: 'The town\'s one long-running all-ages club, run by one booker and moved around by its landlords. No alcohol, no moshing, and the sign means it.' },
    { id: 'dort-lounge', kind: 'BAR', hood: 'eastside', cap: 400, soundFee: 60, pa: .8, ages: ['A18', 'A21'], curfew: 1470, ac: true, following: .4, sketch: 15,
      standing: [45, 65, 70], note: 'A concert lounge on the highway strip. The heavy touring bills come here because the dry club will not have a pit.' },
    { id: 'union-hall', kind: 'HALL', hood: 'inner-ring', cap: 200, rent: 150, deposit: 75, pa: .5, curfew: 1350, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented post or church hall out past the city line. Cheap, with a deposit and a hall keeper who watches the clock.' },
    { id: 'comic-shop', kind: 'SHOP', hood: 'downtown', cap: 50, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'A record and comic shop with a floor big enough for an in-store. Early sets only, over by nine.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'mott-park', cap: 80, rent: 15, pa: .4, curfew: 1230, sketch: 30, standing: [60, 55, 40],
      note: 'A skatepark and a pavilion in the park. Daylight bills from April to September, and the weather rules.' },
    { id: 'stage-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 150, split: .8, pa: .85, ages: ['A18'], curfew: 1440, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A rock bar with a stage, 18 and over with a wristband on the slow nights.' },
    { id: 'cultural-theater', kind: 'BIG', hood: 'cultural-center', cap: 2000, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .7, sketch: 5,
      standing: [35, 70, 70], note: 'A historic theater at the cultural center. Sanctioned, expensive and touring only.' },
    { id: 'blanc-garage', kind: 'DIY', hood: 'grand-blanc-hood', cap: 60, rent: 0, pa: .4, curfew: 1350, ac: false, sketch: 35, standing: [65, 60, 45],
      pressure: 45, note: 'A garage and basement of suburban kids with cars and gear. Fifteen minutes south, and easy.' }
  ],

  contacts: ['lansing-mi', 'toledo-oh', 'ann-arbor-mi', 'kalamazoo-mi', 'detroit'],

  calendar: [
    { id: 'car-weekend', label: 'the big classic-car weekend', tag: 'festival', month: 8, week: 3, dows: [4, 5], can: [.88, .85, .85], hoods: ['downtown', 'eastside'], elsewhere: [.97, .95, .95] },
    { id: 'race-weekend', label: 'race weekend', tag: 'race', month: 8, week: 4, dows: [4, 5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, week: 4, dows: [3, 4, 5, 6], can: [.95, .93, .93] },
    { id: 'alley-music-day', label: 'the downtown alley music day', tag: 'festival', month: 8, week: 2, dows: [5], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fireworks', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [3, 4, 5], can: [.88, .88, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 640000 },
    { name: 'Port Huron', state: 'MI', lat: 42.97, lon: -82.43, pop: 30000 },
    { name: 'Mount Pleasant', state: 'MI', lat: 43.60, lon: -84.77, pop: 26000 },
    { name: 'Jackson', state: 'MI', lat: 42.25, lon: -84.40, pop: 31000 }
  ],
  roads: ['I-75', 'I-69', 'I-475', 'US 23', 'M-21'],

  words: {
    street: ['Saginaw Street', 'Dort Highway', 'Court Street', 'Corunna Road', 'Fenton Road', 'Bristol Road'],
    water: ['the Flint River', 'Swartz Creek', 'Thread Lake'],
    hood: ['Carriage Town', 'Grand Traverse', 'Mott Park', 'Civic Park', 'Beecher', 'Flint Township'],
    thing: ['party store', 'coney', 'vacant lot', 'furnace', 'storm door', 'pop', 'land bank', 'no-moshing sign', 'reunion show', 'benefit bill'],
    weather: ['lake-effect snow', 'ice storm', 'road salt']
  },

  events: [
    { id: 'FLINT_MI_BUILDING_MOVE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'The all-ages club\'s building is torn up for repairs again, and nobody knows how long it will last.',
      title: 'The club is under renovation',
      body: 'Contractors have torn up the club\'s floor and the bill is booked for Saturday. The warehouse space and a rented hall are both open, but neither fits the whole night.',
      options: [
        { id: 'SPLIT', label: 'Split the bill between the warehouse and the hall', likely: 'It means two rooms, two door counts, and a lot of driving.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Half the bands played the warehouse and half played the hall, and the crowd went back and forth in cars.' },
        { id: 'BASEMENT', label: 'Move the whole bill to a basement', likely: 'It\'s smaller and louder.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill, and the floor was packed to the stairs.' },
        { id: 'MOVE', label: 'Move it a week', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it, and the people who could make it came.' }
      ] },

    { id: 'FLINT_MI_CAR_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [8], calendar: 'festival' },
      telegraph: 'The classic-car weekend is on, and the police have posted a youth curfew zone from six.',
      title: 'The curfew zone starts at six',
      body: 'Downtown is full of chrome and cruisers, and everyone under seventeen has to be out of the zone by six, but the headliner goes on at nine.',
      options: [
        { id: 'EARLY', label: 'Start at four and finish before six', likely: 'It\'s a short bill, but the kids get a full night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -150 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors were at four and you were done by half past five, and the kids were out of the zone with minutes to spare.' },
        { id: 'STRIP', label: 'Move to the strip on the east side', likely: 'You\'re out of the zone, and the crowd is older.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The east side was out of the zone, and the older crowd was happy to come.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The younger kids leave before the headliner.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The younger half of the room walked out at six, and the bill played to the rest.' }
      ] },

    { id: 'FLINT_MI_NINE_O_CLOCK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A neighbor of the west-side house was seen on the porch with a phone, listening.',
      title: 'The nine o\'clock call',
      body: 'The bill runs past nine on a school night and the neighbors call about the noise rule. The host wants to argue about decibels at the property line, and the police are on their way.',
      options: [
        { id: 'ACOUSTIC', label: 'Go acoustic for the rest of the night', likely: 'It\'s quiet and strange and a little funny.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The headliner played the last set sitting on the stairs, and nobody called again.' },
        { id: 'ARGUE', label: 'Let the host argue the decibel number', likely: 'It works once.',
          effects: [{ op: 'REGULARS', pct: -.02 }],
          result: 'The officer stood on the lawn and read the number twice, and the host lost the argument.' },
        { id: 'END', label: 'End the night right there', likely: 'It\'s short, and everyone goes home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The last band played one song, and everybody was gone by ten.' }
      ] }
  ]
});
