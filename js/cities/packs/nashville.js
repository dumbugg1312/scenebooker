SB.Cities.register('nashville', {
  v: 1,
  slug: 'nashville',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['vanderbilt university', 'vanderbilt', 'belmont university', 'tennessee state university', 'middle tennessee state university', 'mtsu', 'lipscomb',
           'fisk university', 'nashville scene', 'the tennessean', 'tennessean', 'nashville banner', 'wsmv', 'wkrn', 'wtvf', 'wpln', 'wrvu', 'nashville predators',
           'tennessee titans', 'nashville sc', 'nashville sounds', 'grand ole opry', 'opry', 'cma fest', 'country music hall of fame', 'ryman', 'bonnaroo', 'tootsie\'s',
           'fort campbell', 'hca healthcare', 'vanderbilt university medical center', 'nissan', 'nameless fest', 'music row', 'ascend amphitheater', 'bridgestone arena',
           'nissan stadium', 'lower broadway', 'johnny cash museum',
           'wmot', 'nashville cream', 'axios', 'city cast nashville', 'citycast', 'wnxp', 'americanafest', 'southern festival of books',
           'nashville greek festival', 'music city hot chicken festival', 'nashville vegfest', 'tennessee state fair', 'nashville marathon',
           'nashville pride', 'newschannel5', 'songkick', 'nashvillego', 'nashtoday', 'ghost ship fire'],
  blocklist: ['grand ole opry*', 'tootsie*', 'ryman*', 'cma fest*', 'bonnaroo*', 'the tennessean*', 'nashville scene*'],

  blurb: ['Country music sells the postcard. The kids book basements by DM and fill a nonprofit hall on the east side.',
          'Hardcore is on the rise, the dive bars are 21 and up, and half the band works a shift on the tourist strip.'],
  hard: 'Tourist rents, fire marshals and a thin all-ages map.',
  region: 'the Mid-South',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .06, reason: 'The hardcore groundswell here is hard to miss.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Nashville' },
    { id: 'franklin', kind: 'FEEDER', name: 'Franklin', minutes: 25, bearing: 190, note: 'A wealthy suburb. Kids drive in and there are few rooms.' },
    { id: 'hendersonville', kind: 'FEEDER', name: 'Hendersonville', minutes: 25, bearing: 40, note: 'A church-heavy lake suburb with teen bands.' },
    { id: 'smyrna', kind: 'FEEDER', name: 'Smyrna', minutes: 25, bearing: 130, note: 'A suburb on the way to Murfreesboro.' },
    { id: 'gallatin', kind: 'FEEDER', name: 'Gallatin', minutes: 35, bearing: 55, note: 'An exurb. Kids come in for all-ages shows.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 35, bearing: 85, note: 'Farm and warehouse town with a small metal crowd.', lean: ['metal'] },
    { id: 'springfield', kind: 'FEEDER', name: 'Springfield', minutes: 35, bearing: 345, note: 'A small town north. Rides in with older siblings.' },
    { id: 'murfreesboro', kind: 'FEEDER', name: 'Murfreesboro', minutes: 40, bearing: 130, note: 'A big student town with its own house scene. Kids come in on weekends.' },
    { id: 'columbia', kind: 'FEEDER', name: 'Columbia', minutes: 50, bearing: 195, note: 'A small southern town. Shows are rare.' },
    { id: 'clarksville', kind: 'FEEDER', name: 'Clarksville', minutes: 55, bearing: 310, slug: 'clarksville-tn', note: 'An army town with its own scene.' },
    { id: 'huntsville', kind: 'PEER', name: 'Huntsville', state: 'AL', minutes: 110, bearing: 185, slug: 'huntsville-al', note: 'Engineers and a small loud scene.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', minutes: 135, bearing: 135, slug: 'chattanooga-tn', note: 'A mid-sized, steady touring stop.' },
    { id: 'knoxville', kind: 'PEER', name: 'Knoxville', minutes: 180, bearing: 95, slug: 'knoxville-tn', note: 'Students, church and mountains.' }
  ],

  hoods: [
    { id: 'east-nashville', name: 'East Nashville', route: 'old-side', note: 'Old bungalows, gentrified. House venues, bars and a few all-ages rooms.' },
    { id: 'downtown', name: 'downtown and the Gulch', route: 'downtown', note: 'Tourist bars and honky-tonks. The punk crowd avoids it except one or two old clubs on the edge.' },
    { id: 'midtown', name: 'Midtown and Elliston Place', route: 'downtown', note: 'An old rock club strip near the hospitals. Dive bars and a long-running small club.' },
    { id: 'wedgewood', name: 'Wedgewood-Houston', route: 'work-side', note: 'Warehouses and studios turning into galleries. Loading-dock shows.' },
    { id: 'dickerson', name: 'Dickerson Pike', route: 'work-side', note: 'Motels, auto shops and cheap rent. Warehouse rooms.' },
    { id: 'antioch', name: 'Antioch and Nolensville Pike', route: 'work-side', note: 'A big immigrant community, cheap apartments and warehouses.' },
    { id: 'madison', name: 'Madison', route: 'campus', note: 'A northeast suburb with odd spaces, like a hobby shop.' },
    { id: 'hillsboro', name: 'Hillsboro Village', route: 'campus', note: 'Near the private colleges. Coffee shops and students.' },
    { id: 'joelton', name: 'Joelton and the northwest edge', route: 'work-side', note: 'Feed stores and scattered houses on the rural edge. Far from everything, cheap and tolerated.' },
    { id: 'bellevue', name: 'Bellevue', route: 'campus', note: 'A western bedroom town where kids start bands.' }
  ],

  rooms: [
    { id: 'south-house', kind: 'HOUSE', hood: 'hillsboro', cap: 40, curfew: 1380, ac: false, pressure: 55, start: true,
      note: 'A living room booked by DM, with the address shared the day of. The landlord has ignored the roof for years and there is no central air.' },
    { id: 'east-bungalow', kind: 'HOUSE', hood: 'east-nashville', cap: 30, curfew: 1350, ac: false, pressure: 55,
      note: 'A bungalow living room off the pike. Parking complaints and rising rent are the clock.' },
    { id: 'feed-store', kind: 'HOUSE', hood: 'joelton', cap: 60, curfew: 1350, ac: false, pressure: 35,
      note: 'The back room of a feed store and the houses around it, out on the rural edge. A long drive, and nobody minds.' },
    { id: 'pike-hall', kind: 'DIY', hood: 'dickerson', cap: 200, curfew: 1380, ac: true, pressure: 40, needs: ['VOUCH'],
      note: 'A nonprofit all-ages hall in a converted commercial building. It started in a house, then a barbershop, and it runs a daytime program too.' },
    { id: 'loading-dock', kind: 'DIY', hood: 'wedgewood', cap: 50, curfew: 1350, ac: false, pressure: 60, needs: ['VOUCH'],
      note: 'A loading dock and a gallery in the old warehouses. Fire code and gentrifying rents are the worry.' },
    { id: 'hobby-shop', kind: 'SHOP', hood: 'madison', cap: 60, curfew: 1320, ac: true,
      note: 'The back room of a hobby shop in the northeast suburb. Punk and metal bands, done by ten.' },
    { id: 'record-gallery', kind: 'SHOP', hood: 'east-nashville', cap: 50, curfew: 1320, ac: true,
      note: 'A shop and gallery with a small stage. One shop moved and left its basement room behind.' },
    { id: 'dive-bar', kind: 'BAR', hood: 'east-nashville', cap: 120, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A cheap dive that books locals most nights. Stripped-down sets and a 21-and-up wall.' },
    { id: 'rock-club', kind: 'CLUB', hood: 'midtown', cap: 250, ages: ['ALL'], curfew: 1410, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'An old rock club on the hospital-side strip. New management reopened it after a break.' },
    { id: 'black-box', kind: 'CLUB', hood: 'east-nashville', cap: 200, ages: ['A18'], curfew: 1470, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A black-box punk and hardcore room in the east. Nobody is sure what the age policy is this month.' },
    { id: 'heavy-room', kind: 'CLUB', hood: 'east-nashville', cap: 350, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER', needs: ['FULL_BILL'],
      note: 'A bigger room for the heavier touring bands and hardcore benefit nights.' },
    { id: 'gulch-theater', kind: 'BIG', hood: 'downtown', cap: 1100, ages: ['ALL'], curfew: 1380, ac: true, owner: 'TALENT_BUYER',
      note: 'The big touring rooms near the Gulch. Tourist-priced and out of reach for a new booker.' },
    { id: 'house-yard', kind: 'OUTDOOR', hood: 'hillsboro', cap: 80, curfew: 1320,
      note: 'The backyard at a house venue. Parties and small fests, as long as the weather and the neighbors hold.' }
  ],

  contacts: ['huntsville-al', 'chattanooga-tn', 'knoxville-tn', 'louisville', 'memphis'],

  calendar: [
    { id: 'country-festival', label: 'the country music festival', tag: 'festival', month: 6, week: 1, dows: [3, 4, 5, 6], can: [.80, .75, .75], hoods: ['downtown'], elsewhere: [.92, .90, .90] },
    { id: 'camping-festival', label: 'the big camping festival to the south', tag: 'festival', month: 6, week: 2, dows: [3, 4, 5, 6], can: [.85, .80, .80] },
    { id: 'fourth', label: 'the Fourth of July fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5], can: [.85, .85, .85], hoods: ['downtown', 'east-nashville'], elsewhere: [.97, .97, .97] },
    { id: 'roots-convention', label: 'the roots music convention', tag: 'festival', month: 9, week: 3, dows: [1, 2, 3], can: [.92, .90, .90], hoods: ['midtown', 'east-nashville'], elsewhere: [1, 1, 1] },
    { id: 'hall-fest', label: 'the hall\'s own yearly fest', tag: 'festival', month: 10, week: 3, dows: [5, 6], can: [1.10, 1.08, 1.05], hoods: ['dickerson'], elsewhere: [.88, .90, .90] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [6], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260 },

  points: [
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Louisville', state: 'KY', lat: 38.25, lon: -85.76, pop: 1390000 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05, pop: 1341412 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.8, pop: 1197766 }
  ],
  roads: ['I-40', 'I-65', 'I-24', 'I-440', 'Briley Parkway', 'Gallatin Pike'],

  words: {
    street: ['Broadway', 'Gallatin Pike', 'Dickerson Pike', 'Nolensville Pike', 'Charlotte Pike', 'Murfreesboro Pike', 'Elliston Place', 'Jefferson Street'],
    water: ['the Cumberland'],
    hood: ['East Nashville', 'the Gulch', 'Wedgewood-Houston', 'Madison', 'Antioch', 'Hillsboro Village', 'Bellevue', 'Joelton'],
    thing: ['bachelorette bus', 'honky-tonk', 'DM', 'loading dock', 'side door', 'bowling alley', 'box fan', 'short-term rental'],
    weather: ['tornado watch', 'heat wave', 'ice on the hills']
  },

  events: [
    { id: 'NASHVILLE_FIRE_MARSHAL', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 2] },
      telegraph: 'Word is a fire inspector has been walking past warehouse rooms this month.',
      title: 'The fire marshal walks in',
      body: 'Halfway through the second band, a man with a clipboard is counting heads and looking at the one exit. The address came by DM that afternoon and the room is a basement.',
      options: [
        { id: 'CLEAR', label: 'Clear half the room and keep playing', likely: 'Half the night is gone. You stay out of trouble.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Half the room went upstairs. He wrote something down and left.' },
        { id: 'SHUT', label: 'Shut it down and refund the door', likely: 'You lose the money and the night. Everyone knows you did right.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .4 }, { op: 'MONEY', amount: -30 }],
          result: 'The lights came up. People stood on the lawn and traded stories until midnight.' },
        { id: 'TALK', label: 'Talk to him and promise it will not happen again', likely: 'He may buy it. He may not.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'He gave you a card and a warning. The set went on with the door propped open.' }
      ] },

    { id: 'NASHVILLE_TORNADO_WATCH', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [3, 4, 5] },
      telegraph: 'Spring storms are lining up west of the city.',
      title: 'A tornado watch',
      body: 'The sirens are quiet but the phones are buzzing. The headliner is stuck under an overpass west of town and the opener is texting from a gas station.',
      options: [
        { id: 'DELAY', label: 'Push doors back an hour and wait it out', likely: 'The storm passes. The crowd drifts.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The storm blew through. The headliner got there as the first band loaded in.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The weather was fine and the room was half full.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A lot of people stay home under a watch.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The ones who came stayed in the basement and played anyway.' }
      ] },

    { id: 'NASHVILLE_BACHELORETTE_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [6] },
      telegraph: 'The bachelorette buses are already lined up on every block near the Gulch.',
      title: 'The festival weekend takes the block',
      body: 'The country festival has put a bachelorette bus at every bar and taken every parking space within a mile of the club. Your band is circling the block with the van.',
      options: [
        { id: 'EARLY', label: 'Open early and get the gear in before the buses', likely: 'Most get in. A short, thin night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Gear in by four, doors by six. The buses did not find the side door.' },
        { id: 'EAST', label: 'Move the whole bill to the east side', likely: 'Smaller and louder. No tourists.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A bungalow on the east side took the bill, and the floor was packed.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Half the list cannot park.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list gave up and went home. The bachelorettes wandered in at midnight.' }
      ] },

    { id: 'NASHVILLE_HEAT_WAVE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'HEAT', months: [6, 7, 8, 9] },
      telegraph: 'The forecast says a heat wave and the house has no central air.',
      title: 'The living room is an oven',
      body: 'It is a hundred degrees in a living room with a box fan, forty people and the landlord who has ignored the roof for years. Somebody has started opening windows toward the neighbors.',
      options: [
        { id: 'YARD', label: 'Move the bill out to the yard', likely: 'Cooler, but the neighbors can hear.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'OUTDOOR', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The whole bill in the backyard under a string of lights. Someone called it a good night.' },
        { id: 'FANS', label: 'Buy fans and ice and play on', likely: 'Costs twenty-five dollars. It stays hot.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Three fans and a cooler of ice. Everybody was soaked by the second band.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. It was still ninety-eight.' }
      ] }
  ]
});
