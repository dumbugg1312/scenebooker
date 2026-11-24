SB.Cities.register('buffalo', {
  v: 1,
  slug: 'buffalo',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university at buffalo', 'ub', 'suny buffalo', 'buffalo state', 'canisius college', 'daemen university', 'medaille college', 'd\'youville university', 'niagara university', 'suny fredonia', 'buffalo bills', 'highmark stadium', 'buffalo sabres', 'keybank center', 'buffalo bisons', 'sahlen field', 'buffalo news', 'buffalo hive', 'buffablog', 'ub spectrum', 'artvoice', 'wbfo', 'wgrz', 'wivb', 'kleinhans music hall', 'shea\'s', 'peace bridge', 'rainbow bridge', 'niagara falls state park', 'canalside', 'taste of buffalo', 'allentown art festival', 'buffalo niagara medical campus', 'general motors', 'ford stamping plant', 'bethlehem steel', 'new era cap', 'ralph wilson stadium', 'buffalo wings', 'anchor bar',
           'allentown art festival', 'allen west festival', 'elmwood festival of the arts', 'elmwood village artfest', 'canal fest', 'canal fest of the tonawandas', 'erie county fair', 'ecfair', 'national buffalo wing festival', 'wingfest', 'buffalo infringement festival', 'canalside mural fest', 'glen park art festival', 'new highmark stadium', 'the buffalo hive', 'buffalo rising', 'btpm', 'western new york public broadcasting', 'wibx', 'wben', 'wkbw', 'spectrum news', 'nysmusic', 'visit buffalo niagara', 'buffalo maritime center', 'new friends fest'],
  blocklist: ['buffalo news*', 'buffalo bills*', 'anchor bar*', 'new era cap*', 'canalside*', 'kleinhans*', 'buffalo rising', 'visit buffalo niagara'],

  blurb: ['Buffalo hardcore lives in restaurant back rooms and a veterans\' hall, packed with twenty-somethings and a few old heads at the back.',
          'It is all-ages and friendly and rowdy, and the lake snow and the border decide who actually makes it.'],
  hard: 'Rooms depend on one owner\'s goodwill, and snow or the border can kill any night.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80 },
    { name: 'New York City', state: 'NY', lat: 40.71, lon: -74.01 }
  ],
  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'The all-ages hardcore wave is the scene now.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Buffalo' },
    { id: 'tonawanda', kind: 'FEEDER', name: 'Tonawanda and North Tonawanda', minutes: 15, bearing: 340, note: 'Working-class river suburbs; kids and bands.' },
    { id: 'amherst', kind: 'FEEDER', name: 'Amherst and Williamsville', minutes: 20, bearing: 55, note: 'Big suburbs; students and kids.' },
    { id: 'cheektowaga', kind: 'FEEDER', name: 'Lancaster, Depew and Cheektowaga', minutes: 20, bearing: 85, note: 'East suburbs.' },
    { id: 'niagara-falls', kind: 'FEEDER', name: 'Niagara Falls', minutes: 25, bearing: 340, beyond: 'border-bridges', note: 'A tourist and worn-down city with some bands.' },
    { id: 'orchard-park', kind: 'FEEDER', name: 'Orchard Park and Hamburg', minutes: 25, bearing: 185, beyond: 'skyway', note: 'Southern suburbs.' },
    { id: 'lockport', kind: 'FEEDER', name: 'Lockport', minutes: 30, bearing: 25, note: 'A canal town with a small scene.' },
    { id: 'fredonia', kind: 'FEEDER', name: 'Fredonia and Dunkirk', minutes: 50, bearing: 215, note: 'Lake towns with a college.' },
    { id: 'jamestown', kind: 'FEEDER', name: 'Jamestown', minutes: 75, bearing: 200, note: 'Small and far.' },
    { id: 'rochester', kind: 'PEER', name: 'Rochester', minutes: 80, bearing: 85, slug: 'rochester', note: 'A similar scene with more house shows and churches.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', state: 'PA', minutes: 90, bearing: 220, slug: 'erie-pa', note: 'Smaller; bands go back and forth.' },
    { id: 'syracuse', kind: 'PEER', name: 'Syracuse', minutes: 150, bearing: 90, slug: 'syracuse-ny', note: 'A long Thruway drive.' }
  ],

  chokepoints: [{ id: 'skyway', name: 'the Skyway', p: 0.03 }, { id: 'border-bridges', name: 'the bridges to Canada', p: 0.02 }],

  hoods: [
    { id: 'elmwood', name: 'Elmwood Village and Allentown', route: 'downtown', note: 'Cafes, bars and old houses; the nightlife district for people who like art and music.' },
    { id: 'university-heights', name: 'University Heights and Main Street', route: 'campus', note: 'Student rentals and cheap storefronts, with a small all-ages room in a restaurant back room.' },
    { id: 'west-side', name: 'the West Side and Black Rock', route: 'old-side', note: 'Old two-family houses, immigrant restaurants and a back room that books hardcore.' },
    { id: 'south-buffalo', name: 'South Buffalo', route: 'work-side', note: 'Irish rowhouses and old plant buildings; a restaurant room that does shows.' },
    { id: 'larkinville', name: 'Kaisertown and Larkinville', route: 'work-side', note: 'Old industrial buildings, warehouses and cheap storage.' },
    { id: 'hertel', name: 'Hertel and North Buffalo', route: 'old-side', note: 'A commercial strip and houses; a few rooms.' },
    { id: 'east-side', name: 'the East Side and Broadway-Fillmore', route: 'work-side', note: 'Old Polish and Black neighborhoods with halls, clubs and fraternal posts.' },
    { id: 'lackawanna', name: 'Lackawanna', route: 'work-side', note: 'A former steel town on the lake; cheap space.' }
  ],

  rooms: [
    { id: 'heights-basement', kind: 'HOUSE', hood: 'university-heights', cap: 60, curfew: 1380, ac: false, outdoor: false, standing: [70, 60, 40], pressure: 55, start: true, note: 'An old student rental with a basement packed halfway up the stairs. Three bucks at the door and the neighbors warned ahead.' },
    { id: 'two-family-basement', kind: 'HOUSE', hood: 'west-side', cap: 50, curfew: 1380, ac: false, outdoor: false, standing: [65, 60, 45], pressure: 55, note: 'A basement under an old two-family. Cramped and loud, and tolerated until somebody complains.' },
    { id: 'punk-shop', kind: 'SHOP', hood: 'university-heights', cap: 80, pa: 0.4, curfew: 1320, ac: true, sketch: 5, standing: [65, 70, 75], following: 0.2, note: 'A record and punk-gear shop that stopped hosting shows last spring. It could open the floor again if the owner relents.' },
    { id: 'vegan-back-room', kind: 'BAR', hood: 'university-heights', cap: 120, soundFee: 40, pa: 0.6, ages: ['ALL'], curfew: 1380, ac: true, following: 0.3, sketch: 20, standing: [65, 65, 70], pressure: 50, note: 'A restaurant back room on Main Street where the band and the crowd share one floor. It rests on one owner, and the owner is changing.' },
    { id: 'italian-back-room', kind: 'BAR', hood: 'west-side', cap: 150, soundFee: 40, pa: 0.6, ages: ['ALL'], curfew: 1380, ac: true, following: 0.3, sketch: 20, standing: [60, 65, 70], note: 'An Italian restaurant back room that books hardcore. Early doors, then the kitchen wants its room back.' },
    { id: 'seneca-room', kind: 'BAR', hood: 'south-buffalo', cap: 200, soundFee: 60, pa: 0.7, ages: ['A18'], curfew: 1440, ac: true, following: 0.3, sketch: 15, standing: [50, 65, 70], note: 'A bigger restaurant room on Seneca Street, roomier than the clubs. Shows come and go by the month.' },
    { id: 'posts-hall', kind: 'HALL', hood: 'east-side', cap: 250, rent: 200, deposit: 75, pa: 0.6, ages: ['A18'], curfew: 1380, ac: true, sketch: 15, standing: [50, 60, 65], owner: 'HALL_MANAGER', pressure: 45, note: 'A veterans\' hall with a bar and a bingo room. The post\'s members come first, and bingo night shares the floor.' },
    { id: 'niagara-storefront', kind: 'DIY', hood: 'west-side', cap: 100, rent: 70, pa: 0.5, curfew: 1350, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'], note: 'A storefront workshop along the river road. Cheap and loud, and the fire code is the real danger.' },
    { id: 'downtown-club', kind: 'CLUB', hood: 'elmwood', cap: 300, houseCosts: 200, split: 0.8, pa: 0.9, ages: ['A18'], curfew: 1560, ac: true, following: 0.5, sketch: 15, standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], pressure: 55, note: 'The punk and metal club downtown. Rooms like it keep closing, and nobody is sure about this one.' },
    { id: 'riverside-hall', kind: 'BIG', hood: 'larkinville', cap: 1500, rent: 1800, deposit: 500, pa: 0.95, ages: ['ALL'], curfew: 1410, ac: true, standing: [40, 65, 70], note: 'A big riverside hall for headliners. Only a touring band fills it, and the tickets can be pulled late.' },
    { id: 'lakeside-lot', kind: 'OUTDOOR', hood: 'lackawanna', cap: 100, rent: 15, pa: 0.4, curfew: 1260, sketch: 45, standing: [60, 55, 45], note: 'A lot, a pavilion or the underside of a highway on the empty lake-side land. Weather and the police decide.' }
  ],

  contacts: ['rochester', 'erie-pa', 'syracuse-ny', 'cleveland'],

  calendar: [
    { id: 'art-weekend', label: 'the summer art festival', tag: 'festival', month: 6, week: 2, dows: [5, 6], can: [.90, .88, .85], hoods: ['elmwood'], elsewhere: [1, .97, .97] },
    { id: 'canal-week', label: 'the canal festival in the river towns', tag: 'festival', month: 7, weeks: [3, 4], dows: [4, 5, 6], can: [.95, .93, .93] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 8, weeks: [2, 3], dows: [4, 5, 6], can: [.93, .92, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [3, 5], dows: [6], can: [.85, .90, .90] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.85, .90, .90] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.85, .90, .90] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  points: [
    { name: 'Toronto', state: 'ON', lat: 43.65, lon: -79.38, pop: 6200000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2100000 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80, pop: 2370000 },
    { name: 'Niagara Falls', state: 'NY', lat: 43.09, lon: -79.06, pop: 48000 }
  ],
  roads: ['I-90', 'I-190', 'Route 33', 'I-290', 'the Thruway', 'Route 5'],

  words: {
    street: ['Main Street', 'Elmwood Avenue', 'Delaware Avenue', 'Broadway', 'Seneca Street', 'Chippewa Street', 'Hertel Avenue'],
    water: ['Lake Erie', 'the Niagara River', 'the Buffalo River'],
    hood: ['Black Rock', 'Kaisertown', 'Allentown', 'Lackawanna', 'Riverside', 'South Buffalo'],
    thing: ['wings', 'snow shovel', 'Skyway', 'generator', 'customs line', 'grain elevator'],
    weather: ['lake-effect snow', 'whiteout']
  },

  events: [
    { id: 'BUFFALO_SKYWAY_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'Crews are working on the Skyway and the lakeshore bridges this week.',
      title: 'The Skyway is a parking lot',
      body: 'A wreck on the Skyway has traffic backed up all the way to the lake the night of your show. The bands and the kids from the south and the border side are stuck in it.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it, but the night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'You moved doors up an hour, and the people who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'You lose most of the people who have to cross.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'It never cleared, and the people on the far side stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'It takes two hours of your day, but most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads came together the long way around.' }
      ] },

    { id: 'BUFFALO_NEW_OWNER', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5] },
      telegraph: 'The restaurant is changing hands and nobody has said what happens to the back room.',
      title: 'The new owner wants a cut-off',
      body: 'The back room changed owners the week of your show. The new owner wants the music done early and the kitchen open at nine.',
      options: [
        { id: 'EARLY', label: 'Start at six and finish by nine', likely: 'It\'s short and tight, and the kids get there for the opener.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .88 }],
          result: 'Doors were at six and it was done by nine, so the kitchen got its room and the new owner got the point.' },
        { id: 'MOVE', label: 'Move the bill to a hall', likely: 'You lose the shared floor.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }],
          result: 'A hall took the bill, and it was cleaner and a little colder.' },
        { id: 'ACCEPT', label: 'Run it and eat the cut-off', likely: 'Some bands lose a song.',
          effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: 45 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The headliner cut a song, and nobody was happy about it.' }
      ] },

    { id: 'BUFFALO_SNOW_THRUWAY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [11, 12, 1, 2, 3] },
      telegraph: 'The lake snow is lining up for the Thruway this evening.',
      title: 'The Thruway is closed',
      body: 'Snow closed the Thruway an hour before doors. The touring band is stuck in the next city, and the local openers are the only ones in the room.',
      options: [
        { id: 'LONG', label: 'Let the openers play long', likely: 'It\'s a loose, warm night.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'The openers stretched out and the room stayed warm, and the touring band never made it.' },
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'It\'s a late start, and the crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .88 }],
          result: 'The van pulled in at ten, covered in snow, and the night went long.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could come, came.' }
      ] },

    { id: 'BUFFALO_GAME_NIGHT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game on a holiday night and every bar on the East Side is already full.',
      title: 'The hall and the game',
      body: 'A home game has emptied the bars across the city and put the whole town in front of a television. The one crowd that skipped it would fill a hall show.',
      options: [
        { id: 'HALL', label: 'Move to the hall and run it late', likely: 'The people who skipped the game show up.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'lateMin', v: 60 }],
          result: 'The hall filled after the final whistle with everybody who did not care about the game.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed on the couch, and the regulars came.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and not everyone could make the new one.' }
      ] }
  ]
});
