SB.Cities.register('atlantic-city-nj', {
  v: 1,
  slug: 'atlantic-city-nj',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['stockton university', 'stockton', 'press of atlantic city', 'miss america', 'soar & shore airshow', 'soar and shore airshow', 'boardwalk hall', 'atlantic city rail line',
           'nj transit', 'new jersey transit', 'atlantic city weekly', 'juvenile curfew act', 'air national guard', 'coast guard training center', 'vfw', 'american legion',
           'ghost ship', 'white house sub shop', 'white house subs', 'rolling chair',
           'the brine room', 'brine room', 'back bay boathouse', 'windbreak', 'chelsea cold storage', 'the taffy room', 'taffy room', 'kentucky avenue annex',
           'ducktown social hall', 'the dry dock', 'pacific & pennsylvania', 'pacific and pennsylvania', 'bungalow 9', 'the jitney stop', 'mid-island roller rink',
           'visit atlantic city', 'crda', 'casino reinvestment development authority', 'atlantic city airshow', 'thunder over the boardwalk', 'frantic city', 'garden state live', 'hard rock atlantic city', 'showboat', 'house of blues', 'pier shops', 'orange loop', 'atlantic city jazz fest', 'downbeach seafood festival', 'atlantic city latino festival', 'quest for the ring', 'historic smithville', 'atlantic city convention center', 'njmonthly', 'nj monthly', 'philadelphia inquirer', 'whyy', 'phillyvoice', 'bandsintown', 'songkick'],
  /* Banned holds the dossier's real institutions and its invented venue names (unchecked). The pageant and the air show are written only generically. */
  blocklist: ['press of atlantic city*', 'stockton*', 'boardwalk hall*', 'miss america*', 'white house sub*', 'windbreak*', 'brine room*'],

  blurb: ['A casino resort on a barrier island where cover bands rule the lounges, so an original punk show is the odd one out.',
          'The real shows hide in mainland garages or come as rare big events by the Boardwalk, and the kids who start bands come over the bridge or down the Expressway.'],
  hard: 'Few all-ages rooms, a teen curfew, and a cover-band town.',
  region: 'the Jersey Shore',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Atlantic City' },
    { id: 'pleasantville', kind: 'FEEDER', name: 'Pleasantville', minutes: 5, bearing: 295, note: 'The working-class mainland neighbor where many casino workers and teenagers live.' },
    { id: 'absecon', kind: 'FEEDER', name: 'Absecon', minutes: 10, bearing: 320, note: 'A small suburb with basements; a likely source of teen bands.' },
    { id: 'egg-harbor', kind: 'FEEDER', name: 'Egg Harbor Township', minutes: 15, bearing: 255, note: 'Big suburban sprawl and the largest feeder by population.' },
    { id: 'brigantine', kind: 'FEEDER', name: 'Brigantine', minutes: 15, bearing: 20, note: 'A small residential beach island over the bridge.' },
    { id: 'galloway', kind: 'FEEDER', name: 'Galloway', minutes: 20, bearing: 320, note: 'A spread-out suburb with a college campus.' },
    { id: 'somers-point', kind: 'FEEDER', name: 'Somers Point and Linwood', minutes: 20, bearing: 235, note: 'Bayside shore suburbs with a bar-heavy waterfront.' },
    { id: 'mays-landing', kind: 'FEEDER', name: 'Mays Landing', minutes: 25, bearing: 275, note: 'The small county seat, with a community college nearby.' },
    { id: 'ocean-city', kind: 'FEEDER', name: 'Ocean City', minutes: 30, bearing: 215, note: 'A dry family resort town; the classic punk kid in a dry town.' },
    { id: 'hammonton', kind: 'FEEDER', name: 'Hammonton', minutes: 35, bearing: 290, note: 'A farm town on the train line out to Philadelphia.' },
    { id: 'tuckerton', kind: 'FEEDER', name: 'Tuckerton and Manahawkin', minutes: 50, bearing: 40, note: 'Bay-shore towns up the Parkway with a surf and skate crowd.' },
    { id: 'vineland', kind: 'PEER', name: 'Vineland and Millville', minutes: 55, bearing: 245, scene: 500, note: 'Farm and glass towns with their own hardcore and metal history.' },
    { id: 'trenton', kind: 'PEER', name: 'Trenton', minutes: 90, bearing: 330, slug: 'trenton-nj', note: 'A forgotten post-industrial city with the same underdog feel.' },
    { id: 'wilmington-de', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 95, bearing: 265, scene: 700, slug: 'wilmington-de', note: 'A similar-sized underdog city down the road.' },
    { id: 'asbury-park', kind: 'PEER', name: 'Asbury Park', minutes: 85, bearing: 10, scene: 700, note: 'The other boardwalk town, with a music-history identity of its own.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Boardwalk blocks', route: 'downtown', note: 'The avenues behind the Boardwalk: old storefronts, small hotels and the heaviest policing in the state.' },
    { id: 'inlet', name: 'the Inlet', route: 'old-side', note: 'The far northeast end, residential and cut off; church halls, community centers and a few houses.' },
    { id: 'ducktown', name: 'Ducktown', route: 'old-side', note: 'The old Italian-American rowhouse neighborhood by the Expressway; tolerant if a show ends early.' },
    { id: 'westside', name: 'the Westside', route: 'work-side', note: 'A historic Black neighborhood of rowhouses and churches; church halls and community rooms.' },
    { id: 'chelsea', name: 'Chelsea and Chelsea Heights', route: 'old-side', note: 'The southwest end: single-family houses, driveways, yards and condo neighbors who complain.' },
    { id: 'venice-park', name: 'Venice Park and Bungalow Park', route: 'work-side', note: 'Quiet bayfront houses with older owners; flood-exposed, a source of garages more than shows.' },
    { id: 'marina', name: 'the Marina District', route: 'downtown', note: 'Bay-side casino hotels and marinas; no place for DIY, but its shifts run everyone\'s week.' },
    { id: 'mainland', name: 'the mainland towns across the bay', route: 'campus', note: 'Pleasantville, Absecon and Galloway: basements, a college campus and the kids who start the bands.' }
  ],

  rooms: [
    { id: 'mainland-house', kind: 'HOUSE', hood: 'mainland', cap: 50, curfew: 1320, start: true, note: 'A garage or basement a few minutes over the bridge, where the island has almost no basements. The first room, and the one nobody bothers.' },
    { id: 'absecon-basement', kind: 'HOUSE', hood: 'mainland', cap: 60, curfew: 1350, note: 'A finished basement in a quiet suburb. The police never come, but the neighbors do.' },
    { id: 'harbor-garage', kind: 'HOUSE', hood: 'mainland', cap: 80, curfew: 1350, note: 'A big garage in the sprawl. Plenty of room, and nobody can walk to it.' },
    { id: 'chelsea-house', kind: 'HOUSE', hood: 'chelsea', cap: 40, curfew: 1320, pressure: 55, note: 'A single-family house with a driveway and a yard. The condo neighbors complain first.' },
    { id: 'inlet-hall', kind: 'HALL', hood: 'inlet', cap: 150, curfew: 1305, rent: 150, owner: 'CHURCH_CONTACT', note: 'A church hall in a residential block. The teen curfew siren makes a late end a hazard for kids walking home.' },
    { id: 'mainland-lodge', kind: 'HALL', hood: 'mainland', cap: 200, curfew: 1320, rent: 200, owner: 'HALL_MANAGER', note: 'A rented lodge hall off the Black Horse Pike. Cheap, and far from the island police.' },
    { id: 'boardwalk-storefront', kind: 'DIY', hood: 'downtown', cap: 100, curfew: 1320, pressure: 60, needs: ['VOUCH'], note: 'A vacant storefront or back room from the casino closures. The heavy policing and the redevelopment will not let it last.' },
    { id: 'mainland-shop', kind: 'SHOP', hood: 'mainland', cap: 60, curfew: 1260, note: 'The back room of a shop on a mainland strip. Afternoon matinees only, over by nine.' },
    { id: 'boardwalk-bar', kind: 'BAR', hood: 'downtown', cap: 150, ages: ['A21'], curfew: 1500, soundFee: 60, note: 'A bar behind the Boardwalk. The original-music nights are gone, and it books cover bands now.' },
    { id: 'beach-club', kind: 'CLUB', hood: 'downtown', cap: 650, ages: ['A21', 'ALL'], curfew: 1440, following: 0.5, note: 'The one independent rock club in town, mostly twenty-one-plus with a few all-ages punk nights. The only room that pulls touring bands.' },
    { id: 'boardwalk-arena', kind: 'BIG', hood: 'downtown', cap: 10000, ages: ['ALL'], curfew: 1380, note: 'The arena by the Boardwalk. Touring acts, not punk bookers.' },
    { id: 'beach-stage', kind: 'OUTDOOR', hood: 'downtown', cap: 5000, curfew: 1320, outdoor: true, rent: 25, note: 'A beach-block stage for the odd festival day. Sand in the amps, and one permit away from cancelled.' }
  ],

  contacts: ['trenton-nj', 'philadelphia', 'new-york', 'baltimore'],

  calendar: [
    { id: 'air-show', label: 'the air show', tag: 'airshow', month: 8, weeks: [3, 4], dows: [2], can: [.85, .85, .90], hoods: ['downtown', 'marina'], elsewhere: [.95, .92, .92] },
    { id: 'jazz-seafood', label: 'the jazz and seafood weekends', tag: 'festival', month: 9, weeks: [2, 4], dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['downtown', 'marina'], elsewhere: [1, .97, .97] },
    { id: 'spring-festival', label: 'the spring beer and music festival', tag: 'festival', month: 4, week: 1, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'december-parade', label: 'the December parade and market', tag: 'parade', month: 12, week: 2, dows: [5], can: [.90, .90, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'fourth', label: 'the Fourth of July parade and fireworks', tag: 'holiday', month: 7, week: 1, dows: [4, 5, 6], can: [.90, .90, .92] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: true } },

  points: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 1600000 },
    { name: 'Camden', state: 'NJ', lat: 39.93, lon: -75.12, pop: 71000 },
    { name: 'Cherry Hill', state: 'NJ', lat: 39.93, lon: -75.03, pop: 74000 },
    { name: 'Cape May', state: 'NJ', lat: 38.94, lon: -74.91, pop: 2800 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01, pop: 8300000 }
  ],
  roads: ['Atlantic City Expressway', 'Garden State Parkway', 'Route 30', 'Route 40', 'Route 9'],

  words: {
    street: ['Atlantic Avenue', 'Pacific Avenue', 'Arctic Avenue', 'Baltic Avenue', 'Kentucky Avenue', 'Oriental Avenue', 'Absecon Boulevard', 'Black Horse Pike'],
    water: ['Absecon Inlet', 'Absecon Bay', 'Great Bay', 'the Intracoastal'],
    hood: ['the Inlet', 'Ducktown', 'Chelsea', 'Venice Park', 'Bungalow Park', 'the Westside', 'the Marina District'],
    thing: ['jitney', 'salt water taffy', 'Italian sub', 'storm tide', 'neon sign', 'boardwalk fries', 'beach tag', 'casino lounge', 'parking deck', 'curfew siren'],
    weather: ['nor\'easter', 'storm tide', 'sea fog']
  },

  events: [
    { id: 'ATLANTIC_CITY_NJ_SIREN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The siren sounds at ten for every kid under eighteen, and the church hall bill runs late.',
      title: 'The siren in the last set',
      body: 'The curfew siren sounds at ten in the middle of the last set at the church hall. Every kid under eighteen has to be out of the room or with a parent within minutes, and the walk to the bus crosses the most heavily policed blocks.',
      options: [
        { id: 'SHORT', label: 'Cut the last set short and walk the kids to the bus', likely: 'The headliner gets half a set, and everybody gets out safe.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You stopped the last set early and walked the kids out in a group, and nobody got stopped.' },
        { id: 'EARLY', label: 'Start the whole bill an hour earlier', likely: 'You\'d have to deal with it tomorrow instead, but the wait is already here.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You moved doors an hour earlier, and the last band finished before the siren.' },
        { id: 'ACCEPT', label: 'Let it play and take your chances', likely: 'The younger kids leave in a rush.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }],
          result: 'The siren went off mid-song, and half the room ran for the bus.' }
      ] },

    { id: 'ATLANTIC_CITY_NJ_AIR_SHOW', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'airshow' },
      telegraph: 'The air show takes the beach and the Boardwalk on Wednesday, and the lots fill by noon.',
      title: 'Expressway traffic',
      body: 'The air show packs the beach, the parking decks and the Expressway by noon, so the van for tonight\'s mainland garage show is sitting in traffic and the headliner will be late.',
      options: [
        { id: 'WAIT', label: 'Hold the doors and wait for the van', likely: 'It\'s a late start, but the crowd is easy.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
          result: 'The van made it at nine, and the garage was packed and happy.' },
        { id: 'SHORT', label: 'Start without them and play the short bill', likely: 'It\'s thinner, but on time.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'You ran the opening bands long and let the headliner close with a short set.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'It breaks the date, and the bands lose some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the people who could make it came.' }
      ] },

    { id: 'ATLANTIC_CITY_NJ_STORM_TIDE', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [9, 10, 11, 12, 1, 2, 3, 4] },
      telegraph: 'A northeast storm is stalled off the coast, and the storm tide is expected at the evening high water.',
      title: 'The bay comes up the street',
      body: 'The storm tide floods the bayfront streets and the garages on that side of the island, so the show has to move to a dry mainland basement across the bridge.',
      options: [
        { id: 'BASEMENT', label: 'Move the whole bill to a dry basement on the mainland', likely: 'It\'s smaller and louder, and the bridge is open for now.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: 0.6 }],
          result: 'A basement on the mainland took the bill with an hour to spare, and it was packed.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date, and everybody loses some trust in you.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the tide went out and so did half the list.' },
        { id: 'ACCEPT', label: 'Run it and keep the sandbags handy', likely: 'It\'s a nervous night in wet shoes.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.7 }],
          result: 'The water stayed in the street, and a handful of wet kids stayed late.' }
      ] }
  ]
});
