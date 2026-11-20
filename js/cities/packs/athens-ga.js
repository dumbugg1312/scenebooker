SB.Cities.register('athens-ga', {
  v: 1,
  slug: 'athens-ga',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of georgia', 'uga', 'flagpole', 'wuog', 'wppp', 'wuga', 'athfest', 'twilight criterium', 'porchfest', 'north georgia folk festival',
           'the red & black', 'red and black', 'athens banner-herald', 'banner-herald', 'the grill', 'd.p. dough', 'dp dough', 'insomnia cookies', 'waffle house',
           'ben epps', 'fort gordon', 'lickskillet', 'sandy creek park', 'bethel midtown village', 'reconnecting communities',
           'red clay hall', 'kudzu annex', 'cotton row social club', 'bypass lanes', 'loop 10 lounge', 'the pottery shed', 'sandy creek roller rink',
           'barber street fellowship hall', 'winterville depot room', 'mitchell bridge moose lodge', 'moose lodge', 'atlanta highway skate barn',
           'oconee hill rec center', 'cheerwine', 'last resort'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Game text says "the university", "the weekly paper", "the big festival". */
  blocklist: ['athfest*', 'flagpole*', 'porchfest*', 'twilight criterium*', 'waffle house*', 'wuog*', 'd.p. dough*'],

  blurb: ['A small brick-and-oak college town with a long name as a music town, where everybody is in a band and half the shows are in somebody\'s living room.',
          'Hardcore kids and returning veterans carry it. Hosts go invitation-only, hang blankets on the walls, and the police start driving by after midnight.'],
  hard: 'The one steady punk room is gone, houses go invitation-only, and rents are climbing.',
  region: 'the Georgia Piedmont',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Durham', state: 'NC', lat: 35.99, lon: -78.90 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Athens' },
    { id: 'winterville', kind: 'FEEDER', name: 'Winterville', minutes: 10, bearing: 90, pop: 1100, note: 'A tiny railroad-depot town just east. A few musicians live there and nobody has a scene.' },
    { id: 'watkinsville', kind: 'FEEDER', name: 'Watkinsville', minutes: 15, bearing: 185, pop: 3000, note: 'A well-off arts town to the south. The kids come into town for shows.' },
    { id: 'bogart', kind: 'FEEDER', name: 'Bogart', minutes: 15, bearing: 270, pop: 1200, note: 'A bedroom town on the Atlanta Highway side. No scene, just cars.' },
    { id: 'lexington', kind: 'FEEDER', name: 'Lexington', minutes: 25, bearing: 100, note: 'A tiny farm town east. Kids with trucks drive in.' },
    { id: 'jefferson', kind: 'FEEDER', name: 'Jefferson', minutes: 30, bearing: 355, pop: 12000, lean: ['hardcore'], note: 'A football-first town to the north, growing with commuters. A steady supply of hardcore-adjacent teenagers.' },
    { id: 'winder', kind: 'FEEDER', name: 'Winder', minutes: 30, bearing: 285, pop: 18000, beyond: 'ga316', note: 'A mill and commuter town to the west. Little scene of its own.' },
    { id: 'monroe', kind: 'FEEDER', name: 'Monroe', minutes: 35, bearing: 250, pop: 14000, lean: ['metal'], note: 'An old mill town turning into an Atlanta-edge suburb, with skate and metal kids.' },
    { id: 'commerce', kind: 'FEEDER', name: 'Commerce', minutes: 35, bearing: 345, pop: 7000, note: 'An interstate and outlet-mall town to the north. Nothing for teenagers.' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 40, bearing: 190, pop: 4000, note: 'An old tourist town to the south. Rural, a little prep, a few kids with cars.' },
    { id: 'danielsville', kind: 'FEEDER', name: 'Danielsville and Comer', minutes: 40, bearing: 55, note: 'Farm country to the northeast. A few kids with cars and long drives home.' },
    { id: 'elberton', kind: 'FEEDER', name: 'Elberton', minutes: 55, bearing: 80, pop: 4500, lean: ['metal', 'hardcore'], note: 'A granite-quarry town to the east. A handful of teenagers come for hardcore and metal.' },
    { id: 'gwinnett', kind: 'FEEDER', name: 'Lawrenceville and Buford', minutes: 55, bearing: 255, beyond: 'ga316', scene: 300,
      note: 'The northeast Atlanta suburbs down GA-316. More kids than all the small towns together, and they come for the weekend.' },
    { id: 'augusta', kind: 'PEER', name: 'Augusta', minutes: 105, bearing: 120, slug: 'augusta-ga', note: 'A harder, bigger, base-and-hospital city. A place to play once a year and leave.' },
    { id: 'macon', kind: 'PEER', name: 'Macon', minutes: 115, bearing: 190, scene: 3000, note: 'An older, soulful river city with a reviving downtown. A real trading partner of crowds.' },
    { id: 'greenville', kind: 'PEER', name: 'Greenville', state: 'SC', minutes: 120, bearing: 55, scene: 4000, note: 'A gentrifying college-adjacent city with a restaurant boom. A genuine two-way partner.' },
    { id: 'columbia', kind: 'PEER', name: 'Columbia', state: 'SC', minutes: 165, bearing: 100, slug: 'columbia-sc', note: 'A statehouse and college city. A decent peer on the long road.' }
  ],

  chokepoints: [
    { id: 'ga316', name: 'GA-316 into the city', p: .02 }
  ],

  hoods: [
    { id: 'downtown', name: 'Downtown', route: 'downtown', note: 'The grid north of campus: bars, theaters turned clubs, record stores and new student mid-rises. Priced up and student-ified; the licensed rooms hold on.' },
    { id: 'normaltown', name: 'Normaltown and Prince Avenue', route: 'old-side', note: 'Bungalows, porches and local bars along the old corridor. Musicians who stayed live here. Pricey and getting redeveloped.' },
    { id: 'boulevard', name: 'Boulevard and Barber Street', route: 'old-side', note: 'Old frame houses and mill-style rentals with yards, carports and porches. The classic cheap house-show ground.' },
    { id: 'eastside', name: 'the Eastside and the Oconee mill edge', route: 'work-side', note: 'Mill-village houses near the river. Cheap and ignored, with yards, where shows go when downtown gets expensive.' },
    { id: 'five-points', name: 'Five Points and Milledge', route: 'campus', note: 'Big old houses, faculty and fraternity row. Not a show neighborhood, and the neighbors call the police.' },
    { id: 'pottery-town', name: 'Buena Vista Heights and Pottery Town', route: 'old-side', note: 'Small rentals and creative households northwest of downtown, partly built over now.' },
    { id: 'westside', name: 'the Atlanta Highway strip', route: 'work-side', note: 'Strip malls, motels and apartments to the west. Warehouse and strip-mall practice rooms and a dead street without a car.' },
    { id: 'west-broad', name: 'West Broad and North Downtown', route: 'downtown', note: 'A redeveloped landscape with a long memory of displacement. Not a show neighborhood, but touchy ground.' }
  ],

  rooms: [
    { id: 'boulevard-porch', kind: 'HOUSE', hood: 'boulevard', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 20, standing: [70, 60, 45],
      pressure: 40, start: true, note: 'A big old frame house with a porch and a yard. The neighbors are mostly fine until eleven.' },
    { id: 'normaltown-yard', kind: 'HOUSE', hood: 'normaltown', cap: 50, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 45],
      pressure: 50, note: 'A bungalow with a front-yard stage. Well-liked, and well-watched by the street.' },
    { id: 'eastside-carport', kind: 'HOUSE', hood: 'eastside', cap: 45, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: true, sketch: 25, standing: [65, 55, 40],
      pressure: 40, note: 'A mill-village carport near the river. Loud is fine here; the only worry is the cold between sets.' },
    { id: 'pottery-living-room', kind: 'HOUSE', hood: 'pottery-town', cap: 35, hostCut: 0, pa: .3, curfew: 1380, ac: false, outdoor: false, sketch: 15, standing: [65, 55, 40], pressure: 50,
      note: 'A creative household with a living room full of amps. Tiny and sweaty in summer.' },
    { id: 'strip-practice', kind: 'DIY', hood: 'westside', cap: 90, rent: 60, deposit: 0, pa: .5, curfew: 1440, ac: false, sketch: 40, standing: [55, 60, 45], pressure: 55,
      needs: ['VOUCH'], note: 'A practice room in a commercial strip, used after hours. Few neighbors; the landlord only cares until he finds out.' },
    { id: 'east-hall', kind: 'HALL', hood: 'eastside', cap: 120, rent: 90, deposit: 40, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [60, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rec hall in the east side with folding chairs and a long rule sheet. Cheap, and no beer.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 130, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1470, ac: true, following: .3, sketch: 15,
      standing: [50, 65, 70], note: 'A downtown bar with a stage. Over-18 shows with a bracelet for drinking; it has to clear by midnight on some nights.' },
    { id: 'back-room', kind: 'BAR', hood: 'downtown', cap: 80, soundFee: 30, pa: .6, ages: ['A21'], curfew: 1470, ac: true, following: .2, sketch: 10,
      standing: [50, 65, 70], note: 'A back room at a downtown bar that takes free Sunday nights and weird bills.' },
    { id: 'records', kind: 'SHOP', hood: 'downtown', cap: 40, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store downtown. In-stores in the afternoon, over by seven.' },
    { id: 'club', kind: 'CLUB', hood: 'downtown', cap: 400, houseCosts: 200, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'An old movie palace turned club. It wants a name and six weeks.' }
  ],

  contacts: ['atlanta', 'augusta-ga', 'columbia-sc', 'asheville-nc', 'chattanooga-tn'],

  weather: { preset: 'SOUTHEAST', fineMonths: [3, 4, 10], coolMonths: [11] },

  calendar: [
    { id: 'move-in', label: 'move-in week', tag: 'holiday', month: 8, week: 3, dows: [3, 4, 5, 6], can: [1.12, 1.12, 1] },
    { id: 'football-sep', label: 'home football Saturday', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.75, .80, .85], hoods: ['downtown', 'five-points', 'normaltown'], elsewhere: [.9, .95, .95] },
    { id: 'football-oct', label: 'home football Saturday', tag: 'game', month: 10, weeks: [1, 3], dows: [5], can: [.75, .80, .85], hoods: ['downtown', 'five-points', 'normaltown'], elsewhere: [.9, .95, .95] },
    { id: 'football-nov', label: 'home football Saturday', tag: 'game', month: 11, weeks: [1, 3], dows: [5], can: [.75, .80, .85], hoods: ['downtown', 'five-points', 'normaltown'], elsewhere: [.9, .95, .95] },
    { id: 'bike-race', label: 'the downtown bike race', tag: 'race', month: 4, weeks: [3, 4], dows: [4, 5], can: [.90, .90, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'big-festival', label: 'the big downtown music festival', tag: 'festival', month: 6, weeks: [3, 4], dows: [4, 5, 6], can: [.90, .88, .90], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'porch-day', label: 'porch day', tag: 'festival', month: 10, week: 3, dows: [6], can: [.88, .88, .92], hoods: ['normaltown', 'boulevard', 'pottery-town'], elsewhere: [.95, .95, .95] },
    { id: 'thanksgiving', label: 'Thanksgiving week', tag: 'holiday', month: 11, week: 4, dows: [2, 3, 4, 5], can: [.60, .85, .85] }
  ],

  rules: { quiet: 1380 },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2700000 },
    { name: 'Macon', state: 'GA', lat: 32.84, lon: -83.63, pop: 230000 }
  ],
  roads: ['GA-10 Loop', 'GA-316', 'US-78', 'US-441', 'US-29', 'US-129'],

  words: {
    street: ['Prince Avenue', 'Broad Street', 'Milledge Avenue', 'Barber Street', 'Chase Street', 'Atlanta Highway', 'Oconee Street', 'Hawthorne Avenue', 'Hull Street', 'Oglethorpe Avenue'],
    water: ['the Oconee', 'the Middle Oconee', 'Sandy Creek', 'Cedar Creek'],
    hood: ['Normaltown', 'Boulevard', 'Cobbham', 'Five Points', 'Chicopee', 'Dudley Park', 'Pottery Town', 'Buena Vista Heights', 'Winterville'],
    thing: ['porch', 'kudzu', 'red clay', 'pollen', 'mill village', 'carport', 'crawlspace', 'pine straw', 'tall oak', 'blanket on the wall', 'backyard', 'drum kit'],
    weather: ['pollen', 'ice storm', 'summer thunderstorm'],
    surnames: ['Hudson', 'Brown', 'Johnson', 'Mitchell', 'Whitehead', 'Nguyen', 'Garcia', 'Patel', 'Bryant', 'Thomas']
  },

  events: [
    { id: 'ATHENS_GA_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday, and every road in town will be clogged.',
      title: 'Football has the town',
      body: 'A home game has the Loop gridlocked and the streets closed. The touring van is sitting in traffic, and half the crowd is at a tailgate and will not leave it.',
      options: [
        { id: 'LATE', label: 'Push doors back an hour and wait out the traffic', likely: 'Most of them show up eventually. The night starts late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors an hour late. The ones who came did not mind the wait.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people are stuck on the other side of the stadium.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'The headliner got there after the locals had played. The room was thin.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'ATHENS_GA_BIKE_RACE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The bike race is closing the downtown streets this weekend.',
      title: 'The bike race has the streets',
      body: 'Barricades close the downtown blocks, and the load-in route is blocked. The band has to park a long way off and carry their gear.',
      options: [
        { id: 'EARLY', label: 'Open early, tell everyone where to park', likely: 'Most get in before the barricades. Thinner than usual.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'Doors an hour early. The ones who came walked from a mile away.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A lot of people give up on the closures.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .78 }],
          result: 'The barricades stayed up. Half the list never found a place to leave the car.' }
      ] },

    { id: 'ATHENS_GA_NOISE_RULE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [3, 4, 5, 9, 10, 11] },
      telegraph: 'A neighbor mentions that the county changed its amplified-sound rule last month.',
      title: 'The rule changed last month',
      body: 'The county now wants anyone running amplified sound to register ahead of time, and a neighbor has noticed. A call is coming if you do not sort it out.',
      options: [
        { id: 'REGISTER', label: 'Register the show and keep it short', likely: 'Costs a morning. The night is clean.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The paperwork took a morning. Nobody called the police.' },
        { id: 'QUIET', label: 'Turn the show acoustic on the porch', likely: 'Smaller and quieter, but safe.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'The set was a porch set. The neighbors stayed in.' },
        { id: 'RISK', label: 'Ignore it and run loud', likely: 'The neighbors call. Costs forty dollars when they do.',
          effects: [{ op: 'MONEY', amount: -40 }],
          result: 'The police came by at ten forty and the night ended early.' }
      ] },

    { id: 'ATHENS_GA_POLLEN_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [3, 4] },
      telegraph: 'The pollen is coming down yellow on every van and porch.',
      title: 'The pollen week',
      body: 'A yellow film covers everything. Half the crowd is sneezing through the sad songs, and the singer has no voice.',
      options: [
        { id: 'GO', label: 'Run it and hand out tissues', likely: 'The room is a little smaller and a little warmer.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .92 }, { op: 'REGULARS', pct: .01 }],
          result: 'The band played through it. People remembered the box of tissues.' },
        { id: 'MOVE', label: 'Move it inside', likely: 'Smaller, but dry.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .7 }],
          result: 'A living room took the whole bill. It was cramped and the windows stayed shut.' }
      ] }
  ]
});
