SB.Cities.register('jackson-ms', {
  v: 1,
  slug: 'jackson-ms',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['mississippi free press', 'visit jackson', 'visitjackson', 'jackson indie music week', 'indie music week', 'essence festival', 'hbcu homecoming', 'southern university', 'florida a&m', 'alabama state', 'supertalk', 'wlox', 'wafb', 'mdac', 'mississippi department of revenue', 'mississippi department of agriculture', 'jackson state', 'jsu', 'tougaloo', 'millsaps', 'belhaven university', 'hinds community college', 'mississippi college',
           'mississippi state', 'ole miss', 'university of mississippi', 'egg bowl', 'mississippi state fair', 'dixie national',
           'dixie national rodeo', 'national folk festival', 'mississippi book festival', 'jackson free press', 'clarion-ledger', 'clarion ledger',
           'mississippi today', 'mississippi public broadcasting', 'camp shelby', 'nas meridian', 'nissan', 'amtrak', 'greyhound', 'union station',
           'metrocenter', 'northpark', 'waffle house', 'krystal', 'sonic', 'barq\'s', 'barqs', 'coca-cola', 'eudora welty', 'welty', 'the coliseum',
           'mississippi coliseum', 'ross barnett', 'comeback sauce', 'city with soul', 'jxn', 'choctaw', 'neshoba county fair',
           'the fairground annex', 'fairground annex', 'lakeland hall', 'pearl street social', 'magnolia lanes', 'the old cotton house',
           'reservoir room', 'bluff street garage', 'delta junction', 'county line pavilion', 'the mule barn', 'capitol hill elks'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Colleges, the fair, the papers and the stadium are written only in generic form. */
  blocklist: ['jackson free press*', 'metrocenter*', 'waffle house*', 'dixie national*', 'jackson state*', 'mississippi state*', 'ole miss*'],

  blurb: ['Jackson shows hop between porches, bar stages and borrowed halls. The heat is brutal, the crowd small, and the city\'s soul music is never far away.',
          'Punk shares bills and crowds with hip hop people, and everyone knows who owns the PA.'],
  hard: 'Few fixed rooms, brutal heat, and the water or power may simply be out.',
  region: 'the Deep South',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Memphis', state: 'TN', lat: 35.15, lon: -90.05 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Jackson' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton', minutes: 15, bearing: 275, note: 'A west-side suburb with an old college; kids drive in.' },
    { id: 'ridgeland', kind: 'FEEDER', name: 'Ridgeland and Madison', minutes: 20, bearing: 10, note: 'Wealthy suburbs up I-55; kids with cars.' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon and Pearl', minutes: 20, bearing: 100, note: 'Conservative, church-oriented suburbs east on I-20, a feeder of teenagers.' },
    { id: 'canton', kind: 'FEEDER', name: 'Canton', minutes: 30, bearing: 20, note: 'A historic square and a factory nearby, northeast on I-55.' },
    { id: 'yazoo-city', kind: 'FEEDER', name: 'Yazoo City', minutes: 50, bearing: 330, note: 'The gateway to the Delta, hit hard by lost jobs and tornadoes.' },
    { id: 'vicksburg', kind: 'FEEDER', name: 'Vicksburg', minutes: 50, bearing: 265, note: 'A river town with casinos; its own small scene on and off.' },
    { id: 'brookhaven', kind: 'FEEDER', name: 'Brookhaven', minutes: 55, bearing: 190, note: 'A small town with an arts high school; arty kids come up for shows.' },
    { id: 'mccomb', kind: 'FEEDER', name: 'McComb', minutes: 80, bearing: 185, note: 'A railroad town far down I-55 with a community college nearby.' },
    { id: 'hattiesburg', kind: 'PEER', name: 'Hattiesburg', minutes: 90, bearing: 150, scene: 350, note: 'The closest university-town scene; bands trade shows with Jackson regularly.' },
    { id: 'baton-rouge', kind: 'PEER', name: 'Baton Rouge', state: 'LA', minutes: 135, bearing: 190, slug: 'baton-rouge-la', note: 'A similar-sized capital-and-college city that trades crowds now and then.' },
    { id: 'shreveport', kind: 'PEER', name: 'Shreveport', state: 'LA', minutes: 175, bearing: 275, slug: 'shreveport-la', note: 'Three hours west on I-20, the road to Texas.' }
  ],

  hoods: [
    { id: 'fondren', name: 'Fondren', route: 'downtown', note: 'The arty restored commercial strip: bars with stages and patios, where the scene hangs out, and rents are climbing.' },
    { id: 'belhaven', name: 'Belhaven', route: 'old-side', note: 'Leafy streets of old bungalows cut into rentals; house shows are possible, but the neighbors are established.' },
    { id: 'midtown', name: 'Midtown', route: 'work-side', note: 'Cheaper and mixed, with old commercial buildings, warehouses and small houses: where a room that is not a bar can still happen.' },
    { id: 'downtown', name: 'downtown and Capitol Street', route: 'downtown', note: 'The government core: dead after five, with empty storefronts and a handful of bars, perpetually about to revive.' },
    { id: 'farish-street', name: 'Farish Street', route: 'old-side', note: 'The historic Black entertainment district, mostly empty and long promised redevelopment; not a place for outsiders to treat as a cheap district.' },
    { id: 'west-jackson', name: 'West Jackson', route: 'campus', note: 'Working-class and student streets around the historically Black university, where marching bands and hip hop own the nights.' },
    { id: 'south-jackson', name: 'South Jackson and Terry Road', route: 'work-side', note: 'Spread-out ranch houses and old strip malls; the cheapest rent in town, with garages, carports and big yards.' },
    { id: 'north-suburbs', name: 'the suburban belt north and east', route: 'campus', note: 'Ridgeland, Flowood and Pearl: where many band members grew up, with church rooms and strip-center units.' }
  ],

  rooms: [
    { id: 'belhaven-porch', kind: 'HOUSE', hood: 'belhaven', cap: 40, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A porch and carport on a street of old bungalows. The door is a few dollars, the neighbors are close, and July will not cooperate.' },
    { id: 'warehouse', kind: 'DIY', hood: 'midtown', cap: 150, curfew: 1410, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, note: 'A warehouse room in a block of dead businesses, opened to help pay for a practice space. A garage door is the only air conditioning.' },
    { id: 'frame-house-cafe', kind: 'DIY', hood: 'belhaven', cap: 80, curfew: 1350, ac: true, sketch: 25, standing: [65, 60, 60],
      pressure: 45, note: 'A coffee shop in an old frame house with hardwood floors. All ages, benefits for the animal shelters, and a floor that does not love loud.' },
    { id: 'counter-shop', kind: 'SHOP', hood: 'fondren', cap: 60, curfew: 1320, ac: true, sketch: 5, standing: [65, 65, 75],
      note: 'A counter-service food and music spot with a small stage. It books a night only when the owner feels like it.' },
    { id: 'downtown-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A bar and restaurant that has let punk bills on the stage. Twenty-one and over, because that is the owner\'s call.' },
    { id: 'stage-bar', kind: 'BAR', hood: 'fondren', cap: 100, soundFee: 40, pa: .6, ages: ['A21'], curfew: 1470, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 75], note: 'A small stage bar on the arty strip. The rent on the block keeps climbing.' },
    { id: 'fondren-club', kind: 'CLUB', hood: 'fondren', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1410, ac: true, following: .5, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A hall-like indie room on the strip. Punk gets a night only on a good week.' },
    { id: 'suburb-church-hall', kind: 'HALL', hood: 'north-suburbs', cap: 100, rent: 80, deposit: 0, pa: .5, curfew: 1290, ac: true, sketch: 5, standing: [65, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 45, note: 'A church hall out north where the hardcore kids once had a boom. No cursing, no beer, and out by half past nine.' },
    { id: 'south-yard', kind: 'OUTDOOR', hood: 'south-jackson', cap: 80, rent: 10, pa: .4, curfew: 1320, outdoor: true, sketch: 30, standing: [60, 55, 40],
      pressure: 50, note: 'A big yard and carport on the cheap ranch-house side. The heat index, a pop-up storm or the county deputies can each end it.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 600, rent: 1500, deposit: 500, pa: .9, curfew: 1380, ac: true, sketch: 5, standing: [40, 70, 75],
      owner: 'TALENT_BUYER', notice: 70, needs: ['FULL_BILL'], note: 'The arena-scale hall downtown. Almost never for punk, and never on short notice.' }
  ],

  contacts: ['baton-rouge-la', 'shreveport-la', 'new-orleans-la', 'mobile-al', 'gulfport-ms'],

  calendar: [
    { id: 'rodeo', label: 'the rodeo', tag: 'fair', month: 2, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'state-fair', label: 'the state fair', tag: 'fair', month: 10, weeks: [2, 3], dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'paddy-parade', label: 'the St. Patrick\'s parade', tag: 'parade', month: 3, week: 4, dows: [5], can: [.95, .95, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'diy-weekend', label: 'the DIY festival weekend', tag: 'festival', month: 4, week: 3, dows: [4, 5], can: [.95, .95, .95] },
    { id: 'homecoming', label: 'homecoming at the west-side university', tag: 'game', month: 10, weeks: [3, 4], dows: [4, 5], can: [.80, .85, .85], hoods: ['west-jackson'], elsewhere: [.95, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.88, .95, .95], hoods: ['west-jackson'], elsewhere: [1, 1, 1] },
    { id: 'football-nov', label: 'home football', tag: 'game', month: 11, weeks: [1, 2], dows: [5], can: [.88, .95, .95], hoods: ['west-jackson'], elsewhere: [1, 1, 1] },
    { id: 'lights-crawl', label: 'the neighborhood lights crawl', tag: 'festival', month: 12, weeks: [1, 2], dows: [4, 5, 6], can: [.85, .90, .90], hoods: ['belhaven'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Meridian', state: 'MS', lat: 32.36, lon: -88.7, pop: 35000 },
    { name: 'Oxford', state: 'MS', lat: 34.37, lon: -89.52, pop: 25000 }
  ],
  roads: ['I-55', 'I-20', 'I-220', 'US 49', 'US 51', 'US 80'],

  words: {
    street: ['State Street', 'Capitol Street', 'Lakeland Drive', 'County Line Road', 'Old Canton Road', 'Northside Drive', 'Woodrow Wilson Avenue', 'Terry Road', 'Highway 80'],
    water: ['the Pearl River', 'the Reservoir', 'Pearl River', 'the Natchez Trace'],
    hood: ['Fondren', 'Belhaven', 'Midtown', 'Farish Street', 'West Jackson', 'South Jackson', 'Flowood', 'Pearl', 'Ridgeland', 'Madison', 'across the river'],
    thing: ['water tower', 'magnolia', 'tornado shelter', 'gas-station chicken', 'tamale', 'sweet tea', 'boil-water notice', 'window unit', 'borrowed PA', 'porch', 'church hall', 'box fan'],
    weather: ['heat index', 'tornado watch', 'ice storm', 'pop-up storm']
  },

  events: [
    { id: 'JACKSON_MS_BOIL_WATER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [1, 2, 7, 8, 9] },
      telegraph: "The water pressure is gone on the east side, and a boil notice is expected by morning.",
      title: "The water is out again",
      body: "A main broke and the notice went out the day of your show. The coffee shop cannot open its kitchen, and nobody wants to stand in a room without a working toilet.",
      options: [
        { id: 'HOUSE', label: "Move the bill to a carport with a borrowed generator", likely: "Smaller and louder, and nobody can cancel a carport.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: "A friend's carport took the whole bill on an extension cord, and the floor was packed." },
        { id: 'SHORT', label: "Run it dry and short", likely: "A thin night, but the ones who came are glad.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: "Bottled water and a short set. The room was half full and sticky." },
        { id: 'MOVE', label: "Move it a day", likely: "Breaks the date. Costs trust with the bands.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: "You moved it a day. Not everyone could make the new one." }
      ] },

    { id: 'JACKSON_MS_FAIR_TRAFFIC', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'fair' },
      telegraph: "The fair is open all week and the exit ramp is a parking lot every night.",
      title: "The fair backs up the road",
      body: "Fair traffic has the north-end bar stuck behind a mile of taillights. But a gang of fourteen-year-olds with fair wristbands are hunting for something else to do.",
      options: [
        { id: 'EARLY', label: "Open early, before the rush", likely: "Most get in ahead of the traffic.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: "Doors an hour early. The ones who came beat the backup and stayed." },
        { id: 'ACCEPT', label: "Run it as planned", likely: "Lots of people give up on the road.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: "The ramp never cleared. Half the list stayed home." },
        { id: 'KIDS', label: "Take the fair kids at the door", likely: "A few more heads, and a few more problems.",
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.1 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: "A few wristbanded kids wandered in and stayed to the last song. The room was loud and a little wild." }
      ] },

    { id: 'JACKSON_MS_HEAT_INDEX', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9], weather: 'HEAT' },
      telegraph: "The heat index is past a hundred and ten and the warehouse has one garage door.",
      title: "The warehouse is an oven",
      body: "The warehouse has no air conditioning and the heat index is dangerous by late afternoon. The bands are asking if they can play before the sun goes down.",
      options: [
        { id: 'EARLY', label: "Move the whole show to six in the evening", likely: "Short and sweaty, but nobody passes out.",
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: "Doors at five thirty and done by nine. The garage door stayed up and the fans never stopped." },
        { id: 'ICE', label: "Buy ice and fans and run it", likely: "Costs twenty-five dollars. A hot night.",
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: "Ice in a cooler and every fan you could find. Hot and loud, and they stayed." },
        { id: 'MOVE', label: "Move it a day", likely: "Breaks the date. Costs trust with the bands.",
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: "You moved it a day. Not everyone could make the new one." }
      ] }
  ]
});
