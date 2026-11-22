SB.Cities.register('las-vegas', {
  v: 1,
  slug: 'las-vegas',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of nevada las vegas', 'unlv', 'runnin\' rebels', 'college of southern nevada', 'csn', 'nevada state', 'las vegas review-journal',
           'review-journal', 'las vegas sun', 'las vegas weekly', 'kvbc', 'ktnv', 'klas', 'knpr', 'kuna', 'kxnt', 'vegas golden knights', 'golden knights',
           'las vegas raiders', 'las vegas aces', 'las vegas aviators', 'nellis air force base', 'nellis', 'creech air force base', 'mgm resorts',
           'caesars entertainment', 'caesars palace', 'wynn', 'station casinos', 'venetian', 'clark county school district', 'life is beautiful',
           'electric daisy carnival', 'edc', 'punk rock bowling', 'punk rock museum', 'neon reverb', 'consumer electronics show', 'ces', 'national finals rodeo',
           'nfr', 'formula one', 'f1 las vegas grand prix', 'las vegas motor speedway', 'vegas strip', 'bellagio', 'luxor', 'sphere', 'neon museum',
           'fremont street experience', 'hoover dam', 'lake mead', 'red rock canyon', 'the bunkhouse', 'beauty bar', 'the usual place',
           'visit las vegas', 'lvcva', 'grammy', 'ticketmaster', 'bandsintown', 'area15', 'warped tour', 'vans warped tour', 'helldorado days',
           'when we were young', 'craig ranch park', 'first friday', 'clark county juvenile justice services'],
  /* "The casinos", "the big university", "the spring punk festival", "the fight weekend". "The Strip" never appears: locals say "the boulevard" or nothing. */
  blocklist: ['unlv*', 'review-journal*', 'golden knights*', 'punk rock bowling*', 'punk rock museum*', 'neon reverb*', 'bunkhouse saloon*', 'beauty bar*'],

  blurb: ['A desert city where punk plays boxing gyms, backyards and bar back rooms. Shift workers fill the floor after midnight, and nobody cares about the casinos.',
          'There is no permanent all-ages room, so promoters take odd spaces and real risks. A free all-ages festival downtown every Memorial Day weekend holds the calendar together.'],
  hard: 'No all-ages room, brutal heat, and a town that works nights.',
  region: 'the Mojave',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'San Diego', state: 'CA', lat: 32.72, lon: -117.16 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Las Vegas' },
    { id: 'north-las-vegas', kind: 'FEEDER', name: 'North Las Vegas', minutes: 15, bearing: 25, beyond: 'spaghetti-bowl', note: 'A working-class city with its own rules. Kids and bands.' },
    { id: 'henderson', kind: 'FEEDER', name: 'Henderson', minutes: 20, bearing: 140, scene: 120, note: 'A large suburb. Kids come in with cars; a small garage scene.',
      rooms: [{ id: 'henderson-hall', kind: 'HALL', hood: 'henderson', cap: 250, rent: 200, deposit: 75, curfew: 1380, ac: true, sketch: 15, standing: [55, 60, 65], owner: 'HALL_MANAGER',
               note: 'A warehouse-style hall just over the line, one of the few steady all-ages rooms. Twenty minutes from most of the kids.' }] },
    { id: 'boulder-city', kind: 'FEEDER', name: 'Boulder City', minutes: 30, bearing: 140, note: 'A small town. One or two bands.' },
    { id: 'indian-springs', kind: 'FEEDER', name: 'Indian Springs', minutes: 45, bearing: 320, note: 'Remote and tiny.' },
    { id: 'pahrump', kind: 'FEEDER', name: 'Pahrump', minutes: 60, bearing: 285, note: 'A desert town. Teenagers drive in.' },
    { id: 'moapa', kind: 'FEEDER', name: 'Moapa Valley and Overton', minutes: 60, bearing: 45, beyond: 'spaghetti-bowl', note: 'A small farm valley. Rare.' },
    { id: 'mesquite', kind: 'FEEDER', name: 'Mesquite', minutes: 80, bearing: 45, beyond: 'spaghetti-bowl', note: 'A small casino town on the interstate. Rare.' },
    { id: 'bullhead', kind: 'PEER', name: 'Bullhead City', state: 'AZ', minutes: 100, bearing: 175, note: 'A small river-town scene.' },
    { id: 'kingman', kind: 'PEER', name: 'Kingman', state: 'AZ', minutes: 100, bearing: 130, note: 'A tiny desert-town scene.' },
    { id: 'st-george', kind: 'PEER', name: 'St. George', state: 'UT', minutes: 120, bearing: 40, note: 'A small, conservative college-and-retiree scene.' }
  ],

  chokepoints: [{ id: 'spaghetti-bowl', name: 'the Spaghetti Bowl', p: .02 }],

  hoods: [
    { id: 'downtown', name: 'downtown and East Fremont', route: 'downtown', note: 'The old casino core and the walkable bar strip east of it. Most local music rooms have been here, and many have come and gone.' },
    { id: 'arts-district', name: 'the Arts District', route: 'old-side', note: 'Warehouse blocks south of downtown, now galleries, breweries and murals. The cheap units were pushed out.' },
    { id: 'westside', name: 'the Old Westside', route: 'old-side', note: 'A historic Black neighborhood west of downtown. Low income, few rooms.' },
    { id: 'chinatown', name: 'Spring Mountain Road', route: 'work-side', note: 'A long run of strip malls and restaurants west of the casinos. Cheap commercial units.' },
    { id: 'boulder-hwy', name: 'Boulder Highway', route: 'work-side', note: 'Cheap motels, shops and trailer parks on the way to Henderson. Rough rooms.' },
    { id: 'east-side', name: 'Sunrise Manor and the east side', route: 'work-side', note: 'Low-income stucco tracts at the desert edge. Backyards and desert shows.' },
    { id: 'north-lv', name: 'North Las Vegas', route: 'work-side', note: 'Industrial warehouses and tract houses, in a separate city with its own rules.' },
    { id: 'maryland', name: 'Maryland Parkway', route: 'campus', note: 'Rentals and dive bars by the university. One of the few all-ages-adjacent corridors.' },
    { id: 'summerlin', name: 'Summerlin and the west side', route: 'campus', note: 'Master-planned suburbs with big garages. Teen bands.' },
    { id: 'henderson', name: 'Henderson', route: 'town:henderson', note: 'A big suburb just over the line, with a few steady all-ages rooms and kids who drive in.' }
  ],

  rooms: [
    { id: 'east-garage', kind: 'HOUSE', hood: 'east-side', cap: 60, curfew: 1350, ac: false, sketch: 30, standing: [65, 60, 45], pressure: 55, start: true,
      note: 'A garage and backyard in a stucco tract at the desert edge. Promoters have moved away from house parties, so the hosts and the neighbors are the whole risk.' },
    { id: 'summerlin-garage', kind: 'HOUSE', hood: 'summerlin', cap: 40, curfew: 1320, ac: true, sketch: 15, standing: [65, 60, 50], pressure: 55,
      note: 'A two-car garage on a master-planned street. The neighbors work early shifts and the association has a phone.' },
    { id: 'boulder-bay', kind: 'DIY', hood: 'boulder-hwy', cap: 150, rent: 80, curfew: 1380, ac: false, sketch: 50, standing: [55, 60, 45], pressure: 60, needs: ['VOUCH'],
      note: 'A rented industrial unit off the highway. One-off bills, and it vanishes the day the landlord or the fire marshal finds out.' },
    { id: 'boxing-gym', kind: 'HALL', hood: 'east-side', cap: 200, rent: 100, deposit: 0, curfew: 1380, ac: true, sketch: 15, standing: [60, 60, 65], owner: 'HALL_MANAGER',
      note: 'A boxing gym with the ring still in the room and a regular Sunday night. It all depends on one owner\'s goodwill.' },
    { id: 'coffee-counter', kind: 'SHOP', hood: 'chinatown', cap: 80, curfew: 1320, ac: true, sketch: 10, standing: [70, 65, 75], following: .2,
      note: 'A coffee house that clears the tables for a hardcore bill. Over by ten, when the owner needs it back.' },
    { id: 'brewery-patio', kind: 'OUTDOOR', hood: 'arts-district', cap: 150, rent: 25, curfew: 1320, outdoor: true, sketch: 30, standing: [55, 55, 50], pressure: 50,
      note: 'A brewery patio in the Arts District. The heat, the rules about minors and the neighbors\' complaints are the limits.' },
    { id: 'fremont-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1560, ac: true, soundFee: 60, following: .3, sketch: 20, standing: [50, 65, 70],
      note: 'A bar with a back-room stage on East Fremont. The heavy-music bars here have closed one after another.' },
    { id: 'campus-bar', kind: 'BAR', hood: 'maryland', cap: 100, ages: ['A21'], curfew: 1500, ac: true, soundFee: 40, following: .3, sketch: 20, standing: [45, 65, 75], pressure: 50,
      note: 'A cheap bar by the university with punk bills and a 21-plus door. Nobody under age gets past it.' },
    { id: 'fremont-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1500, ac: true, following: .6, sketch: 15, standing: [45, 70, 70],
      owner: 'TALENT_BUYER', notice: 56, needs: ['FULL_BILL'],
      note: 'The main local club for touring punk, booked heavily by outside promoters. The rent and the redevelopment are closing in on it.' },
    { id: 'off-boulevard-hall', kind: 'BIG', hood: 'chinatown', cap: 2000, ages: ['ALL'], curfew: 1380, ac: true, following: .8, sketch: 5, standing: [40, 70, 70],
      owner: 'TALENT_BUYER', note: 'A corporate music room where the touring bands play. Not a place for a local first show.' },
    { id: 'events-center', kind: 'BIG', hood: 'downtown', cap: 1500, ages: ['ALL'], curfew: 1440, ac: true, following: .7, sketch: 5, standing: [40, 70, 70],
      owner: 'TALENT_BUYER', note: 'An events hall that touring emo and punk acts rent, once in a while.' }
  ],

  contacts: ['phoenix', 'salt-lake-city', 'los-angeles'],

  calendar: [
    { id: 'spring-punk-fest', label: 'the spring punk festival', tag: 'festival', month: 5, week: 4, dows: [4, 5, 6], can: [.85, .85, .88], hoods: ['downtown', 'arts-district'], elsewhere: [1.05, 1.05, 1.05] },
    { id: 'rodeo-week', label: 'the national rodeo', tag: 'festival', month: 12, weeks: [1, 2], dows: [3, 4, 5, 6], can: [.88, .90, .90] },
    { id: 'street-race', label: 'the street race weekend', tag: 'race', month: 11, week: 3, dows: [3, 4, 5], can: [.85, .85, .88], hoods: ['downtown', 'arts-district'], elsewhere: [.95, .95, .95] },
    { id: 'emo-fest', label: 'the emo and alt festival', tag: 'festival', month: 10, weeks: [3, 4], dows: [4, 5, 6], can: [.85, .85, .88] },
    { id: 'arts-night', label: 'the monthly arts-district night', tag: 'festival', month: 6, week: 1, dows: [4], can: [.92, .95, .95], hoods: ['arts-district', 'downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-fall', label: 'home football', tag: 'game', month: 10, weeks: [1, 2], dows: [4, 5], can: [.90, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, week: 5, dows: [4, 5, 6], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1440, inForce: true } },

  points: [
    { name: 'Baker', state: 'CA', lat: 35.27, lon: -116.07, pop: 700 },
    { name: 'Barstow', state: 'CA', lat: 34.90, lon: -117.02, pop: 25000 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 12800000 },
    { name: 'Kingman', state: 'AZ', lat: 35.19, lon: -114.05, pop: 32000 }
  ],
  roads: ['I-15', 'US 95', 'I-215', 'Boulder Highway', 'Charleston Boulevard', 'Flamingo Road'],

  words: {
    street: ['Fremont', 'Charleston Boulevard', 'Maryland Parkway', 'Sahara Avenue', 'Flamingo Road', 'Spring Mountain Road', 'Tropicana Avenue', 'Boulder Highway'],
    water: ['the wash', 'the Las Vegas Wash'],
    hood: ['East Fremont', 'the Arts District', 'Old Westside', 'Sunrise Manor', 'Summerlin', 'North Las Vegas', 'Boulder Highway'],
    thing: ['neon', 'swamp cooler', 'wash', 'shift', 'graveyard shift', 'motel sign', 'dirt road', 'boxing gym'],
    weather: ['heat warning', 'monsoon storm', 'flash flood']
  },

  events: [
    { id: 'LAS_VEGAS_GRAVEYARD_LOADIN', when: 'WEEK', tier: 'REAL', weight: 3, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'Half the band picked up extra graveyard shifts this week.',
      title: 'The band gets off at two',
      body: 'The drummer and the bass player are both on the graveyard shift, and the late bill is a Tuesday for them. Nobody will have an amp in the room before the doors.',
      options: [
        { id: 'LATE', label: 'Push the whole bill late and let them load in after the shift', likely: 'The room is full of people in work shirts. The neighbors are asleep.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }, { op: 'REGULARS', pct: .01 }],
          result: 'The doors opened at midnight. The crowd came off their shifts in vests and name tags.' },
        { id: 'SWAP', label: 'Swap them to the front and find a replacement headliner', likely: 'Costs an hour of phone calls.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'A last-minute swap. The headliner was a friend with an amp and a day off.' },
        { id: 'ACCEPT', label: 'Run it as planned and take what you get', likely: 'A rough, tired set.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'They played on no sleep. It was loud and loose and over by eleven.' }
      ] },

    { id: 'LAS_VEGAS_FIVE_FIFTEEN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 35, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'HEAT', months: [6, 7, 8, 9] },
      telegraph: 'The forecast says 115 all week.',
      title: 'It is 115 in the desert',
      body: 'The desert show off the dirt road is an oven, and the generator keeps cutting out. The wind is only pushing hot air around.',
      options: [
        { id: 'NIGHT', label: 'Start after dark, when the sun is down', likely: 'The ones who want to come do. A long wait in the heat.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'It cooled to a hundred by ten. The headlights lit the stage.' },
        { id: 'ICE', label: 'Buy ice and water for everybody', likely: 'Costs forty dollars. People stay.',
          effects: [{ op: 'MONEY', amount: -40 }, { op: 'REGULARS', pct: .02 }],
          result: 'Cases of cold water and electrolytes at the door. Nobody forgot it.' },
        { id: 'ACCEPT', label: 'Run it as it is', likely: 'Half the crowd goes home early.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'The ones who stayed were soaked and the generator died by eleven.' }
      ] },
    { id: 'LAS_VEGAS_GYM_CLASS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 50, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The gym owner texted that a youth boxing class got moved to your night.',
      title: 'The ring is busy',
      body: 'The gym owner booked a real boxing class on the same evening. The bands will have to load around the ring and the quiet hour is nowhere to be found.',
      options: [
        { id: 'AFTER', label: 'Push doors until the class is over', likely: 'Late, but the room is yours after.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last kid left at nine. The bands played in the empty ring\'s shadow.' },
        { id: 'SHARE', label: 'Run both at once', likely: 'Loud and strange. The owner will remember.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'REGULARS', pct: .01 }],
          result: 'Kids in gloves watched the first band. Somebody sparred to the second.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'LAS_VEGAS_ROAD_CLOSED', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'Concrete barriers have been going up along the boulevard all week.',
      title: 'The van is stuck behind the barriers',
      body: 'The street race has closed the roads around downtown. The touring van is sitting in traffic on the boulevard and the load-in has to cross on foot.',
      options: [
        { id: 'CARRY', label: 'Carry the gear in by hand', likely: 'Costs an hour and a lot of sweat.',
          effects: [{ op: 'HOURS', d: -1, when: 'TODAY' }, { op: 'SHOW_MOD', key: 'lateMin', v: 45 }],
          result: 'Eight people and a hand truck crossed three blocks of barricades. The set started late and loud.' },
        { id: 'LATE', label: 'Wait out the closures and start late', likely: 'The crowd trickles in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The road opened at ten. Everyone got in, tired and sunburned.' },
        { id: 'ACCEPT', label: 'Run what you can', likely: 'A short bill and a thin crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands made it. The rest watched the barriers from the van.' }
      ] }
  ]
});
