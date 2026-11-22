SB.Cities.register('fort-collins-co', {
  v: 1,
  slug: 'fort-collins-co',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['colorado state university', 'csu', 'cu boulder', 'university of colorado', 'university of wyoming', 'university of northern colorado', 'woodward', 'anheuser-busch',
           'broadcom', 'microsoft', 'tour de fat', 'colorado brewers festival', 'brewers festival', 'colorado marathon', 'fortitude 10k', 'horsetooth half marathon',
           'poudre fire authority', 'f.e. warren', 'cameron peak', 'cow college', 'the choice city', 'vfw', 'american legion',
           'the sugar beet annex', 'larimer grange no. 9', 'the hailstone', 'horsetooth rec room', 'canal street garage', 'the cottonwood cellar', 'mason spur',
           'the ditch rider', 'cow college annex', 'shields street carport', 'the chinook room', 'poudre pallet co.',
           'rocky mountain collegian', 'the collegian', 'coloradoan', 'northforty', 'north forty news', 'westword', 'visit fort collins', 'new belgium', 'taste of fort collins', 'peach festival', 'larimer county fair', 'the ranch events complex', 'first friday art walk', 'holiday lighting ceremony', 'foco music alliance', 'focomx', 'bohemian nights', 'old town square', 'civic center park', 'fort collins police services', 'front range community college', 'kmax', '99.9 the point', 'hughes stadium', 'canvas stadium', 'new belgium brewing'],
  /* The dossier's twelve invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['colorado state*', 'tour de fat*', 'colorado brewers*', 'poudre fire*', 'cow college*', 'fortitude*'],

  blurb: ['Sober, kid-run hardcore and metal in a town of bluegrass and taprooms. Shows hop between basements, garages and a reuse-arts back room.',
          'No stage, shoulder to shoulder, and anyone can climb up for the mic.'],
  hard: 'Under-21 bands, few permanent rooms, and the houses keep closing.',
  region: 'the Front Range',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Albuquerque', state: 'NM', lat: 35.08, lon: -106.65 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .08, reason: 'The local shows blend hardcore and metal on the same bill.' },
    { fan: 'metal', band: 'hardcore', d: .08, reason: 'The local shows blend hardcore and metal on the same bill.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Fort Collins' },
    { id: 'laporte', kind: 'FEEDER', name: 'Laporte and Bellvue', minutes: 15, bearing: 320, note: 'A semi-rural edge of barns and acreage, already in the town\'s orbit.' },
    { id: 'wellington', kind: 'FEEDER', name: 'Wellington', minutes: 20, bearing: 5, note: 'A small bedroom town up I-25; teens drive down for shows.' },
    { id: 'windsor', kind: 'FEEDER', name: 'Windsor and Timnath', minutes: 20, bearing: 125, note: 'Fast-growing family suburbs to the southeast with no scene.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 25, bearing: 185, pop: 80000, note: 'An arts-and-sculpture suburb with its own small scene and a lot of suburban kids.' },
    { id: 'berthoud', kind: 'FEEDER', name: 'Berthoud', minutes: 30, bearing: 185, note: 'A farm town turned commuter town.' },
    { id: 'red-feather', kind: 'FEEDER', name: 'Red Feather Lakes and Livermore', minutes: 50, bearing: 315, note: 'Remote ranch and mountain kids; the roads close in bad weather.' },
    { id: 'estes-park', kind: 'FEEDER', name: 'Estes Park', minutes: 60, bearing: 230, note: 'A tourist town at the mountain gate; seasonal workers and a hard winter drive.', season: { months: [6, 7, 8], mul: 1.4 } },
    { id: 'laramie', kind: 'FEEDER', name: 'Laramie', state: 'WY', minutes: 80, bearing: 330, note: 'A university town up US 287; students sometimes come south for a show.' },
    { id: 'plains', kind: 'FEEDER', name: 'Fort Morgan and Brush', minutes: 90, bearing: 105, note: 'Feedlot and sugar-beet towns on the plains; kids come for the bigger town.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', state: 'WY', minutes: 45, bearing: 5, scene: 400, slug: 'cheyenne-wy', note: 'A smaller capital and base town where I-25 meets I-80; shows trade south from there.' },
    { id: 'greeley', kind: 'PEER', name: 'Greeley', minutes: 45, bearing: 130, slug: 'greeley-co', note: 'The rougher, working-class neighbor; crowds and bands trade both ways.' },
    { id: 'boulder', kind: 'PEER', name: 'Boulder', minutes: 55, bearing: 190, slug: 'boulder-co', note: 'The pricey flagship town and friendly rival, with a long music history.' }
  ],

  hoods: [
    { id: 'old-town', name: 'Old Town', route: 'downtown', note: 'A historic brick core of bars, taprooms and restaurants; tourists and brewery crowds, and priced out for anything cheap.' },
    { id: 'campus-west', name: 'Campus West', route: 'campus', note: 'Student duplexes and small old houses by the university; the most house shows, and the first noise and landlord crackdowns.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'Strip malls and older commercial blocks along College Avenue south of Prospect; small units for practice rooms.' },
    { id: 'old-town-north', name: 'Old Town North', route: 'old-side', note: 'Former mills, auto shops and warehouses along the river, turning fast into taprooms, galleries and apartments.' },
    { id: 'east-side', name: 'the east side along Mulberry', route: 'work-side', note: 'Car lots, light industry and working-class neighborhoods toward the interstate; carports and industrial bays.' },
    { id: 'harmony', name: 'the Harmony corridor', route: 'campus', note: 'Office parks, new subdivisions and big churches; sterile, with a few garages and church halls.' },
    { id: 'foothills-edge', name: 'the foothills edge', route: 'old-side', note: 'Older houses and sheds near the reservoir; far from neighbors, cold in winter.' }
  ],

  rooms: [
    { id: 'mulberry-garage', kind: 'HOUSE', hood: 'east-side', cap: 60, curfew: 1320, pressure: 45, start: true,
      note: 'A family home with a soundproofed built-out garage and a small stage. The crowd is curated and the neighbors are friendly, as long as it stays small.' },
    { id: 'campus-basement', kind: 'HOUSE', hood: 'campus-west', cap: 40, curfew: 1320, pressure: 55,
      note: 'A basement with drums, a PA and no stage, shoulder to shoulder in the pit. Roommates and noise calls decide how long it lasts.' },
    { id: 'old-town-cellar', kind: 'HOUSE', hood: 'old-town-north', cap: 80, curfew: 1350, pressure: 55,
      note: 'A hidden basement under old brick. The town\'s pattern, and redevelopment and fire code are the threat.' },
    { id: 'foothills-shed', kind: 'HOUSE', hood: 'foothills-edge', cap: 50, curfew: 1320,
      note: 'An old house and a shed on acreage, far from neighbors. Cold in winter.' },
    { id: 'reuse-room', kind: 'DIY', hood: 'old-town', cap: 120, curfew: 1350, rent: 0, pressure: 55,
      note: 'A back room among bins of donated supplies, with alcohol-free, donation-only shows. It hops between spaces when a lease ends.' },
    { id: 'strip-unit', kind: 'DIY', hood: 'midtown', cap: 50, curfew: 1320, pressure: 55,
      note: 'A practice-room unit in a strip mall along College. Fire code and a landlord complaint are the risk.' },
    { id: 'lot-show', kind: 'OUTDOOR', hood: 'east-side', cap: 150, curfew: 1260,
      note: 'A parking lot or a thrift-store lot for a hardcore day. Permits and store managers decide.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'old-town', cap: 200, curfew: 1290,
      note: 'A park pavilion or the skatepark in summer. It needs a permit, and it ends at dusk.' },
    { id: 'taproom', kind: 'BAR', hood: 'old-town', cap: 250, curfew: 1500, ages: ['A21'],
      note: 'A taproom with a back-room stage that books metal and hardcore at 21-plus. The bookers keep drifting toward comedy and DJ nights.' },
    { id: 'cider-pub', kind: 'BAR', hood: 'campus-west', cap: 200, curfew: 1410, ages: ['ALL'],
      note: 'A cider pub that hosts metal and hardcore sets all ages. There is no longer-running alternative.' },
    { id: 'corner-club', kind: 'CLUB', hood: 'old-town', cap: 300, curfew: 1440, ages: ['A18'],
      note: 'A corner room that has changed names several times. The owners churn, and so does the booking.' },
    { id: 'big-theater', kind: 'BIG', hood: 'old-town', cap: 1000, curfew: 1380, ages: ['ALL'],
      note: 'The big theater on College. A hardcore headliner needs an adult for guests under eighteen, and a local organizer says it is too big to book often.' }
  ],

  contacts: ['greeley-co', 'boulder-co', 'denver', 'colorado-springs-co'],

  calendar: [
    { id: 'move-in', label: 'the university fall move-in', tag: 'holiday', month: 8, weeks: [2, 3], dows: [4, 5, 6], can: [1.08, 1.05, 1], hoods: ['campus-west'], elsewhere: [1, 1, 1] },
    { id: 'county-fair', label: 'the county fair and rodeo', tag: 'fair', month: 8, week: 1, dows: [2, 3, 4, 5, 6], can: [.92, .90, .90], hoods: ['east-side'], elsewhere: [1, .97, .97] },
    { id: 'beer-bike-fest', label: 'the summer beer-and-bike festival', tag: 'festival', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.88, .88, .90], hoods: ['old-town'], elsewhere: [.97, .97, .97] },
    { id: 'park-food-fest', label: 'the food-and-music festival in the park', tag: 'festival', month: 6, week: 2, dows: [5, 6], can: [.92, .90, .92], hoods: ['old-town'], elsewhere: [1, 1, 1] },
    { id: 'fourth-parade', label: 'the Fourth of July parade', tag: 'parade', month: 7, week: 1, dows: [2, 3, 4, 5, 6], can: [.90, .92, .92], hoods: ['old-town'], elsewhere: [1, 1, 1] },
    { id: 'graduation', label: 'spring graduation', tag: 'graduation', month: 5, week: 2, dows: [4, 5, 6], can: [.85, .88, .90], hoods: ['campus-west'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['campus-west'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.88, .95, .95], hoods: ['campus-west'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1200, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65000 },
    { name: 'Longmont', state: 'CO', lat: 40.17, lon: -105.10, pop: 98000 },
    { name: 'Laramie', state: 'WY', lat: 41.31, lon: -105.59, pop: 31000 },
    { name: 'Colorado Springs', state: 'CO', lat: 38.83, lon: -104.82, pop: 480000 }
  ],
  roads: ['I-25', 'US 287', 'CO 14', 'US 34', 'I-80'],

  words: {
    street: ['College Avenue', 'Mulberry', 'Laurel', 'Prospect', 'Drake', 'Horsetooth', 'Harmony', 'Lemay'],
    water: ['the Poudre', 'Horsetooth Reservoir', 'the Poudre Canyon'],
    hood: ['Old Town', 'Campus West', 'Laporte', 'Bellvue', 'Midtown', 'Andersonville'],
    thing: ['taproom', 'green chile', 'bike lane', 'irrigation ditch', 'foothills', 'foco', 'reuse-arts space', 'soundproofed garage', 'parking-lot show'],
    weather: ['hailstorm', 'wildfire smoke', 'chinook wind']
  },

  events: [
    { id: 'FORT_COLLINS_CO_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is Saturday, and the tailgates are already marking out Campus West.',
      title: 'The tailgate takes Campus West',
      body: 'Parking is gone, the tailgate has the street and your basement show is the overflow. Half the lot has never seen it.',
      options: [
        { id: 'LATE', label: 'Push doors back until the tailgate dies down', likely: 'The ones who want a night out show up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The overflow came down the stairs loud and glad.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed out in the lot. The regulars came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'FORT_COLLINS_CO_WYOMING_SNOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'A November storm is sliding down from Wyoming, and the interstate has chain laws.',
      title: 'The snow is on the interstate',
      body: 'The interstate is closed from Wyoming and the touring band is crawling toward the east side garage, three hours late.',
      options: [
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van pulled in at ten. You started late and nobody left.' },
        { id: 'SHORT', label: 'Run the locals and play on', likely: 'A thinner night, but a warm one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The local bands played long and loose. The headliner got the last ten minutes.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'FORT_COLLINS_CO_QUIET_HOUR', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'A new apartment building went up across the alley, and the neighbors are watching.',
      title: 'A neighbor calls it in',
      body: 'Right after soundcheck a neighbor in the new apartments calls it in. The host\'s family has to talk the officer down.',
      options: [
        { id: 'EARLY', label: 'Start early and finish before the hour', likely: 'Short, loud and legal.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early, done before the hour. Everyone went home happy and a little deaf.' },
        { id: 'TALK', label: 'Talk to the neighbor yourself', likely: 'Takes the evening, but it earns something.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'You knocked on the door with a flyer. She said she would sit on the porch.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'The next call comes with a car.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Two more calls and the officer was in the driveway. You shut it at nine.' }
      ] }
  ]
});
