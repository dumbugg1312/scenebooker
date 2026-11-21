SB.Cities.register('austin', {
  v: 1,
  slug: 'austin',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of texas', 'ut austin', 'forty acres', 'austin community college', 'st. edward\'s', 'huston-tillotson',
           'texas state university', 'texas a&m', 'baylor', 'sxsw', 'south by southwest', 'acl', 'austin city limits', 'formula 1', 'us grand prix',
           'fort hood', 'fort cavazos', 'kut', 'kutx', 'kvrx', 'koop', 'texas observer', 'lone star', 'shiner', 'topo chico', 'big red', 'dr pepper',
           'tito\'s', 'capmetro', 'camp mabry', 'barton springs', 'tabc', 'tesla', 'oracle', 'live music capital of the world', 'keep austin weird',
           'vfw', 'american legion', 'elks', 'live oak annex', 'caliche hall', 'the pecan shed', 'bluebonnet basement', 'montopolis muffler room',
           'the cedar fever room', 'greenbelt garage', 'bouldin bungalow social', 'ice house annex', 'rundberg roller rink', 'eastside spillway',
           'mockingbird lot', 'lamar laundromat back room', 'dove springs dance hall', 'mesquite tool shed'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['sxsw*', 'south by southwest*', 'austin city limits*', 'kvrx*', 'kutx*', 'texas observer*', 'lone star*', 'topo chico*'],

  blurb: ['A hot, sprawling boom town famous for music, where kids book their own yard and porch shows because the old all-ages rooms are gone.',
          'House collectives mix hardcore and screamo, the metal rooms got sold out from under them, and almost nothing all ages stays open.'],
  hard: 'Fee-free all-ages rooms are scarce, and clubs keep getting sold for the land.',
  region: 'the Texas triangle',
  houseType: 'GARAGE',
  tilt: [
    { fan: 'hardcore', band: 'emo', d: .08, reason: 'The house collectives put hardcore and screamo on the same bill.' }
  ],
  whereGo: [
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Austin' },
    { id: 'round-rock', kind: 'FEEDER', name: 'Round Rock', minutes: 25, bearing: 10, beyond: 'i35-crawl',
      note: 'A big suburb of malls and corporate campuses. Garage bands and parking lots; most of the kids come to Austin.' },
    { id: 'georgetown', kind: 'FEEDER', name: 'Georgetown', minutes: 35, bearing: 5, beyond: 'i35-crawl',
      note: 'A private-college town around an old square, with a small scene tied to the college and the high schools.' },
    { id: 'cedar-park', kind: 'FEEDER', name: 'Cedar Park and Leander', minutes: 35, bearing: 325,
      note: 'Fast-growing commuter suburbs, football-heavy, with garage bands and kids who all end up in Austin.' },
    { id: 'dripping-springs', kind: 'FEEDER', name: 'Dripping Springs', minutes: 40, bearing: 260,
      note: 'Rich Hill Country wedding and distillery country with nothing for teenagers. They drive in for anything loud.' },
    { id: 'bastrop', kind: 'FEEDER', name: 'Bastrop', minutes: 40, bearing: 100,
      note: 'A pine-woods town with a wildfire memory and a small garage-rock crowd of old-timers and commuters.' },
    { id: 'manor', kind: 'FEEDER', name: 'Taylor and Manor', minutes: 35, bearing: 60,
      note: 'Farm and railroad towns swallowed by sprawl. Cheap rent and warehouse space on the far east edge, and a small arts revival.' },
    { id: 'san-marcos', kind: 'FEEDER', name: 'San Marcos', minutes: 40, bearing: 205, beyond: 'i35-crawl',
      note: 'A college town on a river with a punk scene of its own. Students move both ways; the obvious sister.' },
    { id: 'lockhart', kind: 'FEEDER', name: 'Lockhart', minutes: 45, bearing: 160,
      note: 'A county seat and barbecue town. Kids with little to do come in for the weekend.' },
    { id: 'new-braunfels', kind: 'FEEDER', name: 'New Braunfels and Seguin', minutes: 60, bearing: 210, beyond: 'i35-crawl',
      note: 'German-heritage river towns growing toward San Antonio. Kids drive up for a bigger bill.' },
    { id: 'san-antonio', kind: 'PEER', name: 'San Antonio', slug: 'san-antonio', minutes: 85, bearing: 215, scene: 7000,
      note: 'The big sibling, with a Latino-majority punk tradition and a chip on its shoulder. Bands go both ways, constantly.' },
    { id: 'killeen', kind: 'PEER', name: 'Killeen', minutes: 75, bearing: 355, slug: 'killeen-tx',
      note: 'An army town with a hardcore and metal streak and a huge transient population.' },
    { id: 'waco', kind: 'PEER', name: 'Waco', minutes: 105, bearing: 15, slug: 'waco-tx',
      note: 'A religious university city with a small, long-lived DIY. The kids who make this drive are serious.' },
    { id: 'college-station', kind: 'PEER', name: 'College Station and Bryan', minutes: 110, bearing: 70, slug: 'college-station-tx',
      note: 'A big military-culture campus and an older scene on the Bryan side. Traffic for shows runs both ways.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'i35-crawl', name: 'I-35 through town', p: .03 }
  ],

  hoods: [
    { id: 'red-river', name: 'Red River', route: 'downtown', note: 'The old club strip on the downtown east edge. Bars with stages and legendary nights, now being priced out and redeveloped; ticketed shows, not DIY.' },
    { id: 'the-drag', name: 'the Drag and Hyde Park', route: 'campus', note: 'The campus strip and the bungalows north of it: bookstores, record and thrift shops, porches. Student rents are high.' },
    { id: 'east-austin', name: 'East Austin', route: 'old-side', note: 'The old eastside of wooden bungalows and big yards. It used to hold every house and warehouse; now it is condos and breweries, and the heart of the Latino punk scene.' },
    { id: 'southeast', name: 'Montopolis and Riverside', route: 'work-side', note: 'Apartments, mobile-home lots and warehouses along the airport road. Cheap, loud and forgotten, but heating up.' },
    { id: 'south-austin', name: 'South Austin', route: 'old-side', note: 'South Congress, Bouldin and Travis Heights: once funky bungalows, now boutiques. A few patio bars and yards survive.' },
    { id: 'far-south', name: 'Slaughter Lane and Oak Hill', route: 'campus', note: 'Strip-mall sprawl where many working punks now live because of rent. Garages and apartment-complex shows.' },
    { id: 'north-austin', name: 'Rundberg and North Lamar', route: 'work-side', note: 'Working-class and immigrant strip-center blocks with cheap rentable rooms and practice units. Ignored, for now.' },
    { id: 'northeast', name: 'Springdale and Windsor Park', route: 'work-side', note: 'Older cheap housing and industrial buildings by the old airport. Artist warehouses last a few years and then get redeveloped.' }
  ],

  rooms: [
    { id: 'east-yard-house', kind: 'HOUSE', hood: 'east-austin', cap: 50, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: true, sketch: 25, standing: [70, 60, 45],
      pressure: 55, start: true, note: 'A wooden bungalow with a porch and a big shady yard. There is no basement, so the show is wherever the neighbors can hear it.' },
    { id: 'south-garage', kind: 'HOUSE', hood: 'far-south', cap: 40, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 55, 45], pressure: 45,
      note: 'A garage in the sprawl with the door open and a row of fans. A sweat lodge from May to October.' },
    { id: 'drag-bungalow', kind: 'HOUSE', hood: 'the-drag', cap: 45, hostCut: 0, pa: .3, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [70, 55, 40], pressure: 55,
      note: 'A student bungalow near campus. Living room shows, a landlord with a clause about them, and a new neighbor every year.' },
    { id: 'east-backyard', kind: 'OUTDOOR', hood: 'east-austin', cap: 90, rent: 10, pa: .4, curfew: 1320, sketch: 30, standing: [60, 55, 40],
      note: 'A big yard under live oaks with a trailer for a stage. After sunset only, and the condo next door is new.' },
    { id: 'rec-hall', kind: 'HALL', hood: 'southeast', cap: 130, rent: 120, deposit: 50, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', note: 'A rented community hall. The manager shuts it down the minute she suspects a punk crowd.' },
    { id: 'strip-center-room', kind: 'DIY', hood: 'north-austin', cap: 80, rent: 70, deposit: 0, pa: .5, curfew: 1380, ac: true, sketch: 35, standing: [55, 60, 45], pressure: 55,
      needs: ['VOUCH'], note: 'A rented room in a strip center between a tax office and a laundromat. Cheap, and nobody calls it in until the code officer does.' },
    { id: 'warehouse-bay', kind: 'DIY', hood: 'northeast', cap: 140, rent: 90, deposit: 0, pa: .6, curfew: 1440, ac: false, sketch: 45, standing: [55, 60, 45], pressure: 60,
      needs: ['VOUCH'], note: 'An artist-rented warehouse bay. A few good years, then the fire marshal or the developer.' },
    { id: 'bookstore', kind: 'SHOP', hood: 'the-drag', cap: 60, pa: .4, curfew: 1260, ac: true, sketch: 5, standing: [75, 70, 75], following: .3,
      note: 'The bookstore by the campus, a regular home for all-ages bills. Afternoons and early evenings, donations only.' },
    { id: 'skate-shop', kind: 'SHOP', hood: 'south-austin', cap: 45, pa: .4, curfew: 1200, ac: true, sketch: 10, standing: [70, 65, 70], following: .2,
      note: 'A skate shop with a ramp and a PA. Daytime shows and a friendly owner.' },
    { id: 'patio-bar', kind: 'BAR', hood: 'south-austin', cap: 120, soundFee: 50, pa: .7, ages: ['ALL', 'A21'], matinee: true, curfew: 1500, ac: false, outdoor: true, following: .3, sketch: 15,
      standing: [45, 65, 70], note: 'A bar with a patio stage. It needs the outdoor music permit and one angry neighbor can end it.' },
    { id: 'river-bar', kind: 'BAR', hood: 'red-river', cap: 180, soundFee: 80, pa: .8, ages: ['A18', 'A21'], curfew: 1560, ac: true, following: .4, sketch: 10,
      standing: [45, 65, 70], note: 'A strip bar with a stage and wristbands. Kids under 18 get turned at the door.' },
    { id: 'club', kind: 'CLUB', hood: 'red-river', cap: 350, houseCosts: 200, split: .8, pa: .9, ages: ['A21', 'A18'], curfew: 1560, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The legendary old club room. Wants six weeks and a name, and the rent keeps rising.' }
  ],

  contacts: ['killeen-tx', 'waco-tx', 'college-station-tx'],

  calendar: [
    { id: 'spring-conference', label: 'the big spring music week', tag: 'festival', month: 3, week: 2, dows: [2, 3, 4, 5, 6], can: [.70, .65, .75], hoods: ['red-river', 'the-drag'], elsewhere: [.88, .85, .90] },
    { id: 'fall-festival', label: 'the big October park festival', tag: 'festival', month: 10, weeks: [1, 2], dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['south-austin'], elsewhere: [.92, .90, .92] },
    { id: 'race-weekend', label: 'race weekend', tag: 'race', month: 10, week: 4, dows: [4, 5, 6], can: [.90, .88, .90], hoods: ['southeast', 'east-austin'], elsewhere: [.96, .94, .94] },
    { id: 'football-sep', label: 'home football Saturday', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.85, .95, .95], hoods: ['the-drag', 'red-river'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football Saturday', tag: 'game', month: 10, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['the-drag', 'red-river'], elsewhere: [.95, 1, 1] },
    { id: 'football-nov', label: 'home football Saturday', tag: 'game', month: 11, weeks: [1, 4], dows: [5], can: [.85, .95, .95], hoods: ['the-drag', 'red-river'], elsewhere: [.95, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1], hoods: ['red-river'], elsewhere: [1, 1, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49, pop: 2600000 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7300000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80, pop: 7900000 }
  ],
  roads: ['I-35', 'MoPac', 'US 183', 'US 290', 'SH 71', 'SH 130'],

  words: {
    street: ['Red River Street', 'Guadalupe Street', 'East Cesar Chavez', 'South Congress', 'South Lamar', 'Riverside Drive', 'Rundberg Lane', 'Springdale Road', 'Slaughter Lane', 'Ben White'],
    water: ['Lady Bird Lake', 'the Colorado', 'Town Lake', 'Shoal Creek', 'Boggy Creek', 'the Greenbelt'],
    hood: ['Hyde Park', 'East Austin', 'Montopolis', 'Dove Springs', 'Bouldin Creek', 'Travis Heights', 'Crestview', 'Windsor Park', 'Govalle', 'Cherrywood', 'St. Elmo'],
    thing: ['bungalow', 'live oak', 'breakfast taco', 'queso', 'kolache', 'taco truck', 'cedar fever', 'generator', 'porch', 'mesquite', 'trailer', 'tallboy', 'yard fest', 'box fan', 'tape label'],
    weather: ['triple digits', 'flash flood', 'ice storm', 'cedar pollen', 'heat advisory'],
    surnames: ['Garcia', 'Hernandez', 'Martinez', 'Rodriguez', 'Nguyen', 'Mueller', 'Schmidt', 'Johnson']
  },

  events: [
    { id: 'AUSTIN_I35_CRAWL', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'A crash on the interstate backed up traffic for hours this week.',
      title: 'The interstate is a parking lot',
      body: 'A wreck on I-35 has traffic stopped for miles. The bands and kids coming from the north and from San Marcos are stuck in their cars.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people who have to use the highway.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The backup never cleared. The ones out of town stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads took the back roads together. They will remember that.' }
      ] },

    { id: 'AUSTIN_SPRING_WEEK', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'festival' },
      telegraph: 'The big spring music week swallows downtown on Wednesday.',
      title: 'A thousand free shows',
      body: 'The music conference has every band in the country in town, and a thousand free day parties against your one. The fire marshal is out looking for unpermitted rooms, and your locals are all at somebody else\'s show.',
      options: [
        { id: 'TOURISTS', label: 'Book the out-of-town bands passing through', likely: 'Thinner local crowd, but you are the real thing.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'REGULARS', pct: .02 }],
          result: 'The strangers found you by word of mouth. The locals never showed.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'Most of the town goes elsewhere.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .65 }],
          result: 'Every street was full and your room was not.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'AUSTIN_TRIPLE_DIGITS', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'HEAT', months: [6, 7, 8, 9] },
      telegraph: 'The forecast says triple digits all week.',
      title: 'The garage is an oven',
      body: 'It is a hundred and four in the shade and the garage has no air. The fans only push the heat around, and the band wants to know if anyone will last through the second set.',
      options: [
        { id: 'LATE', label: 'Start after nine, when the sun is down', likely: 'The ones who want to come do. Late for the neighbors.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The heat broke a little after ten. The crowd was damp but happy.' },
        { id: 'ICE', label: 'Buy ice and water for everybody', likely: 'Costs forty dollars. People stay.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'Cold water at the door. Nobody forgot it.' },
        { id: 'ACCEPT', label: 'Run it as it is', likely: 'Half the crowd goes home early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The people who stayed were soaked and the room emptied by ten.' }
      ] },

    { id: 'AUSTIN_ICE_STORM', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2] },
      telegraph: 'A hard freeze is coming and the grid is nervous.',
      title: 'The lights go out citywide',
      body: 'An ice storm has taken the power across the city. You have a carport, a gas generator and a few candles, and a band that drove in anyway.',
      options: [
        { id: 'GENERATOR', label: 'Run it off a generator in the carport', likely: 'Costs thirty dollars in gas. Loud, cold and memorable.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .6 }, { op: 'REGULARS', pct: .03 }],
          result: 'The generator droned and the band played in coats. The few who came will talk about it for years.' },
        { id: 'MOVE', label: 'Move it a day, once the power is back', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] }
  ]
});
