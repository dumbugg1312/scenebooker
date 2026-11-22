SB.Cities.register('lincoln-ne', {
  v: 1,
  slug: 'lincoln-ne',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of nebraska', 'university of nebraska-lincoln', 'unl', 'nebraska wesleyan', 'union college', 'southeast community college',
           'doane university', 'doane', 'midland university', 'lincoln journal star', 'journal star', 'daily nebraskan', 'kzum', 'startran',
           'runza', 'valentino\'s', 'valentinos', 'nelnet', 'bryan health', 'saint elizabeth', 'kawasaki', 'national museum of roller skating',
           'celebrate lincoln', 'uncle sam jam', 'boo at the zoo', 'husker', 'huskers', 'big red', 'go big red', 'offutt', 'amtrak',
           'california zephyr', 'telegraph district', 'taco inn', 'amigos', 'village inn', 'busch light', 'natty light', 'fireball',
           'vfw', 'american legion', 'knights of columbus', 'lincoln public schools', 'nebraska nice',
           'the soddy', 'haymow', 'windbreak', 'the shelterbelt', 'tall corn hall', 'fallow', 'the culvert', 'lancaster lanes annex',
           'switchyard', 'the cistern', 'bohemian basement', 'salt flat social',
           'memorial stadium', 'pinnacle bank arena', 'haymarket park', 'sunken gardens', 'pioneers park', 'lincoln exposed', 'lincoln calling', 'lincoln marathon',
           'national guard marathon', 'lincoln race course', 'lincoln zombiefest', 'hear nebraska', 'rabble media', 'lied center', '1011 now',
           'nebraska state fair', 'lincoln police department', 'nebraska liquor control commission', 'lincoln municipal code', 'lincoln station',
           'star city holiday parade', 'haymarket farmers market', 'lincoln airpark', 'lincoln air national guard'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['kzum*', 'runza*', 'valentino*', 'journal star*', 'daily nebraskan*', 'husker*', 'big red*', 'startran*', 'hear nebraska*', 'lincoln exposed*'],

  blurb: ['A campus town on a flat grid, fed by farm-town kids and basements. The punk here is old, and half the crowd leaves in May.',
          'Football Saturdays own downtown, so the real shows happen late, in student houses, or on a Sunday.'],
  hard: 'Football weekends, short summers, and the bigger city an hour east.',
  region: 'the Plains',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lincoln' },
    { id: 'waverly', kind: 'FEEDER', name: 'Waverly', minutes: 15, bearing: 40, note: 'A bedroom suburb with no scene to speak of.' },
    { id: 'ashland', kind: 'FEEDER', name: 'Ashland', minutes: 25, bearing: 55, note: 'A small river-edge town.' },
    { id: 'seward', kind: 'FEEDER', name: 'Seward', minutes: 25, bearing: 280, note: 'A college town with church-youth music and a big Fourth of July.' },
    { id: 'crete', kind: 'FEEDER', name: 'Crete', minutes: 30, bearing: 240, note: 'A small college town of Czech heritage with a small scene.' },
    { id: 'wahoo', kind: 'FEEDER', name: 'Wahoo', minutes: 40, bearing: 355, note: 'A farm town where bands do form.', bands: 1 },
    { id: 'beatrice', kind: 'FEEDER', name: 'Beatrice', minutes: 45, bearing: 185, note: 'Farm and small manufacturing; kids drive up for shows.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 50, bearing: 15, note: 'A packing-plant and industry town, closer to the big city east for some.' },
    { id: 'york', kind: 'FEEDER', name: 'York', minutes: 50, bearing: 260, note: 'A farm town with a small college.' },
    { id: 'nebraska-city', kind: 'FEEDER', name: 'Nebraska City', minutes: 50, bearing: 110, note: 'Apple country on the river; a small scene.' },
    { id: 'columbus', kind: 'FEEDER', name: 'Columbus', minutes: 70, bearing: 320, note: 'Industrial and farm town to the north.' },
    { id: 'hastings', kind: 'FEEDER', name: 'Hastings', minutes: 85, bearing: 250, note: 'A farm and trade center with a small college.' },
    { id: 'grand-island', kind: 'FEEDER', name: 'Grand Island', minutes: 90, bearing: 265, note: 'A bigger, diverse packing-plant city out on I-80.' },
    { id: 'manhattan', kind: 'PEER', name: 'Manhattan', state: 'KS', minutes: 120, bearing: 185, scene: 700, note: 'A smaller college town to the south.' },
    { id: 'topeka', kind: 'PEER', name: 'Topeka', state: 'KS', minutes: 150, bearing: 170, scene: 800, note: 'A quieter capital city.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', state: 'KS', minutes: 180, bearing: 160, slug: 'lawrence-ks', note: 'A famous music college town and a real exchange partner.' }
  ],

  hoods: [
    { id: 'downtown-haymarket', name: 'downtown and the Haymarket', route: 'downtown', note: 'Rebuilt rail warehouses, an arena, lofts and bars; expensive, heavily policed, and where touring bands load in.' },
    { id: 'downtown-east', name: 'downtown east of O Street', route: 'campus', note: 'Older low-rise blocks near campus with bars, record stores and cafes; where people mean "the scene".' },
    { id: 'near-south', name: 'Near South', route: 'old-side', note: 'Craftsman and Victorian houses rented to students and young workers, with basements and porches; drifting upscale.' },
    { id: 'havelock-belmont', name: 'Havelock and Belmont', route: 'work-side', note: 'Former railroad and farm towns annexed long ago; cheap rent, auto shops, garages and basements.' },
    { id: 'university-place', name: 'University Place and Bethany', route: 'old-side', note: 'Quiet older streets on the north side with garages and small halls; students, families and retirees.' },
    { id: 'student-blocks', name: 'the student blocks by campus', route: 'campus', note: 'Rental houses with backyards and PAs; leases end each May and August.' },
    { id: 'west-edge', name: 'the west edge', route: 'work-side', note: 'Cheap, industrial, car-oriented land with practice spaces and warehouse rooms.' }
  ],

  rooms: [
    { id: 'north-house', kind: 'HOUSE', hood: 'havelock-belmont', cap: 60, curfew: 1320, ac: false, pressure: 55, start: true,
      note: 'A basement on the north side with a PA run by the people who live there. Loud conversation counts as a noise call.' },
    { id: 'student-yard', kind: 'HOUSE', hood: 'student-blocks', cap: 80, curfew: 1350, ac: false, pressure: 60,
      note: 'A backyard and basement near campus. Police have been quicker lately and the renters are warier.' },
    { id: 'up-garage', kind: 'HOUSE', hood: 'university-place', cap: 50, curfew: 1320, ac: false, pressure: 55,
      note: 'A garage among families and retirees. The likeliest place for a neighbor to call.' },
    { id: 'o-street-storefront', kind: 'DIY', hood: 'downtown-east', cap: 120, curfew: 1380, ac: false, pressure: 55,
      note: 'A community-run storefront east of the center. All ages, cheap, and the building may not be theirs much longer.' },
    { id: 'arts-space', kind: 'DIY', hood: 'downtown-east', cap: 150, curfew: 1350, ac: false, pressure: 50,
      note: 'An art-and-music space in a rented building that grew out of the house scene. Substance free, and nobody is sure what it is now.' },
    { id: 'skatepark-room', kind: 'DIY', hood: 'near-south', cap: 150, curfew: 1320, outdoor: true, ac: false, pressure: 45,
      note: 'Shows inside a skatepark, started by people from the house scene. All ages, substance free, and open to the weather.' },
    { id: 'up-hall', kind: 'HALL', hood: 'university-place', cap: 150, curfew: 1350, ac: true,
      note: 'A rented hall on the north side. All ages, no beer, and a long list of rules.' },
    { id: 'west-warehouse', kind: 'DIY', hood: 'west-edge', cap: 60, curfew: 1380, ac: false, pressure: 65, needs: ['VOUCH'],
      note: 'A warehouse practice room on the edge of town. Unpermitted, so one call to the fire marshal closes it.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown-east', cap: 200, ages: ['A21', 'ALL'], matinee: true, curfew: 1500, ac: true,
      note: 'A downtown bar with a stage. The local heavy bands play here, and now and then there is an early all-ages set.' },
    { id: 'haymarket-club', kind: 'CLUB', hood: 'downtown-haymarket', cap: 300, ages: ['A18', 'ALL'], curfew: 1410, ac: true,
      note: 'The mid-size room for touring hardcore and metalcore. Eighteen and over unless the booker pushes for all ages.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown-haymarket', cap: 1500, ages: ['ALL'], curfew: 1380,
      note: 'The arena and the big theater downtown. Only for a tour that fills them.' }
  ],

  contacts: ['lawrence-ks', 'omaha', 'kansas-city', 'des-moines-ia'],

  calendar: [
    { id: 'local-fest', label: 'the local bands festival', tag: 'festival', month: 2, weeks: [2, 3], dows: [3, 4, 5], can: [.85, .85, .85], hoods: ['downtown-east'], elsewhere: [.95, .95, .95] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 5, week: 1, dows: [6], can: [.92, .90, .90], hoods: ['downtown-haymarket'], elsewhere: [1, 1, 1] },
    { id: 'city-fest', label: 'the city festival', tag: 'festival', month: 6, week: 1, dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'fireworks', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.85, .85, .85] },
    { id: 'state-fair', label: 'the state fair weekend', tag: 'fair', month: 8, weeks: [4, 5], dows: [4, 5, 6], can: [.92, .92, .92] },
    { id: 'move-in', label: 'move-in week', tag: 'graduation', month: 8, weeks: [3, 4], dows: [4, 5], can: [1.05, 1.08, 1.05], hoods: ['student-blocks'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [5], can: [.80, .92, .92], hoods: ['downtown-haymarket', 'downtown-east'], elsewhere: [.95, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.80, .92, .92], hoods: ['downtown-haymarket', 'downtown-east'], elsewhere: [.95, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 },
    { name: 'Kansas City', state: 'MO', lat: 39.1, lon: -94.58, pop: 2200000 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62, pop: 710000 },
    { name: 'Sioux Falls', state: 'SD', lat: 43.55, lon: -96.73, pop: 280000 }
  ],
  roads: ['I-80', 'I-180', 'US 77', 'US 34', 'US 6'],

  words: {
    street: ['O Street', 'Cornhusker Highway', 'Holdrege Street', 'Van Dorn Street', 'Highway 77'],
    water: ['Salt Creek', 'the Platte'],
    hood: ['the Haymarket', 'Near South', 'Havelock', 'Belmont', 'University Place', 'Bethany'],
    thing: ['kolache', 'grain elevator', 'tornado siren', 'basement', 'shelter belt', 'combine', 'blizzard', 'move-out curb', 'football Saturday', 'work-truck van', 'shelter basement', 'move-out curb', 'football Saturday', 'work-truck van', 'shelter basement'],
    weather: ['tornado warning', 'hail', 'blizzard', 'ice']
  },

  events: [

    { id: 'LINCOLN_NE_FOOTBALL_SATURDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home football Saturday is coming, and the whole downtown will be parked solid.',
      title: 'The parking is gone',
      body: 'Every lot downtown is sold out for the game and every bar is shoulder to shoulder. Your Saturday show is in the middle of it.',
      options: [
        { id: 'SUNDAY', label: 'Move it to Sunday afternoon in a north-side basement', likely: 'Smaller, but the neighbors are at church.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A Sunday basement set. Small, loud, and nobody called.' },
        { id: 'LATE', label: 'Push doors back until the game crowd clears', likely: 'The kids who want a real night still come.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour late. The ones who came were loud and glad to be out of the crowd.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd stays away.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The game ate the casual crowd. The regulars came on foot.' }
      ] },

    { id: 'LINCOLN_NE_HAIL_WARNING', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6] },
      telegraph: 'Severe storms are in the forecast, and the sirens have already gone off once this month.',
      title: 'The sirens go off mid-set',
      body: 'A hail warning comes through halfway into the set in the skatepark. The crowd has to shelter in a basement a few blocks off, with the amps.',
      options: [
        { id: 'SHELTER', label: 'Move the rest of the set to the basement', likely: 'Packed and loud. The gear gets wet.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The whole crowd crammed under a low ceiling and the second half was the best part of the night.' },
        { id: 'WAIT', label: 'Hold the band and wait out the cell', likely: 'A late finish. Some of the kids have to leave.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'You waited out the storm. Half the crowd drifted home.' },
        { id: 'END', label: 'Call it and send everyone home', likely: 'A short night, but nobody is hurt.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'You called it early. A few stayed in the cars to listen to the hail.' }
      ] },

    { id: 'LINCOLN_NE_LEASE_TURNOVER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5], months: [5, 8] },
      telegraph: 'It is lease-turnover week on the student blocks, and the house with the PA is boxes.',
      title: 'The house with the PA is empty',
      body: 'The people who ran the house are gone for the summer, and the PA is in a car trunk. You need a new yard before the move-in crowd comes back.',
      options: [
        { id: 'YARD', label: 'Find a new yard and set it up yourself', likely: 'Hours of work. The new neighbors do not know you yet.',
          effects: [{ op: 'HOURS', d: -3, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'A new yard, a borrowed PA, and a quiet street. It worked, barely.' },
        { id: 'HALL', label: 'Move it to a rented hall', likely: 'Costs money and loses some of the feel.',
          effects: [{ op: 'MONEY', amount: -60 }, { op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }],
          result: 'A hall took the bill. Plenty of chairs and no stage dive.' },
        { id: 'ACCEPT', label: 'Run a thin night with what is left', likely: 'The student crowd is gone.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The student blocks were empty. The farm-town kids made the night.' }
      ] }
  ]
});
