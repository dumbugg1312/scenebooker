SB.Cities.register('wichita-ks', {
  v: 1,
  slug: 'wichita-ks',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['wichita state university', 'wichita state', 'friends university', 'newman university', 'bethel college', 'kansas wesleyan', 'emporia state',
           'university of kansas', 'kansas state', 'k-state', 'mcconnell air force base', 'mcconnell afb', 'mcconnell', 'textron', 'cessna', 'beechcraft',
           'learjet', 'koch industries', 'boeing', 'pizza hut', 'spangles', 'freddy\'s', 'quiktrip', 'kwik shop', 'waffle house', 'wichita eagle',
           'the sunflower', 'splurge', 'river festival', 'tallgrass film festival', 'walnut valley festival', 'national baseball congress', 'kansas state fair',
           'amtrak', 'greyhound', 'vfw', 'american legion', 'doo dah', 'black arts festival',
           'the ninth street annex', 'ninth street annex', 'hydraulic hall', 'wheatline garage', 'the salt cellar', 'fairmount porch',
           'the keeper\'s basement', 'north market backroom', 'chisholm annex', 'planeview carport', 'the lineman\'s hall',
           'oakdale roller rink back room', 'the little river room',
           'wichita riverfest', 'riverfest', 'wichita river festival', 'century ii', 'wichita pride', 'wichita pride festival', 'autumn and art', 'autumn & art', 'cowboy bathtub races', 'cardboard regatta', 'bradley fair', 'kmuw', 'newman vantage', 'visit wichita', 'wichita on the cheap', 'wichita festivals inc', 'wichita wind surge', 'wind surge', 'wichita thunder', 'intrust bank arena', 'riverfront stadium', 'lawrence-dumont stadium', 'community voice'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['wichita state*', 'wichita eagle*', 'textron*', 'pizza hut*', 'spangles*', 'river festival*', 'hydraulic hall*'],

  blurb: ['The city calls itself the Air Capital of the World, on the flat Kansas plain, with aircraft plants and meatpacking, long arterials, ranch houses and cheap rent.',
          'Shows hide in garages and church halls, you park on a lawn, and the weather decides the night.'],
  hard: 'Bands skip the stop; rooms are spread out and need a car.',
  region: 'the Plains',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Wichita' },
    { id: 'derby', kind: 'FEEDER', name: 'Derby', minutes: 20, bearing: 160, pop: 25000, note: 'A big suburb by the base; a few bands, but most kids come into town.' },
    { id: 'andover', kind: 'FEEDER', name: 'Andover and Augusta', minutes: 25, bearing: 65, note: 'Bedroom suburbs and a small oil-and-aircraft town, sports-driven.' },
    { id: 'newton', kind: 'FEEDER', name: 'Newton', minutes: 30, bearing: 10, pop: 19000, note: 'A railroad and Mennonite-heritage town up I-135 with a small music scene.' },
    { id: 'el-dorado', kind: 'FEEDER', name: 'El Dorado', minutes: 35, bearing: 80, pop: 13000, note: 'An oil town with a reservoir and a community college.' },
    { id: 'winfield', kind: 'FEEDER', name: 'Winfield', minutes: 45, bearing: 175, pop: 11777, note: 'A small college town. The bluegrass festival weekend in September is a bad one for punk.' },
    { id: 'hutchinson', kind: 'FEEDER', name: 'Hutchinson', minutes: 50, bearing: 330, pop: 40006, note: 'The salt town, with its own music community and a community college.' },
    { id: 'arkansas-city', kind: 'FEEDER', name: 'Arkansas City', minutes: 50, bearing: 185, pop: 12000, note: 'A working-class town by the Oklahoma line; kids drive in.' },
    { id: 'mcpherson', kind: 'FEEDER', name: 'McPherson', minutes: 60, bearing: 355, pop: 14000, note: 'A refinery town with a small college and little scene.' },
    { id: 'salina', kind: 'FEEDER', name: 'Salina', minutes: 75, bearing: 350, pop: 46000, note: 'A small scene of its own, and a midpoint for tours toward Denver.' },
    { id: 'emporia', kind: 'FEEDER', name: 'Emporia', minutes: 80, bearing: 50, pop: 24139, note: 'A real college town on the edge of the Flint Hills, with a counterpart scene.' },
    { id: 'topeka', kind: 'PEER', name: 'Topeka', minutes: 120, bearing: 55, scene: 800, note: 'A state capital that is more government than music; the two cities mostly ignore each other.' },
    { id: 'lawrence', kind: 'PEER', name: 'Lawrence', minutes: 150, bearing: 60, slug: 'lawrence-ks', note: 'The state\'s best-known college and music town. Wichita bands look up to it.' },
    { id: 'tulsa', kind: 'PEER', name: 'Tulsa', slug: 'tulsa', state: 'OK', minutes: 165, bearing: 120, scene: 2500, note: 'A natural destination for bands and kids who outgrow Wichita.' }
  ],

  hoods: [
    { id: 'old-town', name: 'Old Town and downtown', route: 'downtown', note: 'A rebuilt warehouse district of bars, lofts and a ballpark. Everything is priced and licensed, so it is poor ground for DIY.' },
    { id: 'delano', name: 'Delano', route: 'downtown', note: 'The west-bank strip across the river: small bars and shops with older houses behind. Heating up, with house shows in the blocks behind.' },
    { id: 'college-hill', name: 'College Hill', route: 'old-side', note: 'Leafy older brick houses with basements and porches east of downtown, favored by students and creatives. Slowly gentrifying.' },
    { id: 'fairmount', name: 'Fairmount and the campus side', route: 'campus', note: 'Student rentals, old foursquare houses and apartment blocks in the northeast around the university.' },
    { id: 'riverside', name: 'Riverside and Midtown', route: 'old-side', note: 'Older houses with yards north of downtown on both banks. Cheap in parts, nicer near the park.' },
    { id: 'planeview', name: 'Planeview and the southeast', route: 'work-side', note: 'Post-war aircraft-worker housing of ranch houses with carports and detached garages. Cheap and ignored.' },
    { id: 'north-industrial', name: 'the north and south industrial edges', route: 'work-side', note: 'Cheap warehouse and light-industrial units used for practice rooms and the odd unpermitted event.' },
    { id: 'west-kellogg', name: 'the west side and the Kellogg strip', route: 'campus', note: 'Newer subdivisions and strip malls where the money is and basements are rarest.' }
  ],

  contacts: ['lawrence-ks', 'tulsa', 'kansas-city', 'oklahoma-city'],

  rooms: [
    { id: 'hill-house', kind: 'HOUSE', hood: 'college-hill', cap: 40, curfew: 1320, ac: false, outdoor: false, pressure: 50, start: true,
      note: 'An old frame house with a basement and a porch. A band-and-friends night, until a neighbor remembers the ten o\'clock rule.' },
    { id: 'delano-yard', kind: 'HOUSE', hood: 'delano', cap: 50, curfew: 1320, ac: false, outdoor: true, pressure: 50,
      note: 'A yard behind the west-bank bar strip. Good in good weather, and the noise calls come when the bars empty out.' },
    { id: 'ranch-carport', kind: 'HOUSE', hood: 'planeview', cap: 35, curfew: 1320, ac: false, outdoor: true,
      note: 'A ranch house with a carport and no basement. Heat and storms decide the night, and nobody on the block minds.' },
    { id: 'southeast-hall', kind: 'HALL', hood: 'planeview', cap: 100, curfew: 1350, ac: true, owner: 'CHURCH_CONTACT',
      note: 'A community room with the chairs stacked on the walls for a pit. Benefit nights with a donation jar, and the host sets the rules.' },
    { id: 'shared-building', kind: 'DIY', hood: 'north-industrial', cap: 120, ages: ['A21'], curfew: 1410, ac: false, standing: [55, 60, 45], pressure: 55,
      note: 'A shared building with a new stage and a better PA. The new keeper wants all ages, and the other tenants want quiet.' },
    { id: 'practice-room', kind: 'DIY', hood: 'north-industrial', cap: 40, curfew: 1350, ac: false, pressure: 45,
      note: 'A cheap second space where first-time bands play. Small, loud and always a little behind on the rent.' },
    { id: 'downtown-space', kind: 'DIY', hood: 'old-town', cap: 150, curfew: 1380, ac: true, pressure: 55,
      note: 'A downtown room with a stage and a landlord to answer to. It may be gone, and nobody can say.' },
    { id: 'campus-bar', kind: 'BAR', hood: 'fairmount', cap: 150, ages: ['A21'], curfew: 1500, ac: true, following: .3,
      note: 'A long-running small bar by the university with live music most nights. Free, loud and twenty-one and over at night.' },
    { id: 'old-town-bar', kind: 'BAR', hood: 'old-town', cap: 250, ages: ['A21'], curfew: 1500, ac: true, soundFee: 60,
      note: 'A bar with a stage downtown. Priced and licensed, and an early all-ages night is a long shot.' },
    { id: 'big-club', kind: 'CLUB', hood: 'old-town', cap: 600, ages: ['A18'], curfew: 1410, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A big club that hosts touring acts. The room a band reaches after the basements.' },
    { id: 'river-lawn', kind: 'OUTDOOR', hood: 'riverside', cap: 300, curfew: 1260, ac: false, outdoor: true,
      note: 'A park pavilion by the river walk. Permits, heat and thunderstorms, in that order.' }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false } },

  calendar: [
    { id: 'downtown-festival', label: 'the nine-day downtown festival', tag: 'festival', month: 6, week: 1, dows: [3, 4, 5, 6], can: [.85, .82, .80], hoods: ['old-town', 'delano'], elsewhere: [.97, .95, .95] },
    { id: 'pride-parade', label: 'the pride parade', tag: 'parade', month: 6, week: 4, dows: [5], can: [.90, .88, .88], hoods: ['old-town'], elsewhere: [1, 1, 1] },
    { id: 'arts-fair', label: 'the arts-and-craft fair weekend', tag: 'fair', month: 9, week: 2, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['fairmount'], elsewhere: [1, 1, 1] },
    { id: 'baseball', label: 'home baseball', tag: 'game', month: 7, weeks: [1, 3], dows: [3, 4, 5], can: [.92, .95, .95], hoods: ['old-town'], elsewhere: [1, 1, 1] },
    { id: 'bluegrass-weekend', label: 'the bluegrass festival weekend', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['planeview'], elsewhere: [1, .97, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Kansas City', state: 'MO', lat: 39.10, lon: -94.58, pop: 510000 },
    { name: 'Oklahoma City', state: 'OK', lat: 35.47, lon: -97.52, pop: 700000 },
    { name: 'Tulsa', state: 'OK', lat: 36.15, lon: -95.99, pop: 410000 },
    { name: 'Topeka', state: 'KS', lat: 39.05, lon: -95.68, pop: 125000 },
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 }
  ],
  roads: ['I-35', 'I-135', 'I-235', 'Kellogg', 'US 81', 'K-96'],

  words: {
    street: ['Kellogg', 'Douglas Avenue', 'Broadway', 'Hillside', 'Oliver', 'Rock Road', 'Seneca', 'Woodlawn'],
    water: ['the Arkansas River', 'the Little Arkansas'],
    hood: ['Delano', 'Old Town', 'College Hill', 'Fairmount', 'Riverside', 'Planeview', 'Hydraulic', 'Oaklawn'],
    thing: ['carport', 'pop', 'bierock', 'storm siren', 'shift change', 'wheat field', 'turnpike', 'loose-meat sandwich', 'church hall', 'lawn parking', 'custard'],
    weather: ['tornado warning', 'hail', 'ice storm', 'wind', 'pollen']
  },

  events: [
    { id: 'WICHITA_KS_TENANT_COMPLAINT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4] },
      telegraph: 'One of the other tenants in the shared building has been grumbling about Saturday load-ins.',
      title: 'The tenants complain',
      body: 'The other tenants in the shared building complain about the Saturday load-in, so you can move the bill to the small space or the community room.',
      options: [
        { id: 'SMALL', label: 'Move to the small practice room', likely: 'It\'s smaller and louder, and cheaper too.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'The bill squeezed into the small room, and it was packed and nobody upstairs minded.' },
        { id: 'HALL', label: 'Move to the community room', likely: 'The chairs stack up and the floor opens.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The hall took the bill, and a donation jar went around.' },
        { id: 'ACCEPT', label: 'Run it as planned and load in quietly', likely: 'The other tenants are watching.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'You loaded in on tiptoe, and nobody complained, but nobody relaxed either.' }
      ] },

    { id: 'WICHITA_KS_DOWNTOWN_FESTIVAL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'A nine-day festival is taking over downtown and the parking is already gone.',
      title: 'Nowhere to park',
      body: 'A long downtown festival has taken every lot, and nobody can park near your Old Town show, so the kids who can walk in from the west bank are the only ones coming.',
      options: [
        { id: 'WESTBANK', label: 'Move the show to the west bank', likely: 'It\'s a smaller yard, closer to the kids who can walk.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'A yard took the bill with an hour to spare, and the kids walked over from the bars.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The people with cars cannot park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.75 }],
          result: 'The lots were full of fireworks watchers, and the people who found you were the regulars.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, but the festival was still going.' }
      ] },

    { id: 'WICHITA_KS_STORM_SIREN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [4, 5, 6] },
      telegraph: 'The sky is green in the west and the sirens are tested every noon.',
      title: 'The siren in the middle of the set',
      body: 'A storm siren goes off mid-set at a carport show in the southeast, and everyone has to find shelter, and the hall next door has the only basement.',
      options: [
        { id: 'HALL', label: 'Take the whole crowd to the hall next door', likely: 'It\'s cramped and loud, but dry.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The hall took the bill, with folding chairs, a donation jar and a band in the corner.' },
        { id: 'WAIT', label: 'Wait it out and play on', likely: 'It means a late finish.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'The storm passed at ten, and the band went back on and the crowd stayed.' },
        { id: 'MOVE', label: 'Call it and move it a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You called it and moved the bill, and some of them could come back.' }
      ] }
  ]
});
