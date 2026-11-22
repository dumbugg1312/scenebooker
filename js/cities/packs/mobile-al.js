SB.Cities.register('mobile-al', {
  v: 1,
  slug: 'mobile-al',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of south alabama', 'south alabama', 'spring hill college', 'press-register', 'press register', 'lagniappe', 'wkrg', 'wala', 'wpmi', 'weiq',
           'wave transit', 'amtrak', 'airbus', 'george wallace', 'wallace tunnel', 'jubilee parkway', 'greater gulf state fair', 'gulf state fair', 'senior bowl',
           'azalea trail run', 'bayfest', 'ten sixty five', 'joe cain day', 'joe cain', 'moon pie', 'moon pies', 'waffle house', 'poarch creek', 'mobile bay area',
           'the causeway annex', 'three mile hall', 'oakleigh carport', 'the azalea room', 'dog river lodge', 'bayway social club', 'cochrane warehouse',
           'the live oak porch', 'tillmans corner hall', 'government street basement', 'lundi gras lounge', 'the delta shed',
           'alabama contemporary art center', 'downtown mobile alliance', 'mobile area mardi gras association', 'hancock whitney stadium', 'mynbc15', 'nbc 15',
           'yelp', 'mobile police department'],
  /* The dossier's own invented venue names are in banned: they are research, not content, and unchecked. WALA, WKRG and the other call letters are written
     whole. 'Lagniappe' is the weekly paper's name and is not used anywhere else. */
  blocklist: ['lagniappe*', 'press register*', 'bayfest*', 'airbus*', 'waffle house*', 'moon pie*', 'wave transit*'],

  blurb: ['Alabama\'s port at the head of the bay. Everybody on the bill is somebody you know, and the room might be gone by spring.',
          'Few outside bands come, so locals build the bill themselves. The Gulf Coast network runs through here, and the history sits in people\'s garages.'],
  hard: 'Rooms close and move, few outside bands come, so you build the bill.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Mobile' },
    { id: 'saraland', kind: 'FEEDER', name: 'Saraland', minutes: 15, bearing: 350, note: 'A bedroom town up I-65. Kids with garages, no scene of its own.' },
    { id: 'theodore', kind: 'FEEDER', name: 'Theodore and Tillmans Corner', minutes: 20, bearing: 200, note: 'Industrial and suburban down the Dauphin Island Parkway. Sheds and garages.' },
    { id: 'daphne', kind: 'FEEDER', name: 'Daphne and Spanish Fort', state: 'AL', minutes: 25, bearing: 100, beyond: 'bayway',
      note: 'Across the bay, the affluent side. A few high-school bands; the kids drive over.' },
    { id: 'grand-bay', kind: 'FEEDER', name: 'Grand Bay', minutes: 25, bearing: 230, note: 'The first exit off I-10 from Mississippi. Farm and suburb.' },
    { id: 'fairhope', kind: 'FEEDER', name: 'Fairhope', minutes: 35, bearing: 115, beyond: 'bayway',
      note: 'An old art colony turned boutique resort, with a small arts scene of its own. Kids come to Mobile for louder shows.' },
    { id: 'citronelle', kind: 'FEEDER', name: 'Citronelle and Satsuma', minutes: 30, bearing: 340, note: 'Piney woods and oil-field country. No scene, plenty of land for a generator show.' },
    { id: 'bay-minette', kind: 'FEEDER', name: 'Bay Minette', minutes: 40, bearing: 60, note: 'The Baldwin County seat. A small town.' },
    { id: 'bayou-la-batre', kind: 'FEEDER', name: 'Bayou La Batre', minutes: 40, bearing: 210, note: 'A seafood and boatbuilding village. A few kids carpool.' },
    { id: 'pascagoula', kind: 'FEEDER', name: 'Pascagoula and Moss Point', state: 'MS', minutes: 40, bearing: 240, note: 'A shipyard and refinery town just over the line, with some small shows of its own.' },
    { id: 'dauphin-island', kind: 'FEEDER', name: 'Dauphin Island', minutes: 55, bearing: 190, season: { months: [5, 6, 7, 8], mul: 1.4 }, note: 'A barrier island at the end of the road. Summer people.' },
    { id: 'foley', kind: 'FEEDER', name: 'Foley', minutes: 55, bearing: 130, beyond: 'bayway', note: 'On the road to the beach.' },
    { id: 'atmore', kind: 'FEEDER', name: 'Atmore', minutes: 60, bearing: 55, note: 'Farm, timber and a casino. Not much for teenagers.' },
    { id: 'gulf-shores', kind: 'FEEDER', name: 'Gulf Shores and Orange Beach', minutes: 70, bearing: 145, beyond: 'bayway',
      season: { months: [5, 6, 7, 8], mul: 1.5 }, note: 'Beach-town service workers, busy in summer. Bands pass through.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', state: 'FL', minutes: 60, bearing: 105, slug: 'pensacola', beyond: 'bayway',
      note: 'The other bay-and-Navy town, an hour east on I-10. Each thinks the other is the sleepy one.' },
    { id: 'gulfport', kind: 'PEER', name: 'Gulfport and Biloxi', state: 'MS', minutes: 65, bearing: 250, slug: 'gulfport-ms',
      note: 'A casino-and-beach pair an hour west. They see Mobile as the bigger town with a real downtown.' },
    { id: 'hattiesburg', kind: 'PEER', name: 'Hattiesburg', state: 'MS', minutes: 105, bearing: 300, scene: 350, note: 'The college-town cousin up US 98.' },
    { id: 'montgomery', kind: 'PEER', name: 'Montgomery', state: 'AL', minutes: 165, bearing: 40, slug: 'montgomery-al', note: 'The capital, up I-65. An occasional trade.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'bayway', name: 'the tunnel and the Bayway', p: .03 }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Lower Dauphin', route: 'downtown', note: 'Bars along Dauphin and Conti, brick shells with apartments above, and the Carnival parade routes. Dead on a weekday morning.' },
    { id: 'midtown', name: 'Midtown', route: 'old-side', note: 'Oakleigh, Ashland Place and the old Government Street blocks: big wood houses with porches and carports, organized neighbors.' },
    { id: 'spring-hill', name: 'Spring Hill and the university side', route: 'campus', note: 'Old Shell Road and the hill: students, hospital workers and cheap apartments. Empties in summer.' },
    { id: 'west-mobile', name: 'West Mobile', route: 'campus', note: 'Airport Boulevard and Cottage Hill: strip malls, subdivisions, church gyms and the rare unit in an industrial park.' },
    { id: 'toulminville', name: 'Toulminville and Maysville', route: 'work-side', note: 'Working-class neighborhoods along the river and Three Mile Creek, with a church and music life of their own. Outsiders pass through.' },
    { id: 'prichard', name: 'Prichard and Chickasaw', route: 'work-side', note: 'North of the city line where I-65 and I-165 meet. The cheapest rent in the county, and a town that has been ignored for decades.' },
    { id: 'theodore', name: 'Theodore and Tillmans Corner', route: 'work-side', note: 'Warehouses, trailer parks and subdivisions down the Dauphin Island Parkway. Sheds and garages.' }
  ],

  rooms: [
    { id: 'midtown-carport', kind: 'HOUSE', hood: 'midtown', cap: 40, curfew: 1320, pressure: 55, start: true,
      note: 'A porch and carport on an old wood-frame block. The neighbors are organized and the ten o\'clock line is the clock.' },
    { id: 'toulminville-yard', kind: 'HOUSE', hood: 'toulminville', cap: 50, curfew: 1350,
      note: 'A backyard on a working-class block. The risk is outsiders drawing attention to it.' },
    { id: 'theodore-shed', kind: 'HOUSE', hood: 'theodore', cap: 60, curfew: 1380, pressure: 35,
      note: 'A shed and a garage on a big lot down the parkway. Few neighbors to call, but everybody has to drive.' },
    { id: 'prichard-unit', kind: 'DIY', hood: 'prichard', cap: 80, curfew: 1380, pressure: 60, needs: ['VOUCH'],
      note: 'A storefront unit with the cheapest rent in the county. A failed fire inspection or a sale of the building ends it.' },
    { id: 'church-gym', kind: 'HALL', hood: 'west-mobile', cap: 120, curfew: 1320, ac: true, owner: 'CHURCH_CONTACT', pressure: 45,
      note: 'A church gym rented by the night. Strict on language and curfew, with a loud air conditioner.' },
    { id: 'main-bar', kind: 'BAR', hood: 'downtown', cap: 250, ages: ['A21'], curfew: 1500, ac: true, standing: [50, 65, 65],
      note: 'The all-purpose music room: rock, punk, metal and comedy nearly every night. It has closed once and moved a few blocks.' },
    { id: 'small-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A21'], curfew: 1500, ac: true, pressure: 55,
      note: 'A small bar stage on the strip. One of its neighbors went dark one spring and stayed that way.' },
    { id: 'music-hall', kind: 'CLUB', hood: 'downtown', cap: 350, ages: ['A18', 'A21'], curfew: 1440, ac: true,
      note: 'A downtown music hall. Some nights are 18-plus, some are not, and you find out when you ask.' },
    { id: 'daytime-lawn', kind: 'OUTDOOR', hood: 'spring-hill', cap: 150, curfew: 1080,
      note: 'A county lawn that has hosted free daytime all-ages bills. The afternoon storm is the threat.' },
    { id: 'arena', kind: 'BIG', hood: 'west-mobile', cap: 1500, ages: ['ALL'], curfew: 1380, ac: true,
      note: 'The arena-size hall for touring acts. It never books a local band.' }
  ],

  contacts: ['pensacola', 'gulfport-ms', 'daphne-al', 'montgomery-al'],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false } },

  calendar: [
    { id: 'carnival-jan', label: 'Mardi Gras parade weekend', tag: 'parade', month: 1, weeks: [4, 5], dows: [4, 5, 6], can: [.88, .82, .80], hoods: ['downtown', 'midtown'], elsewhere: [.97, .94, .94] },
    { id: 'carnival', label: 'Mardi Gras parade weekend', tag: 'parade', month: 2, weeks: [1, 3], dows: [4, 5, 6], can: [.78, .72, .68], hoods: ['downtown', 'midtown'], elsewhere: [.95, .90, .90] },
    { id: 'fair', label: 'the fair', tag: 'fair', month: 10, week: 5, dows: [3, 4, 5, 6], can: [.90, .95, .97] },
    { id: 'fair-nov', label: 'the fair', tag: 'fair', month: 11, week: 1, dows: [3, 4, 5, 6], can: [.88, .93, .95] },
    { id: 'football-sep', label: 'high school football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'high school football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80, pop: 1100000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2100000 }
  ],
  roads: ['I-10', 'I-65', 'I-165', 'US 98', 'US 90', 'US 43'],

  words: {
    street: ['Dauphin Street', 'Conti Street', 'Government Street', 'Dauphin Way', 'Old Shell Road', 'Spring Hill Avenue', 'Airport Boulevard', 'Cottage Hill',
             'Grelot Road', 'Schillinger Road', 'Dauphin Island Parkway', 'Rangeline'],
    water: ['Mobile Bay', 'the Mobile River', 'Dog River', 'Three Mile Creek', 'the delta', 'the Bayway'],
    hood: ['Midtown', 'Oakleigh', 'Spring Hill', 'Toulminville', 'Maysville', 'Prichard', 'Chickasaw', 'Theodore', 'Tillmans Corner', 'Lower Dauphin'],
    thing: ['live oak', 'azalea', 'oyster shell', 'shrimp boat', 'king cake', 'porch', 'carport', 'bead', 'po-boy', 'jubilee', 'garage', 'flyer', 'zine'],
    weather: ['afternoon thunderstorm', 'humidity', 'storm track', 'hurricane cone']
  },

  events: [
    { id: 'MOBILE_AL_ROOM_CLOSES', when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 60, bind: ['show', 'room'],
      if: { daysOut: [1, 7], roomKind: ['BAR', 'CLUB'], chance: .2 },
      telegraph: 'There is talk that the room downtown is on its last month.',
      title: 'The room is closing',
      body: '{room} just told everyone it is done, with no reason given. Your show there is {dow}. Rooms here close and come back at a new address a year later.',
      options: [
        { id: 'HALL', label: 'Move it to a borrowed hall', likely: 'A rental fee, and a crowd that knows every band anyway.',
          effects: [{ op: 'MOVE_SHOW', toKind: 'HALL', dayShift: 0, respect: true }, { op: 'MONEY', amount: -40 }],
          result: 'A hall took the night. Everyone in the room knew the people on the bill.' },
        { id: 'FAREWELL', label: 'Make it the farewell show', likely: 'A line out the door, and people sitting on the floor.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.25 }, { op: 'REGULARS', pct: .02 }, { op: 'ROOM_PRESSURE', d: 10 }],
          result: 'The line ran down the block. People sat on the floor for the last set.' },
        { id: 'CANCEL', label: 'Cancel', likely: 'People understand.',
          effects: [{ op: 'CANCEL_SHOW', why: 'RESPECTED' }],
          result: 'Nobody blamed you. The bands found another floor.' }
      ] },

    { id: 'MOBILE_AL_BAYWAY_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'There is overnight work scheduled on the tunnel this week.',
      title: 'The tunnel and the Bayway are backed up',
      body: 'A closure under the river and a wreck on the Bayway cut Mobile off from the Eastern Shore the night of your show. The kids from across the bay have a long way around.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can go around', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from across the bay.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The traffic never cleared. The Eastern Shore stayed home.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads went the long way around the bay. They\'ll remember that.' }
      ] },

    { id: 'MOBILE_AL_FAIR_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'fair' },
      telegraph: 'The fair is on, with the rodeo the closing weekend, and the kids are already planning around it.',
      title: 'The fair takes the kids',
      body: 'The fair has pulled every kid in West Mobile out to the fairgrounds, and your porch show in Midtown is the same Saturday.',
      options: [
        { id: 'LATE', label: 'Push doors back until the fair lets out', likely: 'The ones who still want a night come late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. They came in smelling of funnel cake and glad of somewhere to sit.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A small crowd. Everyone knows everyone on the bill.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The fair had the casual crowd. The room was small and the bands knew every face.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] }
  ]
});
