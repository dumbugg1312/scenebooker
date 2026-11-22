SB.Cities.register('san-diego', {
  v: 1,
  slug: 'san-diego',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['university of california san diego', 'ucsd', 'san diego state university', 'sdsu', 'university of san diego', 'point loma nazarene university',
           'san diego city college', 'san diego union-tribune', 'union-tribune', 'san diego reader', 'san diego city beat', 'citybeat', 'times of san diego',
           'voice of san diego', 'kpbs', 'kcr', 'kgtv', 'kfmb', 'kusi', 'san diego padres', 'padres', 'petco park', 'san diego county fair', 'del mar fairgrounds',
           'comic-con', 'comic con', 'san diego zoo', 'seaworld', 'naval base san diego', 'camp pendleton', 'marine corps recruit depot', 'miramar', 'north island',
           'qualcomm', 'general atomics', 'kaiser permanente', 'scripps', 'sharp healthcare', 'balboa park', 'gaslamp quarter', 'gaslamp', 'hurricane kay', 'tropical storm kay',
           'fleet week', 'chicano park day', 'chicano park', 'rady shell', 'big bay boom', 'san diego pride', 'comic-con international', 'san diego convention center', 'del mar racetrack', 'del mar thoroughbred', 'punk rock rodeo', 'lambgoat', '10news'],
  blocklist: ['union-tribune*', 'san diego reader*', 'citybeat*', 'comic-con*', 'comic con*', 'seaworld*', 'gaslamp*'],

  blurb: ['A navy-and-border port on the far corner of California, where backyards, a sober all-ages hall and a heavy-music room keep the noise going.',
          'Hardcore with a south-bay lineage meets crowds from Tijuana, while rent and redevelopment eat the old rooms.'],
  hard: 'Rent and redevelopment keep closing rooms; the border is a gamble.',
  region: 'the border coast',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'A long hardcore and straight-edge lineage from the south bay, and a revival now.' },
    { fan: 'metal', band: 'metal', d: .06, reason: 'A heavy-music room on the west side has kept the metal crowd together for decades.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'San Diego' },
    { id: 'national-city', kind: 'FEEDER', name: 'National City', minutes: 15, bearing: 175, note: 'Shipyards and strip malls on the way to the south bay.' },
    { id: 'chula-vista', kind: 'FEEDER', name: 'Chula Vista', minutes: 20, bearing: 170, note: 'The south bay: where the early hardcore bands and house parties came from.' },
    { id: 'la-mesa', kind: 'FEEDER', name: 'La Mesa', minutes: 20, bearing: 75, note: 'A close east suburb of students and teens.' },
    { id: 'el-cajon', kind: 'FEEDER', name: 'El Cajon', minutes: 25, bearing: 70, note: 'East county sprawl of garages and backyards.' },
    { id: 'tijuana', kind: 'FEEDER', name: 'Tijuana', state: 'BC', minutes: 40, bearing: 175, note: 'Promoters on both sides stage shows across the line. Add the border wait.' },
    { id: 'santee', kind: 'FEEDER', name: 'Santee', minutes: 30, bearing: 45, note: 'An inland suburb with a skate and hardcore habit.' },
    { id: 'escondido', kind: 'FEEDER', name: 'Escondido', minutes: 40, bearing: 25, note: 'Inland north county, with a small scene of its own.' },
    { id: 'oceanside', kind: 'FEEDER', name: 'Oceanside', minutes: 45, bearing: 335, note: 'Coastal north county of surfers and men on weekend leave.' },
    { id: 'temecula', kind: 'PEER', name: 'Temecula', minutes: 55, bearing: 5, scene: 300, note: 'Suburban and thin. Bands come out of it rarely.' },
    { id: 'riverside', kind: 'PEER', name: 'Riverside', minutes: 95, bearing: 20, slug: 'riverside', note: 'Inland Empire hardcore, scrappier and farther out.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and East Village', route: 'downtown', note: 'The bar core. Condos are pushing out the older industrial rooms.' },
    { id: 'north-park', name: 'North Park and South Park', route: 'old-side', note: 'Craftsman houses and murals, with a long record of DIY houses and small rooms. Rent is rising.' },
    { id: 'city-heights', name: 'City Heights', route: 'old-side', note: 'A dense immigrant neighborhood east of North Park. Cheap, with community halls and garages.' },
    { id: 'ocean-beach', name: 'Ocean Beach', route: 'old-side', note: 'A beach hippie holdout of surf shops, bars and old rentals.' },
    { id: 'barrio-logan', name: 'Barrio Logan', route: 'work-side', note: 'The old Mexican-American neighborhood by the shipyards: murals, warehouses and a cultural center with all-ages shows.' },
    { id: 'bay-park', name: 'Bay Park and Midway', route: 'work-side', note: 'Strip malls and light industry west of the 5. A heavy-music pocket.' },
    { id: 'lemon-grove', name: 'Lemon Grove', route: 'work-side', note: 'A small east-county suburb with a rec center that once held shows.' },
    { id: 'south-bay', name: 'National City and Chula Vista', route: 'work-side', note: 'The south bay toward the border, with deep roots in early straight-edge and hardcore.' },
    { id: 'college-area', name: 'the College Area', route: 'campus', note: 'Student rentals east of the 8, with house shows and a long-running sober all-ages hall.' },
    { id: 'pacific-beach', name: 'Pacific Beach and Mission Beach', route: 'downtown', note: 'Beer and bro nightlife. Little DIY.' }
  ],

  rooms: [
    { id: 'north-park-yard', kind: 'HOUSE', hood: 'north-park', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: true, sketch: 20, standing: [70, 60, 45],
      pressure: 50, start: true, note: 'A backyard under a lemon tree behind a craftsman bungalow. The neighbors and the ten o\'clock line are the threat, and the rent keeps climbing.' },
    { id: 'college-house', kind: 'HOUSE', hood: 'college-area', cap: 80, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 40],
      pressure: 55, note: 'A student rental east of the 8. The roommates change every semester, and so does the landlord\'s patience.' },
    { id: 'cajon-garage', kind: 'HOUSE', hood: 'lemon-grove', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A garage on an east county lot with a merch table by the ramp. One noise complaint ends the set.' },
    { id: 'campus-collective', kind: 'DIY', hood: 'college-area', cap: 250, rent: 70, pa: .7, curfew: 1380, ac: true, sketch: 25, standing: [60, 65, 55],
      pressure: 55, note: 'A volunteer collective that has kept all-ages shows going for decades, sober and legal. It is run by a committee, and it is a long way north of the core.' },
    { id: 'barrio-gallery', kind: 'DIY', hood: 'barrio-logan', cap: 200, rent: 80, pa: .7, curfew: 1380, ac: false, sketch: 40, standing: [55, 60, 45],
      pressure: 55, needs: ['VOUCH'], note: 'A former gallery next to a restaurant on the main avenue, with a bar and a real sound system. All-ages is by the owner\'s grace.' },
    { id: 'surf-lot', kind: 'DIY', hood: 'college-area', cap: 120, rent: 0, pa: .5, curfew: 1200, ac: false, outdoor: true, sketch: 30, standing: [60, 60, 55],
      pressure: 45, note: 'The back parking lot of a surf shop on the boulevard. Free bills from late afternoon, and daylight and the neighbors set the hours.' },
    { id: 'lodge-hall', kind: 'HALL', hood: 'lemon-grove', cap: 150, rent: 180, deposit: 75, pa: .5, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 65],
      owner: 'HALL_MANAGER', pressure: 45, note: 'A lodge hall that rents out one wing on Saturday nights for punk. By the night, and the lodge can end it any week.' },
    { id: 'rec-center', kind: 'HALL', hood: 'lemon-grove', cap: 150, rent: 120, deposit: 50, pa: .5, curfew: 1260, ac: true, sketch: 5, standing: [55, 60, 55],
      owner: 'HALL_MANAGER', pressure: 55, note: 'A city rec center that held shows once. A hard stop at nine and not much patience.' },
    { id: 'print-shop', kind: 'SHOP', hood: 'city-heights', cap: 40, pa: .4, curfew: 1200, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A print shop with an unadvertised all-ages show and no alcohol. Word of mouth only, and one note from the landlord ends it.' },
    { id: 'brewery-lot', kind: 'OUTDOOR', hood: 'lemon-grove', cap: 200, rent: 25, pa: .5, curfew: 1080, ac: false, outdoor: true, sketch: 25, standing: [60, 60, 60],
      note: 'A brewery stage and a food-truck lot in the east county. Daytime all-ages bills with families, and the heat sets the clock.' },
    { id: 'ob-bar', kind: 'BAR', hood: 'ocean-beach', cap: 200, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1530, ac: false, following: .4, sketch: 15, standing: [50, 65, 70],
      pressure: 50, note: 'One of the small bars on the main street that string a multi-room punk weekend together. Tourists, beach noise rules and no kids.' },
    { id: 'south-bar', kind: 'BAR', hood: 'barrio-logan', cap: 150, soundFee: 50, pa: .6, ages: ['A21'], curfew: 1530, ac: true, following: .3, sketch: 20, standing: [50, 65, 65],
      note: 'A bar on the work side with a back-room stage. Loud, cheap and 21 and up.' },
    { id: 'bay-park-club', kind: 'CLUB', hood: 'bay-park', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A21'], curfew: 1500, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A strip-mall hall that kept the heavy music going for decades. A lease fight is closing it, and the stickers are still on the walls.' }
  ],

  contacts: ['los-angeles', 'riverside', 'oxnard-ca', 'phoenix'],

  calendar: [
    { id: 'convention', label: 'the big downtown convention', tag: 'festival', month: 7, week: 4, dows: [3, 4, 5, 6], can: [.88, .85, .85], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'county-fair', label: 'the county fair', tag: 'fair', month: 6, weeks: [1, 4], dows: [4, 5, 6], can: [.92, .90, .90] },
    { id: 'pride-week', label: 'pride weekend', tag: 'parade', month: 7, week: 3, dows: [5, 6], can: [1.05, 1.05, 1], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'barrio-day', label: 'the neighborhood park day', tag: 'festival', month: 4, week: 4, dows: [5], can: [.95, 1.05, 1.05], hoods: ['barrio-logan'], elsewhere: [1, 1, 1] },
    { id: 'beach-punk-fest', label: 'the beach-bar punk weekend', tag: 'festival', month: 2, week: 1, dows: [4, 5, 6], can: [1.05, 1.05, 1.02], hoods: ['ocean-beach'], elsewhere: [.95, .95, .95] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [5], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1320, weekend: 1320, inForce: false }, quiet: 1320 },

  points: [
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 },
    { name: 'Anaheim', state: 'CA', lat: 33.84, lon: -117.91, pop: 346000 },
    { name: 'Tijuana', state: 'BC', lat: 32.51, lon: -117.04, pop: 1900000 },
    { name: 'Phoenix', state: 'AZ', lat: 33.45, lon: -112.07, pop: 1600000 }
  ],
  roads: ['the 5', 'the 805', 'the 8', 'the 15', 'the 163', 'the 94'],

  words: {
    street: ['University Avenue', 'El Cajon Boulevard', 'Park Boulevard', 'Washington Street', 'Broadway', 'Sports Arena Boulevard', 'Newport Avenue'],
    water: ['San Diego Bay', 'Mission Bay', 'the San Diego River', 'Point Loma', 'the Silver Strand'],
    hood: ['North Park', 'South Park', 'City Heights', 'Barrio Logan', 'Bay Park', 'Ocean Beach', 'Lemon Grove', 'College Area'],
    thing: ['bungalow', 'marine layer', 'taco shop', 'border line', 'lemon tree', 'seagull', 'ship horn'],
    weather: ['June gloom', 'marine layer', 'brush fire smoke']
  },

  events: [
    { id: 'SAN_DIEGO_TEN_OCLOCK_LINE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The neighbors behind the yard have started looking over the fence at the setup.',
      title: 'A patrol car at ten',
      body: 'Ten o\'clock comes with a patrol car at the gate and a card about minors. Anyone under eighteen has to go home or leave with a parent, mid-bill.',
      options: [
        { id: 'EARLY', label: 'Move the start up and finish before ten', likely: 'A short night. Most of the kids get a full set.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors at five, done by ten. The patrol car drove past a quiet street.' },
        { id: 'HALL', label: 'Move the whole bill to a hall', likely: 'Louder, bigger, and with a deposit. No neighbors.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'MONEY', amount: -25 }],
          result: 'A hall took the bill late. The crowd followed, grumbling and curious.' },
        { id: 'ACCEPT', label: 'Run it and send the kids home on time', likely: 'Half the crowd leaves mid-set.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Half the room left with parents. The late set was a tight circle of regulars.' }
      ] },

    { id: 'SAN_DIEGO_CONVENTION_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival', months: [7] },
      telegraph: 'The hotels downtown are full and the rooms are tripling their prices for the convention.',
      title: 'The convention takes downtown',
      body: 'Every downtown room fills with out-of-towners, and the cost of a bed for the touring band triples. The east county halls are empty, and far away.',
      options: [
        { id: 'EAST', label: 'Move the show to an east county hall', likely: 'Cheaper and calmer. You lose the downtown crowd.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HALL', respect: false }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The hall was cheap and quiet. The downtown crowd stayed downtown.' },
        { id: 'RIDES', label: 'Put the bands up on couches and push through', likely: 'Two hours of your day. Everybody makes it.',
          effects: [{ op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Four to a floor, and the bands will remember who gave them one.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Hard to find a parking spot.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Parking was the whole night. The ones who came, came early.' }
      ] },

    { id: 'SAN_DIEGO_MARINE_LAYER', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7] },
      telegraph: 'The marine layer is forecast to come in thick by nine and stay all night.',
      title: 'Fog on the coast',
      body: 'A fog bank rolls in at nine. The crowd huddles in the doorway of the beach bar and load-in is a damp, slow business in the marine layer.',
      options: [
        { id: 'WAIT', label: 'Hold the doors and let the bands load in', likely: 'A late start, and a cold crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The bands loaded in through the mist. Doors opened late and the room warmed up fast.' },
        { id: 'SHORT', label: 'Cut the bill and play on', likely: 'A thin night, but the ones who came stay.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Two bands and a loose set, and everyone stayed under the awning.' }
      ] }
  ]
});
