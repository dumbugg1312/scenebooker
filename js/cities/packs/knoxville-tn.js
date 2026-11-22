SB.Cities.register('knoxville-tn', {
  v: 1,
  slug: 'knoxville-tn',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of tennessee', 'tennessee volunteers', 'vols', 'tennessee valley authority', 'tva', 'oak ridge national laboratory', 'ornl', 'y-12',
           'pellissippi state', 'carson-newman', 'maryville college', 'lincoln memorial university', 'knox news', 'knoxville news sentinel', 'metro pulse',
           'knoxville mercury', 'wbir', 'wate', 'wvlt', 'wuot', 'neyland stadium', 'thompson-boling arena', 'tennessee theatre', 'dollywood', 'covenant health',
           'university of tennessee medical center', 'pilot company', 'clayton homes', 'scripps', 'bijou theatre', 'tennessee valley fair', 'rhythm n blooms',
           'big ears', 'great smoky mountains national park', 'market square', 'sundown in the city',
           'dogwood arts festival', 'dogwood arts', 'rossini festival', 'hola festival', 'regal celebration of lights', 'wivk christmas parade',
           'christmas in the city', 'sosoko pride', 'world\'s fair park', 'sunsphere', 'chilhowee park', 'krutch park', 'neyland', 'ut daily beacon',
           'daily beacon', 'inside of knoxville', 'blank news', 'knoxville opera', 'visit knoxville', 'knoxville hardcore fest', 'karns community fair',
           'kat shuttle', 'knoxville area transit'],
  blocklist: ['rhythm n blooms*', 'big ears festival*', 'knoxville mercury*', 'metro pulse*', 'bijou theatre*', 'tennessee theatre*'],

  blurb: ['A river valley under the mountains where a few old punk houses and a deli patio keep the all-ages tradition alive.',
          'Everyone knows the person on the door. Football Saturdays eat the calendar, and the students leave every May.'],
  hard: 'Football Saturdays, the summer exodus and few rooms that take kids.',
  region: 'the Mid-South',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Knoxville' },
    { id: 'maryville', kind: 'FEEDER', name: 'Maryville', minutes: 25, bearing: 195, note: 'A small college town. Kids drive in.' },
    { id: 'clinton', kind: 'FEEDER', name: 'Clinton and Powell', minutes: 25, bearing: 340, note: 'Northern bedroom suburbs.' },
    { id: 'oak-ridge', kind: 'FEEDER', name: 'Oak Ridge', minutes: 30, bearing: 295, note: 'A science town. Educated, nerdy, with metal and indie kids.' },
    { id: 'lenoir-city', kind: 'FEEDER', name: 'Lenoir City', minutes: 30, bearing: 235, note: 'A lake bedroom town.' },
    { id: 'sevierville', kind: 'FEEDER', name: 'Sevierville', minutes: 40, bearing: 105, note: 'A tourist strip. Few kids, some bands.' },
    { id: 'morristown', kind: 'FEEDER', name: 'Morristown', minutes: 50, bearing: 60, note: 'A small factory town. Rides in.' },
    { id: 'bean-station', kind: 'FEEDER', name: 'Bean Station', minutes: 50, bearing: 55, note: 'Rural. A tiny house-show spot has been mentioned.' },
    { id: 'johnson-city', kind: 'PEER', name: 'Johnson City', minutes: 100, bearing: 55, slug: 'johnson-city-tn', note: 'A college town with a small loud scene.' },
    { id: 'kingsport', kind: 'PEER', name: 'Kingsport', minutes: 105, bearing: 55, slug: 'kingsport-tn', note: 'Smaller, up the valley.' },
    { id: 'chattanooga', kind: 'PEER', name: 'Chattanooga', minutes: 110, bearing: 220, slug: 'chattanooga-tn', note: 'A similar size on a different river.' },
    { id: 'asheville', kind: 'PEER', name: 'Asheville', state: 'NC', minutes: 120, bearing: 130, slug: 'asheville-nc', note: 'Arty. A fill date over the mountains.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Bars, restaurants and a few listening rooms. The legitimate small-club zone.' },
    { id: 'old-city', name: 'the Old City', route: 'downtown', note: 'Brick warehouses turned bars by the rail line. Mid-sized rooms.' },
    { id: 'fort-sanders', name: 'Fort Sanders', route: 'campus', note: 'Student housing in old Victorians by the university. House shows.' },
    { id: 'fourth-gill', name: 'Fourth and Gill', route: 'old-side', note: 'Old streets north of downtown where a longtime punk house sits.' },
    { id: 'south-knoxville', name: 'South Knoxville', route: 'old-side', note: 'Across the river. An artist crowd and cheaper houses.' },
    { id: 'happy-holler', name: 'Happy Holler and Parkridge', route: 'old-side', note: 'Bungalows and coffeehouses north and east of downtown.' },
    { id: 'western', name: 'Western Avenue and Papermill', route: 'work-side', note: 'Warehouses, auto shops and cheaper rent.' },
    { id: 'east-knoxville', name: 'East Knoxville', route: 'work-side', note: 'Lower income, older housing stock.' },
    { id: 'west-knoxville', name: 'West Knoxville and Bearden', route: 'campus', note: 'Suburban. An early all-ages house venue was out here.' }
  ],

  rooms: [
    { id: 'gill-porch', kind: 'HOUSE', hood: 'fourth-gill', cap: 40, curfew: 1350, ac: false, outdoor: false, pressure: 55, start: true,
      note: 'A living room and porch in an old frame house on the hill streets, the kind of place the scene has used for decades.' },
    { id: 'sanders-basement', kind: 'HOUSE', hood: 'fort-sanders', cap: 60, curfew: 1320, ac: false, outdoor: false, pressure: 55,
      note: 'A rented student Victorian with a basement. It runs while the lease year does and the summer empties it.' },
    { id: 'river-yard', kind: 'HOUSE', hood: 'south-knoxville', cap: 50, curfew: 1350, ac: false, outdoor: true, pressure: 45,
      note: 'Yard and porch shows across the river. Rain moves it to the kitchen.' },
    { id: 'community-house', kind: 'HALL', hood: 'fourth-gill', cap: 49, curfew: 1320, ac: false, pressure: 55, standing: [70, 60, 55],
      note: 'A hundred-year-old house run as a neighborhood center, booked all week, so punk shows fight for dates and upkeep money.' },
    { id: 'karns-hall', kind: 'HALL', hood: 'west-knoxville', cap: 200, curfew: 1350, ac: false,
      note: 'A community youth center far out west that takes touring hardcore bills, and you need a car to reach it.' },
    { id: 'warehouse-room', kind: 'DIY', hood: 'western', cap: 80, ages: ['A18'], curfew: 1380, ac: false, outdoor: false,
      note: 'A warehouse room with a PA and a folding table for merch. The landlord and the fire marshal are the threat.' },
    { id: 'brick-club', kind: 'BAR', hood: 'old-city', cap: 150, ages: ['A18'], curfew: 1440, ac: true, standing: [55, 65, 65],
      note: 'A brick indie club that books local punk nights with eighteen-and-over entry. It lives on bar sales.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'downtown', cap: 120, curfew: 1500, ac: true, standing: [45, 60, 60],
      note: 'A bar with a back stage on the main strip. Game-day Saturdays eat the calendar.' },
    { id: 'touring-room', kind: 'CLUB', hood: 'old-city', cap: 300, ages: ['A18'], curfew: 1410, ac: true, standing: [40, 60, 60],
      note: 'A mid-size room for touring bills, where a local band gets a slot only by opening.' },
    { id: 'holler-room', kind: 'CLUB', hood: 'happy-holler', cap: 200, ages: ['ALL'], curfew: 1350, ac: true, seated: true, standing: [50, 65, 60],
      note: 'A cozy high-ceilinged room by a cafe, often seated, with all ages on most nights.' },
    { id: 'deli-patio', kind: 'SHOP', hood: 'downtown', cap: 60, curfew: 1080, ac: false, outdoor: true,
      note: 'A deli patio matinee, the only early-evening room in town.' },
    { id: 'theater-hall', kind: 'BIG', hood: 'downtown', cap: 1000, curfew: 1380, ac: true, standing: [35, 60, 55],
      note: 'A theater-sized room for the tours that stop here. A local band gets in only by winning a support slot.' }
  ],

  contacts: ['johnson-city-tn', 'kingsport-tn', 'chattanooga-tn', 'asheville-nc', 'nashville'],

  calendar: [
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.80, .90, .90], hoods: ['downtown', 'fort-sanders'], elsewhere: [.95, .97, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.80, .90, .90], hoods: ['downtown', 'fort-sanders'], elsewhere: [.95, .97, .97] },
    { id: 'street-fair', label: 'the spring street fair', tag: 'festival', month: 4, week: 3, dows: [5, 6], can: [.88, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'arts-fest', label: 'the spring arts festival', tag: 'festival', month: 4, week: 4, dows: [4, 5, 6], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 9, weeks: [2, 3], dows: [4, 5, 6], can: [.92, .90, .88], hoods: ['east-knoxville'], elsewhere: [1, 1, 1] },
    { id: 'latino-fest', label: 'the Latino festival', tag: 'festival', month: 10, week: 2, dows: [5, 6], can: [.90, .88, .85], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'lights', label: 'the lights celebration', tag: 'holiday', month: 11, week: 4, dows: [4], can: [.85, .85, .80], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'xmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, week: 1, dows: [4], can: [.85, .85, .80], hoods: ['downtown'], elsewhere: [1, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1440, weekend: 1440, inForce: false } },

  points: [
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2197416 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39, pop: 6400000 },
    { name: 'Charlotte', state: 'NC', lat: 35.23, lon: -80.84, pop: 2938830 },
    { name: 'Lexington', state: 'KY', lat: 38.04, lon: -84.46, pop: 535174 }
  ],
  roads: ['I-40', 'I-75', 'I-640', 'I-275', 'Kingston Pike', 'Chapman Highway'],

  words: {
    street: ['Gay Street', 'Cumberland Avenue', 'Kingston Pike', 'Chapman Highway', 'Central Avenue', 'Magnolia Avenue'],
    water: ['the Tennessee River', 'the Holston', 'the French Broad'],
    hood: ['Fort Sanders', 'Fourth and Gill', 'Happy Holler', 'Parkridge', 'Papermill', 'Bearden', 'Sequoyah Hills', 'South Knoxville'],
    thing: ['porch', 'orange', 'valley fog', 'deli patio', 'rail line', 'night shift', 'dogwood'],
    weather: ['ice storm', 'valley fog', 'leaf traffic']
  },

  events: [
    { id: 'KNOXVILLE_TN_YARD_RAIN', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 2], weather: 'RAIN', months: [4, 5, 6, 7, 8, 9, 10] },
      telegraph: 'Rain is coming in off the mountains on show night.',
      title: 'The yard show is a kitchen show',
      body: 'The porch show on the hill street is getting rained on. The roommates rented the house for the year and want to know what you plan to do about the kitchen.',
      options: [
        { id: 'INSIDE', label: 'Pack everyone into the kitchen and front room', likely: 'Loud, tight and a little damp.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .6 }, { op: 'REGULARS', pct: .02 }],
          result: 'Forty people in a kitchen. The neighbors will hear about this one.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The sky was clear and fewer people could come.' },
        { id: 'TARP', label: 'Hang a tarp and play on', likely: 'Costs thirty dollars. The crowd thins.',
          effects: [{ op: 'MONEY', amount: -30 }, { op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'The tarp sagged and dripped on the drummer. The room stayed half full.' }
      ] },

    { id: 'KNOXVILLE_TN_GAME_DAY_PORCH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'A home game is on Saturday and the hill streets are already lined with parked cars.',
      title: 'The football-day blockade',
      body: 'Game-day traffic has the street at Fourth and Gill packed solid and your load-in is two blocks away. A neighbor is already on the phone about the porch.',
      options: [
        { id: 'LATE', label: 'Push doors back until the traffic clears', likely: 'The crowd that wants a night out shows up, late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The street cleared and the porch filled.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed home. The regulars carried amps up the hill.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'KNOXVILLE_TN_PARADE_MATINEE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'parade' },
      telegraph: 'The parade is about to close Gay Street and every room downtown with it.',
      title: 'The street closes at six',
      body: 'The only room still open is the deli patio, and only for a matinee. Bands and fans have to be in and out before the roads shut.',
      options: [
        { id: 'MATINEE', label: 'Move the bill to the patio matinee', likely: 'Early, small and sunny.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'SHOP', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'Four bands before the roads closed. Everyone was home by dark.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The streets were open and fewer people could come.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Everyone walks in past the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Load-in was on foot and the door was slow.' }
      ] }

  ]
});
