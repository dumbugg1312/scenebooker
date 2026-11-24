SB.Cities.register('tuscaloosa-al', {
  v: 1,
  slug: 'tuscaloosa-al',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of alabama', 'crimson tide', 'roll tide', 'bama', 'mercedes-benz', 'mercedes', 'stillman college', 'shelton state', 'university of west alabama',
           'amtrak', 'crescent', 'waffle house', 'krystal', 'iron bowl', 'bryant-denny', 'moundville archaeological', 'tuscaloosa news', 'crimson white', 'wvua',
           'alabama public radio', 'mississippi university for women', 'columbus air force base', 'auburn university', 'mississippi state', 'ole miss',
           'tuscaloosa amphitheater', 'vfw', 'american legion', 'april 27', '27 april 2011', 'super outbreak',
           'the fall line room', 'black warrior hall of records', 'druid oak carport', 'greensboro annex', 'the clay cellar', 'hargrove pole barn',
           'cottondale practice units', 'riverbend fellowship hall', 'mcfarland back lot', 'the moundside garage', 'crimson lot', 'the alberta laundry',
           'kentuck festival', 'west alabama christmas parade', 'dickens downtown', 'tuscaloosa gauntlet', 'northport bunny trail', 'west alabama food & wine festival',
           'junior league of tuscaloosa', 'visit tuscaloosa', 'tuscaloosa county courthouse', 'buddy powell pavilion', 'northport civitan park', 'wvua-fm', 'wbhm',
           'inweekly', 'west alabama watchman', 'westalabamawatchman', 'praise 93.3', 'catfish tuscaloosa', 'wtug', 'bryant-denny stadium'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The tornado is written only as 'the 2011 tornado' in game text. */
  blocklist: ['crimson white*', 'tuscaloosa news*', 'waffle house*', 'wvua*', 'fall line room*', 'mercedes*'],

  blurb: ['A river college and car-plant city where football and student housing take the real estate and punk lives in the gaps.',
          'The crowd turns over every four years, and everyone dates things before the 2011 tornado or after.'],
  hard: 'Game weekends and student leases make dates and rooms scarce, and May empties the scene.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tuscaloosa' },
    { id: 'northport', kind: 'FEEDER', name: 'Northport', minutes: 10, bearing: 340, scene: 250, note: 'Across the river: an old downtown, porches and cheaper rent. Part of the same scene.' },
    { id: 'cottondale', kind: 'FEEDER', name: 'Holt, Cottondale and Brookwood', minutes: 15, bearing: 85, note: 'Rural-suburban fringe by the interstate; no scene, plenty of garages and pole barns.' },
    { id: 'vance', kind: 'FEEDER', name: 'Vance', minutes: 20, bearing: 75, note: 'A small town built around the car plant; no scene of its own.' },
    { id: 'moundville', kind: 'FEEDER', name: 'Moundville', minutes: 25, bearing: 190, note: 'A small farm and tourism town; its high school kids come for shows.' },
    { id: 'centreville', kind: 'FEEDER', name: 'Centreville and Brent', minutes: 35, bearing: 120, note: 'Small towns whose people commute to Tuscaloosa and Birmingham.' },
    { id: 'eutaw', kind: 'FEEDER', name: 'Eutaw', minutes: 40, bearing: 215, note: 'A small Black Belt county seat in farm country.' },
    { id: 'fayette', kind: 'FEEDER', name: 'Fayette', minutes: 45, bearing: 320, note: 'A small county seat with a couple of kids in a band.' },
    { id: 'reform', kind: 'FEEDER', name: 'Reform and Aliceville', minutes: 50, bearing: 285, note: 'Rural northwest Alabama farm towns along US 82.' },
    { id: 'jasper', kind: 'FEEDER', name: 'Jasper', minutes: 60, bearing: 15, note: 'A coal-country town up AL 69 with a few local bands.' },
    { id: 'columbus-ms', kind: 'FEEDER', name: 'Columbus', state: 'MS', minutes: 70, bearing: 300, note: 'A small city up US 82 in Mississippi with a base nearby; some crossover.' },
    { id: 'starkville', kind: 'PEER', name: 'Starkville', state: 'MS', minutes: 85, bearing: 305, scene: 500, note: 'A university town a quarter the size; bands trade across the state line.' },
    { id: 'meridian', kind: 'PEER', name: 'Meridian', state: 'MS', minutes: 90, bearing: 235, scene: 350, note: 'Smaller and worn down; kids drive over on I-20/59 for shows.' },
    { id: 'montgomery', kind: 'PEER', name: 'Montgomery', state: 'AL', minutes: 105, bearing: 130, slug: 'montgomery-al', note: 'A larger capital with its own circuit, down US 82.' },
    { id: 'auburn', kind: 'PEER', name: 'Auburn', state: 'AL', minutes: 140, bearing: 120, scene: 1800, note: 'The closest peer in size and students; the two towns\' DIY crowds cross more than their football crowds admit.' }
  ],

  hoods: [
    { id: 'strip', name: 'the Strip and campus edge', route: 'campus', note: 'Bars, wing places and student housing; the nightlife you compete with and where flyers get stapled.' },
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'An old brick core by the river with storefronts and upstairs rooms; heating up and getting dearer.' },
    { id: 'northport-side', name: 'Northport', route: 'old-side', note: 'Porches, yards and small houses across the river, cheaper than the Tuscaloosa side.' },
    { id: 'alberta', name: 'Alberta and East Tuscaloosa', route: 'work-side', note: 'The McFarland strip-mall belt: cheap commercial units for practice rooms, rebuilt after the tornado.' },
    { id: 'west-tuscaloosa', name: 'West Tuscaloosa', route: 'old-side', note: 'Older west-side neighborhoods with their own culture, apart from the college-punk crowd.' },
    { id: 'holt', name: 'Holt and Cottondale', route: 'work-side', note: 'Industrial and semi-rural by the interstate; warehouse units and pole barns where nobody complains.' },
    { id: 'midtown', name: 'Midtown and Hillcrest', route: 'campus', note: 'Newer subdivisions and chain stores; parents\' garages and the occasional backyard.' },
    { id: 'northport-town', name: 'across the river in Northport', route: 'town:northport', note: 'An old downtown, a brewery taproom and porch houses on the north bank. Cheaper than the Tuscaloosa side, and part of the same scene.' }
  ],

  rooms: [
    { id: 'west-yard', kind: 'HOUSE', hood: 'west-tuscaloosa', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 40, start: true,
      note: 'A yard show at a family house on the west side. Far from the college crowd, with few strangers and few complaints.' },
    { id: 'strip-house', kind: 'HOUSE', hood: 'strip', cap: 80, curfew: 1320, ac: false, standing: [70, 55, 40], pressure: 60,
      note: 'A student rental near campus. The neighbors are students, the landlord has a noise clause, and a show lasts as long as the lease.' },
    { id: 'northport-house', kind: 'HOUSE', hood: 'northport-town', cap: 60, curfew: 1320, ac: false, outdoor: true, pressure: 50,
      note: 'A house across the river where the living room or the carport is the stage and a hat goes round. The lease holder takes the citation.' },
    { id: 'alberta-unit', kind: 'DIY', hood: 'alberta', cap: 60, curfew: 1320, ac: false, pressure: 55, needs: ['VOUCH'],
      note: 'A strip-mall unit the band rents to practice in, with a few nights of shows. The lease and the fire code are the problem.' },
    { id: 'downtown-shop', kind: 'SHOP', hood: 'downtown', cap: 80, curfew: 1170, ac: true,
      note: 'A downtown storefront for an in-store or an art night. Redevelopment and the student towers keep raising the rent.' },
    { id: 'northport-hall', kind: 'HALL', hood: 'northport-town', cap: 150, curfew: 1320, ac: true, owner: 'HALL_MANAGER',
      note: 'An all-ages event space rented by the night, with a deposit and a fee.' },
    { id: 'taproom', kind: 'BAR', hood: 'northport-town', cap: 150, ages: ['ALL', 'A21'], matinee: true, curfew: 1380, ac: true, standing: [55, 65, 70],
      note: 'A brewery taproom that has hosted all-ages heavy bills. Ages depend on the night and the owner, and the kids stay out of the beer area.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1410, ac: true,
      note: 'A bar with a small stage on a slow weeknight. They book for a drinking crowd, and under-21s are shut out.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'strip', cap: 250, ages: ['A21'], curfew: 1440, ac: true, pressure: 50,
      note: 'A club on the main drag, near student housing and wing places. A loud game-night crowd next door beats you for the door.' },
    { id: 'strip-hall', kind: 'CLUB', hood: 'strip', cap: 350, ages: ['A18'], curfew: 1410, ac: true, standing: [50, 65, 65], needs: ['FULL_BILL'],
      note: 'A mid-size music hall in an old strip building, rebuilt more than once. Whoever books it is at the mercy of the owner\'s plans.' },
    { id: 'river-amphitheater', kind: 'BIG', hood: 'holt', cap: 7000, ages: ['ALL'], curfew: 1380, ac: false, outdoor: true,
      note: 'The concert amphitheater on the river. It sells to touring acts, and a big night takes the parking and the money.' },
    { id: 'holt-barn', kind: 'OUTDOOR', hood: 'holt', cap: 100, curfew: 1350, ac: false, outdoor: true,
      note: 'A pole barn or a field with a generator, far from any neighbor. The weather and the drive are the threats.' }
  ],

  contacts: ['montgomery-al', 'birmingham', 'huntsville-al', 'jackson-ms', 'atlanta'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 4], dows: [4, 5], can: [.70, .60, .55], hoods: ['strip', 'downtown'], elsewhere: [.85, .80, .80] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 4], dows: [4, 5], can: [.70, .60, .55], hoods: ['strip', 'downtown'], elsewhere: [.85, .80, .80] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 4], dows: [4, 5], can: [.70, .60, .55], hoods: ['strip', 'downtown'], elsewhere: [.85, .80, .80] },
    { id: 'arts-festival', label: 'the arts festival', tag: 'festival', month: 10, weeks: [2, 3], dows: [5, 6], can: [.88, .85, .85], hoods: ['northport-town'], elsewhere: [.98, .96, .96] },
    { id: 'race-weekend', label: 'race and food weekend', tag: 'race', month: 4, week: 3, dows: [5, 6], can: [.90, .88, .88], hoods: ['northport-town'], elsewhere: [1, .98, .98] },
    { id: 'christmas-parade', label: 'the Christmas parade and tree lighting', tag: 'parade', month: 12, week: 1, dows: [5], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [1, .98, .98] },
    { id: 'move-out', label: 'graduation and move-out', tag: 'graduation', month: 5, weeks: [1, 2], dows: [4, 5, 6], can: [.70, .75, .75] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1380, inForce: true } },

  points: [
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1100000 },
    { name: 'Meridian', state: 'MS', lat: 32.36, lon: -88.7, pop: 40000 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6100000 }
  ],
  roads: ['I-20/59', 'I-359', 'US 82', 'US 43', 'AL 69', 'McFarland Boulevard'],

  words: {
    street: ['McFarland Boulevard', 'University Boulevard', 'Greensboro Avenue', 'Highway 82', 'Highway 69'],
    water: ['the Black Warrior', 'the Warrior', 'Lake Tuscaloosa'],
    hood: ['Northport', 'Alberta', 'Holt', 'Cottondale', 'Hillcrest', 'Midtown', 'West Tuscaloosa'],
    thing: ['carport', 'red clay', 'kudzu', 'boiled peanuts', 'pole barn', 'sweet tea', 'student rental', 'porch show', 'game-day traffic', 'practice unit'],
    weather: ['tornado warning', 'humidity']
  },
  events: [
    { id: 'TUSCALOOSA_AL_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is a home Saturday, and every hotel, bar and road in town is already full.',
      title: 'Game day swallows the Strip',
      body: 'A home game takes the Strip, the parking and every kid who owns a jersey. A show on a day like this has no audience unless you do something about it.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game crowd goes home', likely: 'The people who want a real night out show up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You opened doors an hour and a half late, and the crowd came in hoarse and happy.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'The casual crowd stayed on the Strip, and the regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'TUSCALOOSA_AL_CURFEW_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'City police have been checking cars for kids out after the curfew, and businesses can be cited.',
      title: 'The patrol before ten',
      body: 'Your show runs past ten on a weeknight, and a carful of under-18 kids is on the list. A patrol car has been circling the block twice an hour.',
      options: [
        { id: 'EARLY', label: 'End the all-ages set early and send them home', likely: 'It\'s a short night, and nobody gets cited.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'You cut the set short and the kids were home by ten, but the headliner was not pleased.' },
        { id: 'ACCEPT', label: 'Run it as planned and take the risk', likely: 'The younger kids stay away.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the young ones never came, and the patrol passed once and kept going.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] },

    { id: 'TUSCALOOSA_AL_JULY_DEAD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7] },
      telegraph: 'The students are gone for the summer, and a big show at the amphitheater is eating the parking.',
      title: 'The July dead zone',
      body: 'The students have left, the big show on the river has the traffic, and a carport show in the heat looks likely to draw a dozen people and a dog.',
      options: [
        { id: 'FANS', label: 'Run it as a loose, cheap night for whoever is left', likely: 'It\'s small but warm, and the people who came are glad.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'REGULARS', pct: .02 }],
          result: 'It was a dozen people, two fans and a dog in the heat, and they are your regulars now.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'It\'s a very thin night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }],
          result: 'The heat and the traffic took most of the list, and the band played anyway.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] }
  ]
});
