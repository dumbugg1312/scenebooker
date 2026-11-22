SB.Cities.register('santa-cruz-ca', {
  v: 1,
  slug: 'santa-cruz-ca',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['ucsc', 'uc santa cruz', 'university of california santa cruz', 'santa cruz beach boardwalk', 'giant dipper', 'pacific garden mall', 'loma prieta',
           'czu fire', 'czu lightning complex', 'santa cruz sentinel', 'sentinel', 'good times', 'santa cruz weekly', 'lookout santa cruz', 'city on a hill press',
           'kzsc', 'ksqd', 'kpig', 'ksco', 'surf city', 'huntington beach', 'mavericks', 'pumpkin festival', 'csu monterey bay', 'csumb', 'fort ord',
           'defense language institute', 'naval postgraduate school', 'monterey bay aquarium', 'steamer lane', 'santa cruz metro', 'amtrak', 'amtrak thruway',
           'highway 17 express', 'cal poly',
           'the fogline', 'slug hours', 'lower ocean garage co-op', 'the riverbank annex', 'hecker pass hall', 'the tidepool room', 'natural bridges carport',
           'boulder creek cabin', 'the fishhook social club', 'mission hill lodge', 'pleasure point backyard', 'soquel grange annex',
           'santa cruz civic auditorium', 'santa cruz veterans memorial building', 'wharf to wharf', 'capitola begonia festival', 'begonia festival', 'woodies on the wharf', 'hot rods at the beach', 'goodtimes.sc', 'metro santa cruz', 'metroactive', 'santa cruz local', '48 hills', 'kqed', 'kcsb', 'ucsb', 'west cliff drive', 'santa cruz wharf', 'capitola wharf', 'bandsintown', 'eventbrite', 'ticketweb'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['ucsc*', 'santa cruz sentinel*', 'santa cruz beach boardwalk*', 'kzsc*', 'czu*', 'city on a hill*', 'good times*'],

  blurb: ['Garage doors up, fog rolling in, skate kids and students packed in a yard. Friendly more than aggressive.',
          'Everyone loads out early because of the neighbors, and the crowd leaves with the quarter.'],
  hard: 'Rent is brutal, one mountain road in, and the crowd leaves with the quarter.',
  region: 'the Central Coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89 },
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.8, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Santa Cruz' },
    { id: 'capitola', kind: 'FEEDER', name: 'Capitola, Soquel and Aptos', minutes: 15, bearing: 110, note: 'Comfortable beach villages down the coast; no scene to speak of.' },
    { id: 'scotts-valley', kind: 'FEEDER', name: 'Scotts Valley', minutes: 15, bearing: 20, note: 'An affluent, older suburb up the hill road. Its teenagers come down to town.' },
    { id: 'davenport', kind: 'FEEDER', name: 'Davenport and Bonny Doon', minutes: 20, bearing: 320, note: 'Tiny coastal and mountain settlements; a handful of kids.' },
    { id: 'slv', kind: 'FEEDER', name: 'Felton, Ben Lomond and Boulder Creek', minutes: 30, bearing: 10, scene: 60, note: 'Redwood mountain towns with garage and cabin shows. A real source of bands, and fire country.',
      rooms: [{ id: 'redwood-cabin', kind: 'HOUSE', hood: 'slv-hood', cap: 70, curfew: 1380, outdoor: true, note: 'A cabin yard up the redwood roads. There is one way in, and fire or storm can close it.' }] },
    { id: 'watsonville', kind: 'FEEDER', name: 'Watsonville', minutes: 25, bearing: 130, note: 'A mostly Latino berry town with its own music life and a long Chicano punk community. A major source of crowds.' },
    { id: 'los-gatos', kind: 'FEEDER', name: 'Los Gatos', minutes: 35, bearing: 30, note: 'Rich, small and tidy; teens hop over the summit.' },
    { id: 'gilroy', kind: 'FEEDER', name: 'Gilroy', minutes: 45, bearing: 100, note: 'A garlic town turning into a Silicon Valley bedroom; some band activity.' },
    { id: 'marina', kind: 'FEEDER', name: 'Marina and Seaside', minutes: 50, bearing: 150, note: 'Former army-base towns around the bay, with a university and military families.' },
    { id: 'salinas', kind: 'PEER', name: 'Salinas', minutes: 55, bearing: 145, slug: 'salinas-ca', note: 'A much bigger farm city an hour away: a trade partner more than a feeder.' },
    { id: 'santa-rosa', kind: 'PEER', name: 'Santa Rosa', minutes: 150, bearing: 340, slug: 'santa-rosa-ca', note: 'Wine country north of the Bay; bands on the North Bay run reach both.' },
    { id: 'san-luis-obispo', kind: 'PEER', name: 'San Luis Obispo', minutes: 165, bearing: 155, slug: 'san-luis-obispo-ca', note: 'The nearest coast college-town peer; the two trade bands on the Bay to Los Angeles run.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Pacific Avenue', route: 'downtown', note: 'The main street, rebuilt after the big quake: street musicians, chains, bars and a visible homeless population.' },
    { id: 'beach-flats', name: 'Beach Flats and the beach strip', route: 'old-side', note: 'A dense, working-class, heavily Latino pocket of cottages and motels behind the amusement park. Noise gets called in as a public safety matter.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'Bungalows, student rentals and a light-industrial strip of warehouses, breweries and rehearsal spaces toward the cliffs.' },
    { id: 'seabright', name: 'Seabright and the near Eastside', route: 'old-side', note: 'A lived-in beach neighborhood by the harbor. Gentrified and expensive; house and garage shows, not venues.' },
    { id: 'live-oak', name: 'Live Oak and Pleasure Point', route: 'work-side', note: 'Surf culture mixed with family suburbia and strip roads. Garages and backyards.' },
    { id: 'campus-edge', name: 'the campus edge and Mission Street', route: 'campus', note: 'Student rentals around the university in the hills. Shows follow the quarter calendar.' },
    { id: 'harvey-west', name: 'Harvey West and the river flats', route: 'work-side', note: 'Warehouses and light industry near the river. The likeliest spot for practice rooms, and the most exposed to code enforcement and redevelopment.' },
    { id: 'slv-hood', name: 'Felton, Ben Lomond and Boulder Creek', route: 'town:slv', note: 'Redwood mountain towns up the valley road, with cabin and yard shows. One road in, and fire country.' }
  ],


  rooms: [
    { id: 'garage-westside', kind: 'HOUSE', hood: 'westside', cap: 60, curfew: 1320, outdoor: true, pressure: 55, start: true, note: 'A garage on the Westside with the door up and the fog coming in. One complaint can count as a third, because the fines follow the house.' },
    { id: 'pleasure-yard', kind: 'HOUSE', hood: 'live-oak', cap: 50, curfew: 1320, outdoor: true, note: 'A backyard by the surf streets with close neighbors on every fence. Winter rain ends the season.' },
    { id: 'seabright-bungalow', kind: 'HOUSE', hood: 'seabright', cap: 40, curfew: 1320, pressure: 55, note: 'A living room and a porch in a small bungalow. The new owners on this block complain fast.' },
    { id: 'student-rental', kind: 'HOUSE', hood: 'campus-edge', cap: 80, ages: ['A18'], curfew: 1350, pressure: 55, note: 'A packed student rental in the first weeks of the quarter, and empty by finals and all summer.' },
    { id: 'river-warehouse', kind: 'DIY', hood: 'harvey-west', cap: 120, curfew: 1350, pressure: 60, needs: ['VOUCH'], note: 'A rehearsal-unit warehouse by the river flats. The fire marshal and the redevelopers both know the address.' },
    { id: 'cafe-backroom', kind: 'SHOP', hood: 'downtown', cap: 40, curfew: 1200, note: 'A cafe back room on the main street, the old all-ages hub. Early, loud for its size, and over by eight.' },
    { id: 'veterans-hall', kind: 'HALL', hood: 'downtown', cap: 600, curfew: 1350, note: 'A rented lodge hall, one of the last all-ages rooms that can hold a big bill. The rent and the insurance are the squeeze.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'beach-flats', cap: 100, curfew: 1410, note: 'A bar with a small stage near the amusement park. Twenty-one and over, and wristband nights are rare.' },
    { id: 'industrial-club', kind: 'CLUB', hood: 'westside', cap: 300, curfew: 1410, note: 'A ticketed club in the industrial strip that books record-release nights. The likeliest step up from a garage.' },
    { id: 'civic-hall', kind: 'BIG', hood: 'downtown', cap: 1800, curfew: 1350, note: 'A civic auditorium for touring heavyweights. It books rarely, and mostly in beach season.' },
    { id: 'beach-fire', kind: 'OUTDOOR', hood: 'beach-flats', cap: 150, curfew: 1140, note: 'A beach fire or a lot by the park, in daylight only. The city treats noise here as a safety matter.' }
  ],

  contacts: ['salinas-ca', 'santa-rosa-ca', 'san-luis-obispo-ca', 'san-jose'],

  calendar: [
    { id: 'long-race', label: 'the long race weekend', tag: 'race', month: 7, week: 4, dows: [5, 6], can: [.88, .85, .85], hoods: ['downtown', 'seabright'], elsewhere: [1, .95, .95] },
    { id: 'flower-parade', label: 'the flower parade weekend', tag: 'parade', month: 9, week: 1, dows: [5, 6], can: [.92, .9, .9], hoods: ['live-oak'], elsewhere: [1, .97, .97] },
    { id: 'car-chili', label: 'the car and chili weekends', tag: 'festival', month: 10, weeks: [1, 4], dows: [5, 6], can: [.88, .85, .85], hoods: ['beach-flats'], elsewhere: [1, .97, .97] },
    { id: 'old-wagons', label: 'the old wagon weekend', tag: 'festival', month: 6, week: 4, dows: [5], can: [.9, .9, .88], hoods: ['beach-flats'], elsewhere: [1, 1, 1] },
    { id: 'quarter-start-1', label: 'the first week of the quarter', tag: 'graduation', month: 1, week: 1, dows: [3, 4, 5], can: [1.1, 1.08, 1.05], hoods: ['campus-edge'], elsewhere: [1, 1, 1] },
    { id: 'quarter-start-4', label: 'the first week of the quarter', tag: 'graduation', month: 4, week: 1, dows: [3, 4, 5], can: [1.1, 1.08, 1.05], hoods: ['campus-edge'], elsewhere: [1, 1, 1] },
    { id: 'quarter-start-9', label: 'the first week of the quarter', tag: 'graduation', month: 9, week: 1, dows: [3, 4, 5], can: [1.1, 1.08, 1.05], hoods: ['campus-edge'], elsewhere: [1, 1, 1] },
    { id: 'beach-summer', label: 'summer beach crowds', tag: 'holiday', month: 7, weeks: [1, 3], dows: [4, 5, 6], can: [.92, .9, .9], hoods: ['beach-flats', 'downtown', 'seabright'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },

  points: [
    { name: 'San Jose', state: 'CA', lat: 37.34, lon: -121.89, pop: 1000000 },
    { name: 'Watsonville', state: 'CA', lat: 36.91, lon: -121.76, pop: 52000 },
    { name: 'Monterey', state: 'CA', lat: 36.6, lon: -121.89, pop: 30000 },
    { name: 'Half Moon Bay', state: 'CA', lat: 37.46, lon: -122.43, pop: 12000 }
  ],
  roads: ['Highway 1', 'Highway 17', 'Highway 9', 'Highway 152', 'Highway 129'],

  words: {
    street: ['Pacific Avenue', 'Mission Street', 'Highway 1', 'Highway 17', 'Highway 9'],
    water: ['the San Lorenzo River', 'Monterey Bay', 'the harbor'],
    hood: ['the Westside', 'the Eastside', 'Seabright', 'Live Oak', 'Pleasure Point', 'Beach Flats', 'Harvey West', 'Felton', 'Soquel'],
    thing: ['banana slug', 'redwood', 'taqueria', 'surf shop', 'levee path', 'strawberry stand', 'garage', 'roller coaster', 'back-lot unit', 'fog', 'skateboard', 'finals week'],
    weather: ['fog bank', 'winter storm', 'week of fire smoke']
  },

  events: [
    { id: 'SANTA_CRUZ_CA_FIRST_STRIKE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The house you booked has had a complaint before, and the host has gone quiet.',
      title: 'The fine that follows the house',
      body: 'A neighbor called it in last spring, so a first complaint on your night would count as a third strike. The host says one more and the landlord ends the lease.',
      options: [
        { id: 'EARLY', label: 'Start at five and be quiet by nine', likely: 'Short and tight. The kids who come early get a good night.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -120 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors at five and the last chord at nine. Nobody called, and the host breathed out.' },
        { id: 'MOVE', label: 'Move the bill to a rented hall', likely: 'The fine goes away, and so does some of the crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -60 }],
          result: 'A hall took the bill. Folding chairs and a fee, but no neighbors.' },
        { id: 'ACCEPT', label: 'Run it and keep your fingers crossed', likely: 'If the call comes, the host loses the house.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Nobody called. You will not sleep better next time.' } ] },

    { id: 'SANTA_CRUZ_CA_QUARTER_RUSH', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'graduation' },
      telegraph: 'It is the first week of the quarter, and every student rental has a show on.',
      title: 'The first-week rush',
      body: 'A student rental can hold triple its usual crowd this week, and the whole street knows it. A complaint before ten costs the lease, not just a fine.',
      options: [
        { id: 'CAP', label: 'Cap the list and hold the door', likely: 'Fewer people, a better night, and a host who stays calm.',
          effects: [{ op: 'SHOW_MOD', key: 'capMul', v: .8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'You held the door at a hundred and the yard stayed civil.' },
        { id: 'RIDE', label: 'Let it fill and ride it', likely: 'The biggest night of the season, if the street holds.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.2 }, { op: 'REGULARS', pct: .02 }],
          result: 'The yard was full and the whole street sang. The host wants to talk Monday.' },
        { id: 'ACCEPT', label: 'Run it as booked', likely: 'A normal night in a loud week.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.0 }],
          result: 'A decent crowd in a loud week.' } ] },

    { id: 'SANTA_CRUZ_CA_RACE_FOG', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'race' },
      telegraph: 'The coast road closes for the race on Sunday morning, and the fog is already in.',
      title: 'The road closes in the morning',
      body: 'Sunday morning the streets by the beach will be closed for the long race, so a Saturday show has to end early and the crowd has to park a mile out.',
      options: [
        { id: 'EARLY', label: 'Move the start up and end early', likely: 'The ones who come are in bed by midnight.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'An early start, a tight set and a short walk to the car in the fog.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'People are nervous about the parking.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the list stayed home to find a space.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' } ] },

    { id: 'SANTA_CRUZ_CA_MOUNTAIN_ROAD', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], weather: 'RAIN', months: [11, 12, 1, 2, 3] },
      telegraph: 'A slide has the mountain highway down to one lane, and the band from the Bay is on the far side.',
      title: 'The mountain highway closes',
      body: 'A Bay band is stuck on the far side of the summit and the bill is a band short. A group from the redwood valley says they can fill in.',
      options: [
        { id: 'VALLEY', label: 'Put the valley band in the slot', likely: 'Rougher, but they know the room.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The valley band played loose and loud. The ones who came were glad.' },
        { id: 'WAIT', label: 'Hold the doors and wait for them', likely: 'A late start. The crowd gets restless.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The van made it at ten. You started late and nobody left.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'Breaks the date. Costs trust with everyone.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' } ] }
  ]
});
