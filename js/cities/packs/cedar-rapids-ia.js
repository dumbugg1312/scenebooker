SB.Cities.register('cedar-rapids-ia', {
  v: 1,
  slug: 'cedar-rapids-ia',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['freedom festival', 'cedar rapids freedom festival', 'houby days', 'houby', 'linn county fair', 'little village', 'little village magazine', 'impact 89fm', 'tourism cedar rapids', 'traveliowa', 'travel iowa', 'iowa public radio', 'bandsintown', 'jambase', 'cr pride', 'cedar rapids pride', 'quaker oats', 'collins aerospace', 'aegon', 'crst', 'pepsico', 'pepsi', 'kirkwood', 'kirkwood community college', 'coe college',
           'mount mercy', 'mount mercy university', 'cornell college', 'university of iowa', 'hawkeyes', 'hawkeye', 'iowa state', 'cyclones',
           'university of northern iowa', 'the gazette', 'cedar rapids gazette', 'kgan', 'kcrg', 'kfxa', 'iheart', 'iheartmedia', 'townsquare',
           'cedar rapids kernels', 'kernels', 'roughriders', 'fifth season races', 'city of five seasons', 'five seasons', 'city of five smells',
           'five smells', 'alliant energy', 'unitypoint', 'john deere', 'deere', 'meskwaki', 'maid-rite', 'maid rite', 'cedar rapids transit',
           '380 express', 'vfw', 'american legion', 'legion post', 'czech and slovak museum', 'national czech', 'the derecho',
           'the fifth season annex', 'fifth season annex', 'bohemian hall back room', 'the mill smell', 'third street carport',
           'st. wenceslas fellowship hall', 'wenceslas', 'the skywalk level', 'collins road unit 14', 'cedar bend basement', 'the derecho room',
           'linn county legion post 0', 'five smells records'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['quaker oats*', 'five seasons*', 'five smells*', 'fifth season*', 'roughriders*', 'wenceslas*'],

  blurb: ['A small DIY room that keeps moving and a loud, loyal metal crowd, with Iowa City twenty miles down the interstate.',
          'Door takes are small and the promoter knows everybody, and the summer metal fest is the one weekend the whole scene shows up.'],
  hard: 'Small crowds and a room that keeps moving make routing risky, and the cool neighbor is twenty miles south.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Iowa City', state: 'IA', lat: 41.66, lon: -91.53 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 },
    { name: 'Des Moines', state: 'IA', lat: 41.59, lon: -93.62 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Cedar Rapids' },
    { id: 'marion', kind: 'FEEDER', name: 'Marion and Hiawatha', minutes: 10, bearing: 40, note: 'Growing suburbs just northeast along the interstate; no scene of their own, but parents and kids.' },
    { id: 'mount-vernon', kind: 'FEEDER', name: 'Mount Vernon and Lisbon', minutes: 20, bearing: 95, note: 'A small college town on US 30 with a little house-show and radio crowd.', bands: 1 },
    { id: 'center-point', kind: 'FEEDER', name: 'Center Point, Urbana and Brandon', minutes: 25, bearing: 330, note: 'Farm and commuter towns up the interstate; kids come in by car.' },
    { id: 'iowa-city', kind: 'FEEDER', name: 'Iowa City and Coralville', minutes: 30, bearing: 190, note: 'The bigger, cooler sibling: it takes the all-ages crowd and the first Iowa date.', bands: 4 },
    { id: 'vinton', kind: 'FEEDER', name: 'Vinton', minutes: 35, bearing: 305, note: 'A county-seat farm town up US 218.' },
    { id: 'anamosa', kind: 'FEEDER', name: 'Anamosa', minutes: 35, bearing: 70, note: 'A small town east on US 151, known for its prison.' },
    { id: 'tipton', kind: 'FEEDER', name: 'Tipton', minutes: 40, bearing: 120, note: 'A farm town southeast toward the Quad Cities.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 45, bearing: 55, note: 'A small town northeast on US 151.' },
    { id: 'belle-plaine', kind: 'FEEDER', name: 'Belle Plaine and Marengo', minutes: 45, bearing: 245, note: 'Farm towns west along US 30.' },
    { id: 'waterloo', kind: 'PEER', name: 'Waterloo and Cedar Falls', minutes: 65, bearing: 340, scene: 1100, note: 'A factory town and its college twin, up the interstate; Cedar Falls has an old underground scene.' },
    { id: 'dubuque', kind: 'PEER', name: 'Dubuque', minutes: 85, bearing: 55, scene: 700, note: 'A hilly Mississippi river town up US 151.' },
    { id: 'quad-cities', kind: 'PEER', name: 'the Quad Cities', minutes: 90, bearing: 105, slug: 'davenport-ia', note: 'The river cities east: they trade bands with this town.' },
    { id: 'des-moines', kind: 'PEER', name: 'Des Moines', minutes: 130, bearing: 260, slug: 'des-moines-ia', note: 'The state capital, a real trade partner on the road west.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Second Avenue', route: 'downtown', note: 'Bars with stages on the island and along the river, skywalks above; quiet and office-heavy at night.' },
    { id: 'czech-village', name: 'Czech Village', route: 'old-side', note: 'A flooded-and-rebuilt heritage strip of bakeries and storefronts along 16th Avenue SW; tourism-leaning.' },
    { id: 'newbo', name: 'NewBo', route: 'downtown', note: 'Old brick industrial blocks turned to market, breweries and lofts; the heating-up part of town and the opposite of cheap.' },
    { id: 'kingston', name: 'Kingston and the west bank', route: 'old-side', note: 'Older small houses near the river, annexed long ago, still recovering from the flood.' },
    { id: 'wellington-heights', name: 'Wellington Heights and Oakhill Jackson', route: 'work-side', note: 'Cheap old working-class streets close to downtown: porches, backyards and corner storefronts.' },
    { id: 'moundview', name: 'Moundview and Kenwood Park', route: 'work-side', note: 'Steady postwar housing in the northeast: basements, garages and strip-road pizza rooms.' },
    { id: 'collins-road', name: 'the Collins Road strip', route: 'campus', note: 'Office campuses and big-box retail at the interstate, with empty strip-mall units that make practice rooms.' },
    { id: 'college-hill', name: 'the college blocks', route: 'campus', note: 'A small urban campus and its rentals; a thin student crowd.' }
  ],

  rooms: [
    { id: 'wellington-house', kind: 'HOUSE', hood: 'wellington-heights', cap: 40, curfew: 1320, ac: false, pressure: 55, start: true, note: 'A porch and basement room on a cheap old street near downtown, run by a kid from a hardcore band. The neighbors and the noise rule decide how long it lasts.' },
    { id: 'moundview-garage', kind: 'HOUSE', hood: 'moundview', cap: 30, curfew: 1320, ac: false, outdoor: false, note: 'A garage bill with a drum kit and a space heater in the postwar northeast. Most house shows in this region are thirty minutes south, so the turnout is small.' },
    { id: 'storefront-diy', kind: 'DIY', hood: 'downtown', cap: 80, curfew: 1350, pressure: 60, note: 'An all-ages, no-alcohol storefront on Second Avenue that has moved more than once. The door cuts are small and the lease is always the question.' },
    { id: 'arts-center', kind: 'HALL', hood: 'newbo', cap: 250, curfew: 1380, ac: true, note: 'A community arts hall that does folk nights and weddings and lends itself to winter metal showcases. The staff set the curfew, and it is early.' },
    { id: 'volunteer-gallery', kind: 'HALL', hood: 'downtown', cap: 100, curfew: 1350, ac: true, note: 'A volunteer-run arts space with a gallery wall behind the amps. It runs on grants and goodwill, and the early crowd is gentle.' },
    { id: 'skate-shop', kind: 'SHOP', hood: 'collins-road', cap: 60, curfew: 1260, ac: true, note: 'A skate shop that clears its floor on a Saturday afternoon. Over by nine, and the landlord cares more about sales than noise.' },
    { id: 'theater-bar', kind: 'BAR', hood: 'newbo', cap: 200, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: true, note: 'A bar attached to a theater, with a real stage. Pop-punk and emo nights fill it, and an early all-ages slot is sometimes possible.' },
    { id: 'island-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, ac: true, note: 'A stage bar out back on the island where punk benefits land. The bar crowd stays after the kids leave.' },
    { id: 'river-hall', kind: 'CLUB', hood: 'kingston', cap: 300, ages: ['A18'], curfew: 1440, ac: true, note: 'A rebuilt hall on the west bank that books tours when it can. Eighteen and up, and over by midnight.' },
    { id: 'old-theater', kind: 'BIG', hood: 'newbo', cap: 900, curfew: 1380, ac: true, note: 'The historic theater and the one room that feels like a real stage. The whole scene turns up in August, and the building has been for sale.' },
    { id: 'river-pavilion', kind: 'OUTDOOR', hood: 'czech-village', cap: 150, curfew: 1200, note: 'A riverside pavilion on the heritage strip. Daytime only, and the city permit and the weather decide it.' }
  ],

  contacts: ['iowa-city-ia', 'davenport-ia', 'des-moines-ia'],

  calendar: [
    { id: 'river-fest', label: 'the summer river festival', tag: 'festival', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .98, .98] },
    { id: 'heritage-fest', label: 'the heritage strip festival', tag: 'festival', month: 5, week: 3, dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['czech-village'], elsewhere: [1, 1, 1] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 6, weeks: [4, 5], dows: [3, 4, 5, 6], can: [.92, .92, .90] },
    { id: 'metal-fest', label: 'the underground metal festival', tag: 'festival', month: 8, week: 2, dows: [4, 5], can: [1.10, 1.10, 1.05], hoods: ['newbo'], elsewhere: [.90, .90, .90] },
    { id: 'football-sep', label: 'game-day Saturdays', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'game-day Saturdays', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63, pop: 9400000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 970000 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27, pop: 3700000 },
    { name: 'Waterloo', state: 'IA', lat: 42.49, lon: -92.34, pop: 67000 },
    { name: 'Dubuque', state: 'IA', lat: 42.5, lon: -90.66, pop: 60000 }
  ],
  roads: ['I-380', 'I-80', 'US 30', 'US 151', 'US 218', 'Iowa 100'],

  words: {
    street: ['First Avenue', 'Second Avenue', 'Collins Road', '16th Avenue SW', 'Seventh Avenue', 'Mays Island'],
    water: ['the Cedar River', 'the Cedar'],
    hood: ['Czech Village', 'NewBo', 'New Bohemia', 'Kingston', 'Wellington Heights', 'Oakhill Jackson', 'Moundview', 'Noelridge', 'Kenwood Park', 'Mays Island', 'Marion'],
    thing: ['skywalk', 'sandbag', 'kolache', 'tenderloin', 'grain elevator', 'sump pump', 'tornado siren', 'donation jar', 'raffle', 'hall rental', 'metal fest'],
    weather: ['river crest', 'windstorm']
  },

  events: [
    { id: 'CEDAR_RAPIDS_IA_ROOM_MOVES', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The flyer has a new storefront on Second Avenue and a nervous line saying the vibe is the same.',
      title: 'The room moved again',
      body: 'The all-ages room lost its lease and found another storefront two blocks away. The new place has no stage, no sign and a landlord who hasn\'t been told what it\'s for.',
      options: [
        { id: 'NEWPLACE', label: 'Play the new storefront', likely: 'Half the regulars will find it, and it\'s a bare floor and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'The new room was cold and bare, and the people who found it stayed to the end.' },
        { id: 'HOUSE', label: 'Move the bill to a house', likely: 'It\'s smaller and warmer, and everyone knows a basement.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'A basement took the bill with a day to spare, and the floor was packed.' },
        { id: 'LATE', label: 'Push doors back and set up a map', likely: 'It starts late while people find the address.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'You opened doors an hour late, and everybody got there eventually.' }
      ] },

    { id: 'CEDAR_RAPIDS_IA_FEST_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'festival' },
      telegraph: 'The metal festival is this weekend, and every kid in the scene is working a table.',
      title: 'The festival has everyone',
      body: 'The big theater is full all day, and every kid in the scene is working the merch table, loading in or watching. Nobody is free to run a house show.',
      options: [
        { id: 'LATE', label: 'Start after the festival lets out', likely: 'The crowd that wants more shows up late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'You opened doors at ten, and the festival crowd came in loud and hungry for more.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The scene is busy elsewhere.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'Only the people with nowhere else to be came, and they were glad.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and the bands trust you a little less.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'CEDAR_RAPIDS_IA_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It\'s a home game down in Iowa City, and the interstate is full.',
      title: 'Game day on the interstate',
      body: 'Half your crowd lives or works in the college town to the south. They\'re stuck in game traffic and will arrive an hour late with a plate of hot food.',
      options: [
        { id: 'LATE', label: 'Push doors back an hour', likely: 'They show up tired and loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'They were an hour late, and the room filled up all at once.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The crowd coming from the south misses the openers.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'The openers played to the bartender and the loyal few.' }
      ] }
  ]
});
