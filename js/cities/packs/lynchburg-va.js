SB.Cities.register('lynchburg-va', {
  v: 1,
  slug: 'lynchburg-va',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['liberty university', 'flames', 'randolph college', 'university of lynchburg', 'virginia university of lynchburg',
           'central virginia community college', 'sweet briar', 'sweet briar college', 'longwood university', 'hampden-sydney',
           'virginia military institute', 'vmi', 'virginia tech', 'uva', 'hillcats', 'lynchburg hillcats', 'carolina league', 'cleveland guardians',
           'virginia 10 miler', '10 miler', 'news & advance', 'news and advance', 'gltc', 'amtrak', 'greyhound', 'american eagle', 'waffle house',
           'cook out', 'kemper street station', 'vines center', 'williams stadium', 'baptist', 'vfw', 'american legion', 'the foundry annex',
           'kemper siding', 'candler\'s cellar', 'lodge 1142', 'third hill hall', 'the tobacco barn room', 'st. anselm\'s fellowship hall',
           'lowwater skate and supply', 'the rail yard rec', 'old forest social club', 'garland street garage', 'the piedmont pie room',
           'lynchburg police department', 'wset', 'wdbj', 'wdbj7', 'wsls', 'cardinal news', 'style weekly', 'rvamag', 'rva magazine', 'c-ville weekly',
           'macaroni kid', 'livability', 'e.c. glass', 'ec glass', 'lynchburg city stadium', 'lynchburg art festival', 'lynchburg art club',
           'centerfest', 'lynchburg elvis festival', 'lynchburg tourism', 'lynchburg parks and recreation', 'virginia folklife program', 'liberty arena',
           'midweek on the mountain', 'berglund center', 'john paul jones arena'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['liberty university*', 'hillcats*', 'virginia 10 miler*', 'news & advance*', 'waffle house*', 'cook out*', 'randolph college*', 'cardinal news*', 'wset*', 'berglund center*'],

  blurb: ['A city of seven hills on the James River in the Blue Ridge foothills, with no interstate and a huge religious campus on the mountain.',
          'A few dozen kids keep shows going in church halls and damp basements, and half the bill drives in from the county. The best bands move to Richmond.'],
  hard: 'No interstate, a conservative town, and everyone you need is forty minutes away.',
  region: 'the Blue Ridge',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lynchburg' },
    { id: 'madison-heights', kind: 'FEEDER', name: 'Madison Heights', minutes: 10, bearing: 10, scene: 60, note: 'Across the river in the next county, with its own deputies. Cheap, and an old trick for dodging city rules.' },
    { id: 'forest', kind: 'FEEDER', name: 'Forest', minutes: 15, bearing: 250, note: 'A church-heavy suburb to the west. Kids need a ride in.' },
    { id: 'rustburg', kind: 'FEEDER', name: 'Rustburg and Brookneal', minutes: 30, bearing: 170, note: 'A rural county seat and a tiny river-and-tobacco town.' },
    { id: 'amherst', kind: 'FEEDER', name: 'Amherst', minutes: 25, bearing: 5, note: 'A small county seat up US 29. Little scene.' },
    { id: 'appomattox', kind: 'FEEDER', name: 'Appomattox', minutes: 30, bearing: 100, note: 'A tiny rural town where the kids drive in for shows.' },
    { id: 'altavista', kind: 'FEEDER', name: 'Altavista', minutes: 30, bearing: 185, note: 'An old mill town to the south with a few bands of its own.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 35, bearing: 255, note: 'A county seat to the west. Bored teens, no scene.' },
    { id: 'farmville', kind: 'FEEDER', name: 'Farmville', minutes: 55, bearing: 100, note: 'A college town to the east that trades bands with the city.' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington and Buena Vista', minutes: 75, bearing: 335, note: 'Two small college and mill towns up in the valley.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', state: 'VA', minutes: 60, bearing: 260, slug: 'roanoke-va', note: 'The regional hub an hour west. Mild rivalry and real trading both ways.' },
    { id: 'charlottesville', kind: 'PEER', name: 'Charlottesville', state: 'VA', minutes: 70, bearing: 40, slug: 'charlottesville-va', note: 'Up US 29: a bigger scene per head, where local kids go for national bands.' },
    { id: 'danville', kind: 'PEER', name: 'Danville', state: 'VA', minutes: 75, bearing: 200, note: 'A down-on-its-luck tobacco and textile city that trades a few bands.' },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', state: 'VA', minutes: 120, bearing: 355, slug: 'harrisonburg-va', note: 'A university city with a well-known DIY tradition.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown on the bluff', route: 'downtown', note: 'Brick warehouses and storefronts above the river. The best place for a room and the place with the most noise complaints.' },
    { id: 'rivermont', name: 'Rivermont and the west end', route: 'campus', note: 'Leafy old houses and duplexes near a small college. Rented house shows, with older neighbors who call the police.' },
    { id: 'hill-streets', name: 'the close-in hills', route: 'old-side', note: 'Row houses and subdivided rentals on the steep streets around downtown. Cheap in places, and being flipped one block at a time.' },
    { id: 'old-forest-road', name: 'Fort Hill and the Old Forest Road corridor', route: 'work-side', note: 'Mid-century ranch houses, church campuses and strip malls. Garages and carports, and neighbors rather than landlords to worry about.' },
    { id: 'wards-road', name: 'the Wards Road strip', route: 'campus', note: 'Big-box retail and student apartments at the foot of the mountain. Not a place for shows, but where the audience lives.' },
    { id: 'madison-heights-hood', name: 'Madison Heights', route: 'town:madison-heights', note: 'Across the river: strip malls, ranch houses and cheap industrial space under the county sheriff.' },
    { id: 'east-end', name: 'the east end and the rail strip', route: 'work-side', note: 'Old foundry and warehouse land along the river and tracks. Industrial space where it exists, and a history to treat with care.' }
  ],

  rooms: [
    { id: 'rivermont-house', kind: 'HOUSE', hood: 'rivermont', cap: 40, curfew: 1290, ac: false, sketch: 20, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'A rented house with a basement and a shared backyard in the leafy west end. The older neighbors call the police, and the quiet rule is nine.' },
    { id: 'hills-basement', kind: 'HOUSE', hood: 'hill-streets', cap: 30, curfew: 1290, ac: false, sketch: 25, standing: [65, 55, 45], pressure: 55,
      note: 'A cramped basement up a steep street with nowhere to park a van. The block is being flipped and the rent keeps rising.' },
    { id: 'sober-house', kind: 'HOUSE', hood: 'hill-streets', cap: 80, hostCut: 0, curfew: 1260, ac: false, outdoor: true, sketch: 10, standing: [75, 70, 60], pressure: 40,
      note: 'An old house run as a nonprofit, with a backyard stage and a donation door. No drugs and no drinking, and young local bands start here.' },
    { id: 'arcade-bar', kind: 'BAR', hood: 'downtown', cap: 250, soundFee: 60, pa: .7, ages: ['ALL', 'A18'], matinee: true, curfew: 1410, ac: true, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A two-floor arcade bar on the bluff that mixes metal, punk and emo. Kids are out of the room by nine on most nights, and the age line has moved before.' },
    { id: 'arts-hall', kind: 'HALL', hood: 'downtown', cap: 100, rent: 150, deposit: 50, pa: .6, curfew: 1320, ac: true, seated: true, sketch: 5, standing: [60, 65, 65], owner: 'HALL_MANAGER',
      note: 'A small seated room run by the town arts center. It suits quiet and folk bills more than a pit, and they decide who plays.' },
    { id: 'old-theater', kind: 'BIG', hood: 'downtown', cap: 800, curfew: 1350, ac: true, seated: true, sketch: 5, standing: [45, 70, 70],
      note: 'The historic theater downtown. Local bands open for a touring name now and then. Far too big for a first booking.' },
    { id: 'foundry-corner', kind: 'DIY', hood: 'east-end', cap: 60, rent: 50, curfew: 1290, ac: false, sketch: 35, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A corner of an old foundry building by the tracks, if the landlord has not noticed. Cheap, dark and loud.' },
    { id: 'heights-yard', kind: 'OUTDOOR', hood: 'madison-heights-hood', cap: 80, rent: 15, curfew: 1350, sketch: 35, standing: [60, 55, 40],
      note: 'A backyard across the river under the county sheriff. An old way around the city rules, with a longer curfew and a longer drive.' }
  ],

  contacts: ['roanoke-va', 'charlottesville-va', 'harrisonburg-va', 'richmond', 'greensboro-nc'],

  calendar: [
    { id: 'road-race', label: 'the long-distance road race', tag: 'race', month: 9, week: 4, dows: [5], can: [.92, .88, .88], hoods: ['rivermont'], elsewhere: [1, 1, 1] },
    { id: 'art-fest', label: 'the juried art festival', tag: 'festival', month: 9, week: 3, dows: [5], can: [.92, .90, .90], hoods: ['rivermont'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 3], dows: [5], can: [.9, .95, .95], hoods: ['wards-road'], elsewhere: [1, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.9, .95, .95], hoods: ['wards-road'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [.9, .95, .95], hoods: ['wards-road'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: true } },

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 1300000 },
    { name: 'Greensboro', state: 'NC', lat: 36.07, lon: -79.79, pop: 780000 },
    { name: 'Blacksburg', state: 'VA', lat: 37.23, lon: -80.41, pop: 45000 },
    { name: 'Staunton', state: 'VA', lat: 38.15, lon: -79.07, pop: 25000 }
  ],
  roads: ['US 29', 'US 460', 'US 501', 'US 221', 'US 501 Business', 'the James River'],

  words: {
    street: ['Rivermont Avenue', 'Church Street', 'Main Street', 'Boonsboro Road', 'Old Forest Road', 'Wards Road'],
    water: ['the James River', 'the James', 'Blackwater Creek'],
    hood: ['Rivermont', 'Garland Hill', 'Federal Hill', 'Daniel\'s Hill', 'Diamond Hill', 'College Hill', 'Tinbridge Hill', 'Fort Hill', 'Madison Heights'],
    thing: ['church basement', 'seven hills', 'chili dog', 'milkshake tray', 'tobacco barn', 'biscuit', 'skate shop', 'fellowship hall'],
    weather: ['humid afternoon', 'snow day']
  },

  events: [
    { id: 'LYNCHBURG_VA_ROAD_RACE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The long road race closes the west end from before sunrise on Saturday.',
      title: 'The van cannot get to Rivermont',
      body: 'The roads around the west end are blocked for the race, and the van\'s route to your house show is cut. The kids who ran this morning are tired.',
      options: [
        { id: 'DETOUR', label: 'Send the bands round by the back roads', likely: 'Late, but everyone arrives.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The van came in through the hills an hour late. The tired runners still came.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A thin crowd, and nobody is fresh.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The runners went to bed early. A quiet night.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LYNCHBURG_VA_TWO_QUIET_HOURS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'The city has two different night hours, and a neighbor has read the early one.',
      title: 'The police at 9:10',
      body: 'A neighbor calls at ten past nine about the singing. The officer says the quiet hour has not started yet, but the neighbor is still on the porch.',
      options: [
        { id: 'TURN_DOWN', label: 'Turn it down for the rest of the set', likely: 'A quieter night. Most stay.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The drums went to brushes and the officer left. The neighbor stayed on the porch.' },
        { id: 'END', label: 'End it early', likely: 'A short night. No trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'You stopped at ten. Nobody argued, and the street stayed loud for another hour.' },
        { id: 'ACCEPT', label: 'Argue the clock and play on', likely: 'The host pays for it later.',
          effects: [{ op: 'MONEY', amount: -25 }],
          result: 'The officer was right about the clock and the neighbor called again at ten. The host got a ticket.' }
      ] },

    { id: 'LYNCHBURG_VA_KIDS_CLEARED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The door at the bar clears the kids out at nine, and the early band has a lot of them.',
      title: 'The door clears the room at nine',
      body: 'At nine the door staff clear everyone under the age line. The opening band\'s whole crowd is about to be on the sidewalk, and the headliner is not on until ten.',
      options: [
        { id: 'REORDER', label: 'Move the all-ages bands first', likely: 'The young crowd sees their bands and leaves on time.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The kids got their sets and were out by nine. The late crowd found a half-empty room.' },
        { id: 'STREET', label: 'Let the kids wait outside', likely: 'Half of them go home.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the kids waited on the sidewalk and half went home. The sidewalk was loud.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
