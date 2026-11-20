SB.Cities.register('pittsburgh', {
  v: 1,
  slug: 'pittsburgh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of pittsburgh', 'pitt', 'carnegie mellon', 'duquesne', 'point park', 'chatham', 'carlow', 'robert morris', 'ccac', 'steelers', 'pirates', 'penguins',
           'pittsburgh city paper', 'city paper', 'post-gazette', 'tribune-review', 'wesa', 'wyep', 'wrct', 'wpts', 'the pitt news', 'the tartan', 'iron city', 'imp and arn',
           'yuengling', 'eat\'n park', 'sheetz', 'giant eagle', 'picklesburgh', 'three rivers arts festival', 'little italy days', 'light up night', 'pittsburgh marathon',
           'plcb', 'us steel', 'nfl draft', 'anthrocon', 'amtrak', 'vfw', 'american legion', 'elks', 'moose lodge', 'eagles aerie',
           'the cinder cellar', 'slopes parish hall', 'aerie 1087', 'mill gate social club', 'the flood line', 'ninth street annex', 'troy hill turnverein',
           'beltzhoover boiler room', 'brownsville road backroom', 'greenfield garage', 'ross street laundromat annex', 'station square stairwell',
           'fire company no. 4 hall', 'the sokol room', 'allentown warehouse loft'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The big downtown convention is "the convention" in game text. */
  blocklist: ['iron city*', 'eat\'n park*', 'sheetz*', 'giant eagle*', 'steelers*', 'picklesburgh*', 'pittsburgh city paper*', 'three rivers arts festival*', 'anthrocon*'],

  blurb: ['A city of steep hills, three rivers and hundreds of bridges, where the mills shut and left cheap houses, social halls and a scene in every neighborhood.',
          'Shows are in stone cellars, fraternal halls and old churches. Rooms close over codes, not raids, and the bands keep coming.'],
  hard: 'Code offices close good rooms; halls give weddings and fish fries priority.',
  region: 'the Rust Belt',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'metal', d: .10, reason: 'A town with a long memory for hardcore, thrash and doom.' },
    { fan: 'metal', band: 'hardcore', d: .10, reason: 'A town with a long memory for hardcore, thrash and doom.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Pittsburgh' },
    { id: 'butler', kind: 'FEEDER', name: 'Butler', minutes: 45, bearing: 10, note: 'A mill and suburb town: practice spaces and a lot of high-school bands.' },
    { id: 'beaver', kind: 'FEEDER', name: 'Beaver Falls and the Beaver Valley', minutes: 40, bearing: 315, beyond: 'parkway-west', note: 'River and mill towns on the road to Ohio. Pittsburgh is where they go.' },
    { id: 'slippery-rock', kind: 'FEEDER', name: 'Slippery Rock and Grove City', minutes: 55, bearing: 350, note: 'Small college towns with campus and house shows.' },
    { id: 'new-castle', kind: 'FEEDER', name: 'New Castle', minutes: 60, bearing: 330, note: 'A declining mill town up the interstate.' },
    { id: 'greensburg', kind: 'FEEDER', name: 'Greensburg and Latrobe', minutes: 50, bearing: 105, beyond: 'parkway-east', note: 'A county seat and a small college town with local bands and an older hardcore tradition.' },
    { id: 'washington', kind: 'FEEDER', name: 'Washington', state: 'PA', minutes: 40, bearing: 215, beyond: 'parkway-west', note: 'Farm and gas-drilling country with a few basements. Mostly kids who drive up to the city.' },
    { id: 'wheeling', kind: 'FEEDER', name: 'Wheeling', state: 'WV', minutes: 60, bearing: 255, beyond: 'parkway-west', note: 'An Ohio River town with a small scene.' },
    { id: 'uniontown', kind: 'FEEDER', name: 'Uniontown and Fayette County', minutes: 65, bearing: 170, note: 'Old coal and coke towns, hard-up. The kids drive to Pittsburgh.' },
    { id: 'indiana', kind: 'FEEDER', name: 'Indiana', state: 'PA', minutes: 75, bearing: 55, beyond: 'parkway-east', note: 'A university town with a student scene.' },
    { id: 'morgantown', kind: 'FEEDER', name: 'Morgantown', state: 'WV', minutes: 75, bearing: 190, note: 'A big college town with a house-show scene of its own.' },
    { id: 'johnstown', kind: 'FEEDER', name: 'Johnstown', minutes: 80, bearing: 95, beyond: 'parkway-east', note: 'A flood-and-steel town in a deep valley, with hardcore and metal pockets of its own.' },
    { id: 'meadville', kind: 'FEEDER', name: 'Meadville', minutes: 90, bearing: 355, note: 'A small liberal-arts town up I-79.' },
    { id: 'youngstown', kind: 'PEER', name: 'Youngstown', state: 'OH', minutes: 75, bearing: 320, slug: 'youngstown-oh', note: 'A bigger Rust Belt cousin with its own scene. Bands trade both ways.' },
    { id: 'erie', kind: 'PEER', name: 'Erie', minutes: 140, bearing: 350, slug: 'erie-pa', note: 'A lake city with a small scene and a snow belt.' },
    { id: 'state-college', kind: 'PEER', name: 'State College', minutes: 140, bearing: 85, slug: 'state-college-pa', note: 'A huge state university with an enormous school-year swing.' }
  ],

  chokepoints: [
    { id: 'parkway-east', name: 'the Parkway East at the tunnel', p: .025 },
    { id: 'parkway-west', name: 'the Parkway West at the tunnel', p: .02 }
  ],

  hoods: [
    { id: 'oakland', name: 'Oakland', route: 'campus', note: 'Student rental houses with damp basements near the big hospitals. Always churning: landlords and campus police turn spaces over fast.' },
    { id: 'polish-hill', name: 'Polish Hill', route: 'old-side', note: 'A small, steep bluff of narrow rowhouses and a punk reputation. Basements, and the rent is rising.' },
    { id: 'lawrenceville', name: 'Lawrenceville', route: 'downtown', note: 'The old band neighborhood along the river, now restaurants and condos. Priced out for most DIY, with a few bigger licensed rooms left.' },
    { id: 'garfield', name: 'Garfield and Bloomfield', route: 'old-side', note: 'Penn Avenue storefronts and galleries, old Italian bars and social clubs. Garfield is heating up; Bloomfield is already pricey.' },
    { id: 'south-side', name: 'the South Side Flats', route: 'downtown', note: 'A long strip of bars with stages and rowdy weekend crowds. Noise complaints all night.' },
    { id: 'slopes', name: 'the South Side Slopes', route: 'old-side', note: 'Steep stair-streets above the Flats: cheap, odd houses with basements and views.' },
    { id: 'north-side', name: 'the North Side', route: 'old-side', note: 'Old German and Slavic blocks of brick rowhouses, churches and social halls, with plenty of cellars.' },
    { id: 'wilkinsburg', name: 'Wilkinsburg and the Mon Valley', route: 'work-side', note: 'Big cheap houses and former steel towns with empty storefronts and fraternal halls. Thin borough police and touchy code offices.' },
    { id: 'millvale', name: 'Millvale', route: 'work-side', note: 'A small borough across the river with a main street, old churches and halls. A band town that floods.' },
    { id: 'south-hills', name: 'the South Hills and Mt. Oliver', route: 'work-side', note: 'Hill neighborhoods of cheap rowhouses with many basements, policed by small independent boroughs.' }
  ],

  rooms: [
    { id: 'hill-basement', kind: 'HOUSE', hood: 'polish-hill', cap: 55, hostCut: 0, pa: .4, curfew: 1380, ac: false, outdoor: false, sketch: 25, standing: [70, 60, 45], pressure: 55, start: true,
      note: 'A stone cellar under a rowhouse on the bluff. One steep stair, low ceilings, and neighbors on both sides.' },
    { id: 'oakland-basement', kind: 'HOUSE', hood: 'oakland', cap: 60, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 30, standing: [65, 55, 40], pressure: 60,
      note: 'A student house basement near campus. Loud, packed, and always one permit away from a stop-work order.' },
    { id: 'wilkinsburg-house', kind: 'HOUSE', hood: 'wilkinsburg', cap: 65, hostCut: 0, pa: .4, curfew: 1380, outdoor: false, sketch: 25, standing: [65, 55, 45], pressure: 45,
      note: 'A big old band house in the east. Cheap, but the borough has its own tiny police and its own ideas.' },
    { id: 'hills-basement', kind: 'HOUSE', hood: 'south-hills', cap: 45, hostCut: 0, pa: .3, curfew: 1380, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 50,
      note: 'A rowhouse basement in a hill borough. Sound carries across the valley.' },
    { id: 'slopes-church-hall', kind: 'HALL', hood: 'slopes', cap: 90, rent: 80, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 5, standing: [60, 60, 60],
      owner: 'CHURCH_CONTACT', pressure: 50, note: 'A former church hall on the hill. All ages, no beer, and the pastor says no after the first complaint.' },
    { id: 'social-hall', kind: 'HALL', hood: 'north-side', cap: 160, rent: 200, deposit: 75, pa: .6, curfew: 1380, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'An old fraternal club with a bar upstairs and a hall below. Weddings and fish fries come first, and the bartender wants the bar take.' },
    { id: 'fire-hall', kind: 'HALL', hood: 'wilkinsburg', cap: 180, rent: 150, deposit: 75, pa: .6, curfew: 1380, ac: false, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A volunteer fire company hall in a borough: big, cheap, with a kitchen, and bingo on the other nights.' },
    { id: 'collective-room', kind: 'DIY', hood: 'garfield', cap: 100, rent: 60, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 25, standing: [65, 65, 50], pressure: 50,
      needs: ['VOUCH'], note: 'A collectively run all-ages gallery and music room on the avenue. Volunteer door, strict rules, and a long waiting list of benefits.' },
    { id: 'river-storefront', kind: 'DIY', hood: 'lawrenceville', cap: 80, rent: 90, deposit: 0, pa: .5, curfew: 1380, ac: false, sketch: 35, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A storefront on the flat by the river, cheap until a new owner arrives.' },
    { id: 'strip-warehouse', kind: 'DIY', hood: 'lawrenceville', cap: 140, rent: 100, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'A warehouse bay chopped into band rooms. A rehearsal building that sometimes hosts a bill.' },
    { id: 'records', kind: 'SHOP', hood: 'garfield', cap: 40, pa: .4, curfew: 1140, ac: false, sketch: 5, standing: [70, 70, 80], following: .2,
      note: 'The record store. In-stores in the afternoon, over by seven.' },
    { id: 'flats-bar', kind: 'BAR', hood: 'south-side', cap: 130, soundFee: 60, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1560, ac: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar with a stage on the main strip. Under 21 early, with a separate area, and the insurance is the owner\'s whole complaint.' },
    { id: 'millvale-church', kind: 'CLUB', hood: 'millvale', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['ALL', 'A21'], curfew: 1560, ac: false, lowLying: true, following: .5, sketch: 10,
      standing: [50, 70, 70], owner: 'TALENT_BUYER', notice: 35, needs: ['FULL_BILL'], note: 'A closed church turned into a mid-size licensed room by the river. Wants a name and a full bill, and the basement floods.' },
    { id: 'club', kind: 'CLUB', hood: 'lawrenceville', cap: 400, houseCosts: 200, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 10,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A legal licensed club that took the load from the houses. Wants six weeks and a name.' }
  ],

  contacts: ['youngstown-oh', 'erie-pa', 'state-college-pa', 'philadelphia'],

  calendar: [
    { id: 'home-game-sunday-oct', label: 'the football Sundays', tag: 'game', month: 10, weeks: [1, 5], dows: [6], can: [.78, .82, .85] },
    { id: 'home-game-sunday-nov', label: 'the football Sundays', tag: 'game', month: 11, weeks: [1, 5], dows: [6], can: [.78, .82, .85] },
    { id: 'college-saturday', label: 'college football Saturdays', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95], hoods: ['oakland'], elsewhere: [.97, 1, 1] },
    { id: 'convention', label: 'the big downtown convention', tag: 'festival', month: 7, week: 1, dows: [3, 4, 5, 6], can: [.90, .88, .88], hoods: ['south-side', 'lawrenceville'], elsewhere: [.97, .95, .95] },
    { id: 'fish-fry', label: 'Lenten fish fries', tag: 'holiday', month: 3, weeks: [1, 5], dows: [4], can: [.88, .90, .92], hoods: ['north-side', 'slopes', 'wilkinsburg'], elsewhere: [1, 1, 1] },
    { id: 'arts-festival', label: 'the downtown arts festival', tag: 'festival', month: 6, week: 2, dows: [4, 5, 6], can: [.92, .90, .92], hoods: ['south-side', 'lawrenceville'], elsewhere: [.97, .97, .97] },
    { id: 'marathon', label: 'marathon weekend', tag: 'race', month: 5, week: 1, dows: [5, 6], can: [.92, .90, .92], hoods: ['oakland', 'south-side', 'garfield'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1380, weekend: 1440, inForce: false }, quiet: 1320 },

  points: [
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0, pop: 2100000 },
    { name: 'Harrisburg', state: 'PA', lat: 40.27, lon: -76.88, pop: 600000 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61, pop: 2800000 }
  ],
  roads: ['I-76', 'I-79', 'I-70', 'I-376', 'I-279', 'US 22'],

  words: {
    street: ['Butler Street', 'Penn Avenue', 'Carson Street', 'Forbes Avenue', 'Bigelow Boulevard', 'Brownsville Road', 'Centre Avenue', 'Liberty Avenue', 'Ellsworth Avenue'],
    water: ['the Allegheny', 'the Monongahela', 'the Ohio', 'the Mon', 'the Point'],
    hood: ['Polish Hill', 'Lawrenceville', 'Bloomfield', 'Garfield', 'Oakland', 'the Slopes', 'Troy Hill', 'Deutschtown', 'Millvale', 'Wilkinsburg', 'Homestead', 'Braddock', 'Beltzhoover', 'Carrick', 'Mt. Oliver'],
    thing: ['parking chair', 'pierogi', 'haluski', 'cookie table', 'fish fry', 'stair-street', 'incline', 'bridge', 'slag', 'cellar', 'hoagie', 'wedding soup', 'volunteer fire hall', 'social club', 'stone cellar', 'church basement'],
    weather: ['black ice', 'lake effect', 'tropical remnant'],
    order: ['Sokol', 'Turnverein'],
    surnames: ['Kowalski', 'Novak', 'Rossi', 'Petrosky', 'Sullivan', 'Hrabak', 'Moretti', 'Jones', 'Kovach', 'Murphy']
  },

  events: [
    { id: 'PITTSBURGH_GAME_DAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 30, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'game' },
      telegraph: 'The home team plays on the day of your show and the bridges are already filling.',
      title: 'The big game is on',
      body: 'Kickoff is the same afternoon as your bill. Every parking spot within two miles is taken, the bridges are jammed, and everyone who might come is in front of a television.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game ends', likely: 'The crowd comes late and a little loud.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'Doors at nine. The room filled right after the final whistle.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Most people do not come.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Nobody showed up until it was over, and by then it was late.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'PITTSBURGH_PARKWAY_BACKUP', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'There are crews working at the tunnel on the Parkway this week.',
      title: 'The Parkway is a parking lot',
      body: 'A wreck at the tunnel has the Parkway backed up for miles on the night of your show. The headliner and half the people from out of town are stuck in it.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to cross the tunnel.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones from the suburbs stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together. They\'ll remember that.' }
      ] },

    { id: 'PITTSBURGH_FISH_FRY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'holiday', months: [3] },
      telegraph: 'It is Lent, and the church and club halls are running Friday fish fries.',
      title: 'The fish fry has the hall',
      body: 'A fish fry is running upstairs at the hall you booked, and the line goes out the door past load-in. Nobody can park, and the volunteers want the stage cleared by eight.',
      options: [
        { id: 'WAIT', label: 'Wait it out and start late', likely: 'The crowd gets in after the line clears.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last plate went out at eight. Doors at nine, and the room smelled like fish.' },
        { id: 'SHARE', label: 'Split the door with the volunteers', likely: 'Costs thirty dollars. They help carry gear.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'REGULARS', pct: .02 }],
          result: 'The volunteers cleared a corner and sold you plates at cost.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'PITTSBURGH_BASEMENT_FLOODS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [6, 7, 8, 9, 10] },
      telegraph: 'The remnants of a tropical system are headed up the mountains.',
      title: 'The river town is flooding',
      body: 'A tropical remnant has dropped a foot of rain in the ravines. The low basements by the river are going under and the hills are sliding.',
      options: [
        { id: 'MOVE', label: 'Move it a day, once the water goes down', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' },
        { id: 'HILL', label: 'Move it to a house on high ground', likely: 'Smaller and louder, with a wall of neighbors on every side.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A rowhouse on the hill took the whole bill, and the floor was packed.' },
        { id: 'SANDBAG', label: 'Sandbag the door and play on', likely: 'Costs forty dollars. The crowd stays home.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The water stayed on the street. The room was half full and wet to the ankle.' }
      ] }
  ]
});
